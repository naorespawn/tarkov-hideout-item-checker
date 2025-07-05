import { GameEdition, EditionConfig, UserProgress } from '../types/hideout';

export class GameEditionService {
  private static readonly EDITION_CONFIGS: Record<GameEdition, EditionConfig> = {
    standard: {
      name: 'standard',
      displayName: 'Standard Edition',
      stashLevel: 1,
      cultistCircleLevel: 0
    },
    left_behind: {
      name: 'left_behind',
      displayName: 'Left Behind Edition',
      stashLevel: 2,
      cultistCircleLevel: 0
    },
    prepare_for_escape: {
      name: 'prepare_for_escape',
      displayName: 'Prepare for Escape Edition',
      stashLevel: 3,
      cultistCircleLevel: 0
    },
    edge_of_darkness: {
      name: 'edge_of_darkness',
      displayName: 'Edge of Darkness Edition',
      stashLevel: 4,
      cultistCircleLevel: 1
    }
  };

  static getEditionConfig(edition: GameEdition): EditionConfig {
    return this.EDITION_CONFIGS[edition];
  }

  static getAllEditions(): EditionConfig[] {
    return Object.values(this.EDITION_CONFIGS);
  }

  static getInitialProgress(edition: GameEdition, moduleId: string, moduleName: string): number {
    const config = this.getEditionConfig(edition);
    
    // Check if this is the Stash module
    if (moduleName === 'Stash') {
      return config.stashLevel;
    }
    
    // Check if this is the Cultist Circle module
    if (moduleName === 'Cultist Circle') {
      return config.cultistCircleLevel;
    }
    
    // Default to level 0 for all other modules
    return 0;
  }

  static initializeProgressForEdition(edition: GameEdition, modules: Array<{id: string, name: string}>): UserProgress {
    const progress: UserProgress = {};
    
    modules.forEach(module => {
      progress[module.id] = this.getInitialProgress(edition, module.id, module.name);
    });
    
    return progress;
  }
}