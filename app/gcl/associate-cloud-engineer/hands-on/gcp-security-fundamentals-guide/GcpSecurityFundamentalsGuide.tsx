'use client';

import React from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';
import { NavBar } from './NavBar';

function Diagram({ id, label }: { id: string; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="diagram-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
            <div className="diagram-caption">{label}</div>
        </div>
    );
}

export function GcpSecurityFundamentalsGuide() {
    return (
        <div className="gcp-security-page">
            <NavBar />
            <header className="hero">
                <div className="eyebrow">Google Cloud Skill Boost 準拠教材</div>
                <h1>Google Cloud セキュリティ基礎<br />完全ガイド</h1>
                <p className="sub">
                    IAM / カスタムロール / サービスアカウント / VPC Peering / IAP / Cloud KMS / Private GKE
                </p>
            </header>

            <div className="wrap">
                <section style={{ marginTop: '10px' }}>
                    <h3 className="section-h">0. この教材の全体像</h3>
                    <Diagram id="diag-overview" label="Fig.0 — 3レイヤーで見る最小権限の原則の適用範囲" />
                </section>

                <section className="chapter" id="ch1">
                    <h2>Chapter 1: IAM の基本と最小権限</h2>
                    <Diagram id="diag-iam-hierarchy" label="Fig.1.1 — Google Cloud リソース階層と権限継承" />
                    <Diagram id="diag-iam-binding" label="Fig.1.2 — IAM Binding の概念図" />
                </section>

                <section className="chapter" id="ch2">
                    <h2>Chapter 2: カスタムロールの作成と管理</h2>
                    <Diagram id="diag-customrole-lifecycle" label="Fig.2.1 — カスタムロールのライフサイクル" />
                    <Diagram id="diag-customrole-perm" label="Fig.2.2 — ロール選定の判定フロー" />
                </section>

                <section className="chapter" id="ch3">
                    <h2>Chapter 3: サービスアカウントのセキュアな運用</h2>
                    <Diagram id="diag-sa-concept" label="Fig.3.1 — サービスアカウントの基本動作概念" />
                    <Diagram id="diag-sa-impersonation" label="Fig.3.2 — Service Account Impersonation のフロー" />
                </section>

                <section className="chapter" id="ch4">
                    <h2>Chapter 4: VPC Network Peering</h2>
                    <Diagram id="diag-peering-mesh" label="Fig.4.1 — VPC Network Peering のメッシュ接続" />
                </section>

                <section className="chapter" id="ch5">
                    <h2>Chapter 5: Identity-Aware Proxy</h2>
                    <Diagram id="diag-iap-flow" label="Fig.5.1 — Identity-Aware Proxy (HTTPS) の認証フロー" />
                    <Diagram id="diag-iap-tcp" label="Fig.5.2 — IAP TCP Forwarding による SSH 接続" />
                </section>

                <section className="chapter" id="ch6">
                    <h2>Chapter 6: Cloud KMS による鍵管理</h2>
                    <Diagram id="diag-kms-envelope" label="Fig.6.1 — 封筒暗号化 (Envelope Encryption) の仕組み" />
                    <Diagram id="diag-kms-rotation" label="Fig.6.2 — 暗号鍵のローテーション" />
                    <Diagram id="diag-kms-iam" label="Fig.6.3 — Cloud KMS の IAM アクセス制御" />
                </section>

                <section className="chapter" id="ch7">
                    <h2>Chapter 7: Private GKE クラスタの構築</h2>
                    <Diagram id="diag-gke-private" label="Fig.7.1 — Private GKE クラスタの構成図" />
                    <Diagram id="diag-gke-authorized" label="Fig.7.2 — Authorized Networks によるマスター保護" />
                </section>

                <section className="chapter" id="ch8">
                    <h2>Chapter 8: 統合演習</h2>
                    <Diagram id="diag-integration-arch" label="Fig.8.1 — 統合アーキテクチャ図" />
                </section>

                <section className="chapter" id="refs">
                    <h2>参考文献</h2>
                </section>
            </div>
        </div>
    );
}
