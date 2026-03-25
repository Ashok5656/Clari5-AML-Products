import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, Checkmark, Close, CheckmarkFilled, Misuse, ChevronDown, Filter, Search } from "@carbon/icons-react";
import { cn } from "./ui/utils";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { CarbonPaginationFooter } from "./carbon-pagination-footer";

interface CorrectedField {
  id: number;
  fieldName: string;
  previousValue: string;
  currentValue: string;
  status: "Pending" | "Approved" | "Rejected";
  template: string;
}

const MOCK_CORRECTED_FIELDS: CorrectedField[] = [
  { id: 1, fieldName: "CKYC Number", previousValue: "32485743", currentValue: "32485867", status: "Pending", template: "KC1" },
  { id: 2, fieldName: "Passport Number", previousValue: "CFD32485", currentValue: "CFD32654", status: "Pending", template: "KC1" },
  { id: 3, fieldName: "Suspicion Due To", previousValue: "Unknown", currentValue: "Proceeds of Crime", status: "Pending", template: "GS1" },
  { id: 4, fieldName: "Driver's License Number", previousValue: "32485743", currentValue: "32485754", status: "Pending", template: "KC1" },
  { id: 5, fieldName: "Date of Birth*", previousValue: "29/01/1999", currentValue: "29/01/1993", status: "Pending", template: "KC1" },
  { id: 6, fieldName: "Entity Name", previousValue: "Global Corp", currentValue: "Global Trade Corp", status: "Pending", template: "KC2" },
  { id: 7, fieldName: "Mobile Number", previousValue: "9154237543", currentValue: "+91 98765 43210", status: "Pending", template: "KC1" },
  { id: 8, fieldName: "Employee State Name", previousValue: "Maharashtra", currentValue: "Karnataka", status: "Pending", template: "KC1" },
  { id: 9, fieldName: "Employee City Name", previousValue: "Mumbai", currentValue: "Bangalore", status: "Pending", template: "KC1" },
  { id: 10, fieldName: "Employer Name", previousValue: "Tech Sol", currentValue: "Tech Solutions", status: "Pending", template: "KC1" },
  { id: 11, fieldName: "Occupation", previousValue: "Service", currentValue: "Business", status: "Pending", template: "KC1" },
];

interface RegulatoryCorrectedFieldsViewProps {
  reportId: string;
  onBack: () => void;
}

export function RegulatoryCorrectedFieldsView({ reportId, onBack }: RegulatoryCorrectedFieldsViewProps) {
  const [fields, setFields] = useState<CorrectedField[]>(MOCK_CORRECTED_FIELDS);
  const [selectedFields, setSelectedFields] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState("KC1");
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Date Filter State
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState("Select");
  const [filterCondition, setFilterCondition] = useState("Select");
  const [filterValue, setFilterValue] = useState("");
  const [activeDateFilters, setActiveDateFilters] = useState<{type: string, value: string} | null>(null);

  const filterRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsDateFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterRef]);

  const handleDateFilterSubmit = () => {
      setActiveDateFilters({ type: filterType, value: filterValue });
      setIsDateFilterOpen(false);
  };

  const handleDateFilterClear = () => {
      setFilterType("Select");
      setFilterCondition("Select");
      setFilterValue("");
      setActiveDateFilters(null);
  };

  const TABS = [
    "KC1", "GS1", "KC2", "TS1", "Account Detail", "Account Person Relation"
  ];

  // First filter by tab
  const tabFields = fields.filter(f => f.template === activeTab && 
    (searchQuery === "" || 
     f.fieldName.toLowerCase().includes(searchQuery.toLowerCase()) || 
     f.currentValue.toLowerCase().includes(searchQuery.toLowerCase()) ||
     f.previousValue.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  
  // Then apply pagination
  const totalItems = tabFields.length;
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const paginatedFields = tabFields.slice(startIdx, endIdx);

  const handleStatusChange = (id: number, status: "Approved" | "Rejected") => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, status } : field
    ));
  };

  const toggleSelectAll = () => {
    // Only select filtered fields (visible ones in the current tab/page)
    const pageIds = paginatedFields.map(f => f.id);
    const allPageSelected = pageIds.every(id => selectedFields.has(id));
    
    const newSelected = new Set(selectedFields);
    if (allPageSelected) {
        pageIds.forEach(id => newSelected.delete(id));
    } else {
        pageIds.forEach(id => newSelected.add(id));
    }
    setSelectedFields(newSelected);
  };

  const toggleSelect = (id: number) => {
    const newSelected = new Set(selectedFields);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedFields(newSelected);
  };

  const handleBulkAction = (action: "Approved" | "Rejected") => {
    setFields(fields.map(field => 
      selectedFields.has(field.id) ? { ...field, status: action } : field
    ));
    setSelectedFields(new Set());
  };

  return (
    <div className="flex flex-col h-full bg-gray-50/50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
             <h1 className="text-xl font-bold text-gray-900">List of Corrected Fields</h1>
             <p className="text-sm text-gray-500 mt-1">Report Reference: {reportId}</p>
          </div>
        </div>
        <div className="flex gap-3">
            <button 
                onClick={() => handleBulkAction("Rejected")}
                disabled={selectedFields.size === 0}
                className={cn(
                    "px-6 py-2.5 text-sm font-medium text-white rounded shadow-sm transition-colors",
                    selectedFields.size > 0 ? "bg-red-500 hover:bg-red-600" : "bg-gray-300 cursor-not-allowed"
                )}
            >
                Reject
            </button>
            <button 
                onClick={() => handleBulkAction("Approved")}
                disabled={selectedFields.size === 0}
                className={cn(
                    "px-6 py-2.5 text-sm font-medium text-white rounded shadow-sm transition-colors",
                    selectedFields.size > 0 ? "bg-[#5D87C9] hover:bg-[#4a72b3]" : "bg-gray-300 cursor-not-allowed"
                )}
            >
                Approve
            </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-0 py-4 overflow-hidden flex flex-col">
         {/* Summary Stats */}
         <div className="bg-white rounded-lg border border-gray-100 shadow-sm mx-0 p-4 mb-4 shrink-0 space-y-4">
             {/* Row 1 */}
             <div className="grid grid-cols-4 gap-4">
                 <div className="flex items-center gap-2">
                     <span className="text-sm text-gray-500 w-32">Alert ID</span>
                     <span className="text-sm font-semibold text-gray-900">: ALT-2025-001234</span>
                 </div>
                 <div className="flex items-center gap-2">
                     <span className="text-sm text-gray-500 w-32">Scenario Name</span>
                     <span className="text-sm font-semibold text-gray-900">: Manual Alert</span>
                 </div>
                 <div className="flex items-center gap-2">
                     <span className="text-sm text-gray-500 w-32">Created On</span>
                     <span className="text-sm font-semibold text-gray-900">: 18-01-2026</span>
                 </div>
                 <div className="flex items-center gap-2">
                     <span className="text-sm text-gray-500 w-32">CIF ID</span>
                     <span className="text-sm font-semibold text-gray-900">: C_F_10111</span>
                 </div>
             </div>

             {/* Row 2 */}
             <div className="grid grid-cols-4 gap-4">
                 <div className="flex items-center gap-2">
                     <span className="text-sm text-gray-500 w-32">Alert Type</span>
                     <div className="flex items-center gap-2">
                        <span className="text-gray-900 font-semibold">:</span>
                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full font-medium">System Alert</span>
                     </div>
                 </div>
                 <div className="flex items-center gap-2">
                     <span className="text-sm text-gray-500 w-32">Due Date</span>
                     <span className="text-sm font-semibold text-gray-900">: 20-01-2026</span>
                 </div>
                 <div className="flex items-center gap-2">
                     <span className="text-sm text-gray-500 w-32">Reporting Age</span>
                     <div className="flex items-center gap-2">
                        <span className="text-gray-900 font-semibold">:</span>
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">2 Days</span>
                     </div>
                 </div>
                 <div className="flex items-center gap-2">
                     <span className="text-sm text-gray-500 w-32">Team Name</span>
                     <span className="text-sm font-semibold text-gray-900">: AML Investigation Team</span>
                 </div>
             </div>

             {/* Row 3 */}
             <div className="grid grid-cols-4 gap-4">
                 <div className="flex items-center gap-2">
                     <span className="text-sm text-gray-500 w-32">STR Count</span>
                     <span className="text-sm font-semibold text-gray-900">: 3</span>
                 </div>
             </div>
        </div>

        {/* Tabs - Carbon Style Full Width */}
        <div className="w-full bg-[#f4f4f4] border-b border-[#e0e0e0] mb-4">
             <Tabs value={activeTab} onValueChange={(val) => { setActiveTab(val); setCurrentPage(1); }} className="w-full">
                <TabsList className="bg-transparent h-12 p-0 w-full justify-start gap-0 rounded-none">
                    {TABS.map((tab) => (
                        <TabsTrigger 
                            key={tab} 
                            value={tab}
                            className="data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:text-[#2A53A0] data-[state=active]:border-b-2 data-[state=active]:border-t-4 data-[state=active]:border-x-0 data-[state=active]:border-b-transparent data-[state=active]:border-t-[#2A53A0] rounded-none h-12 px-6 text-sm font-medium text-[#525252] border-b border-t-4 border-t-transparent border-x-0 border-b-transparent transition-colors hover:text-[#161616] hover:bg-[#e5e5e5] focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
                        >
                            {tab}
                        </TabsTrigger>
                    ))}
                </TabsList>
             </Tabs>
        </div>

        {/* Search & Filter Section */}
        <div className="mb-4">
            <div className="flex flex-wrap items-center gap-4">
                {/* Search Input */}
                <div className="w-[280px]">
                    <div className="relative h-[46px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text"
                            placeholder="Search Fields..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-full pl-10 pr-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#2A53A0] focus:ring-1 focus:ring-[#2A53A0]"
                        />
                    </div>
                </div>

                {/* Date Selection Dropdown */}
                <div className="relative" ref={filterRef}>
                    <div className="flex items-center gap-2 h-[46px]">
                        <button 
                            onClick={() => setIsDateFilterOpen(!isDateFilterOpen)}
                            className={cn(
                                "flex items-center justify-between w-[220px] h-full px-3 bg-white border rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors",
                                isDateFilterOpen ? "border-[#2A53A0] ring-1 ring-[#2A53A0]" : "border-gray-300"
                            )}
                        >
                            <span>{activeDateFilters ? `${activeDateFilters.type}: ${activeDateFilters.value}` : "Date Selection"}</span>
                            <ChevronDown size={16} className={cn("transition-transform", isDateFilterOpen ? "rotate-180" : "")} />
                        </button>
                        <button 
                            className="h-full px-3 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-[#2A53A0] hover:border-[#2A53A0] transition-colors flex items-center justify-center"
                            title="Filter Options"
                        >
                            <Filter size={18} />
                        </button>
                    </div>

                    {/* Dropdown Content */}
                    {isDateFilterOpen && (
                        <div className="absolute top-full left-0 mt-1 w-[600px] bg-white border border-gray-200 shadow-lg rounded-sm z-50 p-6 animate-in fade-in zoom-in-95 duration-100">
                            <div className="flex gap-4 mb-8">
                                {/* Filter List */}
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Filter List</label>
                                    <div className="relative">
                                        <select 
                                            value={filterType}
                                            onChange={(e) => setFilterType(e.target.value)}
                                            className="w-full appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-8 text-sm focus:outline-none focus:border-[#2A53A0] focus:ring-1 focus:ring-[#2A53A0]"
                                        >
                                            <option>Select</option>
                                            <option>Year</option>
                                            <option>Month</option>
                                            <option>Custom Date</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                                    </div>
                                </div>

                                {/* Condition */}
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                                    <div className="relative">
                                        <select 
                                            value={filterCondition}
                                            onChange={(e) => setFilterCondition(e.target.value)}
                                            className="w-full appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-8 text-sm focus:outline-none focus:border-[#2A53A0] focus:ring-1 focus:ring-[#2A53A0]"
                                        >
                                            <option>Select</option>
                                            <option>Equals</option>
                                            <option>Between</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                                    </div>
                                </div>

                                {/* Values */}
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Values</label>
                                     {filterType === "Custom Date" ? (
                                         <input 
                                            type="date" 
                                            value={filterValue}
                                            onChange={(e) => setFilterValue(e.target.value)}
                                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#2A53A0] focus:ring-1 focus:ring-[#2A53A0]"
                                         />
                                     ) : filterType === "Year" ? (
                                         <div className="relative">
                                            <select 
                                                value={filterValue}
                                                onChange={(e) => setFilterValue(e.target.value)}
                                                className="w-full appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-8 text-sm focus:outline-none focus:border-[#2A53A0] focus:ring-1 focus:ring-[#2A53A0]"
                                            >
                                                <option value="">Select Year</option>
                                                <option value="2025">2025</option>
                                                <option value="2024">2024</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                                         </div>
                                     ) : (
                                         <div className="relative">
                                            <select 
                                                className="w-full appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-8 text-sm focus:outline-none focus:border-[#2A53A0] focus:ring-1 focus:ring-[#2A53A0]"
                                                disabled={filterType === "Select"}
                                            >
                                                <option>Select</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                                         </div>
                                     )}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button 
                                    onClick={handleDateFilterClear}
                                    className="px-4 py-2 text-sm text-[#2A53A0] border border-[#2A53A0] rounded-lg hover:bg-[#2A53A0]/5 transition-colors font-medium h-[46px]"
                                >
                                    Clear
                                </button>
                                <button 
                                    onClick={handleDateFilterSubmit}
                                    className="px-4 py-2 text-sm text-white bg-[#5D87C9] rounded-lg hover:bg-[#4a72b3] transition-colors font-medium shadow-sm h-[46px]"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

        <div className="bg-white border border-[#e0e0e0] shadow-sm rounded-sm flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto">
                {paginatedFields.length > 0 ? (
                <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 z-10 shadow-sm">
                        <tr className="bg-[#F0F0F0] text-[#2A53A0] h-[48px]">
                            <th className="pl-4 pr-2 w-10 align-middle bg-[#F0F0F0]">
                                <input 
                                    type="checkbox" 
                                    className="w-4 h-4 rounded border-gray-300 text-[#2A53A0] focus:ring-[#2A53A0]"
                                    checked={paginatedFields.length > 0 && paginatedFields.every(f => selectedFields.has(f.id))}
                                    onChange={toggleSelectAll}
                                />
                            </th>
                            <th className="px-4 font-bold text-sm whitespace-nowrap align-middle bg-[#F0F0F0]">Field Name</th>
                            <th className="px-4 font-bold text-sm whitespace-nowrap align-middle bg-[#F0F0F0]">Previous Value</th>
                            <th className="px-4 font-bold text-sm whitespace-nowrap align-middle bg-[#F0F0F0]">Current Value</th>
                            <th className="px-4 font-bold text-sm whitespace-nowrap align-middle bg-[#F0F0F0]">Status</th>
                            <th className="px-4 font-bold text-sm whitespace-nowrap align-middle text-center bg-[#F0F0F0]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedFields.map((field) => (
                            <tr key={field.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors h-[48px]">
                                <td className="pl-4 pr-2 align-middle">
                                    <input 
                                        type="checkbox" 
                                        className="w-4 h-4 rounded border-gray-300 text-[#2A53A0] focus:ring-[#2A53A0]"
                                        checked={selectedFields.has(field.id)}
                                        onChange={() => toggleSelect(field.id)}
                                    />
                                </td>
                                <td className="px-4 text-sm text-[#161616] font-normal align-middle">
                                    {field.fieldName}
                                </td>
                                <td className="px-4 text-sm text-[#525252] align-middle bg-[#f4f4f4]">
                                    {field.previousValue}
                                </td>
                                <td className="px-4 text-sm text-[#161616] font-medium align-middle">
                                    {field.currentValue}
                                </td>
                                <td className="px-4 align-middle">
                                    <span className={cn(
                                        "inline-flex items-center px-2 py-1 text-xs font-medium border",
                                        field.status === "Pending" && "bg-[#fff1d6] text-[#b37a00] border-[#b37a00]",
                                        field.status === "Approved" && "bg-[#defbe6] text-[#0e6027] border-[#0e6027]",
                                        field.status === "Rejected" && "bg-[#fff0f1] text-[#da1e28] border-[#da1e28]"
                                    )}>
                                        {field.status}
                                    </span>
                                </td>
                                <td className="px-4 align-middle">
                                    <div className="flex items-center justify-center gap-2">
                                        <button 
                                            onClick={() => handleStatusChange(field.id, "Approved")}
                                            className={cn(
                                                "flex items-center justify-center w-8 h-8 rounded-sm transition-colors",
                                                field.status === "Approved" 
                                                    ? "bg-[#198038] text-white" 
                                                    : "bg-[#198038]/10 hover:bg-[#198038]/20 text-[#198038]"
                                            )}
                                            title="Approve"
                                        >
                                            {field.status === "Approved" ? <CheckmarkFilled size={16} /> : <Checkmark size={16} />}
                                        </button>
                                        <button 
                                            onClick={() => handleStatusChange(field.id, "Rejected")}
                                            className={cn(
                                                "flex items-center justify-center w-8 h-8 rounded-sm transition-colors",
                                                field.status === "Rejected" 
                                                    ? "bg-[#da1e28] text-white" 
                                                    : "bg-[#da1e28]/10 hover:bg-[#da1e28]/20 text-[#da1e28]"
                                            )}
                                            title="Reject"
                                        >
                                            {field.status === "Rejected" ? <Misuse size={16} /> : <Close size={16} />}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-[#525252]">
                        <div className="bg-[#f4f4f4] p-4 rounded-full mb-3">
                            <CheckmarkFilled size={32} className="text-[#a8a8a8]" />
                        </div>
                        <p className="text-lg font-medium">No corrected fields for {activeTab}</p>
                        <p className="text-sm">There are no pending corrections in this section.</p>
                    </div>
                )}
            </div>
            
            {/* Pagination Footer - Carbon Style */}
            {tabFields.length > 0 && (
                <CarbonPaginationFooter 
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalItems={totalItems}
                />
            )}
        </div>
      </div>
    </div>
  );
}
