import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Section4Page from '@/app/gcl/cloud-digital-leader/section4/page';

describe('Cloud Digital Leader - Section 4 Page', () => {
    it('renders the hero section with correct title', () => {
        render(<Section4Page />);
        
        // title contains <em>モダナイゼーション</em>
        const titleElement = screen.getByRole('heading', { level: 1 });
        expect(titleElement).toBeInTheDocument();
        expect(titleElement).toHaveTextContent(/モダナイゼーション/);
    });

    it('renders the navigation track', () => {
        render(<Section4Page />);
        const nav = screen.getByRole('navigation', { name: 'セクションナビゲーション' });
        expect(nav).toBeInTheDocument();
    });

    it('renders all section placeholders', () => {
        render(<Section4Page />);
        
        // Verify each section is rendered by checking for headings
        expect(screen.getByRole('heading', { level: 2, name: /Section 4 の全体像と学習ポイント/ })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /コンピューティングサービスの選択/ })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /コンテナと GKE/ })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /サーバーレスコンピューティング/ })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /ネットワークサービスとハイブリッド接続/ })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /ハイブリッド＆マルチクラウド管理/ })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /DevOps と SRE の原則/ })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /API の戦略的価値と Apigee/ })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /コスト最適化の実践/ })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /試験直前チェックリスト＆頻出パターン/ })).toBeInTheDocument();
    });
});
