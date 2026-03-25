import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface RegulatoryReportViewProps {
  reportType: string; // e.g., "STR", "CTR", "NTR", "CBWTR", "CCR"
}

import { RegulatoryReportTable } from "./regulatory-report-table";
import { RegulatoryReviewTable } from "./regulatory-review-table";
import { RegulatoryPendingTable } from "./regulatory-pending-table";
import { RegulatoryCorrectedTable } from "./regulatory-corrected-table";
import { RegulatoryConsolidatedTable } from "./regulatory-consolidated-table";

export function RegulatoryReportView({ reportType }: RegulatoryReportViewProps) {
  // Ensure reportType is uppercase for display
  const type = reportType.toUpperCase();
  const [activeTab, setActiveTab] = React.useState("summary");

  return (
    <div className="w-full h-full bg-gray-50/50 flex flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col gap-0">
        <div className="bg-white border-b border-gray-200 dark:border-gray-800 px-6 sticky top-0 z-10 shadow-sm">
            <TabsList className="bg-transparent h-11 p-0 w-full justify-start gap-6">
              <TabsTrigger 
                value="summary"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#2A53A0] data-[state=active]:border-b-2 data-[state=active]:border-t-0 data-[state=active]:border-x-0 data-[state=active]:border-[#2A53A0] rounded-none h-11 px-2 text-sm font-medium text-gray-600 border-b-2 border-t-0 border-x-0 border-transparent transition-all hover:text-[#2A53A0] hover:bg-gray-50 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none flex items-center gap-1.5"
              >
                Report Summary
              </TabsTrigger>
              <TabsTrigger 
                value="review"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#2A53A0] data-[state=active]:border-b-2 data-[state=active]:border-t-0 data-[state=active]:border-x-0 data-[state=active]:border-[#2A53A0] rounded-none h-11 px-2 text-sm font-medium text-gray-600 border-b-2 border-t-0 border-x-0 border-transparent transition-all hover:text-[#2A53A0] hover:bg-gray-50 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none flex items-center gap-1.5"
              >
                {type} Review
              </TabsTrigger>
              <TabsTrigger 
                value="pending"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#2A53A0] data-[state=active]:border-b-2 data-[state=active]:border-t-0 data-[state=active]:border-x-0 data-[state=active]:border-[#2A53A0] rounded-none h-11 px-2 text-sm font-medium text-gray-600 border-b-2 border-t-0 border-x-0 border-transparent transition-all hover:text-[#2A53A0] hover:bg-gray-50 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none flex items-center gap-1.5"
              >
                Pending for Approval
              </TabsTrigger>
              <TabsTrigger 
                value="corrected"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#2A53A0] data-[state=active]:border-b-2 data-[state=active]:border-t-0 data-[state=active]:border-x-0 data-[state=active]:border-[#2A53A0] rounded-none h-11 px-2 text-sm font-medium text-gray-600 border-b-2 border-t-0 border-x-0 border-transparent transition-all hover:text-[#2A53A0] hover:bg-gray-50 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none flex items-center gap-1.5"
              >
                Corrected {type}
              </TabsTrigger>
              <TabsTrigger 
                value="consolidated"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#2A53A0] data-[state=active]:border-b-2 data-[state=active]:border-t-0 data-[state=active]:border-x-0 data-[state=active]:border-[#2A53A0] rounded-none h-11 px-2 text-sm font-medium text-gray-600 border-b-2 border-t-0 border-x-0 border-transparent transition-all hover:text-[#2A53A0] hover:bg-gray-50 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none flex items-center gap-1.5"
              >
                Consolidated {type}
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 p-4 bg-gray-50/30 overflow-y-auto">
            <TabsContent value="summary" className="h-full mt-0 focus-visible:outline-none focus-visible:ring-0">
               <RegulatoryReportTable reportType={type} />
            </TabsContent>
            
            <TabsContent value="review" className="h-full mt-0 focus-visible:outline-none focus-visible:ring-0">
               <RegulatoryReviewTable reportType={type} onSwitchTab={setActiveTab} />
            </TabsContent>
            
            <TabsContent value="pending" className="h-full mt-0 focus-visible:outline-none focus-visible:ring-0">
               <RegulatoryPendingTable reportType={type} onSwitchTab={setActiveTab} />
            </TabsContent>
            
            <TabsContent value="corrected" className="h-full mt-0 focus-visible:outline-none focus-visible:ring-0">
               <RegulatoryCorrectedTable reportType={type} />
            </TabsContent>
            
            <TabsContent value="consolidated" className="h-full mt-0 focus-visible:outline-none focus-visible:ring-0">
               <RegulatoryConsolidatedTable reportType={type} />
            </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
