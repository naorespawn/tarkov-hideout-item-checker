import axios from 'axios';
import { ItemIcon } from '../types/hideout';

interface TarkovDevItem {
  name: string;
  iconLink: string;
  link: string;
}

export class TarkovApiService {
  private static readonly API_BASE = 'https://api.tarkov.dev/graphql';
  
  // Item name mapping for tarkov.dev API
  private static readonly ITEM_NAME_MAPPING: { [key: string]: string } = {
    'Alkali': 'Alkaline cleaner for heat exchangers',
    'Hose': 'Corrugated hose', 
    'Thermometer': 'Analog thermometer',
    'Cord': 'Paracord',
    'Nails': 'Pack of nails',
    'Measuring tape': 'Construction measuring tape',
    'Matches': 'Hunting matches',
    'Pliers': 'Pliers',
    'Insulating tape': 'Insulating tape',
    'Military corrugated tube': 'Corrugated hose',
    'VPX Flash Storage Module': 'VPX flash storage module',
    'T-Shaped plug': 'T-shaped plug',
    'Pipe grip wrench': 'Pipe gripping wrench',
    'Ratchet wrench': 'Ratchet wrench',
    'Shustrilo sealing foam': 'Shustrilo sealing foam',
    'WD-40 (100ml)': 'WD-40 (100ml)',
    'TP-200 TNT brick': 'TP-200 TNT brick',
    'NIXXOR lens': 'NIXXOR lens',
    'Working LCD': 'Working LCD',
    'SSD drive': 'SSD drive',
    'Analgin painkillers': 'Analgin painkillers',
    'Army bandage': 'Army bandage',
    'Bulbex cable cutter': 'Bulbex cable cutter'
  };
  
  private static mapItemName(itemName: string): string {
    return this.ITEM_NAME_MAPPING[itemName] || itemName;
  }
  
  static async getItemIcon(itemName: string): Promise<ItemIcon | null> {
    try {
      const mappedName = this.mapItemName(itemName);
      const query = `
        query GetItem($name: String!) {
          items(name: $name) {
            name
            iconLink
            link
          }
        }
      `;
      
      const response = await axios.post(this.API_BASE, {
        query,
        variables: { name: mappedName }
      });
      
      const items = response.data.data.items;
      if (items && items.length > 0) {
        const item: TarkovDevItem = items[0];
        return {
          name: item.name,
          iconUrl: item.iconLink,
          wikiLink: `https://escapefromtarkov.fandom.com/wiki/${encodeURIComponent(itemName.replace(/ /g, '_'))}`
        };
      }
      
      return null;
    } catch (error) {
      console.error(`Failed to fetch icon for ${itemName}:`, error);
      return null;
    }
  }
  
  static async getMultipleItemIcons(itemNames: string[]): Promise<Map<string, ItemIcon>> {
    const iconMap = new Map<string, ItemIcon>();
    
    try {
      // Create mapping of original names to mapped names
      const nameMapping = new Map<string, string>();
      const uniqueMappedNames = new Set<string>();
      
      itemNames.forEach(originalName => {
        const mappedName = this.mapItemName(originalName);
        nameMapping.set(mappedName, originalName);
        uniqueMappedNames.add(mappedName);
      });
      
      const query = `
        query GetItems($names: [String!]!) {
          items(names: $names) {
            name
            iconLink
            link
          }
        }
      `;
      
      const response = await axios.post(this.API_BASE, {
        query,
        variables: { names: Array.from(uniqueMappedNames) }
      });
      
      const items: TarkovDevItem[] = response.data.data.items || [];
      items.forEach(item => {
        const originalName = nameMapping.get(item.name);
        if (originalName) {
          iconMap.set(originalName, {
            name: item.name,
            iconUrl: item.iconLink,
            wikiLink: `https://escapefromtarkov.fandom.com/wiki/${encodeURIComponent(originalName.replace(/ /g, '_'))}`
          });
        }
      });
      
      return iconMap;
    } catch (error) {
      console.error('Failed to fetch multiple item icons:', error);
      return iconMap;
    }
  }
}