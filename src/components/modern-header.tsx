import React, { useState, useRef, useEffect } from "react";
import { 
  Notification as Bell, 
  Moon, 
  Sun, 
  Menu, 
  User, 
  Logout as LogOut, 
  Settings, 
  UserAvatar as UserCircle, 
  ChevronLeft as PanelLeftClose, 
  ChevronRight as PanelLeftOpen, 
  Search, 
  Globe, 
  Checkmark as Check, 
  Security as ShieldCheck, 
  Security as ShieldOff, 
  ChevronLeft, 
  ChevronRight, 
  Switcher as LayoutSidebar, 
  Menu as Sidebar, 
  Lightning as Zap, 
  SkipBack as ArrowLeftToLine, 
  TextAlignLeft as AlignLeft, 
  Filter as SlidersHorizontal, 
  Information as Info, 
  Minimize as Minimize2, 
  Maximize as Maximize2, 
  ChevronLeft as ChevronsLeft, 
  ChevronRight as ChevronsRight,
  Close,
  Notebook as StickyNote,
} from "@carbon/icons-react";
import { InternalNotes } from "./internal-notes";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";
import { motion, AnimatePresence } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import clari5Logo from "figma:asset/6dfdb4c1a68d250267231b32de1f1a07e05b6acf.png";
import { GlobalSearch, SearchResult } from "./global-search";
import { KeyboardShortcuts, useKeyboardShortcuts } from "./keyboard-shortcuts";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";

interface Module {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  gradient?: string;
}

interface ModernHeaderProps {
  onLogout: () => void;
  isSubmenuOpen?: boolean;
  onSubmenuToggle?: () => void;
  is2FAEnabled?: boolean;
  onToggle2FA?: (enabled: boolean) => void;
  username?: string;
  userRole?: string;
  isSidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
  modules?: Module[];
  currentModule?: string;
  onModuleSelect?: (moduleId: string) => void;
  searchableItems?: SearchResult[]; // Added prop
  pageTitle?: string;
}

export function ModernHeader({ 
  onLogout, 
  isSubmenuOpen, 
  onSubmenuToggle,
  is2FAEnabled,
  onToggle2FA,
  username,
  userRole,
  isSidebarCollapsed,
  onSidebarToggle,
  modules,
  currentModule,
  onModuleSelect,
  searchableItems = [], // Default to empty array
  pageTitle,
}: ModernHeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Click outside listener for search
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchActive(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Enable keyboard shortcuts
  useKeyboardShortcuts(
    () => {
      inputRef.current?.focus();
      setIsSearchActive(true);
    },
    () => setIsShortcutsOpen(true)
  );

  const handleLogout = () => {
    onLogout();
  };

  const languages = [
    { code: "en", name: "English", label: "EN" },
    { code: "es", name: "Español", label: "ES" },
    { code: "fr", name: "Français", label: "FR" },
    { code: "de", name: "Deutsch", label: "DE" },
    { code: "zh", name: "中文", label: "ZH" },
    { code: "ja", name: "日本語", label: "JA" },
    { code: "ar", name: "العربية", label: "AR" },
    { code: "hi", name: "हिन्दी", label: "HI" },
  ];

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  const versionDetails = {
    "Configuration": [
      { name: "Action Maintenance", version: "v2.1.0" },
      { name: "Case Management System", version: "v2.2.0" },
      { name: "Entity Tagging", version: "v2.3.0" },
      { name: "File Upload", version: "v2.4.0" },
      { name: "Jobs", version: "v2.5.0" },
      { name: "Manual Alert Creation", version: "v2.6.0" },
      { name: "Reference Codes", version: "v2.7.0" },
      { name: "Remittance Watchlist", version: "v2.8.0" },
      { name: "Risk Level Assessment", version: "v2.9.0" },
      { name: "Scenario Authoring Tool", version: "v2.10.0" },
      { name: "Strategic Dashboard", version: "v2.11.0" },
      { name: "Strategy Builder", version: "v2.12.0" },
    ],
    "Audit": [
      { name: "Authorization", version: "v1.5.2" },
      { name: "Activity Logs", version: "v1.6.2" },
      { name: "Access Tracking", version: "v1.7.2" },
      { name: "Compliance Reports", version: "v1.8.2" },
    ],
    "AML": [
      { name: "Automated Clearing Reports", version: "v5.1.0" },
      { name: "Batch Settings Discarding", version: "v5.0.1" },
      { name: "Branch Risk Score Cases", version: "v5.1.4" },
      { name: "Counterfeit Currency Report", version: "v5.0.2" },
      { name: "Customer Risk Score Cases", version: "v5.1.2" },
      { name: "Dual Usage Codes Upload", version: "v5.0.3" },
      { name: "Batch Processing", version: "v5.6.0" },
      { name: "Sangs Reports", version: "v5.2.1" },
      { name: "KYC Verification", version: "v5.4.0" },
      { name: "Manual Alert Creation", version: "v5.6.2" },
      { name: "Manual RTR Alerts", version: "v5.6.1" },
      { name: "RVN/CVP/ORDERS", version: "v5.5.1" },
      { name: "Online Customer Onboarding", version: "v5.4.2" },
      { name: "Reattach Screening", version: "v5.0.5" },
      { name: "Reports Dashboard", version: "v5.3.0" },
      { name: "RCON MSI SST Management", version: "v5.1.1" },
      { name: "Research Data Loading", version: "v5.2.0" },
      { name: "Unusual Posting Transaction", version: "v5.5.0" },
      { name: "Watchlist Rules", version: "v5.3.1" },
      { name: "Watchlist Upload", version: "v5.3.2" },
    ],
    "Reports": [
      { name: "Generate SAR Report", version: "v3.0.1" },
      { name: "Monthly Summary", version: "v3.1.0" },
      { name: "Trend Analysis", version: "v3.2.0" },
      { name: "Custom Queries", version: "v3.3.0" },
      { name: "Compliance Dashboard", version: "v3.4.0" },
      { name: "Risk Assessment Reports", version: "v3.5.0" },
      { name: "Transaction Analysis", version: "v3.6.0" },
      { name: "Audit Trail Reports", version: "v3.7.0" },
    ],
    "Investigation": [
      { name: "Open Cases", version: "v4.2.1" },
      { name: "Pending Reviews", version: "v4.3.0" },
      { name: "Closed This Month", version: "v4.4.0" },
      { name: "Archive Search", version: "v4.5.0" },
      { name: "Evidence Management", version: "v4.6.0" },
      { name: "Case Timeline", version: "v4.7.0" },
      { name: "Investigation Notes", version: "v4.8.0" },
      { name: "Stakeholder Communication", version: "v4.9.0" },
    ]
  };

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "High-Risk Transaction Alert",
      description: "₹8.5L withdrawal detected - Rajesh Kumar",
      time: "2 min ago",
      type: "critical",
      unread: true,
    },
    {
      id: 2,
      title: "Compliance Report Ready",
      description: "Monthly AML report has been generated",
      time: "15 min ago",
      type: "info",
      unread: true,
    },
    {
      id: 3,
      title: "System Update Complete",
      description: "AI detection model updated successfully",
      time: "1 hour ago",
      type: "success",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <>
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-50">
        
        <div className="h-[54px] px-4 flex items-center justify-between gap-4 relative">
          
          <div className="flex items-center gap-4">
            {/* Sidebar Toggle */}
            {onSidebarToggle && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      onClick={onSidebarToggle}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="h-[36px] w-[36px] flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-[8px] transition-all text-gray-500 hover:text-[#2A53A0] dark:text-gray-400 dark:hover:text-[#6b93e6]"
                    >
                      {isSidebarCollapsed ? (
                        <ChevronRight className="size-5" />
                      ) : (
                        <ChevronLeft className="size-5" />
                      )}
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-gray-900 dark:bg-gray-800 text-white border-gray-700">
                    <p>{isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {/* Page Title - Removed as per request */}
          </div>

          {/* Global Search Bar (Gmail Style) - Centered */}
          <div ref={searchContainerRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[240px] hidden md:block">
              <div 
                className={`flex items-center gap-3 px-4 h-[40px] bg-white dark:bg-gray-900 rounded-[8px] transition-all border ${
                  isSearchActive 
                    ? 'border-[#2A53A0] ring-4 ring-[#2A53A0]/10 shadow-md' 
                    : 'border-gray-200 dark:border-gray-800 hover:shadow-sm'
                }`}
              >
                <Search className={`size-5 transition-colors ${isSearchActive ? 'text-[#2A53A0]' : 'text-gray-400'}`} />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchActive(true)}
                  className="flex-1 bg-transparent border-none outline-none text-[14px] text-gray-700 dark:text-gray-200 placeholder:text-gray-400 h-full w-full font-normal"
                  placeholder="Search Genie"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
                {searchQuery && (
                  <button 
                    onClick={() => { setSearchQuery(""); inputRef.current?.focus(); }}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <span className="sr-only">Clear</span>
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
              {/* Dropdown Results */}
              <AnimatePresence>
                {isSearchActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[480px] mt-2 z-50"
                  >
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden ring-1 ring-black/5">
                      <GlobalSearch 
                        query={searchQuery}
                        items={searchableItems} // Pass items here
                        onSelect={(result) => {
                          console.log("Selected", result);
                          setIsSearchActive(false);
                          setSearchQuery(result.title);
                          // Trigger navigation if path is present
                          if (result.path && onModuleSelect) {
                            onModuleSelect(result.path);
                          }
                        }}
                        onClose={() => setIsSearchActive(false)}
                        className="border-0 shadow-none rounded-none"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 sm:gap-5">

            {/* Mobile Search Icon */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsSearchActive(true)}
                whileTap={{ scale: 0.95 }}
                className="h-[36px] w-[36px] flex items-center justify-center rounded-[8px] hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-[#2A53A0] dark:text-gray-400 dark:hover:text-[#6b93e6] transition-colors"
              >
                <Search className="size-5" strokeWidth={2} />
              </motion.button>
            </div>

            {/* Version Info */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-[36px] w-[36px] flex items-center justify-center rounded-[8px] hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-[#2A53A0] dark:text-gray-400 dark:hover:text-[#6b93e6] transition-all"
                >
                  <Info className="size-5" strokeWidth={2} />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-gray-200 dark:border-gray-800 shadow-xl">
                <DropdownMenuLabel className="flex items-center gap-2">
                  <Info className="size-4 text-[#2A53A0] dark:text-[#6b93e6]" />
                  <span>System Versions</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[400px] overflow-y-auto">
                  {Object.entries(versionDetails).map(([category, items]) => (
                    <div key={category} className="py-2">
                      <div className="px-4 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50/50 dark:bg-gray-800/50 sticky top-0 backdrop-blur-sm z-10">
                        {category}
                      </div>
                      {items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                          <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[180px] group-hover:text-[#2A53A0] dark:group-hover:text-[#6b93e6] transition-colors" title={item.name}>{item.name}</span>
                          <Badge variant="outline" className="font-mono text-[10px] h-5 px-1.5 border-gray-200 dark:border-gray-700 text-gray-500 bg-gray-50 dark:bg-gray-900">
                            {item.version}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <div className="px-4 py-2.5 bg-gray-50/50 dark:bg-gray-800/50">
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    System Core: v2.4.0 (Stable)
                  </p>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={currentLanguage.name}
                  className="h-[36px] w-[36px] flex items-center justify-center rounded-[8px] hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-[#2A53A0] dark:text-gray-400 dark:hover:text-[#6b93e6] transition-all"
                >
                  <Globe className="size-5" strokeWidth={2} />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-gray-200 dark:border-gray-800 shadow-xl">
                <DropdownMenuLabel className="flex items-center gap-2">
                  <Globe className="size-4 text-[#2A53A0] dark:text-[#6b93e6]" />
                  <span>Select Language</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {languages.map(lang => (
                  <DropdownMenuItem 
                    key={lang.code} 
                    onClick={() => setSelectedLanguage(lang.code)}
                    className="flex items-center gap-3 py-2.5 cursor-pointer"
                  >
                    <Badge variant="outline" className="w-8 justify-center font-mono text-xs border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
                      {lang.label}
                    </Badge>
                    <span className="flex-1 font-medium">{lang.name}</span>
                    {lang.code === selectedLanguage && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <Check className="size-4 text-[#2A53A0] dark:text-[#6b93e6]" />
                      </motion.div>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    onClick={toggleTheme}
                    whileHover={{ scale: 1.05, rotate: 15 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-[36px] w-[36px] flex items-center justify-center rounded-[8px] hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-[#2A53A0] dark:text-gray-400 dark:hover:text-[#6b93e6] transition-all"
                  >
                    <AnimatePresence mode="wait">
                      {theme === "light" ? (
                        <motion.div
                          key="moon"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Moon className="size-5" strokeWidth={2} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="sun"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Sun className="size-5" strokeWidth={2} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-gray-900 dark:bg-gray-800 text-white border-gray-700">
                  <p>Switch to {theme === "light" ? "dark" : "light"} mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>



            {/* Notifications */}
            <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative h-[36px] w-[36px] flex items-center justify-center rounded-[8px] hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-[#2A53A0] dark:text-gray-400 dark:hover:text-[#6b93e6] transition-all"
                >
                  <Bell className="size-5" strokeWidth={2} />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white dark:border-gray-950"></span>
                    </span>
                  )}
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-gray-200 dark:border-gray-800 shadow-xl">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                    {unreadCount > 0 && (
                      <Badge className="bg-[#2A53A0] hover:bg-[#2A53A0]/90 text-white border-0">
                        {unreadCount} New
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`px-4 py-3 border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-all ${
                        notification.unread ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                          notification.type === 'critical' ? 'bg-red-500 shadow-sm shadow-red-500/50' :
                          notification.type === 'info' ? 'bg-blue-500 shadow-sm shadow-blue-500/50' :
                          'bg-green-500 shadow-sm shadow-green-500/50'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-2">
                            {notification.description}
                          </p>
                          <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1.5 font-medium">
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#2A53A0]" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="p-2 bg-gray-50 dark:bg-gray-900/50">
                  <button className="text-xs text-[#2A53A0] dark:text-[#6b93e6] hover:text-[#1e3a70] dark:hover:text-[#8cb0ff] w-full text-center font-medium py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    Mark all as read
                  </button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>



            {/* Internal Notes */}
            <InternalNotes 
              username={username}
              trigger={
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-[36px] w-[36px] flex items-center justify-center rounded-[8px] hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-[#2A53A0] dark:text-gray-400 dark:hover:text-[#6b93e6] transition-all relative"
                  title="Internal Notes"
                >
                  <StickyNote className="size-5" strokeWidth={2} />
                </motion.button>
              }
            />

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-0.5"></div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-1.5 pl-1 pr-0 py-0.5 rounded-[8px] h-[36px] hover:bg-gray-100 dark:hover:bg-gray-800 transition-all border border-transparent"
                >
                  <div className="relative">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2A53A0] to-[#4A7BD0] flex items-center justify-center text-white shadow-md ring-2 ring-white dark:ring-gray-950">
                      <span className="font-semibold text-xs">
                        {username ? username.charAt(0).toUpperCase() : "U"}
                      </span>
                    </div>
                    {is2FAEnabled && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-950 shadow-sm" />
                    )}
                  </div>
                  <div className="hidden lg:flex flex-col items-start">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 leading-none mb-0.5">{username || "User"}</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">{userRole || "Admin"}</span>
                  </div>
                  <ChevronRight className="hidden lg:block size-4 text-gray-400 rotate-90" />
                </motion.button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-gray-200 dark:border-gray-800">
                <DropdownMenuLabel>
                  <div className="flex items-center gap-3 py-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2A53A0] to-[#4A7BD0] flex items-center justify-center shadow-lg">
                      <User className="size-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{username || "User"}</span>
                      {userRole && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">{userRole}</span>
                      )}
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="py-2.5">
                  <UserCircle className="size-4 mr-3 text-gray-600 dark:text-gray-400" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2.5">
                  <Settings className="size-4 mr-3 text-gray-600 dark:text-gray-400" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                
                {/* 2FA Toggle */}
                <div className="px-3 py-3 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-800 dark:to-transparent">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {is2FAEnabled ? (
                        <ShieldCheck className="size-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <ShieldOff className="size-4 text-gray-600 dark:text-gray-400" />
                      )}
                      <span className="text-sm font-medium">Two-Factor Auth</span>
                    </div>
                    <Switch 
                      checked={is2FAEnabled} 
                      onCheckedChange={onToggle2FA}
                      className="data-[state=checked]:bg-green-600"
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 ml-6">
                    {is2FAEnabled ? "Enhanced security enabled" : "Click to enable extra security"}
                  </p>
                </div>
                
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsShortcutsOpen(true)} className="py-2.5">
                  <span className="mr-3">⌨️</span>
                  <span>Keyboard Shortcuts</span>
                  <kbd className="ml-auto text-xs text-gray-500 px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">?</kbd>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="py-2.5 text-red-600 dark:text-red-400 font-medium">
                  <LogOut className="size-4 mr-3" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcuts
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </>
  );
}
