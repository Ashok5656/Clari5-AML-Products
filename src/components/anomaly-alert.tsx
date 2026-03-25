import { AlertCircle, Brain, Clock, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";

interface AnomalyAlertProps {
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  timestamp: string;
  confidence: number;
  delay?: number;
}

export function AnomalyAlert({
  severity,
  title,
  description,
  timestamp,
  confidence,
  delay = 0,
}: AnomalyAlertProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const severityConfig = {
    high: {
      bg: "from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20",
      border: "border-red-200 dark:border-red-800",
      text: "text-red-900 dark:text-red-200",
      badge: "bg-red-500",
    },
    medium: {
      bg: "from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20",
      border: "border-amber-200 dark:border-amber-800",
      text: "text-amber-900 dark:text-amber-200",
      badge: "bg-amber-500",
    },
    low: {
      bg: "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-900 dark:text-blue-200",
      badge: "bg-blue-500",
    },
  };

  const config = severityConfig[severity];

  return (
    <motion.div
      className={`rounded-xl bg-gradient-to-br ${config.bg} border ${config.border} p-4 cursor-pointer`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.01 }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          {/* AI Icon */}
          <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-900 shadow-sm flex items-center justify-center">
            <Brain className={`size-5 ${config.text}`} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className={`${config.text}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                {title}
              </h4>
              <Badge className={`${config.badge} text-white text-xs`}>
                {severity.toUpperCase()}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{description}</p>

            {/* Metadata */}
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="size-3" />
                <span>{timestamp}</span>
              </div>
              <div className="flex items-center gap-1">
                <AlertCircle className="size-3" />
                <span>AI Confidence: {confidence}%</span>
              </div>
            </div>

            {/* Expanded Content */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: isExpanded ? "auto" : 0,
                opacity: isExpanded ? 1 : 0,
              }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  Recommended Action: Escalate to senior analyst for immediate review. Pattern matches known fraud vectors.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="default">
                    Investigate Now
                  </Button>
                  <Button size="sm" variant="outline">
                    Dismiss
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Expand Arrow */}
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="size-5 text-gray-400" />
        </motion.div>
      </div>
    </motion.div>
  );
}