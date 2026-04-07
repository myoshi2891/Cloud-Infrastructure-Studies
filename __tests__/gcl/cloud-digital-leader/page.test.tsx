import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CloudDigitalLeaderPage from '@/app/gcl/cloud-digital-leader/page.tsx';

describe('Cloud Digital Leader 認定試験 ページ', () => {
    it('ページコンポーネントがレンダリングされること', () => {
        const { container } = render(<CloudDigitalLeaderPage />);
        expect(container.querySelector('.cdl-page')).toBeInTheDocument();
    });

    it('hero セクションにタイトルが含まれること', () => {
        render(<CloudDigitalLeaderPage />);
        const titles = screen.getAllByText(/Cloud Digital Leader/i);
        expect(titles.length).toBeGreaterThanOrEqual(1);
        expect(screen.getByRole('heading', { level: 1, name: /Cloud Digital Leader/i })).toBeInTheDocument();
    });

    it('試験仕様情報が表示されること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getByText('試験時間')).toBeInTheDocument();
        expect(screen.getByText('90分')).toBeInTheDocument();
        expect(screen.getAllByText('50–60問').length).toBeGreaterThanOrEqual(1);
    });

    it('全9セクションの見出しが存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getByRole('heading', { level: 2, name: /試験概要と出題セクション/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /DX・クラウド基礎/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /データとイノベーション/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /インフラとモダナイゼーション/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /セキュリティと運用/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /AI\/ML/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /サービス早見表/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /試験攻略チェックリスト/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /参照リソース/i })).toBeInTheDocument();
    });

    it('sticky nav に各セクションへのリンクが含まれること', () => {
        render(<CloudDigitalLeaderPage />);
        const nav = screen.getByRole('navigation', { name: /セクションナビゲーション/i });
        expect(nav).toBeInTheDocument();
        expect(screen.getByText('試験概要')).toBeInTheDocument();
        expect(screen.getAllByText('AI/ML').length).toBeGreaterThanOrEqual(1);
    });

    it('DX・クラウド基礎セクションが存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getByText(/デジタルトランスフォーメーションと Google Cloud/i)).toBeInTheDocument();
        expect(screen.getByText(/NIST 定義/i)).toBeInTheDocument();
    });

    it('AI・ML セクションが存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/Google AI 原則/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getByText(/社会に有益である/i)).toBeInTheDocument();
    });

    it('重要コンセプトセクションが存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getByRole('heading', { level: 2, name: /必ず押さえるべき概念/i })).toBeInTheDocument();
        expect(screen.getByText(/推奨学習ロードマップ/i)).toBeInTheDocument();
    });

    // ── S1 DX基礎 拡張テスト ──────────────────────────────────────────
    it('S1: デプロイメントモデル表が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/パブリッククラウド/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/プライベートクラウド/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/ハイブリッドクラウド/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/マルチクラウド/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S1: CapEx vs OpEx 表が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getByText(/CapEx（資本支出）/i)).toBeInTheDocument();
        expect(screen.getByText(/OpEx（運用費用）/i)).toBeInTheDocument();
        expect(screen.getByText(/資本支出/i)).toBeInTheDocument();
    });

    it('S1: Google Cloud の強み表が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/カーボンニュートラル/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/TPU という独自の AI チップ/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S1: DX の3つの柱 SVG 図が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/インフラの近代化/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/データとAIの活用/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/スマートアナリティクス/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S1: IaaS/PaaS/SaaS 管理責任表が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getByText(/OS、ミドルウェア、アプリケーション、データ/i)).toBeInTheDocument();
    });

    it('S1: Cloud Adoption Framework 4つの柱が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/Cloud Adoption Framework/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Lead（主導）/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Learn（学習）/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Scale（スケーリング）/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Secure（保護）/i).length).toBeGreaterThanOrEqual(1);
    });

    // ── S2 データ 拡張テスト ──────────────────────────────────────────
    it('S2: データの4つのビジネス価値が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getByText(/記述的分析/i)).toBeInTheDocument();
        expect(screen.getByText(/診断的分析/i)).toBeInTheDocument();
        expect(screen.getByText(/予測的分析/i)).toBeInTheDocument();
        expect(screen.getByText(/処方的分析/i)).toBeInTheDocument();
    });

    it('S2: データベースサービス表が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/Cloud SQL/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Cloud Spanner/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Firestore/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Bigtable/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/BigQuery/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Memorystore/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/AlloyDB/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S2: DB選択デシジョンツリーが存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getByText(/グローバルに強一貫性/i)).toBeInTheDocument();
    });

    it('S2: Looker と Looker Studio の説明が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getByText(/LookML/i)).toBeInTheDocument();
        expect(screen.getByText(/真実の唯一の情報源/i)).toBeInTheDocument();
        expect(screen.getAllByText(/セルフサービスBI/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S2: Dataflow / Dataproc / Pub\/Sub 説明が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/Apache Beam/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Hadoop/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getByText(/メッセージングサービス/i)).toBeInTheDocument();
    });

    it('S2: スマートアナリティクスアーキテクチャ SVG が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/データ取り込み/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S2: ストレージライフサイクルベストプラクティスが存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getByText(/ライフサイクルポリシー/i)).toBeInTheDocument();
        expect(screen.getByText(/バケットロック/i)).toBeInTheDocument();
    });

    it('S2: 構造化・半構造化・非構造化データが存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/構造化データ/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/半構造化データ/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/非構造化データ/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S2: データウェアハウス vs データレイク vs レイクハウスが存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/データウェアハウス/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/データレイク/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/データレイクハウス/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S2: GCS ストレージクラス表（アクセス頻度列含む）が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getByText(/月1回程度/i)).toBeInTheDocument();
        expect(screen.getByText(/四半期1回程度/i)).toBeInTheDocument();
        expect(screen.getByText(/年1回未満/i)).toBeInTheDocument();
    });

    // ── S3 インフラ 拡張テスト ──────────────────────────────────────────
    it('S3: 移行6R表が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/Rehost/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Replatform/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Repurchase/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Refactor/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Retire/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Retain/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S3: Compute Engine 詳細が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/Preemptible/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Sustained Use Discount/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Committed Use Discount/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S3: マシンタイプ表が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/E2/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/N2\/N4/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/C3/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/M3/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/A2\/A3/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S3: コンテナ vs VM SVG 比較図が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/Hypervisor/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Container Runtime/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S3: GKE Autopilot vs Standard 表が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/Autopilot/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Pod単位課金/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S3: Cloud Run・Cloud Run Functions・App Engine 説明が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/0スケール/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/FaaS/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getByText(/Standard環境/i)).toBeInTheDocument();
    });

    it('S3: ネットワークサービスが存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/Virtual Private Cloud/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Cloud CDN/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Dedicated Interconnect/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Partner Interconnect/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Cloud VPN/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S3: マネージドサービス説明が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getByText(/差別化されない重労働/i)).toBeInTheDocument();
    });

    it('S3: マイクロサービスアーキテクチャが存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/疎結合/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/ステートレス/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S3: GKE Enterprise と Anthos が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/GKE Enterprise/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Anthos/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S3: Apigee と API マネタイゼーションが存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/Apigee/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/マネタイゼーション/i).length).toBeGreaterThanOrEqual(1);
    });

    // ── S4 セキュリティ 拡張テスト ──────────────────────────────────────
    it('S4: セキュリティ多層構造 SVG が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/Layer 7/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Titan/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S4: IAM ロール表が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/基本ロール/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/事前定義ロール/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/カスタムロール/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S4: IAM ベストプラクティスが存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/最小権限の原則/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getByText(/Workload Identity Federation/i)).toBeInTheDocument();
    });

    it('S4: 主要セキュリティサービス説明が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/Cloud Identity-Aware Proxy|Cloud IAP/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/DDoS/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Secret Manager/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Cloud KMS/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Security Command Center/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Sensitive Data Protection/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S4: コンプライアンス表が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/ISO 27001/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/SOC 2/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/PCI DSS/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/HIPAA/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/GDPR/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/FedRAMP/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S4: Cloud Monitoring / Logging / Trace / Profiler が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/Cloud Monitoring/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Cloud Logging/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Cloud Trace/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Cloud Profiler/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/監査ログ/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S4: 費用モデル表が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/従量課金/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/ネットワーク下り転送/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S4: 費用最適化アプローチが存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/右サイズ化/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/予算アラート/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S4: 責任共有モデルと Shared Fate が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/責任共有モデル/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Shared Fate|共有の運命/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S4: BeyondCorp ゼロトラストが存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/BeyondCorp/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/ゼロトラスト/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S4: CMEK とデータレジデンシが存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/CMEK/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/データレジデンシ|データ主権/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S4: サポート階層表が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/Standard Support/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Enhanced Support/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/Premium Support/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/15 分以内/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S4: Active Assist が存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/Active Assist/i).length).toBeGreaterThanOrEqual(1);
    });

    it('S4: Carbon Footprint とサステナビリティが存在すること', () => {
        render(<CloudDigitalLeaderPage />);
        expect(screen.getAllByText(/Carbon Footprint/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/カーボンホットスポット/i).length).toBeGreaterThanOrEqual(1);
    });
});
