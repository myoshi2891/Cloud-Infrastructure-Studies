import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section2 } from '../../../../app/gcl/cloud-digital-leader/section6/components/Section2';

describe('CDL Section 6 - Section 2 (SRE Principles)', () => {
    it('renders the section title correctly', () => {
        render(<Section2 />);
        expect(screen.getByRole('heading', { name: /SRE 原則と/, level: 2 })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /運用の卓越性/, level: 2 })).toBeInTheDocument();
    });

    it('renders the SRE definition correctly', () => {
        render(<Section2 />);
        expect(screen.getByText(/SRE（Site Reliability Engineering）とは？/)).toBeInTheDocument();
    });

    it('renders the important metrics table correctly', () => {
        render(<Section2 />);
        expect(screen.getByRole('table')).toBeInTheDocument();
        expect(screen.getByText('SLI')).toBeInTheDocument();
        expect(screen.getByText('SLO')).toBeInTheDocument();
        expect(screen.getByText('SLA')).toBeInTheDocument();
        expect(screen.getByText('Error Budget')).toBeInTheDocument();
    });

    it('renders the Toil concept correctly', () => {
        render(<Section2 />);
        expect(screen.getByText(/Toil（トイル）の概念/)).toBeInTheDocument();
        expect(screen.getByText('Toil の特徴')).toBeInTheDocument();
        expect(screen.getByText('Toil 削減の方法')).toBeInTheDocument();
    });

    it('renders the Best Practices box correctly', () => {
        render(<Section2 />);
        expect(screen.getByText('ベストプラクティス：SRE と運用の卓越性')).toBeInTheDocument();
        expect(screen.getByText(/SLO を先に定義/)).toBeInTheDocument();
        expect(screen.getByText(/エラーバジェットを使ってリリース判断/)).toBeInTheDocument();
        expect(screen.getByText(/ブレームレス Postmortem/)).toBeInTheDocument();
    });

    it('renders external links correctly', () => {
        render(<Section2 />);
        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(2);
        expect(links[0]).toHaveAttribute('href', 'https://sre.google/books/');
        expect(links[1]).toHaveAttribute('href', 'https://cloud.google.com/blog/products/devops-sre');
    });
});
