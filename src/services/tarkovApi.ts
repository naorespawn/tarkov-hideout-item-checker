import axios from 'axios';
import { ItemIcon } from '../types/hideout';

interface TarkovDevItem {
  name: string;
  iconLink: string;
  link: string;
}

export class TarkovApiService {
  private static readonly API_BASE = 'https://api.tarkov.dev/graphql';
  
  static async getItemIcon(itemName: string): Promise<ItemIcon | null> {
    try {
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
        variables: { name: itemName }
      });
      
      const items = response.data.data.items;
      if (items && items.length > 0) {
        const item: TarkovDevItem = items[0];
        return {
          name: item.name,
          iconUrl: item.iconLink,
          wikiLink: `https://escapefromtarkov.fandom.com/wiki/${encodeURIComponent(item.name.replace(/ /g, '_'))}`
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
        variables: { names: itemNames }
      });
      
      const items: TarkovDevItem[] = response.data.data.items || [];
      items.forEach(item => {
        iconMap.set(item.name, {
          name: item.name,
          iconUrl: item.iconLink,
          wikiLink: `https://escapefromtarkov.fandom.com/wiki/${encodeURIComponent(item.name.replace(/ /g, '_'))}`
        });
      });
      
      return iconMap;
    } catch (error) {
      console.error('Failed to fetch multiple item icons:', error);
      return iconMap;
    }
  }
}