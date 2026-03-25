import { motion, AnimatePresence } from "motion/react";
import { LucideIcon } from "lucide-react";
import { cn } from "./ui/utils";
import { Badge } from "./ui/badge";
import {
  ChevronRight,
  ChevronDown,
  PanelLeftClose,
  PanelLeft,
  Home,
} from "lucide-react";
import { Button } from "./ui/button";
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

interface ExpandableSidebarProps {
  menuItems: MenuItem[];
  activeItem: string;
  onItemSelect: (itemId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function ExpandableSidebar({
  menuItems,
  activeItem,
  onItemSelect,
  isCollapsed,
  onToggleCollapse,
}: ExpandableSidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["config"]);

  const toggleMenu = (menuId: string) => {
    if (expandedMenus.includes(menuId)) {
      setExpandedMenus(expandedMenus.filter((id) => id !== menuId));
    } else {
      setExpandedMenus([...expandedMenus, menuId]);
    }
  };

  const handleMenuClick = (menuId: string, hasSubItems: boolean) => {
    if (hasSubItems) {
      toggleMenu(menuId);
      // If menu has subitems and is being expanded, don't navigate
      if (!expandedMenus.includes(menuId)) {
        return;
      }
    }
    onItemSelect(menuId);
  };

  const isItemActive = (itemId: string) => {
    if (!activeItem) return false;
    return activeItem === itemId || activeItem.startsWith(itemId + "-");
  };

  const isSubItemActive = (parentId: string, subItemId: string) => {
    if (!activeItem) return false;
    return activeItem === `${parentId}-${subItemId}`;
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        width: isCollapsed ? "80px" : "300px",
      }}
      transition={{ duration: 0.3 }}
      className={cn(
        "h-full bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300",
        isCollapsed ? "w-20" : "w-[300px]"
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
            onClick={() => onItemSelect("dashboard")}
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
              {/* Icon */}
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

              {/* Label */}
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
          const isExpanded = expandedMenus.includes(item.id);
          const hasSubItems = item.subItems && item.subItems.length > 0;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (index + 1) * 0.05 }}
            >
              {/* Main Menu Item */}
              <button
                onClick={() => handleMenuClick(item.id, hasSubItems || false)}
                className={cn(
                  "w-full group relative rounded-xl transition-all duration-200",
                  isActive && !isExpanded
                    ? `bg-gradient-to-br ${item.gradient} shadow-lg`
                    : "hover:bg-gray-100 dark:hover:bg-gray-900"
                )}
              >
                <div
                  className={cn(
                    "relative flex items-center gap-3 p-3",
                    isCollapsed ? "justify-center" : ""
                  )}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                      isActive && !isExpanded
                        ? "bg-white/20 backdrop-blur-sm shadow-lg"
                        : "bg-gray-100 dark:bg-gray-800 group-hover:scale-110"
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-5 transition-colors",
                        isActive && !isExpanded
                          ? "text-white"
                          : "text-gray-600 dark:text-gray-400"
                      )}
                    />
                  </div>

                  {/* Label and controls */}
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3
                          className={cn(
                            "text-sm transition-colors truncate text-left",
                            isActive && !isExpanded
                              ? "text-white"
                              : "text-gray-900 dark:text-white"
                          )}
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          {item.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.alertCount !== undefined && item.alertCount > 0 && (
                          <Badge
                            variant="destructive"
                            className="text-xs h-5 px-1.5"
                          >
                            {item.alertCount}
                          </Badge>
                        )}
                        {hasSubItems && (
                          <motion.div
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight
                              className={cn(
                                "size-4",
                                isActive && !isExpanded
                                  ? "text-white"
                                  : "text-gray-400"
                              )}
                            />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Collapsed state badge */}
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

              {/* Submenu Items */}
              {!isCollapsed && hasSubItems && (
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pr-2 pt-1 space-y-1">
                        {item.subItems?.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const isSubActive = isSubItemActive(
                            item.id,
                            subItem.id
                          );

                          return (
                            <motion.button
                              key={subItem.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              whileHover={{ x: 2 }}
                              onClick={() =>
                                onItemSelect(`${item.id}-${subItem.id}`)
                              }
                              className={cn(
                                "w-full flex items-center gap-3 p-2 rounded-lg transition-all text-left group/sub",
                                isSubActive
                                  ? "bg-gray-100 dark:bg-gray-900"
                                  : "hover:bg-gray-50 dark:hover:bg-gray-900/50"
                              )}
                            >
                              {SubIcon && (
                                <SubIcon
                                  className={cn(
                                    "size-4 flex-shrink-0",
                                    isSubActive
                                      ? "text-blue-600 dark:text-blue-400"
                                      : "text-gray-400 group-hover/sub:text-gray-600 dark:group-hover/sub:text-gray-300"
                                  )}
                                />
                              )}
                              <span
                                className={cn(
                                  "text-sm flex-1 truncate",
                                  isSubActive
                                    ? "text-gray-900 dark:text-white"
                                    : "text-gray-600 dark:text-gray-400"
                                )}
                              >
                                {subItem.label}
                              </span>
                              {subItem.count !== undefined && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs h-5"
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
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
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
  );
}