'use client';

import React from 'react';
import { NAV_ITEMS } from './constants';

export default function NavBar() {
    return (
        <nav className="sidebar" aria-label="ガイド目次">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 px-2">
                目次ガイド
            </div>
            <ul className="space-y-1 text-sm">
                {NAV_ITEMS.map((item) => (
                    <li key={item.id}>
                        <a
                            href={`#${item.id}`}
                            className="block px-2 py-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                        >
                            {item.step && (
                                <span className="inline-block text-xs font-bold text-sky-400 mr-1.5">
                                    {item.step}
                                </span>
                            )}
                            <span>{item.title}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
