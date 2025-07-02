import { HideoutModule } from '../types/hideout';

// Updated hideout data based on official wiki - partial implementation
export const hideoutModules: HideoutModule[] = [
  {
    id: 'generator',
    name: 'Generator',
    levels: [
      {
        level: 1,
        roubles: 100000,
        requirements: [
          { item: 'Spark plug', count: 1 }
        ],
        modulePrerequisites: [
          { module: 'Security', level: 1 }
        ]
      },
      {
        level: 2,
        requirements: [
          { item: 'Bulbex cable cutter', count: 1 },
          { item: 'Phase control relay', count: 5 },
          { item: 'Electric motor', count: 1 },
          { item: 'Bundle of wires', count: 15 }
        ],
        modulePrerequisites: [
          { module: 'Security', level: 2 },
          { module: 'Vents', level: 2 }
        ]
      },
      {
        level: 3,
        requirements: [
          { item: 'Power supply unit', count: 5 },
          { item: 'Phase control relay', count: 6 },
          { item: 'Electric motor', count: 3 },
          { item: 'Spark plug', count: 10 },
          { item: 'Metal spare parts', count: 7 }
        ],
        modulePrerequisites: [
          { module: 'Security', level: 3 },
          { module: 'Vents', level: 3 }
        ],
        traderRequirements: [
          { trader: 'Mechanic', level: 3 }
        ]
      }
    ]
  },
  {
    id: 'vents',
    name: 'Vents',
    levels: [
      {
        level: 1,
        roubles: 25000,
        requirements: []
      },
      {
        level: 2,
        requirements: [
          { item: 'Metal spare parts', count: 2 },
          { item: 'CPU fan', count: 3 },
          { item: 'Car battery', count: 1 },
          { item: 'Electric motor', count: 1 }
        ]
      },
      {
        level: 3,
        requirements: [
          { item: 'Printed circuit board', count: 5 },
          { item: 'Electric motor', count: 4 },
          { item: 'Metal spare parts', count: 5 },
          { item: 'Bundle of wires', count: 14 },
          { item: 'Car battery', count: 4 }
        ],
        modulePrerequisites: [
          { module: 'Generator', level: 2 }
        ],
        skillRequirements: [
          { skill: 'Strength', level: 2 }
        ]
      }
    ]
  },
  {
    id: 'security',
    name: 'Security',
    levels: [
      {
        level: 1,
        roubles: 20000,
        requirements: [
          { item: 'Construction measuring tape', count: 1 }
        ]
      },
      {
        level: 2,
        roubles: 45000,
        requirements: [
          { item: 'WD-40 (100ml)', count: 1 },
          { item: 'Pliers Elite', count: 1 },
          { item: 'TP-200 TNT brick', count: 1 }
        ],
        modulePrerequisites: [
          { module: 'Illumination', level: 1 }
        ],
        skillRequirements: [
          { skill: 'Endurance', level: 2 }
        ]
      },
      {
        level: 3,
        requirements: [
          { item: 'NIXXOR lens', count: 8 },
          { item: 'Working LCD', count: 2 },
          { item: 'Bundle of wires', count: 4 },
          { item: 'SSD drive', count: 1 }
        ],
        modulePrerequisites: [
          { module: 'Illumination', level: 3 }
        ],
        traderRequirements: [
          { trader: 'Mechanic', level: 2 }
        ]
      }
    ]
  },
  {
    id: 'lavatory',
    name: 'Lavatory',
    levels: [
      {
        level: 1,
        roubles: 2000,
        requirements: [
          { item: 'Toilet paper', count: 1 },
          { item: 'Toothpaste', count: 1 },
          { item: 'Soap', count: 1 },
          { item: 'Awl', count: 1 }
        ]
      },
      {
        level: 2,
        requirements: [
          { item: 'KEKTAPE duct tape', count: 1 },
          { item: 'Corrugated hose', count: 3 },
          { item: 'Pack of screws', count: 5 },
          { item: 'Electric drill', count: 1 },
          { item: 'Sewing kit', count: 2 }
        ],
        modulePrerequisites: [
          { module: 'Vents', level: 1 }
        ]
      },
      {
        level: 3,
        requirements: [
          { item: 'Metal spare parts', count: 8 },
          { item: 'Silicone tube', count: 4 },
          { item: 'Electric motor', count: 2 },
          { item: 'Pressure gauge', count: 1 }
        ],
        modulePrerequisites: [
          { module: 'Vents', level: 2 }
        ]
      }
    ]
  },
  {
    id: 'stash',
    name: 'Stash',
    levels: [
      {
        level: 2,
        roubles: 2500000,
        requirements: []
      },
      {
        level: 3,
        roubles: 8500000,
        requirements: []
      },
      {
        level: 4,
        roubles: 21000000,
        requirements: []
      }
    ]
  }
];

// Note: This is a partial implementation with accurate data for core modules.
// Additional modules need to be added following the same pattern.