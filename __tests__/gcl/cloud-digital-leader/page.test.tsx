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
        expect(screen.getByText(/カーボンニュートラル/i)).toBeInTheDocument();
        expect(screen.getByText(/TPU という独自の AI チップ/i)).toBeInTheDocument();
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
});
