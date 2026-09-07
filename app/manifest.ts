import type { MetadataRoute } from 'next';

/**
 * PWA マニフェスト。Next.js が /manifest.webmanifest として配信し、
 * <link rel="manifest"> を自動注入する。
 * 色はいずれも app/globals.css の @theme トークンと同値を保つこと。
 */
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Cloud Infrastructure Studies',
        short_name: 'Cloud Studies',
        description: 'Google Cloud 認定試験学習ガイド',
        start_url: '/',
        display: 'standalone',
        background_color: '#08090f',
        theme_color: '#08090f',
        lang: 'ja',
        icons: [
            {
                src: '/icons/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/icons/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
            },
        ],
    };
}
