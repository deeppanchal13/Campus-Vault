import React from 'react';
import { SubjectModule } from '../types';

interface SubjectCardProps {
  subject: SubjectModule;
  onSelect: (subject: SubjectModule) => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(subject)}
      className="group p-5 bg-white rounded-xl border border-[#e6e2de] shadow-[0_2px_6px_rgba(28,27,25,0.03)] hover:border-[#a1d1b8] hover:-translate-y-0.5 transition-all flex flex-col justify-between cursor-pointer select-none"
    >
      <div>
        {/* Icon */}
        <div className="w-9 h-9 rounded-lg bg-[#bceed3]/50 text-[#023625] flex items-center justify-center mb-3 group-hover:bg-[#023625] group-hover:text-white transition-colors">
          <span className="material-symbols-outlined text-[20px]">{subject.iconName}</span>
        </div>

        {/* Title */}
        <h3 className="text-[17px] font-semibold text-[#1c1b19] group-hover:text-[#023625] transition-colors leading-tight">
          {subject.name}
        </h3>

        {/* Description */}
        <p className="text-[13px] text-[#414944] mt-1.5 line-clamp-2 leading-relaxed">
          {subject.description}
        </p>
      </div>

      {/* Bottom Info Row */}
      <div className="mt-4 pt-3 border-t border-[#f2ede9] flex items-center justify-between text-[#414944] text-[11px] font-semibold">
        <span>
          {subject.notesCount} Notes • {subject.pyqsCount} PYQs {subject.pyqYears ? `(${subject.pyqYears})` : ''}
        </span>
        <span className="material-symbols-outlined text-[16px] text-[#717973] group-hover:text-[#023625] group-hover:translate-x-0.5 transition-all">
          arrow_forward
        </span>
      </div>
    </div>
  );
};
