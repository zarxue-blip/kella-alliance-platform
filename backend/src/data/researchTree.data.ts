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
        "101"
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
        "101"
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
        "102"
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
        "102",
        "103"
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
        "103"
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
        "108"
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
        "105"
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
        "108"
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
        "110"
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
        "108"
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
        "110"
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
        "110"
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
        "114"
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
        "111",
        "112"
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
        "114"
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
        "113"
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
        "115"
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
        "119"
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
        "114"
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
        "119"
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
        "118"
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
        "120"
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
        "124"
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
        "119"
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
        "124"
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
        "123"
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
        "124"
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
        "125"
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
        "130"
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
        "127"
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
        "130"
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
        "129"
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
        "131"
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
        "130"
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
        "134"
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
        "134"
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
        "134"
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
        "134"
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
        "135"
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
        "136"
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
        "137"
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
        "138"
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
        "139",
        "140",
        "141",
        "142"
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
        "143",
        "127",
        "132",
        "133"
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
        "201"
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
        "201"
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
        "201"
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
        "201"
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
        "202"
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
        "203"
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
        "204"
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
        "205"
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
        "206",
        "207",
        "208",
        "209"
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
        "210"
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
        "210"
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
        "210"
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
        "210"
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
        "211",
        "212",
        "213",
        "214"
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
        "215"
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
        "215"
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
        "216"
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
        "217"
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
        "218"
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
        "218"
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
        "219"
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
        "219"
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
        "225"
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
        "220",
        "221",
        "222",
        "223"
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
        "225"
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
        "225"
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
        "225"
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
        "225"
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
        "225"
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
        "227",
        "228",
        "229",
        "230"
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
        "232"
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
        "232"
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
        "232"
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
        "235"
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
        "237"
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
        "237"
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
        "237"
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
        "237"
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
        "238",
        "239",
        "240",
        "241"
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
        "244"
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
        "242"
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
        "244"
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
        "244"
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
        "244"
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
        "244"
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
        "244"
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
        "246"
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
        "247"
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
        "248"
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
        "249"
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
        "246",
        "250"
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
        "247",
        "251"
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
        "248",
        "252"
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
        "249",
        "253"
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
        "254",
        "255",
        "256",
        "257"
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
        "258"
      ],
      "quality": "t5"
    }
  ]
} as const;

type LordResearchCost = { seconds: number; gold: number; wood: number; ore: number; mana: number; power: number };

// Static snapshot of the full Military tree. The dashboard never calls an external calculator API.
const lordMilitaryResearchCostRows = [
  ["201", 894, 5000, 5000, 0, 0, 56],
  ["202", 20100.8, 56000, 56000, 33000, 0, 1125],
  ["203", 20100.8, 56000, 56000, 33000, 0, 1125],
  ["204", 20100.8, 56000, 56000, 33000, 0, 1125],
  ["205", 20100.8, 56000, 56000, 33000, 0, 1125],
  ["206", 20100.8, 56000, 56000, 33000, 0, 1125],
  ["207", 20100.8, 56000, 56000, 33000, 0, 1125],
  ["208", 20100.8, 56000, 56000, 33000, 0, 1125],
  ["209", 20100.8, 66500, 56000, 40000, 0, 1167],
  ["210", 13380.7, 105500, 105500, 79500, 0, 1194],
  ["211", 28799.7, 120000, 120000, 90000, 0, 1902],
  ["212", 28799.7, 120000, 120000, 90000, 0, 1902],
  ["213", 28799.7, 120000, 120000, 90000, 0, 1902],
  ["214", 28799.7, 120000, 120000, 90000, 0, 1902],
  ["215", 307499.4, 906500, 906500, 680500, 230500, 19117],
  ["216", 460800.3, 906500, 906500, 680500, 230500, 25249],
  ["217", 460800.3, 906500, 906500, 680500, 230500, 25249],
  ["218", 613499.4, 906500, 906500, 680500, 555500, 32983],
  ["219", 613499.4, 906500, 906500, 680500, 555500, 32983],
  ["220", 21600.2, 200000, 200000, 150000, 100000, 2614],
  ["221", 21600.2, 200000, 200000, 150000, 100000, 2614],
  ["222", 21600.2, 200000, 200000, 150000, 100000, 2614],
  ["223", 21600.2, 200000, 200000, 150000, 100000, 2614],
  ["224", 921000.5, 906500, 906500, 680500, 680500, 45910],
  ["225", 560700.8, 1360000, 1360000, 1020500, 1020500, 36032],
  ["226", 921000.5, 906500, 906500, 680500, 680500, 45910],
  ["227", 216000.3, 900000, 900000, 675000, 1250000, 20515],
  ["228", 216000.3, 900000, 900000, 675000, 1250000, 20515],
  ["229", 216000.3, 900000, 900000, 675000, 1250000, 20515],
  ["230", 216000.3, 900000, 900000, 675000, 1250000, 20515],
  ["232", 1116000.7, 2640000, 2640000, 1980500, 1534000, 68810],
  ["234", 29372399.4, 22683000, 22683000, 17013000, 13560000, 1384465],
  ["235", 29372399.4, 28365000, 28365000, 21346500, 16956500, 1437177],
  ["236", 29372399.4, 22683000, 22683000, 17013000, 13560000, 1384465],
  ["237", 4032000.5, 22683000, 22683000, 17013000, 13560000, 370849],
  ["238", 2159999.6, 5000000, 5000000, 3750000, 5000000, 142650],
  ["239", 2159999.6, 5000000, 5000000, 3750000, 5000000, 142650],
  ["240", 2159999.6, 5000000, 5000000, 3750000, 5000000, 142650],
  ["241", 2159999.6, 5000000, 5000000, 3750000, 5000000, 142650],
  ["242", 2159999.6, 5000000, 5000000, 3750000, 5000000, 142650],
  ["243", 39648000.1, 68017500, 68017500, 51014000, 34009000, 2181075],
  ["244", 39648000.1, 68017500, 68017500, 51014000, 34009000, 2181075],
  ["245", 39648000.1, 68017500, 68017500, 51014000, 34009000, 2181075],
  ["246", 18283200.8, 45345000, 45345000, 34035000, 26370000, 1146663],
  ["247", 18283200.8, 45345000, 45345000, 34035000, 26370000, 1146663],
  ["248", 18283200.8, 45345000, 45345000, 34035000, 26370000, 1146663],
  ["249", 18283200.8, 45345000, 45345000, 34035000, 26370000, 1146663],
  ["250", 26515799.3, 45345000, 45345000, 34035000, 26370000, 1475967],
  ["251", 26515799.3, 45345000, 45345000, 34035000, 26370000, 1475967],
  ["252", 26515799.3, 45345000, 45345000, 34035000, 26370000, 1475967],
  ["253", 26515799.3, 45345000, 45345000, 34035000, 26370000, 1475967],
  ["254", 7199999.8, 10000000, 10000000, 7500000, 10000000, 400500],
  ["255", 7199999.8, 10000000, 10000000, 7500000, 10000000, 400500],
  ["256", 7199999.8, 10000000, 10000000, 7500000, 10000000, 400500],
  ["257", 7199999.8, 10000000, 10000000, 7500000, 10000000, 400500],
  ["258", 7199999.8, 10000000, 10000000, 7500000, 10000000, 400500],
  ["259", 14731200.4, 22683000, 22683000, 17013000, 13560000, 798817],
] as const;

export const lordMilitaryResearchCosts = Object.fromEntries(
  lordMilitaryResearchCostRows.map(([id, seconds, gold, wood, ore, mana, power]) => [
    id,
    { seconds, gold, wood, ore, mana, power },
  ]),
) as Record<string, LordResearchCost>;
