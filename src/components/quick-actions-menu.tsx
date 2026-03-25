import { Plus, AlertTriangle, FileText, Users, Flag, Shield, Download, Calendar } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { motion } from "motion/react";

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  shortcut?: string;
}

const quickActions: QuickAction[] = [
  {
    id: "new-alert",
    label: "Create New Alert",
    icon: AlertTriangle,
    category: "AML",
    shortcut: "Ctrl+N",
  },
  {
    id: "start-investigation",
    label: "Start Investigation",
    icon: Users,
    category: "Investigation",
    shortcut: "Ctrl+I",
  },
  {
    id: "generate-report",
    label: "Generate Report",
    icon: FileText,
    category: "Reports",
    shortcut: "Ctrl+R",
  },
  {
    id: "flag-transaction",
    label: "Flag Transaction",
    icon: Flag,
    category: "AML",
  },
  {
    id: "add-watchlist",
    label: "Add to Watchlist",
    icon: Shield,
    category: "AML",
  },
  {
    id: "schedule-audit",
    label: "Schedule Audit",
    icon: Calendar,
    category: "Audit",
  },
  {
    id: "export-data",
    label: "Export Data",
    icon: Download,
    category: "General",
  },
];

export function QuickActionsMenu() {
  const handleAction = (actionId: string) => {
    console.log("Quick action:", actionId);
    // Handle action logic here
  };

  const groupedActions = quickActions.reduce((acc, action) => {
    if (!acc[action.category]) {
      acc[action.category] = [];
    }
    acc[action.category].push(action);
    return acc;
  }, {} as Record<string, QuickAction[]>);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className="bg-[#2A53A0] hover:bg-[#2A53A0]/90 text-white hidden md:flex items-center gap-2"
        >
          <Plus className="size-4" />
          <span className="hidden lg:inline">Quick Actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {Object.entries(groupedActions).map(([category, actions], categoryIndex) => (
          <div key={category}>
            {categoryIndex > 0 && <DropdownMenuSeparator />}
            <div className="px-2 py-1.5">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{category}</p>
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <DropdownMenuItem
                    key={action.id}
                    onClick={() => handleAction(action.id)}
                    className="cursor-pointer"
                  >
                    <Icon className="size-4 mr-2 text-[#2A53A0]" />
                    <span className="flex-1">{action.label}</span>
                    {action.shortcut && (
                      <kbd className="ml-auto text-xs text-gray-400 hidden xl:inline">
                        {action.shortcut}
                      </kbd>
                    )}
                  </DropdownMenuItem>
                );
              })}
            </div>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
