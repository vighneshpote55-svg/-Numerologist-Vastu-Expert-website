export interface MahavastuZoneDetail {
  code: string;
  name: string;
  degreeSpan: string;
  cardinalGroup: 'North' | 'East' | 'South' | 'West';
  element: 'Water (Jal)' | 'Air/Wood (Vayu)' | 'Fire (Agni)' | 'Earth (Prithvi)' | 'Space (Akash)';
  attribute: string;
  bestUse: string;
  avoidUse: string;
  remedy: string;
  deityArchetype: string;
}

export const MAHAVASTU_16_ZONES: MahavastuZoneDetail[] = [
  {
    code: 'N',
    name: 'North (Uttara)',
    degreeSpan: '348.75° – 11.25°',
    cardinalGroup: 'North',
    element: 'Water (Jal)',
    attribute: 'New Opportunities, Wealth Inflow & Career Growth',
    bestUse: 'Main entrance, treasury/cash chest, sales & client intake desk',
    avoidUse: 'Kitchen stove, red colors, overhead clutter, heavy storage',
    remedy: 'Incorporate flowing water fountains, blue/green tones, or copper/brass balancing plates.',
    deityArchetype: 'Lord Kuber (Keeper of Celestial Wealth)'
  },
  {
    code: 'NNE',
    name: 'North-North-East',
    degreeSpan: '11.25° – 33.75°',
    cardinalGroup: 'North',
    element: 'Water (Jal)',
    attribute: 'Health, Immunity & Vital Recuperation',
    bestUse: 'Medicine cabinet, restful healing room, pure drinking water storage',
    avoidUse: 'Toilet / septic tank, heavy junk, deep red machinery',
    remedy: 'Place Dhanvantari brass symbol, keep thoroughly illuminated with warm white lighting.',
    deityArchetype: 'Bhujag / Dhanvantari (Celestial Physician)'
  },
  {
    code: 'NE',
    name: 'North-East (Ishanya)',
    degreeSpan: '33.75° – 56.25°',
    cardinalGroup: 'North',
    element: 'Water (Jal)',
    attribute: 'Visionary Clarity, Intuition & Spiritual Serenity',
    bestUse: 'Pooja room, meditation corner, philosophical study, architectural ideation',
    avoidUse: 'Kitchen burner, bathroom, overhead water tank, heavy load-bearing pillars',
    remedy: 'Light crystal quartz bowl, sacred water vessel; keep the sector lowest and lightest.',
    deityArchetype: 'Lord Shiva / Ishanya (Seat of Pure Consciousness)'
  },
  {
    code: 'ENE',
    name: 'East-North-East',
    degreeSpan: '56.25° – 78.75°',
    cardinalGroup: 'East',
    element: 'Air/Wood (Vayu)',
    attribute: 'Recreation, Happiness, Refreshment & Joy',
    bestUse: 'Family lounge, musical instruments, creative art display, hobby sanctuary',
    avoidUse: 'Shoe racks, storage junk, dark shuttered walls',
    remedy: 'Fresh potted green indoor plants, open windows welcoming soft early morning sun.',
    deityArchetype: 'Jayant (Lord of Victory & Celebration)'
  },
  {
    code: 'E',
    name: 'East (Purva)',
    degreeSpan: '78.75° – 101.25°',
    cardinalGroup: 'East',
    element: 'Air/Wood (Vayu)',
    attribute: 'Social Connectivity, Association & Public Influence',
    bestUse: 'Living room, public reception, meeting area, wide open balconies',
    avoidUse: 'Septic tanks, heavy dark storage, toilets',
    remedy: 'Framed rising sun symbol, green wooden decor elements, natural light enhancement.',
    deityArchetype: 'Lord Indra & Surya (Supreme Radiance & Influence)'
  },
  {
    code: 'ESE',
    name: 'East-South-East',
    degreeSpan: '101.25° – 123.75°',
    cardinalGroup: 'East',
    element: 'Air/Wood (Vayu)',
    attribute: 'Analytical Thought, Churning & Strategic Foresight',
    bestUse: 'Reading area, deliberation desk, washing machine (churning activity)',
    avoidUse: 'Master bedroom (causes overthinking & restlessness), pooja sanctuary',
    remedy: 'Keep pastel green or cream accents; avoid sleeping with head directly here.',
    deityArchetype: 'Parjanya (Churner of Clouds & Ideation)'
  },
  {
    code: 'SE',
    name: 'South-East (Agneya)',
    degreeSpan: '123.75° – 146.25°',
    cardinalGroup: 'South',
    element: 'Fire (Agni)',
    attribute: 'Cash Liquidity, Digestion, Vital Spark & Zeal',
    bestUse: 'Kitchen cooking hob, electrical panel board, inverter battery systems',
    avoidUse: 'Underground water sumps, master bedroom, blue/black interior colors',
    remedy: 'If blue tiles or water exist, neutralize with green marble underneath the stove and copper strips.',
    deityArchetype: 'Lord Agni (Sacred Fire of Metabolic Action)'
  },
  {
    code: 'SSE',
    name: 'South-South-East',
    degreeSpan: '146.25° – 168.75°',
    cardinalGroup: 'South',
    element: 'Fire (Agni)',
    attribute: 'Physical Strength, Confidence & Indomitable Courage',
    bestUse: 'Fitness gym, martial arts/yoga area, executive workout studio',
    avoidUse: 'Toilets, water storage tanks, clutter',
    remedy: 'Red jasper crystals, warm mustard or terracotta accents.',
    deityArchetype: 'Gandharva (Celestial Strength & Resolve)'
  },
  {
    code: 'S',
    name: 'South (Dakshina)',
    degreeSpan: '168.75° – 191.25°',
    cardinalGroup: 'South',
    element: 'Fire (Agni)',
    attribute: 'Fame, Public Recognition, Deep Relaxation & Sleep',
    bestUse: 'Quiet bedroom, brand showcase awards, boardroom executive desk',
    avoidUse: 'Water bodies, main entrances facing S3/S4 without proper threshold remedies',
    remedy: 'Warm earth colors, heavy wood furnishings, framed certifications and credentials.',
    deityArchetype: 'Lord Yama (Lord of Dharma & Deep Restful Order)'
  },
  {
    code: 'SSW',
    name: 'South-South-West',
    degreeSpan: '191.25° – 213.75°',
    cardinalGroup: 'South',
    element: 'Earth (Prithvi)',
    attribute: 'Disposal, Release & Detoxification of Waste',
    bestUse: 'Toilet, trash disposal, bio-waste exit, drain pipes',
    avoidUse: 'Bedrooms (causes energy drain), cash locker, worship shrine, study desk',
    remedy: 'Brass energy strips along threshold if a bedroom inadvertently overlaps this sector.',
    deityArchetype: 'Mriga (Detoxification & Cleansing)'
  },
  {
    code: 'SW',
    name: 'South-West (Nairutya)',
    degreeSpan: '213.75° – 236.25°',
    cardinalGroup: 'West',
    element: 'Earth (Prithvi)',
    attribute: 'Mastery of Skills, Family Stability & Grounded Authority',
    bestUse: 'Master bedroom of patriarch/director, safe for heavy gold/deeds, heavy storage',
    avoidUse: 'Main entrance, borewell, underground water tank, cuts or extended balconies',
    remedy: 'Deploy lead strips, brass pyramid energy stabilizers, heavy yellow sandstone.',
    deityArchetype: 'Nirriti / Pitras (Ancestral Grounding & Mastery)'
  },
  {
    code: 'WSW',
    name: 'West-South-West',
    degreeSpan: '236.25° – 258.75°',
    cardinalGroup: 'West',
    element: 'Space (Akash)',
    attribute: 'Knowledge, Studies, Skill Retention & Long-term Savings',
    bestUse: 'Children study table, library, investment portfolio files, fixed deposit records',
    avoidUse: 'Toilets, open clutter, garbage bins',
    remedy: 'Place globe, books, brass pen stand, and yellow or white study lamps.',
    deityArchetype: 'Dauwarik (Guardian of Wisdom & Wealth Retention)'
  },
  {
    code: 'W',
    name: 'West (Pashchima)',
    degreeSpan: '258.75° – 281.25°',
    cardinalGroup: 'West',
    element: 'Space (Akash)',
    attribute: 'Realization of Profits, Commercial Gains & Harvest',
    bestUse: 'Dining room, sales closure cabin, accounts department, profit safe',
    avoidUse: 'Borewells, green or red wall colors',
    remedy: 'White, grey, silver and metallic finishes, round wall clocks, copper/iron balancers.',
    deityArchetype: 'Lord Varuna (Lord of Cosmic Law & Oceanic Harvest)'
  },
  {
    code: 'WNW',
    name: 'West-North-West',
    degreeSpan: '281.25° – 303.75°',
    cardinalGroup: 'West',
    element: 'Space (Akash)',
    attribute: 'Release of Past Emotional Baggage & Mental Detox',
    bestUse: 'Sanitary room, laundry, guest waiting lounge',
    avoidUse: 'Master bedroom, study table, cash locker',
    remedy: 'Keep uncluttered; clean white light and neutral finishes.',
    deityArchetype: 'Roga (Reliever of Old Grief)'
  },
  {
    code: 'NW',
    name: 'North-West (Vayavya)',
    degreeSpan: '303.75° – 326.25°',
    cardinalGroup: 'West',
    element: 'Air/Wood (Vayu)',
    attribute: 'Support from Banks, Mentors, Government & Reliable Alliances',
    bestUse: 'Guest bedroom, dispatch goods store, banking documentation, finished inventory',
    avoidUse: 'Master bedroom, underground water sumps, fire stoves',
    remedy: 'Brass bells, silver-plated metallic artifacts, white and pearl color palette.',
    deityArchetype: 'Lord Vayu (Keeper of Movement, Prana & Aid)'
  },
  {
    code: 'NNW',
    name: 'North-North-West',
    degreeSpan: '326.25° – 348.75°',
    cardinalGroup: 'North',
    element: 'Water (Jal)',
    attribute: 'Attraction, Charisma, Marital Harmony & Relationships',
    bestUse: 'Bedroom for newlyweds, beauty/grooming area, artistic display',
    avoidUse: 'Toilets, heavy industrial machinery, dark storage junk',
    remedy: 'Aromatic diffusers (rose/lavender), soft lighting, pairs of decorative artifacts.',
    deityArchetype: 'Soma (Nectar of Grace, Magnetism & Delight)'
  }
];
