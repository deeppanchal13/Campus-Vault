import React, { useState } from 'react';

interface NavbarProps {
  currentTab: 'home' | 'subjects' | 'pyqs' | 'saved';
  setCurrentTab: (tab: 'home' | 'subjects' | 'pyqs' | 'saved') => void;
  currentSemester: number;
  currentDepartment: string;
  onOpenDeptModal: () => void;
  onOpenUploadModal: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  currentSemester,
  currentDepartment,
  onOpenDeptModal,
  onOpenUploadModal,
  savedCount,
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
  const semRoman = romanNumerals[currentSemester - 1] || `${currentSemester}`;

  return (
    <header className="fixed top-0 w-full z-40 bg-[#fdf8f5]/90 backdrop-blur-md border-b border-[#e6e2de]/70 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-16 max-w-[1120px] mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#023625] flex items-center justify-center text-[#ffffff] shadow-sm transition-transform group-hover:scale-105">
            <span className="material-symbols-outlined text-[19px]">account_balance</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif-editorial text-[22px] text-[#1c1b19] tracking-tight leading-none font-semibold">
              CampusVault
            </span>
            <span className="text-[11px] text-[#414944] tracking-widest uppercase mt-0.5 font-medium">
              Academic Archives
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#f7f3ef] p-1 rounded-xl border border-[#e6e2de]">
          <button
            onClick={() => setCurrentTab('home')}
            className={`px-4 py-1.5 rounded-lg text-[14px] font-medium transition-all ${
              currentTab === 'home'
                ? 'bg-[#1f4d3a] text-white shadow-xs font-semibold'
                : 'text-[#414944] hover:bg-[#ece7e4] hover:text-[#1c1b19]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentTab('subjects')}
            className={`px-4 py-1.5 rounded-lg text-[14px] font-medium transition-all ${
              currentTab === 'subjects'
                ? 'bg-[#1f4d3a] text-white shadow-xs font-semibold'
                : 'text-[#414944] hover:bg-[#ece7e4] hover:text-[#1c1b19]'
            }`}
          >
            Subjects
          </button>
          <button
            onClick={() => setCurrentTab('pyqs')}
            className={`px-4 py-1.5 rounded-lg text-[14px] font-medium transition-all ${
              currentTab === 'pyqs'
                ? 'bg-[#1f4d3a] text-white shadow-xs font-semibold'
                : 'text-[#414944] hover:bg-[#ece7e4] hover:text-[#1c1b19]'
            }`}
          >
            PYQs
          </button>
          <button
            onClick={() => setCurrentTab('saved')}
            className={`relative px-4 py-1.5 rounded-lg text-[14px] font-medium transition-all ${
              currentTab === 'saved'
                ? 'bg-[#1f4d3a] text-white shadow-xs font-semibold'
                : 'text-[#414944] hover:bg-[#ece7e4] hover:text-[#1c1b19]'
            }`}
          >
            Saved
            {savedCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-[#feb62f] text-[#6d4a00] font-bold">
                {savedCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Section Actions */}
        <div className="flex items-center gap-3">
          
          {/* Department / Semester Switcher Badge */}
          <button
            onClick={onOpenDeptModal}
            title="Change Semester and Department"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f7f3ef] hover:bg-[#ece7e4] border border-[#e6e2de] text-[#414944] hover:text-[#1c1b19] text-[12px] font-medium transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-[#7f5700]"></span>
            <span>Sem {semRoman} • {currentDepartment}</span>
            <span className="material-symbols-outlined text-[15px] text-[#717973]">unfold_more</span>
          </button>

          {/* Upload Button */}
          <button
            onClick={onOpenUploadModal}
            className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#023625] hover:bg-[#1f4d3a] text-white text-[13px] font-medium transition-all shadow-xs active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[17px]">upload_file</span>
            <span>Upload</span>
          </button>

          {/* User Profile Avatar with Popover */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-1 p-1 rounded-lg hover:bg-[#f2ede9] transition-colors focus:outline-none"
              aria-label="User Account"
            >
              <div className="w-8 h-8 rounded-full bg-[#023625] flex items-center justify-center text-white ring-2 ring-[#e6e2de]">
                <span className="material-symbols-outlined text-[18px]">person</span>
              </div>
              <span className="material-symbols-outlined text-[#717973] text-[18px]">
                {profileOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-[0_4px_20px_rgba(28,27,25,0.08)] border border-[#e6e2de] p-3 text-[#1c1b19] z-50">
                <div className="flex items-center gap-2.5 pb-3 border-b border-[#f2ede9]">
                  <div className="w-9 h-9 rounded-full bg-[#1f4d3a] text-white flex items-center justify-center font-bold text-sm">
                    DP
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#1c1b19] truncate">Deep Panchal</p>
                    <p className="text-xs text-[#717973] truncate">Sem IV • CSE Dept.</p>
                  </div>
                </div>

                <div className="my-2.5 p-2 rounded-lg bg-[#fdf8f5] border border-[#e6e2de] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-[#7f5700] font-medium">
                    <span className="material-symbols-outlined text-[16px]">stars</span>
                    <span>Curator Karma</span>
                  </div>
                  <span className="text-xs font-bold text-[#1c1b19] bg-[#ffdeae]/60 px-2 py-0.5 rounded">
                    840 pts
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <button 
                    onClick={() => { setCurrentTab('saved'); setProfileOpen(false); }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-[#f7f3ef] text-[#414944] hover:text-[#1c1b19] text-left transition-colors"
                  >
                    <span className="material-symbols-outlined text-[17px]">bookmark</span>
                    <span>My Saved Vault ({savedCount})</span>
                  </button>
                  <button 
                    onClick={() => { onOpenUploadModal(); setProfileOpen(false); }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-[#f7f3ef] text-[#414944] hover:text-[#1c1b19] text-left transition-colors"
                  >
                    <span className="material-symbols-outlined text-[17px]">cloud_upload</span>
                    <span>Contribute New Notes</span>
                  </button>
                  <button 
                    onClick={() => { onOpenDeptModal(); setProfileOpen(false); }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-[#f7f3ef] text-[#414944] hover:text-[#1c1b19] text-left transition-colors"
                  >
                    <span className="material-symbols-outlined text-[17px]">swap_horiz</span>
                    <span>Switch Branch / Semester</span>
                  </button>
                </div>

                <div className="mt-2 pt-2 border-t border-[#f2ede9] flex items-center justify-between text-[11px] text-[#717973]">
                  <span>Student ID: CSE-2024-81</span>
                  <span className="text-[#023625] font-medium">Verified</span>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-[#414944] hover:bg-[#f2ede9]"
            aria-label="Open Navigation Menu"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fdf8f5] border-b border-[#e6e2de] px-4 py-3 space-y-2">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentTab === 'home' ? 'bg-[#1f4d3a] text-white' : 'text-[#414944]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => { setCurrentTab('subjects'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentTab === 'subjects' ? 'bg-[#1f4d3a] text-white' : 'text-[#414944]'
              }`}
            >
              Subjects
            </button>
            <button
              onClick={() => { setCurrentTab('pyqs'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentTab === 'pyqs' ? 'bg-[#1f4d3a] text-white' : 'text-[#414944]'
              }`}
            >
              PYQs
            </button>
            <button
              onClick={() => { setCurrentTab('saved'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentTab === 'saved' ? 'bg-[#1f4d3a] text-white' : 'text-[#414944]'
              }`}
            >
              Saved ({savedCount})
            </button>
          </div>

          <div className="pt-2 border-t border-[#e6e2de] flex flex-col gap-2">
            <button
              onClick={() => { onOpenDeptModal(); setMobileMenuOpen(false); }}
              className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#f7f3ef] text-xs font-medium text-[#414944]"
            >
              <span>Sem {semRoman} • {currentDepartment}</span>
              <span className="text-[#023625]">Change</span>
            </button>
            <button
              onClick={() => { onOpenUploadModal(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#023625] text-white text-xs font-medium"
            >
              <span className="material-symbols-outlined text-[16px]">upload_file</span>
              <span>Upload Material</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
