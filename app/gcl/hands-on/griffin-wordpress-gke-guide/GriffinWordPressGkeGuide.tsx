'use client';

import React, { memo, useState, useEffect, useRef, useCallback } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS } from './constants';

/**
 * Renders the diagram associated with an identifier and provides an accessibility label.
 *
 * @param id - The diagram identifier used to select the diagram definition
 * @param label - The accessible label for the rendered diagram
 * @returns The rendered diagram, or `null` when the identifier is unknown
 */
const Diagram = memo(function Diagram({ id, label }: { id: string; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale={true} />
        </div>
    );
});

/**
 * Renders the Team Griffin Google Cloud infrastructure challenge-lab guide, including navigation and task instructions for configuring VPCs, Cloud SQL, GKE, WordPress, monitoring, and IAM.
 */
export function GriffinWordPressGkeGuide() {
    const [activeSection, setActiveSection] = useState<string>('overview');
    const [isTocOpen, setIsTocOpen] = useState<boolean>(false);
    const tocToggleRef = useRef<HTMLButtonElement>(null);
    // 安定した closeToc から最新の開閉状態を読むためのミラー
    const isTocOpenRef = useRef(isTocOpen);

    useEffect(() => {
        isTocOpenRef.current = isTocOpen;
    }, [isTocOpen]);

    /**
     * 目次を閉じる。モバイル幅では閉じた目次が inert になりフォーカスが宙に浮くため、
     * 開閉トグルへフォーカスを戻してキーボード操作の文脈を維持する。
     * 既に閉じている場合（デスクトップ幅の常時表示を含む）はフォーカスを奪わない。
     */
    const closeToc = useCallback(() => {
        if (!isTocOpenRef.current) return;
        setIsTocOpen(false);
        tocToggleRef.current?.focus();
    }, []);

    useEffect(() => {
        const sections = document.querySelectorAll<HTMLElement>('main section[id]');
        const intersectingSections = new Set<HTMLElement>();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        intersectingSections.add(entry.target as HTMLElement);
                    } else {
                        intersectingSections.delete(entry.target as HTMLElement);
                    }
                });

                const observerTop = entries[0]?.rootBounds
                    ? entries[0].rootBounds.top
                    : window.innerHeight * 0.2;

                const sorted = Array.from(intersectingSections).sort((a, b) => {
                    const distanceA = Math.abs(a.getBoundingClientRect().top - observerTop);
                    const distanceB = Math.abs(b.getBoundingClientRect().top - observerTop);
                    return distanceA - distanceB || a.offsetTop - b.offsetTop;
                });

                if (sorted[0]?.id) {
                    setActiveSection(sorted[0].id);
                }
            },
            { rootMargin: '-20% 0px -70% 0px' },
        );

        sections.forEach((s) => observer.observe(s));

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeToc();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            observer.disconnect();
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeToc]);

    return (
        <div className="griffin-wordpress-gke-guide-page">
            <button
                ref={tocToggleRef}
                className="toc-toggle"
                type="button"
                aria-controls="table-of-contents"
                aria-expanded={isTocOpen}
                onClick={() => setIsTocOpen(!isTocOpen)}
            >
                <i className="ti ti-menu-2" aria-hidden="true" />
                目次
            </button>

            <div className="layout">
                <NavBar
                    activeSection={activeSection}
                    isOpen={isTocOpen}
                    onClose={closeToc}
                />

                <main className="main">
                    <div className="hero">
                        <div className="hero-eyebrow">
                            <i className="ti ti-google" aria-hidden="true" />
                            GOOGLE CLOUD チャレンジラボ解説
                        </div>
                        <h1>Team Griffin インフラ構築チャレンジラボ 完全解説ガイド</h1>
                        <p>
                            VPC / 踏み台ホスト / Cloud SQL / GKE / WordPress / モニタリング / IAM
                            を、初学者向けにステップバイステップでベストプラクティスとともに読み解きます。
                        </p>
                        <div className="tag-row">
                            <span className="tag">
                                <i className="ti ti-network" aria-hidden="true" />
                                VPC設計
                            </span>
                            <span className="tag">
                                <i className="ti ti-server-2" aria-hidden="true" />
                                踏み台ホスト
                            </span>
                            <span className="tag">
                                <i className="ti ti-database" aria-hidden="true" />
                                Cloud SQL
                            </span>
                            <span className="tag">
                                <i className="ti ti-brand-kubernetes" aria-hidden="true" />
                                GKE
                            </span>
                            <span className="tag">
                                <i className="ti ti-brand-wordpress" aria-hidden="true" />
                                WordPress
                            </span>
                            <span className="tag">
                                <i className="ti ti-activity" aria-hidden="true" />
                                モニタリング
                            </span>
                            <span className="tag">
                                <i className="ti ti-users" aria-hidden="true" />
                                IAM
                            </span>
                        </div>
                    </div>

                    <section id="overview" className="section">
                        <h2>
                            <i className="ti ti-book" aria-hidden="true" />
                            0. このガイドについて
                        </h2>
                        <p>
                            このガイドは、Google Cloud の「Develop your Google Cloud Network」スキルバッジ相当のチャレンジラボ（Jooli Inc. の Team Griffin シナリオ）を題材に、各タスクを<strong>なぜそうするのか（Why）</strong>まで含めて解説するものです。チャレンジラボは手順書がなく自力で進める形式のため、各タスクの背景にあるベストプラクティスを理解しておくことが、ラボ攻略だけでなく実務でも役立ちます。
                        </p>
                        <p>
                            対象読者はネットワーク・Kubernetes・Cloud SQL の基礎用語をある程度知っている初学者を想定しています。各タスクには次の情報を必ず添えています。
                        </p>
                        <ul>
                            <li>目的（なぜこの作業が必要か）</li>
                            <li>実際のコマンド・手順</li>
                            <li>ベストプラクティスとその根拠（公式ドキュメントのURL付き）</li>
                            <li>初学者がつまずきやすいポイント</li>
                        </ul>
                        <div className="callout">
                            <div className="callout-title">
                                <i className="ti ti-info-circle" aria-hidden="true" />
                                置き換えが必要な値
                            </div>
                            <p>
                                本ガイド中の <code>REGION</code> と <code>ZONE</code> は、ラボが指定するリージョン・ゾーンに置き換えてください。
                            </p>
                        </div>
                    </section>

                    <section id="architecture" className="section">
                        <h2>
                            <i className="ti ti-sitemap" aria-hidden="true" />
                            1. 全体アーキテクチャ
                        </h2>
                        <p>
                            Team Griffin の環境は「開発用VPC」と「本番用VPC」を分離し、両方に踏み台ホストからアクセスできる構成です。WordPress は開発用VPCの中に構築したGKEクラスタ上で動作し、データはCloud SQLに保存します。
                        </p>

                        <Diagram id="mermaid-architecture" label="全体アーキテクチャ図" />

                        <p>ポイントは次の3つです。</p>
                        <ol>
                            <li>
                                開発VPCと本番VPCは<strong>完全に分離</strong>されており、直接ピアリングはしません。両者をまたぐ唯一の経路が踏み台ホストです。
                            </li>
                            <li>
                                GKEクラスタは <code>griffin-dev-wp</code> サブネットに配置し、データベースへのアクセスはPod内のCloud SQL Auth Proxyサイドカー経由にすることで、Cloud SQL側のファイアウォール管理を簡略化します。
                            </li>
                            <li>
                                外部公開はWordPressの <code>Service</code>（type: LoadBalancer）が生成するGoogle Cloudの外部ロードバランサのみです。
                            </li>
                        </ol>
                    </section>

                    <section id="task-flow" className="section">
                        <h2>
                            <i className="ti ti-git-branch" aria-hidden="true" />
                            2. タスクの全体フロー
                        </h2>

                        <Diagram id="mermaid-taskflow" label="タスクの全体フロー図" />

                        <p>
                            依存関係として重要なのは、Task6（Secret作成）がTask4（DBユーザー作成）とTask5（クラスタ作成）の両方が完了していないと進められない点、Task7がTask4で確認する「インスタンス接続名」に依存する点です。順番を守らずに進めるとエラーの原因究明に時間を取られるため、上図の順序を推奨します。
                        </p>
                    </section>

                    <section id="standards" className="section">
                        <h2>
                            <i className="ti ti-list-check" aria-hidden="true" />
                            3. 事前準備・標準パラメータ
                        </h2>
                        <p>
                            本ガイドで使用するリソース名・CIDR・環境変数の標準設定一覧です。ラボの環境に合わせて適宜置き換えてください。
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">リソース種別</th>
                                    <th scope="col">リソース名</th>
                                    <th scope="col">設定値 / CIDR</th>
                                    <th scope="col">補足</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>開発VPC</td>
                                    <td><code>griffin-dev-vpc</code></td>
                                    <td>Custom モード</td>
                                    <td>自動モード不可</td>
                                </tr>
                                <tr>
                                    <td>開発WPサブネット</td>
                                    <td><code>griffin-dev-wp</code></td>
                                    <td><code>192.168.16.0/20</code></td>
                                    <td>GKEノード配置用</td>
                                </tr>
                                <tr>
                                    <td>開発Mgmtサブネット</td>
                                    <td><code>griffin-dev-mgmt</code></td>
                                    <td><code>192.168.32.0/20</code></td>
                                    <td>踏み台NIC1用</td>
                                </tr>
                                <tr>
                                    <td>本番VPC</td>
                                    <td><code>griffin-prod-vpc</code></td>
                                    <td>Custom モード</td>
                                    <td>自動モード不可</td>
                                </tr>
                                <tr>
                                    <td>本番WPサブネット</td>
                                    <td><code>griffin-prod-wp</code></td>
                                    <td><code>192.168.48.0/20</code></td>
                                    <td>将来拡張用</td>
                                </tr>
                                <tr>
                                    <td>本番Mgmtサブネット</td>
                                    <td><code>griffin-prod-mgmt</code></td>
                                    <td><code>192.168.64.0/20</code></td>
                                    <td>踏み台NIC2用</td>
                                </tr>
                                <tr>
                                    <td>踏み台ホスト</td>
                                    <td><code>griffin-bastion</code></td>
                                    <td><code>e2-medium</code> (NIC 2枚)</td>
                                    <td>外部IPなし推奨</td>
                                </tr>
                                <tr>
                                    <td>Cloud SQL</td>
                                    <td><code>griffin-dev-db</code></td>
                                    <td>MySQL 8.0 / <code>db-g1-small</code></td>
                                    <td>DB: <code>wordpress</code></td>
                                </tr>
                                <tr>
                                    <td>GKEクラスタ</td>
                                    <td><code>griffin-dev</code></td>
                                    <td><code>e2-standard-4</code> x 2ノード</td>
                                    <td>Zonal クラスタ</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section id="task-1" className="section">
                        <h2>
                            <i className="ti ti-network" aria-hidden="true" />
                            4. Task 1：開発用VPCを手動作成する
                        </h2>
                        <div className="task-card">
                            <div className="task-number">
                                <i className="ti ti-target-arrow" aria-hidden="true" />
                                目的
                            </div>
                            <p>
                                <code>griffin-dev-vpc</code> を作成し、<code>griffin-dev-wp</code>（192.168.16.0/20）と <code>griffin-dev-mgmt</code>（192.168.32.0/20）の2つのサブネットを持たせます。
                            </p>

                            <h3>手順</h3>
                            <div className="code-block">
                                <div className="code-header">
                                    <i className="ti ti-terminal-2" aria-hidden="true" />
                                    bash
                                </div>
                                <pre>
                                    <code>
                                        <div className="code-line"># custom モードでVPCを作成（自動モードは使わない）</div>
                                        <div className="code-line">gcloud compute networks create griffin-dev-vpc \</div>
                                        <div className="code-line">  --subnet-mode=custom</div>
                                        <div className="code-line"></div>
                                        <div className="code-line"># WordPressワークロード用サブネット</div>
                                        <div className="code-line">gcloud compute networks subnets create griffin-dev-wp \</div>
                                        <div className="code-line">  --network=griffin-dev-vpc \</div>
                                        <div className="code-line">  --region=REGION \</div>
                                        <div className="code-line">  --range=192.168.16.0/20</div>
                                        <div className="code-line"></div>
                                        <div className="code-line"># 管理（踏み台）用サブネット</div>
                                        <div className="code-line">gcloud compute networks subnets create griffin-dev-mgmt \</div>
                                        <div className="code-line">  --network=griffin-dev-vpc \</div>
                                        <div className="code-line">  --region=REGION \</div>
                                        <div className="code-line">  --range=192.168.32.0/20</div>
                                    </code>
                                </pre>
                            </div>

                            <div className="callout">
                                <div className="callout-title">
                                    <i className="ti ti-bulb" aria-hidden="true" />
                                    ベストプラクティスの根拠
                                </div>
                                <ul>
                                    <li>
                                        <strong><code>--subnet-mode=custom</code> を必ず指定する</strong>：自動モードVPCは各リージョンに <code>10.128.0.0/9</code> 範囲のサブネットを自動生成してしまい、要件で指定されたCIDR（192.168.16.0/20 等）と競合します。本番運用に適しているのもカスタムモードであると公式ドキュメントで明言されています。
                                    </li>
                                    <li>
                                        カスタムモードVPCは作成直後サブネットが0個の状態から始まるため、「指定されたサブネットのみを持たせる」という要件を満たしやすい構造になっています。
                                    </li>
                                </ul>
                            </div>

                            <div className="callout callout-warning">
                                <div className="callout-title">
                                    <i className="ti ti-alert-triangle" aria-hidden="true" />
                                    初学者がつまずきやすいポイント
                                </div>
                                <ul>
                                    <li>
                                        新規プロジェクトにはデフォルトで <code>default</code> という自動モードVPCが存在します。今回のタスクで使うのは新しく作る <code>griffin-dev-vpc</code> であり、<code>default</code> を編集しないよう注意してください。
                                    </li>
                                    <li>
                                        サブネットはリージョンリソースです。<code>--region</code> の指定ミスはあとでGKEクラスタ作成時のサブネット選択で気づくことが多いので、この段階で <code>REGION</code> を統一しておきましょう。
                                    </li>
                                </ul>
                            </div>

                            <ul className="source-list">
                                <li>
                                    <i className="ti ti-external-link" aria-hidden="true" />
                                    <a href="https://cloud.google.com/vpc/docs/vpc" target="_blank" rel="noopener noreferrer">
                                        VPC networks（自動モード/カスタムモードの違い） - Google Cloud
                                    </a>
                                </li>
                                <li>
                                    <i className="ti ti-external-link" aria-hidden="true" />
                                    <a href="https://cloud.google.com/vpc/docs/subnets" target="_blank" rel="noopener noreferrer">
                                        Subnets（サブネットの概念） - Google Cloud
                                    </a>
                                </li>
                                <li>
                                    <i className="ti ti-external-link" aria-hidden="true" />
                                    <a href="https://cloud.google.com/vpc/docs/create-modify-vpc-networks" target="_blank" rel="noopener noreferrer">
                                        Quickstart: Create and manage VPC networks - Google Cloud
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section id="task-2" className="section">
                        <h2>
                            <i className="ti ti-network" aria-hidden="true" />
                            5. Task 2：本番用VPCを手動作成する
                        </h2>
                        <div className="task-card">
                            <div className="task-number">
                                <i className="ti ti-target-arrow" aria-hidden="true" />
                                目的
                            </div>
                            <p>
                                <code>griffin-prod-vpc</code> を作成し、<code>griffin-prod-wp</code>（192.168.48.0/20）と <code>griffin-prod-mgmt</code>（192.168.64.0/20）のみを持たせます。
                            </p>

                            <h3>手順</h3>
                            <div className="code-block">
                                <div className="code-header">
                                    <i className="ti ti-terminal-2" aria-hidden="true" />
                                    bash
                                </div>
                                <pre>
                                    <code>
                                        <div className="code-line">gcloud compute networks create griffin-prod-vpc \</div>
                                        <div className="code-line">  --subnet-mode=custom</div>
                                        <div className="code-line"></div>
                                        <div className="code-line">gcloud compute networks subnets create griffin-prod-wp \</div>
                                        <div className="code-line">  --network=griffin-prod-vpc \</div>
                                        <div className="code-line">  --region=REGION \</div>
                                        <div className="code-line">  --range=192.168.48.0/20</div>
                                        <div className="code-line"></div>
                                        <div className="code-line">gcloud compute networks subnets create griffin-prod-mgmt \</div>
                                        <div className="code-line">  --network=griffin-prod-vpc \</div>
                                        <div className="code-line">  --region=REGION \</div>
                                        <div className="code-line">  --range=192.168.64.0/20</div>
                                    </code>
                                </pre>
                            </div>

                            <div className="callout">
                                <div className="callout-title">
                                    <i className="ti ti-bulb" aria-hidden="true" />
                                    ベストプラクティスの根拠
                                </div>
                                <p>
                                    Task 1と同じ理由でカスタムモードを使用します。加えて、開発と本番でVPCそのものを分離しているのは、環境ごとに障害影響範囲やアクセス制御を独立させるという定番のネットワーク設計パターンです。IPアドレス帯を重複させていない（16.0/20, 32.0/20, 48.0/20, 64.0/20 と連続かつ非重複で採番されている）点も、将来的にVPCピアリングやハイブリッド接続を行う際にCIDR重複エラーを避けるための設計として理解しておくとよいでしょう。
                                </p>
                            </div>

                            <div className="callout callout-warning">
                                <div className="callout-title">
                                    <i className="ti ti-alert-triangle" aria-hidden="true" />
                                    初学者がつまずきやすいポイント
                                </div>
                                <p>
                                    Task 1との違いは名前とCIDRだけです。コピー&amp;ペーストでの入力ミス（<code>dev</code> と <code>prod</code> の書き間違い）が最も多い失敗パターンなので、作成後は <code>gcloud compute networks subnets list</code> で必ず確認してください。
                                </p>
                            </div>

                            <ul className="source-list">
                                <li>
                                    <i className="ti ti-external-link" aria-hidden="true" />
                                    <a href="https://cloud.google.com/vpc/docs/vpc" target="_blank" rel="noopener noreferrer">
                                        VPC networks - Google Cloud
                                    </a>
                                </li>
                                <li>
                                    <i className="ti ti-external-link" aria-hidden="true" />
                                    <a href="https://cloud.google.com/vpc/docs/subnets" target="_blank" rel="noopener noreferrer">
                                        Subnets - Google Cloud
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section id="task-3" className="section">
                        <h2>
                            <i className="ti ti-server-2" aria-hidden="true" />
                            6. Task 3：踏み台（bastion）ホストを作成する
                        </h2>
                        <div className="task-card">
                            <div className="task-number">
                                <i className="ti ti-target-arrow" aria-hidden="true" />
                                目的
                            </div>
                            <p>
                                <code>griffin-dev-mgmt</code> と <code>griffin-prod-mgmt</code> の両方に接続されたNICを2枚持つ踏み台ホストを作成し、SSH接続できる状態にします。
                            </p>

                            <h3>手順</h3>
                            <div className="code-block">
                                <div className="code-header">
                                    <i className="ti ti-terminal-2" aria-hidden="true" />
                                    bash
                                </div>
                                <pre>
                                    <code>
                                        <div className="code-line"># 2枚のNIC（外部IPなし）を持つVMを作成</div>
                                        <div className="code-line">gcloud compute instances create griffin-bastion \</div>
                                        <div className="code-line">  --zone=ZONE \</div>
                                        <div className="code-line">  --machine-type=e2-medium \</div>
                                        <div className="code-line">  --network-interface=subnet=griffin-dev-mgmt,no-address \</div>
                                        <div className="code-line">  --network-interface=subnet=griffin-prod-mgmt,no-address</div>
                                        <div className="code-line"></div>
                                        <div className="code-line"># IAP経由のSSHを許可するファイアウォールルール（各VPCに1本ずつ）</div>
                                        <div className="code-line">gcloud compute firewall-rules create allow-iap-ssh-dev \</div>
                                        <div className="code-line">  --network=griffin-dev-vpc \</div>
                                        <div className="code-line">  --direction=INGRESS \</div>
                                        <div className="code-line">  --action=ALLOW \</div>
                                        <div className="code-line">  --rules=tcp:22 \</div>
                                        <div className="code-line">  --source-ranges=35.235.240.0/20</div>
                                        <div className="code-line"></div>
                                        <div className="code-line">gcloud compute firewall-rules create allow-iap-ssh-prod \</div>
                                        <div className="code-line">  --network=griffin-prod-vpc \</div>
                                        <div className="code-line">  --direction=INGRESS \</div>
                                        <div className="code-line">  --action=ALLOW \</div>
                                        <div className="code-line">  --rules=tcp:22 \</div>
                                        <div className="code-line">  --source-ranges=35.235.240.0/20</div>
                                        <div className="code-line"></div>
                                        <div className="code-line"># IAP TCPフォワーディング経由でSSH接続</div>
                                        <div className="code-line">gcloud compute ssh griffin-bastion --zone=ZONE --tunnel-through-iap</div>
                                    </code>
                                </pre>
                            </div>

                            <div className="callout">
                                <div className="callout-title">
                                    <i className="ti ti-bulb" aria-hidden="true" />
                                    ベストプラクティスの根拠
                                </div>
                                <ul>
                                    <li>
                                        <strong>外部IPを持たせず、Identity-Aware Proxy（IAP）のTCPフォワーディングでSSHする</strong>のがGoogle Cloud公式が推奨する構成です。IAPは認証・認可・監査ログを一元化しつつ、VMを外部IPなしで安全に運用できる仕組みとして案内されています。踏み台ホスト自体が持つセキュリティリスク（インターネットに公開されたSSHポート）を、IAPを使うことで大きく減らせます。
                                    </li>
                                    <li>
                                        IAPのTCPフォワーディングを使う際は、送信元をIAP専用のIP範囲 <code>35.235.240.0/20</code> に限定したファイアウォールルールが必須です。これがないとIAPからVMへ到達できません。
                                    </li>
                                    <li>
                                        2枚のNICを異なるVPCのサブネットに接続することで、1台のVMが両方のネットワークの「橋渡し役」になります。これはVPCピアリングを使わずに管理トラフィックだけを中継したい場合の典型的な構成です。
                                    </li>
                                </ul>
                            </div>

                            <div className="callout callout-warning">
                                <div className="callout-title">
                                    <i className="ti ti-alert-triangle" aria-hidden="true" />
                                    初学者がつまずきやすいポイント
                                </div>
                                <ul>
                                    <li>
                                        「SSHできること」を確認する際、外部IPを付けて <code>gcloud compute ssh</code> するだけで満足してしまいがちですが、ベストプラクティスとしては <code>--tunnel-through-iap</code> フラグを使う構成を優先してください。
                                    </li>
                                    <li>
                                        ファイアウォールルールを1つのVPCにしか作らないと、もう片方のVPC側からのSSHがタイムアウトします。両方のVPCに同様のルールが必要です。
                                    </li>
                                    <li>
                                        NICの並び順（<code>nic0</code> / <code>nic1</code>）はVM作成時の <code>--network-interface</code> フラグの指定順で決まります。あとから調べるときは <code>gcloud compute instances describe</code> で確認しましょう。
                                    </li>
                                </ul>
                            </div>

                            <ul className="source-list">
                                <li>
                                    <i className="ti ti-external-link" aria-hidden="true" />
                                    <a href="https://cloud.google.com/compute/docs/connect/ssh-best-practices/network-access" target="_blank" rel="noopener noreferrer">
                                        Best practices for controlling SSH network access - Google Cloud
                                    </a>
                                </li>
                                <li>
                                    <i className="ti ti-external-link" aria-hidden="true" />
                                    <a href="https://cloud.google.com/iap/docs/tcp-forwarding-overview" target="_blank" rel="noopener noreferrer">
                                        TCP forwarding overview - Identity-Aware Proxy - Google Cloud
                                    </a>
                                </li>
                                <li>
                                    <i className="ti ti-external-link" aria-hidden="true" />
                                    <a href="https://cloud.google.com/iap/docs/using-tcp-forwarding" target="_blank" rel="noopener noreferrer">
                                        Use IAP for TCP forwarding - Google Cloud
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section id="task-4" className="section">
                        <h2>
                            <i className="ti ti-database" aria-hidden="true" />
                            7. Task 4：Cloud SQL インスタンスの作成とWordPress用DBの準備
                        </h2>
                        <div className="task-card">
                            <div className="task-number">
                                <i className="ti ti-target-arrow" aria-hidden="true" />
                                目的
                            </div>
                            <p>
                                MySQLのCloud SQLインスタンス <code>griffin-dev-db</code> を作成し、WordPress用のデータベースとユーザーを用意します。
                            </p>

                            <h3>手順</h3>
                            <div className="code-block">
                                <div className="code-header">
                                    <i className="ti ti-terminal-2" aria-hidden="true" />
                                    bash
                                </div>
                                <pre>
                                    <code>
                                        <div className="code-line"># コスト効率の良い最小構成でMySQLインスタンスを作成</div>
                                        <div className="code-line">gcloud sql instances create griffin-dev-db \</div>
                                        <div className="code-line">  --database-version=MYSQL_8_0 \</div>
                                        <div className="code-line">  --tier=db-g1-small \</div>
                                        <div className="code-line">  --region=REGION \</div>
                                        <div className="code-line">  --root-password=&lt;ROOT_PASSWORD&gt;</div>
                                        <div className="code-line"></div>
                                        <div className="code-line"># インスタンスに接続</div>
                                        <div className="code-line">gcloud sql connect griffin-dev-db --user=root</div>
                                    </code>
                                </pre>
                            </div>

                            <p>接続後、以下のSQLを実行します。</p>
                            <div className="code-block">
                                <div className="code-header">
                                    <i className="ti ti-terminal-2" aria-hidden="true" />
                                    sql
                                </div>
                                <pre>
                                    <code>
                                        <div className="code-line">CREATE DATABASE wordpress;</div>
                                        <div className="code-line">CREATE USER &apos;wp_user&apos;@&apos;%&apos; IDENTIFIED BY &apos;stormwind_rules&apos;;</div>
                                        <div className="code-line">GRANT ALL PRIVILEGES ON wordpress.* TO &apos;wp_user&apos;@&apos;%&apos;;</div>
                                        <div className="code-line">FLUSH PRIVILEGES;</div>
                                    </code>
                                </pre>
                            </div>

                            <div className="callout">
                                <div className="callout-title">
                                    <i className="ti ti-bulb" aria-hidden="true" />
                                    ベストプラクティスの根拠
                                </div>
                                <ul>
                                    <li>
                                        Cloud SQLインスタンス作成では、ワークロードに見合った最小サイズを選ぶことがコスト管理の基本です。公式ドキュメントでも用途に応じたマシンタイプ・エディションの選択が案内されています。開発環境では <code>db-g1-small</code> のような軽量ティアで十分です。
                                    </li>
                                    <li>
                                        ユーザー名・パスワードは後続のTask 6でKubernetes Secretとして利用するため、ここで作成した認証情報（<code>wp_user</code> / <code>stormwind_rules</code>）を正確にメモしておく必要があります。
                                    </li>
                                    <li>
                                        GKEからの接続方式として、この後のタスクでは<strong>Cloud SQL Auth Proxy</strong>を使う設計になっています。Auth Proxyを使う場合、IAM認可と暗号化されたトンネルで接続できるため、Cloud SQL側で個々のクライアントIPを許可リストに追加する必要がありません。これは「承認済みネットワーク」方式より安全で運用の手間も少ない、公式に推奨されるパターンです。
                                    </li>
                                </ul>
                            </div>

                            <div className="callout callout-warning">
                                <div className="callout-title">
                                    <i className="ti ti-alert-triangle" aria-hidden="true" />
                                    初学者がつまずきやすいポイント
                                </div>
                                <ul>
                                    <li>
                                        <code>gcloud sql connect</code> はCloud Shellから接続する際にCloud SQL Admin APIを経由して一時的にクライアントIPを許可するため、実行環境によっては数十秒待たされることがあります。
                                    </li>
                                    <li>
                                        ユーザー名・ホスト名・パスワードは、SQL文中では単一引用符で囲んでください。二重引用符やバッククォートには置き換えず、上記のSQLをそのまま実行します。
                                    </li>
                                </ul>
                            </div>

                            <ul className="source-list">
                                <li>
                                    <i className="ti ti-external-link" aria-hidden="true" />
                                    <a href="https://cloud.google.com/sql/docs/mysql/create-instance" target="_blank" rel="noopener noreferrer">
                                        Create instances - Cloud SQL for MySQL - Google Cloud
                                    </a>
                                </li>
                                <li>
                                    <i className="ti ti-external-link" aria-hidden="true" />
                                    <a href="https://cloud.google.com/sql/docs/mysql/connect-kubernetes-engine" target="_blank" rel="noopener noreferrer">
                                        Connect to Cloud SQL from Google Kubernetes Engine - Google Cloud
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section id="task-5" className="section">
                        <h2>
                            <i className="ti ti-brand-kubernetes" aria-hidden="true" />
                            8. Task 5：Kubernetesクラスタの作成
                        </h2>
                        <div className="task-card">
                            <div className="task-number">
                                <i className="ti ti-target-arrow" aria-hidden="true" />
                                目的
                            </div>
                            <p>
                                <code>griffin-dev-wp</code> サブネット内、<code>ZONE</code> に、<code>e2-standard-4</code> ノード2台からなるゾーンクラスタ <code>griffin-dev</code> を作成します。
                            </p>

                            <h3>手順</h3>
                            <div className="code-block">
                                <div className="code-header">
                                    <i className="ti ti-terminal-2" aria-hidden="true" />
                                    bash
                                </div>
                                <pre>
                                    <code>
                                        <div className="code-line">gcloud container clusters create griffin-dev \</div>
                                        <div className="code-line">  --zone=ZONE \</div>
                                        <div className="code-line">  --num-nodes=2 \</div>
                                        <div className="code-line">  --machine-type=e2-standard-4 \</div>
                                        <div className="code-line">  --network=griffin-dev-vpc \</div>
                                        <div className="code-line">  --subnetwork=griffin-dev-wp</div>
                                    </code>
                                </pre>
                            </div>

                            <div className="callout">
                                <div className="callout-title">
                                    <i className="ti ti-bulb" aria-hidden="true" />
                                    ベストプラクティスの根拠
                                </div>
                                <ul>
                                    <li>
                                        <strong>ゾーンクラスタ（Zonal cluster）</strong>を選ぶのは、要件で単一ゾーンへの配置が指定されており、かつ開発環境では単一障害点を許容してコストを抑える方が合理的だからです。公式ドキュメントでも、ゾーンクラスタはコントロールプレーンが単一ゾーンに存在し、可用性より低コストを優先するユースケース向けとされています（本番相当の高可用性が必要な場合はリージョンクラスタが推奨されます）。
                                    </li>
                                    <li>
                                        <code>--network</code> と <code>--subnetwork</code> を明示的に指定するのは、デフォルトVPCではなく <code>griffin-dev-vpc</code> の <code>griffin-dev-wp</code> サブネットにノードを配置するためです。指定を省略するとデフォルトVPCにクラスタが作成されてしまい、要件を満たせません。
                                    </li>
                                </ul>
                            </div>

                            <div className="callout callout-warning">
                                <div className="callout-title">
                                    <i className="ti ti-alert-triangle" aria-hidden="true" />
                                    初学者がつまずきやすいポイント
                                </div>
                                <ul>
                                    <li>
                                        クラスタ作成には数分かかります。タイムアウトのように見えても、コンソールやgcloudでステータスを確認しながら気長に待ちましょう。
                                    </li>
                                    <li>
                                        ノードプールのマシンタイプはクラスタ作成後に直接変更できません。サイズを変える場合は新しいノードプールを追加する必要があります。
                                    </li>
                                </ul>
                            </div>

                            <ul className="source-list">
                                <li>
                                    <i className="ti ti-external-link" aria-hidden="true" />
                                    <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-zonal-cluster" target="_blank" rel="noopener noreferrer">
                                        Creating a zonal cluster - GKE - Google Cloud
                                    </a>
                                </li>
                                <li>
                                    <i className="ti ti-external-link" aria-hidden="true" />
                                    <a href="https://cloud.google.com/kubernetes-engine/docs/concepts/configuration-overview" target="_blank" rel="noopener noreferrer">
                                        About cluster configuration choices - GKE - Google Cloud
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section id="task-6" className="section">
                        <h2>
                            <i className="ti ti-lock" aria-hidden="true" />
                            9. Task 6：Kubernetesクラスタの準備（Secret・Volumeの構成）
                        </h2>
                        <div className="task-card">
                            <div className="task-number">
                                <i className="ti ti-target-arrow" aria-hidden="true" />
                                目的
                            </div>
                            <p>
                                WordPressコンテナがCloud SQLに安全に接続できるよう、認証情報をKubernetes Secretとして登録し、永続化のためのVolumeを用意します。
                            </p>

                            <h4>アーキテクチャ（Pod内部の構成）</h4>

                            <Diagram id="mermaid-task6" label="Pod内部の構成図" />

                            <h3>手順</h3>
                            <div className="code-block">
                                <div className="code-header">
                                    <i className="ti ti-terminal-2" aria-hidden="true" />
                                    bash
                                </div>
                                <pre>
                                    <code>
                                        <div className="code-line"># 1. Cloud Shellにサンプルマニフェストをコピー</div>
                                        <div className="code-line">gcloud storage cp -r gs://spls/gsp321/wp-k8s .</div>
                                        <div className="code-line">cd wp-k8s</div>
                                        <div className="code-line"></div>
                                        <div className="code-line"># 2. wp-env.yaml を編集し、username を wp_user、</div>
                                        <div className="code-line">#    password を stormwind_rules に設定してから適用</div>
                                        <div className="code-line">kubectl apply -f wp-env.yaml</div>
                                        <div className="code-line"></div>
                                        <div className="code-line"># 3. Cloud SQL Proxy用サービスアカウントの鍵を発行し、</div>
                                        <div className="code-line">#    Secretとして登録</div>
                                        <div className="code-line">gcloud iam service-accounts keys create key.json \</div>
                                        <div className="code-line">  --iam-account=cloud-sql-proxy@$GOOGLE_CLOUD_PROJECT.iam.gserviceaccount.com</div>
                                        <div className="code-line"></div>
                                        <div className="code-line">kubectl create secret generic cloudsql-instance-credentials \</div>
                                        <div className="code-line">  --from-file key.json</div>
                                    </code>
                                </pre>
                            </div>

                            <div className="callout">
                                <div className="callout-title">
                                    <i className="ti ti-bulb" aria-hidden="true" />
                                    ベストプラクティスの根拠
                                </div>
                                <ul>
                                    <li>
                                        <strong>認証情報をSecretとして分離する</strong>のはKubernetesの基本原則です。パスワードやサービスアカウント鍵をマニフェストやコンテナイメージに直接埋め込まず、Secretリソースとして管理することで、権限管理・ローテーション・監査がしやすくなります。
                                    </li>
                                    <li>
                                        <strong>Cloud SQL Auth Proxyをサイドカーコンテナとして同じPodに配置する</strong>構成は、Google Cloud公式が推奨するパターンです。アプリケーションコンテナは <code>localhost</code> 経由でProxyコンテナに接続するだけでよく、通信の暗号化とIAM認可はProxyが担うため、アプリ側でTLS証明書やネットワーク許可リストを管理する必要がありません。
                                    </li>
                                    <li>
                                        <strong>WordPressの作業ファイルをPersistent Volumeに保存する</strong>のは、Pod自体はスケジューリングによって再作成・移動されうる一時的な存在であり、コンテナのローカルファイルシステムに保存したデータはPodの再作成時に失われてしまうためです。GKEはデフォルトで永続ディスク（Compute Engine persistent disk）を裏付けとするStorageClassを自動生成しており、PersistentVolumeClaimを作るだけで動的に永続ディスクをプロビジョニングできます。
                                    </li>
                                </ul>
                            </div>

                            <div className="callout">
                                <div className="callout-title">
                                    <i className="ti ti-rocket" aria-hidden="true" />
                                    発展的なベストプラクティス（このラボの手順との違い）
                                </div>
                                <p>
                                    このタスクではサービスアカウントの<strong>JSONキーファイルを発行してSecretにマウントする</strong>方式を使います。これは動作しますが、Google Cloudの公式ベストプラクティスでは、キーファイルは漏えいリスクのある長期的な認証情報であるため<strong>できる限り避けるべき</strong>とされています。GKEでは代替として「GKE向けWorkload Identity Federation」を有効化し、Kubernetes Service AccountとGoogle Cloud Service Accountを紐付けることで、キーファイルなしで短期的な認証情報を自動的に払い出す方式が推奨されています。本番環境を構築する際はこちらへの移行を検討してください。
                                </p>
                            </div>

                            <div className="callout callout-warning">
                                <div className="callout-title">
                                    <i className="ti ti-alert-triangle" aria-hidden="true" />
                                    初学者がつまずきやすいポイント
                                </div>
                                <ul>
                                    <li>
                                        <code>wp-env.yaml</code> を編集せずに適用すると、プレースホルダーの認証情報のままDBに接続できずWordPressのインストーラーがエラーになります。適用前に必ず値を書き換えてください。
                                    </li>
                                    <li>
                                        <code>cloud-sql-proxy</code> という名前のサービスアカウントは事前に用意されている前提です。存在しない場合は事前準備の手順（IAMページでの作成）を見直してください。
                                    </li>
                                    <li>
                                        <code>key.json</code> はローカル（Cloud Shell）に一時的に作成されるファイルです。Secret登録後は不要なので、ラボ終了時や本番運用では削除・ローテーションを忘れないようにしましょう。
                                    </li>
                                </ul>
                            </div>

                            <ul className="source-list">
                                <li>
                                    <i className="ti ti-external-link" aria-hidden="true" />
                                    <a href="https://kubernetes.io/docs/concepts/configuration/secret/" target="_blank" rel="noopener noreferrer">
                                        Secrets - Kubernetes 公式ドキュメント
                                    </a>
                                </li>
                                <li>
                                    <i className="ti ti-external-link" aria-hidden="true" />
                                    <a href="https://cloud.google.com/sql/docs/mysql/connect-kubernetes-engine" target="_blank" rel="noopener noreferrer">
                                        Connect to Cloud SQL from GKE - Google Cloud
                                    </a>
                                </li>
                                <li>
                                    <i className="ti ti-external-link" aria-hidden="true" />
                                    <a href="https://cloud.google.com/kubernetes-engine/docs/concepts/persistent-volumes" target="_blank" rel="noopener noreferrer">
                                        GKE persistent volumes &amp; provisioning - Google Cloud
                                    </a>
                                </li>
                                <li>
                                    <i className="ti ti-external-link" aria-hidden="true" />
                                    <a href="https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity" target="_blank" rel="noopener noreferrer">
                                        About Workload Identity Federation for GKE - Google Cloud
                                    </a>
                                </li>
                                <li>
                                    <i className="ti ti-external-link" aria-hidden="true" />
                                    <a href="https://cloud.google.com/iam/docs/best-practices-service-accounts" target="_blank" rel="noopener noreferrer">
                                        Best practices for using service accounts securely - Google Cloud
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section id="task-7" className="section">
                        <h2>
                            <i className="ti ti-brand-wordpress" aria-hidden="true" />
                            10. Task 7：WordPressデプロイメントの作成
                        </h2>
                        <div className="task-card">
                            <div className="task-number">
                                <i className="ti ti-target-arrow" aria-hidden="true" />
                                目的
                            </div>
                            <p>
                                準備したSecretとVolumeを使ってWordPressのDeploymentを作成し、外部からアクセスできるServiceを公開します。
                            </p>

                            <h3>手順</h3>
                            <div className="code-block">
                                <div className="code-header">
                                    <i className="ti ti-terminal-2" aria-hidden="true" />
                                    bash
                                </div>
                                <pre>
                                    <code>
                                        <div className="code-line"># 1. wp-deployment.yaml の YOUR_SQL_INSTANCE を</div>
                                        <div className="code-line">#    griffin-dev-db の「インスタンス接続名」に置き換える</div>
                                        <div className="code-line">#    （例: PROJECT_ID:REGION:griffin-dev-db）</div>
                                        <div className="code-line">kubectl apply -f wp-deployment.yaml</div>
                                        <div className="code-line"></div>
                                        <div className="code-line"># 2. Serviceを作成して外部公開する</div>
                                        <div className="code-line">kubectl apply -f wp-service.yaml</div>
                                        <div className="code-line"></div>
                                        <div className="code-line"># 3. 外部IPが割り当てられるまで待機</div>
                                        <div className="code-line">kubectl get service wordpress --watch</div>
                                    </code>
                                </pre>
                            </div>

                            <div className="callout">
                                <div className="callout-title">
                                    <i className="ti ti-bulb" aria-hidden="true" />
                                    ベストプラクティスの根拠
                                </div>
                                <ul>
                                    <li>
                                        <strong>インスタンス接続名（<code>PROJECT_ID:REGION:INSTANCE_NAME</code>）を使う</strong>のは、Cloud SQL Auth Proxyがこの一意な識別子をもとにインスタンスを特定し、IAMベースで安全に接続を確立する仕組みになっているためです。IPアドレスを直接指定する方式より、インスタンスのIP変更に強い構成です。
                                    </li>
                                    <li>
                                        <strong><code>Service</code> の <code>type: LoadBalancer</code> を使う</strong>ことで、GKEはGoogle Cloudの外部ネットワークロードバランサを自動的にプロビジョニングします。手動でロードバランサやファイアウォールルールを個別に組み立てるより設定ミスが起きにくく、Kubernetesのマニフェストだけで完結する点が推奨される理由です。
                                    </li>
                                </ul>
                            </div>

                            <div className="callout callout-warning">
                                <div className="callout-title">
                                    <i className="ti ti-alert-triangle" aria-hidden="true" />
                                    初学者がつまずきやすいポイント
                                </div>
                                <ul>
                                    <li>
                                        外部IPが割り当てられるまで数分かかることがあります。<code>EXTERNAL-IP</code> が <code>&lt;pending&gt;</code> のままでも異常ではないので、焦らず待ちましょう。
                                    </li>
                                    <li>
                                        <code>YOUR_SQL_INSTANCE</code> の置き換えを忘れると、Podは起動してもCloud SQL Proxyコンテナがクラッシュループします。<code>kubectl logs &lt;pod&gt; -c cloudsql-proxy</code> でログを確認すると原因の切り分けに役立ちます。
                                    </li>
                                    <li>
                                        サイトにアクセスしてWordPressインストーラーが表示された時点でこのタスクは完了です。実際のインストール作業（管理者アカウント作成など）は開発チームの担当であり、このラボのスコープ外です。
                                    </li>
                                </ul>
                            </div>

                            <ul className="source-list">
                                <li>
                                    <i className="ti ti-external-link" aria-hidden="true" />
                                    <a href="https://cloud.google.com/sql/docs/mysql/connect-kubernetes-engine" target="_blank" rel="noopener noreferrer">
                                        Connect to Cloud SQL from GKE - Google Cloud
                                    </a>
                                </li>
                                <li>
                                    <i className="ti ti-external-link" aria-hidden="true" />
                                    <a href="https://cloud.google.com/kubernetes-engine/docs/concepts/persistent-volumes" target="_blank" rel="noopener noreferrer">
                                        GKE persistent volumes &amp; provisioning - Google Cloud
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section id="task-8" className="section">
                        <h2>
                            <i className="ti ti-activity" aria-hidden="true" />
                            11. Task 8：モニタリング（稼働時間チェック）の有効化
                        </h2>
                        <div className="task-card">
                            <div className="task-number">
                                <i className="ti ti-target-arrow" aria-hidden="true" />
                                目的
                            </div>
                            <p>
                                開発環境のWordPressサイトに対する稼働時間チェック（Uptime Check）を作成します。
                            </p>

                            <h3>手順</h3>
                            <ol>
                                <li>
                                    Google Cloudコンソールで <strong>Monitoring &gt; Uptime checks</strong> に移動します。
                                </li>
                                <li><strong>Create Uptime Check</strong> をクリックします。</li>
                                <li>
                                    プロトコルに <code>HTTP</code>、対象のホスト名にWordPressの外部IP（またはドメイン）を指定します。
                                </li>
                                <li>チェック間隔・チェッカーのリージョンを設定し、作成します。</li>
                            </ol>
                            <p>
                                gcloudから作成する場合はAPI経由で以下のような呼び出しになります（詳細な項目はコンソールでの確認を推奨します）。
                            </p>
                            <div className="code-block">
                                <div className="code-header">
                                    <i className="ti ti-terminal-2" aria-hidden="true" />
                                    bash
                                </div>
                                <pre>
                                    <code>
                                        <div className="code-line">gcloud monitoring uptime create wordpress-uptime-check \</div>
                                        <div className="code-line">  --resource-type=uptime-url \</div>
                                        <div className="code-line">  --resource-labels=host=&quot;$WORDPRESS_EXTERNAL_IP&quot;,project_id=&quot;$(gcloud config get-value project)&quot; \</div>
                                        <div className="code-line">  --protocol=http \</div>
                                        <div className="code-line">  --port=80</div>
                                    </code>
                                </pre>
                            </div>

                            <div className="callout">
                                <div className="callout-title">
                                    <i className="ti ti-bulb" aria-hidden="true" />
                                    ベストプラクティスの根拠
                                </div>
                                <ul>
                                    <li>
                                        Cloud Monitoringの稼働時間チェックは、世界各地のチェッカーから対象URLに定期的にリクエストを送り、応答の有無・レスポンスコードを記録する仕組みです。これにより、外形監視（ユーザー視点での可用性監視）が実現できます。公式ドキュメントでも、パブリックに公開されたURLやGoogle Cloudリソースの死活監視に用いる標準的な方法として案内されています。
                                    </li>
                                    <li>
                                        GKE自体についても、クラスタ作成時にデフォルトでCloud MonitoringとCloud Loggingが統合されています。稼働時間チェックのような「外側からの疎通確認」と、GKEのオブザーバビリティ機能による「内側のワークロードの健全性監視」を組み合わせることで、より網羅的な監視体制になります。
                                    </li>
                                </ul>
                            </div>

                            <div className="callout callout-warning">
                                <div className="callout-title">
                                    <i className="ti ti-alert-triangle" aria-hidden="true" />
                                    初学者がつまずきやすいポイント
                                </div>
                                <ul>
                                    <li>
                                        稼働時間チェックの対象にIPアドレスを指定した場合、WordPress側のロードバランサIPが変わると監視が壊れます。可能であれば安定したドメイン名を割り当てて監視対象にするのが望ましいです。
                                    </li>
                                    <li>
                                        チェックが失敗し続ける場合、対象のファイアウォールルールが <code>0.0.0.0/0</code> からのHTTPアクセスを許可しているか（<code>Service</code> type LoadBalancerは基本的に許可される）を確認してください。
                                    </li>
                                </ul>
                            </div>

                            <ul className="source-list">
                                <li>
                                    <i className="ti ti-external-link" aria-hidden="true" />
                                    <a href="https://cloud.google.com/monitoring/uptime-checks" target="_blank" rel="noopener noreferrer">
                                        Create public uptime checks - Cloud Monitoring - Google Cloud
                                    </a>
                                </li>
                                <li>
                                    <i className="ti ti-external-link" aria-hidden="true" />
                                    <a href="https://cloud.google.com/monitoring/uptime-checks/manage" target="_blank" rel="noopener noreferrer">
                                        Manage uptime checks - Cloud Monitoring - Google Cloud
                                    </a>
                                </li>
                                <li>
                                    <i className="ti ti-external-link" aria-hidden="true" />
                                    <a href="https://cloud.google.com/kubernetes-engine/docs/concepts/observability" target="_blank" rel="noopener noreferrer">
                                        Observability for GKE - Google Cloud
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section id="task-9" className="section">
                        <h2>
                            <i className="ti ti-users" aria-hidden="true" />
                            12. Task 9：追加エンジニアへのアクセス権限付与
                        </h2>
                        <div className="task-card">
                            <div className="task-number">
                                <i className="ti ti-target-arrow" aria-hidden="true" />
                                目的
                            </div>
                            <p>
                                新しく参加するエンジニア（ラボの2つ目のユーザーアカウント）に、プロジェクトへのEditorロールを付与します。
                            </p>

                            <h3>手順</h3>
                            <div className="code-block">
                                <div className="code-header">
                                    <i className="ti ti-terminal-2" aria-hidden="true" />
                                    bash
                                </div>
                                <pre>
                                    <code>
                                        <div className="code-line">gcloud projects add-iam-policy-binding &lt;PROJECT_ID&gt; \</div>
                                        <div className="code-line">  --member=&quot;user:&lt;追加エンジニアのメールアドレス&gt;&quot; \</div>
                                        <div className="code-line">  --role=&quot;roles/editor&quot;</div>
                                    </code>
                                </pre>
                            </div>

                            <div className="callout">
                                <div className="callout-title">
                                    <i className="ti ti-bulb" aria-hidden="true" />
                                    ベストプラクティスの根拠
                                </div>
                                <ul>
                                    <li>
                                        IAMには「基本ロール（Owner / Editor / Viewer）」「事前定義ロール」「カスタムロール」の3種類があります。基本ロールはIAM導入以前から存在するレガシーなロールで、プロジェクト内の全サービスに対して広範な権限を一括付与するため、最小権限の原則には沿わないと公式ドキュメントでも位置づけられています。
                                    </li>
                                    <li>
                                        今回のタスクはラボの要件として明示的にEditorロールの付与を求めているため、それに従います。ただし実務では、対象エンジニアが実際に必要とする作業範囲（例: GKE運用のみなら <code>roles/container.admin</code>、ネットワーク運用のみなら <code>roles/compute.networkAdmin</code> など）に応じた事前定義ロールやカスタムロールを組み合わせ、Editor / Ownerのような広範なロールの使用は最小限にとどめるのが望ましいとされています。
                                    </li>
                                </ul>
                            </div>

                            <div className="callout callout-warning">
                                <div className="callout-title">
                                    <i className="ti ti-alert-triangle" aria-hidden="true" />
                                    初学者がつまずきやすいポイント
                                </div>
                                <ul>
                                    <li>
                                        <code>--member</code> の書式は <code>user:</code>、<code>serviceAccount:</code>、<code>group:</code> などプレフィックスを間違えるとエラーになります。個人ユーザーアカウントの場合は <code>user:</code> を忘れないようにしてください。
                                    </li>
                                    <li>
                                        ロールの付与はほぼ即座に反映されますが、コンソール上の表示が更新されるまで数十秒のタイムラグがある場合があります。
                                    </li>
                                </ul>
                            </div>

                            <ul className="source-list">
                                <li>
                                    <i className="ti ti-external-link" aria-hidden="true" />
                                    <a href="https://cloud.google.com/iam/docs/roles-overview" target="_blank" rel="noopener noreferrer">
                                        Roles and permissions - IAM - Google Cloud
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section id="summary" className="section">
                        <h2>
                            <i className="ti ti-table" aria-hidden="true" />
                            13. まとめ表：タスク一覧とベストプラクティス早見表
                        </h2>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Task</th>
                                    <th scope="col">作成する主なリソース</th>
                                    <th scope="col">押さえるべきベストプラクティス</th>
                                    <th scope="col">参考ソース</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td><code>griffin-dev-vpc</code> + 2サブネット</td>
                                    <td>カスタムモードVPCを使い、要件通りのCIDRのみ持たせる</td>
                                    <td>
                                        <a href="https://cloud.google.com/vpc/docs/vpc" target="_blank" rel="noopener noreferrer">
                                            VPC networks
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td><code>griffin-prod-vpc</code> + 2サブネット</td>
                                    <td>開発／本番でVPCを分離し、CIDR重複を避ける</td>
                                    <td>
                                        <a href="https://cloud.google.com/vpc/docs/subnets" target="_blank" rel="noopener noreferrer">
                                            Subnets
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td><code>griffin-bastion</code>（NIC2枚）</td>
                                    <td>外部IPなし + IAP TCPフォワーディングでSSH</td>
                                    <td>
                                        <a href="https://cloud.google.com/compute/docs/connect/ssh-best-practices/network-access" target="_blank" rel="noopener noreferrer">
                                            SSH best practices
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td><code>griffin-dev-db</code>（Cloud SQL）</td>
                                    <td>用途に見合った最小ティア、Auth Proxy前提の設計</td>
                                    <td>
                                        <a href="https://cloud.google.com/sql/docs/mysql/create-instance" target="_blank" rel="noopener noreferrer">
                                            Create instances
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td><code>griffin-dev</code>（GKEクラスタ）</td>
                                    <td>要件のVPC/サブネットを明示指定、ゾーンクラスタでコスト最適化</td>
                                    <td>
                                        <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-zonal-cluster" target="_blank" rel="noopener noreferrer">
                                            Creating a zonal cluster
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>Secret / PersistentVolume</td>
                                    <td>認証情報はSecretで分離、DB接続はサイドカーProxy経由</td>
                                    <td>
                                        <a href="https://kubernetes.io/docs/concepts/configuration/secret/" target="_blank" rel="noopener noreferrer">
                                            Secrets（Kubernetes）
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>WordPress Deployment / Service</td>
                                    <td>インスタンス接続名を使用、type LoadBalancerで公開</td>
                                    <td>
                                        <a href="https://cloud.google.com/sql/docs/mysql/connect-kubernetes-engine" target="_blank" rel="noopener noreferrer">
                                            Connect from GKE
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>Uptime Check</td>
                                    <td>外形監視でユーザー視点の可用性を継続確認</td>
                                    <td>
                                        <a href="https://cloud.google.com/monitoring/uptime-checks" target="_blank" rel="noopener noreferrer">
                                            Create uptime checks
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>IAMポリシーバインディング</td>
                                    <td>要件に従いつつ、実務では最小権限ロールを優先検討</td>
                                    <td>
                                        <a href="https://cloud.google.com/iam/docs/roles-overview" target="_blank" rel="noopener noreferrer">
                                            Roles and permissions
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section id="references" className="section">
                        <h2>
                            <i className="ti ti-link" aria-hidden="true" />
                            14. 参考文献一覧（全ソース）
                        </h2>

                        <h3>ネットワーク（VPC / サブネット）</h3>
                        <ul className="source-list">
                            <li>
                                <i className="ti ti-external-link" aria-hidden="true" />
                                <a href="https://cloud.google.com/vpc/docs/vpc" target="_blank" rel="noopener noreferrer">
                                    VPC networks - Virtual Private Cloud - Google Cloud
                                </a>
                            </li>
                            <li>
                                <i className="ti ti-external-link" aria-hidden="true" />
                                <a href="https://cloud.google.com/vpc/docs/subnets" target="_blank" rel="noopener noreferrer">
                                    Subnets - Virtual Private Cloud - Google Cloud
                                </a>
                            </li>
                            <li>
                                <i className="ti ti-external-link" aria-hidden="true" />
                                <a href="https://cloud.google.com/vpc/docs/create-modify-vpc-networks" target="_blank" rel="noopener noreferrer">
                                    Quickstart: Create and manage VPC networks - Google Cloud
                                </a>
                            </li>
                        </ul>

                        <h3>踏み台ホスト / IAP</h3>
                        <ul className="source-list">
                            <li>
                                <i className="ti ti-external-link" aria-hidden="true" />
                                <a href="https://cloud.google.com/compute/docs/connect/ssh-best-practices/network-access" target="_blank" rel="noopener noreferrer">
                                    Best practices for controlling SSH network access - Google Cloud
                                </a>
                            </li>
                            <li>
                                <i className="ti ti-external-link" aria-hidden="true" />
                                <a href="https://cloud.google.com/iap/docs/tcp-forwarding-overview" target="_blank" rel="noopener noreferrer">
                                    TCP forwarding overview - Identity-Aware Proxy - Google Cloud
                                </a>
                            </li>
                            <li>
                                <i className="ti ti-external-link" aria-hidden="true" />
                                <a href="https://cloud.google.com/iap/docs/using-tcp-forwarding" target="_blank" rel="noopener noreferrer">
                                    Use IAP for TCP forwarding - Identity-Aware Proxy - Google Cloud
                                </a>
                            </li>
                        </ul>

                        <h3>Cloud SQL</h3>
                        <ul className="source-list">
                            <li>
                                <i className="ti ti-external-link" aria-hidden="true" />
                                <a href="https://cloud.google.com/sql/docs/mysql/create-instance" target="_blank" rel="noopener noreferrer">
                                    Create instances - Cloud SQL for MySQL - Google Cloud
                                </a>
                            </li>
                            <li>
                                <i className="ti ti-external-link" aria-hidden="true" />
                                <a href="https://cloud.google.com/sql/docs/mysql/connect-kubernetes-engine" target="_blank" rel="noopener noreferrer">
                                    Connect to Cloud SQL from Google Kubernetes Engine - Google Cloud
                                </a>
                            </li>
                        </ul>

                        <h3>GKE / Kubernetes</h3>
                        <ul className="source-list">
                            <li>
                                <i className="ti ti-external-link" aria-hidden="true" />
                                <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-zonal-cluster" target="_blank" rel="noopener noreferrer">
                                    Creating a zonal cluster - GKE - Google Cloud
                                </a>
                            </li>
                            <li>
                                <i className="ti ti-external-link" aria-hidden="true" />
                                <a href="https://cloud.google.com/kubernetes-engine/docs/concepts/configuration-overview" target="_blank" rel="noopener noreferrer">
                                    About cluster configuration choices - GKE - Google Cloud
                                </a>
                            </li>
                            <li>
                                <i className="ti ti-external-link" aria-hidden="true" />
                                <a href="https://kubernetes.io/docs/concepts/configuration/secret/" target="_blank" rel="noopener noreferrer">
                                    Secrets - Kubernetes 公式ドキュメント
                                </a>
                            </li>
                            <li>
                                <i className="ti ti-external-link" aria-hidden="true" />
                                <a href="https://cloud.google.com/kubernetes-engine/docs/concepts/persistent-volumes" target="_blank" rel="noopener noreferrer">
                                    GKE persistent volumes &amp; provisioning - GKE - Google Cloud
                                </a>
                            </li>
                            <li>
                                <i className="ti ti-external-link" aria-hidden="true" />
                                <a href="https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity" target="_blank" rel="noopener noreferrer">
                                    About Workload Identity Federation for GKE - Google Cloud
                                </a>
                            </li>
                            <li>
                                <i className="ti ti-external-link" aria-hidden="true" />
                                <a href="https://cloud.google.com/iam/docs/best-practices-service-accounts" target="_blank" rel="noopener noreferrer">
                                    Best practices for using service accounts securely - IAM - Google Cloud
                                </a>
                            </li>
                        </ul>

                        <h3>モニタリング</h3>
                        <ul className="source-list">
                            <li>
                                <i className="ti ti-external-link" aria-hidden="true" />
                                <a href="https://cloud.google.com/monitoring/uptime-checks" target="_blank" rel="noopener noreferrer">
                                    Create public uptime checks - Cloud Monitoring - Google Cloud
                                </a>
                            </li>
                            <li>
                                <i className="ti ti-external-link" aria-hidden="true" />
                                <a href="https://cloud.google.com/monitoring/uptime-checks/manage" target="_blank" rel="noopener noreferrer">
                                    Manage uptime checks - Cloud Monitoring - Google Cloud
                                </a>
                            </li>
                            <li>
                                <i className="ti ti-external-link" aria-hidden="true" />
                                <a href="https://cloud.google.com/kubernetes-engine/docs/concepts/observability" target="_blank" rel="noopener noreferrer">
                                    Observability for GKE - GKE - Google Cloud
                                </a>
                            </li>
                        </ul>

                        <h3>IAM</h3>
                        <ul className="source-list">
                            <li>
                                <i className="ti ti-external-link" aria-hidden="true" />
                                <a href="https://cloud.google.com/iam/docs/roles-overview" target="_blank" rel="noopener noreferrer">
                                    Roles and permissions - IAM - Google Cloud
                                </a>
                            </li>
                        </ul>
                    </section>

                    <section id="conclusion" className="section">
                        <h2>
                            <i className="ti ti-flag-3" aria-hidden="true" />
                            15. 総括
                        </h2>
                        <p>
                            このチャレンジラボは、単なる「手順の暗記」ではなく、Google Cloudの基本原則（最小権限、外部公開面の最小化、認証情報の分離、コスト効率）を1つの実践的なシナリオの中で横断的に問う構成になっています。特に次の3点は実務でもそのまま応用できる考え方です。
                        </p>
                        <ol>
                            <li>
                                <strong>ネットワークは環境ごとに分離し、必要な経路だけを明示的に開ける</strong>（踏み台ホスト + IAP）。
                            </li>
                            <li>
                                <strong>アプリケーションとデータベースの接続はサイドカー構成で抽象化し、認証情報はSecretで管理する</strong>。
                            </li>
                            <li>
                                <strong>監視は「外側からの死活監視」と「内側のオブザーバビリティ」を両輪で整備する</strong>。
                            </li>
                        </ol>
                        <p>
                            ラボの <code>Check my progress</code> で緑のチェックが付かない場合は、まず本ガイドの該当タスクの「初学者がつまずきやすいポイント」を確認し、それでも解決しない場合は各リソースの実際の設定値（サブネットのCIDR、Secretの中身、インスタンス接続名など）を1つずつ見直すことをおすすめします。
                        </p>
                    </section>

                    <div className="footer">Team Griffin インフラ構築チャレンジラボ 完全解説ガイド</div>
                </main>
            </div>
        </div>
    );
}
