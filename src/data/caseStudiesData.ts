export interface CaseStudy {
  id: string;
  clientType: 'Commercial Enterprise' | 'D2C Consumer Brand' | 'Residential Luxury' | 'C-Suite Executive';
  title: string;
  subtitle: string;
  location: string;
  metrics: string[];
  keyChallenge: string;
  keyRemedies: string[];
  keyOutcome: string;
  testimonialExcerpt: string;
  clientPseudonym: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-industrial-cashflow',
    clientType: 'Commercial Enterprise',
    title: 'Manufacturing Facility Turnaround',
    subtitle: 'Overcoming Persistent Liquidity Lockups & Dispatch Delays',
    location: 'Bhosari MIDC, Pune',
    metrics: ['Receivables: 92d → 38d', 'Breakdowns: -64%', 'Zero Demolition'],
    keyChallenge: '12,000 sq.ft Tier-1 auto vendor faced repetitive machine failures, 90+ day receivables, and high labor turnover.',
    keyRemedies: [
      'Cleared scrap from NE (Ishanya zone) to create open green space',
      'Installed industrial brass & copper energy strips across floors',
      'Re-oriented Finance Desk to face North (Kuber Zone)'
    ],
    keyOutcome: 'Receivables contracted to 38 days within 4 months; machine downtime fell by 64%; secured multi-year export contract.',
    testimonialExcerpt:
      'Archanna did not ask us to demolish a single wall. Her spatial remedies were surgical, scientific, and extraordinarily effective.',
    clientPseudonym: 'Managing Director, Precision Tech Components'
  },
  {
    id: 'case-brand-rebranding',
    clientType: 'D2C Consumer Brand',
    title: 'D2C Brand Vibration Calibration',
    subtitle: 'Transitioning from Stagnant Compound 26 to Magnetic Compound 37',
    location: 'Mumbai & Bangalore',
    metrics: ['Retention: +210%', 'Compound: 26 → 37', 'Pre-Series A Closed'],
    keyChallenge: 'Organic skincare label suffered low repeat orders and excessive customer acquisition costs despite award-winning products.',
    keyRemedies: [
      'Refined 1 vowel in brand name to achieve auspicious Compound 37 (Creative Fortune)',
      'Harmonized founder signatures with upward trajectory strokes',
      'Balanced brand logo palette with Venusian luxury aesthetics'
    ],
    keyOutcome: 'Organic retention jumped 210% over 2 quarters, culminating in a successful institutional funding round.',
    testimonialExcerpt:
      'The slight spelling pivot unified our team energy and market reception. Archanna’s mastery is peerless.',
    clientPseudonym: 'Co-Founders, PureVeda Organics'
  },
  {
    id: 'case-luxury-residence',
    clientType: 'Residential Luxury',
    title: 'Luxury 4BHK Penthouse Harmony',
    subtitle: 'Neutralizing Fire-in-Water Elemental Clash Without Tile Demolition',
    location: 'Baner, Pune',
    metrics: ['Sleep Quality Restored', 'Zero Tile Breakage', 'Saved ₹15L Remodel'],
    keyChallenge: 'Family suffered severe sleep disturbances, chronic gastric restlessness, and anxiety after moving into new penthouse.',
    keyRemedies: [
      'Placed 1-inch polished green marble beneath kitchen hob to balance Fire vs Water',
      'Embedded sealed copper wire rings within cabinet skirting',
      'Re-aligned master bed headboard to pure South'
    ],
    keyOutcome: 'Restful 8-hour unbroken sleep returned within 3 weeks; domestic tension dissolved without kitchen demolition.',
    testimonialExcerpt:
      'Our architect warned remodeling would cost 15 Lakhs. Archanna solved it with subtle elemental remedies in days.',
    clientPseudonym: 'Senior VP & Family, Global IT Conglomerate'
  },
  {
    id: 'case-executive-leadership',
    clientType: 'C-Suite Executive',
    title: 'Executive Career Elevation & Relocation',
    subtitle: 'Personal Mulank-Bhagyank & Mobile Frequency Alignment',
    location: 'Dubai & London (Remote)',
    metrics: ['Promoted to CRO', 'VIP Number Compound 23', 'London Board Seat'],
    keyChallenge: 'Banking Director was passed over for regional MD role for 3 consecutive cycles despite stellar KPIs.',
    keyRemedies: [
      'Selected VIP mobile number vibrating to Compound 23 (Royal Star of the Lion)',
      'Redesigned executive signature with ascending 45° trajectory and base support',
      'Structured home study desk to face North with bronze globe in WSW zone'
    ],
    keyOutcome: 'Extended Chief Risk Officer appointment by premier European private bank in London within 6 months.',
    testimonialExcerpt:
      'Her insights gave me tactical clarity at a critical crossroads. The signature and number adjustments transformed my boardroom presence.',
    clientPseudonym: 'Managing Director & CRO, Private Banking'
  }
];
