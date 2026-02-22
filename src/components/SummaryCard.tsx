"use client";

import React from "react";

interface SummaryCardProps {
    title: string;
    value: string;
    subtitle?: string;
    icon: React.ReactNode;
    trend?: { value: string; positive: boolean };
    accentColor?: string;
}

export default function SummaryCard({ title, value, subtitle, icon, trend, accentColor = "#6366f1" }: SummaryCardProps) {
    return (
        <div className="summary-card" style={{ "--accent": accentColor } as React.CSSProperties}>
            <div className="card-header">
                <div className="card-icon" style={{ background: `${accentColor}18`, color: accentColor }}>
                    {icon}
                </div>
                {trend && (
                    <span className={`card-trend ${trend.positive ? "positive" : "negative"}`}>
                        {trend.positive ? "↑" : "↓"} {trend.value}
                    </span>
                )}
            </div>
            <div className="card-value">{value}</div>
            <div className="card-title">{title}</div>
            {subtitle && <div className="card-subtitle">{subtitle}</div>}
        </div>
    );
}
