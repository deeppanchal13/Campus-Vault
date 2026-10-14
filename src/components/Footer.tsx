import React from 'react';
import { InfoModalType } from './InfoModals';

interface FooterProps {
  onOpenInfoModal: (type: InfoModalType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInfoModal }) => {
  return (
    <footer className="w-full bg-[#f7f3ef] border-t border-[#e6e2de] mt-16 py-10 shadow-[0_-1px_8px_rgba(0,0,0,0.02)]">
      <div className="max-w-[1120px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Column: Credential badge & summary */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7f5700] text-[18px]">verified</span>
            <span className="text-[16px] font-semibold text-[#1c1b19]">Faculty Verified Repository</span>
          </div>
          <p className="text-[13px] text-[#414944] mt-1 text-center md:text-left">
            Curated, peer-reviewed collegiate course notes, papers, and archives.
          </p>
        </div>

        {/* Right Column: Links & Copyright */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#414944]">
          <button
            onClick={() => onOpenInfoModal('guidelines')}
            className="hover:text-[#1c1b19] transition-colors cursor-pointer"
          >
            Academic Guidelines
          </button>
          <span className="text-[#c0c9c2]">•</span>
          <button
            onClick={() => onOpenInfoModal('guidelines')}
            className="hover:text-[#1c1b19] transition-colors cursor-pointer"
          >
            Curator Code
          </button>
          <span className="text-[#c0c9c2]">•</span>
          <button
            onClick={() => onOpenInfoModal('verification')}
            className="hover:text-[#1c1b19] transition-colors cursor-pointer"
          >
            Verification Protocol
          </button>
          <span className="text-[#c0c9c2]">•</span>
          <span className="text-[11px] text-[#717973]">
            © 2025 CampusVault. Collegiate Archival Press.
          </span>
        </div>

      </div>
    </footer>
  );
};
