import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Filter, CheckmarkFilled } from "@carbon/icons-react";
import { cn } from "./ui/utils";
import { CarbonPaginationFooter } from "./carbon-pagination-footer";
import { useSortableData } from "../hooks/use-sortable-data";
import { SortableHeader } from "./ui/sortable-header";

interface CorrectedItem {
  id: string;
  referenceNumber: string;
  cifId: string;
  createdOn: string;
  projectName: string;
  comments: string;
  approvedBy: string;
}

const MOCK_CORRECTED_DATA: CorrectedItem[] = [
  { id: "1", referenceNumber: "STR-8202410282009", cifId: "C_F_10111", createdOn: "11-03-2025", projectName: "GBOAML", comments: "Transaction Details Reviewed", approvedBy: "Superuser233" },
  { id: "2", referenceNumber: "STR-004782024102801", cifId: "C_F_000000379", createdOn: "08-03-2025", projectName: "TBAML", comments: "Customer Details Updated", approvedBy: "Superuser224" },
  { id: "3", referenceNumber: "STR-004782024102799", cifId: "C_F_0000003831", createdOn: "25-02-2025", projectName: "GBOAML", comments: "Transaction Details Reviewed", approvedBy: "Superuser2" },
  { id: "4", referenceNumber: "STR-004782024102798", cifId: "C_F_10112", createdOn: "26-02-2025", projectName: "TBAML", comments: "Customer Details Updated", approvedBy: "Superuser22" },
  { id: "5", referenceNumber: "STR-004782024102797", cifId: "C_F_000000378", createdOn: "25-02-2025", projectName: "GBOAML", comments: "Transaction Details Reviewed", approvedBy: "Superuser3" },
  { id: "6", referenceNumber: "STR-004782024102796", cifId: "C_F_0000003832", createdOn: "09-03-2025", projectName: "TBAML", comments: "Customer Details Updated", approvedBy: "Superuser33" },
  { id: "7", referenceNumber: "STR-004782024102795", cifId: "C_F_10113", createdOn: "25-02-2025", projectName: "GBOAML", comments: "Transaction Details Reviewed", approvedBy: "Superuser4" },
  { id: "8", referenceNumber: "STR-004782024102794", cifId: "C_F_000000377", createdOn: "25-02-2025", projectName: "CGMOAML", comments: "Customer Details Updated", approvedBy: "Superuser44" },
  { id: "9", referenceNumber: "STR-004782024102793", cifId: "C_F_0000003833", createdOn: "09-03-2025", projectName: "GBOAML", comments: "Transaction Details Reviewed", approvedBy: "Superuser5" },
  { id: "10", referenceNumber: "STR-004782024102792", cifId: "C_F_10114", createdOn: "25-02-2025", projectName: "CGMOAML", comments: "Customer Details Updated", approvedBy: "Superuser55" },
  { id: "11", referenceNumber: "STR-004782024102791", cifId: "C_F_000000376", createdOn: "09-03-2025", projectName: "GBOAML", comments: "Transaction Details Reviewed", approvedBy: "Dev1" },
  { id: "12", referenceNumber: "STR-004782024102790", cifId: "C_F_0000003834", createdOn: "25-02-2025", projectName: "BFILAML", comments: "Customer Details Updated", approvedBy: "Dev2" },
  { id: "13", referenceNumber: "STR-004782024102789", cifId: "C_F_10115", createdOn: "09-03-2025", projectName: "GBOAML", comments: "Transaction Details Reviewed", approvedBy: "Dev3" },
  { id: "14", referenceNumber: "STR-004782024102788", cifId: "C_F_000000375", createdOn: "25-02-2025", projectName: "BFILAML", comments: "Customer Details Updated", approvedBy: "Superuser6" },
  { id: "15", referenceNumber: "STR-004782024102787", cifId: "C_F_0000003835", createdOn: "09-03-2025", projectName: "GBOAML", comments: "Transaction Details Reviewed", approvedBy: "Superuser44" },
  { id: "16", referenceNumber: "STR-004782024102786", cifId: "C_F_10116", createdOn: "25-02-2025", projectName: "BFILAML", comments: "Customer Details Updated", approvedBy: "Superuser5" },
];

export function RegulatoryCorrectedTable({ reportType }: { reportType: string }) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
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

  // Get unique project names for filter
  const projectNames = Array.from(new Set(MOCK_CORRECTED_DATA.map(item => item.projectName)));

  const filteredData = MOCK_CORRECTED_DATA.filter(item => {
    const displayId = item.referenceNumber.replace("STR", reportType);
    const matchesSearch = displayId.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.cifId.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.comments.toLowerCase().includes(searchQuery.toLowerCase());

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

  // Pagination Logic
  const totalItems = sortedData.length;
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const paginatedData = sortedData.slice(startIdx, endIdx);

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

          {/* Consolidate STR Button */}
          <div className="ml-auto flex items-center gap-2 pb-[1px]">
            <button 
              onClick={handleConsolidate}
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
          </div>
          
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 bg-white border border-gray-200 shadow-sm rounded-sm flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto relative [&::-webkit-scrollbar]:w-0 hover:[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#a8a8a8]">
          <table className="w-full text-left border-collapse min-w-[1400px]">
            <thead className="sticky top-0 z-10 shadow-sm">
              <tr className="bg-[#F0F0F0] text-[#2A53A0] h-[48px]">
                <th className="pl-4 pr-2 w-10 align-middle">
                    <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300 text-[#2A53A0] focus:ring-[#2A53A0]"
                        checked={paginatedData.length > 0 && paginatedData.every(d => selectedRows.has(d.id))}
                        onChange={toggleAll}
                    />
                </th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle whitespace-nowrap">
                  <SortableHeader column="referenceNumber" label="Batch Reference Number" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle whitespace-nowrap">
                  <SortableHeader column="cifId" label="CIF ID" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle whitespace-nowrap">
                  <SortableHeader column="createdOn" label="Created On" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle whitespace-nowrap">
                  <SortableHeader column="projectName" label="Project Name" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle whitespace-nowrap">
                  <SortableHeader column="comments" label="Comments" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle whitespace-nowrap">
                  <SortableHeader column="approvedBy" label="Approved By" sortConfig={sortConfig} onSort={requestSort} />
                </th>
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
                            <a href="#" className="text-[#2A53A0] hover:underline hover:text-[#1e3a70] font-medium decoration-1 underline-offset-2">
                                {displayId}
                            </a>
                        </td>
                        <td className="px-4 align-middle text-sm text-gray-700 whitespace-nowrap">
                            {row.cifId}
                        </td>
                        <td className="px-4 align-middle text-sm text-gray-700 whitespace-nowrap">
                            {row.createdOn}
                        </td>
                        <td className="px-4 align-middle text-sm text-gray-700 whitespace-nowrap">
                            {row.projectName}
                        </td>
                        <td className="px-4 align-middle text-sm text-gray-700 whitespace-nowrap">
                            {row.comments}
                        </td>
                        <td className="px-4 align-middle text-sm text-gray-700 whitespace-nowrap">
                            {row.approvedBy}
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
