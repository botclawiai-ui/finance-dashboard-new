"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
    const pathname = usePathname();

    const navItems = [
        {
            name: "Dashboard",
            path: "/",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="9" rx="1" />
                    <rect x="14" y="3" width="7" height="5" rx="1" />
                    <rect x="14" y="12" width="7" height="9" rx="1" />
                    <rect x="3" y="16" width="7" height="5" rx="1" />
                </svg>
            )
        },
        {
            name: "Konten",
            path: "/privat", // Route placeholder for an actual accounts view if it exists
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
            )
        },
        {
            name: "Transaktionen",
            path: "/transaktionen",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
            )
        },
        {
            name: "Portfolio",
            path: "/investitionen",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
            )
        }
    ];

    return (
        <nav className="mobile-nav">
            <div className="mobile-nav-container">
                {navItems.map((item) => {
                    const isActive = pathname === item.path || (item.path !== "/" && pathname?.startsWith(item.path));

                    return (
                        <Link
                            href={item.path}
                            key={item.name}
                            className={`mobile-nav-item ${isActive ? "active" : ""}`}
                        >
                            <div className="mobile-nav-icon">
                                {item.icon}
                            </div>
                            <span className="mobile-nav-label">{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
