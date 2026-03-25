import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Close } from "@carbon/icons-react";

interface SecEntry {
  id: string;
  description: string;
}

interface LinkedSecDialogProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
}

const mockSecData: Record<string, SecEntry[]> = {
  "Account Opening": [
    { id: "SEC_ACCOUNT_OPEN_FRAUD_1", description: "Advanced fraud detection for account opening monitoring." },
    { id: "SEC_ACCOUNT_OPEN_BEHAVIOR", description: "Behavioral analysis and risk scoring during customer onboarding." },
    { id: "SEC_ACCOUNT_OPEN_IDENTITY", description: "Identity verification and duplicate application check." },
    { id: "SEC_ACCOUNT_OPEN_VELOCITY", description: "Monitoring for rapid account creation from single IP/device." },
  ],
  "ACH Payment": [
    { id: "SEC_ACH_VELOCITY_CHECK", description: "Monitoring of ACH transaction frequency within short intervals." },
    { id: "SEC_ACH_LIMIT_VALIDATION", description: "Verification against historical transaction limits for the account." },
    { id: "SEC_ACH_OUTLIER_DETECTION", description: "Identifies atypical ACH patterns using machine learning models." },
  ],
  "ATM Withdrawal": [
    { id: "SEC_ATM_GEOSPATIAL_CHECK", description: "Checks for impossible travel between consecutive ATM uses." },
    { id: "SEC_ATM_VELOCITY_LIMIT", description: "Ensures total daily withdrawal amounts do not exceed safety thresholds." },
    { id: "SEC_ATM_TERMINAL_WHITE_LIST", description: "Validates terminal IDs against known secure ATM networks." },
    { id: "SEC_ATM_ANOMALY_PATTERN", description: "Detects structural anomalies in card reading and PIN entry patterns." },
  ],
};

const defaultSecData = [
  { id: "SEC_GENERIC_ANOMALY_1", description: "General purpose anomaly detection for this event category." },
  { id: "SEC_VELOCITY_MONITOR_X", description: "Standard frequency monitoring for high-volume detection." },
];

export const LinkedSecDialog: React.FC<LinkedSecDialogProps> = ({ isOpen, onClose, eventName }) => {
  const secEntries = mockSecData[eventName] || defaultSecData;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-[rgba(0,0,0,0.5)] flex items-center justify-center"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed z-[101] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[512px] bg-white rounded-[8px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="h-[64px] bg-[#2A53A0] flex items-center justify-between px-[30px] shrink-0">
              <h2 className="text-[20px] font-normal text-white font-['Inter',sans-serif]">
                Linked Sec for {eventName}
              </h2>
              <button
                onClick={onClose}
                className="size-[28px] flex items-center justify-center text-white opacity-70 hover:opacity-100 transition-opacity"
              >
                <Close size={16} />
              </button>
            </div>

            {/* Content Area */}
            <div className="bg-[rgba(244,244,244,0.3)] p-[30px] pt-[16px] max-h-[500px] overflow-y-auto no-scrollbar">
              <div className="flex flex-col gap-[16px]">
                {secEntries.map((entry, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-[#E5E7EB] rounded-[8px] p-[17px] flex flex-col gap-[8px] shadow-sm"
                  >
                    <h4 className="text-[14px] font-semibold text-[#161616] font-['Inter',sans-serif]">
                      {entry.id}
                    </h4>
                    <p className="text-[13px] font-normal text-[#525252] font-['Inter',sans-serif] leading-[21.125px]">
                      {entry.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="h-[64px] bg-[#F4F4F4] border-t border-[#E5E7EB] flex items-center justify-end shrink-0">
              <button
                onClick={onClose}
                className="bg-[#2A53A0] h-full w-[256px] flex items-center justify-center text-white font-medium text-[14px] font-['Inter',sans-serif] hover:bg-[#1E3A70] transition-colors"
              >
                Done
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
