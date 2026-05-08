import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Section 6: Scaling with Google Cloud Operations | Cloud Digital Leader',
    description: 'Cloud Digital Leader 試験 Section 6 完全解説 — Scaling with Google Cloud Operations',
};

/**
 * Renders the layout for the Cloud Digital Leader Section 6 page.
 *
 * @param props.children - The main content of the section page
 * @returns A JSX element representing the layout
 */
export default function Section6Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
