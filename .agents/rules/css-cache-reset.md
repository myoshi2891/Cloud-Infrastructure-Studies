# globals.css 変更後のキャッシュリセットルール

(最終更新日: 2026-08-09)

## 問題

`globals.css`（特に `@theme` ブロック）を変更した後、`.next` に古い CSS チャンクが残ると、CSS カスタムプロパティ（`--color-background` 等）が空文字に解決されてページのダークモードが消える。

**症状チェック**（ブラウザコンソールで確認）:

```js
getComputedStyle(document.documentElement).getPropertyValue('--color-background')
// "" が返る → CSS変数が未適用の症状（キャッシュ汚染とは未確定）
// "#08090f" が返る → 正常
```

空文字の場合は `.next` を削除する前に、次を順に確認する:

1. ブラウザの Network パネルで対象ページの CSS が 200 応答で読み込まれていること。
2. 読み込まれた生成 CSS に `--color-background` の定義が含まれていること。
3. ルートレイアウトから `app/globals.css` が import されていること。

これらが正常でも古い CSS が配信される場合に、キャッシュ不整合として以下の削除・再起動を行う。

## ルール

### 必須トリガー

以下のファイルを編集した後は **必ず** `.next` を削除して dev サーバーを再起動する:

- `app/globals.css`
- `app/**/*.css`（ページ固有スタイル）
- `components/**/*.module.css` や `app/**/*.module.css`（CSS Modules スタイル）

### 手順

```bash
# 1. 設定済み、または実際に LISTEN 中の dev サーバーポートを確認
lsof -nP -iTCP -sTCP:LISTEN | rg 'node|next'

# 2. 対象 PID のコマンドと作業対象がこのプロジェクトの dev サーバーであることを確認
dev_port=${PORT:?PORT を設定してください}
dev_pid=$(lsof -tiTCP:"$dev_port" -sTCP:LISTEN | head -n 1)
if [ -n "$dev_pid" ]; then
  ps -p "$dev_pid" -o pid=,command=

  # 3. 確認済みの dev サーバーだけを停止
  kill "$dev_pid"
fi

# 4. キャッシュ削除
rm -rf .next

# 5. dev サーバー再起動（プロジェクトで設定されたポートを使用）
bun run dev
```

## 背景

Next.js + Tailwind v4 の CSS コンパイルはチャンク単位でキャッシュされる。HMR は JS の変更には追従するが、`@theme` ブロックの変数定義変更はキャッシュ無効化が不完全なことがある。

## 本番ビルド（Docker）でも同じ症状が出る場合

dev サーバーでは正常でも Docker の本番ビルドで CSS 変数が空になるケースがある。

原因を CSS チャンク分割と断定する前に、次を順に診断する:

1. 生成 CSS に `@theme` の出力と対象 CSS 変数が含まれることを確認する。

   ```bash
   rg '@theme|--color-background' app .next/static/css
   ```

2. 生成ページが参照する CSS の `preload` / `stylesheet` を確認する。

   ```bash
   rg 'preload|stylesheet' .next/server/app
   ```

3. ブラウザの Network パネルで、参照された CSS が 200 応答であり、応答本文に対象 CSS 変数が含まれることを確認する。

**原因の仮説**: Next.js 本番ビルドのルート単位の CSS チャンク分割により、Tailwind v4 の `@theme` 出力が対象ページから参照されないチャンクへ分離されている可能性がある。ブラウザの "preloaded but not used" 警告はこの仮説を調べる手掛かりであり、それだけでは確定原因ではない。

**恒久対策**: 変数定義は `@theme` ブロックに定義します。キャッシュによる不整合が発生した場合は、上記の手順に従ってキャッシュを削除し再起動してください。

**Docker リビルド手順**（`globals.css` 変更後）:

Docker 操作はリポジトリの Bun コマンド規約に対するオーケストレーション上の例外として `make` を使用する。`make build` は Dockerfile 内で `bun install --frozen-lockfile` と `bun run build`、`make dev` は開発コンテナ内で `bun install` と `bun run dev` を実行する。

```bash
make down && make build && make dev
```
