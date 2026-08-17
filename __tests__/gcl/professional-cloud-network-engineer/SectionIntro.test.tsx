import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SectionIntro } from '@/app/gcl/professional-cloud-network-engineer/components/SectionIntro';

describe('Professional Cloud Network Engineer - SectionIntro', () => {
    it('renders the section title correctly', () => {
        render(<SectionIntro />);
        expect(screen.getByRole('heading', { name: /試験の全体像と準備方法/, level: 2 })).toBeInTheDocument();
        expect(screen.getByText('INTRO')).toBeInTheDocument();
    });

    // 配点は公式 Exam Guide（Section 1〜6 = 21/20/16/16/14/13、合計100%）が正本。
    // 本ページの S1 は公式 Section 1+2 を統合（21+20=41%）、S3・S4 は公式 Section 3
    // （~16%、Task 3.1 と 3.2-3.3）を分担するため 1 本のバーに統合している。
    // タスク単位の配点は公式に非公開のため、S3/S4 個別の数値は掲げない。
    it('renders the exam weights correctly', () => {
        render(<SectionIntro />);
        // 配点バッジは完全一致で拾う。部分一致にすると解説文中の「~16%」も
        // 巻き込んで件数がずれるため。
        expect(screen.getByText(/S1: VPCネットワークの設計・実装/)).toBeInTheDocument();
        expect(screen.getByText('~41%')).toBeInTheDocument();
        expect(screen.getByText(/S2: ハイブリッド接続・ネットワーク相互接続/)).toBeInTheDocument();
        expect(
            screen.getByText(/S3・S4: ロードバランシング \/ CDN・DNS・IPアドレス管理/),
        ).toBeInTheDocument();
        // S2（公式 Section 4）と S3・S4（公式 Section 3）がともに ~16%
        expect(screen.getAllByText('~16%')).toHaveLength(2);
        expect(screen.getByText(/S5: ネットワークセキュリティの設計と実装/)).toBeInTheDocument();
        expect(screen.getByText('~13%')).toBeInTheDocument();
        expect(screen.getByText(/S6: ネットワーク操作と監視/)).toBeInTheDocument();
        expect(screen.getByText('~14%')).toBeInTheDocument();
    });

    it('合計が公式 Exam Guide の 100% と一致する', () => {
        render(<SectionIntro />);
        const total = screen
            .getAllByText(/^~\d+%$/)
            .reduce((sum, el) => sum + Number(el.textContent?.replace(/[~%]/g, '')), 0);
        expect(total).toBe(100);
    });

    it('renders the recommended learning steps correctly', () => {
        render(<SectionIntro />);
        expect(screen.getByText(/推奨学習ステップ/)).toBeInTheDocument();
        expect(screen.getByText(/公式試験ガイドを熟読する（必須）/)).toBeInTheDocument();
        expect(screen.getByText(/Cloud Skills Boost のPCNEラーニングパスを修了/)).toBeInTheDocument();
        expect(screen.getByText(/ハンズオンラボで実際に操作する/)).toBeInTheDocument();
        expect(screen.getByText(/公式サンプル問題・模擬試験で実力測定/)).toBeInTheDocument();
        expect(screen.getByText(/弱点分野を公式ドキュメントで補強して試験登録/)).toBeInTheDocument();
    });

    it('renders official resources correctly', () => {
        render(<SectionIntro />);
        expect(screen.getByText(/公式リソース/)).toBeInTheDocument();
        expect(screen.getByText(/公式試験ページ — Professional Cloud Network Engineer/)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /cloud\.google\.com\/learn\/certification\/cloud-network-engineer/ })).toBeInTheDocument();
        expect(screen.getByText(/最新試験ガイド PDF（英語・2024年4月版）/)).toBeInTheDocument();
    });
});
