import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, Add, Edit, Download, View, DocumentExport,
  ArrowLeft, Upload, ChevronDown, TrashCan, Checkmark,
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

type ListStatus = "Active" | "Disabled" | "Pending" | "Draft";
type ActionOnHit = "Alert & block" | "Generate alert" | "Flag for review";
type RiskCategory = "High" | "Medium" | "Low";
type EntityStatus = "Active" | "Inactive" | "Expired";
type PageMode = "main" | "create" | "view" | "edit" | "bulk-upload" | "audit-trail" | "verify";

interface CustomList {
  id: string;
  name: string;
  purpose: string;
  status: ListStatus;
  records: number;
  active: number;
  actionOnHit: ActionOnHit;
  ttl: string;
  dateCreated: string;
  lastModified: string;
  listExpiry: string | null;
  makerName?: string;
  makerDate?: string;
  checkerName?: string;
  checkerDate?: string;
  expiringWithin30?: number;
  pendingAction?: "ENABLE" | "DISABLE" | "CREATE";
}

interface EntityRecord {
  id: string;
  fullName: string;
  entityId: string;
  riskCategory: RiskCategory;
  actionOnHit: ActionOnHit;
  status: EntityStatus;
  dateAdded: string;
  expiryDate: string | null;
}

// ── Mock Data ──────────────────────────────────────────────────────────────

const MOCK_LISTS: CustomList[] = [
  { id: "CL-001", name: "Internal fraud — flagged",      purpose: "Fraud Prevention",    status: "Active",   records: 3841,  active: 3712,  actionOnHit: "Alert & block",   ttl: "12 months", dateCreated: "12 Jan 2026", lastModified: "06 Apr 2026", listExpiry: "12 Jan 2027", makerName: "Priya Sharma",    makerDate: "12 Jan 2026", checkerName: "Rajesh Kumar",  checkerDate: "13 Jan 2026", expiringWithin30: 42 },
  { id: "CL-002", name: "Rejected KYC applicants",       purpose: "KYC Compliance",      status: "Active",   records: 12204, active: 11890, actionOnHit: "Alert & block",   ttl: "12 months", dateCreated: "15 Jan 2026", lastModified: "05 Apr 2026", listExpiry: "15 Jan 2027", makerName: "Anita Patel",     makerDate: "15 Jan 2026", checkerName: "Suresh Menon",  checkerDate: "16 Jan 2026", expiringWithin30: 118 },
  { id: "CL-003", name: "PEP — internal identified",     purpose: "PEP Screening",       status: "Active",   records: 892,   active: 871,   actionOnHit: "Generate alert",  ttl: "24 months", dateCreated: "20 Jan 2026", lastModified: "04 Apr 2026", listExpiry: null,           makerName: "Vikram Singh",    makerDate: "20 Jan 2026", checkerName: "Deepa Nair",    checkerDate: "21 Jan 2026", expiringWithin30: 5 },
  { id: "CL-004", name: "Device blocklist",              purpose: "Device Risk",         status: "Active",   records: 2341,  active: 2299,  actionOnHit: "Alert & block",   ttl: "6 months",  dateCreated: "22 Jan 2026", lastModified: "03 Apr 2026", listExpiry: "22 Jul 2026",  makerName: "Ravi Krishnan",   makerDate: "22 Jan 2026", checkerName: "Sunita Rao",    checkerDate: "23 Jan 2026", expiringWithin30: 22 },
  { id: "CL-005", name: "IP — TOR / VPN exit nodes",    purpose: "Network Risk",        status: "Active",   records: 18420, active: 18420, actionOnHit: "Alert & block",   ttl: "3 months",  dateCreated: "25 Jan 2026", lastModified: "02 Apr 2026", listExpiry: "25 Apr 2026",  makerName: "Meena Iyer",      makerDate: "25 Jan 2026", checkerName: "Arjun Desai",   checkerDate: "26 Jan 2026", expiringWithin30: 0 },
  { id: "CL-006", name: "Adverse media flagged",         purpose: "Reputational Risk",   status: "Active",   records: 504,   active: 481,   actionOnHit: "Generate alert",  ttl: "12 months", dateCreated: "01 Feb 2026", lastModified: "01 Apr 2026", listExpiry: "01 Feb 2027",  makerName: "Kavya Reddy",     makerDate: "01 Feb 2026", checkerName: "Mohan Verma",   checkerDate: "02 Feb 2026", expiringWithin30: 9 },
  { id: "CL-007", name: "SIM-farm mobile numbers",      purpose: "Telecom Fraud",       status: "Active",   records: 7812,  active: 7799,  actionOnHit: "Alert & block",   ttl: "6 months",  dateCreated: "05 Feb 2026", lastModified: "31 Mar 2026", listExpiry: "05 Aug 2026",  makerName: "Dinesh Gupta",    makerDate: "05 Feb 2026", checkerName: "Pooja Kapoor",  checkerDate: "06 Feb 2026", expiringWithin30: 13 },
  { id: "CL-008", name: "Investigations — under review", purpose: "Internal Investigation", status: "Active", records: 239, active: 205,   actionOnHit: "Generate alert",  ttl: "No expiry", dateCreated: "10 Feb 2026", lastModified: "29 Mar 2026", listExpiry: null,           makerName: "Sanjay Mishra",   makerDate: "10 Feb 2026", checkerName: "Nisha Jain",    checkerDate: "11 Feb 2026", expiringWithin30: 0 },
  { id: "CL-009", name: "Temp sanctions override",      purpose: "Sanctions Compliance", status: "Disabled", records: 12,   active: 0,    actionOnHit: "Alert & block",   ttl: "12 months", dateCreated: "01 Mar 2026", lastModified: "29 Mar 2026", listExpiry: "01 Mar 2027",  makerName: "Ramesh Pillai",   makerDate: "01 Mar 2026", checkerName: "Latha Bose",    checkerDate: "02 Mar 2026", expiringWithin30: 0 },
  { id: "CL-010", name: "High-value customer watchlist", purpose: "Customer Risk",       status: "Active",   records: 318,   active: 302,  actionOnHit: "Flag for review", ttl: "24 months", dateCreated: "05 Mar 2026", lastModified: "25 Mar 2026", listExpiry: null,           makerName: "Neha Tiwari",     makerDate: "05 Mar 2026", checkerName: "Vivek Agarwal", checkerDate: "06 Mar 2026", expiringWithin30: 6 },
  { id: "CL-011", name: "Shell company registry",       purpose: "AML Typologies",      status: "Active",   records: 1450,  active: 1387,  actionOnHit: "Alert & block",   ttl: "12 months", dateCreated: "10 Mar 2026", lastModified: "20 Mar 2026", listExpiry: "10 Mar 2027",  makerName: "Alok Saxena",     makerDate: "10 Mar 2026", checkerName: "Geeta Choudhary", checkerDate: "11 Mar 2026", expiringWithin30: 19 },
  { id: "CL-012", name: "Crypto mixer addresses",       purpose: "Crypto Risk",         status: "Pending",  records: 9870,  active: 0,     actionOnHit: "Alert & block",   ttl: "6 months",  dateCreated: "15 Mar 2026", lastModified: "15 Mar 2026", listExpiry: "15 Sep 2026",  makerName: "Bharat Sharma",   makerDate: "15 Mar 2026", checkerName: "—",             checkerDate: "—",           expiringWithin30: 0 },
  { id: "CL-013", name: "Sanctioned entity — draft",   purpose: "Sanctions Compliance", status: "Draft",   records: 0,     active: 0,     actionOnHit: "Alert & block",   ttl: "12 months", dateCreated: "05 Apr 2026", lastModified: "05 Apr 2026", listExpiry: null,           makerName: "Rohit Mehta",     makerDate: "05 Apr 2026", checkerName: "—",             checkerDate: "—",           expiringWithin30: 0 },
  { id: "CL-014", name: "Correspondent bank risk",     purpose: "AML Typologies",       status: "Draft",   records: 0,     active: 0,     actionOnHit: "Generate alert",  ttl: "24 months", dateCreated: "07 Apr 2026", lastModified: "07 Apr 2026", listExpiry: null,           makerName: "Priya Sharma",    makerDate: "07 Apr 2026", checkerName: "—",             checkerDate: "—",           expiringWithin30: 0 },
];

const MOCK_ENTITIES: EntityRecord[] = [
  { id: "E-001", fullName: "John Michael Smith",         entityId: "ID-7823901", riskCategory: "High",   actionOnHit: "Alert & block",   status: "Active",   dateAdded: "15 Jan 2026", expiryDate: "15 Jan 2027" },
  { id: "E-002", fullName: "Zhang Wei Corporation",       entityId: "CRN-34521",  riskCategory: "High",   actionOnHit: "Alert & block",   status: "Active",   dateAdded: "16 Jan 2026", expiryDate: null },
  { id: "E-003", fullName: "Abdul Karim Al-Rashidi",      entityId: "PP-A7821K",  riskCategory: "Medium", actionOnHit: "Generate alert",  status: "Active",   dateAdded: "20 Jan 2026", expiryDate: "20 Jul 2026" },
  { id: "E-004", fullName: "Maria Santos-Oliveira",       entityId: "ID-9034721", riskCategory: "Low",    actionOnHit: "Flag for review", status: "Active",   dateAdded: "22 Jan 2026", expiryDate: "22 Jan 2027" },
  { id: "E-005", fullName: "Maxim Volkov Trading Ltd.",   entityId: "CRN-78234",  riskCategory: "High",   actionOnHit: "Alert & block",   status: "Active",   dateAdded: "25 Jan 2026", expiryDate: null },
  { id: "E-006", fullName: "Nguyen Thi Lan",              entityId: "PP-B2341N",  riskCategory: "Medium", actionOnHit: "Generate alert",  status: "Inactive", dateAdded: "01 Feb 2026", expiryDate: "01 Feb 2027" },
  { id: "E-007", fullName: "Khalid bin Ibrahim Al-Saud", entityId: "ID-5629031", riskCategory: "High",   actionOnHit: "Alert & block",   status: "Active",   dateAdded: "05 Feb 2026", expiryDate: "05 Aug 2026" },
  { id: "E-008", fullName: "Dmitri Petrov & Associates",  entityId: "CRN-12987",  riskCategory: "Medium", actionOnHit: "Generate alert",  status: "Active",   dateAdded: "10 Feb 2026", expiryDate: null },
  { id: "E-009", fullName: "Florence Adeyemi Bakare",     entityId: "ID-8823411", riskCategory: "Low",    actionOnHit: "Flag for review", status: "Expired",  dateAdded: "01 Mar 2026", expiryDate: "01 Mar 2026" },
  { id: "E-010", fullName: "Sung-Jin Park Holdings",      entityId: "CRN-56781",  riskCategory: "High",   actionOnHit: "Alert & block",   status: "Active",   dateAdded: "05 Mar 2026", expiryDate: null },
];

// ── Badge / colour maps ────────────────────────────────────────────────────

const ACTION_BADGE: Record<ActionOnHit, string> = {
  "Alert & block":   "bg-red-50 text-red-600 border border-red-200",
  "Generate alert":  "bg-amber-50 text-amber-600 border border-amber-200",
  "Flag for review": "bg-blue-50 text-blue-600 border border-blue-200",
};

const RISK_BADGE: Record<RiskCategory, string> = {
  High:   "bg-red-50 text-red-600 border border-red-200",
  Medium: "bg-amber-50 text-amber-700 border border-amber-200",
  Low:    "bg-green-50 text-green-700 border border-green-200",
};

const ENTITY_STATUS_BADGE: Record<EntityStatus, string> = {
  Active:   "bg-green-100 text-green-700",
  Inactive: "bg-gray-100 text-gray-500",
  Expired:  "bg-red-100 text-red-600",
};

const PURPOSE_OPTIONS = [
  "Fraud Prevention", "KYC Compliance", "PEP Screening", "Device Risk",
  "Network Risk", "Reputational Risk", "Telecom Fraud", "Internal Investigation",
  "Sanctions Compliance", "Customer Risk", "AML Typologies", "Crypto Risk",
];

const ACTION_OPTIONS: ActionOnHit[] = ["Alert & block", "Generate alert", "Flag for review"];

const TTL_OPTIONS = [
  "3 months", "6 months", "12 months (default)", "24 months", "No expiry",
];

// ── Form field helpers ─────────────────────────────────────────────────────

interface CreateFormState {
  listName: string;
  purpose: string;
  actionOnHit: string;
  ttl: string;
  reason: string;
  fuzzyMatch: boolean;
  fuzzyThreshold: number;
  multilingual: boolean;
}

interface EditFormState {
  listName: string;
  purpose: string;
  actionOnHit: string;
  ttl: string;
  reason: string;
  fuzzyMatch: boolean;
  fuzzyThreshold: number;
  multilingual: boolean;
}

const DEFAULT_CREATE_FORM: CreateFormState = {
  listName: "",
  purpose: "",
  actionOnHit: "Generate alert",
  ttl: "12 months (default)",
  reason: "",
  fuzzyMatch: true,
  fuzzyThreshold: 85,
  multilingual: false,
};

// ── Reusable form primitives ───────────────────────────────────────────────

function FormField({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[13px] font-semibold text-[#161616]">
        {label} {required && <span className="text-[#fb2c36]">*</span>}
      </label>
      {children}
    </div>
  );
}

function SelectField({
  value, onChange, options, placeholder,
}: {
  value: string; onChange: (v: string) => void; options: string[]; placeholder?: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full h-[46px] px-3 pr-10 bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] appearance-none focus:outline-none focus:ring-1 focus:ring-[#2a53a0]"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}

function Toggle({ checked, onChange, label, sub }: { checked: boolean; onChange: (v: boolean) => void; label: string; sub?: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div>
        <p className="text-[14px] font-medium text-[#161616]">{label}</p>
        {sub && <p className="text-[12px] text-[#6b7280] mt-0.5">{sub}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex w-[44px] h-[24px] rounded-full transition-colors focus:outline-none",
          checked ? "bg-[#2a53a0]" : "bg-gray-300"
        )}
      >
        <span className={cn(
          "absolute top-[3px] w-[18px] h-[18px] bg-white rounded-full shadow transition-transform",
          checked ? "translate-x-[23px]" : "translate-x-[3px]"
        )} />
      </button>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export function SanctionListManagement({ onSubPageChange }: { onSubPageChange?: (isSubPage: boolean) => void }) {
  // ── page mode ─────────────────────────────────────────────────────────
  const [pageMode, setPageMode]       = useState<PageMode>("main");
  const [selectedList, setSelectedList] = useState<CustomList | null>(null);

  // ── main page state ────────────────────────────────────────────────────
  const [lists, setLists]             = useState<CustomList[]>(MOCK_LISTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize]       = useState(10);
  const [activeTab, setActiveTab]     = useState<"Active" | "Inactive" | "Drafted List" | "Pending for Approval">("Active");
  const [exportOpen, setExportOpen]   = useState(false);

  // ── enable/disable dialog ──────────────────────────────────────────────
  const [toggleDialogList, setToggleDialogList] = useState<CustomList | null>(null);
  const [toggleAction, setToggleAction]         = useState<"DISABLE" | "ENABLE">("DISABLE");
  const [toggleDate, setToggleDate]             = useState("");
  const [toggleReason, setToggleReason]         = useState("");

  // ── create form ────────────────────────────────────────────────────────
  const [createForm, setCreateForm]   = useState<CreateFormState>(DEFAULT_CREATE_FORM);

  // ── edit form ──────────────────────────────────────────────────────────
  const [editForm, setEditForm]       = useState<EditFormState>({ listName: "", purpose: "", actionOnHit: "", ttl: "", reason: "", fuzzyMatch: true, fuzzyThreshold: 85, multilingual: false });

  // ── submit flow ───────────────────────────────────────────────────────
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess]   = useState(false);

  // ── verify page ───────────────────────────────────────────────────────
  const [verifyComment, setVerifyComment]       = useState("");
  const [isVerifying, setIsVerifying]           = useState(false);
  const [showApproveSuccess, setShowApproveSuccess] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  // ── bulk upload form ──────────────────────────────────────────────────
  const [bulkListName, setBulkListName] = useState("");
  const [bulkReason, setBulkReason]     = useState("");
  const [bulkFile, setBulkFile]         = useState<File | null>(null);

  // ── entity records (view page) ─────────────────────────────────────────
  const [entities, setEntities]                   = useState<EntityRecord[]>(MOCK_ENTITIES);
  const [entitySearch, setEntitySearch]           = useState("");
  const [entityCurrentPage, setEntityCurrentPage] = useState(1);
  const [entityPageSize, setEntityPageSize]       = useState(10);
  const [entityStatusFilter, setEntityStatusFilter] = useState("All statuses");
  const [entityRiskFilter, setEntityRiskFilter]   = useState("All risk categories");

  // ── add entity form (view page) ────────────────────────────────────────
  const [showAddEntity, setShowAddEntity]   = useState(false);
  const [aef, setAef] = useState({
    fullName: "", aliases: "", dateOfBirth: "", gender: "", nationality: "",
    passportNo: "", nationalIdNo: "", taxId: "", companyRegNo: "",
    ipAddress: "", deviceId: "", macAddress: "", mobileNumber: "", emailAddress: "",
    nativeScriptName: "", scriptType: "",
    riskCategory: "High" as RiskCategory,
    actionOnHit: "Alert & block" as ActionOnHit,
    expiryDate: "", reasonForAddition: "", sourceReference: "",
    triggerAlert: true,
  });

  const resetAef = () => setAef({
    fullName: "", aliases: "", dateOfBirth: "", gender: "", nationality: "",
    passportNo: "", nationalIdNo: "", taxId: "", companyRegNo: "",
    ipAddress: "", deviceId: "", macAddress: "", mobileNumber: "", emailAddress: "",
    nativeScriptName: "", scriptType: "",
    riskCategory: "High",
    actionOnHit: "Alert & block",
    expiryDate: "", reasonForAddition: "", sourceReference: "",
    triggerAlert: true,
  });

  const handleSubmitEntity = () => {
    const newEntity: EntityRecord = {
      id: `E-${String(Date.now()).slice(-4)}`,
      fullName: aef.fullName || aef.ipAddress || aef.mobileNumber || aef.deviceId || "—",
      entityId: `ID-${String(Date.now()).slice(-7)}`,
      riskCategory: aef.riskCategory,
      actionOnHit: aef.actionOnHit,
      status: "Active",
      dateAdded: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      expiryDate: aef.expiryDate || null,
    };
    setEntities((prev: EntityRecord[]) => [newEntity, ...prev]);
    setShowAddEntity(false);
    resetAef();
  };

  const isEntityFormValid = () =>
    !!(aef.fullName.trim() || aef.ipAddress.trim() || aef.mobileNumber.trim() || aef.deviceId.trim());

  // ── edit entity form (view page) ───────────────────────────────────────
  const [showEditEntity, setShowEditEntity]   = useState(false);
  const [editingEntityId, setEditingEntityId] = useState<string | null>(null);
  const [eef, setEef] = useState({
    fullName: "", aliases: "", dateOfBirth: "", gender: "", nationality: "",
    passportNo: "", nationalIdNo: "", taxId: "", companyRegNo: "",
    ipAddress: "", deviceId: "", macAddress: "", mobileNumber: "", emailAddress: "",
    nativeScriptName: "", scriptType: "",
    riskCategory: "High" as RiskCategory,
    actionOnHit: "Alert & block" as ActionOnHit,
    expiryDate: "", reasonForAddition: "", sourceReference: "",
    triggerAlert: true,
  });

  const openEditEntity = (entity: EntityRecord) => {
    setEditingEntityId(entity.id);
    setEef({
      fullName: entity.fullName, aliases: "", dateOfBirth: "", gender: "", nationality: "",
      passportNo: "", nationalIdNo: "", taxId: "", companyRegNo: "",
      ipAddress: "", deviceId: "", macAddress: "", mobileNumber: "", emailAddress: "",
      nativeScriptName: "", scriptType: "",
      riskCategory: entity.riskCategory,
      actionOnHit: entity.actionOnHit,
      expiryDate: entity.expiryDate || "",
      reasonForAddition: "", sourceReference: "",
      triggerAlert: true,
    });
    setShowAddEntity(false);
    setShowBulkUpload(false);
    setShowViewEntity(false);
    setViewingEntity(null);
    setShowEditEntity(true);
  };

  const isEditFormValid = () =>
    !!(eef.fullName.trim() || eef.ipAddress.trim() || eef.mobileNumber.trim() || eef.deviceId.trim());

  // ── view entity panel (view page) ─────────────────────────────────────
  const [showViewEntity, setShowViewEntity]       = useState(false);
  const [viewingEntity, setViewingEntity]         = useState<EntityRecord | null>(null);

  const openViewEntity = (entity: EntityRecord) => {
    setViewingEntity(entity);
    setShowAddEntity(false);
    setShowEditEntity(false);
    setShowBulkUpload(false);
    setEditingEntityId(null);
    setShowViewEntity(true);
  };

  // ── bulk upload panel (view page) ──────────────────────────────────────
  const [showBulkUpload, setShowBulkUpload]       = useState(false);
  const [viewBulkReason, setViewBulkReason]       = useState("");
  const [viewBulkFile, setViewBulkFile]           = useState<File | null>(null);

  const resetBulkUpload = () => { setViewBulkReason(""); setViewBulkFile(null); };

  const handleBulkSubmit = () => {
    setShowBulkUpload(false);
    resetBulkUpload();
  };

  const handleUpdateEntity = () => {
    setEntities((prev: EntityRecord[]) => prev.map(e =>
      e.id === editingEntityId
        ? {
            ...e,
            fullName:     eef.fullName || eef.ipAddress || eef.mobileNumber || eef.deviceId || e.fullName,
            riskCategory: eef.riskCategory,
            actionOnHit:  eef.actionOnHit,
            expiryDate:   eef.expiryDate || null,
          }
        : e
    ));
    setShowEditEntity(false);
    setEditingEntityId(null);
  };

  // ── navigation helpers ─────────────────────────────────────────────────
  const goToMain = () => { setPageMode("main"); setSelectedList(null); onSubPageChange?.(false); };

  const openCreate = () => {
    setCreateForm(DEFAULT_CREATE_FORM);
    setPageMode("create");
    onSubPageChange?.(true);
  };

  const openView = (list: CustomList) => {
    setSelectedList(list);
    setEntitySearch("");
    setEntityCurrentPage(1);
    setEntityStatusFilter("All statuses");
    setEntityRiskFilter("All risk categories");
    setShowAddEntity(false);
    setShowEditEntity(false);
    setShowBulkUpload(false);
    setShowViewEntity(false);
    setEditingEntityId(null);
    setViewingEntity(null);
    resetAef();
    resetBulkUpload();
    setPageMode("view");
    onSubPageChange?.(true);
  };

  const openEdit = (list: CustomList) => {
    setSelectedList(list);
    setEditForm({
      listName:       list.name,
      purpose:        list.purpose,
      actionOnHit:    list.actionOnHit,
      ttl:            list.ttl,
      reason:         "",
      fuzzyMatch:     true,
      fuzzyThreshold: 85,
      multilingual:   false,
    });
    setPageMode("edit");
    onSubPageChange?.(true);
  };

  // ── enable/disable dialog handlers ────────────────────────────────────
  const handleOpenToggleDialog = (list: CustomList) => {
    setToggleDialogList(list);
    setToggleAction(list.status === "Active" ? "DISABLE" : "ENABLE");
    setToggleDate("");
    setToggleReason("");
  };

  const handleSubmitToggle = () => {
    if (!toggleDialogList) return;
    setLists((prev: CustomList[]) => prev.map(l =>
      l.id === toggleDialogList.id
        ? { ...l, status: "Pending" as ListStatus, pendingAction: toggleAction }
        : l
    ));
    setToggleDialogList(null);
    setToggleDate("");
    setToggleReason("");
  };

  // ── main page derived data ─────────────────────────────────────────────
  const activeCount   = lists.filter(l => l.status === "Active").length;
  const disabledCount = lists.filter(l => l.status === "Disabled").length;
  const pendingCount  = lists.filter(l => l.status === "Pending").length;

  const draftCount = lists.filter(l => l.status === "Draft").length;

  const tabFiltered = lists.filter(l =>
    activeTab === "Drafted List"          ? l.status === "Draft" :
    activeTab === "Active"                ? l.status === "Active" :
    activeTab === "Pending for Approval"  ? l.status === "Pending" :
    l.status === "Disabled"
  );

  const tabSearchFiltered = tabFiltered.filter(l =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.actionOnHit.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { items: sortedLists, requestSort, sortConfig } = useSortableData(tabSearchFiltered);
  const totalItems   = sortedLists.length;
  const currentItems = sortedLists.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // ── entity records derived data ─────────────────────────────────────────
  const filteredEntities = entities.filter((e: EntityRecord) => {
    const matchSearch = e.fullName.toLowerCase().includes(entitySearch.toLowerCase()) ||
                        e.entityId.toLowerCase().includes(entitySearch.toLowerCase());
    const matchStatus = entityStatusFilter === "All statuses" || e.status === entityStatusFilter;
    const matchRisk   = entityRiskFilter === "All risk categories" || e.riskCategory === entityRiskFilter;
    return matchSearch && matchStatus && matchRisk;
  });
  const entityTotal    = filteredEntities.length;
  const entityPageItems = filteredEntities.slice(
    (entityCurrentPage - 1) * entityPageSize,
    entityCurrentPage * entityPageSize,
  );

  // ══════════════════════════════════════════════════════════════════════
  // ── BULK UPLOAD PAGE ──────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════
  if (pageMode === "bulk-upload") {
    return (
      <div className="flex flex-col h-full bg-white dark:bg-gray-900">

        {/* ── Top Nav ───────────────────────────────────────────────────── */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between shrink-0 shadow-sm relative">
          <button onClick={goToMain} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <span className="absolute left-1/2 -translate-x-1/2 text-[15px] font-semibold text-[#161616] dark:text-white">Bulk Upload Entities</span>
          <div className="flex items-center gap-2">
            <button onClick={goToMain} className="text-sm font-normal text-[#2A53A0] dark:text-[#6b93e6] hover:text-[#1e3a70] transition-colors">Sanction / Custom List Management</button>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-normal text-[#161616] dark:text-gray-300">Bulk Upload</span>
          </div>
        </div>

        {/* form body */}
        <div className="flex-1 flex flex-col overflow-hidden px-6 py-5 gap-5">

          {/* Row 1: List Name + Reason */}
          <div className="grid grid-cols-2 gap-5 shrink-0">
            <FormField label="List Name" required>
              <SelectField
                value={bulkListName}
                onChange={v => setBulkListName(v)}
                options={lists.map(l => l.name)}
                placeholder="Select a list"
              />
            </FormField>
            <FormField label="Reason for Addition" required>
              <input
                type="text"
                maxLength={500}
                value={bulkReason}
                onChange={e => setBulkReason(e.target.value)}
                placeholder="Max 500 characters"
                className="w-full h-[46px] px-3 bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]"
              />
            </FormField>
          </div>

          {/* separator */}
          <div className="shrink-0 border-t border-gray-100" />

          {/* Upload File card */}
          <div className="bg-white rounded-[8px] border border-gray-200 shadow-sm overflow-hidden shrink-0">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#f8fafc]">
              <h2 className="text-[14px] font-semibold text-[#161616]">Upload File <span className="text-[#fb2c36]">*</span></h2>
            </div>
            <div className="p-5 space-y-4">
              {/* File input */}
              <label className="flex items-center gap-3 w-full h-[46px] border border-[#d1d5dc] rounded-[8px] overflow-hidden cursor-pointer bg-white">
                <span className="shrink-0 h-full px-4 flex items-center bg-[#f0f0f0] border-r border-[#d1d5dc] text-[13px] font-medium text-[#161616]">
                  Choose file
                </span>
                <span className="text-[13px] text-[#9ca3af] px-3 truncate">
                  {bulkFile ? bulkFile.name : "No file chosen"}
                </span>
                <input
                  type="file"
                  accept=".csv,.xlsx"
                  className="hidden"
                  onChange={e => setBulkFile(e.target.files?.[0] ?? null)}
                />
              </label>

              {/* File info */}
              <div className="space-y-1.5">
                <p className="text-[12px] text-[#6b7280]">
                  Max 50,000 records · Max 25 MB · Formats: CSV (UTF-8), XLSX
                </p>
                <p className="text-[12px] text-[#6b7280]">
                  Required columns:{" "}
                  {["full_name", "action_on_hit", "reason_for_addition"].map(col => (
                    <span key={col} className="inline-block mx-1 px-2 py-0.5 bg-gray-100 rounded text-[11px] font-mono text-[#374151]">{col}</span>
                  ))}
                </p>
              </div>

              {/* Download template */}
              <button className="flex items-center gap-1.5 h-[34px] px-4 border border-gray-300 rounded-[6px] text-[13px] text-[#374151] bg-white hover:bg-gray-50 transition-colors">
                <Download className="w-3.5 h-3.5" /> Download template (XLSX)
              </button>
            </div>
          </div>

        </div>

        {/* sticky footer */}
        <div className="flex-none border-t border-gray-200 bg-white h-[64px] flex items-center justify-between px-6">
          <Button variant="outline" onClick={goToMain} className="h-[46px] px-6 rounded-[8px]">
            Cancel
          </Button>
          <Button
            disabled={!bulkListName || !bulkReason || !bulkFile}
            className="h-[46px] px-6 rounded-[8px] bg-[#2a53a0] hover:bg-[#1e3a70] text-white"
          >
            Validate &amp; Submit →
          </Button>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // ── AUDIT TRAIL PAGE ──────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════
  if (pageMode === "audit-trail") {
    const EVENT_TYPES = ["All event types", "Entity approved", "Create list request", "Entity TTL expiry", "Bulk upload approved", "Maker-checker rejected", "API sync", "Custom list created"];
    const ALL_USERS   = ["All users", "Sandeep Seal", "Ritika Gupta", "Rohan Kapoor", "System process", "Charu Chauhan"];

    const AUDIT_EVENTS = [
      { id: "EVT-009182", dot: "green",  title: 'Entity approved — "Al-Farrukh Trading LLC" added to Internal Fraud — Flagged',       meta: "Checker: Sandeep Seal · REQ-0039 · Object: Entity ENT-204917 · Status: Pending → Active",   ts: "2026-04-06T09:14:22.441Z · IP 10.0.1.42" },
      { id: "EVT-009181", dot: "blue",   title: 'Create list request submitted — "Mobile SIM-Farm Blocklist"',                         meta: "Maker: Rohan Kapoor · REQ-0041 · Object type: Custom List (new) · Approval status: Pending",    ts: "2026-04-06T14:30:08.112Z · IP 10.0.1.55" },
      { id: "EVT-009177", dot: "orange", title: 'Entity TTL expiry triggered — "Venkatesh Iyer" (ACC-334567)',                         meta: "List: Internal Fraud — Flagged · Status: Active → Expired · Email notification dispatched to list owner & Compliance Manager", ts: "2026-04-05T00:00:01.009Z · System process" },
      { id: "EVT-009170", dot: "green",  title: "Bulk upload approved — 1,842 entities added to Rejected KYC",                         meta: "Checker: Ritika Gupta · REQ-0036 · File: rejected_kyc_mar26.xlsx · Valid rows: 1,842",           ts: "2026-04-04T11:22:55.780Z · IP 10.0.1.61" },
      { id: "EVT-009141", dot: "red",    title: 'Maker-checker request rejected — Disable list "Temp Sanctions Override"',             meta: 'Checker: Ritika Gupta · Reason: "List still referenced in active investigation INV-2026-041." · REQ-0031', ts: "2026-03-29T08:04:17.210Z · IP 10.0.1.61" },
      { id: "EVT-009098", dot: "blue",   title: 'API sync — Entity added via REST API — "192.168.44.0/24" to IP Blocklist',            meta: "API client: fraud-mgmt-system · REQ-0028 · Maker: system_api_fraud · Awaiting human checker",    ts: "2026-03-20T07:55:11.330Z · IP 10.0.8.100" },
      { id: "EVT-000001", dot: "blue",   title: 'Custom list created — "Internal Fraud — Flagged"',                                    meta: "Maker: Charu Chauhan · Checker: Sandeep Seal · REQ-0001 · List ID: CLM-001",                    ts: "2026-01-13T10:15:44.003Z · IP 10.0.1.30" },
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

        {/* ── Top Nav ───────────────────────────────────────────────────── */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between shrink-0 shadow-sm relative">
          <button onClick={goToMain} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <span className="absolute left-1/2 -translate-x-1/2 text-[15px] font-semibold text-[#161616] dark:text-white">Audit Trail</span>
          <div className="flex items-center gap-2">
            <button onClick={goToMain} className="text-sm font-normal text-[#2A53A0] dark:text-[#6b93e6] hover:text-[#1e3a70] transition-colors">Sanction / Custom List Management</button>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-normal text-[#161616] dark:text-gray-300">Audit Trail</span>
          </div>
        </div>

        {/* ── Filter bar ────────────────────────────────────────────────── */}
        <div className="flex-none bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-[480px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by event, user, object ID, event ID..."
              className="pl-9 h-[38px] bg-white border-gray-200 focus-visible:ring-[#2A53A0] text-[13px]"
            />
          </div>
          {/* Event type */}
          <div className="relative">
            <select className="h-[38px] pl-3 pr-8 bg-white border border-gray-200 rounded-[8px] text-[13px] text-[#161616] appearance-none focus:outline-none focus:ring-1 focus:ring-[#2a53a0]">
              {EVENT_TYPES.map(o => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
          {/* All users */}
          <div className="relative">
            <select className="h-[38px] pl-3 pr-8 bg-white border border-gray-200 rounded-[8px] text-[13px] text-[#161616] appearance-none focus:outline-none focus:ring-1 focus:ring-[#2a53a0]">
              {ALL_USERS.map(o => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
          {/* Date from */}
          <input type="date" placeholder="dd-mm-yyyy" className="h-[38px] px-3 bg-white border border-gray-200 rounded-[8px] text-[13px] text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
          {/* Date to */}
          <input type="date" placeholder="dd-mm-yyyy" className="h-[38px] px-3 bg-white border border-gray-200 rounded-[8px] text-[13px] text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
        </div>

        {/* ── Events list ───────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto">
          {AUDIT_EVENTS.map((ev, idx) => (
            <div key={ev.id} className={cn("px-6 py-4 flex gap-4 border-b border-gray-100 hover:bg-gray-50 transition-colors", idx === 0 && "border-t border-gray-100")}>
              {/* dot / pill */}
              <div className="mt-1.5 shrink-0 flex items-start justify-center w-5">
                <span className={cn("block shrink-0", DOT_COLOR[ev.dot], DOT_SHAPE[ev.dot])} />
              </div>
              {/* content */}
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-[#161616] leading-snug">{ev.title}</p>
                <p className="text-[12px] text-[#6b7280] mt-0.5">{ev.meta}</p>
                <p className="text-[11px] text-[#9ca3af] mt-1">{ev.ts} · {ev.id}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer: count + pagination ─────────────────────────────────── */}
        <div className="flex-none border-t border-gray-200 bg-white h-[48px] flex items-center justify-between px-6">
          <span className="text-[13px] text-[#6b7280]">Showing 1–7 of 9,182 events</span>
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
  // ── VERIFY LIST PAGE ──────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════
  if (pageMode === "verify" && selectedList) {
    const list = selectedList;

    const handleApprove = () => {
      setIsVerifying(true);
      setTimeout(() => {
        const resolvedStatus: ListStatus = list.pendingAction === "DISABLE" ? "Disabled" : "Active";
        setLists((prev: CustomList[]) => prev.map(l => l.id === list.id ? { ...l, status: resolvedStatus, pendingAction: undefined } : l));
        setIsVerifying(false);
        setShowApproveSuccess(true);
      }, 2000);
    };

    const handleReject = () => {
      setIsVerifying(true);
      setTimeout(() => {
        const revertStatus: ListStatus = list.pendingAction === "DISABLE" ? "Active" : list.pendingAction === "ENABLE" ? "Disabled" : "Draft";
        setLists((prev: CustomList[]) => prev.map(l => l.id === list.id ? { ...l, status: revertStatus, pendingAction: undefined } : l));
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
          title={list.pendingAction === "DISABLE" ? "Disabled" : list.pendingAction === "ENABLE" ? "Enabled" : "Approved"}
          message={
            list.pendingAction === "DISABLE"
              ? "The list has been disabled and moved to the Inactive list."
              : list.pendingAction === "ENABLE"
              ? "The list has been enabled and moved to the Active list."
              : "The list has been approved and moved to the Active list."
          }
          onContinue={() => {
            setShowApproveSuccess(false);
            setActiveTab(list.pendingAction === "DISABLE" ? "Inactive" : "Active");
            goToMain();
          }}
        />
        <RejectionDialog
          isOpen={showRejectDialog}
          title="Rejected"
          message={
            list.pendingAction === "DISABLE"
              ? "The disable request was rejected. The list remains Active."
              : list.pendingAction === "ENABLE"
              ? "The enable request was rejected. The list remains Inactive."
              : "The list has been rejected and moved back to the Drafted List."
          }
          onContinue={() => {
            setShowRejectDialog(false);
            setActiveTab(
              list.pendingAction === "DISABLE" ? "Active" :
              list.pendingAction === "ENABLE"  ? "Inactive" :
              "Drafted List"
            );
            goToMain();
          }}
        />

        {/* ── Top Nav ─────────────────────────────────────────────────── */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between shrink-0 shadow-sm relative">
          <button onClick={goToMain} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <span className="absolute left-1/2 -translate-x-1/2 text-[15px] font-semibold text-[#161616] dark:text-white">Verify List</span>
          <div className="flex items-center gap-2">
            <button onClick={goToMain} className="text-sm font-normal text-[#2A53A0] dark:text-[#6b93e6] hover:text-[#1e3a70] transition-colors">Sanction / Custom List Management</button>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-normal text-[#161616] dark:text-gray-300 truncate max-w-[160px]">{list.name}</span>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-normal text-[#161616] dark:text-gray-300">Verify</span>
          </div>
        </div>

        {/* ── Content ─────────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col overflow-hidden px-6 py-5 gap-5">

          {/* List summary card */}
          <div className="shrink-0 bg-[#f8fafc] rounded-[8px] border border-gray-200 p-5 grid grid-cols-3 gap-x-8 gap-y-4">
            {[
              { label: "List Name",           value: list.name },
              { label: "Purpose",             value: list.purpose },
              { label: "Status",              badge: list.status },
              { label: "Default Action",      action: list.actionOnHit },
              { label: "Default TTL",         value: list.ttl },
              { label: "Total Records",       value: list.records.toLocaleString() },
              { label: "Maker",               value: list.makerName ?? "—" },
              { label: "Submitted",           value: list.makerDate ?? "—" },
              { label: "List ID",             value: list.id },
            ].map(({ label, value, badge, action }) => (
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
                ) : action ? (
                  <span className={cn("inline-block text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap", ACTION_BADGE[action as ActionOnHit])}>{action}</span>
                ) : (
                  <p className="text-[14px] font-medium text-[#161616]">{value ?? "—"}</p>
                )}
              </div>
            ))}
          </div>

          {/* separator */}
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

        {/* sticky footer — Cancel left · Reject + Approve right */}
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
  // ── CREATE LIST PAGE ──────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════
  if (pageMode === "create") {
    const charLeft = 500 - createForm.reason.length;

    const handleSubmitForApproval = () => {
      setIsSubmitting(true);
      setTimeout(() => {
        const newList: CustomList = {
          id: `CL-${String(Date.now()).slice(-3)}`,
          name: createForm.listName,
          purpose: createForm.purpose,
          status: "Pending",
          pendingAction: "CREATE",
          records: 0,
          active: 0,
          actionOnHit: (createForm.actionOnHit as ActionOnHit) || "Generate alert",
          ttl: createForm.ttl || "12 months",
          dateCreated: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
          lastModified: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
          listExpiry: null,
          makerName: "Current User",
          makerDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
          checkerName: "—",
          checkerDate: "—",
          expiringWithin30: 0,
        };
        setLists((prev: CustomList[]) => [...prev, newList]);
        setIsSubmitting(false);
        setShowSuccess(true);
      }, 2000);
    };

    return (
      <div className="flex flex-col h-full bg-white dark:bg-gray-900">
        {isSubmitting && <CreationLoader />}
        <CreationSuccessDialog
          eventName=""
          isOpen={showSuccess}
          title="Submitted for Approval"
          message="Custom list has been successfully submitted for approval."
          onContinue={() => {
            setShowSuccess(false);
            setActiveTab("Pending for Approval");
            goToMain();
          }}
        />

        {/* ── Top Nav ───────────────────────────────────────────────────── */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between shrink-0 shadow-sm relative">
          <button onClick={goToMain} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <span className="absolute left-1/2 -translate-x-1/2 text-[15px] font-semibold text-[#161616] dark:text-white">Create Custom List</span>
          <div className="flex items-center gap-2">
            <button onClick={goToMain} className="text-sm font-normal text-[#2A53A0] dark:text-[#6b93e6] hover:text-[#1e3a70] transition-colors">Sanction / Custom List Management</button>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-normal text-[#161616] dark:text-gray-300">Create Custom List</span>
          </div>
        </div>

        {/* form body — no scroll, fits in flex */}
        <div className="flex-1 flex flex-col overflow-hidden px-6 py-5 gap-5">

          {/* List Details — no card, bare fields */}
          <div className="shrink-0 space-y-4">
            {/* List Name — full row */}
            <FormField label="List Name" required>
              <input
                type="text"
                maxLength={100}
                value={createForm.listName}
                onChange={e => setCreateForm(f => ({ ...f, listName: e.target.value }))}
                placeholder="Enter a descriptive name (max 100 characters)"
                className="w-full h-[46px] px-3 bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]"
              />
              <p className="text-[11px] text-[#9ca3af] mt-1 text-right">{createForm.listName.length} / 100</p>
            </FormField>

            {/* Purpose · Action on Hit · TTL — 3 in 1 row */}
            <div className="grid grid-cols-3 gap-5">
              <FormField label="Purpose" required>
                <SelectField
                  value={createForm.purpose}
                  onChange={v => setCreateForm(f => ({ ...f, purpose: v }))}
                  options={PURPOSE_OPTIONS}
                  placeholder="Select purpose"
                />
              </FormField>
              <FormField label="Default Action on Hit">
                <SelectField
                  value={createForm.actionOnHit}
                  onChange={v => setCreateForm(f => ({ ...f, actionOnHit: v }))}
                  options={ACTION_OPTIONS}
                />
              </FormField>
              <FormField label="Default Entry Expiry (TTL)">
                <SelectField
                  value={createForm.ttl}
                  onChange={v => setCreateForm(f => ({ ...f, ttl: v }))}
                  options={TTL_OPTIONS}
                />
              </FormField>
            </div>
          </div>

          {/* separator */}
          <div className="shrink-0 border-t border-gray-100" />

          {/* Reason for Creation — card */}
          <div className="bg-white rounded-[8px] border border-gray-200 shadow-sm overflow-hidden shrink-0">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#f8fafc]">
              <h2 className="text-[14px] font-semibold text-[#161616]">Reason for Creation</h2>
              <p className="text-[12px] text-[#6b7280] mt-0.5">Mandatory — retained in the audit log.</p>
            </div>
            <div className="p-5">
              <textarea
                rows={3}
                maxLength={500}
                value={createForm.reason}
                onChange={e => setCreateForm(f => ({ ...f, reason: e.target.value }))}
                placeholder="Describe why this list is being created and its intended use..."
                className="w-full p-3 bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0] resize-none"
              />
              <p className={cn("text-[11px] mt-1 text-right", charLeft < 50 ? "text-red-500" : "text-[#9ca3af]")}>
                {charLeft} characters remaining
              </p>
            </div>
          </div>

          {/* Matching Options — card, 2 toggles in 1 row */}
          <div className="bg-white rounded-[8px] border border-gray-200 shadow-sm overflow-hidden shrink-0">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#f8fafc]">
              <h2 className="text-[14px] font-semibold text-[#161616]">Matching Options</h2>
            </div>
            <div className="px-5 py-1 grid grid-cols-2 divide-x divide-gray-100">
              {/* Fuzzy */}
              <div className="pr-6">
                <Toggle
                  checked={createForm.fuzzyMatch}
                  onChange={v => setCreateForm(f => ({ ...f, fuzzyMatch: v }))}
                  label="Fuzzy name matching"
                  sub={`Threshold: ${createForm.fuzzyThreshold}%`}
                />
                {createForm.fuzzyMatch && (
                  <div className="pb-3 pt-1">
                    <div className="flex items-center gap-3">
                      <input
                        type="range" min={60} max={100} step={5}
                        value={createForm.fuzzyThreshold}
                        onChange={e => setCreateForm(f => ({ ...f, fuzzyThreshold: Number(e.target.value) }))}
                        className="flex-1 accent-[#2a53a0]"
                      />
                      <span className="w-10 text-right text-[13px] font-semibold text-[#2a53a0]">{createForm.fuzzyThreshold}%</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-[#9ca3af] mt-0.5">
                      <span>60%</span><span>100%</span>
                    </div>
                  </div>
                )}
              </div>
              {/* Multilingual */}
              <div className="pl-6">
                <Toggle
                  checked={createForm.multilingual}
                  onChange={v => setCreateForm(f => ({ ...f, multilingual: v }))}
                  label="Multilingual / native script matching"
                  sub="Arabic, Chinese, Cyrillic and other scripts"
                />
              </div>
            </div>
          </div>

        </div>

        {/* sticky footer — Cancel left, actions right */}
        <div className="flex-none border-t border-gray-200 bg-white h-[64px] flex items-center justify-between px-6">
          <Button variant="outline" onClick={goToMain} className="h-[46px] px-6 rounded-[8px]">
            Cancel
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-[46px] px-6 rounded-[8px] border-[#2a53a0] text-[#2a53a0]">
              Save as Draft
            </Button>
            <Button
              onClick={handleSubmitForApproval}
              disabled={!createForm.listName || !createForm.purpose || !createForm.reason}
              className="h-[46px] px-6 rounded-[8px] bg-[#2a53a0] hover:bg-[#1e3a70] text-white"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // ── VIEW LIST PAGE ────────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════
  if (pageMode === "view" && selectedList) {
    const list = selectedList;
    return (
      <div className="flex flex-col h-full bg-white dark:bg-gray-900">

        {/* ── Top Nav ───────────────────────────────────────────────────── */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between shrink-0 shadow-sm relative">
          <button onClick={goToMain} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <span className="absolute left-1/2 -translate-x-1/2 text-[15px] font-semibold text-[#161616] dark:text-white truncate max-w-[40%] text-center">{list.name}</span>
          <div className="flex items-center gap-2">
            <button onClick={goToMain} className="text-sm font-normal text-[#2A53A0] dark:text-[#6b93e6] hover:text-[#1e3a70] transition-colors">Sanction / Custom List Management</button>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-normal text-[#161616] dark:text-gray-300 truncate max-w-[180px]">{list.name}</span>
          </div>
        </div>

        {/* ── Action Bar ────────────────────────────────────────────────── */}
        <div className="flex-none bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-2.5 flex items-center justify-between">
          <div>
            <p className="text-[13px] text-[#6b7280]">{list.id} · {list.purpose}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-[36px] px-4 text-[13px] gap-1.5 border-[#2a53a0] text-[#2a53a0]"
              onClick={() => openEdit(list)}
            >
              <Edit className="w-4 h-4" /> Edit List
            </Button>
            <Button
              className="h-[36px] px-4 text-[13px] gap-1.5 bg-[#2a53a0] hover:bg-[#1e3a70] text-white"
              onClick={() => { resetBulkUpload(); setShowBulkUpload(true); setShowAddEntity(false); setShowEditEntity(false); setShowViewEntity(false); setViewingEntity(null); setEditingEntityId(null); }}
            >
              <Upload className="w-4 h-4" /> Bulk Upload
            </Button>
            <Button
              className="h-[36px] px-4 text-[13px] gap-1.5 bg-[#2a53a0] hover:bg-[#1e3a70] text-white"
              onClick={() => { resetAef(); setShowAddEntity(true); setShowEditEntity(false); setShowBulkUpload(false); setShowViewEntity(false); setViewingEntity(null); setEditingEntityId(null); }}
            >
              <Add className="w-4 h-4" /> Add Entity
            </Button>
          </div>
        </div>

        {/* scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {/* List Metadata */}
          <div className="bg-white rounded-[8px] border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#f8fafc]">
              <h2 className="text-[13px] font-semibold text-[#6b7280] uppercase tracking-wide">List Metadata</h2>
            </div>
            <div className="p-5 grid grid-cols-3 gap-x-8 gap-y-4">
              {[
                { label: "List Name",                  value: list.name },
                { label: "Purpose",                    value: list.purpose },
                { label: "Status",                     value: null,              badge: list.status },
                { label: "Maker Name",                 value: list.makerName },
                { label: "Maker Submission Date",      value: list.makerDate },
                { label: "Checker Name",               value: list.checkerName },
                { label: "Checker Approval Date",      value: list.checkerDate },
                { label: "Default Action on Hit",      value: null,              action: list.actionOnHit },
                { label: "Default Entry TTL",          value: list.ttl },
                { label: "Total Records",              value: list.records.toLocaleString() },
                { label: "Total Active Records",       value: list.active.toLocaleString() },
                { label: "Expiring Within 30 Days",    value: list.expiringWithin30?.toString() ?? "0" },
              ].map(({ label, value, badge, action }) => (
                <div key={label} className="space-y-0.5">
                  <p className="text-[11px] text-[#9ca3af] uppercase tracking-wide font-medium">{label}</p>
                  {badge ? (
                    <span className={cn(
                      "inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full",
                      badge === "Active"  ? "bg-green-100 text-green-700" :
                      badge === "Pending" ? "bg-yellow-100 text-yellow-700" :
                      "bg-gray-100 text-gray-500"
                    )}>{badge}</span>
                  ) : action ? (
                    <span className={cn(
                      "inline-block text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap",
                      ACTION_BADGE[action as ActionOnHit]
                    )}>{action}</span>
                  ) : (
                    <p className="text-[14px] font-medium text-[#161616]">{value ?? "—"}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Add Entity Form ──────────────────────────────────────────── */}
          <AnimatePresence>
            {showAddEntity && (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.18 }}
                className="bg-white rounded-[8px] border border-[#2a53a0] shadow-sm overflow-hidden"
              >
                {/* Form header */}
                <div className="bg-[#2a53a0] h-[52px] flex items-center justify-between px-5 shrink-0">
                  <h2 className="text-white text-[16px] font-medium">Add entity</h2>
                  <button
                    onClick={() => setShowAddEntity(false)}
                    className="text-white/80 hover:text-white transition-colors text-[13px] flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 18 18">
                      <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Close
                  </button>
                </div>

                {/* Validation banner */}
                <div className="bg-[#fff8f0] border-b border-[#f59e0b]/30 px-5 py-2.5">
                  <p className="text-[12px] text-[#92400e]">At least one must be populated: Full Name, IP Address, Mobile Number, or Device ID.</p>
                </div>

                {/* Form body */}
                <div className="p-5 space-y-5">

                  {/* IDENTITY */}
                  <div>
                    <p className="text-[11px] font-semibold text-[#2a53a0] uppercase tracking-widest mb-3 border-b border-[#e5e7eb] pb-1.5">Identity</p>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Full Name</label>
                        <input type="text" value={aef.fullName} onChange={e => setAef(p => ({ ...p, fullName: e.target.value }))}
                          placeholder="Full legal name"
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Aliases / Alternate Names</label>
                        <input type="text" value={aef.aliases} onChange={e => setAef(p => ({ ...p, aliases: e.target.value }))}
                          placeholder="Pipe-separated: John|Johnny|J. Smith"
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Date of Birth</label>
                        <input type="date" value={aef.dateOfBirth} onChange={e => setAef(p => ({ ...p, dateOfBirth: e.target.value }))}
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Gender</label>
                        <div className="relative">
                          <select value={aef.gender} onChange={e => setAef(p => ({ ...p, gender: e.target.value }))}
                            className="w-full h-[38px] pl-3 pr-8 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] appearance-none focus:outline-none focus:ring-1 focus:ring-[#2a53a0]">
                            <option value="">Select</option>
                            <option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option>
                          </select>
                          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Nationality (ISO)</label>
                        <input type="text" value={aef.nationality} onChange={e => setAef(p => ({ ...p, nationality: e.target.value }))}
                          placeholder="e.g. IN, NG, AE"
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                    </div>
                  </div>

                  {/* IDENTIFIERS */}
                  <div>
                    <p className="text-[11px] font-semibold text-[#2a53a0] uppercase tracking-widest mb-3 border-b border-[#e5e7eb] pb-1.5">Identifiers</p>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Passport No.</label>
                        <input type="text" value={aef.passportNo} onChange={e => setAef(p => ({ ...p, passportNo: e.target.value }))}
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">National ID No.</label>
                        <input type="text" value={aef.nationalIdNo} onChange={e => setAef(p => ({ ...p, nationalIdNo: e.target.value }))}
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Tax ID (TIN / PAN)</label>
                        <input type="text" value={aef.taxId} onChange={e => setAef(p => ({ ...p, taxId: e.target.value }))}
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Company Registration No.</label>
                      <input type="text" value={aef.companyRegNo} onChange={e => setAef(p => ({ ...p, companyRegNo: e.target.value }))}
                        placeholder="For legal entity entries"
                        className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                    </div>
                  </div>

                  {/* DIGITAL IDENTIFIERS */}
                  <div>
                    <p className="text-[11px] font-semibold text-[#2a53a0] uppercase tracking-widest mb-3 border-b border-[#e5e7eb] pb-1.5">Digital Identifiers</p>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">IP Address</label>
                        <input type="text" value={aef.ipAddress} onChange={e => setAef(p => ({ ...p, ipAddress: e.target.value }))}
                          placeholder="IPv4/v6 or CIDR range"
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Device ID / IMEI</label>
                        <input type="text" value={aef.deviceId} onChange={e => setAef(p => ({ ...p, deviceId: e.target.value }))}
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">MAC Address</label>
                        <input type="text" value={aef.macAddress} onChange={e => setAef(p => ({ ...p, macAddress: e.target.value }))}
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Mobile Number</label>
                        <input type="text" value={aef.mobileNumber} onChange={e => setAef(p => ({ ...p, mobileNumber: e.target.value }))}
                          placeholder="+234XXXXXXXXXXX (E.164 format)"
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Email Address</label>
                        <input type="text" value={aef.emailAddress} onChange={e => setAef(p => ({ ...p, emailAddress: e.target.value }))}
                          placeholder="user@domain.com"
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                    </div>
                  </div>

                  {/* LOCALISATION */}
                  <div>
                    <p className="text-[11px] font-semibold text-[#2a53a0] uppercase tracking-widest mb-3 border-b border-[#e5e7eb] pb-1.5">Localisation (Multilingual)</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Name in Native Script</label>
                        <input type="text" value={aef.nativeScriptName} onChange={e => setAef(p => ({ ...p, nativeScriptName: e.target.value }))}
                          placeholder="e.g. Arabic: محمد · Cyrillic · Chinese"
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Script Type</label>
                        <div className="relative">
                          <select value={aef.scriptType} onChange={e => setAef(p => ({ ...p, scriptType: e.target.value }))}
                            className="w-full h-[38px] pl-3 pr-8 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] appearance-none focus:outline-none focus:ring-1 focus:ring-[#2a53a0]">
                            <option value="">Select</option>
                            <option>Arabic</option><option>Cyrillic</option><option>Chinese (Simplified)</option>
                            <option>Chinese (Traditional)</option><option>Devanagari</option><option>Latin</option><option>Hebrew</option>
                          </select>
                          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RISK & GOVERNANCE */}
                  <div>
                    <p className="text-[11px] font-semibold text-[#2a53a0] uppercase tracking-widest mb-3 border-b border-[#e5e7eb] pb-1.5">Risk &amp; Governance</p>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Risk Category <span className="text-[#fb2c36]">*</span></label>
                        <div className="relative">
                          <select value={aef.riskCategory} onChange={e => setAef(p => ({ ...p, riskCategory: e.target.value as RiskCategory }))}
                            className="w-full h-[38px] pl-3 pr-8 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] appearance-none focus:outline-none focus:ring-1 focus:ring-[#2a53a0]">
                            <option>High</option><option>Medium</option><option>Low</option>
                          </select>
                          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Action on Hit <span className="text-[#fb2c36]">*</span></label>
                        <div className="relative">
                          <select value={aef.actionOnHit} onChange={e => setAef(p => ({ ...p, actionOnHit: e.target.value as ActionOnHit }))}
                            className="w-full h-[38px] pl-3 pr-8 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] appearance-none focus:outline-none focus:ring-1 focus:ring-[#2a53a0]">
                            <option>Alert & block</option><option>Generate alert</option><option>Flag for review</option>
                          </select>
                          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Expiry Date (TTL)</label>
                        <input type="date" value={aef.expiryDate} onChange={e => setAef(p => ({ ...p, expiryDate: e.target.value }))}
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Reason for Addition <span className="text-[#fb2c36]">*</span></label>
                        <textarea rows={3} value={aef.reasonForAddition} onChange={e => setAef(p => ({ ...p, reasonForAddition: e.target.value }))}
                          placeholder="Mandatory — max 500 characters, retained in audit log..."
                          className="w-full p-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0] resize-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Source Reference</label>
                        <input type="text" value={aef.sourceReference} onChange={e => setAef(p => ({ ...p, sourceReference: e.target.value }))}
                          placeholder="Case ID / SAR no. / Investigation ref."
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                    </div>
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <button
                        type="button"
                        onClick={() => setAef(p => ({ ...p, triggerAlert: !p.triggerAlert }))}
                        className={cn(
                          "relative inline-flex w-[40px] h-[22px] rounded-full transition-colors shrink-0 focus:outline-none",
                          aef.triggerAlert ? "bg-[#2a53a0]" : "bg-gray-300"
                        )}
                      >
                        <span className={cn(
                          "absolute top-[3px] w-[16px] h-[16px] bg-white rounded-full shadow transition-transform",
                          aef.triggerAlert ? "translate-x-[19px]" : "translate-x-[3px]"
                        )} />
                      </button>
                      <span className="text-[13px] text-[#374151]">Trigger real-time alert on match</span>
                    </label>
                  </div>

                </div>

                {/* Form footer */}
                <div className="h-[60px] border-t border-[#e5e7eb] flex items-center justify-between px-5 bg-[#f9fafb]">
                  <button
                    onClick={() => setShowAddEntity(false)}
                    className="h-[36px] px-5 rounded-[6px] border border-[#d1d5dc] text-[13px] font-medium text-[#374151] hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitEntity}
                    disabled={!isEntityFormValid()}
                    className={cn(
                      "h-[36px] px-6 rounded-[6px] text-[13px] font-medium transition-colors flex items-center gap-1.5",
                      isEntityFormValid()
                        ? "bg-[#2a53a0] text-white hover:bg-[#1e3a70]"
                        : "bg-[#d1d5dc] text-white cursor-not-allowed"
                    )}
                  >
                    Submit for approval →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Edit Entity Form ──────────────────────────────────────────── */}
          <AnimatePresence>
            {showEditEntity && (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.18 }}
                className="bg-white rounded-[8px] border border-[#2a53a0] shadow-sm overflow-hidden"
              >
                {/* Form header */}
                <div className="bg-[#2a53a0] h-[52px] flex items-center justify-between px-5 shrink-0">
                  <div className="flex items-center gap-3">
                    <h2 className="text-white text-[16px] font-medium">Edit entity</h2>
                    {editingEntityId && (
                      <span className="text-white/60 text-[12px]">· {editingEntityId}</span>
                    )}
                  </div>
                  <button
                    onClick={() => { setShowEditEntity(false); setEditingEntityId(null); }}
                    className="text-white/80 hover:text-white transition-colors text-[13px] flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 18 18">
                      <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Close
                  </button>
                </div>

                {/* Validation banner */}
                <div className="bg-[#fff8f0] border-b border-[#f59e0b]/30 px-5 py-2.5">
                  <p className="text-[12px] text-[#92400e]">At least one must be populated: Full Name, IP Address, Mobile Number, or Device ID.</p>
                </div>

                {/* Form body */}
                <div className="p-5 space-y-5">

                  {/* IDENTITY */}
                  <div>
                    <p className="text-[11px] font-semibold text-[#2a53a0] uppercase tracking-widest mb-3 border-b border-[#e5e7eb] pb-1.5">Identity</p>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Full Name</label>
                        <input type="text" value={eef.fullName} onChange={e => setEef(p => ({ ...p, fullName: e.target.value }))}
                          placeholder="Full legal name"
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Aliases / Alternate Names</label>
                        <input type="text" value={eef.aliases} onChange={e => setEef(p => ({ ...p, aliases: e.target.value }))}
                          placeholder="Pipe-separated: John|Johnny|J. Smith"
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Date of Birth</label>
                        <input type="date" value={eef.dateOfBirth} onChange={e => setEef(p => ({ ...p, dateOfBirth: e.target.value }))}
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Gender</label>
                        <div className="relative">
                          <select value={eef.gender} onChange={e => setEef(p => ({ ...p, gender: e.target.value }))}
                            className="w-full h-[38px] pl-3 pr-8 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] appearance-none focus:outline-none focus:ring-1 focus:ring-[#2a53a0]">
                            <option value="">Select</option>
                            <option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option>
                          </select>
                          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Nationality (ISO)</label>
                        <input type="text" value={eef.nationality} onChange={e => setEef(p => ({ ...p, nationality: e.target.value }))}
                          placeholder="e.g. IN, NG, AE"
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                    </div>
                  </div>

                  {/* IDENTIFIERS */}
                  <div>
                    <p className="text-[11px] font-semibold text-[#2a53a0] uppercase tracking-widest mb-3 border-b border-[#e5e7eb] pb-1.5">Identifiers</p>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Passport No.</label>
                        <input type="text" value={eef.passportNo} onChange={e => setEef(p => ({ ...p, passportNo: e.target.value }))}
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">National ID No.</label>
                        <input type="text" value={eef.nationalIdNo} onChange={e => setEef(p => ({ ...p, nationalIdNo: e.target.value }))}
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Tax ID (TIN / PAN)</label>
                        <input type="text" value={eef.taxId} onChange={e => setEef(p => ({ ...p, taxId: e.target.value }))}
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Company Registration No.</label>
                      <input type="text" value={eef.companyRegNo} onChange={e => setEef(p => ({ ...p, companyRegNo: e.target.value }))}
                        placeholder="For legal entity entries"
                        className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                    </div>
                  </div>

                  {/* DIGITAL IDENTIFIERS */}
                  <div>
                    <p className="text-[11px] font-semibold text-[#2a53a0] uppercase tracking-widest mb-3 border-b border-[#e5e7eb] pb-1.5">Digital Identifiers</p>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">IP Address</label>
                        <input type="text" value={eef.ipAddress} onChange={e => setEef(p => ({ ...p, ipAddress: e.target.value }))}
                          placeholder="IPv4/v6 or CIDR range"
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Device ID / IMEI</label>
                        <input type="text" value={eef.deviceId} onChange={e => setEef(p => ({ ...p, deviceId: e.target.value }))}
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">MAC Address</label>
                        <input type="text" value={eef.macAddress} onChange={e => setEef(p => ({ ...p, macAddress: e.target.value }))}
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Mobile Number</label>
                        <input type="text" value={eef.mobileNumber} onChange={e => setEef(p => ({ ...p, mobileNumber: e.target.value }))}
                          placeholder="+234XXXXXXXXXXX (E.164 format)"
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Email Address</label>
                        <input type="text" value={eef.emailAddress} onChange={e => setEef(p => ({ ...p, emailAddress: e.target.value }))}
                          placeholder="user@domain.com"
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                    </div>
                  </div>

                  {/* LOCALISATION */}
                  <div>
                    <p className="text-[11px] font-semibold text-[#2a53a0] uppercase tracking-widest mb-3 border-b border-[#e5e7eb] pb-1.5">Localisation (Multilingual)</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Name in Native Script</label>
                        <input type="text" value={eef.nativeScriptName} onChange={e => setEef(p => ({ ...p, nativeScriptName: e.target.value }))}
                          placeholder="e.g. Arabic: محمد · Cyrillic · Chinese"
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Script Type</label>
                        <div className="relative">
                          <select value={eef.scriptType} onChange={e => setEef(p => ({ ...p, scriptType: e.target.value }))}
                            className="w-full h-[38px] pl-3 pr-8 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] appearance-none focus:outline-none focus:ring-1 focus:ring-[#2a53a0]">
                            <option value="">Select</option>
                            <option>Arabic</option><option>Cyrillic</option><option>Chinese (Simplified)</option>
                            <option>Chinese (Traditional)</option><option>Devanagari</option><option>Latin</option><option>Hebrew</option>
                          </select>
                          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RISK & GOVERNANCE */}
                  <div>
                    <p className="text-[11px] font-semibold text-[#2a53a0] uppercase tracking-widest mb-3 border-b border-[#e5e7eb] pb-1.5">Risk &amp; Governance</p>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Risk Category <span className="text-[#fb2c36]">*</span></label>
                        <div className="relative">
                          <select value={eef.riskCategory} onChange={e => setEef(p => ({ ...p, riskCategory: e.target.value as RiskCategory }))}
                            className="w-full h-[38px] pl-3 pr-8 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] appearance-none focus:outline-none focus:ring-1 focus:ring-[#2a53a0]">
                            <option>High</option><option>Medium</option><option>Low</option>
                          </select>
                          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Action on Hit <span className="text-[#fb2c36]">*</span></label>
                        <div className="relative">
                          <select value={eef.actionOnHit} onChange={e => setEef(p => ({ ...p, actionOnHit: e.target.value as ActionOnHit }))}
                            className="w-full h-[38px] pl-3 pr-8 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] appearance-none focus:outline-none focus:ring-1 focus:ring-[#2a53a0]">
                            <option>Alert & block</option><option>Generate alert</option><option>Flag for review</option>
                          </select>
                          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Expiry Date (TTL)</label>
                        <input type="date" value={eef.expiryDate} onChange={e => setEef(p => ({ ...p, expiryDate: e.target.value }))}
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Reason for Edit <span className="text-[#fb2c36]">*</span></label>
                        <textarea rows={3} value={eef.reasonForAddition} onChange={e => setEef(p => ({ ...p, reasonForAddition: e.target.value }))}
                          placeholder="Mandatory — max 500 characters, retained in audit log..."
                          className="w-full p-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0] resize-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Source Reference</label>
                        <input type="text" value={eef.sourceReference} onChange={e => setEef(p => ({ ...p, sourceReference: e.target.value }))}
                          placeholder="Case ID / SAR no. / Investigation ref."
                          className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]" />
                      </div>
                    </div>
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <button
                        type="button"
                        onClick={() => setEef(p => ({ ...p, triggerAlert: !p.triggerAlert }))}
                        className={cn(
                          "relative inline-flex w-[40px] h-[22px] rounded-full transition-colors shrink-0 focus:outline-none",
                          eef.triggerAlert ? "bg-[#2a53a0]" : "bg-gray-300"
                        )}
                      >
                        <span className={cn(
                          "absolute top-[3px] w-[16px] h-[16px] bg-white rounded-full shadow transition-transform",
                          eef.triggerAlert ? "translate-x-[19px]" : "translate-x-[3px]"
                        )} />
                      </button>
                      <span className="text-[13px] text-[#374151]">Trigger real-time alert on match</span>
                    </label>
                  </div>

                </div>

                {/* Form footer */}
                <div className="h-[60px] border-t border-[#e5e7eb] flex items-center justify-between px-5 bg-[#f9fafb]">
                  <button
                    onClick={() => { setShowEditEntity(false); setEditingEntityId(null); }}
                    className="h-[36px] px-5 rounded-[6px] border border-[#d1d5dc] text-[13px] font-medium text-[#374151] hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateEntity}
                    disabled={!isEditFormValid()}
                    className={cn(
                      "h-[36px] px-6 rounded-[6px] text-[13px] font-medium transition-colors flex items-center gap-1.5",
                      isEditFormValid()
                        ? "bg-[#2a53a0] text-white hover:bg-[#1e3a70]"
                        : "bg-[#d1d5dc] text-white cursor-not-allowed"
                    )}
                  >
                    Save changes →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Bulk Upload Panel ─────────────────────────────────────────── */}
          <AnimatePresence>
            {showBulkUpload && (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.18 }}
                className="bg-white rounded-[8px] border border-[#2a53a0] shadow-sm overflow-hidden"
              >
                {/* Header */}
                <div className="bg-[#2a53a0] h-[52px] flex items-center justify-between px-5 shrink-0">
                  <h2 className="text-white text-[16px] font-medium">
                    Bulk upload entities — <span className="font-normal">{list.name}</span>
                  </h2>
                  <button
                    onClick={() => { setShowBulkUpload(false); resetBulkUpload(); }}
                    className="text-white/80 hover:text-white transition-colors text-[13px] flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 18 18">
                      <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Close
                  </button>
                </div>

                {/* Form body */}
                <div className="p-5 space-y-4">

                  {/* Reason + File row */}
                  <div className="grid grid-cols-2 gap-5">
                    {/* Reason for Addition */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">
                        Reason for Addition <span className="text-[#fb2c36]">*</span>
                      </label>
                      <input
                        type="text"
                        maxLength={500}
                        value={viewBulkReason}
                        onChange={e => setViewBulkReason(e.target.value)}
                        placeholder="Max 500 characters"
                        className="w-full h-[38px] px-3 bg-white border border-[#d1d5dc] rounded-[6px] text-[13px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]"
                      />
                    </div>

                    {/* Upload File */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">
                        Upload File <span className="text-[#fb2c36]">*</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <label className="h-[38px] px-3 flex items-center gap-1.5 border border-[#d1d5dc] rounded-[6px] bg-white text-[13px] text-[#374151] cursor-pointer hover:bg-gray-50 transition-colors shrink-0">
                          <input
                            type="file"
                            accept=".csv,.xlsx"
                            className="sr-only"
                            onChange={e => setViewBulkFile(e.target.files?.[0] ?? null)}
                          />
                          Choose file
                        </label>
                        <span className="text-[13px] text-[#9ca3af] truncate">
                          {viewBulkFile ? viewBulkFile.name : "No file chosen"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Info box */}
                  <div className="bg-[#f8fafc] border border-[#e5e7eb] rounded-[6px] p-4 space-y-2.5">
                    <p className="text-[12px] text-[#6b7280]">
                      Max 50,000 records · Max 25 MB · Formats: CSV (UTF-8), XLSX
                    </p>
                    <p className="text-[12px] text-[#6b7280]">
                      Required:{" "}
                      <code className="bg-[#e5e7eb] text-[#374151] text-[11px] px-1.5 py-0.5 rounded font-mono">full_name</code>
                      {" · "}
                      <code className="bg-[#e5e7eb] text-[#374151] text-[11px] px-1.5 py-0.5 rounded font-mono">action_on_hit</code>
                      {" · "}
                      <code className="bg-[#e5e7eb] text-[#374151] text-[11px] px-1.5 py-0.5 rounded font-mono">reason_for_addition</code>
                    </p>
                    <button className="h-[32px] px-3 flex items-center gap-1.5 border border-[#d1d5dc] rounded-[6px] bg-white text-[12px] text-[#374151] hover:bg-gray-50 transition-colors">
                      <Download className="w-3.5 h-3.5" /> Download template (XLSX)
                    </button>
                  </div>

                </div>

                {/* Footer */}
                <div className="h-[60px] border-t border-[#e5e7eb] flex items-center justify-between px-5 bg-[#f9fafb]">
                  <button
                    onClick={() => { setShowBulkUpload(false); resetBulkUpload(); }}
                    className="h-[36px] px-5 rounded-[6px] border border-[#d1d5dc] text-[13px] font-medium text-[#374151] hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBulkSubmit}
                    disabled={!viewBulkReason.trim() || !viewBulkFile}
                    className={cn(
                      "h-[36px] px-6 rounded-[6px] text-[13px] font-medium transition-colors flex items-center gap-1.5",
                      viewBulkReason.trim() && viewBulkFile
                        ? "bg-[#2a53a0] text-white hover:bg-[#1e3a70]"
                        : "bg-[#d1d5dc] text-white cursor-not-allowed"
                    )}
                  >
                    Validate &amp; submit →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── View Entity Panel ─────────────────────────────────────────── */}
          <AnimatePresence>
            {showViewEntity && viewingEntity && (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.18 }}
                className="bg-white rounded-[8px] border border-[#2a53a0] shadow-sm overflow-hidden"
              >
                {/* Header */}
                <div className="bg-[#2a53a0] h-[52px] flex items-center justify-between px-5 shrink-0">
                  <div className="flex items-center gap-3">
                    <h2 className="text-white text-[16px] font-medium">View entity</h2>
                    <span className="text-white/60 text-[12px]">· {viewingEntity.id}</span>
                  </div>
                  <button
                    onClick={() => { setShowViewEntity(false); setViewingEntity(null); }}
                    className="text-white/80 hover:text-white transition-colors flex items-center gap-1 text-[13px]"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 18 18">
                      <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Close
                  </button>
                </div>

                {/* Body */}
                <div className="p-5 space-y-5">

                  {/* IDENTITY */}
                  <div>
                    <p className="text-[11px] font-semibold text-[#2a53a0] uppercase tracking-widest mb-3 border-b border-[#e5e7eb] pb-1.5">Identity</p>
                    <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                      {[
                        { label: "Full Name",    value: viewingEntity.fullName },
                        { label: "Entity ID",    value: viewingEntity.entityId },
                        { label: "Date Added",   value: viewingEntity.dateAdded },
                      ].map(({ label, value }) => (
                        <div key={label} className="space-y-0.5">
                          <p className="text-[11px] text-[#9ca3af] uppercase tracking-wide font-medium">{label}</p>
                          <p className="text-[14px] font-medium text-[#161616]">{value || "—"}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RISK & GOVERNANCE */}
                  <div>
                    <p className="text-[11px] font-semibold text-[#2a53a0] uppercase tracking-widest mb-3 border-b border-[#e5e7eb] pb-1.5">Risk &amp; Governance</p>
                    <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                      <div className="space-y-0.5">
                        <p className="text-[11px] text-[#9ca3af] uppercase tracking-wide font-medium">Risk Category</p>
                        <span className={cn("inline-block text-xs font-medium px-2.5 py-0.5 rounded-full", RISK_BADGE[viewingEntity.riskCategory])}>
                          {viewingEntity.riskCategory}
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[11px] text-[#9ca3af] uppercase tracking-wide font-medium">Action on Hit</p>
                        <span className={cn("inline-block text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap", ACTION_BADGE[viewingEntity.actionOnHit])}>
                          {viewingEntity.actionOnHit}
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[11px] text-[#9ca3af] uppercase tracking-wide font-medium">Status</p>
                        <span className={cn("inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full", ENTITY_STATUS_BADGE[viewingEntity.status])}>
                          {viewingEntity.status}
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[11px] text-[#9ca3af] uppercase tracking-wide font-medium">Expiry Date (TTL)</p>
                        <p className="text-[14px] font-medium text-[#161616]">
                          {viewingEntity.expiryDate || <span className="text-[#9ca3af]">No expiry</span>}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Footer */}
                <div className="h-[56px] border-t border-[#e5e7eb] flex items-center justify-between px-5 bg-[#f9fafb]">
                  <button
                    onClick={() => { setShowViewEntity(false); setViewingEntity(null); }}
                    className="h-[36px] px-5 rounded-[6px] border border-[#d1d5dc] text-[13px] font-medium text-[#374151] hover:bg-gray-100 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => openEditEntity(viewingEntity)}
                    className="h-[36px] px-5 rounded-[6px] bg-[#2a53a0] text-white text-[13px] font-medium hover:bg-[#1e3a70] transition-colors flex items-center gap-1.5"
                  >
                    <Edit className="w-3.5 h-3.5" /> Edit entity
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Entity Records */}
          <div className="flex flex-col bg-white rounded-[8px] border border-gray-200 shadow-sm overflow-hidden">
            {/* section header */}
            <div className="px-5 py-3 border-b border-gray-100 bg-[#f8fafc] flex items-center justify-between">
              <h2 className="text-[13px] font-semibold text-[#6b7280] uppercase tracking-wide">Entity Records</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="h-[34px] px-3 text-[12px] gap-1 bg-white">
                  <DocumentExport className="w-3.5 h-3.5" /> CSV
                </Button>
                <Button variant="outline" className="h-[34px] px-3 text-[12px] gap-1 bg-white">
                  <DocumentExport className="w-3.5 h-3.5" /> PDF
                </Button>
              </div>
            </div>

            {/* toolbar */}
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
              <div className="relative flex-1 max-w-[280px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name or ID..."
                  value={entitySearch}
                  onChange={e => { setEntitySearch(e.target.value); setEntityCurrentPage(1); }}
                  className="pl-9 h-[38px] bg-white border-gray-200 focus-visible:ring-[#2A53A0] text-[13px]"
                />
              </div>
              <div className="relative">
                <select
                  value={entityStatusFilter}
                  onChange={e => { setEntityStatusFilter(e.target.value); setEntityCurrentPage(1); }}
                  className="h-[38px] pl-3 pr-8 bg-white border border-gray-200 rounded-[8px] text-[13px] text-[#161616] appearance-none focus:outline-none focus:ring-1 focus:ring-[#2a53a0]"
                >
                  {["All statuses", "Active", "Inactive", "Expired"].map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={entityRiskFilter}
                  onChange={e => { setEntityRiskFilter(e.target.value); setEntityCurrentPage(1); }}
                  className="h-[38px] pl-3 pr-8 bg-white border border-gray-200 rounded-[8px] text-[13px] text-[#161616] appearance-none focus:outline-none focus:ring-1 focus:ring-[#2a53a0]"
                >
                  {["All risk categories", "High", "Medium", "Low"].map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* entity table */}
            <div className="overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-[#F0F0F0] text-[#2A53A0] h-[48px]">
                    <th className="pl-4 px-4 font-medium text-[14px] bg-[#F0F0F0] align-middle whitespace-nowrap text-left">Entity / Full Name + ID</th>
                    <th className="px-4 font-medium text-[14px] bg-[#F0F0F0] align-middle whitespace-nowrap text-left">Risk Category</th>
                    <th className="px-4 font-medium text-[14px] bg-[#F0F0F0] align-middle whitespace-nowrap text-left">Action on Hit</th>
                    <th className="px-4 font-medium text-[14px] bg-[#F0F0F0] align-middle whitespace-nowrap text-left">Status</th>
                    <th className="px-4 font-medium text-[14px] bg-[#F0F0F0] align-middle whitespace-nowrap text-left">Date Added</th>
                    <th className="px-4 font-medium text-[14px] bg-[#F0F0F0] align-middle whitespace-nowrap text-left">Expiry Date</th>
                    <th className="px-4 font-medium text-[14px] bg-[#F0F0F0] align-middle whitespace-nowrap text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {entityPageItems.length > 0 ? entityPageItems.map((entity: EntityRecord) => (
                    <tr key={entity.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors h-[46px]">
                      <td className="pl-4 px-4 align-middle">
                        <p className="text-[13px] font-semibold text-[#161616]">{entity.fullName}</p>
                        <p className="text-[11px] text-[#9ca3af]">{entity.entityId}</p>
                      </td>
                      <td className="px-4 align-middle">
                        <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", RISK_BADGE[entity.riskCategory])}>
                          {entity.riskCategory}
                        </span>
                      </td>
                      <td className="px-4 align-middle">
                        <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap", ACTION_BADGE[entity.actionOnHit])}>
                          {entity.actionOnHit}
                        </span>
                      </td>
                      <td className="px-4 align-middle">
                        <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", ENTITY_STATUS_BADGE[entity.status])}>
                          {entity.status}
                        </span>
                      </td>
                      <td className="px-4 align-middle text-[13px] text-[#374151] tabular-nums">{entity.dateAdded}</td>
                      <td className="px-4 align-middle text-[13px] tabular-nums">
                        {entity.expiryDate
                          ? <span className="text-[#374151]">{entity.expiryDate}</span>
                          : <span className="text-gray-400">No expiry</span>
                        }
                      </td>
                      <td className="px-4 align-middle">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => openEditEntity(entity)}
                            className="flex items-center justify-center w-7 h-7 rounded-sm bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 transition-colors"
                            title="Edit entity"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => openViewEntity(entity)}
                            className="flex items-center justify-center w-7 h-7 rounded-sm bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                            title="View entity"
                          >
                            <View className="w-3.5 h-3.5" />
                          </button>
                          <button
                            className={cn(
                              "flex items-center justify-center w-7 h-7 rounded-sm text-[11px] font-medium transition-colors",
                              entity.status === "Active"
                                ? "bg-red-500/10 hover:bg-red-500/20 text-red-600"
                                : "bg-green-500/10 hover:bg-green-500/20 text-green-700"
                            )}
                            title={entity.status === "Active" ? "Disable" : "Enable"}
                          >
                            {entity.status === "Active" ? "Off" : "On"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={7} className="h-20 text-center text-[13px] text-gray-400">
                        No entities found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* entity pagination */}
            <div className="flex-none border-t border-gray-100">
              <CarbonPaginationFooter
                pageSize={entityPageSize}
                setPageSize={setEntityPageSize}
                currentPage={entityCurrentPage}
                setCurrentPage={setEntityCurrentPage}
                totalItems={entityTotal}
              />
            </div>
          </div>

        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // ── EDIT LIST PAGE ────────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════
  if (pageMode === "edit" && selectedList) {
    const charLeft = 500 - editForm.reason.length;
    return (
      <div className="flex flex-col h-full bg-white dark:bg-gray-900">

        {/* ── Top Nav ───────────────────────────────────────────────────── */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between shrink-0 shadow-sm relative">
          <button onClick={() => openView(selectedList)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <span className="absolute left-1/2 -translate-x-1/2 text-[15px] font-semibold text-[#161616] dark:text-white">Edit Custom List</span>
          <div className="flex items-center gap-2">
            <button onClick={goToMain} className="text-sm font-normal text-[#2A53A0] dark:text-[#6b93e6] hover:text-[#1e3a70] transition-colors">Sanction / Custom List Management</button>
            <span className="text-gray-300">/</span>
            <button onClick={() => openView(selectedList)} className="text-sm font-normal text-[#2A53A0] dark:text-[#6b93e6] hover:text-[#1e3a70] transition-colors truncate max-w-[160px]">{selectedList.name}</button>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-normal text-[#161616] dark:text-gray-300">Edit</span>
          </div>
        </div>

        {/* form body — no scroll, fits in flex */}
        <div className="flex-1 flex flex-col overflow-hidden px-6 py-5 gap-5">

          {/* List Details — no card, bare fields */}
          <div className="shrink-0 space-y-4">
            {/* List Name — full row */}
            <FormField label="List Name" required>
              <input
                type="text"
                maxLength={100}
                value={editForm.listName}
                onChange={e => setEditForm(f => ({ ...f, listName: e.target.value }))}
                placeholder="Enter a descriptive name (max 100 characters)"
                className="w-full h-[46px] px-3 bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]"
              />
              <p className="text-[11px] text-[#9ca3af] mt-1 text-right">{editForm.listName.length} / 100</p>
            </FormField>

            {/* Purpose · Action on Hit · TTL — 3 in 1 row */}
            <div className="grid grid-cols-3 gap-5">
              <FormField label="Purpose" required>
                <SelectField
                  value={editForm.purpose}
                  onChange={v => setEditForm(f => ({ ...f, purpose: v }))}
                  options={PURPOSE_OPTIONS}
                  placeholder="Select purpose"
                />
              </FormField>
              <FormField label="Default Action on Hit">
                <SelectField
                  value={editForm.actionOnHit}
                  onChange={v => setEditForm(f => ({ ...f, actionOnHit: v }))}
                  options={ACTION_OPTIONS}
                />
              </FormField>
              <FormField label="Default Entry Expiry (TTL)">
                <SelectField
                  value={editForm.ttl}
                  onChange={v => setEditForm(f => ({ ...f, ttl: v }))}
                  options={TTL_OPTIONS}
                />
              </FormField>
            </div>
          </div>

          {/* separator */}
          <div className="shrink-0 border-t border-gray-100" />

          {/* Reason for Edit — card */}
          <div className="bg-white rounded-[8px] border border-gray-200 shadow-sm overflow-hidden shrink-0">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#f8fafc]">
              <h2 className="text-[14px] font-semibold text-[#161616]">Reason for Edit</h2>
              <p className="text-[12px] text-[#6b7280] mt-0.5">Mandatory — retained in the audit log.</p>
            </div>
            <div className="p-5">
              <textarea
                rows={3}
                maxLength={500}
                value={editForm.reason}
                onChange={e => setEditForm(f => ({ ...f, reason: e.target.value }))}
                placeholder="Describe the changes being made and the reason..."
                className="w-full p-3 bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0] resize-none"
              />
              <p className={cn("text-[11px] mt-1 text-right", charLeft < 50 ? "text-red-500" : "text-[#9ca3af]")}>
                {charLeft} characters remaining
              </p>
            </div>
          </div>

          {/* Matching Options — card, 2 toggles in 1 row */}
          <div className="bg-white rounded-[8px] border border-gray-200 shadow-sm overflow-hidden shrink-0">
            <div className="px-5 py-3 border-b border-gray-100 bg-[#f8fafc]">
              <h2 className="text-[14px] font-semibold text-[#161616]">Matching Options</h2>
            </div>
            <div className="px-5 py-1 grid grid-cols-2 divide-x divide-gray-100">
              <div className="pr-6">
                <Toggle
                  checked={editForm.fuzzyMatch}
                  onChange={v => setEditForm(f => ({ ...f, fuzzyMatch: v }))}
                  label="Fuzzy name matching"
                  sub={`Threshold: ${editForm.fuzzyThreshold}%`}
                />
                {editForm.fuzzyMatch && (
                  <div className="pb-3 pt-1">
                    <div className="flex items-center gap-3">
                      <input
                        type="range" min={60} max={100} step={5}
                        value={editForm.fuzzyThreshold}
                        onChange={e => setEditForm(f => ({ ...f, fuzzyThreshold: Number(e.target.value) }))}
                        className="flex-1 accent-[#2a53a0]"
                      />
                      <span className="w-10 text-right text-[13px] font-semibold text-[#2a53a0]">{editForm.fuzzyThreshold}%</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-[#9ca3af] mt-0.5">
                      <span>60%</span><span>100%</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="pl-6">
                <Toggle
                  checked={editForm.multilingual}
                  onChange={v => setEditForm(f => ({ ...f, multilingual: v }))}
                  label="Multilingual / native script matching"
                  sub="Arabic, Chinese, Cyrillic and other scripts"
                />
              </div>
            </div>
          </div>

        </div>

        {/* sticky footer — Cancel left, actions right */}
        <div className="flex-none border-t border-gray-200 bg-white h-[64px] flex items-center justify-between px-6">
          <Button variant="outline" onClick={() => openView(selectedList)} className="h-[46px] px-6 rounded-[8px]">
            Cancel
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-[46px] px-6 rounded-[8px] border-[#2a53a0] text-[#2a53a0]">
              Save as Draft
            </Button>
            <Button
              disabled={!editForm.listName || !editForm.purpose || !editForm.reason}
              className="h-[46px] px-6 rounded-[8px] bg-[#2a53a0] hover:bg-[#1e3a70] text-white"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // ── MAIN LIST PAGE ────────────────────────────────────────────────────
  // ══════════════════════════════════════════════════════════════════════
  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* ── Tabs — outside main content ─────────────────────────────────── */}
      <div className="flex-none border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4">
        <div className="flex h-[48px] w-full">
          {(["Active", "Inactive", "Drafted List", "Pending for Approval"] as const).map(tab => (
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
               `Drafted List (${draftCount})`}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden flex flex-col p-4 gap-4">

      {/* ── Search + Action Buttons ────────────────────────────────────── */}
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
          {/* Export dropdown — Active, Inactive, Drafted List tabs only */}
          {activeTab !== "Pending for Approval" && (
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
                    <button
                      onClick={() => setExportOpen(false)}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-[13px] text-[#161616] hover:bg-gray-50 transition-colors"
                    >
                      <DocumentExport className="w-4 h-4 text-[#525252]" /> Export as PDF
                    </button>
                    <button
                      onClick={() => setExportOpen(false)}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-[13px] text-[#161616] hover:bg-gray-50 transition-colors"
                    >
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
            onClick={() => { setBulkListName(""); setBulkReason(""); setBulkFile(null); setPageMode("bulk-upload"); onSubPageChange?.(true); }}
            className="gap-1.5 bg-white dark:bg-gray-900 h-[46px] text-sm"
          >
            <Upload className="w-4 h-4" /> Bulk Upload
          </Button>
          <Button
            onClick={openCreate}
            className="gap-1.5 bg-[#2A53A0] hover:bg-[#2A53A0]/90 text-white h-[46px] text-sm"
          >
            <Add className="w-4 h-4" /> Create List
          </Button>
        </div>
      </div>

      {/* ── Table ───────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden flex flex-col bg-white dark:bg-gray-900 rounded-[8px] border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex-1 overflow-auto min-h-0">
          <table className="w-full caption-bottom text-sm">
            <thead className="sticky top-0 z-10 shadow-sm">
              <tr className="bg-[#F0F0F0] text-[#161616] h-[48px]">
                <th className="pl-4 px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[240px]">
                  <SortableHeader column="name" label="List Name" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[110px]">
                  <SortableHeader column="records" label="Records" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[100px]">
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
                <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[100px]">
                  <SortableHeader column="status" label="Status" sortConfig={sortConfig} onSort={requestSort} />
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
                      <button
                        onClick={() => openView(list)}
                        className="text-sm font-semibold text-[#2A53A0] dark:text-[#6b93e6] hover:underline text-left"
                      >
                        {list.name}
                      </button>
                    </TableCell>

                    {/* Records */}
                    <TableCell className="px-4 align-middle text-left">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 tabular-nums">
                        {list.records.toLocaleString()}
                      </span>
                    </TableCell>

                    {/* Active */}
                    <TableCell className="px-4 align-middle text-left">
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

                    {/* Status */}
                    <TableCell className="px-4 align-middle">
                      <span className={cn(
                        "text-xs font-semibold px-2.5 py-1 rounded-full",
                        list.status === "Active"   ? "bg-green-100 text-green-700" :
                        list.status === "Pending"  ? "bg-yellow-100 text-yellow-700" :
                        list.status === "Draft"    ? "bg-blue-50 text-blue-600" :
                        "bg-gray-100 text-gray-500"
                      )}>
                        {list.status}
                      </span>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="px-4 align-middle">
                      <div className="flex items-center justify-start gap-2">
                        {activeTab !== "Pending for Approval" && (
                          <button
                            onClick={() => openView(list)}
                            className="flex items-center justify-center w-8 h-8 rounded-sm bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 transition-colors"
                            title="View Details"
                          >
                            <View className="w-4 h-4" />
                          </button>
                        )}
                        {activeTab !== "Pending for Approval" && (
                          <button
                            onClick={() => openEdit(list)}
                            className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#2A53A0]/10 hover:bg-[#2A53A0]/20 text-[#2A53A0] transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                        {(activeTab === "Active" || activeTab === "Inactive") && (
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
                        )}
                        {activeTab === "Pending for Approval" && (
                          <button
                            onClick={() => { setSelectedList(list); setVerifyComment(""); setPageMode("verify"); onSubPageChange?.(true); }}
                            className="flex items-center justify-center w-8 h-8 rounded-sm bg-green-500/10 hover:bg-green-500/20 text-green-700 transition-colors"
                            title="Verify"
                          >
                            <Checkmark className="w-4 h-4" />
                          </button>
                        )}
                        {(activeTab === "Drafted List" || activeTab === "Pending for Approval") && (
                          <button
                            onClick={() => setLists(prev => prev.filter(l => l.id !== list.id))}
                            className="flex items-center justify-center w-8 h-8 rounded-sm bg-red-500/10 hover:bg-red-500/20 text-red-600 transition-colors"
                            title="Delete"
                          >
                            <TrashCan className="w-4 h-4" />
                          </button>
                        )}
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

      </div>{/* end main content */}

      {/* ── Enable / Disable Dialog ────────────────────────────────────── */}
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
              {/* Header */}
              <div className="bg-[#2a53a0] h-[64px] flex items-center justify-between px-[30px] shrink-0">
                <h2 className="text-white text-[20px] font-normal">
                  {toggleAction === "DISABLE" ? "Disable" : "Enable"} custom list
                </h2>
                <button
                  onClick={() => setToggleDialogList(null)}
                  className="size-[28px] rounded-[4px] flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <svg className="size-[18px]" fill="none" viewBox="0 0 18 18">
                    <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="p-[20px] space-y-[16px]">
                <p className="text-[13px] text-[#4b5563] leading-relaxed">
                  Controlling screening engine status for{" "}
                  <strong className="text-[#161616]">{toggleDialogList.name}</strong>.{" "}
                  All entity records are retained on disable. Both actions require Maker-Checker approval.
                </p>

                {/* Action Radio */}
                <div className="space-y-[6px]">
                  <label className="text-[13px] font-semibold text-[#161616]">
                    Action <span className="text-[#fb2c36]">*</span>
                  </label>
                  <div className="flex items-center gap-6 mt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="slmToggleAction" value="DISABLE" checked={toggleAction === "DISABLE"}
                        onChange={() => setToggleAction("DISABLE")} className="accent-[#2a53a0]" />
                      <span className="text-[14px] font-medium text-[#161616]">Disable</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="slmToggleAction" value="ENABLE" checked={toggleAction === "ENABLE"}
                        onChange={() => setToggleAction("ENABLE")} className="accent-[#2a53a0]" />
                      <span className="text-[14px] font-medium text-[#161616]">Enable</span>
                    </label>
                  </div>
                </div>

                {/* Date + Username */}
                <div className="grid grid-cols-2 gap-[16px]">
                  <div className="space-y-[6px]">
                    <label className="text-[13px] font-semibold text-[#161616]">
                      {toggleAction === "DISABLE" ? "Disable Date" : "Enable Date"} <span className="text-[#fb2c36]">*</span>
                    </label>
                    <input
                      type="date"
                      value={toggleDate}
                      onChange={e => setToggleDate(e.target.value)}
                      className="w-full h-[46px] px-[12px] bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]"
                    />
                  </div>
                  <div className="space-y-[6px]">
                    <label className="text-[13px] font-semibold text-[#161616]">Username (Auto-Populated)</label>
                    <input
                      type="text"
                      value="Charu Chauhan"
                      readOnly
                      className="w-full h-[46px] px-[12px] bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Reason */}
                <div className="space-y-[6px]">
                  <label className="text-[13px] font-semibold text-[#161616]">
                    Reason <span className="text-[#fb2c36]">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={toggleReason}
                    onChange={e => setToggleReason(e.target.value)}
                    placeholder="Mandatory — retained in audit log..."
                    className="w-full p-[12px] bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] placeholder:text-[#717182] focus:outline-none focus:ring-1 focus:ring-[#2a53a0] resize-none"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="h-[64px] border-t border-[#e5e7eb] flex bg-[#f4f4f4]">
                <button
                  onClick={() => setToggleDialogList(null)}
                  className="flex-1 h-full text-[14px] font-medium text-[#2a53a0] hover:bg-[#eaeaea] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitToggle}
                  disabled={!toggleDate || !toggleReason.trim()}
                  className={cn(
                    "flex-1 h-full text-[14px] font-medium transition-colors",
                    toggleDate && toggleReason.trim()
                      ? "bg-[#2a53a0] text-white hover:bg-[#1f3e7a]"
                      : "bg-[#d1d5dc] text-white cursor-not-allowed"
                  )}
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
