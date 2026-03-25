import { motion } from "motion/react";
import { Database, Code, Type, Hash, Calendar, ToggleLeft } from "lucide-react";

export function SATUDVs() {
  const udvs = [
    {
      id: 1,
      name: "customer_risk_score",
      type: "Number",
      dataType: "Integer",
      description: "Calculated risk score for customer profile",
      defaultValue: "0",
      used: 15,
    },
    {
      id: 2,
      name: "transaction_velocity_24h",
      type: "Number",
      dataType: "Decimal",
      description: "Number of transactions in last 24 hours",
      defaultValue: "0.0",
      used: 12,
    },
    {
      id: 3,
      name: "is_pep_customer",
      type: "Boolean",
      dataType: "Boolean",
      description: "Politically Exposed Person flag",
      defaultValue: "false",
      used: 8,
    },
    {
      id: 4,
      name: "kyc_verification_date",
      type: "Date",
      dataType: "DateTime",
      description: "Last KYC verification timestamp",
      defaultValue: "null",
      used: 10,
    },
    // Add more UDVs...
  ];

  for (let i = 5; i <= 24; i++) {
    udvs.push({
      id: i,
      name: `custom_variable_${i}`,
      type: ["String", "Number", "Boolean", "Date"][Math.floor(Math.random() * 4)],
      dataType: ["Text", "Integer", "Boolean", "DateTime"][Math.floor(Math.random() * 4)],
      description: `Custom user-defined variable ${i}`,
      defaultValue: "null",
      used: Math.floor(Math.random() * 20),
    });
  }

  const typeIcons: Record<string, any> = {
    String: Type,
    Number: Hash,
    Boolean: ToggleLeft,
    Date: Calendar,
  };

  const typeColors: Record<string, string> = {
    String: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400",
    Number: "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400",
    Boolean: "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400",
    Date: "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-[#2A53A0] hover:bg-[#1e3a70] text-white rounded-lg shadow-lg transition-colors flex items-center gap-2"
        >
          <Code className="size-4" />
          Create UDV
        </motion.button>
      </div>

      {/* UDVs Table */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 tracking-wider">
                  Variable Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 tracking-wider">
                  Data Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 tracking-wider">
                  Default Value
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 tracking-wider">
                  Used In
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {udvs.map((udv, index) => {
                const TypeIcon = typeIcons[udv.type];

                return (
                  <motion.tr
                    key={udv.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-2.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <Database className="size-4 text-[#2A53A0] dark:text-[#6b93e6]" />
                          <span className="text-sm font-mono text-gray-900 dark:text-white">
                            {udv.name}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 ml-6">
                          {udv.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-2.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                          typeColors[udv.type]
                        }`}
                      >
                        <TypeIcon className="size-3" />
                        {udv.type}
                      </span>
                    </td>
                    <td className="px-6 py-2.5">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {udv.dataType}
                      </span>
                    </td>
                    <td className="px-6 py-2.5">
                      <code className="text-xs bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300 px-2 py-1 rounded">
                        {udv.defaultValue}
                      </code>
                    </td>
                    <td className="px-6 py-2.5">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {udv.used} scenario{udv.used !== 1 ? 's' : ''}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
