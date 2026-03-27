import { useState } from "react";
import {
  Checkbox,
  Dropdown,
  Tag,
  NumberInput,
  InlineNotification,
} from "carbon-components-react";
import {
  Reset,
  Save,
  Warning,
  CircleFill,
} from "@carbon/icons-react";
import { toast } from "sonner@2.0.3";

interface CustomerRiskRatingConfigurationProps {
  breadcrumbs?: any[];
  onBreadcrumbNavigate?: (path: string) => void;
}

type RiskLevel = "Extreme" | "High" | "Medium-High" | "Medium" | "Low";
type OverrideOption = "No" | "Yes" | "Override to High" | "Override to Medium-High" | "Override to Medium";

interface Parameter {
  id: string;
  label: string;
  isNew?: boolean;
  enabled: boolean;
  riskLevel: RiskLevel;
  score: number;
  override: OverrideOption;
}

interface SubSection {
  id: string;
  number: string;
  title: string;
  isNew?: boolean;
  parameters: Parameter[];
}

interface Category {
  id: string;
  number: string;
  label: string;
  weight: number;
}

const RISK_SCORE_MAP: Record<RiskLevel, number> = {
  Extreme: 100,
  High: 75,
  "Medium-High": 60,
  Medium: 40,
  Low: 20,
};

const getScoreColor = (score: number): string => {
  if (score >= 100) return "#da1e28";
  if (score >= 75) return "#ff832b";
  if (score >= 60) return "#f1c21b";
  if (score >= 40) return "#24a148";
  return "#0f62fe";
};

const getScoreTextColor = (score: number): string => {
  if (score >= 60 && score < 75) return "#161616";
  return "#ffffff";
};

const initialCategories: Category[] = [
  { id: "1.1", number: "1.1", label: "Customer Profile & KYC Risk",       weight: 25 },
  { id: "1.2", number: "1.2", label: "Geographic & Country Risk",          weight: 20 },
  { id: "1.3", number: "1.3", label: "Product & Service Risk",             weight: 15 },
  { id: "1.4", number: "1.4", label: "Transaction Behaviour Risk",         weight: 15 },
  { id: "1.5", number: "1.5", label: "Business & Occupation Risk",         weight: 10 },
  { id: "1.6", number: "1.6", label: "PEP & Political Exposure Risk",      weight: 8  },
  { id: "1.7", number: "1.7", label: "Adverse Media & Reputational Risk",  weight: 5  },
  { id: "1.8", number: "1.8", label: "Channel & Delivery Risk",            weight: 2  },
];

const initialSubSections: Record<string, SubSection[]> = {
  "1.1": [
    {
      id: "1.1.1", number: "1.1.1", title: "IDENTITY & DOCUMENTATION",
      parameters: [
        { id: "p101", label: "Foreign National / Non-Resident Customer",                    enabled: true,  riskLevel: "High",        score: 75, override: "No" },
        { id: "p102", label: "Missing or Incomplete KYC Documents",                         enabled: true,  riskLevel: "High",        score: 75, override: "Override to High" },
        { id: "p103", label: "Expired or Unverified Identity Documents",                    enabled: true,  riskLevel: "Medium-High", score: 60, override: "No" },
        { id: "p104", label: "Third-Party Introduced Customer (Non-face-to-face)",           enabled: true,  riskLevel: "Medium-High", score: 60, override: "No" },
        { id: "p105", label: "Discrepancies in Customer-Provided Information",               enabled: true,  riskLevel: "High",        score: 75, override: "No" },
      ],
    },
    {
      id: "1.1.2", number: "1.1.2", title: "CUSTOMER TYPE & STRUCTURE",
      parameters: [
        { id: "p106", label: "Shell Company / Nominee / Special Purpose Vehicle",            enabled: true,  riskLevel: "Extreme",     score: 100, override: "Yes" },
        { id: "p107", label: "Anonymous or Bearer Instrument Holder",                        enabled: true,  riskLevel: "Extreme",     score: 100, override: "Yes" },
        { id: "p108", label: "Complex Ownership Structure (>3 Layers)",                      enabled: true,  riskLevel: "High",        score: 75,  override: "No" },
        { id: "p109", label: "Trust or Foundation with Undisclosed Beneficiaries",           enabled: true,  riskLevel: "High",        score: 75,  override: "No" },
        { id: "p110", label: "Dormant or Inactive Account Reactivation",                     enabled: true,  riskLevel: "Medium",      score: 40,  override: "No" },
      ],
    },
    {
      id: "1.1.3", number: "1.1.3", title: "AI-ENHANCED KYC SIGNALS – NEW", isNew: true,
      parameters: [
        { id: "p111", label: "AI-Detected Identity Anomaly or Document Inconsistency",       isNew: true, enabled: true, riskLevel: "High",        score: 75,  override: "Override to High" },
        { id: "p112", label: "Biometric Mismatch or Liveness Check Failure",                 isNew: true, enabled: true, riskLevel: "High",        score: 75,  override: "Override to High" },
        { id: "p113", label: "Digital Footprint Absence or Mismatch",                        isNew: true, enabled: true, riskLevel: "Medium-High", score: 60,  override: "No" },
      ],
    },
  ],
  "1.2": [
    {
      id: "1.2.1", number: "1.2.1", title: "HIGH-RISK JURISDICTION",
      parameters: [
        { id: "p201", label: "Customer Resident / Registered in FATF High-Risk Jurisdiction",enabled: true,  riskLevel: "Extreme", score: 100, override: "Yes" },
        { id: "p202", label: "Customer Connected to Sanctioned Country or Territory",         enabled: true,  riskLevel: "Extreme", score: 100, override: "Yes" },
        { id: "p203", label: "Business Operations in Conflict Zone / Fragile State",          enabled: true,  riskLevel: "High",    score: 75,  override: "No" },
        { id: "p204", label: "Frequent Travel / Transactions to High-Risk Countries",         enabled: true,  riskLevel: "High",    score: 75,  override: "No" },
        { id: "p205", label: "Offshore Financial Centre (OFC) Nexus",                         enabled: true,  riskLevel: "Medium-High", score: 60, override: "No" },
      ],
    },
    {
      id: "1.2.2", number: "1.2.2", title: "TAX HAVEN & SECRECY JURISDICTIONS",
      parameters: [
        { id: "p206", label: "Accounts or Assets Held in Tax Haven Jurisdiction",             enabled: true, riskLevel: "High",        score: 75, override: "No" },
        { id: "p207", label: "Company Registered in Secrecy Jurisdiction",                    enabled: true, riskLevel: "High",        score: 75, override: "No" },
        { id: "p208", label: "Customer Uses Correspondent Banking in Opaque Jurisdiction",    enabled: true, riskLevel: "Medium-High", score: 60, override: "No" },
      ],
    },
  ],
  "1.3": [
    {
      id: "1.3.1", number: "1.3.1", title: "HIGH-RISK PRODUCTS",
      parameters: [
        { id: "p301", label: "Private Banking / Wealth Management Services",                  enabled: true, riskLevel: "High",        score: 75, override: "No" },
        { id: "p302", label: "Correspondent Banking Relationship",                            enabled: true, riskLevel: "High",        score: 75, override: "No" },
        { id: "p303", label: "Trade Finance / Letter of Credit Services",                     enabled: true, riskLevel: "Medium-High", score: 60, override: "No" },
        { id: "p304", label: "Virtual Asset / Cryptocurrency-Linked Products",                enabled: true, riskLevel: "High",        score: 75, override: "No" },
        { id: "p305", label: "Anonymous Prepaid Card / Bearer Instrument",                    enabled: true, riskLevel: "Extreme",     score: 100, override: "Yes" },
      ],
    },
    {
      id: "1.3.2", number: "1.3.2", title: "EMERGING RISK PRODUCTS – NEW", isNew: true,
      parameters: [
        { id: "p306", label: "Buy-Now-Pay-Later (BNPL) Linked to High-Risk Merchant",  isNew: true, enabled: true, riskLevel: "Medium",      score: 40, override: "No" },
        { id: "p307", label: "Decentralised Finance (DeFi) Protocol Usage",            isNew: true, enabled: true, riskLevel: "High",        score: 75, override: "No" },
        { id: "p308", label: "NFT / Digital Asset Marketplace Transactions",           isNew: true, enabled: true, riskLevel: "Medium-High", score: 60, override: "No" },
      ],
    },
  ],
  "1.4": [
    {
      id: "1.4.1", number: "1.4.1", title: "UNUSUAL TRANSACTION PATTERNS",
      parameters: [
        { id: "p401", label: "Structuring / Smurfing Behaviour Detected",                    enabled: true, riskLevel: "Extreme", score: 100, override: "Yes" },
        { id: "p402", label: "Sudden Large Cash Deposits Inconsistent with Profile",          enabled: true, riskLevel: "High",    score: 75,  override: "Override to High" },
        { id: "p403", label: "High-Frequency Round-Amount Transactions",                     enabled: true, riskLevel: "High",    score: 75,  override: "No" },
        { id: "p404", label: "Rapid Movement of Funds (In-Out within 24–48 hrs)",            enabled: true, riskLevel: "High",    score: 75,  override: "No" },
        { id: "p405", label: "Transactions with No Apparent Business Purpose",               enabled: true, riskLevel: "Medium-High", score: 60, override: "No" },
      ],
    },
    {
      id: "1.4.2", number: "1.4.2", title: "AI-DETECTED BEHAVIOURAL ANOMALIES – NEW", isNew: true,
      parameters: [
        { id: "p406", label: "ML Model: Transaction Velocity Anomaly Score > Threshold", isNew: true, enabled: true, riskLevel: "High",        score: 75, override: "Override to High" },
        { id: "p407", label: "ML Model: Peer Group Outlier Behaviour Detected",          isNew: true, enabled: true, riskLevel: "Medium-High", score: 60, override: "No" },
        { id: "p408", label: "AI: Unusual Geographic Spend Pattern",                      isNew: true, enabled: true, riskLevel: "Medium",      score: 40, override: "No" },
      ],
    },
  ],
  "1.5": [
    {
      id: "1.5.1", number: "1.5.1", title: "HIGH-RISK BUSINESS SECTORS",
      parameters: [
        { id: "p501", label: "Money Services Business (MSB) / Hawala / Exchange House",      enabled: true, riskLevel: "Extreme",     score: 100, override: "Yes" },
        { id: "p502", label: "Casino / Gaming / Gambling Business",                          enabled: true, riskLevel: "Extreme",     score: 100, override: "Yes" },
        { id: "p503", label: "Arms / Defence / Weapons Dealer",                              enabled: true, riskLevel: "Extreme",     score: 100, override: "Yes" },
        { id: "p504", label: "Real Estate Developer / Agent (High-Value)",                   enabled: true, riskLevel: "High",        score: 75,  override: "No" },
        { id: "p505", label: "Precious Metals / Stones / Jewellery Dealer",                  enabled: true, riskLevel: "High",        score: 75,  override: "No" },
        { id: "p506", label: "Non-Governmental Organisation (NGO) / Charity",                enabled: true, riskLevel: "Medium-High", score: 60,  override: "No" },
        { id: "p507", label: "Import / Export Business (Dual-Use Goods)",                    enabled: true, riskLevel: "High",        score: 75,  override: "No" },
      ],
    },
  ],
  "1.6": [
    {
      id: "1.6.1", number: "1.6.1", title: "PEP CLASSIFICATION",
      parameters: [
        { id: "p601", label: "Foreign PEP – Level 1 (Head of State, Minister, Senior Official)", enabled: true, riskLevel: "High",        score: 75, override: "No" },
        { id: "p602", label: "Domestic PEP – Level 1 (UAE Senior Government Official)",          enabled: true, riskLevel: "High",        score: 75, override: "No" },
        { id: "p603", label: "PEP – Level 2 (Senior Mgmt, Immediate Family, Close Associate)",   enabled: true, riskLevel: "Medium-High", score: 60, override: "No" },
        { id: "p604", label: "Former PEP (within 24 months of leaving office)",                   enabled: true, riskLevel: "Medium-High", score: 60, override: "No" },
        { id: "p605", label: "International Organisation PEP (UN, World Bank, IMF)",              enabled: true, riskLevel: "High",        score: 75, override: "No" },
      ],
    },
    {
      id: "1.6.2", number: "1.6.2", title: "REGULATORY & LAW ENFORCEMENT EXPOSURE",
      parameters: [
        { id: "p606", label: "Subject of Law Enforcement Investigation or Conviction",       enabled: true, riskLevel: "Extreme",     score: 100, override: "Yes" },
        { id: "p607", label: "Asset Freeze or Court Order in Place",                         enabled: true, riskLevel: "Extreme",     score: 100, override: "Yes" },
        { id: "p608", label: "Debarment by Government / International Body",                 enabled: true, riskLevel: "High",        score: 75,  override: "No" },
        { id: "p609", label: "Regulatory Sanction / Fine in Last 3 Years",                   enabled: true, riskLevel: "Medium-High", score: 60,  override: "No" },
      ],
    },
  ],
  "1.7": [
    {
      id: "1.7.1", number: "1.7.1", title: "ADVERSE MEDIA SCREENING",
      parameters: [
        { id: "p701", label: "Serious Adverse Media (ML, TF, Corruption, Fraud, Drug Trafficking)", enabled: true, riskLevel: "High",        score: 75, override: "Override to High" },
        { id: "p702", label: "Moderate Adverse Media (Business Disputes, Negative Press)",          enabled: true, riskLevel: "Medium",      score: 40, override: "No" },
        { id: "p703", label: "Bankruptcy / Insolvency / Liquidation Proceedings",                   enabled: true, riskLevel: "Medium",      score: 40, override: "No" },
        { id: "p704", label: "AI-Detected Adverse Media in Arabic / Non-English Languages",  isNew: true, enabled: true, riskLevel: "Medium-High", score: 60, override: "No" },
        { id: "p705", label: "ESG / Environmental Enforcement Action Against Entity",        isNew: true, enabled: true, riskLevel: "Medium",      score: 40, override: "No" },
      ],
    },
  ],
  "1.8": [
    {
      id: "1.8.1", number: "1.8.1", title: "DIGITAL & REMOTE CHANNEL RISK",
      parameters: [
        { id: "p801", label: "Customer Onboarded via Fully Digital / Remote Channel",        enabled: true, riskLevel: "Medium",      score: 40, override: "No" },
        { id: "p802", label: "Transactions Initiated from High-Risk IP / Device",            enabled: true, riskLevel: "High",        score: 75, override: "No" },
        { id: "p803", label: "Use of Anonymising Technology (VPN / TOR / Proxy)",            enabled: true, riskLevel: "High",        score: 75, override: "Override to High" },
        { id: "p804", label: "Mobile-Only / Branchless Banking Customer",                    enabled: true, riskLevel: "Low",         score: 20, override: "No" },
        { id: "p805", label: "Third-Party Payment Initiation (Open Banking / API)",   isNew: true, enabled: true, riskLevel: "Medium-High", score: 60, override: "No" },
      ],
    },
  ],
};

export function CustomerRiskRatingConfiguration(_props: CustomerRiskRatingConfigurationProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [selectedCategoryId, setSelectedCategoryId] = useState("1.1");
  const [subSections, setSubSections] = useState<Record<string, SubSection[]>>(initialSubSections);

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId)!;
  const totalWeight = categories.reduce((sum, c) => sum + c.weight, 0);
  const weightDiff = 100 - totalWeight;

  const updateParameter = (catId: string, paramId: string, field: keyof Parameter, value: any) => {
    setSubSections((prev) => ({
      ...prev,
      [catId]: prev[catId].map((sec) => ({
        ...sec,
        parameters: sec.parameters.map((p) => {
          if (p.id !== paramId) return p;
          const updated = { ...p, [field]: value };
          if (field === "riskLevel") updated.score = RISK_SCORE_MAP[value as RiskLevel];
          return updated;
        }),
      })),
    }));
  };

  const updateCategoryWeight = (catId: string, weight: number) => {
    setCategories((prev) => prev.map((c) => (c.id === catId ? { ...c, weight } : c)));
  };

  const handleReset = () => {
    setSubSections(initialSubSections);
    setCategories(initialCategories);
    toast.success("Configuration reset to defaults.");
  };

  const handleSave = () => {
    toast.success("Configuration saved successfully.");
  };

  const currentSections = subSections[selectedCategoryId] ?? [];

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      {/* Weight Notification */}
      <div className="flex-shrink-0 bg-white">
        <InlineNotification
          kind="info"
          title="Total Category Weight (must equal 100%):"
          subtitle={
            totalWeight === 100
              ? "All category weights are correctly balanced."
              : `Current: ${totalWeight}% — ${weightDiff > 0 ? `Under by ${weightDiff}%` : `Over by ${Math.abs(weightDiff)}%`}`
          }
          hideCloseButton
          lowContrast
        />
      </div>

      {/* Bordered Section: Main Body + Footer */}
      <div className="flex flex-col flex-1 overflow-hidden mt-4 border border-[#e0e0e0] rounded">
        {/* Main Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Category Sidebar */}
          <div className="w-64 flex-shrink-0 bg-white border-r border-[#e0e0e0] overflow-y-auto">
            {categories.map((cat) => {
              const isSelected = cat.id === selectedCategoryId;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className="w-full text-left px-4 py-3 border-b border-[#e0e0e0] flex items-center justify-between transition-colors hover:bg-[#f4f4f4]"
                  style={{
                    background: isSelected ? "#eef2fa" : undefined,
                    borderLeft: isSelected ? "3px solid #2a53a0" : "3px solid transparent",
                  }}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span
                      className="text-xs font-semibold flex-shrink-0"
                      style={{ color: isSelected ? "#2a53a0" : "#8d8d8d" }}
                    >
                      {cat.number}
                    </span>
                    <span
                      className="text-sm truncate"
                      style={{
                        color: isSelected ? "#2a53a0" : "#161616",
                        fontWeight: isSelected ? 600 : 400,
                        fontFamily: "var(--font-primary)",
                      }}
                    >
                      {cat.label}
                    </span>
                  </div>
                  <span
                    className="text-xs font-semibold ml-2 flex-shrink-0"
                    style={{ color: isSelected ? "#2a53a0" : "#525252" }}
                  >
                    {cat.weight}%
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Content Panel */}
          <div className="flex-1 overflow-y-auto bg-white">
            <div className="p-4">
              {/* Category Header */}
              <div className="bg-white border border-[#e0e0e0] rounded mb-4 px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CircleFill size={10} style={{ color: "#da1e28" }} />
                  <h2
                    style={{ fontFamily: "var(--font-secondary)" }}
                    className="text-base font-semibold text-[#161616]"
                  >
                    {selectedCategory.label}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#525252]">Weight</span>
                  <div style={{ width: 72 }}>
                    <NumberInput
                      id={`weight-${selectedCategory.id}`}
                      value={selectedCategory.weight}
                      min={0}
                      max={100}
                      step={1}
                      size="sm"
                      hideSteppers
                      onChange={(_e: any, { value }: any) => {
                        if (typeof value === "number") updateCategoryWeight(selectedCategory.id, value);
                      }}
                    />
                  </div>
                  <span className="text-sm text-[#525252]">%</span>
                </div>
              </div>

              {/* Sub-sections */}
              {currentSections.map((section) => (
                <div key={section.id} className="bg-white border border-[#e0e0e0] rounded mb-4 overflow-hidden">
                  <div className="px-5 py-2.5 bg-[#f4f4f4] border-b border-[#e0e0e0] flex items-center gap-2">
                    <span className="text-xs font-semibold tracking-wider text-[#525252] uppercase">
                      {section.number}
                    </span>
                    {section.isNew && (
                      <span className="mr-1">
                        <Tag type="purple" size="sm">★ NEW</Tag>
                      </span>
                    )}
                    <span className="text-xs font-semibold tracking-wider text-[#525252] uppercase">
                      {section.title}
                    </span>
                  </div>

                  <div>
                    {section.parameters.map((param, idx) => (
                      <div
                        key={param.id}
                        className="flex items-center gap-3 px-5 py-3 border-b border-[#e0e0e0] last:border-b-0"
                        style={{ background: idx % 2 === 0 ? "#ffffff" : "#fafafa" }}
                      >
                        <div className="flex-shrink-0">
                          <Checkbox
                            id={`chk-${param.id}`}
                            labelText=""
                            checked={param.enabled}
                            onChange={(_: any, { checked }: { checked: boolean }) =>
                              updateParameter(selectedCategoryId, param.id, "enabled", checked)
                            }
                          />
                        </div>

                        <div className="flex-1 min-w-0 flex items-center gap-2">
                          <span
                            className="text-sm text-[#161616]"
                            style={{ fontFamily: "var(--font-primary)" }}
                          >
                            {param.label}
                          </span>
                          {param.isNew && <Tag type="purple" size="sm">★ NEW</Tag>}
                        </div>

                        {/* Risk Level Dropdown */}
                        <div style={{ width: 148 }} className="flex-shrink-0 ssc-dropdown-wrap">
                          <Dropdown
                            id={`risk-${param.id}`}
                            titleText=""
                            label=""
                            items={["Extreme", "High", "Medium-High", "Medium", "Low"]}
                            selectedItem={param.riskLevel}
                            onChange={({ selectedItem }: any) =>
                              updateParameter(selectedCategoryId, param.id, "riskLevel", selectedItem as RiskLevel)
                            }
                            size="sm"
                          />
                        </div>

                        {/* Score Badge */}
                        <div
                          className="flex-shrink-0 w-10 h-7 rounded flex items-center justify-center text-xs font-bold"
                          style={{
                            background: getScoreColor(param.score),
                            color: getScoreTextColor(param.score),
                          }}
                        >
                          {param.score}
                        </div>

                        {/* Override Dropdown */}
                        <div style={{ width: 168 }} className="flex-shrink-0 ssc-dropdown-wrap">
                          <Dropdown
                            id={`override-${param.id}`}
                            titleText=""
                            label=""
                            items={["No", "Yes", "Override to High", "Override to Medium-High", "Override to Medium"]}
                            selectedItem={param.override}
                            onChange={({ selectedItem }: any) =>
                              updateParameter(selectedCategoryId, param.id, "override", selectedItem as OverrideOption)
                            }
                            size="sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex-shrink-0 bg-white border-t border-[#e0e0e0] px-6 flex items-center justify-between"
          style={{ height: 80 }}
        >
          <div className="flex items-center gap-2">
            <Warning size={16} style={{ color: "#da1e28", flexShrink: 0 }} />
            <span className="text-sm font-medium" style={{ color: "#da1e28" }}>
              Configuration changes are applied to the scoring engine immediately.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              style={{
                height: 46, padding: "0 16px", border: "1px solid #2a53a0", borderRadius: 8,
                color: "#2a53a0", background: "transparent", cursor: "pointer", fontSize: 14,
                fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 8, whiteSpace: "nowrap",
              }}
            >
              <Reset size={16} /> Reset to Defaults
            </button>
            <button
              onClick={handleSave}
              style={{
                height: 46, padding: "0 16px", border: "1px solid #2a53a0", borderRadius: 8,
                color: "#ffffff", background: "#2a53a0", cursor: "pointer", fontSize: 14,
                fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 8, whiteSpace: "nowrap",
              }}
            >
              <Save size={16} /> Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
