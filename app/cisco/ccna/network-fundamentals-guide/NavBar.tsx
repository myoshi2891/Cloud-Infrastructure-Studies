'use client';

import React, { useEffect, useState } from 'react';

const TOC_ITEMS = [
  { id: 'sec-1', label: '第1章　CCNA認定試験とは' },
  { id: 'sec-2', label: '第2章　ネットワークとは何か' },
  { id: 'sec-3', label: '第3章　OSI参照モデルとTCP/IP' },
  { id: 'sec-4', label: '第4章　ネットワーク機器の基礎' },
  { id: 'sec-5', label: '第5章　イーサネットと物理層' },
  { id: 'sec-6', label: '第6章　IPv4アドレッシング' },
  { id: 'sec-7', label: '第7章　IPv6の基礎' },
  { id: 'sec-8', label: '第8章　TCP/UDPとポート番号' },
  { id: 'sec-9', label: '第9章　学習ロードマップ' },
  { id: 'sec-10', label: '第10章　2026年の最新動向' },
  { id: 'sec-refs', label: '参考文献・出典' },
];

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
