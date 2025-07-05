interface StationRequirement {
  stationId: string;
  stationName: string;
  requiredLevel: number;
}

interface HideoutPrerequisite {
  stationId: string;
  stationName: string;
  level: number;
  requirements: StationRequirement[];
}

export class HideoutPrerequisiteService {
  private static prerequisites: HideoutPrerequisite[] = [
    // Air Filtering Unit
    {
      stationId: "5d494a315b56502f18c98a0a",
      stationName: "Air Filtering Unit",
      level: 1,
      requirements: [
        { stationId: "5d3b396e33c48f02b81cd9f3", stationName: "Generator", requiredLevel: 3 },
        { stationId: "5d473c1e081959000e530190", stationName: "Vents", requiredLevel: 3 }
      ]
    },
    
    // Bitcoin Farm
    {
      stationId: "5d494a445b56502f18c98a10",
      stationName: "Bitcoin Farm",
      level: 1,
      requirements: [
        { stationId: "5d484fdf654e7600691aadf8", stationName: "Intelligence Center", requiredLevel: 2 }
      ]
    },
    {
      stationId: "5d494a445b56502f18c98a10", 
      stationName: "Bitcoin Farm",
      level: 2,
      requirements: [
        { stationId: "5d3b396e33c48f02b81cd9f3", stationName: "Generator", requiredLevel: 3 }
      ]
    },
    {
      stationId: "5d494a445b56502f18c98a10",
      stationName: "Bitcoin Farm", 
      level: 3,
      requirements: [
        { stationId: "5d494a385b56502f18c98a0c", stationName: "Solar Power", requiredLevel: 1 },
        { stationId: "5d484fc8654e760065037abf", stationName: "Water Collector", requiredLevel: 3 }
      ]
    },

    // Booze Generator
    {
      stationId: "5d494a3f5b56502f18c98a0e",
      stationName: "Booze Generator",
      level: 1,
      requirements: [
        { stationId: "5d484fc8654e760065037abf", stationName: "Water Collector", requiredLevel: 3 },
        { stationId: "5d484fd1654e76006732bf2e", stationName: "Nutrition Unit", requiredLevel: 3 }
      ]
    },

    // Cultist Circle
    {
      stationId: "667298e75ea6b4493c08f266",
      stationName: "Cultist Circle",
      level: 1,
      requirements: [
        { stationId: "5d484fb3654e7600681d9314", stationName: "Security", requiredLevel: 2 }
      ]
    },

    // Generator
    {
      stationId: "5d3b396e33c48f02b81cd9f3",
      stationName: "Generator",
      level: 1,
      requirements: [
        { stationId: "5d484fb3654e7600681d9314", stationName: "Security", requiredLevel: 1 }
      ]
    },
    {
      stationId: "5d3b396e33c48f02b81cd9f3",
      stationName: "Generator",
      level: 2,
      requirements: [
        { stationId: "5d484fb3654e7600681d9314", stationName: "Security", requiredLevel: 2 },
        { stationId: "5d473c1e081959000e530190", stationName: "Vents", requiredLevel: 2 }
      ]
    },
    {
      stationId: "5d3b396e33c48f02b81cd9f3",
      stationName: "Generator",
      level: 3,
      requirements: [
        { stationId: "5d484fb3654e7600681d9314", stationName: "Security", requiredLevel: 3 },
        { stationId: "5d473c1e081959000e530190", stationName: "Vents", requiredLevel: 3 }
      ]
    },

    // Heating
    {
      stationId: "5d388e97081959000a123acf",
      stationName: "Heating",
      level: 2,
      requirements: [
        { stationId: "5d473c1e081959000e530190", stationName: "Vents", requiredLevel: 1 }
      ]
    },
    {
      stationId: "5d388e97081959000a123acf",
      stationName: "Heating",
      level: 3,
      requirements: [
        { stationId: "5d3b396e33c48f02b81cd9f3", stationName: "Generator", requiredLevel: 2 },
        { stationId: "5d484fda654e7600681d9315", stationName: "Workbench", requiredLevel: 2 }
      ]
    },

    // Intelligence Center
    {
      stationId: "5d484fdf654e7600691aadf8",
      stationName: "Intelligence Center",
      level: 1,
      requirements: [
        { stationId: "5d484fb3654e7600681d9314", stationName: "Security", requiredLevel: 2 },
        { stationId: "5d473c1e081959000e530190", stationName: "Vents", requiredLevel: 2 }
      ]
    },
    {
      stationId: "5d484fdf654e7600691aadf8",
      stationName: "Intelligence Center",
      level: 2,
      requirements: [
        { stationId: "5d484fb3654e7600681d9314", stationName: "Security", requiredLevel: 3 },
        { stationId: "5d484fcd654e7668ec2ec322", stationName: "Medstation", requiredLevel: 3 },
        { stationId: "5d484fd1654e76006732bf2e", stationName: "Nutrition Unit", requiredLevel: 3 }
      ]
    },
    {
      stationId: "5d484fdf654e7600691aadf8",
      stationName: "Intelligence Center",
      level: 3,
      requirements: [
        { stationId: "5d484fda654e7600681d9315", stationName: "Workbench", requiredLevel: 3 },
        { stationId: "5d3b396e33c48f02b81cd9f3", stationName: "Generator", requiredLevel: 3 }
      ]
    },

    // Lavatory
    {
      stationId: "5d484fba654e7600691aadf7",
      stationName: "Lavatory",
      level: 2,
      requirements: [
        { stationId: "5d484fc8654e760065037abf", stationName: "Water Collector", requiredLevel: 1 },
        { stationId: "5d473c1e081959000e530190", stationName: "Vents", requiredLevel: 1 }
      ]
    },
    {
      stationId: "5d484fba654e7600691aadf7",
      stationName: "Lavatory",
      level: 3,
      requirements: [
        { stationId: "5d473c1e081959000e530190", stationName: "Vents", requiredLevel: 2 },
        { stationId: "5d484fc8654e760065037abf", stationName: "Water Collector", requiredLevel: 2 }
      ]
    },

    // Library
    {
      stationId: "5d494a0e5b56502f18c98a02",
      stationName: "Library",
      level: 1,
      requirements: [
        { stationId: "5d484fd6654e76051d3cc791", stationName: "Rest Space", requiredLevel: 3 }
      ]
    },

    // Medstation
    {
      stationId: "5d484fcd654e7668ec2ec322",
      stationName: "Medstation",
      level: 2,
      requirements: [
        { stationId: "5d3b396e33c48f02b81cd9f3", stationName: "Generator", requiredLevel: 1 }
      ]
    },
    {
      stationId: "5d484fcd654e7668ec2ec322",
      stationName: "Medstation",
      level: 3,
      requirements: [
        { stationId: "5d3b396e33c48f02b81cd9f3", stationName: "Generator", requiredLevel: 2 },
        { stationId: "5d484fba654e7600691aadf7", stationName: "Lavatory", requiredLevel: 2 }
      ]
    },

    // Nutrition Unit
    {
      stationId: "5d484fd1654e76006732bf2e",
      stationName: "Nutrition Unit",
      level: 1,
      requirements: [
        { stationId: "5d3b396e33c48f02b81cd9f3", stationName: "Generator", requiredLevel: 1 }
      ]
    },
    {
      stationId: "5d484fd1654e76006732bf2e",
      stationName: "Nutrition Unit",
      level: 2,
      requirements: [
        { stationId: "5d484fba654e7600691aadf7", stationName: "Lavatory", requiredLevel: 2 }
      ]
    },
    {
      stationId: "5d484fd1654e76006732bf2e",
      stationName: "Nutrition Unit",
      level: 3,
      requirements: [
        { stationId: "5d3b396e33c48f02b81cd9f3", stationName: "Generator", requiredLevel: 2 },
        { stationId: "5d484fba654e7600691aadf7", stationName: "Lavatory", requiredLevel: 3 },
        { stationId: "5d484fc0654e76006657e0ab", stationName: "Stash", requiredLevel: 2 }
      ]
    },

    // Rest Space
    {
      stationId: "5d484fd6654e76051d3cc791",
      stationName: "Rest Space",
      level: 1,
      requirements: [
        { stationId: "5d473c1e081959000e530190", stationName: "Vents", requiredLevel: 1 }
      ]
    },
    {
      stationId: "5d484fd6654e76051d3cc791",
      stationName: "Rest Space",
      level: 2,
      requirements: [
        { stationId: "5d3b396e33c48f02b81cd9f3", stationName: "Generator", requiredLevel: 2 },
        { stationId: "5d388e97081959000a123acf", stationName: "Heating", requiredLevel: 2 }
      ]
    },
    {
      stationId: "5d484fd6654e76051d3cc791",
      stationName: "Rest Space",
      level: 3,
      requirements: [
        { stationId: "5d3b396e33c48f02b81cd9f3", stationName: "Generator", requiredLevel: 3 },
        { stationId: "5d388e97081959000a123acf", stationName: "Heating", requiredLevel: 3 }
      ]
    },

    // Scav Case
    {
      stationId: "5d494a175b56502f18c98a04",
      stationName: "Scav Case",
      level: 1,
      requirements: [
        { stationId: "5d484fdf654e7600691aadf8", stationName: "Intelligence Center", requiredLevel: 2 }
      ]
    },

    // Security (level 2+ requires Illumination)
    {
      stationId: "5d484fb3654e7600681d9314",
      stationName: "Security",
      level: 2,
      requirements: [
        { stationId: "5d494a205b56502f18c98a06", stationName: "Illumination", requiredLevel: 1 }
      ]
    },
    {
      stationId: "5d484fb3654e7600681d9314",
      stationName: "Security",
      level: 3,
      requirements: [
        { stationId: "5d494a205b56502f18c98a06", stationName: "Illumination", requiredLevel: 3 }
      ]
    },

    // Shooting Range
    {
      stationId: "5d484fe3654e76006657e0ac",
      stationName: "Shooting Range",
      level: 1,
      requirements: [
        { stationId: "5d494a205b56502f18c98a06", stationName: "Illumination", requiredLevel: 1 }
      ]
    },
    {
      stationId: "5d484fe3654e76006657e0ac",
      stationName: "Shooting Range",
      level: 2,
      requirements: [
        { stationId: "5d494a205b56502f18c98a06", stationName: "Illumination", requiredLevel: 3 },
        { stationId: "5d484fda654e7600681d9315", stationName: "Workbench", requiredLevel: 2 }
      ]
    },

    // Solar Power
    {
      stationId: "5d494a385b56502f18c98a0c",
      stationName: "Solar Power",
      level: 1,
      requirements: [
        { stationId: "5d3b396e33c48f02b81cd9f3", stationName: "Generator", requiredLevel: 3 },
        { stationId: "5d484fda654e7600681d9315", stationName: "Workbench", requiredLevel: 3 }
      ]
    },

    // Stash
    {
      stationId: "5d484fc0654e76006657e0ab",
      stationName: "Stash",
      level: 2,
      requirements: [
        { stationId: "5d473c1e081959000e530190", stationName: "Vents", requiredLevel: 1 }
      ]
    },
    {
      stationId: "5d484fc0654e76006657e0ab",
      stationName: "Stash",
      level: 3,
      requirements: [
        { stationId: "5d473c1e081959000e530190", stationName: "Vents", requiredLevel: 2 },
        { stationId: "5d388e97081959000a123acf", stationName: "Heating", requiredLevel: 2 }
      ]
    },
    {
      stationId: "5d484fc0654e76006657e0ab",
      stationName: "Stash",
      level: 4,
      requirements: [
        { stationId: "5d3b396e33c48f02b81cd9f3", stationName: "Generator", requiredLevel: 3 },
        { stationId: "5d484fda654e7600681d9315", stationName: "Workbench", requiredLevel: 3 },
        { stationId: "5d388e97081959000a123acf", stationName: "Heating", requiredLevel: 3 },
        { stationId: "5d484fdf654e7600691aadf8", stationName: "Intelligence Center", requiredLevel: 2 }
      ]
    },

    // Water Collector
    {
      stationId: "5d484fc8654e760065037abf",
      stationName: "Water Collector",
      level: 1,
      requirements: [
        { stationId: "5d484fb3654e7600681d9314", stationName: "Security", requiredLevel: 1 }
      ]
    },
    {
      stationId: "5d484fc8654e760065037abf",
      stationName: "Water Collector",
      level: 2,
      requirements: [
        { stationId: "5d484fda654e7600681d9315", stationName: "Workbench", requiredLevel: 2 }
      ]
    },
    {
      stationId: "5d484fc8654e760065037abf",
      stationName: "Water Collector",
      level: 3,
      requirements: [
        { stationId: "5d3b396e33c48f02b81cd9f3", stationName: "Generator", requiredLevel: 3 },
        { stationId: "5d388e97081959000a123acf", stationName: "Heating", requiredLevel: 3 }
      ]
    },

    // Workbench
    {
      stationId: "5d484fda654e7600681d9315",
      stationName: "Workbench",
      level: 2,
      requirements: [
        { stationId: "5d494a205b56502f18c98a06", stationName: "Illumination", requiredLevel: 2 }
      ]
    },
    {
      stationId: "5d484fda654e7600681d9315",
      stationName: "Workbench",
      level: 3,
      requirements: [
        { stationId: "5d3b396e33c48f02b81cd9f3", stationName: "Generator", requiredLevel: 2 },
        { stationId: "5d484fc0654e76006657e0ab", stationName: "Stash", requiredLevel: 2 }
      ]
    },

    // Illumination
    {
      stationId: "5d494a205b56502f18c98a06",
      stationName: "Illumination",
      level: 2,
      requirements: [
        { stationId: "5d3b396e33c48f02b81cd9f3", stationName: "Generator", requiredLevel: 1 }
      ]
    },
    {
      stationId: "5d494a205b56502f18c98a06",
      stationName: "Illumination",
      level: 3,
      requirements: [
        { stationId: "5d3b396e33c48f02b81cd9f3", stationName: "Generator", requiredLevel: 2 },
        { stationId: "5d484fda654e7600681d9315", stationName: "Workbench", requiredLevel: 1 }
      ]
    },

    // Weapon Rack
    {
      stationId: "63db64cbf9963741dc0d741f",
      stationName: "Weapon Rack",
      level: 1,
      requirements: [
        { stationId: "5d494a205b56502f18c98a06", stationName: "Illumination", requiredLevel: 3 },
        { stationId: "5d484fc0654e76006657e0ab", stationName: "Stash", requiredLevel: 2 }
      ]
    },
    {
      stationId: "63db64cbf9963741dc0d741f",
      stationName: "Weapon Rack",
      level: 2,
      requirements: [
        { stationId: "5d484fe3654e76006657e0ac", stationName: "Shooting Range", requiredLevel: 2 },
        { stationId: "5d484fda654e7600681d9315", stationName: "Workbench", requiredLevel: 2 },
        { stationId: "5d484fc0654e76006657e0ab", stationName: "Stash", requiredLevel: 3 }
      ]
    },
    {
      stationId: "63db64cbf9963741dc0d741f",
      stationName: "Weapon Rack",
      level: 3,
      requirements: [
        { stationId: "5d484fe3654e76006657e0ac", stationName: "Shooting Range", requiredLevel: 3 },
        { stationId: "5d484fda654e7600681d9315", stationName: "Workbench", requiredLevel: 3 }
      ]
    },

    // Defective Wall
    {
      stationId: "637b39f02e873739ec490215",
      stationName: "Defective Wall",
      level: 1,
      requirements: [
        { stationId: "5d484fcd654e7668ec2ec322", stationName: "Medstation", requiredLevel: 1 },
        { stationId: "5d484fc8654e760065037abf", stationName: "Water Collector", requiredLevel: 1 }
      ]
    },

    // Gym
    {
      stationId: "6377a9b9a93bde8fa30eb79a",
      stationName: "Gym",
      level: 1,
      requirements: [
        { stationId: "637b39f02e873739ec490215", stationName: "Defective Wall", requiredLevel: 6 },
        { stationId: "5d494a205b56502f18c98a06", stationName: "Illumination", requiredLevel: 2 },
        { stationId: "5d473c1e081959000e530190", stationName: "Vents", requiredLevel: 2 }
      ]
    },

    // Gear Rack
    {
      stationId: "65e5bb1713227bb7690cea0a",
      stationName: "Gear Rack",
      level: 1,
      requirements: [
        { stationId: "637b39f02e873739ec490215", stationName: "Defective Wall", requiredLevel: 6 },
        { stationId: "5d494a205b56502f18c98a06", stationName: "Illumination", requiredLevel: 2 }
      ]
    },
    {
      stationId: "65e5bb1713227bb7690cea0a",
      stationName: "Gear Rack",
      level: 2,
      requirements: [
        { stationId: "5d494a295b56502f18c98a08", stationName: "Hall of Fame", requiredLevel: 1 }
      ]
    },
    {
      stationId: "65e5bb1713227bb7690cea0a",
      stationName: "Gear Rack",
      level: 3,
      requirements: [
        { stationId: "5d494a295b56502f18c98a08", stationName: "Hall of Fame", requiredLevel: 2 }
      ]
    },

    // Hall of Fame
    {
      stationId: "5d494a295b56502f18c98a08",
      stationName: "Hall of Fame",
      level: 1,
      requirements: [
        { stationId: "637b39f02e873739ec490215", stationName: "Defective Wall", requiredLevel: 6 },
        { stationId: "5d494a205b56502f18c98a06", stationName: "Illumination", requiredLevel: 2 }
      ]
    }
  ];

  private static getStationIdByName(name: string): string | null {
    const stationMap: { [key: string]: string } = {
      "air filtering unit": "5d494a315b56502f18c98a0a",
      "bitcoin farm": "5d494a445b56502f18c98a10", 
      "booze generator": "5d494a3f5b56502f18c98a0e",
      "cultist circle": "667298e75ea6b4493c08f266",
      "defective wall": "637b39f02e873739ec490215",
      "gear rack": "65e5bb1713227bb7690cea0a",
      "generator": "5d3b396e33c48f02b81cd9f3",
      "gym": "6377a9b9a93bde8fa30eb79a",
      "hall of fame": "5d494a295b56502f18c98a08",
      "heating": "5d388e97081959000a123acf",
      "intelligence center": "5d484fdf654e7600691aadf8",
      "lavatory": "5d484fba654e7600691aadf7",
      "library": "5d494a0e5b56502f18c98a02",
      "medstation": "5d484fcd654e7668ec2ec322",
      "nutrition unit": "5d484fd1654e76006732bf2e",
      "rest space": "5d484fd6654e76051d3cc791",
      "scav case": "5d494a175b56502f18c98a04",
      "security": "5d484fb3654e7600681d9314",
      "shooting range": "5d484fe3654e76006657e0ac",
      "solar power": "5d494a385b56502f18c98a0c",
      "stash": "5d484fc0654e76006657e0ab",
      "vents": "5d473c1e081959000e530190",
      "water collector": "5d484fc8654e760065037abf",
      "weapon rack": "63db64cbf9963741dc0d741f",
      "workbench": "5d484fda654e7600681d9315",
      "illumination": "5d494a205b56502f18c98a06"
    };

    return stationMap[name.toLowerCase()] || null;
  }

  static isStationLevelAvailable(
    stationName: string, 
    targetLevel: number, 
    userProgress: { [stationName: string]: number }
  ): boolean {
    const stationId = this.getStationIdByName(stationName);
    if (!stationId) return true; // Unknown station, assume available

    // Find prerequisites for this station and level
    const prerequisite = this.prerequisites.find(
      p => p.stationId === stationId && p.level === targetLevel
    );

    if (!prerequisite) return true; // No prerequisites, available

    // Check all requirements
    return prerequisite.requirements.every(req => {
      const currentLevel = userProgress[req.stationName] || 0;
      return currentLevel >= req.requiredLevel;
    });
  }

  static isStationAvailable(
    stationName: string,
    userProgress: { [stationName: string]: number }
  ): boolean {
    // A station is available if level 1 can be built
    return this.isStationLevelAvailable(stationName, 1, userProgress);
  }

  static getUnavailableReasons(
    stationName: string,
    targetLevel: number,
    userProgress: { [stationName: string]: number }
  ): string[] {
    const stationId = this.getStationIdByName(stationName);
    if (!stationId) return [];

    const prerequisite = this.prerequisites.find(
      p => p.stationId === stationId && p.level === targetLevel
    );

    if (!prerequisite) return [];

    const reasons: string[] = [];
    prerequisite.requirements.forEach(req => {
      const currentLevel = userProgress[req.stationName] || 0;
      if (currentLevel < req.requiredLevel) {
        reasons.push(`${req.stationName} レベル${req.requiredLevel}が必要 (現在: レベル${currentLevel})`);
      }
    });

    return reasons;
  }
}