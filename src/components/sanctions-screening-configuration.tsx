import { useState } from "react";
import {
  Checkbox,
  Select,
  SelectItem,
  Tag,
  NumberInput,
} from "carbon-components-react";
import {
  Reset,
  Save,
  Warning,
  CircleFill,
} from "@carbon/icons-react";
import { toast } from "sonner@2.0.3";

interface SanctionsScreeningConfigurationProps {
  breadcrumbs?: any[];
  onBreadcrumbNavigate?: (path: string) => void;
}

type RiskLevel = "Extreme" | "High" | "Medium-High" | "Medium" | "Low";
type OverrideOption = "No" | "Yes – Prohibit" | "Override to High" | "Override to Medium-High" | "Override to Medium";

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

const SCORE_COLOR: Record<number, string> = {
  100: "#da1e28",
  75: "#ff832b",
  60: "#f1c21b",
  40: "#24a148",
  20: "#0f62fe",
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
  { id: "4.1", number: "4.1", label: "Sanctions & Watchlist Risk", weight: 25 },
  { id: "4.2", number: "4.2", label: "Geographic & Jurisdictional Risk", weight: 20 },
  { id: "4.3", number: "4.3", label: "Transactional Behaviour Risk", weight: 15 },
  { id: "4.4", number: "4.4", label: "Business & Occupation Risk", weight: 15 },
  { id: "4.5", number: "4.5", label: "Customer Profile & KYC Risk", weight: 8 },
  { id: "4.6", number: "4.6", label: "Product & Service Risk", weight: 5 },
  { id: "4.7", number: "4.7", label: "Channel & Delivery Risk", weight: 3 },
  { id: "4.8", number: "4.8", label: "Financial Profile Risk", weight: 1 },
  { id: "4.9", number: "4.9", label: "Entity Type & Corporate Structure", weight: 1 },
];

const initialSubSections: SubSection[] = [
  {
    id: "4.1.1",
    number: "4.1.1",
    title: "SANCTIONS LIST SCREENING",
    parameters: [
      { id: "p1", label: "UN Security Council / Taliban Sanctions (1267/1989)", enabled: true, riskLevel: "Extreme", score: 100, override: "Yes – Prohibit" },
      { id: "p2", label: "OFAC SDN / EU & UK HMT Sanctions", enabled: true, riskLevel: "Extreme", score: 100, override: "Yes – Prohibit" },
      { id: "p3", label: "UAE Local Sanctions List", enabled: true, riskLevel: "Extreme", score: 100, override: "Yes – Prohibit" },
      { id: "p4", label: "Internal Bank Blacklist", enabled: true, riskLevel: "Extreme", score: 100, override: "Yes – Prohibit" },
      { id: "p5", label: "Export Control Lists (Dual-Use Goods)", enabled: true, riskLevel: "High", score: 75, override: "No" },
      { id: "p6", label: "INTERPOL Red Notices / FBI Most Wanted", enabled: true, riskLevel: "High", score: 75, override: "Override to High" },
    ],
  },
  {
    id: "4.1.2",
    number: "4.1.2",
    title: "PROLIFERATION FINANCING (CPF) – NEW",
    isNew: true,
    parameters: [
      { id: "p7", label: "Proliferation Financing Indicator — Dual-Use Technology Broker", isNew: true, enabled: true, riskLevel: "Extreme", score: 100, override: "Yes – Prohibit" },
      { id: "p8", label: "Customer in Strategic Goods Supply Chain Without Export Licence", isNew: true, enabled: true, riskLevel: "Extreme", score: 100, override: "Yes – Prohibit" },
      { id: "p9", label: "Front Company Suspected of Sanctions/Export Control Evasion", isNew: true, enabled: true, riskLevel: "Extreme", score: 100, override: "Yes – Prohibit" },
      { id: "p10", label: "Transactions Linked to WMD-Related Jurisdictions/Entities", isNew: true, enabled: true, riskLevel: "Extreme", score: 100, override: "Yes – Prohibit" },
      { id: "p11", label: "Ship-to-Ship Transfer / Flag-of-Convenience Vessel", isNew: true, enabled: true, riskLevel: "High", score: 75, override: "Override to High" },
      { id: "p12", label: "Secondary Sanctions Exposure (US OFAC)", isNew: true, enabled: true, riskLevel: "High", score: 75, override: "No" },
    ],
  },
  {
    id: "4.1.3",
    number: "4.1.3",
    title: "POLITICALLY EXPOSED PERSONS (PEP)",
    parameters: [
      { id: "p13", label: "Foreign PEP — Level 1 (Head of State, Minister, Intl Org PEP)", enabled: true, riskLevel: "High", score: 75, override: "No" },
      { id: "p14", label: "Domestic PEP — Level 1 (UAE Senior Official)", enabled: true, riskLevel: "High", score: 75, override: "No" },
      { id: "p15", label: "PEP — Level 2 (Senior Mgmt, Immediate Family, Former PEP)", enabled: true, riskLevel: "Medium-High", score: 60, override: "No" },
      { id: "p16", label: "Diplomat with Immunity", enabled: true, riskLevel: "High", score: 75, override: "No" },
      { id: "p17", label: "Senior Judiciary / Military / Police Official", enabled: true, riskLevel: "Medium-High", score: 60, override: "No" },
    ],
  },
  {
    id: "4.1.4",
    number: "4.1.4",
    title: "ADVERSE MEDIA & REPUTATIONAL RISK",
    parameters: [
      { id: "p18", label: "Serious Adverse Media (ML, TF, Corruption, Fraud, Criminal Charges)", enabled: true, riskLevel: "High", score: 75, override: "Override to High" },
      { id: "p19", label: "Moderate Adverse Media (Business Disputes, Negative Social Media)", enabled: true, riskLevel: "Medium", score: 40, override: "No" },
      { id: "p20", label: "Bankruptcy / Insolvency Proceedings", enabled: true, riskLevel: "Medium", score: 40, override: "No" },
      { id: "p21", label: "Debarment by Government / International Bodies", enabled: true, riskLevel: "High", score: 75, override: "No" },
      { id: "p22", label: "AI-Detected Adverse Media in Arabic / Non-English Languages", isNew: true, enabled: true, riskLevel: "Medium-High", score: 60, override: "No" },
      { id: "p23", label: "ESG / Environmental Enforcement Action Against Entity", isNew: true, enabled: true, riskLevel: "Medium", score: 40, override: "No" },
      { id: "p24", label: "Greenwashing or Carbon Credit Fraud Allegations", isNew: true, enabled: true, riskLevel: "Medium-High", score: 60, override: "No" },
    ],
  },
];

export function SanctionsScreeningConfiguration(_props: SanctionsScreeningConfigurationProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [selectedCategoryId, setSelectedCategoryId] = useState("4.1");
  const [subSections, setSubSections] = useState<SubSection[]>(initialSubSections);

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId)!;
  const totalWeight = categories.reduce((sum, c) => sum + c.weight, 0);
  const weightDiff = 100 - totalWeight;

  const updateParameter = (paramId: string, field: keyof Parameter, value: any) => {
    setSubSections((prev) =>
      prev.map((sec) => ({
        ...sec,
        parameters: sec.parameters.map((p) => {
          if (p.id !== paramId) return p;
          const updated = { ...p, [field]: value };
          if (field === "riskLevel") {
            updated.score = RISK_SCORE_MAP[value as RiskLevel];
          }
          return updated;
        }),
      }))
    );
  };

  const updateCategoryWeight = (catId: string, weight: number) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === catId ? { ...c, weight } : c))
    );
  };

  const handleReset = () => {
    setSubSections(initialSubSections);
    setCategories(initialCategories);
    toast.success("Configuration reset to defaults.");
  };

  const handleSave = () => {
    toast.success("Configuration saved successfully.");
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      {/* Page Header */}
      <div className="flex-shrink-0 bg-white">
        {/* Total Weight Bar */}
        <div className="flex items-center justify-between bg-[#f9f9f9] border border-[#e0e0e0] rounded px-4 py-2.5">
          <span className="text-sm text-[#525252]">
            Total Category Weight <span className="text-[#161616] font-medium">(must equal 100%)</span>
          </span>
          <div className="flex items-center gap-2">
            <span
              className="text-base font-semibold"
              style={{ color: totalWeight === 100 ? "#24a148" : "#ff832b" }}
            >
              {totalWeight}%
            </span>
            {totalWeight !== 100 && (
              <span className="flex items-center gap-1 text-sm" style={{ color: "#ff832b" }}>
                <Warning size={14} />
                {weightDiff > 0 ? `Under by ${weightDiff}%` : `Over by ${Math.abs(weightDiff)}%`}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bordered Section: Main Body + Footer */}
      <div className="flex flex-col flex-1 overflow-hidden mt-4 border border-[#e0e0e0] rounded">
      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Category Sidebar — no scroll, static list */}
        <div className="w-64 flex-shrink-0 bg-white border-r border-[#e0e0e0] overflow-y-auto">
          {categories.map((cat) => {
            const isSelected = cat.id === selectedCategoryId;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className="w-full text-left px-4 py-3 border-b border-[#e0e0e0] flex items-center justify-between transition-colors hover:bg-[#f4f4f4]"
                style={{
                  background: isSelected ? "#fff1f1" : undefined,
                  borderLeft: isSelected ? "3px solid #da1e28" : "3px solid transparent",
                }}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span
                    className="text-xs font-semibold flex-shrink-0"
                    style={{ color: isSelected ? "#da1e28" : "#8d8d8d" }}
                  >
                    {cat.number}
                  </span>
                  <span
                    className="text-sm truncate"
                    style={{
                      color: isSelected ? "#da1e28" : "#161616",
                      fontWeight: isSelected ? 600 : 400,
                      fontFamily: "var(--font-primary)",
                    }}
                  >
                    {cat.label}
                  </span>
                </div>
                <span
                  className="text-xs font-semibold ml-2 flex-shrink-0"
                  style={{ color: isSelected ? "#da1e28" : "#525252" }}
                >
                  {cat.weight}%
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Content Panel — only this scrolls */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="p-5">
            {/* Category Header */}
            <div className="bg-white border border-[#e0e0e0] rounded mb-4 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CircleFill size={10} className="text-[#da1e28]" style={{ color: "#da1e28" }} />
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
            {subSections.map((section) => (
              <div key={section.id} className="bg-white border border-[#e0e0e0] rounded mb-4 overflow-hidden">
                {/* Section Header */}
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

                {/* Parameter Rows */}
                <div>
                  {section.parameters.map((param, idx) => (
                    <div
                      key={param.id}
                      className="flex items-center gap-3 px-5 py-3 border-b border-[#e0e0e0] last:border-b-0"
                      style={{ background: idx % 2 === 0 ? "#ffffff" : "#fafafa" }}
                    >
                      {/* Checkbox */}
                      <div className="flex-shrink-0">
                        <Checkbox
                          id={`chk-${param.id}`}
                          labelText=""
                          checked={param.enabled}
                          onChange={(_, { checked }: { checked: boolean }) =>
                            updateParameter(param.id, "enabled", checked)
                          }
                        />
                      </div>

                      {/* Label */}
                      <div className="flex-1 min-w-0 flex items-center gap-2">
                        <span
                          className="text-sm text-[#161616]"
                          style={{ fontFamily: "var(--font-primary)" }}
                        >
                          {param.label}
                        </span>
                        {param.isNew && (
                          <Tag type="purple" size="sm">★ NEW</Tag>
                        )}
                      </div>

                      {/* Risk Level Select */}
                      <div style={{ width: 148, border: "1px solid #e0e0e0", borderRadius: 2 }} className="flex-shrink-0">
                        <Select
                          id={`risk-${param.id}`}
                          labelText=""
                          hideLabel
                          size="sm"
                          value={param.riskLevel}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            updateParameter(param.id, "riskLevel", e.target.value as RiskLevel)
                          }
                        >
                          <SelectItem value="Extreme" text="Extreme" />
                          <SelectItem value="High" text="High" />
                          <SelectItem value="Medium-High" text="Medium-High" />
                          <SelectItem value="Medium" text="Medium" />
                          <SelectItem value="Low" text="Low" />
                        </Select>
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

                      {/* Override Select */}
                      <div style={{ width: 168, border: "1px solid #e0e0e0", borderRadius: 2 }} className="flex-shrink-0">
                        <Select
                          id={`override-${param.id}`}
                          labelText=""
                          hideLabel
                          size="sm"
                          value={param.override}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            updateParameter(param.id, "override", e.target.value as OverrideOption)
                          }
                        >
                          <SelectItem value="No" text="No" />
                          <SelectItem value="Yes – Prohibit" text="Yes – Prohibit" />
                          <SelectItem value="Override to High" text="Override to High" />
                          <SelectItem value="Override to Medium-High" text="Override to Medium-High" />
                          <SelectItem value="Override to Medium" text="Override to Medium" />
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar — fixed height 80px, never scrolls */}
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
              height: 46,
              padding: "0 16px",
              border: "1px solid #030213",
              color: "#030213",
              background: "transparent",
              cursor: "pointer",
              fontSize: 14,
              fontFamily: "inherit",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              whiteSpace: "nowrap",
            }}
          >
            <Reset size={16} />
            Reset to Defaults
          </button>
          <button
            onClick={handleSave}
            style={{
              height: 46,
              padding: "0 16px",
              border: "1px solid #030213",
              color: "#ffffff",
              background: "#030213",
              cursor: "pointer",
              fontSize: 14,
              fontFamily: "inherit",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              whiteSpace: "nowrap",
            }}
          >
            <Save size={16} />
            Save Configuration
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
