import { Sparkles, TrendingUp, AlertTriangle, Target } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  variant: "default" | "warning" | "success";
}

export function AIPanel() {
  const quickActions: QuickAction[] = [
    { id: "1", label: "Review High-Risk Cases", icon: <AlertTriangle className="size-4" />, variant: "warning" },
    { id: "2", label: "Generate AML Report", icon: <TrendingUp className="size-4" />, variant: "default" },
    { id: "3", label: "Optimize Workflows", icon: <Target className="size-4" />, variant: "success" },
  ];

  return (
    <motion.div
      className="rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1px]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="rounded-2xl bg-white dark:bg-gray-950 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="size-5 text-white" />
            </div>
            <div>
              <h2 className="text-gray-900 dark:text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                AI Insights & Recommendations
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Personalized for Compliance Manager</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Insight Card 1 */}
          <motion.div
            className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="size-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-blue-900 dark:text-blue-200">Trend Alert</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Transaction anomalies up <span className="font-semibold">23%</span> this week
            </p>
          </motion.div>

          {/* Insight Card 2 */}
          <motion.div
            className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400" />
              <span className="text-sm text-amber-900 dark:text-amber-200">Action Required</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-semibold">12 cases</span> awaiting review
            </p>
          </motion.div>

          {/* Insight Card 3 */}
          <motion.div
            className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 border border-emerald-200 dark:border-emerald-800"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Target className="size-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm text-emerald-900 dark:text-emerald-200">Efficiency</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Response time improved by <span className="font-semibold">34%</span>
            </p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action) => (
            <TooltipProvider key={action.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={action.variant === "warning" ? "destructive" : action.variant === "success" ? "default" : "secondary"}
                    size="sm"
                    className="gap-2 transition-all hover:shadow-lg"
                  >
                    {action.icon}
                    {action.label}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>AI-recommended action based on current trends</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </motion.div>
  );
}