import React, { useState, useEffect } from "react";
import { ArrowLeft, CheckmarkFilled, Edit, TrashCan, WarningFilled } from "@carbon/icons-react";
import { cn } from "./ui/utils";

interface RegulatoryReportPreviewProps {
  onBack: () => void;
  onOk?: () => void;
  hasErrors?: boolean;
  mode?: 'preview' | 'approval';
  onAccept?: (comment: string) => void;
  onReject?: (comment: string) => void;
  hideHeader?: boolean;
  embedMode?: boolean;
}

export function RegulatoryReportPreview({ 
    onBack, 
    onOk, 
    hasErrors = false, 
    mode = 'preview',
    onAccept,
    onReject,
    hideHeader = false,
    embedMode = false
}: RegulatoryReportPreviewProps) {
  const [activeTab, setActiveTab] = useState("KC1");
  const [errorsFixed, setErrorsFixed] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successType, setSuccessType] = useState<'generated' | 'accepted' | 'rejected'>('generated');
  const [comment, setComment] = useState("");

  // Reset errorsFixed if hasErrors changes (though usually component remounts)
  useEffect(() => {
    setErrorsFixed(!hasErrors);
    setShowSuccessModal(false);
  }, [hasErrors]);

  const handleFixError = () => {
    setErrorsFixed(true);
  };

  const handleGenerateReport = () => {
      setSuccessType('generated');
      setShowSuccessModal(true);
  };

  const handleAccept = () => {
      setSuccessType('accepted');
      setShowSuccessModal(true);
  };

  const handleReject = () => {
      setSuccessType('rejected');
      setShowSuccessModal(true);
  };

  const handleModalContinue = () => {
      if (successType === 'generated') {
          onOk?.();
      } else if (successType === 'accepted') {
          onAccept?.(comment);
      } else if (successType === 'rejected') {
          onReject?.(comment);
      }
      setShowSuccessModal(false);
  };

  const TABS = [
    "KC1", "GS1", "KC2", "TS1", "Account Detail", "Account Person Relation"
  ];

  // Helper to render columns dynamically
  const renderTable = (tab: string) => {
    const commonProps = { hasErrors, onFixError: handleFixError, isFixed: errorsFixed };
    switch (tab) {
        case "GS1":
            return <GS1Table {...commonProps} />;
        case "KC2":
            return <KC2Table {...commonProps} />;
        case "TS1":
            return <TS1Table {...commonProps} />;
        case "Account Detail":
            return <AccountDetailTable {...commonProps} />;
        case "Account Person Relation":
            return <AccountPersonRelationTable {...commonProps} />;
        case "KC1":
        default:
            return <KC1Table {...commonProps} />;
    }
  };

  return (
    <div className={cn(
        "flex flex-col bg-white relative",
        embedMode ? "h-auto" : "h-full"
    )}>
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="text-center space-y-6 max-w-md w-full bg-white p-8 rounded-lg shadow-xl animate-in zoom-in-95 duration-200">
                 <div className="flex justify-center">
                    <div className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center mb-2 ring-8",
                        successType === 'rejected' 
                            ? "bg-red-100 text-red-600 ring-red-50"
                            : "bg-green-100 text-green-600 ring-green-50"
                    )}>
                        {successType === 'rejected' ? <WarningFilled size={32} /> : <CheckmarkFilled size={32} />}
                    </div>
                 </div>
                 <div className="space-y-2">
                    <h2 className="text-xl font-bold text-gray-900">Success</h2>
                    <p className="text-gray-600 text-sm">
                        {successType === 'generated' && "Report Generated successfully and sent for Approval"}
                        {successType === 'accepted' && "Report Approved successfully"}
                        {successType === 'rejected' && "Report Rejected successfully"}
                    </p>
                 </div>
                 <div className="pt-2">
                    <button 
                        onClick={handleModalContinue}
                        className="w-full bg-[#2A53A0] hover:bg-[#1e3a70] text-white px-8 py-2.5 rounded-sm text-sm font-medium transition-colors shadow-sm"
                    >
                        Continue
                    </button>
                 </div>
            </div>
        </div>
      )}

      {/* Header */}
      {!hideHeader && (
      <div className="border-b border-gray-200 px-6 py-4 flex items-center bg-white gap-3">
         <h1 className="text-xl font-bold text-gray-900">
             {mode === 'approval' ? 'Report Review Details' : 'Report Preview'}
         </h1>
         <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
             {mode === 'approval' ? 'Step 3' : 'Step 2'}
         </span>
         
         <div className="ml-auto flex items-center gap-3">
             <button 
                onClick={onBack}
                className={cn(
                    "text-sm font-medium flex items-center gap-2 transition-colors",
                    mode === 'approval' 
                        ? "text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 px-4 py-2 rounded-sm h-[38px]"
                        : "text-[#2A53A0] hover:underline"
                )}
             >
                {mode === 'preview' && <ArrowLeft size={16} />}
                {mode === 'approval' ? 'Cancel' : 'Back'}
             </button>
             
             {mode === 'preview' && (
                 hasErrors ? (
                     <button 
                        onClick={handleGenerateReport}
                        disabled={!errorsFixed}
                        className={cn(
                            "text-white px-8 py-2 rounded-sm text-sm font-medium transition-colors shadow-sm",
                            errorsFixed 
                                ? "bg-[#2A53A0] hover:bg-[#1e3a70]" 
                                : "bg-gray-300 cursor-not-allowed"
                        )}
                     >
                        Generate Report
                     </button>
                 ) : (
                     <button 
                        onClick={onOk}
                        className="bg-[#2A53A0] hover:bg-[#1e3a70] text-white px-8 py-2 rounded-sm text-sm font-medium transition-colors shadow-sm"
                     >
                        OK
                     </button>
                 )
             )}

             {mode === 'approval' && (
                 <>
                     <button 
                        onClick={handleReject}
                        className="text-red-600 border border-red-200 hover:bg-red-50 px-6 py-2 rounded-sm text-sm font-medium transition-colors shadow-sm h-[38px]"
                     >
                        Reject
                     </button>
                     <button 
                        onClick={handleAccept}
                        className="bg-[#2A53A0] hover:bg-[#1e3a70] text-white px-6 py-2 rounded-sm text-sm font-medium transition-colors shadow-sm h-[38px]"
                     >
                        Accept
                     </button>
                 </>
             )}
         </div>
      </div>
      )}

      <div className={cn(
          "p-6 space-y-6",
          embedMode ? "" : "overflow-y-auto flex-1"
      )}>
        
        {/* Navigation Tabs */}
        <div className="flex w-full bg-gray-50 rounded-sm p-1">
            {TABS.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                        "flex-1 py-2 text-sm font-medium text-center transition-all rounded-sm",
                        activeTab === tab 
                            ? "bg-white text-gray-900 shadow-sm" 
                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    )}
                >
                    {tab}
                </button>
            ))}
        </div>

        {/* Summary Stats (Constant across tabs for now, or could vary) */}
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-8 grid grid-cols-3 gap-8 text-center">
            <div>
                <div className="text-[#2A53A0] text-3xl font-bold mb-1">₹50,00,000</div>
                <div className="text-gray-500 text-sm">Total Transaction Amount</div>
            </div>
            <div className="border-x border-gray-100">
                <div className="text-[#2A53A0] text-3xl font-bold mb-1">15</div>
                <div className="text-gray-500 text-sm">Total Transaction Count</div>
            </div>
            <div>
                <div className="text-[#2A53A0] text-3xl font-bold mb-1">3</div>
                <div className="text-gray-500 text-sm">Total Unique CIF</div>
            </div>
        </div>

        {/* Data Table Container */}
        <div className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
            {renderTable(activeTab)}
        </div>

        {/* Comment Field for Approval Mode */}
        {mode === 'approval' && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Enter your approval/rejection comments here..."
                    className="w-full h-24 p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#2A53A0] focus:border-[#2A53A0]"
                />
            </div>
        )}
      </div>
    </div>
  );
}

// --- Sub-Components for each Table Type ---

interface TableProps {
    hasErrors?: boolean;
    onFixError?: () => void;
    isFixed?: boolean;
}

function KC1Table({ hasErrors, onFixError, isFixed }: TableProps) {
    const DATA = [
        {
          id: "1",
          reportReference: "STR-8202410282009",
          ucic: "75989700",
          customerId: "C_F 10111",
          pan: "ABCDE1234F",
          panDecl: false,
          ckycNumber: "12345678901234",
          ckycDecl: false,
          passportNumber: "P1234567",
          voterId: "ABC1234567",
          driversLicense: "DL1234567890",
          nregaCard: "NREGA123456",
          dinDpin: "DIN12345678",
          firstName: "John",
          midName: "Robert",
          lastName: "Doe",
          lastNameDecl: false,
          fatherName: "Robert Doe Sr.",
          motherName: "Mary Doe",
          spouseName: "Jane Doe",
          gender: "Male",
          dob: "01-01-1980",
          nationality: "India",
          mobile: "9876543210",
          altMobile: "-",
          telephone: "-",
          email: "john.doe@example.com",
          primaryAddr1: "123 Main St",
          pCountry: "India",
          pPin: "400001",
          pLocality: "Nariman Point",
          pState: "Maharashtra",
          pDistrict: "Mumbai City",
          pCity: "Mumbai",
          secAddr1: "-",
          sCountry: "-",
          sPin: "-",
          sLocality: "-",
          sState: "-",
          sDistrict: "-",
          sCity: "-",
          customerType: "Individual",
          annualIncome: "10-20 Lakhs",
          occupation: "Salaried",
          employerName: "Tech Corp",
          empAddr1: "456 Tech Park",
          eCountry: "India",
          ePin: "560001",
          eLocality: "Electronic City",
          eState: "Karnataka",
          eDistrict: "Bangalore Urban",
          eCity: "Bangalore",
          onboardingDate: "15-01-2020",
          lastKycDate: "20-01-2026",
          riskLevel: "Low",
          npr: "No",
          pekrn: "No",
          primaryStateName: "Maharashtra",
          primaryDistrictName: "Mumbai City",
          primaryCityName: "Mumbai",
          secondaryCityName: "-",
          empStateName: "Karnataka",
          empDistrictName: "Bangalore Urban",
          empCityName: "Bangalore",
          otherCustType: "-"
        }
    ];

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                    <tr className="bg-[#F8F9FA] text-gray-600 h-[48px] text-xs font-semibold border-b border-gray-200">
                        <th className="px-4 py-3 min-w-[160px] bg-[#F8F9FA] sticky left-0 z-10 border-r border-gray-200">Report Reference Number</th>
                        <th className="px-4 py-3">UCIC*</th>
                        <th className="px-4 py-3">Customer ID*</th>
                        <th className="px-4 py-3">PAN*</th>
                        <th className="px-4 py-3 text-center">Declaration<br/><span className="text-[10px] font-normal text-gray-500">(If PAN not available)</span></th>
                        <th className="px-4 py-3">CKYC Number</th>
                        <th className="px-4 py-3 text-center">Declaration<br/><span className="text-[10px] font-normal text-gray-500">(If CKYC not available)</span></th>
                        <th className="px-4 py-3">Passport Number</th>
                        <th className="px-4 py-3">Voter ID</th>
                        <th className="px-4 py-3">Driver’s License</th>
                        <th className="px-4 py-3">NREGA Card</th>
                        <th className="px-4 py-3">DIN/DPIN*</th>
                        <th className="px-4 py-3">First Name*</th>
                        <th className="px-4 py-3">Middle Name</th>
                        <th className="px-4 py-3">Last Name*</th>
                        <th className="px-4 py-3 text-center">Declaration<br/><span className="text-[10px] font-normal text-gray-500">(If Last Name not available)</span></th>
                        <th className="px-4 py-3">Name of Father</th>
                        <th className="px-4 py-3">Name of Mother</th>
                        <th className="px-4 py-3">Spouse/Partner Name</th>
                        <th className="px-4 py-3">Gender*</th>
                        <th className="px-4 py-3">Date of Birth*</th>
                        <th className="px-4 py-3">Nationality*</th>
                        <th className="px-4 py-3">Mobile Number</th>
                        <th className="px-4 py-3">Alternate Mobile Number</th>
                        <th className="px-4 py-3">Telephone Number</th>
                        <th className="px-4 py-3">Email ID</th>
                        <th className="px-4 py-3">Primary Address 1*</th>
                        <th className="px-4 py-3">Country*</th>
                        <th className="px-4 py-3">Pin Code*</th>
                        <th className="px-4 py-3">Locality*</th>
                        <th className="px-4 py-3">State*</th>
                        <th className="px-4 py-3">District*</th>
                        <th className="px-4 py-3">City*</th>
                        <th className="px-4 py-3">Secondary Address 1</th>
                        <th className="px-4 py-3">Address Country</th>
                        <th className="px-4 py-3">Address Pin Code</th>
                        <th className="px-4 py-3">Address Locality</th>
                        <th className="px-4 py-3">Address State</th>
                        <th className="px-4 py-3">Address District</th>
                        <th className="px-4 py-3">Address City</th>
                        <th className="px-4 py-3">Customer Type*</th>
                        <th className="px-4 py-3">Annual Income</th>
                        <th className="px-4 py-3">Occupation</th>
                        <th className="px-4 py-3">Employer Name</th>
                        <th className="px-4 py-3">Employer Address 1</th>
                        <th className="px-4 py-3">Country*</th>
                        <th className="px-4 py-3">Pin Code*</th>
                        <th className="px-4 py-3">Locality*</th>
                        <th className="px-4 py-3">State*</th>
                        <th className="px-4 py-3">District*</th>
                        <th className="px-4 py-3">City*</th>
                        <th className="px-4 py-3">Date of Customer Onboarding*</th>
                        <th className="px-4 py-3">Date Of Last KYC / re-KYC*</th>
                        <th className="px-4 py-3">Customer Risk Level*</th>
                        <th className="px-4 py-3">NPR</th>
                        <th className="px-4 py-3">PEKRN</th>
                        <th className="px-4 py-3">Primary State Name</th>
                        <th className="px-4 py-3">Primary District Name</th>
                        <th className="px-4 py-3">Primary City Name</th>
                        <th className="px-4 py-3">Secondary City Name</th>
                        <th className="px-4 py-3">Employee State Name</th>
                        <th className="px-4 py-3">Employee District Name</th>
                        <th className="px-4 py-3">Employee City Name</th>
                        <th className="px-4 py-3">Other Customer Type</th>
                        {hasErrors && <th className="px-4 py-3 sticky right-0 bg-[#F8F9FA] z-10 border-l border-gray-200 text-center w-[100px]">Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {DATA.map((row) => (
                        <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 text-sm text-gray-700">
                            <td className="px-4 py-3 font-medium text-[#2A53A0] sticky left-0 bg-white border-r border-gray-100">{row.reportReference}</td>
                            <td className="px-4 py-3">{row.ucic}</td>
                            <td className="px-4 py-3">{row.customerId}</td>
                            <td className={cn("px-4 py-3", hasErrors && !isFixed && "bg-red-50 text-red-600 font-medium ring-1 ring-inset ring-red-200")}>
                                {row.pan}
                                {hasErrors && !isFixed && <WarningFilled size={16} className="inline-block ml-2 text-red-500" />}
                            </td>
                            <td className="px-4 py-3 text-center">{row.panDecl ? <CheckmarkFilled size={16} className="text-[#2A53A0]"/> : "-"}</td>
                            <td className="px-4 py-3">{row.ckycNumber}</td>
                            <td className="px-4 py-3 text-center">{row.ckycDecl ? <CheckmarkFilled size={16} className="text-[#2A53A0]"/> : "-"}</td>
                            <td className="px-4 py-3">{row.passportNumber}</td>
                            <td className="px-4 py-3">{row.voterId}</td>
                            <td className="px-4 py-3">{row.driversLicense}</td>
                            <td className="px-4 py-3">{row.nregaCard}</td>
                            <td className="px-4 py-3">{row.dinDpin}</td>
                            <td className="px-4 py-3">{row.firstName}</td>
                            <td className="px-4 py-3">{row.midName}</td>
                            <td className="px-4 py-3">{row.lastName}</td>
                            <td className="px-4 py-3 text-center">{row.lastNameDecl ? <CheckmarkFilled size={16} className="text-[#2A53A0]"/> : "-"}</td>
                            <td className="px-4 py-3">{row.fatherName}</td>
                            <td className="px-4 py-3">{row.motherName}</td>
                            <td className="px-4 py-3">{row.spouseName}</td>
                            <td className="px-4 py-3">{row.gender}</td>
                            <td className="px-4 py-3">{row.dob}</td>
                            <td className="px-4 py-3">{row.nationality}</td>
                            <td className="px-4 py-3">{row.mobile}</td>
                            <td className="px-4 py-3">{row.altMobile}</td>
                            <td className="px-4 py-3">{row.telephone}</td>
                            <td className="px-4 py-3">{row.email}</td>
                            <td className="px-4 py-3">{row.primaryAddr1}</td>
                            <td className="px-4 py-3">{row.pCountry}</td>
                            <td className="px-4 py-3">{row.pPin}</td>
                            <td className="px-4 py-3">{row.pLocality}</td>
                            <td className="px-4 py-3">{row.pState}</td>
                            <td className="px-4 py-3">{row.pDistrict}</td>
                            <td className="px-4 py-3">{row.pCity}</td>
                            <td className="px-4 py-3">{row.secAddr1}</td>
                            <td className="px-4 py-3">{row.sCountry}</td>
                            <td className="px-4 py-3">{row.sPin}</td>
                            <td className="px-4 py-3">{row.sLocality}</td>
                            <td className="px-4 py-3">{row.sState}</td>
                            <td className="px-4 py-3">{row.sDistrict}</td>
                            <td className="px-4 py-3">{row.sCity}</td>
                            <td className="px-4 py-3">{row.customerType}</td>
                            <td className="px-4 py-3">{row.annualIncome}</td>
                            <td className="px-4 py-3">{row.occupation}</td>
                            <td className="px-4 py-3">{row.employerName}</td>
                            <td className="px-4 py-3">{row.empAddr1}</td>
                            <td className="px-4 py-3">{row.eCountry}</td>
                            <td className="px-4 py-3">{row.ePin}</td>
                            <td className="px-4 py-3">{row.eLocality}</td>
                            <td className="px-4 py-3">{row.eState}</td>
                            <td className="px-4 py-3">{row.eDistrict}</td>
                            <td className="px-4 py-3">{row.eCity}</td>
                            <td className="px-4 py-3">{row.onboardingDate}</td>
                            <td className="px-4 py-3">{row.lastKycDate}</td>
                            <td className="px-4 py-3">{row.riskLevel}</td>
                            <td className="px-4 py-3">{row.npr}</td>
                            <td className="px-4 py-3">{row.pekrn}</td>
                            <td className="px-4 py-3">{row.primaryStateName}</td>
                            <td className="px-4 py-3">{row.primaryDistrictName}</td>
                            <td className="px-4 py-3">{row.primaryCityName}</td>
                            <td className="px-4 py-3">{row.secondaryCityName}</td>
                            <td className="px-4 py-3">{row.empStateName}</td>
                            <td className="px-4 py-3">{row.empDistrictName}</td>
                            <td className="px-4 py-3">{row.empCityName}</td>
                            <td className="px-4 py-3">{row.otherCustType}</td>
                            {hasErrors && (
                                <td className="px-4 py-3 sticky right-0 bg-white z-10 border-l border-gray-100 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button 
                                            onClick={onFixError}
                                            className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded"
                                            title="Edit"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button 
                                            className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded"
                                            title="Delete"
                                        >
                                            <TrashCan size={16} />
                                        </button>
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function GS1Table({ hasErrors, onFixError, isFixed }: TableProps) {
    const DATA = [
        {
            id: "1",
            reportReference: "STR-8202410282009",
            suspicionDueTo: "Proceeds of Crime",
            reasonForStr: "Unusual Activity",
            alertIndicator: "High Risk",
            summary: "Multiple high value cash deposits followed by immediate transfers.",
            leaInformed: "No",
            priority: "High",
            reportCoverage: "Complete"
        }
    ];

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                    <tr className="bg-[#F8F9FA] text-gray-600 h-[48px] text-xs font-semibold border-b border-gray-200">
                        <th className="px-4 py-3 min-w-[160px] bg-[#F8F9FA] sticky left-0 z-10 border-r border-gray-200">Report Reference Number</th>
                        <th className="px-4 py-3">Suspicion Due To*</th>
                        <th className="px-4 py-3">Reason for STR*</th>
                        <th className="px-4 py-3">Alert Indicator</th>
                        <th className="px-4 py-3 min-w-[300px]">Summary of Suspicion*</th>
                        <th className="px-4 py-3">LEA Informed</th>
                        <th className="px-4 py-3">Priority Rating</th>
                        <th className="px-4 py-3">Report Coverage</th>
                    </tr>
                </thead>
                <tbody>
                    {DATA.map((row) => (
                        <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 text-sm text-gray-700">
                             <td className="px-4 py-3 font-medium text-[#2A53A0] sticky left-0 bg-white border-r border-gray-100">{row.reportReference}</td>
                             <td className="px-4 py-3">{row.suspicionDueTo}</td>
                             <td className="px-4 py-3">{row.reasonForStr}</td>
                             <td className="px-4 py-3">{row.alertIndicator}</td>
                             <td className="px-4 py-3 truncate max-w-[300px]" title={row.summary}>{row.summary}</td>
                             <td className="px-4 py-3">{row.leaInformed}</td>
                             <td className="px-4 py-3">{row.priority}</td>
                             <td className="px-4 py-3">{row.reportCoverage}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function KC2Table({ hasErrors, onFixError, isFixed }: TableProps) {
    const DATA = [
        {
            id: "1",
            reportReference: "STR-8202410282009",
            entityName: "Global Trade Corp",
            entityType: "Private Limited",
            incorporationDate: "12-05-2015",
            regNumber: "U12345MH2015PTC123456",
            pan: "AAAAA0000A",
            natureOfBiz: "Import/Export",
            country: "India",
            riskCategory: "Medium"
        }
    ];

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                    <tr className="bg-[#F8F9FA] text-gray-600 h-[48px] text-xs font-semibold border-b border-gray-200">
                        <th className="px-4 py-3 min-w-[160px] bg-[#F8F9FA] sticky left-0 z-10 border-r border-gray-200">Report Reference Number</th>
                        <th className="px-4 py-3">Legal Name of Entity*</th>
                        <th className="px-4 py-3">Entity Type</th>
                        <th className="px-4 py-3">Incorporation Date</th>
                        <th className="px-4 py-3">Registration Number</th>
                        <th className="px-4 py-3">PAN/Tax ID*</th>
                        <th className="px-4 py-3">Nature of Business</th>
                        <th className="px-4 py-3">Country of Incorp.</th>
                        <th className="px-4 py-3">Risk Category</th>
                    </tr>
                </thead>
                <tbody>
                     {DATA.map((row) => (
                        <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 text-sm text-gray-700">
                             <td className="px-4 py-3 font-medium text-[#2A53A0] sticky left-0 bg-white border-r border-gray-100">{row.reportReference}</td>
                             <td className="px-4 py-3">{row.entityName}</td>
                             <td className="px-4 py-3">{row.entityType}</td>
                             <td className="px-4 py-3">{row.incorporationDate}</td>
                             <td className="px-4 py-3">{row.regNumber}</td>
                             <td className="px-4 py-3">{row.pan}</td>
                             <td className="px-4 py-3">{row.natureOfBiz}</td>
                             <td className="px-4 py-3">{row.country}</td>
                             <td className="px-4 py-3">{row.riskCategory}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function TS1Table({ hasErrors, onFixError, isFixed }: TableProps) {
    const DATA = [
        {
            id: "1",
            reportReference: "STR-8202410282009",
            accountNo: "112148291241",
            txnDate: "20-01-2026",
            txnId: "TXN8293812",
            mode: "NEFT",
            type: "Credit",
            amount: "5,00,000",
            currency: "INR",
            counterparty: "Rajesh Exports",
            remark: "High Value Inward"
        }
    ];

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                    <tr className="bg-[#F8F9FA] text-gray-600 h-[48px] text-xs font-semibold border-b border-gray-200">
                        <th className="px-4 py-3 min-w-[160px] bg-[#F8F9FA] sticky left-0 z-10 border-r border-gray-200">Report Reference Number</th>
                        <th className="px-4 py-3">Account Number*</th>
                        <th className="px-4 py-3">Transaction Date*</th>
                        <th className="px-4 py-3">Transaction ID</th>
                        <th className="px-4 py-3">Mode</th>
                        <th className="px-4 py-3">Type (Dr/Cr)</th>
                        <th className="px-4 py-3 text-right">Amount*</th>
                        <th className="px-4 py-3">Currency</th>
                        <th className="px-4 py-3">Counterparty Name</th>
                        <th className="px-4 py-3">Remark</th>
                    </tr>
                </thead>
                <tbody>
                    {DATA.map((row) => (
                        <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 text-sm text-gray-700">
                             <td className="px-4 py-3 font-medium text-[#2A53A0] sticky left-0 bg-white border-r border-gray-100">{row.reportReference}</td>
                             <td className="px-4 py-3">{row.accountNo}</td>
                             <td className="px-4 py-3">{row.txnDate}</td>
                             <td className="px-4 py-3">{row.txnId}</td>
                             <td className="px-4 py-3">{row.mode}</td>
                             <td className="px-4 py-3">{row.type}</td>
                             <td className="px-4 py-3 text-right font-medium">{row.amount}</td>
                             <td className="px-4 py-3">{row.currency}</td>
                             <td className="px-4 py-3">{row.counterparty}</td>
                             <td className="px-4 py-3">{row.remark}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function AccountDetailTable({ hasErrors, onFixError, isFixed }: TableProps) {
    const DATA = [
        {
            id: "1",
            reportReference: "STR-8202410282009",
            accountNo: "112148291241",
            type: "Savings",
            status: "Active",
            openDate: "12-01-2020",
            branch: "Mumbai Main",
            balance: "1,24,50,000",
            currency: "INR"
        }
    ];

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                    <tr className="bg-[#F8F9FA] text-gray-600 h-[48px] text-xs font-semibold border-b border-gray-200">
                        <th className="px-4 py-3 min-w-[160px] bg-[#F8F9FA] sticky left-0 z-10 border-r border-gray-200">Report Reference Number</th>
                        <th className="px-4 py-3">Account Number*</th>
                        <th className="px-4 py-3">Account Type*</th>
                        <th className="px-4 py-3">Account Status</th>
                        <th className="px-4 py-3">Account Open Date</th>
                        <th className="px-4 py-3">Branch Name</th>
                        <th className="px-4 py-3 text-right">Current Balance</th>
                        <th className="px-4 py-3">Currency</th>
                    </tr>
                </thead>
                <tbody>
                    {DATA.map((row) => (
                        <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 text-sm text-gray-700">
                             <td className="px-4 py-3 font-medium text-[#2A53A0] sticky left-0 bg-white border-r border-gray-100">{row.reportReference}</td>
                             <td className="px-4 py-3">{row.accountNo}</td>
                             <td className="px-4 py-3">{row.type}</td>
                             <td className="px-4 py-3">{row.status}</td>
                             <td className="px-4 py-3">{row.openDate}</td>
                             <td className="px-4 py-3">{row.branch}</td>
                             <td className="px-4 py-3 text-right font-medium">{row.balance}</td>
                             <td className="px-4 py-3">{row.currency}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function AccountPersonRelationTable({ hasErrors, onFixError, isFixed }: TableProps) {
    const DATA = [
        {
            id: "1",
            reportReference: "STR-8202410282009",
            accountNo: "112148291241",
            customerId: "C_F 10111",
            relationType: "Primary Holder",
            status: "Active",
            startDate: "12-01-2020",
            endDate: "-"
        }
    ];

    return (
        <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                    <tr className="bg-[#F8F9FA] text-gray-600 h-[48px] text-xs font-semibold border-b border-gray-200">
                        <th className="px-4 py-3 min-w-[160px] bg-[#F8F9FA] sticky left-0 z-10 border-r border-gray-200">Report Reference Number</th>
                        <th className="px-4 py-3">Account Number*</th>
                        <th className="px-4 py-3">Customer ID*</th>
                        <th className="px-4 py-3">Relation Type*</th>
                        <th className="px-4 py-3">Relationship Status</th>
                        <th className="px-4 py-3">Start Date</th>
                        <th className="px-4 py-3">End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {DATA.map((row) => (
                        <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 text-sm text-gray-700">
                             <td className="px-4 py-3 font-medium text-[#2A53A0] sticky left-0 bg-white border-r border-gray-100">{row.reportReference}</td>
                             <td className="px-4 py-3">{row.accountNo}</td>
                             <td className="px-4 py-3">{row.customerId}</td>
                             <td className="px-4 py-3">{row.relationType}</td>
                             <td className="px-4 py-3">{row.status}</td>
                             <td className="px-4 py-3">{row.startDate}</td>
                             <td className="px-4 py-3">{row.endDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
