# syntax=docker/dockerfile:1.7
# 本番用マルチステージビルド（Bun + Next.js standalone）

ARG BUN_VERSION=1-alpine

# ============================================================
# Stage 1: deps — 依存関係のみインストール（キャッシュ最大化）
# ============================================================
FROM oven/bun:${BUN_VERSION} AS deps
WORKDIR /app

# package.json と存在すれば bun.lock をコピー
# COPY は glob で「無くてもエラーにしない」ため、bun.lock の有無を許容できる
COPY package.json bun.lock* ./

# bun.lock はリポジトリでは gitignore 対象（再現性は package.json の semver で担保）。
# よって --frozen-lockfile は使わず通常 install を行う。
# lockfile を Git 管理対象にする運用に切り替えた場合は --frozen-lockfile を追加すること。
RUN bun install

# ============================================================
# Stage 2: builder — Next.js standalone ビルド
# ============================================================
FROM oven/bun:${BUN_VERSION} AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN bun run build

# ============================================================
# Stage 3: runner — 本番ランタイム（最小構成）
# ============================================================
FROM oven/bun:${BUN_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# 非 root ユーザーで実行
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 --ingroup nodejs nextjs

# standalone 出力のみコピー（node_modules を丸ごと含まない）
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

# Next.js standalone が生成する server.js を Bun で起動
CMD ["bun", "run", "server.js"]
