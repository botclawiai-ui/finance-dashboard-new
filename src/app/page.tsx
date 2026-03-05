"use client";

import React from "react";
import SummaryCard from "@/components/SummaryCard";
import IncomeExpenseChart from "@/components/IncomeExpenseChart";
import ExpensePieChart from "@/components/ExpensePieChart";
import TransactionList from "@/components/TransactionList";
import InvestmentTable from "@/components/InvestmentTable";
import { useEffect, useState } from "react";
import { fetchDashboardData } from "@/lib/dataFetcher";
import { Transaction, MonthlySummary, DashboardSummary, Investment } from "@/lib/types";

export default function DashboardPage() {
  const [data, setData] = useState<{
    transactions: Transaction[];
    monthlyData: MonthlySummary[];
    expensesByCategory: { name: string; value: number; color: string }[];
    summary: DashboardSummary;
    investments: Investment[];
  } | null>(null);

  const [timeframe, setTimeframe] = useState<"all" | "thisYear" | "last6Months" | "mtd" | "custom">("last6Months");
  const [customRange, setCustomRange] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    fetchDashboardData(undefined, timeframe, customRange).then(setData).catch(console.error);
  }, [timeframe, customRange]);

  const now = new Date();
  const greeting = now.getHours() < 12 ? "Guten Morgen" : now.getHours() < 18 ? "Guten Tag" : "Guten Abend";

  if (!data) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '80vh', color: '#94a3b8' }}>
        Lade Dashboard-Daten...
      </div>
    );
  }

  return (
    <>
      {/* Top Bar */}
      <header className="top-bar">
        <div>
          <h1 className="page-title">{greeting}, Jacob 👋</h1>
          <p className="page-subtitle">Hier ist dein Finanzüberblick für {now.toLocaleDateString("de-DE", { month: "long", year: "numeric" })}.</p>
        </div>
        <div className="top-bar-actions" style={{ flexWrap: "wrap", justifyContent: "flex-end" }}>
          <select
            className="timeframe-select"
            value={timeframe}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e) => setTimeframe(e.target.value as any)}
          >
            <option value="last6Months">Letzte 6 Monate</option>
            <option value="mtd">Dieser Monat</option>
            <option value="thisYear">Dieses Jahr</option>
            <option value="all">Gesamte Zeit</option>
            <option value="custom">Benutzerdefiniert</option>
          </select>

          {timeframe === "custom" && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginRight: '12px', borderRight: '1px solid rgba(255, 255, 255, 0.1)', paddingRight: '12px' }}>
              <input
                type="date"
                className="custom-date-input"
                value={customRange.startDate}
                onChange={e => setCustomRange(prev => ({ ...prev, startDate: e.target.value }))}
              />
              <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>bis</span>
              <input
                type="date"
                className="custom-date-input"
                value={customRange.endDate}
                onChange={e => setCustomRange(prev => ({ ...prev, endDate: e.target.value }))}
              />
            </div>
          )}

          <span className="live-dot"></span>
          <span className="live-label">Live</span>
        </div>
      </header>

      {/* Summary Cards */}
      <section className="summary-grid">
        <SummaryCard
          title="Einnahmen (MTD)"
          value={`€${data.summary.totalIncomeMTD.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>}
          trend={{ value: "+2.9%", positive: true }}
          accentColor="#22c55e"
        />
        <SummaryCard
          title="Ausgaben (MTD)"
          value={`€${data.summary.totalExpensesMTD.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" /></svg>}
          trend={{ value: "-12.4%", positive: true }}
          accentColor="#ef4444"
        />
        <SummaryCard
          title="Netto-Ersparnis"
          value={`€${data.summary.netSavingsMTD.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg>}
          trend={{ value: "+136.8%", positive: true }}
          accentColor="#6366f1"
        />
        <SummaryCard
          title="Portfolio-Wert"
          value={`€${data.summary.investmentTotal.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>}
          trend={{ value: `+${data.summary.investmentChangePercent}%`, positive: true }}
          accentColor="#f59e0b"
        />
        <SummaryCard
          title="Gesamtsaldo"
          value={`€${data.summary.totalBalance.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>}
          trend={{ value: "Saldo", positive: data.summary.totalBalance >= 0 }}
          accentColor="#0ea5e9"
        />
      </section>

      {/* Charts Row */}
      <section className="charts-row">
        <IncomeExpenseChart data={data.monthlyData} />
        <ExpensePieChart data={data.expensesByCategory} />
      </section>

      {/* Bottom Row */}
      <section className="bottom-row">
        <TransactionList transactions={data.transactions} />
        <InvestmentTable
          investments={data.investments}
          total={data.summary.investmentTotal}
          totalChange={data.summary.investmentChange}
          totalChangePercent={data.summary.investmentChangePercent}
        />
      </section>
    </>
  );
}
