'use client';

import React from 'react';

export default function NavBar() {
    return (
        <nav className="sidebar" aria-label="ACE Section 2 完全ガイドナビゲーション">
            <div className="sidebar-header">
                <div className="sidebar-badge">ACE 試験対策</div>
                <div className="sidebar-title">Section 2: Planning & Implementing</div>
            </div>
            <div className="nav-section">
                <a href="#s21" className="nav-item">2.1</a>
                <a href="#s21-disk" className="nav-item">HD</a>
                <a href="#s21-mig" className="nav-item">MIG</a>
                <a href="#s21-oslogin" className="nav-item">OS</a>
                <a href="#s21-spot" className="nav-item">Spt</a>
                <a href="#s21-gke" className="nav-item">GKE</a>
                <a href="#s21-serverless" className="nav-item">Run</a>
                <a href="#s21-gpu" className="nav-item">GPU</a>
                <a href="#s21-agent" className="nav-item">AI</a>
                <a href="#s22-db" className="nav-item">DB</a>
                <a href="#s22-storage" className="nav-item">GCS</a>
                <a href="#s22-load" className="nav-item">ETL</a>
                <a href="#s23-vpc" className="nav-item">VPC</a>
                <a href="#s23-fw" className="nav-item">FW</a>
                <a href="#s23-conn" className="nav-item">Cnx</a>
                <a href="#s23-lb" className="nav-item">LB</a>
                <a href="#s23-tier" className="nav-item">Tier</a>
                <a href="#s24-iac" className="nav-item">IaC</a>
                <a href="#s24-ai" className="nav-item">AI</a>
                <a href="#summary" className="nav-item">Sum</a>
                <a href="#checklist" className="nav-item">✓</a>
                <a href="#refs" className="nav-item">🔗</a>
            </div>
        </nav>
    );
}
