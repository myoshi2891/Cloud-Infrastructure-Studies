'use client';

import { useEffect, useState } from 'react';
import { NAV_ITEMS } from './constants';

/** 表示中の見出しを追跡し、Section 2 の章内ナビゲーションを表示する。 */
export default function NavBar() {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0.1,
      }
    );

    const sectionElements = document.querySelectorAll('.section-block[id], h2[id], h3[id]');
    sectionElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="sidebar" aria-label="サイドバー目次">
      <div className="brand">GOOGLE CLOUD PCNE 学習ガイド</div>
      <div className="brand-title">S2:VPCネットワークの実装</div>
      <nav>
        <ul className="nav-list">
          {NAV_ITEMS.map((item) => {
            const subItems = item.subItems ?? [];
            const hasSub = subItems.length > 0;
            const isActive = activeId === item.id;
            return (
              <li key={item.id} className={`nav-item ${hasSub ? 'nav-h2' : ''}`}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </a>
                {hasSub && (
                  <ul className="nav-sub">
                    {subItems.map((sub) => {
                      const isSubActive = activeId === sub.id;
                      return (
                        <li key={sub.id}>
                          <a
                            href={`#${sub.id}`}
                            className={`nav-link ${isSubActive ? 'active' : ''}`}
                            aria-current={isSubActive ? 'page' : undefined}
                          >
                            {sub.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
