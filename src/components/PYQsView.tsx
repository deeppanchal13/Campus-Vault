import React, { useState } from 'react';
import { AcademicResource } from '../types';

interface PYQsViewProps {
  resources: AcademicResource[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onOpenResource: (resource: AcademicResource) => void;
  onDownload: (resource: AcademicResource) => void;
}

export const PYQsView: React.FC<PYQsViewProps> = ({
  resources,
  savedIds,
  onToggleSave,
  onOpenResource,
  onDownload,
}) => {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [onlySolved, setOnlySolved] = useState(false);
  const [searchPaper, setSearchPaper] = useState('');

  const pyqResources = resources.filter((r) => r.type === 'pyq');

  const filteredPYQs = pyqResources.filter((item) => {
    if (selectedYear !== 'all' && item.year !== selectedYear) return false;
    if (onlySolved && !item.hasSolutions) return false;
    if (searchPaper.trim()) {
      const q = searchPaper.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.subject.toLowerCase().includes(q) ||
        item.verifierName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="pb-16 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="pt-8 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e6e2de]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdeae]/50 text-[#604100] text-[11px] font-semibold mb-3 tracking-wide border border-[#ffba3e]/40">
            <span className="material-symbols-outlined text-[14px] text-[#7f5700]">history_edu</span>
            <span>Official University Question Archives • 2018–2024</span>
          </div>
          <h1 className="font-serif-editorial text-[32px] sm:text-[38px] text-[#1c1b19] tracking-tight font-medium">
            Past University Question Papers
          </h1>
          <p className="text-[14px] text-[#414944] mt-1 max-w-xl">
            Authentic end-semester and mid-term examination schemes with faculty solutions and marking keys.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <span className="material-symbols-outlined text-[#717973] absolute left-3 top-2.5 text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchPaper}
            onChange={(e) => setSearchPaper(e.target.value)}
            placeholder="Filter past papers..."
            className="w-full pl-9 pr-3 py-2 bg-white rounded-lg border border-[#e6e2de] text-xs text-[#1c1b19] placeholder:text-[#717973] focus:outline-none focus:border-[#023625]"
          />
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-[#e6e2de]">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[#717973] font-medium mr-1">Year:</span>
          <button
            onClick={() => setSelectedYear('all')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              selectedYear === 'all'
                ? 'bg-[#023625] text-white'
                : 'bg-[#f7f3ef] text-[#414944] hover:bg-[#ece7e4]'
            }`}
          >
            All Years
          </button>
          {[2024, 2023, 2022, 2021, 2020].map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                selectedYear === yr
                  ? 'bg-[#023625] text-white'
                  : 'bg-[#f7f3ef] text-[#414944] hover:bg-[#ece7e4]'
              }`}
            >
              {yr}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 cursor-pointer text-xs text-[#414944] font-medium select-none">
          <input
            type="checkbox"
            checked={onlySolved}
            onChange={(e) => setOnlySolved(e.target.checked)}
            className="rounded text-[#023625] focus:ring-[#023625]"
          />
          <span>Only Solved with Marking Scheme</span>
        </label>
      </div>

      {/* Papers List */}
      <div className="bg-white rounded-xl border border-[#e6e2de] shadow-[0_2px_8px_rgba(28,27,25,0.03)] overflow-hidden divide-y divide-[#e6e2de]">
        {filteredPYQs.length === 0 ? (
          <div className="p-12 text-center text-[#717973] space-y-2">
            <span className="material-symbols-outlined text-[36px]">folder_open</span>
            <p className="text-sm font-medium">No question papers matching current filters</p>
            <button
              onClick={() => { setSelectedYear('all'); setOnlySolved(false); setSearchPaper(''); }}
              className="text-xs text-[#023625] underline font-semibold"
            >
              Reset PYQ filters
            </button>
          </div>
        ) : (
          filteredPYQs.map((paper) => {
            const isSaved = savedIds.includes(paper.id);
            return (
              <div
                key={paper.id}
                className="p-4 sm:p-5 hover:bg-[#f7f3ef]/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#f2ede9] text-[#414944]">
                      {paper.subject}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#bceed3]/50 text-[#002114]">
                      {paper.year} {paper.examType || 'Exam'}
                    </span>
                    {paper.hasSolutions && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#ffdeae]/60 text-[#604100]">
                        <span className="material-symbols-outlined text-[13px] text-[#7f5700]">task_alt</span>
                        <span>Solved with Rubric</span>
                      </span>
                    )}
                    <span className="text-[12px] text-[#717973]">
                      {paper.fileSize} • {paper.pages} pages
                    </span>
                  </div>

                  <h3
                    onClick={() => onOpenResource(paper)}
                    className="text-[16px] font-semibold text-[#1c1b19] hover:text-[#023625] transition-colors cursor-pointer line-clamp-1"
                  >
                    {paper.title}
                  </h3>

                  <p className="text-[13px] text-[#414944] mt-1 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#717973]">school</span>
                    <span>Verified by {paper.verifierName} ({paper.facultyDept})</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => onToggleSave(paper.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      isSaved ? 'text-[#023625] bg-[#bceed3]/30' : 'text-[#717973] hover:bg-[#f2ede9]'
                    }`}
                    title={isSaved ? 'Bookmarked' : 'Save'}
                  >
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}>
                      {isSaved ? 'bookmark' : 'bookmark_border'}
                    </span>
                  </button>
                  <button
                    onClick={() => onDownload(paper)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#f2ede9] hover:bg-[#ece7e4] text-[#1c1b19] text-[13px] font-medium transition-colors border border-[#e6e2de]"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span>Download</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
