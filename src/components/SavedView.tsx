import React, { useState } from 'react';
import { AcademicResource } from '../types';

interface SavedViewProps {
  resources: AcademicResource[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onOpenResource: (resource: AcademicResource) => void;
  onDownload: (resource: AcademicResource) => void;
  onNavigateHome: () => void;
}

export const SavedView: React.FC<SavedViewProps> = ({
  resources,
  savedIds,
  onToggleSave,
  onOpenResource,
  onDownload,
  onNavigateHome,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'notes' | 'pyq' | 'cheatsheet'>('all');

  const savedResources = resources.filter((r) => savedIds.includes(r.id));
  const filtered = savedResources.filter((r) => {
    if (filterType !== 'all' && r.type !== filterType) return false;
    return true;
  });

  return (
    <div className="pb-16 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="pt-8 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e6e2de]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#bceed3]/40 text-[#002114] text-[11px] font-semibold mb-3 tracking-wide border border-[#a1d1b8]">
            <span className="material-symbols-outlined text-[14px] text-[#023625]">bookmarks</span>
            <span>Personal Study Desk</span>
          </div>
          <h1 className="font-serif-editorial text-[32px] sm:text-[38px] text-[#1c1b19] tracking-tight font-medium">
            Saved Notes & Exam References
          </h1>
          <p className="text-[14px] text-[#414944] mt-1 max-w-xl">
            Quick-access offline bookmark vault for revision, solved question papers, and high-yield formula sheets.
          </p>
        </div>

        {savedResources.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#717973]">
              {savedResources.length} items bookmarked
            </span>
          </div>
        )}
      </div>

      {savedResources.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e6e2de] p-12 text-center max-w-lg mx-auto shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#f2ede9] text-[#717973] flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[24px]">bookmark_border</span>
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#1c1b19]">Your Saved Desk is Empty</h3>
            <p className="text-xs text-[#717973] mt-1 leading-relaxed">
              Click the bookmark icon on any lecture note, PYQ, or formula cheat sheet to save it here for fast revision before exams.
            </p>
          </div>
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#023625] text-white text-xs font-medium hover:bg-[#1f4d3a] transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">search</span>
            <span>Browse Academic Vault</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Filter pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-full text-xs font-medium border ${
                filterType === 'all'
                  ? 'bg-[#023625] text-white border-[#023625]'
                  : 'bg-white text-[#414944] border-[#e6e2de]'
              }`}
            >
              All Bookmarks ({savedResources.length})
            </button>
            <button
              onClick={() => setFilterType('notes')}
              className={`px-3 py-1 rounded-full text-xs font-medium border ${
                filterType === 'notes'
                  ? 'bg-[#023625] text-white border-[#023625]'
                  : 'bg-white text-[#414944] border-[#e6e2de]'
              }`}
            >
              Lecture Notes
            </button>
            <button
              onClick={() => setFilterType('pyq')}
              className={`px-3 py-1 rounded-full text-xs font-medium border ${
                filterType === 'pyq'
                  ? 'bg-[#023625] text-white border-[#023625]'
                  : 'bg-white text-[#414944] border-[#e6e2de]'
              }`}
            >
              Solved PYQs
            </button>
            <button
              onClick={() => setFilterType('cheatsheet')}
              className={`px-3 py-1 rounded-full text-xs font-medium border ${
                filterType === 'cheatsheet'
                  ? 'bg-[#023625] text-white border-[#023625]'
                  : 'bg-white text-[#414944] border-[#e6e2de]'
              }`}
            >
              Formula Sheets
            </button>
          </div>

          {/* List */}
          <div className="bg-white rounded-xl border border-[#e6e2de] shadow-[0_2px_8px_rgba(28,27,25,0.03)] overflow-hidden divide-y divide-[#e6e2de]">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 hover:bg-[#f7f3ef]/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#f2ede9] text-[#414944]">
                      {item.subject}
                    </span>
                    {item.isVerified && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#ffdeae]/60 text-[#604100]">
                        <span className="material-symbols-outlined text-[13px] text-[#7f5700]">verified</span>
                        <span>Verified by teacher</span>
                      </span>
                    )}
                    <span className="text-[12px] text-[#717973]">
                      {item.fileSize} • {item.pages} pages
                    </span>
                  </div>

                  <h3
                    onClick={() => onOpenResource(item)}
                    className="text-[16px] font-semibold text-[#1c1b19] hover:text-[#023625] transition-colors cursor-pointer line-clamp-1"
                  >
                    {item.title}
                  </h3>

                  <p className="text-[13px] text-[#414944] mt-1 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#717973]">school</span>
                    <span>{item.verifierName} ({item.facultyDept})</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => onToggleSave(item.id)}
                    className="p-2 rounded-lg text-[#023625] bg-[#bceed3]/30 hover:bg-[#ffdad6] hover:text-[#ba1a1a] transition-colors"
                    title="Remove from saved"
                  >
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      bookmark
                    </span>
                  </button>
                  <button
                    onClick={() => onDownload(item)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#f2ede9] hover:bg-[#ece7e4] text-[#1c1b19] text-[13px] font-medium transition-colors border border-[#e6e2de]"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
