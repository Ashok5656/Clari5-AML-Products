import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, CaretLeft, CaretRight, Search, Edit, Download, Filter, Save, Close } from "@carbon/icons-react";
import { cn } from "./ui/utils";
import { useSortableData } from "../hooks/use-sortable-data";
import { SortableHeader } from "./ui/sortable-header";

interface ConsolidatedItem {
  id: string;
  reportReferenceNumber: string;
  batchFilesCount: number;
  createdOn: string;
  createdBy: string;
  acknowledgementNumber: string;
}

const MOCK_CONSOLIDATED_DATA: ConsolidatedItem[] = [
  { id: "1", reportReferenceNumber: "STR-8202410282009.ZIP", batchFilesCount: 6, createdOn: "19-09-2025", createdBy: "Superuser233", acknowledgementNumber: "-" },
  { id: "2", reportReferenceNumber: "STR-8202410282008.ZIP", batchFilesCount: 5, createdOn: "09-03-2025", createdBy: "Superuser224", acknowledgementNumber: "-" },
  { id: "3", reportReferenceNumber: "STR-8202410282007.ZIP", batchFilesCount: 4, createdOn: "25-02-2025", createdBy: "Superuser2", acknowledgementNumber: "-" },
  { id: "4", reportReferenceNumber: "STR-8202410282006.ZIP", batchFilesCount: 3, createdOn: "09-03-2025", createdBy: "Superuser22", acknowledgementNumber: "-" },
  { id: "5", reportReferenceNumber: "STR-8202410282005.ZIP", batchFilesCount: 2, createdOn: "25-02-2025", createdBy: "Superuser3", acknowledgementNumber: "-" },
  { id: "6", reportReferenceNumber: "STR-8202410282004.ZIP", batchFilesCount: 1, createdOn: "09-03-2025", createdBy: "Superuser33", acknowledgementNumber: "-" },
  { id: "7", reportReferenceNumber: "STR-8202410282003.ZIP", batchFilesCount: 7, createdOn: "25-02-2025", createdBy: "Superuser4", acknowledgementNumber: "-" },
  { id: "8", reportReferenceNumber: "STR-8202410282002.ZIP", batchFilesCount: 8, createdOn: "25-02-2025", createdBy: "Superuser44", acknowledgementNumber: "-" },
  { id: "9", reportReferenceNumber: "STR-8202410282001.ZIP", batchFilesCount: 5, createdOn: "09-03-2025", createdBy: "Superuser5", acknowledgementNumber: "-" },
  { id: "10", reportReferenceNumber: "STR-8202410282009.ZIP", batchFilesCount: 4, createdOn: "25-02-2025", createdBy: "Superuser55", acknowledgementNumber: "-" },
  { id: "11", reportReferenceNumber: "STR-8202410282008.ZIP", batchFilesCount: 3, createdOn: "09-03-2025", createdBy: "Dev1", acknowledgementNumber: "-" },
  { id: "12", reportReferenceNumber: "STR-8202410282007.ZIP", batchFilesCount: 2, createdOn: "25-02-2025", createdBy: "Dev2", acknowledgementNumber: "-" },
  { id: "13", reportReferenceNumber: "STR-8202410282006.ZIP", batchFilesCount: 1, createdOn: "09-03-2025", createdBy: "Dev3", acknowledgementNumber: "-" },
  { id: "14", reportReferenceNumber: "STR-8202410282005.ZIP", batchFilesCount: 6, createdOn: "25-02-2025", createdBy: "Superuser6", acknowledgementNumber: "-" },
  { id: "15", reportReferenceNumber: "STR-8202410282009.ZIP", batchFilesCount: 2, createdOn: "09-03-2025", createdBy: "Superuser44", acknowledgementNumber: "-" },
  { id: "16", reportReferenceNumber: "STR-8202410282009.ZIP", batchFilesCount: 4, createdOn: "25-02-2025", createdBy: "Superuser5", acknowledgementNumber: "-" },
];

export function RegulatoryConsolidatedTable({ reportType }: { reportType: string }) {
  const [data, setData] = useState<ConsolidatedItem[]>(MOCK_CONSOLIDATED_DATA);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

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

  const handleEditClick = (id: string, currentValue: string) => {
    setEditingId(id);
    setEditValue(currentValue === "-" ? "" : currentValue);
  };

  const handleSaveClick = (id: string) => {
    setData(data.map(item => 
      item.id === id ? { ...item, acknowledgementNumber: editValue || "-" } : item
    ));
    setEditingId(null);
    setEditValue("");
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditValue("");
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
  
  const filteredData = data.filter(item => {
    const matchesSearch = item.reportReferenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.createdBy.toLowerCase().includes(searchQuery.toLowerCase());

    // Date Filtering
    let matchesDate = true;
    if (activeDateFilters) {
        if (activeDateFilters.type === "Year" && activeDateFilters.value) {
            matchesDate = item.createdOn.includes(activeDateFilters.value);
        }
    }

    return matchesSearch && matchesDate;
  });

  const { items: sortedData, requestSort, sortConfig } = useSortableData(filteredData);

  return (
    <div className="flex flex-col h-full gap-3">
      {/* Search & Filter Section */}
      <div>
        <div className="flex flex-wrap items-center gap-4">
          
          {/* Search Input */}
          <div className="w-[280px]">
            <div className="relative h-[46px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text"
                placeholder="Search Report Reference..."
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

      {/* Table Container */}
      <div className="flex-1 bg-white border border-gray-200 shadow-sm rounded-sm flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto relative [&::-webkit-scrollbar]:w-0 hover:[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#a8a8a8]">
          <table className="w-full text-left border-collapse min-w-[1400px]">
            <thead className="sticky top-0 z-10 shadow-sm">
              <tr className="bg-[#F0F0F0] text-[#2A53A0] h-[48px]">
                <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle whitespace-nowrap">
                  <SortableHeader column="reportReferenceNumber" label="Report Reference Number" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle whitespace-nowrap text-right">
                  <SortableHeader column="batchFilesCount" label="No. of Batch Files Included" sortConfig={sortConfig} onSort={requestSort} className="justify-end" />
                </th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle whitespace-nowrap">
                  <SortableHeader column="createdOn" label="Created On" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle whitespace-nowrap">
                  <SortableHeader column="createdBy" label="Created By" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle whitespace-nowrap">
                  <SortableHeader column="acknowledgementNumber" label="Acknowledgement Number" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] align-middle text-left whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((row, index) => {
                  const displayId = row.reportReferenceNumber.replace("STR", reportType);

                  return (
                    <tr key={row.id + index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors h-[46px]">
                        <td className="px-4 align-middle text-sm text-gray-700 whitespace-nowrap">
                            {displayId}
                        </td>
                        <td className="px-4 align-middle text-sm text-gray-700 whitespace-nowrap text-right pr-12">
                            {row.batchFilesCount}
                        </td>
                        <td className="px-4 align-middle text-sm text-gray-700 whitespace-nowrap">
                            {row.createdOn}
                        </td>
                        <td className="px-4 align-middle text-sm text-gray-700 whitespace-nowrap">
                            {row.createdBy}
                        </td>
                        <td className="px-4 align-middle text-sm text-gray-700 whitespace-nowrap">
                            {editingId === row.id ? (
                                <input 
                                    type="text" 
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="w-full px-2 py-1 text-sm border border-[#2A53A0] rounded focus:outline-none focus:ring-1 focus:ring-[#2A53A0]"
                                    autoFocus
                                    placeholder="Enter Ack No."
                                />
                            ) : (
                                row.acknowledgementNumber
                            )}
                        </td>
                        <td className="px-4 align-middle text-sm text-gray-700 text-left whitespace-nowrap">
                            <div className="flex items-center justify-start gap-2">
                                {editingId === row.id ? (
                                    <>
                                        <button 
                                            onClick={() => handleSaveClick(row.id)}
                                            className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#198038]/10 hover:bg-[#198038]/20 text-[#198038] transition-colors"
                                            title="Save"
                                        >
                                            <Save size={16} />
                                        </button>
                                        <button 
                                            onClick={handleCancelClick}
                                            className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#da1e28]/10 hover:bg-[#da1e28]/20 text-[#da1e28] transition-colors"
                                            title="Cancel"
                                        >
                                            <Close size={16} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button 
                                            onClick={() => handleEditClick(row.id, row.acknowledgementNumber)}
                                            className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#3b82f6]/10 hover:bg-[#3b82f6]/20 text-[#3b82f6] transition-colors"
                                            title="Edit"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button 
                                            className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#06b6d4]/10 hover:bg-[#06b6d4]/20 text-[#06b6d4] transition-colors"
                                            title="Download"
                                        >
                                            <Download size={16} />
                                        </button>
                                    </>
                                )}
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
