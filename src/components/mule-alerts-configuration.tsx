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
  Close
} from "@carbon/icons-react";
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

interface MuleAlertsConfigurationProps {
  breadcrumbs?: any[];
  onBreadcrumbNavigate?: (path: string) => void;
}

interface AlertRule {
  id: string;
  description: string;
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
  "Money Mule: Large transactions being done in Tiny OD (OverDraft) accounts.",
  "High Number of Transactions in newly opened accounts with probable nature of mule accounts and shell firms/companies.",
  "Frequent high value transactions in an account with cyber holds.",
  "High activity in accounts opened with Contact Point Verification (CPV) and Udyam Registration Number (URN).",
  "Money Mule: Large UPI transactions through UPI channel (P2M) in wallets relating to Online Gaming.",
  "High volume transactions in small accounts and inoperative accounts of suspected money mules.",
  "Money Mule: Sudden Increase in number and volume of credits in Shelf accounts..",
  "High value debit and credit transactions through digital channels in accounts after change in mobile number, without substantial increase in account balance. (SBI)",
  "Change in Home branch through alternate channels followed by high volume transactions in account. (SBI)",
  "CASA Account with Low Balance & Multiple Small Credits Followed by Withdrawals.",
  "Unusual Transactions Based on Frequent Debits & Credits.",
  "Pattern Repeating in the Last 5 Days.",
  "Overseas IP Transactions.",
  "Transactions from Hotspot Regions.",
  "Monitoring Current Accounts - High Transaction Value vs Declared Income.",
  "Monitoring Sole Proprietorship Firms with Udyam Registration.",
  "Monitoring ATM Transactions from Outside the State."
];

const generateRulesData = (): AlertRule[] => {
  return rawRules.map((desc, index) => {
    let parameters = "Account Age: < 30 Days, Transaction Velocity: High, Risk Score: > 80";
    
    if (desc.includes("Tiny OD (OverDraft) accounts")) {
      parameters = "Minimum Threshold: > 100000, Minimum Frequency: > 5, Product Code: OD-SMALL-GEN";
    }

    return {
      id: `MA-${(index + 1).toString().padStart(3, '0')}`,
      description: desc,
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

export function MuleAlertsConfiguration({ breadcrumbs, onBreadcrumbNavigate }: MuleAlertsConfigurationProps) {
  const [currentView, setCurrentView] = useState<"list" | "view" | "edit">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [selectedRule, setSelectedRule] = useState<AlertRule | null>(null);
  const [rules, setRules] = useState<AlertRule[]>(generateRulesData());

  const filteredRules = rules.filter(rule => 
    rule.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rule.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { items: sortedRules, requestSort, sortConfig } = useSortableData(filteredRules);

  const totalItems = sortedRules.length;
  // const totalPages = Math.ceil(totalItems / pageSize); // Handled by CarbonPaginationFooter logic internally usually or derived here
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

  if (currentView === "view" && selectedRule) {
    return (
      <div className="flex flex-col h-full bg-white dark:bg-gray-900/50 p-4">
        {/* Header */}
        <div className="flex-none pb-4 flex items-center justify-between">
           <div className="flex items-center gap-2">
             <Button variant="ghost" size="icon" onClick={() => setCurrentView("list")} className="hover:bg-gray-200 dark:hover:bg-gray-800">
               <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
             </Button>
             <div>
               <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                 Rule Details
                 <Badge variant="outline" className="ml-2 bg-gray-100 text-gray-600 font-mono text-xs">{selectedRule.id}</Badge>
               </h2>
             </div>
           </div>
           <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleEditRule(selectedRule)} className="gap-2 bg-white h-[46px]">
                <Edit className="w-4 h-4" />
                Edit Rule
              </Button>
              <Button variant="outline" className="gap-2 bg-white text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 h-[46px]">
                <TrashCan className="w-4 h-4" />
                Delete
              </Button>
           </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm p-6">
           <div className="w-full space-y-8">
              {/* Top Section: Description */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Rule Description</h3>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-100 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                   {selectedRule.description}
                </div>
              </div>

              {/* Grid Section: Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-6">
                    <div>
                       <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Category</h3>
                       <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedRule.category}</p>
                    </div>
                    <div>
                       <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Severity Level</h3>
                       <Badge variant="outline" className={`
                          ${selectedRule.severity === 'High' ? 'bg-red-50 text-red-700 border-red-200' : 
                            selectedRule.severity === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                            'bg-blue-50 text-blue-700 border-blue-200'} px-3 py-1 text-xs
                       `}>
                          {selectedRule.severity}
                       </Badge>
                    </div>
                    <div>
                       <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Current Status</h3>
                       <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${selectedRule.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedRule.status}</span>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div>
                       <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Last Updated</h3>
                       <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedRule.lastUpdated}</p>
                    </div>
                    <div>
                       <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Effective Date Range</h3>
                       <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white font-medium">
                          <span>{selectedRule.fromDate}</span>
                          <span className="text-gray-400">to</span>
                          <span>{selectedRule.toDate}</span>
                       </div>
                    </div>
                    <div>
                       <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Risk Score Impact</h3>
                       <div className="flex items-center gap-2">
                          <div className="h-2 w-32 bg-gray-100 rounded-full overflow-hidden">
                             <div className="h-full bg-[#2A53A0]" style={{ width: `${selectedRule.score}%` }}></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{selectedRule.score}/100</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <div>
                     <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Parameters</h3>
                     <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700">
                        <ul className="space-y-2">
                          {selectedRule.parameters.split(',').map((param, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 font-mono">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#2A53A0]"></span>
                              {param.trim()}
                            </li>
                          ))}
                        </ul>
                     </div>
                  </div>
                  <div>
                     <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Threshold Logic</h3>
                     <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700 font-mono text-sm text-gray-700 dark:text-gray-300 leading-relaxed min-h-[100px]">
                        {selectedRule.threshold}
                     </div>
                  </div>
              </div>
           </div>
        </div>
      </div>
    );
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
    <div className="flex flex-col h-full bg-white dark:bg-gray-900/50 p-4">
      {/* Header Actions */}
      <div className="flex-none pb-4">
        <div className="flex items-center justify-between">
          {/* Search */}
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search rules..." 
              className="pl-9 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus-visible:ring-[#2A53A0]"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
          
          <div className="flex items-center gap-3 ml-4">
            <Button variant="outline" className="gap-2 bg-white dark:bg-gray-900 h-[46px]">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button className="gap-2 bg-[#2A53A0] hover:bg-[#2A53A0]/90 text-white h-[46px]">
              <Add className="w-4 h-4" />
              Add New Rule
            </Button>
          </div>
        </div>
      </div>

      {/* Content Table */}
      <div className="flex-1 overflow-hidden flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
        <div className="flex-1 overflow-auto">
          <Table>
            <thead className="sticky top-0 z-10 shadow-sm">
              <tr className="bg-[#F0F0F0] text-[#161616] h-[48px]">
                <th className="pl-4 px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left">
                  <SortableHeader column="id" label="Rule ID" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left">
                  <SortableHeader column="description" label="Rule Description" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[120px]">
                  <SortableHeader column="severity" label="Severity" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[120px]">
                  <SortableHeader column="status" label="Status" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-[140px]">Actions</th>
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
                        className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
                      >
                        {rule.severity}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 align-middle">
                      <Badge 
                        variant="outline" 
                        className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 gap-1"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
                        {rule.status}
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
                          title="Edit"
                          onClick={() => handleEditRule(rule)}
                        >
                          <Edit className="w-4 h-4" />
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
        
        {/* Pagination Footer */}
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
  );
}

function EditRulePage({ rule, onSave, onCancel }: { rule: AlertRule, onSave: (r: AlertRule) => void, onCancel: () => void }) {
  const [formData, setFormData] = useState<AlertRule>({...rule});
  
  // Parse parameters into key-value pairs
  // Handles format "Key: Value" or just "Key"
  const [parameterList, setParameterList] = useState<{key: string, value: string}[]>(
    rule.parameters ? rule.parameters.split(',').map(p => {
      const parts = p.split(':');
      const key = parts[0]?.trim() || "";
      const value = parts.slice(1).join(':').trim(); // Join back in case value has colons
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
    // Serialize back to "Key: Value, Key2: Value2" or "Key, Key2" if value is empty
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

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900/50 p-4">
      {/* Header */}
      <div className="flex-none pb-4 flex items-center justify-between">
         <div className="flex items-center gap-2">
           <Button variant="ghost" size="icon" onClick={onCancel} className="hover:bg-gray-200 dark:hover:bg-gray-800">
             <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
           </Button>
           <div>
             <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Rule Configuration</h2>
             <p className="text-xs text-gray-500 font-mono mt-0.5">{rule.id}</p>
           </div>
         </div>
         <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel} className="gap-2 bg-white text-gray-700 hover:bg-gray-50 border-gray-300">
              Cancel
            </Button>
            <Button onClick={() => onSave(formData)} className="gap-2 bg-[#2A53A0] hover:bg-[#2A53A0]/90 text-white">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
         </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm p-6">
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
