export default function InvestitionenPage() {
    return (
        <>
            <header className="top-bar">
                <div>
                    <h1 className="page-title">Investitionen</h1>
                    <p className="page-subtitle">Überwache die Entwicklung deines Portfolios.</p>
                </div>
            </header>

            <section className="chart-card" style={{ textAlign: "center", padding: "64px 24px", color: "var(--text-muted)" }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 16px", opacity: 0.5 }}>
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
                <h2 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px" }}>In Bearbeitung</h2>
                <p>Die detaillierte Portfolio-Analyse wird bald verfügbar sein.</p>
            </section>
        </>
    );
}
