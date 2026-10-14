import React from 'react';
import { DEPARTMENTS, SEMESTERS } from '../data/mockData';

interface DepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSemester: number;
  currentDepartment: string;
  onSelect: (semester: number, department: string) => void;
}

export const DepartmentModal: React.FC<DepartmentModalProps> = ({
  isOpen,
  onClose,
  currentSemester,
  currentDepartment,
  onSelect,
}) => {
  if (!isOpen) return null;

  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1c1b19]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl border border-[#e6e2de] shadow-[0_8px_32px_rgba(28,27,25,0.12)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#fdf8f5] border-b border-[#e6e2de] flex items-center justify-between">
          <div>
            <h3 className="font-serif-editorial text-[18px] text-[#1c1b19] font-medium leading-tight">
              Select Curriculum Stream
            </h3>
            <p className="text-[11px] text-[#717973]">
              Configure your current academic term and engineering department
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white border border-[#e6e2de] text-[#717973] hover:text-[#1c1b19] hover:bg-[#f7f3ef] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Semester Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-[#717973] uppercase tracking-wider mb-2">
              Academic Semester
            </label>
            <div className="grid grid-cols-4 gap-2">
              {SEMESTERS.map((sem) => (
                <button
                  key={sem}
                  type="button"
                  onClick={() => onSelect(sem, currentDepartment)}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                    currentSemester === sem
                      ? 'bg-[#023625] text-white border-[#023625] shadow-xs'
                      : 'bg-[#fdf8f5] hover:bg-[#f2ede9] text-[#1c1b19] border-[#e6e2de]'
                  }`}
                >
                  Sem {romanNumerals[sem - 1]}
                </button>
              ))}
            </div>
          </div>

          {/* Department Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-[#717973] uppercase tracking-wider mb-2">
              Engineering Branch / Discipline
            </label>
            <div className="space-y-1.5">
              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => onSelect(currentSemester, dept)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                    currentDepartment === dept
                      ? 'bg-[#bceed3]/30 border-[#a1d1b8] text-[#023625]'
                      : 'bg-white hover:bg-[#fdf8f5] text-[#1c1b19] border-[#e6e2de]'
                  }`}
                >
                  <span>{dept}</span>
                  {currentDepartment === dept ? (
                    <span className="material-symbols-outlined text-[18px] text-[#023625]">check</span>
                  ) : (
                    <span className="material-symbols-outlined text-[16px] text-[#c0c9c2]">chevron_right</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-3 bg-[#fdf8f5] border-t border-[#e6e2de] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#023625] text-white text-xs font-medium hover:bg-[#1f4d3a] transition-colors"
          >
            Apply Selection
          </button>
        </div>
      </div>
    </div>
  );
};
