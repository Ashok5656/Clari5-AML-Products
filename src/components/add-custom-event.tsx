import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight,
  ChevronDown, 
  Edit, 
  Upload, 
  Add, 
  Information, 
  TrashCan, 
  Settings, 
  View, 
  CheckmarkFilled,
  Warning,
  StarFilled,
  ChevronRight,
  List,
  Tag
} from "@carbon/icons-react";
import { cn } from "./ui/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableRow, TableHead, TableHeader } from "./ui/table";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription,
  DialogClose
} from "./ui/dialog";
import { motion, AnimatePresence } from "motion/react";
import { FieldDialog } from "./field-dialog";
import { AddDerivedFieldDialog } from "./add-derived-field-dialog";

import { CreationLoader } from "./creation-loader";
import { CreationSuccessDialog } from "./creation-success-dialog";

interface Field {
  id: string;
  name: string;
  type: string;
  constraints: string;
  required: boolean;
  pii: boolean;
  category: 'Derived' | 'Custom' | 'Standard';
}

interface FieldData {
  name: string;
  type: 'SYSTEM' | 'CUSTOM' | 'DERIVED';
  source: string;
  dataType: string;
  description: string;
  displayName?: string;
  maxLength?: string;
  isPii?: boolean;
}

const mockDerivedFields: Field[] = [
  { id: '1', name: 'is_device_new', type: 'Boolean', constraints: '[System Computed]', required: false, pii: false, category: 'Derived' },
  { id: '2', name: 'is_cpty_new', type: 'Boolean', constraints: '[System Computed]', required: false, pii: false, category: 'Derived' },
  { id: '3', name: 'is_beneficiary_new', type: 'Boolean', constraints: '[System Computed]', required: false, pii: false, category: 'Derived' },
  { id: '4', name: 'is_ip_new', type: 'Boolean', constraints: '[System Computed]', required: false, pii: false, category: 'Derived' },
  { id: '5', name: 'is_origination_country_new', type: 'Boolean', constraints: '[System Computed]', required: false, pii: false, category: 'Derived' },
  { id: '6', name: 'is_cpty_country_new', type: 'Boolean', constraints: '[System Computed]', required: false, pii: false, category: 'Derived' },
  { id: '7', name: 'cross_border_velocity', type: 'Integer', constraints: '[System Computed]', required: false, pii: false, category: 'Derived' },
];

interface AddCustomEventProps {
  onBack: () => void;
  onComplete: (data: any) => void;
}

export const AddCustomEvent: React.FC<AddCustomEventProps> = ({ onBack, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAddFieldOpen, setIsAddFieldOpen] = useState(false);
  const [isAddDerivedFieldOpen, setIsAddDerivedFieldOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    status: 'Active',
    description: ''
  });
  const [fields, setFields] = useState<Field[]>([]); // Start with empty fields as requested per Figma mock
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const steps = [
    { id: 1, label: 'Event Information' },
    { id: 2, label: 'Field Configuration' },
    { id: 3, label: 'Review and Create Event' }
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Step 3: Review and Create Event
      setIsSubmitting(true);
      
      // Mock loading delay
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
      }, 2000);
    }
  };

  const handleComplete = () => {
    setShowSuccess(false);
    onComplete({ ...formData, fields });
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    else onBack();
  };

  const handleSaveCustomField = (fieldData: FieldData) => {
    const field: Field = {
      id: Math.random().toString(36).substr(2, 9),
      name: fieldData.name,
      type: fieldData.dataType,
      constraints: fieldData.maxLength ? `Max Length: ${fieldData.maxLength}` : '—',
      required: true,
      pii: !!fieldData.isPii,
      category: 'Custom'
    };
    setFields([...fields, field]);
    setIsAddFieldOpen(false);
  };

  const handleAddDerivedFields = (selectedFields: any[]) => {
    const newDerivedFields: Field[] = selectedFields.map(f => ({
      id: Math.random().toString(36).substr(2, 9),
      name: f.name,
      type: f.dataType,
      constraints: '[System Computed]',
      required: false,
      pii: !!f.isPii,
      category: 'Derived'
    }));
    setFields([...fields, ...newDerivedFields]);
    setIsAddDerivedFieldOpen(false);
  };

  const renderStepper = () => (
    <div className="h-[73px] bg-white border-b border-[#F3F4F6] flex items-center px-12 gap-6 relative">
      {steps.map((step, idx) => (
        <div key={step.id} className="contents">
          <div className="flex items-center gap-3">
            <div className={cn(
              "size-8 rounded-full flex items-center justify-center text-[13px] font-bold border-2 transition-all",
              currentStep === step.id 
                ? "bg-[#2A53A0] border-[#2A53A0] text-white shadow-sm" 
                : currentStep > step.id 
                  ? "bg-[#198038] border-[#198038] text-white" 
                  : "bg-white border-[#D1D5DC] text-[#99A1AF]"
            )}>
              {currentStep > step.id ? <CheckmarkFilled className="size-5" /> : step.id}
            </div>
            <span className={cn(
              "text-[13px] font-semibold",
              currentStep === step.id ? "text-[#2A53A0]" : "text-[#525252]"
            )}>
              {step.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div className="flex-1 h-[2px] bg-[#E5E7EB]" />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="flex-1 p-12 overflow-hidden">
      <div className="max-w-[70%] mx-auto space-y-7">
        <div className="space-y-2">
          <Label className="text-[14px] font-semibold text-[#161616]">Event Category</Label>
          <div className="flex items-center gap-2 px-3 !h-[46px] w-full bg-white border border-[#E8DAFF] rounded-[8px] shadow-sm">
            <StarFilled className="size-4 text-[#8A3FFC]" />
            <span className="text-[11px] font-medium text-[#8A3FFC]">Custom</span>
            <span className="text-[12px] text-[#99A1AF]">(Read-only)</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[14px] font-semibold text-[#161616]">
            Event Name <span className="text-[#FB2C36]">*</span>
          </Label>
          <Input 
            placeholder="Enter event name (e.g., High_Value_Wire_Transfer)"
            className="!h-[46px] bg-white rounded-[8px] border-[#D1D5DC] text-[14px]"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[14px] font-semibold text-[#161616]">
            Event Type <span className="text-[#FB2C36]">*</span>
          </Label>
          <Select value={formData.type} onValueChange={(v) => setFormData({...formData, type: v})}>
            <SelectTrigger className="!h-[46px] bg-white rounded-[8px] border-[#D1D5DC] text-[#717182]">
              <SelectValue placeholder="Select type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Financial">Financial</SelectItem>
              <SelectItem value="Non-Financial">Non-Financial</SelectItem>
              <SelectItem value="Account">Account</SelectItem>
              <SelectItem value="Customer">Customer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-[14px] font-semibold text-[#161616]">
            Status <span className="text-[#FB2C36]">*</span>
          </Label>
          <RadioGroup 
            value={formData.status} 
            onValueChange={(v) => setFormData({...formData, status: v})}
            className="flex items-center gap-6 pt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Active" id="status-active" className="text-[#2A53A0] border-[#D1D5DC]" />
              <Label htmlFor="status-active" className="text-[14px] font-normal cursor-pointer">Active</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Inactive" id="status-inactive" className="text-[#2A53A0] border-[#D1D5DC]" />
              <Label htmlFor="status-inactive" className="text-[14px] font-normal cursor-pointer">Inactive</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label className="text-[14px] font-normal text-[#161616]">Description / Notes (Optional)</Label>
          <Textarea 
            placeholder="Enter details about this custom event..."
            className="min-h-[100px] bg-white rounded-[8px] border-[#D1D5DC] text-[14px] p-3"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
          <div className="text-right">
            <span className="text-[11px] text-[#99A1AF]">{formData.description.length}/500 characters</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="flex-1 flex flex-col overflow-hidden bg-white">
      <div className="p-12 pb-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-[15px] font-semibold text-[#161616]">Field Configuration</h2>
            <p className="text-[12px] text-[#6A7282]">Define the data structure for this custom event.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="!h-[46px] px-6 border-[#2A53A0] text-[13px] font-medium text-[#2A53A0] rounded-[8px] bg-white">
              <Upload className="size-4 mr-2" /> Upload
            </Button>
            <Button 
              variant="outline" 
              className="!h-[46px] px-6 border-[#D1D5DC] text-[13px] font-normal text-[#4A5565] rounded-[8px] bg-white"
              onClick={() => setIsAddDerivedFieldOpen(true)}
            >
              <List className="size-4 mr-2" /> Add Derived Field
            </Button>
            <Button 
              variant="outline" 
              className="!h-[46px] px-6 border-[#2A53A0] text-[13px] font-medium text-[#2A53A0] rounded-[8px] bg-white"
              onClick={() => setIsAddFieldOpen(true)}
            >
              <Add className="size-4 mr-2" /> Add Field
            </Button>
          </div>
        </div>

        <FieldDialog 
          isOpen={isAddFieldOpen} 
          onClose={() => setIsAddFieldOpen(false)} 
          onSave={handleSaveCustomField} 
        />

        <AddDerivedFieldDialog 
          isOpen={isAddDerivedFieldOpen} 
          onClose={() => setIsAddDerivedFieldOpen(false)} 
          onAdd={handleAddDerivedFields} 
        />

        <div className="rounded-[8px] border border-[#E5E7EB] overflow-hidden bg-white shadow-sm min-h-[238px]">
          <Table>
            <TableHeader className="bg-[#F4F4F4]">
              <TableRow className="hover:bg-transparent border-b border-[#E5E7EB]">
                <TableHead className="text-[14px] font-medium text-[#2A53A0] h-[46px] px-4 w-[28%]">Field / Display Name</TableHead>
                <TableHead className="text-[14px] font-medium text-[#2A53A0] h-[46px] px-4 w-[12%]">Type</TableHead>
                <TableHead className="text-[14px] font-medium text-[#2A53A0] h-[46px] px-4 w-[18%]">Constraints</TableHead>
                <TableHead className="text-[14px] font-medium text-[#2A53A0] h-[46px] px-4 w-[10%]">Req.</TableHead>
                <TableHead className="text-[14px] font-medium text-[#2A53A0] h-[46px] px-4 w-[8%]">PII</TableHead>
                <TableHead className="text-[14px] font-medium text-[#2A53A0] h-[46px] px-4 w-[16%]">Category</TableHead>
                <TableHead className="text-[14px] font-medium text-[#2A53A0] h-[46px] px-4 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.length === 0 ? (
                <TableRow className="hover:bg-transparent border-none">
                  <TableCell colSpan={7} className="h-[192px] text-center p-0">
                    <div className="flex flex-col items-center justify-center gap-3 opacity-50">
                      <Tag className="size-8 text-[#99A1AF]" />
                      <p className="text-[13px] text-[#99A1AF]">
                        No fields defined yet. Click "Add Field" or "Load Reference Data" to start.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                fields.map((field) => (
                  <TableRow key={field.id} className="hover:bg-gray-50/50 border-b border-[#F3F4F6] last:border-0 h-[46px]">
                    <TableCell className="py-3 px-4">
                      <div className="flex items-center gap-2">
                         <div className="size-[16px] shrink-0 flex items-center justify-center">
                            {field.category === 'Custom' ? (
                              <svg className="size-[14px]" viewBox="0 0 14 14" fill="none">
                                <path d="M7 1L1 4V10L7 13L13 10V4L7 1Z" fill="#0F62FE" fillOpacity="0.2" />
                                <path d="M7 1L1 4V10L7 13L13 10V4L7 1Z" stroke="#0F62FE" strokeWidth="1.2" />
                              </svg>
                            ) : (
                              <svg className="size-[14px]" viewBox="0 0 14 14" fill="none">
                                <path d="M7 1.5C3.96243 1.5 1.5 3.96243 1.5 7C1.5 10.0376 3.96243 12.5 7 12.5C10.0376 12.5 12.5 10.0376 12.5 7C12.5 3.96243 10.0376 1.5 7 1.5Z" fill="#8A3FFC" fillOpacity="0.2" />
                                <path d="M7 1.5C3.96243 1.5 1.5 3.96243 1.5 7C1.5 10.0376 3.96243 12.5 7 12.5C10.0376 12.5 12.5 10.0376 12.5 7C12.5 3.96243 10.0376 1.5 7 1.5Z" stroke="#8A3FFC" strokeWidth="1.2" />
                              </svg>
                            )}
                         </div>
                         <span className="text-[14px] font-medium text-[#161616]">{field.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 px-4 text-[13px] text-[#525252]">{field.type}</TableCell>
                    <TableCell className="py-3 px-4 text-[13px] text-[#99A1AF] italic">{field.constraints}</TableCell>
                    <TableCell className="py-3 px-4 text-[13px] text-[#99A1AF]">—</TableCell>
                    <TableCell className="py-3 px-4 text-[13px] text-[#99A1AF] text-center">—</TableCell>
                    <TableCell className="py-3 px-4">
                      <Badge className={cn(
                        "border-none text-[10px] font-bold rounded-[4px] px-2 h-5",
                        field.category === 'Derived' ? "bg-[#EAF2FF] text-[#2A53A0]" : "bg-[#F6F2FF] text-[#8A3FFC]"
                      )}>
                        {field.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" className="size-8 p-0 text-[#2A53A0] hover:bg-blue-50 rounded-[4px]">
                          <View className="size-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="size-8 p-0 text-[#525252] hover:bg-gray-100 rounded-[4px]">
                          <Settings className="size-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="size-8 p-0 text-[#FB2C36] hover:bg-red-50 rounded-[4px]">
                          <TrashCan className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="h-[75px] bg-[#EFF6FF] border-l-4 border-[#2A53A0] rounded-r-[8px] flex items-center px-5 gap-3">
          <Information className="size-5 text-[#2A53A0] shrink-0" />
          <div className="space-y-0.5">
            <p className="text-[13px] font-semibold text-[#2A53A0]">Heads up!</p>
            <p className="text-[12px] text-[#193CB8] leading-tight">
              All events automatically include standard audit fields like <code className="bg-white/50 px-1 rounded">tenant_id</code>, <code className="bg-white/50 px-1 rounded">event_id</code>, and <code className="bg-white/50 px-1 rounded">timestamp</code>. You only need to define custom business attributes here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="flex-1 p-8 space-y-6 overflow-y-auto">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
           <h3 className="text-[15px] font-bold text-[#161616]">Event Information</h3>
           <Button variant="ghost" className="h-8 text-[#2A53A0] hover:bg-blue-50 text-[13px] font-medium" onClick={() => setCurrentStep(1)}>
             <Edit className="size-4 mr-1" /> Edit
           </Button>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-5 shadow-sm">
           <div className="flex items-center gap-10 flex-wrap">
             <div className="flex items-center gap-2">
               <span className="text-[13px] text-[#525252]">Name:</span>
               <span className="text-[13px] font-bold text-[#161616]">{formData.name || 'Sample Event'}</span>
             </div>
             <div className="h-4 w-px bg-gray-200" />
             <div className="flex items-center gap-2">
               <span className="text-[13px] text-[#525252]">Type:</span>
               <span className="text-[13px] font-bold text-[#161616]">{formData.type || 'Financial'}</span>
             </div>
             <div className="h-4 w-px bg-gray-200" />
             <div className="flex items-center gap-2">
               <span className="text-[13px] text-[#525252]">Category:</span>
               <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#F6F2FF] border border-[#E8DAFF] rounded-full">
                 <StarFilled className="size-3 text-[#8A3FFC]" />
                 <span className="text-[10px] font-bold text-[#8A3FFC]">Custom</span>
               </div>
             </div>
             <div className="h-4 w-px bg-gray-200" />
             <div className="flex items-center gap-2">
               <span className="text-[13px] text-[#525252]">Status:</span>
               <Badge className="bg-[#DEFBE6] text-[#198038] border-none text-[10px] font-bold px-2 h-5">{formData.status}</Badge>
             </div>
           </div>
           <div className="mt-4 pt-4 border-t border-[#F3F4F6]">
             <span className="text-[13px] text-[#525252]">Description:</span>
             <p className="mt-1 text-[13px] text-[#161616]">{formData.description || 'No description provided.'}</p>
           </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
           <h3 className="text-[15px] font-bold text-[#161616]">Fields ({fields.length} Total)</h3>
           <Button variant="ghost" className="h-8 text-[#2A53A0] hover:bg-blue-50 text-[13px] font-medium" onClick={() => setCurrentStep(2)}>
             <Edit className="size-4 mr-1" /> Edit
           </Button>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-4 shadow-sm flex items-center gap-10">
           <div className="flex items-center gap-2">
             <span className="text-[13px] text-[#525252]">Custom:</span>
             <span className="text-[13px] font-bold text-[#161616]">0</span>
           </div>
           <div className="h-4 w-px bg-gray-200" />
           <div className="flex items-center gap-2">
             <span className="text-[13px] text-[#525252]">Derived:</span>
             <span className="text-[13px] font-bold text-[#161616]">{fields.length}</span>
           </div>
           <div className="h-4 w-px bg-gray-200" />
           <div className="flex items-center gap-2">
             <span className="text-[13px] text-[#525252]">PII:</span>
             <span className="text-[13px] font-bold text-[#161616]">0</span>
             <LockedIcon className="size-3 text-[#B89400]" />
           </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-[14px] font-semibold text-[#161616]">Derived Fields ({fields.length})</h3>
        <div className="rounded-[8px] border border-[#E5E7EB] overflow-hidden bg-white shadow-sm">
          <Table>
            <TableHeader className="bg-[#F8F9FB]">
              <TableRow className="hover:bg-transparent border-b border-[#E5E7EB]">
                <TableHead className="text-[13px] font-bold text-[#2A53A0] h-10 px-4 w-[40%]">Destination</TableHead>
                <TableHead className="text-[13px] font-bold text-[#2A53A0] h-10 px-4">Source</TableHead>
                <TableHead className="text-[13px] font-bold text-[#2A53A0] h-10 px-4 text-center">Condition</TableHead>
                <TableHead className="text-[13px] font-bold text-[#2A53A0] h-10 px-4 text-center">PII</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field) => (
                <TableRow key={field.id} className="hover:bg-gray-50/50 border-b border-[#F3F4F6] last:border-0 h-[46px]">
                  <TableCell className="py-3 px-4">
                    <div className="flex items-center gap-2">
                         <div className="size-[16px] shrink-0 flex items-center justify-center">
                            {field.category === 'Custom' ? (
                              <svg className="size-[14px]" viewBox="0 0 14 14" fill="none">
                                <path d="M7 1L1 4V10L7 13L13 10V4L7 1Z" fill="#0F62FE" fillOpacity="0.2" />
                                <path d="M7 1L1 4V10L7 13L13 10V4L7 1Z" stroke="#0F62FE" strokeWidth="1.2" />
                              </svg>
                            ) : (
                              <svg className="size-[14px]" viewBox="0 0 14 14" fill="none">
                                <path d="M7 1.5C3.96243 1.5 1.5 3.96243 1.5 7C1.5 10.0376 3.96243 12.5 7 12.5C10.0376 12.5 12.5 10.0376 12.5 7C12.5 3.96243 10.0376 1.5 7 1.5Z" fill="#8A3FFC" fillOpacity="0.2" />
                                <path d="M7 1.5C3.96243 1.5 1.5 3.96243 1.5 7C1.5 10.0376 3.96243 12.5 7 12.5C10.0376 12.5 12.5 10.0376 12.5 7C12.5 3.96243 10.0376 1.5 7 1.5Z" stroke="#8A3FFC" strokeWidth="1.2" />
                              </svg>
                            )}
                         </div>
                         <span className="text-[14px] font-medium text-[#161616]">{field.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-4 text-[13px] text-[#525252] italic">{field.constraints}</TableCell>
                  <TableCell className="py-3 px-4 text-[13px] text-[#99A1AF] text-center">—</TableCell>
                  <TableCell className="py-3 px-4 text-[13px] text-[#99A1AF] text-center">—</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );

  const isNextEnabled = () => {
    if (currentStep === 1) {
      return formData.name.trim() !== '' && formData.type !== '';
    }
    if (currentStep === 2) {
      return fields.length > 0;
    }
    return true; // Step 3
  };

  return (
    <div className="flex flex-col h-full bg-[#FBFBFC]">
      {/* Stepper */}
      {renderStepper()}

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="flex-1 overflow-hidden flex flex-col bg-white"
        >
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <div className="h-[80px] bg-[#F4F4F4] border-t border-[#E5E7EB] flex items-center justify-between px-12 shrink-0">
        <div className="flex items-center gap-3">
          {currentStep > 1 && (
            <Button 
              variant="outline" 
              className="!h-[46px] px-6 bg-white border-[#D1D5DC] text-[14px] font-medium text-[#525252] rounded-[8px]"
              onClick={handleBack}
            >
              <ArrowLeft className="size-4 mr-2" /> Back
            </Button>
          )}
          <Button 
            variant="outline" 
            className="!h-[46px] px-6 bg-white border-[#D1D5DC] text-[14px] font-medium text-[#525252] rounded-[8px]"
            onClick={onBack}
          >
            Cancel
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="!h-[46px] px-6 bg-white border-[#D1D5DC] text-[14px] font-medium text-[#4A5565] rounded-[8px]"
          >
            Save as Draft
          </Button>
          <Button 
            className={cn(
              "!h-[46px] px-8 text-[14px] font-semibold rounded-[8px] transition-all",
              isNextEnabled()
                ? "bg-[#2A53A0] text-white hover:bg-[#1E3A70]" 
                : "bg-[#E5E7EB] text-[#99A1AF] opacity-50 cursor-not-allowed"
            )}
            onClick={handleNext}
            disabled={!isNextEnabled()}
          >
            {currentStep === 3 ? (
              'Review and Create Event'
            ) : (
              <span className="flex items-center gap-2">
                Next Step
                <ArrowRight className="size-4" />
              </span>
            )}
          </Button>
        </div>
      </div>

      <CreationSuccessDialog 
        isOpen={showSuccess}
        eventName={formData.name}
        onContinue={handleComplete}
      />

      {isSubmitting && <CreationLoader />}
    </div>
  );
};

function LockedIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 16 16">
      <path d="M11 7V5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5V7M4 7H12C12.5523 7 13 7.44772 13 8V13C13 13.5523 12.5523 14 12 14H4C3.44772 14 3 13.5523 3 13V8C3 7.44772 3.44772 7 4 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
