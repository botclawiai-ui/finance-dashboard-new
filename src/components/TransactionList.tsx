"use client";

import React from "react";
import { Transaction } from "@/lib/types";

interface TransactionListProps {
    transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
    const getCategoryIcon = (category: string) => {
        const icons: Record<string, string> = {
            Gehalt: "💰", Lebensmittel: "🛒", Wohnen: "🏠", Abonnements: "📺",
            Freelance: "💻", Transport: "⛽", Nebenkosten: "⚡", Shopping: "🛍️",
            Freizeit: "🎬", Dividende: "📈", Investition: "📊",
        };
        return icons[category] || "💳";
    };

    return (
        <div className="chart-card transactions-card">
            <div className="chart-header">
                <h3>Letzte Transaktionen</h3>
                <span className="chart-badge">{transactions.length} Einträge</span>
            </div>
            <div className="transactions-list">
                {transactions.map((tx) => (
                    <div key={tx.id} className="transaction-row">
                        <div className="tx-icon">{getCategoryIcon(tx.category)}</div>
                        <div className="tx-details">
                            <span className="tx-desc">{tx.description}</span>
                            <span className="tx-meta">
                                {tx.category} · {tx.account} · {new Date(tx.date).toLocaleDateString("de-DE", { day: "2-digit", month: "short" })}
                            </span>
                        </div>
                        <div className={`tx-amount ${tx.type === "income" ? "positive" : "negative"}`}>
                            {tx.type === "income" ? "+" : ""}€{Math.abs(tx.amount).toLocaleString("de-DE", { minimumFractionDigits: 2 })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
