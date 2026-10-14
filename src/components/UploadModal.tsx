import React, { useState } from 'react';
import { AcademicResource } from '../types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddResource: (resource: AcademicResource) => void;
  availableSubjects: string[];
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onAddResource,
  availableSubjects,
}) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState(availableSubjects[0] || 'DBMS');
  const [semester, setSemester] = useState(4);
  const [type, setType] = useState<'notes' | 'pyq' | 'cheatsheet' | 'lab'>('notes');
  const [verifierName, setVerifierName] = useState('Prof. R. Sharma');
  const [facultyDept, setFacultyDept] = useState('Dept. of CSE');
  const [keyTopicsStr, setKeyTopicsStr] = useState('Unit 3, Normalization, Decomposition');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string>('2.1 MB PDF');
  const [agreedCode, setAgreedCode] = useState(true);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB PDF`);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const keyTopics = keyTopicsStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newResource: AcademicResource = {
      id: `res-${Date.now()}`,
      title: title.trim(),
      subject,
      subjectCode: `${subject.slice(0, 2).toUpperCase()}${semester}01`,
      semester,
      type,
      isVerified: true,
      verifierName: verifierName.trim() || 'Faculty Endorsed',
      facultyDept: facultyDept.trim() || 'Dept. of Engineering',
      dateUploaded: 'Just now',
      fileSize: fileName ? fileSize : '2.2 MB PDF',
      pages: Math.floor(Math.random() * 20) + 12,
      downloadsCount: 1,
      description: description.trim() || `Authentic lecture and study material for ${subject} submitted to the collegiate archives.`,
      keyTopics: keyTopics.length > 0 ? keyTopics : ['Exam Preparation', 'Core Syllabus', 'Review Problems'],
      sampleContentSnippet: `Archived Contribution: ${title}\nSubject: ${subject} (Semester ${semester})\nVerified by: ${verifierName} (${facultyDept})\n\nThis material has been indexed into the collegiate repository for peer study and review.`
    };

    onAddResource(newResource);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1c1b19]/40 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl border border-[#e6e2de] shadow-[0_8px_32px_rgba(28,27,25,0.12)] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#fdf8f5] border-b border-[#e6e2de] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#023625] flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[17px]">upload_file</span>
            </div>
            <div>
              <h3 className="font-serif-editorial text-[18px] text-[#1c1b19] font-medium leading-tight">
                Deposit to Academic Vault
              </h3>
              <p className="text-[11px] text-[#717973]">
                Peer uploads earn academic recognition and faculty review
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white border border-[#e6e2de] text-[#717973] hover:text-[#1c1b19] hover:bg-[#f7f3ef] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* File Dropzone Simulator */}
          <div className="border-2 border-dashed border-[#c0c9c2] hover:border-[#023625] rounded-xl p-5 text-center bg-[#fdf8f5] transition-colors cursor-pointer relative">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <span className="material-symbols-outlined text-[32px] text-[#1f4d3a] mb-1">
              cloud_upload
            </span>
            <p className="font-medium text-[#1c1b19] text-xs">
              {fileName ? fileName : 'Click to select or drag PDF file here'}
            </p>
            <p className="text-[11px] text-[#717973] mt-0.5">
              Supports scanned handwritten notes, solved papers, and lecture slides (Max 50MB)
            </p>
          </div>

          {/* Title */}
          <div>
            <label className="block text-[11px] font-semibold text-[#414944] uppercase mb-1">
              Document Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Relational Calculus & Query Optimization Solved Handout"
              className="w-full px-3 py-2 bg-white rounded-lg border border-[#e6e2de] text-xs text-[#1c1b19] placeholder:text-[#717973] focus:outline-none focus:border-[#023625]"
            />
          </div>

          {/* Grid: Subject, Semester, Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#414944] uppercase mb-1">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-2.5 py-2 bg-white rounded-lg border border-[#e6e2de] text-xs text-[#1c1b19] focus:outline-none focus:border-[#023625]"
              >
                {availableSubjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#414944] uppercase mb-1">
                Semester
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
                className="w-full px-2.5 py-2 bg-white rounded-lg border border-[#e6e2de] text-xs text-[#1c1b19] focus:outline-none focus:border-[#023625]"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#414944] uppercase mb-1">
                Resource Category
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-2.5 py-2 bg-white rounded-lg border border-[#e6e2de] text-xs text-[#1c1b19] focus:outline-none focus:border-[#023625]"
              >
                <option value="notes">Lecture Notes</option>
                <option value="pyq">Past Year Paper (PYQ)</option>
                <option value="cheatsheet">Formula / Cheat Sheet</option>
                <option value="lab">Lab Manual</option>
              </select>
            </div>
          </div>

          {/* Faculty Endorsement Attribution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#414944] uppercase mb-1">
                Teacher / Professor in Charge
              </label>
              <input
                type="text"
                value={verifierName}
                onChange={(e) => setVerifierName(e.target.value)}
                placeholder="e.g. Prof. R. Sharma"
                className="w-full px-3 py-2 bg-white rounded-lg border border-[#e6e2de] text-xs text-[#1c1b19] focus:outline-none focus:border-[#023625]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#414944] uppercase mb-1">
                Department
              </label>
              <input
                type="text"
                value={facultyDept}
                onChange={(e) => setFacultyDept(e.target.value)}
                placeholder="e.g. Dept. of CSE"
                className="w-full px-3 py-2 bg-white rounded-lg border border-[#e6e2de] text-xs text-[#1c1b19] focus:outline-none focus:border-[#023625]"
              />
            </div>
          </div>

          {/* Key Topics */}
          <div>
            <label className="block text-[11px] font-semibold text-[#414944] uppercase mb-1">
              Key Syllabus Topics (comma separated)
            </label>
            <input
              type="text"
              value={keyTopicsStr}
              onChange={(e) => setKeyTopicsStr(e.target.value)}
              placeholder="e.g. BCNF, Functional Dependencies, Canonical Cover"
              className="w-full px-3 py-2 bg-white rounded-lg border border-[#e6e2de] text-xs text-[#1c1b19] focus:outline-none focus:border-[#023625]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] font-semibold text-[#414944] uppercase mb-1">
              Brief Abstract or Notes
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Outline what questions or theory are addressed in this document..."
              className="w-full px-3 py-2 bg-white rounded-lg border border-[#e6e2de] text-xs text-[#1c1b19] focus:outline-none focus:border-[#023625]"
            />
          </div>

          {/* Academic Honour Code Checkbox */}
          <div className="flex items-start gap-2 pt-2">
            <input
              type="checkbox"
              id="honour-code"
              checked={agreedCode}
              onChange={(e) => setAgreedCode(e.target.checked)}
              className="mt-0.5 rounded text-[#023625] focus:ring-[#023625]"
            />
            <label htmlFor="honour-code" className="text-[11px] text-[#414944] leading-snug cursor-pointer">
              I certify that these academic notes are my own work or legitimate collegiate classroom transcripts, free of unauthorized copyrighted commercial materials.
            </label>
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-[#e6e2de] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#f2ede9] hover:bg-[#ece7e4] text-[#1c1b19] font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!agreedCode || !title.trim()}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#023625] hover:bg-[#1f4d3a] disabled:opacity-50 text-white font-medium shadow-xs transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[16px]">publish</span>
              <span>Submit for Verification</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
