// app/gcl/agwa/section2/NavBar.tsx
"use client";

import React, { useEffect, useState } from "react";

const NAV_ITEMS = [
  {
    "type": "l2",
    "id": "section-2の全体像",
    "label": "Section 2の全体像"
  },
  {
    "type": "l2",
    "id": "21-gmailの設定",
    "label": "2.1 Gmailの設定"
  },
  {
    "type": "l3",
    "id": "211-mxレコードの設定",
    "label": "2.1.1 MXレコードの設定"
  },
  {
    "type": "l3",
    "id": "212-基本的なメールルーティングの設定",
    "label": "2.1.2 基本的なメールルーティングの設定"
  },
  {
    "type": "l3",
    "id": "213-コンテンツコンプライアンスルール",
    "label": "2.1.3 コンテンツコンプライアンスルール"
  },
  {
    "type": "l3",
    "id": "214-スパムフィッシングマルウェア対策",
    "label": "2.1.4 スパム・フィッシング・マルウェア対策"
  },
  {
    "type": "l3",
    "id": "215-添付ファイルサイズ制限とブロックするファイル形式",
    "label": "2.1.5 添付ファイルサイズ制限とブロックするファイル形式"
  },
  {
    "type": "l3",
    "id": "216-gmail転送とpopimapアクセス",
    "label": "2.1.6 Gmail転送とPOP/IMAPアクセス"
  },
  {
    "type": "l3",
    "id": "217-google推奨のメールセキュリティ対策spfdkimdmarc",
    "label": "2.1.7 Google推奨のメールセキュリティ対策（SPF・DKIM・DMARC）"
  },
  {
    "type": "l3",
    "id": "218-メールデータの移行",
    "label": "2.1.8 メールデータの移行"
  },
  {
    "type": "l3",
    "id": "219-gmailアクセスの委任",
    "label": "2.1.9 Gmailアクセスの委任"
  },
  {
    "type": "l3",
    "id": "2110-コンプライアンスフッターとメール隔離quarantine",
    "label": "2.1.10 コンプライアンスフッターとメール隔離（Quarantine）"
  },
  {
    "type": "l2",
    "id": "22-google-driveとdocsの設定",
    "label": "2.2 Google DriveとDocsの設定"
  },
  {
    "type": "l3",
    "id": "221-新規ファイルのデフォルト共有設定",
    "label": "2.2.1 新規ファイルのデフォルト共有設定"
  },
  {
    "type": "l3",
    "id": "222-drive信頼ルールtrust-rules",
    "label": "2.2.2 Drive信頼ルール（Trust Rules）"
  },
  {
    "type": "l3",
    "id": "223-組織ポリシーに基づく外部共有の制限",
    "label": "2.2.3 組織ポリシーに基づく外部共有の制限"
  },
  {
    "type": "l3",
    "id": "224-ターゲットオーディエンスの管理",
    "label": "2.2.4 ターゲットオーディエンスの管理"
  },
  {
    "type": "l3",
    "id": "225-カスタムdocsテンプレートの設定",
    "label": "2.2.5 カスタムDocsテンプレートの設定"
  },
  {
    "type": "l3",
    "id": "226-共有ドライブの作成と管理",
    "label": "2.2.6 共有ドライブの作成と管理"
  },
  {
    "type": "l3",
    "id": "227-ストレージ容量の設定と調整",
    "label": "2.2.7 ストレージ容量の設定と調整"
  },
  {
    "type": "l3",
    "id": "228-google-drive-for-desktopの許可禁止",
    "label": "2.2.8 Google Drive for desktopの許可・禁止"
  },
  {
    "type": "l3",
    "id": "229-ファイルフォルダの所有権移転",
    "label": "2.2.9 ファイル・フォルダの所有権移転"
  },
  {
    "type": "l3",
    "id": "2210-driveラベルの管理",
    "label": "2.2.10 Driveラベルの管理"
  },
  {
    "type": "l3",
    "id": "2211-オフラインアクセスの有効化無効化",
    "label": "2.2.11 オフラインアクセスの有効化・無効化"
  },
  {
    "type": "l2",
    "id": "23-google-calendarの設定",
    "label": "2.3 Google Calendarの設定"
  },
  {
    "type": "l3",
    "id": "231-リソースカレンダーの作成と管理",
    "label": "2.3.1 リソースカレンダーの作成と管理"
  },
  {
    "type": "l3",
    "id": "232-リソースの予約ポリシーの設定",
    "label": "2.3.2 リソースの予約ポリシーの設定"
  },
  {
    "type": "l3",
    "id": "233-カレンダーリソースアクセスの委任",
    "label": "2.3.3 カレンダー・リソースアクセスの委任"
  },
  {
    "type": "l3",
    "id": "234-プライマリセカンダリカレンダーのデフォルト内部共有設定",
    "label": "2.3.4 プライマリ・セカンダリカレンダーのデフォルト内部共有設定"
  },
  {
    "type": "l3",
    "id": "235-チームグループ向け共有カレンダーの設定",
    "label": "2.3.5 チーム・グループ向け共有カレンダーの設定"
  },
  {
    "type": "l3",
    "id": "236-カレンダーの外部共有オプションの管理",
    "label": "2.3.6 カレンダーの外部共有オプションの管理"
  },
  {
    "type": "l3",
    "id": "237-イベント所有権の移転",
    "label": "2.3.7 イベント所有権の移転"
  },
  {
    "type": "l3",
    "id": "238-不明な送信者からの招待の防止",
    "label": "2.3.8 不明な送信者からの招待の防止"
  },
  {
    "type": "l2",
    "id": "24-google-meetの設定",
    "label": "2.4 Google Meetの設定"
  },
  {
    "type": "l3",
    "id": "241-組織ou単位でのmeetの有効化無効化",
    "label": "2.4.1 組織・OU単位でのMeetの有効化・無効化"
  },
  {
    "type": "l3",
    "id": "242-meetセーフティ設定の構成",
    "label": "2.4.2 Meetセーフティ設定の構成"
  },
  {
    "type": "l3",
    "id": "243-meetビデオ設定の構成画質録画文字起こしノートテイキング",
    "label": "2.4.3 Meetビデオ設定の構成（画質・録画・文字起こし・ノートテイキング）"
  },
  {
    "type": "l2",
    "id": "25-google-chatの設定",
    "label": "2.5 Google Chatの設定"
  },
  {
    "type": "l3",
    "id": "251-組織ou単位でのchatの有効化無効化",
    "label": "2.5.1 組織・OU単位でのChatの有効化・無効化"
  },
  {
    "type": "l3",
    "id": "252-admin-consoleでのchat設定",
    "label": "2.5.2 Admin consoleでのChat設定"
  },
  {
    "type": "l3",
    "id": "253-chat招待設定の管理",
    "label": "2.5.3 Chat招待設定の管理"
  },
  {
    "type": "l3",
    "id": "254-chatアプリの追加",
    "label": "2.5.4 Chatアプリの追加"
  },
  {
    "type": "l2",
    "id": "26-google-workspaceにおける生成aiの活用",
    "label": "2.6 Google Workspaceにおける生成AIの活用"
  },
  {
    "type": "l3",
    "id": "261-生成ai利用時の組織データのプライバシーとセキュリティ確保",
    "label": "2.6.1 生成AI利用時の組織データのプライバシーとセキュリティ確保"
  },
  {
    "type": "l3",
    "id": "262-組織ou単位でのgeminiの有効化無効化",
    "label": "2.6.2 組織・OU単位でのGeminiの有効化・無効化"
  },
  {
    "type": "l3",
    "id": "263-geminiアプリ向けgoogle-workspace拡張機能の有効化",
    "label": "2.6.3 Geminiアプリ向けGoogle Workspace拡張機能の有効化"
  },
  {
    "type": "l3",
    "id": "264-gemini利用状況レポートの生成",
    "label": "2.6.4 Gemini利用状況レポートの生成"
  },
  {
    "type": "l2",
    "id": "27-workspace開発のサポート",
    "label": "2.7 Workspace開発のサポート"
  },
  {
    "type": "l3",
    "id": "271-appsheetとapps-scriptのユースケース",
    "label": "2.7.1 AppSheetとApps Scriptのユースケース"
  },
  {
    "type": "l3",
    "id": "272-組織ou単位でのappsheetの有効化",
    "label": "2.7.2 組織・OU単位でのAppSheetの有効化"
  },
  {
    "type": "l2",
    "id": "section-2-ベストプラクティス総括表",
    "label": "Section 2 ベストプラクティス総括表"
  },
  {
    "type": "l2",
    "id": "学習チェックリスト",
    "label": "学習チェックリスト"
  },
  {
    "type": "l2",
    "id": "参考文献",
    "label": "参考文献"
  }
];

export const NavBar: React.FC = () => {
  const [activeId, setActiveId] = useState<string>("section-2の全体像");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const headingElements = Array.from(
      document.querySelectorAll<HTMLElement>(".main h2[id], .main h3[id]")
    );
    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      const isBottom = window.innerHeight + window.scrollY
        >= document.documentElement.scrollHeight - 100;
      if (isBottom) {
        setActiveId(headingElements[headingElements.length - 1]?.id ?? NAV_ITEMS[0].id);
        return;
      }

      const visibleHeading = entries.find((entry) => entry.isIntersecting);
      if (visibleHeading) setActiveId(visibleHeading.target.id);
    }, { rootMargin: "-15% 0px -75% 0px", threshold: 0 });

    headingElements.forEach((heading) => observer.observe(heading));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className="sidebar-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Section 2の目次メニューを切り替える"
        aria-expanded={isOpen}
        aria-controls="sidebarNav"
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

      <nav
        className={`sidebar ${isOpen ? "open" : ""}`}
        id="sidebarNav"
        aria-label="AGWA Section 2の目次"
      >
        <div className="sidebar-title">AGWA Section 2</div>
        <div className="sidebar-subtitle">コアWorkspaceサービスの管理</div>
        <ul className="nav-list">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id} className={item.type === "l2" ? "nav-l2" : "nav-l3"}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${isActive ? "active" : ""}`}
                  data-target={item.id}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};
