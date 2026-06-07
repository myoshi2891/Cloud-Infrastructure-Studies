import React from 'react';
import NavBar from './NavBar';
import './page.css';

/**
 * Main page component for GCP Associate Cloud Engineer Complete Advanced Guide.
 */
export default function CompleteAdvancedGuidePage() {
    return (
        <div className="complete-guide-page">
            <NavBar />
            <main className="main">
                <h1>Associate Cloud Engineer 完全試験対策ガイド</h1>
                <p>DaemonSet は GKE Autopilot でサポートされるが、リソース要求やセキュリティポリシー等によりカスタム DaemonSet のデプロイは制限され得る（例：⚠️ 制約あり — ポリシー準拠が必要）</p>
                <p>最大 1Gbps（Direct VPC 送出のインスタンスあたり上限）</p>
            </main>
        </div>
    );
}
