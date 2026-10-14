import React from 'react';
import { AcademicResource } from '../types';

interface ResourceItemProps {
  resource: AcademicResource;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelectResource: (resource: AcademicResource) => void;
  onDownload: (resource: AcademicResource) => void;
  isLast?: boolean;
}

export const ResourceItem: React.FC<ResourceItemProps> = ({
  resource,
  isSaved,
  onToggleSave,
  onSelectResource,
  onDownload,
  isLast = false,
}) => {
  return (
    <>
      <article className="p-4 sm:p-5 hover:bg-[#f7f3ef]/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 min-w-0 pr-2">
          
          {/* Metadata Badges Row */}
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#f2ede9] text-[#414944] border border-[#e6e2de]">
              {resource.subject}
            </span>

            {resource.isVerified && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#ffdeae]/50 text-[#604100] border border-[#ffba3e]/40">
                <span
                  className="material-symbols-outlined text-[13px] text-[#7f5700]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <span>Verified by teacher</span>
              </span>
            )}

            {resource.type === 'pyq' && (
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#bceed3]/40 text-[#002114] border border-[#a1d1b8]">
                PYQ {resource.year || ''}
              </span>
            )}

            {resource.hasSolutions && (
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#f2ede9] text-[#1f4d3a]">
                Solved Scheme
              </span>
            )}

            <span className="text-[13px] text-[#717973]">
              {resource.dateUploaded} • {resource.fileSize}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelectResource(resource)}
            className="text-[16px] font-semibold text-[#1c1b19] hover:text-[#023625] transition-colors cursor-pointer line-clamp-1 leading-snug"
            title={resource.title}
          >
            {resource.title}
          </h3>

          {/* Attribution Line */}
          <p className="text-[13px] text-[#414944] mt-1 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#717973]">school</span>
            <span>
              {resource.verifierName} ({resource.facultyDept})
            </span>
            {resource.pages > 0 && (
              <>
                <span className="text-[#c0c9c2]">•</span>
                <span className="text-[#717973]">{resource.pages} pages</span>
              </>
            )}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
          
          {/* Bookmark Button */}
          <button
            aria-label={isSaved ? 'Remove from saved' : 'Save for later'}
            onClick={() => onToggleSave(resource.id)}
            type="button"
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isSaved
                ? 'text-[#023625] bg-[#bceed3]/30 hover:bg-[#bceed3]/50'
                : 'text-[#717973] hover:text-[#1c1b19] hover:bg-[#f2ede9]'
            }`}
            title={isSaved ? 'Bookmarked in vault' : 'Bookmark note'}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
            >
              {isSaved ? 'bookmark' : 'bookmark_border'}
            </span>
          </button>

          {/* Download Button */}
          <button
            type="button"
            onClick={() => onDownload(resource)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#f2ede9] hover:bg-[#ece7e4] text-[#1c1b19] text-[13px] font-medium transition-colors border border-[#e6e2de] active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Download</span>
          </button>
        </div>
      </article>

      {!isLast && <div className="h-[1px] bg-[#ece7e4] mx-4" />}
    </>
  );
};
