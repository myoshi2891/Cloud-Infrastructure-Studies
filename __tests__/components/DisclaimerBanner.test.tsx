import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';

describe('DisclaimerBanner', () => {
    it('aside 要素であり、特定の aria-label を持ち、意図した role="note" を持っていること', () => {
        const { container } = render(<DisclaimerBanner />);
        const aside = container.querySelector('aside');
        expect(aside).toBeInTheDocument();
        expect(aside).toHaveAttribute('aria-label');
        
        // 意図的な失敗: 実際には role="note" はありませんが、JSDocを更新する前にテストを失敗させます
        expect(aside?.getAttribute('role')).toBe('note');
    });

    it('--disclaimer-height カスタムプロパティが documentElement に設定されること', () => {
        render(<DisclaimerBanner />);
        const height = document.documentElement.style.getPropertyValue('--disclaimer-height');
        expect(height).toBeTruthy();
    });
});
