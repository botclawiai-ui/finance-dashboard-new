"use client";

import React from "react";
import { Investment } from "@/lib/types";

interface InvestmentTableProps {
    investments: Investment[];
    total: number;
    totalChange: number;
    totalChangePercent: number;
}

export default function InvestmentTable({ investments, total, totalChange, totalChangePercent }: InvestmentTableProps) {
    return (
        <div className="chart-card investments-card">
            <div className="chart-header">
                <h3>Investitionen</h3>
                <div className="investments-summary">
                    <span className="inv-total">€{total.toLocaleString("de-DE")}</span>
                    <span className={`inv-change ${totalChange >= 0 ? "positive" : "negative"}`}>
                        {totalChange >= 0 ? "+" : ""}€{totalChange.toLocaleString("de-DE")} ({totalChangePercent.toFixed(1)}%)
                    </span>
                </div>
            </div>
            <div className="investments-table-wrapper">
                <table className="investments-table">
                    <thead>
                        <tr>
                            <th>Asset</th>
                            <th>Einheiten</th>
                            <th>Kurs</th>
                            <th>Wert</th>
                            <th>Gewinn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {investments.map((inv) => (
                            <tr key={inv.id}>
                                <td>
                                    <div className="inv-asset">
                                        <span className="inv-ticker">{inv.ticker}</span>
                                        <span className="inv-name">{inv.name}</span>
                                    </div>
                                </td>
                                <td className="inv-units">{inv.units}</td>
                                <td className="inv-price">€{inv.currentPrice.toLocaleString("de-DE", { minimumFractionDigits: 2 })}</td>
                                <td className="inv-value">€{inv.currentValue.toLocaleString("de-DE")}</td>
                                <td className={`inv-pl ${inv.change >= 0 ? "positive" : "negative"}`}>
                                    <span>{inv.change >= 0 ? "+" : ""}€{inv.change.toLocaleString("de-DE")}</span>
                                    <span className="inv-pl-pct">{inv.changePercent >= 0 ? "+" : ""}{inv.changePercent.toFixed(1)}%</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
