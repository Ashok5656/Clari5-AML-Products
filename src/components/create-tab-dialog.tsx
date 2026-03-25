import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../imports/svg-thorte4lun";
import { cn } from "./ui/utils";

interface CreateNewTabDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string, cloneFrom: string) => void;
  existingTabs: string[];
}

export const CreateNewTabDialog: React.FC<CreateNewTabDialogProps> = ({ 
  isOpen, 
  onClose, 
  onCreate,
  existingTabs 
}) => {
  const [tabName, setTabName] = useState('');
  const [description, setDescription] = useState('');
  const [cloneFrom, setCloneFrom] = useState('Empty for blank tab');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = ['Empty for blank tab', ...existingTabs];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCreate = () => {
    if (tabName) {
      onCreate(tabName, description, cloneFrom);
      setTabName('');
      setDescription('');
      setCloneFrom('Empty for blank tab');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[3000]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] bg-white rounded-[8px] overflow-hidden z-[3001] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] border border-black/10 flex flex-col font-['Inter',sans-serif]"
          >
            {/* Header */}
            <div className="bg-[#2a53a0] h-[64px] flex items-center justify-between px-[24px] shrink-0">
              <h2 className="text-white text-[16px] font-semibold">
                Create New Tab
              </h2>
              <button 
                onClick={onClose}
                className="size-[28px] rounded-[4px] flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <svg className="size-[20px]" fill="none" viewBox="0 0 20 20">
                  <path d={svgPaths.p1d794e00} fill="white" fillOpacity="0.8" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <div className="p-[32px] space-y-[24px]">
              {/* Clone From - Consistent Dropdown */}
              <div className="space-y-[8px]">
                <label className="text-[13px] font-semibold text-[#161616]">Clone from</label>
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={cn(
                      "w-full h-[46px] px-[13px] bg-white border border-[#d1d5dc] rounded-[8px] flex items-center justify-between transition-all hover:border-[#2a53a0]/50 focus:outline-none focus:ring-1 focus:ring-[#2a53a0]",
                      isDropdownOpen && "ring-1 ring-[#2a53a0] border-[#2a53a0]"
                    )}
                  >
                    <span className="text-[14px] text-[#161616] truncate">{cloneFrom}</span>
                    <svg 
                      className={cn("size-[16px] transition-transform duration-200 text-[#717182]", isDropdownOpen ? "rotate-180" : "rotate-0")} 
                      viewBox="0 0 16 16" 
                      fill="none"
                    >
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="absolute left-0 right-0 top-[50px] bg-white shadow-xl border border-[#d1d5dc] rounded-[8px] z-10 max-h-[200px] overflow-y-auto overflow-x-hidden py-1"
                      >
                        {options.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setCloneFrom(option);
                              setIsDropdownOpen(false);
                            }}
                            className={cn(
                              "w-full px-[16px] py-[10px] text-left text-[14px] hover:bg-[#edf5ff] hover:text-[#2a53a0] transition-colors",
                              cloneFrom === option ? "bg-[#edf5ff] font-semibold text-[#2a53a0]" : "text-[#161616]"
                            )}
                          >
                            {option}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <p className="text-[11px] text-[#6a7282]">Select source configuration to copy, or Empty for blank tab</p>
              </div>

              {/* Tab Name - Consistent Input */}
              <div className="space-y-[8px]">
                <label className="flex items-center text-[13px] font-semibold text-[#161616]">
                  Tab Name <span className="text-[#fb2c36] ml-1">*</span>
                </label>
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="Enter tab name"
                    maxLength={50}
                    value={tabName}
                    onChange={(e) => setTabName(e.target.value)}
                    className="w-full h-[46px] px-[13px] bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] placeholder:text-[#717182] focus:outline-none focus:ring-1 focus:ring-[#2a53a0] transition-all"
                  />
                  <div className="flex justify-between items-center mt-1 px-[2px]">
                     <p className="text-[11px] text-[#6a7282]">Max 50 characters</p>
                     <p className="text-[11px] text-[#6a7282]">{tabName.length}/50</p>
                  </div>
                </div>
              </div>

              {/* Tab Description - Consistent Comment Field */}
              <div className="space-y-[8px]">
                <label className="text-[13px] font-semibold text-[#161616]">Tab Description</label>
                <div className="relative">
                  <textarea 
                    placeholder="Describe the purpose of this configuration variant"
                    maxLength={500}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-[120px] p-[13px] bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] placeholder:text-[#717182] focus:outline-none focus:ring-1 focus:ring-[#2a53a0] transition-all resize-none"
                  />
                  <div className="flex justify-end items-center mt-1 px-[2px]">
                     <p className="text-[11px] text-[#6a7282]">{description.length}/500</p>
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
                onClick={handleCreate}
                className={cn(
                  "flex-1 h-full flex items-center justify-center gap-[8px] text-[14px] font-medium transition-all",
                  tabName 
                    ? "bg-[#2a53a0] text-white hover:bg-[#1f3e7a]" 
                    : "bg-[#d1d5dc] text-white cursor-not-allowed"
                )}
                disabled={!tabName}
              >
                Create Tab
                <svg className="size-[18px]" fill="none" viewBox="0 0 18 18">
                  <path d={svgPaths.p63e4a00} fill="currentColor" />
                </svg>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
