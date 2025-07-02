import React from 'react';
import { hideoutModules } from '../data/hideoutData';
import { HideoutModule } from './HideoutModule';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { UserProgress } from '../types/hideout';

export const HideoutTracker: React.FC = () => {
  const [userProgress, setUserProgress] = useLocalStorage<UserProgress>('hideout-progress', {});

  const handleLevelChange = (moduleId: string, level: number) => {
    setUserProgress((prev: UserProgress) => ({
      ...prev,
      [moduleId]: level
    }));
  };

  const resetProgress = () => {
    if (window.confirm('全ての進捗をリセットしますか？')) {
      setUserProgress({});
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Escape from Tarkov
        </h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          Hideout アイテムチェッカー
        </h2>
        <p className="text-gray-500 mb-6">
          各施設のレベルを設定して、必要な素材を確認しましょう
        </p>
        <button
          onClick={resetProgress}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
        >
          進捗をリセット
        </button>
      </header>

      <div className="max-w-6xl mx-auto">
        {hideoutModules.map(module => (
          <HideoutModule
            key={module.id}
            module={module}
            userProgress={userProgress}
            onLevelChange={handleLevelChange}
          />
        ))}
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