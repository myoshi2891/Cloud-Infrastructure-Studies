'use client';

import React, { useState } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import NavBar from './NavBar';
import { DIAGRAMS } from './constants';

function Diagram({ id, label }: { id: string; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap my-6 overflow-x-auto">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
        </div>
    );
}

export default function CcnaNetworkFundamentalsGuide() {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="ccna-network-fundamentals-page">
            <NavBar />
            <main className="main">
                {/* HERO HEADER */}
                <header className="mb-10 pb-6 border-b border-slate-700/60">
                    <div className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-3">
                        CCNA 200-301 Focus
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
                        Network Fundamentals ドメイン徹底解説
                    </h1>
                    <p className="text-slate-300 text-lg leading-relaxed max-w-4xl">
                        CCNA試験における基礎であり最重要分野「6.0 Network Fundamentals（ネットワークの基礎）」の完全ガイド。MACアドレス・VLAN・IPアドレス・ポート番号から、3つのPlane、各種IPサービス、接続トラブル診断まで体系的に解説します。
                    </p>
                </header>

                {/* OVERVIEW */}
                <section id="overview" className="section-block">
                    <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-3">
                        はじめに：このガイドの位置づけ
                    </h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        本ガイドは、シスコ認定試験「CCNA 200-301」の試験シラバスにおける「6.0 Network Fundamentals」の全項目（6.1〜6.9）を網羅した解説記事です。
                    </p>

                    <div className="overflow-x-auto mb-6">
                        <table className="w-full text-left border-collapse border border-slate-700 text-sm">
                            <thead className="bg-slate-800 text-slate-200">
                                <tr>
                                    <th scope="col" className="p-3 border border-slate-700">ドメイン番号</th>
                                    <th scope="col" className="p-3 border border-slate-700">ドメイン名</th>
                                    <th scope="col" className="p-3 border border-slate-700">出題比率</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 text-slate-300">
                                <tr>
                                    <td className="p-3 border border-slate-700">1.0</td>
                                    <td className="p-3 border border-slate-700">Software Development and Design</td>
                                    <td className="p-3 border border-slate-700">15%</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700">2.0</td>
                                    <td className="p-3 border border-slate-700">Understanding and Using APIs</td>
                                    <td className="p-3 border border-slate-700">20%</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700">3.0</td>
                                    <td className="p-3 border border-slate-700">Cisco Platforms and Development</td>
                                    <td className="p-3 border border-slate-700">15%</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700">4.0</td>
                                    <td className="p-3 border border-slate-700">Application Deployment and Security</td>
                                    <td className="p-3 border border-slate-700">15%</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700">5.0</td>
                                    <td className="p-3 border border-slate-700">Infrastructure and Automation</td>
                                    <td className="p-3 border border-slate-700">20%</td>
                                </tr>
                                <tr className="bg-blue-950/40 font-semibold text-blue-200">
                                    <td className="p-3 border border-slate-700">6.0</td>
                                    <td className="p-3 border border-slate-700">Network Fundamentals</td>
                                    <td className="p-3 border border-slate-700">15%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* STEP 0 */}
                <section id="step0" className="section-block">
                    <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-3">
                        Step 0 Network Fundamentalsドメインの全体像
                    </h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        Network Fundamentalsドメインは、ネットワークを構成する物理機器、論理構造、プロトコル、各種サービス、そしてトラブルシューティングの基礎知識を対象としています。
                    </p>

                    <Diagram id="diagram-0" label="Network Fundamentals ドメインの全体像フローチャート" />

                    <div className="overflow-x-auto my-6">
                        <table className="w-full text-left border-collapse border border-slate-700 text-sm">
                            <thead className="bg-slate-800 text-slate-200">
                                <tr>
                                    <th scope="col" className="p-3 border border-slate-700">項番</th>
                                    <th scope="col" className="p-3 border border-slate-700">学習内容</th>
                                    <th scope="col" className="p-3 border border-slate-700">該当ステップ</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 text-slate-300">
                                <tr>
                                    <td className="p-3 border border-slate-700">6.1</td>
                                    <td className="p-3 border border-slate-700">MACアドレスとVLANの目的・使い方</td>
                                    <td className="p-3 border border-slate-700">Step 1</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700">6.2</td>
                                    <td className="p-3 border border-slate-700">IPアドレス、ルート、サブネットマスク/プレフィックス、ゲートウェイ</td>
                                    <td className="p-3 border border-slate-700">Step 2</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700">6.3</td>
                                    <td className="p-3 border border-slate-700">スイッチ・ルーター・ファイアウォール・ロードバランサーなど機器の機能</td>
                                    <td className="p-3 border border-slate-700">Step 3</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700">6.4</td>
                                    <td className="p-3 border border-slate-700">基本的なネットワークトポロジ図の解読</td>
                                    <td className="p-3 border border-slate-700">Step 4</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700">6.5</td>
                                    <td className="p-3 border border-slate-700">ネットワーク機器のManagement/Data/Control Planeの機能</td>
                                    <td className="p-3 border border-slate-700">Step 5</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700">6.6</td>
                                    <td className="p-3 border border-slate-700">DHCP・DNS・NAT・SNMP・NTPというIPサービスの機能</td>
                                    <td className="p-3 border border-slate-700">Step 6</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700">6.7</td>
                                    <td className="p-3 border border-slate-700">SSH・Telnet・HTTP・HTTPS・NETCONFなど代表的なポート番号</td>
                                    <td className="p-3 border border-slate-700">Step 7</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700">6.8</td>
                                    <td className="p-3 border border-slate-700">NAT不良・ポート遮断・プロキシ・VPNに起因する接続トラブルの診断</td>
                                    <td className="p-3 border border-slate-700">Step 8</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700">6.9</td>
                                    <td className="p-3 border border-slate-700">ネットワークの制約がアプリケーションに与える影響</td>
                                    <td className="p-3 border border-slate-700">Step 9</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* STEP 1 */}
                <section id="step1" className="section-block">
                    <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-3">
                        Step 1 MACアドレスとVLAN（6.1）
                    </h2>
                    
                    <h3 className="text-xl font-semibold text-slate-100 mt-6 mb-3">MACアドレスとは</h3>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        MACアドレス（Media Access Control Address）は、ネットワークインターフェースカード（NIC）に割り当てられた48ビット（6バイト）の物理アドレスです。L2（データリンク層）で動作し、同一ネットワークセグメント内での通信相手を識別するために使用されます。
                    </p>

                    <div className="overflow-x-auto my-4">
                        <table className="w-full text-left border-collapse border border-slate-700 text-sm">
                            <thead className="bg-slate-800 text-slate-200">
                                <tr>
                                    <th scope="col" className="p-3 border border-slate-700">構成要素</th>
                                    <th scope="col" className="p-3 border border-slate-700">ビット数</th>
                                    <th scope="col" className="p-3 border border-slate-700">説明</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 text-slate-300">
                                <tr>
                                    <td className="p-3 border border-slate-700">OUI（Organizationally Unique Identifier）</td>
                                    <td className="p-3 border border-slate-700">上位24ビット</td>
                                    <td className="p-3 border border-slate-700">製造ベンダーを識別する部分（IEEEが割り当て）</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700">デバイス固有部分</td>
                                    <td className="p-3 border border-slate-700">下位24ビット</td>
                                    <td className="p-3 border border-slate-700">ベンダー内で一意になるように製造時に割り当てられる部分</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-100 mt-6 mb-3">VLANとは</h3>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        VLAN（Virtual Local Area Network）は、物理的なスイッチの接続に関わらず、論理的にネットワーク（ブロードキャストドメイン）を分割する技術です。セキュリティ向上、トラフィック制限、柔軟なネットワーク構築に役立ちます。
                    </p>

                    <Diagram id="diagram-1" label="L2スイッチとVLANによるネットワーク分割の図解" />
                </section>

                {/* STEP 2 */}
                <section id="step2" className="section-block">
                    <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-3">
                        Step 2 IPアドレス・ルート・サブネットマスク/プレフィックス・ゲートウェイ（6.2）
                    </h2>

                    <h3 className="text-xl font-semibold text-slate-100 mt-6 mb-3">IPアドレスの基本</h3>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        IPv4アドレスは32ビット（4バイト）の論理アドレスであり、8ビットずつ4つのオクテットに区切って10進数表記（例：192.168.1.1）します。L3（ネットワーク層）で動作し、異なるネットワーク間でのパケットルーティングに使用されます。
                    </p>

                    <h3 className="text-xl font-semibold text-slate-100 mt-6 mb-3">サブネットマスクとプレフィックス表記</h3>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        IPアドレスのうち、どこまでが「ネットワーク部」でどこからが「ホスト部」かを示すためにサブネットマスク（または/24のようなCIDR表記・プレフィックス表記）を使用します。
                    </p>

                    <div className="overflow-x-auto my-4">
                        <table className="w-full text-left border-collapse border border-slate-700 text-sm">
                            <thead className="bg-slate-800 text-slate-200">
                                <tr>
                                    <th scope="col" className="p-3 border border-slate-700">CIDR表記</th>
                                    <th scope="col" className="p-3 border border-slate-700">サブネットマスク</th>
                                    <th scope="col" className="p-3 border border-slate-700">ネットワーク部のビット数</th>
                                    <th scope="col" className="p-3 border border-slate-700">1ネットワークあたりの利用可能ホスト数（目安）</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 text-slate-300">
                                <tr>
                                    <td className="p-3 border border-slate-700 font-mono text-blue-300">/24</td>
                                    <td className="p-3 border border-slate-700">255.255.255.0</td>
                                    <td className="p-3 border border-slate-700">24ビット</td>
                                    <td className="p-3 border border-slate-700">254台</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-mono text-blue-300">/25</td>
                                    <td className="p-3 border border-slate-700">255.255.255.128</td>
                                    <td className="p-3 border border-slate-700">25ビット</td>
                                    <td className="p-3 border border-slate-700">126台</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-mono text-blue-300">/26</td>
                                    <td className="p-3 border border-slate-700">255.255.255.192</td>
                                    <td className="p-3 border border-slate-700">26ビット</td>
                                    <td className="p-3 border border-slate-700">62台</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-mono text-blue-300">/16</td>
                                    <td className="p-3 border border-slate-700">255.255.0.0</td>
                                    <td className="p-3 border border-slate-700">16ビット</td>
                                    <td className="p-3 border border-slate-700">約65,534台</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-mono text-blue-300">/8</td>
                                    <td className="p-3 border border-slate-700">255.0.0.0</td>
                                    <td className="p-3 border border-slate-700">8ビット</td>
                                    <td className="p-3 border border-slate-700">約1,677万台</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-100 mt-6 mb-3">プライベートIPアドレス範囲</h3>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        RFC 1918 で規定されているプライベートIPアドレス範囲は以下の通りです。インターネット上で直接ルーティングすることはできません。
                    </p>

                    <div className="overflow-x-auto my-4">
                        <table className="w-full text-left border-collapse border border-slate-700 text-sm">
                            <thead className="bg-slate-800 text-slate-200">
                                <tr>
                                    <th scope="col" className="p-3 border border-slate-700">範囲</th>
                                    <th scope="col" className="p-3 border border-slate-700">CIDR表記</th>
                                    <th scope="col" className="p-3 border border-slate-700">主な用途</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 text-slate-300">
                                <tr>
                                    <td className="p-3 border border-slate-700 font-mono">10.0.0.0 〜 10.255.255.255</td>
                                    <td className="p-3 border border-slate-700 font-mono text-blue-300">10.0.0.0/8</td>
                                    <td className="p-3 border border-slate-700">大規模企業ネットワーク</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-mono">172.16.0.0 〜 172.31.255.255</td>
                                    <td className="p-3 border border-slate-700 font-mono text-blue-300">172.16.0.0/12</td>
                                    <td className="p-3 border border-slate-700">中規模ネットワーク</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-mono">192.168.0.0 〜 192.168.255.255</td>
                                    <td className="p-3 border border-slate-700 font-mono text-blue-300">192.168.0.0/16</td>
                                    <td className="p-3 border border-slate-700">家庭用・小規模オフィス</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-100 mt-6 mb-3">デフォルトゲートウェイとルート</h3>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        同一サブネット外の宛先（外部ネットワーク）にパケットを送信する際、端末が最初に送る宛先ルーターのIPアドレスを「デフォルトゲートウェイ」と呼びます。
                    </p>

                    <Diagram id="diagram-2" label="デフォルトゲートウェイとルーティングの流れ" />
                </section>

                {/* STEP 3 */}
                <section id="step3" className="section-block">
                    <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-3">
                        Step 3 ネットワーク機器の役割（6.3）
                    </h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        ネットワークを構築する主要な機器と、それぞれの動作レイヤー（OSI参照モデル）および役割を整理します。
                    </p>

                    <div className="overflow-x-auto my-4">
                        <table className="w-full text-left border-collapse border border-slate-700 text-sm mb-6">
                            <thead className="bg-slate-800 text-slate-200">
                                <tr>
                                    <th scope="col" className="p-3 border border-slate-700">レイヤー</th>
                                    <th scope="col" className="p-3 border border-slate-700">名称</th>
                                    <th scope="col" className="p-3 border border-slate-700">関連する技術・機器の例</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 text-slate-300">
                                <tr>
                                    <td className="p-3 border border-slate-700 font-bold text-blue-300">L7</td>
                                    <td className="p-3 border border-slate-700">アプリケーション層</td>
                                    <td className="p-3 border border-slate-700">HTTP、DNS、ロードバランサーのURLベース振り分け</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-bold text-blue-300">L4</td>
                                    <td className="p-3 border border-slate-700">トランスポート層</td>
                                    <td className="p-3 border border-slate-700">TCP/UDP、ポート番号、L4ロードバランシング</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-bold text-blue-300">L3</td>
                                    <td className="p-3 border border-slate-700">ネットワーク層</td>
                                    <td className="p-3 border border-slate-700">IPアドレス、ルーティング、ルーター</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-bold text-blue-300">L2</td>
                                    <td className="p-3 border border-slate-700">データリンク層</td>
                                    <td className="p-3 border border-slate-700">MACアドレス、VLAN、スイッチ</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-bold text-blue-300">L1</td>
                                    <td className="p-3 border border-slate-700">物理層</td>
                                    <td className="p-3 border border-slate-700">ケーブル、光ファイバー、物理ポート</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-100 mt-6 mb-3">代表的なネットワーク機器</h3>

                    <div className="overflow-x-auto my-4">
                        <table className="w-full text-left border-collapse border border-slate-700 text-sm">
                            <thead className="bg-slate-800 text-slate-200">
                                <tr>
                                    <th scope="col" className="p-3 border border-slate-700">機器</th>
                                    <th scope="col" className="p-3 border border-slate-700">主なレイヤー</th>
                                    <th scope="col" className="p-3 border border-slate-700">役割</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 text-slate-300">
                                <tr>
                                    <td className="p-3 border border-slate-700 font-semibold">スイッチ（L2スイッチ）</td>
                                    <td className="p-3 border border-slate-700">L2</td>
                                    <td className="p-3 border border-slate-700">MACアドレステーブルをもとにフレームを転送。VLANによるセグメント分割を行う</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-semibold">ルーター</td>
                                    <td className="p-3 border border-slate-700">L3</td>
                                    <td className="p-3 border border-slate-700">IPアドレス・ルーティングテーブルをもとに、異なるネットワーク間でパケットを転送する</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-semibold">ファイアウォール</td>
                                    <td className="p-3 border border-slate-700">L3〜L7</td>
                                    <td className="p-3 border border-slate-700">通信のフィルタリング、アクセス制御、脅威検知・防御を行う</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-semibold">ロードバランサー</td>
                                    <td className="p-3 border border-slate-700">L4〜L7</td>
                                    <td className="p-3 border border-slate-700">1つの仮想IP（VIP）宛ての通信を複数のサーバーへ振り分け、可用性と拡張性を高める</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* STEP 4 */}
                <section id="step4" className="section-block">
                    <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-3">
                        Step 4 ネットワークトポロジ図の読み方（6.4）
                    </h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        実際の開発・運用現場や試験では、各種機器がどのように接続されているかを示すトポロジ図を解読するスキルが求められます。
                    </p>

                    <Diagram id="diagram-3" label="各層のネットワーク機器とロードバランサー配置図" />
                </section>

                {/* STEP 5 */}
                <section id="step5" className="section-block">
                    <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-3">
                        Step 5 Management / Data / Control Plane（6.5）
                    </h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        ネットワーク機器内部の機能を役割ごとに3つの「プレーン（Plane）」に分類して理解することは、ネットワーク自動化やSDN（Software-Defined Networking）の基礎となります。
                    </p>

                    <Diagram id="diagram-4" label="Management, Control, Data Planeの3層概念図" />

                    <div className="overflow-x-auto my-6">
                        <table className="w-full text-left border-collapse border border-slate-700 text-sm">
                            <thead className="bg-slate-800 text-slate-200">
                                <tr>
                                    <th scope="col" className="p-3 border border-slate-700">プレーン</th>
                                    <th scope="col" className="p-3 border border-slate-700">役割</th>
                                    <th scope="col" className="p-3 border border-slate-700">具体例</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 text-slate-300">
                                <tr>
                                    <td className="p-3 border border-slate-700 font-semibold text-blue-300">Management Plane（管理プレーン）</td>
                                    <td className="p-3 border border-slate-700">機器の設定・監視・運用管理を行う</td>
                                    <td className="p-3 border border-slate-700">SSH、SNMP、NETCONF/RESTCONFによるアクセス</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-semibold text-blue-300">Control Plane（制御プレーン）</td>
                                    <td className="p-3 border border-slate-700">経路情報や制御情報の学習・交換を行う（いわば機器の「頭脳」）</td>
                                    <td className="p-3 border border-slate-700">OSPFやBGPなどのルーティングプロトコル、STP、MACアドレステーブルの学習</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-semibold text-blue-300">Data Plane（データプレーン）</td>
                                    <td className="p-3 border border-slate-700">実際のユーザートラフィック（パケット/フレーム）を転送する（いわば機器の「手足」）</td>
                                    <td className="p-3 border border-slate-700">受信したパケットの実転送処理（フォワーディング）</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* STEP 6 */}
                <section id="step6" className="section-block">
                    <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-3">
                        Step 6 IPサービス（DHCP・DNS・NAT・SNMP・NTP）（6.6）
                    </h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        アプリケーションや機器が正常に通信・運用を行うために不可欠な5つの主要IPサービスを解説します。
                    </p>

                    <div className="overflow-x-auto my-6">
                        <table className="w-full text-left border-collapse border border-slate-700 text-sm">
                            <thead className="bg-slate-800 text-slate-200">
                                <tr>
                                    <th scope="col" className="p-3 border border-slate-700">サービス</th>
                                    <th scope="col" className="p-3 border border-slate-700">正式名称</th>
                                    <th scope="col" className="p-3 border border-slate-700">主な役割</th>
                                    <th scope="col" className="p-3 border border-slate-700">主なポート</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 text-slate-300">
                                <tr>
                                    <td className="p-3 border border-slate-700 font-bold text-blue-300">DHCP</td>
                                    <td className="p-3 border border-slate-700">Dynamic Host Configuration Protocol</td>
                                    <td className="p-3 border border-slate-700">IPアドレス等をクライアントへ自動的に割り当てる</td>
                                    <td className="p-3 border border-slate-700 font-mono">UDP 67（サーバー）／68（クライアント）</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-bold text-blue-300">DNS</td>
                                    <td className="p-3 border border-slate-700">Domain Name System</td>
                                    <td className="p-3 border border-slate-700">ドメイン名とIPアドレスを相互に変換する（名前解決）</td>
                                    <td className="p-3 border border-slate-700 font-mono">UDP/TCP 53</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-bold text-blue-300">NAT</td>
                                    <td className="p-3 border border-slate-700">Network Address Translation</td>
                                    <td className="p-3 border border-slate-700">プライベートIPアドレスとグローバルIPアドレスを変換する</td>
                                    <td className="p-3 border border-slate-700">ポートではなくアドレス変換の技術</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-bold text-blue-300">SNMP</td>
                                    <td className="p-3 border border-slate-700">Simple Network Management Protocol</td>
                                    <td className="p-3 border border-slate-700">機器の状態監視、情報収集、障害の自発通知を行う</td>
                                    <td className="p-3 border border-slate-700 font-mono">UDP 161（ポーリング）／162（Trap）</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-bold text-blue-300">NTP</td>
                                    <td className="p-3 border border-slate-700">Network Time Protocol</td>
                                    <td className="p-3 border border-slate-700">ネットワーク機器間で時刻を同期する</td>
                                    <td className="p-3 border border-slate-700 font-mono">UDP 123</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-100 mt-6 mb-3">DHCP：IPアドレスの自動割り当て</h3>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        DHCPは「DORAプロトコル（Discover, Offer, Request, ACK）」と呼ばれる4ステップでIPアドレス・サブネットマスク・デフォルトゲートウェイ・DNSサーバー情報を自動取得します。
                    </p>
                    <Diagram id="diagram-5" label="DHCPシーケンス（Discover, Offer, Request, ACK）" />

                    <h3 className="text-xl font-semibold text-slate-100 mt-6 mb-3">DNS：名前解決の流れ</h3>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        人間が扱いやすいホスト名（例：www.example.com）を、コンピュータが処理できるIPアドレスへ変換します。
                    </p>
                    <Diagram id="diagram-6" label="DNS名前解決シーケンス" />

                    <h3 className="text-xl font-semibold text-slate-100 mt-6 mb-3">NAT：アドレス変換の考え方</h3>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        社内プライベートIP端末がインターネットへアクセスする際、ルーターやファイアウォールでグローバルIPアドレスへ書き換えます。
                    </p>
                    <Diagram id="diagram-7" label="NAT（アドレス変換）の動作概念図" />

                    <h3 className="text-xl font-semibold text-slate-100 mt-6 mb-3">SNMP：機器の監視</h3>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        SNMPはNMS（ネットワーク管理システム）からのGetリクエスト（ポーリング）と、機器側で異常発生時に送出するTrap通知（プッシュ型）の2つの方式で監視を実施します。
                    </p>
                    <Diagram id="diagram-8" label="SNMPのポーリングとTrap通知フロー" />

                    <h3 className="text-xl font-semibold text-slate-100 mt-6 mb-3">NTP：時刻同期の階層構造</h3>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        ログのタイムスタンプや証明書の検証を正しく行うため、NTPによる高精度な時刻同期が不可欠です。Stratum（ストレータム）と呼ばれる階層値（0〜15）で精度を示します。
                    </p>
                    <Diagram id="diagram-9" label="NTPのStratum（階層構造）の図解" />
                </section>

                {/* STEP 7 */}
                <section id="step7" className="section-block">
                    <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-3">
                        Step 7 プロトコルとポート番号（6.7）
                    </h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        トランスポート層（L4）でアプリケーションを識別するための主要プロトコルとポート番号の対応表です。試験・実務で即答できることが求められます。
                    </p>

                    <div className="overflow-x-auto my-6">
                        <table className="w-full text-left border-collapse border border-slate-700 text-sm">
                            <thead className="bg-slate-800 text-slate-200">
                                <tr>
                                    <th scope="col" className="p-3 border border-slate-700">プロトコル</th>
                                    <th scope="col" className="p-3 border border-slate-700">ポート番号</th>
                                    <th scope="col" className="p-3 border border-slate-700">トランスポート</th>
                                    <th scope="col" className="p-3 border border-slate-700">主な用途</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 text-slate-300">
                                <tr>
                                    <td className="p-3 border border-slate-700 font-bold text-blue-300">SSH</td>
                                    <td className="p-3 border border-slate-700 font-mono text-blue-200">22</td>
                                    <td className="p-3 border border-slate-700">TCP</td>
                                    <td className="p-3 border border-slate-700">機器へのセキュアなリモートログイン・管理プレーンアクセス</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-bold text-blue-300">Telnet</td>
                                    <td className="p-3 border border-slate-700 font-mono text-blue-200">23</td>
                                    <td className="p-3 border border-slate-700">TCP</td>
                                    <td className="p-3 border border-slate-700">暗号化されないリモートログイン（現在は非推奨）</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-bold text-blue-300">HTTP</td>
                                    <td className="p-3 border border-slate-700 font-mono text-blue-200">80</td>
                                    <td className="p-3 border border-slate-700">TCP</td>
                                    <td className="p-3 border border-slate-700">平文でのWebアクセス・REST APIアクセス</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-bold text-blue-300">HTTPS</td>
                                    <td className="p-3 border border-slate-700 font-mono text-blue-200">443</td>
                                    <td className="p-3 border border-slate-700">TCP</td>
                                    <td className="p-3 border border-slate-700">TLSで暗号化されたWebアクセス・REST APIアクセス</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-bold text-blue-300">NETCONF</td>
                                    <td className="p-3 border border-slate-700 font-mono text-blue-200">830</td>
                                    <td className="p-3 border border-slate-700">TCP（SSH上）</td>
                                    <td className="p-3 border border-slate-700">モデル駆動型プログラマビリティによる機器の設定取得・投入</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-bold text-blue-300">DNS</td>
                                    <td className="p-3 border border-slate-700 font-mono text-blue-200">53</td>
                                    <td className="p-3 border border-slate-700">UDP/TCP</td>
                                    <td className="p-3 border border-slate-700">名前解決</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-bold text-blue-300">DHCP</td>
                                    <td className="p-3 border border-slate-700 font-mono text-blue-200">67 / 68</td>
                                    <td className="p-3 border border-slate-700">UDP</td>
                                    <td className="p-3 border border-slate-700">IPアドレスの自動割り当て</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-bold text-blue-300">SNMP</td>
                                    <td className="p-3 border border-slate-700 font-mono text-blue-200">161 / 162</td>
                                    <td className="p-3 border border-slate-700">UDP</td>
                                    <td className="p-3 border border-slate-700">機器の監視・自発通知（Trap）</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-bold text-blue-300">NTP</td>
                                    <td className="p-3 border border-slate-700 font-mono text-blue-200">123</td>
                                    <td className="p-3 border border-slate-700">UDP</td>
                                    <td className="p-3 border border-slate-700">時刻同期</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* STEP 8 */}
                <section id="step8" className="section-block">
                    <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-3">
                        Step 8 アプリケーション接続トラブルの切り分け（6.8）
                    </h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        アプリケーションがネットワーク経由で接続できない場合のトラブルシューティング手順と原因推定早見表です。
                    </p>

                    <h3 className="text-xl font-semibold text-slate-100 mt-6 mb-3">症状から原因を推測するための早見表</h3>

                    <div className="overflow-x-auto my-4">
                        <table className="w-full text-left border-collapse border border-slate-700 text-sm">
                            <thead className="bg-slate-800 text-slate-200">
                                <tr>
                                    <th scope="col" className="p-3 border border-slate-700">症状</th>
                                    <th scope="col" className="p-3 border border-slate-700">疑われる原因</th>
                                    <th scope="col" className="p-3 border border-slate-700">確認方法の例</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 text-slate-300">
                                <tr>
                                    <td className="p-3 border border-slate-700">特定サーバーの特定ポートにだけ接続できない</td>
                                    <td className="p-3 border border-slate-700 font-bold text-amber-300">Transport Port Blocked</td>
                                    <td className="p-3 border border-slate-700">対象ポートへの接続テスト、FW/ACLのログ確認</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700">社外から社内のアプリケーションに到達できない</td>
                                    <td className="p-3 border border-slate-700 font-bold text-amber-300">NAT Problem</td>
                                    <td className="p-3 border border-slate-700">NAT変換テーブル、グローバルIPの割当状況の確認</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700">特定URL・宛先だけアクセスできない</td>
                                    <td className="p-3 border border-slate-700 font-bold text-amber-300">Proxy設定の誤り</td>
                                    <td className="p-3 border border-slate-700">プロキシの除外リスト・認証設定の確認</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700">拠点間の通信だけ失敗する</td>
                                    <td className="p-3 border border-slate-700 font-bold text-amber-300">VPN Problem</td>
                                    <td className="p-3 border border-slate-700">VPNトンネルの状態、ルーティング配布状況の確認</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <Diagram id="diagram-10" label="アプリケーション接続トラブル診断フローチャート" />
                </section>

                {/* STEP 9 */}
                <section id="step9" className="section-block">
                    <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-3">
                        Step 9 ネットワーク制約がアプリケーションに与える影響（6.9）
                    </h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        ネットワーク上の各種ボトルネックや制約が、アプリケーションパフォーマンスにどのように作用するかをまとめた一覧です。
                    </p>

                    <div className="overflow-x-auto my-6">
                        <table className="w-full text-left border-collapse border border-slate-700 text-sm">
                            <thead className="bg-slate-800 text-slate-200">
                                <tr>
                                    <th scope="col" className="p-3 border border-slate-700">ネットワーク制約</th>
                                    <th scope="col" className="p-3 border border-slate-700">アプリケーションへの影響</th>
                                    <th scope="col" className="p-3 border border-slate-700">対策の例</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 text-slate-300">
                                <tr>
                                    <td className="p-3 border border-slate-700 font-semibold text-rose-300">帯域幅（Bandwidth）不足</td>
                                    <td className="p-3 border border-slate-700">レスポンス遅延、タイムアウトの増加</td>
                                    <td className="p-3 border border-slate-700">QoS設定、帯域増強、キャッシュの活用</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-semibold text-rose-300">遅延（Latency）／RTTの増大</td>
                                    <td className="p-3 border border-slate-700">リアルタイム性の低下（音声・映像品質の劣化）</td>
                                    <td className="p-3 border border-slate-700">CDNの活用、エッジコンピューティングの活用</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-semibold text-rose-300">MTU／パケットフラグメンテーション</td>
                                    <td className="p-3 border border-slate-700">パケット分割によるオーバーヘッド、通信エラー</td>
                                    <td className="p-3 border border-slate-700">MTUサイズの調整、Path MTU Discoveryの利用</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-semibold text-rose-300">パケットロス</td>
                                    <td className="p-3 border border-slate-700">再送増加によるスループット低下</td>
                                    <td className="p-3 border border-slate-700">信頼性の高いプロトコルの選択、QoSの適用</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-slate-700 font-semibold text-rose-300">ファイアウォール／ACLによる通信制限</td>
                                    <td className="p-3 border border-slate-700">特定ポート・プロトコルの通信が失敗する</td>
                                    <td className="p-3 border border-slate-700">事前の通信要件確認、必要なポートの申請・開放</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* SUMMARY */}
                <section id="summary" className="section-block">
                    <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-3">
                        まとめ：学習のポイント
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-slate-300 leading-relaxed">
                        <li>L2（MACアドレス/VLAN）とL3（IPアドレス/ルーティング）の動作階層を意識して理解する。</li>
                        <li>機器内部の Management/Control/Data Plane の役割分担を明確に把握する。</li>
                        <li>DHCP・DNS・NAT・SNMP・NTPの役割とポート番号をセットで暗記する。</li>
                        <li>接続トラブル時は、物理層からアプリケーション層へ順を追って切り分け（Troubleshooting）を行う。</li>
                    </ul>
                </section>

                {/* REFERENCES */}
                <section id="references" className="section-block border-t border-slate-700/60 pt-6">
                    <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-3">
                        参考情報源
                    </h2>
                    <ul className="space-y-2 text-sm text-blue-400">
                        <li>
                            <a
                                href="https://www.cisco.com/c/en/us/training-events/training-certifications/exams/current-list/ccna-200-301.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                Cisco Official CCNA 200-301 Exam Topics (cisco.com)
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://datatracker.ietf.org/doc/html/rfc1918"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                RFC 1918 - Address Allocation for Private Internets
                            </a>
                        </li>
                    </ul>
                </section>
            </main>
        </div>
    );
}
