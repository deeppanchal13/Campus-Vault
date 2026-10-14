import React, { useState } from 'react';
import { SubjectModule, AcademicResource } from '../types';

interface SubjectsViewProps {
  subjects: SubjectModule[];
  resources: AcademicResource[];
  onSelectSubjectFilter: (subjectName: string) => void;
  onOpenResource: (resource: AcademicResource) => void;
}

export const SubjectsView: React.FC<SubjectsViewProps> = ({
  subjects,
  resources,
  onSelectSubjectFilter,
  onOpenResource,
}) => {
  const [selectedSemFilter, setSelectedSemFilter] = useState<number | 'all'>('all');
  const [expandedSubjectId, setExpandedSubjectId] = useState<string | null>(subjects[0]?.id || null);

  const filteredSubjects = subjects.filter((s) => {
    if (selectedSemFilter !== 'all' && s.semester !== selectedSemFilter) return false;
    return true;
  });

  const getSubjectResources = (subName: string) => {
    return resources.filter((r) => r.subject.toLowerCase().includes(subName.toLowerCase()) || subName.toLowerCase().includes(r.subject.toLowerCase()));
  };

  return (
    <div className="pb-16 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="pt-8 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e6e2de]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ece7e4]/70 text-[#414944] text-[11px] font-semibold mb-3 tracking-wide">
            <span className="material-symbols-outlined text-[14px] text-[#023625]">auto_stories</span>
            <span>B.Tech / B.E. Core Engineering Curriculum</span>
          </div>
          <h1 className="font-serif-editorial text-[32px] sm:text-[38px] text-[#1c1b19] tracking-tight font-medium">
            Syllabus & Subject Catalog
          </h1>
          <p className="text-[14px] text-[#414944] mt-1 max-w-xl">
            Explore approved module syllabi, unit topics, lecture transcripts, and course question banks.
          </p>
        </div>

        {/* Semester Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-xl border border-[#e6e2de]">
          <button
            onClick={() => setSelectedSemFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedSemFilter === 'all'
                ? 'bg-[#1f4d3a] text-white'
                : 'text-[#414944] hover:bg-[#f7f3ef]'
            }`}
          >
            All Semesters
          </button>
          {[3, 4, 5, 6].map((sem) => (
            <button
              key={sem}
              onClick={() => setSelectedSemFilter(sem)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedSemFilter === sem
                  ? 'bg-[#1f4d3a] text-white'
                  : 'text-[#414944] hover:bg-[#f7f3ef]'
              }`}
            >
              Sem {sem}
            </button>
          ))}
        </div>
      </div>

      {/* Subjects Accordion / Card Explorer */}
      <div className="space-y-4">
        {filteredSubjects.map((sub) => {
          const isExpanded = expandedSubjectId === sub.id;
          const subRes = getSubjectResources(sub.name);

          return (
            <div
              key={sub.id}
              className="bg-white rounded-xl border border-[#e6e2de] shadow-[0_2px_8px_rgba(28,27,25,0.03)] overflow-hidden transition-all"
            >
              {/* Header clickable */}
              <div
                onClick={() => setExpandedSubjectId(isExpanded ? null : sub.id)}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-[#fdf8f5] transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[#bceed3]/50 text-[#023625] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[22px]">{sub.iconName}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#f2ede9] text-[#414944]">
                        {sub.code}
                      </span>
                      <span className="text-[11px] font-medium text-[#717973]">
                        Semester {sub.semester}
                      </span>
                    </div>
                    <h3 className="text-[17px] font-semibold text-[#1c1b19] mt-0.5">
                      {sub.name}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-semibold text-[#1c1b19]">
                      {sub.notesCount} Notes • {sub.pyqsCount} PYQs
                    </span>
                    <p className="text-[11px] text-[#717973]">Verified repository</p>
                  </div>
                  <span className="material-symbols-outlined text-[20px] text-[#717973]">
                    {isExpanded ? 'expand_less' : 'expand_more'}
                  </span>
                </div>
              </div>

              {/* Expanded Syllabus & Resources */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-[#f2ede9] space-y-5 bg-[#fdf8f5]/40">
                  <p className="text-xs text-[#414944] leading-relaxed">
                    {sub.description}. Below are the official university course units mapped to available lecture transcripts and past exams.
                  </p>

                  {/* Syllabus Modules Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {sub.syllabusUnits.map((u) => (
                      <div
                        key={u.unit}
                        className="p-3.5 rounded-lg bg-white border border-[#e6e2de] text-xs space-y-1.5"
                      >
                        <div className="font-semibold text-[#1c1b19] flex items-center justify-between">
                          <span>Unit {u.unit}: {u.title}</span>
                          <span className="text-[10px] text-[#717973] uppercase font-mono">Exam Unit</span>
                        </div>
                        <ul className="space-y-1 text-[#414944] text-[11px]">
                          {u.topics.map((t, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1f4d3a]"></span>
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Immediate Resources for this subject */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#717973]">
                        Available Materials for {sub.name} ({subRes.length})
                      </h4>
                      <button
                        onClick={() => onSelectSubjectFilter(sub.name)}
                        className="text-xs text-[#023625] font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        <span>Filter in Main Repository</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {subRes.map((r) => (
                        <div
                          key={r.id}
                          onClick={() => onOpenResource(r)}
                          className="p-3 rounded-lg bg-white border border-[#e6e2de] hover:border-[#a1d1b8] flex items-center justify-between gap-3 cursor-pointer transition-all"
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-[#1c1b19] truncate">{r.title}</p>
                            <p className="text-[11px] text-[#717973] mt-0.5">
                              {r.verifierName} • {r.fileSize}
                            </p>
                          </div>
                          <span className="shrink-0 text-xs text-[#023625] font-semibold flex items-center gap-1">
                            <span>Open</span>
                            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
