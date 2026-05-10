import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Layout, { metadata } from '../../../app/gcl/professional-cloud-network-engineer/layout';

describe('Professional Cloud Network Engineer - Layout', () => {
    it('should have the correct metadata', () => {
        expect(metadata.title).toBe('Professional Cloud Network Engineer | Google Cloud Certification');
        expect(metadata.description).toContain('完全試験対策ガイド');
    });

    it('should render children correctly', () => {
        const { getByText } = render(
            <Layout>
                <div>Test Child Content</div>
            </Layout>
        );
        expect(getByText('Test Child Content')).toBeInTheDocument();
    });
});
