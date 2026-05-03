import React from 'react';

/**
 * Layout component that renders its `children` directly without adding wrappers or styling.
 *
 * @param children - Elements to be rendered inside the layout
 * @returns A React fragment containing `children`
 */
export default function CDLSection4Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
