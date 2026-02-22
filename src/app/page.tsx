"use client";

import React from "react";
import SummaryCard from "@/components/SummaryCard";
import IncomeExpenseChart from "@/components/IncomeExpenseChart";
import ExpensePieChart from "@/components/ExpensePieChart";
import TransactionList from "@/components/TransactionList";
import InvestmentTable from "@/components/InvestmentTable";
import {
  mockSummary,
  mockTransactions,
  mockInvestments,
  mockMonthlyData,
  mockExpensesByCategory,
} from "@/lib/mockData";

export default function DashboardPage() {
  const now = new Date();
  const greeting = now.getHours() < 12 ? "Guten Morgen" : now.getHours() < 18 ? "Guten Tag" : "Guten Abend";

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
          </div>
          <span className="brand-name">FinanzApp</span>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
            Dashboard
          </a>
          <a href="#" className="nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10M6 20V4M18 20v-6" /></svg>
            Transaktionen
          </a>
          <a href="#" className="nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
            Investitionen
          </a>
          <a href="#" className="nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
            Einstellungen
          </a>
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="user-avatar">J</div>
            <div className="user-info">
              <span className="user-name">Jacob</span>
              <span className="user-email">jacob@finanz.app</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <div>
            <h1 className="page-title">{greeting}, Jacob 👋</h1>
            <p className="page-subtitle">Hier ist dein Finanzüberblick für {now.toLocaleDateString("de-DE", { month: "long", year: "numeric" })}.</p>
          </div>
          <div className="top-bar-actions">
            <span className="live-dot"></span>
            <span className="live-label">Live</span>
          </div>
        </header>

        {/* Summary Cards */}
        <section className="summary-grid">
          <SummaryCard
            title="Einnahmen (MTD)"
            value={`€${mockSummary.totalIncomeMTD.toLocaleString("de-DE")}`}
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>}
            trend={{ value: "+2.9%", positive: true }}
            accentColor="#22c55e"
          />
          <SummaryCard
            title="Ausgaben (MTD)"
            value={`€${mockSummary.totalExpensesMTD.toLocaleString("de-DE")}`}
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" /></svg>}
            trend={{ value: "-12.4%", positive: true }}
            accentColor="#ef4444"
          />
          <SummaryCard
            title="Netto-Ersparnis"
            value={`€${mockSummary.netSavingsMTD.toLocaleString("de-DE")}`}
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg>}
            trend={{ value: "+136.8%", positive: true }}
            accentColor="#6366f1"
          />
          <SummaryCard
            title="Portfolio-Wert"
            value={`€${mockSummary.investmentTotal.toLocaleString("de-DE")}`}
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>}
            trend={{ value: `+${mockSummary.investmentChangePercent}%`, positive: true }}
            accentColor="#f59e0b"
          />
        </section>

        {/* Charts Row */}
        <section className="charts-row">
          <IncomeExpenseChart data={mockMonthlyData} />
          <ExpensePieChart data={mockExpensesByCategory} />
        </section>

        {/* Bottom Row */}
        <section className="bottom-row">
          <TransactionList transactions={mockTransactions} />
          <InvestmentTable
            investments={mockInvestments}
            total={mockSummary.investmentTotal}
            totalChange={mockSummary.investmentChange}
            totalChangePercent={mockSummary.investmentChangePercent}
          />
        </section>
      </main>
    </div>
  );
}
