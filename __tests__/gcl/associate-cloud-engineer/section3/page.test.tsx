import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Section3Page from '@/app/gcl/associate-cloud-engineer/section3/page';

describe('ACE Section 3 完全ガイド ページ', () => {
    let container: HTMLElement;

    beforeEach(() => {
        ({ container } = render(<Section3Page />));
    });

    it('hero タイトルがレンダリングされること', () => {
        expect(screen.getAllByText(/Ensuring the Successful Operation/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(/of a Cloud Solution/).length).toBeGreaterThanOrEqual(1);
    });

    it('試験ガイドの年表記が 2026 に修正されていること', () => {
        expect(screen.getByText(/2026年6月30日改訂版/)).toBeInTheDocument();
    });

    it('Section 3 の配点が ~30% に修正されていること', () => {
        expect(screen.getByText('~30%')).toBeInTheDocument();
    });

    it('3.1 の全サブセクション見出しが存在すること', () => {
        expect(screen.getByText('Compute Engine へのリモート接続')).toBeInTheDocument();
        expect(screen.getByText('スナップショットとイメージ管理')).toBeInTheDocument();
        expect(screen.getByText('GKE クラスタの運用管理')).toBeInTheDocument();
        expect(screen.getByText('Pod オートスケーリング（HPA / VPA）')).toBeInTheDocument();
        expect(screen.getByText('Cloud Run の運用管理')).toBeInTheDocument();
        expect(screen.getByText('GPU / TPU アタッチメント')).toBeInTheDocument();
    });

    it('3.2 ストレージとデータソリューションの見出しが存在すること', () => {
        expect(screen.getByText('Cloud Storage の操作とセキュリティ')).toBeInTheDocument();
        expect(screen.getByText('ライフサイクル管理ポリシー')).toBeInTheDocument();
        expect(screen.getByText('データベースクエリと操作')).toBeInTheDocument();
        expect(screen.getByText('バックアップとリストア')).toBeInTheDocument();
        expect(screen.getByText('Database Center と CMEK')).toBeInTheDocument();
    });

    it('3.3 ネットワークリソースの見出しが存在すること', () => {
        expect(screen.getByText('サブネット・IP アドレス管理')).toBeInTheDocument();
        expect(screen.getByText('Cloud DNS と Cloud NAT')).toBeInTheDocument();
        expect(screen.getByText('VPC ファイアウォールと Cloud NGFW')).toBeInTheDocument();
    });

    it('3.4 モニタリングの見出しが存在すること', () => {
        expect(screen.getByText('Cloud Monitoring アラートポリシー')).toBeInTheDocument();
        expect(screen.getByText('ログ管理・監査ログ・エクスポート')).toBeInTheDocument();
        expect(screen.getByText('診断ツール群（Trace / Profiler / Query Insights）')).toBeInTheDocument();
        expect(screen.getByText('Ops Agent と Managed Prometheus')).toBeInTheDocument();
        expect(screen.getByText('AI 支援ツール群（Gemini / Active Assist / Cloud Hub）')).toBeInTheDocument();
    });

    it('まとめセクション（チェックリスト）が存在すること', () => {
        expect(screen.getByText('試験直前チェックリスト')).toBeInTheDocument();
    });

    it('チェックリスト項目が 20 件存在すること', () => {
        const boxes = container.querySelectorAll('.check-box');
        expect(boxes).toHaveLength(20);
    });

    it('サイドバーナビが存在しアンカーリンクを含むこと', () => {
        const nav = screen.getByRole('navigation', { name: /Section 3/ });
        expect(nav).toBeInTheDocument();
        const links = within(nav).getAllByRole('link');
        expect(links.length).toBeGreaterThanOrEqual(18);
    });
});
