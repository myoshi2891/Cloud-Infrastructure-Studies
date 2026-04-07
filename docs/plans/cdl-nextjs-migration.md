# CDL → Next.js 移行計画書

**作成日**: 2026-04-08  
**対象**: `app/gcl/cloud-digital-leader/page.tsx`  
**ソース**: `cdl-section1〜5-*.md`, `google-cloud-digital-leader-comprehensive-guide.md`

---

## 移行方針

- Red-Green サイクル: テストを先に書き、実装で通す
- 定数は `constants.ts` に集約し、JSX は `page.tsx` でレンダリング
- SVGはインライン実装（`cdl-section3-ai-innovation.md` の図を参照）

---

## 進捗

| セクション | テスト | 実装 | 状態 |
|-----------|--------|------|------|
| S0: 試験概要 | ✅ | ✅ | 完了 |
| S1: DX・クラウド基礎 | ✅ | ✅ | 完了 |
| S2: データ変革 | ✅ | ✅ | 完了 |
| S3: インフラ近代化 | ✅ | ✅ | 完了 |
| S4: セキュリティ・コンプライアンス | ✅ | ✅ | 完了 |
| **S5: AI/ML（AI によるイノベーション）** | ✅ 15件 | ✅ 実装済み | **完了** |
| S6: サービス早見表 | ✅ | ✅ | 完了 |
| S7: 試験攻略チェックリスト | ✅ | ✅ | 完了 |

---

## S5 未実装コンテンツ（15テスト）

### 追加が必要な定数（constants.ts）

- `ML_APPROACHES` — 機械学習3アプローチ（教師あり・教師なし・強化学習）
- `BQML_FEATURES` — BigQuery ML の特徴リスト（SQLでMLモデル作成）

### 追加が必要な JSX（page.tsx: Section5 関数）

| # | カード | 定数/実装 | テスト |
|---|--------|-----------|--------|
| 5.2 | AI/ML 階層 SVG | SVGインライン（生成AI・深層学習・LLM） | S5-1 |
| 5.3 | 機械学習3アプローチ表 | `ML_APPROACHES`（新規） | S5-2 |
| 5.4 | AI層スペクトラム SVG | SVGインライン（プリビルトAPI〜カスタムモデル） | S5-3 |
| 5.5 | プリビルト AI API 表（7行） | `PREBUILT_APIS`（既存） | S5-4 |
| 5.6 | AutoML サービス表 | `AUTOML_SERVICES`（既存） | S5-5 |
| 5.7 | Vertex AI コンポーネント表（9行） | `VERTEX_COMPONENTS`（既存） | S5-6 |
| 5.8 | Gemini モデル表（4種） | `GEMINI_MODELS`（既存） | S5-7 |
| 5.9 | Gemini for Workspace + NotebookLM | テキスト記述 | S5-8 |
| 5.10 | Vertex AI Agent Builder | `VERTEX_COMPONENTS`内に含まれる | S5-9 |
| 5.11 | RAG SVG 図 | SVGインライン（ベクトルDB） | S5-10 |
| 5.12 | ハルシネーション・ファインチューニング・グラウンディング | テキスト記述 | S5-11 |
| 5.13 | 責任ある AI 6原則表 | `RESPONSIBLE_AI_PRINCIPLES`（既存） | S5-12 |
| 5.14 | プライバシー保護技術表 | `PRIVACY_TECHNIQUES`（既存） | S5-13 |
| 5.15 | BigQuery ML | `BQML_FEATURES`（新規） | S5-14 |
| 5.16 | Explainable AI | テキスト記述 | S5-15 |

---

## 実装手順

1. `constants.ts` に `ML_APPROACHES`, `BQML_FEATURES` を追加
2. `page.tsx` の `Section5` 関数を拡張（5.2〜5.16 のカードを追加）
3. `bun run test __tests__/gcl/cloud-digital-leader/page.test.tsx` で全64テスト GREEN 確認
4. `bun run build` でビルドエラーなし確認
5. commit: `feat(cdl/S5): add AI/ML hierarchy, ML approaches, Vertex AI, Gemini, RAG`

---

## 参照ファイル

- ソースMD: `cdl-section3-ai-innovation.md`
- テスト: `__tests__/gcl/cloud-digital-leader/page.test.tsx` (L354-453)
- 定数: `app/gcl/cloud-digital-leader/constants.ts` (L363-)
- 実装: `app/gcl/cloud-digital-leader/page.tsx` (L1199-1249)
