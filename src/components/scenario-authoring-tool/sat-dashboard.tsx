import { motion } from "motion/react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import {
  MoreHorizontal,
  ArrowUpRight,
  Clock,
  AlertCircle,
  CheckCircle2,
  FileText,
  Users,
  ShieldAlert,
  Activity
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

// --- Mock Data ---

// Dashlet 1: Scenario Repository Status
const scenarioStatusData = [
  { name: "Draft", value: 45, color: "#94a3b8" }, // Slate 400
  { name: "Pending Approval", value: 12, color: "#fbbf24" }, // Amber 400
  { name: "Approved", value: 89, color: "#4ade80" }, // Green 400
  { name: "Rejected/Disabled", value: 8, color: "#f87171" }, // Red 400
];

// Dashlet 2: My Action Items (Pending Approvals)
const actionItems = [
  { id: 1, name: "High Value Txn > 50k", creator: "John Doe", date: "2024-03-20", priority: "High" },
  { id: 2, name: "Multiple Login Failures", creator: "Jane Smith", date: "2024-03-21", priority: "Medium" },
  { id: 3, name: "Cross-border Transfer", creator: "Mike Brown", date: "2024-03-22", priority: "Critical" },
  { id: 4, name: "Dormant Account Activity", creator: "Sarah Wilson", date: "2024-03-23", priority: "High" },
  { id: 5, name: "Velocity Check - 1h", creator: "Alex Jones", date: "2024-03-23", priority: "Low" },
];

// Dashlet 3: Draft Aging
const draftAgingData = [
  { bucket: "< 7 Days", count: 18, fill: "#4ade80" },
  { bucket: "7-30 Days", count: 12, fill: "#fbbf24" },
  { bucket: "> 30 Days", count: 5, fill: "#f87171" },
];

// Dashlet 4: Event Ingestion Velocity
const eventVelocityData = [
  { time: "09:00", financial: 1200, nonFinancial: 800 },
  { time: "10:00", financial: 1500, nonFinancial: 900 },
  { time: "11:00", financial: 1800, nonFinancial: 1100 },
  { time: "12:00", financial: 1400, nonFinancial: 1000 },
  { time: "13:00", financial: 1600, nonFinancial: 1200 },
  { time: "14:00", financial: 2100, nonFinancial: 1500 },
  { time: "15:00", financial: 1900, nonFinancial: 1400 },
];

// Dashlet 5: Scenario Hit Rate (Top 5)
const hitRateData = [
  { name: "Rule A", triggers: 223, total: 1000, rate: 22.3 },
  { name: "Rule B", triggers: 180, total: 1000, rate: 18.0 },
  { name: "Rule C", triggers: 150, total: 1000, rate: 15.0 },
  { name: "Rule D", triggers: 85, total: 1000, rate: 8.5 },
  { name: "Rule E", triggers: 42, total: 1000, rate: 4.2 },
];

// Dashlet 6: User Role & Access Distribution
const userRoleData = [
  { role: "Read Access", active: 45, inactive: 5 },
  { role: "Maker", active: 20, inactive: 2 },
  { role: "Checker", active: 8, inactive: 1 },
];

export function SATDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Dashlet 1: Scenario Repository Status */}
        <Card className="col-span-1 md:col-span-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <FileText className="size-4 text-blue-600" />
              Scenario Repository Status
            </CardTitle>
            <CardDescription>Distinct Scenario IDs by State</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={scenarioStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {scenarioStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} cursor="pointer" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Dashlet 2: My Action Items */}
        <Card className="col-span-1 md:col-span-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <CheckCircle2 className="size-4 text-blue-600" />
                My Action Items (Pending Approvals)
              </CardTitle>
              <Button variant="outline" size="sm" className="h-8">View All</Button>
            </div>
            <CardDescription>Immediate actions required for Checkers</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scenario Name</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {actionItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.creator}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary" 
                        className={`
                          ${item.priority === 'Critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : ''}
                          ${item.priority === 'High' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : ''}
                          ${item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : ''}
                          ${item.priority === 'Low' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : ''}
                        `}
                      >
                        {item.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" className="bg-[#2A53A0] hover:bg-[#1e3a70]">Review</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Dashlet 3: Draft Aging */}
        <Card className="col-span-1 md:col-span-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Clock className="size-4 text-blue-600" />
              Draft Aging
            </CardTitle>
            <CardDescription>Brainstorming tracker for stale drafts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={draftAgingData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="bucket" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {draftAgingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Dashlet 4: Event Ingestion Velocity */}
        <Card className="col-span-1 md:col-span-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Activity className="size-4 text-blue-600" />
              Event Ingestion Velocity
            </CardTitle>
            <CardDescription>Volume of incoming traffic over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={eventVelocityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorFinancial" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2A53A0" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2A53A0" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorNonFinancial" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Area 
                    type="monotone" 
                    dataKey="financial" 
                    name="Financial Events" 
                    stroke="#2A53A0" 
                    fillOpacity={1} 
                    fill="url(#colorFinancial)" 
                    strokeWidth={2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="nonFinancial" 
                    name="Non-Financial Events" 
                    stroke="#10b981" 
                    fillOpacity={1} 
                    fill="url(#colorNonFinancial)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Dashlet 5: Scenario Hit Rate */}
        <Card className="col-span-1 md:col-span-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <ShieldAlert className="size-4 text-blue-600" />
              Scenario "Hit Rate"
            </CardTitle>
            <CardDescription>Performance metrics: Triggers vs Total Events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  layout="vertical" 
                  data={hitRateData} 
                  margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                  <XAxis type="number" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={80} axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                            <p className="font-semibold mb-1">{data.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Triggers: {data.triggers}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Hit Rate: {data.rate}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="triggers" fill="#2A53A0" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Dashlet 6: User Role & Access Distribution */}
        <Card className="col-span-1 md:col-span-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Users className="size-4 text-blue-600" />
              User Role & Access Distribution
            </CardTitle>
            <CardDescription>Segregation of Duties (SoD) Monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userRoleData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="role" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Bar dataKey="active" name="Active" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} barSize={40} />
                  <Bar dataKey="inactive" name="Inactive" stackId="a" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
