'use client';

import { useState } from 'react';
import NavBar from './NavBar';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';

function CheckItem({ title, desc }: { title: string; desc: string }) {
    const [checked, setChecked] = useState(false);
    return (
        <button
            type="button"
            className="check-item text-left align-top"
            onClick={() => setChecked(!checked)}
            aria-pressed={checked}
        >
            <div className={`check-box ${checked ? 'checked' : ''}`} />
            <div className="check-content">
                <strong>{title}</strong>
                <span>{desc}</span>
            </div>
        </button>
    );
}

function Diagram({ id, label }: { id: string; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <div className="mermaid-title">{label}</div>
            <div className="mermaid">
                <MermaidDiagram chart={chart} ariaLabel={label} />
            </div>
        </div>
    );
}

export default function AceSection3Guide() {
    return (
        <div className="app-layout">
            <NavBar />

            <main className="main-content">
                {/* HERO */}
                <header className="hero">
                    <div className="hero-eyebrow">
                        <span className="pulse"></span>Google Cloud Certification — ACE 試験対策
                    </div>
                    <h1>
                        Section 3:<br /><span>Ensuring the Successful Operation of a Cloud Solution</span>
                    </h1>
                    <p className="hero-sub">
                        試験配点 ~30%（最重量セクション）。Compute Engine・GKE・Cloud
                        Run・Storage・Networking・Monitoring/Logging
                        の日常運用を中級〜上級者向けに完全解説。試験ガイド
                        063026（2026年6月30日改訂版）準拠。
                    </p>
                    <div className="hero-meta">
                        <div className="meta-pill">
                            <div className="ml">配点</div>
                            <div className="mv">~30%</div>
                        </div>
                        <div className="meta-pill">
                            <div className="ml">サブセクション</div>
                            <div className="mv">3.1 〜 3.4</div>
                        </div>
                        <div className="meta-pill">
                            <div className="ml">試験ガイド</div>
                            <div className="mv">063026</div>
                        </div>
                        <div className="meta-pill">
                            <div className="ml">対象レベル</div>
                            <div className="mv">中級〜上級</div>
                        </div>
                    </div>
                </header>

                {/* OVERVIEW */}
                <section id="overview" className="section-block">
                    <div className="overview-card">
                        <h3>📊 Section 3 — サブセクション別 出題比重（試験ガイド 063026 準拠）</h3>
                        <div className="prow">
                            <div className="pl">3.1 コンピューティング管理</div>
                            <div className="pbar">
                                <div
                                    className="pfill"
                                    style={{ width: '40%', backgroundColor: 'var(--color-google-blue)' }}
                                />
                            </div>
                            <div className="pct-val" style={{ color: 'var(--color-google-blue)' }}>★★★★</div>
                        </div>
                        <div className="prow">
                            <div className="pl">3.2 ストレージ・データ管理</div>
                            <div className="pbar">
                                <div
                                    className="pfill"
                                    style={{ width: '30%', backgroundColor: 'var(--color-google-green)' }}
                                />
                            </div>
                            <div className="pct-val" style={{ color: 'var(--color-google-green)' }}>★★★</div>
                        </div>
                        <div className="prow">
                            <div className="pl">3.3 ネットワーク管理</div>
                            <div className="pbar">
                                <div
                                    className="pfill"
                                    style={{ width: '25%', backgroundColor: 'var(--color-google-yellow)' }}
                                />
                            </div>
                            <div className="pct-val" style={{ color: 'var(--color-google-yellow)' }}>★★★</div>
                        </div>
                        <div className="prow">
                            <div className="pl">3.4 モニタリング・ロギング</div>
                            <div className="pbar">
                                <div
                                    className="pfill"
                                    style={{ width: '35%', backgroundColor: 'var(--color-google-red)' }}
                                />
                            </div>
                            <div className="pct-val" style={{ color: 'var(--color-google-red)' }}>★★★★</div>
                        </div>
                    </div>
                    <Diagram id="diag-1" label="Section 3 — Day2 Operations 全体フロー" />
                </section>

                {/* ===== 3.1 ===== */}
                <div className="section-gap">
                    <div className="sec-header sh-blue">
                        <div className="sec-icon si-blue">🖥️</div>
                        <div className="sec-header-body">
                            <h2>3.1 コンピューティングリソースの管理</h2>
                            <p>
                                Compute Engine・GKE・Cloud Run の日常運用 —
                                接続・スナップショット・スケール・デプロイ管理
                            </p>
                        </div>
                        <div className="weight-badge wb-blue">最重要 ★★★★</div>
                    </div>

                    <div className="card section-block" id="s31-connect">
                        <div className="card-title">
                            🔐 Compute Engine へのリモート接続 <span className="topic-tag">3.1</span>
                        </div>
                        <div className="tbl-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">接続方法</th>
                                        <th scope="col">外部 IP</th>
                                        <th scope="col">セキュリティ</th>
                                        <th scope="col">推奨場面</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>IAP トンネル SSH</strong></td>
                                        <td>不要</td>
                                        <td>🔒 最高</td>
                                        <td>本番環境・外部 IP なし VM</td>
                                    </tr>
                                    <tr>
                                        <td><strong>OS Login + IAP</strong></td>
                                        <td>不要</td>
                                        <td>🔒 最高</td>
                                        <td>組織管理環境・SSH 鍵一元管理</td>
                                    </tr>
                                    <tr>
                                        <td><strong>gcloud SSH（直接）</strong></td>
                                        <td>必要</td>
                                        <td>🔓 中</td>
                                        <td>開発・検証環境</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Cloud Console ブラウザ</strong></td>
                                        <td>推奨なし</td>
                                        <td>🔓 中</td>
                                        <td>簡易操作・緊急時</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Serial Console</strong></td>
                                        <td>不要</td>
                                        <td>🔓 中</td>
                                        <td>OS 起動不能時の緊急復旧のみ</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Diagram id="diag-2" label="IAP トンネル SSH — 認証フロー" />
                        <div className="code-block">
                            <div className="code-header">
                                <span className="code-lang">bash</span>
                                <div className="code-dots">
                                    <span className="cd1" /><span className="cd2" /><span className="cd3" />
                                </div>
                            </div>
                            <pre className="code-content">
                                <div className="code-line"><span className="comment"># IAP 経由 SSH（本番推奨）</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute ssh INSTANCE_NAME <span className="flag">--zone</span>=ZONE <span className="flag">--tunnel-through-iap</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># OS Login 有効化（プロジェクト全体）</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute project-info add-metadata <span className="flag">--metadata</span> <span className="val">enable-oslogin=TRUE</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># OS Login IAM ロール付与</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> projects add-iam-policy-binding PROJECT_ID \</div>
                                <div className="code-line">  <span className="flag">--member</span>=<span className="val">&quot;user:user@example.com&quot;</span> \</div>
                                <div className="code-line">  <span className="flag">--role</span>=<span className="val">&quot;roles/compute.osLogin&quot;</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># インスタンス一覧・詳細確認</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute instances list</div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute instances describe INSTANCE_NAME <span className="flag">--zone</span>=ZONE</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># 起動・停止・削除</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute instances start INSTANCE_NAME <span className="flag">--zone</span>=ZONE</div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute instances stop INSTANCE_NAME <span className="flag">--zone</span>=ZONE</div>
                            </pre>
                        </div>
                        <div className="bp">
                            <div className="bp-title">✅ ベストプラクティス — リモート接続</div>
                            <ul>
                                <li>
                                    本番 VM には<strong>外部 IP を割り当てず</strong>、IAP
                                    トンネル経由でアクセスする
                                </li>
                                <li>
                                    <strong>OS Login</strong> を有効化して SSH 鍵の個別管理を廃止し
                                    IAM で一元制御する
                                </li>
                                <li>
                                    Serial Console は緊急時以外は<strong>無効</strong>にしておく
                                </li>
                                <li>
                                    <code>roles/iap.tunnelResourceAccessor</code>
                                    は最小権限で付与する
                                </li>
                            </ul>
                        </div>
                        <div className="src-box">
                            <div className="src-title">📎 参照リソース</div>
                            <a
                                href="https://cloud.google.com/compute/docs/connect/ssh-using-iap"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/compute/docs/connect/ssh-using-iap
                            </a>
                            <a
                                href="https://cloud.google.com/compute/docs/oslogin"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/compute/docs/oslogin
                            </a>
                        </div>
                    </div>

                    <div className="card section-block" id="s31-snapshot">
                        <div className="card-title">
                            📸 スナップショットとイメージ管理 <span className="topic-tag">3.1</span>
                        </div>
                        <div className="tbl-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">比較項目</th>
                                        <th scope="col">スナップショット</th>
                                        <th scope="col">カスタムイメージ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>主な用途</strong></td>
                                        <td>バックアップ・PITR</td>
                                        <td>VM テンプレート・大量展開</td>
                                    </tr>
                                    <tr>
                                        <td><strong>保存方式</strong></td>
                                        <td>増分（初回のみフル）</td>
                                        <td>完全コピー</td>
                                    </tr>
                                    <tr>
                                        <td><strong>スコープ</strong></td>
                                        <td>プロジェクト内</td>
                                        <td>グローバル（プロジェクト跨ぎ可）</td>
                                    </tr>
                                    <tr>
                                        <td><strong>復元方法</strong></td>
                                        <td>新ディスクとして復元</td>
                                        <td>新 VM を作成</td>
                                    </tr>
                                    <tr>
                                        <td><strong>スケジュール</strong></td>
                                        <td>Snapshot Schedule Policy で自動化可</td>
                                        <td>手動 / CI/CD パイプライン</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Diagram id="diag-3" label="スナップショット vs イメージ — 使い分けフロー" />
                        <div className="code-block">
                            <div className="code-header">
                                <span className="code-lang">bash</span>
                                <div className="code-dots">
                                    <span className="cd1" /><span className="cd2" /><span className="cd3" />
                                </div>
                            </div>
                            <pre className="code-content">
                                <div className="code-line"><span className="comment"># スナップショット作成</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute disks snapshot DISK_NAME \</div>
                                <div className="code-line">  <span className="flag">--snapshot-names</span>=SNAPSHOT_NAME \</div>
                                <div className="code-line">  <span className="flag">--zone</span>=ZONE \</div>
                                <div className="code-line">  <span className="flag">--storage-location</span>=REGION</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># スナップショットスケジュール作成（毎日 04:00）</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute resource-policies create snapshot-schedule POLICY_NAME \</div>
                                <div className="code-line">  <span className="flag">--region</span>=REGION \</div>
                                <div className="code-line">  <span className="flag">--max-retention-days</span>=<span className="val">7</span> \</div>
                                <div className="code-line">  <span className="flag">--daily-schedule</span> \</div>
                                <div className="code-line">  <span className="flag">--start-time</span>=<span className="val">04:00</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># ディスクへのスケジュール適用</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute disks add-resource-policies DISK_NAME \</div>
                                <div className="code-line">  <span className="flag">--resource-policies</span>=POLICY_NAME <span className="flag">--zone</span>=ZONE</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># イメージ作成（--family で最新版管理）</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute images create IMAGE_NAME \</div>
                                <div className="code-line">  <span className="flag">--source-disk</span>=DISK_NAME \</div>
                                <div className="code-line">  <span className="flag">--source-disk-zone</span>=ZONE \</div>
                                <div className="code-line">  <span className="flag">--family</span>=MY_IMAGE_FAMILY</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># 最新イメージの参照（常に最新版を使う）</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute images describe-from-family MY_IMAGE_FAMILY \</div>
                                <div className="code-line">  <span className="flag">--project</span>=PROJECT_ID</div>
                            </pre>
                        </div>
                        <div className="bp">
                            <div className="bp-title">
                                ✅ ベストプラクティス — スナップショット・イメージ
                            </div>
                            <ul>
                                <li>
                                    <strong>Snapshot Schedule Policy</strong>
                                    で本番ディスクの定期バックアップを自動化する
                                </li>
                                <li>
                                    イメージは <code>--family</code> で管理し
                                    <code>describe-from-family</code> で常に最新版を参照する
                                </li>
                                <li>
                                    <strong>VM 停止中</strong>にスナップショットを取得してデータ整合性を確保する
                                </li>
                                <li>
                                    <code>--storage-location</code>
                                    でデータ主権要件に合わせてリージョンを指定する
                                </li>
                            </ul>
                        </div>
                        <div className="src-box">
                            <div className="src-title">📎 参照リソース</div>
                            <a
                                href="https://cloud.google.com/compute/docs/disks/create-snapshots"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/compute/docs/disks/create-snapshots
                            </a>
                            <a
                                href="https://cloud.google.com/compute/docs/images/create-custom"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/compute/docs/images/create-custom
                            </a>
                        </div>
                    </div>

                    <div className="card section-block" id="s31-gke">
                        <div className="card-title">
                            ☸️ GKE クラスタの運用管理 <span className="topic-tag">3.1</span>
                        </div>
                        <div className="tbl-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">比較項目</th>
                                        <th scope="col">Deployment</th>
                                        <th scope="col">StatefulSet</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Pod 名</strong></td>
                                        <td>ランダムサフィックス</td>
                                        <td>順番付き（pod-0, pod-1…）</td>
                                    </tr>
                                    <tr>
                                        <td><strong>起動順序</strong></td>
                                        <td>同時起動</td>
                                        <td>順番に起動（0→1→2）</td>
                                    </tr>
                                    <tr>
                                        <td><strong>ストレージ</strong></td>
                                        <td>共有可</td>
                                        <td>各 Pod に固有の PV</td>
                                    </tr>
                                    <tr>
                                        <td><strong>ユースケース</strong></td>
                                        <td>ステートレス Web/API</td>
                                        <td>DB・Kafka・ZooKeeper</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Diagram id="diag-4" label="GKE から Artifact Registry へのアクセス設定" />
                        <div className="code-block">
                            <div className="code-header">
                                <span className="code-lang">bash</span>
                                <div className="code-dots">
                                    <span className="cd1" /><span className="cd2" /><span className="cd3" />
                                </div>
                            </div>
                            <pre className="code-content">
                                <div className="code-line"><span className="comment"># クラスタ認証情報の取得</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> container clusters get-credentials CLUSTER_NAME <span className="flag">--zone</span>=ZONE</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># インベントリ確認</span></div>
                                <div className="code-line"><span className="cmd">kubectl</span> get nodes -o wide</div>
                                <div className="code-line"><span className="cmd">kubectl</span> get pods <span className="flag">--all-namespaces</span> -o wide</div>
                                <div className="code-line"><span className="cmd">kubectl</span> get services <span className="flag">--all-namespaces</span></div>
                                <div className="code-line"><span className="cmd">kubectl</span> get statefulsets <span className="flag">--all-namespaces</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># ノードプール追加（GPU 対応）</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> container node-pools create GPU_POOL \</div>
                                <div className="code-line">  <span className="flag">--cluster</span>=CLUSTER_NAME <span className="flag">--zone</span>=ZONE \</div>
                                <div className="code-line">  <span className="flag">--machine-type</span>=<span className="val">n1-standard-4</span> \</div>
                                <div className="code-line">  <span className="flag">--accelerator</span>=<span className="val">type=nvidia-tesla-t4,count=1</span> \</div>
                                <div className="code-line">  <span className="flag">--enable-autoscaling</span> \</div>
                                <div className="code-line">  <span className="flag">--min-nodes</span>=<span className="val">0</span> <span className="flag">--max-nodes</span>=<span className="val">5</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># ノードプール削除</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> container node-pools delete POOL_NAME \</div>
                                <div className="code-line">  <span className="flag">--cluster</span>=CLUSTER_NAME <span className="flag">--zone</span>=ZONE</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># Deployment ローリングアップデート</span></div>
                                <div className="code-line"><span className="cmd">kubectl</span> set image deployment/MY_DEPLOY container=NEW_IMAGE:TAG -n NAMESPACE</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># ロールバック</span></div>
                                <div className="code-line"><span className="cmd">kubectl</span> rollout undo deployment/MY_DEPLOY -n NAMESPACE</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># Pod ログ確認</span></div>
                                <div className="code-line"><span className="cmd">kubectl</span> logs POD_NAME -n NAMESPACE <span className="flag">--tail</span>=<span className="val">100</span> -f</div>
                            </pre>
                        </div>
                        <div className="bp">
                            <div className="bp-title">✅ ベストプラクティス — GKE 運用</div>
                            <ul>
                                <li>
                                    Artifact Registry アクセスは
                                    <strong>Workload Identity Federation</strong> で SA
                                    キーなしに認証する
                                </li>
                                <li>
                                    GPU ノードプールは
                                    <code>--min-nodes=0</code>
                                    に設定して未使用時のコストをゼロにする
                                </li>
                                <li>StatefulSet 削除は必ず順番に行いデータ損失を防ぐ</li>
                                <li>
                                    Autopilot では全コンテナに
                                    <code>resources.requests</code> を必ず設定する
                                </li>
                            </ul>
                        </div>
                        <div className="src-box">
                            <div className="src-title">📎 参照リソース</div>
                            <a
                                href="https://cloud.google.com/kubernetes-engine/docs/concepts/node-pools"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/kubernetes-engine/docs/concepts/node-pools
                            </a>
                            <a
                                href="https://cloud.google.com/artifact-registry/docs/integrate-gke"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/artifact-registry/docs/integrate-gke
                            </a>
                        </div>
                    </div>

                    <div className="card section-block" id="s31-autoscale">
                        <div className="card-title">
                            📈 Pod オートスケーリング（HPA / VPA）
                            <span className="topic-tag">3.1</span>
                        </div>
                        <div className="tbl-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">比較項目</th>
                                        <th scope="col">HPA（Horizontal）</th>
                                        <th scope="col">VPA（Vertical）</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>スケール方向</strong></td>
                                        <td>Pod 数を増減</td>
                                        <td>Pod の CPU/Memory を増減</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Pod 再起動</strong></td>
                                        <td>なし</td>
                                        <td>あり（updateMode: Auto の場合）</td>
                                    </tr>
                                    <tr>
                                        <td><strong>ユースケース</strong></td>
                                        <td>ステートレスアプリのトラフィック対応</td>
                                        <td>DB・バッチ処理のリソース最適化</td>
                                    </tr>
                                    <tr>
                                        <td><strong>GKE Autopilot</strong></td>
                                        <td>自動管理</td>
                                        <td>Pod Resource Request を管理</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="code-block">
                            <div className="code-header">
                                <span className="code-lang">bash / yaml</span>
                                <div className="code-dots">
                                    <span className="cd1" /><span className="cd2" /><span className="cd3" />
                                </div>
                            </div>
                            <pre className="code-content">
                                <div className="code-line"><span className="comment"># HPA 作成（CPU 70% でスケール）</span></div>
                                <div className="code-line"><span className="cmd">kubectl</span> autoscale deployment MY_DEPLOY \</div>
                                <div className="code-line">  <span className="flag">--cpu-percent</span>=<span className="val">70</span> \</div>
                                <div className="code-line">  <span className="flag">--min</span>=<span className="val">2</span> \</div>
                                <div className="code-line">  <span className="flag">--max</span>=<span className="val">20</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># HPA マニフェスト（CPU + Memory）</span></div>
                                <div className="code-line"><span className="key">apiVersion</span>: autoscaling/v2</div>
                                <div className="code-line"><span className="key">kind</span>: HorizontalPodAutoscaler</div>
                                <div className="code-line"><span className="key">spec</span>:</div>
                                <div className="code-line">  <span className="key">minReplicas</span>: <span className="val">2</span></div>
                                <div className="code-line">  <span className="key">maxReplicas</span>: <span className="val">20</span></div>
                                <div className="code-line">  <span className="key">metrics</span>:</div>
                                <div className="code-line">  - <span className="key">type</span>: Resource</div>
                                <div className="code-line">    <span className="key">resource</span>:</div>
                                <div className="code-line">      <span className="key">name</span>: cpu</div>
                                <div className="code-line">      <span className="key">target</span>:</div>
                                <div className="code-line">        <span className="key">type</span>: Utilization</div>
                                <div className="code-line">        <span className="key">averageUtilization</span>: <span className="val">70</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># VPA マニフェスト（updateMode: Initial 推奨）</span></div>
                                <div className="code-line"><span className="key">apiVersion</span>: autoscaling.k8s.io/v1</div>
                                <div className="code-line"><span className="key">kind</span>: VerticalPodAutoscaler</div>
                                <div className="code-line"><span className="key">spec</span>:</div>
                                <div className="code-line">  <span className="key">updatePolicy</span>:</div>
                                <div className="code-line">    <span className="key">updatePolicy</span>:</div>
                                <div className="code-line">      <span className="key">updateMode</span>: <span className="val">&quot;Initial&quot;</span>  <span className="comment">{/* 本番では Auto を避ける */}</span></div>
                            </pre>
                        </div>
                        <div className="bp">
                            <div className="bp-title">✅ ベストプラクティス — オートスケーリング</div>
                            <ul>
                                <li>
                                    <code>minReplicas</code> は
                                    <strong>2 以上</strong>に設定して単一障害点を排除する
                                </li>
                                <li>
                                    VPA の <code>updateMode: Auto</code> は Pod
                                    再起動を伴うため本番では <code>Initial</code> か
                                    <code>Off</code> 推奨
                                </li>
                                <li>
                                    HPA と
                                    <strong>Cluster Autoscaler</strong>
                                    を組み合わせてノード数も自動調整する
                                </li>
                                <li>
                                    Autopilot では全コンテナに
                                    <code>resources.requests</code> を必ず設定する（過剰課金防止）
                                </li>
                            </ul>
                        </div>
                        <div className="src-box">
                            <div className="src-title">📎 参照リソース</div>
                            <a
                                href="https://cloud.google.com/kubernetes-engine/docs/concepts/horizontalpodautoscaler"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/kubernetes-engine/docs/concepts/horizontalpodautoscaler
                            </a>
                            <a
                                href="https://cloud.google.com/kubernetes-engine/docs/concepts/verticalpodautoscaler"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/kubernetes-engine/docs/concepts/verticalpodautoscaler
                            </a>
                        </div>
                    </div>

                    <div className="card section-block" id="s31-cloudrun">
                        <div className="card-title">
                            🚀 Cloud Run の運用管理 <span className="topic-tag">3.1</span>
                        </div>
                        <Diagram id="diag-5" label="カナリアデプロブとトラフィック分割フロー" />
                        <div className="tbl-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">パラメータ</th>
                                        <th scope="col">説明</th>
                                        <th scope="col">推奨値</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>--min-instances</strong></td>
                                        <td>アイドル時も維持するインスタンス数</td>
                                        <td>レイテンシ重視: 1以上、コスト重視: 0</td>
                                    </tr>
                                    <tr>
                                        <td><strong>--max-instances</strong></td>
                                        <td>スケールアップの上限</td>
                                        <td>DB コネクション数・外部 API 制限を考慮</td>
                                    </tr>
                                    <tr>
                                        <td><strong>--concurrency</strong></td>
                                        <td>1 インスタンスあたりの同時リクエスト数</td>
                                        <td>CPU バウンド: 1、I/O バウンド: 80〜1000</td>
                                    </tr>
                                    <tr>
                                        <td><strong>--timeout</strong></td>
                                        <td>リクエストタイムアウト（秒）</td>
                                        <td>最大 3600 秒</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="code-block">
                            <div className="code-header">
                                <span className="code-lang">bash</span>
                                <div className="code-dots">
                                    <span className="cd1" /><span className="cd2" /><span className="cd3" />
                                </div>
                            </div>
                            <pre className="code-content">
                                <div className="code-line"><span className="comment"># トラフィックを向けずに新バージョンをデプロイ</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> run deploy SERVICE_NAME \</div>
                                <div className="code-line">  <span className="flag">--image</span>=IMAGE_URL \</div>
                                <div className="code-line">  <span className="flag">--region</span>=REGION \</div>
                                <div className="code-line">  <span className="flag">--no-traffic</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># カナリアデプロイ（10% だけ新バージョンへ）</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> run services update-traffic SERVICE_NAME \</div>
                                <div className="code-line">  <span className="flag">--to-revisions</span>=<span className="val">revision-00002=10,revision-00001=90</span> \</div>
                                <div className="code-line">  <span className="flag">--region</span>=REGION</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># 最新リビジョンに 100% 切り替え</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> run services update-traffic SERVICE_NAME \</div>
                                <div className="code-line">  <span className="flag">--to-latest</span> <span className="flag">--region</span>=REGION</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># ロールバック</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> run services update-traffic SERVICE_NAME \</div>
                                <div className="code-line">  <span className="flag">--to-revisions</span>=<span className="val">revision-00001=100</span> <span className="flag">--region</span>=REGION</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># オートスケーリング設定</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> run services update SERVICE_NAME \</div>
                                <div className="code-line">  <span className="flag">--region</span>=REGION \</div>
                                <div className="code-line">  <span className="flag">--min-instances</span>=<span className="val">1</span> \</div>
                                <div className="code-line">  <span className="flag">--max-instances</span>=<span className="val">100</span> \</div>
                                <div className="code-line">  <span className="flag">--concurrency</span>=<span className="val">80</span></div>
                            </pre>
                        </div>
                        <div className="bp">
                            <div className="bp-title">✅ ベストプラクティス — Cloud Run</div>
                            <ul>
                                <li>
                                    本番リリース前は <code>--no-traffic</code> でデプロイし<strong>段階的にトラフィックを切り替える</strong>
                                </li>
                                <li>
                                    レイテンシが重要なサービスは
                                    <code>--min-instances=1</code> 以上で<strong>コールドスタートを防ぐ</strong>
                                </li>
                                <li>
                                    <code>--max-instances</code>
                                    はバックエンドの制約（DBコネクション数）に合わせて必ず設定する
                                </li>
                                <li>
                                    Cloud Run Functions も同じトラフィック分割コマンドで管理可能
                                </li>
                            </ul>
                        </div>
                        <div className="src-box">
                            <div className="src-title">📎 参照リソース</div>
                            <a
                                href="https://cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration
                            </a>
                            <a
                                href="https://cloud.google.com/run/docs/configuring/autoscaling"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/run/docs/configuring/autoscaling
                            </a>
                        </div>
                    </div>

                    <div className="card section-block" id="s31-gpu">
                        <div className="card-title">
                            ⚡ GPU / TPU アタッチメント <span className="topic-tag">3.1</span>
                        </div>
                        <div className="code-block">
                            <div className="code-header">
                                <span className="code-lang">bash</span>
                                <div className="code-dots">
                                    <span className="cd1" /><span className="cd2" /><span className="cd3" />
                                </div>
                            </div>
                            <pre className="code-content">
                                <div className="code-line"><span className="comment"># GPU 搭載 VM インスタンス作成</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute instances create GPU_VM \</div>
                                <div className="code-line">  <span className="flag">--zone</span>=ZONE \</div>
                                <div className="code-line">  <span className="flag">--machine-type</span>=<span className="val">n1-standard-4</span> \</div>
                                <div className="code-line">  <span className="flag">--accelerator</span>=<span className="val">&quot;type=nvidia-tesla-t4,count=1&quot;</span> \</div>
                                <div className="code-line">  <span className="flag">--maintenance-policy</span>=<span className="val">TERMINATE</span> \</div>
                                <div className="code-line">  <span className="flag">--metadata</span>=<span className="val">&quot;install-nvidia-driver=True&quot;</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># Spot VM でコストを最大 90% 削減（学習ジョブ向け）</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute instances create SPOT_GPU_VM \</div>
                                <div className="code-line">  <span className="flag">--provisioning-model</span>=<span className="val">SPOT</span> \</div>
                                <div className="code-line">  <span className="flag">--accelerator</span>=<span className="val">&quot;type=nvidia-tesla-t4,count=1&quot;</span> \</div>
                                <div className="code-line">  <span className="flag">--maintenance-policy</span>=<span className="val">TERMINATE</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># Cloud TPU VM の作成</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute tpus tpu-vm create TPU_NAME \</div>
                                <div className="code-line">  <span className="flag">--zone</span>=ZONE \</div>
                                <div className="code-line">  <span className="flag">--accelerator-type</span>=<span className="val">v4-8</span> \</div>
                                <div className="code-line">  <span className="flag">--version</span>=<span className="val">tpu-vm-tf-2.12.0</span></div>
                            </pre>
                        </div>
                        <div className="warn">
                            <div className="warn-title">⚠️ GPU VM の必須設定</div>
                            <ul>
                                <li>
                                    <code>--maintenance-policy=TERMINATE</code>
                                    が<strong>必須</strong>（ライブマイグレーション非対応）
                                </li>
                                <li>
                                    GPU Driver
                                    は起動スクリプト（<code>install-nvidia-driver=True</code>）で自動インストールを推奨
                                </li>
                                <li>
                                    学習ジョブには
                                    <code>--provisioning-model=SPOT</code> でコストを最大 90%
                                    削減できる
                                </li>
                            </ul>
                        </div>
                        <div className="src-box">
                            <div className="src-title">📎 参照リソース</div>
                            <a
                                href="https://cloud.google.com/compute/docs/gpus"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/compute/docs/gpus
                            </a>
                        </div>
                    </div>
                </div>

                {/* ===== 3.2 ===== */}
                <div className="section-gap">
                    <div className="sec-header sh-green">
                        <div className="sec-icon si-green">💾</div>
                        <div className="sec-header-body">
                            <h2>3.2 ストレージとデータソリューションの管理</h2>
                            <p>Cloud Storage・データベース操作・バックアップ・CMEK の運用管理</p>
                        </div>
                        <div className="weight-badge wb-green">重要 ★★★</div>
                    </div>

                    <div className="card section-block" id="s32-gcs">
                        <div className="card-title">
                            🪣 Cloud Storage の操作とセキュリティ <span className="topic-tag">3.2</span>
                        </div>
                        <div className="split2">
                            <div className="sbox">
                                <div className="sbox-t" style={{ color: 'var(--green)' }}>
                                    ✅ Uniform Bucket-Level Access（推奨）
                                </div>
                                <ul>
                                    <li>バケット全体に IAM ポリシーを適用</li>
                                    <li>オブジェクト個別の ACL を無効化</li>
                                    <li>権限管理が一元化されシンプル</li>
                                    <li>GDPR・コンプライアンス対応に有効</li>
                                </ul>
                            </div>
                            <div className="sbox">
                                <div className="sbox-t" style={{ color: 'var(--red)' }}>
                                    ❌ Fine-grained ACL（非推奨・レガシー）
                                </div>
                                <ul>
                                    <li>オブジェクト個別に ACL を設定可能</li>
                                    <li>管理が複雑で権限棚卸しが困難</li>
                                    <li>設定ミスによる意図しない公開リスク</li>
                                    <li>新規プロジェクトでは使用しない</li>
                                </ul>
                            </div>
                        </div>
                        <div className="tbl-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">データ保護機能</th>
                                        <th scope="col">説明</th>
                                        <th scope="col">主な用途</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>バージョニング</strong></td>
                                        <td>過去バージョンを保持</td>
                                        <td>誤削除・誤上書きからの復旧</td>
                                    </tr>
                                    <tr>
                                        <td><strong>オブジェクトロック（WORM）</strong></td>
                                        <td>一定期間の削除・変更を防止</td>
                                        <td>規制対応・コンプライアンス</td>
                                    </tr>
                                    <tr>
                                        <td><strong>保持ポリシー</strong></td>
                                        <td>バケット全体の最小保持期間を設定</td>
                                        <td>コンプライアンス・監査</td>
                                    </tr>
                                    <tr>
                                        <td><strong>ソフトデリート</strong></td>
                                        <td>削除オブジェクトを 7〜90 日間復元可能</td>
                                        <td>誤削除からの素早い復旧</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="code-block">
                            <div className="code-header">
                                <span className="code-lang">bash</span>
                                <div className="code-dots">
                                    <span className="cd1" /><span className="cd2" /><span className="cd3" />
                                </div>
                            </div>
                            <pre className="code-content">
                                <div className="code-line"><span className="comment"># Uniform Bucket-Level Access 有効化（推奨）</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> storage buckets update gs://BUCKET_NAME \</div>
                                <div className="code-line">  <span className="flag">--uniform-bucket-level-access</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># 公開アクセス防止（誤公開防止）</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> storage buckets update gs://BUCKET_NAME \</div>
                                <div className="code-line">  <span className="flag">--public-access-prevention</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># バージョニング有効化</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> storage buckets update gs://BUCKET_NAME <span className="flag">--versioning</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># 保持ポリシー（30 日間削除禁止）</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> storage buckets update gs://BUCKET_NAME \</div>
                                <div className="code-line">  <span className="flag">--retention-period</span>=<span className="val">30d</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># ソフトデリート（30 日間復元可能）</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> storage buckets update gs://BUCKET_NAME \</div>
                                <div className="code-line">  <span className="flag">--soft-delete-duration</span>=<span className="val">30d</span></div>
                            </pre>
                        </div>
                        <div className="bp">
                            <div className="bp-title">✅ ベストプラクティス — Cloud Storage</div>
                            <ul>
                                <li>
                                    すべてのバケットで
                                    <strong>Uniform Bucket-Level Access</strong> を有効化する
                                </li>
                                <li>
                                    <strong>Public Access Prevention</strong>
                                    を組織ポリシーで強制して誤公開を防ぐ
                                </li>
                                <li>
                                    機密データには<strong>保持ポリシー</strong>と<strong>オブジェクトロック</strong>を設定する
                                </li>
                                <li>
                                    バケット名は
                                    <code>PROJECT_ID-bucket-name</code>
                                    のような命名規則でグローバル一意性を確保する
                                </li>
                            </ul>
                        </div>
                        <div className="src-box">
                            <div className="src-title">📎 参照リソース</div>
                            <a
                                href="https://cloud.google.com/storage/docs/uniform-bucket-level-access"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/storage/docs/uniform-bucket-level-access
                            </a>
                            <a
                                href="https://cloud.google.com/storage/docs/access-control"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/storage/docs/access-control
                            </a>
                        </div>
                    </div>

                    <div className="card section-block" id="s32-lifecycle">
                        <div className="card-title">
                            🔄 ライフサイクル管理ポリシー <span className="topic-tag">3.2</span>
                        </div>
                        <div className="tbl-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ストレージクラス</th>
                                        <th scope="col">最小保存期間</th>
                                        <th scope="col">用途目安</th>
                                        <th scope="col">GB/月コスト</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Standard</strong></td>
                                        <td>なし</td>
                                        <td>頻繁アクセス・Web 配信</td>
                                        <td>$0.020</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Nearline</strong></td>
                                        <td>30 日</td>
                                        <td>月 1 回程度（バックアップ）</td>
                                        <td>$0.010</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Coldline</strong></td>
                                        <td>90 日</td>
                                        <td>四半期 1 回（アーカイブ）</td>
                                        <td>$0.004</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Archive</strong></td>
                                        <td>365 日</td>
                                        <td>年 1 回未満（法的保管）</td>
                                        <td>$0.0012</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="code-block">
                            <div className="code-header">
                                <span className="code-lang">json — lifecycle.json</span>
                                <div className="code-dots">
                                    <span className="cd1" /><span className="cd2" /><span className="cd3" />
                                </div>
                            </div>
                            <pre className="code-content">
                                <div className="code-line">{`{`}</div>
                                <div className="code-line">  <span className="key">&quot;lifecycle&quot;</span>: {`{`}</div>
                                <div className="code-line">    <span className="key">&quot;rule&quot;</span>: [</div>
                                <div className="code-line">      {`{`}</div>
                                <div className="code-line">        <span className="key">&quot;action&quot;</span>: {`{`} <span className="key">&quot;type&quot;</span>: <span className="val">&quot;SetStorageClass&quot;</span>, <span className="key">&quot;storageClass&quot;</span>: <span className="val">&quot;NEARLINE&quot;</span> {`}`},</div>
                                <div className="code-line">        <span className="key">&quot;condition&quot;</span>: {`{`} <span className="key">&quot;age&quot;</span>: <span className="val">30</span>, <span className="key">&quot;matchesStorageClass&quot;</span>: [<span className="val">&quot;STANDARD&quot;</span>] {`}`}</div>
                                <div className="code-line">      {`}`},</div>
                                <div className="code-line">      {`{`}</div>
                                <div className="code-line">        <span className="key">&quot;action&quot;</span>: {`{`} <span className="key">&quot;type&quot;</span>: <span className="val">&quot;SetStorageClass&quot;</span>, <span className="key">&quot;storageClass&quot;</span>: <span className="val">&quot;COLDLINE&quot;</span> {`}`},</div>
                                <div className="code-line">        <span className="key">&quot;condition&quot;</span>: {`{`} <span className="key">&quot;age&quot;</span>: <span className="val">90</span> {`}`}</div>
                                <div className="code-line">      {`}`},</div>
                                <div className="code-line">      {`{`}</div>
                                <div className="code-line">        <span className="key">&quot;action&quot;</span>: {`{`} <span className="key">&quot;type&quot;</span>: <span className="val">&quot;Delete&quot;</span> {`}`},</div>
                                <div className="code-line">        <span className="key">&quot;condition&quot;</span>: {`{`} <span className="key">&quot;age&quot;</span>: <span className="val">365</span> {`}`}</div>
                                <div className="code-line">      {`}`},</div>
                                <div className="code-line">      {`{`}</div>
                                <div className="code-line">        <span className="key">&quot;action&quot;</span>: {`{`} <span className="key">&quot;type&quot;</span>: <span className="val">&quot;Delete&quot;</span> {`}`},</div>
                                <div className="code-line">        <span className="key">&quot;condition&quot;</span>: {`{`} <span className="key">&quot;numNewerVersions&quot;</span>: <span className="val">3</span>, <span className="key">&quot;isLive&quot;</span>: <span className="val">false</span> {`}`}</div>
                                <div className="code-line">      {`}`}</div>
                                <div className="code-line">    ]</div>
                                <div className="code-line">  {`}`}</div>
                                <div className="code-line">{`}`}</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># ポリシー適用</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> storage buckets update gs://BUCKET_NAME \</div>
                                <div className="code-line">  <span className="flag">--lifecycle-file</span>=lifecycle.json</div>
                            </pre>
                        </div>
                        <div className="warn">
                            <div className="warn-title">⚠️ age 条件の注意点</div>
                            <p>
                                <code>age</code>
                                条件はオブジェクトの<strong>作成日からの日数</strong>です（最終アクセス日ではありません）。バージョニング有効時は
                                <code>numNewerVersions</code>
                                で古いバージョンを定期削除してコストを管理してください。
                            </p>
                        </div>
                        <div className="src-box">
                            <div className="src-title">📎 参照リソース</div>
                            <a
                                href="https://cloud.google.com/storage/docs/lifecycle"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/storage/docs/lifecycle
                            </a>
                        </div>
                    </div>

                    <div className="card section-block" id="s32-query">
                        <div className="card-title">
                            🔍 データベースクエリと操作 <span className="topic-tag">3.2</span>
                        </div>
                        <Diagram id="diag-6" label="BigQuery クエリコスト管理フロー" />
                        <div className="code-block">
                            <div className="code-header">
                                <span className="code-lang">bash</span>
                                <div className="code-dots">
                                    <span className="cd1" /><span className="cd2" /><span className="cd3" />
                                </div>
                            </div>
                            <pre className="code-content">
                                <div className="code-line"><span className="comment"># BigQuery ドライランでコスト試算（必須手順）</span></div>
                                <div className="code-line"><span className="cmd">bq</span> query <span className="flag">--use_legacy_sql</span>=false <span className="flag">--dry_run</span> \</div>
                                <div className="code-line">  <span className="val">&apos;SELECT col1, col2 FROM \`project.dataset.table\`</span></div>
                                <div className="code-line"><span className="val">   WHERE DATE(_PARTITIONTIME)=&quot;2025-01-01&quot;&apos;</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># Cloud SQL Auth Proxy 経由で接続（推奨）</span></div>
                                <div className="code-line">./cloud-sql-proxy PROJECT_ID:REGION:INSTANCE <span className="flag">--port</span>=<span className="val">5432</span> &amp;</div>
                                <div className="code-line">psql <span className="val">&quot;host=127.0.0.1 port=5432 dbname=DB user=USER&quot;</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># Cloud Spanner クエリ</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> spanner databases execute-sql DB_NAME \</div>
                                <div className="code-line">  <span className="flag">--instance</span>=INSTANCE \</div>
                                <div className="code-line">  <span className="flag">--sql</span>=<span className="val">&quot;SELECT * FROM Users WHERE UserId = 1&quot;</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># Firestore データベース一覧</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> firestore databases list</div>
                            </pre>
                        </div>
                        <div className="bp">
                            <div className="bp-title">✅ ベストプラクティス — DB クエリ</div>
                            <ul>
                                <li>
                                    BigQuery では
                                    <code>--dry_run</code>
                                    で<strong>事前にコストを確認</strong>してから本番実行する（$5/TB）
                                </li>
                                <li>
                                    Cloud SQL へは
                                    <strong>Cloud SQL Auth Proxy</strong>
                                    経由で接続し直接インターネット接続を避ける
                                </li>
                                <li>
                                    BigQuery
                                    高コストクエリには<strong>パーティション化とクラスタリング</strong>を適用する
                                </li>
                            </ul>
                        </div>
                        <div className="src-box">
                            <div className="src-title">📎 参照リソース</div>
                            <a
                                href="https://cloud.google.com/bigquery/docs/best-practices-performance-compute"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/bigquery/docs/best-practices-performance-compute
                            </a>
                            <a
                                href="https://cloud.google.com/sql/docs/mysql/connect-auth-proxy"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/sql/docs/mysql/connect-auth-proxy
                            </a>
                        </div>
                    </div>

                    <div className="card section-block" id="s32-backup">
                        <div className="card-title">
                            🔒 バックアップとリストア <span className="topic-tag">3.2</span>
                        </div>
                        <div className="tbl-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">サービス</th>
                                        <th scope="col">バックアップ種別</th>
                                        <th scope="col">主なコマンド</th>
                                        <th scope="col">PITR</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Cloud SQL</strong></td>
                                        <td>自動・オンデマンド・PITR（7日間）</td>
                                        <td><code>gcloud sql backups create</code></td>
                                        <td>✅ 秒単位</td>
                                    </tr>
                                    <tr>
                                        <td><strong>AlloyDB</strong></td>
                                        <td>自動・オンデマンド・PITR</td>
                                        <td><code>gcloud alloydb backups create</code></td>
                                        <td>✅ 秒単位</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Spanner</strong></td>
                                        <td>フルバックアップ・PITR（7日間）</td>
                                        <td><code>gcloud spanner backups create</code></td>
                                        <td>✅ 秒単位</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Firestore</strong></td>
                                        <td>Managed Export（Cloud Storage）</td>
                                        <td><code>gcloud firestore export</code></td>
                                        <td>❌ エクスポート時点</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Bigtable</strong></td>
                                        <td>マネージドバックアップ・GCS エクスポート</td>
                                        <td><code>gcloud bigtable backups create</code></td>
                                        <td>❌ バックアップ時点</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="code-block">
                            <div className="code-header">
                                <span className="code-lang">bash</span>
                                <div className="code-dots">
                                    <span className="cd1" /><span className="cd2" /><span className="cd3" />
                                </div>
                            </div>
                            <pre className="code-content">
                                <div className="code-line"><span className="comment"># Cloud SQL バックアップ作成</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> sql backups create <span className="flag">--instance</span>=INSTANCE_NAME</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># Cloud SQL PITR（特定時点への復元）</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> sql instances restore-backup TARGET_INSTANCE \</div>
                                <div className="code-line">  <span className="flag">--restore-instance</span>=SOURCE_INSTANCE \</div>
                                <div className="code-line">  <span className="flag">--backup-time</span>=<span className="val">&quot;2025-01-15T10:00:00Z&quot;</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># Spanner バックアップ作成</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> spanner backups create BACKUP_NAME \</div>
                                <div className="code-line">  <span className="flag">--instance</span>=INSTANCE <span className="flag">--database</span>=DB \</div>
                                <div className="code-line">  <span className="flag">--expiration-date</span>=<span className="val">&quot;2025-12-31T00:00:00Z&quot;</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># Firestore エクスポート</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> firestore export gs://BACKUP_BUCKET/backup \</div>
                                <div className="code-line">  <span className="flag">--collection-ids</span>=COLLECTION1,COLLECTION2</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># Firestore インポート</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> firestore import gs://BACKUP_BUCKET/backup</div>
                            </pre>
                        </div>
                        <div className="bp">
                            <div className="bp-title">✅ ベストプラクティス — バックアップ</div>
                            <ul>
                                <li>
                                    Cloud SQL は <strong>PITR</strong> を有効化して最大 7
                                    日間の任意時点に復元できるようにする
                                </li>
                                <li>
                                    Firestore エクスポートは
                                    <strong>Cloud Scheduler + Cloud Run</strong> で定期自動化する
                                </li>
                                <li>
                                    バックアップは<strong>本番とは別リージョン</strong>に保存してリージョン障害に備える
                                </li>
                            </ul>
                        </div>
                        <div className="src-box">
                            <div className="src-title">📎 参照リソース</div>
                            <a
                                href="https://cloud.google.com/sql/docs/mysql/backup-recovery/pitr"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/sql/docs/mysql/backup-recovery/pitr
                            </a>
                        </div>
                    </div>

                    <div className="card section-block" id="s32-cmek">
                        <div className="card-title">
                            🔑 Database Center と CMEK <span className="topic-tag">3.2</span>
                        </div>
                        <Diagram id="diag-7" label="Database Center — フリート管理の全体像" />
                        <div className="code-block">
                            <div className="code-header">
                                <span className="code-lang">bash — CMEK 設定</span>
                                <div className="code-dots">
                                    <span className="cd1" /><span className="cd2" /><span className="cd3" />
                                </div>
                            </div>
                            <pre className="code-content">
                                <div className="code-line"><span className="comment"># KMS キーリングとキーの作成</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> kms keyrings create KEY_RING <span className="flag">--location</span>=REGION</div>
                                <div className="code-line"><span className="cmd">gcloud</span> kms keys create KEY_NAME \</div>
                                <div className="code-line">  <span className="flag">--keyring</span>=KEY_RING <span className="flag">--location</span>=REGION \</div>
                                <div className="code-line">  <span className="flag">--purpose</span>=encryption</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># Cloud SQL で CMEK を使用してインスタンス作成</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> sql instances create INSTANCE_NAME \</div>
                                <div className="code-line">  <span className="flag">--database-version</span>=<span className="val">POSTGRES_15</span> \</div>
                                <div className="code-line">  <span className="flag">--region</span>=REGION \</div>
                                <div className="code-line">  <span className="flag">--disk-encryption-key</span>=<span className="val">projects/PROJECT/locations/REGION/keyRings/KEY_RING/cryptoKeys/KEY_NAME</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># Cloud Storage バケットで CMEK を設定</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> storage buckets create gs://BUCKET_NAME \</div>
                                <div className="code-line">  <span className="flag">--location</span>=REGION \</div>
                                <div className="code-line">  <span className="flag">--default-encryption-key</span>=<span className="val">projects/PROJECT/locations/REGION/keyRings/RING/cryptoKeys/KEY</span></div>
                            </pre>
                        </div>
                        <div className="warn">
                            <div className="warn-title">⚠️ CMEK の重要注意事項</div>
                            <p>
                                CMEK を使う場合、<strong>KMS キーへのアクセスを失うとデータも失います</strong>。キーのバックアップと復旧手順を事前に整備し、キーローテーションポリシーを設定してください。
                            </p>
                        </div>
                        <div className="src-box">
                            <div className="src-title">📎 参照リソース</div>
                            <a
                                href="https://cloud.google.com/kms/docs/cmek"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/kms/docs/cmek
                            </a>
                            <a
                                href="https://cloud.google.com/database-center"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/database-center
                            </a>
                        </div>
                    </div>
                </div>

                {/* ===== 3.3 ===== */}
                <div className="section-gap">
                    <div className="sec-header sh-amber">
                        <div className="sec-icon si-amber">🌐</div>
                        <div className="sec-header-body">
                            <h2>3.3 ネットワークリソースの管理</h2>
                            <p>
                                サブネット・IP アドレス・Cloud DNS・Cloud NAT・VPC
                                ファイアウォール・Cloud NGFW の運用
                            </p>
                        </div>
                        <div className="weight-badge wb-amber">重要 ★★★</div>
                    </div>

                    <div className="card section-block" id="s33-subnet">
                        <div className="card-title">
                            📡 サブネット・IP アドレス管理 <span className="topic-tag">3.3</span>
                        </div>
                        <div className="info">
                            <div className="info-title">📌 試験頻出の落とし穴</div>
                            VPC サブネットは<strong>拡張（広げる）のみ可能</strong>です。縮小はできません。
                            <code>--prefix-length</code> に現在より小さい値（より広い範囲）を指定します。
                        </div>
                        <div className="code-block">
                            <div className="code-header">
                                <span className="code-lang">bash</span>
                                <div className="code-dots">
                                    <span className="cd1" /><span className="cd2" /><span className="cd3" />
                                </div>
                            </div>
                            <pre className="code-content">
                                <div className="code-line"><span className="comment"># サブネットの IP 範囲を拡張（/24 → /22）</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute networks subnets expand-ip-range SUBNET_NAME \</div>
                                <div className="code-line">  <span className="flag">--region</span>=REGION \</div>
                                <div className="code-line">  <span className="flag">--prefix-length</span>=<span className="val">22</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># 静的内部 IP の予約</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute addresses create INTERNAL_IP \</div>
                                <div className="code-line">  <span className="flag">--region</span>=REGION \</div>
                                <div className="code-line">  <span className="flag">--subnet</span>=SUBNET_NAME \</div>
                                <div className="code-line">  <span className="flag">--addresses</span>=<span className="val">10.0.0.100</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># 静的外部 IP の予約（リージョナル）</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute addresses create EXTERNAL_IP \</div>
                                <div className="code-line">  <span className="flag">--region</span>=REGION</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># 静的外部 IP の予約（グローバル LB 用）</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute addresses create GLOBAL_IP <span className="flag">--global</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># 予約済み IP 一覧</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute addresses list</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># 未使用 IP の解放（課金停止）</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute addresses delete IP_NAME <span className="flag">--region</span>=REGION</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># カスタム静的ルートの追加</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute routes create ROUTE_NAME \</div>
                                <div className="code-line">  <span className="flag">--network</span>=VPC_NAME \</div>
                                <div className="code-line">  <span className="flag">--destination-range</span>=<span className="val">10.20.0.0/16</span> \</div>
                                <div className="code-line">  <span className="flag">--next-hop-vpn-tunnel</span>=VPN_TUNNEL \</div>
                                <div className="code-line">  <span className="flag">--next-hop-vpn-tunnel-region</span>=REGION \</div>
                                <div className="code-line">  <span className="flag">--priority</span>=<span className="val">1000</span></div>
                            </pre>
                        </div>
                        <div className="warn">
                            <div className="warn-title">⚠️ 静的 IP の課金</div>
                            <p>
                                予約された静的 IP は VM
                                に割り当てられていなくても<strong>課金されます</strong>。不要な予約
                                IP は速やかに解放してください。
                            </p>
                        </div>
                        <div className="src-box">
                            <div className="src-title">📎 参照リソース</div>
                            <a
                                href="https://cloud.google.com/vpc/docs/subnets"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/vpc/docs/subnets
                            </a>
                        </div>
                    </div>

                    <div className="card section-block" id="s33-dns-nat">
                        <div className="card-title">
                            🔀 Cloud DNS と Cloud NAT <span className="topic-tag">3.3</span>
                        </div>
                        <Diagram id="diag-8" label="Cloud NAT — 外部 IP なし VM のアウトバウンド接続" />
                        <div className="code-block">
                            <div className="code-header">
                                <span className="code-lang">bash</span>
                                <div className="code-dots">
                                    <span className="cd1" /><span className="cd2" /><span className="cd3" />
                                </div>
                            </div>
                            <pre className="code-content">
                                <div className="code-line"><span className="comment"># プライベート DNS ゾーンの作成（VPC 内部用）</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> dns managed-zones create PRIVATE_ZONE \</div>
                                <div className="code-line">  <span className="flag">--dns-name</span>=<span className="val">&quot;internal.example.com.&quot;</span> \</div>
                                <div className="code-line">  <span className="flag">--visibility</span>=private \</div>
                                <div className="code-line">  <span className="flag">--networks</span>=VPC_NAME</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># DNS A レコードの追加</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> dns record-sets create www.example.com. \</div>
                                <div className="code-line">  <span className="flag">--zone</span>=ZONE_NAME <span className="flag">--type</span>=A \</div>
                                <div className="code-line">  <span className="flag">--ttl</span>=<span className="val">300</span> <span className="flag">--rrdatas</span>=<span className="val">34.100.0.1</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># Cloud Router の作成（Cloud NAT の前提条件）</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute routers create ROUTER_NAME \</div>
                                <div className="code-line">  <span className="flag">--region</span>=REGION <span className="flag">--network</span>=VPC_NAME</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># Cloud NAT の作成</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute routers nats create NAT_NAME \</div>
                                <div className="code-line">  <span className="flag">--router</span>=ROUTER_NAME \</div>
                                <div className="code-line">  <span className="flag">--region</span>=REGION \</div>
                                <div className="code-line">  <span className="flag">--auto-allocate-nat-external-ips</span> \</div>
                                <div className="code-line">  <span className="flag">--nat-all-subnet-ip-ranges</span> \</div>
                                <div className="code-line">  <span className="flag">--enable-logging</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># DNS レコード一覧</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> dns record-sets list <span className="flag">--zone</span>=ZONE_NAME</div>
                            </pre>
                        </div>
                        <div className="bp">
                            <div className="bp-title">✅ ベストプラクティス — DNS / NAT</div>
                            <ul>
                                <li>
                                    本番 VM には外部 IP を割り当てず
                                    <strong>Cloud NAT + IAP</strong>
                                    の組み合わせでセキュアに管理する
                                </li>
                                <li>プライベート DNS ゾーンで VPC 内のサービス名解決を設定する</li>
                                <li>
                                    Cloud NAT
                                    のログを有効化（<code>--enable-logging</code>）して通信の監査証跡を残す
                                </li>
                                <li>
                                    Cloud NAT は Cloud Router が必須 — 先に Cloud Router を作成する
                                </li>
                            </ul>
                        </div>
                        <div className="src-box">
                            <div className="src-title">📎 参照リソース</div>
                            <a
                                href="https://cloud.google.com/nat/docs/overview"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/nat/docs/overview
                            </a>
                            <a
                                href="https://cloud.google.com/dns/docs"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/dns/docs
                            </a>
                        </div>
                    </div>

                    <div className="card section-block" id="s33-fw">
                        <div className="card-title">
                            🛡️ VPC ファイアウォールと Cloud NGFW <span className="topic-tag">3.3</span>
                        </div>
                        <div className="tbl-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">比較項目</th>
                                        <th scope="col">VPC ファイアウォールルール</th>
                                        <th scope="col">Cloud NGFW ポリシー</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>適用スコープ</strong></td>
                                        <td>プロジェクト内 VPC</td>
                                        <td>組織・フォルダ・プロジェクト</td>
                                    </tr>
                                    <tr>
                                        <td><strong>L7 フィルタリング</strong></td>
                                        <td>不可</td>
                                        <td>可能（FQDN・TLS inspection）</td>
                                    </tr>
                                    <tr>
                                        <td><strong>集中管理</strong></td>
                                        <td>個別 VPC</td>
                                        <td>階層型ポリシーで一元管理</td>
                                    </tr>
                                    <tr>
                                        <td><strong>脅威防御</strong></td>
                                        <td>なし</td>
                                        <td>侵入防御（IPS）対応</td>
                                    </tr>
                                    <tr>
                                        <td><strong>推奨場面</strong></td>
                                        <td>単一プロジェクト의 簡易制御</td>
                                        <td>複数プロジェクト・組織全体の統一管理</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="code-block">
                            <div className="code-header">
                                <span className="code-lang">bash</span>
                                <div className="code-dots">
                                    <span className="cd1" /><span className="cd2" /><span className="cd3" />
                                </div>
                            </div>
                            <pre className="code-content">
                                <div className="code-line"><span className="comment"># SSH を特定 IP からのみ許可（タグベース）</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute firewall-rules create allow-ssh-corp \</div>
                                <div className="code-line">  <span className="flag">--network</span>=VPC_NAME \</div>
                                <div className="code-line">  <span className="flag">--action</span>=ALLOW \</div>
                                <div className="code-line">  <span className="flag">--direction</span>=INGRESS \</div>
                                <div className="code-line">  <span className="flag">--rules</span>=<span className="val">tcp:22</span> \</div>
                                <div className="code-line">  <span className="flag">--source-ranges</span>=<span className="val">203.0.113.0/24</span> \</div>
                                <div className="code-line">  <span className="flag">--target-tags</span>=<span className="val">ssh-allowed</span> \</div>
                                <div className="code-line">  <span className="flag">--priority</span>=<span className="val">1000</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># Egress ルール（送信トラフィック制御）</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute firewall-rules create deny-egress \</div>
                                <div className="code-line">  <span className="flag">--network</span>=VPC_NAME \</div>
                                <div className="code-line">  <span className="flag">--action</span>=DENY \</div>
                                <div className="code-line">  <span className="flag">--direction</span>=EGRESS \</div>
                                <div className="code-line">  <span className="flag">--rules</span>=all \</div>
                                <div className="code-line">  <span className="flag">--destination-ranges</span>=<span className="val">10.99.0.0/16</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># ルールの一時無効化（削除せず）</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute firewall-rules update RULE_NAME <span className="flag">--disabled</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># ファイアウォールログの有効化</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute firewall-rules update RULE_NAME <span className="flag">--enable-logging</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># Cloud NGFW ポリシーの作成</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute network-firewall-policies create POLICY_NAME <span className="flag">--global</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># NGFW ポリシーを VPC に関連付け</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute network-firewall-policies associations create \</div>
                                <div className="code-line">  <span className="flag">--firewall-policy</span>=POLICY_NAME \</div>
                                <div className="code-line">  <span className="flag">--network</span>=VPC_NAME \</div>
                                <div className="code-line">  <span className="flag">--global-firewall-policy</span></div>
                            </pre>
                        </div>
                        <div className="bp">
                            <div className="bp-title">✅ ベストプラクティス — ファイアウォール</div>
                            <ul>
                                <li>
                                    <strong>Default deny egress</strong> は適用せず
                                    特定の宛先（<code>10.99.0.0/16</code>）のみを明示的にブロックする
                                </li>
                                <li>
                                    ターゲットタグやサービスアカウントを活用して適用対象 VM を動的に制御する
                                </li>
                                <li>
                                    不要になった一時ルールは削除する代わりに <code>--disabled</code> で無効化する
                                </li>
                                <li>
                                    複数 VPC や組織全体で統合管理する場合は <strong>Cloud NGFW 階層型ポリシー</strong> を使用する
                                </li>
                            </ul>
                        </div>
                        <div className="src-box">
                            <div className="src-title">📎 参照リソース</div>
                            <a
                                href="https://cloud.google.com/firewall/docs/firewalls"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/firewall/docs/firewalls
                            </a>
                            <a
                                href="https://cloud.google.com/firewall/docs/network-firewall-policies"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/firewall/docs/network-firewall-policies
                            </a>
                        </div>
                    </div>
                </div>

                {/* ===== 3.4 ===== */}
                <div className="section-gap">
                    <div className="sec-header sh-red">
                        <div className="sec-icon si-red">📈</div>
                        <div className="sec-header-body">
                            <h2>3.4 モニタリングとロギングの運用</h2>
                            <p>
                                アラートポリシー・監査ログ・ログ転送（シンク）・Managed Prometheus・各種診断ツール
                            </p>
                        </div>
                        <div className="weight-badge wb-red">最重要 ★★★★</div>
                    </div>

                    <div className="card section-block" id="s34-alert">
                        <div className="card-title">
                            🔔 Cloud Monitoring アラートポリシー <span className="topic-tag">3.4</span>
                        </div>
                        <Diagram id="diag-9" label="アラートポリシーの処理フロー" />
                        <div className="code-block">
                            <div className="code-header">
                                <span className="code-lang">yaml — アラートポリシー</span>
                                <div className="code-dots">
                                    <span className="cd1" /><span className="cd2" /><span className="cd3" />
                                </div>
                            </div>
                            <pre className="code-content">
                                <div className="code-line"><span className="key">displayName</span>: <span className="val">&quot;High CPU Usage Alert&quot;</span></div>
                                <div className="code-line"><span className="key">conditions</span>:</div>
                                <div className="code-line">  - <span className="key">displayName</span>: <span className="val">&quot;CPU utilization &gt; 80% for 5min&quot;</span></div>
                                <div className="code-line">    <span className="key">conditionThreshold</span>:</div>
                                <div className="code-line">      <span className="key">filter</span>: &gt;</div>
                                <div className="code-line">        resource.type = <span className="val">&quot;gce_instance&quot;</span> AND</div>
                                <div className="code-line">        metric.type = <span className="val">&quot;compute.googleapis.com/instance/cpu/utilization&quot;</span></div>
                                <div className="code-line">      <span className="key">comparison</span>: COMPARISON_GT</div>
                                <div className="code-line">      <span className="key">thresholdValue</span>: <span className="val">0.8</span></div>
                                <div className="code-line">      <span className="key">duration</span>: <span className="val">&quot;300s&quot;</span></div>
                                <div className="code-line">      <span className="key">aggregations</span>:</div>
                                <div className="code-line">        - <span className="key">alignmentPeriod</span>: <span className="val">&quot;60s&quot;</span></div>
                                <div className="code-line">          <span className="key">perSeriesAligner</span>: ALIGN_MEAN</div>
                                <div className="code-line"><span className="key">combiner</span>: OR</div>
                                <div className="code-line"><span className="key">notificationChannels</span>:</div>
                                <div className="code-line">  - <span className="val">projects/PROJECT_ID/notificationChannels/CHANNEL_ID</span></div>
                                <div className="code-line"><span className="key">documentation</span>:</div>
                                <div className="code-line">  <span className="key">content</span>: <span className="val">&quot;CPU 使用率が 80% を超えました。\\nRunbook: https://wiki.example.com/runbooks/cpu&quot;</span></div>
                                <div className="code-line">  <span className="key">mimeType</span>: <span className="val">&quot;text/markdown&quot;</span></div>
                            </pre>
                        </div>
                        <div className="bp">
                            <div className="bp-title">✅ ベストプラクティス — アラート設計</div>
                            <ul>
                                <li>
                                    <strong>症状ベースのアラート</strong>（エラー率・レイテンシ・可用性）を優先しノイズを削減する
                                </li>
                                <li>SLO ベースの<strong>バーンレートアラート</strong>を設定する</li>
                                <li>
                                    アラートには必ず <strong>Playbook / Runbook の URL</strong> を
                                    documentation フィールドに含める
                                </li>
                            </ul>
                        </div>
                        <div className="src-box">
                            <div className="src-title">📎 参照リソース</div>
                            <a
                                href="https://cloud.google.com/monitoring/alerts"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/monitoring/alerts
                            </a>
                        </div>
                    </div>

                    <div className="card section-block" id="s34-logs">
                        <div className="card-title">
                            📋 ログ管理・監査ログ・エクスポート <span className="topic-tag">3.4</span>
                        </div>
                        <div className="tbl-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ログ種別</th>
                                        <th scope="col">記録内容</th>
                                        <th scope="col">デフォルト</th>
                                        <th scope="col">無効化</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Admin Activity</strong></td>
                                        <td>リソース設定変更（VM 作成・IAM 変更）</td>
                                        <td>常に有効</td>
                                        <td>❌ 不可</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Data Access</strong></td>
                                        <td>データの読み取り・書き込み</td>
                                        <td>無効</td>
                                        <td>✅ 可能</td>
                                    </tr>
                                    <tr>
                                        <td><strong>System Event</strong></td>
                                        <td>Google システムの自動操作</td>
                                        <td>常に有効</td>
                                        <td>❌ 不可</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Policy Denied</strong></td>
                                        <td>VPC Service Controls によるブロック</td>
                                        <td>有効</td>
                                        <td>✅ 可能</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Diagram id="diag-10" label="ログルーター — ログ転送アーキテクチャ" />
                        <div className="code-block">
                            <div className="code-header">
                                <span className="code-lang">bash</span>
                                <div className="code-dots">
                                    <span className="cd1" /><span className="cd2" /><span className="cd3" />
                                </div>
                            </div>
                            <pre className="code-content">
                                <div className="code-line"><span className="comment"># VPC Flow Logs の有効化（サブネット単位）</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute networks subnets update SUBNET_NAME \</div>
                                <div className="code-line">  <span className="flag">--region</span>=REGION \</div>
                                <div className="code-line">  <span className="flag">--enable-flow-logs</span> \</div>
                                <div className="code-line">  <span className="flag">--logging-flow-sampling</span>=<span className="val">0.5</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># ファイアウォールログの有効化（ルール単位）</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> compute firewall-rules update RULE_NAME <span className="flag">--enable-logging</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># BigQuery へのログシンク作成</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> logging sinks create bq-audit-sink \</div>
                                <div className="code-line">  bigquery.googleapis.com/projects/PROJECT/datasets/DATASET \</div>
                                <div className="code-line">  <span className="flag">--log-filter</span>=<span className="val">&apos;logName=&quot;projects/PROJECT/logs/cloudaudit.googleapis.com%2Factivity&quot;&apos;</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># シンク SA に BigQuery 権限付与（必須！）</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> projects add-iam-policy-binding PROJECT_ID \</div>
                                <div className="code-line">  <span className="flag">--member</span>=<span className="val">&quot;serviceAccount:SINK_SA@gcp-sa-logging.iam.gserviceaccount.com&quot;</span> \</div>
                                <div className="code-line">  <span className="flag">--role</span>=<span className="val">&quot;roles/bigquery.dataEditor&quot;</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># ログバケットの作成（1 年保持）</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> logging buckets create BUCKET_NAME \</div>
                                <div className="code-line">  <span className="flag">--location</span>=REGION \</div>
                                <div className="code-line">  <span className="flag">--retention-days</span>=<span className="val">365</span></div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># ログフィルタリング確認</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> logging read <span className="val">&apos;severity=&quot;ERROR&quot; AND resource.type=&quot;gce_instance&quot;&apos;</span> \</div>
                                <div className="code-line">  <span className="flag">--limit</span>=<span className="val">50</span> <span className="flag">--freshness</span>=<span className="val">1h</span></div>
                            </pre>
                        </div>
                        <div className="tbl-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">フィルタ</th>
                                        <th scope="col">説明</th>
                                        <th scope="col">例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>severity</code></td>
                                        <td>ログの重大度</td>
                                        <td><code>severity=&quot;ERROR&quot;</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>resource.type</code></td>
                                        <td>リソースタイプ</td>
                                        <td><code>resource.type=&quot;gce_instance&quot;</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>logName</code></td>
                                        <td>ログ名</td>
                                        <td><code>logName=~&quot;cloudaudit&quot;</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>timestamp</code></td>
                                        <td>時刻範囲</td>
                                        <td><code>timestamp&gt;=&quot;2025-01-01T00:00:00Z&quot;</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>textPayload</code></td>
                                        <td>テキスト検索</td>
                                        <td><code>textPayload:&quot;OutOfMemory&quot;</code></td>
                                    </tr>
                                    <tr>
                                        <td><code>jsonPayload.key</code></td>
                                        <td>JSON フィールド</td>
                                        <td><code>jsonPayload.httpRequest.status=500</code></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="bp">
                            <div className="bp-title">✅ ベストプラクティス — ログ管理</div>
                            <ul>
                                <li>
                                    <strong>Admin Activity ログは常に有効</strong>で無効化不可 —
                                    Data Access ログは機密データ向けのみ有効化してコスト制御する
                                </li>
                                <li>
                                    ログシンク作成後は必ずシンクの SA
                                    に<strong>宛先への権限付与</strong>を行う（よくある設定ミス）
                                </li>
                                <li>
                                    BigQuery にエクスポートして
                                    <strong>Log Analytics</strong>
                                    で長期的な分析・コンプライアンスレポートに活用する
                                </li>
                                <li>
                                    VPC Flow Logs
                                    はサンプリング率（<code>--logging-flow-sampling</code>）でコストを最適化する
                                </li>
                            </ul>
                        </div>
                        <div className="src-box">
                            <div className="src-title">📎 参照リソース</div>
                            <a
                                href="https://cloud.google.com/logging/docs/export/configure_export_v2"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/logging/docs/export/configure_export_v2
                            </a>
                            <a
                                href="https://cloud.google.com/logging/docs/audit"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/logging/docs/audit
                            </a>
                            <a
                                href="https://cloud.google.com/vpc/docs/flow-logs"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/vpc/docs/flow-logs
                            </a>
                        </div>
                    </div>

                    <div className="card section-block" id="s34-diag">
                        <div className="card-title">
                            🔬 診断ツール群（Trace / Profiler / Query Insights）
                            <span className="topic-tag">3.4</span>
                        </div>
                        <div className="tbl-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ツール</th>
                                        <th scope="col">主な用途</th>
                                        <th scope="col">試験で問われるシナリオ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Cloud Trace</strong></td>
                                        <td>分散アプリのレイテンシ分析・ボトルネック特定</td>
                                        <td>「API の応答が遅い原因を調査するには？」</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Cloud Profiler</strong></td>
                                        <td>本番 CPU・メモリのホットスポット特定</td>
                                        <td>「本番でメモリ使用量が高騰している原因は？」</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Query Insights</strong></td>
                                        <td>Cloud SQL / AlloyDB スロークエリ分析</td>
                                        <td>「Cloud SQL のクエリが遅い原因は？」</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Index Advisor</strong></td>
                                        <td>追加すべきインデックスの自動提案</td>
                                        <td>「DB パフォーマンスを改善するインデックスは？」</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Service Health Dashboard</strong></td>
                                        <td>Google Cloud のインシデントと自プロジェクトへの影響</td>
                                        <td>
                                            「GCP 障害が自分のサービスに影響しているか確認するには？」
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="src-box">
                            <div className="src-title">📎 参照リソース</div>
                            <a
                                href="https://cloud.google.com/trace/docs"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/trace/docs
                            </a>
                            <a
                                href="https://cloud.google.com/profiler/docs"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/profiler/docs
                            </a>
                            <a
                                href="https://cloud.google.com/sql/docs/mysql/insights-overview"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/sql/docs/mysql/insights-overview
                            </a>
                        </div>
                    </div>

                    <div className="card section-block" id="s34-ops">
                        <div className="card-title">
                            🤖 Ops Agent と Managed Prometheus <span className="topic-tag">3.4</span>
                        </div>
                        <div className="code-block">
                            <div className="code-header">
                                <span className="code-lang">bash — Ops Agent インストール</span>
                                <div className="code-dots">
                                    <span className="cd1" /><span className="cd2" /><span className="cd3" />
                                </div>
                            </div>
                            <pre className="code-content">
                                <div className="code-line"><span className="comment"># Ops Agent のインストール（Debian/Ubuntu）</span></div>
                                <div className="code-line">curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh</div>
                                <div className="code-line">sudo bash add-google-cloud-ops-agent-repo.sh --also-install</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># ステータス確認</span></div>
                                <div className="code-line">sudo systemctl status google-cloud-ops-agent</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment"># GKE で Managed Prometheus を有効化</span></div>
                                <div className="code-line"><span className="cmd">gcloud</span> container clusters update CLUSTER_NAME \</div>
                                <div className="code-line">  <span className="flag">--zone</span>=ZONE \</div>
                                <div className="code-line">  <span className="flag">--enable-managed-prometheus</span></div>
                            </pre>
                        </div>
                        <div className="code-block">
                            <div className="code-header">
                                <span className="code-lang">
                                    yaml — Ops Agent カスタムログ / Managed Prometheus PodMonitoring
                                </span>
                                <div className="code-dots">
                                    <span className="cd1" /><span className="cd2" /><span className="cd3" />
                                </div>
                            </div>
                            <pre className="code-content">
                                <div className="code-line"><span className="comment"># /etc/google-cloud-ops-agent/config.yaml</span></div>
                                <div className="code-line"><span className="key">logging</span>:</div>
                                <div className="code-line">  <span className="key">receivers</span>:</div>
                                <div className="code-line">    <span className="key">app_logs</span>:</div>
                                <div className="code-line">      <span className="key">type</span>: files</div>
                                <div className="code-line">      <span className="key">include_paths</span>: [<span className="val">/var/log/myapp/*.log</span>]</div>
                                <div className="code-line">  <span className="key">exporters</span>:</div>
                                <div className="code-line">    <span className="key">google</span>: {`{`} <span className="key">type</span>: google_cloud_logging {`}`}</div>
                                <div className="code-line">  <span className="key">service</span>:</div>
                                <div className="code-line">    <span className="key">pipelines</span>:</div>
                                <div className="code-line">      <span className="key">app_pipeline</span>:</div>
                                <div className="code-line">        <span className="key">receivers</span>: [app_logs]</div>
                                <div className="code-line">        <span className="key">exporters</span>: [google]</div>
                                <div className="code-line">&nbsp;</div>
                                <div className="code-line"><span className="comment">---</span></div>
                                <div className="code-line"><span className="comment"># Managed Prometheus PodMonitoring</span></div>
                                <div className="code-line"><span className="key">apiVersion</span>: monitoring.googleapis.com/v1</div>
                                <div className="code-line"><span className="key">kind</span>: PodMonitoring</div>
                                <div className="code-line"><span className="key">metadata</span>:</div>
                                <div className="code-line">  <span className="key">name</span>: my-app-monitoring</div>
                                <div className="code-line"><span className="key">spec</span>:</div>
                                <div className="code-line">  <span className="key">selector</span>:</div>
                                <div className="code-line">    <span className="key">matchLabels</span>: {`{`} <span className="key">app</span>: my-app {`}`}</div>
                                <div className="code-line">  <span className="key">endpoints</span>:</div>
                                <div className="code-line">  - <span className="key">port</span>: metrics</div>
                                <div className="code-line">    <span className="key">interval</span>: <span className="val">30s</span></div>
                                <div className="code-line">    <span className="key">path</span>: <span className="val">/metrics</span></div>
                            </pre>
                        </div>
                        <div className="bp">
                            <div className="bp-title">
                                ✅ ベストプラクティス — Ops Agent / Prometheus
                            </div>
                            <ul>
                                <li>
                                    全 Compute Engine VM に
                                    <strong>Ops Agent</strong>
                                    をデプロイしてシステムメトリクスとアプリログを収集する
                                </li>
                                <li>
                                    GKE には
                                    <strong>Managed Prometheus</strong>
                                    を有効化してアプリメトリクスを標準化する
                                </li>
                                <li>
                                    Ops Agent の設定変更後は
                                    <code>sudo systemctl restart google-cloud-ops-agent</code>
                                    で反映する
                                </li>
                            </ul>
                        </div>
                        <div className="src-box">
                            <div className="src-title">📎 参照リソース</div>
                            <a
                                href="https://cloud.google.com/stackdriver/docs/solutions/agents/ops-agent"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/stackdriver/docs/solutions/agents/ops-agent
                            </a>
                            <a
                                href="https://cloud.google.com/managed-prometheus"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/managed-prometheus
                            </a>
                        </div>
                    </div>

                    <div className="card section-block" id="s34-ai">
                        <div className="card-title">
                            ✨ AI 支援ツール群（Gemini / Active Assist / Cloud Hub）
                            <span className="topic-tag">3.4</span>
                        </div>
                        <div className="fgrid">
                            <div className="fitem">
                                <div className="fitem-t">Gemini Cloud Assist for Monitoring</div>
                                <div className="fitem-d">
                                    メトリクスの異常分析・アラートの根本原因特定・対処方法を AI
                                    が自然言語で提案。Cloud Console から「Ask Gemini」ボタンで即時利用可能。
                                </div>
                            </div>
                            <div className="fitem">
                                <div className="fitem-t">Active Assist（Recommender）</div>
                                <div className="fitem-d">
                                    AI ベースのリソース最適化推奨エンジン。VM
                                    Right-sizing・未使用リソース削除・IAM 権限最小化・FW
                                    ルール最適化を自動提案。
                                </div>
                            </div>
                            <div className="fitem">
                                <div className="fitem-t">Cloud Hub</div>
                                <div className="fitem-d">
                                    アクティブなインシデントとアプリケーション健全性を一元表示。Personalized
                                    Service Health で自分のリソースへの影響を優先表示。
                                </div>
                            </div>
                        </div>
                        <div className="tbl-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Active Assist 推奨種別</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>VM Right-sizing</strong></td>
                                        <td>過剰スペックの VM のダウンサイズ提案</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Idle Resource</strong></td>
                                        <td>未使用リソース（停止中 VM・未割当 IP）の削除提案</td>
                                    </tr>
                                    <tr>
                                        <td><strong>IAM Recommender</strong></td>
                                        <td>過剰な権限の最小化提案</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Firewall Insights</strong></td>
                                        <td>未使用 FW ルールの削除提案</td>
                                    </tr>
                                    <tr>
                                        <td><strong>BigQuery Recommender</strong></td>
                                        <td>未使用テーブル・高コストクエリの最適化提案</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="bp">
                            <div className="bp-title">✅ ベストプラクティス — AI 支援ツール</div>
                            <ul>
                                <li>
                                    <strong>Active Assist の推奨</strong>を月次で確認してリソースの無駄を継続的に排除する
                                </li>
                                <li>
                                    Gemini Cloud Assist
                                    はアラート調査・ログ分析・クエリ最適化に積極的に活用する
                                </li>
                                <li>
                                    Cloud Hub
                                    を<strong>インシデント対応のファーストビュー</strong>として設定する
                                </li>
                            </ul>
                        </div>
                        <div className="src-box">
                            <div className="src-title">📎 参照リソース</div>
                            <a
                                href="https://cloud.google.com/recommender/docs"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/recommender/docs
                            </a>
                            <a
                                href="https://cloud.google.com/cloud-hub"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                https://cloud.google.com/cloud-hub
                            </a>
                        </div>
                    </div>
                </div>

                {/* CHECKLIST */}
                <div className="section-gap section-block" id="checklist">
                    <hr className="divider" />
                    <div
                        className="sec-header"
                        style={{
                            borderColor: 'rgba(139, 92, 246, 0.3)',
                            background: 'linear-gradient(135deg, var(--surface), rgba(139, 92, 246, 0.05))',
                        }}
                    >
                        <div
                            className="sec-icon"
                            style={{
                                background: 'rgba(139, 92, 246, 0.12)',
                                border: '1px solid rgba(139, 92, 246, 0.3)',
                            }}
                        >
                            ✅
                        </div>
                        <div className="sec-header-body">
                            <h2>試験直前チェックリスト</h2>
                            <p>
                                Section 3
                                の頻出ポイントを最終確認。チェックを入れながら弱点を把握してください。
                            </p>
                        </div>
                    </div>
                    <div className="checklist">
                        <CheckItem
                            title="IAP トンネル SSH"
                            desc="外部 IP なし VM への接続 — roles/iap.tunnelResourceAccessor が必要"
                        />
                        <CheckItem
                            title="OS Login"
                            desc="SSH 鍵を IAM で一元管理 — roles/compute.osLogin を付与"
                        />
                        <CheckItem
                            title="Snapshot Schedule Policy"
                            desc="定期自動スナップショット — ディスクへのポリシー適用が必要"
                        />
                        <CheckItem
                            title="Image Family"
                            desc="--family で管理・describe-from-family で常に最新版を参照"
                        />
                        <CheckItem
                            title="StatefulSet"
                            desc="DB を GKE で動かす最適なリソース — 固有 PV・順番付き起動"
                        />
                        <CheckItem
                            title="HPA vs VPA"
                            desc="HPA=Pod 数増減、VPA=CPU/Memory 増減（Pod 再起動あり）"
                        />
                        <CheckItem
                            title="Cloud Run --no-traffic"
                            desc="カナリアデプロイ — デプロイ後に段階的にトラフィックを切り替え"
                        />
                        <CheckItem
                            title="GPU: --maintenance-policy=TERMINATE"
                            desc="GPU VM 必須設定 — ライブマイグレーション非対応"
                        />
                        <CheckItem
                            title="Uniform Bucket-Level Access"
                            desc="Cloud Storage の推奨アクセス制御 — オブジェクト ACL を廃止"
                        />
                        <CheckItem
                            title="ライフサイクル age 条件"
                            desc="オブジェクト作成日からの日数（最終アクセス日ではない）"
                        />
                        <CheckItem
                            title="BigQuery --dry_run"
                            desc="クエリ実行前にコスト試算 — $5/TB"
                        />
                        <CheckItem
                            title="Cloud SQL PITR"
                            desc="最大 7 日間の任意時点に復元 — --backup-time オプション"
                        />
                        <CheckItem
                            title="CMEK の注意"
                            desc="KMS キーを失うとデータも失う — 復旧手順の事前整備が必須"
                        />
                        <CheckItem
                            title="サブネット拡張（縮小不可）"
                            desc="--prefix-length に現在より小さい値を指定 — 縮小は不可"
                        />
                        <CheckItem
                            title="静的 IP の課金"
                            desc="未割当の静的 IP は課金される — 不要なら速やかに解放"
                        />
                        <CheckItem
                            title="Cloud NAT に Cloud Router が必要"
                            desc="先に Cloud Router を作成してから Cloud NAT を追加する"
                        />
                        <CheckItem
                            title="Admin Activity ログは無効化不可"
                            desc="常に有効 — Data Access ログはデフォルト無効"
                        />
                        <CheckItem
                            title="ログシンクの SA 権限付与"
                            desc="シンク作成後に宛先への権限付与が必要（よくある設定ミス）"
                        />
                        <CheckItem
                            title="Cloud Trace vs Cloud Profiler"
                            desc="Trace=レイテンシ分析、Profiler=CPU/Memory ホットスポット特定"
                        />
                        <CheckItem
                            title="Active Assist"
                            desc="AI によるリソース最適化推奨 — 月次で確認してコスト削減"
                        />
                    </div>
                </div>

                {/* REFS */}
                <div className="section-gap section-block" id="refs">
                    <hr className="divider" />
                    <div className="card" style={{ borderColor: 'rgba(0, 200, 255, 0.3)' }}>
                        <div className="card-title">📎 公式参照リソース一覧</div>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                                gap: '12px',
                                marginTop: '8px',
                            }}
                        >
                            <div className="src-box" style={{ margin: 0 }}>
                                <div className="src-title">試験情報</div>
                                <a
                                    href="https://cloud.google.com/learn/certification/cloud-engineer"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    試験概要ページ
                                </a>
                                <a
                                    href="https://services.google.com/fh/files/misc/063026_associate_cloud_engineer_exam_guide_english.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    試験ガイド PDF（063026）
                                </a>
                            </div>
                            <div className="src-box" style={{ margin: 0 }}>
                                <div className="src-title">Compute Engine</div>
                                <a
                                    href="https://cloud.google.com/compute/docs/connect/ssh-using-iap"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    IAP 経由 SSH
                                </a>
                                <a
                                    href="https://cloud.google.com/compute/docs/oslogin"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    OS Login
                                </a>
                                <a
                                    href="https://cloud.google.com/compute/docs/disks/create-snapshots"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    スナップショット
                                </a>
                                <a
                                    href="https://cloud.google.com/compute/docs/images/create-custom"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    カスタムイメージ
                                </a>
                                <a
                                    href="https://cloud.google.com/compute/docs/gpus"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    GPU アタッチメント
                                </a>
                            </div>
                            <div className="src-box" style={{ margin: 0 }}>
                                <div className="src-title">GKE</div>
                                <a
                                    href="https://cloud.google.com/kubernetes-engine/docs/concepts/node-pools"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    ノードプール管理
                                </a>
                                <a
                                    href="https://cloud.google.com/kubernetes-engine/docs/concepts/horizontalpodautoscaler"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    HPA
                                </a>
                                <a
                                    href="https://cloud.google.com/kubernetes-engine/docs/concepts/verticalpodautoscaler"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    VPA
                                </a>
                                <a
                                    href="https://cloud.google.com/artifact-registry/docs/integrate-gke"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Artifact Registry 統合
                                </a>
                                <a
                                    href="https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Workload Identity
                                </a>
                            </div>
                            <div className="src-box" style={{ margin: 0 }}>
                                <div className="src-title">Cloud Run</div>
                                <a
                                    href="https://cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    トラフィック分割・ロールバック
                                </a>
                                <a
                                    href="https://cloud.google.com/run/docs/configuring/autoscaling"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    オートスケーリング設定
                                </a>
                            </div>
                            <div className="src-box" style={{ margin: 0 }}>
                                <div className="src-title">ストレージ・データベース</div>
                                <a
                                    href="https://cloud.google.com/storage/docs/uniform-bucket-level-access"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Uniform Bucket-Level Access
                                </a>
                                <a
                                    href="https://cloud.google.com/storage/docs/lifecycle"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    GCS ライフサイクル管理
                                </a>
                                <a
                                    href="https://cloud.google.com/sql/docs/mysql/connect-auth-proxy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Cloud SQL Auth Proxy
                                </a>
                                <a
                                    href="https://cloud.google.com/bigquery/docs/best-practices-performance-compute"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    BigQuery クエリ最適化
                                </a>
                                <a
                                    href="https://cloud.google.com/kms/docs/cmek"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    CMEK
                                </a>
                                <a
                                    href="https://cloud.google.com/database-center"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Database Center
                                </a>
                            </div>
                            <div className="src-box" style={{ margin: 0 }}>
                                <div className="src-title">ネットワーク</div>
                                <a
                                    href="https://cloud.google.com/nat/docs/overview"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Cloud NAT
                                </a>
                                <a
                                    href="https://cloud.google.com/dns/docs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Cloud DNS
                                </a>
                                <a
                                    href="https://cloud.google.com/firewall/docs/firewalls"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    VPC ファイアウォール
                                </a>
                                <a
                                    href="https://cloud.google.com/firewall/docs/network-firewall-policies"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Cloud NGFW ポリシー
                                </a>
                            </div>
                            <div className="src-box" style={{ margin: 0 }}>
                                <div className="src-title">モニタリング・ロギング</div>
                                <a
                                    href="https://cloud.google.com/monitoring/alerts"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Cloud Monitoring アラート
                                </a>
                                <a
                                    href="https://cloud.google.com/logging/docs/export/configure_export_v2"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    ログエクスポート
                                </a>
                                <a
                                    href="https://cloud.google.com/logging/docs/audit"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    監査ログ
                                </a>
                                <a
                                    href="https://cloud.google.com/vpc/docs/flow-logs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    VPC Flow Logs
                                </a>
                                <a
                                    href="https://cloud.google.com/trace/docs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Cloud Trace
                                </a>
                                <a
                                    href="https://cloud.google.com/profiler/docs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Cloud Profiler
                                </a>
                                <a
                                    href="https://cloud.google.com/stackdriver/docs/solutions/agents/ops-agent"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Ops Agent
                                </a>
                                <a
                                    href="https://cloud.google.com/managed-prometheus"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Managed Prometheus
                                </a>
                                <a
                                    href="https://cloud.google.com/recommender/docs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Active Assist
                                </a>
                                <a
                                    href="https://cloud.google.com/cloud-hub"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Cloud Hub
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        textAlign: 'center',
                        padding: '48px 0 32px',
                        color: 'var(--muted)',
                        fontSize: '13px',
                        borderTop: '1px solid var(--border)',
                        marginTop: '64px',
                    }}
                >
                    <p>Google Cloud Associate Cloud Engineer — Section 3 完全攻略ガイド</p>
                    <p style={{ marginTop: '6px' }}>
                        試験ガイド 063026（2026年6月30日施行版）準拠 ｜ 作成日: 2026年6月
                    </p>
                    <p style={{ marginTop: '6px', fontSize: '11px', opacity: 0.5 }}>
                        ※ 本ガイドは学習目的で作成されています。最新情報は必ず公式サイトでご確認ください。
                    </p>
                </div>
            </main>
        </div>
    );
}
