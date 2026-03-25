import { User as UserIcon, Briefcase, FileCheck, MapPin, ShieldAlert, Activity } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { ScrollArea } from "../ui/scroll-area";

interface CustomerDetailsSectionProps {
  selectedCustomer: any;
  isDetailsExpanded: boolean;
  hoveredRiskScore: number | null;
  setHoveredRiskScore: (score: number | null) => void;
  getRiskBadgeColor: (level: string, solid?: boolean) => string;
}

export const CustomerDetailsSection = ({ 
  selectedCustomer, 
  isDetailsExpanded, 
  hoveredRiskScore, 
  setHoveredRiskScore,
  getRiskBadgeColor 
}: CustomerDetailsSectionProps) => {
  
  return (
    <div className="bg-white border-b border-gray-200 pt-2 pb-6 transition-all duration-300">
      <div className="px-6 flex flex-col gap-8">
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
              {/* Demographics Section (4 Cards) */}
              <div className={cn("grid gap-4", isDetailsExpanded ? "xl:col-span-3 grid-cols-1 md:grid-cols-2" : "xl:col-span-4 grid-cols-2 md:grid-cols-4")}>
                  {/* Card 1: Personal */}
                  <div className={cn("transition-all duration-300", isDetailsExpanded ? "bg-white rounded-lg border border-gray-200 p-5 shadow-sm space-y-4" : "p-2")}>
                      <h4 className={cn("text-xs font-bold text-gray-700 tracking-wider flex items-center gap-1.5", isDetailsExpanded && "mb-2 pb-2 border-b border-gray-100")}>
                          <UserIcon className="size-3.5 text-[#2A53A0]" /> Personal Details
                      </h4>
                      {isDetailsExpanded && (
                          <div className="space-y-3 animate-in slide-in-from-top-1 fade-in duration-300">
                              <div className="flex items-baseline justify-between gap-4">
                                  <span className="text-sm text-gray-500 font-normal whitespace-nowrap">Alias Name :</span>
                                  <span className="text-sm text-gray-900 font-normal text-right truncate">{selectedCustomer.previousNames || 'N/A'}</span>
                              </div>
                              <div className="flex items-baseline justify-between gap-4">
                                  <span className="text-sm text-gray-500 font-normal whitespace-nowrap">Date of Birth :</span>
                                  <span className="text-sm text-gray-900 font-normal text-right truncate">{selectedCustomer.dob}</span>
                              </div>
                              <div className="flex items-baseline justify-between gap-4">
                                  <span className="text-sm text-gray-500 font-normal whitespace-nowrap">Place of Birth :</span>
                                  <span className="text-sm text-gray-900 font-normal text-right truncate">{selectedCustomer.placeOfBirth}</span>
                              </div>
                              <div className="flex items-baseline justify-between gap-4">
                                  <span className="text-sm text-gray-500 font-normal whitespace-nowrap">Mobile :</span>
                                  <span className="text-sm text-gray-900 font-normal text-right truncate">{selectedCustomer.phone}</span>
                              </div>
                              <div className="flex items-baseline justify-between gap-4">
                                  <span className="text-sm text-gray-500 font-normal whitespace-nowrap">Email :</span>
                                  <span className="text-sm text-gray-900 font-normal text-right truncate">{selectedCustomer.email}</span>
                              </div>
                              <div className="flex items-baseline justify-between gap-4">
                                  <span className="text-sm text-gray-500 font-normal whitespace-nowrap">Gender :</span>
                                  <span className="text-sm text-gray-900 font-normal text-right truncate">{selectedCustomer.gender}</span>
                              </div>
                              <div className="flex items-baseline justify-between gap-4">
                                  <span className="text-sm text-gray-500 font-normal whitespace-nowrap">Citizenships :</span>
                                  <span className="text-sm text-gray-900 font-normal text-right truncate">{selectedCustomer.multipleCitizenships?.join(", ") || "None"}</span>
                              </div>
                          </div>
                      )}
                  </div>

                  {/* Card 2: Employment */}
                  <div className={cn("transition-all duration-300", isDetailsExpanded ? "bg-white rounded-lg border border-gray-200 p-5 shadow-sm space-y-4" : "p-2")}>
                      <h4 className={cn("text-xs font-bold text-gray-700 tracking-wider flex items-center gap-1.5", isDetailsExpanded && "mb-2 pb-2 border-b border-gray-100")}>
                          <Briefcase className="size-3.5 text-[#2A53A0]" /> Employment & Segment
                      </h4>
                      {isDetailsExpanded && (
                          <div className="space-y-3 animate-in slide-in-from-top-1 fade-in duration-300">
                              <div className="flex items-baseline justify-between gap-4">
                                  <span className="text-sm text-gray-500 font-normal whitespace-nowrap">Occupation :</span>
                                  <span className="text-sm text-gray-900 font-normal text-right truncate">{selectedCustomer.occupation}</span>
                              </div>
                              <div className="flex items-baseline justify-between gap-4">
                                  <span className="text-sm text-gray-500 font-normal whitespace-nowrap">Employer :</span>
                                  <span className="text-sm text-gray-900 font-normal text-right truncate">{selectedCustomer.employer}</span>
                              </div>
                              <div className="flex items-baseline justify-between gap-4">
                                  <span className="text-sm text-gray-500 font-normal whitespace-nowrap">Business Segment :</span>
                                  <span className="text-sm text-gray-900 font-normal text-right truncate">{selectedCustomer.businessSegment || "N/A"}</span>
                              </div>
                              <div className="flex items-baseline justify-between gap-4">
                                  <span className="text-sm text-gray-500 font-normal whitespace-nowrap">Customer Tags :</span>
                                  <div className="flex flex-wrap gap-1 justify-end">
                                     {selectedCustomer.customerSegment?.map((seg: string) => (
                                        <Badge key={seg} variant="secondary" className="text-[10px] h-5 px-1.5 bg-gray-100 text-gray-600 border border-gray-200 font-medium">{seg}</Badge>
                                     ))}
                                  </div>
                              </div>
                          </div>
                      )}
                  </div>

                  {/* Card 3: Onboarding */}
                  <div className={cn("transition-all duration-300", isDetailsExpanded ? "bg-white rounded-lg border border-gray-200 p-5 shadow-sm space-y-4" : "p-2")}>
                      <h4 className={cn("text-xs font-bold text-gray-700 tracking-wider flex items-center gap-1.5", isDetailsExpanded && "mb-2 pb-2 border-b border-gray-100")}>
                          <FileCheck className="size-3.5 text-[#2A53A0]" /> Onboarding & KYC
                      </h4>
                      {isDetailsExpanded && (
                          <div className="space-y-3 animate-in slide-in-from-top-1 fade-in duration-300">
                              <div className="flex items-baseline justify-between gap-4">
                                  <span className="text-sm text-gray-500 font-normal whitespace-nowrap">Onboarding Date :</span>
                                  <span className="text-sm text-gray-900 font-normal text-right truncate">{selectedCustomer.onboardingDate}</span>
                              </div>
                              <div className="flex items-baseline justify-between gap-4">
                                  <span className="text-sm text-gray-500 font-normal whitespace-nowrap">Onboarding Channel :</span>
                                  <span className="text-sm text-gray-900 font-normal text-right truncate">{selectedCustomer.onboardingChannel || 'Branch'}</span>
                              </div>
                              <div className="flex items-baseline justify-between gap-4">
                                  <span className="text-sm text-gray-500 font-normal whitespace-nowrap">FATCA Status :</span>
                                  <span className="text-sm text-gray-900 font-normal text-right truncate">{selectedCustomer.fatcaStatus}</span>
                              </div>
                              <div className="flex items-baseline justify-between gap-4">
                                  <span className="text-sm text-gray-500 font-normal whitespace-nowrap">LEA Status :</span>
                                  <span className="text-sm text-gray-900 font-normal text-right truncate">{selectedCustomer.leaStatus}</span>
                              </div>
                              <div className="flex items-baseline justify-between gap-4">
                                  <span className="text-sm text-gray-500 font-normal whitespace-nowrap">Resident Status :</span>
                                  <span className="text-sm text-gray-900 font-normal text-right truncate">{selectedCustomer.residentStatus}</span>
                              </div>
                          </div>
                      )}
                  </div>

                  {/* Card 4: Address */}
                  <div className={cn("transition-all duration-300", isDetailsExpanded ? "bg-white rounded-lg border border-gray-200 p-5 shadow-sm space-y-4" : "p-2")}>
                      <h4 className={cn("text-xs font-bold text-gray-700 tracking-wider flex items-center gap-1.5", isDetailsExpanded && "mb-2 pb-2 border-b border-gray-100")}>
                          <MapPin className="size-3.5 text-[#2A53A0]" /> Contact Addresses
                      </h4>
                      {isDetailsExpanded && (
                          <div className="space-y-3 animate-in slide-in-from-top-1 fade-in duration-300">
                              <div className="space-y-1">
                                  <span className="text-sm text-gray-500 font-normal block">Primary Address :</span>
                                  <p className="text-sm text-gray-900 font-normal leading-relaxed">{selectedCustomer.primaryAddress}</p>
                              </div>
                              {selectedCustomer.secondaryAddresses && selectedCustomer.secondaryAddresses.length > 0 && (
                                  <div className="space-y-1 pt-2 border-t border-gray-50">
                                      <span className="text-sm text-gray-500 font-normal block">Secondary Address :</span>
                                      <p className="text-sm text-gray-900 font-normal leading-relaxed">{selectedCustomer.secondaryAddresses.join(", ")}</p>
                                  </div>
                              )}
                          </div>
                      )}
                  </div>
              </div>

              {/* Risk Card */}
              <div className={cn(isDetailsExpanded ? "xl:col-span-2" : "xl:col-span-1")}>
                  <div className={cn("w-full flex flex-col relative overflow-hidden transition-all duration-300", isDetailsExpanded ? "bg-white rounded-xl border border-gray-100 shadow-sm p-6 h-full min-h-[400px]" : "h-auto p-2")}>
                      {isDetailsExpanded && (
                          <div className="absolute top-0 right-0 p-4 opacity-5">
                              <ShieldAlert className="size-32" />
                          </div>
                      )}
                      
                      <div className={cn("flex items-center justify-between z-10", isDetailsExpanded && "mb-6")}>
                          <div>
                              <h4 className="text-base font-bold text-gray-900">Risk Profile</h4>
                              {isDetailsExpanded && <p className="text-xs text-gray-500">Category-wise risk distribution</p>}
                          </div>
                          {isDetailsExpanded && (
                              <Badge variant="outline" className={cn("px-2 py-1 gap-1", selectedCustomer.riskScore === 'High' ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200")}>
                                  <Activity className="size-3" />
                                  {selectedCustomer.riskScore} Risk
                              </Badge>
                          )}
                      </div>

                      {isDetailsExpanded && (
                          <div className="flex-1 w-full relative min-h-[300px] animate-in slide-in-from-top-1 fade-in duration-300">
                              <ResponsiveContainer width="100%" height="100%">
                                  <RechartsPieChart key={`risk-chart-${selectedCustomer.id}`}><Pie dataKey="value" onMouseEnter={(data: any) => setHoveredRiskScore(data.score)} onMouseLeave={() => setHoveredRiskScore(null)} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={2} cornerRadius={4} label={({ name, x, y, cx }: any) => ( <text x={x} y={y} fill="#374151" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" className="text-[10px] font-medium" key={`label-${name}`}>{name}</text> )} data={[
                                      { name: 'KYC', score: 90, value: 1 },
                                      { name: 'Regulatory', score: 70, value: 1 },
                                      { name: 'Transactions', score: 92, value: 1 },
                                      { name: 'Account', score: 75, value: 1 },
                                      { name: 'CDD/EDD', score: 80, value: 1 },
                                      { name: 'Risk Profile', score: 88, value: 1 },
                                      { name: 'Sanctions', score: 95, value: 1 },
                                      { name: 'Related Parties', score: 85, value: 1 },
                                  ]}>
                                      {[
                                          { score: 90 }, { score: 70 }, { score: 92 }, { score: 75 },
                                          { score: 80 }, { score: 88 }, { score: 95 }, { score: 85 }
                                      ].map((entry, index) => (
                                          <Cell 
                                              key={`cell-seg-risk-${selectedCustomer.id}-${index}`} 
                                              fill={entry.score >= 90 ? '#ef4444' : entry.score >= 80 ? '#f97316' : entry.score >= 70 ? '#eab308' : '#22c55e'} 
                                              stroke="none"
                                          />
                                      ))}
                                     
                                      <RechartsTooltip 
                                         cursor={false}
                                         wrapperStyle={{ zIndex: 1000 }}
                                         content={({ active, payload }: any) => {
                                             if (active && payload && payload.length) {
                                                 const data = payload[0].payload; const label = data.name; const categoryMap: any = {
                                                      "KYC": ["kyc"],
                                                      "Regulatory": ["regulatory", "lea"],
                                                      "Transactions": ["transactions"],
                                                      "Account": ["account"],
                                                      "CDD/EDD": ["cddEdd"],
                                                      "Risk Profile": ["riskProfile"],
                                                      "Sanctions": ["sanctionMatch"],
                                                      "Related Parties": ["relatedParties"]
                                                 };
                                                 const displayMap: any = {
                                                      kyc: "KYC Risk",
                                                      relatedParties: "Related Parties",
                                                      sanctionMatch: "Sanction Matches",
                                                      riskProfile: "Risk Profile",
                                                      cddEdd: "CDD / EDD",
                                                      account: "Account Status",
                                                      transactions: "Transactions & Alerts",
                                                      lea: "LEA Requests",
                                                      regulatory: "Regulatory Reports"
                                                 };
                                                 
                                                 const relevantKeys = categoryMap[label];
                                                 
                                                 if (!relevantKeys) return null;

                                                 const scoreColor = data.score >= 90 ? "text-red-600" : data.score >= 80 ? "text-orange-500" : data.score >= 70 ? "text-yellow-600" : "text-green-600";
                                                 
                                                 return (
                                                      <div className="bg-white border border-gray-200 shadow-xl rounded-lg p-0 max-w-[320px] overflow-hidden">
                                                          <div className="flex items-center gap-2 p-3 border-b border-gray-100 bg-gray-50/50">
                                                              <ShieldAlert className={cn("size-4", scoreColor)} />
                                                              <span className="text-xs font-bold text-gray-900">{label} Details</span>
                                                          </div>
                                                          <ScrollArea className="h-full max-h-[300px]">
                                                              <div className="p-3 space-y-4">
                                                                  {relevantKeys.map((key: string) => {
                                                                      const items = (selectedCustomer.riskFactors as any)[key];
                                                                      if (!items || items.length === 0) return null;
                                                                      return (
                                                                          <div key={`risk-tooltip-cat-${selectedCustomer.id}-${key}`} className="space-y-1.5">
                                                                              <div className="text-[10px] font-bold text-gray-500 tracking-wider">{displayMap[key]}</div>
                                                                              <div className="space-y-1">
                                                                                  {items.map((item: any, idx: number) => (
                                                                                      <div key={`risk-factor-item-${selectedCustomer.id}-${key}-${idx}`} className="flex items-start gap-2">
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
                                                      </div>
                                                 );
                                             }
                                             return null;
                                         }}
                                      />
                                   </Pie>
                                </RechartsPieChart>
                               </ResponsiveContainer>
                               
                               {/* Center Score Ring */}
                               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none">
                                   <div className="relative flex flex-col items-center justify-center size-28 bg-white/95 backdrop-blur-sm rounded-full shadow-xl border border-red-100 z-10 px-2">
                                       <div className="text-center flex flex-col items-center gap-0.5">
                                           <div className="text-[10px] font-bold text-gray-900 leading-tight w-full truncate" title={selectedCustomer.name}>
                                               {selectedCustomer.name}
                                           </div>
                                           <div className="text-[9px] text-gray-500 font-mono leading-none">
                                               {selectedCustomer.id}
                                           </div>
                                           <div className="flex items-center gap-1 mt-0.5">
                                              <span className="text-[9px] font-semibold text-gray-400">Risk:</span>
                                              <span className="text-xl font-black text-red-600 leading-none">{hoveredRiskScore !== null ? hoveredRiskScore : (selectedCustomer.riskLevel || 90)}</span>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};
