import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "./ui/utils";
import { Badge } from "./ui/badge";
import { Home, ChevronLeft, ChevronRight, Settings, HelpCircle, Plus, Minus, Menu, ChevronDown, ChevronRight as ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import clari5Logo from "figma:asset/6dfdb4c1a68d250267231b32de1f1a07e05b6acf.png";
import clari5Favicon from "figma:asset/4695cc06ada82390ec617ae2b76764d7dd803fe5.png";

interface SubMenuItem {
  id: string;
  label: string;
  count?: number;
  badge?: string;
  icon?: LucideIcon;
}

interface SubMenuCategory {
  id: string;
  label: string;
  icon?: LucideIcon;
  items: SubMenuItem[];
}

interface MenuItem {
  id: string;
  title: string;
  icon: LucideIcon;
  gradient: string;
  subItems?: SubMenuItem[];
  categories?: SubMenuCategory[];
  alertCount?: number;
}

interface IconOnlySidebarProps {
  menuItems: MenuItem[];
  activeItem: string;
  onItemSelect: (itemId: string) => void;
  dashboardSubItems?: SubMenuItem[];
  isSubmenuOpen?: boolean;
  onSubmenuToggle?: () => void;
}

export function IconOnlySidebar({
  menuItems,
  activeItem,
  onItemSelect,
  dashboardSubItems,
  isSubmenuOpen,
  onSubmenuToggle,
}: IconOnlySidebarProps) {
  const [selectedMenu, setSelectedMenu] = useState<string | null>("dashboard"); // Default to "dashboard" to show dashboard submenu
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    "reports": true // Default first AML category expanded
  });

  const handleMenuClick = (menuId: string, hasSubItems: boolean) => {
    if (hasSubItems) {
      // If submenu is collapsed, open it first
      if (!isSubmenuOpen && onSubmenuToggle) {
        onSubmenuToggle();
      }
      
      // Toggle submenu panel
      if (selectedMenu === menuId) {
        setSelectedMenu(null);
      } else {
        setSelectedMenu(menuId);
      }
    } else {
      onItemSelect(menuId);
      setSelectedMenu(null);
    }
  };

  const handleSubItemClick = (parentId: string, subItemId: string) => {
    onItemSelect(`${parentId}-${subItemId}`);
    // Keep submenu open after selection
  };

  const isItemActive = (itemId: string) => {
    if (!activeItem) return false;
    return activeItem === itemId || activeItem.startsWith(itemId + "-");
  };

  const isSubItemActive = (parentId: string, subItemId: string) => {
    if (!activeItem) return false;
    return activeItem === `${parentId}-${subItemId}`;
  };

  const getActiveMenu = () => {
    if (!activeItem) return null;
    const parts = activeItem.split("-");
    return parts[0];
  };

  const activeMenuId = getActiveMenu();
  
  // Get active menu data - only show submenu when isSubmenuOpen is true AND menu is selected
  let activeMenuData: MenuItem | null = null;
  
  if (isSubmenuOpen) {
    if (selectedMenu === "dashboard" && dashboardSubItems) {
      activeMenuData = {
        id: "dashboard",
        title: "DASHBOARDS",
        icon: Home,
        gradient: "from-indigo-500 via-purple-600 to-pink-600",
        subItems: dashboardSubItems,
      };
    } else if (selectedMenu) {
      const found = menuItems.find((item) => item.id === selectedMenu);
      if (found && (found.subItems || found.categories)) {
        activeMenuData = found;
      }
    }
  }

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo Section - Single unified section spanning full width */}
      <motion.div 
        initial={{ width: 70 }}
        animate={{ width: isSubmenuOpen ? 320 : 70 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="h-[68px] flex-shrink-0 border-b border-r border-gray-200 dark:border-gray-800 bg-gradient-to-r from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 flex items-center justify-start px-4 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isSubmenuOpen ? (
            <motion.div
              key="full-logo"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
            >
              <img 
                src={clari5Logo} 
                alt="Clari5 Logo" 
                className="h-10 w-auto object-contain"
              />
            </motion.div>
          ) : (
            <motion.div
              key="favicon"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <img 
                src={clari5Favicon} 
                alt="Clari5 Favicon" 
                className="h-10 w-10 object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Main Content Area - Two sections: Main Menu (70px) + Submenu (250px) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Icon-Only Main Sidebar */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-[70px] bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col shadow-sm"
        >
          {/* Menu Items */}
          <nav className="flex-1 py-4 space-y-4 overflow-y-auto">
            {/* Dashboard Home Item */}
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0 }}
                    onClick={() => {
                      if (dashboardSubItems && dashboardSubItems.length > 0) {
                        // Toggle dashboard submenu
                        handleMenuClick("dashboard", true);
                      } else {
                        // No submenus, just navigate to dashboard
                        onItemSelect("dashboard");
                        setSelectedMenu(null);
                      }
                    }}
                    className={cn(
                      "w-[46px] h-[46px] mx-auto rounded-xl transition-all duration-200 flex items-center justify-center relative group",
                      isItemActive("dashboard")
                        ? "bg-[#2A53A0]"
                        : "hover:bg-gray-100 dark:hover:bg-gray-900"
                    )}
                  >
                    <Home
                      className={cn(
                        "size-5 transition-colors",
                        isItemActive("dashboard")
                          ? "text-white"
                          : "text-[#4B5563] dark:text-[#9CA3AF] group-hover:text-gray-900 dark:group-hover:text-white"
                      )}
                    />
                    {isItemActive("dashboard") && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -left-8 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#2A53A0] rounded-r-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Dashboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Module Menu Items */}
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = isItemActive(item.id);
              const isSelected = selectedMenu === item.id;
              const hasSubItems = (item.subItems && item.subItems.length > 0) || (item.categories && item.categories.length > 0);

              return (
                <TooltipProvider key={item.id}>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (index + 1) * 0.05 }}
                        onClick={() =>
                          handleMenuClick(item.id, hasSubItems || false)
                        }
                        className={cn(
                          "w-[46px] h-[46px] mx-auto rounded-xl transition-all duration-200 flex items-center justify-center relative group",
                          isActive
                            ? "bg-[#2A53A0]"
                            : "hover:bg-gray-100 dark:hover:bg-gray-900"
                        )}
                      >
                        <Icon
                          className={cn(
                            "size-6 transition-colors",
                            isActive
                              ? "text-white"
                              : "text-[#767676] group-hover:text-gray-900 dark:group-hover:text-white"
                          )}
                        />

                        {/* Active Indicator - Only show when submenu item is selected */}
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute -left-8 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-[#2A53A0]"
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}
                      </motion.button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.title}</p>
                      {item.alertCount !== undefined && item.alertCount > 0 && (
                        <p className="text-xs text-red-400">
                          {item.alertCount} alerts
                        </p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </nav>

          {/* Settings and Help Icons */}
          <div className="py-4 space-y-6 border-t border-gray-200 dark:border-gray-800">
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // Handle settings click
                      console.log("Settings clicked");
                    }}
                    className="w-[46px] h-[46px] mx-auto rounded-xl transition-all duration-200 flex items-center justify-center relative group hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    <Settings className="size-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // Handle help click
                      console.log("Help clicked");
                    }}
                    className="w-[46px] h-[46px] mx-auto rounded-xl transition-all duration-200 flex items-center justify-center relative group hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    <HelpCircle className="size-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Help & Support</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </motion.div>

        {/* Submenu Panel (Parallel to Main Menu) */}
        <AnimatePresence>
          {activeMenuData && (activeMenuData.subItems || activeMenuData.categories) && (
            <motion.div
              key={activeMenuData.id}
              initial={{ width: 0, opacity: 0, x: -20 }}
              animate={{ width: 250, opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-full bg-gray-50 dark:bg-gray-900/50 border-r border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden shadow-xl"
            >
              {/* Title and Badge Section - Fixed, No Scroll */}
              <div className="flex-shrink-0 px-4 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                <div className="flex items-center gap-2">
                  <h3
                    className="tracking-tight text-gray-900 dark:text-white truncate text-base"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
                  >
                    {activeMenuData.title}
                  </h3>
                  <Badge 
                    variant="secondary" 
                    className="bg-[#2A53A0]/10 text-[#2A53A0] dark:bg-[#2A53A0]/20 dark:text-[#2A53A0] border-0 text-xs px-2 py-0.5"
                  >
                    {activeMenuData.subItems ? activeMenuData.subItems.length : 
                     activeMenuData.categories?.reduce((sum, cat) => sum + cat.items.length, 0) || 0}
                  </Badge>
                </div>
              </div>

              {/* Submenu Items - Scrollable */}
              <div className="flex-1 overflow-y-auto px-4 py-3">
                <div className="space-y-1">
                  {/* Regular Sub Items (Non-Categorized) */}
                  {activeMenuData.subItems && !activeMenuData.categories && activeMenuData.subItems.map((subItem, index) => {
                    const SubIcon = subItem.icon;
                    const isSubActive = isSubItemActive(
                      activeMenuData.id,
                      subItem.id
                    );

                    return (
                      <TooltipProvider key={subItem.id}>
                        <Tooltip delayDuration={300}>
                          <TooltipTrigger asChild>
                            <motion.button
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.03 }}
                              onClick={() =>
                                handleSubItemClick(activeMenuData.id, subItem.id)
                              }
                              className={cn(
                                "w-full flex items-center gap-3 px-0 py-2.5 rounded-lg transition-all text-left group/sub"
                              )}
                            >
                              {/* Icon */}
                              {SubIcon && (
                                <SubIcon
                                  className={cn(
                                    "size-4 flex-shrink-0 transition-colors",
                                    isSubActive
                                      ? "text-[#2A53A0] dark:text-[#6b93e6]"
                                      : "text-[#4B5563] dark:text-[#9CA3AF] group-hover/sub:text-[#2A53A0] dark:group-hover/sub:text-[#6b93e6]"
                                  )}
                                />
                              )}
                              
                              {/* Label */}
                              <div className="flex-1 min-w-0">
                                <span
                                  className={cn(
                                    "block truncate transition-colors",
                                    isSubActive
                                      ? "text-[#2A53A0] dark:text-[#6b93e6]"
                                      : "text-[#4B5563] dark:text-[#9CA3AF] group-hover/sub:text-[#2A53A0] dark:group-hover/sub:text-[#6b93e6]"
                                  )}
                                  style={{ 
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: "16px",
                                    fontWeight: isSubActive ? 500 : 400,
                                    lineHeight: "1.5",
                                    letterSpacing: "-0.01em"
                                  }}
                                >
                                  {subItem.label}
                                </span>
                              </div>
                            </motion.button>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-xs">
                            <p>{subItem.label}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  })}

                  {/* Categorized Sub Items (With Accordion) */}
                  {activeMenuData.categories && activeMenuData.categories.map((category, catIndex) => {
                    const isExpanded = expandedCategories[category.id] ?? false;
                    const CategoryIcon = category.icon;

                    return (
                      <div key={category.id} className="space-y-1">
                        {/* Category Header (Accordion Trigger) */}
                        <motion.button
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: catIndex * 0.03 }}
                          onClick={() => toggleCategory(category.id)}
                          className="w-full flex items-center gap-3 px-0 py-2.5 rounded-lg transition-all text-left group/category border border-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          {/* Category Icon */}
                          {CategoryIcon && (
                            <CategoryIcon className="size-4 flex-shrink-0 text-[#4B5563] dark:text-[#9CA3AF] transition-colors group-hover/category:text-gray-900 dark:group-hover/category:text-white" />
                          )}
                          
                          {/* Category Label */}
                          <span
                            className="flex-1 text-[#4B5563] dark:text-[#9CA3AF] truncate transition-colors group-hover/category:text-gray-900 dark:group-hover/category:text-white"
                            style={{ 
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "16px",
                              fontWeight: 400,
                              lineHeight: "1.5",
                              letterSpacing: "-0.01em"
                            }}
                          >
                            {category.label}
                          </span>

                          {/* Plus/Minus Icon (Right Side) */}
                          {isExpanded ? (
                            <ChevronDown className="size-4 flex-shrink-0 text-[#2A53A0] transition-all" />
                          ) : (
                            <ChevronRightIcon className="size-4 flex-shrink-0 text-[#4B5563] dark:text-[#9CA3AF] transition-all group-hover/category:text-gray-900 dark:group-hover/category:text-white" />
                          )}
                        </motion.button>

                        {/* Category Items (Collapsible with Vertical Line) */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden relative"
                            >
                              {/* Vertical Line */}
                              <div className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-[#2A53A0]/30 via-[#2A53A0]/20 to-transparent" />
                              
                              {/* Items */}
                              <div className="space-y-1 pl-6">
                                {category.items.map((subItem, subIndex) => {
                                  const SubIcon = subItem.icon;
                                  const isSubActive = isSubItemActive(
                                    activeMenuData.id,
                                    subItem.id
                                  );

                                  return (
                                    <TooltipProvider key={subItem.id}>
                                      <Tooltip delayDuration={300}>
                                        <TooltipTrigger asChild>
                                          <motion.button
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: subIndex * 0.02 }}
                                            onClick={() =>
                                              handleSubItemClick(activeMenuData.id, subItem.id)
                                            }
                                            className={cn(
                                              "w-full flex items-center gap-2.5 px-0 py-2 rounded-lg transition-all text-left group/sub relative"
                                            )}
                                          >
                                            {/* Connection line to vertical line */}
                                            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-px bg-[#2A53A0]/20" />
                                            
                                            {/* Label */}
                                            <div className="flex-1 min-w-0">
                                              <span
                                                className={cn(
                                                  "block truncate transition-colors",
                                                  isSubActive
                                                    ? "text-[#2A53A0] dark:text-[#6b93e6]"
                                                    : "text-[#6B7280] dark:text-[#6B7280] group-hover/sub:text-[#2A53A0] dark:group-hover/sub:text-[#6b93e6]"
                                                )}
                                                style={{ 
                                                  fontFamily: "'Inter', sans-serif",
                                                  fontSize: "14px",
                                                  fontWeight: isSubActive ? 500 : 400,
                                                  lineHeight: "1.5",
                                                  letterSpacing: "-0.01em"
                                                }}
                                              >
                                                {subItem.label}
                                              </span>
                                            </div>
                                          </motion.button>
                                        </TooltipTrigger>
                                        <TooltipContent side="right" className="max-w-xs">
                                          <p>{subItem.label}</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}