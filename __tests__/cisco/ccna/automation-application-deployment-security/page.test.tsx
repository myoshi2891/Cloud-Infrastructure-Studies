import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import CcnaAppDeploymentSecurityPage from '@/app/cisco/ccna/automation-application-deployment-security/page';

const guideSource = readFileSync(
    join(process.cwd(), 'app/cisco/ccna/automation-application-deployment-security/CcnaAppDeploymentSecurityGuide.tsx'),
    'utf8',
);

// Mock MermaidDiagram to avoid dynamic import / browser execution issues in Vitest
vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: ({ chart, ariaLabel, preserveNaturalScale }: { chart: string; ariaLabel?: string; preserveNaturalScale?: boolean }) => (
        <div
            data-testid="mermaid-diagram"
            data-chart={chart}
            data-natural-scale={preserveNaturalScale}
            aria-label={ariaLabel}
        >
            Mermaid Diagram Mock
        </div>
    ),
}));

describe('CcnaAppDeploymentSecurityPage', () => {
    it('renders main heading and hero eyebrow correctly', () => {
        render(<CcnaAppDeploymentSecurityPage />);

        const mainHeading = screen.getByRole('heading', {
            level: 1,
            name: /Application Deployment and Security/i,
        });
        expect(mainHeading).toBeInTheDocument();

        expect(screen.getByText(/CCNA Automation Certification ガイド/i)).toBeInTheDocument();
    });

    it('ヒーローバッジ行を全て表示する', () => {
        render(<CcnaAppDeploymentSecurityPage />);
        expect(screen.getByText(/配点 15%/)).toBeInTheDocument();
        expect(screen.getByText(/サブトピック 4\.1〜4\.12/)).toBeInTheDocument();
        expect(screen.getByText(/試験時間 120分/)).toBeInTheDocument();
        expect(screen.getByText(/対応言語：英語・日本語/)).toBeInTheDocument();
    });

    it('renders all 12 chapters and reference section headings', () => {
        render(<CcnaAppDeploymentSecurityPage />);

        const sectionTitles = [
            '出題範囲の全体像',
            'エッジコンピューティングとアプリケーション展開モデル',
            'アプリケーション実行環境の比較：VM・ベアメタル・コンテナ',
            'CI/CDパイプラインの基礎',
            'Pythonユニットテストの構築',
            'Dockerfileの読み方とDockerイメージの活用',
            'アプリケーションセキュリティの基礎：シークレット保護・暗号化・データ取り扱い',
            'ネットワーク境界のセキュリティ要素：ファイアウォール・DNS・ロードバランサー・リバースプロキシ',
            'OWASPトップの脅威',
            'Bashコマンドの活用',
            'DevOpsの原則',
            'まとめ：ドメイン4.0 早見表',
            '参考文献・出典',
        ];

        sectionTitles.forEach((title) => {
            expect(
                screen.getByRole('heading', { level: 2, name: new RegExp(title, 'i') }),
            ).toBeInTheDocument();
        });
    });

    it('renders subheadings correctly', () => {
        render(<CcnaAppDeploymentSecurityPage />);

        const subHeadings = [
            '4.1 エッジコンピューティングの利点',
            '4.2 アプリケーション展開モデルの比較',
            '3つの実行環境の構造比較',
            '属性比較表',
            'CI/CDパイプラインの主な構成要素',
            'パイプライン全体の流れ',
            'テストの基本的な流れ（Arrange-Act-Assertパターン）',
            'コード例',
            '4.6 Dockerfileの内容を解釈する',
            'サンプルDockerfile',
            '4.7 ローカル開発環境でのDockerイメージの利用',
            'イメージのライフサイクル',
            'シークレット保護',
            '暗号化（保存時・転送時）',
            'データ取り扱いの考え方',
            'セキュアなデータフローのイメージ',
            'リクエストが辿る経路',
            '代表的な脅威の説明',
            '最新の公式リストとの関係',
            'ファイル管理',
            'ディレクトリ操作',
            '環境変数',
        ];

        subHeadings.forEach((subTitle) => {
            expect(
                screen.getByRole('heading', { level: 3, name: new RegExp(subTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') }),
            ).toBeInTheDocument();
        });
    });

    it('renders sidebar navigation links correctly', () => {
        const { container } = render(<CcnaAppDeploymentSecurityPage />);

        const tocNav = screen.getByRole('navigation', { name: /目次ナビゲーション/i });
        expect(tocNav).toBeInTheDocument();

        const links = screen.getAllByRole('link', { name: /出題範囲の全体像|CI\/CDパイプラインの基礎|DevOpsの原則/i });
        expect(links.length).toBeGreaterThan(0);

        const aside = container.querySelector('aside');
        expect(aside).toHaveClass('sidebar');
    });

    it('renders all 10 mermaid diagrams with accessibility labels and natural scale enabled', () => {
        const { container } = render(<CcnaAppDeploymentSecurityPage />);

        const diagrams = screen.getAllByTestId('mermaid-diagram');
        expect(diagrams).toHaveLength(10);
        diagrams.forEach((diagram) => {
            expect(diagram).toHaveAttribute('data-natural-scale', 'true');
            expect(diagram).toHaveAttribute('aria-label');
        });

        const diagramIds = [
            'diag-0', 'diag-1', 'diag-2', 'diag-3', 'diag-4',
            'diag-5', 'diag-6', 'diag-7', 'diag-8', 'diag-9'
        ];
        diagramIds.forEach((id) => {
            expect(container.querySelector(`[data-diagram-id="${id}"]`)).toBeInTheDocument();
        });
    });

    it('ドメイン4.0の4.1〜4.12サブトピック対応表を省略せず描画する', () => {
        render(<CcnaAppDeploymentSecurityPage />);

        for (let topic = 1; topic <= 12; topic += 1) {
            expect(screen.getAllByRole('cell', { name: `4.${topic}` }).length).toBeGreaterThan(0);
        }
        expect(screen.getByText('DevOpsプラクティスの原則を説明する')).toBeInTheDocument();
    });

    it('ガイド本体はServer Componentで、main直下に中央寄せ用ラッパーを持つ', () => {
        const { container } = render(<CcnaAppDeploymentSecurityPage />);

        expect(guideSource).not.toMatch(/^['"']use client['"'];?/);
        expect(container.querySelector('.main > .content-inner')).toBeInTheDocument();
    });

    it('目次クリック時にURLフラグメントとアクティブ項目を更新する', () => {
        const originalScrollIntoView = Object.getOwnPropertyDescriptor(Element.prototype, 'scrollIntoView');
        const originalHash = window.location.hash;
        const scrollIntoView = vi.fn();

        try {
            Element.prototype.scrollIntoView = scrollIntoView;
            const { container } = render(<CcnaAppDeploymentSecurityPage />);
            const link = container.querySelector<HTMLAnchorElement>('a[href="#chapter4"]');

            expect(link).not.toBeNull();
            fireEvent.click(link!);

            expect(window.location.hash).toBe('#chapter4');
            expect(link).toHaveClass('active');
            expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
        } finally {
            if (originalScrollIntoView) {
                Object.defineProperty(Element.prototype, 'scrollIntoView', originalScrollIntoView);
            } else {
                Reflect.deleteProperty(Element.prototype, 'scrollIntoView');
            }
            window.location.hash = originalHash;
        }
    });

    // ============================================================
    // 第2章: エッジコンピューティング (4.1) — 原本忠実テスト
    // ============================================================
    it('第2章4.1: 原本HTMLの説明文と2列表（利点/説明）を忠実に描画する', () => {
        render(<CcnaAppDeploymentSecurityPage />);
        // 原本の説明文
        expect(screen.getByText(/エッジコンピューティングとは、データを中央のクラウドやデータセンターまで送らず、/)).toBeInTheDocument();
        expect(screen.getByText(/工場のセンサー、店舗のPOSレジ、IoTデバイスなどが典型例/)).toBeInTheDocument();
        // 表のヘッダ: 利点 (3列目「具体例」は原本にない)
        expect(screen.getByRole('columnheader', { name: '利点' })).toBeInTheDocument();
        // 原本の行テキスト（早見表にも「オフライン耐性」が含まれるのでgetAllByRoleで対応）
        expect(screen.getByRole('cell', { name: '低遅延（レイテンシ削減）' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: '帯域幅の節約' })).toBeInTheDocument();
        expect(screen.getAllByRole('cell', { name: /オフライン耐性/ }).length).toBeGreaterThan(0);
        expect(screen.getByRole('cell', { name: 'データローカリティ／プライバシー' })).toBeInTheDocument();
    });

    it('第2章4.2: 原本HTMLの表列（管理主体/主な特徴/典型的な用途）を描画する', () => {
        render(<CcnaAppDeploymentSecurityPage />);
        expect(screen.getByRole('columnheader', { name: '管理主体' })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: '主な特徴' })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: '典型的な用途' })).toBeInTheDocument();
        // 原本のセル内容
        expect(screen.getByRole('cell', { name: /自社（または委託先が自社専用に構築）/ })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: /金融・医療など規制が厳しい業界の基幹システム/ })).toBeInTheDocument();
    });

    // ============================================================
    // 第3章: VM・ベアメタル・コンテナ (4.3)
    // ============================================================
    it('第3章: ul/liリスト（4.3.a 仮想マシン/4.3.b ベアメタル/4.3.c コンテナ）を描画する', () => {
        render(<CcnaAppDeploymentSecurityPage />);
        expect(screen.getByText('4.3.a 仮想マシン（Virtual Machine）')).toBeInTheDocument();
        expect(screen.getByText('4.3.b ベアメタル（Bare Metal）')).toBeInTheDocument();
        expect(screen.getByText('4.3.c コンテナ（Container）')).toBeInTheDocument();
        // 原本の冒頭説明文
        expect(screen.getByText(/展開モデル（どこで動かすか）が決まったら、次は「どの単位でアプリケーションをパッケージ化して動かすか」を選びます/)).toBeInTheDocument();
    });

    it('第3章属性比較表: 原本の列名（項目/ベアメタル/仮想マシン（VM）/コンテナ）を描画する', () => {
        render(<CcnaAppDeploymentSecurityPage />);
        expect(screen.getByRole('columnheader', { name: '項目' })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: 'ベアメタル' })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: '仮想マシン（VM）' })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: 'コンテナ' })).toBeInTheDocument();
        // 原本行: 分離レベル
        expect(screen.getByRole('cell', { name: '分離レベル' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: /物理サーバー単位（最も高い）/ })).toBeInTheDocument();
        // 原本行: 起動速度
        expect(screen.getByRole('cell', { name: '起動速度' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: /数百ミリ秒〜数秒（非常に速い）/ })).toBeInTheDocument();
        // 原本行: リソースオーバーヘッド
        expect(screen.getByRole('cell', { name: 'リソースオーバーヘッド' })).toBeInTheDocument();
        // 原本行: 移植性（ポータビリティ）
        expect(screen.getByRole('cell', { name: '移植性（ポータビリティ）' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: /高い（同じイメージがどこでも同じ動作）/ })).toBeInTheDocument();
        // 原本行: 主なユースケース
        expect(screen.getByRole('cell', { name: '主なユースケース' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: /マイクロサービス、CI\/CDでの高速な使い捨て環境/ })).toBeInTheDocument();
    });

    // ============================================================
    // 第4章: CI/CDパイプライン (4.4)
    // ============================================================
    it('第4章: 原本の説明文と2列表（ステージ/目的）8行を描画する', () => {
        render(<CcnaAppDeploymentSecurityPage />);
        // 原本説明文
        expect(screen.getByText(/CI\/CD（Continuous Integration \/ Continuous Delivery（or/)).toBeInTheDocument();
        expect(screen.getByText(/継続的インテグレーション／継続的デリバリー（デプロイ））は、コードの変更を自動的にビルド・テスト・展開するための仕組みです/)).toBeInTheDocument();
        // 原本の列名
        expect(screen.getByRole('columnheader', { name: 'ステージ' })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: '目的' })).toBeInTheDocument();
        // 原本の8行
        expect(screen.getByRole('cell', { name: 'ソース管理（Git等）' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'ビルド' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'テスト' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'パッケージング／アーティファクト作成' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'レジストリへの登録' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'ステージング展開' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: '本番展開' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: '監視・フィードバック' })).toBeInTheDocument();
    });

    // ============================================================
    // 第5章: Pythonユニットテスト (4.5)
    // ============================================================
    it('第5章: 原本の説明文・コード例・assertRaises言及を描画する', () => {
        render(<CcnaAppDeploymentSecurityPage />);
        // 原本の冒頭説明文（前半だけで検索：後半はcodeタグで分割される）
        expect(screen.getByText(/ユニットテストとは、プログラムの中の「最小単位（関数やメソッド）」が期待どおりに動くかを自動で検証するテストです/)).toBeInTheDocument();
        // unitestはcodeタグに分割されるので別にチェック
        expect(screen.getByText(/モジュールがよく使われます/)).toBeInTheDocument();
        // 原本コードのコード例ラベル
        expect(screen.getByText(/Python — unittest の基本形/)).toBeInTheDocument();
        // 原本コードの内容（add関数）
        expect(screen.getByText(/def add\(a, b\)/)).toBeInTheDocument();
        expect(screen.getByText(/2つの数値を加算する簡単な関数/)).toBeInTheDocument();
        expect(screen.getByText(/class TestAddFunction/)).toBeInTheDocument();
        expect(screen.getByText(/test_add_positive_numbers/)).toBeInTheDocument();
        expect(screen.getByText(/test_add_negative_numbers/)).toBeInTheDocument();
        // assertRaisesへの言及（codeタグなので個別に見つかる）
        expect(screen.getAllByText(/assertRaises/).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/assertTrue/).length).toBeGreaterThan(0);
    });

    // ============================================================
    // 第6章: Dockerfile (4.6/4.7)
    // ============================================================
    it('第6章Dockerfile表: ENTRYPOINTを含む8行と命令/役割列を描画する', () => {
        render(<CcnaAppDeploymentSecurityPage />);
        // 原本の列名（「命令」は1つのみ存在するはず）
        expect(screen.getByRole('columnheader', { name: '命令' })).toBeInTheDocument();
        // 「役割」は複数テーブルに存在するのでgetAllByRole使用
        expect(screen.getAllByRole('columnheader', { name: '役割' }).length).toBeGreaterThan(0);
        // ENTRYPOINTが含まれる
        expect(screen.getAllByRole('cell', { name: 'ENTRYPOINT' }).length).toBeGreaterThan(0);
        // ENVが含まれる（コードブロックにもあるのでgetAllBy）
        expect(screen.getAllByRole('cell', { name: 'ENV' }).length).toBeGreaterThan(0);
        // 原本のFROMセル内容（python:3.12-slimはtableとcodeblockの両方にある）
        expect(screen.getAllByText(/FROM python:3\.12-slim/).length).toBeGreaterThan(0);
    });

    it('第6章Dockerコマンド表: 8コマンド全て（docker logs/exec/rm/push/pull含む）を描画する', () => {
        render(<CcnaAppDeploymentSecurityPage />);
        expect(screen.getByRole('cell', { name: /docker build -t イメージ名:タグ \./ })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: /docker logs コンテナID/ })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: /docker exec -it コンテナID bash/ })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: /docker stop コンテナ名またはID.*docker rm コンテナ名またはID/ })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: /docker push イメージ名.*docker pull イメージ名/ })).toBeInTheDocument();
    });

    // ============================================================
    // 第7章: アプリケーションセキュリティ (4.8)
    // ============================================================
    it('第7章: シークレット保護の箇条書き3点を描画する', () => {
        render(<CcnaAppDeploymentSecurityPage />);
        expect(screen.getByText(/コードやDockerイメージにシークレットを直接書き込まない/)).toBeInTheDocument();
        expect(screen.getByText(/環境変数、シークレット管理サービス（Vaultなど）、クラウドのシークレットマネージャーを利用する/)).toBeInTheDocument();
        // .gitignoreはcodeタグで分割されるので「前後」でチェック
        expect(screen.getByText(/Gitリポジトリに誤ってコミットしないよう/)).toBeInTheDocument();
        expect(screen.getByText(/や事前スキャンツールを活用する/)).toBeInTheDocument();
    });

    it('第7章暗号化表: 原本の列名（種類/説明/代表例）と2行を描画する', () => {
        render(<CcnaAppDeploymentSecurityPage />);
        expect(screen.getByRole('columnheader', { name: '種類' })).toBeInTheDocument();
        // 「説明」は複数テーブルにあるのでgetAllBy
        expect(screen.getAllByRole('columnheader', { name: '説明' }).length).toBeGreaterThan(0);
        expect(screen.getByRole('columnheader', { name: '代表例' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: '転送時の暗号化（Encryption in Transit）' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: '保存時の暗号化（Encryption at Rest）' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'TLS/HTTPS、SSH' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: /ディスク暗号化、データベースの列暗号化/ })).toBeInTheDocument();
    });

    it('第7章データ取り扱い: 原本の段落を描画する', () => {
        render(<CcnaAppDeploymentSecurityPage />);
        expect(screen.getByText(/必要最小限のデータのみ収集・保持する/)).toBeInTheDocument();
        expect(screen.getByText(/アクセス権を最小限にする/)).toBeInTheDocument();
        expect(screen.getByText(/保持期間を定めて不要になったら削除する/)).toBeInTheDocument();
    });

    // ============================================================
    // 第8章: ネットワーク境界 (4.9)
    // ============================================================
    it('第8章: 原本の冒頭段落と2列表（要素/役割）を描画する', () => {
        render(<CcnaAppDeploymentSecurityPage />);
        // 冒頭段落
        expect(screen.getByText(/アプリケーションを展開する際、ユーザーからのリクエストは複数のネットワーク要素を経由します/)).toBeInTheDocument();
        // 列名（「役割」は複数テーブルにあるのでgetAllBy。「要素」は1つだけ）
        expect(screen.getByRole('columnheader', { name: '要素' })).toBeInTheDocument();
        expect(screen.getAllByRole('columnheader', { name: '役割' }).length).toBeGreaterThan(0);
        // セル
        expect(screen.getByRole('cell', { name: 'DNS（Domain Name System）' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'ファイアウォール' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'ロードバランサー' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'リバースプロキシ' })).toBeInTheDocument();
    });

    // ============================================================
    // 第9章: OWASP (4.10)
    // ============================================================
    it('第9章: OWASP Top 10 2025年版 10カテゴリ表（A01〜A10）を描画する', () => {
        render(<CcnaAppDeploymentSecurityPage />);
        // 列名
        expect(screen.getByRole('columnheader', { name: '順位' })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: 'カテゴリ名（英語）' })).toBeInTheDocument();
        // A01〜A10
        ['A01', 'A02', 'A03', 'A04', 'A05', 'A06', 'A07', 'A08', 'A09', 'A10'].forEach((code) => {
            expect(screen.getByRole('cell', { name: code })).toBeInTheDocument();
        });
        expect(screen.getByRole('cell', { name: /Broken Access Control（アクセス制御の不備）/ })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: /Injection（インジェクション）/ })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: /Mishandling of Exceptional Conditions/ })).toBeInTheDocument();
    });

    it('第9章: XSS・SQLi・CSRF詳細段落と2025年版解説段落を描画する', () => {
        render(<CcnaAppDeploymentSecurityPage />);
        // XSSとSQLインジェクションのCSRFとの比較段落
        expect(screen.getByText(/XSSとSQLインジェクションは「入力値や出力値の不十分な検証・処理」が主因/)).toBeInTheDocument();
        // 試験ガイドとOWASP 2025版の関係の解説段落
        expect(screen.getByText(/試験ガイドが例示するSQLインジェクションとXSSは、現行の2025年版では主に「A05/)).toBeInTheDocument();
        // OWASPの説明
        expect(screen.getByText(/OWASP（Open Worldwide Application Security Project）/)).toBeInTheDocument();
    });

    // ============================================================
    // 第10章: Bashコマンド (4.11)
    // ============================================================
    it('第10章: 原本の冒頭段落を描画する', () => {
        render(<CcnaAppDeploymentSecurityPage />);
        expect(screen.getByText(/Linux環境での自動化スクリプトや運用作業では、Bashコマンドの基本操作が欠かせません/)).toBeInTheDocument();
    });

    it('第10章ファイル管理表: 原本の7行（ls -l/cp/mv/rm/chmod/cat/grep）を描画する', () => {
        render(<CcnaAppDeploymentSecurityPage />);
        expect(screen.getByRole('cell', { name: 'ls -l' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'cp src dst' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'mv src dst' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'rm file' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'chmod 755 file' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'cat file' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'grep "keyword" file' })).toBeInTheDocument();
    });

    it('第10章ディレクトリ操作表: 原本の5行（pwd/cd/mkdir/rmdir/find）を描画する', () => {
        render(<CcnaAppDeploymentSecurityPage />);
        expect(screen.getByRole('cell', { name: 'pwd' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'cd path' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'mkdir dir' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'rmdir dir' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'find . -name "*.py"' })).toBeInTheDocument();
    });

    it('第10章環境変数表: 原本の4行（echo $HOME/export/env・printenv/unset）を描画する', () => {
        render(<CcnaAppDeploymentSecurityPage />);
        expect(screen.getByRole('cell', { name: 'echo $HOME' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'export VAR=value' })).toBeInTheDocument();
        // env / printenv は同一セル
        expect(screen.getByRole('cell', { name: /env.*printenv/ })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'unset VAR' })).toBeInTheDocument();
    });

    // ============================================================
    // 第11章: DevOps (4.12)
    // ============================================================
    it('第11章: 原本の表（原則/説明）4行と詳細段落を描画する', () => {
        render(<CcnaAppDeploymentSecurityPage />);
        // 原本の列名
        expect(screen.getByRole('columnheader', { name: '原則' })).toBeInTheDocument();
        // 原本の4行
        expect(screen.getByRole('cell', { name: '文化（Culture）' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: '自動化（Automation）' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: '計測（Measurement / Lean）' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: '共有（Sharing）' })).toBeInTheDocument();
        // 詳細説明段落
        expect(screen.getByText(/これらは、第4章で扱ったCI\/CDパイプラインを支える文化的・組織的な土台にあたります/)).toBeInTheDocument();
        expect(screen.getByText(/「計画→コーディング→ビルド→テスト→リリース→展開→運用→監視」という循環/)).toBeInTheDocument();
    });

    // ============================================================
    // 第12章: まとめ早見表
    // ============================================================
    it('第12章: 原本の冒頭段落と列名（No./サブトピック/一言でいうと）を描画する', () => {
        render(<CcnaAppDeploymentSecurityPage />);
        expect(screen.getByText(/試験直前の見直し用に、サブトピックごとの要点を1行にまとめました/)).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: 'No.' })).toBeInTheDocument();
        // 「サブトピック」は第1章表と早見表に存在するのでgetAllBy
        expect(screen.getAllByRole('columnheader', { name: 'サブトピック' }).length).toBeGreaterThan(0);
        expect(screen.getByRole('columnheader', { name: '一言でいうと' })).toBeInTheDocument();
        // 4.1〜4.12が個別行に存在する（4.6と4.7は別行）
        expect(screen.getByRole('cell', { name: 'エッジコンピューティングの利点' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'Dockerfileの解釈' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'Dockerイメージの活用' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'DevOpsの原則' })).toBeInTheDocument();
    });

    // ============================================================
    // 参考文献: 原本の8リンク全て
    // ============================================================
    it('参考文献: 原本の8リンク全てと免責事項を描画する', () => {
        const { container } = render(<CcnaAppDeploymentSecurityPage />);
        // 免責事項
        expect(screen.getByText(/本ガイドは学習支援を目的とした非公式の解説資料です/)).toBeInTheDocument();
        // 原本HTMLではリンクテキストはURL文字列なので、href属性でコンテナから直接検索する
        const links: Array<[string, string]> = [
            ['https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/index.html', 'CCNA Automation Certification 認定概要'],
            ['https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/exams-and-training.html', 'CCNA Automation Exam and Training'],
            ['https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccnaauto.html', '200-901 CCNAAUTO 試験詳細'],
            ['https://learningcontent.cisco.com/documents/marketing/exam-topics/200-901-CCNAAUTO_v.1.1.pdf', '出題範囲PDF'],
            ['https://learningnetwork.cisco.com/s/ccnaauto-exam-topics', 'Learning Network'],
            ['https://owasp.org/Top10/2025/', 'OWASP Top 10:2025'],
            ['https://docs.docker.com/reference/dockerfile/', 'Dockerfile reference'],
            ['https://docs.python.org/3/library/unittest.html', 'unittest'],
        ];
        links.forEach(([href]) => {
            const el = container.querySelector(`a[href="${href}"]`);
            expect(el).toBeInTheDocument();
        });
        // 参考文献リストのテキスト確認
        expect(screen.getByText(/CCNA Automation Certification（Cisco公式・認定概要ページ）/)).toBeInTheDocument();
        expect(screen.getByText(/Dockerfile reference（Docker公式ドキュメント/)).toBeInTheDocument();
        expect(screen.getByText(/unittest — ユニットテストフレームワーク（Python公式ドキュメント/)).toBeInTheDocument();
    });

    it('renders usage callout and all 11 chapter key point callouts without omission', () => {
        render(<CcnaAppDeploymentSecurityPage />);

        expect(screen.getByText('このガイドの使い方')).toBeInTheDocument();
        expect(screen.getByText(/前提知識としてPythonの基礎、Linux\/Bashの基本操作/)).toBeInTheDocument();

        const chapterKeyPointPatterns = [
            /ドメイン4\.0は試験全体の15%を占め/i,
            /エッジコンピューティングの利点は「低遅延・帯域節約・オフライン耐性・データローカリティ」の4つに集約できる/i,
            /分離の強さと起動の速さはトレードオフの関係にある/i,
            /CI（継続的インテグレーション）は「頻繁に統合し、自動テストで早期に問題を検出する」/i,
            /ユニットテストは「準備（Arrange）→実行（Act）→検証（Assert）」の3ステップで考えると書きやすい/i,
            /Dockerfileは「上から順に1行ずつ実行される構築手順書」として読むと理解しやすい/i,
            /「シークレットはコードに書かない」「転送時と保存時の両方を暗号化する」/i,
            /DNSの名前解決はHTTPリクエスト経路の前提処理であり/i,
            /XSSは信頼できないデータをHTMLへ安全でない形で出力することで発生するため/i,
            /「ファイル管理」「ディレクトリ操作」「環境変数」の3分類で整理すると覚えやすい/i,
            /DevOpsは単なるツールの導入ではなく、「文化・自動化・計測・共有」という考え方の集合体である/i,
        ];

        chapterKeyPointPatterns.forEach((pattern) => {
            expect(screen.getByText(pattern)).toBeInTheDocument();
        });
    });

    it('renders external reference links', () => {
        render(<CcnaAppDeploymentSecurityPage />);
        // テキストは段落内に含まれる（code要素で分割されない文）
        expect(screen.getByText(/試験ガイドが例示するSQLインジェクションとXSSは、現行の2025年版では主に「A05/)).toBeInTheDocument();
    });

    // ============================================================
    // デザイン忠実性テスト（原本HTMLのCSS完全移植確認）
    // ============================================================
    it('ヒーローバッジ行に.badge-rowと.badgeクラスを持つDOM要素が存在する', () => {
        const { container } = render(<CcnaAppDeploymentSecurityPage />);
        // .badge-rowが存在する
        expect(container.querySelector('.badge-row')).toBeInTheDocument();
        // .badgeが4個以上存在する
        expect(container.querySelectorAll('.badge').length).toBeGreaterThanOrEqual(4);
    });

    it('コードブロックに構文ハイライト用のcode-comment / code-keywordスパンが存在する', () => {
        const { container } = render(<CcnaAppDeploymentSecurityPage />);
        // Dockerfileコードブロックのコメント行がcode-commentクラスを持つspanでラップされている
        expect(container.querySelector('.code-comment')).toBeInTheDocument();
        // Dockerfile命令（FROM, WORKDIR等）またはPythonキーワードがcode-keywordクラスを持つspanでラップされている
        expect(container.querySelector('.code-keyword')).toBeInTheDocument();
    });

    it('page.cssにh1グラデーション（background-clip: text）が定義されている', () => {
        const cssSource = readFileSync(
            join(process.cwd(), 'app/cisco/ccna/automation-application-deployment-security/page.css'),
            'utf8',
        );
        // 原本: background: linear-gradient(90deg, var(--accent), var(--accent-2))
        expect(cssSource).toMatch(/linear-gradient.*90deg/);
        // 原本: -webkit-background-clip: text; background-clip: text
        expect(cssSource).toMatch(/background-clip:\s*text/);
        expect(cssSource).toMatch(/-webkit-text-fill-color:\s*transparent/);
    });

    it('page.cssのh2がborder-left（左アクセントバー）を持つ', () => {
        const cssSource = readFileSync(
            join(process.cwd(), 'app/cisco/ccna/automation-application-deployment-security/page.css'),
            'utf8',
        );
        // 原本: border-left: 4px solid var(--accent)
        expect(cssSource).toMatch(/h2[^}]*border-left:\s*4px solid/s);
    });

    it('page.cssのthが白文字（color: #fff）と半透明アクセント背景を持つ', () => {
        const cssSource = readFileSync(
            join(process.cwd(), 'app/cisco/ccna/automation-application-deployment-security/page.css'),
            'utf8',
        );
        // 原本: th { color: #fff; }
        expect(cssSource).toMatch(/th[^}]*color:\s*#fff/s);
        // 原本: thead tr { background: rgba(124, 158, 255, 0.14); }
        expect(cssSource).toMatch(/thead[^}]*background:\s*rgba\(124,\s*158,\s*255/s);
    });

    it('page.cssのcalloutにborder-leftアクセントバーが定義されている', () => {
        const cssSource = readFileSync(
            join(process.cwd(), 'app/cisco/ccna/automation-application-deployment-security/page.css'),
            'utf8',
        );
        // 原本: .callout { border-left: 4px solid var(--accent) }
        expect(cssSource).toMatch(/\.callout[^}]*border-left:\s*4px solid/s);
    });

    it('page.cssのbadgeにborder-radius:999pxのピル型スタイルが定義されている', () => {
        const cssSource = readFileSync(
            join(process.cwd(), 'app/cisco/ccna/automation-application-deployment-security/page.css'),
            'utf8',
        );
        // 原本: .badge { border-radius: 999px; }
        expect(cssSource).toMatch(/\.badge[^}]*border-radius:\s*999px/s);
    });

    it('page.cssにインラインcodeのスタイル（background: rgba(124,158,255,0.12)）が定義されている', () => {
        const cssSource = readFileSync(
            join(process.cwd(), 'app/cisco/ccna/automation-application-deployment-security/page.css'),
            'utf8',
        );
        // 原本: :not(pre) > code { background: rgba(124, 158, 255, 0.12); color: #c9d8ff; }
        expect(cssSource).toMatch(/:not\(pre\).*code/s);
        expect(cssSource).toMatch(/#c9d8ff/);
    });
});
