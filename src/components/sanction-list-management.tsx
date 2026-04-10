import { useState, useMemo } from "react";
import {
  Search, Add, Edit, Download, View, DocumentExport,
  SettingsAdjust, ChevronUp, ChevronDown,
} from "@carbon/icons-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { cn } from "./ui/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

// ── Types ──────────────────────────────────────────────────────────────────

interface CustomList {
  id: string;
  name: string;
  status: "Active" | "Disabled" | "Pending";
  records: number;
  active: number;
  actionOnHit: "Alert & block" | "Generate alert" | "Flag for review";
  ttl: string;
  dateCreated: string;
  lastModified: string;
  listExpiry: string | null;
}

// ── Mock Data ──────────────────────────────────────────────────────────────

const MOCK_LISTS: CustomList[] = [
  {
    id: "CL-001", name: "Internal fraud — flagged", status: "Active",
    records: 3841, active: 3712, actionOnHit: "Alert & block",
    ttl: "12 months", dateCreated: "12 Jan 2026", lastModified: "06 Apr 2026", listExpiry: "12 Jan 2027",
  },
  {
    id: "CL-002", name: "Rejected KYC applicants", status: "Active",
    records: 12204, active: 11890, actionOnHit: "Alert & block",
    ttl: "12 months", dateCreated: "15 Jan 2026", lastModified: "05 Apr 2026", listExpiry: "15 Jan 2027",
  },
  {
    id: "CL-003", name: "PEP — internal identified", status: "Active",
    records: 892, active: 871, actionOnHit: "Generate alert",
    ttl: "24 months", dateCreated: "20 Jan 2026", lastModified: "04 Apr 2026", listExpiry: null,
  },
  {
    id: "CL-004", name: "Device blocklist", status: "Active",
    records: 2341, active: 2299, actionOnHit: "Alert & block",
    ttl: "6 months", dateCreated: "22 Jan 2026", lastModified: "03 Apr 2026", listExpiry: "22 Jul 2026",
  },
  {
    id: "CL-005", name: "IP — TOR / VPN exit nodes", status: "Active",
    records: 18420, active: 18420, actionOnHit: "Alert & block",
    ttl: "3 months", dateCreated: "25 Jan 2026", lastModified: "02 Apr 2026", listExpiry: "25 Apr 2026",
  },
  {
    id: "CL-006", name: "Adverse media flagged", status: "Active",
    records: 504, active: 481, actionOnHit: "Generate alert",
    ttl: "12 months", dateCreated: "01 Feb 2026", lastModified: "01 Apr 2026", listExpiry: "01 Feb 2027",
  },
  {
    id: "CL-007", name: "SIM-farm mobile numbers", status: "Active",
    records: 7812, active: 7799, actionOnHit: "Alert & block",
    ttl: "6 months", dateCreated: "05 Feb 2026", lastModified: "31 Mar 2026", listExpiry: "05 Aug 2026",
  },
  {
    id: "CL-008", name: "Investigations — under review", status: "Active",
    records: 239, active: 205, actionOnHit: "Generate alert",
    ttl: "No expiry", dateCreated: "10 Feb 2026", lastModified: "29 Mar 2026", listExpiry: null,
  },
  {
    id: "CL-009", name: "Temp sanctions override", status: "Disabled",
    records: 12, active: 0, actionOnHit: "Alert & block",
    ttl: "12 months", dateCreated: "01 Mar 2026", lastModified: "29 Mar 2026", listExpiry: "01 Mar 2027",
  },
  {
    id: "CL-010", name: "High-value customer watchlist", status: "Active",
    records: 318, active: 302, actionOnHit: "Flag for review",
    ttl: "24 months", dateCreated: "05 Mar 2026", lastModified: "25 Mar 2026", listExpiry: null,
  },
  {
    id: "CL-011", name: "Shell company registry", status: "Active",
    records: 1450, active: 1387, actionOnHit: "Alert & block",
    ttl: "12 months", dateCreated: "10 Mar 2026", lastModified: "20 Mar 2026", listExpiry: "10 Mar 2027",
  },
  {
    id: "CL-012", name: "Crypto mixer addresses", status: "Pending",
    records: 9870, active: 0, actionOnHit: "Alert & block",
    ttl: "6 months", dateCreated: "15 Mar 2026", lastModified: "15 Mar 2026", listExpiry: "15 Sep 2026",
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────

type SortKey = keyof CustomList;
type SortDir = "asc" | "desc" | null;

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey | null; sortDir: SortDir }) {
  const active = sortKey === col;
  return (
    <span className="inline-flex flex-col ml-1 -space-y-0.5">
      <ChevronUp className={cn("w-2.5 h-2.5", active && sortDir === "asc" ? "text-[#2A53A0]" : "text-gray-300")} />
      <ChevronDown className={cn("w-2.5 h-2.5", active && sortDir === "desc" ? "text-[#2A53A0]" : "text-gray-300")} />
    </span>
  );
}

function ActionOnHitBadge({ action }: { action: CustomList["actionOnHit"] }) {
  const cls =
    action === "Alert & block" ? "bg-red-50 text-red-600 border border-red-200" :
    action === "Generate alert" ? "bg-amber-50 text-amber-600 border border-amber-200" :
    "bg-blue-50 text-blue-600 border border-blue-200";
  return (
    <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap", cls)}>
      {action}
    </span>
  );
}

function StatusBadge({ status }: { status: CustomList["status"] }) {
  const cls =
    status === "Active" ? "bg-green-100 text-green-700" :
    status === "Pending" ? "bg-yellow-100 text-yellow-700" :
    "bg-gray-100 text-gray-500";
  return (
    <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", cls)}>
      {status}
    </span>
  );
}

const PAGE_SIZE_OPTIONS = ["10 / page", "20 / page", "50 / page"];

// ── Component ──────────────────────────────────────────────────────────────

export function SanctionListManagement() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);

  // Stats
  const totalLists = MOCK_LISTS.length;
  const activeLists = MOCK_LISTS.filter((l) => l.status === "Active").length;
  const totalEntities = MOCK_LISTS.reduce((s, l) => s + l.records, 0);
  const pendingApproval = MOCK_LISTS.filter((l) => l.status === "Pending").length;

  // Filter
  const filtered = useMemo(() => {
    let rows = MOCK_LISTS;
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter((r) => r.name.toLowerCase().includes(q) || r.status.toLowerCase().includes(q));
    }
    if (statusFilter !== "All statuses") {
      rows = rows.filter((r) => r.status === statusFilter);
    }
    return rows;
  }, [search, statusFilter]);

  // Sort
  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  // Paginate
  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  function toggleSort(col: SortKey) {
    if (sortKey !== col) { setSortKey(col); setSortDir("asc"); }
    else if (sortDir === "asc") setSortDir("desc");
    else if (sortDir === "desc") { setSortKey(null); setSortDir(null); }
    setPage(1);
  }

  function handleSearch(v: string) { setSearch(v); setPage(1); }
  function handleStatus(v: string) { setStatusFilter(v); setPage(1); }
  function handlePageSize(v: string) {
    setPageSize(parseInt(v));
    setPage(1);
  }

  const COLS: { key: SortKey; label: string; sortable: boolean; align?: string }[] = [
    { key: "name", label: "List Name", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "records", label: "Records", sortable: true, align: "right" },
    { key: "active", label: "Active", sortable: true, align: "right" },
    { key: "actionOnHit", label: "Action on Hit", sortable: false },
    { key: "ttl", label: "TTL", sortable: true },
    { key: "dateCreated", label: "Date Created", sortable: true },
    { key: "lastModified", label: "Last Modified", sortable: true },
    { key: "listExpiry", label: "List Expiry", sortable: true },
    { key: "id", label: "Actions", sortable: false, align: "center" },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900/50">

      {/* ── Stats Bar ───────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <div className="text-xs font-medium text-gray-500 mb-1">Total lists</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalLists}</div>
          </div>
          <div>
            <div className="text-xs font-medium text-gray-500 mb-1">Active lists</div>
            <div className="text-3xl font-bold text-[#2A53A0]">{activeLists}</div>
          </div>
          <div>
            <div className="text-xs font-medium text-gray-500 mb-1">Total entities</div>
            <div className="text-3xl font-bold text-[#2A53A0]">{totalEntities.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs font-medium text-gray-500 mb-1">Pending approval</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{pendingApproval}</div>
          </div>
        </div>
      </div>

      {/* ── Toolbar ─────────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center gap-3 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px] max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by list name or status..."
            className="w-full h-9 pl-9 pr-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#2A53A0]"
          />
        </div>

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => handleStatus(e.target.value)}
          className="h-9 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#2A53A0] cursor-pointer"
        >
          {["All statuses", "Active", "Disabled", "Pending"].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        {/* Page size */}
        <select
          value={`${pageSize} / page`}
          onChange={(e) => handlePageSize(e.target.value)}
          className="h-9 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#2A53A0] cursor-pointer"
        >
          {PAGE_SIZE_OPTIONS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <div className="flex-1" />

        {/* Export CSV */}
        <button className="h-9 px-4 flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <DocumentExport className="w-4 h-4" /> CSV
        </button>

        {/* Export PDF */}
        <button className="h-9 px-4 flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <DocumentExport className="w-4 h-4" /> PDF
        </button>

        {/* Create list */}
        <button className="h-9 px-4 flex items-center gap-1.5 text-sm font-semibold text-white bg-[#2A53A0] hover:bg-[#1e3a70] rounded-md transition-colors">
          <Add className="w-4 h-4" /> Create List
        </button>
      </div>

      {/* ── Table ───────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse text-sm min-w-[1100px]">
          <thead>
            <tr className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
              {COLS.map((col) => (
                <th
                  key={col.key}
                  onClick={col.sortable ? () => toggleSort(col.key) : undefined}
                  className={cn(
                    "py-3 px-4 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 whitespace-nowrap select-none",
                    col.sortable && "cursor-pointer hover:text-[#2A53A0] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors",
                    col.align === "right" && "text-right",
                    col.align === "center" && "text-center",
                  )}
                >
                  <span className="inline-flex items-center gap-0.5">
                    {col.label}
                    {col.sortable && <SortIcon col={col.key} sortKey={sortKey} sortDir={sortDir} />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={COLS.length} className="py-16 text-center text-sm text-gray-400">
                  No lists match your search criteria.
                </td>
              </tr>
            ) : (
              paginated.map((row) => {
                const expiryDate = row.listExpiry
                  ? new Date(row.listExpiry.replace(/(\d+) (\w+) (\d+)/, "$2 $1 $3"))
                  : null;
                const isExpiringSoon = expiryDate
                  ? (expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24) <= 60
                  : false;

                return (
                  <tr
                    key={row.id}
                    className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    {/* List Name */}
                    <td className="py-3 px-4">
                      <span className="font-semibold text-[#2A53A0] hover:underline cursor-pointer">
                        {row.name}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <StatusBadge status={row.status} />
                    </td>

                    {/* Records */}
                    <td className="py-3 px-4 text-right font-medium text-gray-700 dark:text-gray-300 tabular-nums">
                      {row.records.toLocaleString()}
                    </td>

                    {/* Active */}
                    <td className="py-3 px-4 text-right tabular-nums">
                      <span className={cn(
                        "font-semibold",
                        row.active > 0 ? "text-[#2A53A0]" : "text-gray-400"
                      )}>
                        {row.active.toLocaleString()}
                      </span>
                    </td>

                    {/* Action on Hit */}
                    <td className="py-3 px-4">
                      <ActionOnHitBadge action={row.actionOnHit} />
                    </td>

                    {/* TTL */}
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      {row.ttl}
                    </td>

                    {/* Date Created */}
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400 whitespace-nowrap tabular-nums">
                      {row.dateCreated}
                    </td>

                    {/* Last Modified */}
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400 whitespace-nowrap tabular-nums">
                      {row.lastModified}
                    </td>

                    {/* List Expiry */}
                    <td className="py-3 px-4 whitespace-nowrap tabular-nums">
                      {row.listExpiry ? (
                        <span className={cn(
                          "font-medium",
                          isExpiringSoon ? "text-red-500 font-semibold" : "text-gray-600 dark:text-gray-400"
                        )}>
                          {row.listExpiry}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        {/* View */}
                        <button
                          title="View"
                          className="w-7 h-7 flex items-center justify-center rounded bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
                        >
                          <View className="w-3.5 h-3.5" />
                        </button>
                        {/* Edit */}
                        <button
                          title="Edit"
                          className="w-7 h-7 flex items-center justify-center rounded bg-[#2A53A0]/10 hover:bg-[#2A53A0]/20 text-[#2A53A0] transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        {/* More / Toggle */}
                        <button
                          title={row.status === "Active" ? "Disable" : "Enable"}
                          className={cn(
                            "w-7 h-7 flex items-center justify-center rounded transition-colors",
                            row.status === "Active"
                              ? "bg-red-50 hover:bg-red-100 text-red-500"
                              : "bg-green-50 hover:bg-green-100 text-green-600"
                          )}
                        >
                          {/* Using grid-like icon to match screenshot */}
                          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-current">
                            <rect x="1" y="1" width="6" height="6" rx="1" />
                            <rect x="9" y="1" width="6" height="6" rx="1" />
                            <rect x="1" y="9" width="6" height="6" rx="1" />
                            <rect x="9" y="9" width="6" height="6" rx="1" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination Footer ────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          Showing {sorted.length === 0 ? 0 : (page - 1) * pageSize + 1}–{Math.min(page * pageSize, sorted.length)} of {sorted.length} lists
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded border text-sm font-medium transition-colors",
                p === page
                  ? "bg-[#2A53A0] text-white border-[#2A53A0]"
                  : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              )}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || totalPages === 0}
            className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
