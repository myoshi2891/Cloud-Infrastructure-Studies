'use client';

import React from 'react';

export function NavBar() {
    return (
        <nav className="nav">
            <div className="nav-inner">
                <div className="nav-brand">GCP SECURITY FUNDAMENTALS</div>
                <div className="nav-links">
                    <a href="#ch1">01 IAM</a>
                    <a href="#ch2">02 Custom Roles</a>
                    <a href="#ch3">03 SA</a>
                    <a href="#ch4">04 Peering</a>
                    <a href="#ch5">05 IAP</a>
                    <a href="#ch6">06 KMS</a>
                    <a href="#ch7">07 GKE</a>
                    <a href="#ch8">08 統合演習</a>
                    <a href="#refs">参考文献</a>
                </div>
            </div>
        </nav>
    );
}
