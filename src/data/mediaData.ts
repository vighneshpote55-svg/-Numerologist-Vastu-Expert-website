export interface MediaArticle {
  id: string;
  type: 'video' | 'article' | 'podcast';
  title: string;
  topic: 'Vastu' | 'Numerology' | 'Business' | 'Case Study';
  durationOrReadTime: string;
  publishedDate: string;
  platform: 'YouTube' | 'Instagram' | 'LinkedIn' | 'Editorial';
  summary: string;
  url: string;
  keyTakeaway: string;
  viewsOrEngagement?: string;
}

export const MEDIA_RESOURCES: MediaArticle[] = [
  {
    id: 'media-01',
    type: 'video',
    topic: 'Vastu',
    title: 'North-East Kitchens: Non-Demolition Elemental Cures',
    durationOrReadTime: '12 min video',
    publishedDate: 'Sept 2026',
    platform: 'YouTube',
    summary: 'Why fire in the Ishanya (NE) water zone locks cashflow, and how marble slabs and copper strips resolve it without demolition.',
    url: 'https://youtube.com/@archannanirrmale',
    keyTakeaway: 'Zero wall demolition; use metallic energy dividers and color therapies.',
    viewsOrEngagement: '14.2K views'
  },
  {
    id: 'media-02',
    type: 'article',
    topic: 'Business',
    title: 'Compound 37 vs 38: The Fortune Difference',
    durationOrReadTime: '6 min read',
    publishedDate: 'Aug 2026',
    platform: 'LinkedIn',
    summary: 'Analyzing why one brand name scaled to Series B while a 1-digit difference triggered 14 months of founder dispute.',
    url: 'https://www.linkedin.com/in/archanna-nirrmale-190991368/',
    keyTakeaway: 'Compound numbers reveal underlying commercial karma before incorporation.',
    viewsOrEngagement: '8.4K impressions'
  },
  {
    id: 'media-03',
    type: 'video',
    topic: 'Numerology',
    title: 'Selecting Auspicious Mobile & SIM Numbers',
    durationOrReadTime: '9 min video',
    publishedDate: 'July 2026',
    platform: 'Instagram',
    summary: 'Debunking online myths about numbers 4 and 8. Matching your primary phone sum to your personal Mulank and destiny.',
    url: 'https://www.instagram.com/archannanirrmale',
    keyTakeaway: 'Synchronize phone digit totals with your ruling planetary vibrations.',
    viewsOrEngagement: '22.8K plays'
  },
  {
    id: 'media-04',
    type: 'article',
    topic: 'Vastu',
    title: 'Apartment Vastu: 5 Essential Pre-Buy Checks',
    durationOrReadTime: '8 min read',
    publishedDate: 'June 2026',
    platform: 'Editorial',
    summary: 'Audit 32-pada entrance gateways, lift well positions, and center Brahmasthan balance before paying flat token money.',
    url: 'https://youtube.com/@archannanirrmale',
    keyTakeaway: 'Always verify main door degree orientation and kitchen placement first.',
    viewsOrEngagement: '5.1K reads'
  },
  {
    id: 'media-05',
    type: 'video',
    topic: 'Numerology',
    title: 'Master Numbers 11, 22 & 33 in Business',
    durationOrReadTime: '15 min masterclass',
    publishedDate: 'May 2026',
    platform: 'YouTube',
    summary: 'How founders with master birth numbers channel intense visionary energy into structured, durable corporate growth.',
    url: 'https://youtube.com/@archannanirrmale',
    keyTakeaway: 'Ground master numbers with daily structure to prevent energy dispersion.',
    viewsOrEngagement: '18.9K views'
  },
  {
    id: 'media-06',
    type: 'article',
    topic: 'Case Study',
    title: 'Turnaround of 220-Seat Tech Office in Pune',
    durationOrReadTime: '7 min read',
    publishedDate: 'Apr 2026',
    platform: 'LinkedIn',
    summary: 'Reorienting executive seating and moving server rooms halted senior engineering team attrition within 90 days.',
    url: 'https://www.linkedin.com/in/archanna-nirrmale-190991368/',
    keyTakeaway: 'Spatial magnetic balance directly impacts workforce retention and focus.',
    viewsOrEngagement: '11.3K impressions'
  }
];
