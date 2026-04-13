import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Dropdown } from "carbon-components-react";
import {
  Search, Add, Edit, Download, Upload, View,
  ArrowLeft, Filter, ChevronRight, CheckmarkFilled,
} from "@carbon/icons-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { CarbonPaginationFooter } from "./carbon-pagination-footer";
import { useSortableData } from "../hooks/use-sortable-data";
import { SortableHeader } from "./ui/sortable-header";
import { cn } from "./ui/utils";
import { CreationLoader } from "./creation-loader";
import { CreationSuccessDialog } from "./creation-success-dialog";

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
  stats: { alertThreshold: number; totalScreenings: number; alertsGenerated: number };
  lastUpdated: string;
  lastUpdatedBy: string;
}

interface SanctionsList {
  id: string;
  name: string;
  description: string;
  entries: number;
  region: string;
  source: string;
  lastUpdated: string;
}

// ── Mock Data ──────────────────────────────────────────────────────────────

const MOCK_PROFILES: WatchlistProfile[] = [
  {
    id: "1", name: "Onboarding Screening", type: "Onboarding",
    description: "Comprehensive screening for new customer onboarding with UN sanctions list",
    isActive: true, includedLists: ["UN Consolidated List"],
    matchCriteria: { primaryName: { threshold: 75, weight: 60 }, dob: { threshold: 90, weight: 40 }, address: { threshold: 70, weight: 30 }, nationality: { threshold: 90, weight: 40 } },
    stats: { alertThreshold: 75, totalScreenings: 0, alertsGenerated: 0 }, lastUpdated: "19/11/2025", lastUpdatedBy: "Charu Chauhan",
  },
  {
    id: "2", name: "Continuous Monitoring for Transactions", type: "Monitoring",
    description: "Ongoing monitoring of customer transactions against global watchlists",
    isActive: true, includedLists: ["US OFAC SDN"],
    matchCriteria: { primaryName: { threshold: 90, weight: 9 }, dob: { threshold: 85, weight: 8 }, address: { threshold: 75, weight: 5 }, nationality: { threshold: 92, weight: 8 } },
    stats: { alertThreshold: 80, totalScreenings: 18945, alertsGenerated: 423 }, lastUpdated: "19/11/2025", lastUpdatedBy: "Arjun Mehta",
  },
  {
    id: "3", name: "MAS Regulatory Compliance Screening", type: "MAS Regulatory",
    description: "MAS-mandated enhanced screening under AML/CFT Notice requirements for Singapore entities",
    isActive: true, includedLists: ["MAS Singapore Sanctions"],
    matchCriteria: { primaryName: { threshold: 85, weight: 55 }, dob: { threshold: 88, weight: 20 }, address: { threshold: 72, weight: 10 }, nationality: { threshold: 95, weight: 15 } },
    stats: { alertThreshold: 70, totalScreenings: 7241, alertsGenerated: 189 }, lastUpdated: "18/11/2025", lastUpdatedBy: "Priya Sharma",
  },
  {
    id: "4", name: "PEP & Adverse Media Screening", type: "Monitoring",
    description: "Politically Exposed Persons and adverse media screening for high-risk customer segments",
    isActive: true, includedLists: ["Consolidated PEP + RCA"],
    matchCriteria: { primaryName: { threshold: 80, weight: 50 }, dob: { threshold: 85, weight: 20 }, address: { threshold: 65, weight: 10 }, nationality: { threshold: 88, weight: 20 } },
    stats: { alertThreshold: 75, totalScreenings: 11302, alertsGenerated: 312 }, lastUpdated: "17/11/2025", lastUpdatedBy: "Charu Chauhan",
  },
  {
    id: "5", name: "High-Risk Customer Enhanced Due Diligence", type: "EDD",
    description: "Enhanced Due Diligence screening for high-risk customers requiring additional identity verification",
    isActive: true, includedLists: ["UK HM Treasury"],
    matchCriteria: { primaryName: { threshold: 92, weight: 65 }, dob: { threshold: 90, weight: 15 }, address: { threshold: 80, weight: 10 }, nationality: { threshold: 95, weight: 10 } },
    stats: { alertThreshold: 85, totalScreenings: 4807, alertsGenerated: 97 }, lastUpdated: "16/11/2025", lastUpdatedBy: "Arjun Mehta",
  },
  {
    id: "6", name: "Cross-Border Payment Sanctions Screening", type: "Sanctions",
    description: "Real-time sanctions screening for cross-border wire transfers and international payments",
    isActive: true, includedLists: ["EU Consolidated List"],
    matchCriteria: { primaryName: { threshold: 95, weight: 70 }, dob: { threshold: 80, weight: 10 }, address: { threshold: 75, weight: 10 }, nationality: { threshold: 90, weight: 10 } },
    stats: { alertThreshold: 80, totalScreenings: 52318, alertsGenerated: 1074 }, lastUpdated: "19/11/2025", lastUpdatedBy: "Priya Sharma",
  },
  {
    id: "7", name: "Legacy Customer Re-screening Profile", type: "Ad-hoc",
    description: "Periodic re-screening of legacy customer base against updated sanctions and watchlist data",
    isActive: false, includedLists: ["World Bank Debarred"],
    matchCriteria: { primaryName: { threshold: 78, weight: 55 }, dob: { threshold: 82, weight: 25 }, address: { threshold: 68, weight: 10 }, nationality: { threshold: 85, weight: 10 } },
    stats: { alertThreshold: 78, totalScreenings: 3120, alertsGenerated: 44 }, lastUpdated: "15/11/2025", lastUpdatedBy: "Charu Chauhan",
  },
];

const SANCTIONS_LISTS: SanctionsList[] = [
  // Global (14)
  { id: "g1",  name: "UN Consolidated List",         description: "United Nations consolidated sanctions list",                                   entries: 8923,  region: "Global",             source: "United Nations",               lastUpdated: "18/11/2025" },
  { id: "g2",  name: "US OFAC SDN",                  description: "U.S. Treasury Specially Designated Nationals list",                            entries: 12547, region: "Global",             source: "U.S. Department of Treasury",   lastUpdated: "19/11/2025" },
  { id: "g3",  name: "Non-SDN List",                 description: "U.S. Treasury Non-SDN sanctioned entities",                                    entries: 3842,  region: "Global",             source: "U.S. Department of Treasury",   lastUpdated: "19/11/2025" },
  { id: "g4",  name: "PEP List",                     description: "Politically Exposed Persons global database",                                   entries: 45678, region: "Global",             source: "Global PEP Database",           lastUpdated: "19/11/2025" },
  { id: "g5",  name: "FATF High Risk Countries",     description: "Financial Action Task Force high-risk jurisdictions (Black & Grey lists)",      entries: 45,    region: "Global",             source: "FATF",                          lastUpdated: "15/11/2025" },
  { id: "g6",  name: "Interpol Red Notices",         description: "International wanted persons and fugitives",                                    entries: 7845,  region: "Global",             source: "INTERPOL",                      lastUpdated: "19/11/2025" },
  { id: "g7",  name: "World Bank Debarred",          description: "World Bank Group debarred entities and individuals",                            entries: 1234,  region: "Global",             source: "World Bank",                    lastUpdated: "17/11/2025" },
  { id: "g8",  name: "WMD Countries & Entities",     description: "Weapons of Mass Destruction proliferation-related entities",                    entries: 892,   region: "Global",             source: "UN Security Council",           lastUpdated: "12/11/2025" },
  { id: "g9",  name: "Adverse Media (Tier 1)",       description: "High-risk adverse media persons and entities — critical coverage",              entries: 24567, region: "Global",             source: "Refinitiv",                     lastUpdated: "19/11/2025" },
  { id: "g10", name: "IBRD/IDA Sanctions",           description: "World Bank IBRD and IDA sanctioned entities",                                   entries: 1089,  region: "Global",             source: "World Bank",                    lastUpdated: "16/11/2025" },
  { id: "g11", name: "Global Terrorism Database",    description: "Designated terrorist organisations and individuals worldwide",                  entries: 3421,  region: "Global",             source: "START / GTD",                   lastUpdated: "14/11/2025" },
  { id: "g12", name: "OFAC CAATSA Designations",     description: "CAATSA sanctions against Russia, Iran, and North Korea",                       entries: 2341,  region: "Global",             source: "US Treasury / OFAC",            lastUpdated: "18/11/2025" },
  { id: "g13", name: "Consolidated PEP + RCA",       description: "PEPs, Relatives & Close Associates combined database",                          entries: 78234, region: "Global",             source: "Dow Jones",                     lastUpdated: "19/11/2025" },
  { id: "g14", name: "UN Security Council 1267",     description: "Al-Qaeda and ISIL/Da'esh sanctions list per UNSCR 1267",                       entries: 678,   region: "Global",             source: "UN Security Council",           lastUpdated: "15/11/2025" },
  // Europe (8)
  { id: "e1",  name: "EU Consolidated List",         description: "European Union financial sanctions consolidated list",                           entries: 14523, region: "Europe",             source: "European Union",                lastUpdated: "19/11/2025" },
  { id: "e2",  name: "UK HM Treasury",               description: "UK financial sanctions consolidated list of targets",                            entries: 9876,  region: "Europe",             source: "HM Treasury",                   lastUpdated: "19/11/2025" },
  { id: "e3",  name: "OFSI UK Sanctions",            description: "UK Office of Financial Sanctions Implementation targets",                        entries: 4321,  region: "Europe",             source: "HM Treasury",                   lastUpdated: "17/11/2025" },
  { id: "e4",  name: "Swiss SECO Sanctions",         description: "Swiss State Secretariat for Economic Affairs sanctions list",                    entries: 2145,  region: "Europe",             source: "SECO Switzerland",              lastUpdated: "18/11/2025" },
  { id: "e5",  name: "EBRD Sanctions",               description: "European Bank for Reconstruction and Development ineligible firms",              entries: 567,   region: "Europe",             source: "EBRD",                          lastUpdated: "13/11/2025" },
  { id: "e6",  name: "France GAFI",                  description: "France AML/CFT designated entities and persons",                                entries: 892,   region: "Europe",             source: "Banque de France",              lastUpdated: "11/11/2025" },
  { id: "e7",  name: "Germany BaFin List",           description: "German federal financial supervisory authority entities list",                   entries: 1234,  region: "Europe",             source: "BaFin Germany",                 lastUpdated: "16/11/2025" },
  { id: "e8",  name: "EU EBA High-Risk Countries",   description: "EU EBA identified high-risk third countries for AML purposes",                  entries: 23,    region: "Europe",             source: "European Banking Authority",    lastUpdated: "10/11/2025" },
  // Asia-Pacific (8)
  { id: "a1",  name: "MAS Singapore Sanctions",      description: "MAS-designated high-risk individuals and entities under AML/CFT",               entries: 3456,  region: "Asia-Pacific",       source: "MAS Singapore",                 lastUpdated: "19/11/2025" },
  { id: "a2",  name: "HKMA Watchlist",               description: "Hong Kong Monetary Authority AML/CFT watchlist",                                entries: 1234,  region: "Asia-Pacific",       source: "HKMA",                          lastUpdated: "18/11/2025" },
  { id: "a3",  name: "DFAT Australia",               description: "Australian Government consolidated sanctions list",                              entries: 5678,  region: "Asia-Pacific",       source: "DFAT Australia",                lastUpdated: "19/11/2025" },
  { id: "a4",  name: "Japan METI Sanctions",         description: "Japan Ministry of Economy Trade & Industry sanctions",                           entries: 2341,  region: "Asia-Pacific",       source: "METI Japan",                    lastUpdated: "17/11/2025" },
  { id: "a5",  name: "South Korea MOFA",             description: "Korean Ministry of Foreign Affairs sanctions list",                              entries: 1678,  region: "Asia-Pacific",       source: "MOFA Korea",                    lastUpdated: "16/11/2025" },
  { id: "a6",  name: "India AML Watchlist",          description: "Reserve Bank of India AML-flagged entities and individuals",                     entries: 4521,  region: "Asia-Pacific",       source: "Reserve Bank of India",         lastUpdated: "15/11/2025" },
  { id: "a7",  name: "APRA Australia",               description: "Australian Prudential Regulation Authority supervised entities",                 entries: 234,   region: "Asia-Pacific",       source: "APRA",                          lastUpdated: "12/11/2025" },
  { id: "a8",  name: "ADB Sanctions",                description: "Asian Development Bank sanctioned and debarred entities",                        entries: 456,   region: "Asia-Pacific",       source: "Asian Development Bank",        lastUpdated: "14/11/2025" },
  // Americas (5)
  { id: "am1", name: "OFAC Comprehensive",           description: "OFAC comprehensive sanctions programs across all jurisdictions",                 entries: 8934,  region: "Americas",           source: "US Treasury / OFAC",            lastUpdated: "19/11/2025" },
  { id: "am2", name: "Canada OSFI",                  description: "Office of the Superintendent of Financial Institutions — Canada",                entries: 3421,  region: "Americas",           source: "OSFI Canada",                   lastUpdated: "18/11/2025" },
  { id: "am3", name: "Brazil COAF",                  description: "Brazilian Financial Activities Control Council watchlist",                        entries: 2134,  region: "Americas",           source: "COAF Brazil",                   lastUpdated: "15/11/2025" },
  { id: "am4", name: "OFAC Cuba Sanctions",          description: "Cuba-specific OFAC sanctions and embargo programs",                              entries: 1234,  region: "Americas",           source: "US Treasury / OFAC",            lastUpdated: "17/11/2025" },
  { id: "am5", name: "Colombia UIAF",                description: "Colombian Financial Intelligence and Analysis Unit watchlist",                    entries: 1876,  region: "Americas",           source: "UIAF Colombia",                 lastUpdated: "13/11/2025" },
  // Middle East & Africa (4)
  { id: "m1",  name: "Saudi Arabia SAMA",            description: "SAMA watchlist for Saudi AML/CFT compliance",                                   entries: 2341,  region: "Middle East & Africa", source: "SAMA Saudi Arabia",             lastUpdated: "18/11/2025" },
  { id: "m2",  name: "UAE Central Bank",             description: "UAE Central Bank anti-money laundering entities list",                           entries: 3456,  region: "Middle East & Africa", source: "UAE Central Bank",              lastUpdated: "19/11/2025" },
  { id: "m3",  name: "FATF Africa Grey List",        description: "African nations under FATF increased monitoring",                                entries: 18,    region: "Middle East & Africa", source: "FATF",                          lastUpdated: "15/11/2025" },
  { id: "m4",  name: "African Dev Bank Sanctions",   description: "African Development Bank debarred and sanctioned entities",                      entries: 567,   region: "Middle East & Africa", source: "African Development Bank",      lastUpdated: "14/11/2025" },
];

const REGIONS = ["All Regions", "Global", "Europe", "Asia-Pacific", "Americas", "Middle East & Africa"];

const TYPE_BADGE: Record<ProfileType, string> = {
  Onboarding:      "bg-green-100 text-green-700 border-green-200",
  Monitoring:      "bg-blue-100 text-blue-700 border-blue-200",
  "Ad-hoc":        "bg-gray-100 text-gray-600 border-gray-200",
  EDD:             "bg-purple-100 text-purple-700 border-purple-200",
  "MAS Regulatory":"bg-red-100 text-red-700 border-red-200",
  Sanctions:       "bg-orange-100 text-orange-700 border-orange-200",
};

const WIZARD_STEPS = ["Basic Information", "List Selection", "Field Mapping", "Match Score Configuration", "Result Configuration"];

const FIELD_MAPPING_TARGETS = [
  "Primary Name", "Date of Birth", "National ID", "Passport Number",
  "Address Line 1", "Address Line 2", "City", "Country", "Nationality",
  "Entity Name", "Registration Number", "Tax ID",
];

const FIELD_MAPPING_SOURCES = [
  "full_name", "first_name", "last_name", "dob", "birth_date",
  "national_id", "passport_no", "id_number", "address1", "address2",
  "city", "country", "nationality", "entity_name", "reg_number", "tax_id",
];

const PURPOSE_OPTIONS = ["Customer Onboarding", "Transaction Monitoring", "Periodic Review", "Enhanced Due Diligence", "Ad-hoc Screening", "Regulatory Compliance"];

// ── Component ──────────────────────────────────────────────────────────────

export function SanctionsScreeningConfiguration({ breadcrumbs, onBreadcrumbNavigate }: SanctionsScreeningConfigurationProps) {
  const [pageMode, setPageMode] = useState<"main" | "lists-library" | "create-wizard" | "view" | "edit">("main");
  const [profiles, setProfiles] = useState<WatchlistProfile[]>(MOCK_PROFILES);
  const [selectedProfile, setSelectedProfile] = useState<WatchlistProfile | null>(null);
  const [editData, setEditData] = useState<WatchlistProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [activeTab, setActiveTab] = useState<"Active" | "Inactive" | "All Watchlists">("Active");

  // Lists Library state
  const [librarySearch, setLibrarySearch] = useState("");
  const [libraryRegion, setLibraryRegion] = useState("All Regions");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Enable/Disable dialog state
  const [toggleDialogProfile, setToggleDialogProfile] = useState<WatchlistProfile | null>(null);
  const [toggleAction, setToggleAction] = useState<"DISABLE" | "ENABLE">("DISABLE");
  const [toggleDate, setToggleDate] = useState("");
  const [toggleReason, setToggleReason] = useState("");

  const handleOpenToggleDialog = (profile: WatchlistProfile) => {
    setToggleDialogProfile(profile);
    setToggleAction(profile.isActive ? "DISABLE" : "ENABLE");
    setToggleDate("");
    setToggleReason("");
  };

  const handleSubmitToggle = () => {
    if (!toggleDialogProfile) return;
    setProfiles(prev => prev.map(p =>
      p.id === toggleDialogProfile.id ? { ...p, isActive: toggleAction === "ENABLE" } : p
    ));
    setToggleDialogProfile(null);
  };

  // Create Wizard state
  const [wizardStep, setWizardStep] = useState(0);
  const [wizardData, setWizardData] = useState({
    name: "", description: "", purpose: "Customer Onboarding",
    selectedLists: [] as string[],
    fieldMappings: [
      { id: "1", sourceField: "full_name", targetField: "Primary Name", required: true, threshold: 80, weight: 50 },
      { id: "2", sourceField: "dob", targetField: "Date of Birth", required: true, threshold: 80, weight: 20 },
      { id: "3", sourceField: "national_id", targetField: "National ID", required: false, threshold: 70, weight: 15 },
      { id: "4", sourceField: "country", targetField: "Country", required: false, threshold: 85, weight: 15 },
    ] as { id: string; sourceField: string; targetField: string; required: boolean; threshold: number; weight: number }[],
    alertThreshold: 80, alertAction: "Flag for Review", notifyEmail: "",
    riskCategory: { low: [0, 40], medium: [41, 70], high: [71, 100] } as { low: [number, number]; medium: [number, number]; high: [number, number] },
    noMatchThreshold: 30,
    maxResultsMode: "topN" as "topN" | "minScore",
    topNMatches: 10,
    minMatchScore: 90,
  });

  // Edit Wizard state
  const [editWizardStep, setEditWizardStep] = useState(0);
  const [editWizardData, setEditWizardData] = useState({
    name: "", description: "", purpose: "Customer Onboarding",
    selectedLists: [] as string[],
    fieldMappings: [
      { id: "1", sourceField: "full_name", targetField: "Primary Name", required: true, threshold: 80, weight: 50 },
      { id: "2", sourceField: "dob", targetField: "Date of Birth", required: true, threshold: 80, weight: 20 },
      { id: "3", sourceField: "national_id", targetField: "National ID", required: false, threshold: 70, weight: 15 },
      { id: "4", sourceField: "country", targetField: "Country", required: false, threshold: 85, weight: 15 },
    ] as { id: string; sourceField: string; targetField: string; required: boolean; threshold: number; weight: number }[],
    alertThreshold: 80, alertAction: "Flag for Review", notifyEmail: "",
    riskCategory: { low: [0, 40], medium: [41, 70], high: [71, 100] } as { low: [number, number]; medium: [number, number]; high: [number, number] },
    noMatchThreshold: 30,
    maxResultsMode: "topN" as "topN" | "minScore",
    topNMatches: 10,
    minMatchScore: 90,
  });

  const activeCount = profiles.filter(p => p.isActive).length;
  const inactiveCount = profiles.length - activeCount;

  const tabFilteredProfiles = profiles.filter(p =>
    activeTab === "All Watchlists" ? true : activeTab === "Active" ? p.isActive : !p.isActive
  );
  const tabSearchFiltered = tabFilteredProfiles.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const { items: sortedProfilesTab, requestSort: requestSortTab, sortConfig: sortConfigTab } = useSortableData(tabSearchFiltered);
  const totalItemsTab = sortedProfilesTab.length;
  const currentItemsTab = sortedProfilesTab.slice((currentPage - 1) * pageSize, currentPage * pageSize);


  // ── Lists Library Page ────────────────────────────────────────────────────
  if (pageMode === "lists-library") {
    const filtered = SANCTIONS_LISTS.filter(l =>
      (libraryRegion === "All Regions" || l.region === libraryRegion) &&
      (librarySearch === "" || l.name.toLowerCase().includes(librarySearch.toLowerCase()) || l.description.toLowerCase().includes(librarySearch.toLowerCase()))
    );
    const groupedByRegion = REGIONS.filter(r => r !== "All Regions").map(region => ({
      region,
      lists: filtered.filter(l => l.region === region),
    })).filter(g => g.lists.length > 0);

    return (
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between shrink-0 shadow-sm relative">
          <button onClick={() => setPageMode("main")} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <span className="absolute left-1/2 -translate-x-1/2 text-[15px] font-semibold text-[#161616] dark:text-white">Lists Library</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setPageMode("main")} className="text-sm font-normal text-[#2A53A0] dark:text-[#6b93e6] hover:text-[#1e3a70] transition-colors">Sanctions Screening Configuration</button>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-normal text-[#161616]">Lists Library</span>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center gap-3 shrink-0">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input value={librarySearch} onChange={e => setLibrarySearch(e.target.value)}
              placeholder="Search lists by name, description..."
              className="pl-9 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus-visible:ring-[#2A53A0]" />
          </div>
          <div className="kw-dropdown-wrap min-w-[180px]">
            <Dropdown
              id="library-region"
              titleText=""
              label=""
              items={REGIONS}
              selectedItem={libraryRegion}
              onChange={({ selectedItem }: any) => setLibraryRegion(selectedItem ?? "All Regions")}
            />
          </div>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-8">
          {groupedByRegion.map(({ region, lists }) => (
            <div key={region}>
              <h2 className="text-sm font-bold text-[#2A53A0] flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#2A53A0]" />
                {region} ({lists.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lists.map(list => (
                  <div key={list.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:border-[#2A53A0]/40 transition-colors">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white">{list.name}</h3>
                      <CheckmarkFilled className="w-5 h-5 text-green-500 shrink-0" />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{list.description}</p>
                    <div className="grid grid-cols-2 gap-3 mb-3 border-t border-gray-100 dark:border-gray-800 pt-3">
                      <div>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Entries</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{list.entries.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Region</p>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{list.region}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">Source: {list.source}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Last Updated: {list.lastUpdated}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between shrink-0">
          <span className="text-sm text-gray-500">Showing {filtered.length} of {SANCTIONS_LISTS.length} sanctions lists</span>
          <Button onClick={() => setPageMode("main")} className="h-9 bg-[#2A53A0] hover:bg-[#1e3a70] text-white rounded-[8px]">Close</Button>
        </div>
      </div>
    );
  }

  // ── Create Watchlist Wizard ───────────────────────────────────────────────
  if (pageMode === "create-wizard") {
    const canNext = wizardStep === 0 ? wizardData.name.trim() !== "" : true;

    const handleWizardSubmit = () => {
      setIsSubmitting(true);
      setTimeout(() => {
        const newProfile: WatchlistProfile = {
          id: String(Date.now()), name: wizardData.name, type: "Onboarding",
          description: wizardData.description, isActive: true,
          includedLists: wizardData.selectedLists,
          matchCriteria: {
            primaryName: { threshold: wizardData.fieldMappings.find(m => m.targetField === "Primary Name")?.threshold ?? 80, weight: wizardData.fieldMappings.find(m => m.targetField === "Primary Name")?.weight ?? 50 },
            dob: { threshold: wizardData.fieldMappings.find(m => m.targetField === "Date of Birth")?.threshold ?? 80, weight: wizardData.fieldMappings.find(m => m.targetField === "Date of Birth")?.weight ?? 20 },
            address: { threshold: wizardData.fieldMappings.find(m => m.targetField === "National ID")?.threshold ?? 70, weight: wizardData.fieldMappings.find(m => m.targetField === "National ID")?.weight ?? 15 },
            nationality: { threshold: wizardData.fieldMappings.find(m => m.targetField === "Country")?.threshold ?? 85, weight: wizardData.fieldMappings.find(m => m.targetField === "Country")?.weight ?? 15 },
          },
          stats: { alertThreshold: wizardData.alertThreshold, totalScreenings: 0, alertsGenerated: 0 },
          lastUpdated: new Date().toLocaleDateString("en-GB"),
        };
        setProfiles(prev => [...prev, newProfile]);
        setWizardStep(0);
        setWizardData({ name: "", description: "", purpose: "Customer Onboarding", selectedLists: [], fieldMappings: [{ id: "1", sourceField: "full_name", targetField: "Primary Name", required: true, threshold: 80, weight: 50 }, { id: "2", sourceField: "dob", targetField: "Date of Birth", required: true, threshold: 80, weight: 20 }, { id: "3", sourceField: "national_id", targetField: "National ID", required: false, threshold: 70, weight: 15 }, { id: "4", sourceField: "country", targetField: "Country", required: false, threshold: 85, weight: 15 }], alertThreshold: 80, alertAction: "Flag for Review", notifyEmail: "", riskCategory: { low: [0, 40], medium: [41, 70], high: [71, 100] }, noMatchThreshold: 30, maxResultsMode: "topN", topNMatches: 10, minMatchScore: 90 });
        setIsSubmitting(false);
        setSuccessMessage("Watchlist Successfully Created");
        setShowSuccess(true);
      }, 2000);
    };

    return (
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
        {isSubmitting && <CreationLoader />}
        <CreationSuccessDialog
          eventName=""
          isOpen={showSuccess}
          title="Success"
          message={successMessage}
          onContinue={() => {
            setShowSuccess(false);
            setPageMode("main");
            setSelectedProfile(null);
            setEditData(null);
          }}
        />
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between shrink-0 shadow-sm relative">
          <button onClick={() => { setWizardStep(0); setPageMode("main"); }} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <span className="absolute left-1/2 -translate-x-1/2 text-[15px] font-semibold text-[#161616] dark:text-white">Create New Watchlist</span>
          <div className="flex items-center gap-2">
            <button onClick={() => { setWizardStep(0); setPageMode("main"); }} className="text-sm font-normal text-[#2A53A0] dark:text-[#6b93e6] hover:text-[#1e3a70] transition-colors">Sanctions Screening Configuration</button>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-normal text-[#161616]">Create New Watchlist</span>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="h-[73px] bg-white border-b border-[#F3F4F6] flex items-center px-12 gap-6 shrink-0">
          {WIZARD_STEPS.map((step, idx) => (
            <div key={step} className="contents">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => idx < wizardStep ? setWizardStep(idx) : undefined}
              >
                <div className={cn(
                  "size-8 rounded-full flex items-center justify-center text-[13px] font-bold border-2 transition-all",
                  wizardStep === idx
                    ? "bg-[#2A53A0] border-[#2A53A0] text-white shadow-sm"
                    : wizardStep > idx
                    ? "bg-[#198038] border-[#198038] text-white"
                    : "bg-white border-[#D1D5DC] text-[#99A1AF]"
                )}>
                  {wizardStep > idx ? <CheckmarkFilled className="size-5" /> : idx + 1}
                </div>
                <span className={cn(
                  "text-[13px] font-semibold whitespace-nowrap",
                  wizardStep === idx ? "text-[#2A53A0]" : "text-[#525252]"
                )}>
                  {step}
                </span>
              </div>
              {idx < WIZARD_STEPS.length - 1 && (
                <div className="flex-1 h-[2px] bg-[#E5E7EB]" />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8 flex justify-center">
          <div className="w-full">
            {/* Step 0 – Basic Information */}
            {wizardStep === 0 && (
              <div className="w-[50%] mx-auto space-y-[16px]">
                <div className="space-y-[6px]">
                  <label className="text-[13px] font-semibold text-[#161616]">
                    Watchlist Name <span className="text-[#fb2c36]">*</span>
                  </label>
                  <input
                    type="text"
                    value={wizardData.name}
                    onChange={e => setWizardData(d => ({ ...d, name: e.target.value }))}
                    placeholder="e.g., Customer Onboarding for Lending"
                    className="w-full h-[46px] px-[12px] bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] placeholder:text-[#717182] focus:outline-none focus:ring-1 focus:ring-[#2a53a0]"
                  />
                </div>
                <div className="space-y-[6px]">
                  <label className="text-[13px] font-semibold text-[#161616]">Description</label>
                  <textarea
                    rows={4}
                    value={wizardData.description}
                    onChange={e => setWizardData(d => ({ ...d, description: e.target.value }))}
                    placeholder="Describe the purpose and usage of this watchlist configuration"
                    className="w-full p-[12px] bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] placeholder:text-[#717182] focus:outline-none focus:ring-1 focus:ring-[#2a53a0] resize-none"
                  />
                </div>
                <div className="space-y-[6px]">
                  <label className="text-[13px] font-semibold text-[#161616]">Purpose</label>
                  <Select value={wizardData.purpose} onValueChange={v => setWizardData(d => ({ ...d, purpose: v }))}>
                    <SelectTrigger className="w-full !h-[46px] px-[12px] bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] focus:ring-1 focus:ring-[#2a53a0]">
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      {PURPOSE_OPTIONS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 1 – List Selection */}
            {wizardStep === 1 && (
              <div className="w-full space-y-4">
                <p className="text-sm text-gray-500">Select the sanctions lists to include in this watchlist profile.</p>
                <div className="relative mb-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Search available lists..." className="pl-9 bg-white dark:bg-gray-900" />
                </div>
                {REGIONS.filter(r => r !== "All Regions").map(region => {
                  const regionLists = SANCTIONS_LISTS.filter(l => l.region === region);
                  return (
                    <div key={region}>
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{region}</h3>
                      <div className="space-y-2">
                        {regionLists.map(list => (
                          <label key={list.id} className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-[#2A53A0]/40 transition-colors">
                            <input
                              type="radio"
                              name="create-list-selection"
                              className="mt-0.5 accent-[#2A53A0]"
                              checked={wizardData.selectedLists.includes(list.name)}
                              onChange={() => {
                                setWizardData(d => ({ ...d, selectedLists: [list.name] }));
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">{list.name}</span>
                                <span className="text-[10px] text-gray-400">{list.entries.toLocaleString()} entries</span>
                              </div>
                              <p className="text-xs text-gray-500 mt-0.5 truncate">{list.description}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Step 2 – Field Mapping */}
            {wizardStep === 2 && (
              <div className="w-full space-y-5">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Map incoming watchlist source fields to the screening profile's target attributes.</p>
                  <p className="text-xs text-gray-400">Required mappings are used in match scoring. Optional mappings enrich the alert context.</p>
                </div>

                {/* Mapping Table */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {/* Table Header */}
                  <div className="grid grid-cols-[1fr_1fr_100px_48px] gap-0 bg-[#F0F0F0] border-b border-gray-200 dark:border-gray-700 px-4 py-2.5">
                    <span className="text-xs font-bold text-[#2A53A0] uppercase tracking-wide">Source Field</span>
                    <span className="text-xs font-bold text-[#2A53A0] uppercase tracking-wide">Target Attribute</span>
                    <span className="text-xs font-bold text-[#2A53A0] uppercase tracking-wide text-center">Required</span>
                    <span />
                  </div>
                  {/* Mapping Rows */}
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {wizardData.fieldMappings.map((mapping) => (
                      <div key={mapping.id} className="grid grid-cols-[1fr_1fr_100px_48px] gap-0 items-center px-4 py-2">
                        <div className="mr-3">
                          <Dropdown
                            id={`create-source-${mapping.id}`}
                            titleText=""
                            label=""
                            items={FIELD_MAPPING_SOURCES}
                            selectedItem={mapping.sourceField}
                            onChange={({ selectedItem }: any) => setWizardData(d => ({ ...d, fieldMappings: d.fieldMappings.map(m => m.id === mapping.id ? { ...m, sourceField: selectedItem } : m) }))}
                            size="sm"
                          />
                        </div>
                        <div className="mr-3">
                          <Dropdown
                            id={`create-target-${mapping.id}`}
                            titleText=""
                            label=""
                            items={FIELD_MAPPING_TARGETS}
                            selectedItem={mapping.targetField}
                            onChange={({ selectedItem }: any) => setWizardData(d => ({ ...d, fieldMappings: d.fieldMappings.map(m => m.id === mapping.id ? { ...m, targetField: selectedItem } : m) }))}
                            size="sm"
                          />
                        </div>
                        <div className="flex justify-center">
                          <input
                            type="checkbox"
                            checked={mapping.required}
                            onChange={e => setWizardData(d => ({ ...d, fieldMappings: d.fieldMappings.map(m => m.id === mapping.id ? { ...m, required: e.target.checked } : m) }))}
                            className="w-4 h-4 accent-[#2A53A0]"
                          />
                        </div>
                        <div className="flex justify-center">
                          <button
                            onClick={() => setWizardData(d => ({ ...d, fieldMappings: d.fieldMappings.filter(m => m.id !== mapping.id) }))}
                            className="w-7 h-7 flex items-center justify-center rounded-sm bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/></svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Add Row */}
                  <div className="px-4 py-3 border-t border-dashed border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setWizardData(d => ({ ...d, fieldMappings: [...d.fieldMappings, { id: String(Date.now()), sourceField: "full_name", targetField: "Primary Name", required: false, threshold: 75, weight: 10 }] }))}
                      className="flex items-center gap-2 text-sm font-medium text-[#2A53A0] hover:text-[#1e3a70] transition-colors"
                    >
                      <Add className="w-4 h-4" /> Add Field Mapping
                    </button>
                  </div>
                </div>

                {/* Info box */}
                <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-xl p-4">
                  <p className="text-xs text-[#2A53A0] font-semibold mb-1">How field mapping works</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">Source fields are the attribute names in the incoming watchlist data. Target attributes are the normalised fields used by the screening engine for comparison and match scoring.</p>
                </div>
              </div>
            )}

            {/* Step 3 – Match Score Configuration */}
            {wizardStep === 3 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-500">Configure match thresholds and attribute weights for each mapped field.</p>
                {wizardData.fieldMappings.length === 0 ? (
                  <div className="text-center py-12 text-sm text-gray-400 bg-white dark:bg-gray-900 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                    No fields mapped. Go back to the Field Mapping step to add fields.
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-[1.4fr_1fr_80px_1.6fr_1.4fr] bg-[#F0F0F0] dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-5 py-2.5 gap-4">
                      <span className="text-xs font-bold text-[#2A53A0] uppercase tracking-wide">Target Field</span>
                      <span className="text-xs font-bold text-[#2A53A0] uppercase tracking-wide">Source Field</span>
                      <span className="text-xs font-bold text-[#2A53A0] uppercase tracking-wide text-center">Required</span>
                      <span className="text-xs font-bold text-[#2A53A0] uppercase tracking-wide">Threshold (%)</span>
                      <span className="text-xs font-bold text-[#2A53A0] uppercase tracking-wide">Weight</span>
                    </div>
                    {/* Table Rows */}
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                      {wizardData.fieldMappings.map(mapping => (
                        <div key={mapping.id} className="grid grid-cols-[1.4fr_1fr_80px_1.6fr_1.4fr] items-center px-5 py-3.5 gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          {/* Target Field */}
                          <span className="text-sm font-semibold text-gray-800 dark:text-white">{mapping.targetField}</span>
                          {/* Source Field */}
                          <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded text-gray-600 dark:text-gray-300 truncate w-fit">{mapping.sourceField}</span>
                          {/* Required */}
                          <div className="flex justify-center">
                            <span className={cn("text-xs font-semibold px-2.5 py-0.5 rounded-full", mapping.required ? "bg-blue-50 text-[#2A53A0]" : "bg-gray-100 text-gray-400")}>
                              {mapping.required ? "Yes" : "No"}
                            </span>
                          </div>
                          {/* Threshold */}
                          <div className="flex items-center gap-2.5">
                            <input
                              type="range" min={50} max={100}
                              value={mapping.threshold}
                              onChange={e => setWizardData(d => ({ ...d, fieldMappings: d.fieldMappings.map(m => m.id === mapping.id ? { ...m, threshold: Number(e.target.value) } : m) }))}
                              className="flex-1 accent-[#2A53A0] h-1.5"
                            />
                            <input
                              type="number" min={50} max={100}
                              value={mapping.threshold}
                              onChange={e => setWizardData(d => ({ ...d, fieldMappings: d.fieldMappings.map(m => m.id === mapping.id ? { ...m, threshold: Number(e.target.value) } : m) }))}
                              className="w-14 h-8 px-2 text-sm font-bold text-center text-[#2A53A0] border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-[#2A53A0]"
                            />
                          </div>
                          {/* Weight */}
                          <div className="flex items-center gap-2.5">
                            <input
                              type="range" min={1} max={100}
                              value={mapping.weight}
                              onChange={e => setWizardData(d => ({ ...d, fieldMappings: d.fieldMappings.map(m => m.id === mapping.id ? { ...m, weight: Number(e.target.value) } : m) }))}
                              className="flex-1 accent-[#2A53A0] h-1.5"
                            />
                            <input
                              type="number" min={1} max={100}
                              value={mapping.weight}
                              onChange={e => setWizardData(d => ({ ...d, fieldMappings: d.fieldMappings.map(m => m.id === mapping.id ? { ...m, weight: Number(e.target.value) } : m) }))}
                              className="w-14 h-8 px-2 text-sm font-bold text-center text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-[#2A53A0]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Footer note */}
                    <div className="px-5 py-3 bg-[#EEF2FB] dark:bg-blue-900/10 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-[#2A53A0]">Threshold: minimum similarity score (50–100%). Weight: relative importance of this field in the overall match score.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4 – Result Configuration */}
            {wizardStep === 4 && (
              <div className="space-y-6">

                {/* Overall Score Threshold */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 dark:text-white">Overall Score Threshold</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Minimum aggregate match score required to generate an alert</p>
                  </div>
                  <div className="bg-[#EEF2FB] dark:bg-blue-900/20 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">Alert Threshold</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number" min={0} max={100}
                          value={wizardData.alertThreshold}
                          onChange={e => setWizardData(d => ({ ...d, alertThreshold: Number(e.target.value) }))}
                          className="w-16 h-9 px-2 text-sm font-semibold text-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/30"
                        />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">%</span>
                      </div>
                    </div>
                    <input
                      type="range" min={0} max={100}
                      value={wizardData.alertThreshold}
                      onChange={e => setWizardData(d => ({ ...d, alertThreshold: Number(e.target.value) }))}
                      className="w-full accent-[#2A53A0]"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>More Alerts (0%)</span>
                      <span>Fewer Alerts (100%)</span>
                    </div>
                  </div>
                  <div className="flex gap-2 text-xs text-gray-500 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <span className="mt-0.5 text-gray-400">ⓘ</span>
                    <div>
                      <span className="font-semibold text-gray-600 dark:text-gray-300">How scoring works: </span>
                      The system calculates a weighted aggregate score based on the match percentages for each field. If the overall score exceeds {wizardData.alertThreshold}%, an alert will be generated.
                    </div>
                  </div>
                </div>

                {/* Maximum Results */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 dark:text-white">Maximum Results</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Limit the number of top matches to display in screening results</p>
                  </div>

                  {/* Top N Matches */}
                  <label className={`flex gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${wizardData.maxResultsMode === "topN" ? "border-[#2A53A0] bg-[#EEF2FB] dark:bg-blue-900/10" : "border-gray-200 dark:border-gray-700"}`}>
                    <input
                      type="radio" name="create-max-results"
                      checked={wizardData.maxResultsMode === "topN"}
                      onChange={() => setWizardData(d => ({ ...d, maxResultsMode: "topN" }))}
                      className="mt-0.5 accent-[#2A53A0]"
                    />
                    <div className="flex-1 space-y-2">
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">Show Top N Matches</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">Number of matches:</span>
                        <input
                          type="number" min={1} max={100}
                          value={wizardData.topNMatches}
                          onChange={e => setWizardData(d => ({ ...d, topNMatches: Number(e.target.value) }))}
                          disabled={wizardData.maxResultsMode !== "topN"}
                          className="w-16 h-9 px-2 text-sm font-semibold text-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/30 disabled:opacity-50"
                        />
                        <span className="text-xs text-gray-500">matches</span>
                      </div>
                      <p className="text-xs text-gray-400">Only the top {wizardData.topNMatches} highest-scoring matches will be displayed for each screening request.</p>
                    </div>
                  </label>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">OR</span>
                    <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                  </div>

                  {/* Minimum Match Score */}
                  <label className={`flex gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${wizardData.maxResultsMode === "minScore" ? "border-[#2A53A0] bg-[#EEF2FB] dark:bg-blue-900/10" : "border-gray-200 dark:border-gray-700"}`}>
                    <input
                      type="radio" name="create-max-results"
                      checked={wizardData.maxResultsMode === "minScore"}
                      onChange={() => setWizardData(d => ({ ...d, maxResultsMode: "minScore" }))}
                      className="mt-0.5 accent-[#2A53A0]"
                    />
                    <div className="flex-1 space-y-2">
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">Minimum Match Score %</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">Minimum score:</span>
                        <span className="text-xs text-gray-400">≥</span>
                        <input
                          type="number" min={0} max={100}
                          value={wizardData.minMatchScore}
                          onChange={e => setWizardData(d => ({ ...d, minMatchScore: Number(e.target.value) }))}
                          disabled={wizardData.maxResultsMode !== "minScore"}
                          className="w-16 h-9 px-2 text-sm font-semibold text-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/30 disabled:opacity-50"
                        />
                        <span className="text-xs text-gray-500">%</span>
                      </div>
                      <p className="text-xs text-gray-400">Only matches with a score of {wizardData.minMatchScore}% or higher will be displayed in screening results.</p>
                    </div>
                  </label>
                </div>

                {/* Threshold Risk Category */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 dark:text-white">Threshold Risk Category</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Define score ranges for each risk level.</p>
                  </div>
                  {(["low", "medium", "high"] as const).map(level => (
                    <div key={level} className="flex items-center gap-4">
                      <span className={`w-20 text-sm font-semibold capitalize ${level === "low" ? "text-[#198038]" : level === "medium" ? "text-[#F59E0B]" : "text-[#DA1E28]"}`}>{level.charAt(0).toUpperCase() + level.slice(1)} Risk</span>
                      <div className="flex items-center gap-2 flex-1">
                        <input type="number" min={0} max={100} value={wizardData.riskCategory[level][0]} onChange={e => setWizardData(d => ({ ...d, riskCategory: { ...d.riskCategory, [level]: [Number(e.target.value), d.riskCategory[level][1]] } }))} className="w-20 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/20 text-center" />
                        <span className="text-sm text-gray-400">to</span>
                        <input type="number" min={0} max={100} value={wizardData.riskCategory[level][1]} onChange={e => setWizardData(d => ({ ...d, riskCategory: { ...d.riskCategory, [level]: [d.riskCategory[level][0], Number(e.target.value)] } }))} className="w-20 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/20 text-center" />
                        <span className="text-sm text-gray-400">%</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* No-match Record Threshold */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-3">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 dark:text-white">No-match Record Threshold</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Records with a match score below this value will be treated as no-match.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">Less than</span>
                    <input type="number" min={0} max={100} value={wizardData.noMatchThreshold} onChange={e => setWizardData(d => ({ ...d, noMatchThreshold: Number(e.target.value) }))} className="w-24 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/20 text-center" />
                    <span className="text-sm text-gray-400">%</span>
                  </div>
                </div>

                {/* Watchlist Summary */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="bg-[#2A53A0] px-5 py-3">
                    <h4 className="text-sm font-semibold text-white">Watchlist Summary</h4>
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">

                    {/* Step 1 – Basic Information */}
                    <div className="px-5 py-4">
                      <p className="text-[11px] font-bold text-[#2A53A0] uppercase tracking-wider mb-3">Basic Information</p>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                        <div>
                          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Watchlist Name</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{wizardData.name || "—"}</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Purpose</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{wizardData.purpose}</p>
                        </div>
                        {wizardData.description && (
                          <div className="col-span-2">
                            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Description</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{wizardData.description}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Step 2 – List Selection */}
                    <div className="px-5 py-4">
                      <p className="text-[11px] font-bold text-[#2A53A0] uppercase tracking-wider mb-3">List Selection ({wizardData.selectedLists.length})</p>
                      {wizardData.selectedLists.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {wizardData.selectedLists.map(l => (
                            <span key={l} className="text-xs bg-blue-50 dark:bg-blue-900/20 text-[#2A53A0] border border-blue-100 dark:border-blue-800 px-2.5 py-1 rounded-full">{l}</span>
                          ))}
                        </div>
                      ) : <p className="text-xs text-gray-400 italic">No lists selected</p>}
                    </div>

                    {/* Step 3 – Field Mapping */}
                    <div className="px-5 py-4">
                      <p className="text-[11px] font-bold text-[#2A53A0] uppercase tracking-wider mb-3">Field Mapping</p>
                      <div className="grid grid-cols-[1fr_1fr_60px] gap-x-3 gap-y-0 mb-1.5">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Source Field</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Target Attribute</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide text-center">Required</p>
                      </div>
                      <div className="space-y-1.5">
                        {wizardData.fieldMappings.map(m => (
                          <div key={m.id} className="grid grid-cols-[1fr_1fr_60px] gap-x-3 items-center">
                            <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-gray-700 dark:text-gray-300 truncate">{m.sourceField}</span>
                            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">{m.targetField}</span>
                            <span className={cn("text-[11px] font-semibold text-center", m.required ? "text-[#198038]" : "text-gray-400")}>{m.required ? "Yes" : "No"}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step 4 – Match Score Configuration */}
                    <div className="px-5 py-4">
                      <p className="text-[11px] font-bold text-[#2A53A0] uppercase tracking-wider mb-3">Match Score Configuration</p>
                      <div className="grid grid-cols-[1fr_80px_80px] gap-x-3 gap-y-0 mb-1.5">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Field</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide text-center">Threshold</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide text-center">Weight</p>
                      </div>
                      <div className="space-y-1.5">
                        {wizardData.fieldMappings.map(m => (
                          <div key={m.id} className="grid grid-cols-[1fr_80px_80px] gap-x-3 items-center">
                            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">{m.targetField}</span>
                            <span className="text-xs font-bold text-[#2A53A0] text-center">{m.threshold}%</span>
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 text-center">{m.weight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step 5 – Result Configuration */}
                    <div className="px-5 py-4">
                      <p className="text-[11px] font-bold text-[#2A53A0] uppercase tracking-wider mb-3">Result Configuration</p>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                        <div>
                          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Overall Score Threshold</p>
                          <p className="text-sm font-bold text-[#2A53A0]">≥ {wizardData.alertThreshold}%</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">No-match Threshold</p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">&lt; {wizardData.noMatchThreshold}%</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Risk Category – Low</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{wizardData.riskCategory.low[0]}% – {wizardData.riskCategory.low[1]}%</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Risk Category – Medium</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{wizardData.riskCategory.medium[0]}% – {wizardData.riskCategory.medium[1]}%</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Risk Category – High</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{wizardData.riskCategory.high[0]}% – {wizardData.riskCategory.high[1]}%</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Maximum Results</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {wizardData.maxResultsMode === "topN" ? `Top ${wizardData.topNMatches} matches` : `Min score ≥ ${wizardData.minMatchScore}%`}
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* Wizard Footer */}
        <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {wizardStep > 0 && (
              <Button variant="outline" onClick={() => setWizardStep(s => s - 1)} className="h-[46px] rounded-[8px]">Back</Button>
            )}
            <Button variant="outline" onClick={() => { setWizardStep(0); setPageMode("main"); }} className="h-[46px] rounded-[8px]">Cancel</Button>
          </div>
          <div className="flex items-center gap-3">
            {wizardStep < WIZARD_STEPS.length - 1 ? (
              <Button onClick={() => setWizardStep(s => s + 1)} disabled={!canNext}
                className="h-[46px] bg-[#2A53A0] hover:bg-[#1e3a70] text-white rounded-[8px] flex items-center gap-1.5">
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleWizardSubmit} className="h-[46px] bg-[#2A53A0] hover:bg-[#1e3a70] text-white rounded-[8px]">
                Create Watchlist
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── View Detail Page ─────────────────────────────────────────────────────
  if (pageMode === "view" && selectedProfile) {
    return (
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
        {/* Top Navigation */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between shrink-0 shadow-sm relative">
          <button onClick={() => { setPageMode("main"); setSelectedProfile(null); }} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <span className="absolute left-1/2 -translate-x-1/2 text-[15px] font-semibold text-[#161616] dark:text-white truncate max-w-[40%] text-center">{selectedProfile.name}</span>
          <div className="flex items-center gap-2">
            <button onClick={() => { setPageMode("main"); setSelectedProfile(null); }} className="text-sm font-normal text-[#2A53A0] dark:text-[#6b93e6] hover:text-[#1e3a70] transition-colors">Sanctions Screening Configuration</button>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-normal text-[#161616]">{selectedProfile.name}</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Page Action Header */}
          <div className="flex items-center justify-between">
            <p className="text-[24px] font-semibold text-[#161616] dark:text-white">Watchlist Details</p>
            <Button
              onClick={() => {
                setEditWizardStep(0);
                setEditWizardData({
                  name: selectedProfile.name,
                  description: selectedProfile.description,
                  purpose: selectedProfile.type,
                  selectedLists: [...selectedProfile.includedLists],
                  fieldMappings: [
                    { id: "1", sourceField: "full_name", targetField: "Primary Name", required: true, threshold: selectedProfile.matchCriteria.primaryName.threshold, weight: selectedProfile.matchCriteria.primaryName.weight },
                    { id: "2", sourceField: "dob", targetField: "Date of Birth", required: true, threshold: selectedProfile.matchCriteria.dob.threshold, weight: selectedProfile.matchCriteria.dob.weight },
                    { id: "3", sourceField: "national_id", targetField: "National ID", required: false, threshold: selectedProfile.matchCriteria.address.threshold, weight: selectedProfile.matchCriteria.address.weight },
                    { id: "4", sourceField: "country", targetField: "Country", required: false, threshold: selectedProfile.matchCriteria.nationality.threshold, weight: selectedProfile.matchCriteria.nationality.weight },
                  ],
                  alertThreshold: selectedProfile.stats.alertThreshold,
                  alertAction: "Flag for Review",
                  notifyEmail: "",
                  riskCategory: { low: [0, 40], medium: [41, 70], high: [71, 100] },
                  noMatchThreshold: 30,
                  maxResultsMode: "topN",
                  topNMatches: 10,
                  minMatchScore: 90,
                });
                setEditData({ ...selectedProfile });
                setPageMode("edit");
              }}
              className="h-[46px] px-5 bg-[#2A53A0] hover:bg-[#1e3a70] text-white rounded-[8px]"
            >
              <Edit className="w-4 h-4 mr-2" /> Edit Configuration
            </Button>
          </div>

          {/* Summary Section */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 pt-5 pb-3">
              <p className="text-sm font-bold text-gray-900 dark:text-white">Summary</p>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-800">

              {/* Basic Information */}
              <div className="px-6 py-4">
                <p className="text-[11px] font-bold text-[#2A53A0] uppercase tracking-wider mb-3">Basic Information</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  <div>
                    <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Watchlist Name</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedProfile.name}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Type</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedProfile.type}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Status</p>
                    <span className={cn("text-xs font-semibold px-2.5 py-0.5 rounded-full", selectedProfile.isActive ? "bg-green-100 text-[#198038]" : "bg-gray-100 text-gray-500")}>
                      {selectedProfile.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Created By</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedProfile.lastUpdatedBy}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{selectedProfile.lastUpdated}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Description</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedProfile.description}</p>
                  </div>
                </div>
              </div>

              {/* Included Sanctions Lists */}
              <div className="px-6 py-4">
                <p className="text-[11px] font-bold text-[#2A53A0] uppercase tracking-wider mb-3">Included Sanctions Lists ({selectedProfile.includedLists.length})</p>
                <div className="space-y-2">
                  {selectedProfile.includedLists.map((list, idx) => {
                    const listData = SANCTIONS_LISTS.find(l => l.name === list);
                    return (
                      <div key={idx} className="flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{list}</p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {listData ? `${listData.entries.toLocaleString()} entries` : "—"}
                            {listData?.source ? ` • ${listData.source}` : ""}
                          </p>
                        </div>
                        <span className="text-xs font-semibold text-[#198038] bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-3 py-1 rounded-full">Active</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Match Score Configuration */}
              <div className="px-6 py-4">
                <p className="text-[11px] font-bold text-[#2A53A0] uppercase tracking-wider mb-3">Match Score Configuration</p>
                <div className="grid grid-cols-[1fr_80px_80px] gap-x-3 mb-1.5">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Field</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide text-center">Threshold</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide text-center">Weight</p>
                </div>
                <div className="space-y-1.5">
                  {[
                    { field: "Primary Name", threshold: selectedProfile.matchCriteria.primaryName.threshold, weight: selectedProfile.matchCriteria.primaryName.weight },
                    { field: "Date of Birth", threshold: selectedProfile.matchCriteria.dob.threshold, weight: selectedProfile.matchCriteria.dob.weight },
                    { field: "National ID", threshold: selectedProfile.matchCriteria.address.threshold, weight: selectedProfile.matchCriteria.address.weight },
                    { field: "Country", threshold: selectedProfile.matchCriteria.nationality.threshold, weight: selectedProfile.matchCriteria.nationality.weight },
                  ].map((row, idx) => (
                    <div key={idx} className="grid grid-cols-[1fr_80px_80px] gap-x-3 items-center">
                      <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">{row.field}</span>
                      <span className="text-xs font-bold text-[#2A53A0] text-center">{row.threshold}%</span>
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300 text-center">{row.weight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Result Configuration */}
              <div className="px-6 py-4">
                <p className="text-[11px] font-bold text-[#2A53A0] uppercase tracking-wider mb-3">Result Configuration</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  <div>
                    <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Overall Score Threshold</p>
                    <p className="text-sm font-bold text-[#2A53A0]">{selectedProfile.stats.alertThreshold}%</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Total Screenings</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{selectedProfile.stats.totalScreenings.toLocaleString()}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Usage Stats Section */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-sm font-bold text-gray-900 dark:text-white mb-4">Usage Stats</p>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedProfile.stats.totalScreenings.toLocaleString()}</p>
                <p className="text-xs text-gray-400 mt-1 font-medium uppercase tracking-wide">Total Screenings</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl font-bold text-[#DA1E28]">{selectedProfile.stats.alertsGenerated.toLocaleString()}</p>
                <p className="text-xs text-gray-400 mt-1 font-medium uppercase tracking-wide">Alerts Generated</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl font-bold text-[#198038]">
                  {selectedProfile.stats.totalScreenings > 0
                    ? `${((selectedProfile.stats.alertsGenerated / selectedProfile.stats.totalScreenings) * 100).toFixed(1)}%`
                    : "—"}
                </p>
                <p className="text-xs text-gray-400 mt-1 font-medium uppercase tracking-wide">Alert Rate</p>
              </div>
            </div>
          </div>

          {/* History Section */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-sm font-bold text-gray-900 dark:text-white mb-4">History</p>
            <div className="space-y-3">
              {[
                { action: "Configuration Updated", user: selectedProfile.lastUpdatedBy, date: selectedProfile.lastUpdated, detail: "Match thresholds and alert settings modified" },
                { action: "Watchlist Activated", user: "System", date: selectedProfile.lastUpdated, detail: `Status set to ${selectedProfile.isActive ? "Active" : "Inactive"}` },
                { action: "Lists Updated", user: selectedProfile.lastUpdatedBy, date: selectedProfile.lastUpdated, detail: `${selectedProfile.includedLists.length} sanctions lists linked` },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-[#2A53A0] mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">{item.action}</p>
                      <p className="text-xs text-gray-400 whitespace-nowrap">{item.date}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{item.detail}</p>
                    <p className="text-xs text-[#2A53A0] mt-0.5">by {item.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // ── Edit Configuration Wizard ─────────────────────────────────────────────
  if (pageMode === "edit" && selectedProfile) {
    const canNext = editWizardStep === 0 ? editWizardData.name.trim() !== "" : true;

    const handleSaveEdit = () => {
      const updated: WatchlistProfile = {
        ...selectedProfile,
        name: editWizardData.name,
        description: editWizardData.description,
        includedLists: editWizardData.selectedLists,
        matchCriteria: {
          primaryName: { threshold: editWizardData.fieldMappings.find(m => m.targetField === "Primary Name")?.threshold ?? 80, weight: editWizardData.fieldMappings.find(m => m.targetField === "Primary Name")?.weight ?? 50 },
          dob: { threshold: editWizardData.fieldMappings.find(m => m.targetField === "Date of Birth")?.threshold ?? 80, weight: editWizardData.fieldMappings.find(m => m.targetField === "Date of Birth")?.weight ?? 20 },
          address: { threshold: editWizardData.fieldMappings.find(m => m.targetField === "National ID")?.threshold ?? 70, weight: editWizardData.fieldMappings.find(m => m.targetField === "National ID")?.weight ?? 15 },
          nationality: { threshold: editWizardData.fieldMappings.find(m => m.targetField === "Country")?.threshold ?? 85, weight: editWizardData.fieldMappings.find(m => m.targetField === "Country")?.weight ?? 15 },
        },
        stats: { ...selectedProfile.stats, alertThreshold: editWizardData.alertThreshold },
        lastUpdated: new Date().toLocaleDateString("en-GB"),
      };
      setIsSubmitting(true);
      setTimeout(() => {
        setProfiles(prev => prev.map(p => p.id === updated.id ? updated : p));
        setIsSubmitting(false);
        setSuccessMessage("Configuration Successfully Updated");
        setShowSuccess(true);
      }, 2000);
    };

    return (
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
        {isSubmitting && <CreationLoader />}
        <CreationSuccessDialog
          eventName=""
          isOpen={showSuccess}
          title="Success"
          message={successMessage}
          onContinue={() => {
            setShowSuccess(false);
            setPageMode("main");
            setSelectedProfile(null);
            setEditData(null);
            setEditWizardStep(0);
          }}
        />
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between shrink-0 shadow-sm relative">
          <button onClick={() => { setEditWizardStep(0); setPageMode("main"); setSelectedProfile(null); setEditData(null); }} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <span className="absolute left-1/2 -translate-x-1/2 text-[15px] font-semibold text-[#161616] dark:text-white">Edit Configuration</span>
          <div className="flex items-center gap-2">
            <button onClick={() => { setEditWizardStep(0); setPageMode("main"); setSelectedProfile(null); setEditData(null); }} className="text-sm font-normal text-[#2A53A0] dark:text-[#6b93e6] hover:text-[#1e3a70] transition-colors">Sanctions Screening Configuration</button>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-normal text-[#161616]">Edit Configuration</span>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="h-[73px] bg-white border-b border-[#F3F4F6] flex items-center px-12 gap-6 shrink-0">
          {WIZARD_STEPS.map((step, idx) => (
            <div key={step} className="contents">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => idx < editWizardStep ? setEditWizardStep(idx) : undefined}
              >
                <div className={cn(
                  "size-8 rounded-full flex items-center justify-center text-[13px] font-bold border-2 transition-all",
                  editWizardStep === idx
                    ? "bg-[#2A53A0] border-[#2A53A0] text-white shadow-sm"
                    : editWizardStep > idx
                    ? "bg-[#198038] border-[#198038] text-white"
                    : "bg-white border-[#D1D5DC] text-[#99A1AF]"
                )}>
                  {editWizardStep > idx ? <CheckmarkFilled className="size-5" /> : idx + 1}
                </div>
                <span className={cn(
                  "text-[13px] font-semibold whitespace-nowrap",
                  editWizardStep === idx ? "text-[#2A53A0]" : "text-[#525252]"
                )}>
                  {step}
                </span>
              </div>
              {idx < WIZARD_STEPS.length - 1 && (
                <div className="flex-1 h-[2px] bg-[#E5E7EB]" />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8 flex justify-center">
          <div className="w-full">

            {/* Step 0 – Basic Information */}
            {editWizardStep === 0 && (
              <div className="w-[50%] mx-auto space-y-[16px]">
                <div className="space-y-[6px]">
                  <label className="text-[13px] font-semibold text-[#161616]">
                    Watchlist Name <span className="text-[#fb2c36]">*</span>
                  </label>
                  <input
                    type="text"
                    value={editWizardData.name}
                    onChange={e => setEditWizardData(d => ({ ...d, name: e.target.value }))}
                    placeholder="e.g., Customer Onboarding for Lending"
                    className="w-full h-[46px] px-[12px] bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0] focus:border-[#2a53a0] transition-colors"
                  />
                </div>
                <div className="space-y-[6px]">
                  <label className="text-[13px] font-semibold text-[#161616]">Description</label>
                  <textarea
                    rows={4}
                    value={editWizardData.description}
                    onChange={e => setEditWizardData(d => ({ ...d, description: e.target.value }))}
                    placeholder="Describe the purpose and usage of this watchlist configuration"
                    className="w-full p-[12px] bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0] focus:border-[#2a53a0] transition-colors resize-none"
                  />
                </div>
                <div className="space-y-[6px]">
                  <label className="text-[13px] font-semibold text-[#161616]">Purpose</label>
                  <Select value={editWizardData.purpose} onValueChange={v => setEditWizardData(d => ({ ...d, purpose: v }))}>
                    <SelectTrigger className="w-full !h-[46px] px-[12px] bg-white border border-[#d1d5dc] rounded-[8px] text-[14px] text-[#161616] focus:ring-1 focus:ring-[#2a53a0]">
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      {PURPOSE_OPTIONS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 1 – List Selection */}
            {editWizardStep === 1 && (
              <div className="w-full space-y-4">
                <p className="text-sm text-gray-500">Select the sanctions lists to include in this watchlist profile.</p>
                <div className="relative mb-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Search available lists..." className="pl-9 bg-white dark:bg-gray-900" />
                </div>
                {REGIONS.filter(r => r !== "All Regions").map(region => {
                  const regionLists = SANCTIONS_LISTS.filter(l => l.region === region);
                  return (
                    <div key={region}>
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{region}</h3>
                      <div className="space-y-2">
                        {regionLists.map(list => (
                          <label key={list.id} className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-[#2A53A0]/40 transition-colors">
                            <input
                              type="radio"
                              name="edit-list-selection"
                              className="mt-0.5 accent-[#2A53A0]"
                              checked={editWizardData.selectedLists.includes(list.name)}
                              onChange={() => {
                                setEditWizardData(d => ({ ...d, selectedLists: [list.name] }));
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">{list.name}</span>
                                <span className="text-[10px] text-gray-400">{list.entries.toLocaleString()} entries</span>
                              </div>
                              <p className="text-xs text-gray-500 mt-0.5 truncate">{list.description}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Step 2 – Field Mapping */}
            {editWizardStep === 2 && (
              <div className="w-full space-y-5">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Map incoming watchlist source fields to the screening profile's target attributes.</p>
                  <p className="text-xs text-gray-400">Required mappings are used in match scoring. Optional mappings enrich the alert context.</p>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="grid grid-cols-[1fr_1fr_100px_48px] gap-0 bg-[#F0F0F0] border-b border-gray-200 dark:border-gray-700 px-4 py-2.5">
                    <span className="text-xs font-bold text-[#2A53A0] uppercase tracking-wide">Source Field</span>
                    <span className="text-xs font-bold text-[#2A53A0] uppercase tracking-wide">Target Attribute</span>
                    <span className="text-xs font-bold text-[#2A53A0] uppercase tracking-wide text-center">Required</span>
                    <span />
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {editWizardData.fieldMappings.map((mapping) => (
                      <div key={mapping.id} className="grid grid-cols-[1fr_1fr_100px_48px] gap-0 items-center px-4 py-2">
                        <div className="mr-3">
                          <Dropdown
                            id={`edit-source-${mapping.id}`}
                            titleText=""
                            label=""
                            items={FIELD_MAPPING_SOURCES}
                            selectedItem={mapping.sourceField}
                            onChange={({ selectedItem }: any) => setEditWizardData(d => ({ ...d, fieldMappings: d.fieldMappings.map(m => m.id === mapping.id ? { ...m, sourceField: selectedItem } : m) }))}
                            size="sm"
                          />
                        </div>
                        <div className="mr-3">
                          <Dropdown
                            id={`edit-target-${mapping.id}`}
                            titleText=""
                            label=""
                            items={FIELD_MAPPING_TARGETS}
                            selectedItem={mapping.targetField}
                            onChange={({ selectedItem }: any) => setEditWizardData(d => ({ ...d, fieldMappings: d.fieldMappings.map(m => m.id === mapping.id ? { ...m, targetField: selectedItem } : m) }))}
                            size="sm"
                          />
                        </div>
                        <div className="flex justify-center">
                          <input
                            type="checkbox"
                            checked={mapping.required}
                            onChange={e => setEditWizardData(d => ({ ...d, fieldMappings: d.fieldMappings.map(m => m.id === mapping.id ? { ...m, required: e.target.checked } : m) }))}
                            className="w-4 h-4 accent-[#2A53A0]"
                          />
                        </div>
                        <div className="flex justify-center">
                          <button
                            onClick={() => setEditWizardData(d => ({ ...d, fieldMappings: d.fieldMappings.filter(m => m.id !== mapping.id) }))}
                            className="w-7 h-7 flex items-center justify-center rounded-sm bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/></svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t border-dashed border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setEditWizardData(d => ({ ...d, fieldMappings: [...d.fieldMappings, { id: String(Date.now()), sourceField: "full_name", targetField: "Primary Name", required: false, threshold: 75, weight: 10 }] }))}
                      className="flex items-center gap-2 text-sm font-medium text-[#2A53A0] hover:text-[#1e3a70] transition-colors"
                    >
                      <Add className="w-4 h-4" /> Add Field Mapping
                    </button>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-xl p-4">
                  <p className="text-xs text-[#2A53A0] font-semibold mb-1">How field mapping works</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">Source fields are the attribute names in the incoming watchlist data. Target attributes are the normalised fields used by the screening engine for comparison and match scoring.</p>
                </div>
              </div>
            )}

            {/* Step 3 – Match Score Configuration */}
            {editWizardStep === 3 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-500">Configure match thresholds and attribute weights for each mapped field.</p>
                {editWizardData.fieldMappings.length === 0 ? (
                  <div className="text-center py-12 text-sm text-gray-400 bg-white dark:bg-gray-900 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                    No fields mapped. Go back to the Field Mapping step to add fields.
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-[1.4fr_1fr_80px_1.6fr_1.4fr] bg-[#F0F0F0] dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-5 py-2.5 gap-4">
                      <span className="text-xs font-bold text-[#2A53A0] uppercase tracking-wide">Target Field</span>
                      <span className="text-xs font-bold text-[#2A53A0] uppercase tracking-wide">Source Field</span>
                      <span className="text-xs font-bold text-[#2A53A0] uppercase tracking-wide text-center">Required</span>
                      <span className="text-xs font-bold text-[#2A53A0] uppercase tracking-wide">Threshold (%)</span>
                      <span className="text-xs font-bold text-[#2A53A0] uppercase tracking-wide">Weight</span>
                    </div>
                    {/* Table Rows */}
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                      {editWizardData.fieldMappings.map(mapping => (
                        <div key={mapping.id} className="grid grid-cols-[1.4fr_1fr_80px_1.6fr_1.4fr] items-center px-5 py-3.5 gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          {/* Target Field */}
                          <span className="text-sm font-semibold text-gray-800 dark:text-white">{mapping.targetField}</span>
                          {/* Source Field */}
                          <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded text-gray-600 dark:text-gray-300 truncate w-fit">{mapping.sourceField}</span>
                          {/* Required */}
                          <div className="flex justify-center">
                            <span className={cn("text-xs font-semibold px-2.5 py-0.5 rounded-full", mapping.required ? "bg-blue-50 text-[#2A53A0]" : "bg-gray-100 text-gray-400")}>
                              {mapping.required ? "Yes" : "No"}
                            </span>
                          </div>
                          {/* Threshold */}
                          <div className="flex items-center gap-2.5">
                            <input
                              type="range" min={50} max={100}
                              value={mapping.threshold}
                              onChange={e => setEditWizardData(d => ({ ...d, fieldMappings: d.fieldMappings.map(m => m.id === mapping.id ? { ...m, threshold: Number(e.target.value) } : m) }))}
                              className="flex-1 accent-[#2A53A0] h-1.5"
                            />
                            <input
                              type="number" min={50} max={100}
                              value={mapping.threshold}
                              onChange={e => setEditWizardData(d => ({ ...d, fieldMappings: d.fieldMappings.map(m => m.id === mapping.id ? { ...m, threshold: Number(e.target.value) } : m) }))}
                              className="w-14 h-8 px-2 text-sm font-bold text-center text-[#2A53A0] border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-[#2A53A0]"
                            />
                          </div>
                          {/* Weight */}
                          <div className="flex items-center gap-2.5">
                            <input
                              type="range" min={1} max={100}
                              value={mapping.weight}
                              onChange={e => setEditWizardData(d => ({ ...d, fieldMappings: d.fieldMappings.map(m => m.id === mapping.id ? { ...m, weight: Number(e.target.value) } : m) }))}
                              className="flex-1 accent-[#2A53A0] h-1.5"
                            />
                            <input
                              type="number" min={1} max={100}
                              value={mapping.weight}
                              onChange={e => setEditWizardData(d => ({ ...d, fieldMappings: d.fieldMappings.map(m => m.id === mapping.id ? { ...m, weight: Number(e.target.value) } : m) }))}
                              className="w-14 h-8 px-2 text-sm font-bold text-center text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-[#2A53A0]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Footer note */}
                    <div className="px-5 py-3 bg-[#EEF2FB] dark:bg-blue-900/10 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-[#2A53A0]">Threshold: minimum similarity score (50–100%). Weight: relative importance of this field in the overall match score.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4 – Result Configuration */}
            {editWizardStep === 4 && (
              <div className="space-y-6">

                {/* Overall Score Threshold */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 dark:text-white">Overall Score Threshold</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Minimum aggregate match score required to generate an alert</p>
                  </div>
                  <div className="bg-[#EEF2FB] dark:bg-blue-900/20 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">Alert Threshold</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number" min={0} max={100}
                          value={editWizardData.alertThreshold}
                          onChange={e => setEditWizardData(d => ({ ...d, alertThreshold: Number(e.target.value) }))}
                          className="w-16 h-9 px-2 text-sm font-semibold text-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/30"
                        />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">%</span>
                      </div>
                    </div>
                    <input
                      type="range" min={0} max={100}
                      value={editWizardData.alertThreshold}
                      onChange={e => setEditWizardData(d => ({ ...d, alertThreshold: Number(e.target.value) }))}
                      className="w-full accent-[#2A53A0]"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>More Alerts (0%)</span>
                      <span>Fewer Alerts (100%)</span>
                    </div>
                  </div>
                  <div className="flex gap-2 text-xs text-gray-500 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <span className="mt-0.5 text-gray-400">ⓘ</span>
                    <div>
                      <span className="font-semibold text-gray-600 dark:text-gray-300">How scoring works: </span>
                      The system calculates a weighted aggregate score based on the match percentages for each field. If the overall score exceeds {editWizardData.alertThreshold}%, an alert will be generated.
                    </div>
                  </div>
                </div>

                {/* Maximum Results */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 dark:text-white">Maximum Results</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Limit the number of top matches to display in screening results</p>
                  </div>

                  <label className={`flex gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${editWizardData.maxResultsMode === "topN" ? "border-[#2A53A0] bg-[#EEF2FB] dark:bg-blue-900/10" : "border-gray-200 dark:border-gray-700"}`}>
                    <input type="radio" name="edit-max-results" checked={editWizardData.maxResultsMode === "topN"} onChange={() => setEditWizardData(d => ({ ...d, maxResultsMode: "topN" }))} className="mt-0.5 accent-[#2A53A0]" />
                    <div className="flex-1 space-y-2">
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">Show Top N Matches</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">Number of matches:</span>
                        <input type="number" min={1} max={100} value={editWizardData.topNMatches} onChange={e => setEditWizardData(d => ({ ...d, topNMatches: Number(e.target.value) }))} disabled={editWizardData.maxResultsMode !== "topN"} className="w-16 h-9 px-2 text-sm font-semibold text-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/30 disabled:opacity-50" />
                        <span className="text-xs text-gray-500">matches</span>
                      </div>
                      <p className="text-xs text-gray-400">Only the top {editWizardData.topNMatches} highest-scoring matches will be displayed for each screening request.</p>
                    </div>
                  </label>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">OR</span>
                    <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                  </div>

                  <label className={`flex gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${editWizardData.maxResultsMode === "minScore" ? "border-[#2A53A0] bg-[#EEF2FB] dark:bg-blue-900/10" : "border-gray-200 dark:border-gray-700"}`}>
                    <input type="radio" name="edit-max-results" checked={editWizardData.maxResultsMode === "minScore"} onChange={() => setEditWizardData(d => ({ ...d, maxResultsMode: "minScore" }))} className="mt-0.5 accent-[#2A53A0]" />
                    <div className="flex-1 space-y-2">
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">Minimum Match Score %</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">Minimum score:</span>
                        <span className="text-xs text-gray-400">≥</span>
                        <input type="number" min={0} max={100} value={editWizardData.minMatchScore} onChange={e => setEditWizardData(d => ({ ...d, minMatchScore: Number(e.target.value) }))} disabled={editWizardData.maxResultsMode !== "minScore"} className="w-16 h-9 px-2 text-sm font-semibold text-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/30 disabled:opacity-50" />
                        <span className="text-xs text-gray-500">%</span>
                      </div>
                      <p className="text-xs text-gray-400">Only matches with a score of {editWizardData.minMatchScore}% or higher will be displayed in screening results.</p>
                    </div>
                  </label>
                </div>

                {/* Threshold Risk Category */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 dark:text-white">Threshold Risk Category</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Define score ranges for each risk level.</p>
                  </div>
                  {(["low", "medium", "high"] as const).map(level => (
                    <div key={level} className="flex items-center gap-4">
                      <span className={`w-20 text-sm font-semibold capitalize ${level === "low" ? "text-[#198038]" : level === "medium" ? "text-[#F59E0B]" : "text-[#DA1E28]"}`}>{level.charAt(0).toUpperCase() + level.slice(1)} Risk</span>
                      <div className="flex items-center gap-2 flex-1">
                        <input type="number" min={0} max={100} value={editWizardData.riskCategory[level][0]} onChange={e => setEditWizardData(d => ({ ...d, riskCategory: { ...d.riskCategory, [level]: [Number(e.target.value), d.riskCategory[level][1]] } }))} className="w-20 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/20 text-center" />
                        <span className="text-sm text-gray-400">to</span>
                        <input type="number" min={0} max={100} value={editWizardData.riskCategory[level][1]} onChange={e => setEditWizardData(d => ({ ...d, riskCategory: { ...d.riskCategory, [level]: [d.riskCategory[level][0], Number(e.target.value)] } }))} className="w-20 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/20 text-center" />
                        <span className="text-sm text-gray-400">%</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* No-match Record Threshold */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-3">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 dark:text-white">No-match Record Threshold</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Records with a match score below this value will be treated as no-match.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">Less than</span>
                    <input type="number" min={0} max={100} value={editWizardData.noMatchThreshold} onChange={e => setEditWizardData(d => ({ ...d, noMatchThreshold: Number(e.target.value) }))} className="w-24 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/20 text-center" />
                    <span className="text-sm text-gray-400">%</span>
                  </div>
                </div>

                {/* Watchlist Summary */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="bg-[#2A53A0] px-5 py-3">
                    <h4 className="text-sm font-semibold text-white">Watchlist Summary</h4>
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">

                    {/* Step 1 – Basic Information */}
                    <div className="px-5 py-4">
                      <p className="text-[11px] font-bold text-[#2A53A0] uppercase tracking-wider mb-3">Basic Information</p>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                        <div>
                          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Watchlist Name</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{editWizardData.name || "—"}</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Purpose</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{editWizardData.purpose}</p>
                        </div>
                        {editWizardData.description && (
                          <div className="col-span-2">
                            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Description</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{editWizardData.description}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Step 2 – List Selection */}
                    <div className="px-5 py-4">
                      <p className="text-[11px] font-bold text-[#2A53A0] uppercase tracking-wider mb-3">List Selection ({editWizardData.selectedLists.length})</p>
                      {editWizardData.selectedLists.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {editWizardData.selectedLists.map(l => (
                            <span key={l} className="text-xs bg-blue-50 dark:bg-blue-900/20 text-[#2A53A0] border border-blue-100 dark:border-blue-800 px-2.5 py-1 rounded-full">{l}</span>
                          ))}
                        </div>
                      ) : <p className="text-xs text-gray-400 italic">No lists selected</p>}
                    </div>

                    {/* Step 3 – Field Mapping */}
                    <div className="px-5 py-4">
                      <p className="text-[11px] font-bold text-[#2A53A0] uppercase tracking-wider mb-3">Field Mapping</p>
                      <div className="grid grid-cols-[1fr_1fr_60px] gap-x-3 gap-y-0 mb-1.5">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Source Field</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Target Attribute</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide text-center">Required</p>
                      </div>
                      <div className="space-y-1.5">
                        {editWizardData.fieldMappings.map(m => (
                          <div key={m.id} className="grid grid-cols-[1fr_1fr_60px] gap-x-3 items-center">
                            <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-gray-700 dark:text-gray-300 truncate">{m.sourceField}</span>
                            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">{m.targetField}</span>
                            <span className={cn("text-[11px] font-semibold text-center", m.required ? "text-[#198038]" : "text-gray-400")}>{m.required ? "Yes" : "No"}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step 4 – Match Score Configuration */}
                    <div className="px-5 py-4">
                      <p className="text-[11px] font-bold text-[#2A53A0] uppercase tracking-wider mb-3">Match Score Configuration</p>
                      <div className="grid grid-cols-[1fr_80px_80px] gap-x-3 gap-y-0 mb-1.5">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Field</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide text-center">Threshold</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide text-center">Weight</p>
                      </div>
                      <div className="space-y-1.5">
                        {editWizardData.fieldMappings.map(m => (
                          <div key={m.id} className="grid grid-cols-[1fr_80px_80px] gap-x-3 items-center">
                            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">{m.targetField}</span>
                            <span className="text-xs font-bold text-[#2A53A0] text-center">{m.threshold}%</span>
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 text-center">{m.weight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step 5 – Result Configuration */}
                    <div className="px-5 py-4">
                      <p className="text-[11px] font-bold text-[#2A53A0] uppercase tracking-wider mb-3">Result Configuration</p>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                        <div>
                          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Overall Score Threshold</p>
                          <p className="text-sm font-bold text-[#2A53A0]">≥ {editWizardData.alertThreshold}%</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">No-match Threshold</p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">&lt; {editWizardData.noMatchThreshold}%</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Risk Category – Low</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{editWizardData.riskCategory.low[0]}% – {editWizardData.riskCategory.low[1]}%</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Risk Category – Medium</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{editWizardData.riskCategory.medium[0]}% – {editWizardData.riskCategory.medium[1]}%</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Risk Category – High</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{editWizardData.riskCategory.high[0]}% – {editWizardData.riskCategory.high[1]}%</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Maximum Results</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {editWizardData.maxResultsMode === "topN" ? `Top ${editWizardData.topNMatches} matches` : `Min score ≥ ${editWizardData.minMatchScore}%`}
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* Wizard Footer */}
        <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {editWizardStep > 0 && (
              <Button variant="outline" onClick={() => setEditWizardStep(s => s - 1)} className="h-[46px] rounded-[8px]">Back</Button>
            )}
            <Button variant="outline" onClick={() => { setEditWizardStep(0); setPageMode("main"); setSelectedProfile(null); setEditData(null); }} className="h-[46px] rounded-[8px]">Cancel</Button>
          </div>
          <div className="flex items-center gap-3">
            {editWizardStep < WIZARD_STEPS.length - 1 ? (
              <Button onClick={() => setEditWizardStep(s => s + 1)} disabled={!canNext}
                className="h-[46px] bg-[#2A53A0] hover:bg-[#1e3a70] text-white rounded-[8px] flex items-center gap-1.5">
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSaveEdit} className="h-[46px] bg-[#2A53A0] hover:bg-[#1e3a70] text-white rounded-[8px]">
                Save Configuration
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Main Table Page ───────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 p-0">

      {/* Page Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between shrink-0">
        <h1 className="text-lg font-medium text-gray-900 dark:text-white">Sanctions Screening Configuration</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm font-normal text-[#2A53A0] dark:text-[#6b93e6]">Configuration</span>
          <span className="text-gray-300">/</span>
          <span className="text-sm font-normal text-[#161616] dark:text-gray-400">Sanctions Screening Configuration</span>
        </div>
      </div>

      {/* Tabs — outside main content */}
      <div className="flex-none border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4">
        <div className="flex h-[48px] w-full">
          {(["Active", "Inactive", "All Watchlists"] as const).map(tab => (
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
              {tab === "Active" ? `Active (${activeCount})` : tab === "Inactive" ? `Inactive (${inactiveCount})` : `All Watchlists (${profiles.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden p-4 gap-4">

      {/* Search + Buttons (Tab Content Action Bar) */}
      <div className="flex-none bg-white dark:bg-gray-900 px-0 py-0 flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search profiles, types..."
            className="pl-9 w-64 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus-visible:ring-[#2A53A0] h-[46px]"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-1.5 bg-white dark:bg-gray-900 h-[46px] text-sm" onClick={() => setPageMode("lists-library")}>
            <Filter className="w-4 h-4" /> View Lists Library
          </Button>
          <Button variant="outline" className="gap-1.5 bg-white dark:bg-gray-900 h-[46px] text-sm">
            <Upload className="w-4 h-4" /> Upload List
          </Button>
          <Button className="gap-1.5 bg-[#2A53A0] hover:bg-[#2A53A0]/90 text-white h-[46px] text-sm" onClick={() => setPageMode("create-wizard")}>
            <Add className="w-4 h-4" /> Create Watchlist
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-hidden flex flex-col bg-white dark:bg-gray-900 border-0 shadow-sm">
        <div className="flex-1 overflow-auto">
          <Table>
            <thead className="sticky top-0 z-10 shadow-sm">
              <tr className="bg-[#F0F0F0] text-[#161616] h-[48px]">
                <th className="pl-4 px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[260px]">
                  <SortableHeader column="name" label="Watchlist Name" sortConfig={sortConfigTab} onSort={requestSortTab} />
                </th>
                <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[140px]">
                  <SortableHeader column="type" label="Type" sortConfig={sortConfigTab} onSort={requestSortTab} />
                </th>
                <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-center w-[130px]">Alert Threshold</th>
                <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[120px]">Last Updated</th>
                <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[140px]">Last Updated By</th>
                <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-center w-[90px]">Status</th>
                <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[100px]">Actions</th>
              </tr>
            </thead>
            <TableBody>
              {currentItemsTab.length > 0 ? currentItemsTab.map(profile => (
                <TableRow key={profile.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800 h-[56px]">
                  <TableCell className="pl-4 px-4 align-middle">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{profile.name}</span>
                  </TableCell>
                  <TableCell className="px-4 align-middle">
                    <Badge variant="secondary" className={cn("text-xs px-2 py-0.5 font-medium whitespace-nowrap", TYPE_BADGE[profile.type])}>
                      {profile.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 align-middle text-center">
                    <span className="text-sm font-semibold text-[#2A53A0] bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded">
                      ≥ {profile.stats.alertThreshold}%
                    </span>
                  </TableCell>
                  <TableCell className="px-4 align-middle">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{profile.lastUpdated}</span>
                  </TableCell>
                  <TableCell className="px-4 align-middle">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{profile.lastUpdatedBy}</span>
                  </TableCell>
                  <TableCell className="px-4 align-middle text-center">
                    <span className={cn(
                      "text-xs font-semibold px-2.5 py-1 rounded-full",
                      profile.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    )}>
                      {profile.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 align-middle">
                    <div className="flex items-center justify-start gap-2">
                      <button onClick={() => { setSelectedProfile(profile); setEditData(null); setPageMode("view"); }}
                        className="flex items-center justify-center w-8 h-8 rounded-sm bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 transition-colors" title="View Details">
                        <View className="w-4 h-4" />
                      </button>
                      <button onClick={() => {
                          setSelectedProfile(profile);
                          setEditData({ ...profile });
                          setEditWizardStep(0);
                          setEditWizardData({
                            name: profile.name,
                            description: profile.description,
                            purpose: profile.type,
                            selectedLists: [...profile.includedLists],
                            fieldMappings: [
                              { id: "1", sourceField: "full_name", targetField: "Primary Name", required: true, threshold: profile.matchCriteria.primaryName.threshold, weight: profile.matchCriteria.primaryName.weight },
                              { id: "2", sourceField: "dob", targetField: "Date of Birth", required: true, threshold: profile.matchCriteria.dob.threshold, weight: profile.matchCriteria.dob.weight },
                              { id: "3", sourceField: "national_id", targetField: "National ID", required: false, threshold: profile.matchCriteria.address.threshold, weight: profile.matchCriteria.address.weight },
                              { id: "4", sourceField: "country", targetField: "Country", required: false, threshold: profile.matchCriteria.nationality.threshold, weight: profile.matchCriteria.nationality.weight },
                            ],
                            alertThreshold: profile.stats.alertThreshold,
                            alertAction: "Flag for Review",
                            notifyEmail: "",
                            riskCategory: { low: [0, 40], medium: [41, 70], high: [71, 100] },
                            noMatchThreshold: 30,
                          });
                          setPageMode("edit");
                        }}
                        className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#2A53A0]/10 hover:bg-[#2A53A0]/20 text-[#2A53A0] transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenToggleDialog(profile)}
                        className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-sm text-xs font-medium transition-colors",
                          profile.isActive
                            ? "bg-red-500/10 hover:bg-red-500/20 text-red-600"
                            : "bg-green-500/10 hover:bg-green-500/20 text-green-700"
                        )}
                        title={profile.isActive ? "Disable" : "Enable"}
                      >
                        {profile.isActive ? "Off" : "On"}
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-gray-500">No profiles found matching your search.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex-none">
          <CarbonPaginationFooter pageSize={pageSize} setPageSize={setPageSize} currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={totalItemsTab} />
        </div>
      </div>

      </div>{/* end p-4 wrapper */}

      {/* Enable/Disable Dialog */}
      <AnimatePresence>
        {toggleDialogProfile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setToggleDialogProfile(null)}
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
                  onClick={() => setToggleDialogProfile(null)}
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
                  Controlling screening engine status for <strong className="text-[#161616]">{toggleDialogProfile.name}</strong>. All entity records are retained on disable. Both actions require Maker-Checker approval.
                </p>

                {/* Action Radio */}
                <div className="space-y-[6px]">
                  <label className="text-[13px] font-semibold text-[#161616]">
                    Action <span className="text-[#fb2c36]">*</span>
                  </label>
                  <div className="flex items-center gap-6 mt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="toggleAction" value="DISABLE" checked={toggleAction === "DISABLE"}
                        onChange={() => setToggleAction("DISABLE")} className="accent-[#2a53a0]" />
                      <span className="text-[14px] font-medium text-[#161616]">Disable</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="toggleAction" value="ENABLE" checked={toggleAction === "ENABLE"}
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
                  onClick={() => setToggleDialogProfile(null)}
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
