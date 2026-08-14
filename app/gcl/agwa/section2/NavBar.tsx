// app/gcl/agwa/section2/NavBar.tsx
"use client";

import React, { useEffect, useState } from "react";

export const NavBar: React.FC = () => {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    const headings = document.querySelectorAll(".main h1[id], .main h2[id], .main h3[id]");
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <button
        className="sidebar-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 50,
          background: "var(--accent)",
          color: "#000",
          border: "none",
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
          cursor: "pointer"
        }}
      >
        ≡
      </button>

      <nav className={`sidebar ${isOpen ? "open" : ""}`} id="sidebarNav">
        <div className="sidebar-title">AGWA Section 2</div>
        <div className="sidebar-subtitle">コアWorkspaceサービスの管理</div>
        <ul className="nav-list">
                    <li className="nav-l2">
                        <a href="#section-2の全体像" className="nav-link" data-target="section-2の全体像">Section 2の全体像</a>
                    </li>
                    <li className="nav-l2">
                        <a href="#21-gmailの設定" className="nav-link" data-target="21-gmailの設定">2.1 Gmailの設定</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#211-mxレコードの設定" className="nav-link" data-target="211-mxレコードの設定">2.1.1 MXレコードの設定</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#212-基本的なメールルーティングの設定" className="nav-link" data-target="212-基本的なメールルーティングの設定">2.1.2 基本的なメールルーティングの設定</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#213-コンテンツコンプライアンスルール" className="nav-link" data-target="213-コンテンツコンプライアンスルール">2.1.3 コンテンツコンプライアンスルール</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#214-スパムフィッシングマルウェア対策" className="nav-link" data-target="214-スパムフィッシングマルウェア対策">2.1.4 スパム・フィッシング・マルウェア対策</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#215-添付ファイルサイズ制限とブロックするファイル形式" className="nav-link" data-target="215-添付ファイルサイズ制限とブロックするファイル形式">2.1.5 添付ファイルサイズ制限とブロックするファイル形式</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#216-gmail転送とpopimapアクセス" className="nav-link" data-target="216-gmail転送とpopimapアクセス">2.1.6 Gmail転送とPOP/IMAPアクセス</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#217-google推奨のメールセキュリティ対策spfdkimdmarc" className="nav-link" data-target="217-google推奨のメールセキュリティ対策spfdkimdmarc">2.1.7 Google推奨のメールセキュリティ対策（SPF・DKIM・DMARC）</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#218-メールデータの移行" className="nav-link" data-target="218-メールデータの移行">2.1.8 メールデータの移行</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#219-gmailアクセスの委任" className="nav-link" data-target="219-gmailアクセスの委任">2.1.9 Gmailアクセスの委任</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#2110-コンプライアンスフッターとメール隔離quarantine" className="nav-link" data-target="2110-コンプライアンスフッターとメール隔離quarantine">2.1.10 コンプライアンスフッターとメール隔離（Quarantine）</a>
                    </li>
                    <li className="nav-l2">
                        <a href="#22-google-driveとdocsの設定" className="nav-link" data-target="22-google-driveとdocsの設定">2.2 Google DriveとDocsの設定</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#221-新規ファイルのデフォルト共有設定" className="nav-link" data-target="221-新規ファイルのデフォルト共有設定">2.2.1 新規ファイルのデフォルト共有設定</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#222-drive信頼ルールtrust-rules" className="nav-link" data-target="222-drive信頼ルールtrust-rules">2.2.2 Drive信頼ルール（Trust Rules）</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#223-組織ポリシーに基づく外部共有の制限" className="nav-link" data-target="223-組織ポリシーに基づく外部共有の制限">2.2.3 組織ポリシーに基づく外部共有の制限</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#224-ターゲットオーディエンスの管理" className="nav-link" data-target="224-ターゲットオーディエンスの管理">2.2.4 ターゲットオーディエンスの管理</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#225-カスタムdocsテンプレートの設定" className="nav-link" data-target="225-カスタムdocsテンプレートの設定">2.2.5 カスタムDocsテンプレートの設定</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#226-共有ドライブの作成と管理" className="nav-link" data-target="226-共有ドライブの作成と管理">2.2.6 共有ドライブの作成と管理</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#227-ストレージ容量の設定と調整" className="nav-link" data-target="227-ストレージ容量の設定と調整">2.2.7 ストレージ容量の設定と調整</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#228-google-drive-for-desktopの許可禁止" className="nav-link" data-target="228-google-drive-for-desktopの許可禁止">2.2.8 Google Drive for desktopの許可・禁止</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#229-ファイルフォルダの所有権移転" className="nav-link" data-target="229-ファイルフォルダの所有権移転">2.2.9 ファイル・フォルダの所有権移転</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#2210-driveラベルの管理" className="nav-link" data-target="2210-driveラベルの管理">2.2.10 Driveラベルの管理</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#2211-オフラインアクセスの有効化無効化" className="nav-link" data-target="2211-オフラインアクセスの有効化無効化">2.2.11 オフラインアクセスの有効化・無効化</a>
                    </li>
                    <li className="nav-l2">
                        <a href="#23-google-calendarの設定" className="nav-link" data-target="23-google-calendarの設定">2.3 Google Calendarの設定</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#231-リソースカレンダーの作成と管理" className="nav-link" data-target="231-リソースカレンダーの作成と管理">2.3.1 リソースカレンダーの作成と管理</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#232-リソースの予約ポリシーの設定" className="nav-link" data-target="232-リソースの予約ポリシーの設定">2.3.2 リソースの予約ポリシーの設定</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#233-カレンダーリソースアクセスの委任" className="nav-link" data-target="233-カレンダーリソースアクセスの委任">2.3.3 カレンダー・リソースアクセスの委任</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#234-プライマリセカンダリカレンダーのデフォルト内部共有設定" className="nav-link" data-target="234-プライマリセカンダリカレンダーのデフォルト内部共有設定">2.3.4 プライマリ・セカンダリカレンダーのデフォルト内部共有設定</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#235-チームグループ向け共有カレンダーの設定" className="nav-link" data-target="235-チームグループ向け共有カレンダーの設定">2.3.5 チーム・グループ向け共有カレンダーの設定</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#236-カレンダーの外部共有オプションの管理" className="nav-link" data-target="236-カレンダーの外部共有オプションの管理">2.3.6 カレンダーの外部共有オプションの管理</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#237-イベント所有権の移転" className="nav-link" data-target="237-イベント所有権の移転">2.3.7 イベント所有権の移転</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#238-不明な送信者からの招待の防止" className="nav-link" data-target="238-不明な送信者からの招待の防止">2.3.8 不明な送信者からの招待の防止</a>
                    </li>
                    <li className="nav-l2">
                        <a href="#24-google-meetの設定" className="nav-link" data-target="24-google-meetの設定">2.4 Google Meetの設定</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#241-組織ou単位でのmeetの有効化無効化" className="nav-link" data-target="241-組織ou単位でのmeetの有効化無効化">2.4.1 組織・OU単位でのMeetの有効化・無効化</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#242-meetセーフティ設定の構成" className="nav-link" data-target="242-meetセーフティ設定の構成">2.4.2 Meetセーフティ設定の構成</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#243-meetビデオ設定の構成画質録画文字起こしノートテイキング" className="nav-link" data-target="243-meetビデオ設定の構成画質録画文字起こしノートテイキング">2.4.3
                            Meetビデオ設定の構成（画質・録画・文字起こし・ノートテイキング）</a>
                    </li>
                    <li className="nav-l2">
                        <a href="#25-google-chatの設定" className="nav-link" data-target="25-google-chatの設定">2.5 Google Chatの設定</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#251-組織ou単位でのchatの有効化無効化" className="nav-link" data-target="251-組織ou単位でのchatの有効化無効化">2.5.1 組織・OU単位でのChatの有効化・無効化</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#252-admin-consoleでのchat設定" className="nav-link" data-target="252-admin-consoleでのchat設定">2.5.2 Admin consoleでのChat設定</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#253-chat招待設定の管理" className="nav-link" data-target="253-chat招待設定の管理">2.5.3 Chat招待設定の管理</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#254-chatアプリの追加" className="nav-link" data-target="254-chatアプリの追加">2.5.4 Chatアプリの追加</a>
                    </li>
                    <li className="nav-l2">
                        <a href="#26-google-workspaceにおける生成aiの活用" className="nav-link" data-target="26-google-workspaceにおける生成aiの活用">2.6 Google Workspaceにおける生成AIの活用</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#261-生成ai利用時の組織データのプライバシーとセキュリティ確保" className="nav-link" data-target="261-生成ai利用時の組織データのプライバシーとセキュリティ確保">2.6.1 生成AI利用時の組織データのプライバシーとセキュリティ確保</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#262-組織ou単位でのgeminiの有効化無効化" className="nav-link" data-target="262-組織ou単位でのgeminiの有効化無効化">2.6.2 組織・OU単位でのGeminiの有効化・無効化</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#263-geminiアプリ向けgoogle-workspace拡張機能の有効化" className="nav-link" data-target="263-geminiアプリ向けgoogle-workspace拡張機能の有効化">2.6.3 Geminiアプリ向けGoogle Workspace拡張機能の有効化</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#264-gemini利用状況レポートの生成" className="nav-link" data-target="264-gemini利用状況レポートの生成">2.6.4 Gemini利用状況レポートの生成</a>
                    </li>
                    <li className="nav-l2">
                        <a href="#27-workspace開発のサポート" className="nav-link" data-target="27-workspace開発のサポート">2.7 Workspace開発のサポート</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#271-appsheetとapps-scriptのユースケース" className="nav-link" data-target="271-appsheetとapps-scriptのユースケース">2.7.1 AppSheetとApps Scriptのユースケース</a>
                    </li>
                    <li className="nav-l3">
                        <a href="#272-組織ou単位でのappsheetの有効化" className="nav-link" data-target="272-組織ou単位でのappsheetの有効化">2.7.2 組織・OU単位でのAppSheetの有効化</a>
                    </li>
                    <li className="nav-l2">
                        <a href="#section-2-ベストプラクティス総括表" className="nav-link" data-target="section-2-ベストプラクティス総括表">Section 2 ベストプラクティス総括表</a>
                    </li>
                    <li className="nav-l2">
                        <a href="#学習チェックリスト" className="nav-link" data-target="学習チェックリスト">学習チェックリスト</a>
                    </li>
                    <li className="nav-l2">
                        <a href="#参考文献" className="nav-link" data-target="参考文献">参考文献</a>
                    </li>
                </ul>
      </nav>
    </>
  );
};
