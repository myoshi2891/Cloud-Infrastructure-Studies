// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import Page from '@/app/gcl/hands-on/terraform-gcp-challenge-lab-guide/page';
import { DIAGRAMS } from '@/app/gcl/hands-on/terraform-gcp-challenge-lab-guide/constants';

const pageStyles = readFileSync(
    join(process.cwd(), 'app/gcl/hands-on/terraform-gcp-challenge-lab-guide/page.css'),
    'utf8',
);

// MermaidDiagram コンポーネントをモック化
vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: function DummyMermaidDiagram({
        chart,
        ariaLabel,
        preserveNaturalScale,
    }: {
        chart: string;
        ariaLabel?: string;
        preserveNaturalScale?: boolean;
    }) {
        return (
            <pre
                data-testid="mermaid"
                aria-label={ariaLabel}
                data-preserve-natural-scale={preserveNaturalScale ? 'true' : 'false'}
            >
                {chart}
            </pre>
        );
    },
}));

describe('Terraform GCP Challenge Lab 完全攻略ガイド ページ', () => {
    let container: HTMLElement;

    beforeEach(() => {
        ({ container } = render(<Page />));
    });

    it('ページが正常にレンダリングされること', () => {
        expect(container).toBeTruthy();
    });

    it('メインタイトルがレンダリングされること', () => {
        expect(
            screen.getByRole('heading', {
                level: 1,
                name: /Terraform で構築する Google Cloud インフラ管理/i,
            }),
        ).toBeInTheDocument();
    });

    it('主要なセクションの見出しがすべてレンダリングされること', () => {
        expect(
            screen.getByRole('heading', {
                name: /1このラボで学ぶこと/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /2完成形のアーキテクチャ/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /3事前準備: Terraform CLI のインストール/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /4Task 1: ディレクトリ構成とルート変数の設計/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /5Task 2: リソースのインポートと構成/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /6Task 3: リモートバックエンド（Cloud Storage）への切り替え/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /7Task 4: インフラの変更（Update in-place）/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /8Task 5: リソースの削除（Destroy）/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /9Task 6: Registry モジュールの活用（VPC & Subnet）/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /10Task 7: ファイアウォールルールの設定/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /11ベストプラクティス総まとめ/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: /12参考文献・引用ソース一覧/i,
            }),
        ).toBeInTheDocument();
    });

    it('DIAGRAMS が8個の定義を持つこと', () => {
        expect(Object.keys(DIAGRAMS).length).toBe(8);
    });

    it('すべての MermaidDiagram に preserveNaturalScale と ariaLabel が設定されていること', () => {
        const mermaids = screen.getAllByTestId('mermaid');
        expect(mermaids.length).toBe(8);
        mermaids.forEach((mermaid) => {
            expect(mermaid.getAttribute('data-preserve-natural-scale')).toBe('true');
            expect(mermaid.getAttribute('aria-label')).toBeTruthy();
        });
    });

    it('アイコンフォントを外部 CDN ではなくローカル npm パッケージから読み込むこと', () => {
        expect(pageStyles).toContain(
            "@import '@tabler/icons-webfont/dist/tabler-icons.min.css';",
        );
        expect(pageStyles).not.toMatch(/@import\s+['"]https?:\/\//);
    });

    it('目次リンクに対応する本文セクションが存在すること', () => {
        const links = container.querySelectorAll<HTMLAnchorElement>('.sidebar-nav a[href^="#"]');
        expect(links.length).toBeGreaterThan(0);

        links.forEach((link) => {
            const sectionId = link.getAttribute('href')?.slice(1);
            expect(sectionId).toBeTruthy();
            expect(container.querySelector(`section#${sectionId}`)).toBeInTheDocument();
        });
    });
});
