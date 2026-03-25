import { motion } from "motion/react";
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Search,
  MoreVertical,
  ShieldAlert,
  Info,
  XCircle,
  Eye,
  Trash2,
  Check,
  Globe,
  RefreshCw as Renew,
  ChevronDown
} from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { BreadcrumbNav } from "../breadcrumb-nav";

interface BreadcrumbItem {
  label: string;
  path?: string;
  isActive?: boolean;
}

interface AlertsNotificationsProps {
  breadcrumbs?: BreadcrumbItem[];
  onBreadcrumbNavigate?: (path: string) => void;
}

export function AlertsNotifications({ breadcrumbs, onBreadcrumbNavigate }: AlertsNotificationsProps) {
  const [filter, setFilter] = useState("All");

  const alerts = [
    {
      id: "SCR-2992",
      title: "PEP Match Confirmed",
      description: "Match found against 'Politically Exposed Persons' list for customer #8821.",
      severity: "High",
      module: "Screening",
      time: "2 mins ago",
      status: "Unread",
      assignee: "Compliance Team"
    },
    {
      id: "SCR-2991",
      title: "Sanctions List Hit",
      description: "Potential match with 'OFAC SDN List' for incoming wire transfer.",
      severity: "Critical",
      module: "Sanctions",
      time: "15 mins ago",
      status: "Unread",
      assignee: "Sanctions Desk"
    },
    {
      id: "SCR-2990",
      title: "Adverse Media Alert",
      description: "Negative news found related to 'Global Trade Corp' in recent scan.",
      severity: "Medium",
      module: "Media",
      time: "1 hour ago",
      status: "Read",
      assignee: "Rahul V."
    },
    {
      id: "SCR-2989",
      title: "Watchlist Update",
      description: "System successfully updated with latest UN Security Council list.",
      severity: "Info",
      module: "System",
      time: "2 hours ago",
      status: "Read",
      assignee: "System"
    },
    {
      id: "SCR-2988",
      title: "False Positive Marked",
      description: "Alert #8821 marked as False Positive by supervisor.",
      severity: "Low",
      module: "Screening",
      time: "5 hours ago",
      status: "Resolved",
      assignee: "Auto-Bot"
    },
    {
      id: "SCR-2987",
      title: "Batch Screening Complete",
      description: "Daily batch screening completed for 45,000 customers. 12 hits found.",
      severity: "Medium",
      module: "Batch",
      time: "Yesterday",
      status: "Read",
      assignee: "Ops Team"
    }
  ];

  const filteredAlerts = filter === "All" ? alerts : alerts.filter(a => a.severity === filter || a.status === filter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        {/* Left Side: Context Controls */}
        <div className="flex items-center gap-3">
          {/* Region Filter */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-3 h-[46px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-[#2A53A0] dark:hover:border-[#6b93e6] transition-all"
          >
            <Globe className="size-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">All Regions</span>
            <ChevronDown className="size-3 text-gray-400" />
          </motion.button>

          <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1 hidden sm:block" />

          {/* Last Updated */}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
             <span className="hidden sm:inline">Updated: Just now</span>
             <motion.button
               whileHover={{ rotate: 180 }}
               transition={{ duration: 0.5 }}
               className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-[#2A53A0] dark:text-[#6b93e6]"
             >
               <Renew className="size-4" />
             </motion.button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 h-[46px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-[#2A53A0] transition-all shadow-sm">
             <CheckCircle className="size-4 text-gray-500" />
             <span className="text-sm text-gray-700 dark:text-gray-300">Mark All Read</span>
           </button>
           <button className="flex items-center gap-2 px-4 h-[46px] bg-[#2A53A0] text-white rounded-lg shadow-sm hover:bg-[#1e3a70] transition-all">
            <span className="text-sm">Settings</span>
            <MoreVertical className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar Filters */}
        <Card className="w-full md:w-64 p-3 h-fit bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
           <div className="flex items-center gap-2 mb-2">
             <Filter className="size-4 text-[#2A53A0] dark:text-[#6b93e6]" />
             <h3 className="text-gray-900 dark:text-white">Filters</h3>
           </div>
           <div className="space-y-1">
             {["All", "Unread", "Critical", "High", "Medium", "Low", "Resolved"].map((item) => (
               <button
                 key={item}
                 onClick={() => setFilter(item)}
                 className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                   filter === item
                     ? "bg-[#2A53A0]/10 text-[#2A53A0] dark:bg-[#6b93e6]/10 dark:text-[#6b93e6]"
                     : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                 }`}
               >
                 <div className="flex justify-between items-center">
                   {item}
                   {item === "All" && <span className="text-xs bg-gray-200 dark:bg-gray-700 px-1.5 rounded-full text-gray-600 dark:text-gray-300">{alerts.length}</span>}
                   {item === "Critical" && <span className="text-xs bg-red-100 text-red-600 px-1.5 rounded-full">1</span>}
                   {item === "Unread" && <span className="text-xs bg-blue-100 text-blue-600 px-1.5 rounded-full">2</span>}
                 </div>
               </button>
             ))}
           </div>
        </Card>

        {/* Alerts List */}
        <div className="flex-1 space-y-3">
           {/* Search Bar */}
           <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search alerts by ID, title or content..."
                className="w-full pl-10 pr-4 h-[46px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg outline-none focus:border-[#2A53A0] transition-all"
              />
           </div>

           {filteredAlerts.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                <Bell className="size-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">No alerts found</h3>
                <p className="text-gray-500">Try adjusting your filters or search query.</p>
             </div>
           ) : (
             filteredAlerts.map((alert, index) => (
               <motion.div
                 key={alert.id}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: index * 0.05 }}
               >
                 <Card className={`p-3 border-l-4 hover:shadow-md transition-shadow cursor-pointer ${
                    alert.severity === "Critical" ? "border-l-red-500" :
                    alert.severity === "High" ? "border-l-orange-500" :
                    alert.severity === "Medium" ? "border-l-yellow-500" :
                    alert.severity === "Info" ? "border-l-blue-500" :
                    "border-l-gray-300"
                 } ${alert.status === "Unread" ? "bg-white dark:bg-gray-900" : "bg-gray-50/50 dark:bg-gray-900/50"}`}>
                    <div className="flex items-start gap-3">
                       <div className={`mt-1 p-2 rounded-full ${
                          alert.severity === "Critical" ? "bg-red-100 dark:bg-red-900/30 text-red-600" :
                          alert.severity === "High" ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600" :
                          alert.severity === "Medium" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600" :
                          "bg-blue-100 dark:bg-blue-900/30 text-blue-600"
                       }`}>
                          {alert.severity === "Critical" || alert.severity === "High" ? <ShieldAlert className="size-5" /> :
                           alert.severity === "Medium" ? <AlertTriangle className="size-5" /> :
                           <Info className="size-5" />}
                       </div>
                       
                       <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                             <h4 className={`text-base font-semibold ${alert.status === "Unread" ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}>
                                {alert.title}
                                {alert.status === "Unread" && <span className="ml-2 w-2 h-2 inline-block rounded-full bg-blue-500"></span>}
                             </h4>
                             <span className="text-xs text-gray-500 whitespace-nowrap">{alert.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-2 line-clamp-2">{alert.description}</p>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                             <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{alert.id}</span>
                             <span>Module: {alert.module}</span>
                             <span>Assignee: {alert.assignee}</span>
                          </div>
                       </div>

                       <div className="flex flex-col gap-2">
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors" title="View Details">
                             <Eye className="size-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors" title="Resolve">
                             <Check className="size-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors" title="Delete">
                             <Trash2 className="size-4" />
                          </button>
                       </div>
                    </div>
                 </Card>
               </motion.div>
             ))
           )}
        </div>
      </div>
    </motion.div>
  );
}
