'use client';

import React, { useEffect, useState } from 'react';
import { TOC_ITEMS } from './constants';

export default function NavBar() {
  const [activeId, setActiveId] = useState<string>('sec-1');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const sections = TOC_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-15% 0px -75% 0px', threshold: 0 }
    );

    sections.forEach((sec) => {
      if (sec) observer.observe(sec);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sidebar" aria-label="章のもくじ">
      <div className="brand">
        Cisco CCNA 200-301
        <span>ネットワークの基礎 入門ガイド</span>
      </div>
      <div className="sidebar-divider"></div>
      <ul className="toc">
        {TOC_ITEMS.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={activeId === item.id ? 'active' : ''}
              aria-current={activeId === item.id ? 'location' : undefined}
              onClick={() => setActiveId(item.id)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
