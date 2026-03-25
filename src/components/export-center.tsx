import { Download, FileText, CheckCircle, Clock, XCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { motion } from "motion/react";

type ExportStatus = "ready" | "processing" | "failed";

interface ExportItem {
  id: string;
  name: string;
  type: string;
  status: ExportStatus;
  size?: string;
  timestamp: string;
}

const mockExports: ExportItem[] = [
  {
    id: "1",
    name: "AML Weekly Report.pdf",
    type: "PDF",
    status: "ready",
    size: "2.4 MB",
    timestamp: "2 minutes ago",
  },
  {
    id: "2",
    name: "Transaction Data.xlsx",
    type: "Excel",
    status: "ready",
    size: "5.1 MB",
    timestamp: "15 minutes ago",
  },
  {
    id: "3",
    name: "Customer Risk Scores.csv",
    type: "CSV",
    status: "processing",
    timestamp: "Just now",
  },
  {
    id: "4",
    name: "Audit Trail Report.pdf",
    type: "PDF",
    status: "failed",
    timestamp: "1 hour ago",
  },
];

export function ExportCenter() {
  const readyCount = mockExports.filter((e) => e.status === "ready").length;

  const handleDownload = (item: ExportItem) => {
    console.log("Download:", item);
  };

  const getStatusIcon = (status: ExportStatus) => {
    switch (status) {
      case "ready":
        return CheckCircle;
      case "processing":
        return Clock;
      case "failed":
        return XCircle;
    }
  };

  const getStatusColor = (status: ExportStatus) => {
    switch (status) {
      case "ready":
        return "text-emerald-600 dark:text-emerald-400";
      case "processing":
        return "text-orange-600 dark:text-orange-400";
      case "failed":
        return "text-red-600 dark:text-red-400";
    }
  };

  const getStatusBadge = (status: ExportStatus) => {
    switch (status) {
      case "ready":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400";
      case "processing":
        return "bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400";
      case "failed":
        return "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400";
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Download className="size-5" />
          {readyCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-[#2A53A0] text-white rounded-full text-xs flex items-center justify-center"
            >
              {readyCount}
            </motion.span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
              Export Center
            </h3>
            <Badge variant="outline" className="bg-[#2A53A0]/10 text-[#2A53A0]">
              {readyCount} Ready
            </Badge>
          </div>

          <ScrollArea className="h-[300px]">
            <div className="space-y-2">
              {mockExports.map((item) => {
                const StatusIcon = getStatusIcon(item.status);
                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                        <FileText className="size-4 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm text-gray-900 dark:text-white truncate" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {item.name}
                          </p>
                          <StatusIcon className={`size-4 flex-shrink-0 ${getStatusColor(item.status)}`} />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs px-2 py-0">
                            {item.type}
                          </Badge>
                          {item.size && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {item.size}
                            </span>
                          )}
                          <span className="text-xs text-gray-400">
                            {item.timestamp}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className={`${getStatusBadge(item.status)} text-xs px-2 py-0.5`}
                          >
                            {item.status.toUpperCase()}
                          </Badge>
                          {item.status === "ready" && (
                            <button
                              onClick={() => handleDownload(item)}
                              className="text-xs text-[#2A53A0] hover:underline"
                            >
                              Download
                            </button>
                          )}
                          {item.status === "failed" && (
                            <button className="text-xs text-red-600 hover:underline">
                              Retry
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
            <button className="text-xs text-[#2A53A0] hover:underline w-full text-center">
              View All Exports →
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
