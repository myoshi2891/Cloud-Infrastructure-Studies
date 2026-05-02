import React from 'react';
import baseStyles from './SectionBase.module.css';
import styles from './Section3.module.css';

/**
 * Section3_Apis: 事前学習済み API の概要とビジネス活用例を解説するコンポーネント
 * @returns JSX.Element
 */
export const Section3_Apis: React.FC = () => {
    return (
        <div id="apis" style={{ paddingTop: 0 }}>
            <div className={baseStyles.container}>
                <div className={baseStyles.sectionHeader} style={{ marginTop: '2rem' }}>
                    <div className={baseStyles.sectionTag}>PRE-TRAINED APIs</div>
                    <h2 className={baseStyles.sectionTitle}>
                        事前学習済み API<span className={baseStyles.examTag}>頻出</span>
                    </h2>
                    <p className={baseStyles.sectionDesc}>
                        Google が膨大なデータで事前に学習済みのモデルを API として提供。 ML
                        知識不要で即座に高度な AI 機能を利用できます。
                    </p>
                </div>

                <div className={styles.apiGrid}>
                    {/* Vision API */}
                    <div className={styles.apiRow}>
                        <div className={styles.apiEmoji}>👁️</div>
                        <div>
                            <div className={styles.apiName}>Cloud Vision API</div>
                            <div className={styles.apiEn}>Cloud Vision API</div>
                            <div className={styles.apiSummary}>
                                画像から情報を自動抽出する画像認識
                                API。OCR・物体検出・コンテンツモデレーションに対応。
                            </div>
                        </div>
                        <div>
                            <div className={styles.apiColTitle}>主な機能</div>
                            <ul className={styles.apiList}>
                                <li>ラベル検出（物体の自動タグ付け）</li>
                                <li>OCR（画像内のテキスト抽出）</li>
                                <li>顔検出（感情・属性分析）</li>
                                <li>物体検出と位置特定</li>
                                <li>不適切コンテンツの自動検出</li>
                            </ul>
                        </div>
                        <div>
                            <div className={styles.apiColTitle}>ビジネス活用例</div>
                            <ul className={styles.apiList}>
                                <li>EC 商品画像の自動タグ付け</li>
                                <li>製造ラインの外観検査自動化</li>
                                <li>書類・伝票のデジタル化（OCR）</li>
                                <li>SNS の不適切コンテンツ自動削除</li>
                            </ul>
                        </div>
                    </div>

                    {/* Natural Language API */}
                    <div className={styles.apiRow}>
                        <div className={styles.apiEmoji}>💬</div>
                        <div>
                            <div className={styles.apiName}>Cloud Natural Language API</div>
                            <div className={styles.apiEn}>Natural Language API</div>
                            <div className={styles.apiSummary}>
                                テキストから感情・エンティティ・構造を自動抽出する自然言語処理 API。
                            </div>
                        </div>
                        <div>
                            <div className={styles.apiColTitle}>主な機能</div>
                            <ul className={styles.apiList}>
                                <li>感情分析（ポジ/ネガ/中立の判定）</li>
                                <li>エンティティ抽出（人名・地名・組織名）</li>
                                <li>構文解析（品詞・文構造の分析）</li>
                                <li>コンテンツ分類（700 以上のカテゴリ）</li>
                            </ul>
                        </div>
                        <div>
                            <div className={styles.apiColTitle}>ビジネス活用例</div>
                            <ul className={styles.apiList}>
                                <li>カスタマーレビューの感情自動分析</li>
                                <li>ソーシャルリスニング（ブランド評判監視）</li>
                                <li>サポートチケットの自動カテゴリ分類</li>
                                <li>ニュース・文書の自動タグ付け</li>
                            </ul>
                        </div>
                    </div>

                    {/* Translation API */}
                    <div className={styles.apiRow}>
                        <div className={styles.apiEmoji}>🌐</div>
                        <div>
                            <div className={styles.apiName}>Cloud Translation API</div>
                            <div className={styles.apiEn}>Cloud Translation API</div>
                            <div className={styles.apiSummary}>
                                130 以上の言語間で高品質な機械翻訳を提供。PDF・Word
                                のレイアウトを保ちながら翻訳も可能。
                            </div>
                        </div>
                        <div>
                            <div className={styles.apiColTitle}>主な機能</div>
                            <ul className={styles.apiList}>
                                <li>130 以上の言語間翻訳</li>
                                <li>自動言語検出</li>
                                <li>ドキュメント翻訳（PDF/Word レイアウト保持）</li>
                                <li>Glossary（ブランド固有の翻訳ルール）</li>
                            </ul>
                        </div>
                        <div>
                            <div className={styles.apiColTitle}>ビジネス活用例</div>
                            <ul className={styles.apiList}>
                                <li>グローバル EC サイトの自動多言語化</li>
                                <li>多言語カスタマーサポート</li>
                                <li>グローバル企業の社内文書翻訳自動化</li>
                            </ul>
                        </div>
                    </div>

                    {/* Speech-to-Text */}
                    <div className={styles.apiRow}>
                        <div className={styles.apiEmoji}>🎙️</div>
                        <div>
                            <div className={styles.apiName}>Speech-to-Text API</div>
                            <div className={styles.apiEn}>Speech-to-Text API</div>
                            <div className={styles.apiSummary}>
                                125 以上の言語の音声をテキストに変換。リアルタイム・バッチ処理の両対応。
                            </div>
                        </div>
                        <div>
                            <div className={styles.apiColTitle}>主な機能</div>
                            <ul className={styles.apiList}>
                                <li>125 以上の言語・方言に対応</li>
                                <li>リアルタイム & バッチ処理</li>
                                <li>話者分離（誰が話しているか識別）</li>
                                <li>ノイズ除去・自動句読点挿入</li>
                            </ul>
                        </div>
                        <div>
                            <div className={styles.apiColTitle}>ビジネス活用例</div>
                            <ul className={styles.apiList}>
                                <li>コールセンター通話の自動文字起こし</li>
                                <li>会議・インタビューの自動議事録</li>
                                <li>動画・ポッドキャストの字幕自動生成</li>
                            </ul>
                        </div>
                    </div>

                    {/* Text-to-Speech */}
                    <div className={styles.apiRow}>
                        <div className={styles.apiEmoji}>🔊</div>
                        <div>
                            <div className={styles.apiName}>Text-to-Speech API</div>
                            <div className={styles.apiEn}>Text-to-Speech API</div>
                            <div className={styles.apiSummary}>
                                40 以上の言語・220 以上の音声で人間に近い自然な音声を生成する音声合成 API。
                            </div>
                        </div>
                        <div>
                            <div className={styles.apiColTitle}>主な機能</div>
                            <ul className={styles.apiList}>
                                <li>220 以上の音声で自然な音声合成</li>
                                <li>感情・速度・ピッチのカスタマイズ</li>
                                <li>SSML（音声合成マークアップ）対応</li>
                                <li>Studio 音声（より自然・感情豊か）</li>
                            </ul>
                        </div>
                        <div>
                            <div className={styles.apiColTitle}>ビジネス活用例</div>
                            <ul className={styles.apiList}>
                                <li>IVR（電話の自動音声応答）システム</li>
                                <li>視覚障害者向けアクセシビリティ</li>
                                <li>eLearning コンテンツの音声ナレーション</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={baseStyles.bpBox}>
                    <div className={baseStyles.bpTitle}>✅ ベストプラクティス：事前学習済み API</div>
                    <ul className={baseStyles.bpList}>
                        <li>汎用的なタスクは必ず事前学習済み API を最初に試す（コスト・時間が最小）。</li>
                        <li>Vision API は高解像度の画像（最低 640x480 以上）を使用するほど精度が向上。</li>
                        <li>Translation API では Glossary 機能で業界固有の専門用語・ブランド名の翻訳精度を向上させる。</li>
                        <li>Speech-to-Text は業界特化モデル（医療・通話など）を選択することでノイズ環境でも精度が向上。</li>
                        <li>月間の無料枠を最大活用し、キャッシュ機能で重複リクエストを削減してコストを最適化する。</li>
                    </ul>
                </div>

                <div className={baseStyles.sourceBox}>
                    <div className={baseStyles.sourceTitle}>📎 参考ソース</div>
                    <div className={baseStyles.sourceLinks}>
                        <a href="https://cloud.google.com/vision/docs" target="_blank" rel="noopener noreferrer">https://cloud.google.com/vision/docs</a>
                        <a href="https://cloud.google.com/natural-language/docs" target="_blank" rel="noopener noreferrer">https://cloud.google.com/natural-language/docs</a>
                        <a href="https://cloud.google.com/translate/docs" target="_blank" rel="noopener noreferrer">https://cloud.google.com/translate/docs</a>
                        <a href="https://cloud.google.com/speech-to-text/docs" target="_blank" rel="noopener noreferrer">https://cloud.google.com/speech-to-text/docs</a>
                        <a href="https://cloud.google.com/text-to-speech/docs" target="_blank" rel="noopener noreferrer">https://cloud.google.com/text-to-speech/docs</a>
                    </div>
                </div>
            </div>
        </div>
    );
};
