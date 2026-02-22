"use client";

import React from "react";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { MonthlySummary } from "@/lib/types";

interface IncomeExpenseChartProps {
    data: MonthlySummary[];
}

export default function IncomeExpenseChart({ data }: IncomeExpenseChartProps) {
    return (
        <div className="chart-card">
            <div className="chart-header">
                <h3>Einnahmen vs. Ausgaben</h3>
                <span className="chart-badge">Letzte 6 Monate</span>
            </div>
            <div className="chart-body">
                <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="gradIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                                <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="gradExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                                <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                        <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
                        <Tooltip
                            contentStyle={{
                                background: "rgba(15, 23, 42, 0.95)",
                                border: "1px solid rgba(99, 102, 241, 0.3)",
                                borderRadius: "12px",
                                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                                color: "#e2e8f0",
                            }}
                            formatter={(value: number) => [`€${value.toLocaleString("de-DE")}`, undefined]}
                        />
                        <Legend verticalAlign="top" height={36} />
                        <Area type="monotone" dataKey="income" name="Einnahmen" stroke="#22c55e" strokeWidth={2.5} fill="url(#gradIncome)" />
                        <Area type="monotone" dataKey="expenses" name="Ausgaben" stroke="#ef4444" strokeWidth={2.5} fill="url(#gradExpense)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
