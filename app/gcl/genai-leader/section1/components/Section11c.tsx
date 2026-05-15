import { ReferencesBlock } from './ReferencesBlock';

/* ── Sub-section 1.1c: ML ライフサイクル ── */
export default function Section11c() {
    return (
        <section id="s11c">
            <div className="card">
                <div className="card-h">🔄 ML ライフサイクル 5 ステージと Google Cloud ツール対応表</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    試験では「このステージを担当する Google Cloud ツールは？」の問題が頻出。
                    各ステージの目的と対応ツールを正確にマッピングして覚える。
                </p>

                <div className="lifecycle">
                    <div className="lc-step">
                        <div className="lc-num" style={{ color: 'var(--aurora1)' }}>1</div>
                        <div className="lc-title">データ収集・準備</div>
                        <p style={{ fontSize: '12px', color: 'var(--text)', lineHeight: 1.7 }}>
                            学習に必要なデータを収集し、クリーニング・ラベリング・前処理を行う
                        </p>
                        <div className="lc-tools">
                            <span className="lct">BigQuery</span>
                            <span className="lct">Cloud Storage</span>
                            <span className="lct">Dataflow</span>
                        </div>
                    </div>
                    <div className="lc-step">
                        <div className="lc-num" style={{ color: 'var(--aurora2)' }}>2</div>
                        <div className="lc-title">モデル開発・実験</div>
                        <p style={{ fontSize: '12px', color: 'var(--text)', lineHeight: 1.7 }}>
                            アーキテクチャ選択・ハイパーパラメータ探索・実験管理
                        </p>
                        <div className="lc-tools">
                            <span className="lct">Vertex AI Workbench</span>
                            <span className="lct">Colab Enterprise</span>
                        </div>
                    </div>
                    <div className="lc-step">
                        <div className="lc-num" style={{ color: 'var(--aurora3)' }}>3</div>
                        <div className="lc-title">学習・評価</div>
                        <p style={{ fontSize: '12px', color: 'var(--text)', lineHeight: 1.7 }}>
                            スケーラブルな学習インフラでモデルを訓練し、メトリクスで評価
                        </p>
                        <div className="lc-tools">
                            <span className="lct">Vertex AI Training</span>
                            <span className="lct">Model Evaluation</span>
                        </div>
                    </div>
                    <div className="lc-step">
                        <div className="lc-num" style={{ color: 'var(--aurora4)' }}>4</div>
                        <div className="lc-title">デプロイ・提供</div>
                        <p style={{ fontSize: '12px', color: 'var(--text)', lineHeight: 1.7 }}>
                            本番環境にモデルをデプロイし、推論エンドポイントを提供
                        </p>
                        <div className="lc-tools">
                            <span className="lct">Vertex AI Endpoints</span>
                            <span className="lct">Model Registry</span>
                        </div>
                    </div>
                    <div className="lc-step">
                        <div className="lc-num" style={{ color: 'var(--aurora5)' }}>5</div>
                        <div className="lc-title">監視・改善</div>
                        <p style={{ fontSize: '12px', color: 'var(--text)', lineHeight: 1.7 }}>
                            本番モデルのドリフト検知・再学習トリガー・継続的改善
                        </p>
                        <div className="lc-tools">
                            <span className="lct">Vertex AI Monitoring</span>
                            <span className="lct">Cloud Monitoring</span>
                        </div>
                    </div>
                </div>

                <div className="bp">
                    <div className="bpt">Vertex AI Pipelines の役割</div>
                    <ul>
                        <li>MLOps の自動化 — ステージ1〜5全体をパイプラインとして管理・自動化するサービス</li>
                        <li>再現性確保 — 実験の各ステップを記録し、同じ結果を再現可能にする</li>
                        <li>CI/CD for ML — モデルの継続的インテグレーション・デプロイを実現</li>
                    </ul>
                </div>
                <ReferencesBlock
                    title="📎 参照リソース"
                    items={[
                        { href: 'https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models' },
                        { href: 'https://cloud.google.com/vertex-ai' },
                        { href: 'https://arxiv.org/abs/1706.03762', label: 'Attention is All You Need 原論文' },
                    ]}
                />
            </div>
        </section>
    );
}
