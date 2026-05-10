import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SectionIntro } from '@/app/gcl/professional-cloud-network-engineer/components/SectionIntro';

describe('Professional Cloud Network Engineer - SectionIntro', () => {
    it('renders the section title correctly', () => {
        render(<SectionIntro />);
        expect(screen.getByRole('heading', { name: /試験の全体像と準備方法/, level: 2 })).toBeInTheDocument();
        expect(screen.getByText('INTRO')).toBeInTheDocument();
    });

    it('renders the exam weights correctly', () => {
        render(<SectionIntro />);
        expect(screen.getByText(/S1: VPCネットワーク設計/)).toBeInTheDocument();
        expect(screen.getByText(/~21%/)).toBeInTheDocument();
        expect(screen.getByText(/S2: ハイブリッド接続・ネットワーク相互接続/)).toBeInTheDocument();
        expect(screen.getByText(/~23%/)).toBeInTheDocument();
        expect(screen.getByText(/S3: ロードバランシングとトラフィック管理/)).toBeInTheDocument();
        expect(screen.getByText(/~19%/)).toBeInTheDocument();
        expect(screen.getByText(/S4: CDN・DNS・IPアドレス管理/)).toBeInTheDocument();
        expect(screen.getByText(/~15%/)).toBeInTheDocument();
        expect(screen.getByText(/S5: ネットワークセキュリティの設計と実装/)).toBeInTheDocument();
        expect(screen.getByText(/~12%/)).toBeInTheDocument();
        expect(screen.getByText(/S6: ネットワーク操作と監視/)).toBeInTheDocument();
        expect(screen.getByText(/~10%/)).toBeInTheDocument();
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
