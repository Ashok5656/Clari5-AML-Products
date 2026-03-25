import { motion } from "motion/react";
import { Settings, FileText, Shield, BarChart3, Search, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface Solution {
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  features: string[];
}

export function SolutionsSection() {
  const solutions: Solution[] = [
    {
      title: "Configuration Management",
      description: "Customize risk parameters, thresholds, and workflow rules to match your compliance requirements.",
      icon: Settings,
      gradient: "from-blue-500 to-cyan-500",
      features: ["Risk Parameters", "User Permissions", "Integration Settings", "Threshold Management"],
    },
    {
      title: "Audit & Compliance",
      description: "Comprehensive audit trails and activity logs for complete regulatory compliance and oversight.",
      icon: FileText,
      gradient: "from-emerald-500 to-teal-500",
      features: ["Activity Logs", "Access Tracking", "Export Reports", "Compliance Snapshots"],
    },
    {
      title: "AML Monitoring",
      description: "Advanced anti-money laundering detection with watchlist screening and risk scoring.",
      icon: Shield,
      gradient: "from-purple-500 to-pink-500",
      features: ["Transaction Monitoring", "Customer Due Diligence", "Watchlist Screening", "Risk Scoring"],
    },
    {
      title: "Analytics & Reports",
      description: "Generate detailed reports and visualize trends with customizable dashboards and queries.",
      icon: BarChart3,
      gradient: "from-orange-500 to-red-500",
      features: ["SAR Reports", "Trend Analysis", "Custom Queries", "Monthly Summaries"],
    },
    {
      title: "Case Investigation",
      description: "Streamlined case management workflow with evidence collection and investigation tools.",
      icon: Search,
      gradient: "from-indigo-500 to-blue-500",
      features: ["Case Management", "Evidence Collection", "Team Collaboration", "Archive Search"],
    },
    {
      title: "AI Workflows",
      description: "Automated classification and pattern detection powered by machine learning algorithms.",
      icon: Sparkles,
      gradient: "from-fuchsia-500 to-purple-500",
      features: ["Auto-Classification", "Pattern Detection", "Risk Predictions", "Rule Optimization"],
    },
  ];

  return (
    <section id="solutions" className="py-20 md:py-32 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            className="text-4xl md:text-5xl text-gray-900 dark:text-white mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Complete Compliance Solutions
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Modular platform designed to scale with your organization's needs
          </motion.p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={index}
                className="group relative rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                {/* Gradient Header */}
                <div className={`h-32 bg-gradient-to-br ${solution.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative h-full flex items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="size-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className="text-gray-900 dark:text-white mb-3"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {solution.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 mb-6">
                    {solution.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button variant="link" className="p-0 h-auto group-hover:gap-2 transition-all">
                    Learn more →
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
