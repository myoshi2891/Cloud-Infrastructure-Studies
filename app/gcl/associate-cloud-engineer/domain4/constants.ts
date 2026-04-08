export const D4_SECTION_TITLE = "Domain 4: アクセスとセキュリティの構成";

export type RoleItem = {
    role: string;
    description: string;
};

export const COMPUTE_ROLES: RoleItem[] = [
    { role: 'roles/compute.admin', description: 'Compute Engine の完全管理' },
    { role: 'roles/compute.instanceAdmin.v1', description: 'VM インスタンスの作成・管理（ネットワーク変更不可）' },
    { role: 'roles/compute.networkAdmin', description: 'ネットワークリソースの管理' },
    { role: 'roles/compute.osLogin', description: 'OS Login での SSH 接続' },
    { role: 'roles/compute.osAdminLogin', description: 'OS Login での SSH 接続（sudo 権限付き）' },
    { role: 'roles/compute.viewer', description: '閲覧のみ' },
];

export const STORAGE_ROLES: RoleItem[] = [
    { role: 'roles/storage.admin', description: 'バケット・オブジェクトの完全管理' },
    { role: 'roles/storage.objectAdmin', description: 'オブジェクトの完全管理（バケット設定変更不可）' },
    { role: 'roles/storage.objectCreator', description: 'オブジェクトのアップロードのみ' },
    { role: 'roles/storage.objectViewer', description: 'オブジェクトの閲覧のみ' },
];

export const IAM_ROLES: RoleItem[] = [
    { role: 'roles/iam.securityAdmin', description: 'IAM ポリシーの表示・設定' },
    { role: 'roles/iam.roleAdmin', description: 'カスタムロールの作成・管理' },
    { role: 'roles/iam.serviceAccountAdmin', description: 'サービスアカウントの作成・管理' },
    { role: 'roles/iam.serviceAccountUser', description: 'SA を VM 等にアタッチする権限' },
    { role: 'roles/iam.serviceAccountTokenCreator', description: 'SA の短期トークンを生成（権限借用）' },
    { role: 'roles/iam.workloadIdentityUser', description: 'Workload Identity を通じた SA へのアクセス' },
];

export const GKE_ROLES: RoleItem[] = [
    { role: 'roles/container.admin', description: 'GKE クラスタの完全管理' },
    { role: 'roles/container.developer', description: 'GKE のワークロード管理（クラスタ設定変更不可）' },
    { role: 'roles/container.clusterViewer', description: 'クラスタ情報の閲覧のみ' },
];

export const CLOUD_RUN_ROLES: RoleItem[] = [
    { role: 'roles/run.admin', description: 'Cloud Run の完全管理' },
    { role: 'roles/run.developer', description: 'デプロイ・設定変更' },
    { role: 'roles/run.invoker', description: 'Cloud Run サービスへのリクエスト送信' },
];

export const BIGQUERY_ROLES: RoleItem[] = [
    { role: 'roles/bigquery.admin', description: 'BigQuery の完全管理' },
    { role: 'roles/bigquery.dataEditor', description: 'データセット・テーブルの編集' },
    { role: 'roles/bigquery.dataViewer', description: 'データの閲覧のみ' },
    { role: 'roles/bigquery.jobUser', description: 'クエリの実行（データへのアクセス権は別途必要）' },
];

export type PrincipalItem = {
    type: string;
    description: string;
    example: string;
};

export const PRINCIPAL_TYPES: PrincipalItem[] = [
    { type: 'Google アカウント', description: '個人ユーザー', example: 'user:alice@example.com' },
    { type: 'サービスアカウント', description: 'アプリ・プログラムのアカウント', example: 'serviceAccount:my-app@project.iam.gserviceaccount.com' },
    { type: 'Google グループ', description: 'ユーザーのグループ（推奨）', example: 'group:dev-team@example.com' },
    { type: 'Google Workspace ドメイン', description: 'ドメイン全体のユーザー', example: 'domain:example.com' },
    { type: 'Cloud Identity ドメイン', description: 'Cloud Identity のユーザー全員', example: 'domain:example.com' },
    { type: 'allUsers', description: 'インターネット上の誰でも', example: '公開バケットなど' },
    { type: 'allAuthenticatedUsers', description: 'Google アカウントを持つ誰でも', example: 'ほぼ使用しない' },
];

export type BestPracticeItem = {
    id: number;
    practice: string;
    reason: string;
};

export const ROLE_BEST_PRACTICES: BestPracticeItem[] = [
    { id: 1, practice: '本番環境での基本ロール（Editor/Owner）使用を禁止', reason: '過剰権限によるリスク' },
    { id: 2, practice: 'ユーザーではなくグループにロールを付与', reason: 'メンバー変更時の管理コスト削減' },
    { id: 3, practice: 'リソースレベルではなくプロジェクト/フォルダレベルで付与', reason: '一元管理・継承の活用' },
    { id: 4, practice: '定期的に Policy Recommender で不要な権限を削除', reason: 'クリープ（権限の肥大化）防止' },
    { id: 5, practice: 'カスタムロールは組織レベルで管理', reason: '再利用・一元管理' },
];

export const IAM_POLICY_BEST_PRACTICES: BestPracticeItem[] = [
    { id: 1, practice: '個人ではなくグループにロールを付与', reason: 'メンバー変更時の管理を自動化' },
    { id: 2, practice: '最もスコープの小さいレベルで権限を付与', reason: '影響範囲の最小化' },
    { id: 3, practice: '定期的な権限レビュー（90 日ごと）', reason: '不要な権限の蓄積（クリープ）を防止' },
    { id: 4, practice: 'IAM Conditions で一時的な権限を付与', reason: '永続権限のリスクを排除' },
    { id: 5, practice: '`set-iam-policy` より `add/remove-iam-policy-binding` を使用', reason: '他の権限を誤って上書きするリスクを防止' },
];

export type SATypeItem = {
    type: string;
    creator: string;
    usage: string;
};

export const SERVICE_ACCOUNT_TYPES: SATypeItem[] = [
    { type: 'ユーザー管理 SA', creator: 'ユーザーが作成', usage: 'アプリ・CI/CD・GKE Pod など' },
    { type: 'デフォルト SA', creator: 'Google が自動作成', usage: 'App Engine、Compute Engine のデフォルト' },
    { type: 'Google 管理 SA', creator: 'Google が内部で使用', usage: 'Google サービスの内部通信' },
];

export const SA_BEST_PRACTICES: BestPracticeItem[] = [
    { id: 1, practice: 'SA JSON キーの生成を組織ポリシーで禁止', reason: '漏洩リスクの根本排除' },
    { id: 2, practice: 'GCE/GKE は SA を VM/Pod にアタッチ（キー不要）', reason: 'メタデータサーバーで自動認証' },
    { id: 3, practice: 'CI/CD は Workload Identity Federation を設定', reason: 'キー不要・自動失効' },
    { id: 4, practice: 'ローカル開発は ADC（gcloud auth application-default login）', reason: 'キー不要・ユーザー権限のまま' },
    { id: 5, practice: '特権操作は SA Impersonation または PAM', reason: '監査ログ + 自動失効' },
    { id: 6, practice: '1 SA = 1 アプリケーション / 1 目的', reason: '最小権限・追跡可能性の確保' },
];

export const SECRET_MANAGER_ROLES: RoleItem[] = [
    { role: 'roles/secretmanager.admin', description: 'シークレットの完全管理' },
    { role: 'roles/secretmanager.secretAccessor', description: 'シークレットの値を読み取る' },
    { role: 'roles/secretmanager.secretVersionManager', description: 'バージョンの作成・無効化（値の読み取りは不可）' },
    { role: 'roles/secretmanager.viewer', description: 'シークレットのメタデータのみ閲覧' },
];

export const SECRET_MANAGER_BEST_PRACTICES: { id: number; practice: string }[] = [
    { id: 1, practice: 'コードへのハードコードを根絶（コードレビューで CI/CD が検出）' },
    { id: 2, practice: '最小権限: アプリは secretAccessor のみ（管理権限は不要）' },
    { id: 3, practice: 'Secret ローテーション: 90 日ごとにパスワードを自動更新' },
    { id: 4, practice: 'アクセスログを Cloud Logging で監視（誰がいつ読んだか）' },
    { id: 5, practice: 'リージョンを指定して規制コンプライアンスに対応' },
];

export const KMS_ROLES: RoleItem[] = [
    { role: 'roles/cloudkms.admin', description: 'キーの完全管理' },
    { role: 'roles/cloudkms.cryptoKeyEncrypterDecrypter', description: '暗号化と復号化の両方' },
    { role: 'roles/cloudkms.cryptoKeyEncrypter', description: '暗号化のみ' },
    { role: 'roles/cloudkms.cryptoKeyDecrypter', description: '復号化のみ' },
    { role: 'roles/cloudkms.viewer', description: 'キーのメタデータ閲覧のみ' },
];
