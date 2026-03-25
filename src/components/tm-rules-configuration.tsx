import { motion, AnimatePresence } from "motion/react";
import { 
  Flash,
  Export,
  ChartBar,
  SettingsAdjust as DataSettings,
  Events,
  Template,
  Version,
  Workspace,
  Group,
  ToolBox,
  UserActivity,
  TaskComplete,
  Calendar,
  Document,
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  ArrowsVertical,
  Time,
  Locked,
  PlayFilled,
  StopFilled,
  Launch,
  RecentlyViewed,
  CloudUpload,
  Add,
  Settings as SettingsIcon,
  Table as TableIcon,
  View as ViewIcon,
  Layer as LayerIcon,
  AppConnectivity,
  Subflow,
  Security,
  VirtualColumn,
  Upgrade,
  Calculation,
  ViewMode_1,
  TableSplit,
  DataTable as CarbonDataTableIcon,
  List,
  Dashboard as DashboardIcon,
  SettingsAdjust,
  Catalog,
  Information,
  Filter,
  Search,
  Download,
  FilterEdit,
  OverflowMenuVertical,
  Idea,
  Run,
  Catalog as CatalogIcon,
  Upload,
  ArrowLeft
} from "@carbon/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
  ContentSwitcher,
  Switch,
} from "carbon-components-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "./ui/utils";
import React, { useState, useMemo } from "react";
import { EventsManagement } from "./events-management";
import { EventDetails } from "./event-details";
import { AddCustomEvent } from "./add-custom-event";
import { CarbonPaginationFooter } from "./carbon-pagination-footer";
import { VerifyEvent } from "./verify-event";

import { toast } from "sonner@2.0.3";
import { CreationLoader } from "./creation-loader";
import { CreationSuccessDialog } from "./creation-success-dialog";

interface TMRulesConfigurationProps {
  breadcrumbs?: any[];
  onBreadcrumbNavigate?: (path: string) => void;
}

const tmMenuStructure = [
  { id: "dashboard", label: "Dashboard", icon: ChartBar },
  { 
    id: "data-maintenance", 
    label: "Data Maintenance", 
    icon: DataSettings,
    subItems: [
      { id: "event", label: "Events", icon: Events },
      { id: "udv", label: "UDV", icon: Calculation },
      { id: "sec", label: "SEC", icon: Security },
      { id: "virtual-se", label: "Virtual SE", icon: VirtualColumn },
      { id: "topx", label: "TopX", icon: Upgrade },
      { 
        id: "view-management", 
        label: "View Management",
        icon: ViewIcon,
        subItems: [
          { id: "views", label: "Views", icon: ViewMode_1 },
          { id: "lookup-tables", label: "Lookup Tables", icon: TableSplit },
          { id: "core-tables", label: "Core Tables", icon: CarbonDataTableIcon },
        ]
      },
    ]
  },
  {
    id: "scenarios",
    label: "Scenarios",
    icon: Flash,
    subItems: [
      { id: "scenarios-dashboard", label: "Scenarios Dashboard", icon: DashboardIcon },
      { id: "create-scenario", label: "Create Scenario", icon: Add },
      { id: "scenario-list", label: "Scenario List", icon: List },
      { id: "templates", label: "Templates", icon: Template },
      { id: "version-management", label: "Version Management", icon: Version },
    ]
  },
  {
    id: "system-configuration",
    label: "System Configuration",
    icon: SettingsIcon,
    subItems: [
      { id: "workspace-management", label: "Workspace Management", icon: Workspace },
      { id: "group-management", label: "Group Management", icon: Group },
      { id: "dashboard-configuration", label: "Dashboard Configuration", icon: SettingsAdjust },
      { id: "system-settings", label: "System Settings", icon: SettingsIcon },
    ]
  },
  { id: "my-work", label: "My Work", icon: UserActivity },
  { id: "pending-verification", label: "Pending Verification", icon: TaskComplete },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

const scenarioSimulations = [
  { id: "SIM-SAT-0016", name: "High Value UPI Velocity - Customer W", workspace: "Customer", workspaceColor: "bg-[#F6F2FF] text-[#8A3FFC]", totalTxns: "23,450", simulatedTxns: "-", type: "What-If", typeColor: "bg-[#D9FBFB] text-[#007D79]", duration: "01 Jan - 31 Jan", progress: 0, status: "Queued" },
  { id: "SIM-SAT-0015", name: "Suspicious Cross-Border Transfers", workspace: "Account", workspaceColor: "bg-[#EAF2FF] text-[#2A53A0]", totalTxns: "18,720", simulatedTxns: "12,480", type: "Backtest", typeColor: "bg-[#FFF4E5] text-[#854616]", duration: "15 Dec - 31 Dec", progress: 65, status: "Running" },
  { id: "SIM-SAT-0014", name: "ATM Withdrawal Anomaly Detection", workspace: "Non-Customer", workspaceColor: "bg-gray-100 text-gray-500", totalTxns: "42,100", simulatedTxns: "42,100", type: "Champion/Challenger", typeColor: "bg-[#FFF1F1] text-[#DA1E28]", duration: "01 Nov - 30 Nov", progress: 100, status: "Completed" },
  { id: "SIM-SAT-0013", name: "Card Not Present Fraud Pattern", workspace: "Customer", workspaceColor: "bg-[#F6F2FF] text-[#8A3FFC]", totalTxns: "31,200", simulatedTxns: "-", type: "What-If", typeColor: "bg-[#D9FBFB] text-[#007D79]", duration: "10 Dec - 20 Dec", progress: 0, status: "Scheduled" },
  { id: "SIM-SAT-0012", name: "Structuring under $10k Threshold", workspace: "Customer", workspaceColor: "bg-[#F6F2FF] text-[#8A3FFC]", totalTxns: "15,600", simulatedTxns: "15,600", type: "Backtest", typeColor: "bg-[#FFF4E5] text-[#854616]", duration: "01 Nov - 15 Nov", progress: 100, status: "Completed" },
  { id: "SIM-SAT-0011", name: "New Account Dormancy Spike", workspace: "Account", workspaceColor: "bg-[#EAF2FF] text-[#2A53A0]", totalTxns: "8,900", simulatedTxns: "8,900", type: "Backtest", typeColor: "bg-[#FFF4E5] text-[#854616]", duration: "01 Oct - 31 Oct", progress: 100, status: "Completed" },
  { id: "SIM-SAT-0010", name: "Rapid Movement of Funds", workspace: "Customer", workspaceColor: "bg-[#F6F2FF] text-[#8A3FFC]", totalTxns: "27,300", simulatedTxns: "-", type: "What-If", typeColor: "bg-[#D9FBFB] text-[#007D79]", duration: "01 Dec - 15 Dec", progress: 0, status: "Queued" },
  { id: "SIM-SAT-0009", name: "Shell Company Identification", workspace: "Organization", workspaceColor: "bg-[#DEFBE6] text-[#198038]", totalTxns: "5,400", simulatedTxns: "5,400", type: "Champion/Challenger", typeColor: "bg-[#FFF1F1] text-[#DA1E28]", duration: "01 Sep - 30 Sep", progress: 100, status: "Completed" },
  { id: "SIM-SAT-0008", name: "Mule Account Detection", workspace: "Account", workspaceColor: "bg-[#EAF2FF] text-[#2A53A0]", totalTxns: "12,100", simulatedTxns: "-", type: "What-If", typeColor: "bg-[#D9FBFB] text-[#007D79]", duration: "01 Jan - 31 Dec", progress: 0, status: "Scheduled" },
  { id: "SIM-SAT-0007", name: "High Risk Jurisdiction Wire", workspace: "Customer", workspaceColor: "bg-[#F6F2FF] text-[#8A3FFC]", totalTxns: "33,500", simulatedTxns: "11,200", type: "Backtest", typeColor: "bg-[#FFF4E5] text-[#854616]", duration: "01 Nov - 30 Nov", progress: 100, status: "Completed" },
];

const kpiData = [
  { label: "Active Scenarios", value: "24", icon: Idea, color: "#2A53A0", bg: "bg-[#EAF2FF]", sub: "Currently live or approved", diff: "+3", diffColor: "text-blue-600 bg-blue-50" },
  { label: "Draft Scenarios", value: "18", icon: Document, color: "#8A3FFC", bg: "bg-[#F6F2FF]", sub: "Being authored or updated", diff: "+2", diffColor: "text-purple-600 bg-purple-50" },
  { label: "Scenarios Pending Approval", value: "7", icon: Time, color: "#007D79", bg: "bg-[#D9FBFB]", sub: "Awaiting maker/checker review", diff: "+1", diffColor: "text-[#007D79] bg-[#D9FBFB]/50" },
  { label: "Running Simulations", value: "4", icon: PlayFilled, color: "#2A53A0", bg: "bg-[#EAF2FF]", sub: "Scenarios under test in SAT Simulator", diff: "+1", diffColor: "text-blue-600 bg-blue-50" },
  { label: "Failed / Killed Simulations", value: "3", icon: StopFilled, color: "#DA1E28", bg: "bg-[#FFF1F1]", sub: "Stopped due to issues", diff: "0", diffColor: "text-red-600 bg-red-50" },
];

const quickActions = [
  { title: "New Scenario", sub: "Author a new fraud rule or logic.", icon: Add, color: "#2A53A0", bg: "from-blue-50/50 to-white" },
  { title: "New Simulation", sub: "Test scenarios on historical data.", icon: Flash, color: "#007D79", bg: "from-teal-50/50 to-white" },
  { title: "Scenario Library", sub: "Browse, search, and manage all scenarios.", icon: CatalogIcon, color: "#8A3FFC", bg: "from-purple-50/50 to-white" },
  { title: "Publish to Production", sub: "Promote approved scenarios to live EFRM.", icon: Upload, color: "#198038", bg: "from-emerald-50/50 to-white" },
];

const tableHeaders = [
  { key: 'id', header: 'SimId' },
  { key: 'name', header: 'ScenarioName' },
  { key: 'workspace', header: 'Workspace' },
  { key: 'totalTxns', header: 'TotalTxns' },
  { key: 'simulatedTxns', header: 'SimulatedTxns' },
  { key: 'type', header: 'Type' },
  { key: 'duration', header: 'Duration' },
  { key: 'progress', header: 'Progress' },
  { key: 'status', header: 'Status' },
];

export function TMRulesConfiguration({ breadcrumbs: initialBreadcrumbs, onBreadcrumbNavigate }: TMRulesConfigurationProps) {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [activeTab, setActiveTab] = useState<'ootb' | 'custom'>('ootb');
  const [selectedSwitchIndex, setSelectedSwitchIndex] = useState(0);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [isLocalSidebarCollapsed, setIsLocalSidebarCollapsed] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isAddingCustomEvent, setIsAddingCustomEvent] = useState(false);
  const [artifactTypeFilter, setArtifactTypeFilter] = useState('Artifact Type');
  const [workspaceFilter, setWorkspaceFilter] = useState('Workspace');
  const [dashboardWorkspaceFilter, setDashboardWorkspaceFilter] = useState('Workspace');
  const [dashboardStatusFilter, setDashboardStatusFilter] = useState('Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isVerifyingEvent, setIsVerifyingEvent] = useState(false);
  const [lastCreatedEvent, setLastCreatedEvent] = useState<any>(null);
  const [isApproving, setIsApproving] = useState(false);
  const [showApproveSuccess, setShowApproveSuccess] = useState(false);
  
  const BRAND_BLUE = "#2A53A0";

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => {
      if (prev.includes(menuId)) {
        return prev.filter(id => id !== menuId);
      }
      return [...prev, menuId];
    });
  };

  const handleApprove = () => {
    setIsApproving(true);
    // Simulate loading for 3 seconds
    setTimeout(() => {
      setIsApproving(false);
      setShowApproveSuccess(true);
    }, 3000);
  };

  const handleApproveContinue = () => {
    setShowApproveSuccess(false);
    setIsVerifyingEvent(false);
    setActiveItem('event');
    setActiveTab('custom');
    setLastCreatedEvent(null);
  };

  const handleReject = () => {
    toast.error("Event Rejected Successfully");
    setIsVerifyingEvent(false);
    setActiveItem('my-work');
    setLastCreatedEvent(null);
  };

  const menuInfo = useMemo(() => {
    const findInTree = (items: any[], targetId: string, path: string[] = []): { item: any; path: string[] } | null => {
      for (const item of items) {
        if (item.id === targetId) return { item, path: [...path, item.label] };
        if (item.subItems) {
          const found = findInTree(item.subItems, targetId, [...path, item.label]);
          if (found) return found;
        }
      }
      return null;
    };
    return findInTree(tmMenuStructure, activeItem) || { item: tmMenuStructure[0], path: ["Dashboard"] };
  }, [activeItem]);

  const isItemActive = (item: any): boolean => {
    if (activeItem === item.id) return true;
    if (item.subItems) {
      return item.subItems.some((sub: any) => isItemActive(sub));
    }
    return false;
  };

  const renderSidebarItem = (item: any, depth = 0) => {
    const isExactActive = activeItem === item.id;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedMenus.includes(item.id);
    const isParentOfActive = item.subItems?.some((sub: any) => isItemActive(sub));
    const isActive = isExactActive || isParentOfActive;

    const ACTIVE_ROOT_PADDING = "pl-[12px] pr-4";
    const ACTIVE_SUB_PADDING = "pl-[23px] pr-4";
    const INACTIVE_ROOT_PADDING = "px-4";
    const INACTIVE_SUB_PADDING = "pl-[27px] pr-4";

    if (depth === 0) {
      return (
        <div key={item.id} className="flex flex-col">
          <button
            onClick={() => {
              if (hasSubItems) {
                toggleMenu(item.id);
              } else {
                setActiveItem(item.id);
              }
            }}
            className={cn(
              "flex items-center gap-2 transition-all group relative overflow-hidden h-[46px] w-full",
              isExactActive && !hasSubItems 
                ? cn("bg-[#EAF2FF] border-l-4 border-[#2A53A0] rounded-r-none", ACTIVE_ROOT_PADDING)
                : cn(
                    isActive ? "bg-transparent" : "hover:bg-gray-100",
                    isExpanded && !isActive ? "bg-transparent" : "",
                    INACTIVE_ROOT_PADDING,
                    "rounded-[8px]"
                  )
            )}
          >
            {item.icon && <item.icon 
              className="size-5 flex-shrink-0 transition-colors" 
              style={{ color: isActive ? BRAND_BLUE : (isExpanded ? "#161616" : "#525252") }}
            />}
            {!isLocalSidebarCollapsed && (
              <span className="flex items-center flex-1 gap-2 overflow-hidden">
                <span 
                  className="flex-1 text-left truncate transition-colors"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "15px",
                    fontWeight: isActive ? 600 : (isExpanded ? 500 : 400),
                    color: isActive ? BRAND_BLUE : "#161616",
                    lineHeight: "1.5",
                    letterSpacing: "-0.01em"
                  }}
                >
                  {item.label}
                </span>
                {hasSubItems && (
                  <div className="flex-shrink-0 ml-auto">
                    {isExpanded ? (
                      <ChevronDown className="size-4" style={{ color: isActive ? BRAND_BLUE : "#525252" }} />
                    ) : (
                      <ChevronRight className="size-4 text-gray-400" />
                    )}
                  </div>
                )}
              </span>
            )}
          </button>
          
          <AnimatePresence>
            {!isLocalSidebarCollapsed && hasSubItems && isExpanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="mt-2 space-y-1"
              >
                {item.subItems.map((subItem: any) => renderSidebarItem(subItem, depth + 1))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <div key={item.id} className="flex flex-col">
        <button
          onClick={() => {
            if (hasSubItems) {
              toggleMenu(item.id);
            } else {
              setActiveItem(item.id);
            }
          }}
          className={cn(
            "w-full flex items-center gap-2 py-2 text-left group/item relative transition-all",
            isExactActive
              ? cn("bg-[#EAF2FF] border-l-4 border-[#2A53A0] rounded-r-none", ACTIVE_SUB_PADDING)
              : cn("hover:bg-gray-50 rounded-md", INACTIVE_SUB_PADDING)
          )}
        >
          {item.icon && <item.icon 
            className="size-4 flex-shrink-0 transition-colors" 
            style={{ color: isExactActive ? BRAND_BLUE : "#919191" }} 
          />}
          {!isLocalSidebarCollapsed && (
            <span className="flex items-center flex-1 gap-2 overflow-hidden">
              <span 
                className="flex-1 truncate transition-colors"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  fontWeight: isExactActive ? 500 : 400,
                  color: isExactActive ? BRAND_BLUE : "#525252",
                  lineHeight: "1.5",
                  letterSpacing: "0.3px"
                }}
              >
                {item.label}
              </span>
              {hasSubItems && (
                 <ChevronRight className={cn("size-4 transition-transform text-gray-400", isExpanded && "rotate-90")} />
              )}
            </span>
          )}
        </button>
        
        <AnimatePresence>
          {!isLocalSidebarCollapsed && hasSubItems && isExpanded && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-1 space-y-1"
            >
              {item.subItems.map((subItem: any) => renderSidebarItem(subItem, depth + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="flex flex-col gap-4">
      {/* Welcome Banner / Hero Section */}
      <div className="relative overflow-hidden rounded-[8px] bg-[#2A53A0] text-white flex items-center justify-between gap-4 shrink-0 h-[84px] border border-gray-100 dark:border-gray-700 px-4 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2A53A0] via-[#325FB4] to-[#2A53A0] opacity-90" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="bg-white/10 p-2.5 rounded-[8px] backdrop-blur-md border border-white/20">
            <Flash className="size-6 text-white" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-[18px] font-bold leading-tight">Welcome Back, Rajesh Kumar</h2>
            <p className="text-white/70 text-[11px] font-medium">Advance your fraud detection with high-density scenario authoring.</p>
          </div>
        </div>
        <div className="relative z-10 flex items-center gap-10">
          <div className="flex items-center gap-10">
            <div className="flex flex-col border-r border-white/20 pr-10">
              <span className="text-[9px] font-bold uppercase tracking-widest text-white/50 mb-1">Current Time</span>
              <span className="text-[16px] font-bold">08:23 AM</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold uppercase tracking-widest text-white/50 mb-1">Today's Date</span>
              <span className="text-[16px] font-bold uppercase">Mar 2</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button className="h-[36px] px-4 rounded-[8px] bg-white/10 border border-white/20 flex items-center gap-2 text-[12px] font-bold hover:bg-white/20 transition-colors shadow-sm">
               <Calendar className="size-4" />
               Select Date Range
               <ChevronDown className="size-4 opacity-70" />
             </button>
             <button className="h-[36px] px-4 rounded-[8px] bg-white text-[#2A53A0] flex items-center gap-2 text-[12px] font-bold hover:bg-gray-100 transition-colors shadow-sm border border-gray-100 dark:border-gray-700">
               <Export className="size-4" />
               Export Data
             </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-5 gap-4">
        {kpiData.map((stat, idx) => (
          <Card key={`kpi-${idx}`} className="p-4 flex flex-col justify-between h-[140px] bg-white dark:bg-gray-800 rounded-[8px] border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div className={cn("p-2 rounded-[8px]", stat.bg)}>
                <stat.icon className="size-5" style={{ color: stat.color }} />
              </div>
              <div className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", stat.diffColor)}>
                {stat.diff}
              </div>
            </div>
            <div className="mt-auto">
              <div className="text-[28px] font-bold text-[#101828] leading-none mb-1.5">{stat.value}</div>
              <div className="text-[13px] font-bold text-[#344054] leading-tight mb-0.5">{stat.label}</div>
              <div className="text-[11px] text-gray-400 font-medium leading-tight">{stat.sub}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action, idx) => (
            <Card key={`action-${idx}`} className={cn("relative p-5 bg-white dark:bg-gray-800 rounded-[8px] border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-sm transition-all cursor-pointer group h-[100px] overflow-hidden bg-gradient-to-br", action.bg)}>
              <div className="flex items-center gap-4 h-full relative z-10">
                <div className="p-2.5 rounded-[8px] bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                  <action.icon className="size-5" style={{ color: action.color }} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#101828] text-[15px] leading-tight mb-1 group-hover:text-[#2A53A0] transition-colors">{action.title}</span>
                  <p className="text-[11px] text-gray-500 font-medium leading-tight">{action.sub}</p>
                </div>
              </div>
              <div className="absolute right-[-10px] bottom-[-10px] opacity-[0.05] pointer-events-none scale-150 group-hover:opacity-[0.1] transition-opacity">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  <path d="M0 120L120 0H0V120Z" fill={action.color} />
                </svg>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Scenario Simulation Overview Section */}
      <div className="flex flex-col gap-4 mt-2 bg-white dark:bg-gray-800 p-4 rounded-[8px] border border-gray-100 dark:border-gray-700 shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-bold text-[#101828]">Scenario Simulation Overview</h3>
          <ContentSwitcher 
            className="h-[46px] w-auto bg-[#EAF2FF] dark:bg-gray-700/50 rounded-[8px] p-1 border border-gray-100 dark:border-gray-700 shadow-sm flex gap-1"
            selectedIndex={selectedSwitchIndex}
            onChange={(e: any) => setSelectedSwitchIndex(e.index)}
          >
            <Switch 
              name="all"
              text="All (56)" 
              className={cn(
                "h-full px-6 text-[12px] font-bold rounded-[6px] transition-all duration-200 border-none",
                selectedSwitchIndex === 0 ? "bg-[#2A53A0] text-white shadow-md scale-[1.02]" : "text-gray-600 hover:text-[#2A53A0]"
              )} 
            />
            <Switch 
              name="scenarios"
              text="Scenarios Only (31)" 
              className={cn(
                "h-full px-6 text-[12px] font-bold rounded-[6px] transition-all duration-200 border-none",
                selectedSwitchIndex === 1 ? "bg-[#2A53A0] text-white shadow-md scale-[1.02]" : "text-gray-600 hover:text-[#2A53A0]"
              )} 
            />
            <Switch 
              name="simulations"
              text="Simulations Only (25)" 
              className={cn(
                "h-full px-6 text-[12px] font-bold rounded-[6px] transition-all duration-200 border-none",
                selectedSwitchIndex === 2 ? "bg-[#2A53A0] text-white shadow-md scale-[1.02]" : "text-gray-600 hover:text-[#2A53A0]"
              )} 
            />
          </ContentSwitcher>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge className="bg-[#2A53A0] text-white px-4 py-1 text-[11px] font-bold rounded-[8px] border border-gray-100 dark:border-gray-700 shadow-sm">Total : 20</Badge>
            <Badge variant="outline" className="text-[#2A53A0] border border-gray-100 dark:border-gray-700 bg-[#EAF2FF] px-3 py-1 text-[11px] font-bold rounded-[8px] shadow-sm">Running : 3</Badge>
            <Badge variant="outline" className="text-gray-500 border border-gray-100 dark:border-gray-700 bg-gray-50 px-3 py-1 text-[11px] font-bold rounded-[8px] shadow-sm">Scheduled : 5</Badge>
            <Badge variant="outline" className="text-[#198038] border border-gray-100 dark:border-gray-700 bg-[#DEFBE6] px-3 py-1 text-[11px] font-bold rounded-[8px] shadow-sm">Completed : 10</Badge>
            <Badge variant="outline" className="text-[#F1C21B] border border-gray-100 dark:border-gray-700 bg-[#FFF8E1] px-3 py-1 text-[11px] font-bold rounded-[8px] shadow-sm">Queue : 2</Badge>
          </div>
          
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-[46px] w-[180px] flex items-center justify-between px-4 bg-white dark:bg-gray-900 border border-[#D1D5DC] rounded-[8px] hover:border-[#2A53A0] transition-all text-[13px] text-[#161616] dark:text-gray-200 font-medium group shadow-sm outline-none">
                  <span className="truncate">{dashboardWorkspaceFilter}</span>
                  <ChevronDown className="size-4 text-gray-500 group-data-[state=open]:rotate-180 transition-transform" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[180px] bg-white dark:bg-gray-900 border border-gray-200 shadow-lg rounded-[8px] p-1 mt-1 z-50">
                {['Workspace', 'All', 'Customer', 'Account', 'Organization'].map((item) => (
                  <DropdownMenuItem 
                    key={item}
                    onClick={() => setDashboardWorkspaceFilter(item)}
                    className={cn("px-4 py-2 text-[13px] cursor-pointer rounded-[6px] hover:bg-gray-100 dark:hover:bg-gray-800", dashboardWorkspaceFilter === item && "bg-gray-100 dark:bg-gray-800 text-[#2A53A0] font-semibold")}
                  >
                    {item}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-[46px] w-[180px] flex items-center justify-between px-4 bg-white dark:bg-gray-900 border border-[#D1D5DC] rounded-[8px] hover:border-[#2A53A0] transition-all text-[13px] text-[#161616] dark:text-gray-200 font-medium group shadow-sm outline-none">
                  <span className="truncate">{dashboardStatusFilter}</span>
                  <ChevronDown className="size-4 text-gray-500 group-data-[state=open]:rotate-180 transition-transform" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[180px] bg-white dark:bg-gray-900 border border-gray-200 shadow-lg rounded-[8px] p-1 mt-1 z-50">
                {['Status', 'All', 'Running', 'Scheduled', 'Completed', 'Queued'].map((item) => (
                  <DropdownMenuItem 
                    key={item}
                    onClick={() => setDashboardStatusFilter(item)}
                    className={cn("px-4 py-2 text-[13px] cursor-pointer rounded-[6px] hover:bg-gray-100 dark:hover:bg-gray-800", dashboardStatusFilter === item && "bg-gray-100 dark:bg-gray-800 text-[#2A53A0] font-semibold")}
                  >
                    {item}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[8px] overflow-hidden shadow-sm">
          <DataTable
            rows={scenarioSimulations}
            headers={tableHeaders}
          >
            {({
              rows,
              headers,
              getHeaderProps,
              getRowProps,
              getTableProps,
              getTableContainerProps,
            }) => (
              <TableContainer {...getTableContainerProps()} className="w-full overflow-x-auto no-scrollbar shadow-sm bg-transparent">
                <Table {...getTableProps()} size="sm" className="w-full">
                  <TableHead className="bg-[#F0F0F0]">
                    <TableRow className="border-b border-[#E0E0E0]">
                      {headers.map((header, index) => {
                        const { key, ...headerProps } = getHeaderProps({ header });
                        return (
                          <TableHeader 
                            key={key}
                            {...headerProps} 
                            className={cn(
                              "text-[15px] font-bold text-[#2A53A0] h-[48px] bg-transparent border-b border-[#E0E0E0]",
                              index === 0 && "pl-4"
                            )}
                          >
                            <div className="flex items-center gap-1.5">
                              {header.header}
                              <ArrowsVertical className="size-3 opacity-30" />
                            </div>
                          </TableHeader>
                        );
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => {
                      const simulation = scenarioSimulations.find(s => s.id === row.id);
                      if (!simulation) return null;
                      
                      const { key, ...rowProps } = getRowProps({ row });
                      return (
                        <TableRow key={key} {...rowProps} className="hover:bg-blue-50/30 transition-colors h-[46px] border-b border-[#E0E0E0]">
                          {row.cells.map((cell, cellIndex) => {
                            const headerKey = cell.info.header;
                            
                            if (headerKey === 'id') {
                              return (
                                <TableCell key={cell.id} className="font-mono text-[14px] font-medium text-[#2A53A0] py-0 pl-4 h-[46px]">
                                  {cell.value}
                                </TableCell>
                              );
                            }
                            if (headerKey === 'name') {
                              return (
                                <TableCell key={cell.id} className="text-[14px] font-medium text-[#101828] py-0 h-[46px]">
                                  {cell.value}
                                </TableCell>
                              );
                            }
                            if (headerKey === 'workspace') {
                              return (
                                <TableCell key={cell.id} className="py-0 h-[46px]">
                                  <span className={cn("text-[10px] font-medium px-2.5 py-1 rounded-[8px] flex items-center gap-1.5 w-fit uppercase tracking-tight shadow-sm border border-gray-100 dark:border-gray-700 text-[#101828]", simulation.workspaceColor.split(' ')[0])}>
                                    <div className="size-1.5 rounded-full bg-current opacity-40" />
                                    {cell.value}
                                  </span>
                                </TableCell>
                              );
                            }
                            if (headerKey === 'totalTxns' || headerKey === 'simulatedTxns') {
                              return (
                                <TableCell key={cell.id} className="text-[14px] text-[#101828] font-medium py-0 h-[46px]">
                                  {cell.value}
                                </TableCell>
                              );
                            }
                            if (headerKey === 'type') {
                              return (
                                <TableCell key={cell.id} className="py-0 h-[46px]">
                                  <span className={cn("text-[10px] font-medium px-2.5 py-1 rounded-[8px] w-fit tracking-tight shadow-sm border border-gray-100 dark:border-gray-700 text-[#101828]", simulation.typeColor.split(' ')[0])}>
                                    {cell.value}
                                  </span>
                                </TableCell>
                              );
                            }
                            if (headerKey === 'duration') {
                              return (
                                <TableCell key={cell.id} className="text-[14px] text-[#101828] font-medium py-0 h-[46px] whitespace-nowrap">
                                  {cell.value}
                                </TableCell>
                              );
                            }
                            if (headerKey === 'progress') {
                              return (
                                <TableCell key={cell.id} className="py-0 h-[46px] min-w-[80px] max-w-[100px]">
                                  <div className="w-full bg-gray-100 h-[7px] rounded-full overflow-hidden border border-gray-100 dark:border-gray-700">
                                    <div 
                                      className={cn("h-full rounded-full transition-all duration-1000", simulation.status === "Running" ? "bg-blue-600 animate-pulse" : "bg-[#2A53A0]")} 
                                      style={{ width: `${simulation.progress}%` }} 
                                    />
                                  </div>
                                </TableCell>
                              );
                            }
                            if (headerKey === 'status') {
                              return (
                                <TableCell key={cell.id} className="py-0 h-[46px] text-center pr-6">
                                  <Badge className={cn(
                                    "rounded-[8px] text-[10px] font-medium px-4 py-1 border border-gray-100 dark:border-gray-700 shadow-sm min-w-[94px] justify-center inline-flex uppercase tracking-widest text-[#101828]",
                                    cell.value === "Completed" ? "bg-[#DEFBE6]" : 
                                    cell.value === "Running" ? "bg-[#EAF2FF]" : 
                                    cell.value === "Queued" ? "bg-[#EAF2FF] opacity-60" : 
                                    cell.value === "Scheduled" ? "bg-gray-100" : "bg-gray-50"
                                  )}>
                                    {cell.value}
                                  </Badge>
                                </TableCell>
                              );
                            }
                            return <TableCell key={cell.id} className="py-0 h-[46px] font-medium text-[14px] text-[#101828]">{cell.value}</TableCell>;
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DataTable>
          
          {/* Custom Table Footer strictly matching Figma reference */}
          <div className="h-[48px] bg-white border-t border-gray-100 dark:border-gray-700 flex items-center justify-between shrink-0 font-['Inter',sans-serif]">
            {/* Left Section */}
            <div className="flex items-center h-full">
              <div className="flex items-center border-r border-gray-100 dark:border-gray-700 h-full px-4 gap-2">
                <span className="text-[14px] text-[#525252] font-normal leading-[24px]">Items per page:</span>
                <div className="relative flex items-center">
                  <select className="appearance-none bg-transparent pr-5 py-1 text-[14px] font-medium text-[#161616] outline-none cursor-pointer">
                    <option>10</option>
                  </select>
                  <ChevronDown className="absolute right-0 size-4 text-[#161616] pointer-events-none" />
                </div>
              </div>
              <div className="px-4 h-full flex items-center">
                <p className="text-[14px] font-medium text-[#161616] leading-[24px]">
                  1–10 <span className="font-normal text-[#525252]">of</span> 20 <span className="font-normal text-[#525252]">items</span>
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center h-full">
              <div className="flex items-center border-l border-gray-100 dark:border-gray-700 h-full px-4 gap-2">
                <div className="relative flex items-center">
                  <select className="appearance-none bg-transparent pr-5 py-1 text-[14px] font-medium text-[#161616] outline-none cursor-pointer">
                    <option>1</option>
                  </select>
                  <ChevronDown className="absolute right-0 size-4 text-[#161616] pointer-events-none" />
                </div>
                <span className="text-[14px] text-[#525252] font-normal leading-[24px]">of 2 pages</span>
              </div>
              <div className="flex items-center border-l border-gray-100 dark:border-gray-700 h-full">
                <button className="w-[48px] h-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm border-none">
                  <ChevronLeft className="size-5 text-[#161616] opacity-25" />
                </button>
                <button className="w-[48px] h-full flex items-center justify-center border-l border-gray-100 dark:border-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                  <ChevronRight className="size-5 text-[#161616]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full w-full overflow-hidden bg-white">
      {/* Local Sidebar */}
      <div className={cn("flex-shrink-0 border-r border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col transition-all duration-300 shadow-sm", isLocalSidebarCollapsed ? "w-[54px]" : "w-[240px]")}>
        <div className="flex-1 py-2 px-0 overflow-y-auto no-scrollbar space-y-1.5">
          {tmMenuStructure.map(item => renderSidebarItem(item))}
        </div>
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
            <button 
              onClick={() => setIsLocalSidebarCollapsed(!isLocalSidebarCollapsed)}
              className="flex items-center justify-center gap-3 w-full px-1 text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest text-[10px] font-black h-[36px]"
            >
                <ChevronRight className={cn("size-4 transition-transform", !isLocalSidebarCollapsed && "rotate-180")} />
                {!isLocalSidebarCollapsed && <span>Collapse Sidebar</span>}
            </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 bg-white overflow-hidden">
        
        {/* Module Header & Breadcrumb Section - Outside main content, shared between list and details */}
        <div className="h-[48px] px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between shrink-0 relative">
          <div className="flex items-center gap-4 truncate z-10">
             {selectedEvent || isAddingCustomEvent ? (
               <button 
                 onClick={() => {
                   setSelectedEvent(null);
                   setIsAddingCustomEvent(false);
                 }}
                 className="flex items-center justify-center size-8 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors cursor-pointer"
               >
                 <ArrowLeft className="size-5 text-[#525252]" />
               </button>
             ) : (
               <h1 className="text-[18px] font-semibold text-[#161616] dark:text-white truncate">
                 {menuInfo.item.label}
               </h1>
             )}
          </div>

          {/* Centered Page Header for Details/Add states */}
          {(selectedEvent || isAddingCustomEvent) && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h1 className="text-[20px] font-medium text-[#161616] dark:text-white pointer-events-auto">
                {isAddingCustomEvent ? "Add Custom Event" : "Event Details"}
              </h1>
            </div>
          )}

            <div className="flex items-center gap-2 z-10">
               {menuInfo.path.map((pathLabel, idx) => {
                 // Flattened breadcrumbs: Skip "Data Maintenance" specifically for Events sub-pages
                 // strictly omitting parent paths like 'Configuration' or 'TM Rules Configuration' for clean interface
                 if (pathLabel === "Data Maintenance" && menuInfo.path.includes("Events")) return null;
                 
                 // Determine if we need a separator (skip for the first visible element in the flattened path)
                 const isFirstVisible = idx === 0 || (idx === 1 && menuInfo.path[0] === "Data Maintenance" && menuInfo.path.includes("Events"));
                 
                 return (
                   <span key={`path-${idx}`} className="flex items-center gap-2">
                     {!isFirstVisible && <span className="text-[#D1D5DC] text-[12px]">/</span>}
                     <button 
                       onClick={() => {
                         const findIdByLabel = (items: any[]): string | null => {
                           for (const item of items) {
                             if (item.label === pathLabel) return item.id;
                             if (item.subItems) {
                               const found = findIdByLabel(item.subItems);
                               if (found) return found;
                             }
                           }
                           return null;
                         };
                         const targetId = findIdByLabel(tmMenuStructure);
                         if (targetId) setActiveItem(targetId);
                         setSelectedEvent(null);
                         setIsAddingCustomEvent(false);
                       }}
                       className={cn(
                         "text-[14px] font-normal transition-colors text-nowrap",
                         idx === menuInfo.path.length - 1 && !activeTab && !selectedEvent && !isAddingCustomEvent 
                          ? "text-[#161616] cursor-default" 
                          : "text-[#2A53A0] hover:underline cursor-pointer"
                       )}
                     >
                       {pathLabel}
                     </button>
                   </span>
                 );
               })}
               
               {activeItem === 'event' && (
                 <span className="flex items-center gap-2">
                   <span className="text-[#D1D5DC] text-[12px]">/</span>
                   <button 
                     onClick={() => {
                       setSelectedEvent(null);
                       setIsAddingCustomEvent(false);
                     }}
                     className={cn(
                       "text-[14px] font-normal transition-colors",
                       !selectedEvent && !isAddingCustomEvent ? "text-[#161616] cursor-default" : "text-[#2A53A0] hover:underline cursor-pointer"
                     )}
                   >
                     {activeTab === 'ootb' ? "OOTB Events" : "Custom Events"}
                   </button>
                 </span>
               )}

               {(selectedEvent || isAddingCustomEvent) && (
                 <span className="flex items-center gap-2">
                   <span className="text-[#D1D5DC] text-[12px]">/</span>
                   <span className="text-[14px] font-medium text-[#161616] dark:text-gray-300">
                      {isAddingCustomEvent ? "Add Custom Event" : selectedEvent?.name}
                   </span>
                 </span>
               )}
            </div>
          </div>

        {/* Tab Navigation Section - Divided into 2 equal parts based on Reference Image */}
        {activeItem === 'event' && !selectedEvent && !isAddingCustomEvent && (
          <div className="shrink-0 grid grid-cols-2 h-[48px] border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 relative z-20 px-4">
            <button 
              onClick={() => setActiveTab('ootb')}
              className={cn(
                "flex items-center justify-center gap-2 text-[14px] transition-all relative h-[48px] border-r border-gray-100 dark:border-gray-700 px-4 whitespace-nowrap",
                activeTab === 'ootb' ? "text-[#2A53A0] font-bold bg-white dark:bg-gray-800" : "text-gray-500 font-medium hover:bg-gray-50 dark:hover:bg-gray-700/30 hover:text-gray-700"
              )}
            >
              OOTB Events
              <span className="flex items-center justify-center min-w-[20px] h-[20px] px-1 rounded-full bg-[#F2F4F8] text-[#6A7282] text-[10px] font-bold border border-gray-100 shadow-sm">8</span>
              {activeTab === 'ootb' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#2A53A0] rounded-t-full shadow-[0_-1px_4px_rgba(42,83,160,0.2)]" />
              )}
            </button>
            <button 
              onClick={() => setActiveTab('custom')}
              className={cn(
                "flex items-center justify-center gap-2 text-[14px] transition-all relative h-[48px] px-4 whitespace-nowrap",
                activeTab === 'custom' ? "text-[#2A53A0] font-bold bg-white dark:bg-gray-800" : "text-gray-500 font-medium hover:bg-gray-50 dark:hover:bg-gray-700/30 hover:text-gray-700"
              )}
            >
              Custom Events
              <span className="flex items-center justify-center min-w-[20px] h-[20px] px-1 rounded-full bg-[#F2F4F8] text-[#6A7282] text-[10px] font-bold border border-gray-100 shadow-sm">8</span>
              {activeTab === 'custom' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#2A53A0] rounded-t-full shadow-[0_-1px_4px_rgba(42,83,160,0.2)]" />
              )}
            </button>
          </div>
        )}

        {/* Content Area */}
        <div className={cn(
          "flex-1 flex flex-col overflow-y-auto no-scrollbar bg-white",
          (selectedEvent || isAddingCustomEvent) ? "p-0" : "p-0"
        )}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem + (isAddingCustomEvent ? "-adding" : "") + (isVerifyingEvent ? "-verifying" : "")}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {isAddingCustomEvent ? (
                <AddCustomEvent 
                  onBack={() => setIsAddingCustomEvent(false)}
                  onComplete={(data) => {
                    setLastCreatedEvent(data);
                    setIsAddingCustomEvent(false);
                    setActiveItem('pending-verification');
                  }}
                />
              ) : isVerifyingEvent ? (
                <VerifyEvent 
                  eventData={lastCreatedEvent}
                  onBack={() => setIsVerifyingEvent(false)}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ) : activeItem === "pending-verification" ? (
                <div className="flex flex-col h-full bg-white p-0 overflow-y-auto no-scrollbar">
                  <div className="flex items-center justify-between mb-4 px-4 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-[280px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#6A7282]" />
                        <input 
                          type="text" 
                          placeholder="Search by name, ID or desc..." 
                          className="w-full h-[46px] pl-10 pr-4 bg-white border border-[#D1D5DC] rounded-[8px] text-[13px] outline-none focus:border-[#2A53A0] font-['Inter',sans-serif]"
                        />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="h-[46px] w-[180px] flex items-center justify-between px-4 bg-white dark:bg-gray-900 border border-[#D1D5DC] rounded-[8px] hover:border-[#2A53A0] transition-all text-[13px] text-[#161616] dark:text-gray-200 font-medium group shadow-sm outline-none">
                            <span className="truncate">{artifactTypeFilter}</span>
                            <ChevronDown className="size-4 text-gray-500 group-data-[state=open]:rotate-180 transition-transform" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[180px] bg-white dark:bg-gray-900 border border-gray-200 shadow-lg rounded-[8px] p-1 mt-1 z-50">
                          {['Artifact Type', 'Scenario', 'Event', 'UDV', 'SEC', 'View', 'Virtual SE'].map((item) => (
                            <DropdownMenuItem 
                              key={item}
                              onClick={() => setArtifactTypeFilter(item)}
                              className={cn("px-4 py-2 text-[13px] cursor-pointer rounded-[6px] hover:bg-gray-100 dark:hover:bg-gray-800", artifactTypeFilter === item && "bg-gray-100 dark:bg-gray-800 text-[#2A53A0] font-semibold")}
                            >
                              {item}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="h-[46px] w-[200px] flex items-center justify-between px-4 bg-white dark:bg-gray-900 border border-[#D1D5DC] rounded-[8px] hover:border-[#2A53A0] transition-all text-[13px] text-[#161616] dark:text-gray-200 font-medium group shadow-sm outline-none">
                            <span className="truncate">{workspaceFilter}</span>
                            <ChevronDown className="size-4 text-gray-500 group-data-[state=open]:rotate-180 transition-transform" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[200px] bg-white dark:bg-gray-900 border border-gray-200 shadow-lg rounded-[8px] p-1 mt-1 z-50">
                          {[
                            'Workspace', 'Account', 'Customer', 'Non-customer', 'Branch', 
                            'User (staff)', 'Transaction', 'Payment Card', 
                            'G customer', 'Merchant', 'Terminal', 'Beneficiary'
                          ].map((item) => (
                            <DropdownMenuItem 
                              key={item}
                              onClick={() => setWorkspaceFilter(item)}
                              className={cn("px-4 py-2 text-[13px] cursor-pointer rounded-[6px] hover:bg-gray-100 dark:hover:bg-gray-800", workspaceFilter === item && "bg-gray-100 dark:bg-gray-800 text-[#2A53A0] font-semibold")}
                            >
                              {item}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-2 text-[#525252] text-[12px] font-medium">
                      <Information className="size-[14px] text-[#2A53A0]" />
                      4 Artifacts found
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[8px] overflow-hidden shadow-sm flex-1 flex flex-col mx-4 mb-4">
                    <div className="flex-1 overflow-auto no-scrollbar">
                      <table className="w-full text-left border-collapse table-fixed">
                        <thead className="sticky top-0 z-10 shadow-sm">
                          <tr className="bg-[#F0F0F0] text-[#161616] h-[48px]">
                            <th className="text-[15px] font-medium text-[#2A53A0] bg-[#F0F0F0] px-4 w-[25%] align-middle whitespace-nowrap group cursor-pointer">
                              <div className="flex items-center gap-1">
                                Name <ArrowsVertical className="size-3 opacity-30 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </th>
                            <th className="text-[15px] font-medium text-[#2A53A0] bg-[#F0F0F0] px-4 w-[12%] align-middle whitespace-nowrap group cursor-pointer">
                              <div className="flex items-center gap-1">
                                Type <ArrowsVertical className="size-3 opacity-30 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </th>
                            <th className="text-[15px] font-medium text-[#2A53A0] bg-[#F0F0F0] px-4 w-[14%] align-middle whitespace-nowrap group cursor-pointer">
                              <div className="flex items-center gap-1">
                                Workspace <ArrowsVertical className="size-3 opacity-30 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </th>
                            <th className="text-[15px] font-medium text-[#2A53A0] bg-[#F0F0F0] px-4 w-[24%] align-middle whitespace-nowrap group cursor-pointer">
                              <div className="flex items-center gap-1">
                                Description <ArrowsVertical className="size-3 opacity-30 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </th>
                            <th className="text-[15px] font-medium text-[#2A53A0] bg-[#F0F0F0] px-4 w-[12%] align-middle whitespace-nowrap group cursor-pointer">
                              <div className="flex items-center gap-1">
                                Updated <ArrowsVertical className="size-3 opacity-30 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </th>
                            <th className="text-[15px] font-medium text-[#2A53A0] bg-[#F0F0F0] px-4 w-[13%] align-middle whitespace-nowrap group cursor-pointer">
                              <div className="flex items-center gap-1">
                                Status <ArrowsVertical className="size-3 opacity-30 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </th>
                            <th className="text-[15px] font-medium text-[#2A53A0] bg-[#F0F0F0] px-4 w-[80px] text-center align-middle whitespace-nowrap">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900">
                          {[
                            { name: "Sample Event", type: "Event", workspace: "Transaction", description: "Updated configuration", date: "2026-03-09", status: "Pending Approval" },
                            { name: "High_Value_Wire_Transfer", type: "Event", workspace: "Transaction", description: "Verification pending for international high-value tran", date: "2025-02-13", status: "Pending Approval" },
                            { name: "Login_Location_Anomaly", type: "Event", workspace: "Terminal", description: "New custom event for tracking geofencing alerts", date: "2025-02-13", status: "Pending Approval" },
                            { name: "Swift_Message_Modified", type: "Event", workspace: "Transaction", description: "Review required for modified Swift message fields m", date: "2025-02-13", status: "Rejected" },
                          ].map((item, idx) => (
                            <tr key={idx} className="h-[46px] border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                              <td className="px-4 py-0 align-middle">
                                <div className="flex items-center gap-2">
                                  <Events className="size-4 text-[#2A53A0]" />
                                  <span className="text-[15px] font-medium text-gray-900 dark:text-white truncate">{item.name}</span>
                                </div>
                              </td>
                              <td className="px-4 py-0 align-middle">
                                <Badge className="bg-[#F1FBFA] text-[#005D5D] border border-[#A7F0BA] text-[11px] font-medium px-2 py-0.5 rounded-[6px] h-[26px] flex items-center gap-1 w-fit">
                                  <Events className="size-3" />
                                  {item.type}
                                </Badge>
                              </td>
                              <td className="px-4 py-0 align-middle">
                                <Badge className={cn(
                                  "text-[11px] font-medium px-2 py-0.5 rounded-[6px] h-[26px] flex items-center gap-1 w-fit",
                                  item.workspace === "Transaction" ? "bg-[#D9FBFB] text-[#004144]" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                                )}>
                                  {item.workspace === "Transaction" ? <Flash className="size-3" /> : <DataSettings className="size-3" />}
                                  {item.workspace}
                                </Badge>
                              </td>
                              <td className="px-4 py-0 align-middle">
                                <span className="text-[15px] text-gray-600 dark:text-gray-400 truncate block">{item.description}</span>
                              </td>
                              <td className="px-4 py-0 align-middle">
                                <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 text-[13px]">
                                  <Calendar className="size-3.5 text-[#2A53A0] opacity-70" />
                                  {item.date}
                                </div>
                              </td>
                              <td className="px-4 py-0 align-middle">
                                <Badge className={cn(
                                  "text-[11px] font-medium px-3 py-0.5 rounded-full h-[28px] flex items-center justify-center w-fit border shadow-none",
                                  item.status === "Pending Approval" ? "bg-[#FFF9E5] text-[#B28600] border-[#FDEBB2]" : "bg-[#FFF1F1] text-[#DA1E28] border-[#FFD7D7]"
                                )}>
                                  {item.status}
                                </Badge>
                              </td>
                              <td className="px-4 py-0 align-middle text-center">
                                <button 
                                  onClick={() => setIsVerifyingEvent(true)}
                                  className="size-7 rounded-[6px] bg-[#F2F0FF] dark:bg-blue-900/20 border border-[#E1DBFF] dark:border-blue-800 flex items-center justify-center hover:bg-[#E1DBFF] dark:hover:bg-blue-800/40 transition-colors cursor-pointer mx-auto"
                                >
                                  <Security className="size-4 text-[#6929C4]" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="shrink-0">
                      <CarbonPaginationFooter 
                        totalItems={4} 
                        pageSize={pageSize} 
                        currentPage={currentPage} 
                        onPageChange={setCurrentPage}
                        onPageSizeChange={(size) => {
                          setPageSize(size);
                          setCurrentPage(1);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : activeItem === "dashboard" ? (
                <div className="p-4 h-full overflow-y-auto no-scrollbar">
                  {renderDashboard()}
                </div>
              ) : 
               activeItem === "event" ? (
                 selectedEvent ? (
                   <EventDetails 
                     event={selectedEvent} 
                     onBack={() => setSelectedEvent(null)} 
                   />
                 ) : (
                   <div className="p-4 h-full overflow-y-auto no-scrollbar">
                     <EventsManagement 
                       activeTab={activeTab} 
                       onViewEvent={(event) => setSelectedEvent(event)} 
                       onAddCustomEvent={() => setIsAddingCustomEvent(true)}
                     />
                   </div>
                 )
               ) : (
                <div className="flex flex-col h-full items-center justify-center text-center p-12 bg-gray-50/30 dark:bg-gray-900/10 rounded-[8px] border border-dashed border-gray-100 dark:border-gray-700">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-full shadow-sm mb-6 border border-gray-100 dark:border-gray-700">
                    {menuInfo.item.icon && <menuInfo.item.icon className="size-12 text-[#2A53A0]" />}
                  </div>
                  <h3 className="text-[20px] font-bold text-gray-900 mb-2">{menuInfo.item.label}</h3>
                  <p className="text-gray-500 max-w-md mx-auto">This module is part of the Out-of-the-box TM Rules Configuration. Detailed configuration for {menuInfo.item.label} is currently in maintenance.</p>
                  <div className="flex gap-4 mt-8">
                    <button className="h-[40px] px-6 rounded-[8px] bg-[#2A53A0] text-white font-bold text-[13px] hover:bg-[#1e3a70] transition-colors shadow-sm border border-gray-100 dark:border-gray-700">Initialize Module</button>
                    <button className="h-[40px] px-6 rounded-[8px] border border-gray-100 dark:border-gray-700 text-gray-600 font-bold text-[13px] hover:bg-gray-50 transition-colors bg-white dark:bg-gray-800 shadow-sm">View Guidelines</button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {isApproving && <CreationLoader />}
      <CreationSuccessDialog 
        isOpen={showApproveSuccess}
        onContinue={handleApproveContinue}
        eventName={lastCreatedEvent?.name || ""}
        title="Success"
        message="Event Successfully Approved"
      />
    </div>
  );
}
