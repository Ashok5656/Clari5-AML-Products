import { motion } from "motion/react";
import {
  Brain,
  Shield,
  Zap,
  LineChart,
  Users,
  Lock,
  Sparkles,
  TrendingUp,
} from "lucide-react";

interface FeatureCard {
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  size: "large" | "medium" | "small";
}

export function FeaturesBento() {
  const features: FeatureCard[] = [
    {
      title: "AI-Powered Detection",
      description: "Machine learning algorithms analyze millions of transactions in real-time to identify suspicious patterns and anomalies with 94% accuracy.",
      icon: Brain,
      gradient: "from-blue-500 to-cyan-500",
      size: "large",
    },
    {
      title: "AML Compliance",
      description: "Automated screening against global watchlists and sanctions databases with instant alerts.",
      icon: Shield,
      gradient: "from-purple-500 to-pink-500",
      size: "medium",
    },
    {
      title: "Real-Time Monitoring",
      description: "Continuous surveillance of transactions and customer behavior with instant notifications.",
      icon: Zap,
      gradient: "from-amber-500 to-orange-500",
      size: "medium",
    },
    {
      title: "Predictive Analytics",
      description: "Forecast risk trends and prevent fraud before it happens using advanced AI models.",
      icon: TrendingUp,
      gradient: "from-emerald-500 to-teal-500",
      size: "medium",
    },
    {
      title: "Detailed Reporting",
      description: "Generate comprehensive SAR reports and compliance documentation automatically.",
      icon: LineChart,
      gradient: "from-indigo-500 to-blue-500",
      size: "medium",
    },
    {
      title: "Team Collaboration",
      description: "Role-based access control and workflow management for compliance teams.",
      icon: Users,
      gradient: "from-rose-500 to-red-500",
      size: "small",
    },
    {
      title: "Enterprise Security",
      description: "Bank-grade encryption with biometric authentication and SOC 2 compliance.",
      icon: Lock,
      gradient: "from-violet-500 to-purple-500",
      size: "small",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="size-5 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-600 dark:text-purple-400" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Powerful Features
            </span>
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl text-gray-900 dark:text-white mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Everything You Need for Compliance
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Built for modern financial institutions with enterprise-grade security and AI-powered intelligence.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colSpan =
              feature.size === "large"
                ? "md:col-span-2"
                : feature.size === "medium"
                ? "md:col-span-2"
                : "md:col-span-1";
            const rowSpan = feature.size === "large" ? "md:row-span-2" : "";

            return (
              <motion.div
                key={index}
                className={`group relative rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 transition-all duration-300 p-8 ${colSpan} ${rowSpan}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                {/* Gradient Accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient}`}></div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="size-7 text-white" />
                </div>

                {/* Content */}
                <h3
                  className="text-gray-900 dark:text-white mb-3"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
