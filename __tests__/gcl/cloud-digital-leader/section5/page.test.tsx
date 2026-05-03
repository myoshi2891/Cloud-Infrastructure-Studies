import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Section5Page from '@/app/gcl/cloud-digital-leader/section5/page';

describe('Cloud Digital Leader - Section 5 Page', () => {
    it('renders the hero section with correct title', () => {
        render(<Section5Page />);
        // The actual text from the HTML hero section
        const titleElement = screen.getByRole('heading', { level: 1, name: /Trust and Security/i });
        expect(titleElement).toBeInTheDocument();
    });

    it('renders the section navigation', () => {
        render(<Section5Page />);
        const navElement = screen.getByRole('navigation', { name: 'セクションナビゲーション' });
        expect(navElement).toBeInTheDocument();
    });

    it('renders all section placeholders', () => {
        render(<Section5Page />);
        
        // Verify each section is rendered by checking for headings
        // Step 1: Overview
        expect(screen.getByRole('heading', { level: 2, name: /Section 5 の全体像と学習ポイント/ })).toBeInTheDocument();
        
        expect(screen.getByRole('heading', { level: 2, name: /責任共有モデル/ })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /ゼロトラストと BeyondCorp/ })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /IAM（アイデンティティとアクセス管理）/ })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /暗号化とデータ保護/ })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /ネットワークセキュリティ/ })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /脅威検出とセキュリティ監視/ })).toBeInTheDocument();
        
        // Placeholder tests to fail until implemented
        expect(screen.getByRole('heading', { level: 2, name: /Placeholder 4/ })).toBeInTheDocument();
    });
});