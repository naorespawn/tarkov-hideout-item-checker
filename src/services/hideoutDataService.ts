import axios from 'axios';
import { HideoutModule, HideoutLevel } from '../types/hideout';

interface APIStation {
  id: string;
  name: string;
  levels: APILevel[];
}

interface APILevel {
  level: number;
  itemRequirements: APIItemRequirement[];
  stationLevelRequirements: APIStationRequirement[];
  traderRequirements: APITraderRequirement[];
  skillRequirements: APISkillRequirement[];
}

interface APIItemRequirement {
  count: number;
  item: {
    name: string;
    iconLink: string;
  };
}

interface APIStationRequirement {
  level: number;
  station: {
    name: string;
  };
}

interface APITraderRequirement {
  level: number;
  trader: {
    name: string;
  };
}

interface APISkillRequirement {
  level: number;
  skill: {
    name: string;
  };
}

export class HideoutDataService {
  private static readonly API_BASE = 'https://api.tarkov.dev/graphql';

  static async fetchLatestHideoutData(): Promise<HideoutModule[]> {
    try {
      const query = `
        query {
          hideoutStations {
            id
            name
            levels {
              level
              itemRequirements {
                item {
                  name
                  iconLink
                }
                count
              }
              stationLevelRequirements {
                station {
                  name
                }
                level
              }
              traderRequirements {
                trader {
                  name
                }
                level
              }
              skillRequirements {
                skill {
                  name
                }
                level
              }
            }
          }
        }
      `;

      const response = await axios.post(this.API_BASE, { query });
      const stations: APIStation[] = response.data.data.hideoutStations;

      return stations.map(station => this.convertStationToModule(station));
    } catch (error) {
      console.error('Failed to fetch latest hideout data:', error);
      throw error;
    }
  }

  private static convertStationToModule(station: APIStation): HideoutModule {
    const id = this.normalizeStationName(station.name);
    
    return {
      id,
      name: station.name,
      levels: station.levels.map(level => this.convertLevel(level))
    };
  }

  private static convertLevel(apiLevel: APILevel): HideoutLevel {
    const level: HideoutLevel = {
      level: apiLevel.level,
      requirements: []
    };

    // Convert item requirements
    apiLevel.itemRequirements.forEach(req => {
      if (req.item.name === 'Roubles') {
        // Handle roubles separately
        level.roubles = (level.roubles || 0) + req.count;
      } else if (req.item.name === 'Euros' || req.item.name === 'Dollars') {
        // Convert other currencies to roubles (approximate)
        const exchangeRate = req.item.name === 'Euros' ? 130 : 120; // Approximate rates
        level.roubles = (level.roubles || 0) + (req.count * exchangeRate);
      } else {
        level.requirements.push({
          item: req.item.name,
          count: req.count,
          iconLink: req.item.iconLink
        });
      }
    });

    // Convert station requirements
    if (apiLevel.stationLevelRequirements.length > 0) {
      level.modulePrerequisites = apiLevel.stationLevelRequirements
        .filter(req => req.station.name !== undefined)
        .map(req => ({
          module: req.station.name,
          level: req.level
        }));
    }

    // Convert trader requirements
    if (apiLevel.traderRequirements.length > 0) {
      level.traderRequirements = apiLevel.traderRequirements.map(req => ({
        trader: req.trader.name,
        level: req.level
      }));
    }

    // Convert skill requirements
    if (apiLevel.skillRequirements.length > 0) {
      level.skillRequirements = apiLevel.skillRequirements.map(req => ({
        skill: req.skill.name,
        level: req.level
      }));
    }

    return level;
  }

  private static normalizeStationName(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '_');
  }

  static async getCachedOrFreshData(): Promise<HideoutModule[]> {
    try {
      // Try to get cached data first
      const cachedData = localStorage.getItem('hideout-data');
      const cacheTimestamp = localStorage.getItem('hideout-data-timestamp');
      
      const now = Date.now();
      const cacheAge = cacheTimestamp ? now - parseInt(cacheTimestamp) : Infinity;
      const maxCacheAge = 24 * 60 * 60 * 1000; // 24 hours

      if (cachedData && cacheAge < maxCacheAge) {
        console.log('Using cached hideout data');
        return JSON.parse(cachedData);
      }

      // Fetch fresh data
      console.log('Fetching fresh hideout data from API');
      const freshData = await this.fetchLatestHideoutData();
      
      // Cache the fresh data
      localStorage.setItem('hideout-data', JSON.stringify(freshData));
      localStorage.setItem('hideout-data-timestamp', now.toString());
      
      return freshData;
    } catch (error) {
      console.error('Failed to get hideout data:', error);
      
      // Fallback to cached data if available
      const cachedData = localStorage.getItem('hideout-data');
      if (cachedData) {
        console.log('Using cached data as fallback');
        return JSON.parse(cachedData);
      }
      
      throw error;
    }
  }
}