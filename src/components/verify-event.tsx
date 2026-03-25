import React from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Info, 
  MessageSquare,
  Settings,
  Table as TableIcon,
  User,
  Calendar,
  Tag
} from 'lucide-react';
import { cn } from './ui/utils';
import { Badge } from './ui/badge';

interface Field {
  id: string;
  name: string;
  type: string;
  constraints: string;
  required: boolean;
  pii: boolean;
  category: 'Derived' | 'Custom' | 'Standard';
}

interface EventData {
  name: string;
  type: string;
  status: string;
  description: string;
  fields: Field[];
}

interface VerifyEventProps {
  eventData?: EventData | null;
  onBack: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export const VerifyEvent: React.FC<VerifyEventProps> = ({ 
  eventData, 
  onBack, 
  onApprove, 
  onReject 
}) => {
  const fields = eventData?.fields || [];
  
  return (
    <div className="flex flex-col h-full bg-[#F4F4F4] overflow-hidden font-['Inter',sans-serif]">
      {/* 1. Header & Breadcrumbs */}
      <div className="shrink-0 bg-white border-b border-gray-200 h-[56px] flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <ArrowLeft className="size-5 text-[#525252]" />
          </button>
          <h1 className="text-[20px] font-medium text-[#161616]">Verify Event</h1>
        </div>
        <div className="flex items-center gap-2 text-[13px]">
          <span className="text-[#2A53A0] cursor-pointer hover:underline">Data Maintenance</span>
          <span className="text-gray-300">/</span>
          <span className="text-[#2A53A0] cursor-pointer hover:underline">Events</span>
          <span className="text-gray-300">/</span>
          <span className="text-[#2A53A0] cursor-pointer hover:underline">Pending Verification</span>
          <span className="text-gray-300">/</span>
          <span className="text-[#161616]">Verify Event</span>
        </div>
      </div>

      {/* 2. Metadata Strip */}
      <div className="shrink-0 bg-white border-b border-[#F3F4F6] h-[50px] flex items-center px-6 gap-6">
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-[#525252]">Event Name:</span>
          <span className="text-[13px] font-semibold text-[#161616]">{eventData?.name || 'Sample Event'}</span>
        </div>
        <div className="w-px h-4 bg-[#D1D5DC]" />
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-[#525252]">Status:</span>
          <Badge className="bg-[#FDF4CF] text-[#856404] border-none text-[11px] font-medium px-2.5 py-0.5 rounded-full">
            Pending Review
          </Badge>
        </div>
        <div className="w-px h-4 bg-[#D1D5DC]" />
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-[#525252]">Type:</span>
          <Badge className="bg-[#D0E2FF] text-[#0043CE] border-none text-[11px] font-medium px-2.5 py-0.5 rounded-full">
            {eventData?.type || 'Financial Transaction'}
          </Badge>
        </div>
        <div className="w-px h-4 bg-[#D1D5DC]" />
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-[12px] text-[#525252] shrink-0">Description:</span>
          <span className="text-[13px] text-[#161616] truncate">{eventData?.description || 'No description provided.'}</span>
        </div>
      </div>

      {/* 3. Action Banner & Buttons */}
      <div className="shrink-0 bg-white border-b border-[#F3F4F6] h-[72px] flex items-center justify-between px-6">
        <div className="flex items-center gap-2 text-[#525252]">
          <Info className="size-4 text-[#2A53A0]" />
          <span className="text-[13px]">Review the changes below before finalizing the verification.</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onReject}
            className="h-[46px] px-6 border border-[#D1D5DC] rounded-[8px] flex items-center gap-2 text-[#DA1E28] font-semibold text-[14px] hover:bg-red-50 transition-all cursor-pointer"
          >
            <XCircle className="size-4" />
            Reject
          </button>
          <button 
            onClick={onApprove}
            className="h-[46px] px-6 bg-[#2A53A0] rounded-[8px] flex items-center gap-2 text-white font-semibold text-[14px] hover:bg-[#1E3A70] transition-all shadow-md cursor-pointer"
          >
            <CheckCircle2 className="size-4" />
            Approve
          </button>
        </div>
      </div>

      {/* 4. Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        {/* Review Comments Section */}
        <div className="bg-white rounded-[8px] border border-[#E0E0E0] shadow-sm p-4 space-y-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="size-[18px] text-[#2A53A0]" />
            <h3 className="text-[14px] font-bold text-[#161616]">Review Comments</h3>
            <span className="text-[#FB2C36] text-[11px] font-medium">* Required for action</span>
          </div>
          <textarea 
            placeholder="Enter your verification notes, approval justification, or rejection reasons here..."
            className="w-full h-[100px] p-3 text-[14px] text-[#161616] border border-[#D1D5DC] rounded-[4px] outline-none focus:border-[#2A53A0] resize-none placeholder:text-[#717182]"
          />
        </div>

        {/* Event Configuration Section */}
        <div className="bg-white rounded-[8px] border border-[#E0E0E0] shadow-sm overflow-hidden">
          <div className="h-[56px] bg-[#F4F4F4] border-b border-[#E5E7EB] flex items-center px-6 justify-between">
            <div className="flex items-center gap-2">
              <Settings className="size-5 text-[#2A53A0]" />
              <h3 className="text-[15px] font-bold text-[#161616]">Event Configuration</h3>
              <Badge className="bg-[#FFEDD4] text-[#CA3500] border-none text-[12px] font-bold px-2 py-0.5 rounded-[6px]">
                {eventData ? '4' : '2'} changes
              </Badge>
            </div>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F0F0F0] border-b border-[#E5E7EB] h-[40px]">
                <th className="px-6 text-[11px] font-bold text-[#525252] uppercase tracking-[0.55px]">Configuration Property</th>
                <th className="px-6 text-[11px] font-bold text-[#525252] uppercase tracking-[0.55px] bg-[rgba(254,242,242,0.5)] text-center">Before</th>
                <th className="px-6 text-[11px] font-bold text-[#525252] uppercase tracking-[0.55px] bg-[rgba(240,253,244,0.5)] text-center">After</th>
                <th className="px-6 text-[11px] font-bold text-[#525252] uppercase tracking-[0.55px] text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-[56px] border-b border-[#E5E7EB]">
                <td className="px-6 text-[14px] font-medium text-[#161616]">Event Name</td>
                <td className="px-6 text-[14px] text-gray-400 bg-[rgba(254,242,242,0.2)] text-center font-mono">—</td>
                <td className="px-6 text-[14px] text-[#008236] bg-[rgba(240,253,244,0.2)] text-center font-bold font-mono">{eventData?.name || 'N/A'}</td>
                <td className="px-6 text-center">
                  <Badge className="bg-[#FFF7ED] text-[#F54900] border border-[#FFD6A8] text-[10px] font-bold px-2 py-0.5 rounded-[4px] shadow-none">
                    CREATED
                  </Badge>
                </td>
              </tr>
              <tr className="h-[56px] border-b border-[#E5E7EB] last:border-none">
                <td className="px-6 text-[14px] font-medium text-[#161616]">Batch Enabled</td>
                <td className="px-6 text-[14px] text-[#E7000B] bg-[rgba(254,242,242,0.2)] text-center line-through font-mono">Disabled</td>
                <td className="px-6 text-[14px] text-[#008236] bg-[rgba(240,253,244,0.2)] text-center font-bold font-mono">Enabled</td>
                <td className="px-6 text-center">
                  <Badge className="bg-[#FFF7ED] text-[#F54900] border border-[#FFD6A8] text-[10px] font-bold px-2 py-0.5 rounded-[4px] shadow-none">
                    MODIFIED
                  </Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Fields Mapping Comparison Section */}
        <div className="bg-white rounded-[8px] border border-[#E0E0E0] shadow-sm overflow-hidden">
          <div className="h-[56px] bg-[#F4F4F4] border-b border-[#E5E7EB] flex items-center px-6 justify-between">
            <div className="flex items-center gap-2">
              <TableIcon className="size-5 text-[#2A53A0]" />
              <h3 className="text-[15px] font-bold text-[#161616]">Fields Mapping Comparison</h3>
              <Badge className="bg-blue-100 text-blue-600 border-none text-[12px] font-bold px-2 py-0.5 rounded-[6px]">
                {fields.length} new fields
              </Badge>
            </div>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F0F0F0] border-b border-[#E5E7EB] h-[40px]">
                <th className="px-6 text-[11px] font-bold text-[#525252] uppercase tracking-wider w-[20%]">Field Name</th>
                <th className="px-6 text-[11px] font-bold text-[#525252] uppercase tracking-wider w-[30%] border-l border-[#E5E7EB] text-center" colSpan={3}>Before</th>
                <th className="px-6 text-[11px] font-bold text-[#525252] uppercase tracking-wider w-[30%] border-l border-[#E5E7EB] text-center" colSpan={3}>After</th>
                <th className="px-6 text-[11px] font-bold text-[#525252] uppercase tracking-wider border-l border-[#E5E7EB] text-center">Status</th>
              </tr>
              <tr className="bg-[#F9F9F9] border-b border-[#E5E7EB] h-[32px] text-[10px] font-bold text-[#525252] uppercase">
                <th className="px-6">Name</th>
                <th className="px-4 border-l border-[#E5E7EB]">Type</th>
                <th className="px-4">PII</th>
                <th className="px-4">Constraint</th>
                <th className="px-4 border-l border-[#E5E7EB]">Type</th>
                <th className="px-4">PII</th>
                <th className="px-4">Constraint</th>
                <th className="px-6 border-l border-[#E5E7EB] text-center">Change</th>
              </tr>
            </thead>
            <tbody>
              {fields.length === 0 ? (
                <tr className="h-[56px]">
                  <td className="px-6 text-[14px] font-bold text-[#161616]">No changes detected</td>
                  <td className="px-4 text-center text-gray-400">—</td>
                  <td className="px-4 text-center text-gray-400">—</td>
                  <td className="px-4 text-center text-gray-400">—</td>
                  <td className="px-4 text-center text-gray-400">—</td>
                  <td className="px-4 text-center text-gray-400">—</td>
                  <td className="px-4 text-center text-gray-400">—</td>
                  <td className="px-6 text-center">
                    <Badge className="bg-[#F2F4F8] text-[#6A7282] border border-[#D1D5DC] text-[10px] font-bold px-2 py-0.5 rounded-[4px] shadow-none">
                      UNCHANGED
                    </Badge>
                  </td>
                </tr>
              ) : (
                fields.map((field) => (
                  <tr key={field.id} className="h-[56px] border-b border-[#E5E7EB] last:border-none">
                    <td className="px-6 text-[14px] font-bold text-[#161616]">{field.name}</td>
                    {/* Before Columns */}
                    <td className="px-4 border-l border-[#E5E7EB] text-center text-gray-400">—</td>
                    <td className="px-4 text-center text-gray-400">—</td>
                    <td className="px-4 text-center text-gray-400">—</td>
                    {/* After Columns */}
                    <td className="px-4 border-l border-[#E5E7EB] text-center text-[13px] font-medium text-[#161616] bg-[rgba(240,253,244,0.1)]">{field.type}</td>
                    <td className="px-4 text-center bg-[rgba(240,253,244,0.1)]">
                      {field.pii ? (
                        <div className="flex justify-center">
                          <Badge className="bg-[#F6F2FF] text-[#8A3FFC] border-none text-[9px] font-bold px-1.5 h-4">YES</Badge>
                        </div>
                      ) : <span className="text-[12px] text-gray-400">NO</span>}
                    </td>
                    <td className="px-4 text-center text-[12px] italic text-[#525252] bg-[rgba(240,253,244,0.1)]">{field.constraints}</td>
                    <td className="px-6 border-l border-[#E5E7EB] text-center">
                      <Badge className="bg-[#DEFBE6] text-[#198038] border border-[#A7F0BA] text-[10px] font-bold px-2 py-0.5 rounded-[4px] shadow-none">
                        NEW FIELD
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Submission Context Box */}
        <div className="bg-[#EAF2FF] rounded-[8px] border border-[#B8D3FF] p-5 space-y-4">
          <div className="flex items-start gap-4">
            <div className="bg-white p-2.5 rounded-full shadow-sm">
              <Tag className="size-5 text-[#2A53A0]" />
            </div>
            <div className="space-y-3 flex-1">
              <h4 className="text-[15px] font-bold text-[#161616]">Submission Context</h4>
              <p className="text-[14px] text-[#2A53A0] italic leading-relaxed">
                {eventData?.description ? `"${eventData.description}"` : '"Added beneficiary account field as per the new cross-border transaction mandate. Also updated the batch frequency to 2 hours for better reconciliation speed."'}
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#525252]">
                <div className="flex items-center gap-1.5">
                  <User className="size-3.5 text-[#2A53A0]" />
                  <span className="font-semibold text-[#161616]">Submitted by Rajesh Kumar</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-300" />
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-[#2A53A0]" />
                  <span>Today, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
