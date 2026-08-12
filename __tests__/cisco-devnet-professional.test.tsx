// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AutomationProfessionalGuide from '../app/cisco/devnet-professional/DevNetProfessionalGuide';
import { DIAGRAMS } from '../app/cisco/devnet-professional/constants';
import AutomationProfessionalPage, { metadata } from '../app/cisco/devnet-professional/page';

// MermaidDiagram をモック化
vi.mock('@/components/MermaidDiagram', () => ({
  MermaidDiagram: function DummyMermaidDiagram({
    chart,
    ariaLabel,
    preserveNaturalScale,
  }: {
    chart: string;
    ariaLabel: string;
    preserveNaturalScale?: boolean;
  }) {
    return (
      <div
        data-testid="mermaid-diagram"
        data-chart={chart}
        data-aria-label={ariaLabel}
        data-preserve-scale={preserveNaturalScale ? 'true' : 'false'}
      >
        {chart}
      </div>
    );
  },
}));

describe('Cisco CCNP Automation Guide Page', () => {
  it('ページ metadata が正しく定義されていること', () => {
    expect(metadata.title).toBe(
      'CCNP Automation 認定 徹底解説ガイド | Cisco資格対策'
    );
    expect(metadata.description).toBe(
      'Cisco公式情報に基づくCCNP Automation認定徹底解説ガイド。コア試験（350-901 AUTOCOR）の出題トピック、2つのコンセントレーション試験の一覧と選び方、試験形式、合格ロードマップ、再認定制度を分かりやすく整理。'
    );
  });

  it('Server Page Component が正常にレンダリングされること', () => {
    render(<AutomationProfessionalPage />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'CCNP Automation 認定 徹底解説ガイド',
      })
    ).toBeInTheDocument();
  });

  it('Hero セクションが元HTMLと完全に一致するコンテンツとデザイン構造を持っていること', () => {
    render(<AutomationProfessionalGuide />);

    // Hero eyebrow
    const eyebrow = screen.getByText('Beginner Step-by-Step Guide');
    expect(eyebrow).toBeInTheDocument();
    expect(eyebrow.className).toContain('eyebrow');

    // H1 Title
    const h1 = screen.getByRole('heading', {
      level: 1,
      name: 'CCNP Automation 認定 徹底解説ガイド',
    });
    expect(h1).toBeInTheDocument();

    // Lead text
    expect(
      screen.getByText(/Cisco公式サイトの一次情報にもとづき、CCNP Automation認定について/i)
    ).toBeInTheDocument();

    // Hero source line link
    const heroLink = screen.getByRole('link', {
      name: /CCNP Automation 認定とトレーニングプログラム（Cisco公式）/i,
    });
    expect(heroLink).toHaveAttribute(
      'href',
      'https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccnp-automation/index.html'
    );
    expect(heroLink).toHaveAttribute('target', '_blank');
    expect(heroLink).toHaveAttribute('rel', 'noopener');
  });

  it('全13セクションの見出し (H2) と ID が正確に存在すること', () => {
    const { container } = render(<AutomationProfessionalGuide />);

    const expectedSections = [
      { id: 'prereq', title: '1. このガイドの前提知識' },
      { id: 'what-is-devnet', title: '2. Automation認定とは何か（CCNA/CCNPとの違い）' },
      { id: 'cert-levels', title: '3. Cisco認定全体における CCNP Automation の位置づけ' },
      { id: 'overview', title: '4. CCNP Automation の概要' },
      { id: 'prerequisites', title: '5. 受験資格・前提条件' },
      { id: 'mechanism', title: '6. 認定取得の仕組み（コア試験＋コンセントレーション試験）' },
      { id: 'devcor', title: '7. コア試験「350-901 AUTOCOR」を徹底解説' },
      { id: 'concentration', title: '8. コンセントレーション試験（専門分野選択式試験）一覧' },
      { id: 'format', title: '9. 試験形式・受験方法' },
      { id: 'roadmap', title: '10. 合格までの学習ロードマップ（ステップバイステップ）' },
      { id: 'recert', title: '11. 再認定（Recertification）制度' },
      { id: 'summary', title: '12. まとめ：CCNP Automationはこんな人におすすめ' },
      { id: 'sources', title: '13. 参考ソース一覧' },
    ];

    expectedSections.forEach(({ id, title }) => {
      const sectionEl = container.querySelector(`section#${id}`);
      expect(sectionEl).not.toBeNull();
      expect(sectionEl?.querySelector('h2')?.textContent?.trim()).toBe(title);
    });
  });

  it('現在位置の目次リンクだけが aria-current を持つこと', () => {
    const { container } = render(<AutomationProfessionalGuide />);

    expect(container.querySelectorAll('a[aria-current="true"]')).toHaveLength(1);
  });

  it('全7つのテーブルが存在し、ヘッダーとセルデータが正確に表示されること', () => {
    render(<AutomationProfessionalGuide />);

    // Section 1: 前提知識テーブル
    expect(screen.getByText('初学者向けの説明')).toBeInTheDocument();
    expect(screen.getByText('REST API')).toBeInTheDocument();
    expect(
      screen.getByText(
        'HTTP通信（GET/POST/PUT/DELETEなど）を使ってデータをやり取りする、現在最も一般的なAPIの設計方式'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Ansible / Terraform')).toBeInTheDocument();

    // Section 4: 概要テーブル
    expect(screen.getByText('認定が証明するスキル')).toBeInTheDocument();
    expect(screen.getAllByText('3年間').length).toBeGreaterThanOrEqual(2);

    // Section 7-1: AUTOCOR基本情報テーブル
    expect(screen.getByText('350-901（AUTOCOR）')).toBeInTheDocument();
    expect(
      screen.getByText('Designing, Deploying and Managing Network Automation Systems')
    ).toBeInTheDocument();

    // Section 7-2: AUTOCOR出題比率テーブル
    expect(screen.getByText('1.0 ネットワーク自動化')).toBeInTheDocument();
    expect(screen.getByText('4.0 自動化におけるAI')).toBeInTheDocument();

    // Section 8: コンセントレーション試験一覧テーブル
    expect(screen.getByText('300-435 ENAUTO')).toBeInTheDocument();
    expect(screen.getByText('300-635 DCNAUTO')).toBeInTheDocument();
    expect(screen.queryByText(/CLAUTO|SPAUTO|SAUTO|DEVOPS|DEVIOT|DEVWBX/)).not.toBeInTheDocument();

    // Section 10: ロードマップステップテーブル
    expect(screen.getByText('Step 0〜1')).toBeInTheDocument();
    expect(screen.getByText('Step 8')).toBeInTheDocument();

    // Section 11: 再認定CEクレジットテーブル
    expect(screen.getByText('80 CEクレジット')).toBeInTheDocument();
    expect(screen.getByText('120 CEクレジット')).toBeInTheDocument();
  });

  it('全6つの Mermaid ダイアグラムが正確なDSLとariaLabelでレンダリングされ、preserveNaturalScaleがtrueであること', () => {
    render(<AutomationProfessionalGuide />);

    const mermaidDiagrams = screen.getAllByTestId('mermaid-diagram');
    expect(mermaidDiagrams).toHaveLength(6);

    // 1. levels
    expect(mermaidDiagrams[0]).toHaveAttribute(
      'data-aria-label',
      '図1: Automation認定レベルの全体像とProfessional取得の流れ'
    );
    expect(mermaidDiagrams[0]).toHaveAttribute('data-preserve-scale', 'true');
    expect(DIAGRAMS.levels).toContain('flowchart TB');
    expect(DIAGRAMS.levels).toContain('350-901 AUTOCOR');

    // 2. mechanism
    expect(mermaidDiagrams[1]).toHaveAttribute(
      'data-aria-label',
      '図2: コア試験とコンセントレーション試験の関係'
    );
    expect(mermaidDiagrams[1]).toHaveAttribute('data-preserve-scale', 'true');
    expect(DIAGRAMS.mechanism).toContain('300-435 ENAUTO');

    // 3. domains
    expect(mermaidDiagrams[2]).toHaveAttribute(
      'data-aria-label',
      '図3: AUTOCORの4つの出題ドメインと配点'
    );
    expect(mermaidDiagrams[2]).toHaveAttribute('data-preserve-scale', 'true');
    expect(DIAGRAMS.domains).toContain('flowchart LR');

    // 4. format
    expect(mermaidDiagrams[3]).toHaveAttribute('data-aria-label', '図4: 受験の基本フロー');
    expect(mermaidDiagrams[3]).toHaveAttribute('data-preserve-scale', 'true');

    // 5. roadmap
    expect(mermaidDiagrams[4]).toHaveAttribute('data-aria-label', '図5: 学習ロードマップ');
    expect(mermaidDiagrams[4]).toHaveAttribute('data-preserve-scale', 'true');

    // 6. recert
    expect(mermaidDiagrams[5]).toHaveAttribute('data-aria-label', '図6: 再認定の分岐フロー');
    expect(mermaidDiagrams[5]).toHaveAttribute('data-preserve-scale', 'true');
  });

  it('全Callout（補足注釈コンポーネント）と注意事項フッターが元デザイン通りにレンダリングされること', () => {
    const { container } = render(<AutomationProfessionalGuide />);

    const callouts = container.querySelectorAll('.callout');
    expect(callouts.length).toBeGreaterThanOrEqual(3);

    expect(screen.getByText('補足（最新情報）：')).toBeInTheDocument();
    expect(screen.getAllByText('CCIE Automation')).toHaveLength(2);
    expect(screen.getByText('初学者向けポイント：')).toBeInTheDocument();
    expect(screen.getByText('不合格日の翌日から5暦日')).toBeInTheDocument();

    const footerNotice = container.querySelector('.footer');
    expect(footerNotice).toBeInTheDocument();
    expect(footerNotice?.textContent).toContain('予告なく変更される場合があります');
  });

  it('参考ソース一覧に現行試験の公式リンクが出力されていること', () => {
    const { container } = render(<AutomationProfessionalGuide />);

    const refsSection = container.querySelector('section#sources');
    expect(refsSection).toBeInTheDocument();

    const links = refsSection?.querySelectorAll('a');
    expect(links?.length).toBe(10);

    const autocorLink = refsSection?.querySelector('a[href*="350-901-AUTOCOR-v2.0"]');
    expect(autocorLink).toBeInTheDocument();
    expect(autocorLink).toHaveAttribute('target', '_blank');
    expect(autocorLink).toHaveAttribute('rel', 'noopener');
  });
});
