import { useState } from "react";
import {
  Search,
  Add,
  View,
  Edit,
  Upload,
  Settings,
  Filter,
  List,
  CheckboxChecked,
  SettingsAdjust,
  ArrowLeft,
  Save,
  Close,
  TrashCan,
} from "@carbon/icons-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "./ui/utils";

interface SanctionsScreeningConfigurationProps {
  breadcrumbs?: any[];
  onBreadcrumbNavigate?: (path: string) => void;
}

type ProfileType = "Onboarding" | "Monitoring" | "Ad-hoc" | "EDD" | "MAS Regulatory" | "Sanctions";

interface WatchlistProfile {
  id: string;
  name: string;
  type: ProfileType;
  description: string;
  isActive: boolean;
  includedLists: string[];
  matchCriteria: {
    primaryName: { threshold: number; weight: number };
    dob: { threshold: number; weight: number };
    address: { threshold: number; weight: number };
    nationality: { threshold: number; weight: number };
  };
  stats: {
    alertThreshold: number;
    totalScreenings: number;
    alertsGenerated: number;
  };
}

const AVAILABLE_LISTS: string[] = [
  "UN Consolidated List",
  "US OFAC SDN",
  "EU Consolidated Financial Sanctions List",
  "UK HM Treasury Consolidated List",
  "Interpol Red Notices",
  "MAS Singapore High-Risk Screening",
  "FATF High-Risk Jurisdictions",
  "Basel AML Index",
  "World Bank Debarred Entities",
  "DFAT Australia Consolidated List",
  "SECO Switzerland Sanctions List",
  "OFSI UK Financial Sanctions",
  "Canada OSFI Sanctions",
  "Australia DFAT Sanctions",
  "Japan METI Sanctions",
  "South Korea MOFA Sanctions",
  "Brazil Sanctions List",
  "India AML Watch List",
  "Singapore MAS Sanctions",
  "Hong Kong HKMA Watchlist",
  "UAE Central Bank Watchlist",
  "Saudi Arabia SAMA Watchlist",
  "PEP List Global",
  "PEP List Domestic",
  "PEP List State-Owned Enterprises",
  "Adverse Media – Tier 1",
  "Adverse Media – Tier 2",
  "Global Terrorism Database",
  "Interpol Stolen Documents",
  "IBRD/IDA Debarred Entities",
  "Asian Development Bank Sanctions",
  "African Development Bank Sanctions",
  "EBRD Sanctions",
  "UN Security Council Resolution 1267",
  "OFAC CAATSA Designations",
  "EU EBA High-Risk Third Countries",
  "FATF Increased Monitoring List",
  "Wolfsberg AML Principles List",
  "EU List",
];

const INITIAL_PROFILES: WatchlistProfile[] = [
  {
    id: "1",
    name: "Onboarding Screening",
    type: "Onboarding",
    description: "Comprehensive screening for new customer onboarding with UN, OFAC, and EU sanctions lists",
    isActive: true,
    includedLists: ["UN Consolidated List", "US OFAC SDN", "EU List"],
    matchCriteria: {
      primaryName: { threshold: 75, weight: 60 },
      dob: { threshold: 90, weight: 40 },
      address: { threshold: 70, weight: 30 },
      nationality: { threshold: 90, weight: 40 },
    },
    stats: { alertThreshold: 75, totalScreenings: 0, alertsGenerated: 0 },
  },
  {
    id: "2",
    name: "Continuous Monitoring for Transactions",
    type: "Monitoring",
    description: "Ongoing monitoring of customer transactions",
    isActive: true,
    includedLists: ["UN Consolidated List", "EU List", "Interpol Red Notices"],
    matchCriteria: {
      primaryName: { threshold: 90, weight: 9 },
      dob: { threshold: 85, weight: 8 },
      address: { threshold: 75, weight: 5 },
      nationality: { threshold: 92, weight: 8 },
    },
    stats: { alertThreshold: 80, totalScreenings: 18945, alertsGenerated: 423 },
  },
  {
    id: "3",
    name: "MAS Regulatory Compliance Screening",
    type: "MAS Regulatory",
    description: "MAS-mandated enhanced screening for Singapore-regulated entities under AML/CFT Notice requirements",
    isActive: true,
    includedLists: ["MAS Singapore High-Risk Screening", "Singapore MAS Sanctions", "FATF High-Risk Jurisdictions"],
    matchCriteria: {
      primaryName: { threshold: 85, weight: 55 },
      dob: { threshold: 88, weight: 20 },
      address: { threshold: 72, weight: 10 },
      nationality: { threshold: 95, weight: 15 },
    },
    stats: { alertThreshold: 70, totalScreenings: 7241, alertsGenerated: 189 },
  },
  {
    id: "4",
    name: "PEP & Adverse Media Screening",
    type: "Monitoring",
    description: "Politically Exposed Persons and adverse media screening for high-risk customer segments",
    isActive: true,
    includedLists: ["PEP List Global", "PEP List Domestic", "Adverse Media – Tier 1", "Adverse Media – Tier 2"],
    matchCriteria: {
      primaryName: { threshold: 80, weight: 50 },
      dob: { threshold: 85, weight: 20 },
      address: { threshold: 65, weight: 10 },
      nationality: { threshold: 88, weight: 20 },
    },
    stats: { alertThreshold: 75, totalScreenings: 11302, alertsGenerated: 312 },
  },
  {
    id: "5",
    name: "High-Risk Customer Enhanced Due Diligence",
    type: "EDD",
    description: "Enhanced Due Diligence screening for high-risk customers requiring additional identity verification",
    isActive: true,
    includedLists: ["US OFAC SDN", "UK HM Treasury Consolidated List", "OFSI UK Financial Sanctions", "FATF Increased Monitoring List"],
    matchCriteria: {
      primaryName: { threshold: 92, weight: 65 },
      dob: { threshold: 90, weight: 15 },
      address: { threshold: 80, weight: 10 },
      nationality: { threshold: 95, weight: 10 },
    },
    stats: { alertThreshold: 85, totalScreenings: 4807, alertsGenerated: 97 },
  },
  {
    id: "6",
    name: "Cross-Border Payment Sanctions Screening",
    type: "Sanctions",
    description: "Real-time sanctions screening for cross-border wire transfers and international payments",
    isActive: true,
    includedLists: ["US OFAC SDN", "UN Consolidated List", "EU Consolidated Financial Sanctions List", "UK HM Treasury Consolidated List", "OFAC CAATSA Designations"],
    matchCriteria: {
      primaryName: { threshold: 95, weight: 70 },
      dob: { threshold: 80, weight: 10 },
      address: { threshold: 75, weight: 10 },
      nationality: { threshold: 90, weight: 10 },
    },
    stats: { alertThreshold: 80, totalScreenings: 52318, alertsGenerated: 1074 },
  },
  {
    id: "7",
    name: "Legacy Customer Re-screening Profile",
    type: "Ad-hoc",
    description: "Periodic re-screening of legacy customer base against updated sanctions and watchlist data",
    isActive: false,
    includedLists: ["UN Consolidated List", "US OFAC SDN", "World Bank Debarred Entities"],
    matchCriteria: {
      primaryName: { threshold: 78, weight: 55 },
      dob: { threshold: 82, weight: 25 },
      address: { threshold: 68, weight: 10 },
      nationality: { threshold: 85, weight: 10 },
    },
    stats: { alertThreshold: 78, totalScreenings: 3120, alertsGenerated: 44 },
  },
];

const TYPE_BADGE: Record<ProfileType, string> = {
  Onboarding: "bg-green-100 text-green-700 border-green-200",
  Monitoring: "bg-blue-100 text-blue-700 border-blue-200",
  "Ad-hoc": "bg-gray-100 text-gray-600 border-gray-200",
  EDD: "bg-purple-100 text-purple-700 border-purple-200",
  "MAS Regulatory": "bg-red-100 text-red-700 border-red-200",
  Sanctions: "bg-orange-100 text-orange-700 border-orange-200",
};

const CRITERIA_LABELS: Record<string, string> = {
  primaryName: "Primary Name Match",
  dob: "DOB Match",
  address: "Address Match",
  nationality: "Nationality Match",
};

export function SanctionsScreeningConfiguration({
  breadcrumbs,
  onBreadcrumbNavigate,
}: SanctionsScreeningConfigurationProps) {
  const [activeTab, setActiveTab] = useState<"Active" | "Inactive" | "All Watchlists">("Active");
  const [profiles, setProfiles] = useState<WatchlistProfile[]>(INITIAL_PROFILES);
  const [viewMode, setViewMode] = useState<"list" | "view" | "edit" | "create">("list");
  const [selectedProfile, setSelectedProfile] = useState<WatchlistProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editForm, setEditForm] = useState<WatchlistProfile | null>(null);

  const totalCount = profiles.length;
  const activeCount = profiles.filter(p => p.isActive).length;
  const inactiveCount = totalCount - activeCount;

  const tabCounts = { "Active": activeCount, "Inactive": inactiveCount, "All Watchlists": totalCount };

  const filteredProfiles = profiles
    .filter(p => activeTab === "All Watchlists" ? true : activeTab === "Active" ? p.isActive : !p.isActive)
    .filter(p =>
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.includedLists.some(l => l.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const handleToggleActive = (id: string) => {
    setProfiles(prev => prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
  };

  const handleView = (profile: WatchlistProfile) => {
    setSelectedProfile(profile);
    setViewMode("view");
  };

  const handleEdit = (profile: WatchlistProfile) => {
    setEditForm({ ...profile, matchCriteria: { ...profile.matchCriteria } });
    setSelectedProfile(profile);
    setViewMode("edit");
  };

  const handleCreate = () => {
    const newProfile: WatchlistProfile = {
      id: String(Date.now()),
      name: "",
      type: "Ad-hoc",
      description: "",
      isActive: true,
      includedLists: [],
      matchCriteria: {
        primaryName: { threshold: 80, weight: 50 },
        dob: { threshold: 80, weight: 20 },
        address: { threshold: 70, weight: 15 },
        nationality: { threshold: 85, weight: 15 },
      },
      stats: { alertThreshold: 80, totalScreenings: 0, alertsGenerated: 0 },
    };
    setEditForm(newProfile);
    setSelectedProfile(newProfile);
    setViewMode("create");
  };

  const handleSave = () => {
    if (!editForm) return;
    if (viewMode === "create") {
      setProfiles(prev => [...prev, editForm]);
    } else {
      setProfiles(prev => prev.map(p => p.id === editForm.id ? editForm : p));
    }
    setViewMode("list");
    setEditForm(null);
    setSelectedProfile(null);
  };

  const handleBack = () => {
    setViewMode("list");
    setSelectedProfile(null);
    setEditForm(null);
  };

  // ── Detail / Edit / Create view ──────────────────────────────────────────
  if (viewMode !== "list" && (selectedProfile || editForm)) {
    const data = viewMode === "edit" || viewMode === "create" ? editForm! : selectedProfile!;
    const isEditable = viewMode === "edit" || viewMode === "create";

    return (
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {viewMode === "create" ? "Create Watchlist Profile" : viewMode === "edit" ? "Edit Configuration" : data.name}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {viewMode === "create" ? "Configure a new sanctions watchlist profile" : "Sanctions Screening Configuration"}
              </p>
            </div>
          </div>
          {isEditable && (
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleBack} className="h-9 rounded-[8px]">
                <Close className="w-4 h-4 mr-2" /> Cancel
              </Button>
              <Button onClick={handleSave} className="h-9 bg-[#2A53A0] hover:bg-[#1e3a70] text-white rounded-[8px]">
                <Save className="w-4 h-4 mr-2" /> Save Configuration
              </Button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Profile Info */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider mb-4">Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-gray-500 uppercase">Profile Name</Label>
                {isEditable ? (
                  <input
                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/20 focus:border-[#2A53A0]"
                    value={editForm?.name || ""}
                    onChange={e => setEditForm(f => f ? { ...f, name: e.target.value } : f)}
                    placeholder="e.g. Onboarding Screening"
                  />
                ) : (
                  <p className="text-base font-semibold text-gray-900 dark:text-white">{data.name}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-gray-500 uppercase">Profile Type</Label>
                {isEditable ? (
                  <select
                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/20"
                    value={editForm?.type}
                    onChange={e => setEditForm(f => f ? { ...f, type: e.target.value as ProfileType } : f)}
                  >
                    {(["Onboarding", "Monitoring", "Ad-hoc", "EDD", "MAS Regulatory", "Sanctions"] as ProfileType[]).map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                ) : (
                  <Badge variant="secondary" className={cn("font-medium text-sm px-3 py-1", TYPE_BADGE[data.type])}>
                    {data.type}
                  </Badge>
                )}
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label className="text-xs font-semibold text-gray-500 uppercase">Description</Label>
                {isEditable ? (
                  <textarea
                    rows={2}
                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/20 resize-none"
                    value={editForm?.description || ""}
                    onChange={e => setEditForm(f => f ? { ...f, description: e.target.value } : f)}
                    placeholder="Describe the purpose of this watchlist profile..."
                  />
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400">{data.description}</p>
                )}
              </div>
            </div>
          </div>

          {/* Included Lists */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider mb-4">
              Included Lists ({data.includedLists.length})
            </h3>
            {isEditable ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
                {AVAILABLE_LISTS.map(list => (
                  <label key={list} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300 py-1.5 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                    <input
                      type="checkbox"
                      className="accent-[#2A53A0]"
                      checked={editForm?.includedLists.includes(list) || false}
                      onChange={e => {
                        setEditForm(f => {
                          if (!f) return f;
                          return {
                            ...f,
                            includedLists: e.target.checked
                              ? [...f.includedLists, list]
                              : f.includedLists.filter(l => l !== list),
                          };
                        });
                      }}
                    />
                    {list}
                  </label>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {data.includedLists.map(list => (
                  <Badge key={list} variant="outline" className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 px-3 py-1">
                    {list}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Match Criteria */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider mb-4">Match Criteria</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(Object.entries(data.matchCriteria) as [keyof WatchlistProfile["matchCriteria"], { threshold: number; weight: number }][]).map(([key, val]) => (
                <div key={key} className="space-y-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{CRITERIA_LABELS[key]}</p>
                  {isEditable ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-20">Threshold</span>
                        <input
                          type="number"
                          min={0}
                          max={100}
                          className="w-full px-2 py-1 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/20"
                          value={editForm?.matchCriteria[key].threshold ?? val.threshold}
                          onChange={e => setEditForm(f => {
                            if (!f) return f;
                            return { ...f, matchCriteria: { ...f.matchCriteria, [key]: { ...f.matchCriteria[key], threshold: Number(e.target.value) } } };
                          })}
                        />
                        <span className="text-xs text-gray-400">%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-20">Weight</span>
                        <input
                          type="number"
                          min={0}
                          max={100}
                          className="w-full px-2 py-1 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/20"
                          value={editForm?.matchCriteria[key].weight ?? val.weight}
                          onChange={e => setEditForm(f => {
                            if (!f) return f;
                            return { ...f, matchCriteria: { ...f.matchCriteria, [key]: { ...f.matchCriteria[key], weight: Number(e.target.value) } } };
                          })}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{val.threshold}%</span>
                        <span className="text-xs text-gray-500">(Weight: {val.weight})</span>
                      </div>
                      <div className="mt-2 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full", val.threshold >= 90 ? "bg-red-500" : val.threshold >= 80 ? "bg-orange-400" : "bg-[#2A53A0]")}
                          style={{ width: `${val.threshold}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Stats & Threshold */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider mb-4">Alert Configuration</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-gray-500 uppercase">Alert Threshold (%)</Label>
                {isEditable ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">≥</span>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      className="w-24 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/20"
                      value={editForm?.stats.alertThreshold ?? data.stats.alertThreshold}
                      onChange={e => setEditForm(f => f ? { ...f, stats: { ...f.stats, alertThreshold: Number(e.target.value) } } : f)}
                    />
                    <span className="text-sm text-gray-400">%</span>
                  </div>
                ) : (
                  <span className="inline-flex items-center text-sm font-semibold text-[#2A53A0] bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-lg">
                    ≥ {data.stats.alertThreshold}%
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-semibold text-gray-500 uppercase">Total Screenings</Label>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{data.stats.totalScreenings.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-semibold text-gray-500 uppercase">Alerts Generated</Label>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{data.stats.alertsGenerated.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── List view ─────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
      {/* Page Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between shrink-0 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            Watchlist Configurations
            <span className="text-gray-400 cursor-help" title="Manage screening watchlist profiles">ⓘ</span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage screening watchlist profiles with custom list combinations and match thresholds
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9 rounded-[8px] text-sm gap-1.5 border-gray-300">
            <Filter className="w-4 h-4" /> View Lists Library
          </Button>
          <Button variant="outline" className="h-9 rounded-[8px] text-sm gap-1.5 border-gray-300">
            <Upload className="w-4 h-4" /> Upload List
          </Button>
          <Button onClick={handleCreate} className="h-9 bg-[#2A53A0] hover:bg-[#1e3a70] text-white rounded-[8px] text-sm gap-1.5">
            <Add className="w-4 h-4" /> Create Watchlist
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Watchlists</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{totalCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
              <SettingsAdjust className="w-6 h-6 text-[#2A53A0]" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Active Watchlists</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{activeCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
              <CheckboxChecked className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Available Lists</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{AVAILABLE_LISTS.length}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
              <List className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Tabs + Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Underline-style tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 w-full sm:w-auto">
            {(["Active", "Inactive", "All Watchlists"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 pb-3 pt-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                  activeTab === tab
                    ? "border-[#2A53A0] text-[#2A53A0] dark:text-blue-400 dark:border-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                )}
              >
                {tab} <span className="text-xs opacity-70 ml-1">({tabCounts[tab]})</span>
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search profiles..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/20 focus:border-[#2A53A0]"
            />
          </div>
        </div>

        {/* Profile Cards */}
        <div className="space-y-4">
          {filteredProfiles.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center text-gray-500">
              <Settings className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No watchlist profiles found</p>
              <p className="text-sm mt-1">Try adjusting your search or tab filter.</p>
            </div>
          ) : (
            filteredProfiles.map(profile => (
              <div
                key={profile.id}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden hover:border-[#2A53A0]/40 transition-colors"
              >
                {/* Card Header */}
                <div className="px-6 py-5 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">{profile.name}</h3>
                      <Badge
                        variant="secondary"
                        className={cn("font-medium text-xs px-2.5 py-0.5", TYPE_BADGE[profile.type])}
                      >
                        {profile.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{profile.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide shrink-0">
                        Included Lists ({profile.includedLists.length})
                      </span>
                      {profile.includedLists.map(list => (
                        <Badge
                          key={list}
                          variant="outline"
                          className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 text-xs px-2 py-0.5"
                        >
                          {list}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start gap-2 shrink-0">
                    <span className={cn("text-sm font-medium mt-1", profile.isActive ? "text-green-600" : "text-gray-400")}>
                      {profile.isActive ? "Active" : "Inactive"}
                    </span>
                    <Switch
                      checked={profile.isActive}
                      onCheckedChange={() => handleToggleActive(profile.id)}
                    />
                  </div>
                </div>

                {/* Match Criteria Row */}
                <div className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/30 px-6 py-4 grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {(Object.entries(profile.matchCriteria) as [keyof WatchlistProfile["matchCriteria"], { threshold: number; weight: number }][]).map(([key, val]) => (
                    <div key={key}>
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1">{CRITERIA_LABELS[key]}</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">{val.threshold}%</span>
                        <span className="text-xs text-gray-500">(Weight: {val.weight})</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 dark:border-gray-800 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-gray-900">
                  <div className="flex flex-wrap items-center gap-5 text-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-500 text-xs">Alert Threshold:</span>
                      <span className="font-semibold text-[#2A53A0] bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded text-xs">
                        ≥ {profile.stats.alertThreshold}%
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="font-bold text-gray-900 dark:text-white">{profile.stats.totalScreenings.toLocaleString()}</span>
                      <span className="text-gray-500">total screenings</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="font-bold text-gray-900 dark:text-white">{profile.stats.alertsGenerated.toLocaleString()}</span>
                      <span className="text-gray-500">alerts generated</span>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(profile)}
                      className="flex-1 sm:flex-none h-8 text-xs rounded-[6px] border-gray-300"
                    >
                      <View className="w-3.5 h-3.5 mr-1.5" /> View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(profile)}
                      className="flex-1 sm:flex-none h-8 text-xs rounded-[6px] border-gray-300"
                    >
                      <Edit className="w-3.5 h-3.5 mr-1.5" /> Edit Configuration
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
