import React, { useState } from 'react';
import { DEPT_REPS } from '../data/mockData';

export type InfoModalType = 'guidelines' | 'verification' | 'report' | 'contact' | null;

interface InfoModalsProps {
  activeModal: InfoModalType;
  onClose: () => void;
}

export const InfoModals: React.FC<InfoModalsProps> = ({ activeModal, onClose }) => {
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportNoteId, setReportNoteId] = useState('');
  const [reportIssue, setReportIssue] = useState('Typo in formula or derivation');
  const [reportDetails, setReportDetails] = useState('');

  if (!activeModal) return null;

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setReportSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1c1b19]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl border border-[#e6e2de] shadow-[0_8px_32px_rgba(28,27,25,0.12)] overflow-hidden my-auto max-h-[90vh] flex flex-col text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#fdf8f5] border-b border-[#e6e2de] flex items-center justify-between">
          <h3 className="font-serif-editorial text-[19px] text-[#1c1b19] font-medium leading-tight">
            {activeModal === 'guidelines' && 'Archival Curator Guidelines'}
            {activeModal === 'verification' && 'Faculty Verification & Peer Review Process'}
            {activeModal === 'report' && 'Report an Academic Inaccuracy'}
            {activeModal === 'contact' && 'Department Student & Faculty Representatives'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#ece7e4] text-[#717973] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content based on modal type */}
        <div className="p-6 overflow-y-auto space-y-4 text-[#414944] leading-relaxed">
          {activeModal === 'guidelines' && (
            <div className="space-y-3">
              <p>
                CampusVault maintains a strict archival benchmark to preserve clarity, legibility, and pedagogical rigor for university students across India.
              </p>
              <div className="p-3.5 rounded-xl bg-[#fdf8f5] border border-[#e6e2de] space-y-2">
                <div className="font-semibold text-[#1c1b19] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#023625]">check_circle</span>
                  <span>1. Handwritten Transcripts</span>
                </div>
                <p className="text-[11px] text-[#414944] pl-5">
                  Must be scanned using flatbed scanners or document cameras (CamScanner/Adobe Scan with 300+ DPI). Ensure high contrast between ink and unlined paper.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#fdf8f5] border border-[#e6e2de] space-y-2">
                <div className="font-semibold text-[#1c1b19] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#023625]">check_circle</span>
                  <span>2. Past University Question Papers (PYQs)</span>
                </div>
                <p className="text-[11px] text-[#414944] pl-5">
                  Include official exam dates, maximum marks, question scheme, and verified step-by-step marking rubrics endorsed by faculty.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#fdf8f5] border border-[#e6e2de] space-y-2">
                <div className="font-semibold text-[#1c1b19] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#023625]">check_circle</span>
                  <span>3. Copyright & Fair Academic Use</span>
                </div>
                <p className="text-[11px] text-[#414944] pl-5">
                  Commercial textbook piracy is strictly prohibited. Only personal lecture notes, laboratory observation logs, and open collegiate materials are admitted.
                </p>
              </div>
            </div>
          )}

          {activeModal === 'verification' && (
            <div className="space-y-4">
              <p>
                Every resource awarded the amber <strong className="text-[#604100]">"Verified by teacher"</strong> badge undergoes a formal 3-tier validation protocol:
              </p>
              <ol className="list-decimal list-inside space-y-2.5 pl-1">
                <li>
                  <strong className="text-[#1c1b19]">Syllabus Alignment Check:</strong> The document is mapped against the university curriculum modules (Units 1 to 5) to ensure syllabus compliance.
                </li>
                <li>
                  <strong className="text-[#1c1b19]">Formula & Derivation Scrutiny:</strong> Faculty peer evaluators review mathematical derivations, algorithms, and SQL scripts for correctness.
                </li>
                <li>
                  <strong className="text-[#1c1b19]">Cryptographic Hash & Archive Seal:</strong> Once verified, an immutable cryptographic stamp is generated to preserve integrity.
                </li>
              </ol>
              <div className="p-3 rounded-lg bg-[#ffdeae]/40 border border-[#ffba3e]/40 text-[#604100] text-[11px]">
                Faculty members interested in joining the peer scrutiny committee may contact their respective Department Dean.
              </div>
            </div>
          )}

          {activeModal === 'report' && (
            <>
              {reportSubmitted ? (
                <div className="p-6 text-center space-y-2 bg-[#bceed3]/30 rounded-xl border border-[#a1d1b8]">
                  <span className="material-symbols-outlined text-[36px] text-[#023625]">
                    task_alt
                  </span>
                  <h4 className="font-semibold text-sm text-[#023625]">
                    Inaccuracy Report Logged
                  </h4>
                  <p className="text-xs text-[#414944]">
                    Our faculty peer curators will review this item within 48 hours. Thank you for maintaining archival accuracy!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReportSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#717973] uppercase mb-1">
                      Resource Title / ID
                    </label>
                    <input
                      type="text"
                      required
                      value={reportNoteId}
                      onChange={(e) => setReportNoteId(e.target.value)}
                      placeholder="e.g. DBMS Normalization Handout (CS402)"
                      className="w-full px-3 py-2 bg-white rounded-lg border border-[#e6e2de] text-xs focus:outline-none focus:border-[#023625]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#717973] uppercase mb-1">
                      Nature of Issue
                    </label>
                    <select
                      value={reportIssue}
                      onChange={(e) => setReportIssue(e.target.value)}
                      className="w-full px-2.5 py-2 bg-white rounded-lg border border-[#e6e2de] text-xs focus:outline-none focus:border-[#023625]"
                    >
                      <option>Typo in formula or derivation</option>
                      <option>Incorrect PYQ solution or key</option>
                      <option>Outdated syllabus or superseded regulation</option>
                      <option>Poor scan resolution or illegible handwriting</option>
                      <option>Missing pages or corrupted PDF</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#717973] uppercase mb-1">
                      Correction Details
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={reportDetails}
                      onChange={(e) => setReportDetails(e.target.value)}
                      placeholder="Specify the page number, problem number, and suggested correct proof or explanation..."
                      className="w-full px-3 py-2 bg-white rounded-lg border border-[#e6e2de] text-xs focus:outline-none focus:border-[#023625]"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-3.5 py-1.5 rounded-lg bg-[#f2ede9] text-[#414944]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-[#023625] text-white font-medium hover:bg-[#1f4d3a]"
                    >
                      Submit Report
                    </button>
                  </div>
                </form>
              )}
            </>
          )}

          {activeModal === 'contact' && (
            <div className="space-y-3">
              <p className="text-xs text-[#717973]">
                Contact your departmental archival delegates for physical syllabus handouts, lab equipment manuals, or verification questions.
              </p>
              <div className="space-y-2.5">
                {DEPT_REPS.map((rep, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#fdf8f5] border border-[#e6e2de] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[#1c1b19]">{rep.name}</span>
                      <span className="text-[11px] text-[#023625] font-medium bg-[#bceed3]/30 px-2 py-0.5 rounded">
                        {rep.role}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#717973]">{rep.department}</p>
                    <div className="pt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#414944]">
                      <span>Email: <strong className="text-[#1c1b19]">{rep.email}</strong></span>
                      <span>Room: {rep.room}</span>
                      <span>Hours: {rep.officeHours}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#fdf8f5] border-t border-[#e6e2de] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#f2ede9] hover:bg-[#ece7e4] text-[#1c1b19] font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
