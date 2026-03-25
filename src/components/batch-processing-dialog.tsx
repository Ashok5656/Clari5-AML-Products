import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../imports/svg-thorte4lun";
import { cn } from "./ui/utils";

interface BatchProcessingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tabName: string;
}

export const BatchProcessingDialog: React.FC<BatchProcessingDialogProps> = ({ 
  isOpen, 
  onClose,
  tabName 
}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[5000]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] bg-white rounded-[8px] overflow-hidden z-[5001] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] border border-black/10 flex flex-col font-['Inter',sans-serif]"
          >
            {/* Header */}
            <div className="bg-[#2a53a0] h-[64px] flex items-center justify-between px-[24px] shrink-0">
              <h2 className="text-white text-[16px] font-semibold">
                Batch Processing Configuration
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

            {/* Content */}
            <div className="p-[32px] space-y-[24px]">
              <p className="text-[14px] text-[#525252] leading-[21px]">
                Configure automated batch processing for <span className="font-bold text-[#161616]">{tabName}</span>. This will determine how frequently mappings are applied to source data.
              </p>

              {/* Operation Mode */}
              <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px] flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-[16px]">
                  <div className="bg-[#fffbeb] size-[40px] rounded-full flex items-center justify-center border border-[#fef3c7]">
                    <svg className="size-[20px]" fill="none" viewBox="0 0 16 16">
                       <path d={svgPaths.pd42ac80} fill="#D97706" />
                    </svg>
                  </div>
                  <div className="space-y-[2px]">
                    <p className="text-[14px] font-semibold text-[#161616]">Operation Mode</p>
                    <p className="text-[12px] text-[#6a7282]">
                      Automated batch processing is currently {isEnabled ? 'enabled' : 'disabled'}
                    </p>
                  </div>
                </div>
                {/* Switch */}
                <button 
                  onClick={() => setIsEnabled(!isEnabled)}
                  className={cn(
                    "w-[44px] h-[24px] rounded-full p-[2px] transition-colors relative",
                    isEnabled ? "bg-[#2a53a0]" : "bg-[#d1d5dc]"
                  )}
                >
                  <motion.div 
                    animate={{ x: isEnabled ? 20 : 0 }}
                    className="size-[20px] bg-white rounded-full shadow-[0px_1px_2px_rgba(0,0,0,0.1)]"
                  />
                </button>
              </div>

              {/* Disabled State Placeholder */}
              {!isEnabled && (
                <div className="h-[140px] border border-[#f3f4f6] bg-[#f9fafb] rounded-[8px] flex flex-col items-center justify-center gap-[12px] opacity-60">
                  <svg className="size-[32px] text-[#99a1af]" fill="none" viewBox="0 0 16 16">
                     <circle cx="8" cy="8" r="7.5" stroke="currentColor" />
                     <path d="M8 3V8L11 11" stroke="currentColor" strokeLinecap="round" />
                  </svg>
                  <p className="text-[14px] font-medium text-[#717182] italic">Schedule configuration is disabled</p>
                </div>
              )}

              {/* Warning Notice */}
              <div className="bg-[#fffbeb] border border-[#fef3c7] rounded-[8px] p-[20px] flex gap-[16px] items-start shadow-sm">
                <div className="mt-[2px]">
                   <svg className="size-[18px]" fill="none" viewBox="0 0 16 16">
                      <circle cx="8" cy="8" r="7.5" fill="#D97706" />
                      <text x="8" y="12" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">!</text>
                   </svg>
                </div>
                <div className="space-y-[4px]">
                   <p className="text-[13px] font-bold text-[#92400e] uppercase tracking-[0.6px]">Schedule Policy Notice:</p>
                   <p className="text-[12px] leading-[18px] text-[#92400e]">
                      Batch processing will execute the field mapping transformations for this region based on the configured schedule. Ensure transformations are optimized for large datasets.
                   </p>
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
                className="flex-1 h-full flex items-center justify-center gap-[6px] text-[14px] font-medium bg-[#2a53a0] text-white hover:bg-[#1f3e7a] transition-colors"
              >
                <svg className="size-[18px]" fill="none" viewBox="0 0 18 18">
                  <path d={svgPaths.p63e4a00} fill="white" />
                </svg>
                Save Configuration
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
