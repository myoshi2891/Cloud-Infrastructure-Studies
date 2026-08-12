import type { Exam } from '@/app/constants';
import { countUniqueGuideUrls } from '@/app/home-utils';
import styles from '@/app/page.module.css';
import { ProviderMark } from '@/components/ProviderMark';
import { providerMeta, providerOrder } from './config';

/** Renders the landing hero and its guide/provider summary for the supplied exams. */
export function Hero({ exams }: { exams: Exam[] }) {
    const guideCount = countUniqueGuideUrls(exams);

    return (
        <section className={styles.hero}>
            <div className={styles.heroGrid}>
                <div className={styles.heroCopy}>
                    <p className={styles.eyebrow}>
                        <span aria-hidden /> Multi-vendor learning hub
                    </p>
                    <h1 className={styles.title}>
                        インフラの知識を、
                        <br />
                        <span>確かな実力へ。</span>
                    </h1>
                    <p className={styles.sub}>
                        Google Cloud・AWS・Ciscoを横断。資格取得だけで終わらない、
                        現場につながる日本語学習ガイドを集約しています。
                    </p>
                    <div className={styles.heroActions}>
                        <a href="#catalog" className={styles.primaryAction}>
                            学習ガイドを探す <span aria-hidden>↓</span>
                        </a>
                        <span className={styles.updateNote}>
                            <span aria-hidden>●</span> 継続アップデート中
                        </span>
                    </div>
                </div>

                <div className={styles.heroPanel} aria-label="収録コンテンツ概要">
                    <div className={styles.panelTopline}>
                        <span>LEARNING INDEX</span>
                        <span>2026 / UPDATED</span>
                    </div>
                    <div className={styles.panelNumber}>{guideCount}</div>
                    <p className={styles.panelLabel}>GUIDES &amp; LEARNING PATHS</p>
                    <div className={styles.providerRail}>
                        {providerOrder.map((provider) => {
                            const count = exams.filter((exam) => exam.provider === provider).length;
                            return (
                                <a key={provider} href={`#provider-${provider.toLowerCase()}`}>
                                    <ProviderMark provider={provider} compact />
                                    <span>{providerMeta[provider].label}</span>
                                    <strong>{String(count).padStart(2, '0')}</strong>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className={styles.heroGridLines} aria-hidden />
        </section>
    );
}
