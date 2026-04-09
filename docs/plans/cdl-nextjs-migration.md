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
| S5: AI/ML（AI によるイノベーション） | ✅ 15件 | ✅ 実装済み | 完了 |
| **S6: サービス早見表** | ✅ | ✅ 実装済み | **完了** |
| **S7: 試験攻略チェックリスト** | ✅ | ✅ 実装済み | **完了** |

---

## 実装手順

- [x] `__tests__/gcl/cloud-digital-leader/page.test.tsx` に S6 と S7 のテストを追加
- [x] `constants.ts` に S6 と S7 のデータを追加
- [x] `page.tsx` の `Section6`, `Section7`, `Section8` 関数を拡張してデータを表示
- [x] `bun run test __tests__/gcl/cloud-digital-leader/page.test.tsx` で全76テスト GREEN 確認
- [x] `bun run build` でビルドエラーなし確認
- [x] commit: `feat(gcl/cloud-digital-leader/S6-S7): add section 6 and 7 for quick references and checklist`

