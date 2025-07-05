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
  },
  {
    id: 'water_collector',
    name: 'Water collector',
    levels: [
      {
        level: 1,
        requirements: [
          { item: 'Duct tape', count: 3 },
          { item: 'Screw nuts', count: 5 },
          { item: 'Bolts', count: 5 },
          { item: 'Corrugated hose', count: 4 }
        ],
        modulePrerequisites: [
          { module: 'Security', level: 1 }
        ]
      },
      {
        level: 2,
        requirements: [
          { item: 'Toolset', count: 2 },
          { item: 'Corrugated hose', count: 6 },
          { item: 'Electric motor', count: 2 },
          { item: 'KEKTAPE duct tape', count: 2 }
        ],
        modulePrerequisites: [
          { module: 'Workbench', level: 2 }
        ],
        traderRequirements: [
          { trader: 'Jaeger', level: 2 }
        ],
        skillRequirements: [
          { skill: 'Attention', level: 3 }
        ]
      },
      {
        level: 3,
        roubles: 20000,
        requirements: [
          { item: 'Ratchet wrench', count: 1 },
          { item: 'Pliers Elite', count: 2 },
          { item: 'Shustrilo sealing foam', count: 5 }
        ],
        modulePrerequisites: [
          { module: 'Generator', level: 3 },
          { module: 'Heating', level: 3 }
        ],
        traderRequirements: [
          { trader: 'Jaeger', level: 3 }
        ]
      }
    ]
  },
  {
    id: 'medstation',
    name: 'Medstation',
    levels: [
      {
        level: 1,
        roubles: 50000,
        requirements: [
          { item: 'Pile of meds', count: 1 }
        ]
      },
      {
        level: 2,
        roubles: 150000,
        requirements: [
          { item: 'Medical bloodset', count: 2 }
        ],
        modulePrerequisites: [
          { module: 'Generator', level: 1 }
        ],
        traderRequirements: [
          { trader: 'Therapist', level: 2 }
        ]
      },
      {
        level: 3,
        roubles: 500000,
        requirements: [
          { item: 'LEDX Skin Transilluminator', count: 1 },
          { item: 'Ophthalmoscope', count: 1 }
        ],
        modulePrerequisites: [
          { module: 'Generator', level: 2 },
          { module: 'Lavatory', level: 2 }
        ]
      }
    ]
  },
  {
    id: 'nutrition_unit',
    name: 'Nutrition unit',
    levels: [
      {
        level: 1,
        requirements: [
          { item: 'Matches', count: 3 },
          { item: 'Duct tape', count: 2 },
          { item: 'Metal spare parts', count: 4 }
        ]
      },
      {
        level: 2,
        requirements: [
          { item: 'Silicone tube', count: 2 },
          { item: 'Metal spare parts', count: 6 },
          { item: 'Analog thermometer', count: 2 },
          { item: 'Pressure gauge', count: 1 }
        ],
        modulePrerequisites: [
          { module: 'Vents', level: 2 }
        ]
      },
      {
        level: 3,
        requirements: [
          { item: 'Silicone tube', count: 4 },
          { item: 'Metal spare parts', count: 8 },
          { item: 'Electric motor', count: 2 },
          { item: 'Pressure gauge', count: 2 }
        ],
        modulePrerequisites: [
          { module: 'Vents', level: 3 }
        ]
      }
    ]
  },
  {
    id: 'rest_space',
    name: 'Rest Space',
    levels: [
      {
        level: 1,
        roubles: 10000,
        requirements: [
          { item: 'Duct tape', count: 1 }
        ],
        modulePrerequisites: [
          { module: 'Vents', level: 1 }
        ]
      },
      {
        level: 2,
        roubles: 35000,
        requirements: [],
        modulePrerequisites: [
          { module: 'Generator', level: 2 },
          { module: 'Heating', level: 2 }
        ]
      },
      {
        level: 3,
        requirements: [
          { item: 'Power cord', count: 4 },
          { item: 'Bundle of wires', count: 7 }
        ],
        modulePrerequisites: [
          { module: 'Generator', level: 3 },
          { module: 'Heating', level: 3 }
        ]
      }
    ]
  },
  {
    id: 'workbench',
    name: 'Workbench',
    levels: [
      {
        level: 1,
        requirements: [
          { item: 'Screw nuts', count: 2 },
          { item: 'Bolts', count: 2 }
        ]
      },
      {
        level: 2,
        requirements: [
          { item: 'Toolset', count: 3 },
          { item: 'Electric drill', count: 2 },
          { item: 'Bolts', count: 6 }
        ],
        modulePrerequisites: [
          { module: 'Illumination', level: 2 }
        ]
      },
      {
        level: 3,
        roubles: 395000,
        requirements: [],
        modulePrerequisites: [
          { module: 'Generator', level: 2 },
          { module: 'Stash', level: 2 }
        ]
      }
    ]
  },
  {
    id: 'intelligence_center',
    name: 'Intelligence center',
    levels: [
      {
        level: 1,
        requirements: [
          { item: 'Graphics card', count: 1 },
          { item: 'Printed circuit board', count: 4 },
          { item: 'CPU fan', count: 6 }
        ]
      },
      {
        level: 2,
        requirements: [
          { item: 'Graphics card', count: 3 },
          { item: 'Printed circuit board', count: 8 },
          { item: 'CPU fan', count: 10 },
          { item: 'RAM', count: 8 }
        ]
      },
      {
        level: 3,
        requirements: [
          { item: 'Graphics card', count: 10 },
          { item: 'RAM', count: 15 },
          { item: 'Processor', count: 5 },
          { item: 'Power supply unit', count: 2 }
        ]
      }
    ]
  },
  {
    id: 'shooting_range',
    name: 'Shooting Range',
    levels: [
      {
        level: 1,
        roubles: 20000,
        requirements: [
          { item: 'Metal spare parts', count: 1 },
          { item: 'Bolts', count: 1 },
          { item: 'Screw nuts', count: 1 }
        ],
        modulePrerequisites: [
          { module: 'Illumination', level: 1 }
        ]
      },
      {
        level: 2,
        requirements: [
          { item: 'Electric motor', count: 3 },
          { item: 'Construction measuring tape', count: 1 },
          { item: 'Tube of Poxeram cold welding', count: 1 },
          { item: 'Toolset', count: 1 },
          { item: 'Pack of screws', count: 3 },
          { item: 'Electric drill', count: 1 },
          { item: 'Metal spare parts', count: 5 },
          { item: 'Bundle of wires', count: 3 }
        ],
        modulePrerequisites: [
          { module: 'Illumination', level: 3 },
          { module: 'Workbench', level: 2 }
        ]
      },
      {
        level: 3,
        requirements: [
          { item: 'Printed circuit board', count: 3 },
          { item: 'Bundle of wires', count: 5 },
          { item: 'Metal spare parts', count: 5 },
          { item: 'Phase control relay', count: 3 },
          { item: 'Power cord', count: 5 }
        ]
      }
    ]
  },
  {
    id: 'library',
    name: 'Library',
    levels: [
      {
        level: 1,
        requirements: [
          { item: 'Pack of nails', count: 8 },
          { item: 'Metal spare parts', count: 3 },
          { item: 'Bolts', count: 6 }
        ]
      }
    ]
  },
  {
    id: 'heating',
    name: 'Heating',
    levels: [
      {
        level: 1,
        roubles: 25000,
        requirements: []
      },
      {
        level: 2,
        roubles: 50000,
        requirements: [],
        modulePrerequisites: [
          { module: 'Vents', level: 1 }
        ]
      },
      {
        level: 3,
        requirements: [
          { item: 'Radiator helix', count: 8 },
          { item: 'Bundle of wires', count: 8 },
          { item: 'Phase control relay', count: 4 }
        ],
        modulePrerequisites: [
          { module: 'Generator', level: 2 },
          { module: 'Workbench', level: 2 }
        ]
      }
    ]
  },
  {
    id: 'scav_case',
    name: 'Scav case',
    levels: [
      {
        level: 1,
        roubles: 1000000,
        requirements: [
          { item: 'Intelligence folder', count: 1 },
          { item: 'Moonshine', count: 1 }
        ]
      }
    ]
  },
  {
    id: 'illumination',
    name: 'Illumination',
    levels: [
      {
        level: 1,
        roubles: 10000,
        requirements: [
          { item: 'Crickent lighter', count: 1 }
        ]
      },
      {
        level: 2,
        requirements: [
          { item: 'Light bulb', count: 14 },
          { item: 'Bundle of wires', count: 10 }
        ],
        modulePrerequisites: [
          { module: 'Generator', level: 1 }
        ]
      },
      {
        level: 3,
        roubles: 50000,
        requirements: [
          { item: 'Capacitors', count: 7 },
          { item: 'Energy-saving lamp', count: 12 },
          { item: 'Bundle of wires', count: 6 }
        ],
        modulePrerequisites: [
          { module: 'Generator', level: 2 },
          { module: 'Workbench', level: 1 }
        ],
        traderRequirements: [
          { trader: 'Mechanic', level: 2 }
        ]
      }
    ]
  },
  {
    id: 'air_filtering_unit',
    name: 'Air filtering unit',
    levels: [
      {
        level: 1,
        roubles: 25000,
        requirements: [
          { item: 'Gas mask air filter', count: 5 },
          { item: 'Military power filter', count: 5 },
          { item: 'Military corrugated tube', count: 3 }
        ],
        modulePrerequisites: [
          { module: 'Generator', level: 3 },
          { module: 'Vents', level: 3 }
        ],
        traderRequirements: [
          { trader: 'Skier', level: 3 }
        ]
      }
    ]
  },
  {
    id: 'solar_power',
    name: 'Solar power',
    levels: [
      {
        level: 1,
        requirements: [
          { item: 'Power supply unit', count: 10 },
          { item: 'Phase control relay', count: 15 },
          { item: 'Pressure gauge', count: 5 }
        ]
      }
    ]
  },
  {
    id: 'bitcoin_farm',
    name: 'Bitcoin farm',
    levels: [
      {
        level: 1,
        requirements: [
          { item: 'T-Shaped plug', count: 5 },
          { item: 'VPX Flash Storage Module', count: 1 },
          { item: 'Power cord', count: 10 },
          { item: 'Power supply unit', count: 10 },
          { item: 'CPU fan', count: 15 }
        ],
        modulePrerequisites: [
          { module: 'Intelligence center', level: 2 }
        ]
      },
      {
        level: 2,
        requirements: [
          { item: 'Graphics card', count: 15 },
          { item: 'Power supply unit', count: 5 },
          { item: 'CPU fan', count: 10 },
          { item: 'RAM', count: 10 }
        ]
      },
      {
        level: 3,
        requirements: [
          { item: 'Graphics card', count: 25 },
          { item: 'Power supply unit', count: 10 },
          { item: 'CPU fan', count: 15 },
          { item: 'Processor', count: 10 }
        ]
      }
    ]
  },
  {
    id: 'booze_generator',
    name: 'Booze generator',
    levels: [
      {
        level: 1,
        requirements: [
          { item: 'Metal spare parts', count: 2 },
          { item: 'Pressure gauge', count: 2 },
          { item: 'Radiator helix', count: 3 },
          { item: 'Silicone tube', count: 4 },
          { item: 'Pipe grip wrench', count: 1 },
          { item: 'Analog thermometer', count: 2 },
          { item: 'Corrugated hose', count: 5 }
        ],
        modulePrerequisites: [
          { module: 'Water collector', level: 3 },
          { module: 'Nutrition unit', level: 3 }
        ]
      }
    ]
  }
];

// Note: This implementation contains accurate data based on official wiki.
// Christmas tree is seasonal and data may vary.