export interface ConsultationPackage {
  id: string;
  name: string;
  category: 'Numerology' | 'Vastu' | 'Business' | 'Master Combined';
  badge?: string;
  headline: string;
  duration: string;
  deliveryFormat: 'Remote Video / Phone' | 'On-Site + Video' | 'Comprehensive Hybrid';
  deliverables: string[];
  bestSuitedFor: string;
  prerequisites: string[];
  ctaLabel: string;
}

export const CONSULTATION_PACKAGES: ConsultationPackage[] = [
  {
    id: 'pkg-personal-numerology',
    name: 'Personal Name & Trajectory',
    category: 'Numerology',
    badge: 'Popular for Individuals',
    headline: 'Fine-tune personal identity, mobile number, signature & lucky cycles.',
    duration: '45–60 Mins',
    deliveryFormat: 'Remote Video / Phone',
    deliverables: [
      'Chaldean & Pythagorean name spelling check',
      'Mulank (Driver) & Bhagyank (Conductor) life blueprint',
      '24-month Personal Year Cycle forecast',
      'Harmonious mobile number & ascending signature templates',
      'Lucky colors, dates & gemstone guidance'
    ],
    bestSuitedFor: 'Career transitions, students, personal clarity.',
    prerequisites: ['Full legal name', 'Exact Date of Birth (DD/MM/YYYY)'],
    ctaLabel: 'Book Personal Alignment'
  },
  {
    id: 'pkg-residential-vastu',
    name: 'Residential Non-Demolition Vastu',
    category: 'Vastu',
    badge: '100% Zero Demolition',
    headline: 'Align your living space for restful sleep, family harmony & wealth.',
    duration: '60–75 Mins',
    deliveryFormat: 'On-Site + Video',
    deliverables: [
      'Digital 16-zone Mahavastu grid mapping',
      'Pancha Bhuta (5 Elements) balance check across rooms',
      'Kitchen hob, Master bed & Mandir alignment',
      'Non-demolition elemental remedies (metallic strips, crystal balancers)',
      'Written action summary report'
    ],
    bestSuitedFor: 'Homeowners, flat tenants, renovating families.',
    prerequisites: ['Floor plan / builder layout', 'Main door compass degrees'],
    ctaLabel: 'Book Home Vastu'
  },
  {
    id: 'pkg-business-brand',
    name: 'Corporate Brand & Workplace Vastu',
    category: 'Business',
    badge: 'High Impact for Founders',
    headline: 'Commercial compound numbers, partner synergy & office cashflow.',
    duration: '75–90 Mins',
    deliveryFormat: 'Comprehensive Hybrid',
    deliverables: [
      'Company & brand trademark Chaldean compound audit',
      'Co-founders’ Mulank-Bhagyank synergy matrix',
      'Office floorplan mapping (MD Cabin, Accounts & Sales)',
      'Cashflow enhancement remedies for North & SE zones',
      'Auspicious dates for contract signing & launch'
    ],
    bestSuitedFor: 'Entrepreneurs, startup founders, retail showroom owners.',
    prerequisites: ['Proposed brand names', 'Partners’ DOBs', 'Office layout'],
    ctaLabel: 'Book Business Advisory'
  },
  {
    id: 'pkg-master-combined',
    name: 'The Sovereign Master Alignment',
    category: 'Master Combined',
    badge: 'Holistic Complete Plan',
    headline: 'Total synchronization: Personal numbers + Physical residence & workplace.',
    duration: '2 Dedicated Sessions + 30-Day Support',
    deliveryFormat: 'Comprehensive Hybrid',
    deliverables: [
      'Full Personal Numerology + Complete Residential Vastu',
      'Planetary cross-analysis matching birth rulers with home zones',
      'Priority direct WhatsApp support for 30 days',
      'Signature calibration & mobile number optimization',
      'Annual investment cycle planning'
    ],
    bestSuitedFor: 'High-net-worth families, executives, new home buyers.',
    prerequisites: ['Full birth details', 'Complete residence blueprint'],
    ctaLabel: 'Book Sovereign Alignment'
  }
];
