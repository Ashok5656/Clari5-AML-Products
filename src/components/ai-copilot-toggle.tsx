import { useState } from "react";
import { Sparkles, Brain, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";

export function AICopilotToggle() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState(75);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          title={`AI Copilot ${isEnabled ? "Active" : "Inactive"}`}
        >
          <motion.div
            animate={{
              scale: isEnabled ? [1, 1.1, 1] : 1,
            }}
            transition={{
              repeat: isEnabled ? Infinity : 0,
              duration: 2,
            }}
          >
            <Sparkles
              className={`size-5 ${
                isEnabled
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-400 dark:text-gray-600"
              }`}
            />
          </motion.div>
          {isEnabled && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-purple-600 dark:text-purple-400" />
              <h3 className="font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                AI Copilot
              </h3>
            </div>
            <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
          </div>

          {isEnabled && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="size-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm text-gray-900 dark:text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                    AI Features
                  </span>
                </div>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li>✓ Anomaly Detection</li>
                  <li>✓ Smart Recommendations</li>
                  <li>✓ Pattern Recognition</li>
                  <li>✓ Risk Scoring</li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-700 dark:text-gray-300" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Show Suggestions
                  </label>
                  <Switch
                    checked={showSuggestions}
                    onCheckedChange={setShowSuggestions}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700 dark:text-gray-300" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Confidence Threshold
                    </label>
                    <span className="text-sm text-[#2A53A0] font-medium">
                      {confidenceThreshold}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="95"
                    step="5"
                    value={confidenceThreshold}
                    onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Only show suggestions above this confidence level
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <TrendingUp className="size-3 text-green-600" />
                  <span>AI Learning Mode: Active</span>
                </div>
              </div>
            </motion.div>
          )}

          {!isEnabled && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enable AI Copilot to get intelligent suggestions, anomaly detection, and automated insights.
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
