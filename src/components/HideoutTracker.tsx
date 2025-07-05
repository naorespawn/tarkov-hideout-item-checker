import React, { useState, useEffect } from 'react';
import { HideoutModule } from './HideoutModule';
import { MaterialSummary } from './MaterialSummary';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { HideoutModule as HideoutModuleType, UserProgress, GameEdition } from '../types/hideout';
import { TraderLevelService } from '../services/traderLevelService';
import { HideoutPrerequisiteService } from '../services/hideoutPrerequisiteService';
import { GameEditionService } from '../services/gameEditionService';
import { hideoutModules as fallbackData } from '../data/hideoutDataNew';

export const HideoutTracker: React.FC = () => {
  const [userProgress, setUserProgress] = useLocalStorage<UserProgress>('hideout-progress', {});
  const [pmcLevel, setPmcLevel] = useLocalStorage<number>('pmc-level', 1);
  const [gameEdition, setGameEdition] = useLocalStorage<GameEdition>('game-edition', 'standard');
  const [showCompleted, setShowCompleted] = useLocalStorage<boolean>('show-completed', true);
  const [hideoutModules] = useState<HideoutModuleType[]>(fallbackData);


  // Initialize user progress based on game edition when modules are loaded
  useEffect(() => {
    if (hideoutModules.length > 0 && Object.keys(userProgress).length === 0) {
      const initialProgress = GameEditionService.initializeProgressForEdition(gameEdition, hideoutModules);
      setUserProgress(initialProgress);
    }
  }, [hideoutModules, gameEdition]);

  const handleLevelChange = (moduleId: string, level: number) => {
    setUserProgress((prev: UserProgress) => ({
      ...prev,
      [moduleId]: level
    }));
  };

  const resetProgress = () => {
    if (window.confirm('全ての進捗をリセットしますか？')) {
      const initialProgress = GameEditionService.initializeProgressForEdition(gameEdition, hideoutModules);
      setUserProgress(initialProgress);
    }
  };

  const handleEditionChange = (edition: GameEdition) => {
    if (window.confirm('ゲームエディションを変更すると、進捗がリセットされます。続行しますか？')) {
      setGameEdition(edition);
      const initialProgress = GameEditionService.initializeProgressForEdition(edition, hideoutModules);
      setUserProgress(initialProgress);
    }
  };

  const isModuleAvailable = (module: HideoutModuleType): boolean => {
    // First check PMC level requirements
    if (!TraderLevelService.isStationAvailableAtPMCLevel(module.name, pmcLevel)) {
      return false;
    }
    
    // Convert userProgress (by moduleId) to progress by module name
    const userProgressByName: { [moduleName: string]: number } = {};
    Object.entries(userProgress).forEach(([moduleId, level]) => {
      const matchingModule = hideoutModules.find(m => m.id === moduleId);
      if (matchingModule) {
        userProgressByName[matchingModule.name] = level;
      }
    });
    
    // Check if any level of this module can be built
    const currentLevel = userProgressByName[module.name] || 0;
    const nextLevel = currentLevel + 1;
    
    // If already at max level, still show as available (will be filtered out later if showCompleted is false)
    const maxLevel = Math.max(...module.levels.map(l => l.level));
    if (currentLevel >= maxLevel) {
      return true;
    }
    
    // Check if the next level can be built
    return HideoutPrerequisiteService.isStationLevelAvailable(module.name, nextLevel, userProgressByName);
  };

  const isModuleCompleted = (module: HideoutModuleType): boolean => {
    const currentLevel = userProgress[module.id] || 0;
    const maxLevel = Math.max(...module.levels.map(l => l.level));
    return currentLevel >= maxLevel;
  };

  const filteredModules = hideoutModules.filter(module => {
    // First check if module is available
    if (!isModuleAvailable(module)) {
      return false;
    }
    
    // If showCompleted is false, hide completed modules
    if (!showCompleted && isModuleCompleted(module)) {
      return false;
    }
    
    return true;
  });


  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Escape from Tarkov
        </h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          Hideout アイテムチェッカー
        </h2>
        <p className="text-gray-500 mb-4">
          各施設のレベルを設定して、必要な素材を確認しましょう
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <button
            onClick={resetProgress}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
          >
            進捗をリセット
          </button>
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className={`px-4 py-2 rounded transition-colors ${
              showCompleted 
                ? 'bg-gray-500 hover:bg-gray-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {showCompleted ? '完了済みを非表示' : '完了済みを表示'}
          </button>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <label htmlFor="game-edition" className="text-purple-800 font-medium">
              ゲームエディション:
            </label>
            <select
              id="game-edition"
              value={gameEdition}
              onChange={(e) => handleEditionChange(e.target.value as GameEdition)}
              className="px-3 py-1 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {GameEditionService.getAllEditions().map(edition => (
                <option key={edition.name} value={edition.name}>
                  {edition.displayName}
                </option>
              ))}
            </select>
            <span className="text-sm text-purple-600">
              Stash: Lv.{GameEditionService.getEditionConfig(gameEdition).stashLevel}
              {gameEdition === 'edge_of_darkness' && ', Cultist Circle: Lv.1'}
            </span>
          </div>
          <div className="mt-2 text-sm text-purple-600 text-center">
            <p>ゲームエディションによってStashとCultist Circleの初期レベルが決まります</p>
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <label htmlFor="pmc-level" className="text-indigo-800 font-medium">
              PMCレベル:
            </label>
            <div className="flex items-center space-x-2">
              <input
                id="pmc-level"
                type="number"
                min="1"
                max="79"
                value={pmcLevel}
                onChange={(e) => setPmcLevel(Math.max(1, Math.min(79, parseInt(e.target.value) || 1)))}
                className="w-16 px-2 py-1 text-center border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="flex space-x-1">
                {[1, 15, 30, 42].map(level => (
                  <button
                    key={level}
                    onClick={() => setPmcLevel(level)}
                    className={`px-2 py-1 text-xs rounded transition-colors ${
                      pmcLevel === level
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-indigo-600 border border-indigo-300 hover:bg-indigo-100'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            <span className="text-sm text-indigo-600">
              ({filteredModules.length}/{hideoutModules.length} 施設が利用可能
              {!showCompleted && `, ${hideoutModules.filter(m => isModuleAvailable(m) && isModuleCompleted(m)).length}個完了済み非表示`})
            </span>
          </div>
          <div className="mt-2 text-sm text-indigo-600 text-center">
            <p>PMCレベルに基づいてトレーダーの利用可能レベルが決定され、施設の制約が適用されます</p>
            <p className="text-xs mt-1">
              クイック設定: Lv.1 (開始), Lv.15 (大部分解放), Lv.30 (高レベル制限), Lv.42 (全解放)
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto">
        <MaterialSummary 
          hideoutModules={hideoutModules}
          userProgress={userProgress}
          pmcLevel={pmcLevel}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredModules.map(module => (
            <HideoutModule
              key={module.id}
              module={module}
              userProgress={userProgress}
              onLevelChange={handleLevelChange}
              pmcLevel={pmcLevel}
              allModules={hideoutModules}
            />
          ))}
        </div>
      </div>

      <footer className="text-center mt-12 text-gray-500 text-sm">
        <p>データソース: 
          <a 
            href="https://escapefromtarkov.fandom.com/wiki/Hideout" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline ml-1"
          >
            Escape from Tarkov Wiki
          </a>
        </p>
        <p className="mt-1">アイコン提供: 
          <a 
            href="https://tarkov.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline ml-1"
          >
            tarkov.dev
          </a>
        </p>
      </footer>
    </div>
  );
};