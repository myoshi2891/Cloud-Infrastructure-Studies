import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// next/font/google のモック
vi.mock('next/font/google', () => ({
    Noto_Sans_JP: () => ({
        className: 'mock-noto-sans-jp',
        style: { fontFamily: 'Noto Sans JP' },
        variable: '--font-body',
    }),
    JetBrains_Mono: () => ({
        className: 'mock-jetbrains-mono',
        style: { fontFamily: 'JetBrains Mono' },
        variable: '--font-mono',
    }),
    Fraunces: () => ({
        className: 'mock-fraunces',
        style: { fontFamily: 'Fraunces' },
        variable: '--font-display',
    }),
    Sora: () => ({
        className: 'mock-sora',
        style: { fontFamily: 'Sora' },
        variable: '--font-display',
    }),
    Outfit: () => ({
        className: 'mock-outfit',
        style: { fontFamily: 'Outfit' },
        variable: '--font-display',
    }),
    Playfair_Display: () => ({
        className: 'mock-playfair-display',
        style: { fontFamily: 'Playfair Display' },
        variable: '--font-display',
    }),
    Space_Mono: () => ({
        className: 'mock-space-mono',
        style: { fontFamily: 'Space Mono' },
        variable: '--font-mono',
    }),
    Azeret_Mono: () => ({
        className: 'mock-azeret-mono',
        style: { fontFamily: 'Azeret Mono' },
        variable: '--font-mono',
    }),
    IBM_Plex_Mono: () => ({
        className: 'mock-ibm-plex-mono',
        style: { fontFamily: 'IBM Plex Mono' },
        variable: '--font-mono',
    }),
    Fira_Code: () => ({
        className: 'mock-fira-code',
        style: { fontFamily: 'Fira Code' },
        variable: '--font-mono',
    }),
    DM_Mono: () => ({
        className: 'mock-dm-mono',
        style: { fontFamily: 'DM Mono' },
        variable: '--font-mono',
    }),
}));

// next/link のモック
vi.mock('next/link', () => ({
    default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => {
        const React = require('react');
        return React.createElement('a', { href, ...props }, children);
    },
}));
