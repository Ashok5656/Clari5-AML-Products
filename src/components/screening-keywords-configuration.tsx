import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, Add, View, Download, DocumentExport, ChevronDown, TrashCan,
  ArrowLeft, Checkmark, Settings,
} from "@carbon/icons-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { TableBody, TableCell, TableRow } from "./ui/table";
import { CarbonPaginationFooter } from "./carbon-pagination-footer";
import { useSortableData } from "../hooks/use-sortable-data";
import { SortableHeader } from "./ui/sortable-header";
import { cn } from "./ui/utils";
import { CreationLoader } from "./creation-loader";
import { CreationSuccessDialog } from "./creation-success-dialog";
import { RejectionDialog } from "./rejection-dialog";

// ── Types ──────────────────────────────────────────────────────────────────

type RiskLevel  = "High" | "Medium" | "Low";
type MatchType  = "Exact phrase" | "Partial match" | "Regex pattern";
type Category   = "Sanctions" | "Terrorism" | "PEP" | "Financial Crime";
type KwStatus   = "Active" | "Inactive" | "Draft" | "Pending";
type PageMode   = "main" | "create" | "audit-trail" | "verify";
type FilterTab  = "Active" | "Inactive" | "Drafted Keyword" | "Pending for Verification";

interface Keyword {
  id: string;
  phrase: string;
  category: Category;
  risk: RiskLevel;
  matchType: MatchType;
  status: KwStatus;
  dateAdded: string;
  addedBy: string;
}

// ── Mock Data ──────────────────────────────────────────────────────────────

const MOCK_KEYWORDS: Keyword[] = [
  { id: "K-001", phrase: "shell company",       category: "Sanctions",       risk: "High",   matchType: "Exact phrase",  status: "Active",   dateAdded: "01 Jan 2026", addedBy: "Risk Manager"       },
  { id: "K-002", phrase: "OFAC listed entity",  category: "Sanctions",       risk: "High",   matchType: "Partial match", status: "Active",   dateAdded: "01 Jan 2026", addedBy: "Risk Manager"       },
  { id: "K-003", phrase: "arms dealer",         category: "Sanctions",       risk: "High",   matchType: "Exact phrase",  status: "Active",   dateAdded: "05 Jan 2026", addedBy: "Compliance Officer" },
  { id: "K-004", phrase: "terrorist financing", category: "Terrorism",       risk: "High",   matchType: "Partial match", status: "Active",   dateAdded: "10 Jan 2026", addedBy: "Risk Manager"       },
  { id: "K-005", phrase: "hawala transfer",     category: "Terrorism",       risk: "Medium", matchType: "Exact phrase",  status: "Active",   dateAdded: "10 Jan 2026", addedBy: "Compliance Officer" },
  { id: "K-006", phrase: "political donation",  category: "PEP",             risk: "Medium", matchType: "Partial match", status: "Active",   dateAdded: "15 Jan 2026", addedBy: "Risk Manager"       },
  { id: "K-007", phrase: "government official", category: "PEP",             risk: "Medium", matchType: "Partial match", status: "Active",   dateAdded: "15 Jan 2026", addedBy: "Risk Manager"       },
  { id: "K-008", phrase: "smurfing",            category: "Financial Crime", risk: "High",   matchType: "Exact phrase",  status: "Active",   dateAdded: "20 Jan 2026", addedBy: "Compliance Officer" },
  { id: "K-009", phrase: "layering scheme",     category: "Financial Crime", risk: "High",   matchType: "Partial match", status: "Active",   dateAdded: "20 Jan 2026", addedBy: "Compliance Officer" },
  { id: "K-010", phrase: "offshore trust",      category: "Financial Crime", risk: "Medium", matchType: "Exact phrase",  status: "Active",   dateAdded: "25 Jan 2026", addedBy: "Risk Manager"       },
  { id: "K-011", phrase: "drug trafficking",    category: "Terrorism",       risk: "High",   matchType: "Partial match", status: "Inactive", dateAdded: "01 Feb 2026", addedBy: "Risk Manager"       },
  { id: "K-012", phrase: "tax evasion scheme",  category: "Financial Crime", risk: "Medium", matchType: "Exact phrase",  status: "Inactive", dateAdded: "05 Feb 2026", addedBy: "Compliance Officer" },
  { id: "K-013", phrase: "illicit fund transfer", category: "Financial Crime", risk: "High", matchType: "Partial match", status: "Draft",   dateAdded: "08 Feb 2026", addedBy: "Risk Manager"       },
  { id: "K-014", phrase: "ghost employee",      category: "Financial Crime", risk: "Medium", matchType: "Exact phrase",  status: "Draft",   dateAdded: "09 Feb 2026", addedBy: "Compliance Officer" },
  { id: "K-015", phrase: "proliferation finance", category: "Terrorism",     risk: "High",   matchType: "Partial match", status: "Pending", dateAdded: "10 Feb 2026", addedBy: "Risk Manager"       },
  { id: "K-016", phrase: "front company",       category: "Sanctions",       risk: "High",   matchType: "Exact phrase",  status: "Pending", dateAdded: "11 Feb 2026", addedBy: "Compliance Officer" },
];

const CATEGORIES: Category[]   = ["Sanctions", "Terrorism", "PEP", "Financial Crime"];
const MATCH_TYPES: MatchType[]  = ["Exact phrase", "Partial match", "Regex pattern"];
const RISK_LEVELS: RiskLevel[]  = ["High", "Medium", "Low"];

// ── Helpers ────────────────────────────────────────────────────────────────

const RISK_BADGE: Record<RiskLevel, string> = {
  High:   "bg-red-100 text-red-600",
  Medium: "bg-amber-100 text-amber-700",
  Low:    "bg-green-100 text-green-700",
};



// ── Component ──────────────────────────────────────────────────────────────

export function ScreeningKeywordsConfiguration({ onSubPageChange }: { onSubPageChange?: (v: boolean) => void }) {
  const [keywords, setKeywords]         = useState<Keyword[]>(MOCK_KEYWORDS);
  const [pageMode, setPageMode]         = useState<PageMode>("main");
  const [activeTab, setActiveTab]       = useState<FilterTab>("Active");
  const [searchQuery, setSearchQuery]   = useState("");
  const [currentPage, setCurrentPage]   = useState(1);
  const [pageSize, setPageSize]         = useState(10);
  const [exportOpen, setExportOpen]     = useState(false);

  // create form
  const [newPhrase, setNewPhrase]       = useState("");
  const [newCategory, setNewCategory]   = useState<Category>("Sanctions");
  const [newRisk, setNewRisk]           = useState<RiskLevel>("Medium");
  const [newMatchType, setNewMatchType] = useState<MatchType>("Exact phrase");
  const [newReason, setNewReason]       = useState("");
  const [narrative, setNarrative]       = useState("");

  // submit flow
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess]   = useState(false);

  // verify flow
  const [selectedKeyword, setSelectedKeyword]           = useState<Keyword | null>(null);
  const [verifyComment, setVerifyComment]               = useState("");
  const [isVerifying, setIsVerifying]                   = useState(false);
  const [showApproveSuccess, setShowApproveSuccess]     = useState(false);
  const [showRejectDialog, setShowRejectDialog]         = useState(false);

  // category controls dialog
  const [categoryControlsOpen, setCategoryControlsOpen] = useState(false);
  const [categoryEnabled, setCategoryEnabled] = useState<Record<Category, boolean>>({
    Sanctions:        true,
    Terrorism:        true,
    PEP:              true,
    "Financial Crime": true,
  });

  // ── navigation helpers ─────────────────────────────────────────────────
  const goToMain = () => { setPageMode("main"); setSelectedKeyword(null); onSubPageChange?.(false); };
  const openCreate = () => {
    setNewPhrase(""); setNewCategory("Sanctions"); setNewRisk("Medium");
    setNewMatchType("Exact phrase"); setNewReason(""); setNarrative("");
    setPageMode("create"); onSubPageChange?.(true);
  };

  // ── derived ───────────────────────────────────────────────────────────
  const activeCount   = keywords.filter(k => k.status === "Active").length;
  const inactiveCount = keywords.filter(k => k.status === "Inactive").length;
  const draftCount    = keywords.filter(k => k.status === "Draft").length;
  const pendingCount  = keywords.filter(k => k.status === "Pending").length;

  const tabFiltered = keywords.filter(k =>
    activeTab === "Active"                   ? k.status === "Active" :
    activeTab === "Inactive"                 ? k.status === "Inactive" :
    activeTab === "Drafted Keyword"          ? k.status === "Draft" :
    k.status === "Pending"
  );

  const searched = tabFiltered.filter(k =>
    k.phrase.toLowerCase().includes(searchQuery.toLowerCase()) ||
    k.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { items: sorted, sortConfig, requestSort } = useSortableData(searched);

  const totalItems    = sorted.length;
  const startIndex    = (currentPage - 1) * pageSize;
  const currentItems  = sorted.slice(startIndex, startIndex + pageSize);

  // live narrative highlight
  const highlighted = (() => {
    if (!narrative.trim()) return null;
    let result = narrative;
    keywords.filter(k => k.status === "Active").forEach(k => {
      const esc = k.phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      result = result.replace(new RegExp(`(${esc})`, "gi"),
        `<mark class="bg-yellow-200 text-yellow-900 rounded px-0.5">$1</mark>`);
    });
    return result;
  })();

  // ── action handlers ────────────────────────────────────────────────────
  const handleToggle = (id: string) => {
    setKeywords((prev: Keyword[]) => prev.map(k =>
      k.id === id ? { ...k, status: k.status === "Active" ? "Inactive" : "Active" } : k
    ));
  };

  const handleRemove = (id: string) => {
    setKeywords((prev: Keyword[]) => prev.filter(k => k.id !== id));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newKw: Keyword = {
        id: `K-${String(Date.now()).slice(-4)}`,
        phrase: newPhrase.trim(),
        category: newCategory,
        risk: newRisk,
        matchType: newMatchType,
        status: "Pending",
        dateAdded: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        addedBy: "Current User",
      };
      setKeywords((prev: Keyword[]) => [...prev, newKw]);
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 2000);
  };

  // ══════════════════════════════════════════════════════════════════════
  // ── AUDIT TRAIL PAGE ──────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════
  if (pageMode === "audit-trail") {
    const EVENT_TYPES = ["All event types", "Keyword approved", "Keyword added", "Keyword disabled", "Bulk import", "Maker-checker rejected", "Risk level updated", "Keyword removed"];
    const ALL_USERS   = ["All users", "Risk Manager", "Compliance Officer", "System Import", "Checker Admin"];

    const AUDIT_EVENTS = [
      { id: "EVT-004021", dot: "green",  title: 'Keyword approved — "shell company" added to Sanctions category',                      meta: "Checker: Compliance Officer · REQ-0112 · Object: K-001 · Status: Pending → Active",             ts: "2026-04-06T09:14:22.441Z · IP 10.0.1.42" },
      { id: "EVT-004020", dot: "blue",   title: 'Keyword submitted for verification — "front company"',                                 meta: "Maker: Risk Manager · REQ-0115 · Object type: Keyword (new) · Approval status: Pending",         ts: "2026-04-06T08:30:08.112Z · IP 10.0.1.55" },
      { id: "EVT-004017", dot: "orange", title: 'Risk level updated for "hawala transfer" — Low → Medium',                             meta: "Updated by: Compliance Officer · REQ-0109 · Object: K-005 · Previous: Low · New: Medium",         ts: "2026-04-05T14:15:33.009Z · IP 10.0.1.61" },
      { id: "EVT-004012", dot: "green",  title: "Bulk import approved — 12 keywords added to screening configuration",                  meta: "Checker: Compliance Officer · REQ-0103 · File: keywords_jan26.xlsx · Valid rows: 12",             ts: "2026-04-04T11:22:55.780Z · IP 10.0.1.61" },
      { id: "EVT-003998", dot: "red",    title: 'Maker-checker request rejected — Add keyword "cash intensive business"',              meta: 'Checker: Compliance Officer · Reason: "Phrase too generic — may cause excessive false positives." · REQ-0097', ts: "2026-03-29T08:04:17.210Z · IP 10.0.1.61" },
      { id: "EVT-003971", dot: "blue",   title: 'Category PEP temporarily disabled for system maintenance',                            meta: "Updated by: Compliance Officer · REQ-0089 · Affected keywords: 2 · Duration: 4h",                 ts: "2026-03-20T07:55:11.330Z · IP 10.0.8.100" },
      { id: "EVT-000001", dot: "blue",   title: 'Keyword "shell company" added to Sanctions category',                                 meta: "Maker: Risk Manager · Checker: Compliance Officer · REQ-0001 · Object: K-001",                   ts: "2026-01-01T10:15:44.003Z · IP 10.0.1.30" },
    ];

    const DOT_COLOR: Record<string, string> = {
      green:  "bg-green-500",
      blue:   "bg-[#2a53a0]",
      orange: "bg-orange-400",
      red:    "bg-red-500",
    };
    const DOT_SHAPE: Record<string, string> = {
      green:  "rounded-full w-2.5 h-2.5",
      blue:   "rounded-full w-5 h-3",
      orange: "rounded-full w-2.5 h-2.5",
      red:    "rounded-full w-2.5 h-2.5",
    };

    return (
      <div className="flex flex-col h-full bg-white dark:bg-gray-900">

        {/* Top Nav */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between shrink-0 shadow-sm relative">
          <button onClick={goToMain} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <span className="absolute left-1/2 -translate-x-1/2 text-[15px] font-semibold text-[#161616] dark:text-white">Audit Trail</span>
          <div className="flex items-center gap-2">
            <button onClick={goToMain} className="text-sm font-normal text-[#2A53A0] dark:text-[#6b93e6] hover:text-[#1e3a70] transition-colors">Screening – Keywords Configuration</button>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-normal text-[#161616] dark:text-gray-300">Audit Trail</span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex-none bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-3">
          <div className="relative flex-1 max-w-[480px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by event, user, object ID, event ID..."
              className="pl-9 h-[38px] bg-white border-gray-200 focus-visible:ring-[#2A53A0] text-[13px]"
            />
          </div>
          <div className="relative">
            <select className="h-[38px] pl-3 pr-8 bg-white border border-gray-200 rounded-[8px] text-[13px] text-[#161616] appearance-none focus:outline-none focus:ring-1 focus:ring-[#2a53a0]">
              {EVENT_TYPES.map(o => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select className="h-[38px] pl-3 pr-8 bg-white border border-gray-200 rounded-[8px] text-[13px] text-[#161616] appearance-none focus:outline-none focus:ring-1 focus:ring-[#2a53a0]">
              {ALL_USERS.map(o => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
          <input type="date" className="h-[38px] px-3 bg-white border border-gray-200 rounded-[8px] text-[13px] text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
          <input type="date" className="h-[38px] px-3 bg-white border border-gray-200 rounded-[8px] text-[13px] text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
        </div>

        {/* Events list */}
        <div className="flex-1 overflow-y-auto">
          {AUDIT_EVENTS.map((ev, idx) => (
            <div key={ev.id} className={cn("px-6 py-4 flex gap-4 border-b border-gray-100 hover:bg-gray-50 transition-colors", idx === 0 && "border-t border-gray-100")}>
              <div className="mt-1.5 shrink-0 flex items-start justify-center w-5">
                <span className={cn("block shrink-0", DOT_COLOR[ev.dot], DOT_SHAPE[ev.dot])} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-[#161616] leading-snug">{ev.title}</p>
                <p className="text-[12px] text-[#6b7280] mt-0.5">{ev.meta}</p>
                <p className="text-[11px] text-[#9ca3af] mt-1">{ev.ts} · {ev.id}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer: count + pagination */}
        <div className="flex-none border-t border-gray-200 bg-white h-[48px] flex items-center justify-between px-6">
          <span className="text-[13px] text-[#6b7280]">Showing 1–7 of 4,021 events</span>
          <div className="flex items-center gap-1">
            {["‹", "1", "2", "3", "›"].map((p, i) => (
              <button key={i} className={cn(
                "w-8 h-8 flex items-center justify-center rounded-[4px] text-[13px] transition-colors",
                p === "1" ? "bg-[#2a53a0] text-white font-semibold" : "text-[#374151] hover:bg-gray-100"
              )}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // ── CREATE KEYWORD PAGE ───────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════
  if (pageMode === "create") {
    const charLeft = 500 - newReason.length;
    return (
      <div className="flex flex-col h-full bg-white dark:bg-gray-900">
        {isSubmitting && <CreationLoader />}
        <CreationSuccessDialog
          eventName=""
          isOpen={showSuccess}
          title="Submitted for Verification"
          message="Keyword has been successfully submitted for verification."
          onContinue={() => { setShowSuccess(false); setActiveTab("Pending for Verification"); goToMain(); }}
        />

        {/* Top Nav */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between shrink-0 shadow-sm relative">
          <button onClick={goToMain} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <span className="absolute left-1/2 -translate-x-1/2 text-[15px] font-semibold text-[#161616] dark:text-white">Add New Keyword</span>
          <div className="flex items-center gap-2">
            <button onClick={goToMain} className="text-sm font-normal text-[#2A53A0] hover:text-[#1e3a70] transition-colors">Screening – Keywords Configuration</button>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-normal text-[#161616] dark:text-gray-300">Add New Keyword</span>
          </div>
        </div>

        {/* Form body */}
        <div className="flex-1 flex flex-col overflow-hidden px-6 py-5 gap-5">

          {/* Keyword / Phrase — full row */}
          <div className="shrink-0 space-y-1.5">
            <label className="text-[13px] font-semibold text-[#161616]">
              Keyword / Phrase <span className="text-[#fb2c36]">*</span>
            </label>
            <Input
              value={newPhrase}
              onChange={e => setNewPhrase(e.target.value)}
              placeholder="e.g. arms dealer, offshore trust, shell company..."
              className="h-[46px] bg-white border-gray-200 focus-visible:ring-[#2a53a0] text-[14px]"
            />
          </div>

          {/* Category · Risk Level · Match Type — 3 cols */}
          <div className="shrink-0 grid grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-[#161616]">
                Category <span className="text-[#fb2c36]">*</span>
              </label>
              <select
                value={newCategory}
                onChange={e => setNewCategory(e.target.value as Category)}
                className="w-full h-[46px] px-3 bg-white border border-gray-200 rounded-[8px] text-[14px] text-[#161616] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]"
              >
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-[#161616]">
                Risk Level <span className="text-[#fb2c36]">*</span>
              </label>
              <select
                value={newRisk}
                onChange={e => setNewRisk(e.target.value as RiskLevel)}
                className="w-full h-[46px] px-3 bg-white border border-gray-200 rounded-[8px] text-[14px] text-[#161616] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]"
              >
                {RISK_LEVELS.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-[#161616]">
                Match Type <span className="text-[#fb2c36]">*</span>
              </label>
              <select
                value={newMatchType}
                onChange={e => setNewMatchType(e.target.value as MatchType)}
                className="w-full h-[46px] px-3 bg-white border border-gray-200 rounded-[8px] text-[14px] text-[#161616] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]"
              >
                {MATCH_TYPES.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div className="shrink-0 border-t border-gray-100" />

          {/* Reason — card */}
          <div className="bg-white rounded-[8px] border border-gray-200 shadow-sm overflow-hidden shrink-0">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#f8fafc]">
              <h2 className="text-[14px] font-semibold text-[#161616]">Reason for Addition</h2>
              <p className="text-[12px] text-[#6b7280] mt-0.5">Mandatory — retained in the audit log.</p>
            </div>
            <div className="p-5">
              <textarea
                rows={3}
                maxLength={500}
                value={newReason}
                onChange={e => setNewReason(e.target.value)}
                placeholder="Describe why this keyword is being added..."
                className="w-full p-3 bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0] resize-none"
              />
              <p className={cn("text-[11px] mt-1 text-right", charLeft < 50 ? "text-red-500" : "text-[#9ca3af]")}>
                {charLeft} characters remaining
              </p>
            </div>
          </div>

          {/* Live Narrative Tester — card */}
          <div className="bg-white rounded-[8px] border border-gray-200 shadow-sm overflow-hidden shrink-0">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#f8fafc]">
              <h2 className="text-[14px] font-semibold text-[#161616]">Live Narrative Tester</h2>
              <p className="text-[12px] text-[#6b7280] mt-0.5">Paste a transaction remark to test keyword matching in real time.</p>
            </div>
            <div className="p-5 grid grid-cols-2 gap-5">
              <div>
                <textarea
                  rows={4}
                  value={narrative}
                  onChange={e => setNarrative(e.target.value)}
                  placeholder="Paste a transaction remark or narrative here..."
                  className="w-full p-3 bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0] resize-none"
                />
              </div>
              <div>
                <p className="text-[12px] font-semibold text-[#6b7280] uppercase tracking-wide mb-2">Preview — Matched Keywords Highlighted</p>
                <div className="min-h-[96px] p-3 bg-gray-50 border border-gray-200 rounded-[8px] text-[13px]">
                  {narrative.trim() && highlighted ? (
                    <span className="text-[#161616] leading-relaxed" dangerouslySetInnerHTML={{ __html: highlighted }} />
                  ) : (
                    <p className="text-[#9ca3af] leading-relaxed">No narrative entered. Paste text above to see live keyword matches highlighted.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex-none border-t border-gray-200 bg-white h-[64px] flex items-center justify-between px-6">
          <Button variant="outline" onClick={goToMain} className="h-[46px] px-6 rounded-[8px]">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!newPhrase.trim() || !newReason.trim()}
            className="h-[46px] px-6 rounded-[8px] bg-[#2a53a0] hover:bg-[#1e3a70] text-white"
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // ── VERIFY KEYWORD PAGE ───────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════
  if (pageMode === "verify" && selectedKeyword) {
    const kw = selectedKeyword;

    const handleApprove = () => {
      setIsVerifying(true);
      setTimeout(() => {
        setKeywords((prev: Keyword[]) => prev.map(k => k.id === kw.id ? { ...k, status: "Active" as KwStatus } : k));
        setIsVerifying(false);
        setShowApproveSuccess(true);
      }, 2000);
    };

    const handleReject = () => {
      setIsVerifying(true);
      setTimeout(() => {
        setKeywords((prev: Keyword[]) => prev.map(k => k.id === kw.id ? { ...k, status: "Draft" as KwStatus } : k));
        setIsVerifying(false);
        setShowRejectDialog(true);
      }, 2000);
    };

    return (
      <div className="flex flex-col h-full bg-white dark:bg-gray-900">
        {isVerifying && <CreationLoader />}
        <CreationSuccessDialog
          eventName=""
          isOpen={showApproveSuccess}
          title="Approved"
          message="The keyword has been approved and moved to the Active list."
          onContinue={() => { setShowApproveSuccess(false); setActiveTab("Active"); goToMain(); }}
        />
        <RejectionDialog
          isOpen={showRejectDialog}
          title="Rejected"
          message="The keyword has been rejected and moved back to the Drafted Keyword list."
          onContinue={() => { setShowRejectDialog(false); setActiveTab("Drafted Keyword"); goToMain(); }}
        />

        {/* Top Nav */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between shrink-0 shadow-sm relative">
          <button onClick={goToMain} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <span className="absolute left-1/2 -translate-x-1/2 text-[15px] font-semibold text-[#161616] dark:text-white">Verify Keyword</span>
          <div className="flex items-center gap-2">
            <button onClick={goToMain} className="text-sm font-normal text-[#2A53A0] hover:text-[#1e3a70] transition-colors">Screening – Keywords Configuration</button>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-normal text-[#161616] dark:text-gray-300 truncate max-w-[180px]">{kw.phrase}</span>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-normal text-[#161616] dark:text-gray-300">Verify</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden px-6 py-5 gap-5">

          {/* Keyword summary card */}
          <div className="shrink-0 bg-[#f8fafc] rounded-[8px] border border-gray-200 p-5 grid grid-cols-3 gap-x-8 gap-y-4">
            {[
              { label: "Keyword / Phrase", value: kw.phrase },
              { label: "Category",         value: kw.category },
              { label: "Status",           badge: kw.status },
              { label: "Risk Level",       risk: kw.risk },
              { label: "Match Type",       value: kw.matchType },
              { label: "Date Added",       value: kw.dateAdded },
              { label: "Added By",         value: kw.addedBy },
              { label: "Keyword ID",       value: kw.id },
            ].map(({ label, value, badge, risk }) => (
              <div key={label} className="space-y-0.5">
                <p className="text-[11px] text-[#9ca3af] uppercase tracking-wide font-medium">{label}</p>
                {badge ? (
                  <span className={cn(
                    "inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full",
                    badge === "Active"  ? "bg-green-100 text-green-700" :
                    badge === "Pending" ? "bg-yellow-100 text-yellow-700" :
                    badge === "Draft"   ? "bg-blue-50 text-blue-600" :
                    "bg-gray-100 text-gray-500"
                  )}>{badge}</span>
                ) : risk ? (
                  <span className={cn("inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full", RISK_BADGE[risk as RiskLevel])}>{risk}</span>
                ) : (
                  <p className="text-[14px] font-medium text-[#161616]">{value ?? "—"}</p>
                )}
              </div>
            ))}
          </div>

          <div className="shrink-0 border-t border-gray-100" />

          {/* Checker comment card */}
          <div className="bg-white rounded-[8px] border border-gray-200 shadow-sm overflow-hidden shrink-0">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#f8fafc]">
              <h2 className="text-[14px] font-semibold text-[#161616]">Checker Comment</h2>
              <p className="text-[12px] text-[#6b7280] mt-0.5">Add remarks before approving or rejecting. Retained in the audit log.</p>
            </div>
            <div className="p-5">
              <textarea
                rows={4}
                maxLength={500}
                value={verifyComment}
                onChange={e => setVerifyComment(e.target.value)}
                placeholder="Enter your comment or reason for decision..."
                className="w-full p-3 bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0] resize-none"
              />
              <p className="text-[11px] text-[#9ca3af] mt-1 text-right">{500 - verifyComment.length} characters remaining</p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex-none border-t border-gray-200 bg-white h-[64px] flex items-center justify-between px-6">
          <Button variant="outline" onClick={goToMain} className="h-[46px] px-6 rounded-[8px]">
            Cancel
          </Button>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleReject}
              className="h-[46px] px-6 rounded-[8px] border-red-400 text-red-600 hover:bg-red-50"
            >
              Reject
            </Button>
            <Button
              onClick={handleApprove}
              className="h-[46px] px-6 rounded-[8px] bg-[#2a53a0] hover:bg-[#1e3a70] text-white"
            >
              <Checkmark className="w-4 h-4 mr-1.5" /> Approve
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // ── MAIN PAGE ─────────────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════
  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* ── Tabs ─────────────────────────────────────────────────────────── */}
      <div className="flex-none border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4">
        <div className="flex h-[48px] w-full">
          {(["Active", "Inactive", "Drafted Keyword", "Pending for Verification"] as FilterTab[]).map(tab => (
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
              {tab === "Active"                   ? `Active (${activeCount})` :
               tab === "Inactive"                 ? `Inactive (${inactiveCount})` :
               tab === "Drafted Keyword"          ? `Drafted Keyword (${draftCount})` :
               `Pending for Verification (${pendingCount})`}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden flex flex-col p-4 gap-4">

        {/* ── Search + Buttons ──────────────────────────────────────────── */}
        <div className="flex-none bg-white dark:bg-gray-900 flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search keywords by phrase, category..."
              className="pl-9 w-72 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus-visible:ring-[#2A53A0] h-[46px]"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <div className="flex items-center gap-2">
            {/* Export dropdown — hidden on Pending for Verification */}
            {activeTab !== "Pending for Verification" && (
              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => setExportOpen((o: boolean) => !o)}
                  className="gap-1.5 bg-white dark:bg-gray-900 h-[46px] text-sm"
                >
                  <DocumentExport className="w-4 h-4" /> Export <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                </Button>
                {exportOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setExportOpen(false)} />
                    <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-[6px] shadow-lg z-20 overflow-hidden">
                      <button onClick={() => setExportOpen(false)} className="flex items-center gap-2 w-full px-4 py-2.5 text-[13px] text-[#161616] hover:bg-gray-50 transition-colors">
                        <DocumentExport className="w-4 h-4 text-[#525252]" /> Export as PDF
                      </button>
                      <button onClick={() => setExportOpen(false)} className="flex items-center gap-2 w-full px-4 py-2.5 text-[13px] text-[#161616] hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4 text-[#525252]" /> Export as CSV
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
            <Button
              variant="outline"
              onClick={() => { setPageMode("audit-trail"); onSubPageChange?.(true); }}
              className="gap-1.5 bg-white dark:bg-gray-900 h-[46px] text-sm"
            >
              <View className="w-4 h-4" /> Audit Trail
            </Button>
            <Button
              variant="outline"
              onClick={() => setCategoryControlsOpen(true)}
              className="gap-1.5 bg-white dark:bg-gray-900 h-[46px] text-sm"
            >
              <Settings className="w-4 h-4" /> Category Controls
            </Button>
            {/* Add Keyword — hidden on Pending for Verification */}
            {activeTab !== "Pending for Verification" && (
              <Button
                onClick={openCreate}
                className="gap-1.5 bg-[#2A53A0] hover:bg-[#2A53A0]/90 text-white h-[46px] text-sm"
              >
                <Add className="w-4 h-4" /> Add Keyword
              </Button>
            )}
          </div>
        </div>

        {/* ── Table ──────────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-hidden flex flex-col bg-white dark:bg-gray-900 rounded-[8px] border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex-1 overflow-auto min-h-0">
            <table className="w-full caption-bottom text-sm">
              <thead className="sticky top-0 z-10 shadow-sm">
                <tr className="bg-[#F0F0F0] text-[#161616] h-[48px]">
                  <th className="pl-4 px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[220px]">
                    <SortableHeader column="phrase" label="Keyword / Phrase" sortConfig={sortConfig} onSort={requestSort} />
                  </th>
                  <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[150px]">
                    <SortableHeader column="category" label="Category" sortConfig={sortConfig} onSort={requestSort} />
                  </th>
                  <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[100px]">
                    <SortableHeader column="risk" label="Risk" sortConfig={sortConfig} onSort={requestSort} />
                  </th>
                  <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[140px]">
                    <SortableHeader column="matchType" label="Match Type" sortConfig={sortConfig} onSort={requestSort} />
                  </th>
                  <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[130px]">
                    <SortableHeader column="dateAdded" label="Date Added" sortConfig={sortConfig} onSort={requestSort} />
                  </th>
                  <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[100px]">
                    <SortableHeader column="status" label="Status" sortConfig={sortConfig} onSort={requestSort} />
                  </th>
                  <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[120px]">Actions</th>
                </tr>
              </thead>
              <TableBody>
                {currentItems.length > 0 ? currentItems.map(kw => (
                  <TableRow key={kw.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800 h-[46px]">

                    {/* Keyword phrase */}
                    <TableCell className="pl-4 px-4 align-middle">
                      <span className="text-sm font-semibold text-[#161616] dark:text-white">{kw.phrase}</span>
                    </TableCell>

                    {/* Category */}
                    <TableCell className="px-4 align-middle">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{kw.category}</span>
                    </TableCell>

                    {/* Risk badge */}
                    <TableCell className="px-4 align-middle">
                      <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", RISK_BADGE[kw.risk])}>
                        {kw.risk}
                      </span>
                    </TableCell>

                    {/* Match type */}
                    <TableCell className="px-4 align-middle">
                      <span className="text-sm text-[#2a53a0] dark:text-[#6b93e6]">{kw.matchType}</span>
                    </TableCell>

                    {/* Date Added */}
                    <TableCell className="px-4 align-middle">
                      <span className="text-sm text-gray-700 dark:text-gray-300 tabular-nums">{kw.dateAdded}</span>
                    </TableCell>

                    {/* Status badge */}
                    <TableCell className="px-4 align-middle">
                      <span className={cn(
                        "text-xs font-semibold px-2.5 py-1 rounded-full",
                        kw.status === "Active"   ? "bg-green-100 text-green-700" :
                        kw.status === "Pending"  ? "bg-yellow-100 text-yellow-700" :
                        kw.status === "Draft"    ? "bg-blue-50 text-blue-600" :
                        "bg-gray-100 text-gray-500"
                      )}>
                        {kw.status}
                      </span>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="px-4 align-middle">
                      <div className="flex items-center justify-start gap-2">
                        {/* On/Off toggle — Active / Inactive tabs only */}
                        {(activeTab === "Active" || activeTab === "Inactive") && (
                          <button
                            onClick={() => handleToggle(kw.id)}
                            className={cn(
                              "flex items-center justify-center w-8 h-8 rounded-sm text-xs font-medium transition-colors",
                              kw.status === "Active"
                                ? "bg-red-500/10 hover:bg-red-500/20 text-red-600"
                                : "bg-green-500/10 hover:bg-green-500/20 text-green-700"
                            )}
                            title={kw.status === "Active" ? "Disable" : "Enable"}
                          >
                            {kw.status === "Active" ? "Off" : "On"}
                          </button>
                        )}
                        {/* Verify — Pending for Verification tab only */}
                        {activeTab === "Pending for Verification" && (
                          <button
                            onClick={() => { setSelectedKeyword(kw); setVerifyComment(""); setPageMode("verify"); onSubPageChange?.(true); }}
                            className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#2a53a0]/10 hover:bg-[#2a53a0]/20 text-[#2a53a0] transition-colors"
                            title="Verify"
                          >
                            <Checkmark className="w-4 h-4" />
                          </button>
                        )}
                        {/* Delete — all tabs */}
                        <button
                          onClick={() => handleRemove(kw.id)}
                          className="flex items-center justify-center w-8 h-8 rounded-sm bg-red-500/10 hover:bg-red-500/20 text-red-600 transition-colors"
                          title="Remove"
                        >
                          <TrashCan className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                      No keywords found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </table>
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

      </div>

      {/* ── Category Controls Dialog ─────────────────────────────────── */}
      <AnimatePresence>
        {categoryControlsOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCategoryControlsOpen(false)}
              className="fixed inset-0 bg-black/50 z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.18 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] bg-white rounded-[8px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] z-[101] overflow-hidden"
            >
              {/* Dialog header */}
              <div className="bg-[#2a53a0] h-[64px] flex items-center justify-between px-[30px]">
                <div>
                  <h2 className="text-white text-[18px] font-normal leading-tight">Category controls</h2>
                  <p className="text-white/70 text-[12px] mt-0.5">Enable / disable screening per category</p>
                </div>
                <button
                  onClick={() => setCategoryControlsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                  </svg>
                </button>
              </div>

              {/* Category list */}
              <div className="divide-y divide-gray-100">
                {(["Sanctions", "Terrorism", "PEP (Politically Exposed Persons)", "Financial Crime"] as const).map((label) => {
                  const key = label === "PEP (Politically Exposed Persons)" ? "PEP" : label as Category;
                  const count = keywords.filter(k => k.category === key).length;
                  const enabled = categoryEnabled[key];
                  return (
                    <div key={key} className="flex items-center justify-between px-[30px] py-[18px]">
                      <div>
                        <p className="text-[14px] font-semibold text-[#161616]">{label}</p>
                        <p className="text-[12px] text-[#6b7280] mt-0.5">{count} keyword{count !== 1 ? "s" : ""}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCategoryEnabled(prev => ({ ...prev, [key]: !prev[key] }))}
                        className={cn(
                          "relative inline-flex w-[44px] h-[24px] rounded-full transition-colors focus:outline-none shrink-0",
                          enabled ? "bg-[#2a53a0]" : "bg-gray-300"
                        )}
                      >
                        <span className={cn(
                          "absolute top-[3px] w-[18px] h-[18px] bg-white rounded-full shadow transition-transform",
                          enabled ? "translate-x-[23px]" : "translate-x-[3px]"
                        )} />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="h-[64px] border-t border-[#e5e7eb] flex bg-[#f4f4f4]">
                <button
                  onClick={() => setCategoryControlsOpen(false)}
                  className="flex-1 h-full text-[14px] font-medium text-[#2a53a0] hover:bg-[#eaeaea] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setCategoryControlsOpen(false)}
                  className="flex-1 h-full text-[14px] font-medium bg-[#2a53a0] text-white hover:bg-[#1f3e7a] transition-colors"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
