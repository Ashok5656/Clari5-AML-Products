import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { ZoomIn, ZoomOut, FitToScreen, Search } from "@carbon/icons-react";
import { cn } from "./ui/utils";
import { Dropdown, MultiSelect } from "carbon-components-react";

// ─── Types ─────────────────────────────────────────────
type RiskLevel = 'HIGH' | 'MED' | 'LOW';
type EdgeType = 'normal' | 'alerted' | 'commonContact' | 'commonIP' | 'relatedParty';
type BadgeType = 'highRiskCountry' | 'sanction' | 'adverse' | 'pep' | 'str' | 'dormant' | 'mule';
type TxnType = 'NEFT' | 'RTGS' | 'IMPS' | 'SWIFT' | 'Cash' | 'Cheque';
type NodeTab = 'Entity Summary' | 'Account' | 'Risk Indicators' | 'Transactions' | 'Alerts' | 'Common Links';

interface GNode {
  id: string; label: string; subLabel: string; icon: string;
  level: 0 | 1 | 2; riskLevel: RiskLevel; isAlertNode?: boolean;
  badges: BadgeType[]; x: number; y: number;
  customerId: string; entityType: string; address: string; email: string; contact: string;
  strFiled?: string; totalTxnAmount: string; incoming: string; outgoing: string;
}
interface GEdge {
  source: string; target: string; type: EdgeType;
  amount?: string; direction?: 'in' | 'out' | 'both'; strokeWidth: number;
}
interface Filters {
  dateFrom: string; dateTo: string; customerSearch: string;
  amountMin: string; amountMax: string; txnTypes: TxnType[]; levels: number;
  showPEP: boolean; showSanction: boolean; showHighRiskJuris: boolean;
  highlightAlerted: boolean; showCommonLinks: boolean; showNonCustomers: boolean;
}
interface GraphicalNetworkAnalysisProps {
  breadcrumbs?: unknown[];
  onBreadcrumbNavigate?: (path: string) => void;
}

// ─── Constants ─────────────────────────────────────────
const TXN_TYPES: TxnType[] = ['NEFT', 'RTGS', 'IMPS', 'SWIFT', 'Cash', 'Cheque'];
const NODE_TABS: NodeTab[] = ['Entity Summary', 'Account', 'Risk Indicators', 'Transactions', 'Alerts', 'Common Links'];
const DEFAULT_FILTERS: Filters = {
  dateFrom: '2025-01-01', dateTo: '2025-03-31', customerSearch: '',
  amountMin: '1,000', amountMax: '2,00,000', txnTypes: [...TXN_TYPES], levels: 2,
  showPEP: true, showSanction: true, showHighRiskJuris: true,
  highlightAlerted: true, showCommonLinks: true, showNonCustomers: true,
};
const CHECKBOX_OPTIONS: { key: keyof Filters; label: string }[] = [
  { key: 'showPEP',           label: 'PEP / Adverse' },
  { key: 'showSanction',      label: 'Sanction Match' },
  { key: 'showHighRiskJuris', label: 'High Risk Country' },
  { key: 'highlightAlerted',  label: 'Highlight Alerted' },
  { key: 'showCommonLinks',   label: 'Common Links' },
  { key: 'showNonCustomers',  label: 'Non-Customer Links' },
];
const DISPLAY_ITEMS = CHECKBOX_OPTIONS.map(o => ({ id: o.key, label: o.label }));
const LEVEL_ITEMS = [1, 2, 3, 4].map(l => ({ id: l, label: `Level ${l}` }));
const BADGE_ICONS: Record<BadgeType, string> = {
  highRiskCountry: '⛔', sanction: '🚫', adverse: '📰', pep: 'PEP',
  str: '🔔', dormant: '💤', mule: '🧟',
};
const LEGEND_NODES = [
  { label: 'High Risk',    color: '#dc2626' },
  { label: 'Medium Risk',  color: '#d97706' },
  { label: 'Low Risk',     color: '#16a34a' },
];
const LEGEND_EDGES = [
  { label: 'Normal Txn',      color: '#2563eb', dashed: false },
  { label: 'Alerted Txn',     color: '#dc2626', dashed: false },
  { label: 'Common Contact',  color: '#f59e0b', dashed: true },
  { label: 'Common IP',       color: '#7c3aed', dashed: true },
  { label: 'Related Party',   color: '#059669', dashed: true },
];
const RISK_BADGE_LIST = [
  { key: 'highRiskCountry', icon: '⛔', name: 'High Risk Country',            activeDesc: 'Linked to FATF High-Risk jurisdiction' },
  { key: 'sanction',        icon: '🚫', name: 'Sanctioned Entity',             activeDesc: 'Match against OFAC / UN / EU Sanctions list' },
  { key: 'adverse',         icon: '📰', name: 'Adverse Media Match',           activeDesc: 'Negative news / media match found' },
  { key: 'pep',             icon: '🏛️', name: 'Politically Exposed Person',    activeDesc: 'PEP or close associate identified' },
  { key: 'str',             icon: '🔔', name: 'STR / CTR Filed',               activeDesc: 'STR or CTR report filed on this entity' },
  { key: 'dormant',         icon: '💤', name: 'Dormant Account',               activeDesc: 'Account was dormant, now suddenly active' },
  { key: 'mule',            icon: '🧟', name: 'Suspected Money Mule',          activeDesc: 'Flagged as suspected money mule' },
];
const MOCK_TXNS = [
  { amount: '₹45,00,000', type: 'SWIFT', date: '15 Mar 2025', dir: 'out', alerted: true },
  { amount: '₹12,50,000', type: 'NEFT',  date: '10 Mar 2025', dir: 'in',  alerted: false },
  { amount: '₹8,20,000',  type: 'RTGS',  date: '05 Mar 2025', dir: 'out', alerted: false },
  { amount: '₹22,00,000', type: 'IMPS',  date: '01 Mar 2025', dir: 'in',  alerted: false },
  { amount: '₹3,40,000',  type: 'NEFT',  date: '25 Feb 2025', dir: 'in',  alerted: false },
];
const MOCK_ALERTS = [
  { rule: 'High Value Cross-Border Txn',  date: '15 Mar 2025', desc: 'SWIFT transfer of ₹45L to UAE-based non-customer exceeds cross-border threshold.' },
  { rule: 'Structuring Pattern Detected', date: '10 Feb 2025', desc: 'Multiple transactions just below ₹10L threshold over 7 consecutive days.' },
  { rule: 'PEP Association Alert',        date: '25 Jan 2025', desc: 'Account transacting with known PEP — Priya Sharma (CUST-078).' },
];
const MOCK_COMMON_LINKS = [
  { icon: '📱', type: 'Common Phone Number',  entity: 'Unknown Payee', value: '+971 50 XXX XXXX (masked)' },
  { icon: '✉️', type: 'Common Email Domain',  entity: 'Shell Ltd',     value: 'ops@acme-group.com' },
];

// ─── Mock Data ──────────────────────────────────────────
const MOCK_NODES: GNode[] = [
  { id: 'focal',       label: 'ACME Corp',      subLabel: 'CUST-001',      icon: '🏢', level: 0, riskLevel: 'HIGH', badges: ['str'],             x: 390, y: 220, customerId: 'CUST-001', entityType: 'Non-Individual / Corporate',     address: '42, Commercial Zone, Mumbai', email: 'ops@acmecorp.in',       contact: '+91 98765 43210', strFiled: 'Yes — 12 Feb 2025', totalTxnAmount: '₹1,24,50,000', incoming: '₹85,00,000 (32 txns)', outgoing: '₹39,50,000 (18 txns)' },
  { id: 'l1-left',    label: 'Raj Kumar',       subLabel: 'CUST-012',      icon: '👤', level: 1, riskLevel: 'MED', badges: ['adverse'],          x: 215, y: 220, customerId: 'CUST-012', entityType: 'Individual',                    address: '12, Park Avenue, Delhi',      email: 'raj.kumar@email.com',   contact: '+91 87654 32109',                                   totalTxnAmount: '₹12,50,000',    incoming: '₹5,00,000 (8 txns)',   outgoing: '₹7,50,000 (12 txns)' },
  { id: 'l1-right',   label: 'Global Bank',     subLabel: 'CUST-034',      icon: '🏦', level: 1, riskLevel: 'LOW', badges: [],                   x: 565, y: 220, customerId: 'CUST-034', entityType: 'Financial Institution',         address: '1, Bank Street, Hyderabad',   email: 'ops@globalbank.com',    contact: '+91 40 2345 6789',                                  totalTxnAmount: '₹8,20,000',     incoming: '₹8,20,000 (6 txns)',   outgoing: '—' },
  { id: 'l1-bottom',  label: 'Unknown Payee',   subLabel: 'Non-Customer',  icon: '👤', level: 1, riskLevel: 'HIGH', isAlertNode: true, badges: ['highRiskCountry'], x: 390, y: 372, customerId: '—', entityType: 'Non-Customer / Individual', address: 'Dubai, UAE',                  email: '—',                     contact: '—',                      strFiled: 'Pending',           totalTxnAmount: '₹45,00,000',    incoming: '—',                    outgoing: '₹45,00,000 (3 txns)' },
  { id: 'l1-topleft', label: 'Priya Sharma',    subLabel: 'CUST-078',      icon: '👤', level: 1, riskLevel: 'LOW', badges: ['pep'],               x: 268, y: 128, customerId: 'CUST-078', entityType: 'Individual / PEP',             address: '7, Civil Lines, Chennai',     email: 'priya.s@email.com',     contact: '+91 94456 78901',                                   totalTxnAmount: '₹3,40,000',     incoming: '₹3,40,000 (4 txns)',   outgoing: '—' },
  { id: 'l1-topright',label: 'Shell Ltd',       subLabel: 'Non-Customer',  icon: '🏢', level: 1, riskLevel: 'MED', badges: ['sanction'],          x: 512, y: 128, customerId: '—',        entityType: 'Non-Individual / Shell Company', address: 'Cayman Islands',             email: '—',                     contact: '—',                                                 totalTxnAmount: '₹22,00,000',    incoming: '₹22,00,000 (5 txns)', outgoing: '—' },
  { id: 'l2-tl',      label: 'Ali Merchants',   subLabel: '',              icon: '👤', level: 2, riskLevel: 'LOW', badges: [],                   x: 118, y: 96,  customerId: '—', entityType: 'Individual',  address: '—', email: '—', contact: '—', totalTxnAmount: '—', incoming: '—', outgoing: '—' },
  { id: 'l2-tr',      label: 'CitiBank N.A.',   subLabel: '',              icon: '🏦', level: 2, riskLevel: 'LOW', badges: [],                   x: 662, y: 96,  customerId: '—', entityType: 'Financial Institution', address: '—', email: '—', contact: '—', totalTxnAmount: '—', incoming: '—', outgoing: '—' },
  { id: 'l2-br',      label: 'FX Broker Co',    subLabel: '',              icon: '👤', level: 2, riskLevel: 'MED', badges: [],                   x: 662, y: 345, customerId: '—', entityType: 'Corporate',   address: '—', email: '—', contact: '—', totalTxnAmount: '—', incoming: '—', outgoing: '—' },
  { id: 'l2-bl',      label: 'Supplier XYZ',    subLabel: '',              icon: '👤', level: 2, riskLevel: 'HIGH', badges: [],                  x: 118, y: 345, customerId: '—', entityType: 'Corporate',   address: '—', email: '—', contact: '—', totalTxnAmount: '—', incoming: '—', outgoing: '—' },
  { id: 'l2-top',     label: 'Trade Corp',      subLabel: '',              icon: '🏢', level: 2, riskLevel: 'LOW', badges: [],                   x: 390, y: 58,  customerId: '—', entityType: 'Corporate',   address: '—', email: '—', contact: '—', totalTxnAmount: '—', incoming: '—', outgoing: '—' },
];
const MOCK_EDGES: GEdge[] = [
  { source: 'focal',       target: 'l1-left',    type: 'normal',       amount: '₹12.5L', direction: 'both', strokeWidth: 3   },
  { source: 'focal',       target: 'l1-right',   type: 'normal',       amount: '₹8.2L',  direction: 'out',  strokeWidth: 2.5 },
  { source: 'focal',       target: 'l1-bottom',  type: 'alerted',      amount: '₹45L',   direction: 'out',  strokeWidth: 5   },
  { source: 'focal',       target: 'l1-topleft', type: 'normal',       amount: '₹3.4L',  direction: 'in',   strokeWidth: 2   },
  { source: 'focal',       target: 'l1-topright',type: 'normal',       amount: '₹22L',   direction: 'in',   strokeWidth: 3.5 },
  { source: 'l1-left',     target: 'l1-bottom',  type: 'commonContact',                                    strokeWidth: 1.5 },
  { source: 'l1-topleft',  target: 'l2-tl',      type: 'normal',       amount: '₹2L',    direction: 'out',  strokeWidth: 1.5 },
  { source: 'l1-topright', target: 'l2-tr',      type: 'normal',       amount: '₹5L',    direction: 'in',   strokeWidth: 2   },
  { source: 'l1-right',    target: 'l2-br',      type: 'normal',       amount: '₹3L',    direction: 'out',  strokeWidth: 1.5 },
  { source: 'l1-left',     target: 'l2-bl',      type: 'normal',       amount: '₹4L',    direction: 'in',   strokeWidth: 2   },
  { source: 'l1-topleft',  target: 'l2-top',     type: 'normal',       amount: '₹1.5L',  direction: 'both', strokeWidth: 1.5 },
];

// ─── Helpers ────────────────────────────────────────────
function riskBorder(r: RiskLevel)  { return r === 'HIGH' ? '#dc2626' : r === 'MED' ? '#d97706' : '#16a34a'; }
function riskBg(r: RiskLevel)      { return r === 'HIGH' ? '#fff1f2' : r === 'MED' ? '#fffbeb' : '#f0fdf4'; }
function riskTextDark(r: RiskLevel){ return r === 'HIGH' ? '#b91c1c' : r === 'MED' ? '#92400e' : '#14532d'; }
function nodeR(l: 0 | 1 | 2)      { return l === 0 ? 34 : l === 1 ? 27 : 18; }
function edgeColor(t: EdgeType)    { return t === 'normal' ? '#2563eb' : t === 'alerted' ? '#dc2626' : t === 'commonContact' ? '#d97706' : t === 'commonIP' ? '#7c3aed' : '#059669'; }
function edgeDash(t: EdgeType)     { return (t === 'commonContact' || t === 'commonIP' || t === 'relatedParty') ? '6,4' : undefined; }

function amountToStrokeWidth(amount?: string): number {
  if (!amount) return 1.5;
  const m = amount.match(/(\d+(?:\.\d+)?)\s*L/);
  if (!m) return 1.5;
  const l = parseFloat(m[1]);
  if (l <= 3)  return 2;
  if (l <= 8)  return 2.5;
  if (l <= 15) return 3;
  if (l <= 30) return 3.5;
  return 5;
}

function calcEdgeEndpoints(src: GNode, tgt: GNode) {
  const dx = tgt.x - src.x, dy = tgt.y - src.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const sr = nodeR(src.level) + 4, tr = nodeR(tgt.level) + 9;
  return {
    x1: src.x + (dx / len) * sr, y1: src.y + (dy / len) * sr,
    x2: tgt.x - (dx / len) * tr, y2: tgt.y - (dy / len) * tr,
  };
}

// ─── Sub-components ─────────────────────────────────────
function FilterLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-[13px] font-semibold text-[#161616]">{children}</label>;
}
function FilterInput({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input {...props}
      className={cn('border border-[#d1d5dc] bg-white rounded-[8px] px-3 h-[46px] text-[14px] text-[#161616] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#2a53a0] transition-colors w-full', className)} />
  );
}

// ─── Component ─────────────────────────────────────────
export function GraphicalNetworkAnalysis({ breadcrumbs: _b, onBreadcrumbNavigate: _n }: GraphicalNetworkAnalysisProps) {
  const [filters, setFilters]             = useState<Filters>({ ...DEFAULT_FILTERS });

  const [graphVisible, setGraphVisible]   = useState(false);
  const [isLoading, setIsLoading]         = useState(false);
  const [selectedNode, setSelectedNode]   = useState<GNode | null>(null);
  const [activeTab, setActiveTab]         = useState<NodeTab>('Entity Summary');
  const [scale, setScale]                 = useState(1);
  const [translate, setTranslate]         = useState({ x: 0, y: 0 });
  const [filterEditMode, setFilterEditMode] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef       = useRef<SVGSVGElement>(null);
  const isDragging   = useRef(false);
  const dragMoved    = useRef(false);
  const dragOrigin   = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  // Wheel zoom
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScale(s => Math.min(3, Math.max(0.25, s - e.deltaY * 0.001)));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // Auto-center on first render
  useEffect(() => {
    if (!graphVisible || !containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const s = Math.min((width - 100) / 780, (height - 100) / 440, 1.15);
    setScale(s);
    setTranslate({ x: (width - 780 * s) / 2, y: (height - 440 * s) / 2 });
  }, [graphVisible]);

  const fitToScreen = () => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const s = Math.min((width - 100) / 780, (height - 100) / 440, 1.15);
    setScale(s);
    setTranslate({ x: (width - 780 * s) / 2, y: (height - 440 * s) / 2 });
  };

  const exportGraph = () => {
    const svg = svgRef.current;
    if (!svg) return;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const rect = svg.getBoundingClientRect();
      canvas.width  = rect.width  || 800;
      canvas.height = rect.height || 500;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const a = document.createElement('a');
      a.download = 'network-graph.png';
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
    img.src = url;
  };

  const handleViewNetwork = () => {
    if (!filters.customerSearch.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setGraphVisible(true);
      setSelectedNode(null);
      setFilterEditMode(false);
    }, 1500);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const t = e.target as Element;
    if (t.closest('[data-nodeid]')) return;
    isDragging.current = true;
    dragMoved.current  = false;
    dragOrigin.current = { x: e.clientX, y: e.clientY, tx: translate.x, ty: translate.y };
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragOrigin.current.x, dy = e.clientY - dragOrigin.current.y;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) dragMoved.current = true;
    setTranslate({ x: dragOrigin.current.tx + dx, y: dragOrigin.current.ty + dy });
  };
  const handleMouseUp = () => { isDragging.current = false; };

  const handleNodeClick = (node: GNode, e: React.MouseEvent) => {
    e.stopPropagation();
    if (dragMoved.current) return;
    setSelectedNode(node);
    setActiveTab('Entity Summary');
  };

  const setFilter = <K extends keyof Filters>(k: K, v: Filters[K]) =>
    setFilters(f => ({ ...f, [k]: v }));

  const nonCustomerIds = new Set(
    MOCK_NODES
      .filter(n => n.subLabel === 'Non-Customer')
      .map(n => n.id)
  );
  const visibleNodes = MOCK_NODES.filter(n =>
    filters.showNonCustomers || !nonCustomerIds.has(n.id)
  );
  const visibleEdges = MOCK_EDGES.filter(e => {
    if (!filters.showCommonLinks && (e.type === 'commonContact' || e.type === 'commonIP' || e.type === 'relatedParty')) return false;
    if (!filters.showNonCustomers && (nonCustomerIds.has(e.source) || nonCustomerIds.has(e.target))) return false;
    return true;
  });
  const resolvedEdgeType = (e: GEdge): EdgeType =>
    !filters.highlightAlerted && e.type === 'alerted' ? 'normal' : e.type;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50">
      {/* ═══ Filter Summary (read-only) ════════════════ */}
      {graphVisible && !filterEditMode && (
        <div className="bg-white border-b border-gray-200 flex-shrink-0 shadow-sm">
          <div className="px-4 py-2.5 flex items-center gap-3">
            <div className="flex items-center gap-2 flex-1 flex-wrap min-w-0">
              {[
                { label: 'Customer', value: filters.customerSearch },
                { label: 'Date',     value: `${filters.dateFrom} → ${filters.dateTo}` },
                { label: 'Amount',   value: `₹${filters.amountMin} – ₹${filters.amountMax}` },
                { label: 'Types',    value: filters.txnTypes.length === TXN_TYPES.length ? 'All Types' : filters.txnTypes.slice(0, 3).join(', ') + (filters.txnTypes.length > 3 ? ` +${filters.txnTypes.length - 3}` : '') },
                { label: 'Level',    value: `Level ${filters.levels}` },
              ].map(chip => (
                <div key={chip.label} className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{chip.label}:</span>
                  <span className="text-[11.5px] font-medium text-gray-700">{chip.value}</span>
                </div>
              ))}
              {/* Active display settings */}
              {(() => {
                const active = CHECKBOX_OPTIONS.filter(o => filters[o.key as keyof Filters]);
                if (!active.length) return null;
                return (
                  <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Display:</span>
                    <span className="text-[11.5px] font-medium text-gray-700">
                      {active.slice(0, 2).map(o => o.label).join(', ')}{active.length > 2 ? ` +${active.length - 2}` : ''}
                    </span>
                  </div>
                );
              })()}
            </div>
            <button
              onClick={() => setFilterEditMode(true)}
              className="flex-shrink-0 flex items-center gap-1.5 border border-[#2A53A0] text-[#2A53A0] bg-white hover:bg-blue-50 rounded-[6px] px-3 h-[30px] text-[12px] font-semibold transition-colors">
              <svg className="w-3 h-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" />
              </svg>
              Edit Filters
            </button>
          </div>
        </div>
      )}

      {/* ═══ Filter Edit Form ════════════════════════════ */}
      {(!graphVisible || filterEditMode) && (
      <div className="bg-white border-b border-gray-200 flex-shrink-0 shadow-sm">
        <div className="px-4 pt-3 pb-2.5 space-y-4">

          {/* Row 1: Search + Date Range + Amount Range */}
          <div className="flex gap-4 items-end w-full">

            {/* Customer Search */}
            <div className="flex flex-col gap-1 flex-[2.5] min-w-0">
              <FilterLabel>Customer ID / Name / Account No.</FilterLabel>
              <div className="relative">
                <FilterInput
                  type="text" placeholder="e.g. CUST-001 / ACME Corp"
                  value={filters.customerSearch}
                  onChange={e => setFilter('customerSearch', e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleViewNetwork()}
                  className="pl-8 w-full" />
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>

            {/* Date Range — two inputs under one label */}
            <div className="flex flex-col gap-1 flex-[2] min-w-0">
              <FilterLabel>Date Range</FilterLabel>
              <div className="flex items-center gap-1.5">
                <FilterInput type="date" value={filters.dateFrom}
                  onChange={e => setFilter('dateFrom', e.target.value)}
                  className="flex-1 min-w-0" />
                <span className="text-[#c4c9d4] text-[15px] select-none flex-shrink-0 font-light">→</span>
                <FilterInput type="date" value={filters.dateTo}
                  onChange={e => setFilter('dateTo', e.target.value)}
                  className="flex-1 min-w-0" />
              </div>
            </div>

            {/* Amount Range — two number inputs under one label */}
            <div className="flex flex-col gap-1 flex-[2] min-w-0">
              <FilterLabel>Amount Range</FilterLabel>
              <div className="flex items-center gap-1.5">
                <div className="relative flex-1 min-w-0">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[12px] text-[#9ca3af] font-medium select-none pointer-events-none">₹</span>
                  <FilterInput
                    type="number" placeholder="Min"
                    value={filters.amountMin}
                    onChange={e => setFilter('amountMin', e.target.value)}
                    className="pl-5 w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                </div>
                <span className="text-[#c4c9d4] text-[15px] select-none flex-shrink-0 font-light">—</span>
                <div className="relative flex-1 min-w-0">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[12px] text-[#9ca3af] font-medium select-none pointer-events-none">₹</span>
                  <FilterInput
                    type="number" placeholder="Max"
                    value={filters.amountMax}
                    onChange={e => setFilter('amountMax', e.target.value)}
                    className="pl-5 w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Transaction Type + # of Levels + Graph Display Settings */}
          <div className="flex gap-3 items-center w-full">

            {/* Transaction Type — Carbon MultiSelect */}
            <div className="flex flex-col gap-1 flex-[1] min-w-0">
              <FilterLabel>Transaction Type</FilterLabel>
              <div className="carbon-field-border">
                <MultiSelect
                  id="txn-types"
                  className="filter-carbon"
                  titleText=""
                  hideLabel
                  label="All Types"
                  items={TXN_TYPES as any}
                  itemToString={(item: any) => item || ''}
                  selectedItems={filters.txnTypes as any}
                  onChange={({ selectedItems }: any) =>
                    setFilter('txnTypes', selectedItems as TxnType[])
                  }
                />
              </div>
            </div>

            {/* # of Levels — Carbon Dropdown */}
            <div className="flex flex-col gap-1 flex-[1] min-w-0">
              <FilterLabel># of Levels</FilterLabel>
              <div className="carbon-field-border">
                <Dropdown
                  id="levels"
                  className="filter-carbon"
                  titleText=""
                  label=""
                  items={LEVEL_ITEMS as any}
                  itemToString={(item: any) => item ? item.label : ''}
                  selectedItem={LEVEL_ITEMS.find(l => l.id === filters.levels) as any}
                  onChange={({ selectedItem }: any) => {
                    if (selectedItem) setFilter('levels', selectedItem.id);
                  }}
                />
              </div>
            </div>

            {/* Graph Display Settings — single-row checklist */}
            <div className="flex flex-col gap-1 flex-[4] min-w-0">
              <FilterLabel>Graph Display Settings</FilterLabel>
              <div className="flex flex-row flex-nowrap gap-x-3 border border-[#d1d5dc] rounded-[8px] bg-white px-3 h-[46px] items-center w-full justify-between">
                {CHECKBOX_OPTIONS.map(opt => (
                  <label key={opt.key} className="flex items-center gap-1 cursor-pointer select-none whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={filters[opt.key] as boolean}
                      onChange={e => setFilter(opt.key, e.target.checked)}
                      className="w-3 h-3 rounded flex-shrink-0 accent-[#2A53A0]"
                    />
                    <span className="text-[11px] text-[#374151] leading-tight">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: Action buttons */}
          <div className="flex items-center justify-end gap-4 pt-0.5 pb-0.5">
            <button onClick={handleViewNetwork} disabled={!filters.customerSearch.trim() || isLoading}
              className="bg-[#2A53A0] hover:bg-[#1f3d7a] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-[8px] px-5 h-[40px] text-[13px] font-semibold flex items-center gap-2 transition-colors shadow-sm">
              {isLoading
                ? <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" />
                : <Search className="w-3.5 h-3.5" />
              }
              View Network Links
            </button>
            <button onClick={() => { setFilters({ ...DEFAULT_FILTERS }); setGraphVisible(false); setSelectedNode(null); setFilterEditMode(true); }}
              className="bg-white border border-[#d1d5dc] hover:bg-gray-50 text-[#374151] rounded-[8px] px-5 h-[40px] text-[13px] font-semibold transition-colors">
              Reset Filters
            </button>
            {graphVisible && filterEditMode && (
              <button onClick={() => setFilterEditMode(false)}
                className="bg-white border border-[#d1d5dc] hover:bg-gray-50 text-[#374151] rounded-[8px] px-5 h-[40px] text-[13px] font-semibold transition-colors">
                Cancel
              </button>
            )}
          </div>

        </div>
      </div>
      )}

      {/* ═══ Graph Canvas ════════════════════════════════ */}
      <div className="flex-1 relative overflow-hidden bg-white" ref={containerRef}
        onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>

        {/* Dot-grid background pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-100"
          style={{
            backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }} />

        {/* Empty state */}
        {!graphVisible && !isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10">
            <div className="w-20 h-20 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 shadow-sm">
              <span className="text-4xl">🕸️</span>
            </div>
            <h3 className="text-gray-700 text-lg font-semibold">Ready to Analyze</h3>
            <p className="text-gray-400 text-[13px] mt-2 text-center max-w-sm leading-relaxed">
              Enter a Customer ID, Name, or Account No. above and click{' '}
              <span className="text-[#2A53A0] font-semibold">View Network Links</span> to generate the network graph.
            </p>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
              className="w-11 h-11 border-4 border-[#2A53A0]/20 border-t-[#2A53A0] rounded-full mb-4" />
            <p className="text-gray-500 text-sm font-medium">Building network graph…</p>
          </div>
        )}

        {/* SVG Network Graph */}
        {graphVisible && (
          <svg ref={svgRef} className="absolute inset-0 w-full h-full"
            style={{ cursor: isDragging.current ? 'grabbing' : 'grab', userSelect: 'none' }}>
            <defs>
              {/* Arrow markers — end (outgoing) and start (incoming) */}
              {[['blue','#2563eb'],['red','#dc2626'],['amber','#d97706'],['purple','#7c3aed'],['green','#059669']].map(([id, color]) => (
                <React.Fragment key={id}>
                  <marker id={`arrow-${id}`} markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
                    <path d="M0,0 L0,7 L7,3.5 z" fill={color} opacity="0.9" />
                  </marker>
                  <marker id={`arrow-start-${id}`} markerWidth="7" markerHeight="7" refX="1.5" refY="3.5" orient="auto-start-reverse">
                    <path d="M0,0 L0,7 L7,3.5 z" fill={color} opacity="0.9" />
                  </marker>
                </React.Fragment>
              ))}
              {/* Drop shadow for nodes */}
              <filter id="node-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0000001a" />
              </filter>
              <filter id="focal-shadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#0000002a" />
              </filter>
            </defs>

            <g transform={`translate(${translate.x},${translate.y}) scale(${scale})`}>
              {/* Edges */}
              {visibleEdges.map((edge, i) => {
                const src = MOCK_NODES.find(n => n.id === edge.source)!;
                const tgt = MOCK_NODES.find(n => n.id === edge.target)!;
                if (!src || !tgt) return null;
                const type  = resolvedEdgeType(edge);
                const color = edgeColor(type);
                const dash  = edgeDash(type);
                const ep    = calcEdgeEndpoints(src, tgt);
                const mx    = (src.x + tgt.x) / 2;
                const my    = (src.y + tgt.y) / 2;
                const markerKey: Record<EdgeType, string> = { normal: 'blue', alerted: 'red', commonContact: 'amber', commonIP: 'purple', relatedParty: 'green' };
                const sw = amountToStrokeWidth(edge.amount) || edge.strokeWidth;
                const markerEnd   = (edge.direction === 'out'  || edge.direction === 'both') ? `url(#arrow-${markerKey[type]})` : undefined;
                const markerStart = (edge.direction === 'in'   || edge.direction === 'both') ? `url(#arrow-start-${markerKey[type]})` : undefined;

                return (
                  <g key={i}>
                    {/* Edge glow for alerted */}
                    {type === 'alerted' && (
                      <line x1={ep.x1} y1={ep.y1} x2={ep.x2} y2={ep.y2}
                        stroke="#dc2626" strokeWidth={sw + 5} opacity={0.08} />
                    )}
                    <line x1={ep.x1} y1={ep.y1} x2={ep.x2} y2={ep.y2}
                      stroke={color} strokeWidth={sw}
                      strokeDasharray={dash} opacity={0.85}
                      markerEnd={markerEnd} markerStart={markerStart} />
                    {/* Amount label */}
                    {edge.amount && (
                      <g>
                        <rect x={mx - 22} y={my - 15} width={44} height={13} rx="3"
                          fill="white" fillOpacity="0.9" stroke={color} strokeWidth="0.5" strokeOpacity="0.4" />
                        <text x={mx} y={my - 5} textAnchor="middle" fontSize="8.5" fill={color} fontWeight="700" style={{ userSelect: 'none' }}>
                          {edge.amount}{edge.direction === 'both' ? ' ↔' : edge.direction === 'in' ? ' ←' : edge.direction === 'out' ? ' →' : ''}
                        </text>
                      </g>
                    )}
                    {/* Common contact label */}
                    {edge.type === 'commonContact' && (
                      <g>
                        <text x={mx + 10} y={my + 6} fontSize="13" style={{ userSelect: 'none' }}>📱</text>
                        <text x={mx + 10} y={my + 19} fontSize="7.5" fill="#d97706" fontWeight="600" style={{ userSelect: 'none' }}>Common Phone</text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Nodes */}
              {visibleNodes.map(node => {
                const r           = nodeR(node.level);
                const borderColor = riskBorder(node.riskLevel);
                const bgColor     = riskBg(node.riskLevel);
                const textColor   = riskTextDark(node.riskLevel);
                const borderW     = node.level === 0 ? 3.5 : node.level === 1 ? 2.5 : 1.8;
                const isSelected  = selectedNode?.id === node.id;
                const riskLabel   = node.isAlertNode ? 'ALERT' : node.riskLevel;

                return (
                  <g key={node.id} data-nodeid={node.id} style={{ cursor: 'pointer' }}
                    onClick={e => handleNodeClick(node, e)}>
                    {/* Selection ring */}
                    {isSelected && (
                      <circle cx={node.x} cy={node.y} r={r + 9} fill="none"
                        stroke="#2A53A0" strokeWidth="2" opacity={0.35} strokeDasharray="5,3" />
                    )}
                    {/* Shadow circle */}
                    <circle cx={node.x} cy={node.y + 2} r={r + 1}
                      fill="#00000012" filter={node.level === 0 ? 'url(#focal-shadow)' : 'url(#node-shadow)'} />
                    {/* White base */}
                    <circle cx={node.x} cy={node.y} r={r} fill="white"
                      stroke={borderColor} strokeWidth={borderW} />
                    {/* Tinted fill */}
                    <circle cx={node.x} cy={node.y} r={r - borderW}
                      fill={bgColor} fillOpacity={node.level === 2 ? 0.5 : 0.7} />
                    {/* Icon */}
                    <text x={node.x} y={node.level === 0 ? node.y - 4 : node.y - 2}
                      textAnchor="middle"
                      fontSize={node.level === 0 ? 18 : node.level === 1 ? 15 : 12}
                      style={{ userSelect: 'none' }}>
                      {node.icon}
                    </text>
                    {/* Risk label */}
                    <text x={node.x} y={node.level === 0 ? node.y + 12 : node.y + 11}
                      textAnchor="middle"
                      fontSize={node.level === 0 ? 8 : node.level === 1 ? 7 : 6.5}
                      fill={textColor} fontWeight="800" style={{ userSelect: 'none' }}>
                      {riskLabel}
                    </text>
                    {/* Name label below node */}
                    <text x={node.x} y={node.y + r + 14}
                      textAnchor="middle"
                      fontSize={node.level === 2 ? 9 : 10.5}
                      fill="#374151" fontWeight="600" style={{ userSelect: 'none' }}>
                      {node.label}
                    </text>
                    {node.subLabel && (
                      <text x={node.x} y={node.y + r + 25}
                        textAnchor="middle"
                        fontSize={node.level === 2 ? 8 : 9}
                        fill="#9ca3af" style={{ userSelect: 'none' }}>
                        {node.subLabel}
                      </text>
                    )}
                    {/* Risk badges */}
                    {node.badges.map((badge, bi) => (
                      <text key={bi}
                        x={node.x + r * 0.7}
                        y={node.y - r * 0.7 + bi * 13}
                        textAnchor="middle"
                        fontSize={badge === 'pep' ? 7.5 : node.level === 0 ? 13 : 11}
                        fontWeight={badge === 'pep' ? '800' : 'normal'}
                        fill={badge === 'pep' ? '#7c3aed' : undefined}
                        style={{ userSelect: 'none' }}>
                        {BADGE_ICONS[badge]}
                      </text>
                    ))}
                  </g>
                );
              })}
            </g>
          </svg>
        )}

        {/* ── Legend Card (bottom-left) ──────────────── */}
        {graphVisible && (
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 z-10 pointer-events-none shadow-md">
            <p className="text-[9.5px] text-gray-400 font-bold uppercase tracking-widest mb-2.5">Legend</p>
            <div className="flex flex-col gap-1.5">
              <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                {LEGEND_NODES.map(l => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded-full border-2 bg-white shadow-sm" style={{ borderColor: l.color }} />
                    <span className="text-[10px] text-gray-600 font-medium">{l.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                {LEGEND_EDGES.map(l => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    {l.dashed ? (
                      <div className="w-6 h-0" style={{ borderTop: `2px dashed ${l.color}` }} />
                    ) : (
                      <svg width="24" height="10" viewBox="0 0 24 10">
                        <defs>
                          <marker id={`leg-arrow-${l.label.replace(/\s/g,'')}`} markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                            <path d="M0,0 L0,5 L5,2.5 z" fill={l.color} />
                          </marker>
                        </defs>
                        <line x1="0" y1="5" x2="18" y2="5"
                          stroke={l.color} strokeWidth="2"
                          markerEnd={`url(#leg-arrow-${l.label.replace(/\s/g,'')})`} />
                      </svg>
                    )}
                    <span className="text-[10px] text-gray-600 font-medium">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Zoom Controls ─────────────────────────── */}
        {graphVisible && (
          <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 z-20">
            {[
              { icon: <ZoomIn className="w-3.5 h-3.5" />,    onClick: () => setScale(s => Math.min(3, s + 0.15)),    title: 'Zoom In' },
              { icon: <ZoomOut className="w-3.5 h-3.5" />,   onClick: () => setScale(s => Math.max(0.25, s - 0.15)), title: 'Zoom Out' },
              { icon: <FitToScreen className="w-3.5 h-3.5" />, onClick: fitToScreen,                                 title: 'Fit to Screen' },
            ].map((btn, i) => (
              <button key={i} onClick={btn.onClick} title={btn.title}
                className="w-8 h-8 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-lg text-gray-600 flex items-center justify-center transition-colors shadow-sm">
                {btn.icon}
              </button>
            ))}
          </div>
        )}

        {/* ── Export Button (top-right) ──────────────── */}
        {graphVisible && (
          <button onClick={exportGraph} title="Export graph as PNG"
            className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-lg px-3 h-8 text-[12px] font-medium text-gray-600 transition-colors shadow-sm">
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 2v8M5 7l3 4 3-4" />
              <path d="M3 13h10" />
            </svg>
            Export
          </button>
        )}

        {/* ═══ Node Detail Panel ═══════════════════════ */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="absolute top-0 right-0 h-full w-[420px] bg-white border-l border-gray-200 shadow-2xl z-30 flex flex-col">

              {/* Panel header */}
              <div className="px-4 py-4 border-b border-gray-100 flex-shrink-0">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 border',
                      selectedNode.riskLevel === 'HIGH' ? 'bg-red-50 border-red-200' :
                      selectedNode.riskLevel === 'MED'  ? 'bg-amber-50 border-amber-200' :
                                                          'bg-green-50 border-green-200'
                    )}>
                      {selectedNode.icon}
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-bold text-sm leading-snug">{selectedNode.label}</h3>
                      <p className="text-gray-400 text-[11px] mt-0.5">{selectedNode.subLabel || selectedNode.entityType}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedNode(null)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors flex-shrink-0 ml-2">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {/* Risk + STR badges */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <span className={cn('inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full',
                    selectedNode.riskLevel === 'HIGH' ? 'bg-red-100 text-red-700' :
                    selectedNode.riskLevel === 'MED'  ? 'bg-amber-100 text-amber-700' :
                                                        'bg-green-100 text-green-700')}>
                    {selectedNode.riskLevel === 'HIGH' ? '🔴' : selectedNode.riskLevel === 'MED' ? '🟠' : '🟢'} {selectedNode.riskLevel} RISK
                  </span>
                  {selectedNode.strFiled && (
                    <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">🔔 STR Filed</span>
                  )}
                  {selectedNode.badges.includes('sanction') && (
                    <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">🚫 Sanctioned</span>
                  )}
                  {selectedNode.badges.includes('pep') && (
                    <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">🏛️ PEP</span>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-100 overflow-x-auto flex-shrink-0 bg-gray-50/60"
                style={{ scrollbarWidth: 'none' }}>
                {NODE_TABS.map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={cn(
                      'px-3 py-2.5 text-[10.5px] font-semibold whitespace-nowrap border-b-2 transition-colors flex-shrink-0',
                      activeTab === tab
                        ? 'text-[#2A53A0] border-[#2A53A0] bg-white'
                        : 'text-gray-400 border-transparent hover:text-gray-600 hover:bg-gray-100'
                    )}>
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="flex-1 overflow-y-auto">

                {activeTab === 'Entity Summary' && (
                  <div className="p-4 space-y-0">
                    {[
                      ['Customer ID',       selectedNode.customerId],
                      ['Entity Type',       selectedNode.entityType],
                      ['Address',           selectedNode.address],
                      ['Email',             selectedNode.email],
                      ['Contact No.',       selectedNode.contact],
                      ['STR Filed',         selectedNode.strFiled ?? '—'],
                      ['Total Txn Amount',  selectedNode.totalTxnAmount],
                      ['Incoming',          selectedNode.incoming],
                      ['Outgoing',          selectedNode.outgoing],
                    ].map(([lbl, val]) => (
                      <div key={lbl} className="flex justify-between items-start py-2.5 border-b border-gray-50 last:border-b-0">
                        <span className="text-gray-400 text-[11.5px] font-medium flex-shrink-0 mr-3">{lbl}</span>
                        <span className={cn('text-[11.5px] font-semibold text-right',
                          lbl === 'Total Txn Amount' || lbl === 'Incoming' || lbl === 'Outgoing'
                            ? 'text-[#2A53A0]' : 'text-gray-800')}>
                          {val}
                        </span>
                      </div>
                    ))}
                    {/* Mini stat cards */}
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {[
                        { label: 'Connections', value: '5',  color: 'bg-blue-50 text-blue-700' },
                        { label: 'Alerts',       value: '3',  color: 'bg-red-50 text-red-700' },
                        { label: 'Watchlists',   value: '2',  color: 'bg-amber-50 text-amber-700' },
                      ].map(s => (
                        <div key={s.label} className={cn('rounded-xl px-2 py-3 text-center', s.color, 'border border-current/10')}>
                          <p className="text-lg font-bold leading-none">{s.value}</p>
                          <p className="text-[9px] font-semibold uppercase tracking-wide mt-1 opacity-70">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'Account' && (
                  <div className="p-4 space-y-0">
                    {[
                      ['Account No.',     'ACC-' + (selectedNode.customerId || '0000').replace('CUST-', '')],
                      ['Account Type',    'Current Account'],
                      ['Branch',          'Mumbai Main Branch'],
                      ['IFSC Code',       'BANK0001234'],
                      ['Account Status',  'Active'],
                      ['Date Opened',     '15 Mar 2019'],
                      ['Last Txn Date',   '28 Mar 2025'],
                      ['Average Balance', '₹42,00,000'],
                    ].map(([lbl, val]) => (
                      <div key={lbl} className="flex justify-between items-start py-2.5 border-b border-gray-50 last:border-b-0">
                        <span className="text-gray-400 text-[11.5px] font-medium flex-shrink-0 mr-3">{lbl}</span>
                        <span className={cn('text-[11.5px] font-semibold text-right',
                          lbl === 'Account Status' ? 'text-green-600' :
                          lbl === 'Average Balance' ? 'text-[#2A53A0]' : 'text-gray-800')}>
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'Risk Indicators' && (
                  <div className="p-4 space-y-2">
                    {RISK_BADGE_LIST.map(ri => {
                      const active = selectedNode.badges.includes(ri.key as BadgeType)
                        || (ri.key === 'str' && !!selectedNode.strFiled);
                      return (
                        <div key={ri.key} className={cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-colors',
                          active ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-100'
                        )}>
                          <span className="text-base flex-shrink-0">{ri.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className={cn('text-[11.5px] font-bold', active ? 'text-red-700' : 'text-gray-500')}>{ri.name}</p>
                            <p className={cn('text-[10.5px] mt-0.5 leading-snug', active ? 'text-red-500' : 'text-gray-400')}>
                              {active ? ri.activeDesc : 'Not flagged'}
                            </p>
                          </div>
                          <span className={cn(
                            'text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0',
                            active ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-400'
                          )}>
                            {active ? 'ACTIVE' : 'CLEAR'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {activeTab === 'Transactions' && (
                  <div className="p-4 space-y-2">
                    {MOCK_TXNS.map((txn, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-gray-900 text-[12px] font-bold">{txn.amount}</span>
                          <span className={cn(
                            'text-[9px] font-bold px-2 py-0.5 rounded-full',
                            txn.alerted ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                          )}>
                            {txn.alerted ? '⚠ ALERTED' : '✓ Normal'}
                          </span>
                        </div>
                        <div className="flex gap-2.5 text-gray-400 text-[11px]">
                          <span className="font-semibold text-gray-500">{txn.type}</span>
                          <span>·</span>
                          <span>{txn.date}</span>
                          <span>·</span>
                          <span className={txn.dir === 'in' ? 'text-green-600' : 'text-red-500'}>
                            {txn.dir === 'in' ? '↙ Incoming' : '↗ Outgoing'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'Alerts' && (
                  <div className="p-4 space-y-2">
                    {MOCK_ALERTS.map((alert, i) => (
                      <div key={i} className="bg-red-50 rounded-xl p-3 border border-red-200">
                        <div className="flex justify-between items-start gap-2 mb-1.5">
                          <span className="text-red-700 text-[11.5px] font-bold leading-snug">{alert.rule}</span>
                          <span className="text-red-400 text-[10px] flex-shrink-0 bg-red-100 px-1.5 py-0.5 rounded-full font-semibold">{alert.date}</span>
                        </div>
                        <p className="text-red-600/80 text-[11px] leading-relaxed">{alert.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'Common Links' && (
                  <div className="p-4">
                    <p className="text-gray-400 text-[11.5px] mb-3">Entities sharing common identifiers with this node:</p>
                    <div className="space-y-2">
                      {MOCK_COMMON_LINKS.map((link, i) => (
                        <div key={i} className="bg-amber-50 rounded-xl p-3 border border-amber-200">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-sm">{link.icon}</span>
                            <span className="text-amber-700 text-[11.5px] font-bold">{link.type}</span>
                          </div>
                          <p className="text-gray-700 text-[11px]">
                            Shared with: <span className="font-semibold text-gray-900">{link.entity}</span>
                          </p>
                          <p className="text-gray-500 text-[11px] mt-0.5 font-mono">{link.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
