export interface NavItem {
    id: string;
    label: string;
    number: string;
}

export const NAV_ITEMS: NavItem[] = [
    { id: 'overview', label: 'この記事の位置づけ', number: '0.0' },
    { id: 's5-1', label: '基本概念', number: '5.1' },
    { id: 's5-2', label: 'セキュリティプログラム', number: '5.2' },
    { id: 's5-3', label: 'アクセス制御', number: '5.3' },
    { id: 's5-4', label: 'パスワードポリシー', number: '5.4' },
    { id: 's5-5', label: 'IPsec VPN', number: '5.5' },
    { id: 's5-6', label: 'ACL', number: '5.6' },
    { id: 's5-7', label: 'L2セキュリティ', number: '5.7' },
    { id: 's5-8', label: 'AAAの概念', number: '5.8' },
    { id: 's5-9', label: '無線セキュリティ', number: '5.9' },
    { id: 's5-10', label: 'GUIでのWLAN設定', number: '5.10' },
    { id: 'summary', label: '学習優先順位', number: 'まとめ' },
    { id: 'references', label: '参考ソース', number: '参考' },
];
