import { ConsultationLead, LeadStatus } from '../types';

const LEADS_STORAGE_KEY = 'archanna_nirrmale_consultation_leads';

const SEED_LEADS: ConsultationLead[] = [
  {
    id: 'lead-17112001',
    fullName: 'Rohan Deshmukh',
    phone: '+91 98220 14590',
    email: 'rohan.d@deshmukhventures.in',
    dateOfBirth: '1988-06-14',
    cityCountry: 'Pune, Maharashtra',
    consultationType: 'Business Consultation',
    preferredDate: '2026-10-02',
    preferredTime: '11:00 AM IST',
    message: 'Looking for brand name numerology and founding partner synergy review for our new EV mobility venture.',
    timestamp: '2026-09-21T10:14:00Z',
    status: 'Consultation Scheduled',
    source: 'Website Booking Form'
  },
  {
    id: 'lead-17112002',
    fullName: 'Shalini Singhania',
    phone: '+44 7911 123456',
    email: 'shalini.singh@gmail.com',
    dateOfBirth: '1992-11-23',
    cityCountry: 'London, United Kingdom',
    consultationType: 'Vastu',
    preferredDate: '2026-10-05',
    preferredTime: '04:00 PM UK Time',
    message: 'Purchasing a duplex penthouse in Canary Wharf. Need entrance pada check and master bedroom orientation guidance.',
    timestamp: '2026-09-22T14:30:00Z',
    status: 'New',
    source: 'WhatsApp Referral'
  }
];

export function getStoredLeads(): ConsultationLead[] {
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(SEED_LEADS));
      return SEED_LEADS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read stored leads', err);
    return SEED_LEADS;
  }
}

export function saveLead(leadData: Omit<ConsultationLead, 'id' | 'timestamp' | 'status' | 'source'>): ConsultationLead {
  const newLead: ConsultationLead = {
    ...leadData,
    id: `lead-${Date.now()}`,
    timestamp: new Date().toISOString(),
    status: 'New',
    source: 'Website Booking Form'
  };

  try {
    const existing = getStoredLeads();
    const updated = [newLead, ...existing];
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save lead', err);
  }

  return newLead;
}

export function updateLeadStatus(leadId: string, status: LeadStatus): void {
  try {
    const leads = getStoredLeads();
    const updated = leads.map(l => (l.id === leadId ? { ...l, status } : l));
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update lead status', err);
  }
}

export function deleteLead(leadId: string): void {
  try {
    const leads = getStoredLeads();
    const updated = leads.filter(l => l.id !== leadId);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to delete lead', err);
  }
}

export function exportLeadsToCSV(leads: ConsultationLead[]): void {
  const headers = ['ID', 'Full Name', 'Phone', 'Email', 'DOB', 'City/Country', 'Type', 'Date', 'Time', 'Status', 'Timestamp', 'Message'];
  const rows = leads.map(l => [
    `"${l.id}"`,
    `"${l.fullName.replace(/"/g, '""')}"`,
    `"${l.phone.replace(/"/g, '""')}"`,
    `"${(l.email || '').replace(/"/g, '""')}"`,
    `"${l.dateOfBirth || ''}"`,
    `"${(l.cityCountry || '').replace(/"/g, '""')}"`,
    `"${l.consultationType}"`,
    `"${l.preferredDate || ''}"`,
    `"${l.preferredTime || ''}"`,
    `"${l.status}"`,
    `"${l.timestamp}"`,
    `"${(l.message || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `archanna_nirrmale_leads_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
