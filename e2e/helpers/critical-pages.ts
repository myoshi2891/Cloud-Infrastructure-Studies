/**
 * 横断品質テスト（a11y / visual / perf）で共有する主要ページのパス一覧。
 * 追加・削除はここ 1 箇所で完結する。
 */
export const CRITICAL_PAGES = [
    '/',
    '/gcl/associate-cloud-engineer',
    '/gcl/genai-leader',
    '/gcl/cloud-digital-leader',
    '/gcl/agwa',
    '/gcl/professional-cloud-network-engineer',
    '/gcl/professional-cloud-network-engineer-step-by-step',
] as const;

export type CriticalPagePath = (typeof CRITICAL_PAGES)[number];
