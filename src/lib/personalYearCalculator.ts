/**
 * Personal Year Cycle (1 to 9) and 9-Year Epicycle calculations
 * based on authentic Vedic and Pythagorean numerological timing.
 */

export interface PersonalYearDetail {
  year: number;
  personalYearNumber: number;
  theme: string;
  governingPlanet: string;
  energyQuality: 'Initiation & Action' | 'Receptivity & Patience' | 'Expansion & Expression' | 'Structure & Hard Work' | 'Dynamic Shift & Travel' | 'Family & Responsibility' | 'Introspection & Spiritual Study' | 'Material Harvest & Power' | 'Culmination & Release';
  opportunities: string[];
  precautions: string[];
  strategicAdvice: string;
}

export const PERSONAL_YEAR_DATA: Record<number, Omit<PersonalYearDetail, 'year' | 'personalYearNumber'>> = {
  1: {
    theme: 'New Beginnings, Seeds & Individual Drive',
    governingPlanet: 'Sun (Surya)',
    energyQuality: 'Initiation & Action',
    opportunities: [
      'Planting long-term seeds for commercial ventures or career leaps',
      'Establishing leadership roles and claiming personal sovereignty',
      'High vitality, physical energy, and creative independence'
    ],
    precautions: [
      'Avoid impulsiveness, stubbornness, or steamrolling partners',
      'Do not rely on past momentum; this year requires active effort'
    ],
    strategicAdvice: 'Take the initiative. Whatever you plant with dedication this year defines your entire 9-year trajectory.'
  },
  2: {
    theme: 'Cooperation, Tact, Balance & Incubation',
    governingPlanet: 'Moon (Chandra)',
    energyQuality: 'Receptivity & Patience',
    opportunities: [
      'Forming strategic alliances, key partnerships, and deep relationship bonds',
      'Diplomacy, mediation, and resolving longstanding disputes',
      'Heightened intuitive perceptiveness and emotional attunement'
    ],
    precautions: [
      'Do not force sudden aggressive moves; allow ideas to gestate quietly',
      'Watch for emotional oversensitivity or indecision'
    ],
    strategicAdvice: 'Exercise patience. Nurture the seeds planted in Year 1 from behind the scenes with trusted allies.'
  },
  3: {
    theme: 'Creative Expression, Social Expansion & Optimism',
    governingPlanet: 'Jupiter (Guru)',
    energyQuality: 'Expansion & Expression',
    opportunities: [
      'Public speaking, marketing, creative writing, and artistic debut',
      'Broadening social circles, networking, and joyful celebrations',
      'Spontaneous financial opportunities through creative problem-solving'
    ],
    precautions: [
      'Avoid scattering mental focus or over-promising on deliverables',
      'Monitor lavish or undisciplined expenditures'
    ],
    strategicAdvice: 'Express yourself boldly. Connect, communicate, and let your natural charisma attract support.'
  },
  4: {
    theme: 'Foundations, Disciplined Execution & Organization',
    governingPlanet: 'Rahu / Uranus',
    energyQuality: 'Structure & Hard Work',
    opportunities: [
      'Building durable business infrastructure and legal frameworks',
      'Property investments, home renovations, and health routines',
      'Mastering technical skills and systematizing daily operations'
    ],
    precautions: [
      'Avoid shortcuts or speculative gambles; cut no corners',
      'Guard against mental rigidity or physical burnout'
    ],
    strategicAdvice: 'Lay solid bricks. This is a foundational year where methodical effort creates generational security.'
  },
  5: {
    theme: 'Dynamic Pivot, Freedom, Travel & Adaptability',
    governingPlanet: 'Mercury (Budh)',
    energyQuality: 'Dynamic Shift & Travel',
    opportunities: [
      'Breakthrough pivots, exploring international markets, and relocation',
      'Public relations, media campaigns, and rapid technological adoption',
      'Liberating yourself from outdated routines and stagnant patterns'
    ],
    precautions: [
      'Avoid reckless indulgence, restlessness, or abrupt abandonments',
      'Verify all contractual clauses before signing in haste'
    ],
    strategicAdvice: 'Embrace transformation. Stay flexible and seize unexpected turns of luck with swift adaptability.'
  },
  6: {
    theme: 'Family Harmony, Responsibility, Home & Aesthetics',
    governingPlanet: 'Venus (Shukra)',
    energyQuality: 'Family & Responsibility',
    opportunities: [
      'Purchasing family real estate, interior beautification, and nesting',
      'Marriage, domestic milestones, and deepening familial warmth',
      'Services related to counseling, hospitality, health, or design'
    ],
    precautions: [
      'Avoid meddling in others’ choices or carrying martyr burdens',
      'Do not neglect your own emotional boundaries while caring for others'
    ],
    strategicAdvice: 'Harmonize your sanctuary. Invest time and love into your living environment, family, and inner peace.'
  },
  7: {
    theme: 'Introspection, Spiritual Wisdom & Specialized Study',
    governingPlanet: 'Ketu / Neptune',
    energyQuality: 'Introspection & Spiritual Study',
    opportunities: [
      'Deep research, philosophical contemplation, and skill refinement',
      'Spiritual retreats, meditation practices, and metaphysical studies',
      'Quality over quantity: refining your craft into genuine mastery'
    ],
    precautions: [
      'Avoid hasty commercial expansions; this is a year for mental depth',
      'Beware of isolation or cynicism; maintain trusted connections'
    ],
    strategicAdvice: 'Look within. Trust your analytical and intuitive faculties; quiet reflection yields profound insights.'
  },
  8: {
    theme: 'Commercial Manifestation, Authority & Karmic Harvest',
    governingPlanet: 'Saturn (Shani)',
    energyQuality: 'Material Harvest & Power',
    opportunities: [
      'Major financial dividends, corporate promotions, and executive authority',
      'High-stakes capital investments, real estate acquisitions, and scaling',
      'Karmic balance: rightful efforts from previous years return amplified'
    ],
    precautions: [
      'Avoid arrogant power maneuvers or ethical compromises',
      'Ensure strict financial governance and legal transparency'
    ],
    strategicAdvice: 'Step into leadership. Govern with integrity and claim the material rewards your past labor has built.'
  },
  9: {
    theme: 'Completion, Compassion, Clearing & Global Vision',
    governingPlanet: 'Mars (Mangal)',
    energyQuality: 'Culmination & Release',
    opportunities: [
      'Closing out 9-year projects, concluding debts, and forgiving old ties',
      'Humanitarian outreach, philanthropy, and expansive international exposure',
      'Clearing emotional and physical clutter to make room for the next epicycle'
    ],
    precautions: [
      'Do not cling desperately to relationships or ventures that have run their course',
      'Avoid launching massive 10-year commitments; wait for Year 1'
    ],
    strategicAdvice: 'Tie up loose ends with grace. Cleanse the canvas so you enter your upcoming Year 1 refreshed.'
  }
};

/**
 * Reduce a number to a single digit 1-9
 */
function reduceToSingleDigit(num: number): number {
  let sum = num;
  while (sum > 9) {
    sum = String(sum)
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return sum;
}

/**
 * Calculate the Personal Year for a specific target calendar year
 * Formula: Day of Birth + Month of Birth + Target Calendar Year
 */
export function calculatePersonalYear(dob: string, targetYear: number = new Date().getFullYear()): PersonalYearDetail | null {
  if (!dob) return null;
  const parts = dob.split('-');
  if (parts.length < 3) return null;

  const day = parseInt(parts[2], 10);
  const month = parseInt(parts[1], 10);

  if (isNaN(day) || isNaN(month)) return null;

  const dayReduced = reduceToSingleDigit(day);
  const monthReduced = reduceToSingleDigit(month);
  const yearReduced = reduceToSingleDigit(targetYear);

  const personalYearNum = reduceToSingleDigit(dayReduced + monthReduced + yearReduced);
  const data = PERSONAL_YEAR_DATA[personalYearNum] || PERSONAL_YEAR_DATA[1];

  return {
    year: targetYear,
    personalYearNumber: personalYearNum,
    ...data
  };
}

/**
 * Calculate the full 9-Year Epicycle starting from target year
 */
export function calculateNineYearEpicycle(dob: string, startYear: number = new Date().getFullYear()): PersonalYearDetail[] {
  const list: PersonalYearDetail[] = [];
  for (let i = 0; i < 9; i++) {
    const yr = startYear + i;
    const res = calculatePersonalYear(dob, yr);
    if (res) {
      list.push(res);
    }
  }
  return list;
}
