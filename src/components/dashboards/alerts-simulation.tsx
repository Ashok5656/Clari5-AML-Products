import { useState, useRef, useEffect } from "react";
  import { 
  Play, 
  Pause, 
  XCircle, 
  FileEdit, 
  Clock, 
  Plus, 
  List, 
  Rocket, 
  BarChart3, 
  Calendar, 
  CheckCircle2, 
  Activity, 
  ArrowRight,
  MoreHorizontal,
  Filter,
  Search,
  Download,
  ChevronDown as ChevronDownLucide,
  PauseCircle,
  PlayCircle,
  StopCircle,
  RefreshCcw,
  Zap,
  Trash2,
  Pencil,
  UserCheck,
  Info,
  Layers,
  Sparkles,
  GitBranch,
  FileText,
  Sliders,
  Code
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { CaretLeft, CaretRight, ChevronDown } from "@carbon/icons-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { cn } from "../ui/utils";
import { CreateSimulation } from "./create-simulation";
import { useSortableData } from "../../hooks/use-sortable-data";
import { SortableHeader } from "../ui/sortable-header";

interface AlertsSimulationProps {
  breadcrumbs?: any[];
  onBreadcrumbNavigate?: (path: string) => void;
}

export function AlertsSimulation({ breadcrumbs, onBreadcrumbNavigate }: AlertsSimulationProps) {
  const homeTabRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("home");
  const [showSimulationResult, setShowSimulationResult] = useState(false);
  const [selectedSimulation, setSelectedSimulation] = useState<any>(null);
  const [allSimsActiveFilter, setAllSimsActiveFilter] = useState("Active Simulations");
  const [isNewSimulationDialogOpen, setIsNewSimulationDialogOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"dashboard" | "create-simulation">("dashboard");
  const [showScenarioDetails, setShowScenarioDetails] = useState(false);

  // Mock Data based on the provided image
  const stats = [
    { label: "Active Simulations", value: 16, change: "+3", desc: "Running, Completed, Scheduled & Queued", icon: Activity, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Paused Simulations", value: 5, change: "+1", desc: "Temporarily suspended simulations", icon: Pause, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Killed Simulations", value: 6, change: "+1", desc: "Terminated or failed simulations", icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
    { label: "Drafted Simulations", value: 10, change: "+2", desc: "Draft & Rejected simulations", icon: FileEdit, color: "text-gray-600", bg: "bg-gray-50" },
    { label: "Pending Simulations", value: 14, change: "+4", desc: "Simulations waiting for approval", icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const quickActions = [
    { title: "New Simulation", desc: "Configure and launch a new transaction analysis simulation", icon: Play, color: "bg-blue-600" },
    { title: "New Scenario", desc: "Design custom scenarios for risk assessment analysis", icon: Plus, color: "bg-purple-600" },
    { title: "Scenario List", desc: "Browse and manage all configured risk assessment scenarios", icon: List, color: "bg-orange-600" },
    { title: "Production Scenario", desc: "Deploy verified scenarios to production environment", icon: Rocket, color: "bg-green-600" },
  ];

  const recentActivity = [
    { 
      id: "SIM-2024-001", 
      status: "Running", 
      progress: 88, 
      name: "High-Value Transaction Threshold", 
      time: "5 minutes ago", 
      details: { processed: "40,017", total: "45,000", elapsed: "02:34:18" },
      type: "Transaction Type",
      duration: "90 days"
    },
    { 
      id: "SIM-2024-002", 
      status: "Completed", 
      name: "ACCNT_DRAINAGE_SBA_01", 
      time: "2 hours ago", 
      type: "Account Type",
      duration: "60 days"
    },
    { 
      id: "SIM-2024-005", 
      status: "Completed", 
      name: "ACCOUNT_STRUCTURED_DEPOSIT_AML_01", 
      time: "5 hours ago", 
      type: "Transaction Type", // inferred
      duration: "30 days" // inferred
    },
    { 
      id: "SIM-2024-010", 
      status: "Completed", 
      name: "ACCT_STATUS_CHANGE_01", 
      time: "8 hours ago", 
      type: "Account Type", // inferred
      duration: "45 days" // inferred
    },
  ];

  const upcomingSimulations = [
    { id: "SIM-2024-009", status: "Scheduled", name: "ACCT_STAT_CHNG_FLWD_X_DRAINAGE_01", date: "Dec 21, 2025", type: "Transaction Type" },
    { id: "SIM-2024-011", status: "Scheduled", name: "ACCT_STATUS_CHANGE_INTU_NEW_01", date: "Dec 22, 2025", type: "Customer Type" },
    { id: "SIM-2024-006", status: "Scheduled", name: "ACCOUNT_TXN_ML_01", date: "Dec 23, 2025", type: "Account Type" },
    { id: "SIM-2024-003", status: "Scheduled", name: "ACCNT_PRCNT_DRAINAGE_CR_DR_01", date: "Dec 24, 2025", type: "Customer Type" },
    { id: "SIM-2024-015", status: "Scheduled", name: "HIGH_RISK_JURISDICTION_TXN_02", date: "Dec 26, 2025", type: "Transaction Type" },
    { id: "SIM-2024-018", status: "Scheduled", name: "STRUCTURING_CASH_DEPOSITS_V3", date: "Dec 27, 2025", type: "Account Type" },
    { id: "SIM-2024-022", status: "Scheduled", name: "RAPID_MOVEMENT_FUNDS_LAYERING", date: "Dec 28, 2025", type: "Transaction Type" },
    { id: "SIM-2024-025", status: "Scheduled", name: "DORMANT_ACCOUNT_REACTIVATION", date: "Dec 29, 2025", type: "Customer Type" },
  ];

  const initialSimulationsData = [
    { 
      id: "SIM-2024-001",  
      name: "High-Value Transaction Threshold", 
      totalTxns: "45.0K", 
      txnsSimulated: "45.0K", 
      txnEndDate: "2025-03-15", 
      type: "Transaction Type", 
      duration: "90 days", 
      elapsed: "02:34:42", 
      progress: 100, 
      status: "Completed",
      version: null
    },
    { 
      id: "SIM-2024-002", 
      name: "ACCNT_DRAINAGE_SBA_01", 
      totalTxns: "35.0K", 
      txnsSimulated: "35.0K", 
      txnEndDate: "2025-02-10", 
      type: "Account Type", 
      duration: "60 days", 
      elapsed: "01:45:22", 
      progress: 100, 
      status: "Completed",
      version: "V2"
    },
    { 
      id: "SIM-2024-003", 
      name: "ACCNT_PRCNT_DRAINAGE_CR_DR_01", 
      totalTxns: "48.0K", 
      txnsSimulated: "18.7K", 
      txnEndDate: "2025-03-20", 
      type: "Customer Type", 
      duration: "120 days", 
      elapsed: "00:00:54", 
      progress: 39, 
      status: "Running",
      version: null
    },
    { 
      id: "SIM-2024-005", 
      name: "ACCOUNT_STRUCTURED_DEPOSIT_AML_01", 
      totalTxns: "42.0K", 
      txnsSimulated: "42.0K", 
      txnEndDate: "2025-02-08", 
      type: "Transaction Type", 
      duration: "90 days", 
      elapsed: "03:12:45", 
      progress: 100, 
      status: "Completed",
      version: null
    },
    { 
      id: "SIM-2024-006", 
      name: "ACCOUNT_TXN_ML_01", 
      totalTxns: "49.0K", 
      txnsSimulated: "—", 
      txnEndDate: "2025-03-18", 
      type: "Account Type", 
      duration: "180 days", 
      elapsed: "00:00:00", 
      progress: 0, 
      status: "Scheduled",
      version: "V3"
    },
    { 
      id: "SIM-2024-008", 
      name: "ACCOUNT_TXN_ML_01", 
      totalTxns: "40.0K", 
      txnsSimulated: "—", 
      txnEndDate: "2025-03-22", 
      type: "Card Type", 
      duration: "100 days", 
      elapsed: "00:00:00", 
      progress: 0, 
      status: "Scheduled",
      version: null
    },
    { 
      id: "SIM-2024-009", 
      name: "ACCT_STAT_CHNG_FLWD_X_DRAIN...", 
      totalTxns: "35.5K", 
      txnsSimulated: "—", 
      txnEndDate: "2025-02-14", 
      type: "Transaction Type", 
      duration: "30 days", 
      elapsed: "00:00:00", 
      progress: 0, 
      status: "Scheduled",
      version: "V2"
    },
    { 
      id: "SIM-2024-010", 
      name: "ACCT_STATUS_CHANGE_01", 
      totalTxns: "25.0K", 
      txnsSimulated: "25.0K", 
      txnEndDate: "2025-02-09", 
      type: "Account Type", 
      duration: "60 days", 
      elapsed: "00:58:41", 
      progress: 100, 
      status: "Completed",
      version: null
    },
    { 
      id: "SIM-2024-011", 
      name: "ACCT_STATUS_CHANGE_INTU_NEW...", 
      totalTxns: "41.0K", 
      txnsSimulated: "—", 
      txnEndDate: "2025-03-17", 
      type: "Customer Type", 
      duration: "90 days", 
      elapsed: "00:00:00", 
      progress: 0, 
      status: "Scheduled",
      version: "V4"
    },
  ];

  const PAUSED_MOCK_DATA = [
    { id: "SIM-2024-004", name: "ACCOUNT_BIDIRECTIONAL_WIRES_A...", totalTxns: "38.0K", txnsSimulated: "11.4K", progress: 30, type: "Card Type", elapsed: "00:45:30", pausedOn: "2025-01-11 14:30", pausedBy: "Ashok Kumar", status: "Paused" },
    { id: "SIM-2024-007", name: "ACCOUNT_STRUCTURED_DEPOSIT_...", totalTxns: "30.0K", txnsSimulated: "18.0K", progress: 60, type: "Customer Type", elapsed: "01:52:19", pausedOn: "2025-01-10 09:15", pausedBy: "Sneha Krishnan", status: "Paused" },
    { id: "SIM-2024-017", name: "ACCOUNT_TXN_ML_01", totalTxns: "44.0K", txnsSimulated: "19.8K", progress: 45, type: "Account Type", elapsed: "01:15:42", pausedOn: "2025-01-09 16:45", pausedBy: "Karthik Subramanian", status: "Paused" },
    { id: "SIM-2024-018", name: "ACCT_STAT_CHNG_FLWD_X_DRAINA...", totalTxns: "34.0K", txnsSimulated: "8.5K", progress: 25, type: "Transaction Type", elapsed: "00:38:22", pausedOn: "2025-01-08 11:20", pausedBy: "Emma Wilson", status: "Paused" },
    { id: "SIM-2024-019", name: "ACCT_STATUS_CHANGE_01", totalTxns: "32.0K", txnsSimulated: "22.4K", progress: 70, type: "Card Type", elapsed: "02:05:18", pausedOn: "2025-01-07 13:55", pausedBy: "Vikram Singh", status: "Paused" },
  ];

  const KILLED_MOCK_DATA = [
    { id: "SIM-2024-020", name: "ACCT_STATUS_CHANGE_INTU_NE...", totalTxns: "45.0K", txnsSimulated: "6.8K", progress: 15, type: "Customer Type", killReason: "Configuration Error Detected", killedOn: "2024-11-06 10:30", killedBy: "Rohan Mehta", status: "Killed" },
    { id: "SIM-2024-021", name: "ACCT_STATUS_CHANGE_INTU_NEW", totalTxns: "48.0K", txnsSimulated: "9.6K", progress: 20, type: "Account Type", killReason: "Insufficient Resources", killedOn: "2024-11-05 15:20", killedBy: "Deepak Kumar", status: "Killed" },
    { id: "SIM-2024-022", name: "High-Value Transaction Threshold", totalTxns: "38.0K", txnsSimulated: "3.8K", progress: 10, type: "Transaction Type", killReason: "User Requested Termination", killedOn: "2024-11-04 08:45", killedBy: "Ashok Kumar", status: "Killed" },
    { id: "SIM-2024-023", name: "ACCNT_DRAINAGE_SBA_01", totalTxns: "42.0K", txnsSimulated: "8.4K", progress: 20, type: "Card Type", killReason: "Data Quality Issues", killedOn: "2024-11-03 14:10", killedBy: "Meera Iyer", status: "Killed" },
    { id: "SIM-2024-024", name: "Behavioral Pattern Analysis", totalTxns: "40.0K", txnsSimulated: "6.0K", progress: 15, type: "Customer Type", killReason: "Duplicate Job Detected", killedOn: "2024-11-02 11:30", killedBy: "Sanjay Desai", status: "Killed" },
    { id: "SIM-2024-025", name: "Cross-Platform Integration Test", totalTxns: "33.0K", txnsSimulated: "5.0K", progress: 15, type: "Account Type", killReason: "System Timeout", killedOn: "2024-11-01 09:50", killedBy: "Pooja Nair", status: "Killed" },
  ];

  const DRAFTED_MOCK_DATA = [
    { id: "SIM-8892", name: "ACCT_STAT_CHNG_FLWD_X_DRAINAGE_01", txnEndDate: "2025-06-30", duration: "90 Days", type: "Transaction Type", createdBy: "Aahana Kapoor", createdOn: "2025-10-03", updatedBy: "Ananya Mahra", updatedOn: "2025-10-05", status: "Drafted" },
    { id: "SIM-8891", name: "ACCT_STATUS_CHANGE_01", txnEndDate: "2025-09-22", duration: "—", type: "Account Type", createdBy: "Ishaan Verma", createdOn: "2025-03-15", updatedBy: "Advik Nair", updatedOn: "2025-03-17", status: "Drafted" },
    { id: "SIM-8890", name: "ACCT_STATUS_CHANGE_INTU_NEW_01", txnEndDate: "2025-08-30", duration: "30 Days", type: "Customer Type", createdBy: "Diya Patel", createdOn: "2025-09-22", updatedBy: "Aaravi Sharma", updatedOn: "2025-09-24", status: "Rejected" },
    { id: "SIM-8889", name: "ACCT_STATUS_CHANGE_INTU_NEW", txnEndDate: "2025-04-30", duration: "60 Days", type: "Card Type", createdBy: "Arjun Reddy", createdOn: "2025-06-10", updatedBy: "Ira Singhania", updatedOn: "2025-06-12", status: "Drafted" },
    { id: "SIM-8888", name: "ACCOUNT_BIDIRECTIONAL_WIRES_AML_01", txnEndDate: "2025-01-30", duration: "—", type: "Account Type", createdBy: "Priya Nair", createdOn: "2025-02-01", updatedBy: "Reyansh Kapoor", updatedOn: "2025-02-03", status: "Drafted" },
    { id: "SIM-8887", name: "ACCOUNT_STRUCTURED_DEPOSIT_AML_01", txnEndDate: "2025-02-28", duration: "90 Days", type: "Transaction Type", createdBy: "Aryan Gupta", createdOn: "2025-08-18", updatedBy: "Kiara Menon", updatedOn: "2025-08-20", status: "Drafted" },
    { id: "SIM-8886", name: "ACCOUNT_TXN_ML_01", txnEndDate: "2025-06-30", duration: "—", type: "Customer Type", createdBy: "Siya Kumar", createdOn: "2025-04-05", updatedBy: "Vivaan Bajaj", updatedOn: "2025-04-07", status: "Rejected" },
    { id: "SIM-8885", name: "ACCT_STAT_CHNG_FLWD_X_DRAINAGE_01", txnEndDate: "2025-05-30", duration: "30 Days", type: "Card Type", createdBy: "Vivaan Singh", createdOn: "2025-11-10", updatedBy: "Navya Malhotra", updatedOn: "2025-11-12", status: "Drafted" },
    { id: "SIM-8884", name: "ACCT_STATUS_CHANGE_01", txnEndDate: "2025-06-30", duration: "20 Days", type: "Account Based", createdBy: "Anika Joshi", createdOn: "2025-07-29", updatedBy: "Shaurya Sethi", updatedOn: "2025-07-31", status: "Drafted" },
    { id: "SIM-8883", name: "ACCT_STATUS_CHANGE_INTU_NEW_01", txnEndDate: "2025-03-30", duration: "—", type: "Account Type", createdBy: "Rohan Khanna", createdOn: "2025-01-12", updatedBy: "Aadhya Gill", updatedOn: "2025-01-14", status: "Rejected" },
  ];

  const PENDING_MOCK_DATA = [
    { id: "SIM-9895", name: "ACCT_STATUS_CHANGE_01", txnEndDate: "2025-05-30", duration: "30 Days", type: "Card Type", createdBy: "Vivaan Singh", createdOn: "2025-11-10", status: "Pending Authorization" },
    { id: "SIM-9902", name: "High-Value Transaction Threshold", txnEndDate: "2025-05-30", duration: "90 Days", type: "Transaction Type", createdBy: "Aahana Kapoor", createdOn: "2025-10-03", status: "Pending Authorization" },
    { id: "SIM-9900", name: "ACCNT_PRCNT_DRAINAGE_CR_DR_01", txnEndDate: "2025-06-30", duration: "30 Days", type: "Customer Type", createdBy: "Diya Patel", createdOn: "2025-09-22", status: "Pending Authorization" },
    { id: "SIM-9897", name: "ACCOUNT_TXN_ML_01", txnEndDate: "2025-02-28", duration: "90 Days", type: "Transaction Type", createdBy: "Aryan Gupta", createdOn: "2025-08-18", status: "Pending Authorization" },
    { id: "SIM-9894", name: "ACCT_STATUS_CHANGE_INTU_NEW_01", txnEndDate: "2025-06-30", duration: "20 Days", type: "Account Type", createdBy: "Anika Joshi", createdOn: "2025-07-29", status: "Pending Authorization" },
    { id: "SIM-9891", name: "CURRENCY_EXCHANGE_ANOMALY_02", txnEndDate: "2025-07-15", duration: "45 Days", type: "Transaction Based", createdBy: "Kabir Malhotra", createdOn: "2025-06-20", status: "Pending Authorization" },
    { id: "SIM-9899", name: "ACCOUNT_BIDIRECTIONAL_WIRES_AML_01", txnEndDate: "2025-04-30", duration: "60 Days", type: "Card Type", createdBy: "Arjun Reddy", createdOn: "2025-06-10", status: "Pending Authorization" },
    { id: "SIM-9892", name: "High-Value Transaction Threshold", txnEndDate: "2025-04-30", duration: "180 Days", type: "Transaction Type", createdBy: "Alisha Sharma", createdOn: "2025-05-07", status: "Pending Authorization" },
    { id: "SIM-9890", name: "DORMANT_ACCOUNT_REACTIVATION_01", txnEndDate: "2025-08-30", duration: "120 Days", type: "Account Based", createdBy: "Myra Desai", createdOn: "2025-04-15", status: "Pending Authorization" },
    { id: "SIM-9886", name: "ACCT STAT CHNG FLWD X DRAINAGE 01", txnEndDate: "2025-06-30", duration: "—", type: "Customer Type", createdBy: "Siva Kumar", createdOn: "2025-04-05", status: "Pending Authorization" },
  ];

  const SCENARIO_LIST_DATA = [
    { name: "High-Value Transaction Threshold", createdBy: "Ashok Kumar", createdOn: "2024-12-01", updatedBy: "Ashok Kumar", updatedOn: "2024-12-05", expiryOn: "2026-12-01", status: "Running in Production" },
    { name: "ACCNT_DRAINAGE_SBA_01", createdBy: "Raj Kumar", createdOn: "2024-11-01", updatedBy: "Priya Singh", updatedOn: "2024-11-15", expiryOn: "2026-11-01", status: "Ready for Production" },
    { name: "ACCNT_PRCNT_DRAINAGE_CR_DR_01", createdBy: "Amit Patel", createdOn: "2024-11-10", updatedBy: "Neha Gupta", updatedOn: "2024-11-20", expiryOn: "2026-11-10", status: "Reject in Production" },
    { name: "ACCOUNT_STRUCTURED_DEPOSIT_AML_01", createdBy: "Vikram Joshi", createdOn: "2024-10-25", updatedBy: "Anjali Rao", updatedOn: "2024-11-05", expiryOn: "2026-10-25", status: "only for Simulation" },
    { name: "ACCT_STATUS_CHANGE_01", createdBy: "Kavya Menon", createdOn: "2024-10-18", updatedBy: "Rohan Desai", updatedOn: "2024-11-02", expiryOn: "2026-10-18", status: "Ready for Production" },
    { name: "ACCT_STATUS_CHANGE_INTU_NEW", createdBy: "Meera Shah", createdOn: "2024-10-12", updatedBy: "Karthik Iyer", updatedOn: "2024-10-28", expiryOn: "2026-10-12", status: "Reject in Production" },
    { name: "AB_HIGH_VAL_CR_GT 1.3MAVG", createdBy: "Aahana Kapoor", createdOn: "2025-10-01", updatedBy: "Ananya Mishra", updatedOn: "2025-10-03", expiryOn: "2026-01-03", status: "only for Simulation" },
    { name: "AB_HIGH_VAL_CR_GT 1.3MAVG_03", createdBy: "Ishaan Verma", createdOn: "2025-10-08", updatedBy: "Advik Nair", updatedOn: "2025-09-15", expiryOn: "2025-12-15", status: "Ready for Production" },
    { name: "ACCNT_DRAINAGE_SBA_03", createdBy: "Diya Patel", createdOn: "2025-10-15", updatedBy: "Aarav Sharma", updatedOn: "2025-09-22", expiryOn: "2026-12-23", status: "Reject in Production" },
    { name: "ACCNT_PRCNT_DRAINAGE_CR_DR_03", createdBy: "Arjun Reddy", createdOn: "2025-10-22", updatedBy: "Ira Singhania", updatedOn: "2025-10-10", expiryOn: "2028-01-10", status: "Ready for Production" },
    { name: "HIGH_RISK_JURISDICTION_TXN_01", createdBy: "Sanya Malhotra", createdOn: "2025-10-25", updatedBy: "Rahul Verma", updatedOn: "2025-11-01", expiryOn: "2028-01-15", status: "Running in Production" },
    { name: "RAPID_MOVEMENT_FUNDS_LAYERING_V2", createdBy: "Zainab Khan", createdOn: "2025-10-28", updatedBy: "Omar Farooq", updatedOn: "2025-11-05", expiryOn: "2028-02-01", status: "only for Simulation" },
  ];

  const [simulations, setSimulations] = useState(initialSimulationsData);

  const handlePause = (id: string) => {
    setSimulations(prev => prev.map(sim => 
      sim.id === id ? { ...sim, status: "Paused" } : sim
    ));
    setAllSimsActiveFilter("Paused Simulations");
  };

  const handleKill = (id: string) => {
    setSimulations(prev => prev.map(sim => 
      sim.id === id ? { ...sim, status: "Killed" } : sim
    ));
    setAllSimsActiveFilter("Killed Simulations");
  };

  const filteredSimulations = simulations.filter(sim => {
    switch (allSimsActiveFilter) {
      case "Active Simulations":
        return ["Running", "Completed", "Scheduled", "Queue", "Queued"].includes(sim.status);
      case "Paused Simulations":
        return sim.status === "Paused";
      case "Killed Simulations":
        return sim.status === "Killed";
      case "Drafted Simulations":
        return sim.status === "Draft";
      case "Pending Simulations":
        return sim.status === "Pending";
      default:
        return true;
    }
  });

  const { items: sortedFilteredSims, requestSort: sortFiltered, sortConfig: filteredConfig } = useSortableData(filteredSimulations);
  const { items: sortedPaused, requestSort: sortPaused, sortConfig: pausedConfig } = useSortableData(PAUSED_MOCK_DATA);
  const { items: sortedKilled, requestSort: sortKilled, sortConfig: killedConfig } = useSortableData(KILLED_MOCK_DATA);
  const { items: sortedDrafted, requestSort: sortDrafted, sortConfig: draftedConfig } = useSortableData(DRAFTED_MOCK_DATA);
  const { items: sortedPending, requestSort: sortPending, sortConfig: pendingConfig } = useSortableData(PENDING_MOCK_DATA);

  if (currentView === "create-simulation") {
    return <CreateSimulation onBack={() => setCurrentView("dashboard")} />;
  }

  return (
    <div className="flex flex-col h-full bg-gray-50/50">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col w-full h-full gap-0">
        <div className="bg-white border-b border-gray-200 px-6 sticky top-0 z-10 shadow-sm shrink-0">
            <TabsList className="bg-transparent h-11 p-0 w-full justify-start gap-6">
              <TabsTrigger 
                 value="home" 
                 className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#2A53A0] data-[state=active]:border-b-2 data-[state=active]:border-t-0 data-[state=active]:border-x-0 data-[state=active]:border-[#2A53A0] rounded-none h-11 px-2 text-sm font-medium text-gray-600 border-b-2 border-t-0 border-x-0 border-transparent transition-all hover:text-[#2A53A0] hover:bg-gray-50 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none flex items-center gap-1.5"
              >
                 Home
              </TabsTrigger>
              <TabsTrigger 
                 value="all-simulations" 
                 className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#2A53A0] data-[state=active]:border-b-2 data-[state=active]:border-t-0 data-[state=active]:border-x-0 data-[state=active]:border-[#2A53A0] rounded-none h-11 px-2 text-sm font-medium text-gray-600 border-b-2 border-t-0 border-x-0 border-transparent transition-all hover:text-[#2A53A0] hover:bg-gray-50 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none flex items-center gap-1.5"
              >
                 All Simulations
              </TabsTrigger>
              <TabsTrigger 
                 value="scenario-list" 
                 className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#2A53A0] data-[state=active]:border-b-2 data-[state=active]:border-t-0 data-[state=active]:border-x-0 data-[state=active]:border-[#2A53A0] rounded-none h-11 px-2 text-sm font-medium text-gray-600 border-b-2 border-t-0 border-x-0 border-transparent transition-all hover:text-[#2A53A0] hover:bg-gray-50 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none flex items-center gap-1.5"
              >
                 Scenario List
              </TabsTrigger>
              <TabsTrigger 
                 value="new-scenario" 
                 className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-[#2A53A0] data-[state=active]:border-b-2 data-[state=active]:border-t-0 data-[state=active]:border-x-0 data-[state=active]:border-[#2A53A0] rounded-none h-11 px-2 text-sm font-medium text-gray-600 border-b-2 border-t-0 border-x-0 border-transparent transition-all hover:text-[#2A53A0] hover:bg-gray-50 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none flex items-center gap-1.5"
              >
                 New Scenario
              </TabsTrigger>
            </TabsList>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden bg-gray-50/30 flex flex-col">
           {/* HOME TAB */}
           <TabsContent value="home" className="mt-0 h-full p-0 focus-visible:outline-none focus-visible:ring-0 relative">
            <div ref={homeTabRef} className="h-full overflow-y-auto p-4 flex flex-col gap-4">
             {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
               {stats.map((stat, i) => (
                  <Card key={i} className="shadow-sm border-gray-200 hover:shadow-md transition-shadow">
                     <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                           <span className="text-sm font-medium text-gray-500">{stat.label}</span>
                           <div className={cn("p-1.5 rounded-md", stat.bg)}>
                              <stat.icon className={cn("size-4", stat.color)} />
                           </div>
                        </div>
                        <div className="flex items-baseline gap-2 mb-1">
                           <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                           <span className="text-xs font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded">{stat.change} vs last week</span>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-tight">{stat.desc}</p>
                     </CardContent>
                  </Card>
               ))}
            </div>

            {/* Quick Actions */}
            <div>
               <h3 className="text-base font-bold text-gray-800 flex items-center gap-2 mb-3">
                  <Rocket className="size-4 text-[#2A53A0]" /> Quick Actions
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickActions.map((action, i) => (
                     <Card 
                        key={i} 
                        className="shadow-sm border-gray-200 hover:border-[#2A53A0]/30 hover:shadow-md transition-all cursor-pointer group"
                        onClick={() => {
                           if (action.title === "New Simulation") {
                              setIsNewSimulationDialogOpen(true);
                           }
                        }}
                     >
                        <CardContent className="p-5 flex flex-col h-full">
                           <div className="flex items-center gap-3 mb-3">
                              <div className={cn("p-2 rounded-lg text-white shadow-sm", action.color)}>
                                 <action.icon className="size-5" />
                              </div>
                              <h4 className="font-bold text-gray-900 text-sm group-hover:text-[#2A53A0] transition-colors">{action.title}</h4>
                           </div>
                           <p className="text-xs text-gray-500 mb-4 flex-1">{action.desc}</p>
                           <div className="flex items-center text-xs font-medium text-[#2A53A0] group-hover:translate-x-1 transition-transform">
                              Get Started <ArrowRight className="size-3 ml-1" />
                           </div>
                        </CardContent>
                     </Card>
                  ))}
               </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
               {/* Recent Activity */}
               <Card className="shadow-sm border-gray-200 h-full">
                  <CardHeader className="pb-3 border-b border-gray-100 flex flex-row items-center justify-between">
                     <div>
                        <CardTitle className="text-base font-bold text-gray-900 flex items-center gap-2">
                           <Activity className="size-4 text-[#2A53A0]" /> Recent Activity
                        </CardTitle>
                        <CardDescription className="text-xs">Latest simulations and their status</CardDescription>
                     </div>
                     <Button variant="outline" size="sm" className="text-xs h-8 border-[#2A53A0] text-[#2A53A0] hover:bg-[#2A53A0]/5 hover:text-[#2A53A0]">View All</Button>
                  </CardHeader>
                  <CardContent className="p-0">
                     <div className="divide-y divide-gray-100">
                        {recentActivity.map((item, i) => (
                           <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
                              <div className="flex justify-between items-start mb-2">
                                 <div className="flex items-center gap-2">
                                    <span className={cn("text-xs font-bold px-2 py-0.5 rounded border", 
                                       item.status === 'Running' ? "bg-blue-50 text-blue-700 border-blue-200" : 
                                       item.status === 'Completed' ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-100 text-gray-700 border-gray-200"
                                    )}>
                                       {item.id}
                                    </span>
                                    <Badge variant="secondary" className={cn("text-[10px] h-5", 
                                       item.status === 'Running' ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                                    )}>{item.status}</Badge>
                                 </div>
                                 {item.status === 'Running' ? (
                                    <div className="relative size-10 flex items-center justify-center">
                                        <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                                          <path className="text-gray-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                          <path className="text-blue-600 drop-shadow-sm" strokeDasharray={`${item.progress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                        </svg>
                                        <span className="absolute text-[10px] font-bold text-blue-700">{item.progress}%</span>
                                    </div>
                                 ) : (
                                    <div className="size-6 bg-green-50 rounded-full flex items-center justify-center border border-green-200">
                                       <CheckCircle2 className="size-3.5 text-green-600" />
                                    </div>
                                 )}
                              </div>
                              
                              <h5 className="text-sm font-bold text-gray-900 mb-1">{item.name}</h5>
                              <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                                 <Clock className="size-3" /> {item.time}
                              </div>

                              {item.status === 'Running' && item.details ? (
                                 <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100 mb-2">
                                    <div className="flex justify-between text-xs mb-1.5">
                                       <span className="text-gray-500">Transactions</span>
                                       <span className="font-mono font-medium text-gray-900">{item.details.processed} <span className="text-gray-400">/ {item.details.total}</span></span>
                                    </div>
                                    <Progress value={item.progress} className="h-1.5 bg-gray-200 mb-2 [&>div]:bg-blue-600" />
                                    <div className="flex justify-between text-[10px] text-gray-400">
                                       <span>Processing...</span>
                                       <span className="font-mono">Time: {item.details.elapsed}</span>
                                    </div>
                                 </div>
                              ) : null}

                              <div className="flex items-center justify-between mt-2">
                                 <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-[10px] font-normal text-gray-600 bg-gray-50 border-gray-200">{item.type}</Badge>
                                    {item.duration && <span className="text-[10px] text-gray-400 flex items-center gap-1"><Calendar className="size-3" /> {item.duration}</span>}
                                 </div>
                                 {item.status === 'Completed' && (
                                    <Button variant="link" size="sm" className="h-auto p-0 text-xs text-blue-600 flex items-center gap-1">
                                       <BarChart3 className="size-3" /> Results
                                    </Button>
                                 )}
                              </div>
                           </div>
                        ))}
                     </div>
                  </CardContent>
               </Card>

               {/* Upcoming */}
               <Card className="shadow-sm border-gray-200 h-full">
                  <CardHeader className="pb-3 border-b border-gray-100 flex flex-row items-center justify-between">
                     <div>
                        <CardTitle className="text-base font-bold text-gray-900 flex items-center gap-2">
                           <Calendar className="size-4 text-orange-500" /> Upcoming
                        </CardTitle>
                        <CardDescription className="text-xs">Scheduled simulations</CardDescription>
                     </div>
                     <Button variant="outline" size="sm" className="text-xs h-8 border-[#2A53A0] text-[#2A53A0] hover:bg-[#2A53A0]/5 hover:text-[#2A53A0]">View Schedule</Button>
                  </CardHeader>
                  <CardContent className="p-0">
                     <div className="flex flex-col divide-y divide-gray-100">
                        {upcomingSimulations.map((item, i) => (
                           <div key={i} className="bg-white p-4 hover:bg-gray-50 transition-colors">
                              <div className="flex items-center justify-between mb-2">
                                 <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-gray-500">{item.id}</span>
                                    <Badge variant="secondary" className="text-[10px] h-4 bg-purple-50 text-purple-700 border border-purple-100">{item.status}</Badge>
                                 </div>
                                 <div className="text-[10px] text-gray-500 flex items-center gap-1.5">
                                    <Calendar className="size-3" /> {item.date}
                                 </div>
                              </div>
                              <div className="flex items-start justify-between gap-4">
                                 <h5 className="text-sm font-bold text-gray-900 line-clamp-1 flex-1" title={item.name}>{item.name}</h5>
                                 <Badge variant="outline" className={cn("text-[10px] font-normal border shrink-0", 
                                    item.type.includes('Transaction') ? "bg-blue-50 text-blue-700 border-blue-100" :
                                    item.type.includes('Customer') ? "bg-pink-50 text-pink-700 border-pink-100" :
                                    "bg-emerald-50 text-emerald-700 border-emerald-100"
                                 )}>{item.type}</Badge>
                              </div>
                           </div>
                        ))}
                     </div>
                  </CardContent>
               </Card>
            </div>
            </div>

         </TabsContent>

         {/* ALL SIMULATIONS TAB */}
         <TabsContent value="all-simulations" className="mt-0 flex-1 flex flex-col focus-visible:outline-none focus-visible:ring-0 overflow-hidden p-4">
            {/* Top Stats/Filters - Carbon Contained Tabs Style */}
            <div className="w-full bg-[#f4f4f4] shrink-0 mb-4 rounded-sm border border-gray-200 overflow-hidden">
               <div className="flex items-center w-full overflow-x-auto no-scrollbar">
                  {[
                     { label: "Active Simulations", count: initialSimulationsData.length },
                     { label: "Paused Simulations", count: PAUSED_MOCK_DATA.length },
                     { label: "Killed Simulations", count: KILLED_MOCK_DATA.length },
                     { label: "Drafted Simulations", count: DRAFTED_MOCK_DATA.length },
                     { label: "Pending Simulations", count: PENDING_MOCK_DATA.length },
                  ].map((item, i) => (
                     <button 
                        key={i}
                        onClick={() => setAllSimsActiveFilter(item.label)}
                        className={cn(
                           "flex-1 flex items-center justify-center gap-2 px-1 h-12 text-sm font-semibold transition-all border-t-2 whitespace-nowrap group",
                           allSimsActiveFilter === item.label 
                              ? "bg-white text-[#2A53A0] border-t-[#2A53A0] border-b-0 shadow-sm relative z-10" 
                              : "bg-transparent text-gray-500 border-t-transparent hover:bg-[#e0e0e0] hover:text-gray-900"
                        )}
                     >
                        <span className="truncate">{item.label}</span>
                        <span className={cn(
                           "text-[10px] px-2 py-0.5 rounded-full font-medium transition-colors shrink-0",
                           allSimsActiveFilter === item.label 
                              ? "bg-[#2A53A0] text-white" 
                              : "bg-gray-200 text-gray-600 group-hover:bg-gray-300"
                        )}>
                           {item.count}
                        </span>
                     </button>
                  ))}
               </div>
            </div>

            <div className="flex flex-col gap-4 flex-1 overflow-hidden">
               {/* Header Controls */}
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
                  <div className="flex items-baseline gap-4">
                     <h2 className="text-xl font-normal text-gray-900">{allSimsActiveFilter}</h2>
                     
                     {allSimsActiveFilter === "Active Simulations" && (
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                           <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-gray-300"></span> Total: <span className="font-bold text-gray-900">16</span></span>
                           <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-blue-500"></span> Running: <span className="font-bold text-gray-900">1</span></span>
                           <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-orange-400"></span> Scheduled: <span className="font-bold text-gray-900">6</span></span>
                           <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-green-500"></span> Completed: <span className="font-bold text-gray-900">5</span></span>
                           <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-purple-500"></span> Queue: <span className="font-bold text-gray-900">2</span></span>
                        </div>
                     )}

                     {allSimsActiveFilter === "Paused Simulations" && (
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                           <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-gray-300"></span> Total: <span className="font-bold text-gray-900">{PAUSED_MOCK_DATA.length}</span></span>
                        </div>
                     )}

                     {allSimsActiveFilter === "Killed Simulations" && (
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                           <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-gray-300"></span> Total: <span className="font-bold text-gray-900">{KILLED_MOCK_DATA.length}</span></span>
                        </div>
                     )}

                     {allSimsActiveFilter === "Drafted Simulations" && (
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                           <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-gray-300"></span> Total: <span className="font-bold text-gray-900">{DRAFTED_MOCK_DATA.length}</span></span>
                           <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-blue-500"></span> Drafted: <span className="font-bold text-gray-900">{DRAFTED_MOCK_DATA.filter(d => d.status === 'Drafted').length}</span></span>
                           <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-red-500"></span> Rejected: <span className="font-bold text-gray-900">{DRAFTED_MOCK_DATA.filter(d => d.status === 'Rejected').length}</span></span>
                        </div>
                     )}

                     {allSimsActiveFilter === "Pending Simulations" && (
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                           <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-gray-300"></span> Total: <span className="font-bold text-gray-900">{PENDING_MOCK_DATA.length}</span></span>
                           <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-orange-400"></span> Pending Auth: <span className="font-bold text-gray-900">{PENDING_MOCK_DATA.length}</span></span>
                        </div>
                     )}
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="flex items-center h-[46px] px-3 bg-white border border-gray-300 rounded-[8px] w-48 focus-within:ring-1 focus-within:ring-[#2A53A0] focus-within:border-[#2A53A0] transition-shadow">
                        <Search className="size-4 text-gray-500" />
                        <input type="text" placeholder="Search..." className="ml-2 text-sm outline-none w-full placeholder:text-gray-400 bg-transparent" />
                     </div>
                     
                     {/* Status Filter Dropdown - Only show for Active and Drafted tabs */}
                     {!["Paused Simulations", "Killed Simulations", "Pending Simulations"].includes(allSimsActiveFilter) && (
                        <div className="relative flex items-center h-[46px] px-3 bg-white border border-gray-300 rounded-[8px] hover:bg-gray-50 transition-colors min-w-[140px]">
                           <select className="bg-transparent text-sm text-gray-700 outline-none cursor-pointer w-full appearance-none pr-6 z-10">
                              <option>All Status</option>
                              {allSimsActiveFilter === "Drafted Simulations" ? (
                                 <>
                                    <option>Drafted</option>
                                    <option>Rejected</option>
                                 </>
                              ) : (
                                 <>
                                    <option>Running</option>
                                    <option>Completed</option>
                                    <option>Scheduled</option>
                                    <option>Paused</option>
                                 </>
                              )}
                           </select>
                           <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-3 text-gray-500" />
                        </div>
                     )}

                     <Button 
                        className="h-[46px] rounded-[8px] bg-[#2A53A0] hover:bg-[#1e3a70] text-white px-6 font-medium text-sm shadow-sm"
                        onClick={() => setIsNewSimulationDialogOpen(true)}
                     >
                        <Plus className="size-4 mr-2" /> New Simulation
                     </Button>
                  </div>
               </div>

               {/* Running Simulation Banner - Carbon Style Tile */}
               {allSimsActiveFilter === "Active Simulations" && (
                 <div className="bg-white border-l-4 border-l-[#2A53A0] border border-gray-200 p-4 flex items-center justify-between gap-4 shadow-sm shrink-0">
                    <div className="flex items-center gap-4 flex-1">
                       <div className="flex flex-col justify-center">
                          <div className="flex items-center gap-2">
                             <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-0.5">SIM-2024-003</span>
                             <span className="text-base font-semibold text-[#2A53A0]">ACCNT_PRCNT_DRAINAGE_CR_DR_01</span>
                          </div>
                       </div>
                       <div className="h-8 w-px bg-gray-300 mx-2"></div>
                       <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2A53A0] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2A53A0]"></span>
                          </span>
                          Running
                       </div>
                    </div>
                    <div className="flex items-center gap-6">
                       <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 uppercase font-medium">Next Run:</span>
                          <span className="text-sm font-medium text-gray-900">SIM-2024-006</span>
                       </div>
                    </div>
                 </div>
               )}

               {/* Main Table - Carbon Data Table Style */ }
               <div className="flex-1 bg-white border border-gray-200 shadow-sm rounded-sm flex flex-col overflow-hidden min-h-0">
                  <div className="overflow-x-auto overflow-y-auto flex-1 relative [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#a8a8a8]">
                     <table className="w-full text-left border-collapse">
                        {allSimsActiveFilter === "Paused Simulations" ? (
                           <>
                             <thead className="sticky top-0 z-10 shadow-sm">
                                <tr className="bg-[#F0F0F0] text-[#161616] h-[48px]">
                                   <th className="pl-4 px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="id" label="Sim ID" sortConfig={pausedConfig} onSort={sortPaused} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="name" label="Scenario Name" sortConfig={pausedConfig} onSort={sortPaused} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle text-left whitespace-nowrap">
                                     <SortableHeader column="totalTxns" label="Total Txns" sortConfig={pausedConfig} onSort={sortPaused} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle text-left whitespace-nowrap">
                                     <SortableHeader column="txnsSimulated" label="Txns Simulated" sortConfig={pausedConfig} onSort={sortPaused} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap w-[140px]">
                                     <SortableHeader column="progress" label="Progress" sortConfig={pausedConfig} onSort={sortPaused} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="type" label="Simulation Type" sortConfig={pausedConfig} onSort={sortPaused} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="elapsed" label="Time Elapsed" sortConfig={pausedConfig} onSort={sortPaused} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="pausedOn" label="Paused On" sortConfig={pausedConfig} onSort={sortPaused} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="pausedBy" label="Paused By" sortConfig={pausedConfig} onSort={sortPaused} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle text-left whitespace-nowrap w-[120px]">Actions</th>
                                </tr>
                             </thead>
                             <tbody>
                                {sortedPaused.map((sim, i) => (
                                   <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors h-[46px]">
                                      <td className="pl-4 px-4 align-middle">
                                         <span className="font-mono text-[15px] text-[#2A53A0] hover:underline cursor-pointer font-normal">{sim.id}</span>
                                      </td>
                                      <td className="px-4 align-middle">
                                         <span className="text-[15px] font-normal text-[#2A53A0] hover:underline cursor-pointer truncate max-w-[200px] block" title={sim.name}>{sim.name}</span>
                                      </td>
                                      <td className="px-4 align-middle text-[15px] text-gray-700 text-left font-mono">{sim.totalTxns}</td>
                                      <td className="px-4 align-middle text-[15px] text-gray-700 text-left font-mono">{sim.txnsSimulated}</td>
                                      <td className="px-4 align-middle">
                                         <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold text-gray-700">{sim.progress}%</span>
                                            <div className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden w-16">
                                               <div className="h-full bg-[#2A53A0]" style={{ width: `${sim.progress}%` }}></div>
                                            </div>
                                         </div>
                                      </td>
                                      <td className="px-4 align-middle">
                                         <Badge variant="outline" className={cn("text-[10px] font-normal border shrink-0", 
                                            sim.type.includes('Card') ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                                            sim.type.includes('Customer') ? "bg-purple-50 text-purple-700 border-purple-200" :
                                            sim.type.includes('Account') ? "bg-green-50 text-green-700 border-green-200" :
                                            "bg-blue-50 text-blue-700 border-blue-200"
                                         )}>{sim.type}</Badge>
                                      </td>
                                      <td className="px-4 align-middle text-[15px] font-mono text-gray-600">{sim.elapsed}</td>
                                      <td className="px-4 align-middle text-[15px] text-gray-600 whitespace-nowrap">{sim.pausedOn}</td>
                                      <td className="px-4 align-middle text-[15px] text-gray-700">{sim.pausedBy}</td>
                                      <td className="px-4 align-middle text-left">
                                         <div className="flex items-center justify-start gap-2">
                                            <button 
                                               className="flex items-center justify-center w-8 h-8 rounded-sm bg-green-500/10 hover:bg-green-500/20 text-green-600 transition-colors" 
                                               title="Resume Simulation"
                                            >
                                               <PlayCircle className="size-4" />
                                            </button>
                                            <button 
                                               className="flex items-center justify-center w-8 h-8 rounded-sm bg-red-500/10 hover:bg-red-500/20 text-red-600 transition-colors" 
                                               title="Kill Simulation"
                                            >
                                               <XCircle className="size-4" />
                                            </button>
                                         </div>
                                      </td>
                                   </tr>
                                ))}
                             </tbody>
                           </>
                        ) : allSimsActiveFilter === "Killed Simulations" ? (
                           <>
                             <thead className="sticky top-0 z-10 shadow-sm">
                                <tr className="bg-[#F0F0F0] text-[#161616] h-[48px]">
                                   <th className="pl-4 px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="id" label="Sim ID" sortConfig={killedConfig} onSort={sortKilled} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="name" label="Scenario Name" sortConfig={killedConfig} onSort={sortKilled} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle text-left whitespace-nowrap">
                                     <SortableHeader column="totalTxns" label="Total Txns" sortConfig={killedConfig} onSort={sortKilled} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle text-left whitespace-nowrap">
                                     <SortableHeader column="txnsSimulated" label="Txns Simulated" sortConfig={killedConfig} onSort={sortKilled} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap w-[140px]">
                                     <SortableHeader column="progress" label="Progress" sortConfig={killedConfig} onSort={sortKilled} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="type" label="Simulation Type" sortConfig={killedConfig} onSort={sortKilled} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="killReason" label="Kill Reason" sortConfig={killedConfig} onSort={sortKilled} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="killedOn" label="Killed On" sortConfig={killedConfig} onSort={sortKilled} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="killedBy" label="Killed By" sortConfig={killedConfig} onSort={sortKilled} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle text-left whitespace-nowrap w-[120px]">Actions</th>
                                </tr>
                             </thead>
                             <tbody>
                                {sortedKilled.map((sim, i) => (
                                   <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors h-[46px]">
                                      <td className="pl-4 px-4 align-middle">
                                         <span className="font-mono text-[15px] text-[#2A53A0] hover:underline cursor-pointer font-normal">{sim.id}</span>
                                      </td>
                                      <td className="px-4 align-middle">
                                         <span className="text-[15px] font-normal text-[#2A53A0] hover:underline cursor-pointer truncate max-w-[200px] block" title={sim.name}>{sim.name}</span>
                                      </td>
                                      <td className="px-4 align-middle text-[15px] text-gray-700 text-left font-mono">{sim.totalTxns}</td>
                                      <td className="px-4 align-middle text-[15px] text-gray-700 text-left font-mono">{sim.txnsSimulated}</td>
                                      <td className="px-4 align-middle">
                                         <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold text-gray-700">{sim.progress}%</span>
                                            <div className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden w-16">
                                               <div className="h-full bg-[#2A53A0]" style={{ width: `${sim.progress}%` }}></div>
                                            </div>
                                         </div>
                                      </td>
                                      <td className="px-4 align-middle">
                                         <Badge variant="outline" className={cn("text-[10px] font-normal border shrink-0", 
                                            sim.type.includes('Card') ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                                            sim.type.includes('Customer') ? "bg-purple-50 text-purple-700 border-purple-200" :
                                            sim.type.includes('Account') ? "bg-green-50 text-green-700 border-green-200" :
                                            "bg-blue-50 text-blue-700 border-blue-200"
                                         )}>{sim.type}</Badge>
                                      </td>
                                      <td className="px-4 align-middle text-[15px] text-gray-600 truncate max-w-[200px]" title={sim.killReason}>{sim.killReason}</td>
                                      <td className="px-4 align-middle text-[15px] text-gray-600 whitespace-nowrap">{sim.killedOn}</td>
                                      <td className="px-4 align-middle text-[15px] text-gray-700">{sim.killedBy}</td>
                                      <td className="px-4 align-middle text-left">
                                         <div className="flex items-center justify-start gap-2">
                                            <button 
                                               className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#3b82f6]/10 hover:bg-[#3b82f6]/20 text-[#3b82f6] transition-colors" 
                                               title="View Details"
                                            >
                                               <Activity className="size-4" />
                                            </button>
                                            <button 
                                               className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#00B6B2]/10 hover:bg-[#00B6B2]/20 text-[#00B6B2] transition-colors" 
                                               title="Download Log"
                                            >
                                               <Download className="size-4" />
                                            </button>
                                            <button 
                                               className="flex items-center justify-center w-8 h-8 rounded-sm bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 transition-colors" 
                                               title="Restart Simulation"
                                            >
                                               <RefreshCcw className="size-4" />
                                            </button>
                                         </div>
                                      </td>
                                   </tr>
                                ))}
                             </tbody>
                           </>
                        ) : allSimsActiveFilter === "Drafted Simulations" ? (
                           <>
                             <thead className="sticky top-0 z-10 shadow-sm">
                                <tr className="bg-[#F0F0F0] text-[#161616] h-[48px]">
                                   <th className="pl-4 px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="id" label="Sim ID" sortConfig={draftedConfig} onSort={sortDrafted} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="name" label="Scenario Name" sortConfig={draftedConfig} onSort={sortDrafted} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="txnEndDate" label="Txn End Date" sortConfig={draftedConfig} onSort={sortDrafted} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="duration" label="Sim Duration" sortConfig={draftedConfig} onSort={sortDrafted} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="type" label="Simulation Type" sortConfig={draftedConfig} onSort={sortDrafted} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="createdBy" label="Created By" sortConfig={draftedConfig} onSort={sortDrafted} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="createdOn" label="Created On" sortConfig={draftedConfig} onSort={sortDrafted} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="updatedBy" label="Updated By" sortConfig={draftedConfig} onSort={sortDrafted} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="updatedOn" label="Updated On" sortConfig={draftedConfig} onSort={sortDrafted} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle text-left whitespace-nowrap">
                                     <SortableHeader column="status" label="Status" sortConfig={draftedConfig} onSort={sortDrafted} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle text-left whitespace-nowrap w-[100px]">Actions</th>
                                </tr>
                             </thead>
                             <tbody>
                                {sortedDrafted.map((sim, i) => (
                                   <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors h-[46px]">
                                      <td className="pl-4 px-4 align-middle">
                                         <span className="font-mono text-[15px] text-[#2A53A0] hover:underline cursor-pointer font-normal">{sim.id}</span>
                                      </td>
                                      <td className="px-4 align-middle">
                                         <span className="text-[15px] font-normal text-[#2A53A0] hover:underline cursor-pointer truncate max-w-[200px] block" title={sim.name}>{sim.name}</span>
                                      </td>
                                      <td className="px-4 align-middle text-[15px] text-gray-700 font-mono">{sim.txnEndDate}</td>
                                      <td className="px-4 align-middle text-[15px] text-gray-600">{sim.duration}</td>
                                      <td className="px-4 align-middle">
                                         <Badge variant="outline" className={cn("text-[10px] font-normal border shrink-0", 
                                            sim.type.includes('Card') ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                                            sim.type.includes('Customer') ? "bg-purple-50 text-purple-700 border-purple-200" :
                                            sim.type.includes('Account') ? "bg-green-50 text-green-700 border-green-200" :
                                            "bg-blue-50 text-blue-700 border-blue-200"
                                         )}>{sim.type}</Badge>
                                      </td>
                                      <td className="px-4 align-middle text-[15px] text-gray-700">{sim.createdBy}</td>
                                      <td className="px-4 align-middle text-[15px] text-gray-600 whitespace-nowrap">{sim.createdOn}</td>
                                      <td className="px-4 align-middle text-[15px] text-gray-700">{sim.updatedBy}</td>
                                      <td className="px-4 align-middle text-[15px] text-gray-600 whitespace-nowrap">{sim.updatedOn}</td>
                                      <td className="px-4 align-middle">
                                          <span className={cn("px-2 py-0.5 rounded text-xs font-medium border",
                                            sim.status === "Rejected" ? "bg-red-50 text-red-600 border-red-200" : "bg-blue-50 text-blue-600 border-blue-200"
                                          )}>
                                            {sim.status}
                                          </span>
                                      </td>
                                      <td className="px-4 align-middle text-left">
                                         <div className="flex items-center justify-start gap-2">
                                            <button 
                                               className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#3b82f6]/10 hover:bg-[#3b82f6]/20 text-[#3b82f6] transition-colors" 
                                               title="Edit Simulation"
                                            >
                                               <Pencil className="size-4" />
                                            </button>
                                            <button 
                                               className="flex items-center justify-center w-8 h-8 rounded-sm bg-red-500/10 hover:bg-red-500/20 text-red-600 transition-colors" 
                                               title="Delete Simulation"
                                            >
                                               <Trash2 className="size-4" />
                                            </button>
                                         </div>
                                      </td>
                                   </tr>
                                ))}
                             </tbody>
                           </>
                        ) : allSimsActiveFilter === "Pending Simulations" ? (
                           <>
                             <thead className="sticky top-0 z-10 shadow-sm">
                                <tr className="bg-[#F0F0F0] text-[#161616] h-[48px]">
                                   <th className="pl-4 px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="id" label="Sim ID" sortConfig={pendingConfig} onSort={sortPending} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="name" label="Scenario Name" sortConfig={pendingConfig} onSort={sortPending} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="txnEndDate" label="Txn End Date" sortConfig={pendingConfig} onSort={sortPending} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="duration" label="Sim Duration" sortConfig={pendingConfig} onSort={sortPending} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="type" label="Simulation Type" sortConfig={pendingConfig} onSort={sortPending} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="createdBy" label="Created By" sortConfig={pendingConfig} onSort={sortPending} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">
                                     <SortableHeader column="createdOn" label="Created On" sortConfig={pendingConfig} onSort={sortPending} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle text-left whitespace-nowrap">
                                     <SortableHeader column="status" label="Status" sortConfig={pendingConfig} onSort={sortPending} />
                                   </th>
                                   <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle text-left whitespace-nowrap w-[100px]">Actions</th>
                                </tr>
                             </thead>
                             <tbody>
                                {sortedPending.map((sim, i) => (
                                   <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors h-[46px]">
                                      <td className="pl-4 px-4 align-middle">
                                         <span className="font-mono text-[15px] text-[#2A53A0] hover:underline cursor-pointer font-normal">{sim.id}</span>
                                      </td>
                                      <td className="px-4 align-middle">
                                         <span className="text-[15px] font-normal text-[#2A53A0] hover:underline cursor-pointer truncate max-w-[200px] block" title={sim.name}>{sim.name}</span>
                                      </td>
                                      <td className="px-4 align-middle text-[15px] text-gray-700 font-mono">{sim.txnEndDate}</td>
                                      <td className="px-4 align-middle text-[15px] text-gray-600">{sim.duration}</td>
                                      <td className="px-4 align-middle">
                                         <Badge variant="outline" className={cn("text-[10px] font-normal border shrink-0", 
                                            sim.type.includes('Card') ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                                            sim.type.includes('Customer') ? "bg-purple-50 text-purple-700 border-purple-200" :
                                            sim.type.includes('Account') ? "bg-green-50 text-green-700 border-green-200" :
                                            "bg-blue-50 text-blue-700 border-blue-200"
                                         )}>{sim.type}</Badge>
                                      </td>
                                      <td className="px-4 align-middle text-[15px] text-gray-700">{sim.createdBy}</td>
                                      <td className="px-4 align-middle text-[15px] text-gray-600 whitespace-nowrap">{sim.createdOn}</td>
                                      <td className="px-4 align-middle">
                                          <span className="px-2 py-0.5 rounded text-xs font-medium border bg-amber-50 text-amber-600 border-amber-200">
                                            {sim.status}
                                          </span>
                                      </td>
                                      <td className="px-4 align-middle text-left">
                                         <div className="flex items-center justify-start gap-2">
                                            <button 
                                               className="flex items-center justify-center w-8 h-8 rounded-sm bg-green-500/10 hover:bg-green-500/20 text-green-600 transition-colors" 
                                               title="Authorize Simulation"
                                            >
                                               <UserCheck className="size-4" />
                                            </button>
                                         </div>
                                      </td>
                                   </tr>
                                ))}
                             </tbody>
                           </>
                        ) : (
                           <>
                        <thead className="sticky top-0 z-10 shadow-sm">
                           <tr className="bg-[#F0F0F0] text-[#161616] h-[48px]">
                              <th className="pl-4 px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">Sim ID</th>
                              <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">Scenario Name</th>
                              <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle text-left whitespace-nowrap">Total Txns</th>
                              <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle text-left whitespace-nowrap">Simulated</th>
                              <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">End Date</th>
                              <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">Type</th>
                              <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">Duration</th>
                              <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">Elapsed</th>
                              <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap w-[140px]">Progress</th>
                              <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle text-left whitespace-nowrap">Status</th>
                              <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle text-left whitespace-nowrap w-[120px]">Actions</th>
                           </tr>
                        </thead>
                        <tbody>
                           {filteredSimulations.length === 0 ? (
                              <tr className="h-[46px]">
                                 <td colSpan={11} className="text-center text-gray-500 text-sm py-8">
                                    No simulations found in this category.
                                 </td>
                              </tr>
                           ) : (
                              filteredSimulations.map((sim, i) => (
                              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors h-[46px]">
                                 <td className="pl-4 px-4 align-middle">
                                    <span className="font-mono text-[15px] text-gray-600 font-normal">{sim.id}</span>
                                 </td>
                                 <td className="px-4 align-middle">
                                    <div className="flex items-center gap-2">
                                       <span className="text-[15px] font-normal text-[#2A53A0] hover:underline hover:text-[#1e3a70] cursor-pointer truncate max-w-[200px]" title={sim.name}>{sim.name}</span>
                                       {sim.version && <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] border border-gray-200">{sim.version}</span>}
                                    </div>
                                 </td>
                                 <td className="px-4 align-middle text-[15px] text-gray-700 text-left font-mono">{sim.totalTxns}</td>
                                 <td className="px-4 align-middle text-[15px] text-gray-700 text-left font-mono">{sim.txnsSimulated}</td>
                                 <td className="px-4 align-middle text-[15px] text-gray-700 font-mono">{sim.txnEndDate}</td>
                                 <td className="px-4 align-middle">
                                    <span className="text-[15px] text-gray-700">{sim.type}</span>
                                 </td>
                                 <td className="px-4 align-middle text-[15px] text-gray-600">{sim.duration}</td>
                                 <td className="px-4 align-middle text-[15px] font-mono text-gray-600">{sim.elapsed}</td>
                                 <td className="px-4 align-middle">
                                    <div className="flex items-center gap-2">
                                       <div className="h-1 flex-1 bg-gray-200 overflow-hidden w-20">
                                          <div className={cn("h-full", 
                                             sim.status === 'Completed' ? "bg-green-600" : 
                                             sim.status === 'Running' ? "bg-[#2A53A0]" : "bg-gray-300"
                                          )} style={{ width: `${sim.progress}%` }}></div>
                                       </div>
                                       <span className="text-[10px] w-8 text-right font-medium text-gray-500">{sim.progress}%</span>
                                    </div>
                                 </td>
                                 <td className="px-4 align-middle">
                                    <div className="flex items-center gap-1.5">
                                       {sim.status === 'Completed' ? <CheckCircle2 className="size-3.5 text-green-700" /> :
                                        sim.status === 'Running' ? <Zap className="size-3.5 text-[#2A53A0] fill-current" /> :
                                        sim.status === 'Paused' ? <PauseCircle className="size-3.5 text-amber-600" /> :
                                        sim.status === 'Killed' ? <XCircle className="size-3.5 text-red-600" /> :
                                        <Clock className="size-3.5 text-gray-400" />
                                       }
                                       <span className={cn("text-[15px]",
                                          sim.status === 'Completed' ? "text-gray-700" :
                                          sim.status === 'Paused' ? "text-amber-700" :
                                          sim.status === 'Killed' ? "text-red-700" :
                                          "text-gray-700"
                                       )}>{sim.status}</span>
                                    </div>
                                 </td>
                                 <td className="px-4 align-middle text-left">
                                    <div className="flex items-center justify-start gap-2">
                                       {sim.status === 'Completed' ? (
                                          <>
                                             <button 
                                                className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#00B6B2]/10 hover:bg-[#00B6B2]/20 text-[#00B6B2] transition-colors" 
                                                title="Download"
                                             >
                                                <Download className="size-4" />
                                             </button>
                                             <button 
                                                className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#3b82f6]/10 hover:bg-[#3b82f6]/20 text-[#3b82f6] transition-colors" 
                                                title="View Simulation Result"
                                                onClick={() => {
                                                   setSelectedSimulation(sim);
                                                   setShowSimulationResult(true);
                                                }}
                                             >
                                                <BarChart3 className="size-4" />
                                             </button>
                                          </>
                                       ) : (sim.status === 'Scheduled' || sim.status === 'Queue' || sim.status === 'Running') ? (
                                          <>
                                             <button 
                                                onClick={() => handlePause(sim.id)} 
                                                className="flex items-center justify-center w-8 h-8 rounded-sm bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 transition-colors" 
                                                title="Pause Simulation"
                                             >
                                                <PauseCircle className="size-4" />
                                             </button>
                                             <button 
                                                onClick={() => handleKill(sim.id)} 
                                                className="flex items-center justify-center w-8 h-8 rounded-sm bg-red-500/10 hover:bg-red-500/20 text-red-600 transition-colors" 
                                                title="Kill Simulation"
                                             >
                                                <XCircle className="size-4" />
                                             </button>
                                          </>
                                       ) : (
                                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-none">
                                             <MoreHorizontal className="size-4" />
                                          </Button>
                                       )}
                                    </div>
                                 </td>
                              </tr>
                           )))}
                        </tbody>
                        </>
                        )}
                     </table>
                  </div>

                  {/* Pagination Footer - Carbon Design System Style */}
                  <div className="bg-white border-t border-[#e0e0e0] h-12 flex items-center justify-between text-base text-[#161616] select-none w-full font-sans">
                     
                     {/* Left Side: Items per page & Range */}
                     <div className="flex items-center h-full">
                        {/* Items per page */}
                        <div className="flex items-center h-full border-r border-[#e0e0e0] px-4">
                           <span className="mr-2 text-[#525252] font-normal hidden sm:block">Items per page:</span>
                           <div className="relative inline-flex items-center cursor-pointer h-full">
                              <select 
                                 className="appearance-none bg-transparent font-medium pr-8 h-12 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2A53A0] border-b border-transparent hover:bg-[#e0e0e0] transition-colors"
                              >
                                 <option value={10}>10</option>
                                 <option value={20}>20</option>
                                 <option value={50}>50</option>
                                 <option value={100}>100</option>
                              </select>
                              <ChevronDown size={16} className="absolute right-2 pointer-events-none text-[#161616]" />
                           </div>
                        </div>

                        {/* Range Text */}
                        <div className="flex items-center h-full px-4">
                           <span className="text-[#525252]">
                              <span className="text-[#161616] font-medium">1–10</span> of <span className="text-[#161616] font-medium">14</span> items
                           </span>
                        </div>
                     </div>

                     {/* Right Side: Navigation */}
                     <div className="flex items-center h-full">
                        {/* Page Select */}
                        <div className="border-l border-[#e0e0e0] h-full flex items-center">
                           <div className="relative h-full inline-flex items-center">
                              <select 
                                 className="appearance-none bg-transparent font-medium pl-4 pr-10 h-12 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2A53A0] border-b border-transparent hover:bg-[#e0e0e0] transition-colors"
                              >
                                 <option value={1}>1</option>
                                 <option value={2}>2</option>
                              </select>
                              <ChevronDown size={16} className="absolute right-3 pointer-events-none text-[#161616]" />
                           </div>
                           <span className="text-[#525252] pr-4 border-r border-[#e0e0e0] h-full flex items-center">of 2 pages</span>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex h-full">
                           <button 
                              className="w-12 h-full flex items-center justify-center hover:bg-[#e0e0e0] disabled:opacity-25 disabled:hover:bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-[#2A53A0] inset-0 text-[#161616]"
                              disabled
                           >
                              <CaretLeft size={20} />
                           </button>
                           <button 
                              className="w-12 h-full flex items-center justify-center border-l border-[#e0e0e0] hover:bg-[#e0e0e0] disabled:opacity-25 disabled:hover:bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-[#2A53A0] text-[#161616]"
                           >
                              <CaretRight size={20} />
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </TabsContent>


         {/* SCENARIO LIST TAB */}
         <TabsContent value="scenario-list" className="mt-0 h-full overflow-y-auto p-4 focus-visible:outline-none focus-visible:ring-0">
            <div className="flex flex-col h-full gap-4">
               {/* Header and Info Banner */}
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <h2 className="text-lg font-bold text-gray-900">List of Scenarios</h2>
                     <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-[#2A53A0] text-xs rounded-full border border-blue-100">
                        <Info className="size-3.5" />
                        <span>Scenarios are available for <strong>90 days</strong> from the Date of Creation.</span>
                     </div>
                  </div>
                  <Button className="h-[40px] rounded-sm bg-[#2A53A0] hover:bg-[#1e3a70] text-white px-4 font-medium text-sm shadow-sm">
                     <Plus className="size-4 mr-2" /> New Scenario
                  </Button>
               </div>

               {/* Table */}
               <div className="flex-1 bg-white border border-gray-200 shadow-sm rounded-sm flex flex-col overflow-hidden min-h-0">
                  <div className="overflow-x-auto overflow-y-auto flex-1 relative [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#a8a8a8]">
                     <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 z-10 shadow-sm">
                           <tr className="bg-[#F0F0F0] text-[#161616] h-[48px]">
                              <th className="pl-4 px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">Scenario Name</th>
                              <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">Created By</th>
                              <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">Created On</th>
                              <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">Updated By</th>
                              <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">Updated On</th>
                              <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">Expiry On</th>
                              <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle whitespace-nowrap">Status</th>
                              <th className="px-4 font-medium text-[15px] text-[#2A53A0] bg-[#F0F0F0] align-middle text-left whitespace-nowrap w-[120px]">Actions</th>
                           </tr>
                        </thead>
                        <tbody>
                           {SCENARIO_LIST_DATA.map((scenario, i) => (
                              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors h-[46px]">
                                 <td className="pl-4 px-4 align-middle">
                                    <span className="text-[15px] font-normal text-[#2A53A0] hover:underline cursor-pointer truncate max-w-[250px] block" title={scenario.name}>
                                       {scenario.name}
                                    </span>
                                 </td>
                                 <td className="px-4 align-middle text-[15px] text-gray-700">{scenario.createdBy}</td>
                                 <td className="px-4 align-middle text-[15px] text-gray-600 whitespace-nowrap">{scenario.createdOn}</td>
                                 <td className="px-4 align-middle text-[15px] text-gray-700">{scenario.updatedBy}</td>
                                 <td className="px-4 align-middle text-[15px] text-gray-600 whitespace-nowrap">{scenario.updatedOn}</td>
                                 <td className="px-4 align-middle text-[15px] text-gray-600 whitespace-nowrap">{scenario.expiryOn}</td>
                                 <td className="px-4 align-middle">
                                    <span className={cn("px-2 py-0.5 rounded text-xs font-medium border whitespace-nowrap",
                                       scenario.status === "Running in Production" ? "bg-blue-50 text-blue-600 border-blue-200" :
                                       scenario.status === "Ready for Production" ? "bg-green-50 text-green-600 border-green-200" :
                                       scenario.status === "Reject in Production" ? "bg-red-50 text-red-600 border-red-200" :
                                       "bg-amber-50 text-amber-600 border-amber-200"
                                    )}>
                                       {scenario.status}
                                    </span>
                                 </td>
                                 <td className="px-4 align-middle text-left">
                                    <div className="flex items-center justify-start gap-2">
                                       <button 
                                          className={cn("flex items-center justify-center w-8 h-8 rounded-sm transition-colors",
                                             scenario.status === "Running in Production" 
                                                ? "bg-gray-100 text-gray-300 cursor-not-allowed" 
                                                : "bg-[#3b82f6]/10 hover:bg-[#3b82f6]/20 text-[#3b82f6]"
                                          )}
                                          title="Edit"
                                          disabled={scenario.status === "Running in Production"}
                                       >
                                          <Pencil className="size-4" />
                                       </button>
                                       <button 
                                          className={cn("flex items-center justify-center w-8 h-8 rounded-sm transition-colors",
                                             scenario.status === "Running in Production"
                                                ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                                                : "bg-green-500/10 hover:bg-green-500/20 text-green-600"
                                          )}
                                          title="Launch"
                                          disabled={scenario.status === "Running in Production"}
                                       >
                                          <Rocket className="size-4" />
                                       </button>
                                       <button 
                                          className={cn("flex items-center justify-center w-8 h-8 rounded-sm transition-colors",
                                             scenario.status === "Running in Production"
                                                ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                                                : "bg-red-500/10 hover:bg-red-500/20 text-red-600"
                                          )}
                                          title="Delete"
                                          disabled={scenario.status === "Running in Production"}
                                       >
                                          <Trash2 className="size-4" />
                                       </button>
                                    </div>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>

                  {/* Pagination Footer - Carbon Design System Style */}
                  <div className="bg-white border-t border-[#e0e0e0] h-12 flex items-center justify-between text-base text-[#161616] select-none w-full font-sans">
                     
                     {/* Left Side: Items per page & Range */}
                     <div className="flex items-center h-full">
                        {/* Items per page */}
                        <div className="flex items-center h-full border-r border-[#e0e0e0] px-4">
                           <span className="mr-2 text-[#525252] font-normal hidden sm:block">Items per page:</span>
                           <div className="relative inline-flex items-center cursor-pointer h-full">
                              <select 
                                 className="appearance-none bg-transparent font-medium pr-8 h-12 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2A53A0] border-b border-transparent hover:bg-[#e0e0e0] transition-colors"
                              >
                                 <option value={10}>10</option>
                                 <option value={20}>20</option>
                                 <option value={50}>50</option>
                                 <option value={100}>100</option>
                              </select>
                              <ChevronDown size={16} className="absolute right-2 pointer-events-none text-[#161616]" />
                           </div>
                        </div>

                        {/* Range Text */}
                        <div className="flex items-center h-full px-4">
                           <span className="text-[#525252]">
                              <span className="text-[#161616] font-medium">1–10</span> of <span className="text-[#161616] font-medium">18</span> items
                           </span>
                        </div>
                     </div>

                     {/* Right Side: Navigation */}
                     <div className="flex items-center h-full">
                        {/* Page Select */}
                        <div className="border-l border-[#e0e0e0] h-full flex items-center">
                           <div className="relative h-full inline-flex items-center">
                              <select 
                                 className="appearance-none bg-transparent font-medium pl-4 pr-10 h-12 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2A53A0] border-b border-transparent hover:bg-[#e0e0e0] transition-colors"
                              >
                                 <option value={1}>1</option>
                                 <option value={2}>2</option>
                              </select>
                              <ChevronDown size={16} className="absolute right-3 pointer-events-none text-[#161616]" />
                           </div>
                           <span className="text-[#525252] pr-4 border-r border-[#e0e0e0] h-full flex items-center">of 2 pages</span>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex h-full">
                           <button 
                              className="w-12 h-full flex items-center justify-center hover:bg-[#e0e0e0] disabled:opacity-25 disabled:hover:bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-[#2A53A0] inset-0 text-[#161616]"
                              disabled
                           >
                              <CaretLeft size={20} />
                           </button>
                           <button 
                              className="w-12 h-full flex items-center justify-center border-l border-[#e0e0e0] hover:bg-[#e0e0e0] disabled:opacity-25 disabled:hover:bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-[#2A53A0] text-[#161616]"
                           >
                              <CaretRight size={20} />
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </TabsContent>


         {/* NEW SCENARIO TAB (Placeholder) */}
         <TabsContent value="new-scenario" className="mt-0 h-full overflow-y-auto p-4 focus-visible:outline-none focus-visible:ring-0">
            <Card className="max-w-4xl mx-auto border-gray-200 shadow-sm mt-8">
               <CardHeader>
                  <CardTitle>Create New Scenario</CardTitle>
                  <CardDescription>Define parameters for a new risk assessment simulation scenario.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Scenario Name</label>
                        <Input placeholder="e.g., HIGH_VALUE_TXN_THRESHOLD_V2" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Type</label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                           <option>Transaction Monitoring</option>
                           <option>Customer Screening</option>
                           <option>Account Profiling</option>
                        </select>
                     </div>
                     <div className="col-span-2 space-y-2">
                        <label className="text-sm font-medium text-gray-700">Description</label>
                        <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Describe the purpose of this simulation scenario..." />
                     </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                     <Button variant="outline">Cancel</Button>
                     <Button className="bg-[#2A53A0] hover:bg-[#1e3a70]">Create Scenario</Button>
                  </div>
               </CardContent>
            </Card>
         </TabsContent>
        </div>

      {/* New Simulation Dialog */}
      <Dialog open={isNewSimulationDialogOpen} onOpenChange={setIsNewSimulationDialogOpen}>
        <DialogContent className="max-w-xl p-0 overflow-hidden gap-0">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle className="text-xl font-semibold text-gray-900">Create New Simulation</DialogTitle>
            <DialogDescription className="text-base text-gray-500">Choose how you want to proceed</DialogDescription>
          </DialogHeader>
          <div className="p-6 space-y-4">
            <div 
               className="group flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer"
               onClick={() => {
                  setIsNewSimulationDialogOpen(false);
                  setCurrentView("create-simulation");
               }}
            >
               <div className="p-3 bg-blue-100 text-blue-600 rounded-lg shrink-0">
                  <Layers className="size-6" />
               </div>
               <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-700">Use Existing Scenario</h3>
                  <p className="text-sm text-gray-500">Select from your scenario library</p>
               </div>
               <ChevronDownLucide className="size-5 text-gray-300 -rotate-90 group-hover:text-blue-400" />
            </div>

            <div className="group flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-green-200 hover:bg-green-50/30 transition-all cursor-pointer">
               <div className="p-3 bg-green-100 text-green-600 rounded-lg shrink-0">
                  <Sparkles className="size-6" />
               </div>
               <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-700">Create New Scenario</h3>
                  <p className="text-sm text-gray-500">Build from scratch with custom settings</p>
               </div>
               <ChevronDownLucide className="size-5 text-gray-300 -rotate-90 group-hover:text-green-400" />
            </div>

            <div className="group flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-purple-200 hover:bg-purple-50/30 transition-all cursor-pointer">
               <div className="p-3 bg-purple-100 text-purple-600 rounded-lg shrink-0">
                  <GitBranch className="size-6" />
               </div>
               <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-700">Create Scenario Version</h3>
                  <p className="text-sm text-gray-500">Modify an existing scenario configuration</p>
               </div>
               <ChevronDownLucide className="size-5 text-gray-300 -rotate-90 group-hover:text-purple-400" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* Simulation Result Dialog - Full Width Modal with Equal Margins */}
      <Dialog open={showSimulationResult} onOpenChange={setShowSimulationResult}>
        <DialogContent className="!max-w-[calc(100vw-5rem)] !w-[calc(100vw-5rem)] !h-[calc(100vh-5rem)] !max-h-[calc(100vh-5rem)] p-0 flex flex-col gap-0 bg-white rounded-lg border shadow-xl [&>button]:hidden focus:outline-none">
             <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0 shadow-sm z-10">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-[#2A53A0] rounded-lg">
                     <BarChart3 className="size-5" />
                  </div>
                  <div>
                     <DialogTitle className="text-lg font-bold text-gray-900">Simulation Results</DialogTitle>
                     <DialogDescription className="text-xs text-gray-500">
                        Detailed analysis for {selectedSimulation?.name || "High-Value Transaction Threshold"}
                     </DialogDescription>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowSimulationResult(false)}>Close</Button>
                  <Button size="sm" className="bg-[#2A53A0] hover:bg-[#1f3d7a]">
                     <Download className="size-4 mr-2" /> Export Report
                  </Button>
               </div>
            </div>
            
            <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6">
               <div className="flex flex-col gap-6 w-full">
                  {/* Top Header Stats */}
                  <div className="flex flex-col gap-4">
                     <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div>
                           <div className="flex items-center gap-2 mb-1">
                              <h2 className="text-base font-bold text-[#2A53A0]">Scenario Name: {selectedSimulation?.name || "High-Value Transaction Threshold"}</h2>
                           </div>
                           <div className="text-xs text-gray-500">SIM ID: {selectedSimulation?.id || "SIM-2024-001"}</div>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 items-center">
                           <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
                              <div className="p-1.5 bg-blue-100 rounded-md text-blue-600">
                                 <UserCheck className="size-4" />
                              </div>
                              <div>
                                 <div className="text-[10px] text-gray-500 uppercase font-semibold">Accounts Monitored</div>
                                 <div className="text-lg font-bold text-gray-900">32,747</div>
                              </div>
                           </div>

                           <div className="flex items-center gap-3 bg-amber-50 px-4 py-2 rounded-lg border border-amber-100">
                              <div className="p-1.5 bg-amber-100 rounded-md text-amber-600">
                                 <Activity className="size-4" />
                              </div>
                              <div>
                                 <div className="text-[10px] text-gray-500 uppercase font-semibold">Total Alerts</div>
                                 <div className="text-lg font-bold text-gray-900">3,833</div>
                              </div>
                           </div>

                           <div className="flex items-center gap-3 bg-green-50 px-4 py-2 rounded-lg border border-green-100">
                              <div className="p-1.5 bg-green-100 rounded-md text-green-600">
                                 <Activity className="size-4" />
                              </div>
                              <div>
                                 <div className="text-[10px] text-gray-500 uppercase font-semibold">Total Transactions</div>
                                 <div className="text-lg font-bold text-gray-900">35,545</div>
                              </div>
                           </div>
                        </div>

                        <div className="flex items-center gap-4">
                           <div className="text-right hidden lg:block">
                              <div className="flex items-center justify-end gap-1 text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded border border-blue-100 mb-1">
                                 <Zap className="size-3" /> Duration: {selectedSimulation?.duration || "90 days"}
                              </div>
                              <div className="text-[10px] text-gray-400 font-mono">2025-10-17 to 2026-01-15</div>
                           </div>
                        </div>
                     </div>

                     {/* Filter Bar with Accordion */}
                     <div className="flex flex-col transition-all">
                        <div className={cn(
                           "flex items-center justify-between bg-white border border-gray-200 p-2 shadow-sm z-10 relative transition-all", 
                           showScenarioDetails ? "rounded-t-lg border-b-0" : "rounded-lg"
                        )}>
                           <div className="flex items-center gap-6 px-2">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                 <Layers className="size-4 text-gray-400" />
                                 <span className="font-bold text-gray-900">4</span> Triggering Events
                              </div>
                              <div className="w-px h-4 bg-gray-200" />
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                 <Activity className="size-4 text-gray-400" />
                                 <span className="font-bold text-gray-900">3</span> Threshold Values
                              </div>
                              <div className="w-px h-4 bg-gray-200" />
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                 <GitBranch className="size-4 text-gray-400" />
                                 <span className="font-bold text-gray-900">2</span> Conditions
                              </div>
                           </div>
                           <div className="text-xs text-gray-500 px-4">
                              This simulation analyzes transaction patterns to detect potential fraudulent activities across all channels.
                           </div>
                           <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-[#2A53A0] hover:text-[#1f3d7a] text-xs h-8"
                              onClick={() => setShowScenarioDetails(!showScenarioDetails)}
                           >
                              {showScenarioDetails ? "Hide Details" : "View Details"} 
                              <ChevronDown className={cn("size-3 ml-1 transition-transform", showScenarioDetails ? "rotate-180" : "")} />
                           </Button>
                        </div>

                        {showScenarioDetails && (
                           <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg p-6 shadow-sm relative z-0 animate-in slide-in-from-top-2 fade-in duration-200">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                 <div className="space-y-6">
                                    <div>
                                       <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                                          <FileText className="size-4 text-gray-500" /> Description
                                       </h4>
                                       <p className="text-sm text-gray-600 leading-relaxed">
                                          Comprehensive liquidity stress testing simulation to evaluate the bank's ability to meet obligations during adverse market conditions. Tests various scenarios including deposit withdrawals and credit line drawdowns.
                                       </p>
                                    </div>

                                    <div>
                                       <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                                          <Activity className="size-4 text-gray-500" /> Triggering Events
                                       </h4>
                                       <div className="flex flex-wrap gap-2">
                                          <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 font-normal shadow-none">Market volatility threshold exceeded</Badge>
                                          <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 font-normal shadow-none">Large deposit withdrawal</Badge>
                                          <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 font-normal shadow-none">Credit rating downgrade</Badge>
                                       </div>
                                    </div>

                                    <div>
                                       <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                                          <Sliders className="size-4 text-gray-500" /> Threshold Values
                                       </h4>
                                       <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm border border-gray-100">
                                          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                             <span className="text-gray-600">Withdrawal Amount Threshold:</span>
                                             <span className="font-mono font-medium text-gray-900">greater than 100000 Number</span>
                                          </div>
                                          <div className="flex justify-between items-center pt-1">
                                             <span className="text-gray-600">Drainage Percentage:</span>
                                             <span className="font-mono font-medium text-gray-900">greater than 60 Percentage</span>
                                          </div>
                                       </div>
                                    </div>
                                 </div>

                                 <div className="space-y-6">
                                    <div>
                                       <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                                          <GitBranch className="size-4 text-gray-500" /> Conditions
                                       </h4>
                                       <div className="space-y-3">
                                          <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-blue-500 border border-gray-100">
                                             <div className="flex items-center gap-2 mb-1">
                                                <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200 h-5 text-[10px] px-1.5 shadow-none">Primary</Badge>
                                                <span className="text-sm font-medium text-gray-900">Large Withdrawal</span>
                                             </div>
                                             <code className="text-xs text-gray-600 font-mono block overflow-x-auto p-1">
                                                greater than txn.withdrawalAmount {'>'} opinions.Withdrawal_Amount_Threshold
                                             </code>
                                          </div>
                                          <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-amber-500 border border-gray-100">
                                             <div className="flex items-center gap-2 mb-1">
                                                <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200 h-5 text-[10px] px-1.5 shadow-none">Percentage</Badge>
                                                <span className="text-sm font-medium text-gray-900">Balance Drainage</span>
                                             </div>
                                             <code className="text-xs text-gray-600 font-mono block overflow-x-auto p-1">
                                                greater than (account.previousBalance - account.currentBalance) / account.previousBalance {'>'} opinions.Drainage_Percentage / 100
                                             </code>
                                          </div>
                                       </div>
                                    </div>

                                    <div>
                                       <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                                          <Code className="size-4 text-gray-500" /> Query Preview
                                       </h4>
                                       <div className="bg-[#0f172a] rounded-lg p-4 overflow-x-auto border border-gray-800">
                                          <pre className="text-[10px] text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">
                                             <span className="text-gray-500">-- Get_Account_Balance_History</span><br/>
                                             <span className="text-purple-400">SELECT</span> balance, txn_date <span className="text-purple-400">FROM</span> account_balance <span className="text-purple-400">WHERE</span> account_id = ? <span className="text-purple-400">ORDER BY</span> txn_date <span className="text-purple-400">DESC LIMIT</span> 60
                                             <br/><br/>
                                             <span className="text-gray-500">-- Get_Withdrawal_Pattern</span><br/>
                                             <span className="text-purple-400">SELECT</span> withdrawal_amount, withdrawal_date <span className="text-purple-400">FROM</span> withdrawals <span className="text-purple-400">WHERE</span> account_id = ? <span className="text-purple-400">AND</span> withdrawal_date {'>='} <span className="text-blue-400">DATE_SUB</span>(<span className="text-blue-400">NOW</span>(), <span className="text-blue-400">INTERVAL</span> 90 <span className="text-blue-400">DAY</span>)
                                          </pre>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        )}
                     </div>

                     {/* Comparison Summary Bar */}
                     <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-x-auto">
                        <div className="font-bold text-gray-900 text-sm whitespace-nowrap border-b md:border-b-0 md:border-r border-gray-100 pb-2 md:pb-0 md:pr-4">Comparison Summary</div>
                        
                        <div className="flex items-center gap-6 md:gap-12 flex-1 justify-between min-w-max">
                           <div className="flex flex-col">
                              <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">Fraud - Detected</span>
                              <div className="flex items-center gap-2 mt-0.5">
                                 <span className="text-lg font-bold text-gray-900">2,316</span>
                                 <span className="text-xs font-medium text-green-600 flex items-center bg-green-50 px-1.5 py-0.5 rounded border border-green-100">
                                    <ArrowUp className="size-3 mr-0.5" /> 10.2%
                                 </span>
                              </div>
                           </div>
                           
                           <div className="flex flex-col">
                              <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">Fraud - Missed</span>
                              <div className="flex items-center gap-2 mt-0.5">
                                 <span className="text-lg font-bold text-gray-900">84</span>
                                 <span className="text-xs font-medium text-green-600 flex items-center bg-green-50 px-1.5 py-0.5 rounded border border-green-100">
                                    <ArrowDown className="size-3 mr-0.5" /> 18.5%
                                 </span>
                              </div>
                           </div>

                           <div className="flex flex-col">
                              <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">False Positive</span>
                              <div className="flex items-center gap-2 mt-0.5">
                                 <span className="text-lg font-bold text-gray-900">470</span>
                                 <span className="text-xs font-medium text-green-600 flex items-center bg-green-50 px-1.5 py-0.5 rounded border border-green-100">
                                    <ArrowDown className="size-3 mr-0.5" /> 15.1%
                                 </span>
                              </div>
                           </div>

                           <div className="flex flex-col">
                              <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">Clean - Correctly Ignored</span>
                              <div className="flex items-center gap-2 mt-0.5">
                                 <span className="text-lg font-bold text-gray-900">20,826</span>
                                 <span className="text-xs font-medium text-green-600 flex items-center bg-green-50 px-1.5 py-0.5 rounded border border-green-100">
                                    <ArrowUp className="size-3 mr-0.5" /> 3.8%
                                 </span>
                              </div>
                           </div>

                           <div className="flex flex-col">
                              <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">New Alert</span>
                              <div className="flex items-center gap-2 mt-0.5">
                                 <span className="text-lg font-bold text-gray-900">356</span>
                                 <span className="text-xs font-medium text-blue-600 flex items-center bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                                    <ArrowUp className="size-3 mr-0.5" /> 28.7%
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>

                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                     {/* Alert Distribution Analysis Chart */}
                     <Card className="shadow-sm border-gray-200">
                        <CardHeader className="pb-2 border-b border-gray-100">
                           <CardTitle className="text-sm font-bold flex items-center gap-2">
                              <BarChart3 className="size-4 text-[#2A53A0]" /> Alert Distribution Analysis
                           </CardTitle>
                           <CardDescription className="text-xs">Transaction type breakdown</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 h-[300px]">
                           <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                 data={[
                                    { name: 'Wire Transfer', value: 931, fill: '#60A5FA' },
                                    { name: 'Cash Deposit', value: 786, fill: '#A78BFA' },
                                    { name: 'International', value: 683, fill: '#F87171' },
                                    { name: 'ATM Withdrawal', value: 579, fill: '#34D399' },
                                    { name: 'Mobile Payment', value: 498, fill: '#FBBF24' },
                                    { name: 'Check Deposit', value: 376, fill: '#2DD4BF' },
                                 ]}
                                 barSize={30}
                              >
                                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                 <XAxis 
                                    dataKey="name" 
                                    tick={{fontSize: 10, fill: '#6b7280'}} 
                                    axisLine={false}
                                    tickLine={false}
                                    interval={0}
                                    angle={-15}
                                    textAnchor="end"
                                    height={50}
                                 />
                                 <YAxis 
                                    tick={{fontSize: 10, fill: '#6b7280'}} 
                                    axisLine={false}
                                    tickLine={false}
                                 />
                                 <Tooltip 
                                    cursor={{fill: 'transparent'}}
                                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                                 />
                                 <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    {[
                                       { name: 'Wire Transfer', value: 931, fill: '#60A5FA' },
                                       { name: 'Cash Deposit', value: 786, fill: '#A78BFA' },
                                       { name: 'International', value: 683, fill: '#F87171' },
                                       { name: 'ATM Withdrawal', value: 579, fill: '#34D399' },
                                       { name: 'Mobile Payment', value: 498, fill: '#FBBF24' },
                                       { name: 'Check Deposit', value: 376, fill: '#2DD4BF' },
                                    ].map((entry, index) => (
                                       <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                 </Bar>
                              </BarChart>
                           </ResponsiveContainer>
                           <div className="flex items-center justify-center gap-4 text-xs text-gray-500 mt-2">
                              <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-[#2A53A0]"></span> Total: 3,833</span>
                              <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-purple-500"></span> Categories: 6</span>
                           </div>
                        </CardContent>
                     </Card>

                     {/* Top Alert Entities Table */}
                     <Card className="shadow-sm border-gray-200 flex flex-col">
                        <CardHeader className="pb-2 border-b border-gray-100 flex flex-row items-center justify-between">
                           <div>
                              <CardTitle className="text-sm font-bold flex items-center gap-2">
                                 <UserCheck className="size-4 text-[#2A53A0]" /> Top Alert Entities
                              </CardTitle>
                              <CardDescription className="text-xs">209 total alerts from 15 entities</CardDescription>
                           </div>
                           <Button variant="outline" size="sm" className="h-7 text-xs border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800">
                              <Download className="size-3 mr-1" /> Export Data
                           </Button>
                        </CardHeader>
                        <CardContent className="p-0 flex-1 overflow-auto">
                           <table className="w-full text-sm">
                              <thead className="bg-[#2A53A0] text-white">
                                 <tr>
                                    <th className="px-4 py-2 text-left font-medium text-xs">Rank</th>
                                    <th className="px-4 py-2 text-left font-medium text-xs">Entity ID</th>
                                    <th className="px-4 py-2 text-left font-medium text-xs">Type</th>
                                    <th className="px-4 py-2 text-left font-medium text-xs">Alerts</th>
                                    <th className="px-4 py-2 text-left font-medium text-xs">Risk Level</th>
                                    <th className="px-4 py-2 text-left font-medium text-xs">Last Alert</th>
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                 {[
                                    { rank: '#1', id: 'ACC-00861', type: 'Personal', alerts: 24, risk: 'High', lastAlert: '2025-11-23 20:35' },
                                    { rank: '#2', id: 'ACC-01982', type: 'Personal', alerts: 22, risk: 'High', lastAlert: '2025-12-27 07:11' },
                                    { rank: '#3', id: 'ACC-00893', type: 'Corporate', alerts: 20, risk: 'Medium', lastAlert: '2025-11-15 14:39' },
                                    { rank: '#4', id: 'ACC-01445', type: 'Business', alerts: 18, risk: 'Medium', lastAlert: '2025-10-29 08:09' },
                                    { rank: '#5', id: 'ACC-14562', type: 'Savings', alerts: 16, risk: 'Low', lastAlert: '2025-10-18 07:00' },
                                    { rank: '#6', id: 'ACC-02341', type: 'Personal', alerts: 15, risk: 'High', lastAlert: '2026-01-03 13:59' },
                                 ].map((row, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50">
                                       <td className="px-4 py-3 text-gray-500">{row.rank}</td>
                                       <td className="px-4 py-3 font-medium text-[#2A53A0]">{row.id}</td>
                                       <td className="px-4 py-3">
                                          <Badge variant="outline" className={cn("text-[10px] font-normal border", 
                                             row.type === 'Corporate' ? "bg-purple-50 text-purple-700 border-purple-100" :
                                             row.type === 'Business' ? "bg-blue-50 text-blue-700 border-blue-100" :
                                             "bg-green-50 text-green-700 border-green-100"
                                          )}>{row.type}</Badge>
                                       </td>
                                       <td className="px-4 py-3 font-bold text-gray-700">{row.alerts}</td>
                                       <td className="px-4 py-3">
                                          <Badge variant="outline" className={cn("text-[10px] font-normal border", 
                                             row.risk === 'High' ? "bg-red-50 text-red-700 border-red-100" :
                                             row.risk === 'Medium' ? "bg-amber-50 text-amber-700 border-amber-100" :
                                             "bg-green-50 text-green-700 border-green-100"
                                          )}>{row.risk}</Badge>
                                       </td>
                                       <td className="px-4 py-3 text-gray-500 text-xs">{row.lastAlert}</td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </CardContent>
                     </Card>
                  </div>

                  {/* Alert Transaction Details Table */}
                  <Card className="shadow-sm border-gray-200">
                     <CardHeader className="pb-2 border-b border-gray-100 flex flex-row items-center justify-between">
                        <div>
                           <CardTitle className="text-sm font-bold flex items-center gap-2">
                              <List className="size-4 text-[#2A53A0]" /> Alert Transaction Details
                           </CardTitle>
                           <CardDescription className="text-xs">25 detailed alert records with comprehensive transaction information</CardDescription>
                        </div>
                        <div className="flex gap-2">
                           <Button variant="outline" size="sm" className="h-7 text-xs border-[#2A53A0] text-[#2A53A0] hover:bg-blue-50">
                              <ArrowRight className="size-3 mr-1 rotate-45" /> Expand View
                           </Button>
                           <Button variant="outline" size="sm" className="h-7 text-xs border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800">
                              <Download className="size-3 mr-1" /> Export Data
                           </Button>
                        </div>
                     </CardHeader>
                     <CardContent className="p-0">
                        <table className="w-full text-sm">
                           <thead className="bg-[#2A53A0] text-white">
                              <tr>
                                 <th className="px-4 py-2 text-left font-medium text-xs w-10"></th>
                                 <th className="px-4 py-2 text-left font-medium text-xs">Alert ID</th>
                                 <th className="px-4 py-2 text-left font-medium text-xs">Entity ID</th>
                                 <th className="px-4 py-2 text-left font-medium text-xs">Alert Generated Time</th>
                                 <th className="px-4 py-2 text-left font-medium text-xs">Entity Type</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-100">
                              {[
                                 { id: 'ALERT-001', entityId: 'ACC-00861', time: '2025-11-11 22:27:09', type: 'Customer' },
                                 { id: 'ALERT-002', entityId: 'ACC-00861', time: '2025-12-14 10:29:51', type: 'Account' },
                                 { id: 'ALERT-003', entityId: 'ACC-01882', time: '2025-12-31 07:20:51', type: 'Card' },
                                 { id: 'ALERT-004', entityId: 'ACC-01982', time: '2025-12-11 15:01:12', type: 'Customer' },
                                 { id: 'ALERT-005', entityId: 'ACC-00893', time: '2026-01-11 16:21:49', type: 'Account' },
                                 { id: 'ALERT-006', entityId: 'ACC-00893', time: '2025-10-24 08:01:58', type: 'Card' },
                                 { id: 'ALERT-007', entityId: 'ACC-01445', time: '2025-12-01 16:30:41', type: 'Customer' },
                              ].map((row, i) => (
                                 <tr key={i} className="hover:bg-gray-50/50">
                                    <td className="px-4 py-3 text-gray-500">
                                       <ChevronDownLucide className="size-4 -rotate-90 text-gray-400" />
                                    </td>
                                    <td className="px-4 py-3 font-medium text-blue-600">{row.id}</td>
                                    <td className="px-4 py-3 text-gray-700">{row.entityId}</td>
                                    <td className="px-4 py-3 text-gray-500 text-xs">{row.time}</td>
                                    <td className="px-4 py-3">
                                       <Badge variant="outline" className={cn("text-[10px] font-normal border", 
                                          row.type === 'Customer' ? "bg-blue-50 text-blue-700 border-blue-100" :
                                          row.type === 'Account' ? "bg-green-50 text-green-700 border-green-100" :
                                          "bg-purple-50 text-purple-700 border-purple-100"
                                       )}>{row.type}</Badge>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </DialogContent>
      </Dialog>
      </Tabs>
    </div>
  );
}
