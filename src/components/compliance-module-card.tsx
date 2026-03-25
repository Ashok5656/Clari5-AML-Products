import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { useState } from "react";

interface ModuleItem {
  label: string;
  count?: number;
  badge?: string;
  icon?: LucideIcon;
  description?: string;
}

interface ComplianceModuleCardProps {
  title: string;
  icon: LucideIcon;
  gradient: string;
  items: ModuleItem[];
  delay?: number;
  defaultExpanded?: boolean;
}

export function ComplianceModuleCard({
  title,
  icon: Icon,
  gradient,
  items,
  delay = 0,
  defaultExpanded = false,
}: ComplianceModuleCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <motion.div
      className="group rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:shadow-purple-500/5 dark:hover:shadow-purple-500/10 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      {/* Header */}
      <div
        className={`relative h-20 bg-gradient-to-br ${gradient} cursor-pointer`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Icon className="size-6 text-white" />
            </div>
            <div>
              <h3 className="text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {title}
              </h3>
              <p className="text-xs text-white/80">{items.length} items</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="size-5 text-white" />
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {items.map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  whileHover={{ y: -2 }}
                  className="group/card"
                >
                  <div className="relative h-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 cursor-pointer">
                    {/* Gradient accent on hover */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200"></div>
                    
                    <div className="relative">
                      {/* Icon and Header */}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {ItemIcon && (
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center group-hover/card:scale-110 transition-transform duration-200">
                              <ItemIcon className="size-4 text-blue-600 dark:text-blue-400" />
                            </div>
                          )}
                        </div>
                        {item.count !== undefined && (
                          <Badge variant="secondary" className="text-xs">
                            {item.count}
                          </Badge>
                        )}
                        {item.badge && (
                          <Badge className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
                            {item.badge}
                          </Badge>
                        )}
                      </div>

                      {/* Label */}
                      <h4 className="text-sm text-gray-900 dark:text-white mb-1 group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition-colors">
                        {item.label}
                      </h4>

                      {/* Description if available */}
                      {item.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                          {item.description}
                        </p>
                      )}

                      {/* Arrow indicator */}
                      <div className="flex items-center justify-end">
                        <ArrowRight className="size-3.5 text-gray-400 group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 group-hover/card:translate-x-1 transition-all duration-200" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}