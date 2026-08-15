export interface NavItem {
    href: string;
    label: string;
    level: 2 | 3;
}

export const NAV_ITEMS: NavItem[] = [
    { href: '#この章で扱う範囲', label: 'この章で扱う範囲', level: 2 },
    { href: '#タスク別出題範囲一覧', label: 'タスク別出題範囲一覧', level: 3 },
    { href: '#61-workspace問題の特定と診断', label: '6.1 Workspace問題の特定と診断', level: 2 },
    { href: '#611-管理コンソールでの監査ログへのアクセス', label: '6.1.1 管理コンソールでの監査ログへのアクセス', level: 3 },
    { href: '#612-ログエントリの解釈', label: '6.1.2 ログエントリの解釈', level: 3 },
    { href: '#613-status-dashboardでのサービス障害確認', label: '6.1.3 Status Dashboardでのサービス障害確認', level: 3 },
    { href: '#614-メール配信問題に関する解決策の提案', label: '6.1.4 メール配信問題に関する解決策の提案', level: 3 },
    { href: '#62-一般的な問題のトラブルシューティングと解決', label: '6.2 一般的な問題のトラブルシューティングと解決', level: 2 },
    { href: '#621-アカウントパスワード2段階認証サービスアクセスの問題', label: '6.2.1 アカウント・パスワード・2段階認証・サービスアクセスの問題', level: 3 },
    { href: '#622-email-log-searchによるメール配信問題のトラブルシューティング', label: '6.2.2 Email Log Searchによるメール配信問題のトラブルシューティング', level: 3 },
    { href: '#623-メッセージヘッダーとadmin-toolboxによるメール配信問題の解析', label: '6.2.3 メッセージヘッダーとAdmin Toolboxによるメール配信問題の解析', level: 3 },
    { href: '#624-メール転送フィルタラベルの問題支援', label: '6.2.4 メール転送・フィルタ・ラベルの問題支援', level: 3 },
    { href: '#625-カレンダーの同期問題', label: '6.2.5 カレンダーの同期問題', level: 3 },
    { href: '#626-カレンダーの共有権限管理問題', label: '6.2.6 カレンダーの共有・権限管理問題', level: 3 },
    { href: '#627-カレンダーの空き時間情報共有問題', label: '6.2.7 カレンダーの空き時間情報共有問題', level: 3 },
    { href: '#628-driveの共有権限管理問題', label: '6.2.8 Driveの共有・権限管理問題', level: 3 },
    { href: '#629-drive-for-desktopの問題解決', label: '6.2.9 Drive for Desktopの問題解決', level: 3 },
    { href: '#6210-誤って削除されたファイルメールの復元', label: '6.2.10 誤って削除されたファイル・メールの復元', level: 3 },
    { href: '#6211-driveオフラインアクセスの問題', label: '6.2.11 Driveオフラインアクセスの問題', level: 3 },
    { href: '#6212-meet品質ツールによるネットワーク診断', label: '6.2.12 Meet品質ツールによるネットワーク診断', level: 3 },
    { href: '#6213-meetの問題のトラブルシューティング', label: '6.2.13 Meetの問題のトラブルシューティング', level: 3 },
    { href: '#63-レポートと監査ログの表示作成管理', label: '6.3 レポートと監査ログの表示・作成・管理', level: 2 },
    { href: '#631-アプリ使用状況の監視', label: '6.3.1 アプリ使用状況の監視', level: 3 },
    { href: '#632-ストレージ上限の監視', label: '6.3.2 ストレージ上限の監視', level: 3 },
    { href: '#633-監査レポートの活用', label: '6.3.3 監査レポートの活用', level: 3 },
    { href: '#634-デバイスアクティビティの監視', label: '6.3.4 デバイスアクティビティの監視', level: 3 },
    { href: '#64-サポートリソースの活用', label: '6.4 サポートリソースの活用', level: 2 },
    { href: '#641-問題再現手順のドキュメント化', label: '6.4.1 問題再現手順のドキュメント化', level: 3 },
    { href: '#642-適切なログファイルタイプの収集', label: '6.4.2 適切なログファイルタイプの収集', level: 3 },
    { href: '#643-アプリケーションのステータスと既知の問題の検索', label: '6.4.3 アプリケーションのステータスと既知の問題の検索', level: 3 },
    { href: '#644-harファイルの生成', label: '6.4.4 HARファイルの生成', level: 3 },
    { href: '#645-googleサポートへのケースオープンのベストプラクティス', label: '6.4.5 Googleサポートへのケースオープンのベストプラクティス', level: 3 },
    { href: '#646-workspace-updatesブログstatus-dashboardリリースカレンダーの活用', label: '6.4.6 Workspace Updatesブログ、Status Dashboard、リリースカレンダーの活用', level: 3 },
    { href: '#ベストプラクティス総括表', label: 'ベストプラクティス総括表', level: 2 },
    { href: '#学習チェックリスト', label: '学習チェックリスト', level: 2 },
    { href: '#参考文献', label: '参考文献', level: 2 },
];
