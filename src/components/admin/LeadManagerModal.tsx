import React, { useState, useEffect } from 'react';
import { ConsultationLead, LeadStatus } from '../../types';
import { getStoredLeads, updateLeadStatus, deleteLead, exportLeadsToCSV } from '../../lib/storage';
import { X, Download, Trash2, Calendar, Phone, Mail, MapPin, Search, Filter } from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { generateWhatsAppLink } from '../../lib/validation';

interface LeadManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadManagerModal: React.FC<LeadManagerModalProps> = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState<ConsultationLead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const refresh = () => {
    setLeads(getStoredLeads());
  };

  useEffect(() => {
    if (isOpen) {
      refresh();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = leads.filter(l => {
    const matchesSearch =
      l.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm) ||
      (l.cityCountry && l.cityCountry.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    updateLeadStatus(leadId, newStatus);
    refresh();
  };

  const handleDelete = (leadId: string) => {
    if (window.confirm('Are you sure you want to remove this consultation enquiry?')) {
      deleteLead(leadId);
      refresh();
    }
  };

  const handleContactWhatsApp = (lead: ConsultationLead) => {
    const phone = lead.phone.replace(/[^0-9]/g, '');
    const text = `Hi ${lead.fullName}, thank you for your consultation enquiry regarding ${lead.consultationType} with Archanna Nirrmale. Let us know a convenient time to schedule your session.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#10152A] border border-[#C8A45D]/40 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        
        {/* Modal Top Bar */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#080A14]">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#C8A45D]">
              Internal Desk Console
            </span>
            <h3 className="font-serif text-2xl font-semibold text-[#F7F4EC]">
              Consultation Enquiries & Leads ({leads.length})
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => exportLeadsToCSV(leads)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#080A14] border border-[#C8A45D]/40 text-[#E8D5A8] hover:border-[#C8A45D] text-xs transition-colors cursor-pointer"
              title="Export all leads to CSV"
            >
              <Download className="w-3.5 h-3.5 text-[#C8A45D]" />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-[#9EA3B5] hover:text-white"
              aria-label="Close lead manager"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 bg-[#10152A] border-b border-white/5 flex flex-wrap gap-3 items-center justify-between">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-[#9EA3B5] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by client name, phone or city..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#080A14] border border-white/10 text-xs text-[#F7F4EC] focus:border-[#C8A45D] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-[#C8A45D]" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[#080A14] border border-white/10 text-xs text-[#E8D5A8] focus:border-[#C8A45D] focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Consultation Scheduled">Consultation Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Leads Table / List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#9EA3B5]">
              No consultation enquiries found matching your filter criteria.
            </div>
          ) : (
            filtered.map(lead => (
              <div
                key={lead.id}
                className="p-4 rounded-xl bg-[#080A14] border border-white/10 hover:border-[#C8A45D]/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1 max-w-lg">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[#F7F4EC]">
                      {lead.fullName}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#10152A] border border-[#C8A45D]/30 text-[10px] text-[#C8A45D] font-mono">
                      {lead.consultationType}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[#9EA3B5]">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#C8A45D]" />
                      <a href={`tel:${lead.phone}`} className="hover:underline text-[#E8D5A8]">
                        {lead.phone}
                      </a>
                    </span>
                    {lead.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-[#C8A45D]" />
                        {lead.email}
                      </span>
                    )}
                    {lead.cityCountry && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#C8A45D]" />
                        {lead.cityCountry}
                      </span>
                    )}
                  </div>

                  {lead.message && (
                    <p className="text-[11px] text-[#9EA3B5] italic bg-[#10152A]/50 p-2 rounded mt-1">
                      "{lead.message}"
                    </p>
                  )}

                  {lead.attachmentName && (
                    <div className="flex items-center gap-2 p-2 rounded bg-[#080A14] border border-[#C8A45D]/30 text-xs mt-1">
                      <span className="text-[#C8A45D] font-mono text-[10px] uppercase">Attachment:</span>
                      <span className="text-[#F7F4EC] text-[11px] truncate flex-1">{lead.attachmentName}</span>
                      {lead.attachmentDataUrl && (
                        <a
                          href={lead.attachmentDataUrl}
                          download={lead.attachmentName}
                          className="px-2 py-0.5 rounded bg-[#C8A45D] text-[#080A14] text-[10px] font-bold hover:brightness-105"
                        >
                          Download
                        </a>
                      )}
                    </div>
                  )}

                  <div className="text-[10px] text-[#9EA3B5]/60 font-mono">
                    Received: {new Date(lead.timestamp).toLocaleString()}
                    {lead.preferredDate && ` · Target: ${lead.preferredDate} (${lead.preferredTime || ''})`}
                  </div>
                </div>

                {/* Status select & actions */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                  <select
                    value={lead.status}
                    onChange={e => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                    className="px-2.5 py-1.5 rounded bg-[#10152A] border border-[#C8A45D]/30 text-[11px] text-[#E8D5A8] focus:outline-none"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Consultation Scheduled">Consultation Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Archived">Archived</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => handleContactWhatsApp(lead)}
                    className="p-1.5 rounded-lg bg-[#25D366] text-[#080A14] hover:bg-[#20ba5a] transition-colors"
                    title="Send WhatsApp message"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#080A14]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(lead.id)}
                    className="p-1.5 rounded-lg bg-[#10152A] text-red-400 hover:bg-red-950 transition-colors"
                    title="Delete lead"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
