import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  CheckmarkFilled
} from "@carbon/icons-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { MultiSelect } from "./ui/multi-select";

interface DedupScreeningProps {
  breadcrumbs?: any[];
  onBreadcrumbNavigate?: (path: string) => void;
}

const mockMatches = [
  {
    ucic: "UC0898746370",
    status: "ACTIVE GROUP",
    matches: [
      { customerId: "8829103", customerName: "Rajesh K", parameter: "Passport", idNumber: "Z1234567" },
      { customerId: "8832890", customerName: "Rajesh Kumar", parameter: "Passport", idNumber: "Z1234567" },
    ]
  },
  {
    ucic: "UC0855123981",
    status: "ACTIVE GROUP",
    matches: [
      { customerId: "1102931", customerName: "Amit Sharma", parameter: "Aadhar Card", idNumber: "9821-2234-1102" },
      { customerId: "1102932", customerName: "Amit S", parameter: "Aadhar Card", idNumber: "9821-2234-1102" },
    ]
  }
];

const PARAMETER_OPTIONS = [
  { label: "Date of Birth", value: "Date of Birth" },
  { label: "PAN Number", value: "PAN Number" },
  { label: "Aadhar Card", value: "Aadhar Card" },
  { label: "Driving License", value: "Driving License" },
  { label: "Passport", value: "Passport" },
  { label: "Voter ID", value: "Voter ID" },
  { label: "Telephone/ Mobile Number", value: "Telephone/ Mobile Number" }
];

export function DedupScreening({ breadcrumbs, onBreadcrumbNavigate }: DedupScreeningProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedParams, setSelectedParams] = useState(["Passport", "Aadhar Card"]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-950 font-sans">
      <div className="p-4 flex flex-col gap-8 overflow-auto no-scrollbar">
        {/* Top Controls Row */}
        <div className="grid grid-cols-12 gap-6 items-end">
          {/* Match Parameter List - Carbon MultiSelect */}
          <div className="col-span-6">
            <MultiSelect 
              label="Match Parameter List"
              placeholder="Select parameters..."
              options={PARAMETER_OPTIONS}
              selected={selectedParams}
              onChange={setSelectedParams}
            />
          </div>

          {/* Search ID/UCIC */}
          <div className="col-span-4 flex flex-col gap-2">
            <label className="text-[11px] font-bold text-[#525252] dark:text-gray-400 uppercase tracking-tight">Search ID/UCIC</label>
            <Input 
              placeholder="Enter value..." 
              className="bg-[#F8F9FB] dark:bg-gray-900 border-[#DDE1E6] !h-[46px] rounded-[4px] text-[14px] focus-visible:ring-[#2A53A0] placeholder:text-[#A8ABB0]" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Fetch Report Button */}
          <div className="col-span-2">
            <Button className="w-full bg-[#2A53A0] hover:bg-[#1e3a70] text-white h-[46px] rounded-[4px] font-bold text-[14px] gap-2 shadow-sm">
              <Search size={16} />
              Fetch Report
            </Button>
          </div>
        </div>

        {/* Report Header */}
        <div className="flex items-center justify-between border-t border-[#F1F2F4] pt-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center border border-[#DDE1E6] rounded-full w-6 h-6">
              <CheckmarkFilled className="text-[#2A53A0]" size={14} />
            </div>
            <h2 className="text-[18px] font-bold text-[#161616] dark:text-white tracking-tight">De-Duplication Match Report</h2>
            <Badge className="bg-[#EBF2FF] text-[#2A53A0] border-none font-bold text-[10px] px-2 py-0.5 rounded-[12px] ml-1">2 Matching Groups</Badge>
          </div>
          <button className="flex items-center gap-1.5 text-[11px] font-bold text-[#2A53A0] hover:underline uppercase tracking-wider">
            <Filter size={14} />
            Advanced Filters
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto border border-[#DDE1E6] dark:border-gray-800 rounded-[4px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F4F7FB] dark:bg-gray-900/50 border-b border-[#DDE1E6] dark:border-gray-800">
                <th className="px-6 py-4 text-[11px] font-bold text-[#525252] dark:text-gray-400 uppercase tracking-wider border-r border-[#DDE1E6] dark:border-gray-800">UCIC</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#525252] dark:text-gray-400 uppercase tracking-wider border-r border-[#DDE1E6] dark:border-gray-800">Customer ID</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#525252] dark:text-gray-400 uppercase tracking-wider border-r border-[#DDE1E6] dark:border-gray-800">Customer Name</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#525252] dark:text-gray-400 uppercase tracking-wider text-center border-r border-[#DDE1E6] dark:border-gray-800">De-duplication Parameter</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#525252] dark:text-gray-400 uppercase tracking-wider">ID Number</th>
              </tr>
            </thead>
            <tbody>
              {mockMatches.flatMap((group) => 
                group.matches.map((match, matchIdx) => (
                  <tr key={match.customerId} className="group hover:bg-gray-50/50 transition-colors border-b border-[#DDE1E6] dark:border-gray-800 last:border-b-0">
                    {matchIdx === 0 ? (
                      <td className="px-6 py-10 align-top border-r border-[#DDE1E6] dark:border-gray-800" rowSpan={group.matches.length}>
                        <div className="flex flex-col gap-2">
                          <span className="text-[10px] font-bold text-[#2A53A0] bg-[#F0F5FF] px-1.5 py-1 rounded-[2px] w-fit border border-[#2A53A0]/10 tracking-tight">{group.ucic}</span>
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C00]"></span>
                            <span className="text-[9px] font-bold text-[#525252] dark:text-gray-400 uppercase tracking-tighter">{group.status}</span>
                          </div>
                        </div>
                      </td>
                    ) : null}
                    <td className="px-6 py-4 text-[14px] font-medium text-[#161616] dark:text-gray-300 border-r border-[#DDE1E6] dark:border-gray-800">
                      {match.customerId}
                    </td>
                    <td className="px-6 py-4 text-[14px] font-medium text-[#161616] dark:text-gray-300 border-r border-[#DDE1E6] dark:border-gray-800">
                      {match.customerName}
                    </td>
                    {matchIdx === 0 ? (
                      <td className="px-6 py-4 text-center align-middle border-r border-[#DDE1E6] dark:border-gray-800" rowSpan={group.matches.length}>
                        <span className="text-[10px] font-medium text-[#525252] dark:text-gray-400 bg-[#F1F2F4] dark:bg-gray-800 px-3 py-1 rounded-[4px] inline-block whitespace-nowrap">
                          {match.parameter}
                        </span>
                      </td>
                    ) : null}
                    <td className="px-6 py-4 text-[14px] font-medium text-[#161616] dark:text-gray-300">
                      {match.idNumber}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
