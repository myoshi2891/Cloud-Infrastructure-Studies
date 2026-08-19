'use client';

import React, { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS, type DiagramId } from './constants';

interface DiagramProps {
    id: DiagramId;
    label: string;
}

const Diagram = memo(function Diagram({ id, label }: DiagramProps) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
        </div>
    );
});

/**
 * CompTIA Network+「ネットワークの運用」徹底解説ガイドコンポーネント (Client Component)
 */
export function ComptiaNetworkOperationsGuide() {
    return (
        <div className="comptia-network-operations-page">
            <div className="layout">
                <NavBar />
                <main className="main content">
                    <div className="eyebrow">
                        <i className="ti ti-certificate"></i>
                        CompTIA Network+ (N10-009) / Domain 3.0 Network Operations / 出題比率 19%
                    </div>
                    <h1>CompTIA Network+「ネットワークの運用」徹底解説ガイド</h1>
                    <p className="subtitle">
                        初学者でも迷わず理解できるよう、8つのサブトピックをステップバイステップで解説します。
                    </p>

                    <div className="callout">
                        <i className="ti ti-bulb"></i>
                        <div className="callout-body">
                            <p>
                                <strong>この記事の使い方</strong>
                                <br />
                                各セクションは「概要 → 図解 → 用語表 → 試験で問われやすいポイント」の順に構成されています。まずは全体の流れを一読し、その後は用語の暗記と図の描き直しで理解を定着させてください。
                            </p>
                        </div>
                    </div>

                    <h2 id="overview" tabIndex={-1}>
                        <i className="ti ti-list-check"></i>
                        1. CompTIA Network+ 試験の全体像
                    </h2>
                    <h3>1-1. 試験の基本情報</h3>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">項目</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>試験バージョン</td>
                                <td>V9</td>
                            </tr>
                            <tr>
                                <td>試験コード</td>
                                <td>N10-009</td>
                            </tr>
                            <tr>
                                <td>リリース日</td>
                                <td>2024年6月20日</td>
                            </tr>
                            <tr>
                                <td>出題数</td>
                                <td>最大90問（多肢選択式 ＋ パフォーマンスベース問題 PBQ）</td>
                            </tr>
                            <tr>
                                <td>試験時間</td>
                                <td>90分</td>
                            </tr>
                            <tr>
                                <td>合格スコア</td>
                                <td>720（100〜900点満点）</td>
                            </tr>
                            <tr>
                                <td>出題言語</td>
                                <td>英語、ドイツ語、日本語、ポルトガル語、スペイン語</td>
                            </tr>
                            <tr>
                                <td>推奨事前知識</td>
                                <td>CompTIA A+、または9〜12か月程度のネットワーク運用実務経験</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>1-2. 出題ドメインと比率</h3>
                    <p>
                        Network+ は5つのドメインで構成されており、「ネットワークの運用」はそのうちの1つです。
                    </p>

                    <Diagram
                        id="diag-pie-domain"
                        label="CompTIA Network+ 出題ドメイン比率を示す円グラフ"
                    />

                    <table>
                        <thead>
                            <tr>
                                <th scope="col">ドメイン</th>
                                <th scope="col">比率</th>
                                <th scope="col">主な内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1.0 ネットワークの概念</td>
                                <td>23%</td>
                                <td>OSI参照モデル、IPアドレッシング、トポロジーなど</td>
                            </tr>
                            <tr>
                                <td>2.0 ネットワークの実装</td>
                                <td>20%</td>
                                <td>ルーティング／スイッチング、無線設計など</td>
                            </tr>
                            <tr>
                                <td>3.0 ネットワークの運用</td>
                                <td>19%</td>
                                <td>ドキュメント化、監視、変更管理、災害復旧など（本ガイドの範囲）</td>
                            </tr>
                            <tr>
                                <td>4.0 ネットワークセキュリティ</td>
                                <td>14%</td>
                                <td>認証、暗号化、攻撃手法と対策など</td>
                            </tr>
                            <tr>
                                <td>5.0 トラブルシューティング</td>
                                <td>24%</td>
                                <td>障害切り分け手法、ツール活用など</td>
                            </tr>
                        </tbody>
                    </table>

                    <h2 id="domain-structure" tabIndex={-1}>
                        <i className="ti ti-sitemap"></i>
                        2.「ネットワークの運用」ドメインの全体構成
                    </h2>
                    <p>
                        このドメインは、日々のネットワーク運用業務（NOC業務）そのものを体系化した内容です。大きく8つのサブトピックに分解できます。
                    </p>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">サブトピック</th>
                                <th scope="col">一言でいうと</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>ドキュメンテーション</td>
                                <td>ネットワークの「地図」と「台帳」を整備する</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>ライフサイクル管理</td>
                                <td>機器・ソフトウェアの寿命を管理する</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>変更管理</td>
                                <td>変更作業を安全に承認・実施する仕組み</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>構成管理</td>
                                <td>設定情報を正しい状態に保つ</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>ネットワーク監視</td>
                                <td>異常を早期に検知する</td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>災害復旧</td>
                                <td>障害・災害から事業を復旧させる計画</td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td>ネットワークサービス</td>
                                <td>DHCP・DNS・時刻同期などの基盤サービス</td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td>アクセスと管理</td>
                                <td>機器へ安全にログインし管理する手段</td>
                            </tr>
                        </tbody>
                    </table>

                    <h2 id="documentation" tabIndex={-1}>
                        <i className="ti ti-file-text"></i>
                        3. ドキュメンテーション（Documentation）
                    </h2>
                    <p>
                        ネットワークは「今どうなっているか」を正確に記録していないと、障害対応も変更作業もできません。ドキュメンテーションは運用の土台です。
                    </p>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">種類</th>
                                <th scope="col">説明</th>
                                <th scope="col">具体例</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>物理図（Physical Diagram）</td>
                                <td>実際の配線・機器の配置を示す図</td>
                                <td>フロアマップ上のケーブル配線</td>
                            </tr>
                            <tr>
                                <td>論理図（Logical Diagram）</td>
                                <td>IPアドレスやVLANなど論理構成を示す図</td>
                                <td>ネットワークトポロジー図</td>
                            </tr>
                            <tr>
                                <td>ラック図（Rack Diagram）</td>
                                <td>サーバールーム内の機器の搭載位置</td>
                                <td>ラックの何U目に何の機器があるか</td>
                            </tr>
                            <tr>
                                <td>ケーブルマップ（Cable Map）</td>
                                <td>ケーブル1本ごとの接続元・接続先</td>
                                <td>パッチパネルとポートの対応表</td>
                            </tr>
                            <tr>
                                <td>資産管理台帳（Asset Inventory）</td>
                                <td>機器の型番・シリアル番号・保守期限などの一覧</td>
                                <td>資産管理システムの台帳</td>
                            </tr>
                            <tr>
                                <td>IPAM（IP Address Management）</td>
                                <td>IPアドレスの割り当て状況を一元管理する仕組み</td>
                                <td>どのサブネットが空いているかの把握</td>
                            </tr>
                            <tr>
                                <td>SLA（Service Level Agreement）</td>
                                <td>提供者と利用者間で合意した稼働率などの基準</td>
                                <td>「稼働率99.9%を保証」といった契約</td>
                            </tr>
                            <tr>
                                <td>無線サイトサーベイ（Wireless Site Survey）</td>
                                <td>電波状況を調査し、APの最適配置を決める調査</td>
                                <td>建物内の電波干渉・カバレッジ確認</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="callout">
                        <i className="ti ti-bulb"></i>
                        <div className="callout-body">
                            <p><strong>試験で問われやすいポイント</strong></p>
                            {' '}
                            <p>
                                「物理図」と「論理図」の違い（配線そのものか、IP/VLANなどの論理構成か）を混同しないこと。IPAMは「今どのIPが使われているか」を管理する仕組みであり、DHCPそのものではない点にも注意しましょう。
                            </p>
                        </div>
                    </div>

                    <h2 id="lifecycle" tabIndex={-1}>
                        <i className="ti ti-recycle"></i>
                        4. ライフサイクル管理（Life-Cycle Management）
                    </h2>
                    <p>
                        機器やソフトウェアには「寿命」があります。これを計画的に管理しないと、セキュリティリスクや突然の故障につながります。
                    </p>

                    <Diagram
                        id="diag-lifecycle"
                        label="ライフサイクル管理のフェーズ（計画・調達から除却まで）を示すフローチャート"
                    />

                    <table>
                        <thead>
                            <tr>
                                <th scope="col">用語</th>
                                <th scope="col">正式名称</th>
                                <th scope="col">意味</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>EOL</td>
                                <td>End-of-Life</td>
                                <td>メーカーが新規販売・製造を終了する時点</td>
                            </tr>
                            <tr>
                                <td>EOS</td>
                                <td>End-of-Support</td>
                                <td>メーカーが保守・パッチ提供を終了する時点</td>
                            </tr>
                            <tr>
                                <td>除却（Decommissioning）</td>
                                <td>-</td>
                                <td>機器を安全にデータ消去のうえ運用から外すこと</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="callout">
                        <i className="ti ti-bulb"></i>
                        <div className="callout-body">
                            <p><strong>試験で問われやすいポイント</strong></p>
                            {' '}
                            <p>
                                EOLは「販売終了」、EOSは「サポート終了」であり、EOSの方が後に来ます。EOSを過ぎると脆弱性が放置されるリスクが高まる点も押さえておきましょう。除却時はデータの完全消去（サニタイズ）が求められます。
                            </p>
                        </div>
                    </div>

                    <h2 id="change-management" tabIndex={-1}>
                        <i className="ti ti-git-pull-request"></i>
                        5. 変更管理（Change Management）
                    </h2>
                    <p>
                        「思いつきで設定を変える」ことは障害の最大要因の一つです。変更管理は、変更を安全に評価・承認・実施・記録するためのプロセスです。
                    </p>

                    <Diagram
                        id="diag-change-mgmt"
                        label="変更管理プロセス（起票から審査、実施、文書化まで）を示すフローチャート"
                    />

                    <table>
                        <thead>
                            <tr>
                                <th scope="col">用語</th>
                                <th scope="col">意味</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>RFC（Request for Change）</td>
                                <td>変更要求そのもの</td>
                            </tr>
                            <tr>
                                <td>CAB（Change Advisory Board）</td>
                                <td>変更内容を審査する承認機関</td>
                            </tr>
                            <tr>
                                <td>ロールバック計画</td>
                                <td>変更が失敗した場合に元の状態へ戻す手順</td>
                            </tr>
                            <tr>
                                <td>メンテナンスウィンドウ</td>
                                <td>変更作業を許可された時間帯</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="callout">
                        <i className="ti ti-bulb"></i>
                        <div className="callout-body">
                            <p><strong>試験で問われやすいポイント</strong></p>
                            {' '}
                            <p>
                                変更管理の目的は「変更を止めること」ではなく「リスクを管理しながら変更を進めること」です。ロールバック計画は変更実施前に必ず用意しておきます。
                            </p>
                        </div>
                    </div>

                    <h2 id="config-management" tabIndex={-1}>
                        <i className="ti ti-settings"></i>
                        6. 構成管理（Configuration Management）
                    </h2>
                    <p>
                        「今の設定」「あるべき設定（ベースライン）」「過去の設定（バックアップ）」の3つを常に整合させる考え方です。
                    </p>

                    <Diagram
                        id="diag-config-mgmt"
                        label="構成管理（ベースライン、本番、バックアップ）の相関関係を示すフローチャート"
                    />

                    <table>
                        <thead>
                            <tr>
                                <th scope="col">用語</th>
                                <th scope="col">意味</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>ベースライン構成</td>
                                <td>「正しい状態」として定義された標準設定</td>
                            </tr>
                            <tr>
                                <td>本番構成</td>
                                <td>現在機器で稼働している実際の設定</td>
                            </tr>
                            <tr>
                                <td>バックアップ構成</td>
                                <td>定期的に取得した設定の複製</td>
                            </tr>
                            <tr>
                                <td>構成ドリフト</td>
                                <td>本番構成がベースラインから徐々にずれていく現象</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="callout">
                        <i className="ti ti-bulb"></i>
                        <div className="callout-body">
                            <p><strong>試験で問われやすいポイント</strong></p>
                            {' '}
                            <p>
                                ベースラインとの差分（ドリフト）を定期的にチェックする重要性、そしてバックアップ構成は「戻すため」、ベースラインは「あるべき姿を定義するため」という役割の違いを理解しましょう。
                            </p>
                        </div>
                    </div>

                    <h2 id="monitoring" tabIndex={-1}>
                        <i className="ti ti-activity"></i>
                        7. ネットワーク監視（Network Monitoring）
                    </h2>
                    <p>
                        異常を「起きてから気づく」のではなく「起きる前後にすぐ検知する」ための仕組みです。
                    </p>

                    <Diagram
                        id="diag-monitoring"
                        label="ネットワーク監視とログ・フロー・パケット収集の構成を示すフローチャート"
                    />

                    <table>
                        <thead>
                            <tr>
                                <th scope="col">用語</th>
                                <th scope="col">説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>SNMP（Simple Network Management Protocol）</td>
                                <td>機器の状態情報を取得・監視する標準プロトコル</td>
                            </tr>
                            <tr>
                                <td>フローデータ（NetFlow / sFlow）</td>
                                <td>
                                    通信のトラフィック傾向（誰が・どこと・どれだけ通信したか）を記録するデータ
                                </td>
                            </tr>
                            <tr>
                                <td>パケットキャプチャ</td>
                                <td>通信内容そのものを取得して詳細分析する手法</td>
                            </tr>
                            <tr>
                                <td>ポートミラーリング</td>
                                <td>スイッチの特定ポートの通信を別ポートへ複製し監視すること</td>
                            </tr>
                            <tr>
                                <td>ベースラインメトリクス</td>
                                <td>「平常時の状態」を数値化した基準値</td>
                            </tr>
                            <tr>
                                <td>ログ集約</td>
                                <td>複数機器のログを一元的に収集・保管すること</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="callout">
                        <i className="ti ti-bulb"></i>
                        <div className="callout-body">
                            <p><strong>試験で問われやすいポイント</strong></p>
                            {' '}
                            <p>
                                SNMPは「機器の状態値」、フローデータは「通信の傾向」、パケットキャプチャは「通信の中身」を見るという役割の違いを整理しましょう。異常検知には「平常時のベースライン」との比較が前提になります。
                            </p>
                        </div>
                    </div>

                    <h2 id="disaster-recovery" tabIndex={-1}>
                        <i className="ti ti-shield-check"></i>
                        8. 災害復旧（Disaster Recovery）
                    </h2>
                    <p>
                        障害や災害が起きた際に、どれだけのデータ損失・停止時間まで許容できるかを事前に定義し、復旧手段を準備しておく考え方です。
                    </p>

                    <Diagram
                        id="diag-dr"
                        label="災害復旧におけるRPO、RTO、MTTRのタイムラインを示すフローチャート"
                    />

                    <table>
                        <thead>
                            <tr>
                                <th scope="col">用語</th>
                                <th scope="col">正式名称</th>
                                <th scope="col">意味</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>RPO</td>
                                <td>Recovery Point Objective</td>
                                <td>
                                    どの時点のデータまで復元できればよいかという目標値（許容できるデータ損失量）
                                </td>
                            </tr>
                            <tr>
                                <td>RTO</td>
                                <td>Recovery Time Objective</td>
                                <td>障害発生からどれだけの時間で復旧すべきかという目標値</td>
                            </tr>
                            <tr>
                                <td>MTTR</td>
                                <td>Mean Time To Repair</td>
                                <td>実際の修復にかかる平均時間の実績値</td>
                            </tr>
                            <tr>
                                <td>MTBF</td>
                                <td>Mean Time Between Failures</td>
                                <td>故障と故障の間隔の平均値（機器の信頼性指標）</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>サイト戦略の比較</h3>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">サイト種別</th>
                                <th scope="col">復旧速度</th>
                                <th scope="col">コスト</th>
                                <th scope="col">特徴</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>コールドサイト（Cold Site）</td>
                                <td>遅い</td>
                                <td>低い</td>
                                <td>設備のみで機器・データは未配置</td>
                            </tr>
                            <tr>
                                <td>ウォームサイト（Warm Site）</td>
                                <td>中程度</td>
                                <td>中程度</td>
                                <td>一部機器やデータを事前配置済み</td>
                            </tr>
                            <tr>
                                <td>ホットサイト（Hot Site）</td>
                                <td>速い</td>
                                <td>高い</td>
                                <td>本番同等の環境が常時稼働</td>
                            </tr>
                        </tbody>
                    </table>

                    <Diagram
                        id="diag-site-strategy"
                        label="アクティブ-アクティブおよびアクティブ-パッシブ構成の比較図"
                    />

                    <table>
                        <thead>
                            <tr>
                                <th scope="col">方式</th>
                                <th scope="col">説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>アクティブ-アクティブ</td>
                                <td>複数サイトが同時に稼働し、負荷を分散する方式</td>
                            </tr>
                            <tr>
                                <td>アクティブ-パッシブ</td>
                                <td>普段は片方のみ稼働し、障害時にもう一方へ切り替える方式</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>DR計画のテスト手法</h3>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">テスト種別</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>机上訓練（Tabletop Exercise）</td>
                                <td>関係者が集まり手順を口頭で確認する</td>
                            </tr>
                            <tr>
                                <td>ウォークスルー</td>
                                <td>実際の手順書に沿って動作を確認する</td>
                            </tr>
                            <tr>
                                <td>シミュレーション</td>
                                <td>模擬的な障害シナリオで訓練する</td>
                            </tr>
                            <tr>
                                <td>並行テスト（Parallel Test）</td>
                                <td>本番を止めずにDRサイトも並行稼働させて検証する</td>
                            </tr>
                            <tr>
                                <td>フル中断テスト（Full Interruption Test）</td>
                                <td>本番を実際に停止してDRサイトへ完全切替する</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="callout">
                        <i className="ti ti-bulb"></i>
                        <div className="callout-body">
                            <p><strong>試験で問われやすいポイント</strong></p>
                            {' '}
                            <p>
                                RPOは「データ」、RTOは「時間」という軸の違いを混同しないこと。ホットサイトほど復旧は速いがコストも高いというトレードオフも覚えておきましょう。
                            </p>
                        </div>
                    </div>

                    <h2 id="network-services" tabIndex={-1}>
                        <i className="ti ti-server-2"></i>
                        9. ネットワークサービス（Network Services）
                    </h2>
                    <p>
                        ネットワーク運用の裏側で動いている基盤サービス群です。特にDHCPとDNSの流れは頻出です。
                    </p>

                    <h3>DHCPの割り当てプロセス（DORA）</h3>
                    <Diagram
                        id="diag-dhcp-dora"
                        label="DHCPの4ステップ割り当てプロセス（DORA）を示すシーケンス図"
                    />

                    <h3>DNS名前解決の流れ</h3>
                    <Diagram
                        id="diag-dns-resolve"
                        label="DNS名前解決の流れを示すシーケンス図"
                    />

                    <h3>時刻同期サービスの比較</h3>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">サービス</th>
                                <th scope="col">正式名称</th>
                                <th scope="col">特徴</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>NTP</td>
                                <td>Network Time Protocol</td>
                                <td>一般的な時刻同期プロトコル</td>
                            </tr>
                            <tr>
                                <td>PTP</td>
                                <td>Precision Time Protocol</td>
                                <td>ミリ秒以下の高精度同期が必要な環境向け</td>
                            </tr>
                            <tr>
                                <td>NTS</td>
                                <td>Network Time Security</td>
                                <td>NTPに認証・改ざん防止を加えたセキュア版</td>
                            </tr>
                            <tr>
                                <td>SLAAC</td>
                                <td>Stateless Address Autoconfiguration</td>
                                <td>IPv6環境でDHCPなしにアドレスを自動生成する仕組み</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="callout">
                        <i className="ti ti-bulb"></i>
                        <div className="callout-body">
                            <p><strong>試験で問われやすいポイント</strong></p>
                            {' '}
                            <p>
                                DHCPの4ステップ（Discover → Offer → Request → Ack）の順序、そしてSLAACはIPv6特有の仕組みでありDHCPv4とは別物であることを押さえましょう。
                            </p>
                        </div>
                    </div>

                    <h2 id="access-management" tabIndex={-1}>
                        <i className="ti ti-key"></i>
                        10. アクセスと管理（Access and Management）
                    </h2>
                    <p>管理者がネットワーク機器へどのように安全にアクセスするか、という手段の整理です。</p>

                    <Diagram
                        id="diag-access-mgmt"
                        label="ネットワーク機器への管理アクセス手段と経路を示すフローチャート"
                    />

                    <table>
                        <thead>
                            <tr>
                                <th scope="col">手段</th>
                                <th scope="col">特徴</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>SSH（Secure Shell）</td>
                                <td>暗号化されたコマンドライン接続。Telnetの安全な代替</td>
                            </tr>
                            <tr>
                                <td>コンソール接続</td>
                                <td>ネットワーク経由に依存しない直接接続（初期設定や障害時に有効）</td>
                            </tr>
                            <tr>
                                <td>GUI</td>
                                <td>Webブラウザなどを用いた画面操作型の管理</td>
                            </tr>
                            <tr>
                                <td>API</td>
                                <td>プログラムから自動的に設定・取得を行う手段</td>
                            </tr>
                            <tr>
                                <td>VPN</td>
                                <td>拠点外から社内ネットワークへ安全にトンネル接続する手段</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="callout">
                        <i className="ti ti-bulb"></i>
                        <div className="callout-body">
                            <p><strong>試験で問われやすいポイント</strong></p>
                            {' '}
                            <p>
                                コンソール接続は、ネットワーク経由に依存しないローカル物理アクセス手段（専用管理インターフェースやコンソールサーバーなどの OOB 管理経路を組み合わせて利用可能）である点、そしてTelnetは平文通信のため非推奨でSSHが標準という位置づけを覚えておきましょう。
                            </p>
                        </div>
                    </div>

                    <h2 id="summary" tabIndex={-1}>
                        <i className="ti ti-checklist"></i>
                        11. まとめ：学習の進め方
                    </h2>

                    <ul className="step-list">
                        <li>
                            <span className="step-num">1</span>
                            <p>
                                <strong>全体像の把握</strong>
                                {' '}
                                — 本ガイドの8サブトピックを一通り読み、全体像を掴む
                            </p>
                        </li>
                        <li>
                            <span className="step-num">2</span>
                            <p>
                                <strong>用語の整理</strong>
                                {' '}
                                — EOL/EOS、RPO/RTO、DORAなどを表で整理して暗記する
                            </p>
                        </li>
                        <li>
                            <span className="step-num">3</span>
                            <p>
                                <strong>図の描き直し</strong>
                                {' '}
                                — 各Mermaid図を自分の手で描き直してみる（理解の定着に効果的）
                            </p>
                        </li>
                        <li>
                            <span className="step-num">4</span>
                            <p>
                                <strong>演習</strong>
                                {' '}
                                — 公式または信頼できる問題集でサブトピックごとに演習する
                            </p>
                        </li>
                        <li>
                            <span className="step-num">5</span>
                            <p>
                                <strong>弱点の復習</strong>
                                {' '}
                                — 弱点分野だけをもう一度、本ガイドの該当セクションに戻って復習する
                            </p>
                        </li>
                    </ul>

                    <p>
                        「ネットワークの運用」ドメインは、実際のNOC（Network Operations Center）業務やネットワーク管理者・システム管理者の日常業務にそのまま直結する内容です。暗記だけでなく「なぜこの手順が必要なのか」という業務上の意味を意識しながら学習すると定着しやすくなります。
                    </p>

                    <h2 id="references" tabIndex={-1}>
                        <i className="ti ti-link"></i>
                        参考文献・出典
                    </h2>
                    <div className="refs">
                        <a
                            className="ref-card"
                            href="https://www.comptia.org/en-us/certifications/network/"
                            target="_blank"
                            rel="noopener"
                        >
                            <i className="ti ti-external-link"></i>
                            <div className="ref-card-text">
                                <span className="ref-card-title">
                                    CompTIA公式 Network+ 認定ページ（試験概要・ドメイン別出題比率・Network Operationsの構成要素の出典）
                                </span>
                                <span className="ref-card-url">
                                    https://www.comptia.org/en-us/certifications/network/
                                </span>
                            </div>
                        </a>
                        <a
                            className="ref-card"
                            href="https://www.comptia.org/en-us/certifications/"
                            target="_blank"
                            rel="noopener"
                        >
                            <i className="ti ti-external-link"></i>
                            <div className="ref-card-text">
                                <span className="ref-card-title">CompTIA 認定資格 全体一覧</span>
                                <span className="ref-card-url">
                                    https://www.comptia.org/en-us/certifications/
                                </span>
                            </div>
                        </a>
                    </div>

                    <div className="note-box">
                        出題比率・試験詳細（試験コード、出題数、合格スコアなど）は上記CompTIA公式ページの記載（2026年7月時点）に基づいています。CompTIAは試験内容を定期的に見直すため、受験前に必ず公式ページで最新情報をご確認ください。
                    </div>

                    <footer>CompTIA Network+ (N10-009) Network Operations Domain Guide</footer>
                </main>
            </div>
        </div>
    );
}
