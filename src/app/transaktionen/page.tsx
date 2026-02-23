"use client";

import React, { useEffect, useState } from "react";
import TransactionList from "@/components/TransactionList";
import { fetchDashboardData, Timeframe } from "@/lib/dataFetcher";
import { Transaction } from "@/lib/types";

export default function TransaktionenPage() {
    const [timeframe, setTimeframe] = useState<Timeframe>("all");
    const [transactions, setTransactions] = useState<Transaction[] | null>(null);

    useEffect(() => {
        // Fetch all transactions (no account filters)
        fetchDashboardData(undefined, timeframe)
            .then((data) => setTransactions(data.transactions))
            .catch(console.error);
    }, [timeframe]);

    return (
        <>
            <header className="top-bar">
                <div>
                    <h1 className="page-title">Transaktionen</h1>
                    <p className="page-subtitle">Alle Einnahmen und Ausgaben im Detail mit Ursprung.</p>
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

            <section style={{ marginTop: '20px' }}>
                {!transactions ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '50vh', color: '#94a3b8' }}>
                        Lade Transaktionen...
                    </div>
                ) : (
                    <TransactionList transactions={transactions} showOrigin={true} />
                )}
            </section>
        </>
    );
}
