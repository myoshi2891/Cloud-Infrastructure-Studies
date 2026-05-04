import React from 'react';

/**
 * Layout component that renders its `children` directly without adding wrappers or styling.
 *
 * @param {React.ReactNode} children - Elements to be rendered inside the layout
 * @returns {JSX.Element} A React fragment containing `children`
 */
export default function CDLSection4Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
