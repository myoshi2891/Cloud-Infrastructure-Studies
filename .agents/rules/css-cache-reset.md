# globals.css 変更後のキャッシュリセットルール

## 問題

`globals.css`（特に `@theme` ブロック）を変更した後、`.next` に古い CSS チャンクが残ると、CSS カスタムプロパティ（`--color-background` 等）が空文字に解決されてページのダークモードが消える。

**症状チェック**（ブラウザコンソールで確認）:

```js
getComputedStyle(document.documentElement).getPropertyValue('--color-background')
// "" が返る → キャッシュ汚染
// "#08090f" が返る → 正常
```

## ルール

### 必須トリガー

以下のファイルを編集した後は **必ず** `.next` を削除して dev サーバーを再起動する:

- `app/globals.css`
- `app/**/*.css`（ページ固有スタイル）
- `components/**/*.module.css` や `app/**/*.module.css`（CSS Modules スタイル）

### 手順

```bash
# 1. dev サーバーを停止（ポート 3000 または起動中のポートを使用中の場合）
kill $(lsof -ti:3000) 2>/dev/null

# 2. キャッシュ削除
rm -rf .next

# 3. dev サーバー再起動
bun run dev
```

## 背景

Next.js + Tailwind v4 の CSS コンパイルはチャンク単位でキャッシュされる。HMR は JS の変更には追従するが、`@theme` ブロックの変数定義変更はキャッシュ無効化が不完全なことがある。

## 本番ビルド（Docker）でも同じ症状が出る場合

dev サーバーでは正常でも Docker の本番ビルドで CSS 変数が空になるケースがある。

**原因**: Next.js 本番ビルドは CSS をルート単位でチャンク分割する。Tailwind v4 の `@theme` 出力が別チャンクに分離され、特定ページで読み込まれないことがある（ブラウザ警告: "preloaded but not used"）。

**恒久対策**: 変数定義は `@theme` ブロックに定義します。キャッシュによる不整合が発生した場合は、上記の手順に従ってキャッシュを削除し再起動してください。

**Docker リビルド手順**（`globals.css` 変更後）:

```bash
make down && make build && make dev
```
