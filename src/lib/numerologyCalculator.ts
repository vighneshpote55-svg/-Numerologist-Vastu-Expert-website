/**
 * Comprehensive Chaldean and Pythagorean Numerology calculation engine
 * with compound number esoteric meanings and driver-conductor compatibility.
 */

export type NumerologySystem = 'chaldean' | 'pythagorean';

export const CHALDEAN_MAP: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8
};

export const PYTHAGOREAN_MAP: Record<string, number> = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9
};

export interface LetterBreakdown {
  letter: string;
  value: number;
}

export interface CompoundInterpretation {
  compound: number;
  name: string;
  verdict: 'Auspicious' | 'Favorable' | 'Neutral' | 'Requires Alignment';
  description: string;
  planetaryAssociation: string;
}

export const COMPOUND_INTERPRETATIONS: Record<number, CompoundInterpretation> = {
  10: {
    compound: 10,
    name: 'The Wheel of Fortune',
    verdict: 'Auspicious',
    description: 'Honor, faith, and self-confidence. Indicates rise in life through personal endeavor and sudden turns of beneficial fortune.',
    planetaryAssociation: 'Sun (Surya)'
  },
  11: {
    compound: 11,
    name: 'The Clenched Hand',
    verdict: 'Neutral',
    description: 'A master vibration of intense intuition, high ideals, and hidden trials. Requires moral steadfastness and mental calmness.',
    planetaryAssociation: 'Moon & Master Vibration'
  },
  12: {
    compound: 12,
    name: 'The Sacrifice / Spiritual Elevation',
    verdict: 'Requires Alignment',
    description: 'Anxiety and sacrifice for others. Often denotes personal intellect subjugated by emotional decisions.',
    planetaryAssociation: 'Jupiter & Sun'
  },
  13: {
    compound: 13,
    name: 'The Regeneration',
    verdict: 'Neutral',
    description: 'Not unlucky in ancient Chaldean lore; represents upheaval leading to radical transformation, enterprise, and restructuring.',
    planetaryAssociation: 'Uranus / Rahu'
  },
  14: {
    compound: 14,
    name: 'Movement & Challenge',
    verdict: 'Favorable',
    description: 'Magnetic communication, commerce, and international dealings. Requires prudence in financial speculation.',
    planetaryAssociation: 'Mercury (Budh)'
  },
  15: {
    compound: 15,
    name: 'The Enchanter / Artistic Charisma',
    verdict: 'Auspicious',
    description: 'Tremendous personal magnetism, artistic fluency, and luxury. Highly auspicious for public figures, creatives, and hospitality.',
    planetaryAssociation: 'Venus (Shukra)'
  },
  16: {
    compound: 16,
    name: 'The Shattered Citadel',
    verdict: 'Requires Alignment',
    description: 'A compound advising caution against arrogance or unvetted partnerships. Benefits significantly from professional name correction.',
    planetaryAssociation: 'Ketu & Mars'
  },
  17: {
    compound: 17,
    name: 'The Star of the Magi',
    verdict: 'Auspicious',
    description: 'Immortal reputation, peace of mind, and triumph over adversaries. An exceptionally fortunate vibration for lasting legacies.',
    planetaryAssociation: 'Saturn (Shani)'
  },
  18: {
    compound: 18,
    name: 'Spiritual Conflict',
    verdict: 'Requires Alignment',
    description: 'Internal struggles, unexpected friction, and deceptive alliances. Recommended to refine spellings toward harmony.',
    planetaryAssociation: 'Mars & Sun'
  },
  19: {
    compound: 19,
    name: 'The Prince of Heaven',
    verdict: 'Auspicious',
    description: 'One of the most fortunate vibrations in Chaldean numerology. Promises victory, happiness, successful ventures, and vitality.',
    planetaryAssociation: 'Sun (Surya)'
  },
  20: {
    compound: 20,
    name: 'The Awakening',
    verdict: 'Favorable',
    description: 'New purpose, delayed justice, and elevated spiritual consciousness. Success comes through patient and conscientious work.',
    planetaryAssociation: 'Moon (Chandra)'
  },
  21: {
    compound: 21,
    name: 'The Crown of the Magi',
    verdict: 'Auspicious',
    description: 'General success, advancement, and honors. Assures victory in long undertakings and prestige in public endeavors.',
    planetaryAssociation: 'Jupiter (Guru)'
  },
  22: {
    compound: 22,
    name: 'The Master Builder',
    verdict: 'Neutral',
    description: 'Immense creative capacity and visionary power, but demands disciplined ethical anchoring to avoid over-extension.',
    planetaryAssociation: 'Rahu / Master 22'
  },
  23: {
    compound: 23,
    name: 'The Royal Star of the Lion',
    verdict: 'Auspicious',
    description: 'Guarantees success, authority, and protection from superiors. Outstanding vibration for leadership and executive enterprise.',
    planetaryAssociation: 'Mercury & Sun'
  },
  24: {
    compound: 24,
    name: 'Love, Money & Creativity',
    verdict: 'Auspicious',
    description: 'Harmonious relationships, commercial stability, and assistance from influential patrons. Highly recommended for consumer brands.',
    planetaryAssociation: 'Venus (Shukra)'
  },
  25: {
    compound: 25,
    name: 'Discernment & Wisdom',
    verdict: 'Favorable',
    description: 'Acquisition of wisdom through trial, deep analytical talent, and eventual triumph. Excellent for research and advisory.',
    planetaryAssociation: 'Ketu (Wisdom)'
  },
  26: {
    compound: 26,
    name: 'Partnership Turbulence',
    verdict: 'Requires Alignment',
    description: 'Warns of severe financial friction in partnerships and sudden reverses. Ideal candidate for gentle spelling recalibration.',
    planetaryAssociation: 'Saturn (Shani)'
  },
  27: {
    compound: 27,
    name: 'The Sceptre',
    verdict: 'Auspicious',
    description: 'High intelligence, commanding presence, and literary or administrative honors. Outstanding for authors, executives, and leaders.',
    planetaryAssociation: 'Mars (Mangal)'
  },
  28: {
    compound: 28,
    name: 'The Trusting Pilgrim',
    verdict: 'Requires Alignment',
    description: 'Great promise often undermined by blind faith in wrong associates. Advises careful legal contracts and vibrational adjustment.',
    planetaryAssociation: 'Sun & Saturn'
  },
  32: {
    compound: 32,
    name: 'The Communication Vanguard',
    verdict: 'Auspicious',
    description: 'Charismatic public oratory, media triumphs, and expansive client acquisition. Fosters high social affinity.',
    planetaryAssociation: 'Mercury (Budh)'
  },
  33: {
    compound: 33,
    name: 'The Master Teacher',
    verdict: 'Auspicious',
    description: 'Altruistic leadership, magnetic devotion, and supreme creative mastery. Deeply respected in education, healing, and guidance.',
    planetaryAssociation: 'Venus & Master 33'
  },
  37: {
    compound: 37,
    name: 'Good Fortune & Friendship',
    verdict: 'Auspicious',
    description: 'Celebrated for continuous prosperity, loyal alliances, and harmonious domestic joy. Highly favored for business names.',
    planetaryAssociation: 'Sun & Jupiter'
  },
  41: {
    compound: 41,
    name: 'Commercial Mastery',
    verdict: 'Auspicious',
    description: 'Sharp commercial foresight, fluid cash flow, and widespread enterprise success.',
    planetaryAssociation: 'Mercury (Budh)'
  },
  42: {
    compound: 42,
    name: 'The Affectionate Sanctuary',
    verdict: 'Auspicious',
    description: 'Domestic tranquility, graceful diplomacy, and harmonious partnerships.',
    planetaryAssociation: 'Venus (Shukra)'
  },
  45: {
    compound: 45,
    name: 'Dynamic Victory',
    verdict: 'Auspicious',
    description: 'Fierce intellect, strategic enterprise, and prominent social recognition.',
    planetaryAssociation: 'Mars & Mercury'
  },
  51: {
    compound: 51,
    name: 'The Victorious General',
    verdict: 'Auspicious',
    description: 'Sudden elevation to leadership, decisive courage, and unshakeable enterprise.',
    planetaryAssociation: 'Mars & Sun'
  }
};

/**
 * Reduce a number to a single root digit 1-9
 */
export function reduceToSingleDigit(n: number): number {
  while (n > 9) {
    n = n
      .toString()
      .split('')
      .reduce((acc, curr) => acc + parseInt(curr, 10), 0);
  }
  return n;
}

/**
 * Calculate Name Vibration
 */
export function calculateNameVibration(
  name: string,
  system: NumerologySystem = 'chaldean'
): {
  cleanName: string;
  breakdown: LetterBreakdown[];
  compoundNumber: number;
  singleDigit: number;
  interpretation?: CompoundInterpretation;
} {
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
  const map = system === 'chaldean' ? CHALDEAN_MAP : PYTHAGOREAN_MAP;

  const breakdown: LetterBreakdown[] = [];
  let compoundNumber = 0;

  for (const char of cleanName) {
    const val = map[char] || 0;
    breakdown.push({ letter: char, value: val });
    compoundNumber += val;
  }

  const singleDigit = reduceToSingleDigit(compoundNumber || 0);
  const interpretation = COMPOUND_INTERPRETATIONS[compoundNumber] || {
    compound: compoundNumber,
    name: `Compound ${compoundNumber}`,
    verdict: [1, 3, 5, 6].includes(singleDigit) ? 'Auspicious' : 'Favorable',
    description: `Reduces to root vibration ${singleDigit}. Harmonious when balanced with personal birth date Mulank and Bhagyank.`,
    planetaryAssociation: getPlanetForNumber(singleDigit)
  };

  return {
    cleanName,
    breakdown,
    compoundNumber,
    singleDigit,
    interpretation
  };
}

/**
 * Planet associated with 1-9
 */
export function getPlanetForNumber(n: number): string {
  const planets: Record<number, string> = {
    1: 'Sun (Surya) – Leadership & Vitality',
    2: 'Moon (Chandra) – Intuition & Empathy',
    3: 'Jupiter (Guru) – Wisdom & Expansion',
    4: 'Rahu (Uranus) – Innovation & Discipline',
    5: 'Mercury (Budh) – Communication & Commerce',
    6: 'Venus (Shukra) – Luxury, Harmony & Art',
    7: 'Ketu (Neptune) – Research, Wisdom & Mysticism',
    8: 'Saturn (Shani) – Perseverance, Justice & Real Estate',
    9: 'Mars (Mangal) – Courage, Energy & Enterprise'
  };
  return planets[n] || 'Harmonic Planetary Vibration';
}

/**
 * Calculate Mulank (Driver) and Bhagyank (Conductor)
 */
export function calculateBirthNumbers(dateString: string): {
  mulank: number;
  bhagyank: number;
  driverPlanet: string;
  destinyPlanet: string;
  compatibilityNote: string;
  luckyDays: string;
  luckyColors: string;
  friendlyNumbers: number[];
  challengingNumbers: number[];
} | null {
  if (!dateString) return null;
  const parts = dateString.split('-');
  if (parts.length !== 3) return null;

  const day = parseInt(parts[2], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[0], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

  const mulank = reduceToSingleDigit(day);

  // Sum all digits of day + month + year
  const allDigits = `${day}${month}${year}`.split('').map(d => parseInt(d, 10));
  const fullSum = allDigits.reduce((acc, curr) => acc + curr, 0);
  const bhagyank = reduceToSingleDigit(fullSum);

  const FRIENDLY_MAP: Record<number, { friends: number[]; caution: number[] }> = {
    1: { friends: [2, 3, 5, 9], caution: [6, 8] },
    2: { friends: [1, 3, 5], caution: [8, 9] },
    3: { friends: [1, 2, 5, 9], caution: [6] },
    4: { friends: [5, 6, 7, 8], caution: [1, 2, 9] },
    5: { friends: [1, 2, 3, 6], caution: [] },
    6: { friends: [4, 5, 7, 8], caution: [3] },
    7: { friends: [4, 5, 6], caution: [1, 2, 9] },
    8: { friends: [4, 5, 6, 7], caution: [1, 2, 9] },
    9: { friends: [1, 2, 3, 5], caution: [2, 4, 8] }
  };

  const DAYS_MAP: Record<number, string> = {
    1: 'Sunday & Monday',
    2: 'Monday & Sunday',
    3: 'Thursday & Tuesday',
    4: 'Saturday & Wednesday',
    5: 'Wednesday & Friday',
    6: 'Friday & Tuesday',
    7: 'Monday & Thursday',
    8: 'Saturday & Wednesday',
    9: 'Tuesday & Thursday'
  };

  const COLORS_MAP: Record<number, string> = {
    1: 'Gold, Amber, Warm Yellow, Rich Orange',
    2: 'Pearl White, Cream, Soft Silvery Grey',
    3: 'Royal Yellow, Turmeric Gold, Saffron, Purple',
    4: 'Electric Blue, Khaki, Grey, Smoky Slate',
    5: 'Emerald Green, Mint, Jade, Pistachio',
    6: 'Powder Blue, Pearl White, Soft Pink, Cream',
    7: 'Light Green, Opal White, Light Yellow',
    8: 'Navy Blue, Deep Indigo, Steel Grey, Black',
    9: 'Coral Red, Crimson, Maroon, Warm Rose'
  };

  const relation =
    mulank === bhagyank
      ? 'Intensified Single Element: High focus, straightforward life destiny with potent focus.'
      : [1, 3, 5, 9].includes(mulank) && [1, 3, 5, 9].includes(bhagyank)
      ? 'Harmonious Synergy: Action and destiny flow in mutual alignment.'
      : 'Complementary Dynamics: Balances intuitive inner drive with expansive destiny lessons.';

  return {
    mulank,
    bhagyank,
    driverPlanet: getPlanetForNumber(mulank),
    destinyPlanet: getPlanetForNumber(bhagyank),
    compatibilityNote: relation,
    luckyDays: DAYS_MAP[mulank] || 'Auspicious Timing',
    luckyColors: COLORS_MAP[mulank] || 'Harmonious Tones',
    friendlyNumbers: FRIENDLY_MAP[mulank]?.friends || [1, 5],
    challengingNumbers: FRIENDLY_MAP[mulank]?.caution || []
  };
}
