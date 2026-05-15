# ============================================================
# Cloud Infrastructure Studies — Docker 操作ショートカット
# ============================================================
# 使い方: make <target>
#   例) make dev   → 開発サーバーを Docker で起動
#       make prod  → 本番イメージをビルドして起動
#       make down  → 起動中のコンテナを停止・削除

.PHONY: help dev prod build build-dev down logs logs-dev shell clean prune

# デフォルトターゲット: ヘルプを表示
.DEFAULT_GOAL := help

# ============================================================
# ヘルプ（## コメントから自動生成）
# ============================================================
help: ## コマンド一覧を表示
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'

# ============================================================
# 開発
# ============================================================
dev: ## 開発サーバーを起動（hot reload、ソースを bind mount）
	@echo "→ 開発サーバーを起動します (http://localhost:3003)"
	docker compose --profile dev up --build

dev-d: ## 開発サーバーをバックグラウンドで起動
	@echo "→ 開発サーバーをバックグラウンドで起動します"
	docker compose --profile dev up --build -d

build-dev: ## 開発イメージのみビルド（起動しない）
	docker compose --profile dev build

# ============================================================
# 本番
# ============================================================
prod: ## 本番イメージをビルドして起動
	@echo "→ 本番サーバーを起動します (http://localhost:3003)"
	docker compose --profile prod up --build -d
	@echo "→ 起動完了。ログ確認: make logs"

build: ## 本番イメージのみビルド（起動しない）
	docker compose --profile prod build

# ============================================================
# 停止・クリーンアップ
# ============================================================
down: ## 起動中のコンテナをすべて停止・削除
	docker compose --profile dev --profile prod down

clean: ## コンテナ・名前付きボリュームをすべて削除（イメージは残す）
	docker compose --profile dev --profile prod down --volumes
	@echo "→ コンテナと dev ボリュームを削除しました"

prune: ## ビルドキャッシュ・未使用イメージも含めて全削除（容量回収）
	docker compose --profile dev --profile prod down --volumes --rmi local
	docker builder prune -f
	@echo "→ イメージ・キャッシュを削除しました"

# ============================================================
# デバッグ / 確認
# ============================================================
logs: ## 本番コンテナのログを表示（Ctrl+C で終了）
	docker compose --profile prod logs -f web

logs-dev: ## 開発コンテナのログを表示（Ctrl+C で終了）
	docker compose --profile dev logs -f dev

shell: ## 本番コンテナ内でシェルを起動（デバッグ用）
	docker compose --profile prod exec web sh

shell-dev: ## 開発コンテナ内でシェルを起動（デバッグ用）
	docker compose --profile dev exec dev sh
