import React, { useState, useEffect } from 'react';
import { HideoutModule as HideoutModuleType, ItemIcon, UserProgress } from '../types/hideout';
import { TarkovApiService } from '../services/tarkovApi';

interface HideoutModuleProps {
  module: HideoutModuleType;
  userProgress: UserProgress;
  onLevelChange: (moduleId: string, level: number) => void;
}

export const HideoutModule: React.FC<HideoutModuleProps> = ({ 
  module, 
  userProgress, 
  onLevelChange 
}) => {
  const [itemIcons, setItemIcons] = useState<Map<string, ItemIcon>>(new Map());
  const [loading, setLoading] = useState(true);
  
  const currentLevel = userProgress[module.id] || 0;
  const maxLevel = Math.max(...module.levels.map(l => l.level));

  useEffect(() => {
    const loadIcons = async () => {
      const iconMap = new Map<string, ItemIcon>();
      
      // First, check if we have iconLinks from API data
      module.levels.forEach(level => {
        level.requirements.forEach(req => {
          if (req.iconLink) {
            iconMap.set(req.item, {
              name: req.item,
              iconUrl: req.iconLink,
              wikiLink: `https://escapefromtarkov.fandom.com/wiki/${encodeURIComponent(req.item.replace(/ /g, '_'))}`
            });
          }
        });
      });

      // For items without iconLinks, fetch from API
      const missingIcons = new Set<string>();
      module.levels.forEach(level => {
        level.requirements.forEach(req => {
          if (!iconMap.has(req.item)) {
            missingIcons.add(req.item);
          }
        });
      });

      if (missingIcons.size > 0) {
        const additionalIcons = await TarkovApiService.getMultipleItemIcons(Array.from(missingIcons));
        additionalIcons.forEach((icon, name) => {
          iconMap.set(name, icon);
        });
      }

      setItemIcons(iconMap);
      setLoading(false);
    };

    loadIcons();
  }, [module]);

  const handleIconClick = (itemName: string) => {
    const icon = itemIcons.get(itemName);
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
    return nextLevelData ? nextLevelData.requirements : [];
  };

  const getFutureRequiredItems = () => {
    const items = new Map<string, number>();
    module.levels
      .filter(l => l.level > currentLevel + 1)
      .forEach(level => {
        level.requirements.forEach(req => {
          items.set(req.item, (items.get(req.item) || 0) + req.count);
        });
      });
    return Array.from(items.entries()).map(([item, count]) => ({ item, count }));
  };

  const nextRequirements = getNextRequiredItems();
  const futureRequirements = getFutureRequiredItems();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
        <h2 className="text-xl font-bold text-gray-800">{module.name}</h2>
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
              disabled={currentLevel >= maxLevel}
              className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-green-500 text-white font-bold hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center text-lg sm:text-base"
              title="レベルを上げる"
            >
              +
            </button>
          </div>
          <span className="text-sm sm:text-xs text-gray-500">/ {maxLevel}</span>
        </div>
      </div>

      {currentLevel < maxLevel && (getNextLevelData() || nextRequirements.length > 0) && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            レベル {currentLevel} → {currentLevel + 1} に必要な素材
          </h3>
          
          {getNextLevelData()?.roubles && (
            <div className="mb-3 p-3 bg-yellow-50 rounded-lg">
              <span className="font-medium text-yellow-800">
                💰 {getNextLevelData()!.roubles!.toLocaleString()} ルーブル
              </span>
            </div>
          )}

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
              <span className="font-medium text-purple-800">商人要件: </span>
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
              <span className="font-medium text-green-800">スキル要件: </span>
              {getNextLevelData()!.skillRequirements!.map((skill, index) => (
                <span key={index} className="text-green-700">
                  {skill.skill} レベル{skill.level}
                  {index < getNextLevelData()!.skillRequirements!.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {nextRequirements.map((req, index) => {
              const icon = itemIcons.get(req.item);
              return (
                <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  {loading ? (
                    <div className="w-12 h-12 bg-gray-200 rounded animate-pulse"></div>
                  ) : icon ? (
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
                    <p className="font-medium text-gray-800">{req.item}</p>
                    <p className="text-sm text-gray-600">× {req.count}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {currentLevel >= maxLevel && (
        <div className="mb-6 p-4 bg-green-100 rounded-lg">
          <p className="text-green-800 font-medium">✓ 最大レベルに達しています</p>
        </div>
      )}

      {futureRequirements.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-600 mb-3">
            今後必要になる素材 (レベル {currentLevel + 2}+)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {futureRequirements.map((req, index) => {
              const icon = itemIcons.get(req.item);
              return (
                <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                  {loading ? (
                    <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                  ) : icon ? (
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
                    <p className="font-medium text-gray-700">{req.item}</p>
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