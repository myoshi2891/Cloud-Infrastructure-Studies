import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('スモークテスト', () => {
    it('Home ページがレンダリングされること', () => {
        render(<Home />);
        expect(screen.getByText('Cloud Infrastructure Studies')).toBeInTheDocument();
    });
});
