/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { AcademicResource, ResourceType, SubjectModule } from './types';
import { INITIAL_RESOURCES, SUBJECT_MODULES } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroSearch } from './components/HeroSearch';
import { ResourceItem } from './components/ResourceItem';
import { SubjectCard } from './components/SubjectCard';
import { DocumentModal } from './components/DocumentModal';
import { UploadModal } from './components/UploadModal';
import { DepartmentModal } from './components/DepartmentModal';
import { InfoModals, InfoModalType } from './components/InfoModals';
import { SubjectsView } from './components/SubjectsView';
import { PYQsView } from './components/PYQsView';
import { SavedView } from './components/SavedView';
import { Footer } from './components/Footer';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'subjects' | 'pyqs' | 'saved'>('home');
  const [currentSemester, setCurrentSemester] = useState<number>(4);
  const [currentDepartment, setCurrentDepartment] = useState<string>('Computer Science');

  const [resources, setResources] = useState<AcademicResource[]>(INITIAL_RESOURCES);
  const [savedIds, setSavedIds] = useState<string[]>(['res-1']);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<ResourceType>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<number | 'all'>('all');

  const [selectedResource, setSelectedResource] = useState<AcademicResource | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isDeptModalOpen, setIsDeptModalOpen] = useState<boolean>(false);
  const [activeInfoModal, setActiveInfoModal] = useState<InfoModalType>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleToggleSave = (id: string) => {
    setSavedIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from your saved archive desk');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved to your archive desk');
        return [...prev, id];
      }
    });
  };

  const handleDownload = (resource: AcademicResource) => {
    showToast(`Downloading: ${resource.title.slice(0, 36)}...`);
    // Create a synthesized clean document file download
    const content = `CAMPUSVAULT ACADEMIC ARCHIVES
=========================================
Document ID: ${resource.id}
Title: ${resource.title}
Subject: ${resource.subject} (${resource.subjectCode})
Semester: ${resource.semester}
Faculty Endorser: ${resource.verifierName} (${resource.facultyDept})
Date of Verification: ${resource.dateUploaded}

KEY SYLLABUS TOPICS:
${resource.keyTopics.map((t, i) => `  ${i + 1}. ${t}`).join('\n')}

ABSTRACT / SYNOPSIS:
${resource.description}

ARCHIVAL EXCERPT & STUDY TRANSCRIPT:
-----------------------------------------
${resource.sampleContentSnippet || 'Official lecture and university exam archive transcript.'}

=========================================
CampusVault • Verified Collegiate Repository • Spring 2025
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resource.subject.replace(/[^a-zA-Z0-9]/g, '_')}_${resource.title.slice(0, 25).replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleAddResource = (newRes: AcademicResource) => {
    setResources((prev) => [newRes, ...prev]);
    showToast('Document uploaded successfully! Faculty review pending.');
  };

  const availableSubjectsList = useMemo(() => {
    const set = new Set<string>();
    SUBJECT_MODULES.forEach((m) => set.add(m.name));
    resources.forEach((r) => set.add(r.subject));
    return Array.from(set);
  }, [resources]);

  // Filter resources for home
  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      // Type filter
      if (selectedType !== 'all') {
        if (selectedType === 'notes' && res.type !== 'notes') return false;
        if (selectedType === 'pyq' && res.type !== 'pyq') return false;
        if (selectedType === 'cheatsheet' && res.type !== 'cheatsheet') return false;
        if (selectedType === 'lab' && res.type !== 'lab') return false;
      }

      // Subject filter
      if (selectedSubject !== 'all') {
        const matchesSub =
          res.subject.toLowerCase().includes(selectedSubject.toLowerCase()) ||
          selectedSubject.toLowerCase().includes(res.subject.toLowerCase());
        if (!matchesSub) return false;
      }

      // Semester filter
      if (selectedSemester !== 'all' && res.semester !== selectedSemester) {
        return false;
      }

      // Query filter
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = res.title.toLowerCase().includes(q);
        const matchesSub = res.subject.toLowerCase().includes(q);
        const matchesTeacher = res.verifierName.toLowerCase().includes(q);
        const matchesTopics = res.keyTopics.some((t) => t.toLowerCase().includes(q));
        const matchesDesc = res.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSub && !matchesTeacher && !matchesTopics && !matchesDesc) {
          return false;
        }
      }

      return true;
    });
  }, [resources, selectedType, selectedSubject, selectedSemester, searchQuery]);

  const handleSelectSubjectCard = (subj: SubjectModule) => {
    setSelectedSubject(subj.name);
    // Smooth scroll to uploads
    const el = document.getElementById('latest-uploads-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf8f5] text-[#1c1b19] flex flex-col font-sans selection:bg-[#bceed3] selection:text-[#023625]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#023625] text-white px-4 py-2.5 rounded-xl shadow-[0_4px_16px_rgba(2,54,37,0.25)] flex items-center gap-2 text-xs font-medium animate-in slide-in-from-bottom-2 duration-200">
          <span className="material-symbols-outlined text-[17px] text-[#ffdeae]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentSemester={currentSemester}
        currentDepartment={currentDepartment}
        onOpenDeptModal={() => setIsDeptModalOpen(true)}
        onOpenUploadModal={() => setIsUploadOpen(true)}
        savedCount={savedIds.length}
      />

      {/* Main Container */}
      <main className="w-full pt-16 flex-1 bg-[#fdf8f5]">
        <div className="max-w-[1120px] mx-auto px-4 md:px-8">
          
          {/* Tab 1: HOME */}
          {currentTab === 'home' && (
            <div className="flex flex-col w-full pb-16">
              
              {/* Hero Search Area */}
              <HeroSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                selectedSubject={selectedSubject}
                setSelectedSubject={setSelectedSubject}
                selectedSemester={selectedSemester}
                setSelectedSemester={setSelectedSemester}
                availableSubjects={availableSubjectsList}
              />

              {/* Editorial Section: Latest Uploads */}
              <section id="latest-uploads-section" className="mt-8">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
                  <div>
                    <h2 className="font-serif-editorial text-[26px] sm:text-[28px] text-[#1c1b19] font-medium tracking-tight">
                      Latest uploads
                    </h2>
                    <p className="text-[13px] text-[#414944] mt-0.5">
                      Authentic lecture notes and question papers uploaded this week
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedType('all');
                      setSelectedSubject('all');
                      setSelectedSemester('all');
                      setSearchQuery('');
                    }}
                    className="inline-flex items-center gap-1 text-[13px] font-medium text-[#023625] hover:text-[#1f4d3a] transition-colors group cursor-pointer"
                  >
                    <span>View all uploads</span>
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                </div>

                {/* Archival List Container */}
                <div className="bg-white rounded-xl border border-[#e6e2de] shadow-[0_2px_8px_rgba(28,27,25,0.03)] overflow-hidden">
                  {filteredResources.length === 0 ? (
                    <div className="p-12 text-center text-[#717973] space-y-3">
                      <span className="material-symbols-outlined text-[36px] text-[#c0c9c2]">
                        content_paste_search
                      </span>
                      <h4 className="font-medium text-sm text-[#1c1b19]">
                        No archives match your current filter
                      </h4>
                      <p className="text-xs text-[#717973] max-w-sm mx-auto">
                        Try clearing active search queries or subject tags to explore available lecture notes.
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedSubject('all');
                          setSelectedSemester('all');
                          setSelectedType('all');
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-[#023625] text-white text-xs font-medium hover:bg-[#1f4d3a] transition-colors"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    filteredResources.map((res, index) => (
                      <ResourceItem
                        key={res.id}
                        resource={res}
                        isSaved={savedIds.includes(res.id)}
                        onToggleSave={handleToggleSave}
                        onSelectResource={(r) => setSelectedResource(r)}
                        onDownload={handleDownload}
                        isLast={index === filteredResources.length - 1}
                      />
                    ))
                  )}
                </div>
              </section>

              {/* Section: Browse by Subject */}
              <section className="mt-14">
                <div className="mb-5">
                  <h2 className="font-serif-editorial text-[26px] sm:text-[28px] text-[#1c1b19] font-medium tracking-tight">
                    Browse by subject
                  </h2>
                  <p className="text-[13px] text-[#414944] mt-0.5">
                    Core curriculum modules for B.Tech & Engineering semesters
                  </p>
                </div>

                {/* 3x2 Subject Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {SUBJECT_MODULES.map((sub) => (
                    <SubjectCard
                      key={sub.id}
                      subject={sub}
                      onSelect={handleSelectSubjectCard}
                    />
                  ))}
                </div>
              </section>

              {/* Restrained Academic Contribution Callout */}
              <section className="mt-12 p-6 rounded-xl bg-[#f7f3ef] border border-[#e6e2de] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#ece7e4] flex items-center justify-center shrink-0 text-[#414944]">
                    <span className="material-symbols-outlined text-[21px]">
                      assignment_turned_in
                    </span>
                  </div>
                  <div>
                    <h4 className="text-[16px] font-semibold text-[#1c1b19]">
                      Have exam papers or handwritten notes to share?
                    </h4>
                    <p className="text-[13px] text-[#414944] mt-0.5 max-w-xl leading-relaxed">
                      Upload them to your college vault for verification by faculty. Peer uploads earn academic curation recognition.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsUploadOpen(true)}
                  className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-[#ece7e4] text-[#1c1b19] text-[13px] font-medium transition-colors border border-[#e6e2de] shadow-xs cursor-pointer active:scale-[0.98]"
                >
                  <span>Upload material</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </section>

              {/* Clean Minimal Section Footer */}
              <div className="mt-16 pt-6 border-t border-[#e6e2de] flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#717973]">
                <span>
                  CampusVault • Academic Resource Archive • Built for Indian University Colleges
                </span>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] font-medium">
                  <button
                    onClick={() => setActiveInfoModal('guidelines')}
                    className="text-[#414944] hover:text-[#1c1b19] transition-colors"
                  >
                    Curator Guidelines
                  </button>
                  <span className="text-[#c0c9c2]">•</span>
                  <button
                    onClick={() => setActiveInfoModal('verification')}
                    className="text-[#414944] hover:text-[#1c1b19] transition-colors"
                  >
                    Faculty Verification Process
                  </button>
                  <span className="text-[#c0c9c2]">•</span>
                  <button
                    onClick={() => setActiveInfoModal('report')}
                    className="text-[#414944] hover:text-[#1c1b19] transition-colors"
                  >
                    Report an Error
                  </button>
                  <span className="text-[#c0c9c2]">•</span>
                  <button
                    onClick={() => setActiveInfoModal('contact')}
                    className="text-[#414944] hover:text-[#1c1b19] transition-colors"
                  >
                    Contact Dept. Reps
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: SUBJECTS CATALOG */}
          {currentTab === 'subjects' && (
            <SubjectsView
              subjects={SUBJECT_MODULES}
              resources={resources}
              onSelectSubjectFilter={(subName) => {
                setSelectedSubject(subName);
                setCurrentTab('home');
              }}
              onOpenResource={(res) => setSelectedResource(res)}
            />
          )}

          {/* Tab 3: PAST YEAR PAPERS (PYQs) */}
          {currentTab === 'pyqs' && (
            <PYQsView
              resources={resources}
              savedIds={savedIds}
              onToggleSave={handleToggleSave}
              onOpenResource={(res) => setSelectedResource(res)}
              onDownload={handleDownload}
            />
          )}

          {/* Tab 4: SAVED DESK */}
          {currentTab === 'saved' && (
            <SavedView
              resources={resources}
              savedIds={savedIds}
              onToggleSave={handleToggleSave}
              onOpenResource={(res) => setSelectedResource(res)}
              onDownload={handleDownload}
              onNavigateHome={() => setCurrentTab('home')}
            />
          )}

        </div>
      </main>

      {/* Collegiate Footer */}
      <Footer onOpenInfoModal={(modal) => setActiveInfoModal(modal)} />

      {/* Academic Reader / Preview Modal */}
      <DocumentModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
        isSaved={selectedResource ? savedIds.includes(selectedResource.id) : false}
        onToggleSave={handleToggleSave}
        onDownload={handleDownload}
      />

      {/* Upload Archive Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAddResource={handleAddResource}
        availableSubjects={availableSubjectsList}
      />

      {/* Department & Semester Switcher Modal */}
      <DepartmentModal
        isOpen={isDeptModalOpen}
        onClose={() => setIsDeptModalOpen(false)}
        currentSemester={currentSemester}
        currentDepartment={currentDepartment}
        onSelect={(sem, dept) => {
          setCurrentSemester(sem);
          setCurrentDepartment(dept);
          showToast(`Curriculum updated to Sem ${sem} • ${dept}`);
          setIsDeptModalOpen(false);
        }}
      />

      {/* Informational Dialogue Modals */}
      <InfoModals
        activeModal={activeInfoModal}
        onClose={() => setActiveInfoModal(null)}
      />
    </div>
  );
}
