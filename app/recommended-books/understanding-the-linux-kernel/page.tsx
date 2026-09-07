import type { Metadata } from 'next';
import { UnderstandingTheLinuxKernelGuide } from './UnderstandingTheLinuxKernelGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'Understanding the Linux Kernel 完全解説ガイド ― 初学者のためのステップバイステップ入門',
    description:
        '『Understanding the Linux Kernel, 3rd Edition』の目次構成・章立てを土台に、初学者向けに再構成し、2026年最新動向までを補完した完全解説ガイド。',
};

export default function UnderstandingTheLinuxKernelPage() {
    return <UnderstandingTheLinuxKernelGuide />;
}
