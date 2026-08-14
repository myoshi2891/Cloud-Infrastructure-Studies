'use client';

import { useEffect, useState } from 'react';

const NAV_ITEMS = [
    { id: 'hero', text: 'Section 3: データガバナンスとコンプライアンス管理', level: 'h2' },
    { id: '31-google-vaultを使用したediscoveryとデータ保持', text: '3.1 Google Vaultを使用したeDiscoveryとデータ保持', level: 'h2' },
    { id: '311-google-vaultの全体像とedrmモデル', text: '3.1.1 EDRMモデル', level: 'h3' },
    { id: '312-アーカイブユーザーライセンスの活用', text: '3.1.2 アーカイブユーザーライセンス', level: 'h3' },
    { id: '313-保持ポリシーの設定', text: '3.1.3 保持ポリシーの設定', level: 'h3' },
    { id: '314-法的調査目的のholds設定', text: '3.1.4 法的・調査目的のholds設定', level: 'h3' },
    { id: '315-保持ルールの自動化された運用', text: '3.1.5 保持ルールの自動化運用', level: 'h3' },
    { id: '316-vaultの検索とエクスポート機能', text: '3.1.6 Vaultの検索とエクスポート', level: 'h3' },
    { id: '317-エクスポート先の設定', text: '3.1.7 エクスポート先の設定', level: 'h3' },
    { id: '318-監査レポートの生成', text: '3.1.8 監査レポートの生成', level: 'h3' },
    { id: '319-ベストプラクティス', text: '3.1.9 ベストプラクティス', level: 'h3' },
    { id: '32-データ損失防止dlpルールの作成と管理', text: '3.2 データ損失防止（DLP）ルールの作成と管理', level: 'h2' },
    { id: '321-dlp対応サービスと機能差', text: '3.2.1 DLP対応サービスと機能差', level: 'h3' },
    { id: '322-コンテンツ検出器によるdlpルールの自動化', text: '3.2.2 コンテンツ検出器と自動化', level: 'h3' },
    { id: '323-サービス別のdlpルール適用', text: '3.2.3 サービス別のDLPルール適用', level: 'h3' },
    { id: '324-通知メッセージのカスタマイズ', text: '3.2.4 通知メッセージのカスタマイズ', level: 'h3' },
    { id: '325-ベストプラクティス', text: '3.2.5 ベストプラクティス', level: 'h3' },
    { id: '33-drive信頼ルールの作成と管理', text: '3.3 Drive信頼ルールの作成と管理', level: 'h2' },
    { id: '331-特定のouグループドメインユーザーへの共有制限', text: '3.3.1 共有制限の設定', level: 'h3' },
    { id: '332-特定のouグループドメインユーザーへの共有ブロック', text: '3.3.2 共有ブロックの設定', level: 'h3' },
    { id: '333-組織外との共有の許可制限', text: '3.3.3 組織外共有の許可・制限', level: 'h3' },
    { id: '334-ベストプラクティス', text: '3.3.4 ベストプラクティス', level: 'h3' },
    { id: '34-環境データの保存とエクスポート方法の決定', text: '3.4 環境データの保存とエクスポート方法の決定', level: 'h2' },
    { id: '341-google-takeout設定の管理', text: '3.4.1 Google Takeout設定の管理', level: 'h3' },
    { id: '342-data-export-toolの使用', text: '3.4.2 Data Export Toolの使用', level: 'h3' },
    { id: '343-データの地理的保存場所の選択', text: '3.4.3 データの地理的保存場所の選択', level: 'h3' },
    { id: '344-業界規制に基づく法令コンプライアンス設定', text: '3.4.4 法令・コンプライアンス設定', level: 'h3' },
    { id: '345-ベストプラクティス', text: '3.4.5 ベストプラクティス', level: 'h3' },
    { id: '35-データの分類', text: '3.5 データの分類', level: 'h2' },
    { id: '351-ラベル適用のユースケース', text: '3.5.1 ラベル適用のユースケース', level: 'h3' },
    { id: '352-分類ラベルの設定方法', text: '3.5.2 分類ラベルの設定方法', level: 'h3' },
    { id: '353-ベストプラクティス', text: '3.5.3 ベストプラクティス', level: 'h3' },
    { id: 'section-3-まとめ表', text: 'Section 3 まとめ表', level: 'h2' },
    { id: '学習チェックリスト', text: '学習チェックリスト', level: 'h2' },
    { id: '参考文献', text: '参考文献', level: 'h2' },
];

/**
 * Section 3 の目次を表示し、見出し監視、スムーススクロール、モバイル開閉を管理する。
 */
export function NavBar() {
    const [activeId, setActiveId] = useState<string>('hero');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

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

        NAV_ITEMS.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleClick = (id: string) => {
        setIsOpen(false);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <button
                type="button"
                className="sidebar-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="目次メニュー切替"
                aria-expanded={isOpen}
                aria-controls="sidebar"
            >
                ☰
            </button>
            <div className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
                <div className="sidebar-brand">
                    <div className="kicker">Google Workspace Admin</div>
                    <div className="title">Section 3: データガバナンス</div>
                </div>
                <nav>
                    {NAV_ITEMS.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`nav-link nav-${item.level} ${activeId === item.id ? 'active' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleClick(item.id);
                            }}
                        >
                            {item.text}
                        </a>
                    ))}
                </nav>
            </div>
        </>
    );
}
