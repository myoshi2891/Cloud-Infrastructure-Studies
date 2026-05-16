/**
 * EXAMS（試験データ正本）からグローバルナビ用ツリーを派生させる adapter。
 * Header は本関数の戻り値だけを参照して描画する。
 */

export type Provider = 'GCP' | 'AWS';

export type NavLeaf = {
    label: string;
    href: string;
};

export type NavExam = {
    id: string;
    label: string;
    icon: string;
    colorClass: string;
    status?: 'available' | 'coming-soon';
    items: NavLeaf[];
};

export type NavGroup = {
    provider: Provider;
    label: string;
    exams: NavExam[];
};

// adapter は constants の Exam に直接依存させず、構造的サブセットで受ける。
// これにより Exam 型に provider が追加される前後どちらでも動く。
type NavExamInput = {
    id: string;
    label: string;
    icon: string;
    color: string;
    href: string;
    domains: ReadonlyArray<{ label: string; href: string }>;
    provider?: Provider;
    status?: NavExam['status'];
};

const PROVIDER_LABEL: Record<Provider, string> = {
    GCP: 'Google Cloud',
    AWS: 'Amazon Web Services',
};

const PROVIDER_ORDER: readonly Provider[] = ['GCP', 'AWS'];

export function toNavTree(exams: ReadonlyArray<NavExamInput>): NavGroup[] {
    if (exams.length === 0) return [];

    const buckets = new Map<Provider, NavExam[]>();

    for (const exam of exams) {
        const provider: Provider = exam.provider ?? 'GCP';
        const navExam: NavExam = {
            id: exam.id,
            label: exam.label,
            icon: exam.icon,
            colorClass: exam.color,
            ...(exam.status ? { status: exam.status } : {}),
            items: [
                { label: '概要', href: exam.href },
                ...exam.domains.map((d) => ({ label: d.label, href: d.href })),
            ],
        };
        const arr = buckets.get(provider) ?? [];
        arr.push(navExam);
        buckets.set(provider, arr);
    }

    return PROVIDER_ORDER
        .filter((p) => buckets.has(p))
        .map((provider) => ({
            provider,
            label: PROVIDER_LABEL[provider],
            exams: buckets.get(provider) ?? [],
        }));
}
