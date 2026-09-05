'use client';

import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAM_LABELS, DIAGRAMS, type DiagramId } from './constants';

const Diagram = memo(function Diagram({ id }: { id: DiagramId }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={DIAGRAM_LABELS[id]} preserveNaturalScale />
        </div>
    );
});

export function UnixLinuxSysadminHandbookGuide() {
    return (
        <div className="unix-linux-sysadmin-handbook-page">
            <div className="layout">
                <NavBar />
                <main className="main">
                    {' '}
                    <div className="hero">
                        {' '}
                        <div className="kicker">
                            {' '}
                            UNIX &amp; Linux System Administration Handbook, 5th Edition ·
                            実践ガイド{' '}
                        </div>{' '}
                        <h1>UNIX and Linux System Administration Handbook 実践ガイド</h1>{' '}
                        <div className="meta-row">
                            {' '}
                            <span className="pill">
                                対象書籍{' '}
                                <strong>
                                    UNIX &amp; Linux System Administration Handbook, 5th Ed.
                                </strong>
                            </span>{' '}
                            <span className="pill">
                                構成 <strong>全31章（4部構成）</strong>
                            </span>{' '}
                            <span className="pill">
                                図解 <strong>Mermaid 29点</strong>
                            </span>{' '}
                            <span className="pill">
                                参考文献 <strong>30件</strong>
                            </span>{' '}
                        </div>{' '}
                    </div>{' '}
                    <p>
                        <strong>初学者のためのステップバイステップ・ベストプラクティス解説</strong>
                    </p>{' '}
                    <blockquote>
                        {' '}
                        <p>
                            {' '}
                            本ガイドは、Evi Nemeth・Garth Snyder・Trent R. Hein・Ben Whaley・Dan
                            Mackin著『UNIX and Linux System Administration Handbook, 5th
                            Edition』（O&apos;Reilly / Addison-Wesley Professional, 2017年刊,
                            ISBN-13:
                            978-0-13-427755-4）の全31章構成に沿って、2026年8月時点の最新プラクティスを補いながら再構成した学習用ドキュメントです。原著は1232ページに及ぶ「システム管理者のバイブル」と呼ばれる書籍で、Tim
                            O&apos;Reilly（O&apos;Reilly
                            Media創業者）が「自分たちの物差しにした数少ない本の一つ」と評したことでも知られています。{' '}
                        </p>{' '}
                        <p>
                            {' '}
                            原著書誌情報:{' '}
                            <a href="https://www.oreilly.com/library/view/unix-and-linux/9780134278308/">
                                https://www.oreilly.com/library/view/unix-and-linux/9780134278308/
                            </a>{' '}
                        </p>{' '}
                    </blockquote>{' '}
                    <hr />{' '}
                    <h2 id="_1" tabIndex={-1}>
                        この文書の使い方
                    </h2>{' '}
                    <ul>
                        {' '}
                        <li>
                            {' '}
                            各章は「① 何のための章か」「② 初学者向けの基礎解説」「③
                            ベストプラクティス」「④
                            コマンド／設定リファレンス」の順で構成しています。{' '}
                        </li>{' '}
                        <li>
                            {' '}
                            Web検索で一次情報・著名開発者の発信元URLを確認できた主要章のみ、章末に「出典」を設けています（2026年8月27日時点）。全出典は巻末の「参考文献・出典一覧」に集約しています。{' '}
                        </li>{' '}
                        <li>
                            {' '}
                            コマンド例はUbuntu 24.04 LTS（Debian系）とRHEL 9 / Rocky Linux 9（Red
                            Hat系）の両方を意識して記載し、ディストリビューション差異がある箇所は明示しています。{' '}
                        </li>{' '}
                    </ul>{' '}
                    <hr />{' '}
                    <h2 id="431" tabIndex={-1}>
                        全体構成（原著4パート・31章）
                    </h2>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">パート</th>
                                    <th scope="col">章番号</th>
                                    <th scope="col">章タイトル（原題）</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <strong>第1部: 基本管理 (Basic Administration)</strong>
                                    </td>
                                    <td>1〜12</td>
                                    <td>
                                        {' '}
                                        Where to Start／Booting／Access Control／Process
                                        Control／Filesystem／Software Installation／Scripting／User
                                        Management／Cloud Computing／Logging／Drivers and the
                                        Kernel／Printing{' '}
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <strong>第2部: ネットワーキング (Networking)</strong>
                                    </td>
                                    <td>13〜19</td>
                                    <td>
                                        {' '}
                                        TCP/IP／Physical Networking／IP Routing／DNS／Single
                                        Sign-On／Electronic Mail／Web Hosting{' '}
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <strong>第3部: ストレージ (Storage)</strong>
                                    </td>
                                    <td>20〜22</td>
                                    <td>Storage／NFS／SMB</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <strong>第4部: 運用 (Operations)</strong>
                                    </td>
                                    <td>23〜31</td>
                                    <td>
                                        {' '}
                                        Configuration
                                        Management／Virtualization／Containers／CI/CD／Security／Monitoring／Performance
                                        Analysis／Data Center Basics／Methodology, Policy, and
                                        Politics{' '}
                                    </td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <hr />{' '}
                    <h2 id="1-basic-administration" tabIndex={-1}>
                        第1部: 基本管理 (Basic Administration)
                    </h2>{' '}
                    <h3 id="1-where-to-start" tabIndex={-1}>
                        第1章: どこから始めるか (Where to Start)
                    </h3>{' '}
                    <h4 id="1" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        システム管理者（sysadmin）という職務の輪郭を掴むための導入章です。原著は「バックアップの監督」「ローカルドキュメントの整備」「消火活動（トラブル対応）」を必須業務の代表例として挙げています。{' '}
                    </p>{' '}
                    <h4 id="2" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <p>
                        {' '}
                        システム管理は「サーバーを立てたら終わり」ではなく、
                        <strong>継続的な責務</strong>
                        です。原著が定義する必須業務は次の5つに整理できます。{' '}
                    </p>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">必須業務</th>
                                    <th scope="col">具体的な内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>ハードウェアとインフラの追加・削除</td>
                                    <td>サーバー調達、クラウドインスタンスの起動・廃止</td>
                                </tr>
                                <tr className="even">
                                    <td>自動化</td>
                                    <td>手作業の繰り返しをスクリプト・IaCに置き換える</td>
                                </tr>
                                <tr className="odd">
                                    <td>定常メンテナンス</td>
                                    <td>パッチ適用、アップグレード、証明書更新</td>
                                </tr>
                                <tr className="even">
                                    <td>ユーザーサポート</td>
                                    <td>アカウント発行、権限付与、問い合わせ対応</td>
                                </tr>
                                <tr className="odd">
                                    <td>トラブルシューティング</td>
                                    <td>障害の切り分けと復旧（＝「消火活動」）</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <p>
                        {' '}
                        初心者がまず身につけるべきは、
                        <strong>「推測せず、まず一次情報を確認する」</strong>という姿勢です。
                        <code>man</code>{' '}
                        ページ、ディストリビューションの公式ドキュメント、そしてIETFのRFCが最も信頼できる一次情報源になります。{' '}
                    </p>{' '}
                    <h4 id="3" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    変更を加える前に必ず現状の設定をバックアップ・バージョン管理下に置く（
                                    <code>/etc</code> を Git 管理するなど）。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    本番環境で初めて実行するコマンドはない、を原則にする（検証環境・ステージングで先に試す）。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    「なぜこの設定にしたか」をコミットメッセージやREADMEに残す —
                                    半年後の自分は他人と同じである。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h4 id="4" tabIndex={-1}>
                        ④ ディストリビューション選定の勘所
                    </h4>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">ディストリビューション系統</th>
                                    <th scope="col">代表例</th>
                                    <th scope="col">主な用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Debian系</td>
                                    <td>Ubuntu LTS, Debian</td>
                                    <td>クラウド、コンテナベースイメージ、幅広いドキュメント</td>
                                </tr>
                                <tr className="even">
                                    <td>Red Hat系</td>
                                    <td>RHEL, Rocky Linux, AlmaLinux</td>
                                    <td>エンタープライズ、長期サポート、CIS/STIG準拠が容易</td>
                                </tr>
                                <tr className="odd">
                                    <td>SUSE系</td>
                                    <td>openSUSE, SLES</td>
                                    <td>ヨーロッパ圏エンタープライズ、YaST管理</td>
                                </tr>
                                <tr className="even">
                                    <td>Arch系</td>
                                    <td>Arch Linux</td>
                                    <td>ローリングリリース、学習用途</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <blockquote>
                        {' '}
                        <p>
                            {' '}
                            出典: UNIX and Linux System Administration Handbook, 5th Edition
                            目次・書誌情報（O&apos;Reilly） —{' '}
                            <a href="https://www.oreilly.com/library/view/unix-and-linux/9780134278308/">
                                https://www.oreilly.com/library/view/unix-and-linux/9780134278308/
                            </a>{' '}
                        </p>{' '}
                    </blockquote>{' '}
                    <hr />{' '}
                    <h3 id="2-booting-and-system-management-daemons" tabIndex={-1}>
                        {' '}
                        第2章: ブートとシステム管理デーモン (Booting and System Management
                        Daemons){' '}
                    </h3>{' '}
                    <h4 id="1_1" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        電源投入からログインプロンプトが表示されるまでの一連の流れと、その後のサービス管理を担う{' '}
                        <code>systemd</code> を理解する章です。{' '}
                    </p>{' '}
                    <h4 id="2_1" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <p>
                        {' '}
                        現代のLinuxディストリビューションのほとんど（Ubuntu, RHEL, Fedora, Arch,
                        Debian等）は <code>systemd</code> をPID
                        1（最初に起動するプロセス）として採用しています。systemdは2010年にLennart
                        PoetteringとKay
                        Sieverによって開発され、SysVinitの命令的（imperative）なシェルスクリプト方式に代わり、
                        <strong>宣言的（declarative）</strong>
                        なUnitファイルで「何を」「いつ」「何に依存して」起動するかを記述する方式を導入しました。{' '}
                    </p>{' '}
                    <h5 id="_2" tabIndex={-1}>
                        起動プロセスの全体像
                    </h5>{' '}
                    <Diagram id="diag-1" />{' '}
                    <h5 id="systemdunit" tabIndex={-1}>
                        systemdのUnit種別
                    </h5>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">Unit種別</th>
                                    <th scope="col">拡張子</th>
                                    <th scope="col">役割</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Service</td>
                                    <td>
                                        <code>.service</code>
                                    </td>
                                    <td>デーモン・プロセスの起動管理（nginx, postgresqlなど）</td>
                                </tr>
                                <tr className="even">
                                    <td>Socket</td>
                                    <td>
                                        <code>.socket</code>
                                    </td>
                                    <td>ソケットベースのアクティベーション（遅延起動）</td>
                                </tr>
                                <tr className="odd">
                                    <td>Target</td>
                                    <td>
                                        <code>.target</code>
                                    </td>
                                    <td>複数Unitのグルーピング（旧runlevel相当）</td>
                                </tr>
                                <tr className="even">
                                    <td>Timer</td>
                                    <td>
                                        <code>.timer</code>
                                    </td>
                                    <td>cronに代わるスケジュール実行</td>
                                </tr>
                                <tr className="odd">
                                    <td>Mount / Automount</td>
                                    <td>
                                        <code>.mount</code> / <code>.automount</code>
                                    </td>
                                    <td>ファイルシステムのマウント管理</td>
                                </tr>
                                <tr className="even">
                                    <td>Device</td>
                                    <td>
                                        <code>.device</code>
                                    </td>
                                    <td>udevが検出したデバイスの表現</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <p>Unitファイルの優先順位（後者が前者を上書き）:</p>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead></thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <code>/usr/lib/systemd/system/</code>
                                    </td>
                                    <td>パッケージが提供する既定Unit（最も優先度が低い）</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>/run/systemd/system/</code>
                                    </td>
                                    <td>実行時に生成される一時Unit</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>/etc/systemd/system/</code>
                                    </td>
                                    <td>管理者による作成・上書き（最優先）</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <h5 id="systemd-web" tabIndex={-1}>
                        systemdユニットの依存関係イメージ（例: Webサーバー）
                    </h5>{' '}
                    <Diagram id="diag-2" />{' '}
                    <h4 id="3_1" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    アップストリームのUnitファイルは直接編集しない。
                                    <code>systemctl edit &lt;unit&gt;</code>{' '}
                                    でオーバーライドファイル（
                                    <code>/etc/systemd/system/&lt;unit&gt;.d/override.conf</code>
                                    ）を作成する — パッケージ更新時に上書き消失しない。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    Unitファイルを作成・変更したら必ず{' '}
                                    <code>systemctl daemon-reload</code>{' '}
                                    を実行する。これを忘れると変更が反映されない、最も典型的なハマりどころ。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    <code>After=</code>{' '}
                                    は起動順序を制御するだけで依存関係を意味しない。実際の依存を強制するには{' '}
                                    <code>Requires=</code> または <code>Wants=</code>{' '}
                                    と組み合わせる。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    障害調査は <code>systemctl status &lt;unit&gt;</code> →{' '}
                                    <code>journalctl -u &lt;unit&gt; -xe</code>{' '}
                                    の順で行う（ログ・終了コード・プロセスツリーが一括で見える）。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    準備完了シグナルが必要なサービスには <code>
                                        Type=notify
                                    </code> と <code>sd_notify()</code>（<code>systemd-notify</code>
                                    ）を使う。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    滅多に使わないサービスはソケットアクティベーションでメモリ消費を抑える。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h4 id="4_1" tabIndex={-1}>
                        ④ 主要コマンドリファレンス
                    </h4>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">コマンド</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <code>systemctl start/stop/restart &lt;unit&gt;</code>
                                    </td>
                                    <td>サービスの起動・停止・再起動</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>systemctl enable/disable &lt;unit&gt;</code>
                                    </td>
                                    <td>次回起動時の自動起動設定</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>systemctl status &lt;unit&gt;</code>
                                    </td>
                                    <td>状態・直近ログの確認</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>systemctl list-units --failed</code>
                                    </td>
                                    <td>失敗したUnitの一覧</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>systemd-analyze blame</code>
                                    </td>
                                    <td>起動時間のボトルネック分析</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>systemd-analyze critical-chain</code>
                                    </td>
                                    <td>起動のクリティカルパス表示</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>journalctl -b</code>
                                    </td>
                                    <td>今回起動分のログ表示</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <blockquote>
                        {' '}
                        <p>
                            {' '}
                            出典: DevToolbox「Systemd: The Complete Guide for 2026」 —{' '}
                            <a href="https://devtoolbox.dedyn.io/blog/systemd-complete-guide">
                                https://devtoolbox.dedyn.io/blog/systemd-complete-guide
                            </a>{' '}
                            ／ Lennart Poettering氏 Mastodon投稿（systemd v261の新機能解説,
                            2026年6月） —{' '}
                            <a href="https://mastodon.social/@pid_eins/116803790296454733">
                                https://mastodon.social/@pid_eins/116803790296454733
                            </a>{' '}
                            ／ The Register「Systemd daddy quits Microsoft to prove Linux can be
                            trusted」（2026年1月） —{' '}
                            <a href="https://www.theregister.com/2026/01/29/lennart_poettering_quits_microsoft/">
                                https://www.theregister.com/2026/01/29/lennart_poettering_quits_microsoft/
                            </a>{' '}
                        </p>{' '}
                    </blockquote>{' '}
                    <hr />{' '}
                    <h3 id="3-root-access-control-and-rootly-powers" tabIndex={-1}>
                        {' '}
                        第3章: アクセス制御とrootの権限 (Access Control and Rootly Powers){' '}
                    </h3>{' '}
                    <h4 id="1_2" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        「誰が」「何に」「どこまで」アクセスできるかを制御する、Linuxセキュリティの根幹を扱います。{' '}
                    </p>{' '}
                    <h4 id="2_2" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <p>
                        {' '}
                        標準UNIXアクセス制御は、ファイルごとに「所有者（owner）」「グループ（group）」「その他（other）」の3主体に対し、「読み（r）」「書き（w）」「実行（x）」の3権限を割り当てる方式です。{' '}
                    </p>{' '}
                    <Diagram id="diag-3" />{' '}
                    <p>
                        {' '}
                        rootアカウントはUID
                        0を持ち、通常のパーミッションチェックをすべてバイパスできる特別な存在です。現代の運用では「rootに直接ログインする」のではなく、
                        <strong>
                            一般ユーザーが <code>sudo</code> を介して一時的にroot権限を借りる
                        </strong>
                        方式が標準になっています。{' '}
                    </p>{' '}
                    <h5 id="sudo" tabIndex={-1}>
                        sudoによる権限昇格の流れ
                    </h5>{' '}
                    <Diagram id="diag-4" />{' '}
                    <h4 id="3_2" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    rootパスワードを直接配布しない。個々のユーザーに専用アカウントを発行し、必要な操作だけを{' '}
                                    <code>sudo</code> で許可する（最小権限の原則）。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    <code>/etc/sudoers</code> は必ず <code>visudo</code>{' '}
                                    で編集する（構文エラーを事前検知し、自分自身をロックアウトする事故を防ぐ）。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    <code>ALL=(ALL) ALL</code>{' '}
                                    のような包括的な許可はroot直渡しと同義。実行を許すコマンドをできる限り具体的に絞る（例:{' '}
                                    <code>dbadmin ALL=(ALL) /bin/systemctl restart postgresql</code>
                                    ）。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    <code>NOPASSWD</code>{' '}
                                    は真に必要な自動化アカウント以外では避ける。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    sudoersにエディタ（vi/vim/nano/emacs）や <code>less</code>・
                                    <code>find</code>・<code>awk</code>{' '}
                                    など、シェルエスケープが可能なバイナリを許可しない —
                                    GTFOBinsに掲載されている典型的な権限昇格経路になる。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    高セキュリティ環境では <code>timestamp_timeout=0</code>{' '}
                                    として、sudo実行のたびにパスワード再入力を要求する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    <code>auditd</code> でsudo実行・<code>/etc/passwd</code> や{' '}
                                    <code>/etc/shadow</code> の変更を監査ログに記録する。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h4 id="4_2" tabIndex={-1}>
                        ④ コマンドリファレンス
                    </h4>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">コマンド</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <code>chmod u+x,g-w file</code>
                                    </td>
                                    <td>パーミッション変更（シンボリックモード）</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>chmod 750 file</code>
                                    </td>
                                    <td>パーミッション変更（8進数モード）</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>chown user:group file</code>
                                    </td>
                                    <td>所有者・グループの変更</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>visudo</code>
                                    </td>
                                    <td>sudoers編集（構文チェック付き）</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>sudo -l</code>
                                    </td>
                                    <td>自分に許可されたsudoコマンド一覧</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>getfacl</code> / <code>setfacl</code>
                                    </td>
                                    <td>ACL（拡張アクセス制御リスト）の確認・設定</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <blockquote>
                        {' '}
                        <p>
                            {' '}
                            出典: Oracle Linux公式ドキュメント「Follow the Principle of Least
                            Privilege」 —{' '}
                            <a href="https://docs.oracle.com/en/operating-systems/oracle-linux/9/security/security-FollowthePrincipleofLeastPrivilege.html">
                                https://docs.oracle.com/en/operating-systems/oracle-linux/9/security/security-FollowthePrincipleofLeastPrivilege.html
                            </a>{' '}
                            ／ DecryptionDigest「Linux sudo sudoers Hardening 2026」 —{' '}
                            <a href="https://www.decryptiondigest.com/blog/linux-sudo-sudoers-security-hardening-privilege-escalation-guide">
                                https://www.decryptiondigest.com/blog/linux-sudo-sudoers-security-hardening-privilege-escalation-guide
                            </a>{' '}
                            ／ Kevin Wells氏「Mastering sudo: Enforcing Least Privilege in Linux」 —{' '}
                            <a href="https://kevwells.com/mastering-sudo-enforcing-least-privilege-in-linux/">
                                https://kevwells.com/mastering-sudo-enforcing-least-privilege-in-linux/
                            </a>{' '}
                        </p>{' '}
                    </blockquote>{' '}
                    <hr />{' '}
                    <h3 id="4-process-control" tabIndex={-1}>
                        第4章: プロセス制御 (Process Control)
                    </h3>{' '}
                    <h4 id="1_3" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        実行中プログラム（プロセス）のライフサイクル、シグナルによる制御、リソース管理を扱います。{' '}
                    </p>{' '}
                    <h4 id="2_3" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <p>
                        プロセスは生成（fork）されてから終了するまで、いくつかの状態を遷移します。
                    </p>{' '}
                    <Diagram id="diag-5" />{' '}
                    <p>
                        {' '}
                        プロセスへの介入は「シグナル」を通じて行います。よく使うシグナルは次の通りです。{' '}
                    </p>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">シグナル</th>
                                    <th scope="col">番号</th>
                                    <th scope="col">意味</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <code>SIGHUP</code>
                                    </td>
                                    <td>1</td>
                                    <td>設定再読み込みの慣習的合図（端末切断の原義）</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>SIGINT</code>
                                    </td>
                                    <td>2</td>
                                    <td>Ctrl+Cによる割り込み</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>SIGKILL</code>
                                    </td>
                                    <td>9</td>
                                    <td>強制終了（プロセス側で捕捉・無視不可）</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>SIGTERM</code>
                                    </td>
                                    <td>15</td>
                                    <td>正常終了の要求（既定のkillシグナル、捕捉可能）</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>SIGSTOP</code> / <code>SIGCONT</code>
                                    </td>
                                    <td>19 / 18（Linux x86/ARM）</td>
                                    <td>
                                        {' '}
                                        一時停止・再開。番号はアーキテクチャ依存（Alpha/SPARC・MIPSでは異なる）なので、コマンドでは{' '}
                                        <code>kill -STOP</code> / <code>kill -CONT</code>{' '}
                                        のように名前で指定する{' '}
                                    </td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <h4 id="3_3" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    プロセスを止めるときは、まず <code>SIGTERM</code>（既定の{' '}
                                    <code>kill</code>）で正常終了を試み、応答がない場合のみ{' '}
                                    <code>SIGKILL</code> にエスカレートする。いきなり{' '}
                                    <code>kill -9</code>{' '}
                                    はリソース解放処理やDBのコミットを妨げる可能性がある。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    長時間稼働のサービスはsystemdの管理下に置き、生プロセスとして{' '}
                                    <code>nohup</code> や <code>&amp;</code>{' '}
                                    で放置しない（再起動・クラッシュ時の自動復旧、リソース上限、ログの一元化が失われるため）。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    CPU/メモリの過剰消費を防ぐには <code>nice</code>/
                                    <code>renice</code> による優先度調整より、systemdの{' '}
                                    <code>CPUQuota=</code> / <code>MemoryMax=</code>（cgroup
                                    v2ベースのリソース制御）を使うほうが確実。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    ゾンビプロセスが大量発生している場合は「親プロセスが{' '}
                                    <code>wait()</code> を呼んでいない」実装上のバグを疑う。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h4 id="4_3" tabIndex={-1}>
                        ④ コマンドリファレンス
                    </h4>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">コマンド</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <code>ps aux</code> / <code>ps -ef</code>
                                    </td>
                                    <td>全プロセス一覧</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>top</code> / <code>htop</code>
                                    </td>
                                    <td>リアルタイムリソース監視</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>kill -TERM &lt;pid&gt;</code>
                                    </td>
                                    <td>正常終了要求</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>kill -KILL &lt;pid&gt;</code>
                                    </td>
                                    <td>
                                        {' '}
                                        強制終了（<code>kill -9</code>{' '}
                                        と同義。番号より名前指定を推奨）{' '}
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>pgrep</code> / <code>pkill</code>
                                    </td>
                                    <td>名前によるプロセス検索・終了</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>nice -n 10 cmd</code>
                                    </td>
                                    <td>優先度を下げて実行</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>systemd-cgtop</code>
                                    </td>
                                    <td>cgroup単位のリソース使用状況</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <hr />{' '}
                    <h3 id="5-the-filesystem" tabIndex={-1}>
                        第5章: ファイルシステム (The Filesystem)
                    </h3>{' '}
                    <h4 id="1_4" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        ファイル・ディレクトリがディスク上でどう組織されるか、そして標準的なディレクトリ配置（FHS）を理解する章です。{' '}
                    </p>{' '}
                    <h4 id="2_4" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <p>
                        {' '}
                        Linuxのファイルシステム階層は、Filesystem Hierarchy Standard (FHS)
                        にゆるく準拠しています。{' '}
                    </p>{' '}
                    <Diagram id="diag-6" />{' '}
                    <p>
                        {' '}
                        <code>/proc</code> と <code>/sys</code> は物理ディスク上に実体を持たない
                        <strong>仮想ファイルシステム</strong>
                        で、カーネルの内部状態をファイルのように読み書きできるインターフェースです。{' '}
                    </p>{' '}
                    <h4 id="3_4" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    <code>/</code>（ルート）、<code>/var</code>、<code>/home</code>{' '}
                                    は可能な限り別パーティション（別論理ボリューム）に分離する。ログの肥大化やユーザーデータの増加が、OS起動に必須のルート領域を圧迫する事故を防ぐ。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    ファイルシステムの選定は用途で使い分ける（詳細は第20章）。一般用途はext4、大容量・高スループットが必要ならXFS、スナップショットや圧縮が必要ならBtrfs。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    <code>df -h</code> と <code>du -sh</code>{' '}
                                    は似て非なる情報を返す。<code>df</code>{' '}
                                    はマウントポイント単位の空き容量、<code>du</code>{' '}
                                    は指定パス配下の実使用量。両方を定期的に確認する運用を組み込む。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    シンボリックリンクとハードリンクの違い（ハードリンクは同一inodeを共有し別ファイルシステムをまたげない）を理解した上でバックアップ設計を行う。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h4 id="4_4" tabIndex={-1}>
                        ④ コマンドリファレンス
                    </h4>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">コマンド</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <code>df -h</code>
                                    </td>
                                    <td>マウントポイントごとの空き容量</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>du -sh &lt;dir&gt;</code>
                                    </td>
                                    <td>ディレクトリの使用量集計</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>mount</code> / <code>umount</code>
                                    </td>
                                    <td>ファイルシステムのマウント・アンマウント</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>lsblk</code>
                                    </td>
                                    <td>ブロックデバイス一覧の階層表示</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>find / -xdev -size +100M</code>
                                    </td>
                                    <td>大容量ファイルの検索</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>stat &lt;file&gt;</code>
                                    </td>
                                    <td>inode情報の詳細表示</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <hr />{' '}
                    <h3 id="6-software-installation-and-management" tabIndex={-1}>
                        {' '}
                        第6章: ソフトウェアのインストールと管理 (Software Installation and
                        Management){' '}
                    </h3>{' '}
                    <h4 id="1_5" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        パッケージマネージャーを通じたソフトウェアの導入・更新・削除、依存関係解決の仕組みを扱います。{' '}
                    </p>{' '}
                    <h4 id="2_5" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <p>主要ディストリビューションのパッケージ管理系統は大きく2つに分かれます。</p>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">系統</th>
                                    <th scope="col">パッケージ形式</th>
                                    <th scope="col">低レベルツール</th>
                                    <th scope="col">高レベル（依存解決込み）ツール</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Debian系</td>
                                    <td>
                                        <code>.deb</code>
                                    </td>
                                    <td>
                                        <code>dpkg</code>
                                    </td>
                                    <td>
                                        <code>apt</code> / <code>apt-get</code>
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Red Hat系</td>
                                    <td>
                                        <code>.rpm</code>
                                    </td>
                                    <td>
                                        <code>rpm</code>
                                    </td>
                                    <td>
                                        <code>dnf</code>（RHEL8以降。旧<code>yum</code>の後継）
                                    </td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <Diagram id="diag-7" />{' '}
                    <p>
                        {' '}
                        近年はディストリビューション非依存のパッケージ形式（Flatpak, Snap,
                        AppImage）や、言語エコシステム固有のパッケージマネージャー（pip, npm,
                        cargo）も併用されるのが一般的です。{' '}
                    </p>{' '}
                    <h4 id="3_5" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    本番サーバーでは自動アップグレード（
                                    <code>unattended-upgrades</code>{' '}
                                    等）はセキュリティパッチのみに限定し、メジャーバージョンアップは計画的なメンテナンスウィンドウで実施する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    パッケージのGPG署名検証を無効化しない（
                                    <code>--allow-unauthenticated</code>{' '}
                                    等のフラグは緊急時以外使わない）。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    依存関係の破損を避けるため、異なる系統のパッケージマネージャー（例:{' '}
                                    <code>apt</code> と手動 <code>make install</code>
                                    ）を同一ファイルに対して混在させない。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    <code>apt-mark hold &lt;pkg&gt;</code> /{' '}
                                    <code>dnf versionlock</code>{' '}
                                    で、意図せぬバージョンアップを防ぎたいパッケージを固定する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    コンテナイメージのビルドでは、パッケージキャッシュを最後にクリア（
                                    <code>apt-get clean</code>{' '}
                                    等）してイメージサイズを削減する。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h4 id="4_5" tabIndex={-1}>
                        ④ コマンドリファレンス
                    </h4>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">操作</th>
                                    <th scope="col">Debian系 (apt)</th>
                                    <th scope="col">Red Hat系 (dnf)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>メタデータ更新</td>
                                    <td>
                                        <code>apt update</code>
                                    </td>
                                    <td>
                                        <code>dnf makecache</code>
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>インストール</td>
                                    <td>
                                        <code>apt install &lt;pkg&gt;</code>
                                    </td>
                                    <td>
                                        <code>dnf install &lt;pkg&gt;</code>
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>アップグレード</td>
                                    <td>
                                        <code>apt upgrade</code>
                                    </td>
                                    <td>
                                        <code>dnf upgrade</code>
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>削除</td>
                                    <td>
                                        <code>apt remove &lt;pkg&gt;</code>
                                    </td>
                                    <td>
                                        <code>dnf remove &lt;pkg&gt;</code>
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>検索</td>
                                    <td>
                                        <code>apt search &lt;keyword&gt;</code>
                                    </td>
                                    <td>
                                        <code>dnf search &lt;keyword&gt;</code>
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>インストール済み一覧</td>
                                    <td>
                                        <code>apt list --installed</code>
                                    </td>
                                    <td>
                                        <code>dnf list installed</code>
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>パッケージ情報</td>
                                    <td>
                                        <code>apt show &lt;pkg&gt;</code>
                                    </td>
                                    <td>
                                        <code>dnf info &lt;pkg&gt;</code>
                                    </td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <blockquote>
                        {' '}
                        <p>
                            {' '}
                            出典: Red Hat公式ドキュメント（RHEL 9 dnfパッケージ管理） —{' '}
                            <a href="https://docs.redhat.com/">https://docs.redhat.com/</a> ／
                            Debian公式 <code>apt</code> マニュアル —{' '}
                            <a href="https://manpages.debian.org/">
                                https://manpages.debian.org/
                            </a>{' '}
                        </p>{' '}
                    </blockquote>{' '}
                    <hr />{' '}
                    <h3 id="7-scripting-and-the-shell" tabIndex={-1}>
                        {' '}
                        第7章: スクリプティングとシェル (Scripting and the Shell){' '}
                    </h3>{' '}
                    <h4 id="1_6" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        反復作業を自動化するためのシェルスクリプトの基礎と、堅牢なスクリプトを書くための作法を扱います。{' '}
                    </p>{' '}
                    <h4 id="2_6" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <p>
                        {' '}
                        シェルはコマンドの「パイプ」と「リダイレクト」によって小さなツールを組み合わせる、UNIX哲学の中核です。{' '}
                    </p>{' '}
                    <Diagram id="diag-8" />{' '}
                    <h4 id="3_6" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    スクリプト冒頭に <code>#!/usr/bin/env bash</code> と{' '}
                                    <code>set -euo pipefail</code>{' '}
                                    を必ず入れる。3つのオプションは役割が異なるので分けて理解する。{' '}
                                    <ul>
                                        {' '}
                                        <li>
                                            {' '}
                                            <code>-e</code>{' '}
                                            は非ゼロ終了で停止するが、すべての非ゼロ終了ステータスで停止するわけではない。
                                            <code>if</code>/<code>while</code>/<code>until</code>{' '}
                                            の条件部、<code>&amp;&amp;</code>・<code>||</code>{' '}
                                            の左辺、<code>!</code>{' '}
                                            を付けたコマンドに現れるパイプラインは例外として扱われ、非ゼロで終了しても停止しない。これらの箇所ではパイプライン全体の終了ステータスを{' '}
                                            <code>$?</code> で明示的に確認する。{' '}
                                        </li>{' '}
                                        <li>
                                            {' '}
                                            <code>-o pipefail</code>{' '}
                                            は「パイプライン全体の終了ステータスの決まり方」を変えるオプションである。無効時のパイプラインの終了ステータスは
                                            <strong>最後の要素のものだけ</strong>
                                            で、最後以外の要素が失敗しても終了ステータスには反映されない（例:{' '}
                                            <code>false | true</code> は
                                            0）。有効時は最後に非ゼロで終了した要素のステータスが採用されるため、途中の失敗でもパイプライン全体が非ゼロになり得る（
                                            <code>false | true</code> は 1）。{' '}
                                        </li>{' '}
                                        <li>
                                            {' '}
                                            ただし <code>pipefail</code>{' '}
                                            を有効にしても「どの要素が失敗したか」までは分からない。パイプライン全体の成否は{' '}
                                            <code>$?</code> で、要素ごとの終了ステータスは配列{' '}
                                            <code>PIPESTATUS</code>（
                                            <code>&quot;$&#123;PIPESTATUS[@]&#125;&quot;</code>
                                            ）で、それぞれ別々に確認する。{' '}
                                        </li>{' '}
                                        <li>
                                            <code>-u</code> は未定義変数の参照をエラーにする。
                                        </li>{' '}
                                    </ul>{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    変数展開は常にダブルクォートで囲む（
                                    <code>&quot;$var&quot;</code>
                                    ）。スペースを含むファイル名でのワードスプリッティング事故を防ぐ。{' '}
                                </li>{' '}
                                <li>
                                    <code>shellcheck</code> で静的解析を通してからデプロイする。
                                </li>{' '}
                                <li>
                                    {' '}
                                    冪等性（何度実行しても同じ結果になること）を意識する。ファイル追記型の操作は、既存行の存在チェックを先に行う。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    複雑なロジックが必要になったら、シェルではなくPythonなど汎用言語への切り替えを検討する（原著もこの判断基準を明示的に推奨している）。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h4 id="4_6" tabIndex={-1}>
                        ④ コマンドリファレンス
                    </h4>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">コマンド</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <code>grep</code> / <code>grep -E</code>
                                    </td>
                                    <td>
                                        {' '}
                                        パターン検索（<code>egrep</code> は非推奨。
                                        <code>grep -E</code> を使う）{' '}
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>sed &apos;s/old/new/g&apos;</code>
                                    </td>
                                    <td>ストリーム編集・置換</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>awk &apos;&#123;print $N&#125;&apos;</code>
                                    </td>
                                    <td>フィールド抽出・集計</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>xargs</code>
                                    </td>
                                    <td>標準入力から引数を構築して実行</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>cut -d, -f1</code>
                                    </td>
                                    <td>区切り文字によるフィールド切り出し</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>shellcheck script.sh</code>
                                    </td>
                                    <td>シェルスクリプトの静的解析</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <hr />{' '}
                    <h3 id="8-user-management" tabIndex={-1}>
                        第8章: ユーザー管理 (User Management)
                    </h3>{' '}
                    <h4 id="1_7" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        ユーザーアカウント・グループの作成、認証情報の管理、ライフサイクル（入社〜退職）を扱います。{' '}
                    </p>{' '}
                    <h4 id="2_7" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <p>
                        {' '}
                        Linuxのユーザー情報は <code>/etc/passwd</code>（ユーザー基本情報）、
                        <code>/etc/shadow</code>（パスワードハッシュ）、<code>/etc/group</code>
                        （グループ情報）に保存されます。{' '}
                    </p>{' '}
                    <Diagram id="diag-9" />{' '}
                    <p>
                        {' '}
                        大規模組織では、ローカルアカウントの手動管理はスケールしません。LDAP・Active
                        Directory・クラウドIAM（第17章 SSO参照）と連携した一元管理が標準です。{' '}
                    </p>{' '}
                    <h4 id="3_7" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    退職・異動が発生したら即座にアカウントを無効化する。ローカルアカウントでは{' '}
                                    <code>usermod -L</code>（パスワードロック）だけでは不十分で、①
                                    アカウント期限の設定（<code>usermod -e 1</code> /{' '}
                                    <code>chage -E 0</code>）、② 登録済みSSH公開鍵（
                                    <code>.ssh/authorized_keys</code>）の無効化または削除、③
                                    既存セッションの終了（
                                    <code>loginctl terminate-user &lt;user&gt;</code>{' '}
                                    または該当プロセスの終了）をあわせて実施する。
                                    <code>usermod -L</code>{' '}
                                    は鍵認証や稼働中セッションを止められない点に注意。削除は監査証跡のため一定期間経過後に行う。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    共有アカウントを作らない。誰が何をしたかの追跡可能性（アカウンタビリティ）を最優先する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    パスワードポリシーは <code>pam_pwquality</code>{' '}
                                    で強制し、加えて可能な限りSSH鍵認証・多要素認証（MFA）へ移行する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    定期的に（四半期ごと等）アカウント棚卸しを行い、不要な特権グループ所属を洗い出す。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    サービスアカウントにはログインシェルを{' '}
                                    <code>/usr/sbin/nologin</code>{' '}
                                    に設定し、対話的ログインを禁止する。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h4 id="4_7" tabIndex={-1}>
                        ④ コマンドリファレンス
                    </h4>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">コマンド</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <code>useradd -m -s /bin/bash alice</code>
                                    </td>
                                    <td>ユーザー作成（ホームディレクトリ付き）</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>usermod -aG docker alice</code>
                                    </td>
                                    <td>
                                        {' '}
                                        補助グループへの追加。<strong>警告</strong>:
                                        rootfulなDockerデーモンでは <code>docker</code>{' '}
                                        グループ所属はホストへのroot相当の権限付与に等しい（任意のホストパスを特権コンテナでマウントできるため）。まずrootless
                                        Dockerの利用を検討し、rootfulで運用する場合は信頼できるユーザーのみを追加する{' '}
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>usermod -L alice</code>
                                    </td>
                                    <td>
                                        {' '}
                                        パスワードロック（パスワードハッシュを無効化するのみ。SSH公開鍵認証やsudo経由のログインは引き続き可能なため、アカウント全体を止めるには{' '}
                                        <code>usermod -L -e 1 alice</code>{' '}
                                        やシェル変更・鍵の削除を併用する）{' '}
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>passwd -e alice</code>
                                    </td>
                                    <td>次回ログイン時のパスワード変更強制</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>chage -l alice</code>
                                    </td>
                                    <td>パスワード有効期限の確認</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>id alice</code>
                                    </td>
                                    <td>所属UID/GIDの確認</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <hr />{' '}
                    <h3 id="9-cloud-computing" tabIndex={-1}>
                        第9章: クラウドコンピューティング (Cloud Computing)
                    </h3>{' '}
                    <h4 id="1_8" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        自前のデータセンターに代わり、AWS・GCP・Azure等のクラウドプラットフォーム上でシステムを構築・運用する際の考え方を扱います。{' '}
                    </p>{' '}
                    <h4 id="2_8" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <p>
                        {' '}
                        クラウドの本質は「所有」から「利用」への転換です。原著は主要プラットフォームごとのVPS（仮想プライベートサーバー）クイックスタートを解説していますが、共通して押さえるべき概念は以下の通りです。{' '}
                    </p>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">概念</th>
                                    <th scope="col">説明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>IaaS / PaaS / SaaS</td>
                                    <td>
                                        {' '}
                                        インフラ／プラットフォーム／ソフトウェアそれぞれをサービスとして提供する層{' '}
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>リージョン / アベイラビリティゾーン</td>
                                    <td>地理的な分散単位。障害時の可用性設計の基盤</td>
                                </tr>
                                <tr className="odd">
                                    <td>セキュリティグループ / VPC</td>
                                    <td>クラウド上の仮想ネットワーク境界とファイアウォール</td>
                                </tr>
                                <tr className="even">
                                    <td>IAM（Identity and Access Management）</td>
                                    <td>
                                        {' '}
                                        クラウドリソースへのアクセス制御。OSのユーザー管理と同様「最小権限の原則」が鉄則{' '}
                                    </td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <Diagram id="diag-10" />{' '}
                    <h4 id="3_8" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    インスタンスへの設定はSSH経由の手作業ではなく{' '}
                                    <code>cloud-init</code> またはConfiguration
                                    Management（第23章）で自動化し、「作り直せば元通り」を実現する（イミュータブルインフラの考え方）。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    コスト管理はタグ付けから始める（プロジェクト・環境・所有者タグを全リソースに強制）。未使用のボリューム・IPアドレスの棚卸しを定期実行する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    IAMロールは「必要な操作だけ」を許可するカスタムポリシーを基本とし、
                                    <code>AdministratorAccess</code>{' '}
                                    のような包括的権限をアプリケーションに付与しない。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    マルチAZ・マルチリージョン構成は「単一障害点をなくす」ためのものであり、コストとのトレードオフを事業要件に照らして判断する。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <blockquote>
                        {' '}
                        <p>
                            {' '}
                            出典: 各クラウドプロバイダ公式ドキュメント（AWS, GCP,
                            Azure）の一般提供情報に基づく。原著第9章「Cloud Computing」構成 — UNIX
                            and Linux System Administration Handbook, 5th Edition, Pearson目次 —{' '}
                            <a href="https://www.pearson.com/en-us/subject-catalog/p/unix-and-linux-system-administration-handbook/P200000000513/9780137460359">
                                https://www.pearson.com/en-us/subject-catalog/p/unix-and-linux-system-administration-handbook/P200000000513/9780137460359
                            </a>{' '}
                        </p>{' '}
                    </blockquote>{' '}
                    <hr />{' '}
                    <h3 id="10-logging" tabIndex={-1}>
                        第10章: ロギング (Logging)
                    </h3>{' '}
                    <h4 id="1_9" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        システムやアプリケーションが生成するログの収集・保存・ローテーション・分析を扱います。障害調査とセキュリティ監査の生命線です。{' '}
                    </p>{' '}
                    <h4 id="2_9" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <p>
                        {' '}
                        現代のLinuxでは、<code>systemd-journald</code>{' '}
                        が主要なログ収集基盤となり、従来の <code>syslog</code>（rsyslog /
                        syslog-ng）と併用されるのが一般的です。{' '}
                    </p>{' '}
                    <Diagram id="diag-11" />{' '}
                    <h4 id="3_9" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    ログは「見るためのもの」ではなく「機械が処理するためのもの」と捉え、可能な限り構造化（JSON等）で出力する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    <code>journald</code> の永続化を有効にする（既定では{' '}
                                    <code>/run</code> 上の揮発領域のみの場合がある）。
                                    <code>/etc/systemd/journald.conf</code> で{' '}
                                    <code>Storage=persistent</code>{' '}
                                    を設定し、再起動後もログが残るようにする。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    <code>logrotate</code> で世代数・サイズ上限・圧縮を必ず設定し、
                                    <code>/var/log</code>{' '}
                                    がディスクを圧迫してサービス停止を招く事故を防ぐ。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    セキュリティ監査対象のログ（認証ログ、sudo実行ログ）は改ざん防止のため、生成元とは別のサーバーへ即座に転送する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    大規模環境ではログ量そのものをコスト要因として管理する —
                                    何を・どのレベルで・どこまで残すかの「ロギングポリシー」を明文化する。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h4 id="4_8" tabIndex={-1}>
                        ④ コマンドリファレンス
                    </h4>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">コマンド</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <code>journalctl -u &lt;unit&gt;</code>
                                    </td>
                                    <td>特定サービスのログ表示</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>journalctl -b</code>
                                    </td>
                                    <td>今回起動分のログ</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>journalctl -f</code>
                                    </td>
                                    <td>ログのリアルタイム追跡（tail -f相当）</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>journalctl --since &quot;1 hour ago&quot;</code>
                                    </td>
                                    <td>時間範囲指定</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>logrotate -d /etc/logrotate.conf</code>
                                    </td>
                                    <td>logrotate設定のドライラン確認</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <blockquote>
                        {' '}
                        <p>
                            {' '}
                            出典: UNIX and Linux System Administration Handbook, 5th Edition
                            第10章「Logging」構成（systemdジャーナル・syslog・ログローテーションの3本柱）
                            — Pearson目次 —{' '}
                            <a href="https://www.pearson.com/en-us/subject-catalog/p/unix-and-linux-system-administration-handbook/P200000000513/9780137460359">
                                https://www.pearson.com/en-us/subject-catalog/p/unix-and-linux-system-administration-handbook/P200000000513/9780137460359
                            </a>{' '}
                        </p>{' '}
                    </blockquote>{' '}
                    <hr />{' '}
                    <h3 id="11-drivers-and-the-kernel" tabIndex={-1}>
                        {' '}
                        第11章: ドライバとカーネル (Drivers and the Kernel){' '}
                    </h3>{' '}
                    <h4 id="1_10" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        カーネルのバージョニング、デバイスドライバ、ロード可能カーネルモジュール（LKM）の管理を扱います。{' '}
                    </p>{' '}
                    <h4 id="2_10" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <p>
                        {' '}
                        Linuxカーネルはモジュール方式を採用しており、必要なドライバを実行中のカーネルに動的に組み込む（
                        <code>insmod</code>/<code>modprobe</code>）ことができます。{' '}
                    </p>{' '}
                    <Diagram id="diag-12" />{' '}
                    <p>
                        {' '}
                        カーネルのバージョン番号は <code>メジャー.マイナー.パッチ</code>（例:{' '}
                        <code>6.8.0</code>）の形式で管理され、安定版・LTS（Long Term
                        Support）版の選定がサーバー運用の可用性に直結します。{' '}
                    </p>{' '}
                    <h4 id="3_10" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    本番サーバーには可能な限りディストリビューションが提供するLTSカーネルを使う。独自ビルドカーネルは保守コストが高く、セキュリティパッチ適用が遅れがちになる。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    カーネルアップデート後は必ず再起動して新カーネルで正常起動することを確認する（クラウドでは事前にスナップショットを取得）。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    <code>dmesg</code>{' '}
                                    はカーネルが生成する一次情報であり、ハードウェア障害・OOM
                                    Killer発動・ドライバエラーの初動調査で最初に確認する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    Secure Boot有効環境、または{' '}
                                    <code>CONFIG_MODULE_SIG_FORCE=y</code> / 起動パラメータ{' '}
                                    <code>module.sig_enforce=1</code> が有効な環境では、
                                    <strong>
                                        未署名・未信頼のカーネルモジュールはカーネルがロードを拒否する
                                    </strong>
                                    （<code>modprobe</code> が{' '}
                                    <code>Key was rejected by service</code> で失敗し、
                                    <code>dmesg</code> に{' '}
                                    <code>Loading of unsigned module is rejected</code>{' '}
                                    が記録される）。第三者モジュールを使う場合は、正しい手順として自前のMOK（Machine
                                    Owner Key）を作成し、<code>kmodsign</code> /{' '}
                                    <code>scripts/sign-file</code> でモジュールを署名したうえで{' '}
                                    <code>mokutil --import &lt;公開鍵&gt;</code>{' '}
                                    で鍵を登録し、再起動時のMOK
                                    Managerで登録を承認する。DKMSは登録済みの鍵を使ってカーネル更新のたびに自動再署名できる。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    署名検証の無効化（Secure Bootの無効化や{' '}
                                    <code>module.sig_enforce=0</code>
                                    ）は、ブートチェーンの改ざん検知とルートキット対策を放棄することと引き換えの例外措置であり、恒久運用では採用しない。検証環境で一時的に用いる場合も、対象ホストと期間を限定する。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h4 id="4_9" tabIndex={-1}>
                        ④ コマンドリファレンス
                    </h4>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">コマンド</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <code>uname -r</code>
                                    </td>
                                    <td>現在のカーネルバージョン確認</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>lsmod</code>
                                    </td>
                                    <td>ロード済みモジュール一覧</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>modprobe &lt;module&gt;</code>
                                    </td>
                                    <td>モジュールのロード（依存解決込み）</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>dmesg -T</code>
                                    </td>
                                    <td>カーネルログの表示（人間可読な時刻付き）</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>sysctl -a</code>
                                    </td>
                                    <td>カーネルパラメータの一覧</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <hr />{' '}
                    <h3 id="12-printing" tabIndex={-1}>
                        第12章: 印刷 (Printing)
                    </h3>{' '}
                    <h4 id="1_11" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        CUPS（Common UNIX Printing
                        System）を用いた印刷サービスの構成を扱います。クラウドネイティブな環境では優先度は下がりますが、オフィス・研究機関のオンプレミス環境では依然として現役の知識です。{' '}
                    </p>{' '}
                    <h4 id="2_11" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <p>
                        {' '}
                        CUPSはIPP（Internet Printing
                        Protocol）を用いて、ネットワークプリンタへのジョブ投入・キュー管理・ドライバ変換を担います。{' '}
                    </p>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">構成要素</th>
                                    <th scope="col">役割</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <code>cupsd</code>
                                    </td>
                                    <td>印刷デーモン本体</td>
                                </tr>
                                <tr className="even">
                                    <td>PPDファイル</td>
                                    <td>プリンタ固有の機能定義</td>
                                </tr>
                                <tr className="odd">
                                    <td>印刷キュー</td>
                                    <td>ジョブの順序管理</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        Webインターフェース（<code>localhost:631</code>）
                                    </td>
                                    <td>ブラウザからの管理画面</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <h4 id="3_11" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    印刷サーバーの管理インターフェース（ポート631）は信頼できるネットワークセグメントに限定し、インターネットに公開しない。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    共有プリンタキューは部署単位でACLを設定し、意図しないジョブ投入（誤送信によるコスト・情報漏洩）を防ぐ。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h4 id="4_10" tabIndex={-1}>
                        ④ コマンドリファレンス
                    </h4>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">コマンド</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <code>lpstat -p</code>
                                    </td>
                                    <td>プリンタ状態の確認</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>lpadmin -p &lt;name&gt; -E -v &lt;uri&gt;</code>
                                    </td>
                                    <td>プリンタの追加・有効化</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>cancel &lt;job-id&gt;</code>
                                    </td>
                                    <td>印刷ジョブのキャンセル</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <hr />{' '}
                    <h2 id="2-networking" tabIndex={-1}>
                        第2部: ネットワーキング (Networking)
                    </h2>{' '}
                    <h3 id="13-tcpip-tcpip-networking" tabIndex={-1}>
                        {' '}
                        第13章: TCP/IPネットワーキング (TCP/IP Networking){' '}
                    </h3>{' '}
                    <h4 id="1_12" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        インターネットとイントラネットの通信基盤であるTCP/IPプロトコルスイートの基礎を扱います。{' '}
                    </p>{' '}
                    <h4 id="2_12" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <p>TCP/IPは階層化されたモデルで理解すると全体像が掴みやすくなります。</p>{' '}
                    <Diagram id="diag-13" />{' '}
                    <p>
                        {' '}
                        IPアドレスは32ビット（IPv4）または128ビット（IPv6）の識別子で、サブネットマスク（CIDR表記,
                        例: <code>/24</code>）によってネットワーク部とホスト部を区切ります。{' '}
                    </p>{' '}
                    <h4 id="3_12" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    IPv4アドレス枯渇と将来の拡張性を考慮し、新規インフラはIPv6デュアルスタック対応を初期設計に組み込む。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    サブネット設計は将来の成長を見込んで余裕を持たせる（過度に細かい{' '}
                                    <code>/30</code> 等の割当は後で行き詰まる）。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    ネットワークトラブル時は <code>ping</code>（疎通）→{' '}
                                    <code>traceroute</code>（経路）→ <code>ss</code>/
                                    <code>netstat</code>（ローカルソケット状態）→{' '}
                                    <code>tcpdump</code>
                                    （パケットキャプチャ）の順で切り分ける。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    本番環境のファイアウォールルールは「デフォルト拒否、必要な通信のみ許可（default
                                    deny）」を原則とする。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h4 id="4_11" tabIndex={-1}>
                        ④ コマンドリファレンス
                    </h4>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">コマンド</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <code>ip addr show</code>
                                    </td>
                                    <td>インターフェースのIPアドレス確認</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>ip route show</code>
                                    </td>
                                    <td>ルーティングテーブル表示</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>ss -tulnp</code>
                                    </td>
                                    <td>リスニングポート一覧（netstatの後継）</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>tcpdump -i eth0 port 443</code>
                                    </td>
                                    <td>パケットキャプチャ</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>dig</code> / <code>nslookup</code>
                                    </td>
                                    <td>DNS問い合わせ</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>curl -v https://example.com</code>
                                    </td>
                                    <td>HTTP通信の詳細確認</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <hr />{' '}
                    <h3 id="14-physical-networking" tabIndex={-1}>
                        {' '}
                        第14章: 物理ネットワーキング (Physical Networking){' '}
                    </h3>{' '}
                    <h4 id="1_13" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        Ethernet・Wi-Fi・SDN（ソフトウェア定義ネットワーキング）・配線・機材選定など、物理層〜データリンク層の実務を扱います。{' '}
                    </p>{' '}
                    <h4 id="2_13" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">項目</th>
                                    <th scope="col">概要</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Ethernet規格</td>
                                    <td>
                                        {' '}
                                        1GbE, 10GbE,
                                        25/40/100GbEなど。データセンターでは25GbE以上が主流になりつつある{' '}
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>二重化（Bonding/LACP）</td>
                                    <td>複数の物理NICを論理的に束ね、帯域拡張と冗長性を両立</td>
                                </tr>
                                <tr className="odd">
                                    <td>SDN（Software-Defined Networking）</td>
                                    <td>
                                        {' '}
                                        制御プレーンとデータプレーンを分離し、ネットワーク構成をソフトウェアで一元管理{' '}
                                    </td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <h4 id="3_13" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    サーバーの物理NICは可能な限り2枚以上を異なるスイッチに接続し、スイッチ単体障害に耐える構成にする。LACP（802.3ad）ボンディングを使えるのは、MLAG・スタック・MC-LAGなど接続先スイッチが単一の論理ピアとして動作する場合に限られる。互いに独立したスイッチへ接続する構成では{' '}
                                    <code>active-backup</code>（mode=1）を使う。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    ラック配線は将来の増設・トラブルシューティングを見据え、ラベリングと配線図の維持を怠らない。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    Wi-Fiは管理用ネットワークとしては極力使わず、帯域外管理（IPMI/iDRAC/iLO等の専用ポート）を用意する。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <hr />{' '}
                    <h3 id="15-ip-ip-routing" tabIndex={-1}>
                        第15章: IPルーティング (IP Routing)
                    </h3>{' '}
                    <h4 id="1_14" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        パケットが送信元から宛先までどのように転送されるか、静的・動的ルーティングの仕組みを扱います。{' '}
                    </p>{' '}
                    <h4 id="2_14" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <Diagram id="diag-14" />{' '}
                    <p>
                        {' '}
                        動的ルーティングプロトコル（OSPF,
                        BGPなど）は、経路情報をルーター間で自動交換し、経路変化に追従します。BGPはインターネット全体の経路制御を担う「インターネットの背骨」です。{' '}
                    </p>{' '}
                    <h4 id="3_14" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    小規模・単純なネットワークでは静的ルートで十分。動的ルーティングは複数経路・冗長化が必要な規模から導入を検討する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    ルーティングテーブルの変更は必ず現在の到達性を確認した上で行う（リモート作業中の誤設定は自分自身を隔離するリスクがある
                                    — コンソールアクセスを確保してから作業する）。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <hr />{' '}
                    <h3 id="16-dns-dns-the-domain-name-system" tabIndex={-1}>
                        {' '}
                        第16章: DNS - ドメインネームシステム (DNS: The Domain Name System){' '}
                    </h3>{' '}
                    <h4 id="1_15" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        人間可読なドメイン名をIPアドレスへ変換する、インターネットの「電話帳」の仕組みと構築方法を扱います。{' '}
                    </p>{' '}
                    <h4 id="2_15" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <Diagram id="diag-15" />{' '}
                    <p>
                        {' '}
                        DNSSECは、DNS応答に暗号署名を付与し、キャッシュポイズニングなどの改ざん攻撃から保護する拡張です。ただし普及状況を語る数値は
                        <strong>測定時点・測定対象・指標</strong>
                        によって大きく異なるため、必ず分けて読む必要があります。{' '}
                    </p>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">指標</th>
                                    <th scope="col">測定対象</th>
                                    <th scope="col">値と測定時点</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>TLD署名率</td>
                                    <td>
                                        ルートゾーンに委任されたTLDのうち、DSレコードを保有する割合
                                    </td>
                                    <td>約92%（2023年9月時点）</td>
                                </tr>
                                <tr className="even">
                                    <td>2LD署名率</td>
                                    <td>
                                        {' '}
                                        <code>.com</code>・<code>.net</code>{' '}
                                        配下の第2レベルドメインのうち、署名済みの割合{' '}
                                    </td>
                                    <td>一桁%台（2023年9月時点）</td>
                                </tr>
                                <tr className="odd">
                                    <td>リゾルバ検証率</td>
                                    <td>
                                        {' '}
                                        DNSSEC検証を行う再帰リゾルバ経由で解決される問い合わせの割合。上記2つ（署名側の指標）とは別軸の
                                        <strong>検証側</strong>の指標{' '}
                                    </td>
                                    <td>約30%（2023年9月時点）</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <p>
                        {' '}
                        TLDという「器」はほぼ署名済みである一方、その配下の実ドメインはほとんど署名されておらず、署名されていても検証されるとは限らない——この署名側と検証側のギャップが繰り返し指摘されています。{' '}
                    </p>{' '}
                    <h4 id="3_15" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    権威DNSサーバーと再帰リゾルバの役割を混同しない。権威サーバーはゾーン情報を「答える」役割、再帰リゾルバは外部への「問い合わせを代行する」役割で、同一サーバーに同居させると設定ミスやキャッシュポイズニングのリスクが増す。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    重要なドメイン（ログインポータル、決済関連）はDNSSECでゾーンに署名し、自組織が管理する再帰リゾルバ側でも検証（validation）を有効化する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    ゾーンファイルの変更はTTLを考慮した計画的なロールアウトを行う（切り替え直前は一時的にTTLを短縮しておく）。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    名前解決のトラブルシューティングは <code>dig +trace</code>{' '}
                                    で権威委任のチェーンを実際にたどって確認する。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h4 id="4_12" tabIndex={-1}>
                        ④ コマンドリファレンス
                    </h4>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">コマンド</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <code>dig example.com A</code>
                                    </td>
                                    <td>Aレコードの問い合わせ</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>dig +trace example.com</code>
                                    </td>
                                    <td>権威委任チェーンの追跡</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>dig +dnssec example.com</code>
                                    </td>
                                    <td>DNSSEC署名情報付きで問い合わせ</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>named-checkzone</code>
                                    </td>
                                    <td>BINDゾーンファイルの構文検証</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>unbound-control status</code>
                                    </td>
                                    <td>Unboundの稼働状況確認</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <blockquote>
                        {' '}
                        <p>
                            {' '}
                            出典: ControlD「DNS Security Best Practices For Forward-Thinking
                            Businesses」 —{' '}
                            <a href="https://controld.com/blog/dns-security-best-practices/">
                                https://controld.com/blog/dns-security-best-practices/
                            </a>{' '}
                            ／ SHPV「DNSSEC en 2026」（ルートゾーン署名率・主要TLD採用率の実測値） —{' '}
                            <a href="https://www.shpv.fr/blog/dnssec-configuration/">
                                https://www.shpv.fr/blog/dnssec-configuration/
                            </a>{' '}
                            ／ Sesame Disk「Secure DNS Updates in
                            2026」（DNSSEC署名済みゾーン8%・エンドツーエンド検証1%未満の指摘） —{' '}
                            <a href="https://sesamedisk.com/secure-dns-updates-rfc-2136-ipv6-dnssec-2026/">
                                https://sesamedisk.com/secure-dns-updates-rfc-2136-ipv6-dnssec-2026/
                            </a>{' '}
                        </p>{' '}
                    </blockquote>{' '}
                    <hr />{' '}
                    <h3 id="17-single-sign-on" tabIndex={-1}>
                        第17章: シングルサインオン (Single Sign-On)
                    </h3>{' '}
                    <h4 id="1_16" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        一度の認証で複数システムへアクセスできるSSOの仕組み（Kerberos, SAML,
                        OIDC）を扱います。なおLDAPはSSOのプロトコルそのものではなく、ユーザー・グループ情報を保持する
                        <strong>ディレクトリ</strong>
                        （および認証バックエンド）であり、上記のSSO技術と組み合わせて使われる構成要素です。ユーザーのSSO（認証）に用いるのはOIDCであり、OAuth
                        2.0はAPIアクセスを委任するための<strong>認可</strong>
                        フレームワークです。OIDCはOAuth 2.0の上に構築された認証レイヤーであり、OAuth
                        2.0単体は認証方式ではない点に注意してください。{' '}
                    </p>{' '}
                    <h4 id="2_16" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <Diagram id="diag-16" />{' '}
                    <p>
                        {' '}
                        Kerberosはチケットベースの認証プロトコルで、企業内Active
                        Directory環境の中核をなします。SAML/OIDCはWebアプリケーション向けの現代的な標準です。{' '}
                    </p>{' '}
                    <h4 id="3_16" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    新規に自前で認証機構を実装しない。実績のあるIdP（Keycloak, Okta,
                                    Azure AD等）とOIDC/SAMLの標準プロトコルに乗る。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    サービスアカウント・機械間通信にはmTLSやOAuth2クライアントクレデンシャルフローを用い、人間用の認証情報を流用しない。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    トークンの有効期限は業務要件と天秤にかけた上で短めに設定し、リフレッシュトークンのローテーションを行う。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <hr />{' '}
                    <h3 id="18-electronic-mail" tabIndex={-1}>
                        第18章: 電子メール (Electronic Mail)
                    </h3>{' '}
                    <h4 id="1_17" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        SMTPによるメール配送の仕組みと、なりすまし対策（SPF/DKIM/DMARC）を扱います。
                    </p>{' '}
                    <h4 id="2_17" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <Diagram id="diag-17" />{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">技術</th>
                                    <th scope="col">役割</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>SPF</td>
                                    <td>送信元IPが正規のものかDNS TXTレコードで検証</td>
                                </tr>
                                <tr className="even">
                                    <td>DKIM</td>
                                    <td>メール本文への電子署名で改ざん検知</td>
                                </tr>
                                <tr className="odd">
                                    <td>DMARC</td>
                                    <td>
                                        {' '}
                                        SPF/DKIMの認証結果に加え、認証されたドメインがヘッダFromのドメインと一致するか（identifier
                                        alignment）を評価。整合する認証結果が1つもない場合の処理（隔離・拒否など）を{' '}
                                        <code>p</code> ポリシーで宣言{' '}
                                    </td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <h4 id="3_17" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    自組織ドメインからの送信メールには必ずSPF・DKIM・DMARCの3点セットを設定する。未設定はフィッシングへの悪用や、正規メールの迷惑メール判定を招く。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    メールサーバーをオープンリレーにしない（第三者中継を許可しない設定を確認する）。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    大量配信（マーケティングメール等）はレピュテーション管理された専用サービス（SES,
                                    SendGrid等）に分離し、トランザクションメールのIPレピュテーションを守る。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <hr />{' '}
                    <h3 id="19-web-web-hosting" tabIndex={-1}>
                        第19章: Webホスティング (Web Hosting)
                    </h3>{' '}
                    <h4 id="1_18" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>Webサーバー・リバースプロキシ・TLS終端・スケールアウト構成を扱います。</p>{' '}
                    <h4 id="2_18" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <Diagram id="diag-18" />{' '}
                    <p>
                        {' '}
                        TLS証明書は現在、Let&apos;s
                        Encryptに代表される無料の自動発行認証局が普及し、
                        <code>certbot</code> や <code>acme.sh</code>{' '}
                        によるACMEプロトコル自動更新が標準的です。{' '}
                    </p>{' '}
                    <h4 id="3_18" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    TLS証明書の自動更新を必ず設定し、手動更新に頼らない（有効期限切れによるサービス停止は最も「防げたはずの」障害の一つ）。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    HTTPは常にHTTPSへリダイレクトし、
                                    <code>Strict-Transport-Security</code>
                                    （HSTS）ヘッダーを設定する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    リバースプロキシでリクエストレート制限・タイムアウトを設定し、単一の遅いバックエンドがサービス全体を巻き込まないようにする。{' '}
                                </li>{' '}
                                <li>
                                    静的アセットはCDN経由で配信し、オリジンサーバーの負荷を下げる。
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <hr />{' '}
                    <h2 id="3-storage" tabIndex={-1}>
                        第3部: ストレージ (Storage)
                    </h2>{' '}
                    <h3 id="20-storage" tabIndex={-1}>
                        第20章: ストレージ (Storage)
                    </h3>{' '}
                    <h4 id="1_19" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        物理ディスク〜RAID〜LVM〜ファイルシステムに至るストレージスタック全体の設計を扱います。{' '}
                    </p>{' '}
                    <h4 id="2_19" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <h5 id="raid" tabIndex={-1}>
                        RAIDレベル比較
                    </h5>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">RAIDレベル</th>
                                    <th scope="col">方式</th>
                                    <th scope="col">最小ディスク数</th>
                                    <th scope="col">耐障害性</th>
                                    <th scope="col">特徴</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>RAID 0</td>
                                    <td>ストライピング</td>
                                    <td>2</td>
                                    <td>なし</td>
                                    <td>高速だが1台故障で全損</td>
                                </tr>
                                <tr className="even">
                                    <td>RAID 1</td>
                                    <td>ミラーリング</td>
                                    <td>2</td>
                                    <td>1台故障まで耐える</td>
                                    <td>単純・信頼性高いが容量効率50%</td>
                                </tr>
                                <tr className="odd">
                                    <td>RAID 5</td>
                                    <td>パリティ分散</td>
                                    <td>3</td>
                                    <td>1台故障まで耐える</td>
                                    <td>容量効率が良いが書き込み性能に制約</td>
                                </tr>
                                <tr className="even">
                                    <td>RAID 6</td>
                                    <td>二重パリティ</td>
                                    <td>4</td>
                                    <td>2台故障まで耐える</td>
                                    <td>大容量ディスクでのリビルド中障害に強い</td>
                                </tr>
                                <tr className="odd">
                                    <td>RAID 10</td>
                                    <td>ミラー+ストライプ</td>
                                    <td>4</td>
                                    <td>各ミラーペアで1台まで</td>
                                    <td>高速・高信頼性、容量効率50%</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <h5 id="lvm3" tabIndex={-1}>
                        LVMの3層構造
                    </h5>{' '}
                    <Diagram id="diag-19" />{' '}
                    <h5 id="_3" tabIndex={-1}>
                        ファイルシステム選定の目安
                    </h5>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">ファイルシステム</th>
                                    <th scope="col">得意な用途</th>
                                    <th scope="col">特記事項</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>ext4</td>
                                    <td>汎用・互換性重視</td>
                                    <td>
                                        {' '}
                                        縮小可能、枯れた実績、小ファイル/メタデータ操作が多いワークロードに強い{' '}
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>XFS</td>
                                    <td>大容量ファイル・DB・高スループット</td>
                                    <td>
                                        {' '}
                                        RHEL系の既定FS。拡張のみ可能で縮小不可（アーキテクチャ上の制約）{' '}
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>Btrfs</td>
                                    <td>スナップショット・圧縮・整合性検証</td>
                                    <td>
                                        {' '}
                                        openSUSE/Fedora既定。RAID5/6機能は本番非推奨とされる場合がある{' '}
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>ZFS</td>
                                    <td>エンタープライズストレージ全般</td>
                                    <td>チェックサム・重複排除・スナップショットを統合提供</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <h4 id="3_19" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    本番用途ではRAID 5は避け、RAID 6またはRAID
                                    10を優先する。大容量ディスク（10TB超）ではリビルド中の追加故障確率が無視できず、RAID
                                    5は実質的にデータ損失リスクを内包する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    <code>mdadm</code>（ソフトウェアRAID）+
                                    LVM（論理ボリューム管理）+
                                    XFS/ext4（ファイルシステム）を組み合わせるのが、ディスク冗長性・柔軟なリサイズ・実績のあるFSを両立する定番構成。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    RAIDやディスクの健康状態を <code>smartctl</code> と{' '}
                                    <code>mdadm --detail</code>{' '}
                                    で定期監視し、故障予兆をアラート化する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    XFSはオンラインでの拡張はできるが縮小できない、という制約をボリューム設計時に織り込む。将来的な縮小が必要な用途では縮小可能なext4を選ぶ。縮小はアンマウント
                                    → <code>resize2fs</code>（FS縮小）→ <code>lvreduce</code>
                                    （LV縮小）の順で行う（逆順はデータ破壊を招く）。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    LVM thin
                                    provisioningはファイルシステムの縮小手段ではなく、割り当ての遅延によって過剰プロビジョニングを可能にする仕組みである。thinプールのデータ領域またはメタデータ領域が枯渇すると書き込みが失敗するため、使用率の監視と自動拡張の設定が必須。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    バックアップは「RAIDの代わり」ではない。RAIDは可用性のための冗長化であり、誤削除・ランサムウェア・論理障害からはバックアップでしか守れない。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h4 id="4_13" tabIndex={-1}>
                        ④ コマンドリファレンス
                    </h4>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">コマンド</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        {' '}
                                        <code>pvcreate</code> / <code>vgcreate</code> /{' '}
                                        <code>lvcreate</code>{' '}
                                    </td>
                                    <td>LVMの物理・ボリュームグループ・論理ボリューム作成</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>lvextend -L +50G /dev/vg/lv</code>
                                    </td>
                                    <td>論理ボリュームの拡張</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        {' '}
                                        <code>
                                            mdadm --create /dev/md0 --level=1 --raid-devices=2
                                            /dev/sdb /dev/sdc
                                        </code>{' '}
                                    </td>
                                    <td>
                                        {' '}
                                        ソフトウェアRAID作成。<strong>警告</strong>:
                                        指定したデバイス上の既存データは破壊またはアクセス不能になる。実行前に{' '}
                                        <code>lsblk</code> で <code>/dev/sdb</code>{' '}
                                        <code>/dev/sdc</code>{' '}
                                        の実体を確認し、未マウントかつデータのないRAID専用ディスク（またはパーティション）だけを指定すること。必要なデータは事前にバックアップする{' '}
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>mdadm --detail /dev/md0</code>
                                    </td>
                                    <td>RAIDアレイの状態確認</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>smartctl -a /dev/sda</code>
                                    </td>
                                    <td>ディスクのS.M.A.R.T.情報確認</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>mkfs.xfs</code> / <code>mkfs.ext4</code>
                                    </td>
                                    <td>ファイルシステム作成</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <blockquote>
                        {' '}
                        <p>
                            {' '}
                            出典: FOSS Linux「Linux Storage Deep Dive: LVM, mdadm, ZFS RAID」（Arjun
                            K.氏, 2026年6月） —{' '}
                            <a href="https://www.fosslinux.com/158254/linux-storage-deep-dive-lvm-mdadm-and-zfs-raid.htm">
                                https://www.fosslinux.com/158254/linux-storage-deep-dive-lvm-mdadm-and-zfs-raid.htm
                            </a>{' '}
                            ／ LinuxTeck「Linux File System Comparison ext4 xfs btrfs — Best Choice
                            for Production 2026」 —{' '}
                            <a href="https://www.linuxteck.com/linux-file-system-comparison-ext4-xfs-btrfs/">
                                https://www.linuxteck.com/linux-file-system-comparison-ext4-xfs-btrfs/
                            </a>{' '}
                            ／ Red Hat公式ドキュメント「Chapter 3. The XFS File System」 —{' '}
                            <a href="https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/7/html/storage_administration_guide/ch-xfs">
                                https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/7/html/storage_administration_guide/ch-xfs
                            </a>{' '}
                        </p>{' '}
                    </blockquote>{' '}
                    <hr />{' '}
                    <h3 id="21-the-network-file-system-nfs" tabIndex={-1}>
                        {' '}
                        第21章: ネットワークファイルシステム (The Network File System, NFS){' '}
                    </h3>{' '}
                    <h4 id="1_20" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        複数のクライアントからネットワーク越しにファイルシステムを共有するNFSの仕組みを扱います。{' '}
                    </p>{' '}
                    <h4 id="2_20" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <Diagram id="diag-20" />{' '}
                    <p>
                        {' '}
                        現行の主流はNFSv4で、単一ポート（TCP
                        2049）での通信・統合されたロック機構・Kerberosによる強固な認証（
                        <code>sec=krb5p</code>）をサポートします。{' '}
                    </p>{' '}
                    <h4 id="3_20" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    新規構築ではNFSv3ではなくNFSv4系を採用する。ポート集約によりファイアウォール設定が単純化し、セキュリティも向上する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    <code>
                                        no_root_squash
                                    </code> は特別な理由がない限り避ける（既定の{' '}
                                    <code>root_squash</code>{' '}
                                    はクライアント側rootの権限をサーバー側で無権限ユーザーへマッピングし、権限昇格の悪用を防ぐ）。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    パフォーマンスが重要な用途では、マウントオプション（
                                    <code>rsize</code>/<code>wsize</code>
                                    ）をネットワーク帯域・レイテンシに合わせてチューニングする。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    NFSサーバーの単一障害点化を避けるため、重要用途ではHA構成や、クラウドではマネージドファイルサービス（EFS,
                                    Filestore等）の利用を検討する。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h4 id="4_14" tabIndex={-1}>
                        ④ コマンドリファレンス
                    </h4>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">コマンド</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <code>exportfs -av</code>
                                    </td>
                                    <td>
                                        <code>/etc/exports</code> の設定を反映
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>showmount -e server</code>
                                    </td>
                                    <td>
                                        {' '}
                                        サーバーが公開しているエクスポート一覧（NFSv3の MOUNT
                                        プロトコル / <code>rpc.mountd</code>{' '}
                                        に依存）。MOUNTサービスを持たないNFSv4専用サーバーでは失敗する{' '}
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>exportfs -s</code>（サーバー側）
                                    </td>
                                    <td>
                                        {' '}
                                        サーバー上でアクティブなエクスポートを{' '}
                                        <code>/etc/exports</code>{' '}
                                        形式で表示する。サーバーにログインできる場合の確認手段{' '}
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        {' '}
                                        <code>mount -t nfs4 server:/ /mnt</code> →{' '}
                                        <code>ls /mnt</code>{' '}
                                    </td>
                                    <td>
                                        {' '}
                                        クライアント側からの確認手順。NFSv4の疑似ルート（pseudo-root）をマウントし、
                                        <code>ls</code>{' '}
                                        でクライアントから見える名前空間を実際にたどる{' '}
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>mount -t nfs4 server:/data /mnt</code>
                                    </td>
                                    <td>NFSv4マウント</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>nfsstat</code>
                                    </td>
                                    <td>NFS統計情報の確認</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <hr />{' '}
                    <h3 id="22-smb-server-message-block" tabIndex={-1}>
                        第22章: SMB (Server Message Block)
                    </h3>{' '}
                    <h4 id="1_21" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        Windows環境との相互運用を担うSMB/CIFSプロトコルと、Linux側実装であるSambaを扱います。{' '}
                    </p>{' '}
                    <h4 id="2_21" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <p>
                        {' '}
                        Sambaは、LinuxサーバーをWindowsファイルサーバー・ドメインコントローラとして機能させるオープンソース実装です。混在環境（Windows端末＋Linuxサーバー）では依然として重要な選択肢です。{' '}
                    </p>{' '}
                    <h4 id="3_21" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    SMBv1/CIFSは既知の重大な脆弱性（EternalBlue等）があるため、必ず無効化しSMBv2/v3のみを許可する（方言の設定）。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    認証プロトコルは方言とは別に設定する。特にNTLMv1は容易に破られるため使用を禁止し、NTLMv2以上またはKerberosに限定する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    Samba設定ファイル <code>smb.conf</code>{' '}
                                    の共有定義は、Linux側のファイルパーミッションと二重に整合性を取る（SMB側ACLとPOSIXパーミッションの不一致がアクセス不能・過剰許可の原因になりやすい）。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    Active Directoryとの統合（<code>winbind</code>または
                                    <code>sssd</code>
                                    ）を使い、ローカルSambaユーザーの二重管理を避ける。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h4 id="4_15" tabIndex={-1}>
                        ④ コマンドリファレンス
                    </h4>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">コマンド</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <code>testparm</code>
                                    </td>
                                    <td>
                                        <code>smb.conf</code> の構文チェック
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>smbclient -L server</code>
                                    </td>
                                    <td>共有一覧の確認</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>pdbedit -L</code>
                                    </td>
                                    <td>Sambaユーザーデータベースの一覧</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>smbstatus</code>
                                    </td>
                                    <td>現在の接続状況確認</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <hr />{' '}
                    <h2 id="4-operations" tabIndex={-1}>
                        第4部: 運用 (Operations)
                    </h2>{' '}
                    <h3 id="23-configuration-management" tabIndex={-1}>
                        {' '}
                        第23章: 構成管理 (Configuration Management){' '}
                    </h3>{' '}
                    <h4 id="1_22" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        サーバー台数が増えても手作業を繰り返さず、「あるべき状態」をコードで宣言し自動的に収束させる構成管理ツール（Ansible,
                        Puppet, Chef等）を扱います。{' '}
                    </p>{' '}
                    <h4 id="2_22" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <p>
                        {' '}
                        Ansibleはエージェントレス（管理対象にソフトウェアを事前導入する必要がない）でSSH経由に処理を実行する構成管理ツールとして、現在最も広く使われているツールの一つです。{' '}
                    </p>{' '}
                    <Diagram id="diag-21" />{' '}
                    <p>
                        {' '}
                        <strong>冪等性（idempotency）</strong>
                        が構成管理の中核概念です。同じPlaybookを何度実行しても、既に望ましい状態であれば「何もしない」、そうでなければ「差分だけを適用する」という性質を指します。{' '}
                    </p>{' '}
                    <h4 id="3_22" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    <code>command</code>/<code>shell</code> モジュールの多用を避け、
                                    <code>package</code>/<code>service</code>/<code>copy</code>/
                                    <code>template</code>
                                    等の専用モジュールを優先する。専用モジュールは状態チェックを内蔵しており冪等性が保証されるが、
                                    <code>shell</code>は明示的に <code>creates=</code>/
                                    <code>changed_when</code>{' '}
                                    を書かない限り毎回「変更あり」と報告してしまう。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    Playbook・Role・インベントリはすべてGitでバージョン管理し、レビュープロセスを経てから適用する（インフラの変更もコードレビューの対象にする）。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    変更適用前に必ず <code>--check</code>
                                    （ドライラン）モードで差分を確認する習慣をつける。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    環境差異（開発・ステージング・本番）は変数ファイルで分離し、Playbook本体はロジックを共通化する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    秘密情報（パスワード・APIキー）は平文でリポジトリに置かず、
                                    <code>ansible-vault</code>{' '}
                                    や外部シークレットマネージャーと連携する。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h4 id="4_16" tabIndex={-1}>
                        ④ コマンドリファレンス
                    </h4>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">コマンド</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <code>ansible-playbook site.yml --check</code>
                                    </td>
                                    <td>ドライラン実行</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>ansible-playbook site.yml --diff</code>
                                    </td>
                                    <td>変更差分の表示</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>ansible all -m ping</code>
                                    </td>
                                    <td>疎通確認</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>ansible-vault encrypt secrets.yml</code>
                                    </td>
                                    <td>秘密情報の暗号化</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>ansible-lint</code>
                                    </td>
                                    <td>Playbookの静的解析</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <blockquote>
                        {' '}
                        <p>
                            {' '}
                            出典: Spacelift「Infrastructure as Code with Ansible: Tutorial」 —{' '}
                            <a href="https://spacelift.io/blog/ansible-infrastructure-as-code">
                                https://spacelift.io/blog/ansible-infrastructure-as-code
                            </a>{' '}
                            ／ OneUptime「How to Fix &apos;Changed Status&apos; Idempotency
                            Issues」（
                            <code>command</code>/<code>shell</code>モジュールの冪等性問題と対処） —{' '}
                            <a href="https://oneuptime.com/blog/post/2026-01-24-ansible-changed-status-idempotency/view">
                                https://oneuptime.com/blog/post/2026-01-24-ansible-changed-status-idempotency/view
                            </a>{' '}
                            ／ OneUptime「How to Write Idempotent Ansible Tasks」 —{' '}
                            <a href="https://oneuptime.com/blog/post/2026-02-21-how-to-write-idempotent-ansible-tasks/view">
                                https://oneuptime.com/blog/post/2026-02-21-how-to-write-idempotent-ansible-tasks/view
                            </a>{' '}
                        </p>{' '}
                    </blockquote>{' '}
                    <hr />{' '}
                    <h3 id="24-virtualization" tabIndex={-1}>
                        第24章: 仮想化 (Virtualization)
                    </h3>{' '}
                    <h4 id="1_23" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        1台の物理マシン上で複数の独立したOS環境を動かす仮想化技術（ハイパーバイザー）を扱います。{' '}
                    </p>{' '}
                    <h4 id="2_23" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <Diagram id="diag-22" />{' '}
                    <p>
                        {' '}
                        LinuxではKVM（Kernel-based Virtual
                        Machine）がType-1ハイパーバイザーの標準実装であり、多くのクラウドプラットフォームの基盤技術でもあります。{' '}
                    </p>{' '}
                    <h4 id="3_23" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    本番環境ではType-1（ベアメタル型）ハイパーバイザーを採用する。ホストOSを経由しない分、オーバーヘッドが小さく攻撃対象領域（アタックサーフェス）も狭い。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    仮想マシンのリソース（CPU/メモリ）は物理ホストに対して過剰にオーバーコミットしない。特にメモリのオーバーコミットはスワップ多発によるレイテンシ悪化を招く。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    ゲストOSにも独立してセキュリティパッチ適用・監視を行う。ハイパーバイザーが安全でもゲストが脆弱なら意味がない。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <hr />{' '}
                    <h3 id="25-containers" tabIndex={-1}>
                        第25章: コンテナ (Containers)
                    </h3>{' '}
                    <h4 id="1_24" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        仮想マシンより軽量なプロセスレベルの隔離技術であるコンテナ（Docker, Podman,
                        Kubernetes）を扱います。{' '}
                    </p>{' '}
                    <h4 id="2_24" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <p>
                        {' '}
                        コンテナは仮想マシンとは異なり、ハードウェアをエミュレートせず、Linuxカーネルの機能（namespaces
                        と cgroups）を用いてホストOS上のプロセスを隔離します。{' '}
                    </p>{' '}
                    <Diagram id="diag-23" />{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">隔離技術</th>
                                    <th scope="col">役割</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Namespaces</td>
                                    <td>
                                        {' '}
                                        PID・ネットワーク・マウント・ホスト名などの「見える範囲」をプロセスごとに分離{' '}
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>cgroups (Control Groups)</td>
                                    <td>CPU・メモリ・I/O帯域の割当上限を強制</td>
                                </tr>
                                <tr className="odd">
                                    <td>OverlayFS</td>
                                    <td>
                                        {' '}
                                        イメージレイヤーをCopy-on-Writeで重ね合わせ、ディスク使用量とビルド時間を削減{' '}
                                    </td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <p>
                        {' '}
                        単体のコンテナランタイム（Docker/Podman）は1台のホストに閉じますが、複数ホストにまたがるオーケストレーション（スケジューリング・自己修復・スケーリング）を担うのがKubernetesです。{' '}
                    </p>{' '}
                    <h4 id="3_24" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    コンテナはrootユーザーで実行しない（<code>USER</code>{' '}
                                    ディレクティブで非特権ユーザーを指定）。rootで動くコンテナは、コンテナエスケープが発生した際にホストへの権限昇格リスクを高める。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    イメージは最小構成のベースイメージ（distroless,
                                    alpine等）を使い、不要なパッケージ・シェルを含めない —
                                    攻撃対象領域の縮小とイメージサイズ削減を両立する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    コンテナは「軽量なVM」ではなく「隔離されたプロセス」である、という認識を持つ。永続化が必要なデータはコンテナ内に置かず、ボリュームや外部ストレージに分離する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    本番運用では単発の <code>docker run</code>{' '}
                                    ではなく、Kubernetes等のオーケストレーターで自己修復（クラッシュ時再起動）・水平スケーリングを構成する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    VMとコンテナは「どちらか一方」ではなく併用が一般的（VMでセキュリティ境界を確保し、その中でコンテナを高密度に稼働させる）。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h4 id="4_17" tabIndex={-1}>
                        ④ コマンドリファレンス
                    </h4>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">コマンド</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <code>docker build -t app:1.0 .</code>
                                    </td>
                                    <td>イメージビルド</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>docker run --rm -it app:1.0</code>
                                    </td>
                                    <td>コンテナ起動（使い捨て）</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>docker ps</code>
                                    </td>
                                    <td>稼働中コンテナ一覧</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>kubectl get pods</code>
                                    </td>
                                    <td>Kubernetes Pod一覧</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>kubectl describe pod &lt;name&gt;</code>
                                    </td>
                                    <td>Podの詳細・イベント確認</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>kubectl logs &lt;pod&gt;</code>
                                    </td>
                                    <td>ログ確認</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <blockquote>
                        {' '}
                        <p>
                            {' '}
                            出典: Northflank「Containers vs virtual machines: key differences and
                            when to use each (2026)」 —{' '}
                            <a href="https://northflank.com/blog/containers-vs-virtual-machines">
                                https://northflank.com/blog/containers-vs-virtual-machines
                            </a>{' '}
                            ／ AWS公式「Docker vs VM」比較ドキュメント —{' '}
                            <a href="https://aws.amazon.com/compare/the-difference-between-docker-vm/">
                                https://aws.amazon.com/compare/the-difference-between-docker-vm/
                            </a>{' '}
                            ／ Luminhkhuong Engineering Knowledge Base「VMs vs. Docker vs.
                            Kubernetes」（namespaces/cgroups/OverlayFS/OCIランタイムスタックの技術解説）
                            —{' '}
                            <a href="https://luminhkhuong.dev/technical-knowledge/devops/vm-docker-k8s-explained/">
                                https://luminhkhuong.dev/technical-knowledge/devops/vm-docker-k8s-explained/
                            </a>{' '}
                        </p>{' '}
                    </blockquote>{' '}
                    <hr />{' '}
                    <h3 id="26-continuous-integration-and-delivery-cicd" tabIndex={-1}>
                        {' '}
                        第26章: 継続的インテグレーションとデリバリー (Continuous Integration and
                        Delivery, CI/CD){' '}
                    </h3>{' '}
                    <h4 id="1_25" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        コード変更をビルド・テスト・デプロイまで自動化するパイプラインの設計を扱います。{' '}
                    </p>{' '}
                    <h4 id="2_25" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <Diagram id="diag-24" />{' '}
                    <p>
                        {' '}
                        「継続的デリバリー（Continuous
                        Delivery）」は本番デプロイ可能な状態を常に維持することを指し、「継続的デプロイ（Continuous
                        Deployment）」はそこからさらに人手の承認なしで自動的に本番反映することを指します。両者はしばしば混同されますが、明確に異なる概念です。{' '}
                    </p>{' '}
                    <h4 id="3_25" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    パイプラインの各ステージは「早く失敗する（fail
                                    fast）」順に並べる。実行コストの軽いLintを最初に、時間のかかる統合テストを後段に配置し、フィードバックループを最短化する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    テストが通らない限りマージできないブランチ保護ルールを設定し、「グリーンなmain」を常に維持する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    本番デプロイはBlue-GreenまたはCanaryなど、即座にロールバック可能な戦略を採用する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    CI環境自体もIaCで管理し、CIツールの設定変更もコードレビューの対象にする。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    ビルドしたコンテナイメージは脆弱性スキャンを通し、既知のCVEを含むイメージを本番に出さない。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h4 id="4_18" tabIndex={-1}>
                        ④ 主要ツール
                    </h4>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">カテゴリ</th>
                                    <th scope="col">代表的ツール</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>CI/CDプラットフォーム</td>
                                    <td>GitHub Actions, GitLab CI, Jenkins, CircleCI</td>
                                </tr>
                                <tr className="even">
                                    <td>コンテナレジストリ</td>
                                    <td>Docker Hub, GitHub Container Registry, Amazon ECR</td>
                                </tr>
                                <tr className="odd">
                                    <td>脆弱性スキャン</td>
                                    <td>Trivy, Grype, Snyk</td>
                                </tr>
                                <tr className="even">
                                    <td>デプロイ戦略ツール</td>
                                    <td>Argo CD (GitOps), Spinnaker</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <hr />{' '}
                    <h3 id="27-security" tabIndex={-1}>
                        第27章: セキュリティ (Security)
                    </h3>{' '}
                    <h4 id="1_26" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        システム全体を防御するための多層防御（Defense in
                        Depth）の考え方、SSH強化、脆弱性管理、監査を扱います。{' '}
                    </p>{' '}
                    <h4 id="2_26" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <Diagram id="diag-25" />{' '}
                    <h5 id="sshetcsshsshd_config" tabIndex={-1}>
                        {' '}
                        SSHハードニングのチェックリスト（<code>/etc/ssh/sshd_config</code>）{' '}
                    </h5>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">設定項目</th>
                                    <th scope="col">推奨値</th>
                                    <th scope="col">理由</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <code>PasswordAuthentication</code>
                                    </td>
                                    <td>
                                        <code>no</code>
                                    </td>
                                    <td>
                                        パスワード認証経路を無効化し、総当たり攻撃の対象を減らす
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>KbdInteractiveAuthentication</code>
                                    </td>
                                    <td>
                                        <code>no</code>
                                    </td>
                                    <td>
                                        {' '}
                                        <code>UsePAM yes</code> の環境では keyboard-interactive
                                        経由でパスワード認証が残るため、併せて無効化する（MFAを
                                        keyboard-interactive で実装する場合はこの限りではない）{' '}
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>PermitRootLogin</code>
                                    </td>
                                    <td>
                                        {' '}
                                        <code>prohibit-password</code>（鍵のみ許可）または{' '}
                                        <code>no</code>{' '}
                                    </td>
                                    <td>rootへの直接攻撃面を縮小</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>PubkeyAuthentication</code>
                                    </td>
                                    <td>
                                        <code>yes</code>
                                    </td>
                                    <td>鍵ベース認証を有効化</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>MaxAuthTries</code>
                                    </td>
                                    <td>
                                        <code>3</code>
                                    </td>
                                    <td>総当たりの試行回数を制限</td>
                                </tr>
                                <tr className="even">
                                    <td>鍵の種類</td>
                                    <td>
                                        Ed25519（<code>ssh-keygen -t ed25519</code>）
                                    </td>
                                    <td>
                                        {' '}
                                        RSAより高速で鍵長が短い。RFC
                                        8032のEdDSAは署名時のnonceを秘密鍵とメッセージから決定的に導出するため、
                                        <strong>署名処理</strong>
                                        が乱数生成器の品質に依存しない（一方で
                                        <strong>鍵生成</strong>
                                        には十分なエントロピーが必要であり、弱い乱数生成器で作られた秘密鍵が安全になるわけではない）{' '}
                                    </td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <h4 id="3_26" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    SSH鍵を設定したら、
                                    <strong>
                                        必ず新しいセッションで鍵ログインが成功することを確認してから
                                    </strong>
                                    パスワード認証を無効化する。順序を間違えると自分自身をロックアウトする典型的な事故につながる。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    OpenSSHは定期的にCVEが報告される（例: CVE-2026-35414。
                                    <code>authorized_keys</code> の <code>cert-authority</code>{' '}
                                    エントリで <code>principals=</code>{' '}
                                    に複数のprincipalを指定し、かつCAが複数の許可principal名をコンマ区切りで証明書へエンコードした場合にのみ制限を回避できた。
                                    <code>TrustedUserCAKeys</code> と{' '}
                                    <code>AuthorizedPrincipalsFile</code>{' '}
                                    を用いる経路は影響を受けず、OpenSSH
                                    10.3で修正済み）。最新パッチの適用を常に追跡する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    CIS BenchmarkやDISA
                                    STIGなど、業界標準の構成ベースラインをディストリビューションごとに適用する。RHEL系とDebian系ではパス・パッケージ名・PAMモジュール設定が異なるため、系統別に手順・Ansible
                                    Roleを用意する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    <code>auditd</code> を導入し、root権限でのコマンド実行、
                                    <code>/etc/passwd</code>・<code>/etc/shadow</code>・
                                    <code>/etc/sudoers</code> への変更を監査ログに記録する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    脆弱性スキャンとパッチ適用は「知る」で終わらせず、SLA（例:
                                    Critical脆弱性は72時間以内に適用）を運用ルールとして明文化する。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h4 id="4_19" tabIndex={-1}>
                        ④ コマンドリファレンス
                    </h4>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">コマンド</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <code>sshd -t</code>
                                    </td>
                                    <td>sshd_config構文チェック（適用前に必須）</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>fail2ban-client status sshd</code>
                                    </td>
                                    <td>ブルートフォース対策の状況確認</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>auditctl -l</code>
                                    </td>
                                    <td>現在の監査ルール一覧</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>ausearch -m USER_LOGIN</code>
                                    </td>
                                    <td>監査ログの検索</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>lynis audit system</code>
                                    </td>
                                    <td>ローカルセキュリティ監査ツール</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <blockquote>
                        {' '}
                        <p>
                            {' '}
                            出典: Falcon Internet Blog「Hardening SSH in
                            2026」（CVE-2026-35414の解説とハードニングチェックリスト） —{' '}
                            <a href="https://www.falconinternet.net/blog/ssh-hardening-guide-2026">
                                https://www.falconinternet.net/blog/ssh-hardening-guide-2026
                            </a>{' '}
                            ／ DecryptionDigest「Linux Server Security Hardening 2026: CIS
                            Benchmarks, Auditd」 —{' '}
                            <a href="https://www.decryptiondigest.com/blog/linux-server-security-hardening-cis-benchmark">
                                https://www.decryptiondigest.com/blog/linux-server-security-hardening-cis-benchmark
                            </a>{' '}
                            ／ Mozilla Wiki「Security/Guidelines/OpenSSH」 —{' '}
                            <a href="https://wiki.mozilla.org/Security/Guidelines/OpenSSH">
                                https://wiki.mozilla.org/Security/Guidelines/OpenSSH
                            </a>{' '}
                        </p>{' '}
                    </blockquote>{' '}
                    <hr />{' '}
                    <h3 id="28-monitoring" tabIndex={-1}>
                        第28章: モニタリング (Monitoring)
                    </h3>{' '}
                    <h4 id="1_27" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        システムの健全性を継続的に可視化し、障害を未然に検知・対処する監視基盤の設計を扱います。{' '}
                    </p>{' '}
                    <h4 id="2_27" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <p>
                        {' '}
                        Google SREチームが提唱する「4大シグナル（Four Golden
                        Signals）」は、監視すべき指標を絞り込むための実践的な枠組みです。{' '}
                    </p>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">シグナル</th>
                                    <th scope="col">説明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>レイテンシ (Latency)</td>
                                    <td>
                                        {' '}
                                        リクエスト処理にかかる時間。成功時と失敗時を分けて計測することが重要{' '}
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>トラフィック (Traffic)</td>
                                    <td>
                                        {' '}
                                        システムへの需要（リクエスト数等）。他3指標を解釈する文脈を与える{' '}
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>エラー (Errors)</td>
                                    <td>失敗したリクエストの比率・件数</td>
                                </tr>
                                <tr className="even">
                                    <td>飽和度 (Saturation)</td>
                                    <td>リソースがどれだけ限界に近いか（CPU使用率、キュー長等）</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <Diagram id="diag-26" />{' '}
                    <h4 id="3_27" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    レイテンシは平均値ではなくパーセンタイル（p50/p95/p99）で監視する。平均値は少数の極端に遅いリクエストを覆い隠してしまう。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    エラーは件数ではなく比率（エラーレート）でアラートを設定する。トラフィックが変動する環境では件数ベースの閾値は意味をなさなくなる。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    静的な閾値だけでなく、<code>predict_linear()</code>{' '}
                                    のような変化率ベースの予測で「このままいくと何分後に閾値超過するか」を検知し、飽和が実際に発生する前にアラートを上げる。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    アラート疲れ（Alert
                                    Fatigue）を避けるため、「人間が今すぐ対応すべきもの」だけをページ通知にし、それ以外はダッシュボード・チケットに留める。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    SLI（Service Level
                                    Indicator）とSLO（目標値）を先に定義し、監視項目をそこから逆算する（何でも測るのではなく、ユーザー体験に直結する指標を測る）。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h4 id="4_20" tabIndex={-1}>
                        ④ コマンドリファレンス／主要ツール
                    </h4>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">ツール</th>
                                    <th scope="col">役割</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Prometheus</td>
                                    <td>メトリクス収集・時系列データベース・アラートルール評価</td>
                                </tr>
                                <tr className="even">
                                    <td>Grafana</td>
                                    <td>ダッシュボード可視化</td>
                                </tr>
                                <tr className="odd">
                                    <td>Alertmanager</td>
                                    <td>アラートの重複排除・グルーピング・ルーティング</td>
                                </tr>
                                <tr className="even">
                                    <td>Node Exporter</td>
                                    <td>ホストレベルメトリクス（CPU/メモリ/ディスク）の公開</td>
                                </tr>
                                <tr className="odd">
                                    <td>OpenTelemetry</td>
                                    <td>メトリクス・ログ・トレースの統一計装標準</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <blockquote>
                        {' '}
                        <p>
                            {' '}
                            出典: Google SRE Book「Monitoring Distributed
                            Systems」（4大シグナルの原典） —{' '}
                            <a href="https://sre.google/sre-book/monitoring-distributed-systems/">
                                https://sre.google/sre-book/monitoring-distributed-systems/
                            </a>{' '}
                            ／ Better Stack Community「The Four Golden Signals for SRE Monitoring」
                            —{' '}
                            <a href="https://betterstack.com/community/guides/monitoring/sre-golden-signals/">
                                https://betterstack.com/community/guides/monitoring/sre-golden-signals/
                            </a>{' '}
                            ／ Sherlocks.ai「The Four Golden Signals of
                            SRE」（p99/エラーレート/predict_linear()によるアラート設計） —{' '}
                            <a href="https://www.sherlocks.ai/blog/four-golden-signals-of-sre">
                                https://www.sherlocks.ai/blog/four-golden-signals-of-sre
                            </a>{' '}
                        </p>{' '}
                    </blockquote>{' '}
                    <hr />{' '}
                    <h3 id="29-performance-analysis" tabIndex={-1}>
                        {' '}
                        第29章: パフォーマンス分析 (Performance Analysis){' '}
                    </h3>{' '}
                    <h4 id="1_28" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        「システムが遅い」という曖昧な訴えを、再現可能な手順でボトルネックの特定に落とし込む方法論を扱います。{' '}
                    </p>{' '}
                    <h4 id="2_28" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <p>
                        {' '}
                        Netflix・Intel・OpenAIで性能エンジニアとして活躍したBrendan
                        Gregg氏が提唱した<strong>USE法（Utilization, Saturation, Errors）</strong>
                        は、あらゆるハードウェアリソースに対して機械的に適用できる、体系的なボトルネック特定手法です。{' '}
                    </p>{' '}
                    <Diagram id="diag-27" />{' '}
                    <h4 id="3_28" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    調査の最初の60秒でシステム全体を俯瞰する（Brendan
                                    Gregg氏が「Linux Performance Analysis in 60,000
                                    Milliseconds」として体系化した手法）。<code>uptime</code>
                                    （負荷平均）→ <code>dmesg</code>（直近のカーネルエラー）→{' '}
                                    <code>vmstat</code>（CPU/メモリ概況）→ <code>mpstat</code>
                                    （コア別使用率）→ <code>
                                        pidstat
                                    </code>（プロセス別リソース）→ <code>iostat</code>
                                    （ディスクI/O）→ <code>sar</code>
                                    （ネットワーク統計）の順に俯瞰し、当たりをつけてから深掘りツールに進む。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    平均値だけでなく分布（パーセンタイル、ヒストグラム）を見る。平均は外れ値を隠す。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    <code>perf</code>{' '}
                                    やeBPFベースのツール（bpftrace等）で、実際にCPUを消費しているコードパスをフレームグラフとして可視化し、推測ではなくデータで原因を特定する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    USE法は「何が正常でないか」を機械的に洗い出すためのチェックリストであり、原因の特定そのものはリソースごとの専用ツールでの深掘りが必要になる、という位置づけを理解する。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h4 id="4_21" tabIndex={-1}>
                        ④ コマンドリファレンス
                    </h4>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">コマンド</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <code>vmstat 1</code>
                                    </td>
                                    <td>CPU/メモリ/スワップの概況（1秒間隔）</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>mpstat -P ALL 1</code>
                                    </td>
                                    <td>コアごとのCPU使用率</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>iostat -xz 1</code>
                                    </td>
                                    <td>ディスクI/Oの詳細統計</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>sar -n DEV 1</code>
                                    </td>
                                    <td>ネットワークインターフェース統計</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>perf top</code>
                                    </td>
                                    <td>リアルタイムでCPUを消費している関数の表示</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>pidstat 1</code>
                                    </td>
                                    <td>プロセス単位のリソース使用状況</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <blockquote>
                        {' '}
                        <p>
                            {' '}
                            出典: Brendan Gregg氏 公式サイト「The USE Method」 —{' '}
                            <a href="https://www.brendangregg.com/usemethod.html">
                                https://www.brendangregg.com/usemethod.html
                            </a>{' '}
                            ／ Brendan Gregg氏 公式サイト（Netflix Tech Blogでの「Linux Performance
                            Analysis in 60,000
                            Milliseconds」への言及、および2026年時点の近況：Intel退社・OpenAI入社）
                            —{' '}
                            <a href="https://www.brendangregg.com/">
                                https://www.brendangregg.com/
                            </a>{' '}
                            ／ Wikipedia「Brendan Gregg」（USE法・フレームグラフの功績、2013年USENIX
                            LISA Outstanding Achievement Award） —{' '}
                            <a href="https://en.wikipedia.org/wiki/Brendan_Gregg">
                                https://en.wikipedia.org/wiki/Brendan_Gregg
                            </a>{' '}
                        </p>{' '}
                    </blockquote>{' '}
                    <hr />{' '}
                    <h3 id="30-data-center-basics" tabIndex={-1}>
                        {' '}
                        第30章: データセンターの基礎 (Data Center Basics){' '}
                    </h3>{' '}
                    <h4 id="1_29" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        物理的なデータセンター運用（電源、冷却、ラック、DCIM）の基礎知識を扱います。クラウド中心の現在でも、オンプレミス設備やコロケーションを扱う組織には必須の知識です。{' '}
                    </p>{' '}
                    <h4 id="2_29" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <div className="table-scroll">
                        {' '}
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">要素</th>
                                    <th scope="col">概要</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>冗長電源 (N+1 / 2N)</td>
                                    <td>UPS・発電機・電源系統の二重化レベル</td>
                                </tr>
                                <tr className="even">
                                    <td>冷却方式</td>
                                    <td>ホット/コールドアイル分離、CRAC/CRAHユニット</td>
                                </tr>
                                <tr className="odd">
                                    <td>ラック単位管理</td>
                                    <td>U（ラックユニット）単位での機器配置・配線・重量分散</td>
                                </tr>
                                <tr className="even">
                                    <td>Tier分類（Uptime Institute）</td>
                                    <td>Tier I〜IVでデータセンターの可用性レベルを分類</td>
                                </tr>
                            </tbody>
                        </table>{' '}
                    </div>{' '}
                    <h4 id="3_29" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    単一のデータセンター・単一の電源系統に全てのインフラを集約しない。事業継続計画（BCP）の観点から、地理的・電源的な分散を検討する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    ラック内の配線・機器配置は「後で誰が見ても分かる」ことを基準に、ラベリングとドキュメント（DCIM:
                                    Data Center Infrastructure Management）を継続的に更新する。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    温度・湿度・電力使用量（PUE: Power Usage
                                    Effectiveness）を継続的にモニタリングし、冷却効率の劣化を早期発見する。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <hr />{' '}
                    <h3 id="31-methodology-policy-and-politics" tabIndex={-1}>
                        {' '}
                        第31章: 方法論・ポリシー・組織政治 (Methodology, Policy, and Politics){' '}
                    </h3>{' '}
                    <h4 id="1_30" tabIndex={-1}>
                        ① 何のための章か
                    </h4>{' '}
                    <p>
                        {' '}
                        技術力だけでは解決できない「組織の中でどう機能するか」——インシデント対応プロセス、ポストモーテム文化、変更管理、ステークホルダーとのコミュニケーションを扱う、原著の締めくくりの章です。{' '}
                    </p>{' '}
                    <h4 id="2_30" tabIndex={-1}>
                        ② 初学者向けの基礎解説
                    </h4>{' '}
                    <p>
                        {' '}
                        Google SREの実践で広く知られる
                        <strong>ブレームレス・ポストモーテム（blameless postmortem）</strong>
                        は、「誰が悪かったか」ではなく「なぜシステムがその失敗を許してしまったか」を問う障害分析の文化です。{' '}
                    </p>{' '}
                    <Diagram id="diag-28" />{' '}
                    <h4 id="3_30" tabIndex={-1}>
                        ③ ベストプラクティス
                    </h4>{' '}
                    <div className="callout-practice">
                        {' '}
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            {' '}
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                {' '}
                                <li>
                                    {' '}
                                    ポストモーテムは「個人の失敗」ではなく「プロセス・システムの欠陥」に焦点を当てて記述する。個人を非難する文化は、次に同様の問題に気づいた人が報告をためらう萎縮効果を生む。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    変更管理（Change
                                    Management）は、変更内容・ロールバック手順・影響範囲を事前に文書化してから実施する。「本番で試しながら考える」を避ける。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    トイル（Toil：手作業で繰り返され、長期的価値を生まない作業）を定期的に棚卸しし、自動化への投資判断材料にする。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    技術的な意思決定であっても、影響を受けるステークホルダー（他チーム、事業側）への説明責任を果たす。技術的に正しいことと、組織的に受け入れられることは必ずしも一致しない。{' '}
                                </li>{' '}
                                <li>
                                    {' '}
                                    オンコール担当者の燃え尽きを防ぐため、ローテーション設計・エスカレーションパスの明確化・「起こされた後の休息」を制度として保証する。{' '}
                                </li>{' '}
                            </ul>{' '}
                        </div>{' '}
                    </div>{' '}
                    <blockquote>
                        {' '}
                        <p>
                            {' '}
                            出典: Google SRE Book「A Collection of Best Practices for Production
                            Services」「Example Postmortem」（Appendix B, D） —{' '}
                            <a href="https://sre.google/sre-book/monitoring-distributed-systems/">
                                https://sre.google/sre-book/monitoring-distributed-systems/
                            </a>{' '}
                            の関連章（Google Cloud SRE Book, sre.google公開）{' '}
                        </p>{' '}
                    </blockquote>{' '}
                    <hr />{' '}
                    <h2 id="_4" tabIndex={-1}>
                        学習ロードマップ（初学者向け推奨進行順）
                    </h2>{' '}
                    <p>
                        {' '}
                        原著の章立ては網羅的ですが、初学者が実務で最初に触れる優先度で並べ替えると、以下のような学習パスが効率的です。{' '}
                    </p>{' '}
                    <Diagram id="diag-29" /> <hr />{' '}
                    <h2 id="_5" tabIndex={-1}>
                        参考文献・出典一覧
                    </h2>{' '}
                    <p>
                        {' '}
                        本ガイド作成にあたり、2026年8月27日時点でWeb検索により確認した情報源です。書籍そのものの一次情報に加え、著名な国際的開発者・組織による最新（2026年）の実務知見を優先的に参照しました。{' '}
                    </p>{' '}
                    <h3 id="_6" tabIndex={-1}>
                        原著書誌情報
                    </h3>{' '}
                    <div className="ref-grid">
                        {' '}
                        <div className="ref-card" id="ref1">
                            {' '}
                            <div className="num">1</div>{' '}
                            <div className="txt">
                                {' '}
                                UNIX and Linux System Administration Handbook, 5th
                                Edition（O&apos;Reilly電子版） —{' '}
                                <a href="https://www.oreilly.com/library/view/unix-and-linux/9780134278308/">
                                    https://www.oreilly.com/library/view/unix-and-linux/9780134278308/
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                        <div className="ref-card" id="ref2">
                            {' '}
                            <div className="num">2</div>{' '}
                            <div className="txt">
                                {' '}
                                UNIX and Linux System Administration Handbook, 5th
                                Edition（Pearson詳細目次） —{' '}
                                <a href="https://www.pearson.com/en-us/subject-catalog/p/unix-and-linux-system-administration-handbook/P200000000513/9780137460359">
                                    https://www.pearson.com/en-us/subject-catalog/p/unix-and-linux-system-administration-handbook/P200000000513/9780137460359
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                        <div className="ref-card" id="ref3">
                            {' '}
                            <div className="num">3</div>{' '}
                            <div className="txt">
                                {' '}
                                UNIX and Linux System Administration Handbook（InformIt出版情報） —{' '}
                                <a href="https://www.informit.com/store/unix-and-linux-system-administration-handbook-9780134278315">
                                    https://www.informit.com/store/unix-and-linux-system-administration-handbook-9780134278315
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h3 id="2booting-systemd" tabIndex={-1}>
                        第2章（Booting / systemd）関連
                    </h3>{' '}
                    <div className="ref-grid">
                        {' '}
                        <div className="ref-card" id="ref4">
                            {' '}
                            <div className="num">4</div>{' '}
                            <div className="txt">
                                {' '}
                                DevToolbox「Systemd: The Complete Guide for 2026」 —{' '}
                                <a href="https://devtoolbox.dedyn.io/blog/systemd-complete-guide">
                                    https://devtoolbox.dedyn.io/blog/systemd-complete-guide
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                        <div className="ref-card" id="ref5">
                            {' '}
                            <div className="num">5</div>{' '}
                            <div className="txt">
                                {' '}
                                Lennart Poettering氏 Mastodon投稿（systemd v261新機能解説,
                                2026年6月） —{' '}
                                <a href="https://mastodon.social/@pid_eins/116803790296454733">
                                    https://mastodon.social/@pid_eins/116803790296454733
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                        <div className="ref-card" id="ref6">
                            {' '}
                            <div className="num">6</div>{' '}
                            <div className="txt">
                                {' '}
                                The Register「Systemd daddy quits Microsoft to prove Linux can be
                                trusted」（2026年1月） —{' '}
                                <a href="https://www.theregister.com/2026/01/29/lennart_poettering_quits_microsoft/">
                                    https://www.theregister.com/2026/01/29/lennart_poettering_quits_microsoft/
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h3 id="3access-control-sudo" tabIndex={-1}>
                        第3章（Access Control / sudo）関連
                    </h3>{' '}
                    <div className="ref-grid">
                        {' '}
                        <div className="ref-card" id="ref7">
                            {' '}
                            <div className="num">7</div>{' '}
                            <div className="txt">
                                {' '}
                                Oracle Linux公式ドキュメント「Follow the Principle of Least
                                Privilege」 —{' '}
                                <a href="https://docs.oracle.com/en/operating-systems/oracle-linux/9/security/security-FollowthePrincipleofLeastPrivilege.html">
                                    https://docs.oracle.com/en/operating-systems/oracle-linux/9/security/security-FollowthePrincipleofLeastPrivilege.html
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                        <div className="ref-card" id="ref8">
                            {' '}
                            <div className="num">8</div>{' '}
                            <div className="txt">
                                {' '}
                                DecryptionDigest「Linux sudo sudoers Hardening 2026」 —{' '}
                                <a href="https://www.decryptiondigest.com/blog/linux-sudo-sudoers-security-hardening-privilege-escalation-guide">
                                    https://www.decryptiondigest.com/blog/linux-sudo-sudoers-security-hardening-privilege-escalation-guide
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                        <div className="ref-card" id="ref9">
                            {' '}
                            <div className="num">9</div>{' '}
                            <div className="txt">
                                {' '}
                                Kevin Wells氏「Mastering sudo: Enforcing Least Privilege in Linux」
                                —{' '}
                                <a href="https://kevwells.com/mastering-sudo-enforcing-least-privilege-in-linux/">
                                    https://kevwells.com/mastering-sudo-enforcing-least-privilege-in-linux/
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h3 id="16dnsdnssec" tabIndex={-1}>
                        第16章（DNS/DNSSEC）関連
                    </h3>{' '}
                    <div className="ref-grid">
                        {' '}
                        <div className="ref-card" id="ref10">
                            {' '}
                            <div className="num">10</div>{' '}
                            <div className="txt">
                                {' '}
                                ControlD「DNS Security Best Practices For Forward-Thinking
                                Businesses」 —{' '}
                                <a href="https://controld.com/blog/dns-security-best-practices/">
                                    https://controld.com/blog/dns-security-best-practices/
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                        <div className="ref-card" id="ref11">
                            {' '}
                            <div className="num">11</div>{' '}
                            <div className="txt">
                                {' '}
                                SHPV「DNSSEC en 2026：sécuriser vos résolutions DNS avec la chaîne
                                de confiance」 —{' '}
                                <a href="https://www.shpv.fr/blog/dnssec-configuration/">
                                    https://www.shpv.fr/blog/dnssec-configuration/
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                        <div className="ref-card" id="ref12">
                            {' '}
                            <div className="num">12</div>{' '}
                            <div className="txt">
                                {' '}
                                Sesame Disk「Secure DNS Updates in 2026」 —{' '}
                                <a href="https://sesamedisk.com/secure-dns-updates-rfc-2136-ipv6-dnssec-2026/">
                                    https://sesamedisk.com/secure-dns-updates-rfc-2136-ipv6-dnssec-2026/
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h3 id="20storage-lvm-raid" tabIndex={-1}>
                        第20章（Storage / LVM / RAID）関連
                    </h3>{' '}
                    <div className="ref-grid">
                        {' '}
                        <div className="ref-card" id="ref13">
                            {' '}
                            <div className="num">13</div>{' '}
                            <div className="txt">
                                {' '}
                                FOSS Linux「Linux Storage Deep Dive: LVM, mdadm, ZFS RAID」（Arjun
                                K.氏, 2026年6月） —{' '}
                                <a href="https://www.fosslinux.com/158254/linux-storage-deep-dive-lvm-mdadm-and-zfs-raid.htm">
                                    https://www.fosslinux.com/158254/linux-storage-deep-dive-lvm-mdadm-and-zfs-raid.htm
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                        <div className="ref-card" id="ref14">
                            {' '}
                            <div className="num">14</div>{' '}
                            <div className="txt">
                                {' '}
                                LinuxTeck「Linux File System Comparison ext4 xfs btrfs — Best Choice
                                for Production 2026」 —{' '}
                                <a href="https://www.linuxteck.com/linux-file-system-comparison-ext4-xfs-btrfs/">
                                    https://www.linuxteck.com/linux-file-system-comparison-ext4-xfs-btrfs/
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                        <div className="ref-card" id="ref15">
                            {' '}
                            <div className="num">15</div>{' '}
                            <div className="txt">
                                {' '}
                                Red Hat公式ドキュメント「Chapter 3. The XFS File System」 —{' '}
                                <a href="https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/7/html/storage_administration_guide/ch-xfs">
                                    https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/7/html/storage_administration_guide/ch-xfs
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h3 id="23configuration-management-ansible" tabIndex={-1}>
                        {' '}
                        第23章（Configuration Management / Ansible）関連{' '}
                    </h3>{' '}
                    <div className="ref-grid">
                        {' '}
                        <div className="ref-card" id="ref16">
                            {' '}
                            <div className="num">16</div>{' '}
                            <div className="txt">
                                {' '}
                                Spacelift「Infrastructure as Code with Ansible: Tutorial」 —{' '}
                                <a href="https://spacelift.io/blog/ansible-infrastructure-as-code">
                                    https://spacelift.io/blog/ansible-infrastructure-as-code
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                        <div className="ref-card" id="ref17">
                            {' '}
                            <div className="num">17</div>{' '}
                            <div className="txt">
                                {' '}
                                OneUptime「How to Fix &apos;Changed Status&apos; Idempotency
                                Issues」 —{' '}
                                <a href="https://oneuptime.com/blog/post/2026-01-24-ansible-changed-status-idempotency/view">
                                    https://oneuptime.com/blog/post/2026-01-24-ansible-changed-status-idempotency/view
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                        <div className="ref-card" id="ref18">
                            {' '}
                            <div className="num">18</div>{' '}
                            <div className="txt">
                                {' '}
                                OneUptime「How to Write Idempotent Ansible Tasks」 —{' '}
                                <a href="https://oneuptime.com/blog/post/2026-02-21-how-to-write-idempotent-ansible-tasks/view">
                                    https://oneuptime.com/blog/post/2026-02-21-how-to-write-idempotent-ansible-tasks/view
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h3 id="25containers-docker-kubernetes" tabIndex={-1}>
                        {' '}
                        第25章（Containers / Docker / Kubernetes）関連{' '}
                    </h3>{' '}
                    <div className="ref-grid">
                        {' '}
                        <div className="ref-card" id="ref19">
                            {' '}
                            <div className="num">19</div>{' '}
                            <div className="txt">
                                {' '}
                                Northflank「Containers vs virtual machines: key differences and when
                                to use each (2026)」 —{' '}
                                <a href="https://northflank.com/blog/containers-vs-virtual-machines">
                                    https://northflank.com/blog/containers-vs-virtual-machines
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                        <div className="ref-card" id="ref20">
                            {' '}
                            <div className="num">20</div>{' '}
                            <div className="txt">
                                {' '}
                                AWS公式「Docker vs VM」比較ドキュメント —{' '}
                                <a href="https://aws.amazon.com/compare/the-difference-between-docker-vm/">
                                    https://aws.amazon.com/compare/the-difference-between-docker-vm/
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                        <div className="ref-card" id="ref21">
                            {' '}
                            <div className="num">21</div>{' '}
                            <div className="txt">
                                {' '}
                                Luminhkhuong Engineering Knowledge Base「VMs vs. Docker vs.
                                Kubernetes」 —{' '}
                                <a href="https://luminhkhuong.dev/technical-knowledge/devops/vm-docker-k8s-explained/">
                                    https://luminhkhuong.dev/technical-knowledge/devops/vm-docker-k8s-explained/
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h3 id="27security-ssh" tabIndex={-1}>
                        第27章（Security / SSHハードニング）関連
                    </h3>{' '}
                    <div className="ref-grid">
                        {' '}
                        <div className="ref-card" id="ref22">
                            {' '}
                            <div className="num">22</div>{' '}
                            <div className="txt">
                                {' '}
                                Falcon Internet Blog「Hardening SSH in 2026: Keys, Certificates, and
                                the Bypass You Might Have Missed」 —{' '}
                                <a href="https://www.falconinternet.net/blog/ssh-hardening-guide-2026">
                                    https://www.falconinternet.net/blog/ssh-hardening-guide-2026
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                        <div className="ref-card" id="ref23">
                            {' '}
                            <div className="num">23</div>{' '}
                            <div className="txt">
                                {' '}
                                DecryptionDigest「Linux Server Security Hardening 2026: CIS
                                Benchmarks, Auditd」 —{' '}
                                <a href="https://www.decryptiondigest.com/blog/linux-server-security-hardening-cis-benchmark">
                                    https://www.decryptiondigest.com/blog/linux-server-security-hardening-cis-benchmark
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                        <div className="ref-card" id="ref24">
                            {' '}
                            <div className="num">24</div>{' '}
                            <div className="txt">
                                {' '}
                                Mozilla Wiki「Security/Guidelines/OpenSSH」 —{' '}
                                <a href="https://wiki.mozilla.org/Security/Guidelines/OpenSSH">
                                    https://wiki.mozilla.org/Security/Guidelines/OpenSSH
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h3 id="28monitoring-sre-golden-signals" tabIndex={-1}>
                        {' '}
                        第28章（Monitoring / SRE Golden Signals）関連{' '}
                    </h3>{' '}
                    <div className="ref-grid">
                        {' '}
                        <div className="ref-card" id="ref25">
                            {' '}
                            <div className="num">25</div>{' '}
                            <div className="txt">
                                {' '}
                                Google SRE Book「Monitoring Distributed Systems」 —{' '}
                                <a href="https://sre.google/sre-book/monitoring-distributed-systems/">
                                    https://sre.google/sre-book/monitoring-distributed-systems/
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                        <div className="ref-card" id="ref26">
                            {' '}
                            <div className="num">26</div>{' '}
                            <div className="txt">
                                {' '}
                                Better Stack Community「The Four Golden Signals for SRE Monitoring」
                                —{' '}
                                <a href="https://betterstack.com/community/guides/monitoring/sre-golden-signals/">
                                    https://betterstack.com/community/guides/monitoring/sre-golden-signals/
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                        <div className="ref-card" id="ref27">
                            {' '}
                            <div className="num">27</div>{' '}
                            <div className="txt">
                                {' '}
                                Sherlocks.ai「The Four Golden Signals of SRE」 —{' '}
                                <a href="https://www.sherlocks.ai/blog/four-golden-signals-of-sre">
                                    https://www.sherlocks.ai/blog/four-golden-signals-of-sre
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                    </div>{' '}
                    <h3 id="29performance-analysis-use" tabIndex={-1}>
                        第29章（Performance Analysis / USE法）関連
                    </h3>{' '}
                    <div className="ref-grid">
                        {' '}
                        <div className="ref-card" id="ref28">
                            {' '}
                            <div className="num">28</div>{' '}
                            <div className="txt">
                                {' '}
                                Brendan Gregg氏 公式サイト「The USE Method」 —{' '}
                                <a href="https://www.brendangregg.com/usemethod.html">
                                    https://www.brendangregg.com/usemethod.html
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                        <div className="ref-card" id="ref29">
                            {' '}
                            <div className="num">29</div>{' '}
                            <div className="txt">
                                {' '}
                                Brendan Gregg氏 公式サイト（近況・経歴） —{' '}
                                <a href="https://www.brendangregg.com/">
                                    https://www.brendangregg.com/
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                        <div className="ref-card" id="ref30">
                            {' '}
                            <div className="num">30</div>{' '}
                            <div className="txt">
                                {' '}
                                Wikipedia「Brendan Gregg」 —{' '}
                                <a href="https://en.wikipedia.org/wiki/Brendan_Gregg">
                                    https://en.wikipedia.org/wiki/Brendan_Gregg
                                </a>{' '}
                            </div>{' '}
                        </div>{' '}
                    </div>{' '}
                    <hr />{' '}
                    <p>
                        {' '}
                        <em>
                            本ガイドはUNIX and Linux System Administration Handbook, 5th
                            Editionの構成に基づく学習用二次資料であり、原著の著作権はEvi
                            Nemeth、Garth Snyder、Trent R. Hein、Ben Whaley、Dan
                            Mackin、およびPearson
                            Educationに帰属します。原著の完全な内容・詳細な手順については、必ず原著（ISBN-13:
                            978-0-13-427755-4）をご参照ください。
                        </em>{' '}
                    </p>{' '}
                </main>
            </div>
        </div>
    );
}
