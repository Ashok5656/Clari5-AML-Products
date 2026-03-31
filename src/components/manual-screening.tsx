import { useState, useEffect } from "react";
import { 
  Search, 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Calendar,
  ChevronDown,
  Plane,
  RotateCcw,
  ArrowLeft,
  Eye,
  MoreVertical,
  Filter,
  Download,
  ShieldAlert,
  User,
  Building2,
  Ban,
  Flag,
  ArrowUpDown,
  ListFilter,
  ExternalLink,
  Info,
  Ship,
  Anchor,
  Activity,
  Bot,
  Zap,
  Sparkles,
  History,
  Fingerprint,
  Gavel,
  Globe,
  MessageSquareText,
  AlertOctagon,
  FileCheck,
  TrendingUp,
  Scale
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { cn } from "./ui/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Checkbox } from "./ui/checkbox";

interface ManualScreeningProps {
  breadcrumbs?: any[];
  onBreadcrumbNavigate?: (path: string) => void;
}

// Mock Data for Results
const MOCK_RESULTS = [
  {
    id: "M-2024-001",
    custId: "CUST-88291",
    name: "Muhammad Al-Thani",
    originalName: "محمد آل ثاني",
    matchedLists: 3,
    score: 95,
    topList: "UAE Compliance Watchlist",
    category: "Sanctions",
    type: "Individual",
    matchDate: "21-01-2026",
    status: "Potential Match"
  },
  {
    id: "M-2024-002",
    custId: "CUST-11234",
    name: "Mohammed Bin Ali",
    originalName: "محمد بن علي",
    matchedLists: 1,
    score: 88,
    topList: "UN Security Council",
    category: "PEP",
    type: "Individual",
    matchDate: "21-01-2026",
    status: "Potential Match"
  },
  {
    id: "M-2024-003",
    custId: "CUST-99210",
    name: "Al Muhammad Trading LLC",
    originalName: "شركة المحمد للتجارة",
    matchedLists: 2,
    score: 76,
    topList: "OFAC SDN List",
    category: "Embargo",
    type: "Organization",
    matchDate: "21-01-2026",
    status: "Potential Match"
  },
  {
    id: "M-2024-004",
    custId: "CUST-45120",
    name: "Ahmad Hassan",
    originalName: "أحمد حسن",
    matchedLists: 1,
    score: 65,
    topList: "EU Consolidated List",
    category: "Sanctions",
    type: "Individual",
    matchDate: "21-01-2026",
    status: "Potential Match"
  },
  {
    id: "M-2024-005",
    custId: "CUST-78901",
    name: "Global Shipping Corp",
    originalName: "شركة الشحن العالمية",
    matchedLists: 4,
    score: 92,
    topList: "OFAC SDN List",
    category: "Embargo",
    type: "Organization",
    matchDate: "21-01-2026",
    status: "Potential Match"
  },
  {
    id: "M-2024-006",
    custId: "CUST-33211",
    name: "Elena Petrova",
    originalName: "Елена Петрова",
    matchedLists: 2,
    score: 81,
    topList: "UK HMT Sanctions",
    category: "Sanctions",
    type: "Individual",
    matchDate: "21-01-2026",
    status: "Potential Match"
  }
];

// Mock Data for Detailed Matches
const MOCK_MATCH_DETAILS: Record<string, any[]> = {
  "M-2024-001": [
    {
      watchlistName: "UAE Local Lists (Terrorist & Sanction)",
      watchlistKey: "UAE_004",
      score: 97,
      category: "Sanctions",
      subCategory: "Terrorist & Sanction",
      url: "https://www.uaecabinet.ae/en/sanctions",
      source: "UAE Cabinet",
      furtherInfo: "United Arab Emirates designated terrorist and sanctioned entities list maintained by the UAE Cabinet. Cabinet Resolution No. (18) of 2017",
      details: [
        { attribute: "Name", customer: "MUHAMMAD", watchlist: "IBRAHIM ISA HAJJI MUHAMMAD AL-BAKR", score: 95, weight: 60 },
        { attribute: "ID Number", customer: "SCR-2026012100724", watchlist: "01016648", score: 0, weight: 0 },
        { attribute: "Nationality", customer: "Qatar", watchlist: "Qatar", score: 100, weight: 40 }
      ]
    },
    {
      watchlistName: "UAE Local Lists (Terrorist & Sanction)",
      watchlistKey: "UAE_008",
      score: 97,
      category: "Sanctions",
      subCategory: "Terrorist & Sanction",
      url: "https://www.uaecabinet.ae/en/sanctions",
      source: "UAE Cabinet",
      furtherInfo: "United Arab Emirates designated terrorist and sanctioned entities list maintained by the UAE Cabinet. Cabinet Resolution No. (18) of 2017",
      details: [
        { attribute: "Name", customer: "MUHAMMAD", watchlist: "SAD BIN SAD MUHAMMAD SHARIAN AL-KABI", score: 95, weight: 60 },
        { attribute: "ID Number", customer: "SCR-2026012100724", watchlist: "N/A", score: 0, weight: 0 },
        { attribute: "Nationality", customer: "Qatar", watchlist: "Qatar", score: 100, weight: 40 }
      ]
    },
    {
      watchlistName: "UN Security Council Consolidated List",
      watchlistKey: "UN_SC_201",
      score: 85,
      category: "Sanctions",
      subCategory: "UN Sanctions",
      url: "https://sc.un.org/sanctions",
      source: "UN Security Council",
      furtherInfo: "Consolidated List of individuals and entities subject to sanctions measures imposed by the UN Security Council.",
      details: [
        { attribute: "Name", customer: "MUHAMMAD", watchlist: "MUHAMMAD AL-THANI", score: 85, weight: 60 },
        { attribute: "ID Number", customer: "SCR-2026012100724", watchlist: "N/A", score: 0, weight: 0 },
        { attribute: "Nationality", customer: "Qatar", watchlist: "Qatar", score: 100, weight: 40 }
      ]
    }
  ],
  "M-2024-002": [
    {
      watchlistName: "UN Security Council Consolidated List",
      watchlistKey: "UN_SC_998",
      score: 88,
      category: "PEP",
      subCategory: "Politically Exposed Person",
      url: "https://sc.un.org/sanctions",
      source: "UN Security Council",
      furtherInfo: "Individuals holding prominent public functions.",
      details: [
        { attribute: "Name", customer: "Mohammed Bin Ali", watchlist: "MOHAMMED BIN ALI AL-KHATIB", score: 88, weight: 60 },
        { attribute: "Nationality", customer: "UAE", watchlist: "UAE", score: 100, weight: 40 }
      ]
    }
  ],
  "M-2024-003": [
    {
      watchlistName: "OFAC SDN List",
      watchlistKey: "OFAC_SDN_112",
      score: 76,
      category: "Embargo",
      subCategory: "Specially Designated Nationals",
      url: "https://sanctionssearch.ofac.treas.gov/",
      source: "US Treasury",
      furtherInfo: "Specially Designated Nationals and Blocked Persons list.",
      details: [
        { attribute: "Name", customer: "Al Muhammad Trading LLC", watchlist: "AL-MUHAMMAD TRADING COMPANY", score: 76, weight: 70 },
        { attribute: "Country", customer: "Qatar", watchlist: "Qatar", score: 100, weight: 30 }
      ]
    },
    {
      watchlistName: "EU Consolidated List",
      watchlistKey: "EU_FS_554",
      score: 72,
      category: "Sanctions",
      subCategory: "Financial Sanctions",
      url: "https://data.europa.eu/euodp/en/data/dataset/consolidated-list-of-persons-groups-and-entities-subject-to-eu-financial-sanctions",
      source: "European Union",
      furtherInfo: "Consolidated list of persons, groups and entities subject to EU financial sanctions.",
      details: [
        { attribute: "Name", customer: "Al Muhammad Trading LLC", watchlist: "MUHAMMAD TRADING ESTABLISHMENT", score: 70, weight: 70 },
        { attribute: "Country", customer: "Qatar", watchlist: "Qatar", score: 100, weight: 30 }
      ]
    }
  ],
  "M-2024-004": [
    {
      watchlistName: "EU Consolidated List",
      watchlistKey: "EU_FS_889",
      score: 65,
      category: "Sanctions",
      subCategory: "Financial Sanctions",
      url: "https://data.europa.eu/euodp/en/data/dataset/consolidated-list-of-persons-groups-and-entities-subject-to-eu-financial-sanctions",
      source: "European Union",
      furtherInfo: "Consolidated list of persons, groups and entities subject to EU financial sanctions.",
      details: [
        { attribute: "Name", customer: "Ahmad Hassan", watchlist: "AHMAD HASAN", score: 65, weight: 60 },
        { attribute: "Nationality", customer: "Syria", watchlist: "Syria", score: 100, weight: 40 }
      ]
    }
  ],
  "M-2024-005": [
    {
      watchlistName: "OFAC SDN List",
      watchlistKey: "OFAC_SDN_445",
      score: 92,
      category: "Embargo",
      subCategory: "Specially Designated Nationals",
      url: "https://sanctionssearch.ofac.treas.gov/",
      source: "US Treasury",
      furtherInfo: "Specially Designated Nationals and Blocked Persons list.",
      details: [
        { attribute: "Name", customer: "Global Shipping Corp", watchlist: "GLOBAL SHIPPING CORPORATION", score: 95, weight: 70 },
        { attribute: "Country", customer: "Iran", watchlist: "Iran", score: 100, weight: 30 }
      ]
    },
    {
      watchlistName: "UN Security Council Consolidated List",
      watchlistKey: "UN_SC_551",
      score: 88,
      category: "Sanctions",
      subCategory: "UN Sanctions",
      url: "https://sc.un.org/sanctions",
      source: "UN Security Council",
      furtherInfo: "Consolidated List of individuals and entities subject to sanctions measures imposed by the UN Security Council.",
      details: [
        { attribute: "Name", customer: "Global Shipping Corp", watchlist: "GLOBAL MARITIME SHIPPING", score: 85, weight: 60 },
        { attribute: "Country", customer: "Iran", watchlist: "Iran", score: 100, weight: 40 }
      ]
    },
    {
      watchlistName: "EU Consolidated List",
      watchlistKey: "EU_FS_223",
      score: 80,
      category: "Sanctions",
      subCategory: "Financial Sanctions",
      url: "https://data.europa.eu/euodp/en/data/dataset/consolidated-list-of-persons-groups-and-entities-subject-to-eu-financial-sanctions",
      source: "European Union",
      furtherInfo: "Consolidated list of persons, groups and entities subject to EU financial sanctions.",
      details: [
        { attribute: "Name", customer: "Global Shipping Corp", watchlist: "GLOBAL TRANSPORT & SHIPPING", score: 75, weight: 70 },
        { attribute: "Country", customer: "Iran", watchlist: "Iran", score: 100, weight: 30 }
      ]
    },
    {
      watchlistName: "UK HMT Sanctions",
      watchlistKey: "UK_HMT_112",
      score: 75,
      category: "Sanctions",
      subCategory: "Financial Sanctions",
      url: "https://www.gov.uk/government/publications/financial-sanctions-consolidated-list-of-targets",
      source: "HM Treasury",
      furtherInfo: "Consolidated List of Financial Sanctions Targets in the UK.",
      details: [
        { attribute: "Name", customer: "Global Shipping Corp", watchlist: "GLOBAL SHIPPING LINES", score: 70, weight: 70 },
        { attribute: "Country", customer: "Iran", watchlist: "Iran", score: 100, weight: 30 }
      ]
    }
  ],
  "M-2024-006": [
    {
      watchlistName: "UK HMT Sanctions",
      watchlistKey: "UK_HMT_778",
      score: 81,
      category: "Sanctions",
      subCategory: "Financial Sanctions",
      url: "https://www.gov.uk/government/publications/financial-sanctions-consolidated-list-of-targets",
      source: "HM Treasury",
      furtherInfo: "Consolidated List of Financial Sanctions Targets in the UK.",
      details: [
        { attribute: "Name", customer: "Elena Petrova", watchlist: "ELENA PETROVNA", score: 80, weight: 60 },
        { attribute: "Nationality", customer: "Russia", watchlist: "Russia", score: 100, weight: 40 }
      ]
    },
    {
      watchlistName: "EU Consolidated List",
      watchlistKey: "EU_FS_991",
      score: 75,
      category: "Sanctions",
      subCategory: "Financial Sanctions",
      url: "https://data.europa.eu/euodp/en/data/dataset/consolidated-list-of-persons-groups-and-entities-subject-to-eu-financial-sanctions",
      source: "European Union",
      furtherInfo: "Consolidated list of persons, groups and entities subject to EU financial sanctions.",
      details: [
        { attribute: "Name", customer: "Elena Petrova", watchlist: "ELENA VIKTOROVNA PETROVA", score: 70, weight: 60 },
        { attribute: "Nationality", customer: "Russia", watchlist: "Russia", score: 100, weight: 40 }
      ]
    }
  ]
};

import { useSortableData } from "../hooks/use-sortable-data";
import { SortableHeader } from "./ui/sortable-header";

export function ManualScreening({ breadcrumbs, onBreadcrumbNavigate }: ManualScreeningProps) {
  const [view, setView] = useState<"form" | "results" | "details">("form");
  const [activeTab, setActiveTab] = useState("individual");
  const [detailsTab, setDetailsTab] = useState("ai-summary");
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  
  // Form State - Empty by default
  const [entityType, setEntityType] = useState("individual");
  const [watchlistProfile, setWatchlistProfile] = useState("");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    primaryName: "",
    originalName: "",
    alias: "",
    gender: "",
    idType: "",
    idNumber: "",
    dob: "",
    nationality: "",
    countryBirth: "",
    residence: "",
    address: "",
    jointAccountHolder: "",
    purpose: "",
    // Non-Individuals specific
    industry: "",
    registrationType: "",
    taxId: "",
    registeredAddress: "",
    operatingCountries: "",
    corporateShareholders: "",
    directors: "",
    trustees: "",
    // Vessel specific
    vesselType: "",
    callSign: "",
    flagState: "",
    imoNumber: ""
  });

  // Derived state for form validation
  const isFormValid = formData.primaryName.trim() !== "" && formData.purpose !== "" && watchlistProfile !== "";
  const isBulkValid = uploadedFile !== null && watchlistProfile !== "";

  // Filters State
  const [filters, setFilters] = useState({
    topList: [] as string[],
    category: [] as string[],
    type: [] as string[]
  });

  // Per-row action state defaulting to "Under Review"
  const [rowActions, setRowActions] = useState<Record<string, string>>(
    () => Object.fromEntries(MOCK_RESULTS.map(r => [r.id, "Under Review"]))
  );

  const handleStartScreening = () => {
    setView("results");
  };

  const handleBackToSearch = () => {
    setView("form");
    setFilters({ topList: [], category: [], type: [] });
  };

  const handleBackToResults = () => {
    setView("results");
    setSelectedMatchId(null);
  };

  const handleViewDetails = (id: string) => {
    setSelectedMatchId(id);
    setView("details");
  };

  const resetForm = () => {
    setFormData({
      primaryName: "",
      originalName: "",
      alias: "",
      gender: "",
      idType: "",
      idNumber: "",
      dob: "",
      nationality: "",
      countryBirth: "",
      residence: "",
      purpose: "",
      industry: "",
      registrationType: "",
      vesselType: "",
      callSign: "",
      flagState: "",
      imoNumber: ""
    });
    setWatchlistProfile("");
  };

  const handleFileUpload = () => {
    // Simulating file upload
    setUploadedFile("bulk_entities_sample.csv");
  };

  const removeUploadedFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedFile(null);
  };

  // Filter Logic
  const filteredResults = MOCK_RESULTS.filter(result => {
    if (filters.topList.length > 0 && !filters.topList.includes(result.topList)) return false;
    if (filters.category.length > 0 && !filters.category.includes(result.category)) return false;
    if (filters.type.length > 0 && !filters.type.includes(result.type)) return false;
    return true;
  });

  const uniqueTopLists = Array.from(new Set(MOCK_RESULTS.map(r => r.topList)));
  const uniqueCategories = Array.from(new Set(MOCK_RESULTS.map(r => r.category)));
  const uniqueTypes = Array.from(new Set(MOCK_RESULTS.map(r => r.type)));

  const { items: sortedResults, requestSort, sortConfig } = useSortableData(filteredResults);

  const FilterPopover = ({ title, options, selected, onChange }: { title: string, options: string[], selected: string[], onChange: (val: string[]) => void }) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#1e3a70] group">
            {title}
            <ListFilter className={cn("size-4 text-gray-400 group-hover:text-[#1e3a70]", selected.length > 0 && "text-[#2A53A0] fill-[#2A53A0]/20")} />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-60 p-2" align="start">
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-900 border-b pb-2 mb-2">Filter by {title}</h4>
            {options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox 
                  id={`${title}-${option}`}
                  checked={selected.includes(option)}
                  onCheckedChange={(checked) => {
                    if (checked) onChange([...selected, option]);
                    else onChange(selected.filter((s) => s !== option));
                  }}
                />
                <label 
                  htmlFor={`${title}-${option}`} 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-700"
                >
                  {option}
                </label>
              </div>
            ))}
             {selected.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full text-xs h-7 mt-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => onChange([])}
                >
                  Clear Filters
                </Button>
             )}
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  // --- DETAILS VIEW ---
  if (view === "details" && selectedMatchId) {
    const mainResult = MOCK_RESULTS.find(r => r.id === selectedMatchId);
    const details = MOCK_MATCH_DETAILS[selectedMatchId] || MOCK_MATCH_DETAILS["M-2024-001"]; 
    
    // Extract Customer Details from the first match (assuming constant for the screening)
    const customerDetails = details[0]?.details.map((d: any) => ({
      attribute: d.attribute,
      value: d.customer
    })) || [];

    return (
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-4 flex items-center justify-between shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleBackToResults} className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <ArrowLeft className="size-5 text-gray-600 dark:text-gray-400" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Match Review</h1>
              <p className="text-xs text-gray-500">
                Ref ID: <span className="font-mono text-gray-700">{selectedMatchId}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="h-[40px] rounded-[8px] border-gray-300 dark:border-gray-700">
                <Download className="size-4 mr-2" /> Report
             </Button>
             <div className="h-6 w-px bg-gray-300" />
             <Button className="h-[40px] bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-[8px]">
                <CheckCircle className="size-4 mr-2 text-green-600" /> False Positive
             </Button>
             <Button className="h-[40px] bg-[#2A53A0] hover:bg-[#1e3a70] text-white rounded-[8px]">
                <AlertTriangle className="size-4 mr-2" /> Confirm Match
             </Button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 shrink-0">
          <div className="flex items-center gap-8 h-12">
            <button 
              onClick={() => setDetailsTab("ai-summary")}
              className={cn(
                "h-full px-1 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2",
                detailsTab === "ai-summary" 
                  ? "border-[#2A53A0] text-[#2A53A0]" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}
            >
              <Sparkles className={cn("size-4", detailsTab === "ai-summary" ? "text-[#2A53A0]" : "text-gray-400")} />
              AI Summary
            </button>
            <button 
              onClick={() => setDetailsTab("match-details")}
              className={cn(
                "h-full px-1 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2",
                detailsTab === "match-details" 
                  ? "border-[#2A53A0] text-[#2A53A0]" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}
            >
              <ListFilter className={cn("size-4", detailsTab === "match-details" ? "text-[#2A53A0]" : "text-gray-400")} />
              Match Details
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {detailsTab === "ai-summary" ? (
            <div className="p-4 space-y-4">
              {/* Critical Alert Box */}
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-lg p-4 flex items-start gap-4">
                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                  <AlertOctagon className="size-5 text-red-600" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-red-800 dark:text-red-400">High-Confidence Sanctions Match — Immediate Action Required</h4>
                  <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed">
                    {mainResult?.name} ({mainResult?.custId}) has returned <span className="font-bold">{details.length} watchlist hits</span> — 2 on the UAE Cabinet Terrorist & Sanctions list (Critical, 97%) and 1 on the UN Security Council Consolidated List (High, 85%). Legal obligations apply. Do not transact until resolved.
                  </p>
                </div>
              </div>

              {/* AI Investigation Narrative */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <History className="size-4 text-[#2A53A0]" />
                    <h3 className="text-xs font-bold text-[#2A53A0] uppercase tracking-widest">AI Investigation Narrative</h3>
                    <div className="flex items-center gap-1 ml-2">
                      <Badge variant="outline" className="text-[10px] h-5 bg-gray-50 border-gray-200">GenAI</Badge>
                      <Badge variant="outline" className="text-[10px] h-5 bg-gray-50 border-gray-200">GPT-4o</Badge>
                      <Badge variant="outline" className="text-[10px] h-5 bg-blue-50 text-[#2A53A0] border-blue-100">Confidence: High</Badge>
                    </div>
                  </div>
                </div>

                <div className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300 space-y-4 bg-white dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                  <p>
                    The customer <span className="font-bold text-[#2A53A0] underline decoration-blue-200 underline-offset-4">{mainResult?.name} ({mainResult?.custId}, {formData.nationality === 'qa' ? 'Qatari' : 'Qatari'} national)</span> has produced an overall risk score of <span className="font-bold text-red-600 bg-red-50 px-1 rounded">{mainResult?.score}/100 (Critical)</span> across {details.length} watchlist hits. The two highest-scoring hits originate from the <span className="font-bold bg-red-50 px-1 rounded text-red-700">UAE Cabinet Resolution No. 18 of 2017</span> — a mandatory government list designating terrorists and sanctioned entities in the UAE. Any financial activity involving a designated individual on this list constitutes a criminal offence under UAE AML law.
                  </p>
                  <p>
                    The matched entities are <span className="italic">IBRAHIM ISA HAJJI MUHAMMAD AL-BAKR</span> (97%) and <span className="italic">SAD BIN SAD MUHAMMAD SHARIAN AL-KABI</span> (97%), both Qatari nationals. The third hit is <span className="italic">MUHAMMAD AL-THANI</span> on the <span className="font-semibold text-orange-700 bg-orange-50 px-1 rounded">UN Security Council Consolidated List</span> (85%) — carrying international asset-freeze obligations. Across all three hits, <span className="font-bold bg-orange-50 px-1 rounded">Qatari nationality scored 100%</span>, and name similarity ranged from 85%–95%. No ID number was available for screening, meaning these matches <span className="bg-yellow-100 px-1 rounded font-medium">cannot be ruled out through existing record data alone</span>.
                  </p>
                  <p>
                    The absence of documentary ID evidence, combined with dual mandatory-list exposure and a 95/100 risk score, makes this a <span className="font-bold text-red-600 underline decoration-red-200 underline-offset-4">non-dismissible match</span>. <span className="font-bold text-green-700">Recommended action: escalate to a sanctions case immediately and initiate EDD to collect identity documentation</span> (passport/Emirates ID) to attempt disambiguation.
                  </p>
                </div>
              </div>

              {/* Key Risk Signals Grid */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                  <Gavel className="size-3" /> Key Risk Signals
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex gap-4 shadow-sm group hover:border-[#2A53A0]/30 transition-all">
                    <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                      <Ban className="size-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">UAE Cabinet Terrorist Designation</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">2 Critical hits on UAE Cabinet Resolution 18 of 2017. Transacting with a designated entity is a criminal offence.</p>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex gap-4 shadow-sm group hover:border-[#2A53A0]/30 transition-all">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <Globe className="size-6 text-[#2A53A0]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">UN Security Council Sanctions</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">International asset freeze obligation. Financial institutions must freeze assets and report without delay.</p>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex gap-4 shadow-sm group hover:border-[#2A53A0]/30 transition-all">
                    <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                      <div className="text-xs font-black text-orange-600">QA</div>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">Nationality Match: 100% Across All Hits</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">Qatari nationality is the top-scoring attribute in all 3 hits. No differentiation possible without ID evidence.</p>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex gap-4 shadow-sm group hover:border-[#2A53A0]/30 transition-all">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                      <Fingerprint className="size-6 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">No ID Provided — Cannot Disambiguate</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">Missing ID number prevents documentary exclusion. EDD required before any determination of false positive.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Breakdown and Exposure */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Attribute Match Breakdown */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Attribute Match Breakdown</h3>
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                    <Table>
                      <TableHeader className="bg-gray-50/50">
                        <TableRow className="h-10">
                          <TableHead className="text-[10px] font-bold uppercase py-0">Attribute</TableHead>
                          <TableHead className="text-[10px] font-bold uppercase py-0">Submitted Value</TableHead>
                          <TableHead className="text-[10px] font-bold uppercase py-0 text-right">Best Score</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="h-12">
                          <TableCell className="text-sm font-bold text-gray-900 dark:text-white">Name</TableCell>
                          <TableCell className="text-sm text-gray-500 font-mono">MUHAMMAD</TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-3">
                              <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-red-600 rounded-full" style={{ width: '95%' }} />
                              </div>
                              <span className="text-xs font-bold text-red-600">95%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow className="h-12">
                          <TableCell className="text-sm font-bold text-gray-900 dark:text-white">Nationality</TableCell>
                          <TableCell className="text-sm text-gray-500 font-mono">Qatar</TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-3">
                              <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-red-700 rounded-full" style={{ width: '100%' }} />
                              </div>
                              <span className="text-xs font-bold text-red-700">100%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow className="h-12">
                          <TableCell className="text-sm font-bold text-gray-900 dark:text-white">ID Number</TableCell>
                          <TableCell className="text-sm text-gray-400 italic">Not provided</TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-3 opacity-20">
                              <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden" />
                              <span className="text-xs font-bold">0%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow className="h-12 border-b-0">
                          <TableCell className="text-sm font-bold text-gray-900 dark:text-white">Date of Birth</TableCell>
                          <TableCell className="text-sm text-gray-400 italic">Not provided</TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-3 opacity-20">
                              <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden" />
                              <span className="text-xs font-bold">0%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* List Exposure */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">List Exposure</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-end">
                        <div className="space-y-0.5">
                          <div className="text-sm font-bold text-gray-900 dark:text-white">UAE Local Lists (Terrorist & Sanction)</div>
                          <div className="text-[10px] text-gray-400 font-medium">UAE Cabinet • Mandatory</div>
                        </div>
                        <div className="text-xs font-bold text-red-700 uppercase">2 hits</div>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-red-600 rounded-full" style={{ width: '80%' }} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-end">
                        <div className="space-y-0.5">
                          <div className="text-sm font-bold text-gray-900 dark:text-white">UN Security Council Consolidated</div>
                        </div>
                        <div className="text-xs font-bold text-orange-600 uppercase">1 hit</div>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 rounded-full" style={{ width: '40%' }} />
                      </div>
                      <div className="text-[10px] text-gray-400 font-medium">UN Security Council • International</div>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-lg p-3 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-red-800 dark:text-red-400 uppercase">
                        <AlertTriangle className="size-3" /> Both lists carry zero-tolerance obligations
                      </div>
                      <p className="text-[11px] text-red-700 dark:text-red-300">Assets must be frozen and STR filed with the Financial Intelligence Unit.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Recommended Action */}
              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-xl p-6 shadow-sm overflow-hidden relative">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#2A53A0] flex items-center justify-center shrink-0 shadow-lg">
                    <ShieldAlert className="size-8 text-white" />
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-[#2A53A0]">AI Recommended Action: Escalate to Sanctions Case</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        Given Critical-level UAE Cabinet exposure, UN Security Council sanctions, missing ID for disambiguation, and a 95/100 risk score — this match cannot be treated as a false positive. Escalate immediately, freeze any active transactions, and initiate EDD to collect identity documents.
                      </p>
                    </div>
                    <Button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm h-9 rounded-lg px-4 text-xs font-bold flex items-center gap-2">
                      <FileText className="size-3.5 text-blue-600" />
                      Export Summary PDF
                    </Button>
                  </div>
                </div>
              </div>

              {/* Footer Metadata */}
              <div className="flex items-center justify-between px-1 py-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-4 text-[10px] font-medium text-gray-400 uppercase tracking-widest">
                  <div className="flex items-center gap-1.5">
                    <div className="size-1.5 rounded-full bg-green-500" />
                    AI analysis generated in 1.2s
                  </div>
                  <div>Model: GPT-4o</div>
                  <div>Based on 3 watchlist hits</div>
                </div>
                <div className="text-[10px] font-medium text-gray-400 italic">
                  AI summaries are advisory — always verify with full match details before regulatory action
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              
              {/* Status Details Section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#2A53A0]" />
                  Status Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/20">
                    <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Overall Risk Score</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-[#2A53A0]">{mainResult?.score}</span>
                      <span className="text-sm text-gray-500">/ 100</span>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Status</div>
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-sm px-3 py-1">
                      {mainResult?.status}
                    </Badge>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Total Matches</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{details.length}</div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                     <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Highest Match</div>
                     <div className="text-lg font-bold text-gray-900 dark:text-white truncate">{details[0]?.watchlistName}</div>
                  </div>
                </div>
              </div>

              {/* Match Details (Customer Profile) Section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#2A53A0]" />
                  Match Details (Screened Subject)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {customerDetails.map((item: any, idx: number) => (
                    <div key={idx} className="space-y-1">
                      <span className="text-xs font-medium text-gray-500 uppercase">{item.attribute}</span>
                      <div className="font-semibold text-gray-900 dark:text-white text-base break-words">
                        {item.value || "-"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-200 dark:bg-gray-700 my-2" />
              
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 px-1">
                Watchlist Hits ({details.length})
              </h3>

              {/* Watchlist Hits List */}
              <div className="space-y-4">
                {details.map((match, index) => (
                  <Card key={index} className="border border-gray-200 shadow-sm overflow-hidden group hover:border-[#2A53A0]/50 transition-colors">
                    <CardContent className="p-0">
                      {/* Match Header Info */}
                      <div className="p-5 bg-white dark:bg-gray-800 grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Left: Score & Basic Info */}
                        <div className="lg:col-span-3 flex flex-col justify-center border-r border-gray-100 dark:border-gray-700 pr-6">
                          <div className="flex items-center gap-3 mb-2">
                             <div className={cn(
                               "w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm",
                               match.score >= 90 ? "bg-red-600" : match.score >= 70 ? "bg-orange-500" : "bg-yellow-500"
                             )}>
                               {match.score}%
                             </div>
                             <div>
                               <p className="text-xs text-gray-500 font-medium uppercase">Match Score</p>
                               <Badge variant="outline" className={cn(
                                 "mt-0.5 border-0 font-semibold px-2 py-0.5", 
                                 match.score >= 90 ? "bg-red-50 text-red-700" : "bg-orange-50 text-orange-700"
                               )}>
                                 {match.score >= 90 ? "Critical" : "High"}
                               </Badge>
                             </div>
                          </div>
                        </div>

                        {/* Middle: Watchlist Details */}
                        <div className="lg:col-span-6 space-y-3">
                          <div>
                            <h4 className="text-lg font-bold text-[#2A53A0] mb-1 flex items-center gap-2">
                              {match.watchlistName}
                              <a href={match.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#2A53A0]">
                                <ExternalLink className="size-3" />
                              </a>
                            </h4>
                            <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-300">
                               <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-xs font-medium">{match.category}</span>
                               <span className="text-gray-300">•</span>
                               <span>{match.source}</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                            {match.furtherInfo}
                          </p>
                        </div>

                        {/* Right: Actions */}
                        <div className="lg:col-span-3 flex flex-col justify-center items-end gap-2 pl-4 border-l border-gray-100 dark:border-gray-700">
                           <Button variant="outline" size="sm" className="w-full justify-start text-xs h-8">
                             <FileText className="w-3 h-3 mr-2" /> View Full Profile
                           </Button>
                           <Button variant="outline" size="sm" className="w-full justify-start text-xs h-8">
                             <ShieldAlert className="size-3 h-3 mr-2" /> Escalate Case
                           </Button>
                        </div>
                      </div>

                      {/* Simplified Comparison Table */}
                      <div className="bg-gray-50/50 dark:bg-gray-900/30 border-t border-gray-100 dark:border-gray-700">
                        <Table>
                          <TableHeader>
                            <TableRow className="h-8 hover:bg-transparent border-b-gray-200">
                              <TableHead className="h-8 text-xs font-bold uppercase w-1/4 pl-6">Attribute</TableHead>
                              <TableHead className="h-8 text-xs font-bold uppercase w-1/2">Watchlist Value</TableHead>
                              <TableHead className="h-8 text-xs font-bold uppercase text-center">Score</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {match.details.map((detail: any, i: number) => (
                              <TableRow key={i} className="hover:bg-white dark:hover:bg-gray-800 border-b-gray-100 h-10">
                                <TableCell className="text-xs font-medium text-gray-500 pl-6">{detail.attribute}</TableCell>
                                <TableCell className="text-sm font-semibold text-gray-900 dark:text-white break-all">
                                  {detail.watchlist}
                                </TableCell>
                                <TableCell className="text-center">
                                   <span className={cn(
                                     "text-xs font-bold px-2 py-0.5 rounded",
                                     detail.score >= 90 ? "bg-red-100 text-red-700" : detail.score === 0 ? "bg-gray-100 text-gray-400" : "bg-orange-100 text-orange-700"
                                   )}>{detail.score}%</span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (view === "results") {
    return (
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleBackToSearch} className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <ArrowLeft className="size-5 text-gray-600 dark:text-gray-400" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Screening Results</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="h-[46px] rounded-[8px] border-gray-300 dark:border-gray-700">
                <Download className="size-4 mr-2" /> Export Report
             </Button>
             <Button onClick={handleBackToSearch} className="h-[46px] bg-[#2A53A0] hover:bg-[#1e3a70] text-white rounded-[8px]">
                <Search className="size-4 mr-2" /> New Screening
             </Button>
          </div>
        </div>

        {/* Results Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Search Criteria Summary */}
          <div className="w-full bg-white dark:bg-gray-900 rounded-[8px] border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
             <div className="flex flex-wrap gap-6 items-center">
                <div className="space-y-1">
                   <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Primary Name</span>
                   <div className="text-lg font-bold text-gray-900 dark:text-white">{formData.primaryName || "MUHAMMAD"}</div>
                </div>
                <div className="h-8 w-px bg-gray-200 dark:bg-gray-800" />
                <div className="space-y-1">
                   <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Nationality</span>
                   <div className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                      <span className="text-lg">{formData.nationality === 'qa' ? 'Qatar' : formData.nationality || 'Qatar'}</span>
                      {formData.nationality === 'qa' && <img src="https://flagcdn.com/w20/qa.png" alt="Qatar Flag" className="h-4 w-6 object-cover rounded shadow-sm" />}
                   </div>
                </div>
                <div className="h-8 w-px bg-gray-200 dark:bg-gray-800" />
                <div className="space-y-1">
                   <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Watchlist Profile</span>
                   <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-[#2A53A0] hover:bg-blue-200 border-0 rounded-full px-3">UAE Compliance Watchlist</Badge>
                   </div>
                </div>
                <div className="h-8 w-px bg-gray-200 dark:bg-gray-800" />
                <div className="space-y-1">
                   <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Purpose</span>
                   <div className="font-medium text-gray-900 dark:text-white">Periodic Review</div>
                </div>
             </div>
          </div>

          {/* AI Screening Summary Section */}
          <Card className="border border-[#2A53A0]/30 shadow-md bg-white dark:bg-gray-900 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#2A53A0]" />
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* AI Text Analysis */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#2A53A0]/10 flex items-center justify-center">
                      <Bot className="size-6 text-[#2A53A0]" />
                    </div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-[#2A53A0] text-sm uppercase tracking-wider">AI Screening Summary</h3>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[10px] font-bold text-gray-500 uppercase">
                        GENAI • GPT-4O
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
                    <p>
                      Screening for <span className="font-bold text-[#2A53A0] bg-[#2A53A0]/5 px-1 rounded">MUHAMMAD (Qatar)</span> returned <span className="font-bold text-red-600 bg-red-50 px-1 rounded">6 potential customer matches</span> across active watchlists. <span className="font-bold text-red-700">2 records are Critical</span> (≥90% score) — both linked to the <span className="font-bold bg-red-50 px-1 rounded">UAE Cabinet Terrorist & Sanctions list</span>, which carries mandatory legal obligations.
                    </p>
                    <p>
                      <span className="font-bold text-orange-600">3 records are High severity</span> spanning OFAC SDN, UN Security Council, and EU Consolidated lists. <span className="font-bold text-[#2A53A0]">1 record is Medium risk</span> on the EU list requiring further review.
                    </p>
                    <p>
                      Nationality <span className="font-semibold text-gray-900 dark:text-white">(Qatar)</span> is the <span className="font-bold bg-yellow-50 text-yellow-800 px-1 rounded">strongest common match driver</span> across all 6 results — ID number was not provided, limiting disambiguation. <span className="text-green-600 font-medium bg-green-50 px-1 rounded italic">Click any row to view the full AI analysis and watchlist hit details for that customer.</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-100 flex items-center gap-1.5 py-1 px-3">
                      <Zap className="size-3" /> 2 Critical matches
                    </Badge>
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-100 flex items-center gap-1.5 py-1 px-3">
                      <AlertTriangle className="size-3" /> 3 High severity
                    </Badge>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-100 flex items-center gap-1.5 py-1 px-3">
                      <Info className="size-3" /> 1 Medium risk
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-[#2A53A0] border-blue-100 flex items-center gap-1.5 py-1 px-3">
                      <ShieldAlert className="size-3" /> Missing ID – disambiguation needed
                    </Badge>
                    <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 flex items-center gap-1.5 py-1 px-3 font-medium">
                      <FileText className="size-3" /> 5 Lists hit across 6 customers
                    </Badge>
                  </div>
                </div>

                {/* Severity Summary Cards */}
                <div className="flex flex-col items-center justify-center lg:border-l border-gray-100 dark:border-gray-800 lg:pl-8 space-y-4">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center p-3 rounded-xl border border-red-100 bg-white dark:bg-gray-800 w-24 shadow-sm">
                      <span className="text-2xl font-black text-red-600">2</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Critical</span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-xl border border-orange-100 bg-white dark:bg-gray-800 w-24 shadow-sm">
                      <span className="text-2xl font-black text-orange-500">3</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">High</span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-xl border border-yellow-100 bg-white dark:bg-gray-800 w-24 shadow-sm">
                      <span className="text-2xl font-black text-yellow-500">1</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Medium</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">6 of 6 results shown</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Matches Header */}
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-2">
                <ShieldAlert className="size-5 text-orange-500" />
                <h3 className="font-bold text-gray-900 dark:text-white">{filteredResults.length} Potential Matches Found</h3>
             </div>
             <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-9 text-gray-600 dark:text-gray-400">
                   <Filter className="size-4 mr-2" /> Filter Results
                </Button>
             </div>
          </div>

          {/* Results Table */}
          <div className="bg-white dark:bg-gray-900 rounded-[8px] border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
             <Table>
                <TableHeader className="bg-[#F0F0F0] dark:bg-gray-800 sticky top-0 z-10 shadow-sm">
                   <TableRow className="bg-[#F0F0F0] dark:bg-gray-800 h-[48px] border-b-0 hover:bg-[#F0F0F0] dark:hover:bg-gray-800">
                      <TableHead className="px-4 font-medium text-[15px] text-[#2A53A0] dark:text-[#6b93e6] bg-[#F0F0F0] dark:bg-gray-800 align-middle whitespace-nowrap">
                        <SortableHeader column="name" label="Name" sortConfig={sortConfig} onSort={requestSort} />
                      </TableHead>
                      <TableHead className="px-4 font-medium text-[15px] text-[#2A53A0] dark:text-[#6b93e6] bg-[#F0F0F0] dark:bg-gray-800 align-middle whitespace-nowrap">
                        <SortableHeader column="custId" label="Cust ID" sortConfig={sortConfig} onSort={requestSort} />
                      </TableHead>
                      <TableHead className="px-4 font-medium text-[15px] text-[#2A53A0] dark:text-[#6b93e6] bg-[#F0F0F0] dark:bg-gray-800 align-middle whitespace-nowrap">
                        <SortableHeader column="matchedLists" label="Number Of Matched List" sortConfig={sortConfig} onSort={requestSort} />
                      </TableHead>
                      <TableHead className="px-4 font-medium text-[15px] text-[#2A53A0] dark:text-[#6b93e6] bg-[#F0F0F0] dark:bg-gray-800 align-middle whitespace-nowrap">
                        <SortableHeader column="score" label="Highest Match Score" sortConfig={sortConfig} onSort={requestSort} />
                      </TableHead>
                      <TableHead className="px-4 font-medium text-[15px] text-[#2A53A0] dark:text-[#6b93e6] bg-[#F0F0F0] dark:bg-gray-800 align-middle whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <FilterPopover
                            title="List Name With Highest Match Score"
                            options={uniqueTopLists}
                            selected={filters.topList}
                            onChange={(val) => setFilters({...filters, topList: val})}
                          />
                          <SortableHeader column="topList" label="" sortConfig={sortConfig} onSort={requestSort} className="ml-0" />
                        </div>
                      </TableHead>
                      <TableHead className="px-4 font-medium text-[15px] text-[#2A53A0] dark:text-[#6b93e6] bg-[#F0F0F0] dark:bg-gray-800 align-middle whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <FilterPopover
                            title="Match Category"
                            options={uniqueCategories}
                            selected={filters.category}
                            onChange={(val) => setFilters({...filters, category: val})}
                          />
                          <SortableHeader column="category" label="" sortConfig={sortConfig} onSort={requestSort} className="ml-0" />
                        </div>
                      </TableHead>
                      <TableHead className="px-4 font-medium text-[15px] text-[#2A53A0] dark:text-[#6b93e6] bg-[#F0F0F0] dark:bg-gray-800 align-middle whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <FilterPopover
                            title="Match Type"
                            options={uniqueTypes}
                            selected={filters.type}
                            onChange={(val) => setFilters({...filters, type: val})}
                          />
                          <SortableHeader column="type" label="" sortConfig={sortConfig} onSort={requestSort} className="ml-0" />
                        </div>
                      </TableHead>
                      <TableHead className="px-4 font-medium text-[15px] text-[#2A53A0] dark:text-[#6b93e6] bg-[#F0F0F0] dark:bg-gray-800 align-middle whitespace-nowrap">
                        <SortableHeader column="matchDate" label="Match Date" sortConfig={sortConfig} onSort={requestSort} />
                      </TableHead>
                      <TableHead className="px-4 font-medium text-[15px] text-[#2A53A0] dark:text-[#6b93e6] bg-[#F0F0F0] dark:bg-gray-800 align-middle whitespace-nowrap text-right">
                         <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-[#1e3a70]">
                          Actions
                          <ListFilter className="size-4 text-gray-400" />
                        </div>
                      </TableHead>
                   </TableRow>
                </TableHeader>
                <TableBody>
                   {sortedResults.length === 0 ? (
                      <TableRow>
                         <TableCell colSpan={9} className="h-32 text-center">
                            <div className="flex flex-col items-center justify-center text-gray-500">
                               <Filter className="size-8 mb-2 opacity-50" />
                               <p>No results found for current filters.</p>
                               <Button variant="link" onClick={() => setFilters({ topList: [], category: [], type: [] })}>Clear All Filters</Button>
                            </div>
                         </TableCell>
                      </TableRow>
                   ) : (
                   sortedResults.map((result) => (
                      <TableRow key={result.id} className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors border-b border-gray-100 dark:border-gray-800">
                         {/* NAME */}
                         <TableCell className="px-4 py-3 align-middle">
                            <div className="space-y-0.5">
                               <div className="font-bold text-[#2A53A0] text-sm">{result.name}</div>
                               <div className="text-xs text-gray-500 font-arabic">{result.originalName}</div>
                            </div>
                         </TableCell>
                         
                         {/* CUST ID */}
                         <TableCell className="px-4 py-3 align-middle">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{result.custId}</span>
                         </TableCell>

                         {/* NUMBER OF MATCHED LIST */}
                         <TableCell className="px-4 py-3 align-middle">
                            <Button 
                              variant="link" 
                              className="text-sm font-bold text-[#2A53A0] pl-0 h-auto p-0 hover:no-underline hover:text-blue-800 flex items-center gap-1 ml-6"
                              onClick={() => handleViewDetails(result.id)}
                            >
                               {result.matchedLists} <ExternalLink className="size-3" />
                            </Button>
                         </TableCell>

                         {/* HIGHEST MATCH SCORE */}
                         <TableCell className="px-4 py-3 align-middle">
                            <div className={cn(
                               "flex items-center justify-center w-12 h-8 rounded-[4px] font-bold text-sm ml-4",
                               result.score >= 90 ? "bg-red-100 text-red-700 border border-red-200" : 
                               result.score >= 80 ? "bg-orange-100 text-orange-700 border border-orange-200" : 
                               "bg-yellow-100 text-yellow-700 border border-yellow-200"
                            )}>
                               {result.score}%
                            </div>
                         </TableCell>

                         {/* LIST NAME */}
                         <TableCell className="px-4 py-3 align-middle">
                             <Badge variant="outline" className="border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100">{result.topList}</Badge>
                         </TableCell>

                         {/* MATCH CATEGORY */}
                         <TableCell className="px-4 py-3 align-middle">
                             <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{result.category}</span>
                         </TableCell>

                         {/* MATCH TYPE */}
                         <TableCell className="px-4 py-3 align-middle">
                            <div className="flex items-center gap-2">
                               {result.type === "Individual" ? <User className="size-4 text-gray-500" /> : <Building2 className="size-4 text-gray-500" />}
                               <span className="text-sm text-gray-700 dark:text-gray-300">{result.type}</span>
                            </div>
                         </TableCell>

                         {/* MATCH DATE */}
                         <TableCell className="px-4 py-3 align-middle">
                            <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">{result.matchDate}</span>
                         </TableCell>

                         {/* ACTIONS */}
                         <TableCell className="px-4 py-3 align-middle text-right">
                            <Select
                              value={rowActions[result.id]}
                              onValueChange={(v) => setRowActions(prev => ({ ...prev, [result.id]: v }))}
                            >
                              <SelectTrigger className="h-8 w-44 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Move to Case">Move to Case</SelectItem>
                                <SelectItem value="False Hits">False Hits</SelectItem>
                                <SelectItem value="Under Review">Under Review</SelectItem>
                                <SelectItem value="Move to Whitelist">Move to Whitelist</SelectItem>
                                <SelectItem value="View Summary">View Summary</SelectItem>
                              </SelectContent>
                            </Select>
                         </TableCell>
                      </TableRow>
                   )))}
                </TableBody>
             </Table>
             <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30 flex justify-between items-center text-xs text-gray-500">
                <span>Showing {filteredResults.length} of {MOCK_RESULTS.length} results</span>
                <span>Search Time: 0.42 seconds</span>
             </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900/50">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col w-full h-full gap-0">
        
        {/* Sticky Header with Tabs */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 sticky top-0 z-10 shadow-sm shrink-0">
          <TabsList className="bg-transparent h-11 p-0 w-full justify-start gap-6">
            <TabsTrigger 
              value="individual" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#2A53A0] dark:data-[state=active]:text-[#6b93e6] data-[state=active]:border-b-2 data-[state=active]:border-t-0 data-[state=active]:border-x-0 data-[state=active]:border-[#2A53A0] dark:data-[state=active]:border-[#6b93e6] rounded-none h-11 px-2 text-sm font-medium text-gray-600 dark:text-gray-400 border-b-2 border-t-0 border-x-0 border-transparent transition-all hover:text-[#2A53A0] hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none flex items-center gap-1.5"
            >
              Manual Screening
            </TabsTrigger>
            <TabsTrigger 
              value="bulk" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#2A53A0] dark:data-[state=active]:text-[#6b93e6] data-[state=active]:border-b-2 data-[state=active]:border-t-0 data-[state=active]:border-x-0 data-[state=active]:border-[#2A53A0] dark:data-[state=active]:border-[#6b93e6] rounded-none h-11 px-2 text-sm font-medium text-gray-600 dark:text-gray-400 border-b-2 border-t-0 border-x-0 border-transparent transition-all hover:text-[#2A53A0] hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none flex items-center gap-1.5"
            >
              Bulk Upload
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-h-0 overflow-hidden bg-gray-50/30 dark:bg-gray-900/30 flex flex-col">
          
          {/* Individual Screening Tab */}
          <TabsContent value="individual" className="mt-0 h-full p-0 focus-visible:outline-none focus-visible:ring-0 relative">
            <div className="h-full overflow-y-auto p-4">
              <div className="w-full bg-white dark:bg-gray-900 rounded-[8px] shadow-sm border border-gray-200 dark:border-gray-800 p-4 space-y-8">
                
                {/* Entity Type */}
                <div className="space-y-3">
                  <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Entity Type</Label>
                  <RadioGroup value={entityType} onValueChange={setEntityType} className="flex flex-wrap gap-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="individual" id="type-individual" className="text-[#2A53A0] border-gray-300" />
                      <Label htmlFor="type-individual" className="font-medium cursor-pointer">Individual</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="organization" id="type-organization" className="text-[#2A53A0] border-gray-300" />
                      <Label htmlFor="type-organization" className="font-medium cursor-pointer">Non-Individuals</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="vessel" id="type-vessel" className="text-[#2A53A0] border-gray-300" />
                      <Label htmlFor="type-vessel" className="font-medium cursor-pointer">Vessel</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Basic Information */}
                <div className="space-y-4">
                  <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Basic Information</Label>
                  
                  {/* INDIVIDUAL FORM FIELDS */}
                  {entityType === "individual" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="id-number" className="text-sm font-medium text-gray-700 dark:text-gray-300">ID Number</Label>
                      <Input
                        id="id-number"
                        value={formData.idNumber}
                        onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                        placeholder="e.g., A12345678"
                        className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="primary-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Name in English <span className="text-red-500">*</span></Label>
                      <Input
                        id="primary-name"
                        value={formData.primaryName}
                        onChange={(e) => setFormData({...formData, primaryName: e.target.value})}
                        placeholder="e.g., John Michael Smith"
                        className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="non-english-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Name in Non-English</Label>
                      <Input
                        id="non-english-name"
                        value={formData.originalName}
                        onChange={(e) => setFormData({...formData, originalName: e.target.value})}
                        placeholder="e.g., محمد علي"
                        className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="alias" className="text-sm font-medium text-gray-700 dark:text-gray-300">Alias</Label>
                      <Input
                        id="alias"
                        value={formData.alias}
                        onChange={(e) => setFormData({...formData, alias: e.target.value})}
                        placeholder="e.g., Johnny Smith"
                        className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <Label htmlFor="address" className="text-sm font-medium text-gray-700 dark:text-gray-300">Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        placeholder="e.g., 123 Main Street, Dubai, UAE"
                        className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="dob" className="text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</Label>
                      <div className="relative">
                        <Input
                          id="dob"
                          value={formData.dob}
                          onChange={(e) => setFormData({...formData, dob: e.target.value})}
                          placeholder="dd-mm-yyyy"
                          className="!h-[46px] rounded-[8px] pr-10 bg-white border-[#C6C6C6]"
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="country-birth" className="text-sm font-medium text-gray-700 dark:text-gray-300">Country of Birth</Label>
                      <Select value={formData.countryBirth} onValueChange={(v) => setFormData({...formData, countryBirth: v})}>
                        <SelectTrigger className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="in">India</SelectItem>
                          <SelectItem value="ae">United Arab Emirates</SelectItem>
                          <SelectItem value="pk">Pakistan</SelectItem>
                          <SelectItem value="qa">Qatar</SelectItem>
                          <SelectItem value="cn">China</SelectItem>
                          <SelectItem value="ru">Russia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="residence" className="text-sm font-medium text-gray-700 dark:text-gray-300">Country of Residence</Label>
                      <Select value={formData.residence} onValueChange={(v) => setFormData({...formData, residence: v})}>
                        <SelectTrigger className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="in">India</SelectItem>
                          <SelectItem value="ae">United Arab Emirates</SelectItem>
                          <SelectItem value="pk">Pakistan</SelectItem>
                          <SelectItem value="qa">Qatar</SelectItem>
                          <SelectItem value="cn">China</SelectItem>
                          <SelectItem value="ru">Russia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="nationality" className="text-sm font-medium text-gray-700 dark:text-gray-300">Nationality</Label>
                      <Select value={formData.nationality} onValueChange={(v) => setFormData({...formData, nationality: v})}>
                        <SelectTrigger className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="in">India</SelectItem>
                          <SelectItem value="ae">United Arab Emirates</SelectItem>
                          <SelectItem value="pk">Pakistan</SelectItem>
                          <SelectItem value="qa">Qatar</SelectItem>
                          <SelectItem value="cn">China</SelectItem>
                          <SelectItem value="ru">Russia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="joint-account-holder" className="text-sm font-medium text-gray-700 dark:text-gray-300">Joint Account Holder Name</Label>
                      <Input
                        id="joint-account-holder"
                        value={formData.jointAccountHolder}
                        onChange={(e) => setFormData({...formData, jointAccountHolder: e.target.value})}
                        placeholder="e.g., Jane Smith"
                        className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]"
                      />
                    </div>
                  </div>
                  )}

                  {/* NON-INDIVIDUALS FORM FIELDS */}
                  {entityType === "organization" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="org-reg-number" className="text-sm font-medium text-gray-700 dark:text-gray-300">Registration Number <span className="text-red-500">*</span></Label>
                      <Input
                        id="org-reg-number"
                        value={formData.idNumber}
                        onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                        placeholder="e.g., REG-2024-99812"
                        className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="org-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Registered Name (English)</Label>
                      <Input
                        id="org-name"
                        value={formData.primaryName}
                        onChange={(e) => setFormData({...formData, primaryName: e.target.value})}
                        placeholder="e.g., Acme Global Trading LLC"
                        className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="org-original-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Entity Name (Non-English)</Label>
                      <Input
                        id="org-original-name"
                        value={formData.originalName}
                        onChange={(e) => setFormData({...formData, originalName: e.target.value})}
                        placeholder="e.g., شركة أكمي للتجارة العالمية"
                        className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="org-tax-id" className="text-sm font-medium text-gray-700 dark:text-gray-300">Tax ID</Label>
                      <Input
                        id="org-tax-id"
                        value={formData.taxId}
                        onChange={(e) => setFormData({...formData, taxId: e.target.value})}
                        placeholder="e.g., TRN-100234567890003"
                        className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="org-country" className="text-sm font-medium text-gray-700 dark:text-gray-300">Country of Incorporation</Label>
                      <Select value={formData.nationality} onValueChange={(v) => setFormData({...formData, nationality: v})}>
                        <SelectTrigger className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="in">India</SelectItem>
                          <SelectItem value="ae">United Arab Emirates</SelectItem>
                          <SelectItem value="pk">Pakistan</SelectItem>
                          <SelectItem value="qa">Qatar</SelectItem>
                          <SelectItem value="cn">China</SelectItem>
                          <SelectItem value="ru">Russia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="org-inc-date" className="text-sm font-medium text-gray-700 dark:text-gray-300">Date of Incorporation</Label>
                      <div className="relative">
                        <Input
                          id="org-inc-date"
                          value={formData.dob}
                          onChange={(e) => setFormData({...formData, dob: e.target.value})}
                          placeholder="dd-mm-yyyy"
                          className="!h-[46px] rounded-[8px] pr-10 bg-white border-[#C6C6C6]"
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                      </div>
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <Label htmlFor="org-reg-address" className="text-sm font-medium text-gray-700 dark:text-gray-300">Registered Address</Label>
                      <Input
                        id="org-reg-address"
                        value={formData.registeredAddress}
                        onChange={(e) => setFormData({...formData, registeredAddress: e.target.value})}
                        placeholder="e.g., Office 501, Tower B, Business Bay, Dubai, UAE"
                        className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="org-operating-countries" className="text-sm font-medium text-gray-700 dark:text-gray-300">Operating Countries</Label>
                      <Input
                        id="org-operating-countries"
                        value={formData.operatingCountries}
                        onChange={(e) => setFormData({...formData, operatingCountries: e.target.value})}
                        placeholder="e.g., UAE, UK, India"
                        className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="org-alias" className="text-sm font-medium text-gray-700 dark:text-gray-300">Alias</Label>
                      <Input
                        id="org-alias"
                        value={formData.alias}
                        onChange={(e) => setFormData({...formData, alias: e.target.value})}
                        placeholder="e.g., Acme Corp"
                        className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="org-shareholders" className="text-sm font-medium text-gray-700 dark:text-gray-300">Corporate Shareholders (&gt;10%)</Label>
                      <Input
                        id="org-shareholders"
                        value={formData.corporateShareholders}
                        onChange={(e) => setFormData({...formData, corporateShareholders: e.target.value})}
                        placeholder="e.g., Alpha Holdings Ltd (45%)"
                        className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="org-directors" className="text-sm font-medium text-gray-700 dark:text-gray-300">Directors / POAs</Label>
                      <Input
                        id="org-directors"
                        value={formData.directors}
                        onChange={(e) => setFormData({...formData, directors: e.target.value})}
                        placeholder="e.g., John Smith, Jane Doe"
                        className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="org-trustees" className="text-sm font-medium text-gray-700 dark:text-gray-300">Trustees</Label>
                      <Input
                        id="org-trustees"
                        value={formData.trustees}
                        onChange={(e) => setFormData({...formData, trustees: e.target.value})}
                        placeholder="e.g., Global Trust Services Ltd"
                        className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]"
                      />
                    </div>
                  </div>
                  )}

                  {/* VESSEL FORM FIELDS */}
                  {entityType === "vessel" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="vessel-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Vessel Name <span className="text-red-500">*</span></Label>
                      <Input 
                        id="vessel-name" 
                        value={formData.primaryName}
                        onChange={(e) => setFormData({...formData, primaryName: e.target.value})}
                        placeholder="e.g., MV SEA STAR" 
                        className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]" 
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <Label htmlFor="imo-number" className="text-sm font-medium text-gray-700 dark:text-gray-300">IMO Number</Label>
                      <Input 
                        id="imo-number" 
                        value={formData.imoNumber}
                        onChange={(e) => setFormData({...formData, imoNumber: e.target.value})}
                        placeholder="e.g., IMO 9123456" 
                        className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]" 
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="call-sign" className="text-sm font-medium text-gray-700 dark:text-gray-300">Call Sign</Label>
                      <Input 
                        id="call-sign" 
                        value={formData.callSign}
                        onChange={(e) => setFormData({...formData, callSign: e.target.value})}
                        placeholder="e.g., A6-EFA" 
                        className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]" 
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="vessel-type" className="text-sm font-medium text-gray-700 dark:text-gray-300">Vessel Type</Label>
                      <Select value={formData.vesselType} onValueChange={(v) => setFormData({...formData, vesselType: v})}>
                        <SelectTrigger className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]">
                          <SelectValue placeholder="Select vessel type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cargo">Cargo Ship</SelectItem>
                          <SelectItem value="tanker">Oil Tanker</SelectItem>
                          <SelectItem value="container">Container Ship</SelectItem>
                          <SelectItem value="fishing">Fishing Vessel</SelectItem>
                          <SelectItem value="passenger">Passenger Ship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="flag-state" className="text-sm font-medium text-gray-700 dark:text-gray-300">Flag State</Label>
                      <Select value={formData.flagState} onValueChange={(v) => setFormData({...formData, flagState: v})}>
                        <SelectTrigger className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]">
                          <SelectValue placeholder="Select flag state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pa">Panama</SelectItem>
                          <SelectItem value="lr">Liberia</SelectItem>
                          <SelectItem value="mh">Marshall Islands</SelectItem>
                          <SelectItem value="ae">United Arab Emirates</SelectItem>
                          <SelectItem value="sg">Singapore</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  )}

                </div>

                {/* Address */}
                <div className="space-y-4">
                  <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Address (Optional)</Label>
                  
                  <div className="space-y-4">
                    <Input placeholder="Street Address" className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input placeholder="City" className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]" />
                      <Input placeholder="State/Province" className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]" />
                      <Input placeholder="Postal Code" className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]" />
                    </div>
                  </div>
                </div>

                {/* Purpose */}
                <div className="space-y-3">
                  <Label htmlFor="purpose" className="text-sm font-medium text-gray-700 dark:text-gray-300">Purpose <span className="text-red-500">*</span></Label>
                  <Select value={formData.purpose} onValueChange={(v) => setFormData({...formData, purpose: v})}>
                    <SelectTrigger className="!h-[46px] rounded-[8px] bg-white border-[#C6C6C6]">
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onboarding">Customer Onboarding</SelectItem>
                      <SelectItem value="transaction">Transaction Screening</SelectItem>
                      <SelectItem value="review">Periodic Review</SelectItem>
                      <SelectItem value="ad-hoc">Ad-hoc Screening</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Watchlist Configuration */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Watchlist Configuration <span className="text-red-500">*</span></Label>
                    <p className="text-sm text-gray-500">Select which watchlist profile to use for this screening</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {/* Onboarding Screening */}
                    <div 
                      className={cn(
                        "relative rounded-[8px] border p-4 cursor-pointer transition-all hover:border-[#2A53A0]",
                        watchlistProfile === "onboarding" 
                          ? "border-[#2A53A0] bg-blue-50/10 ring-1 ring-[#2A53A0]" 
                          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                      )}
                      onClick={() => setWatchlistProfile("onboarding")}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "mt-1 w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center shrink-0",
                          watchlistProfile === "onboarding" && "border-[#2A53A0]"
                        )}>
                          {watchlistProfile === "onboarding" && <div className="w-2 h-2 rounded-full bg-[#2A53A0]" />}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 dark:text-white">Onboarding Screening</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Onboarding</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive screening for new customer onboarding with UN, OFAC, and EU sanctions lists</p>
                          <div className="flex gap-4 text-xs text-gray-500 font-medium mt-1">
                            <span>3 Lists</span>
                            <span>•</span>
                            <span>Threshold: 75%</span>
                            <span>•</span>
                            <span>Fuzzy Match: Enabled</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Continuous Monitoring */}
                    <div 
                      className={cn(
                        "relative rounded-[8px] border p-4 cursor-pointer transition-all hover:border-[#2A53A0]",
                        watchlistProfile === "monitoring" 
                          ? "border-[#2A53A0] bg-blue-50/10 ring-1 ring-[#2A53A0]" 
                          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                      )}
                      onClick={() => setWatchlistProfile("monitoring")}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "mt-1 w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center shrink-0",
                          watchlistProfile === "monitoring" && "border-[#2A53A0]"
                        )}>
                          {watchlistProfile === "monitoring" && <div className="w-2 h-2 rounded-full bg-[#2A53A0]" />}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 dark:text-white">Continuous Monitoring</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Monitoring</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Ongoing monitoring of customer transactions against major lists</p>
                          <div className="flex gap-4 text-xs text-gray-500 font-medium mt-1">
                            <span>3 Lists</span>
                            <span>•</span>
                            <span>Threshold: 80%</span>
                            <span>•</span>
                            <span>Exact Match Priority</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* High-Risk Jurisdiction */}
                    <div 
                      className={cn(
                        "relative rounded-[8px] border p-4 cursor-pointer transition-all hover:border-[#2A53A0]",
                        watchlistProfile === "high-risk" 
                          ? "border-[#2A53A0] bg-blue-50/10 ring-1 ring-[#2A53A0]" 
                          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                      )}
                      onClick={() => setWatchlistProfile("high-risk")}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "mt-1 w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center shrink-0",
                          watchlistProfile === "high-risk" && "border-[#2A53A0]"
                        )}>
                          {watchlistProfile === "high-risk" && <div className="w-2 h-2 rounded-full bg-[#2A53A0]" />}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 dark:text-white">High-Risk Jurisdiction Screening</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Enhanced Due-Diligence</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Enhanced screening for customers from high-risk countries with broadened criteria</p>
                          <div className="flex gap-4 text-xs text-gray-500 font-medium mt-1">
                            <span>5 Lists</span>
                            <span>•</span>
                            <span>Threshold: 70%</span>
                            <span>•</span>
                            <span>Phonetic Match: Enabled</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* UAE Compliance */}
                    <div 
                      className={cn(
                        "relative rounded-[8px] border p-4 cursor-pointer transition-all hover:border-[#2A53A0]",
                        watchlistProfile === "uae" 
                          ? "border-[#2A53A0] bg-blue-50/10 ring-1 ring-[#2A53A0]" 
                          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                      )}
                      onClick={() => setWatchlistProfile("uae")}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "mt-1 w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center shrink-0",
                          watchlistProfile === "uae" && "border-[#2A53A0]"
                        )}>
                          {watchlistProfile === "uae" && <div className="w-2 h-2 rounded-full bg-[#2A53A0]" />}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 dark:text-white">UAE Compliance Watchlist</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Regulatory</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">UAE Cabinet designated terrorists and sanctioned entities</p>
                          <div className="flex gap-4 text-xs text-gray-500 font-medium mt-1">
                            <span>1 List</span>
                            <span>•</span>
                            <span>Threshold: 75%</span>
                            <span>•</span>
                            <span>ID Override: Active</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <Button variant="outline" onClick={resetForm} className="h-[46px] px-6 rounded-[8px] border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                    <RotateCcw className="size-4 mr-2" />
                    Reset Form
                  </Button>
                  <Button 
                    onClick={handleStartScreening} 
                    disabled={!isFormValid}
                    className={cn(
                      "h-[46px] px-8 font-medium rounded-[8px] shadow-sm transition-all",
                      isFormValid ? "bg-[#2A53A0] hover:bg-[#1e3a70] text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    )}
                  >
                    <Search className="size-4 mr-2" />
                    Start Screening
                  </Button>
                </div>

              </div>
            </div>
          </TabsContent>

          {/* Bulk Upload Tab */}
          <TabsContent value="bulk" className="mt-0 h-full p-0 focus-visible:outline-none focus-visible:ring-0 relative">
            <div className="h-full overflow-y-auto p-4">
              <div className="w-full bg-white dark:bg-gray-900 rounded-[8px] shadow-sm border border-gray-200 dark:border-gray-800 p-4 space-y-8">
                
                {/* Upload Section */}
                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                     <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">File Upload</Label>
                     <Button variant="outline" className="h-[32px] text-xs px-3 rounded-[6px] border-gray-300 text-gray-700 hover:bg-gray-50">
                       <Download className="size-3.5 mr-2" /> Download Template
                     </Button>
                   </div>
                   <div 
                      className={cn(
                        "border-2 border-dashed rounded-xl p-10 w-full transition-all cursor-pointer relative group",
                        uploadedFile 
                          ? "border-[#2A53A0] bg-blue-50/30 dark:bg-blue-900/10" 
                          : "border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-800 hover:border-[#2A53A0] dark:hover:border-[#2A53A0]"
                      )}
                      onClick={!uploadedFile ? handleFileUpload : undefined}
                   >
                      {uploadedFile ? (
                        <div className="flex items-center justify-between p-2">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center">
                              <FileText className="size-6 text-[#2A53A0]" />
                            </div>
                            <div className="text-left">
                              <span className="text-sm font-bold text-gray-900 dark:text-white block">{uploadedFile}</span>
                              <span className="text-xs text-gray-500 block">2.4 MB • Uploaded just now</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={removeUploadedFile}>
                            <Ban className="size-5" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-3 text-center">
                          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Upload className="size-6 text-[#2A53A0]" />
                          </div>
                          <div className="space-y-1">
                            <span className="text-sm font-medium text-gray-900 dark:text-white block">Click to upload or drag and drop</span>
                            <span className="text-xs text-gray-500 block">CSV, XLS, or XLSX (Max 25MB)</span>
                          </div>
                        </div>
                      )}
                   </div>
                </div>

                {/* Watchlist Configuration (Copied from Individual) */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Watchlist Configuration <span className="text-red-500">*</span></Label>
                    <p className="text-sm text-gray-500">Select which watchlist profile to use for this screening</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {/* Onboarding Screening */}
                    <div 
                      className={cn(
                        "relative rounded-[8px] border p-4 cursor-pointer transition-all hover:border-[#2A53A0]",
                        watchlistProfile === "onboarding" 
                          ? "border-[#2A53A0] bg-blue-50/10 ring-1 ring-[#2A53A0]" 
                          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                      )}
                      onClick={() => setWatchlistProfile("onboarding")}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "mt-1 w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center shrink-0",
                          watchlistProfile === "onboarding" && "border-[#2A53A0]"
                        )}>
                          {watchlistProfile === "onboarding" && <div className="w-2 h-2 rounded-full bg-[#2A53A0]" />}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 dark:text-white">Onboarding Screening</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Onboarding</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive screening for new customer onboarding with UN, OFAC, and EU sanctions lists</p>
                          <div className="flex gap-4 text-xs text-gray-500 font-medium mt-1">
                            <span>3 Lists</span>
                            <span>•</span>
                            <span>Threshold: 75%</span>
                            <span>•</span>
                            <span>Fuzzy Match: Enabled</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Continuous Monitoring */}
                    <div 
                      className={cn(
                        "relative rounded-[8px] border p-4 cursor-pointer transition-all hover:border-[#2A53A0]",
                        watchlistProfile === "monitoring" 
                          ? "border-[#2A53A0] bg-blue-50/10 ring-1 ring-[#2A53A0]" 
                          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                      )}
                      onClick={() => setWatchlistProfile("monitoring")}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "mt-1 w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center shrink-0",
                          watchlistProfile === "monitoring" && "border-[#2A53A0]"
                        )}>
                          {watchlistProfile === "monitoring" && <div className="w-2 h-2 rounded-full bg-[#2A53A0]" />}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 dark:text-white">Continuous Monitoring</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Monitoring</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Ongoing monitoring of customer transactions against major lists</p>
                          <div className="flex gap-4 text-xs text-gray-500 font-medium mt-1">
                            <span>3 Lists</span>
                            <span>•</span>
                            <span>Threshold: 80%</span>
                            <span>•</span>
                            <span>Exact Match Priority</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* High-Risk Jurisdiction */}
                    <div 
                      className={cn(
                        "relative rounded-[8px] border p-4 cursor-pointer transition-all hover:border-[#2A53A0]",
                        watchlistProfile === "high-risk" 
                          ? "border-[#2A53A0] bg-blue-50/10 ring-1 ring-[#2A53A0]" 
                          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                      )}
                      onClick={() => setWatchlistProfile("high-risk")}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "mt-1 w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center shrink-0",
                          watchlistProfile === "high-risk" && "border-[#2A53A0]"
                        )}>
                          {watchlistProfile === "high-risk" && <div className="w-2 h-2 rounded-full bg-[#2A53A0]" />}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 dark:text-white">High-Risk Jurisdiction Screening</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Enhanced Due-Diligence</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Enhanced screening for customers from high-risk countries with broadened criteria</p>
                          <div className="flex gap-4 text-xs text-gray-500 font-medium mt-1">
                            <span>5 Lists</span>
                            <span>•</span>
                            <span>Threshold: 70%</span>
                            <span>•</span>
                            <span>Phonetic Match: Enabled</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* UAE Compliance */}
                    <div 
                      className={cn(
                        "relative rounded-[8px] border p-4 cursor-pointer transition-all hover:border-[#2A53A0]",
                        watchlistProfile === "uae" 
                          ? "border-[#2A53A0] bg-blue-50/10 ring-1 ring-[#2A53A0]" 
                          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                      )}
                      onClick={() => setWatchlistProfile("uae")}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "mt-1 w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center shrink-0",
                          watchlistProfile === "uae" && "border-[#2A53A0]"
                        )}>
                          {watchlistProfile === "uae" && <div className="w-2 h-2 rounded-full bg-[#2A53A0]" />}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 dark:text-white">UAE Compliance Watchlist</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Regulatory</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">UAE Cabinet designated terrorists and sanctioned entities</p>
                          <div className="flex gap-4 text-xs text-gray-500 font-medium mt-1">
                            <span>1 List</span>
                            <span>•</span>
                            <span>Threshold: 75%</span>
                            <span>•</span>
                            <span>ID Override: Active</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <Button 
                    className={cn(
                      "h-[46px] px-8 font-medium rounded-[8px] shadow-sm transition-all",
                      isBulkValid ? "bg-[#2A53A0] hover:bg-[#1e3a70] text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    )}
                    disabled={!isBulkValid}
                  >
                    <Search className="size-4 mr-2" />
                    Start Bulk Screening
                  </Button>
                </div>

              </div>
            </div>
          </TabsContent>

        </div>
      </Tabs>
    </div>
  );
}