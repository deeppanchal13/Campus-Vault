import React, { useState } from 'react';
import { AcademicResource } from '../types';

interface DocumentModalProps {
  resource: AcademicResource | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onDownload: (resource: AcademicResource) => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
  resource,
  onClose,
  isSaved,
  onToggleSave,
  onDownload,
}) => {
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'syllabus' | 'details'>('content');

  if (!resource) return null;

  const handleCopyCitation = () => {
    const citation = `${resource.verifierName}. (${resource.dateUploaded.includes('2025') ? '2025' : '2024'}). "${resource.title}". CampusVault Academic Archives, ${resource.facultyDept}.`;
    navigator.clipboard.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1c1b19]/40 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl border border-[#e6e2de] shadow-[0_8px_32px_rgba(28,27,25,0.12)] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="px-6 py-4 bg-[#fdf8f5] border-b border-[#e6e2de] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1f4d3a]"></span>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#717973]">
              Archival Ledger • ID: {resource.id}
            </span>
            {resource.isVerified && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#ffdeae]/60 text-[#604100] border border-[#ffba3e]/40">
                <span className="material-symbols-outlined text-[13px] text-[#7f5700]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                <span>Peer-Reviewed</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(resource.id)}
              className={`p-1.5 rounded-lg border transition-colors ${
                isSaved 
                  ? 'bg-[#bceed3]/30 border-[#a1d1b8] text-[#023625]' 
                  : 'bg-white border-[#e6e2de] text-[#717973] hover:text-[#1c1b19]'
              }`}
              title={isSaved ? 'Bookmarked' : 'Save note'}
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}>
                {isSaved ? 'bookmark' : 'bookmark_border'}
              </span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white border border-[#e6e2de] text-[#717973] hover:text-[#1c1b19] hover:bg-[#f7f3ef] transition-colors"
              aria-label="Close dialog"
            >
              <span className="material-symbols-outlined text-[19px]">close</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Title & Metadata */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#f2ede9] text-[#414944]">
                {resource.subject}
              </span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#f7f3ef] text-[#717973]">
                Course Code: {resource.subjectCode}
              </span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#f7f3ef] text-[#717973]">
                Semester {resource.semester}
              </span>
              <span className="text-[12px] text-[#717973] ml-auto">
                {resource.fileSize} • {resource.pages} pages
              </span>
            </div>

            <h2 className="font-serif-editorial text-[22px] sm:text-[26px] text-[#1c1b19] leading-snug font-medium">
              {resource.title}
            </h2>

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#f2ede9] text-[13px] text-[#414944]">
              <span className="material-symbols-outlined text-[18px] text-[#023625]">school</span>
              <span>
                Faculty Endorser: <strong>{resource.verifierName}</strong> ({resource.facultyDept})
              </span>
            </div>
          </div>

          {/* Tab Navigation inside modal */}
          <div className="flex items-center gap-2 border-b border-[#e6e2de] text-xs font-medium">
            <button
              onClick={() => setActiveTab('content')}
              className={`pb-2 px-1 border-b-2 transition-colors ${
                activeTab === 'content'
                  ? 'border-[#023625] text-[#023625] font-semibold'
                  : 'border-transparent text-[#717973] hover:text-[#1c1b19]'
              }`}
            >
              Document Reader Preview
            </button>
            <button
              onClick={() => setActiveTab('syllabus')}
              className={`pb-2 px-1 border-b-2 transition-colors ${
                activeTab === 'syllabus'
                  ? 'border-[#023625] text-[#023625] font-semibold'
                  : 'border-transparent text-[#717973] hover:text-[#1c1b19]'
              }`}
            >
              Key Topics & Syllabus
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-2 px-1 border-b-2 transition-colors ${
                activeTab === 'details'
                  ? 'border-[#023625] text-[#023625] font-semibold'
                  : 'border-transparent text-[#717973] hover:text-[#1c1b19]'
              }`}
            >
              Archival Verification Details
            </button>
          </div>

          {/* Tab 1: Live Document Excerpt Viewer */}
          {activeTab === 'content' && (
            <div className="space-y-4">
              <p className="text-[14px] text-[#414944] leading-relaxed">
                {resource.description}
              </p>

              {/* Realistic Document Parchment Viewer */}
              <div className="p-5 rounded-xl bg-[#fdf8f5] border border-[#e6e2de] shadow-inner font-mono text-[13px] text-[#1c1b19] leading-relaxed relative">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e6e2de] text-[11px] text-[#717973] uppercase font-sans">
                  <span>Document Excerpt • Page 1 of {resource.pages}</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-[#023625]">check</span>
                    Authentic Transcript
                  </span>
                </div>
                <pre className="whitespace-pre-wrap font-mono text-xs leading-5 text-[#32302e]">
                  {resource.sampleContentSnippet || resource.description}
                </pre>
              </div>
            </div>
          )}

          {/* Tab 2: Key Topics & Syllabus */}
          {activeTab === 'syllabus' && (
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-[#717973] uppercase tracking-wider">
                Exam-Critical Topics Covered in this Handout
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {resource.keyTopics.map((topic, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-[#f7f3ef] border border-[#e6e2de]">
                    <span className="material-symbols-outlined text-[16px] text-[#023625] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span className="text-xs font-medium text-[#1c1b19]">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Archival Details */}
          {activeTab === 'details' && (
            <div className="space-y-3 text-xs text-[#414944]">
              <div className="p-4 rounded-xl bg-[#f7f3ef] border border-[#e6e2de] space-y-2">
                <div className="flex justify-between py-1 border-b border-[#e6e2de]">
                  <span className="text-[#717973]">Archival Category:</span>
                  <span className="font-semibold text-[#1c1b19] uppercase">{resource.type}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#e6e2de]">
                  <span className="text-[#717973]">Faculty Scrutinizer:</span>
                  <span className="font-semibold text-[#1c1b19]">{resource.verifierName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#e6e2de]">
                  <span className="text-[#717973]">Verification Seal:</span>
                  <span className="font-semibold text-[#023625]">Valid Collegiate Scheme 2024-25</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#717973]">Total Downloads:</span>
                  <span className="font-semibold text-[#1c1b19]">{resource.downloadsCount.toLocaleString()} collegiate downloads</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-[#fdf8f5] border-t border-[#e6e2de] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopyCitation}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-[#ece7e4] text-[#414944] text-xs font-medium border border-[#e6e2de] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">format_quote</span>
            <span>{copiedCitation ? 'Citation Copied!' : 'Cite Paper'}</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-lg bg-[#f2ede9] hover:bg-[#ece7e4] text-[#1c1b19] text-xs font-medium transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => onDownload(resource)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-lg bg-[#023625] hover:bg-[#1f4d3a] text-white text-xs font-medium transition-all shadow-xs active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Download PDF ({resource.fileSize})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
