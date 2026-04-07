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
| ----------- | -------- | ------ | ------ |
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

### 未実装コンテンツ（TODO）

- [ ] Section 6〜8 の最終的な整合性確認とリファクタリング

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
