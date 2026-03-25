import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Shield className="size-5 text-white" />
              </div>
              <span className="text-gray-900 dark:text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                ComplianceAI
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              AI-powered fraud detection and AML monitoring for modern financial institutions.
            </p>
            <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>© 2024 ComplianceAI</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Product
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Roadmap</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Company
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Compliance</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>SOC 2 Certified • GDPR Compliant • ISO 27001 • WCAG 2.1 AA</p>
        </div>
      </div>
    </footer>
  );
}
