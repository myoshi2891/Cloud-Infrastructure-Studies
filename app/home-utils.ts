import type { Exam } from './constants';

/** Counts unique exam and domain guide URLs displayed in the home hero. */
export function countUniqueGuideUrls(exams: Exam[]) {
    return new Set(exams.flatMap((exam) => [exam.href, ...exam.domains.map((domain) => domain.href)])).size;
}
