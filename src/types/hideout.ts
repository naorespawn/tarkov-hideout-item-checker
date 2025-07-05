export interface HideoutModule {
  id: string;
  name: string;
  levels: HideoutLevel[];
}

export interface HideoutLevel {
  level: number;
  requirements: Requirement[];
  roubles?: number;
  modulePrerequisites?: ModulePrerequisite[];
  traderRequirements?: TraderRequirement[];
  skillRequirements?: SkillRequirement[];
}

export interface Requirement {
  item: string;
  count: number;
  nonFunctional?: boolean;
  iconLink?: string;
}

export interface ModulePrerequisite {
  module: string;
  level: number;
}

export interface TraderRequirement {
  trader: string;
  level: number;
}

export interface SkillRequirement {
  skill: string;
  level: number;
}

export interface ItemIcon {
  name: string;
  iconUrl: string;
  wikiLink: string;
}

export interface UserProgress {
  [moduleId: string]: number; // current level
}

export interface PlayerLevel {
  level: number; // 1-4 (Trader levels)
}

export type GameEdition = 'standard' | 'left_behind' | 'prepare_for_escape' | 'edge_of_darkness';

export interface EditionConfig {
  name: string;
  displayName: string;
  stashLevel: number;
  cultistCircleLevel: number;
}