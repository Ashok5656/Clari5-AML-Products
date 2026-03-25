import { motion } from "motion/react";
import {
  TrendingUp,
  TrendingDown,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Users,
  FileText,
  BarChart3,
  Activity,
  Calendar,
  Download,
  ChevronDown,
  DollarSign,
  Zap,
  Globe,
  Target,
  Brain,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  ShieldCheck,
  UserCheck,
  CreditCard,
  Wallet,
  Banknote as BanknoteIcon,
  AlertCircle,
  Server,
  MapPin,
  ChevronRight,
  RefreshCw as Renew,
  Filter,
  Briefcase,
} from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { BreadcrumbNav } from "./breadcrumb-nav";
import { Separator } from "./ui/separator";

interface BreadcrumbItem {
  label: string;
  path?: string;
  isActive?: boolean;
}

interface DashboardOverviewProps {
  breadcrumbs?: BreadcrumbItem[];
  onBreadcrumbNavigate?: (path: string) => void;
}

export function DashboardOverview({ breadcrumbs, onBreadcrumbNavigate }: DashboardOverviewProps = {}) {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [showDateMenu, setShowDateMenu] = useState(false);

  const dateRangeOptions = [
    "Today",
    "Last 7 Days",
    "Last 30 Days",
    "Last 90 Days",
    "This Month",
    "Last Month",
    "This Quarter",
    "This Year",
    "Custom Range",
  ];

  const handleExport = () => {
    console.log("Exporting dashboard data...");
  };

  // Enhanced KPI data
  const kpiCards = [
    {
      id: "my-open-cases",
      title: "My Open Cases",
      value: "12",
      subValue: "4 High Priority",
      change: "-2",
      trend: "down",
      icon: Briefcase,
      gradient: "from-[#2A53A0] to-blue-400",
    },
    {
      id: "pending-reviews",
      title: "Pending Reviews",
      value: "8",
      subValue: "Due Today",
      change: "+3",
      trend: "up",
      icon: FileText,
      gradient: "from-emerald-600 to-teal-500",
    },
    {
      id: "my-efficiency",
      title: "My Efficiency",
      value: "94%",
      subValue: "SLA Adherence",
      change: "+1.5%",
      trend: "up",
      icon: Target,
      gradient: "from-indigo-600 to-purple-500",
    },
    {
      id: "urgent-actions",
      title: "Urgent Actions",
      value: "3",
      subValue: "Requires immediate attention",
      change: "+1",
      trend: "up",
      icon: AlertTriangle,
      gradient: "from-orange-600 to-red-500",
    },
    {
      id: "tasks-completed",
      title: "Tasks Completed",
      value: "45",
      subValue: "This Month",
      change: "+12",
      trend: "up",
      icon: CheckCircle2,
      gradient: "from-violet-600 to-pink-500",
    },
  ];

  // Extended transaction data
  const transactionData = [
    { id: "mon", month: "Mon", volume: 12, fraud: 2, legitimate: 10, compliance: 95 },
    { id: "tue", month: "Tue", volume: 15, fraud: 1, legitimate: 14, compliance: 94 },
    { id: "wed", month: "Wed", volume: 18, fraud: 3, legitimate: 15, compliance: 96 },
    { id: "thu", month: "Thu", volume: 14, fraud: 0, legitimate: 14, compliance: 93 },
    { id: "fri", month: "Fri", volume: 22, fraud: 4, legitimate: 18, compliance: 95 },
    { id: "sat", month: "Sat", volume: 8, fraud: 1, legitimate: 7, compliance: 94 },
  ];

  const riskData = [
    { name: "Low Risk", value: 68, color: "#10b981" },
    { name: "Medium Risk", value: 22, color: "#f59e0b" },
    { name: "High Risk", value: 10, color: "#ef4444" },
  ];

  // AI Anomaly Detection Data
  const anomalyData = [
    { category: "Transaction Velocity", score: 92, threshold: 75 },
    { category: "Geo-Location", score: 78, threshold: 75 },
    { category: "Device Fingerprint", score: 88, threshold: 75 },
    { category: "Behavior Pattern", score: 95, threshold: 75 },
    { category: "Network Analysis", score: 82, threshold: 75 },
  ];

  // System health metrics
  const systemHealth = [
    { name: "API Response Time", value: "124ms", status: "good", percentage: 92 },
    { name: "Detection Accuracy", value: "97.8%", status: "excellent", percentage: 98 },
    { name: "System Uptime", value: "99.9%", status: "excellent", percentage: 100 },
    { name: "Queue Processing", value: "142/min", status: "good", percentage: 88 },
  ];

  const recentAlerts = [
    {
      id: 1,
      title: "Suspicious Transaction Pattern Detected",
      description: "Multiple round-amount transactions by Arjun Mehta",
      severity: "high",
      time: "5 min ago",
      module: "AML",
      icon: AlertTriangle,
    },
    {
      id: 2,
      title: "Compliance Threshold Exceeded",
      description: "Daily transaction limit breach - Kavya Iyer",
      severity: "critical",
      time: "12 min ago",
      module: "Compliance",
      icon: ShieldCheck,
    },
    {
      id: 3,
      title: "Unusual Geographic Activity",
      description: "Login from new country - Rohit Verma",
      severity: "medium",
      time: "28 min ago",
      module: "Security",
      icon: Globe,
    },
    {
      id: 4,
      title: "AI Anomaly Alert",
      description: "Behavioral pattern deviation - Neha Gupta",
      severity: "high",
      time: "1 hour ago",
      module: "AI Detection",
      icon: Brain,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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

        {/* Right Side: Date & Export */}
        <div className="flex items-center gap-3">
          {/* Date Range Selector */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowDateMenu(!showDateMenu)}
              className="flex items-center gap-2 px-4 h-[46px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-[#2A53A0] dark:hover:border-[#6b93e6] transition-all shadow-sm"
            >
              <Calendar className="size-4 text-[#2A53A0] dark:text-[#6b93e6]" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {dateRange}
              </span>
              <ChevronDown
                className={`size-4 text-gray-500 transition-transform ${
                  showDateMenu ? "rotate-180" : ""
                }`}
              />
            </motion.button>

            {showDateMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl z-50"
              >
                <div className="py-2">
                  {dateRangeOptions.map((option) => (
                    <button
                      key={`date-option-${option.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => {
                        setDateRange(option);
                        setShowDateMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        dateRange === option
                          ? "bg-[#2A53A0]/10 text-[#2A53A0] dark:bg-[#6b93e6]/10 dark:text-[#6b93e6]"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExport}
            className="flex items-center gap-2 px-4 h-[46px] bg-[#2A53A0] hover:bg-[#1e3a70] dark:bg-[#6b93e6] dark:hover:bg-[#5577cc] text-white rounded-lg transition-all shadow-sm"
          >
            <span className="text-sm">Export</span>
            <Download className="size-4" />
          </motion.button>
        </div>
      </div>

      {/* Enhanced KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          
          const colorMap = {
            0: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400", badge: "bg-blue-50 text-blue-700 border-blue-200" },
            1: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
            2: { bg: "bg-indigo-100 dark:bg-indigo-900/30", text: "text-indigo-600 dark:text-indigo-400", badge: "bg-indigo-50 text-indigo-700 border-indigo-200" },
            3: { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-600 dark:text-orange-400", badge: "bg-orange-50 text-orange-700 border-orange-200" },
            4: { bg: "bg-violet-100 dark:bg-violet-900/30", text: "text-violet-600 dark:text-violet-400", badge: "bg-violet-50 text-violet-700 border-violet-200" },
          } as Record<number, { bg: string, text: string, badge: string }>;
          
          const colors = colorMap[index] || colorMap[0];

          return (
            <motion.div
              key={`kpi-card-${kpi.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className={`p-2 rounded-lg ${colors.bg}`}>
                    <Icon className={`size-5 ${colors.text}`} />
                  </div>
                  <Badge variant="outline" className={colors.badge}>{kpi.change}</Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{kpi.value}</h3>
                <p className="text-sm text-gray-500">{kpi.title}</p>
                <p className="text-xs text-gray-400 mt-1">{kpi.subValue}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* AI Insights & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* AI-Powered Anomaly Detection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-gray-200 dark:border-gray-800 h-full bg-white dark:bg-gray-900 shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Brain className="size-5 text-[#2A53A0] dark:text-[#6b93e6]" />
                  <h3 className="text-gray-900 dark:text-white">
                    AI Anomaly Detection
                  </h3>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="size-5 text-[#2A53A0] dark:text-[#6b93e6]" />
                </motion.div>
              </div>

              <div className="relative h-[250px] flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  {[100, 75, 50, 25].map((percent) => (
                    <div
                      key={`bg-circle-${percent}`}
                      className="absolute border border-gray-200 dark:border-gray-800 rounded-full"
                      style={{
                        width: `${percent}%`,
                        height: `${percent}%`,
                      }}
                    />
                  ))}
                </div>
                
                <div className="relative z-10 space-y-3 w-full max-w-xs">
                  {anomalyData.map((item, index) => (
                    <motion.div
                      key={`anomaly-metric-${item.category.toLowerCase().replace(/\s+/g, '-')}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {item.category}
                        </span>
                        <span className="text-xs font-medium text-gray-900 dark:text-white">
                          {item.score}%
                        </span>
                      </div>
                      <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.score}%` }}
                          transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-[#2A53A0] to-[#4A7BD0] rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* System Health */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-gray-200 dark:border-gray-800 h-full bg-white dark:bg-gray-900 shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Server className="size-5 text-[#2A53A0] dark:text-[#6b93e6]" />
                  <h3 className="text-gray-900 dark:text-white">
                    System Health
                  </h3>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  All Systems Operational
                </Badge>
              </div>

              <div className="space-y-5">
                {systemHealth.map((metric, index) => (
                  <motion.div
                    key={`health-metric-${metric.name.toLowerCase().replace(/\s+/g, '-')}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {metric.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-900 dark:text-white">
                          {metric.value}
                        </span>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            metric.status === "excellent"
                              ? "bg-emerald-500"
                              : "bg-[#2A53A0]"
                          }`}
                        />
                      </div>
                    </div>
                    <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.percentage}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                        className={`h-full ${
                          metric.status === "excellent"
                            ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                            : "bg-gradient-to-r from-[#2A53A0] to-[#4A7BD0]"
                        }`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Transaction Analytics & Risk Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Transaction Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm h-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Activity className="size-5 text-[#2A53A0] dark:text-[#6b93e6]" />
                  <h3 className="text-gray-900 dark:text-white">
                    My Case Throughput
                  </h3>
                </div>
              </div>
              <div className="relative h-[450px] pt-4">
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-4 pr-2">
                  {[22, 18, 14, 10, 6].map((val) => (
                    <span key={`y-label-${val}`} className="text-xs text-gray-500 dark:text-gray-400">
                      {val}
                    </span>
                  ))}
                </div>

                <div className="ml-8 h-full flex flex-col">
                  <div className="relative flex-1">
                    {[0, 25, 50, 75, 100].map((top) => (
                      <div
                        key={`grid-line-${top}`}
                        className="absolute w-full border-t border-dashed border-gray-200 dark:border-gray-800"
                        style={{ top: `${top}%` }}
                      />
                    ))}

                    <div className="absolute inset-0 flex items-end justify-around px-4">
                      {transactionData.map((data, index) => {
                        const maxValue = 22;
                        const heightPercent = (data.volume / maxValue) * 100;
                        
                        return (
                          <div key={`bar-${data.id}`} className="flex-1 flex flex-col items-center justify-end h-full">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${heightPercent}%` }}
                              transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                              className="w-2 bg-gradient-to-t from-[#2A53A0] to-[#4A7BD0] rounded-t-full relative group"
                            >
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {data.volume} cases
                              </div>
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-around px-4 pt-2 mt-2 border-t border-gray-200 dark:border-gray-800">
                    {transactionData.map((data) => (
                      <span
                        key={`x-label-${data.id}`}
                        className="flex-1 text-center text-xs text-gray-500 dark:text-gray-400"
                      >
                        {data.month}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Risk Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm h-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Shield className="size-5 text-[#2A53A0] dark:text-[#6b93e6]" />
                  <h3 className="text-gray-900 dark:text-white">
                    Risk Distribution
                  </h3>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="relative h-[240px] flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    {riskData.map((risk, index) => {
                      const total = riskData.reduce((sum, r) => sum + r.value, 0);
                      const offset = riskData
                        .slice(0, index)
                        .reduce((sum, r) => sum + r.value, 0);
                      const startAngle = (offset / total) * 360;
                      const endAngle = ((offset + risk.value) / total) * 360;
                      
                      const outerRadius = 96;
                      const innerRadius = 60;
                      const centerX = 96;
                      const centerY = 96;
                      
                      const startAngleRad = ((startAngle - 90) * Math.PI) / 180;
                      const endAngleRad = ((endAngle - 90) * Math.PI) / 180;
                      
                      const outerStartX = centerX + outerRadius * Math.cos(startAngleRad);
                      const outerStartY = centerY + outerRadius * Math.sin(startAngleRad);
                      const outerEndX = centerX + outerRadius * Math.cos(endAngleRad);
                      const outerEndY = centerY + outerRadius * Math.sin(endAngleRad);
                      
                      const innerStartX = centerX + innerRadius * Math.cos(endAngleRad);
                      const innerStartY = centerY + innerRadius * Math.sin(endAngleRad);
                      const innerEndX = centerX + innerRadius * Math.cos(startAngleRad);
                      const innerEndY = centerY + innerRadius * Math.sin(startAngleRad);
                      
                      const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
                      
                      const pathData = [
                        `M ${outerStartX} ${outerStartY}`,
                        `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}`,
                        `L ${innerStartX} ${innerStartY}`,
                        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerEndX} ${innerEndY}`,
                        'Z'
                      ].join(' ');
                      
                      return (
                        <motion.svg
                          key={`risk-donut-${risk.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="absolute inset-0"
                          viewBox="0 0 192 192"
                        >
                          <motion.path
                            d={pathData}
                            fill={risk.color}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                          />
                        </motion.svg>
                      );
                    })}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          100%
                        </span>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                          Portfolio
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  {riskData.map((risk) => (
                    <div
                      key={`risk-legend-${risk.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex flex-col items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: risk.color }}
                        />
                        <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                          {risk.name}
                        </span>
                      </div>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {risk.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recent Alerts */}
      <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="size-5 text-[#2A53A0] dark:text-[#6b93e6]" />
            <h3 className="text-gray-900 dark:text-white font-semibold">
              Recent Priority Alerts
            </h3>
          </div>
          <button className="text-xs text-[#2A53A0] dark:text-[#6b93e6] font-medium hover:underline">
            View All Alerts
          </button>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {recentAlerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <motion.div
                key={`recent-alert-${alert.id}`}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                className="p-4 flex items-center gap-4 group transition-colors"
              >
                <div
                  className={`p-2.5 rounded-lg ${
                    alert.severity === "critical"
                      ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                      : alert.severity === "high"
                      ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
                      : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  }`}
                >
                  <Icon className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {alert.title}
                    </h4>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap">
                      {alert.time}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {alert.description}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className={`text-[10px] uppercase font-bold px-2 py-0 h-5 ${
                      alert.severity === "critical"
                        ? "bg-red-50 text-red-700 border-red-200"
                        : alert.severity === "high"
                        ? "bg-orange-50 text-orange-700 border-orange-200"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}
                  >
                    {alert.severity}
                  </Badge>
                  <ChevronRight className="size-4 text-gray-300 group-hover:text-[#2A53A0] transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
