'use client';

interface NavBarProps {
    activeId: string;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

/**
 * Renders the guide navigation and section links.
 *
 * @param activeId - The identifier of the currently active section.
 * @param isOpen - Controls whether the navigation list is expanded.
 * @param setIsOpen - Updates the expanded state of the navigation list.
 */
export default function NavBar({ activeId, isOpen, setIsOpen }: NavBarProps) {
    const navItems = [
        { id: 'overview', num: '00', label: '全体像' },
        { id: 'prep', num: '01', label: '事前準備' },
        { id: 'l4', num: '02', label: '外部パススルーNLB' },
        { id: 'l7', num: '03', label: '外部アプリケーションLB' },
        { id: 'internal', num: '04', label: '内部パススルーNLB' },
        { id: 'challenge', num: '05', label: '総合チャレンジ' },
        { id: 'choose', num: '06', label: '選定 早見チャート' },
        { id: 'best', num: '07', label: 'ベストプラクティス' },
        { id: 'sources', num: '08', label: '参考ソース' },
    ];

    return (
        <nav className="sidenav" aria-label="ガイドナビゲーション">
            <div className="brand">Hands-on Guide</div>
            <div className="brand-title">Cloud Load Balancing<br />for Compute Engine</div>
            <button
                type="button"
                className="nav-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                {isOpen ? '✕ 目次を閉じる' : '☰ 目次を開く'}
            </button>
            <div className={`nav-list ${isOpen ? 'open' : ''}`}>
                {navItems.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`nav-item ${isActive ? 'active' : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="num">{item.num}</span>
                            {item.label}
                        </a>
                    );
                })}
            </div>
        </nav>
    );
}
