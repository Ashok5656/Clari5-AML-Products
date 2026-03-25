import { Clock, FileText, AlertTriangle, Users, TrendingUp } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";

interface RecentItem {
  id: string;
  title: string;
  module: string;
  timestamp: string;
  icon: React.ComponentType<{ className?: string }>;
}

const recentItems: RecentItem[] = [
  {
    id: "1",
    title: "Investigation Case #042",
    module: "Investigation",
    timestamp: "5 minutes ago",
    icon: Users,
  },
  {
    id: "2",
    title: "High-Risk Alert - $50K",
    module: "AML",
    timestamp: "15 minutes ago",
    icon: AlertTriangle,
  },
  {
    id: "3",
    title: "Weekly Compliance Report",
    module: "Reports",
    timestamp: "1 hour ago",
    icon: FileText,
  },
  {
    id: "4",
    title: "Transaction Audit #789",
    module: "Audit",
    timestamp: "2 hours ago",
    icon: TrendingUp,
  },
  {
    id: "5",
    title: "Customer Profile - John Doe",
    module: "AML",
    timestamp: "3 hours ago",
    icon: Users,
  },
  {
    id: "6",
    title: "Daily AML Summary",
    module: "Reports",
    timestamp: "5 hours ago",
    icon: FileText,
  },
];

export function RecentActivity() {
  const handleItemClick = (item: RecentItem) => {
    console.log("Navigate to:", item);
  };

  const clearHistory = () => {
    console.log("Clear history");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Clock className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
              Recent Activity
            </h3>
            <button
              onClick={clearHistory}
              className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Clear all
            </button>
          </div>

          <ScrollArea className="h-[300px]">
            <div className="space-y-1">
              {recentItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[#2A53A0]/10 dark:bg-[#2A53A0]/20">
                        <Icon className="size-4 text-[#2A53A0]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 dark:text-white truncate" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs px-2 py-0">
                            {item.module}
                          </Badge>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {item.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollArea>

          {recentItems.length === 0 && (
            <div className="py-8 text-center">
              <Clock className="size-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No recent activity
              </p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
