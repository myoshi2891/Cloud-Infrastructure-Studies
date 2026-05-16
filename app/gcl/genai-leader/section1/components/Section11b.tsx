/**
 * Renders a documentation section that explains the three primary machine learning approaches
 * (supervised, unsupervised, reinforcement) with example use cases and exam-focused cautions.
 *
 * @returns A React element for a <section> containing cards for each approach and a warning list highlighting common exam traps.
 */
export default function Section11b() {
    return (
        <section id="s11b">
            <div className="card">
                <div className="card-h">🎓 機械学習の3つのアプローチ — 完全解説</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    試験では「このビジネス課題には教師あり・教師なし・強化学習のどれが適切か」という実践的な問いが出る。
                    各アプローチの<strong style={{ color: 'var(--aurora3)' }}>データ形式・学習方法・代表的ユースケース</strong>を正確に区別する。
                </p>

                <div className="approach-grid">
                    <div className="appr-card appr-1">
                        <div className="appr-icon">🎯</div>
                        <div className="appr-name">教師あり学習</div>
                        <div className="appr-sub">Supervised Learning</div>
                        <div className="appr-body">
                            <strong style={{ color: 'var(--bright)' }}>正解ラベル付き</strong>のデータ（入力→正解ペア）でモデルを訓練する手法。
                            最も広く使われるアプローチ。
                        </div>
                        <div className="appr-tags">
                            <span className="at">画像分類</span>
                            <span className="at">スパム検出</span>
                            <span className="at">チャーン予測</span>
                            <span className="at">SFT・RLHF</span>
                        </div>
                    </div>
                    <div className="appr-card appr-2">
                        <div className="appr-icon">🔍</div>
                        <div className="appr-name">教師なし学習</div>
                        <div className="appr-sub">Unsupervised Learning</div>
                        <div className="appr-body">
                            <strong style={{ color: 'var(--bright)' }}>ラベルなし</strong>のデータから自律的にパターン・構造・グループを発見する手法。
                        </div>
                        <div className="appr-tags">
                            <span className="at">クラスタリング</span>
                            <span className="at">異常検知</span>
                            <span className="at">次元削減</span>
                            <span className="at">LLM事前学習</span>
                        </div>
                    </div>
                    <div className="appr-card appr-3">
                        <div className="appr-icon">🏆</div>
                        <div className="appr-name">強化学習</div>
                        <div className="appr-sub">Reinforcement Learning</div>
                        <div className="appr-body">
                            エージェントが<strong style={{ color: 'var(--bright)' }}>試行錯誤</strong>しながら報酬を最大化するよう学習する手法。
                        </div>
                        <div className="appr-tags">
                            <span className="at">ゲームAI</span>
                            <span className="at">自動運転</span>
                            <span className="at">ロボット制御</span>
                            <span className="at">RLHF</span>
                        </div>
                    </div>
                </div>

                <div className="warn">
                    <div className="warnt">試験頻出の引っかけ</div>
                    <ul>
                        <li>LLM の事前学習は「教師なし学習」— 次のトークン予測は自己教師あり学習とも呼ばれるが試験では教師なし学習に分類</li>
                        <li>RLHF（人間フィードバックによる強化学習）は「強化学習」— Gen AI 改善でよく使われる</li>
                        <li>ファインチューニング（SFT）は「教師あり学習」— ラベル付きデータが必要</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
