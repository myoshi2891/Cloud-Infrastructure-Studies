import React from 'react';

interface TableComponentProps<T> {
    headers: string[];
    rows: T[];
    renderRow: (row: T, index: number) => React.ReactNode;
}

export function TableComponent<T>({ headers, rows, renderRow }: TableComponentProps<T>) {
    return (
        <div className="ctable-wrap">
            <table className="ctable">
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
