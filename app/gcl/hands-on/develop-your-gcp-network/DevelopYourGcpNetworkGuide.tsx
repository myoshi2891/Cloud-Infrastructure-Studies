'use client';

/**
 * Develop Your Google Cloud Network ページ主要コンテンツコンポーネント。
 * 'use client' ディレクティブを含み、インタラクティブ要素を実装。
 */

import React, { useState, useRef } from 'react';
import NavBar from './NavBar';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, type DiagramId } from './constants';

/**
 * Renders a code block with a language label and copy action.
 *
 * @param lang - Language label shown in the code block header
 * @param html - Code content rendered as individual lines
 */
function HtmlCodeBlock({ lang, html }: { lang: string; html: string }) {
    const preRef = useRef<HTMLPreElement>(null);
    const [copied, setCopied] = useState(false);

    const onCopy = () => {
        const text = preRef.current?.textContent ?? '';
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(() => {
                // 権限拒否や非セキュアコンテキストで writeText が reject した場合は
                // コピー成功状態にせず、未処理の Promise rejection を防ぐ。
                setCopied(false);
            });
    };

    const lines = html.split('\n');

    return (
        <div className="code">
            <div className="code-head">
                <span className="tl">
                    <b style={{ background: '#f0738a' }}></b>
                    <b style={{ background: '#f5b544' }}></b>
                    <b style={{ background: '#58d39a' }}></b>
                </span>
                <span className="lang">{lang}</span>
                <button
                    type="button"
                    onClick={onCopy}
                    style={{
                        marginLeft: '12px',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-theme-ace-accent)',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono, monospace)',
                    }}
                >
                    {copied ? '[COPIED!]' : '[COPY]'}
                </button>
            </div>
            <pre ref={preRef}>
                {lines.map((line, idx) => (
                    <div
                        key={idx}
                        className="code-line"
                        dangerouslySetInnerHTML={{ __html: line || ' ' }}
                    />
                ))}
            </pre>
        </div>
    );
}

/**
 * Renders a Mermaid diagram with a caption.
 *
 * @param id - The diagram identifier to display.
 * @param label - The caption and accessible label for the diagram.
 * @returns The diagram markup, or `null` if no diagram is registered for `id`.
 */
function Diagram({ id, label }: { id: DiagramId; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="diagram">
            <div className="cap">{label}</div>
            <div className="mermaid-wrap">
                <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale={true} />
            </div>
        </div>
    );
}

/**
 * Renders the Google Cloud network learning guide page.
 */
export default function DevelopYourGcpNetworkGuide() {
    // 最終確認チェックリスト用 state
    const [checklist, setChecklist] = useState<boolean[]>([
        false, // BigQuery
        false, // Storage
        false, // Cloud SQL
        false, // managementnet
        false, // Firewall
        false, // ping external
        false, // ping internal
        false, // Ops Agent
        false, // Uptime check
        false, // Rollout
    ]);

    const toggleCheck = (idx: number) => {
        setChecklist((prev) => prev.map((val, i) => (i === idx ? !val : val)));
    };

    return (
        <div className="gcp-network-page">
            {/* ============ TOP BAR ============ */}
            <div className="topbar" style={{
                position: 'sticky',
                top: 'calc(var(--header-h, 60px) + var(--disclaimer-height, 0px))',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '12px clamp(16px, 4vw, 40px)',
                background: 'rgba(10, 15, 28, 0.82)',
                backdropFilter: 'blur(14px)',
                borderBottom: '1px solid var(--color-border)',
            }}>
                <span className="dot" style={{
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    background: 'var(--color-google-green)',
                    boxShadow: '0 0 0 4px rgba(88, 211, 154, 0.15)',
                }} aria-hidden="true"></span>
                <span className="brand" style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '13px',
                    letterSpacing: '0.02em',
                    color: 'var(--color-muted-foreground)',
                }}>
                    <b>gcp-network</b>:~/learn$ <span style={{ color: 'var(--color-theme-ace-accent)' }}>traceroute</span> infra
                </span>
                <span className="spacer" style={{ flex: 1 }}></span>
                <span className="status" style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '11.5px',
                    color: 'var(--color-guide-meta)',
                }}>
                    6 hops · 初学者向け · 最終更新 2026-06
                </span>
            </div>

            {/* ============ HERO ============ */}
            <header className="hero">
                <div className="shell hero-inner">
                    <span className="eyebrow">Google Cloud · Hands-on Learning Path</span>
                    <h1 className="title">クラウドの足回りを、<br /><span className="accent">一筆書き</span>で理解する。</h1>
                    <p className="lede">
                        BigQuery のクエリから Cloud SQL への移行、VPC 設計、監視、Kubernetes のデプロイ戦略まで。
                        Google Cloud の network とインフラを <b style={{ color: 'var(--color-foreground)' }}>6 つの hop</b> に分け、
                        初学者が手を動かしながら最短ルートで通過できるように再構成した実践ガイドです。
                    </p>

                    <div className="hero-meta">
                        <span className="chip"><i style={{ background: 'var(--color-theme-ace-accent)' }}></i>SQL / BigQuery</span>
                        <span className="chip"><i style={{ background: 'var(--color-google-blue)' }}></i>Cloud SQL</span>
                        <span className="chip"><i style={{ background: 'var(--color-google-green)' }}></i>VPC ネットワーク</span>
                        <span className="chip"><i style={{ background: 'var(--color-google-yellow)' }}></i>Cloud Monitoring</span>
                        <span className="chip"><i style={{ background: 'var(--color-tip)' }}></i>GKE / Kubernetes</span>
                    </div>

                    <div className="stat-strip">
                        <div className="stat"><div className="n"><span>06</span></div><div className="l">学習 hop（パート）</div></div>
                        <div className="stat"><div className="n">4<span>つ</span></div><div className="l">デプロイ戦略を比較</div></div>
                        <div className="stat"><div className="n">8<span>NIC</span></div><div className="l">マルチ NIC VM の上限</div></div>
                        <div className="stat"><div className="n">0<span>円</span></div><div className="l">SELECT * を避けて節約</div></div>
                    </div>
                </div>
            </header>

            {/* ============ BODY ============ */}
            <div className="shell with-rail">
                {/* side rail navigation */}
                <NavBar />

                <main>
                    {/* ===================== PART 1 ===================== */}
                    <section className="part" id="part1">
                        <div className="part-head">
                            <span className="part-addr">10.0.1.0<span className="slash">/24</span> · BIGQUERY</span>
                        </div>
                        <h2 className="part-title">Part 1 — SQL の基礎と BigQuery</h2>
                        <p className="part-sub">データに「質問」を投げる言語＝SQL を理解し、Google のサーバーレス分析基盤 BigQuery で実際にクエリを走らせるところから始めます。</p>
                        <hr className="rule" />

                        <h3><span className="num">1-1</span> SQL とはなにか</h3>
                        <p><b>SQL（Structured Query Language）</b>は、構造化されたデータに「質問」を投げかけるための標準言語です。スプレッドシートに似た<b>テーブル（表）</b>形式のデータを操作します。</p>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">用語</th>
                                        <th scope="col">意味</th>
                                        <th scope="col">例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><b>データベース</b></td>
                                        <td>1 つ以上のテーブルの集合体</td>
                                        <td><code>london_bicycles</code></td>
                                    </tr>
                                    <tr>
                                        <td><b>テーブル</b></td>
                                        <td>行と列で構成されたデータ本体</td>
                                        <td><code>cycle_hire</code></td>
                                    </tr>
                                    <tr>
                                        <td><b>カラム（列）</b></td>
                                        <td>データの属性・種類</td>
                                        <td><code>start_station_name</code></td>
                                    </tr>
                                    <tr>
                                        <td><b>レコード（行）</b></td>
                                        <td>1 件分のデータ</td>
                                        <td>ある 1 回のサイクリング記録</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>                        <div className="callout note">
                            <span className="tag">BigQuery のデータ階層</span>
                            <p><span className="term">プロジェクト</span> ▶ <span className="term">データセット</span> ▶ <span className="term">テーブル</span> の 3 階層で構成されます。テーブルを指す時は <code>project.dataset.table</code> の形式で書きます。</p>
                        </div>

                        <h3><span className="num">1-2</span> 基本キーワード早見表</h3>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">キーワード</th>
                                        <th scope="col">役割</th>
                                        <th scope="col">読み方のコツ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>SELECT</code></td>
                                        <td>取得する列を指定する</td>
                                        <td>「〜を選ぶ」</td>
                                    </tr>
                                    <tr>
                                        <td><code>FROM</code></td>
                                        <td>参照するテーブルを指定する</td>
                                        <td>「〜から」</td>
                                    </tr>
                                    <tr>
                                        <td><code>WHERE</code></td>
                                        <td>絞り込み条件を指定する</td>
                                        <td>「〜の場合のみ」</td>
                                    </tr>
                                    <tr>
                                        <td><code>GROUP BY</code></td>
                                        <td>同じ値を持つ行をまとめる</td>
                                        <td>「〜でグループ分け」</td>
                                    </tr>
                                    <tr>
                                        <td><code>COUNT()</code></td>
                                        <td>行数を数える</td>
                                        <td>「〜を数える」</td>
                                    </tr>
                                    <tr>
                                        <td><code>AS</code></td>
                                        <td>列やテーブルに別名をつける</td>
                                        <td>「〜として」</td>
                                    </tr>
                                    <tr>
                                        <td><code>ORDER BY</code></td>
                                        <td>結果を並び替える</td>
                                        <td>「〜の順に並べる」</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3><span className="num">1-3</span> クエリの組み立てフロー</h3>
                        <Diagram id="diag-query-builder" label="flow · query-builder" />

                        <h3><span className="num">1-4</span> SELECT・FROM・WHERE の使い方</h3>
                        <HtmlCodeBlock
                            lang="sql"
                            html={`<span class="c">-- 単一列の取得</span>
<span class="k">SELECT</span> end_station_name
<span class="k">FROM</span> <span class="s">\`bigquery-public-data.london_bicycles.cycle_hire\`</span>;

<span class="c">-- 複数列の取得（カンマ区切り）</span>
<span class="k">SELECT</span> start_station_name, duration
<span class="k">FROM</span> <span class="s">\`bigquery-public-data.london_bicycles.cycle_hire\`</span>;

<span class="c">-- 全列の取得（* はすべての列）</span>
<span class="k">SELECT</span> *
<span class="k">FROM</span> <span class="s">\`bigquery-public-data.london_bicycles.cycle_hire\`</span>
<span class="k">WHERE</span> duration &gt;= <span class="o">1200</span>;  <span class="c">-- 1200秒 = 20分以上</span>`}
                        />
                        <div className="callout best">
                            <span className="tag">★ Best Practice — コスト</span>
                            <p>本番環境では <code>SELECT *</code> を避け、必要な列だけを指定しましょう。BigQuery は<b>スキャンした列単位で課金</b>されるため、不要な列の取得はそのままコスト増につながります。</p>
                        </div>

                        <h3><span className="num">1-5</span> GROUP BY・COUNT・AS・ORDER BY</h3>
                        <HtmlCodeBlock
                            lang="sql"
                            html={`<span class="c">-- 各出発地点からの出発回数を多い順に表示</span>
<span class="k">SELECT</span>
    start_station_name,
    <span class="f">COUNT</span>(*) <span class="k">AS</span> num_starts        <span class="c">-- AS で列名に別名をつける</span>
<span class="k">FROM</span> <span class="s">\`bigquery-public-data.london_bicycles.cycle_hire\`</span>
<span class="k">GROUP BY</span> start_station_name       <span class="c">-- 出発地点でグループ化</span>
<span class="k">ORDER BY</span> num_starts <span class="k">DESC</span>;         <span class="c">-- 多い順（DESC = 降順）</span>`}
                        />
                        <h4>集計関数一覧</h4>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">関数</th>
                                        <th scope="col">意味</th>
                                        <th scope="col">例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>COUNT(*)</code></td>
                                        <td>全行数を数える</td>
                                        <td>乗車回数</td>
                                    </tr>
                                    <tr>
                                        <td><code>COUNT(col)</code></td>
                                        <td>NULL 以外の行数を数える</td>
                                        <td>値が入っている行</td>
                                    </tr>
                                    <tr>
                                        <td><code>SUM(col)</code></td>
                                        <td>合計値</td>
                                        <td>走行距離の合計</td>
                                    </tr>
                                    <tr>
                                        <td><code>AVG(col)</code></td>
                                        <td>平均値</td>
                                        <td>平均走行時間</td>
                                    </tr>
                                    <tr>
                                        <td><code>MAX(col)</code></td>
                                        <td>最大値</td>
                                        <td>最長走行時間</td>
                                    </tr>
                                    <tr>
                                        <td><code>MIN(col)</code></td>
                                        <td>最小値</td>
                                        <td>最短走行時間</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3><span className="num">1-6</span> BigQuery ハンズオン手順</h3>
                        <Diagram id="diag-console-handson" label="flow · console-handson" />
                        <h4>BigQuery を使う際の注意点（コスト管理）</h4>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">注意項目</th>
                                        <th scope="col">理由</th>
                                        <th scope="col">対策</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>SELECT *</code> の多用</td>
                                        <td>全列スキャンで課金が増大</td>
                                        <td>必要な列だけを指定</td>
                                    </tr>
                                    <tr>
                                        <td>大テーブルの WHERE なし実行</td>
                                        <td>全行スキャンが発生</td>
                                        <td>必ずフィルタを使う</td>
                                    </tr>
                                    <tr>
                                        <td>重複クエリの実行</td>
                                        <td>無駄なコストが発生</td>
                                        <td>BigQuery のキャッシュを活用</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* ===================== PART 2 ===================== */}
                    <section className="part" id="part2">
                        <div className="part-head"><span className="part-addr">10.0.2.0<span className="slash">/24</span> · CLOUD SQL</span></div>
                        <h2 className="part-title">Part 2 — Cloud SQL へのデータ移行</h2>
                        <p className="part-sub">分析向けの BigQuery（OLAP）と、リアルタイムの読み書きが得意な Cloud SQL（OLTP）。両者の違いを理解し、CSV を介してデータを移行します。</p>
                        <hr className="rule" />

                        <h3><span className="num">2-1</span> BigQuery vs Cloud SQL 比較</h3>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">比較項目</th>
                                        <th scope="col">BigQuery</th>
                                        <th scope="col">Cloud SQL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><b>用途</b></td>
                                        <td>分析・集計（OLAP）</td>
                                        <td>トランザクション処理（OLTP）</td>
                                    </tr>
                                    <tr>
                                        <td><b>スケール</b></td>
                                        <td>ペタバイト級</td>
                                        <td>テラバイト級</td>
                                    </tr>
                                    <tr>
                                        <td><b>料金体系</b></td>
                                        <td>クエリ量・ストレージ従量</td>
                                        <td>インスタンス時間従量</td>
                                    </tr>
                                    <tr>
                                        <td><b>接続方法</b></td>
                                        <td>コンソール・API</td>
                                        <td>MySQL/PostgreSQL クライアント</td>
                                    </tr>
                                    <tr>
                                        <td><b>得意なこと</b></td>
                                        <td>大量データの高速集計</td>
                                        <td>リアルタイムの読み書き</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3><span className="num">2-2</span> BigQuery → Cloud SQL 移行フロー</h3>
                        <Diagram id="diag-data-migration" label="flow · data-migration" />

                        <h3><span className="num">2-3</span> Cloud SQL インスタンス作成設定値</h3>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">設定項目</th>
                                        <th scope="col">推奨値（学習用）</th>
                                        <th scope="col">備考</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Edition</td>
                                        <td>Enterprise</td>
                                        <td>本番は Enterprise Plus も選択可</td>
                                    </tr>
                                    <tr>
                                        <td>Edition Preset</td>
                                        <td>Development</td>
                                        <td>本番は Production を選択</td>
                                    </tr>
                                    <tr>
                                        <td>Database Version</td>
                                        <td>MySQL 8.0</td>
                                        <td>特段の理由がなければ最新安定版</td>
                                    </tr>
                                    <tr>
                                        <td>Machine Type</td>
                                        <td>4 vCPU / 16 GB RAM</td>
                                        <td>ラボ環境では Development preset</td>
                                    </tr>
                                    <tr>
                                        <td>Availability</td>
                                        <td>Multiple zones</td>
                                        <td>本番環境では必須</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3><span className="num">2-4</span> Cloud Shell で Cloud SQL を操作する</h3>
                        <HtmlCodeBlock
                            lang="bash · mysql"
                            html={`<span class="c"># Cloud SQL インスタンスに接続</span>
<span class="o">gcloud</span> sql connect my-demo <span class="f">--user</span>=root <span class="f">--quiet</span>

<span class="c"># --- MySQL プロンプト内での操作 ---</span>

<span class="c"># データベース作成</span>
<span class="k">CREATE DATABASE</span> bike;

<span class="c"># データベースを選択してテーブルを作成</span>
<span class="k">USE</span> bike;
<span class="k">CREATE TABLE</span> london1 (
    start_station_name <span class="k">VARCHAR</span>(255),
    num <span class="k">INT</span>
);

<span class="k">CREATE TABLE</span> london2 (
    end_station_name <span class="k">VARCHAR</span>(255),
    num <span class="k">INT</span>
);

<span class="c"># データ確認</span>
<span class="k">SELECT</span> * <span class="k">FROM</span> london1 <span class="k">LIMIT</span> 10;

<span class="c"># 不要行の削除（ヘッダー行など num=0 の行を削除）</span>
<span class="k">DELETE FROM</span> london1 <span class="k">WHERE</span> num = <span class="o">0</span>;

<span class="c"># データの挿入</span>
<span class="k">INSERT INTO</span> london1 (start_station_name, num)
<span class="k">VALUES</span> (<span class="s">"test destination"</span>, 1);

<span class="c"># UNION で2テーブルを結合して検索</span>
<span class="k">SELECT</span> start_station_name <span class="k">AS</span> top_stations, num
<span class="k">FROM</span> london1 <span class="k">WHERE</span> num &gt; <span class="o">100000</span>
<span class="k">UNION</span>
<span class="k">SELECT</span> end_station_name, num
<span class="k">FROM</span> london2 <span class="k">WHERE</span> num &gt; <span class="o">100000</span>
<span class="k">ORDER BY</span> top_stations <span class="k">DESC</span>;`}
                        />
                        <h4>SQL データ操作キーワード早見表</h4>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">キーワード</th>
                                        <th scope="col">操作</th>
                                        <th scope="col">例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>CREATE DATABASE</code></td>
                                        <td>データベース作成</td>
                                        <td><code>CREATE DATABASE bike;</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>CREATE TABLE</code></td>
                                        <td>テーブル作成</td>
                                        <td><code>CREATE TABLE t1 (col VARCHAR(255));</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>INSERT INTO</code></td>
                                        <td>行の挿入</td>
                                        <td><code>{"INSERT INTO t1 VALUES ('val');"}</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>DELETE FROM</code></td>
                                        <td>行の削除</td>
                                        <td><code>DELETE FROM t1 WHERE id=1;</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>UNION</code></td>
                                        <td>2 クエリの結果を結合</td>
                                        <td><code>SELECT ... UNION SELECT ...</code></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="callout warn">
                            <span className="tag">⚠ 取り返しのつかない操作</span>
                            <p><code>DELETE</code> は <code>WHERE</code> 条件なしで実行すると<b>全行削除</b>になります。必ず <code>WHERE</code> 句を付けるか、事前に <code>SELECT</code> で対象を確認してから実行しましょう。</p>
                        </div>
                    </section>

                    {/* ===================== PART 3 ===================== */}
                    <section className="part" id="part3">
                        <div className="part-head"><span className="part-addr">10.0.3.0<span className="slash">/24</span> · VPC</span></div>
                        <h2 className="part-title">Part 3 — VPC ネットワークの設計と構築</h2>
                        <p className="part-sub">VPC は Google Cloud 内の論理的に独立したグローバルネットワーク。サブネット・ファイアウォール・VM を gcloud で組み立て、ネットワーク分離の原則を体験します。</p>
                        <hr className="rule" />

                        <h3><span className="num">3-1</span> VPC の基本概念</h3>
                        <p><b>VPC（Virtual Private Cloud）</b>は Google Cloud 内の論理的な独立ネットワークです。複数のリージョンにまたがる<b>グローバルリソース</b>として扱われます。</p>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">コンポーネント</th>
                                        <th scope="col">役割</th>
                                        <th scope="col">例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><b>VPC ネットワーク</b></td>
                                        <td>仮想ネットワーク全体</td>
                                        <td><code>mynetwork</code></td>
                                    </tr>
                                    <tr>
                                        <td><b>サブネット</b></td>
                                        <td>リージョンごとの IP アドレス範囲</td>
                                        <td><code>10.128.0.0/20</code></td>
                                    </tr>
                                    <tr>
                                        <td><b>ファイアウォールルール</b></td>
                                        <td>通信の許可・拒否ルール</td>
                                        <td>SSH 許可</td>
                                    </tr>
                                    <tr>
                                        <td><b>VM インスタンス</b></td>
                                        <td>サブネット内に配置される仮想マシン</td>
                                        <td><code>mynet-vm-1</code></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3><span className="num">3-2</span> Auto モード vs Custom モード</h3>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">比較項目</th>
                                        <th scope="col">Auto モード</th>
                                        <th scope="col">Custom モード</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>サブネット作成</td>
                                        <td>全リージョンに自動作成</td>
                                        <td>手動で作成</td>
                                    </tr>
                                    <tr>
                                        <td>IP アドレス範囲</td>
                                        <td>Google が自動割り当て</td>
                                        <td>自分で指定</td>
                                    </tr>
                                    <tr>
                                        <td>柔軟性</td>
                                        <td>低い</td>
                                        <td>高い</td>
                                    </tr>
                                    <tr>
                                        <td>推奨用途</td>
                                        <td>学習・プロトタイプ</td>
                                        <td><b>本番環境</b></td>
                                    </tr>
                                    <tr>
                                        <td>例</td>
                                        <td><code>default</code>, <code>mynetwork</code></td>
                                        <td><code>managementnet</code>, <code>privatenet</code></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="callout best">
                            <span className="tag">★ Best Practice — セキュリティ</span>
                            <p>本番環境では必ず <b>Custom モード</b>を使用してください。Auto モードは IP アドレス空間を自分で管理できないため、VPC Peering 時などに CIDR の競合が発生します。</p>
                        </div>

                        <h3><span className="num">3-3</span> ネットワーク構成の全体像</h3>
                        <Diagram id="diag-multi-vpc" label="topology · multi-vpc" />

                        <h3><span className="num">3-4</span> gcloud でネットワークを構築する</h3>
                        <HtmlCodeBlock
                            lang="bash · gcloud"
                            html={`<span class="c"># 1. Custom VPC ネットワークの作成</span>
<span class="o">gcloud</span> compute networks create privatenet \\
    <span class="f">--subnet-mode</span>=custom

<span class="c"># 2. サブネットの作成</span>
<span class="o">gcloud</span> compute networks subnets create privatesubnet-1 \\
    <span class="f">--network</span>=privatenet \\
    <span class="f">--region</span>=us-central1 \\
    <span class="f">--range</span>=172.16.0.0/24

<span class="o">gcloud</span> compute networks subnets create privatesubnet-2 \\
    <span class="f">--network</span>=privatenet \\
    <span class="f">--region</span>=europe-west1 \\
    <span class="f">--range</span>=172.20.0.0/20

<span class="c"># 3. ファイアウォールルールの作成</span>
<span class="o">gcloud</span> compute firewall-rules create privatenet-allow-icmp-ssh-rdp \\
    <span class="f">--direction</span>=INGRESS \\
    <span class="f">--priority</span>=1000 \\
    <span class="f">--network</span>=privatenet \\
    <span class="f">--action</span>=ALLOW \\
    <span class="f">--rules</span>=icmp,tcp:22,tcp:3389 \\
    <span class="f">--source-ranges</span>=0.0.0.0/0

<span class="c"># 4. VM インスタンスの作成</span>
<span class="o">gcloud</span> compute instances create privatenet-vm-1 \\
    <span class="f">--zone</span>=us-central1-a \\
    <span class="f">--machine-type</span>=e2-micro \\
    <span class="f">--subnet</span>=privatesubnet-1

<span class="c"># 5. 現在の状態を確認</span>
<span class="o">gcloud</span> compute networks list
<span class="o">gcloud</span> compute networks subnets list <span class="f">--sort-by</span>=NETWORK
<span class="o">gcloud</span> compute firewall-rules list <span class="f">--sort-by</span>=NETWORK
<span class="o">gcloud</span> compute instances list <span class="f">--sort-by</span>=ZONE`}
                        />

                        <h3><span className="num">3-5</span> VPC 間の通信ルール</h3>
                        <Diagram id="diag-reachability" label="flow · reachability" />
                        <div className="callout note">
                            <span className="tag">重要な原則 — ネットワーク分離</span>
                            <p>VPC ネットワークはデフォルトで<b>完全に分離</b>されています。同じリージョン・同じゾーンにあっても、異なる VPC の VM は<b>内部 IP では通信できません</b>。内部通信を許可するには <b>VPC Peering</b> または <b>Cloud VPN</b> が必要です。</p>
                        </div>

                        <h3><span className="num">3-6</span> マルチ NIC VM（複数ネットワーク接続）</h3>
                        <p>1 台の VM を複数の VPC に同時接続できます（<b>最大 8 NIC</b>）。</p>
                        <Diagram id="diag-multi-nic" label="topology · multi-nic" />
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">注意事項</th>
                                        <th scope="col">詳細</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>サブネット IP 重複禁止</td>
                                        <td>各ネットワークの CIDR が重複してはいけない</td>
                                    </tr>
                                    <tr>
                                        <td>デフォルトルートは eth0</td>
                                        <td>eth0 以外のネットワーク宛てトラフィックは eth0 経由になる場合がある</td>
                                    </tr>
                                    <tr>
                                        <td>Machine Type の制限</td>
                                        <td>NIC 数は vCPU 数に依存（e2-standard-4 は最大 4 NIC）</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <HtmlCodeBlock
                            lang="bash · routing"
                            html={`<span class="c"># VM 内で実行 — ルーティングテーブルの確認</span>
<span class="o">ip</span> route
<span class="c"># 出力例:</span>
<span class="c"># default via 172.16.0.1 dev eth0</span>
<span class="c"># 10.128.0.0/20 via 10.128.0.1 dev eth2</span>
<span class="c"># 10.130.0.0/20 via 10.130.0.1 dev eth1</span>
<span class="c"># 172.16.0.0/24 via 172.16.0.1 dev eth0</span>`}
                        />
                    </section>

                    {/* ===================== PART 4 ===================== */}
                    <section className="part" id="part4">
                        <div className="part-head"><span className="part-addr">10.0.4.0<span className="slash">/24</span> · MONITORING</span></div>
                        <h2 className="part-title">Part 4 — Cloud Monitoring による監視体制</h2>
                        <p className="part-sub">VM に Ops Agent を入れ、メトリクス・ログ・アップタイムチェック・アラートを束ねる監視基盤を立ち上げます。「壊れる前に気づく」仕組みづくりです。</p>
                        <hr className="rule" />

                        <h3><span className="num">4-1</span> Cloud Monitoring の全体像</h3>
                        <Diagram id="diag-observability" label="topology · observability" />

                        <h3><span className="num">4-2</span> 監視エージェントのインストール</h3>
                        <HtmlCodeBlock
                            lang="bash · vm ssh"
                            html={`<span class="c"># Step 1: Ops Agent インストールスクリプトのダウンロード</span>
<span class="o">curl</span> <span class="f">-sSO</span> https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh

<span class="c"># Step 2: Ops Agent のインストール（Monitoring + Logging 両方）</span>
<span class="o">sudo</span> bash add-google-cloud-ops-agent-repo.sh <span class="f">--also-install</span>

<span class="c"># Step 3: 動作確認</span>
<span class="o">sudo</span> systemctl status <span class="s">"google-cloud-ops-agent*"</span>`}
                        />
                        <div className="callout best">
                            <span className="tag">★ Best Practice — 可観測性</span>
                            <p>すべての VM に Ops Agent をインストールしましょう。Agent なしでは CPU・メモリ等の詳細メトリクスが取得できず、障害時の調査が困難になります。</p>
                        </div>

                        <h3><span className="num">4-3</span> Apache2 Web サーバーのセットアップ</h3>
                        <HtmlCodeBlock
                            lang="bash"
                            html={`<span class="c"># パッケージリストの更新</span>
<span class="o">sudo</span> apt-get update

<span class="c"># Apache2 と PHP のインストール</span>
<span class="o">sudo</span> apt-get install apache2 php7.0 <span class="f">-y</span>

<span class="c"># Apache2 の再起動</span>
<span class="o">sudo</span> service apache2 restart`}
                        />

                        <h3><span className="num">4-4</span> アップタイムチェックの設定</h3>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">設定項目</th>
                                        <th scope="col">推奨値</th>
                                        <th scope="col">説明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Protocol</td>
                                        <td>HTTP</td>
                                        <td>Web サーバーの死活監視</td>
                                    </tr>
                                    <tr>
                                        <td>Resource Type</td>
                                        <td>URL</td>
                                        <td>外部 IP で監視</td>
                                    </tr>
                                    <tr>
                                        <td>Check Frequency</td>
                                        <td>1 分</td>
                                        <td>頻繁に確認する</td>
                                    </tr>
                                    <tr>
                                        <td>Title</td>
                                        <td>Lamp Uptime Check</td>
                                        <td>わかりやすい名前をつける</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3><span className="num">4-5</span> アラートポリシーの設定フロー</h3>
                        <Diagram id="diag-alerting-policy" label="flow · alerting-policy" />
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">ベストプラクティス</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>閾値</td>
                                        <td>誤検知が多い場合は高めに設定。初期は低めで様子を見る</td>
                                    </tr>
                                    <tr>
                                        <td>通知先</td>
                                        <td>個人メールより Slack / PagerDuty などのチームチャンネル推奨</td>
                                    </tr>
                                    <tr>
                                        <td>ドキュメント</td>
                                        <td>アラート発生時の対応手順（Runbook）を必ず記載する</td>
                                    </tr>
                                    <tr>
                                        <td>Retest Window</td>
                                        <td>瞬間的なスパイクでの誤検知を防ぐため 1〜5 分を推奨</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3><span className="num">4-6</span> Cloud Logging でログを確認する</h3>
                        <HtmlCodeBlock
                            lang="logs explorer filter"
                            html={`resource.type = <span class="s">"gce_instance"</span>
resource.labels.instance_id = <span class="s">"INSTANCE_ID"</span>  <span class="c"># gce_instance では数値のインスタンス ID（VM 名ではない）</span>`}
                        />
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ログ種別</th>
                                        <th scope="col">確認できること</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>syslog</code></td>
                                        <td>OS レベルのシステムイベント</td>
                                    </tr>
                                    <tr>
                                        <td><code>apache_access</code></td>
                                        <td>Web サーバーへのアクセス履歴</td>
                                    </tr>
                                    <tr>
                                        <td><code>apache_error</code></td>
                                        <td>Web サーバーのエラー</td>
                                    </tr>
                                    <tr>
                                        <td><code>stackdriver_agent</code></td>
                                        <td>Monitoring Agent 自体のログ</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* ===================== PART 5 ===================== */}
                    <section className="part" id="part5">
                        <div className="part-head"><span className="part-addr">10.0.5.0<span className="slash">/24</span> · GKE</span></div>
                        <h2 className="part-title">Part 5 — Kubernetes デプロイメント戦略</h2>
                        <p className="part-sub">Pod・ReplicaSet・Deployment・Service の関係を押さえ、Rolling / Canary / Blue-Green / Recreate の 4 戦略を「いつ・なぜ使うか」で選べるようになります。</p>
                        <hr className="rule" />

                        <h3><span className="num">5-1</span> Kubernetes の基本構成</h3>
                        <Diagram id="diag-gke-cluster" label="topology · gke-cluster" />

                        <h3><span className="num">5-2</span> Deployment の基本 YAML 構造</h3>
                        <HtmlCodeBlock
                            lang="yaml"
                            html={`<span class="k">apiVersion</span>: apps/v1
<span class="k">kind</span>: Deployment
<span class="k">metadata</span>:
  <span class="k">name</span>: fortune-app-blue         <span class="c"># Deployment の名前</span>
<span class="k">spec</span>:
  <span class="k">replicas</span>: <span class="o">3</span>                    <span class="c"># Pod の数</span>
  <span class="k">selector</span>:
    <span class="k">matchLabels</span>:
      <span class="k">app</span>: fortune-app           <span class="c"># 管理対象 Pod のラベル</span>
  <span class="k">template</span>:
    <span class="k">metadata</span>:
      <span class="k">labels</span>:
        <span class="k">app</span>: fortune-app
        <span class="k">version</span>: <span class="s">"1.0.0"</span>
    <span class="k">spec</span>:
      <span class="k">containers</span>:
        - <span class="k">name</span>: fortune-app
          <span class="k">image</span>: <span class="s">"us-central1-docker.pkg.dev/.../fortune-service:1.0.0"</span>
          <span class="k">ports</span>:
            - <span class="k">containerPort</span>: <span class="o">8080</span>`}
                        />

                        <h3><span className="num">5-3</span> 基本的な kubectl コマンド</h3>
                        <HtmlCodeBlock
                            lang="bash · kubectl"
                            html={`<span class="c"># Deployment の作成と確認</span>
<span class="o">kubectl</span> create <span class="f">-f</span> deployments/fortune-app-blue.yaml
<span class="o">kubectl</span> get deployments
<span class="o">kubectl</span> get replicasets
<span class="o">kubectl</span> get pods

<span class="c"># Service の作成</span>
<span class="o">kubectl</span> create <span class="f">-f</span> services/fortune-app.yaml
<span class="o">kubectl</span> get services fortune-app

<span class="c"># スケールアップ・スケールダウン</span>
<span class="o">kubectl</span> scale deployment fortune-app-blue <span class="f">--replicas</span>=5
<span class="o">kubectl</span> scale deployment fortune-app-blue <span class="f">--replicas</span>=3

<span class="c"># バージョン確認</span>
<span class="o">curl</span> http://$(<span class="o">kubectl</span> get svc fortune-app \\
  <span class="f">-o</span>=jsonpath=<span class="s">"{.status.loadBalancer.ingress[0].ip}"</span>)/version`}
                        />

                        <h3><span className="num">5-4</span> デプロイメント戦略の比較</h3>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">戦略</th>
                                        <th scope="col">概要</th>
                                        <th scope="col">ダウンタイム</th>
                                        <th scope="col">リスク</th>
                                        <th scope="col">適用場面</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><b>Rolling Update</b></td>
                                        <td>旧 Pod を少しずつ新 Pod に入れ替え</td>
                                        <td>なし</td>
                                        <td>中</td>
                                        <td>通常のアップデート</td>
                                    </tr>
                                    <tr>
                                        <td><b>Canary</b></td>
                                        <td>一部ユーザーにのみ新バージョンを提供</td>
                                        <td>なし</td>
                                        <td>低</td>
                                        <td>新機能の段階的リリース</td>
                                    </tr>
                                    <tr>
                                        <td><b>Blue-Green</b></td>
                                        <td>旧・新環境を並行稼働し一気に切り替え</td>
                                        <td>なし</td>
                                        <td>低（即時 Rollback 可）</td>
                                        <td>大規模変更・安全重視</td>
                                    </tr>
                                    <tr>
                                        <td><b>Recreate</b></td>
                                        <td>全 Pod を削除してから新 Pod を作成</td>
                                        <td>あり</td>
                                        <td>高</td>
                                        <td>ステートフルアプリ</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3><span className="num">5-5</span> Rolling Update</h3>
                        <Diagram id="diag-rolling-update" label="timeline · rolling-update" />
                        <HtmlCodeBlock
                            lang="bash · rollout"
                            html={`<span class="c"># イメージを v2.0.0 に更新（Deployment を直接編集）</span>
<span class="o">kubectl</span> edit deployment fortune-app-blue
<span class="c"># エディタ内で image タグを 1.0.0 → 2.0.0 に変更して保存</span>

<span class="o">kubectl</span> rollout status deployment/fortune-app-blue   <span class="c"># 状態確認</span>
<span class="o">kubectl</span> rollout pause deployment/fortune-app-blue    <span class="c"># 一時停止</span>
<span class="o">kubectl</span> rollout resume deployment/fortune-app-blue   <span class="c"># 再開</span>
<span class="o">kubectl</span> rollout history deployment/fortune-app-blue  <span class="c"># 履歴確認</span>
<span class="o">kubectl</span> rollout undo deployment/fortune-app-blue     <span class="c"># ロールバック</span>`}
                        />

                        <h3><span className="num">5-6</span> Canary デプロイメント</h3>
                        <Diagram id="diag-canary" label="topology · canary" />
                        <HtmlCodeBlock
                            lang="bash"
                            html={`<span class="c"># Canary Deployment の作成</span>
<span class="o">kubectl</span> create <span class="f">-f</span> deployments/fortune-app-canary.yaml

<span class="c"># 現在のバージョン分布を確認（10回リクエスト）</span>
<span class="k">for</span> i <span class="k">in</span> {1..10}; <span class="k">do</span>
  <span class="o">curl</span> <span class="f">-s</span> http://$(<span class="o">kubectl</span> get svc fortune-app \\
    <span class="f">-o</span>=jsonpath=<span class="s">"{.status.loadBalancer.ingress[0].ip}"</span>)/version
  <span class="o">echo</span>
<span class="k">done</span>`}
                        />
                        <div className="callout tip">
                            <span className="tag">ポイント — 比率でトラフィック分散</span>
                            <p>Canary は Pod 数の比率でトラフィックが分散されます。Production: 3 Pod, Canary: 1 Pod → Canary に約 25% のトラフィックが流れます。</p>
                        </div>

                        <h3><span className="num">5-7</span> Blue-Green デプロイメント</h3>
                        <Diagram id="diag-blue-green" label="topology · blue-green" />
                        <HtmlCodeBlock
                            lang="bash"
                            html={`<span class="c"># Step 1: Blue（v1.0.0）のみにトラフィックを向ける</span>
<span class="o">kubectl</span> apply <span class="f">-f</span> services/fortune-app-blue-service.yaml

<span class="c"># Step 2: Green（v2.0.0）Deployment を作成（まだトラフィックなし）</span>
<span class="o">kubectl</span> create <span class="f">-f</span> deployments/fortune-app-green.yaml

<span class="c"># Step 3: v1.0.0 で提供されていることを確認</span>
<span class="o">curl</span> http://$(<span class="o">kubectl</span> get svc fortune-app \\
  <span class="f">-o</span>=jsonpath=<span class="s">"{.status.loadBalancer.ingress[0].ip}"</span>)/version

<span class="c"># Step 4: Service を Green に切り替え（瞬時に全トラフィックが v2.0.0 へ）</span>
<span class="o">kubectl</span> apply <span class="f">-f</span> services/fortune-app-green-service.yaml

<span class="c"># ロールバック: Blue に戻す</span>
<span class="o">kubectl</span> apply <span class="f">-f</span> services/fortune-app-blue-service.yaml`}
                        />

                        <h3><span className="num">5-8</span> デプロイメント戦略の選び方</h3>
                        <Diagram id="diag-strategy-picker" label="decision · strategy-picker" />
                    </section>

                    {/* ===================== PART 6 ===================== */}
                    <section className="part" id="part6">
                        <div className="part-head"><span className="part-addr">10.0.6.0<span className="slash">/24</span> · CHALLENGE</span></div>
                        <h2 className="part-title">Part 6 — 総合チャレンジラボ攻略</h2>
                        <p className="part-sub">ここまでの hop を組み合わせる総合演習。2 つの VPC・踏み台ホスト・Cloud SQL・GKE 上の WordPress を、タスク順にひとつのシステムとして構築します。</p>
                        <hr className="rule" />

                        <h3><span className="num">6-1</span> チャレンジ全体のアーキテクチャ</h3>
                        <Diagram id="diag-griffin-wordpress" label="topology · griffin-wordpress" />

                        <h3><span className="num">6-2</span> タスク別実装手順</h3>

                        <h4>Task 1 &amp; 2 — VPC の作成</h4>
                        <HtmlCodeBlock
                            lang="bash · gcloud"
                            html={`<span class="c"># 開発 VPC の作成</span>
<span class="o">gcloud</span> compute networks create griffin-dev-vpc <span class="f">--subnet-mode</span>=custom
<span class="o">gcloud</span> compute networks subnets create griffin-dev-wp \\
    <span class="f">--network</span>=griffin-dev-vpc <span class="f">--region</span>=us-east1 <span class="f">--range</span>=192.168.16.0/20
<span class="o">gcloud</span> compute networks subnets create griffin-dev-mgmt \\
    <span class="f">--network</span>=griffin-dev-vpc <span class="f">--region</span>=us-east1 <span class="f">--range</span>=192.168.32.0/20

<span class="c"># 本番 VPC の作成</span>
<span class="o">gcloud</span> compute networks create griffin-prod-vpc <span class="f">--subnet-mode</span>=custom
<span class="o">gcloud</span> compute networks subnets create griffin-prod-wp \\
    <span class="f">--network</span>=griffin-prod-vpc <span class="f">--region</span>=us-east1 <span class="f">--range</span>=192.168.48.0/20
<span class="o">gcloud</span> compute networks subnets create griffin-prod-mgmt \\
    <span class="f">--network</span>=griffin-prod-vpc <span class="f">--region</span>=us-east1 <span class="f">--range</span>=192.168.64.0/20`}
                        />

                        <h4>Task 3 — Bastion Host（踏み台サーバー）</h4>
                        <HtmlCodeBlock
                            lang="bash · gcloud"
                            html={`<span class="c"># マルチ NIC Bastion Host を作成（dev / prod 両 VPC に接続）</span>
<span class="o">gcloud</span> compute instances create griffin-bastion \\
    <span class="f">--zone</span>=us-east1-b <span class="f">--machine-type</span>=e2-medium \\
    <span class="f">--tags</span>=iap-ssh \\
    <span class="f">--network-interface</span>=network=griffin-dev-vpc,subnet=griffin-dev-mgmt,no-address \\
    <span class="f">--network-interface</span>=network=griffin-prod-vpc,subnet=griffin-prod-mgmt,no-address

<span class="c"># 外部 IP は付与せず、IAP TCP forwarding の送信元だけに SSH を許可</span>
<span class="o">gcloud</span> compute firewall-rules create griffin-dev-allow-ssh \\
    <span class="f">--network</span>=griffin-dev-vpc <span class="f">--allow</span>=tcp:22 \\
    <span class="f">--source-ranges</span>=35.235.240.0/20 <span class="f">--target-tags</span>=iap-ssh
<span class="o">gcloud</span> compute firewall-rules create griffin-prod-allow-ssh \\
    <span class="f">--network</span>=griffin-prod-vpc <span class="f">--allow</span>=tcp:22 \\
    <span class="f">--source-ranges</span>=35.235.240.0/20 <span class="f">--target-tags</span>=iap-ssh

<span class="c"># インターネットから直接 SSH せず、IAP トンネルを使用</span>
<span class="o">gcloud</span> compute ssh griffin-bastion <span class="f">--zone</span>=us-east1-b <span class="f">--tunnel-through-iap</span>`}
                        />

                        <h4>Task 4 — Cloud SQL と WordPress DB</h4>
                        <HtmlCodeBlock
                            lang="bash · sql"
                            html={`<span class="c"># Cloud SQL MySQL インスタンスを作成</span>
<span class="o">gcloud</span> sql instances create griffin-dev-db \\
    <span class="f">--database-version</span>=MYSQL_8_0 <span class="f">--region</span>=us-east1 <span class="f">--tier</span>=db-n1-standard-1

<span class="c"># Cloud SQL に接続して WordPress 用 DB を準備</span>
<span class="o">gcloud</span> sql connect griffin-dev-db <span class="f">--user</span>=root`}
                        />
                        <HtmlCodeBlock
                            lang="sql"
                            html={`<span class="c">-- MySQL プロンプト内で実行（値は固定せず、接続元も許可ホストに限定）</span>
<span class="k">CREATE DATABASE</span> wordpress;
<span class="k">CREATE USER</span> <span class="s">"wp_user"</span>@<span class="s">"&lt;AUTHORIZED_DB_HOST&gt;"</span> <span class="k">IDENTIFIED BY</span> <span class="s">"&lt;SECRET_MANAGER_VALUE&gt;"</span>;
<span class="k">GRANT ALL PRIVILEGES ON</span> wordpress.* <span class="k">TO</span> <span class="s">"wp_user"</span>@<span class="s">"&lt;AUTHORIZED_DB_HOST&gt;"</span>;
<span class="k">FLUSH PRIVILEGES</span>;`}
                        />

                        <h4>Task 5 &amp; 6 — GKE クラスターの作成と設定</h4>
                        <HtmlCodeBlock
                            lang="bash · gke"
                            html={`<span class="c"># GKE クラスターの作成</span>
<span class="o">gcloud</span> container clusters create griffin-dev \\
    <span class="f">--zone</span>=us-east1-b <span class="f">--machine-type</span>=e2-standard-4 <span class="f">--num-nodes</span>=2 \\
    <span class="f">--network</span>=griffin-dev-vpc <span class="f">--subnetwork</span>=griffin-dev-wp \\
    <span class="f">--workload-pool</span>=$GOOGLE_CLOUD_PROJECT.svc.id.goog <span class="f">--enable-secret-manager</span>

<span class="c"># DB パスワードは Secret Manager に登録（実値は安全な入力元から渡す）</span>
<span class="o">gcloud</span> secrets create wordpress-db-password <span class="f">--replication-policy</span>=automatic
<span class="o">gcloud</span> secrets versions add wordpress-db-password <span class="f">--data-file</span>=&lt;PASSWORD_FILE&gt;

<span class="c"># WordPress 用マニフェストを取得</span>
<span class="o">gsutil</span> cp <span class="f">-r</span> gs://spls/gsp321/wp-k8s .
<span class="o">cd</span> wp-k8s

<span class="c"># Kubernetes SA と Google Cloud SA を Workload Identity で関連付け</span>
<span class="o">kubectl</span> create namespace wordpress
<span class="o">kubectl</span> create serviceaccount wordpress-ksa <span class="f">--namespace</span>=wordpress
<span class="o">gcloud</span> iam service-accounts add-iam-policy-binding \\
    cloud-sql-proxy@$GOOGLE_CLOUD_PROJECT.iam.gserviceaccount.com \\
    <span class="f">--role</span>=roles/iam.workloadIdentityUser \\
    <span class="f">--member</span>=<span class="s">"serviceAccount:$GOOGLE_CLOUD_PROJECT.svc.id.goog[wordpress/wordpress-ksa]"</span>
<span class="o">kubectl</span> annotate serviceaccount wordpress-ksa <span class="f">--namespace</span>=wordpress \\
    iam.gke.io/gcp-service-account=cloud-sql-proxy@$GOOGLE_CLOUD_PROJECT.iam.gserviceaccount.com

<span class="c"># Google Cloud SA には Cloud SQL 接続と対象シークレット参照だけを許可</span>
<span class="o">gcloud</span> projects add-iam-policy-binding $GOOGLE_CLOUD_PROJECT \\
    <span class="f">--member</span>=<span class="s">"serviceAccount:cloud-sql-proxy@$GOOGLE_CLOUD_PROJECT.iam.gserviceaccount.com"</span> \\
    <span class="f">--role</span>=roles/cloudsql.client
<span class="o">gcloud</span> secrets add-iam-policy-binding wordpress-db-password \\
    <span class="f">--member</span>=<span class="s">"serviceAccount:cloud-sql-proxy@$GOOGLE_CLOUD_PROJECT.iam.gserviceaccount.com"</span> \\
    <span class="f">--role</span>=roles/secretmanager.secretAccessor

<span class="c"># マニフェストでは serviceAccountName: wordpress-ksa を指定し、</span>
<span class="c"># Secret Manager add-on と Workload Identity で認証する（SA キーファイルは作成しない）</span>`}
                        />

                        <h4>Task 7 — WordPress Deployment の作成</h4>
                        <HtmlCodeBlock
                            lang="bash"
                            html={`<span class="c"># wp-deployment.yaml を編集</span>
<span class="c"># YOUR_SQL_INSTANCE → Instance Connection Name に置換</span>
<span class="c"># 形式: PROJECT_ID:REGION:INSTANCE_NAME</span>
<span class="o">kubectl</span> create <span class="f">-f</span> wp-deployment.yaml
<span class="o">kubectl</span> create <span class="f">-f</span> wp-service.yaml

<span class="c"># LoadBalancer の External IP が付与されるまで待機</span>
<span class="o">kubectl</span> get services <span class="f">--watch</span>`}
                        />

                        <h4>Task 9 — 追加エンジニアへのアクセス付与</h4>
                        <HtmlCodeBlock
                            lang="bash · iam"
                            html={`<span class="c"># Editor ロールをプロジェクトに付与</span>
<span class="o">gcloud</span> projects add-iam-policy-binding $GOOGLE_CLOUD_PROJECT \\
    <span class="f">--member</span>=<span class="s">"user:SECOND_USER_EMAIL"</span> \\
    <span class="f">--role</span>=<span class="s">"roles/editor"</span>`}
                        />
                    </section>

                    {/* ===================== BEST PRACTICES ===================== */}
                    <section className="part" id="best">
                        <div className="part-head"><span className="part-addr">★ · SUMMARY</span></div>
                        <h2 className="part-title">ベストプラクティス総まとめ</h2>
                        <p className="part-sub">4 つの観点でこのルート全体を振り返ります。コスト・セキュリティ・可用性・開発効率。</p>
                        <hr className="rule" />

                        <h3><span className="num">$</span> コスト管理</h3>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">カテゴリ</th>
                                        <th scope="col">ベストプラクティス</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>BigQuery</td>
                                        <td><code>SELECT *</code> を避け、必要な列のみ取得する</td>
                                    </tr>
                                    <tr>
                                        <td>BigQuery</td>
                                        <td>大規模クエリ実行前に「クエリバリデータ」でスキャン量を確認する</td>
                                    </tr>
                                    <tr>
                                        <td>Cloud SQL</td>
                                        <td>開発・テスト環境は Development Preset を使用する</td>
                                    </tr>
                                    <tr>
                                        <td>GKE</td>
                                        <td>不要なクラスターはこまめに削除する</td>
                                    </tr>
                                    <tr>
                                        <td>VM</td>
                                        <td>使用しない VM は停止（課金は継続）または削除する</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3><span className="num">$</span> セキュリティ</h3>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">カテゴリ</th>
                                        <th scope="col">ベストプラクティス</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>VPC</td>
                                        <td>本番環境は必ず Custom モードを使用する</td>
                                    </tr>
                                    <tr>
                                        <td>VPC</td>
                                        <td><code>0.0.0.0/0</code> からの SSH 許可は最小限に留め、IAP を活用する</td>
                                    </tr>
                                    <tr>
                                        <td>Cloud SQL</td>
                                        <td>パスワードは必ず <code>Secret Manager</code> で管理する</td>
                                    </tr>
                                    <tr>
                                        <td>IAM</td>
                                        <td>最小権限の原則（Principle of Least Privilege）を徹底する</td>
                                    </tr>
                                    <tr>
                                        <td>GKE</td>
                                        <td>サービスアカウントキーはファイルではなく Workload Identity を使用する</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3><span className="num">$</span> 可用性・信頼性</h3>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">カテゴリ</th>
                                        <th scope="col">ベストプラクティス</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Cloud SQL</td>
                                        <td>本番環境は <b>Multiple Zones（HA 構成）</b> を必ず選択する</td>
                                    </tr>
                                    <tr>
                                        <td>GKE</td>
                                        <td>Rolling Update で <code>maxUnavailable</code>・<code>maxSurge</code> を適切に設定する</td>
                                    </tr>
                                    <tr>
                                        <td>Monitoring</td>
                                        <td>すべての VM に Ops Agent をインストールする</td>
                                    </tr>
                                    <tr>
                                        <td>Monitoring</td>
                                        <td>アラートには Runbook（対応手順書）のリンクを必ず記載する</td>
                                    </tr>
                                    <tr>
                                        <td>デプロイ</td>
                                        <td>Blue-Green デプロイで即時 Rollback 体制を整える</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3><span className="num">$</span> 開発効率</h3>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">カテゴリ</th>
                                        <th scope="col">ベストプラクティス</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>gcloud</td>
                                        <td>よく使うオプションは <code>gcloud config set</code> でデフォルト化する</td>
                                    </tr>
                                    <tr>
                                        <td>kubectl</td>
                                        <td><code>kubectl explain</code> でリソースのフィールドを確認する</td>
                                    </tr>
                                    <tr>
                                        <td>SQL</td>
                                        <td><code>DELETE</code> 前は必ず <code>SELECT</code> で対象行を確認する</td>
                                    </tr>
                                    <tr>
                                        <td>Monitoring</td>
                                        <td>ダッシュボードは CPU・メモリ・ネットワーク・エラー率の 4 点セットで作成する</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3><span className="num">✓</span> 最終確認チェックリスト</h3>
                        <div className="checklist">
                            {[
                                'BigQuery でのクエリ実行が正常に動作する',
                                'Cloud Storage バケットに CSV がアップロードされている',
                                'Cloud SQL に london1・london2 テーブルが作成されている',
                                'managementnet・privatenet が Custom モードで作成されている',
                                'ファイアウォールルールで SSH・ICMP・RDP が許可されている',
                                '外部 IP では全 VM に ping が通る',
                                '異なる VPC 間では内部 IP での ping が失敗する',
                                'Ops Agent がすべての VM にインストールされている',
                                'アップタイムチェックが Active になっている',
                                'Rolling Update・Canary・Blue-Green の各デプロイが成功している',
                            ].map((text, idx) => (
                                <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <input
                                        type="checkbox"
                                        checked={checklist[idx]}
                                        onChange={() => toggleCheck(idx)}
                                        className="check-item"
                                    />
                                    <span>{text}</span>
                                </label>
                            ))}
                        </div>
                    </section>

                    {/* ===================== REFERENCES ===================== */}
                    <section className="part" id="refs">
                        <div className="part-head"><span className="part-addr">∞ · SOURCES</span></div>
                        <h2 className="part-title">参考リソース / 出典 URL</h2>
                        <p className="part-sub">本ガイドの記述はすべて Google Cloud / Kubernetes の公式ドキュメントに基づいています。一次情報として必ず併読してください。</p>
                        <hr className="rule" />

                        <div className="ref-group">
                            <p className="ref-h">BigQuery &amp; SQL</p>
                            <ul className="clean">
                                <li><a href="https://cloud.google.com/bigquery/docs" target="_blank" rel="noopener noreferrer">BigQuery 公式ドキュメント</a></li>
                                <li><a href="https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax" target="_blank" rel="noopener noreferrer">BigQuery SQL リファレンス（query-syntax）</a></li>
                                <li><a href="https://cloud.google.com/bigquery/docs/best-practices-costs" target="_blank" rel="noopener noreferrer">BigQuery コスト最適化</a></li>
                                <li><a href="https://cloud.google.com/bigquery/docs/best-practices-security" target="_blank" rel="noopener noreferrer">BigQuery セキュリティベストプラクティス</a></li>
                            </ul>
                        </div>

                        <div className="ref-group">
                            <p className="ref-h">Cloud SQL</p>
                            <ul className="clean">
                                <li><a href="https://cloud.google.com/sql/docs" target="_blank" rel="noopener noreferrer">Cloud SQL 公式ドキュメント</a></li>
                                <li><a href="https://cloud.google.com/sql/docs/mysql" target="_blank" rel="noopener noreferrer">Cloud SQL for MySQL</a></li>
                                <li><a href="https://cloud.google.com/sql/docs/mysql/high-availability" target="_blank" rel="noopener noreferrer">Cloud SQL HA 構成</a></li>
                                <li><a href="https://cloud.google.com/sql/docs/mysql/import-export" target="_blank" rel="noopener noreferrer">Cloud SQL インポート/エクスポート</a></li>
                            </ul>
                        </div>

                        <div className="ref-group">
                            <p className="ref-h">VPC ネットワーク</p>
                            <ul className="clean">
                                <li><a href="https://cloud.google.com/vpc/docs" target="_blank" rel="noopener noreferrer">VPC 公式ドキュメント</a></li>
                                <li><a href="https://cloud.google.com/vpc/docs/vpc" target="_blank" rel="noopener noreferrer">VPC ネットワーク設計</a></li>
                                <li><a href="https://cloud.google.com/vpc/docs/subnets" target="_blank" rel="noopener noreferrer">サブネット作成</a></li>
                                <li><a href="https://cloud.google.com/firewall/docs/firewalls" target="_blank" rel="noopener noreferrer">ファイアウォールルール</a></li>
                                <li><a href="https://cloud.google.com/vpc/docs/multiple-interfaces-concepts" target="_blank" rel="noopener noreferrer">複数 NIC の概要</a></li>
                                <li><a href="https://cloud.google.com/vpc/docs/vpc-peering" target="_blank" rel="noopener noreferrer">VPC Peering</a></li>
                            </ul>
                        </div>

                        <div className="ref-group">
                            <p className="ref-h">Cloud Monitoring</p>
                            <ul className="clean">
                                <li><a href="https://cloud.google.com/monitoring/docs" target="_blank" rel="noopener noreferrer">Cloud Monitoring 公式ドキュメント</a></li>
                                <li><a href="https://cloud.google.com/stackdriver/docs/solutions/agents/ops-agent" target="_blank" rel="noopener noreferrer">Ops Agent インストール</a></li>
                                <li><a href="https://cloud.google.com/monitoring/uptime-checks" target="_blank" rel="noopener noreferrer">アップタイムチェック</a></li>
                                <li><a href="https://cloud.google.com/monitoring/alerts" target="_blank" rel="noopener noreferrer">アラートポリシー</a></li>
                                <li><a href="https://cloud.google.com/logging/docs" target="_blank" rel="noopener noreferrer">Cloud Logging</a></li>
                                <li><a href="https://cloud.google.com/monitoring/dashboards" target="_blank" rel="noopener noreferrer">ダッシュボード作成</a></li>
                            </ul>
                        </div>

                        <div className="ref-group">
                            <p className="ref-h">Kubernetes / GKE</p>
                            <ul className="clean">
                                <li><a href="https://cloud.google.com/kubernetes-engine/docs" target="_blank" rel="noopener noreferrer">GKE 公式ドキュメント</a></li>
                                <li><a href="https://kubernetes.io/docs/concepts/workloads/controllers/deployment/" target="_blank" rel="noopener noreferrer">Deployment 概念</a></li>
                                <li><a href="https://kubernetes.io/docs/tutorials/kubernetes-basics/update/update-intro/" target="_blank" rel="noopener noreferrer">Rolling Update</a></li>
                                <li><a href="https://kubernetes.io/docs/concepts/cluster-administration/manage-deployment/#canary-deployments" target="_blank" rel="noopener noreferrer">Canary デプロイメント</a></li>
                                <li><a href="https://kubernetes.io/docs/reference/kubectl/cheatsheet/" target="_blank" rel="noopener noreferrer">kubectl コマンドリファレンス</a></li>
                                <li><a href="https://cloud.google.com/kubernetes-engine/docs/best-practices/controllers" target="_blank" rel="noopener noreferrer">GKE デプロイメントベストプラクティス</a></li>
                            </ul>
                        </div>

                        <div className="ref-group">
                            <p className="ref-h">チャレンジラボ全般</p>
                            <ul className="clean">
                                <li><a href="https://cloud.google.com/training/badges" target="_blank" rel="noopener noreferrer">Google Cloud スキルバッジ</a></li>
                                <li><a href="https://cloud.google.com/architecture" target="_blank" rel="noopener noreferrer">Google Cloud アーキテクチャセンター</a></li>
                                <li><a href="https://cloud.google.com/iam/docs/using-iam-securely" target="_blank" rel="noopener noreferrer">IAM ベストプラクティス</a></li>
                                <li><a href="https://cloud.google.com/sql/docs/mysql/connect-kubernetes-engine" target="_blank" rel="noopener noreferrer">Cloud SQL Proxy（Kubernetes 向け）</a></li>
                            </ul>
                        </div>
                    </section>
                </main>
            </div>

            <footer className="page-footer">
                <div className="shell">
                    <p className="mono">{"// gcp-network:~/learn$ traceroute complete — 6 hops reached."}</p>
                    <p>本ドキュメントは <b style={{ color: 'var(--color-muted-foreground)' }}>Develop-Your-Google-Cloud-Network.md</b> を初学者向けに再構成した学習用教材です。各種設定値・コマンドは学習環境を前提としています。本番環境では上記の各「★ Best Practice」および公式ドキュメントを必ずご確認ください。</p>
                </div>
            </footer>
        </div>
    );
}
