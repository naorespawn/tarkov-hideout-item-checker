import React, { useState, useEffect } from 'react';
import { HideoutModule } from './HideoutModule';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { HideoutModule as HideoutModuleType, UserProgress } from '../types/hideout';
import { HideoutDataService } from '../services/hideoutDataService';
import { hideoutModules as fallbackData } from '../data/hideoutDataNew';

export const HideoutTracker: React.FC = () => {
  const [userProgress, setUserProgress] = useLocalStorage<UserProgress>('hideout-progress', {});
  const [hideoutModules, setHideoutModules] = useState<HideoutModuleType[]>(fallbackData);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'api' | 'fallback' | 'cache'>('fallback');

  useEffect(() => {
    const loadHideoutData = async () => {
      try {
        setLoading(true);
        const data = await HideoutDataService.getCachedOrFreshData();
        setHideoutModules(data);
        setDataSource('api');
      } catch (error) {
        console.error('Failed to load hideout data, using fallback:', error);
        setHideoutModules(fallbackData);
        setDataSource('fallback');
      } finally {
        setLoading(false);
      }
    };

    loadHideoutData();
  }, []);

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

  const refreshData = async () => {
    try {
      setLoading(true);
      localStorage.removeItem('hideout-data');
      localStorage.removeItem('hideout-data-timestamp');
      const data = await HideoutDataService.fetchLatestHideoutData();
      setHideoutModules(data);
      setDataSource('api');
      localStorage.setItem('hideout-data', JSON.stringify(data));
      localStorage.setItem('hideout-data-timestamp', Date.now().toString());
    } catch (error) {
      console.error('Failed to refresh data:', error);
      alert('データの更新に失敗しました。インターネット接続を確認してください。');
    } finally {
      setLoading(false);
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
        <p className="text-gray-500 mb-4">
          各施設のレベルを設定して、必要な素材を確認しましょう
        </p>
        <div className={`border rounded-lg p-4 mb-6 ${
          loading ? 'bg-yellow-50 border-yellow-200' : 
          dataSource === 'api' ? 'bg-green-50 border-green-200' : 
          'bg-blue-50 border-blue-200'
        }`}>
          <p className={`text-sm ${
            loading ? 'text-yellow-800' : 
            dataSource === 'api' ? 'text-green-800' : 
            'text-blue-800'
          }`}>
            {loading ? (
              <>
                <strong>⏳ 読み込み中:</strong> tarkov.dev APIから最新データを取得しています...
              </>
            ) : dataSource === 'api' ? (
              <>
                <strong>✅ 最新データ:</strong> tarkov.dev APIから最新のHideoutデータを取得済み。
                データは24時間キャッシュされます。
              </>
            ) : (
              <>
                <strong>⚠️ フォールバック:</strong> APIが利用できないため、内蔵データを使用中。
                最新情報は
                <a 
                  href="https://tarkov.dev/hideout" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline ml-1"
                >
                  tarkov.dev
                </a>
                でご確認ください。
              </>
            )}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={refreshData}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded transition-colors"
          >
            {loading ? '更新中...' : 'データを更新'}
          </button>
          <button
            onClick={resetProgress}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
          >
            進捗をリセット
          </button>
        </div>
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