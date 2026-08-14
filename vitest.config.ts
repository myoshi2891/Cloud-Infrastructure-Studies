import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        // Node.js 25 enables its own incomplete Web Storage object unless a
        // persistence file is configured. Disable it in workers so jsdom owns
        // window.localStorage consistently across supported Node versions.
        execArgv: ['--no-experimental-webstorage'],
        globals: true,
        setupFiles: ['./vitest.setup.ts'],
        include: [
            '__tests__/**/*.test.{ts,tsx}',
            '.agents/skills/fix-mermaid/scripts/restore_diagrams.test.ts',
            '.claude/skills/fix-mermaid/scripts/restore_diagrams.test.ts',
            '.gemini/skills/fix-mermaid/scripts/restore_diagrams.test.ts',
        ],
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './'),
        },
    },
});
