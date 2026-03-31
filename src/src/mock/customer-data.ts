export const mockCustomers = [
  {
    name: "Arjun Mehta",
    ucic: "UCO089874637",
    id: "CUST-8159176",
    customerIds: ["CUST-8159176"],
    type: "Individual",
    riskScore: "High",
    riskLevel: 75,
    pepMatch: "NO",
    adverseMedia: "NO",
    cddEddTriggers: "NO",
    dormantAccounts: "NO",
    highRiskTransactions: { count: 1, countries: ["Kuwait"] },
    strSarFiled: "YES",
    ctrFiled: "NO",
    leaRequests: "NO",
    activeAlerts: 2,
    status: "Active",
    kycStatus: "Verified",
    nationality: "Indian",
    dob: "14-08-1985",
    occupation: "Software Engineer",
    employer: "Infosys Limited",
    phone: "+91-98204-67831",
    email: "arjun.mehta@gmail.com",
    address: { line1: "Flat 4B, Saffron Heights, Linking Road", city: "Mumbai", zip: "400050" },
    previousNames: "Arjun Mehta",
    placeOfBirth: "Mumbai, Maharashtra, India",
    gender: "Male",
    multipleCitizenships: ["India"],
    residentStatus: "Resident",
    primaryAddress: "Flat 4B, Saffron Heights, Linking Road, Bandra West, Mumbai – 400050",
    secondaryAddresses: [],
    businessSegment: "Salaried",
    customerSegment: ["HNI", "HUF"],
    onboardingDate: "15-10-2017",
    onboardingChannel: "Online",
    channelUsage: { branch: "40%", digital: "55%", agent: "5%" },
    idInfo: {
      aadhar: { type: "Aadhar Number", number: "47X2 XXX3 9XX2" },
      passport: { type: "Passport", number: "P1234567", expiry: "2030-03-22", issuedBy: "Govt of India" },
      pan: { type: "PAN Number", number: "BHWPM4319K" }
    },
    fatcaStatus: "Not applicable",
    leaStatus: "Non-Reportable",
    identification: [
      { type: "Aadhar Number", number: "47X2 XXX3 9XX2", status: "Verified" },
      { type: "Passport", number: "P1234567", status: "Verified", expiry: "2030-03-22" },
      { type: "PAN Number", number: "BHWPM4319K", status: "Verified" }
    ],
    relationships: {
      ubo: [],
      family: [
        { name: "Priya Arjun Mehta", relation: "Spouse", dob: "1988-06-15", hasAccount: true, kycStatus: "Verified" },
        { name: "Kunal Mehta", relation: "Son", dob: "2012-03-20", hasAccount: false, kycStatus: "Not Verified" }
      ],
      associates: [],
      jointHolders: [
        { name: "Priya Arjun Mehta", account: "ACC-1234", relation: "Spouse", hasAccount: true }
      ],
      poa: [],
      pep: {
        isPep: false,
        details: ""
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
      "CUST-8159176": {
        previousNames: "Arjun Mehta",
        dob: "14-08-1985",
        placeOfBirth: "Mumbai, Maharashtra, India",
        phone: "+91-98204-67831",
        email: "arjun.mehta@gmail.com",
        gender: "Male",
        multipleCitizenships: ["India"],
        occupation: "Software Engineer",
        employer: "Infosys Limited",
        businessSegment: "Salaried",
        customerSegment: ["HNI", "HUF"],
        onboardingDate: "15-10-2017",
        onboardingChannel: "Online",
        fatcaStatus: "Not applicable",
        leaStatus: "Non-Reportable",
        residentStatus: "Resident",
        relationships: {
          ubo: [],
          family: [
            { name: "Priya Arjun Mehta", relation: "Spouse", dob: "1988-06-15", hasAccount: true, kycStatus: "Verified" },
            { name: "Kunal Mehta", relation: "Son", dob: "2012-03-20", hasAccount: false, kycStatus: "Not Verified" }
          ],
          associates: [],
          jointHolders: [
            { name: "Priya Arjun Mehta", account: "ACC-1234", relation: "Spouse", hasAccount: true }
          ]
        }
      }
    }
  },
  // ── Nikita Rao ──────────────────────────────────────────────────────────────
  {
    name: "Nikita Rao",
    ucic: "UCO089874650",
    id: "CUST-8159177",
    customerIds: ["CUST-8159177"],
    type: "Individual",
    riskScore: "High",
    riskLevel: 90,
    pepMatch: "NO",
    adverseMedia: "NO",
    cddEddTriggers: "YES",
    dormantAccounts: "NO",
    highRiskTransactions: { count: 0, countries: [] },
    strSarFiled: "YES",
    ctrFiled: "YES",
    leaRequests: "NO",
    activeAlerts: 3,
    status: "Active",
    kycStatus: "Verified",
    nationality: "Indian",
    dob: "09-04-1978",
    occupation: "Lawyer",
    employer: "AZB & Partners",
    phone: "+91-98765-11223",
    email: "nikita.rao@azb.in",
    address: { line1: "Plot 12, Jubilee Hills", city: "Hyderabad", zip: "500033" },
    previousNames: "Nikita Rao",
    placeOfBirth: "Hyderabad, Telangana, India",
    gender: "Female",
    multipleCitizenships: ["India"],
    residentStatus: "Resident",
    primaryAddress: "Plot 12, Jubilee Hills, Hyderabad – 500033",
    secondaryAddresses: [],
    businessSegment: "Salaried",
    customerSegment: ["HNI"],
    onboardingDate: "20-03-2010",
    onboardingChannel: "Branch",
    channelUsage: { branch: "50%", digital: "45%", agent: "5%" },
    idInfo: {
      aadhar: { type: "Aadhar Number", number: "47X2 XXX3 9XX3" },
      passport: { type: "Passport", number: "P1234568", expiry: "2029-10-20", issuedBy: "Govt of India" },
      pan: { type: "PAN Number", number: "ABCDE1234F" }
    },
    fatcaStatus: "Not applicable",
    leaStatus: "Non-Reportable",
    identification: [
      { type: "Aadhar Number", number: "47X2 XXX3 9XX3", status: "Verified" },
      { type: "Passport", number: "P1234568", status: "Verified", expiry: "2029-10-20" },
      { type: "PAN Number", number: "ABCDE1234F", status: "Verified" }
    ],
    relationships: {
      ubo: [],
      family: [
        { name: "N.T. Rama Rao", relation: "Spouse", dob: "1975-08-22", hasAccount: true, kycStatus: "Verified" }
      ],
      associates: [],
      jointHolders: [
        { name: "N.T. Rama Rao", account: "ACC-1234", relation: "Spouse", hasAccount: true }
      ],
      poa: [],
      pep: { isPep: false, details: "" }
    },
    screening: {
      overallStatus: "Clear",
      sanctions: [],
      pep: { status: "Clear", details: "", matches: [] },
      adverseMedia: [],
      watchlistMatches: [],
      history: [
        { date: "2025-12-01", watchlists: "All Lists", caseId: "CS-7801" },
        { date: "2025-06-15", watchlists: "OFAC, UN", caseId: "CS-6614" }
      ]
    },
    riskProfile: {
      overall: { score: 90, level: "High", lastUpdated: "2026-01-10" },
      geographic: {
        riskLevel: "Low",
        score: 20,
        residence: { country: "India", fatfBlack: "N", fatfGrey: "N", taxEvasion: "N", otherHighRisk: "N" },
        citizenship: { country: "India", fatfBlack: "N", fatfGrey: "N", taxEvasion: "N", otherHighRisk: "N" }
      },
      highRiskTxnCountries: [],
      productChannelRisk: [
        { type: "Product", name: "Savings Account", risk: "Low" },
        { type: "Channel", name: "Branch", risk: "Low" }
      ],
      customerTypeRisk: { type: "HNI Individual", risk: "Medium" },
      occupationRisk: { isHighRisk: "Y", value: "Lawyer – Legal Professional" },
      industryRisk: { isHighRisk: "N", sector: "Legal Services", details: "Regulated profession" },
      behavioral: {
        score: 80,
        level: "High",
        alerts: [
          { name: "STR filed multiple times", deviation: 0, details: "5 STR/SAR filings on record" }
        ]
      },
      relatedPartiesRisk: { score: 30, level: "Low" },
      history: [
        { date: "2026-01-10", score: 90, level: "High", reason: "Multiple STR Filings" },
        { date: "2025-07-01", score: 70, level: "High", reason: "Periodic Review" }
      ],
      overrides: []
    },
    kycProfile: {
      status: "Verified",
      lastReviewDate: "2025-11-20",
      nextReviewDate: "2026-11-20",
      documents: [
        { type: "Passport", id: "P1234568", status: "Verified", expiry: "2029-10-20" },
        { type: "Utility Bill", id: "UB-8821", status: "Verified", date: "2025-10-01" }
      ],
      newProducts: [],
      triggers: [
        { type: "High STR Count", detail: "5 STR/SAR filings", date: "2026-01-10" }
      ],
      sourceOfFunds: ["Salary – AZB & Partners", "Professional Fees"],
      sourceOfWealth: ["Professional Income", "Inheritance"],
      riskEvolution: [
        { date: "2023", score: 50 },
        { date: "2024", score: 70 },
        { date: "2025", score: 90 }
      ],
      changeLog: [
        { field: "Risk Score", old: "High (70)", new: "High (90)", user: "System", date: "2026-01-10" }
      ]
    },
    accountsProfile: {
      summary: [
        { id: "ACC-5501", institution: "ICICI Bank", type: "Savings Account", balance: "₹8,20,000", currency: "INR", status: "Active", openDate: "2010-03-20" },
        { id: "ACC-5502", institution: "ICICI Bank", type: "Term Deposit", balance: "₹10,00,000", currency: "INR", status: "Active", openDate: "2022-01-01" }
      ],
      limits: { transaction: "₹25,00,000 / day", cash: "₹1,00,000 / day", fx: "$10,000 / year" },
      products: ["Savings Account", "Term Deposit", "Online Banking"],
      dormant: []
    },
    transactionsProfile: {
      summary: {
        daily: { volume: 8, value: "₹1.2L" },
        monthly: { volume: 240, value: "₹36L" },
        ytd: { volume: 2800, value: "₹4.3Cr" },
        breakdown: { cash: 10, nonCash: 90, domestic: 95, crossBorder: 5 }
      },
      topCounterparties: [
        { name: "AZB & Partners LLP", count: 80, amount: "₹22L" },
        { name: "HYD Courts Trust", count: 40, amount: "₹9L" }
      ],
      topCountries: [
        { code: "IN", name: "India", amount: "₹4.1Cr", count: 2700 }
      ],
      topAlerts: [
        { name: "STR Filed", count: 5, severity: "High" },
        { name: "CTR Filed", count: 2, severity: "Medium" }
      ],
      unusualPatterns: [
        { name: "Out of Income Profile Transactions", triggered: true, alertId: "ALT-INC-10", details: "Txn > 4x declared income" },
        { name: "Transactions surge from historical 6 month profile", triggered: false, alertId: null, details: "Within normal range" }
      ],
      trends: {
        surges: "None detected",
        outliers: "1 transaction > 3σ",
        peerProfile: "Deviation: +8% vs Peers",
        nationalityMismatch: "None detected"
      },
      highRiskCorridors: { detected: false, details: "", corridors: [] }
    },
    alertsProfile: {
      active: [
        { id: "ALT-1101", rule: "High Value Txn", amount: "₹5,00,000", severity: "High", status: "Open", date: "10 Jan 2026", details: "Single txn > threshold" },
        { id: "ALT-1082", rule: "Velocity Check", amount: "₹2,10,000", severity: "Medium", status: "In Progress", date: "05 Jan 2026", details: "Multiple txns in 24h" },
        { id: "ALT-1060", rule: "STR Pattern", amount: "₹3,50,000", severity: "High", status: "Open", date: "02 Jan 2026", details: "Pattern matches prior STR" }
      ],
      history: [
        { id: "ALT-980", rule: "Structuring", disposition: "Escalated", rationale: "Suspicious layering", date: "10 Dec 2025", status: "Filed STR", amount: "₹80,000" }
      ],
      stats: { totalActiveVolume: "₹10,60,000", activeCount: 3, closedCount: 20, falsePositiveRate: 60, alertVolumePercentage: 2.4 },
      rfi: { count: 1, lastRequest: "2026-01-10", status: "Pending Response", items: [{ type: "Source of Funds", date: "10 Jan 2026", status: "Pending" }] },
      fundingSources: [
        { type: "Salary Credit", percent: 80, trend: "Stable" },
        { type: "Wires", percent: 20, trend: "Increasing" }
      ]
    },
    regReportsProfile: {
      jurisdiction: "India",
      strFiled: { isFiled: true, date: "10 Dec 2025", id: "STR-2025-005", status: "Filed", link: "#" },
      ctrFiled: { isFiled: true, date: "Monthly", details: "Regular High Value", link: "#" },
      leaRequests: { hasRequest: false, date: "", agency: "", type: "", link: "#" },
      accountFrozen: { isFrozen: false, date: "", reason: "" }
    },
    audit: [
      { id: "LOG-101", category: "Risk", action: "Risk Score Updated", date: "10 Jan 2026 09:00", user: "System (Auto)", approver: "System", details: "Score raised to 90 due to STR count.", changes: { from: "70", to: "90" } }
    ],
    riskFactors: {
      kyc: [
        { label: "Nationality/ Geographic Risk", high: false },
        { label: "Occupation", high: true },
        { label: "Fatca", high: false }
      ],
      relatedParties: [
        { label: "PEP Match", high: false },
        { label: "Related Party High risk", high: false }
      ],
      sanctionMatch: [
        { label: "PEP Match", high: false },
        { label: "Adverse Match", high: false },
        { label: "Sanction Match", high: false }
      ],
      riskProfile: [
        { label: "Transaction in High-risk Countries", high: false },
        { label: "Industry Risk", high: false },
        { label: "Behaviour Risk", high: true },
        { label: "Overall Risk", high: true },
        { label: "Manual Risk Change", high: false }
      ],
      cddEdd: [
        { label: "CDD/EDD Triggers \"YES\"", high: true },
        { label: "Profile Change \"YES\"", high: false }
      ],
      account: [{ label: "Dormant", high: false }],
      transactions: [
        { label: "High Risk Countries Alerts", high: false },
        { label: "High Risk Triggers", high: true }
      ],
      lea: [{ label: "LEA Request \"YES\"", high: false }],
      regulatory: [{ label: "YES/ CTR", high: true }]
    },
    subProfiles: {
      "CUST-8159177": {
        previousNames: "Nikita Rao",
        dob: "09-04-1978",
        placeOfBirth: "Hyderabad, Telangana, India",
        phone: "+91-98765-11223",
        email: "nikita.rao@azb.in",
        gender: "Female",
        multipleCitizenships: ["India"],
        occupation: "Lawyer",
        employer: "AZB & Partners",
        businessSegment: "Salaried",
        customerSegment: ["HNI"],
        onboardingDate: "20-03-2010",
        onboardingChannel: "Branch",
        fatcaStatus: "Not applicable",
        leaStatus: "Non-Reportable",
        residentStatus: "Resident",
        relationships: {
          ubo: [],
          family: [
            { name: "N.T. Rama Rao", relation: "Spouse", dob: "1975-08-22", hasAccount: true, kycStatus: "Verified" }
          ],
          associates: [],
          jointHolders: [
            { name: "N.T. Rama Rao", account: "ACC-1234", relation: "Spouse", hasAccount: true }
          ]
        }
      }
    }
  },
  // ── Vishal Aggarwal ─────────────────────────────────────────────────────────
  {
    name: "Vishal Aggarwal",
    ucic: "UCO089874651",
    id: "CUST-8159178",
    customerIds: ["CUST-8159178"],
    type: "Individual",
    riskScore: "Medium",
    riskLevel: 40,
    pepMatch: "YES",
    adverseMedia: "NO",
    cddEddTriggers: "NO",
    dormantAccounts: "NO",
    highRiskTransactions: { count: 0, countries: [] },
    strSarFiled: "YES",
    ctrFiled: "YES",
    leaRequests: "NO",
    activeAlerts: 1,
    status: "Active",
    kycStatus: "Verified",
    nationality: "Indian",
    dob: "20-12-2001",
    occupation: "Accountant",
    employer: "Grant Thornton",
    phone: "+91-98112-44556",
    email: "vishal.aggarwal@gt.in",
    address: { line1: "B-204, Vasant Kunj", city: "New Delhi", zip: "110070" },
    previousNames: "Vishal Aggarwal",
    placeOfBirth: "New Delhi, India",
    gender: "Male",
    multipleCitizenships: ["India"],
    residentStatus: "Resident",
    primaryAddress: "B-204, Vasant Kunj, New Delhi – 110070",
    secondaryAddresses: [],
    businessSegment: "Salaried",
    customerSegment: ["Mass Retail"],
    onboardingDate: "05-06-2022",
    onboardingChannel: "Online",
    channelUsage: { branch: "10%", digital: "85%", agent: "5%" },
    idInfo: {
      aadhar: { type: "Aadhar Number", number: "47X2 XXX3 9XX4" },
      passport: { type: "Passport", number: "P1234569", expiry: "2035-07-02", issuedBy: "Govt of India" },
      pan: { type: "PAN Number", number: "XYZTU1234V" }
    },
    fatcaStatus: "Not applicable",
    leaStatus: "Non-Reportable",
    identification: [
      { type: "Aadhar Number", number: "47X2 XXX3 9XX4", status: "Verified" },
      { type: "Passport", number: "P1234569", status: "Verified", expiry: "2035-07-02" },
      { type: "PAN Number", number: "XYZTU1234V", status: "Verified" }
    ],
    relationships: {
      ubo: [],
      family: [],
      associates: [],
      jointHolders: [],
      poa: [],
      pep: { isPep: true, details: "Close associate of a sitting state minister" }
    },
    screening: {
      overallStatus: "Flagged",
      sanctions: [],
      pep: {
        status: "Confirmed",
        details: "Associate of PEP – State Minister (Delhi)",
        matches: [
          { name: "Vishal Aggarwal", watchlist: "WorldCheck PEP", percentage: 85, details: "Associate of state-level minister", link: "#" }
        ]
      },
      adverseMedia: [],
      watchlistMatches: [],
      history: [
        { date: "2025-11-10", watchlists: "Global PEP", caseId: "CS-5501" }
      ]
    },
    riskProfile: {
      overall: { score: 40, level: "Medium", lastUpdated: "2025-12-01" },
      geographic: {
        riskLevel: "Low",
        score: 15,
        residence: { country: "India", fatfBlack: "N", fatfGrey: "N", taxEvasion: "N", otherHighRisk: "N" },
        citizenship: { country: "India", fatfBlack: "N", fatfGrey: "N", taxEvasion: "N", otherHighRisk: "N" }
      },
      highRiskTxnCountries: [],
      productChannelRisk: [
        { type: "Channel", name: "Online Banking", risk: "Low" },
        { type: "Product", name: "Savings Account", risk: "Low" }
      ],
      customerTypeRisk: { type: "Mass Retail Individual", risk: "Low" },
      occupationRisk: { isHighRisk: "N", value: "Accountant – Audit Firm" },
      industryRisk: { isHighRisk: "N", sector: "Accounting & Audit", details: "Regulated profession" },
      behavioral: {
        score: 35,
        level: "Low",
        alerts: []
      },
      relatedPartiesRisk: { score: 55, level: "Medium" },
      history: [
        { date: "2025-12-01", score: 40, level: "Medium", reason: "PEP Association Identified" },
        { date: "2022-06-05", score: 10, level: "Low", reason: "Onboarding" }
      ],
      overrides: []
    },
    kycProfile: {
      status: "Verified",
      lastReviewDate: "2025-10-01",
      nextReviewDate: "2026-10-01",
      documents: [
        { type: "Passport", id: "P1234569", status: "Verified", expiry: "2035-07-02" },
        { type: "Aadhar", id: "47X2 XXX3 9XX4", status: "Verified", date: "2022-06-05" }
      ],
      newProducts: [],
      triggers: [
        { type: "PEP Association", detail: "Associate of state minister", date: "2025-11-10" }
      ],
      sourceOfFunds: ["Salary – Grant Thornton"],
      sourceOfWealth: ["Professional Income"],
      riskEvolution: [
        { date: "2022", score: 10 },
        { date: "2023", score: 20 },
        { date: "2025", score: 40 }
      ],
      changeLog: [
        { field: "PEP Flag", old: "No", new: "Yes", user: "System", date: "2025-11-10" }
      ]
    },
    accountsProfile: {
      summary: [
        { id: "ACC-7701", institution: "SBI", type: "Savings Account", balance: "₹1,85,000", currency: "INR", status: "Active", openDate: "2022-06-05" }
      ],
      limits: { transaction: "₹5,00,000 / day", cash: "₹50,000 / day", fx: "$5,000 / year" },
      products: ["Savings Account", "Online Banking"],
      dormant: []
    },
    transactionsProfile: {
      summary: {
        daily: { volume: 3, value: "₹15,000" },
        monthly: { volume: 90, value: "₹4.5L" },
        ytd: { volume: 1100, value: "₹54L" },
        breakdown: { cash: 5, nonCash: 95, domestic: 100, crossBorder: 0 }
      },
      topCounterparties: [
        { name: "Grant Thornton India LLP", count: 12, amount: "₹24L" }
      ],
      topCountries: [
        { code: "IN", name: "India", amount: "₹54L", count: 1100 }
      ],
      topAlerts: [
        { name: "PEP Association", count: 1, severity: "Medium" }
      ],
      unusualPatterns: [
        { name: "Out of Income Profile Transactions", triggered: false, alertId: null, details: "Within normal range" }
      ],
      trends: { surges: "None detected", outliers: "None", peerProfile: "Normal", nationalityMismatch: "None detected" },
      highRiskCorridors: { detected: false, details: "", corridors: [] }
    },
    alertsProfile: {
      active: [
        { id: "ALT-2001", rule: "PEP Link Detected", amount: "N/A", severity: "Medium", status: "In Progress", date: "10 Nov 2025", details: "PEP association flagged for review" }
      ],
      history: [],
      stats: { totalActiveVolume: "N/A", activeCount: 1, closedCount: 5, falsePositiveRate: 80, alertVolumePercentage: 0.5 },
      rfi: { count: 0, lastRequest: "", status: "None", items: [] },
      fundingSources: [
        { type: "Salary Credit", percent: 95, trend: "Stable" },
        { type: "Cash", percent: 5, trend: "Stable" }
      ]
    },
    regReportsProfile: {
      jurisdiction: "India",
      strFiled: { isFiled: true, date: "05 Nov 2025", id: "STR-2025-002", status: "Filed", link: "#" },
      ctrFiled: { isFiled: true, date: "Quarterly", details: "PEP-related CTR", link: "#" },
      leaRequests: { hasRequest: false, date: "", agency: "", type: "", link: "#" },
      accountFrozen: { isFrozen: false, date: "", reason: "" }
    },
    audit: [
      { id: "LOG-201", category: "Screening", action: "PEP Match Flagged", date: "10 Nov 2025 14:00", user: "System (Auto)", approver: "Compliance Manager", details: "PEP association identified via WorldCheck.", changes: null }
    ],
    riskFactors: {
      kyc: [
        { label: "Nationality/ Geographic Risk", high: false },
        { label: "Occupation", high: false },
        { label: "Fatca", high: false }
      ],
      relatedParties: [
        { label: "PEP Match", high: true },
        { label: "Related Party High risk", high: false }
      ],
      sanctionMatch: [
        { label: "PEP Match", high: true },
        { label: "Adverse Match", high: false },
        { label: "Sanction Match", high: false }
      ],
      riskProfile: [
        { label: "Transaction in High-risk Countries", high: false },
        { label: "Industry Risk", high: false },
        { label: "Behaviour Risk", high: false },
        { label: "Overall Risk", high: false },
        { label: "Manual Risk Change", high: false }
      ],
      cddEdd: [
        { label: "CDD/EDD Triggers \"YES\"", high: false },
        { label: "Profile Change \"YES\"", high: false }
      ],
      account: [{ label: "Dormant", high: false }],
      transactions: [
        { label: "High Risk Countries Alerts", high: false },
        { label: "High Risk Triggers", high: false }
      ],
      lea: [{ label: "LEA Request \"YES\"", high: false }],
      regulatory: [{ label: "YES/ CTR", high: true }]
    },
    subProfiles: {
      "CUST-8159178": {
        previousNames: "Vishal Aggarwal",
        dob: "20-12-2001",
        placeOfBirth: "New Delhi, India",
        phone: "+91-98112-44556",
        email: "vishal.aggarwal@gt.in",
        gender: "Male",
        multipleCitizenships: ["India"],
        occupation: "Accountant",
        employer: "Grant Thornton",
        businessSegment: "Salaried",
        customerSegment: ["Mass Retail"],
        onboardingDate: "05-06-2022",
        onboardingChannel: "Online",
        fatcaStatus: "Not applicable",
        leaStatus: "Non-Reportable",
        residentStatus: "Resident",
        relationships: {
          ubo: [],
          family: [],
          associates: [],
          jointHolders: []
        }
      }
    }
  },
  // ── TechBridge Solutions Pvt. Ltd. ──────────────────────────────────────────
  {
    name: "TechBridge",
    ucic: "UCO089874652",
    id: "CUST-81597856",
    customerIds: ["CUST-81597856"],
    type: "Corporate",
    riskScore: "Medium",
    riskLevel: 40,
    pepMatch: "NO",
    adverseMedia: "NO",
    cddEddTriggers: "NO",
    dormantAccounts: "NO",
    highRiskTransactions: { count: 0, countries: [] },
    strSarFiled: "YES",
    ctrFiled: "YES",
    leaRequests: "NO",
    activeAlerts: 3,
    status: "Active",
    kycStatus: "Verified",
    nationality: "Indian",
    dob: "12-04-2016",
    occupation: "",
    employer: "",
    phone: "+91-22-6789-3400",
    email: "",
    address: { line1: "Tower B, Bandra Kurla Complex", city: "Mumbai", zip: "400051" },
    previousNames: "TechBridge Solutions Private Limited",
    placeOfBirth: "India",
    gender: "",
    multipleCitizenships: [],
    residentStatus: "",
    primaryAddress: "",
    secondaryAddresses: [],
    businessSegment: "Corporate",
    customerSegment: ["SME"],
    onboardingDate: "31-03-2019",
    onboardingChannel: "Branch",
    channelUsage: { branch: "30%", digital: "65%", agent: "5%" },
    idInfo: {
      aadhar: { type: "Reg. Number / CIN", number: "U72900MH2016PTC278431" },
      passport: { type: "GSTIN / Tax ID", number: "27AABCT4219K1ZR", expiry: "N/A", issuedBy: "GST Authority" },
      pan: { type: "PAN Number", number: "AABCT4219K" }
    },
    natureOfBusiness: "Information Technology & IT Services",
    fatcaStatus: "",
    leaStatus: "Non-Reportable",
    identification: [
      { type: "Reg. Number / CIN", number: "U72900MH2016PTC278431", status: "Verified" },
      { type: "GSTIN / Tax ID", number: "27AABCT4219K1ZR", status: "Verified" },
      { type: "PAN Number", number: "AABCT4219K", status: "Verified" }
    ],
    relationships: {
      ubo: [
        {
          name: "Vikram Suresh Nair",
          designation: "Managing Director (Promoter)",
          nationality: "Indian",
          ownership: 51,
          din: "01234567",
          dob: "18-Jul-1982",
          pan: "AEHPN3214R",
          aadhar: "6721 8834 5509",
          phone: "+91-99204-56781",
          address: "B-204, Green Meadows, Powai, Mumbai – 400076",
          pepStatus: "Not a PEP",
          sanctions: "Clear"
        },
        {
          name: "Kavitha Ramesh Iyer",
          designation: "Executive Director & CFO",
          nationality: "Indian",
          ownership: 29,
          din: "08765432",
          dob: "03-Dec-1985",
          pan: "BQWPI9871J",
          aadhar: "4419 0023 6678",
          phone: "+91-98200-74312",
          address: "C-12, Mahindra Splendour, Vikhroli West, Mumbai – 400083",
          pepStatus: "Not a PEP",
          sanctions: "Clear"
        },
        {
          name: "Rohan Deepak Kulkarni",
          designation: "Independent Non-Executive Director",
          nationality: "Indian",
          ownership: 20,
          din: "05648912",
          dob: "29-Jan-1975",
          pan: "FKPDK5643Z",
          pepStatus: "Not a PEP",
          sanctions: "Clear",
          remarks: "No management control – passive investor"
        }
      ],
      family: [],
      associates: [
        { name: "Vikram Suresh Nair", role: "Managing Director (Promoter)", share: "51%", din: "01234567" },
        { name: "Kavitha Ramesh Iyer", role: "Executive Director & CFO", share: "29%", din: "08765432" },
        { name: "Rohan Deepak Kulkarni", role: "Independent Non-Executive Director", share: "20%", din: "05648912" }
      ],
      jointHolders: [],
      poa: [],
      pep: { isPep: false, details: "" }
    },
    screening: {
      overallStatus: "Clear",
      sanctions: [],
      pep: { status: "Clear", details: "", matches: [] },
      adverseMedia: [],
      watchlistMatches: [],
      history: [
        { date: "2025-09-01", watchlists: "All Lists", caseId: "CS-4401" }
      ]
    },
    riskProfile: {
      overall: { score: 40, level: "Medium", lastUpdated: "2025-09-01" },
      geographic: {
        riskLevel: "Low",
        score: 10,
        residence: { country: "India", fatfBlack: "N", fatfGrey: "N", taxEvasion: "N", otherHighRisk: "N" },
        citizenship: { country: "India", fatfBlack: "N", fatfGrey: "N", taxEvasion: "N", otherHighRisk: "N" }
      },
      highRiskTxnCountries: [],
      productChannelRisk: [
        { type: "Product", name: "Current Account", risk: "Low" },
        { type: "Service", name: "Trade Finance", risk: "Medium" }
      ],
      customerTypeRisk: { type: "SME Corporate", risk: "Medium" },
      occupationRisk: { isHighRisk: "N", value: "IT Services" },
      industryRisk: { isHighRisk: "N", sector: "Information Technology", details: "Low-risk sector" },
      behavioral: { score: 30, level: "Low", alerts: [] },
      relatedPartiesRisk: { score: 20, level: "Low" },
      history: [
        { date: "2025-09-01", score: 40, level: "Medium", reason: "Periodic Review" },
        { date: "2016-09-01", score: 15, level: "Low", reason: "Onboarding" }
      ],
      overrides: []
    },
    kycProfile: {
      status: "Verified",
      lastReviewDate: "2025-09-01",
      nextReviewDate: "2026-09-01",
      documents: [
        { type: "Certificate of Incorporation", id: "U72900MH2016PTC278431", status: "Verified", date: "2016-04-12" },
        { type: "GST Certificate", id: "27AABCT4219K1ZR", status: "Verified", date: "2017-07-01" }
      ],
      newProducts: [],
      triggers: [],
      sourceOfFunds: ["Revenue from IT Services", "Client Retainer Fees"],
      sourceOfWealth: ["Business Operations since 2016"],
      riskEvolution: [
        { date: "2018", score: 15 },
        { date: "2022", score: 30 },
        { date: "2025", score: 40 }
      ],
      changeLog: []
    },
    accountsProfile: {
      summary: [
        { id: "ACC-8801", institution: "HDFC Bank", type: "Current Account", balance: "₹62,00,000", currency: "INR", status: "Active", openDate: "2016-09-01" },
        { id: "ACC-8802", institution: "HDFC Bank", type: "Overdraft", balance: "₹0", currency: "INR", status: "Active", openDate: "2019-01-01" }
      ],
      limits: { transaction: "₹2,00,00,000 / day", cash: "₹5,00,000 / day", fx: "$1,00,000 / year" },
      products: ["Current Account", "Overdraft", "Trade Finance", "Online Banking"],
      dormant: []
    },
    transactionsProfile: {
      summary: {
        daily: { volume: 20, value: "₹15L" },
        monthly: { volume: 600, value: "₹4.5Cr" },
        ytd: { volume: 7200, value: "₹54Cr" },
        breakdown: { cash: 2, nonCash: 98, domestic: 85, crossBorder: 15 }
      },
      topCounterparties: [
        { name: "Infosys BPM Ltd", count: 80, amount: "₹12Cr" },
        { name: "TCS iON", count: 60, amount: "₹8Cr" }
      ],
      topCountries: [
        { code: "IN", name: "India", amount: "₹46Cr", count: 6100 },
        { code: "US", name: "USA", amount: "₹8Cr", count: 1100 }
      ],
      topAlerts: [],
      unusualPatterns: [
        { name: "Out of Income Profile Transactions", triggered: false, alertId: null, details: "Within normal range" }
      ],
      trends: { surges: "None detected", outliers: "None", peerProfile: "Normal", nationalityMismatch: "None detected" },
      highRiskCorridors: { detected: false, details: "", corridors: [] }
    },
    alertsProfile: {
      active: [
        { id: "ALT-TB-301", rule: "Suspicious Transaction Pattern", amount: "₹18,50,000", severity: "High", status: "Open", date: "15 Jan 2026", details: "Multiple structured transactions below reporting threshold" },
        { id: "ALT-TB-302", rule: "Velocity Check", amount: "₹9,20,000", severity: "Medium", status: "In Progress", date: "10 Jan 2026", details: "High frequency of transactions over 5 days" },
        { id: "ALT-TB-303", rule: "High Value TXN", amount: "₹42,00,000", severity: "High", status: "Open", date: "31 Dec 2025", details: "Single transaction triggering CTR" }
      ],
      history: [
        { id: "ALT-TB-201", rule: "Structuring", disposition: "Escalated", rationale: "Pattern confirmed – STR filed", date: "01 Dec 2025", status: "Filed STR", amount: "₹12,00,000" }
      ],
      stats: { totalActiveVolume: "₹69,70,000", activeCount: 3, closedCount: 6, falsePositiveRate: 60, alertVolumePercentage: 1.3 },
      rfi: { count: 1, lastRequest: "2026-01-15", status: "Pending Response", items: [{ type: "Source of Funds", date: "15 Jan 2026", status: "Pending" }] },
      fundingSources: [
        { type: "Client Payments", percent: 90, trend: "Stable" },
        { type: "Wires (USD)", percent: 10, trend: "Stable" }
      ]
    },
    regReportsProfile: {
      jurisdiction: "India",
      strFiled: { isFiled: true, date: "15 Jan 2026", id: "STR-2026-TB-003", status: "Filed", count: 3, link: "#" },
      ctrFiled: { isFiled: true, date: "31 Dec 2025", details: "1 CTR filed – High Value Transaction", count: 1, link: "#" },
      leaRequests: { hasRequest: false, date: "", agency: "", type: "", link: "#" },
      accountFrozen: { isFrozen: false, date: "", reason: "" }
    },
    audit: [
      { id: "LOG-304", category: "Regulatory", action: "STR Filed", date: "15 Jan 2026 11:00", user: "Compliance Team", approver: "MLRO", details: "STR filed – suspicious transaction pattern detected.", changes: null },
      { id: "LOG-303", category: "Regulatory", action: "CTR Filed", date: "31 Dec 2025 10:00", user: "System (Auto)", approver: "System", details: "CTR filed for high-value transaction.", changes: null },
      { id: "LOG-301", category: "KYC", action: "Annual Review Completed", date: "01 Sep 2025 10:00", user: "KYC Team", approver: "Compliance Manager", details: "Annual review passed. Risk unchanged.", changes: null }
    ],
    riskFactors: {
      kyc: [
        { label: "Nationality/ Geographic Risk", high: false },
        { label: "Occupation", high: false },
        { label: "Fatca", high: false }
      ],
      relatedParties: [
        { label: "PEP Match", high: false },
        { label: "Related Party High risk", high: false }
      ],
      sanctionMatch: [
        { label: "PEP Match", high: false },
        { label: "Adverse Match", high: false },
        { label: "Sanction Match", high: false }
      ],
      riskProfile: [
        { label: "Transaction in High-risk Countries", high: false },
        { label: "Industry Risk", high: false },
        { label: "Behaviour Risk", high: false },
        { label: "Overall Risk", high: false },
        { label: "Manual Risk Change", high: false }
      ],
      cddEdd: [
        { label: "CDD/EDD Triggers \"YES\"", high: false },
        { label: "Profile Change \"YES\"", high: false }
      ],
      account: [{ label: "Dormant", high: false }],
      transactions: [
        { label: "High Risk Countries Alerts", high: false },
        { label: "High Risk Triggers", high: false }
      ],
      lea: [{ label: "LEA Request \"YES\"", high: false }],
      regulatory: [{ label: "YES/ CTR", high: false }]
    },
    subProfiles: {
      "CUST-81597856": {
        previousNames: "TechBridge Solutions Private Limited",
        dob: "12-04-2016",
        placeOfBirth: "India",
        phone: "+91-22-6789-3400",
        email: "",
        gender: "",
        multipleCitizenships: [],
        occupation: "",
        employer: "",
        natureOfBusiness: "Information Technology & IT Services",
        businessSegment: "Corporate",
        customerSegment: ["SME"],
        onboardingDate: "31-03-2019",
        onboardingChannel: "Branch",
        fatcaStatus: "",
        leaStatus: "Non-Reportable",
        residentStatus: "",
        relationships: {
          ubo: [
            { name: "Vikram Suresh Nair", designation: "Managing Director (Promoter)", nationality: "Indian", ownership: 51, din: "01234567", dob: "18-Jul-1982", pan: "AEHPN3214R", aadhar: "6721 8834 5509", phone: "+91-99204-56781", address: "B-204, Green Meadows, Powai, Mumbai – 400076", pepStatus: "Not a PEP", sanctions: "Clear" },
            { name: "Kavitha Ramesh Iyer", designation: "Executive Director & CFO", nationality: "Indian", ownership: 29, din: "08765432", dob: "03-Dec-1985", pan: "BQWPI9871J", aadhar: "4419 0023 6678", phone: "+91-98200-74312", address: "C-12, Mahindra Splendour, Vikhroli West, Mumbai – 400083", pepStatus: "Not a PEP", sanctions: "Clear" },
            { name: "Rohan Deepak Kulkarni", designation: "Independent Non-Executive Director", nationality: "Indian", ownership: 20, din: "05648912", dob: "29-Jan-1975", pan: "FKPDK5643Z", pepStatus: "Not a PEP", sanctions: "Clear", remarks: "No management control – passive investor" }
          ],
          family: [],
          associates: [
            { name: "Vikram Suresh Nair", role: "Managing Director (Promoter)", share: "51%", din: "01234567" },
            { name: "Kavitha Ramesh Iyer", role: "Executive Director & CFO", share: "29%", din: "08765432" },
            { name: "Rohan Deepak Kulkarni", role: "Independent Non-Executive Director", share: "20%", din: "05648912" }
          ],
          jointHolders: []
        }
      }
    }
  },
  // ── GhanaGold Co. ───────────────────────────────────────────────────────────
  {
    name: "GhanaGold Co.",
    ucic: "UCO089874653",
    id: "CORP-GH-81597857",
    customerIds: ["CORP-GH-81597857"],
    type: "Corporate",
    riskScore: "High",
    riskLevel: 80,
    pepMatch: "NO",
    adverseMedia: "NO",
    cddEddTriggers: "YES",
    dormantAccounts: "NO",
    highRiskTransactions: { count: 2, countries: ["UAE", "Switzerland"] },
    strSarFiled: "YES",
    ctrFiled: "NO",
    leaRequests: "NO",
    activeAlerts: 2,
    status: "Active",
    kycStatus: "Verified",
    nationality: "Ghanaian",
    dob: "15-03-2008",
    occupation: "Precious Metals Trading & Refining",
    employer: "GhanaGold Co.",
    phone: "+233-30-281-4400",
    email: "info@ghanagoldco.gh",
    address: { line1: "Ambassadorial Enclave, East Legon", city: "Accra", zip: "GA-100" },
    previousNames: "GhanaGold Co.",
    placeOfBirth: "Accra, Ghana",
    gender: "N/A",
    multipleCitizenships: ["Ghana"],
    residentStatus: "Resident",
    primaryAddress: "Ambassadorial Enclave, East Legon, Accra, Ghana",
    secondaryAddresses: [],
    businessSegment: "Corporate",
    customerSegment: ["Corporate Banking"],
    onboardingDate: "10-02-2015",
    onboardingChannel: "Branch",
    channelUsage: { branch: "60%", digital: "35%", agent: "5%" },
    idInfo: {
      aadhar: { type: "Ghana Reg. No.", number: "CS-2008-GH-44821" },
      passport: { type: "Ghana Investment License", number: "GIL-PM-20081122", expiry: "2028-12-31", issuedBy: "Ghana Investment Promotion Centre" },
      pan: { type: "TIN (Ghana)", number: "C0012874501" }
    },
    fatcaStatus: "Not applicable",
    leaStatus: "Non-Reportable",
    identification: [
      { type: "Ghana Registration No.", number: "CS-2008-GH-44821", status: "Verified" },
      { type: "Precious Metals License", number: "GIL-PM-20081122", status: "Verified", expiry: "2028-12-31" },
      { type: "TIN (Ghana)", number: "C0012874501", status: "Verified" }
    ],
    relationships: {
      ubo: [],
      family: [],
      associates: [],
      jointHolders: [],
      poa: [],
      pep: { isPep: false, details: "" }
    },
    screening: {
      overallStatus: "Flagged",
      sanctions: [],
      pep: { status: "Clear", details: "", matches: [] },
      adverseMedia: [
        { source: "West Africa Financial Monitor", date: "2025-08-12", snippet: "GhanaGold Co. cited in report on informal gold smuggling routes in West Africa.", name: "GhanaGold Co.", watchlist: "Global Media Check", percentage: 70, link: "#" }
      ],
      watchlistMatches: [],
      history: [
        { date: "2025-08-15", watchlists: "Adverse Media", caseId: "CS-3301" }
      ]
    },
    riskProfile: {
      overall: { score: 80, level: "High", lastUpdated: "2025-08-15" },
      geographic: {
        riskLevel: "High",
        score: 70,
        residence: { country: "Ghana", fatfBlack: "N", fatfGrey: "Y", taxEvasion: "N", otherHighRisk: "Y" },
        citizenship: { country: "Ghana", fatfBlack: "N", fatfGrey: "Y", taxEvasion: "N", otherHighRisk: "Y" }
      },
      highRiskTxnCountries: [
        { country: "UAE", fatfBlack: "N", fatfGrey: "Y", taxEvasion: "N", otherHighRisk: "N", details: "Gold trade payments" },
        { country: "Switzerland", fatfBlack: "N", fatfGrey: "N", taxEvasion: "Y", otherHighRisk: "N", details: "Refinery settlements" }
      ],
      productChannelRisk: [
        { type: "Service", name: "International Wire", risk: "High" },
        { type: "Product", name: "Trade Finance", risk: "High" }
      ],
      customerTypeRisk: { type: "Corporate – Precious Metals", risk: "High" },
      occupationRisk: { isHighRisk: "Y", value: "Precious Metals Trading" },
      industryRisk: { isHighRisk: "Y", sector: "Mining & Precious Metals", details: "High MLRO risk sector" },
      behavioral: {
        score: 65,
        level: "Medium",
        alerts: [
          { name: "Cross-border high-value transactions", deviation: 30, details: "Frequent large transfers to UAE and Switzerland" }
        ]
      },
      relatedPartiesRisk: { score: 40, level: "Medium" },
      history: [
        { date: "2025-08-15", score: 80, level: "High", reason: "Adverse Media + High-risk TXN Countries" },
        { date: "2020-01-01", score: 55, level: "Medium", reason: "Periodic Review" }
      ],
      overrides: []
    },
    kycProfile: {
      status: "Verified",
      lastReviewDate: "2025-08-01",
      nextReviewDate: "2026-02-01",
      documents: [
        { type: "Certificate of Incorporation", id: "CS-2008-GH-44821", status: "Verified", date: "2008-03-15" },
        { type: "Precious Metals License", id: "GIL-PM-20081122", status: "Verified", expiry: "2028-12-31" }
      ],
      newProducts: [],
      triggers: [
        { type: "High Risk Industry", detail: "Precious metals – EDD required", date: "2025-08-01" },
        { type: "Adverse Media", detail: "Gold smuggling route citation", date: "2025-08-12" }
      ],
      sourceOfFunds: ["Gold Sales Revenue", "Refinery Contracts"],
      sourceOfWealth: ["Mining Concession Revenue since 2008"],
      riskEvolution: [
        { date: "2015", score: 35 },
        { date: "2020", score: 55 },
        { date: "2025", score: 80 }
      ],
      changeLog: [
        { field: "Risk Score", old: "Medium (55)", new: "High (80)", user: "System", date: "2025-08-15" }
      ]
    },
    accountsProfile: {
      summary: [
        { id: "ACC-GH-9901", institution: "Standard Chartered Ghana", type: "Current Account", balance: "$485,000", currency: "USD", status: "Active", openDate: "2015-02-10" }
      ],
      limits: { transaction: "$5,00,000 / day", cash: "$50,000 / day", fx: "$5,000,000 / year" },
      products: ["Current Account", "Trade Finance", "FX Services"],
      dormant: []
    },
    transactionsProfile: {
      summary: {
        daily: { volume: 5, value: "$120,000" },
        monthly: { volume: 150, value: "$3.6M" },
        ytd: { volume: 1800, value: "$43M" },
        breakdown: { cash: 5, nonCash: 95, domestic: 20, crossBorder: 80 }
      },
      topCounterparties: [
        { name: "Dubai Gold & Commodities Exchange", count: 40, amount: "$18M" },
        { name: "Swiss Refinery AG", count: 25, amount: "$12M" }
      ],
      topCountries: [
        { code: "AE", name: "UAE", amount: "$18M", count: 40 },
        { code: "CH", name: "Switzerland", amount: "$12M", count: 25 },
        { code: "GH", name: "Ghana", amount: "$13M", count: 1735 }
      ],
      topAlerts: [
        { name: "High Value Cross-border", count: 2, severity: "High" }
      ],
      unusualPatterns: [
        { name: "Remittance destination not matching Nationality", triggered: true, alertId: "ALT-GH-01", details: "Large flows to UAE and Switzerland" }
      ],
      trends: { surges: "Seasonal spike Q4 (gold prices)", outliers: "2 transactions > 3σ", peerProfile: "Higher than peer group", nationalityMismatch: "Detected – UAE/Switzerland" },
      highRiskCorridors: { detected: true, details: "West Africa–UAE precious metals corridor", corridors: ["West Africa–Gulf", "West Africa–Switzerland"] }
    },
    alertsProfile: {
      active: [
        { id: "ALT-GH-101", rule: "High Value Cross-border", amount: "$280,000", severity: "High", status: "Open", date: "15 Aug 2025", details: "Transfer to Swiss refinery exceeds threshold" },
        { id: "ALT-GH-102", rule: "Adverse Media Match", amount: "N/A", severity: "Medium", status: "In Progress", date: "12 Aug 2025", details: "Adverse media hit – gold smuggling report" }
      ],
      history: [],
      stats: { totalActiveVolume: "$280,000", activeCount: 2, closedCount: 8, falsePositiveRate: 50, alertVolumePercentage: 0.6 },
      rfi: { count: 1, lastRequest: "2025-08-15", status: "Pending Response", items: [{ type: "Proof of Trade Documentation", date: "15 Aug 2025", status: "Pending" }] },
      fundingSources: [
        { type: "Gold Sales (Export)", percent: 75, trend: "Stable" },
        { type: "Wires (USD)", percent: 25, trend: "Increasing" }
      ]
    },
    regReportsProfile: {
      jurisdiction: "Ghana",
      strFiled: { isFiled: true, date: "20 Aug 2025", id: "STR-GH-2025-001", status: "Filed", link: "#" },
      ctrFiled: { isFiled: false, date: "", details: "", link: "#" },
      leaRequests: { hasRequest: false, date: "", agency: "", type: "", link: "#" },
      accountFrozen: { isFrozen: false, date: "", reason: "" }
    },
    audit: [
      { id: "LOG-GH-01", category: "Risk", action: "Risk Upgraded to High", date: "15 Aug 2025 11:30", user: "System (Auto)", approver: "Compliance Manager", details: "Adverse media and high-risk corridor detected.", changes: { from: "Medium", to: "High" } }
    ],
    riskFactors: {
      kyc: [
        { label: "Nationality/ Geographic Risk", high: true },
        { label: "Occupation", high: true },
        { label: "Fatca", high: false }
      ],
      relatedParties: [
        { label: "PEP Match", high: false },
        { label: "Related Party High risk", high: false }
      ],
      sanctionMatch: [
        { label: "PEP Match", high: false },
        { label: "Adverse Match", high: true },
        { label: "Sanction Match", high: false }
      ],
      riskProfile: [
        { label: "Transaction in High-risk Countries", high: true },
        { label: "Industry Risk", high: true },
        { label: "Behaviour Risk", high: true },
        { label: "Overall Risk", high: true },
        { label: "Manual Risk Change", high: false }
      ],
      cddEdd: [
        { label: "CDD/EDD Triggers \"YES\"", high: true },
        { label: "Profile Change \"YES\"", high: false }
      ],
      account: [{ label: "Dormant", high: false }],
      transactions: [
        { label: "High Risk Countries Alerts", high: true },
        { label: "High Risk Triggers", high: true }
      ],
      lea: [{ label: "LEA Request \"YES\"", high: false }],
      regulatory: [{ label: "YES/ CTR", high: false }]
    },
    subProfiles: {
      "CORP-GH-81597857": {
        previousNames: "GhanaGold Co.",
        dob: "15-03-2008",
        placeOfBirth: "Accra, Ghana",
        phone: "+233-30-281-4400",
        email: "info@ghanagoldco.gh",
        gender: "N/A",
        multipleCitizenships: ["Ghana"],
        occupation: "Precious Metals Trading & Refining",
        employer: "GhanaGold Co.",
        businessSegment: "Corporate",
        customerSegment: ["Corporate Banking"],
        onboardingDate: "10-02-2015",
        onboardingChannel: "Branch",
        fatcaStatus: "Not applicable",
        leaStatus: "Non-Reportable",
        residentStatus: "Resident",
        relationships: {
          ubo: [],
          family: [],
          associates: [],
          jointHolders: []
        }
      }
    }
  },
  // ── East Africa Logistics Group (EALG) ──────────────────────────────────────
  {
    name: "East Africa Logistics Group",
    ucic: "UCO089874654",
    id: "CORP-KE-81597858",
    customerIds: ["CORP-KE-81597858"],
    type: "Corporate",
    riskScore: "Medium",
    riskLevel: 55,
    pepMatch: "NO",
    adverseMedia: "NO",
    cddEddTriggers: "NO",
    dormantAccounts: "NO",
    highRiskTransactions: { count: 1, countries: ["Somalia"] },
    strSarFiled: "NO",
    ctrFiled: "NO",
    leaRequests: "NO",
    activeAlerts: 1,
    status: "Active",
    kycStatus: "Verified",
    nationality: "Kenyan",
    dob: "14-06-2014",
    occupation: "Freight & Logistics",
    employer: "East Africa Logistics Group",
    phone: "+254-20-441-8800",
    email: "info@ealg.co.ke",
    address: { line1: "Upper Hill Business Park, Milimani Road", city: "Nairobi", zip: "00100" },
    previousNames: "East Africa Logistics Group",
    placeOfBirth: "Nairobi, Kenya",
    gender: "N/A",
    multipleCitizenships: ["Kenya"],
    residentStatus: "Resident",
    primaryAddress: "Upper Hill Business Park, Milimani Road, Nairobi, Kenya – 00100",
    secondaryAddresses: [],
    businessSegment: "Corporate",
    customerSegment: ["Corporate Banking"],
    onboardingDate: "20-11-2014",
    onboardingChannel: "Branch",
    channelUsage: { branch: "40%", digital: "55%", agent: "5%" },
    idInfo: {
      aadhar: { type: "Kenya Reg. No.", number: "PVT-2014-KE-8821" },
      passport: { type: "Kenya Revenue Authority PIN", number: "P051234567B", expiry: "N/A", issuedBy: "KRA" },
      pan: { type: "VAT Number", number: "KE-VAT-19284756" }
    },
    fatcaStatus: "Not applicable",
    leaStatus: "Non-Reportable",
    identification: [
      { type: "Kenya Registration No.", number: "PVT-2014-KE-8821", status: "Verified" },
      { type: "KRA PIN", number: "P051234567B", status: "Verified" },
      { type: "VAT Number", number: "KE-VAT-19284756", status: "Verified" }
    ],
    relationships: {
      ubo: [
        {
          name: "James Kariuki Mwangi",
          designation: "Director",
          nationality: "Kenyan",
          ownership: null,
          din: "KE-D-00482103",
          pepStatus: "No",
          sanctions: "Clear"
        },
        {
          name: "Amina Hassan Osman",
          designation: "Director",
          nationality: "Kenyan / Somali",
          ownership: null,
          din: "KE-D-00482104",
          pepStatus: "—",
          sanctions: "Clear"
        },
        {
          name: "Mwangi Family Holdings",
          designation: "UBO (Holding Entity)",
          nationality: "Kenyan",
          ownership: 61,
          pepStatus: "No",
          sanctions: "Clear"
        }
      ],
      family: [],
      associates: [
        { name: "James Kariuki Mwangi", role: "Director", share: "N/A", din: "KE-D-00482103" },
        { name: "Amina Hassan Osman", role: "Director", share: "N/A", din: "KE-D-00482104" }
      ],
      jointHolders: [],
      poa: [],
      pep: { isPep: false, details: "" }
    },
    screening: {
      overallStatus: "Clear",
      sanctions: [],
      pep: { status: "Clear", details: "", matches: [] },
      adverseMedia: [],
      watchlistMatches: [],
      history: [
        { date: "2025-10-01", watchlists: "All Lists", caseId: "CS-4801" }
      ]
    },
    riskProfile: {
      overall: { score: 55, level: "Medium", lastUpdated: "2025-10-01" },
      geographic: {
        riskLevel: "Medium",
        score: 45,
        residence: { country: "Kenya", fatfBlack: "N", fatfGrey: "N", taxEvasion: "N", otherHighRisk: "N" },
        citizenship: { country: "Kenya", fatfBlack: "N", fatfGrey: "N", taxEvasion: "N", otherHighRisk: "N" }
      },
      highRiskTxnCountries: [
        { country: "Somalia", fatfBlack: "N", fatfGrey: "Y", taxEvasion: "N", otherHighRisk: "Y", details: "Regional logistics routes" }
      ],
      productChannelRisk: [
        { type: "Service", name: "Cross-border Trade Finance", risk: "Medium" }
      ],
      customerTypeRisk: { type: "Corporate – Logistics", risk: "Medium" },
      occupationRisk: { isHighRisk: "N", value: "Freight & Logistics" },
      industryRisk: { isHighRisk: "N", sector: "Transport & Logistics", details: "Standard risk" },
      behavioral: { score: 40, level: "Medium", alerts: [] },
      relatedPartiesRisk: { score: 30, level: "Low" },
      history: [
        { date: "2025-10-01", score: 55, level: "Medium", reason: "Periodic Review" }
      ],
      overrides: []
    },
    kycProfile: {
      status: "Verified",
      lastReviewDate: "2025-10-01",
      nextReviewDate: "2026-10-01",
      documents: [
        { type: "Certificate of Incorporation", id: "PVT-2014-KE-8821", status: "Verified", date: "2014-06-14" }
      ],
      newProducts: [],
      triggers: [],
      sourceOfFunds: ["Logistics Revenue", "Freight Contract Payments"],
      sourceOfWealth: ["Business Operations since 2014"],
      riskEvolution: [
        { date: "2015", score: 20 },
        { date: "2020", score: 40 },
        { date: "2025", score: 55 }
      ],
      changeLog: []
    },
    accountsProfile: {
      summary: [
        { id: "ACC-KE-5501", institution: "Kenya Commercial Bank", type: "Current Account", balance: "KSH 12,500,000", currency: "KSH", status: "Active", openDate: "2014-11-20" }
      ],
      limits: { transaction: "KSH 50,000,000 / day", cash: "KSH 2,000,000 / day", fx: "$200,000 / year" },
      products: ["Current Account", "Trade Finance", "FX Services"],
      dormant: []
    },
    transactionsProfile: {
      summary: {
        daily: { volume: 12, value: "KSH 850,000" },
        monthly: { volume: 360, value: "KSH 25M" },
        ytd: { volume: 4320, value: "KSH 300M" },
        breakdown: { cash: 10, nonCash: 90, domestic: 70, crossBorder: 30 }
      },
      topCounterparties: [
        { name: "Mombasa Port Authority", count: 120, amount: "KSH 80M" },
        { name: "Ethiopian Airlines Cargo", count: 60, amount: "KSH 45M" }
      ],
      topCountries: [
        { code: "KE", name: "Kenya", amount: "KSH 210M", count: 3024 },
        { code: "TZ", name: "Tanzania", amount: "KSH 55M", count: 864 },
        { code: "SO", name: "Somalia", amount: "KSH 35M", count: 432 }
      ],
      topAlerts: [
        { name: "High-risk Country TXN", count: 1, severity: "Medium" }
      ],
      unusualPatterns: [
        { name: "Remittance destination not matching Nationality", triggered: false, alertId: null, details: "Regional logistics – expected" }
      ],
      trends: { surges: "None detected", outliers: "None", peerProfile: "Normal", nationalityMismatch: "None detected" },
      highRiskCorridors: { detected: false, details: "", corridors: [] }
    },
    alertsProfile: {
      active: [
        { id: "ALT-KE-201", rule: "High-risk Country TXN", amount: "KSH 35M", severity: "Medium", status: "In Progress", date: "01 Oct 2025", details: "Transactions to Somalia – logistics route" }
      ],
      history: [],
      stats: { totalActiveVolume: "KSH 35M", activeCount: 1, closedCount: 4, falsePositiveRate: 75, alertVolumePercentage: 0.4 },
      rfi: { count: 0, lastRequest: "", status: "None", items: [] },
      fundingSources: [
        { type: "Freight Revenue", percent: 85, trend: "Stable" },
        { type: "Government Contracts", percent: 15, trend: "Stable" }
      ]
    },
    regReportsProfile: {
      jurisdiction: "Kenya",
      strFiled: { isFiled: false, date: "", id: "", status: "Not Filed", link: "#" },
      ctrFiled: { isFiled: false, date: "", details: "", link: "#" },
      leaRequests: { hasRequest: false, date: "", agency: "", type: "", link: "#" },
      accountFrozen: { isFrozen: false, date: "", reason: "" }
    },
    audit: [
      { id: "LOG-KE-01", category: "KYC", action: "Annual Review Completed", date: "01 Oct 2025 09:00", user: "KYC Team", approver: "Compliance Manager", details: "Risk maintained at Medium.", changes: null }
    ],
    riskFactors: {
      kyc: [
        { label: "Nationality/ Geographic Risk", high: false },
        { label: "Occupation", high: false },
        { label: "Fatca", high: false }
      ],
      relatedParties: [
        { label: "PEP Match", high: false },
        { label: "Related Party High risk", high: false }
      ],
      sanctionMatch: [
        { label: "PEP Match", high: false },
        { label: "Adverse Match", high: false },
        { label: "Sanction Match", high: false }
      ],
      riskProfile: [
        { label: "Transaction in High-risk Countries", high: true },
        { label: "Industry Risk", high: false },
        { label: "Behaviour Risk", high: false },
        { label: "Overall Risk", high: false },
        { label: "Manual Risk Change", high: false }
      ],
      cddEdd: [
        { label: "CDD/EDD Triggers \"YES\"", high: false },
        { label: "Profile Change \"YES\"", high: false }
      ],
      account: [{ label: "Dormant", high: false }],
      transactions: [
        { label: "High Risk Countries Alerts", high: true },
        { label: "High Risk Triggers", high: false }
      ],
      lea: [{ label: "LEA Request \"YES\"", high: false }],
      regulatory: [{ label: "YES/ CTR", high: false }]
    },
    subProfiles: {
      "CORP-KE-81597858": {
        previousNames: "East Africa Logistics Group",
        dob: "14-06-2014",
        placeOfBirth: "Nairobi, Kenya",
        phone: "+254-20-441-8800",
        email: "info@ealg.co.ke",
        gender: "N/A",
        multipleCitizenships: ["Kenya"],
        occupation: "Freight & Logistics",
        employer: "East Africa Logistics Group",
        businessSegment: "Corporate",
        customerSegment: ["Corporate Banking"],
        onboardingDate: "20-11-2014",
        onboardingChannel: "Branch",
        fatcaStatus: "Not applicable",
        leaStatus: "Non-Reportable",
        residentStatus: "Resident",
        relationships: {
          ubo: [
            { name: "James Kariuki Mwangi", designation: "Director", nationality: "Kenyan", ownership: null, din: "KE-D-00482103", pepStatus: "No", sanctions: "Clear" },
            { name: "Amina Hassan Osman", designation: "Director", nationality: "Kenyan / Somali", ownership: null, din: "KE-D-00482104", pepStatus: "—", sanctions: "Clear" },
            { name: "Mwangi Family Holdings", designation: "UBO (Holding Entity)", nationality: "Kenyan", ownership: 61, pepStatus: "No", sanctions: "Clear" }
          ],
          family: [],
          associates: [
            { name: "James Kariuki Mwangi", role: "Director", share: "N/A", din: "KE-D-00482103" },
            { name: "Amina Hassan Osman", role: "Director", share: "N/A", din: "KE-D-00482104" }
          ],
          jointHolders: []
        }
      }
    }
  },
  // ── NaijaTech Solutions Limited ─────────────────────────────────────────────
  {
    name: "NaijaTech Solutions Limited",
    ucic: "UCO089874655",
    id: "CORP-NG-81597859",
    customerIds: ["CORP-NG-81597859"],
    type: "Corporate",
    riskScore: "High",
    riskLevel: 75,
    pepMatch: "NO",
    adverseMedia: "YES",
    cddEddTriggers: "YES",
    dormantAccounts: "NO",
    highRiskTransactions: { count: 3, countries: ["UAE", "Hong Kong"] },
    strSarFiled: "YES",
    ctrFiled: "NO",
    leaRequests: "YES",
    activeAlerts: 3,
    status: "Active",
    kycStatus: "Verified",
    nationality: "Nigerian",
    dob: "22-09-2012",
    occupation: "Information Technology Services",
    employer: "NaijaTech Solutions Limited",
    phone: "+234-1-461-8800",
    email: "compliance@naijatech.ng",
    address: { line1: "Plot 4, Adeola Odeku Street, Victoria Island", city: "Lagos", zip: "101241" },
    previousNames: "NaijaTech Solutions Limited",
    placeOfBirth: "Lagos, Nigeria",
    gender: "N/A",
    multipleCitizenships: ["Nigeria"],
    residentStatus: "Resident",
    primaryAddress: "Plot 4, Adeola Odeku Street, Victoria Island, Lagos, Nigeria",
    secondaryAddresses: [],
    businessSegment: "Corporate",
    customerSegment: ["Corporate Banking"],
    onboardingDate: "15-01-2013",
    onboardingChannel: "Branch",
    channelUsage: { branch: "20%", digital: "75%", agent: "5%" },
    idInfo: {
      aadhar: { type: "CAC Registration No.", number: "RC-4782631" },
      passport: { type: "FIRS TIN", number: "NG-TIN-02938471", expiry: "N/A", issuedBy: "FIRS Nigeria" },
      pan: { type: "VAT Number", number: "01234567-0001" }
    },
    fatcaStatus: "Not applicable",
    leaStatus: "Reportable",
    identification: [
      { type: "CAC Registration No.", number: "RC-4782631", status: "Verified" },
      { type: "FIRS TIN", number: "NG-TIN-02938471", status: "Verified" },
      { type: "VAT Number", number: "01234567-0001", status: "Verified" }
    ],
    relationships: {
      ubo: [
        {
          name: "Oluwaseun Akinwale Adeyemi",
          designation: "Director / Majority Shareholder (UBO)",
          nationality: "Nigerian",
          ownership: 52,
          din: "RC-D-0482910",
          pepStatus: "No",
          sanctions: "Clear"
        },
        {
          name: "Chinyere Nneka Obiora",
          designation: "Director",
          nationality: "Nigerian",
          ownership: null,
          din: "RC-D-0482911",
          pepStatus: "—",
          sanctions: "Clear"
        }
      ],
      family: [],
      associates: [
        { name: "Oluwaseun Akinwale Adeyemi", role: "Director / Majority Shareholder", share: "52%", din: "RC-D-0482910" },
        { name: "Chinyere Nneka Obiora", role: "Director", share: "N/A", din: "RC-D-0482911" }
      ],
      jointHolders: [],
      poa: [],
      pep: { isPep: false, details: "" }
    },
    screening: {
      overallStatus: "Flagged",
      sanctions: [],
      pep: { status: "Clear", details: "", matches: [] },
      adverseMedia: [
        { source: "This Day (Nigeria)", date: "2025-07-20", snippet: "NaijaTech Solutions cited in EFCC investigation on alleged cybercrime facilitation.", name: "NaijaTech Solutions Limited", watchlist: "Global Media Check", percentage: 80, link: "#" }
      ],
      watchlistMatches: [],
      history: [
        { date: "2025-07-25", watchlists: "Adverse Media", caseId: "CS-6601" }
      ]
    },
    riskProfile: {
      overall: { score: 75, level: "High", lastUpdated: "2025-07-25" },
      geographic: {
        riskLevel: "High",
        score: 65,
        residence: { country: "Nigeria", fatfBlack: "N", fatfGrey: "Y", taxEvasion: "N", otherHighRisk: "Y" },
        citizenship: { country: "Nigeria", fatfBlack: "N", fatfGrey: "Y", taxEvasion: "N", otherHighRisk: "Y" }
      },
      highRiskTxnCountries: [
        { country: "UAE", fatfBlack: "N", fatfGrey: "Y", taxEvasion: "N", otherHighRisk: "N", details: "IT service payments" },
        { country: "Hong Kong", fatfBlack: "N", fatfGrey: "N", taxEvasion: "Y", otherHighRisk: "N", details: "Software vendor payments" }
      ],
      productChannelRisk: [
        { type: "Service", name: "International Wire", risk: "High" },
        { type: "Channel", name: "Online Banking", risk: "Medium" }
      ],
      customerTypeRisk: { type: "Corporate – IT", risk: "High" },
      occupationRisk: { isHighRisk: "N", value: "Information Technology" },
      industryRisk: { isHighRisk: "Y", sector: "IT Services – Nigeria", details: "EFCC investigation risk" },
      behavioral: {
        score: 65,
        level: "Medium",
        alerts: [
          { name: "Adverse media – EFCC link", deviation: 0, details: "Corporate name cited in EFCC investigation" }
        ]
      },
      relatedPartiesRisk: { score: 45, level: "Medium" },
      history: [
        { date: "2025-07-25", score: 75, level: "High", reason: "Adverse Media – EFCC Investigation" },
        { date: "2020-01-01", score: 45, level: "Medium", reason: "Periodic Review" }
      ],
      overrides: []
    },
    kycProfile: {
      status: "Verified",
      lastReviewDate: "2025-07-25",
      nextReviewDate: "2026-01-25",
      documents: [
        { type: "CAC Certificate", id: "RC-4782631", status: "Verified", date: "2012-09-22" }
      ],
      newProducts: [],
      triggers: [
        { type: "Adverse Media", detail: "EFCC investigation citation", date: "2025-07-25" },
        { type: "LEA Request", detail: "EFCC inquiry received", date: "2025-07-28" }
      ],
      sourceOfFunds: ["IT Service Revenue", "Software Licensing"],
      sourceOfWealth: ["Business Operations since 2012"],
      riskEvolution: [
        { date: "2015", score: 30 },
        { date: "2020", score: 45 },
        { date: "2025", score: 75 }
      ],
      changeLog: [
        { field: "Risk Score", old: "Medium (45)", new: "High (75)", user: "System", date: "2025-07-25" }
      ]
    },
    accountsProfile: {
      summary: [
        { id: "ACC-NG-7701", institution: "GTBank Nigeria", type: "Current Account", balance: "₦185,000,000", currency: "NGN", status: "Active", openDate: "2013-01-15" }
      ],
      limits: { transaction: "₦500,000,000 / day", cash: "₦10,000,000 / day", fx: "$500,000 / year" },
      products: ["Current Account", "Trade Finance", "Online Banking"],
      dormant: []
    },
    transactionsProfile: {
      summary: {
        daily: { volume: 15, value: "₦8M" },
        monthly: { volume: 450, value: "₦240M" },
        ytd: { volume: 5400, value: "₦2.9Bn" },
        breakdown: { cash: 5, nonCash: 95, domestic: 60, crossBorder: 40 }
      },
      topCounterparties: [
        { name: "Dubai Tech Hub LLC", count: 80, amount: "$420,000" },
        { name: "HK Software Vendors", count: 50, amount: "$280,000" }
      ],
      topCountries: [
        { code: "NG", name: "Nigeria", amount: "₦1.75Bn", count: 3240 },
        { code: "AE", name: "UAE", amount: "$420K", count: 1080 },
        { code: "HK", name: "Hong Kong", amount: "$280K", count: 1080 }
      ],
      topAlerts: [
        { name: "Adverse Media Match", count: 1, severity: "High" },
        { name: "High Value Cross-border", count: 2, severity: "High" }
      ],
      unusualPatterns: [
        { name: "Remittance destination not matching Nationality", triggered: true, alertId: "ALT-NG-01", details: "Large flows to UAE and HK" }
      ],
      trends: { surges: "Spike detected (Jul 2025)", outliers: "3 transactions > 3σ", peerProfile: "Higher than peer group", nationalityMismatch: "Detected" },
      highRiskCorridors: { detected: true, details: "Nigeria–UAE tech payments corridor flagged", corridors: ["Nigeria–UAE", "Nigeria–Hong Kong"] }
    },
    alertsProfile: {
      active: [
        { id: "ALT-NG-301", rule: "Adverse Media Match", amount: "N/A", severity: "High", status: "Open", date: "25 Jul 2025", details: "EFCC investigation citation" },
        { id: "ALT-NG-302", rule: "High Value Cross-border", amount: "$420,000", severity: "High", status: "Open", date: "20 Jul 2025", details: "Transfer to Dubai Tech Hub" },
        { id: "ALT-NG-303", rule: "LEA Request Received", amount: "N/A", severity: "High", status: "In Progress", date: "28 Jul 2025", details: "EFCC formal inquiry" }
      ],
      history: [],
      stats: { totalActiveVolume: "$420,000", activeCount: 3, closedCount: 6, falsePositiveRate: 40, alertVolumePercentage: 1.5 },
      rfi: { count: 2, lastRequest: "2025-07-28", status: "Pending Response", items: [{ type: "EFCC Inquiry Response", date: "28 Jul 2025", status: "Pending" }, { type: "Source of Funds", date: "25 Jul 2025", status: "Pending" }] },
      fundingSources: [
        { type: "Client Payments (NGN)", percent: 60, trend: "Stable" },
        { type: "Wires (USD)", percent: 40, trend: "Increasing" }
      ]
    },
    regReportsProfile: {
      jurisdiction: "Nigeria",
      strFiled: { isFiled: true, date: "30 Jul 2025", id: "STR-NG-2025-003", status: "Filed", link: "#" },
      ctrFiled: { isFiled: false, date: "", details: "", link: "#" },
      leaRequests: { hasRequest: true, date: "28 Jul 2025", agency: "EFCC", type: "Investigation Inquiry", link: "#" },
      accountFrozen: { isFrozen: false, date: "", reason: "" }
    },
    audit: [
      { id: "LOG-NG-01", category: "Risk", action: "Risk Upgraded to High", date: "25 Jul 2025 10:00", user: "System (Auto)", approver: "Compliance Manager", details: "Adverse media – EFCC citation.", changes: { from: "Medium", to: "High" } }
    ],
    riskFactors: {
      kyc: [
        { label: "Nationality/ Geographic Risk", high: true },
        { label: "Occupation", high: false },
        { label: "Fatca", high: false }
      ],
      relatedParties: [
        { label: "PEP Match", high: false },
        { label: "Related Party High risk", high: false }
      ],
      sanctionMatch: [
        { label: "PEP Match", high: false },
        { label: "Adverse Match", high: true },
        { label: "Sanction Match", high: false }
      ],
      riskProfile: [
        { label: "Transaction in High-risk Countries", high: true },
        { label: "Industry Risk", high: true },
        { label: "Behaviour Risk", high: true },
        { label: "Overall Risk", high: true },
        { label: "Manual Risk Change", high: false }
      ],
      cddEdd: [
        { label: "CDD/EDD Triggers \"YES\"", high: true },
        { label: "Profile Change \"YES\"", high: false }
      ],
      account: [{ label: "Dormant", high: false }],
      transactions: [
        { label: "High Risk Countries Alerts", high: true },
        { label: "High Risk Triggers", high: true }
      ],
      lea: [{ label: "LEA Request \"YES\"", high: true }],
      regulatory: [{ label: "YES/ CTR", high: false }]
    },
    subProfiles: {
      "CORP-NG-81597859": {
        previousNames: "NaijaTech Solutions Limited",
        dob: "22-09-2012",
        placeOfBirth: "Lagos, Nigeria",
        phone: "+234-1-461-8800",
        email: "compliance@naijatech.ng",
        gender: "N/A",
        multipleCitizenships: ["Nigeria"],
        occupation: "Information Technology Services",
        employer: "NaijaTech Solutions Limited",
        businessSegment: "Corporate",
        customerSegment: ["Corporate Banking"],
        onboardingDate: "15-01-2013",
        onboardingChannel: "Branch",
        fatcaStatus: "Not applicable",
        leaStatus: "Reportable",
        residentStatus: "Resident",
        relationships: {
          ubo: [
            { name: "Oluwaseun Akinwale Adeyemi", designation: "Director / Majority Shareholder (UBO)", nationality: "Nigerian", ownership: 52, din: "RC-D-0482910", pepStatus: "No", sanctions: "Clear" },
            { name: "Chinyere Nneka Obiora", designation: "Director", nationality: "Nigerian", ownership: null, din: "RC-D-0482911", pepStatus: "—", sanctions: "Clear" }
          ],
          family: [],
          associates: [
            { name: "Oluwaseun Akinwale Adeyemi", role: "Director / Majority Shareholder", share: "52%", din: "RC-D-0482910" },
            { name: "Chinyere Nneka Obiora", role: "Director", share: "N/A", din: "RC-D-0482911" }
          ],
          jointHolders: []
        }
      }
    }
  },
  // ── Abdullah Khalid Al-Rashidi ───────────────────────────────────────────────
  {
    name: "Abdullah Khalid Al-Rashidi",
    ucic: "UCO089874656",
    id: "CUST-2374362",
    customerIds: ["CUST-2374362"],
    type: "Individual",
    riskScore: "High",
    riskLevel: 70,
    pepMatch: "YES",
    adverseMedia: "NO",
    cddEddTriggers: "YES",
    dormantAccounts: "NO",
    highRiskTransactions: { count: 1, countries: ["Ghana"] },
    strSarFiled: "YES",
    ctrFiled: "NO",
    leaRequests: "NO",
    activeAlerts: 2,
    status: "Active",
    kycStatus: "Verified",
    nationality: "Emirati",
    dob: "15-03-1982",
    occupation: "Accountant",
    employer: "Dubai Municipality",
    phone: "+971-50-481-2930",
    email: "a.alrashidi@dubaimunicipality.ae",
    address: { line1: "Villa 42, Al Barsha 1", city: "Dubai", zip: "00000" },
    previousNames: "Abdullah Khalid Al-Rashidi",
    placeOfBirth: "Dubai, UAE",
    gender: "Male",
    multipleCitizenships: ["UAE", "Ghana"],
    residentStatus: "Resident",
    primaryAddress: "Villa 42, Al Barsha 1, Dubai, UAE",
    secondaryAddresses: [],
    businessSegment: "Salaried",
    customerSegment: ["HNI"],
    onboardingDate: "15-10-2015",
    onboardingChannel: "Branch",
    channelUsage: { branch: "35%", digital: "60%", agent: "5%" },
    idInfo: {
      aadhar: { type: "Emirates ID", number: "784-1982-1234567-0" },
      passport: { type: "UAE Passport", number: "UAE-P-4829301", expiry: "2029-03-15", issuedBy: "UAE Ministry of Interior" },
      pan: { type: "Ghana Passport", number: "GH-P-G1234567", expiry: "2030-06-20", issuedBy: "Ghana Immigration Service" }
    },
    fatcaStatus: "Not applicable",
    leaStatus: "Non-Reportable",
    identification: [
      { type: "Emirates ID", number: "784-1982-1234567-0", status: "Verified" },
      { type: "UAE Passport", number: "UAE-P-4829301", status: "Verified", expiry: "2029-03-15" },
      { type: "Ghana Passport", number: "GH-P-G1234567", status: "Verified", expiry: "2030-06-20" }
    ],
    relationships: {
      ubo: [],
      family: [
        { name: "Fatima Ali Al-Rashidi", relation: "Spouse", dob: "1986-05-20", hasAccount: false, kycStatus: "Not Verified" }
      ],
      associates: [],
      jointHolders: [],
      poa: [],
      pep: { isPep: true, details: "Government employee – Dubai Municipality (PEP by association)" }
    },
    screening: {
      overallStatus: "Flagged",
      sanctions: [],
      pep: {
        status: "Confirmed",
        details: "Government employee – Dubai Municipality",
        matches: [
          { name: "Abdullah Khalid Al-Rashidi", watchlist: "WorldCheck PEP", percentage: 90, details: "Dubai Municipality Government Official", link: "#" }
        ]
      },
      adverseMedia: [],
      watchlistMatches: [],
      history: [
        { date: "2025-10-15", watchlists: "PEP Lists", caseId: "CS-7201" }
      ]
    },
    riskProfile: {
      overall: { score: 70, level: "High", lastUpdated: "2025-10-15" },
      geographic: {
        riskLevel: "Medium",
        score: 50,
        residence: { country: "UAE", fatfBlack: "N", fatfGrey: "Y", taxEvasion: "N", otherHighRisk: "N" },
        citizenship: { country: "Ghana", fatfBlack: "N", fatfGrey: "Y", taxEvasion: "N", otherHighRisk: "Y" }
      },
      highRiskTxnCountries: [
        { country: "Ghana", fatfBlack: "N", fatfGrey: "Y", taxEvasion: "N", otherHighRisk: "Y", details: "Family remittances" }
      ],
      productChannelRisk: [
        { type: "Service", name: "International Remittance", risk: "High" },
        { type: "Channel", name: "Mobile App", risk: "Medium" }
      ],
      customerTypeRisk: { type: "HNI Individual – Government Employee", risk: "High" },
      occupationRisk: { isHighRisk: "Y", value: "Government Accountant – Dubai Municipality" },
      industryRisk: { isHighRisk: "Y", sector: "Government", details: "PEP designation" },
      behavioral: {
        score: 60,
        level: "Medium",
        alerts: [
          { name: "Cross-border remittances to Ghana", deviation: 20, details: "Dual citizenship – regular remittances" }
        ]
      },
      relatedPartiesRisk: { score: 40, level: "Medium" },
      history: [
        { date: "2025-10-15", score: 70, level: "High", reason: "PEP Confirmation + Dual Citizenship" },
        { date: "2015-10-15", score: 25, level: "Low", reason: "Onboarding" }
      ],
      overrides: []
    },
    kycProfile: {
      status: "Verified",
      lastReviewDate: "2025-10-01",
      nextReviewDate: "2026-04-01",
      documents: [
        { type: "Emirates ID", id: "784-1982-1234567-0", status: "Verified", date: "2024-03-15" },
        { type: "UAE Passport", id: "UAE-P-4829301", status: "Verified", expiry: "2029-03-15" },
        { type: "Ghana Passport", id: "GH-P-G1234567", status: "Verified", expiry: "2030-06-20" }
      ],
      newProducts: [],
      triggers: [
        { type: "PEP Designation", detail: "Government employee confirmed as PEP", date: "2025-10-15" },
        { type: "Dual Citizenship", detail: "UAE + Ghana – EDD required", date: "2025-10-01" }
      ],
      sourceOfFunds: ["Salary – Dubai Municipality"],
      sourceOfWealth: ["Government Salary", "Family Inheritance (Ghana)"],
      riskEvolution: [
        { date: "2018", score: 30 },
        { date: "2022", score: 50 },
        { date: "2025", score: 70 }
      ],
      changeLog: [
        { field: "PEP Status", old: "No", new: "Yes", user: "Compliance Team", date: "2025-10-15" }
      ]
    },
    accountsProfile: {
      summary: [
        { id: "ACC-AE-4401", institution: "Emirates NBD", type: "Current Account", balance: "AED 285,000", currency: "AED", status: "Active", openDate: "2015-10-15" },
        { id: "ACC-AE-4402", institution: "Emirates NBD", type: "Savings Account", balance: "AED 120,000", currency: "AED", status: "Active", openDate: "2018-01-01" }
      ],
      limits: { transaction: "AED 500,000 / day", cash: "AED 20,000 / day", fx: "$100,000 / year" },
      products: ["Current Account", "Savings Account", "International Remittance", "Mobile Banking"],
      dormant: []
    },
    transactionsProfile: {
      summary: {
        daily: { volume: 5, value: "AED 8,500" },
        monthly: { volume: 150, value: "AED 255,000" },
        ytd: { volume: 1800, value: "AED 3.1M" },
        breakdown: { cash: 5, nonCash: 95, domestic: 65, crossBorder: 35 }
      },
      topCounterparties: [
        { name: "Fatima Al-Rashidi (Family Remittance)", count: 24, amount: "AED 144,000" },
        { name: "Dubai Municipality (Salary)", count: 12, amount: "AED 192,000" }
      ],
      topCountries: [
        { code: "AE", name: "UAE", amount: "AED 2M", count: 1170 },
        { code: "GH", name: "Ghana", amount: "AED 1.1M", count: 630 }
      ],
      topAlerts: [
        { name: "PEP Link", count: 1, severity: "High" },
        { name: "Cross-border to High-risk Country", count: 1, severity: "Medium" }
      ],
      unusualPatterns: [
        { name: "Remittance destination not matching Nationality", triggered: false, alertId: null, details: "Ghana citizenship explains Ghana remittances" }
      ],
      trends: { surges: "None detected", outliers: "None", peerProfile: "Normal", nationalityMismatch: "None (dual citizenship)" },
      highRiskCorridors: { detected: false, details: "", corridors: [] }
    },
    alertsProfile: {
      active: [
        { id: "ALT-AE-501", rule: "PEP Link Detected", amount: "N/A", severity: "High", status: "Open", date: "15 Oct 2025", details: "PEP confirmation – enhanced monitoring" },
        { id: "ALT-AE-502", rule: "Cross-border High-risk Country", amount: "AED 144,000", severity: "Medium", status: "In Progress", date: "10 Oct 2025", details: "Regular remittances to Ghana" }
      ],
      history: [],
      stats: { totalActiveVolume: "AED 144,000", activeCount: 2, closedCount: 8, falsePositiveRate: 70, alertVolumePercentage: 0.8 },
      rfi: { count: 1, lastRequest: "2025-10-15", status: "Pending Response", items: [{ type: "PEP Declaration Form", date: "15 Oct 2025", status: "Pending" }] },
      fundingSources: [
        { type: "Salary Credit (AED)", percent: 80, trend: "Stable" },
        { type: "Cash Deposits", percent: 20, trend: "Stable" }
      ]
    },
    regReportsProfile: {
      jurisdiction: "UAE",
      strFiled: { isFiled: true, date: "20 Oct 2025", id: "STR-AE-2025-001", status: "Filed", link: "#" },
      ctrFiled: { isFiled: false, date: "", details: "", link: "#" },
      leaRequests: { hasRequest: false, date: "", agency: "", type: "", link: "#" },
      accountFrozen: { isFrozen: false, date: "", reason: "" }
    },
    audit: [
      { id: "LOG-AE-01", category: "Screening", action: "PEP Confirmed", date: "15 Oct 2025 14:00", user: "Compliance Team", approver: "MLRO", details: "PEP status confirmed – Dubai Municipality government accountant.", changes: null }
    ],
    riskFactors: {
      kyc: [
        { label: "Nationality/ Geographic Risk", high: true },
        { label: "Occupation", high: true },
        { label: "Fatca", high: false }
      ],
      relatedParties: [
        { label: "PEP Match", high: true },
        { label: "Related Party High risk", high: false }
      ],
      sanctionMatch: [
        { label: "PEP Match", high: true },
        { label: "Adverse Match", high: false },
        { label: "Sanction Match", high: false }
      ],
      riskProfile: [
        { label: "Transaction in High-risk Countries", high: true },
        { label: "Industry Risk", high: true },
        { label: "Behaviour Risk", high: false },
        { label: "Overall Risk", high: true },
        { label: "Manual Risk Change", high: false }
      ],
      cddEdd: [
        { label: "CDD/EDD Triggers \"YES\"", high: true },
        { label: "Profile Change \"YES\"", high: false }
      ],
      account: [{ label: "Dormant", high: false }],
      transactions: [
        { label: "High Risk Countries Alerts", high: true },
        { label: "High Risk Triggers", high: false }
      ],
      lea: [{ label: "LEA Request \"YES\"", high: false }],
      regulatory: [{ label: "YES/ CTR", high: false }]
    },
    subProfiles: {
      "CUST-2374362": {
        previousNames: "Abdullah Khalid Al-Rashidi",
        dob: "15-03-1982",
        placeOfBirth: "Dubai, UAE",
        phone: "+971-50-481-2930",
        email: "a.alrashidi@dubaimunicipality.ae",
        gender: "Male",
        multipleCitizenships: ["UAE", "Ghana"],
        occupation: "Accountant",
        employer: "Dubai Municipality",
        businessSegment: "Salaried",
        customerSegment: ["HNI"],
        onboardingDate: "15-10-2015",
        onboardingChannel: "Branch",
        fatcaStatus: "Not applicable",
        leaStatus: "Non-Reportable",
        residentStatus: "Resident",
        relationships: {
          ubo: [],
          family: [
            { name: "Fatima Ali Al-Rashidi", relation: "Spouse", dob: "1986-05-20", hasAccount: false, kycStatus: "Not Verified" }
          ],
          associates: [],
          jointHolders: []
        }
      }
    }
  },
  // ── Hassan Omar Al-Qassimi ───────────────────────────────────────────────────
  {
    name: "Hassan Omar Al-Qassimi",
    ucic: "UCO089874657",
    id: "CUST-2374363",
    customerIds: ["CUST-2374363"],
    type: "Individual",
    riskScore: "High",
    riskLevel: 90,
    pepMatch: "NO",
    adverseMedia: "YES",
    cddEddTriggers: "YES",
    dormantAccounts: "NO",
    highRiskTransactions: { count: 2, countries: ["Nigeria", "Iran"] },
    strSarFiled: "YES",
    ctrFiled: "YES",
    leaRequests: "YES",
    activeAlerts: 3,
    status: "Active",
    kycStatus: "Verified",
    nationality: "Qatari",
    dob: "08-11-1978",
    occupation: "Accountant",
    employer: "Al Qassimi & Obi Trading",
    phone: "+974-5512-0928",
    email: "hassan.alqassimi@aqobi.qa",
    address: { line1: "Villa 7, West Bay Lagoon", city: "Doha", zip: "00000" },
    previousNames: "Hassan Omar Al-Qassimi",
    placeOfBirth: "Doha, Qatar",
    gender: "Male",
    multipleCitizenships: ["Qatar", "Nigeria"],
    residentStatus: "Resident",
    primaryAddress: "Villa 7, West Bay Lagoon, Doha, Qatar",
    secondaryAddresses: [],
    businessSegment: "Business Owner",
    customerSegment: ["HNI"],
    onboardingDate: "03-07-2019",
    onboardingChannel: "Branch",
    channelUsage: { branch: "25%", digital: "70%", agent: "5%" },
    idInfo: {
      aadhar: { type: "Qatar National ID", number: "28371940088" },
      passport: { type: "Qatar Passport", number: "QA-P-4009281", expiry: "2031-11-08", issuedBy: "Qatar Ministry of Interior" },
      pan: { type: "Nigeria Passport", number: "NG-P-A03948271", expiry: "2028-05-15", issuedBy: "Nigeria Immigration Service" }
    },
    fatcaStatus: "Not applicable",
    leaStatus: "Reportable",
    identification: [
      { type: "Qatar National ID", number: "28371940088", status: "Verified" },
      { type: "Qatar Passport", number: "QA-P-4009281", status: "Verified", expiry: "2031-11-08" },
      { type: "Nigeria Passport", number: "NG-P-A03948271", status: "Verified", expiry: "2028-05-15" }
    ],
    relationships: {
      ubo: [],
      family: [
        { name: "Mariam Hamad Al-Qassimi", relation: "Spouse", dob: "1983-02-14", hasAccount: true, kycStatus: "Verified" }
      ],
      associates: [],
      jointHolders: [],
      poa: [],
      pep: { isPep: false, details: "" }
    },
    screening: {
      overallStatus: "Flagged",
      sanctions: [
        { list: "EU Consolidated Sanctions List", score: 72, date: "2025-09-10", name: "Hassan Al-Qassimi", watchlist: "EU Sanctions", percentage: 72, link: "#" }
      ],
      pep: { status: "Clear", details: "", matches: [] },
      adverseMedia: [
        { source: "Al Jazeera Financial", date: "2025-09-05", snippet: "Al Qassimi & Obi Trading named in regional investigation on illicit trade finance flows.", name: "Hassan Omar Al-Qassimi", watchlist: "Global Media Check", percentage: 85, link: "#" }
      ],
      watchlistMatches: [],
      history: [
        { date: "2025-09-15", watchlists: "EU Sanctions, Adverse Media", caseId: "CS-8101" }
      ]
    },
    riskProfile: {
      overall: { score: 90, level: "High", lastUpdated: "2025-09-15" },
      geographic: {
        riskLevel: "High",
        score: 70,
        residence: { country: "Qatar", fatfBlack: "N", fatfGrey: "N", taxEvasion: "Y", otherHighRisk: "N" },
        citizenship: { country: "Nigeria", fatfBlack: "N", fatfGrey: "Y", taxEvasion: "N", otherHighRisk: "Y" }
      },
      highRiskTxnCountries: [
        { country: "Nigeria", fatfBlack: "N", fatfGrey: "Y", taxEvasion: "N", otherHighRisk: "Y", details: "Business partner remittances" },
        { country: "Iran", fatfBlack: "Y", fatfGrey: "N", taxEvasion: "N", otherHighRisk: "Y", details: "Suspected trade finance flows" }
      ],
      productChannelRisk: [
        { type: "Service", name: "International Wire", risk: "High" },
        { type: "Product", name: "Trade Finance", risk: "High" }
      ],
      customerTypeRisk: { type: "HNI Individual – Business Owner", risk: "High" },
      occupationRisk: { isHighRisk: "Y", value: "Accountant – Joint Trading Company" },
      industryRisk: { isHighRisk: "Y", sector: "International Trade", details: "Trade finance with high-risk jurisdictions" },
      behavioral: {
        score: 80,
        level: "High",
        alerts: [
          { name: "Transactions to FATF Blacklisted Country", deviation: 100, details: "Transfers linked to Iran corridor" },
          { name: "Adverse media + Sanction proximity", deviation: 0, details: "EU sanction list near-match" }
        ]
      },
      relatedPartiesRisk: { score: 55, level: "Medium" },
      history: [
        { date: "2025-09-15", score: 90, level: "High", reason: "EU Sanction Near-Match + Adverse Media" },
        { date: "2019-07-03", score: 30, level: "Low", reason: "Onboarding" }
      ],
      overrides: []
    },
    kycProfile: {
      status: "Verified",
      lastReviewDate: "2025-09-01",
      nextReviewDate: "2026-03-01",
      documents: [
        { type: "Qatar National ID", id: "28371940088", status: "Verified", date: "2024-11-08" },
        { type: "Qatar Passport", id: "QA-P-4009281", status: "Verified", expiry: "2031-11-08" },
        { type: "Nigeria Passport", id: "NG-P-A03948271", status: "Verified", expiry: "2028-05-15" }
      ],
      newProducts: [],
      triggers: [
        { type: "Sanction Near-Match", detail: "EU Consolidated List – score 72%", date: "2025-09-10" },
        { type: "Adverse Media", detail: "Illicit trade finance investigation", date: "2025-09-05" },
        { type: "FATF Blacklisted Country Txn", detail: "Iran-linked transfers detected", date: "2025-09-12" }
      ],
      sourceOfFunds: ["Business Revenue – Al Qassimi & Obi Trading", "Investment Returns"],
      sourceOfWealth: ["Business Accumulation", "Family Estate (Qatar)"],
      riskEvolution: [
        { date: "2020", score: 35 },
        { date: "2022", score: 55 },
        { date: "2025", score: 90 }
      ],
      changeLog: [
        { field: "Risk Score", old: "Medium (55)", new: "High (90)", user: "System", date: "2025-09-15" }
      ]
    },
    accountsProfile: {
      summary: [
        { id: "ACC-QA-9901", institution: "Qatar National Bank", type: "Current Account", balance: "QAR 1,850,000", currency: "QAR", status: "Active", openDate: "2019-07-03" },
        { id: "ACC-QA-9902", institution: "Qatar National Bank", type: "Trade Finance Account", balance: "QAR 450,000", currency: "QAR", status: "Active", openDate: "2021-01-01" }
      ],
      limits: { transaction: "QAR 2,000,000 / day", cash: "QAR 50,000 / day", fx: "$500,000 / year" },
      products: ["Current Account", "Trade Finance", "International Wire", "Online Banking"],
      dormant: []
    },
    transactionsProfile: {
      summary: {
        daily: { volume: 8, value: "QAR 85,000" },
        monthly: { volume: 240, value: "QAR 2.55M" },
        ytd: { volume: 2880, value: "QAR 30.6M" },
        breakdown: { cash: 8, nonCash: 92, domestic: 40, crossBorder: 60 }
      },
      topCounterparties: [
        { name: "Obi Trading Ltd (Lagos)", count: 60, amount: "$480,000" },
        { name: "Iran Trade Corp (suspected)", count: 15, amount: "$210,000" }
      ],
      topCountries: [
        { code: "QA", name: "Qatar", amount: "QAR 12.2M", count: 1152 },
        { code: "NG", name: "Nigeria", amount: "$480K", count: 1152 },
        { code: "IR", name: "Iran", amount: "$210K", count: 576 }
      ],
      topAlerts: [
        { name: "FATF Blacklisted Country TXN", count: 2, severity: "High" },
        { name: "Sanction Near-Match", count: 1, severity: "High" }
      ],
      unusualPatterns: [
        { name: "Transactions to FATF blacklisted countries", triggered: true, alertId: "ALT-QA-01", details: "Iran-linked trade flows detected" },
        { name: "Out of Income Profile Transactions", triggered: true, alertId: "ALT-QA-02", details: "Txn volume > declared business income" }
      ],
      trends: { surges: "Spike detected (Sep 2025)", outliers: "3 transactions > 3σ", peerProfile: "Significantly higher than peers", nationalityMismatch: "Detected – Nigeria" },
      highRiskCorridors: { detected: true, details: "Qatar–Iran and Qatar–Nigeria corridors flagged", corridors: ["Qatar–Iran", "Qatar–Nigeria"] }
    },
    alertsProfile: {
      active: [
        { id: "ALT-QA-901", rule: "FATF Blacklist Country TXN", amount: "$210,000", severity: "High", status: "Open", date: "12 Sep 2025", details: "Transfer linked to Iran trade corp" },
        { id: "ALT-QA-882", rule: "Sanction Near-Match", amount: "N/A", severity: "High", status: "Open", date: "10 Sep 2025", details: "EU Consolidated List – 72% match" },
        { id: "ALT-QA-860", rule: "Adverse Media", amount: "N/A", severity: "High", status: "In Progress", date: "05 Sep 2025", details: "Illicit trade finance investigation" }
      ],
      history: [
        { id: "ALT-QA-705", rule: "Velocity Check", disposition: "Escalated", rationale: "Suspicious pattern – Qatar–Iran", date: "01 Aug 2025", status: "Filed STR", amount: "$95,000" }
      ],
      stats: { totalActiveVolume: "$210,000", activeCount: 3, closedCount: 12, falsePositiveRate: 30, alertVolumePercentage: 3.5 },
      rfi: { count: 2, lastRequest: "2025-09-15", status: "Pending Response", items: [{ type: "Trade Documentation (Iran)", date: "12 Sep 2025", status: "Pending" }, { type: "Source of Funds", date: "10 Sep 2025", status: "Pending" }] },
      fundingSources: [
        { type: "Business Revenue (QAR)", percent: 55, trend: "Stable" },
        { type: "Wires (USD)", percent: 35, trend: "Increasing" },
        { type: "Cash Deposits", percent: 10, trend: "Stable" }
      ]
    },
    regReportsProfile: {
      jurisdiction: "Qatar",
      strFiled: { isFiled: true, date: "15 Sep 2025", id: "STR-QA-2025-001", status: "Filed", link: "#" },
      ctrFiled: { isFiled: true, date: "Monthly", details: "High Value Trade Finance", link: "#" },
      leaRequests: { hasRequest: true, date: "18 Sep 2025", agency: "Qatar FIU", type: "Investigation Request", link: "#" },
      accountFrozen: { isFrozen: false, date: "", reason: "" }
    },
    audit: [
      { id: "LOG-QA-01", category: "Risk", action: "Risk Upgraded to High", date: "15 Sep 2025 11:00", user: "System (Auto)", approver: "MLRO", details: "EU sanction near-match + adverse media + Iran TXN.", changes: { from: "Medium", to: "High" } },
      { id: "LOG-QA-02", category: "Screening", action: "EU Sanction Near-Match", date: "10 Sep 2025 14:30", user: "System (Auto)", approver: "Compliance Manager", details: "72% match on EU Consolidated Sanctions List.", changes: null }
    ],
    riskFactors: {
      kyc: [
        { label: "Nationality/ Geographic Risk", high: true },
        { label: "Occupation", high: true },
        { label: "Fatca", high: false }
      ],
      relatedParties: [
        { label: "PEP Match", high: false },
        { label: "Related Party High risk", high: true }
      ],
      sanctionMatch: [
        { label: "PEP Match", high: false },
        { label: "Adverse Match", high: true },
        { label: "Sanction Match", high: true }
      ],
      riskProfile: [
        { label: "Transaction in High-risk Countries", high: true },
        { label: "Industry Risk", high: true },
        { label: "Behaviour Risk", high: true },
        { label: "Overall Risk", high: true },
        { label: "Manual Risk Change", high: false }
      ],
      cddEdd: [
        { label: "CDD/EDD Triggers \"YES\"", high: true },
        { label: "Profile Change \"YES\"", high: true }
      ],
      account: [{ label: "Dormant", high: false }],
      transactions: [
        { label: "High Risk Countries Alerts", high: true },
        { label: "High Risk Triggers", high: true }
      ],
      lea: [{ label: "LEA Request \"YES\"", high: true }],
      regulatory: [{ label: "YES/ CTR", high: true }]
    },
    subProfiles: {
      "CUST-2374363": {
        previousNames: "Hassan Omar Al-Qassimi",
        dob: "08-11-1978",
        placeOfBirth: "Doha, Qatar",
        phone: "+974-5512-0928",
        email: "hassan.alqassimi@aqobi.qa",
        gender: "Male",
        multipleCitizenships: ["Qatar", "Nigeria"],
        occupation: "Accountant",
        employer: "Al Qassimi & Obi Trading",
        businessSegment: "Business Owner",
        customerSegment: ["HNI"],
        onboardingDate: "03-07-2019",
        onboardingChannel: "Branch",
        fatcaStatus: "Not applicable",
        leaStatus: "Reportable",
        residentStatus: "Resident",
        relationships: {
          ubo: [],
          family: [
            { name: "Mariam Hamad Al-Qassimi", relation: "Spouse", dob: "1983-02-14", hasAccount: true, kycStatus: "Verified" }
          ],
          associates: [],
          jointHolders: []
        }
      }
    }
  }
];

export const searchData = [
   { name: "Arjun Mehta", ucic: "UCO089874637", id: "CUST-8159176", branch: "Mumbai Main", customerIds: ["CUST-8159176"], accountNumber: "ACC-88291030", risk: "High Risk", time: "10 mins ago", initials: "AM", color: "blue", img: "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3Njc1NzAwMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", mobile: "+91-98204-67831", email: "arjun.mehta@gmail.com", accounts: 1, balance: "₹4.5L", status: "Active", kyc: "Verified", type: "Individual" },
   { name: "Rajesh Gupta", ucic: "UCO089874638", id: "CUST-8829104", branch: "Delhi North", customerIds: ["CUST-8829104"], accountNumber: "ACC-88291040", risk: "Low Risk", time: "2 days ago", initials: "RG", color: "green", mobile: "+91 98765 43211", email: "rajesh.gupta@gmail.com", accounts: 1, balance: "₹1.5L", status: "Active", kyc: "Verified", type: "Individual" },
   { name: "Rajesh Singh", ucic: "UCO089874639", id: "CUST-8829105", branch: "Bangalore East", customerIds: ["CUST-8829105", "CUST-2293842"], accountNumber: "ACC-88291050", risk: "Medium Risk", time: "1 week ago", initials: "RS", color: "orange", mobile: "+91 98765 43212", email: "r.singh@outlook.com", accounts: 3, balance: "₹8.2L", status: "Active", kyc: "Verified", type: "Individual" },
   { name: "Rajesh & Sons Traders", ucic: "UCO089874640", id: "CORP-8829106", branch: "Mumbai Main", customerIds: ["CORP-8829106", "CORP-1102932"], accountNumber: "ACC-88291060", risk: "High Risk", time: "yesterday", initials: "RT", color: "blue", mobile: "+91 22 8877 6655", email: "info@rajeshsons.com", accounts: 5, balance: "₹45.5L", status: "Active", kyc: "Pending", type: "Corporate" },
   { name: "Rahul Verma", ucic: "UCO089874641", id: "CUST-3344556", branch: "Pune City", customerIds: ["CUST-3344556"], accountNumber: "ACC-33445560", risk: "Medium Risk", time: "5 hours ago", initials: "RV", color: "orange", mobile: "+91 91234 56789", email: "rahul.v@gmail.com", accounts: 1, balance: "₹2.1L", status: "Active", kyc: "Verified", type: "Individual" },
   { name: "Ravi Patel", ucic: "UCO089874642", id: "CUST-9988776", branch: "Ahmedabad West", customerIds: ["CUST-9988776"], accountNumber: "ACC-99887760", risk: "Low Risk", time: "1 day ago", initials: "RP", color: "green", mobile: "+91 99882 23344", email: "ravi.patel@yahoo.com", accounts: 3, balance: "₹15.5L", status: "Active", kyc: "Verified", type: "Individual" },
   { name: "Rachel Green", ucic: "UCO089874643", id: "CUST-5566778", branch: "Mumbai Main", customerIds: ["CUST-5566778"], accountNumber: "ACC-55667780", risk: "Low Risk", time: "3 days ago", initials: "RG", color: "purple", mobile: "+91 77665 54433", email: "rachel.g@outlook.com", accounts: 2, balance: "₹5.2L", status: "Active", kyc: "Verified", type: "US Citizenship" },
   { name: "Global Trade Corp", ucic: "UCO089874644", id: "CORP-9921102", branch: "Dubai Offshore", customerIds: ["CORP-9921102"], accountNumber: "ACC-99211020", risk: "Medium Risk", time: "2 hours ago", initials: "GT", color: "purple", mobile: "+91 22 2456 7890", email: "finance@globaltrade.com", accounts: 5, balance: "₹1.2Cr", status: "Active", kyc: "Verified", type: "Corporate" },
   { name: "Priya Sharma", ucic: "UCO089874645", id: "CUST-7721992", branch: "Chennai South", customerIds: ["CUST-7721992"], accountNumber: "ACC-77219920", risk: "Low Risk", time: "yesterday", initials: "PS", color: "green", mobile: "+91 99887 76655", email: "priya.s@yahoo.com", accounts: 1, balance: "₹85,000", status: "Dormant", kyc: "Re-KYC Due", type: "Individual" },
   { name: "Vikram Singh", ucic: "UCO089874646", id: "CUST-1122334", branch: "Chandigarh", customerIds: ["CUST-1122334"], accountNumber: "ACC-11223340", risk: "Low Risk", time: "2 days ago", initials: "VS", color: "gray", mobile: "+91 88776 65544", email: "vikram.singh@outlook.com", accounts: 3, balance: "₹12.5L", status: "Active", kyc: "Verified", type: "Individual" },
   { name: "Sarah Chen", ucic: "UCO089874647", id: "CUST-9988771", branch: "Singapore Br", customerIds: ["CUST-9988771"], accountNumber: "ACC-99887710", risk: "Low Risk", time: "3 days ago", initials: "SC", color: "purple", mobile: "+91 77665 54433", email: "sarah.chen@gmail.com", accounts: 4, balance: "₹32.1L", status: "Active", kyc: "Verified", type: "US Citizenship" },
   { name: "TechSoft Solutions", ucic: "UCO089874648", id: "CORP-5544332", branch: "Hyderabad", customerIds: ["CORP-5544332"], accountNumber: "ACC-55443320", risk: "High Risk", time: "1 week ago", initials: "TS", color: "blue", mobile: "+91 22 9988 7766", email: "admin@techsoft.io", accounts: 8, balance: "₹2.5Cr", status: "Active", kyc: "Pending Review", type: "Corporate" },
   { name: "Nikita Rao", ucic: "UCO089874650", id: "CUST-8159177", branch: "Hyderabad Main", customerIds: ["CUST-8159177"], accountNumber: "ACC-55016701", risk: "High Risk", time: "3 hours ago", initials: "NR", color: "purple", mobile: "+91-98765-11223", email: "nikita.rao@azb.in", accounts: 2, balance: "₹18.2L", status: "Active", kyc: "Verified", type: "Individual" },
   { name: "Vishal Aggarwal", ucic: "UCO089874651", id: "CUST-8159178", branch: "Delhi Vasant Kunj", customerIds: ["CUST-8159178"], accountNumber: "ACC-77014501", risk: "Medium Risk", time: "1 day ago", initials: "VA", color: "orange", mobile: "+91-98112-44556", email: "vishal.aggarwal@gt.in", accounts: 1, balance: "₹1.85L", status: "Active", kyc: "Verified", type: "Individual" },
   { name: "TechBridge", ucic: "UCO089874652", id: "CUST-81597856", branch: "Mumbai BKC", customerIds: ["CUST-81597856"], accountNumber: "ACC-88018801", risk: "Medium Risk", time: "2 days ago", initials: "TB", color: "blue", mobile: "+91-22-6789-3400", email: "", accounts: 2, balance: "₹62L", status: "Active", kyc: "Verified", type: "Corporate" },
   { name: "GhanaGold Co.", ucic: "UCO089874653", id: "CORP-GH-81597857", branch: "Accra Branch", customerIds: ["CORP-GH-81597857"], accountNumber: "ACC-GH9901", risk: "High Risk", time: "1 week ago", initials: "GG", color: "purple", mobile: "+233-30-281-4400", email: "info@ghanagoldco.gh", accounts: 1, balance: "$485K", status: "Active", kyc: "Verified", type: "Corporate" },
   { name: "East Africa Logistics Group", ucic: "UCO089874654", id: "CORP-KE-81597858", branch: "Nairobi Branch", customerIds: ["CORP-KE-81597858"], accountNumber: "ACC-KE5501", risk: "Medium Risk", time: "3 days ago", initials: "EA", color: "green", mobile: "+254-20-441-8800", email: "info@ealg.co.ke", accounts: 1, balance: "KSH 12.5M", status: "Active", kyc: "Verified", type: "Corporate" },
   { name: "NaijaTech Solutions Limited", ucic: "UCO089874655", id: "CORP-NG-81597859", branch: "Lagos Branch", customerIds: ["CORP-NG-81597859"], accountNumber: "ACC-NG7701", risk: "High Risk", time: "5 hours ago", initials: "NT", color: "orange", mobile: "+234-1-461-8800", email: "compliance@naijatech.ng", accounts: 1, balance: "₦185M", status: "Active", kyc: "Verified", type: "Corporate" },
   { name: "Abdullah Khalid Al-Rashidi", ucic: "UCO089874656", id: "CUST-2374362", branch: "Dubai Branch", customerIds: ["CUST-2374362"], accountNumber: "ACC-AE4401", risk: "High Risk", time: "2 hours ago", initials: "AK", color: "blue", mobile: "+971-50-481-2930", email: "a.alrashidi@dubaimunicipality.ae", accounts: 2, balance: "AED 405K", status: "Active", kyc: "Verified", type: "Individual" },
   { name: "Hassan Omar Al-Qassimi", ucic: "UCO089874657", id: "CUST-2374363", branch: "Doha Branch", customerIds: ["CUST-2374363"], accountNumber: "ACC-QA9901", risk: "High Risk", time: "30 mins ago", initials: "HO", color: "orange", mobile: "+974-5512-0928", email: "hassan.alqassimi@aqobi.qa", accounts: 2, balance: "QAR 2.3M", status: "Active", kyc: "Verified", type: "Individual" }
];
