import React, { useState, useEffect } from 'react';
import { getStoredLeads, updateLeadStatus, deleteLead, exportLeadsToCSV } from '../../lib/storage';
import { ConsultationLead, LeadStatus } from '../../types';
import { X, Download, Trash2, CheckCircle2, Clock, Phone, Mail, Calendar, MapPin, Search, Filter, ShieldCheck, FileText } from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';

interface LeadDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadDashboardModal: React.FC<LeadDashboardModalProps> = ({
  isOpen,
  onClose
}) => {
  const [leads, setLeads] = useState<ConsultationLead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedLead, setSelectedLead] = useState<ConsultationLead | null>(null);

  useEffect(() => {
    if (isOpen) {
      setLeads(getStoredLeads());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    updateLeadStatus(leadId, newStatus);
    setLeads(getStoredLeads());
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleDelete = (leadId: string) => {
    if (window.confirm('Are you sure you want to remove this lead record?')) {
      deleteLead(leadId);
      setLeads(getStoredLeads());
      if (selectedLead?.id === leadId) setSelectedLead(null);
    }
  };

  const filteredLeads = leads.filter(l => {
    const matchesSearch =
      l.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm) ||
      (l.email && l.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.cityCountry && l.cityCountry.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden bg-[#10152A] border border-[#C8A45D]/50 rounded-2xl shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#080A14]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#C8A45D]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Administrative Consultation CRM</span>
            </div>
            <h3 className="font-serif text-2xl font-medium text-[#F7F4EC]">
              Consultation Intake & Enquiries Desk
            </h3>
            <p className="text-xs text-[#9EA3B5]">
              Real-time enquiries received via Website forms, VIP bookings, and client evaluations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => exportLeadsToCSV(leads)}
              className="px-3.5 py-2 rounded-xl bg-[#10152A] hover:bg-[#192348] border border-[#C8A45D]/40 text-[#E8D5A8] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-[#9EA3B5] hover:text-[#F7F4EC] hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Controls Bar: Search & Filter */}
        <div className="p-4 border-b border-white/10 bg-[#0c1020] grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-[#9EA3B5] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by client name, phone, email, or city..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#080A14] border border-white/10 text-xs text-[#F7F4EC] focus:border-[#C8A45D] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-4 flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#C8A45D] shrink-0" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#080A14] border border-white/10 text-xs text-[#F7F4EC] focus:border-[#C8A45D] focus:outline-none cursor-pointer"
            >
              <option value="All">All Statuses ({leads.length})</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Consultation Scheduled">Consultation Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Main Content: Split Table & Detail View */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          
          {/* Leads List */}
          <div className="lg:col-span-7 overflow-y-auto max-h-[58vh] divide-y divide-white/5">
            {filteredLeads.length === 0 ? (
              <div className="p-12 text-center text-xs text-[#9EA3B5]">
                No consultation leads match your criteria.
              </div>
            ) : (
              filteredLeads.map(lead => (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`p-4 transition-colors cursor-pointer flex flex-col gap-2 ${
                    selectedLead?.id === lead.id
                      ? 'bg-[#151c38]'
                      : 'hover:bg-[#10152A]/60 bg-[#080A14]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-semibold text-sm text-[#F7F4EC]">
                        {lead.fullName}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#10152A] border border-[#C8A45D]/30 text-[#E8D5A8] font-mono">
                        {lead.consultationType}
                      </span>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      lead.status === 'New'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : lead.status === 'Consultation Scheduled'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-white/5 text-[#9EA3B5]'
                    }`}>
                      {lead.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#9EA3B5]">
                    <span className="flex items-center gap-1 font-mono text-[#F7F4EC]">
                      <Phone className="w-3 h-3 text-[#C8A45D]" />
                      {lead.phone}
                    </span>
                    {lead.cityCountry && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#9EA3B5]" />
                        {lead.cityCountry}
                      </span>
                    )}
                    {lead.attachmentName && (
                      <span className="flex items-center gap-1 text-[#E8D5A8]">
                        <FileText className="w-3 h-3 text-[#C8A45D]" />
                        Attachment included
                      </span>
                    )}
                  </div>

                  {lead.message && (
                    <p className="text-[11px] text-[#9EA3B5] line-clamp-1 italic">
                      "{lead.message}"
                    </p>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Selected Lead Detail View */}
          <div className="lg:col-span-5 p-6 bg-[#0c1020] space-y-5 overflow-y-auto max-h-[58vh]">
            {selectedLead ? (
              <div className="space-y-5 text-xs">
                
                <div className="flex items-start justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#C8A45D] uppercase tracking-wider block">
                      Lead ID: {selectedLead.id}
                    </span>
                    <h4 className="font-serif text-xl font-bold text-[#F7F4EC] mt-0.5">
                      {selectedLead.fullName}
                    </h4>
                    <span className="text-[11px] text-[#9EA3B5]">
                      Logged: {new Date(selectedLead.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(selectedLead.id)}
                    className="p-1.5 text-[#9EA3B5] hover:text-red-400 transition-colors cursor-pointer"
                    title="Delete lead"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Status Switcher */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-[#E8D5A8] uppercase tracking-wider">
                    Update Intake Status:
                  </label>
                  <select
                    value={selectedLead.status}
                    onChange={e => handleStatusChange(selectedLead.id, e.target.value as LeadStatus)}
                    className="w-full px-3 py-2 rounded-lg bg-[#080A14] border border-[#C8A45D]/40 text-xs text-[#F7F4EC] focus:border-[#C8A45D] focus:outline-none cursor-pointer"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Consultation Scheduled">Consultation Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                {/* Details Breakdown */}
                <div className="space-y-2.5 p-4 rounded-xl bg-[#080A14] border border-white/5">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#9EA3B5] block">Phone / WhatsApp</span>
                    <a
                      href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-[#E8D5A8] hover:text-[#C8A45D] font-bold block mt-0.5"
                    >
                      {selectedLead.phone}
                    </a>
                  </div>

                  {selectedLead.email && (
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#9EA3B5] block">Email</span>
                      <a href={`mailto:${selectedLead.email}`} className="text-[#F7F4EC] hover:underline block mt-0.5">
                        {selectedLead.email}
                      </a>
                    </div>
                  )}

                  {selectedLead.dateOfBirth && (
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#9EA3B5] block">Date of Birth</span>
                      <span className="font-mono text-[#F7F4EC] block mt-0.5">{selectedLead.dateOfBirth}</span>
                    </div>
                  )}

                  {selectedLead.cityCountry && (
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#9EA3B5] block">Location</span>
                      <span className="text-[#F7F4EC] block mt-0.5">{selectedLead.cityCountry}</span>
                    </div>
                  )}

                  {(selectedLead.preferredDate || selectedLead.preferredTime) && (
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#9EA3B5] block">Preferred Schedule</span>
                      <span className="text-[#F7F4EC] block mt-0.5">
                        {selectedLead.preferredDate || 'Any Date'} at {selectedLead.preferredTime || 'Flexible'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Message */}
                {selectedLead.message && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-[#C8A45D] block">Client Note / Concern:</span>
                    <p className="p-3 rounded-lg bg-[#080A14] border border-white/5 text-[#9EA3B5] leading-relaxed italic">
                      "{selectedLead.message}"
                    </p>
                  </div>
                )}

                {/* Attachment view if provided */}
                {selectedLead.attachmentName && (
                  <div className="p-3 rounded-lg bg-[#080A14] border border-[#C8A45D]/30 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-[#E8D5A8] block">Attached Layout / File:</span>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#F7F4EC] truncate pr-2">{selectedLead.attachmentName}</span>
                      {selectedLead.attachmentDataUrl && (
                        <a
                          href={selectedLead.attachmentDataUrl}
                          download={selectedLead.attachmentName}
                          className="px-2.5 py-1 rounded bg-[#C8A45D] text-[#080A14] font-semibold text-[11px] hover:brightness-105"
                        >
                          Download
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Direct Action */}
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hello ${selectedLead.fullName}, this is Archanna Nirrmale's office regarding your ${selectedLead.consultationType} consultation enquiry.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-black font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-black" />
                    <span>Connect on WhatsApp</span>
                  </a>
                </div>

              </div>
            ) : (
              <div className="p-12 text-center text-xs text-[#9EA3B5]">
                Select any consultation record on the left to review client specifics, schedule, and attachments.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
