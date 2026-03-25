import { Sparkles, TrendingUp, AlertTriangle, Shield, Clock } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function AIInsightsPanel() {
  return (
    <motion.div
      className="rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Gradient Border */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-[1px] rounded-2xl">
        <div className="rounded-2xl bg-white dark:bg-gray-950 p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <Sparkles className="size-6 text-white" />
              </div>
              <div>
                <h2 className="text-gray-900 dark:text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  AI Insights Dashboard
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Real-time compliance monitoring</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Insight Card 1 */}
            <motion.div
              className="relative p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800 overflow-hidden"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="size-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs text-blue-900 dark:text-blue-200">Trend Analysis</span>
                </div>
                <p className="text-2xl text-gray-900 dark:text-white mb-1">+23%</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Anomalies detected this week</p>
              </div>
            </motion.div>

            {/* Insight Card 2 */}
            <motion.div
              className="relative p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800 overflow-hidden"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-xs text-amber-900 dark:text-amber-200">High Priority</span>
                </div>
                <p className="text-2xl text-gray-900 dark:text-white mb-1">18</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Cases awaiting review</p>
              </div>
            </motion.div>

            {/* Insight Card 3 */}
            <motion.div
              className="relative p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 border border-emerald-200 dark:border-emerald-800 overflow-hidden"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="size-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs text-emerald-900 dark:text-emerald-200">AML Score</span>
                </div>
                <p className="text-2xl text-gray-900 dark:text-white mb-1">94.2%</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Compliance accuracy</p>
              </div>
            </motion.div>

            {/* Insight Card 4 */}
            <motion.div
              className="relative p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800 overflow-hidden"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="size-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-xs text-purple-900 dark:text-purple-200">Response Time</span>
                </div>
                <p className="text-2xl text-gray-900 dark:text-white mb-1">2.4m</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Average alert response</p>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 flex flex-wrap gap-2">
            <Button size="sm" className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <AlertTriangle className="size-3.5" />
              Review High-Risk Cases
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <TrendingUp className="size-3.5" />
              Generate Report
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <Sparkles className="size-3.5" />
              Optimize Workflows
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}