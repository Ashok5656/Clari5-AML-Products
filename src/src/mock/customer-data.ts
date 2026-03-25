export const mockCustomers = [
  {
    name: "Rajesh Kumar",
    ucic: "UCO089874637",
    id: "Cust-8829103",
    customerIds: ["Cust-8829103", "Cust-7000362", "Cust-3668338"],
    type: "Individual",
    riskScore: "High",
    riskLevel: 90,
    pepMatch: "YES",
    adverseMedia: "YES",
    cddEddTriggers: "YES",
    dormantAccounts: "NO",
    highRiskTransactions: { count: 3, countries: ["Iran", "North Korea", "Syria"] },
    strSarFiled: "YES",
    ctrFiled: "NO",
    leaRequests: "NO",
    activeAlerts: 4,
    status: "Active",
    kycStatus: "Verified",
    nationality: "Indian",
    dob: "15-08-1982",
    occupation: "Business Owner",
    employer: "Kumar Global Traders",
    phone: "9876543210",
    email: "rajesh.k@gmail.com",
    address: { line1: "Flat 402, Krishna Heights", city: "Mumbai", zip: "400049" },
    previousNames: "Raj V. Kumar",
    placeOfBirth: "Mumbai, Maharashtra",
    gender: "Male",
    multipleCitizenships: ["United States"],
    residentStatus: "Resident",
    primaryAddress: "Flat 402, Krishna Heights, Bandra West, Mumbai - 400050",
    secondaryAddresses: ["Villa 22, Palm Jumeirah, Dubai, UAE"],
    businessSegment: "Retail Banking",
    customerSegment: ["HNI", "High Risk"],
    onboardingDate: "12-03-2018",
    onboardingChannel: "Branch",
    channelUsage: { branch: "15%", digital: "80%", agent: "5%" },
    idInfo: { 
      emiratesId: { type: "Emirates ID", number: "784-1990-1234567-1" },
      passport: { type: "Passport", number: "Z1234567", expiry: "2030-05-20", issuedBy: "Govt of India" }
    },
    fatcaStatus: "Reportable (US Indicia)",
    leaStatus: "Non-Reportable",
    identification: [
      { type: "Emirates ID", number: "784-1990-1234567-1", status: "Verified" }
    ],
    relationships: {
      ubo: [
        { name: "Suman Kumar", designation: "Shareholder", nationality: "Indian", residence: "Mumbai", ownership: 55, votingRights: 55 }
      ],
      family: [
        { name: "Suman Kumar", relation: "Spouse", dob: "1985-05-12", hasAccount: true, kycStatus: "Verified" },
        { name: "Arjun Kumar", relation: "Son", dob: "2010-08-20", hasAccount: true, kycStatus: "Verified" }
      ],
      associates: [
        { name: "Mehul Choksi", relation: "Business Partner", hasAccount: false, risk: "High" },
        { name: "Global Exports Ltd", relation: "Subsidiary", hasAccount: true, risk: "Medium" }
      ],
      jointHolders: [
        { name: "Suman Kumar", account: "ACC-9921", relation: "Spouse", hasAccount: true }
      ],
      poa: [
        { name: "Vikram Legal Services", authorizedPerson: "Vikram Singh", expiry: "2030-12-31", revocationHistory: "None" }
      ],
      pep: {
        isPep: true,
        details: "Associate of PEP (Business Partner Mehul Choksi is politically connected)"
      }
    },
    screening: {
      overallStatus: "Flagged",
      sanctions: [
        { list: "OFAC Specially Designated Nationals (SDN)", score: 95, date: "2026-01-02", name: "Rajesh Kumar", watchlist: "OFAC SDN", percentage: 95, link: "#" },
        { list: "UN Consolidated List", score: 88, date: "2025-12-15", name: "Raj V. Kumar", watchlist: "UN Sanctions", percentage: 88, link: "#" }
      ],
      pep: { 
        status: "Potential", 
        details: "Associate of PEP",
        matches: [
          { name: "Rajesh Kumar", watchlist: "WorldCheck PEP", percentage: 100, details: "Close associate of regional politician", link: "#" }
        ]
      },
      adverseMedia: [
        { source: "Economic Times", date: "2025-11-20", snippet: "Named in trade violation investigation related to export controls.", name: "Rajesh Kumar", watchlist: "Global Media Check", percentage: 90, link: "#" }
      ],
      watchlistMatches: [
        { list: "Internal High Risk List", percentage: 100, name: "Rajesh Kumar", watchlist: "Internal Blacklist", falsePositive: false, resolution: "Confirmed Match - Enhanced Due Diligence required", link: "#" }
      ],
      history: [
        { date: "2026-01-05", watchlists: "OFAC, UN, EU", caseId: "CS-9921" },
        { date: "2025-12-01", watchlists: "Global PEP, Adverse Media", caseId: "CS-8812" },
        { date: "2025-11-01", watchlists: "All Lists", caseId: "CS-7734" },
        { date: "2025-10-05", watchlists: "OFAC Only", caseId: "CS-6621" },
        { date: "2025-09-01", watchlists: "All Lists", caseId: "CS-5519" }
      ]
    },
    riskProfile: {
      overall: { score: 90, level: "High", lastUpdated: "2026-01-04" },
      geographic: {
        riskLevel: "Medium",
        score: 45,
        residence: { country: "India", fatfBlack: "N", fatfGrey: "N", taxEvasion: "N", otherHighRisk: "N" },
        citizenship: { country: "USA", fatfBlack: "N", fatfGrey: "N", taxEvasion: "N", otherHighRisk: "N" }
      },
      highRiskTxnCountries: [
        { country: "UAE", fatfBlack: "N", fatfGrey: "Y", taxEvasion: "N", otherHighRisk: "N", details: "Frequent transfers" }
      ],
      productChannelRisk: [
         { type: "Product", name: "Savings Max", risk: "Low" },
         { type: "Service", name: "International Wire", risk: "High" },
         { type: "Channel", name: "Mobile App", risk: "Medium" }
      ],
      customerTypeRisk: { type: "HNI Individual", risk: "Medium" },
      occupationRisk: { isHighRisk: "N", value: "Business Owner - Retail" },
      industryRisk: { isHighRisk: "Y", sector: "Import/Export", details: "High value goods trade" },
      behavioral: {
         score: 75,
         level: "High",
         alerts: [
            { name: "Out of peer profile transactions", deviation: 45, details: "Volume 45% higher than peer group avg" },
            { name: "Transactions surge", deviation: 120, details: "120% surge from 6-month historical avg" }
         ]
      },
      relatedPartiesRisk: { score: 65, level: "Medium" },
      history: [
         { date: "2026-01-04", score: 85, level: "High", reason: "Behavioral Alert Triggered" },
         { date: "2025-06-15", score: 45, level: "Medium", reason: "Periodic Review" },
         { date: "2018-03-12", score: 10, level: "Low", reason: "Onboarding" }
      ],
      overrides: [
         { date: "2025-12-20", user: "Risk_Manager_01", justification: "Downgraded due to verified source of funds proof provided by client." }
      ]
    },
    kycProfile: {
      status: "Verified",
      lastReviewDate: "2025-12-15",
      nextReviewDate: "2026-12-15",
      documents: [
        { type: "Passport", id: "Z1234567", status: "Verified", expiry: "2030-05-20" },
        { type: "Utility Bill", id: "UB-9988", status: "Verified", date: "2025-11-01" },
        { type: "Tax Returns", id: "ITR-2025", status: "Verified", date: "2025-10-15" }
      ],
      newProducts: [
        { name: "Forex Card", date: "2025-11-20" }
      ],
      triggers: [
        { type: "High Risk Country", detail: "Transaction with UAE", date: "2026-01-02" },
        { type: "PEP Match", detail: "Potential Associate Match", date: "2025-12-10" }
      ],
      sourceOfFunds: ["Business Profits (Kumar Global Traders)", "Rental Income"],
      sourceOfWealth: ["Inheritance", "Business Accumulation"],
      riskEvolution: [
         { date: "2023", score: 40 },
         { date: "2024", score: 65 },
         { date: "2025", score: 85 }
      ],
      changeLog: [
         { field: "Risk Score", old: "Medium (65)", new: "High (85)", user: "System", date: "2026-01-04" },
         { field: "Residence Address", old: "Mumbai, Bandra", new: "Mumbai, Bandra West", user: "Branch Ops", date: "2025-12-01" }
      ]
    },
    accountsProfile: {
      summary: [
        { id: "ACC-9921", institution: "HDFC Bank", type: "Savings Max", balance: "₹12,45,000", currency: "INR", status: "Active", openDate: "2018-03-12" },
        { id: "ACC-3341", institution: "HDFC Bank", type: "Current Business", balance: "₹45,20,000", currency: "INR", status: "Active", openDate: "2020-06-15" },
        { id: "ACC-8812", institution: "HDFC Bank", type: "Term Deposit", balance: "₹5,00,000", currency: "INR", status: "Closed", openDate: "2019-01-01", closeDate: "2024-01-01" },
        { id: "ACC-1122", institution: "Citi Bank", type: "Foreign Currency", balance: "$12,000", currency: "USD", status: "Active", openDate: "2021-05-20" }
      ],
      limits: {
        transaction: "₹50,00,000 / day",
        cash: "₹2,00,000 / day",
        fx: "$50,000 / year"
      },
      products: ["Savings Account", "Current Account", "Trade Finance", "Forex Card", "Online Banking"],
      dormant: []
    },
    transactionsProfile: {
      summary: {
        daily: { volume: 15, value: "₹4.5L" },
        monthly: { volume: 450, value: "₹1.2Cr" },
        ytd: { volume: 5200, value: "₹14.5Cr" },
        breakdown: {
           cash: 15,
           nonCash: 85,
           domestic: 60,
           crossBorder: 40
        }
      },
      topCounterparties: [
         { name: "Alpha Trade Corp", count: 125, amount: "₹85L" },
         { name: "Global Logistics", count: 89, amount: "₹45L" },
         { name: "Tech Solutions Inc", count: 65, amount: "₹22L" },
         { name: "Nexus Imports", count: 42, amount: "₹18L" },
         { name: "Solaris Energy", count: 30, amount: "₹12L" }
      ],
      topCountries: [
          { code: "US", name: "USA", amount: "₹4.5Cr", count: 120 },
          { code: "SG", name: "Singapore", amount: "₹2.8Cr", count: 85 },
          { code: "AE", name: "UAE", amount: "₹1.5Cr", count: 45 },
          { code: "GB", name: "UK", amount: "₹95L", count: 30 },
          { code: "DE", name: "Germany", amount: "₹65L", count: 15 }
      ],
      topAlerts: [
         { name: "Structuring", count: 12, severity: "High" },
         { name: "Velocity Check", count: 8, severity: "Medium" },
         { name: "High Value Txn", count: 5, severity: "Medium" },
         { name: "Round Dollar", count: 4, severity: "Low" },
         { name: "Rapid Movement", count: 2, severity: "High" }
      ],
      unusualPatterns: [
          { name: "Out of Income Profile Transactions", triggered: true, alertId: "ALT-INC-01", details: "Txn > 5x declared income" },
          { name: "Out of Peer Profile Transactions", triggered: true, alertId: "ALT-PEER-02", details: "Volume 45% > peer avg" },
          { name: "Remittance destination not matching Nationality", triggered: false, alertId: null, details: "Match confirmed" },
          { name: "Transactions surge from historical 6 month profile", triggered: true, alertId: "ALT-SURGE-03", details: "200% spike in Jan" },
          { name: "One to Many or Many to One funds flow", triggered: false, alertId: null, details: "Normal topology" },
          { name: "Surge in Dormant account transactions", triggered: false, alertId: null, details: "No activity" }
      ],
      trends: {
         surges: "Spike detected (Jan 15-20)",
         outliers: "2 transactions > 3σ",
         peerProfile: "Deviation: +15% vs Peers",
         nationalityMismatch: "None detected"
      },
      highRiskCorridors: {
         detected: true,
         details: "Potential link to Wildlife Trafficking (SE Asia corridor)",
         corridors: ["Golden Triangle", "West Africa"]
      }
    },
    alertsProfile: {
      active: [
         { id: "ALT-901", rule: "High Value Txn", amount: "₹8,50,000", severity: "High", status: "Open", date: "05 Jan 2026", details: "Single txn > threshold" },
         { id: "ALT-882", rule: "Velocity Check", amount: "₹4,20,000", severity: "Medium", status: "In Progress", date: "02 Jan 2026", details: "Multiple txns in 24h" }
      ],
      history: [
         { id: "ALT-705", rule: "Structuring", disposition: "False Positive", rationale: "Business expense verified", date: "15 Dec 2025", status: "Closed", amount: "₹45,000" },
         { id: "ALT-655", rule: "Round Dollar", disposition: "Escalated", rationale: "Suspicious pattern", date: "10 Nov 2025", status: "Filed STR", amount: "₹1,20,000" },
         { id: "ALT-620", rule: "Rapid Movement", disposition: "False Positive", rationale: "Salary disbursement", date: "01 Oct 2025", status: "Closed", amount: "₹2,50,000" },
         { id: "ALT-598", rule: "High Velocity", disposition: "False Positive", rationale: "Holiday season spending", date: "25 Sep 2025", status: "Closed", amount: "₹85,000" },
         { id: "ALT-550", rule: "Structuring", disposition: "Escalated", rationale: "Multiple deposits < 50k", date: "12 Aug 2025", status: "Review", amount: "₹1,80,000" },
         { id: "ALT-432", rule: "Unusual Merchant", disposition: "False Positive", rationale: "Confirmed with customer", date: "05 Jul 2025", status: "Closed", amount: "₹15,000" },
         { id: "ALT-310", rule: "Crypto P2P", disposition: "Escalated", rationale: "High risk counterparty", date: "20 Jun 2025", status: "Filed STR", amount: "₹5,00,000" },
         { id: "ALT-205", rule: "Foreign Transfer", disposition: "False Positive", rationale: "Tuition fees", date: "15 May 2025", status: "Closed", amount: "$12,000" }
      ],
      stats: {
         totalActiveVolume: "₹12,70,000",
         activeCount: 2,
         closedCount: 45,
         falsePositiveRate: 85,
         alertVolumePercentage: 1.2
      },
      rfi: {
         count: 3,
         lastRequest: "2026-01-02",
         status: "Pending Response",
         items: [
            { type: "Source of Funds", date: "02 Jan 2026", status: "Pending" },
            { type: "Invoice Copy", date: "15 Dec 2025", status: "Received" }
         ]
      },
      fundingSources: [
         { type: "Wires", percent: 60, trend: "Stable" },
         { type: "Checks", percent: 30, trend: "Decreasing" },
         { type: "Crypto", percent: 10, trend: "Increasing" }
      ]
    },
    regReportsProfile: {
       jurisdiction: "India",
       strFiled: { isFiled: true, date: "15 Dec 2025", id: "STR-2025-001", status: "Filed", link: "#" },
       ctrFiled: { isFiled: true, date: "Monthly", details: "Regular High Value", link: "#" },
       leaRequests: { hasRequest: true, date: "20 Dec 2025", agency: "Enforcement Directorate", type: "Summons", link: "#" },
       accountFrozen: { isFrozen: true, date: "05 Jan 2026", reason: "Regulatory Order #9921" }
    },
    audit: [
       { id: "LOG-001", category: "Risk", action: "Risk Rating Downgrade", date: "05 Jan 2026 14:30", user: "System (Auto)", approver: "System", details: "Downgraded from High to Medium after clear screening.", changes: { from: "High", to: "Medium" } },
       { id: "LOG-002", category: "KYC", action: "Address Update", date: "04 Jan 2026 09:15", user: "Sarah Jenkins", approver: "Compliance Manager", details: "Updated residential address via proof of residence.", changes: { field: "Address", from: "123 Old St...", to: "456 New St..." } },
       { id: "LOG-003", category: "Screening", action: "Match False Positive", date: "03 Jan 2026 11:20", user: "Mike Ross", approver: "Auto-Approved", details: "Marked potential match 'John D. Doe' as False Positive.", changes: null },
       { id: "LOG-004", category: "Product", action: "Credit Limit Increase", date: "02 Jan 2026 16:45", user: "System", approver: "Risk Team", details: "Credit limit increased based on usage.", changes: { from: "₹50,000", to: "₹75,000" } },
       { id: "LOG-005", category: "KYC", action: "Document Verified", date: "01 Jan 2026 10:00", user: "System", approver: null, details: "Passport verification successful.", changes: null }
    ],
    riskFactors: {
        kyc: [
            { label: "Nationality/ Geographic Risk", high: true },
            { label: "Occupation", high: false },
            { label: "Fatca", high: false }
        ],
        relatedParties: [
            { label: "PEP Match", high: true },
            { label: "Related Party High risk", high: false }
        ],
        sanctionMatch: [
             { label: "PEP Match", high: true },
             { label: "Adverse Match", high: true },
             { label: "Sanction Match", high: false }
        ],
        riskProfile: [
            { label: "Transaction in High-risk Contries", high: true },
            { label: "Industry Risk", high: true },
            { label: "Behaviour Risk", high: true },
            { label: "Overall Risk", high: true },
            { label: "Manual Risk Change", high: false }
        ],
        cddEdd: [
            { label: "CDD/EDD Triggers \"YES\"", high: true },
            { label: "Profile Change \"YES\"", high: false }
        ],
        account: [
            { label: "Dormant", high: false }
        ],
        transactions: [
            { label: "High Risk Countries Alerts", high: true },
            { label: "High Risk Triggers", high: true }
        ],
        lea: [
            { label: "LEA Request \"YES\"", high: false }
        ],
        regulatory: [
            { label: "YES/ CTR", high: false }
        ]
    },
    subProfiles: {
      "Cust-8829103": {
        previousNames: "Raj V. Kumar",
        dob: "15-08-1982",
        placeOfBirth: "Mumbai, Maharashtra",
        phone: "9876543210",
        email: "rajesh.k@gmail.com",
        gender: "Male",
        multipleCitizenships: ["United States"],
        occupation: "Business Owner",
        employer: "Kumar Global Traders",
        businessSegment: "Retail Banking",
        customerSegment: ["HNI", "High Risk"],
        onboardingDate: "12-03-2018",
        onboardingChannel: "Branch",
        fatcaStatus: "Reportable (US Indicia)",
        leaStatus: "Non-Reportable",
        residentStatus: "Resident",
        relationships: {
          ubo: [
            { name: "Suman Kumar", designation: "Shareholder", nationality: "Indian", residence: "Mumbai", ownership: 55, votingRights: 55 }
          ],
          family: [
            { name: "Suman Kumar", relation: "Spouse", dob: "1985-05-12", hasAccount: true, kycStatus: "Verified" },
            { name: "Arjun Kumar", relation: "Son", dob: "2010-08-20", hasAccount: true, kycStatus: "Verified" }
          ],
          associates: [
            { name: "Mehul Choksi", relation: "Business Partner", hasAccount: false, risk: "High" },
            { name: "Global Exports Ltd", relation: "Subsidiary", hasAccount: true, risk: "Medium" }
          ]
        }
      },
      "Cust-7000362": {
        previousNames: "Rajesh Kumar",
        dob: "15-08-1982",
        placeOfBirth: "Mumbai, Maharashtra",
        phone: "9876543210",
        email: "rajesh.k@gmail.com",
        gender: "Male",
        multipleCitizenships: ["United States"],
        occupation: "Business Owner",
        employer: "Raj Stationary",
        businessSegment: "Retail Banking",
        customerSegment: ["HNI", "High Risk"],
        onboardingDate: "02-05-2019",
        onboardingChannel: "Online",
        fatcaStatus: "Reportable (US Indicia)",
        leaStatus: "Non-Reportable",
        residentStatus: "Resident",
        dormantAccounts: "NO",
        accountsProfile: {
          summary: [
            { id: "ACC-9921", institution: "HDFC Bank", type: "Savings Max", balance: "₹12,45,000", currency: "INR", status: "Active", openDate: "2018-03-12" },
            { id: "ACC-3341", institution: "HDFC Bank", type: "Current Business", balance: "₹45,20,000", currency: "INR", status: "Active", openDate: "2020-06-15" }
          ],
          limits: {
            transaction: "₹50,00,000 / day",
            cash: "₹2,00,000 / day",
            fx: "$50,000 / year"
          },
          products: ["Savings Account", "Current Account"],
          dormant: []
        },
        relationships: {
          ubo: [
            { name: "Raj Gupta", designation: "Director", nationality: "Indian", residence: "Mumbai", ownership: 60, votingRights: 60 }
          ],
          family: [
            { name: "Suman Kumar", relation: "Spouse", dob: "1985-05-12", hasAccount: true, kycStatus: "Verified" },
            { name: "Arjun Kumar", relation: "Son", dob: "2010-08-20", hasAccount: true, kycStatus: "Verified" }
          ],
          associates: [
            { name: "Raj Gupta", relation: "Business Partner", hasAccount: false, risk: "High" }
          ]
        }
      },
      "Cust-3668338": {
        previousNames: "Rajesh Kumar",
        dob: "15-08-1982",
        placeOfBirth: "Mumbai, Maharashtra",
        phone: "9999238467",
        email: "rajesh.kumar82@gmail.com",
        gender: "Male",
        multipleCitizenships: ["United States"],
        occupation: "Business Owner",
        employer: "PlayPoker",
        businessSegment: "Retail Banking",
        customerSegment: ["HNI", "High Risk"],
        onboardingDate: "12-03-2018",
        onboardingChannel: "Branch",
        fatcaStatus: "Reportable (US Indicia)",
        leaStatus: "Non-Reportable",
        residentStatus: "Resident",
        relationships: {
          ubo: [
            { name: "Akshay Chopra", designation: "Director", nationality: "Indian", residence: "Mumbai", ownership: 25, votingRights: 25 }
          ],
          family: [
            { name: "Suman Kumar", relation: "Spouse", dob: "1985-05-12", hasAccount: true, kycStatus: "Verified" },
            { name: "Arjun Kumar", relation: "Son", dob: "2010-08-20", hasAccount: true, kycStatus: "Verified" }
          ],
          associates: [
            { name: "Akshay Chopra", relation: "Business Partner", hasAccount: true, risk: "High" }
          ]
        }
      }
    }
  }
];

export const searchData = [
   { name: "Rajesh Kumar", ucic: "UCO089874637", id: "Cust-8829103", branch: "Mumbai Main", customerIds: ["Cust-8829103", "Cust-7000362", "Cust-3668338"], accountNumber: "ACC-88291030", risk: "High Risk", time: "10 mins ago", initials: "RK", color: "blue", img: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3Njc1NzAwMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", mobile: "9876543210", email: "rajesh.k@gmail.com", accounts: 2, balance: "₹4.5L", status: "Active", kyc: "Verified" },
   { name: "Rajesh Gupta", ucic: "UCO089874638", id: "CUST-8829104", branch: "Delhi North", customerIds: ["CUST-8829104"], accountNumber: "ACC-88291040", risk: "Low Risk", time: "2 days ago", initials: "RG", color: "green", mobile: "+91 98765 43211", email: "rajesh.gupta@gmail.com", accounts: 1, balance: "₹1.5L", status: "Active", kyc: "Verified" },
   { name: "Rajesh Singh", ucic: "UCO089874639", id: "CUST-8829105", branch: "Bangalore East", customerIds: ["CUST-8829105", "CUST-2293842"], accountNumber: "ACC-88291050", risk: "Medium Risk", time: "1 week ago", initials: "RS", color: "orange", mobile: "+91 98765 43212", email: "r.singh@outlook.com", accounts: 3, balance: "₹8.2L", status: "Active", kyc: "Verified" },
   { name: "Rajesh & Sons Traders", ucic: "UCO089874640", id: "CORP-8829106", branch: "Mumbai Main", customerIds: ["CORP-8829106", "CORP-1102932"], accountNumber: "ACC-88291060", risk: "High Risk", time: "yesterday", initials: "RT", color: "blue", mobile: "+91 22 8877 6655", email: "info@rajeshsons.com", accounts: 5, balance: "₹45.5L", status: "Active", kyc: "Pending" },
   { name: "Rahul Verma", ucic: "UCO089874641", id: "CUST-3344556", branch: "Pune City", customerIds: ["CUST-3344556"], accountNumber: "ACC-33445560", risk: "Medium Risk", time: "5 hours ago", initials: "RV", color: "orange", mobile: "+91 91234 56789", email: "rahul.v@gmail.com", accounts: 1, balance: "₹2.1L", status: "Active", kyc: "Verified" },
   { name: "Ravi Patel", ucic: "UCO089874642", id: "CUST-9988776", branch: "Ahmedabad West", customerIds: ["CUST-9988776"], accountNumber: "ACC-99887760", risk: "Low Risk", time: "1 day ago", initials: "RP", color: "green", mobile: "+91 99882 23344", email: "ravi.patel@yahoo.com", accounts: 3, balance: "₹15.5L", status: "Active", kyc: "Verified" },
   { name: "Rachel Green", ucic: "UCO089874643", id: "CUST-5566778", branch: "Mumbai Main", customerIds: ["CUST-5566778"], accountNumber: "ACC-55667780", risk: "Low Risk", time: "3 days ago", initials: "RG", color: "purple", mobile: "+91 77665 54433", email: "rachel.g@outlook.com", accounts: 2, balance: "₹5.2L", status: "Active", kyc: "Verified" },
   { name: "Global Trade Corp", ucic: "UCO089874644", id: "CORP-9921102", branch: "Dubai Offshore", customerIds: ["CORP-9921102"], accountNumber: "ACC-99211020", risk: "Medium Risk", time: "2 hours ago", initials: "GT", color: "purple", mobile: "+91 22 2456 7890", email: "finance@globaltrade.com", accounts: 5, balance: "₹1.2Cr", status: "Active", kyc: "Verified" },
   { name: "Priya Sharma", ucic: "UCO089874645", id: "CUST-7721992", branch: "Chennai South", customerIds: ["CUST-7721992"], accountNumber: "ACC-77219920", risk: "Low Risk", time: "yesterday", initials: "PS", color: "green", mobile: "+91 99887 76655", email: "priya.s@yahoo.com", accounts: 1, balance: "₹85,000", status: "Dormant", kyc: "Re-KYC Due" },
   { name: "Vikram Singh", ucic: "UCO089874646", id: "CUST-1122334", branch: "Chandigarh", customerIds: ["CUST-1122334"], accountNumber: "ACC-11223340", risk: "Low Risk", time: "2 days ago", initials: "VS", color: "gray", mobile: "+91 88776 65544", email: "vikram.singh@outlook.com", accounts: 3, balance: "₹12.5L", status: "Active", kyc: "Verified" },
   { name: "Sarah Chen", ucic: "UCO089874647", id: "CUST-9988771", branch: "Singapore Br", customerIds: ["CUST-9988771"], accountNumber: "ACC-99887710", risk: "Low Risk", time: "3 days ago", initials: "SC", color: "purple", mobile: "+91 77665 54433", email: "sarah.chen@gmail.com", accounts: 4, balance: "₹32.1L", status: "Active", kyc: "Verified" },
   { name: "TechSoft Solutions", ucic: "UCO089874648", id: "CORP-5544332", branch: "Hyderabad", customerIds: ["CORP-5544332"], accountNumber: "ACC-55443320", risk: "High Risk", time: "1 week ago", initials: "TS", color: "blue", mobile: "+91 22 9988 7766", email: "admin@techsoft.io", accounts: 8, balance: "₹2.5Cr", status: "Active", kyc: "Pending Review" }
];
