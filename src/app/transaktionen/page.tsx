export default function TransaktionenPage() {
    return (
        <>
            <header className="top-bar">
                <div>
                    <h1 className="page-title">Transaktionen</h1>
                    <p className="page-subtitle">Alle Einnahmen und Ausgaben im Detail.</p>
                </div>
            </header>

            <section className="chart-card" style={{ textAlign: "center", padding: "64px 24px", color: "var(--text-muted)" }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 16px", opacity: 0.5 }}>
                    <path d="M12 20V10M6 20V4M18 20v-6"></path>
                </svg>
                <h2 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px" }}>In Bearbeitung</h2>
                <p>Die detaillierte Transaktionsansicht wird bald verfügbar sein.</p>
            </section>
        </>
    );
}
