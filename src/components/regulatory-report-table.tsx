import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronRight, ChevronLeft, Search, Filter, Download, Calendar, Reset, Close, CaretLeft, CaretRight } from "@carbon/icons-react";
import { Button } from "./ui/button";
import { cn } from "./ui/utils";
import { useSortableData } from "../hooks/use-sortable-data";
import { SortableHeader } from "./ui/sortable-header";

interface ReportItem {
  id: string;
  referenceNumber: string;
  createdOn: string;
  dueDate: string;
}

interface InnerReportItem {
  reportRef: string;
  ucicId: string;
  cifId: string;
  totalAmount: string;
  strAmount: string;
}

const MOCK_INNER_DATA: InnerReportItem[] = [
  { reportRef: "STR-8202410282010", ucicId: "75989700", cifId: "C_F_10111", totalAmount: "₹1,055,000", strAmount: "₹55,000" },
  { reportRef: "STR-8202410282011", ucicId: "75989699", cifId: "C_F_10111445", totalAmount: "₹1,050,000", strAmount: "₹50,000" },
  { reportRef: "STR-8202410282012", ucicId: "75989698", cifId: "C_F_101117877", totalAmount: "₹1,045,000", strAmount: "₹45,000" },
];

const MOCK_DATA: ReportItem[] = [
  { id: "1", referenceNumber: "STR-8202410282009", createdOn: "18-01-2026", dueDate: "20-01-2026" },
  { id: "2", referenceNumber: "STR-8202410282008", createdOn: "18-01-2026", dueDate: "20-01-2026" },
  { id: "3", referenceNumber: "STR-8202410282007", createdOn: "17-01-2026", dueDate: "19-01-2026" },
  { id: "4", referenceNumber: "STR-8202410282006", createdOn: "16-01-2026", dueDate: "18-01-2026" },
  { id: "5", referenceNumber: "STR-8202410282005", createdOn: "16-01-2026", dueDate: "18-01-2026" },
  { id: "6", referenceNumber: "STR-8202410282004", createdOn: "15-01-2026", dueDate: "17-01-2026" },
  { id: "7", referenceNumber: "STR-8202410282003", createdOn: "15-01-2026", dueDate: "17-01-2026" },
  { id: "8", referenceNumber: "STR-8202410282002", createdOn: "14-01-2026", dueDate: "16-01-2026" },
  { id: "9", referenceNumber: "STR-8202410282001", createdOn: "14-01-2026", dueDate: "16-01-2026" },
  { id: "10", referenceNumber: "STR-8202410282009", createdOn: "13-01-2026", dueDate: "15-01-2026" },
  { id: "11", referenceNumber: "STR-8202410282008", createdOn: "13-01-2026", dueDate: "15-01-2026" },
  { id: "12", referenceNumber: "STR-8202410282007", createdOn: "12-01-2026", dueDate: "14-01-2026" },
  { id: "13", referenceNumber: "STR-8202410282006", createdOn: "12-01-2026", dueDate: "14-01-2026" },
  { id: "14", referenceNumber: "STR-8202410282005", createdOn: "11-01-2026", dueDate: "13-01-2026" },
  { id: "15", referenceNumber: "STR-8202410282009", createdOn: "11-01-2026", dueDate: "13-01-2026" },
];

export function RegulatoryReportTable({ reportType }: { reportType: string }) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
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

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const getReportId = (baseRef: string) => {
      return baseRef.replace("STR", reportType);
  };

  const filteredData = MOCK_DATA.filter(item => {
    const displayId = item.referenceNumber.replace("STR", reportType);
    const matchesSearch = displayId.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Simple mock implementation of date filtering
    // In a real app, this would parse dates and compare
    let matchesDate = true;
    if (activeDateFilters) {
        // Just a placeholder logic to show it "works" conceptually
        if (activeDateFilters.type === "Year" && activeDateFilters.value) {
            matchesDate = item.createdOn.includes(activeDateFilters.value);
        }
    }
    
    return matchesSearch && matchesDate;
  });

  const { items: sortedData, requestSort, sortConfig } = useSortableData(filteredData);

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

          {/* Export Button */}
          <div className="ml-auto flex items-center gap-2 pb-[1px]">
            <button 
              className="px-4 py-2 text-sm text-[#2A53A0] border border-[#2A53A0] bg-white rounded-lg hover:bg-[#2A53A0]/5 transition-colors font-medium flex items-center gap-2 h-[46px]"
            >
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 bg-white border border-gray-200 shadow-sm rounded-sm flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto relative [&::-webkit-scrollbar]:w-0 hover:[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#a8a8a8]">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 shadow-sm">
              <tr className="bg-[#F0F0F0] text-[#161616] h-[48px]">
                <th className="pl-4 pr-2 w-10 bg-[#F0F0F0] align-middle"></th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] bg-[#F0F0F0] align-middle">
                  <SortableHeader column="referenceNumber" label="Batch Reference Number" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] bg-[#F0F0F0] align-middle">
                  <SortableHeader column="createdOn" label="Created On" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-bold text-sm text-[#2A53A0] bg-[#F0F0F0] align-middle">
                  <SortableHeader column="dueDate" label="Due Date" sortConfig={sortConfig} onSort={requestSort} />
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((row, index) => {
                  const isExpanded = expandedRows.has(row.id);
                  const displayId = row.referenceNumber.replace("STR", reportType); // Adapt prefix to current type
                  
                  return (
                    <tbody key={row.id + index} className="border-none">
                      <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors h-[46px]">
                        <td className="pl-4 pr-2 align-middle">
                          <button 
                              onClick={() => toggleRow(row.id)}
                              className="p-1 hover:bg-gray-200 rounded text-gray-500 transition-colors"
                          >
                            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          </button>
                        </td>
                        <td className="px-4 align-middle">
                          <a href="#" className="text-[#2A53A0] hover:underline hover:text-[#1e3a70] text-sm font-medium decoration-1 underline-offset-2">
                            {displayId}
                          </a>
                        </td>
                        <td className="px-4 align-middle text-sm text-gray-700">
                          {row.createdOn}
                        </td>
                        <td className="px-4 align-middle text-sm text-gray-700">
                          {row.dueDate}
                        </td>
                      </tr>
                      {isExpanded && (
                          <tr className="bg-white">
                              <td colSpan={4} className="p-4 pl-4 border-b border-gray-200">
                                  <div className="bg-white border border-gray-200 rounded-sm">
                                      {/* Inner Header */}
                                      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
                                          <h3 className="font-semibold text-gray-800 text-sm">Report List</h3>
                                          <div className="relative w-[200px]">
                                              <input 
                                                type="text" 
                                                placeholder="Search UCIC ID" 
                                                className="w-full pl-3 pr-8 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#2A53A0]"
                                              />
                                              <Search size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                          </div>
                                      </div>
                                      
                                      {/* Inner Table */}
                                      <div className="overflow-x-auto">
                                          <table className="w-full text-sm text-left">
                                              <thead className="bg-[#F2F4F8] text-[#2A53A0]">
                                                  <tr>
                                                      <th className="py-2.5 px-4 font-semibold border-r border-gray-200 last:border-r-0">Report Reference Number</th>
                                                      <th className="py-2.5 px-4 font-semibold border-r border-gray-200 last:border-r-0">UCIC ID</th>
                                                      <th className="py-2.5 px-4 font-semibold border-r border-gray-200 last:border-r-0">CIF ID</th>
                                                      <th className="py-2.5 px-4 font-semibold text-right border-r border-gray-200 last:border-r-0">Total Amount</th>
                                                      <th className="py-2.5 px-4 font-semibold text-right">STR Amount</th>
                                                  </tr>
                                              </thead>
                                              <tbody>
                                                  {MOCK_INNER_DATA.map((item, idx) => {
                                                      const innerDisplayId = item.reportRef.replace("STR", reportType);
                                                      return (
                                                        <tr key={idx} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                                                            <td className="py-2.5 px-4 border-r border-gray-100 last:border-r-0">
                                                                <a href="#" className="text-[#2A53A0] underline underline-offset-2">{innerDisplayId}</a>
                                                            </td>
                                                            <td className="py-2.5 px-4 text-gray-700 border-r border-gray-100 last:border-r-0">{item.ucicId}</td>
                                                            <td className="py-2.5 px-4 text-gray-700 border-r border-gray-100 last:border-r-0">{item.cifId}</td>
                                                            <td className="py-2.5 px-4 text-gray-700 text-right border-r border-gray-100 last:border-r-0 font-medium">{item.totalAmount}</td>
                                                            <td className="py-2.5 px-4 text-gray-700 text-right font-medium">{item.strAmount}</td>
                                                        </tr>
                                                      );
                                                  })}
                                              </tbody>
                                          </table>
                                      </div>

                                      {/* Inner Footer */}
                                      <div className="p-3 bg-white border-t border-gray-200 text-xs text-gray-500 font-medium">
                                          Total UCIC ID's : {MOCK_INNER_DATA.length}
                                      </div>
                                  </div>
                              </td>
                          </tr>
                      )}
                    </tbody>
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
