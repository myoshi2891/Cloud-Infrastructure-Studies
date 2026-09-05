# 移行作業進捗管理ドキュメント (Migration Progress)

(最終更新日: 2026-09-05)

## 2026-09-05: 推薦図書『Operating Systems: Three Easy Pieces（OSTEP）』完全学習ガイド 100%全量移行 (完了)

### 目的

`Operating-Systems-Three-Easy-Pieces.html` を、Next.js App Router 5ファイル構成 (`page.tsx`, `OperatingSystemsThreeEasyPiecesGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/recommended-books/operating-systems-three-easy-pieces` ルートへ移行。グローバルナビゲーションの「Books」配下に追加。見出し(h1:1, h2:18, h3:58, h4:1)、全39個のテーブル、56個のMermaid図解、全リスト(19箇所/50件)、全外部リンク(12件)・全本文(119件)・学習チェックリスト(17件)・参考文献カード(12件)を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for operating-systems-three-easy-pieces` (`80a1888b`)
- [x] **Step 1 (Red)**: `test(books): add failing tests for operating-systems-three-easy-pieces` (`0a385000`)
- [x] **Step 2 (Green)**: `feat(books): implement operating-systems-three-easy-pieces to pass tests` (`00239270`)
- [x] **Step 3 (Refactor)**: `refactor(books): integrate operating-systems-three-easy-pieces into routing and update docs` (`f1b5d0d3`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md and archive operating-systems-three-easy-pieces sources`

### 関連ファイル

- [app/recommended-books/operating-systems-three-easy-pieces/page.tsx](app/recommended-books/operating-systems-three-easy-pieces/page.tsx)
- [app/recommended-books/operating-systems-three-easy-pieces/OperatingSystemsThreeEasyPiecesGuide.tsx](app/recommended-books/operating-systems-three-easy-pieces/OperatingSystemsThreeEasyPiecesGuide.tsx)
- [app/recommended-books/operating-systems-three-easy-pieces/NavBar.tsx](app/recommended-books/operating-systems-three-easy-pieces/NavBar.tsx)
- [app/recommended-books/operating-systems-three-easy-pieces/constants.ts](app/recommended-books/operating-systems-three-easy-pieces/constants.ts)
- [app/recommended-books/operating-systems-three-easy-pieces/page.css](app/recommended-books/operating-systems-three-easy-pieces/page.css)
- [`__tests__/recommended-books/operating-systems-three-easy-pieces/page.test.tsx`](__tests__/recommended-books/operating-systems-three-easy-pieces/page.test.tsx)
- [`__tests__/recommended-books/operating-systems-three-easy-pieces/NavBar.test.tsx`](__tests__/recommended-books/operating-systems-three-easy-pieces/NavBar.test.tsx)
- [docs/migration-inventory/operating-systems-three-easy-pieces.json](docs/migration-inventory/operating-systems-three-easy-pieces.json)
- [archive/Books/html/Operating-Systems-Three-Easy-Pieces.html](archive/Books/html/Operating-Systems-Three-Easy-Pieces.html)
- [archive/Books/md/Operating-Systems-Three-Easy-Pieces.md](archive/Books/md/Operating-Systems-Three-Easy-Pieces.md)

---

## 2026-09-05: 推薦図書『Systems Performance: Enterprise and the Cloud』実践ガイド 100%全量移行 (完了)

### 目的

`Systems-performance-guide.html` を、Next.js App Router 5ファイル構成 (`page.tsx`, `SystemsPerformanceGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/recommended-books/systems-performance` ルートへ移行。グローバルナビゲーションの「Books」配下に追加。見出し(h1:1, h2:17, h3:24)、全9個のテーブル、18個のMermaid図解、全リスト(13箇所/49件)、全外部リンク(22件)・全本文(56段落)・参考文献カード(22件)を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for systems-performance` (`c028168e`)
- [x] **Step 1 (Red)**: `test(books): add failing tests for systems-performance` (`61439ea4`)
- [x] **Step 2 (Green)**: `feat(books): implement systems-performance to pass tests` (`98df147b`)
- [x] **Step 3 (Refactor)**: `refactor(books): integrate systems-performance into routing and update docs` (`1ee70136`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md and archive systems-performance sources`

### 関連ファイル

- [app/recommended-books/systems-performance/page.tsx](app/recommended-books/systems-performance/page.tsx)
- [app/recommended-books/systems-performance/SystemsPerformanceGuide.tsx](app/recommended-books/systems-performance/SystemsPerformanceGuide.tsx)
- [app/recommended-books/systems-performance/NavBar.tsx](app/recommended-books/systems-performance/NavBar.tsx)
- [app/recommended-books/systems-performance/constants.ts](app/recommended-books/systems-performance/constants.ts)
- [app/recommended-books/systems-performance/page.css](app/recommended-books/systems-performance/page.css)
- [`__tests__/recommended-books/systems-performance/page.test.tsx`](__tests__/recommended-books/systems-performance/page.test.tsx)
- [`__tests__/recommended-books/systems-performance/NavBar.test.tsx`](__tests__/recommended-books/systems-performance/NavBar.test.tsx)
- [docs/migration-inventory/systems-performance.json](docs/migration-inventory/systems-performance.json)
- [archive/Books/html/Systems-performance-guide.html](archive/Books/html/Systems-performance-guide.html)
- [archive/Books/md/Systems-performance-guide.md](archive/Books/md/Systems-performance-guide.md)

---

## 2026-09-05: 推薦図書『UNIX and Linux System Administration Handbook』完全解説ガイド 100%全量移行 (完了)

### 目的

`Unix-linux-sysadmin-handbook-guide.html` を、Next.js App Router 5ファイル構成 (`page.tsx`, `UnixLinuxSysadminHandbookGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/recommended-books/unix-linux-sysadmin-handbook` ルートへ移行。グローバルナビゲーションの「Books」配下に追加。見出し(h1:1, h2:9, h3:41, h4:115)、全39個のテーブル、29個のMermaid図解、全リスト(140件)、全外部リンク(64件)・全本文(121段落)・実践チェックリスト・参考文献一覧を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for unix-linux-sysadmin-handbook` (`d0ba3849`)
- [x] **Step 1 (Red)**: `test(books): add failing tests for unix-linux-sysadmin-handbook` (`fc5fb69c`)
- [x] **Step 2 (Green)**: `feat(books): implement unix-linux-sysadmin-handbook to pass tests` (`dc9c72cf`)
- [x] **Step 3 (Refactor)**: `refactor(books): integrate unix-linux-sysadmin-handbook into routing and update docs` (`df35b68e`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md and archive unix-linux-sysadmin-handbook sources`

### 関連ファイル

- [app/recommended-books/unix-linux-sysadmin-handbook/page.tsx](app/recommended-books/unix-linux-sysadmin-handbook/page.tsx)
- [app/recommended-books/unix-linux-sysadmin-handbook/UnixLinuxSysadminHandbookGuide.tsx](app/recommended-books/unix-linux-sysadmin-handbook/UnixLinuxSysadminHandbookGuide.tsx)
- [app/recommended-books/unix-linux-sysadmin-handbook/NavBar.tsx](app/recommended-books/unix-linux-sysadmin-handbook/NavBar.tsx)
- [app/recommended-books/unix-linux-sysadmin-handbook/constants.ts](app/recommended-books/unix-linux-sysadmin-handbook/constants.ts)
- [app/recommended-books/unix-linux-sysadmin-handbook/page.css](app/recommended-books/unix-linux-sysadmin-handbook/page.css)
- [`__tests__/recommended-books/unix-linux-sysadmin-handbook/page.test.tsx`](__tests__/recommended-books/unix-linux-sysadmin-handbook/page.test.tsx)
- [`__tests__/recommended-books/unix-linux-sysadmin-handbook/NavBar.test.tsx`](__tests__/recommended-books/unix-linux-sysadmin-handbook/NavBar.test.tsx)
- [docs/migration-inventory/unix-linux-sysadmin-handbook.json](docs/migration-inventory/unix-linux-sysadmin-handbook.json)
- [archive/Books/html/Unix-linux-sysadmin-handbook-guide.html](archive/Books/html/Unix-linux-sysadmin-handbook-guide.html)
- [archive/Books/md/Unix-linux-sysadmin-handbook-guide.md](archive/Books/md/Unix-linux-sysadmin-handbook-guide.md)

---

## 2026-09-05: 推薦図書『Understanding the Linux Kernel』完全解説ガイド 100%全量移行 (完了)

### 目的

`Understanding-linux-kernel-guide.html` を、Next.js App Router 5ファイル構成 (`page.tsx`, `UnderstandingTheLinuxKernelGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/recommended-books/understanding-the-linux-kernel` ルートへ移行。グローバルナビゲーションの「Books」配下に追加。見出し(h1:1, h2:31, h3:96)、全17個のテーブル、45個のMermaid図解、全リスト(72件)、全外部リンク・全本文・実践チェックリスト(19件)・参考文献一覧を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for understanding-the-linux-kernel` (`8a6138ef`)
- [x] **Step 1 (Red)**: `test(books): add failing tests for understanding-the-linux-kernel` (`645467f4`)
- [x] **Step 2 (Green)**: `feat(books): implement understanding-the-linux-kernel to pass tests` (`43e0526f`)
- [x] **Step 3 (Refactor)**: `refactor(books): integrate understanding-the-linux-kernel into routing and update docs` (`309d03ec`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md and archive understanding-linux-kernel sources`

### 関連ファイル

- [app/recommended-books/understanding-the-linux-kernel/page.tsx](app/recommended-books/understanding-the-linux-kernel/page.tsx)
- [app/recommended-books/understanding-the-linux-kernel/UnderstandingTheLinuxKernelGuide.tsx](app/recommended-books/understanding-the-linux-kernel/UnderstandingTheLinuxKernelGuide.tsx)
- [app/recommended-books/understanding-the-linux-kernel/NavBar.tsx](app/recommended-books/understanding-the-linux-kernel/NavBar.tsx)
- [app/recommended-books/understanding-the-linux-kernel/constants.ts](app/recommended-books/understanding-the-linux-kernel/constants.ts)
- [app/recommended-books/understanding-the-linux-kernel/page.css](app/recommended-books/understanding-the-linux-kernel/page.css)
- [`__tests__/recommended-books/understanding-the-linux-kernel/page.test.tsx`](__tests__/recommended-books/understanding-the-linux-kernel/page.test.tsx)
- [`__tests__/recommended-books/understanding-the-linux-kernel/NavBar.test.tsx`](__tests__/recommended-books/understanding-the-linux-kernel/NavBar.test.tsx)
- [docs/migration-inventory/understanding-the-linux-kernel.json](docs/migration-inventory/understanding-the-linux-kernel.json)
- [archive/Books/html/Understanding-linux-kernel-guide.html](archive/Books/html/Understanding-linux-kernel-guide.html)
- [archive/Books/md/Understanding-linux-kernel-guide.md](archive/Books/md/Understanding-linux-kernel-guide.md)

---

## 2026-09-02: Google Cloud Professional Cloud Developer（PCD）Section 4「Google Cloudサービスとのアプリケーション統合」学習ガイド 100%全量移行 (完了)

### 目的

`Gcp-professional-cloud-developer-section4.html` を、Next.js App Router 5ファイル構成 (`page.tsx`, `Section4Guide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/gcl/professional-cloud-developer/section4` ルートへ移行。グローバルナビゲーションの「GCP」PCD配下に追加。見出し(h1:1, h2:8, h3:11, h4:35)、全7個のテーブル、15個のMermaid図解、全リスト(12件)、全外部リンク(31件/59箇所)・全本文・実践チェックリスト(11件)・参考文献一覧(7件)を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for professional-cloud-developer-section4` (`83ebdcb8`)
- [x] **Step 1 (Red)**: `test(gcl): add failing tests for professional-cloud-developer section4` (`8542ef38`)
- [x] **Step 2 (Green)**: `feat(gcl): implement professional-cloud-developer section4 to pass tests` (`cfe96359`)
- [x] **Step 3 (Refactor)**: `refactor(gcl): integrate professional-cloud-developer section4 into routing and update docs` (`599ebe1c`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md and archive section4 html`

### 関連ファイル

- [app/gcl/professional-cloud-developer/section4/page.tsx](app/gcl/professional-cloud-developer/section4/page.tsx)
- [app/gcl/professional-cloud-developer/section4/Section4Guide.tsx](app/gcl/professional-cloud-developer/section4/Section4Guide.tsx)
- [app/gcl/professional-cloud-developer/section4/NavBar.tsx](app/gcl/professional-cloud-developer/section4/NavBar.tsx)
- [app/gcl/professional-cloud-developer/section4/constants.ts](app/gcl/professional-cloud-developer/section4/constants.ts)
- [app/gcl/professional-cloud-developer/section4/page.css](app/gcl/professional-cloud-developer/section4/page.css)
- [`__tests__/gcl/professional-cloud-developer/section4/page.test.tsx`](__tests__/gcl/professional-cloud-developer/section4/page.test.tsx)
- [`__tests__/gcl/professional-cloud-developer/section4/NavBar.test.tsx`](__tests__/gcl/professional-cloud-developer/section4/NavBar.test.tsx)
- [docs/migration-inventory/professional-cloud-developer-section4.json](docs/migration-inventory/professional-cloud-developer-section4.json)
- [archive/Gcl/Professional-Cloud-Developer/html/Gcp-professional-cloud-developer-section4.html](archive/Gcl/Professional-Cloud-Developer/html/Gcp-professional-cloud-developer-section4.html)
- [archive/Gcl/Professional-Cloud-Developer/md/Gcp-professional-cloud-developer-section4.md](archive/Gcl/Professional-Cloud-Developer/md/Gcp-professional-cloud-developer-section4.md)

---

## 2026-09-02: Google Cloud Professional Cloud Developer（PCD）Section 3「デプロイのためのクラウドネイティブアプリケーション構成」学習ガイド 100%全量移行 (完了)

### 目的

`Gcp-professional-cloud-developer-section3.html` を、Next.js App Router 5ファイル構成 (`page.tsx`, `Section3Guide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/gcl/professional-cloud-developer/section3` ルートへ移行。グローバルナビゲーションの「GCP」PCD配下に追加。見出し(h1:1, h2:6, h3:7, h4:17)、全5個のテーブル、8個のMermaid図解、全リスト(16件)、全外部リンク(18件/49箇所)・全本文・実践チェックリスト(17件)・参考文献一覧(7件)を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for professional-cloud-developer-section3` (`478b0b2c`)
- [x] **Step 1 (Red)**: `test(pcd): add failing tests for professional-cloud-developer-section3` (`23b31cb8`)
- [x] **Step 2 (Green)**: `feat(pcd): implement professional-cloud-developer-section3 to pass tests` (`9a87c6da`)
- [x] **Step 3 (Refactor)**: `refactor(pcd): integrate section3 into routing and update docs` (`115b5bab`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — migrate pcd section3 and archive sources`

### 関連ファイル

- [app/gcl/professional-cloud-developer/section3/page.tsx](app/gcl/professional-cloud-developer/section3/page.tsx)
- [app/gcl/professional-cloud-developer/section3/Section3Guide.tsx](app/gcl/professional-cloud-developer/section3/Section3Guide.tsx)
- [app/gcl/professional-cloud-developer/section3/NavBar.tsx](app/gcl/professional-cloud-developer/section3/NavBar.tsx)
- [app/gcl/professional-cloud-developer/section3/constants.ts](app/gcl/professional-cloud-developer/section3/constants.ts)
- [app/gcl/professional-cloud-developer/section3/page.css](app/gcl/professional-cloud-developer/section3/page.css)
- [`__tests__/gcl/professional-cloud-developer/section3/page.test.tsx`](__tests__/gcl/professional-cloud-developer/section3/page.test.tsx)
- [`__tests__/gcl/professional-cloud-developer/section3/NavBar.test.tsx`](__tests__/gcl/professional-cloud-developer/section3/NavBar.test.tsx)
- [docs/migration-inventory/professional-cloud-developer-section3.json](docs/migration-inventory/professional-cloud-developer-section3.json)
- [archive/Gcl/Professional-Cloud-Developer/html/Gcp-professional-cloud-developer-section3.html](archive/Gcl/Professional-Cloud-Developer/html/Gcp-professional-cloud-developer-section3.html)
- [archive/Gcl/Professional-Cloud-Developer/md/Gcp-professional-cloud-developer-section3.md](archive/Gcl/Professional-Cloud-Developer/md/Gcp-professional-cloud-developer-section3.md)

---

## 2026-09-02: Google Cloud Professional Cloud Developer（PCD）Section 2「アプリケーションのビルドとテスト」学習ガイド 100%全量移行 (完了)

### 目的

`Gcp-professional-cloud-developer-section2.html` を、Next.js App Router 5ファイル構成 (`page.tsx`, `Section2Guide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/gcl/professional-cloud-developer/section2` ルートへ移行。グローバルナビゲーションの「GCP」PCD配下に追加。見出し(h1:1, h2:7, h3:7, h4:28)、全7個のテーブル、8個のMermaid図解、全リスト(17件)、全外部リンク(23件)・全本文・コールアウト注記(9件)・参考文献一覧(4件)を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for professional-cloud-developer-section2` (`e1948c1c`)
- [x] **Step 1 (Red)**: `test(pcd): add failing tests for professional-cloud-developer section2` (`8204bfff`)
- [x] **Step 2 (Green)**: `feat(pcd): implement professional-cloud-developer section2 to pass tests` (`901c2651`)
- [x] **Step 3 (Refactor)**: `refactor(pcd): integrate section2 into routing and update docs` (`2303aae3`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md and archive source files`

### 関連ファイル

- [app/gcl/professional-cloud-developer/section2/page.tsx](app/gcl/professional-cloud-developer/section2/page.tsx)
- [app/gcl/professional-cloud-developer/section2/Section2Guide.tsx](app/gcl/professional-cloud-developer/section2/Section2Guide.tsx)
- [app/gcl/professional-cloud-developer/section2/NavBar.tsx](app/gcl/professional-cloud-developer/section2/NavBar.tsx)
- [app/gcl/professional-cloud-developer/section2/constants.ts](app/gcl/professional-cloud-developer/section2/constants.ts)
- [app/gcl/professional-cloud-developer/section2/page.css](app/gcl/professional-cloud-developer/section2/page.css)
- [`__tests__/gcl/professional-cloud-developer/section2/page.test.tsx`](__tests__/gcl/professional-cloud-developer/section2/page.test.tsx)
- [`__tests__/gcl/professional-cloud-developer/section2/NavBar.test.tsx`](__tests__/gcl/professional-cloud-developer/section2/NavBar.test.tsx)
- [docs/migration-inventory/professional-cloud-developer-section2.json](docs/migration-inventory/professional-cloud-developer-section2.json)
- [archive/Gcl/Professional-Cloud-Developer/html/Gcp-professional-cloud-developer-section2.html](archive/Gcl/Professional-Cloud-Developer/html/Gcp-professional-cloud-developer-section2.html)
- [archive/Gcl/Professional-Cloud-Developer/md/Gcp-professional-cloud-developer-section2.md](archive/Gcl/Professional-Cloud-Developer/md/Gcp-professional-cloud-developer-section2.md)

---

## 2026-09-02: Google Cloud Professional Cloud Developer（PCD）Section 1「高可用性・セキュア・信頼性の高いクラウドネイティブアプリケーションの設計」学習ガイド 100%全量移行 (完了)

### 目的

`Gcp-professional-cloud-developer-section1-guide.html` を、Next.js App Router 5ファイル構成 (`page.tsx`, `Section1Guide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/gcl/professional-cloud-developer/section1` ルートへ移行。グローバルナビゲーションの「GCP」PCD配下に追加。見出し(h1:1, h2:4, h3:28, h4:12)、全10個のテーブル、19個のMermaid図解、全リスト(8件)、全外部リンク(19件)・全本文・コールアウト注記(27件)・実践チェックリスト(25件)・参考文献一覧(17件)を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for professional-cloud-developer-section1` (`ab357c06`)
- [x] **Step 1 (Red)**: `test(gcl): add failing tests for professional-cloud-developer-section1` (`0ac2cf83`)
- [x] **Step 2 (Green)**: `feat(gcl): implement professional-cloud-developer-section1 to pass tests` (`917e4936`)
- [x] **Step 3 (Refactor)**: `refactor(gcl): integrate professional-cloud-developer-section1 into routing and constants` (`b56c4236`)
- [x] **Step 4 (Archive & Sync)**: `docs(migration): archive source files and update migration progress`

### 関連ファイル

- [app/gcl/professional-cloud-developer/section1/page.tsx](app/gcl/professional-cloud-developer/section1/page.tsx)
- [app/gcl/professional-cloud-developer/section1/Section1Guide.tsx](app/gcl/professional-cloud-developer/section1/Section1Guide.tsx)
- [app/gcl/professional-cloud-developer/section1/NavBar.tsx](app/gcl/professional-cloud-developer/section1/NavBar.tsx)
- [app/gcl/professional-cloud-developer/section1/constants.ts](app/gcl/professional-cloud-developer/section1/constants.ts)
- [app/gcl/professional-cloud-developer/section1/page.css](app/gcl/professional-cloud-developer/section1/page.css)
- [`__tests__/gcl/professional-cloud-developer/section1/page.test.tsx`](__tests__/gcl/professional-cloud-developer/section1/page.test.tsx)
- [`__tests__/gcl/professional-cloud-developer/section1/NavBar.test.tsx`](__tests__/gcl/professional-cloud-developer/section1/NavBar.test.tsx)
- [docs/migration-inventory/professional-cloud-developer-section1.json](docs/migration-inventory/professional-cloud-developer-section1.json)
- [archive/Gcl/Professional-Cloud-Developer/html/Gcp-professional-cloud-developer-section1-guide.html](archive/Gcl/Professional-Cloud-Developer/html/Gcp-professional-cloud-developer-section1-guide.html)
- [archive/Gcl/Professional-Cloud-Developer/md/Gcp-professional-cloud-developer-section1-guide.md](archive/Gcl/Professional-Cloud-Developer/md/Gcp-professional-cloud-developer-section1-guide.md)

---

## 2026-09-02: Google Cloud Professional Cloud Developer（PCD）認定試験 学習ガイド 100%全量移行 (完了)

### 目的

`Gcp-pcd-professional-cloud-developer.html` を、Next.js App Router 5ファイル構成 (`page.tsx`, `ProfessionalCloudDeveloperGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/gcl/professional-cloud-developer` ルートへ移行。グローバルナビゲーションの「GCP」に追加。見出し(h1:1, h2:8, h3:21, h4:45)、全19個のテーブル、13個のMermaid図解、全リスト(51件)、全外部リンク(36件)・全本文・コールアウト注記(14件)・実践チェックリスト(27件)・参考文献一覧(53件)を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for professional-cloud-developer` (`e0b2d25b`)
- [x] **Step 1 (Red)**: `test(gcl): add failing tests for professional-cloud-developer` (`cf09b85a`)
- [x] **Step 2 (Green)**: `feat(gcl): implement professional-cloud-developer to pass tests` (`a596e320`)
- [x] **Step 3 (Refactor)**: `refactor(gcl): integrate professional-cloud-developer into routing and update docs` (`d459a4a3`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — migrate professional-cloud-developer`

### 関連ファイル

- [app/gcl/professional-cloud-developer/page.tsx](app/gcl/professional-cloud-developer/page.tsx)
- [app/gcl/professional-cloud-developer/ProfessionalCloudDeveloperGuide.tsx](app/gcl/professional-cloud-developer/ProfessionalCloudDeveloperGuide.tsx)
- [app/gcl/professional-cloud-developer/NavBar.tsx](app/gcl/professional-cloud-developer/NavBar.tsx)
- [app/gcl/professional-cloud-developer/constants.ts](app/gcl/professional-cloud-developer/constants.ts)
- [app/gcl/professional-cloud-developer/page.css](app/gcl/professional-cloud-developer/page.css)
- [`__tests__/gcl/professional-cloud-developer/page.test.tsx`](__tests__/gcl/professional-cloud-developer/page.test.tsx)
- [`__tests__/gcl/professional-cloud-developer/NavBar.test.tsx`](__tests__/gcl/professional-cloud-developer/NavBar.test.tsx)
- [docs/migration-inventory/professional-cloud-developer.json](docs/migration-inventory/professional-cloud-developer.json)
- [archive/Gcl/Professional-Cloud-Developer/html/Gcp-pcd-professional-cloud-developer.html](archive/Gcl/Professional-Cloud-Developer/html/Gcp-pcd-professional-cloud-developer.html)
- [archive/Gcl/Professional-Cloud-Developer/md/Gcp-professional-cloud-developer-guide.md](archive/Gcl/Professional-Cloud-Developer/md/Gcp-professional-cloud-developer-guide.md)

---

## 2026-08-31: CompTIA Network+ (N10-009) ドメイン4.0「ネットワークセキュリティ」完全ガイド 100%全量移行 (完了)

### 目的

`Comptia-network-plus-domain4-network-security.html` を、Next.js App Router 5ファイル構成 (`page.tsx`, `ComptiaNetworkSecurityGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/comptia/network-plus/network-security-guide` ルートへ移行。グローバルナビゲーションの「CompTIA Network+」に追加。見出し(h1:1, h2:6, h3:20, h4:3)、全20個のテーブル、7個のMermaid図解、全リスト(5件)、全外部リンク(5件)・全本文・コールアウト注記(3件)・実践チェックリスト(17件)・参考文献一覧(5件)を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for comptia-network-plus-network-security-guide` (`5062a18`)
- [x] **Step 1 (Red)**: `test(comptia): add failing tests for comptia-network-plus-network-security-guide` (`93d7c8e`)
- [x] **Step 2 (Green)**: `feat(comptia): implement comptia-network-plus-network-security-guide to pass tests` (`264fc1b`)
- [x] **Step 3 (Refactor)**: `refactor(comptia): integrate comptia-network-plus-network-security-guide into routing and update docs` (`93e0c25`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — migrate comptia-network-plus-network-security-guide`

### 関連ファイル

- [app/comptia/network-plus/network-security-guide/page.tsx](app/comptia/network-plus/network-security-guide/page.tsx)
- [app/comptia/network-plus/network-security-guide/ComptiaNetworkSecurityGuide.tsx](app/comptia/network-plus/network-security-guide/ComptiaNetworkSecurityGuide.tsx)
- [app/comptia/network-plus/network-security-guide/NavBar.tsx](app/comptia/network-plus/network-security-guide/NavBar.tsx)
- [app/comptia/network-plus/network-security-guide/constants.ts](app/comptia/network-plus/network-security-guide/constants.ts)
- [app/comptia/network-plus/network-security-guide/page.css](app/comptia/network-plus/network-security-guide/page.css)
- [`__tests__/comptia/network-plus/network-security-guide/page.test.tsx`](__tests__/comptia/network-plus/network-security-guide/page.test.tsx)
- [`__tests__/comptia/network-plus/network-security-guide/NavBar.test.tsx`](__tests__/comptia/network-plus/network-security-guide/NavBar.test.tsx)
- [docs/migration-inventory/comptia-network-plus-network-security-guide.json](docs/migration-inventory/comptia-network-plus-network-security-guide.json)
- [archive/Comptia/Network-Plus/Comptia-network-plus-domain4-network-security.html](archive/Comptia/Network-Plus/Comptia-network-plus-domain4-network-security.html)
- [archive/Comptia/Network-Plus/Comptia-network-plus-domain4-network-security.md](archive/Comptia/Network-Plus/Comptia-network-plus-domain4-network-security.md)

---

## 2026-08-29: 『Infrastructure as Code』実践ガイド 100%全量移行 (完了)

### 目的

`Infrastructure-as-code-guide.html` を、Next.js App Router 5ファイル構成 (`page.tsx`, `InfrastructureAsCodeGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/recommended-books/infrastructure-as-code` ルートへ移行。グローバルナビゲーションの「Recommended Books」に追加。見出し(h1:1, h2:10, h3:27, h4:0)、全19個のテーブル、26個のMermaid図解、全リスト(84件)、全外部リンク(29件)・全本文・コールアウト注記(3件)・実践チェックリスト(14件)・参考文献一覧(27件)を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for infrastructure-as-code` (`79081aa`)
- [x] **Step 1 (Red)**: `test(books): add failing tests for infrastructure-as-code` (`2315a83`)
- [x] **Step 2 (Green)**: `feat(books): implement infrastructure-as-code to pass tests` (`51fe7ed`)
- [x] **Step 3 (Refactor)**: `refactor(books): integrate infrastructure-as-code into routing and update docs` (`6935dfe`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — migrate infrastructure-as-code`

### 関連ファイル

- [app/recommended-books/infrastructure-as-code/page.tsx](app/recommended-books/infrastructure-as-code/page.tsx)
- [app/recommended-books/infrastructure-as-code/InfrastructureAsCodeGuide.tsx](app/recommended-books/infrastructure-as-code/InfrastructureAsCodeGuide.tsx)
- [app/recommended-books/infrastructure-as-code/NavBar.tsx](app/recommended-books/infrastructure-as-code/NavBar.tsx)
- [app/recommended-books/infrastructure-as-code/constants.ts](app/recommended-books/infrastructure-as-code/constants.ts)
- [app/recommended-books/infrastructure-as-code/page.css](app/recommended-books/infrastructure-as-code/page.css)
- [`__tests__/recommended-books/infrastructure-as-code/page.test.tsx`](__tests__/recommended-books/infrastructure-as-code/page.test.tsx)
- [`__tests__/recommended-books/infrastructure-as-code/NavBar.test.tsx`](__tests__/recommended-books/infrastructure-as-code/NavBar.test.tsx)
- [docs/migration-inventory/infrastructure-as-code.json](docs/migration-inventory/infrastructure-as-code.json)
- [archive/Books/html/Infrastructure-as-code-guide.html](archive/Books/html/Infrastructure-as-code-guide.html)

---

## 2026-08-29: 『Release It!』第2版 本番対応ソフトウェア設計・デプロイ完全ガイド 100%全量移行 (完了)

### 目的

`Release-It-Design-and-Deploy-Production-Ready-Software.html` を、Next.js App Router 5ファイル構成 (`page.tsx`, `ReleaseItGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/recommended-books/release-it` ルートへ移行。グローバルナビゲーションの「Recommended Books」に追加。見出し(h1:1, h2:14, h3:12, h4:5)、全5個のテーブル、14個のMermaid図解、全リスト(26件)、全外部リンク(22件)・全本文・コールアウト注記(2件)・実践チェックリスト(10件)・参考文献一覧(22件)を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for release-it` (`537c66c`)
- [x] **Step 1 (Red)**: `test(recommended-books): add failing tests for release-it` (`e9a5ccc`)
- [x] **Step 2 (Green)**: `feat(recommended-books): implement release-it to pass tests` (`abb9bac`)
- [x] **Step 3 (Refactor)**: `refactor(recommended-books): integrate release-it into routing and update docs` (`d334276`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — migrate release-it`

### 関連ファイル

- [app/recommended-books/release-it/page.tsx](app/recommended-books/release-it/page.tsx)
- [app/recommended-books/release-it/ReleaseItGuide.tsx](app/recommended-books/release-it/ReleaseItGuide.tsx)
- [app/recommended-books/release-it/NavBar.tsx](app/recommended-books/release-it/NavBar.tsx)
- [app/recommended-books/release-it/constants.ts](app/recommended-books/release-it/constants.ts)
- [app/recommended-books/release-it/page.css](app/recommended-books/release-it/page.css)
- [`__tests__/recommended-books/release-it/page.test.tsx`](__tests__/recommended-books/release-it/page.test.tsx)
- [docs/migration-inventory/release-it.json](docs/migration-inventory/release-it.json)
- [archive/Books/html/Release-It-Design-and-Deploy-Production-Ready-Software.html](archive/Books/html/Release-It-Design-and-Deploy-Production-Ready-Software.html)
- [archive/Books/md/Release-It-Design-and-Deploy-Production-Ready-Software.md](archive/Books/md/Release-It-Design-and-Deploy-Production-Ready-Software.md)

---

## 2026-08-29: 『The DevOps Handbook』第2版 初学者のためのステップバイステップ実践ガイド 100%全量移行 (完了)

### 目的

`The-devops-handbook.html` を、Next.js App Router 5ファイル構成 (`page.tsx`, `TheDevOpsHandbookGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/recommended-books/the-devops-handbook` ルートへ移行。グローバルナビゲーションの「Recommended Books」に追加。見出し(h1:1, h2:14, h3:28, h4:0)、全4個のテーブル、19個のMermaid図解、全リスト(124件)、全外部リンク(18件)・全本文・コールアウト注記(23件)・実践チェックリスト(11件)・参考文献一覧(18件)・アンチパターン(8件)・用語集(10件)を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for the-devops-handbook` (`8e714ab`)
- [x] **Step 1 (Red)**: `test(recommended-books): add failing tests for the-devops-handbook` (`6cebddd`)
- [x] **Step 2 (Green)**: `feat(recommended-books): implement the-devops-handbook to pass tests` (`5f67da9`)
- [x] **Step 3 (Refactor)**: `refactor(recommended-books): integrate the-devops-handbook into routing and update docs` (`5213d4e`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — migrate the-devops-handbook`

### 関連ファイル

- [app/recommended-books/the-devops-handbook/page.tsx](app/recommended-books/the-devops-handbook/page.tsx)
- [app/recommended-books/the-devops-handbook/TheDevOpsHandbookGuide.tsx](app/recommended-books/the-devops-handbook/TheDevOpsHandbookGuide.tsx)
- [app/recommended-books/the-devops-handbook/NavBar.tsx](app/recommended-books/the-devops-handbook/NavBar.tsx)
- [app/recommended-books/the-devops-handbook/constants.ts](app/recommended-books/the-devops-handbook/constants.ts)
- [app/recommended-books/the-devops-handbook/page.css](app/recommended-books/the-devops-handbook/page.css)
- [`__tests__/recommended-books/the-devops-handbook/page.test.tsx`](__tests__/recommended-books/the-devops-handbook/page.test.tsx)
- [docs/migration-inventory/the-devops-handbook.json](docs/migration-inventory/the-devops-handbook.json)
- [archive/Books/html/The-devops-handbook.html](archive/Books/html/The-devops-handbook.html)
- [archive/Books/md/The-devops-handbook.md](archive/Books/md/The-devops-handbook.md)

---

## 2026-08-29: 『Site Reliability Engineering』Googleのプロダクション運用 完全ガイド 100%全量移行 (完了)

### 目的

`Site-reliability-engineering.html` を、Next.js App Router 5ファイル構成 (`page.tsx`, `SreGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/recommended-books/site-reliability-engineering` ルートへ移行。グローバルナビゲーションの「Recommended Books」に追加。見出し(h1:1, h2:8, h3:18, h4:14)、全4個のテーブル、15個のMermaid図解、全リスト(124件)、全外部リンク(22件)・全本文・コールアウト注記(6件)・実践チェックリスト(12件)・参考文献一覧(19件)を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for site-reliability-engineering` (`d409ccd`)
- [x] **Step 1 (Red)**: `test(books): add failing tests for site-reliability-engineering` (`290e359`)
- [x] **Step 2 (Green)**: `feat(books): implement site-reliability-engineering to pass tests` (`31fd789`)
- [x] **Step 3 (Refactor)**: `refactor(books): integrate site-reliability-engineering into routing and update docs` (`a77522d`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — migrate site-reliability-engineering`

### 関連ファイル

- [app/recommended-books/site-reliability-engineering/page.tsx](app/recommended-books/site-reliability-engineering/page.tsx)
- [app/recommended-books/site-reliability-engineering/SreGuide.tsx](app/recommended-books/site-reliability-engineering/SreGuide.tsx)
- [app/recommended-books/site-reliability-engineering/NavBar.tsx](app/recommended-books/site-reliability-engineering/NavBar.tsx)
- [app/recommended-books/site-reliability-engineering/constants.ts](app/recommended-books/site-reliability-engineering/constants.ts)
- [app/recommended-books/site-reliability-engineering/page.css](app/recommended-books/site-reliability-engineering/page.css)
- [`__tests__/recommended-books/site-reliability-engineering/page.test.tsx`](__tests__/recommended-books/site-reliability-engineering/page.test.tsx)
- [docs/migration-inventory/site-reliability-engineering.json](docs/migration-inventory/site-reliability-engineering.json)
- [archive/Books/html/Site-reliability-engineering.html](archive/Books/html/Site-reliability-engineering.html)
- [archive/Books/md/Site-reliability-engineering.md](archive/Books/md/Site-reliability-engineering.md)

---

## 2026-08-29: 『Accelerate』LeanとDevOpsの科学 完全ガイド 100%全量移行 (完了)

### 目的

`Accelerate-lean-devops-guide.html` を、Next.js App Router 5ファイル構成 (`page.tsx`, `AccelerateGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/recommended-books/accelerate` ルートへ移行。グローバルナビゲーションに新規プロバイダー「Recommended Books」を追加。見出し(h1:1, h2:10, h3:16, h4:6)、全11個のテーブル、6個のMermaid図解、全リスト(44件)、全外部リンク(29件)・全本文・コールアウト注記(3件)・実践チェックリスト(10件)・参考文献一覧(29件)を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for accelerate-lean-devops-guide` (`bdaeb69`)
- [x] **Step 1 (Red)**: `test(books): add failing tests for accelerate-lean-devops-guide` (`efa6f7c`)
- [x] **Step 2 (Green)**: `feat(books): implement accelerate-lean-devops-guide to pass tests` (`9467847`)
- [x] **Step 3 (Refactor)**: `refactor(books): integrate accelerate-lean-devops-guide into routing and update docs` (`99a7329`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — migrate accelerate-lean-devops-guide`

### 関連ファイル

- [app/recommended-books/accelerate/page.tsx](app/recommended-books/accelerate/page.tsx)
- [app/recommended-books/accelerate/AccelerateGuide.tsx](app/recommended-books/accelerate/AccelerateGuide.tsx)
- [app/recommended-books/accelerate/NavBar.tsx](app/recommended-books/accelerate/NavBar.tsx)
- [app/recommended-books/accelerate/constants.ts](app/recommended-books/accelerate/constants.ts)
- [app/recommended-books/accelerate/page.css](app/recommended-books/accelerate/page.css)
- [`__tests__/recommended-books/accelerate/page.test.tsx`](__tests__/recommended-books/accelerate/page.test.tsx)
- [docs/migration-inventory/accelerate-lean-devops-guide.json](docs/migration-inventory/accelerate-lean-devops-guide.json)
- [archive/Books/html/Accelerate-lean-devops-guide.html](archive/Books/html/Accelerate-lean-devops-guide.html)
- [archive/Books/md/Accelerate-lean-devops-guide.md](archive/Books/md/Accelerate-lean-devops-guide.md)

---

## 2026-08-25: Google Cloud Professional Cloud Architect (PCA) Section 6: ソリューションと運用の卓越性の確保 完全ガイド 100%全量移行 (完了)

### 目的

`Gcp-pca-section6-operational-excellence.html` を、Next.js App Router 5ファイル構成 (`page.tsx`, `PcaSection6Guide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/gcl/professional-cloud-architect/section6-operational-excellence` ルートへ移行。見出し(h1:1, h2:12, h3:23, h4:0)、全23個のテーブル、14個のMermaid図解、全リスト(18件)、全外部リンク(18件)・全本文・コールアウト注記・理解度チェックリスト(18件)・参考文献グリッド(52件)を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for pca-section6-operational-excellence` (`ac120b1`)
- [x] **Step 1 (Red)**: `test(pca): add failing tests for section6-operational-excellence` (`b446463`)
- [x] **Step 2 (Green)**: `feat(pca): implement section6-operational-excellence to pass tests` (`3ea13cc`)
- [x] **Step 3 (Refactor)**: `refactor(pca): integrate section6-operational-excellence into routing and update docs` (`11eb370`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — migrate PCA Section 6 guide`

### 関連ファイル

- [app/gcl/professional-cloud-architect/section6-operational-excellence/page.tsx](app/gcl/professional-cloud-architect/section6-operational-excellence/page.tsx)
- [app/gcl/professional-cloud-architect/section6-operational-excellence/PcaSection6Guide.tsx](app/gcl/professional-cloud-architect/section6-operational-excellence/PcaSection6Guide.tsx)
- [app/gcl/professional-cloud-architect/section6-operational-excellence/NavBar.tsx](app/gcl/professional-cloud-architect/section6-operational-excellence/NavBar.tsx)
- [app/gcl/professional-cloud-architect/section6-operational-excellence/constants.ts](app/gcl/professional-cloud-architect/section6-operational-excellence/constants.ts)
- [app/gcl/professional-cloud-architect/section6-operational-excellence/page.css](app/gcl/professional-cloud-architect/section6-operational-excellence/page.css)
- [`__tests__/gcl/professional-cloud-architect/section6-operational-excellence/page.test.tsx`](__tests__/gcl/professional-cloud-architect/section6-operational-excellence/page.test.tsx)
- [docs/migration-inventory/pca-section6-operational-excellence.json](docs/migration-inventory/pca-section6-operational-excellence.json)
- [archive/Gcl/Professional-Cloud-Architect/Gcp-pca-section6-operational-excellence.html](archive/Gcl/Professional-Cloud-Architect/Gcp-pca-section6-operational-excellence.html)
- [archive/Gcl/Professional-Cloud-Architect/Gcp-pca-section6-operational-excellence.md](archive/Gcl/Professional-Cloud-Architect/Gcp-pca-section6-operational-excellence.md)

---

## 2026-08-25: Google Cloud Professional Cloud Architect (PCA) Section 5: 実装の管理 完全ガイド 100%全量移行 (完了)

### 目的

`Gcp-pca-section5-managing-implementation.html` を、Next.js App Router 5ファイル構成 (`page.tsx`, `PcaSection5Guide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/gcl/professional-cloud-architect/section5-managing-implementation` ルートへ移行。見出し(h1:1, h2:9, h3:11, h4:0)、全15個のテーブル、13個のMermaid図解、全リスト(59件)、全外部リンク(18件)・全本文(28件)・コールアウト注記・理解度チェックリスト(16件)・参考文献グリッド(18件)を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for pca-section5-managing-implementation` (`2818fbd`)
- [x] **Step 1 (Red)**: `test(pca): add failing tests for section5-managing-implementation` (`311d5dc`)
- [x] **Step 2 (Green)**: `feat(pca): implement section5-managing-implementation to pass tests` (`80923cb`)
- [x] **Step 3 (Refactor)**: `refactor(pca): integrate section5-managing-implementation into routing and update docs` (`b32f20f`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — migrate PCA Section 5 guide`

### 関連ファイル

- [app/gcl/professional-cloud-architect/section5-managing-implementation/page.tsx](app/gcl/professional-cloud-architect/section5-managing-implementation/page.tsx)
- [app/gcl/professional-cloud-architect/section5-managing-implementation/PcaSection5Guide.tsx](app/gcl/professional-cloud-architect/section5-managing-implementation/PcaSection5Guide.tsx)
- [app/gcl/professional-cloud-architect/section5-managing-implementation/NavBar.tsx](app/gcl/professional-cloud-architect/section5-managing-implementation/NavBar.tsx)
- [app/gcl/professional-cloud-architect/section5-managing-implementation/constants.ts](app/gcl/professional-cloud-architect/section5-managing-implementation/constants.ts)
- [app/gcl/professional-cloud-architect/section5-managing-implementation/page.css](app/gcl/professional-cloud-architect/section5-managing-implementation/page.css)
- [`__tests__/gcl/professional-cloud-architect/section5-managing-implementation/page.test.tsx`](__tests__/gcl/professional-cloud-architect/section5-managing-implementation/page.test.tsx)
- [docs/migration-inventory/pca-section5-managing-implementation.json](docs/migration-inventory/pca-section5-managing-implementation.json)
- [archive/Gcl/Professional-Cloud-Architect/Gcp-pca-section5-managing-implementation.html](archive/Gcl/Professional-Cloud-Architect/Gcp-pca-section5-managing-implementation.html)
- [archive/Gcl/Professional-Cloud-Architect/Gcp-pca-section5-managing-implementation.md](archive/Gcl/Professional-Cloud-Architect/Gcp-pca-section5-managing-implementation.md)

---

## 2026-08-25: Google Cloud Professional Cloud Architect (PCA) Section 4: プロセス分析と最適化 完全ガイド 100%全量移行 (完了)

### 目的

`Gcp-pca-section4-process-optimization.html` を、Next.js App Router 5ファイル構成 (`page.tsx`, `PcaSection4Guide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/gcl/professional-cloud-architect/section4-process-optimization` ルートへ移行。見出し(h1:1, h2:9, h3:15, h4:0)、全26個のテーブル、15個のMermaid図解、全リスト(30件)、全外部リンク(32件)・全本文(83件)・コールアウト注記・理解度チェックリスト(20件)・参考文献グリッド(32件)を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for pca-section4-process-optimization` (`5e76c78`)
- [x] **Step 1 (Red)**: `test(gcl): add failing tests for pca-section4-process-optimization` (`e6846fa`)
- [x] **Step 2 (Green)**: `feat(gcl): implement pca-section4-process-optimization to pass tests` (`3301732`)
- [x] **Step 3 (Refactor)**: `refactor(gcl): integrate pca-section4-process-optimization into routing and update docs`
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — pca section 4 complete`

### 関連ファイル

- [app/gcl/professional-cloud-architect/section4-process-optimization/page.tsx](app/gcl/professional-cloud-architect/section4-process-optimization/page.tsx)
- [app/gcl/professional-cloud-architect/section4-process-optimization/PcaSection4Guide.tsx](app/gcl/professional-cloud-architect/section4-process-optimization/PcaSection4Guide.tsx)
- [app/gcl/professional-cloud-architect/section4-process-optimization/NavBar.tsx](app/gcl/professional-cloud-architect/section4-process-optimization/NavBar.tsx)
- [app/gcl/professional-cloud-architect/section4-process-optimization/constants.ts](app/gcl/professional-cloud-architect/section4-process-optimization/constants.ts)
- [app/gcl/professional-cloud-architect/section4-process-optimization/page.css](app/gcl/professional-cloud-architect/section4-process-optimization/page.css)
- [`__tests__/gcl/professional-cloud-architect/section4-process-optimization/page.test.tsx`](__tests__/gcl/professional-cloud-architect/section4-process-optimization/page.test.tsx)
- [docs/migration-inventory/pca-section4-process-optimization.json](docs/migration-inventory/pca-section4-process-optimization.json)
- [archive/Gcl/Professional-Cloud-Architect/Gcp-pca-section4-process-optimization.html](archive/Gcl/Professional-Cloud-Architect/Gcp-pca-section4-process-optimization.html)
- [archive/Gcl/Professional-Cloud-Architect/Gcp-pca-section4-process-optimization.md](archive/Gcl/Professional-Cloud-Architect/Gcp-pca-section4-process-optimization.md)

---

## 2026-08-24: Google Cloud Professional Cloud Architect (PCA) Section 3: セキュリティとコンプライアンスの設計 完全ガイド 100%全量移行 (完了)

### 目的

`Gcp-pca-section3-security-compliance.html` および `Gcp-pca-section3-security-compliance.md` を、Next.js App Router 5ファイル構成 (`page.tsx`, `PcaSection3Guide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/gcl/professional-cloud-architect/section3-security-compliance` ルートへ移行。見出し(h1:1, h2:6, h3:25, h4:37)、全40個のテーブル、26個のMermaid図解、全リスト、全外部リンク(74件)・全本文・コールアウト注記・理解度チェックリスト・参考文献グリッド(71件)を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for pca-section3-security-compliance` (`475fb24`)
- [x] **Step 1 (Red)**: `test(gcl): add failing tests for pca-section3-security-compliance` (`a1aa863`)
- [x] **Step 2 (Green)**: `feat(gcl): implement pca-section3-security-compliance to pass tests` (`f1552c3`)
- [x] **Step 3 (Refactor)**: `refactor(gcl): integrate pca-section3-security-compliance into routing and update docs` (`b17852f`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — pca section 3 complete`

### 関連ファイル

- [app/gcl/professional-cloud-architect/section3-security-compliance/page.tsx](app/gcl/professional-cloud-architect/section3-security-compliance/page.tsx)
- [app/gcl/professional-cloud-architect/section3-security-compliance/PcaSection3Guide.tsx](app/gcl/professional-cloud-architect/section3-security-compliance/PcaSection3Guide.tsx)
- [app/gcl/professional-cloud-architect/section3-security-compliance/NavBar.tsx](app/gcl/professional-cloud-architect/section3-security-compliance/NavBar.tsx)
- [app/gcl/professional-cloud-architect/section3-security-compliance/constants.ts](app/gcl/professional-cloud-architect/section3-security-compliance/constants.ts)
- [app/gcl/professional-cloud-architect/section3-security-compliance/page.css](app/gcl/professional-cloud-architect/section3-security-compliance/page.css)
- [`__tests__/gcl/professional-cloud-architect/section3-security-compliance/page.test.tsx`](__tests__/gcl/professional-cloud-architect/section3-security-compliance/page.test.tsx)
- [docs/migration-inventory/pca-section3-security-compliance.json](docs/migration-inventory/pca-section3-security-compliance.json)
- [archive/Gcl/Professional-Cloud-Architect/Gcp-pca-section3-security-compliance.html](archive/Gcl/Professional-Cloud-Architect/Gcp-pca-section3-security-compliance.html)
- [archive/Gcl/Professional-Cloud-Architect/Gcp-pca-section3-security-compliance.md](archive/Gcl/Professional-Cloud-Architect/Gcp-pca-section3-security-compliance.md)

---

## 2026-08-24: Google Cloud Professional Cloud Architect (PCA) Section 2: 管理とプロビジョニング 完全ガイド 100%全量移行 (完了)

### 目的

`Gcp-pca-section2-managing-provisioning.html` および `Gcp-pca-section2-managing-provisioning.md` を、Next.js App Router 5ファイル構成 (`page.tsx`, `PcaSection2Guide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/gcl/professional-cloud-architect/section2-managing-provisioning` ルートへ移行。見出し(h1:1, h2:9, h3:19, h4:6)、全25個のテーブル、17個のMermaid図解、全リスト、全外部リンク(42件)・全本文・コールアウト注記・理解度チェックリスト・参考文献グリッドを一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for pca-section2-managing-provisioning` (`e4a9be4`)
- [x] **Step 1 (Red)**: `test(gcl): add failing tests for pca-section2-managing-provisioning` (`0b0c38b`)
- [x] **Step 2 (Green)**: `feat(gcl): implement pca-section2-managing-provisioning to pass tests` (`9d9e26c`)
- [x] **Step 3 (Refactor)**: `refactor(gcl): integrate pca-section2-managing-provisioning into routing and update docs` (`1f5dc78`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — pca section 2 complete`

### 関連ファイル

- [app/gcl/professional-cloud-architect/section2-managing-provisioning/page.tsx](app/gcl/professional-cloud-architect/section2-managing-provisioning/page.tsx)
- [app/gcl/professional-cloud-architect/section2-managing-provisioning/PcaSection2Guide.tsx](app/gcl/professional-cloud-architect/section2-managing-provisioning/PcaSection2Guide.tsx)
- [app/gcl/professional-cloud-architect/section2-managing-provisioning/NavBar.tsx](app/gcl/professional-cloud-architect/section2-managing-provisioning/NavBar.tsx)
- [app/gcl/professional-cloud-architect/section2-managing-provisioning/constants.ts](app/gcl/professional-cloud-architect/section2-managing-provisioning/constants.ts)
- [app/gcl/professional-cloud-architect/section2-managing-provisioning/page.css](app/gcl/professional-cloud-architect/section2-managing-provisioning/page.css)
- [`__tests__/gcl/professional-cloud-architect/section2-managing-provisioning/page.test.tsx`](__tests__/gcl/professional-cloud-architect/section2-managing-provisioning/page.test.tsx)
- [docs/migration-inventory/pca-section2-managing-provisioning.json](docs/migration-inventory/pca-section2-managing-provisioning.json)
- [archive/Gcl/Professional-Cloud-Architect/Gcp-pca-section2-managing-provisioning.html](archive/Gcl/Professional-Cloud-Architect/Gcp-pca-section2-managing-provisioning.html)
- [archive/Gcl/Professional-Cloud-Architect/Gcp-pca-section2-managing-provisioning.md](archive/Gcl/Professional-Cloud-Architect/Gcp-pca-section2-managing-provisioning.md)

---

## 2026-08-22: Google Cloud Professional Cloud Architect (PCA) Section 1: 設計と計画 完全ガイド 100%全量移行 (完了)

### 目的

`Gcp-pca-section1-design-planning.html` および `Gcp-pca-section1-design-planning.md` を、Next.js App Router 5ファイル構成 (`page.tsx`, `PcaSection1Guide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/gcl/professional-cloud-architect/section1-design-planning` ルートへ移行。見出し(h1:1, h2:10, h3:33, h4:9)、全14個のテーブル、17個のMermaid図解、全リスト、全外部リンク(110件)・全本文・コールアウト注記・脚注を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for pca-section1-design-planning` (`bdef5a8`)
- [x] **Step 1 (Red)**: `test(gcl): add failing tests for pca-section1-design-planning` (`dcc24b9`)
- [x] **Step 2 (Green)**: `feat(gcl): implement pca-section1-design-planning to pass tests` (`1de7252`)
- [x] **Step 3 (Refactor)**: `refactor(gcl): integrate pca-section1-design-planning into routing and update docs` (`beba48a`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — pca section 1 complete`

### 関連ファイル

- [app/gcl/professional-cloud-architect/section1-design-planning/page.tsx](app/gcl/professional-cloud-architect/section1-design-planning/page.tsx)
- [app/gcl/professional-cloud-architect/section1-design-planning/PcaSection1Guide.tsx](app/gcl/professional-cloud-architect/section1-design-planning/PcaSection1Guide.tsx)
- [app/gcl/professional-cloud-architect/section1-design-planning/NavBar.tsx](app/gcl/professional-cloud-architect/section1-design-planning/NavBar.tsx)
- [app/gcl/professional-cloud-architect/section1-design-planning/constants.ts](app/gcl/professional-cloud-architect/section1-design-planning/constants.ts)
- [app/gcl/professional-cloud-architect/section1-design-planning/page.css](app/gcl/professional-cloud-architect/section1-design-planning/page.css)
- [`__tests__/gcl/professional-cloud-architect/section1-design-planning/page.test.tsx`](__tests__/gcl/professional-cloud-architect/section1-design-planning/page.test.tsx)
- [docs/migration-inventory/pca-section1-design-planning.json](docs/migration-inventory/pca-section1-design-planning.json)
- [archive/Gcl/Professional-Cloud-Architect/Gcp-pca-section1-design-planning.html](archive/Gcl/Professional-Cloud-Architect/Gcp-pca-section1-design-planning.html)
- [archive/Gcl/Professional-Cloud-Architect/Gcp-pca-section1-design-planning.md](archive/Gcl/Professional-Cloud-Architect/Gcp-pca-section1-design-planning.md)

---

## 2026-08-22: Google Cloud Professional Cloud Architect (PCA) 認定試験 完全対策ガイド 100%全量移行 (完了)

### 目的

`Google-cloud-pca-guide.html` および `Google-cloud-pca-guide.md` を、Next.js App Router 5ファイル構成 (`page.tsx`, `PcaGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/gcl/professional-cloud-architect` ルートへ移行。見出し(h1:1, h2:10, h3:32, h4:0)、全25個のテーブル、17個のMermaid図解、全リスト、全外部リンク・全本文・コールアウト注記を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for professional-cloud-architect` (`93de503`)
- [x] **Step 1 (Red)**: `test(gcl): add failing tests for professional-cloud-architect` (`9c5b68c`)
- [x] **Step 2 (Green)**: `feat(gcl): implement professional-cloud-architect to pass tests` (`2fb8d3b`)
- [x] **Step 3 (Refactor)**: `refactor(gcl): integrate professional-cloud-architect into routing and update docs`
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — professional cloud architect complete`

### 関連ファイル

- [app/gcl/professional-cloud-architect/page.tsx](app/gcl/professional-cloud-architect/page.tsx)
- [app/gcl/professional-cloud-architect/PcaGuide.tsx](app/gcl/professional-cloud-architect/PcaGuide.tsx)
- [app/gcl/professional-cloud-architect/NavBar.tsx](app/gcl/professional-cloud-architect/NavBar.tsx)
- [app/gcl/professional-cloud-architect/constants.ts](app/gcl/professional-cloud-architect/constants.ts)
- [app/gcl/professional-cloud-architect/page.css](app/gcl/professional-cloud-architect/page.css)
- [`__tests__/gcl/professional-cloud-architect/page.test.tsx`](__tests__/gcl/professional-cloud-architect/page.test.tsx)
- [docs/migration-inventory/professional-cloud-architect.json](docs/migration-inventory/professional-cloud-architect.json)
- [archive/Gcl/Professional-Cloud-Architect/Google-cloud-pca-guide.html](archive/Gcl/Professional-Cloud-Architect/Google-cloud-pca-guide.html)
- [archive/Gcl/Professional-Cloud-Architect/Google-cloud-pca-guide.md](archive/Gcl/Professional-Cloud-Architect/Google-cloud-pca-guide.md)

---

## 2026-08-19: CompTIA Network+ Domain 3.0「Network Operations」100%全量移行 (完了)

### 目的

`Comptia-network-plus-network-operations.html` および `Comptia-network-plus-network-operations.md` を、Next.js App Router 5ファイル構成 (`page.tsx`, `ComptiaNetworkOperationsGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/comptia/network-plus/network-operations-guide` ルートへ移行。見出し(h1:1, h2:12, h3:7, h4:0)、全14個のテーブル、10個のMermaid図解、全リスト、全外部リンク・全本文・コールアウト注記を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for comptia-network-plus-network-operations-guide` (`396b915`)
- [x] **Step 1 (Red)**: `test(comptia): add failing tests for comptia network plus network operations guide` (`fea4217`)
- [x] **Step 2 (Green)**: `feat(comptia): implement network operations guide to pass tests` (`d8905b3`)
- [x] **Step 3 (Refactor)**: `refactor(comptia): integrate network operations guide into routing and update docs` (`66333e9`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — comptia network plus network operations complete`

### 関連ファイル

- [app/comptia/network-plus/network-operations-guide/page.tsx](app/comptia/network-plus/network-operations-guide/page.tsx)
- [app/comptia/network-plus/network-operations-guide/ComptiaNetworkOperationsGuide.tsx](app/comptia/network-plus/network-operations-guide/ComptiaNetworkOperationsGuide.tsx)
- [app/comptia/network-plus/network-operations-guide/NavBar.tsx](app/comptia/network-plus/network-operations-guide/NavBar.tsx)
- [app/comptia/network-plus/network-operations-guide/constants.ts](app/comptia/network-plus/network-operations-guide/constants.ts)
- [app/comptia/network-plus/network-operations-guide/page.css](app/comptia/network-plus/network-operations-guide/page.css)
- [`__tests__/comptia/network-plus/network-operations-guide/page.test.tsx`](__tests__/comptia/network-plus/network-operations-guide/page.test.tsx)
- [docs/migration-inventory/comptia-network-plus-network-operations-guide.json](docs/migration-inventory/comptia-network-plus-network-operations-guide.json)
- [archive/Comptia/Network-Plus/Comptia-network-plus-network-operations.html](archive/Comptia/Network-Plus/Comptia-network-plus-network-operations.html)
- [archive/Comptia/Network-Plus/Comptia-network-plus-network-operations.md](archive/Comptia/Network-Plus/Comptia-network-plus-network-operations.md)

---

## 2026-08-19: CompTIA Network+ Domain 1.0「Networking Concepts」100%全量移行 (完了)

### 目的

`Comptia-network-plus-networking-concepts-guide.html` および `Comptia-network-plus-networking-concepts-guide.md` を、Next.js App Router 5ファイル構成 (`page.tsx`, `ComptiaNetworkingConceptsGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/comptia/network-plus/networking-concepts-guide` ルートへ移行。見出し(h1:2, h2:11, h3:40, h4:0)、全24個のテーブル、19個のMermaid図解、全リスト、全外部リンク・全本文・コードブロックを一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for comptia-network-plus-networking-concepts-guide` (`a829feb`)
- [x] **Step 1 (Red)**: `test(comptia): add failing tests for comptia network plus networking concepts guide` (`42f1b80`)
- [x] **Step 2 (Green)**: `feat(comptia): implement networking concepts guide to pass tests` (`a778eab`)
- [x] **Step 3 (Refactor)**: `refactor(comptia): integrate networking concepts guide into routing and update docs` (`4627003`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — comptia network plus networking concepts complete`

### 関連ファイル

- [app/comptia/network-plus/networking-concepts-guide/page.tsx](app/comptia/network-plus/networking-concepts-guide/page.tsx)
- [app/comptia/network-plus/networking-concepts-guide/ComptiaNetworkingConceptsGuide.tsx](app/comptia/network-plus/networking-concepts-guide/ComptiaNetworkingConceptsGuide.tsx)
- [app/comptia/network-plus/networking-concepts-guide/NavBar.tsx](app/comptia/network-plus/networking-concepts-guide/NavBar.tsx)
- [app/comptia/network-plus/networking-concepts-guide/constants.ts](app/comptia/network-plus/networking-concepts-guide/constants.ts)
- [app/comptia/network-plus/networking-concepts-guide/page.css](app/comptia/network-plus/networking-concepts-guide/page.css)
- [`__tests__/comptia/network-plus/networking-concepts-guide/page.test.tsx`](__tests__/comptia/network-plus/networking-concepts-guide/page.test.tsx)
- [docs/migration-inventory/comptia-network-plus-networking-concepts-guide.json](docs/migration-inventory/comptia-network-plus-networking-concepts-guide.json)
- [archive/Comptia/Network-Plus/Comptia-network-plus-networking-concepts-guide.html](archive/Comptia/Network-Plus/Comptia-network-plus-networking-concepts-guide.html)
- [archive/Comptia/Network-Plus/Comptia-network-plus-networking-concepts-guide.md](archive/Comptia/Network-Plus/Comptia-network-plus-networking-concepts-guide.md)

---

## 2026-08-16: PCNE Section 6「ネットワーク操作と監視」100%全量移行 (完了)

### 目的

`S6-network-ops-monitoring.html` および `S6-network-ops-monitoring.md` を、Next.js App Router 5ファイル構成 (`page.tsx`, `PcneSection6NetworkOpsMonitoringGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/gcl/professional-cloud-network-engineer/section6-network-ops-monitoring` ルートへ移行。見出し(h1:1, h2:7, h3:24, h4:14)、全7個のテーブル、20個のMermaid図解、全リスト、全外部リンク・全本文・注釈を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for pcne-s6-network-ops-monitoring` (`7b5be75`)
- [x] **Step 1 (Red)**: `test(pcne): add failing tests for pcne section 6 network ops monitoring` (`9871b99`)
- [x] **Step 2 (Green)**: `feat(pcne): implement section 6 network ops monitoring guide to pass tests` (`36319f9`)
- [x] **Step 3 (Refactor)**: `refactor(pcne): integrate section 6 into routing and update docs` (`3d5683d`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — pcne section 6 complete`

### 関連ファイル

- [app/gcl/professional-cloud-network-engineer/section6-network-ops-monitoring/page.tsx](app/gcl/professional-cloud-network-engineer/section6-network-ops-monitoring/page.tsx)
- [app/gcl/professional-cloud-network-engineer/section6-network-ops-monitoring/PcneSection6NetworkOpsMonitoringGuide.tsx](app/gcl/professional-cloud-network-engineer/section6-network-ops-monitoring/PcneSection6NetworkOpsMonitoringGuide.tsx)
- [app/gcl/professional-cloud-network-engineer/section6-network-ops-monitoring/NavBar.tsx](app/gcl/professional-cloud-network-engineer/section6-network-ops-monitoring/NavBar.tsx)
- [app/gcl/professional-cloud-network-engineer/section6-network-ops-monitoring/constants.ts](app/gcl/professional-cloud-network-engineer/section6-network-ops-monitoring/constants.ts)
- [app/gcl/professional-cloud-network-engineer/section6-network-ops-monitoring/page.css](app/gcl/professional-cloud-network-engineer/section6-network-ops-monitoring/page.css)
- [`__tests__/gcl/professional-cloud-network-engineer/section6-network-ops-monitoring/page.test.tsx`](__tests__/gcl/professional-cloud-network-engineer/section6-network-ops-monitoring/page.test.tsx)
- [docs/migration-inventory/pcne-s6-network-ops-monitoring.json](docs/migration-inventory/pcne-s6-network-ops-monitoring.json)
- [archive/Gcl/Professional-Cloud-Network-Engineer/S6-network-ops-monitoring.html](archive/Gcl/Professional-Cloud-Network-Engineer/S6-network-ops-monitoring.html)
- [archive/Gcl/Professional-Cloud-Network-Engineer/S6-network-ops-monitoring.md](archive/Gcl/Professional-Cloud-Network-Engineer/S6-network-ops-monitoring.md)

---

## 2026-08-16: PCNE Section 4「CDN・DNS・IPアドレス管理」100%全量移行 (完了)

### 目的

`Pcne-s4-cdn-dns-ipam.html` を、Next.js App Router 5ファイル構成 (`page.tsx`, `PcneSection4CdnDnsIpamGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/gcl/professional-cloud-network-engineer/section4-cdn-dns-ipam` ルートへ移行。見出し(h1:1, h2:6, h3:26, h4:7)、全24個のテーブル、20個のMermaid図解、全リスト、全外部リンク・全本文・注釈を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for pcne-s4-cdn-dns-ipam` (`1943e9a`)
- [x] **Step 1 (Red)**: `test(pcne): add failing tests for pcne section 4 cdn dns ipam` (`7adf3e1`)
- [x] **Step 2 (Green)**: `feat(pcne): implement section 4 cdn dns ipam guide to pass tests` (`964d0ec`)
- [x] **Step 3 (Refactor)**: `refactor(pcne): integrate section 4 into routing and update docs` (`24b5651`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — pcne section 4 complete`

### 関連ファイル

- [app/gcl/professional-cloud-network-engineer/section4-cdn-dns-ipam/page.tsx](app/gcl/professional-cloud-network-engineer/section4-cdn-dns-ipam/page.tsx)
- [app/gcl/professional-cloud-network-engineer/section4-cdn-dns-ipam/PcneSection4CdnDnsIpamGuide.tsx](app/gcl/professional-cloud-network-engineer/section4-cdn-dns-ipam/PcneSection4CdnDnsIpamGuide.tsx)
- [app/gcl/professional-cloud-network-engineer/section4-cdn-dns-ipam/NavBar.tsx](app/gcl/professional-cloud-network-engineer/section4-cdn-dns-ipam/NavBar.tsx)
- [app/gcl/professional-cloud-network-engineer/section4-cdn-dns-ipam/constants.ts](app/gcl/professional-cloud-network-engineer/section4-cdn-dns-ipam/constants.ts)
- [app/gcl/professional-cloud-network-engineer/section4-cdn-dns-ipam/page.css](app/gcl/professional-cloud-network-engineer/section4-cdn-dns-ipam/page.css)
- [`__tests__/gcl/professional-cloud-network-engineer/section4-cdn-dns-ipam/page.test.tsx`](__tests__/gcl/professional-cloud-network-engineer/section4-cdn-dns-ipam/page.test.tsx)
- [docs/migration-inventory/pcne-s4-cdn-dns-ipam.json](docs/migration-inventory/pcne-s4-cdn-dns-ipam.json)
- [archive/Gcl/Professional-Cloud-Network-Engineer/Pcne-s4-cdn-dns-ipam.html](archive/Gcl/Professional-Cloud-Network-Engineer/Pcne-s4-cdn-dns-ipam.html)
- [archive/Gcl/Professional-Cloud-Network-Engineer/Pcne-s4-cdn-dns-ipam.md](archive/Gcl/Professional-Cloud-Network-Engineer/Pcne-s4-cdn-dns-ipam.md)

---

## 2026-08-16: PCNE Section 3「ロードバランシングとトラフィック管理」100%全量移行 (完了)

### 目的

`S3-load-balancing-traffic-management.html` を、Next.js App Router 5ファイル構成 (`page.tsx`, `PcneSection3LoadBalancingGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/gcl/professional-cloud-network-engineer/section3-load-balancing` ルートへ移行。見出し(h1:1, h2:8, h3:18)、全7個のテーブル、10個のMermaid図解、全リスト、全外部リンク・全本文・注釈を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for pcne-s3-load-balancing` (`083be34`)
- [x] **Step 1 (Red)**: `test(pcne): add failing tests for pcne section 3 load balancing` (`6b17a61`)
- [x] **Step 2 (Green)**: `feat(pcne): implement section 3 load balancing guide to pass tests` (`9d58aa4`)
- [x] **Step 3 (Refactor)**: `refactor(pcne): integrate section 3 into routing and update docs` (`6b89e70`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — pcne section 3 complete`

### 関連ファイル

- [app/gcl/professional-cloud-network-engineer/section3-load-balancing/page.tsx](app/gcl/professional-cloud-network-engineer/section3-load-balancing/page.tsx)
- [app/gcl/professional-cloud-network-engineer/section3-load-balancing/PcneSection3LoadBalancingGuide.tsx](app/gcl/professional-cloud-network-engineer/section3-load-balancing/PcneSection3LoadBalancingGuide.tsx)
- [app/gcl/professional-cloud-network-engineer/section3-load-balancing/NavBar.tsx](app/gcl/professional-cloud-network-engineer/section3-load-balancing/NavBar.tsx)
- [app/gcl/professional-cloud-network-engineer/section3-load-balancing/constants.ts](app/gcl/professional-cloud-network-engineer/section3-load-balancing/constants.ts)
- [app/gcl/professional-cloud-network-engineer/section3-load-balancing/page.css](app/gcl/professional-cloud-network-engineer/section3-load-balancing/page.css)
- [`__tests__/gcl/professional-cloud-network-engineer/section3-load-balancing/page.test.tsx`](__tests__/gcl/professional-cloud-network-engineer/section3-load-balancing/page.test.tsx)
- [docs/migration-inventory/pcne-s3-load-balancing.json](docs/migration-inventory/pcne-s3-load-balancing.json)
- [archive/Gcl/Professional-Cloud-Network-Engineer/S3-load-balancing-traffic-management.html](archive/Gcl/Professional-Cloud-Network-Engineer/S3-load-balancing-traffic-management.html)
- [archive/Gcl/Professional-Cloud-Network-Engineer/S3-load-balancing-traffic-management.md](archive/Gcl/Professional-Cloud-Network-Engineer/S3-load-balancing-traffic-management.md)

---

## 2026-08-16: PCNE Section 5「ネットワークセキュリティの設計と実装」100%全量移行 (完了)

### 目的

`Gcp-pcne-s5-network-security.html` を、Next.js App Router 5ファイル構成 (`page.tsx`, `PcneSection5NetworkSecurityGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/gcl/professional-cloud-network-engineer/section5-network-security` ルートへ移行。見出し(h1:1, h2:7, h3:30, h4:11)、全30個のテーブル、17個のMermaid図解、全リスト、全外部リンク・全本文・注釈を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for pcne-s5-network-security` (`cbb5b4d`)
- [x] **Step 1 (Red)**: `test(pcne): add failing tests for pcne section 5 network security` (`c8d8e09`)
- [x] **Step 2 (Green)**: `feat(pcne): implement section 5 network security guide to pass tests` (`0d6e834`)
- [x] **Step 3 (Refactor)**: `refactor(pcne): integrate section 5 into routing and update docs` (`f3951c8`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — pcne section 5 complete`

### 関連ファイル

- [app/gcl/professional-cloud-network-engineer/section5-network-security/page.tsx](app/gcl/professional-cloud-network-engineer/section5-network-security/page.tsx)
- [app/gcl/professional-cloud-network-engineer/section5-network-security/PcneSection5NetworkSecurityGuide.tsx](app/gcl/professional-cloud-network-engineer/section5-network-security/PcneSection5NetworkSecurityGuide.tsx)
- [app/gcl/professional-cloud-network-engineer/section5-network-security/NavBar.tsx](app/gcl/professional-cloud-network-engineer/section5-network-security/NavBar.tsx)
- [app/gcl/professional-cloud-network-engineer/section5-network-security/constants.ts](app/gcl/professional-cloud-network-engineer/section5-network-security/constants.ts)
- [app/gcl/professional-cloud-network-engineer/section5-network-security/page.css](app/gcl/professional-cloud-network-engineer/section5-network-security/page.css)
- [`__tests__/gcl/professional-cloud-network-engineer/section5-network-security/page.test.tsx`](__tests__/gcl/professional-cloud-network-engineer/section5-network-security/page.test.tsx)
- [docs/migration-inventory/pcne-s5-network-security.json](docs/migration-inventory/pcne-s5-network-security.json)
- [archive/Gcl/Professional-Cloud-Network-Engineer/Gcp-pcne-s5-network-security.html](archive/Gcl/Professional-Cloud-Network-Engineer/Gcp-pcne-s5-network-security.html)
- [archive/Gcl/Professional-Cloud-Network-Engineer/Gcp-pcne-s5-network-security.md](archive/Gcl/Professional-Cloud-Network-Engineer/Gcp-pcne-s5-network-security.md)

---

## 2026-08-15: AGWA Section 5「ブラウザとエンドポイントの管理」100%全量移行 (完了)

### 目的

`Agwa-s5-browsers-endpoints.html` を、Next.js App Router 5ファイル構成 (`page.tsx`, `AgwaSection5Guide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/gcl/agwa/section5` ルートへ移行。見出し(h1:1, h2:5, h3:11, h4:16)、全4個のテーブル、10個のMermaid図解、全リスト、全外部リンク・本文・注釈を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for agwa-s5-browsers-endpoints` (`17f26d4`)
- [x] **Step 1 (Red)**: `test(agwa): add failing tests for agwa section 5` (`a2f2542`)
- [x] **Step 2 (Green)**: `feat(agwa): implement section 5 browsers and endpoints guide to pass tests` (`a81f7b2`)
- [x] **Step 3 (Refactor)**: `refactor(agwa): integrate section 5 into routing and update docs` (`349aaa7`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — agwa section 5 complete`

### 関連ファイル

- [app/gcl/agwa/section5/page.tsx](app/gcl/agwa/section5/page.tsx)
- [app/gcl/agwa/section5/AgwaSection5Guide.tsx](app/gcl/agwa/section5/AgwaSection5Guide.tsx)
- [app/gcl/agwa/section5/NavBar.tsx](app/gcl/agwa/section5/NavBar.tsx)
- [app/gcl/agwa/section5/constants.ts](app/gcl/agwa/section5/constants.ts)
- [app/gcl/agwa/section5/page.css](app/gcl/agwa/section5/page.css)
- [`__tests__/gcl/agwa/section5/page.test.tsx`](__tests__/gcl/agwa/section5/page.test.tsx)
- [docs/migration-inventory/agwa-s5-browsers-endpoints.json](docs/migration-inventory/agwa-s5-browsers-endpoints.json)
- [archive/Gcl/Associate-Google-Workspace-Administrator/html/Agwa-s5-browsers-endpoints.html](archive/Gcl/Associate-Google-Workspace-Administrator/html/Agwa-s5-browsers-endpoints.html)
- [archive/Gcl/Associate-Google-Workspace-Administrator/md/Agwa-s5-browsers-endpoints.md](archive/Gcl/Associate-Google-Workspace-Administrator/md/Agwa-s5-browsers-endpoints.md)

---

## 2026-08-14: AGWA Section 4「セキュリティポリシーとアクセス制御の管理」100%全量移行 (完了)

### 目的

`S4-security-access-control.html` を、Next.js App Router 5ファイル構成 (`page.tsx`, `AgwaSection4Guide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/gcl/agwa/section4` ルートへ移行。見出し(h1:1, h2:6, h3:20, h4:53)、全20個のテーブル、10個のMermaid図解、全71要素のリスト、全外部リンク・本文・注釈を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for agwa-section4` (`be48454`)
- [x] **Step 1 (Red)**: `test(gcl): add failing tests for agwa-section4` (`df2f55f`)
- [x] **Step 2 (Green)**: `feat(gcl): implement agwa-section4 to pass tests` (`83c9f88`)
- [x] **Step 3 (Refactor)**: `refactor(gcl): integrate agwa-section4 into routing and update docs` (`b20096c`)
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — migrate S4-security-access-control.html to Next.js`

### 関連ファイル

- [app/gcl/agwa/section4/page.tsx](app/gcl/agwa/section4/page.tsx)
- [app/gcl/agwa/section4/AgwaSection4Guide.tsx](app/gcl/agwa/section4/AgwaSection4Guide.tsx)
- [app/gcl/agwa/section4/NavBar.tsx](app/gcl/agwa/section4/NavBar.tsx)
- [app/gcl/agwa/section4/constants.ts](app/gcl/agwa/section4/constants.ts)
- [app/gcl/agwa/section4/page.css](app/gcl/agwa/section4/page.css)
- [`__tests__/gcl/agwa/section4/page.test.tsx`](__tests__/gcl/agwa/section4/page.test.tsx)
- [docs/migration-inventory/agwa-section4.json](docs/migration-inventory/agwa-section4.json)
- [archive/Gcl_Archive/Associate-Google-Workspace-Administrator/html/S4-security-access-control.html](archive/Gcl_Archive/Associate-Google-Workspace-Administrator/html/S4-security-access-control.html)

---

<!-- markdownlint-disable MD050 -->

HTMLファイルから Next.js / React コンポーネントへの移行作業の進捗と引き継ぎコンテキストを管理する**統合ファイル（Single Source of Truth）**です。

## 現在地

- **ブランチ:** dev
- **最新完了タスク:** AGWA Section 2〜6・共通コンポーネント・教材レビュー指摘対応完了
- **最終更新日時(UTC):** 2026-08-15T01:54:24Z

## 2026-08-15: AGWA Section 2〜6・教材レビュー指摘対応 (完了)

- [x] **共通テスト契約:** Mermaid の `min-width` リセット、モックの図ロール、Section 5 テーブル構造検証を追加（`7a4de72`）。
- [x] **ナビゲーション:** Section 2/4 の最下部 active 補正と Section 5 のモバイル目次・`NAV_ITEMS` 正本化を実装（`6db863b`）。
- [x] **Section 6:** 本文コンポーネントを `components/sections/` へ移し、CSS Modules とグローバル色トークンへ移行（`105d89c`）。
- [x] **教材:** AGWA の Vault・DLP・MX・Data regions・権限・安全なCSV例と、PCA のネットワーク・ストレージ・Cloud Run記述を公式資料に合わせて更新（`2341fe8`, `725cd2a`）。
- [x] **検証:** 2026-08-15T03:13:14Z に対象コミット `9ddf12a` を全体スコープで検証し、`bun run test` は131ファイル・1118件成功、`bun run lint` も成功。対象Markdown lintは0件。ユーザー指示に従いビルドと目視確認は未実施。

## 2026-08-14: AGWA Section 1〜4 レビュー指摘対応 (完了)

- [x] **テスト検証基盤:** Section 3 テストを正規配置へ移動し、移行抽出ヘルパーと Mermaid モックを共通化 (`5740b43`)。
- [x] **ナビゲーション:** Section 1〜4 の目次データ、IntersectionObserver、モバイル状態、フォーカス・URL履歴を改善 (`7df21cf`)。
- [x] **インベントリ:** Section 3 の9テーブルについて列見出し数を厳密化し、生成処理とテストの抽出ロジックを共有 (`0a7e24a`)。
- [x] **CSS:** サイドバー幅、非推奨宣言、Section 2 重複定義、Section 3 CSS Modules、Section 4 Mermaid セレクタを整理 (`5bf90b5`)。
- [x] **検証:** 2026-08-14T16:50:02Z に対象コミット `5bf90b5` を全体スコープで検証し、`bun run test` は127ファイル・1099件成功、`bun run lint` も成功。後続のサンドボックス実行は条件が異なるため `docs/TEST_COVERAGE_PROGRESS.md` に別記。ユーザー指示に従いビルドと目視確認は未実施。

## 2026-08-15: AGWA Section 1「ユーザーアカウント・ドメイン・ディレクトリの管理」100%全量移行 (完了)

### 目的

`Associate-google-workspace-admin-s1.html` を、Next.js App Router 構成 (`page.tsx`, `AgwaSection1Guide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/gcl/agwa/section1` ルートへ移行。見出し(h1:1, h2:9, h3:19, h4:5)、全テーブル、10個のMermaid図解、全外部リンク・全本文・注釈を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- **Step 0 — Inventory:** `docs/migration-inventory/agwa-section1.json` を生成・保存 (`6c1427f`)。
- **Step 1 — Red (失敗テスト):** `__tests__/gcl/agwa/section1/page.test.tsx` を作成し、全要素（見出し・本文・表セル・リスト・外部リンク・Mermaid図・コードブロック）のアサーションで失敗を確認 (`8f4f8a1`)。
- **Step 2 — Green (実装):** `app/gcl/agwa/section1/` 配下を実装・修正し、13件全テストのPASSを確認 (`23a5efb`)。
- **Step 3 — Refactor:** `app/constants.ts` ルーティング統合 (`pct: '20%'`) を完了。

## 2026-08-14: AGWA Section 3「データガバナンスとコンプライアンスの管理」100%全量移行 (完了)

### 目的

`Agwa-section3-data-governance.html` を、Next.js App Router 5ファイル構成 (`page.tsx`, `AgwaSection3Guide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/gcl/agwa/section3` ルートへ移行。見出し(h1:1, h2:8, h3:27, h4:6)、全9個のテーブル、10個のMermaid図解、全外部リンク・全本文・注釈を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for agwa-section3-data-governance`
- [x] **Step 1 (Red)**: `test(gcl): add failing tests for agwa-section3-data-governance`
- [x] **Step 2 (Green)**: `feat(gcl): implement agwa-section3-data-governance to pass tests`
- [x] **Step 3 (Refactor)**: `refactor(gcl): integrate agwa-section3-data-governance into routing and update docs`
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — migrate Agwa-section3-data-governance.html to Next.js`

### 関連ファイル

- [app/gcl/agwa/section3/page.tsx](app/gcl/agwa/section3/page.tsx)
- [app/gcl/agwa/section3/AgwaSection3Guide.tsx](app/gcl/agwa/section3/AgwaSection3Guide.tsx)
- [app/gcl/agwa/section3/NavBar.tsx](app/gcl/agwa/section3/NavBar.tsx)
- [app/gcl/agwa/section3/constants.ts](app/gcl/agwa/section3/constants.ts)
- [app/gcl/agwa/section3/page.css](app/gcl/agwa/section3/page.css)
- [__tests__/gcl/agwa-section3-data-governance/page.test.tsx](__tests__/gcl/agwa-section3-data-governance/page.test.tsx)
- [docs/migration-inventory/agwa-section3-data-governance.json](docs/migration-inventory/agwa-section3-data-governance.json)
- [archive/Gcl_Archive/Associate-Google-Workspace-Administrator/html/Agwa-section3-data-governance.html](archive/Gcl_Archive/Associate-Google-Workspace-Administrator/html/Agwa-section3-data-governance.html)
- [archive/Gcl_Archive/Associate-Google-Workspace-Administrator/md/Agwa-section3-data-governance.md](archive/Gcl_Archive/Associate-Google-Workspace-Administrator/md/Agwa-section3-data-governance.md)

## 2026-08-14: AGWA Section 2「コアWorkspaceサービスの管理」100%全量移行 (完了)

### 目的

`Agwa-section2.html` を、Next.js App Router 5ファイル構成 (`page.tsx`, `AgwaSection2Guide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/gcl/agwa/section2` ルートへ移行。見出し(h1:1, h2:11, h3:50)、全16個のテーブル、13個のMermaid図解、全外部リンク・全本文・注釈を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for agwa-section2`
- [x] **Step 1 (Red)**: `test(gcl): add failing tests for agwa-section2`
- [x] **Step 2 (Green)**: `feat(gcl): implement agwa-section2 to pass tests`
- [x] **Step 3 (Refactor)**: `refactor(gcl): integrate agwa-section2 into routing and update docs`
- [x] **Step 4 (Archive & Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — migrate Agwa-section2.html to Next.js`

### 関連ファイル

- [app/gcl/agwa/section2/page.tsx](app/gcl/agwa/section2/page.tsx)
- [app/gcl/agwa/section2/AgwaSection2Guide.tsx](app/gcl/agwa/section2/AgwaSection2Guide.tsx)
- [app/gcl/agwa/section2/NavBar.tsx](app/gcl/agwa/section2/NavBar.tsx)
- [app/gcl/agwa/section2/constants.ts](app/gcl/agwa/section2/constants.ts)
- [app/gcl/agwa/section2/page.css](app/gcl/agwa/section2/page.css)
- [__tests__/gcl/agwa/section2.test.tsx](__tests__/gcl/agwa/section2.test.tsx)
- [docs/migration-inventory/agwa-section2.json](docs/migration-inventory/agwa-section2.json)
- [archive/Gcl_Archive/Associate-Google-Workspace-Administrator/html/Agwa-section2.html](archive/Gcl_Archive/Associate-Google-Workspace-Administrator/html/Agwa-section2.html)

## 2026-08-14: Google Cloud「PCNE Section 2: VPCネットワークの実装 完全ガイド」100%全量移行・デザイン完全復元 (完了)

### 目的

`Pcne-s2-vpc-implementation.html` を、Next.js App Router 5ファイル構成 (`page.tsx`, `PcneSection2VpcImplementationGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/gcl/professional-cloud-network-engineer/section2-vpc-implementation` ルートへ移行。全9セクションの見出し(h1:1, h2:8, h3:23)、全10個のテーブル、17個のMermaid図解、全外部リンクを一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for pcne-s2-vpc-implementation` (`f40abbc`)
- [x] **Step 1 (Red)**: `test(pcne): add failing tests for section2-vpc-implementation` (`2285158`)
- [x] **Step 2 (Green)**: `feat(pcne): implement section2-vpc-implementation to pass tests` (`d0333e0`), `fix(pcne): restore 100% exact visual design and CSS variables for section2-vpc-implementation` (`c8f9c3d`), `fix(pcne): ensure h3 accent title color and sidebar nav-h2 hierarchy matching original design` (`eddce49`), `fix(pcne): implement interactive checklist state and counter for section2-vpc-implementation` (`59fdadf`), `fix(pcne): format --nomasq-all-reserved-ranges in checklist item with code tag` (`0d497dd`), `fix(pcne): wrap checklist text in flex span to fix checkbox visibility and code tag inline layout` (`30db6ae`) & `fix(pcne): replace static checklist HTML with active ChecklistSection component and fix line-through state` (`bdd4568`)
- [x] **Step 3 (Refactor / Integration & Nav & Docs)**: `refactor(pcne): integrate section2-vpc-implementation into routing and update docs` (`732cf94`)
- [x] **Step 4 (Archive & Sync)**: 元HTMLを `archive/Gcl_Archive/Professional-Cloud-Network-Engineer/` へ移動し `MIGRATION_PROGRESS.md` を同期

### 関連ファイル

- [app/gcl/professional-cloud-network-engineer/section2-vpc-implementation/page.tsx](app/gcl/professional-cloud-network-engineer/section2-vpc-implementation/page.tsx)
- [app/gcl/professional-cloud-network-engineer/section2-vpc-implementation/PcneSection2VpcImplementationGuide.tsx](app/gcl/professional-cloud-network-engineer/section2-vpc-implementation/PcneSection2VpcImplementationGuide.tsx)
- [app/gcl/professional-cloud-network-engineer/section2-vpc-implementation/NavBar.tsx](app/gcl/professional-cloud-network-engineer/section2-vpc-implementation/NavBar.tsx)
- [app/gcl/professional-cloud-network-engineer/section2-vpc-implementation/constants.ts](app/gcl/professional-cloud-network-engineer/section2-vpc-implementation/constants.ts)
- [app/gcl/professional-cloud-network-engineer/section2-vpc-implementation/page.css](app/gcl/professional-cloud-network-engineer/section2-vpc-implementation/page.css)
- [__tests__/gcl/pcne-section2-vpc-implementation.test.tsx](__tests__/gcl/pcne-section2-vpc-implementation.test.tsx)
- [docs/migration-inventory/pcne-s2-vpc-implementation.json](docs/migration-inventory/pcne-s2-vpc-implementation.json)
- [archive/Gcl_Archive/Professional-Cloud-Network-Engineer/Pcne-s2-vpc-implementation.html](archive/Gcl_Archive/Professional-Cloud-Network-Engineer/Pcne-s2-vpc-implementation.html)

## 2026-08-14: Google Cloud「PCNE Section 1: VPCネットワーク設計 完全ガイド」100%全量移行・デザイン完全復元 (完了)

### 目的

`Pcne-section1-vpc-design.html` および `Pcne-section1-vpc-design.md` を、Next.js App Router 5ファイル構成 (`page.tsx`, `PcneSection1VpcDesignGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/gcl/professional-cloud-network-engineer/section1-vpc-design` ルートへ移行。全10セクションの見出し(h1:1, h2:10, h3:36, h4:5)、全30個のテーブル、31個のMermaid図解、133個の外部リンクを一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for pcne-section1-vpc-design` (`3fa0a19`)
- [x] **Step 1 (Red)**: `test(gcl): add failing tests for pcne section 1 vpc design guide` (`d1ee0fe`)
- [x] **Step 2 (Green)**: `feat(gcl): implement pcne section 1 vpc design guide page to pass tests` (`e8f3929`)
- [x] **Step 3 (Refactor / Integration & Nav & Docs)**: `refactor(gcl): integrate pcne section 1 vpc design guide into routing and update docs` (`58039f1`)
- [x] **Step 4 (Archive & Sync)**: 元HTML/MDを `archive/Gcl_Archive/Professional-Cloud-Network-Engineer/` へ移動し `MIGRATION_PROGRESS.md` を同期

### 関連ファイル

- [app/gcl/professional-cloud-network-engineer/section1-vpc-design/page.tsx](app/gcl/professional-cloud-network-engineer/section1-vpc-design/page.tsx)
- [app/gcl/professional-cloud-network-engineer/section1-vpc-design/PcneSection1VpcDesignGuide.tsx](app/gcl/professional-cloud-network-engineer/section1-vpc-design/PcneSection1VpcDesignGuide.tsx)
- [app/gcl/professional-cloud-network-engineer/section1-vpc-design/NavBar.tsx](app/gcl/professional-cloud-network-engineer/section1-vpc-design/NavBar.tsx)
- [app/gcl/professional-cloud-network-engineer/section1-vpc-design/constants.ts](app/gcl/professional-cloud-network-engineer/section1-vpc-design/constants.ts)
- [app/gcl/professional-cloud-network-engineer/section1-vpc-design/page.css](app/gcl/professional-cloud-network-engineer/section1-vpc-design/page.css)
- [__tests__/gcl/pcne-section1-vpc-design.test.tsx](__tests__/gcl/pcne-section1-vpc-design.test.tsx)
- [docs/migration-inventory/pcne-section1-vpc-design.json](docs/migration-inventory/pcne-section1-vpc-design.json)
- [archive/Gcl_Archive/Professional-Cloud-Network-Engineer/Pcne-section1-vpc-design.html](archive/Gcl_Archive/Professional-Cloud-Network-Engineer/Pcne-section1-vpc-design.html)
- [archive/Gcl_Archive/Professional-Cloud-Network-Engineer/Pcne-section1-vpc-design.md](archive/Gcl_Archive/Professional-Cloud-Network-Engineer/Pcne-section1-vpc-design.md)

## 2026-08-13: CompTIA「CompTIA Network+ (N10-009 / V9) 完全ガイド」100%全量移行・デザイン完全復元 (完了)

### 目的

`Comptia-network-plus-guide.html` および `Comptia-network-plus-guide.md` を、Next.js App Router 5ファイル構成 (`page.tsx`, `ComptiaNetworkPlusGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/comptia/network-plus` ルートへ移行。全13セクションの見出し、全6個のテーブルセルテキスト、4個のMermaid図解、4個のコールアウト、4つの情報カード (`stat-grid`)、5つのドメインカード (`domain-card`)、参考文献カード (`ref-box`)、および Tabler Icons アイコン群を一切の省略・漏れなく100%完全移植。

### 完了済みステップ

- [x] **Step 0 (Inventory)**: `chore(migration): add content inventory for comptia-network-plus-guide` (`4924bdd`)
- [x] **Step 1 (Red)**: `test(comptia): add failing tests for comptia network plus guide migration` (`b56f078` / `17b2753`)
- [x] **Step 2 (Green)**: `feat(comptia): implement comptia network plus guide page components to pass tests` (`b1f15c5` / `04a29e8`)
- [x] **Step 3 (Refactor / Integration & Nav & Docs)**: `refactor(comptia): integrate comptia network plus guide into routing and update docs` (`0643cfa`)
- [x] **Step 4 (Archive & Sync)**: 元HTML/MDを `archive/CompTIA/html/` および `archive/CompTIA/md/` へ移動し `MIGRATION_PROGRESS.md` を同期 (`0fece63`)

### 関連ファイル

- [app/comptia/network-plus/page.tsx](app/comptia/network-plus/page.tsx)
- [app/comptia/network-plus/ComptiaNetworkPlusGuide.tsx](app/comptia/network-plus/ComptiaNetworkPlusGuide.tsx)
- [app/comptia/network-plus/NavBar.tsx](app/comptia/network-plus/NavBar.tsx)
- [app/comptia/network-plus/constants.ts](app/comptia/network-plus/constants.ts)
- [app/comptia/network-plus/page.css](app/comptia/network-plus/page.css)
- [__tests__/comptia/network-plus-guide.test.tsx](__tests__/comptia/network-plus-guide.test.tsx)
- [docs/migration-inventory/comptia-network-plus-guide.json](docs/migration-inventory/comptia-network-plus-guide.json)
- [archive/CompTIA/html/Comptia-network-plus-guide.html](archive/CompTIA/html/Comptia-network-plus-guide.html)
- [archive/CompTIA/md/Comptia-network-plus-guide.md](archive/CompTIA/md/Comptia-network-plus-guide.md)

## 2026-08-13: レビュー追補の認可・インベントリ・Drive復元修正（完了）

- [x] **Commit authorization**: Step 5 / 6の認可確認をステージ前へ移し、拒否時にindexを汚さないフローへ修正（`71a03d2`）。
- [x] **Migration inventory**: 本文順序、注釈、画像alt、コード全文、表ヘッダー、コード行、全図形式とa11y契約を厳密検証し、入力元をリポジトリ相対パスへ正規化。3ミラーを同期（`461f071`）。
- [x] **AGWA Section 6**: My Drive、共有ドライブ内ファイル、削除済み共有ドライブの復元経路・期限・所有権モデルを分離し、状態図・総括・チェックリストを同期（`3dbc0fa`）。
- [x] **Validation**: 全体ESLint、対象Markdown lint、3ミラーの完全一致、インベントリスクリプトの相対パス出力とリポジトリ外入力拒否、Agwa-section6.md内Mermaid 10ブロックの構文解析に成功。E2E、Visualテスト、ビルドは未実施。

## 2026-08-13: レビュー指摘のテスト・ワークフロー・ガイド修正（完了）

- [x] **Test quality**: ワークスペース読込ヘルパーへJSDocを追加し、エージェントミラーをUTF-8文字列ではなくraw Bufferで比較。
- [x] **Agent workflow**: インベントリ実行をbunへ統一し、DOM要素・リンク集合・コードブロック件数・`preserveNaturalScale` の検証を厳密化。Step 5 / 6へコミット認可ガードを追加し、3系統を同期。
- [x] **AGWA Section 6**: Status Dashboard、Drive/Gmail復元、Meet匿名参加の説明をGoogle公式資料に合わせ、MD022 / MD047を解消。
- [x] **Chrome Enterprise Premium guide**: Owner / EditorのIAP自動アクセス前提を削除し、Owner / Tester双方のロール付与手順をHTML/Markdownで同期。CDN4資産へSRIを追加。
- [x] **Validation**: 対象Vitest 35件・94件、全体ESLint、対象Markdown lint、CDN4資産のSHA-384照合は成功。全体Vitestは987件成功、既知のスモーク期待値1件とサンドボックスの`window.localStorage`不備30件が失敗。`npm run test:e2e`、Visualテスト、ビルドは未実施。

## 2026-08-12: レビュー指摘のホーム/Cisco/ADKガイド改善（対象検証完了）

- [x] **Home**: URL重複除外テストデータをカタログ順非依存にし、Hero / ExamCard / ExamCatalog / Statsを`components/sections/home/`へ分割。
- [x] **Cisco content / layout**: CCNP Automationの現行Automation Specialist名称へ統一し、固定280pxサイドバーを除いた残り幅をメイン領域が使用する契約へ修正。
- [x] **Theme / CSS Modules**: CCNA Network Fundamentals / DevNet Associate / DevNet Professionalのテーマトークンを`app/globals.css`へ集約し、各stylesheetのローカルcustom propertyを撤去。
- [x] **ADK guide**: Python 3.10ゲート、`google-adk>=1.17.0,<2.0.0`、一意なセッションIDを再利用する本番ストリーミングAPI検証手順を追加。
- [x] **Coverage dashboard**: `readFile` / `readFileSync` 呼び出しだけを参照として抽出し、`components/` のCSSと3つの共通正準対象を集計してHTMLを再生成。
- [x] **Home constants**: `cardColorMap`、`providerMeta`、`providerOrder` を `app/constants.ts` に集約し、旧 `components/sections/home/config.ts` を削除。
- [x] **Validation**: 対象Vitest 112件とESLintは成功。全体Vitestは952件成功、既知のスモーク期待値1件とサンドボックスの `window.localStorage` 不備30件が失敗。ビルドとVisualテストは未実施。

## 2026-08-12: Cisco「Cisco Certified DevNet Professional 認定 徹底解説ガイド」100%全量移行 (完了)

### 目的

`Cisco-devnet-professional-guide.html` および `Cisco-devnet-professional-guide.md` を、Next.js App Router 5ファイル構成 (`page.tsx`, `DevNetProfessionalGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.module.css`) で `/cisco/devnet-professional` ルートへ移行。全13セクションの見出し、7個のテーブルセルテキスト、6個のMermaid図解、3個のコールアウト、16個の参考文献リンクを一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test: add failing tests for DevNet Professional guide migration` (`4bb2249`)
- [x] **Step 2 (Green)**: `feat: implement DevNet Professional guide page to pass tests` (`cd2d3fb`)
- [x] **Step 3 (Refactor / Integration & Nav & Docs)**: `app/constants.ts`, `CLAUDE.md`, `GEMINI.md` にルーティングを統合し、元ファイル (`HTML`/`MD`) を `archive/Cisco/html/` および `archive/Cisco/md/` へ移動

### 関連ファイル

- [app/cisco/devnet-professional/page.tsx](app/cisco/devnet-professional/page.tsx)
- [app/cisco/devnet-professional/DevNetProfessionalGuide.tsx](app/cisco/devnet-professional/DevNetProfessionalGuide.tsx)
- [app/cisco/devnet-professional/NavBar.tsx](app/cisco/devnet-professional/NavBar.tsx)
- [app/cisco/devnet-professional/constants.ts](app/cisco/devnet-professional/constants.ts)
- [app/cisco/devnet-professional/page.module.css](app/cisco/devnet-professional/page.module.css)
- [__tests__/cisco-devnet-professional.test.tsx](__tests__/cisco-devnet-professional.test.tsx)
- [archive/Cisco/html/Cisco-devnet-professional-guide.html](archive/Cisco/html/Cisco-devnet-professional-guide.html)
- [archive/Cisco/md/Cisco-devnet-professional-guide.md](archive/Cisco/md/Cisco-devnet-professional-guide.md)

## 2026-08-12: Cisco「Cisco Certified DevNet Associate (200-901 / CCNA Automation) 完全対策ガイド」100%全量移行 (完了)

### 目的

`Cisco-devnet-associate-guide.html` および `Cisco-devnet-associate-guide.md` を、Next.js App Router 5ファイル構成 (`page.tsx`, `DevNetAssociateGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.module.css`) で `/cisco/devnet-associate` ルートへ移行。全12セクションの見出し、11個のテーブルセルテキスト、4個のMermaid図解、3個のコールアウト、13個の参考文献リンクを一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(cisco): add failing tests for Cisco DevNet Associate guide migration` (`bae73c6`)
- [x] **Step 2 (Green)**: `feat(cisco): implement Cisco DevNet Associate guide page to pass tests` (`784f400`)
- [x] **Step 3 (Refactor / Integration & Nav & Docs)**: `app/constants.ts`, `CLAUDE.md`, `GEMINI.md` にルーティングを統合し、元ファイル (`HTML`/`MD`) を `archive/Cisco/html/devnet/` および `archive/Cisco/md/devnet/` へ移動

### 関連ファイル

- [app/cisco/devnet-associate/page.tsx](app/cisco/devnet-associate/page.tsx)
- [app/cisco/devnet-associate/DevNetAssociateGuide.tsx](app/cisco/devnet-associate/DevNetAssociateGuide.tsx)
- [app/cisco/devnet-associate/NavBar.tsx](app/cisco/devnet-associate/NavBar.tsx)
- [app/cisco/devnet-associate/constants.ts](app/cisco/devnet-associate/constants.ts)
- [app/cisco/devnet-associate/page.module.css](app/cisco/devnet-associate/page.module.css)
- [__tests__/cisco-devnet-associate-guide.test.tsx](__tests__/cisco-devnet-associate-guide.test.tsx)
- [archive/Cisco/html/devnet/Cisco-devnet-associate-guide.html](archive/Cisco/html/devnet/Cisco-devnet-associate-guide.html)
- [archive/Cisco/md/devnet/Cisco-devnet-associate-guide.md](archive/Cisco/md/devnet/Cisco-devnet-associate-guide.md)

## 2026-08-12: Cisco「CCNA 200-301 Network Fundamentals ネットワークの基礎 入門ガイド」100%全量移行 (完了)

### 目的

`Ccna-network-fundamentals-guide.html` および `Ccna-network-fundamentals-guide.md` を、Next.js App Router 5ファイル構成 (`page.tsx`, `CcnaNetworkFundamentalsGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/cisco/ccna/network-fundamentals-guide` ルートへ移行。文章・全10章・10個のMermaid図・表・コードブロック・参考文献を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test: add failing tests for CCNA network fundamentals guide` (`56db16b`)
- [x] **Step 2 (Green)**: `feat: implement CCNA network fundamentals guide page and components` (`416fa0c`)
- [x] **Step 3 (Refactor / Integration & Nav & Docs)**: `app/constants.ts`, `CLAUDE.md`, `GEMINI.md` にルーティングを統合し、元ファイル (`HTML`/`MD`) を `archive/Cisco/html/ccna/` および `archive/Cisco/md/ccna/` へ移動

### 関連ファイル

- [app/cisco/ccna/network-fundamentals-guide/page.tsx](app/cisco/ccna/network-fundamentals-guide/page.tsx)
- [app/cisco/ccna/network-fundamentals-guide/CcnaNetworkFundamentalsGuide.tsx](app/cisco/ccna/network-fundamentals-guide/CcnaNetworkFundamentalsGuide.tsx)
- [app/cisco/ccna/network-fundamentals-guide/NavBar.tsx](app/cisco/ccna/network-fundamentals-guide/NavBar.tsx)
- [app/cisco/ccna/network-fundamentals-guide/constants.ts](app/cisco/ccna/network-fundamentals-guide/constants.ts)
- [app/cisco/ccna/network-fundamentals-guide/page.css](app/cisco/ccna/network-fundamentals-guide/page.css)
- [__tests__/cisco/ccna/network-fundamentals-guide.test.tsx](__tests__/cisco/ccna/network-fundamentals-guide.test.tsx)
- [archive/Cisco/html/ccna/Ccna-network-fundamentals-guide.html](archive/Cisco/html/ccna/Ccna-network-fundamentals-guide.html)
- [archive/Cisco/md/ccna/Ccna-network-fundamentals-guide.md](archive/Cisco/md/ccna/Ccna-network-fundamentals-guide.md)

## 2026-08-11: CCNAレビュー指摘の検証・修正 (完了)

- [x] **Rules / Skills**: 正本とClaude/Geminiミラーの同期、安全なrsync、Docs Sync成果物、Mermaid自動検証規約を更新 (`835596f`)。
- [x] **Mermaid parser Red / Green**: HTML外側の記号、Unicode/hex/行継続、型検証の回帰テストと実装 (`a21d9a0`, `9c9179a`)。
- [x] **CSS tokens Red / Green**: CCNA Automationのローカルトークンをグローバル3層トークンへ移設し、モバイル配置とz-indexを修正 (`5390336`, `75a708f`)。
- [x] **CCNA behavior Red / Green**: ARIA、参照リンク、JSON忠実性、200-901メタデータ、CCNA/CCNAAUTO分離を修正 (`270712e`, `1689b5c`)。
- [x] **Refactor**: 対象TSXコンポーネントの責務をJSDoc化 (`8694b35`)。
- [x] **レビュー追補テスト**: 色関数リテラル検査、ScrollSpyの状態待ち、逐次スクロール、モバイル境界検証を強化 (`7fe5306`)。
- [x] **Diagram再描画 Red / Green**: ScrollSpy更新で11図が再描画される回帰テストを追加し、ページ固有Diagramを`React.memo`化 (`0632d9b`, `2cd6be2`)。
- [x] **ガイド・スキル文書**: Mermaid / Docs Sync手順、Vision API curl案内、DLP IAMロール、リポジトリ相対リンクを修正 (`da12df2`, `c7ebd0a`, `46bb211`, `2951b8a`)。

## 2026-08-11: Cisco「CCNA 200-301 Network Access 徹底解説」100%全量移行 (完了)

### 目的

`Ccna-network-access-guide.html` および同名 Markdown を、Next.js App Router 5ファイル構成 (`page.tsx`, `CcnaNetworkAccessGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/cisco/ccna/network-access-guide` ルートへ移行。文章・表・17個のMermaid図・コードブロック・参考文献・免責事項を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(ccna): add failing unit tests for CCNA Network Access guide migration` (`deb435c`)
- [x] **Step 2 (Green)**: `feat(ccna): implement CCNA Network Access guide page and components` (`12e767b`)
- [x] **Step 3 (Refactor / Integration & Nav & Docs)**: `refactor(ccna): integrate CCNA Network Access guide into navigation and update docs` (`968e597`)
- [x] **Step 4 (Archive & Sync)**: 元HTMLおよびMDを `archive/Cisco/html/ccna/` と `archive/Cisco/md/ccna/` へ移動し `MIGRATION_PROGRESS.md` を同期

### 関連ファイル

- [app/cisco/ccna/network-access-guide/page.tsx](app/cisco/ccna/network-access-guide/page.tsx)
- [app/cisco/ccna/network-access-guide/CcnaNetworkAccessGuide.tsx](app/cisco/ccna/network-access-guide/CcnaNetworkAccessGuide.tsx)
- [app/cisco/ccna/network-access-guide/NavBar.tsx](app/cisco/ccna/network-access-guide/NavBar.tsx)
- [app/cisco/ccna/network-access-guide/constants.ts](app/cisco/ccna/network-access-guide/constants.ts)
- [app/cisco/ccna/network-access-guide/page.css](app/cisco/ccna/network-access-guide/page.css)
- [__tests__/cisco/ccna/network-access-guide/page.test.tsx](__tests__/cisco/ccna/network-access-guide/page.test.tsx)
- [archive/Cisco/html/ccna/Ccna-network-access-guide.html](archive/Cisco/html/ccna/Ccna-network-access-guide.html)
- [archive/Cisco/md/ccna/Ccna-network-access-guide.md](archive/Cisco/md/ccna/Ccna-network-access-guide.md)

## 2026-08-11: Cisco「CCNA 6.0 自動化とプログラマビリティ (Automation and Programmability)」100%全量移行 (完了)

### 目的

`Ccna-automation-programmability.html` および同名 Markdown を、Next.js App Router 5ファイル構成 (`page.tsx`, `CcnaAutomationProgrammabilityGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/cisco/ccna/automation-programmability` ルートへ移行。文章・表・7個のMermaid図・コードブロック・参考文献・免責事項を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test: add failing unit and e2e tests for CCNA Automation and Programmability guide migration` (`5036c63`)
- [x] **Step 2 (Green)**: `feat: implement CCNA Automation and Programmability guide page` (`5473d44`)
- [x] **Step 3 (Refactor / Integration & Nav & Docs)**: `refactor: integrate CCNA Automation and Programmability guide into navigation and docs`
- [x] **Step 4 (Archive & Sync)**: 元HTMLおよびMDを `archive/Cisco/html/ccna/` と `archive/Cisco/md/ccna/` へ移動し `MIGRATION_PROGRESS.md` を同期

### 関連ファイル

- [app/cisco/ccna/automation-programmability/page.tsx](app/cisco/ccna/automation-programmability/page.tsx)
- [app/cisco/ccna/automation-programmability/CcnaAutomationProgrammabilityGuide.tsx](app/cisco/ccna/automation-programmability/CcnaAutomationProgrammabilityGuide.tsx)
- [app/cisco/ccna/automation-programmability/NavBar.tsx](app/cisco/ccna/automation-programmability/NavBar.tsx)
- [app/cisco/ccna/automation-programmability/constants.ts](app/cisco/ccna/automation-programmability/constants.ts)
- [app/cisco/ccna/automation-programmability/page.css](app/cisco/ccna/automation-programmability/page.css)
- [__tests__/cisco/ccna/automation-programmability/page.test.tsx](__tests__/cisco/ccna/automation-programmability/page.test.tsx)
- [e2e/ccna-automation-programmability.spec.ts](e2e/ccna-automation-programmability.spec.ts)
- [archive/Cisco/html/ccna/Ccna-automation-programmability.html](archive/Cisco/html/ccna/Ccna-automation-programmability.html)
- [archive/Cisco/md/ccna/Ccna-automation-programmability.md](archive/Cisco/md/ccna/Ccna-automation-programmability.md)

## 2026-08-11: Cisco「CCNA 6.0 Network Fundamentals ドメイン徹底解説」100%全量移行 (完了)

### 目的

`Ccna-automation-network-fundamentals.html`（1612行、11個のMermaid図、12個の表、13個の参考文献）を、Next.js App Router 5ファイル構成 (`page.tsx`, `CcnaNetworkFundamentalsGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/cisco/ccna/automation-network-fundamentals` ルートへ移行。文章・表・11個のMermaid図・コードブロック・13個の参考文献・免責事項を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(ccna): add failing tests for Network Fundamentals guide migration` (`b6df393`), `test(ccna): update unit tests to strictly assert visual CSS classes and HTML structural hierarchy` (`457c0a6`), `test(ccna): add failing tests asserting 100% verbatim paragraph and text fidelity from source HTML` (`fd08a1b`), `test(ccna): add failing tests for exact H2 title fidelity and NavBar ScrollSpy active state` (`c386ba7`), `test(ccna): add failing tests for exact paragraph order and sequence in Overview section` (`1cf2733`), `test(ccna): add failing tests for exact 6 Summary items and 4 Reference links from original HTML` (`4a0a718`)
- [x] **Step 2 (Green)**: `feat(ccna): implement Network Fundamentals guide page and components to pass tests` (`4fbda39`), `feat(ccna): fully restore original HTML design, styles, and structural elements for Network Fundamentals guide` (`2098561`), `feat(ccna): restore 100% verbatim paragraph texts, list items, and fix header layout offset` (`18e7c80`), `feat(ccna): restore exact H2 step titles and integrate IntersectionObserver ScrollSpy in sidebar` (`a65de47`), `feat(ccna): restore exact Overview section paragraph sequence and fix hero top layout padding` (`bc89c98`), `feat(ccna): restore exact Summary 6 items and 4 Reference links, and fix DisclaimerBanner background opacity` (`07df048`)
- [x] **Step 3 (Refactor / Integration & Nav & Docs)**: `refactor(ccna): integrate Network Fundamentals guide into routing, archive html, and update docs` (`9779950`), 全13セクションの文言・順序・まとめ箇条書き6件・参考情報源リンク4件を100%全量逐字完全修復 & 免責バナー半透明透過・文字重なりを完全解消
- [x] **Step 4 (Archive & Sync)**: 元HTMLを `archive/Cisco/html/ccna/Ccna-automation-network-fundamentals.html` へ移動し `MIGRATION_PROGRESS.md` を同期

### 関連ファイル

- [app/cisco/ccna/automation-network-fundamentals/page.tsx](app/cisco/ccna/automation-network-fundamentals/page.tsx)
- [app/cisco/ccna/automation-network-fundamentals/CcnaNetworkFundamentalsGuide.tsx](app/cisco/ccna/automation-network-fundamentals/CcnaNetworkFundamentalsGuide.tsx)
- [app/cisco/ccna/automation-network-fundamentals/NavBar.tsx](app/cisco/ccna/automation-network-fundamentals/NavBar.tsx)
- [app/cisco/ccna/automation-network-fundamentals/constants.ts](app/cisco/ccna/automation-network-fundamentals/constants.ts)
- [app/cisco/ccna/automation-network-fundamentals/page.css](app/cisco/ccna/automation-network-fundamentals/page.css)
- [__tests__/cisco/ccna/automation-network-fundamentals/page.test.tsx](__tests__/cisco/ccna/automation-network-fundamentals/page.test.tsx)
- [archive/Cisco/html/ccna/Ccna-automation-network-fundamentals.html](archive/Cisco/html/ccna/Ccna-automation-network-fundamentals.html)

## 2026-08-11: Cisco「CCNA Automation ドメイン5.0 Infrastructure and Automation ステップバイステップ解説ガイド」100%全量移行 (完了)

### 目的

`Ccna-automation-infrastructure-and-automation.html`（2628行、15個のMermaid図、15個の表、13個の参考文献）および同名 Markdown を、Next.js App Router 5ファイル構成 (`page.tsx`, `CcnaInfraAutomationGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css`) で `/cisco/ccna/automation-infrastructure-and-automation` ルートへ移行。文章・表・15個のMermaid図・コードブロック・13個の参考文献・免責事項を一切の省略・要約なしで100%全量移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(cisco/ccna): add failing tests for complete HTML-faithful migration of automation-infrastructure-and-automation guide` (`ced08b6`)
- [x] **Step 2 (Green)**: `feat(cisco/ccna): implement CCNA automation infrastructure and automation guide page components to pass tests` (`11f4cb2`)
- [x] **Step 3 (Refactor / Integration & Nav & Docs)**: `refactor/docs(cisco/ccna): integrate CCNA automation infrastructure and automation guide into routing and update docs` (`4183329`)
- [x] **Step 4 (Archive & Sync)**: 元HTMLおよびMDを `archive/Cisco/html/ccna/` と `archive/Cisco/md/ccna/` へ移動し `MIGRATION_PROGRESS.md` を同期

### 関連ファイル

- [app/cisco/ccna/automation-infrastructure-and-automation/page.tsx](app/cisco/ccna/automation-infrastructure-and-automation/page.tsx)
- [app/cisco/ccna/automation-infrastructure-and-automation/CcnaInfraAutomationGuide.tsx](app/cisco/ccna/automation-infrastructure-and-automation/CcnaInfraAutomationGuide.tsx)
- [app/cisco/ccna/automation-infrastructure-and-automation/NavBar.tsx](app/cisco/ccna/automation-infrastructure-and-automation/NavBar.tsx)
- [app/cisco/ccna/automation-infrastructure-and-automation/constants.ts](app/cisco/ccna/automation-infrastructure-and-automation/constants.ts)
- [app/cisco/ccna/automation-infrastructure-and-automation/page.css](app/cisco/ccna/automation-infrastructure-and-automation/page.css)
- [__tests__/cisco/ccna/automation-infrastructure-and-automation/page.test.tsx](__tests__/cisco/ccna/automation-infrastructure-and-automation/page.test.tsx)
- [archive/Cisco/html/ccna/Ccna-automation-infrastructure-and-automation.html](archive/Cisco/html/ccna/Ccna-automation-infrastructure-and-automation.html)
- [archive/Cisco/md/ccna/Ccna-automation-infrastructure-and-automation.md](archive/Cisco/md/ccna/Ccna-automation-infrastructure-and-automation.md)

## 2026-08-11: Cisco「CCNA Automation ドメイン4.0 Application Deployment and Security 完全ガイド」コンテンツ＆デザイン100%完全忠実移植 (完了)

### 目的

`Ccna-automation-application-deployment-security.html`（1944行）との全量照合およびデザインレビューにより、文章・表構造だけでなくCSS変数（`:root`）、`h1`グラデーションテキスト、`h2`左アクセントバー、`th`白文字＆半透明アクセント背景、`.badge`ピル型、`.callout`アクセントバー、インラインコード背景、コードブロック構文ハイライトの乖離を特定。さらに Mermaid 図解の人工的な幅制限（`maxWidth: 800px` 等）を排除してコンテンツエリア全幅 (`width: 100%`) かつ中央寄せ配置へ改善。デザイン・レイアウトテスト（Red）を追加し、`page.css`およびTSXコンポーネントを原本HTMLデザインに100%忠実に全面修復・完成させた（Green）。

### 完了済みステップ

- [x] **Step 1 (Red - コンテンツ)**: `test(cisco/ccna): add 24 failing tests for complete HTML-faithful migration of automation-app-deployment-security guide` (`4f36e15`)
- [x] **Step 2 (Green - コンテンツ)**: `feat(cisco/ccna): rewrite automation-app-deployment-security guide with 100% HTML-faithful content` (`6ece372`)
- [x] **Step 1 (Red - デザイン・CSS)**: `test(cisco/ccna): add 7 failing design-faithfulness tests for automation-app-deployment-security CSS migration` (`b324651`)
- [x] **Step 2 (Green - デザイン・CSS)**: `feat(cisco/ccna): complete 100% faithful CSS style and code syntax highlighting migration for automation-app-deployment-security` (`4ef5a60`)
- [x] **Step 1 (Red - 図解レイアウト)**: `test(cisco/ccna): add failing test for diagram centering (margin: 1.5rem auto 2rem)` (`3d2a578`) / `test(cisco/ccna): add failing test for full-width diagram wrapper without artificial maxWidth` (`540afa3`)
- [x] **Step 2 (Green - 図解レイアウト)**: `feat(cisco/ccna): make diagram wrappers full-width without artificial maxWidth restrictions` (`fe5bc4e`)

### 主な修正内容

- ヒーロー: バッジ行（配点15%・サブトピック4.1〜4.12・試験時間120分・対応言語）を追加
- 第2章4.1: 3列表→2列表（利点/説明）に修正、説明文を原本通りに
- 第2章4.2: 列名を管理主体/主な特徴/典型的な用途に修正
- 第3章: ul/liリスト（4.3.a/b/c）追加、属性比較表の列名修正
- 第4章: CI/CDパイプライン表を2列8行に完全書き直し、説明文修正
- 第5章: コード例をadd(a,b)関数に戻す、assertEqual/assertTrue/assertRaises段落追加
- 第6章: DockerfileにENTRYPOINT追加（8行）、dockerコマンドをlogs/exec/stop+rm/push+pull含む8行に
- 第7章: シークレット保護の箇条書き3点追加、暗号化表を種類/説明/代表例2列に、データ取り扱い段落修正
- 第8章: 冒頭段落追加、表を要素/役割2列に修正
- 第9章: OWASP Top 10 2025年版10カテゴリ表（A01〜A10）追加、詳細段落追加
- 第10章: Bashコマンドを原本通り7+5+4行に復元（cd/rmdir/find/echo $HOME/unset含む）
- 第11章: DevOps表を原本通り4行（文化/自動化/計測/共有）に修正（独自追加のLean削除）、詳細段落追加
- 第12章: 冒頭段落追加、列名をNo./サブトピック/一言でいうと、12行に修正
- 参考文献: 8リンク全て復元（認定概要/試験詳細/PDF/LN/OWASP/Dockerfile/unittest）＋免責事項段落

## 2026-08-09: サイドバー付き全ガイド画面のレイアウト統一 (完了)

### 目的

HTMLから移行されたガイド画面ごとに異なっていたサイドバー幅、固定方法、メインコンテンツの最大幅を統一する。AWS / Cisco / GCP のサイドバー付き24スタイルシートを対象に、デスクトップでは左端固定280pxサイドバーと残り幅いっぱいのメイン領域、レスポンシブでは幅100%のメイン領域を適用する。

### 完了済みステップ

- [x] **Red**: `guide-content-widths.test.ts` に全24スタイルシート・73ケースの失敗テストを追加（`ba06f5f`, `7b8db13`）。
- [x] **Green**: サイドバー幅280px、メイン領域の残幅100%、本文全体の最大幅制限解除、モバイル幅100%復帰を全対象へ実装（`a800640`）。
- [x] **Refactor**: IAPコード例のJSXエスケープとACE Section 4のCSS Modulesセレクタを修正（`4a3f4c0`）。
- [x] **Verification**: レイアウト契約テスト73件、ESLint、Next.js production build 56ルートが成功。

### レイアウト契約

- デスクトップ: `sidebar { position: fixed; left: 0; width: 280px; }`
- デスクトップ: `main { margin-left: 280px; width: calc(100% - 280px); max-width: none; }`
- レスポンシブ: `main { margin-left: 0; width: 100%; max-width: none; }`
- 回帰テスト: `__tests__/guide-content-widths.test.ts`

## 2026-08-08: Cisco「CCNA Automation ドメイン3.0 Cisco Platforms and Development 徹底解説ガイド」移行 (完了)

### 目的

`Ccna-automation-cisco-platforms-and-development.html` (および `.md`)（静的HTML・1864行・10個のMermaid図・6個の表）を、正準の設計パターン（Server page.tsx + Server CcnaCiscoPlatformsDevelopmentGuide.tsx + browser-side NavBar + constants.ts + page.module.css + 共有 browser-side MermaidDiagram）で `app/cisco/ccna/automation-cisco-platforms-and-development` ルートへ完全移行する。文章・表・10個のMermaid図・7個のコードブロック・16個の参考文献の一切の省略・要約なしで完全移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(cisco): add failing tests for CCNA automation cisco platforms and development guide migration` (`__tests__/cisco/ccna/automation-cisco-platforms-and-development/page.test.tsx` 失敗テストの作成後にコミット)
- [x] **Step 2 (Green)**: `feat(cisco): implement CCNA automation cisco platforms and development guide to pass tests` (`page.tsx`, `CcnaCiscoPlatformsDevelopmentGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.module.css` 実装後にコミット)
- [x] **Step 3 (Refactor / Integration & Nav)**: `refactor(cisco): integrate CCNA automation cisco platforms and development guide into routing and update docs` (`app/constants.ts` EXAMSへの統合とドキュメント更新後にコミット)
- [x] **Step 4 (Archive)**: Step 3 のコミット完了後、移行元HTML/Markdownを削除せず履歴を保つ `git mv` で `archive/Cisco/html/ccna/` と `archive/Cisco/md/ccna/` へ移動してコミット

### 関連ファイル

- [app/cisco/ccna/automation-cisco-platforms-and-development/page.tsx](app/cisco/ccna/automation-cisco-platforms-and-development/page.tsx)
- [app/cisco/ccna/automation-cisco-platforms-and-development/CcnaCiscoPlatformsDevelopmentGuide.tsx](app/cisco/ccna/automation-cisco-platforms-and-development/CcnaCiscoPlatformsDevelopmentGuide.tsx)
- [app/cisco/ccna/automation-cisco-platforms-and-development/NavBar.tsx](app/cisco/ccna/automation-cisco-platforms-and-development/NavBar.tsx)
- [app/cisco/ccna/automation-cisco-platforms-and-development/constants.ts](app/cisco/ccna/automation-cisco-platforms-and-development/constants.ts)
- [app/cisco/ccna/automation-cisco-platforms-and-development/page.module.css](app/cisco/ccna/automation-cisco-platforms-and-development/page.module.css)
- [__tests__/cisco/ccna/automation-cisco-platforms-and-development/page.test.tsx](__tests__/cisco/ccna/automation-cisco-platforms-and-development/page.test.tsx)
- [archive/Cisco/html/ccna/Ccna-automation-cisco-platforms-and-development.html](archive/Cisco/html/ccna/Ccna-automation-cisco-platforms-and-development.html)
- [archive/Cisco/md/ccna/Ccna-automation-cisco-platforms-and-development.md](archive/Cisco/md/ccna/Ccna-automation-cisco-platforms-and-development.md)

## 2026-08-08: Cisco「CCNA Automation ドメイン4.0 Application Deployment and Security 完全ガイド」移行 (完了)

### 目的

`Ccna-automation-application-deployment-security.html` (および `.md`)（静的HTML・1857行・10個のMermaid図・17個の表）を、正準の設計パターン（Server page.tsx + Server CcnaAppDeploymentSecurityGuide.tsx + browser-side NavBar + constants.ts + page.css + 共有 browser-side MermaidDiagram）で `app/cisco/ccna/automation-application-deployment-security` ルートへ完全移行する。文章・表・10個のMermaid図・コードブロック・参考ソースの一切の省略・要約なしで完全移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test: add failing tests for CCNA automation app deployment and security guide migration` (`__tests__/cisco/ccna/automation-application-deployment-security/page.test.tsx` 失敗テストの作成後にコミット)
- [x] **Step 2 (Green)**: `feat: implement CCNA automation app deployment and security guide page components to pass tests` (`page.tsx`, `CcnaAppDeploymentSecurityGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 実装後にコミット)
- [x] **Step 3 (Refactor / Integration & Nav)**: `refactor/docs: integrate CCNA automation app deployment security guide into routing and update docs` (`app/constants.ts` EXAMSへの統合と `GEMINI.md` 更新後にコミット)
- [x] **Step 4 (Archive)**: Step 3 のコミット完了後、移行元HTML/Markdownを削除せず履歴を保つ `git mv` で `archive/Cisco/html/ccna/` と `archive/Cisco/md/ccna/` へ移動してコミット

### 関連ファイル

- [app/cisco/ccna/automation-application-deployment-security/page.tsx](app/cisco/ccna/automation-application-deployment-security/page.tsx)
- [app/cisco/ccna/automation-application-deployment-security/CcnaAppDeploymentSecurityGuide.tsx](app/cisco/ccna/automation-application-deployment-security/CcnaAppDeploymentSecurityGuide.tsx)
- [app/cisco/ccna/automation-application-deployment-security/NavBar.tsx](app/cisco/ccna/automation-application-deployment-security/NavBar.tsx)
- [app/cisco/ccna/automation-application-deployment-security/constants.ts](app/cisco/ccna/automation-application-deployment-security/constants.ts)
- [app/cisco/ccna/automation-application-deployment-security/page.css](app/cisco/ccna/automation-application-deployment-security/page.css)
- [__tests__/cisco/ccna/automation-application-deployment-security/page.test.tsx](__tests__/cisco/ccna/automation-application-deployment-security/page.test.tsx)
- [archive/Cisco/html/ccna/Ccna-automation-application-deployment-security.html](archive/Cisco/html/ccna/Ccna-automation-application-deployment-security.html)
- [archive/Cisco/md/ccna/Ccna-automation-application-deployment-security.md](archive/Cisco/md/ccna/Ccna-automation-application-deployment-security.md)

## 2026-08-05: Cisco「CCIE Enterprise Infrastructure 認定 完全ガイド」移行 (完了)

### 目的

`Ccie-enterprise-infrastructure.html`（静的HTML・1555行・4個のMermaid図・6個の表）を、正準の設計パターン（NavBar + Server page.tsx + Client CcieEnterpriseGuide.tsx + constants.ts + page.module.css + 共有 MermaidDiagram）で `app/cisco/ccie/enterprise-infrastructure` ルートへ完全移行する。文章・表・4個のMermaid図・FAQ・参考ソース全10件の一切の省略・要約なしで完全移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test: add failing tests for ccie enterprise infrastructure guide` (`__tests__/cisco/ccie-enterprise-infrastructure.test.tsx` 失敗テストの作成)
- [x] **Step 2 (Green)**: `feat: implement ccie enterprise infrastructure guide components and page` (`page.tsx`, `CcieEnterpriseGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.module.css` 実装)
- [x] **Step 3 (Refactor / Integration & Nav & Archive)**: `refactor: integrate ccie enterprise infrastructure guide into navigation and archive html source` (`app/constants.ts` EXAMSへの統合、`MIGRATION_PROGRESS.md` 更新、元HTML `Ccie-enterprise-infrastructure.html` の `archive/Cisco/html/` へのアーカイブ移動)

### 関連ファイル

- [app/cisco/ccie/enterprise-infrastructure/page.tsx](app/cisco/ccie/enterprise-infrastructure/page.tsx)
- [app/cisco/ccie/enterprise-infrastructure/CcieEnterpriseGuide.tsx](app/cisco/ccie/enterprise-infrastructure/CcieEnterpriseGuide.tsx)
- [app/cisco/ccie/enterprise-infrastructure/NavBar.tsx](app/cisco/ccie/enterprise-infrastructure/NavBar.tsx)
- [app/cisco/ccie/enterprise-infrastructure/constants.ts](app/cisco/ccie/enterprise-infrastructure/constants.ts)
- [app/cisco/ccie/enterprise-infrastructure/page.module.css](app/cisco/ccie/enterprise-infrastructure/page.module.css)
- [__tests__/cisco/ccie-enterprise-infrastructure.test.tsx](__tests__/cisco/ccie-enterprise-infrastructure.test.tsx)
- [archive/Cisco/html/ccie/Ccie-enterprise-infrastructure.html](archive/Cisco/html/ccie/Ccie-enterprise-infrastructure.html)
- [archive/Cisco/md/ccie/Ccie-enterprise-infrastructure.md](archive/Cisco/md/ccie/Ccie-enterprise-infrastructure.md)

## 2026-08-05: Cisco「Cisco Certified Design Expert (CCDE) 完全ガイド」移行 (完了)

### 目的

`Ccde-guide.html`（静的HTML・1511行・5個のMermaid図・8個の表）を、正準の設計パターン（NavBar + Server page.tsx + Client CcdeGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/cisco/ccde/complete-guide` ルートへ完全移行する。文章・表・5個のMermaid図・用語集・FAQ・公式リンク9件の一切の省略・要約なしで完全移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test: add failing tests for Cisco CCDE complete guide migration` (`__tests__/cisco-ccde-guide.test.tsx` 失敗テストの作成)
- [x] **Step 2 (Green)**: `feat: implement Cisco CCDE complete guide page to pass tests` (`page.tsx`, `CcdeGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 実装)
- [x] **Step 3 (Refactor / Integration & Nav)**: `refactor/docs: integrate CCDE guide into routing, archive html, and update docs` (`app/constants.ts` EXAMSへの統合、`GEMINI.md` / `CLAUDE.md` / `MIGRATION_PROGRESS.md` 更新、元HTML `Ccde-guide.html` のアーカイブ移動)

### 関連ファイル

- [app/cisco/ccde/complete-guide/page.tsx](app/cisco/ccde/complete-guide/page.tsx)
- [app/cisco/ccde/complete-guide/CcdeGuide.tsx](app/cisco/ccde/complete-guide/CcdeGuide.tsx)
- [app/cisco/ccde/complete-guide/NavBar.tsx](app/cisco/ccde/complete-guide/NavBar.tsx)
- [app/cisco/ccde/complete-guide/constants.ts](app/cisco/ccde/complete-guide/constants.ts)
- [app/cisco/ccde/complete-guide/page.css](app/cisco/ccde/complete-guide/page.css)
- [__tests__/cisco-ccde-guide.test.tsx](__tests__/cisco-ccde-guide.test.tsx)
- [archive/Cisco/html/ccde/Ccde-guide.html](archive/Cisco/html/ccde/Ccde-guide.html)

## 2026-08-05: AWS「Solutions Architect Associate Domain 4: コスト最適化アーキテクチャの設計」移行 (完了)

### 目的

`AWS-Certified-Solutions-Architect-Associate-Domain4.html`（静的HTML・2797行・29個のMermaid図）を、正準の設計パターン（NavBar + Server page.tsx + Client Domain4Guide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/aws/solutions-architect-associate/domain4` ルートへ完全移行する。文章・表・29個のMermaid図・補足説明・チェックリストの一切の省略・要約なしで完全移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(aws-saa): add failing tests for Domain 4 guide` (`__tests__/aws/solutions-architect-associate/domain4/page.test.tsx` 失敗テストの作成)
- [x] **Step 2 (Green)**: `feat(aws-saa): implement Domain 4 guide components to pass tests` (`page.tsx`, `Domain4Guide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 実装とテスト通過)
- [x] **Step 3 (Refactor / Integration & Nav)**: `refactor(aws-saa): integrate Domain 4 guide into routing and update docs` (`app/constants.ts` EXAMSへの統合、`GEMINI.md` / `CLAUDE.md` 更新)
- [x] **Step 4 (Docs Sync & Archive)**: `chore(docs): update MIGRATION_PROGRESS.md and archive Domain 4 HTML` (`MIGRATION_PROGRESS.md` の更新、元HTML `AWS-Certified-Solutions-Architect-Associate-Domain4.html` を `archive/Aws/SAA/html/` へ、MD `AWS-Certified-Solutions-Architect-Associate-Domain4.md` を `archive/Aws/SAA/md/` へアーカイブ移動)

### 関連ファイル

- [app/aws/solutions-architect-associate/domain4/page.tsx](app/aws/solutions-architect-associate/domain4/page.tsx)
- [app/aws/solutions-architect-associate/domain4/Domain4Guide.tsx](app/aws/solutions-architect-associate/domain4/Domain4Guide.tsx)
- [app/aws/solutions-architect-associate/domain4/NavBar.tsx](app/aws/solutions-architect-associate/domain4/NavBar.tsx)
- [app/aws/solutions-architect-associate/domain4/constants.ts](app/aws/solutions-architect-associate/domain4/constants.ts)
- [app/aws/solutions-architect-associate/domain4/page.css](app/aws/solutions-architect-associate/domain4/page.css)
- [__tests__/aws/solutions-architect-associate/domain4/page.test.tsx](__tests__/aws/solutions-architect-associate/domain4/page.test.tsx)
- [archive/Aws/SAA/html/AWS-Certified-Solutions-Architect-Associate-Domain4.html](archive/Aws/SAA/html/AWS-Certified-Solutions-Architect-Associate-Domain4.html)
- [archive/Aws/SAA/md/AWS-Certified-Solutions-Architect-Associate-Domain4.md](archive/Aws/SAA/md/AWS-Certified-Solutions-Architect-Associate-Domain4.md)

## 2026-08-02: GCP「Team Griffin インフラ構築チャレンジラボ 完全解説ガイド」移行 (完了)

### 目的

`Griffin-wordpress-gke-guide.html`（静的HTML・2224行・3個のMermaid図・9個のコードブロック）を、正準の設計パターン（NavBar + Server page.tsx + Client GriffinWordPressGkeGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/gcl/hands-on/griffin-wordpress-gke-guide` ルートへ完全移行する。文章・表・3個のMermaid図・9個のコードブロック・補足説明・チェックリストの一切の省略・要約なしで完全移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(gcl-hands-on): add failing tests for griffin wordpress gke guide page` (`__tests__/gcl/hands-on/griffin-wordpress-gke-guide/page.test.tsx` 失敗テストの作成)
- [x] **Step 2 (Green)**: `feat(gcl-hands-on): implement griffin wordpress gke guide page to pass tests` (`page.tsx`, `GriffinWordPressGkeGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 実装とテスト通過)
- [x] **Step 3 (Refactor / Integration & Nav)**: `refactor(gcl-hands-on): integrate griffin wordpress gke guide into routing and update docs` (`app/constants.ts` EXAMSへの統合、`GEMINI.md` / `CLAUDE.md` 更新)
- [x] **Step 4 (Docs Sync & Archive)**: `chore(docs): update MIGRATION_PROGRESS.md and archive griffin wordpress gke guide files` (`MIGRATION_PROGRESS.md` の更新、元HTML `Griffin-wordpress-gke-guide.html` を `archive/Gcl_Archive/Hands-on/html/` へ、MD `Griffin-wordpress-gke-guide.md` を `archive/Gcl_Archive/Hands-on/md/` へアーカイブ移動)

### 関連ファイル

- [app/gcl/hands-on/griffin-wordpress-gke-guide/page.tsx](app/gcl/hands-on/griffin-wordpress-gke-guide/page.tsx)
- [app/gcl/hands-on/griffin-wordpress-gke-guide/GriffinWordPressGkeGuide.tsx](app/gcl/hands-on/griffin-wordpress-gke-guide/GriffinWordPressGkeGuide.tsx)
- [app/gcl/hands-on/griffin-wordpress-gke-guide/NavBar.tsx](app/gcl/hands-on/griffin-wordpress-gke-guide/NavBar.tsx)
- [app/gcl/hands-on/griffin-wordpress-gke-guide/constants.ts](app/gcl/hands-on/griffin-wordpress-gke-guide/constants.ts)
- [app/gcl/hands-on/griffin-wordpress-gke-guide/page.css](app/gcl/hands-on/griffin-wordpress-gke-guide/page.css)
- [__tests__/gcl/hands-on/griffin-wordpress-gke-guide/page.test.tsx](__tests__/gcl/hands-on/griffin-wordpress-gke-guide/page.test.tsx)
- [archive/Gcl_Archive/Hands-on/html/Griffin-wordpress-gke-guide.html](archive/Gcl_Archive/Hands-on/html/Griffin-wordpress-gke-guide.html)
- [archive/Gcl_Archive/Hands-on/md/Griffin-wordpress-gke-guide.md](archive/Gcl_Archive/Hands-on/md/Griffin-wordpress-gke-guide.md)

## 2026-08-01: GCP「GKE プライベートクラスタ セキュリティ実装ガイド」移行 (完了)

### 目的

`Gke-private-cluster-security-guide.html`（静的HTML・1420行・4個のMermaid図）を、正準の設計パターン（NavBar + Server page.tsx + Client GkePrivateClusterSecurityGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/gcl/hands-on/gke-private-cluster-security-guide` ルートへ完全移行する。文章・表・4個のMermaid図・補足説明・チェックリストの一切の省略・要約なしで移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(gcl-hands-on): add failing tests for GKE private cluster security guide page` (`__tests__/gcl/hands-on/gke-private-cluster-security-guide/page.test.tsx` 失敗テストの作成)
- [x] **Step 2 (Green)**: `feat(gcl-hands-on): implement GKE private cluster security guide page to pass tests` (`page.tsx`, `GkePrivateClusterSecurityGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 実装とテスト通過)
- [x] **Step 3 (Refactor / Integration & Nav)**: `refactor(gcl-hands-on): integrate GKE private cluster security guide into routing and update docs` (`app/constants.ts` EXAMSへの統合、`GEMINI.md` 更新)
- [x] **Step 4 (Docs Sync & Archive)**: `chore(docs): update MIGRATION_PROGRESS.md and archive GKE private cluster security guide html and md files` (`MIGRATION_PROGRESS.md` の更新、元HTML `Gke-private-cluster-security-guide.html` を `archive/Gcl_Archive/Hands-on/html/` へ、MD を `archive/Gcl_Archive/Hands-on/md/` へアーカイブ移動)
- [x] **Step 5 (Full-width Layout, Syntax Highlighting & 1rem Diagram Scaling)**: `feat(gcl-hands-on): expand main layout width, add syntax highlighting, and protect 1rem diagram text size` (`main` メインコンテンツ横幅全幅化、コードブロックへの `code-cmd` / `code-param` 等の構文カラーハイライト適用、図解文字サイズ 1rem 保護とレスポンシブ表示の適用)

### 関連ファイル

- [app/gcl/hands-on/gke-private-cluster-security-guide/page.tsx](app/gcl/hands-on/gke-private-cluster-security-guide/page.tsx)
- [app/gcl/hands-on/gke-private-cluster-security-guide/GkePrivateClusterSecurityGuide.tsx](app/gcl/hands-on/gke-private-cluster-security-guide/GkePrivateClusterSecurityGuide.tsx)
- [app/gcl/hands-on/gke-private-cluster-security-guide/NavBar.tsx](app/gcl/hands-on/gke-private-cluster-security-guide/NavBar.tsx)
- [app/gcl/hands-on/gke-private-cluster-security-guide/constants.ts](app/gcl/hands-on/gke-private-cluster-security-guide/constants.ts)
- [app/gcl/hands-on/gke-private-cluster-security-guide/page.css](app/gcl/hands-on/gke-private-cluster-security-guide/page.css)
- [__tests__/gcl/hands-on/gke-private-cluster-security-guide/page.test.tsx](__tests__/gcl/hands-on/gke-private-cluster-security-guide/page.test.tsx)
- [archive/Gcl_Archive/Hands-on/html/Gke-private-cluster-security-guide.html](archive/Gcl_Archive/Hands-on/html/Gke-private-cluster-security-guide.html)
- [archive/Gcl_Archive/Hands-on/md/Gke-private-cluster-security-guide.md](archive/Gcl_Archive/Hands-on/md/Gke-private-cluster-security-guide.md)

## 2026-07-28: AWS「AWS SAA-C03 ドメイン3: 高性能なアーキテクチャの設計」移行 (完了)

### 目的

`AWS-Certified-Solutions-Architect-Associate-Domain3.html`（静的HTML・3470行・27個のMermaid図）を、正準の設計パターン（NavBar + Server page.tsx + Client Domain3Guide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/aws/solutions-architect-associate/domain3` ルートへ完全移行する。文章・表・27個のMermaid図・補足説明・チェックリストの一切の省略・要約なしで移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(aws-saa): add failing tests for AWS SAA Domain 3 guide page` (`__tests__/aws/solutions-architect-associate/domain3/page.test.tsx` 失敗テストの作成)
- [x] **Step 2 (Green)**: `feat(aws-saa): implement AWS SAA Domain 3 guide page` (`page.tsx`, `Domain3Guide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 実装とテスト通過)
- [x] **Step 3 (Refactor / Integration & Nav)**: `refactor(aws-saa): integrate Domain 3 into routing and update docs` (`app/constants.ts` EXAMSへの統合、`CLAUDE.md` / `GEMINI.md` 更新)
- [x] **Step 4 (Docs Sync & Archive)**: `chore(docs): update MIGRATION_PROGRESS.md and archive Domain 3 HTML and MD files` (`MIGRATION_PROGRESS.md` の更新、元HTML `AWS-Certified-Solutions-Architect-Associate-Domain3.html` を `archive/Aws/SAA/html/` へ、MD を `archive/Aws/SAA/md/` へアーカイブ移動)

### 関連ファイル

- [app/aws/solutions-architect-associate/domain3/page.tsx](app/aws/solutions-architect-associate/domain3/page.tsx)
- [app/aws/solutions-architect-associate/domain3/Domain3Guide.tsx](app/aws/solutions-architect-associate/domain3/Domain3Guide.tsx)
- [app/aws/solutions-architect-associate/domain3/NavBar.tsx](app/aws/solutions-architect-associate/domain3/NavBar.tsx)
- [app/aws/solutions-architect-associate/domain3/constants.ts](app/aws/solutions-architect-associate/domain3/constants.ts)
- [app/aws/solutions-architect-associate/domain3/page.css](app/aws/solutions-architect-associate/domain3/page.css)
- [__tests__/aws/solutions-architect-associate/domain3/page.test.tsx](__tests__/aws/solutions-architect-associate/domain3/page.test.tsx)
- [archive/Aws/SAA/html/AWS-Certified-Solutions-Architect-Associate-Domain3.html](archive/Aws/SAA/html/AWS-Certified-Solutions-Architect-Associate-Domain3.html)
- [archive/Aws/SAA/md/AWS-Certified-Solutions-Architect-Associate-Domain3.md](archive/Aws/SAA/md/AWS-Certified-Solutions-Architect-Associate-Domain3.md)

## 2026-07-28: AWS「AWS SAA-C03 ドメイン2: 回復力のあるアーキテクチャの設計」移行 (完了)

### 目的

`AWS-Certified-Solutions-Architect-Associate-Domain2.html`（静的HTML・3000行・25個のMermaid図）を、正準の設計パターン（NavBar + Server page.tsx + Client Domain2Guide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/aws/solutions-architect-associate/domain2` ルートへ完全移行する。文章・表・25個のMermaid図・補足説明・チェックリストの一切の省略・要約なしで移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(aws-saa): add failing tests for AWS SAA Domain 2 guide page` (`__tests__/aws/solutions-architect-associate/domain2/page.test.tsx` 失敗テストの作成)
- [x] **Step 2 (Green)**: `feat(aws-saa): implement AWS SAA Domain 2 guide page` (`page.tsx`, `Domain2Guide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 実装とテスト通過)
- [x] **Step 3 (Refactor / Integration & Nav)**: `refactor(aws-saa): integrate Domain 2 into routing and update docs` (`app/constants.ts` EXAMSへの統合、`CLAUDE.md` / `GEMINI.md` 更新)
- [x] **Step 4 (Docs Sync & Archive)**: `chore(docs): update MIGRATION_PROGRESS.md and archive Domain 2 HTML and MD files` (`MIGRATION_PROGRESS.md` の更新、元HTML `AWS-Certified-Solutions-Architect-Associate-Domain2.html` を `archive/Aws/SAA/html/` へ、MD を `archive/Aws/SAA/md/` へアーカイブ移動)
- [x] **Step 5 (Pie Chart Refinement & Mermaid Syntax Fixes)**: `fix(aws-saa): refine pie chart palette and resolve mermaid syntax errors in domain 2` (円グラフ `m1` の `init` テーマ適用による配色最適化、`m16` の全角波ダッシュ `〜` 除外、`m5` シーケンス図のスラッシュ除去、`m3`/`m4`/`m17`/`m18`/`m20`/`m22` のエッジ記述クォート保護、`m23` の `&` ノード結合展開による `Syntax error in text` 解消)

### 関連ファイル

- [app/aws/solutions-architect-associate/domain2/page.tsx](app/aws/solutions-architect-associate/domain2/page.tsx)
- [app/aws/solutions-architect-associate/domain2/Domain2Guide.tsx](app/aws/solutions-architect-associate/domain2/Domain2Guide.tsx)
- [app/aws/solutions-architect-associate/domain2/NavBar.tsx](app/aws/solutions-architect-associate/domain2/NavBar.tsx)
- [app/aws/solutions-architect-associate/domain2/constants.ts](app/aws/solutions-architect-associate/domain2/constants.ts)
- [app/aws/solutions-architect-associate/domain2/page.css](app/aws/solutions-architect-associate/domain2/page.css)
- [__tests__/aws/solutions-architect-associate/domain2/page.test.tsx](__tests__/aws/solutions-architect-associate/domain2/page.test.tsx)
- [archive/Aws/SAA/html/AWS-Certified-Solutions-Architect-Associate-Domain2.html](archive/Aws/SAA/html/AWS-Certified-Solutions-Architect-Associate-Domain2.html)
- [archive/Aws/SAA/md/AWS-Certified-Solutions-Architect-Associate-Domain2.md](archive/Aws/SAA/md/AWS-Certified-Solutions-Architect-Associate-Domain2.md)

## 2026-07-28: AWS「AWS SAA-C03 ドメイン1: セキュアなアーキテクチャの設計」移行 (完了)

### 目的

`AWS-Certified-Solutions-Architect-Associate-Domain1.html`（静的HTML・2680行・14個のMermaid図）を、正準の設計パターン（NavBar + Server page.tsx + Client Domain1Guide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/aws/solutions-architect-associate/domain1` ルートへ完全移行する。文章・表・14個のMermaid図・補足説明の一切の省略・要約なしで移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(aws-saa): add failing tests for AWS SAA Domain 1 guide page` (`__tests__/aws/solutions-architect-associate/domain1/page.test.tsx` 失敗テストの作成)
- [x] **Step 2 (Green)**: `feat(aws-saa): implement AWS SAA Domain 1 guide page` (`page.tsx`, `Domain1Guide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 実装とテスト通過)
- [x] **Step 3 (Refactor / Integration & Nav)**: `refactor(aws-saa): integrate Domain 1 into routing and update docs` (`app/constants.ts` EXAMSへの統合、`CLAUDE.md` / `GEMINI.md` 更新)
- [x] **Step 4 (Docs Sync & Archive)**: `chore(docs): update MIGRATION_PROGRESS.md and archive Domain 1 HTML` (`MIGRATION_PROGRESS.md` の更新、元HTML `AWS-Certified-Solutions-Architect-Associate-Domain1.html` を `archive/Aws/SAA/html/` へ、MD を `archive/Aws/SAA/md/` へアーカイブ移動)
- [x] **Step 5 (Full-width Layout & 1rem Text Scale & Pie Chart Styling)**: `feat(aws-saa): expand layout to full width, ensure 1rem diagram text scaling, and refine pie chart styling` (`main-content` の全幅 100% 化、`.diagram-container` のスクロールコンテナ化・1rem文字サイズ保護、円グラフ `d01` のダークテーマ配色最適化)
- [x] **Step 6 (Code Block Indentation & Syntax Highlighting)**: `feat(aws-saa): implement code block syntax highlighting and indentation` (JSON コードブロックのインデント構造化、`code-key`, `code-string`, `code-boolean`, `code-punctuation` による構文カラーハイライト装飾)

### 関連ファイル

- [app/aws/solutions-architect-associate/domain1/page.tsx](app/aws/solutions-architect-associate/domain1/page.tsx)
- [app/aws/solutions-architect-associate/domain1/Domain1Guide.tsx](app/aws/solutions-architect-associate/domain1/Domain1Guide.tsx)
- [app/aws/solutions-architect-associate/domain1/NavBar.tsx](app/aws/solutions-architect-associate/domain1/NavBar.tsx)
- [app/aws/solutions-architect-associate/domain1/constants.ts](app/aws/solutions-architect-associate/domain1/constants.ts)
- [app/aws/solutions-architect-associate/domain1/page.css](app/aws/solutions-architect-associate/domain1/page.css)
- [__tests__/aws/solutions-architect-associate/domain1/page.test.tsx](__tests__/aws/solutions-architect-associate/domain1/page.test.tsx)
- [archive/Aws/SAA/html/AWS-Certified-Solutions-Architect-Associate-Domain1.html](archive/Aws/SAA/html/AWS-Certified-Solutions-Architect-Associate-Domain1.html)
- [archive/Aws/SAA/md/AWS-Certified-Solutions-Architect-Associate-Domain1.md](archive/Aws/SAA/md/AWS-Certified-Solutions-Architect-Associate-Domain1.md)

## 2026-07-28: AWS「AWS Certified Solutions Architect – Associate (SAA-C03) 完全対策ガイド」移行 (完了)

### 目的

`AWS-Certified-Solutions-Architect-Associate.html`（静的HTML・3485行・21個のMermaid図）を、正準の設計パターン（NavBar + Server page.tsx + Client SaaGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/aws/solutions-architect-associate` ルートへ完全移行する。文章・表・21個のMermaid図・補足説明の一切の省略・要約なしで移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(aws-saa): add failing tests for AWS SAA guide page` (`__tests__/aws/solutions-architect-associate/page.test.tsx` 失敗テストの作成)
- [x] **Step 2 (Green)**: `feat(aws-saa): implement AWS SAA guide page components to pass tests` (`page.tsx`, `SaaGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 実装とテスト通過)
- [x] **Step 3 (Refactor / Integration & Nav)**: `refactor/docs(aws-saa): integrate AWS SAA page into routing and update docs` (`app/constants.ts` EXAMSへの統合、`CLAUDE.md` / `GEMINI.md` 更新)
- [x] **Step 4 (Archive)**: `chore(aws-saa): archive AWS SAA source html and md files` (`AWS-Certified-Solutions-Architect-Associate.html` を `archive/Aws/SAA/html/` へ、`AWS-Certified-Solutions-Architect-Associate.md` を `archive/Aws/SAA/md/` へアーカイブ移動)

### 関連ファイル

- [app/aws/solutions-architect-associate/page.tsx](app/aws/solutions-architect-associate/page.tsx)
- [app/aws/solutions-architect-associate/SaaGuide.tsx](app/aws/solutions-architect-associate/SaaGuide.tsx)
- [app/aws/solutions-architect-associate/NavBar.tsx](app/aws/solutions-architect-associate/NavBar.tsx)
- [app/aws/solutions-architect-associate/constants.ts](app/aws/solutions-architect-associate/constants.ts)
- [app/aws/solutions-architect-associate/page.css](app/aws/solutions-architect-associate/page.css)
- [__tests__/aws/solutions-architect-associate/page.test.tsx](__tests__/aws/solutions-architect-associate/page.test.tsx)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-07-28: ACE / Hands-on「Google Cloud セキュリティ基礎 完全ガイド」移行 (完了)

### 目的

`Gcp-security-fundamentals-guide.html`（静的HTML・2368行・16個のMermaid図）を、正準の設計パターン（NavBar + Server page.tsx + Client GcpSecurityFundamentalsGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/gcl/hands-on/gcp-security-fundamentals-guide` ルートへ完全移行する。文章・表・16個のMermaid図・コードブロック・注意書きの一切の省略・要約なしで移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(ace): add failing tests for gcp security fundamentals guide page` (`__tests__/gcl/hands-on/gcp-security-fundamentals-guide/page.test.tsx` 失敗テストの作成)
- [x] **Step 2 (Green)**: `feat(ace): implement gcp security fundamentals guide page skeleton to pass tests` (`page.tsx`, `GcpSecurityFundamentalsGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 最小構成実装とテスト通過)
- [x] **Step 3 (Refactor / Content Migration & CSS Mapping)**: `feat(ace): migrate all content, css mapping, and mermaid diagrams for gcp security fundamentals guide` (全8章・演習・表・Mermaid 16図の完全移植、コードブロック `.code-line` 構造化、scoped CSS 整合)
- [x] **Step 4 (Refactor / Integration & Nav)**: `refactor(ace): integrate gcp security fundamentals guide into routing and update docs` (`app/constants.ts` EXAMSへの統合、`CLAUDE.md` / `GEMINI.md` 更新)
- [x] **Step 5 (Docs Sync & Archive)**: `chore(docs): update MIGRATION_PROGRESS.md and archive source html` (`MIGRATION_PROGRESS.md` の更新、元HTML `Gcp-security-fundamentals-guide.html` を `archive/Gcl_Archive/Hands-on/html/` へ退避)
- [x] **Step 6 (1rem Text Scale & Full Width Expansion)**: `feat(ace): expand layout to full width and ensure 1rem text scale for diagrams in gcp security guide` (画面幅100%全幅拡張、.diagram-wrap スクロールと自然 px 倍率適用により 16図の 1rem 自然文字サイズ表示を保証)

### 関連ファイル

- [app/gcl/hands-on/gcp-security-fundamentals-guide/page.tsx](app/gcl/hands-on/gcp-security-fundamentals-guide/page.tsx)
- [app/gcl/hands-on/gcp-security-fundamentals-guide/GcpSecurityFundamentalsGuide.tsx](app/gcl/hands-on/gcp-security-fundamentals-guide/GcpSecurityFundamentalsGuide.tsx)
- [app/gcl/hands-on/gcp-security-fundamentals-guide/NavBar.tsx](app/gcl/hands-on/gcp-security-fundamentals-guide/NavBar.tsx)
- [app/gcl/hands-on/gcp-security-fundamentals-guide/constants.ts](app/gcl/hands-on/gcp-security-fundamentals-guide/constants.ts)
- [app/gcl/hands-on/gcp-security-fundamentals-guide/page.css](app/gcl/hands-on/gcp-security-fundamentals-guide/page.css)
- [__tests__/gcl/hands-on/gcp-security-fundamentals-guide/page.test.tsx](__tests__/gcl/hands-on/gcp-security-fundamentals-guide/page.test.tsx)
- [archive/Gcl_Archive/Hands-on/html/Gcp-security-fundamentals-guide.html](archive/Gcl_Archive/Hands-on/html/Gcp-security-fundamentals-guide.html)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-07-28: ACE「Google Cloud アプリ開発環境構築 完全ガイド」移行 (完了)

### 目的

`Gcp-app-dev-environment-complete-guide.html`（静的HTML・2246行）を、正準の設計パターン（NavBar + page.tsx + SetUpAnAppDevEnvironmentGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud` ルートへ完全移行する。文章・表・14個のMermaid図・コードブロック・注意書きの一切の省略・要約なしで移植。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test: add failing tests for GCP app dev environment complete guide` (`__tests__/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud/page.test.tsx` テスト更新)
- [x] **Step 2 (Green)**: `feat: implement GCP app dev environment complete guide component` (`page.tsx`, `SetUpAnAppDevEnvironmentGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 実装、全10章・表・Mermaid 14図の完全移行)
- [x] **Step 3 (Refactor / Integration)**: `refactor: integrate GCP app dev environment guide into routing and update docs` (`app/constants.ts` EXAMSラベル調整、`CLAUDE.md` / `GEMINI.md` ドキュメント更新)
- [x] **Step 4 (Fix & Move)**: `fix: resolve className console error and move page to hands-on route` (`class=` を `className=` に精査・修正、`hands-on` ルートへ配置変更)
- [x] **Step 5 (ESLint / SonarQube Error Fix)**: `fix: wrap JSX comment text nodes in template literals to resolve react/jsx-no-comment-textnodes and S6438 errors` (883, 888, 889, 891, 892行目の `//` テキストノードを `{`// ...`}` に全件置換しエラー全件解消)
- [x] **Step 6 (Hamburger Menu Navigation Update)**: `feat: update hamburger menu item label to Hands-on in EXAMS constant` (`app/constants.ts` の GCP ハンズオンエントリ表示名を「Hands-on」へ変更、ドメイン一覧の追加、`globals.css` のスタイル定義更新)
- [x] **Step 7 (Mermaid 1rem Text Scale Fix)**: `fix: adjust Mermaid diagram layout and styles to ensure 1rem text size` (`page.css` の `max-width: 100% !important` 強制縮小を解除、`.diagram-wrap` に `overflow-x: auto` を適用し、`preserveNaturalScale={true}` による 1rem 自然倍率文字表示を保証)
- [x] **Step 8 (Consolidate All Hands-on Routes & Navigation)**: `refactor: consolidate hands-on guides into Hands-on navigation group` (`cloud-load-balancing-guide`, `develop-your-gcp-network`, `build-a-secure-google-cloud-network` を `hands-on/` 配下へ移動し、`app/constants.ts` の ACE グループから重複リンクを削除して `Hands-on` グループへ全5ガイドを完了集約)
- [x] **Step 9 (Custom Overview Label Navigation Update)**: `feat: add custom overviewLabel support and set Hands-on overview item to IAP TCP Forwarding` (`app/navigation.ts` の `toNavTree` に `overviewLabel` オプションを追加し、`Hands-on` アコーディオンの先頭リンク名を「概要」から「IAP（Identity-Aware Proxy）TCP フォワーディング」へ変更)
- [x] **Step 10 (Develop Your GCP Network 1rem Text Scale Fix)**: `fix: adjust Mermaid diagram layout and styles to ensure 1rem text size in develop-your-gcp-network` (`DevelopYourGcpNetworkGuide.tsx` に `preserveNaturalScale={true}` を明示し、`page.css` のスクロールとスタイルを調整して 14個の全Mermaid図の1rem自然文字倍率表示を保証)
- [x] **Step 11 (Full Width Main Content Layout Expansion)**: `feat: expand main content layout to full width in develop-your-gcp-network` (`page.css` の `.shell` コンテナの `max-width` 制限を解除・100%へ拡張し、メインコンテンツを画面横幅いっぱいに拡大表示)

### 関連ファイル

- [app/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud/page.tsx](app/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud/page.tsx)
- [app/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud/SetUpAnAppDevEnvironmentGuide.tsx](app/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud/SetUpAnAppDevEnvironmentGuide.tsx)
- [app/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud/NavBar.tsx](app/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud/NavBar.tsx)
- [app/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud/constants.ts](app/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud/constants.ts)
- [app/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud/page.css](app/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud/page.css)
- [__tests__/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud/page.test.tsx](__tests__/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud/page.test.tsx)
- [archive/Gcl_Archive/Associate-Cloud-Engineer/html/Gcp-app-dev-environment-complete-guide.html](archive/Gcl_Archive/Associate-Cloud-Engineer/html/Gcp-app-dev-environment-complete-guide.html)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-07-23: Cisco「CCNA Automation APIの理解と活用 完全ガイド」移行 (完了)

### 目的

`Ccna-automation-api-guide.html`（静的HTML）および `Ccna-automation-api-guide.md` を、正準の設計パターン（NavBar + page.tsx + CcnaAutomationApiGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/cisco/ccna/automation-api-guide` ルートへ移行・追加する。また、グローバルナビゲーション（`app/constants.ts`）の CCNA エントリに「2.0 APIの理解と活用」を追加・同期する。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test: add failing tests for ccna automation api guide` (`__tests__/cisco/ccna/automation-api-guide/page.test.tsx` テストの作成)
- [x] **Step 2 (Green)**: `feat: implement ccna automation api guide to pass tests` (`page.tsx`, `CcnaAutomationApiGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 実装、全16セクション・テーブル・Mermaid 9図の完璧な移行、`app/constants.ts` へのドメイン追加)
- [x] **Step 3 (Refactor / Archive & Docs Sync)**: `docs: archive html and md files for ccna automation api guide and update migration progress` (`Ccna-automation-api-guide.html` および `Ccna-automation-api-guide.md` の `archive/Cisco/` への移動、`MIGRATION_PROGRESS.md` の更新)

### 関連ファイル

- [app/cisco/ccna/automation-api-guide/page.tsx](app/cisco/ccna/automation-api-guide/page.tsx)
- [app/cisco/ccna/automation-api-guide/CcnaAutomationApiGuide.tsx](app/cisco/ccna/automation-api-guide/CcnaAutomationApiGuide.tsx)
- [app/cisco/ccna/automation-api-guide/NavBar.tsx](app/cisco/ccna/automation-api-guide/NavBar.tsx)
- [app/cisco/ccna/automation-api-guide/constants.ts](app/cisco/ccna/automation-api-guide/constants.ts)
- [app/cisco/ccna/automation-api-guide/page.css](app/cisco/ccna/automation-api-guide/page.css)
- [__tests__/cisco/ccna/automation-api-guide/page.test.tsx](__tests__/cisco/ccna/automation-api-guide/page.test.tsx)
- [app/constants.ts](app/constants.ts)
- [archive/Cisco/html/Ccna-automation-api-guide.html](archive/Cisco/html/Ccna-automation-api-guide.html)
- [archive/Cisco/md/Ccna-automation-api-guide.md](archive/Cisco/md/Ccna-automation-api-guide.md)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-07-23: Cisco「CCNA 200-301 IP Services 完全ガイド」移行 (完了)

### 目的

`Ccna-ip-services-guide.html`（静的HTML・1680行）を、正準の設計パターン（NavBar + page.tsx + CcnaIpServicesGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/cisco/ccna/ip-services-guide` ルートへ移行・追加する。また、グローバルナビゲーション（`app/constants.ts`）の CCNA エントリに「4.0 IP Services（IP サービス）」を追加・同期する。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(ccna): add failing tests for ccna ip services guide page` (`__tests__/cisco/ccna/ip-services-guide/page.test.tsx` テストの作成)
- [x] **Step 2 (Green)**: `feat(ccna): migrate all content, css, and diagrams for ccna ip services guide` (`page.tsx`, `CcnaIpServicesGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 実装、全12セクション・テーブル・Mermaid 12図の完璧な移行)
- [x] **Step 3 (Refactor / Integration & Archive & Docs Sync)**: `refactor(ccna): integrate ccna ip services guide into routing and update docs` (`app/constants.ts` へのドメイン追加、`Ccna-ip-services-guide.html` の `archive/Cisco/html/ccna/` への退避、`CLAUDE.md` / `GEMINI.md` / `MIGRATION_PROGRESS.md` の更新)

### 関連ファイル

- [app/cisco/ccna/ip-services-guide/page.tsx](app/cisco/ccna/ip-services-guide/page.tsx)
- [app/cisco/ccna/ip-services-guide/CcnaIpServicesGuide.tsx](app/cisco/ccna/ip-services-guide/CcnaIpServicesGuide.tsx)
- [app/cisco/ccna/ip-services-guide/NavBar.tsx](app/cisco/ccna/ip-services-guide/NavBar.tsx)
- [app/cisco/ccna/ip-services-guide/constants.ts](app/cisco/ccna/ip-services-guide/constants.ts)
- [app/cisco/ccna/ip-services-guide/page.css](app/cisco/ccna/ip-services-guide/page.css)
- [__tests__/cisco/ccna/ip-services-guide/page.test.tsx](__tests__/cisco/ccna/ip-services-guide/page.test.tsx)
- [app/constants.ts](app/constants.ts)
- [archive/Cisco/html/ccna/Ccna-ip-services-guide.html](archive/Cisco/html/ccna/Ccna-ip-services-guide.html)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

## 2026-07-23: Cisco「CCNA 200-301 IP Connectivity（IP接続性）編」移行 (完了)

### 目的

`Ccna-ip-connectivity-guide.html`（静的HTML・1180行）を、正準の設計パターン（NavBar + page.tsx + CcnaIpConnectivityGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/cisco/ccna/ip-connectivity-guide` ルートへ移行・追加する。また、グローバルナビゲーション（`app/constants.ts`）の CCNA エントリに「3.0 IP Connectivity（IP接続性）」を追加・同期する。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(ccna): add failing tests for ccna ip connectivity guide page` (`__tests__/cisco/ccna/ip-connectivity-guide/page.test.tsx` テストの作成)
- [x] **Step 2 (Green)**: `feat(ccna): migrate all content, css, and diagrams for ccna ip connectivity guide` (`page.tsx`, `CcnaIpConnectivityGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 実装、全6章＋まとめ＋参考ソース、テーブル、Mermaid 7図の完璧な移行)
- [x] **Step 3 (Refactor / Integration & Archive & Docs Sync)**: `refactor(ccna): integrate ccna ip connectivity guide into routing and sync docs` (`app/constants.ts` へのドメイン追加、`Ccna-ip-connectivity-guide.html` / `.md` の `archive/Cisco/html/` への退避、`MIGRATION_PROGRESS.md` の更新)
- [x] **Step 4 (Layout Expansion & Syntax Highlighting)**: `feat(ccna): update layout to full width and add vibrant syntax highlighting to code blocks` (レイアウトを画面いっぱいの全幅表示へ拡張、コードブロックを `.code-line` 構造化し、コメント・プロンプト・コマンド・数値等の視認性の高いシンタックスハイライトを追加)
- [x] **Step 5 (Mermaid Diagram Sizing Fix)**: `feat(mermaid): optimize diagram sizing for small and extra tall diagrams` (図解の豆粒化と過大縦伸張を解消するため、`applySvgFixups` で小型図の適正拡大・縦長図の最大高さ上限および垂直スクロール制御を導入)

### 関連ファイル

- [app/cisco/ccna/ip-connectivity-guide/page.tsx](app/cisco/ccna/ip-connectivity-guide/page.tsx)
- [app/cisco/ccna/ip-connectivity-guide/CcnaIpConnectivityGuide.tsx](app/cisco/ccna/ip-connectivity-guide/CcnaIpConnectivityGuide.tsx)
- [app/cisco/ccna/ip-connectivity-guide/NavBar.tsx](app/cisco/ccna/ip-connectivity-guide/NavBar.tsx)
- [app/cisco/ccna/ip-connectivity-guide/constants.ts](app/cisco/ccna/ip-connectivity-guide/constants.ts)
- [app/cisco/ccna/ip-connectivity-guide/page.css](app/cisco/ccna/ip-connectivity-guide/page.css)
- [__tests__/cisco/ccna/ip-connectivity-guide/page.test.tsx](__tests__/cisco/ccna/ip-connectivity-guide/page.test.tsx)
- [app/constants.ts](app/constants.ts)
- [archive/Cisco/html/Ccna-ip-connectivity-guide.html](archive/Cisco/html/Ccna-ip-connectivity-guide.html)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-07-23: Cisco「CCNA Automation ソフトウェア開発と設計 完全ガイド」移行 (完了)

### 目的

`Ccna-automation-software-development-design.html`（静的HTML・1932行）を、正準の設計パターン（NavBar + page.tsx + CcnaSoftwareDevDesignGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/cisco/ccna/automation-software-development-design` ルートへ移行・追加する。また、グローバルナビゲーション（`app/constants.ts`）の CCNA エントリに「1.0 ソフトウェア開発と設計」を追加・同期する。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(ccna): add tests for ccna automation software development design page` (`__tests__/cisco/ccna/automation-software-development-design/page.test.tsx` テストの作成)
- [x] **Step 2 (Green)**: `feat(ccna): implement ccna automation software development design page` (`page.tsx`, `CcnaSoftwareDevDesignGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 実装、全13セクション・テーブル・Mermaid 12図の完璧な移行)
- [x] **Step 3 (Refactor / Integration & Archive)**: `refactor(ccna): integrate ccna automation software development design page into routing and sync docs` (`app/constants.ts` へのドメイン追加、`Ccna-automation-software-development-design.html` の `archive/Cisco/html/ccna/` への退避、`CLAUDE.md` / `GEMINI.md` / `MIGRATION_PROGRESS.md` の更新)

### 関連ファイル

- [app/cisco/ccna/automation-software-development-design/page.tsx](app/cisco/ccna/automation-software-development-design/page.tsx)
- [app/cisco/ccna/automation-software-development-design/CcnaSoftwareDevDesignGuide.tsx](app/cisco/ccna/automation-software-development-design/CcnaSoftwareDevDesignGuide.tsx)
- [app/cisco/ccna/automation-software-development-design/NavBar.tsx](app/cisco/ccna/automation-software-development-design/NavBar.tsx)
- [app/cisco/ccna/automation-software-development-design/constants.ts](app/cisco/ccna/automation-software-development-design/constants.ts)
- [app/cisco/ccna/automation-software-development-design/page.css](app/cisco/ccna/automation-software-development-design/page.css)
- [__tests__/cisco/ccna/automation-software-development-design/page.test.tsx](__tests__/cisco/ccna/automation-software-development-design/page.test.tsx)
- [app/constants.ts](app/constants.ts)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-07-23: Cisco「CCNA試験 完全ガイド」移行 (完了)

### 目的

`Ccna-beginner-guide.html`（静的HTML・1572行）を、正準の設計パターン（NavBar + page.tsx + CcnaBeginnerGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/cisco/ccna/beginner-guide` ルートへ移行・追加する。また、データ駆動ナビゲーション（`app/constants.ts` / `app/globals.css`）に Cisco Provider と CCNA エントリを追加し、グローバルナビゲーションに自動反映する。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(ccna): add failing tests for ccna beginner guide page` (`__tests__/cisco/ccna/beginner-guide/page.test.tsx` テストの作成)
- [x] **Step 2 (Green / Skeleton & Content)**: `feat(ccna): migrate all content, css, and diagrams for ccna beginner guide` (`page.tsx`, `CcnaBeginnerGuide.tsx`, `NavBar.tsx`, `constants.ts`, `page.css` 実装、全12セクション・テーブル・Mermaid 5図の完璧な移行)
- [x] **Step 3 (Refactor / Integration)**: `refactor(ccna): integrate ccna beginner guide into routing and update docs` (`app/constants.ts` への Provider: Cisco および CCNA エントリ追加、`app/globals.css` へのテーマ変数・ユーティリティ追加、`CLAUDE.md` / `GEMINI.md` の更新)
- [x] **Step 4 (Docs Sync & Archive)**: `chore(docs): update MIGRATION_PROGRESS.md and archive ccna beginner guide html` (`MIGRATION_PROGRESS.md` の更新、ソースファイル `Ccna-beginner-guide.html` および `.md` の `archive/Cisco/html/ccna/` と `archive/Cisco/md/ccna/` への退避)
- [x] **Step 5 (Layout & Nav Adjustment)**: `feat(nav): expand main content width and add Cisco provider to hamburger nav tree` (`app/navigation.ts` の `PROVIDER_LABEL`/`PROVIDER_ORDER` への Cisco 追加によるハンバーガーメニュー反映、`page.css` のメイン幅100%拡張)

### 関連ファイル

- [app/cisco/ccna/beginner-guide/page.tsx](app/cisco/ccna/beginner-guide/page.tsx)
- [app/cisco/ccna/beginner-guide/CcnaBeginnerGuide.tsx](app/cisco/ccna/beginner-guide/CcnaBeginnerGuide.tsx)
- [app/cisco/ccna/beginner-guide/NavBar.tsx](app/cisco/ccna/beginner-guide/NavBar.tsx)
- [app/cisco/ccna/beginner-guide/constants.ts](app/cisco/ccna/beginner-guide/constants.ts)
- [app/cisco/ccna/beginner-guide/page.css](app/cisco/ccna/beginner-guide/page.css)
- [__tests__/cisco/ccna/beginner-guide/page.test.tsx](__tests__/cisco/ccna/beginner-guide/page.test.tsx)
- [app/constants.ts](app/constants.ts)
- [app/globals.css](app/globals.css)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-07-04: ACE「Google Cloud ネットワークセキュリティ実践ガイド」用語解説追加 (完了)

### 目的

`build-a-secure-google-cloud-network` の各セクションにネットワーク関連の専門用語説明（glossary）を追加し、学習効果を高める。

### 完了済みステップ

- [x] **テスト作成（Red）**: `__tests__/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/page.test.tsx` に各セクションの用語解説表示を確認するテストを追加。
- [x] **実装（Green）**: `BuildASecureGoogleCloudNetworkGuide.tsx` の各セクション（S1〜S8）の末尾に、CSS設計に基づいた美しく機能的な `.glossary` コンポーネントを実装。
- [x] **スタイル定義**: `page.css` に `.glossary` コンポーネントのレスポンシブおよびテーマ整合スタイルを追加。
- [x] **全体テスト通過**: プロジェクト全体の 580 テストケースがすべてパスすることを確認。

### 関連ファイル

- [app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/BuildASecureGoogleCloudNetworkGuide.tsx](app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/BuildASecureGoogleCloudNetworkGuide.tsx)
- [app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/page.css](app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/page.css)
- [__tests__/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/page.test.tsx](__tests__/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/page.test.tsx)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-07-04: ACE「Google Cloud アプリ開発環境構築ガイド」移行 (完了)

### 目的

`Set-Up-an-App-Dev-Environment-on-Google-Cloud.html`（静的HTML・1057行）を、他の完全ガイド（`section1`〜`section4`、`build-a-secure-google-cloud-network` 等）と同じ設計パターン（NavBar + page.tsx + SetUpAnAppDevEnvironmentGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud` ルートへ移行・追加する。デザインは HTML を忠実に再現しつつ、globals.css のダークテーマデザイントークンに整合。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(ace): add failing tests for set-up-an-app-dev-environment-on-google-cloud page` (テストの作成)
- [x] **Step 2 (Green)**: `feat(ace): implement set-up-an-app-dev-environment-on-google-cloud page skeleton to pass tests` (最小構成の page.tsx, SetUpAnAppDevEnvironmentGuide.tsx, page.css, NavBar.tsx, constants.ts 実装)
- [x] **Step 3 (Content Migration & CSS Mapping)**: `feat(ace): migrate all content, css mapping, and mermaid diagrams` (全コンテンツ、コピー機能、Mermaid 7図、scoped CSS の移植・リファクタリング、警告の解消)
- [x] **Step 4 (Refactor / Integration)**: `refactor(ace): integrate app dev environment guide into routing and update docs` (constants.ts へのルーティング統合、CLAUDE.md / GEMINI.md の更新)
- [x] **Step 5 (Docs Sync & Archive)**: `chore(docs): update MIGRATION_PROGRESS.md and archive source files` (元HTMLおよびMDファイルを `Gcl_Archive/Associate-Cloud-Engineer/` へ退避)

### 関連ファイル

- [app/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud/page.tsx](app/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud/page.tsx)
- [app/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud/SetUpAnAppDevEnvironmentGuide.tsx](app/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud/SetUpAnAppDevEnvironmentGuide.tsx)
- [app/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud/NavBar.tsx](app/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud/NavBar.tsx)
- [app/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud/constants.ts](app/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud/constants.ts)
- [app/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud/page.css](app/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud/page.css)
- [__tests__/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud/page.test.tsx](__tests__/gcl/associate-cloud-engineer/set-up-an-app-dev-environment-on-google-cloud/page.test.tsx)
- [app/constants.ts](app/constants.ts)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-07-04: ACE「Google Cloud ネットワークセキュリティ実践ガイド」移行 (完了)

### 目的

`Build-a-Secure-Google-Cloud-Network.html`（静的HTML・1380行）を、他の完全ガイド（`section1`〜`section4`、`develop-your-gcp-network` 等）と同じ設計パターン（NavBar + page.tsx + BuildASecureGoogleCloudNetworkGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network` ルートへ移行・追加する。デザインは HTML を忠実に再現しつつ、globals.css のダークテーマデザイントークンに整合。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(ace): add failing tests for build-a-secure-google-cloud-network page` (テストの作成)
- [x] **Step 2 (Green)**: `feat(ace): implement build-a-secure-google-cloud-network page skeleton to pass tests` (最小構成の page.tsx, BuildASecureGoogleCloudNetworkGuide.tsx, page.css, NavBar.tsx, constants.ts 実装)
- [x] **Step 3 (Content Migration & CSS Mapping)**: `feat(ace): migrate all content, css mapping, and mermaid diagrams` (全コンテンツ、パケットフローアニメーション、Mermaid 11図、scoped CSS の移植・リファクタリング、リンター修正)
- [x] **Step 4 (Refactor / Integration)**: `refactor(ace): integrate secure network guide into routing and update docs` (constants.ts へのルーティング統合、CLAUDE.md / GEMINI.md の更新)
- [x] **Step 5 (Docs Sync & Archive)**: `chore(docs): update MIGRATION_PROGRESS.md and archive source html` (元HTMLファイルを `Gcl_Archive/Associate-Cloud-Engineer/` へ退避)

### 関連ファイル

- [app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/page.tsx](app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/page.tsx)
- [app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/BuildASecureGoogleCloudNetworkGuide.tsx](app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/BuildASecureGoogleCloudNetworkGuide.tsx)
- [app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/NavBar.tsx](app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/NavBar.tsx)
- [app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/constants.ts](app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/constants.ts)
- [app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/page.css](app/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/page.css)
- [__tests__/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/page.test.tsx](__tests__/gcl/associate-cloud-engineer/build-a-secure-google-cloud-network/page.test.tsx)
- [app/constants.ts](app/constants.ts)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-06-29: ACE「GCPネットワーク完全入門」移行 (完了)

### 目的

`Develop-Your-Google-Cloud-Network.html`（静的HTML・1638行）を、他の完全ガイド（`section1`〜`section4`）と同じ設計パターン（NavBar + page.tsx + DevelopYourGcpNetworkGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/gcl/associate-cloud-engineer/develop-your-gcp-network` ルートへ移行・追加する。デザインは HTML を忠実に再現しつつ、globals.css のダークテーマデザイントークンに整合。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test: add failing tests for develop-your-gcp-network page` (テストの作成)
- [x] **Step 2 (Green)**: `feat(ace): implement develop-your-gcp-network page to pass tests` (最小構成の page.tsx, DevelopYourGcpNetworkGuide.tsx, page.css, NavBar.tsx, constants.ts 実装)
- [x] **Step 3 (Refactor / Integration)**: `refactor(ace): integrate develop-your-gcp-network into routing and update docs` (constants.ts へのルーティング統合、CLAUDE.md / GEMINI.md の更新、IntersectionObserver 関連の vitest グローバルモックの改善・CLBガイドのテスト不具合修正)
- [x] **Step 4 (Docs Sync & Archive)**: `chore(docs): update MIGRATION_PROGRESS.md — Develop-Your-Google-Cloud-Network 移行完了` (元HTMLファイルを `archive/Gcl_Archive/Associate-Cloud-Engineer/` または `Gcl_Archive/` 配下へ移動)

### 関連ファイル

- [app/gcl/associate-cloud-engineer/develop-your-gcp-network/page.tsx](app/gcl/associate-cloud-engineer/develop-your-gcp-network/page.tsx)
- [app/gcl/associate-cloud-engineer/develop-your-gcp-network/DevelopYourGcpNetworkGuide.tsx](app/gcl/associate-cloud-engineer/develop-your-gcp-network/DevelopYourGcpNetworkGuide.tsx)
- [app/gcl/associate-cloud-engineer/develop-your-gcp-network/NavBar.tsx](app/gcl/associate-cloud-engineer/develop-your-gcp-network/NavBar.tsx)
- [app/gcl/associate-cloud-engineer/develop-your-gcp-network/constants.ts](app/gcl/associate-cloud-engineer/develop-your-gcp-network/constants.ts)
- [app/gcl/associate-cloud-engineer/develop-your-gcp-network/page.css](app/gcl/associate-cloud-engineer/develop-your-gcp-network/page.css)
- [__tests__/gcl/associate-cloud-engineer/develop-your-gcp-network/page.test.tsx](__tests__/gcl/associate-cloud-engineer/develop-your-gcp-network/page.test.tsx)
- [app/constants.ts](app/constants.ts)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-06-27: ACE「Cloud Load Balancing 完全入門」移行 (完了)

### 目的

`cloud-load-balancing-guide.html`（静的HTML・1,536行）を、他の完全ガイド（`section1`〜`section4`）と同じ設計パターン（NavBar + page.tsx + CloudLoadBalancingGuide.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/gcl/associate-cloud-engineer/cloud-load-balancing-guide` ルートへ移行・追加する。デザインは HTML を忠実に再現しつつ、globals.css のダークテーマデザイントークンに整合。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(ace-lb): add failing tests for cloud load balancing guide page` (テストの作成)
- [x] **Step 2 (Green)**: `feat(ace-lb): implement basic layout and components for cloud load balancing guide` (最小構成の page.tsx 実装)
- [x] **Step 3 (Refactor / Content Migration)**: `feat(ace-lb): migrate all content and style from HTML to page` (全コンテンツ、コピー機能、Mermaid 6図、ビジュアライザ SVG、scoped CSS の移植・リファクタリング完了)
- [x] **Step 4 (Refactor / Integration)**: `refactor(ace-lb): integrate cloud load balancing guide into routing and update docs` (constants.ts へのルーティング統合、CLAUDE.md / GEMINI.md の更新、カバレッジダッシュボードの再生成)
- [x] **Step 5 (Docs Sync & Archive)**: `chore(docs): update MIGRATION_PROGRESS.md — migrate cloud load balancing guide and archive html` (元HTMLファイルを `archive/Gcl_Archive/Associate-Cloud-Engineer/` へ退避)

### 関連ファイル

- [app/gcl/associate-cloud-engineer/cloud-load-balancing-guide/page.tsx](app/gcl/associate-cloud-engineer/cloud-load-balancing-guide/page.tsx)
- [app/gcl/associate-cloud-engineer/cloud-load-balancing-guide/CloudLoadBalancingGuide.tsx](app/gcl/associate-cloud-engineer/cloud-load-balancing-guide/CloudLoadBalancingGuide.tsx)
- [app/gcl/associate-cloud-engineer/cloud-load-balancing-guide/NavBar.tsx](app/gcl/associate-cloud-engineer/cloud-load-balancing-guide/NavBar.tsx)
- [app/gcl/associate-cloud-engineer/cloud-load-balancing-guide/constants.ts](app/gcl/associate-cloud-engineer/cloud-load-balancing-guide/constants.ts)
- [app/gcl/associate-cloud-engineer/cloud-load-balancing-guide/page.css](app/gcl/associate-cloud-engineer/cloud-load-balancing-guide/page.css)
- [__tests__/gcl/associate-cloud-engineer/cloud-load-balancing-guide/page.test.tsx](__tests__/gcl/associate-cloud-engineer/cloud-load-balancing-guide/page.test.tsx)
- [app/constants.ts](app/constants.ts)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-06-17: ACE Section 4「アクセスとセキュリティの構成」完全ガイド移行 (完了)

### 目的

`Gcp-ace-section4-complete-guide.html`（静的HTML）を、`section1`〜`section3`と同じ設計パターン（NavBar + page.tsx + AceSection4Guide.tsx + constants.ts + page.module.css）で `app/gcl/associate-cloud-engineer/section4` ルートへ移行・追加する。デザインは HTML を忠実に再現しつつ、globals.css のダークテーマデザイントークンに整合。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(ace-s4): add failing tests for section4 complete guide page` — `d0bc9fd`
- [x] **Step 2 (Green)**: `feat(ace-s4): implement basic layout and components for section4` — `246ff6d`, `b915d0f`
- [x] **Step 3 (Refactor / Content Migration)**: `feat(ace-s4): migrate all content and style from HTML to section4 page` — `8fae321`, `9e145ea`, `0513691` (全コンテンツの移植、パースエラー・参照エラー・ESLint エラー等の解消、11件のテストおよびリンター完全パス)
- [x] **Step 4 (Refactor / Integration)**: `feat(ace-s4): integrate section4 guide link into global constants navigation` — `ec8a56e` (constants.ts へのルーティング・ナビゲーション統合)
- [x] **Step 5 (Docs Sync & Archive)**: `docs(ace-s4): archive migrated section4 HTML and Markdown files` — `053250e` (元HTML・MDファイルを `Gcl_Archive/Associate-Cloud-Engineer/` へ退避)

### 関連ファイル

- [app/gcl/associate-cloud-engineer/section4/page.tsx](app/gcl/associate-cloud-engineer/section4/page.tsx)
- [app/gcl/associate-cloud-engineer/section4/AceSection4Guide.tsx](app/gcl/associate-cloud-engineer/section4/AceSection4Guide.tsx)
- [app/gcl/associate-cloud-engineer/section4/NavBar.tsx](app/gcl/associate-cloud-engineer/section4/NavBar.tsx)
- [app/gcl/associate-cloud-engineer/section4/constants.ts](app/gcl/associate-cloud-engineer/section4/constants.ts)
- [app/gcl/associate-cloud-engineer/section4/page.module.css](app/gcl/associate-cloud-engineer/section4/page.module.css)
- [__tests__/gcl/associate-cloud-engineer/section4/page.test.tsx](__tests__/gcl/associate-cloud-engineer/section4/page.test.tsx)
- [app/constants.ts](app/constants.ts)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-06-16: ACE Section 4「アクセスとセキュリティの構成」完全ガイド HTML 調整 (完了)

### 目的

`Gcp-ace-section4-complete-guide.md` の内容に基づき、`Gcp-ace-section4-complete-guide.html` に不足していた Policy Analyzer の説明やコマンド、SA削除後30日間の復元仕様、自己権限借用の禁止、引っかけ問題10選、および学習の最終アドバイスセクションを追加・同期する。

### 完了済みステップ

- [x] MDとHTMLの差分調査
- [x] `Gcp-ace-section4-complete-guide.html` に不足しているコンテンツの追記（Policy Analyzer、引っかけ問題10選、最終アドバイスなど）
- [x] ユニットテスト実行 (`npx vitest run` 529件全パス確認)
- [x] コミット: `docs(gcl): update section 4 security guide with traps and advice`

### 関連ファイル

- [Gcp-ace-section4-complete-guide.html](Gcp-ace-section4-complete-guide.html)
- [Gcp-ace-section4-complete-guide.md](Gcp-ace-section4-complete-guide.md)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-06-15: ACE Section 3「オペレーション・モニタリング」完全ガイド移行 (完了)

### 目的

`Ace-section3-operation-complete-guide.html`（静的HTML・3,425行）を、`section1` / `section2` と同じ設計パターン（NavBar + page.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/gcl/associate-cloud-engineer/section3` ルートへ移行・追加する。デザインは HTML を忠実に再現しつつ globals.css のダークテーマデザイントークンに整合。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test: add failing tests for ACE section3 guide`
- [x] **Step 2 (Green)**: `feat: implement ACE section3 page to pass tests` (Mermaid 10図の constants 移植、code-block の code-line 分割、チェックリスト client state 化)
- [x] **Step 3 (Refactor / Integration)**: `refactor: integrate ACE section3 into constants.ts` (constants.ts へのルーティング統合)
- [x] **Step 4 (Docs Sync)**: ドキュメント類の同期、HTMLソースのアーカイブ化（Gcl_Archive/Associate-Cloud-Engineer/ への移動）

### 関連ファイル

- [app/gcl/associate-cloud-engineer/section3/page.tsx](app/gcl/associate-cloud-engineer/section3/page.tsx)
- [app/gcl/associate-cloud-engineer/section3/AceSection3Guide.tsx](app/gcl/associate-cloud-engineer/section3/AceSection3Guide.tsx)
- [app/gcl/associate-cloud-engineer/section3/NavBar.tsx](app/gcl/associate-cloud-engineer/section3/NavBar.tsx)
- [app/gcl/associate-cloud-engineer/section3/constants.ts](app/gcl/associate-cloud-engineer/section3/constants.ts)
- [app/gcl/associate-cloud-engineer/section3/page.module.css](app/gcl/associate-cloud-engineer/section3/page.module.css)
- [__tests__/gcl/associate-cloud-engineer/section3/page.test.tsx](__tests__/gcl/associate-cloud-engineer/section3/page.test.tsx)
- [app/constants.ts](app/constants.ts)
- [MIGRATION_PROGRESS.md](MIGRATION_PROGRESS.md)

---

## 2026-06-11: ACE Section 2「計画と実装」完全ガイド移行 (完了)

### 目的

`Gcp-ace-domain2-deep-dive.html`（静的HTML・3,585行）を、`section1` と同じ設計パターン（NavBar + page.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/gcl/associate-cloud-engineer/section2` ルートへ移行・追加する。デザインは HTML を忠実に再現しつつ globals.css のダークテーマデザイントークンに整合。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(ace-s2): add failing tests for section2 complete guide page`
- [x] **Step 2 (Green)**: `feat(ace-s2): implement basic layout and components for section2`
- [x] **Step 3 (Refactor / Content Migration)**: `feat(ace-s2): migrate all content and style from HTML to section2 page` (コンテンツ移行完了、テスト通過)
- [x] **Step 4 (Docs Sync)**: `refactor(ace-s2): integrate section2 into routing and update docs` (アーカイブ移動、ドキュメント更新完了)

### 関連ファイル

- [app/gcl/associate-cloud-engineer/section2/page.tsx](app/gcl/associate-cloud-engineer/section2/page.tsx)
- [app/gcl/associate-cloud-engineer/section2/Section2Guide.tsx](app/gcl/associate-cloud-engineer/section2/Section2Guide.tsx)
- [app/gcl/associate-cloud-engineer/section2/NavBar.tsx](app/gcl/associate-cloud-engineer/section2/NavBar.tsx)
- [app/gcl/associate-cloud-engineer/section2/constants.ts](app/gcl/associate-cloud-engineer/section2/constants.ts)
- [app/gcl/associate-cloud-engineer/section2/page.css](app/gcl/associate-cloud-engineer/section2/page.css)
- [__tests__/gcl/associate-cloud-engineer/section2/page.test.tsx](__tests__/gcl/associate-cloud-engineer/section2/page.test.tsx)
- [app/constants.ts](app/constants.ts)

---

## 2026-06-10: ACE Section 1「環境設定」完全ガイド移行 (完了)

### 目的

`Ace-section1-complete-guide.html`（静的HTML・3,615行）を、`complete-advanced-guide` と同じ設計パターン（NavBar + page.tsx + constants.ts + page.css + 共有 MermaidDiagram）で `app/gcl/associate-cloud-engineer/section1` ルートへ移行・共存させる。デザインは HTML を忠実に再現しつつ色は globals.css の design token に整合。

### 完了済みステップ

- [x] **Step 1 (Red)**: `test(ace-s1): add failing tests for section1 complete guide page`
- [x] **Step 2 (Green)**: `feat(ace-s1): implement section1 complete guide page`
  - Mermaid 15図を `constants.ts` へ移植。壊れていた `diag-6`（クォータ申請フロー）を線形フローに修正。
  - code-block は `dangerouslySetInnerHTML`、表は `<thead>/<th scope>`、チェックリストは client state でトグル化。
- [x] **Step 3 (Refactor)**: `refactor(ace-s1): integrate section1 into nav and update docs`
  - `app/constants.ts` の `EXAMS` に「Section 1: 環境設定 完全ガイド（~23%）」を追加（Header 自動反映）。
  - `CLAUDE.md` に section1 構成を追記。`bun run build` / `bun run lint` パス。
- [x] **Step 4 (Docs Sync)**: `chore(docs): update MIGRATION_PROGRESS.md — ACE section1 移行完了`

### コンテンツ補正（完了）

公式 PDF ファイル名 `063026_..._exam_guide`（= 2026/06/30）および Google 公式アナウンスに基づき、HTML本文の誤記を修正:

- 「試験ガイド 2025年6月30日版」→「**2026年6月30日版**」
- hero スタット「2025」→「**2026**」、配点「~20%」→「**~23%**」
- IAM Conditions の `timestamp("2025-12-31...")` はサンプル値のため変更せず。

### 関連ファイル

- [app/gcl/associate-cloud-engineer/section1/page.tsx](app/gcl/associate-cloud-engineer/section1/page.tsx)
- [app/gcl/associate-cloud-engineer/section1/Section1Guide.tsx](app/gcl/associate-cloud-engineer/section1/Section1Guide.tsx)
- [app/gcl/associate-cloud-engineer/section1/NavBar.tsx](app/gcl/associate-cloud-engineer/section1/NavBar.tsx)
- [app/gcl/associate-cloud-engineer/section1/constants.ts](app/gcl/associate-cloud-engineer/section1/constants.ts)
- [app/gcl/associate-cloud-engineer/section1/page.css](app/gcl/associate-cloud-engineer/section1/page.css)
- [__tests__/gcl/associate-cloud-engineer/section1/page.test.tsx](__tests__/gcl/associate-cloud-engineer/section1/page.test.tsx)
- [app/constants.ts](app/constants.ts)
- [CLAUDE.md](CLAUDE.md)

> 備考: 元 `Ace-section1-complete-guide.html` / `.md` はユーザー指示によりリポジトリルートに残置（アーカイブ移動・削除しない）。

---

## 2026-06-07: GCP Associate Cloud Engineer 完全試験対策ガイド移行 (完了)

### 目的

`Gcp-ace-complete-advanced-guide.html` に基づく「完全試験対策ガイド（シングルページ）」を、既存のサブページや親ページを置き換えることなく、Next.js アプリの `app/gcl/associate-cloud-engineer/complete-advanced-guide` ルートに共存・追加する。

### 完了済みステップ

- [x] **Step 1**: `test(ace-guide): add failing tests for complete advanced guide page`
  - 新規テストファイル `__tests__/gcl/associate-cloud-engineer/complete-advanced-guide/page.test.tsx` を作成し、失敗を確認。
- [x] **Step 2**: `feat(ace-guide): implement basic layout and components for complete advanced guide`
  - 最小限の `page.tsx`, `page.css`, `NavBar.tsx` を実装し、テストをパス。
- [x] **Step 3**: `feat(ace-guide): migrate all content and style from HTML to complete advanced guide page`
  - 変換スクリプト `scratch/convert.mjs` を実行し、全セクションのコンテンツ（テキスト、コードブロック、テーブル、ダイアグラム）と scoped CSS を忠実に移行。
  - テストおよび IntersectionObserver のモックを設定し、Vitest が正常にパスすることを確認。
- [x] **Step 4**: `refactor(ace-guide): integrate complete advanced guide into routing and update docs`
  - `app/constants.ts` の `EXAMS` にルート `/gcl/associate-cloud-engineer/complete-advanced-guide` を追加し、メニュー連携を統合。
  - `CLAUDE.md` / `GEMINI.md` に新しいルートを追加。
- [x] **Step 5**: `chore(docs): update MIGRATION_PROGRESS.md — migrate complete advanced guide and archive html`
  - `Gcp-ace-complete-advanced-guide.html` を `Gcl_Archive/Associate-Cloud-Engineer/` へ移動（アーカイブ）。
  - `MIGRATION_PROGRESS.md` の更新。

### 関連ファイル

- [app/gcl/associate-cloud-engineer/complete-advanced-guide/page.tsx](app/gcl/associate-cloud-engineer/complete-advanced-guide/page.tsx)
- [app/gcl/associate-cloud-engineer/complete-advanced-guide/page.css](app/gcl/associate-cloud-engineer/complete-advanced-guide/page.css)
- [app/gcl/associate-cloud-engineer/complete-advanced-guide/constants.ts](app/gcl/associate-cloud-engineer/complete-advanced-guide/constants.ts)
- [app/gcl/associate-cloud-engineer/complete-advanced-guide/NavBar.tsx](app/gcl/associate-cloud-engineer/complete-advanced-guide/NavBar.tsx)
- [__tests__/gcl/associate-cloud-engineer/complete-advanced-guide/page.test.tsx](__tests__/gcl/associate-cloud-engineer/complete-advanced-guide/page.test.tsx)
- [app/constants.ts](app/constants.ts)
- [CLAUDE.md](CLAUDE.md)
- [GEMINI.md](GEMINI.md)

---

## 2026-05-21: P1 テスト整備タスク（完了）

### 目的

優先度 **🟡 P1** に分類されている、各ドメイン（CDL, PCNE, PCNE Step-by-Step, AGWA）のクリティカルパス E2E テストおよび単体テストを整備し、リグレッションを自動検知できるようにする。

### 完了済みステップ

- [x] **`cloud-digital-leader` クリティカルパス E2E テストの作成** (`e2e/cloud-digital-leader.spec.ts`)
- [x] **`pcne` クリティカルパス E2E テストの作成** (`e2e/pcne.spec.ts`)
- [x] **`pcne-step` クリティカルパス E2E テストの作成** (`e2e/pcne-step.spec.ts`)
- [x] **`agwa` ページ単体テストの追加** (`__tests__/gcl/agwa/ScrollSpy.test.tsx`)
- [x] **`agwa` クリティカルパス E2E テストの作成** (`e2e/agwa.spec.ts`)
- [x] **ドキュメントとカバレッジダッシュボードの更新** (`docs/TEST_COVERAGE_PROGRESS.md` および `docs/coverage-dashboard.html`)

### 関連ファイル

#### 新規

- [**tests**/gcl/agwa/ScrollSpy.test.tsx](__tests__/gcl/agwa/ScrollSpy.test.tsx) — `ScrollSpy` ユニットテスト (2 ケース)
- [e2e/cloud-digital-leader.spec.ts](e2e/cloud-digital-leader.spec.ts) — CDL E2Eテスト (5 ケース)
- [e2e/pcne.spec.ts](e2e/pcne.spec.ts) — PCNE E2Eテスト (5 ケース)
- [e2e/pcne-step.spec.ts](e2e/pcne-step.spec.ts) — PCNE Step E2Eテスト (5 ケース)
- [e2e/agwa.spec.ts](e2e/agwa.spec.ts) — AGWA E2Eテスト (4 ケース)

#### 変更

- [docs/TEST_COVERAGE_PROGRESS.md](docs/TEST_COVERAGE_PROGRESS.md) — テストカバレッジ・網羅性進捗レポート
- [docs/coverage-dashboard.html](docs/coverage-dashboard.html) — カバレッジダッシュボードHTML (再生成)

### 検証コマンド（完了時の最終結果）

```bash
bun run test         # Vitest 333 件 / 54 ファイル全 pass
bun run test:e2e     # Playwright E2E 23 件 / 16 ファイル全 pass
bun run build        # Next.js ビルド成功
bun run dashboard    # カバレッジダッシュボード再生成
```

### 次のステップ

- [x] 🔵 P2: 横断品質（Visual, A11y, Performance, Security）の導入完了
  - Visual / A11y: 全 7 ドメイン対応済み（`e2e/visual.spec.ts`, `e2e/a11y.spec.ts`）
  - Performance: `bun run test:perf`（Playwright `perf` project + `e2e/perf-budgets.json`）+ `bun run perf:report`（`@lhci/cli` autorun）
  - Security: `bun run test:security`（`scripts/security-audit.mjs` + `bun audit --json` 集計）

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
  - 新規 [**tests**/components/Header.hamburger.test.tsx](__tests__/components/Header.hamburger.test.tsx) (5 ケース)
- [x] **Step 5**: `feat(header): render nav tree inside drawer` — `8cb0ae4`
  - [components/Header.tsx](components/Header.tsx): `toNavTree(EXAMS)` を module スコープで算出し、Drawer 内に provider 別 `<section>` + 試験ごとの `<details><summary>` アコーディオンを描画
  - `iconThemeClass()` ヘルパで `card-*` → `icon-theme-*` 変換
  - `coming-soon` の試験は「準備中」ラベルを表示し、リンクを描画しない
  - リンクの `onClick` で `setDrawerOpen(false)` を呼びナビゲーション時に Drawer を閉じる
  - [**tests**/components/Header.hamburger.test.tsx](__tests__/components/Header.hamburger.test.tsx) に NavTree 描画契約 7 ケース追加
- [x] **Step 6**: `feat(header): trap focus and lock scroll in drawer` — `30f5c13`
  - Drawer 用 useEffect 2 つ追加: (a) スクロールロック + open 時に閉じるボタンへ focus + close 時にトリガーへ復帰、(b) Escape クローズ + Tab/Shift+Tab フォーカストラップ
  - `hamburgerRef` / `closeButtonRef` / `drawerRef` を追加
  - 同テストファイルに Escape クローズ・初期フォーカス・復帰フォーカス・スクロールロック・Shift+Tab wrap の 5 ケース追加
- [x] **Step 7**: `refactor(header): remove inline dropdowns in favor of drawer` — `49d9e55`
  - [components/Header.tsx](components/Header.tsx): インラインドロップダウン JSX、`openMenu` state、5 個の `useRef`、click-outside/Escape 用 effect、`DropdownItem` を削除（-773/+142 行）
  - レイアウトを `grid (1fr auto 1fr)` → `flex justify-between` に簡素化
  - [**tests**/components/Header.test.tsx](__tests__/components/Header.test.tsx) を drawer 契約 6 ケースに書き換え（Header の最小契約: タイトル / nav role / ハンバーガー aria / provider 見出し / 全試験リンク網羅 / coming-soon 除外）
- [x] **追加 fix**: `fix(nav): dedup items when domain href equals exam href` — `0df5f20`
  - PCNE で `domains[0].href === exam.href` のため React duplicate key 警告が出ていた。adapter で exam.href と一致する domain を items から除外
  - [**tests**/lib/navigation.test.ts](__tests__/lib/navigation.test.ts) に回帰テスト 1 ケース追加
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
- [**tests**/lib/navigation.test.ts](__tests__/lib/navigation.test.ts) — adapter テスト + dedup 回帰
- [**tests**/components/Header.test.tsx](__tests__/components/Header.test.tsx) — drawer 契約に書き換え（22 → 6 ケース）
- [**tests**/components/Header.hamburger.test.tsx](__tests__/components/Header.hamburger.test.tsx) — 新 UI 全契約（17 ケース）
- [**tests**/app/page.test.tsx](__tests__/app/page.test.tsx) — VISIBLE_EXAMS 基準
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

- Visualテスト: 未実施
- AWS 試験ページ群の実装（`app/aws/solutions-architect-associate/page.tsx`）。adapter は完成しているので constants の `status` を `'available'` に変えるだけで Drawer に自動反映される

---

## 2026-05-12: AGWA Section 1 Restoration (完了)

### 目的

検出されたオリジナル HTML との乖離（情報の省略・簡略化）を解消するため、残りのセクション（1.1, 1.2, 1.3, 1.4, 1.6）の内容をオリジナルに準拠したリッチな内容に復元・補完する。

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
最新実装 HEAD は `725cd2a`、前回進捗同期コミットは `9b2bac0` です。
AGWA Section 2〜6 と共通 Mermaid コンポーネントのレビュー指摘は、テスト契約、ナビゲーション、Section 6 CSS Modules、教材修正のカテゴリー別コミットで対応済みです。最新の全体テストとESLintの結果は `docs/TEST_COVERAGE_PROGRESS.md` のAGWA実行記録を参照してください。E2E、Visualテスト、ビルドは未実施です。

標準ワークフローの正準は `.agents/rules/tdd-commit-workflow.md` で、`.claude` / `.gemini` は同期ミラーです。次回は次の4ステップを維持してください。

1. **Step 0 — Inventory:** 移行元からインベントリを機械抽出し、実装前に確定する。
2. **Step 1 — Fail:** 失敗テストを作成し、失敗を確認する。
3. **Step 2 — Pass:** 最小実装でテストを成功させる。
4. **Step 3 — Refactor:** 整理・統合後に対象検証を再実行する。

各ステップのコミットは、ユーザーが明示的に認可した場合だけ実行してください。未認可ならコミット可能な状態で停止します。標準検証コマンドは `bun run test` です。最新のサンドボックス実行の件数・実行日時・対象コミット・スコープは `docs/TEST_COVERAGE_PROGRESS.md` のAGWA実行記録を参照してください。

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
