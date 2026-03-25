import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, CaretLeft, CaretRight, Search, ArrowsHorizontal, UserAvatarFilledAlt, Filter, CheckmarkFilled, Edit } from "@carbon/icons-react";
import { cn } from "./ui/utils";
import { RegulatoryReportPreview } from "./regulatory-report-preview";
import { RegulatoryCorrectedFieldsView } from "./regulatory-corrected-fields-view";
import { useSortableData } from "../hooks/use-sortable-data";
import { SortableHeader } from "./ui/sortable-header";

interface PendingItem {
  id: string;
  referenceNumber: string;
  cifId: string;
  ucicId: string;
  alertScenario: string;
  projectName: string;
  createdOn: string;
  correctedBy: "By UI" | "By File";
}

const MOCK_PENDING_DATA: PendingItem[] = [
  { id: "1", referenceNumber: "STR-8202410282009", cifId: "C_F_10111", ucicId: "C_F_101119809", alertScenario: "Manual Alert", projectName: "GBOAML", createdOn: "18-01-2026", correctedBy: "By UI" },
  { id: "2", referenceNumber: "STR-8202410282008", cifId: "C_F_000000379", ucicId: "C_F_000000379", alertScenario: "Manual Alert", projectName: "TBAML", createdOn: "18-01-2026", correctedBy: "By File" },
  { id: "3", referenceNumber: "STR-8202410282007", cifId: "C_F_0000003831", ucicId: "C_F_0000003831", alertScenario: "HIGH-VALUE-CASH - WITHDRAW", projectName: "GBOAML", createdOn: "17-01-2026", correctedBy: "By UI" },
  { id: "4", referenceNumber: "STR-8202410282006", cifId: "C_F_10112", ucicId: "C_F_10112", alertScenario: "Manual Alert", projectName: "TBAML", createdOn: "17-01-2026", correctedBy: "By File" },
  { id: "5", referenceNumber: "STR-8202410282005", cifId: "C_F_000000378", ucicId: "C_F_000000378", alertScenario: "HIGH-VALUE-CASH", projectName: "GBOAML", createdOn: "16-01-2026", correctedBy: "By UI" },
  { id: "6", referenceNumber: "STR-8202410282004", cifId: "C_F_0000003832", ucicId: "C_F_0000003832", alertScenario: "HIGH-VALUE-CASH - WITHDRAW", projectName: "TBAML", createdOn: "16-01-2026", correctedBy: "By File" },
  { id: "7", referenceNumber: "STR-8202410282003", cifId: "C_F_10113", ucicId: "C_F_10113", alertScenario: "Manual Alert", projectName: "GBOAML", createdOn: "15-01-2026", correctedBy: "By UI" },
  { id: "8", referenceNumber: "STR-8202410282002", cifId: "C_F_000000377", ucicId: "C_F_000000377", alertScenario: "HIGH-VALUE-CASH", projectName: "CGMOAML", createdOn: "15-01-2026", correctedBy: "By File" },
  { id: "9", referenceNumber: "STR-8202410282001", cifId: "C_F_0000003833", ucicId: "C_F_0000003833", alertScenario: "Manual Alert", projectName: "GBOAML", createdOn: "14-01-2026", correctedBy: "By UI" },
  { id: "10", referenceNumber: "STR-8202410282009", cifId: "C_F_10114", ucicId: "C_F_10114", alertScenario: "Manual Alert", projectName: "CGMOAML", createdOn: "14-01-2026", correctedBy: "By File" },
  { id: "11", referenceNumber: "STR-8202410282008", cifId: "C_F_000000376", ucicId: "C_F_000000376", alertScenario: "HIGH-VALUE-CASH", projectName: "GBOAML", createdOn: "13-01-2026", correctedBy: "By UI" },
  { id: "12", referenceNumber: "STR-8202410282007", cifId: "C_F_0000003834", ucicId: "C_F_0000003834", alertScenario: "Manual Alert", projectName: "BFILAML", createdOn: "13-01-2026", correctedBy: "By File" },
  { id: "13", referenceNumber: "STR-8202410282006", cifId: "C_F_10115", ucicId: "C_F_10115", alertScenario: "HIGH-VALUE-CASH", projectName: "GBOAML", createdOn: "12-01-2026", correctedBy: "By UI" },
  { id: "14", referenceNumber: "STR-8202410282005", cifId: "C_F_000000375", ucicId: "C_F_000000375", alertScenario: "Manual Alert", projectName: "BFILAML", createdOn: "12-01-2026", correctedBy: "By File" },
  { id: "15", referenceNumber: "STR-8202410282009", cifId: "C_F_0000003835", ucicId: "C_F_0000003835", alertScenario: "Manual Alert", projectName: "GBOAML", createdOn: "11-01-2026", correctedBy: "By UI" },
  { id: "16", referenceNumber: "STR-8202410282009", cifId: "C_F_10116", ucicId: "C_F_10116", alertScenario: "HIGH-VALUE-CASH - WITHDRAW", projectName: "BFILAML", createdOn: "11-01-2026", correctedBy: "By File" },
];

export function RegulatoryPendingTable({ reportType, onSwitchTab }: { reportType: string, onSwitchTab?: (tab: string) => void }) {
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'list' | 'approval' | 'corrected-fields'>('list');
  const [selectedItem, setSelectedItem] = useState<PendingItem | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

  const handleConsolidate = () => {
      setShowSuccessModal(true);
  };

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
    if (selectedRows.size === MOCK_PENDING_DATA.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(MOCK_PENDING_DATA.map(d => d.id)));
    }
  };

  // Get unique project names for filter
  const projectNames = Array.from(new Set(MOCK_PENDING_DATA.map(item => item.projectName)));
  
  const filteredData = MOCK_PENDING_DATA.filter(item => {
    const displayId = item.referenceNumber.replace("STR", reportType);
    const matchesSearch = displayId.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.cifId.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.ucicId.toLowerCase().includes(searchQuery.toLowerCase());

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

  if (viewMode === 'approval' && selectedItem) {
      return (
          <RegulatoryReportPreview 
              mode="approval"
              onBack={() => {
                  setViewMode('list');
                  setSelectedItem(null);
              }}
              onAccept={(comment) => {
                  console.log("Accepted with comment:", comment);
                  onSwitchTab?.('corrected');
              }}
              onReject={(comment) => {
                  console.log("Rejected with comment:", comment);
                  setViewMode('list');
                  setSelectedItem(null);
              }}
          />
      );
  }

  if (viewMode === 'corrected-fields' && selectedItem) {
      return (
          <RegulatoryCorrectedFieldsView 
              reportId={selectedItem.referenceNumber}
              onBack={() => {
                  setViewMode('list');
                  setSelectedItem(null);
              }}
          />
      );
  }

  return (
    <div className="flex flex-col h-full gap-3 relative">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="text-center space-y-6 max-w-md w-full bg-white p-8 rounded-lg shadow-xl animate-in zoom-in-95 duration-200">
                 <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2 ring-8 bg-green-100 text-green-600 ring-green-50">
                        <CheckmarkFilled size={32} />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <h2 className="text-xl font-bold text-gray-900">Success</h2>
                    <p className="text-gray-600 text-sm">
                        Reports Consolidated Successfully
                    </p>
                 </div>
                 <div className="pt-2">
                    <button 
                        onClick={() => {
                            setShowSuccessModal(false);
                            setSelectedRows(new Set());
                        }}
                        className="w-full bg-[#2A53A0] hover:bg-[#1e3a70] text-white px-8 py-2.5 rounded-sm text-sm font-medium transition-colors shadow-sm"
                    >
                        Continue
                    </button>
                 </div>
            </div>
        </div>
      )}

      {/* Search & Filter Section */}
      <div>
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
                        checked={selectedRows.size === MOCK_PENDING_DATA.length && MOCK_PENDING_DATA.length > 0}
                        onChange={toggleAll}
                    />
                </th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle whitespace-nowrap bg-[#F0F0F0]">
                  <SortableHeader column="referenceNumber" label="Batch Reference Number" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle whitespace-nowrap bg-[#F0F0F0]">
                  <SortableHeader column="cifId" label="CIF ID" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle whitespace-nowrap bg-[#F0F0F0]">
                  <SortableHeader column="ucicId" label="UCIC ID" sortConfig={sortConfig} onSort={requestSort} />
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
                  <SortableHeader column="correctedBy" label="Corrected By" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle text-left whitespace-nowrap bg-[#F0F0F0]">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((row, index) => {
                  const isSelected = selectedRows.has(row.id);
                  const displayId = row.referenceNumber.replace("STR", reportType);
                  
                  return (
                    <tr key={row.id + index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors h-[46px]">
                        <td className="pl-4 pr-2 align-middle">
                            <input 
                                type="checkbox" 
                                className="w-4 h-4 rounded border-gray-300 text-[#2A53A0] focus:ring-[#2A53A0]"
                                checked={isSelected}
                                onChange={() => toggleRow(row.id)}
                            />
                        </td>
                        <td className="px-4 align-middle text-sm text-gray-700 whitespace-nowrap font-medium text-[#2A53A0]">
                            {displayId}
                        </td>
                        <td className="px-4 align-middle text-sm text-gray-700 whitespace-nowrap">
                            {row.cifId}
                        </td>
                        <td className="px-4 align-middle text-sm text-gray-700 whitespace-nowrap">
                            {row.ucicId}
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
                            {row.correctedBy}
                        </td>
                        <td className="px-4 align-middle text-sm text-gray-700 text-left whitespace-nowrap">
                            <div className="flex items-center justify-start gap-2">
                                <button 
                                    className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#a855f7]/10 hover:bg-[#a855f7]/20 text-[#a855f7] transition-colors"
                                    title="Corrected Fields"
                                    onClick={() => {
                                        setSelectedItem(row);
                                        setViewMode('corrected-fields');
                                    }}
                                >
                                    <Edit size={16} />
                                </button>
                                <button 
                                    className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#f59e0b]/10 hover:bg-[#f59e0b]/20 text-[#f59e0b] transition-colors"
                                    title="Approve"
                                    onClick={() => {
                                        setSelectedItem(row);
                                        setViewMode('approval');
                                    }}
                                >
                                    <UserAvatarFilledAlt size={16} />
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
        <div className="bg-white border-t border-[#e0e0e0] h-12 flex items-center justify-between text-base text-[#161616] select-none w-full font-sans">
          
          {/* Left Side: Items per page & Range */}
          <div className="flex items-center h-full">
            {/* Items per page */}
            <div className="flex items-center h-full border-r border-[#e0e0e0] px-4">
              <span className="mr-2 text-[#525252] font-normal hidden sm:block">Items per page:</span>
              <div className="relative inline-flex items-center cursor-pointer h-full">
                <select 
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="appearance-none bg-transparent font-medium pr-8 h-12 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0f62fe] border-b border-transparent hover:bg-[#e0e0e0] transition-colors"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <ChevronDown size={16} className="absolute right-2 pointer-events-none text-[#161616]" />
              </div>
            </div>

            {/* Range Text */}
            <div className="flex items-center h-full px-4">
              <span className="text-[#525252]">
                <span className="text-[#161616] font-medium">1–{Math.min(pageSize, 200)}</span> of <span className="text-[#161616] font-medium">200</span> items
              </span>
            </div>
          </div>

          {/* Right Side: Navigation */}
          <div className="flex items-center h-full">
            {/* Page Select */}
            <div className="border-l border-[#e0e0e0] h-full flex items-center">
               <div className="relative h-full inline-flex items-center">
                  <select 
                    value={currentPage}
                    onChange={(e) => setCurrentPage(Number(e.target.value))}
                    className="appearance-none bg-transparent font-medium pl-4 pr-10 h-12 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0f62fe] border-b border-transparent hover:bg-[#e0e0e0] transition-colors"
                  >
                    {[...Array(Math.ceil(200/pageSize))].map((_, i) => (
                       <option key={i+1} value={i+1}>{i+1}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 pointer-events-none text-[#161616]" />
               </div>
               <span className="text-[#525252] pr-4 border-r border-[#e0e0e0] h-full flex items-center">of {Math.ceil(200/pageSize)} pages</span>
            </div>

            {/* Navigation Buttons */}
            <div className="flex h-full">
              <button 
                className="w-12 h-full flex items-center justify-center hover:bg-[#e0e0e0] disabled:opacity-25 disabled:hover:bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-[#0f62fe] inset-0 text-[#161616]"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              >
                <CaretLeft size={20} />
              </button>
              <button 
                className="w-12 h-full flex items-center justify-center border-l border-[#e0e0e0] hover:bg-[#e0e0e0] disabled:opacity-25 disabled:hover:bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-[#0f62fe] text-[#161616]"
                disabled={currentPage === Math.ceil(200/pageSize)}
                onClick={() => setCurrentPage(p => Math.min(Math.ceil(200/pageSize), p + 1))}
              >
                <CaretRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
