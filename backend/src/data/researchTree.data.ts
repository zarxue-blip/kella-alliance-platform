// Generated from the owner-provided CodFan research calculator reference.
// Kella uses this static snapshot and never calls CodFan at runtime.
export const lordResearchTreeData = {
  "economy": [
    {
      "id": "101",
      "name": "Ore Prospecting",
      "max": 1,
      "col": 0,
      "row": 0,
      "requires": [],
      "quality": "t1"
    },
    {
      "id": "102",
      "name": "Gold Processing I",
      "max": 5,
      "col": 1,
      "row": 1,
      "requires": [
        {
          "id": "101",
          "level": 1
        }
      ],
      "quality": "t1"
    },
    {
      "id": "103",
      "name": "Forestry I",
      "max": 5,
      "col": 1,
      "row": 2,
      "requires": [
        {
          "id": "101",
          "level": 1
        }
      ],
      "quality": "t1"
    },
    {
      "id": "104",
      "name": "Gold Mining I",
      "max": 5,
      "col": 2,
      "row": 1,
      "requires": [
        {
          "id": "102",
          "level": 1
        }
      ],
      "quality": "t1"
    },
    {
      "id": "105",
      "name": "Architecture I",
      "max": 5,
      "col": 2,
      "row": 2,
      "requires": [
        {
          "id": "102",
          "level": 1
        },
        {
          "id": "103",
          "level": 1
        }
      ],
      "quality": "t1"
    },
    {
      "id": "106",
      "name": "Logging Techniques I",
      "max": 5,
      "col": 2,
      "row": 3,
      "requires": [
        {
          "id": "103",
          "level": 1
        }
      ],
      "quality": "t1"
    },
    {
      "id": "107",
      "name": "Weak Points I",
      "max": 5,
      "col": 3,
      "row": 1,
      "requires": [
        {
          "id": "108",
          "level": 1
        }
      ],
      "quality": "t1"
    },
    {
      "id": "108",
      "name": "Container Upgrade I",
      "max": 5,
      "col": 3,
      "row": 2,
      "requires": [
        {
          "id": "105",
          "level": 1
        }
      ],
      "quality": "t1"
    },
    {
      "id": "109",
      "name": "Military Leadership I",
      "max": 5,
      "col": 3,
      "row": 3,
      "requires": [
        {
          "id": "108",
          "level": 1
        }
      ],
      "quality": "t1"
    },
    {
      "id": "145",
      "name": "Gem Prospecting",
      "max": 1,
      "col": 4,
      "row": 1,
      "requires": [
        {
          "id": "110",
          "level": 1
        }
      ],
      "quality": "t2"
    },
    {
      "id": "110",
      "name": "Mana Prospecting",
      "max": 1,
      "col": 4,
      "row": 2,
      "requires": [
        {
          "id": "108",
          "level": 1
        }
      ],
      "quality": "t2"
    },
    {
      "id": "111",
      "name": "Stamina I",
      "max": 5,
      "col": 5,
      "row": 1,
      "requires": [
        {
          "id": "110",
          "level": 1
        }
      ],
      "quality": "t2"
    },
    {
      "id": "112",
      "name": "Breath Control I",
      "max": 5,
      "col": 5,
      "row": 2,
      "requires": [
        {
          "id": "110",
          "level": 1
        }
      ],
      "quality": "t2"
    },
    {
      "id": "113",
      "name": "Ironworking I",
      "max": 5,
      "col": 6,
      "row": 1,
      "requires": [
        {
          "id": "114",
          "level": 1
        }
      ],
      "quality": "t2"
    },
    {
      "id": "114",
      "name": "Scholarship I",
      "max": 5,
      "col": 6,
      "row": 2,
      "requires": [
        {
          "id": "111",
          "level": 1
        },
        {
          "id": "112",
          "level": 1
        }
      ],
      "quality": "t2"
    },
    {
      "id": "115",
      "name": "Advanced Mana I",
      "max": 5,
      "col": 6,
      "row": 3,
      "requires": [
        {
          "id": "114",
          "level": 1
        }
      ],
      "quality": "t2"
    },
    {
      "id": "116",
      "name": "Rock Breaking I",
      "max": 5,
      "col": 7,
      "row": 1,
      "requires": [
        {
          "id": "113",
          "level": 1
        }
      ],
      "quality": "t2"
    },
    {
      "id": "117",
      "name": "Mana Harvesting I",
      "max": 5,
      "col": 7,
      "row": 3,
      "requires": [
        {
          "id": "115",
          "level": 1
        }
      ],
      "quality": "t2"
    },
    {
      "id": "118",
      "name": "Gold Processing II",
      "max": 10,
      "col": 8,
      "row": 1,
      "requires": [
        {
          "id": "119",
          "level": 1
        }
      ],
      "quality": "t2"
    },
    {
      "id": "119",
      "name": "Container Upgrade II",
      "max": 10,
      "col": 8,
      "row": 2,
      "requires": [
        {
          "id": "114",
          "level": 1
        }
      ],
      "quality": "t2"
    },
    {
      "id": "120",
      "name": "Forestry II",
      "max": 10,
      "col": 8,
      "row": 3,
      "requires": [
        {
          "id": "119",
          "level": 1
        }
      ],
      "quality": "t2"
    },
    {
      "id": "121",
      "name": "Ironworking II",
      "max": 10,
      "col": 9,
      "row": 1,
      "requires": [
        {
          "id": "118",
          "level": 1
        }
      ],
      "quality": "t2"
    },
    {
      "id": "122",
      "name": "Advanced Mana II",
      "max": 10,
      "col": 9,
      "row": 3,
      "requires": [
        {
          "id": "120",
          "level": 1
        }
      ],
      "quality": "t2"
    },
    {
      "id": "123",
      "name": "Gold Mining II",
      "max": 10,
      "col": 10,
      "row": 1,
      "requires": [
        {
          "id": "124",
          "level": 1
        }
      ],
      "quality": "t3"
    },
    {
      "id": "124",
      "name": "Architecture II",
      "max": 10,
      "col": 10,
      "row": 2,
      "requires": [
        {
          "id": "119",
          "level": 3
        }
      ],
      "quality": "t3"
    },
    {
      "id": "125",
      "name": "Logging Techniques II",
      "max": 10,
      "col": 10,
      "row": 3,
      "requires": [
        {
          "id": "124",
          "level": 1
        }
      ],
      "quality": "t3"
    },
    {
      "id": "126",
      "name": "Rock Breaking II",
      "max": 10,
      "col": 11,
      "row": 1,
      "requires": [
        {
          "id": "123",
          "level": 1
        }
      ],
      "quality": "t3"
    },
    {
      "id": "127",
      "name": "Supply Chains I",
      "max": 10,
      "col": 11,
      "row": 2,
      "requires": [
        {
          "id": "124",
          "level": 1
        }
      ],
      "quality": "t3"
    },
    {
      "id": "128",
      "name": "Mana Harvesting II",
      "max": 10,
      "col": 11,
      "row": 3,
      "requires": [
        {
          "id": "125",
          "level": 1
        }
      ],
      "quality": "t3"
    },
    {
      "id": "129",
      "name": "Weak Points II",
      "max": 10,
      "col": 12,
      "row": 1,
      "requires": [
        {
          "id": "130",
          "level": 1
        }
      ],
      "quality": "t3"
    },
    {
      "id": "130",
      "name": "Container Upgrade III",
      "max": 10,
      "col": 12,
      "row": 2,
      "requires": [
        {
          "id": "127",
          "level": 1
        }
      ],
      "quality": "t3"
    },
    {
      "id": "131",
      "name": "Stamina II",
      "max": 10,
      "col": 12,
      "row": 3,
      "requires": [
        {
          "id": "130",
          "level": 1
        }
      ],
      "quality": "t3"
    },
    {
      "id": "132",
      "name": "Military Leadership II",
      "max": 10,
      "col": 13,
      "row": 1,
      "requires": [
        {
          "id": "129",
          "level": 1
        }
      ],
      "quality": "t3"
    },
    {
      "id": "133",
      "name": "Breath Control II",
      "max": 10,
      "col": 13,
      "row": 3,
      "requires": [
        {
          "id": "131",
          "level": 1
        }
      ],
      "quality": "t3"
    },
    {
      "id": "134",
      "name": "Scholarship II",
      "max": 10,
      "col": 14,
      "row": 2,
      "requires": [
        {
          "id": "130",
          "level": 1
        }
      ],
      "quality": "t4"
    },
    {
      "id": "135",
      "name": "Gold Processing III",
      "max": 10,
      "col": 15,
      "row": 1,
      "requires": [
        {
          "id": "134",
          "level": 1
        }
      ],
      "quality": "t4"
    },
    {
      "id": "136",
      "name": "Forestry III",
      "max": 10,
      "col": 15,
      "row": 2,
      "requires": [
        {
          "id": "134",
          "level": 1
        }
      ],
      "quality": "t4"
    },
    {
      "id": "137",
      "name": "Ironworking III",
      "max": 10,
      "col": 15,
      "row": 3,
      "requires": [
        {
          "id": "134",
          "level": 1
        }
      ],
      "quality": "t4"
    },
    {
      "id": "138",
      "name": "Advanced Mana III",
      "max": 10,
      "col": 15,
      "row": 4,
      "requires": [
        {
          "id": "134",
          "level": 1
        }
      ],
      "quality": "t4"
    },
    {
      "id": "139",
      "name": "Gold Mining III",
      "max": 10,
      "col": 16,
      "row": 1,
      "requires": [
        {
          "id": "135",
          "level": 1
        }
      ],
      "quality": "t4"
    },
    {
      "id": "140",
      "name": "Logging Techniques III",
      "max": 10,
      "col": 16,
      "row": 2,
      "requires": [
        {
          "id": "136",
          "level": 1
        }
      ],
      "quality": "t4"
    },
    {
      "id": "141",
      "name": "Rock Breaking III",
      "max": 10,
      "col": 16,
      "row": 3,
      "requires": [
        {
          "id": "137",
          "level": 1
        }
      ],
      "quality": "t4"
    },
    {
      "id": "142",
      "name": "Mana Harvesting III",
      "max": 10,
      "col": 16,
      "row": 4,
      "requires": [
        {
          "id": "138",
          "level": 1
        }
      ],
      "quality": "t4"
    },
    {
      "id": "143",
      "name": "Land of Plenty",
      "max": 10,
      "col": 17,
      "row": 2,
      "requires": [
        {
          "id": "139",
          "level": 3
        },
        {
          "id": "140",
          "level": 3
        },
        {
          "id": "141",
          "level": 3
        },
        {
          "id": "142",
          "level": 3
        }
      ],
      "quality": "t4"
    },
    {
      "id": "144",
      "name": "Supply Chains II",
      "max": 10,
      "col": 18,
      "row": 2,
      "requires": [
        {
          "id": "143",
          "level": 1
        },
        {
          "id": "127",
          "level": 10
        },
        {
          "id": "132",
          "level": 10
        },
        {
          "id": "133",
          "level": 10
        }
      ],
      "quality": "t4"
    }
  ],
  "military": [
    {
      "id": "201",
      "name": "Conscription I",
      "max": 1,
      "col": 0,
      "row": 0,
      "requires": [],
      "quality": "t1"
    },
    {
      "id": "202",
      "name": "Infantry I",
      "max": 5,
      "col": 1,
      "row": 1,
      "requires": [
        {
          "id": "201",
          "level": 1
        }
      ],
      "quality": "t1"
    },
    {
      "id": "203",
      "name": "Swift Strike I",
      "max": 5,
      "col": 1,
      "row": 2,
      "requires": [
        {
          "id": "201",
          "level": 1
        }
      ],
      "quality": "t1"
    },
    {
      "id": "204",
      "name": "Sharp Points I",
      "max": 5,
      "col": 1,
      "row": 3,
      "requires": [
        {
          "id": "201",
          "level": 1
        }
      ],
      "quality": "t1"
    },
    {
      "id": "205",
      "name": "Arcane Knowledge I",
      "max": 5,
      "col": 1,
      "row": 4,
      "requires": [
        {
          "id": "201",
          "level": 1
        }
      ],
      "quality": "t1"
    },
    {
      "id": "206",
      "name": "Infantry Protection I",
      "max": 5,
      "col": 2,
      "row": 1,
      "requires": [
        {
          "id": "202",
          "level": 1
        }
      ],
      "quality": "t1"
    },
    {
      "id": "207",
      "name": "Cavalry Protection I",
      "max": 5,
      "col": 2,
      "row": 2,
      "requires": [
        {
          "id": "203",
          "level": 1
        }
      ],
      "quality": "t1"
    },
    {
      "id": "208",
      "name": "Marksman Protection I",
      "max": 5,
      "col": 2,
      "row": 3,
      "requires": [
        {
          "id": "204",
          "level": 1
        }
      ],
      "quality": "t1"
    },
    {
      "id": "209",
      "name": "Magic Protection I",
      "max": 5,
      "col": 2,
      "row": 4,
      "requires": [
        {
          "id": "205",
          "level": 1
        }
      ],
      "quality": "t1"
    },
    {
      "id": "210",
      "name": "Intelligence Gathering I",
      "max": 5,
      "col": 3,
      "row": 0,
      "requires": [
        {
          "id": "206",
          "level": 1
        },
        {
          "id": "207",
          "level": 1
        },
        {
          "id": "208",
          "level": 1
        },
        {
          "id": "209",
          "level": 1
        }
      ],
      "quality": "t1"
    },
    {
      "id": "211",
      "name": "Infantry Troop II",
      "max": 1,
      "col": 4,
      "row": 1,
      "requires": [
        {
          "id": "210",
          "level": 3
        }
      ],
      "quality": "t2"
    },
    {
      "id": "212",
      "name": "Cavalry Troop II",
      "max": 1,
      "col": 4,
      "row": 2,
      "requires": [
        {
          "id": "210",
          "level": 3
        }
      ],
      "quality": "t2"
    },
    {
      "id": "213",
      "name": "Ranger II",
      "max": 1,
      "col": 4,
      "row": 3,
      "requires": [
        {
          "id": "210",
          "level": 3
        }
      ],
      "quality": "t2"
    },
    {
      "id": "214",
      "name": "Mages II",
      "max": 1,
      "col": 4,
      "row": 4,
      "requires": [
        {
          "id": "210",
          "level": 3
        }
      ],
      "quality": "t2"
    },
    {
      "id": "215",
      "name": "Pathfinding I",
      "max": 10,
      "col": 5,
      "row": 0,
      "requires": [
        {
          "id": "211",
          "level": 1
        },
        {
          "id": "212",
          "level": 1
        },
        {
          "id": "213",
          "level": 1
        },
        {
          "id": "214",
          "level": 1
        }
      ],
      "quality": "t2"
    },
    {
      "id": "216",
      "name": "Melee Assault",
      "max": 10,
      "col": 6,
      "row": 1,
      "requires": [
        {
          "id": "215",
          "level": 1
        }
      ],
      "quality": "t2"
    },
    {
      "id": "217",
      "name": "Ranged Assault",
      "max": 10,
      "col": 6,
      "row": 2,
      "requires": [
        {
          "id": "215",
          "level": 1
        }
      ],
      "quality": "t2"
    },
    {
      "id": "218",
      "name": "Melee Protection",
      "max": 10,
      "col": 7,
      "row": 1,
      "requires": [
        {
          "id": "216",
          "level": 1
        }
      ],
      "quality": "t2"
    },
    {
      "id": "219",
      "name": "Ranged Protection",
      "max": 10,
      "col": 7,
      "row": 2,
      "requires": [
        {
          "id": "217",
          "level": 1
        }
      ],
      "quality": "t2"
    },
    {
      "id": "220",
      "name": "Infantry Skills",
      "max": 1,
      "col": 8,
      "row": 1,
      "requires": [
        {
          "id": "218",
          "level": 1
        }
      ],
      "quality": "t2"
    },
    {
      "id": "221",
      "name": "Cavalry Skills",
      "max": 1,
      "col": 8,
      "row": 2,
      "requires": [
        {
          "id": "218",
          "level": 1
        }
      ],
      "quality": "t2"
    },
    {
      "id": "222",
      "name": "Marksman Skills",
      "max": 1,
      "col": 8,
      "row": 3,
      "requires": [
        {
          "id": "219",
          "level": 1
        }
      ],
      "quality": "t2"
    },
    {
      "id": "223",
      "name": "Magic Skills",
      "max": 1,
      "col": 8,
      "row": 4,
      "requires": [
        {
          "id": "219",
          "level": 1
        }
      ],
      "quality": "t2"
    },
    {
      "id": "224",
      "name": "Urban Assault",
      "max": 10,
      "col": 9,
      "row": 1,
      "requires": [
        {
          "id": "225",
          "level": 1
        }
      ],
      "quality": "t2"
    },
    {
      "id": "225",
      "name": "Conscription II",
      "max": 10,
      "col": 9,
      "row": 2,
      "requires": [
        {
          "id": "220",
          "level": 1
        },
        {
          "id": "221",
          "level": 1
        },
        {
          "id": "222",
          "level": 1
        },
        {
          "id": "223",
          "level": 1
        }
      ],
      "quality": "t2"
    },
    {
      "id": "226",
      "name": "Urban Defense",
      "max": 10,
      "col": 9,
      "row": 4,
      "requires": [
        {
          "id": "225",
          "level": 1
        }
      ],
      "quality": "t2"
    },
    {
      "id": "227",
      "name": "Infantry Troop III",
      "max": 1,
      "col": 10,
      "row": 1,
      "requires": [
        {
          "id": "225",
          "level": 5
        }
      ],
      "quality": "t3"
    },
    {
      "id": "228",
      "name": "Ranger III",
      "max": 1,
      "col": 10,
      "row": 2,
      "requires": [
        {
          "id": "225",
          "level": 5
        }
      ],
      "quality": "t3"
    },
    {
      "id": "229",
      "name": "Mages III",
      "max": 1,
      "col": 10,
      "row": 3,
      "requires": [
        {
          "id": "225",
          "level": 5
        }
      ],
      "quality": "t3"
    },
    {
      "id": "230",
      "name": "Cavalry Troop III",
      "max": 1,
      "col": 10,
      "row": 4,
      "requires": [
        {
          "id": "225",
          "level": 5
        }
      ],
      "quality": "t3"
    },
    {
      "id": "232",
      "name": "Intelligence Gathering II",
      "max": 5,
      "col": 11,
      "row": 0,
      "requires": [
        {
          "id": "227",
          "level": 1
        },
        {
          "id": "228",
          "level": 1
        },
        {
          "id": "229",
          "level": 1
        },
        {
          "id": "230",
          "level": 1
        }
      ],
      "quality": "t3"
    },
    {
      "id": "234",
      "name": "Defensive Formations I",
      "max": 10,
      "col": 12,
      "row": 1,
      "requires": [
        {
          "id": "232",
          "level": 1
        }
      ],
      "quality": "t3"
    },
    {
      "id": "235",
      "name": "Assault Strategies I",
      "max": 10,
      "col": 12,
      "row": 2,
      "requires": [
        {
          "id": "232",
          "level": 1
        }
      ],
      "quality": "t3"
    },
    {
      "id": "236",
      "name": "First Aid I",
      "max": 10,
      "col": 12,
      "row": 3,
      "requires": [
        {
          "id": "232",
          "level": 1
        }
      ],
      "quality": "t3"
    },
    {
      "id": "237",
      "name": "Pathfinding II",
      "max": 10,
      "col": 13,
      "row": 0,
      "requires": [
        {
          "id": "235",
          "level": 1
        }
      ],
      "quality": "t3"
    },
    {
      "id": "238",
      "name": "Infantry Troop IV",
      "max": 1,
      "col": 14,
      "row": 1,
      "requires": [
        {
          "id": "237",
          "level": 5
        }
      ],
      "quality": "t4"
    },
    {
      "id": "239",
      "name": "Cavalry Troop IV",
      "max": 1,
      "col": 14,
      "row": 2,
      "requires": [
        {
          "id": "237",
          "level": 5
        }
      ],
      "quality": "t4"
    },
    {
      "id": "240",
      "name": "Ranger IV",
      "max": 1,
      "col": 14,
      "row": 3,
      "requires": [
        {
          "id": "237",
          "level": 5
        }
      ],
      "quality": "t4"
    },
    {
      "id": "241",
      "name": "Mages IV",
      "max": 1,
      "col": 14,
      "row": 4,
      "requires": [
        {
          "id": "237",
          "level": 5
        }
      ],
      "quality": "t4"
    },
    {
      "id": "242",
      "name": "Fliers IV",
      "max": 1,
      "col": 15,
      "row": 0,
      "requires": [
        {
          "id": "238",
          "level": 1
        },
        {
          "id": "239",
          "level": 1
        },
        {
          "id": "240",
          "level": 1
        },
        {
          "id": "241",
          "level": 1
        }
      ],
      "quality": "t4"
    },
    {
      "id": "243",
      "name": "Defensive Formations II",
      "max": 10,
      "col": 16,
      "row": 1,
      "requires": [
        {
          "id": "244",
          "level": 1
        }
      ],
      "quality": "t4"
    },
    {
      "id": "244",
      "name": "Assault Strategies II",
      "max": 10,
      "col": 16,
      "row": 2,
      "requires": [
        {
          "id": "242",
          "level": 1
        }
      ],
      "quality": "t4"
    },
    {
      "id": "245",
      "name": "First Aid II",
      "max": 10,
      "col": 16,
      "row": 3,
      "requires": [
        {
          "id": "244",
          "level": 1
        }
      ],
      "quality": "t4"
    },
    {
      "id": "246",
      "name": "Infantry II",
      "max": 10,
      "col": 17,
      "row": 1,
      "requires": [
        {
          "id": "244",
          "level": 1
        }
      ],
      "quality": "t4"
    },
    {
      "id": "247",
      "name": "Swift Strike II",
      "max": 10,
      "col": 17,
      "row": 2,
      "requires": [
        {
          "id": "244",
          "level": 1
        }
      ],
      "quality": "t4"
    },
    {
      "id": "248",
      "name": "Sharp Points II",
      "max": 10,
      "col": 17,
      "row": 3,
      "requires": [
        {
          "id": "244",
          "level": 1
        }
      ],
      "quality": "t4"
    },
    {
      "id": "249",
      "name": "Arcane Knowledge II",
      "max": 10,
      "col": 17,
      "row": 4,
      "requires": [
        {
          "id": "244",
          "level": 1
        }
      ],
      "quality": "t4"
    },
    {
      "id": "250",
      "name": "Infantry Protection II",
      "max": 10,
      "col": 18,
      "row": 1,
      "requires": [
        {
          "id": "246",
          "level": 1
        }
      ],
      "quality": "t4"
    },
    {
      "id": "251",
      "name": "Cavalry Protection II",
      "max": 10,
      "col": 18,
      "row": 2,
      "requires": [
        {
          "id": "247",
          "level": 1
        }
      ],
      "quality": "t4"
    },
    {
      "id": "252",
      "name": "Marksman Protection II",
      "max": 10,
      "col": 18,
      "row": 3,
      "requires": [
        {
          "id": "248",
          "level": 1
        }
      ],
      "quality": "t4"
    },
    {
      "id": "253",
      "name": "Magic Protection II",
      "max": 10,
      "col": 18,
      "row": 4,
      "requires": [
        {
          "id": "249",
          "level": 1
        }
      ],
      "quality": "t4"
    },
    {
      "id": "254",
      "name": "Infantry Troop V",
      "max": 1,
      "col": 19,
      "row": 1,
      "requires": [
        {
          "id": "246",
          "level": 10
        },
        {
          "id": "250",
          "level": 10
        }
      ],
      "quality": "t5"
    },
    {
      "id": "255",
      "name": "Cavalry Troop V",
      "max": 1,
      "col": 19,
      "row": 2,
      "requires": [
        {
          "id": "247",
          "level": 10
        },
        {
          "id": "251",
          "level": 10
        }
      ],
      "quality": "t5"
    },
    {
      "id": "256",
      "name": "Ranger V",
      "max": 1,
      "col": 19,
      "row": 3,
      "requires": [
        {
          "id": "248",
          "level": 10
        },
        {
          "id": "252",
          "level": 10
        }
      ],
      "quality": "t5"
    },
    {
      "id": "257",
      "name": "Mages V",
      "max": 1,
      "col": 19,
      "row": 4,
      "requires": [
        {
          "id": "249",
          "level": 10
        },
        {
          "id": "253",
          "level": 10
        }
      ],
      "quality": "t5"
    },
    {
      "id": "258",
      "name": "Fliers V",
      "max": 1,
      "col": 20,
      "row": 0,
      "requires": [
        {
          "id": "254",
          "level": 1
        },
        {
          "id": "255",
          "level": 1
        },
        {
          "id": "256",
          "level": 1
        },
        {
          "id": "257",
          "level": 1
        }
      ],
      "quality": "t5"
    },
    {
      "id": "259",
      "name": "Pathfinding III",
      "max": 10,
      "col": 21,
      "row": 0,
      "requires": [
        {
          "id": "258",
          "level": 1
        }
      ],
      "quality": "t5"
    }
  ]
} as const;

export const lordResearchLevelCosts = {
  "economy": {
    "101": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 60,
        "gold": 100,
        "wood": 100,
        "ore": 0,
        "mana": 0
      }
    ],
    "102": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 600,
        "gold": 5000,
        "wood": 5000,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 1680,
        "gold": 15000,
        "wood": 15000,
        "ore": 7500,
        "mana": 0
      },
      {
        "seconds": 3600,
        "gold": 35000,
        "wood": 35000,
        "ore": 22500,
        "mana": 0
      },
      {
        "seconds": 7080,
        "gold": 75000,
        "wood": 75000,
        "ore": 52500,
        "mana": 0
      },
      {
        "seconds": 13380,
        "gold": 155000,
        "wood": 155000,
        "ore": 112500,
        "mana": 0
      }
    ],
    "103": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 600,
        "gold": 5000,
        "wood": 5000,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 1680,
        "gold": 15000,
        "wood": 15000,
        "ore": 7500,
        "mana": 0
      },
      {
        "seconds": 3600,
        "gold": 35000,
        "wood": 35000,
        "ore": 22500,
        "mana": 0
      },
      {
        "seconds": 7080,
        "gold": 75000,
        "wood": 75000,
        "ore": 52500,
        "mana": 0
      },
      {
        "seconds": 13380,
        "gold": 155000,
        "wood": 155000,
        "ore": 112500,
        "mana": 0
      }
    ],
    "104": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 600,
        "gold": 5000,
        "wood": 5000,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 1680,
        "gold": 15000,
        "wood": 15000,
        "ore": 7500,
        "mana": 0
      },
      {
        "seconds": 3600,
        "gold": 35000,
        "wood": 35000,
        "ore": 22500,
        "mana": 0
      },
      {
        "seconds": 7080,
        "gold": 75000,
        "wood": 75000,
        "ore": 52500,
        "mana": 0
      },
      {
        "seconds": 14100,
        "gold": 155000,
        "wood": 155000,
        "ore": 112500,
        "mana": 0
      }
    ],
    "105": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 1200,
        "gold": 10000,
        "wood": 10000,
        "ore": 7500,
        "mana": 0
      },
      {
        "seconds": 3360,
        "gold": 30000,
        "wood": 30000,
        "ore": 22500,
        "mana": 0
      },
      {
        "seconds": 7260,
        "gold": 70000,
        "wood": 70000,
        "ore": 52500,
        "mana": 0
      },
      {
        "seconds": 14280,
        "gold": 150000,
        "wood": 150000,
        "ore": 112500,
        "mana": 0
      },
      {
        "seconds": 26880,
        "gold": 310000,
        "wood": 310000,
        "ore": 232500,
        "mana": 0
      }
    ],
    "106": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 600,
        "gold": 5000,
        "wood": 5000,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 1680,
        "gold": 15000,
        "wood": 15000,
        "ore": 7500,
        "mana": 0
      },
      {
        "seconds": 3600,
        "gold": 35000,
        "wood": 35000,
        "ore": 22500,
        "mana": 0
      },
      {
        "seconds": 7080,
        "gold": 75000,
        "wood": 75000,
        "ore": 52500,
        "mana": 0
      },
      {
        "seconds": 14100,
        "gold": 155000,
        "wood": 155000,
        "ore": 112500,
        "mana": 0
      }
    ],
    "107": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 1200,
        "gold": 10000,
        "wood": 10000,
        "ore": 7500,
        "mana": 0
      },
      {
        "seconds": 3360,
        "gold": 30000,
        "wood": 30000,
        "ore": 22500,
        "mana": 0
      },
      {
        "seconds": 7680,
        "gold": 70000,
        "wood": 70000,
        "ore": 52500,
        "mana": 0
      },
      {
        "seconds": 16320,
        "gold": 150000,
        "wood": 150000,
        "ore": 112500,
        "mana": 0
      },
      {
        "seconds": 33600,
        "gold": 310000,
        "wood": 310000,
        "ore": 232500,
        "mana": 0
      }
    ],
    "108": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 1200,
        "gold": 10000,
        "wood": 10000,
        "ore": 7500,
        "mana": 0
      },
      {
        "seconds": 3360,
        "gold": 30000,
        "wood": 30000,
        "ore": 22500,
        "mana": 0
      },
      {
        "seconds": 7260,
        "gold": 70000,
        "wood": 70000,
        "ore": 52500,
        "mana": 0
      },
      {
        "seconds": 14280,
        "gold": 150000,
        "wood": 150000,
        "ore": 112500,
        "mana": 0
      },
      {
        "seconds": 28260,
        "gold": 310000,
        "wood": 310000,
        "ore": 232500,
        "mana": 0
      }
    ],
    "109": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 1200,
        "gold": 10000,
        "wood": 10000,
        "ore": 7500,
        "mana": 0
      },
      {
        "seconds": 3360,
        "gold": 30000,
        "wood": 30000,
        "ore": 22500,
        "mana": 0
      },
      {
        "seconds": 7680,
        "gold": 70000,
        "wood": 70000,
        "ore": 52500,
        "mana": 0
      },
      {
        "seconds": 16320,
        "gold": 150000,
        "wood": 150000,
        "ore": 112500,
        "mana": 0
      },
      {
        "seconds": 33600,
        "gold": 310000,
        "wood": 310000,
        "ore": 232500,
        "mana": 0
      }
    ],
    "110": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 3600,
        "gold": 20000,
        "wood": 20000,
        "ore": 15000,
        "mana": 0
      }
    ],
    "111": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 5400,
        "gold": 10000,
        "wood": 10000,
        "ore": 7500,
        "mana": 7500
      },
      {
        "seconds": 13500,
        "gold": 30000,
        "wood": 30000,
        "ore": 22500,
        "mana": 22500
      },
      {
        "seconds": 25800,
        "gold": 70000,
        "wood": 70000,
        "ore": 52500,
        "mana": 52500
      },
      {
        "seconds": 44100,
        "gold": 150000,
        "wood": 150000,
        "ore": 112500,
        "mana": 112500
      },
      {
        "seconds": 71400,
        "gold": 310000,
        "wood": 310000,
        "ore": 232500,
        "mana": 232500
      }
    ],
    "112": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 5400,
        "gold": 10000,
        "wood": 10000,
        "ore": 7500,
        "mana": 7500
      },
      {
        "seconds": 13500,
        "gold": 30000,
        "wood": 30000,
        "ore": 22500,
        "mana": 22500
      },
      {
        "seconds": 25800,
        "gold": 70000,
        "wood": 70000,
        "ore": 52500,
        "mana": 52500
      },
      {
        "seconds": 44100,
        "gold": 150000,
        "wood": 150000,
        "ore": 112500,
        "mana": 112500
      },
      {
        "seconds": 71400,
        "gold": 310000,
        "wood": 310000,
        "ore": 232500,
        "mana": 232500
      }
    ],
    "113": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 5400,
        "gold": 10000,
        "wood": 10000,
        "ore": 7500,
        "mana": 7500
      },
      {
        "seconds": 13500,
        "gold": 30000,
        "wood": 30000,
        "ore": 22500,
        "mana": 22500
      },
      {
        "seconds": 25800,
        "gold": 70000,
        "wood": 70000,
        "ore": 52500,
        "mana": 52500
      },
      {
        "seconds": 44100,
        "gold": 150000,
        "wood": 150000,
        "ore": 112500,
        "mana": 112500
      },
      {
        "seconds": 71400,
        "gold": 310000,
        "wood": 310000,
        "ore": 232500,
        "mana": 232500
      }
    ],
    "114": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 5400,
        "gold": 15000,
        "wood": 15000,
        "ore": 11250,
        "mana": 11250
      },
      {
        "seconds": 13500,
        "gold": 45000,
        "wood": 45000,
        "ore": 33750,
        "mana": 33750
      },
      {
        "seconds": 25800,
        "gold": 105000,
        "wood": 105000,
        "ore": 78750,
        "mana": 78750
      },
      {
        "seconds": 44100,
        "gold": 225000,
        "wood": 225000,
        "ore": 168750,
        "mana": 168750
      },
      {
        "seconds": 71400,
        "gold": 465000,
        "wood": 465000,
        "ore": 348750,
        "mana": 348750
      }
    ],
    "115": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 5400,
        "gold": 10000,
        "wood": 10000,
        "ore": 7500,
        "mana": 7500
      },
      {
        "seconds": 13500,
        "gold": 30000,
        "wood": 30000,
        "ore": 22500,
        "mana": 22500
      },
      {
        "seconds": 25800,
        "gold": 70000,
        "wood": 70000,
        "ore": 52500,
        "mana": 52500
      },
      {
        "seconds": 44100,
        "gold": 150000,
        "wood": 150000,
        "ore": 112500,
        "mana": 112500
      },
      {
        "seconds": 71400,
        "gold": 310000,
        "wood": 310000,
        "ore": 232500,
        "mana": 232500
      }
    ],
    "116": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 9600,
        "gold": 15000,
        "wood": 15000,
        "ore": 11250,
        "mana": 11250
      },
      {
        "seconds": 24300,
        "gold": 45000,
        "wood": 45000,
        "ore": 33750,
        "mana": 33750
      },
      {
        "seconds": 46200,
        "gold": 105000,
        "wood": 105000,
        "ore": 78750,
        "mana": 78750
      },
      {
        "seconds": 78900,
        "gold": 225000,
        "wood": 225000,
        "ore": 168750,
        "mana": 168750
      },
      {
        "seconds": 128100,
        "gold": 465000,
        "wood": 465000,
        "ore": 348750,
        "mana": 348750
      }
    ],
    "117": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 9600,
        "gold": 15000,
        "wood": 15000,
        "ore": 11250,
        "mana": 11250
      },
      {
        "seconds": 24300,
        "gold": 45000,
        "wood": 45000,
        "ore": 33750,
        "mana": 33750
      },
      {
        "seconds": 46200,
        "gold": 105000,
        "wood": 105000,
        "ore": 78750,
        "mana": 78750
      },
      {
        "seconds": 78900,
        "gold": 225000,
        "wood": 225000,
        "ore": 168750,
        "mana": 168750
      },
      {
        "seconds": 128100,
        "gold": 465000,
        "wood": 465000,
        "ore": 348750,
        "mana": 348750
      }
    ],
    "118": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 4800,
        "gold": 15000,
        "wood": 15000,
        "ore": 11250,
        "mana": 11250
      },
      {
        "seconds": 10500,
        "gold": 38000,
        "wood": 38000,
        "ore": 28500,
        "mana": 28500
      },
      {
        "seconds": 17400,
        "gold": 73000,
        "wood": 73000,
        "ore": 54750,
        "mana": 54750
      },
      {
        "seconds": 25800,
        "gold": 126000,
        "wood": 126000,
        "ore": 94500,
        "mana": 94500
      },
      {
        "seconds": 36000,
        "gold": 206000,
        "wood": 206000,
        "ore": 154500,
        "mana": 154500
      },
      {
        "seconds": 48000,
        "gold": 326000,
        "wood": 326000,
        "ore": 244500,
        "mana": 244500
      },
      {
        "seconds": 66000,
        "gold": 506000,
        "wood": 506000,
        "ore": 379500,
        "mana": 379500
      },
      {
        "seconds": 93300,
        "gold": 776000,
        "wood": 776000,
        "ore": 582000,
        "mana": 582000
      },
      {
        "seconds": 134100,
        "gold": 1181000,
        "wood": 1181000,
        "ore": 885750,
        "mana": 885750
      },
      {
        "seconds": 195300,
        "gold": 1789000,
        "wood": 1789000,
        "ore": 1341750,
        "mana": 1341750
      }
    ],
    "119": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 4800,
        "gold": 20000,
        "wood": 20000,
        "ore": 15000,
        "mana": 15000
      },
      {
        "seconds": 10500,
        "gold": 50000,
        "wood": 50000,
        "ore": 37500,
        "mana": 37500
      },
      {
        "seconds": 17400,
        "gold": 95000,
        "wood": 95000,
        "ore": 71250,
        "mana": 71250
      },
      {
        "seconds": 25800,
        "gold": 163000,
        "wood": 163000,
        "ore": 122250,
        "mana": 122250
      },
      {
        "seconds": 36000,
        "gold": 265000,
        "wood": 265000,
        "ore": 198750,
        "mana": 198750
      },
      {
        "seconds": 48000,
        "gold": 418000,
        "wood": 418000,
        "ore": 313500,
        "mana": 313500
      },
      {
        "seconds": 66000,
        "gold": 648000,
        "wood": 648000,
        "ore": 486000,
        "mana": 486000
      },
      {
        "seconds": 93300,
        "gold": 993000,
        "wood": 993000,
        "ore": 744750,
        "mana": 744750
      },
      {
        "seconds": 134100,
        "gold": 1511000,
        "wood": 1511000,
        "ore": 1133250,
        "mana": 1133250
      },
      {
        "seconds": 195300,
        "gold": 2288000,
        "wood": 2288000,
        "ore": 1716000,
        "mana": 1716000
      }
    ],
    "120": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 4800,
        "gold": 15000,
        "wood": 15000,
        "ore": 11250,
        "mana": 11250
      },
      {
        "seconds": 10500,
        "gold": 38000,
        "wood": 38000,
        "ore": 28500,
        "mana": 28500
      },
      {
        "seconds": 17400,
        "gold": 73000,
        "wood": 73000,
        "ore": 54750,
        "mana": 54750
      },
      {
        "seconds": 25800,
        "gold": 126000,
        "wood": 126000,
        "ore": 94500,
        "mana": 94500
      },
      {
        "seconds": 36000,
        "gold": 206000,
        "wood": 206000,
        "ore": 154500,
        "mana": 154500
      },
      {
        "seconds": 48000,
        "gold": 326000,
        "wood": 326000,
        "ore": 244500,
        "mana": 244500
      },
      {
        "seconds": 66000,
        "gold": 506000,
        "wood": 506000,
        "ore": 379500,
        "mana": 379500
      },
      {
        "seconds": 93300,
        "gold": 776000,
        "wood": 776000,
        "ore": 582000,
        "mana": 582000
      },
      {
        "seconds": 134100,
        "gold": 1181000,
        "wood": 1181000,
        "ore": 885750,
        "mana": 885750
      },
      {
        "seconds": 195300,
        "gold": 1789000,
        "wood": 1789000,
        "ore": 1341750,
        "mana": 1341750
      }
    ],
    "121": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 4800,
        "gold": 15000,
        "wood": 15000,
        "ore": 11250,
        "mana": 11250
      },
      {
        "seconds": 10500,
        "gold": 38000,
        "wood": 38000,
        "ore": 28500,
        "mana": 28500
      },
      {
        "seconds": 17400,
        "gold": 73000,
        "wood": 73000,
        "ore": 54750,
        "mana": 54750
      },
      {
        "seconds": 25800,
        "gold": 126000,
        "wood": 126000,
        "ore": 94500,
        "mana": 94500
      },
      {
        "seconds": 36000,
        "gold": 206000,
        "wood": 206000,
        "ore": 154500,
        "mana": 154500
      },
      {
        "seconds": 48000,
        "gold": 326000,
        "wood": 326000,
        "ore": 244500,
        "mana": 244500
      },
      {
        "seconds": 66000,
        "gold": 506000,
        "wood": 506000,
        "ore": 379500,
        "mana": 379500
      },
      {
        "seconds": 93300,
        "gold": 776000,
        "wood": 776000,
        "ore": 582000,
        "mana": 582000
      },
      {
        "seconds": 134100,
        "gold": 1181000,
        "wood": 1181000,
        "ore": 885750,
        "mana": 885750
      },
      {
        "seconds": 195300,
        "gold": 1789000,
        "wood": 1789000,
        "ore": 1341750,
        "mana": 1341750
      }
    ],
    "122": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 4800,
        "gold": 15000,
        "wood": 15000,
        "ore": 11250,
        "mana": 11250
      },
      {
        "seconds": 10500,
        "gold": 38000,
        "wood": 38000,
        "ore": 28500,
        "mana": 28500
      },
      {
        "seconds": 17400,
        "gold": 73000,
        "wood": 73000,
        "ore": 54750,
        "mana": 54750
      },
      {
        "seconds": 25800,
        "gold": 126000,
        "wood": 126000,
        "ore": 94500,
        "mana": 94500
      },
      {
        "seconds": 36000,
        "gold": 206000,
        "wood": 206000,
        "ore": 154500,
        "mana": 154500
      },
      {
        "seconds": 48000,
        "gold": 326000,
        "wood": 326000,
        "ore": 244500,
        "mana": 244500
      },
      {
        "seconds": 66000,
        "gold": 506000,
        "wood": 506000,
        "ore": 379500,
        "mana": 379500
      },
      {
        "seconds": 93300,
        "gold": 776000,
        "wood": 776000,
        "ore": 582000,
        "mana": 582000
      },
      {
        "seconds": 134100,
        "gold": 1181000,
        "wood": 1181000,
        "ore": 885750,
        "mana": 885750
      },
      {
        "seconds": 195300,
        "gold": 1789000,
        "wood": 1789000,
        "ore": 1341750,
        "mana": 1341750
      }
    ],
    "123": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 14400,
        "gold": 50000,
        "wood": 50000,
        "ore": 37500,
        "mana": 37500
      },
      {
        "seconds": 36000,
        "gold": 125000,
        "wood": 125000,
        "ore": 94000,
        "mana": 94000
      },
      {
        "seconds": 68400,
        "gold": 237500,
        "wood": 237500,
        "ore": 179000,
        "mana": 179000
      },
      {
        "seconds": 117000,
        "gold": 406500,
        "wood": 406500,
        "ore": 291500,
        "mana": 291500
      },
      {
        "seconds": 190200,
        "gold": 660000,
        "wood": 660000,
        "ore": 483000,
        "mana": 483000
      },
      {
        "seconds": 299400,
        "gold": 1040500,
        "wood": 1040500,
        "ore": 770500,
        "mana": 770500
      },
      {
        "seconds": 463200,
        "gold": 1610500,
        "wood": 1610500,
        "ore": 1202000,
        "mana": 1202000
      },
      {
        "seconds": 709200,
        "gold": 2465500,
        "wood": 2465500,
        "ore": 1852000,
        "mana": 1852000
      },
      {
        "seconds": 1078200,
        "gold": 3750500,
        "wood": 3750500,
        "ore": 2822000,
        "mana": 2822000
      },
      {
        "seconds": 1632000,
        "gold": 5680500,
        "wood": 5680500,
        "ore": 4282000,
        "mana": 4282000
      }
    ],
    "124": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 21600,
        "gold": 100000,
        "wood": 100000,
        "ore": 75000,
        "mana": 75000
      },
      {
        "seconds": 54000,
        "gold": 250000,
        "wood": 250000,
        "ore": 188000,
        "mana": 188000
      },
      {
        "seconds": 102600,
        "gold": 475000,
        "wood": 475000,
        "ore": 358000,
        "mana": 358000
      },
      {
        "seconds": 175800,
        "gold": 813000,
        "wood": 813000,
        "ore": 583000,
        "mana": 583000
      },
      {
        "seconds": 285000,
        "gold": 1320000,
        "wood": 1320000,
        "ore": 966000,
        "mana": 966000
      },
      {
        "seconds": 448800,
        "gold": 2081000,
        "wood": 2081000,
        "ore": 1541000,
        "mana": 1541000
      },
      {
        "seconds": 694800,
        "gold": 3221000,
        "wood": 3221000,
        "ore": 2404000,
        "mana": 2404000
      },
      {
        "seconds": 1063800,
        "gold": 4931000,
        "wood": 4931000,
        "ore": 3704000,
        "mana": 3704000
      },
      {
        "seconds": 1617600,
        "gold": 7501000,
        "wood": 7501000,
        "ore": 5644000,
        "mana": 5644000
      },
      {
        "seconds": 2448000,
        "gold": 11361000,
        "wood": 11361000,
        "ore": 8564000,
        "mana": 8564000
      }
    ],
    "125": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 14400,
        "gold": 50000,
        "wood": 50000,
        "ore": 37500,
        "mana": 37500
      },
      {
        "seconds": 36000,
        "gold": 125000,
        "wood": 125000,
        "ore": 94000,
        "mana": 94000
      },
      {
        "seconds": 68400,
        "gold": 237500,
        "wood": 237500,
        "ore": 179000,
        "mana": 179000
      },
      {
        "seconds": 117000,
        "gold": 406500,
        "wood": 406500,
        "ore": 291500,
        "mana": 291500
      },
      {
        "seconds": 190200,
        "gold": 660000,
        "wood": 660000,
        "ore": 483000,
        "mana": 483000
      },
      {
        "seconds": 299400,
        "gold": 1040500,
        "wood": 1040500,
        "ore": 770500,
        "mana": 770500
      },
      {
        "seconds": 463200,
        "gold": 1610500,
        "wood": 1610500,
        "ore": 1202000,
        "mana": 1202000
      },
      {
        "seconds": 709200,
        "gold": 2465500,
        "wood": 2465500,
        "ore": 1852000,
        "mana": 1852000
      },
      {
        "seconds": 1078200,
        "gold": 3750500,
        "wood": 3750500,
        "ore": 2822000,
        "mana": 2822000
      },
      {
        "seconds": 1632000,
        "gold": 5680500,
        "wood": 5680500,
        "ore": 4282000,
        "mana": 4282000
      }
    ],
    "126": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 14400,
        "gold": 50000,
        "wood": 50000,
        "ore": 37500,
        "mana": 37500
      },
      {
        "seconds": 36000,
        "gold": 125000,
        "wood": 125000,
        "ore": 94000,
        "mana": 94000
      },
      {
        "seconds": 68400,
        "gold": 237500,
        "wood": 237500,
        "ore": 179000,
        "mana": 179000
      },
      {
        "seconds": 117000,
        "gold": 406500,
        "wood": 406500,
        "ore": 291500,
        "mana": 291500
      },
      {
        "seconds": 190200,
        "gold": 660000,
        "wood": 660000,
        "ore": 483000,
        "mana": 483000
      },
      {
        "seconds": 299400,
        "gold": 1040500,
        "wood": 1040500,
        "ore": 770500,
        "mana": 770500
      },
      {
        "seconds": 463200,
        "gold": 1610500,
        "wood": 1610500,
        "ore": 1202000,
        "mana": 1202000
      },
      {
        "seconds": 709200,
        "gold": 2465500,
        "wood": 2465500,
        "ore": 1852000,
        "mana": 1852000
      },
      {
        "seconds": 1078200,
        "gold": 3750500,
        "wood": 3750500,
        "ore": 2822000,
        "mana": 2822000
      },
      {
        "seconds": 1632000,
        "gold": 5680500,
        "wood": 5680500,
        "ore": 4282000,
        "mana": 4282000
      }
    ],
    "127": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 21600,
        "gold": 100000,
        "wood": 100000,
        "ore": 75000,
        "mana": 75000
      },
      {
        "seconds": 54000,
        "gold": 250000,
        "wood": 250000,
        "ore": 188000,
        "mana": 188000
      },
      {
        "seconds": 102600,
        "gold": 475000,
        "wood": 475000,
        "ore": 358000,
        "mana": 358000
      },
      {
        "seconds": 175800,
        "gold": 813000,
        "wood": 813000,
        "ore": 583000,
        "mana": 583000
      },
      {
        "seconds": 285000,
        "gold": 1320000,
        "wood": 1320000,
        "ore": 966000,
        "mana": 966000
      },
      {
        "seconds": 448800,
        "gold": 2081000,
        "wood": 2081000,
        "ore": 1541000,
        "mana": 1541000
      },
      {
        "seconds": 694800,
        "gold": 3221000,
        "wood": 3221000,
        "ore": 2404000,
        "mana": 2404000
      },
      {
        "seconds": 1063800,
        "gold": 4931000,
        "wood": 4931000,
        "ore": 3704000,
        "mana": 3704000
      },
      {
        "seconds": 1617600,
        "gold": 7501000,
        "wood": 7501000,
        "ore": 5644000,
        "mana": 5644000
      },
      {
        "seconds": 2448000,
        "gold": 11361000,
        "wood": 11361000,
        "ore": 8564000,
        "mana": 8564000
      }
    ],
    "128": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 14400,
        "gold": 50000,
        "wood": 50000,
        "ore": 37500,
        "mana": 37500
      },
      {
        "seconds": 36000,
        "gold": 125000,
        "wood": 125000,
        "ore": 94000,
        "mana": 94000
      },
      {
        "seconds": 68400,
        "gold": 237500,
        "wood": 237500,
        "ore": 179000,
        "mana": 179000
      },
      {
        "seconds": 117000,
        "gold": 406500,
        "wood": 406500,
        "ore": 291500,
        "mana": 291500
      },
      {
        "seconds": 190200,
        "gold": 660000,
        "wood": 660000,
        "ore": 483000,
        "mana": 483000
      },
      {
        "seconds": 299400,
        "gold": 1040500,
        "wood": 1040500,
        "ore": 770500,
        "mana": 770500
      },
      {
        "seconds": 463200,
        "gold": 1610500,
        "wood": 1610500,
        "ore": 1202000,
        "mana": 1202000
      },
      {
        "seconds": 709200,
        "gold": 2465500,
        "wood": 2465500,
        "ore": 1852000,
        "mana": 1852000
      },
      {
        "seconds": 1078200,
        "gold": 3750500,
        "wood": 3750500,
        "ore": 2822000,
        "mana": 2822000
      },
      {
        "seconds": 1632000,
        "gold": 5680500,
        "wood": 5680500,
        "ore": 4282000,
        "mana": 4282000
      }
    ],
    "129": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 21600,
        "gold": 100000,
        "wood": 100000,
        "ore": 75000,
        "mana": 75000
      },
      {
        "seconds": 54000,
        "gold": 250000,
        "wood": 250000,
        "ore": 188000,
        "mana": 188000
      },
      {
        "seconds": 102600,
        "gold": 475000,
        "wood": 475000,
        "ore": 358000,
        "mana": 358000
      },
      {
        "seconds": 175800,
        "gold": 813000,
        "wood": 813000,
        "ore": 583000,
        "mana": 583000
      },
      {
        "seconds": 285000,
        "gold": 1320000,
        "wood": 1320000,
        "ore": 966000,
        "mana": 966000
      },
      {
        "seconds": 448800,
        "gold": 2081000,
        "wood": 2081000,
        "ore": 1541000,
        "mana": 1541000
      },
      {
        "seconds": 694800,
        "gold": 3221000,
        "wood": 3221000,
        "ore": 2404000,
        "mana": 2404000
      },
      {
        "seconds": 1063800,
        "gold": 4931000,
        "wood": 4931000,
        "ore": 3704000,
        "mana": 3704000
      },
      {
        "seconds": 1617600,
        "gold": 7501000,
        "wood": 7501000,
        "ore": 5644000,
        "mana": 5644000
      },
      {
        "seconds": 2448000,
        "gold": 11361000,
        "wood": 11361000,
        "ore": 8564000,
        "mana": 8564000
      }
    ],
    "130": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 28800,
        "gold": 150000,
        "wood": 150000,
        "ore": 112500,
        "mana": 112500
      },
      {
        "seconds": 72000,
        "gold": 375000,
        "wood": 375000,
        "ore": 281250,
        "mana": 281250
      },
      {
        "seconds": 136800,
        "gold": 713000,
        "wood": 713000,
        "ore": 534750,
        "mana": 534750
      },
      {
        "seconds": 234000,
        "gold": 1220000,
        "wood": 1220000,
        "ore": 915000,
        "mana": 915000
      },
      {
        "seconds": 379800,
        "gold": 1981000,
        "wood": 1981000,
        "ore": 1485750,
        "mana": 1485750
      },
      {
        "seconds": 598800,
        "gold": 3123000,
        "wood": 3123000,
        "ore": 2342250,
        "mana": 2342250
      },
      {
        "seconds": 927000,
        "gold": 4836000,
        "wood": 4836000,
        "ore": 3627000,
        "mana": 3627000
      },
      {
        "seconds": 1419000,
        "gold": 7406000,
        "wood": 7406000,
        "ore": 5554500,
        "mana": 5554500
      },
      {
        "seconds": 2157000,
        "gold": 11261000,
        "wood": 11261000,
        "ore": 8445750,
        "mana": 8445750
      },
      {
        "seconds": 3264000,
        "gold": 17044000,
        "wood": 17044000,
        "ore": 12783000,
        "mana": 12783000
      }
    ],
    "131": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 21600,
        "gold": 100000,
        "wood": 100000,
        "ore": 75000,
        "mana": 75000
      },
      {
        "seconds": 54000,
        "gold": 250000,
        "wood": 250000,
        "ore": 188000,
        "mana": 188000
      },
      {
        "seconds": 102600,
        "gold": 475000,
        "wood": 475000,
        "ore": 358000,
        "mana": 358000
      },
      {
        "seconds": 175800,
        "gold": 813000,
        "wood": 813000,
        "ore": 583000,
        "mana": 583000
      },
      {
        "seconds": 285000,
        "gold": 1320000,
        "wood": 1320000,
        "ore": 966000,
        "mana": 966000
      },
      {
        "seconds": 448800,
        "gold": 2081000,
        "wood": 2081000,
        "ore": 1541000,
        "mana": 1541000
      },
      {
        "seconds": 694800,
        "gold": 3221000,
        "wood": 3221000,
        "ore": 2404000,
        "mana": 2404000
      },
      {
        "seconds": 1063800,
        "gold": 4931000,
        "wood": 4931000,
        "ore": 3704000,
        "mana": 3704000
      },
      {
        "seconds": 1617600,
        "gold": 7501000,
        "wood": 7501000,
        "ore": 5644000,
        "mana": 5644000
      },
      {
        "seconds": 2448000,
        "gold": 11361000,
        "wood": 11361000,
        "ore": 8564000,
        "mana": 8564000
      }
    ],
    "132": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 21600,
        "gold": 100000,
        "wood": 100000,
        "ore": 75000,
        "mana": 75000
      },
      {
        "seconds": 54000,
        "gold": 250000,
        "wood": 250000,
        "ore": 188000,
        "mana": 188000
      },
      {
        "seconds": 102600,
        "gold": 475000,
        "wood": 475000,
        "ore": 358000,
        "mana": 358000
      },
      {
        "seconds": 175800,
        "gold": 813000,
        "wood": 813000,
        "ore": 583000,
        "mana": 583000
      },
      {
        "seconds": 285000,
        "gold": 1320000,
        "wood": 1320000,
        "ore": 966000,
        "mana": 966000
      },
      {
        "seconds": 448800,
        "gold": 2081000,
        "wood": 2081000,
        "ore": 1541000,
        "mana": 1541000
      },
      {
        "seconds": 694800,
        "gold": 3221000,
        "wood": 3221000,
        "ore": 2404000,
        "mana": 2404000
      },
      {
        "seconds": 1063800,
        "gold": 4931000,
        "wood": 4931000,
        "ore": 3704000,
        "mana": 3704000
      },
      {
        "seconds": 1617600,
        "gold": 7501000,
        "wood": 7501000,
        "ore": 5644000,
        "mana": 5644000
      },
      {
        "seconds": 2448000,
        "gold": 11361000,
        "wood": 11361000,
        "ore": 8564000,
        "mana": 8564000
      }
    ],
    "133": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 21600,
        "gold": 100000,
        "wood": 100000,
        "ore": 75000,
        "mana": 75000
      },
      {
        "seconds": 54000,
        "gold": 250000,
        "wood": 250000,
        "ore": 188000,
        "mana": 188000
      },
      {
        "seconds": 102600,
        "gold": 475000,
        "wood": 475000,
        "ore": 358000,
        "mana": 358000
      },
      {
        "seconds": 175800,
        "gold": 813000,
        "wood": 813000,
        "ore": 583000,
        "mana": 583000
      },
      {
        "seconds": 285000,
        "gold": 1320000,
        "wood": 1320000,
        "ore": 966000,
        "mana": 966000
      },
      {
        "seconds": 448800,
        "gold": 2081000,
        "wood": 2081000,
        "ore": 1541000,
        "mana": 1541000
      },
      {
        "seconds": 694800,
        "gold": 3221000,
        "wood": 3221000,
        "ore": 2404000,
        "mana": 2404000
      },
      {
        "seconds": 1063800,
        "gold": 4931000,
        "wood": 4931000,
        "ore": 3704000,
        "mana": 3704000
      },
      {
        "seconds": 1617600,
        "gold": 7501000,
        "wood": 7501000,
        "ore": 5644000,
        "mana": 5644000
      },
      {
        "seconds": 2448000,
        "gold": 11361000,
        "wood": 11361000,
        "ore": 8564000,
        "mana": 8564000
      }
    ],
    "134": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 28800,
        "gold": 200000,
        "wood": 200000,
        "ore": 150000,
        "mana": 150000
      },
      {
        "seconds": 72000,
        "gold": 500000,
        "wood": 500000,
        "ore": 375000,
        "mana": 375000
      },
      {
        "seconds": 136800,
        "gold": 950000,
        "wood": 950000,
        "ore": 713000,
        "mana": 713000
      },
      {
        "seconds": 234000,
        "gold": 1625000,
        "wood": 1625000,
        "ore": 1220000,
        "mana": 1220000
      },
      {
        "seconds": 379800,
        "gold": 2635000,
        "wood": 2635000,
        "ore": 1981000,
        "mana": 1981000
      },
      {
        "seconds": 598800,
        "gold": 4155000,
        "wood": 4155000,
        "ore": 3121000,
        "mana": 3121000
      },
      {
        "seconds": 927000,
        "gold": 6435000,
        "wood": 6435000,
        "ore": 4831000,
        "mana": 4831000
      },
      {
        "seconds": 1419000,
        "gold": 9855000,
        "wood": 9855000,
        "ore": 7401000,
        "mana": 7401000
      },
      {
        "seconds": 2157000,
        "gold": 14985000,
        "wood": 14985000,
        "ore": 11261000,
        "mana": 11261000
      },
      {
        "seconds": 3264000,
        "gold": 22685000,
        "wood": 22685000,
        "ore": 17041000,
        "mana": 17041000
      }
    ],
    "135": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 21600,
        "gold": 150000,
        "wood": 150000,
        "ore": 112500,
        "mana": 112500
      },
      {
        "seconds": 54000,
        "gold": 375000,
        "wood": 375000,
        "ore": 281250,
        "mana": 281250
      },
      {
        "seconds": 102600,
        "gold": 713000,
        "wood": 713000,
        "ore": 534750,
        "mana": 534750
      },
      {
        "seconds": 175800,
        "gold": 1220000,
        "wood": 1220000,
        "ore": 915000,
        "mana": 915000
      },
      {
        "seconds": 285000,
        "gold": 1981000,
        "wood": 1981000,
        "ore": 1485750,
        "mana": 1485750
      },
      {
        "seconds": 448800,
        "gold": 3121000,
        "wood": 3121000,
        "ore": 2340750,
        "mana": 2340750
      },
      {
        "seconds": 694800,
        "gold": 4831000,
        "wood": 4831000,
        "ore": 3623250,
        "mana": 3623250
      },
      {
        "seconds": 1063800,
        "gold": 7401000,
        "wood": 7401000,
        "ore": 5550750,
        "mana": 5550750
      },
      {
        "seconds": 1617600,
        "gold": 11261000,
        "wood": 11261000,
        "ore": 8445750,
        "mana": 8445750
      },
      {
        "seconds": 2448000,
        "gold": 17051000,
        "wood": 17051000,
        "ore": 12788250,
        "mana": 12788250
      }
    ],
    "136": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 21600,
        "gold": 150000,
        "wood": 150000,
        "ore": 112500,
        "mana": 112500
      },
      {
        "seconds": 54000,
        "gold": 375000,
        "wood": 375000,
        "ore": 281250,
        "mana": 281250
      },
      {
        "seconds": 102600,
        "gold": 713000,
        "wood": 713000,
        "ore": 534750,
        "mana": 534750
      },
      {
        "seconds": 175800,
        "gold": 1220000,
        "wood": 1220000,
        "ore": 915000,
        "mana": 915000
      },
      {
        "seconds": 285000,
        "gold": 1981000,
        "wood": 1981000,
        "ore": 1485750,
        "mana": 1485750
      },
      {
        "seconds": 448800,
        "gold": 3121000,
        "wood": 3121000,
        "ore": 2340750,
        "mana": 2340750
      },
      {
        "seconds": 694800,
        "gold": 4831000,
        "wood": 4831000,
        "ore": 3623250,
        "mana": 3623250
      },
      {
        "seconds": 1063800,
        "gold": 7401000,
        "wood": 7401000,
        "ore": 5550750,
        "mana": 5550750
      },
      {
        "seconds": 1617600,
        "gold": 11261000,
        "wood": 11261000,
        "ore": 8445750,
        "mana": 8445750
      },
      {
        "seconds": 2448000,
        "gold": 17051000,
        "wood": 17051000,
        "ore": 12788250,
        "mana": 12788250
      }
    ],
    "137": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 21600,
        "gold": 150000,
        "wood": 150000,
        "ore": 112500,
        "mana": 112500
      },
      {
        "seconds": 54000,
        "gold": 375000,
        "wood": 375000,
        "ore": 281250,
        "mana": 281250
      },
      {
        "seconds": 102600,
        "gold": 713000,
        "wood": 713000,
        "ore": 534750,
        "mana": 534750
      },
      {
        "seconds": 175800,
        "gold": 1220000,
        "wood": 1220000,
        "ore": 915000,
        "mana": 915000
      },
      {
        "seconds": 285000,
        "gold": 1981000,
        "wood": 1981000,
        "ore": 1485750,
        "mana": 1485750
      },
      {
        "seconds": 448800,
        "gold": 3121000,
        "wood": 3121000,
        "ore": 2340750,
        "mana": 2340750
      },
      {
        "seconds": 694800,
        "gold": 4831000,
        "wood": 4831000,
        "ore": 3623250,
        "mana": 3623250
      },
      {
        "seconds": 1063800,
        "gold": 7401000,
        "wood": 7401000,
        "ore": 5550750,
        "mana": 5550750
      },
      {
        "seconds": 1617600,
        "gold": 11261000,
        "wood": 11261000,
        "ore": 8445750,
        "mana": 8445750
      },
      {
        "seconds": 2448000,
        "gold": 17051000,
        "wood": 17051000,
        "ore": 12788250,
        "mana": 12788250
      }
    ],
    "138": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 21600,
        "gold": 150000,
        "wood": 150000,
        "ore": 112500,
        "mana": 112500
      },
      {
        "seconds": 54000,
        "gold": 375000,
        "wood": 375000,
        "ore": 281250,
        "mana": 281250
      },
      {
        "seconds": 102600,
        "gold": 713000,
        "wood": 713000,
        "ore": 534750,
        "mana": 534750
      },
      {
        "seconds": 175800,
        "gold": 1220000,
        "wood": 1220000,
        "ore": 915000,
        "mana": 915000
      },
      {
        "seconds": 285000,
        "gold": 1981000,
        "wood": 1981000,
        "ore": 1485750,
        "mana": 1485750
      },
      {
        "seconds": 448800,
        "gold": 3121000,
        "wood": 3121000,
        "ore": 2340750,
        "mana": 2340750
      },
      {
        "seconds": 694800,
        "gold": 4831000,
        "wood": 4831000,
        "ore": 3623250,
        "mana": 3623250
      },
      {
        "seconds": 1063800,
        "gold": 7401000,
        "wood": 7401000,
        "ore": 5550750,
        "mana": 5550750
      },
      {
        "seconds": 1617600,
        "gold": 11261000,
        "wood": 11261000,
        "ore": 8445750,
        "mana": 8445750
      },
      {
        "seconds": 2448000,
        "gold": 17051000,
        "wood": 17051000,
        "ore": 12788250,
        "mana": 12788250
      }
    ],
    "139": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 21600,
        "gold": 200000,
        "wood": 200000,
        "ore": 150000,
        "mana": 150000
      },
      {
        "seconds": 54000,
        "gold": 500000,
        "wood": 500000,
        "ore": 375000,
        "mana": 375000
      },
      {
        "seconds": 102600,
        "gold": 950000,
        "wood": 950000,
        "ore": 713000,
        "mana": 713000
      },
      {
        "seconds": 175800,
        "gold": 1625000,
        "wood": 1625000,
        "ore": 1220000,
        "mana": 1220000
      },
      {
        "seconds": 285000,
        "gold": 2635000,
        "wood": 2635000,
        "ore": 1981000,
        "mana": 1981000
      },
      {
        "seconds": 448800,
        "gold": 4155000,
        "wood": 4155000,
        "ore": 3121000,
        "mana": 3121000
      },
      {
        "seconds": 694800,
        "gold": 6435000,
        "wood": 6435000,
        "ore": 4831000,
        "mana": 4831000
      },
      {
        "seconds": 1063800,
        "gold": 9855000,
        "wood": 9855000,
        "ore": 7401000,
        "mana": 7401000
      },
      {
        "seconds": 1617600,
        "gold": 14985000,
        "wood": 14985000,
        "ore": 11261000,
        "mana": 11261000
      },
      {
        "seconds": 2448000,
        "gold": 22685000,
        "wood": 22685000,
        "ore": 17041000,
        "mana": 17041000
      }
    ],
    "140": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 21600,
        "gold": 200000,
        "wood": 200000,
        "ore": 150000,
        "mana": 150000
      },
      {
        "seconds": 54000,
        "gold": 500000,
        "wood": 500000,
        "ore": 375000,
        "mana": 375000
      },
      {
        "seconds": 102600,
        "gold": 950000,
        "wood": 950000,
        "ore": 713000,
        "mana": 713000
      },
      {
        "seconds": 175800,
        "gold": 1625000,
        "wood": 1625000,
        "ore": 1220000,
        "mana": 1220000
      },
      {
        "seconds": 285000,
        "gold": 2635000,
        "wood": 2635000,
        "ore": 1981000,
        "mana": 1981000
      },
      {
        "seconds": 448800,
        "gold": 4155000,
        "wood": 4155000,
        "ore": 3121000,
        "mana": 3121000
      },
      {
        "seconds": 694800,
        "gold": 6435000,
        "wood": 6435000,
        "ore": 4831000,
        "mana": 4831000
      },
      {
        "seconds": 1063800,
        "gold": 9855000,
        "wood": 9855000,
        "ore": 7401000,
        "mana": 7401000
      },
      {
        "seconds": 1617600,
        "gold": 14985000,
        "wood": 14985000,
        "ore": 11261000,
        "mana": 11261000
      },
      {
        "seconds": 2448000,
        "gold": 22685000,
        "wood": 22685000,
        "ore": 17041000,
        "mana": 17041000
      }
    ],
    "141": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 21600,
        "gold": 200000,
        "wood": 200000,
        "ore": 150000,
        "mana": 150000
      },
      {
        "seconds": 54000,
        "gold": 500000,
        "wood": 500000,
        "ore": 375000,
        "mana": 375000
      },
      {
        "seconds": 102600,
        "gold": 950000,
        "wood": 950000,
        "ore": 713000,
        "mana": 713000
      },
      {
        "seconds": 175800,
        "gold": 1625000,
        "wood": 1625000,
        "ore": 1220000,
        "mana": 1220000
      },
      {
        "seconds": 285000,
        "gold": 2635000,
        "wood": 2635000,
        "ore": 1981000,
        "mana": 1981000
      },
      {
        "seconds": 448800,
        "gold": 4155000,
        "wood": 4155000,
        "ore": 3121000,
        "mana": 3121000
      },
      {
        "seconds": 694800,
        "gold": 6435000,
        "wood": 6435000,
        "ore": 4831000,
        "mana": 4831000
      },
      {
        "seconds": 1063800,
        "gold": 9855000,
        "wood": 9855000,
        "ore": 7401000,
        "mana": 7401000
      },
      {
        "seconds": 1617600,
        "gold": 14985000,
        "wood": 14985000,
        "ore": 11261000,
        "mana": 11261000
      },
      {
        "seconds": 2448000,
        "gold": 22685000,
        "wood": 22685000,
        "ore": 17041000,
        "mana": 17041000
      }
    ],
    "142": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 21600,
        "gold": 200000,
        "wood": 200000,
        "ore": 150000,
        "mana": 150000
      },
      {
        "seconds": 54000,
        "gold": 500000,
        "wood": 500000,
        "ore": 375000,
        "mana": 375000
      },
      {
        "seconds": 102600,
        "gold": 950000,
        "wood": 950000,
        "ore": 713000,
        "mana": 713000
      },
      {
        "seconds": 175800,
        "gold": 1625000,
        "wood": 1625000,
        "ore": 1220000,
        "mana": 1220000
      },
      {
        "seconds": 285000,
        "gold": 2635000,
        "wood": 2635000,
        "ore": 1981000,
        "mana": 1981000
      },
      {
        "seconds": 448800,
        "gold": 4155000,
        "wood": 4155000,
        "ore": 3121000,
        "mana": 3121000
      },
      {
        "seconds": 694800,
        "gold": 6435000,
        "wood": 6435000,
        "ore": 4831000,
        "mana": 4831000
      },
      {
        "seconds": 1063800,
        "gold": 9855000,
        "wood": 9855000,
        "ore": 7401000,
        "mana": 7401000
      },
      {
        "seconds": 1617600,
        "gold": 14985000,
        "wood": 14985000,
        "ore": 11261000,
        "mana": 11261000
      },
      {
        "seconds": 2448000,
        "gold": 22685000,
        "wood": 22685000,
        "ore": 17041000,
        "mana": 17041000
      }
    ],
    "143": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 28800,
        "gold": 400000,
        "wood": 400000,
        "ore": 300000,
        "mana": 300000
      },
      {
        "seconds": 72000,
        "gold": 1000000,
        "wood": 1000000,
        "ore": 750000,
        "mana": 750000
      },
      {
        "seconds": 136800,
        "gold": 1900000,
        "wood": 1900000,
        "ore": 1425000,
        "mana": 1425000
      },
      {
        "seconds": 234000,
        "gold": 3250000,
        "wood": 3250000,
        "ore": 2435000,
        "mana": 2435000
      },
      {
        "seconds": 379800,
        "gold": 5280000,
        "wood": 5280000,
        "ore": 3955000,
        "mana": 3955000
      },
      {
        "seconds": 598800,
        "gold": 8320000,
        "wood": 8320000,
        "ore": 6235000,
        "mana": 6235000
      },
      {
        "seconds": 927000,
        "gold": 12920000,
        "wood": 12920000,
        "ore": 9635000,
        "mana": 9635000
      },
      {
        "seconds": 1419000,
        "gold": 19760000,
        "wood": 19760000,
        "ore": 14765000,
        "mana": 14765000
      },
      {
        "seconds": 2157000,
        "gold": 30010000,
        "wood": 30010000,
        "ore": 22465000,
        "mana": 22465000
      },
      {
        "seconds": 3264000,
        "gold": 45385000,
        "wood": 45385000,
        "ore": 34015000,
        "mana": 34015000
      }
    ],
    "144": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 28800,
        "gold": 400000,
        "wood": 400000,
        "ore": 300000,
        "mana": 300000
      },
      {
        "seconds": 72000,
        "gold": 1000000,
        "wood": 1000000,
        "ore": 750000,
        "mana": 750000
      },
      {
        "seconds": 136800,
        "gold": 1900000,
        "wood": 1900000,
        "ore": 1425000,
        "mana": 1425000
      },
      {
        "seconds": 234000,
        "gold": 3250000,
        "wood": 3250000,
        "ore": 2435000,
        "mana": 2435000
      },
      {
        "seconds": 379800,
        "gold": 5280000,
        "wood": 5280000,
        "ore": 3955000,
        "mana": 3955000
      },
      {
        "seconds": 598800,
        "gold": 8320000,
        "wood": 8320000,
        "ore": 6235000,
        "mana": 6235000
      },
      {
        "seconds": 927000,
        "gold": 12920000,
        "wood": 12920000,
        "ore": 9635000,
        "mana": 9635000
      },
      {
        "seconds": 1419000,
        "gold": 19760000,
        "wood": 19760000,
        "ore": 14765000,
        "mana": 14765000
      },
      {
        "seconds": 2157000,
        "gold": 30010000,
        "wood": 30010000,
        "ore": 22465000,
        "mana": 22465000
      },
      {
        "seconds": 3264000,
        "gold": 45385000,
        "wood": 45385000,
        "ore": 34015000,
        "mana": 34015000
      }
    ],
    "145": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 3600,
        "gold": 20000,
        "wood": 20000,
        "ore": 15000,
        "mana": 0
      }
    ]
  },
  "military": {
    "201": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 900,
        "gold": 5000,
        "wood": 5000,
        "ore": 0,
        "mana": 0
      }
    ],
    "202": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 900,
        "gold": 5000,
        "wood": 5000,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 2520,
        "gold": 12000,
        "wood": 12000,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 5460,
        "gold": 22000,
        "wood": 22000,
        "ore": 7500,
        "mana": 0
      },
      {
        "seconds": 10680,
        "gold": 36000,
        "wood": 36000,
        "ore": 18000,
        "mana": 0
      },
      {
        "seconds": 20100,
        "gold": 56000,
        "wood": 56000,
        "ore": 33000,
        "mana": 0
      }
    ],
    "203": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 900,
        "gold": 5000,
        "wood": 5000,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 2520,
        "gold": 12000,
        "wood": 12000,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 5460,
        "gold": 22000,
        "wood": 22000,
        "ore": 7500,
        "mana": 0
      },
      {
        "seconds": 10680,
        "gold": 36000,
        "wood": 36000,
        "ore": 18000,
        "mana": 0
      },
      {
        "seconds": 20100,
        "gold": 56000,
        "wood": 56000,
        "ore": 33000,
        "mana": 0
      }
    ],
    "204": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 900,
        "gold": 5000,
        "wood": 5000,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 2520,
        "gold": 12000,
        "wood": 12000,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 5460,
        "gold": 22000,
        "wood": 22000,
        "ore": 7500,
        "mana": 0
      },
      {
        "seconds": 10680,
        "gold": 36000,
        "wood": 36000,
        "ore": 18000,
        "mana": 0
      },
      {
        "seconds": 20100,
        "gold": 56000,
        "wood": 56000,
        "ore": 33000,
        "mana": 0
      }
    ],
    "205": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 900,
        "gold": 5000,
        "wood": 5000,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 2520,
        "gold": 12000,
        "wood": 12000,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 5460,
        "gold": 22000,
        "wood": 22000,
        "ore": 7500,
        "mana": 0
      },
      {
        "seconds": 10680,
        "gold": 36000,
        "wood": 36000,
        "ore": 18000,
        "mana": 0
      },
      {
        "seconds": 20100,
        "gold": 56000,
        "wood": 56000,
        "ore": 33000,
        "mana": 0
      }
    ],
    "206": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 900,
        "gold": 5000,
        "wood": 5000,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 2520,
        "gold": 12000,
        "wood": 12000,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 5460,
        "gold": 22000,
        "wood": 22000,
        "ore": 7500,
        "mana": 0
      },
      {
        "seconds": 10680,
        "gold": 36000,
        "wood": 36000,
        "ore": 18000,
        "mana": 0
      },
      {
        "seconds": 20100,
        "gold": 56000,
        "wood": 56000,
        "ore": 33000,
        "mana": 0
      }
    ],
    "207": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 900,
        "gold": 5000,
        "wood": 5000,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 2520,
        "gold": 12000,
        "wood": 12000,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 5460,
        "gold": 22000,
        "wood": 22000,
        "ore": 7500,
        "mana": 0
      },
      {
        "seconds": 10680,
        "gold": 36000,
        "wood": 36000,
        "ore": 18000,
        "mana": 0
      },
      {
        "seconds": 20100,
        "gold": 56000,
        "wood": 56000,
        "ore": 33000,
        "mana": 0
      }
    ],
    "208": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 900,
        "gold": 5000,
        "wood": 5000,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 2520,
        "gold": 12000,
        "wood": 12000,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 5460,
        "gold": 22000,
        "wood": 22000,
        "ore": 7500,
        "mana": 0
      },
      {
        "seconds": 10680,
        "gold": 36000,
        "wood": 36000,
        "ore": 18000,
        "mana": 0
      },
      {
        "seconds": 20100,
        "gold": 56000,
        "wood": 56000,
        "ore": 33000,
        "mana": 0
      }
    ],
    "209": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 900,
        "gold": 5000,
        "wood": 5000,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 2520,
        "gold": 12500,
        "wood": 12000,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 5460,
        "gold": 24000,
        "wood": 22000,
        "ore": 8500,
        "mana": 0
      },
      {
        "seconds": 10680,
        "gold": 41000,
        "wood": 36000,
        "ore": 21000,
        "mana": 0
      },
      {
        "seconds": 20100,
        "gold": 66500,
        "wood": 56000,
        "ore": 40000,
        "mana": 0
      }
    ],
    "210": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 1800,
        "gold": 8000,
        "wood": 8000,
        "ore": 6000,
        "mana": 0
      },
      {
        "seconds": 3960,
        "gold": 20000,
        "wood": 20000,
        "ore": 15000,
        "mana": 0
      },
      {
        "seconds": 6540,
        "gold": 38000,
        "wood": 38000,
        "ore": 28500,
        "mana": 0
      },
      {
        "seconds": 9660,
        "gold": 65000,
        "wood": 65000,
        "ore": 49000,
        "mana": 0
      },
      {
        "seconds": 13380,
        "gold": 105500,
        "wood": 105500,
        "ore": 79500,
        "mana": 0
      }
    ],
    "211": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 28800,
        "gold": 120000,
        "wood": 120000,
        "ore": 90000,
        "mana": 0
      }
    ],
    "212": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 28800,
        "gold": 120000,
        "wood": 120000,
        "ore": 90000,
        "mana": 0
      }
    ],
    "213": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 28800,
        "gold": 120000,
        "wood": 120000,
        "ore": 90000,
        "mana": 0
      }
    ],
    "214": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 28800,
        "gold": 120000,
        "wood": 120000,
        "ore": 90000,
        "mana": 0
      }
    ],
    "215": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 7200,
        "gold": 8000,
        "wood": 8000,
        "ore": 6000,
        "mana": 0
      },
      {
        "seconds": 16500,
        "gold": 20000,
        "wood": 20000,
        "ore": 15000,
        "mana": 0
      },
      {
        "seconds": 28800,
        "gold": 38000,
        "wood": 38000,
        "ore": 28500,
        "mana": 0
      },
      {
        "seconds": 44700,
        "gold": 65000,
        "wood": 65000,
        "ore": 49000,
        "mana": 0
      },
      {
        "seconds": 65400,
        "gold": 105500,
        "wood": 105500,
        "ore": 79500,
        "mana": 0
      },
      {
        "seconds": 92100,
        "gold": 166500,
        "wood": 166500,
        "ore": 125000,
        "mana": 0
      },
      {
        "seconds": 126900,
        "gold": 257500,
        "wood": 257500,
        "ore": 193500,
        "mana": 0
      },
      {
        "seconds": 172200,
        "gold": 394000,
        "wood": 394000,
        "ore": 296000,
        "mana": 0
      },
      {
        "seconds": 231000,
        "gold": 599000,
        "wood": 599000,
        "ore": 450000,
        "mana": 0
      },
      {
        "seconds": 307500,
        "gold": 906500,
        "wood": 906500,
        "ore": 680500,
        "mana": 230500
      }
    ],
    "216": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 10800,
        "gold": 8000,
        "wood": 8000,
        "ore": 6000,
        "mana": 0
      },
      {
        "seconds": 24900,
        "gold": 20000,
        "wood": 20000,
        "ore": 15000,
        "mana": 0
      },
      {
        "seconds": 43200,
        "gold": 38000,
        "wood": 38000,
        "ore": 28500,
        "mana": 0
      },
      {
        "seconds": 66900,
        "gold": 65000,
        "wood": 65000,
        "ore": 49000,
        "mana": 0
      },
      {
        "seconds": 97800,
        "gold": 105500,
        "wood": 105500,
        "ore": 79500,
        "mana": 0
      },
      {
        "seconds": 138000,
        "gold": 166500,
        "wood": 166500,
        "ore": 125000,
        "mana": 0
      },
      {
        "seconds": 190200,
        "gold": 257500,
        "wood": 257500,
        "ore": 193500,
        "mana": 0
      },
      {
        "seconds": 258000,
        "gold": 394000,
        "wood": 394000,
        "ore": 296000,
        "mana": 0
      },
      {
        "seconds": 346200,
        "gold": 599000,
        "wood": 599000,
        "ore": 450000,
        "mana": 0
      },
      {
        "seconds": 460800,
        "gold": 906500,
        "wood": 906500,
        "ore": 680500,
        "mana": 230500
      }
    ],
    "217": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 10800,
        "gold": 8000,
        "wood": 8000,
        "ore": 6000,
        "mana": 0
      },
      {
        "seconds": 24900,
        "gold": 20000,
        "wood": 20000,
        "ore": 15000,
        "mana": 0
      },
      {
        "seconds": 43200,
        "gold": 38000,
        "wood": 38000,
        "ore": 28500,
        "mana": 0
      },
      {
        "seconds": 66900,
        "gold": 65000,
        "wood": 65000,
        "ore": 49000,
        "mana": 0
      },
      {
        "seconds": 97800,
        "gold": 105500,
        "wood": 105500,
        "ore": 79500,
        "mana": 0
      },
      {
        "seconds": 138000,
        "gold": 166500,
        "wood": 166500,
        "ore": 125000,
        "mana": 0
      },
      {
        "seconds": 190200,
        "gold": 257500,
        "wood": 257500,
        "ore": 193500,
        "mana": 0
      },
      {
        "seconds": 258000,
        "gold": 394000,
        "wood": 394000,
        "ore": 296000,
        "mana": 0
      },
      {
        "seconds": 346200,
        "gold": 599000,
        "wood": 599000,
        "ore": 450000,
        "mana": 0
      },
      {
        "seconds": 460800,
        "gold": 906500,
        "wood": 906500,
        "ore": 680500,
        "mana": 230500
      }
    ],
    "218": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 14400,
        "gold": 8000,
        "wood": 8000,
        "ore": 6000,
        "mana": 0
      },
      {
        "seconds": 33000,
        "gold": 20000,
        "wood": 20000,
        "ore": 15000,
        "mana": 0
      },
      {
        "seconds": 57300,
        "gold": 38000,
        "wood": 38000,
        "ore": 28500,
        "mana": 0
      },
      {
        "seconds": 88800,
        "gold": 65000,
        "wood": 65000,
        "ore": 49000,
        "mana": 0
      },
      {
        "seconds": 129900,
        "gold": 105500,
        "wood": 105500,
        "ore": 79500,
        "mana": 0
      },
      {
        "seconds": 183300,
        "gold": 166500,
        "wood": 166500,
        "ore": 125000,
        "mana": 0
      },
      {
        "seconds": 252900,
        "gold": 257500,
        "wood": 257500,
        "ore": 193500,
        "mana": 68500
      },
      {
        "seconds": 343200,
        "gold": 394000,
        "wood": 394000,
        "ore": 296000,
        "mana": 171000
      },
      {
        "seconds": 460800,
        "gold": 599000,
        "wood": 599000,
        "ore": 450000,
        "mana": 325000
      },
      {
        "seconds": 613500,
        "gold": 906500,
        "wood": 906500,
        "ore": 680500,
        "mana": 555500
      }
    ],
    "219": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 14400,
        "gold": 8000,
        "wood": 8000,
        "ore": 6000,
        "mana": 0
      },
      {
        "seconds": 33000,
        "gold": 20000,
        "wood": 20000,
        "ore": 15000,
        "mana": 0
      },
      {
        "seconds": 57300,
        "gold": 38000,
        "wood": 38000,
        "ore": 28500,
        "mana": 0
      },
      {
        "seconds": 88800,
        "gold": 65000,
        "wood": 65000,
        "ore": 49000,
        "mana": 0
      },
      {
        "seconds": 129900,
        "gold": 105500,
        "wood": 105500,
        "ore": 79500,
        "mana": 0
      },
      {
        "seconds": 183300,
        "gold": 166500,
        "wood": 166500,
        "ore": 125000,
        "mana": 0
      },
      {
        "seconds": 252900,
        "gold": 257500,
        "wood": 257500,
        "ore": 193500,
        "mana": 68500
      },
      {
        "seconds": 343200,
        "gold": 394000,
        "wood": 394000,
        "ore": 296000,
        "mana": 171000
      },
      {
        "seconds": 460800,
        "gold": 599000,
        "wood": 599000,
        "ore": 450000,
        "mana": 325000
      },
      {
        "seconds": 613500,
        "gold": 906500,
        "wood": 906500,
        "ore": 680500,
        "mana": 555500
      }
    ],
    "220": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 21600,
        "gold": 200000,
        "wood": 200000,
        "ore": 150000,
        "mana": 100000
      }
    ],
    "221": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 21600,
        "gold": 200000,
        "wood": 200000,
        "ore": 150000,
        "mana": 100000
      }
    ],
    "222": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 21600,
        "gold": 200000,
        "wood": 200000,
        "ore": 150000,
        "mana": 100000
      }
    ],
    "223": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 21600,
        "gold": 200000,
        "wood": 200000,
        "ore": 150000,
        "mana": 100000
      }
    ],
    "224": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 21600,
        "gold": 8000,
        "wood": 8000,
        "ore": 6000,
        "mana": 6000
      },
      {
        "seconds": 49800,
        "gold": 20000,
        "wood": 20000,
        "ore": 15000,
        "mana": 15000
      },
      {
        "seconds": 86400,
        "gold": 38000,
        "wood": 38000,
        "ore": 28500,
        "mana": 28500
      },
      {
        "seconds": 133800,
        "gold": 65000,
        "wood": 65000,
        "ore": 49000,
        "mana": 49000
      },
      {
        "seconds": 195600,
        "gold": 105500,
        "wood": 105500,
        "ore": 79500,
        "mana": 79500
      },
      {
        "seconds": 275700,
        "gold": 166500,
        "wood": 166500,
        "ore": 125000,
        "mana": 125000
      },
      {
        "seconds": 380100,
        "gold": 257500,
        "wood": 257500,
        "ore": 193500,
        "mana": 193500
      },
      {
        "seconds": 515700,
        "gold": 394000,
        "wood": 394000,
        "ore": 296000,
        "mana": 296000
      },
      {
        "seconds": 691800,
        "gold": 599000,
        "wood": 599000,
        "ore": 450000,
        "mana": 450000
      },
      {
        "seconds": 921000,
        "gold": 906500,
        "wood": 906500,
        "ore": 680500,
        "mana": 680500
      }
    ],
    "225": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 21600,
        "gold": 12000,
        "wood": 12000,
        "ore": 9000,
        "mana": 9000
      },
      {
        "seconds": 47400,
        "gold": 30000,
        "wood": 30000,
        "ore": 22500,
        "mana": 22500
      },
      {
        "seconds": 78600,
        "gold": 57000,
        "wood": 57000,
        "ore": 43000,
        "mana": 43000
      },
      {
        "seconds": 115800,
        "gold": 97500,
        "wood": 97500,
        "ore": 73500,
        "mana": 73500
      },
      {
        "seconds": 160500,
        "gold": 158500,
        "wood": 158500,
        "ore": 119000,
        "mana": 119000
      },
      {
        "seconds": 214200,
        "gold": 249500,
        "wood": 249500,
        "ore": 187500,
        "mana": 187500
      },
      {
        "seconds": 278700,
        "gold": 386000,
        "wood": 386000,
        "ore": 290000,
        "mana": 290000
      },
      {
        "seconds": 356100,
        "gold": 591000,
        "wood": 591000,
        "ore": 444000,
        "mana": 444000
      },
      {
        "seconds": 449100,
        "gold": 898500,
        "wood": 898500,
        "ore": 674500,
        "mana": 674500
      },
      {
        "seconds": 560700,
        "gold": 1360000,
        "wood": 1360000,
        "ore": 1020500,
        "mana": 1020500
      }
    ],
    "226": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 21600,
        "gold": 8000,
        "wood": 8000,
        "ore": 6000,
        "mana": 6000
      },
      {
        "seconds": 49800,
        "gold": 20000,
        "wood": 20000,
        "ore": 15000,
        "mana": 15000
      },
      {
        "seconds": 86400,
        "gold": 38000,
        "wood": 38000,
        "ore": 28500,
        "mana": 28500
      },
      {
        "seconds": 133800,
        "gold": 65000,
        "wood": 65000,
        "ore": 49000,
        "mana": 49000
      },
      {
        "seconds": 195600,
        "gold": 105500,
        "wood": 105500,
        "ore": 79500,
        "mana": 79500
      },
      {
        "seconds": 275700,
        "gold": 166500,
        "wood": 166500,
        "ore": 125000,
        "mana": 125000
      },
      {
        "seconds": 380100,
        "gold": 257500,
        "wood": 257500,
        "ore": 193500,
        "mana": 193500
      },
      {
        "seconds": 515700,
        "gold": 394000,
        "wood": 394000,
        "ore": 296000,
        "mana": 296000
      },
      {
        "seconds": 691800,
        "gold": 599000,
        "wood": 599000,
        "ore": 450000,
        "mana": 450000
      },
      {
        "seconds": 921000,
        "gold": 906500,
        "wood": 906500,
        "ore": 680500,
        "mana": 680500
      }
    ],
    "227": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 216000,
        "gold": 900000,
        "wood": 900000,
        "ore": 675000,
        "mana": 1250000
      }
    ],
    "228": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 216000,
        "gold": 900000,
        "wood": 900000,
        "ore": 675000,
        "mana": 1250000
      }
    ],
    "229": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 216000,
        "gold": 900000,
        "wood": 900000,
        "ore": 675000,
        "mana": 1250000
      }
    ],
    "230": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 216000,
        "gold": 900000,
        "wood": 900000,
        "ore": 675000,
        "mana": 1250000
      }
    ],
    "232": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 36000,
        "gold": 200000,
        "wood": 200000,
        "ore": 150000,
        "mana": 100000
      },
      {
        "seconds": 108000,
        "gold": 500000,
        "wood": 500000,
        "ore": 375000,
        "mana": 250000
      },
      {
        "seconds": 252000,
        "gold": 950000,
        "wood": 950000,
        "ore": 712500,
        "mana": 520000
      },
      {
        "seconds": 540000,
        "gold": 1625000,
        "wood": 1625000,
        "ore": 1219000,
        "mana": 925000
      },
      {
        "seconds": 1116000,
        "gold": 2640000,
        "wood": 2640000,
        "ore": 1980500,
        "mana": 1534000
      }
    ],
    "234": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 10800,
        "gold": 200000,
        "wood": 200000,
        "ore": 150000,
        "mana": 100000
      },
      {
        "seconds": 39600,
        "gold": 500000,
        "wood": 500000,
        "ore": 375000,
        "mana": 250000
      },
      {
        "seconds": 126000,
        "gold": 950000,
        "wood": 950000,
        "ore": 712500,
        "mana": 520000
      },
      {
        "seconds": 342000,
        "gold": 1625000,
        "wood": 1625000,
        "ore": 1219000,
        "mana": 925000
      },
      {
        "seconds": 802800,
        "gold": 2638000,
        "wood": 2638000,
        "ore": 1979000,
        "mana": 1533000
      },
      {
        "seconds": 1724400,
        "gold": 4158000,
        "wood": 4158000,
        "ore": 3119000,
        "mana": 2445000
      },
      {
        "seconds": 3567600,
        "gold": 6438000,
        "wood": 6438000,
        "ore": 4829000,
        "mana": 3813000
      },
      {
        "seconds": 7254000,
        "gold": 9858000,
        "wood": 9858000,
        "ore": 7394000,
        "mana": 5865000
      },
      {
        "seconds": 14626800,
        "gold": 14988000,
        "wood": 14988000,
        "ore": 11241500,
        "mana": 8943000
      },
      {
        "seconds": 29372400,
        "gold": 22683000,
        "wood": 22683000,
        "ore": 17013000,
        "mana": 13560000
      }
    ],
    "235": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 10800,
        "gold": 250000,
        "wood": 250000,
        "ore": 187500,
        "mana": 125000
      },
      {
        "seconds": 39600,
        "gold": 625000,
        "wood": 625000,
        "ore": 469000,
        "mana": 312500
      },
      {
        "seconds": 126000,
        "gold": 1190000,
        "wood": 1190000,
        "ore": 891500,
        "mana": 651500
      },
      {
        "seconds": 342000,
        "gold": 2035000,
        "wood": 2035000,
        "ore": 1526500,
        "mana": 1158500
      },
      {
        "seconds": 802800,
        "gold": 3300000,
        "wood": 3300000,
        "ore": 2476500,
        "mana": 1917500
      },
      {
        "seconds": 1724400,
        "gold": 5200000,
        "wood": 5200000,
        "ore": 3906500,
        "mana": 3057500
      },
      {
        "seconds": 3567600,
        "gold": 8050000,
        "wood": 8050000,
        "ore": 6051500,
        "mana": 4767500
      },
      {
        "seconds": 7254000,
        "gold": 12325000,
        "wood": 12325000,
        "ore": 9271500,
        "mana": 7332500
      },
      {
        "seconds": 14626800,
        "gold": 18740000,
        "wood": 18740000,
        "ore": 14101500,
        "mana": 11181500
      },
      {
        "seconds": 29372400,
        "gold": 28365000,
        "wood": 28365000,
        "ore": 21346500,
        "mana": 16956500
      }
    ],
    "236": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 10800,
        "gold": 200000,
        "wood": 200000,
        "ore": 150000,
        "mana": 100000
      },
      {
        "seconds": 39600,
        "gold": 500000,
        "wood": 500000,
        "ore": 375000,
        "mana": 250000
      },
      {
        "seconds": 126000,
        "gold": 950000,
        "wood": 950000,
        "ore": 712500,
        "mana": 520000
      },
      {
        "seconds": 342000,
        "gold": 1625000,
        "wood": 1625000,
        "ore": 1219000,
        "mana": 925000
      },
      {
        "seconds": 802800,
        "gold": 2638000,
        "wood": 2638000,
        "ore": 1979000,
        "mana": 1533000
      },
      {
        "seconds": 1724400,
        "gold": 4158000,
        "wood": 4158000,
        "ore": 3119000,
        "mana": 2445000
      },
      {
        "seconds": 3567600,
        "gold": 6438000,
        "wood": 6438000,
        "ore": 4829000,
        "mana": 3813000
      },
      {
        "seconds": 7254000,
        "gold": 9858000,
        "wood": 9858000,
        "ore": 7394000,
        "mana": 5865000
      },
      {
        "seconds": 14626800,
        "gold": 14988000,
        "wood": 14988000,
        "ore": 11241500,
        "mana": 8943000
      },
      {
        "seconds": 29372400,
        "gold": 22683000,
        "wood": 22683000,
        "ore": 17013000,
        "mana": 13560000
      }
    ],
    "237": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 14400,
        "gold": 200000,
        "wood": 200000,
        "ore": 150000,
        "mana": 100000
      },
      {
        "seconds": 50400,
        "gold": 500000,
        "wood": 500000,
        "ore": 375000,
        "mana": 250000
      },
      {
        "seconds": 122400,
        "gold": 950000,
        "wood": 950000,
        "ore": 712500,
        "mana": 520000
      },
      {
        "seconds": 244200,
        "gold": 1625000,
        "wood": 1625000,
        "ore": 1219000,
        "mana": 925000
      },
      {
        "seconds": 426600,
        "gold": 2638000,
        "wood": 2638000,
        "ore": 1979000,
        "mana": 1533000
      },
      {
        "seconds": 700200,
        "gold": 4158000,
        "wood": 4158000,
        "ore": 3119000,
        "mana": 2445000
      },
      {
        "seconds": 1110000,
        "gold": 6438000,
        "wood": 6438000,
        "ore": 4829000,
        "mana": 3813000
      },
      {
        "seconds": 1725000,
        "gold": 9858000,
        "wood": 9858000,
        "ore": 7394000,
        "mana": 5865000
      },
      {
        "seconds": 2647800,
        "gold": 14988000,
        "wood": 14988000,
        "ore": 11241500,
        "mana": 8943000
      },
      {
        "seconds": 4032000,
        "gold": 22683000,
        "wood": 22683000,
        "ore": 17013000,
        "mana": 13560000
      }
    ],
    "238": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 2160000,
        "gold": 5000000,
        "wood": 5000000,
        "ore": 3750000,
        "mana": 5000000
      }
    ],
    "239": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 2160000,
        "gold": 5000000,
        "wood": 5000000,
        "ore": 3750000,
        "mana": 5000000
      }
    ],
    "240": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 2160000,
        "gold": 5000000,
        "wood": 5000000,
        "ore": 3750000,
        "mana": 5000000
      }
    ],
    "241": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 2160000,
        "gold": 5000000,
        "wood": 5000000,
        "ore": 3750000,
        "mana": 5000000
      }
    ],
    "242": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 2160000,
        "gold": 5000000,
        "wood": 5000000,
        "ore": 3750000,
        "mana": 5000000
      }
    ],
    "243": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 19200,
        "gold": 600000,
        "wood": 600000,
        "ore": 450000,
        "mana": 300000
      },
      {
        "seconds": 67800,
        "gold": 1500000,
        "wood": 1500000,
        "ore": 1125000,
        "mana": 750000
      },
      {
        "seconds": 165000,
        "gold": 2850000,
        "wood": 2850000,
        "ore": 2137500,
        "mana": 1425000
      },
      {
        "seconds": 456600,
        "gold": 4875000,
        "wood": 4875000,
        "ore": 3656500,
        "mana": 2437500
      },
      {
        "seconds": 1078800,
        "gold": 7920000,
        "wood": 7920000,
        "ore": 5940500,
        "mana": 3960000
      },
      {
        "seconds": 2323200,
        "gold": 12480000,
        "wood": 12480000,
        "ore": 9360500,
        "mana": 6240000
      },
      {
        "seconds": 4811400,
        "gold": 19320000,
        "wood": 19320000,
        "ore": 14490500,
        "mana": 9660000
      },
      {
        "seconds": 9787800,
        "gold": 29580000,
        "wood": 29580000,
        "ore": 22185500,
        "mana": 14790000
      },
      {
        "seconds": 19741200,
        "gold": 44955000,
        "wood": 44955000,
        "ore": 33717000,
        "mana": 22477500
      },
      {
        "seconds": 39648000,
        "gold": 68017500,
        "wood": 68017500,
        "ore": 51014000,
        "mana": 34009000
      }
    ],
    "244": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 19200,
        "gold": 600000,
        "wood": 600000,
        "ore": 450000,
        "mana": 300000
      },
      {
        "seconds": 67800,
        "gold": 1500000,
        "wood": 1500000,
        "ore": 1125000,
        "mana": 750000
      },
      {
        "seconds": 165000,
        "gold": 2850000,
        "wood": 2850000,
        "ore": 2137500,
        "mana": 1425000
      },
      {
        "seconds": 456600,
        "gold": 4875000,
        "wood": 4875000,
        "ore": 3656500,
        "mana": 2437500
      },
      {
        "seconds": 1078800,
        "gold": 7920000,
        "wood": 7920000,
        "ore": 5940500,
        "mana": 3960000
      },
      {
        "seconds": 2323200,
        "gold": 12480000,
        "wood": 12480000,
        "ore": 9360500,
        "mana": 6240000
      },
      {
        "seconds": 4811400,
        "gold": 19320000,
        "wood": 19320000,
        "ore": 14490500,
        "mana": 9660000
      },
      {
        "seconds": 9787800,
        "gold": 29580000,
        "wood": 29580000,
        "ore": 22185500,
        "mana": 14790000
      },
      {
        "seconds": 19741200,
        "gold": 44955000,
        "wood": 44955000,
        "ore": 33717000,
        "mana": 22477500
      },
      {
        "seconds": 39648000,
        "gold": 68017500,
        "wood": 68017500,
        "ore": 51014000,
        "mana": 34009000
      }
    ],
    "245": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 19200,
        "gold": 600000,
        "wood": 600000,
        "ore": 450000,
        "mana": 300000
      },
      {
        "seconds": 67800,
        "gold": 1500000,
        "wood": 1500000,
        "ore": 1125000,
        "mana": 750000
      },
      {
        "seconds": 165000,
        "gold": 2850000,
        "wood": 2850000,
        "ore": 2137500,
        "mana": 1425000
      },
      {
        "seconds": 456600,
        "gold": 4875000,
        "wood": 4875000,
        "ore": 3656500,
        "mana": 2437500
      },
      {
        "seconds": 1078800,
        "gold": 7920000,
        "wood": 7920000,
        "ore": 5940500,
        "mana": 3960000
      },
      {
        "seconds": 2323200,
        "gold": 12480000,
        "wood": 12480000,
        "ore": 9360500,
        "mana": 6240000
      },
      {
        "seconds": 4811400,
        "gold": 19320000,
        "wood": 19320000,
        "ore": 14490500,
        "mana": 9660000
      },
      {
        "seconds": 9787800,
        "gold": 29580000,
        "wood": 29580000,
        "ore": 22185500,
        "mana": 14790000
      },
      {
        "seconds": 19741200,
        "gold": 44955000,
        "wood": 44955000,
        "ore": 33717000,
        "mana": 22477500
      },
      {
        "seconds": 39648000,
        "gold": 68017500,
        "wood": 68017500,
        "ore": 51014000,
        "mana": 34009000
      }
    ],
    "246": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 17400,
        "gold": 400000,
        "wood": 400000,
        "ore": 300000,
        "mana": 200000
      },
      {
        "seconds": 52200,
        "gold": 1000000,
        "wood": 1000000,
        "ore": 750000,
        "mana": 500000
      },
      {
        "seconds": 121200,
        "gold": 1900000,
        "wood": 1900000,
        "ore": 1425000,
        "mana": 950000
      },
      {
        "seconds": 258000,
        "gold": 3250000,
        "wood": 3250000,
        "ore": 2435000,
        "mana": 1625000
      },
      {
        "seconds": 535200,
        "gold": 5280000,
        "wood": 5280000,
        "ore": 3955000,
        "mana": 2635000
      },
      {
        "seconds": 1089600,
        "gold": 8320000,
        "wood": 8320000,
        "ore": 6235000,
        "mana": 4155000
      },
      {
        "seconds": 2194800,
        "gold": 12880000,
        "wood": 12880000,
        "ore": 9655000,
        "mana": 6895000
      },
      {
        "seconds": 4405200,
        "gold": 19720000,
        "wood": 19720000,
        "ore": 14785000,
        "mana": 10995000
      },
      {
        "seconds": 8829600,
        "gold": 29970000,
        "wood": 29970000,
        "ore": 22485000,
        "mana": 17145000
      },
      {
        "seconds": 18283200,
        "gold": 45345000,
        "wood": 45345000,
        "ore": 34035000,
        "mana": 26370000
      }
    ],
    "247": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 17400,
        "gold": 400000,
        "wood": 400000,
        "ore": 300000,
        "mana": 200000
      },
      {
        "seconds": 52200,
        "gold": 1000000,
        "wood": 1000000,
        "ore": 750000,
        "mana": 500000
      },
      {
        "seconds": 121200,
        "gold": 1900000,
        "wood": 1900000,
        "ore": 1425000,
        "mana": 950000
      },
      {
        "seconds": 258000,
        "gold": 3250000,
        "wood": 3250000,
        "ore": 2435000,
        "mana": 1625000
      },
      {
        "seconds": 535200,
        "gold": 5280000,
        "wood": 5280000,
        "ore": 3955000,
        "mana": 2635000
      },
      {
        "seconds": 1089600,
        "gold": 8320000,
        "wood": 8320000,
        "ore": 6235000,
        "mana": 4155000
      },
      {
        "seconds": 2194800,
        "gold": 12880000,
        "wood": 12880000,
        "ore": 9655000,
        "mana": 6895000
      },
      {
        "seconds": 4405200,
        "gold": 19720000,
        "wood": 19720000,
        "ore": 14785000,
        "mana": 10995000
      },
      {
        "seconds": 8829600,
        "gold": 29970000,
        "wood": 29970000,
        "ore": 22485000,
        "mana": 17145000
      },
      {
        "seconds": 18283200,
        "gold": 45345000,
        "wood": 45345000,
        "ore": 34035000,
        "mana": 26370000
      }
    ],
    "248": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 17400,
        "gold": 400000,
        "wood": 400000,
        "ore": 300000,
        "mana": 200000
      },
      {
        "seconds": 52200,
        "gold": 1000000,
        "wood": 1000000,
        "ore": 750000,
        "mana": 500000
      },
      {
        "seconds": 121200,
        "gold": 1900000,
        "wood": 1900000,
        "ore": 1425000,
        "mana": 950000
      },
      {
        "seconds": 258000,
        "gold": 3250000,
        "wood": 3250000,
        "ore": 2435000,
        "mana": 1625000
      },
      {
        "seconds": 535200,
        "gold": 5280000,
        "wood": 5280000,
        "ore": 3955000,
        "mana": 2635000
      },
      {
        "seconds": 1089600,
        "gold": 8320000,
        "wood": 8320000,
        "ore": 6235000,
        "mana": 4155000
      },
      {
        "seconds": 2194800,
        "gold": 12880000,
        "wood": 12880000,
        "ore": 9655000,
        "mana": 6895000
      },
      {
        "seconds": 4405200,
        "gold": 19720000,
        "wood": 19720000,
        "ore": 14785000,
        "mana": 10995000
      },
      {
        "seconds": 8829600,
        "gold": 29970000,
        "wood": 29970000,
        "ore": 22485000,
        "mana": 17145000
      },
      {
        "seconds": 18283200,
        "gold": 45345000,
        "wood": 45345000,
        "ore": 34035000,
        "mana": 26370000
      }
    ],
    "249": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 17400,
        "gold": 400000,
        "wood": 400000,
        "ore": 300000,
        "mana": 200000
      },
      {
        "seconds": 52200,
        "gold": 1000000,
        "wood": 1000000,
        "ore": 750000,
        "mana": 500000
      },
      {
        "seconds": 121200,
        "gold": 1900000,
        "wood": 1900000,
        "ore": 1425000,
        "mana": 950000
      },
      {
        "seconds": 258000,
        "gold": 3250000,
        "wood": 3250000,
        "ore": 2435000,
        "mana": 1625000
      },
      {
        "seconds": 535200,
        "gold": 5280000,
        "wood": 5280000,
        "ore": 3955000,
        "mana": 2635000
      },
      {
        "seconds": 1089600,
        "gold": 8320000,
        "wood": 8320000,
        "ore": 6235000,
        "mana": 4155000
      },
      {
        "seconds": 2194800,
        "gold": 12880000,
        "wood": 12880000,
        "ore": 9655000,
        "mana": 6895000
      },
      {
        "seconds": 4405200,
        "gold": 19720000,
        "wood": 19720000,
        "ore": 14785000,
        "mana": 10995000
      },
      {
        "seconds": 8829600,
        "gold": 29970000,
        "wood": 29970000,
        "ore": 22485000,
        "mana": 17145000
      },
      {
        "seconds": 18283200,
        "gold": 45345000,
        "wood": 45345000,
        "ore": 34035000,
        "mana": 26370000
      }
    ],
    "250": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 25800,
        "gold": 400000,
        "wood": 400000,
        "ore": 300000,
        "mana": 200000
      },
      {
        "seconds": 77400,
        "gold": 1000000,
        "wood": 1000000,
        "ore": 750000,
        "mana": 500000
      },
      {
        "seconds": 181800,
        "gold": 1900000,
        "wood": 1900000,
        "ore": 1425000,
        "mana": 950000
      },
      {
        "seconds": 390600,
        "gold": 3250000,
        "wood": 3250000,
        "ore": 2435000,
        "mana": 1625000
      },
      {
        "seconds": 804600,
        "gold": 5280000,
        "wood": 5280000,
        "ore": 3955000,
        "mana": 2635000
      },
      {
        "seconds": 1632600,
        "gold": 8320000,
        "wood": 8320000,
        "ore": 6235000,
        "mana": 4155000
      },
      {
        "seconds": 3292200,
        "gold": 12880000,
        "wood": 12880000,
        "ore": 9655000,
        "mana": 6895000
      },
      {
        "seconds": 6611400,
        "gold": 19720000,
        "wood": 19720000,
        "ore": 14785000,
        "mana": 10995000
      },
      {
        "seconds": 13246200,
        "gold": 29970000,
        "wood": 29970000,
        "ore": 22485000,
        "mana": 17145000
      },
      {
        "seconds": 26515800,
        "gold": 45345000,
        "wood": 45345000,
        "ore": 34035000,
        "mana": 26370000
      }
    ],
    "251": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 25800,
        "gold": 400000,
        "wood": 400000,
        "ore": 300000,
        "mana": 200000
      },
      {
        "seconds": 77400,
        "gold": 1000000,
        "wood": 1000000,
        "ore": 750000,
        "mana": 500000
      },
      {
        "seconds": 181800,
        "gold": 1900000,
        "wood": 1900000,
        "ore": 1425000,
        "mana": 950000
      },
      {
        "seconds": 390600,
        "gold": 3250000,
        "wood": 3250000,
        "ore": 2435000,
        "mana": 1625000
      },
      {
        "seconds": 804600,
        "gold": 5280000,
        "wood": 5280000,
        "ore": 3955000,
        "mana": 2635000
      },
      {
        "seconds": 1632600,
        "gold": 8320000,
        "wood": 8320000,
        "ore": 6235000,
        "mana": 4155000
      },
      {
        "seconds": 3292200,
        "gold": 12880000,
        "wood": 12880000,
        "ore": 9655000,
        "mana": 6895000
      },
      {
        "seconds": 6611400,
        "gold": 19720000,
        "wood": 19720000,
        "ore": 14785000,
        "mana": 10995000
      },
      {
        "seconds": 13246200,
        "gold": 29970000,
        "wood": 29970000,
        "ore": 22485000,
        "mana": 17145000
      },
      {
        "seconds": 26515800,
        "gold": 45345000,
        "wood": 45345000,
        "ore": 34035000,
        "mana": 26370000
      }
    ],
    "252": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 25800,
        "gold": 400000,
        "wood": 400000,
        "ore": 300000,
        "mana": 200000
      },
      {
        "seconds": 77400,
        "gold": 1000000,
        "wood": 1000000,
        "ore": 750000,
        "mana": 500000
      },
      {
        "seconds": 181800,
        "gold": 1900000,
        "wood": 1900000,
        "ore": 1425000,
        "mana": 950000
      },
      {
        "seconds": 390600,
        "gold": 3250000,
        "wood": 3250000,
        "ore": 2435000,
        "mana": 1625000
      },
      {
        "seconds": 804600,
        "gold": 5280000,
        "wood": 5280000,
        "ore": 3955000,
        "mana": 2635000
      },
      {
        "seconds": 1632600,
        "gold": 8320000,
        "wood": 8320000,
        "ore": 6235000,
        "mana": 4155000
      },
      {
        "seconds": 3292200,
        "gold": 12880000,
        "wood": 12880000,
        "ore": 9655000,
        "mana": 6895000
      },
      {
        "seconds": 6611400,
        "gold": 19720000,
        "wood": 19720000,
        "ore": 14785000,
        "mana": 10995000
      },
      {
        "seconds": 13246200,
        "gold": 29970000,
        "wood": 29970000,
        "ore": 22485000,
        "mana": 17145000
      },
      {
        "seconds": 26515800,
        "gold": 45345000,
        "wood": 45345000,
        "ore": 34035000,
        "mana": 26370000
      }
    ],
    "253": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 25800,
        "gold": 400000,
        "wood": 400000,
        "ore": 300000,
        "mana": 200000
      },
      {
        "seconds": 77400,
        "gold": 1000000,
        "wood": 1000000,
        "ore": 750000,
        "mana": 500000
      },
      {
        "seconds": 181800,
        "gold": 1900000,
        "wood": 1900000,
        "ore": 1425000,
        "mana": 950000
      },
      {
        "seconds": 390600,
        "gold": 3250000,
        "wood": 3250000,
        "ore": 2435000,
        "mana": 1625000
      },
      {
        "seconds": 804600,
        "gold": 5280000,
        "wood": 5280000,
        "ore": 3955000,
        "mana": 2635000
      },
      {
        "seconds": 1632600,
        "gold": 8320000,
        "wood": 8320000,
        "ore": 6235000,
        "mana": 4155000
      },
      {
        "seconds": 3292200,
        "gold": 12880000,
        "wood": 12880000,
        "ore": 9655000,
        "mana": 6895000
      },
      {
        "seconds": 6611400,
        "gold": 19720000,
        "wood": 19720000,
        "ore": 14785000,
        "mana": 10995000
      },
      {
        "seconds": 13246200,
        "gold": 29970000,
        "wood": 29970000,
        "ore": 22485000,
        "mana": 17145000
      },
      {
        "seconds": 26515800,
        "gold": 45345000,
        "wood": 45345000,
        "ore": 34035000,
        "mana": 26370000
      }
    ],
    "254": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 7200000,
        "gold": 10000000,
        "wood": 10000000,
        "ore": 7500000,
        "mana": 10000000
      }
    ],
    "255": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 7200000,
        "gold": 10000000,
        "wood": 10000000,
        "ore": 7500000,
        "mana": 10000000
      }
    ],
    "256": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 7200000,
        "gold": 10000000,
        "wood": 10000000,
        "ore": 7500000,
        "mana": 10000000
      }
    ],
    "257": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 7200000,
        "gold": 10000000,
        "wood": 10000000,
        "ore": 7500000,
        "mana": 10000000
      }
    ],
    "258": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 7200000,
        "gold": 10000000,
        "wood": 10000000,
        "ore": 7500000,
        "mana": 10000000
      }
    ],
    "259": [
      {
        "seconds": 0,
        "gold": 0,
        "wood": 0,
        "ore": 0,
        "mana": 0
      },
      {
        "seconds": 14400,
        "gold": 200000,
        "wood": 200000,
        "ore": 150000,
        "mana": 100000
      },
      {
        "seconds": 43200,
        "gold": 500000,
        "wood": 500000,
        "ore": 375000,
        "mana": 250000
      },
      {
        "seconds": 100800,
        "gold": 950000,
        "wood": 950000,
        "ore": 712500,
        "mana": 520000
      },
      {
        "seconds": 216000,
        "gold": 1625000,
        "wood": 1625000,
        "ore": 1219000,
        "mana": 925000
      },
      {
        "seconds": 446400,
        "gold": 2638000,
        "wood": 2638000,
        "ore": 1979000,
        "mana": 1533000
      },
      {
        "seconds": 907200,
        "gold": 4158000,
        "wood": 4158000,
        "ore": 3119000,
        "mana": 2445000
      },
      {
        "seconds": 1828800,
        "gold": 6438000,
        "wood": 6438000,
        "ore": 4829000,
        "mana": 3813000
      },
      {
        "seconds": 3672000,
        "gold": 9858000,
        "wood": 9858000,
        "ore": 7394000,
        "mana": 5865000
      },
      {
        "seconds": 7358400,
        "gold": 14988000,
        "wood": 14988000,
        "ore": 11241500,
        "mana": 8943000
      },
      {
        "seconds": 14731200,
        "gold": 22683000,
        "wood": 22683000,
        "ore": 17013000,
        "mana": 13560000
      }
    ]
  }
} as const;
