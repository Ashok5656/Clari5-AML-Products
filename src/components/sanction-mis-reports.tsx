import { useState } from "react";
import { 
  Filter, 
  Add,
  Edit,
  TrashCan,
  Search,
  View,
  ArrowLeft,
  Save,
  Close,
  Download,
  DocumentPdf,
  DocumentBlank,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Help as Information,
  Calendar
} from "@carbon/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { CarbonPaginationFooter } from "./carbon-pagination-footer";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { useSortableData } from "../hooks/use-sortable-data";
import { SortableHeader } from "./ui/sortable-header";

interface SanctionMisReportsProps {
  breadcrumbs?: any[];
  onBreadcrumbNavigate?: (path: string) => void;
}

interface AlertRule {
  id: string;
  description: string;
  frequency: "Daily" | "Weekly" | "Monthly";
  reportStatus: "Generated" | "Pending";
  severity: "High" | "Medium" | "Low";
  status: "Active" | "Inactive";
  category: string;
  threshold: string;
  parameters: string;
  lastUpdated: string;
  score: number;
  fromDate: string;
  toDate: string;
}

const rawRules = [
  "Comprehensive Sanctions Screening Intelligence Report",
  "Enhanced Due Diligence: PEP & Adverse Media Analytics Report",
  "Screening Exception Authorization & Tracking Report",
  "Geographic Risk Exposure Intelligence Report",
  "Related Party High-Risk Country Linkage Report",
  "Sanctions List Governance & Update Tracking Report",
  "Screening Configuration Audit Report"
];

const generateRulesData = (): AlertRule[] => {
  const frequencies: ("Daily" | "Weekly" | "Monthly")[] = ["Daily", "Monthly", "Weekly", "Daily", "Monthly", "Weekly", "Daily"];
  const statuses: ("Generated" | "Pending")[] = ["Pending", "Generated", "Generated", "Generated", "Generated", "Generated", "Generated"];
  
  return rawRules.map((desc, index) => {
    let parameters = "Account Age: < 30 Days, Transaction Velocity: High, Risk Score: > 80";
    
    if (desc.includes("Tiny OD (OverDraft) accounts")) {
      parameters = "Minimum Threshold: > 100000, Minimum Frequency: > 5, Product Code: OD-SMALL-GEN";
    }

    return {
      id: `MIS-SANC-${(index + 1).toString().padStart(3, '0')}`,
      description: desc,
      frequency: frequencies[index],
      reportStatus: statuses[index],
      severity: "High",
      status: "Active",
      category: desc.toLowerCase().includes("mule") ? "Money Mule" : desc.toLowerCase().includes("transaction") ? "Transaction Pattern" : "Account Activity",
      threshold: "N/A - Qualitative Indicator",
      parameters: parameters,
      lastUpdated: "2024-01-15",
      score: 90,
      fromDate: "2024-01-01",
      toDate: "2024-12-31"
    };
  });
};

const ShimmerButton = ({ children, className, isLoading, onClick, ...props }: any) => {
  return (
    <Button 
      className={`relative overflow-hidden ${className} transition-colors`} 
      onClick={onClick}
      disabled={isLoading}
      {...props}
    >
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"
          />
        )}
      </AnimatePresence>
      <span className="relative z-0 flex items-center gap-2">
        {children}
      </span>
    </Button>
  );
};

const InlineNotification = ({ title, children, kind = "info" }: { title: string, children: React.ReactNode, kind?: "info" | "success" | "warning" | "error" | "brand" }) => {
  const styles = {
    info: {
      bg: "bg-[#edf5ff]",
      border: "border-l-4 border-[#0062ff]",
      iconColor: "text-[#0062ff]"
    },
    brand: {
      bg: "bg-[#f0f3f9]",
      border: "border-l-4 border-[#2A53A0]",
      iconColor: "text-[#2A53A0]"
    },
    success: {
      bg: "bg-[#defbe6]",
      border: "border-l-4 border-[#24a148]",
      iconColor: "text-[#24a148]"
    },
    warning: {
      bg: "bg-[#fcf4d6]",
      border: "border-l-4 border-[#f1c21b]",
      iconColor: "text-[#f1c21b]"
    },
    error: {
      bg: "bg-[#fff1f1]",
      border: "border-l-4 border-[#da1e28]",
      iconColor: "text-[#da1e28]"
    }
  };

  const current = styles[kind];

  return (
    <div className={`flex gap-4 p-4 ${current.bg} ${current.border} w-full`}>
      <div className={`${current.iconColor} mt-0.5`}>
        <Information className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <h5 className="text-sm font-bold text-[#161616] mb-1">{title}</h5>
        <div className="text-sm text-[#525252]">{children}</div>
      </div>
    </div>
  );
};

export function SanctionMisReports({ breadcrumbs, onBreadcrumbNavigate }: SanctionMisReportsProps) {
  const [currentView, setCurrentView] = useState<"list" | "view" | "edit">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [selectedRule, setSelectedRule] = useState<AlertRule | null>(null);
  const [rules, setRules] = useState<AlertRule[]>(generateRulesData());
  const [isAddingNew, setIsAddingNew] = useState(false);

  const filteredRules = rules.filter(rule => 
    rule.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rule.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { items: sortedRules, requestSort, sortConfig } = useSortableData(filteredRules);

  const totalItems = sortedRules.length;
  const startItem = (currentPage - 1) * pageSize;
  const currentRules = sortedRules.slice(startItem, startItem + pageSize);

  const handleViewRule = (rule: AlertRule) => {
    setSelectedRule(rule);
    setCurrentView("view");
  };

  const handleEditRule = (rule: AlertRule) => {
    setSelectedRule(rule);
    setCurrentView("edit");
  };

  const handleSaveRule = (updatedRule: AlertRule) => {
    const updatedRules = rules.map(r => r.id === updatedRule.id ? updatedRule : r);
    setRules(updatedRules);
    setSelectedRule(updatedRule);
    setCurrentView("view");
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setTimeout(() => {
       setIsAddingNew(false);
    }, 2000);
  };

  if (currentView === "view" && selectedRule) {
    return <ReportDetailsPage rule={selectedRule} onBack={() => setCurrentView("list")} />;
  }

  if (currentView === "edit" && selectedRule) {
     return (
        <EditRulePage 
           rule={selectedRule} 
           onSave={handleSaveRule} 
           onCancel={() => setCurrentView("view")} 
        />
     );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Custom Header for Listing Page */}
      <div className="flex-none bg-white dark:bg-gray-900 border-b border-[#DDE1E6] px-6 py-3 mb-4">
        <div className="max-w-[1600px] mx-auto w-full flex items-center justify-between">
          <h1 className="text-[18px] font-bold text-[#161616] dark:text-white">Sanction MIS Reports</h1>
          <div className="flex items-center gap-1.5 text-[14px] font-medium text-[#525252]">
            <span className="text-[#2A53A0]">Sanction Screening</span>
            <span className="text-[#DDE1E6]">/</span>
            <span className="text-[#161616]">Sanction MIS Reports</span>
          </div>
        </div>
      </div>

      <div className="px-4 flex-1 flex flex-col overflow-hidden pb-4">
        {/* Header Actions */}
      <div className="flex-none pb-4">
        <div className="flex items-center justify-between">
          {/* Search */}
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search reports..." 
              className="pl-9 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus-visible:ring-[#2A53A0] h-[46px]"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
          
          <div className="flex items-center gap-3 ml-4">
            <Button variant="outline" className="gap-2 bg-white dark:bg-gray-900 h-[46px] text-sm hover:bg-gray-50 border-gray-200">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <ShimmerButton 
              className="bg-[#2A53A0] hover:bg-[#2A53A0]/90 text-white h-[46px] text-sm px-4"
              isLoading={isAddingNew}
              onClick={handleAddNew}
            >
              <Add className="w-4 h-4" />
              {isAddingNew ? "Verifying..." : "Add New Rule"}
            </ShimmerButton>
          </div>
        </div>
      </div>

      {/* Content Table */}
      <div className="flex-1 overflow-hidden flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
        <div className="flex-1 overflow-auto">
          <Table>
            <thead className="sticky top-0 z-10 shadow-sm">
              <tr className="bg-[#F0F0F0] text-[#161616] h-[48px]">
                <th className="pl-4 px-4 font-medium text-[14px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[150px]">
                  <SortableHeader column="id" label="Report ID" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-medium text-[14px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left">
                  <SortableHeader column="description" label="Report Name" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-medium text-[14px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[120px]">
                  <SortableHeader column="frequency" label="Frequency" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-medium text-[14px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[140px]">
                  <SortableHeader column="reportStatus" label="Status" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-medium text-[14px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[140px]">Actions</th>
              </tr>
            </thead>
            <TableBody>
              {currentRules.length > 0 ? (
                currentRules.map((rule) => (
                  <TableRow key={rule.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800 h-[46px]">
                    <TableCell className="px-4 align-middle text-[15px] font-mono text-gray-600 font-normal">
                      {rule.id}
                    </TableCell>
                    <TableCell className="px-4 align-middle text-[15px] max-w-[500px]">
                      <div className="truncate text-gray-700 dark:text-gray-300 font-normal" title={rule.description}>
                        {rule.description}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 align-middle">
                      <Badge 
                        variant="outline" 
                        className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                      >
                        {rule.frequency}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 align-middle">
                      <Badge 
                        variant="outline" 
                        className={`gap-1.5 ${
                          rule.reportStatus === 'Generated' 
                            ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' 
                            : 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          rule.reportStatus === 'Generated' ? 'bg-green-600' : 'bg-yellow-600'
                        }`}></span>
                        {rule.reportStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 align-middle">
                      <div className="flex items-center justify-start gap-2">
                        <button 
                          className="flex items-center justify-center w-8 h-8 rounded-sm bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 transition-colors"
                          onClick={() => handleViewRule(rule)}
                          title="View Details"
                        >
                          <View className="w-4 h-4" />
                        </button>
                        <button 
                          className="flex items-center justify-center w-8 h-8 rounded-sm bg-gray-500/10 hover:bg-gray-500/20 text-gray-600 transition-colors"
                          title="Download Report"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button 
                          className="flex items-center justify-center w-8 h-8 rounded-sm bg-red-500/10 hover:bg-red-500/20 text-red-600 transition-colors"
                          title="Delete"
                        >
                          <TrashCan className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-gray-500 text-[15px]">
                    No rules found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex-none">
          <CarbonPaginationFooter 
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItems={totalItems}
          />
        </div>
      </div>
    </div>
  </div>
  );
}

function EditRulePage({ rule, onSave, onCancel }: { rule: AlertRule, onSave: (r: AlertRule) => void, onCancel: () => void }) {
  const [formData, setFormData] = useState<AlertRule>({...rule});
  const [isSaving, setIsSaving] = useState(false);
  
  const [parameterList, setParameterList] = useState<{key: string, value: string}[]>(
    rule.parameters ? rule.parameters.split(',').map(p => {
      const parts = p.split(':');
      const key = parts[0]?.trim() || "";
      const value = parts.slice(1).join(':').trim();
      if (!key) return null;
      return { key, value };
    }).filter((item): item is {key: string, value: string} => item !== null) : []
  );

  const handleChange = (field: keyof AlertRule, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleParamKeyChange = (index: number, newKey: string) => {
    const newList = [...parameterList];
    newList[index].key = newKey;
    updateParameters(newList);
  };

  const handleParamValueChange = (index: number, newValue: string) => {
    const newList = [...parameterList];
    newList[index].value = newValue;
    updateParameters(newList);
  };

  const updateParameters = (list: {key: string, value: string}[]) => {
    setParameterList(list);
    const paramString = list.map(item => {
      if (item.value) return `${item.key}: ${item.value}`;
      return item.key;
    }).join(', ');
    setFormData(prev => ({ ...prev, parameters: paramString }));
  };

  const handleAddParameter = () => {
    const newList = [...parameterList, { key: "", value: "" }];
    updateParameters(newList);
  };

  const handleRemoveParameter = (index: number) => {
    const newList = parameterList.filter((_, i) => i !== index);
    updateParameters(newList);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
       onSave(formData);
       setIsSaving(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f4f4] dark:bg-gray-900/50 p-4 space-y-4">
      <div className="flex-none flex items-center justify-between bg-white p-4 border border-gray-200 rounded shadow-sm">
         <div className="flex items-center gap-2">
           <Button variant="ghost" size="icon" onClick={onCancel} className="hover:bg-gray-200 dark:hover:bg-gray-800">
             <ArrowLeft className="w-5 h-5 text-[#2A53A0]" />
           </Button>
           <div>
             <h2 className="text-lg font-semibold text-[#2A53A0]">Edit Rule Configuration</h2>
             <p className="text-[10px] text-gray-400 font-mono mt-0.5">{rule.id}</p>
           </div>
         </div>
         <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel} className="bg-white text-gray-700 hover:bg-gray-50 border-gray-300 h-[40px] text-sm">
              Cancel
            </Button>
            <ShimmerButton 
              onClick={handleSave} 
              className="bg-[#2A53A0] hover:bg-[#2A53A0]/90 text-white h-[40px] text-sm px-6 shadow-sm"
              isLoading={isSaving}
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </ShimmerButton>
         </div>
      </div>

      <div className="flex-1 overflow-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded shadow-sm p-6">
         <div className="w-full space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold text-gray-700">Rule Description <span className="text-red-500">*</span></Label>
              <Textarea 
                id="description" 
                className="min-h-[100px] resize-y bg-gray-50" 
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <Label htmlFor="category" className="text-sm font-semibold text-gray-700">Category</Label>
                 <Input 
                   id="category" 
                   value={formData.category}
                   onChange={(e) => handleChange("category", e.target.value)}
                   className="bg-gray-50 h-[46px]"
                 />
               </div>
               <div className="space-y-2">
                 <Label htmlFor="severity" className="text-sm font-semibold text-gray-700">Severity</Label>
                 <Select value={formData.severity} onValueChange={(val) => handleChange("severity", val)}>
                   <SelectTrigger className="bg-gray-50 h-[46px]">
                     <SelectValue placeholder="Select severity" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="High">High</SelectItem>
                     <SelectItem value="Medium">Medium</SelectItem>
                     <SelectItem value="Low">Low</SelectItem>
                   </SelectContent>
                 </Select>
               </div>

               <div className="space-y-2">
                 <Label htmlFor="status" className="text-sm font-semibold text-gray-700">Status</Label>
                 <Select value={formData.status} onValueChange={(val) => handleChange("status", val)}>
                   <SelectTrigger className="bg-gray-50 h-[46px]">
                     <SelectValue placeholder="Select status" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="Active">Active</SelectItem>
                     <SelectItem value="Inactive">Inactive</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
               <div className="space-y-2">
                  <Label htmlFor="score" className="text-sm font-semibold text-gray-700">Risk Score</Label>
                  <Input 
                    type="number"
                    id="score"
                    value={formData.score}
                    onChange={(e) => setFormData(prev => ({...prev, score: Number(e.target.value)}))}
                    className="bg-gray-50 h-[46px]"
                  />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <Label htmlFor="fromDate" className="text-sm font-semibold text-gray-700">From Date</Label>
                  <Input 
                    type="date"
                    id="fromDate"
                    value={formData.fromDate}
                    onChange={(e) => handleChange("fromDate", e.target.value)}
                    className="bg-gray-50 h-[46px]"
                  />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="toDate" className="text-sm font-semibold text-gray-700">To Date</Label>
                  <Input 
                    type="date"
                    id="toDate"
                    value={formData.toDate}
                    onChange={(e) => handleChange("toDate", e.target.value)}
                    className="bg-gray-50 h-[46px]"
                  />
               </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-100">
               <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-semibold text-gray-700">Parameters Configuration</Label>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleAddParameter}
                    className="h-8 text-[#2A53A0] hover:text-[#2A53A0]/80 hover:bg-blue-50"
                  >
                    <Add className="w-4 h-4 mr-1" />
                    Add Parameter
                  </Button>
               </div>
               
               <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-800">
                  {parameterList.length > 0 && (
                     <div className="grid grid-cols-12 gap-3 mb-1 px-1">
                        <div className="col-span-5 text-xs font-medium text-gray-500 uppercase">Parameter Name</div>
                        <div className="col-span-6 text-xs font-medium text-gray-500 uppercase">Value / Constraint</div>
                        <div className="col-span-1"></div>
                     </div>
                  )}
                  {parameterList.map((param, index) => (
                    <div key={index} className="grid grid-cols-12 gap-3 items-center">
                       <div className="col-span-5">
                          <Input 
                             value={param.key}
                             onChange={(e) => handleParamKeyChange(index, e.target.value)}
                             className="bg-white dark:bg-gray-900 h-[40px] font-medium"
                             placeholder="e.g. Transaction Limit"
                          />
                       </div>
                       <div className="col-span-6">
                          <Input 
                             value={param.value}
                             onChange={(e) => handleParamValueChange(index, e.target.value)}
                             className="bg-white dark:bg-gray-900 h-[40px] font-mono text-sm"
                             placeholder="e.g. > 50,000"
                          />
                       </div>
                       <div className="col-span-1 flex justify-center">
                          <Button 
                             type="button"
                             variant="ghost" 
                             size="icon"
                             onClick={() => handleRemoveParameter(index)}
                             className="text-red-500 hover:text-red-700 hover:bg-red-50 h-[36px] w-[36px]"
                          >
                             <TrashCan className="w-4 h-4" />
                          </Button>
                       </div>
                    </div>
                  ))}
                  {parameterList.length === 0 && (
                    <div className="text-sm text-gray-500 italic text-center py-2">
                       No parameters defined. Click "Add Parameter" to start.
                    </div>
                  )}
               </div>
            </div>

            <div className="space-y-2">
               <Label htmlFor="threshold" className="text-sm font-semibold text-gray-700">Threshold Logic</Label>
               <Textarea 
                  id="threshold" 
                  value={formData.threshold}
                  onChange={(e) => handleChange("threshold", e.target.value)}
                  className="bg-gray-50 font-mono text-sm min-h-[80px]"
               />
            </div>
         </div>
      </div>
    </div>
  );
}

function ReportDetailsPage({ rule, onBack }: { rule: AlertRule, onBack: () => void }): JSX.Element {
  const [filtersExpanded, setFiltersExpanded] = useState<boolean>(true);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({
    dateFrom: "",
    dateTo: "",
    screeningType: "",
    customerType: "",
    searchQuery: "",
    watchlist: "",
    nationality: "",
    channel: "",
    status: ""
  });

  const isFilterApplied = Object.values(filterValues).some(val => val !== "");

  const handleFilterChange = (key: string, value: string) => {
    setFilterValues(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilterValues({
      dateFrom: "",
      dateTo: "",
      screeningType: "",
      customerType: "",
      searchQuery: "",
      watchlist: "",
      nationality: "",
      channel: "",
      status: ""
    });
  };

  const isPepReport = rule.description === "Enhanced Due Diligence: PEP & Adverse Media Analytics Report";
  const isExceptionReport = rule.description === "Screening Exception Authorization & Tracking Report";

  const handleApplyFilters = () => {
    setIsFiltering(true);
    setTimeout(() => {
      setIsFiltering(false);
      setFiltersExpanded(false);
    }, 800);
  };

  const metaData = isExceptionReport ? [
    { label: "REPORT PERIOD", value: "January 1, 2026 - January 31, 2026" },
    { label: "TOTAL RECORDS", value: "2,189" },
    { label: "GENERATED DATE", value: "February 1, 2026 09:00 AM" },
    { label: "GENERATED BY", value: "Exception List Governance Team" }
  ] : isPepReport ? [
    { label: "REPORT PERIOD", value: "Jan 1, 2026 - Jan 31, 2026" },
    { label: "TOTAL RECORDS", value: "3,180" },
    { label: "GENERATED DATE", value: "Feb 1, 2026" },
    { label: "GENERATED BY", value: "PEP & Adverse Media Intelligence Unit" }
  ] : [
    { label: "REPORT PERIOD", value: "Feb 1, 2026 - Feb 28, 2026" },
    { label: "TOTAL RECORDS", value: "8,200" },
    { label: "GENERATED DATE", value: "Mar 11, 2026" },
    { label: "GENERATED BY", value: "Sanctions Officer" }
  ];

  const summaryCards = isExceptionReport ? [
    { label: "Total Active Exceptions", value: "1,847", sub: "Current" },
    { label: "Total Expired Exceptions", value: "342", sub: "All Time" },
    { label: "Exceptions Expiring Soon", value: "156", sub: "Within 30 Days" },
    { label: "New Exceptions Added", value: "214", sub: "This Period" }
  ] : isPepReport ? [
    { label: "Total PEPs Identified", value: "342", sub: "100%" },
    { label: "Total Customers with PEP Exposure", value: "248", sub: "72.5%" },
    { label: "PEP Exposure Rate", value: "7.8%", sub: "of 3,180 screened" },
    { label: "Customers with Adverse Media", value: "157", sub: "45.9%" }
  ] : [
    { label: "Total Hits Screened", value: "8,200", sub: "100%" },
    { label: "Confirmed Hits", value: "8,150", sub: "99.39%" },
    { label: "New Exposure Hits", value: "2,100", sub: "25.61%" },
    { label: "Recurring Hits", value: "6,100", sub: "74.39%" }
  ];

  const classificationTable = isExceptionReport ? [
    { label: "OFAC SDN List", count: "487", pct: "26.40%" },
    { label: "EU Consolidated List", count: "312", pct: "16.90%" },
    { label: "UN Consolidated List", count: "156", pct: "8.40%" },
    { label: "Dow Jones Watchlist", count: "456", pct: "24.70%" },
    { label: "LSEG World-Check", count: "288", pct: "15.60%" },
    { label: "UK HMT List", count: "89", pct: "4.80%" },
    { label: "Other Lists", count: "58", pct: "3.10%" }
  ] : isPepReport ? [
    { label: "Domestic PEPs", count: "212", pct: "62.00%" },
    { label: "Foreign PEPs", count: "108", pct: "31.50%" },
    { label: "International Organisation PEPs", count: "22", pct: "6.50%" }
  ] : [
    { label: "OFAC SDN", count: "4,500", pct: "54.88%" },
    { label: "UN Consolidated", count: "1,200", pct: "14.63%" },
    { label: "EU Sanctions", count: "2,500", pct: "30.49%" }
  ];

  const exceptionByCustomerTypeTable = [
    { label: "Individual", active: "1,069", expired: "198", total: "1,267" },
    { label: "Corporate", active: "658", expired: "124", total: "782" },
    { label: "Prospect", active: "120", expired: "20", total: "140" },
    { label: "Total", active: "1,847", expired: "342", total: "2,189" }
  ];

  const exceptionByNationalityTable = [
    { label: "United Arab Emirates", added: "34", active: "267", expired: "48", total: "315", pct: "14.40%" },
    { label: "Singapore", added: "28", active: "198", expired: "36", total: "234", pct: "10.70%" },
    { label: "United Kingdom", added: "25", active: "176", expired: "32", total: "208", pct: "9.50%" },
    { label: "China", added: "22", active: "156", expired: "28", total: "184", pct: "8.40%" },
    { label: "India", added: "18", active: "143", expired: "26", total: "169", pct: "7.70%" },
    { label: "United States", added: "16", active: "134", expired: "24", total: "158", pct: "7.20%" },
    { label: "Russia", added: "15", active: "112", expired: "22", total: "134", pct: "6.10%" },
    { label: "Pakistan", added: "12", active: "98", expired: "18", total: "116", pct: "5.30%" },
    { label: "Saudi Arabia", added: "10", active: "87", expired: "16", total: "103", pct: "4.70%" },
    { label: "Egypt", added: "8", active: "76", expired: "14", total: "90", pct: "4.10%" }
  ];

  const highRiskCountryTable = [
    { label: "Russia", count: "160", classification: "Sanctioned Jurisdiction" },
    { label: "Venezuela", count: "25", classification: "High-Risk Jurisdiction" },
    { label: "Iran", count: "21", classification: "Sanctioned Jurisdiction" },
    { label: "Syria", count: "12", classification: "Sanctioned Jurisdiction" }
  ];

  const adverseMediaTable = isPepReport ? [
    { label: "Corruption/Bribery", true: 62, pct: "39.49%" },
    { label: "Financial Crime/Fraud", true: 41, pct: "26.11%" },
    { label: "Money Laundering", true: 32, pct: "20.38%" },
    { label: "Terrorism/Terrorist Financing", true: 15, pct: "9.56%" },
    { label: "Sanctions Violations", true: 2, pct: "1.27%" },
    { label: "Human Rights Violations", true: 5, pct: "3.19%" }
  ] : [
    { label: "High Score (>95)", true: 12, false: 2 },
    { label: "Medium Score (85-95)", true: 5, false: 45 },
    { label: "Low Score (<85)", true: 0, false: 150 }
  ];

  const detailedRecords = isExceptionReport ? [
    { added: "15-06-2025 10:30", expiry: "15-06-2026", maker: "Sarah Johnson (SJ-2045)", checker: "Michael Chen (MC-3012)", name: "Mohammed Ahmed Al-Rashid", custId: "CU-10234", type: "Individual", list: "OFAC SDN List", details: "Name: Mohammed Ahmed Al-Rashid / Muhammad Ahmad AL-RASHID (87%); DOB: 15-Mar-1980 / 12-Mar-1978 (100%); Nationality: UAE / UAE (100%)", score: "87%", status: "Active", remarks: "False positive confirmed - DOB mismatch. Customer DOB verified as 1980 (watchlist entity 1978). Different individuals. Annual review scheduled 2026-06-15." },
    { added: "22-08-2025 14:15", expiry: "22-08-2026", maker: "David Williams (DW-1987)", checker: "Jennifer Lopez (JL-2034)", name: "Global Trading Solutions Ltd", custId: "CU-10456", type: "Corporate", list: "EU Consolidated List", details: "Name: Global Trading Solutions Ltd / Global Trade Solutions Limited (92%); Registration: GB-12345678 / GB-12345679 (85%); Address: London / London (98%)", score: "92%", status: "Active", remarks: "False positive - Registration number mismatch verified with UK Companies House. Different entity with similar name. Enhanced monitoring maintained." },
    { added: "10-11-2025 09:45", expiry: "10-11-2026", maker: "Robert Taylor (RT-3421)", checker: "Amanda White (AW-2156)", name: "Chen Wei", custId: "CU-10589", type: "Individual", list: "UN Consolidated List", details: "Name: Chen Wei / CHEN Wei (95%); Nationality: China / China (100%); DOB: 08-Jul-1985 / 08-Jul-1985 (100%)", score: "95%", status: "Active", remarks: "False positive confirmed - Age discrepancy. Customer is 40 years old, watchlist individual is 60. Supporting documentation verified. Quarterly review required." },
    { added: "05-01-2026 11:20", expiry: "05-01-2027", maker: "Emily Brown (EB-2678)", checker: "James Anderson (JA-3156)", name: "Rajesh Kumar Patel", custId: "CU-10712", type: "Individual", list: "LSEG World-Check", details: "Name: Rajesh Kumar Patel / Rajesh K Patel (78%); Nationality: Singapore / Singapore (100%); DOB: 22-Nov-1982 / 22-Nov-1981 (90%)", score: "78%", status: "Active", remarks: "False positive - DOB verified with passport and NRIC. Customer born 1982, watchlist entity 1981. Common name in Singapore. Exception approved." },
    { added: "18-09-2025 10:30", expiry: "18-09-2026", maker: "Christopher Lee (CL-2801)", checker: "Patricia Martinez (PM-3045)", name: "International Finance Corp", custId: "CU-10845", type: "Corporate", list: "UK HMT Sanctions List", details: "Name: International Finance Corp / Intl Finance Corporation (83%); Registration: CI-987654 / CI-987655 (88%); Country: Cayman Islands / Cayman Islands (100%)", score: "83%", status: "Active", remarks: "False positive - Different registration number confirmed through Cayman Islands registry. Entity verification completed with certified documents. Annual review cycle." },
    { added: "30-07-2025 13:50", expiry: "30-07-2026", maker: "Daniel Rodriguez (DR-3267)", checker: "Lisa Thompson (LT-2489)", name: "Ahmed Hassan", custId: "CU-10978", type: "Individual", list: "Dow Jones Watchlist", details: "Name: Ahmed Hassan / Ahmed Hasan (85%); Nationality: Egypt / Egypt (100%); DOB: 12-Apr-1975 / 12-Apr-1975 (100%); Address: Cairo / Cairo (92%)", score: "85%", status: "Active", remarks: "False positive - Passport verification shows different middle name (Mohamed vs Ali). Enhanced screening confirmed distinct individual. Biannual review." },
    { added: "20-12-2025 18:15", expiry: "20-12-2026", maker: "Michelle Davis (MD-2734)", checker: "Kevin Wilson (KW-3198)", name: "Mediterranean Capital Ltd", custId: "CU-11103", type: "Corporate", list: "EU Consolidated List", details: "Name: Mediterranean Capital Ltd / Mediterranean Capital United (96%); Registration: CY-456789 / CY-456788 (82%); Country: Cyprus / Cyprus (100%)", score: "96%", status: "Active", remarks: "False positive - Single digit registration number difference. Verified as different entity through Cyprus registry and incorporation documents. Enhanced due diligence completed." },
    { added: "12-01-2026 15:40", expiry: "12-01-2027", maker: "Brian Moore (BM-3421)", checker: "Rebecca Garcia (RG-2987)", name: "Aung San Kyaw", custId: "CU-11256", type: "Individual", list: "Dow Jones Watchlist", details: "Name: Aung San Kyaw (90%); Nationality: Myanmar (100%); DOB: 15-Jun-1988 (100%)", score: "90%", status: "Active", remarks: "False positive confirmed - Distinct individual from Myanmar political figure. Verified with official ID and background checks. Quarterly monitoring active." }
  ] : isPepReport ? [
    { date: "01-01-2026", type: "Incremental", cust: "Individual", name: "Alexei Petrov", watch: "Dow Jones", score: "96%", status: "Current", branch: "Russia", dept: "Foreign PEP", remarks: "HIGH RISK... Corruption allegations regarding offshore companies." },
    { date: "04-01-2026", type: "Online", cust: "Corporate", name: "Global Logistics Ltd", watch: "World-Check", score: "94%", status: "Current", branch: "Cayman Is.", dept: "Foreign PEP (UBO)", remarks: "STEP-BY-STEP... UBO identified from shell companies." },
    { date: "12-01-2026", type: "Manual", cust: "Individual", name: "Dr. Hassan Mansour", watch: "Dow Jones", score: "89%", status: "Current", branch: "UAE", dept: "Domestic PEP", remarks: "MEDIUM RISK... Former member of UAE Federal National Council." },
    { date: "15-01-2026", type: "Incremental", cust: "Individual", name: "Mohammed Reza", watch: "World-Check", score: "92%", status: "Current", branch: "Iran", dept: "Foreign PEP", remarks: "CRITICAL RISK... Senior official linked to nuclear programs." },
    { date: "18-01-2026", type: "Online", cust: "Individual", name: "David Wong", watch: "Dow Jones", score: "85%", status: "Current", branch: "Singapore", dept: "Domestic PEP", remarks: "LOW-MEDIUM RISK... Minister of State, Singapore." },
    { date: "22-01-2026", type: "Incremental", cust: "Individual", name: "Myat Hein", watch: "World-Check", score: "88%", status: "Current", branch: "Myanmar", dept: "Foreign PEP (Dir)", remarks: "CRITICAL RISK... Director identified as General in Myanmar Junta." },
    { date: "25-01-2026", type: "Manual", cust: "Individual", name: "Maria Dubois", watch: "Dow Jones", score: "83%", status: "Former", branch: "France", dept: "Domestic PEP", remarks: "MEDIUM RISK... Former Mayor of Marseille, France." },
    { date: "28-01-2026", type: "Online", cust: "Individual", name: "Fatima Al-Kuwari", watch: "World-Check", score: "87%", status: "Current", branch: "Qatar", dept: "Foreign PEP", remarks: "MEDIUM RISK... Minister of Education, Qatar." },
    { date: "30-01-2026", type: "Incremental", cust: "Individual", name: "Vladimir Orlov", watch: "Dow Jones", score: "91%", status: "Current", branch: "Russia", dept: "Foreign PEP", remarks: "HIGH RISK... Deputy Governor, Central Bank of Russia." },
    { date: "31-01-2026", type: "Online", cust: "Corporate", name: "Oriental Fabrics SA", watch: "World-Check", score: "84%", status: "Current", branch: "Venezuela", dept: "Foreign PEP (UBO)", remarks: "CRITICAL RISK... UBO linked to narcotics trafficking." }
  ] : [
    { date: "2025-02-10", type: "FORWARD", cust: "Individual", watch: "OFAC SDN", name: "Michael Chen", score: "96.5%", status: "TRUE MATCH", branch: "NYC-01", dept: "Retail" },
    { date: "2025-02-15", type: "INCREMENTAL", cust: "Entity", watch: "EU Sanctions", name: "Global Logistics SA", score: "88.2%", status: "FALSE POSITIVE", branch: "DXB-88", dept: "Corporate" },
    { date: "2025-02-18", type: "REVERSE", cust: "Individual", watch: "UN Consolidated", name: "Sarah Jenkins", score: "91.8%", status: "TRUE MATCH", branch: "LON-05", dept: "Private Banking" },
    { date: "2025-02-22", type: "FORWARD", cust: "Entity", watch: "UK HMT", name: "Apex Trading Ltd", score: "84.5%", status: "FALSE POSITIVE", branch: "SIN-11", dept: "Trade Finance" }
  ];
  
  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900/50">
      {/* Top Navigation Bar */}
      <div className="flex-none bg-white dark:bg-gray-900 border-b border-[#DDE1E6] px-6 py-2.5">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <ArrowLeft className="w-4 h-4 text-[#525252]" />
              <span className="text-[14px] font-medium text-[#525252]">Back</span>
            </button>
            <div className="w-[1px] h-4 bg-[#DDE1E6]" />
            <span className="text-[14px] font-bold text-[#2A53A0]">Report Details</span>
          </div>

          <div className="flex items-center gap-1.5 text-[14px] font-medium">
            <span className="text-[#2A53A0] cursor-pointer hover:underline">Sanction Screening</span>
            <span className="text-[#A8A8A8] mx-0.5">/</span>
            <span className="text-[#2A53A0] cursor-pointer hover:underline">Sanction MIS Reports</span>
            <span className="text-[#A8A8A8] mx-0.5">/</span>
            <span className="text-[#161616]">{isExceptionReport ? "Exception List Governance & Accountability Report" : isPepReport ? "Politically Exposed Persons & Negative News Screening Report" : rule.description}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto no-scrollbar">
        <div className="w-full p-4 flex flex-col gap-4">
          
          {/* Title and Export Buttons Row */}
          <div className="flex items-center justify-between">
            <h1 className="text-[26px] font-bold text-[#2A53A0] leading-tight">
              {isExceptionReport ? "Exception List Governance & Accountability Report" : isPepReport ? "Politically Exposed Persons & Negative News Screening Report" : rule.description}
            </h1>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2 bg-white h-[44px] text-[13px] border-[#DDE1E6] hover:bg-blue-50 text-[#2A53A0] rounded-[8px] font-medium px-4 shadow-sm">
                <Download className="w-4 h-4 text-[#2A53A0]" />
                Export PDF
              </Button>
              <Button variant="outline" className="gap-2 bg-white h-[44px] text-[13px] border-[#DDE1E6] hover:bg-blue-50 text-[#2A53A0] rounded-[8px] font-medium px-4 shadow-sm">
                <Download className="w-4 h-4 text-[#2A53A0]" />
                Export Excel
              </Button>
            </div>
          </div>

          {/* Report Meta Data Details Section */}
          <div className="bg-[#FFFFFF] dark:bg-gray-900 border border-[#DDE1E6] dark:border-gray-800 rounded-[8px] p-4 shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
            <div className="grid grid-cols-4 gap-8">
              {metaData.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                  <div className="text-[10px] font-semibold text-[#A8A8A8] uppercase tracking-widest">{item.label}</div>
                  <div className="text-[16px] font-bold text-[#161616] dark:text-white leading-tight">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-[#DDE1E6] bg-white dark:bg-gray-900 rounded-[8px] overflow-hidden transition-all duration-300">
            <button
              onClick={() => setFiltersExpanded(!filtersExpanded)}
              className="w-full flex items-center justify-between p-4 hover:bg-[#f4f4f4] transition-colors"
            >
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-[#2A53A0]" />
                <span className="font-bold text-[#161616] text-[15px] tracking-wide">Report Filters</span>
              </div>
              <motion.div
                animate={{ rotate: filtersExpanded ? 0 : -90 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-[#161616]" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {filtersExpanded && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[16px] font-semibold text-[#333333]">Date Range</Label>
                        <div className="flex items-center gap-2">
                          <div className="relative flex-1">
                            <Input 
                              type="text" 
                              placeholder="dd-mm-yyyy" 
                              value={filterValues.dateFrom}
                              onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
                              className="bg-white border-[#DDE1E6] !h-[46px] !min-h-[46px] !max-h-[46px] rounded-[8px] text-[14px] pr-10 focus-visible:ring-[#2A53A0]" style={{ height: '46px' }} 
                            />
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525252]" />
                          </div>
                          <span className="text-[#DDE1E6]">-</span>
                          <div className="relative flex-1">
                            <Input 
                              type="text" 
                              placeholder="dd-mm-yyyy" 
                              value={filterValues.dateTo}
                              onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                              className="bg-white border-[#DDE1E6] !h-[46px] !min-h-[46px] !max-h-[46px] rounded-[8px] text-[14px] pr-10 focus-visible:ring-[#2A53A0]" style={{ height: '46px' }} 
                            />
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525252]" />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[16px] font-semibold text-[#333333]">Screening Type</Label>
                        <Select value={filterValues.screeningType} onValueChange={(val) => handleFilterChange("screeningType", val)}>
                          <SelectTrigger className="bg-white border-[#DDE1E6] !h-[46px] !min-h-[46px] !max-h-[46px] rounded-[8px] text-[14px] focus:ring-[#2A53A0] w-full flex items-center px-3" style={{ height: '46px' }}>
                            <SelectValue placeholder="Select Types" />
                          </SelectTrigger>
                          <SelectContent className="rounded-[8px]">
                            <SelectItem value="online">Online</SelectItem>
                            <SelectItem value="incremental">Incremental/Batch</SelectItem>
                            <SelectItem value="manual">Manual (Ad-hoc)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[16px] font-semibold text-[#333333]">Customer/Prospect Type</Label>
                        <Select value={filterValues.customerType} onValueChange={(val) => handleFilterChange("customerType", val)}>
                          <SelectTrigger className="bg-white border-[#DDE1E6] !h-[46px] !min-h-[46px] !max-h-[46px] rounded-[8px] text-[14px] focus:ring-[#2A53A0] w-full flex items-center px-3" style={{ height: '46px' }}>
                            <SelectValue placeholder="Select Types" />
                          </SelectTrigger>
                          <SelectContent className="rounded-[8px]">
                            <SelectItem value="individual">Individual</SelectItem>
                            <SelectItem value="corporate">Corporate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[16px] font-semibold text-[#333333]">Customer Id / Name / Hit Id</Label>
                        <Input 
                          type="text" 
                          placeholder="Enter ID or Name" 
                          value={filterValues.searchQuery}
                          onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
                          className="bg-white border-[#DDE1E6] !h-[46px] !min-h-[46px] !max-h-[46px] rounded-[8px] text-[14px] focus-visible:ring-[#2A53A0]" style={{ height: '46px' }} 
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[16px] font-semibold text-[#333333]">Watchlist Name</Label>
                        <Select value={filterValues.watchlist} onValueChange={(val) => handleFilterChange("watchlist", val)}>
                          <SelectTrigger className="bg-white border-[#DDE1E6] !h-[46px] !min-h-[46px] !max-h-[46px] rounded-[8px] text-[14px] focus:ring-[#2A53A0] w-full flex items-center px-3" style={{ height: '46px' }}>
                            <SelectValue placeholder="Select Lists" />
                          </SelectTrigger>
                          <SelectContent className="rounded-[8px]">
                            <SelectItem value="worldcheck">World Check</SelectItem>
                            <SelectItem value="dowjones">Dow Jones</SelectItem>
                            <SelectItem value="ofac">OFAC SDN</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[16px] font-semibold text-[#333333]">{isPepReport ? "Nationality" : "Branch Code"}</Label>
                        <Select value={filterValues.nationality} onValueChange={(val) => handleFilterChange("nationality", val)}>
                          <SelectTrigger className="bg-white border-[#DDE1E6] !h-[46px] !min-h-[46px] !max-h-[46px] rounded-[8px] text-[14px] focus:ring-[#2A53A0] w-full flex items-center px-3" style={{ height: '46px' }}>
                            <SelectValue placeholder={isPepReport ? "Select Nationality" : "Select Branch"} />
                          </SelectTrigger>
                          <SelectContent className="rounded-[8px]">
                            {isPepReport ? (
                              <>
                                <SelectItem value="russia">Russia</SelectItem>
                                <SelectItem value="uae">United Arab Emirates</SelectItem>
                                <SelectItem value="iran">Iran</SelectItem>
                              </>
                            ) : (
                              <>
                                <SelectItem value="nyc">NYC-01</SelectItem>
                                <SelectItem value="lon">LON-05</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[16px] font-semibold text-[#333333]">Channel</Label>
                        <Select value={filterValues.channel} onValueChange={(val) => handleFilterChange("channel", val)}>
                          <SelectTrigger className="bg-white border-[#DDE1E6] !h-[46px] !min-h-[46px] !max-h-[46px] rounded-[8px] text-[14px] focus:ring-[#2A53A0] w-full flex items-center px-3" style={{ height: '46px' }}>
                            <SelectValue placeholder="Select Channel" />
                          </SelectTrigger>
                          <SelectContent className="rounded-[8px]">
                            <SelectItem value="online">Online</SelectItem>
                            <SelectItem value="branch">Branch</SelectItem>
                            <SelectItem value="mobile">Mobile App</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[16px] font-semibold text-[#333333]">Screening Status</Label>
                        <Select value={filterValues.status} onValueChange={(val) => handleFilterChange("status", val)}>
                          <SelectTrigger className="bg-white border-[#DDE1E6] !h-[46px] !min-h-[46px] !max-h-[46px] rounded-[8px] text-[14px] focus:ring-[#2A53A0] w-full flex items-center px-3" style={{ height: '46px' }}>
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent className="rounded-[8px]">
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                            <SelectItem value="true_match">True Match</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                      <ShimmerButton 
                        isLoading={isFiltering}
                        onClick={handleApplyFilters}
                        disabled={!isFilterApplied || isFiltering}
                        className={`h-[46px] px-12 rounded-[8px] text-[14px] shadow-sm font-bold tracking-wider transition-all duration-200 ${
                          !isFilterApplied 
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300" 
                            : "bg-[#2A53A0] hover:bg-[#2A53A0]/90 text-white cursor-pointer shadow-md active:transform active:scale-95"
                        }`}
                      >
                        Apply Filters
                      </ShimmerButton>
                      <Button 
                        variant="outline" 
                        onClick={handleResetFilters}
                        disabled={!isFilterApplied || isFiltering}
                        className={`h-[46px] px-12 rounded-[8px] text-[14px] font-bold tracking-wider transition-all duration-200 ${
                          !isFilterApplied
                            ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50/50"
                            : "text-[#161616] border-[#DDE1E6] bg-white hover:bg-gray-50 cursor-pointer shadow-sm active:transform active:scale-95"
                        }`}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!isExceptionReport && (
            <div className="grid grid-cols-4 gap-4">
              {summaryCards.map((card, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-900 border border-[#DDE1E6] border-l-4 border-l-[#2A53A0] rounded-[8px] p-4 shadow-sm">
                  <div className="text-[12px] font-medium text-[#525252] mb-3">{card.label}</div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-[28px] font-bold text-[#161616] dark:text-white leading-none">{card.value}</div>
                    <div className="text-[12px] font-medium text-[#525252]">{card.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {isExceptionReport && (
            <div className="space-y-6">
               <div className="bg-white dark:bg-gray-900 border border-[#DDE1E6] rounded-[8px] overflow-hidden shadow-sm">
                  <div className="px-4 py-3 bg-[#f8f9fa] border-b border-[#DDE1E6]">
                    <h3 className="text-[14px] font-bold text-[#161616] uppercase tracking-wider">EXECUTIVE SUMMARY</h3>
                  </div>
                  <table className="w-full text-left text-[13px]">
                    <thead className="bg-[#defbe6] text-[#161616]">
                      <tr className="border-b border-[#DDE1E6]">
                        <th className="px-4 py-2 font-bold w-2/3">Metric</th>
                        <th className="px-4 py-2 font-bold text-right">Count</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DDE1E6]">
                      {[
                        { label: "Total Active Exceptions (Current)", value: "1,847" },
                        { label: "Total Expired Exceptions", value: "342" },
                        { label: "Exceptions Expiring Within 30 Days", value: "156" },
                        { label: "New Exceptions Added (This Period)", value: "214" },
                        { label: "Exceptions Removed (This Period)", value: "89" }
                      ].map((row, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-4 py-2 text-[#525252]">{row.label}</td>
                          <td className="px-4 py-2 text-right font-bold text-[#161616]">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>

               <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-900 border border-[#DDE1E6] rounded-[8px] overflow-hidden shadow-sm">
                    <div className="px-4 py-3 border-b border-[#DDE1E6]">
                      <h3 className="text-[14px] font-bold text-[#161616]">Exception Distribution by Watchlist</h3>
                    </div>
                    <table className="w-full text-left text-[13px]">
                      <thead className="bg-[#defbe6] text-[#161616]">
                        <tr className="border-b border-[#DDE1E6]">
                          <th className="px-4 py-2 font-bold">Watchlist</th>
                          <th className="px-4 py-2 font-bold text-right">Exception Count</th>
                          <th className="px-4 py-2 font-bold text-right">Percentage</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#DDE1E6]">
                        {classificationTable.map((row, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-4 py-2 text-[#525252]">{row.label}</td>
                            <td className="px-4 py-2 text-right text-[#161616]">{row.count}</td>
                            <td className="px-4 py-2 text-right text-[#161616]">{row.pct}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-white dark:bg-gray-900 border border-[#DDE1E6] rounded-[8px] overflow-hidden shadow-sm">
                    <div className="px-4 py-3 border-b border-[#DDE1E6]">
                      <h3 className="text-[14px] font-bold text-[#161616]">Exception Distribution by Customer Type</h3>
                    </div>
                    <table className="w-full text-left text-[13px]">
                      <thead className="bg-[#defbe6] text-[#161616]">
                        <tr className="border-b border-[#DDE1E6]">
                          <th className="px-4 py-2 font-bold">Customer Type</th>
                          <th className="px-4 py-2 font-bold text-right">Active Exceptions</th>
                          <th className="px-4 py-2 font-bold text-right">Expired Exceptions</th>
                          <th className="px-4 py-2 font-bold text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#DDE1E6]">
                        {exceptionByCustomerTypeTable.map((row, idx) => (
                          <tr key={idx} className={`hover:bg-gray-50 ${row.label === 'Total' ? 'bg-gray-50 font-bold' : ''}`}>
                            <td className="px-4 py-2 text-[#525252]">{row.label}</td>
                            <td className="px-4 py-2 text-right text-[#161616]">{row.active}</td>
                            <td className="px-4 py-2 text-right text-[#161616]">{row.expired}</td>
                            <td className="px-4 py-2 text-right text-[#161616]">{row.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
               </div>

               <div className="bg-white dark:bg-gray-900 border border-[#DDE1E6] rounded-[8px] overflow-hidden shadow-sm">
                  <div className="px-4 py-3 border-b border-[#DDE1E6]">
                    <h3 className="text-[14px] font-bold text-[#161616]">Exceptions by Customer Nationality (Top 10)</h3>
                  </div>
                  <table className="w-full text-left text-[13px]">
                    <thead className="bg-[#defbe6] text-[#161616]">
                      <tr className="border-b border-[#DDE1E6]">
                        <th className="px-4 py-2 font-bold">Nationality</th>
                        <th className="px-4 py-2 font-bold text-right">Exceptions Added This Period</th>
                        <th className="px-4 py-2 font-bold text-right">Active Exceptions</th>
                        <th className="px-4 py-2 font-bold text-right">Expired Exceptions</th>
                        <th className="px-4 py-2 font-bold text-right">Total</th>
                        <th className="px-4 py-2 font-bold text-right">% of Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DDE1E6]">
                      {exceptionByNationalityTable.map((row, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-4 py-2 text-[#525252] font-medium">{row.label}</td>
                          <td className="px-4 py-2 text-right text-[#161616]">{row.added}</td>
                          <td className="px-4 py-2 text-right text-[#161616]">{row.active}</td>
                          <td className="px-4 py-2 text-right text-[#161616]">{row.expired}</td>
                          <td className="px-4 py-2 text-right text-[#161616]">{row.total}</td>
                          <td className="px-4 py-2 text-right text-[#161616]">{row.pct}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
            </div>
          )}

          {isPepReport && (
             <div className="grid grid-cols-4 gap-4">
               {[
                 { label: "Domestic PEPs", value: "212", sub: "62.00%" },
                 { label: "Foreign PEPs", value: "108", sub: "31.50%" },
                 { label: "International Org PEPs", value: "22", sub: "6.50%" },
                 { label: "Total PEPs Identified", value: "342", sub: "100%" }
               ].map((card, idx) => (
                 <div key={idx} className="bg-[#F4F7FB] dark:bg-gray-800 border border-[#DDE1E6] rounded-[8px] p-4 flex items-center justify-between">
                   <div className="flex flex-col">
                     <span className="text-[11px] font-bold text-[#525252] uppercase">{card.label}</span>
                     <span className="text-[20px] font-bold text-[#161616] dark:text-white">{card.value}</span>
                   </div>
                   <div className="text-[14px] font-bold text-[#2A53A0]">{card.sub}</div>
                 </div>
               ))}
             </div>
          )}

          {!isExceptionReport && (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-900 border border-[#DDE1E6] rounded-[8px] overflow-hidden shadow-sm">
                <div className="px-4 py-4 border-b border-[#DDE1E6]">
                  <h3 className="text-[14px] font-bold text-[#2A53A0]">{isPepReport ? "PEPs Linked to High-Risk Countries" : "Exposure by List Source Distribution"}</h3>
                </div>
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-gray-50 text-[14px] font-medium text-[#2A53A0] tracking-wider">
                    <tr className="border-b border-[#DDE1E6]">
                      <th className="px-4 py-3 font-medium">{isPepReport ? "High-Risk Country" : "List Source"}</th>
                      <th className="px-4 py-3 font-medium text-right">{isPepReport ? "PEP Count" : "Count"}</th>
                      <th className="px-4 py-3 font-medium text-right">{isPepReport ? "Risk Classification" : "Exposure %"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DDE1E6] text-[#161616]">
                    {(isPepReport ? highRiskCountryTable : classificationTable).map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium">{row.label}</td>
                        <td className="px-4 py-3 text-right">{row.count}</td>
                        <td className="px-4 py-3 text-right">{isPepReport ? (row as any).classification : (row as any).pct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-white dark:bg-gray-900 border border-[#DDE1E6] rounded-[8px] overflow-hidden shadow-sm">
                <div className="px-4 py-4 border-b border-[#DDE1E6]">
                  <h3 className="text-[14px] font-bold text-[#2A53A0]">{isPepReport ? "Adverse Media Category Distribution" : "Hit Resolution Status Distribution"}</h3>
                </div>
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-gray-50 text-[14px] font-medium text-[#2A53A0] tracking-wider">
                    <tr className="border-b border-[#DDE1E6]">
                      <th className="px-4 py-3 font-medium">{isPepReport ? "Adverse Media Category" : "Status"}</th>
                      <th className="px-4 py-3 font-medium text-right">Count</th>
                      <th className="px-4 py-3 font-medium text-right">{isPepReport ? "Percentage" : (isPepReport ? "Exposure %" : "False Positive")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DDE1E6] text-[#161616]">
                    {adverseMediaTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium">{row.label}</td>
                        <td className="px-4 py-3 text-right">{row.true}</td>
                        <td className="px-4 py-3 text-right">
                          {isPepReport ? (row as any).pct : (row as any).false}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-[#2A53A0] tracking-wider">{isExceptionReport ? "DETAILED EXCEPTION LIST RECORDS" : isPepReport ? "DETAILED PEP & ADVERSE MEDIA SCREENING RECORDS" : "Detailed Hit Records"}</h2>
              <span className="text-[11px] text-[#525252] font-medium">Showing records from {isExceptionReport || isPepReport ? "January 2026" : "All Time"}</span>
            </div>
            
            {isExceptionReport && (
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-[14px] font-bold text-[#161616]">ACTIVE EXCEPTIONS</h3>
              </div>
            )}

            <div className="bg-white border border-[#DDE1E6] rounded-[8px] overflow-hidden shadow-sm overflow-x-auto">
              <table className="w-full text-left text-[12px]">
                <thead className={`${isExceptionReport ? 'bg-[#defbe6]' : 'bg-gray-50'} text-[13px] font-medium ${isExceptionReport ? 'text-[#161616]' : 'text-[#2A53A0]'} tracking-wider`}>
                  <tr className="border-b border-[#DDE1E6]">
                    {isExceptionReport ? (
                      <>
                        <th className="px-4 py-3 font-bold whitespace-nowrap">Added to Exception List</th>
                        <th className="px-4 py-3 font-bold whitespace-nowrap">Exception Expiry Date</th>
                        <th className="px-4 py-3 font-bold whitespace-nowrap">Maker (User ID)</th>
                        <th className="px-4 py-3 font-bold whitespace-nowrap">Checker (User ID)</th>
                        <th className="px-4 py-3 font-bold whitespace-nowrap">Customer/Prospect Name</th>
                        <th className="px-4 py-3 font-bold whitespace-nowrap">Customer ID</th>
                        <th className="px-4 py-3 font-bold whitespace-nowrap">Customer Type</th>
                        <th className="px-4 py-3 font-bold whitespace-nowrap">Sanction List Name</th>
                        <th className="px-4 py-3 font-bold min-w-[300px]">Matched Parameter Details</th>
                        <th className="px-4 py-3 font-bold whitespace-nowrap">Match Score</th>
                        <th className="px-4 py-3 font-bold whitespace-nowrap">Exception Status</th>
                        <th className="px-4 py-3 font-bold min-w-[350px]">User Remarks</th>
                      </>
                    ) : (
                      <>
                        <th className="px-4 py-3 font-medium whitespace-nowrap">{isPepReport ? "Screening Date" : "Hit Date"}</th>
                        <th className="px-4 py-3 font-medium whitespace-nowrap">Type</th>
                        <th className="px-4 py-3 font-medium whitespace-nowrap">Cust Type</th>
                        <th className="px-4 py-3 font-medium whitespace-nowrap">Customer Name</th>
                        <th className="px-4 py-3 font-medium whitespace-nowrap">{isPepReport ? "Nationality" : "Watchlist"}</th>
                        <th className="px-4 py-3 font-medium whitespace-nowrap">{isPepReport ? "PEP Status" : "Match Score"}</th>
                        <th className="px-4 py-3 font-medium whitespace-nowrap">{isPepReport ? "PEP Classification" : "Status"}</th>
                        <th className="px-4 py-3 font-medium whitespace-nowrap">{isPepReport ? "Watchlist" : "Branch"}</th>
                        <th className="px-4 py-3 font-medium whitespace-nowrap">Match Score</th>
                        <th className="px-4 py-3 font-medium min-w-[300px]">Remarks</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDE1E6]">
                  {detailedRecords.map((row: any, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      {isExceptionReport ? (
                        <>
                          <td className="px-4 py-4 text-[#161616] whitespace-nowrap align-top font-medium">{row.added}</td>
                          <td className="px-4 py-4 text-[#161616] whitespace-nowrap align-top font-medium">{row.expiry}</td>
                          <td className="px-4 py-4 text-[#525252] whitespace-nowrap align-top">{row.maker}</td>
                          <td className="px-4 py-4 text-[#525252] whitespace-nowrap align-top">{row.checker}</td>
                          <td className="px-4 py-4 text-[#161616] font-bold align-top">{row.name}</td>
                          <td className="px-4 py-4 text-[#2A53A0] align-top">{row.custId}</td>
                          <td className="px-4 py-4 text-[#161616] align-top">{row.type}</td>
                          <td className="px-4 py-4 text-[#161616] align-top">{row.list}</td>
                          <td className="px-4 py-4 text-[#525252] text-[11px] leading-relaxed align-top max-w-[400px]">
                             {row.details.split(';').map((detail: string, i: number) => (
                               <div key={i} className="mb-1">{detail.trim()}</div>
                             ))}
                          </td>
                          <td className="px-4 py-4 text-[#161616] font-bold align-top">{row.score}</td>
                          <td className="px-4 py-4 align-top">
                             <span className="bg-[#defbe6] text-[#198038] text-[10px] font-bold px-2 py-1 border border-[#198038]/20 rounded-[2px]">
                                {row.status}
                             </span>
                          </td>
                          <td className="px-4 py-4 text-[#525252] text-[11px] leading-relaxed align-top italic">
                            {row.remarks}
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-3 text-[#161616] whitespace-nowrap">{row.date}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="bg-[#F4F4F4] text-[#525252] text-[10px] font-bold px-1.5 py-0.5 border border-[#DDE1E6]">
                              {row.type}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-[#2A53A0] font-medium whitespace-nowrap">{row.cust}</td>
                          <td className="px-4 py-3 font-bold text-[#161616] whitespace-nowrap">{row.name}</td>
                          <td className="px-4 py-3 text-[#161616] whitespace-nowrap">{row.branch}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                             <span className="text-[#161616]">{isPepReport ? row.status : row.score}</span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`text-[10px] font-bold text-white px-2 py-1 rounded-[2px] ${isPepReport ? 'bg-[#2A53A0]' : (row.status === 'TRUE MATCH' ? 'bg-[#FF0000]' : 'bg-[#FF8A00]')}`}>
                              {isPepReport ? row.dept : row.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-[#525252] whitespace-nowrap">{isPepReport ? row.watch : row.branch}</td>
                          <td className="px-4 py-3 text-[#161616] whitespace-nowrap">{row.score}</td>
                          <td className="px-4 py-3 text-[#525252] text-[11px] leading-relaxed">{row.remarks || row.dept}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
             <InlineNotification title="Regulatory Guidance & Definitions" kind="brand">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                 <div className="space-y-3">
                   <div className="flex gap-2 items-start">
                     <span className="font-bold text-[#da1e28] whitespace-nowrap text-xs bg-red-50 px-1 border border-red-100">{isPepReport ? "[PEP]" : "[True Match]"}</span>
                     <span className="text-xs text-[#525252]">{isPepReport ? "Indicates a Politically Exposed Person. Requires enhanced due diligence (EDD) and source of wealth verification." : "Indicates an exact identity match against a regulatory watchlist. Requires immediate isolation and investigation."}</span>
                   </div>
                   <div className="flex gap-2 items-start">
                     <span className="font-bold text-[#ff8a00] whitespace-nowrap text-xs bg-orange-50 px-1 border border-orange-100">{isPepReport ? "[Adverse Media]" : "[False Positive]"}</span>
                     <span className="text-xs text-[#525252]">{isPepReport ? "Matches against negative news sources. Must be evaluated for reputational and financial crime risk." : "Indicates a phonetic or partial identity match. Must be documented and resolved with supporting evidence."}</span>
                   </div>
                 </div>
                 <div className="space-y-3">
                   <div className="flex gap-2 items-start text-xs text-[#525252]">
                     <span className="text-[#2A53A0] font-bold">•</span>
                     <span>{isPepReport ? "PEP classification follows Wolfsberg Group and FATF recommendations for risk-based assessment." : "Average match score threshold for this report is configured at 85% to minimize alert fatigue."}</span>
                   </div>
                   <div className="flex gap-2 items-start text-xs text-[#525252]">
                     <span className="text-[#2A53A0] font-bold">•</span>
                     <span>All hit events are logged for full audit traceability in accordance with Deep Enterprise Security protocols.</span>
                   </div>
                 </div>
               </div>
             </InlineNotification>
           </div>
        </div>
      </div>
    </div>
  );
}
