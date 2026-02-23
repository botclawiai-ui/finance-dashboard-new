import { Transaction, Investment, MonthlySummary, DashboardSummary } from "./types";

export const mockTransactions: Transaction[] = [
    { id: "tx_001", date: "2026-02-21", amount: 3850.00, currency: "EUR", description: "Gehalt – TechCorp GmbH", category: "Gehalt", account: "Sparkasse", type: "income" },
    { id: "tx_002", date: "2026-02-20", amount: -89.90, currency: "EUR", description: "REWE Supermarkt", category: "Lebensmittel", account: "Sparkasse", type: "expense" },
    { id: "tx_003", date: "2026-02-19", amount: -750.00, currency: "EUR", description: "Miete Februar", category: "Wohnen", account: "Sparkasse", type: "expense" },
    { id: "tx_004", date: "2026-02-18", amount: -45.99, currency: "EUR", description: "Netflix, Spotify, Disney+", category: "Abonnements", account: "DKB", type: "expense" },
    { id: "tx_005", date: "2026-02-17", amount: 250.00, currency: "EUR", description: "Freelance – Logo Design", category: "Freelance", account: "N26", type: "income" },
    { id: "tx_006", date: "2026-02-16", amount: -32.50, currency: "EUR", description: "Shell Tankstelle", category: "Transport", account: "DKB", type: "expense" },
    { id: "tx_007", date: "2026-02-15", amount: -120.00, currency: "EUR", description: "Stadtwerke – Strom/Gas", category: "Nebenkosten", account: "Sparkasse", type: "expense" },
    { id: "tx_008", date: "2026-02-14", amount: -67.80, currency: "EUR", description: "Zalando Bestellung", category: "Shopping", account: "N26", type: "expense" },
    { id: "tx_009", date: "2026-02-13", amount: -15.00, currency: "EUR", description: "Kino & Popcorn", category: "Freizeit", account: "DKB", type: "expense" },
    { id: "tx_010", date: "2026-02-12", amount: 120.00, currency: "EUR", description: "Dividende VWCE ETF", category: "Dividende", account: "Trade Republic", type: "income" },
    { id: "tx_011", date: "2026-02-10", amount: -200.00, currency: "EUR", description: "ETF Sparplan VWCE", category: "Investition", account: "Trade Republic", type: "expense" },
    { id: "tx_012", date: "2026-02-08", amount: -58.30, currency: "EUR", description: "EDEKA Wocheneinkauf", category: "Lebensmittel", account: "Sparkasse", type: "expense" },
];

export const mockInvestments: Investment[] = [
    { id: "inv_001", ticker: "VWCE", name: "Vanguard FTSE All-World", units: 42.5, buyPrice: 98.20, currentPrice: 112.40, currentValue: 4777.00, account: "Trade Republic", change: 603.50, changePercent: 14.47 },
    { id: "inv_002", ticker: "CSPX", name: "iShares Core S&P 500", units: 15.0, buyPrice: 480.00, currentPrice: 525.60, currentValue: 7884.00, account: "Trade Republic", change: 684.00, changePercent: 9.50 },
    { id: "inv_003", ticker: "EUNL", name: "iShares MSCI World", units: 30.0, buyPrice: 76.50, currentPrice: 82.30, currentValue: 2469.00, account: "Scalable Capital", change: 174.00, changePercent: 7.58 },
    { id: "inv_004", ticker: "BTC", name: "Bitcoin", units: 0.15, buyPrice: 42000.00, currentPrice: 51200.00, currentValue: 7680.00, account: "Bitpanda", change: 1380.00, changePercent: 21.90 },
    { id: "inv_005", ticker: "ETH", name: "Ethereum", units: 2.5, buyPrice: 2200.00, currentPrice: 2850.00, currentValue: 7125.00, account: "Bitpanda", change: 1625.00, changePercent: 29.55 },
];

export const mockMonthlyData: MonthlySummary[] = [
    { month: "Sep", income: 4100, expenses: 2800, savings: 1300 },
    { month: "Okt", income: 4250, expenses: 3100, savings: 1150 },
    { month: "Nov", income: 4100, expenses: 2650, savings: 1450 },
    { month: "Dez", income: 5200, expenses: 3800, savings: 1400 },
    { month: "Jan", income: 4100, expenses: 2900, savings: 1200 },
    { month: "Feb", income: 4220, expenses: 1379, savings: 2841 },
];

export const mockSummary: DashboardSummary = {
    totalIncomeMTD: 4220.00,
    totalExpensesMTD: 1379.49,
    netSavingsMTD: 2840.51,
    netWorth: 78435.00,
    investmentTotal: 29935.00,
    investmentChange: 4466.50,
    investmentChangePercent: 17.54,
    totalBalance: 0,
};

export const mockExpensesByCategory = [
    { name: "Wohnen", value: 750, color: "#6366f1" },
    { name: "Lebensmittel", value: 148.20, color: "#8b5cf6" },
    { name: "Transport", value: 32.50, color: "#a78bfa" },
    { name: "Abonnements", value: 45.99, color: "#c4b5fd" },
    { name: "Nebenkosten", value: 120.00, color: "#7c3aed" },
    { name: "Shopping", value: 67.80, color: "#5b21b6" },
    { name: "Freizeit", value: 15.00, color: "#4c1d95" },
    { name: "Investition", value: 200.00, color: "#ddd6fe" },
];
