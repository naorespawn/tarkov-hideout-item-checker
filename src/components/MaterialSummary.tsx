import React, { useMemo } from 'react';
import { HideoutModule as HideoutModuleType, UserProgress, Requirement } from '../types/hideout';
import { HideoutPrerequisiteService } from '../services/hideoutPrerequisiteService';
import { TraderLevelService } from '../services/traderLevelService';

interface MaterialSummaryProps {
  hideoutModules: HideoutModuleType[];
  userProgress: UserProgress;
  pmcLevel: number;
}

interface MaterialSummaryItem {
  item: string;
  totalCount: number;
  iconLink?: string;
  wikiLink?: string;
  sources: {
    moduleName: string;
    level: number;
    count: number;
  }[];
}

export const MaterialSummary: React.FC<MaterialSummaryProps> = ({
  hideoutModules,
  userProgress,
  pmcLevel
}) => {
  const upgradableStations = useMemo(() => {
    const upgradableStations: {
      module: HideoutModuleType;
      nextLevel: number;
      requirements: Requirement[];
    }[] = [];

    hideoutModules.forEach(module => {
      // PMCレベル制限チェック
      if (!TraderLevelService.isStationAvailableAtPMCLevel(module.name, pmcLevel)) {
        return;
      }

      const currentLevel = userProgress[module.id] || 0;
      const nextLevel = currentLevel + 1;

      // 次のレベルが存在するかチェック
      const nextLevelData = module.levels.find(level => level.level === nextLevel);
      if (!nextLevelData) return;

      // 前提条件チェック - userProgressをmodule.idベースに変換
      const userProgressByName: { [stationName: string]: number } = {};
      hideoutModules.forEach(m => {
        if (userProgress[m.id] !== undefined) {
          userProgressByName[m.name] = userProgress[m.id];
        }
      });

      if (!HideoutPrerequisiteService.isStationLevelAvailable(module.name, nextLevel, userProgressByName)) {
        return;
      }

      upgradableStations.push({
        module,
        nextLevel,
        requirements: nextLevelData.requirements
      });
    });

    return upgradableStations;
  }, [hideoutModules, userProgress, pmcLevel]);

  const materialSummary = useMemo(() => {
    const materialMap = new Map<string, MaterialSummaryItem>();

    upgradableStations.forEach(({ module, nextLevel, requirements }) => {
      requirements.forEach(req => {
        if (req.nonFunctional) return; // 機能しないアイテムは除外

        const existing = materialMap.get(req.item);
        if (existing) {
          existing.totalCount += req.count;
          existing.sources.push({
            moduleName: module.name,
            level: nextLevel,
            count: req.count
          });
        } else {
          materialMap.set(req.item, {
            item: req.item,
            totalCount: req.count,
            iconLink: req.iconLink,
            wikiLink: `https://escapefromtarkov.fandom.com/wiki/${encodeURIComponent(req.item)}`,
            sources: [{
              moduleName: module.name,
              level: nextLevel,
              count: req.count
            }]
          });
        }
      });
    });

    return Array.from(materialMap.values()).sort((a, b) => b.totalCount - a.totalCount);
  }, [upgradableStations]);

  if (upgradableStations.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          📋 拡張可能な施設
        </h3>
        <p className="text-gray-600">
          現在のPMCレベルと施設レベルでは、拡張可能な施設がありません。
        </p>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-green-800 mb-4">
        📋 拡張可能な施設と必要素材
      </h3>
      
      {/* 拡張可能な施設一覧 */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-green-700 mb-2">
          拡張可能な施設 ({upgradableStations.length}件)
        </h4>
        <div className="flex flex-wrap gap-2">
          {upgradableStations.map(({ module, nextLevel }) => (
            <span
              key={`${module.name}-${nextLevel}`}
              className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full border border-green-300"
            >
              {module.name} → Lv.{nextLevel}
            </span>
          ))}
        </div>
      </div>

      {/* 必要素材まとめ */}
      {materialSummary.length > 0 && (
        <div>
          <h4 className="text-md font-medium text-green-700 mb-3">
            必要素材まとめ ({materialSummary.length}種類)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
            {materialSummary.map(material => (
              <div
                key={material.item}
                className="bg-white border border-green-200 rounded-lg p-3 hover:shadow-md transition-shadow"
                title={`${material.item} - 使用施設: ${material.sources.map(s => `${s.moduleName} Lv.${s.level}`).join(', ')}`}
              >
                <div className="flex flex-col items-center space-y-2">
                  {material.iconLink && (
                    <img
                      src={material.iconLink}
                      alt={material.item}
                      className="w-12 h-12 rounded border border-gray-200"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  )}
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-700">
                      {material.totalCount}
                    </div>
                    <a
                      href={material.wikiLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 hover:underline block truncate max-w-full"
                      title={material.item}
                    >
                      {material.item}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-4 text-sm text-green-600">
        💡 これらの素材を集めることで、現在利用可能な全ての施設拡張を実行できます。
      </div>
    </div>
  );
};