import { motion } from "motion/react";
import {
  Shield,
  Search,
  AlertTriangle,
  UserCheck,
  Globe,
  Filter,
  Download,
  Calendar,
  ChevronDown,
  RefreshCw as Renew,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  Activity,
  Ban,
  FileText,
  AlertOctagon,
  CheckCircle2,
  Users
} from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import {
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
  AreaChart,
  Area,
  LineChart,
  Line,
  Legend
} from "recharts";
import { useState, Fragment } from "react";
import { useSortableData } from "../../hooks/use-sortable-data";
import { SortableHeader } from "../ui/sortable-header";

interface BreadcrumbItem {
  label: string;
  path?: string;
  isActive?: boolean;
}

interface ScreeningDashboardProps {
  breadcrumbs?: BreadcrumbItem[];
  onBreadcrumbNavigate?: (path: string) => void;
}

export function ScreeningDashboard({ breadcrumbs, onBreadcrumbNavigate }: ScreeningDashboardProps) {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  
  // 1. KPI Data
  const kpiStats = [
    {
      id: "total-screening-alerts",
      title: "Total Screening Alerts (Today)",
      value: "1,456",
      subtext: "+67 vs yesterday",
      change: "+6.4%",
      trend: "up",
      icon: Search,
      color: "blue"
    },
    {
      id: "pending-screening-alerts",
      title: "Pending Screening Alerts",
      value: "342",
      subtext: "Avg age: 2.3 days",
      change: "23 Critical",
      trend: "down",
      icon: Clock,
      color: "orange"
    },
    {
      id: "true-match-rate",
      title: "True Match Rate",
      value: "12.5%",
      subtext: "152 confirmed matches",
      change: "+2.1%",
      trend: "up",
      icon: CheckCircle2,
      color: "green"
    },
    {
      id: "false-positive-rate",
      title: "False Positive Rate",
      value: "87.5%",
      subtext: "Target: 85%",
      change: "-3.2%",
      trend: "down",
      icon: XCircle,
      color: "gray"
    },
    {
      id: "blocked-accounts",
      title: "Blocked/Frozen Accounts",
      value: "47",
      subtext: "Total value: ₹234 Cr",
      change: "+2 today",
      trend: "up",
      icon: Ban,
      color: "red"
    }
  ];

  // 2. Screening Volume Trend
  const screeningTrend = [
    { day: "Jan 27", realTime: 2400, batch: 4000 },
    { day: "Jan 28", realTime: 2800, batch: 3800 },
    { day: "Jan 29", realTime: 2600, batch: 4200 },
    { day: "Jan 30", realTime: 3000, batch: 4100 },
    { day: "Jan 31", realTime: 3200, batch: 4300 },
    { day: "Feb 1", realTime: 2100, batch: 2000 },
    { day: "Feb 2", realTime: 1800, batch: 1500 }
  ];

  // 3. Alerts by List Type
  const alertsByList = [
    { name: "OFAC SDN", value: 35, color: "#ef4444" },
    { name: "UN Sanctions", value: 25, color: "#f97316" },
    { name: "EU Sanctions", value: 20, color: "#eab308" },
    { name: "PEP Lists", value: 15, color: "#8b5cf6" },
    { name: "Adverse Media", value: 5, color: "#3b82f6" }
  ];

  // 4. Alerts by Match Type
  const alertsByMatch = [
    { name: "Name", value: 850 },
    { name: "Address", value: 420 },
    { name: "ID Number", value: 310 },
    { name: "DOB", value: 210 },
    { name: "Passport", value: 150 },
    { name: "Other", value: 90 }
  ];

  // 5. Screening Alert Aging
  const alertAging = [
    { range: "0-2 days", open: 140, review: 50, escalated: 10 },
    { range: "3-5 days", open: 80, review: 60, escalated: 15 },
    { range: "6-10 days", open: 40, review: 30, escalated: 20 },
    { range: "11-15 days", open: 20, review: 20, escalated: 10 },
    { range: "15+ days", open: 10, review: 10, escalated: 5 }
  ];

  // 6. True Matches by List
  const trueMatchesByList = [
    { name: "OFAC SDN", value: 85 },
    { name: "UK Sanctions", value: 65 },
    { name: "EU Sanctions", value: 45 },
    { name: "PEP - Foreign", value: 75 },
    { name: "PEP - Domestic", value: 55 },
    { name: "Adverse Media", value: 35 }
  ];

  // 7. Trend Lines
  const sanctionsTrend = [
    { day: "Jan 27", value: 12 }, { day: "Jan 28", value: 15 }, { day: "Jan 29", value: 10 }, 
    { day: "Jan 30", value: 18 }, { day: "Jan 31", value: 14 }, { day: "Feb 1", value: 16 }, { day: "Feb 2", value: 13 }
  ];
  const pepTrend = [
    { day: "Jan 27", value: 20 }, { day: "Jan 28", value: 25 }, { day: "Jan 29", value: 22 }, 
    { day: "Jan 30", value: 28 }, { day: "Jan 31", value: 25 }, { day: "Feb 1", value: 26 }, { day: "Feb 2", value: 24 }
  ];
  const mediaTrend = [
    { day: "Jan 27", value: 8 }, { day: "Jan 28", value: 11 }, { day: "Jan 29", value: 9 }, 
    { day: "Jan 30", value: 13 }, { day: "Jan 31", value: 10 }, { day: "Feb 1", value: 12 }, { day: "Feb 2", value: 11 }
  ];

  // 8. Alert Disposition
  const disposition = [
    { name: "Total Alerts", value: 43587, full: 100, color: "#3b82f6" },
    { name: "Reviewed", value: 42234, full: 96.9, color: "#8b5cf6" },
    { name: "True Match", value: 5434, full: 12.5, color: "#f97316" },
    { name: "Action Taken", value: 313, full: 0.7, color: "#10b981" }
  ];

  // 9. Match Score Distribution
  const matchScoreDist = [
    { range: "80-85%", count: 200 },
    { range: "85-90%", count: 450 },
    { range: "90-95%", count: 750 },
    { range: "95-100%", count: 1400 }
  ];

  // 10. Avg Screening Resolution Time
  const resolutionTime = 8.5;

  // 11. Screening by Entity Type
  const entityType = [
    { name: "Individual", value: 65, color: "#3b82f6" },
    { name: "Entity", value: 25, color: "#8b5cf6" },
    { name: "Vessel", value: 7, color: "#f97316" },
    { name: "Aircraft", value: 3, color: "#10b981" }
  ];

  // 12. Geographic Distribution
  const geoDist = [
    { country: "Pakistan", value: 254 },
    { country: "Iran", value: 149 },
    { country: "North Korea", value: 158 },
    { country: "Syria", value: 134 },
    { country: "Russia", value: 112 },
    { country: "Venezuela", value: 96 },
    { country: "Afghanistan", value: 82 },
    { country: "Myanmar", value: 78 },
    { country: "Others", value: 345 }
  ];

  // 13. List Update Recency
  const listRecency = [
    { name: "OFAC SDN", updated: "1 day ago", status: "success" },
    { name: "UN Sanctions", updated: "2 days ago", status: "success" },
    { name: "EU Sanctions", updated: "2 days ago", status: "success" },
    { name: "UK HMT", updated: "5 days ago", status: "warning" },
    { name: "DFAT Australia", updated: "7 days ago", status: "warning" },
    { name: "PEP Database", updated: "1 day ago", status: "success" }
  ];

  // 16. Escalated Matches Table
  const escalatedMatches = [
    { id: "C0012345", name: "Mohammed Ali Khan", list: "OFAC SDN", match: "98%", days: 8, severity: "Critical" },
    { id: "C0023456", name: "Viktor Petrov", list: "EU Sanctions", match: "95%", days: 5, severity: "Critical" },
    { id: "C0034567", name: "Ahmed Abdullah", list: "UN Sanctions", match: "88%", days: 12, severity: "High" },
    { id: "C0045678", name: "Li Wei Chen", list: "PEP - Foreign", match: "87%", days: 6, severity: "High" },
    { id: "C0056789", name: "Ivan Sokolov", list: "Adverse Media", match: "85%", days: 9, severity: "High" }
  ];

  const { items: sortedMatches, requestSort: sortMatches, sortConfig: matchesConfig } = useSortableData(escalatedMatches);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4 pb-8"
    >
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Screening Dashboard</h1>
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 hidden sm:block" />
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

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 h-[40px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-[#2A53A0] dark:hover:border-[#6b93e6] transition-all shadow-sm">
            <Calendar className="size-4 text-gray-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">{dateRange}</span>
            <ChevronDown className="size-3 text-gray-400" />
          </button>
          <button className="flex items-center gap-2 px-3 h-[40px] bg-[#2A53A0] text-white rounded-lg hover:bg-[#1e3a70] dark:bg-[#6b93e6] dark:hover:bg-[#5577cc] transition-all shadow-sm">
            <Download className="size-4" />
            <span className="text-sm">Export</span>
          </button>
        </div>
      </div>

      {/* Row 1: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiStats.map((stat, index) => (
          <Card key={`kpi-${stat.id}`} className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm text-gray-500 font-medium">{stat.title}</div>
              <div className={`p-1.5 rounded-full ${
                stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                stat.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                stat.color === 'green' ? 'bg-green-50 text-green-600' :
                stat.color === 'red' ? 'bg-red-50 text-red-600' :
                'bg-gray-50 text-gray-600'
              }`}>
                <stat.icon className="size-4" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
              <div className="flex items-center justify-between text-xs">
                 <span className="text-gray-400">{stat.subtext}</span>
                 <span className={`font-medium ${stat.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>{stat.change}</span>
              </div>
            </div>
            <div className={`absolute bottom-0 left-0 h-1 transition-all duration-500 w-0 group-hover:w-full ${
               stat.color === 'blue' ? 'bg-blue-500' :
               stat.color === 'orange' ? 'bg-orange-500' :
               stat.color === 'green' ? 'bg-green-500' :
               stat.color === 'red' ? 'bg-red-500' :
               'bg-gray-500'
            }`} />
          </Card>
        ))}
      </div>

      {/* 2. Screening Volume Trend */}
      <Card className="p-4 border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-2">
              <Activity className="size-5 text-[#2A53A0]" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Screening Volume Trend</h3>
           </div>
        </div>
        <div className="h-[250px]">
           <ResponsiveContainer width="100%" height="100%" id="screening-trend-container" key="screening-trend-container">
              <AreaChart data={screeningTrend} id="screening-trend-chart" key="screening-trend-chart">
                 <defs>
                    <linearGradient id="colorReal" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                       <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorBatch" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                       <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} key="grid" />
                 <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} key="xaxis" />
                 <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} key="yaxis" />
                 <Tooltip contentStyle={{ borderRadius: "8px" }} key="tooltip" />
                 <Legend iconType="circle" key="legend" />
                 <Area type="monotone" dataKey="realTime" name="Real-Time Screening" stroke="#3b82f6" fill="url(#colorReal)" key="area-real" />
                 <Area type="monotone" dataKey="batch" name="Batch Screening" stroke="#8b5cf6" fill="url(#colorBatch)" key="area-batch" />
              </AreaChart>
           </ResponsiveContainer>
        </div>
      </Card>

      {/* Row 2: Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
         <Card className="p-4 border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Alerts by List Type</h3>
            <div className="flex items-center gap-4">
               <div className="h-[180px] w-1/2">
                  <ResponsiveContainer width="100%" height="100%" id="alerts-list-container" key="alerts-list-container">
                     <PieChart id="alerts-list-chart" key="alerts-list-chart">
                        <Pie data={alertsByList} innerRadius={40} outerRadius={60} paddingAngle={2} dataKey="value" id="pie" key="pie">
                           {alertsByList.map((entry) => <Cell key={`cell-${entry.name}`} fill={entry.color} />)}
                        </Pie>
                        <Tooltip key="tooltip" />
                     </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="w-1/2 space-y-2 text-xs">
                  {alertsByList.map((item) => (
                     <div key={`legend-${item.name}`} className="flex items-center gap-2">
                        <div className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                     </div>
                  ))}
               </div>
            </div>
         </Card>

         <Card className="p-4 border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Alerts by Match Type</h3>
            <div className="h-[180px]">
               <ResponsiveContainer width="100%" height="100%" id="match-type-container" key="match-type-container">
                  <BarChart data={alertsByMatch} id="match-type-chart" key="match-type-chart">
                     <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} key="grid" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} interval={0} key="xaxis" />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} width={30} key="yaxis" />
                     <Tooltip cursor={{ fill: '#f3f4f6' }} key="tooltip" />
                     <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} key="bar" />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </Card>

         <Card className="p-4 border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Screening Alert Aging</h3>
            <div className="h-[180px]">
               <ResponsiveContainer width="100%" height="100%" id="aging-container" key="aging-container">
                  <BarChart data={alertAging} id="aging-chart" key="aging-chart">
                     <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} key="grid" />
                     <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} key="xaxis" />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} width={30} key="yaxis" />
                     <Tooltip cursor={{ fill: '#f3f4f6' }} key="tooltip" />
                     <Legend wrapperStyle={{ fontSize: '10px' }} key="legend" />
                     <Bar dataKey="open" name="Open" stackId="a" fill="#94a3b8" key="bar-open" />
                     <Bar dataKey="review" name="In Review" stackId="a" fill="#eab308" key="bar-review" />
                     <Bar dataKey="escalated" name="Escalated" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} key="bar-escalated" />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </Card>
      </div>

      {/* Row 3: Hit Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         <Card className="p-4 border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">True Matches by List</h3>
            <div className="h-[150px]">
               <ResponsiveContainer width="100%" height="100%" id="true-matches-container" key="true-matches-container">
                  <BarChart data={trueMatchesByList} layout="vertical" margin={{ left: 20 }} id="true-matches-chart" key="true-matches-chart">
                     <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.1} key="grid" />
                     <XAxis type="number" hide key="xaxis" />
                     <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} key="yaxis" />
                     <Tooltip key="tooltip" />
                     <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} barSize={15} key="bar" />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </Card>
         
         <Card className="p-4 border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">Sanctions Hit Trend</h3>
            <div className="h-[150px]">
               <ResponsiveContainer width="100%" height="100%" id="sanc-trend-container" key="sanc-trend-container">
                  <LineChart data={sanctionsTrend} id="sanc-trend-chart" key="sanc-trend-chart">
                     <CartesianGrid strokeDasharray="3 3" opacity={0.1} key="grid" />
                     <XAxis dataKey="day" tick={{ fontSize: 9 }} hide key="xaxis" />
                     <Tooltip key="tooltip" />
                     <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} dot={false} key="line" />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </Card>

         <Card className="p-4 border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">PEP Hit Trend</h3>
            <div className="h-[150px]">
               <ResponsiveContainer width="100%" height="100%" id="pep-trend-container" key="pep-trend-container">
                  <LineChart data={pepTrend} id="pep-trend-chart" key="pep-trend-chart">
                     <CartesianGrid strokeDasharray="3 3" opacity={0.1} key="grid" />
                     <XAxis dataKey="day" tick={{ fontSize: 9 }} hide key="xaxis" />
                     <Tooltip key="tooltip" />
                     <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} dot={false} key="line" />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </Card>

         <Card className="p-4 border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">Adverse Media Hit Trend</h3>
            <div className="h-[150px]">
               <ResponsiveContainer width="100%" height="100%" id="media-trend-container" key="media-trend-container">
                  <LineChart data={mediaTrend} id="media-trend-chart" key="media-trend-chart">
                     <CartesianGrid strokeDasharray="3 3" opacity={0.1} key="grid" />
                     <XAxis dataKey="day" tick={{ fontSize: 9 }} hide key="xaxis" />
                     <Tooltip key="tooltip" />
                     <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2} dot={false} key="line" />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </Card>
      </div>

      {/* Row 4: Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
         {/* Alert Disposition */}
         <Card className="p-4 border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">Alert Disposition Breakdown</h3>
            <div className="space-y-4">
               {disposition.map((item) => (
                  <div key={`dispo-${item.name}`} className="space-y-1">
                     <div className="flex justify-between items-center text-xs">
                        <span className="font-medium">{item.name}</span>
                        <span>{item.full}%</span>
                     </div>
                     <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${item.full}%`, backgroundColor: item.color }} />
                     </div>
                     <div className="text-[10px] text-gray-500 text-right">{item.value.toLocaleString()}</div>
                  </div>
               ))}
               <div className="pt-2 text-xs text-gray-500 text-center border-t border-gray-100">
                  Conversion Rate: 0.72%
               </div>
            </div>
         </Card>

         {/* Match Score Distribution */}
         <Card className="p-4 border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">Match Score Distribution</h3>
            <div className="h-[180px]">
               <ResponsiveContainer width="100%" height="100%" id="score-dist-container" key="score-dist-container">
                  <BarChart data={matchScoreDist} id="score-dist-chart" key="score-dist-chart">
                     <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} key="grid" />
                     <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fontSize: 9 }} key="xaxis" />
                     <Tooltip cursor={{ fill: '#f3f4f6' }} key="tooltip" />
                     <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} key="bar" />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </Card>

         {/* Avg Screening Resolution Time */}
         <Card className="p-4 border-gray-200 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center">
            <h3 className="font-semibold text-gray-900 mb-6 text-sm w-full text-left">Avg Screening Resolution Time</h3>
            <div className="relative size-32">
               <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                  <path className="text-gray-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className="text-emerald-500" strokeDasharray={`${(resolutionTime / 12) * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
               </svg>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="text-2xl font-bold text-gray-900">{resolutionTime}</span>
                  <span className="text-xs text-gray-500 block">hours</span>
               </div>
            </div>
            <div className="text-center mt-4 text-xs text-gray-500">
               SLA Target: 12 hours<br/><span className="text-green-600 font-medium">✓ Within SLA</span>
            </div>
         </Card>

         {/* Screening by Entity Type */}
         <Card className="p-4 border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">Screening by Entity Type</h3>
            <div className="h-[150px] flex justify-center">
               <ResponsiveContainer width="100%" height="100%" id="entity-pie-container" key="entity-pie-container">
                  <PieChart id="entity-pie-chart" key="entity-pie-chart">
                     <Pie data={entityType} innerRadius={40} outerRadius={60} paddingAngle={2} dataKey="value" id="pie" key="pie">
                        {entityType.map((entry) => <Cell key={`cell-${entry.name}`} fill={entry.color} />)}
                     </Pie>
                     <Tooltip key="tooltip" />
                  </PieChart>
               </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
               {entityType.map((item) => (
                  <div key={`legend-${item.name}`} className="flex items-center gap-1 text-[10px]">
                     <div className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                     <span className="text-gray-600">{item.name}</span>
                  </div>
               ))}
            </div>
         </Card>
      </div>

      {/* Row 5: Geography & Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
         {/* Geographic Distribution */}
         <Card className="p-4 border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
               <h3 className="font-semibold text-gray-900">Geographic Distribution of Hits</h3>
               <Globe className="size-4 text-gray-400" />
            </div>
            <div className="space-y-3">
               {geoDist.map((item, i) => (
                  <div key={`geo-${item.country}`} className="space-y-1">
                     <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-gray-700">{item.country}</span>
                        <span className="text-gray-500">{item.value}</span>
                     </div>
                     <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                           className={`h-full rounded-full ${i < 3 ? 'bg-red-500' : i < 6 ? 'bg-orange-500' : 'bg-yellow-500'}`} 
                           style={{ width: `${Math.min((item.value / 300) * 100, 100)}%` }} 
                        />
                     </div>
                  </div>
               ))}
               <div className="flex gap-4 mt-2 text-[10px] text-gray-500">
                  <span className="flex items-center gap-1"><div className="size-1.5 rounded-full bg-red-500"/> Critical</span>
                  <span className="flex items-center gap-1"><div className="size-1.5 rounded-full bg-orange-500"/> High</span>
                  <span className="flex items-center gap-1"><div className="size-1.5 rounded-full bg-yellow-500"/> Medium</span>
               </div>
            </div>
         </Card>

         {/* List Update Recency */}
         <div className="space-y-6">
            <Card className="p-4 border-gray-200 dark:border-gray-800 shadow-sm">
               <h3 className="font-semibold text-gray-900 mb-4">List Update Recency</h3>
               <div className="space-y-3">
                  {listRecency.map((item) => (
                     <div key={`list-${item.name}`} className={`p-3 rounded-lg border flex items-center justify-between ${
                        item.status === 'success' ? 'bg-green-50 border-green-100' : 'bg-orange-50 border-orange-100'
                     }`}>
                        <div className="flex items-center gap-3">
                           <div className={`size-2 rounded-full ${item.status === 'success' ? 'bg-green-500' : 'bg-orange-500'}`} />
                           <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">Updated {item.updated}</span>
                     </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>

      {/* Row 6: Escalated Matches Table */}
      <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
         <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
               <AlertOctagon className="size-5 text-[#2A53A0]" />
               <h3 className="font-semibold text-gray-900">High Risk Escalated Matches</h3>
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
               <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 font-medium uppercase tracking-wider">
                  <tr>
                     <th className="p-4"><SortableHeader column="id" label="Customer ID" sortConfig={matchesConfig} onSort={sortMatches} /></th>
                     <th className="p-4"><SortableHeader column="name" label="Customer Name" sortConfig={matchesConfig} onSort={sortMatches} /></th>
                     <th className="p-4"><SortableHeader column="list" label="Source List" sortConfig={matchesConfig} onSort={sortMatches} /></th>
                     <th className="p-4"><SortableHeader column="match" label="Match Score" sortConfig={matchesConfig} onSort={sortMatches} /></th>
                     <th className="p-4"><SortableHeader column="days" label="Days Open" sortConfig={matchesConfig} onSort={sortMatches} /></th>
                     <th className="p-4"><SortableHeader column="severity" label="Severity" sortConfig={matchesConfig} onSort={sortMatches} /></th>
                     <th className="p-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {sortedMatches.map((match) => (
                     <tr key={`match-${match.id}`} className="hover:bg-gray-50/80 transition-colors">
                        <td className="p-4 font-mono font-bold text-blue-600">{match.id}</td>
                        <td className="p-4 font-medium text-gray-900 dark:text-white">{match.name}</td>
                        <td className="p-4">{match.list}</td>
                        <td className="p-4 font-bold">{match.match}</td>
                        <td className="p-4">{match.days} days</td>
                        <td className="p-4">
                           <Badge variant="outline" className={cn("font-bold px-2 py-0.5", getSeverityColor(match.severity))}>
                              {match.severity}
                           </Badge>
                        </td>
                        <td className="p-4 text-right">
                           <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                              <MoreVertical className="size-4 text-gray-400" />
                           </button>
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
