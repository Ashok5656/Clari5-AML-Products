import { useState } from "react";
import { ArrowLeft, Upload, Calendar as CalendarIcon, Search, ChevronDown, ChevronRight, Info, Save, Play } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";

interface CreateSimulationProps {
  onBack: () => void;
}

export function CreateSimulation({ onBack }: CreateSimulationProps) {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [simulationDescription, setSimulationDescription] = useState("");
  const [simulationType, setSimulationType] = useState("Based on Entity Type");
  const [runTiming, setRunTiming] = useState("Run Immediately after Authorization");
  const [entityType, setEntityType] = useState("Customer");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const isFormValid = 
    selectedScenario !== null &&
    simulationDescription.trim() !== "" &&
    fileUploaded &&
    startDate !== "" &&
    endDate !== "";
  
  const scenarios = [
    { id: "1", name: "AB_HIGH_VAL_CR_GT 1.3MAVG", type: "Customer", category: "AML" },
    { id: "2", name: "ACCNT_DRAINAGE_SBA", type: "Account", category: "EFM" },
    { id: "3", name: "ACCNT_PRCNT_DRAINAGE_CR_DR", type: "Account", category: "AML" },
    { id: "4", name: "ACCOUNT_BIDIRECTIONAL_WIRES_AML", type: "Customer", category: "EFM" },
    { id: "5", name: "ACCOUNT_STRUCTURED_DEPOSIT_AML", type: "Customer", category: "EFM" },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50/50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="h-[46px] text-gray-600 hover:text-gray-900 hover:bg-gray-100 -ml-2">
            <ArrowLeft className="size-4 mr-2" /> Back to All Simulations
          </Button>
        </div>
        <div className="text-right">
          <h1 className="text-lg font-bold text-gray-900">Create Simulation</h1>
          <p className="text-xs text-gray-500">Configure and launch transaction analysis simulation</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Column: Basic Settings */}
          <Card className="shadow-sm border-gray-200 h-fit">
            <CardHeader className="pb-4 border-b border-gray-100 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-bold text-gray-900">Basic Settings</CardTitle>
              <Badge variant="secondary" className="bg-blue-50 text-[#2A53A0] border-blue-100">Step 1</Badge>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Description */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">Simulation Description <span className="text-red-500">*</span></label>
                <textarea 
                  className="flex min-h-[80px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A53A0] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="E.g., Testing high-value transaction patterns for Q4 2024 compliance review..."
                  value={simulationDescription}
                  onChange={(e) => setSimulationDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Simulation Type */}
                <div className="space-y-5">
                  <label className="text-sm font-medium text-gray-700">Simulation Type <span className="text-red-500">*</span></label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="simType" 
                        className="text-[#2A53A0] focus:ring-[#2A53A0]" 
                        checked={simulationType === "Based on Entity Type"}
                        onChange={() => setSimulationType("Based on Entity Type")}
                      />
                      <span className="text-sm text-gray-700">Based on Entity Type</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="simType" 
                        className="text-[#2A53A0] focus:ring-[#2A53A0]" 
                        checked={simulationType === "Based on all Transactions"}
                        onChange={() => setSimulationType("Based on all Transactions")}
                      />
                      <span className="text-sm text-gray-700">Based on all Transactions</span>
                    </label>
                  </div>
                </div>

                {/* Simulation Run Timing */}
                <div className="space-y-5">
                  <label className="text-sm font-medium text-gray-700">Simulation Run Timing <span className="text-red-500">*</span></label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="runTiming" 
                        className="text-[#2A53A0] focus:ring-[#2A53A0]" 
                        checked={runTiming === "Run Immediately after Authorization"}
                        onChange={() => setRunTiming("Run Immediately after Authorization")}
                      />
                      <span className="text-sm text-gray-700">Run Immediately after Authorization</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="runTiming" 
                        className="text-[#2A53A0] focus:ring-[#2A53A0]" 
                        checked={runTiming === "Schedule to"}
                        onChange={() => setRunTiming("Schedule to")}
                      />
                      <span className="text-sm text-gray-700">Schedule to</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-md p-3 flex gap-3 text-xs text-blue-700">
                <Info className="size-4 shrink-0 mt-0.5 text-[#2A53A0]" />
                <p>
                  <span className="font-semibold text-[#2A53A0]">Entity Analysis:</span> Analyze transactions for this scenario by uploading a CSV file containing Entity ID(s). This scenario is in Customer Workspace, so Entity ID means Customer ID. Select a date range to define the transaction analysis period. Maximum file size: 20 MB.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Entity Type */}
                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-700">Entity Type <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select 
                      className="flex h-[46px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A53A0] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                      value={entityType}
                      onChange={(e) => setEntityType(e.target.value)}
                    >
                      <option value="Customer">Customer</option>
                      <option value="Account">Account</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-4 size-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                {/* Upload */}
                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-700">Customer Details Upload <span className="text-red-500">*</span></label>
                  <div 
                    className="flex h-[46px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm items-center text-gray-500 cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-colors gap-2"
                    onClick={() => setFileUploaded(true)} // Simulate upload
                  >
                    <Upload className="size-4" />
                    <span className={cn(fileUploaded ? "text-green-600" : "text-gray-500")}>
                      {fileUploaded ? "customers_list_q4.csv" : "Click to upload CSV"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Start Date */}
                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-700">Start Date <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <div className="flex h-[46px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm items-center cursor-pointer hover:bg-gray-50 transition-colors gap-2">
                      <CalendarIcon className="size-4 text-gray-500" />
                      <input 
                        type="date" 
                        className="bg-transparent w-full h-full focus:outline-none text-gray-700"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* End Date */}
                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-700">End Date <span className="text-red-500">*</span></label>
                  <div className="relative">
                     <div className="flex h-[46px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm items-center cursor-pointer hover:bg-gray-50 transition-colors gap-2">
                      <CalendarIcon className="size-4 text-gray-500" />
                      <input 
                        type="date" 
                        className="bg-transparent w-full h-full focus:outline-none text-gray-700"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column: Scenario Selection */}
          <Card className="shadow-sm border-gray-200 h-full flex flex-col">
            <CardHeader className="pb-4 border-b border-gray-100 flex flex-row items-center justify-between shrink-0">
              <CardTitle className="text-base font-bold text-gray-900">Scenario Selection</CardTitle>
              <Badge variant="secondary" className="bg-blue-50 text-[#2A53A0] border-blue-100">Step 2</Badge>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">Scenario List</h3>
                <div className="flex gap-2">
                  <div className="relative w-[200px]">
                    <Search className="absolute left-2.5 top-[15px] size-4 text-gray-400" />
                    <Input placeholder="Search scenarios..." className="pl-9 h-[46px] text-sm" />
                  </div>
                  <Button variant="outline" className="h-[46px] px-3 gap-2 text-xs font-normal">
                    All Types <ChevronDown className="size-3" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-1 -mr-2 space-y-2">
                {scenarios.map((scenario) => (
                  <div 
                    key={scenario.id}
                    className={cn(
                      "border rounded-lg p-3 transition-all cursor-pointer",
                      selectedScenario === scenario.id 
                        ? "border-[#2A53A0] bg-blue-50/20 shadow-sm ring-1 ring-[#2A53A0]/10" 
                        : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                    )}
                    onClick={() => setSelectedScenario(scenario.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "size-4 rounded-full border flex items-center justify-center transition-colors",
                          selectedScenario === scenario.id ? "border-[#2A53A0] bg-[#2A53A0]" : "border-gray-300 bg-white"
                        )}>
                          {selectedScenario === scenario.id && <div className="size-1.5 rounded-full bg-white" />}
                        </div>
                        <span className={cn(
                          "text-sm font-medium", 
                          selectedScenario === scenario.id ? "text-[#2A53A0]" : "text-gray-700"
                        )}>{scenario.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={cn("text-[10px] h-5", 
                          scenario.type === "Customer" ? "bg-purple-50 text-purple-700 border-purple-100" : "bg-emerald-50 text-emerald-700 border-emerald-100"
                        )}>
                          {scenario.type}
                        </Badge>
                         <Badge variant="secondary" className={cn("text-[10px] h-5", 
                          scenario.category === "AML" ? "bg-red-50 text-red-700 border-red-100" : "bg-blue-50 text-blue-700 border-blue-100"
                        )}>
                          {scenario.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="pl-7">
                      <div className="flex items-center text-xs text-gray-400 hover:text-[#2A53A0] cursor-pointer w-fit transition-colors group">
                        <span>View Configuration Details</span>
                        <ChevronDown className="size-3 ml-1 group-hover:translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
        <Button variant="outline" onClick={onBack} className="h-[46px] text-gray-600 border-gray-300 hover:bg-gray-50">Cancel</Button>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="h-[46px] text-[#2A53A0] border-[#2A53A0] hover:bg-[#2A53A0]/5 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isFormValid}
          >
            <Save className="size-4 mr-2" /> Save Draft
          </Button>
          <Button 
            className={`h-[46px] text-sm font-semibold rounded-xl shadow-lg transition-all duration-300 group overflow-hidden relative
              ${!isFormValid 
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed shadow-none' 
                : 'bg-[#2A53A0] hover:bg-[#1e3d7a] text-white shadow-blue-900/20 hover:shadow-blue-900/30 hover:-translate-y-0.5'
              }`}
            disabled={!isFormValid}
          >
            {isFormValid && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
            )}
            <Play className="size-4 mr-2 fill-current" /> Create Simulation
          </Button>
        </div>
      </div>
    </div>
  );
}
