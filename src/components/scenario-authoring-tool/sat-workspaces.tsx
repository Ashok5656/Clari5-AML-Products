import { motion } from "motion/react";
import { Folder, Users, Clock, MoreVertical } from "lucide-react";

export function SATWorkspaces() {
  const workspaces = [
    {
      id: 1,
      name: "AML Transaction Monitoring",
      description: "Scenarios for detecting suspicious transactions",
      scenarios: 15,
      collaborators: 4,
      lastUpdated: "2 hours ago",
      color: "blue",
    },
    {
      id: 2,
      name: "KYC Verification",
      description: "Identity verification and document validation",
      scenarios: 8,
      collaborators: 3,
      lastUpdated: "5 hours ago",
      color: "green",
    },
    {
      id: 3,
      name: "Fraud Detection",
      description: "Advanced fraud pattern recognition scenarios",
      scenarios: 12,
      collaborators: 5,
      lastUpdated: "1 day ago",
      color: "purple",
    },
    {
      id: 4,
      name: "Risk Assessment",
      description: "Customer and transaction risk scoring",
      scenarios: 10,
      collaborators: 3,
      lastUpdated: "2 days ago",
      color: "orange",
    },
    {
      id: 5,
      name: "Sanctions Screening",
      description: "Watchlist and sanctions list checking",
      scenarios: 6,
      collaborators: 2,
      lastUpdated: "3 days ago",
      color: "red",
    },
    {
      id: 6,
      name: "Regulatory Compliance",
      description: "RBI and SEBI compliance monitoring",
      scenarios: 9,
      collaborators: 4,
      lastUpdated: "4 days ago",
      color: "indigo",
    },
    {
      id: 7,
      name: "Payment Gateway Monitoring",
      description: "UPI, IMPS, NEFT transaction monitoring",
      scenarios: 11,
      collaborators: 3,
      lastUpdated: "5 days ago",
      color: "pink",
    },
    {
      id: 8,
      name: "Credit Risk Analysis",
      description: "Loan and credit facility risk assessment",
      scenarios: 7,
      collaborators: 2,
      lastUpdated: "1 week ago",
      color: "cyan",
    },
  ];

  const colorClasses: Record<string, string> = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
    red: "bg-red-500",
    indigo: "bg-indigo-500",
    pink: "bg-pink-500",
    cyan: "bg-cyan-500",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-[#2A53A0] hover:bg-[#1e3a70] text-white rounded-lg shadow-lg transition-colors"
        >
          Create Workspace
        </motion.button>
      </div>

      {/* Workspaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {workspaces.map((workspace, index) => (
          <motion.div
            key={workspace.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`p-2 rounded-lg ${
                  colorClasses[workspace.color]
                } bg-opacity-10`}
              >
                <Folder
                  className={`size-5 ${colorClasses[workspace.color]}`}
                  style={{ color: undefined }}
                />
              </div>
              <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="size-4 text-gray-500" />
              </button>
            </div>

            <h3 className="text-gray-900 dark:text-white mb-2 line-clamp-1">
              {workspace.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              {workspace.description}
            </p>

            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Folder className="size-3" />
                <span>{workspace.scenarios}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="size-3" />
                <span>{workspace.collaborators}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <Clock className="size-3 text-gray-400" />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {workspace.lastUpdated}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
