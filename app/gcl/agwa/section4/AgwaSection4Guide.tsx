'use client';

import { memo, useState } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, type DiagramId } from './constants';
import { NavBar } from './NavBar';
import './page.css';

const Diagram = memo(function Diagram({ id, label }: { id: DiagramId; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
        </div>
    );
});

export function AgwaSection4Guide() {
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

    const toggleCheck = (index: number) => {
        setCheckedItems((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    const completedCount = Object.values(checkedItems).filter(Boolean).length;

    return (
        <div className="agwa-s4-page">
            <div className="layout">
                <NavBar />
                <main className="main">
                    <div className="hero" id="hero">
                        <div className="hero-kicker">
                            試験対策ガイド &middot; Section 4 &middot; 出題比率 約20%
                        </div>
                        <h1>セキュリティポリシーとアクセス制御の管理</h1>
                        <p className="subtitle">Managing security policies and access controls</p>
                    </div>

                    <h2 id="この章について">この章について</h2>
                    <p>
                        Section 4 は Associate Google Workspace Administrator 試験の中でも Section
                        1(ユーザー・ドメイン・ディレクトリ管理、約20%)と並んで最大の出題比率を占める分野です。公式Exam
                        Guideでは、以下の3つのタスク(4.1〜4.3)で構成されています。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">タスク</th>
                                    <th scope="col">内容</th>
                                    <th scope="col">主なAdmin Console配置場所</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>4.1</td>
                                    <td>ユーザーアクセスの保護(Securing user access)</td>
                                    <td>Security &gt; Authentication / Access and data control</td>
                                </tr>
                                <tr className="even">
                                    <td>4.2</td>
                                    <td>セキュリティリスクとイベントのレポート・監査・調査</td>
                                    <td>Security &gt; Security center / Reporting</td>
                                </tr>
                                <tr className="odd">
                                    <td>4.3</td>
                                    <td>追加のGoogle・サードパーティアプリケーションの有効化</td>
                                    <td>
                                        Apps &gt; Google Workspace Marketplace apps / Security &gt;
                                        Access and data control
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        本ガイドは、各タスクの出題項目(considerations)に一対一で対応する構成で、中級〜上級の管理者・エンジニアを対象に、設定手順・仕様上の注意点・Google推奨のベストプラクティスを解説します。
                    </p>
                    <Diagram id="diag-1" label="Section 4 セキュリティポリシーとアクセス制御の全体構造" />
                    <blockquote className="section-block">
                        <p>
                            <strong>出典</strong>:{' '}
                            <a
                                href="https://services.google.com/fh/files/misc/associate_google_workspace_administrator_exam_guide_english.pdf"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Associate Google Workspace Administrator Certification exam guide
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://cloud.google.com/learn/certification/associate-google-workspace-administrator?hl=en"
                                target="_blank"
                                rel="noreferrer"
                            >
                                認定ページ
                            </a>
                        </p>
                    </blockquote>
                    <hr />
                    <h2 id="41-ユーザーアクセスの保護">4.1 ユーザーアクセスの保護</h2>
                    <h3 id="411-強力なパスワードポリシーと2svルールの適用">
                        4.1.1 強力なパスワードポリシーと2SVルールの適用
                    </h3>
                    <p>
                        「ユーザーアクセスの保護」タスクの中核は、<strong>認証情報の強度</strong>と<strong>多要素化</strong>の2軸です。まずパスワードと2SV(2-Step
                        Verification、Googleは「MFA」ではなくこの用語を用います)を、組織のリスク許容度に応じて強制するかどうかを判断します。
                    </p>
                    <p>
                        Google公式のガイダンスでは、2SVを有効にすることでアカウント乗っ取りのリスクを大幅に低減できるとされており、特に管理者アカウントは組織で最も強力な権限を持つため、真っ先に2SVを強制すべき対象とされています。実際、2025年以降Googleは管理者アカウントに対する2SVの強制を段階的に既定化しており、Education・Nonprofits・Cloud
                        Identity・Android Enterpriseなどのエディションから順次適用が進んでいます。
                    </p>
                    <p><strong>2SV展開の標準的な5ステップ</strong>(Google推奨)は以下の通りです。</p>
                    <Diagram id="diag-2" label="2SV展開の標準的な5ステップ" />
                    <h4 id="強制enforcementオプションの詳細">強制(Enforcement)オプションの詳細</h4>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">設定</th>
                                    <th scope="col">内容</th>
                                    <th scope="col">主な用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Off</td>
                                    <td>2SVを強制しない</td>
                                    <td>段階的ロールアウトの初期段階</td>
                                </tr>
                                <tr className="even">
                                    <td>On</td>
                                    <td>即時に強制を開始</td>
                                    <td>強制開始日時を厳密に管理したい場合</td>
                                </tr>
                                <tr className="odd">
                                    <td>Turn on enforcement from date</td>
                                    <td>指定日から24〜48時間以内に強制開始</td>
                                    <td>事前告知を伴う計画的な展開</td>
                                </tr>
                                <tr className="even">
                                    <td>New user enrollment period</td>
                                    <td>新規ユーザーに1日〜6か月の猶予を付与</td>
                                    <td>オンボーディング中のユーザー保護</td>
                                </tr>
                                <tr className="odd">
                                    <td>Allow user to trust the device</td>
                                    <td>信頼済み端末では再確認を省略</td>
                                    <td>利便性重視(頻繁な端末切替がない場合のみ推奨)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        <strong>注意点</strong>: 強制方式を「Any except verification codes via text,
                        phone
                        call」に変更すると、SMS・音声通話のみで2SVを利用しているユーザーはロックアウトされる可能性があります。事前に{' '}
                        <code>login_verification</code> のログイベント(<code>login_challenge_method</code>{' '}
                        = <code>idv_preregistered_phone</code>
                        )で対象ユーザーを洗い出し、別方式への移行を促す必要があります。同様に「Only
                        security
                        key」を選ぶ場合は、事前にセキュリティキー/パスキーを登録済みのユーザーを把握し(レポートには最大48時間の遅延があるため注意)、未登録者への周知を徹底します。
                    </p>
                    <h4 id="ベストプラクティス">ベストプラクティス</h4>
                    <ul>
                        <li>
                            少なくとも2名以上のSuper
                            Adminを配置し、うち1名がロックアウトしてももう1名が復旧できる体制にする。
                        </li>
                        <li>
                            2SVの強制はまず一部の組織単位(OU)や設定グループ(Configuration
                            Group)でパイロット運用し、問題がないことを確認してから全社展開する。
                        </li>
                        <li>
                            ユーザーが強制開始日までに対応しない場合は、「2SVが強制されないグループ」に一時的に追加して猶予を与える運用も可能だが、これは恒常的な回避策として使うべきではない。
                        </li>
                    </ul>
                    <blockquote className="section-block">
                        <p>
                            <strong>出典</strong>:{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/security/deploy-2-step-verification"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Deploy 2-Step Verification
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/security/about-2sv-enforcement-for-admins"
                                target="_blank"
                                rel="noreferrer"
                            >
                                About 2SV enforcement for admins
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/security/protect-your-business-with-2-step-verification"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Protect your business with 2-Step Verification
                            </a>
                        </p>
                    </blockquote>
                    <hr />
                    <h3 id="412-パスワードポリシーと復旧オプションの設定">
                        4.1.2 パスワードポリシーと復旧オプションの設定
                    </h3>
                    <p>
                        パスワードポリシーは{' '}
                        <strong>Security &gt; Authentication &gt; Password management</strong>{' '}
                        から、組織単位ごとに設定します。設定できる主な項目は次の通りです。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">項目</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Enforce strong password</td>
                                    <td>
                                        パスワードエントロピー(ランダム性)・既知の漏えいDBとの照合・辞書的単語やユーザー名との類似性を評価
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Length</td>
                                    <td>最小・最大文字数を8〜100文字の範囲で指定</td>
                                </tr>
                                <tr className="odd">
                                    <td>Enforce password policy at next sign-in</td>
                                    <td>弱いパスワードのユーザーに次回サインイン時の変更を強制</td>
                                </tr>
                                <tr className="even">
                                    <td>Allow password reuse</td>
                                    <td>
                                        過去のパスワードの再利用を許可するかどうか(履歴世代数は管理者側で制御不可)
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>Expiration</td>
                                    <td>90日・180日などの有効期限。既定はOFF</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        <strong>重要な仕様上の制約</strong>として、以下の点は試験でも問われやすいポイントです。
                    </p>
                    <ul>
                        <li>
                            パスワード強度・長さの要件は、<strong>ハッシュ値で登録されたパスワード</strong>(CSV一括登録・Directory
                            API・Password Sync・GCDSなど)には適用できません。
                        </li>
                        <li>
                            管理者が手動でリセットしたパスワードにも強度・長さ要件は適用されません。この場合は「Ask
                            user to change their password when they sign
                            in」を必ずチェックする必要があります。
                        </li>
                        <li>
                            <strong>サードパーティIdPでOIDC認証</strong>を使っている場合、パスワードポリシーはそもそも適用されません。
                        </li>
                        <li>
                            <strong>サードパーティIdPでSAML SSO</strong>を使っている場合はパスワードポリシーが誤って適用されてしまう既知の問題があるため、SSO利用時はパスワード強制をOFFにし、次回サインイン時のパスワード変更要求も無効化することが推奨されています。
                        </li>
                        <li>
                            パスワード有効期限は<strong>ブラウザベースのサインインにのみ</strong>適用され、モバイルアプリのみを使うユーザーやOAuth認証されたアプリのユーザーには適用されません。有効期限設定を有効にすると、期限の30日前からポップアップ(メール通知ではない)でユーザーに警告が表示されます。
                        </li>
                    </ul>
                    <Diagram id="diag-3" label="パスワードポリシーとSSO認証方式の決定フロー" />
                    <h4 id="復旧オプションrecovery-options">復旧オプション(Recovery options)</h4>
                    <p>
                        パスワード忘れ・アカウントロックアウトに備え、管理者・ユーザーの双方で復旧用の連絡先(電話番号・別のメールアドレス)を事前登録しておくことが推奨されます。特にSuper
                        Adminについては、少なくとも2名体制にした上で「Super
                        Adminが自分自身でパスワードを復旧できる」設定を有効にしておくことで、単一障害点を避けられます。ユーザー側では、Security
                        challenges(本人確認の追加質問)や、管理者が発行するバックアップ確認コードを利用した復旧経路も用意されています。
                    </p>
                    <h4 id="ベストプラクティス-1">ベストプラクティス</h4>
                    <ul>
                        <li>
                            パスワード有効期限は「一定期間ごとの強制変更はセキュリティ向上にほとんど寄与しない」というGoogleの調査結果を踏まえ、既定でOFFのままにし、代わりに2SVと侵害検出(パスワードアラート機能等)に投資する。
                        </li>
                        <li>
                            コンプライアンス上どうしても有効期限が必要な場合のみ、90〜180日程度で設定する。
                        </li>
                        <li>
                            SSO移行時は必ずパスワード強制設定を見直す。既存のパスワードポリシーが残っていると、意図せずユーザーがロックアウトされる原因になる。
                        </li>
                    </ul>
                    <blockquote className="section-block">
                        <p>
                            <strong>出典</strong>:{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/users/enforce-and-monitor-password-requirements-for-users"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Enforce and monitor password requirements for users
                            </a>
                        </p>
                    </blockquote>
                    <hr />
                    <h3 id="413-2sv方式の設定">4.1.3 2SV方式の設定</h3>
                    <p>
                        2SVで選択できる主な認証方式は次の通りです。それぞれの仕組みとセキュリティレベルの違いを理解しておくことが重要です。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">方式</th>
                                    <th scope="col">仕組み</th>
                                    <th scope="col">フィッシング耐性</th>
                                    <th scope="col">備考</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Googleプロンプト</td>
                                    <td>登録済みモバイル端末に確認通知を送信しタップで承認</td>
                                    <td>中</td>
                                    <td>最も手軽、ネット接続が必要</td>
                                </tr>
                                <tr className="even">
                                    <td>Google Authenticatorアプリ(TOTP)</td>
                                    <td>端末上で時間ベースのワンタイムコードを生成</td>
                                    <td>中</td>
                                    <td>オフラインでも利用可能</td>
                                </tr>
                                <tr className="odd">
                                    <td>SMS・音声通話</td>
                                    <td>電話番号宛にコードを送信</td>
                                    <td>低(SIMスワップ等のリスク)</td>
                                    <td>強制方式で除外対象になり得る</td>
                                </tr>
                                <tr className="even">
                                    <td>セキュリティキー(FIDO2/WebAuthn)</td>
                                    <td>物理USB/NFC/Bluetoothキーによる暗号学的認証</td>
                                    <td>高</td>
                                    <td>Titanキー・YubiKey等</td>
                                </tr>
                                <tr className="odd">
                                    <td>パスキー(Passkey)</td>
                                    <td>端末の画面ロックや生体認証と連携した暗号鍵ベースの認証</td>
                                    <td>高</td>
                                    <td>
                                        セキュリティキーと同等の耐フィッシング性、追加ハードウェア不要
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>バックアップコード</td>
                                    <td>事前生成した使い捨てコード一覧</td>
                                    <td>—</td>
                                    <td>端末紛失時の緊急避難用</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        <strong>パスキーとセキュリティキーの関係</strong>について、Googleの仕様では「Only security
                        key」という強制オプションは、パスキーの登場以降、セキュリティキーとパスキーの両方をカバーするようになっています。両者は同等レベルのフィッシング耐性を持つとされています。また「skip
                        password」設定を有効にしたユーザーは、パスワード入力そのものをスキップし、パスキー単独で第1・第2要素を兼ねたサインインが可能になります。
                    </p>
                    <h4 id="管理者による代理操作">管理者による代理操作</h4>
                    <p>管理者は、ユーザーのために以下の操作を代行できます。</p>
                    <ul>
                        <li>
                            <strong>バックアップ確認コードの発行</strong>:
                            ユーザーが端末を紛失した場合など。ただし他の管理者・Super
                            Admin用のバックアップコードを発行できるのはSuper Adminのみです。
                        </li>
                        <li>
                            <strong>セキュリティキーの削除</strong>:
                            紛失時のみ実施すべきで、安易な削除は推奨されません。
                        </li>
                        <li>
                            <strong>強制方式が「Only security key」の場合の一時的な緩和</strong>:
                            バックアップコードでのサインインを許可する猶予期間(suspension grace
                            period)を設定できます。
                        </li>
                    </ul>
                    <h4 id="ベストプラクティス-2">ベストプラクティス</h4>
                    <ul>
                        <li>
                            経営層・IT管理者・財務担当など高権限アカウントには、フィッシング耐性の高いセキュリティキーまたはパスキーを優先して割り当てる。
                        </li>
                        <li>
                            SMS・音声認証は利便性は高いが、SIMスワップ攻撃のリスクがあるため、可能な限り「Any
                            except verification codes via text, phone call」への移行を計画する。
                        </li>
                        <li>
                            Advanced Protection
                            Program(APP)への登録も、特に狙われやすい高リスクユーザー(経営層・人事・法務・IT管理者)には検討する。
                        </li>
                    </ul>
                    <blockquote className="section-block">
                        <p>
                            <strong>出典</strong>:{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/security/manage-a-users-security-settings"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Manage a user's security settings
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/security/deploy-2-step-verification"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Deploy 2-Step Verification
                            </a>
                        </p>
                    </blockquote>
                    <hr />
                    <h3 id="414-コンテキストアウェアアクセスの使用場面">
                        4.1.4 コンテキストアウェアアクセスの使用場面
                    </h3>
                    <p>
                        Context-Aware
                        Access(CAA)は、<strong>ユーザーIDだけでなく「文脈(コンテキスト)」に基づいてアプリへのアクセスを制御する</strong>機能です。パスワードや2SVが「誰であるか」を検証するのに対し、CAAは「どこから・どの端末で・どのような状態でアクセスしているか」を検証する点が本質的に異なります。
                    </p>
                    <h4 id="caaが有効な典型的なユースケース">CAAが有効な典型的なユースケース</h4>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">ユースケース</th>
                                    <th scope="col">説明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>デバイスポリシーの強制</td>
                                    <td>
                                        会社の端末管理ポリシーに準拠していない端末からのアクセスを拒否
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>管理対象Chromeブラウザの強制</td>
                                    <td>特定のアプリへのアクセスを管理対象Chromeブラウザ経由に限定</td>
                                </tr>
                                <tr className="odd">
                                    <td>社内IPアドレスの強制</td>
                                    <td>
                                        特定アプリを社内ネットワーク(許可されたIP範囲)からのみアクセス可能にする
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>企業証明書の要求</td>
                                    <td>発行済みの企業証明書を保持する端末のみアクセスを許可</td>
                                </tr>
                                <tr className="odd">
                                    <td>信頼できるサードパーティアプリの例外化</td>
                                    <td>特定のSAMLアプリのみCAAポリシーから除外する</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        CAAは「<strong>特定のアプリごと</strong>」「<strong>特定のユーザー・グループごと</strong>」にアクセスレベル(access
                        level)を割り当てる方式であり、まず基本(Basic)モードで単純な条件(デバイスOS・地域・IP範囲など)を組み合わせ、より複雑な条件が必要な場合はCommon
                        Expression Language(CEL)を使った高度(Advanced)モードでカスタム条件を記述します。
                    </p>
                    <Diagram id="diag-4" label="Context-Aware Access アクセスレベルの評価フロー" />
                    <h4 id="caa-vs-2sv-vs-パスワードポリシー-どれを使うべきか">
                        CAA vs 2SV vs パスワードポリシー: どれを使うべきか
                    </h4>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">課題</th>
                                    <th scope="col">適した機能</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>「誰が」サインインしたかを検証したい</td>
                                    <td>パスワード + 2SV</td>
                                </tr>
                                <tr className="even">
                                    <td>「どこから・どの端末から」のアクセスかを制御したい</td>
                                    <td>Context-Aware Access</td>
                                </tr>
                                <tr className="odd">
                                    <td>「一定時間ごとに」再認証を求めたい</td>
                                    <td>Google Session Control</td>
                                </tr>
                                <tr className="even">
                                    <td>DLPと組み合わせて特定条件下でのみ機密データ共有を制限したい</td>
                                    <td>CAA + DLPルールの組み合わせ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        CAAは、設定グループ(Configuration
                        Groups)と組み合わせることで、組織単位の階層構造とは独立してユーザー横断的にアクセスレベルを適用することも可能です。また、Admin
                        Console自体へのアクセスにもCAAレベルを割り当てられますが、これは管理者自身がロックアウトされるリスクがあるため、明確な必要がある場合以外は推奨されません。
                    </p>
                    <h4 id="ベストプラクティス-3">ベストプラクティス</h4>
                    <ul>
                        <li>
                            リモートワークが多い組織では、まず「社外からのアクセス時のみ追加のデバイス確認を要求する」といった緩やかなポリシーから開始し、段階的に厳格化する。
                        </li>
                        <li>
                            CAAポリシーの適用前に必ずBasicモードの「推奨アクセスレベル(Apply recommended
                            access
                            levels)」機能でシミュレーションし、意図しないロックアウトがないか確認する。
                        </li>
                        <li>
                            高リスクなDLP検出結果と組み合わせる場合は、CAA単体ではなく「DLPルール +
                            CAA条件」の組み合わせ機能を利用する。
                        </li>
                    </ul>
                    <blockquote className="section-block">
                        <p>
                            <strong>出典</strong>:{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/security/about-context-aware-access"
                                target="_blank"
                                rel="noreferrer"
                            >
                                About Context-Aware Access
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/security/protect-your-business-with-context-aware-access"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Protect your business with Context-Aware Access
                            </a>
                        </p>
                    </blockquote>
                    <hr />
                    <h3 id="415-ユーザーとグループへのセキュリティポリシー適用">
                        4.1.5 ユーザーとグループへのセキュリティポリシー適用
                    </h3>
                    <p>
                        Google
                        Workspaceのセキュリティ設定は、基本的に<strong>組織単位</strong>(OU)と<strong>設定グループ</strong>(Configuration
                        Group)の2つの仕組みで、対象ユーザーを柔軟に絞り込んで適用します。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">適用単位</th>
                                    <th scope="col">特徴</th>
                                    <th scope="col">主な用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>組織単位(OU)</td>
                                    <td>階層構造を持ち、子OUは親OUの設定を継承</td>
                                    <td>部署・役職などの恒久的な組織構造に基づく設定</td>
                                </tr>
                                <tr className="even">
                                    <td>設定グループ(Configuration Group)</td>
                                    <td>OUの階層をまたいで任意のユーザーをグループ化</td>
                                    <td>「一部の部署の一部の人だけ」といった横断的な例外設定</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        <strong>優先順位のルール</strong>として、設定グループの設定はOUの設定より優先されます(Group settings override
                        organizational
                        units)。これは2SV・CAA・パスワードポリシーなど、本章で扱うほぼすべてのセキュリティ設定に共通する原則であり、試験でも頻出のポイントです。
                    </p>
                    <h4 id="典型的な適用パターン">典型的な適用パターン</h4>
                    <ul>
                        <li>
                            OUで「全社員は2SV強制」という基本方針を設定しつつ、経理部門だけを含む設定グループで「Only
                            security key」というより厳格な方式を上書き適用する。
                        </li>
                        <li>
                            パスワードポリシーはOUごとに継承構造で管理し(例:
                            契約社員OUのみ有効期限90日)、CAAは横断的な設定グループ(例:
                            リモートワーカーグループ)で管理する、といった役割分担を行う。
                        </li>
                    </ul>
                    <h4 id="ベストプラクティス-4">ベストプラクティス</h4>
                    <ul>
                        <li>
                            OU構造は「サービスの有効/無効やライセンス配布」など恒久的な区分に使い、頻繁に変わるアクセス制御の例外は設定グループで管理することで、OU階層を複雑化させずに済む。
                        </li>
                        <li>
                            ポリシーを上書き(Override)した場合、親のポリシーが変更されても自動追従しない点に注意し、「継承(Inherit)」に戻すべきタイミングを運用ルールとして明文化しておく。
                        </li>
                    </ul>
                    <blockquote className="section-block">
                        <p>
                            <strong>出典</strong>:{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/security/deploy-2-step-verification"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Deploy 2-Step Verification
                            </a>
                            (Group settings override organizational units の記載箇所) /{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/security/about-context-aware-access"
                                target="_blank"
                                rel="noreferrer"
                            >
                                About Context-Aware Access
                            </a>
                        </p>
                    </blockquote>
                    <hr />
                    <h3 id="416-管理者ロールの割り当てとタスクの委任">
                        4.1.6 管理者ロールの割り当てとタスクの委任
                    </h3>
                    <p>
                        Google Workspaceでは、Super
                        Adminがすべての権限を持つ一方、日々の運用は<strong>事前定義(Prebuilt)ロール</strong>または<strong>カスタムロール</strong>を用いて最小権限の原則(Principle
                        of Least Privilege)に基づき委任するのがベストプラクティスです。
                    </p>
                    <h4 id="主要な事前定義管理者ロール">主要な事前定義管理者ロール</h4>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">ロール</th>
                                    <th scope="col">主な権限</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td><strong>Super Admin</strong></td>
                                    <td>
                                        Admin Console・Admin
                                        APIの全機能。管理者ロールの作成・割り当て、他の管理者の管理(パスワード変更含む)、ユーザー削除時のファイル所有権移転、SAML
                                        IdPとしてのGoogle設定、Marketplaceアプリのインストール、2SV有効化の許可、Multi-party
                                        approvalのON/OFFなど、<strong>Super Adminにしかできない操作</strong>が多数存在する
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td><strong>Groups Admin</strong></td>
                                    <td>
                                        グループの作成・メンバー管理・アクセス設定・削除。Groups
                                        ReaderとGroups
                                        Editorに細分化可能で、セキュリティグループ/非セキュリティグループ、ロック済み/未ロックのグループ単位でも権限を絞れる
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td><strong>User Management Admin</strong></td>
                                    <td>
                                        <strong>管理者以外</strong>のユーザーアカウントの作成・削除・改名・パスワード変更・個々のセキュリティ設定管理。管理者アカウントには一切操作できない
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td><strong>Help Desk Admin</strong></td>
                                    <td>
                                        <strong>管理者以外</strong>のユーザーのパスワードリセットのみ(一次窓口向け)
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td><strong>Services Admin</strong></td>
                                    <td>
                                        Calendar・Drive・Docsなどのサービス設定、Chrome/モバイル端末管理、Takeout設定、AppSheet統治ポリシー、分類ラベル管理など
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td><strong>Mobile Admin</strong></td>
                                    <td>
                                        エンドポイント管理(端末の承認・アプリ管理・ブロック/ワイプ・ポリシー設定)
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td><strong>Storage Admin</strong></td>
                                    <td>
                                        ストレージ使用状況の確認・上限設定・Reports/Driveの設定への完全アクセス
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td><strong>Google Voice Admin</strong></td>
                                    <td>Google Voiceの場所・番号割り当て・ライセンス管理</td>
                                </tr>
                                <tr className="odd">
                                    <td><strong>Multi-party approval Admin</strong></td>
                                    <td>他の管理者が行う機密操作(2SVのON/OFF等)の承認・却下</td>
                                </tr>
                                <tr className="even">
                                    <td><strong>Reseller Admin / Indirect Reseller Admin</strong></td>
                                    <td>正規代理店・販売パートナー向け(顧客管理・注文・請求管理)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Diagram id="diag-5" label="タスク内容に応じた管理者ロール選択チャート" />
                    <h4 id="カスタム管理者ロール">カスタム管理者ロール</h4>
                    <p>
                        事前定義ロールで要件を満たせない場合、Super
                        Adminは<strong>カスタムロール</strong>を作成できます(組織全体で最大750個まで作成可能)。作成の流れは次の通りです。
                    </p>
                    <ol type="1">
                        <li>Admin roles ページで「Create new role」をクリック</li>
                        <li>ロール名・説明を入力</li>
                        <li>付与する権限(Privilege)を個別にチェック</li>
                        <li>権限を確認し「Create Role」で作成</li>
                        <li>作成したロールをユーザー・グループに割り当て</li>
                    </ol>
                    <p>
                        カスタムロールでも、<strong>他の管理者アカウントへの操作は一切できません</strong>。これはセキュリティ上の重要な制約で、権限をどれだけ広く付与しても、管理者アカウント同士の相互操作は防止される設計になっています。
                    </p>
                    <p>
                        また、User Management AdminやHelp Desk
                        Adminのように「ユーザー」に関する権限を1つ以上含むロールは、<strong>特定の組織単位に限定</strong>して割り当てることが可能です(最大1,000件の割り当て/OUごと)。これにより、「営業部門のHelp
                        Desk担当者は営業部門のユーザーのみパスワードをリセットできる」といった部門別の権限委任が実現できます。
                    </p>
                    <h4 id="ベストプラクティス-5">ベストプラクティス</h4>
                    <ul>
                        <li>
                            Super
                            Adminは可能な限り少人数(2〜4名程度)に絞り、日常運用は委任されたロールで対応する。
                        </li>
                        <li>
                            「Reports」「Security center」「Meet quality
                            tool」など、機微な情報にアクセスできる権限は、プライバシー保護の観点から必要最小限の管理者にのみ付与する。
                        </li>
                        <li>
                            カスタムロールを作成する前に、必ず事前定義ロールで要件を満たせないか確認する(車輪の再発明を避け、Googleが用意した権限セットの一貫性を活用する)。
                        </li>
                        <li>
                            定期的に「View role assignments and
                            privileges」でロール割り当てを棚卸しし、離任者や異動者に不要な権限が残っていないか確認する。
                        </li>
                    </ul>
                    <blockquote className="section-block">
                        <p>
                            <strong>出典</strong>:{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/users/prebuilt-administrator-roles"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Prebuilt administrator roles
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/users/administrator-privilege-definitions"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Administrator privilege definitions
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/users/create-edit-and-delete-custom-admin-roles"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Create, edit, and delete custom admin roles
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/users/assign-specific-admin-roles"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Assign specific admin roles
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/users/set-admin-privileges-to-protect-user-privacy"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Set admin privileges to protect user privacy
                            </a>
                        </p>
                    </blockquote>
                    <hr />
                    <h3 id="417-google-session-controlによるユーザーサインアウト設定">
                        4.1.7 Google Session Controlによるユーザーサインアウト設定
                    </h3>
                    <p>
                        Google Session Controlは、ユーザーがGoogleサービス(Gmail on the
                        webなど)に再サインインなしでアクセスできる<strong>最大時間</strong>(Webセッション長)を管理者が制御する機能です。設定場所は{' '}
                        <strong>Security &gt; Access and data control &gt; Google Session control</strong>{' '}
                        です。
                    </p>
                    <h4 id="主な仕様">主な仕様</h4>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">項目</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>既定値</td>
                                    <td>14日間</td>
                                </tr>
                                <tr className="even">
                                    <td>設定可能範囲</td>
                                    <td>短時間〜「無期限(never expire)」まで</td>
                                </tr>
                                <tr className="odd">
                                    <td>Admin Console自体のセッション</td>
                                    <td>常に1時間固定、変更不可</td>
                                </tr>
                                <tr className="even">
                                    <td>反映タイミング</td>
                                    <td>
                                        ユーザーが一度サインアウト・再サインインするまで旧設定が有効
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>モバイルネイティブアプリ</td>
                                    <td>
                                        セッション長の設定は適用不可(パスワードリセット等のイベントがない限り無期限)
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>OAuth認証アプリ・ChromeOS</td>
                                    <td>セッション長は強制されない</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Diagram id="diag-6" label="Google Session Control とサードパーティIdPのセッション相互作用" />
                    <h4 id="サードパーティidp利用時の注意">サードパーティIdP利用時の注意</h4>
                    <p>
                        サードパーティIdP(Okta、Entra
                        IDなど)経由でSSOを行っている場合、<strong>IdP側のセッション有効期限をGoogle側より短く設定</strong>する必要があります。これを怠ると、Googleセッションが満了しても有効なIdPセッションによって自動的にGoogleセッションが更新されてしまい、管理者が意図した頻度での再認証が実現できません。
                    </p>
                    <h4 id="即時サインアウトが必要な場合">即時サインアウトが必要な場合</h4>
                    <p>
                        セッション長の変更は「次回サインアウト時」から反映されるため、侵害が疑われるアカウントなど<strong>即時にサインアウトさせたい</strong>場合は、個別に「Sign
                        a user out of a managed Google
                        Account」機能でサインイン用Cookieをリセットする必要があります(一括操作は不可、ユーザーごとに実施)。
                    </p>
                    <h4 id="ベストプラクティス-6">ベストプラクティス</h4>
                    <ul>
                        <li>
                            リスクの高いOU(経理・法務・IT管理者など)には短めのセッション長を、一般ユーザーには利便性を考慮した長めのセッション長を、OU/設定グループで使い分ける。
                        </li>
                        <li>
                            Google
                            Meetの会議開始が2時間以内に迫っている場合、セッション満了前でも自動的に再サインインが求められる仕様があるため、会議直前の急な再認証要求についてユーザーへ周知しておく。
                        </li>
                        <li>
                            サードパーティIdPを導入する際は、IdP側のセッションタイムアウト設定を必ずGoogle
                            Session Controlの値とセットで見直すプロセスを移行手順に組み込む。
                        </li>
                    </ul>
                    <blockquote className="section-block">
                        <p>
                            <strong>出典</strong>:{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/security/set-session-length-for-google-services"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Set session length for Google services
                            </a>
                        </p>
                    </blockquote>
                    <hr />
                    <h2 id="42-セキュリティリスクとイベントのレポート監査調査">
                        4.2 セキュリティリスクとイベントのレポート・監査・調査
                    </h2>
                    <h3 id="421-監査と調査ツールによるログの調査分析">
                        4.2.1 監査と調査ツールによるログの調査分析
                    </h3>
                    <p>
                        <strong>セキュリティ調査ツール</strong>(Security Investigation
                        Tool)は、ドメイン内のセキュリティ・プライバシー上の問題を特定・トリアージ・是正するための中心的なツールです。単なる閲覧用のログビューアではなく、<strong>検索結果に対して直接アクションを実行できる</strong>点が最大の特徴です。
                    </p>
                    <h4 id="調査ツールでできること">調査ツールでできること</h4>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">領域</th>
                                    <th scope="col">具体例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>デバイス</td>
                                    <td>
                                        登録済みデバイスとそのログデータの確認、データアクセスに使われたアプリ・端末の把握
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Gmailメッセージ</td>
                                    <td>
                                        メール本文を含むデータへのアクセス、悪意あるメールの発見・削除、迷惑メール/フィッシング登録、受信トレイへの再配信
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>ユーザー</td>
                                    <td>停止済みユーザーの一覧表示</td>
                                </tr>
                                <tr className="even">
                                    <td>Drive</td>
                                    <td>
                                        ファイル共有状況の調査、ドキュメントの作成・削除の追跡、アクセス者の特定
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        管理者による調査ツール上の検索・アクションは、それ自体が<strong>Admin監査ログ</strong>(Admin
                        log event
                        data)に記録されます。つまり「誰が・いつ・どのユーザーのどのデータを調べたか」自体が監査可能であり、プライバシー保護の観点からも重要な仕組みです。
                    </p>
                    <h4 id="データソースの考え方">データソースの考え方</h4>
                    <p>調査ツールで扱えるデータソースは大きく2種類に分類されます。</p>
                    <ul>
                        <li>
                            <strong>ライブステートデータソース</strong>(Devices、Users、Gmail
                            messagesなど): 現在の状態をそのまま検索する。
                        </li>
                        <li>
                            <strong>ログイベントデータソース</strong>(Gmail log events、Admin log
                            events、Device log eventsなど): 過去に発生したイベントの履歴を検索する。
                        </li>
                    </ul>
                    <p>
                        この区分は次節のアクティビティルールの仕様にも直結する重要な概念です(ルールはログイベントデータソースのみを基に作成可能)。
                    </p>
                    <h4 id="ベストプラクティス-7">ベストプラクティス</h4>
                    <ul>
                        <li>
                            調査ツールへのアクセス権(Audit and investigation
                            privilege)は、Reports権限を持つ管理者に自動的に付与されるため、権限設計時にはReports権限の付与範囲を慎重に検討する。
                        </li>
                        <li>
                            「保存済み調査(Saved investigation)」機能を活用し、定型的な調査クエリ(例:
                            外部共有されたDriveファイルの週次チェック)をテンプレート化しておく。
                        </li>
                        <li>
                            Gmail・Driveのログデータには機微な内容(メール本文・文書タイトル等)が含まれるため、閲覧権限は必要最小限の管理者に絞る。
                        </li>
                    </ul>
                    <blockquote className="section-block">
                        <p>
                            <strong>出典</strong>:{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/security/about-the-security-investigation-tool"
                                target="_blank"
                                rel="noreferrer"
                            >
                                About the security investigation tool
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/security/about-the-security-center"
                                target="_blank"
                                rel="noreferrer"
                            >
                                About the security center
                            </a>
                        </p>
                    </blockquote>
                    <hr />
                    <h3 id="422-セキュリティセンターによるリスク脅威の特定">
                        4.2.2 セキュリティセンターによるリスク・脅威の特定
                    </h3>
                    <p>
                        <strong>セキュリティセンター</strong>(Security Center)は、Admin
                        Consoleの高度なセキュリティ設定を拡張し、ドメインに影響するセキュリティ問題への可視性とコントロールを提供する統合機能です。3つの主要コンポーネントから構成されます。
                    </p>
                    <Diagram id="diag-7" label="セキュリティセンターの3つの主要コンポーネント" />
                    <h4 id="セキュリティダッシュボードsecurity-dashboard">
                        セキュリティダッシュボード(Security Dashboard)
                    </h4>
                    <p>
                        複数のセキュリティセンターレポートの概要を一画面で俯瞰できる機能です。表示されるレポート・グラフの種類は、契約しているGoogle
                        Workspaceのエディション(アカウント種別)によって異なります。データは<strong>15分ごと</strong>に更新され、ログ記録から最大15分以内に反映されます。この更新頻度は「ほぼリアルタイムだが即時ではない」という点で試験に出やすい仕様です。
                    </p>
                    <h4 id="アクセスに必要な権限">アクセスに必要な権限</h4>
                    <p>
                        セキュリティセンター全体を利用するには「Admin privileges for the security
                        center」で定義された適切な権限が必要です。前述の通り、調査ツール利用にはさらに個別の閲覧権限(Gmailメッセージ・Driveログなど、データソースごと)が必要になる場合があります。
                    </p>
                    <h4 id="脅威の特定における位置付け">脅威の特定における位置付け</h4>
                    <p>
                        セキュリティセンターは「何が起きたか(過去)」を調査するだけでなく、「今どのようなリスクにさらされているか(現在)」を可視化するダッシュボードとしての役割も担います。次節のセキュリティ健全性ページと組み合わせることで、<strong>リアクティブな調査(4.2.1)</strong> と <strong>プロアクティブな設定監視(4.2.3)</strong> の両輪でセキュリティ運用を行うのがGoogle Workspaceの設計思想です。
                    </p>
                    <h4 id="ベストプラクティス-8">ベストプラクティス</h4>
                    <ul>
                        <li>
                            セキュリティダッシュボードのレポートは、経営層向けの月次セキュリティレポートのベースとして活用し、共有可能な形でエクスポートする運用を確立する。
                        </li>
                        <li>
                            エディションによって利用可能なレポートが異なるため、契約エディションのアップグレード検討時にはセキュリティセンターの機能差分も評価基準に含める。
                        </li>
                    </ul>
                    <blockquote className="section-block">
                        <p>
                            <strong>出典</strong>:{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/security/about-the-security-center"
                                target="_blank"
                                rel="noreferrer"
                            >
                                About the security center
                            </a>
                        </p>
                    </blockquote>
                    <hr />
                    <h3 id="423-セキュリティ健全性ページによる設定ギャップの特定">
                        4.2.3 セキュリティ健全性ページによる設定ギャップの特定
                    </h3>
                    <p>
                        <strong>セキュリティ健全性ページ</strong>(Security Health)は、Admin
                        Console全体に散らばる各種セキュリティ関連設定の<strong>現在の状態を一元的に可視化</strong>するための機能です。「自動メール転送」「端末の暗号化状態」「Driveの共有設定」「2SVの登録・強制状況」など、多岐にわたる設定項目を一覧でチェックでき、Googleが推奨するベースラインとの差分(=ギャップ)を発見しやすくする点が最大の価値です。
                    </p>
                    <h4 id="主なチェック対象カテゴリ">主なチェック対象カテゴリ</h4>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">カテゴリ</th>
                                    <th scope="col">確認できる内容の例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>アカウントセキュリティ</td>
                                    <td>管理者・ユーザーの2SV登録状況、強制状況</td>
                                </tr>
                                <tr className="even">
                                    <td>Gmail</td>
                                    <td>自動転送設定、メールルーティングの健全性</td>
                                </tr>
                                <tr className="odd">
                                    <td>Drive</td>
                                    <td>外部共有設定、Trust Rulesの適用状況</td>
                                </tr>
                                <tr className="even">
                                    <td>Groups</td>
                                    <td>グループの外部公開範囲</td>
                                </tr>
                                <tr className="odd">
                                    <td>デバイス管理</td>
                                    <td>端末の暗号化・パスコード要求状況</td>
                                </tr>
                                <tr className="even">
                                    <td>Marketplace</td>
                                    <td>インストール済みアプリのリスク評価</td>
                                </tr>
                                <tr className="odd">
                                    <td>Sites</td>
                                    <td>公開設定の状態</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        セキュリティ健全性ページで確認できる項目は<strong>契約エディションによって異なります</strong>。また、あくまで「一般的なセキュリティガイドラインに基づく推奨状態との比較」であるため、実際に設定を変更するかどうかは、組織のビジネス要件やリスク管理ポリシーとのバランスを取って判断する必要があります(すべての推奨をそのまま適用すればよいわけではありません)。
                    </p>
                    <h4 id="421423の使い分け">4.2.1〜4.2.3の使い分け</h4>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">目的</th>
                                    <th scope="col">使うべき機能</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>「何が起きたか」を過去ログから調査したい</td>
                                    <td>セキュリティ調査ツール(4.2.1)</td>
                                </tr>
                                <tr className="even">
                                    <td>「今どのようなリスク傾向があるか」を俯瞰したい</td>
                                    <td>セキュリティダッシュボード(4.2.2)</td>
                                </tr>
                                <tr className="odd">
                                    <td>「設定が推奨状態からズレていないか」を点検したい</td>
                                    <td>セキュリティ健全性ページ(4.2.3)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h4 id="ベストプラクティス-9">ベストプラクティス</h4>
                    <ul>
                        <li>
                            新規に管理者になった際、まずセキュリティ健全性ページを確認し、既存環境のセキュリティ設定のベースラインを把握することから始めるとよい。
                        </li>
                        <li>
                            四半期ごとなど定期的にセキュリティ健全性ページをレビューし、設定ドリフト(意図せぬ設定変更の蓄積)を早期発見する運用を確立する。
                        </li>
                    </ul>
                    <blockquote className="section-block">
                        <p>
                            <strong>出典</strong>:{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/security/about-the-security-center"
                                target="_blank"
                                rel="noreferrer"
                            >
                                About the security center
                            </a>
                            (セキュリティ健全性ページの概要記載箇所)
                        </p>
                    </blockquote>
                    <hr />
                    <h3 id="424-アクティビティルールとアラートの作成">
                        4.2.4 アクティビティルールとアラートの作成
                    </h3>
                    <p>
                        <strong>アクティビティルール</strong>(Activity
                        Rules)は、「条件(Condition)」と「通知/アクション(Action)」を組み合わせ、「もしXが起きたら自動的にYを行う」という自動化を実現する機能です。2025年9月にかけて、従来の「Reporting
                        rules」から「Activity
                        rules」へと名称・機能が統合されました(移行済みルールは自動的に引き継がれ、追加対応は不要です)。
                    </p>
                    <p>
                        Googleは指定された検索条件を継続的に実行し、しきい値を超える結果が発生した場合に、設定された通知・アクションを実行します。
                    </p>
                    <Diagram id="diag-8" label="アクティビティルールの作成と評価フロー" />
                    <h4 id="重要な仕様上の制約">重要な仕様上の制約</h4>
                    <ul>
                        <li>
                            アクティビティルールは<strong>ログイベントデータソース</strong>(Gmail log
                            eventsなど)のみを基に作成可能で、Chrome browsers・Devices・Gmail
                            messages・Usersのような<strong>ライブステートデータソース</strong>は使用できません。
                        </li>
                        <li>ルールには最低1つの<strong>Event条件</strong>を含める必要があります。</li>
                        <li>
                            基本機能ではAND条件のみ最大5つまで、上位エディションではOR条件・ネストした条件・5つを超える条件・アクション設定などの高度な機能が利用可能です。
                        </li>
                        <li>
                            <strong>日付フィルタは使用できません</strong>(ルールは常に継続的に評価されるため)。
                        </li>
                        <li>
                            アクティビティルールは<strong>イベント発生後</strong>にトリガーされる性質上、「ドキュメント共有そのものをブロックする」「メール送信自体を止める」といったリアルタイム制御には向きません(それらはDLPルールやCAAの役割です)。
                        </li>
                    </ul>
                    <h4 id="しきい値thresholdとしきい値ウィンドウ">
                        しきい値(Threshold)としきい値ウィンドウ
                    </h4>
                    <p>
                        しきい値は<strong>ユーザー単位ではなく累積</strong>(cumulative)で評価される点に注意が必要です。例えば「1時間以内に5回のサインイン失敗でユーザーを一時停止」というルールを設定した場合、複数ユーザー合計で5回失敗が発生した時点でしきい値に到達し、その時点で失敗履歴のあるすべてのユーザーが一時停止対象になります。「特定の1ユーザーが5回失敗した場合のみ」という動作にはならない点は、試験・実務双方で誤解しやすいポイントです。
                    </p>
                    <h4 id="ルールのステータス">ルールのステータス</h4>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">ステータス</th>
                                    <th scope="col">動作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Active(既定)</td>
                                    <td>ログを収集し、ルールを強制執行する</td>
                                </tr>
                                <tr className="even">
                                    <td>Monitor</td>
                                    <td>ログを収集するが、ルールは強制執行しない(事前検証用)</td>
                                </tr>
                                <tr className="odd">
                                    <td>Inactive</td>
                                    <td>ログを収集せず、ルールも執行しない</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h4 id="ベストプラクティス-10">ベストプラクティス</h4>
                    <ul>
                        <li>
                            新規ルールはまず「Monitor」ステータスで一定期間運用し、誤検知(false
                            positive)の頻度を確認してから「Active」に切り替える。
                        </li>
                        <li>
                            通知過多を避けるため、しきい値と通知頻度(1時間あたり最大2/5/10件、または毎回)を組み合わせて調整する。
                        </li>
                        <li>
                            ルールから実行される自動アクション(ユーザー一時停止・強制パスワード変更など)は、業務影響が大きいため、まずアラートのみのルールから始め、十分な信頼性が確認できたアクションのみ自動化する。
                        </li>
                    </ul>
                    <blockquote className="section-block">
                        <p>
                            <strong>出典</strong>:{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/security/create-and-manage-activity-rules"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Create and manage activity rules
                            </a>
                        </p>
                    </blockquote>
                    <hr />
                    <h2 id="43-追加のgoogleおよびサードパーティアプリケーションの有効化">
                        4.3 追加のGoogleおよびサードパーティアプリケーションの有効化
                    </h2>
                    <h3 id="431-marketplaceアローリストの管理">4.3.1 Marketplaceアローリストの管理</h3>
                    <p>
                        Google Workspace
                        Marketplaceのアローリスト(allowlist)は、ユーザーが自身でインストールできるアプリの範囲を管理者が事前承認する仕組みです。アローリストは「Manage
                        access to apps」設定が{' '}
                        <strong>
                            Allow users to install and run allowlisted apps from the
                            Marketplace
                        </strong>{' '}
                        になっているユーザーにのみ影響します。
                    </p>
                    <h4 id="アプリアクセスの3つのモード">アプリアクセスの3つのモード</h4>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">モード</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>任意のアプリを許可</td>
                                    <td>ユーザーは任意のMarketplaceアプリをインストール・実行可能</td>
                                </tr>
                                <tr className="even">
                                    <td>アローリストのみ許可</td>
                                    <td>管理者が承認したアプリのみインストール・実行可能</td>
                                </tr>
                                <tr className="odd">
                                    <td>インストール不可</td>
                                    <td>
                                        ユーザー自身はいかなるアプリもインストールできない(管理者による代理インストールは可能)
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        <strong>除外リスト</strong>(Excludelist)の挙動にも注意が必要です。組織全体でアプリを除外することは「アローリストに追加しない」ことと同義ですが、特定のOUのみで除外指定した場合、親OUでそのアプリが許可されていなければ実質的に効果を持ちません(親の許可が前提条件になる)。また、除外リストはMarketplace以外の経路からのアプリインストールを妨げるものではなく、より強力なデータアクセス制御が必要な場合は次節のAPI
                        Controlsを併用します。
                    </p>
                    <h4 id="ベストプラクティス-11">ベストプラクティス</h4>
                    <ul>
                        <li>
                            アプリを一部のユーザーのみに提供したい場合は、事前にそのユーザーを専用のOUまたはアクセスグループに配置してから、そのOU/グループに対してのみアプリを許可する。
                        </li>
                        <li>
                            アローリストに追加されたアプリは自動的に「信頼済み(Trusted)」として扱われるため、アローリスト登録前に十分なレビュー(要求スコープの確認等)を行う。
                        </li>
                        <li>
                            未成年ユーザー(18歳未満)が在籍する組織(教育機関など)では、Marketplaceアプリは既定でGoogleデータへのアクセスがブロックされ、アローリスト登録・管理者インストール・個別設定のいずれかを行わない限り利用できない点を踏まえ、保護者の同意取得プロセスも運用に組み込む。
                        </li>
                    </ul>
                    <blockquote className="section-block">
                        <p>
                            <strong>出典</strong>:{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/apps/manage-the-marketplace-app-allowlist-for-your-organization"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Manage the Marketplace app allowlist for your organization
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/apps/set-whether-users-can-install-marketplace-apps"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Set whether users can install Marketplace apps
                            </a>
                        </p>
                    </blockquote>
                    <hr />
                    <h3 id="432-marketplaceとplayストアアプリのデプロイと制限">
                        4.3.2 MarketplaceとPlayストアアプリのデプロイと制限
                    </h3>
                    <p>
                        Googleは、アプリガバナンスを2つの補完的なレイヤーで捉えることを推奨しています。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">レイヤー</th>
                                    <th scope="col">制御対象</th>
                                    <th scope="col">主なツール</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>App access(アプリアクセス)</td>
                                    <td>ユーザーがインストール・実行できるアプリそのものの範囲</td>
                                    <td>Marketplaceアローリスト・インストール設定</td>
                                </tr>
                                <tr className="even">
                                    <td>API controls(API制御)</td>
                                    <td>
                                        インストールされたアプリがどのGoogleデータ(スコープ)にアクセスできるか
                                    </td>
                                    <td>API Controls(App Access Control)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        App accessを「任意のアプリを許可」に設定している組織ほど、API
                        controlsによるデータアクセス制御の重要性が高まります。両者を組み合わせることで、「インストールは自由だが、機密性の高いデータへのアクセスは個別審査する」という柔軟な運用が可能になります。
                    </p>
                    <h4 id="デプロイ方法の選択">デプロイ方法の選択</h4>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">方法</th>
                                    <th scope="col">説明</th>
                                    <th scope="col">適したケース</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>ユーザー自身によるインストール(アローリスト経由)</td>
                                    <td>ユーザーがMarketplaceからセルフサービスでインストール</td>
                                    <td>全社共通ツールで、部門ごとの裁量を残したい場合</td>
                                </tr>
                                <tr className="even">
                                    <td>管理者による代理インストール(Admin install)</td>
                                    <td>
                                        管理者がユーザーに代わって組織全体・特定OUへ一括インストール
                                    </td>
                                    <td>
                                        必須ツールを全員に確実に配布したい場合、Marketplace承認画面をスキップしたい場合
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        管理者によるドメインインストール(Domain
                        installation)を使うと、承認済みアプリに限り、エンドユーザーが個別に同意画面を確認する手間を省略できます。
                    </p>
                    <h4 id="google-play-ストアアプリの制限モバイルchrome-os">
                        Google Play ストアアプリの制限(モバイル/Chrome OS)
                    </h4>
                    <p>
                        Google Playストアアプリの制御は、モバイルデバイス管理(4.1章とは別領域である第5章
                        Managing browsers and
                        endpointsの範囲と重なりますが)、基本的にはGoogle基本モバイル管理・高度なモバイル管理・サードパーティMDMのいずれかを通じて、組織単位・グループ単位でアプリの許可/ブロック/強制インストールを行います。Marketplaceと同様に「アプリそのものへのアクセス」と「アプリが要求するAPIスコープ」を分けて考える設計思想は共通しています。
                    </p>
                    <h4 id="ベストプラクティス-12">ベストプラクティス</h4>
                    <ul>
                        <li>
                            必須アプリ(勤怠管理・経費精算など)は管理者インストールで確実に配布し、任意ツールはアローリスト経由のセルフサービスに留めることで、ガバナンスと利便性のバランスを取る。
                        </li>
                        <li>
                            アプリのインストール設定を「より制限的な設定」に変更すると、既にインストール済みのユーザーがアクセスできなくなる場合があるため、変更前に影響範囲(利用者数・利用中のワークフロー)を確認する。
                        </li>
                        <li>
                            Drive・Calendar・Chatなど、サービスごとに個別のサードパーティアプリ許可設定(アドオン等)が存在し、これらはMarketplace全体設定より優先される。サービス単位の設定も忘れずに確認する。
                        </li>
                    </ul>
                    <blockquote className="section-block">
                        <p>
                            <strong>出典</strong>:{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/apps/get-started-as-a-marketplace-app-admin"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Get started as a Marketplace app admin
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/apps/set-whether-users-can-install-marketplace-apps"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Set whether users can install Marketplace apps
                            </a>
                        </p>
                    </blockquote>
                    <hr />
                    <h3 id="433-サードパーティアプリケーションでのsso設定">
                        4.3.3 サードパーティアプリケーションでのSSO設定
                    </h3>
                    <p>
                        Google
                        WorkspaceにおけるSSOは、大きく2つの「向き」で理解する必要があります。試験でもこの2方向の違いを問う設問が出やすいポイントです。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">方向</th>
                                    <th scope="col">説明</th>
                                    <th scope="col">Googleの役割</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <strong>Google as IdP</strong>(GoogleがIdentity Providerになる)
                                    </td>
                                    <td>
                                        ユーザーはGoogleアカウントでサインインし、SAML対応の外部サービス(200以上の事前統合アプリ、またはカスタムSAMLアプリ)へアクセスする
                                    </td>
                                    <td>Identity Provider(IdP)</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <strong>サードパーティIdPを利用</strong>(Okta、Microsoft Entra
                                        IDなど)
                                    </td>
                                    <td>
                                        ユーザーは外部IdPでサインインし、その認証結果を使ってGoogle
                                        Workspaceへアクセスする
                                    </td>
                                    <td>Service Provider(SP)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h4 id="google-as-idp-事前統合アプリとカスタムsamlアプリ">
                        Google as IdP: 事前統合アプリとカスタムSAMLアプリ
                    </h4>
                    <p>
                        Googleは200以上の主要なクラウドアプリ(Salesforce、Slack、Zoom、AWS、Boxなど)に対して、SAML
                        2.0ベースの事前統合SSOを提供しています。カタログにないアプリについては「カスタムSAMLアプリ」として手動で設定でき、以下の情報をサービスプロバイダー側に受け渡します。
                    </p>
                    <ul>
                        <li>SSO URL(Entity IDと合わせてIdPのメタデータを構成)</li>
                        <li>署名用証明書(またはSHA-256フィンガープリント)</li>
                        <li>属性マッピング(氏名・メールアドレス等、大文字小文字を区別)</li>
                    </ul>
                    <Diagram id="diag-9" label="API Controls アプリアクセス判定フロー" />
                    <h4 id="サードパーティidpを利用する場合googleがservice-provider">
                        サードパーティIdPを利用する場合(GoogleがService Provider)
                    </h4>
                    <p>
                        Google
                        Workspaceは、SAMLとOIDCの両プロトコルをサポートします(OIDCは現時点でMicrosoft
                        Entra
                        IDのみ対応)。設定は「<strong>SSOプロファイル</strong>」という単位で行い、プロファイルをユーザーグループ・組織単位に割り当てることで、<strong>複数のIdPを併用</strong>したり、本番導入前にテスト用プロファイルを試したりすることが可能です。これはGoogleが推奨する現行方式です。
                    </p>
                    <p>
                        旧方式として「レガシーSSOプロファイル」も存在しますが、これは単一のIdPしかサポートせず、既にSSOプロファイル方式へ移行済みのユーザー向けの互換性維持機能という位置付けです。新規構築では原則SSOプロファイル方式を選択します。
                    </p>
                    <p>
                        サードパーティIdPを設定する際は、以下の情報をGoogle側(Service Provider
                        Details)から取得し、IdP側のSSO設定へ入力します。
                    </p>
                    <ul>
                        <li>ACS URL(Assertion Consumer Service URL)</li>
                        <li>Entity ID</li>
                    </ul>
                    <p>いずれもSSOプロファイルごとに一意の値が発行されます。</p>
                    <h4 id="混在環境の注意点412との関連">混在環境の注意点(4.1.2との関連)</h4>
                    <p>
                        前述の通り、サードパーティIdPでSAML
                        SSOを利用する場合、Google側のパスワードポリシー強制には既知の不具合があるため無効化が推奨されます。また、OIDCで認証している場合はパスワードポリシー自体が適用されません。SSO導入プロジェクトでは、認証プロトコルの選定と合わせて、パスワードポリシー・2SV強制設定の見直しを必ずセットで計画してください。
                    </p>
                    <h4 id="ベストプラクティス-13">ベストプラクティス</h4>
                    <ul>
                        <li>
                            SSO導入時は必ず「スーパー管理者アカウントの復旧経路」を確保する。IdP障害時にAdmin
                            Consoleへアクセスできなくなる事態を避けるため、Super
                            Adminは(少なくとも一部)Googleパスワード+2SVでのフォールバックサインインを維持することが強く推奨される。
                        </li>
                        <li>
                            カスタムSAMLアプリ設定後は、必ず「Test SAML
                            login」機能でIdP-initiated・SP-initiated双方のフローを検証してから本番展開する。
                        </li>
                        <li>
                            ユーザーのGoogleドメインのメールアドレスと、SAMLアプリ側のサインインメールアドレスが一致していることを事前に確認する(不一致はSSOエラーの典型的な原因)。
                        </li>
                    </ul>
                    <blockquote className="section-block">
                        <p>
                            <strong>出典</strong>:{' '}
                            <a
                                href="https://support.google.com/a/answer/10010706?hl=en"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Overview: Integrate 3rd-party apps with Google Workspace
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://support.google.com/a/answer/60224?hl=en"
                                target="_blank"
                                rel="noreferrer"
                            >
                                About SSO
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://support.google.com/a/answer/12032922?hl=en"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Setting up SSO
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://support.google.com/a/answer/6087519?hl=en"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Set up your own custom SAML app
                            </a>
                        </p>
                    </blockquote>
                    <hr />
                    <h3 id="434-特定ユーザーへの追加googleサービスのアクセス管理">
                        4.3.4 特定ユーザーへの追加Googleサービスのアクセス管理
                    </h3>
                    <p>
                        Google
                        Workspace管理者は、YouTube・AdSenseなど、コアのWorkspaceサービスではない「追加のGoogleサービス」についても、組織単位でのON/OFF制御が可能です。設定場所は{' '}
                        <strong>Apps &gt; Additional Google services</strong> です。
                    </p>
                    <h4 id="制御の基本パターン">制御の基本パターン</h4>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">方法</th>
                                    <th scope="col">適したケース</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>組織単位(OU)でON/OFF</td>
                                    <td>
                                        部署・役職などの恒久的な構造に基づき制御したい場合(例:
                                        マーケティング部門のみYouTubeを許可)
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>アクセスグループ(Access group)でON/OFFを上書き</td>
                                    <td>
                                        OU構造を変えずに、特定ユーザーだけ例外的にサービスを許可したい場合
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        アクセスグループは、OUの設定を**「オンに上書き」する方向にのみ**作用します。つまり、あるサービスがOU全体でOFFになっている状態で、一部のユーザーだけそのサービスを使わせたい場合にアクセスグループへ追加してONにする、という使い方はできますが、逆に「OUでONになっているサービスを、アクセスグループでOFFにする」ことはできません。サービスの詳細な挙動設定(共有範囲など)を上書きしたい場合は、アクセスグループではなく「設定グループ(Configuration
                        group)」を使用します。
                    </p>
                    <h4 id="個別サービスのオンオフ管理の例youtube">
                        個別サービスのオン/オフ管理の例(YouTube)
                    </h4>
                    <p>
                        YouTubeについては、単なるON/OFFだけでなく、コンテンツ設定(制限付きモードの適用、動画承認者の指定など)も組織単位・設定グループ単位で細かく制御できます。教育エディションでは2021年9月以降、年齢ベースのアクセス設定も導入されており、教職員は必ず「18歳以上」として識別しておかないと、自身が作成した教材コンテンツへのアクセスを失う可能性がある点も注意が必要です。
                    </p>
                    <h4 id="個別のonoffコントロールがないサービス">
                        個別のON/OFFコントロールがないサービス
                    </h4>
                    <p>
                        一部の追加サービスには専用のON/OFFトグルがなく、「Manage access to services that
                        aren't controlled
                        individually」という共通の管理画面から一括制御します。この場合、サービスをOFFにしてもユーザーのデータは削除されないため、データを保持させたい場合は事前にGoogle
                        Takeoutでのエクスポートをユーザーに案内することが推奨されます。
                    </p>
                    <h4 id="ベストプラクティス-14">ベストプラクティス</h4>
                    <ul>
                        <li>
                            追加サービスは「Are subject to change without notice」「May not be available
                            in all areas」「Are currently not covered by any support or service level
                            agreement」という位置付けである点を理解し、業務クリティカルな用途への依存は避ける。
                        </li>
                        <li>
                            サービスを無効化する前に、一部のOUだけで試験的に無効化し、数日間様子を見てから全社展開する。
                        </li>
                        <li>
                            YouTube・AdSenseなど組織のブランドイメージや外部公開に関わるサービスは、既定で無効化し、必要な部門にのみアクセスグループで許可する「デフォルト拒否」方式を検討する。
                        </li>
                    </ul>
                    <blockquote className="section-block">
                        <p>
                            <strong>出典</strong>:{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/users/advanced/turn-on-or-off-additional-google-services"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Turn on or off additional Google services
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://support.google.com/a/answer/182442?hl=en"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Turn a service on or off for Google Workspace users
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://support.google.com/a/answer/9050643?hl=en"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Customize service access using access groups
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://support.google.com/a/answer/6212415?hl=en"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Manage your organization's YouTube settings
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://support.google.com/a/answer/7646040?hl=en"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Manage access to services that aren't controlled individually
                            </a>
                        </p>
                    </blockquote>
                    <hr />
                    <h3 id="435-接続済みアプリケーションとサイトの削除">
                        4.3.5 接続済みアプリケーションとサイトの削除
                    </h3>
                    <p>
                        ユーザーがGoogleアカウントで様々なサードパーティアプリ・サイトにサインインすると、そのアプリはOAuth
                        2.0トークンを通じてGoogleデータへのアクセス権を持ち続けます。<strong>このトークンは明示的に取り消されない限り、パスワード変更後も有効であり続ける場合がある</strong>(自動失効の条件については後述)ため、組織的な棚卸しと削除の運用が重要になります。
                    </p>
                    <h4 id="管理者向け-api-controlsapp-access-control">
                        管理者向け: API Controls(App Access Control)
                    </h4>
                    <p>
                        管理者は{' '}
                        <strong>Security &gt; Access and data control &gt; API controls</strong>{' '}
                        から、組織全体でどのアプリがGoogleデータへアクセスしているかを一元的にレビュー・制御できます。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">表示区分</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Configured apps</td>
                                    <td>
                                        Trusted・Limited・Specific Google
                                        data・Blockedのいずれかが設定済みのアプリ
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Accessed apps</td>
                                    <td>
                                        実際にGoogleデータへアクセスしたことがあるアプリ(ユーザー数・要求スコープも表示)
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>Apps pending review</td>
                                    <td>ユーザーからアクセスをリクエストされ、レビュー待ちのアプリ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Diagram id="diag-10" label="SAML SSO認証シーケンス図" />
                    <p>
                        管理者がアプリを「Restricted(制限)」なサービスに対して「Blocked」に変更すると、それまで信頼されていなかったアプリは即座に停止し、<strong>関連するトークンも取り消され</strong>ます。この変更が「Accessed
                        apps」一覧に反映されるまでには最大48時間のタイムラグがある点に留意してください。
                    </p>
                    <p>
                        また、Gmail・Drive・Docs・Chatについては、送信・削除など特に影響の大きい「高リスクOAuthスコープ」をあらかじめ定義しており、これらを個別に制限対象へ含めることも可能です。
                    </p>
                    <h4 id="未設定unconfiguredアプリへの既定ポリシー">
                        未設定(Unconfigured)アプリへの既定ポリシー
                    </h4>
                    <p>
                        管理者が個別に設定していない(未設定)アプリに対しては、組織全体としての既定方針を選べます。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">既定ポリシー</th>
                                    <th scope="col">動作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>任意のアプリへのアクセスを許可(既定)</td>
                                    <td>
                                        ユーザーは未設定アプリにもGoogleでサインイン可能。取得できるデータは無制限
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>基本プロフィール情報のみ要求するアプリを許可</td>
                                    <td>
                                        氏名・メールアドレス・プロフィール写真のみ要求するアプリに限定して許可
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>いかなる未設定アプリへのアクセスも禁止</td>
                                    <td>
                                        管理者が個別に設定するまでサインイン不可(ユーザーからのアクセスリクエストは可能)
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h4 id="ユーザー自身による削除エンドユーザー操作">
                        ユーザー自身による削除(エンドユーザー操作)
                    </h4>
                    <p>
                        エンドユーザー自身も、<code>myaccount.google.com</code>{' '}
                        の「セキュリティ」&gt;「サードパーティによるアプリアクセス」から、個々のアプリの接続を削除できます。ここで「接続を削除(Delete
                        connection)」を選択すると、そのアプリに付与したアクセス権(OAuthトークン)が取り消され、アプリはそれ以降新しいデータへアクセスできなくなります。ただし、パスワード変更だけでは既存のOAuthトークン(特にリフレッシュトークン)は自動的には失効しない場合があるため、不審なアプリが疑われる場合は個別の「接続の削除」操作が確実です。
                    </p>
                    <h4 id="ベストプラクティス-15">ベストプラクティス</h4>
                    <ul>
                        <li>
                            定期的な棚卸し(四半期に一度など)を運用ルールとして定め、「Accessed
                            apps」一覧から利用実態のない・低評価のアプリを洗い出して削除する。
                        </li>
                        <li>
                            離職者・異動者が発生した際は、アカウント停止・削除の手順の一環として、その人物が過去に許可した接続アプリの棚卸しも行う(削除だけでは自動的にすべてのアプリ許可が取り消されるとは限らないため)。
                        </li>
                        <li>
                            「未設定アプリへの既定ポリシー」を「いかなる未設定アプリへのアクセスも禁止」に変更する場合は、業務で使われている正当なアプリが多数ブロックされる可能性があるため、事前に「Accessed
                            apps」で利用実態を十分に調査してから切り替える。
                        </li>
                    </ul>
                    <blockquote className="section-block">
                        <p>
                            <strong>出典</strong>:{' '}
                            <a
                                href="https://knowledge.workspace.google.com/admin/apps/control-which-apps-access-google-workspace-data"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Control which apps access Google Workspace data
                            </a>
                        </p>
                    </blockquote>
                    <hr />
                    <h2 id="試験対策チェックリスト">試験対策チェックリスト</h2>
                    <div className="checklist-card">
                        <div className="checklist-header">
                            <span>習熟度セルフチェック</span>
                            <span className="checklist-count">
                                {completedCount} / 13 完了
                            </span>
                        </div>
                        <ul className="checklist">
                            {[
                                '2SV展開の5ステップ(周知→許可→登録→追跡→強制)と、3つの強制方式(Any / Any except SMS・音声 / Only security key)の違いを説明できる',
                                'パスワードポリシーがハッシュ登録・管理者手動リセット・SSO(SAML/OIDC)利用時にどう扱われるかを説明できる',
                                'Context-Aware Accessが「誰か」ではなく「どこから・どの端末で」を制御する機能である点を、パスワード/2SVとの違いとして説明できる',
                                'Super Admin・Groups Admin・User Management Admin・Help Desk Adminの権限範囲の違いと、「他の管理者アカウントは誰も操作できない」というカスタムロールの制約を説明できる',
                                '組織単位(OU)と設定グループ(Configuration group)の優先順位(グループがOUを上書き)を説明できる',
                                'Google Session Controlの既定値(14日)、Admin Console自体のセッション(1時間固定)、サードパーティIdP利用時の注意点を説明できる',
                                'セキュリティ調査ツール・セキュリティダッシュボード・セキュリティ健全性ページの役割の違いを説明できる',
                                'アクティビティルールがログイベントデータソースのみで作成可能であり、しきい値が累積(ユーザー横断)で評価される点を説明できる',
                                'Marketplaceアローリストと除外リストの挙動(親OUの許可が前提条件になる点)を説明できる',
                                'App access(インストール可否)とAPI controls(データアクセス範囲)という2層構造でアプリガバナンスを捉えられる',
                                'Google as IdPとサードパーティIdP利用という2方向のSSO構成の違いを説明できる',
                                'アクセスグループがOUの設定を「オンに上書き」する方向にのみ作用する点を説明できる',
                                'Trusted / Specific Google data / Limited / Blockedという4つのAPIアクセスレベルの違いを説明できる',
                            ].map((text, idx) => (
                                <li key={idx}>
                                    <button
                                        type="button"
                                        className={`check-box ${checkedItems[idx] ? 'checked' : ''}`}
                                        onClick={() => toggleCheck(idx)}
                                        aria-label={text}
                                    >
                                        {checkedItems[idx] && '✓'}
                                    </button>
                                    <span>{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <hr />
                    <h2 id="参考文献">参考文献</h2>
                    <div className="ref-grid">
                        <div className="ref-card">
                            <h3>公式試験情報</h3>
                            <ul>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://cloud.google.com/learn/certification/associate-google-workspace-administrator?hl=en"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>Associate Google Workspace
                                        Administrator 認定ページ
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://services.google.com/fh/files/misc/associate_google_workspace_administrator_exam_guide_english.pdf"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>Associate Google Workspace
                                        Administrator Certification exam guide (PDF)
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h3>4.1 ユーザーアクセスの保護</h3>
                            <ul>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://knowledge.workspace.google.com/admin/security/deploy-2-step-verification"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>Deploy 2-Step Verification
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://knowledge.workspace.google.com/admin/security/about-2sv-enforcement-for-admins"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>About 2SV enforcement for
                                        admins
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://knowledge.workspace.google.com/admin/security/protect-your-business-with-2-step-verification"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>Protect your business with
                                        2-Step Verification
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://knowledge.workspace.google.com/admin/security/manage-a-users-security-settings"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>Manage a user's security
                                        settings
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://knowledge.workspace.google.com/admin/users/enforce-and-monitor-password-requirements-for-users"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>Enforce and monitor password
                                        requirements for users
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://knowledge.workspace.google.com/admin/security/about-context-aware-access"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>About Context-Aware Access
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://knowledge.workspace.google.com/admin/security/protect-your-business-with-context-aware-access"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>Protect your business with
                                        Context-Aware Access
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://knowledge.workspace.google.com/admin/users/prebuilt-administrator-roles"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>Prebuilt administrator roles
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://knowledge.workspace.google.com/admin/users/administrator-privilege-definitions"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>Administrator privilege
                                        definitions
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://knowledge.workspace.google.com/admin/users/create-edit-and-delete-custom-admin-roles"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>Create, edit, and delete custom
                                        admin roles
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://knowledge.workspace.google.com/admin/users/assign-specific-admin-roles"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>Assign specific admin roles
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://knowledge.workspace.google.com/admin/users/set-admin-privileges-to-protect-user-privacy"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>Set admin privileges to protect
                                        user privacy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://knowledge.workspace.google.com/admin/security/set-session-length-for-google-services"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>Set session length for Google
                                        services
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h3>4.2 レポート・監査・調査</h3>
                            <ul>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://knowledge.workspace.google.com/admin/security/about-the-security-investigation-tool"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>About the security investigation
                                        tool
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://knowledge.workspace.google.com/admin/security/about-the-security-center"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>About the security center
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://knowledge.workspace.google.com/admin/security/create-and-manage-activity-rules"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>Create and manage activity
                                        rules
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h3>4.3 追加アプリケーションの有効化</h3>
                            <ul>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://knowledge.workspace.google.com/admin/apps/manage-the-marketplace-app-allowlist-for-your-organization"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>Manage the Marketplace app
                                        allowlist for your organization
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://knowledge.workspace.google.com/admin/apps/set-whether-users-can-install-marketplace-apps"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>Set whether users can install
                                        Marketplace apps
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://knowledge.workspace.google.com/admin/apps/get-started-as-a-marketplace-app-admin"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>Get started as a Marketplace app
                                        admin
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://knowledge.workspace.google.com/admin/apps/control-which-apps-access-google-workspace-data"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>Control which apps access Google
                                        Workspace data
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://support.google.com/a/answer/10010706?hl=en"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>Overview: Integrate 3rd-party
                                        apps with Google Workspace
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://support.google.com/a/answer/60224?hl=en"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>About SSO
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://support.google.com/a/answer/12032922?hl=en"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>Setting up SSO
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://support.google.com/a/answer/6087519?hl=en"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>Set up your own custom SAML
                                        app
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://knowledge.workspace.google.com/admin/users/advanced/turn-on-or-off-additional-google-services"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>Turn on or off additional Google
                                        services
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://support.google.com/a/answer/182442?hl=en"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>Turn a service on or off for
                                        Google Workspace users
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://support.google.com/a/answer/9050643?hl=en"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>Customize service access using
                                        access groups
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://support.google.com/a/answer/6212415?hl=en"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>Manage your organization's
                                        YouTube settings
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="ref-link"
                                        href="https://support.google.com/a/answer/7646040?hl=en"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="ref-icon">↗</span>Manage access to services that
                                        aren't controlled individually
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
