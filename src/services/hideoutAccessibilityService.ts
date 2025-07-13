import { HideoutModule, UserProgress, TraderRequirement, Requirement } from '../types/hideout';
import { TraderLevelService } from './traderLevelService';
import { HideoutPrerequisiteService } from './hideoutPrerequisiteService';

export interface UpgradableModule {
  module: HideoutModule;
  nextLevel: number;
  requirements: Requirement[];
}

export class HideoutAccessibilityService {
  /**
   * Convert userProgress from moduleId-based to moduleName-based
   */
  static convertUserProgressToNameBased(
    userProgress: UserProgress, 
    allModules: HideoutModule[]
  ): { [moduleName: string]: number } {
    const userProgressByName: { [moduleName: string]: number } = {};
    Object.entries(userProgress).forEach(([moduleId, level]) => {
      const matchingModule = allModules.find(m => m.id === moduleId);
      if (matchingModule) {
        userProgressByName[matchingModule.name] = level;
      }
    });
    return userProgressByName;
  }

  /**
   * Check if trader requirements are met for a level
   */
  static areTraderRequirementsMet(
    traderRequirements: TraderRequirement[] | undefined,
    pmcLevel: number
  ): boolean {
    if (!traderRequirements || traderRequirements.length === 0) {
      return true;
    }
    
    return traderRequirements.every(traderReq => 
      TraderLevelService.isTraderLevelAvailable(traderReq.trader, traderReq.level, pmcLevel)
    );
  }

  /**
   * Check if a specific module level can be built
   */
  static canBuildModuleLevel(
    module: HideoutModule,
    targetLevel: number,
    userProgress: UserProgress,
    pmcLevel: number,
    allModules: HideoutModule[]
  ): boolean {
    const levelData = module.levels.find(l => l.level === targetLevel);
    if (!levelData) return false;

    // Check trader requirements
    if (!this.areTraderRequirementsMet(levelData.traderRequirements, pmcLevel)) {
      return false;
    }

    // Check module prerequisites
    if (levelData.modulePrerequisites) {
      const userProgressByName = this.convertUserProgressToNameBased(userProgress, allModules);
      for (const prereq of levelData.modulePrerequisites) {
        const currentPrereqLevel = userProgressByName[prereq.module] || 0;
        if (currentPrereqLevel < prereq.level) {
          return false;
        }
      }
    }

    // Check hideout prerequisite service for additional constraints
    const userProgressByName = this.convertUserProgressToNameBased(userProgress, allModules);
    return HideoutPrerequisiteService.isStationLevelAvailable(module.name, targetLevel, userProgressByName);
  }

  /**
   * Check if module has future PMC restrictions
   */
  static hasFuturePMCRestrictions(
    module: HideoutModule,
    currentLevel: number,
    pmcLevel: number
  ): boolean {
    return module.levels.some(level => {
      if (level.level <= currentLevel) return false;
      if (!level.traderRequirements) return false;
      return !this.areTraderRequirementsMet(level.traderRequirements, pmcLevel);
    });
  }

  /**
   * Check if a module is accessible (can build any future level)
   */
  static isModuleAccessible(
    module: HideoutModule,
    userProgress: UserProgress,
    pmcLevel: number,
    allModules: HideoutModule[]
  ): boolean {
    const currentLevel = userProgress[module.id] || 0;
    const maxLevel = Math.max(...module.levels.map(l => l.level));

    // Check if any level from current+1 to max has trader requirements that can't be met
    for (let checkLevel = currentLevel + 1; checkLevel <= maxLevel; checkLevel++) {
      const levelData = module.levels.find(l => l.level === checkLevel);
      if (levelData && levelData.traderRequirements) {
        if (!this.areTraderRequirementsMet(levelData.traderRequirements, pmcLevel)) {
          return false;
        }
      }
    }

    // Already at max level is accessible
    if (currentLevel >= maxLevel) {
      return true;
    }

    // Check if the next level can be built
    const nextLevel = currentLevel + 1;
    const userProgressByName = this.convertUserProgressToNameBased(userProgress, allModules);
    return HideoutPrerequisiteService.isStationLevelAvailable(module.name, nextLevel, userProgressByName);
  }

  /**
   * Get all upgradable modules (used by MaterialSummary)
   */
  static getUpgradableModules(
    hideoutModules: HideoutModule[],
    userProgress: UserProgress,
    pmcLevel: number
  ): UpgradableModule[] {
    const upgradableModules: UpgradableModule[] = [];

    hideoutModules.forEach(module => {
      const currentLevel = userProgress[module.id] || 0;
      const nextLevel = currentLevel + 1;

      // Check if next level exists
      const nextLevelData = module.levels.find(level => level.level === nextLevel);
      if (!nextLevelData) return;

      // Check PMC level restrictions (trader requirements)
      if (!this.areTraderRequirementsMet(nextLevelData.traderRequirements, pmcLevel)) {
        return;
      }

      // Check prerequisites
      const userProgressByName = this.convertUserProgressToNameBased(userProgress, hideoutModules);
      if (!HideoutPrerequisiteService.isStationLevelAvailable(module.name, nextLevel, userProgressByName)) {
        return;
      }

      upgradableModules.push({
        module,
        nextLevel,
        requirements: nextLevelData.requirements
      });
    });

    return upgradableModules;
  }
}