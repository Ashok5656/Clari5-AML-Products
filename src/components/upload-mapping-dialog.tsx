import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../imports/svg-thorte4lun";
import { cn } from "./ui/utils";

interface UploadMappingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

export const UploadMappingDialog: React.FC<UploadMappingDialogProps> = ({ 
  isOpen, 
  onClose, 
  onUpload 
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
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
            className="fixed inset-0 bg-black/50 z-[4000]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] bg-white rounded-[8px] overflow-hidden z-[4001] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] border border-black/10 flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#2a53a0] h-[64px] flex items-center justify-between px-[24px] shrink-0">
              <h2 className="text-white text-[16px] font-semibold">
                Upload Mapping Configuration
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
              <div className="flex justify-end">
                <button className="text-[12px] font-medium text-[#2a53a0] flex items-center gap-[6px] hover:underline transition-all">
                  <svg className="size-[14px]" fill="none" viewBox="0 0 16 16">
                     <path d={svgPaths.p66a7640} fill="#2A53A0" />
                  </svg>
                  Download CSV Template
                </button>
              </div>

              {/* Drag & Drop Area */}
              <div 
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={cn(
                  "h-[200px] border-2 border-dashed rounded-[8px] flex flex-col items-center justify-center gap-[12px] transition-all",
                  dragActive ? "border-[#2a53a0] bg-[#f0f7ff]" : "border-[#d1d5dc] bg-white hover:border-[#2a53a0]/50"
                )}
              >
                <div className="size-[48px] bg-[#f3f4f6] rounded-full flex items-center justify-center">
                  <svg className="size-[24px]" fill="none" viewBox="0 0 16 16">
                    <path d={svgPaths.p37835300} fill="#6A7282" />
                  </svg>
                </div>
                <div className="text-center space-y-[4px]">
                  <p className="text-[14px] font-semibold text-[#161616]">Drag and drop CSV file here</p>
                  <p className="text-[12px] text-[#6a7282]">or click to browse from your computer</p>
                </div>
              </div>

              {/* Constraints Box */}
              <div className="bg-white border border-[#e5e7eb] rounded-[8px] p-[20px] space-y-[16px]">
                <div className="flex items-center gap-[8px]">
                  <svg className="size-[14px]" fill="none" viewBox="0 0 16 16">
                    <path d={svgPaths.pd42ac80} fill="#6A7282" />
                  </svg>
                  <span className="text-[12px] font-bold text-[#6a7282] uppercase tracking-[0.6px]">TYPE SPECIFIC CONSTRAINTS</span>
                </div>
                
                <div className="space-y-[8px]">
                   <p className="text-[13px] font-semibold text-[#161616]">File Requirements</p>
                   <ul className="space-y-[6px] pl-[4px]">
                      <li className="text-[12px] text-[#525252] flex items-start gap-[8px]">
                         <span className="mt-[6px] size-[4px] bg-[#6a7282] rounded-full shrink-0" />
                         <span>Column Headers: <span className="text-[#2a53a0]">FieldName, SourceMapping, DataType</span></span>
                      </li>
                      <li className="text-[12px] text-[#525252] flex items-start gap-[8px]">
                         <span className="mt-[6px] size-[4px] bg-[#6a7282] rounded-full shrink-0" />
                         <span>File format must be <span className="font-semibold text-[#161616]">.csv</span></span>
                      </li>
                      <li className="text-[12px] text-[#525252] flex items-start gap-[8px]">
                         <span className="mt-[6px] size-[4px] bg-[#6a7282] rounded-full shrink-0" />
                         <span>Character encoding should be <span className="font-semibold text-[#161616]">UTF-8</span></span>
                      </li>
                   </ul>
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
                className="flex-1 h-full flex items-center justify-center gap-[6px] text-[14px] font-medium bg-[#d1d5dc] text-white cursor-not-allowed"
                disabled
              >
                <svg className="size-[18px]" fill="none" viewBox="0 0 18 18">
                  <path d={svgPaths.p63e4a00} fill="white" />
                </svg>
                Upload & Apply
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
