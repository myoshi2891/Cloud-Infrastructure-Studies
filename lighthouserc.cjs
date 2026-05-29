/**
 * Lighthouse CI 設定（手動レポート用）。
 *
 * 使い方:
 *   bun run build && bun run perf:report
 *
 * 結果は .lighthouseci/ 配下に HTML/JSON 形式で出力される。CI 自動ゲートではなく、
 * 詳細な深掘り分析（Performance / Accessibility / Best Practices / SEO の各項目別レポート）を
 * 取得したいときに手動で実行する位置付け。
 */
module.exports = {
    ci: {
        collect: {
            url: [
                'http://localhost:3000/',
                'http://localhost:3000/gcl/associate-cloud-engineer',
                'http://localhost:3000/gcl/genai-leader',
                'http://localhost:3000/gcl/cloud-digital-leader',
                'http://localhost:3000/gcl/agwa',
                'http://localhost:3000/gcl/professional-cloud-network-engineer',
                'http://localhost:3000/gcl/professional-cloud-network-engineer-step-by-step',
            ],
            startServerCommand: 'bun run start',
            startServerReadyPattern: 'Ready in',
            numberOfRuns: 1,
            settings: {
                preset: 'desktop',
                chromeFlags: '--no-sandbox',
            },
        },
        assert: {
            preset: 'lighthouse:no-pwa',
            assertions: {
                'categories:performance': ['warn', { minScore: 0.6 }],
                'categories:accessibility': ['error', { minScore: 0.9 }],
                'categories:best-practices': ['warn', { minScore: 0.8 }],
                'categories:seo': ['warn', { minScore: 0.8 }],
            },
        },
        upload: {
            target: 'filesystem',
            outputDir: './.lighthouseci',
        },
    },
};
