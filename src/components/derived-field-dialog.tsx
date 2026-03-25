import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../imports/svg-7f6fvi704m";
import { cn } from "./ui/utils";

interface FieldData {
  name: string;
  type: 'SYSTEM' | 'CUSTOM' | 'DERIVED';
  source: string;
  dataType: string;
  description: string;
  displayName?: string;
  maxLength?: string;
  isPii?: boolean;
}

interface DerivedFieldDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (field: FieldData) => void;
  field: FieldData | null;
}

export const DerivedFieldDialog: React.FC<DerivedFieldDialogProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  field 
}) => {
  const [profileAssignment, setProfileAssignment] = useState<'all' | 'specific'>('all');
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>(['Retail Banking', 'Corporate Banking', 'Card Transactions']);
  const [isPii, setIsPii] = useState(false);

  useEffect(() => {
    if (isOpen && field) {
      setIsPii(!!field.isPii);
      // Reset other states or load from field if available in extended data
    }
  }, [isOpen, field]);

  const profiles = [
    'Retail Banking', 'Corporate Banking',
    'Wealth Management', 'Card Transactions',
    'Trade Finance', 'Treasury'
  ];

  const toggleProfile = (profile: string) => {
    setSelectedProfiles(prev => 
      prev.includes(profile) 
        ? prev.filter(p => p !== profile) 
        : [...prev, profile]
    );
  };

  const handleSave = () => {
    if (field) {
      onSave({
        ...field,
        isPii: isPii
      });
    }
    onClose();
  };

  if (!field) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center p-4"
          />
          
          {/* Dialog Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[512px] bg-white rounded-[8px] overflow-hidden z-[1001] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] border border-black/10 flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#2a53a0] h-[64px] flex items-center justify-between px-[30px] shrink-0 border-b border-[#f3f4f6]">
              <div className="flex items-center">
                <h2 className="text-white text-[20px] font-normal font-['Inter',sans-serif]">
                  Configure Derived Field
                </h2>
              </div>
              <button 
                onClick={onClose}
                className="size-[28px] rounded-[4px] flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <svg className="size-[18px]" fill="none" viewBox="0 0 18 18">
                  <path d={svgPaths.pc0cc3f0} fill="white" />
                </svg>
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto max-h-[70vh] no-scrollbar">
              <div className="p-[20px] space-y-[24px]">
                
                {/* Field Name Section */}
                <div className="space-y-[6px]">
                  <label className="text-[13px] font-semibold text-[#161616]">Field Name</label>
                  <div className="bg-[#f4f4f4] h-[46px] rounded-[8px] border border-[#d1d5dc] px-[17px] flex items-center justify-between">
                    <div className="flex items-center gap-[12px]">
                      <div className="bg-white size-[24px] rounded-[4px] border border-[#e5e7eb] flex items-center justify-center">
                        <svg className="size-[16px]" viewBox="0 0 16 16" fill="none">
                           <path d={svgPaths.p1bc1ff00} fill="#DA1E28" />
                           <path d={svgPaths.p3dc70100} fill="#DA1E28" />
                           <path d={svgPaths.p1abb3700} fill="#DA1E28" />
                           <path d={svgPaths.p211ed570} fill="#DA1E28" />
                        </svg>
                      </div>
                      <span className="text-[14px] font-normal text-[#161616] font-mono leading-[21px]">
                        {field.name || 'transaction_risk_index'}
                      </span>
                    </div>
                    <div className="bg-[#e5e7eb] px-[8px] py-[2px] rounded-[4px]">
                      <span className="text-[11px] font-medium text-[#4a5565] leading-[16.5px]">Read-only</span>
                    </div>
                  </div>
                </div>

                {/* Description Section */}
                <div className="space-y-[6px]">
                  <label className="text-[13px] font-semibold text-[#161616]">Description</label>
                  <p className="text-[14px] text-[#525252] px-[4px] min-h-[21px]">
                    {field.description || 'No description provided.'}
                  </p>
                  <div className="h-px bg-[#f3f4f6]" />
                </div>

                {/* Profile Assignment Section */}
                <div className="space-y-[16px]">
                  <h3 className="text-[12px] font-bold text-[#6a7282] tracking-[0.6px] uppercase">
                    PROFILE ASSIGNMENT
                  </h3>
                  
                  <div className="space-y-[14px]">
                    <label className="flex items-center gap-[12px] cursor-pointer group">
                      <div className="relative size-[20px]">
                        <input 
                          type="radio"
                          className="peer sr-only"
                          name="profileAssignment"
                          checked={profileAssignment === 'all'}
                          onChange={() => setProfileAssignment('all')}
                        />
                        <div className="absolute inset-0 border border-[#99a1af] rounded-full shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-all peer-checked:border-[#2A53A0]" />
                        <div className={cn(
                          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[8px] rounded-full bg-[#2A53A0] transition-opacity",
                          profileAssignment === 'all' ? "opacity-100" : "opacity-0"
                        )} />
                      </div>
                      <span className="text-[14px] text-[#161616]">Apply to All Profiles</span>
                    </label>

                    <label className="flex items-center gap-[12px] cursor-pointer group">
                      <div className="relative size-[20px]">
                        <input 
                          type="radio"
                          className="peer sr-only"
                          name="profileAssignment"
                          checked={profileAssignment === 'specific'}
                          onChange={() => setProfileAssignment('specific')}
                        />
                        <div className="absolute inset-0 border border-[#99a1af] rounded-full shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-all peer-checked:border-[#2A53A0]" />
                        <div className={cn(
                          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[8px] rounded-full bg-[#2A53A0] transition-opacity",
                          profileAssignment === 'specific' ? "opacity-100" : "opacity-0"
                        )} />
                      </div>
                      <span className="text-[14px] text-[#161616]">Select Specific Profiles</span>
                    </label>
                  </div>

                  {/* Specific Profiles Grid */}
                  <AnimatePresence>
                    {profileAssignment === 'specific' && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-[8px]">
                          <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[8px] p-[17px] grid grid-cols-2 gap-x-[24px] gap-y-[16px]">
                            {profiles.map(profile => (
                              <label key={profile} className="flex items-center gap-[12px] cursor-pointer group">
                                <div className="relative size-[16px] shrink-0">
                                  <input 
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={selectedProfiles.includes(profile)}
                                    onChange={() => toggleProfile(profile)}
                                  />
                                  <div className="absolute inset-0 border border-[#99a1af] rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] peer-checked:bg-[#2a53a0] peer-checked:border-[#2a53a0] transition-all flex items-center justify-center">
                                    <svg className={cn("size-[14px] text-white", selectedProfiles.includes(profile) ? "block" : "hidden")} viewBox="0 0 14 14" fill="none">
                                      <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="white" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div>
                                </div>
                                <span className="text-[13px] text-[#161616] leading-[19.5px] truncate">{profile}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="h-px bg-[#f3f4f6]" />
                </div>

                {/* Data Privacy Section */}
                <div className="space-y-[16px]">
                  <h3 className="text-[12px] font-bold text-[#6a7282] tracking-[0.6px] uppercase">
                    DATA PRIVACY
                  </h3>
                  
                  <label className="flex items-center gap-[12px] cursor-pointer group">
                    <div className="relative size-[20px] shrink-0">
                      <input 
                        type="checkbox"
                        className="peer sr-only"
                        checked={isPii}
                        onChange={(e) => setIsPii(e.target.checked)}
                      />
                      <div className="absolute inset-0 border border-[#99a1af] rounded-[4px] bg-[#f3f3f5] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] peer-checked:bg-[#2a53a0] peer-checked:border-[#2a53a0] transition-all flex items-center justify-center">
                        <svg className={cn("size-[12px] text-white", isPii ? "block" : "hidden")} viewBox="0 0 18 18" fill="none">
                          <path d={svgPaths.p63e4a00} fill="white" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-[14px] text-[#161616]">Mark as PII (Personally Identifiable Information)</span>
                  </label>

                  {/* Info Box */}
                  <div className="bg-[#edf5ff] border border-[#d0e2ff] rounded-[8px] p-[13px] flex gap-[12px] items-start">
                    <div className="size-[18px] shrink-0 mt-[2px]">
                      <svg viewBox="0 0 16 16" fill="none">
                        <path d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5ZM8 4.5C8.41421 4.5 8.75 4.83579 8.75 5.25C8.75 5.66421 8.41421 6 8 6C7.58579 6 7.25 5.66421 7.25 5.25C7.25 4.83579 7.58579 4.5 8 4.5ZM9.25 11.25H6.75V10.5H7.25V8.25H6.75V7.5H8.5V10.5H9.25V11.25Z" fill="#0043CE" />
                      </svg>
                    </div>
                    <p className="text-[13px] leading-[21.125px] text-[#0043ce]">
                      Enable if this derived field could reveal sensitive patterns or contains personal data.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="h-[64px] border-t border-[#e5e7eb] flex bg-[#f4f4f4] shrink-0">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 h-full text-[14px] font-medium text-[#2a53a0] hover:bg-[#eaeaea] transition-colors"
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={handleSave}
                className="flex-1 h-full flex items-center justify-center gap-[6px] text-[14px] font-medium bg-[#2a53a0] text-white hover:bg-[#1f3e7a] transition-colors group relative"
              >
                <span>Save Configuration</span>
                <svg className="size-[18px]" fill="none" viewBox="0 0 18 18">
                  <path d={svgPaths.p63e4a00} fill="white" />
                </svg>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
