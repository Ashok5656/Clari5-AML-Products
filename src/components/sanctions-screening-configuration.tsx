import { useState } from "react";
import {
  Search, Add, Edit, TrashCan, Download, Upload, View,
  ArrowLeft, Filter, ChevronRight, CheckmarkFilled,
} from "@carbon/icons-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { CarbonPaginationFooter } from "./carbon-pagination-footer";
import { useSortableData } from "../hooks/use-sortable-data";
import { SortableHeader } from "./ui/sortable-header";
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
  stats: { alertThreshold: number; totalScreenings: number; alertsGenerated: number };
  lastUpdated: string;
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
    description: "Comprehensive screening for new customer onboarding with UN, OFAC, and EU sanctions lists",
    isActive: true, includedLists: ["UN Consolidated List", "US OFAC SDN", "EU List"],
    matchCriteria: { primaryName: { threshold: 75, weight: 60 }, dob: { threshold: 90, weight: 40 }, address: { threshold: 70, weight: 30 }, nationality: { threshold: 90, weight: 40 } },
    stats: { alertThreshold: 75, totalScreenings: 0, alertsGenerated: 0 }, lastUpdated: "19/11/2025",
  },
  {
    id: "2", name: "Continuous Monitoring for Transactions", type: "Monitoring",
    description: "Ongoing monitoring of customer transactions against global watchlists",
    isActive: true, includedLists: ["UN Consolidated List", "EU List", "Interpol Red Notices"],
    matchCriteria: { primaryName: { threshold: 90, weight: 9 }, dob: { threshold: 85, weight: 8 }, address: { threshold: 75, weight: 5 }, nationality: { threshold: 92, weight: 8 } },
    stats: { alertThreshold: 80, totalScreenings: 18945, alertsGenerated: 423 }, lastUpdated: "19/11/2025",
  },
  {
    id: "3", name: "MAS Regulatory Compliance Screening", type: "MAS Regulatory",
    description: "MAS-mandated enhanced screening under AML/CFT Notice requirements for Singapore entities",
    isActive: true, includedLists: ["MAS Singapore High-Risk Screening", "Singapore MAS Sanctions", "FATF High-Risk Jurisdictions"],
    matchCriteria: { primaryName: { threshold: 85, weight: 55 }, dob: { threshold: 88, weight: 20 }, address: { threshold: 72, weight: 10 }, nationality: { threshold: 95, weight: 15 } },
    stats: { alertThreshold: 70, totalScreenings: 7241, alertsGenerated: 189 }, lastUpdated: "18/11/2025",
  },
  {
    id: "4", name: "PEP & Adverse Media Screening", type: "Monitoring",
    description: "Politically Exposed Persons and adverse media screening for high-risk customer segments",
    isActive: true, includedLists: ["PEP List Global", "PEP List Domestic", "Adverse Media – Tier 1", "Adverse Media – Tier 2"],
    matchCriteria: { primaryName: { threshold: 80, weight: 50 }, dob: { threshold: 85, weight: 20 }, address: { threshold: 65, weight: 10 }, nationality: { threshold: 88, weight: 20 } },
    stats: { alertThreshold: 75, totalScreenings: 11302, alertsGenerated: 312 }, lastUpdated: "17/11/2025",
  },
  {
    id: "5", name: "High-Risk Customer Enhanced Due Diligence", type: "EDD",
    description: "Enhanced Due Diligence screening for high-risk customers requiring additional identity verification",
    isActive: true, includedLists: ["US OFAC SDN", "UK HM Treasury Consolidated List", "FATF Increased Monitoring List"],
    matchCriteria: { primaryName: { threshold: 92, weight: 65 }, dob: { threshold: 90, weight: 15 }, address: { threshold: 80, weight: 10 }, nationality: { threshold: 95, weight: 10 } },
    stats: { alertThreshold: 85, totalScreenings: 4807, alertsGenerated: 97 }, lastUpdated: "16/11/2025",
  },
  {
    id: "6", name: "Cross-Border Payment Sanctions Screening", type: "Sanctions",
    description: "Real-time sanctions screening for cross-border wire transfers and international payments",
    isActive: true, includedLists: ["US OFAC SDN", "UN Consolidated List", "EU Consolidated Financial Sanctions List", "UK HM Treasury Consolidated List"],
    matchCriteria: { primaryName: { threshold: 95, weight: 70 }, dob: { threshold: 80, weight: 10 }, address: { threshold: 75, weight: 10 }, nationality: { threshold: 90, weight: 10 } },
    stats: { alertThreshold: 80, totalScreenings: 52318, alertsGenerated: 1074 }, lastUpdated: "19/11/2025",
  },
  {
    id: "7", name: "Legacy Customer Re-screening Profile", type: "Ad-hoc",
    description: "Periodic re-screening of legacy customer base against updated sanctions and watchlist data",
    isActive: false, includedLists: ["UN Consolidated List", "US OFAC SDN", "World Bank Debarred Entities"],
    matchCriteria: { primaryName: { threshold: 78, weight: 55 }, dob: { threshold: 82, weight: 25 }, address: { threshold: 68, weight: 10 }, nationality: { threshold: 85, weight: 10 } },
    stats: { alertThreshold: 78, totalScreenings: 3120, alertsGenerated: 44 }, lastUpdated: "15/11/2025",
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

const WIZARD_STEPS = ["Basic Information", "Risk Selection", "Match Score Configuration", "Result Configuration"];

const PURPOSE_OPTIONS = ["Customer Onboarding", "Transaction Monitoring", "Periodic Review", "Enhanced Due Diligence", "Ad-hoc Screening", "Regulatory Compliance"];

// ── Component ──────────────────────────────────────────────────────────────

export function SanctionsScreeningConfiguration({ breadcrumbs, onBreadcrumbNavigate }: SanctionsScreeningConfigurationProps) {
  const [pageMode, setPageMode] = useState<"main" | "lists-library" | "create-wizard" | "view" | "edit">("main");
  const [profiles, setProfiles] = useState<WatchlistProfile[]>(MOCK_PROFILES);
  const [selectedProfile, setSelectedProfile] = useState<WatchlistProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Lists Library state
  const [librarySearch, setLibrarySearch] = useState("");
  const [libraryRegion, setLibraryRegion] = useState("All Regions");

  // Wizard state
  const [wizardStep, setWizardStep] = useState(0);
  const [wizardData, setWizardData] = useState({
    name: "", description: "", purpose: "Customer Onboarding",
    selectedLists: [] as string[],
    matchCriteria: { primaryName: { threshold: 80, weight: 50 }, dob: { threshold: 80, weight: 20 }, address: { threshold: 70, weight: 15 }, nationality: { threshold: 85, weight: 15 } },
    alertThreshold: 80, alertAction: "Flag for Review", notifyEmail: "",
  });

  const filteredProfiles = profiles.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const { items: sortedProfiles, requestSort, sortConfig } = useSortableData(filteredProfiles);
  const totalItems = sortedProfiles.length;
  const startItem = (currentPage - 1) * pageSize;
  const currentItems = sortedProfiles.slice(startItem, startItem + pageSize);

  const handleToggleActive = (id: string) => {
    setProfiles(prev => prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
  };

  const handleDelete = (id: string) => {
    setProfiles(prev => prev.filter(p => p.id !== id));
  };

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
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setPageMode("main")} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Sanctions Lists Library</h1>
              <p className="text-xs text-gray-500 mt-0.5">Browse {SANCTIONS_LISTS.length} global and regional sanctions lists</p>
            </div>
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
          <select
            value={libraryRegion} onChange={e => setLibraryRegion(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/20 min-w-[150px]"
          >
            {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
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
      const newProfile: WatchlistProfile = {
        id: String(Date.now()), name: wizardData.name, type: "Onboarding",
        description: wizardData.description, isActive: true,
        includedLists: wizardData.selectedLists,
        matchCriteria: wizardData.matchCriteria,
        stats: { alertThreshold: wizardData.alertThreshold, totalScreenings: 0, alertsGenerated: 0 },
        lastUpdated: new Date().toLocaleDateString("en-GB"),
      };
      setProfiles(prev => [...prev, newProfile]);
      setWizardStep(0);
      setWizardData({ name: "", description: "", purpose: "Customer Onboarding", selectedLists: [], matchCriteria: { primaryName: { threshold: 80, weight: 50 }, dob: { threshold: 80, weight: 20 }, address: { threshold: 70, weight: 15 }, nationality: { threshold: 85, weight: 15 } }, alertThreshold: 80, alertAction: "Flag for Review", notifyEmail: "" });
      setPageMode("main");
    };

    return (
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center gap-4 shrink-0 shadow-sm">
          <button onClick={() => { setWizardStep(0); setPageMode("main"); }} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Create New Watchlist</h1>
            <p className="text-xs text-gray-500 mt-0.5">Configure a new sanctions watchlist profile</p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-0 shrink-0">
          <div className="flex">
            {WIZARD_STEPS.map((step, idx) => (
              <button key={step} onClick={() => idx < wizardStep ? setWizardStep(idx) : undefined}
                className={cn(
                  "px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                  idx === wizardStep
                    ? "border-[#2A53A0] text-[#2A53A0]"
                    : idx < wizardStep
                    ? "border-transparent text-gray-500 hover:text-gray-700 cursor-pointer"
                    : "border-transparent text-gray-400 cursor-default"
                )}
              >
                {step}
              </button>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-2xl">
            {/* Step 0 – Basic Information */}
            {wizardStep === 0 && (
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Watchlist Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={wizardData.name}
                    onChange={e => setWizardData(d => ({ ...d, name: e.target.value }))}
                    placeholder="e.g., Customer Onboarding for Lending"
                    className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus-visible:ring-[#2A53A0] h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">Description</label>
                  <textarea
                    rows={4}
                    value={wizardData.description}
                    onChange={e => setWizardData(d => ({ ...d, description: e.target.value }))}
                    placeholder="Describe the purpose and usage of this watchlist configuration"
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/20 focus:border-[#2A53A0] resize-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">Purpose</label>
                  <select
                    value={wizardData.purpose}
                    onChange={e => setWizardData(d => ({ ...d, purpose: e.target.value }))}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/20 focus:border-[#2A53A0]"
                  >
                    {PURPOSE_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
            )}

            {/* Step 1 – Risk Selection */}
            {wizardStep === 1 && (
              <div className="space-y-4">
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
                              type="checkbox"
                              className="mt-0.5 accent-[#2A53A0]"
                              checked={wizardData.selectedLists.includes(list.name)}
                              onChange={e => {
                                setWizardData(d => ({
                                  ...d,
                                  selectedLists: e.target.checked
                                    ? [...d.selectedLists, list.name]
                                    : d.selectedLists.filter(n => n !== list.name),
                                }));
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

            {/* Step 2 – Match Score Configuration */}
            {wizardStep === 2 && (
              <div className="space-y-6">
                <p className="text-sm text-gray-500">Configure match thresholds and attribute weights for scoring.</p>
                {(["primaryName", "dob", "address", "nationality"] as const).map(field => {
                  const labels: Record<string, string> = { primaryName: "Primary Name Match", dob: "Date of Birth Match", address: "Address Match", nationality: "Nationality Match" };
                  return (
                    <div key={field} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                      <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-4">{labels[field]}</h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-gray-500 uppercase">Threshold (%)</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="range" min={50} max={100}
                              value={wizardData.matchCriteria[field].threshold}
                              onChange={e => setWizardData(d => ({ ...d, matchCriteria: { ...d.matchCriteria, [field]: { ...d.matchCriteria[field], threshold: Number(e.target.value) } } }))}
                              className="flex-1 accent-[#2A53A0]"
                            />
                            <span className="text-sm font-bold text-[#2A53A0] w-12 text-right">{wizardData.matchCriteria[field].threshold}%</span>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-gray-500 uppercase">Weight</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="range" min={1} max={100}
                              value={wizardData.matchCriteria[field].weight}
                              onChange={e => setWizardData(d => ({ ...d, matchCriteria: { ...d.matchCriteria, [field]: { ...d.matchCriteria[field], weight: Number(e.target.value) } } }))}
                              className="flex-1 accent-[#2A53A0]"
                            />
                            <span className="text-sm font-bold text-[#2A53A0] w-12 text-right">{wizardData.matchCriteria[field].weight}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Step 3 – Result Configuration */}
            {wizardStep === 3 && (
              <div className="space-y-6">
                <p className="text-sm text-gray-500">Configure how screening results are handled and who is notified.</p>
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">Alert Threshold (%)</label>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">≥</span>
                      <input
                        type="number" min={50} max={100}
                        value={wizardData.alertThreshold}
                        onChange={e => setWizardData(d => ({ ...d, alertThreshold: Number(e.target.value) }))}
                        className="w-24 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/20"
                      />
                      <span className="text-sm text-gray-400">%</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">Alert Action</label>
                    <select
                      value={wizardData.alertAction}
                      onChange={e => setWizardData(d => ({ ...d, alertAction: e.target.value }))}
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/20"
                    >
                      {["Flag for Review", "Auto-Escalate to Case", "Notify Compliance Officer", "Block Transaction", "Generate STR"].map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">Notification Email (optional)</label>
                    <Input
                      type="email"
                      value={wizardData.notifyEmail}
                      onChange={e => setWizardData(d => ({ ...d, notifyEmail: e.target.value }))}
                      placeholder="compliance@yourbank.com"
                      className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus-visible:ring-[#2A53A0]"
                    />
                  </div>
                </div>
                {/* Summary */}
                <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-xl p-5 space-y-2">
                  <h4 className="text-sm font-bold text-[#2A53A0]">Configuration Summary</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400"><span className="font-semibold">Name:</span> {wizardData.name || "—"}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400"><span className="font-semibold">Purpose:</span> {wizardData.purpose}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400"><span className="font-semibold">Lists Selected:</span> {wizardData.selectedLists.length}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400"><span className="font-semibold">Alert Threshold:</span> ≥ {wizardData.alertThreshold}%</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Wizard Footer */}
        <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between shrink-0">
          <Button variant="outline" onClick={() => { setWizardStep(0); setPageMode("main"); }} className="h-9 rounded-[8px]">Cancel</Button>
          <div className="flex items-center gap-3">
            {wizardStep > 0 && (
              <Button variant="outline" onClick={() => setWizardStep(s => s - 1)} className="h-9 rounded-[8px]">Back</Button>
            )}
            {wizardStep < WIZARD_STEPS.length - 1 ? (
              <Button onClick={() => setWizardStep(s => s + 1)} disabled={!canNext}
                className="h-9 bg-[#2A53A0] hover:bg-[#1e3a70] text-white rounded-[8px] flex items-center gap-1.5">
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleWizardSubmit} className="h-9 bg-[#2A53A0] hover:bg-[#1e3a70] text-white rounded-[8px]">
                Create Watchlist
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── View / Edit Detail Page ───────────────────────────────────────────────
  if ((pageMode === "view" || pageMode === "edit") && selectedProfile) {
    const isEdit = pageMode === "edit";
    const [editData, setEditData] = useState<WatchlistProfile>(selectedProfile);

    const handleSaveEdit = () => {
      setProfiles(prev => prev.map(p => p.id === editData.id ? editData : p));
      setPageMode("main");
      setSelectedProfile(null);
    };

    const criteriaLabels: Record<string, string> = { primaryName: "Primary Name Match", dob: "DOB Match", address: "Address Match", nationality: "Nationality Match" };

    return (
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => { setPageMode("main"); setSelectedProfile(null); }} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{isEdit ? "Edit Configuration" : selectedProfile.name}</h1>
              <p className="text-xs text-gray-500 mt-0.5">Sanctions Screening Configuration</p>
            </div>
          </div>
          {isEdit ? (
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => { setPageMode("main"); setSelectedProfile(null); }} className="h-9 rounded-[8px]">Cancel</Button>
              <Button onClick={handleSaveEdit} className="h-9 bg-[#2A53A0] hover:bg-[#1e3a70] text-white rounded-[8px]">Save Configuration</Button>
            </div>
          ) : (
            <Button onClick={() => setPageMode("edit")} className="h-9 bg-[#2A53A0] hover:bg-[#1e3a70] text-white rounded-[8px]">
              <Edit className="w-4 h-4 mr-2" /> Edit Configuration
            </Button>
          )}
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div><p className="text-xs text-gray-400 uppercase font-semibold mb-1">Name</p>
                {isEdit ? <input className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/20 bg-white dark:bg-gray-800 dark:border-gray-700" value={editData.name} onChange={e => setEditData(d => ({ ...d, name: e.target.value }))} /> : <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedProfile.name}</p>}</div>
              <div><p className="text-xs text-gray-400 uppercase font-semibold mb-1">Type</p>
                <Badge variant="secondary" className={cn("text-xs px-2.5 py-0.5 font-medium", TYPE_BADGE[selectedProfile.type])}>{selectedProfile.type}</Badge></div>
              <div className="md:col-span-2"><p className="text-xs text-gray-400 uppercase font-semibold mb-1">Description</p>
                {isEdit ? <textarea rows={2} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/20 bg-white dark:bg-gray-800 dark:border-gray-700 resize-none" value={editData.description} onChange={e => setEditData(d => ({ ...d, description: e.target.value }))} /> : <p className="text-sm text-gray-600 dark:text-gray-400">{selectedProfile.description}</p>}</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Included Lists ({selectedProfile.includedLists.length})</h3>
            <div className="flex flex-wrap gap-2">
              {selectedProfile.includedLists.map(l => <Badge key={l} variant="outline" className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 px-3 py-1">{l}</Badge>)}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Match Criteria</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {(Object.entries(selectedProfile.matchCriteria) as any[]).map(([key, val]) => (
                <div key={key}>
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1">{criteriaLabels[key]}</p>
                  <div className="flex items-baseline gap-1"><span className="text-2xl font-bold text-gray-900 dark:text-white">{val.threshold}%</span><span className="text-xs text-gray-500">(Weight: {val.weight})</span></div>
                  <div className="mt-2 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className={cn("h-full rounded-full", val.threshold >= 90 ? "bg-red-500" : val.threshold >= 80 ? "bg-orange-400" : "bg-[#2A53A0]")} style={{ width: `${val.threshold}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Alert Configuration</h3>
            <div className="grid grid-cols-3 gap-6">
              <div><p className="text-xs text-gray-400 uppercase font-semibold mb-1">Alert Threshold</p><span className="text-sm font-semibold text-[#2A53A0] bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-lg">≥ {selectedProfile.stats.alertThreshold}%</span></div>
              <div><p className="text-xs text-gray-400 uppercase font-semibold mb-1">Total Screenings</p><p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedProfile.stats.totalScreenings.toLocaleString()}</p></div>
              <div><p className="text-xs text-gray-400 uppercase font-semibold mb-1">Alerts Generated</p><p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedProfile.stats.alertsGenerated.toLocaleString()}</p></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Table Page ───────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900/50 p-4">
      {/* Header Actions */}
      <div className="flex-none pb-4 space-y-3">
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-md flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#2A53A0] uppercase tracking-wide">
            Watchlist Configurations — Manage screening profiles with custom list combinations and match thresholds
          </h2>
        </div>
        <div className="flex items-center justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search profiles, types..."
              className="pl-9 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus-visible:ring-[#2A53A0]"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <div className="flex items-center gap-3 ml-4">
            <Button variant="outline" className="gap-2 bg-white dark:bg-gray-900 h-[46px]" onClick={() => setPageMode("lists-library")}>
              <Filter className="w-4 h-4" /> View Lists Library
            </Button>
            <Button variant="outline" className="gap-2 bg-white dark:bg-gray-900 h-[46px]">
              <Upload className="w-4 h-4" /> Upload List
            </Button>
            <Button className="gap-2 bg-[#2A53A0] hover:bg-[#2A53A0]/90 text-white h-[46px]" onClick={() => setPageMode("create-wizard")}>
              <Add className="w-4 h-4" /> Create Watchlist
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-hidden flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
        <div className="flex-1 overflow-auto">
          <Table>
            <thead className="sticky top-0 z-10 shadow-sm">
              <tr className="bg-[#F0F0F0] text-[#161616] h-[48px]">
                <th className="pl-4 px-4 font-bold text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[260px]">
                  <SortableHeader column="name" label="Profile Name" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-bold text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[140px]">
                  <SortableHeader column="type" label="Type" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-bold text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[80px]">Lists</th>
                <th className="px-4 font-bold text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-center w-[130px]">Primary Name</th>
                <th className="px-4 font-bold text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-center w-[120px]">Alert Threshold</th>
                <th className="px-4 font-bold text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-right w-[130px]">
                  <SortableHeader column="stats" label="Screenings" sortConfig={sortConfig} onSort={requestSort} className="justify-end" />
                </th>
                <th className="px-4 font-bold text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-right w-[110px]">Alerts</th>
                <th className="px-4 font-bold text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-center w-[100px]">Status</th>
                <th className="px-4 font-bold text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[130px]">Actions</th>
              </tr>
            </thead>
            <TableBody>
              {currentItems.length > 0 ? currentItems.map(profile => (
                <TableRow key={profile.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800 h-[56px]">
                  <TableCell className="pl-4 px-4 align-middle">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{profile.name}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{profile.lastUpdated}</p>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 align-middle">
                    <Badge variant="secondary" className={cn("text-xs px-2 py-0.5 font-medium whitespace-nowrap", TYPE_BADGE[profile.type])}>
                      {profile.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 align-middle text-center">
                    <span className="text-sm font-bold text-[#2A53A0]">{profile.includedLists.length}</span>
                  </TableCell>
                  <TableCell className="px-4 align-middle text-center">
                    <span className={cn(
                      "text-sm font-bold px-2 py-0.5 rounded",
                      profile.matchCriteria.primaryName.threshold >= 90 ? "bg-red-50 text-red-600" : "bg-orange-50 text-orange-600"
                    )}>
                      {profile.matchCriteria.primaryName.threshold}%
                    </span>
                  </TableCell>
                  <TableCell className="px-4 align-middle text-center">
                    <span className="text-sm font-semibold text-[#2A53A0] bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded">
                      ≥ {profile.stats.alertThreshold}%
                    </span>
                  </TableCell>
                  <TableCell className="px-4 align-middle text-right">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{profile.stats.totalScreenings.toLocaleString()}</span>
                  </TableCell>
                  <TableCell className="px-4 align-middle text-right">
                    <span className={cn("text-sm font-bold", profile.stats.alertsGenerated > 0 ? "text-orange-600" : "text-gray-400")}>
                      {profile.stats.alertsGenerated.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 align-middle">
                    <div className="flex items-center justify-center gap-1.5">
                      <Switch checked={profile.isActive} onCheckedChange={() => handleToggleActive(profile.id)} />
                      <span className={cn("text-xs font-medium", profile.isActive ? "text-green-600" : "text-gray-400")}>
                        {profile.isActive ? "Active" : "Off"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 align-middle">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => { setSelectedProfile(profile); setPageMode("view"); }}
                        className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#2A53A0]/10 hover:bg-[#2A53A0]/20 text-[#2A53A0] transition-colors" title="View Details">
                        <View className="w-4 h-4" />
                      </button>
                      <button onClick={() => { setSelectedProfile(profile); setPageMode("edit"); }}
                        className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#2A53A0]/10 hover:bg-[#2A53A0]/20 text-[#2A53A0] transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(profile.id)}
                        className="flex items-center justify-center w-8 h-8 rounded-sm bg-red-500/10 hover:bg-red-500/20 text-red-600 transition-colors" title="Delete">
                        <TrashCan className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center text-gray-500">No profiles found matching your search.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex-none">
          <CarbonPaginationFooter pageSize={pageSize} setPageSize={setPageSize} currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={totalItems} />
        </div>
      </div>
    </div>
  );
}
