import React from 'react';
import styles from './TableComponent.module.css';

interface TableComponentProps<T> {
    headers: readonly string[];
    rows: readonly T[];
    renderRow: (row: T, index: number) => React.ReactNode;
    getRowKey: (row: T, index: number) => React.Key;
}

/**
 * Renders a table using the given column headers and row data.
 *
 * @param headers - Ordered list of column header labels rendered into the table head
 * @param rows - Array of row data items rendered into the table body
 * @param renderRow - Called for each row with `(row, index)` and should return the React node for that row
 * @param getRowKey - Called for each row to provide a unique React key
 * @returns The table wrapped in a container `div`
 */
export function TableComponent<T>({ headers, rows, renderRow, getRowKey }: TableComponentProps<T>) {
    return (
        <div className={styles.tableWrap}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {headers.map((h) => (
                            <th key={h} scope="col">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <React.Fragment key={getRowKey(row, i)}>
                            {renderRow(row, i)}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
