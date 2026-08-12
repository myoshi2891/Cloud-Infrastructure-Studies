'use client';

import { useEffect, useState } from 'react';

const TOC_ITEMS = [
  { id: 'prereq', num: '01', text: '前提知識' },
  { id: 'what-is-devnet', num: '02', text: 'DevNetとは何か' },
  { id: 'cert-levels', num: '03', text: '認定全体の位置づけ' },
  { id: 'overview', num: '04', text: '認定の概要' },
  { id: 'prerequisites', num: '05', text: '受験資格・前提条件' },
  { id: 'mechanism', num: '06', text: '認定取得の仕組み' },
  { id: 'devcor', num: '07', text: 'コア試験 DEVCOR' },
  { id: 'concentration', num: '08', text: 'コンセントレーション試験' },
  { id: 'format', num: '09', text: '試験形式・受験方法' },
  { id: 'roadmap', num: '10', text: '学習ロードマップ' },
  { id: 'recert', num: '11', text: '再認定制度' },
  { id: 'summary', num: '12', text: 'まとめ' },
  { id: 'sources', num: '13', text: '参考ソース一覧' },
];

export default function NavBar() {
  const [activeId, setActiveId] = useState<string>('prereq');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const sectionElements = TOC_ITEMS.map((item) => document.getElementById(item.id)).filter(
      Boolean
    ) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sidebar" aria-label="目次">
      <div className="brand">Cisco 認定ガイド</div>
      <div className="brand-title">
        DevNet Professional
        <br />
        徹底解説
      </div>
      <ul className="toc" id="toc">
        {TOC_ITEMS.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={activeId === item.id ? 'active' : ''}
              aria-current={activeId === item.id ? 'true' : undefined}
              onClick={() => setActiveId(item.id)}
            >
              <span className="num">{item.num}</span>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
