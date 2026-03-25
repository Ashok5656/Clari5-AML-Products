import { motion } from "motion/react";
import { Zap, Clock, CheckCircle, AlertCircle, Play } from "lucide-react";

export function SATEvents() {
  const events = [
    {
      id: 1,
      name: "High Value Transaction",
      type: "Transaction",
      status: "active",
      triggers: 1247,
      lastTriggered: "5 min ago",
      description: "Detects transactions above ₹10 lakhs",
    },
    {
      id: 2,
      name: "Multiple Failed Login Attempts",
      type: "Security",
      status: "active",
      triggers: 89,
      lastTriggered: "15 min ago",
      description: "Monitors repeated failed authentication attempts",
    },
    {
      id: 3,
      name: "Unusual Remittance Pattern",
      type: "AML",
      status: "active",
      triggers: 456,
      lastTriggered: "1 hour ago",
      description: "Identifies irregular international transfers",
    },
    {
      id: 4,
      name: "Dormant Account Activation",
      type: "KYC",
      status: "inactive",
      triggers: 23,
      lastTriggered: "2 days ago",
      description: "Tracks sudden activity in dormant accounts",
    },
    {
      id: 5,
      name: "PAN-Aadhaar Mismatch",
      type: "Verification",
      status: "active",
      triggers: 167,
      lastTriggered: "30 min ago",
      description: "Detects inconsistencies in identity documents",
    },
    {
      id: 6,
      name: "Rapid Transaction Velocity",
      type: "Fraud",
      status: "active",
      triggers: 892,
      lastTriggered: "10 min ago",
      description: "Monitors high-frequency transaction patterns",
    },
    {
      id: 7,
      name: "GST Validation Failure",
      type: "Compliance",
      status: "warning",
      triggers: 45,
      lastTriggered: "3 hours ago",
      description: "Flags invalid or mismatched GST numbers",
    },
    {
      id: 8,
      name: "Watchlist Match",
      type: "Sanctions",
      status: "active",
      triggers: 12,
      lastTriggered: "45 min ago",
      description: "Alerts on matches with sanctions lists",
    },
    {
      id: 9,
      name: "Cross-Border Wire Transfer",
      type: "AML",
      status: "active",
      triggers: 334,
      lastTriggered: "20 min ago",
      description: "Monitors international wire transfers",
    },
    {
      id: 10,
      name: "IP Address Anomaly",
      type: "Security",
      status: "active",
      triggers: 567,
      lastTriggered: "8 min ago",
      description: "Detects logins from unusual locations",
    },
    {
      id: 11,
      name: "Bulk Payment Processing",
      type: "Transaction",
      status: "inactive",
      triggers: 78,
      lastTriggered: "1 day ago",
      description: "Tracks large batch payment operations",
    },
    {
      id: 12,
      name: "Customer Risk Score Change",
      type: "Risk",
      status: "active",
      triggers: 203,
      lastTriggered: "35 min ago",
      description: "Alerts on significant risk profile changes",
    },
    {
      id: 13,
      name: "UPI Transaction Spike",
      type: "Payment",
      status: "warning",
      triggers: 1456,
      lastTriggered: "2 min ago",
      description: "Monitors unusual UPI activity patterns",
    },
    {
      id: 14,
      name: "Account Takeover Attempt",
      type: "Security",
      status: "active",
      triggers: 34,
      lastTriggered: "1 hour ago",
      description: "Detects potential account compromise",
    },
    {
      id: 15,
      name: "Regulatory Report Due",
      type: "Compliance",
      status: "active",
      triggers: 5,
      lastTriggered: "4 hours ago",
      description: "Reminds about upcoming regulatory submissions",
    },
  ];

  const statusConfig: Record<
    string,
    { color: string; bgColor: string; icon: any }
  > = {
    active: {
      color: "text-green-700 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-950",
      icon: CheckCircle,
    },
    inactive: {
      color: "text-gray-700 dark:text-gray-400",
      bgColor: "bg-gray-100 dark:bg-gray-800",
      icon: Clock,
    },
    warning: {
      color: "text-orange-700 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-950",
      icon: AlertCircle,
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-[#2A53A0] hover:bg-[#1e3a70] text-white rounded-lg shadow-lg transition-colors flex items-center gap-2"
        >
          <Play className="size-4" />
          Create Event
        </motion.button>
      </div>

      {/* Events Table */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 tracking-wider">
                  Event Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 tracking-wider">
                  Triggers
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 tracking-wider">
                  Last Triggered
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {events.map((event, index) => {
                const StatusIcon = statusConfig[event.status].icon;

                return (
                  <motion.tr
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-2.5">
                      <div>
                        <div className="text-sm text-gray-900 dark:text-white">
                          {event.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {event.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-2.5">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-xs font-medium">
                        <Zap className="size-3" />
                        {event.type}
                      </span>
                    </td>
                    <td className="px-6 py-2.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-md ${
                          statusConfig[event.status].bgColor
                        } ${statusConfig[event.status].color} text-xs font-medium`}
                      >
                        <StatusIcon className="size-3" />
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-2.5">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {event.triggers.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-2.5">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {event.lastTriggered}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
