import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';

describe('DisclaimerBanner', () => {
    it('aside 要素であり、特定の aria-label を持ち、role 属性が設定されていないこと', () => {
        const { container } = render(<DisclaimerBanner />);
        const aside = container.querySelector('aside');
        expect(aside).toBeInTheDocument();
        expect(aside).toHaveAttribute('aria-label', '免責事項: 本サイトは個人学習目的です。最新の公式情報は各試験プロバイダーの公式サイトをご確認ください。');
        
        // role 属性が明示的に設定されていないことを検証
        expect(aside?.getAttribute('role')).toBeNull();
    });

    it('--disclaimer-height カスタムプロパティが documentElement に設定されること', () => {
        render(<DisclaimerBanner />);
        const height = document.documentElement.style.getPropertyValue('--disclaimer-height');
        expect(height).toBeTruthy();
    });
});
