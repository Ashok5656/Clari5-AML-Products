import { Shield, Bell, Moon, Sun, Fingerprint, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";
import { motion } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export function DashboardHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo & Title */}
          <div className="flex items-center gap-4">
            <motion.div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Shield className="size-5 text-white" />
            </motion.div>
            <div>
              <h1 className="text-gray-900 dark:text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                Compliance Hub
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Fraud Detection & AML Monitoring</p>
            </div>
          </div>

          {/* Right: Security Status & Actions */}
          <div className="flex items-center gap-3">
            {/* Biometric Auth Status */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <motion.div
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Fingerprint className="size-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-sm text-emerald-700 dark:text-emerald-300">Authenticated</span>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Biometric authentication active</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* System Status */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <motion.div
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800"
                    whileHover={{ scale: 1.02 }}
                  >
                    <CheckCircle2 className="size-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm text-blue-700 dark:text-blue-300">All Systems Operational</span>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Security monitoring active • Last check: 2 min ago</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Notifications */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="size-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>3 new alerts</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Theme Toggle */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="transition-transform hover:rotate-12"
                  >
                    {theme === "light" ? (
                      <Moon className="size-5" />
                    ) : (
                      <Sun className="size-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle {theme === "light" ? "dark" : "light"} mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </header>
  );
}