import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../imports/svg-1uamvo5vyh";
import { cn } from "./ui/utils";

interface DerivedFieldOption {
  id: string;
  name: string;
  type: string;
  description: string;
}

interface DerivedCategory {
  category: string;
  fields: DerivedFieldOption[];
}

interface AddDerivedFieldDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (selectedFields: any[]) => void;
}

const DERIVED_FIELD_LIBRARY: DerivedCategory[] = [
  {
    category: "Customer Behavior - New Entity Detection",
    fields: [
      { id: "is_device_new", name: "is_device_new", type: "Boolean", description: "TRUE if device has not been seen before for this customer" },
      { id: "is_cpty_new", name: "is_cpty_new", type: "Boolean", description: "TRUE if counterparty is new for this customer" },
      { id: "is_beneficiary_new", name: "is_beneficiary_new", type: "Boolean", description: "TRUE if beneficiary is new for this customer" },
      { id: "is_ip_new", name: "is_ip_new", type: "Boolean", description: "TRUE if IP address is new for customer" }
    ]
  },
  {
    category: "Geographic - New Location Detection",
    fields: [
      { id: "is_origination_country_new", name: "is_origination_country_new", type: "Boolean", description: "TRUE if transaction origin country is new" },
      { id: "is_cpty_country_new", name: "is_cpty_country_new", type: "Boolean", description: "TRUE if counterparty country is new" }
    ]
  }
];

export const AddDerivedFieldDialog: React.FC<AddDerivedFieldDialogProps> = ({ 
  isOpen, 
  onClose, 
  onAdd 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(DERIVED_FIELD_LIBRARY.map(c => c.category)));

  const filteredLibrary = useMemo(() => {
    if (!searchQuery) return DERIVED_FIELD_LIBRARY;
    return DERIVED_FIELD_LIBRARY.map(cat => ({
      ...cat,
      fields: cat.fields.filter(f => 
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        f.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(cat => cat.fields.length > 0);
  }, [searchQuery]);

  const toggleField = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const toggleCategory = (categoryName: string) => {
    const next = new Set(expandedCategories);
    if (next.has(categoryName)) next.delete(categoryName);
    else next.add(categoryName);
    setExpandedCategories(next);
  };

  const selectAllInCategory = (cat: DerivedCategory) => {
    const next = new Set(selectedIds);
    const allIds = cat.fields.map(f => f.id);
    const alreadySelectedAll = allIds.every(id => next.has(id));
    
    if (alreadySelectedAll) {
      allIds.forEach(id => next.delete(id));
    } else {
      allIds.forEach(id => next.add(id));
    }
    setSelectedIds(next);
  };

  const handleAdd = () => {
    const selectedFields = DERIVED_FIELD_LIBRARY.flatMap(c => c.fields)
      .filter(f => selectedIds.has(f.id))
      .map(f => ({
        name: f.name,
        type: 'DERIVED',
        source: 'Auto-detected logic',
        dataType: f.type,
        description: f.description,
        displayName: f.name.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      }));
    onAdd(selectedFields);
    onClose();
    setSelectedIds(new Set());
  };

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
            className="fixed inset-0 bg-black/50 z-[2000] flex items-center justify-center p-4"
          />
          
          {/* Dialog Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[1200px] h-[80vh] bg-white rounded-[8px] overflow-hidden z-[2001] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] border border-black/10 flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#2a53a0] h-[64px] flex items-center justify-between px-[24px] shrink-0">
              <h2 className="text-white text-[20px] font-semibold">
                Add Derived Fields
              </h2>
              <button 
                onClick={onClose}
                className="size-[28px] rounded-[4px] flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <svg className="size-[20px]" fill="none" viewBox="0 0 20 20">
                  <path d={svgPaths.pad04580} fill="white" fillOpacity="0.8" />
                </svg>
              </button>
            </div>

            {/* Toolbar Area */}
            <div className="h-[79px] border-b border-[#f3f4f6] px-[24px] flex items-center justify-between shrink-0 bg-white">
              <div className="relative w-[320px]">
                 <div className="absolute left-[12px] top-1/2 -translate-y-1/2 size-[18px] pointer-events-none">
                    <svg className="size-full" viewBox="0 0 18 18" fill="none">
                       <path d={svgPaths.p3121e300} fill="#99A1AF" />
                    </svg>
                 </div>
                 <input 
                    type="text"
                    placeholder="Search derived fields..."
                    className="w-full h-[46px] pl-[40px] pr-[12px] bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] placeholder:text-[#717182] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                 />
              </div>

              <div className="bg-[#edf5ff] border border-[#d0e2ff] rounded-[8px] h-[36px] flex items-center gap-[8px] px-[17px]">
                 <span className="text-[13px] font-semibold text-[#2a53a0]">{selectedIds.size}</span>
                 <span className="text-[12px] font-medium text-[#2a53a0]/80">Fields Selected</span>
              </div>
            </div>

            {/* Content Area - Scrollable */}
            <div className="flex-1 overflow-y-auto bg-white p-[24px] space-y-[24px] no-scrollbar">
              {filteredLibrary.map((cat) => (
                <div key={cat.category} className="bg-white rounded-[8px] border border-[#2a53a0]/30 shadow-sm overflow-hidden flex flex-col">
                  {/* Category Header */}
                  <div className="bg-[#f4f7fb] h-[54px] border-b border-[#f3f4f6] flex items-center justify-between px-[16px]">
                    <button 
                      onClick={() => toggleCategory(cat.category)}
                      className="flex items-center gap-[12px] hover:opacity-80 transition-opacity flex-1"
                    >
                      <div className={cn("size-[20px] transition-transform", expandedCategories.has(cat.category) ? "rotate-0" : "-rotate-90")}>
                        <svg className="size-full" viewBox="0 0 12.5 7.125" fill="none">
                          <path d={svgPaths.p23048b80} fill="#2A53A0" />
                        </svg>
                      </div>
                      <span className="text-[14px] font-semibold text-[#2a53a0]">
                        {cat.category} (Field count: {cat.fields.length})
                      </span>
                    </button>
                    <button 
                      onClick={() => selectAllInCategory(cat)}
                      className="bg-white border border-[#d1d5dc] h-[32px] px-[13px] rounded-[8px] text-[12px] font-medium text-[#4a5565] hover:bg-gray-50 transition-colors"
                    >
                      {cat.fields.every(f => selectedIds.has(f.id)) ? 'Deselect All' : 'Select All'}
                    </button>
                  </div>

                  {/* Category Fields */}
                  <AnimatePresence initial={false}>
                    {expandedCategories.has(cat.category) && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-[8px] space-y-[4px]">
                          {cat.fields.map(field => (
                            <div 
                              key={field.id}
                              onClick={() => toggleField(field.id)}
                              className="h-[65.5px] rounded-[8px] hover:bg-gray-50 transition-colors cursor-pointer flex items-center px-[13px] gap-[12px]"
                            >
                              <div className="relative size-[16px] shrink-0">
                                <div className={cn(
                                  "absolute inset-0 border rounded-[4px] transition-all flex items-center justify-center",
                                  selectedIds.has(field.id) 
                                    ? "bg-[#2a53a0] border-[#2a53a0]" 
                                    : "bg-[#f3f3f5] border-[rgba(0,0,0,0.1)]"
                                )} style={{ boxShadow: selectedIds.has(field.id) ? 'none' : '0px 1px 2px 0px rgba(0,0,0,0.05)' }}>
                                  {selectedIds.has(field.id) && (
                                    <svg className="size-[12px] text-white" viewBox="0 0 18 18" fill="none">
                                       <path d="M15.5 4.5L6.5 13.5L2.5 9.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  )}
                                </div>
                              </div>
                              <div className="flex-1 flex flex-col gap-[2px]">
                                <div className="flex items-center gap-[8px]">
                                  <span className="text-[13px] font-medium text-[#161616]">{field.name}</span>
                                  <div className="bg-[#f3f4f6] border border-[#e5e7eb] rounded-full px-[9px] py-[3px] text-[11px] text-[#6a7282]">
                                    {field.type}
                                  </div>
                                </div>
                                <p className="text-[12px] text-[#6a7282] line-clamp-1">{field.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="h-[64px] border-t border-[#e5e7eb] flex shrink-0">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 h-full text-[14px] font-medium text-[#525252] bg-[#f4f4f4] hover:bg-[#eaeaea] transition-colors"
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={() => setSelectedIds(new Set())}
                className="flex-1 h-full text-[14px] font-medium text-[#161616] bg-white hover:bg-gray-50 transition-colors border-x border-[#e5e7eb]"
              >
                Reset Selection
              </button>
              <button 
                type="button"
                onClick={handleAdd}
                className={cn(
                  "flex-1 h-full text-[14px] font-medium transition-colors",
                  selectedIds.size > 0 
                    ? "bg-[#2a53a0] text-white hover:bg-[#1f3e7a]" 
                    : "bg-[#2a53a0]/40 text-white cursor-not-allowed"
                )}
                disabled={selectedIds.size === 0}
              >
                Add Derived Fields
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
