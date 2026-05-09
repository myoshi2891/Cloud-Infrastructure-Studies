import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section6 } from '../../../../app/gcl/cloud-digital-leader/section6/components/Section6';

describe('CDL Section 6 - Section 6 (Sustainability)', () => {
    it('renders the section title correctly', () => {
        render(<Section6 />);
        expect(screen.getByRole('heading', { name: /サステナビリティと/, level: 2 })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /グリーンクラウド/, level: 2 })).toBeInTheDocument();
    });

    it('renders the Google sustainability metrics correctly', () => {
        render(<Section6 />);
        expect(screen.getByText(/Google の環境への取り組み/)).toBeInTheDocument();
        expect(screen.getByText('2007')).toBeInTheDocument();
        expect(screen.getByText(/カーボンニュートラル達成年/)).toBeInTheDocument();
        expect(screen.getByText('2017')).toBeInTheDocument();
        expect(screen.getByText(/再生可能エネルギー 100% マッチング達成年/)).toBeInTheDocument();
        expect(screen.getByText('2030')).toBeInTheDocument();
        expect(screen.getByText(/全拠点で 24\/7 カーボンフリーエネルギー目標年/)).toBeInTheDocument();
    });

    it('renders the Carbon Footprint section correctly', () => {
        render(<Section6 />);
        expect(screen.getByText(/Carbon Footprint（カーボンフットプリント）レポート/)).toBeInTheDocument();
        expect(screen.getAllByText(/Scope 1/).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/Scope 2/).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/Scope 3/).length).toBeGreaterThan(0);
    });

    it('renders the cloud migration benefits cards correctly', () => {
        render(<Section6 />);
        expect(screen.getByText(/クラウド移行で環境負荷を削減できる理由/)).toBeInTheDocument();
        expect(screen.getByText('高いサーバー稼働率')).toBeInTheDocument();
        expect(screen.getByText('再生可能エネルギー')).toBeInTheDocument();
        expect(screen.getByText('高効率な冷却システム')).toBeInTheDocument();
        expect(screen.getByText('ハードウェアの効率化')).toBeInTheDocument();
    });

    it('renders the Best Practices box correctly', () => {
        render(<Section6 />);
        expect(screen.getByText('ベストプラクティス：サステナビリティ')).toBeInTheDocument();
        expect(screen.getAllByText(/Carbon Footprint ツール/).length).toBeGreaterThan(0);
        expect(screen.getByText(/サーバーレス/)).toBeInTheDocument();
        expect(screen.getByText(/オートスケーリング/)).toBeInTheDocument();
        expect(screen.getByText(/再生可能エネルギー比率の高いリージョン/)).toBeInTheDocument();
        expect(screen.getByText(/アイドル VM・ディスクの削除/)).toBeInTheDocument();
    });

    it('renders the official sources correctly', () => {
        render(<Section6 />);
        expect(screen.getByText(/Google Cloud サステナビリティ公式ページ/)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /https:\/\/cloud\.google\.com\/sustainability/ })).toBeInTheDocument();
        expect(screen.getByText(/Carbon Footprint ツール — ドキュメント/)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /https:\/\/cloud\.google\.com\/carbon-footprint/ })).toBeInTheDocument();
        expect(screen.getByText(/Google 環境サステナビリティ年次報告書/)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /https:\/\/sustainability\.google\/reports\// })).toBeInTheDocument();
    });
});
