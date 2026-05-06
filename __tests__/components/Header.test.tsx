import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '@/components/Header';

describe('Header', () => {
    it('サイトタイトルが表示されること', () => {
        render(<Header />);
        // "Cloud Infrastructure" と "Studies" が別 <span> に分かれているため
        // getByRole でアクセシブル名（全子孫テキストを結合）を検索する
        expect(screen.getByRole('link', { name: /cloud infrastructure studies/i })).toBeInTheDocument();
    });

    it('GenAI Leader ドロップダウントリガーが存在すること', () => {
        render(<Header />);
        const button = screen.getByRole('button', { name: /generative ai leader/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('aria-haspopup', 'true');
        expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('GenAI Leader ドロップダウントリガーがクリックで開閉すること', () => {
        render(<Header />);
        const button = screen.getByRole('button', { name: /generative ai leader/i });
        expect(button).toHaveAttribute('aria-expanded', 'false');
        fireEvent.click(button);
        expect(button).toHaveAttribute('aria-expanded', 'true');
        fireEvent.click(button);
        expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('GenAI Leader ページへのリンクが存在すること', () => {
        render(<Header />);
        const button = screen.getByRole('button', { name: /generative ai leader/i });
        fireEvent.click(button);
        const link = screen.getByRole('link', { name: /generative ai leader 概要/i });
        expect(link).toHaveAttribute('href', '/gcl/genai-leader');
    });

    it('Associate Cloud Engineer ドロップダウントリガーが存在すること', () => {
        render(<Header />);
        const button = screen.getByRole('button', { name: /associate cloud engineer/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('aria-haspopup', 'true');
        expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('ACE ドロップダウントリガーがクリックで開閉すること', () => {
        render(<Header />);
        const button = screen.getByRole('button', { name: /associate cloud engineer/i });
        expect(button).toHaveAttribute('aria-expanded', 'false');
        fireEvent.click(button);
        expect(button).toHaveAttribute('aria-expanded', 'true');
        fireEvent.click(button);
        expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('ACE ドロップダウンが Escape キーで閉じること', () => {
        render(<Header />);
        const button = screen.getByRole('button', { name: /associate cloud engineer/i });
        fireEvent.click(button);
        expect(button).toHaveAttribute('aria-expanded', 'true');
        fireEvent.keyDown(document, { key: 'Escape' });
        expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('ACE ドロップダウンが外側クリックで閉じること', () => {
        render(<Header />);
        const button = screen.getByRole('button', { name: /associate cloud engineer/i });
        fireEvent.click(button);
        expect(button).toHaveAttribute('aria-expanded', 'true');
        fireEvent.mouseDown(document);
        expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('ACE 概要リンクが /gcl/associate-cloud-engineer を指すこと', () => {
        render(<Header />);
        const button = screen.getByRole('button', { name: /associate cloud engineer/i });
        fireEvent.click(button);
        const link = screen.getAllByRole('link', { name: /^概要$/i })[0];
        expect(link).toHaveAttribute('href', '/gcl/associate-cloud-engineer');
    });

    it('ACE architecture-guide サブリンクが存在すること', () => {
        render(<Header />);
        const button = screen.getByRole('button', { name: /associate cloud engineer/i });
        fireEvent.click(button);
        const link = screen.getByRole('link', { name: /試験対策・アーキテクチャ詳細ガイド/i });
        expect(link).toHaveAttribute('href', '/gcl/associate-cloud-engineer/architecture-guide');
    });

    it('ACE domain1 サブリンクが存在すること', () => {
        render(<Header />);
        const button = screen.getByRole('button', { name: /associate cloud engineer/i });
        fireEvent.click(button);
        const link = screen.getByRole('link', { name: /domain 1: 環境設定 包括的解説/i });
        expect(link).toHaveAttribute('href', '/gcl/associate-cloud-engineer/domain1');
    });

    it('nav 要素として描画されること', () => {
        render(<Header />);
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('Section 1 へのドロップダウンリンクが存在すること', () => {
        render(<Header />);
        const button = screen.getByRole('button', { name: /generative ai leader/i });
        fireEvent.click(button);
        const link = screen.getAllByRole('link', { name: /section 1/i })[0];
        expect(link).toHaveAttribute('href', '/gcl/genai-leader/section1');
    });

    it('Section 2 へのドロップダウンリンクが存在すること', () => {
        render(<Header />);
        const button = screen.getByRole('button', { name: /generative ai leader/i });
        fireEvent.click(button);
        const link = screen.getAllByRole('link', { name: /section 2/i })[0];
        expect(link).toHaveAttribute('href', '/gcl/genai-leader/section2');
    });

    it('Section 3 へのドロップダウンリンクが存在すること', () => {
        render(<Header />);
        const button = screen.getByRole('button', { name: /generative ai leader/i });
        fireEvent.click(button);
        const link = screen.getAllByRole('link', { name: /section 3/i })[0];
        expect(link).toHaveAttribute('href', '/gcl/genai-leader/section3');
    });

    it('Section 4 へのドロップダウンリンクが存在すること', () => {
        render(<Header />);
        const button = screen.getByRole('button', { name: /generative ai leader/i });
        fireEvent.click(button);
        const link = screen.getAllByRole('link', { name: /section 4/i })[0];
        expect(link).toHaveAttribute('href', '/gcl/genai-leader/section4');
    });

    it('Cloud Digital Leader ドロップダウントリガーが存在すること', () => {
        render(<Header />);
        const button = screen.getByRole('button', { name: /cloud digital leader/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('aria-haspopup', 'true');
        expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('Cloud Digital Leader ドロップダウントリガーがクリックで開閉すること', () => {
        render(<Header />);
        const button = screen.getByRole('button', { name: /cloud digital leader/i });
        expect(button).toHaveAttribute('aria-expanded', 'false');
        fireEvent.click(button);
        expect(button).toHaveAttribute('aria-expanded', 'true');
        fireEvent.click(button);
        expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('Cloud Digital Leader ページへのリンクが存在すること', () => {
        render(<Header />);
        const button = screen.getByRole('button', { name: /cloud digital leader/i });
        fireEvent.click(button);
        const link = screen.getByRole('link', { name: /cloud digital leader 概要/i });
        expect(link).toHaveAttribute('href', '/gcl/cloud-digital-leader');
    });

    it('Cloud Digital Leader ドロップダウンが Escape キーで閉じること', () => {
        render(<Header />);
        const button = screen.getByRole('button', { name: /cloud digital leader/i });
        fireEvent.click(button);
        expect(button).toHaveAttribute('aria-expanded', 'true');
        fireEvent.keyDown(document, { key: 'Escape' });
        expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('ACE domain2 サブリンクが存在すること', () => {
        render(<Header />);
        const button = screen.getByRole('button', { name: /associate cloud engineer/i });
        fireEvent.click(button);
        expect(button).toHaveAttribute('aria-expanded', 'true');
        const link = screen.getByRole('link', { name: /domain 2: 計画と実装 包括的解説/i });
        expect(link).toBeInTheDocument();
    });

    it('ACE domain3 サブリンクが存在すること', () => {
        render(<Header />);
        const button = screen.getByRole('button', { name: /associate cloud engineer/i });
        fireEvent.click(button);
        expect(button).toHaveAttribute('aria-expanded', 'true');
        const link = screen.getByRole('link', { name: /domain 3: 運用管理 包括的解説/i });
        expect(link).toBeInTheDocument();
    });
});
