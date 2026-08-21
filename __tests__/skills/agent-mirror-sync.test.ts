import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

/**
 * エージェント設定は `.agents/` を正本とし、`.claude/` と `.gemini/` はその複製である。
 * 3系統が乖離すると、使用するエージェントによって適用されるルールが変わり、
 * 移行漏れ・スタイル崩れの原因になる（実際に fix-mermaid/SKILL.md が3系統で乖離した実績あり）。
 *
 * このテストは正本と各ミラーがバイト単位で一致することを機械的に保証する。
 * 同期手順は `.agents/rules/tdd-commit-workflow.md` §8 を参照。
 */

const REPO_ROOT = path.resolve(__dirname, '../..');
const SOURCE_DIR = '.agents';
const MIRROR_DIRS = ['.claude', '.gemini'] as const;

/** 3系統で同期対象とするサブツリー（`.agents` 固有の `skills/improve` は対象外） */
const SYNCED_SUBTREES = [
    'rules',
    'skills/fix-mermaid',
    'skills/html-to-nextjs-migration',
    'skills/md-to-nextjs-migration',
    'skills/markdown-formatter',
    'skills/md-to-html',
    'skills/spec-sync',
] as const;

/**
 * 指定ディレクトリ配下の全ファイルを、そのディレクトリからの相対パスで再帰列挙する。
 * @param absoluteDir 列挙の起点となる絶対パス
 * @returns ソート済みの相対パス配列。ディレクトリが存在しない場合は空配列
 */
function listFilesRecursively(absoluteDir: string): string[] {
    if (!fs.existsSync(absoluteDir)) {
        return [];
    }
    return fs
        .readdirSync(absoluteDir, { recursive: true, withFileTypes: true })
        .filter((entry) => entry.isFile())
        .map((entry) => path.relative(absoluteDir, path.join(entry.parentPath, entry.name)))
        .sort();
}

/** 正本側の同期対象ファイル（`.agents` からの相対パス）を全件収集する */
function collectSourceFiles(): string[] {
    return SYNCED_SUBTREES.flatMap((subtree) =>
        listFilesRecursively(path.join(REPO_ROOT, SOURCE_DIR, subtree)).map((relativePath) =>
            path.join(subtree, relativePath),
        ),
    ).sort();
}

describe('エージェント設定の3系統ミラー同期', () => {
    const sourceFiles = collectSourceFiles();

    it('正本 .agents に同期対象ファイルが存在する', () => {
        // 収集ロジック自体が壊れた場合に、後続テストが空ループで無条件 Pass するのを防ぐ
        expect(sourceFiles.length).toBeGreaterThan(0);
    });

    it.each([...SYNCED_SUBTREES])('正本に %s が存在する', (subtree) => {
        expect(fs.existsSync(path.join(REPO_ROOT, SOURCE_DIR, subtree))).toBe(true);
    });

    it.each([...MIRROR_DIRS])('%s に同期対象ファイルが1件も欠落していない', (mirrorDir) => {
        const missing = sourceFiles.filter(
            (relativePath) => !fs.existsSync(path.join(REPO_ROOT, mirrorDir, relativePath)),
        );
        expect(missing).toEqual([]);
    });

    it.each([...MIRROR_DIRS])('%s の内容が正本 .agents と完全に一致する', (mirrorDir) => {
        const divergent = sourceFiles.filter((relativePath) => {
            const mirrorPath = path.join(REPO_ROOT, mirrorDir, relativePath);
            if (!fs.existsSync(mirrorPath)) {
                return false; // 欠落は上のテストで検出する
            }
            const sourceContent = fs.readFileSync(
                path.join(REPO_ROOT, SOURCE_DIR, relativePath),
            );
            return !fs.readFileSync(mirrorPath).equals(sourceContent);
        });
        expect(divergent).toEqual([]);
    });

    it.each([...MIRROR_DIRS])('%s に正本へ存在しない余分なファイルが無い', (mirrorDir) => {
        const sourceFileSet = new Set(sourceFiles);
        const extraneous = SYNCED_SUBTREES.flatMap((subtree) =>
            listFilesRecursively(path.join(REPO_ROOT, mirrorDir, subtree)).map((relativePath) =>
                path.join(subtree, relativePath),
            ),
        ).filter((relativePath) => !sourceFileSet.has(relativePath));
        expect(extraneous).toEqual([]);
    });
});
