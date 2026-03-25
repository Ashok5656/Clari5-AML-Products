import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../imports/svg-r4oodxq4jz";
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

interface FieldDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (field: FieldData) => void;
  initialData?: FieldData;
}

export const FieldDialog: React.FC<FieldDialogProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData 
}) => {
  const [formData, setFormData] = useState<FieldData>({
    name: '',
    type: 'CUSTOM',
    source: 'USER_INPUT',
    dataType: 'String',
    description: '',
    displayName: '',
    maxLength: '255',
    isPii: false,
  });

  const [constraints, setConstraints] = useState<{
    min: string;
    max: string;
    format: string;
  }>({
    min: '',
    max: '',
    format: 'YYYY-MM-DD',
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          ...initialData,
          name: initialData.name || '',
          displayName: initialData.displayName || '',
          maxLength: initialData.maxLength || '255',
          description: initialData.description || '',
          isPii: !!initialData.isPii,
        });
        setConstraints({
          min: '',
          max: '',
          format: 'YYYY-MM-DD',
        });
      } else {
        setFormData({
          name: '',
          type: 'CUSTOM',
          source: 'USER_INPUT',
          dataType: 'String',
          description: '',
          displayName: '',
          maxLength: '255',
          isPii: false,
        });
        setConstraints({
          min: '',
          max: '',
          format: 'YYYY-MM-DD',
        });
      }
    }
  }, [initialData, isOpen]);

  const renderConstraints = () => {
    switch (formData.dataType) {
      case 'String':
        return (
          <div className="space-y-[6px]">
            <label className="text-[13px] font-semibold text-[#161616]">Max Length</label>
            <input 
              type="text"
              placeholder="255"
              value={formData.maxLength || ''}
              onChange={(e) => setFormData({ ...formData, maxLength: e.target.value })}
              className="w-full h-[46px] px-[12px] bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] placeholder:text-[#717182] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]"
            />
          </div>
        );
      case 'Integer':
      case 'Double':
      case 'Decimal':
        return (
          <div className="grid grid-cols-2 gap-[16px]">
            <div className="space-y-[6px]">
              <label className="text-[13px] font-semibold text-[#161616]">Min Value</label>
              <input 
                type="text"
                placeholder="0"
                value={constraints.min || ''}
                onChange={(e) => setConstraints({ ...constraints, min: e.target.value })}
                className="w-full h-[46px] px-[12px] bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] placeholder:text-[#717182] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]"
              />
            </div>
            <div className="space-y-[6px]">
              <label className="text-[13px] font-semibold text-[#161616]">Max Value</label>
              <input 
                type="text"
                placeholder="999999"
                value={constraints.max || ''}
                onChange={(e) => setConstraints({ ...constraints, max: e.target.value })}
                className="w-full h-[46px] px-[12px] bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] placeholder:text-[#717182] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]"
              />
            </div>
          </div>
        );
      case 'Date':
      case 'Date time':
        return (
          <div className="space-y-[6px]">
            <label className="text-[13px] font-semibold text-[#161616]">Date Format</label>
            <div className="relative group">
              <select 
                value={constraints.format || 'YYYY-MM-DD'}
                onChange={(e) => setConstraints({ ...constraints, format: e.target.value })}
                className="w-full h-[46px] px-[13px] bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] appearance-none focus:outline-none focus:ring-1 focus:ring-[#2a53a0] cursor-pointer"
              >
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM-DD-YYYY">MM-DD-YYYY</option>
                <option value="ISO-8601">ISO-8601</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                  <path d="M4 6L8 10L12 6" stroke="#717182" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="py-2 text-[13px] text-[#717182] italic text-center">
            No specific constraints for this data type
          </div>
        );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const isEdit = !!initialData;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
          />
          
          {/* Dialog Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[512px] bg-white rounded-[8px] overflow-hidden z-[101] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] border border-black/10"
          >
            {/* Header */}
            <div className="bg-[#2a53a0] h-[64px] flex items-center justify-between px-[30px] shrink-0">
              <h2 className="text-white text-[20px] font-normal font-['Inter',sans-serif]">
                {isEdit ? 'Edit Field' : 'Add New Field'}
              </h2>
              <button 
                onClick={onClose}
                className="size-[28px] rounded-[4px] flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <svg className="size-[18px]" fill="none" viewBox="0 0 18 18">
                  <path d={svgPaths.pc0cc3f0} fill="white" />
                </svg>
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="p-[20px] space-y-[16px] max-h-[70vh] overflow-y-auto no-scrollbar">
                {/* Row 1: Name & Display Name */}
                <div className="grid grid-cols-2 gap-[16px]">
                  <div className="space-y-[6px]">
                    <label className="flex items-center text-[13px] font-semibold text-[#161616]">
                      Field Name <span className="text-[#fb2c36] ml-1 font-bold">*</span>
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g., transaction_amt"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-[46px] px-[12px] bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] placeholder:text-[#717182] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]"
                    />
                  </div>
                  <div className="space-y-[6px]">
                    <label className="flex items-center text-[13px] font-semibold text-[#161616]">
                      Display Name <span className="text-[#fb2c36] ml-1 font-bold">*</span>
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g., Transaction Amount"
                      value={formData.displayName || ''}
                      onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                      className="w-full h-[46px] px-[12px] bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] placeholder:text-[#717182] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-[6px]">
                  <label className="text-[13px] font-semibold text-[#161616]">Description</label>
                  <textarea 
                    placeholder="Briefly describe the purpose of this field..."
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full h-[80px] p-[12px] bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] placeholder:text-[#717182] focus:outline-none focus:ring-1 focus:ring-[#2a53a0] resize-none"
                  />
                </div>

                {/* Data Type */}
                <div className="space-y-[6px]">
                  <label className="flex items-center text-[13px] font-semibold text-[#161616]">
                    Data Type <span className="text-[#fb2c36] ml-1 font-bold">*</span>
                  </label>
                  <div className="relative group">
                    <select 
                      value={formData.dataType}
                      onChange={(e) => setFormData({ ...formData, dataType: e.target.value })}
                      className="w-full h-[46px] px-[13px] bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] appearance-none focus:outline-none focus:ring-1 focus:ring-[#2a53a0] cursor-pointer"
                    >
                      <option value="String">String</option>
                      <option value="Integer">Integer</option>
                      <option value="Double">Double</option>
                      <option value="Decimal">Decimal</option>
                      <option value="Boolean">Boolean</option>
                      <option value="Date">Date</option>
                      <option value="Date time">Date time</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity">
                      <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                        <path d="M4 6L8 10L12 6" stroke="#717182" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Constraints Box */}
                <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-[21px] space-y-[12px]">
                  <div className="flex items-center gap-[8px]">
                    <svg className="size-[14px]" fill="none" viewBox="0 0 14 14">
                      <path d={svgPaths.pa166400} fill="#6A7282" />
                      <path d={svgPaths.p35058d00} fill="#6A7282" />
                      <path d={svgPaths.p2087300} fill="#6A7282" />
                    </svg>
                    <span className="text-[12px] font-bold text-[#6a7282] uppercase tracking-[0.6px]">
                      Type Specific Constraints
                    </span>
                  </div>
                  {renderConstraints()}
                </div>

                {/* PII Checkbox */}
                <div className="pt-[9px] border-t border-[#f3f4f6]">
                  <label className="flex items-center gap-[12px] cursor-pointer group">
                    <div className="relative">
                      <input 
                        type="checkbox"
                        className="peer sr-only"
                        checked={formData.isPii}
                        onChange={(e) => setFormData({ ...formData, isPii: e.target.checked })}
                      />
                      <div className="size-[20px] bg-[#f3f3f5] border border-[#d1d5dc] rounded-[4px] peer-checked:bg-[#2a53a0] peer-checked:border-[#2a53a0] transition-all flex items-center justify-center">
                        <svg className={cn("size-[12px] text-white transition-opacity", formData.isPii ? "opacity-100" : "opacity-0")} fill="none" viewBox="0 0 18 18">
                          <path d={svgPaths.p63e4a00} fill="currentColor" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-[14px] font-medium text-[#161616] group-hover:text-[#2a53a0] transition-colors">
                      Mark as PII (Personally Identifiable Information)
                    </span>
                  </label>
                </div>
              </div>

              {/* Footer */}
              <div className="h-[64px] border-t border-[#e5e7eb] flex bg-[#f4f4f4]">
                <button 
                  type="button"
                  onClick={onClose}
                  className="flex-1 h-full text-[14px] font-medium text-[#2a53a0] hover:bg-[#eaeaea] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className={cn(
                    "flex-1 h-full flex items-center justify-center gap-[6px] text-[14px] font-medium transition-colors",
                    formData.name && formData.displayName 
                      ? "bg-[#2a53a0] text-white hover:bg-[#1f3e7a]" 
                      : "bg-[#d1d5dc] text-white cursor-not-allowed"
                  )}
                  disabled={!formData.name || !formData.displayName}
                >
                  <svg className="size-[18px]" fill="none" viewBox="0 0 18 18">
                    <path d={svgPaths.p63e4a00} fill="white" />
                  </svg>
                  {isEdit ? 'Save Changes' : 'Create Field'}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
