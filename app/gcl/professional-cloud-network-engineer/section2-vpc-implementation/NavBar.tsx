'use client';

import { useEffect, useState } from 'react';
import { NAV_ITEMS } from './constants';

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
      <div className="brand">Google Cloud PCNE</div>
      <div className="brand-title">S2: VPCネットワークの実装</div>
      <nav>
        <ul className="nav-list">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id} className="nav-item">
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                </a>
                {item.subItems && item.subItems.length > 0 && (
                  <ul className="nav-sub">
                    {item.subItems.map((sub) => {
                      const isSubActive = activeId === sub.id;
                      return (
                        <li key={sub.id}>
                          <a
                            href={`#${sub.id}`}
                            className={`nav-link ${isSubActive ? 'active' : ''}`}
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
