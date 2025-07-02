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