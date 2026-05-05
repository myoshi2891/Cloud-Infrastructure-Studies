import React from 'react';

/**
 * Renders the provided children directly without adding wrappers or styling.
 *
 * @param children - Elements to render inside the layout
 * @returns A JSX fragment containing `children`
 */
export default function CDLSection4Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
