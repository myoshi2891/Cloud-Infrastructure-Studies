export type ExamSpecItem = {
    item: string;
    content: string;
};

export const EXAM_SPEC: ExamSpecItem[] = [
    { item: '試験時間', content: '90分' },
    { item: '問題数', content: '50–60問' },
    { item: '合格点', content: '約 70%' },
    { item: '受験料', content: '$99' },
    { item: '有効期間', content: '3年間' },
    { item: '前提知識', content: '不要（推奨: 6ヶ月以上のクラウド経験）' },
];

export const EXAM_DOMAINS = [
    { section: 'Domain 1', theme: 'Google Cloud によるデジタルトランスフォーメーション', weight: '10%' },
    { section: 'Domain 2', theme: 'クラウドによるイノベーション', weight: '12.5%' },
    { section: 'Domain 3', theme: 'インフラとアプリのモダナイゼーション', weight: '30%' },
    { section: 'Domain 4', theme: 'Google Cloud のセキュリティと運用', weight: '30%' },
    { section: 'Domain 5', theme: 'データによるイノベーション', weight: '12.5%' },
    { section: 'Domain 6', theme: 'Google Cloud の AI によるイノベーション', weight: '5%' },
];

export const NIST_CHARACTERISTICS = [
    { trait: 'オンデマンド・セルフサービス', desc: '人手を介さずにリソースを即時調達', meaning: 'IT部門の承認待ち時間ゼロ' },
    { trait: '幅広いネットワークアクセス', desc: '任意のデバイスからアクセス可能', meaning: '場所・端末を選ばない働き方' },
    { trait: 'リソースの共有（マルチテナント）', desc: '複数ユーザーで物理リソースを共有', meaning: 'コスト効率の向上' },
    { trait: '迅速な弾力性（エラスティシティ）', desc: '需要に応じて自動でスケール', meaning: '急なトラフィック増にも対応' },
    { trait: '計測されたサービス', desc: '使用量に応じた従量課金', meaning: '使った分だけ払う経済合理性' },
];

export const AI_PRINCIPLES = [
    { principle: '社会に有益である', description: '社会や経済へのプラスの影響を考慮する' },
    { principle: '不当なバイアスの発生を避ける', description: '人種、性別、信条などに関する不当な偏りを排除する' },
    { principle: '安全性に関する十分なテストを行う', description: '予期せぬ危害を防ぐためのセーフガードを設ける' },
    { principle: '人々に対する説明責任を果たす', description: 'フィードバックや苦情のための適切な機会を提供する' },
    { principle: 'プライバシー設計の原則を取り入れる', description: 'データの収集、使用、通知に関する透明性を確保する' },
    { principle: '科学的卓越性の高い水準を維持する', description: '厳格な科学的手法とオープンな探究を奨励する' },
    { principle: 'これらの原則に沿った利用に限定する', description: '有害な用途や権利を侵害する目的での利用を避ける' },
];

export const AI_NOT_PURSUE = [
    { target: '重大な損害をもたらす可能性のある技術', description: '身体的、精神的、社会的な深刻な被害' },
    { target: '兵器としての AI', description: '直接的に殺傷を目的とする兵器への組み込み' },
    { target: '監視目的の AI', description: '国際的な規範に反する個人の監視や人権侵害' },
    { target: '国際法に違反する技術', description: '人権、プライバシー、表現の自由を侵害する利用' },
];

export const COMPUTE_SERVICES = [
    { service: 'Compute Engine', keyword: 'VM・IaaS・OS 制御・GPU が必要', usage: 'レガシー移行・特定 OS 要件' },
    { service: 'GKE', keyword: 'コンテナ・Kubernetes・ステートフル', usage: 'マイクロサービス・長時間処理' },
    { service: 'Cloud Run', keyword: 'コンテナ・サーバーレス・HTTP・0 スケール', usage: 'ステートレス API・スパイクトラフィック' },
    { service: 'Cloud Run Functions', keyword: 'FaaS・イベント駆動・軽量処理', usage: 'Webhook・トリガー・小さな関数' },
    { service: 'App Engine', keyword: 'PaaS・Web アプリ・コードだけ', usage: 'レガシー Web アプリの移行' },
];

export const CONFUSING_PAIRS = [
    { pair: 'Cloud Run vs Cloud Run Functions', truth: 'Cloud Run はコンテナ。Functions は関数（コード）。どちらもサーバーレス' },
    { pair: 'Cloud SQL vs BigQuery', truth: 'Cloud SQL: OLTP（トランザクション処理）。BigQuery: OLAP（分析）' },
    { pair: 'Dataflow vs Dataproc', truth: 'Dataflow: Apache Beam（ストリーミング + バッチ）。Dataproc: Hadoop/Spark（バッチ）' },
    { pair: 'Committed Use vs Sustained Use', truth: 'Committed Use は事前申込が必要。Sustained Use は自動適用' },
    { pair: '匿名化 vs 仮名化', truth: '匿名化は再識別不可（GDPR 対象外）。仮名化は再識別可能（GDPR 対象）' },
    { pair: 'Looker vs Looker Studio', truth: 'Looker: エンタープライズ BI（有料）。Looker Studio: セルフサービス BI（無料）' },
];

export const RESOURCES = [
    { name: '試験概要ページ', url: 'cloud.google.com/learn/certification/cloud-digital-leader' },
    { name: '公式試験ガイド', url: 'cloud.google.com/learn/certification/guides/cloud-digital-leader' },
    { name: 'Cloud Skills Boost 学習パス', url: 'cloudskillsboost.google/paths/9' },
    { name: '試験登録', url: 'cp.certmetrics.com/google/en/login' },
    { name: 'IAM ドキュメント', url: 'cloud.google.com/iam/docs' },
    { name: 'BigQuery ドキュメント', url: 'cloud.google.com/bigquery/docs' },
    { name: 'Vertex AI ドキュメント', url: 'cloud.google.com/vertex-ai/docs' },
    { name: 'セキュリティ概要', url: 'cloud.google.com/security/overview' },
    { name: 'Google AI 原則', url: 'ai.google/responsibility/principles/' },
    { name: 'Cloud Storage クラス', url: 'cloud.google.com/storage/docs/storage-classes' },
    { name: 'コスト最適化', url: 'cloud.google.com/architecture/framework/cost-optimization' },
];
