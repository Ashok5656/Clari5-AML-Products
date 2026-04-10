import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, Add, Edit, Download, View, Close, DocumentExport,
} from "@carbon/icons-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { CarbonPaginationFooter } from "./carbon-pagination-footer";
import { useSortableData } from "../hooks/use-sortable-data";
import { SortableHeader } from "./ui/sortable-header";
import { cn } from "./ui/utils";

// ── Types ──────────────────────────────────────────────────────────────────

type ListStatus = "Active" | "Disabled" | "Pending";
type ActionOnHit = "Alert & block" | "Generate alert" | "Flag for review";

interface CustomList {
  id: string;
  name: string;
  status: ListStatus;
  records: number;
  active: number;
  actionOnHit: ActionOnHit;
  ttl: string;
  dateCreated: string;
  lastModified: string;
  listExpiry: string | null;
}

// ── Mock Data ──────────────────────────────────────────────────────────────

const MOCK_LISTS: CustomList[] = [
  { id: "CL-001", name: "Internal fraud — flagged",       status: "Active",   records: 3841,  active: 3712,  actionOnHit: "Alert & block",   ttl: "12 months", dateCreated: "12 Jan 2026", lastModified: "06 Apr 2026", listExpiry: "12 Jan 2027" },
  { id: "CL-002", name: "Rejected KYC applicants",        status: "Active",   records: 12204, active: 11890, actionOnHit: "Alert & block",   ttl: "12 months", dateCreated: "15 Jan 2026", lastModified: "05 Apr 2026", listExpiry: "15 Jan 2027" },
  { id: "CL-003", name: "PEP — internal identified",      status: "Active",   records: 892,   active: 871,   actionOnHit: "Generate alert",  ttl: "24 months", dateCreated: "20 Jan 2026", lastModified: "04 Apr 2026", listExpiry: null },
  { id: "CL-004", name: "Device blocklist",               status: "Active",   records: 2341,  active: 2299,  actionOnHit: "Alert & block",   ttl: "6 months",  dateCreated: "22 Jan 2026", lastModified: "03 Apr 2026", listExpiry: "22 Jul 2026" },
  { id: "CL-005", name: "IP — TOR / VPN exit nodes",      status: "Active",   records: 18420, active: 18420, actionOnHit: "Alert & block",   ttl: "3 months",  dateCreated: "25 Jan 2026", lastModified: "02 Apr 2026", listExpiry: "25 Apr 2026" },
  { id: "CL-006", name: "Adverse media flagged",          status: "Active",   records: 504,   active: 481,   actionOnHit: "Generate alert",  ttl: "12 months", dateCreated: "01 Feb 2026", lastModified: "01 Apr 2026", listExpiry: "01 Feb 2027" },
  { id: "CL-007", name: "SIM-farm mobile numbers",        status: "Active",   records: 7812,  active: 7799,  actionOnHit: "Alert & block",   ttl: "6 months",  dateCreated: "05 Feb 2026", lastModified: "31 Mar 2026", listExpiry: "05 Aug 2026" },
  { id: "CL-008", name: "Investigations — under review",  status: "Active",   records: 239,   active: 205,   actionOnHit: "Generate alert",  ttl: "No expiry", dateCreated: "10 Feb 2026", lastModified: "29 Mar 2026", listExpiry: null },
  { id: "CL-009", name: "Temp sanctions override",        status: "Disabled", records: 12,    active: 0,     actionOnHit: "Alert & block",   ttl: "12 months", dateCreated: "01 Mar 2026", lastModified: "29 Mar 2026", listExpiry: "01 Mar 2027" },
  { id: "CL-010", name: "High-value customer watchlist",  status: "Active",   records: 318,   active: 302,   actionOnHit: "Flag for review", ttl: "24 months", dateCreated: "05 Mar 2026", lastModified: "25 Mar 2026", listExpiry: null },
  { id: "CL-011", name: "Shell company registry",         status: "Active",   records: 1450,  active: 1387,  actionOnHit: "Alert & block",   ttl: "12 months", dateCreated: "10 Mar 2026", lastModified: "20 Mar 2026", listExpiry: "10 Mar 2027" },
  { id: "CL-012", name: "Crypto mixer addresses",         status: "Pending",  records: 9870,  active: 0,     actionOnHit: "Alert & block",   ttl: "6 months",  dateCreated: "15 Mar 2026", lastModified: "15 Mar 2026", listExpiry: "15 Sep 2026" },
];

// ── Badge helpers ──────────────────────────────────────────────────────────

const ACTION_BADGE: Record<ActionOnHit, string> = {
  "Alert & block":   "bg-red-50 text-red-600 border border-red-200",
  "Generate alert":  "bg-amber-50 text-amber-600 border border-amber-200",
  "Flag for review": "bg-blue-50 text-blue-600 border border-blue-200",
};

// ── Component ──────────────────────────────────────────────────────────────

export function SanctionListManagement() {
  const [lists, setLists] = useState<CustomList[]>(MOCK_LISTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [activeTab, setActiveTab] = useState<"Active" | "Inactive" | "All Lists" | "Pending for Approval">("Active");

  // Enable/Disable dialog state
  const [toggleDialogList, setToggleDialogList] = useState<CustomList | null>(null);
  const [toggleAction, setToggleAction] = useState<"DISABLE" | "ENABLE">("DISABLE");
  const [toggleDate, setToggleDate] = useState("");
  const [toggleReason, setToggleReason] = useState("");

  const handleOpenToggleDialog = (list: CustomList) => {
    setToggleDialogList(list);
    setToggleAction(list.status === "Active" ? "DISABLE" : "ENABLE");
    setToggleDate("");
    setToggleReason("");
  };

  const handleSubmitToggle = () => {
    if (!toggleDialogList) return;
    setLists(prev => prev.map(l =>
      l.id === toggleDialogList.id
        ? { ...l, status: toggleAction === "ENABLE" ? "Active" : "Disabled" }
        : l
    ));
    setToggleDialogList(null);
  };

  // Derived counts
  const activeCount   = lists.filter(l => l.status === "Active").length;
  const disabledCount = lists.filter(l => l.status === "Disabled").length;
  const totalEntities = lists.reduce((s, l) => s + l.records, 0);
  const pendingCount  = lists.filter(l => l.status === "Pending").length;

  // Tab filter
  const tabFiltered = lists.filter(l =>
    activeTab === "All Lists"            ? true :
    activeTab === "Active"               ? l.status === "Active" :
    activeTab === "Pending for Approval" ? l.status === "Pending" :
    l.status === "Disabled"
  );

  // Search filter
  const tabSearchFiltered = tabFiltered.filter(l =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.actionOnHit.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sortable
  const { items: sortedLists, requestSort, sortConfig } = useSortableData(tabSearchFiltered);
  const totalItems = sortedLists.length;
  const currentItems = sortedLists.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="flex flex-col flex-1 overflow-hidden p-4 gap-4">

      {/* ── Stat Cards ────────────────────────────────────────────────────── */}
      <div className="flex-none grid grid-cols-4 gap-4">

        {/* Total Lists */}
        <div className="flex items-center justify-between px-6 py-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-[8px]">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
              Total Lists
              <span className="text-gray-400 cursor-help" title="Total number of custom/sanction lists">ⓘ</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{lists.length}</p>
          </div>
          <div className="w-10 h-10 rounded-full border border-[#2A53A0]/30 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#2A53A0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
              <line x1="3" y1="6" x2="3.01" y2="6" strokeWidth="2.5"/><line x1="3" y1="12" x2="3.01" y2="12" strokeWidth="2.5"/><line x1="3" y1="18" x2="3.01" y2="18" strokeWidth="2.5"/>
            </svg>
          </div>
        </div>

        {/* Active Lists */}
        <div className="flex items-center justify-between px-6 py-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-[8px]">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
              Active Lists
              <span className="text-gray-400 cursor-help" title="Currently active custom lists">ⓘ</span>
            </div>
            <p className="text-2xl font-bold text-[#2A53A0]">{activeCount}</p>
          </div>
          <div className="w-10 h-10 rounded-full border border-green-400/40 bg-green-50/60 flex items-center justify-center">
            <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="currentColor" opacity="0.15"/>
              <path d="M8 12l3 3 5-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Total Entities */}
        <div className="flex items-center justify-between px-6 py-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-[8px]">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
              Total Entities
              <span className="text-gray-400 cursor-help" title="Total records across all lists">ⓘ</span>
            </div>
            <p className="text-2xl font-bold text-[#2A53A0]">{totalEntities.toLocaleString()}</p>
          </div>
          <div className="w-10 h-10 rounded-full border border-[#2A53A0]/30 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#2A53A0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round"/>
              <path d="M21 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Pending Approval */}
        <div className="flex items-center justify-between px-6 py-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-[8px]">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
              Pending Approval
              <span className="text-gray-400 cursor-help" title="Lists awaiting approval">ⓘ</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{pendingCount}</p>
          </div>
          <div className="w-10 h-10 rounded-full border border-amber-400/40 bg-amber-50/60 flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round"/>
              <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── Tabs ──────────────────────────────────────────────────────────── */}
      <div className="flex-none border-b border-gray-200 dark:border-gray-800">
        <div className="flex h-[48px] w-full">
          {(["Active", "Inactive", "All Lists", "Pending for Approval"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
              className={cn(
                "flex-1 h-full text-sm font-medium border-b-2 transition-colors text-center",
                activeTab === tab
                  ? "border-[#2A53A0] text-[#2A53A0]"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              )}
            >
              {tab === "Active"               ? `Active (${activeCount})` :
               tab === "Inactive"             ? `Inactive (${disabledCount})` :
               tab === "Pending for Approval" ? `Pending for Approval (${pendingCount})` :
               `All Lists (${lists.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* ── Search + Action Buttons ────────────────────────────────────────── */}
      <div className="flex-none bg-white dark:bg-gray-900 flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search lists by name, status..."
            className="pl-9 w-64 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus-visible:ring-[#2A53A0] h-[46px]"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-1.5 bg-white dark:bg-gray-900 h-[46px] text-sm">
            <DocumentExport className="w-4 h-4" /> Export CSV
          </Button>
          <Button variant="outline" className="gap-1.5 bg-white dark:bg-gray-900 h-[46px] text-sm">
            <DocumentExport className="w-4 h-4" /> Export PDF
          </Button>
          <Button className="gap-1.5 bg-[#2A53A0] hover:bg-[#2A53A0]/90 text-white h-[46px] text-sm">
            <Add className="w-4 h-4" /> Create List
          </Button>
        </div>
      </div>

      {/* ── Table ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden flex flex-col bg-white dark:bg-gray-900 border-0 shadow-sm">
        <div className="flex-1 overflow-auto min-h-0">
          <Table>
            <thead className="sticky top-0 z-10 shadow-sm">
              <tr className="bg-[#F0F0F0] text-[#161616] h-[48px]">
                <th className="pl-4 px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[240px]">
                  <SortableHeader column="name" label="List Name" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[100px]">
                  <SortableHeader column="status" label="Status" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-right w-[110px]">
                  <SortableHeader column="records" label="Records" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-right w-[100px]">
                  <SortableHeader column="active" label="Active" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[150px]">Action on Hit</th>
                <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[110px]">
                  <SortableHeader column="ttl" label="TTL" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[130px]">
                  <SortableHeader column="dateCreated" label="Date Created" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[130px]">
                  <SortableHeader column="lastModified" label="Last Modified" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[130px]">
                  <SortableHeader column="listExpiry" label="List Expiry" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[100px]">Actions</th>
              </tr>
            </thead>
            <TableBody>
              {currentItems.length > 0 ? currentItems.map(list => {
                const expiryDate = list.listExpiry
                  ? new Date(list.listExpiry.replace(/(\d+) (\w+) (\d+)/, "$2 $1, $3"))
                  : null;
                const isExpiringSoon = expiryDate
                  ? (expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24) <= 60
                  : false;

                return (
                  <TableRow key={list.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800 h-[46px]">
                    {/* List Name */}
                    <TableCell className="pl-4 px-4 align-middle">
                      <span className="text-sm font-semibold text-[#2A53A0] dark:text-[#6b93e6] cursor-pointer hover:underline">
                        {list.name}
                      </span>
                    </TableCell>

                    {/* Status */}
                    <TableCell className="px-4 align-middle">
                      <span className={cn(
                        "text-xs font-semibold px-2.5 py-1 rounded-full",
                        list.status === "Active"   ? "bg-green-100 text-green-700" :
                        list.status === "Pending"  ? "bg-yellow-100 text-yellow-700" :
                        "bg-gray-100 text-gray-500"
                      )}>
                        {list.status}
                      </span>
                    </TableCell>

                    {/* Records */}
                    <TableCell className="px-4 align-middle text-right">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 tabular-nums">
                        {list.records.toLocaleString()}
                      </span>
                    </TableCell>

                    {/* Active */}
                    <TableCell className="px-4 align-middle text-right">
                      <span className={cn(
                        "text-sm font-semibold tabular-nums",
                        list.active > 0 ? "text-[#2A53A0]" : "text-gray-400"
                      )}>
                        {list.active.toLocaleString()}
                      </span>
                    </TableCell>

                    {/* Action on Hit */}
                    <TableCell className="px-4 align-middle">
                      <span className={cn(
                        "text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap",
                        ACTION_BADGE[list.actionOnHit]
                      )}>
                        {list.actionOnHit}
                      </span>
                    </TableCell>

                    {/* TTL */}
                    <TableCell className="px-4 align-middle">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{list.ttl}</span>
                    </TableCell>

                    {/* Date Created */}
                    <TableCell className="px-4 align-middle">
                      <span className="text-sm text-gray-700 dark:text-gray-300 tabular-nums">{list.dateCreated}</span>
                    </TableCell>

                    {/* Last Modified */}
                    <TableCell className="px-4 align-middle">
                      <span className="text-sm text-gray-700 dark:text-gray-300 tabular-nums">{list.lastModified}</span>
                    </TableCell>

                    {/* List Expiry */}
                    <TableCell className="px-4 align-middle">
                      {list.listExpiry ? (
                        <span className={cn(
                          "text-sm tabular-nums font-medium",
                          isExpiringSoon ? "text-red-500 font-semibold" : "text-gray-700 dark:text-gray-300"
                        )}>
                          {list.listExpiry}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="px-4 align-middle">
                      <div className="flex items-center justify-start gap-2">
                        <button
                          className="flex items-center justify-center w-8 h-8 rounded-sm bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 transition-colors"
                          title="View Details"
                        >
                          <View className="w-4 h-4" />
                        </button>
                        <button
                          className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#2A53A0]/10 hover:bg-[#2A53A0]/20 text-[#2A53A0] transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenToggleDialog(list)}
                          className={cn(
                            "flex items-center justify-center w-8 h-8 rounded-sm text-xs font-medium transition-colors",
                            list.status === "Active"
                              ? "bg-red-500/10 hover:bg-red-500/20 text-red-600"
                              : "bg-green-500/10 hover:bg-green-500/20 text-green-700"
                          )}
                          title={list.status === "Active" ? "Disable" : "Enable"}
                        >
                          {list.status === "Active" ? "Off" : "On"}
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              }) : (
                <TableRow>
                  <TableCell colSpan={10} className="h-24 text-center text-gray-500">
                    No lists found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
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

      {/* ── Enable/Disable Dialog ──────────────────────────────────────────── */}
      <AnimatePresence>
        {toggleDialogList && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setToggleDialogList(null)}
              className="fixed inset-0 bg-black/50 z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[512px] bg-white rounded-[8px] overflow-hidden z-[101] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] border border-black/10"
            >
              {/* Dialog Header */}
              <div className="bg-[#2a53a0] h-[64px] flex items-center justify-between px-[30px] shrink-0">
                <h2 className="text-white text-[20px] font-normal">
                  {toggleAction === "DISABLE" ? "Disable" : "Enable"} custom list
                </h2>
                <button
                  onClick={() => setToggleDialogList(null)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <Close className="w-5 h-5" />
                </button>
              </div>

              {/* Dialog Body */}
              <div className="p-[24px] space-y-[16px]">
                <p className="text-[14px] text-[#525252]">
                  You are about to <strong>{toggleAction === "DISABLE" ? "disable" : "enable"}</strong> the list{" "}
                  <span className="font-semibold text-[#161616]">"{toggleDialogList.name}"</span>.
                  {toggleAction === "DISABLE" && " This will stop it from being used in screenings."}
                </p>

                <div className="space-y-[6px]">
                  <label className="text-[13px] font-semibold text-[#161616]">
                    Effective Date <span className="text-[#fb2c36]">*</span>
                  </label>
                  <input
                    type="date"
                    value={toggleDate}
                    onChange={e => setToggleDate(e.target.value)}
                    className="w-full h-[46px] px-[12px] bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]"
                  />
                </div>

                <div className="space-y-[6px]">
                  <label className="text-[13px] font-semibold text-[#161616]">Reason / Notes</label>
                  <textarea
                    rows={3}
                    value={toggleReason}
                    onChange={e => setToggleReason(e.target.value)}
                    placeholder="Enter reason for this change..."
                    className="w-full p-[12px] bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] placeholder:text-[#717182] focus:outline-none focus:ring-1 focus:ring-[#2a53a0] resize-none"
                  />
                </div>
              </div>

              {/* Dialog Footer */}
              <div className="h-[64px] border-t border-[#e5e7eb] flex items-center justify-end gap-3 px-[24px] bg-[#f4f4f4]">
                <Button
                  variant="outline"
                  onClick={() => setToggleDialogList(null)}
                  className="h-[40px] px-6 rounded-[8px] border-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitToggle}
                  disabled={!toggleDate}
                  className={cn(
                    "h-[40px] px-6 rounded-[8px] text-white",
                    toggleAction === "DISABLE"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-[#2A53A0] hover:bg-[#1e3a70]"
                  )}
                >
                  {toggleAction === "DISABLE" ? "Disable List" : "Enable List"}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
