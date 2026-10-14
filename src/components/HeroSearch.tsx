import React, { useState } from 'react';
import { ResourceType } from '../types';

interface HeroSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType: ResourceType;
  setSelectedType: (type: ResourceType) => void;
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  selectedSemester: number | 'all';
  setSelectedSemester: (sem: number | 'all') => void;
  availableSubjects: string[];
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  selectedSubject,
  setSelectedSubject,
  selectedSemester,
  setSelectedSemester,
  availableSubjects,
}) => {
  const [subjectDropdownOpen, setSubjectDropdownOpen] = useState(false);
  const [semDropdownOpen, setSemDropdownOpen] = useState(false);

  const quickHints = [
    'DBMS normalization',
    'OS scheduling',
    'B-Trees',
    'Microprocessors PYQ 2023',
  ];

  const handleQuickHint = (hint: string) => {
    setSearchQuery(hint);
  };

  const handleClearFilters = () => {
    setSelectedType('all');
    setSelectedSubject('all');
    setSelectedSemester('all');
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedType !== 'all' ||
    selectedSubject !== 'all' ||
    selectedSemester !== 'all' ||
    searchQuery.trim().length > 0;

  return (
    <section className="pt-8 pb-10 flex flex-col items-center text-center">
      {/* Archival Subtitle / Department Metadata Marker */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ece7e4]/70 border border-[#e6e2de] text-[#414944] text-[12px] font-medium mb-5 tracking-wide">
        <span className="material-symbols-outlined text-[15px] text-[#023625]">local_library</span>
        <span>Faculty Endorsed Collegiate Repository • Spring 2025 Cycle</span>
      </div>

      {/* Main Editorial Serif Heading */}
      <h1 className="font-serif-editorial text-[36px] sm:text-[44px] md:text-[48px] text-[#1c1b19] tracking-tight leading-[1.15] max-w-2xl text-center font-normal">
        Find your notes and papers in one place
      </h1>
      <p className="text-[15px] md:text-[16px] text-[#414944] max-w-lg mt-2.5 leading-relaxed font-normal">
        Curated academic transcripts, lecture handouts, and verified past university question schemes.
      </p>

      {/* Search Input Group */}
      <div className="w-full max-w-3xl mt-8">
        <form
          className="relative flex items-center bg-white p-1.5 rounded-xl border border-[#e6e2de] shadow-[0_2px_12px_rgba(28,27,25,0.04)] focus-within:ring-2 focus-within:ring-[#023625]/20 focus-within:border-[#023625] transition-all"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <span className="material-symbols-outlined text-[#717973] ml-3 text-[22px]">search</span>
          <input
            id="vault-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent px-3 py-2.5 text-[15px] text-[#1c1b19] placeholder:text-[#717973] focus:outline-none"
            placeholder="Search topics, question papers, syllabus, or teacher notes..."
            type="search"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mr-2 p-1 text-[#717973] hover:text-[#1c1b19] rounded-md transition-colors"
              title="Clear search"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
          <button
            type="submit"
            className="shrink-0 inline-flex items-center gap-1.5 bg-[#023625] text-white hover:bg-[#1f4d3a] px-5 py-2.5 rounded-lg text-[13px] font-medium transition-all active:scale-[0.99] cursor-pointer shadow-xs"
          >
            <span>Search</span>
          </button>
        </form>

        {/* Quick Hint Search Line */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mt-3 text-[13px] text-[#414944]">
          <span className="text-[#717973] font-medium">Try:</span>
          {quickHints.map((hint, idx) => (
            <React.Fragment key={hint}>
              <button
                type="button"
                onClick={() => handleQuickHint(hint)}
                className="underline decoration-[#c0c9c2] hover:text-[#1c1b19] hover:decoration-[#023625] transition-colors cursor-pointer text-left"
              >
                {hint}
              </button>
              {idx < quickHints.length - 1 && <span className="text-[#c0c9c2]">•</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Quick Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          
          {/* All Resources Pill */}
          <button
            type="button"
            onClick={() => setSelectedType('all')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors border ${
              selectedType === 'all'
                ? 'bg-[#bceed3]/50 text-[#023625] border-[#a1d1b8]'
                : 'bg-white text-[#414944] border-[#e6e2de] hover:bg-[#ece7e4]'
            }`}
          >
            {selectedType === 'all' && (
              <span
                className="material-symbols-outlined text-[15px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            )}
            <span>All Resources</span>
          </button>

          {/* Subject Dropdown Pill */}
          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={() => {
                setSubjectDropdownOpen(!subjectDropdownOpen);
                setSemDropdownOpen(false);
              }}
              className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors border ${
                selectedSubject !== 'all'
                  ? 'bg-[#bceed3]/40 text-[#023625] border-[#a1d1b8]'
                  : 'bg-white text-[#414944] border-[#e6e2de] hover:bg-[#ece7e4]'
              }`}
            >
              <span>{selectedSubject === 'all' ? 'Subject' : selectedSubject}</span>
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>

            {subjectDropdownOpen && (
              <div className="absolute left-0 mt-2 w-52 bg-white rounded-xl shadow-[0_4px_16px_rgba(28,27,25,0.08)] border border-[#e6e2de] py-1.5 z-30 text-left">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSubject('all');
                    setSubjectDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-[#f7f3ef] ${
                    selectedSubject === 'all' ? 'text-[#023625] font-semibold bg-[#bceed3]/20' : 'text-[#414944]'
                  }`}
                >
                  All Subjects
                </button>
                {availableSubjects.map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => {
                      setSelectedSubject(sub);
                      setSubjectDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-[#f7f3ef] truncate ${
                      selectedSubject === sub ? 'text-[#023625] font-semibold bg-[#bceed3]/20' : 'text-[#414944]'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Semester Dropdown Pill */}
          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={() => {
                setSemDropdownOpen(!semDropdownOpen);
                setSubjectDropdownOpen(false);
              }}
              className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors border ${
                selectedSemester !== 'all'
                  ? 'bg-[#bceed3]/40 text-[#023625] border-[#a1d1b8]'
                  : 'bg-white text-[#414944] border-[#e6e2de] hover:bg-[#ece7e4]'
              }`}
            >
              <span>{selectedSemester === 'all' ? 'Semester' : `Semester ${selectedSemester}`}</span>
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>

            {semDropdownOpen && (
              <div className="absolute left-0 mt-2 w-44 bg-white rounded-xl shadow-[0_4px_16px_rgba(28,27,25,0.08)] border border-[#e6e2de] py-1.5 z-30 text-left">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSemester('all');
                    setSemDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-[#f7f3ef] ${
                    selectedSemester === 'all' ? 'text-[#023625] font-semibold bg-[#bceed3]/20' : 'text-[#414944]'
                  }`}
                >
                  All Semesters
                </button>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <button
                    key={sem}
                    type="button"
                    onClick={() => {
                      setSelectedSemester(sem);
                      setSemDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-[#f7f3ef] ${
                      selectedSemester === sem ? 'text-[#023625] font-semibold bg-[#bceed3]/20' : 'text-[#414944]'
                    }`}
                  >
                    Semester {sem}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notes Pill */}
          <button
            type="button"
            onClick={() => setSelectedType(selectedType === 'notes' ? 'all' : 'notes')}
            className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors border ${
              selectedType === 'notes'
                ? 'bg-[#023625] text-white border-[#023625]'
                : 'bg-white text-[#414944] border-[#e6e2de] hover:bg-[#ece7e4] hover:text-[#1c1b19]'
            }`}
          >
            Notes
          </button>

          {/* PYQ Pill */}
          <button
            type="button"
            onClick={() => setSelectedType(selectedType === 'pyq' ? 'all' : 'pyq')}
            className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors border ${
              selectedType === 'pyq'
                ? 'bg-[#023625] text-white border-[#023625]'
                : 'bg-white text-[#414944] border-[#e6e2de] hover:bg-[#ece7e4] hover:text-[#1c1b19]'
            }`}
          >
            PYQ (Previous Years)
          </button>

          {/* Cheat Sheets Pill */}
          <button
            type="button"
            onClick={() => setSelectedType(selectedType === 'cheatsheet' ? 'all' : 'cheatsheet')}
            className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors border ${
              selectedType === 'cheatsheet'
                ? 'bg-[#023625] text-white border-[#023625]'
                : 'bg-white text-[#414944] border-[#e6e2de] hover:bg-[#ece7e4] hover:text-[#1c1b19]'
            }`}
          >
            Cheat Sheets
          </button>

          {/* Reset Filters if any active */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] font-medium text-[#ba1a1a] bg-[#ffdad6]/40 hover:bg-[#ffdad6]/70 transition-colors"
              title="Reset all search & filters"
            >
              <span className="material-symbols-outlined text-[14px]">restart_alt</span>
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
