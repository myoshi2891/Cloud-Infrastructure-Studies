import baseStyles from './SectionBase.module.css';

/**
 * WhatIsCcdeSection - セクション1「CCDEとは何か」の解説コンポーネント。
 */
export default function WhatIsCcdeSection() {
    return (
        <section className={baseStyles.sheet} id="what-is-ccde">
            <div className={baseStyles.sheetHead}>
                <div className={baseStyles.sheetNum}>01</div>
                <div>
                    <span className={baseStyles.sheetEyebrow}>Overview</span>
                    <h2>CCDEとは何か</h2>
                </div>
            </div>
            <div className={baseStyles.sheetBody}>
                <p>
                    CCDEは、複雑なエンタープライズ
                    ネットワークを設計し、アーキテクチャとして構築するスキルを証明する、Cisco認定資格の最上位カテゴリ「Expert」に属する資格です。実装や運用そのものよりも、ビジネス要件と技術要件を整理し、拡張性・回復性・コストなどの複数の観点からトレードオフを判断して「設計を決定し、その根拠を説明する」能力が問われます。
                </p>
                <p>
                    取得を目指す代表的な職種としては、ソリューションアーキテクト、ネットワークアーキテクト、ネットワークデザイナーなどが挙げられており、シニアレベルやリーダー職を目指すエンジニアの多くが取得を検討する資格として位置づけられています。
                </p>
                <h3>CCIEとの違い（ざっくりしたイメージ）</h3>
                <p>
                    同じExpertレベルの資格であるCCIEが「特定技術領域を実装・運用できる力」を検証するのに対し、CCDEは特定のベンダー技術に閉じず「ネットワーク全体の設計判断ができる力」を検証する、という役割分担で語られることが多い資格です。どちらが上位というより、実装寄りか設計寄りかという専門性の違いだと捉えると理解しやすくなります。
                </p>
            </div>
        </section>
    );
}
