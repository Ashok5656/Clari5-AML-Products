import { motion } from "motion/react";
import {
  FileText,
  AlertTriangle,
  Clock,
  Calendar as CalendarIcon,
  Download,
  ChevronDown,
  MoreHorizontal,
  Search,
  Globe,
  Banknote,
  TrendingUp,
  Target,
  FileWarning,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  PieChart as PieChartIcon,
  BarChart3,
  Layers,
  Activity,
  ShieldAlert,
  ListChecks
} from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  Treemap
} from "recharts";
import { cn } from "../ui/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useSortableData } from "../../hooks/use-sortable-data";
import { SortableHeader } from "../ui/sortable-header";

interface BreadcrumbItem {
  label: string;
  path?: string;
  isActive?: boolean;
}

interface ComplianceAnalyticsProps {
  breadcrumbs?: BreadcrumbItem[];
  onBreadcrumbNavigate?: (path: string) => void;
}

const CustomTreemapContent = (props: any) => {
  const { x, y, width, height, name, fill } = props;
  if (width < 40 || height < 20) return null;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} style={{ fill, stroke: '#fff', strokeWidth: 2 }} />
      <text x={x + width / 2} y={y + height / 2} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize={10} fontWeight="bold">
        {name}
      </text>
    </g>
  );
};

export function ComplianceAnalytics({ breadcrumbs, onBreadcrumbNavigate }: ComplianceAnalyticsProps) {
  // 1. KPI Data
  const kpiData = [
    { id: "total-reports-mtd", title: "Total Reports (MTD)", value: "4,855", subValue: "+12.5% vs last month", change: "+12.5%", trend: "up", icon: FileText, colorIdx: 0 },
    { id: "total-reports-ytd", title: "Total Reports (YTD)", value: "52,847", subValue: "On track for yearly target", change: "+5.2%", trend: "up", icon: Layers, colorIdx: 2 },
    { id: "approaching-deadline", title: "Approaching Deadline", value: "147", subValue: "Due within 48 hours", change: "Critical", trend: "down", icon: Clock, colorIdx: 3 },
    { id: "filing-precision", title: "Filing Precision", value: "99.2%", subValue: "Target: 99.5%", change: "-0.3%", trend: "down", icon: Target, colorIdx: 1 },
    { id: "pending-reports", title: "Pending Reports", value: "25", subValue: "Needs immediate action", change: "-5", trend: "up", icon: AlertTriangle, colorIdx: 3 },
    { id: "avg-days-to-file", title: "Avg Days to File", value: "2.4", subValue: "Benchmark: 3 Days", change: "-0.6", trend: "up", icon: CalendarIcon, colorIdx: 0 }
  ];

  // 2. Report Type Summaries
  const typeSummaries = [
    { label: "CTR", total: "3,150", filed: "3,140", pending: "10", rate: "99.7%", color: "blue" },
    { label: "CBWTR", total: "1,420", filed: "1,415", pending: "5", rate: "99.6%", color: "emerald" },
    { label: "STR", total: "180", filed: "172", pending: "8", rate: "95.5%", color: "amber" },
    { label: "NTR", total: "70", filed: "68", pending: "2", rate: "97.1%", color: "violet" },
    { label: "CCR", total: "35", filed: "35", pending: "0", rate: "100%", color: "pink" },
  ];

  // 3. Trend Data
  const reportTrends = [
    { month: "Jan", CTR: 2900, STR: 110, CBWTR: 1200 },
    { month: "Feb", CTR: 3000, STR: 125, CBWTR: 1300 },
    { month: "Mar", CTR: 2850, STR: 115, CBWTR: 1250 },
    { month: "Apr", CTR: 3100, STR: 140, CBWTR: 1350 },
    { month: "May", CTR: 3120, STR: 155, CBWTR: 1380 },
    { month: "Jun", CTR: 3150, STR: 180, CBWTR: 1420 },
  ];

  const reportDistribution = [
    { name: "CTR", value: 64.9, color: "#3b82f6" }, 
    { name: "CBWTR", value: 29.2, color: "#10b981" }, 
    { name: "STR", value: 3.7, color: "#f59e0b" }, 
    { name: "NTR", value: 1.4, color: "#8b5cf6" }, 
    { name: "CCR", value: 0.8, color: "#ec4899" }, 
  ];

  // 4. Performance Metrics
  const filingTimeliness = [
    { type: "CTR", days: 99.5, target: 98 },
    { type: "STR", days: 96.2, target: 95 },
    { type: "CBWTR", days: 99.8, target: 98 },
    { type: "NTR", days: 94.5, target: 95 },
    { type: "CCR", days: 100.0, target: 98 },
  ];

  const avgDaysToFileData = [
    { type: "CTR", days: 1.8, benchmark: 3 },
    { type: "STR", days: 5.5, benchmark: 7 },
    { type: "CBWTR", days: 1.2, benchmark: 3 },
    { type: "NTR", days: 6.2, benchmark: 15 },
    { type: "CCR", days: 2.1, benchmark: 3 },
  ];

  const qualityScore = [
    { type: "CTR", score: 99, target: 98 },
    { type: "STR", score: 94, target: 92 },
    { type: "CBWTR", score: 98, target: 95 },
    { type: "NTR", score: 95, target: 90 },
    { type: "CCR", score: 99, target: 95 },
  ];

  // 5. STR Analysis
  const strActivity = [
    { activity: "Structuring", count: 45 },
    { activity: "Smurfing", count: 32 },
    { activity: "High Value Cash", count: 28 },
    { activity: "Terror Financing", count: 12 },
    { activity: "Tax Evasion", count: 18 },
    { activity: "Other", count: 45 },
  ];

  const strProduct = [
    { name: "Savings", size: 400, fill: "#f59e0b" },
    { name: "Current", size: 300, fill: "#fbbf24" },
    { name: "Loans", size: 300, fill: "#fcd34d" },
    { name: "Forex", size: 200, fill: "#fde68a" },
    { name: "Trade", size: 100, fill: "#fef3c7" },
  ];

  const strTypeData = [
    { name: "Initial", value: 155, color: "#f97316" },
    { name: "Continuing", value: 25, color: "#fdba74" }
  ];

  const recentSubmissions = [
    { id: "RPT-2025-0892", type: "CTR", subDate: "Jan 18, 2025", status: "Filed", records: 1250, amount: "4.2 Cr", analyst: "Priya S.", time: "1.5 days" },
    { id: "RPT-2025-0891", type: "STR", subDate: "Jan 18, 2025", status: "Pending L2", records: 1, amount: "-", analyst: "Rajesh K.", time: "4.0 days" },
    { id: "RPT-2025-0890", type: "CBWTR", subDate: "Jan 17, 2025", status: "Filed", records: 450, amount: "1.2 Cr", analyst: "Amit P.", time: "1.0 day" },
    { id: "RPT-2025-0889", type: "NTR", subDate: "Jan 17, 2025", status: "Rejected", records: 12, amount: "45 L", analyst: "Vikram S.", time: "2.5 days" },
    { id: "RPT-2025-0888", type: "CTR", subDate: "Jan 16, 2025", status: "Filed", records: 1100, amount: "3.8 Cr", analyst: "Priya S.", time: "1.8 days" },
  ];

  const { items: sortedSubmissions, requestSort: sortSubmissions, sortConfig: submissionsConfig } = useSortableData(recentSubmissions);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Regulatory Reporting Dashboard</h1>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1 hidden sm:block" />
            <Select defaultValue="all-regions">
               <SelectTrigger className="w-[180px] h-[46px] bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-lg hover:border-[#2A53A0] dark:hover:border-[#6b93e6] transition-all shadow-sm">
                  <SelectValue placeholder="Select Region" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="all-regions">All Regions</SelectItem>
                  <SelectItem value="north">North Zone</SelectItem>
                  <SelectItem value="south">South Zone</SelectItem>
                  <SelectItem value="east">East Zone</SelectItem>
                  <SelectItem value="west">West Zone</SelectItem>
               </SelectContent>
            </Select>
           <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1 hidden sm:block" />
           <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="hidden sm:inline">Updated: Just now</span>
              <motion.button whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-[#2A53A0] dark:text-[#6b93e6]">
                <RefreshCw className="size-4" />
              </motion.button>
           </div>
         </div>
         <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 h-[46px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-[#2A53A0] dark:hover:border-[#6b93e6] transition-all shadow-sm">
             <CalendarIcon className="size-4 text-[#2A53A0] dark:text-[#6b93e6]" />
             <span className="text-sm text-gray-700 dark:text-gray-300">Last 6 Months</span>
             <ChevronDown className="size-4 text-gray-500" />
           </button>
           <button className="flex items-center gap-2 px-4 h-[46px] bg-[#2A53A0] hover:bg-[#1e3a70] dark:bg-[#6b93e6] dark:hover:bg-[#5577cc] text-white rounded-lg transition-all shadow-sm">
             <span className="text-sm">Export</span>
             <Download className="size-4" />
           </button>
         </div>
      </div>

      {/* Row 1: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          const colorMap = {
            0: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400" },
            1: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400" },
            2: { bg: "bg-indigo-100 dark:bg-indigo-900/30", text: "text-indigo-600 dark:text-indigo-400" },
            3: { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-600 dark:text-orange-400" },
          } as Record<number, { bg: string, text: string }>;
          const colors = colorMap[kpi.colorIdx] || colorMap[0];
          return (
            <motion.div key={`kpi-${kpi.id}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Card className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm h-full flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                  <div className={`p-2 rounded-lg ${colors.bg}`}>
                    <Icon className={`size-4 ${colors.text}`} />
                  </div>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{kpi.value}</h3>
                    <p className="text-xs text-gray-500 font-medium truncate">{kpi.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                        <span className={cn("text-[10px] font-bold", kpi.trend === 'up' && kpi.colorIdx !== 3 ? 'text-green-600' : 'text-red-600')}>{kpi.change}</span>
                        {kpi.subValue && <span className="text-[9px] text-gray-400 truncate hidden xl:inline">{kpi.subValue.replace('vs last month', '')}</span>}
                    </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Row 2: Report Type Summaries */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
         {typeSummaries.map((type) => (
            <Card key={`summary-${type.label}`} className={`p-4 border-l-4 shadow-sm`} style={{ borderLeftColor: type.color === 'blue' ? '#3b82f6' : type.color === 'emerald' ? '#10b981' : type.color === 'amber' ? '#f59e0b' : type.color === 'violet' ? '#8b5cf6' : '#ec4899' }}>
               <div className="flex justify-between items-start">
                  <span className={cn("text-xs font-bold px-2 py-0.5 rounded border", 
                    type.color === 'blue' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                    type.color === 'emerald' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                    type.color === 'amber' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                    type.color === 'violet' ? 'bg-violet-50 text-violet-700 border-violet-100' :
                    'bg-pink-50 text-pink-700 border-pink-100'
                  )}>
                     {type.label}
                  </span>
                  <Badge variant="outline" className="text-[10px] h-5 border-gray-200 text-gray-500">{type.rate}</Badge>
               </div>
               <div className="mt-3 grid grid-cols-2 gap-2">
                  <div>
                     <span className="text-[10px] text-gray-500 block">Total (MTD)</span>
                     <span className="text-lg font-bold text-gray-900 dark:text-white">{type.total}</span>
                  </div>
                  <div className="text-right">
                      <span className="text-[10px] text-gray-500 block">Pending</span>
                      <span className="text-lg font-bold text-orange-600">{type.pending}</span>
                  </div>
               </div>
               <div className="w-full bg-gray-100 h-1 mt-2 rounded-full overflow-hidden">
                  <div className={cn("h-full", 
                    type.color === 'blue' ? 'bg-blue-500' :
                    type.color === 'emerald' ? 'bg-emerald-500' :
                    type.color === 'amber' ? 'bg-amber-500' :
                    type.color === 'violet' ? 'bg-violet-500' :
                    'bg-pink-500'
                  )} style={{ width: type.rate }}></div>
               </div>
            </Card>
         ))}
      </div>

      {/* Row 3: Trend & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="size-5 text-[#2A53A0] dark:text-[#6b93e6]" />
                        <h3 className="text-gray-900 dark:text-white font-semibold text-lg">Report Filing Trend</h3>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={280} id="filing-trend-container" key="filing-trend-container">
                    <AreaChart data={reportTrends} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} id="filing-trend-chart" key="filing-trend-chart">
                        <defs>
                            <linearGradient id="colorCTR" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorCBWTR" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} key="filing-trend-grid" />
                        <XAxis dataKey="month" tick={{fontSize: 11}} key="filing-trend-xaxis" />
                        <YAxis tick={{fontSize: 11}} key="filing-trend-yaxis" />
                        <Tooltip contentStyle={{borderRadius: '8px', fontSize: '12px'}} key="filing-trend-tooltip" />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} key="filing-trend-legend" />
                        <Area type="monotone" dataKey="CTR" stackId="1" stroke="#3b82f6" fill="url(#colorCTR)" key="area-ctr" />
                        <Area type="monotone" dataKey="CBWTR" stackId="1" stroke="#10b981" fill="url(#colorCBWTR)" key="area-cbwtr" />
                        <Area type="monotone" dataKey="STR" stackId="1" stroke="#f59e0b" fill="#f59e0b" key="area-str" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>

        <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <PieChartIcon className="size-5 text-[#2A53A0] dark:text-[#6b93e6]" />
                        <h3 className="text-gray-900 dark:text-white font-semibold text-lg">Report Distribution</h3>
                    </div>
                </div>
                <div className="relative h-[220px]">
                    <ResponsiveContainer width="100%" height="100%" id="dist-pie-container" key="dist-pie-container">
                        <PieChart id="dist-pie-chart" key="dist-pie-chart">
                            <Pie
                                data={reportDistribution}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                                id="report-dist-pie"
                                key="report-dist-pie"
                            >
                                {reportDistribution.map((entry) => (
                                    <Cell key={`dist-cell-${entry.name}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip key="dist-tooltip" />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                       <span className="text-3xl font-bold text-gray-900 dark:text-white">57K</span>
                       <span className="text-xs text-gray-500">Total</span>
                    </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    {reportDistribution.map((item) => (
                        <div key={`dist-legend-${item.name}`} className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-gray-600 dark:text-gray-300">{item.name}</span>
                            </div>
                            <span className="font-medium">{item.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
      </div>

      {/* Row 4: Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
         <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Clock className="size-5 text-[#2A53A0] dark:text-[#6b93e6]" />
                    <h3 className="text-gray-900 dark:text-white font-semibold text-lg">Filing Timeliness</h3>
                </div>
                <div className="space-y-4">
                    {filingTimeliness.map((item) => (
                        <div key={`timeliness-${item.type}`}>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="font-medium text-gray-700 dark:text-gray-300">{item.type}</span>
                                <span className={item.days >= item.target ? "text-green-600" : "text-red-600"}>{item.days}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                                <div className={cn("h-1.5 rounded-full", item.days >= item.target ? "bg-emerald-500" : "bg-red-500")} style={{ width: `${item.days}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
         </Card>

         <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <CalendarIcon className="size-5 text-[#2A53A0] dark:text-[#6b93e6]" />
                    <h3 className="text-gray-900 dark:text-white font-semibold text-lg">Avg Days to File</h3>
                </div>
                <ResponsiveContainer width="100%" height={200} id="avg-days-container" key="avg-days-container">
                    <BarChart data={avgDaysToFileData} id="avg-days-chart" key="avg-days-chart">
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} key="avg-days-grid" />
                        <XAxis dataKey="type" tick={{fontSize: 10}} key="avg-days-xaxis" />
                        <YAxis tick={{fontSize: 10}} key="avg-days-yaxis" />
                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{fontSize: '11px'}} key="avg-days-tooltip" />
                        <Bar dataKey="days" fill="#10b981" radius={[4,4,0,0]} barSize={20} id="bar-days" key="bar-days">
                            {avgDaysToFileData.map((entry) => (
                                <Cell key={`bar-cell-${entry.type}`} fill={entry.days > entry.benchmark ? "#ef4444" : "#10b981"} />
                            ))}
                        </Bar>
                        <Line type="monotone" dataKey="benchmark" stroke="#f59e0b" strokeWidth={2} dot={false} key="line-benchmark" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
         </Card>

         <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Target className="size-5 text-[#2A53A0] dark:text-[#6b93e6]" />
                    <h3 className="text-gray-900 dark:text-white font-semibold text-lg">Quality Score</h3>
                </div>
                <div className="space-y-4">
                    {qualityScore.map((item) => (
                        <div key={`quality-${item.type}`}>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="font-medium text-gray-700 dark:text-gray-300">{item.type}</span>
                                <span className="text-gray-500">{item.score}/100</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5 relative">
                                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${item.score}%` }}></div>
                                <div className="absolute top-[-2px] w-0.5 h-2.5 bg-black" style={{ left: `${item.target}%` }}></div>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-end text-[10px] text-gray-400 gap-2">
                        <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Score</span>
                        <span className="flex items-center gap-1"><div className="w-0.5 h-2 bg-black"></div> Target</span>
                    </div>
                </div>
            </div>
         </Card>
      </div>

      {/* Row 5: STR Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
         <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
             <div className="p-6">
                 <div className="flex items-center gap-2 mb-6">
                     <Activity className="size-5 text-[#2A53A0] dark:text-[#6b93e6]" />
                     <h3 className="text-gray-900 dark:text-white font-semibold text-lg">STR Activity</h3>
                 </div>
                 <ResponsiveContainer width="100%" height={200} id="str-activity-container" key="str-activity-container">
                     <BarChart data={strActivity} layout="vertical" id="str-activity-chart" key="str-activity-chart">
                         <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.3} key="str-activity-grid" />
                         <XAxis type="number" hide key="str-activity-xaxis" />
                         <YAxis dataKey="activity" type="category" width={110} tick={{fontSize: 10}} key="str-activity-yaxis" />
                         <Tooltip cursor={{fill: 'transparent'}} key="str-activity-tooltip" />
                         <Bar dataKey="count" fill="#f97316" radius={[0,4,4,0]} barSize={16} key="bar-activity" />
                     </BarChart>
                 </ResponsiveContainer>
             </div>
         </Card>

         <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
             <div className="p-6">
                 <div className="flex items-center gap-2 mb-6">
                     <Banknote className="size-5 text-[#2A53A0] dark:text-[#6b93e6]" />
                     <h3 className="text-gray-900 dark:text-white font-semibold text-lg">STR by Product</h3>
                 </div>
                 <ResponsiveContainer width="100%" height={200} id="str-product-container" key="str-product-container">
                     <Treemap data={strProduct} dataKey="size" aspectRatio={4/3} stroke="#fff" fill="#f59e0b" content={<CustomTreemapContent />} key="str-product-treemap" />
                 </ResponsiveContainer>
             </div>
         </Card>

         <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
             <div className="p-6">
                 <div className="flex items-center gap-2 mb-6">
                     <RefreshCw className="size-5 text-[#2A53A0] dark:text-[#6b93e6]" />
                     <h3 className="text-gray-900 dark:text-white font-semibold text-lg">Initial vs Continuing</h3>
                 </div>
                 <div className="flex items-center justify-center h-[200px]">
                     <ResponsiveContainer width="100%" height="100%" id="str-type-container" key="str-type-container">
                         <PieChart id="str-type-chart" key="str-type-chart">
                             <Pie data={strTypeData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" id="str-type-pie" key="str-type-pie">
                                 {strTypeData.map((entry) => (
                                     <Cell key={`str-type-cell-${entry.name}`} fill={entry.color} />
                                 ))}
                             </Pie>
                             <Tooltip key="str-type-tooltip" />
                         </PieChart>
                     </ResponsiveContainer>
                 </div>
             </div>
         </Card>
      </div>

      {/* Recent Submissions Table */}
      <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
         <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
               <ListChecks className="size-5 text-[#2A53A0] dark:text-[#6b93e6]" />
               <h3 className="text-gray-900 dark:text-white font-semibold text-lg">Recent Submissions</h3>
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
               <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 font-medium">
                  <tr>
                     <th className="p-4"><SortableHeader column="id" label="Report ID" sortConfig={submissionsConfig} onSort={sortSubmissions} /></th>
                     <th className="p-4"><SortableHeader column="type" label="Type" sortConfig={submissionsConfig} onSort={sortSubmissions} /></th>
                     <th className="p-4"><SortableHeader column="subDate" label="Submission Date" sortConfig={submissionsConfig} onSort={sortSubmissions} /></th>
                     <th className="p-4"><SortableHeader column="status" label="Status" sortConfig={submissionsConfig} onSort={sortSubmissions} /></th>
                     <th className="p-4"><SortableHeader column="records" label="Records" sortConfig={submissionsConfig} onSort={sortSubmissions} /></th>
                     <th className="p-4"><SortableHeader column="analyst" label="Analyst" sortConfig={submissionsConfig} onSort={sortSubmissions} /></th>
                     <th className="p-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {sortedSubmissions.map((sub) => (
                     <tr key={`sub-${sub.id}`} className="hover:bg-gray-50/80 transition-colors">
                        <td className="p-4 font-medium text-blue-600 dark:text-blue-400">{sub.id}</td>
                        <td className="p-4"><Badge variant="secondary" className="bg-gray-100 text-gray-700">{sub.type}</Badge></td>
                        <td className="p-4 text-gray-600 dark:text-gray-400">{sub.subDate}</td>
                        <td className="p-4">
                           <Badge className={cn(
                              sub.status === 'Filed' ? 'bg-green-100 text-green-700' :
                              sub.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                           )}>{sub.status}</Badge>
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-400">{sub.records}</td>
                        <td className="p-4 text-gray-600 dark:text-gray-400">{sub.analyst}</td>
                        <td className="p-4 text-right">
                           <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreHorizontal className="size-4" /></Button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </Card>
    </motion.div>
  );
}
