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
        expect(screen.getByText(/インフラの近代化/i)).toBeInTheDocument();
        expect(screen.getByText(/データとAIの活用/i)).toBeInTheDocument();
        expect(screen.getByText(/スマートアナリティクス/i)).toBeInTheDocument();
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
});
