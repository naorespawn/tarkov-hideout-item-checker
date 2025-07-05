import React, { useState } from 'react';
import { HideoutModule as HideoutModuleType, ItemIcon, UserProgress } from '../types/hideout';
import { TraderLevelService } from '../services/traderLevelService';
import { HideoutPrerequisiteService } from '../services/hideoutPrerequisiteService';
import { getItemIcon } from '../data/itemIcons';

interface HideoutModuleProps {
  module: HideoutModuleType;
  userProgress: UserProgress;
  onLevelChange: (moduleId: string, level: number) => void;
  pmcLevel: number;
  allModules: HideoutModuleType[];
}

export const HideoutModule: React.FC<HideoutModuleProps> = ({ 
  module, 
  userProgress, 
  onLevelChange,
  pmcLevel,
  allModules
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const currentLevel = userProgress[module.id] || 0;
  const maxLevel = Math.max(...module.levels.map(l => l.level));

  // 今後のレベルでPMCレベル制限があるかチェック
  const hasFuturePMCRestrictions = module.levels.some(level => 
    level.level > currentLevel && !TraderLevelService.isStationAvailableAtPMCLevel(module.name, pmcLevel)
  );

  const getItemIconData = (itemName: string): ItemIcon | null => {
    // First check if we have iconLink from API data
    const levelWithIcon = module.levels.find(level => 
      level.requirements.some(req => req.item === itemName && req.iconLink)
    );
    
    if (levelWithIcon) {
      const reqWithIcon = levelWithIcon.requirements.find(req => req.item === itemName && req.iconLink);
      if (reqWithIcon?.iconLink) {
        return {
          name: itemName,
          iconUrl: reqWithIcon.iconLink,
          wikiLink: `https://escapefromtarkov.fandom.com/wiki/${encodeURIComponent(itemName.replace(/ /g, '_'))}`
        };
      }
    }
    
    // Fall back to pre-fetched data
    return getItemIcon(itemName);
  };

  const canLevelUp = (): boolean => {
    // Check if already at max level
    if (currentLevel >= maxLevel) return false;
    
    const nextLevel = currentLevel + 1;
    const nextLevelData = module.levels.find(l => l.level === nextLevel);
    
    if (!nextLevelData) return false;
    
    // Convert userProgress (by moduleId) to progress by module name for HideoutPrerequisiteService
    const userProgressByName: { [moduleName: string]: number } = {};
    Object.entries(userProgress).forEach(([moduleId, level]) => {
      const matchingModule = allModules.find(m => m.id === moduleId);
      if (matchingModule) {
        userProgressByName[matchingModule.name] = level;
      }
    });
    
    // Check module prerequisites
    if (nextLevelData.modulePrerequisites) {
      for (const prereq of nextLevelData.modulePrerequisites) {
        const currentPrereqLevel = userProgressByName[prereq.module] || 0;
        if (currentPrereqLevel < prereq.level) {
          return false;
        }
      }
    }
    
    // Check trader requirements  
    if (nextLevelData.traderRequirements) {
      for (const traderReq of nextLevelData.traderRequirements) {
        if (!TraderLevelService.isTraderLevelAvailable(traderReq.trader, traderReq.level, pmcLevel)) {
          return false;
        }
      }
    }
    
    // Check PMC level restrictions for the station itself
    if (!TraderLevelService.isStationAvailableAtPMCLevel(module.name, pmcLevel)) {
      return false;
    }
    
    return true;
  };

  const handleIconClick = (itemName: string) => {
    const icon = getItemIconData(itemName);
    if (icon) {
      window.open(icon.wikiLink, '_blank');
    }
  };

  const getNextLevelData = () => {
    const nextLevel = currentLevel + 1;
    return module.levels.find(l => l.level === nextLevel);
  };

  const getNextRequiredItems = () => {
    const nextLevelData = getNextLevelData();
    if (!nextLevelData) return [];
    
    const items = [...nextLevelData.requirements];
    
    // Add currency as items
    if (nextLevelData.roubles) {
      items.push({
        item: 'Roubles',
        count: nextLevelData.roubles
      });
    }
    
    return items;
  };

  const getFutureRequiredItems = () => {
    const items = new Map<string, number>();
    module.levels
      .filter(l => l.level > currentLevel + 1)
      .forEach(level => {
        level.requirements.forEach(req => {
          items.set(req.item, (items.get(req.item) || 0) + req.count);
        });
        
        // Add currency to future requirements
        if (level.roubles) {
          items.set('Roubles', (items.get('Roubles') || 0) + level.roubles);
        }
      });
    return Array.from(items.entries()).map(([item, count]) => ({ item, count }));
  };

  const nextRequirements = getNextRequiredItems();
  const futureRequirements = getFutureRequiredItems();

  return (
    <div className={`rounded-lg shadow-md p-6 mb-6 ${hasFuturePMCRestrictions ? 'bg-orange-50 border border-orange-200' : 'bg-white'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-bold text-gray-800">{module.name}</h2>
          {hasFuturePMCRestrictions && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-1 rounded text-orange-600 hover:text-orange-800 transition-colors"
                title={isCollapsed ? "詳細を表示" : "詳細を非表示"}
              >
                {isCollapsed ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                )}
              </button>
              <span className="text-sm text-orange-600 font-medium">PMCレベル制限あり</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600 hidden sm:inline">現在レベル:</span>
          <span className="text-sm text-gray-600 sm:hidden">レベル:</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onLevelChange(module.id, Math.max(0, currentLevel - 1))}
              disabled={currentLevel <= 0}
              className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-red-500 text-white font-bold hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center text-lg sm:text-base"
              title="レベルを下げる"
            >
              −
            </button>
            <span className="text-xl sm:text-lg font-semibold text-gray-800 min-w-[2.5rem] sm:min-w-[2rem] text-center">
              {currentLevel}
            </span>
            <button
              onClick={() => onLevelChange(module.id, Math.min(maxLevel, currentLevel + 1))}
              disabled={!canLevelUp()}
              className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-green-500 text-white font-bold hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center text-lg sm:text-base"
              title={!canLevelUp() && currentLevel < maxLevel ? "前提条件を満たしていません" : "レベルを上げる"}
            >
              +
            </button>
          </div>
          <span className="text-sm sm:text-xs text-gray-500">/ {maxLevel}</span>
        </div>
      </div>

      {hasFuturePMCRestrictions && (
        <div className="mb-4 p-3 bg-orange-100 rounded-lg">
          <p className="text-sm text-orange-800">
            ⚠️ この施設の一部のレベルには現在のPMCレベル({pmcLevel})では利用できないトレーダーレベルが必要です。
          </p>
        </div>
      )}

      {!isCollapsed && currentLevel < maxLevel && (getNextLevelData() || nextRequirements.length > 0) && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            レベル {currentLevel} → {currentLevel + 1} に必要な素材
          </h3>
          

          {getNextLevelData()?.modulePrerequisites && getNextLevelData()!.modulePrerequisites!.length > 0 && (
            <div className="mb-3 p-3 bg-orange-50 rounded-lg">
              <span className="font-medium text-orange-800">前提条件: </span>
              {getNextLevelData()!.modulePrerequisites!.map((prereq, index) => (
                <span key={index} className="text-orange-700">
                  {prereq.module} レベル{prereq.level}
                  {index < getNextLevelData()!.modulePrerequisites!.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          )}

          {getNextLevelData()?.traderRequirements && getNextLevelData()!.traderRequirements!.length > 0 && (
            <div className="mb-3 p-3 bg-purple-50 rounded-lg">
              <span className="font-medium text-purple-800">トレーダー条件: </span>
              {getNextLevelData()!.traderRequirements!.map((trader, index) => (
                <span key={index} className="text-purple-700">
                  {trader.trader} LL{trader.level}
                  {index < getNextLevelData()!.traderRequirements!.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          )}

          {getNextLevelData()?.skillRequirements && getNextLevelData()!.skillRequirements!.length > 0 && (
            <div className="mb-3 p-3 bg-green-50 rounded-lg">
              <span className="font-medium text-green-800">スキル条件: </span>
              {getNextLevelData()!.skillRequirements!.map((skill, index) => (
                <span key={index} className="text-green-700">
                  {skill.skill} レベル{skill.level}
                  {index < getNextLevelData()!.skillRequirements!.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          )}
          <div className="grid grid-cols-6 gap-2">
            {nextRequirements.map((req, index) => {
              const icon = getItemIconData(req.item);
              return (
                <div key={index} className="flex flex-col items-center space-y-1 p-2 bg-blue-50 rounded-lg">
                  {icon ? (
                    <img
                      src={icon.iconUrl}
                      alt={req.item}
                      className="w-12 h-12 object-cover rounded cursor-pointer hover:opacity-80"
                      onClick={() => handleIconClick(req.item)}
                      title="クリックでWikiページを開く"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-300 rounded flex items-center justify-center text-xs text-gray-600">
                      No Image
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-600">× {req.count}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!isCollapsed && currentLevel >= maxLevel && (
        <div className="mb-6 p-4 bg-green-100 rounded-lg">
          <p className="text-green-800 font-medium">✓ 最大レベルに達しています</p>
        </div>
      )}

      {!isCollapsed && futureRequirements.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-600 mb-3">
            今後必要になる素材 (レベル {currentLevel + 2}+)
          </h3>
          <div className="grid grid-cols-6 gap-2">
            {futureRequirements.map((req, index) => {
              const icon = getItemIconData(req.item);
              return (
                <div key={index} className="flex flex-col items-center space-y-1 p-2 bg-gray-50 rounded">
                  {icon ? (
                    <img
                      src={icon.iconUrl}
                      alt={req.item}
                      className="w-8 h-8 object-cover rounded cursor-pointer hover:opacity-80"
                      onClick={() => handleIconClick(req.item)}
                      title="クリックでWikiページを開く"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-xs text-gray-600">
                      ?
                    </div>
                  )}
                  <div className="text-sm">
                    <p className="text-gray-500">× {req.count}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};