import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '@/app/gcl/associate-cloud-engineer/section3/NavBar';

describe('NavBar component', () => {
    it('should render the toggle button and handle drawer open/close', async () => {
        render(<NavBar />);
        
        // トグルボタン（📋 目次）が存在することを確認
        const toggleBtn = screen.getByRole('button', { name: /ページ内目次を開く/i });
        expect(toggleBtn).toBeInTheDocument();
        
        // 初期状態では sidebar は開いていない（aria-expanded が false）
        expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
        
        // サイドバー要素を取得
        const sidebar = screen.getByRole('navigation', { name: /Section 3 ガイドナビゲーション/i });
        // 初期状態では open クラスが付いていない
        expect(sidebar.className).not.toContain('open');
        
        // トグルボタンをクリック
        fireEvent.click(toggleBtn);
        
        // 開いた状態になる（aria-expanded が true になり、open クラスが付与される）
        expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
        expect(sidebar.className).toContain('open');
        
        // 目次リンクをクリックしたときに閉じるか検証
        const link = screen.getByText('3.1 コンピューティング管理');
        fireEvent.click(link);
        
        // 閉じた状態に戻る
        expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
        expect(sidebar.className).not.toContain('open');
    });
});
