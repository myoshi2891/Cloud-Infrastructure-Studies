# ACE Domain 4 Next.js 移行計画

## ソース

- `ace-domain4-access-and-security.md`
- `ace-section4-access-and-security.md`

## 目標

ソースMDファイルのすべてのコンテンツ（省略・要約一切禁止）を Next.js App Router のページへ移植し、テスト駆動開発（TDD）で検証する。

## フェーズ一覧

| # | フェーズ | 成果物 | 完了基準 |
| --- | --------- | ------- | --------- |
| 1 | セットアップ | `app/gcl/associate-cloud-engineer/domain4/` 配下の `layout.tsx`, `domain4.css`, （必要に応じて `constants.ts`）とテストの足場 | 開発サーバーでアクセス可能になり、空のテストが通過すること |
| 2 | テストの作成 | `__tests__/gcl/associate-cloud-engineer/domain4/page.test.tsx` | テストがREDになること |
| 3 | Section 1-4 実装 | `page.tsx` (Chapter 1〜4 相当) | 該当するテストケースがGREENになること |
| 4 | Section 5-8 実装 | `page.tsx` (Chapter 5〜8 相当) | 該当するテストケースがGREENになること |
| 5 | Section 9-12 実装 | `page.tsx` (Chapter 9〜12 相当) | 該当するテストケースがGREENになること |
| 6 | Section 13-17 実装 | `page.tsx` (Chapter 13〜17 相当) | 該当するテストケースがGREENになること |
| 7 | Section 18 実装 | `page.tsx` (Chapter 18 相当) | 全テストケースがGREENになること |
| 8 | ヘッダー更新 | `components/Header.tsx` | Domain 4 へのナビゲーションリンクが正常に機能すること |

## コンテンツチェックリスト（完了状況）

- [x] Chapter 1: セキュリティの基本概念と設計原則
- [x] Chapter 2: IAM の基本アーキテクチャ
- [x] Chapter 3: ロールの 3 種類：基本 / 事前定義 / カスタム
- [x] Chapter 4: IAM ポリシーの設定と管理
- [x] Chapter 5: 条件付きロールバインディング（IAM Conditions）
- [x] Chapter 6: サービスアカウントの基本概念と種類
- [x] Chapter 7: サービスアカウントキーのリスクと代替手法
- [x] Chapter 8: Workload Identity Federation
- [x] Chapter 9: Application Default Credentials (ADC)
- [x] Chapter 10: 権限借用（Impersonation）と PAM
- [x] Chapter 11: Secret Manager（シークレット管理）
- [x] Chapter 12: Cloud KMS（鍵管理サービス）
- [x] Chapter 13: VPC Service Controls
- [x] Chapter 14: Identity-Aware Proxy (IAP)
- [x] Chapter 15: Cloud Armor（DDoS 防御 / WAF）
- [x] Chapter 16: Security Command Center (SCC)
- [x] Chapter 17: Domain 4 試験対策まとめ
- [x] Chapter 18: 包括的調査および実践的アーキテクチャガイド (ace-section4-access-and-security.md)

## 実装上の注意

- `domain4.css` にページ固有のテーマカラー・変数を定義する。
- JSXの属性変換（例: `stroke-width` → `strokeWidth`）を遵守する。
- TypeScriptのstrictモードに適合させる。
- 1回の `page.tsx` 更新は適度なサイズに抑え、複数回に分けて実装する。
