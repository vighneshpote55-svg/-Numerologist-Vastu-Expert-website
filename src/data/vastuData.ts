import { VastuZone } from '../types';

export const VASTU_ZONES: VastuZone[] = [
  {
    id: 'north',
    direction: 'North',
    code: 'N',
    degrees: '348.75° – 11.25°',
    rulingDeity: 'Lord Kuber (Keeper of Celestial Wealth)',
    element: 'Water (Jal Tattva)',
    nature: 'Inflow of Opportunities & Liquidity',
    bestFor: ['Treasury / Cash locker', 'Main entrance', 'Living room', 'Executive desk facing North'],
    avoidFor: ['Kitchen / Fire stove', 'Heavy overhead water tanks', 'Clutter or storage junk', 'Master bedroom'],
    practicalRemedy:
      'Keep this sector lightweight and open. Incorporating clear water elements, mirrors, or soft blue/green accents fosters open energetic movement without structural demolition.',
    description:
      'Traditionally recognized as the primary portal for wealth, new clients, and professional growth opportunities. A balanced North invites continuous vitality and economic momentum.'
  },
  {
    id: 'northeast',
    direction: 'North-East',
    code: 'NE',
    degrees: '33.75° – 56.25°',
    rulingDeity: 'Lord Shiva / Ishanya (Seat of Pure Consciousness)',
    element: 'Water & Ether (Amrut Sthan)',
    nature: 'Mental Clarity, Wisdom & Spiritual Harmony',
    bestFor: ['Pooja room / Meditation sanctuary', 'Reading / Study room', 'Light living space', 'Underground water sump'],
    avoidFor: ['Toilets / Septic tanks', 'Kitchen / Fire elements', 'Heavy pillars or high boundary walls', 'Dark clutter'],
    practicalRemedy:
      'Ensure maximum natural light and cleanliness. Diffused morning sunlight and subtle copper pyramid energy balancers can be deployed when structural alterations are impossible.',
    description:
      'Known as Ishanya, the sacred quadrant of intuition, visionary clarity, and peaceful mindfulness. It governs the neurological calmness and strategic discernment of home and business owners.'
  },
  {
    id: 'east',
    direction: 'East',
    code: 'E',
    degrees: '78.75° – 101.25°',
    rulingDeity: 'Lord Indra & Lord Surya (Source of Light & Radiance)',
    element: 'Air / Wood (Vayu Tattva)',
    nature: 'Social Connectivity, Public Recognition & Health',
    bestFor: ['Main entrance', 'Wide windows & balconies', 'Family gathering halls', 'Health & wellness zones'],
    avoidFor: ['Heavy storage lockers', 'Blockages preventing morning sunlight', 'Septic tanks', 'Garbage bins'],
    practicalRemedy:
      'Emphasize fresh greenery, indoor bamboo or ficus plants, and wide, dust-free glass apertures to welcome natural prana and expansive social connections.',
    description:
      'Governs how you connect with the outside world, your public reputation, and social goodwill. An open, luminous East aligns occupants with influential mentors and cooperative networks.'
  },
  {
    id: 'southeast',
    direction: 'South-East',
    code: 'SE',
    degrees: '123.75° – 146.25°',
    rulingDeity: 'Lord Agni (The Cosmic Fire of Transformation)',
    element: 'Fire (Agni Tattva)',
    nature: 'Cashflow, Daily Vitality, Digestion & Drive',
    bestFor: ['Kitchen / Cooking hob', 'Electrical meter / Inverter panels', 'Boilers & heating equipment'],
    avoidFor: ['Bedrooms for elderly', 'Underground water sumps', 'Boring/pumps with cold standing water'],
    practicalRemedy:
      'If a kitchen is misplaced in the North or NE, use green marble slabs under gas hobs, copper strips, and warm amber lighting to pacify elemental discord cleanly.',
    description:
      'The zone of physical vitality, liquid cash recovery, and metabolic strength. When honored, Agni ensures that financial gains are retained and projects culminate into tangible profit.'
  },
  {
    id: 'south',
    direction: 'South',
    code: 'S',
    degrees: '168.75° – 191.25°',
    rulingDeity: 'Lord Yama (Order, Duty & Righteous Rest)',
    element: 'Earth & Fire (Prithvi / Agni transition)',
    nature: 'Fame, Relaxation, Rest & Legal Stability',
    bestFor: ['Bedrooms for deep recuperative sleep', 'Conference rooms', 'Medium-weight storage units'],
    avoidFor: ['Underground water storage', 'Main doors without proper directional rectification', 'Open courtyards'],
    practicalRemedy:
      'Place solid wood furniture and warm earth tones (terracotta, beige, deep maroon) to promote deep, uninterrupted sleep and social stability.',
    description:
      'Associated with relaxation, peace of mind, and the sustained reputation of the household or brand. A grounded South provides the restorative stillness required for high-stakes leadership.'
  },
  {
    id: 'southwest',
    direction: 'South-West',
    code: 'SW',
    degrees: '213.75° – 236.25°',
    rulingDeity: 'Nairutya (The Pillar of Grounded Stability)',
    element: 'Earth (Prithvi Tattva)',
    nature: 'Mastery, Decision-Making Authority & Family Bonds',
    bestFor: ['Master bedroom (Karta / Patriarch / Matriarch)', 'CEO / Managing Director cabin', 'Heaviest structural weight'],
    avoidFor: ['Toilets', 'Water sumps', 'Main entrance', 'Childrens play rooms (creates restless distraction)'],
    practicalRemedy:
      'Keep this sector elevated and heavy. Introduce brass elemental strips, lead anchors, and heavy solid wood wardrobes to anchor patriarchal stability and long-term marital trust.',
    description:
      'The anchor of the entire premises. Nairutya holds your relationships together, fortifies decision-making authority, and protects the accumulated legacy of the family or enterprise.'
  },
  {
    id: 'west',
    direction: 'West',
    code: 'W',
    degrees: '258.75° – 281.25°',
    rulingDeity: 'Lord Varuna (Governor of Oceans & Fruitful Harvest)',
    element: 'Space / Metal (Akash Tattva)',
    nature: 'Profits, Harvest of Efforts & Sustained Gains',
    bestFor: ['Dining room', 'Childrens study / bedroom', 'Overhead water tank on terrace', 'Sales team workstations'],
    avoidFor: ['Main entrance opening inward into narrow spaces', 'Underground sumps', 'Damp storage'],
    practicalRemedy:
      'Incorporate circular geometric symbols, metallic finishes (white, grey, silver), and overhead weight to ensure investments and sweat equity convert into profitable harvest.',
    description:
      'Governs the fruition of your labors and the realization of commercial profits. A properly fortified West ensures that hard work is recognized and fairly compensated in the marketplace.'
  },
  {
    id: 'northwest',
    direction: 'North-West',
    code: 'NW',
    degrees: '303.75° – 326.25°',
    rulingDeity: 'Lord Vayu (The Wind God of Support & Mobility)',
    element: 'Air (Vayu Tattva)',
    nature: 'Support Systems, Banking, Friends & Timely Dispatch',
    bestFor: ['Guest bedroom', 'Finished goods warehouse / dispatch', 'Daughter / unmarried sister room', 'Staff room'],
    avoidFor: ['Master bedroom (can create restless wanderlust)', 'Heavy immovable machinery that must stay permanent'],
    practicalRemedy:
      'Light metal bells, white/cream curtains that catch breezes, and clean circulation enhance positive social goodwill, bank loan approvals, and reliable vendor partnerships.',
    description:
      'The sector of assistance, external funding, and swift mobility. When Vayu is balanced, you experience timely help from financial institutions, reliable staff, and cooperative partners.'
  }
];
