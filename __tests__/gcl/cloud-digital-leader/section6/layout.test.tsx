import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Section6Layout from '../../../../app/gcl/cloud-digital-leader/section6/layout';

describe('Section6Layout', () => {
    it('renders the children', () => {
        render(
            <Section6Layout>
                <div data-testid="child-element">Test Content</div>
            </Section6Layout>
        );
        expect(screen.getByTestId('child-element')).toBeInTheDocument();
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
});
