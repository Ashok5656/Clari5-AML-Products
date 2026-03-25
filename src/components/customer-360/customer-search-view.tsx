import { Search, History, X, ChevronRight } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";
import { searchData } from "../../src/mock/customer-data";

interface CustomerSearchViewProps {
  searchValue: string;
  setSearchValue: (val: string) => void;
  handleSearch: (item?: any) => void;
}

export const CustomerSearchView = ({ searchValue, setSearchValue, handleSearch }: CustomerSearchViewProps) => {
  const filteredResults = searchValue.trim() 
    ? searchData.filter(item => {
        const q = searchValue.toLowerCase().trim();
        const cleanQ = q.replace(/\D/g, '');
        return (
           item.name.toLowerCase().includes(q) ||
           item.id.toLowerCase().includes(q) ||
           item.email.toLowerCase().includes(q) ||
           (item as any).branch?.toLowerCase().includes(q) ||
           item.risk.toLowerCase().includes(q) ||
           (cleanQ.length > 2 && item.mobile.replace(/\D/g, '').includes(cleanQ)) ||
           (item.accountNumber && item.accountNumber.toLowerCase().includes(q))
        );
      })
    : [];

  const isSearching = searchValue.trim().length > 0;

  return (
     <div className="h-full bg-gray-50/50 flex flex-col overflow-hidden font-sans">
        {/* CENTERED HERO SEARCH (When NOT searching) */}
        {!isSearching && (
           <div className="flex-1 flex flex-col items-center justify-center p-6 -mt-20 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-full max-w-2xl space-y-8">
                 
                 {/* Brand / Header */}
                 <div className="text-center space-y-3">
                    <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-sm border border-gray-100 mb-2">
                       <Search className="size-8 text-[#2A53A0]" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Customer 360 Lookup</h2>
                    <p className="text-gray-500 text-lg">
                       Search by Name, ID, Phone, Account Number, Base Branch, or Risk Score
                    </p>
                 </div>

                 {/* Google-Style Search Bar */}
                 <div className="relative max-w-xl mx-auto w-full">
                     <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                         <Search className="size-5" />
                     </div>
                     <Input 
                         className="h-14 pl-12 pr-6 rounded-full border border-gray-200 shadow-md text-lg focus-visible:ring-2 focus-visible:ring-[#2A53A0]/20 focus-visible:border-[#2A53A0] transition-all bg-white placeholder:text-gray-400" 
                         placeholder="Search by Name, ID, Phone, Account Number, Base Branch, Risk Score" 
                         value={searchValue}
                         onChange={(e) => setSearchValue(e.target.value)}
                         autoFocus
                     />
                 </div>

                 {/* Quick Access / Recent */}
                 <div className="pt-8 max-w-xl mx-auto w-full">
                     <div className="flex items-center justify-between mb-4 px-2">
                         <h3 className="text-xs font-bold text-gray-500 tracking-wider">Recent Searches</h3>
                         <Button variant="link" size="sm" className="h-auto p-0 text-xs text-blue-600">Clear History</Button>
                     </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                         {[
                             { name: "Rajesh Kumar", type: "Individual", time: "10 mins ago", id: "CUST-8829103" },
                             { name: "Global Trade Corp", type: "Corporate", time: "2 hours ago", id: "CORP-9921102" }
                         ].map((recent, i) => (
                             <div key={i} className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#2A53A0]/30 cursor-pointer transition-all group flex items-center gap-3" onClick={() => { setSearchValue(recent.name); handleSearch(recent); }}>
                                 <div className="p-2 bg-blue-50 rounded-lg text-[#2A53A0] group-hover:bg-blue-100 transition-colors"><History className="size-4"/></div>
                                 <div className="min-w-0">
                                     <div className="font-semibold text-gray-900 text-sm truncate group-hover:text-[#2A53A0]">{recent.name}</div>
                                     <div className="text-[10px] text-gray-500 truncate">{recent.id} • {recent.time}</div>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>

              </div>
           </div>
        )}

        {/* RESULTS VIEW (When searching) */}
        {isSearching && (
           <div className="flex flex-col h-full animate-in fade-in duration-300">
              {/* Compact Top Bar */}
              <div className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm z-10 flex items-center gap-4 shrink-0 sticky top-0">
                  <div className="flex-1 max-w-2xl flex items-center gap-4">
                      <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                          <Input 
                              className="h-10 pl-9 pr-9 bg-gray-100/50 border-transparent hover:bg-gray-100 focus:bg-white focus:border-gray-200 focus:shadow-sm transition-all text-sm rounded-full" 
                              value={searchValue}
                              onChange={(e) => setSearchValue(e.target.value)}
                              placeholder="Search by Name, ID, Phone, Account Number, Base Branch, Risk Score" 
                              autoFocus
                          />
                          <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-gray-900 rounded-full" onClick={() => setSearchValue("")}>
                              <X className="size-4" />
                          </Button>
                      </div>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-xs text-gray-500 border-l pl-4 border-gray-200 h-6">
                      <span className="font-medium text-gray-900">{filteredResults.length}</span> results found
                  </div>
              </div>
              
              {/* Results List */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50/50">
                   <div className="max-w-3xl mx-auto space-y-3">
                       {filteredResults.length > 0 ? (
                           filteredResults.map((item, i) => (
                               <Card key={i} className="cursor-pointer hover:shadow-md hover:border-[#2A53A0]/30 transition-all duration-200 group border-gray-200 overflow-hidden" onClick={() => handleSearch(item)}>
                                  <CardContent className="p-0">
                                     <div className="flex flex-col sm:flex-row">
                                        {/* Left Color Strip */}
                                        <div className={cn("w-1.5 shrink-0 hidden sm:block", item.risk.includes("High") ? "bg-red-500" : item.risk.includes("Medium") ? "bg-orange-500" : "bg-green-500")} />
                                        
                                        <div className="py-2 px-4 flex-1 flex flex-col sm:flex-row sm:items-center gap-3">
                                           {/* Avatar & Name */}
                                           <div className="flex items-center gap-2.5 sm:w-[220px] shrink-0">
                                              <Avatar className="h-9 w-9 border border-gray-100 shrink-0">
                                                 {item.img && <AvatarImage src={item.img} alt={item.name} />}
                                                 <AvatarFallback className={cn(
                                                    item.color === 'blue' ? "bg-blue-50 text-[#2A53A0]" :
                                                    item.color === 'purple' ? "bg-purple-50 text-purple-700" :
                                                    item.color === 'green' ? "bg-green-50 text-green-700" :
                                                    "bg-gray-100 text-gray-600"
                                                 )}>{item.initials}</AvatarFallback>
                                              </Avatar>
                                              <div className="min-w-0">
                                                 <div className="font-bold text-sm text-gray-900 group-hover:text-[#2A53A0] truncate">{item.name}</div>
                                                 <div className="text-[11px] text-gray-500 font-mono leading-tight">{item.ucic}</div>
                                              </div>
                                           </div>

                                           {/* Key Details */}
                                           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
                                              <div>
                                                 <p className="text-[10px] text-gray-400 tracking-wider font-semibold mb-0.5">Mobile</p>
                                                 <p className="text-xs font-medium text-gray-700 truncate">{item.mobile}</p>
                                              </div>
                                              <div>
                                                 <p className="text-[10px] text-[#2A53A0] tracking-wider font-semibold mb-0.5">Cust ID Count</p>
                                                 <p className="text-xs font-bold text-[#2A53A0]">{item.customerIds?.length || 1}</p>
                                              </div>
                                              <div>
                                                 <p className="text-[10px] text-gray-400 tracking-wider font-semibold mb-0.5">Accounts</p>
                                                 <p className="text-xs font-medium text-gray-700">{item.accounts}</p>
                                              </div>
                                              <div>
                                                 <p className="text-[10px] text-gray-400 tracking-wider font-semibold mb-0.5">Base Branch</p>
                                                 <p className="text-xs font-bold text-gray-900 truncate">{(item as any).branch}</p>
                                              </div>
                                           </div>

                                           {/* Status Badge */}
                                           <div className="flex items-center justify-end sm:w-[120px] shrink-0 gap-2">
                                              <Badge className={cn("text-[10px] px-2 h-5 font-medium border", item.risk.includes("High") ? "bg-red-50 text-red-700 border-red-200" : item.risk.includes("Medium") ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-green-50 text-green-700 border-green-200")} variant="outline">
                                                 {item.risk}
                                              </Badge>
                                              <ChevronRight className="size-4 text-gray-300 group-hover:text-[#2A53A0]" />
                                           </div>
                                        </div>
                                     </div>
                                  </CardContent>
                               </Card>
                           ))
                       ) : (
                           <div className="p-12 text-center flex flex-col items-center justify-center text-gray-400 bg-white rounded-lg border border-dashed border-gray-200">
                              <Search className="size-8 mb-3 opacity-20" />
                              <h3 className="text-sm font-semibold text-gray-900">No customers found</h3>
                              <p className="text-xs text-gray-500 mt-1 max-w-[200px]">We couldn't find any results for "{searchValue}". Try searching by Name, ID, Phone, Account, Branch, or Risk Score.</p>
                           </div>
                       )}
                   </div>
              </div>
           </div>
        )}
     </div>
  );
};
