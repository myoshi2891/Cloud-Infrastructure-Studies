'use client';

import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, REVISION_DATE } from './constants';
import styles from './page.module.css';

/**
 * Copies code text to the clipboard and shows the copy status.
 *
 * @param code - The text to copy
 */
function CopyButton({ code }: { code: string }) {
    const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const handleCopy = () => {
        navigator.clipboard.writeText(code)
            .then(() => {
                setCopyStatus('success');
                setTimeout(() => setCopyStatus('idle'), 2000);
            })
            .catch(() => {
                setCopyStatus('error');
                setTimeout(() => setCopyStatus('idle'), 2000);
            });
    };
    return (
        <button
            className={`copy-btn ${copyStatus}`}
            onClick={handleCopy}
            aria-label={copyStatus === 'success' ? 'コピー成功' : copyStatus === 'error' ? 'コピー失敗' : 'コードをコピー'}
        >
            {copyStatus === 'success' ? '✓ コピー済' : copyStatus === 'error' ? '✗ コピー失敗' : 'コピー'}
        </button>
    );
}

/**
 * Renders a labeled Mermaid diagram for the given diagram ID.
 *
 * @param id - The diagram ID to look up.
 * @param label - The label shown for the figure and used as the diagram's accessible name.
 * @returns The rendered diagram, or `null` when no diagram exists for `id`.
 */
function Diagram({ id, label }: { id: string; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="diagram">
            <div className="diagram-cap">Figure · {label}</div>
            <div className="mermaid">
                <MermaidDiagram chart={chart} ariaLabel={label} />
            </div>
        </div>
    );
}

/**
 * Renders the Cloud Load Balancing hands-on guide.
 *
 * Displays a multi-section tutorial covering external L4, external L7, and internal load balancers, along with a scroll progress bar, section-aware navigation, copy-to-clipboard snippets, and diagram blocks.
 */
export default function CloudLoadBalancingGuide() {
    const [activeId, setActiveId] = useState('overview');
    const [progressWidth, setProgressWidth] = useState(0);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const h = document.documentElement;
            const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
            setProgressWidth(Math.min(100, scrolled * 100));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        const sections = document.querySelectorAll('section[id]');
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

        sections.forEach((s) => observer.observe(s));

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    return (
        <div className={styles.container}>
            {/* スクロール進捗バー */}
            <div className="progress" style={{ width: `${progressWidth}%` }} />

            <div className="layout">
                {/* ── サイドナビ ── */}
                <NavBar
                    activeId={activeId}
                    isOpen={isMobileNavOpen}
                    setIsOpen={setIsMobileNavOpen}
                />

                {/* ── 本文 ── */}
                <main className="content">
                    {/* HERO */}
                    <header className="hero" id="top">
                        <div className="eyebrow">Google Cloud · Compute Engine</div>
                        <h1>1つの入口から、<br /><span className="accent">壊れないサービス</span>を組み立てる。</h1>
                        <p className="lede">
                            ロードバランサは「1つの IP に来たトラフィックを複数のサーバーへ振り分ける」仕組みです。
                            本ガイドは <strong>L4 パススルー</strong>・<strong>L7 アプリケーション</strong>・<strong>内部LB</strong>
                            の3方式を、<code>gcloud</code> コマンドでゼロから構築しながら、初学者向けにステップバイステップで解説します。
                        </p>
                        <div className="meta">
                            <span>対象: <b>Compute Engine 初学者</b></span>
                            <span>ゴール: <b>どのLBを・いつ・なぜ使うか</b></span>
                            <span>形式: <b>ハンズオン</b></span>
                            <span>リビジョン: <b>{REVISION_DATE}</b></span>
                        </div>

                        {/* シグネチャ・ビジュアライザ */}
                        <div className="visualizer" aria-hidden="true">
                            <svg className="vz-svg" viewBox="0 0 560 300" role="img">
                                {/* 配線 */}
                                <path className="vz-wire" d="M 150 150 L 470 70" />
                                <path className="vz-wire" d="M 150 150 L 470 150" />
                                <path className="vz-wire" d="M 150 150 L 470 230" />
                                {/* ヘルスチェック配線 */}
                                <path className="vz-hc-wire" d="M 90 250 C 250 250 360 90 470 70" />
                                <path className="vz-hc-wire" d="M 90 250 C 260 250 380 150 470 150" />
                                <path className="vz-hc-wire" d="M 90 250 C 270 255 380 230 470 230" />

                                {/* ingress ノード */}
                                <circle className="vz-ingress" cx="150" cy="150" r="34" />
                                <text className="vz-node-label" x="150" y="147" textAnchor="middle">転送ルール</text>
                                <text className="vz-node-label" x="150" y="162" textAnchor="middle" style={{ fill: '#00c8ff' }}>IP : 80</text>

                                {/* backend ノード */}
                                <circle className="vz-backend" cx="470" cy="70" r="24" />
                                <text className="vz-node-label" x="470" y="74" textAnchor="middle">VM 1</text>
                                <circle className="vz-pulse" cx="492" cy="52" r="3" />

                                <circle className="vz-backend" cx="470" cy="150" r="24" />
                                <text className="vz-node-label" x="470" y="154" textAnchor="middle">VM 2</text>
                                <circle className="vz-pulse b2" cx="492" cy="132" r="3" />

                                <circle className="vz-backend" cx="470" cy="230" r="24" />
                                <text className="vz-node-label" x="470" y="234" textAnchor="middle">VM 3</text>
                                <circle className="vz-pulse b3" cx="492" cy="212" r="3" />

                                {/* ヘルスチェックノード */}
                                <circle className="vz-hc" cx="90" cy="250" r="22" />
                                <text className="vz-node-label" x="90" y="254" textAnchor="middle" style={{ fill: 'var(--color-google-green)' }}>Health</text>

                                {/* パケット */}
                                <circle className="vz-packet f1" r="4" />
                                <circle className="vz-packet f2" r="4" />
                                <circle className="vz-packet f3" r="4" />
                            </svg>
                            <div className="vz-caption">1 入口 → N 分散 ＋ 死活監視（緑＝healthy）</div>
                        </div>
                    </header>

                    {/* 00 全体像 */}
                    <section id="overview">
                        <div className="sec-head">
                            <span className="sec-num">00</span>
                            <h2>このガイドの全体像</h2>
                        </div>
                        <p>
                            ロードバランサ（負荷分散装置）は、トラフィックを複数のサーバーに振り分けることで、
                            <strong>高可用性</strong>（1台落ちても止まらない）と <strong>スケーラビリティ</strong>（アクセス増にも耐える）を実現します。
                            本ガイドでは、難易度順に4つのシナリオを扱います。
                        </p>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">章</th>
                                        <th scope="col">構築するもの</th>
                                        <th scope="col">レイヤー</th>
                                        <th scope="col">公開範囲</th>
                                        <th scope="col">主な用途</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>第2章</td>
                                        <td>パススルー ネットワークLB</td>
                                        <td><span className="lvl l4">L4</span></td>
                                        <td>外部（インターネット向け）</td>
                                        <td>IP/ポート単位の高速振り分け</td>
                                    </tr>
                                    <tr>
                                        <td>第3章</td>
                                        <td>アプリケーション ロードバランサ</td>
                                        <td><span className="lvl l7">L7</span></td>
                                        <td>外部（グローバル）</td>
                                        <td>URL/ヘッダー単位のHTTP振り分け</td>
                                    </tr>
                                    <tr>
                                        <td>第4章</td>
                                        <td>内部パススルー ネットワークLB</td>
                                        <td><span className="lvl l4">L4</span></td>
                                        <td>内部（VPC内のみ）</td>
                                        <td>社内・サービス間通信</td>
                                    </tr>
                                    <tr>
                                        <td>第5章</td>
                                        <td>チャレンジ（総合演習）</td>
                                        <td><span className="lvl l4">L4</span> <span className="lvl l7">L7</span></td>
                                        <td>外部</td>
                                        <td>学んだ内容の実践</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* 01 事前準備 */}
                    <section id="prep">
                        <div className="sec-head">
                            <span className="sec-num">01</span>
                            <h2>事前準備（全シナリオ共通）</h2>
                        </div>

                        <h3>1.1 用語の整理</h3>
                        <p>
                            Google Cloud のロードバランサは <strong>2系統 × 2方式</strong> に分類されます。
                            最初にこの軸を押さえると全体が一気に見通せます。核心は
                            <strong>L4 は IP・ポートで扱い中身を見ない</strong>のに対し、
                            <strong>L7 は HTTP(S) を解釈し URL・ヘッダー・Cookie で判断できる</strong>という違いです。
                        </p>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">アプリケーションLB（L7）</th>
                                        <th scope="col">ネットワークLB（L4）</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>判断材料</td>
                                        <td>URL・ヘッダー・Cookie・コンテンツ</td>
                                        <td>IPアドレス・プロトコル・ポート</td>
                                    </tr>
                                    <tr>
                                        <td>中身を見るか</td>
                                        <td><strong>見る</strong>（HTTP/HTTPSを解釈）</td>
                                        <td><strong>見ない</strong>（パケットをそのまま転送）</td>
                                    </tr>
                                    <tr>
                                        <td>方式</td>
                                        <td>プロキシ型のみ</td>
                                        <td>プロキシ型 / パススルー型</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="callout tip">
                            <div className="c-title">💡 パススルー型 vs プロキシ型</div>
                            <p>
                                <strong>プロキシ型</strong>はクライアント接続を LB 側で一旦終端し、新しい接続をバックエンドへ張り直します。
                                一方<strong>パススルー型</strong>は接続を終端せず、送信元・宛先・ポートを変えずに VM へ届け、
                                応答は LB を経由せずクライアントへ直接戻ります（<strong>DSR = ダイレクトサーバーリターン</strong>）。
                                クライアントの送信元 IP を保持したい場合はパススルー型が向いています。
                            </p>
                            <a className="src" href="https://docs.cloud.google.com/load-balancing/docs/load-balancer-resource-model" target="_blank" rel="noopener">出典: ロードバランサのリソースモデル</a>
                        </div>

                        <h3>1.2 共通セットアップの流れ</h3>
                        <Diagram id="diag-setup" label="共通セットアップ手順" />

                        <h3>1.3 リージョンとゾーンの設定</h3>
                        <p>すべてのシナリオは、まずデフォルトの<strong>リージョン</strong>（地域）と<strong>ゾーン</strong>（地域内の区画）の設定から始めます。</p>
                        <div className="code-card">
                            <div className="code-bar">
                                <span className="code-lang">bash</span>
                                <CopyButton code={`gcloud config set compute/region REGION\ngcloud config set compute/zone ZONE`} />
                            </div>
                            <pre>
                                <div className="code-line"><span className="cmt"># デフォルトのリージョンを設定（例: us-central1）</span></div>
                                <div className="code-line">{"gcloud config set compute/region REGION"}</div>
                                <div className="code-line">{" "}</div>
                                <div className="code-line"><span className="cmt"># デフォルトのゾーンを設定（例: us-central1-a）</span></div>
                                <div className="code-line">{"gcloud config set compute/zone ZONE"}</div>
                            </pre>
                        </div>
                        <div className="callout warn">
                            <div className="c-title">⚠️ ベストプラクティス</div>
                            <p>
                                Cloud Shell では設定がセッションをまたいで保持されません。再接続のたびに
                                <code>gcloud config set</code> を実行する必要があります（自分のPCの <code>gcloud</code> では永続化されます）。
                            </p>
                        </div>
                    </section>

                    {/* 02 L4 外部パススルー */}
                    <section id="l4">
                        <div className="sec-head">
                            <span className="sec-num">02</span>
                            <h2>外部パススルー ネットワークLB <span className="lvl l4">L4</span></h2>
                        </div>

                        <h3>2.1 何を作るのか</h3>
                        <p>3台の Web サーバー（VM）の前段に L4 ロードバランサを置き、インターネットからのアクセスを3台に振り分けます。</p>
                        <Diagram id="diag-l4" label="L4 外部パススルー NLB の構成" />

                        <h3>2.2 コンポーネントの役割</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">コンポーネント</th>
                                        <th scope="col">役割</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>転送ルール（Forwarding Rule）</td>
                                        <td>LB の「フロントエンド」。受け付ける IP・プロトコル・ポートを定義</td>
                                    </tr>
                                    <tr>
                                        <td>ターゲットプール（Target Pool）</td>
                                        <td>トラフィックを受け取るバックエンド VM のグループ</td>
                                    </tr>
                                    <tr>
                                        <td>ヘルスチェック（Health Check）</td>
                                        <td>各 VM が正常かを定期監視し、健全な VM にのみ振り分ける</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="callout">
                            <div className="c-title">📌 重要な制約</div>
                            <p>
                                ターゲットプールベースの LB は<strong>レガシー HTTP ヘルスチェック</strong>しか使えません。
                                新しい TCP ヘルスチェックを使いたい場合は<strong>バックエンドサービスベース</strong>の LB が必要です。
                                本シナリオはラボ構成に合わせてターゲットプール方式で解説します。
                            </p>
                            <a className="src" href="https://docs.cloud.google.com/load-balancing/docs/passthrough-network-load-balancer" target="_blank" rel="noopener">出典: パススルー ネットワークLB 概要</a>
                        </div>

                        <h3>2.3 ステップバイステップ</h3>

                        <h4>ステップ1: 3台の Web サーバーを作成</h4>
                        <p>
                            各 VM に <code>network-lb-tag</code> タグを付けるのがポイントです。
                            <strong>タグを付けておくと、後でファイアウォールルールを「このタグが付いた VM 全部」に一括適用できます。</strong>
                        </p>
                        <div className="code-card">
                            <div className="code-bar">
                                <span className="code-lang">bash</span>
                                <CopyButton code={`gcloud compute instances create www1 \\\n  --zone=ZONE \\\n  --tags=network-lb-tag \\\n  --machine-type=e2-small \\\n  --image-family=debian-12 \\\n  --image-project=debian-cloud \\\n  --metadata=startup-script='#!/bin/bash\n    apt-get update\n    apt-get install apache2 -y\n    service apache2 restart\n    echo "<h3>Web Server: www1</h3>" | tee /var/www/html/index.html'`} />
                            </div>
                            <pre><code>
                                <div className="code-line"><span className="cmt"># www1 を作成（www2, www3 も名前だけ変えて同様に作成）</span></div>
                                <div className="code-line">{"gcloud compute instances create www1 \\"}</div>
                                <div className="code-line">{"  --zone=ZONE \\"}</div>
                                <div className="code-line">{"  --tags=network-lb-tag \\"}</div>
                                <div className="code-line">{"  --machine-type=e2-small \\"}</div>
                                <div className="code-line">{"  --image-family=debian-12 \\"}</div>
                                <div className="code-line">{"  --image-project=debian-cloud \\"}</div>
                                <div className="code-line">{"  --metadata=startup-script='#!/bin/bash"}</div>
                                <div className="code-line">{"    apt-get update"}</div>
                                <div className="code-line">{"    apt-get install apache2 -y"}</div>
                                <div className="code-line">{"    service apache2 restart"}</div>
                                <div className="code-line">{"    echo \"<h3>Web Server: www1</h3>\" | tee /var/www/html/index.html'"}</div>
                            </code></pre>
                        </div>
                        <div className="callout tip">
                            <div className="c-title">🔍 startup-script とは</div>
                            <p>
                                <code>startup-script</code> は <strong>VM 起動時に自動実行されるスクリプト</strong>です。
                                ここで Apache をインストールし、どのサーバーが応答したか分かるようホスト名入りページを置いています。
                            </p>
                        </div>

                        <h4>ステップ2: ファイアウォールルールで HTTP を許可</h4>
                        <div className="code-card">
                            <div className="code-bar">
                                <span className="code-lang">bash</span>
                                <CopyButton code={`gcloud compute firewall-rules create www-firewall-network-lb \\\n  --target-tags network-lb-tag --allow tcp:80`} />
                            </div>
                            <pre><code>
                                <div className="code-line">{"gcloud compute firewall-rules create www-firewall-network-lb \\"}</div>
                                <div className="code-line">{"  --target-tags network-lb-tag --allow tcp:80"}</div>
                            </code></pre>
                        </div>

                        <h4>ステップ3: 動作確認</h4>
                        <div className="code-card">
                            <div className="code-bar">
                                <span className="code-lang">bash</span>
                                <CopyButton code={`gcloud compute instances list\ncurl http://[IP_ADDRESS]`} />
                            </div>
                            <pre><code>
                                <div className="code-line"><span className="cmt"># 各VMの外部IPを確認</span></div>
                                <div className="code-line">{"gcloud compute instances list"}</div>
                                <div className="code-line">{" "}</div>
                                <div className="code-line"><span className="cmt"># curl で各VMに直接アクセスして応答を確認</span></div>
                                <div className="code-line">{"curl http://[IP_ADDRESS]"}</div>
                            </code></pre>
                        </div>

                        <h4>ステップ4: ロードバランシングサービスの構成</h4>
                        <div className="code-card">
                            <div className="code-bar">
                                <span className="code-lang">bash</span>
                                <CopyButton code={`gcloud compute addresses create network-lb-ip-1 --region REGION\ngcloud compute http-health-checks create basic-check\ngcloud compute target-pools create www-pool \\\n  --region REGION --http-health-check basic-check\ngcloud compute target-pools add-instances www-pool \\\n  --instances www1,www2,www3\ngcloud compute forwarding-rules create www-rule \\\n  --region REGION --ports 80 \\\n  --address network-lb-ip-1 --target-pool www-pool`} />
                            </div>
                            <pre><code>
                                <div className="code-line"><span className="cmt"># 1. 静的外部IPを予約</span></div>
                                <div className="code-line">{"gcloud compute addresses create network-lb-ip-1 --region REGION"}</div>
                                <div className="code-line">{" "}</div>
                                <div className="code-line"><span className="cmt"># 2. レガシーHTTPヘルスチェックを作成</span></div>
                                <div className="code-line">{"gcloud compute http-health-checks create basic-check"}</div>
                                <div className="code-line">{" "}</div>
                                <div className="code-line"><span className="cmt"># 3. ターゲットプールを作成（ヘルスチェックを紐付け）</span></div>
                                <div className="code-line">{"gcloud compute target-pools create www-pool \\"}</div>
                                <div className="code-line">{"  --region REGION --http-health-check basic-check"}</div>
                                <div className="code-line">{" "}</div>
                                <div className="code-line"><span className="cmt"># 4. 3台のVMをプールに追加</span></div>
                                <div className="code-line">{"gcloud compute target-pools add-instances www-pool \\"}</div>
                                <div className="code-line">{"  --instances www1,www2,www3"}</div>
                                <div className="code-line">{" "}</div>
                                <div className="code-line"><span className="cmt"># 5. 転送ルールを作成（80番ポート → プールへ）</span></div>
                                <div className="code-line">{"gcloud compute forwarding-rules create www-rule \\"}</div>
                                <div className="code-line">{"  --region REGION --ports 80 \\"}</div>
                                <div className="code-line">{"  --address network-lb-ip-1 --target-pool www-pool"}</div>
                            </code></pre>
                        </div>

                        <h4>ステップ5: トラフィックを流して確認</h4>
                        <div className="code-card">
                            <div className="code-bar">
                                <span className="code-lang">bash</span>
                                <CopyButton code={`IPADDRESS=$(gcloud compute forwarding-rules describe www-rule \\\n  --region REGION --format="json" | jq -r .IPAddress)\nwhile true; do curl -m1 $IPADDRESS; done`} />
                            </div>
                            <pre><code>
                                <div className="code-line"><span className="cmt"># 転送ルールの外部IPを変数に取得</span></div>
                                <div className="code-line">{"IPADDRESS=$(gcloud compute forwarding-rules describe www-rule \\"}</div>
                                <div className="code-line">{"  --region REGION --format=\"json\" | jq -r .IPAddress)"}</div>
                                <div className="code-line">{" "}</div>
                                <div className="code-line"><span className="cmt"># 繰り返しアクセスして3台に振り分けられる様子を観察（Ctrl+Cで停止）</span></div>
                                <div className="code-line">{"while true; do curl -m1 $IPADDRESS; done"}</div>
                            </code></pre>
                        </div>
                        <p>
                            応答が www1/www2/www3 の間でランダムに切り替われば成功です。最初は失敗することがありますが、
                            <strong>約30秒待って VM が healthy になるのを待つ</strong>のがコツです。
                        </p>
                    </section>

                    {/* 03 L7 */}
                    <section id="l7">
                        <div className="sec-head">
                            <span className="sec-num">03</span>
                            <h2>外部アプリケーション ロードバランサ <span className="lvl l7">L7</span></h2>
                        </div>

                        <h3>3.1 何を作るのか</h3>
                        <p>
                            第2章との最大の違いは、<strong>マネージドインスタンスグループ（MIG）</strong> と
                            <strong>グローバル配信</strong> を使う点です。
                        </p>
                        <Diagram id="diag-l7" label="L7 外部アプリケーション LB の構成" />

                        <h3>3.2 なぜグローバルなのか</h3>
                        <div className="callout tip">
                            <div className="c-title">🌐 Google Front End (GFE)</div>
                            <p>
                                アプリケーションロードバランシングは <strong>Google Front End（GFE）</strong>上に実装され、
                                GFE は世界中に分散して Google のグローバルネットワークと制御プレーンで連携します。
                                リクエストは原則として<strong>ユーザーに最も近いインスタンスグループ</strong>へルーティングされ、
                                空きが足りなければ次に近い空きのあるグループへ送られます。
                            </p>
                            <a className="src" href="https://cloud.google.com/load-balancing" target="_blank" rel="noopener">出典: Cloud Load Balancing 製品ページ</a>
                        </div>

                        <h3>3.3 コンポーネントの役割</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">コンポーネント</th>
                                        <th scope="col">役割</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>インスタンステンプレート</td>
                                        <td>VM の「設計図」（マシンタイプ・イメージ・起動スクリプト）</td>
                                    </tr>
                                    <tr>
                                        <td>マネージドインスタンスグループ（MIG）</td>
                                        <td>テンプレートから同一 VM を複製。オートスケール・自動修復が可能</td>
                                    </tr>
                                    <tr>
                                        <td>バックエンドサービス</td>
                                        <td>トラフィックの分配方法を定義（ヘルスチェック含む）</td>
                                    </tr>
                                    <tr>
                                        <td>URLマップ</td>
                                        <td>URL に応じてどのバックエンドへ送るかのルーティング表</td>
                                    </tr>
                                    <tr>
                                        <td>ターゲットHTTPプロキシ</td>
                                        <td>URL マップに従ってリクエストを処理</td>
                                    </tr>
                                    <tr>
                                        <td>グローバル転送ルール</td>
                                        <td>グローバル外部 IP でリクエストを受け付ける入り口</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="callout tip">
                            <div className="c-title">💡 MIG の価値</div>
                            <p>
                                マネージドインスタンスグループは、<strong>オートスケーリング・自動修復（autohealing）・複数ゾーン展開・自動アップデート</strong>
                                といった機能で、ワークロードをスケーラブルかつ高可用にします。
                            </p>
                        </div>

                        <h3>3.4 ステップバイステップ</h3>
                        <div className="code-card">
                            <div className="code-bar">
                                <span className="code-lang">bash</span>
                                <CopyButton code={`gcloud compute instance-templates create lb-backend-template \\\n  --region=REGION --network=default --subnet=default \\\n  --tags=allow-health-check --machine-type=e2-medium \\\n  --image-family=debian-12 --image-project=debian-cloud \\\n  --metadata=startup-script='#!/bin/bash\n    apt-get update\n    apt-get install apache2 -y\n    a2ensite default-ssl\n    a2enmod ssl\n    vm_hostname="$(curl -H "Metadata-Flavor:Google" \\\n    http://169.254.169.254/computeMetadata/v1/instance/name)"\n    echo "Page served from: $vm_hostname" | tee /var/www/html/index.html\n    systemctl restart apache2'\n\ngcloud compute instance-groups managed create lb-backend-group \\\n  --template=lb-backend-template --size=2 --zone=ZONE\n\ngcloud compute instance-groups managed set-named-ports lb-backend-group \\\n  --named-ports=http:80 --zone=ZONE\n\ngcloud compute firewall-rules create fw-allow-health-check \\\n  --network=default --action=allow --direction=ingress \\\n  --source-ranges=130.211.0.0/22,35.191.0.0/16 \\\n  --target-tags=allow-health-check --rules=tcp:80\n\ngcloud compute addresses create lb-ipv4-1 --ip-version=IPV4 --global\n\ngcloud compute health-checks create http http-basic-check --port 80\n\ngcloud compute backend-services create web-backend-service \\\n  --protocol=HTTP --port-name=http \\\n  --health-checks=http-basic-check --global\n\ngcloud compute backend-services add-backend web-backend-service \\\n  --instance-group=lb-backend-group \\\n  --instance-group-zone=ZONE --global\n\ngcloud compute url-maps create web-map-http \\\n  --default-service web-backend-service\n\ngcloud compute target-http-proxies create http-lb-proxy \\\n  --url-map web-map-http\n\ngcloud compute forwarding-rules create http-content-rule \\\n  --address=lb-ipv4-1 --global \\\n  --target-http-proxy=http-lb-proxy --ports=80`} />
                            </div>
                            <pre><code>
                                <div className="code-line"><span className="cmt"># 1. インスタンステンプレート（VMの設計図）を作成</span></div>
                                <div className="code-line">{"gcloud compute instance-templates create lb-backend-template \\"}</div>
                                <div className="code-line">{"  --region=REGION --network=default --subnet=default \\"}</div>
                                <div className="code-line">{"  --tags=allow-health-check --machine-type=e2-medium \\"}</div>
                                <div className="code-line">{"  --image-family=debian-12 --image-project=debian-cloud \\"}</div>
                                <div className="code-line">{"  --metadata=startup-script='#!/bin/bash"}</div>
                                <div className="code-line">{"    apt-get update"}</div>
                                <div className="code-line">{"    apt-get install apache2 -y"}</div>
                                <div className="code-line">{"    a2ensite default-ssl"}</div>
                                <div className="code-line">{"    a2enmod ssl"}</div>
                                <div className="code-line">{"    vm_hostname=\"\$(curl -H \"Metadata-Flavor:Google\" \\"}</div>
                                <div className="code-line">{"    http://169.254.169.254/computeMetadata/v1/instance/name)\""}</div>
                                <div className="code-line">{"    echo \"Page served from: \$vm_hostname\" | tee /var/www/html/index.html"}</div>
                                <div className="code-line">{"    systemctl restart apache2'"}</div>
                                <div className="code-line">{" "}</div>
                                <div className="code-line"><span className="cmt"># 2. テンプレートからMIGを作成（VM 2台）</span></div>
                                <div className="code-line">{"gcloud compute instance-groups managed create lb-backend-group \\"}</div>
                                <div className="code-line">{"  --template=lb-backend-template --size=2 --zone=ZONE"}</div>
                                <div className="code-line">{" "}</div>
                                <div className="code-line"><span className="cmt"># 3. MIG の named port を設定</span></div>
                                <div className="code-line">{"gcloud compute instance-groups managed set-named-ports lb-backend-group \\"}</div>
                                <div className="code-line">{"  --named-ports=http:80 --zone=ZONE"}</div>
                                <div className="code-line">{" "}</div>
                                <div className="code-line"><span className="cmt"># 4. ヘルスチェック用のファイアウォールルールを作成</span></div>
                                <div className="code-line">{"gcloud compute firewall-rules create fw-allow-health-check \\"}</div>
                                <div className="code-line">{"  --network=default --action=allow --direction=ingress \\"}</div>
                                <div className="code-line">{"  --source-ranges=130.211.0.0/22,35.191.0.0/16 \\"}</div>
                                <div className="code-line">{"  --target-tags=allow-health-check --rules=tcp:80"}</div>
                                <div className="code-line">{" "}</div>
                                <div className="code-line"><span className="cmt"># 5. グローバル静的外部IPを予約</span></div>
                                <div className="code-line">{"gcloud compute addresses create lb-ipv4-1 --ip-version=IPV4 --global"}</div>
                                <div className="code-line">{" "}</div>
                                <div className="code-line"><span className="cmt"># 6. ヘルスチェックを作成</span></div>
                                <div className="code-line">{"gcloud compute health-checks create http http-basic-check --port 80"}</div>
                                <div className="code-line">{" "}</div>
                                <div className="code-line"><span className="cmt"># 7. バックエンドサービスを作成</span></div>
                                <div className="code-line">{"gcloud compute backend-services create web-backend-service \\"}</div>
                                <div className="code-line">{"  --protocol=HTTP --port-name=http \\"}</div>
                                <div className="code-line">{"  --health-checks=http-basic-check --global"}</div>
                                <div className="code-line">{" "}</div>
                                <div className="code-line"><span className="cmt"># 8. MIGをバックエンドサービスに追加</span></div>
                                <div className="code-line">{"gcloud compute backend-services add-backend web-backend-service \\"}</div>
                                <div className="code-line">{"  --instance-group=lb-backend-group \\"}</div>
                                <div className="code-line">{"  --instance-group-zone=ZONE --global"}</div>
                                <div className="code-line">{" "}</div>
                                <div className="code-line"><span className="cmt"># 9. URLマップを作成</span></div>
                                <div className="code-line">{"gcloud compute url-maps create web-map-http \\"}</div>
                                <div className="code-line">{"  --default-service web-backend-service"}</div>
                                <div className="code-line">{" "}</div>
                                <div className="code-line"><span className="cmt"># 10. ターゲットHTTPプロキシを作成</span></div>
                                <div className="code-line">{"gcloud compute target-http-proxies create http-lb-proxy \\"}</div>
                                <div className="code-line">{"  --url-map web-map-http"}</div>
                                <div className="code-line">{" "}</div>
                                <div className="code-line"><span className="cmt"># 11. グローバル転送ルールを作成</span></div>
                                <div className="code-line">{"gcloud compute forwarding-rules create http-content-rule \\"}</div>
                                <div className="code-line">{"  --address=lb-ipv4-1 --global \\"}</div>
                                <div className="code-line">{"  --target-http-proxy=http-lb-proxy --ports=80"}</div>
                            </code></pre>
                        </div>
                        <div className="callout danger">
                            <div className="c-title">⚠️ 重要な IP レンジ</div>
                            <p>
                                <code>130.211.0.0/22</code> と <code>35.191.0.0/16</code> は
                                <strong>Google のヘルスチェックシステムの送信元 IP</strong> です。
                                このレンジからのトラフィックを許可しないと、ヘルスチェックが失敗して VM が「不健全」と判定され、トラフィックが流れません。
                            </p>
                            <a className="src" href="https://cloud.google.com/load-balancing/docs/network/setting-up-network-backend-service" target="_blank" rel="noopener">出典: 外部パススルーNLB のセットアップ</a>
                        </div>

                        <h3>3.5 動作確認</h3>
                        <p>
                            コンソールの「ロードバランシング」から <code>web-map-http</code> を開き、バックエンドの VM が
                            <strong>Healthy</strong> になっているのを確認してから、ブラウザで <code>http://[IP_ADDRESS]/</code> にアクセスします。
                        </p>
                        <div className="callout">
                            <div className="c-title">📌 反映待ち</div>
                            <p>反映には <strong>3〜5分</strong>かかることがあります。<code>Page served from: lb-backend-group-xxxx</code> のように VM 名が表示されれば成功です。</p>
                        </div>
                    </section>

                    {/* 04 内部 */}
                    <section id="internal">
                        <div className="sec-head">
                            <span className="sec-num">04</span>
                            <h2>内部パススルー ネットワークLB <span className="lvl int">内部 L4</span></h2>
                        </div>

                        <h3>4.1 何を作るのか</h3>
                        <p>これまでと違い、<strong>インターネットに公開しない</strong>内部専用の LB です。よくある2層アーキテクチャを構築します。</p>
                        <ul>
                            <li><strong>Web ティア（公開）</strong>: ユーザー向け Web サーバー</li>
                            <li><strong>内部サービスティア（非公開）</strong>: 素数計算サービス（複数台に分散）</li>
                        </ul>
                        <Diagram id="diag-internal" label="内部パススルー NLB を含む2層構成" />
                        <div className="callout">
                            <div className="c-title">📝 用語の注意</div>
                            <p>
                                ラボ本文では「内部アプリケーションロードバランサ」と表現されますが、実際の <code>gcloud</code> は
                                <code>--load-balancing-scheme internal</code> と <code>--protocol tcp</code>、L4 バックエンドサービスを使っており、
                                技術的には<strong>内部パススルー ネットワークLB（L4）</strong>を構築しています。
                                内部パススルー NLB は、同一リージョン内の内部 VM にトラフィックを分散し、
                                同じ VPC ネットワーク内（または接続されたネットワーク）からのみアクセス可能な内部 IP の背後でサービスを運用・スケールします。
                            </p>
                            <a className="src" href="https://docs.cloud.google.com/load-balancing/docs/internal" target="_blank" rel="noopener">出典: 内部パススルー ネットワークLB 概要</a>
                        </div>

                        <h3>4.2 内部LBの3つの構成要素</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">コンポーネント</th>
                                        <th scope="col">役割</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>転送ルール</td>
                                        <td>他の内部サービスがリクエストを送る<strong>プライベート IP アドレス</strong></td>
                                    </tr>
                                    <tr>
                                        <td>バックエンドサービス</td>
                                        <td>VM への分配方法を定義（ヘルスチェックを含む）</td>
                                    </tr>
                                    <tr>
                                        <td>ヘルスチェック</td>
                                        <td>バックエンド VM の健全性を継続的に監視</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>4.3 ステップバイステップ（要点）</h3>
                        <div className="code-card">
                            <div className="code-bar">
                                <span className="code-lang">bash</span>
                                <CopyButton code={`gcloud compute instance-templates create primecalc \\\n  --metadata-from-file startup-script=backend.sh \\\n  --no-address --tags backend --machine-type=e2-medium\n\ngcloud compute firewall-rules create http --network default \\\n  --allow=tcp:80 --source-ranges IP --target-tags backend\n\ngcloud compute instance-groups managed create backend \\\n  --size 3 --template primecalc --zone ZONE\n\ngcloud compute health-checks create http ilb-health --request-path /2\n\ngcloud compute backend-services create prime-service \\\n  --load-balancing-scheme internal --region=REGION \\\n  --protocol tcp --health-checks ilb-health\n\ngcloud compute backend-services add-backend prime-service \\\n  --instance-group backend --instance-group-zone=ZONE --region=REGION\n\ngcloud compute forwarding-rules create prime-lb \\\n  --load-balancing-scheme internal --ports 80 --network default \\\n  --region=REGION --address IP --backend-service prime-service`} />
                            </div>
                            <pre><code>
                                <div className="code-line"><span className="cmt"># ── バックエンド（素数計算サービス）の準備 ──</span></div>
                                <div className="code-line">{" "}</div>
                                <div className="code-line"><span className="cmt"># 1. 内部VM用テンプレート（--no-address で公開IPなし＝セキュア）</span></div>
                                <div className="code-line">{"gcloud compute instance-templates create primecalc \\"}</div>
                                <div className="code-line">{"  --metadata-from-file startup-script=backend.sh \\"}</div>
                                <div className="code-line">{"  --no-address --tags backend --machine-type=e2-medium"}</div>
                                <div className="code-line">{" "}</div>
                                <div className="code-line"><span className="cmt"># 2. ポート80を内部向けに開放</span></div>
                                <div className="code-line">{"gcloud compute firewall-rules create http --network default \\"}</div>
                                <div className="code-line">{"  --allow=tcp:80 --source-ranges IP --target-tags backend"}</div>
                                <div className="code-line">{" "}</div>
                                <div className="code-line"><span className="cmt"># 3. MIG（3台）を作成</span></div>
                                <div className="code-line">{"gcloud compute instance-groups managed create backend \\"}</div>
                                <div className="code-line">{"  --size 3 --template primecalc --zone ZONE"}</div>
                                <div className="code-line">{" "}</div>
                                <div className="code-line"><span className="cmt"># ── 内部ロードバランサの構築 ──</span></div>
                                <div className="code-line">{" "}</div>
                                <div className="code-line"><span className="cmt"># 4. ヘルスチェック（/2 にアクセスして200 OKかを確認）</span></div>
                                <div className="code-line">{"gcloud compute health-checks create http ilb-health --request-path /2"}</div>
                                <div className="code-line">{" "}</div>
                                <div className="code-line"><span className="cmt"># 5. 内部バックエンドサービス（scheme=internal, protocol=tcp）</span></div>
                                <div className="code-line">{"gcloud compute backend-services create prime-service \\"}</div>
                                <div className="code-line">{"  --load-balancing-scheme internal --region=REGION \\"}</div>
                                <div className="code-line">{"  --protocol tcp --health-checks ilb-health"}</div>
                                <div className="code-line">{" "}</div>
                                <div className="code-line"><span className="cmt"># 6. MIGをバックエンドサービスに追加</span></div>
                                <div className="code-line">{"gcloud compute backend-services add-backend prime-service \\"}</div>
                                <div className="code-line">{"  --instance-group backend --instance-group-zone=ZONE --region=REGION"}</div>
                                <div className="code-line">{" "}</div>
                                <div className="code-line"><span className="cmt"># 7. 内部転送ルール（静的内部IP）を作成</span></div>
                                <div className="code-line">{"gcloud compute forwarding-rules create prime-lb \\"}</div>
                                <div className="code-line">{"  --load-balancing-scheme internal --ports 80 --network default \\"}</div>
                                <div className="code-line">{"  --region=REGION --address IP --backend-service prime-service"}</div>
                            </code></pre>
                        </div>
                        <div className="callout sec">
                            <div className="c-title">🔒 セキュリティのベストプラクティス</div>
                            <p>
                                バックエンド VM には <code>--no-address</code>（公開 IP なし）を付けています。
                                <strong>内部サービスは外部から直接到達できないようにし、公開フロントエンド経由でのみアクセスさせる</strong>のが鉄則です。
                            </p>
                        </div>

                        <h3>4.4 テスト方法</h3>
                        <p>
                            内部 LB は <strong>VPC 内からしかアクセスできない</strong>ため、Cloud Shell（VPC外）からは直接叩けません。
                            同じネットワークにテスト用 VM を作って SSH し、内部 IP に <code>curl</code> します。
                        </p>
                        <div className="code-card">
                            <div className="code-bar">
                                <span className="code-lang">bash</span>
                                <CopyButton code={`gcloud compute instances create testinstance \\\n  --machine-type=e2-standard-2 --zone ZONE\ngcloud compute ssh testinstance --zone ZONE\ncurl IP/2\ncurl IP/4\ncurl IP/5`} />
                            </div>
                            <pre><code>
                                <div className="code-line"><span className="cmt"># テスト用VMを作成してSSH</span></div>
                                <div className="code-line">{"gcloud compute instances create testinstance \\"}</div>
                                <div className="code-line">{"  --machine-type=e2-standard-2 --zone ZONE"}</div>
                                <div className="code-line">{"gcloud compute ssh testinstance --zone ZONE"}</div>
                                <div className="code-line">{" "}</div>
                                <div className="code-line"><span className="cmt"># VM内部から内部LBへ（2と5はTrue=素数、4はFalse）</span></div>
                                <div className="code-line">{"curl IP/2   # True"}</div>
                                <div className="code-line">{"curl IP/4   # False"}</div>
                                <div className="code-line">{"curl IP/5   # True"}</div>
                            </code></pre>
                        </div>
                        <div className="callout sec">
                            <div className="c-title">✅ 確認ポイント</div>
                            <p>
                                2 と 5 が素数（True）、4 が非素数（False）と正しく返れば、内部 LB がバックエンドに正常に振り分けられている証拠です。
                                確認後は <code>testinstance</code> を削除しておきましょう。
                            </p>
                        </div>
                    </section>

                    {/* 05 チャレンジ */}
                    <section id="challenge">
                        <div className="sec-head">
                            <span className="sec-num">05</span>
                            <h2>総合演習 — チャレンジラボの攻略方針</h2>
                        </div>
                        <p>チャレンジラボは手順書がなく、<strong>学んだスキルを応用して自力で解く</strong>形式です。第2〜4章の知識を組み合わせます。</p>

                        <h3>5.1 タスク分解と対応表</h3>
                        <Diagram id="diag-challenge" label="チャレンジのタスク連鎖" />
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">タスク</th>
                                        <th scope="col">参照する章</th>
                                        <th scope="col">必須リソース名</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1. Webサーバー作成</td>
                                        <td>第2章</td>
                                        <td><code>web1</code> <code>web2</code> <code>web3</code> / タグ <code>network-lb-tag</code> / FW <code>www-firewall-network-lb</code></td>
                                    </tr>
                                    <tr>
                                        <td>2. L4 ロードバランシング</td>
                                        <td>第2章</td>
                                        <td>静的IP <code>network-lb-ip-1</code> / プール <code>www-pool</code> / ポート80</td>
                                    </tr>
                                    <tr>
                                        <td>3. L7 HTTP ロードバランサ</td>
                                        <td>第3章</td>
                                        <td><code>lb-backend-template</code> / <code>lb-backend-group</code> / <code>lb-ipv4-1</code> / <code>http-basic-check</code> / <code>web-map-http</code> / <code>http-lb-proxy</code></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>5.2 チャレンジ攻略のコツ</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">つまずきポイント</th>
                                        <th scope="col">対処</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>リソース名が指定と違う</td>
                                        <td>採点はリソース名を厳密にチェック。<strong>指定どおりに命名</strong></td>
                                    </tr>
                                    <tr>
                                        <td>イメージファミリーの指定</td>
                                        <td>このラボは <code>debian-12</code> / <code>debian-cloud</code> を使用</td>
                                    </tr>
                                    <tr>
                                        <td>ヘルスチェックが通らない</td>
                                        <td><code>130.211.0.0/22</code> と <code>35.191.0.0/16</code> を FW で許可したか確認</td>
                                    </tr>
                                    <tr>
                                        <td>すぐ反映されない</td>
                                        <td>L7 は 3〜5分、VM の healthy 化に 30秒程度待つ</td>
                                    </tr>
                                    <tr>
                                        <td>エラーが出る</td>
                                        <td><strong>エラーメッセージを読んで調べる</strong>のも採点対象のスキル</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* 06 選定 */}
                    <section id="choose">
                        <div className="sec-head">
                            <span className="sec-num">06</span>
                            <h2>ロードバランサ選定の早見チャート</h2>
                        </div>
                        <Diagram id="diag-choose" label="LB 選定の判断ツリー" />
                        <div className="callout tip">
                            <div className="c-title">💡 公式の選定指針</div>
                            <p>
                                HTTP(S) トラフィックのアプリには <strong>L7 のアプリケーションLB</strong>を、
                                TLS オフロード（プロキシ型）や TCP/UDP/ESP/GRE/ICMP などの IP プロトコルが必要な場合は
                                <strong>L4 のネットワークLB</strong>を選びます。
                                クライアントの送信元 IP を保持したい・プロキシのオーバーヘッドを避けたい・UDP/ESP/ICMP などに対応したい場合は
                                <strong>パススルー型</strong>を選びます。
                            </p>
                            <a className="src" href="https://docs.cloud.google.com/load-balancing/docs/choosing-load-balancer" target="_blank" rel="noopener">出典: ロードバランサの選び方</a>
                        </div>
                    </section>

                    {/* 07 ベストプラクティス */}
                    <section id="best">
                        <div className="sec-head">
                            <span className="sec-num">07</span>
                            <h2>ベストプラクティス総まとめ</h2>
                        </div>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">観点</th>
                                        <th scope="col">ベストプラクティス</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ヘルスチェック</td>
                                        <td>必ず設定し、<code>130.211.0.0/22</code>・<code>35.191.0.0/16</code> を FW で許可する</td>
                                    </tr>
                                    <tr>
                                        <td>タグ設計</td>
                                        <td>VM にタグを付け、FW ルールをタグ単位で一括管理する</td>
                                    </tr>
                                    <tr>
                                        <td>最小公開</td>
                                        <td>内部サービスは <code>--no-address</code> で公開 IP を持たせない</td>
                                    </tr>
                                    <tr>
                                        <td>命名規則</td>
                                        <td>リソース名は一貫したルールで（チャレンジでは指定厳守）</td>
                                    </tr>
                                    <tr>
                                        <td>静的IP</td>
                                        <td>外部公開用は静的 IP を予約し、変動を防ぐ</td>
                                    </tr>
                                    <tr>
                                        <td>スケール</td>
                                        <td>本番は MIG ＋ オートスケーリングで弾力性を確保</td>
                                    </tr>
                                    <tr>
                                        <td>リージョン整合</td>
                                        <td>L4 はリージョナル。全コンポーネントを同一リージョンに揃える</td>
                                    </tr>
                                    <tr>
                                        <td>反映待ち</td>
                                        <td>構築直後は数分待ってからテストする</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* 08 参考ソース */}
                    <section id="sources">
                        <div className="sec-head">
                            <span className="sec-num">08</span>
                            <h2>参考ソース（公式ドキュメント）</h2>
                        </div>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">トピック</th>
                                        <th scope="col">URL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Cloud Load Balancing 概要</td>
                                        <td><a href="https://docs.cloud.google.com/load-balancing/docs/load-balancing-overview" target="_blank" rel="noopener">load-balancing-overview</a></td>
                                    </tr>
                                    <tr>
                                        <td>ロードバランサの選び方</td>
                                        <td><a href="https://docs.cloud.google.com/load-balancing/docs/choosing-load-balancer" target="_blank" rel="noopener">choosing-load-balancer</a></td>
                                    </tr>
                                    <tr>
                                        <td>ロードバランサのリソースモデル</td>
                                        <td><a href="https://docs.cloud.google.com/load-balancing/docs/load-balancer-resource-model" target="_blank" rel="noopener">load-balancer-resource-model</a></td>
                                    </tr>
                                    <tr>
                                        <td>パススルー ネットワークLB 概要</td>
                                        <td><a href="https://docs.cloud.google.com/load-balancing/docs/passthrough-network-load-balancer" target="_blank" rel="noopener">passthrough-network-load-balancer</a></td>
                                    </tr>
                                    <tr>
                                        <td>内部パススルー ネットワークLB 概要</td>
                                        <td><a href="https://docs.cloud.google.com/load-balancing/docs/internal" target="_blank" rel="noopener">internal</a></td>
                                    </tr>
                                    <tr>
                                        <td>外部パススルーNLB のセットアップ</td>
                                        <td><a href="https://cloud.google.com/load-balancing/docs/network/setting-up-network-backend-service" target="_blank" rel="noopener">setting-up-network-backend-service</a></td>
                                    </tr>
                                    <tr>
                                        <td>Cloud Load Balancing 製品ページ</td>
                                        <td><a href="https://cloud.google.com/load-balancing" target="_blank" rel="noopener">cloud.google.com/load-balancing</a></td>
                                    </tr>
                                    <tr>
                                        <td>リリースノート</td>
                                        <td><a href="https://docs.cloud.google.com/load-balancing/docs/release-notes" target="_blank" rel="noopener">release-notes</a></td>
                                    </tr>
                                    <tr>
                                        <td>元コース（Google Skills Boost）</td>
                                        <td><a href="https://www.skills.google/paths/11/course_templates/648" target="_blank" rel="noopener">paths/11/course_templates/648</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="callout">
                            <div className="c-title">ℹ️ 命名の変遷について</div>
                            <p>
                                旧称「ネットワークロードバランサ」は現在「<strong>パススルー ネットワークロードバランサ</strong>」、
                                旧称「HTTP(S)ロードバランサ」は「<strong>アプリケーションロードバランサ</strong>」に整理されています。
                                ラボ教材によっては旧称が残っている場合があるため、公式ドキュメントの最新表記を基準にすると混乱しません。
                            </p>
                        </div>

                        <footer>
                            Cloud Load Balancing for Compute Engine · ハンズオン学習ガイド ／
                            本資料は学習目的でまとめたものです。コマンド仕様・IP レンジは必ず上記公式ドキュメントの最新版で確認してください。
                        </footer>
                    </section>
                </main>
            </div>
        </div>
    );
}
