import { motion, AnimatePresence } from "motion/react";
import { LucideIcon } from "lucide-react";
import { cn } from "./ui/utils";
import { Badge } from "./ui/badge";
import {
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  Home,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useState } from "react";

interface SubMenuItem {
  id: string;
  label: string;
  count?: number;
  badge?: string;
  icon?: LucideIcon;
}

interface MenuItem {
  id: string;
  title: string;
  icon: LucideIcon;
  gradient: string;
  subItems?: SubMenuItem[];
  alertCount?: number;
}

interface GmailStyleSidebarProps {
  menuItems: MenuItem[];
  activeItem: string;
  onItemSelect: (itemId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function GmailStyleSidebar({
  menuItems,
  activeItem,
  onItemSelect,
  isCollapsed,
  onToggleCollapse,
}: GmailStyleSidebarProps) {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const handleMenuClick = (menuId: string, hasSubItems: boolean) => {
    if (hasSubItems) {
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
  const currentSelectedMenu = selectedMenu || (activeMenuId !== "dashboard" ? activeMenuId : null);
  const activeMenuData = menuItems.find((item) => item.id === currentSelectedMenu);

  return (
    <div className="flex h-full">
      {/* Main Sidebar */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          width: isCollapsed ? "80px" : "240px",
        }}
        transition={{ duration: 0.3 }}
        className={cn(
          "h-full bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300",
          isCollapsed ? "w-20" : "w-[240px]"
        )}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          {!isCollapsed && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-600 dark:text-gray-400"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Navigation
            </motion.h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="h-8 w-8"
          >
            {isCollapsed ? (
              <PanelLeft className="size-4" />
            ) : (
              <PanelLeftClose className="size-4" />
            )}
          </Button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {/* Dashboard Home Item */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0 }}
          >
            <button
              onClick={() => {
                onItemSelect("dashboard");
                setSelectedMenu(null);
              }}
              className={cn(
                "w-full group relative rounded-xl transition-all duration-200",
                activeItem === "dashboard"
                  ? "bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 shadow-lg"
                  : "hover:bg-gray-100 dark:hover:bg-gray-900"
              )}
            >
              <div
                className={cn(
                  "relative flex items-center gap-3 p-3",
                  isCollapsed ? "justify-center" : ""
                )}
              >
                <div
                  className={cn(
                    "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                    activeItem === "dashboard"
                      ? "bg-white/20 backdrop-blur-sm shadow-lg"
                      : "bg-gray-100 dark:bg-gray-800 group-hover:scale-110"
                  )}
                >
                  <Home
                    className={cn(
                      "size-5 transition-colors",
                      activeItem === "dashboard"
                        ? "text-white"
                        : "text-gray-600 dark:text-gray-400"
                    )}
                  />
                </div>

                {!isCollapsed && (
                  <div className="flex-1 min-w-0 text-left">
                    <h3
                      className={cn(
                        "text-sm transition-colors truncate",
                        activeItem === "dashboard"
                          ? "text-white"
                          : "text-gray-900 dark:text-white"
                      )}
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      Dashboard
                    </h3>
                  </div>
                )}
              </div>
            </button>
          </motion.div>

          {/* Separator */}
          <div className="py-2">
            <div className="border-t border-gray-200 dark:border-gray-800" />
          </div>

          {/* Module Menu Items */}
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = isItemActive(item.id);
            const isSelected = currentSelectedMenu === item.id;
            const hasSubItems = item.subItems && item.subItems.length > 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (index + 1) * 0.05 }}
                onMouseEnter={() => hasSubItems && setHoveredMenu(item.id)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <button
                  onClick={() => handleMenuClick(item.id, hasSubItems || false)}
                  className={cn(
                    "w-full group relative rounded-xl transition-all duration-200",
                    isActive
                      ? `bg-gradient-to-br ${item.gradient} shadow-lg`
                      : isSelected
                      ? "bg-gray-100 dark:bg-gray-900"
                      : "hover:bg-gray-100 dark:hover:bg-gray-900"
                  )}
                >
                  <div
                    className={cn(
                      "relative flex items-center gap-3 p-3",
                      isCollapsed ? "justify-center" : ""
                    )}
                  >
                    <div
                      className={cn(
                        "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                        isActive
                          ? "bg-white/20 backdrop-blur-sm shadow-lg"
                          : "bg-gray-100 dark:bg-gray-800 group-hover:scale-110"
                      )}
                    >
                      <Icon
                        className={cn(
                          "size-5 transition-colors",
                          isActive
                            ? "text-white"
                            : "text-gray-600 dark:text-gray-400"
                        )}
                      />
                    </div>

                    {!isCollapsed && (
                      <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3
                            className={cn(
                              "text-sm transition-colors truncate text-left",
                              isActive
                                ? "text-white"
                                : "text-gray-900 dark:text-white"
                            )}
                            style={{
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                            }}
                          >
                            {item.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.alertCount !== undefined &&
                            item.alertCount > 0 && (
                              <Badge
                                variant="destructive"
                                className="text-xs h-5 px-1.5"
                              >
                                {item.alertCount}
                              </Badge>
                            )}
                          {hasSubItems && (
                            <ChevronRight
                              className={cn(
                                "size-4 transition-transform",
                                isActive
                                  ? "text-white"
                                  : "text-gray-400",
                                isSelected && "rotate-180"
                              )}
                            />
                          )}
                        </div>
                      </div>
                    )}

                    {isCollapsed &&
                      item.alertCount !== undefined &&
                      item.alertCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                          <span className="text-xs text-white">
                            {item.alertCount}
                          </span>
                        </div>
                      )}
                  </div>
                </button>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                System Active
              </p>
              <p>WCAG 2.1 AA Compliant</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Submenu Panel (Parallel to Main Menu) */}
      <AnimatePresence>
        {activeMenuData && activeMenuData.subItems && (
          <motion.div
            key={activeMenuData.id}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full bg-gray-50 dark:bg-gray-900/50 border-r border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden"
          >
            {/* Submenu Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg",
                      activeMenuData.gradient
                    )}
                  >
                    <activeMenuData.icon className="size-5 text-white" />
                  </div>
                  <div>
                    <h3
                      className="text-sm text-gray-900 dark:text-white"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {activeMenuData.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activeMenuData.subItems.length} items
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedMenu(null)}
                  className="h-8 w-8"
                >
                  <X className="size-4" />
                </Button>
              </div>
            </div>

            {/* Submenu Items */}
            <div className="flex-1 overflow-y-auto p-3">
              <div className="space-y-1">
                {activeMenuData.subItems.map((subItem, index) => {
                  const SubIcon = subItem.icon;
                  const isSubActive = isSubItemActive(
                    activeMenuData.id,
                    subItem.id
                  );

                  return (
                    <motion.button
                      key={subItem.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      whileHover={{ x: 4, scale: 1.01 }}
                      onClick={() =>
                        handleSubItemClick(activeMenuData.id, subItem.id)
                      }
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left group/sub",
                        isSubActive
                          ? "bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700"
                          : "hover:bg-white dark:hover:bg-gray-800 border border-transparent"
                      )}
                    >
                      {SubIcon && (
                        <div
                          className={cn(
                            "w-9 h-9 rounded-lg flex items-center justify-center transition-all",
                            isSubActive
                              ? "bg-gradient-to-br from-blue-500/10 to-purple-500/10"
                              : "bg-gray-100 dark:bg-gray-800 group-hover/sub:bg-gradient-to-br group-hover/sub:from-blue-500/10 group-hover/sub:to-purple-500/10"
                          )}
                        >
                          <SubIcon
                            className={cn(
                              "size-4 flex-shrink-0 transition-colors",
                              isSubActive
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-gray-500 dark:text-gray-400 group-hover/sub:text-blue-600 dark:group-hover/sub:text-blue-400"
                            )}
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <span
                          className={cn(
                            "text-sm block truncate",
                            isSubActive
                              ? "text-gray-900 dark:text-white"
                              : "text-gray-700 dark:text-gray-300"
                          )}
                        >
                          {subItem.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {subItem.count !== undefined && (
                          <Badge
                            variant={isSubActive ? "default" : "secondary"}
                            className={cn(
                              "text-xs h-5",
                              isSubActive &&
                                "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                            )}
                          >
                            {subItem.count}
                          </Badge>
                        )}
                        {subItem.badge && (
                          <Badge
                            variant="default"
                            className="text-xs h-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0"
                          >
                            {subItem.badge}
                          </Badge>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}