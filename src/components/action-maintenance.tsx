import { motion } from "motion/react";
import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  Search,
  Filter,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { BreadcrumbNav } from "./breadcrumb-nav";
import { Separator } from "./ui/separator";
import { useSortableData } from "../hooks/use-sortable-data";
import { SortableHeader } from "./ui/sortable-header";

interface BreadcrumbItem {
  label: string;
  path?: string;
  isActive?: boolean;
}

interface ActionMaintenanceProps {
  breadcrumbs?: BreadcrumbItem[];
  onBreadcrumbNavigate?: (path: string) => void;
  version?: string;
}

export function ActionMaintenance({
  breadcrumbs,
  onBreadcrumbNavigate,
  version,
}: ActionMaintenanceProps = {}) {
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("L1");
  const [showRiskDropdown, setShowRiskDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  const riskLevels = ["L1", "L2", "L3", "L4", "L5"];

  // Sample data - Indian context for fraud detection
  const factsData = [
    {
      id: 1,
      factName: "Aadhaar_KYC_Verify",
      levels: ["L1", "L2", "L3", "L4", "L5"],
      createdDate: "27-05-2025 14:30:50",
      updatedDate: "28-05-2025 14:30:50",
    },
    {
      id: 2,
      factName: "PAN_Validation_Check",
      levels: ["L1", "L2", "L3", "L5"],
      createdDate: "20-05-2025 14:30:50",
      updatedDate: "21-05-2025 14:30:50",
    },
    {
      id: 3,
      factName: "UPI_Transaction_Risk",
      levels: ["L1", "L2", "L3"],
      createdDate: "15-05-2025 14:30:50",
      updatedDate: "16-05-2025 14:30:50",
    },
    {
      id: 4,
      factName: "IMPS_Transfer_Monitor",
      levels: ["L1", "L2"],
      createdDate: "14-05-2025 14:30:50",
      updatedDate: "15-05-2025 14:30:50",
    },
    {
      id: 5,
      factName: "Digital_Wallet_Score",
      levels: ["L1"],
      createdDate: "09-05-2025 14:30:50",
      updatedDate: "10-05-2025 14:30:50",
    },
    {
      id: 6,
      factName: "NEFT_Velocity_Check",
      levels: ["L4", "L5"],
      createdDate: "28-04-2025 14:30:50",
      updatedDate: "28-04-2025 14:30:50",
    },
    {
      id: 7,
      factName: "GST_Compliance_Flag",
      levels: ["L3", "L4", "L5"],
      createdDate: "27-04-2025 14:30:50",
      updatedDate: "28-04-2025 14:30:50",
    },
    {
      id: 8,
      factName: "Credit_Bureau_Score",
      levels: ["L2", "L3", "L4", "L5"],
      createdDate: "20-04-2025 14:30:50",
      updatedDate: "21-04-2025 14:30:50",
    },
    {
      id: 9,
      factName: "Mobile_Recharge_Pattern",
      levels: ["L4", "L5"],
      createdDate: "15-04-2025 14:30:50",
      updatedDate: "16-04-2025 14:30:50",
    },
    {
      id: 10,
      factName: "Bank_Account_Verify",
      levels: ["L1", "L2", "L5"],
      createdDate: "14-04-2025 14:30:50",
      updatedDate: "15-04-2025 14:30:50",
    },
    {
      id: 11,
      factName: "Merchant_Risk_Rating",
      levels: ["L3", "L4", "L5"],
      createdDate: "09-04-2025 14:30:50",
      updatedDate: "10-04-2025 14:30:50",
    },
    {
      id: 12,
      factName: "Cross_Border_Alert",
      levels: ["L4", "L5"],
      createdDate: "28-03-2025 14:30:50",
      updatedDate: "29-03-2025 14:30:50",
    },
    {
      id: 13,
      factName: "ATM_Withdrawal_Limit",
      levels: ["L1", "L2", "L3"],
      createdDate: "20-03-2025 14:30:50",
      updatedDate: "21-03-2025 14:30:50",
    },
    {
      id: 14,
      factName: "Insurance_Fraud_Check",
      levels: ["L2", "L3", "L4"],
      createdDate: "15-03-2025 14:30:50",
      updatedDate: "16-03-2025 14:30:50",
    },
  ];

  const filteredData = factsData.filter((fact) =>
    fact.factName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { items: sortedData, requestSort, sortConfig } = useSortableData(filteredData);

  const totalRecords = sortedData.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRecords);
  const currentData = sortedData.slice(startIndex, endIndex);

  const handleEdit = (id: number) => {
    console.log("Edit fact:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete fact:", id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
        {/* Risk Level Investigation Dropdown */}
        <Card className="border-gray-200 dark:border-gray-800 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
          <div className="p-5">
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Investigate if default risk level in
              </label>
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowRiskDropdown(!showRiskDropdown)}
                  className="flex items-center gap-3 px-4 h-10 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-[#2A53A0] dark:hover:border-[#6b93e6] transition-all min-w-[200px]"
                >
                  <div className="flex gap-2">
                    {riskLevels.map((level) => (
                      <Badge
                        key={level}
                        className={`${
                          level === selectedRiskLevel
                            ? "bg-[#2A53A0] text-white dark:bg-[#6b93e6]"
                            : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {level}
                      </Badge>
                    ))}
                  </div>
                  <ChevronDown
                    className={`size-4 text-gray-500 transition-transform ${
                      showRiskDropdown ? "rotate-180" : ""
                    }`}
                  />
                </motion.button>

                {showRiskDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl z-50"
                  >
                    <div className="py-2">
                      {riskLevels.map((level) => (
                        <button
                          key={level}
                          onClick={() => {
                            setSelectedRiskLevel(level);
                            setShowRiskDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                            level === selectedRiskLevel
                              ? "bg-[#2A53A0]/10 text-[#2A53A0] dark:bg-[#6b93e6]/10 dark:text-[#6b93e6]"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </Card>

      {/* Add Level Section */}
      <Card className="border-gray-200 dark:border-gray-800 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
        <div className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-900 dark:text-white">
              Add Level(s) Associated With Facts(s)
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 h-10 bg-[#2A53A0] hover:bg-[#1e3a70] dark:bg-[#6b93e6] dark:hover:bg-[#5577cc] text-white rounded-lg transition-all shadow-sm text-sm"
            >
              <Plus className="size-4" />
              Add
            </motion.button>
          </div>
        </div>
      </Card>

      {/* Main Data Table */}
      <Card className="border-gray-200 dark:border-gray-800 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
        <div className="p-6">
          {/* Table Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search facts..."
                  className="w-64 pl-10 pr-4 h-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/20 dark:focus:ring-[#6b93e6]/30 focus:border-[#2A53A0] dark:focus:border-[#6b93e6] transition-all text-sm"
                />
              </div>

              {/* Filter */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 h-10 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-[#2A53A0] dark:hover:border-[#6b93e6] transition-all text-sm text-gray-700 dark:text-gray-300"
              >
                <Filter className="size-4" />
                Filter
              </motion.button>
            </div>

            <div className="flex items-center gap-3">
              {/* Refresh */}
              <motion.button
                whileHover={{ scale: 1.05, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <RefreshCw className="size-4 text-gray-600 dark:text-gray-400" />
              </motion.button>

              {/* Export */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 h-10 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-[#2A53A0] dark:hover:border-[#6b93e6] transition-all text-sm text-gray-700 dark:text-gray-300"
              >
                <Download className="size-4" />
                Export
              </motion.button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#2A53A0] to-[#3d6bc7] text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    <SortableHeader 
                      column="factName" 
                      label="Fact Name" 
                      sortConfig={sortConfig} 
                      onSort={requestSort} 
                      className="[&_button]:text-white [&_button]:hover:bg-white/10 [&_button]:hover:text-white"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Level
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    <SortableHeader 
                      column="createdDate" 
                      label="Created Date" 
                      sortConfig={sortConfig} 
                      onSort={requestSort} 
                      className="[&_button]:text-white [&_button]:hover:bg-white/10 [&_button]:hover:text-white"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    <SortableHeader 
                      column="updatedDate" 
                      label="Updated Date" 
                      sortConfig={sortConfig} 
                      onSort={requestSort} 
                      className="[&_button]:text-white [&_button]:hover:bg-white/10 [&_button]:hover:text-white"
                    />
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((fact, index) => (
                  <motion.tr
                    key={fact.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-2.5 text-sm text-gray-900 dark:text-white">
                      {fact.factName}
                    </td>
                    <td className="px-6 py-2.5">
                      <div className="flex gap-1.5 flex-wrap">
                        {fact.levels.map((level) => (
                          <Badge
                            key={level}
                            className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-[#2A53A0] hover:text-white dark:hover:bg-[#6b93e6] transition-colors cursor-pointer text-xs py-0.5 px-2"
                          >
                            {level}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-2.5 text-sm text-gray-600 dark:text-gray-400">
                      {fact.createdDate}
                    </td>
                    <td className="px-6 py-2.5 text-sm text-gray-600 dark:text-gray-400">
                      {fact.updatedDate}
                    </td>
                    <td className="px-6 py-2.5">
                      <div className="flex items-center justify-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEdit(fact.id)}
                          className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors group"
                        >
                          <Edit className="size-4 text-blue-600 dark:text-blue-400" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(fact.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors group"
                        >
                          <Trash2 className="size-4 text-red-600 dark:text-red-400" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Rows per page:
              </span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-3 h-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#2A53A0]/20 dark:focus:ring-[#6b93e6]/30"
              >
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Displaying records {startIndex + 1} to {endIndex} of {totalRecords}{" "}
                Records
              </span>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="h-10 w-10 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronsLeft className="size-4 text-gray-600 dark:text-gray-400" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-10 w-10 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="size-4 text-gray-600 dark:text-gray-400" />
                </motion.button>

                {[...Array(totalPages)].map((_, idx) => {
                  const page = idx + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <motion.button
                        key={page}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-[2.5rem] h-10 px-3 rounded-lg border text-sm transition-colors flex items-center justify-center ${
                          currentPage === page
                            ? "bg-[#2A53A0] border-[#2A53A0] text-white dark:bg-[#6b93e6] dark:border-[#6b93e6]"
                            : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        {page}
                      </motion.button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <span key={page} className="text-gray-500 flex items-center h-10">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-10 w-10 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="size-4 text-gray-600 dark:text-gray-400" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="h-10 w-10 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronsRight className="size-4 text-gray-600 dark:text-gray-400" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
