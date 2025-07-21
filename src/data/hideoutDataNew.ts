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
        roubles: 75000,
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
        roubles: 150000,
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
        roubles: 50000,
        requirements: [
          { item: 'Metal spare parts', count: 2 },
          { item: 'CPU fan', count: 3 },
          { item: 'Car battery', count: 1 },
          { item: 'Electric motor', count: 1 }
        ]
      },
      {
        level: 3,
        roubles: 100000,
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
        roubles: 75000,
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
        roubles: 25000,
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
        roubles: 50000,
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
        requirements: [
          { item: 'WD-40 (100ml)', count: 4 },
          { item: 'Hand drill', count: 1 },
          { item: 'Pack of nails', count: 5 },
          { item: 'Pack of screws', count: 10 }
        ],
        modulePrerequisites: [
          { module: 'Vents', level: 1 }
        ]
      },
      {
        level: 3,
        roubles: 8500000,
        requirements: [
          { item: 'Electric drill', count: 2 },
          { item: 'Pack of screws', count: 15 },
          { item: 'Pack of nails', count: 7 }
        ],
        modulePrerequisites: [
          { module: 'Vents', level: 2 },
          { module: 'Heating', level: 2 }
        ],
        traderRequirements: [
          { trader: 'Prapor', level: 3 },
          { trader: 'Ragman', level: 3 }
        ]
      },
      {
        level: 4,
        euros: 200000,
        requirements: [
          { item: 'Screw nuts', count: 10 },
          { item: 'Bolts', count: 10 },
          { item: 'Shustrilo sealing foam', count: 5 },
          { item: 'Ratchet wrench', count: 2 }
        ],
        modulePrerequisites: [
          { module: 'Generator', level: 3 },
          { module: 'Workbench', level: 3 },
          { module: 'Heating', level: 3 },
          { module: 'Intelligence Center', level: 2 }
        ],
        traderRequirements: [
          { trader: 'Peacekeeper', level: 4 },
          { trader: 'Ragman', level: 4 }
        ]
      }
    ]
  },
  {
    id: 'water_collector',
    name: 'Water collector',
    levels: [
      {
        level: 1,
        roubles: 10000,
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
        roubles: 50000,
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
          { item: 'Disposable syringe', count: 1 },
          { item: 'Pile of meds', count: 1 },
          { item: 'Aseptic bandage', count: 2 },
          { item: 'Bottle of OLOLO Multivitamins', count: 1 }
        ]
      },
      {
        level: 2,
        roubles: 150000,
        requirements: [
          { item: 'Bottle of saline solution', count: 3 },
          { item: 'Medical bloodset', count: 2 },
          { item: 'Esmarch tourniquet', count: 5 },
          { item: 'Medical tools', count: 3 }
        ],
        modulePrerequisites: [
          { module: 'Generator', level: 1 }
        ],
        traderRequirements: [
          { trader: 'Therapist', level: 2 }
        ],
        skillRequirements: [
          { skill: 'Health', level: 2 }
        ]
      },
      {
        level: 3,
        roubles: 500000,
        requirements: [
          { item: 'Ophthalmoscope', count: 1 },
          { item: 'Bottle of saline solution', count: 4 },
          { item: 'LEDX Skin Transilluminator', count: 1 }
        ],
        modulePrerequisites: [
          { module: 'Generator', level: 2 },
          { module: 'Lavatory', level: 2 }
        ],
        traderRequirements: [
          { trader: 'Therapist', level: 3 },
          { trader: 'Skier', level: 2 }
        ],
        skillRequirements: [
          { skill: 'Vitality', level: 3 }
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
        roubles: 25000,
        requirements: [
          { item: 'Can of white salt', count: 1 },
          { item: 'Power cord', count: 1 },
          { item: 'Phase control relay', count: 2 }
        ],
        modulePrerequisites: [
          { module: 'Generator', level: 1 }
        ]
      },
      {
        level: 2,
        roubles: 75000,
        requirements: [
          { item: 'Wrench', count: 4 },
          { item: 'Corrugated hose', count: 2 },
          { item: 'Alkaline cleaner for heat exchangers', count: 2 },
          { item: 'Phase control relay', count: 1 }
        ],
        modulePrerequisites: [
          { module: 'Lavatory', level: 2 }
        ]
      },
      {
        level: 3,
        roubles: 125000,
        requirements: [
          { item: 'Can of Majaica coffee beans', count: 3 },
          { item: 'Pack of sodium bicarbonate', count: 3 },
          { item: 'Smoked Chimney drain cleaner', count: 2 }
        ],
        modulePrerequisites: [
          { module: 'Generator', level: 2 },
          { module: 'Lavatory', level: 3 },
          { module: 'Stash', level: 2 }
        ],
        skillRequirements: [
          { skill: 'Metabolism', level: 3 }
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
          { item: 'GreenBat lithium battery', count: 5 },
          { item: 'Power cord', count: 4 },
          { item: 'Capacitors', count: 5 },
          { item: 'Bundle of wires', count: 7 }
        ],
        traderRequirements: [
          { trader: 'Skier', level: 3 }
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
        roubles: 10000,
        requirements: [
          { item: 'Screw nuts', count: 2 },
          { item: 'Bolts', count: 2 },
          { item: 'Leatherman Multitool', count: 1 }
        ]
      },
      {
        level: 2,
        roubles: 50000,
        requirements: [
          { item: 'Bolts', count: 6 },
          { item: 'Toolset', count: 3 },
          { item: 'Set of files "Master"', count: 1 },
          { item: 'Electric drill', count: 2 },
          { item: 'Weapon parts', count: 3 }
        ],
        modulePrerequisites: [
          { module: 'Illumination', level: 2 }
        ],
        traderRequirements: [
          { trader: 'Mechanic', level: 2 }
        ]
      },
      {
        level: 3,
        roubles: 395000,
        requirements: [
          { item: 'Pliers Elite', count: 2 },
          { item: '#FireKlean gun lube', count: 1 },
          { item: 'Can of thermite', count: 2 }
        ],
        modulePrerequisites: [
          { module: 'Generator', level: 2 },
          { module: 'Stash', level: 2 }
        ],
        traderRequirements: [
          { trader: 'Mechanic', level: 3 }
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
        roubles: 250000,
        requirements: [
          { item: 'Factory plan map', count: 1 },
          { item: 'Intelligence folder', count: 1 },
          { item: 'Topographic survey map', count: 1 }
        ],
        modulePrerequisites: [
          { module: 'Security', level: 2 },
          { module: 'Vents', level: 2 }
        ]
      },
      {
        level: 2,
        roubles: 650000,
        requirements: [
          { item: 'Intelligence folder', count: 3 },
          { item: 'Secure Flash drive', count: 3 },
          { item: 'Power cord', count: 7 },
          { item: 'Damaged hard drive', count: 4 }
        ],
        modulePrerequisites: [
          { module: 'Security', level: 3 },
          { module: 'Medstation', level: 3 },
          { module: 'Nutrition unit', level: 3 }
        ],
        traderRequirements: [
          { trader: 'Mechanic', level: 2 }
        ],
        skillRequirements: [
          { skill: 'Attention', level: 3 }
        ]
      },
      {
        level: 3,
        roubles: 1500000,
        requirements: [
          { item: 'Military cable', count: 5 },
          { item: 'Military COFDM Wireless Signal Transmitter', count: 2 },
          { item: 'Far-forward GPS Signal Amplifier Unit', count: 1 },
          { item: 'VPX Flash Storage Module', count: 2 },
          { item: 'Military flash drive', count: 5 },
          { item: 'Secure magnetic tape cassette', count: 2 }
        ],
        modulePrerequisites: [
          { module: 'Workbench', level: 3 },
          { module: 'Generator', level: 3 }
        ],
        traderRequirements: [
          { trader: 'Prapor', level: 3 }
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
        roubles: 150000,
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
        roubles: 400000,
        requirements: [
          { item: 'Set of files "Master"', count: 1 },
          { item: 'Printed circuit board', count: 3 },
          { item: 'Bundle of wires', count: 5 },
          { item: 'Metal spare parts', count: 5 },
          { item: 'Capacitors', count: 5 },
          { item: 'Phase control relay', count: 3 },
          { item: 'Power cord', count: 5 },
          { item: 'Leatherman Multitool', count: 1 },
          { item: 'Tech manual', count: 1 }
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
        roubles: 50000,
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
        requirements: [
          { item: 'Classic matches', count: 2 }
        ]
      },
      {
        level: 2,
        roubles: 50000,
        requirements: [
          { item: 'Dry fuel', count: 3 },
          { item: 'Hunting matches', count: 2 },
          { item: 'Crickent lighter', count: 3 }
        ],
        modulePrerequisites: [
          { module: 'Vents', level: 1 }
        ],
        skillRequirements: [
          { skill: 'Endurance', level: 1 }
        ]
      },
      {
        level: 3,
        roubles: 125000,
        requirements: [
          { item: 'Radiator helix', count: 8 },
          { item: 'Bundle of wires', count: 8 },
          { item: 'Phase control relay', count: 4 },
          { item: 'Military corrugated tube', count: 2 }
        ],
        modulePrerequisites: [
          { module: 'Generator', level: 2 },
          { module: 'Workbench', level: 2 }
        ],
        traderRequirements: [
          { trader: 'Ragman', level: 2 }
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
        roubles: 25000,
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
        dollars: 25000,
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
        euros: 25000,
        requirements: [
          { item: 'Phased array element', count: 4 },
          { item: 'Advanced current converter', count: 1 },
          { item: 'Working LCD', count: 3 },
          { item: 'Military cable', count: 10 },
          { item: 'Military power filter', count: 10 }
        ],
        modulePrerequisites: [
          { module: 'Generator', level: 3 },
          { module: 'Workbench', level: 3 }
        ],
        traderRequirements: [
          { trader: 'Peacekeeper', level: 4 }
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
        roubles: 200000,
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
        roubles: 400000,
        requirements: [
          { item: 'CPU fan', count: 15 },
          { item: 'Power supply unit', count: 10 },
          { item: 'Printed circuit board', count: 15 },
          { item: 'Phase control relay', count: 5 },
          { item: 'Military power filter', count: 2 }
        ],
        modulePrerequisites: [
          { module: 'Generator', level: 3 }
        ]
      },
      {
        level: 3,
        roubles: 800000,
        requirements: [
          { item: 'CPU fan', count: 25 },
          { item: 'Silicone tube', count: 15 },
          { item: 'Electric motor', count: 10 },
          { item: 'Pressure gauge', count: 10 },
          { item: '6-STEN-140-M military battery', count: 1 }
        ],
        modulePrerequisites: [
          { module: 'Solar power', level: 1 },
          { module: 'Water collector', level: 3 }
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
        roubles: 100000,
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