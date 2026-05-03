import React from 'react';
import { SectionCard, DiagramSVG, TableComponent } from '../index';
import { IAAS_FEATURES, IAAS_SERVICES, PAAS_FEATURES, PAAS_SERVICES, SAAS_FEATURES, SAAS_SERVICES } from '../../constants';
import styles from './Section4.module.css';

/**
 * セクション4: クラウドサービスモデル
 * IaaS / PaaS / SaaS の責任分界点について解説します。
 * @returns セクション4のReact要素
 */
export const Section4: React.FC = () => (
    <div id="s4" className={styles.sgap}>
        <div className={styles.secHead}>
            <div className={styles.secNum}>04</div>
            <div className={styles.secHeadTxt}>
                <h2 className={styles.secTitle}>クラウドサービスモデル</h2>
                <p className={styles.tdesc}>IaaS / PaaS / SaaS の責任分界点</p>
            </div>
        </div>

        <SectionCard
            id="cdl-4"
            idNumber="4.1"
            title="サービスモデルの全体像"
            description="クラウドサービスは「どこまで Google が管理してくれるか」によって 3 つに分類されます。"
        >
            <div className={styles.stitle}>責任の分担</div>
            <DiagramSVG viewBox="0 0 650 300" ariaLabel="サービスモデルごとの責任分界点">
                <text x="120" y="30" fill="currentColor" fontSize="12" fontWeight="bold">オンプレミス</text>
                <text x="240" y="30" fill="currentColor" fontSize="12" fontWeight="bold">IaaS</text>
                <text x="360" y="30" fill="currentColor" fontSize="12" fontWeight="bold">PaaS</text>
                <text x="480" y="30" fill="currentColor" fontSize="12" fontWeight="bold">SaaS</text>
                
                <g transform="translate(0, 50)" fontSize="12">
                    <text x="10" y="15" fill="currentColor">アプリ</text>
                    <rect x="100" y="0" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="120" y="15" fill="currentColor">自社</text>
                    <rect x="220" y="0" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="240" y="15" fill="currentColor">自社</text>
                    <rect x="340" y="0" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="360" y="15" fill="currentColor">自社</text>
                    <rect x="460" y="0" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="480" y="15" fill="var(--color-primary)">Google</text>
                    
                    <text x="10" y="40" fill="currentColor">データ</text>
                    <rect x="100" y="25" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="120" y="40" fill="currentColor">自社</text>
                    <rect x="220" y="25" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="240" y="40" fill="currentColor">自社</text>
                    <rect x="340" y="25" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="360" y="40" fill="currentColor">自社</text>
                    <rect x="460" y="25" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="480" y="40" fill="var(--color-primary)">Google</text>

                    <text x="10" y="65" fill="currentColor">ランタイム</text>
                    <rect x="100" y="50" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="120" y="65" fill="currentColor">自社</text>
                    <rect x="220" y="50" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="240" y="65" fill="currentColor">自社</text>
                    <rect x="340" y="50" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="360" y="65" fill="var(--color-primary)">Google</text>
                    <rect x="460" y="50" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="480" y="65" fill="var(--color-primary)">Google</text>

                    <text x="10" y="90" fill="currentColor">ミドルウェア</text>
                    <rect x="100" y="75" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="120" y="90" fill="currentColor">自社</text>
                    <rect x="220" y="75" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="240" y="90" fill="currentColor">自社</text>
                    <rect x="340" y="75" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="360" y="90" fill="var(--color-primary)">Google</text>
                    <rect x="460" y="75" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="480" y="90" fill="var(--color-primary)">Google</text>

                    <text x="10" y="115" fill="currentColor">OS</text>
                    <rect x="100" y="100" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="120" y="115" fill="currentColor">自社</text>
                    <rect x="220" y="100" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="240" y="115" fill="currentColor">自社</text>
                    <rect x="340" y="100" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="360" y="115" fill="var(--color-primary)">Google</text>
                    <rect x="460" y="100" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="480" y="115" fill="var(--color-primary)">Google</text>

                    <text x="10" y="140" fill="currentColor">仮想化</text>
                    <rect x="100" y="125" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="120" y="140" fill="currentColor">自社</text>
                    <rect x="220" y="125" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="240" y="140" fill="var(--color-primary)">Google</text>
                    <rect x="340" y="125" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="360" y="140" fill="var(--color-primary)">Google</text>
                    <rect x="460" y="125" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="480" y="140" fill="var(--color-primary)">Google</text>

                    <text x="10" y="165" fill="currentColor">インフラ</text>
                    <rect x="100" y="150" width="100" height="20" fill="var(--color-muted)" opacity="0.3" /><text x="120" y="165" fill="currentColor">自社</text>
                    <rect x="220" y="150" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="240" y="165" fill="var(--color-primary)">Google</text>
                    <rect x="340" y="150" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="360" y="165" fill="var(--color-primary)">Google</text>
                    <rect x="460" y="150" width="100" height="20" fill="var(--color-primary)" opacity="0.2" /><text x="480" y="165" fill="var(--color-primary)">Google</text>
                    
                    <text x="10" y="200" fill="var(--color-primary)" fontWeight="bold">ユーザー管理負荷</text>
                    <text x="120" y="200" fill="currentColor">最大</text>
                    <text x="240" y="200" fill="currentColor">中</text>
                    <text x="360" y="200" fill="currentColor">小</text>
                    <text x="480" y="200" fill="currentColor">最小</text>
                </g>
            </DiagramSVG>

            {[
                {
                    title: "4.2 IaaS（Infrastructure as a Service）",
                    definition: "仮想マシン・ストレージ・ネットワークなどの",
                    boldPart: "インフラ基盤をサービスとして提供",
                    tail: "するモデル。ユーザーは OS・ミドルウェア・アプリを自分で管理します。",
                    features: IAAS_FEATURES,
                    services: IAAS_SERVICES,
                },
                {
                    title: "4.3 PaaS（Platform as a Service）",
                    definition: "アプリケーションの開発・実行・管理に必要な",
                    boldPart: "プラットフォーム（実行環境）をサービスとして提供",
                    tail: "するモデル。ユーザーはアプリとデータだけに集中できます。",
                    features: PAAS_FEATURES,
                    services: PAAS_SERVICES,
                },
                {
                    title: "4.4 SaaS（Software as a Service）",
                    definition: "完全に構築されたソフトウェアを",
                    boldPart: "サービスとして提供",
                    tail: "するモデル。インターネット接続とブラウザがあれば、インストールなしに即座に使えます。",
                    features: SAAS_FEATURES,
                    services: SAAS_SERVICES,
                }
            ].map((section) => (
                <React.Fragment key={section.title}>
                    <h3 className={styles.stitle}>{section.title}</h3>
                    <p className={styles.tdesc}><strong>定義</strong>: {section.definition}<strong>{section.boldPart}</strong>{section.tail}</p>
                    <h3 className={styles.stitle}>特徴とメリット・デメリット</h3>
                    <TableComponent getRowKey={(row) => row.item}
                        headers={['項目', '内容']}
                        rows={section.features}
                        renderRow={(row) => (
                            <tr key={row.item}>
                                <td><strong>{row.item}</strong></td>
                                <td>{row.content}</td>
                            </tr>
                        )}
                    />
                    <h3 className={styles.stitle}>Google Cloud でのサービス例</h3>
                    <TableComponent getRowKey={(row) => row.service}
                        headers={['サービス', '説明']}
                        rows={section.services}
                        renderRow={(row) => (
                            <tr key={row.service}>
                                <td><strong>{row.service}</strong></td>
                                <td>{row.description}</td>
                            </tr>
                        )}
                    />
                </React.Fragment>
            ))}
            <p className={styles.tdesc}>📎 <strong>参照</strong>: Google Cloud のサービスモデル解説<br />
            <a href="https://cloud.google.com/learn/what-is-iaas" target="_blank" rel="noreferrer">https://cloud.google.com/learn/what-is-iaas</a><br />
            <a href="https://cloud.google.com/learn/what-is-paas" target="_blank" rel="noreferrer">https://cloud.google.com/learn/what-is-paas</a><br />
            <a href="https://cloud.google.com/learn/what-is-saas" target="_blank" rel="noreferrer">https://cloud.google.com/learn/what-is-saas</a></p>
        </SectionCard>
        </div>
        );
