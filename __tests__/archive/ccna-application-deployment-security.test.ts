import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const workspacePath = (...segments: string[]): string => join(process.cwd(), ...segments);
const archiveRoot = workspacePath('archive', 'Cisco');
const readArchiveFile = (kind: 'html' | 'md', name: string): string => {
    return readFileSync(join(archiveRoot, kind, 'ccna', name), 'utf8');
};

describe('CCNA application deployment and security archives', () => {
    const htmlName = 'Ccna-automation-application-deployment-security.html';
    const markdownName = 'Ccna-automation-application-deployment-security.md';
    const html = readArchiveFile('html', htmlName);
    const markdown = readArchiveFile('md', markdownName);

    it('Cisco archives use only the canonical archive/Cisco hierarchy', () => {
        expect(existsSync(workspacePath('Gcl_Archive', 'Cisco'))).toBe(false);
        expect(existsSync(join(archiveRoot, 'html', 'ccna', htmlName))).toBe(true);
        expect(existsSync(join(archiveRoot, 'md', 'ccna', markdownName))).toBe(true);
        expect(
            existsSync(
                join(
                    archiveRoot,
                    'html',
                    'ccna',
                    'Ccna-automation-cisco-platforms-and-development.html',
                ),
            ),
        ).toBe(true);
    });

    it('Markdown has one H1 and blank lines around anchored headings', () => {
        const markdownWithoutCodeFences = markdown.replace(/```[\s\S]*?```/g, '');
        expect(markdownWithoutCodeFences.match(/^# /gm)).toHaveLength(1);
        expect(markdown).not.toMatch(/<a id="[^"]+"><\/a>\n##/);
        expect(markdown).toMatch(/^# CCNA Automation（200-901 CCNAAUTO）「Application Deployment and Security」ドメイン 完全解説ガイド\n\n/);
    });

    it('code examples and all Mermaid descriptions remain readable without external scripts', () => {
        expect(html).toMatch(/id="code-unittest-example">\s*import unittest/);
        expect(html).toMatch(/id="code-dockerfile-example">\s*# ベースイメージを指定/);
        expect(html.match(/\baccTitle\b/g)).toHaveLength(10);
        expect(html.match(/\baccDescr\b/g)).toHaveLength(10);
        expect(html.match(/<noscript>\s*<p class="mermaid-fallback">/g)).toHaveLength(10);
    });

    it('preserves complete Docker command placeholders and corrected security guidance', () => {
        expect(html).toContain('docker stop コンテナ名またはID');
        expect(html).toContain('docker rm コンテナ名またはID');
        expect(html).toContain('docker push イメージ名');
        expect(html).toContain('docker pull イメージ名');
        expect(html).not.toContain('第1章の「テスト駆動開発（TDD）」');
        expect(html).toContain('出力エンコーディング');
        expect(html).toContain('パラメータ化クエリ');
        expect(html).toContain('CSRFトークンまたはSameSite Cookie');
    });

    it('models DNS as a prerequisite and the HTTP request path from user to firewall', () => {
        expect(html).toContain('User["ユーザー"] --> FW');
        expect(html).not.toContain('User["ユーザー"] --> DNS');
        expect(html).toContain('DNS -.-> User');
        expect(html).toContain('構成例');
    });

    it('configures and awaits Mermaid safely and exposes active navigation semantics', () => {
        expect(html).toMatch(/htmlLabels:\s*true,[\s\S]*flowchart:\s*\{\s*useMaxWidth:/);
        expect(html).not.toMatch(/flowchart:\s*\{[^}]*htmlLabels:/s);
        expect(html).toMatch(/try\s*\{\s*await mermaid\.run/);
        expect(html).toContain('図の描画に失敗しました');
        expect(html).toContain("link.setAttribute('aria-current', 'location')");
        expect(html).toContain("link.removeAttribute('aria-current')");
    });
});
