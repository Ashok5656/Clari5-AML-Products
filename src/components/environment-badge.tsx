import { Server } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Badge } from "./ui/badge";

type Environment = "PRODUCTION" | "STAGING" | "DEVELOPMENT" | "UAT";

interface EnvironmentBadgeProps {
  environment?: Environment;
}

export function EnvironmentBadge({ environment = "DEVELOPMENT" }: EnvironmentBadgeProps) {
  const getEnvironmentColor = (env: Environment) => {
    switch (env) {
      case "PRODUCTION":
        return "bg-red-100 text-red-700 border-red-300 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800";
      case "STAGING":
        return "bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-800";
      case "UAT":
        return "bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-800";
      case "DEVELOPMENT":
        return "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
    }
  };

  const getEnvironmentDetails = (env: Environment) => {
    switch (env) {
      case "PRODUCTION":
        return {
          description: "Live production environment",
          warning: "⚠️ All changes affect real data!",
          url: "https://app.clari5.com",
        };
      case "STAGING":
        return {
          description: "Pre-production staging environment",
          warning: "Test thoroughly before promoting to production",
          url: "https://staging.clari5.com",
        };
      case "UAT":
        return {
          description: "User Acceptance Testing environment",
          warning: "For client testing and validation",
          url: "https://uat.clari5.com",
        };
      case "DEVELOPMENT":
        return {
          description: "Development environment",
          warning: "Safe to test new features",
          url: "https://dev.clari5.com",
        };
    }
  };

  const details = getEnvironmentDetails(environment);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Badge
              variant="outline"
              className={`${getEnvironmentColor(environment)} cursor-pointer flex items-center gap-1.5 px-2.5 py-1`}
            >
              <Server className="size-3" />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600 }}>
                {environment}
              </span>
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-1">
            <p className="font-medium">{environment}</p>
            <p className="text-xs text-gray-400">{details.description}</p>
            <p className="text-xs">{details.warning}</p>
            <p className="text-xs text-gray-500 mt-2">{details.url}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}