export type MigrationField = { key: string; label: string; type: string; required: boolean; options: string[]; section: string };
// Adapted from the user-provided 881 application form, retrieved 2026-09-06.
export const migrationFields: MigrationField[] = [
  {
    "key": "ign",
    "label": "In-game name",
    "type": "text",
    "required": true,
    "options": [],
    "section": "Player"
  },
  {
    "key": "playerId",
    "label": "Player / Lord ID",
    "type": "text",
    "required": true,
    "options": [],
    "section": "Player"
  },
  {
    "key": "loginDays",
    "label": "Consecutive login days",
    "type": "number",
    "required": true,
    "options": [],
    "section": "Activity & Communication"
  },
  {
    "key": "power",
    "label": "Historical highest power",
    "type": "number",
    "required": true,
    "options": [],
    "section": "Account & Troops"
  },
  {
    "key": "server",
    "label": "Current server",
    "type": "number",
    "required": true,
    "options": [],
    "section": "Player"
  },
  {
    "key": "troops",
    "label": "Main troop types (full 300,000 legions)",
    "type": "multi",
    "required": true,
    "options": [
      "Infantry",
      "Cavalry",
      "Archers",
      "Mages"
    ],
    "section": "Account & Troops"
  },
  {
    "key": "hours",
    "label": "Active hours on weekdays (UTC)",
    "type": "multi",
    "required": true,
    "options": [
      "00.00 UTC",
      "01.00 UTC",
      "02.00 UTC",
      "03.00 UTC",
      "04.00 UTC",
      "05.00 UTC",
      "06.00 UTC",
      "07.00 UTC",
      "08.00 UTC",
      "09.00 UTC",
      "10.00 UTC",
      "11.00 UTC",
      "12.00 UTC",
      "13.00 UTC",
      "14.00 UTC",
      "15.00 UTC",
      "16.00 UTC",
      "17.00 UTC",
      "18.00 UTC",
      "19.00 UTC",
      "20.00 UTC",
      "21.00 UTC",
      "22.00 UTC",
      "23.00 UTC"
    ],
    "section": "Activity & Communication"
  },
  {
    "key": "eventTimes",
    "label": "Preferred weekend battle times (UTC)",
    "type": "multi",
    "required": true,
    "options": [
      "Saturday 15.00 UTC",
      "Sunday 20.00 UTC"
    ],
    "section": "Activity & Communication"
  },
  {
    "key": "discord",
    "label": "Discord name (or None)",
    "type": "text",
    "required": true,
    "options": [],
    "section": "Player"
  },
  {
    "key": "languages",
    "label": "Fluent languages",
    "type": "text",
    "required": true,
    "options": [],
    "section": "Activity & Communication"
  },
  {
    "key": "voice",
    "label": "Voice chat during critical fights",
    "type": "single",
    "required": true,
    "options": [
      "Yes",
      "No",
      "I can only listen"
    ],
    "section": "Activity & Communication"
  },
  {
    "key": "farms",
    "label": "Farm accounts: how many and strongest power",
    "type": "textarea",
    "required": true,
    "options": [],
    "section": "Account Support"
  },
  {
    "key": "resources",
    "label": "Total resources gathered",
    "type": "number",
    "required": true,
    "options": [],
    "section": "Account Support"
  },
  {
    "key": "mana",
    "label": "Total mana gathered",
    "type": "number",
    "required": true,
    "options": [],
    "section": "Account Support"
  },
  {
    "key": "roles",
    "label": "Preferred role",
    "type": "multi",
    "required": true,
    "options": [
      "Rally leader/Garrison Captain",
      "Open Field DPS",
      "Supporter/ Multiplier farm builder"
    ],
    "section": "Account & Troops"
  },
  {
    "key": "heroes",
    "label": "Awakened legendary heroes",
    "type": "multi",
    "required": false,
    "options": [
      "Bakshi",
      "Emrys",
      "Forondil",
      "Freya",
      "Leih-Shan Yen",
      "Nëya",
      "Theodore",
      "Tobin",
      "Urag",
      "Danfel",
      "Ellanir",
      "Garwood",
      "Goreshh",
      "Joren",
      "Kuma",
      "Lei Kuan",
      "Madeleine",
      "Mogro",
      "Nika",
      "Skogul",
      "Bertrand",
      "Gromora",
      "Liliya",
      "Thaleia",
      "Thundelyn",
      "Thoar",
      "Vardun",
      "Velyn",
      "Yun-Ming",
      "Falgrim",
      "Ffraegar",
      "Kaelan",
      "Kinnara",
      "Kolk",
      "Maggrat",
      "Mylra",
      "Nico",
      "Ruby",
      "Sibyl",
      "Syndrion",
      "Zayda",
      "Bahorn",
      "Hosk",
      "Indis",
      "Mu Hsiang",
      "Seluna",
      "Theia"
    ],
    "section": "Account & Troops"
  },
  {
    "key": "artifacts",
    "label": "Level 5 legendary artifacts",
    "type": "multi",
    "required": false,
    "options": [
      "Breath of Jargentis",
      "Breath of the forest",
      "Deathless Vines",
      "Doom Bracers",
      "Dragon’s Fate",
      "Dragonscale Armor",
      "Forgotten Shield",
      "Glided Crossbow",
      "Goldcrest",
      "Greymar’s Warhammer",
      "Heart of Kamasi",
      "Infernal Flame",
      "Iron Tusk",
      "Lunaris",
      "Mirage Orb",
      "Oath of Stormpeak",
      "Phoenix Eye",
      "Rattle-Spear",
      "Roaring Rage",
      "Serpent’s Edge",
      "Shadowblades",
      "Shield of Sturdiness",
      "Spiritbone Torc",
      "Springbird Feather",
      "Spingblades",
      "Staff of Prophet",
      "Storm Arrow",
      "Tear of Arbon",
      "Viola’s Bow",
      "Visage of Sanctus",
      "Winter Edge",
      "Wolf howl Horn",
      "Wolf-Woman of Haelor"
    ],
    "section": "Account & Troops"
  },
  {
    "key": "kills",
    "label": "Units killed",
    "type": "number",
    "required": true,
    "options": [],
    "section": "Fight Score"
  },
  {
    "key": "deaths",
    "label": "Units dead",
    "type": "number",
    "required": true,
    "options": [],
    "section": "Fight Score"
  },
  {
    "key": "healed",
    "label": "Units healed",
    "type": "number",
    "required": true,
    "options": [],
    "section": "Fight Score"
  },
  {
    "key": "legionAttack",
    "label": "Legion ATK decoration (%)",
    "type": "number",
    "required": true,
    "options": [],
    "section": "Fight Score"
  },
  {
    "key": "adaptability",
    "label": "Willing to adapt to alliance plans",
    "type": "single",
    "required": true,
    "options": [
      "Depends - please explain….",
      "Yes",
      "No"
    ],
    "section": "Account Support"
  },
  {
    "key": "devices",
    "label": "Devices",
    "type": "multi",
    "required": true,
    "options": [
      "PC",
      "Mobile",
      "Ipad"
    ],
    "section": "Activity & Communication"
  },
  {
    "key": "groupMigration",
    "label": "Migrating with a group?",
    "type": "single",
    "required": true,
    "options": [
      "Yes",
      "No"
    ],
    "section": "Player"
  },
  {
    "key": "groupName",
    "label": "Group name",
    "type": "text",
    "required": false,
    "options": [],
    "section": "Player"
  },
  {
    "key": "extra",
    "label": "Anything else about you or your group?",
    "type": "textarea",
    "required": false,
    "options": [],
    "section": "Extra Info"
  },
  {
    "key": "otherDetails",
    "label": "Other role or adaptability details",
    "type": "textarea",
    "required": false,
    "options": [],
    "section": "Extra Info"
  }
];
