import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

interface SATPlaceholderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  hideHeader?: boolean;
}

export function SATPlaceholder({ title, description, icon: Icon, hideHeader }: SATPlaceholderProps) {
  return (
    <div className="space-y-6">
      {!hideHeader && (
        <div>
          <h1 className="text-gray-900 dark:text-white mb-2">{title}</h1>
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-12"
      >
        <div className="flex flex-col items-center justify-center text-center">
          <div className="p-4 rounded-full bg-[#2A53A0]/10 dark:bg-[#6b93e6]/10 mb-4">
            <Icon className="size-12 text-[#2A53A0] dark:text-[#6b93e6]" />
          </div>
          <h2 className="text-gray-900 dark:text-white mb-2">
            {title} Module
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
            {description}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 bg-[#2A53A0] hover:bg-[#1e3a70] text-white rounded-lg shadow-lg transition-colors"
          >
            Get Started
          </motion.button>
        </div>
      </motion.div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Easy to Use", desc: "Intuitive interface for quick setup" },
          { title: "Powerful", desc: "Advanced features for complex scenarios" },
          { title: "Collaborative", desc: "Work together with your team" },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-6"
          >
            <h3 className="text-gray-900 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
