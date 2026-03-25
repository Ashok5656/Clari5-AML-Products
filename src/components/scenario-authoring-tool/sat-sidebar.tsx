import {
  LayoutDashboard,
  Folder,
  Zap,
  Database,
  Settings,
  Network,
  BarChart2,
  ClipboardCheck,
  FileEdit,
  ShieldCheck,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../ui/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface SATMenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SATSidebarProps {
  activeItem: string;
  onItemSelect: (itemId: string) => void;
}

export function SATSidebar({ activeItem, onItemSelect }: SATSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const topItems: SATMenuItem[] = [
    {
      id: "sat-dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "sat-workspaces",
      label: "Workspaces",
      icon: Folder,
    },
    {
      id: "sat-events",
      label: "Events",
      icon: Zap,
    },
    {
      id: "sat-udvs",
      label: "UDVs",
      icon: Database,
    },
    {
      id: "sat-virtual-se",
      label: "Virtual SE",
      icon: Settings,
    },
    {
      id: "sat-ml-models",
      label: "ML Models",
      icon: Network,
    },
    {
      id: "sat-xvar",
      label: "xVar",
      icon: BarChart2,
    },
  ];

  const bottomItems: SATMenuItem[] = [
    {
      id: "sat-verification",
      label: "Verification",
      icon: ShieldCheck,
    },
    {
      id: "sat-my-changes",
      label: "My Changes",
      icon: FileEdit,
    },
    {
      id: "sat-audit",
      label: "Audit",
      icon: ClipboardCheck,
    },
    {
      id: "sat-help",
      label: "Help",
      icon: HelpCircle,
    },
  ];

  const renderItem = (item: SATMenuItem) => {
    const Icon = item.icon;
    const isActive = activeItem === item.id;

    if (isCollapsed) {
      return (
        <TooltipProvider key={item.id} delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => onItemSelect(item.id)}
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-[8px] transition-all duration-300",
                  isActive
                    ? "bg-gradient-to-br from-[#2A53A0] to-[#1e408a] text-white shadow-lg shadow-blue-900/20"
                    : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 hover:text-[#2A53A0]"
                )}
              >
                <Icon className="size-5 stroke-[1.5px]" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-medium bg-gray-900 text-white border-gray-800">
              {item.label}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return (
      <button
        key={item.id}
        onClick={() => onItemSelect(item.id)}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2.5 transition-all duration-300 group rounded-[8px]",
          isActive
            ? "bg-gradient-to-r from-[#2A53A0] to-[#24478f] text-white shadow-md shadow-blue-900/10"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
        )}
      >
        <div className={cn(
          "flex items-center justify-center transition-colors",
          isActive 
            ? "text-white" 
            : "text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200"
        )}>
           <Icon className="size-5 stroke-[1.5px]" />
        </div>
        <span className="text-sm font-medium truncate">{item.label}</span>
      </button>
    );
  };

  return (
    <div 
      className={`relative h-full bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col py-4 z-10 shadow-sm transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-[54px] items-center" : "w-[240px] px-3"
      }`}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute -right-3 top-1/2 -translate-y-1/2 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 transition-colors`}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </button>

      {/* Header Removed */}
      
      {/* Top Section */}
      <div className={`flex flex-col ${isCollapsed ? "gap-4 items-center" : "gap-2"} w-full`}>
        {topItems.map(renderItem)}
      </div>

      {/* Spacer */}
      <div className="flex-1 w-full flex items-center justify-center">
         <div className="h-full w-px bg-transparent"></div> 
      </div>

      {/* Separator */}
      <div className={`h-px bg-gray-200 dark:bg-gray-800 my-3 ${isCollapsed ? "w-8" : "w-full"}`}></div>

      {/* Bottom Section */}
      <div className={`flex flex-col ${isCollapsed ? "gap-4 items-center" : "gap-2"} w-full pb-2`}>
        {bottomItems.map(renderItem)}
      </div>
    </div>
  );
}
