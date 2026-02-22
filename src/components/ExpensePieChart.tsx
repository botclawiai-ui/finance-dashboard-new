"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface CategoryItem {
    name: string;
    value: number;
    color: string;
}

interface ExpensePieChartProps {
    data: CategoryItem[];
}

export default function ExpensePieChart({ data }: ExpensePieChartProps) {
    const total = data.reduce((sum, d) => sum + d.value, 0);

    return (
        <div className="chart-card">
            <div className="chart-header">
                <h3>Ausgaben nach Kategorie</h3>
                <span className="chart-badge">Februar 2026</span>
            </div>
            <div className="chart-body pie-layout">
                <div className="pie-container">
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={90}
                                paddingAngle={3}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    background: "rgba(15, 23, 42, 0.95)",
                                    border: "1px solid rgba(99, 102, 241, 0.3)",
                                    borderRadius: "12px",
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                                    color: "#e2e8f0",
                                }}
                                formatter={(value: number) => [`€${value.toFixed(2)}`, undefined]}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="pie-center-label">
                        <span className="pie-total">€{total.toFixed(0)}</span>
                        <span className="pie-total-label">Gesamt</span>
                    </div>
                </div>
                <div className="pie-legend">
                    {data.map((item, i) => (
                        <div key={i} className="pie-legend-item">
                            <span className="pie-legend-dot" style={{ background: item.color }}></span>
                            <span className="pie-legend-name">{item.name}</span>
                            <span className="pie-legend-value">€{item.value.toFixed(0)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
