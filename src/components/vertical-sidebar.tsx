import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { cn } from "./ui/utils";
import { Badge } from "./ui/badge";
import { ChevronRight, PanelLeftClose, PanelLeft } from "lucide-react";
import { Button } from "./ui/button";

interface MenuItem {
  id: string;
  title: string;
  icon: LucideIcon;
  gradient: string;
  itemCount: number;
  alertCount?: number;
}

interface VerticalSidebarProps {
  menuItems: MenuItem[];
  activeModule: string;
  onModuleSelect: (moduleId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function VerticalSidebar({
  menuItems,
  activeModule,
  onModuleSelect,
  isCollapsed,
  onToggleCollapse,
}: VerticalSidebarProps) {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ 
        x: 0, 
        opacity: 1,
        width: isCollapsed ? "80px" : "280px"
      }}
      transition={{ duration: 0.3 }}
      className={cn(
        "h-full bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300",
        isCollapsed ? "w-20" : "w-[280px]"
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
            Compliance Modules
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
      <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => onModuleSelect(item.id)}
                className={cn(
                  "w-full group relative rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-br shadow-lg"
                    : "hover:bg-gray-100 dark:hover:bg-gray-900"
                )}
                style={
                  isActive
                    ? { backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }
                    : {}
                }
              >
                {/* Active gradient background */}
                {isActive && (
                  <div
                    className={cn(
                      "absolute inset-0 rounded-xl bg-gradient-to-br opacity-100",
                      item.gradient
                    )}
                  />
                )}

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

                  {/* Label and counts */}
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3
                          className={cn(
                            "text-sm transition-colors truncate",
                            isActive
                              ? "text-white"
                              : "text-gray-900 dark:text-white"
                          )}
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          {item.title}
                        </h3>
                        {!isActive && (
                          <ChevronRight className="size-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 group-hover:translate-x-1 transition-all" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={cn(
                            "text-xs",
                            isActive
                              ? "text-white/80"
                              : "text-gray-500 dark:text-gray-400"
                          )}
                        >
                          {item.itemCount} items
                        </span>
                        {item.alertCount !== undefined && item.alertCount > 0 && (
                          <Badge
                            variant={isActive ? "secondary" : "destructive"}
                            className={cn(
                              "text-xs h-5 px-1.5",
                              isActive && "bg-white/20 text-white border-white/30"
                            )}
                          >
                            {item.alertCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Collapsed state badge */}
                  {isCollapsed && item.alertCount !== undefined && item.alertCount > 0 && (
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
  );
}
