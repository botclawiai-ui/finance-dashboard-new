export interface Transaction {
    id: string;
    date: string;
    amount: number;
    currency: string;
    description: string;
    category: string;
    account: string;
    type: "income" | "expense";
}

export interface Investment {
    id: string;
    ticker: string;
    name: string;
    units: number;
    buyPrice: number;
    currentPrice: number;
    currentValue: number;
    account: string;
    change: number;
    changePercent: number;
}

export interface MonthlySummary {
    month: string;
    income: number;
    expenses: number;
    savings: number;
}

export interface DashboardSummary {
    totalIncomeMTD: number;
    totalExpensesMTD: number;
    netSavingsMTD: number;
    netWorth: number;
    investmentTotal: number;
    investmentChange: number;
    investmentChangePercent: number;
    totalBalance: number;
}
