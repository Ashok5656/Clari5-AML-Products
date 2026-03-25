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
  Calendar
} from "@carbon/icons-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { CarbonPaginationFooter } from "./carbon-pagination-footer";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

import { useSortableData } from "../hooks/use-sortable-data";
import { SortableHeader } from "./ui/sortable-header";

interface TbmlAlertsConfigurationProps {
  breadcrumbs?: any[];
  onBreadcrumbNavigate?: (path: string) => void;
}

interface AlertRule {
  id: string;
  code: string;
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

const ruleMapping: { [key: string]: string } = {
  "FCY_ROUND_AMT_TXNS_INTU": "Foreign Currency transactions with suspiciously rounded amounts suggesting shell company activity.",
  "FRQ_LOW_VAL_INW_REM_INTU": "High frequency of low-value inward remittances often used for structuring or smurfing.",
  "INWARD_REMIT_INVL_EXCHANGE_INT": "Inward remittances involving complex currency exchange patterns with no clear economic purpose.",
  "IWR_FRM_HUMNTRFCKNG_CNTRS_INTU": "Inward remittances originating from jurisdictions identified as high-risk for human trafficking.",
  "RDA_TXN_MONITRNG_INTU": "Enhanced monitoring for RDA (Remote Deposit Capture) transactions showing unusual velocity.",
  "IWR_PURP_FDI_HGHRSK_CNTRY_INTU": "Inward remittances declared as FDI from high-risk countries requiring enhanced due diligence.",
  "AML_REMIT_INVOLVE_CRYPTO_CURRENCY_INTU": "Remittances involving cryptocurrency platforms or known virtual asset service providers.",
  "REMIT_INVOV_HIGH_RISK_CNTRY_INTU": "Remittance activity involving countries on sanctioned or increased monitoring lists.",
  "SUSPICIOUS_INWARD_REMITTENCE": "General indicator for inward remittances that deviate significantly from historical customer behavior.",
  "HIGH_VAL_IMP_REMIT_INTU": "High-value import remittances that may indicate over-invoicing or capital flight.",
  "MTPLE_OUTWARD_REMITNC_FRM_SAME_ACCT_INTU": "Multiple outward remittances from a single account to diverse beneficiaries in a short window.",
  "MULTIPLE_OUT_REMIT_TO_SAM_BENI": "Multiple outward remittances from different accounts to the same beneficiary.",
  "SR_CROSS_BORDER_WIRE_TRANSFER_TXNS_INTU": "Cross-border wire transfers flagged by specialized screening rules for trade finance.",
  "AD2_CROSS_BORDER_WIRE_TRANSFER_TXNS_INTU": "Level 2 monitoring for cross-border wire transfers with incomplete originator information.",
  "OUT_REMIT_ODI_CHK_INTU": "Outward remittances for Overseas Direct Investment (ODI) with inconsistent documentation.",
  "S009_AML_SUDDEN_SURGE_IN_OUT_REMT_INTU": "Sudden surge in outward remittance volume compared to 90-day rolling average.",
  "MTPLE_INWARD_REMITNC_TO_SAME_ACCT": "Inward remittances from multiple originators into a single account within 48 hours.",
  "MUL_INW_REM_FRM_SAM_ACCT_INTU": "Multiple inward remittances from the same external account into different internal accounts.",
  "SUS_INW_REM_IN_LOW_BAL_ACCT_INTU": "Suspicious inward remittance into an account with historically low average balances.",
  "SUS_INW_REM_IN_LOW_BAL_ACT_INTU": "Alert for inward remittances into dormant or low-activity accounts followed by immediate withdrawal.",
  "CROSS_BORDER_WIRE_TRANSFER_TXNS_INTU": "Standard monitoring for all cross-border wire transfers above internal reporting thresholds.",
  "HIGH_VALUE_INWARD_REMITTENCE": "Single inward remittance exceeding the established high-value threshold for the segment.",
  "LOW_BAL_CA_INW_OUT_REMIT_INTU": "Current Account with low balance receiving inward remittances and immediately sending outward transfers.",
  "OUTWARD_REMITTANCE_RTGS_CASH_INTU": "Outward remittance funded by recent large RTGS or cash deposits.",
  "OUTWARD_REM_MEDI_HEALTH_SERVICES_INTU": "Outward remittances for medical/health services to unusual jurisdictions.",
  "SUSP_IWR_MESE_CNTRY_INTU": "Suspicious inward remittances from Middle Eastern or South East Asian countries.",
  "UNUSUAL_INW_OUT_REMIT_INTU": "Unusual pattern of alternating inward and outward remittances suggesting pass-through activity.",
  "IN_REMIT_TERRORIST_JURISDICTION_INTU": "Inward remittances from jurisdictions known for terrorist financing activities.",
  "OUTWARD_REMITTANCE_VELOCITY_CHK": "Alert triggered when the number of outward remittances exceeds the daily frequency limit.",
  "Out_Remi_Vel_Chk_Inv_Slicing3": "Detection of transaction slicing (structuring) in outward remittances to bypass reporting limits.",
  "SUSPICIOUS_OUTWARD_REMITTENCE": "General indicator for outward remittances inconsistent with the declared nature of business.",
  "CASHDEP_FOLLOWBY_OUT_REMIT_INTU": "Large cash deposits followed by immediate outward remittance requests.",
  "CC_HIGH_TURNOVER_WITHIN_30DAYS_INTU": "Credit Card accounts showing unusually high turnover within a 30-day period.",
  "INWARD_REMITTANCE_IN_IDLE_ACCT_INTU": "Inward remittance received in an account that has been idle for more than 6 months.",
  "OUTWRD_REMIT_VINTAGE_ACCT_INTU": "Outward remittance from a long-standing account showing a new and unusual pattern of activity.",
  "PROP_PARTNR_CUST_MONIT_INTU": "Monitoring of proprietary partners and associated customer entities for related-party transaction risks.",
  "UNUSUAL_OUTWARD_INWARD_REMITTANCE": "Mixed pattern of unusual volumes in both inward and outward directions.",
  "UNUSUAL_OUTWARD_REMITTANCE": "Significant deviation in outward remittance frequency or volume for the specific customer peer group."
};

const rawRules = Object.keys(ruleMapping);

const generateRulesData = (): AlertRule[] => {
  return rawRules.map((code, index) => {
    let parameters = "Transaction Volume, Jurisdiction Risk, Counterparty Type";
    
    let severity: "High" | "Medium" | "Low" = "High";
    if (code.includes("LOW_VAL") || code.includes("VELOCITY") || code.includes("VINTAGE")) {
      severity = "Medium";
    } else if (code.includes("UNUSUAL") || code.includes("SUSPICIOUS") || code.includes("TERRORIST")) {
      severity = "High";
    }

    let category = "Trade Finance";
    if (code.includes("REMIT")) {
      category = "Remittances";
    } else if (code.includes("CASH")) {
      category = "Cash Activity";
    } else if (code.includes("WIRE")) {
      category = "Wire Transfers";
    }

    return {
      id: `TBML-${(index + 1).toString().padStart(3, '0')}`,
      code: code,
      description: ruleMapping[code] || "Rule description not defined for this technical identifier.",
      severity: severity,
      status: "Active",
      category: category,
      threshold: "System defined threshold based on historical peer patterns",
      parameters: parameters,
      lastUpdated: "2024-02-10",
      score: severity === "High" ? 85 : severity === "Medium" ? 60 : 35,
      fromDate: "2024-01-01",
      toDate: "2024-12-31"
    };
  });
};

export function TbmlAlertsConfiguration({ breadcrumbs, onBreadcrumbNavigate }: TbmlAlertsConfigurationProps) {
  const [currentView, setCurrentView] = useState<"list" | "view" | "edit">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [selectedRule, setSelectedRule] = useState<AlertRule | null>(null);
  const [rules, setRules] = useState<AlertRule[]>(generateRulesData());

  const filteredRules = rules.filter(rule => 
    rule.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rule.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
                 TBML Rule Details
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Rule Code</h3>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-100 dark:border-gray-700 text-sm font-mono text-gray-800 dark:text-gray-200">
                    {selectedRule.code}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Rule Description</h3>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-100 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                    {selectedRule.description}
                  </div>
                </div>
              </div>

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
              placeholder="Search TBML rules, codes or descriptions..." 
              className="pl-9 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus-visible:ring-[#2A53A0]"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          
          <div className="flex items-center gap-3 ml-4">
            <Button variant="outline" className="gap-2 bg-white dark:bg-gray-900 h-[46px]">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button className={`gap-2 h-[46px] text-base font-semibold rounded-xl shadow-lg transition-all duration-300 group overflow-hidden relative bg-[#2A53A0] hover:bg-[#1e3d7a] text-white shadow-blue-900/20 hover:shadow-blue-900/30 hover:-translate-y-0.5`}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
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
                  <SortableHeader column="code" label="Rule Code" sortConfig={sortConfig} onSort={requestSort} />
                </th>
                <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left">
                  <SortableHeader column="description" label="Description" sortConfig={sortConfig} onSort={requestSort} />
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
                    <TableCell className="px-4 align-middle text-[15px]">
                      <div className="font-mono text-gray-700 dark:text-gray-300 font-normal truncate max-w-[180px]" title={rule.code}>
                        {rule.code}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 align-middle text-[15px] max-w-[400px]">
                      <div className="truncate text-gray-700 dark:text-gray-300 font-normal" title={rule.description}>
                        {rule.description}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 align-middle">
                      <Badge 
                        variant="outline" 
                        className={`${
                          rule.severity === 'High' ? 'bg-red-50 text-red-700 border-red-200' : 
                          rule.severity === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                          'bg-blue-50 text-blue-700 border-blue-200'
                        } px-2 py-0.5 text-xs`}
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
                  <TableCell colSpan={6} className="h-24 text-center text-gray-500 text-[15px]">
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
  );
}

function EditRulePage({ rule, onSave, onCancel }: { rule: AlertRule, onSave: (r: AlertRule) => void, onCancel: () => void }) {
  const [formData, setFormData] = useState<AlertRule>({...rule});
  const [isSaving, setIsSaving] = useState(false);
  
  const handleChange = (field: keyof AlertRule, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate a brief saving delay for high-tech feel
    setTimeout(() => {
      onSave(formData);
      setIsSaving(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900/50 p-4">
      {/* Header */}
      <div className="flex-none pb-4 flex items-center justify-between">
         <div className="flex items-center gap-2">
           <Button variant="ghost" size="icon" onClick={onCancel} className="hover:bg-gray-200 dark:hover:bg-gray-800" disabled={isSaving}>
             <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
           </Button>
           <div>
             <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Edit TBML Rule</h2>
             <p className="text-xs text-gray-500 font-mono mt-0.5">{rule.id}</p>
           </div>
         </div>
         <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel} className="gap-2 bg-white text-gray-700 hover:bg-gray-50 border-gray-300" disabled={isSaving}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={isSaving}
              className={`gap-2 h-11 text-sm font-semibold rounded-xl shadow-lg transition-all duration-300 group overflow-hidden relative bg-[#2A53A0] hover:bg-[#1e3d7a] text-white shadow-blue-900/20 hover:shadow-blue-900/30 hover:-translate-y-0.5`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <Save className="w-4 h-4" />
              {isSaving ? "Saving Changes..." : "Save Changes"}
            </Button>
         </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm p-6">
         <div className="w-full space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="code" className="text-sm font-semibold text-gray-700">Rule Code</Label>
                <Input 
                  id="code" 
                  value={formData.code}
                  onChange={(e) => handleChange("code", e.target.value)}
                  className="bg-gray-50 font-mono h-[46px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-semibold text-gray-700">Category</Label>
                <Input 
                  id="category" 
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="bg-gray-50 h-[46px]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold text-gray-700">Description <span className="text-red-500">*</span></Label>
              <Textarea 
                id="description" 
                className="min-h-[80px] resize-y bg-gray-50" 
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <Label htmlFor="fromDate" className="text-sm font-semibold text-gray-700">Effective From Date</Label>
                 <div className="relative">
                    <Input 
                      type="date"
                      id="fromDate" 
                      value={formData.fromDate}
                      onChange={(e) => handleChange("fromDate", e.target.value)}
                      className="bg-gray-50 h-[46px] pr-10"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                 </div>
               </div>
               <div className="space-y-2">
                 <Label htmlFor="toDate" className="text-sm font-semibold text-gray-700">Effective To Date</Label>
                 <div className="relative">
                    <Input 
                      type="date"
                      id="toDate" 
                      value={formData.toDate}
                      onChange={(e) => handleChange("toDate", e.target.value)}
                      className="bg-gray-50 h-[46px] pr-10"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                 </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="space-y-2">
                 <Label htmlFor="severity" className="text-sm font-semibold text-gray-700">Severity</Label>
                 <Select value={formData.severity} onValueChange={(val: any) => handleChange("severity", val)}>
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
                 <Select value={formData.status} onValueChange={(val: any) => handleChange("status", val)}>
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

            <div className="space-y-2">
              <Label htmlFor="threshold" className="text-sm font-semibold text-gray-700">Threshold Logic</Label>
              <Textarea 
                id="threshold" 
                className="min-h-[100px] resize-y bg-gray-50 font-mono" 
                value={formData.threshold}
                onChange={(e) => handleChange("threshold", e.target.value)}
              />
            </div>
         </div>
      </div>
    </div>
  );
}
