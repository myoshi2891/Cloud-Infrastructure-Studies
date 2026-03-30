import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RootLayout from '@/app/layout';

describe('RootLayout', () => {
    it('children を描画すること', () => {
        render(
            <RootLayout>
                <div data-testid="child">テスト</div>
            </RootLayout>
        );
        expect(screen.getByTestId('child')).toBeInTheDocument();
    });
});
