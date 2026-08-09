# 全ガイド画面レイアウト統一

## コミット共通ルール

Fail（Red）・Green・Refactor は**それぞれ独立したコミット**にする。各コミットの直前に、
以下のゲートを順に満たすこと（詳細は `.agents/rules/migration-progress-sync.md` を継承する）。

1. ユーザーがコミットを明示的に認可していることを確認する。
2. `git status --short` で作業ツリーの状態を確認する。
3. その段階の対象ファイルだけを `git add` する（ディレクトリ一括指定をしない）。
4. `git diff --cached --name-only` と `git diff --cached` でステージ差分と範囲を確認する。
5. 認可済みかつ範囲が正しい場合にのみ `git commit` し、次の段階へ進む。

## Red（テスト失敗）

- サイドバーを持つ全24スタイルシートを一覧化する。
- デスクトップのサイドバー幅280px・左端固定と、メイン領域の残幅100%を検証する。
- モバイルのメイン領域が横幅100%へ戻ることを検証する。
- 既存の本文最大幅制限を許容するテストを、新しい全幅要件へ更新する。
- 失敗確認の直後に、共通ゲート（認可・`git status`・対象ファイルのみ `git add`・ステージ差分確認）を通し、
  テストだけを `test(layout): add failing full-width guide contract` 形式でコミットする。

## Green（実装）

- 各画面のサイドバーを左端固定・幅280pxへ統一する。
- 各画面のメイン領域へ `margin-left: 280px`、`width: calc(100% - 280px)`、
  `max-width: none`、`box-sizing: border-box` を適用する。
- 本文全体を狭める `content-inner` 等の最大幅を解除する。
- 900px前後の既存ブレークポイントではメイン領域を幅100%へ戻す。
- 対象テストの成功確認直後に、共通ゲートを通し、最小実装だけを
  `feat(layout): standardize full-width sidebar guide screens` 形式で独立コミットする。

## Refactor（検証）

- 対象テスト、全テスト、Lint、production buildを実行する。
- CSSの重複した左余白や親要素のpaddingを除去し、二重オフセットを防ぐ。
- 検証と整理の完了直後に、共通ゲートを通し、実際のリファクタ変更だけを
  `refactor(layout): integrate full-width guide layout` 形式で独立コミットする。

## Docs Sync（仕様同期）

- レイアウト契約、移行進捗、テスト進捗、カバレッジダッシュボードを同期する。
