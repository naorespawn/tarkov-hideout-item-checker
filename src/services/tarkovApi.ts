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
    'Measuring tape': 'Construction measuring tape'
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
      const mappedNames = itemNames.map(name => this.mapItemName(name));
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
        variables: { names: mappedNames }
      });
      
      const items: TarkovDevItem[] = response.data.data.items || [];
      items.forEach(item => {
        // Find the original name that corresponds to this mapped name
        const originalName = itemNames.find(name => this.mapItemName(name) === item.name) || item.name;
        iconMap.set(originalName, {
          name: item.name,
          iconUrl: item.iconLink,
          wikiLink: `https://escapefromtarkov.fandom.com/wiki/${encodeURIComponent(originalName.replace(/ /g, '_'))}`
        });
      });
      
      return iconMap;
    } catch (error) {
      console.error('Failed to fetch multiple item icons:', error);
      return iconMap;
    }
  }
}