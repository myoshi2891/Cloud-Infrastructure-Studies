import React from 'react';
import styles from './TableComponent.module.css';

interface TableComponentProps<T> {
    headers: string[];
    rows: T[];
    renderRow: (row: T, index: number) => React.ReactNode;
}

/**
 * Render a table from provided column headers and row data.
 *
 * @param headers - Ordered list of column header labels to render into the table head
 * @param rows - Array of row data items to render into the table body
 * @param renderRow - Callback invoked for each row with `(row, index)` that returns a React node representing that row; any React keys should be applied to the returned node if needed
 * @returns A React element representing the rendered table
 */
export function TableComponent<T>({ headers, rows, renderRow }: TableComponentProps<T>) {
    return (
        <div className={styles.tableWrap}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {headers.map((h, i) => (
                            <th key={i}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>{rows.map((row, i) => renderRow(row, i))}</tbody>
            </table>
        </div>
    );
}
