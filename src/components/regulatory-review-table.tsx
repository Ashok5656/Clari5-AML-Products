import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Download, View, Search, Filter, WarningFilled } from "@carbon/icons-react";
import { cn } from "./ui/utils";
import { RegulatoryReviewDetail } from "./regulatory-review-detail";
import { RegulatoryReportPreview } from "./regulatory-report-preview";
import { CarbonPaginationFooter } from "./carbon-pagination-footer";
import { useSortableData } from "../hooks/use-sortable-data";
import { SortableHeader } from "./ui/sortable-header";

interface ReviewItem {
  id: string;
  referenceNumber: string;
  ucicId: string;
  cifId: string;
  alertScenario: string;
  projectName: string;
  createdOn: string;
  dueDate: string;
  reportAging: string;
  lanId: string;
  status: 'valid' | 'invalid';
  errorMessage?: string;
}

const MOCK_REVIEW_DATA: ReviewItem[] = [
  // Valid Items (Keeping some existing ones for the "Without Errors" tab)
  { id: "1", referenceNumber: "STR-8202410283009", ucicId: "75989700", cifId: "C_F_10111", alertScenario: "Manual Alert", projectName: "GBOAML", createdOn: "18-01-2026", dueDate: "20-01-2026", reportAging: "2 Days", lanId: "Superuser233", status: 'valid' },
  { id: "2", referenceNumber: "STR-8202410283008", ucicId: "75989699", cifId: "C_F_000000379", alertScenario: "Manual Alert", projectName: "TBAML", createdOn: "18-01-2026", dueDate: "20-01-2026", reportAging: "2 Days", lanId: "Superuser224", status: 'valid' },
  { id: "3", referenceNumber: "STR-8202410283007", ucicId: "75989698", cifId: "C_F_0000003831", alertScenario: "HIGH-VALUE-CASH..", projectName: "GBOAML", createdOn: "17-01-2026", dueDate: "19-01-2026", reportAging: "3 Days", lanId: "Superuser2", status: 'valid' },
  { id: "4", referenceNumber: "STR-8202410283006", ucicId: "75989697", cifId: "C_F_10112", alertScenario: "Manual Alert", projectName: "TBAML", createdOn: "17-01-2026", dueDate: "19-01-2026", reportAging: "3 Days", lanId: "Superuser22", status: 'valid' },
  { id: "5", referenceNumber: "STR-8202410283005", ucicId: "75989696", cifId: "C_F_000000378", alertScenario: "HIGH-VALUE-CASH", projectName: "GBOAML", createdOn: "16-01-2026", dueDate: "18-01-2026", reportAging: "4 Days", lanId: "Superuser3", status: 'valid' },
  { id: "6", referenceNumber: "STR-8202410283004", ucicId: "75989695", cifId: "C_F_0000003832", alertScenario: "HIGH-VALUE-CAS..", projectName: "TBAML", createdOn: "16-01-2026", dueDate: "18-01-2026", reportAging: "4 Days", lanId: "Superuser33", status: 'valid' },
  { id: "7", referenceNumber: "STR-8202410283003", ucicId: "75989694", cifId: "C_F_10113", alertScenario: "Manual Alert", projectName: "GBOAML", createdOn: "15-01-2026", dueDate: "17-01-2026", reportAging: "5 Days", lanId: "Superuser4", status: 'valid' },
  { id: "8", referenceNumber: "STR-8202410283002", ucicId: "75989693", cifId: "C_F_000000377", alertScenario: "HIGH-VALUE-CASH", projectName: "CGMOAML", createdOn: "15-01-2026", dueDate: "17-01-2026", reportAging: "5 Days", lanId: "Superuser44", status: 'valid' },
  { id: "9", referenceNumber: "STR-8202410283011", ucicId: "75989692", cifId: "C_F_0000003833", alertScenario: "Manual Alert", projectName: "GBOAML", createdOn: "14-01-2026", dueDate: "16-01-2026", reportAging: "6 Days", lanId: "Superuser5", status: 'valid' },
  { id: "10", referenceNumber: "STR-8202410283019", ucicId: "75989691", cifId: "C_F_10114", alertScenario: "Manual Alert", projectName: "CGMOAML", createdOn: "14-01-2026", dueDate: "16-01-2026", reportAging: "6 Days", lanId: "Superuser55", status: 'valid' },
  { id: "11", referenceNumber: "STR-8202410283018", ucicId: "75989690", cifId: "C_F_000000376", alertScenario: "HIGH-VALUE-CASH", projectName: "GBOAML", createdOn: "13-01-2026", dueDate: "15-01-2026", reportAging: "7 Days", lanId: "Dev1", status: 'valid' },
  { id: "12", referenceNumber: "STR-8202410283017", ucicId: "75989689", cifId: "C_F_0000003834", alertScenario: "Manual Alert", projectName: "BFILAML", createdOn: "13-01-2026", dueDate: "15-01-2026", reportAging: "7 Days", lanId: "Dev2", status: 'valid' },
  { id: "13", referenceNumber: "STR-8202410283016", ucicId: "75989688", cifId: "C_F_10115", alertScenario: "HIGH-VALUE-CASH", projectName: "GBOAML", createdOn: "12-01-2026", dueDate: "14-01-2026", reportAging: "8 Days", lanId: "Dev3", status: 'valid' },
  { id: "14", referenceNumber: "STR-8202410283015", ucicId: "75989687", cifId: "C_F_000000375", alertScenario: "Manual Alert", projectName: "BFILAML", createdOn: "12-01-2026", dueDate: "14-01-2026", reportAging: "8 Days", lanId: "Superuser6", status: 'valid' },
  { id: "15", referenceNumber: "STR-8202410283020", ucicId: "75989701", cifId: "C_F_10116", alertScenario: "Manual Alert", projectName: "GBOAML", createdOn: "11-01-2026", dueDate: "13-01-2026", reportAging: "9 Days", lanId: "Superuser234", status: 'valid' },
  { id: "16", referenceNumber: "STR-8202410283021", ucicId: "75989702", cifId: "C_F_000000380", alertScenario: "Manual Alert", projectName: "TBAML", createdOn: "11-01-2026", dueDate: "13-01-2026", reportAging: "9 Days", lanId: "Superuser225", status: 'valid' },
  
  // Invalid Items (Based on the attached image)
  { id: "inv-1", referenceNumber: "STR-8202410282009", ucicId: "75989700", cifId: "C_F_10111", alertScenario: "Manual Alert", projectName: "GBOAML", createdOn: "10-01-2026", dueDate: "12-01-2026", reportAging: "10 Days", lanId: "Superuser233", status: 'invalid' },
  { id: "inv-2", referenceNumber: "STR-8202410282008", ucicId: "75989699", cifId: "C_F_000000379", alertScenario: "Manual Alert", projectName: "TBAML", createdOn: "10-01-2026", dueDate: "12-01-2026", reportAging: "10 Days", lanId: "Superuser224", status: 'invalid' },
  { id: "inv-3", referenceNumber: "STR-8202410282007", ucicId: "75989698", cifId: "C_F_0000003831", alertScenario: "HIGH-VALUE-CASH..", projectName: "GBOAML", createdOn: "09-01-2026", dueDate: "11-01-2026", reportAging: "11 Days", lanId: "Superuser2", status: 'invalid' },
  { id: "inv-4", referenceNumber: "STR-8202410282006", ucicId: "75989697", cifId: "C_F_10112", alertScenario: "Manual Alert", projectName: "TBAML", createdOn: "09-01-2026", dueDate: "11-01-2026", reportAging: "11 Days", lanId: "Superuser22", status: 'invalid' },
  { id: "inv-5", referenceNumber: "STR-8202410282005", ucicId: "75989696", cifId: "C_F_000000378", alertScenario: "HIGH-VALUE-CASH", projectName: "GBOAML", createdOn: "08-01-2026", dueDate: "10-01-2026", reportAging: "12 Days", lanId: "Superuser3", status: 'invalid' },
  { id: "inv-6", referenceNumber: "STR-8202410282004", ucicId: "75989695", cifId: "C_F_0000003832", alertScenario: "HIGH-VALUE-CAS..", projectName: "TBAML", createdOn: "08-01-2026", dueDate: "10-01-2026", reportAging: "12 Days", lanId: "Superuser33", status: 'invalid' },
  { id: "inv-7", referenceNumber: "STR-8202410282003", ucicId: "75989694", cifId: "C_F_10113", alertScenario: "Manual Alert", projectName: "GBOAML", createdOn: "07-01-2026", dueDate: "09-01-2026", reportAging: "13 Days", lanId: "Superuser4", status: 'invalid' },
  { id: "inv-8", referenceNumber: "STR-8202410282002", ucicId: "75989693", cifId: "C_F_000000377", alertScenario: "HIGH-VALUE-CASH", projectName: "CGMOAML", createdOn: "07-01-2026", dueDate: "09-01-2026", reportAging: "13 Days", lanId: "Superuser44", status: 'invalid' },
  { id: "inv-9", referenceNumber: "STR-8202410283011", ucicId: "75989692", cifId: "C_F_0000003833", alertScenario: "Manual Alert", projectName: "GBOAML", createdOn: "06-01-2026", dueDate: "08-01-2026", reportAging: "14 Days", lanId: "Superuser5", status: 'invalid' },
  { id: "inv-10", referenceNumber: "STR-8202410283019", ucicId: "75989691", cifId: "C_F_10114", alertScenario: "Manual Alert", projectName: "CGMOAML", createdOn: "06-01-2026", dueDate: "08-01-2026", reportAging: "14 Days", lanId: "Superuser55", status: 'invalid' },
  { id: "inv-11", referenceNumber: "STR-8202410283018", ucicId: "75989690", cifId: "C_F_000000376", alertScenario: "HIGH-VALUE-CASH", projectName: "GBOAML", createdOn: "05-01-2026", dueDate: "07-01-2026", reportAging: "15 Days", lanId: "Dev1", status: 'invalid' },
  { id: "inv-12", referenceNumber: "STR-8202410283017", ucicId: "75989689", cifId: "C_F_0000003834", alertScenario: "Manual Alert", projectName: "BFILAML", createdOn: "05-01-2026", dueDate: "07-01-2026", reportAging: "15 Days", lanId: "Dev2", status: 'invalid' },
  { id: "inv-13", referenceNumber: "STR-8202410283016", ucicId: "75989688", cifId: "C_F_10115", alertScenario: "HIGH-VALUE-CASH", projectName: "GBOAML", createdOn: "04-01-2026", dueDate: "06-01-2026", reportAging: "16 Days", lanId: "Dev3", status: 'invalid' },
  { id: "inv-14", referenceNumber: "STR-8202410283015", ucicId: "75989687", cifId: "C_F_000000375", alertScenario: "Manual Alert", projectName: "BFILAML", createdOn: "04-01-2026", dueDate: "06-01-2026", reportAging: "16 Days", lanId: "Superuser6", status: 'invalid' },
];

export function RegulatoryReviewTable({ reportType, onSwitchTab }: { reportType: string, onSwitchTab?: (tab: string) => void }) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [reviewTab, setReviewTab] = useState<'valid' | 'invalid'>('valid');
  
  // Detail View State
  const [viewItem, setViewItem] = useState<ReviewItem | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail' | 'preview'>('list');

  // Date Filter State
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState("Select");
  const [filterCondition, setFilterCondition] = useState("Select");
  const [filterValue, setFilterValue] = useState("");
  const [activeDateFilters, setActiveDateFilters] = useState<{type: string, value: string} | null>(null);
  
  // Project Filter State
  const [projectFilter, setProjectFilter] = useState("Select Project");

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

  // Reset selection when tab changes
  useEffect(() => {
      setSelectedRows(new Set());
      setCurrentPage(1);
      setViewItem(null); // Reset detail view when tab changes
      setViewMode('list');
  }, [reviewTab]);

  const getFilteredDataByTab = () => {
      return MOCK_REVIEW_DATA.filter(item => item.status === reviewTab);
  };

  const currentTabData = getFilteredDataByTab();

  // Get unique project names for filter
  const projectNames = Array.from(new Set(MOCK_REVIEW_DATA.map(item => item.projectName)));

  const filteredData = currentTabData.filter(item => {
    const displayId = item.referenceNumber.replace("STR", reportType);
    const matchesSearch = displayId.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Date Filtering
    let matchesDate = true;
    if (activeDateFilters) {
        if (activeDateFilters.type === "Year" && activeDateFilters.value) {
            matchesDate = item.createdOn.includes(activeDateFilters.value);
        }
    }

    // Project Filtering
    let matchesProject = true;
    if (projectFilter !== "Select Project") {
        matchesProject = item.projectName === projectFilter;
    }

    return matchesSearch && matchesDate && matchesProject;
  });

  const { items: sortedData, requestSort, sortConfig } = useSortableData(filteredData);

  const validCount = MOCK_REVIEW_DATA.filter(i => i.status === 'valid').length;
  const invalidCount = MOCK_REVIEW_DATA.filter(i => i.status === 'invalid').length;

  // Pagination Logic
  const totalItems = sortedData.length;
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const paginatedData = sortedData.slice(startIdx, endIdx);

  if (viewMode === 'preview') {
      return (
          <RegulatoryReportPreview 
              onBack={() => setViewMode('detail')} 
              hasErrors={viewItem?.status === 'invalid'}
              onOk={() => {
                  setViewItem(null);
                  setViewMode('list');
                  if (viewItem?.status === 'invalid') {
                      onSwitchTab?.('pending');
                  }
              }}
          />
      );
  }

  if (viewMode === 'detail' && viewItem) {
      return (
          <RegulatoryReviewDetail 
              item={viewItem} 
              reportType={reportType} 
              onBack={() => {
                  setViewItem(null);
                  setViewMode('list');
              }}
              onNext={() => setViewMode('preview')}
          />
      );
  }

  const toggleRow = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleAll = () => {
    const pageIds = paginatedData.map(d => d.id);
    const allPageSelected = pageIds.every(id => selectedRows.has(id));

    const newSelected = new Set(selectedRows);
    if (allPageSelected) {
        pageIds.forEach(id => newSelected.delete(id));
    } else {
        pageIds.forEach(id => newSelected.add(id));
    }
    setSelectedRows(newSelected);
  };

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

  return (
    <div className="flex flex-col h-full gap-4">
      
      {/* Tab Selection */}
      <div className="w-full bg-[#f4f4f4] border-b border-[#e0e0e0]">
        <div className="flex w-full h-12">
            <button 
                onClick={() => setReviewTab('valid')}
                className={cn(
                    "flex-1 flex items-center justify-center gap-2 h-12 px-6 text-sm font-medium rounded-none border-t-4 border-b border-x-0 transition-colors focus:outline-none",
                    reviewTab === 'valid' 
                        ? "bg-white text-[#2A53A0] border-t-[#2A53A0] border-b-transparent shadow-none" 
                        : "bg-transparent text-[#525252] border-t-transparent border-b-transparent hover:text-[#161616] hover:bg-[#e5e5e5]"
                )}
            >
                Without Errors
                <span className={cn(
                    "px-1.5 py-0.5 rounded-full text-xs ml-1",
                    reviewTab === 'valid' ? "bg-blue-50 text-[#2A53A0]" : "bg-[#e0e0e0] text-[#525252]"
                )}>
                    {validCount}
                </span>
            </button>
            <button 
                onClick={() => setReviewTab('invalid')}
                className={cn(
                    "flex-1 flex items-center justify-center gap-2 h-12 px-6 text-sm font-medium rounded-none border-t-4 border-b border-x-0 transition-colors focus:outline-none",
                    reviewTab === 'invalid' 
                        ? "bg-white text-[#2A53A0] border-t-[#2A53A0] border-b-transparent shadow-none" 
                        : "bg-transparent text-[#525252] border-t-transparent border-b-transparent hover:text-[#161616] hover:bg-[#e5e5e5]"
                )}
            >
                With Errors
                <span className={cn(
                    "px-1.5 py-0.5 rounded-full text-xs ml-1",
                    reviewTab === 'invalid' ? "bg-red-50 text-red-600" : "bg-[#e0e0e0] text-[#525252]"
                )}>
                    {invalidCount}
                </span>
            </button>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="">
        <div className="flex flex-wrap items-center gap-4">
          
          {/* Search Input */}
          <div className="w-[280px]">
            <div className="relative h-[46px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text"
                placeholder="Search Batch Reference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-full pl-10 pr-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#2A53A0] focus:ring-1 focus:ring-[#2A53A0]"
              />
            </div>
          </div>

          {/* Project Filter */}
          <div className="relative w-[200px]">
            <div className="relative h-[46px]">
              <select
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
                className="w-full h-full appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm text-gray-700 focus:outline-none focus:border-[#2A53A0] focus:ring-1 focus:ring-[#2A53A0] cursor-pointer"
              >
                <option>Select Project</option>
                {projectNames.map(name => (
                    <option key={name} value={name}>{name}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
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

          {/* Consolidate STR Button (Only visible for Valid items) */}
          <div className="ml-auto flex items-center gap-2 pb-[1px]">
            {reviewTab === 'valid' && (
                <button 
                  disabled={selectedRows.size === 0}
                  className={cn(
                      "px-6 py-2 text-sm text-white rounded-lg transition-colors font-medium h-[46px] shadow-sm",
                      selectedRows.size > 0 
                        ? "bg-[#2A53A0] hover:bg-[#1e3a70]" 
                        : "bg-gray-300 cursor-not-allowed"
                  )}
                >
                  Consolidate {reportType}
                </button>
            )}
            
            {reviewTab === 'invalid' && (
                <button 
                  className={cn(
                      "px-6 py-2 text-sm text-white rounded-lg transition-colors font-medium h-[46px] shadow-sm bg-gray-300 cursor-not-allowed"
                  )}
                  disabled
                >
                  Fix Errors
                </button>
            )}
          </div>

        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 bg-white border border-gray-200 shadow-sm rounded-sm flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto relative [&::-webkit-scrollbar]:w-0 hover:[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#a8a8a8]">
          <table className="w-full text-left border-collapse min-w-[1400px]">
            <thead className="sticky top-0 z-10 shadow-sm">
              <tr className="bg-[#F0F0F0] text-[#2A53A0] h-[48px]">
                <th className="pl-4 pr-2 w-10 align-middle bg-[#F0F0F0]">
                    <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300 text-[#2A53A0] focus:ring-[#2A53A0]"
                        checked={paginatedData.length > 0 && paginatedData.every(d => selectedRows.has(d.id))}
                        onChange={toggleAll}
                    />
                </th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle whitespace-nowrap bg-[#F0F0F0]">
                  <SortableHeader column="referenceNumber" label="Batch Reference Number" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle whitespace-nowrap bg-[#F0F0F0]">
                  <SortableHeader column="ucicId" label="UCIC ID" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle whitespace-nowrap bg-[#F0F0F0]">
                  <SortableHeader column="cifId" label="CIF ID" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle whitespace-nowrap bg-[#F0F0F0]">
                  <SortableHeader column="alertScenario" label="Alert Scenario" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle whitespace-nowrap bg-[#F0F0F0]">
                  <SortableHeader column="projectName" label="Project Name" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle whitespace-nowrap bg-[#F0F0F0]">
                  <SortableHeader column="createdOn" label="Created On" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle whitespace-nowrap bg-[#F0F0F0]">
                  <SortableHeader column="dueDate" label="Due Date" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle whitespace-nowrap bg-[#F0F0F0]">
                  <SortableHeader column="reportAging" label="Report Aging" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle whitespace-nowrap bg-[#F0F0F0]">
                  <SortableHeader column="lanId" label="LAN ID" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                {reviewTab === 'invalid' && (
                    <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle whitespace-nowrap bg-[#F0F0F0]">
                      <SortableHeader column="errorMessage" label="Error Flag" sortConfig={sortConfig} onSort={requestSort} />
                    </th>
                )}
                <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle text-left whitespace-nowrap bg-[#F0F0F0]">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => {
                  const isSelected = selectedRows.has(row.id);
                  const displayId = row.referenceNumber.replace("STR", reportType);
                  
                  return (
                    <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors h-[46px]">
                        <td className="pl-4 pr-2 align-middle">
                            <input 
                                type="checkbox" 
                                className="w-4 h-4 rounded border-gray-300 text-[#2A53A0] focus:ring-[#2A53A0]"
                                checked={isSelected}
                                onChange={() => toggleRow(row.id)}
                            />
                        </td>
                        <td className="px-4 align-middle text-sm text-gray-700 whitespace-nowrap">
                            {displayId}
                        </td>
                        <td className="px-4 align-middle text-sm text-gray-700 whitespace-nowrap">
                            {row.ucicId}
                        </td>
                        <td className="px-4 align-middle text-sm text-gray-700 whitespace-nowrap">
                            {row.cifId}
                        </td>
                        <td className="px-4 align-middle text-sm text-gray-700 whitespace-nowrap">
                            {row.alertScenario}
                        </td>
                        <td className="px-4 align-middle text-sm text-gray-700 whitespace-nowrap">
                            {row.projectName}
                        </td>
                        <td className="px-4 align-middle text-sm text-gray-700 whitespace-nowrap">
                            {row.createdOn}
                        </td>
                        <td className="px-4 align-middle text-sm text-gray-700 whitespace-nowrap">
                            {row.dueDate}
                        </td>
                        <td className="px-4 align-middle text-sm text-gray-700 whitespace-nowrap">
                             {row.reportAging}
                        </td>
                        <td className="px-4 align-middle text-sm text-gray-700 whitespace-nowrap">
                            {row.lanId}
                        </td>
                        {reviewTab === 'invalid' && (
                            <td className="px-4 align-middle text-sm text-gray-700 whitespace-nowrap">
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-50 text-red-600">
                                     <WarningFilled size={18} />
                                </div>
                            </td>
                        )}
                        <td className="px-4 align-middle text-sm text-gray-700 text-left whitespace-nowrap">
                            <div className="flex items-center justify-start gap-2">
                                <button 
                                    className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#00B6B2]/10 hover:bg-[#00B6B2]/20 text-[#00B6B2] transition-colors"
                                    title="Download"
                                >
                                    <Download size={16} />
                                </button>
                                <button 
                                    className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#3b82f6]/10 hover:bg-[#3b82f6]/20 text-[#3b82f6] transition-colors"
                                    onClick={() => {
                                        setViewItem(row);
                                        setViewMode('detail');
                                    }}
                                    title="View"
                                >
                                    <View size={16} />
                                </button>
                            </div>
                        </td>
                    </tr>
                  );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer - Carbon Design System Style */}
        <CarbonPaginationFooter 
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItems={totalItems}
        />
      </div>
    </div>
  );
}
