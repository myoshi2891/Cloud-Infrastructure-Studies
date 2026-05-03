import React from 'react';
import styles from './TableComponent.module.css';

interface TableComponentProps<T> {
    headers: string[];
    rows: T[];
    renderRow: (row: T, index: number) => React.ReactNode;
}

/**
 * Renders a table using the given column headers and row data.
 *
 * @param headers - Ordered list of column header labels rendered into the table head
 * @param rows - Array of row data items rendered into the table body
 * @param renderRow - Called for each row with `(row, index)` and should return the React node for that row; apply keys on the returned node if needed
 * @returns The table wrapped in a container `div`
 */
export function TableComponent<T>({ headers, rows, renderRow }: TableComponentProps<T>) {
    return (
        <div className={styles.tableWrap}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {headers.map((h, i) => (
                            <th key={i} scope="col">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>{rows.map((row, i) => renderRow(row, i))}</tbody>
            </table>
        </div>
    );
}
