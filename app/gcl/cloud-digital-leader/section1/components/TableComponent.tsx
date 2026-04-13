import React from 'react';
import styles from './TableComponent.module.css';

interface TableComponentProps<T> {
    headers: string[];
    rows: T[];
    renderRow: (row: T, index: number) => React.ReactNode;
}

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
