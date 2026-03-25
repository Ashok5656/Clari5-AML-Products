import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useState } from "react";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  actions: Array<{ label: string; count?: number }>;
  status?: "active" | "warning" | "inactive";
  delay?: number;
}

export function ModuleCard({
  title,
  description,
  icon: Icon,
  gradient,
  actions,
  status = "active",
  delay = 0,
}: ModuleCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const statusColors = {
    active: "bg-emerald-500",
    warning: "bg-amber-500",
    inactive: "bg-gray-400",
  };

  return (
    <motion.div
      className="group relative rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Gradient Accent */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${gradient}`}></div>

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center`}
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="size-6 text-white" />
            </motion.div>
            <div>
              <h3 className="text-gray-900 dark:text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                {title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
          </div>

          {/* Status Indicator */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className={`w-3 h-3 rounded-full ${statusColors[status]} shadow-lg`}></div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="capitalize">{status}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          {actions.map((action, index) => (
            <motion.div
              key={index}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                variant="ghost"
                className="w-full justify-between group/btn hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span className="text-gray-700 dark:text-gray-300">{action.label}</span>
                {action.count !== undefined && (
                  <Badge variant="secondary" className="ml-2">
                    {action.count}
                  </Badge>
                )}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Footer - appears on hover */}
        <motion.div
          className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? "auto" : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button variant="link" className="p-0 h-auto text-sm">
            View all →
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}