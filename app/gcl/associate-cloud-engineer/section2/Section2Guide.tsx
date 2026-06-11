'use client';

import React, { useEffect, useRef, useState } from 'react';
import NavBar from './NavBar';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';

/** コードブロック（ヘッダ + Copy ボタン + シンタックスハイライト済み pre）。 */
function CodeBlock({ lang, html }: { lang: string; html: string }) {
    const preRef = useRef<HTMLPreElement>(null);
    const [copied, setCopied] = useState(false);

    const onCopy = () => {
        const text = preRef.current?.textContent ?? '';
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="code-block">
            <div className="code-header">
                <span className="code-lang">{lang}</span>
                <button className="code-copy" type="button" onClick={onCopy}>
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <pre ref={preRef}>
                <code dangerouslySetInnerHTML={{ __html: html }} />
            </pre>
        </div>
    );
}

/** クリックでトグルできるチェックリスト項目。 */
function CheckItem({ children }: { children: React.ReactNode }) {
    const [checked, setChecked] = useState(false);
    return (
        <div className="check-item">
            <button
                type="button"
                className={`check-box${checked ? ' checked' : ''}`}
                aria-pressed={checked}
                aria-label="チェック"
                onClick={() => setChecked((v) => !v)}
            />
            <div>{children}</div>
        </div>
    );
}

/** Mermaid 図ラッパー。共有 MermaidDiagram を mermaid-wrap で囲む。 */
function Diagram({ id, label }: { id: string; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} />
        </div>
    );
}

/** トピックカード（アコーディオン）コンポーネント。 */
function TopicCard({ id, num, title, isNew, children }: { id?: string; num: string; title: string; isNew?: boolean; children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false); // デフォルトオープン
    return (
        <div id={id} className={`topic-card${collapsed ? ' collapsed' : ''}`}>
            <div className="topic-card-header" onClick={() => setCollapsed(!collapsed)}>
                <span className="topic-number">{num}</span>
                <span className="topic-title">{title}</span>
                {isNew && <span className="topic-new-badge">NEW 2026</span>}
                <span className="topic-toggle">▼</span>
            </div>
            <div className="topic-body">
                {children}
            </div>
        </div>
    );
}

export default function Section2Guide() {
    const [scrolled, setScrolled] = useState(false);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? scrollTop / docHeight : 0;
            if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${progress})`;
            }
            setScrolled(scrollTop > 400);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        // scroll spy
        let spyObserver: IntersectionObserver | null = null;
        if (typeof IntersectionObserver !== 'undefined') {
            spyObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;
                        const id = entry.target.id;
                        document.querySelectorAll('.ace-s2-page .nav-item').forEach((n) => {
                            n.classList.toggle('active', n.getAttribute('href') === `#${id}`);
                        });
                    });
                },
                { rootMargin: '-20% 0px -70% 0px' }
            );
            document.querySelectorAll('.ace-s2-page [id]').forEach((el) => {
                spyObserver?.observe(el);
            });
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            spyObserver?.disconnect();
        };
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <div className="ace-s2-page">
            <div className="progress-bar" ref={progressRef} aria-hidden="true" />
            <NavBar />

            <div className="main">
                {/* HERO */}
                <section className="hero">
                    <div className="hero-bg" />
                    <div className="hero-grid" />
                    <div className="hero-eyebrow">
                        <span className="hero-tag">ACE 試験対策</span>
                        <span className="hero-tag green">2026年6月版 試験ガイド対応</span>
                        <span className="hero-tag yellow">中級〜上級者向け</span>
                    </div>
                    <h1 className="hero-title">
                        Section 2: <span className="accent">Planning &amp;</span><br />
                        <span className="accent">Implementing</span> a Cloud Solution
                    </h1>
                    <p className="hero-sub">
                        Google Cloud ACE 試験の最大配点ドメイン（約30%）を完全網羅。2026年6月30日施行の最新試験ガイドに準拠。Hyperdisk・Cloud NGFW・Fabric FAST・Agent Runtime など新規追加トピックも完全カバー。
                    </p>
                    <div className="hero-stats">
                        <div className="hero-stat">
                            <span className="hero-stat-value">~30%</span>
                            <span className="hero-stat-label">試験全体の配点比率</span>
                        </div>
                        <div className="hero-stat">
                            <span className="hero-stat-value">4</span>
                            <span className="hero-stat-label">サブセクション</span>
                        </div>
                        <div className="hero-stat">
                            <span className="hero-stat-value">6+</span>
                            <span className="hero-stat-label">2026年新規追加トピック</span>
                        </div>
                        <div className="hero-stat">
                            <span className="hero-stat-value">30+</span>
                            <span className="hero-stat-label">公式ドキュメントリンク</span>
                        </div>
                    </div>
                </section>

                {/* CHANGES BANNER */}
                <div className="changes-banner">
                    <div className="changes-icon" aria-hidden="true">⚠️</div>
                    <div style={{ flex: 1 }}>
                        <div className="changes-title">2026年6月版 試験ガイド 主要変更点</div>
                        <div className="changes-grid">
                            <div className="change-item">
                                <div className="change-dot" />
                                <span className="change-label">[Compute]</span>
                                <span className="change-desc">Agent Runtime on Gemini Enterprise Agent Platform 追加</span>
                            </div>
                            <div className="change-item">
                                <div className="change-dot" />
                                <span className="change-label">[Storage]</span>
                                <span className="change-desc">Hyperdisk・Managed Lustre・NetApp Volumes 追加</span>
                            </div>
                            <div className="change-item">
                                <div className="change-dot" />
                                <span className="change-label">[Network]</span>
                                <span className="change-desc">Cloud NGFW・Secure Tags・Network Service Tier 追加</span>
                            </div>
                            <div className="change-item">
                                <div className="change-dot" />
                                <span className="change-label">[IaC]</span>
                                <span className="change-desc">Fabric FAST・Gemini CLI・Application Design Center 追加</span>
                            </div>
                            <div className="change-item">
                                <div className="change-dot" />
                                <span className="change-label">[GPU/TPU]</span>
                                <span className="change-desc">GPU/TPU の選択基準が明示化</span>
                            </div>
                            <div className="change-item">
                                <div className="change-dot" />
                                <span className="change-label">[Eventarc]</span>
                                <span className="change-desc">イベント処理プラットフォームとして明示追加</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="content">
                    {/* ===== SECTION 2.1 ===== */}
                    <div id="s21" className="section-header">
                        <div className="section-icon-wrap section-icon-blue" aria-hidden="true">💻</div>
                        <div className="section-meta">
                            <div className="section-number">Section 2.1</div>
                            <h2 className="section-title-main">コンピューティングリソースの計画と実装</h2>
                        </div>
                        <span className="section-weight">~12–14問</span>
                    </div>

                    {/* 2.1-A Computer selection */}
                    <TopicCard num="2.1-A" title="コンピューティングサービスの選択とマシンファミリー">
                        <div className="sub-title">サービス選択フローチャート</div>
                        <div className="diagram-wrap">
                            <div className="diagram-label">▶ ワークロード種別によるサービス選択</div>
                            <Diagram id="diag-1" label="ワークロード種別によるコンピューティングサービス選択フロー" />
                        </div>
                        <div className="sub-title">コンピューティングサービス比較表</div>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">サービス</th>
                                        <th scope="col">管理レベル</th>
                                        <th scope="col">課金単位</th>
                                        <th scope="col">最適なユースケース</th>
                                        <th scope="col">特記事項</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Compute Engine</strong></td>
                                        <td>IaaS（完全制御）</td>
                                        <td>vCPU/時 + メモリ/時</td>
                                        <td>レガシー移行、特定 OS・ライセンス</td>
                                        <td>OS カーネル変更が可能</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Spot VM</strong></td>
                                        <td>IaaS（完全制御）</td>
                                        <td>最大 91% 割引</td>
                                        <td>バッチ、ML トレーニング、レンダリング</td>
                                        <td>プリエンプト（強制停止）あり</td>
                                    </tr>
                                    <tr>
                                        <td><strong>GKE Autopilot</strong></td>
                                        <td>フルマネージド</td>
                                        <td>Pod リソース（vCPU/メモリ）</td>
                                        <td>マイクロサービス、API サービス</td>
                                        <td><strong>デフォルト推奨</strong>、セキュリティ自動強化</td>
                                    </tr>
                                    <tr>
                                        <td><strong>GKE Standard</strong></td>
                                        <td>半マネージド</td>
                                        <td>ノード（VM）単位</td>
                                        <td>特権コンテナ、DaemonSet、GPU/TPU</td>
                                        <td>ノードプールを直接管理</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Cloud Run</strong></td>
                                        <td>サーバーレス</td>
                                        <td>リクエスト / CPU 秒</td>
                                        <td>HTTP API、イベント処理、ゼロスケール</td>
                                        <td>第2世代推奨、Direct VPC Egress</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Cloud Run Functions</strong></td>
                                        <td>サーバーレス</td>
                                        <td>呼び出し回数 + 時間</td>
                                        <td>軽量グルーロジック、Webhook</td>
                                        <td>イベント駆動の最小単位</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Agent Runtime</strong></td>
                                        <td>フルマネージド</td>
                                        <td>vCPU 時 + GiB 時</td>
                                        <td>AI エージェントの実行基盤</td>
                                        <td>Python フレームワーク対応</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="callout callout-yellow">
                            <span className="callout-icon" aria-hidden="true">⚠️</span>
                            <div>
                                <strong>試験の重要ポイント:</strong> GPU/TPU 搭載 VM は <code>--maintenance-policy=TERMINATE</code> が強制されます（ライブマイグレーション不可）。
                            </div>
                        </div>
                        <div className="callout callout-red">
                            <span className="callout-icon" aria-hidden="true">🚨</span>
                            <div>
                                <strong>試験の罠:</strong> OS Login が有効な場合、プロジェクトレベルのメタデータ SSH キーは<strong>無視</strong>されます。
                            </div>
                        </div>
                        <a href="https://docs.cloud.google.com/compute/docs/connect/ssh-best-practices/login-access" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 SSH ベストプラクティス</a>
                        <a href="https://cloud.google.com/blog/topics/developers-practitioners/where-should-i-run-my-stuff-choosing-google-cloud-compute-option" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 コンピューティング選択ガイド</a>
                    </TopicCard>

                    {/* 2.1-B Hyperdisk */}
                    <TopicCard id="s21-disk" num="2.1-B" title="ストレージ選択 — Hyperdisk / Persistent Disk / Local SSD" isNew={true}>
                        <div className="callout callout-blue">
                            <span className="callout-icon" aria-hidden="true">💡</span>
                            <div>
                                <strong>Hyperdisk の最大優位点:</strong> 性能（IOPS/スループット）と容量を独立してプロビジョニング可能。Persistent Disk は容量を増やさないと性能が上がらないが、Hyperdisk はサイズを変えずに IOPS だけ増減できる。
                            </div>
                        </div>
                        <div className="sub-title">ストレージ選択フローチャート</div>
                        <div className="diagram-wrap">
                            <div className="diagram-label">▶ データ永続性・性能要件によるストレージ選択</div>
                            <Diagram id="diag-2" label="データ要件に基づくストレージ選択フロー" />
                        </div>
                        <div className="sub-title">ストレージ種別詳細比較</div>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ストレージタイプ</th>
                                        <th scope="col">最大 IOPS</th>
                                        <th scope="col">最大スループット</th>
                                        <th scope="col">永続性</th>
                                        <th scope="col">特徴・用途</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Hyperdisk Balanced</strong></td>
                                        <td>160,000</td>
                                        <td>2,400 MiB/s</td>
                                        <td>✅ 永続</td>
                                        <td><strong>★推奨</strong>。ベースライン 3,000 IOPS / 140 MiB/s が無料</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Hyperdisk Extreme</strong></td>
                                        <td>350,000</td>
                                        <td>5,000 MiB/s</td>
                                        <td>✅ 永続</td>
                                        <td>OLTP、ミッションクリティカル DB</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Hyperdisk Throughput</strong></td>
                                        <td>低い</td>
                                        <td>2,400 MiB/s</td>
                                        <td>✅ 永続</td>
                                        <td>大規模分析、低コスト</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Hyperdisk ML</strong></td>
                                        <td>高（読み取り）</td>
                                        <td>高（読み取り）</td>
                                        <td>✅ 永続</td>
                                        <td>AI/ML モデルの高速配信、読み取り専用共有</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Balanced Persistent Disk</strong></td>
                                        <td>80,000</td>
                                        <td>1,200 MiB/s</td>
                                        <td>✅ 永続</td>
                                        <td>従来型。容量に依存した性能</td>
                                    </tr>
                                    <tr>
                                        <td><strong>SSD Persistent Disk</strong></td>
                                        <td>100,000</td>
                                        <td>1,200 MiB/s</td>
                                        <td>✅ 永続</td>
                                        <td>高 IOPS 従来型</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Standard Persistent Disk</strong></td>
                                        <td>7,500</td>
                                        <td>400 MiB/s</td>
                                        <td>✅ 永続</td>
                                        <td>最安。バッチ、コールドデータ</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Local SSD</strong></td>
                                        <td>2,400,000+</td>
                                        <td>超高速</td>
                                        <td>❌ 一時</td>
                                        <td>VM停止でデータ消失。キャッシュ、一時処理のみ</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <CodeBlock lang="bash" html={`<span class="comment"># Hyperdisk Balanced の作成例（IOPS とスループットを独立指定）</span>
gcloud compute disks create my-hyperdisk \\
  <span class="flag">--type</span>=hyperdisk-balanced \\
  <span class="flag">--size</span>=500GB \\
  <span class="flag">--provisioned-iops</span>=10000 \\
  <span class="flag">--provisioned-throughput</span>=500 \\
  <span class="flag">--zone</span>=asia-northeast1-a`} />
                        <a href="https://docs.cloud.google.com/compute/docs/disks/hyperdisks" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 Hyperdisk 概要</a>
                        <a href="https://docs.cloud.google.com/compute/docs/disks" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 ストレージ種別選択ガイド</a>
                    </TopicCard>

                    {/* 2.1-C MIG */}
                    <TopicCard id="s21-mig" num="2.1-C" title="Managed Instance Group (MIG) — 自動スケールと高可用性">
                        <div className="diagram-wrap">
                            <div className="diagram-label">▶ MIG のアーキテクチャと自動機能</div>
                            <Diagram id="diag-3" label="MIG (Managed Instance Group) の構成と自動修復・スケーリング機能" />
                        </div>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">ゾーン MIG</th>
                                        <th scope="col">リージョン MIG</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>展開範囲</td>
                                        <td>1ゾーン</td>
                                        <td>最大3ゾーンに均等分散</td>
                                    </tr>
                                    <tr>
                                        <td>耐障害性</td>
                                        <td>低い（ゾーン障害で全停止）</td>
                                        <td><strong>高い（1ゾーン障害でも継続）</strong></td>
                                    </tr>
                                    <tr>
                                        <td>推奨環境</td>
                                        <td>開発・テスト</td>
                                        <td><strong>本番環境（必須）</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <CodeBlock lang="bash" html={`<span class="comment"># インスタンステンプレート作成 → リージョン MIG → オートスケール</span>
gcloud compute instance-templates create web-template \\
  <span class="flag">--machine-type</span>=n2-standard-4 <span class="flag">--boot-disk-type</span>=hyperdisk-balanced

gcloud compute instance-groups managed create web-mig \\
  <span class="flag">--template</span>=web-template <span class="flag">--size</span>=3 <span class="flag">--region</span>=asia-northeast1

gcloud compute instance-groups managed set-autoscaling web-mig \\
  <span class="flag">--region</span>=asia-northeast1 <span class="flag">--max-num-replicas</span>=10 \\
  <span class="flag">--min-num-replicas</span>=3 <span class="flag">--target-cpu-utilization</span>=0.6`} />
                        <div className="bp-grid">
                            <div className="bp-card">
                                <div className="bp-num">1</div>
                                <div className="bp-text">
                                    <strong>リージョン MIG を選択</strong> — ゾーン障害への耐性を確保（本番環境必須）
                                </div>
                            </div>
                            <div className="bp-card">
                                <div className="bp-num">2</div>
                                <div className="bp-text">
                                    <strong>max-num-replicas に上限</strong> — コスト暴走を防止
                                </div>
                            </div>
                            <div className="bp-card">
                                <div className="bp-num">3</div>
                                <div className="bp-text">
                                    <strong>ローリングアップデートは max-unavailable=0</strong> — ゼロダウンタイムを実現
                                </div>
                            </div>
                            <div className="bp-card">
                                <div className="bp-num">4</div>
                                <div className="bp-text">
                                    <strong>Spot VM との組み合わせ</strong> — バッチ処理コストを最大 91% 削減
                                </div>
                            </div>
                        </div>
                        <a href="https://docs.cloud.google.com/compute/docs/instance-groups/creating-groups-of-managed-instances" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 MIG 作成ガイド</a>
                    </TopicCard>

                    {/* 2.1-D OS Login */}
                    <TopicCard id="s21-oslogin" num="2.1-D" title="OS Login と VM Manager（OS パッチ・インベントリ・設定管理）">
                        <div className="diagram-wrap">
                            <div className="diagram-label">▶ OS Login による IAM 統合アクセス管理フロー</div>
                            <Diagram id="diag-4" label="OS Login を通じた IAM 連携 SSH 接続フロー" />
                        </div>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">OS Login ロール</th>
                                        <th scope="col">sudo 権限</th>
                                        <th scope="col">ユースケース</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>roles/compute.osLogin</code></td>
                                        <td>なし</td>
                                        <td>一般オペレーター</td>
                                    </tr>
                                    <tr>
                                        <td><code>roles/compute.osAdminLogin</code></td>
                                        <td><strong>あり</strong></td>
                                        <td>システム管理者</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <CodeBlock lang="bash" html={`<span class="comment"># OS Login + 2FA 有効化（プロジェクト全体）</span>
gcloud compute project-info add-metadata \\
  <span class="flag">--metadata</span> enable-oslogin=TRUE,enable-oslogin-2fa=TRUE

<span class="comment"># VM Manager を有効化</span>
gcloud compute project-info add-metadata \\
  <span class="flag">--metadata</span>=enable-osconfig=TRUE`} />
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">VM Manager 機能</th>
                                        <th scope="col">説明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>OS パッチ管理</strong></td>
                                        <td>パッチの定期スケジュール、ゾーン単位のローリング適用</td>
                                    </tr>
                                    <tr>
                                        <td><strong>OS インベントリ管理</strong></td>
                                        <td>インストール済みパッケージ・OS 情報の自動収集</td>
                                    </tr>
                                    <tr>
                                        <td><strong>OS 設定管理</strong></td>
                                        <td>エージェントの大規模展開、設定の強制適用</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <a href="https://docs.cloud.google.com/compute/docs/oslogin/set-up-oslogin" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 OS Login 設定</a>
                        <a href="https://docs.cloud.google.com/compute/vm-manager/docs/patch" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 VM Manager OS パッチ</a>
                    </TopicCard>

                    {/* 2.1-E Spot VM */}
                    <TopicCard id="s21-spot" num="2.1-E" title="Spot VM とカスタムマシンタイプ">
                        <div className="diagram-wrap">
                            <div className="diagram-label">▶ Spot VM の仕組みとフォールトトレラント設計</div>
                            <Diagram id="diag-5" label="Spot VM の割引特性・プリエンプトリスクと可用性向上対策" />
                        </div>
                        <CodeBlock lang="bash" html={`<span class="comment"># Spot VM の作成</span>
gcloud compute instances create my-spot-vm \\
  <span class="flag">--machine-type</span>=n2-standard-4 \\
  <span class="flag">--provisioning-model</span>=SPOT \\
  <span class="flag">--instance-termination-action</span>=STOP \\
  <span class="flag">--zone</span>=asia-northeast1-a

<span class="comment"># カスタムマシンタイプ（6 vCPU、20GB メモリ）</span>
gcloud compute instances create custom-vm \\
  <span class="flag">--custom-cpu</span>=6 <span class="flag">--custom-memory</span>=20GB \\
  <span class="flag">--zone</span>=asia-northeast1-a`} />
                        <a href="https://docs.cloud.google.com/compute/docs/instances/create-use-spot" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 Spot VM 作成と使用</a>
                        <a href="https://cloud.google.com/blog/products/compute/google-cloud-spot-vm-use-cases-and-best-practices" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 Spot VM ベストプラクティス</a>
                    </TopicCard>

                    {/* 2.1-F GKE */}
                    <TopicCard id="s21-gke" num="2.1-F" title="GKE の展開設定 — Autopilot / Standard / プライベートクラスタ">
                        <div className="diagram-wrap">
                            <div className="diagram-label">▶ GKE Autopilot vs Standard の選択フロー</div>
                            <Diagram id="diag-6" label="GKE Autopilot と Standard モードの選定意思決定ツリー" />
                        </div>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">Autopilot</th>
                                        <th scope="col">Standard</th>
                                        <th scope="col">説明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>ノード管理</strong></td>
                                        <td>Google が自動管理</td>
                                        <td>ユーザーが管理</td>
                                        <td>Autopilot は OS パッチも自動</td>
                                    </tr>
                                    <tr>
                                        <td><strong>課金単位</strong></td>
                                        <td>Pod リソース</td>
                                        <td>ノード（VM）</td>
                                        <td>Autopilot はアイドルコストなし</td>
                                    </tr>
                                    <tr>
                                        <td><strong>特権コンテナ</strong></td>
                                        <td>❌ 不可</td>
                                        <td>✅ 可能</td>
                                        <td>Standard のみ</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Workload Identity</strong></td>
                                        <td>自動有効</td>
                                        <td>手動設定</td>
                                        <td>JSON キーなしで GCP API アクセス</td>
                                    </tr>
                                    <tr>
                                        <td><strong>GPU/TPU</strong></td>
                                        <td>制限あり</td>
                                        <td>✅ 完全対応</td>
                                        <td>カスタム GPU ノードは Standard</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <CodeBlock lang="bash" html={`<span class="comment"># Autopilot クラスタの作成（推奨）</span>
gcloud container clusters create-auto my-autopilot-cluster \\
  <span class="flag">--region</span>=asia-northeast1 <span class="flag">--enable-private-nodes</span>

<span class="comment"># kubectl インストールとクラスタ認証</span>
gcloud components install kubectl
gcloud container clusters get-credentials my-cluster <span class="flag">--region</span>=asia-northeast1`} />
                        <a href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/autopilot-security" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 GKE Autopilot セキュリティ</a>
                        <a href="https://docs.cloud.google.com/kubernetes-engine/docs/resources/autopilot-standard-feature-comparison" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 Autopilot vs Standard 比較</a>
                    </TopicCard>

                    {/* 2.1-G Cloud Run */}
                    <TopicCard id="s21-serverless" num="2.1-G" title="サーバーレス — Cloud Run / Cloud Run Functions / Eventarc">
                        <div className="diagram-wrap">
                            <div className="diagram-label">▶ Cloud Run ネットワーキングアーキテクチャ（第2世代）</div>
                            <Diagram id="diag-7" label="Cloud Run の入出力アクセスおよび Eventarc 連携構造" />
                        </div>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">トリガー種別</th>
                                        <th scope="col">ユースケース</th>
                                        <th scope="col">設定方法</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Pub/Sub メッセージ</strong></td>
                                        <td>非同期処理、キューイング</td>
                                        <td>Eventarc / 直接 Pub/Sub push</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Cloud Storage 変更通知</strong></td>
                                        <td>ファイルアップロード処理</td>
                                        <td>Eventarc</td>
                                    </tr>
                                    <tr>
                                        <td><strong>HTTP リクエスト</strong></td>
                                        <td>REST API、Webhook</td>
                                        <td>直接 HTTPS エンドポイント</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Cloud Scheduler</strong></td>
                                        <td>定期バッチ処理</td>
                                        <td>Scheduler → Pub/Sub → Cloud Run</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <CodeBlock lang="bash" html={`<span class="comment"># Cloud Run のデプロイ（第2世代 + Direct VPC Egress）</span>
gcloud run deploy my-service \\
  <span class="flag">--image</span>=gcr.io/PROJECT_ID/my-app:latest \\
  <span class="flag">--region</span>=asia-northeast1 \\
  <span class="flag">--execution-environment</span>=gen2 \\
  <span class="flag">--vpc-egress</span>=all-traffic <span class="flag">--network</span>=my-vpc \\
  <span class="flag">--min-instances</span>=1 <span class="flag">--max-instances</span>=100`} />
                        <a href="https://docs.cloud.google.com/run/docs/configuring/networking-best-practices" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 Cloud Run ネットワーキング</a>
                    </TopicCard>

                    {/* 2.1-H GPU */}
                    <TopicCard id="s21-gpu" num="2.1-H" title="GPU と TPU の選択基準" isNew={true}>
                        <div className="diagram-wrap">
                            <div className="diagram-label">▶ GPU vs TPU の選択フローチャート</div>
                            <Diagram id="diag-8" label="ワークロードの種類とフレームワークによる GPU/TPU 選定フロー" />
                        </div>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">アクセラレータ</th>
                                        <th scope="col">マシンファミリー</th>
                                        <th scope="col">ユースケース</th>
                                        <th scope="col">特記事項</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>NVIDIA L4</strong></td>
                                        <td>G2</td>
                                        <td>コスト効率の良い推論、動画処理</td>
                                        <td>汎用 GPU の中でコスパ最高</td>
                                    </tr>
                                    <tr>
                                        <td><strong>NVIDIA A100</strong></td>
                                        <td>A2</td>
                                        <td>大規模 ML トレーニング、科学計算</td>
                                        <td>HBM メモリ搭載</td>
                                    </tr>
                                    <tr>
                                        <td><strong>NVIDIA H100</strong></td>
                                        <td>A3</td>
                                        <td>最先端 LLM トレーニング</td>
                                        <td>最高性能 GPU</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Cloud TPU v4/v5</strong></td>
                                        <td>専用 Pod</td>
                                        <td>大規模 TF/JAX モデル</td>
                                        <td>Google 独自設計、超大規模 LLM</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="callout callout-yellow">
                            <span className="callout-icon" aria-hidden="true">⚠️</span>
                            <div>
                                <strong>必須:</strong> GPU/TPU 搭載 VM は <code>--maintenance-policy=TERMINATE</code> が強制されます（ライブマイグレーション不可）。
                            </div>
                        </div>
                        <a href="https://docs.cloud.google.com/compute/docs/gpus" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 GPU ドキュメント</a>
                    </TopicCard>

                    {/* 2.1-I Agent Runtime */}
                    <TopicCard id="s21-agent" num="2.1-I" title="Agent Runtime on Gemini Enterprise Agent Platform" isNew={true}>
                        <div className="callout callout-blue">
                            <span className="callout-icon" aria-hidden="true">🤖</span>
                            <div>
                                2026年6月版の試験ガイドで新規追加。旧名: Vertex AI Agent Engine。Python フレームワーク（LangChain、ADK 等）で構築した AI エージェントをフルマネージドで実行するプラットフォームです。
                            </div>
                        </div>
                        <div className="diagram-wrap">
                            <div className="diagram-label">▶ Agent Runtime のアーキテクチャ</div>
                            <Diagram id="diag-9" label="Agent Runtime (Gemini Enterprise Agent Platform) の実行・管理アーキテクチャ" />
                        </div>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">機能</th>
                                        <th scope="col">説明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>マネージドランタイム</strong></td>
                                        <td>コンテナ化・デプロイを自動処理、スケーリングも管理不要</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Sessions</strong></td>
                                        <td>会話履歴を管理、マルチターン会話をサポート</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Memory Bank</strong></td>
                                        <td>会話から長期記憶を抽出、パーソナライズを実現</td>
                                    </tr>
                                    <tr>
                                        <td><strong>課金モデル</strong></td>
                                        <td>vCPU 時 + GiB 時（使用リソースに応じた課金）</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <a href="https://cloud.google.com/products/gemini-enterprise-agent-platform" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 Agent Platform 公式ページ</a>
                    </TopicCard>

                    {/* ===== SECTION 2.2 ===== */}
                    <div id="s22" className="section-header">
                        <div className="section-icon-wrap section-icon-cyan" aria-hidden="true">🗄️</div>
                        <div className="section-meta">
                            <div className="section-number">Section 2.2</div>
                            <h2 className="section-title-main">ストレージとデータソリューションの計画と実装</h2>
                        </div>
                        <span className="section-weight">~8–10問</span>
                    </div>

                    {/* 2.2-A DB */}
                    <TopicCard id="s22-db" num="2.2-A" title="データベースサービスの選択と展開">
                        <div className="diagram-wrap">
                            <div className="diagram-label">▶ データベース選択フローチャート</div>
                            <Diagram id="diag-10" label="要件（構造、ACID、SLA等）に基づくデータベース選択フローチャート" />
                        </div>
                        <div className="sub-title">データベースサービス完全比較表</div>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">サービス</th>
                                        <th scope="col">種別</th>
                                        <th scope="col">スケール</th>
                                        <th scope="col">整合性</th>
                                        <th scope="col">ユースケース</th>
                                        <th scope="col">2026 新機能</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Cloud SQL</strong></td>
                                        <td>リレーショナル</td>
                                        <td>中規模</td>
                                        <td>強整合性</td>
                                        <td>Web アプリ、ERP</td>
                                        <td>—</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Cloud Spanner</strong></td>
                                        <td>リレーショナル</td>
                                        <td>グローバル水平</td>
                                        <td>外部整合性</td>
                                        <td>金融、グローバル在庫</td>
                                        <td>—</td>
                                    </tr>
                                    <tr>
                                        <td><strong>AlloyDB</strong></td>
                                        <td>リレーショナル（PG互換）</td>
                                        <td>大規模</td>
                                        <td>強整合性</td>
                                        <td>HTAP、高性能 OLTP</td>
                                        <td>pgvector ベクトル検索</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Firestore</strong></td>
                                        <td>ドキュメント型</td>
                                        <td>自動</td>
                                        <td>強整合性</td>
                                        <td>モバイル、IoT</td>
                                        <td>—</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Cloud Bigtable</strong></td>
                                        <td>ワイドカラム型</td>
                                        <td>ペタバイト</td>
                                        <td>結果整合性</td>
                                        <td>時系列、IoT、広告</td>
                                        <td>—</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Memorystore</strong></td>
                                        <td>インメモリ</td>
                                        <td>中規模</td>
                                        <td>—</td>
                                        <td>キャッシュ、セッション</td>
                                        <td>—</td>
                                    </tr>
                                    <tr>
                                        <td><strong>BigQuery</strong></td>
                                        <td>DWH</td>
                                        <td>ペタバイト</td>
                                        <td>—</td>
                                        <td>分析、BI、ML</td>
                                        <td>BigQuery ML、Omni</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Managed Kafka</strong></td>
                                        <td>ストリーミング</td>
                                        <td>大規模</td>
                                        <td>—</td>
                                        <td>Kafka 互換ストリーミング</td>
                                        <td><strong>★2026年新サービス</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <a href="https://cloud.google.com/blog/topics/developers-practitioners/your-google-cloud-database-options-explained" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 DB 選定ガイド（ブログ）</a>
                        <a href="https://cloud.google.com/managed-kafka/docs/overview" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 Managed Kafka</a>
                    </TopicCard>

                    {/* 2.2-B Storage */}
                    <TopicCard id="s22-storage" num="2.2-B" title="ストレージサービス — Cloud Storage / Filestore / Managed Lustre / NetApp Volumes" isNew={true}>
                        <div className="sub-title">Cloud Storage ストレージクラスの選択</div>
                        <div className="diagram-wrap">
                            <div className="diagram-label">▶ アクセス頻度によるストレージクラス選択</div>
                            <Diagram id="diag-11" label="アクセス頻度および保管期間の要件による Cloud Storage クラス選択" />
                        </div>
                        <div className="sub-title">ファイルストレージサービスの比較（2026年版）</div>
                        <div className="callout callout-blue">
                            <span className="callout-icon" aria-hidden="true">💡</span>
                            <div>
                                2026年版では <strong>Google Cloud Managed Lustre</strong> と <strong>Google Cloud NetApp Volumes</strong> が試験範囲に追加されました。
                            </div>
                        </div>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">サービス</th>
                                        <th scope="col">プロトコル</th>
                                        <th scope="col">パフォーマンス</th>
                                        <th scope="col">ユースケース</th>
                                        <th scope="col">特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Filestore</strong></td>
                                        <td>NFS</td>
                                        <td>高い</td>
                                        <td>GKE 共有ストレージ、CMS</td>
                                        <td>スケール: GiB〜100TiB</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Managed Lustre</strong></td>
                                        <td>Lustre（並列FS）</td>
                                        <td>超高速（ペタバイト）</td>
                                        <td>HPC、AI/ML トレーニング、大規模科学計算</td>
                                        <td>複数 VM からの並列 I/O アクセス</td>
                                    </tr>
                                    <tr>
                                        <td><strong>NetApp Volumes</strong></td>
                                        <td>NFS / SMB / iSCSI</td>
                                        <td>高い（複数ティア）</td>
                                        <td>エンタープライズ、Windows/Linux 混在</td>
                                        <td>ONTAP 互換、スナップショット/レプリケーション内蔵</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="diagram-wrap">
                            <div className="diagram-label">▶ ファイルストレージ選択フローチャート</div>
                            <Diagram id="diag-12" label="共有要件・パフォーマンス・プロトコルに基づくファイル共有ストレージ選択フロー" />
                        </div>
                        <a href="https://docs.cloud.google.com/storage/docs/best-practices" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 Cloud Storage ベストプラクティス</a>
                        <a href="https://cloud.google.com/products/managed-lustre" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 Managed Lustre</a>
                        <a href="https://cloud.google.com/netapp-volumes" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 NetApp Volumes</a>
                    </TopicCard>

                    {/* 2.2-C Data Load & Redundancy */}
                    <TopicCard id="s22-load" num="2.2-C" title="データのロード方法とマルチリージョン冗長性">
                        <div className="sub-title">データロード手法の比較</div>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">方法</th>
                                        <th scope="col">ユースケース</th>
                                        <th scope="col">特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>gcloud storage cp</strong></td>
                                        <td>小〜中規模のファイル転送</td>
                                        <td>シンプル、スクリプト化が容易</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Cloud Storage からのロード</strong></td>
                                        <td>BigQuery、Bigtable への一括ロード</td>
                                        <td><strong>最も効率的なバルクロード手法</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Storage Transfer Service</strong></td>
                                        <td>他クラウド/オンプレミスからの移行</td>
                                        <td>スケジュール設定、大規模データ移行</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Dataflow</strong></td>
                                        <td>ストリーミング/バッチ ETL</td>
                                        <td>リアルタイム変換、複雑なパイプライン</td>
                                    </tr>
                                    <tr>
                                        <td><strong>BigQuery Data Transfer Service</strong></td>
                                        <td>SaaS からの定期取り込み</td>
                                        <td>Google Analytics、Ads 等と統合</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="sub-title">マルチリージョン冗長性の設計パターン</div>
                        <div className="diagram-wrap">
                            <div className="diagram-label">▶ SLA / RPO 要件によるリージョン冗長性の選択</div>
                            <Diagram id="diag-13" label="可用性目標（SLA/RPO/RTO）別の冗長性レベル選択フロー" />
                        </div>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">サービス</th>
                                        <th scope="col">Single Region</th>
                                        <th scope="col">Dual Region</th>
                                        <th scope="col">Multi Region</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Cloud Storage</strong></td>
                                        <td>✅</td>
                                        <td>✅（2リージョン）</td>
                                        <td>✅（US/EU/ASIA）</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Cloud SQL</strong></td>
                                        <td>HA（同一リージョン2ゾーン）</td>
                                        <td>クロスリージョンレプリカ（読み取り専用）</td>
                                        <td>❌</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Cloud Spanner</strong></td>
                                        <td>✅</td>
                                        <td>✅</td>
                                        <td>✅（真のグローバル分散）</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Firestore</strong></td>
                                        <td>✅</td>
                                        <td>❌</td>
                                        <td>✅</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </TopicCard>

                    {/* ===== SECTION 2.3 ===== */}
                    <div id="s23" className="section-header">
                        <div className="section-icon-wrap section-icon-green" aria-hidden="true">🌐</div>
                        <div className="section-meta">
                            <div className="section-number">Section 2.3</div>
                            <h2 className="section-title-main">ネットワークリソースの計画と実装</h2>
                        </div>
                        <span className="section-weight">~8–10問</span>
                    </div>

                    {/* 2.3-A VPC */}
                    <TopicCard id="s23-vpc" num="2.3-A" title="VPC とサブネットの設計 — Shared VPC / VPC Peering">
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">VPC モード</th>
                                        <th scope="col">説明</th>
                                        <th scope="col">推奨用途</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Auto Mode</strong></td>
                                        <td>各リージョンにサブネットを自動作成（10.128.0.0/9）</td>
                                        <td>学習・PoC</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Custom Mode</strong></td>
                                        <td>サブネット of IP レンジを手動設計</td>
                                        <td><strong>本番環境（必須）</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="diagram-wrap">
                            <div className="diagram-label">▶ Shared VPC vs VPC Network Peering の比較</div>
                            <Diagram id="diag-14" label="Shared VPC と VPC Peering の適用トポロジとルーティング特性" />
                        </div>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">比較項目</th>
                                        <th scope="col">Shared VPC</th>
                                        <th scope="col">VPC Network Peering</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>管理の一元化</strong></td>
                                        <td>✅ ホストプロジェクトで集中管理</td>
                                        <td>❌ 各 VPC で個別管理</td>
                                    </tr>
                                    <tr>
                                        <td><strong>推移性</strong></td>
                                        <td>✅ サービスプロジェクト全体でアクセス</td>
                                        <td>❌ <strong>推移的でない</strong>（A-B-C は A-C 通信不可）</td>
                                    </tr>
                                    <tr>
                                        <td><strong>異組織間</strong></td>
                                        <td>❌ 同一組織内のみ</td>
                                        <td>✅ 異組織間も可能</td>
                                    </tr>
                                    <tr>
                                        <td><strong>IP 重複</strong></td>
                                        <td>管理可能</td>
                                        <td>❌ 重複した IP レンジは Peering 不可</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="callout callout-red">
                            <span className="callout-icon" aria-hidden="true">🚨</span>
                            <div>
                                <strong>試験の最頻出トラップ:</strong> VPC Peering は推移的ではありません。VPC A↔B、B↔C でも A と C は直接通信できません。A-C 間も通信させるには追加の Peering が必要です。
                            </div>
                        </div>
                        <a href="https://docs.cloud.google.com/vpc/docs/shared-vpc" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 Shared VPC</a>
                        <a href="https://docs.cloud.google.com/architecture/best-practices-vpc-design" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 VPC 設計ベストプラクティス</a>
                    </TopicCard>

                    {/* 2.3-B Cloud NGFW */}
                    <TopicCard id="s23-fw" num="2.3-B" title="VPC ファイアウォールと Cloud NGFW — Secure Tags" isNew={true}>
                        <div className="diagram-wrap">
                            <div className="diagram-label">▶ Cloud NGFW のティア構成</div>
                            <Diagram id="diag-15" label="Cloud NGFW ティア別の機能（Essentials/Standard/Enterprise）" />
                        </div>
                        <div className="sub-title">ネットワークタグ vs セキュアタグ（Cloud NGFW）</div>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">比較項目</th>
                                        <th scope="col">ネットワークタグ（従来）</th>
                                        <th scope="col">セキュアタグ（Cloud NGFW）</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>管理</strong></td>
                                        <td>VM のメタデータに直接設定</td>
                                        <td>組織/プロジェクトレベルで IAM 管理</td>
                                    </tr>
                                    <tr>
                                        <td><strong>セキュリティ</strong></td>
                                        <td>ユーザーが自由に変更可能</td>
                                        <td><strong>タグの付与・変更に IAM 権限が必要</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>スコープ</strong></td>
                                        <td>ネットワーク内のみ</td>
                                        <td><strong>組織全体</strong>に適用可能</td>
                                    </tr>
                                    <tr>
                                        <td><strong>適用ポリシー</strong></td>
                                        <td>VPC ファイアウォールルール</td>
                                        <td>Cloud NGFW ネットワークポリシー</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <CodeBlock lang="bash" html={`<span class="comment"># SSH は IAP からのみ許可（ネットワークタグベース）</span>
gcloud compute firewall-rules create allow-ssh-iap \\
  <span class="flag">--network</span>=my-vpc <span class="flag">--direction</span>=INGRESS \\
  <span class="flag">--action</span>=ALLOW <span class="flag">--rules</span>=tcp:22 \\
  <span class="flag">--target-tags</span>=ssh-allowed \\
  <span class="flag">--source-ranges</span>=35.235.240.0/20

<span class="comment"># セキュアタグキーの作成（Cloud NGFW）</span>
gcloud resource-manager tags keys create webserver \\
  <span class="flag">--parent</span>=organizations/ORG_ID \\
  <span class="flag">--purpose</span>=GCE_FIREWALL \\
  <span class="flag">--purpose-data</span>=network=//compute.googleapis.com/projects/PROJECT/global/networks/my-vpc`} />
                        <a href="https://docs.cloud.google.com/firewall/docs/about-firewalls" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 Cloud NGFW 概要</a>
                        <a href="https://docs.cloud.google.com/firewall/docs/tags-firewalls-overview" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 Secure Tags</a>
                        <a href="https://docs.cloud.google.com/firewall/docs/ngfw_tiers" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 Cloud NGFW Tiers</a>
                    </TopicCard>

                    {/* 2.3-C Connections */}
                    <TopicCard id="s23-conn" num="2.3-C" title="ネットワーク接続の確立 — Cloud VPN / Cloud Interconnect">
                        <div className="diagram-wrap">
                            <div className="diagram-label">▶ オンプレミス / 他クラウドとの接続オプション</div>
                            <Diagram id="diag-16" label="VPN、Interconnect、Peering によるオンプレ接続設計フロー" />
                        </div>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">接続方法</th>
                                        <th scope="col">帯域</th>
                                        <th scope="col">SLA</th>
                                        <th scope="col">コスト</th>
                                        <th scope="col">ユースケース</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>HA VPN</strong></td>
                                        <td>最大 3Gbps/トンネル</td>
                                        <td>99.99%（HA 構成）</td>
                                        <td>低い</td>
                                        <td>オンプレミス接続の標準</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Interconnect (Dedicated)</strong></td>
                                        <td>10G or 100Gbps</td>
                                        <td>99.99%</td>
                                        <td>高い</td>
                                        <td>大規模・ミッションクリティカル</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Interconnect (Partner)</strong></td>
                                        <td>50Mbps〜10Gbps</td>
                                        <td>99.99%</td>
                                        <td>中程度</td>
                                        <td>専用線が直接引けない場合</td>
                                    </tr>
                                    <tr>
                                        <td><strong>VPC Network Peering</strong></td>
                                        <td>ネットワーク上限まで</td>
                                        <td>—</td>
                                        <td>なし</td>
                                        <td>同一 GCP 内の VPC 間</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </TopicCard>

                    {/* 2.3-D LB */}
                    <TopicCard id="s23-lb" num="2.3-D" title="ロードバランサの選定">
                        <div className="diagram-wrap">
                            <div className="diagram-label">▶ ロードバランサ選択フローチャート</div>
                            <Diagram id="diag-17" label="プロトコル、スコープ、処理形態別のロードバランサ選択フロー" />
                        </div>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ロードバランサ</th>
                                        <th scope="col">レイヤ</th>
                                        <th scope="col">スコープ</th>
                                        <th scope="col">送信元 IP 保持</th>
                                        <th scope="col">SSL 終端</th>
                                        <th scope="col">Cloud Armor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Global External ALB</strong></td>
                                        <td>L7</td>
                                        <td>グローバル</td>
                                        <td>❌</td>
                                        <td>✅ エッジ</td>
                                        <td>✅</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Regional External ALB</strong></td>
                                        <td>L7</td>
                                        <td>リージョン</td>
                                        <td>❌</td>
                                        <td>✅ リージョン</td>
                                        <td>✅</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Internal ALB</strong></td>
                                        <td>L7</td>
                                        <td>VPC 内部</td>
                                        <td>❌</td>
                                        <td>✅</td>
                                        <td>❌</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Proxy Network LB</strong></td>
                                        <td>L4</td>
                                        <td>リージョン</td>
                                        <td>❌</td>
                                        <td>✅</td>
                                        <td>❌</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Passthrough Network LB</strong></td>
                                        <td>L4</td>
                                        <td>リージョン</td>
                                        <td>✅</td>
                                        <td>❌</td>
                                        <td>❌</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Internal Passthrough NLB</strong></td>
                                        <td>L4</td>
                                        <td>VPC 内部</td>
                                        <td>✅</td>
                                        <td>❌</td>
                                        <td>❌</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="callout callout-red">
                            <span className="callout-icon" aria-hidden="true">🚨</span>
                            <div>
                                <strong>試験頻出の罠（3つ）:</strong><br />
                                ① コンプライアンス要件（データを特定リージョンに留める）がある場合は必ず <strong>Regional LB</strong> を選択<br />
                                ② Proxy 型 NLB は送信元 IP が失われる（<code>X-Forwarded-For</code> ヘッダーで補完）<br />
                                ③ UDP が必要な場合は <strong>Passthrough Network LB</strong> のみ対応
                            </div>
                        </div>
                        <a href="https://docs.cloud.google.com/load-balancing/docs/choosing-load-balancer" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 ロードバランサ選定ガイド</a>
                    </TopicCard>

                    {/* 2.3-E Network Service Tier */}
                    <TopicCard id="s23-tier" num="2.3-E" title="ネットワークサービスティア — Premium vs Standard" isNew={true}>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ティア</th>
                                        <th scope="col">コスト</th>
                                        <th scope="col">パフォーマンス</th>
                                        <th scope="col">特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Premium Tier</strong></td>
                                        <td>高い</td>
                                        <td>最高</td>
                                        <td>Google のグローバルバックボーンを使用。Global ALB、低レイテンシ、Anycast IP</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Standard Tier</strong></td>
                                        <td>低い</td>
                                        <td>通常</td>
                                        <td>インターネット経由でルーティング。リージョン単位の処理。Global ALB は使用不可</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="diagram-wrap">
                            <div className="diagram-label">▶ Premium vs Standard ルーティング経路</div>
                            <Diagram id="diag-18" label="Premium Tier と Standard Tier のデータルーティング経路比較" />
                        </div>
                        <div className="callout callout-yellow">
                            <span className="callout-icon" aria-hidden="true">⚠️</span>
                            <div>
                                <strong>重要:</strong> <code>Global External ALB</code> は <strong>Premium Tier</strong> でのみ真のグローバル配信が可能です。Standard Tier を選択すると Regional LB として動作し、Anycast IP のメリットが失われます。
                            </div>
                        </div>
                        <a href="https://cloud.google.com/network-tiers/docs/overview" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 ネットワークサービスティア</a>
                    </TopicCard>

                    {/* ===== SECTION 2.4 ===== */}
                    <div id="s24-iac" className="section-header">
                        <div className="section-icon-wrap section-icon-yellow" aria-hidden="true">🔧</div>
                        <div className="section-meta">
                            <div className="section-number">Section 2.4</div>
                            <h2 className="section-title-main">ツールを用いたリソースの計画と実装</h2>
                        </div>
                        <span className="section-weight">~4–6問</span>
                    </div>

                    {/* 2.4-A IaC */}
                    <TopicCard num="2.4-A" title="Infrastructure as Code — Terraform / Fabric FAST / Config Connector / Helm" isNew={true}>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ツール</th>
                                        <th scope="col">特性</th>
                                        <th scope="col">主な用途</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Terraform</strong></td>
                                        <td>宣言的 IaC、プロバイダーエコシステム</td>
                                        <td>GCP リソースの全般的な管理</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Fabric FAST</strong></td>
                                        <td>Terraform ベースのエンタープライズ Landing Zone</td>
                                        <td>組織全体の基盤構築、<strong>Google PSO 推奨</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Config Connector</strong></td>
                                        <td>Kubernetes CRD で GCP リソースを管理</td>
                                        <td>GKE 環境での GCP リソース管理</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Helm</strong></td>
                                        <td>Kubernetes パッケージマネージャー</td>
                                        <td>GKE アプリケーションのデプロイ管理</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="sub-title">Terraform の安全なデプロイフロー</div>
                        <div className="diagram-wrap">
                            <div className="diagram-label">▶ GitOps による Terraform 運用フロー</div>
                            <Diagram id="diag-19" label="Terraform Plan、承認、Apply、State 管理の GitOps ワークフロー" />
                        </div>
                        <CodeBlock lang="hcl" html={`<span class="comment"># backend.tf — State をリモートバックエンドで管理（必須）</span>
terraform {
  backend "gcs" {
    bucket  = "my-terraform-state-bucket"
    prefix  = "terraform/state"
  }
}`} />
                        <CodeBlock lang="bash" html={`<span class="comment"># State バケットの作成（バージョニング必須）</span>
gcloud storage buckets create gs://my-terraform-state-bucket \\
  <span class="flag">--location</span>=asia-northeast1 <span class="flag">--uniform-bucket-level-access</span>

gcloud storage buckets update gs://my-terraform-state-bucket --versioning`} />
                        <div className="sub-title">Fabric FAST — Google PSO 推奨の Landing Zone ツールキット</div>
                        <div className="diagram-wrap">
                            <div className="diagram-label">▶ Fabric FAST の段階的デプロイフロー</div>
                            <Diagram id="diag-20" label="Fabric FAST のブートストラップからプロジェクト作成までの4ステージ" />
                        </div>
                        <div className="callout callout-green">
                            <span className="callout-icon" aria-hidden="true">✅</span>
                            <div>
                                <strong>Fabric FAST の特徴:</strong> YAML ファクトリでサブネット・ファイアウォール・プロジェクトを宣言的管理。Google Cloud Professional Services Organization が実績から構築したエンタープライズ向けベストプラクティスが組み込み済み。
                            </div>
                        </div>
                        <a href="https://github.com/GoogleCloudPlatform/cloud-foundation-fabric/tree/master/fast" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 Fabric FAST（GitHub）</a>
                        <a href="https://docs.cloud.google.com/docs/terraform/best-practices/operations" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 Terraform ベストプラクティス</a>
                        <a href="https://cloud.google.com/config-connector/docs/overview" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 Config Connector</a>
                    </TopicCard>

                    {/* 2.4-B AI Tools */}
                    <TopicCard id="s24-ai" num="2.4-B" title="AI 支援による計画と実装 — Gemini Cloud Assist / Gemini CLI" isNew={true}>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ツール</th>
                                        <th scope="col">主な機能</th>
                                        <th scope="col">ユースケース</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Gemini Cloud Assist</strong></td>
                                        <td>Cloud Console 内の AI アシスタント</td>
                                        <td>アーキテクチャ設計、トラブルシューティング、根本原因分析（RCA）</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Gemini CLI</strong></td>
                                        <td>コマンドライン AI インターフェース</td>
                                        <td>ターミナルから自然言語で GCP を操作</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Application Design Center</strong></td>
                                        <td>アプリケーション設計の可視化・管理</td>
                                        <td>マイクロサービスアーキテクチャの設計</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="diagram-wrap">
                            <div className="diagram-label">▶ Gemini Cloud Assist の主要機能</div>
                            <Diagram id="diag-21" label="Gemini Cloud Assist の FinOps、トラブルシュート、設計支援機能" />
                        </div>
                        <a href="https://docs.cloud.google.com/cloud-assist/overview" target="_blank" rel="noopener noreferrer" className="ref-link">🔗 Gemini Cloud Assist</a>
                    </TopicCard>

                    {/* ===== SUMMARY ===== */}
                    <div id="summary" className="section-header">
                        <div className="section-icon-wrap section-icon-red" aria-hidden="true">🎯</div>
                        <div className="section-meta">
                            <div className="section-number">試験対策まとめ</div>
                            <h2 className="section-title-main">頻出パターン別 解法ガイドと直前チェックリスト</h2>
                        </div>
                    </div>

                    {/* Summary-A Map */}
                    <TopicCard num="Summary-A" title="キーワード → 正解サービス 即答マップ">
                        <div className="pattern-grid">
                            <div className="pattern-card">
                                <div className="pattern-card-head ph-blue">
                                    💻 Pattern A: コンピューティングサービス
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「VM 完全制御・特定 OS・ライセンス」</span>
                                    <span className="pattern-ans blue">Compute Engine</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「コスト最小化・バッチ・停止許容」</span>
                                    <span className="pattern-ans blue">Spot VM + MIG</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「コンテナ・K8s・運用負荷を減らしたい」</span>
                                    <span className="pattern-ans blue">GKE Autopilot ★</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「特権コンテナ・DaemonSet・GPU」</span>
                                    <span className="pattern-ans blue">GKE Standard</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「HTTP API・ゼロスケール・サーバーレス」</span>
                                    <span className="pattern-ans blue">Cloud Run</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「イベント駆動・軽量処理・Webhook」</span>
                                    <span className="pattern-ans blue">Cloud Run Functions</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「AI エージェント・Python フレームワーク」</span>
                                    <span className="pattern-ans blue">Agent Runtime 🆕</span>
                                </div>
                            </div>
                            <div className="pattern-card">
                                <div className="pattern-card-head ph-cyan">
                                    🗄️ Pattern B: データベースサービス
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「グローバル分散・99.999%・水平スケール」</span>
                                    <span className="pattern-ans cyan">Cloud Spanner</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「PG 互換・高性能 OLTP・HTAP」</span>
                                    <span className="pattern-ans cyan">AlloyDB</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「MySQL/PG・標準的な Web アプリ」</span>
                                    <span className="pattern-ans cyan">Cloud SQL</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「ペタバイト・時系列・IoT・ミリ秒以下」</span>
                                    <span className="pattern-ans cyan">Cloud Bigtable</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「リアルタイム同期・モバイルアプリ」</span>
                                    <span className="pattern-ans cyan">Firestore</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「マイクロ秒・キャッシュ・セッション」</span>
                                    <span className="pattern-ans cyan">Memorystore</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「DWH・SQL 分析・ペタバイト分析」</span>
                                    <span className="pattern-ans cyan">BigQuery</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「Kafka 互換・ストリーミング」</span>
                                    <span className="pattern-ans cyan">Managed Kafka 🆕</span>
                                </div>
                            </div>
                            <div className="pattern-card">
                                <div className="pattern-card-head ph-green">
                                    🌐 Pattern C: ネットワーク / FW
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「SSH を IAM で管理したい」</span>
                                    <span className="pattern-ans green">OS Login</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「SSH を安全に・外部 IP なしで接続」</span>
                                    <span className="pattern-ans green">IAP + OS Login</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「組織全体に FW ポリシーを適用」</span>
                                    <span className="pattern-ans green">Cloud NGFW 🆕</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「ID ベースのマイクロセグメンテーション」</span>
                                    <span className="pattern-ans green">Secure Tags 🆕</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「データを特定リージョンに限定」</span>
                                    <span className="pattern-ans green">Regional LB + 組織ポリシー</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「複数プロジェクトでネットワーク共有」</span>
                                    <span className="pattern-ans green">Shared VPC</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「A→B→C でも A から C に通信したい」</span>
                                    <span className="pattern-ans green">追加 Peering が必要</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「UDP・送信元 IP 保持が必要」</span>
                                    <span className="pattern-ans green">Passthrough Network LB</span>
                                </div>
                            </div>
                            <div className="pattern-card">
                                <div className="pattern-card-head ph-yellow">
                                    💾 Pattern D: ストレージ選択
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「IOPS/スループットを独立制御したい」</span>
                                    <span className="pattern-ans yellow">Hyperdisk Balanced 🆕</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「最高 IOPS・ミッションクリティカル DB」</span>
                                    <span className="pattern-ans yellow">Hyperdisk Extreme 🆕</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「HPC・並列 FS・多数 VM から同時アクセス」</span>
                                    <span className="pattern-ans yellow">Managed Lustre 🆕</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「NFS/SMB 両方・ONTAP・エンタープライズ」</span>
                                    <span className="pattern-ans yellow">NetApp Volumes 🆕</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「VM の一時データ・最高速・消失 OK」</span>
                                    <span className="pattern-ans yellow">Local SSD</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「頻繁アクセス・コスト最安/GB」</span>
                                    <span className="pattern-ans yellow">GCS Standard</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「年 1 回以下・法規制保管・365日+」</span>
                                    <span className="pattern-ans yellow">GCS Archive</span>
                                </div>
                                <div className="pattern-row">
                                    <span className="pattern-kw">「グローバル ALB + 最低レイテンシ」</span>
                                    <span className="pattern-ans yellow">Premium Tier 🆕</span>
                                </div>
                            </div>
                        </div>
                    </TopicCard>

                    {/* Checklist */}
                    <TopicCard id="checklist" num="Summary-B" title="試験直前チェックリスト — Section 2 完全版">
                        <div className="sub-title">2.1 コンピューティング</div>
                        <ul className="checklist">
                            <li>
                                <CheckItem>GKE Autopilot vs Standard の使い分け基準（特権コンテナ・DaemonSet・カーネル変更）を即答できる</CheckItem>
                            </li>
                            <li>
                                <CheckItem>Spot VM のプリエンプト対応設計（チェックポイント・シャットダウンスクリプト・MIG との組み合わせ）を知っている</CheckItem>
                            </li>
                            <li>
                                <CheckItem>Hyperdisk Balanced が Persistent Disk より優れている点（性能と容量の独立制御）を説明できる</CheckItem>
                            </li>
                            <li>
                                <CheckItem>OS Login が有効な場合、プロジェクトレベルの SSH キーが無視されることを知っている</CheckItem>
                            </li>
                            <li>
                                <CheckItem>VM Manager の OS Patch Management の主要機能（パッチ管理・インベントリ・設定管理）を知っている</CheckItem>
                            </li>
                            <li>
                                <CheckItem>Cloud Run のトリガー種別（HTTP・Pub/Sub・Eventarc・Cloud Storage）を知っている</CheckItem>
                            </li>
                            <li>
                                <CheckItem>GPU/TPU 搭載 VM は Maintenance Policy が TERMINATE 強制であることを知っている</CheckItem>
                            </li>
                            <li>
                                <CheckItem>Agent Runtime が Python エージェントのマネージド実行基盤であることを知っている</CheckItem>
                            </li>
                        </ul>

                        <div className="sub-title">2.2 ストレージとデータ</div>
                        <ul className="checklist">
                            <li>
                                <CheckItem>Cloud Storage の 4 クラスと最小保存期間（なし・30日・90日・365日）を暗記している</CheckItem>
                            </li>
                            <li>
                                <CheckItem>Cloud SQL / Spanner / AlloyDB / Bigtable / Firestore の使い分けを即答できる</CheckItem>
                            </li>
                            <li>
                                <CheckItem>Managed Lustre（並列 FS・HPC）と NetApp Volumes（ONTAP・NFS/SMB/iSCSI）の違いを説明できる</CheckItem>
                            </li>
                            <li>
                                <CheckItem>BigQuery へのデータロードは Cloud Storage 経由が最も効率的であることを知っている</CheckItem>
                            </li>
                            <li>
                                <CheckItem>マルチリージョン vs デュアルリージョン vs シングルリージョンの使い分けを知っている</CheckItem>
                            </li>
                        </ul>

                        <div className="sub-title">2.3 ネットワーク</div>
                        <ul className="checklist">
                            <li>
                                <CheckItem>Shared VPC vs VPC Network Peering の使い分けを説明できる</CheckItem>
                            </li>
                            <li>
                                <CheckItem>VPC Peering が推移的でないことを知っている（A-B-C でも A-C は直接通信不可）</CheckItem>
                            </li>
                            <li>
                                <CheckItem>ネットワークタグ vs セキュアタグ（Cloud NGFW）の違いを説明できる</CheckItem>
                            </li>
                            <li>
                                <CheckItem>コンプライアンス要件（データ主権）がある場合は Regional LB を選ぶことを知っている</CheckItem>
                            </li>
                            <li>
                                <CheckItem>Passthrough Network LB が送信元 IP を保持できる唯一の LB であることを知っている</CheckItem>
                            </li>
                            <li>
                                <CheckItem>Premium Tier vs Standard Tier の違いと Global ALB が Premium Tier 必須であることを知っている</CheckItem>
                            </li>
                        </ul>

                        <div className="sub-title">2.4 IaC とツール</div>
                        <ul className="checklist">
                            <li>
                                <CheckItem>Terraform の State ファイルをリモートバックエンド（GCS）で管理する理由を説明できる</CheckItem>
                            </li>
                            <li>
                                <CheckItem>State ファイルを手動編集することの危険性を知っている</CheckItem>
                            </li>
                            <li>
                                <CheckItem>Fabric FAST が Google PSO 推奨のエンタープライズ Landing Zone ツールであることを知っている</CheckItem>
                            </li>
                            <li>
                                <CheckItem>Config Connector が Kubernetes CRD で GCP リソースを管理することを知っている</CheckItem>
                            </li>
                            <li>
                                <CheckItem>Gemini Cloud Assist の主要機能（RCA・IaC 生成・コスト最適化）を知っている</CheckItem>
                            </li>
                        </ul>
                    </TopicCard>

                    {/* REFS */}
                    <div id="refs" className="section-header">
                        <div className="section-icon-wrap section-icon-blue" aria-hidden="true">🔗</div>
                        <div className="section-meta">
                            <div className="section-number">参考リソース</div>
                            <h2 className="section-title-main">公式ドキュメント一覧</h2>
                        </div>
                    </div>

                    <div className="refs-grid">
                        <a href="https://cloud.google.com/learn/certification/cloud-engineer?hl=en" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>ACE 試験公式ページ</strong>認定資格の概要・登録
                            </div>
                        </a>
                        <a href="https://services.google.com/fh/files/misc/063026_associate_cloud_engineer_exam_guide_english.pdf" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>試験ガイド PDF（2026年6月版）</strong>出題範囲の詳細
                            </div>
                        </a>
                        <a href="https://docs.cloud.google.com/compute/docs/disks/hyperdisks" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>Google Cloud Hyperdisk</strong>新世代ブロックストレージ
                            </div>
                        </a>
                        <a href="https://docs.cloud.google.com/compute/docs/disks" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>ストレージ種別選択ガイド</strong>Hyperdisk vs PD vs Local SSD
                            </div>
                        </a>
                        <a href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/autopilot-security" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>GKE Autopilot セキュリティ</strong>セキュリティ標準の自動適用
                            </div>
                        </a>
                        <a href="https://docs.cloud.google.com/kubernetes-engine/docs/resources/autopilot-standard-feature-comparison" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>GKE Autopilot vs Standard</strong>機能比較
                            </div>
                        </a>
                        <a href="https://docs.cloud.google.com/run/docs/configuring/networking-best-practices" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>Cloud Run ネットワーキング</strong>Direct VPC Egress
                            </div>
                        </a>
                        <a href="https://docs.cloud.google.com/compute/vm-manager/docs/patch" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>VM Manager OS パッチ</strong>自動パッチ管理
                            </div>
                        </a>
                        <a href="https://docs.cloud.google.com/compute/docs/oslogin/set-up-oslogin" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>OS Login 設定</strong>IAM 統合 SSH アクセス
                            </div>
                        </a>
                        <a href="https://docs.cloud.google.com/compute/docs/instances/create-use-spot" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text"><strong>Spot VM</strong>作成と使用方法</div>
                        </a>
                        <a href="https://cloud.google.com/blog/products/compute/google-cloud-spot-vm-use-cases-and-best-practices" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>Spot VM ベストプラクティス</strong>フォールトトレラント設計
                            </div>
                        </a>
                        <a href="https://docs.cloud.google.com/compute/docs/instance-groups/creating-groups-of-managed-instances" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>MIG 作成ガイド</strong>オートスケール・ヒーリング
                            </div>
                        </a>
                        <a href="https://docs.cloud.google.com/compute/docs/gpus" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>GPU ドキュメント</strong>アクセラレータ選択基準
                            </div>
                        </a>
                        <a href="https://cloud.google.com/products/gemini-enterprise-agent-platform" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>Agent Runtime</strong>Gemini Enterprise Agent Platform
                            </div>
                        </a>
                        <a href="https://docs.cloud.google.com/firewall/docs/about-firewalls" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>Cloud NGFW 概要</strong>次世代ファイアウォール
                            </div>
                        </a>
                        <a href="https://docs.cloud.google.com/firewall/docs/tags-firewalls-overview" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>Secure Tags</strong>IAM 管理 ID ベースタグ
                            </div>
                        </a>
                        <a href="https://docs.cloud.google.com/firewall/docs/ngfw_tiers" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>Cloud NGFW Tiers</strong>Essentials/Standard/Enterprise
                            </div>
                        </a>
                        <a href="https://docs.cloud.google.com/vpc/docs/shared-vpc" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>Shared VPC</strong>組織内ネットワーク共有
                            </div>
                        </a>
                        <a href="https://docs.cloud.google.com/architecture/best-practices-vpc-design" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>VPC 設計ベストプラクティス</strong>ネットワーク設計指針
                            </div>
                        </a>
                        <a href="https://docs.cloud.google.com/load-balancing/docs/choosing-load-balancer" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>ロードバランサ選定ガイド</strong>L4/L7/Regional/Global
                            </div>
                        </a>
                        <a href="https://cloud.google.com/network-tiers/docs/overview" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>ネットワークサービスティア</strong>Premium vs Standard
                            </div>
                        </a>
                        <a href="https://docs.cloud.google.com/docs/terraform/best-practices/operations" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>Terraform ベストプラクティス</strong>State 管理・CI/CD 統合
                            </div>
                        </a>
                        <a href="https://github.com/GoogleCloudPlatform/cloud-foundation-fabric/tree/master/fast" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>Fabric FAST（GitHub）</strong>エンタープライズ Landing Zone
                            </div>
                        </a>
                        <a href="https://cloud.google.com/config-connector/docs/overview" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>Config Connector</strong>Kubernetes CRD で GCP 管理
                            </div>
                        </a>
                        <a href="https://docs.cloud.google.com/cloud-assist/overview" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>Gemini Cloud Assist</strong>AI 支援の運用管理
                            </div>
                        </a>
                        <a href="https://docs.cloud.google.com/storage/docs/best-practices" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>Cloud Storage ベストプラクティス</strong>セキュリティ・コスト最適化
                            </div>
                        </a>
                        <a href="https://cloud.google.com/products/managed-lustre" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>Google Cloud Managed Lustre</strong>並列ファイルシステム
                            </div>
                        </a>
                        <a href="https://cloud.google.com/netapp-volumes" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>Google Cloud NetApp Volumes</strong>エンタープライズファイルストレージ
                            </div>
                        </a>
                        <a href="https://cloud.google.com/managed-kafka/docs/overview" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>Managed Kafka</strong>フルマネージド Kafka サービス
                            </div>
                        </a>
                        <a href="https://cloud.google.com/blog/topics/developers-practitioners/your-google-cloud-database-options-explained" target="_blank" rel="noopener noreferrer" className="ref-item">
                            <div className="ref-dot" />
                            <div className="ref-text">
                                <strong>DB 選定ガイド（ブログ）</strong>Google Cloud データベース比較
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <button id="scroll-top" type="button" onClick={scrollToTop} className={scrolled ? 'visible' : ''} aria-label="トップスクロール">↑</button>
        </div>
    );
}
