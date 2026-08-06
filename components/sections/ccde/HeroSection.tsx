import styles from './HeroSection.module.css';

/**
 * CCDE認定資格の概要と学習ガイドのコンセプトを提示するヒーロー導入部コンポーネント。
 */
export default function HeroSection() {
    return (
        <div className={styles.hero}>
            <p className={styles.heroTitle}>
                ネットワークという都市の、<br />
                <span className={styles.accent}>青写真</span>を描く資格。
            </p>
            <p>
                CCDEは、特定の製品や設定手順ではなく「複雑なネットワークをどう設計し、どうアーキテクチャとして組み立てるか」を問う、Cisco認定資格の中でも最上位クラス（Expertレベル）の資格です。このガイドでは、公式情報をもとに、前提知識ゼロの状態からでも全体像がつかめるように、試験の仕組みを順番に解説していきます。
            </p>
        </div>
    );
}
