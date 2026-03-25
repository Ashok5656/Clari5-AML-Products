import React, { useRef } from "react";
import { ArrowLeft, ChevronDown, Calendar, Download } from "@carbon/icons-react";
import { cn } from "./ui/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollToTopButton } from "./scroll-to-top-button";

interface ReviewItem {
  id: string;
  referenceNumber: string;
  ucicId: string;
  cifId: string;
  alertScenario: string;
  projectName: string;
  createdOn: string;
  dueDate: string;
  reportAging: string;
  lanId: string;
  status: 'valid' | 'invalid';
  errorMessage?: string;
}

interface RegulatoryReviewDetailProps {
  item: ReviewItem;
  reportType: string;
  onBack: () => void;
  onNext?: () => void;
}

// Mock Data for Accounts
const MOCK_ACCOUNTS = [
  { id: "1", accountNo: "112148291241", type: "Savings", status: "Active", openDate: "12-01-2020", branch: "Mumbai Main", balance: "₹ 1,24,50,000" },
  { id: "2", accountNo: "112148291242", type: "Current", status: "Active", openDate: "15-03-2021", branch: "Delhi South", balance: "₹ 45,20,000" },
];

// Mock Data for Transactions
const MOCK_TRANSACTIONS = [
  { id: "1", date: "01-10-2025", txnId: "TXN8293812", type: "Credit", amount: "₹ 5,00,000", mode: "NEFT", counterparty: "Rajesh Exports", remark: "High Value Inward" },
  { id: "2", date: "02-10-2025", txnId: "TXN8293813", type: "Debit", amount: "₹ 2,00,000", mode: "Cash W/D", counterparty: "Self", remark: "Cash Withdrawal" },
  { id: "3", date: "04-10-2025", txnId: "TXN8293814", type: "Credit", amount: "₹ 10,00,000", mode: "RTGS", counterparty: "Global Traders", remark: "Payment Received" },
  { id: "4", date: "05-10-2025", txnId: "TXN8293815", type: "Debit", amount: "₹ 8,00,000", mode: "Transfer", counterparty: "Overseas Supplier", remark: "Import Payment" },
];

export function RegulatoryReviewDetail({ item, reportType, onBack, onNext }: RegulatoryReviewDetailProps) {
  // Mock data to match the image where real data isn't available in ReviewItem
  const alertId = "ALT-2025-001234"; 
  const alertType = "System Alert";
  const teamName = "AML Investigation Team";
  const strCount = 3;
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col h-full bg-[#f4f4f4]">
      {/* Section 1: Top Navigation (Fixed) */}
      <div className="bg-white px-6 py-3 flex items-center justify-between shrink-0 shadow-sm border-b border-gray-200 dark:border-gray-800 z-20 relative">
          <button 
            onClick={onBack}
            className="flex-none flex items-center gap-2 text-sm text-gray-600 hover:text-[#2A53A0] transition-colors font-medium z-10"
          >
            <ArrowLeft size={16} />
            Back to STR Review List
          </button>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <h1 className="text-lg font-bold text-gray-900">STR Review Details</h1>
          </div>

          <div className="flex items-center gap-2 z-10">
              <button
                 onClick={onNext}
                 className="bg-[#2A53A0] hover:bg-[#1e3a70] text-white px-4 py-1.5 rounded text-sm font-medium transition-colors"
              >
                  Next
              </button>
          </div>
      </div>

      {/* Main Scrollable Container for all sections */}
      <div className="flex-1 overflow-y-auto p-0 space-y-4 bg-gray-50/30" ref={scrollRef}>
        
        {/* Section 2: Static Details */}
        <div className="bg-white px-8 py-6 shadow-sm border border-gray-100">
            <div className="grid grid-cols-4 gap-y-4 gap-x-8">
                {/* Row 1 */}
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-500 min-w-[110px]">Alert ID</label>
                    <div className="font-semibold text-gray-900 text-sm">: {alertId}</div>
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-500 min-w-[110px]">Scenario Name</label>
                    <div className="font-semibold text-gray-900 text-sm truncate">: {item.alertScenario}</div>
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-500 min-w-[110px]">Created On</label>
                    <div className="font-semibold text-gray-900 text-sm">: {item.createdOn}</div>
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-500 min-w-[110px]">CIF ID</label>
                    <div className="font-semibold text-gray-900 text-sm">: {item.cifId}</div>
                </div>

                {/* Row 2 */}
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-500 min-w-[110px]">Alert Type</label>
                    <div className="flex items-center gap-1">
                        <span className="text-gray-900 font-semibold text-sm">:</span>
                        <div className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200">
                            {alertType}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-500 min-w-[110px]">Due Date</label>
                    <div className="font-semibold text-gray-900 text-sm">: {item.dueDate}</div>
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-500 min-w-[110px]">Reporting Age</label>
                    <div className="flex items-center gap-1">
                        <span className="text-gray-900 font-semibold text-sm">:</span>
                        <div className="inline-block px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-medium">
                            {item.reportAging.replace(' Days', ' Days')}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-500 min-w-[110px]">Team Name</label>
                    <div className="font-semibold text-gray-900 text-sm">: {teamName}</div>
                </div>

                {/* Row 3 */}
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-500 min-w-[110px]">STR Count</label>
                    <div className="font-semibold text-gray-900 text-sm">: {strCount}</div>
                </div>
            </div>
        </div>

        {/* Section 3: Tabs & Content Area */}
        <div className="bg-white shadow-sm border border-gray-100 flex flex-col">
            <Tabs defaultValue="header-f1" className="w-full flex flex-col">
                {/* Tab Navigation */}
                <div className="w-full bg-[#f4f4f4] border-b border-[#e0e0e0]">
                    <TabsList className="bg-transparent h-12 p-0 w-full justify-start gap-0 rounded-none px-0">
                        {[
                            { label: "Header - F1", value: "header-f1" },
                            { label: "Ground of Suspicion - F1", value: "ground-of-suspicion-f1" },
                            { label: "Ground of Suspicion Due to - F1", value: "ground-of-suspicion-due-to-f1" },
                            { label: "Ground of Suspicion - F2", value: "ground-of-suspicion-f2" },
                            { label: "Account & Transaction - F1 & F2", value: "account-transaction-f1-f2" },
                            { label: "Resolution F1 & F2", value: "resolution-f1-f2" }
                        ].map((tab) => (
                            <TabsTrigger 
                                key={tab.value}
                                value={tab.value}
                                className="data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:text-[#2A53A0] data-[state=active]:border-b-transparent data-[state=active]:border-t-4 data-[state=active]:border-x-0 data-[state=active]:border-t-[#2A53A0] rounded-none h-12 px-6 text-sm font-medium text-[#525252] border-b border-t-4 border-t-transparent border-x-0 border-b-transparent transition-colors hover:text-[#161616] hover:bg-[#e5e5e5] focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                <div className="p-8 bg-white min-h-[400px]">
                    <TabsContent value="header-f1" className="mt-0 space-y-8 focus-visible:outline-none">
                        {/* Header - F1 Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
                            <div className="space-y-6">
                                <h3 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-2">Details Of Investigation</h3>
                                <div className="space-y-4">
                                    <FormDropdown label="Additional Document *" value="Aadhar Card" />
                                    <FormDropdown label="LEA Informed *" value="No" />
                                    <FormDropdown label="Report Coverage *" value="Full Coverage" />
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1.5">LEA Details *</label>
                                        <textarea 
                                            className="w-full min-h-[80px] p-3 text-sm border border-gray-300 rounded-sm focus:outline-none focus:border-[#2A53A0] focus:ring-1 focus:ring-[#2A53A0] resize-none bg-white text-gray-400"
                                            placeholder="Enter LEA details..."
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-2">Main Person</h3>
                                <div className="space-y-4">
                                    <FormDropdown label="Attempted Transaction *" value="No" />
                                    <FormDropdown label="Priority Rating *" value="Medium" />
                                    <FormDropdown label="Source of Alert *" value="System Generated" />
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Case Attributes</label>
                                        <input 
                                            type="text"
                                            className="w-full h-[40px] px-3 text-sm border border-gray-300 rounded-sm focus:outline-none focus:border-[#2A53A0] focus:ring-1 focus:ring-[#2A53A0] bg-white"
                                            placeholder="Enter case attributes..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    
                    <TabsContent value="ground-of-suspicion-f1" className="mt-0 space-y-8 focus-visible:outline-none">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
                            <div className="space-y-4">
                                <FormInput label="Relationship Begin Date" placeholder="Select date" value="January 15th, 2024" icon={<Calendar size={16} className="text-gray-500" />} readOnly />
                                <FormInput label="Volume of Transactions" placeholder="Enter transaction volume..." />
                                <FormTextArea label="Isolated Details" placeholder="Enter isolated details..." />
                                <FormTextArea label="Background" placeholder="Enter background information..." />
                                <FormTextArea label="Procedure for Detection" placeholder="Enter detection procedure..." />
                            </div>
                            <div className="space-y-4">
                                <FormTextArea label="Explanation from Subject" placeholder="Enter subject explanation..." />
                                <FormTextArea label="Summary of Suspicion *" placeholder="Enter summary of suspicion..." required />
                                <FormInput label="Transaction Linkage" placeholder="Enter transaction linkage..." />
                                <FormTextArea label="Beneficiary Details" placeholder="Enter beneficiary details..." />
                                <FormTextArea label="Additional Information" placeholder="Enter additional information..." />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="ground-of-suspicion-due-to-f1" className="mt-0 space-y-8 focus-visible:outline-none">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <FormDropdown label="Complex Transaction *" value="No" />
                            <FormDropdown label="Financing of Terrorism *" value="Not Applicable" />
                            <FormDropdown label="No Eco Rationale *" value="Not Identified" />
                            <FormDropdown label="Proceeds of Crime *" value="Unlikely" />
                        </div>
                    </TabsContent>

                    <TabsContent value="ground-of-suspicion-f2" className="mt-0 space-y-8 focus-visible:outline-none">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
                            <div className="space-y-6">
                                <FormInput label="KYC Source Of Funds *" placeholder="Enter KYC source of funds" />
                                <FormDropdown label="GoS Tag 1 - Suspicion Due To *" value="Unusual Transaction Pattern" />
                                <FormTextArea label="Narration *" placeholder="Enter detailed narration..." />
                                <FormDropdown label="GoS Tag 3 - Red Flag Indicator *" value="Large Cash Deposits" />
                            </div>
                            <div className="space-y-6">
                                <FormInput label="KYC Destination of Funds *" placeholder="Enter KYC destination of funds" />
                                <FormDropdown label="GoS Tag 4 - Type of Offence Suspected *" value="Money Laundering" />
                                <FormDropdown label="GoS Tag 2 - Source of Alert *" value="System Generated Alert" />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="account-transaction-f1-f2" className="mt-0 space-y-12 focus-visible:outline-none">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-base font-bold text-gray-900">Account Details</h3>
                                <button className="flex items-center gap-2 text-sm text-[#2A53A0] hover:bg-blue-50 px-3 py-1.5 rounded transition-colors">
                                    <Download size={16} /> Export Accounts
                                </button>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#F0F0F0] text-[#2A53A0] h-[40px] text-xs uppercase tracking-wider">
                                            <th className="px-4 font-bold border-b border-gray-200">Account Number</th>
                                            <th className="px-4 font-bold border-b border-gray-200">Type</th>
                                            <th className="px-4 font-bold border-b border-gray-200">Status</th>
                                            <th className="px-4 font-bold border-b border-gray-200">Open Date</th>
                                            <th className="px-4 font-bold border-b border-gray-200">Branch</th>
                                            <th className="px-4 font-bold border-b border-gray-200 text-right">Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {MOCK_ACCOUNTS.map((acc) => (
                                            <tr key={acc.id} className="border-b border-gray-100 hover:bg-gray-50 text-sm">
                                                <td className="px-4 py-3 font-medium text-gray-900">{acc.accountNo}</td>
                                                <td className="px-4 py-3 text-gray-600">{acc.type}</td>
                                                <td className="px-4 py-3">
                                                    <span className="inline-block px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full border border-green-100">{acc.status}</span>
                                                </td>
                                                <td className="px-4 py-3 text-gray-600">{acc.openDate}</td>
                                                <td className="px-4 py-3 text-gray-600">{acc.branch}</td>
                                                <td className="px-4 py-3 text-gray-900 text-right font-medium">{acc.balance}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-base font-bold text-gray-900">Transaction Details</h3>
                                <button className="flex items-center gap-2 text-sm text-[#2A53A0] hover:bg-blue-50 px-3 py-1.5 rounded transition-colors">
                                    <Download size={16} /> Export Transactions
                                </button>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#F0F0F0] text-[#2A53A0] h-[40px] text-xs uppercase tracking-wider">
                                            <th className="px-4 font-bold border-b border-gray-200">Date</th>
                                            <th className="px-4 font-bold border-b border-gray-200">Txn ID</th>
                                            <th className="px-4 font-bold border-b border-gray-200">Type</th>
                                            <th className="px-4 font-bold border-b border-gray-200">Mode</th>
                                            <th className="px-4 font-bold border-b border-gray-200">Counterparty</th>
                                            <th className="px-4 font-bold border-b border-gray-200">Remark</th>
                                            <th className="px-4 font-bold border-b border-gray-200 text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {MOCK_TRANSACTIONS.map((txn) => (
                                            <tr key={txn.id} className="border-b border-gray-100 hover:bg-gray-50 text-sm">
                                                <td className="px-4 py-3 text-gray-600">{txn.date}</td>
                                                <td className="px-4 py-3 text-[#2A53A0] font-medium">{txn.txnId}</td>
                                                <td className="px-4 py-3"><span className={cn("inline-block px-2 py-0.5 text-xs rounded-full border", txn.type === 'Credit' ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-700 border-red-100")}>{txn.type}</span></td>
                                                <td className="px-4 py-3 text-gray-600">{txn.mode}</td>
                                                <td className="px-4 py-3 text-gray-900">{txn.counterparty}</td>
                                                <td className="px-4 py-3 text-gray-500 italic">{txn.remark}</td>
                                                <td className={cn("px-4 py-3 text-right font-medium", txn.type === 'Credit' ? "text-green-600" : "text-red-600")}>{txn.type === 'Credit' ? '+' : '-'}{txn.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="resolution-f1-f2" className="mt-0 space-y-8 focus-visible:outline-none">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
                            <div className="space-y-6">
                                <FormDropdown label="Resolution *" value="STR Filed" />
                                <FormDropdown label="Recommended Action" value="Monitor Account" />
                                <FormDropdown label="Alert Indicator" value="Medium Risk" />
                            </div>
                            <div className="space-y-6">
                                <FormDropdown label="Reason for STR" value="Suspicious Activity" />
                                <FormTextArea label="Evidence Details" placeholder="Enter evidence details..." />
                            </div>
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
        </div>

        {/* Section 4: Remarks and Comments - Completely Separate Section */}
        <div className="bg-white px-8 py-6 shadow-sm border border-gray-100 space-y-8">
            <div className="space-y-4">
                <h3 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-2">Remarks</h3>
                <textarea 
                    className="w-full min-h-[100px] p-4 text-sm border border-gray-300 rounded-sm focus:outline-none focus:border-[#2A53A0] focus:ring-1 focus:ring-[#2A53A0] resize-none bg-white text-gray-800"
                    defaultValue="Customer has been conducting unusually high cash transactions over the past week. Pattern suggests potential money laundering activity. Requires immediate investigation and STR filing."
                />
            </div>
            <div className="space-y-4">
                <h3 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-2">Comments</h3>
                <textarea 
                    className="w-full min-h-[100px] p-4 text-sm border border-gray-300 rounded-sm focus:outline-none focus:border-[#2A53A0] focus:ring-1 focus:ring-[#2A53A0] resize-none bg-white"
                    placeholder="Enter your notes and comments..."
                />
            </div>
        </div>

      </div>

      <ScrollToTopButton scrollRef={scrollRef} />
    </div>
  );
}

function FormDropdown({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">{label}</label>
            <div className="relative">
                <select 
                    className="w-full h-[40px] px-3 pr-8 text-sm border border-gray-300 rounded-sm focus:outline-none focus:border-[#2A53A0] focus:ring-1 focus:ring-[#2A53A0] appearance-none bg-white text-gray-900 cursor-pointer"
                    defaultValue={value}
                >
                    <option>{value}</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
            </div>
        </div>
    );
}

function FormInput({ label, placeholder, value, icon, readOnly, required }: { label: string; placeholder?: string; value?: string; icon?: React.ReactNode; readOnly?: boolean; required?: boolean }) {
    return (
        <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">{label}</label>
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        {icon}
                    </div>
                )}
                <input 
                    type="text"
                    className={cn(
                        "w-full h-[40px] px-3 text-sm border border-gray-300 rounded-sm focus:outline-none focus:border-[#2A53A0] focus:ring-1 focus:ring-[#2A53A0] bg-white text-gray-900 placeholder:text-gray-400",
                        icon && "pl-10"
                    )}
                    placeholder={placeholder}
                    defaultValue={value}
                    readOnly={readOnly}
                />
            </div>
        </div>
    );
}

function FormTextArea({ label, placeholder, required }: { label: string; placeholder?: string; required?: boolean }) {
    return (
        <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">{label}</label>
            <textarea 
                className="w-full min-h-[80px] p-3 text-sm border border-gray-300 rounded-sm focus:outline-none focus:border-[#2A53A0] focus:ring-1 focus:ring-[#2A53A0] resize-none bg-white text-gray-900 placeholder:text-gray-400"
                placeholder={placeholder}
            />
        </div>
    );
}
