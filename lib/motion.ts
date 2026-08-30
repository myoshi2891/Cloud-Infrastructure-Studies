/**
 * ユーザーがモーション低減を希望しているかを判定する。
 *
 * CSS の `scroll-behavior` は JS が `scrollIntoView` に渡す `behavior` に
 * 上書きされるため、`@media (prefers-reduced-motion: reduce)` だけでは
 * スムーススクロールを止められない。スクロールを行う側で明示的に判定する。
 *
 * SSR および matchMedia 非対応環境では `false`（＝通常のアニメーション）を返す。
 */
export const prefersReducedMotion = (): boolean => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return false;
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/** モーション低減設定に応じた `scrollIntoView` の `behavior` を返す。 */
export const scrollBehavior = (): ScrollBehavior => (prefersReducedMotion() ? 'auto' : 'smooth');
