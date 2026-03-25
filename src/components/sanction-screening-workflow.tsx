import { useState } from "react";
import { 
  Info, 
  Search,
  Check,
  ChevronRight,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { toast } from "sonner@2.0.3";
import { useSortableData } from "../hooks/use-sortable-data";
import { SortableHeader } from "./ui/sortable-header";

interface SanctionScreeningWorkflowProps {
  breadcrumbs?: any[];
  onBreadcrumbNavigate?: (path: string) => void;
}

const STEPS = [
  { id: 1, label: "Basic Information" },
  { id: 2, label: "Risk Selection" },
  { id: 3, label: "Match Score Configuration" },
  { id: 4, label: "Result Configuration" }
];

export function SanctionScreeningWorkflow({ breadcrumbs, onBreadcrumbNavigate }: SanctionScreeningWorkflowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1: Basic Info - Reset to empty
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    description: "",
    purpose: ""
  });

  // Step 2: Risk Selection - All unchecked
  const [riskLists, setRiskLists] = useState([
    { id: "un", name: "UN Consolidated List", desc: "United Nations consolidated sanctions list", count: "8,923", freq: "Weekly", updated: "18/11/2025", checked: false },
    { id: "ofac", name: "US OFAC SDN", desc: "U.S. Treasury Specially Designated Nationals list", count: "12,547", freq: "Daily", updated: "19/11/2025", checked: false },
    { id: "nonsdn", name: "Non-SDN List", desc: "U.S. Treasury Non-SDN sanctioned entities", count: "3,842", freq: "Daily", updated: "19/11/2025", checked: false },
    { id: "eu", name: "EU List", desc: "European Union consolidated sanctions list", count: "15,234", freq: "Daily", updated: "19/11/2025", checked: false },
    { id: "uk", name: "UK HMT List", desc: "United Kingdom HM Treasury sanctions list", count: "9,876", freq: "Daily", updated: "18/11/2025", checked: false },
    { id: "pep", name: "PEP List", desc: "Politically Exposed Persons global database", count: "45,678", freq: "Weekly", updated: "19/11/2025", checked: false },
  ]);

  const toggleList = (id: string) => {
    setRiskLists(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  // Step 3: Match Score Configuration - Reset numeric values, keep structure
  // Using string for inputs to allow empty state, but state can hold numbers for logic if needed.
  // Here we initialize with 0 or empty string equivalents for the UI.
  const [idOverride, setIdOverride] = useState({ checked: false, threshold: 0, weight: 0 });
  const [attributes, setAttributes] = useState([
    { id: "name_eng", name: "Primary Name (English)", threshold: 0, weight: 0, checked: false },
    { id: "name_non_eng", name: "Primary Name (Non-English)", threshold: 0, weight: 0, checked: false },
    { id: "alias", name: "Alias", threshold: 0, weight: 0, checked: false },
    { id: "dob", name: "Date of Birth", threshold: 0, weight: 0, checked: false },
    { id: "address", name: "Address", threshold: 0, weight: 0, checked: false },
    { id: "nationality", name: "Nationality", threshold: 0, weight: 0, checked: false },
    { id: "country_birth", name: "Country of Birth", threshold: 0, weight: 0, checked: false },
    { id: "country_reg", name: "Country of Registration", threshold: 0, weight: 0, checked: false },
  ]);

  const updateAttribute = (id: string, field: string, value: any) => {
    setAttributes(prev => prev.map(attr => attr.id === id ? { ...attr, [field]: value } : attr));
  };

  const { items: sortedAttributes, requestSort: sortAttributes, sortConfig: attrSortConfig } = useSortableData(attributes);

  // Step 4: Result Configuration - Defaults
  const [resultConfig, setResultConfig] = useState({
    threshold: 0,
    topMatches: 0
  });

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    toast.success("Configuration created successfully");
  };

  const isStepValid = () => {
    switch(currentStep) {
      case 1:
        return basicInfo.name.trim().length > 0 && basicInfo.purpose.length > 0;
      case 2:
        return riskLists.some(list => list.checked);
      case 3:
        // Check if ID Override is checked and valid
        const isOverrideSelected = idOverride.checked;
        const isOverrideValid = !isOverrideSelected || (idOverride.threshold > 0 && idOverride.weight > 0);
        
        // Check if any attribute is selected
        const isAnyAttributeSelected = attributes.some(attr => attr.checked);
        
        // Check if all selected attributes have valid values
        const areAttributesValid = attributes.every(attr => !attr.checked || (attr.threshold > 0 && attr.weight > 0));
        
        // Must have at least one selection (override or attribute) and all selections must be valid
        return (isOverrideSelected || isAnyAttributeSelected) && isOverrideValid && areAttributesValid;
      case 4:
        return resultConfig.threshold > 0 && resultConfig.topMatches > 0;
      default:
        return false;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900/50">
      
      {/* Stepper Navigation */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-8 py-4 mb-6">
        <div className="max-w-4xl mx-auto w-full">
          <div className="relative flex items-center justify-between w-full">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-200 dark:bg-gray-700 -z-0 -translate-y-1/2" />
            
            {/* Steps */}
            {STEPS.map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="relative z-10 flex flex-row items-center gap-2 bg-white dark:bg-gray-900 px-2">
                  <div 
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors duration-200
                      ${isActive || isCompleted 
                        ? 'bg-[#2A53A0] border-[#2A53A0] text-white' 
                        : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500'}
                    `}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  <span className={`text-xs font-medium whitespace-nowrap ${isActive ? 'text-[#2A53A0]' : 'text-gray-500'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col w-full px-4 overflow-hidden">
        
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="flex-1 overflow-auto">
             <Card className="border-gray-200 dark:border-gray-800 shadow-sm h-full">
               <CardContent className="p-8 space-y-8">
                 <div className="space-y-2">
                    <Label className="text-gray-700 font-semibold">Watchlist Name <span className="text-red-500">*</span></Label>
                    <Input 
                      value={basicInfo.name}
                      onChange={(e) => setBasicInfo({...basicInfo, name: e.target.value})}
                      placeholder="e.g., Customer Onboarding for Lending"
                      className="h-11 bg-white border-[#C6C6C6]"
                    />
                 </div>

                 <div className="space-y-2">
                    <Label className="text-gray-700 font-semibold">Description</Label>
                    <Textarea 
                      value={basicInfo.description}
                      onChange={(e) => setBasicInfo({...basicInfo, description: e.target.value})}
                      placeholder="Describe the purpose and usage of this watchlist configuration"
                      className="min-h-[120px] bg-white resize-y border-[#C6C6C6]"
                    />
                 </div>

                 <div className="space-y-2">
                    <Label className="text-gray-700 font-semibold">Purpose</Label>
                    <Select value={basicInfo.purpose} onValueChange={(val) => setBasicInfo({...basicInfo, purpose: val})}>
                      <SelectTrigger className="w-full h-[46px] min-h-[46px] flex items-center bg-white border-[#C6C6C6] px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Customer Onboarding">Customer Onboarding</SelectItem>
                        <SelectItem value="Transaction Monitoring">Transaction Monitoring</SelectItem>
                        <SelectItem value="Periodic Review">Periodic Review</SelectItem>
                      </SelectContent>
                    </Select>
                 </div>
               </CardContent>
             </Card>
          </div>
        )}

        {/* Step 2: Risk Selection */}
        {currentStep === 2 && (
          <div className="flex-1 overflow-auto">
             <div className="flex flex-col space-y-6">
               <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-1">
                      Sanctions Lists <span className="text-red-500">*</span>
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Select which sanctions lists to include in this watchlist</p>
                  </div>
                  <div className="relative w-[300px]">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                     <Input placeholder="Search by name or description" className="pl-9 h-10 bg-white border-[#C6C6C6]" />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {riskLists.map((list) => (
                   <div 
                     key={list.id} 
                     className={`
                       relative border rounded-lg p-5 bg-white dark:bg-gray-900 transition-all hover:shadow-md cursor-pointer
                       ${list.checked ? 'border-[#2A53A0] ring-1 ring-[#2A53A0]' : 'border-[#C6C6C6] dark:border-gray-800'}
                     `}
                     onClick={() => toggleList(list.id)}
                   >
                     {list.checked && (
                       <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-[#2A53A0] border-l-[40px] border-l-transparent rounded-tr-lg">
                          <Check className="absolute -top-[34px] -left-[18px] w-4 h-4 text-white" />
                       </div>
                     )}
                     
                     <div className="flex items-start gap-4">
                       <Checkbox 
                         checked={list.checked} 
                         onCheckedChange={() => toggleList(list.id)}
                         className="mt-1 border-[#C6C6C6]"
                       />
                       <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-base">{list.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">{list.desc}</p>
                          
                          <div className="flex items-end justify-between mt-4">
                             <span className="text-xs font-medium text-gray-500">{list.count} entries</span>
                             <div className="text-right">
                                <div className={`text-xs font-medium mb-0.5 ${list.freq === 'Daily' ? 'text-green-600' : 'text-blue-600'}`}>{list.freq}</div>
                                <div className="text-[10px] text-gray-400">Last updated on {list.updated}</div>
                             </div>
                          </div>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        )}

        {/* Step 3: Match Score Configuration */}
        {currentStep === 3 && (
          <div className="flex-1 overflow-hidden flex flex-col">
             <div className="flex-none mb-6">
                <div className="flex items-center justify-between">
                   <h2 className="text-lg font-bold text-gray-900 dark:text-white">Match Configuration</h2>
                   <Button variant="ghost" className="text-[#2A53A0] text-sm h-8 gap-1.5 hover:bg-blue-50">
                      <Info className="w-4 h-4" /> Configure threshold and weight for each matching attribute
                   </Button>
                </div>

                {/* Override Attribute */}
                <div className="bg-[#FFF9E6] border border-[#FFD580] rounded-lg p-4 mt-6">
                   <div className="flex items-center gap-3 mb-2">
                      <Badge className="bg-[#FFA500] hover:bg-[#FFA500] text-white rounded font-bold text-[10px] h-5 px-1.5 border-0">OVERRIDE ATTRIBUTE</Badge>
                      <span className="text-xs text-gray-700 font-medium">If ID Number matches, overall match score is automatically set to 100%</span>
                   </div>
                   
                   <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3">
                         <Checkbox 
                           checked={idOverride.checked} 
                           onCheckedChange={(c) => setIdOverride({...idOverride, checked: !!c})}
                           className="data-[state=checked]:bg-[#2A53A0] data-[state=checked]:border-[#2A53A0] border-[#C6C6C6]"
                         />
                         <Label className="text-sm font-bold text-gray-900">ID Number / Registration Number</Label>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 font-medium uppercase">Threshold:</span>
                            <div className="flex items-center relative">
                               <Input 
                                 value={idOverride.threshold || ""} 
                                 onChange={(e) => setIdOverride({...idOverride, threshold: Number(e.target.value)})}
                                 className="w-16 h-8 text-center bg-white border-[#C6C6C6] pr-4"
                                 disabled={!idOverride.checked}
                               />
                               <span className="absolute right-2 text-xs text-gray-500">%</span>
                            </div>
                         </div>
                         <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 font-medium uppercase">Weight:</span>
                            <Input 
                              value={idOverride.weight || ""} 
                              onChange={(e) => setIdOverride({...idOverride, weight: Number(e.target.value)})}
                              className="w-16 h-8 text-center bg-white border-[#C6C6C6]"
                              disabled={!idOverride.checked}
                            />
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Attributes Table */}
             <div className="flex-1 overflow-hidden flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
                <div className="flex-1 overflow-auto">
                  <Table>
                    <thead className="sticky top-0 z-10 shadow-sm">
                      <tr className="bg-[#F0F0F0] text-[#161616] h-[48px]">
                        <th className="pl-4 px-4 font-bold text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-left w-1/2">
                          <SortableHeader column="name" label="Attribute Name" sortConfig={attrSortConfig} onSort={sortAttributes} />
                        </th>
                        <th className="px-4 font-bold text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-center">
                          <SortableHeader column="threshold" label="Threshold (%)" sortConfig={attrSortConfig} onSort={sortAttributes} className="justify-center" />
                        </th>
                        <th className="px-4 font-bold text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap text-center">
                          <SortableHeader column="weight" label="Weight (1-100)" sortConfig={attrSortConfig} onSort={sortAttributes} className="justify-center" />
                        </th>
                      </tr>
                    </thead>
                    <TableBody>
                      {sortedAttributes.map((attr) => (
                        <TableRow key={attr.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800 h-[56px]">
                          <TableCell className="px-4 align-middle text-[15px] font-medium text-gray-900 dark:text-white">
                             <div className="flex items-center gap-3">
                               <Checkbox 
                                 checked={attr.checked} 
                                 onCheckedChange={(c) => updateAttribute(attr.id, 'checked', !!c)}
                                 className="data-[state=checked]:bg-[#2A53A0] data-[state=checked]:border-[#2A53A0] border-[#C6C6C6]"
                               />
                               <span>{attr.name}</span>
                             </div>
                          </TableCell>
                          <TableCell className="px-4 align-middle text-center">
                             <div className="flex justify-center">
                               <Input 
                                 type="number" 
                                 value={attr.threshold || ""}
                                 onChange={(e) => updateAttribute(attr.id, 'threshold', Number(e.target.value))}
                                 disabled={!attr.checked}
                                 className="w-20 h-9 text-center border-[#C6C6C6]"
                               />
                             </div>
                          </TableCell>
                          <TableCell className="px-4 align-middle text-center">
                             <div className="flex justify-center">
                               <Input 
                                 type="number"
                                 value={attr.weight || ""}
                                 onChange={(e) => updateAttribute(attr.id, 'weight', Number(e.target.value))}
                                 disabled={!attr.checked}
                                 className="w-20 h-9 text-center border-[#C6C6C6]"
                               />
                             </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
             </div>
          </div>
        )}

        {/* Step 4: Result Configuration */}
        {currentStep === 4 && (
          <div className="flex-1 overflow-auto">
             <div className="flex flex-col space-y-8">
                {/* Overall Score Threshold */}
                <div className="space-y-4">
                   <div className="space-y-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Overall Score Threshold</h3>
                      <p className="text-sm text-gray-500">Minimum aggregate match score required to generate an alert</p>
                   </div>
                   
                   <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-[#C6C6C6] dark:border-blue-900 rounded-lg p-6">
                      <div className="flex items-center gap-4 mb-2">
                         <span className="text-sm font-semibold text-gray-700 w-32">Alert Threshold</span>
                         <div className="flex-1 px-2">
                            <Slider 
                              value={[resultConfig.threshold]} 
                              max={100} 
                              step={1} 
                              onValueChange={(val) => setResultConfig({...resultConfig, threshold: val[0]})}
                              className="[&>.relative>.absolute]:bg-[#2A53A0]"
                            />
                         </div>
                         <div className="flex items-center gap-2">
                            <Input 
                               value={resultConfig.threshold} 
                               onChange={(e) => setResultConfig({...resultConfig, threshold: Number(e.target.value)})}
                               className="w-16 h-10 text-center font-bold text-lg border-[#C6C6C6]"
                            />
                            <span className="text-lg font-bold text-gray-700">%</span>
                         </div>
                      </div>
                      <div className="flex justify-between pl-[145px] pr-[100px] text-xs text-gray-500 font-medium">
                         <span>More Alerts (0%)</span>
                         <span>Fewer Alerts (100%)</span>
                      </div>
                   </div>

                   <div className="flex gap-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-[8px] border border-[#C6C6C6]">
                      <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                      <div>
                         <p className="font-semibold text-gray-700 mb-1">How scoring works:</p>
                         <p>The system calculates a weighted aggregate score based on the match percentages for each field. If the overall score exceeds {resultConfig.threshold}%, an alert will be generated.</p>
                      </div>
                   </div>
                </div>

                {/* Maximum Results */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                   <div className="space-y-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Maximum Results</h3>
                      <p className="text-sm text-gray-500">Limit the number of top matches to display in screening results</p>
                   </div>
                   
                   <div className="border border-[#C6C6C6] rounded-lg p-6 flex items-center justify-between bg-white dark:bg-gray-900">
                      <div className="space-y-1">
                         <h4 className="font-bold text-sm text-gray-900">Show Top N Matches</h4>
                         <p className="text-sm text-gray-500">Only the top {resultConfig.topMatches} highest-scoring matches will be displayed for each screening request.</p>
                      </div>
                      <div className="flex items-center gap-3">
                         <Input 
                            value={resultConfig.topMatches || ""}
                            onChange={(e) => setResultConfig({...resultConfig, topMatches: Number(e.target.value)})}
                            className="w-20 h-10 text-center font-bold border-[#C6C6C6]"
                         />
                         <span className="text-sm text-gray-500">matches</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between pb-4">
          <Button 
            variant="outline" 
            onClick={prevStep} 
            disabled={currentStep === 1}
            className="h-11 px-6 gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          
          <Button 
            className="h-11 px-8 gap-2 bg-[#2A53A0] hover:bg-[#1e3a70] text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={currentStep === STEPS.length ? handleFinish : nextStep}
            disabled={!isStepValid()}
          >
            {currentStep === STEPS.length ? "Create Configuration" : "Next Step"} 
            {currentStep !== STEPS.length && <ArrowRight className="w-4 h-4" />}
          </Button>
        </div>

      </div>
    </div>
  );
}
