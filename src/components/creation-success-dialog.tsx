import React from 'react';
import svgPaths from "../imports/svg-aku17jvqll";
import { motion, AnimatePresence } from "motion/react";

interface CreationSuccessDialogProps {
  eventName: string;
  isOpen: boolean;
  onContinue: () => void;
  title?: string;
  message?: string;
}

export const CreationSuccessDialog: React.FC<CreationSuccessDialogProps> = ({ 
  eventName, 
  isOpen, 
  onContinue,
  title = "Success",
  message = "New Custom Event created successfully and sent for Pending Verification"
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[10000] backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white overflow-hidden relative rounded-[10px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] w-[360px] h-[300px] flex flex-col"
            >
              <div className="flex-1 flex flex-col items-center pt-[32px] px-8 text-center">
                {/* Checkmark Icon */}
                <div className="size-[48px] mb-[16px] relative">
                   <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
                      <path d={svgPaths.p2825d780} fill="#2A53A0" />
                   </svg>
                   <div className="absolute inset-[31%_23%_29.5%_23%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.92 18.96">
                        <path d={svgPaths.p31f76f00} fill="#2A53A0" />
                      </svg>
                   </div>
                </div>

                {/* Title */}
                <p className="font-['Inter:Medium',sans-serif] font-medium text-[#2A53A0] text-[20px] leading-[30px] m-0 mb-[12px]">{title}</p>

                {/* Description */}
                <div className="font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#767676] text-[16px]">
                  <p className="m-0">{message}</p>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={onContinue}
                className="bg-[#2a53a0] h-[55px] w-full rounded-bl-[10px] rounded-br-[10px] font-['Inter:Regular',sans-serif] font-normal text-[16px] text-white hover:bg-[#1E3A70] transition-colors flex items-center justify-center border-none cursor-pointer outline-none mt-auto"
              >
                Continue
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
