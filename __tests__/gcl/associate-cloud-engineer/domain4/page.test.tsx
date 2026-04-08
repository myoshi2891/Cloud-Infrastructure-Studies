import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Domain4Page from '../../../../app/gcl/associate-cloud-engineer/domain4/page';

describe('ACE Domain 4 Page', () => {
    it('renders the page title and hero section correctly', () => {
        render(<Domain4Page />);
        expect(screen.getByText('アクセスとセキュリティの構成')).toBeDefined();
        expect(screen.getByText(/試験比重: 約20%/i)).toBeDefined();
    });
});
