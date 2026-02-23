"use client";

import React, { useState, useMemo } from "react";
import { Transaction } from "@/lib/types";

interface TransactionListProps {
    transactions: Transaction[];
    showOrigin?: boolean;
}

export default function TransactionList({ transactions, showOrigin }: TransactionListProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");
    const [sortBy, setSortBy] = useState<"date-desc" | "date-asc" | "amount-desc" | "amount-asc">("date-desc");

    const getCategoryIcon = (category: string) => {
        const icons: Record<string, string> = {
            Gehalt: "💰", Lebensmittel: "🛒", Wohnen: "🏠", Abonnements: "📺",
            Freelance: "💻", Transport: "⛽", Nebenkosten: "⚡", Shopping: "🛍️",
            Freizeit: "🎬", Dividende: "📈", Investition: "📊",
        };
        return icons[category] || "💳";
    };

    const getOrigin = (account: string) => {
        const acc = account.toLowerCase();
        if (acc.includes("6657") || acc.includes("4961")) return "Privat";
        if (acc.includes("8930")) return "Neuro";
        if (acc.includes("7687") || acc.includes("7647")) return "Pizza";
        return account;
    };

    const displayTransactions = useMemo(() => {
        let filtered = [...transactions];

        // 1. Text Search
        if (searchTerm) {
            const query = searchTerm.toLowerCase();
            filtered = filtered.filter(tx =>
                tx.description.toLowerCase().includes(query) ||
                tx.category.toLowerCase().includes(query) ||
                tx.account.toLowerCase().includes(query)
            );
        }

        // 2. Type Filter
        if (filterType !== "all") {
            filtered = filtered.filter(tx => tx.type === filterType);
        }

        // 3. Sorting
        filtered.sort((a, b) => {
            if (sortBy === "date-desc") {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            } else if (sortBy === "date-asc") {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            } else if (sortBy === "amount-desc") {
                return Math.abs(b.amount) - Math.abs(a.amount);
            } else if (sortBy === "amount-asc") {
                return Math.abs(a.amount) - Math.abs(b.amount);
            }
            return 0;
        });

        return filtered;
    }, [transactions, searchTerm, filterType, sortBy]);


    return (
        <div className="chart-card transactions-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="chart-header" style={{ marginBottom: "1rem" }}>
                <div>
                    <h3>Letzte Transaktionen</h3>
                    <span className="chart-badge">{displayTransactions.length} Einträge {(transactions.length - displayTransactions.length) > 0 && `(von ${transactions.length})`}</span>
                </div>

                {/* Filters */}
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
                    <input
                        type="text"
                        placeholder="Suchen..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: "0.4rem 0.8rem", borderRadius: "0.5rem", border: "1px solid #334155", background: "#0f172a", color: "white", fontSize: "0.875rem" }}
                    />
                    <select
                        value={filterType}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(e) => setFilterType(e.target.value as any)}
                        style={{ padding: "0.4rem 0.8rem", borderRadius: "0.5rem", border: "1px solid #334155", background: "#0f172a", color: "white", fontSize: "0.875rem" }}
                    >
                        <option value="all">Alle Typen</option>
                        <option value="income">Einnahmen</option>
                        <option value="expense">Ausgaben</option>
                    </select>
                    <select
                        value={sortBy}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(e) => setSortBy(e.target.value as any)}
                        style={{ padding: "0.4rem 0.8rem", borderRadius: "0.5rem", border: "1px solid #334155", background: "#0f172a", color: "white", fontSize: "0.875rem" }}
                    >
                        <option value="date-desc">Neueste zuerst</option>
                        <option value="date-asc">Älteste zuerst</option>
                        <option value="amount-desc">Höchster Betrag</option>
                        <option value="amount-asc">Niedrigster Betrag</option>
                    </select>
                </div>
            </div>

            <div className="transactions-list" style={{ overflowY: "auto", flex: 1 }}>
                {displayTransactions.map((tx) => (
                    <div key={tx.id} className="transaction-row">
                        <div className="tx-icon">{getCategoryIcon(tx.category)}</div>
                        <div className="tx-details">
                            <span className="tx-desc">{tx.description}</span>
                            <span className="tx-meta">
                                {showOrigin ? `${getOrigin(tx.account)} · ` : ""}
                                {tx.category} · {tx.account} · {new Date(tx.date).toLocaleDateString("de-DE", { day: "2-digit", month: "short", year: "numeric" })}
                            </span>
                        </div>
                        <div className={`tx-amount ${tx.type === "income" ? "positive" : "negative"}`}>
                            {tx.type === "income" ? "+" : ""}€{Math.abs(tx.amount).toLocaleString("de-DE", { minimumFractionDigits: 2 })}
                        </div>
                    </div>
                ))}

                {displayTransactions.length === 0 && (
                    <div style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>
                        Keine Transaktionen gefunden.
                    </div>
                )}
            </div>
        </div>
    );
}
