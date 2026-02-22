import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";
import { Transaction, MonthlySummary, DashboardSummary } from "./types";
import { mockInvestments, mockSummary } from "./mockData"; // Keep investments and some summary mock for now if not in Firebase

// Helper to reliably format categories and assign colors
const categoryColors: Record<string, string> = {
    "Wohnen": "#6366f1",
    "Lebensmittel": "#22c55e",
    "Transport": "#f59e0b",
    "Abonnements": "#ec4899",
    "Nebenkosten": "#8b5cf6",
    "Shopping": "#14b8a6",
    "Freizeit": "#f43f5e",
    "Investition": "#0ea5e9",
    "Gehalt": "#22c55e", // Usually income
    "Uncategorized": "#64748b"
};

function getCategoryColor(category: string) {
    if (categoryColors[category]) return categoryColors[category];

    // Hash string to pseudo-random color
    let hash = 0;
    for (let i = 0; i < category.length; i++) {
        hash = category.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
}

export async function fetchDashboardData() {
    try {
        const q = query(collection(db, "transactions"), orderBy("date", "desc"));
        const snapshot = await getDocs(q);

        const transactions: Transaction[] = [];
        snapshot.forEach(doc => {
            transactions.push(doc.data() as Transaction);
        });

        // 1. Calculate Monthly Summary Data (last 6 months)
        const monthlyMap = new Map<string, { income: number; expenses: number }>();
        const expenseCategoryMap = new Map<string, number>();

        let totalIncomeMTD = 0;
        let totalExpensesMTD = 0;

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        transactions.forEach(tx => {
            const txDate = new Date(tx.date);
            const monthKey = txDate.toLocaleString("de-DE", { month: "short", year: "2-digit" });

            if (!monthlyMap.has(monthKey)) {
                monthlyMap.set(monthKey, { income: 0, expenses: 0 });
            }

            const monthData = monthlyMap.get(monthKey)!;

            if (tx.type === "income") {
                monthData.income += tx.amount;
                if (txDate.getFullYear() === currentYear && txDate.getMonth() === currentMonth) {
                    totalIncomeMTD += tx.amount;
                }
            } else {
                monthData.expenses += Math.abs(tx.amount);
                if (txDate.getFullYear() === currentYear && txDate.getMonth() === currentMonth) {
                    totalExpensesMTD += Math.abs(tx.amount);

                    // Add to categories
                    const cat = tx.category || "Uncategorized";
                    expenseCategoryMap.set(cat, (expenseCategoryMap.get(cat) || 0) + Math.abs(tx.amount));
                }
            }
        });

        // Format Monthly Data
        const monthlyData: MonthlySummary[] = Array.from(monthlyMap.entries())
            .map(([month, data]) => ({ month, income: data.income, expenses: data.expenses, savings: data.income - data.expenses }))
            .reverse() // from older to newer
            .slice(-6); // Only last 6 months

        // Format Category Data
        const expensesByCategory = Array.from(expenseCategoryMap.entries())
            .map(([name, value]) => ({ name, value, color: getCategoryColor(name) }))
            .sort((a, b) => b.value - a.value); // Sort descending

        return {
            transactions: transactions.slice(0, 15), // Grab latest 15
            monthlyData,
            expensesByCategory,
            summary: {
                totalIncomeMTD,
                totalExpensesMTD,
                netSavingsMTD: totalIncomeMTD - totalExpensesMTD,
                netWorth: mockSummary.investmentTotal + totalIncomeMTD - totalExpensesMTD, // Simple mock calc
                investmentTotal: mockSummary.investmentTotal, // Keep mock for now
                investmentChange: mockSummary.investmentChange,
                investmentChangePercent: mockSummary.investmentChangePercent
            },
            investments: mockInvestments // Keep mock for now
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
