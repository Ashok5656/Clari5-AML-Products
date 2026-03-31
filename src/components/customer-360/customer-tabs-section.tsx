import { 
  ShieldAlert, 
  FileCheck, 
  Bell, 
  CreditCard, 
  Network, 
  Scan, 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  History, 
  Scale, 
  ArrowRight, 
  ArrowRightLeft, 
  PieChart, 
  Mail, 
  FileWarning, 
  CheckCircle2, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Printer, 
  RotateCw, 
  ExternalLink,
  Ban,
  Clock,
  Globe,
  Users,
  User as UserIcon,
  Briefcase,
  ScrollText,
  AlertOctagon,
  BarChart3,
  Search,
  ChevronRight,
  Wallet,
  Layers
} from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Switch } from "../ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { SortableHeader } from "../ui/sortable-header";

interface CustomerTabsSectionProps {
  selectedCustomer: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  TABS: any[];
  isDetailsExpanded: boolean;
  getRiskBadgeColor: (level: string, solid?: boolean) => string;
  cardClass: string;
  cardHeaderClass: string;
  cardTitleClass: string;
  labelClass: string;
  valueClass: string;
  itemClass: string;
  sortedUbo: any[];
  sortUbo: (col: string) => void;
  uboSortConfig: any;
  sortedFamily: any[];
  sortFamily: (col: string) => void;
  familySortConfig: any;
  sortedAssociates: any[];
  sortAssociates: (col: string) => void;
  associatesSortConfig: any;
  sortedJointHolders: any[];
  sortJointHolders: (col: string) => void;
  jointHoldersSortConfig: any;
  sortedPoa: any[];
  sortPoa: (col: string) => void;
  poaSortConfig: any;
  showLinkAnalysis: boolean;
  setShowLinkAnalysis: (show: boolean) => void;
  renderRiskFlags: (data: any) => JSX.Element | JSX.Element[];
}

export const CustomerTabsSection = ({
  selectedCustomer,
  activeTab,
  setActiveTab,
  TABS,
  isDetailsExpanded,
  getRiskBadgeColor,
  cardClass,
  cardHeaderClass,
  cardTitleClass,
  labelClass,
  valueClass,
  itemClass,
  sortedUbo,
  sortUbo,
  uboSortConfig,
  sortedFamily,
  sortFamily,
  familySortConfig,
  sortedAssociates,
  sortAssociates,
  associatesSortConfig,
  sortedJointHolders,
  sortJointHolders,
  jointHoldersSortConfig,
  sortedPoa,
  sortPoa,
  poaSortConfig,
  showLinkAnalysis,
  setShowLinkAnalysis,
  renderRiskFlags
}: CustomerTabsSectionProps) => {
  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-0 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-4 sticky top-0 z-10 shadow-sm">
           <ScrollArea className="w-full whitespace-nowrap">
              <TabsList className="bg-transparent h-11 p-0 w-full justify-start gap-6">
                 {TABS.map((tab) => (
                    <TabsTrigger 
                       key={tab.id} 
                       value={tab.id}
                       className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#2A53A0] data-[state=active]:border-b-2 data-[state=active]:border-t-0 data-[state=active]:border-x-0 data-[state=active]:border-[#2A53A0] rounded-none h-11 px-2 text-sm font-medium text-gray-600 border-b-2 border-t-0 border-x-0 border-transparent transition-all hover:text-[#2A53A0] hover:bg-gray-50 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none flex items-center gap-1.5"
                    >
                       {tab.icon && <tab.icon className="size-3.5 opacity-70" />}
                       {tab.label}
                    </TabsTrigger>
                 ))}
              </TabsList>
              <ScrollBar orientation="horizontal" className="invisible" />
           </ScrollArea>
        </div>

        <div className="px-4 pb-4 pt-2 bg-white">
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-0 animate-in fade-in-50 duration-300">
             <div className="space-y-4">
                {/* Top Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                   <Card className={cn(cardClass, "cursor-pointer hover:shadow-md transition-all")} onClick={() => setActiveTab("risk")}>
                      <CardContent className="p-4 flex items-center justify-between">
                         <div>
                            <p className="text-xs font-medium text-gray-500">Risk Profile</p>
                            <h3 className="text-xl font-bold text-gray-900 mt-1">{selectedCustomer.riskScore}</h3>
                            <p className="text-xs text-red-600 font-medium mt-1">Score: {selectedCustomer.riskLevel}/100</p>
                         </div>
                         <div className="p-2 bg-red-100 rounded-full text-red-600">
                            <ShieldAlert className="size-5" />
                         </div>
                      </CardContent>
                   </Card>

                   <Card className={cn(cardClass, "cursor-pointer hover:shadow-md transition-all")} onClick={() => setActiveTab("kyc")}>
                      <CardContent className="p-4 flex items-center justify-between">
                         <div>
                            <p className="text-xs font-medium text-gray-500">KYC Status</p>
                            <h3 className="text-xl font-bold text-gray-900 mt-1">{selectedCustomer.kycStatus}</h3>
                            <p className="text-xs text-gray-500 mt-1">Review: {selectedCustomer.kycProfile.nextReviewDate}</p>
                         </div>
                         <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                            <FileCheck className="size-5" />
                         </div>
                      </CardContent>
                   </Card>

                   <Card className={cn(cardClass, "cursor-pointer hover:shadow-md transition-all")} onClick={() => setActiveTab("alerts")}>
                      <CardContent className="p-4 flex items-center justify-between">
                         <div>
                            <p className="text-xs font-medium text-gray-500">Active Alerts</p>
                            <h3 className="text-xl font-bold text-gray-900 mt-1">{selectedCustomer.alertsProfile.active.filter((a: any) => a.status === 'Open').length}</h3>
                            <p className="text-xs text-orange-600 font-medium mt-1">Action Required</p>
                         </div>
                         <div className="p-2 bg-orange-100 rounded-full text-orange-600">
                            <Bell className="size-5" />
                         </div>
                      </CardContent>
                   </Card>

                   <Card className={cn(cardClass, "cursor-pointer hover:shadow-md transition-all")} onClick={() => setActiveTab("accounts")}>
                      <CardContent className="p-4 flex items-center justify-between">
                         <div>
                            <p className="text-xs font-medium text-gray-500">Total Accounts</p>
                            <h3 className="text-xl font-bold text-gray-900 mt-1">{selectedCustomer.accountsProfile.summary.length}</h3>
                            <p className="text-xs text-green-600 font-medium mt-1">Active</p>
                         </div>
                         <div className="p-2 bg-green-100 rounded-full text-green-600">
                            <CreditCard className="size-5" />
                         </div>
                      </CardContent>
                   </Card>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Relationships Snapshot */}
                     <Card className={cn(cardClass, "cursor-pointer hover:shadow-md transition-all")} onClick={() => setActiveTab("relationships")}>
                        <CardHeader className={cardHeaderClass}>
                           <CardTitle className={cardTitleClass}><Network className="size-3.5" /> Key Relationships</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                           <div className="divide-y divide-gray-100">
                              {selectedCustomer.relationships.ubo.slice(0, 3).map((rel: any) => (
                                 <div key={rel.name} className="p-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                       <Avatar className="h-6 w-6"><AvatarFallback className="text-[9px] bg-blue-50 text-blue-700">{rel.name.split(' ').map((n:string)=>n[0]).join('')}</AvatarFallback></Avatar>
                                       <div className="flex flex-col">
                                          <span className="text-xs font-bold text-gray-700">{rel.name}</span>
                                          <span className="text-[10px] text-gray-500">{rel.designation || rel.relation}</span>
                                       </div>
                                    </div>
                                    <Badge variant="outline" className="text-[9px] h-5">{rel.ownership != null ? `${rel.ownership}% Own` : rel.share || '—'}</Badge>
                                 </div>
                              ))}
                           </div>
                        </CardContent>
                     </Card>

                    {/* Screening Snapshot */}
                    <Card className={cn(cardClass, "cursor-pointer hover:shadow-md transition-all")} onClick={() => setActiveTab("screening")}>
                        <CardHeader className={cardHeaderClass}>
                           <CardTitle className={cardTitleClass}><Scan className="size-3.5" /> Screening Matches</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                           {selectedCustomer.screening.sanctions.length > 0 ? (
                              <div className="divide-y divide-gray-100">
                                 {selectedCustomer.screening.sanctions.slice(0, 3).map((match: any, idx: number) => (
                                    <div key={idx} className="p-3 flex items-center justify-between">
                                       <div className="flex flex-col">
                                          <span className="text-xs font-bold text-gray-700">{match.name}</span>
                                          <span className="text-[10px] text-gray-500">{match.list}</span>
                                       </div>
                                       <Badge className="bg-red-50 text-red-700 border-red-100 text-[9px] h-5">{match.score}%</Badge>
                                    </div>
                                 ))}
                              </div>
                           ) : (
                              <div className="p-6 text-center text-xs text-gray-500">
                                 No active screening matches found.
                              </div>
                           )}
                        </CardContent>
                    </Card>
                 </div>

                 {/* Transaction & Alerts Summary Section */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                     <Card className={cn(cardClass)}>
                         <div className="flex-none">
                            <CardHeader className={cardHeaderClass}>
                                <CardTitle className={cardTitleClass}><Activity className="size-3.5" /> Transaction Metrics</CardTitle>
                                <Button variant="link" className="h-auto p-0 text-xs text-blue-600 flex items-center gap-1" onClick={() => setActiveTab("transactions")}>
                                    <BarChart3 className="size-3" /> View Graph
                                </Button>
                            </CardHeader>
                            <CardContent className="p-4 space-y-5">
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div className="bg-gray-50 p-2 rounded border border-gray-100">
                                        <div className="text-[10px] text-gray-500 font-bold">Avg Daily</div>
                                        <div className="font-bold text-sm text-gray-900 mt-1">{selectedCustomer.transactionsProfile.summary.daily.volume} / {selectedCustomer.transactionsProfile.summary.daily.value}</div>
                                    </div>
                                    <div className="bg-gray-50 p-2 rounded border border-gray-100">
                                        <div className="text-[10px] text-gray-500 font-bold">Avg Monthly</div>
                                        <div className="font-bold text-sm text-gray-900 mt-1">{selectedCustomer.transactionsProfile.summary.monthly.volume} / {selectedCustomer.transactionsProfile.summary.monthly.value}</div>
                                    </div>
                                    <div className="bg-gray-50 p-2 rounded border border-gray-100">
                                        <div className="text-[10px] text-gray-500 font-bold">Total YTD</div>
                                        <div className="font-bold text-sm text-gray-900 mt-1">{selectedCustomer.transactionsProfile.summary.ytd.volume} / {selectedCustomer.transactionsProfile.summary.ytd.value}</div>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between text-xs text-gray-600">
                                            <span>Cash vs Non-Cash</span>
                                            <span className="font-medium text-gray-900">{selectedCustomer.transactionsProfile.summary.breakdown.cash}% / {selectedCustomer.transactionsProfile.summary.breakdown.nonCash}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden flex">
                                            <div style={{ width: `${selectedCustomer.transactionsProfile.summary.breakdown.cash}%` }} className="h-full bg-blue-500"></div>
                                            <div style={{ width: `${selectedCustomer.transactionsProfile.summary.breakdown.nonCash}%` }} className="h-full bg-indigo-500"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between text-xs text-gray-600">
                                            <span>Domestic vs Cross Border</span>
                                            <span className="font-medium text-gray-900">{selectedCustomer.transactionsProfile.summary.breakdown.domestic}% / {selectedCustomer.transactionsProfile.summary.breakdown.crossBorder}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden flex">
                                            <div style={{ width: `${selectedCustomer.transactionsProfile.summary.breakdown.domestic}%` }} className="h-full bg-emerald-500"></div>
                                            <div style={{ width: `${selectedCustomer.transactionsProfile.summary.breakdown.crossBorder}%` }} className="h-full bg-amber-500"></div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                         </div>
                         
                         <Tabs defaultValue="parties" className="flex-1 flex flex-col border-t border-gray-100">
                             <CardHeader className={cn(cardHeaderClass, "pb-0 border-b-0")}>
                                 <CardTitle className={cardTitleClass}><TrendingUp className="size-3.5" /> Top Activity</CardTitle>
                                 <TabsList className="h-6 p-0 bg-transparent gap-2">
                                     <TabsTrigger value="parties" className="h-6 px-2 text-[10px] data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 border border-transparent data-[state=active]:border-blue-200">Parties</TabsTrigger>
                                     <TabsTrigger value="regions" className="h-6 px-2 text-[10px] data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 border border-transparent data-[state=active]:border-blue-200">Regions</TabsTrigger>
                                     <TabsTrigger value="alerts" className="h-6 px-2 text-[10px] data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 border border-transparent data-[state=active]:border-blue-200">Alerts</TabsTrigger>
                                 </TabsList>
                             </CardHeader>
                             <div className="px-0 flex-1 overflow-hidden">
                                <div className="border-b border-gray-100 mx-4 mb-2"></div>
                                <TabsContent value="parties" className="mt-0 p-4 pt-0 space-y-2">
                                    {selectedCustomer.transactionsProfile.topCounterparties.map((item: any, i: number) => (
                                        <div key={i} className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600 truncate max-w-[150px]" title={item.name}>{item.name}</span>
                                            <span className="font-medium text-gray-900 bg-gray-50 px-1.5 py-0.5 rounded text-xs">{item.count} txns</span>
                                        </div>
                                    ))}
                                </TabsContent>
                                <TabsContent value="regions" className="mt-0 p-4 pt-0 space-y-2">
                                    {selectedCustomer.transactionsProfile.topCountries.map((item: any, i: number) => (
                                        <div key={i} className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600 flex items-center gap-2">
                                                <span className="text-xs bg-gray-100 w-5 h-3.5 flex items-center justify-center rounded-[1px]">{item.code}</span>
                                                {item.name}
                                            </span>
                                            <span className="font-medium text-gray-900 bg-gray-50 px-1.5 py-0.5 rounded text-xs">{item.count} txns</span>
                                        </div>
                                    ))}
                                </TabsContent>
                                <TabsContent value="alerts" className="mt-0 p-4 pt-0 space-y-2">
                                    {selectedCustomer.transactionsProfile.topAlerts.map((item: any, i: number) => (
                                        <div key={i} className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600 truncate max-w-[150px]" title={item.name}>{item.name}</span>
                                            <span className="font-medium text-gray-900 bg-gray-50 px-1.5 py-0.5 rounded text-xs">{item.count} hits</span>
                                        </div>
                                    ))}
                                </TabsContent>
                             </div>
                         </Tabs>
                     </Card>

                     {/* 3. Patterns & Risks */}
                     <Card className={cn(cardClass, "md:col-span-2")}>
                        <CardHeader className={cardHeaderClass}>
                            <CardTitle className={cardTitleClass}><AlertTriangle className="size-3.5" /> Unusual Patterns</CardTitle>
                            <Button variant="link" className="h-auto p-0 text-xs text-blue-600 flex items-center gap-1" onClick={() => setActiveTab("alerts")}>
                                <Bell className="size-3" /> View Alerts
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-gray-50">
                                {selectedCustomer.transactionsProfile.unusualPatterns.map((item: any, i: number) => (
                                    <div key={i} className="p-2 px-3 flex items-start gap-2 hover:bg-gray-50 transition-colors">
                                        <div className={cn("mt-0.5 size-1.5 rounded-full shrink-0", item.triggered ? "bg-red-500" : "bg-green-500")}></div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-medium text-gray-700 leading-tight">{item.name}</div>
                                            {item.triggered && (
                                                <div className="mt-1 flex items-center justify-between">
                                                    <Badge variant="outline" className="text-[9px] h-4 px-1 bg-red-50 text-red-700 border-red-100">Triggered</Badge>
                                                    <Button variant="link" className="h-auto p-0 text-[10px] text-blue-600 flex items-center gap-0.5" onClick={() => setActiveTab("alerts")}>
                                                        View Alert <ExternalLink className="size-2" />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                
                                <div className="p-3 bg-orange-50/50 mt-1">
                                    <div className="flex justify-between items-start">
                                        <div className="text-xs font-medium text-gray-900">High Risk Corridor?</div>
                                        <Badge variant="outline" className={cn("h-4 text-[10px] px-1.5", selectedCustomer.transactionsProfile.highRiskCorridors.detected ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200")}>
                                            {selectedCustomer.transactionsProfile.highRiskCorridors.detected ? "YES" : "NO"}
                                        </Badge>
                                    </div>
                                    {selectedCustomer.transactionsProfile.highRiskCorridors.detected && (
                                       <div className="mt-1">
                                           <p className="text-[10px] text-gray-600 mb-1">{selectedCustomer.transactionsProfile.highRiskCorridors.details}</p>
                                           <div className="flex gap-1 flex-wrap">
                                               {selectedCustomer.transactionsProfile.highRiskCorridors.corridors.map((c: string) => (
                                                   <Badge key={c} variant="outline" className="bg-white text-[9px] h-3.5 px-1 border-orange-200 text-orange-800">{c}</Badge>
                                               ))}
                                           </div>
                                       </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                     </Card>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <Card className={cn(cardClass, "md:col-span-2 cursor-pointer hover:shadow-md transition-all")} onClick={() => setActiveTab("audit")}>
                      <CardHeader className={cardHeaderClass}>
                         <CardTitle className={cardTitleClass}><History className="size-3.5" /> Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                         <div className="divide-y divide-gray-100">
                            {selectedCustomer.audit.slice(0, 3).map((log: any) => (
                               <div key={log.id} className="p-3 flex items-center justify-between hover:bg-gray-50">
                                  <div className="flex items-center gap-3">
                                     <div className="p-1.5 rounded-full bg-gray-100 text-gray-600">
                                        {log.category === 'Risk' ? <ShieldAlert className="size-3.5" /> : 
                                         log.category === 'KYC' ? <FileCheck className="size-3.5" /> :
                                         log.category === 'Screening' ? <Scan className="size-3.5" /> :
                                         <Activity className="size-3.5" />}
                                     </div>
                                     <div>
                                        <p className="text-sm font-normal text-gray-700">{log.action}</p>
                                        <p className="text-xs text-gray-500">{log.details}</p>
                                     </div>
                                  </div>
                                  <div className="text-right">
                                     <p className="text-xs font-normal text-gray-900">{log.date.split(' ').slice(0,3).join(' ')}</p>
                                     <p className="text-[10px] text-gray-400">{log.user}</p>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </CardContent>
                   </Card>

                   <Card className={cn(cardClass, "cursor-pointer hover:shadow-md transition-all")} onClick={() => setActiveTab("reports")}>
                      <CardHeader className={cardHeaderClass}>
                         <CardTitle className={cardTitleClass}><Scale className="size-3.5" /> Regulatory Status</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 space-y-4">
                         <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">STR Filed</span>
                            {selectedCustomer.regReportsProfile.strFiled.isFiled ? 
                               <Badge className="h-5 text-[10px] bg-green-50 text-green-700 border-green-200">Yes</Badge> : 
                               <Badge className="h-5 text-[10px] bg-red-50 text-red-700 border-red-200">No</Badge>}
                         </div>
                         <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">CTR Filed</span>
                            {selectedCustomer.regReportsProfile.ctrFiled.isFiled ? 
                               <Badge className="h-5 text-[10px] bg-green-50 text-green-700 border-green-200">Yes</Badge> : 
                               <Badge className="h-5 text-[10px] bg-red-50 text-red-700 border-red-200">No</Badge>}
                         </div>
                         <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">Acc Frozen</span>
                            {selectedCustomer.regReportsProfile.accountFrozen.isFrozen ? 
                               <Badge className="h-5 text-[10px] bg-green-50 text-green-700 border-green-200">Yes</Badge> : 
                               <Badge className="h-5 text-[10px] bg-red-50 text-red-700 border-red-200">No</Badge>}
                         </div>
                      </CardContent>
                   </Card>
                </div>
             </div>
          </TabsContent>

          <TabsContent value="relationships" className="mt-0 animate-in fade-in-50 duration-300">
             <div className="space-y-3">
                <Card className={cardClass}>
                   <CardHeader className={cardHeaderClass}>
                      <CardTitle className={cardTitleClass}><Network className="size-3.5" /> UBO Details</CardTitle>
                      <Button 
                         variant={showLinkAnalysis ? "secondary" : "outline"}
                         size="sm" 
                         className="h-6 text-[10px] gap-1"
                         onClick={() => setShowLinkAnalysis(!showLinkAnalysis)}
                      >
                         <Activity className="size-3" /> {showLinkAnalysis ? "Hide Analysis" : "Graphical Link Analysis"}
                      </Button>
                   </CardHeader>
                   <CardContent className="p-3">
                      <div className="flex flex-col lg:flex-row gap-3">
                         <div className={cn("transition-all duration-300", showLinkAnalysis ? "w-full lg:w-1/2" : "w-full")}>
                            <Table>
                               <TableHeader>
                                  <TableRow className="bg-gray-50/50">
                                     <TableHead className="h-9 text-xs font-bold uppercase"><SortableHeader column="name" label="Name" sortConfig={uboSortConfig} onSort={sortUbo} /></TableHead>
                                     <TableHead className="h-9 text-xs font-bold uppercase"><SortableHeader column="designation" label="Designation" sortConfig={uboSortConfig} onSort={sortUbo} /></TableHead>
                                     <TableHead className="h-9 text-xs font-bold uppercase"><SortableHeader column="nationality" label="Nationality" sortConfig={uboSortConfig} onSort={sortUbo} /></TableHead>
                                     <TableHead className="h-9 text-xs font-bold uppercase"><SortableHeader column="din" label="DIN / ID" sortConfig={uboSortConfig} onSort={sortUbo} /></TableHead>
                                     <TableHead className="h-9 text-xs font-bold uppercase"><SortableHeader column="dob" label="Date of Birth" sortConfig={uboSortConfig} onSort={sortUbo} /></TableHead>
                                     <TableHead className="h-9 text-xs font-bold uppercase"><SortableHeader column="pan" label="PAN" sortConfig={uboSortConfig} onSort={sortUbo} /></TableHead>
                                     <TableHead className="h-9 text-xs font-bold uppercase"><SortableHeader column="pepStatus" label="PEP" sortConfig={uboSortConfig} onSort={sortUbo} /></TableHead>
                                     <TableHead className="h-9 text-xs font-bold uppercase"><SortableHeader column="sanctions" label="Sanctions" sortConfig={uboSortConfig} onSort={sortUbo} /></TableHead>
                                     <TableHead className="h-9 text-xs font-bold uppercase text-right"><SortableHeader column="ownership" label="Ownership %" sortConfig={uboSortConfig} onSort={sortUbo} /></TableHead>
                                  </TableRow>
                               </TableHeader>
                               <TableBody>
                                  {sortedUbo.map((ubo: any, i: number) => (
                                     <TableRow key={i}>
                                        <TableCell className="font-bold text-sm text-[#2A53A0] whitespace-nowrap">{ubo.name}</TableCell>
                                        <TableCell className="text-sm text-gray-600 whitespace-nowrap">{ubo.designation || '—'}</TableCell>
                                        <TableCell className="text-sm text-gray-600 whitespace-nowrap">{ubo.nationality || '—'}</TableCell>
                                        <TableCell className="text-sm text-gray-600 font-mono">{ubo.din || '—'}</TableCell>
                                        <TableCell className="text-sm text-gray-600 whitespace-nowrap">{ubo.dob || '—'}</TableCell>
                                        <TableCell className="text-sm text-gray-600 font-mono">{ubo.pan || '—'}</TableCell>
                                        <TableCell>
                                           <Badge variant="outline" className={cn("text-[10px] h-5", ubo.pepStatus === 'Not a PEP' || ubo.pepStatus === 'No' ? "bg-green-50 text-green-700 border-green-200" : ubo.pepStatus === '—' ? "bg-gray-50 text-gray-500 border-gray-200" : "bg-red-50 text-red-700 border-red-200")}>
                                              {ubo.pepStatus || '—'}
                                           </Badge>
                                        </TableCell>
                                        <TableCell>
                                           <Badge variant="outline" className={cn("text-[10px] h-5", ubo.sanctions === 'Clear' ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200")}>
                                              {ubo.sanctions || '—'}
                                           </Badge>
                                        </TableCell>
                                        <TableCell className="text-sm font-bold text-gray-900 text-right whitespace-nowrap">
                                           {ubo.ownership != null ? `${ubo.ownership}%` : '—'}
                                        </TableCell>
                                     </TableRow>
                                  ))}
                               </TableBody>
                            </Table>
                         </div>
                         {showLinkAnalysis && (
                            <div className="w-full lg:w-1/2 h-[300px] bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center animate-in zoom-in-95 duration-300">
                               <div className="text-center">
                                  <Network className="size-12 text-gray-300 mx-auto mb-2" />
                                  <p className="text-sm text-gray-500">Interactive Link Analysis View</p>
                                  <p className="text-[10px] text-gray-400">Showing connections for {selectedCustomer.name}</p>
                               </div>
                            </div>
                         )}
                      </div>
                   </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                   <Card className={cardClass}>
                      <CardHeader className={cardHeaderClass}>
                         <CardTitle className={cardTitleClass}><Users className="size-3.5" /> Family Members</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                         <Table>
                            <TableHeader>
                               <TableRow className="bg-gray-50/50">
                                  <TableHead className="h-9 text-xs font-bold"><SortableHeader column="name" label="Name" sortConfig={familySortConfig} onSort={sortFamily} /></TableHead>
                                  <TableHead className="h-9 text-xs font-bold"><SortableHeader column="relation" label="Relation" sortConfig={familySortConfig} onSort={sortFamily} /></TableHead>
                                  <TableHead className="h-9 text-xs font-bold"><SortableHeader column="kycStatus" label="KYC" sortConfig={familySortConfig} onSort={sortFamily} /></TableHead>
                               </TableRow>
                            </TableHeader>
                            <TableBody>
                               {sortedFamily.map((f: any, i: number) => (
                                  <TableRow key={i}>
                                     <TableCell className="font-normal text-sm text-gray-900">{f.name}</TableCell>
                                     <TableCell className="text-sm text-gray-600">{f.relation}</TableCell>
                                     <TableCell><Badge className="bg-green-100 text-green-700 text-[10px] h-4">{f.kycStatus}</Badge></TableCell>
                                  </TableRow>
                               ))}
                            </TableBody>
                         </Table>
                      </CardContent>
                   </Card>

                   <Card className={cardClass}>
                      <CardHeader className={cardHeaderClass}>
                         <CardTitle className={cardTitleClass}><Briefcase className="size-3.5" /> Business Associates</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                         <Table>
                            <TableHeader>
                               <TableRow className="bg-gray-50/50">
                                  <TableHead className="h-9 text-xs font-bold"><SortableHeader column="name" label="Name" sortConfig={associatesSortConfig} onSort={sortAssociates} /></TableHead>
                                  <TableHead className="h-9 text-xs font-bold"><SortableHeader column="relation" label="Relation" sortConfig={associatesSortConfig} onSort={sortAssociates} /></TableHead>
                                  <TableHead className="h-9 text-xs font-bold text-right"><SortableHeader column="risk" label="Risk" sortConfig={associatesSortConfig} onSort={sortAssociates} /></TableHead>
                               </TableRow>
                            </TableHeader>
                            <TableBody>
                               {sortedAssociates.map((a: any, i: number) => (
                                  <TableRow key={i}>
                                     <TableCell className="font-normal text-sm text-gray-900">{a.name}</TableCell>
                                     <TableCell className="text-sm text-gray-600">{a.relation}</TableCell>
                                     <TableCell className="text-right"><Badge variant="outline" className={cn("text-[10px] h-4", a.risk === 'High' ? "bg-red-50 text-red-700" : "bg-orange-50 text-orange-700")}>{a.risk}</Badge></TableCell>
                                  </TableRow>
                               ))}
                            </TableBody>
                         </Table>
                      </CardContent>
                   </Card>

                   <Card className={cardClass}>
                      <CardHeader className={cardHeaderClass}>
                         <CardTitle className={cardTitleClass}><Users className="size-3.5" /> Joint Account Holders</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                         <Table>
                            <TableHeader>
                               <TableRow className="bg-gray-50/50">
                                  <TableHead className="h-9 text-xs font-bold"><SortableHeader column="name" label="Name" sortConfig={jointHoldersSortConfig} onSort={sortJointHolders} /></TableHead>
                                  <TableHead className="h-9 text-xs font-bold"><SortableHeader column="account" label="Account" sortConfig={jointHoldersSortConfig} onSort={sortJointHolders} /></TableHead>
                                  <TableHead className="h-9 text-xs font-bold"><SortableHeader column="relation" label="Relation" sortConfig={jointHoldersSortConfig} onSort={sortJointHolders} /></TableHead>
                               </TableRow>
                            </TableHeader>
                            <TableBody>
                               {sortedJointHolders.map((jh: any, i: number) => (
                                  <TableRow key={i}>
                                     <TableCell className="font-normal text-sm text-[#2A53A0]">{jh.name}</TableCell>
                                     <TableCell className="text-sm font-mono text-gray-600">{jh.account}</TableCell>
                                     <TableCell className="text-sm text-gray-600">{jh.relation}</TableCell>
                                  </TableRow>
                               ))}
                            </TableBody>
                         </Table>
                      </CardContent>
                   </Card>

                   <Card className={cardClass}>
                      <CardHeader className={cardHeaderClass}>
                         <CardTitle className={cardTitleClass}><ScrollText className="size-3.5" /> Power of Attorney</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                         <Table>
                            <TableHeader>
                               <TableRow className="bg-gray-50/50">
                                  <TableHead className="h-9 text-xs font-bold"><SortableHeader column="name" label="Name" sortConfig={poaSortConfig} onSort={sortPoa} /></TableHead>
                                  <TableHead className="h-9 text-xs font-bold"><SortableHeader column="authorizedPerson" label="Auth Person" sortConfig={poaSortConfig} onSort={sortPoa} /></TableHead>
                                  <TableHead className="h-9 text-xs font-bold"><SortableHeader column="expiry" label="Expiry" sortConfig={poaSortConfig} onSort={sortPoa} /></TableHead>
                               </TableRow>
                            </TableHeader>
                            <TableBody>
                               {sortedPoa.map((p: any, i: number) => (
                                  <TableRow key={i}>
                                     <TableCell className="font-normal text-sm text-gray-900">{p.name}</TableCell>
                                     <TableCell className="text-sm text-gray-600">{p.authorizedPerson}</TableCell>
                                     <TableCell className="text-sm text-gray-600">{p.expiry}</TableCell>
                                  </TableRow>
                               ))}
                            </TableBody>
                         </Table>
                      </CardContent>
                   </Card>
                </div>

                <Card className={cn(cardClass, "border-l-4 border-l-red-500")}>
                   <CardHeader className={cardHeaderClass}>
                      <CardTitle className={cardTitleClass}><AlertTriangle className="size-3.5 text-red-600" /> PEP Match for Related Parties</CardTitle>
                   </CardHeader>
                   <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                         <div className="mt-1">
                            <Badge className="bg-red-100 text-red-700">PEP MATCH</Badge>
                         </div>
                         <div>
                            <p className="text-sm font-medium text-gray-900">Potential Match Detected</p>
                            <p className="text-xs text-gray-600 mt-1">{selectedCustomer.relationships.pep.details}</p>
                         </div>
                      </div>
                   </CardContent>
                </Card>
             </div>
          </TabsContent>

          {/* Screening Tab Content */}
          <TabsContent value="screening" className="mt-0 animate-in fade-in-50 duration-300">
              <div className="space-y-3">
                 <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-4">
                       <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-gray-500">Overall Status</span>
                          <Badge className={cn("mt-1", selectedCustomer.screening.overallStatus === 'Flagged' ? "bg-red-100 text-red-700 hover:bg-red-100" : "bg-green-100 text-green-700")}>
                             {selectedCustomer.screening.overallStatus}
                          </Badge>
                       </div>
                       <div className="h-8 w-px bg-gray-200"></div>
                       <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-gray-500">Last Screening</span>
                          <span className="text-xs font-bold text-gray-900">{selectedCustomer.screening.history[0].date}</span>
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 mr-4">
                           <span className="text-[10px] font-medium text-gray-600">Auto-refresh</span>
                           <Switch id="auto-refresh" defaultChecked className="h-4 w-7" />
                        </div>
                        <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                           <RotateCw className="size-3" /> Re-screen
                        </Button>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <Card className={cardClass}>
                       <CardHeader className={cardHeaderClass}>
                          <CardTitle className="text-sm font-semibold tracking-wider text-gray-700 flex items-center gap-1.5"><ShieldAlert className="size-3.5" /> Sanctions Screening</CardTitle>
                          <span className="text-xs text-gray-400">Hits from OFAC/EU/UN</span>
                       </CardHeader>
                       <CardContent className="p-0">
                          <Table>
                             <TableHeader><TableRow className="bg-gray-50/50"><TableHead className="h-9 text-xs font-bold">Name</TableHead><TableHead className="h-9 text-xs font-bold">Watchlist</TableHead><TableHead className="h-9 text-xs font-bold">Score</TableHead><TableHead className="h-9 text-xs"></TableHead></TableRow></TableHeader>
                             <TableBody>
                                {selectedCustomer.screening.sanctions.map((item: any, i: number) => (
                                   <TableRow key={i}>
                                      <TableCell className="text-sm font-medium text-gray-900">{item.name}</TableCell>
                                      <TableCell className="text-sm text-gray-600">{item.watchlist}</TableCell>
                                      <TableCell className="text-sm font-bold text-red-600">{item.percentage}%</TableCell>
                                      <TableCell className="text-right"><Button variant="ghost" size="sm" className="h-6 w-6 p-0"><ArrowRight className="size-3 text-gray-400" /></Button></TableCell>
                                   </TableRow>
                                ))}
                             </TableBody>
                          </Table>
                       </CardContent>
                    </Card>

                    <Card className={cardClass}>
                       <CardHeader className={cardHeaderClass}>
                          <CardTitle className={cardTitleClass}><UserIcon className="size-3.5" /> PEP Screening</CardTitle>
                          <Badge variant="outline" className="ml-auto text-[9px] bg-orange-50 text-orange-700 border-orange-200">{selectedCustomer.screening.pep.status}</Badge>
                       </CardHeader>
                       <CardContent className="p-0">
                          <Table>
                             <TableHeader><TableRow className="bg-gray-50/50"><TableHead className="h-9 text-xs font-bold">Name</TableHead><TableHead className="h-9 text-xs font-bold">Watchlist</TableHead><TableHead className="h-9 text-xs font-bold">Details</TableHead><TableHead className="h-9 text-xs"></TableHead></TableRow></TableHeader>
                             <TableBody>
                                {selectedCustomer.screening.pep.matches.map((item: any, i: number) => (
                                   <TableRow key={i}>
                                      <TableCell className="text-sm font-medium text-gray-900">{item.name}</TableCell>
                                      <TableCell className="text-sm text-gray-600">{item.watchlist}</TableCell>
                                      <TableCell className="text-sm text-gray-600 max-w-[150px] truncate" title={item.details}>{item.details}</TableCell>
                                      <TableCell className="text-right"><Button variant="ghost" size="sm" className="h-6 w-6 p-0"><ArrowRight className="size-3 text-gray-400" /></Button></TableCell>
                                   </TableRow>
                                ))}
                             </TableBody>
                          </Table>
                       </CardContent>
                    </Card>

                    <Card className={cardClass}>
                       <CardHeader className={cardHeaderClass}>
                          <CardTitle className={cardTitleClass}><Globe className="size-3.5" /> Adverse Media Matches</CardTitle>
                       </CardHeader>
                       <CardContent className="p-0">
                          <Table>
                             <TableHeader><TableRow className="bg-gray-50/50"><TableHead className="h-9 text-xs font-bold">Date</TableHead><TableHead className="h-9 text-xs font-bold">Source</TableHead><TableHead className="h-9 text-xs font-bold">Snippet</TableHead><TableHead className="h-9 text-xs"></TableHead></TableRow></TableHeader>
                             <TableBody>
                                {selectedCustomer.screening.adverseMedia.map((item: any, i: number) => (
                                   <TableRow key={i}>
                                      <TableCell className="text-xs text-gray-500">{item.date}</TableCell>
                                      <TableCell className="text-sm font-medium text-gray-900">{item.source}</TableCell>
                                      <TableCell className="text-xs text-gray-600 max-w-[200px] truncate" title={item.snippet}>{item.snippet}</TableCell>
                                      <TableCell className="text-right"><Button variant="ghost" size="sm" className="h-6 w-6 p-0"><ArrowRight className="size-3 text-gray-400" /></Button></TableCell>
                                   </TableRow>
                                ))}
                             </TableBody>
                          </Table>
                       </CardContent>
                    </Card>

                    <Card className={cardClass}>
                       <CardHeader className={cardHeaderClass}>
                          <CardTitle className={cardTitleClass}><AlertOctagon className="size-3.5" /> Watchlist Matches</CardTitle>
                       </CardHeader>
                       <CardContent className="p-0">
                          <Table>
                             <TableHeader><TableRow className="bg-gray-50/50"><TableHead className="h-9 text-xs font-bold">Watchlist</TableHead><TableHead className="h-9 text-xs font-bold">Resolution</TableHead><TableHead className="h-9 text-xs"></TableHead></TableRow></TableHeader>
                             <TableBody>
                                {selectedCustomer.screening.watchlistMatches.map((item: any, i: number) => (
                                   <TableRow key={i}>
                                      <TableCell className="text-sm font-medium text-gray-900">{item.watchlist}</TableCell>
                                      <TableCell className="text-xs text-red-600 font-bold">{item.resolution}</TableCell>
                                      <TableCell className="text-right"><Button variant="ghost" size="sm" className="h-6 w-6 p-0"><ArrowRight className="size-3 text-gray-400" /></Button></TableCell>
                                   </TableRow>
                                ))}
                             </TableBody>
                          </Table>
                       </CardContent>
                    </Card>
                 </div>

                 <Card className={cardClass}>
                    <CardHeader className={cardHeaderClass}>
                       <CardTitle className={cardTitleClass}><Clock className="size-3.5" /> Screening History</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                       <Table>
                          <TableHeader><TableRow className="bg-gray-50/50"><TableHead className="h-9 text-xs font-bold uppercase">Date</TableHead><TableHead className="h-9 text-xs font-bold uppercase">Lists Screened</TableHead><TableHead className="h-9 text-xs font-bold uppercase">Case ID</TableHead><TableHead className="h-9 text-xs"></TableHead></TableRow></TableHeader>
                          <TableBody>
                             {selectedCustomer.screening.history.map((h: any, i: number) => (
                                <TableRow key={i}>
                                   <TableCell className="py-2 text-sm text-gray-900">{h.date}</TableCell>
                                   <TableCell className="py-2 text-sm text-gray-600">{h.watchlists}</TableCell>
                                   <TableCell className="py-2 text-sm font-mono text-blue-600">{h.caseId}</TableCell>
                                   <TableCell className="py-2 text-right"><Button variant="link" size="sm" className="h-7 text-xs p-0">View Certificate</Button></TableCell>
                                </TableRow>
                             ))}
                          </TableBody>
                       </Table>
                    </CardContent>
                 </Card>
              </div>
          </TabsContent>

          {/* Risk Tab Content */}
          <TabsContent value="risk" className="mt-0 animate-in fade-in-50 duration-300">
              <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-4">
                          <TooltipProvider>
                              <Tooltip>
                                  <TooltipTrigger asChild>
                                      <div className="size-10 rounded-full border-4 border-red-500 border-t-transparent flex items-center justify-center cursor-help">
                                          <span className="text-xs font-bold text-gray-900">{selectedCustomer.riskProfile.overall.score}</span>
                                      </div>
                                  </TooltipTrigger>
                                  <TooltipContent side="right" className="bg-white p-0 border-gray-200 shadow-xl overflow-hidden min-w-[300px]">
                                      <div className="bg-gray-50 p-2 border-b border-gray-100 flex items-center gap-2">
                                          <ShieldAlert className="size-4 text-red-600" />
                                          <span className="text-xs font-bold text-gray-900 uppercase">Risk Factor Breakdown</span>
                                      </div>
                                      <ScrollArea className="h-full max-h-[300px]">
                                          <div className="p-3 space-y-4">
                                              {selectedCustomer.riskFactors && Object.entries({
                                                  kyc: "KYC Risk",
                                                  relatedParties: "Related Parties",
                                                  sanctionMatch: "Sanction Matches",
                                                  riskProfile: "Risk Profile",
                                                  cddEdd: "CDD / EDD",
                                                  account: "Account Status",
                                                  transactions: "Transactions & Alerts",
                                                  lea: "LEA Requests",
                                                  regulatory: "Regulatory Reports"
                                              }).map(([key, label]) => {
                                                  const items = selectedCustomer.riskFactors[key];
                                                  if (!items || items.length === 0) return null;
                                                  return (
                                                      <div key={`risk-category-${selectedCustomer.id}-${key}`} className="space-y-1.5">
                                                          <div className="text-[10px] font-bold text-gray-500 tracking-wider">{label}</div>
                                                          <div className="space-y-1">
                                                              {items.map((item: any, idx: number) => (
                                                                  <div key={`risk-factor-tab-${selectedCustomer.id}-${key}-${idx}`} className="flex items-start gap-2">
                                                                      <div className={cn("mt-1.5 size-1.5 rounded-full shrink-0", item.high ? "bg-red-600 shadow-sm shadow-red-200" : "bg-gray-200")} />
                                                                      <div className="flex-1 min-w-0">
                                                                          <span className={cn("text-xs leading-tight block", item.high ? "font-bold text-gray-900" : "text-gray-500")}>
                                                                              {item.label}
                                                                              {item.value && <span className="ml-1 opacity-75 font-normal">({item.value})</span>}
                                                                          </span>
                                                                      </div>
                                                                  </div>
                                                              ))}
                                                          </div>
                                                      </div>
                                                  );
                                              })}
                                          </div>
                                      </ScrollArea>
                                  </TooltipContent>
                              </Tooltip>
                          </TooltipProvider>
                          <div className="flex flex-col">
                              <span className="text-xs uppercase font-bold text-gray-500">Overall Risk Score</span>
                              <div className="flex items-center gap-2">
                                  <span className={cn("text-lg font-bold", selectedCustomer.riskProfile.overall.level === 'High' ? "text-red-700" : "text-gray-900")}>{selectedCustomer.riskProfile.overall.level} Risk</span>
                                  <Badge variant="outline" className="text-[10px] bg-gray-50 border-gray-200">KYC & TM Consolidated</Badge>
                              </div>
                              <Button variant="link" className="h-auto p-0 text-[10px] text-blue-600 justify-start">View Risk Break-up</Button>
                          </div>
                      </div>
                      
                      {selectedCustomer.riskProfile.overrides.length > 0 && (
                          <div className="flex items-start gap-3 bg-orange-50 px-3 py-2 rounded border border-orange-100 max-w-md">
                              <AlertTriangle className="size-4 text-orange-600 shrink-0 mt-0.5" />
                              <div className="flex flex-col">
                                  <span className="text-[10px] font-bold text-orange-800 uppercase">Manual Override Active</span>
                                  <p className="text-[10px] text-orange-700 line-clamp-2">{selectedCustomer.riskProfile.overrides[0].justification}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                      <span className="text-[9px] text-orange-600 font-medium">By: {selectedCustomer.riskProfile.overrides[0].user}</span>
                                      <span className="text-[9px] text-orange-600">|</span>
                                      <span className="text-[9px] text-orange-600">{selectedCustomer.riskProfile.overrides[0].date}</span>
                                  </div>
                              </div>
                          </div>
                      )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      <Card className={cardClass}>
                          <CardHeader className={cardHeaderClass}>
                              <CardTitle className={cardTitleClass}><Globe className="size-3.5" /> Geographic Risk</CardTitle>
                              <Badge className={cn("text-[9px] h-5", selectedCustomer.riskProfile.geographic.riskLevel === 'High' ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700")}>{selectedCustomer.riskProfile.geographic.riskLevel}</Badge>
                          </CardHeader>
                          <CardContent className="p-0">
                              <Table>
                                  <TableHeader><TableRow className="bg-gray-50/50"><TableHead className="h-9 text-xs font-medium uppercase">Scope</TableHead><TableHead className="h-9 text-xs font-medium uppercase">Country</TableHead><TableHead className="h-9 text-xs font-medium uppercase">Flags</TableHead></TableRow></TableHeader>
                                  <TableBody>
                                      <TableRow>
                                          <TableCell className="py-2 text-sm font-normal text-gray-600">Residence</TableCell>
                                          <TableCell className="py-2 text-sm text-gray-900">{selectedCustomer.riskProfile.geographic.residence.country}</TableCell>
                                          <TableCell className="py-2"><div className="flex gap-1">{renderRiskFlags(selectedCustomer.riskProfile.geographic.residence)}</div></TableCell>
                                      </TableRow>
                                      <TableRow>
                                          <TableCell className="py-2 text-sm font-normal text-gray-600">Citizenship</TableCell>
                                          <TableCell className="py-2 text-sm text-gray-900">{selectedCustomer.riskProfile.geographic.citizenship.country}</TableCell>
                                          <TableCell className="py-2"><div className="flex gap-1">{renderRiskFlags(selectedCustomer.riskProfile.geographic.citizenship)}</div></TableCell>
                                      </TableRow>
                                  </TableBody>
                              </Table>
                          </CardContent>
                      </Card>

                      <Card className={cardClass}>
                          <CardHeader className={cardHeaderClass}>
                              <CardTitle className={cardTitleClass}><ArrowRight className="size-3.5" /> High Risk Txn Countries</CardTitle>
                          </CardHeader>
                          <CardContent className="p-0">
                              <Table>
                                  <TableHeader><TableRow className="bg-gray-50/50"><TableHead className="h-9 text-xs font-medium uppercase">Country</TableHead><TableHead className="h-9 text-xs font-medium uppercase">Details</TableHead><TableHead className="h-9 text-xs font-medium uppercase">Flags</TableHead></TableRow></TableHeader>
                                  <TableBody>
                                      {selectedCustomer.riskProfile.highRiskTxnCountries.map((c: any, i: number) => (
                                          <TableRow key={i}>
                                              <TableCell className="py-2 text-sm font-normal text-gray-900">{c.country}</TableCell>
                                              <TableCell className="py-2 text-sm text-gray-600">{c.details}</TableCell>
                                              <TableCell className="py-2"><div className="flex gap-1">{renderRiskFlags(c)}</div></TableCell>
                                          </TableRow>
                                      ))}
                                  </TableBody>
                              </Table>
                          </CardContent>
                      </Card>

                      <Card className={cardClass}>
                          <CardHeader className={cardHeaderClass}>
                              <CardTitle className={cardTitleClass}><Activity className="size-3.5" /> Behavioral Risk</CardTitle>
                              <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold text-gray-900">{selectedCustomer.riskProfile.behavioral.score}</span>
                                  <Badge className="bg-red-100 text-red-700 text-[9px] h-5">{selectedCustomer.riskProfile.behavioral.level}</Badge>
                              </div>
                          </CardHeader>
                          <CardContent className="p-3">
                              <div className="space-y-2">
                                  {selectedCustomer.riskProfile.behavioral.alerts.map((alert: any, i: number) => (
                                      <div key={i} className="p-2 bg-red-50/50 rounded border border-red-100">
                                          <div className="flex justify-between items-start mb-1">
                                              <span className="text-xs font-bold text-red-900">{alert.name}</span>
                                              <Badge variant="outline" className="bg-white text-red-600 border-red-200 text-xs h-4">+{alert.deviation}%</Badge>
                                          </div>
                                          <p className="text-sm font-normal text-red-800/80 leading-tight">{alert.details}</p>
                                      </div>
                                  ))}
                              </div>
                          </CardContent>
                      </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      <Card className={cardClass}>
                          <CardHeader className={cardHeaderClass}>
                              <CardTitle className={cardTitleClass}><ShieldAlert className="size-3.5" /> Risk Factors</CardTitle>
                          </CardHeader>
                          <CardContent className="p-0">
                              <Table>
                                  <TableBody>
                                      <TableRow>
                                          <TableCell className="py-2 text-sm font-normal text-gray-600 w-1/3">Customer Type</TableCell>
                                          <TableCell className="py-2 text-sm font-bold text-gray-900">{selectedCustomer.riskProfile.customerTypeRisk.type}</TableCell>
                                          <TableCell className="py-2 text-right"><Badge variant="outline" className={cn("text-xs h-4", getRiskBadgeColor(selectedCustomer.riskProfile.customerTypeRisk.risk))}>{selectedCustomer.riskProfile.customerTypeRisk.risk}</Badge></TableCell>
                                      </TableRow>
                                      <TableRow>
                                          <TableCell className="py-2 text-sm font-normal text-gray-600">Occupation</TableCell>
                                          <TableCell className="py-2 text-sm font-bold text-gray-900">{selectedCustomer.riskProfile.occupationRisk.value}</TableCell>
                                          <TableCell className="py-2 text-right"><Badge variant="outline" className={cn("text-xs h-4", selectedCustomer.riskProfile.occupationRisk.isHighRisk === 'Y' ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200")}>{selectedCustomer.riskProfile.occupationRisk.isHighRisk === 'Y' ? 'High' : 'Low'}</Badge></TableCell>
                                      </TableRow>
                                      <TableRow>
                                          <TableCell className="py-2 text-sm font-normal text-gray-600">Industry / Segment</TableCell>
                                          <TableCell className="py-2 text-sm font-bold text-gray-900">{selectedCustomer.riskProfile.industryRisk.sector} <span className="font-normal text-gray-500">({selectedCustomer.riskProfile.industryRisk.details})</span></TableCell>
                                          <TableCell className="py-2 text-right"><Badge variant="outline" className={cn("text-xs h-4", selectedCustomer.riskProfile.industryRisk.isHighRisk === 'Y' ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200")}>{selectedCustomer.riskProfile.industryRisk.isHighRisk === 'Y' ? 'High' : 'Low'}</Badge></TableCell>
                                      </TableRow>
                                      <TableRow>
                                           <TableCell className="py-2 text-sm font-normal text-gray-600">Related Parties</TableCell>
                                           <TableCell className="py-2 text-sm font-bold text-gray-900">Consolidated Score</TableCell>
                                           <TableCell className="py-2 text-right"><Badge variant="outline" className={cn("text-xs h-4", getRiskBadgeColor(selectedCustomer.riskProfile.relatedPartiesRisk.level))}>{selectedCustomer.riskProfile.relatedPartiesRisk.level} ({selectedCustomer.riskProfile.relatedPartiesRisk.score})</Badge></TableCell>
                                      </TableRow>
                                  </TableBody>
                              </Table>
                          </CardContent>
                      </Card>

                      <Card className={cardClass}>
                          <CardHeader className={cardHeaderClass}>
                              <CardTitle className={cardTitleClass}><CreditCard className="size-3.5" /> Product & Channel Risk</CardTitle>
                          </CardHeader>
                          <CardContent className="p-0">
                              <Table>
                                  <TableHeader><TableRow className="bg-gray-50/50"><TableHead className="h-9 text-xs font-medium uppercase">Category</TableHead><TableHead className="h-9 text-xs font-medium uppercase">Name</TableHead><TableHead className="h-9 text-xs font-medium uppercase text-right">Risk</TableHead></TableRow></TableHeader>
                                  <TableBody>
                                      {selectedCustomer.riskProfile.productChannelRisk.map((item: any, i: number) => (
                                          <TableRow key={i}>
                                              <TableCell className="py-2 text-sm font-normal text-gray-600">{item.type}</TableCell>
                                              <TableCell className="py-2 text-sm font-normal text-gray-900">{item.name}</TableCell>
                                              <TableCell className="py-2 text-right"><Badge variant="outline" className={cn("text-xs h-4", getRiskBadgeColor(item.risk))}>{item.risk}</Badge></TableCell>
                                          </TableRow>
                                      ))}
                                  </TableBody>
                              </Table>
                          </CardContent>
                      </Card>
                  </div>

                  <Card className={cardClass}>
                      <CardHeader className={cardHeaderClass}>
                          <CardTitle className={cardTitleClass}><Clock className="size-3.5" /> Risk Rating History</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                          <Table>
                              <TableHeader><TableRow className="bg-gray-50/50"><TableHead className="h-9 text-xs font-bold uppercase">Date</TableHead><TableHead className="h-9 text-xs font-bold uppercase">Risk Level</TableHead><TableHead className="h-9 text-xs font-bold uppercase">Score</TableHead><TableHead className="h-9 text-xs font-bold uppercase">Reason</TableHead></TableRow></TableHeader>
                              <TableBody>
                                  {selectedCustomer.riskProfile.history.map((h: any, i: number) => (
                                      <TableRow key={i}>
                                          <TableCell className="py-2 text-sm text-gray-900">{h.date}</TableCell>
                                          <TableCell className="py-2"><Badge className={cn("text-xs h-4 w-16 justify-center", getRiskBadgeColor(h.level, true))}>{h.level}</Badge></TableCell>
                                          <TableCell className="py-2 text-sm font-mono text-gray-600">{h.score}</TableCell>
                                          <TableCell className="py-2 text-sm text-gray-600">{h.reason}</TableCell>
                                      </TableRow>
                                  ))}
                              </TableBody>
                          </Table>
                      </CardContent>
                  </Card>
              </div>
          </TabsContent>

          {/* KYC Tab Content */}
          <TabsContent value="kyc" className="mt-0 animate-in fade-in-50 duration-300">
              <div className="space-y-3">
                 <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
                     <div className="flex items-center gap-6">
                         <div className="flex flex-col gap-1">
                             <span className="text-xs font-bold uppercase text-gray-500">KYC Status</span>
                             <Badge className="bg-green-100 text-green-700 w-fit">{selectedCustomer.kycProfile.status}</Badge>
                         </div>
                         <div className="h-8 w-px bg-gray-200"></div>
                         <div className="flex flex-col gap-1">
                             <span className="text-xs font-bold uppercase text-gray-500">Last Review</span>
                             <span className="text-sm font-normal text-gray-900">{selectedCustomer.kycProfile.lastReviewDate}</span>
                         </div>
                         <div className="h-8 w-px bg-gray-200"></div>
                         <div className="flex flex-col gap-1">
                             <span className="text-xs font-bold uppercase text-gray-500">Next Due</span>
                             <span className="text-sm font-normal text-gray-900">{selectedCustomer.kycProfile.nextReviewDate}</span>
                         </div>
                     </div>
                     <Button size="sm" className="h-7 text-xs bg-[#2A53A0] hover:bg-[#1e3a70]">
                         <FileCheck className="size-3 mr-2" /> Start New Review
                     </Button>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                     <Card className={cardClass}>
                         <CardHeader className={cardHeaderClass}>
                             <CardTitle className={cardTitleClass}><FileText className="size-3.5" /> Documents Submitted</CardTitle>
                         </CardHeader>
                         <CardContent className="p-0">
                             <Table>
                                 <TableHeader><TableRow className="bg-gray-50/50"><TableHead className="h-9 text-xs font-bold uppercase">Type</TableHead><TableHead className="h-9 text-xs font-bold uppercase">ID No.</TableHead><TableHead className="h-9 text-xs font-bold uppercase text-right">Expiry</TableHead></TableRow></TableHeader>
                                 <TableBody>
                                     {selectedCustomer.kycProfile.documents.map((doc: any, i: number) => (
                                         <TableRow key={i}>
                                             <TableCell className="py-2 text-sm font-normal text-gray-900">{doc.type}</TableCell>
                                             <TableCell className="py-2 text-sm text-gray-600 font-mono">{doc.id}</TableCell>
                                             <TableCell className="py-2 text-sm text-gray-600 text-right">{doc.expiry || doc.date}</TableCell>
                                         </TableRow>
                                     ))}
                                 </TableBody>
                             </Table>
                         </CardContent>
                     </Card>

                     <Card className={cardClass}>
                         <CardHeader className={cardHeaderClass}>
                             <CardTitle className={cardTitleClass}><AlertTriangle className="size-3.5" /> CDD/EDD Triggers</CardTitle>
                         </CardHeader>
                         <CardContent className="p-3 space-y-2">
                             {selectedCustomer.kycProfile.triggers.map((trigger: any, i: number) => (
                                 <div key={i} className="bg-orange-50 border border-orange-100 p-2 rounded">
                                     <div className="flex justify-between items-start">
                                         <span className="text-sm font-bold text-orange-800">{trigger.type}</span>
                                         <span className="text-xs text-orange-600">{trigger.date}</span>
                                     </div>
                                     <p className="text-sm text-orange-700 mt-0.5">{trigger.detail}</p>
                                 </div>
                             ))}
                         </CardContent>
                     </Card>
                     
                     <Card className={cardClass}>
                         <CardHeader className={cardHeaderClass}>
                             <CardTitle className={cardTitleClass}><CreditCard className="size-3.5" /> New Products (6m)</CardTitle>
                         </CardHeader>
                         <CardContent className="p-0">
                             <Table>
                                 <TableHeader><TableRow className="bg-gray-50/50"><TableHead className="h-9 text-xs font-bold uppercase">Product</TableHead><TableHead className="h-9 text-xs font-bold uppercase text-right">Date Taken</TableHead></TableRow></TableHeader>
                                 <TableBody>
                                     {selectedCustomer.kycProfile.newProducts.map((p: any, i: number) => (
                                         <TableRow key={i}>
                                             <TableCell className="py-2 text-sm font-normal text-gray-900">{p.name}</TableCell>
                                             <TableCell className="py-2 text-sm text-gray-600 text-right">{p.date}</TableCell>
                                         </TableRow>
                                     ))}
                                 </TableBody>
                             </Table>
                         </CardContent>
                     </Card>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                     <Card className={cardClass}>
                         <CardHeader className={cardHeaderClass}>
                             <CardTitle className={cardTitleClass}><Activity className="size-3.5" /> Source of Funds & Wealth</CardTitle>
                         </CardHeader>
                         <CardContent className="p-3 grid grid-cols-2 gap-4">
                             <div>
                                 <span className="text-xs font-bold uppercase text-gray-500 block mb-2">Source of Funds</span>
                                 <ul className="list-disc list-inside space-y-1">
                                     {selectedCustomer.kycProfile.sourceOfFunds.map((s: string, i: number) => (
                                         <li key={i} className="text-sm text-gray-700">{s}</li>
                                     ))}
                                 </ul>
                             </div>
                             <div className="border-l border-gray-100 pl-4">
                                 <span className="text-xs font-bold uppercase text-gray-500 block mb-2">Source of Wealth</span>
                                 <ul className="list-disc list-inside space-y-1">
                                     {selectedCustomer.kycProfile.sourceOfWealth.map((s: string, i: number) => (
                                         <li key={i} className="text-sm text-gray-700">{s}</li>
                                     ))}
                                 </ul>
                             </div>
                         </CardContent>
                     </Card>

                     <Card className={cardClass}>
                         <CardHeader className={cardHeaderClass}>
                             <CardTitle className={cardTitleClass}><Activity className="size-3.5" /> KYC Risk Evolution</CardTitle>
                         </CardHeader>
                         <CardContent className="p-3 h-[150px]">
                             <ResponsiveContainer width="100%" height="100%">
                                 <LineChart data={selectedCustomer.kycProfile.riskEvolution}>
                                     <XAxis dataKey="date" tick={{fontSize: 10}} tickLine={false} axisLine={false} />
                                     <YAxis tick={{fontSize: 10}} tickLine={false} axisLine={false} domain={[0, 100]} />
                                     <RechartsTooltip contentStyle={{fontSize: '10px', borderRadius: '4px', padding: '4px'}} />
                                     <Line type="monotone" dataKey="score" stroke="#2A53A0" strokeWidth={2} dot={{r: 3}} activeDot={{r: 5}} />
                                 </LineChart>
                             </ResponsiveContainer>
                         </CardContent>
                     </Card>
                 </div>

                 <Card className={cardClass}>
                     <CardHeader className={cardHeaderClass}>
                         <CardTitle className={cardTitleClass}><ScrollText className="size-3.5" /> KYC Change Log</CardTitle>
                     </CardHeader>
                     <CardContent className="p-0">
                         <Table>
                             <TableHeader><TableRow className="bg-gray-50/50"><TableHead className="h-9 text-xs font-bold uppercase">Date</TableHead><TableHead className="h-9 text-xs font-bold uppercase">Field Changed</TableHead><TableHead className="h-9 text-xs font-bold uppercase">Old Value</TableHead><TableHead className="h-9 text-xs font-bold uppercase">New Value</TableHead><TableHead className="h-9 text-xs font-bold uppercase">User</TableHead></TableRow></TableHeader>
                             <TableBody>
                                 {selectedCustomer.kycProfile.changeLog.map((log: any, i: number) => (
                                     <TableRow key={i}>
                                         <TableCell className="py-2 text-sm text-gray-600">{log.date}</TableCell>
                                         <TableCell className="py-2 text-sm font-normal text-gray-900">{log.field}</TableCell>
                                         <TableCell className="py-2 text-sm text-gray-500">{log.old}</TableCell>
                                         <TableCell className="py-2 text-sm font-normal text-gray-900">{log.new}</TableCell>
                                         <TableCell className="py-2 text-sm text-gray-600">{log.user}</TableCell>
                                     </TableRow>
                                 ))}
                             </TableBody>
                         </Table>
                     </CardContent>
                 </Card>
              </div>
          </TabsContent>

          {/* Accounts Tab Content */}
          <TabsContent value="accounts" className="mt-0 animate-in fade-in-50 duration-300">
              <div className="space-y-3">
                 {selectedCustomer.accountsProfile.dormant.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3">
                        <Ban className="size-5 text-red-600 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-bold text-red-800">Dormant Accounts Detected</h4>
                            <p className="text-xs text-red-700 mt-1">
                                The following accounts have been inactive for more than 6 months:
                                {selectedCustomer.accountsProfile.dormant.map((d: any, i: number) => (
                                    <span key={i} className="font-bold ml-1">{d.name} ({d.period})</span>
                                ))}
                            </p>
                        </div>
                    </div>
                 )}

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                     <Card className={cn(cardClass, "md:col-span-2")}>
                         <CardHeader className={cardHeaderClass}>
                             <CardTitle className={cardTitleClass}><Wallet className="size-3.5" /> Account Summary</CardTitle>
                         </CardHeader>
                         <CardContent className="p-0">
                             <Table>
                                 <TableHeader>
                                    <TableRow className="bg-gray-50/50">
                                       <TableHead className="h-9 text-xs font-bold uppercase">Institution</TableHead>
                                       <TableHead className="h-9 text-xs font-bold uppercase">Account No</TableHead>
                                       <TableHead className="h-9 text-xs font-bold uppercase">Type</TableHead>
                                       <TableHead className="h-9 text-xs font-bold uppercase">Currency</TableHead>
                                       <TableHead className="h-9 text-xs font-bold uppercase text-right">Balance</TableHead>
                                       <TableHead className="h-9 text-xs font-bold uppercase text-center">Status</TableHead>
                                    </TableRow>
                                 </TableHeader>
                                 <TableBody>
                                    {selectedCustomer.accountsProfile.summary.map((acc: any, i: number) => (
                                       <TableRow key={i}>
                                          <TableCell className="py-2 text-sm font-normal text-gray-900">{acc.institution}</TableCell>
                                          <TableCell className="py-2 text-sm font-mono text-blue-600">{acc.id}</TableCell>
                                          <TableCell className="py-2 text-sm text-gray-600">{acc.type}</TableCell>
                                          <TableCell className="py-2 text-sm text-gray-600">{acc.currency}</TableCell>
                                          <TableCell className="py-2 text-sm font-bold text-gray-900 text-right">{acc.balance}</TableCell>
                                          <TableCell className="py-2 text-center"><Badge className={cn("text-[10px] h-4 px-1", acc.status === 'Active' ? "bg-green-100 text-green-700" : acc.status === 'Dormant' ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600")}>{acc.status}</Badge></TableCell>
                                       </TableRow>
                                    ))}
                                 </TableBody>
                             </Table>
                         </CardContent>
                     </Card>
                     
                     <Card className={cardClass}>
                         <CardHeader className={cardHeaderClass}>
                             <CardTitle className={cardTitleClass}><Scale className="size-3.5" /> Limits & Thresholds</CardTitle>
                         </CardHeader>
                         <CardContent className="p-4 space-y-4">
                            <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                               <span className="text-sm text-gray-600">Daily Txn Limit</span>
                               <span className="text-sm font-bold text-gray-900">{selectedCustomer.accountsProfile.limits.transaction}</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                               <span className="text-sm text-gray-600">Daily Cash Limit</span>
                               <span className="text-sm font-bold text-gray-900">{selectedCustomer.accountsProfile.limits.cash}</span>
                            </div>
                            <div className="flex justify-between items-center">
                               <span className="text-sm text-gray-600">Annual FX Limit</span>
                               <span className="text-sm font-bold text-gray-900">{selectedCustomer.accountsProfile.limits.fx}</span>
                            </div>
                         </CardContent>
                     </Card>

                     <Card className={cardClass}>
                         <CardHeader className={cardHeaderClass}>
                             <CardTitle className={cardTitleClass}><Layers className="size-3.5" /> Product Holding</CardTitle>
                         </CardHeader>
                         <CardContent className="p-4">
                            <div className="flex flex-wrap gap-2">
                               {selectedCustomer.accountsProfile.products.map((p: string, i: number) => (
                                  <Badge key={i} variant="secondary" className="bg-blue-50 text-blue-700 border border-blue-100">{p}</Badge>
                               ))}
                            </div>
                         </CardContent>
                     </Card>
                 </div>
              </div>
          </TabsContent>

          {/* Transactions Tab Content */}
          <TabsContent value="transactions" className="mt-0 animate-in fade-in-50 duration-300">
             <div className="flex flex-col items-center justify-center h-[400px] border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 text-gray-400">
                <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                   <Activity className="size-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600">Transaction Analysis</h3>
                <p className="text-sm">Detailed transaction ledger and behavioral analysis view</p>
                <Button variant="outline" size="sm" className="mt-4 border-gray-300">Download Full Statement</Button>
             </div>
          </TabsContent>

          {/* Alerts Tab Content */}
          <TabsContent value="alerts" className="mt-0 animate-in fade-in-50 duration-300">
             <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                   <Card className="rounded-lg border border-gray-200 shadow-sm bg-white">
                      <CardContent className="p-4 flex flex-col gap-1">
                         <span className="text-[10px] font-bold text-gray-500">Active Alerts</span>
                         <div className="flex items-end justify-between">
                            <div className="flex items-baseline gap-1.5">
                               <span className="text-2xl font-bold text-gray-900">{selectedCustomer.alertsProfile.stats.activeCount}</span>
                               <span className="text-xs text-gray-500 font-medium">/ {selectedCustomer.alertsProfile.stats.closedCount} Closed</span>
                            </div>
                            <Badge className="bg-red-100 text-red-700 h-5 text-[10px] px-1.5">High Priority</Badge>
                         </div>
                      </CardContent>
                   </Card>

                   <Card className="rounded-lg border border-gray-200 shadow-sm bg-white">
                      <CardContent className="p-4 flex flex-col gap-1">
                         <span className="text-[10px] font-bold text-gray-500">False Positive Rate</span>
                         <div className="flex items-end justify-between">
                            <span className="text-2xl font-bold text-gray-900">{selectedCustomer.alertsProfile.stats.falsePositiveRate}%</span>
                            <span className="text-[10px] text-green-600 font-medium">Alert Quality</span>
                         </div>
                         <div className="w-full bg-gray-100 h-1 mt-2 rounded-full overflow-hidden">
                            <div className="bg-green-500 h-full" style={{ width: `${selectedCustomer.alertsProfile.stats.falsePositiveRate}%` }}></div>
                         </div>
                      </CardContent>
                   </Card>

                   <Card className="rounded-lg border border-gray-200 shadow-sm bg-white">
                      <CardContent className="p-4 flex flex-col gap-1">
                         <span className="text-[10px] font-bold text-gray-500">Active Alert Volume</span>
                         <div className="flex items-end justify-between">
                            <span className="text-2xl font-bold text-gray-900">{selectedCustomer.alertsProfile.stats.totalActiveVolume}</span>
                            <span className="text-[10px] text-gray-400">{selectedCustomer.alertsProfile.stats.alertVolumePercentage}% of Total</span>
                         </div>
                      </CardContent>
                   </Card>

                   <Card className="rounded-lg border border-gray-200 shadow-sm bg-white">
                      <CardContent className="p-4 flex flex-col gap-1">
                         <span className="text-[10px] font-bold text-gray-500">Internal Requests (RFI)</span>
                         <div className="flex items-end justify-between">
                            <span className="text-2xl font-bold text-gray-900">{selectedCustomer.alertsProfile.rfi.count}</span>
                            <span className="text-[10px] text-orange-600 font-medium">{selectedCustomer.alertsProfile.rfi.status}</span>
                         </div>
                      </CardContent>
                   </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                   <div className="lg:col-span-2 space-y-4">
                      <Card className="rounded-lg border border-gray-200 shadow-sm bg-white">
                         <CardHeader className={cardHeaderClass}>
                            <div className="flex justify-between items-center w-full">
                               <CardTitle className={cardTitleClass}><Bell className="size-3.5" /> Recent Active Alerts</CardTitle>
                               <Button variant="ghost" size="sm" className="h-6 text-[10px] text-blue-600 hover:text-blue-700 hover:bg-blue-50">View All Transactions <ArrowRight className="ml-1 size-3" /></Button>
                            </div>
                         </CardHeader>
                         <CardContent className="p-0">
                            <Table>
                               <TableHeader>
                                  <TableRow className="bg-gray-50/50">
                                     <TableHead className="h-9 text-xs font-bold">Alert ID</TableHead>
                                     <TableHead className="h-9 text-xs font-bold">Date</TableHead>
                                     <TableHead className="h-9 text-xs font-bold">Rule</TableHead>
                                     <TableHead className="h-9 text-xs font-bold">Amount</TableHead>
                                     <TableHead className="h-9 text-xs font-bold">Severity</TableHead>
                                     <TableHead className="h-9 text-xs font-bold">Status</TableHead>
                                  </TableRow>
                               </TableHeader>
                               <TableBody>
                                  {selectedCustomer.alertsProfile.active.map((alert: any, i: number) => (
                                     <TableRow key={i} className="hover:bg-gray-50 border-gray-50">
                                        <TableCell className="py-2 text-sm font-mono text-blue-600 font-normal">{alert.id}</TableCell>
                                        <TableCell className="py-2 text-sm text-gray-900">{alert.date}</TableCell>
                                        <TableCell className="py-2">
                                           <div className="flex flex-col">
                                              <span className="text-sm font-normal text-gray-900">{alert.rule}</span>
                                              <span className="text-xs text-gray-500">{alert.details}</span>
                                           </div>
                                        </TableCell>
                                        <TableCell className="py-2 text-sm font-mono text-gray-900">{alert.amount}</TableCell>
                                        <TableCell className="py-2"><Badge variant="outline" className={cn("text-xs h-5 px-1.5", alert.severity === 'High' ? "bg-red-50 text-red-700 border-red-200" : "bg-orange-50 text-orange-700 border-orange-200")}>{alert.severity}</Badge></TableCell>
                                        <TableCell className="py-2"><Badge className={cn("text-xs h-5 px-1.5", alert.status === 'Open' ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700")}>{alert.status}</Badge></TableCell>
                                     </TableRow>
                                  ))}
                               </TableBody>
                            </Table>
                         </CardContent>
                      </Card>

                      <Card className="rounded-lg border border-gray-200 shadow-sm bg-white">
                         <CardHeader className={cardHeaderClass}>
                            <div className="flex justify-between items-center w-full">
                                <CardTitle className={cardTitleClass}><ScrollText className="size-3.5" /> Alert History & Resolution</CardTitle>
                                <Button variant="outline" size="sm" className="h-8 gap-2 rounded-md border-gray-300 text-gray-700 bg-white shadow-sm px-3 text-xs">
                                   <Download className="size-3.5" /> Export
                                </Button>
                            </div>
                         </CardHeader>
                         <CardContent className="p-0">
                            <ScrollArea className="h-[300px]">
                               <Table>
                                  <TableHeader>
                                     <TableRow className="bg-gray-50/50">
                                        <TableHead className="h-9 text-xs font-bold">ID</TableHead>
                                        <TableHead className="h-9 text-xs font-bold">Rule</TableHead>
                                     <TableHead className="h-9 text-xs font-bold">Disposition</TableHead>
                                     <TableHead className="h-9 text-xs font-bold">Rationale</TableHead>
                                     <TableHead className="h-9 text-xs font-bold text-right">Status</TableHead>
                                  </TableRow>
                               </TableHeader>
                               <TableBody>
                                  {selectedCustomer.alertsProfile.history.map((h: any, i: number) => (
                                     <TableRow key={i} className="hover:bg-gray-50 border-gray-50">
                                        <TableCell className="py-2 text-sm font-mono text-gray-500">{h.id}</TableCell>
                                        <TableCell className="py-2 text-sm font-normal text-gray-900">{h.rule}</TableCell>
                                        <TableCell className="py-2">
                                           <Badge variant="outline" className={cn("text-xs h-5 px-1.5", h.disposition === 'False Positive' ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200")}>{h.disposition}</Badge>
                                        </TableCell>
                                        <TableCell className="py-2 text-sm text-gray-600">{h.rationale}</TableCell>
                                        <TableCell className="py-2 text-right"><span className="text-sm font-normal text-gray-900">{h.status}</span></TableCell>
                                     </TableRow>
                                  ))}
                               </TableBody>
                            </Table>
                           </ScrollArea>
                         </CardContent>
                      </Card>
                   </div>

                   <div className="space-y-4">
                      <Card className="rounded-lg border border-gray-200 shadow-sm bg-white">
                         <CardHeader className={cardHeaderClass}>
                            <div className="flex justify-between items-center w-full">
                               <CardTitle className={cardTitleClass}><PieChart className="size-3.5" /> Funding Sources</CardTitle>
                               <Button variant="ghost" size="sm" className="h-6 text-xs text-gray-500 hover:text-gray-900"><ArrowRightLeft className="size-3 mr-1" /> View Flow</Button>
                            </div>
                         </CardHeader>
                         <CardContent className="p-4 space-y-4">
                            {selectedCustomer.alertsProfile.fundingSources.map((source: any, i: number) => (
                               <div key={i} className="space-y-1.5">
                                  <div className="flex justify-between items-center text-sm">
                                     <span className="font-normal text-gray-700">{source.type}</span>
                                     <span className={cn("text-xs font-normal", source.trend === 'Increasing' ? "text-red-600" : source.trend === 'Decreasing' ? "text-green-600" : "text-gray-500")}>{source.trend}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                     <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${source.percent}%` }}></div>
                                     </div>
                                     <span className="text-sm font-normal text-gray-900 w-8 text-right">{source.percent}%</span>
                                  </div>
                               </div>
                            ))}
                            <Separator className="my-2" />
                            <div className="bg-gray-50 p-2 rounded border border-dashed border-gray-200 text-center">
                               <p className="text-xs text-gray-500">Flow diagram available in full report</p>
                            </div>
                         </CardContent>
                      </Card>

                      <Card className="rounded-lg border border-gray-200 shadow-sm bg-white">
                         <CardHeader className={cardHeaderClass}>
                            <CardTitle className={cardTitleClass}><Mail className="size-3.5" /> RFI Correspondence</CardTitle>
                         </CardHeader>
                         <CardContent className="p-0">
                            <ScrollArea className="h-[200px]">
                               <div className="p-1">
                                  {selectedCustomer.alertsProfile.rfi.items.map((item: any, i: number) => (
                                     <div key={i} className="p-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                                        <div className="flex justify-between items-start mb-1">
                                           <span className="text-sm font-normal text-gray-900">{item.type}</span>
                                           <span className="text-xs text-gray-500">{item.date}</span>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                           <Badge variant="secondary" className={cn("text-xs h-5 px-1.5", item.status === 'Pending' ? "bg-orange-50 text-orange-700" : "bg-green-50 text-green-700")}>
                                              {item.status === 'Pending' ? <FileWarning className="size-2.5 mr-1" /> : <CheckCircle2 className="size-2.5 mr-1" />}
                                              {item.status}
                                           </Badge>
                                           <Button variant="ghost" size="sm" className="h-6 text-xs px-2 text-blue-600 hover:text-blue-700">View Email</Button>
                                        </div>
                                     </div>
                                  ))}
                               </div>
                            </ScrollArea>
                         </CardContent>
                      </Card>
                   </div>
                </div>
             </div>
          </TabsContent>

          <TabsContent value="reports" className="mt-0 animate-in fade-in-50 duration-300">
             <div className="flex flex-col items-center justify-center h-[400px] border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 text-gray-400">
                <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                   <Scale className="size-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600">Regulatory Reports</h3>
                <p className="text-sm">STR/SAR and CTR filing history and LEA requests</p>
                <Button variant="outline" size="sm" className="mt-4 border-gray-300">View Filing Calendar</Button>
             </div>
          </TabsContent>

          <TabsContent value="audit" className="mt-0 animate-in fade-in-50 duration-300">
             <Card className={cardClass}>
                <CardHeader className={cardHeaderClass}>
                   <CardTitle className={cardTitleClass}><ScrollText className="size-3.5" /> Full Audit Trail</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                   <Table>
                      <TableHeader>
                         <TableRow className="bg-gray-50/50">
                            <TableHead className="h-9 text-xs font-bold">Log ID</TableHead>
                            <TableHead className="h-9 text-xs font-bold">Category</TableHead>
                            <TableHead className="h-9 text-xs font-bold">Action</TableHead>
                            <TableHead className="h-9 text-xs font-bold">Details</TableHead>
                            <TableHead className="h-9 text-xs font-bold">User</TableHead>
                            <TableHead className="h-9 text-xs font-bold text-right">Timestamp</TableHead>
                         </TableRow>
                      </TableHeader>
                      <TableBody>
                         {selectedCustomer.audit.map((log: any, i: number) => (
                            <TableRow key={i}>
                               <TableCell className="py-2 text-xs font-mono text-gray-500">{log.id}</TableCell>
                               <TableCell className="py-2"><Badge variant="outline" className="text-[10px] h-4">{log.category}</Badge></TableCell>
                               <TableCell className="py-2 text-sm font-normal text-gray-900">{log.action}</TableCell>
                               <TableCell className="py-2 text-sm text-gray-600">{log.details}</TableCell>
                               <TableCell className="py-2 text-sm text-gray-600">{log.user}</TableCell>
                               <TableCell className="py-2 text-xs text-gray-500 text-right">{log.date}</TableCell>
                            </TableRow>
                         ))}
                      </TableBody>
                   </Table>
                </CardContent>
             </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
