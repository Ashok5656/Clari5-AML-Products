import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, LayoutDashboard } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Module {
  id: string;
  label: string;
  icon: LucideIcon;
  gradient?: string;
}

interface ModuleQuickSwitcherProps {
  modules: Module[];
  currentModule: string;
  onModuleSelect: (moduleId: string) => void;
}

export function ModuleQuickSwitcher({
  modules,
  currentModule,
  onModuleSelect,
}: ModuleQuickSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentModuleData = modules.find((m) => m.id === currentModule);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleModuleSelect = (moduleId: string) => {
    onModuleSelect(moduleId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-[#2A53A0] dark:hover:border-[#6b93e6] transition-all shadow-sm"
      >
        {currentModuleData && (
          <>
            <currentModuleData.icon className="size-4 text-[#2A53A0] dark:text-[#6b93e6]" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {currentModuleData.label}
            </span>
          </>
        )}
        {!currentModuleData && (
          <>
            <LayoutDashboard className="size-4 text-[#2A53A0] dark:text-[#6b93e6]" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Quick Navigate
            </span>
          </>
        )}
        <ChevronDown
          className={`size-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Quick Navigate To
              </div>
              {modules.map((module, index) => {
                const Icon = module.icon;
                const isActive = module.id === currentModule;

                return (
                  <motion.button
                    key={module.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => handleModuleSelect(module.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? "bg-[#2A53A0]/10 dark:bg-[#6b93e6]/10 text-[#2A53A0] dark:text-[#6b93e6]"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <Icon className="size-4 flex-shrink-0" />
                    <span className="text-sm">{module.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2A53A0] dark:bg-[#6b93e6]"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Keyboard Hint */}
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <span className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 font-mono text-xs">
                  ⌘K
                </span>
                <span>to open quick search (coming soon)</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
