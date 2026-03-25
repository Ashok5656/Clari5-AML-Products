import React, { useState } from 'react';
import { 
  ChevronDown,
  ArrowLeft,
  ChevronRight,
  ChevronLeft
} from "@carbon/icons-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableRow 
} from "./ui/table";
import { cn } from "./ui/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useSortableData } from "../hooks/use-sortable-data";
import { SortableHeader } from "./ui/sortable-header";
import svgPaths from "../imports/svg-rs6mvaq7vv";
import mappingSvgPaths from "../imports/svg-pchvtv6p1w";
import fieldsSvgPaths from "../imports/svg-xxj8gvgadn";

import { FieldDialog } from "./field-dialog";
import { DerivedFieldDialog } from "./derived-field-dialog";
import { AddDerivedFieldDialog } from "./add-derived-field-dialog";
import { CreateNewTabDialog } from "./create-tab-dialog";
import { UploadMappingDialog } from "./upload-mapping-dialog";
import { BatchProcessingDialog } from "./batch-processing-dialog";

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

interface MappingData {
  fieldName: string;
  sourceMapping: string;
  transformation?: string;
}

const mockFields: FieldData[] = [
  { name: "account_no", type: 'SYSTEM', source: 'Core_Banking', dataType: 'String', description: 'Primary account number' },
  { name: "customer_id", type: 'SYSTEM', source: 'CRM_System', dataType: 'String', description: 'Internal customer reference' },
  { name: "opening_date", type: 'SYSTEM', source: 'AUTO:TIMESTAMP', dataType: 'Timestamp', description: 'Date of account creation' },
  { name: "branch_code", type: 'SYSTEM', source: 'Branch_Master', dataType: 'String', description: 'Originating branch code' },
  { name: "account_type", type: 'CUSTOM', source: 'Product_Catalog', dataType: 'String', description: 'Type of account (SAV/CUR)' },
  { name: "initial_deposit", type: 'SYSTEM', source: 'Transaction_Log', dataType: 'Double', description: 'Amount deposited at opening' },
  { name: "kyc_status", type: 'DERIVED', source: 'KYC_Verification_Service', dataType: 'String', description: 'Current KYC verification state' },
  { name: "referral_id", type: 'CUSTOM', source: 'Marketing_DB', dataType: 'String', description: 'Employee or partner referral ID' },
  { name: "risk_category", type: 'DERIVED', source: 'Risk_Engine', dataType: 'String', description: 'Calculated risk level' },
  { name: "onboarding_channel", type: 'SYSTEM', source: '"Mobile"', dataType: 'String', description: 'Digital onboarding source' },
  { name: "is_staff_account", type: 'SYSTEM', source: 'HR_System', dataType: 'Boolean', description: 'Flag for employee accounts' },
  { name: "product_code", type: 'SYSTEM', source: 'Product_Catalog', dataType: 'String', description: 'Internal product identifier' },
  { name: "limit_profile", type: 'DERIVED', source: 'Limit_Engine', dataType: 'String', description: 'Assigned transaction limits' },
];

const mockMappings: MappingData[] = [
  { fieldName: "account_no", sourceMapping: "payload.account.number" },
  { fieldName: "customer_id", sourceMapping: "payload.customer.id" },
  { fieldName: "branch_id", sourceMapping: "payload.branch.code" },
  { fieldName: "transaction_amount", sourceMapping: "txn.amount", transformation: "ROUND(amount, 2)" },
  { fieldName: "opening_date", sourceMapping: "txn.created_at", transformation: "TO_ISO8601(opening_date)" },
  { fieldName: "account_type", sourceMapping: "payload.product.type" },
  { fieldName: "currency", sourceMapping: '"INR"' },
  { fieldName: "kyc_status", sourceMapping: "kyc.current_status", transformation: "UPPER(status)" },
];

interface EventDetailsProps {
  event: {
    name: string;
    description: string;
    type: string;
  };
  onBack: () => void;
}

const SvgIcon = ({ path, className = "size-4", fill = "currentColor" }: { path: string, className?: string, fill?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none">
    <path d={path} fill={fill} />
  </svg>
);

const SortIcon = () => (
  <svg className="size-[14px] shrink-0" viewBox="0 0 14 14" fill="none">
    <g opacity="0.5">
      <path d={fieldsSvgPaths.pcae83e0} stroke="#8D8D8D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
      <path d="M9.91667 11.6667V2.33333" stroke="#8D8D8D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
      <path d={fieldsSvgPaths.p1bc99400} stroke="#8D8D8D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
      <path d="M4.08333 2.33333V11.6667" stroke="#8D8D8D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
    </g>
  </svg>
);

export const EventDetails: React.FC<EventDetailsProps> = ({ event, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'fields' | 'mapping'>('fields');
  const [activeMappingSubTab, setActiveMappingSubTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(13);

  // Dialog & Mock Data state
  const [fields, setFields] = useState<FieldData[]>(mockFields);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDerivedDialogOpen, setIsDerivedDialogOpen] = useState(false);
  const [isAddDerivedDialogOpen, setIsAddDerivedDialogOpen] = useState(false);
  const [isCreateTabDialogOpen, setIsCreateTabDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isBatchDialogOpen, setIsBatchDialogOpen] = useState(false);
  const [editingField, setEditingField] = useState<FieldData | undefined>(undefined);

  const [mappingSubTabs, setMappingSubTabs] = useState([
    "Default Mapping",
    "FT_IB_FundsTransfer",
    "FT_MB_FundsTransfer",
    "FT_CBDC_FundsTransfer"
  ]);

  // Dynamic Mappings based on tab and event name
  const getMappings = () => {
    const isAccountOpening = event.name === "Account Opening";
    const subTabName = mappingSubTabs[activeMappingSubTab];
    
    if (!isAccountOpening) return mockMappings;

    if (activeMappingSubTab === 0) return mockMappings; // Default

    // Logic to update fields based on sub-tab and event context
    const prefix = subTabName.split('_')[1] || "EXT"; // e.g., IB, MB, CBDC
    return mockMappings.map(m => ({
      ...m,
      sourceMapping: m.sourceMapping.startsWith('"') 
        ? m.sourceMapping 
        : `channel.${prefix.toLowerCase()}.${m.sourceMapping.replace('payload.', '')}`
    }));
  };

  const currentMappings = getMappings();

  const handleAddField = () => {
    setEditingField(undefined);
    setIsDialogOpen(true);
  };

  const handleEditField = (field: FieldData) => {
    setEditingField(field);
    if (field.type === 'DERIVED') {
      setIsDerivedDialogOpen(true);
    } else {
      setIsDialogOpen(true);
    }
  };

  const handleSaveField = (field: FieldData) => {
    if (editingField) {
      // Update existing
      setFields(prev => prev.map(f => f.name === editingField.name ? field : f));
    } else {
      // Add new
      setFields(prev => [field, ...prev]);
    }
    setIsDialogOpen(false);
    setIsDerivedDialogOpen(false);
  };

  const filteredFields = fields.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { items: sortedFields, requestSort, sortConfig } = useSortableData(filteredFields);
  const totalItems = sortedFields.length;
  const startItem = (currentPage - 1) * pageSize;
  const currentFields = sortedFields.slice(startItem, startItem + pageSize);

  const renderFieldsTab = () => (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Row 4: Toolbar */}
      <div className="shrink-0 flex items-center justify-between mb-4 px-1">
        <div className="relative group w-[280px]">
           <svg className="absolute left-4 top-1/2 -translate-y-1/2 size-[18px]" viewBox="0 0 16 16" fill="none">
             <path d={svgPaths.p1d6c7f00} fill="#99A1AF" />
           </svg>
           <Input 
             placeholder="Search fields..." 
             className="h-[48px] pl-11 bg-white border-[#D1D5DC] focus-visible:ring-[#2A53A0] rounded-[8px] text-[14px] shadow-none"
             value={searchQuery}
             onChange={(e) => {
               setSearchQuery(e.target.value);
               setCurrentPage(1);
             }}
           />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-[46px] border-[#2A53A0] text-[#2A53A0] rounded-[8px] flex items-center gap-2 text-[14px] font-medium hover:bg-blue-50 transition-all px-4 shadow-none">
            <svg className="size-4" viewBox="0 0 16 16" fill="none">
              <path d={svgPaths.p71ba000} fill="#2A53A0" />
              <path d={svgPaths.p66a7640} fill="#2A53A0" />
            </svg>
            Download
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setIsAddDerivedDialogOpen(true)}
            className="h-[46px] border-[#2A53A0] text-[#2A53A0] rounded-[8px] flex items-center gap-2 text-[14px] font-medium hover:bg-blue-50 transition-all px-4 shadow-none"
          >
            <svg className="size-4" viewBox="0 0 16 16" fill="none">
              <path d={svgPaths.p1c30a680} fill="#2A53A0" />
              <path d="M2 9.5H7V10.5H2V9.5Z" fill="#2A53A0" />
              <path d="M2 12H7V13H2V12Z" fill="#2A53A0" />
              <path d="M9 4H14V5H9V4Z" fill="#2A53A0" />
              <path d={svgPaths.p38ca8400} fill="#2A53A0" />
            </svg>
            Add Derived Field
          </Button>
          <Button 
            onClick={handleAddField}
            className="h-[46px] bg-[#2A53A0] hover:bg-[#2A53A0]/90 text-white rounded-[8px] flex items-center gap-2 text-[14px] font-medium px-4 shadow-none border-0"
          >
            <svg className="size-4" viewBox="0 0 16 16" fill="none">
              <path d={svgPaths.p349d7700} fill="white" />
            </svg>
            Add Field
          </Button>
          <div className="w-px h-6 bg-[#E5E7EB] mx-1" />
          <Button disabled className="h-[46px] bg-[#F3F4F6] text-[#99A1AF] border-0 rounded-[8px] flex items-center gap-2 text-[14px] font-medium px-4 opacity-50 cursor-not-allowed">
            <svg className="size-4" viewBox="0 0 16 16" fill="none">
              <path d={svgPaths.p31f9c780} fill="#99A1AF" />
            </svg>
            Save Changes
          </Button>
        </div>
      </div>

      {/* Row 5: Table Area */}
      <div className="flex-1 overflow-hidden flex flex-col border border-gray-200 rounded-[8px]">
        <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar bg-white relative">
          <table className="border-separate border-spacing-0 w-full table-fixed">
            <thead className="sticky top-0 z-20 shadow-[0_1px_0_0_#e0e0e0]">
              <tr className="bg-[#F4F4F4] text-[#2A53A0] h-[48px]">
                <th className="pl-4 px-4 font-semibold text-[13px] align-middle whitespace-nowrap text-left border-b border-[#e0e0e0] w-[20%] bg-[#F4F4F4] sticky top-0">
                  <div className="flex items-center gap-[6px] cursor-pointer h-full">
                    <span className="font-['Inter',sans-serif] font-semibold">Field Name</span>
                    <SortIcon />
                  </div>
                </th>
                <th className="px-4 font-semibold text-[13px] align-middle whitespace-nowrap text-left border-b border-[#e0e0e0] w-[15%] bg-[#F4F4F4] sticky top-0">
                  <div className="flex items-center gap-[6px] cursor-pointer h-full">
                    <span className="font-['Inter',sans-serif] font-semibold">Type</span>
                    <SortIcon />
                  </div>
                </th>
                <th className="px-4 font-semibold text-[13px] align-middle whitespace-nowrap text-left border-b border-[#e0e0e0] w-[20%] bg-[#F4F4F4] sticky top-0">
                  <div className="flex items-center gap-[6px] cursor-pointer h-full">
                    <span className="font-['Inter',sans-serif] font-semibold">Source / Category</span>
                    <SortIcon />
                  </div>
                </th>
                <th className="px-4 font-semibold text-[13px] align-middle whitespace-nowrap text-left border-b border-[#e0e0e0] w-[12%] bg-[#F4F4F4] sticky top-0">
                  <div className="flex items-center gap-[6px] cursor-pointer h-full">
                    <span className="font-['Inter',sans-serif] font-semibold">Data Type</span>
                    <SortIcon />
                  </div>
                </th>
                <th className="px-4 font-semibold text-[13px] align-middle whitespace-nowrap text-left border-b border-[#e0e0e0] w-[20%] bg-[#F4F4F4] sticky top-0">
                  <div className="flex items-center gap-[6px] cursor-pointer h-full">
                    <span className="font-['Inter',sans-serif] font-semibold">Description</span>
                    <SortIcon />
                  </div>
                </th>
                <th className="px-4 font-semibold text-[13px] align-middle whitespace-nowrap text-left border-b border-[#e0e0e0] w-[13%] bg-[#F4F4F4] sticky top-0">
                  <span className="font-['Inter',sans-serif] font-semibold">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {currentFields.map((field, idx) => (
                <tr 
                  key={idx} 
                  className="h-[46px] hover:bg-[#F3F7FF] transition-colors group relative"
                >
                  <td className="pl-4 px-4 align-middle border-b border-[#e0e0e0]">
                    <div className="flex items-center gap-[12px]">
                       {field.type === 'SYSTEM' ? (
                          <div className="size-[16px] shrink-0 flex items-center justify-center">
                            <svg className="w-[10px] h-[14px]" viewBox="0 0 10 14" fill="none">
                              <path d={fieldsSvgPaths.p3c5f5f00} fill="#99A1AF" />
                            </svg>
                          </div>
                       ) : field.type === 'CUSTOM' ? (
                          <div className="size-[16px] shrink-0 flex items-center justify-center">
                            <svg className="size-[14px]" viewBox="0 0 14 14" fill="none">
                              <path d={fieldsSvgPaths.p3086c900} fill="#0F62FE" />
                              <path d={fieldsSvgPaths.p3f8bf7b2} fill="#0F62FE" />
                            </svg>
                          </div>
                       ) : (
                          <div className="size-[16px] shrink-0 flex items-center justify-center">
                            <svg className="size-[14px]" viewBox="0 0 14 14" fill="none">
                              <path d={fieldsSvgPaths.p3aac7f00} fill="#8A3FFC" />
                              <path d={fieldsSvgPaths.p2a507600} fill="#8A3FFC" />
                              <path d={fieldsSvgPaths.p15166d00} fill="#8A3FFC" />
                            </svg>
                          </div>
                       )}
                       <span className="text-[14px] font-normal text-[#161616] truncate">{field.name}</span>
                    </div>
                  </td>
                  <td className="px-4 align-middle border-b border-[#e0e0e0]">
                    <div className={cn(
                      "inline-flex items-center justify-center px-[9px] py-[3px] text-[11px] font-medium tracking-tight uppercase rounded-[4px] min-w-[62px] h-[22px]",
                      field.type === 'SYSTEM' ? "bg-[#f4f4f4] text-[#525252]" :
                      field.type === 'CUSTOM' ? "bg-[#d0e2ff] text-[#0043ce]" :
                      "bg-[#e8daff] text-[#8a3ffc]"
                    )}>
                      {field.type}
                    </div>
                  </td>
                  <td className="px-4 align-middle border-b border-[#e0e0e0]">
                    <span className={cn(
                      "text-[14px] font-normal truncate block",
                      field.source.startsWith('"') ? "text-[#198038]" : "text-[#2A53A0]"
                    )}>
                      {field.source}
                    </span>
                  </td>
                  <td className="px-4 align-middle text-[14px] text-[#161616] font-normal border-b border-[#e0e0e0]">
                    {field.dataType}
                  </td>
                  <td className="px-4 align-middle text-[14px] text-[#525252] truncate font-normal border-b border-[#e0e0e0]">
                    {field.description}
                  </td>
                  <td className="px-4 align-middle text-left border-b border-[#e0e0e0]">
                    <div className="flex items-center justify-start gap-[12px]">
                      <button 
                        onClick={() => handleEditField(field)}
                        className={cn(
                          "size-[28px] shrink-0 flex items-center justify-center rounded-[6px] transition-all",
                          field.type === 'SYSTEM' ? "bg-[#f9fafb] cursor-not-allowed" : "bg-[#f6f2ff] hover:bg-[#eee5ff]"
                        )} 
                        disabled={field.type === 'SYSTEM'}
                        title={
                          field.type === 'SYSTEM' 
                            ? 'System fields cannot be edited' 
                            : field.type === 'DERIVED' 
                              ? 'Configure Derived Field' 
                              : 'Edit Field'
                        }
                      >
                        <svg className="size-[16px]" viewBox="0 0 16 16" fill="none">
                          <path 
                            d={field.type === 'DERIVED' ? fieldsSvgPaths.p2acbe800 : fieldsSvgPaths.p279f5270} 
                            fill={field.type === 'SYSTEM' ? "#E5E7EB" : "#8A3FFC"} 
                          />
                          {field.type === 'DERIVED' && <path d={fieldsSvgPaths.pb1a8400} fill="#8A3FFC" />}
                          {field.type !== 'DERIVED' && field.type !== 'SYSTEM' && <path d="M1 13H15V14H1V13Z" fill="#8A3FFC" />}
                          {field.type === 'SYSTEM' && <path d="M1 13H15V14H1V13Z" fill="#E5E7EB" />}
                        </svg>
                      </button>

                      <button 
                        onClick={() => {
                          setFields(prev => prev.filter(f => f.name !== field.name));
                        }}
                        className={cn(
                          "size-[28px] shrink-0 flex items-center justify-center rounded-[6px] transition-all",
                          field.type === 'SYSTEM' ? "bg-[#f9fafb] cursor-not-allowed" : "bg-[#fff1f1] hover:bg-[#ffe5e5]"
                        )} 
                        disabled={field.type === 'SYSTEM'}
                        title={field.type === 'SYSTEM' ? 'System fields cannot be deleted' : 'Delete Field'}
                      >
                        <svg className="size-[16px]" viewBox="0 0 16 16" fill="none">
                          <path d={fieldsSvgPaths.p1b095900} fill={field.type === 'SYSTEM' ? "#E5E7EB" : "#DA1E28"} />
                          <path d="M6 6H7V12H6V6Z" fill={field.type === 'SYSTEM' ? "#E5E7EB" : "#DA1E28"} />
                          <path d="M9 6H10V12H9V6Z" fill={field.type === 'SYSTEM' ? "#E5E7EB" : "#DA1E28"} />
                          <path d="M6 1H10V2H6V1Z" fill={field.type === 'SYSTEM' ? "#E5E7EB" : "#DA1E28"} />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Row 6: Pagination Footer */}
        <div className="h-[48px] bg-white border-t border-[#e0e0e0] flex items-center justify-between shrink-0 font-['Inter',sans-serif]">
           <div className="flex items-center h-full px-4 border-r border-[#e0e0e0] min-w-[140px]">
              <div className="flex items-center gap-2 cursor-pointer">
                 <span className="text-[16px] text-[#525252] font-normal">Items per page:</span>
                 <div className="flex items-center gap-1">
                    <span className="text-[16px] text-[#161616]">13</span>
                    <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                      <path d={fieldsSvgPaths.p2fb7a700} fill="#161616" />
                    </svg>
                 </div>
              </div>
           </div>
           <div className="flex-1 flex items-center h-full px-4">
              <p className="text-[16px] text-[#161616] font-normal">
                <span className="font-medium">1–13</span>
                <span className="text-[#525252]"> of </span>
                <span className="font-medium">13</span>
                <span className="text-[#525252]"> items</span>
              </p>
           </div>
           <div className="flex items-center h-full">
              <div className="flex items-center gap-2 px-[16px] h-full border-l border-[#e0e0e0]">
                 <div className="flex items-center gap-2 cursor-pointer">
                    <span className="text-[16px] text-[#525252] font-normal whitespace-nowrap">of 1 pages</span>
                    <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                      <path d={fieldsSvgPaths.p2fb7a700} fill="#161616" />
                    </svg>
                 </div>
              </div>
              <div className="flex items-center h-full border-l border-[#e0e0e0]">
                 <button className="flex items-center justify-center h-full w-[48px] opacity-25" disabled={currentPage === 1}>
                    <svg className="size-5" fill="none" viewBox="0 0 20 20">
                      <path d="M12.5 15L6.25 10L12.5 5V15Z" fill="#161616"/>
                    </svg>
                 </button>
                 <button className="flex items-center justify-center h-full w-[48px] border-l border-[#e0e0e0] opacity-25" disabled={currentPage === 1}>
                    <svg className="size-5" fill="none" viewBox="0 0 20 20">
                      <path d="M7.5 5L13.75 10L7.5 15V5Z" fill="#161616"/>
                    </svg>
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderMappingTab = () => (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Sub-tab bar for Mapping */}
      <div className="shrink-0 flex items-center h-[48px] bg-[#E0E0E0] rounded-t-[8px] border-b border-gray-200 overflow-hidden">
        {mappingSubTabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveMappingSubTab(idx)}
            className={cn(
              "h-full px-6 text-[13px] font-medium transition-colors relative flex items-center gap-2 border-r border-gray-300",
              activeMappingSubTab === idx 
                ? "bg-white text-[#161616] font-semibold" 
                : "text-[#525252] hover:bg-gray-200/50"
            )}
          >
            {tab}
            {activeMappingSubTab === idx && tab === "Default Mapping" && (
              <SvgIcon path={mappingSvgPaths.p1ea30a00} className="size-[12px]" fill="#525252" />
            )}
            {activeMappingSubTab === idx && (
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#2A53A0]" />
            )}
          </button>
        ))}
        <button 
          onClick={() => setIsCreateTabDialogOpen(true)}
          className="h-full w-[48px] flex items-center justify-center hover:bg-gray-200/50 text-[#2A53A0]"
        >
          <SvgIcon path={mappingSvgPaths.p3c4bd700} className="size-[14px]" />
        </button>
      </div>

      {/* Mapping Content Area */}
      <div className="flex-1 border-x border-b border-gray-200 bg-white flex flex-col min-h-0">
        <div className="shrink-0 flex items-center justify-between p-4 bg-white border-b border-gray-100">
           <div className="flex flex-col gap-1">
              <h3 className="text-[14px] text-[#525252]">
                Configuration: <span className="font-semibold text-[#161616] italic">{mappingSubTabs[activeMappingSubTab]}</span>
              </h3>
              <p className="text-[12px] text-gray-400">Last Modified: Today 14:30</p>
           </div>
           <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={() => setIsUploadDialogOpen(true)}
                className="h-[40px] border-[#2A53A0] text-[#2A53A0] rounded-[6px] flex items-center gap-2 text-[13px] font-medium hover:bg-blue-50 transition-all px-4 shadow-none"
              >
                 <SvgIcon path={mappingSvgPaths.p37835300} className="size-[16px]" fill="#2A53A0" />
                 Upload
              </Button>
              <Button variant="outline" className="h-[40px] border-[#2A53A0] text-[#2A53A0] rounded-[6px] flex items-center gap-2 text-[13px] font-medium hover:bg-blue-50 transition-all px-4 shadow-none">
                 <SvgIcon path={mappingSvgPaths.p66a7640} className="size-[16px]" fill="#2A53A0" />
                 Download
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsBatchDialogOpen(true)}
                className="h-[40px] border-[#DA1E28] text-[#DA1E28] rounded-[6px] flex items-center gap-2 text-[13px] font-medium hover:bg-red-50 transition-all px-4 shadow-none"
              >
                 <div className="size-2 rounded-full bg-[#DA1E28]" />
                 Batch Processing
              </Button>
           </div>
        </div>

         <div className="flex-1 overflow-hidden p-4 flex flex-col min-h-0">
            <div className="flex-1 border border-gray-200 rounded-[8px] overflow-hidden flex flex-col bg-white">
              <div className="flex-1 overflow-y-auto no-scrollbar relative">
                 <table className="border-separate border-spacing-0 w-full table-fixed">
                    <thead className="sticky top-0 z-20 shadow-[0_1px_0_0_#e0e0e0]">
                       <tr className="bg-[#F4F4F4] text-[#2A53A0] h-[48px]">
                          <th className="pl-6 px-4 font-semibold text-[13px] align-middle whitespace-nowrap text-left border-b border-[#e0e0e0] w-[25%] bg-[#F4F4F4] sticky top-0">
                             <div className="flex items-center gap-[6px] cursor-pointer h-full">
                                <span className="font-['Inter',sans-serif] font-semibold">Field Name</span>
                                <SortIcon />
                             </div>
                          </th>
                          <th className="px-4 font-semibold text-[13px] align-middle whitespace-nowrap text-left border-b border-[#e0e0e0] w-[35%] bg-[#F4F4F4] sticky top-0">
                             <div className="flex items-center gap-[6px] cursor-pointer h-full">
                                <span className="font-['Inter',sans-serif] font-semibold">Source Mapping</span>
                                <SortIcon />
                             </div>
                          </th>
                          <th className="px-4 font-semibold text-[13px] align-middle whitespace-nowrap text-left border-b border-[#e0e0e0] w-[25%] bg-[#F4F4F4] sticky top-0">
                             <div className="flex items-center gap-[6px] cursor-pointer h-full">
                                <span className="font-['Inter',sans-serif] font-semibold">Transformation</span>
                                <SortIcon />
                             </div>
                          </th>
                          <th className="px-4 font-semibold text-[13px] align-middle whitespace-nowrap text-left border-b border-[#e0e0e0] w-[15%] bg-[#F4F4F4] sticky top-0">
                             <span className="font-['Inter',sans-serif] font-semibold">Actions</span>
                          </th>
                       </tr>
                    </thead>
                    <tbody className="bg-white">
                       {currentMappings.map((mapping, idx) => (
                          <tr key={idx} className="h-[46px] border-b border-[#e0e0e0] hover:bg-[#F3F7FF] transition-colors group relative">
                             <td className="pl-6 px-4 align-middle border-b border-[#e0e0e0] text-[14px] text-[#161616] font-medium">
                                {mapping.fieldName}
                             </td>
                             <td className="px-4 align-middle border-b border-[#e0e0e0]">
                                <span className={cn(
                                   "text-[14px] font-mono",
                                   mapping.sourceMapping.startsWith('"') ? "text-[#198038]" : "text-[#2A53A0]"
                                )}>
                                   {mapping.sourceMapping}
                                </span>
                             </td>
                             <td className="px-4 align-middle border-b border-[#e0e0e0]">
                                {mapping.transformation ? (
                                   <div className="bg-[#E5F6EE] text-[#198038] px-3 py-1 rounded-[4px] text-[12px] font-mono inline-block">
                                      {mapping.transformation}
                                   </div>
                                ) : (
                                   <span className="text-gray-300">-</span>
                                )}
                             </td>
                             <td className="px-4 align-middle border-b border-[#e0e0e0] text-left">
                                <div className="flex items-center justify-start gap-[12px]">
                                   <button 
                                      className={cn(
                                         "size-[28px] shrink-0 flex items-center justify-center rounded-[6px] transition-all group",
                                         activeMappingSubTab === 0 ? "bg-[#f9fafb] cursor-not-allowed text-[#D1D5DC]" : "bg-[#f6f2ff] hover:bg-[#eee5ff] text-[#8A3FFC]"
                                      )}
                                      disabled={activeMappingSubTab === 0}
                                   >
                                      <svg className="size-[16px]" viewBox="0 0 16 16" fill="none">
                                         <path d={fieldsSvgPaths.p279f5270} fill="currentColor" />
                                         <path d="M1 13H15V14H1V13Z" fill="currentColor" />
                                      </svg>
                                   </button>
                                   <button 
                                      className={cn(
                                         "size-[28px] shrink-0 flex items-center justify-center rounded-[6px] transition-all group",
                                         activeMappingSubTab === 0 ? "bg-[#f9fafb] cursor-not-allowed text-[#D1D5DC]" : "bg-[#fff1f1] hover:bg-[#ffe5e5] text-[#DA1E28]"
                                      )}
                                      disabled={activeMappingSubTab === 0}
                                   >
                                      <svg className="size-[16px]" viewBox="0 0 16 16" fill="none">
                                         <path d={fieldsSvgPaths.p1b095900} fill="currentColor" />
                                         <path d="M6 6H7V12H6V6Z" fill="currentColor" />
                                         <path d="M9 6H10V12H9V6Z" fill="currentColor" />
                                         <path d="M6 1H10V2H6V1Z" fill="currentColor" />
                                      </svg>
                                   </button>
                                </div>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
              {/* Footer info area - Strictly matched to mock */}
              <div className="h-[48px] border-t border-gray-200 bg-[#F4F4F4] px-4 flex items-center justify-between shrink-0">
                 <div className="flex items-center gap-4 h-full">
                    <div className="flex items-center gap-1.5">
                       <span className="text-[13px] font-bold text-[#161616]">{currentMappings.length}</span>
                       <span className="text-[12px] text-[#525252] font-normal">fields mapped</span>
                    </div>
                    <div className="w-[1px] h-[16px] bg-[#E0E0E0]" />
                    <div className="flex items-center gap-1.5">
                       <span className="text-[13px] font-bold text-[#198038]">
                          {currentMappings.filter(m => m.transformation).length}
                       </span>
                       <span className="text-[12px] text-[#198038] font-normal">with transformations</span>
                    </div>
                 </div>
                 <div className="text-[11px] text-[#8D8D8D] font-normal">
                    Last updated: 28/01/2026
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white font-['Inter',sans-serif]">
      
      {/* Row 2: Metadata Bar */}
      <div className="shrink-0 flex items-center h-[64px] px-4 bg-white border-b border-[#f3f4f6] overflow-x-auto no-scrollbar relative">
        <div className="flex items-center h-[16px] border-r border-gray-200 pr-3 mr-3 shrink-0">
          <span className="text-[12px] text-[#525252] mr-2">Event Name:</span>
          <span className="text-[13px] font-semibold text-[#161616]">{event.name}</span>
        </div>
        <div className="flex items-center h-[16px] border-r border-gray-200 px-3 mr-3 shrink-0">
          <span className="text-[12px] text-[#525252] mr-2">Source:</span>
          <div className="bg-[#f4f4f4] rounded-[6px] px-[12px] py-[2px] text-[11px] font-medium text-[#161616] h-[28px] flex items-center whitespace-nowrap">Default Event</div>
        </div>
        <div className="flex items-center h-[16px] border-r border-gray-200 px-3 mr-3 shrink-0">
          <span className="text-[12px] text-[#525252] mr-2">Status:</span>
          <div className="bg-[#f4f4f4] rounded-full px-[12px] py-[2px] text-[11px] font-medium text-[#525252] h-[28px] flex items-center whitespace-nowrap">Active</div>
        </div>
        <div className="flex items-center h-[16px] border-r border-gray-200 px-3 mr-3 shrink-0">
          <span className="text-[12px] text-[#525252] mr-2">Type:</span>
          <div className="bg-[#d0e2ff] rounded-[6px] px-[12px] py-[2px] text-[11px] font-medium text-[#0043ce] h-[28px] flex items-center whitespace-nowrap">Financial Transaction</div>
        </div>
        <div className="flex items-center gap-2 min-w-0 pl-3">
          <span className="text-[12px] text-[#525252] shrink-0">Description:</span>
          <span className="text-[13px] text-[#161616] truncate">New account creation events with customer onboarding data</span>
        </div>
      </div>

      {/* Row 3: Tabs Bar */}
      <div className="shrink-0 flex items-center h-[48px] border-b px-4 border-[#F3F4F6] bg-white">
        <button 
          onClick={() => setActiveTab('fields')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 h-[47px] text-[14px] transition-all relative",
            activeTab === 'fields' ? "text-[#2A53A0] font-semibold border-b-2 border-[#2A53A0]" : "text-[#525252] font-medium hover:bg-gray-50"
          )}
        >
          Fields
          <span className="bg-[#f3f4f6] rounded-full px-2 py-0.5 text-[11px] font-semibold text-[#525252] min-w-[27px] text-center">{fields.length}</span>
        </button>
        <button 
          onClick={() => setActiveTab('mapping')}
          className={cn(
            "flex-1 flex items-center justify-center h-[47px] text-[14px] transition-all relative",
            activeTab === 'mapping' ? "text-[#2A53A0] font-semibold border-b-2 border-[#2A53A0]" : "text-[#525252] font-medium hover:bg-gray-50"
          )}
        >
          Mapping
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col p-4 bg-white">
        {activeTab === 'fields' ? renderFieldsTab() : renderMappingTab()}
      </div>

      <FieldDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveField}
        initialData={editingField}
      />

      <DerivedFieldDialog
        isOpen={isDerivedDialogOpen}
        onClose={() => setIsDerivedDialogOpen(false)}
        onSave={handleSaveField}
        field={editingField || null}
      />

      <AddDerivedFieldDialog
        isOpen={isAddDerivedDialogOpen}
        onClose={() => setIsAddDerivedDialogOpen(false)}
        onAdd={(newFields) => {
          setFields(prev => [...newFields, ...prev]);
        }}
      />

      <CreateNewTabDialog
        isOpen={isCreateTabDialogOpen}
        onClose={() => setIsCreateTabDialogOpen(false)}
        onCreate={(name) => {
          setMappingSubTabs(prev => [...prev, name]);
          setActiveMappingSubTab(mappingSubTabs.length);
        }}
        existingTabs={mappingSubTabs}
      />

      <UploadMappingDialog
        isOpen={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
        onUpload={(file) => {
          console.log("Uploading file:", file.name);
          setIsUploadDialogOpen(false);
        }}
      />

      <BatchProcessingDialog
        isOpen={isBatchDialogOpen}
        onClose={() => setIsBatchDialogOpen(false)}
        tabName={mappingSubTabs[activeMappingSubTab]}
      />
    </div>
  );
};
