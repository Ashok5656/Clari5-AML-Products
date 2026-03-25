import { useState } from "react";
import { SATSidebar } from "./scenario-authoring-tool/sat-sidebar";
import { SATDashboard } from "./scenario-authoring-tool/sat-dashboard";
import { SATWorkspaces } from "./scenario-authoring-tool/sat-workspaces";
import { SATEvents } from "./scenario-authoring-tool/sat-events";
import { SATUDVs } from "./scenario-authoring-tool/sat-udvs";
import { SATPlaceholder } from "./scenario-authoring-tool/sat-placeholder";
import { BreadcrumbNav } from "./breadcrumb-nav";
import {
  Settings,
  Network,
  BarChart2,
  ClipboardCheck,
  FileEdit,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";

import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

interface ScenarioAuthoringToolProps {
  breadcrumbs?: BreadcrumbItem[];
  onBreadcrumbNavigate?: (path: string) => void;
  version?: string;
}

export function ScenarioAuthoringTool({
  breadcrumbs,
  onBreadcrumbNavigate,
  version,
}: ScenarioAuthoringToolProps) {
  const [activeItem, setActiveItem] = useState("sat-dashboard");

  const getPageInfo = () => {
    switch (activeItem) {
      case "sat-dashboard":
        return {
          title: "Scenario Authoring Dashboard",
          description: "Overview of your scenario authoring activities and performance metrics"
        };
      case "sat-workspaces":
        return {
          title: "Workspaces",
          description: "Organize your scenarios into dedicated workspaces"
        };
      case "sat-events":
        return {
          title: "Events",
          description: "Manage system events and triggers"
        };
      case "sat-udvs":
        return {
          title: "User Defined Variables (UDVs)",
          description: "Configure custom variables for scenario logic"
        };
      case "sat-virtual-se":
        return {
          title: "Virtual SE",
          description: "Configure and manage virtual scenario execution environments"
        };
      case "sat-ml-models":
        return {
          title: "ML Models",
          description: "Train and deploy machine learning models for fraud detection"
        };
      case "sat-xvar":
        return {
          title: "xVar",
          description: "Define and manage extended variables for advanced scenario logic"
        };
      case "sat-audit":
        return {
          title: "Audit",
          description: "Track changes and monitor scenario authoring activities"
        };
      case "sat-my-changes":
        return {
          title: "My Changes",
          description: "View and manage your recent scenario modifications"
        };
      case "sat-verification":
        return {
          title: "Verification",
          description: "Test and validate scenarios before deployment"
        };
      case "sat-help":
        return {
          title: "Help & Documentation",
          description: "Get assistance and learn about scenario authoring best practices"
        };
      default:
        return {
          title: "Scenario Authoring Tool",
          description: "Author and configure fraud detection scenarios"
        };
    }
  };

  const renderContent = () => {
    switch (activeItem) {
      case "sat-dashboard":
        return <SATDashboard />;
      case "sat-workspaces":
        return <SATWorkspaces />;
      case "sat-events":
        return <SATEvents />;
      case "sat-udvs":
        return <SATUDVs />;
      case "sat-virtual-se":
        return (
          <SATPlaceholder
            title="Virtual SE"
            description="Configure and manage virtual scenario execution environments"
            icon={Settings}
            hideHeader={true}
          />
        );
      case "sat-ml-models":
        return (
          <SATPlaceholder
            title="ML Models"
            description="Train and deploy machine learning models for fraud detection"
            icon={Network}
            hideHeader={true}
          />
        );
      case "sat-xvar":
        return (
          <SATPlaceholder
            title="xVar"
            description="Define and manage extended variables for advanced scenario logic"
            icon={BarChart2}
            hideHeader={true}
          />
        );
      case "sat-audit":
        return (
          <SATPlaceholder
            title="Audit"
            description="Track changes and monitor scenario authoring activities"
            icon={ClipboardCheck}
            hideHeader={true}
          />
        );
      case "sat-my-changes":
        return (
          <SATPlaceholder
            title="My Changes"
            description="View and manage your recent scenario modifications"
            icon={FileEdit}
            hideHeader={true}
          />
        );
      case "sat-verification":
        return (
          <SATPlaceholder
            title="Verification"
            description="Test and validate scenarios before deployment"
            icon={ShieldCheck}
            hideHeader={true}
          />
        );
      case "sat-help":
        return (
          <SATPlaceholder
            title="Help & Documentation"
            description="Get assistance and learn about scenario authoring best practices"
            icon={HelpCircle}
            hideHeader={true}
          />
        );
      default:
        return <SATDashboard />;
    }
  };

  const pageInfo = getPageInfo();

  return (
    <div className="h-full flex bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* SAT Internal Sidebar (Left Side) */}
      <SATSidebar activeItem={activeItem} onItemSelect={setActiveItem} />

      {/* SAT Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {/* Dynamic Content */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
