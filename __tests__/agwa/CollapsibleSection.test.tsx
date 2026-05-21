import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CollapsibleSection } from '@/app/gcl/agwa/section2/CollapsibleSection';
import styles from '@/app/gcl/agwa/section2/page.module.css';

describe('CollapsibleSection', () => {
    it('should render header with number, title, and exam weight', () => {
        render(
            <CollapsibleSection id="s21" num="2.1" title="Gmail の設定" weight="試験頻出度 ★★★★★">
                <p>body content</p>
            </CollapsibleSection>
        );
        expect(screen.getByText('2.1')).toBeInTheDocument();
        expect(screen.getByText('Gmail の設定')).toBeInTheDocument();
        expect(screen.getByText('試験頻出度 ★★★★★')).toBeInTheDocument();
    });

    it('should have an outer container with the provided id', () => {
        const { container } = render(
            <CollapsibleSection id="s22" num="2.2" title="X" weight="W">
                <p>body</p>
            </CollapsibleSection>
        );
        expect(container.querySelector('#s22')).not.toBeNull();
    });

    it('should expose the toggle as a button with aria-expanded', () => {
        render(
            <CollapsibleSection id="s21" num="2.1" title="Gmail" weight="W">
                <p>body</p>
            </CollapsibleSection>
        );
        const btn = screen.getByRole('button', { name: /Gmail/ });
        expect(btn).toHaveAttribute('aria-expanded', 'false');
        expect(btn).toHaveAttribute('aria-controls', 's21-body');
    });

    it('should respect defaultOpen=true and reflect aria-expanded=true', () => {
        render(
            <CollapsibleSection id="s21" num="2.1" title="Gmail" weight="W" defaultOpen>
                <p>body</p>
            </CollapsibleSection>
        );
        const btn = screen.getByRole('button', { name: /Gmail/ });
        expect(btn).toHaveAttribute('aria-expanded', 'true');
    });

    it('should toggle aria-expanded when the header is clicked', async () => {
        const user = userEvent.setup();
        render(
            <CollapsibleSection id="s21" num="2.1" title="Gmail" weight="W">
                <p>body content</p>
            </CollapsibleSection>
        );
        const btn = screen.getByRole('button', { name: /Gmail/ });
        expect(btn).toHaveAttribute('aria-expanded', 'false');

        await user.click(btn);
        expect(btn).toHaveAttribute('aria-expanded', 'true');

        await user.click(btn);
        expect(btn).toHaveAttribute('aria-expanded', 'false');
    });

    it('should toggle via Enter and Space keys', async () => {
        const user = userEvent.setup();
        render(
            <CollapsibleSection id="s21" num="2.1" title="Gmail" weight="W">
                <p>body</p>
            </CollapsibleSection>
        );
        const btn = screen.getByRole('button', { name: /Gmail/ });
        btn.focus();

        await user.keyboard('{Enter}');
        expect(btn).toHaveAttribute('aria-expanded', 'true');

        await user.keyboard(' ');
        expect(btn).toHaveAttribute('aria-expanded', 'false');
    });

    it('should add the open class to body element when expanded', () => {
        const { container } = render(
            <CollapsibleSection id="s21" num="2.1" title="Gmail" weight="W" defaultOpen>
                <p>body</p>
            </CollapsibleSection>
        );
        const body = container.querySelector('#s21-body');
        expect(body).not.toBeNull();
        expect(body!.classList.contains(styles.open!)).toBe(true);
    });

    it('should NOT add the open class to body element when collapsed', () => {
        const { container } = render(
            <CollapsibleSection id="s21" num="2.1" title="Gmail" weight="W">
                <p>body</p>
            </CollapsibleSection>
        );
        const body = container.querySelector('#s21-body');
        expect(body).not.toBeNull();
        expect(body!.classList.contains(styles.open!)).toBe(false);
    });
});
