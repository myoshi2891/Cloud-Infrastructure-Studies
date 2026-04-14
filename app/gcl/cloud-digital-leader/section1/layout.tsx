import './section1.css';

/**
 * Renders the provided children unchanged for the Section1 layout.
 *
 * @param children - The React node(s) to render within this layout
 * @returns The same `children` node(s) passed to the component
 */
export default function Section1Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}