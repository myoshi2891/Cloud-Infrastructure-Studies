import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
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
