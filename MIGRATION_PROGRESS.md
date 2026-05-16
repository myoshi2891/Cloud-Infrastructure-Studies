# Migration Progress

HTMLファイルから Next.js / React コンポーネントへの移行作業の進捗と引き継ぎコンテキストを管理する**統合ファイル（Single Source of Truth）**です。

## 現在地

- **ブランチ:** dev
- **最新 HEAD:** a54a181 — `test(e2e): cover hamburger navigation flow` (Step 8 完了)
- **進行中タスク:** なし（直近完了: グローバルメニュー ハンバーガー化 + AWS 拡張対応 8/8）
- **テスト数:** 331 件パス（Vitest 53 ファイル）/ E2E 4 件パス（Playwright Chromium）
- **ビルド:** 成功 (Next.js 16.2.6 Turbopack)
- **最終更新日時(UTC):** 2026-05-17T00:15:00Z

---

## 2026-05-16〜17: グローバルメニュー ハンバーガー化 + AWS 拡張対応（完了 8/8）

### 目的

1. **UI**: デスクトップ/モバイル共通の「右側ドロワー + プロバイダ別アコーディオン」ハンバーガー UI に統一する
2. **構造**: ナビ定義を [app/constants.ts](app/constants.ts) の `EXAMS` を正本としたデータ駆動に切り替え、`provider: 'GCP' | 'AWS'` フィールドで自動グルーピングする
3. **拡張性**: AWS 試験ページ群の追加に備え、constants 1 ファイル追加で Header に自動反映できる構造にする

### プラン参照

[.claude/plans/gc-aws-tdd-declarative-nebula.md](.claude/plans/gc-aws-tdd-declarative-nebula.md) に全体プラン保存。承認済み。

### 決定事項（ユーザー合意済み）

| 項目 | 採用 |
|---|---|
| メニュー UI | 右側ドロワー + プロバイダ別アコーディオン |
| AWS の扱い | ナビ枠だけ準備 (constants に SAA を `status: 'coming-soon'` で追加、ページ自体は別 PR) |
| user-event | 導入する (`@testing-library/user-event`) |
| コミット粒度 | 8 ステップ 8 コミット |

### 完了済みステップ

- [x] **Step 1**: `feat(nav): introduce NavTree adapter over EXAMS` — `4aab8c0`
  - 新規 [app/navigation.ts](app/navigation.ts) (`toNavTree`, `NavGroup`, `NavExam`, `NavLeaf`, `Provider` 型)
  - 新規 [**tests**/lib/navigation.test.ts](__tests__/lib/navigation.test.ts) (8 ケース)
- [x] **Step 2**: `feat(constants): tag exams with provider for nav grouping` — `6530793`
  - [app/constants.ts](app/constants.ts): `Exam.provider` 必須化、`status?: 'available' \| 'coming-soon'` 追加、`ColorKey` に `'card-aws-saa'` 追加、AWS SAA エントリ追加（`status: 'coming-soon'`、`domains: []`）
  - [app/page.tsx](app/page.tsx): coming-soon の試験をホームページのカード一覧から `.filter()` で除外
  - [app/globals.css](app/globals.css): `--color-theme-aws-bg/fg` と `@utility icon-theme-aws-saa` 追加
  - [**tests**/lib/navigation.test.ts](__tests__/lib/navigation.test.ts) に「実 EXAMS で GCP/AWS グループ生成」3 ケース追加
  - [**tests**/app/page.test.tsx](__tests__/app/page.test.tsx) を `VISIBLE_EXAMS` 基準に更新
- [x] **Step 3**: `test(header): freeze legacy nav contract before refactor` — `04e3853`
  - [**tests**/components/Header.test.tsx](__tests__/components/Header.test.tsx) の describe を「Header (legacy nav: Step 7 で撤去予定)」でラップ
- [x] **Step 4**: `feat(header): add hamburger toggle with aria state` — `5b94ad3`
  - `bun add -D @testing-library/user-event` (14.6.1)
  - [components/Header.tsx](components/Header.tsx): `drawerOpen` state + ハンバーガーボタン（右カラム）+ 空の Drawer（背景オーバーレイ + クローズボタン）。既存ドロップダウンと並走
  - 新規 [__tests__/components/Header.hamburger.test.tsx](__tests__/components/Header.hamburger.test.tsx) (5 ケース)
- [x] **Step 5**: `feat(header): render nav tree inside drawer` — `8cb0ae4`
  - [components/Header.tsx](components/Header.tsx): `toNavTree(EXAMS)` を module スコープで算出し、Drawer 内に provider 別 `<section>` + 試験ごとの `<details><summary>` アコーディオンを描画
  - `iconThemeClass()` ヘルパで `card-*` → `icon-theme-*` 変換
  - `coming-soon` の試験は「準備中」ラベルを表示し、リンクを描画しない
  - リンクの `onClick` で `setDrawerOpen(false)` を呼びナビゲーション時に Drawer を閉じる
  - [__tests__/components/Header.hamburger.test.tsx](__tests__/components/Header.hamburger.test.tsx) に NavTree 描画契約 7 ケース追加
- [x] **Step 6**: `feat(header): trap focus and lock scroll in drawer` — `30f5c13`
  - Drawer 用 useEffect 2 つ追加: (a) スクロールロック + open 時に閉じるボタンへ focus + close 時にトリガーへ復帰、(b) Escape クローズ + Tab/Shift+Tab フォーカストラップ
  - `hamburgerRef` / `closeButtonRef` / `drawerRef` を追加
  - 同テストファイルに Escape クローズ・初期フォーカス・復帰フォーカス・スクロールロック・Shift+Tab wrap の 5 ケース追加
- [x] **Step 7**: `refactor(header): remove inline dropdowns in favor of drawer` — `49d9e55`
  - [components/Header.tsx](components/Header.tsx): インラインドロップダウン JSX、`openMenu` state、5 個の `useRef`、click-outside/Escape 用 effect、`DropdownItem` を削除（-773/+142 行）
  - レイアウトを `grid (1fr auto 1fr)` → `flex justify-between` に簡素化
  - [__tests__/components/Header.test.tsx](__tests__/components/Header.test.tsx) を drawer 契約 6 ケースに書き換え（Header の最小契約: タイトル / nav role / ハンバーガー aria / provider 見出し / 全試験リンク網羅 / coming-soon 除外）
- [x] **追加 fix**: `fix(nav): dedup items when domain href equals exam href` — `0df5f20`
  - PCNE で `domains[0].href === exam.href` のため React duplicate key 警告が出ていた。adapter で exam.href と一致する domain を items から除外
  - [__tests__/lib/navigation.test.ts](__tests__/lib/navigation.test.ts) に回帰テスト 1 ケース追加
- [x] **Step 8**: `test(e2e): cover hamburger navigation flow` — `a54a181`
  - 新規 [e2e/nav.spec.ts](e2e/nav.spec.ts) (2 ケース): ACE Domain 1 遷移 / AWS 見出し可視 + Escape クローズ
  - `bun run test:e2e e2e/nav.spec.ts` で 2 件 pass を確認

### 関連ファイル

#### 最終的に変更された全ファイル

- [app/navigation.ts](app/navigation.ts) — adapter (新規) + dedup ロジック追加
- [app/constants.ts](app/constants.ts) — provider/status 追加、AWS SAA 追加
- [app/page.tsx](app/page.tsx) — coming-soon フィルタ
- [app/globals.css](app/globals.css) — AWS テーマカラー、icon-theme-aws-saa
- [components/Header.tsx](components/Header.tsx) — レガシードロップダウン撤去 + Drawer + a11y（合計 -773 / +330 行）
- [__tests__/lib/navigation.test.ts](__tests__/lib/navigation.test.ts) — adapter テスト + dedup 回帰
- [__tests__/components/Header.test.tsx](__tests__/components/Header.test.tsx) — drawer 契約に書き換え（22 → 6 ケース）
- [__tests__/components/Header.hamburger.test.tsx](__tests__/components/Header.hamburger.test.tsx) — 新 UI 全契約（17 ケース）
- [__tests__/app/page.test.tsx](__tests__/app/page.test.tsx) — VISIBLE_EXAMS 基準
- 新規 [e2e/nav.spec.ts](e2e/nav.spec.ts) — Drawer ナビ E2E (2 ケース)
- `package.json` / `bun.lock` — @testing-library/user-event 追加

### 不変条件（触らない）

- `--header-h: 48px`, `--topnav-height: 84px` (DisclaimerBanner との連動を保護)
- [components/DisclaimerBanner.tsx](components/DisclaimerBanner.tsx) — 触らない
- [app/layout.tsx](app/layout.tsx) — 触らない
- 「3試験対応」「5/600+/100%」などの Stats 表示文言（テストで検査されていないものは据え置き）

### 検証コマンド（完了時の最終結果）

```bash
bun run test                # Vitest 331 件 / 53 ファイル全 pass
bun run lint                # ESLint クリーン
bun run build               # Next.js 16.2.6 Turbopack 成功
bun run test:e2e e2e/nav.spec.ts  # Chromium 2 件 pass
```

### 残課題 / 次回着手候補

- 手動確認: `bun run dev` で実機の Drawer アニメーション・スクロールロック挙動を最終チェック
- AWS 試験ページ群の実装（`app/aws/solutions-architect-associate/page.tsx`）。adapter は完成しているので constants の `status` を `'available'` に変えるだけで Drawer に自動反映される

---

## 2026-05-12: AGWA Section 1 Restoration (完了)

### 目的

ユーザーによって確認されたオリジナル HTML との乖離（情報の省略・簡略化）を解消するため、残りのセクション（1.1, 1.2, 1.3, 1.4, 1.6）の内容をオリジナルに準拠したリッチな内容に復元・補完する。

### ステータス

- [x] **Section 1.5 建物とリソースの管理**: 補完完了、CSSマッピング済み。
- [x] **Section 1.1 ユーザー ライフサイクル管理**: 復元完了（`feat(agwa): complete reproduction of section 1 html with all details`）。
- [x] **Section 1.2 ドメインの管理**: 復元完了。
- [x] **Section 1.3 組織ユニット (OU)**: 復元完了。
- [x] **Section 1.4 グループの管理**: 復元完了。
- [x] **Section 1.6 管理者ロール**: 復元完了。

---

## 次回セッションでの再開プロンプト

あなたは熟練したフロントエンドエンジニアであり、Next.js (App Router) の移行スペシャリストです。
現在、`MIGRATION_PROGRESS.md` の「2026-05-12: AGWA Section 1 Restoration (完了)」セクションにある「実装ステップ詳細」に基づいて、静的HTMLファイルの Next.js への完全移行をステップバイステップで行う必要があります。

以下の要件を厳守して実装を進めてください。
1. 一度にすべての変更を行うのではなく、Phase 1 から順にステップバイステップで実装すること。
2. 各 Phase（ステップ）が完了し、`bun run lint` や `bun run build` でエラーが出ないことを確認したら、要件にあるコミットメッセージで必ず `git commit` を行うこと。
3. すべての CSS カスタムプロパティはプロジェクトの `@theme` トークン (`globals.css` に定義済み) にマッピングし、元の配色ではなくプロジェクトのダークテーマに準拠させること。
4. `<svg>` タグ内の属性はすべて React 向けに camelCase に変換すること。
5. E2Eテストは不要ですが、実装ステップごとのビルド確認とコンポーネントの型整合性は必ず確認すること。

それでは、対象のHTMLファイル `agwa-section1-accounts-domains-directory.html` を読み込み、「AGWA Section 1 Restoration (完了)」セクションにある対象セクション（1.1, 1.2, 1.3, 1.4, 1.6）について、ユーザー確認済みの乖離箇所を順次、オリジナルに準拠したリッチな内容へと復元・補完してください。1セクションごとに作業を完了させ、コミットを行ってください。

---

## 2026-05-12: AGWA Section 1 Migration (完了)

### 実装ステップ詳細 (Implementation Plan)

#### Objective

Migrate the standalone static HTML page `agwa-section1-accounts-domains-directory.html` into the Next.js App Router application at the route `app/gcl/agwa/section1/page.tsx`.

#### CSS Variable Mapping

HTML `:root` variables must be mapped to the project's `globals.css` `@theme` tokens in `page.css`:
- `--bg` -> `--color-background`
- `--surface` -> `--color-card`
- `--accent` -> `--color-theme-agwa-fg`
- `--text` -> `--color-foreground`
- `--border` -> `--color-border`

#### Steps & Commits

- **Phase 1: CSS Extraction and Setup**
  - `app/gcl/agwa/section1/page.css` 作成と変数マッピング。
  - Commit: `feat(agwa): add section 1 specific css and token mappings`
- **Phase 2: HTML to TSX Conversion**
  - `app/gcl/agwa/section1/page.tsx` 作成。SVG属性の camelCase 変換を含む HTML 変換。
  - Commit: `feat(agwa): convert section 1 html to tsx component`
- **Phase 3: Integration and Navigation**
  - `components/Header.tsx` および `CLAUDE.md` の更新。
  - Commit: `feat(agwa): add section 1 to header navigation and update docs`

### 次のステップ

- [x] **Phase 1: CSS Extraction and Setup**
- [x] **Phase 2: HTML to TSX Conversion**
- [x] **Phase 3: Integration and Navigation**

---

## 2026-05-12: PCNE Step-by-Step Guide Migration & Quality Improvements (完了)

### 完了済み

- **AGWA Section 1 Quality Improvements (Section 1.5)**:
  - Section 1.5 「建物とリソースの管理」の内容をオリジナル HTML に準拠するよう復元。
  - 欠落していたテーブル（リソース種類、予約権限、詳細オプション）および CSV 一括作成手順を追加。
  - SVG をリッチなオリジナル版に置き換え（camelCase 属性変換済み）。
  - `page.css` の変数をプロジェクトの `@theme` トークンに正しくマッピング。
- **PCNE Step-by-Step Guide Migration (Step 1-8)**:
  - Section 1-6 までの移行を完了し、旧 HTML ファイルをアーカイブ化。
- **Layout Optimization (SharedSection.module.css)**:
  - `.section > *` セレクターを `.section > :not(.divider)` に変更し、区切り線（`.divider`）のみを画面幅いっぱいに表示するよう修正。
  - `SharedSection.module.css` を使用する全コンポーネントに適用。
- **Test Robustness Improvements**:
  - `getByRole('heading', { level: 2 })` を `name` オプション（アクセシブルネーム）併用による厳密な取得にリファクタリング。
  - `.code-block` や `.code-line` の構造を検証するテストを追加し、テストの信頼性を向上。
- **Step 1: Base Setup & Constants**:
  - `constants.ts`, `layout.tsx`, `page.tsx`, `pcne-step.module.css` を作成。
  - Heroセクション、スティッキーナビゲーションの実装。
- **Step 2: Section 1 (VPC ネットワークの設計と計画)**:
  - `Section1.tsx` を TDD で実装。
  - ネットワークティアの選択、VPCの設計（共有VPC、ピアリング等）、ハイブリッド接続（Dedicated Interconnect, HA VPN等）、GKEネットワーク設計を移行。
- **Step 3: Section 2 (VPCネットワークの実装)**:
  - `Section2.tsx` を TDD で実装。
  - VPC構成（コマンド含む）、VPCルーティング、Network Connectivity Center (NCC) 構成、GKEクラスタ実装を移行。
- **Step 4: Section 3 (マネージドネットワークサービスの構成)**:
  - `Section3.tsx` を TDD で実装。
  - ロードバランシング、Cloud CDN、Cloud DNSの構成とベストプラクティスを移行。
- **Step 5: Section 4 (ハイブリッド/マルチクラウドネットワーク接続の構成と実装)**:
  - `Section4.tsx` を TDD で実装。
  - Cloud Interconnect、サイト間IPsec VPN（コマンド含む）、Cloud RouterのBGP/BFD構成、ハイブリッドNCC構成を移行。
- **Step 6: Section 5 (ネットワーク運用、監視、トラブルシューティング)**:
  - `Section5.tsx` を TDD で実装。
  - Cloud Observability（ログ・メトリクス）、トラブルシューティング手法、Network Intelligence Centerの各機能比較を移行。
- **Step 7: Section 6 (クラウドネットワークセキュリティの構成と実装)**:
  - `Section6.tsx` を TDD で実装。
  - Cloud Armor、Cloud NGFW（階層型ポリシー）、Cloud NAT/Secure Web Proxy、自己管理型NVAとパケットミラーリングを移行。
- **Step 8: Archiving and Final Verification**:
  - 全セクションの統合確認。
  - E2Eテストはスキップし、ビルド成功を確認。
  - `google-cloud-pcne-step-by-step-guide.html` を `Gcl_Archive/Professional-Cloud-Network-Engineer/` へアーカイブ。

### 次のステップ

- [x] **Step 1: Base Setup & Constants**
- [x] **Step 2: Section 1 (VPC ネットワークの設計と計画)**
- [x] **Step 3: Section 2 (VPCネットワークの実装)**
- [x] **Step 4: Section 3 (マネージドネットワークサービスの構成)**
- [x] **Step 5: Section 4 (ハイブリッド/マルチクラウドネットワーク接続の構成と実装)**
- [x] **Step 6: Section 5 (ネットワーク運用、監視、トラブルシューティング)**
- [x] **Step 7: Section 6 (クラウドネットワークセキュリティの構成と実装)**
- [x] **Step 8: Archiving and Final Verification**

---

## 2026-05-10: Professional Cloud Network Engineer Migration (完了)

### 完了済み

- **Step 1: Base Setup & Constants**:
  - `constants.ts`, `layout.tsx`, `page.tsx`, `pcne.module.css` を作成。
  - Heroセクション、スティッキーナビゲーションの実装。
- **Step 2: INTRO (試験の全体像と準備方法)**:
  - `SectionIntro.tsx` を TDD で実装。
  - 出題配点バー、推奨学習ステップ、公式リソースを移行。
- **Step 3: Section 1 (VPC ネットワークの設計・実装)**:
  - `Section1.tsx` を TDD で実装。
  - VPCモード比較、ファイアウォールルール、VPCピアリングとShared VPCの違い、Cloud NAT・PGA・PSCの比較を移行。
- **Step 4: Section 2 (ハイブリッド・マルチクラウド接続)**:
  - `Section2.tsx` を TDD で実装。
  - VPN/Interconnectの比較、HA VPN、Dedicated Interconnect の SLA要件、Cloud Router と BGP を移行。
- **Step 5: Section 3 (ロードバランシングと最適化)**:
  - `Section3.tsx` を TDD で実装。
  - DiagramSVGを用いたフローチャートとアーキテクチャ図の実装。
  - ロードバランサー選択基準、主要LB比較、Global HTTPS LBの構成、NEGの種類、ベストプラクティスを移行。
- **Step 6: Section 4 (ネットワークサービスとDNS)**:
  - `Section4.tsx` を TDD で実装。
  - Cloud DNSのパブリック/プライベートゾーン比較、DNS転送の双方向アーキテクチャ図 (DiagramSVG)、IPアドレス管理（静的/エフェメラル）の比較を移行。
- **Step 7: Section 5 (ネットワークセキュリティ)**:
  - `Section5.tsx` を TDD で実装。
  - Cloud Armorの4機能（DDoS, WAF, Rate Limiting, Adaptive Protection）、VPC Service Controlsのサービス境界アーキテクチャ、IAPによるVPNレス接続の比較図を移行。
- **Step 8: Section 6 (監視・トラブルシュート)**:
  - `Section6.tsx` を TDD で実装。
  - Network Intelligence Center の 5 ツール、VPC Flow Logs・Packet Mirroring の使い分け表、トラブルシューティングの 4 ステップを移行。
- **Step 9: まとめ (試験攻略チートシート & 混同しやすいポイント)**:
  - `SectionSummary.tsx` を TDD で実装。
  - チートシート、TRAPS（混同しやすいポイント）、試験当日の解答戦略を移行。

### 次のステップ

- [x] **Step 1: Base Setup & Constants**: `constants.ts`, `layout.tsx`, `page.tsx`, `pcne.module.css`
- [x] **Step 2: INTRO (試験の全体像と準備方法)**
- [x] **Step 3: Section 1 (VPC ネットワークの設計・実装)**
- [x] **Step 4: Section 2 (ハイブリッド・マルチクラウド接続)**
- [x] **Step 5: Section 3 (ロードバランシングと最適化)**
- [x] **Step 6: Section 4 (ネットワークサービスとDNS)**
- [x] **Step 7: Section 5 (ネットワークセキュリティ)**
- [x] **Step 8: Section 6 (監視・トラブルシュート)**
- [x] **Step 9: まとめ (試験攻略チートシート & 混同しやすいポイント)**

---

## 2026-05-08: Cloud Digital Leader Section 6 Migration (完了)

### 完了済み

- **Step 1: Base Setup & Constants**:
  - `constants.ts`, `layout.tsx`, `page.tsx`, `section6.module.css` を作成。
  - Heroセクション、スティッキーナビゲーションの実装。
- **Step 2: Part 1 - Financial Governance**:
  - `Section1.tsx` を TDD で実装.
- **Step 3: Part 2 - SRE Principles**:
  - `Section2.tsx` を TDD で実装.
- **Step 4: Part 3 - Cloud Monitoring**:
  - `Section3.tsx` を TDD で実装.
- **Step 5: Part 4 - Cloud Logging**:
  - `Section4.tsx` を TDD で実装.
- **Step 6: Part 5 - Reliability**:
  - `Section5.tsx` を TDD で実装.
- **Step 7: Part 6 - Sustainability**:
  - `Section6.tsx` を TDD で実装。Google の環境目標（24/7 カーボンフリー）、Carbon Footprint レポート、Scope 1/2/3 の定義、クラウド移行の環境メリットを移行。
  - `page.tsx` に `Section6` を統合。
- **Step 8: Part 7 - Exam Preparation**:
  - `Section7.tsx` を TDD で実装。頻出問題パターン、キーワードマップ、推奨学習リソースを移行。
  - `page.tsx` に `Section7` を統合。
- **最終調整**:
  - E2E検証はスキップし、本番ビルドの成功を確認。

### 次のステップ

- [ ] (なし) Section 6 は完了。

---

(以下、過去の履歴)

## 2026-05-03: Cloud Digital Leader Section 4 & 5 品質改善タスク (完了)

...
