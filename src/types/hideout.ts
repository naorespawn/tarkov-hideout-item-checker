export interface HideoutModule {
  id: string;
  name: string;
  levels: HideoutLevel[];
}

export interface HideoutLevel {
  level: number;
  requirements: Requirement[];
}

export interface Requirement {
  item: string;
  count: number;
  nonFunctional?: boolean;
}

export interface ItemIcon {
  name: string;
  iconUrl: string;
  wikiLink: string;
}

export interface UserProgress {
  [moduleId: string]: number; // current level
}