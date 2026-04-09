import { useState, useRef, isValidElement } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "sonner@2.0.3";
import { ModernHeader } from "./components/modern-header";
import { UnifiedSidebar } from "./components/unified-sidebar";
import { ModuleContent } from "./components/module-content";
import { ScrollToTopButton } from "./components/scroll-to-top-button";
import { DashboardOverview } from "./components/dashboard-overview";
import { ComplianceAnalytics } from "./components/dashboards/compliance-analytics";
import { RiskManagement } from "./components/dashboards/risk-management";
import { TransactionMonitoring } from "./components/dashboards/transaction-monitoring";
import { PaymentMonitoring } from "./components/dashboards/payment-monitoring";
import { CustomerIntelligence } from "./components/dashboards/customer-intelligence";
import { OperationalMetrics } from "./components/dashboards/operational-metrics";
import { ExecutiveSummary } from "./components/dashboards/executive-summary";
import { AlertsNotifications } from "./components/dashboards/alerts-notifications";
import { ScreeningDashboard } from "./components/dashboards/screening-dashboard";
import { LoD2Dashboard } from "./components/dashboards/lod2-dashboard";
import { LoginScreen } from "./components/login-screen";
import { TwoFactorAuth } from "./components/two-factor-auth";
import { BreadcrumbNav } from "./components/breadcrumb-nav";
import { ActionMaintenance } from "./components/action-maintenance";
import { ScenarioAuthoringTool } from "./components/scenario-authoring-tool";
import { AlertsSimulation } from "./components/dashboards/alerts-simulation";
import { ManualScreening } from "./components/manual-screening";
import { SanctionScreeningWorkflow } from "./components/sanction-screening-workflow";
import { HumanTraffickingAlertsConfiguration } from "./components/human-trafficking-alerts-configuration";
import { WildlifeTraffickingAlertsConfiguration } from "./components/wildlife-trafficking-alerts-configuration";
import { MuleAlertsConfiguration } from "./components/mule-alerts-configuration";
import { TbmlAlertsConfiguration } from "./components/tbml-alerts-configuration";
import { CyberFraudConfiguration } from "./components/cyber-fraud-configuration";
import { HighRiskCountries } from "./components/high-risk-countries";
import { TMRulesConfiguration } from "./components/tm-rules-configuration";
import { SanctionsScreeningConfiguration } from "./components/sanctions-screening-configuration";
import { CustomerRiskRatingConfiguration } from "./components/customer-risk-rating-configuration";
import { Customer360View, Customer360Handle } from "./components/customer-360-view";
import { SanctionListManagement } from "./components/sanction-list-management";
import { SanctionMisReports } from "./components/sanction-mis-reports";
import { DedupScreening } from "./components/dedup-screening";
import { GenericPage } from "./components/GenericPage";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";

import {
  Dashboard,
  User,
  UserAdmin,
  Portfolio,
  Purchase, // Using Purchase as CreditCard might not be available or Purchase is safer
  Security,
  Scan,
  Activity,
  UserFollow,
  Document,
  UserProfile,
  Branch,
  Globe,
  ScanAlt,
  Copy,
  Warning,
  Flow,
  Stop,
  Touch_1,
  Layers,
  List,
  ListChecked,
  ChartBar,
  Certificate,
  ChartLine,
  Edit,
  Flash,
  Notification,
  CheckmarkFilled,
  Money,
  Cognitive,
  Share,
  Search,
  Group,
  ChartScatter,
  Help,
  Chat,
  SettingsAdjust,
  DocumentImport,
  DocumentView,
  Send,
  Printer,
  Script,
  Building,
  Chemistry,
  Settings,
  Time,
  View,
  Locked,
  Logout,
  Menu,
  Home,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Add,
  Subtract,
  Close,
  Checkmark,
  Calendar,
  Scales,
  Blockchain,
  Play,
  ChartRadar,
  Identification,
  DataView,
  Network_4,
  Report,
  Meter,
  FlowData
} from "@carbon/icons-react";

import { RegulatoryReportView } from "./components/regulatory-report-view";
import AppFooter from "./components/app-footer";
import { GraphicalNetworkAnalysis } from "./components/graphical-network-analysis";

export default function App() {
  const mainContentRef = useRef<HTMLElement>(null);
  const customer360Ref = useRef<Customer360Handle>(null);
  const createSubItems = (items: { label: string; icon: any; description?: string }[]) => 
    items.map(item => ({
      id: item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      ...item
    }));

  const dashboardSubItems = createSubItems([
    { label: "User Dashboard & KPI Metrics", icon: User, description: "Personalized dashboard" },
    { label: "Supervisor Dashboard", icon: UserAdmin, description: "Team oversight" },
    { label: "CXO Dashboard", icon: ChartRadar, description: "Executive summary" },
    { label: "Payments Dashboard", icon: Money, description: "Payment flows" },
    { label: "Risk Dashboard", icon: Security, description: "Risk metrics" },
    { label: "Screening Dashboard", icon: Search, description: "Screening status" },
    { label: "Transaction Monitoring Dashboard", icon: Activity, description: "TM alerts" },
    { label: "Customer Onboarding Dashboard", icon: UserFollow, description: "Onboarding progress" },
    { label: "Regulatory Reports Dashboard", icon: Document, description: "Reporting status" },
    { label: "2LoD Dashboard", icon: Security, description: "Second line of defense" },
  ]);

  const kycItems = createSubItems([
    { label: "Customer Details", icon: Identification },
    { label: "Account Details", icon: Purchase },
    { label: "Ongoing / Periodic CDD & EDD Workflow", icon: Branch },
    { label: "Customer 360° View", icon: DataView },
  ]);

  const onboardingItems = createSubItems([
    { label: "Online Screening", icon: ScanAlt },
    { label: "De-dup Screening", icon: Copy },
    { label: "Online Risk Categorization", icon: Warning },
    { label: "Onboarding / CDD / EDD Workflow", icon: Flow },
  ]);

  const sanctionsItems = createSubItems([
    { label: "Manual Screening (Single / File-based)", icon: Touch_1 },
    { label: "Batch Screening (Forward Screening / Reverse Screening)", icon: Layers },
    { label: "De-dup Screening", icon: Copy },
    { label: "Exception List Management", icon: List },
    { label: "Sanction / Custom List Management", icon: ListChecked },
    { label: "Sanction Screening Workflow", icon: Flow },
    { label: "Sanction MIS Reports", icon: ChartBar },
  ]);

  const riskItems = createSubItems([
    { label: "Customer Risk Profile", icon: Certificate },
    { label: "Risk Trend Analysis", icon: ChartLine },
    { label: "Manual Risk Override", icon: Edit },
  ]);

  const realtimeItems = createSubItems([
    { label: "Online Alerts Repository & Case Workflow", icon: Notification },
    { label: "False Positives Management", icon: CheckmarkFilled },
  ]);

  const batchItems = createSubItems([
    { label: "Batch Alerts Repository & Case Workflow", icon: Layers },
    { label: "False Positives Management", icon: CheckmarkFilled },
  ]);

  const paymentsItems = createSubItems([
    { label: "International Payments Workflow", icon: Globe },
    { label: "Domestic Payments Workflow", icon: Home },
  ]);

  const aiItems = createSubItems([
    { label: "Genie", icon: Cognitive },
    { label: "Graphical Network Analysis", icon: Network_4 },
    { label: "Customer 360° View", icon: DataView },
    { label: "Smart Transaction Explorer", icon: Search },
    { label: "Peer Pattern Analysis", icon: Group },
    { label: "Outlier Pattern Analysis", icon: ChartScatter },
    { label: "Second Line of Defence (LoD)", icon: Security },
  ]);

  const rfiItems = createSubItems([
    { label: "RFI Communication Tracker", icon: Chat },
  ]);

  const reportsItems = createSubItems([
    { label: "Regulatory MIS Reports", icon: Report },
    { label: "Operational MIS Reports", icon: Meter },
    { label: "Custom Reports", icon: Edit },
    { label: "Audit Reports", icon: DocumentView },
    { label: "SWIFT Payment Reports", icon: Send },
  ]);

  const regGenItems = createSubItems([
    { label: "goAML Report Generation", icon: Script },
  ]);

  const fiuIndItems = createSubItems([
    { label: "STR Report", icon: Report },
    { label: "Advanced STR Report", icon: Report },
    { label: "CTR Report", icon: Money },
    { label: "NTR Report", icon: Report },
    { label: "CBWTR Report", icon: Globe },
    { label: "CCR Report", icon: Warning },
    { label: "Data Maintenance", icon: DataView },
    { label: "Audit History", icon: Time },
  ]);

  const simItems = createSubItems([
    { label: "Alerts Simulation", icon: Notification },
    { label: "Screening Simulation", icon: Scan },
    { label: "Risk Simulation", icon: Security },
  ]);

  const configItems = createSubItems([
    { label: "Default Reference Masters", icon: Settings },
    { label: "Custom Reference Masters", icon: Settings },
    { label: "High-Risk Countries", icon: Globe },
    { label: "Sanctions Screening Configuration", icon: Stop },
    { label: "Screening – Exception List Configuration", icon: List },
    { label: "Screening – Ignore Words Configuration", icon: Edit },
    { label: "Screening – Keywords Configuration", icon: Edit },
    { label: "CDD / EDD Configuration", icon: Security },
    { label: "Customer Risk Rating Configuration", icon: Warning },
    { label: "Out-of-the-box TM Rules Configuration", icon: SettingsAdjust },
    { label: "Mule Alerts Configuration", icon: Warning },
    { label: "TBML & Proliferation Financing Alerts Configuration", icon: Warning },
    { label: "Human Trafficking Alerts Configuration", icon: Warning },
    { label: "Wildlife Trafficking Alerts Configuration", icon: Warning },
    { label: "Cyber-enabled Fraud Configuration", icon: Security },
    { label: "Rule Design Studio", icon: FlowData },
    { label: "Observed Suspicion Alerts Creation", icon: Notification },
    { label: "Payments Alerts Configuration", icon: Purchase },
    { label: "Transaction Alerts Risk Scoring", icon: ChartLine },
    { label: "Peer Profiling Configuration", icon: Group },
    { label: "Outlier Analysis Configuration", icon: ChartScatter },
    { label: "Reports Configuration", icon: ChartBar },
    { label: "Notifications / Reminders Configuration", icon: Notification },
    { label: "Agentic AI Configuration", icon: Cognitive },
    { label: "GenAI Configuration", icon: Cognitive },
    { label: "Default Comments", icon: Chat },
    { label: "4-Eyes (Maker–Checker) Configuration", icon: View },
  ]);

  const adminItems = createSubItems([
    { label: "User Management / Access Control / User Administration", icon: Group },
    { label: "Audit Trail / Audit Log", icon: Time },
    { label: "4-Eyes (Maker–Checker) Approval", icon: View },
    { label: "Reports Assignment", icon: Document },
    { label: "Login / Password Settings", icon: Locked },
    { label: "IP Address Control", icon: Security },
    { label: "View Logged-in Users", icon: Group },
  ]);

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Changed to false to enable login page
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [username, setUsername] = useState("Rajesh Kumar"); // Default user
  const [userRole, setUserRole] = useState("System Administrator"); // Default role
  const [activeItem, _setActiveItem] = useState("dashboard"); // Set to Dashboard Overview by default
  const [refreshKey, setRefreshKey] = useState(0);
  const [extraBreadcrumbs, setExtraBreadcrumbs] = useState<any[]>([]);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(true); // Default to true to show dashboard submenu
  
  const setActiveItem = (item: string) => {
    // Handle External Links
    if (item === "ai-genie") {
       window.open("https://genai.clari5.com", "_blank");
       return;
    }
    
    if (item === "reg_gen-advanced-str-report") {
       window.open("https://cashew-easel-81680794.figma.site/", "_blank");
       return;
    }

    // Collapse main application's sidebar when "Out-of-the-box TM Rules Configuration" is selected
    if (item === "config-out-of-the-box-tm-rules-configuration") {
      setIsSidebarCollapsed(true);
    } else {
      setIsSidebarCollapsed(false);
    }

    setExtraBreadcrumbs([]);
    if (item === activeItem) {
      setRefreshKey(prev => prev + 1);
    } else {
      _setActiveItem(item);
    }
  };
  
  // 2FA State - Load from localStorage
  const [is2FAEnabled, setIs2FAEnabled] = useState(() => {
    const saved = localStorage.getItem("is2FAEnabled");
    return saved === null ? true : saved === "true"; // Default to enabled
  });

  // Define menu items for sidebar with submenus
  const menuItems = [
    {
      id: "kyc",
      title: "KYC",
      icon: UserProfile,
      gradient: "from-emerald-500 via-teal-600 to-green-600",
      subItems: kycItems,
    },
    {
      id: "onboarding",
      title: "Customer Onboarding",
      icon: UserFollow,
      gradient: "from-indigo-500 via-violet-600 to-purple-600",
      subItems: onboardingItems,
    },
    {
      id: "sanctions",
      title: "Sanction Screening",
      icon: Search,
      gradient: "from-rose-500 via-red-600 to-orange-600",
      subItems: sanctionsItems,
    },
    {
      id: "risk",
      title: "Customer Risk View",
      icon: Security,
      gradient: "from-amber-500 via-orange-600 to-red-600",
      subItems: riskItems,
    },
    {
      id: "rtm",
      title: "Real-time Monitoring",
      icon: Flash,
      gradient: "from-yellow-400 via-amber-500 to-orange-500",
      subItems: realtimeItems,
    },
    {
      id: "batch",
      title: "Batch Monitoring",
      icon: Layers,
      gradient: "from-slate-500 via-gray-600 to-zinc-600",
      subItems: batchItems,
    },
    {
      id: "payments",
      title: "Payments Workflow(Real time)",
      icon: Money,
      gradient: "from-green-500 via-emerald-600 to-teal-600",
      subItems: paymentsItems,
    },
    {
      id: "ai",
      title: "AI-Powered Investigation Analytics",
      icon: Cognitive,
      gradient: "from-purple-500 via-fuchsia-600 to-pink-600",
      subItems: aiItems,
    },
    {
      id: "rfi",
      title: "LEA / RFI Tracker",
      icon: Help,
      gradient: "from-cyan-500 via-sky-600 to-blue-600",
      subItems: rfiItems,
    },
    {
      id: "reports",
      title: "MIS Reports",
      icon: ChartBar,
      gradient: "from-orange-500 via-red-600 to-rose-600",
      subItems: reportsItems,
    },
    {
      id: "reg_gen",
      title: "Regulatory Reports",
      icon: Scales,
      gradient: "from-teal-500 via-green-600 to-emerald-600",
      subItems: regGenItems,
      categories: [
        {
          id: "fiu-ind",
          label: "FIU-IND Report Generation",
          icon: Building,
          items: fiuIndItems
        }
      ]
    },
    {
      id: "simulation",
      title: "Simulation",
      icon: Play,
      gradient: "from-pink-500 via-rose-600 to-red-600",
      subItems: simItems,
    },
    {
      id: "config",
      title: "Configuration",
      icon: Settings,
      gradient: "from-gray-500 via-slate-600 to-zinc-600",
      subItems: configItems,
    },
    {
      id: "admin",
      title: "Administration",
      icon: Security,
      gradient: "from-red-500 via-red-600 to-red-700",
      subItems: adminItems,
    },
  ];

  // Get current view content based on activeItem
  const getCurrentContent = () => {
    // 1. Regulatory Reports - FIU-IND Dynamic View
    if (activeItem.startsWith("reg_gen-")) {
       const subItem = activeItem.replace("reg_gen-", "");
       if (["str-report", "ctr-report", "ntr-report", "cbwtr-report", "ccr-report"].includes(subItem)) {
           const reportType = subItem.replace("-report", "").toUpperCase();
           return {
             type: "regulatory-report",
             title: `${reportType} Report`,
             reportType,
             breadcrumbs: [
               { label: "Regulatory Reports", path: "reg_gen" },
               { label: "FIU-IND Report Generation", path: "reg_gen" },
               { label: `${reportType} Report`, path: activeItem, isActive: true }
             ]
           };
       }
    }

    // 2. Dashboard specific
    if (activeItem === "dashboard" || activeItem.startsWith("dashboard-")) {
       let pageLabel = "Overview";
       if (activeItem !== "dashboard") {
          const itemId = activeItem.replace("dashboard-", "");
          const item = dashboardSubItems.find(i => i.id === itemId);
          if (item) pageLabel = item.label;
       }
       return { 
         type: "dashboard",
         breadcrumbs: [
           { label: "Dashboard", path: "dashboard" },
           { label: pageLabel, path: activeItem, isActive: true }
         ]
       };
    }

    // Generic Item Lookup
    const parts = activeItem.split("-");
    if (parts.length > 1) {
       const moduleId = parts[0];
       const itemId = parts.slice(1).join("-");
       
       const menu = menuItems.find(m => m.id === moduleId);
       if (menu) {
          let subItem = menu.subItems?.find(i => i.id === itemId);
          let categoryLabel = "";

          if (!subItem && (menu as any).categories) {
             for (const cat of (menu as any).categories) {
                const found = cat.items.find((i: any) => i.id === itemId);
                if (found) {
                   subItem = found;
                   categoryLabel = cat.label;
                   break;
                }
             }
          }

          if (subItem) {
             const breadcrumbs = [
                { label: menu.title, path: moduleId },
             ];
             
             if (categoryLabel) {
                breadcrumbs.push({ label: categoryLabel, path: moduleId, isActive: false });
             }
             
             breadcrumbs.push({ label: subItem.label, path: activeItem, isActive: true });

             return {
                type: "page",
                title: subItem.label,
                description: subItem.description || `Manage ${subItem.label}`,
                icon: subItem.icon,
                breadcrumbs
             };
          }
       }
    }

    // Module Root
    const menu = menuItems.find(m => m.id === activeItem);
    if (menu) {
       return {
          type: "module",
          title: menu.title.toUpperCase(),
          version: "v1.0",
          icon: menu.icon,
          gradient: menu.gradient,
          items: menu.subItems || [],
          description: `Manage ${menu.title}`,
          breadcrumbs: [
             { label: menu.title, path: menu.id, isActive: true }
          ]
       };
    }

    return { 
      type: "dashboard",
      breadcrumbs: [
        { label: "Dashboard", path: "dashboard" },
        { label: "Overview", path: "dashboard-overview", isActive: true }
      ]
    };
  };

  const currentContent = getCurrentContent();
  const headerTitle = (currentContent as any).title || 
                    currentContent.breadcrumbs?.[currentContent.breadcrumbs.length - 1]?.label || 
                    "Overview";

  const searchableItems = menuItems.flatMap(menu => 
    (menu.subItems || []).map(item => ({
      id: `${menu.id}-${item.id}`,
      title: item.label,
      module: menu.title,
      type: "Navigation",
      description: item.description || `Navigate to ${item.label}`,
      path: `${menu.id}-${item.id}`
    }))
  );

  const handleLogin = (user: string) => {
    setUsername(user);
    const userRoles: { [key: string]: string } = {
      "Rajesh Kumar": "System Administrator",
      "Priya Sharma": "Compliance Officer",
      "Amit Patel": "Senior Analyst",
      "Ananya Reddy": "Risk Manager",
      "Vikram Singh": "Audit Manager",
      "Sneha Gupta": "AML Specialist",
      "Arjun Mehta": "Investigation Lead",
      "Kavya Iyer": "Compliance Analyst",
    };
    setUserRole(userRoles[user] || "Compliance Analyst");
    
    if (is2FAEnabled) {
      setShowTwoFactor(true);
    } else {
      setIsLoggedIn(true);
    }
  };

  const handleTwoFactorVerify = () => {
    setShowTwoFactor(false);
    setIsLoggedIn(true);
  };

  const handleTwoFactorBack = () => {
    setShowTwoFactor(false);
    setUsername("");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowTwoFactor(false);
    setUsername("");
  };
  
  const handleToggle2FA = (enabled: boolean) => {
    setIs2FAEnabled(enabled);
    localStorage.setItem("is2FAEnabled", String(enabled));
  };

  if (showTwoFactor && !isLoggedIn) {
    return (
      <ThemeProvider>
        <TwoFactorAuth
          username={username}
          onVerify={handleTwoFactorVerify}
          onBack={handleTwoFactorBack}
        />
      </ThemeProvider>
    );
  }

  if (!isLoggedIn) {
    return (
      <ThemeProvider>
        <LoginScreen onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Toaster position="top-center" richColors />
      <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300 overflow-hidden">
        <div className="flex-1 flex overflow-hidden">
          <UnifiedSidebar
            menuItems={menuItems}
            activeItem={activeItem}
            onItemSelect={setActiveItem}
            dashboardSubItems={dashboardSubItems}
            isCollapsed={isSidebarCollapsed}
            onCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />

          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <div className="flex-shrink-0">
              <ModernHeader 
                onLogout={handleLogout} 
                isSubmenuOpen={isSubmenuOpen}
                onSubmenuToggle={() => setIsSubmenuOpen(!isSubmenuOpen)}
                is2FAEnabled={is2FAEnabled}
                onToggle2FA={handleToggle2FA}
                username={username}
                userRole={userRole}
                isSidebarCollapsed={isSidebarCollapsed}
                onSidebarToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                modules={[
                  { id: "dashboard", label: "Dashboard", icon: Dashboard, gradient: "from-blue-500 via-blue-600 to-cyan-600" },
                  ...menuItems.map(m => ({
                    id: m.id,
                    label: m.title,
                    icon: m.icon,
                    gradient: m.gradient
                  }))
                ]}
                currentModule={activeItem.startsWith("dashboard") ? "dashboard" : activeItem.split("-")[0]}
                onModuleSelect={(moduleId) => setActiveItem(moduleId)}
                searchableItems={searchableItems}
              />
            </div>

            {activeItem !== "sanctions-sanction-mis-reports" && activeItem !== "config-out-of-the-box-tm-rules-configuration" && !activeItem.startsWith("sanctions-manual-screening") && activeItem !== "config-sanctions-screening-configuration" && (
              <div className="flex-shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4 py-2 flex items-center justify-between relative">
                <div className="flex items-center gap-3">
                   {extraBreadcrumbs.length > 0 && activeItem.includes("customer-360-view") ? (
                     <div className="flex items-center gap-3">
                        <Button 
                           variant="ghost" 
                           size="sm" 
                           onClick={() => customer360Ref.current?.resetView()}
                           className="h-7 px-2 text-sm gap-1 text-gray-500 hover:text-gray-900 pl-0 hover:bg-transparent"
                        >
                           <ArrowLeft className="size-4" /> Back
                        </Button>
                        <div className="h-4 w-px bg-gray-300 dark:bg-gray-700" />
                     </div>
                   ) : (
                     <div className="flex items-center gap-3">
                       <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                         {headerTitle}
                       </h3>
                       {(currentContent as any).version && (
                           <Badge variant="outline" className="font-mono text-[10px] px-2 h-5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800">
                               {(currentContent as any).version}
                           </Badge>
                       )}
                     </div>
                   )}
                </div>

                {extraBreadcrumbs.length > 0 && activeItem.includes("customer-360-view") && (
                   <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <h6 className="text-base font-medium text-gray-900 dark:text-white">
                        Customer 360 Details
                      </h6>
                   </div>
                )}

                <div className="flex items-center gap-1.5">
                   <BreadcrumbNav 
                     items={[
                       ...(currentContent.breadcrumbs || []).map((b: any) => ({...b, isActive: extraBreadcrumbs.length > 0 ? false : b.isActive})),
                       ...extraBreadcrumbs
                     ]} 
                     onNavigate={(path) => setActiveItem(path)} 
                   />
                </div>
              </div>
            )}

            <main ref={mainContentRef} className={activeItem === "config-customer-risk-rating-configuration" ? "flex-1 overflow-hidden flex flex-col p-4 gap-4" : activeItem.startsWith("reg_gen-") || activeItem === "ai-graphical-network-analysis" || activeItem === "config-scenario-authoring-tool" || activeItem === "kyc-customer-360-view" || activeItem === "ai-customer-360-view" || activeItem === "simulation-alerts-simulation" || activeItem.startsWith("sanctions-manual-screening") || activeItem === "sanctions-sanction-screening-workflow" || activeItem === "sanctions-sanction-mis-reports" || activeItem === "config-human-trafficking-alerts-configuration" || activeItem === "config-tbml-proliferation-financing-alerts-configuration" || activeItem === "config-wildlife-trafficking-alerts-configuration" || activeItem === "config-mule-alerts-configuration" || activeItem === "config-cyber-enabled-fraud-configuration" || activeItem === "config-high-risk-countries" || activeItem === "config-out-of-the-box-tm-rules-configuration" || activeItem === "config-sanctions-screening-configuration" || activeItem === "config-customer-risk-rating-configuration" ? "flex-1 overflow-hidden flex flex-col" : "flex-1 hover-scroll"}>
              {!activeItem.startsWith("reg_gen-") && activeItem !== "ai-graphical-network-analysis" && activeItem !== "simulation-alerts-simulation" && !activeItem.startsWith("sanctions-manual-screening") && activeItem !== "sanctions-sanction-screening-workflow" && activeItem !== "sanctions-sanction-mis-reports" && activeItem !== "config-human-trafficking-alerts-configuration" && activeItem !== "config-tbml-proliferation-financing-alerts-configuration" && activeItem !== "config-wildlife-trafficking-alerts-configuration" && activeItem !== "config-mule-alerts-configuration" && activeItem !== "config-cyber-enabled-fraud-configuration" && activeItem !== "config-high-risk-countries" && activeItem !== "config-out-of-the-box-tm-rules-configuration" && activeItem !== "config-sanctions-screening-configuration" && activeItem !== "config-customer-risk-rating-configuration" && !activeItem.toLowerCase().includes("event") && <ScrollToTopButton scrollRef={mainContentRef} />}
              <div className={activeItem.startsWith("reg_gen-") || activeItem === "ai-graphical-network-analysis" || activeItem === "config-scenario-authoring-tool" || activeItem === "simulation-alerts-simulation" || activeItem === "kyc-customer-360-view" || activeItem === "ai-customer-360-view" || activeItem.startsWith("sanctions-manual-screening") || activeItem === "sanctions-sanction-screening-workflow" || activeItem === "sanctions-sanction-mis-reports" || activeItem === "config-human-trafficking-alerts-configuration" || activeItem === "config-tbml-proliferation-financing-alerts-configuration" || activeItem === "config-wildlife-trafficking-alerts-configuration" || activeItem === "config-mule-alerts-configuration" || activeItem === "config-cyber-enabled-fraud-configuration" || activeItem === "config-high-risk-countries" || activeItem === "config-out-of-the-box-tm-rules-configuration" || activeItem === "config-sanctions-screening-configuration" || activeItem === "config-customer-risk-rating-configuration" ? "flex-1 h-full" : "p-4"}>
                {activeItem === "ai-graphical-network-analysis" ? (
                  <GraphicalNetworkAnalysis 
                    breadcrumbs={currentContent.breadcrumbs}
                    onBreadcrumbNavigate={(path) => setActiveItem(path)}
                  />
                ) : activeItem === "config-action-maintenance" ? (
                  <ActionMaintenance 
                    breadcrumbs={currentContent.breadcrumbs}
                    onBreadcrumbNavigate={(path) => setActiveItem(path)}
                    version={(currentContent as any).version}
                  />
                ) : activeItem === "config-human-trafficking-alerts-configuration" ? (
                  <HumanTraffickingAlertsConfiguration 
                    breadcrumbs={currentContent.breadcrumbs}
                    onBreadcrumbNavigate={(path) => setActiveItem(path)}
                  />
                ) : activeItem === "config-tbml-proliferation-financing-alerts-configuration" ? (
                  <TbmlAlertsConfiguration 
                    breadcrumbs={currentContent.breadcrumbs}
                    onBreadcrumbNavigate={(path) => setActiveItem(path)}
                  />
                ) : activeItem === "config-wildlife-trafficking-alerts-configuration" ? (
                  <WildlifeTraffickingAlertsConfiguration 
                    breadcrumbs={currentContent.breadcrumbs}
                    onBreadcrumbNavigate={(path) => setActiveItem(path)}
                  />
                ) : activeItem === "config-mule-alerts-configuration" ? (
                  <MuleAlertsConfiguration 
                    breadcrumbs={currentContent.breadcrumbs}
                    onBreadcrumbNavigate={(path) => setActiveItem(path)}
                  />
                ) : activeItem === "config-cyber-enabled-fraud-configuration" ? (
                  <CyberFraudConfiguration 
                    breadcrumbs={currentContent.breadcrumbs}
                    onBreadcrumbNavigate={(path) => setActiveItem(path)}
                  />
                ) : activeItem === "config-out-of-the-box-tm-rules-configuration" ? (
                  <TMRulesConfiguration 
                    breadcrumbs={currentContent.breadcrumbs}
                    onBreadcrumbNavigate={(path) => setActiveItem(path)}
                  />
                ) : activeItem === "config-high-risk-countries" ? (
                  <HighRiskCountries
                    breadcrumbs={currentContent.breadcrumbs}
                    onBreadcrumbNavigate={(path) => setActiveItem(path)}
                  />
                ) : activeItem === "config-sanctions-screening-configuration" ? (
                  <SanctionsScreeningConfiguration
                    breadcrumbs={currentContent.breadcrumbs}
                    onBreadcrumbNavigate={(path) => setActiveItem(path)}
                  />
                ) : activeItem === "config-customer-risk-rating-configuration" ? (
                  <CustomerRiskRatingConfiguration
                    breadcrumbs={currentContent.breadcrumbs}
                    onBreadcrumbNavigate={(path) => setActiveItem(path)}
                  />
                ) : activeItem === "config-scenario-authoring-tool" ? (
                  <ScenarioAuthoringTool 
                    breadcrumbs={currentContent.breadcrumbs}
                    onBreadcrumbNavigate={(path) => setActiveItem(path)}
                    version={(currentContent as any).version}
                  />
                ) : activeItem === "simulation-alerts-simulation" ? (
                  <AlertsSimulation 
                    breadcrumbs={currentContent.breadcrumbs}
                    onBreadcrumbNavigate={(path) => setActiveItem(path)}
                  />
                ) : activeItem.startsWith("sanctions-manual-screening") ? (
                  <ManualScreening 
                    breadcrumbs={currentContent.breadcrumbs}
                    onBreadcrumbNavigate={(path) => setActiveItem(path)}
                  />
                ) : activeItem === "sanctions-sanction-screening-workflow" ? (
                  <SanctionScreeningWorkflow
                    breadcrumbs={currentContent.breadcrumbs}
                    onBreadcrumbNavigate={(path) => setActiveItem(path)}
                  />
                ) : activeItem === "sanctions-sanction-custom-list-management" ? (
                  <SanctionListManagement />
                ) : activeItem === "sanctions-sanction-mis-reports" ? (
                  <SanctionMisReports 
                    breadcrumbs={currentContent.breadcrumbs}
                    onBreadcrumbNavigate={(path) => setActiveItem(path)}
                  />
                ) : (activeItem === "onboarding-de-dup-screening" || activeItem === "sanctions-de-dup-screening") ? (
                  <DedupScreening 
                    breadcrumbs={currentContent.breadcrumbs}
                    onBreadcrumbNavigate={(path) => setActiveItem(path)}
                  />
                ) : (activeItem === "kyc-customer-360-view" || activeItem === "ai-customer-360-view") ? (
                  <div className="h-full overflow-hidden">
                     <Customer360View 
                      ref={customer360Ref}
                      key={`${activeItem}-${refreshKey}`}
                      breadcrumbs={currentContent.breadcrumbs}
                      onBreadcrumbNavigate={(path) => setActiveItem(path)}
                      setBreadcrumbs={setExtraBreadcrumbs}
                    />
                  </div>
                ) : (currentContent as any).type === "regulatory-report" ? (
                  <RegulatoryReportView reportType={(currentContent as any).reportType} />
                ) : isValidElement(currentContent) ? (
                   currentContent
                ) : currentContent.type === "page" ? (
                  <GenericPage 
                    title={currentContent.title}
                    description={currentContent.description}
                    icon={currentContent.icon}
                    breadcrumbs={currentContent.breadcrumbs}
                    onBreadcrumbNavigate={(path) => setActiveItem(path)}
                    version={(currentContent as any).version}
                  />
                ) : currentContent.type === "dashboard" ? (
                  <div className="contents">
                    {activeItem === "dashboard-regulatory-reports-dashboard" ? (
                      <ComplianceAnalytics breadcrumbs={currentContent.breadcrumbs} onBreadcrumbNavigate={(path) => setActiveItem(path)} />
                    ) : activeItem === "dashboard-payments-dashboard" ? (
                      <PaymentMonitoring breadcrumbs={currentContent.breadcrumbs} onBreadcrumbNavigate={(path) => setActiveItem(path)} />
                    ) : activeItem === "dashboard-transaction-monitoring-dashboard" ? (
                      <TransactionMonitoring breadcrumbs={currentContent.breadcrumbs} onBreadcrumbNavigate={(path) => setActiveItem(path)} />
                    ) : activeItem === "dashboard-risk-dashboard" ? (
                      <RiskManagement breadcrumbs={currentContent.breadcrumbs} onBreadcrumbNavigate={(path) => setActiveItem(path)} />
                    ) : activeItem === "dashboard-customer-onboarding-dashboard" ? (
                      <CustomerIntelligence breadcrumbs={currentContent.breadcrumbs} onBreadcrumbNavigate={(path) => setActiveItem(path)} />
                    ) : activeItem === "dashboard-supervisor-dashboard" ? (
                      <OperationalMetrics breadcrumbs={currentContent.breadcrumbs} onBreadcrumbNavigate={(path) => setActiveItem(path)} />
                    ) : activeItem === "dashboard-cxo-dashboard" ? (
                      <ExecutiveSummary breadcrumbs={currentContent.breadcrumbs} onBreadcrumbNavigate={(path) => setActiveItem(path)} />
                    ) : activeItem === "dashboard-screening-dashboard" ? (
                      <ScreeningDashboard breadcrumbs={currentContent.breadcrumbs} onBreadcrumbNavigate={(path) => setActiveItem(path)} />
                    ) : activeItem === "dashboard-2lod-dashboard" ? (
                      <LoD2Dashboard breadcrumbs={currentContent.breadcrumbs} onBreadcrumbNavigate={(path) => setActiveItem(path)} />
                    ) : (
                      <DashboardOverview 
                        breadcrumbs={currentContent.breadcrumbs}
                        onBreadcrumbNavigate={(path) => setActiveItem(path)}
                      />
                    )}
                  </div>
                ) : (
                  <ModuleContent
                    title={currentContent.title}
                    version={(currentContent as any).version}
                    icon={currentContent.icon}
                    gradient={currentContent.gradient}
                    items={currentContent.items}
                    description={currentContent.description}
                    breadcrumbs={currentContent.breadcrumbs}
                    onBreadcrumbNavigate={(path) => setActiveItem(path)}
                  />
                )}
              </div>
            </main>
          </div>
        </div>
        <AppFooter />
      </div>
    </ThemeProvider>
  );
}
