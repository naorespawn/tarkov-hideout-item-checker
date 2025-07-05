interface TraderLevel {
  level: number;
  requiredPlayerLevel: number;
  requiredReputation: number;
}

interface Trader {
  id: string;
  name: string;
  levels: TraderLevel[];
}

interface HideoutStationRequirement {
  stationName: string;
  level: number;
  traderRequirements: {
    trader: string;
    level: number;
    requiredPMCLevel: number;
  }[];
}

export class TraderLevelService {
  private static traderData: Trader[] = [
    {
      id: "54cb50c76803fa8b248b4571",
      name: "Prapor",
      levels: [
        { level: 1, requiredPlayerLevel: 1, requiredReputation: 0 },
        { level: 2, requiredPlayerLevel: 15, requiredReputation: 0.2 },
        { level: 3, requiredPlayerLevel: 26, requiredReputation: 0.35 },
        { level: 4, requiredPlayerLevel: 36, requiredReputation: 0.5 }
      ]
    },
    {
      id: "54cb57776803fa99248b456e",
      name: "Therapist",
      levels: [
        { level: 1, requiredPlayerLevel: 0, requiredReputation: 0 },
        { level: 2, requiredPlayerLevel: 13, requiredReputation: 0.15 },
        { level: 3, requiredPlayerLevel: 24, requiredReputation: 0.3 },
        { level: 4, requiredPlayerLevel: 35, requiredReputation: 0.6 }
      ]
    },
    {
      id: "58330581ace78e27b8b10cee",
      name: "Skier",
      levels: [
        { level: 1, requiredPlayerLevel: 1, requiredReputation: 0 },
        { level: 2, requiredPlayerLevel: 15, requiredReputation: 0.2 },
        { level: 3, requiredPlayerLevel: 28, requiredReputation: 0.4 },
        { level: 4, requiredPlayerLevel: 38, requiredReputation: 0.75 }
      ]
    },
    {
      id: "5935c25fb3acc3127c3d8cd9",
      name: "Peacekeeper",
      levels: [
        { level: 1, requiredPlayerLevel: 1, requiredReputation: 0 },
        { level: 2, requiredPlayerLevel: 14, requiredReputation: 0 },
        { level: 3, requiredPlayerLevel: 23, requiredReputation: 0.3 },
        { level: 4, requiredPlayerLevel: 37, requiredReputation: 0.6 }
      ]
    },
    {
      id: "5a7c2eca46aef81a7ca2145d",
      name: "Mechanic",
      levels: [
        { level: 1, requiredPlayerLevel: 1, requiredReputation: 0 },
        { level: 2, requiredPlayerLevel: 20, requiredReputation: 0.15 },
        { level: 3, requiredPlayerLevel: 30, requiredReputation: 0.3 },
        { level: 4, requiredPlayerLevel: 40, requiredReputation: 0.6 }
      ]
    },
    {
      id: "5ac3b934156ae10c4430e83c",
      name: "Ragman",
      levels: [
        { level: 1, requiredPlayerLevel: 1, requiredReputation: 0 },
        { level: 2, requiredPlayerLevel: 17, requiredReputation: 0 },
        { level: 3, requiredPlayerLevel: 32, requiredReputation: 0.3 },
        { level: 4, requiredPlayerLevel: 42, requiredReputation: 0.6 }
      ]
    },
    {
      id: "5c0647fdd443bc2504c2d371",
      name: "Jaeger",
      levels: [
        { level: 1, requiredPlayerLevel: 1, requiredReputation: 0 },
        { level: 2, requiredPlayerLevel: 15, requiredReputation: 0.2 },
        { level: 3, requiredPlayerLevel: 22, requiredReputation: 0.35 },
        { level: 4, requiredPlayerLevel: 33, requiredReputation: 0.5 }
      ]
    }
  ];

  private static hideoutRequirements: HideoutStationRequirement[] = [
    // Level 1 (基本施設)
    { stationName: "Vents", level: 1, traderRequirements: [] },
    { stationName: "Workbench", level: 1, traderRequirements: [] },
    { stationName: "Rest Space", level: 1, traderRequirements: [] },
    { stationName: "Medstation", level: 1, traderRequirements: [] },
    { stationName: "Lavatory", level: 1, traderRequirements: [] },
    { stationName: "Stash", level: 1, traderRequirements: [] },
    { stationName: "Generator", level: 1, traderRequirements: [] },
    
    // Level 2+ (トレーダー制限あり)
    { stationName: "Security", level: 1, traderRequirements: [] },
    { stationName: "Heating", level: 1, traderRequirements: [] },
    { stationName: "Water Collector", level: 1, traderRequirements: [] },
    { stationName: "Booze Generator", level: 1, traderRequirements: [] },
    { stationName: "Scav Case", level: 1, traderRequirements: [] },
    { stationName: "Bitcoin Farm", level: 1, traderRequirements: [] },
    
    // Level 3+ (高レベルトレーダー制限)
    { stationName: "Intelligence Center", level: 1, traderRequirements: [] },
    { stationName: "Shooting Range", level: 1, traderRequirements: [] },
    { stationName: "Library", level: 1, traderRequirements: [] },
    
    // Level 4 (最高レベル制限)
    { stationName: "Air Filtering Unit", level: 1, traderRequirements: [
      { trader: "Skier", level: 3, requiredPMCLevel: 28 }
    ] },
    { stationName: "Solar Power", level: 1, traderRequirements: [
      { trader: "Peacekeeper", level: 4, requiredPMCLevel: 37 }
    ] }
  ];

  static getRequiredPMCLevelForTrader(traderName: string, traderLevel: number): number {
    const trader = this.traderData.find(t => t.name === traderName);
    if (!trader) return 1;
    
    const level = trader.levels.find(l => l.level === traderLevel);
    return level ? level.requiredPlayerLevel : 1;
  }

  static getMaxRequiredPMCLevelForStation(stationName: string): number {
    const requirement = this.hideoutRequirements.find(req => 
      req.stationName.toLowerCase() === stationName.toLowerCase()
    );
    
    if (!requirement || requirement.traderRequirements.length === 0) {
      return 1; // 基本施設は初期レベルで利用可能
    }

    // トレーダー要件の中で最も高いPMCレベル要件を返す
    return Math.max(...requirement.traderRequirements.map(req => req.requiredPMCLevel));
  }

  static isStationAvailableAtPMCLevel(stationName: string, pmcLevel: number): boolean {
    return pmcLevel >= this.getMaxRequiredPMCLevelForStation(stationName);
  }

  static getTraderLevelsAtPMCLevel(pmcLevel: number): { [traderName: string]: number } {
    const result: { [traderName: string]: number } = {};
    
    this.traderData.forEach(trader => {
      // PMCレベルで利用可能な最高のトレーダーレベルを見つける
      let maxLevel = 1;
      trader.levels.forEach(level => {
        if (level.requiredPlayerLevel <= pmcLevel) {
          maxLevel = Math.max(maxLevel, level.level);
        }
      });
      result[trader.name] = maxLevel;
    });
    
    return result;
  }

  static isTraderLevelAvailable(traderName: string, requiredLevel: number, pmcLevel: number): boolean {
    const trader = this.traderData.find(t => t.name === traderName);
    if (!trader) return false;
    
    const level = trader.levels.find(l => l.level === requiredLevel);
    if (!level) return false;
    
    return pmcLevel >= level.requiredPlayerLevel;
  }
}