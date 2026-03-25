import { useState } from "react";
import { Activity, Database, Wifi, Cloud, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";

type HealthStatus = "healthy" | "degraded" | "down";

interface SystemService {
  name: string;
  status: HealthStatus;
  latency?: number;
  uptime?: number;
  icon: React.ComponentType<{ className?: string }>;
}

export function SystemHealth() {
  const [services] = useState<SystemService[]>([
    {
      name: "API Gateway",
      status: "healthy",
      latency: 45,
      uptime: 99.9,
      icon: Wifi,
    },
    {
      name: "Database",
      status: "healthy",
      latency: 12,
      uptime: 99.99,
      icon: Database,
    },
    {
      name: "Screening Service",
      status: "healthy",
      latency: 120,
      uptime: 99.8,
      icon: Cloud,
    },
    {
      name: "Data Sync",
      status: "degraded",
      latency: 250,
      uptime: 98.5,
      icon: Activity,
    },
  ]);

  const overallStatus: HealthStatus = services.some((s) => s.status === "down")
    ? "down"
    : services.some((s) => s.status === "degraded")
    ? "degraded"
    : "healthy";

  const getStatusColor = (status: HealthStatus) => {
    switch (status) {
      case "healthy":
        return "text-emerald-600 dark:text-emerald-400";
      case "degraded":
        return "text-orange-600 dark:text-orange-400";
      case "down":
        return "text-red-600 dark:text-red-400";
    }
  };

  const getStatusIcon = (status: HealthStatus) => {
    switch (status) {
      case "healthy":
        return CheckCircle;
      case "degraded":
        return AlertCircle;
      case "down":
        return XCircle;
    }
  };

  const getStatusBg = (status: HealthStatus) => {
    switch (status) {
      case "healthy":
        return "bg-emerald-50 dark:bg-emerald-950/30";
      case "degraded":
        return "bg-orange-50 dark:bg-orange-950/30";
      case "down":
        return "bg-red-50 dark:bg-red-950/30";
    }
  };

  const OverallIcon = getStatusIcon(overallStatus);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <motion.div
            animate={{
              scale: overallStatus === "healthy" ? 1 : [1, 1.2, 1],
            }}
            transition={{
              repeat: overallStatus === "healthy" ? 0 : Infinity,
              duration: 2,
            }}
          >
            <OverallIcon className={`size-5 ${getStatusColor(overallStatus)}`} />
          </motion.div>
          {overallStatus !== "healthy" && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
              System Health
            </h3>
            <Badge
              variant="outline"
              className={`${getStatusColor(overallStatus)}`}
            >
              {overallStatus.toUpperCase()}
            </Badge>
          </div>

          <div className="space-y-2">
            {services.map((service) => {
              const ServiceIcon = service.icon;
              const StatusIcon = getStatusIcon(service.status);
              return (
                <div
                  key={service.name}
                  className={`p-3 rounded-lg border ${getStatusBg(service.status)} border-gray-200 dark:border-gray-700`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <ServiceIcon className="size-4 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-900 dark:text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {service.name}
                      </span>
                    </div>
                    <StatusIcon className={`size-4 ${getStatusColor(service.status)}`} />
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                    {service.latency && (
                      <span>Latency: {service.latency}ms</span>
                    )}
                    {service.uptime && (
                      <span>Uptime: {service.uptime}%</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
            <button className="text-xs text-[#2A53A0] hover:underline w-full text-center">
              View Detailed Health Dashboard →
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
