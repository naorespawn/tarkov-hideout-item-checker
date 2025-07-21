import { HideoutModule } from '../types/hideout';

// Static hideout data based on https://escapefromtarkov.fandom.com/wiki/Hideout
export const hideoutModules: HideoutModule[] = [
  {
    id: 'vents',
    name: 'Vents',
    levels: [
      {
        level: 1,
        requirements: [
          { item: 'Metal spare parts', count: 4 },
          { item: 'Duct tape', count: 2 },
          { item: 'Electric motor', count: 2 }
        ]
      },
      {
        level: 2,
        requirements: [
          { item: 'Electric motor', count: 4 },
          { item: 'Car battery', count: 1 },
          { item: 'Phase control relay', count: 2 }
        ]
      },
      {
        level: 3,
        requirements: [
          { item: 'Electric motor', count: 6 },
          { item: 'Car battery', count: 2 },
          { item: 'Pressure gauge', count: 1 }
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
        requirements: [
          { item: 'Screw nuts', count: 6 },
          { item: 'Bolts', count: 4 },
          { item: 'Duct tape', count: 1 }
        ]
      },
      {
        level: 2,
        requirements: [
          { item: 'Alkali', count: 4 },
          { item: 'Screw nuts', count: 8 },
          { item: 'Bolts', count: 6 },
          { item: 'Metal cutting scissors', count: 1 }
        ]
      },
      {
        level: 3,
        requirements: [
          { item: 'Alkali', count: 8 },
          { item: 'Screw nuts', count: 14 },
          { item: 'Bolts', count: 12 },
          { item: 'Gunpowder "Eagle"', count: 4 }
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
        requirements: [
          { item: 'Metal spare parts', count: 4 },
          { item: 'Duct tape', count: 2 },
          { item: 'Toilet paper', count: 1 }
        ]
      },
      {
        level: 2,
        requirements: [
          { item: 'Metal spare parts', count: 8 },
          { item: 'Silicone tube', count: 2 },
          { item: 'Metal cutting scissors', count: 1 },
          { item: 'Hose', count: 1 }
        ]
      },
      {
        level: 3,
        requirements: [
          { item: 'Metal spare parts', count: 10 },
          { item: 'Silicone tube', count: 4 },
          { item: 'Electric motor', count: 2 },
          { item: 'Pressure gauge', count: 1 }
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
        requirements: [
          { item: 'Roubles', count: 3500000 }
        ]
      },
      {
        level: 3,
        requirements: [
          { item: 'Roubles', count: 8500000 }
        ]
      },
      {
        level: 4,
        requirements: [
          { item: 'Roubles', count: 21000000 }
        ]
      }
    ]
  },
  {
    id: 'generator',
    name: 'Generator',
    levels: [
      {
        level: 1,
        requirements: [
          { item: 'Metal spare parts', count: 5 },
          { item: 'Car battery', count: 1 },
          { item: 'Spark plug', count: 8 }
        ]
      },
      {
        level: 2,
        requirements: [
          { item: 'Metal spare parts', count: 5 },
          { item: 'Car battery', count: 2 },
          { item: 'Electric motor', count: 4 },
          { item: 'Phase control relay', count: 2 }
        ]
      },
      {
        level: 3,
        requirements: [
          { item: 'Metal spare parts', count: 8 },
          { item: 'Car battery', count: 3 },
          { item: 'Electric motor', count: 6 },
          { item: 'CPU fan', count: 6 }
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
        requirements: [
          { item: 'Metal spare parts', count: 4 },
          { item: 'Duct tape', count: 3 },
          { item: 'Radiator helix', count: 8 }
        ]
      },
      {
        level: 2,
        requirements: [
          { item: 'Metal spare parts', count: 6 },
          { item: 'Radiator helix', count: 12 },
          { item: 'Thermometer', count: 3 }
        ]
      },
      {
        level: 3,
        requirements: [
          { item: 'Metal spare parts', count: 8 },
          { item: 'Radiator helix', count: 16 },
          { item: 'Pressure gauge', count: 2 }
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
        requirements: [
          { item: 'Metal spare parts', count: 2 },
          { item: 'Duct tape', count: 1 },
          { item: 'Hose', count: 1 }
        ]
      },
      {
        level: 2,
        requirements: [
          { item: 'Metal spare parts', count: 4 },
          { item: 'Silicone tube', count: 2 },
          { item: 'Metal cutting scissors', count: 1 }
        ]
      },
      {
        level: 3,
        requirements: [
          { item: 'Metal spare parts', count: 8 },
          { item: 'Silicone tube', count: 4 },
          { item: 'Electric motor', count: 2 },
          { item: 'Pressure gauge', count: 1 }
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
        requirements: [
          { item: 'Morphine injector', count: 2 },
          { item: 'Medical bloodset', count: 2 },
          { item: 'Pile of meds', count: 1 }
        ]
      },
      {
        level: 2,
        requirements: [
          { item: 'Medical bloodset', count: 4 },
          { item: 'Pile of meds', count: 2 },
          { item: 'Ophthalmoscope', count: 1 },
          { item: 'Portable defibrillator', count: 1 }
        ]
      },
      {
        level: 3,
        requirements: [
          { item: 'LEDX Skin Transilluminator', count: 3 },
          { item: 'Ophthalmoscope', count: 1 },
          { item: 'Portable defibrillator', count: 2 }
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
          { item: 'Duct tape', count: 2 },
          { item: 'Metal spare parts', count: 4 },
          { item: 'Hunting matches', count: 3 }
        ]
      },
      {
        level: 2,
        requirements: [
          { item: 'Silicone tube', count: 2 },
          { item: 'Metal spare parts', count: 6 },
          { item: 'Thermometer', count: 2 },
          { item: 'Pressure gauge', count: 1 }
        ]
      },
      {
        level: 3,
        requirements: [
          { item: 'Silicone tube', count: 4 },
          { item: 'Metal spare parts', count: 8 },
          { item: 'Electric motor', count: 2 },
          { item: 'Pressure gauge', count: 2 }
        ]
      }
    ]
  },
  {
    id: 'rest_space',
    name: 'Rest space',
    levels: [
      {
        level: 1,
        requirements: [
          { item: 'Duct tape', count: 2 },
          { item: 'Metal spare parts', count: 2 },
          { item: 'Cord', count: 5 }
        ]
      },
      {
        level: 2,
        requirements: [
          { item: 'Nails', count: 8 },
          { item: 'Metal spare parts', count: 4 },
          { item: 'Cord', count: 8 },
          { item: 'Pliers', count: 1 }
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
        requirements: [
          { item: 'Nails', count: 5 },
          { item: 'Metal spare parts', count: 2 },
          { item: 'Bolts', count: 3 }
        ]
      },
      {
        level: 2,
        requirements: [
          { item: 'Nails', count: 8 },
          { item: 'Metal spare parts', count: 5 },
          { item: 'Bolts', count: 6 },
          { item: 'Screw nuts', count: 4 }
        ]
      },
      {
        level: 3,
        requirements: [
          { item: 'Nails', count: 15 },
          { item: 'Metal spare parts', count: 10 },
          { item: 'Bolts', count: 12 },
          { item: 'Screw nuts', count: 8 },
          { item: 'Metal cutting scissors', count: 1 }
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
    name: 'Shooting range',
    levels: [
      {
        level: 1,
        requirements: [
          { item: 'Metal spare parts', count: 5 },
          { item: 'Duct tape', count: 3 },
          { item: 'Nails', count: 15 }
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
          { item: 'BakeEzy cook book', count: 1 },
          { item: 'Slim diary', count: 2 },
          { item: 'Diary', count: 2 },
          { item: 'Tech manual', count: 5 },
          { item: 'Chainlet', count: 2 },
          { item: 'Horse figurine', count: 1 }
        ],
        skillRequirements: [
          { skill: 'Hideout Management', level: 5 }
        ],
        modulePrerequisites: [
          { module: 'Rest Space', level: 3 }
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
        requirements: [
          { item: 'Intelligence folder', count: 1 },
          { item: 'Moonshine', count: 1 },
          { item: 'Roubles', count: 1000000 }
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
        requirements: [
          { item: 'Light bulb', count: 6 },
          { item: 'Insulating tape', count: 4 },
          { item: 'Wires', count: 15 }
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
        requirements: [
          { item: 'Metal spare parts', count: 10 },
          { item: 'Electric motor', count: 5 },
          { item: 'Corrugated hose', count: 2 }
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
          { item: 'Graphics card', count: 10 },
          { item: 'Power supply unit', count: 5 },
          { item: 'Power cord', count: 15 },
          { item: 'Printed circuit board', count: 15 }
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
          { item: 'Metal spare parts', count: 8 },
          { item: 'Silicone tube', count: 6 },
          { item: 'Hose', count: 2 },
          { item: 'Thermometer', count: 4 }
        ]
      }
    ]
  },
  {
    id: 'christmas_tree',
    name: 'Christmas tree',
    levels: [
      {
        level: 1,
        requirements: [
          { item: 'Ornament (Red)', count: 3 },
          { item: 'Ornament (Silver)', count: 3 },
          { item: 'Ornament (Violet)', count: 3 }
        ]
      }
    ]
  }
];