import type { Metadata } from 'next';
import Section2Guide from './Section2Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'GCP ACE Section 2 — Planning & Implementing a Cloud Solution',
    description: 'Google Cloud Associate Cloud Engineer Section 2 Study Guide',
};

/**
 * Renders the Section 2 study guide page.
 *
 * @returns A JSX element that renders the `Section2Guide` component.
 */
export default function Page() {
    return <Section2Guide />;
}
