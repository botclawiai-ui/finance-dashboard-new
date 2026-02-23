"use client";

import React from "react";
import SummaryCard from "@/components/SummaryCard";
import IncomeExpenseChart from "@/components/IncomeExpenseChart";
import ExpensePieChart from "@/components/ExpensePieChart";
import TransactionList from "@/components/TransactionList";
import { useEffect, useState } from "react";
import { fetchDashboardData, Timeframe } from "@/lib/dataFetcher";
import { Transaction, MonthlySummary, DashboardSummary } from "@/lib/types";

export default function PizzaDashboardPage() {
    const [timeframe, setTimeframe] = useState<Timeframe>("last6Months");
    const [data, setData] = useState<{
        transactions: Transaction[];
        monthlyData: MonthlySummary[];
        expensesByCategory: { name: string; value: number; color: string }[];
        summary: DashboardSummary;
    } | null>(null);

    useEffect(() => {
        // Pizza: account mapping
        fetchDashboardData(["Main (EUR) (7687)", "Rücklagen (EUR) (7647)"], timeframe)
            .then(setData)
            .catch(console.error);
    }, [timeframe]);

    if (!data) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '80vh', color: '#94a3b8' }}>
                Lade Pizza-Daten...
            </div>
        );
    }

    return (
        <>
            <header className="top-bar">
                <div>
                    <h1 className="page-title">Pizza Finanzen 🍕</h1>
                    <p className="page-subtitle">Übersicht für Pizza (Main 7687 & Rücklagen 7647).</p>
                </div>
                <div className="top-bar-actions">
                    <select className="timeframe-select" value={timeframe} onChange={(e) => setTimeframe(e.target.value as Timeframe)}>
                        <option value="mtd">Dieser Monat</option>
                        <option value="last6Months">Letzte 6 Monate</option>
                        <option value="thisYear">Dieses Jahr</option>
                        <option value="all">Alle</option>
                    </select>
                    <span className="live-dot"></span>
                    <span className="live-label">Live</span>
                </div>
            </header>

            <section className="summary-grid">
                <SummaryCard
                    title="Einnahmen"
                    value={`€${data.summary.totalIncomeMTD.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>}
                    trend={{ value: "+0%", positive: true }}
                    accentColor="#22c55e"
                />
                <SummaryCard
                    title="Ausgaben"
                    value={`€${data.summary.totalExpensesMTD.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" /></svg>}
                    trend={{ value: "-0%", positive: true }}
                    accentColor="#ef4444"
                />
                <SummaryCard
                    title="Netto-Ersparnis"
                    value={`€${data.summary.netSavingsMTD.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg>}
                    trend={{ value: "+0%", positive: true }}
                    accentColor="#6366f1"
                />
                <SummaryCard
                    title="Gesamtsaldo (Pizza)"
                    value={`€${data.summary.totalBalance.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>}
                    trend={{ value: "Saldo", positive: data.summary.totalBalance >= 0 }}
                    accentColor="#0ea5e9"
                />
            </section>

            <section className="charts-row">
                <IncomeExpenseChart data={data.monthlyData} />
                <ExpensePieChart data={data.expensesByCategory} />
            </section>

            <section className="bottom-row">
                <TransactionList transactions={data.transactions} />
            </section>
        </>
    );
}
