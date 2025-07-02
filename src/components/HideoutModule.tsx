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
      const allItemNames = new Set<string>();
      module.levels.forEach(level => {
        level.requirements.forEach(req => {
          allItemNames.add(req.item);
        });
      });

      const icons = await TarkovApiService.getMultipleItemIcons(Array.from(allItemNames));
      setItemIcons(icons);
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

  const getNextRequiredItems = () => {
    const nextLevel = currentLevel + 1;
    const nextLevelData = module.levels.find(l => l.level === nextLevel);
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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">{module.name}</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">現在レベル:</span>
          <select
            value={currentLevel}
            onChange={(e) => onLevelChange(module.id, parseInt(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value={0}>0</option>
            {module.levels.map(level => (
              <option key={level.level} value={level.level}>
                {level.level}
              </option>
            ))}
          </select>
        </div>
      </div>

      {currentLevel < maxLevel && nextRequirements.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            レベル {currentLevel} → {currentLevel + 1} に必要な素材
          </h3>
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