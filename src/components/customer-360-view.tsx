import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle, ForwardedRef } from "react";
import {
  User as UserIcon,
  ShieldAlert,
  FileCheck,
  CreditCard,
  Activity,
  Bell,
  Clock,
  ArrowRight,
  Network,
  Scale,
  Scan,
  ScrollText,
  CheckCircle2,
  Download,
  Printer,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  Search,
  FileSpreadsheet,
  FileText,
  LayoutDashboard,
  Briefcase,
  MapPin,
  X
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { cn } from "./ui/utils";

import { ResponsiveAttributes } from "./ui/responsive-attributes";
import { useSortableData } from "../hooks/use-sortable-data";
import { mockCustomers } from "../src/mock/customer-data";
import { CustomerSearchView } from "./customer-360/customer-search-view";
import { CustomerDetailsSection } from "./customer-360/customer-details-section";
import { CustomerTabsSection } from "./customer-360/customer-tabs-section";

interface Customer360ViewProps {
  breadcrumbs?: any[];
  onBreadcrumbNavigate?: (path: string) => void;
  setBreadcrumbs?: (items: any[]) => void;
}

export interface Customer360Handle {
  resetView: () => void;
}

const Customer360ViewInner = (props: Customer360ViewProps, ref: ForwardedRef<Customer360Handle>) => {
  const { breadcrumbs, onBreadcrumbNavigate, setBreadcrumbs } = props;
  const [showDashboard, setShowDashboard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(mockCustomers[0]);
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(true);
  const [showLinkAnalysis, setShowLinkAnalysis] = useState(false);
  const [hoveredRiskScore, setHoveredRiskScore] = useState<number | null>(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastBreadcrumbState = useRef<string | null>(null);

  useImperativeHandle(ref, () => ({
    resetView: () => {
      setShowDashboard(false);
    }
  }));

  const { items: sortedUbo, requestSort: sortUbo, sortConfig: uboSortConfig } = useSortableData(selectedCustomer.relationships.ubo || []);
  const { items: sortedFamily, requestSort: sortFamily, sortConfig: familySortConfig } = useSortableData(selectedCustomer.relationships.family || []);
  const { items: sortedAssociates, requestSort: sortAssociates, sortConfig: associatesSortConfig } = useSortableData(selectedCustomer.relationships.associates || []);
  const { items: sortedJointHolders, requestSort: sortJointHolders, sortConfig: jointHoldersSortConfig } = useSortableData(selectedCustomer.relationships.jointHolders || []);
  const { items: sortedPoa, requestSort: sortPoa, sortConfig: poaSortConfig } = useSortableData(selectedCustomer.relationships.poa || []);

  useEffect(() => {
    if (setBreadcrumbs) {
      if (showDashboard && selectedCustomer) {
         const stateKey = `dashboard-${selectedCustomer.id}`;
         if (lastBreadcrumbState.current !== stateKey) {
            setBreadcrumbs([
                { label: selectedCustomer.name, path: "customer-detail", isActive: true }
            ]);
            lastBreadcrumbState.current = stateKey;
         }
      } else {
         if (lastBreadcrumbState.current !== "empty") {
             setBreadcrumbs([]);
             lastBreadcrumbState.current = "empty";
         }
      }
    }
  }, [showDashboard, selectedCustomer, setBreadcrumbs]);

  const handleSearch = (customerPreview?: any) => {
    setIsLoading(true);
    setTimeout(() => {
      if (customerPreview && customerPreview.name) {
         const fullDetails = {
            ...mockCustomers[0],
            name: customerPreview.name,
            ucic: customerPreview.ucic,
            id: customerPreview.id,
            customerIds: customerPreview.customerIds || [customerPreview.id],
            email: customerPreview.email,
            phone: customerPreview.mobile,
            riskScore: customerPreview.risk?.replace(' Risk', '') || 'Low',
            riskLevel: customerPreview.risk?.includes('High') ? 85 : customerPreview.risk?.includes('Medium') ? 45 : 15,
            kycStatus: customerPreview.kyc || 'Verified',
            status: customerPreview.status || 'Active',
            accountsProfile: {
                ...mockCustomers[0].accountsProfile,
                summary: [
                    { ...mockCustomers[0].accountsProfile.summary[0], balance: customerPreview.balance || "₹0" }
                ]
            }
         };
         setSelectedCustomer(fullDetails);
      } else {
         setSelectedCustomer(mockCustomers[0]);
      }
      setIsLoading(false);
      setShowDashboard(true);
    }, 600);
  };

  const scrollToBottom = () => {
     if (scrollRef.current) {
        scrollRef.current.scrollTo({
           top: scrollRef.current.scrollHeight,
           behavior: "smooth"
        });
     }
  };

  const scrollToTop = () => {
      if (scrollRef.current) {
         scrollRef.current.scrollTo({
            top: 0,
            behavior: "smooth"
         });
      }
  };

  const handleScroll = () => {
      if (scrollRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
          const isBottom = scrollTop + clientHeight >= scrollHeight - 50;
          setShowScrollToTop(isBottom);
      }
  };

  const getRiskBadgeColor = (level: string, solid = false) => {
      const colors: any = {
          'High': solid ? "bg-red-100 text-red-700" : "bg-red-50 text-red-700 border-red-200",
          'Medium': solid ? "bg-orange-100 text-orange-700" : "bg-orange-50 text-orange-700 border-orange-200",
          'Low': solid ? "bg-green-100 text-green-700" : "bg-green-50 text-green-700 border-green-200",
          'Critical': solid ? "bg-red-600 text-white" : "bg-red-100 text-red-800 border-red-300"
      };
      return colors[level] || "bg-gray-100 text-gray-700";
  };

  const renderRiskFlags = (data: any) => {
      const flags = [];
      if (data.fatfBlack === 'Y') flags.push({ label: 'FATF Black', color: 'bg-gray-900 text-white' });
      if (data.fatfGrey === 'Y') flags.push({ label: 'FATF Grey', color: 'bg-gray-500 text-white' });
      if (data.taxEvasion === 'Y') flags.push({ label: 'Tax', color: 'bg-purple-100 text-purple-700' });
      if (data.otherHighRisk === 'Y') flags.push({ label: 'High Risk', color: 'bg-red-100 text-red-700' });
      
      if (flags.length === 0) return <span className="text-[9px] text-gray-400">-</span>;
      
      return flags.map((f, i) => (
          <Badge key={i} variant="outline" className={cn("text-[8px] h-3.5 px-1 border-0 rounded-sm", f.color)}>{f.label}</Badge>
      ));
  };

  if (!showDashboard) {
    return <CustomerSearchView searchValue={searchValue} setSearchValue={setSearchValue} handleSearch={handleSearch} />;
  }

  const TABS = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "relationships", label: "Relationships (UBO)", icon: Network },
    { id: "screening", label: "Screening", icon: Scan },
    { id: "risk", label: "Risk", icon: ShieldAlert },
    { id: "kyc", label: "KYC/CDD", icon: FileCheck },
    { id: "accounts", label: "Accounts", icon: CreditCard },
    { id: "transactions", label: "Transactions", icon: Activity },
    { id: "alerts", label: "Alerts", icon: Bell },
    { id: "reports", label: "Reg Reports", icon: Scale },
    { id: "audit", label: "Audit", icon: ScrollText },
  ];

  const headerAttributes = [
      { id: 'name', content: <h1 className="text-sm font-bold text-gray-900">{selectedCustomer.name}</h1> },
      { id: 'ucic', content: <div className="flex items-center gap-1.5"><span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">UCIC:</span><span className="font-mono text-[#2A53A0] font-bold">{selectedCustomer.ucic}</span></div> },
      { id: 'id', content: (
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Cust ID:</span>
          {selectedCustomer.customerIds && selectedCustomer.customerIds.length > 1 ? (
            <Select 
              value={selectedCustomer.id} 
              onValueChange={(val) => {
                setIsLoading(true);
                setTimeout(() => {
                  const subProfile = (selectedCustomer as any).subProfiles?.[val];
                  if (subProfile) {
                    setSelectedCustomer({
                      ...selectedCustomer,
                      id: val,
                      ...subProfile,
                      relationships: {
                        ...selectedCustomer.relationships,
                        ...subProfile.relationships
                      }
                    });
                  } else {
                    setSelectedCustomer({...selectedCustomer, id: val});
                  }
                  setIsLoading(false);
                }, 400);
              }}
            >
              <SelectTrigger className="h-6 px-2 text-[13px] font-mono border-gray-200 bg-gray-50/50 min-w-[140px]">
                <SelectValue placeholder="Select ID" />
              </SelectTrigger>
              <SelectContent>
                {selectedCustomer.customerIds.map(id => (
                  <SelectItem key={id} value={id} className="font-mono text-xs">{id}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <span className="font-mono text-gray-900 font-medium">{selectedCustomer.id}</span>
          )}
        </div>
      ) },
      { id: 'type', content: <span className="flex items-center gap-1.5 text-gray-600"><UserIcon className="size-3.5 text-gray-400" />&nbsp;{selectedCustomer.type}</span> },
      { id: 'pep', content: <span className="flex items-center gap-1.5 text-gray-600">PEP Match :&nbsp;<span className={cn("font-medium uppercase", selectedCustomer.pepMatch === 'YES' ? "text-red-600" : "text-green-600")}>{selectedCustomer.pepMatch}</span></span> },
      { id: 'media', content: <span className="flex items-center gap-1.5 text-gray-600">Adverse Media :&nbsp;<span className={cn("font-medium uppercase", selectedCustomer.adverseMedia === 'YES' ? "text-red-600" : "text-green-600")}>{selectedCustomer.adverseMedia}</span></span> },
      { id: 'risk', content: <span className="flex items-center gap-1.5 text-gray-600">Risk Score :&nbsp;<span className="font-medium text-red-600">{selectedCustomer.riskLevel}</span></span> },
      { id: 'cdd', content: <span className="flex items-center gap-1.5 text-gray-600">CDD/EDD :&nbsp;<span className={cn("font-medium uppercase", selectedCustomer.cddEddTriggers === 'YES' ? "text-red-600" : "text-green-600")}>{selectedCustomer.cddEddTriggers}</span></span> },
      { id: 'dormant', content: <span className="flex items-center gap-1.5 text-gray-600">Dormant :&nbsp;<span className={cn("font-medium uppercase", selectedCustomer.dormantAccounts === 'YES' ? "text-red-600" : "text-green-600")}>{selectedCustomer.dormantAccounts}</span></span> },
      { id: 'txns', content: (
           <div className="flex items-center gap-1.5 text-gray-600">
               <span className="shrink-0">Transactions with High-risk Country :&nbsp;</span>
               <TooltipProvider>
                   <Tooltip>
                       <TooltipTrigger asChild>
                           <span className="font-medium text-red-600 cursor-pointer hover:text-red-700 transition-colors max-w-[150px] truncate inline-block align-bottom">
                               {selectedCustomer.highRiskTransactions?.countries?.join(", ")}
                           </span>
                       </TooltipTrigger>
                       <TooltipContent side="bottom" className="bg-white text-gray-900 border border-gray-200 shadow-md">
                           <p className="font-medium">Countries:</p>
                           <p className="text-sm">{selectedCustomer.highRiskTransactions?.countries?.join(", ")}</p>
                       </TooltipContent>
                   </Tooltip>
               </TooltipProvider>
           </div>
      )},
      { id: 'str', content: <span className="flex items-center gap-1.5 text-gray-600">STR/SAR :&nbsp;<span className={cn("font-medium uppercase", selectedCustomer.strSarFiled === 'YES' ? "text-red-600" : "text-green-600")}>{selectedCustomer.strSarFiled}</span></span> },
      { id: 'ctr', content: <span className="flex items-center gap-1.5 text-gray-600">CTR :&nbsp;<span className={cn("font-medium uppercase", selectedCustomer.ctrFiled === 'YES' ? "text-red-600" : "text-green-600")}>{selectedCustomer.ctrFiled}</span></span> },
      { id: 'lea', content: <span className="flex items-center gap-1.5 text-gray-600">LEA Requests :&nbsp;<span className={cn("font-medium uppercase", selectedCustomer.leaRequests === 'YES' ? "text-red-600" : "text-green-600")}>{selectedCustomer.leaRequests}</span></span> },
      { id: 'alerts', content: <span className="flex items-center gap-1.5 text-gray-600">Active Alerts :&nbsp;<span className="font-medium text-red-600">{selectedCustomer.activeAlerts}</span></span> },
  ];

  const cardClass = "rounded-lg border border-gray-200 shadow-sm bg-white overflow-hidden h-full flex flex-col";
  const cardHeaderClass = "bg-gray-50/50 pt-3 !pb-3 px-4 border-b border-gray-100 flex items-center justify-between";
  const cardTitleClass = "text-xs font-bold tracking-wider text-gray-700 flex items-center gap-1.5";
  const labelClass = "text-sm font-normal text-gray-500 tracking-wide whitespace-nowrap shrink-0 w-[130px] flex justify-between";
  const valueClass = "text-sm font-normal text-gray-900 leading-tight truncate";
  const itemClass = "flex items-center gap-3 min-w-0 overflow-hidden h-6";

  return (
    <div className="h-full flex flex-col bg-gray-50 font-sans overflow-hidden">
      <div className="relative bg-white border-b border-gray-200 shadow-sm z-20 flex-shrink-0 transition-all duration-300 mb-2">
         <div className={cn("px-4 py-3 transition-all duration-300", isDetailsExpanded ? "pb-4" : "pb-4")}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
               <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="relative shrink-0">
                     <Dialog>
                        <DialogTrigger asChild>
                           <Avatar className="h-10 w-10 border border-gray-200 shadow-sm rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
                              <AvatarImage src="https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3Njc1NzAwMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt={selectedCustomer.name} />
                              <AvatarFallback className="bg-[#2A53A0] text-white text-xs font-bold rounded-lg">RK</AvatarFallback>
                           </Avatar>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-transparent border-none shadow-none text-white">
                           <DialogTitle className="sr-only">Customer Profile Picture</DialogTitle>
                           <DialogDescription className="sr-only">Enlarged view of {selectedCustomer.name}'s profile picture</DialogDescription>
                           <div className="flex flex-col items-center">
                              <img 
                                 src="https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3Njc1NzAwMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                                 alt={selectedCustomer.name} 
                                 className="w-full h-auto rounded-lg shadow-2xl border border-white/10" 
                              />
                           </div>
                        </DialogContent>
                     </Dialog>
                     <div className={cn("absolute -bottom-1.5 -right-1.5 h-5 w-5 rounded-full border-[2px] border-white flex items-center justify-center", selectedCustomer.status === 'Active' ? "bg-green-500" : "bg-gray-400")}>
                        {selectedCustomer.status === 'Active' && <CheckCircle2 className="h-3 w-3 text-white" strokeWidth={3} />}
                     </div>
                  </div>
                  <div className="flex-1 min-w-0 w-full">
                      <ResponsiveAttributes items={headerAttributes} className="w-full" />
                  </div>
               </div>
               <div className="flex flex-col items-end gap-4">
                    <div className="flex items-center gap-2">
                       <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <Button className="flex items-center gap-2 px-4 h-[46px] bg-[#2A53A0] hover:bg-[#1e3a70] text-white rounded-lg transition-all shadow-sm">
                                 <span className="text-sm">Export</span>
                                 <Download className="size-4" />
                              </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-32 p-2 rounded-xl shadow-xl border-gray-100 bg-white">
                              <DropdownMenuItem className="cursor-pointer py-3 px-3 rounded-lg flex items-center gap-1.5">
                                 <FileSpreadsheet className="size-4 text-green-600" /> Excel
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer py-3 px-3 rounded-lg flex items-center gap-1.5">
                                 <FileText className="size-4 text-red-600" /> PDF
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer py-3 px-3 rounded-lg flex items-center gap-1.5">
                                 <Printer className="size-4 text-gray-600" /> Print
                              </DropdownMenuItem>
                          </DropdownMenuContent>
                       </DropdownMenu>
                    </div>
               </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col md:flex-row md:items-center gap-3 md:gap-4 animate-in fade-in duration-500">
               <div className="flex items-center gap-2 shrink-0 min-w-[160px]">
                  <h4 className="text-xs font-bold text-gray-700 tracking-wide">Identity Documents</h4>
               </div>
               <div className="flex flex-wrap items-center gap-3">
                  {Object.entries(selectedCustomer.idInfo || {}).map(([key, val]: [string, any]) => {
                     const typeLower = val.type?.toLowerCase() || '';
                     let borderClass = 'border-l-slate-400';
                     if (typeLower.includes('passport')) borderClass = 'border-l-blue-500';
                     else if (typeLower.includes('emirates')) borderClass = 'border-l-indigo-500';
                     else if (typeLower.includes('aadhaar') || typeLower.includes('adhar')) borderClass = 'border-l-emerald-500';
                     else if (typeLower.includes('pan') || typeLower.includes('tax')) borderClass = 'border-l-orange-500';

                     return (
                        <div key={key} className={cn("flex items-center gap-4 px-3 py-2 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all border-l-4 min-w-fit", borderClass)}>
                           <div className="flex items-baseline gap-2">
                               <span className="text-[10px] font-bold text-gray-500">{val.type}:</span>
                               <span className="text-xs font-mono font-semibold text-gray-900">{val.number}</span>
                           </div>
                           {val.expiry && val.expiry !== 'N/A' && (
                               <div className="flex items-baseline gap-1.5 text-[10px] text-gray-500">
                                   <span>Exp:</span>
                                   <span className="font-medium text-gray-700">{val.expiry}</span>
                               </div>
                           )}
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>
      </div>

      <div ref={scrollRef} onScroll={handleScroll} className="flex-1 w-full overflow-y-auto no-scrollbar">
         <CustomerDetailsSection 
            selectedCustomer={selectedCustomer}
            isDetailsExpanded={isDetailsExpanded}
            hoveredRiskScore={hoveredRiskScore}
            setHoveredRiskScore={setHoveredRiskScore}
            getRiskBadgeColor={getRiskBadgeColor}
         />

         <div className="relative h-0 z-50 flex justify-center w-full mb-8">
            <Button 
               variant="outline" 
               size="sm" 
               onClick={() => setIsDetailsExpanded(!isDetailsExpanded)} 
               className="bg-white text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-full h-7 px-4 shadow-sm border-gray-200 transition-all gap-1 -translate-y-1/2"
            >
               {isDetailsExpanded ? "Show Less" : "Show More"}
               {isDetailsExpanded ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
            </Button>
         </div>

         <Button
            variant="secondary"
            size="icon"
            className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 text-gray-600 bg-white"
            onClick={showScrollToTop ? scrollToTop : scrollToBottom}
         >
            {showScrollToTop ? <ArrowUp className="size-5" /> : <ArrowDown className="size-5" />}
         </Button>

         <CustomerTabsSection
            selectedCustomer={selectedCustomer}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            TABS={TABS}
            isDetailsExpanded={isDetailsExpanded}
            getRiskBadgeColor={getRiskBadgeColor}
            cardClass={cardClass}
            cardHeaderClass={cardHeaderClass}
            cardTitleClass={cardTitleClass}
            labelClass={labelClass}
            valueClass={valueClass}
            itemClass={itemClass}
            sortedUbo={sortedUbo}
            sortUbo={sortUbo}
            uboSortConfig={uboSortConfig}
            sortedFamily={sortedFamily}
            sortFamily={sortFamily}
            familySortConfig={familySortConfig}
            sortedAssociates={sortedAssociates}
            sortAssociates={sortAssociates}
            associatesSortConfig={associatesSortConfig}
            sortedJointHolders={sortedJointHolders}
            sortJointHolders={sortJointHolders}
            jointHoldersSortConfig={jointHoldersSortConfig}
            sortedPoa={sortedPoa}
            sortPoa={sortPoa}
            poaSortConfig={poaSortConfig}
            showLinkAnalysis={showLinkAnalysis}
            setShowLinkAnalysis={setShowLinkAnalysis}
            renderRiskFlags={renderRiskFlags}
         />
      </div>
    </div>
  );
};

export const Customer360View = forwardRef(Customer360ViewInner);
