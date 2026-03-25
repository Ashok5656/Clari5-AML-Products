import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  Add, 
  View, 
  ArrowsVertical,
} from "@carbon/icons-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableRow 
} from "./ui/table";
import { cn } from "./ui/utils";
import { LinkedSecDialog } from "./linked-sec-dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { CarbonPaginationFooter } from "./carbon-pagination-footer";
import { useSortableData } from "../hooks/use-sortable-data";
import { SortableHeader } from "./ui/sortable-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface EventData {
  name: string;
  description: string;
  type: string;
  linkedSec: number;
}

const ootbEvents: EventData[] = [
  { name: "Account Opening", description: "New account creation events with customer onboarding data", type: "Financial", linkedSec: 4 },
  { name: "ACH Payment", description: "Automated Clearing House payment processing events", type: "Financial", linkedSec: 3 },
  { name: "ATM Withdrawal", description: "ATM cash withdrawal events with location information", type: "Financial", linkedSec: 4 },
  { name: "Beneficiary Addition", description: "New beneficiary registration events for fund transfers", type: "Financial", linkedSec: 3 },
  { name: "Card Activation", description: "Card activation and issuance events", type: "Financial", linkedSec: 4 },
  { name: "Card Transaction", description: "Captures all card-based transaction events", type: "Financial", linkedSec: 2 },
  { name: "Check Deposit", description: "Check deposit events including remote capture", type: "Financial", linkedSec: 4 },
  { name: "Limit Modification", description: "Transaction and daily limit modification events", type: "Financial", linkedSec: 3 },
  { name: "Address Change", description: "Customer permanent or mailing address update events", type: "Non-Financial", linkedSec: 2 },
  { name: "Password Reset", description: "User account password reset or recovery attempts", type: "Non-Financial", linkedSec: 1 },
  { name: "Contact Info Update", description: "Updates to phone numbers or email addresses in profile", type: "Non-Financial", linkedSec: 2 },
  { name: "Login Anomaly", description: "Unusual login patterns or failed authentication attempts", type: "Non-Financial", linkedSec: 3 },
];

const customEvents: EventData[] = [
  { name: "High Value Crypto", description: "Large volume cryptocurrency purchase or transfer events", type: "Financial", linkedSec: 2 },
  { name: "Peer-to-Peer Transfer", description: "P2P mobile payment app transaction events", type: "Financial", linkedSec: 1 },
  { name: "Bulk Salary Disbursement", description: "Employer batch salary payment events", type: "Financial", linkedSec: 3 },
  { name: "Suspicious API Access", description: "Multiple failed API authentication attempts from unknown IPs", type: "Non-Financial", linkedSec: 5 },
  { name: "Merchant Category Change", description: "Sudden changes in merchant category code (MCC) usage", type: "Financial", linkedSec: 2 },
  { name: "Swift Message Anomaly", description: "Malformed or unusual Swift message header detection", type: "Financial", linkedSec: 4 },
  { name: "Corporate Card Limit", description: "Adjustments to high-limit corporate credit facilities", type: "Financial", linkedSec: 2 },
  { name: "Biometric Auth Failure", description: "Repeated biometric authentication failures on mobile devices", type: "Non-Financial", linkedSec: 1 },
];

interface EventsManagementProps {
  activeTab: 'ootb' | 'custom';
  onViewEvent?: (event: EventData) => void;
  onAddCustomEvent?: () => void;
}

export const EventsManagement: React.FC<EventsManagementProps> = ({ activeTab, onViewEvent, onAddCustomEvent }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [isLinkedSecDialogOpen, setIsLinkedSecDialogOpen] = useState(false);
  const [selectedEventForSec, setSelectedEventForSec] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const events = activeTab === 'ootb' ? ootbEvents : customEvents;

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || event.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const { items: sortedEvents, requestSort, sortConfig } = useSortableData(filteredEvents);

  const totalItems = sortedEvents.length;
  const startItem = (currentPage - 1) * pageSize;
  const currentEvents = sortedEvents.slice(startItem, startItem + pageSize);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900/50 gap-4 overflow-hidden font-['Inter',sans-serif]">
      
      {/* 1. Search & Controls (Toolbar) */}
      <div className="shrink-0 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative group max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input 
              placeholder="Search events..." 
              className="h-[46px] w-[300px] pl-9 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus-visible:ring-[#2A53A0] rounded-[8px] transition-colors shadow-sm"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-[46px] w-[200px] flex items-center justify-between px-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[8px] hover:border-[#2A53A0] dark:hover:border-[#2A53A0] transition-all text-[14px] text-[#161616] dark:text-gray-200 font-medium group shadow-sm outline-none">
                  <span className="truncate">{typeFilter === 'All' ? 'All Types' : typeFilter === 'Financial' ? 'Financial' : 'Non-Financial'}</span>
                  <ChevronDown className="size-4 text-gray-500 group-data-[state=open]:rotate-180 transition-transform" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg rounded-[8px] p-1 mt-1">
                <DropdownMenuItem 
                  onClick={() => setTypeFilter('All')}
                  className={cn("px-4 py-2 text-[14px] cursor-pointer rounded-[6px]", typeFilter === 'All' && "bg-gray-100 dark:bg-gray-800 text-[#2A53A0] font-semibold")}
                >
                  All Types
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setTypeFilter('Financial')}
                  className={cn("px-4 py-2 text-[14px] cursor-pointer rounded-[6px]", typeFilter === 'Financial' && "bg-gray-100 dark:bg-gray-800 text-[#2A53A0] font-semibold")}
                >
                  Financial
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setTypeFilter('Non-Financial')}
                  className={cn("px-4 py-2 text-[14px] cursor-pointer rounded-[6px]", typeFilter === 'Non-Financial' && "bg-gray-100 dark:bg-gray-800 text-[#2A53A0] font-semibold")}
                >
                  Non-Financial
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Button 
          onClick={onAddCustomEvent}
          className="h-[46px] px-6 bg-[#2A53A0] hover:bg-[#2A53A0]/90 text-white rounded-[8px] flex items-center gap-2 text-[14px] font-medium transition-all shadow-md"
        >
          <Add className="size-4" />
          Add Custom Event
        </Button>
      </div>

      {/* 2. Unified Data Table Panel (Bordered Container) */}
      <div className="flex-1 overflow-hidden flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[8px] shadow-sm">
          
          {/* Table Content (Scrollable) */}
          <div className="flex-1 overflow-auto no-scrollbar">
            <Table>
              <thead className="sticky top-0 z-10 shadow-sm">
                <tr className="bg-[#F0F0F0] text-[#161616] h-[48px]">
                  <th className="pl-4 px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left">
                    <SortableHeader column="name" label="Event Name" sortConfig={sortConfig} onSort={requestSort} />
                  </th>
                  <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left">
                    Description
                  </th>
                  <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[140px]">
                    <SortableHeader column="type" label="Type" sortConfig={sortConfig} onSort={requestSort} />
                  </th>
                  <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-center w-[120px]">
                    <SortableHeader column="linkedSec" label="Linked Sec" sortConfig={sortConfig} onSort={requestSort} />
                  </th>
                  <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[140px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <TableBody>
                {currentEvents.length > 0 ? (
                  currentEvents.map((event, idx) => (
                    <TableRow 
                      key={idx} 
                      className="h-[46px] border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <TableCell className="px-4 align-middle text-[15px] text-gray-900 dark:text-white font-medium">
                        {event.name}
                      </TableCell>
                      <TableCell className="px-4 align-middle text-[15px] text-gray-600 dark:text-gray-400 max-w-[500px] truncate">
                        {event.description}
                      </TableCell>
                      <TableCell className="px-4 align-middle">
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "px-3 py-0.5 text-xs font-medium",
                            event.type === 'Financial' 
                              ? "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-400 dark:border-cyan-800"
                              : "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800"
                          )}
                        >
                          {event.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 align-middle text-center">
                        <button 
                          onClick={() => {
                            setSelectedEventForSec(event.name);
                            setIsLinkedSecDialogOpen(true);
                          }}
                          className="text-gray-900 dark:text-white text-[15px] font-mono underline underline-offset-4 decoration-[#2A53A0]/30 hover:decoration-[#2A53A0] hover:text-[#2A53A0] transition-all cursor-pointer"
                        >
                          {event.linkedSec}
                        </button>
                      </TableCell>
                      <TableCell className="px-4 align-middle">
                        <div className="flex items-center justify-start gap-2">
                          <button 
                            className="flex items-center justify-center w-8 h-8 rounded-sm bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 transition-colors"
                            onClick={() => onViewEvent?.(event)}
                            title="View Details"
                          >
                            <View className="w-4 h-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-gray-500 text-[15px]">
                      No events found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Integrated Data Table Footer */}
          <div className="flex-none">
            <CarbonPaginationFooter 
              pageSize={pageSize}
              setPageSize={setPageSize}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalItems={totalItems}
            />
          </div>
      </div>
      
      {/* Linked Sec Dialog */}
      <LinkedSecDialog 
        isOpen={isLinkedSecDialogOpen} 
        onClose={() => setIsLinkedSecDialogOpen(false)} 
        eventName={selectedEventForSec || ""} 
      />
    </div>
  );
};
