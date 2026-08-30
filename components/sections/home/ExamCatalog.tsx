import { providerMeta, providerOrder, type Exam } from '@/app/constants';
import styles from '@/app/page.module.css';
import { ProviderMark } from '@/components/ProviderMark';
import { ExamCard } from './ExamCard';

/** Groups the supplied entries into provider-specific catalog sections. */
export function ExamCatalog({ exams }: { exams: Exam[] }) {
    return (
        <section id="catalog" className={styles.catalog}>
            <div className={styles.catalogIntro}>
                <p>Study catalog</p>
                <h2>学びたい領域から選ぶ</h2>
                <span>プロバイダごとに整理された学習パスから、次の一歩を選択できます。</span>
            </div>

            {providerOrder.map((provider, index) => {
                const providerExams = exams.filter((exam) => exam.provider === provider);
                if (providerExams.length === 0) return null;
                const meta = providerMeta[provider];
                return (
                    <section
                        key={provider}
                        id={`provider-${provider.toLowerCase()}`}
                        className={styles.providerSection}
                        data-provider={provider.toLowerCase()}
                        aria-labelledby={`provider-heading-${provider}`}
                    >
                        <header className={styles.providerHeader}>
                            <span className={styles.providerIndex}>0{index + 1}</span>
                            <ProviderMark provider={provider} />
                            <div className={styles.providerTitle}>
                                <p>{meta.kicker}</p>
                                <h2 id={`provider-heading-${provider}`}>{meta.label}</h2>
                            </div>
                            <p className={styles.providerDescription}>{meta.description}</p>
                            <span className={styles.providerCount}>
                                {providerExams.length} {meta.countUnit.en}
                            </span>
                        </header>
                        <div className={styles.cards}>
                            {providerExams.map((exam) => (
                                <ExamCard key={exam.id} exam={exam} />
                            ))}
                        </div>
                    </section>
                );
            })}
        </section>
    );
}
