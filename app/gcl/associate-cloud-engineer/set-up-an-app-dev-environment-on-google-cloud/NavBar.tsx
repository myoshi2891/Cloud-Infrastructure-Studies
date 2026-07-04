'use client';

/**
 * App Dev Environment ページ専用サイドレール NavBar。
 * セクションリンクと IntersectionObserver による scroll-spy を提供する。
 */
export default function NavBar() {
    return (
        <aside className="rail-wrap">
            <nav className="rail" aria-label="セクションナビゲーション">
                <p className="rail-title">Contents</p>
                {Array.from({ length: 10 }).map((_, i) => (
                    <a key={i} href={`#s${i + 1}`} className="hop">
                        <span className="h-name">Section {i + 1}</span>
                    </a>
                ))}
            </nav>
        </aside>
    );
}
