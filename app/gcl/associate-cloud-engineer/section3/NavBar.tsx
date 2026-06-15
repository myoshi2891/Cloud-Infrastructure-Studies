'use client';

import { useEffect, useState } from 'react';

const NAV_ITEMS = [
    { type: 'title', label: '概要' },
    { type: 'link', id: 'overview', label: 'Section 3 全体像', color: 'var(--cyan)' },
    { type: 'title', label: '3.1 コンピューティング' },
    { type: 'link', id: 's31-connect', label: 'リモート接続', color: 'var(--blue)' },
    { type: 'link', id: 's31-snapshot', label: 'スナップショット・イメージ', color: 'var(--blue)' },
    { type: 'link', id: 's31-gke', label: 'GKE 運用管理', color: 'var(--blue)' },
    { type: 'link', id: 's31-autoscale', label: 'Pod オートスケーリング', color: 'var(--blue)' },
    { type: 'link', id: 's31-cloudrun', label: 'Cloud Run 運用', color: 'var(--blue)' },
    { type: 'link', id: 's31-gpu', label: 'GPU / TPU', color: 'var(--blue)' },
    { type: 'title', label: '3.2 ストレージ・データ' },
    { type: 'link', id: 's32-gcs', label: 'Cloud Storage', color: 'var(--green)' },
    { type: 'link', id: 's32-lifecycle', label: 'ライフサイクル管理', color: 'var(--green)' },
    { type: 'link', id: 's32-query', label: 'クエリ・DB 操作', color: 'var(--green)' },
    { type: 'link', id: 's32-backup', label: 'バックアップ・リストア', color: 'var(--green)' },
    { type: 'link', id: 's32-cmek', label: 'Database Center / CMEK', color: 'var(--green)' },
    { type: 'title', label: '3.3 ネットワーク' },
    { type: 'link', id: 's33-subnet', label: 'サブネット・IP 管理', color: 'var(--amber)' },
    { type: 'link', id: 's33-dns-nat', label: 'Cloud DNS / NAT', color: 'var(--amber)' },
    { type: 'link', id: 's33-fw', label: 'ファイアウォール・NGFW', color: 'var(--amber)' },
    { type: 'title', label: '3.4 モニタリング・ログ' },
    { type: 'link', id: 's34-alert', label: 'アラートポリシー', color: 'var(--red)' },
    { type: 'link', id: 's34-logs', label: 'ログ管理・エクスポート', color: 'var(--red)' },
    { type: 'link', id: 's34-diag', label: '診断ツール群', color: 'var(--red)' },
    { type: 'link', id: 's34-ops', label: 'Ops Agent / Prometheus', color: 'var(--red)' },
    { type: 'link', id: 's34-ai', label: 'AI 支援ツール群', color: 'var(--red)' },
    { type: 'title', label: '総まとめ' },
    { type: 'link', id: 'checklist', label: '試験直前チェックリスト', color: 'var(--purple)' },
    { type: 'link', id: 'refs', label: '公式参照リソース', color: 'var(--purple)' },
];

/**
 * ACE Section 3 ページ専用のサイドバーナビゲーションコンポーネント。
 * IntersectionObserver によるスクロールスパイをサポート。
 */
export default function NavBar() {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-20% 0px -70% 0px',
            }
        );

        // id 属性を持つ要素を監視
        NAV_ITEMS.forEach((item) => {
            if (item.type === 'link' && item.id) {
                const el = document.getElementById(item.id);
                if (el) observer.observe(el);
            }
        });

        return () => observer.disconnect();
    }, []);

    return (
        <nav className="sidebar" aria-label="Section 3 ガイドナビゲーション">
            {NAV_ITEMS.map((item, idx) => {
                if (item.type === 'title') {
                    return (
                        <div key={`title-${idx}`} className="nav-section-title">
                            {item.label}
                        </div>
                    );
                }

                const isActive = activeId === item.id;
                return (
                    <a
                        key={`link-${item.id}`}
                        href={`#${item.id}`}
                        className={`nav-item ${isActive ? 'active' : ''}`}
                    >
                        <span
                            className="nav-dot"
                            style={{ backgroundColor: item.color }}
                        />
                        {item.label}
                    </a>
                );
            })}
        </nav>
    );
}
