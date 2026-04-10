import React from 'react';
import { motion, AnimatePresence } from "motion/react";

interface RejectionDialogProps {
  isOpen: boolean;
  onContinue: () => void;
  title?: string;
  message?: string;
}

export const RejectionDialog: React.FC<RejectionDialogProps> = ({
  isOpen,
  onContinue,
  title = "Rejected",
  message = "The list has been rejected and moved back to the Drafted List.",
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
              className="bg-white overflow-hidden relative rounded-[10px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] w-[360px] h-[262px] flex flex-col"
            >
              <div className="flex-1 flex flex-col items-center pt-[32px] px-8 text-center">
                {/* Rejection Icon — red circle with X */}
                <div className="size-[48px] mb-[16px]">
                  <svg viewBox="0 0 48 48" fill="none" className="size-full">
                    {/* outer ring */}
                    <path
                      d="M24 0C10.7467 0 0 10.7467 0 24C0 37.2533 10.7467 48 24 48C37.2533 48 48 37.2533 48 24C48 10.7467 37.2533 0 24 0ZM24 44.16C12.88 44.16 3.84 35.12 3.84 24C3.84 12.88 12.88 3.84 24 3.84C35.12 3.84 44.16 12.88 44.16 24C44.16 35.12 35.12 44.16 24 44.16Z"
                      fill="#dc2626"
                    />
                    {/* X mark */}
                    <path
                      d="M32 17.41L30.59 16L24 22.59L17.41 16L16 17.41L22.59 24L16 30.59L17.41 32L24 25.41L30.59 32L32 30.59L25.41 24L32 17.41Z"
                      fill="#dc2626"
                    />
                  </svg>
                </div>

                {/* Title */}
                <p className="font-['Inter:Medium',sans-serif] font-medium text-[#dc2626] text-[20px] leading-[30px] m-0 mb-[12px]">{title}</p>

                {/* Description */}
                <div className="font-['Inter:Regular',sans-serif] font-normal leading-[1.6] text-[#767676] text-[16px]">
                  <p className="m-0">{message}</p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={onContinue}
                className="bg-[#dc2626] h-[55px] w-full rounded-bl-[10px] rounded-br-[10px] font-['Inter:Regular',sans-serif] font-normal text-[16px] text-white hover:bg-[#b91c1c] transition-colors flex items-center justify-center border-none cursor-pointer outline-none mt-auto"
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
