'use client';

/**
 * Build a Secure Google Cloud Network ページ専用サイドレール NavBar スケルトン。
 */

const SECTIONS = [
    { id: 's1', name: '全体像' },
    { id: 's2', name: 'VPC の基礎' },
    { id: 's3', name: 'ファイアウォール設計' },
    { id: 's4', name: 'IAM と最小権限' },
    { id: 's5', name: 'IAP でゼロトラスト' },
    { id: 's6', name: '外部 LB と Cloud Armor' },
    { id: 's7', name: '内部 LB (ILB)' },
    { id: 's8', name: '総合演習' },
    { id: 's9', name: 'チェックリスト' },
    { id: 's10', name: '参考ソース' },
];

export default function NavBar() {
    return (
        <aside className="rail-wrap">
            <nav className="rail" aria-label="セクションナビゲーション">
                <p className="rail-title">Contents</p>
                {SECTIONS.map((sec) => (
                    <a key={sec.id} href={`#${sec.id}`} className="hop">
                        <span className="h-name">{sec.name}</span>
                    </a>
                ))}
            </nav>
        </aside>
    );
}
