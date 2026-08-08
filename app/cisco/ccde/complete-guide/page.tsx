import { Metadata } from 'next';
import CcdeGuide from './CcdeGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'CCDE認定 完全ガイド ― 初学者のためのステップバイステップ解説 | Cisco',
    description:
        'Cisco CCDE（Cisco Certified Design Expert）認定試験の完全解説ガイド。筆記試験（400-007）、実技試験、出題ドメイン、費用、再認定ポリシーなどを徹底解説。',
};

/**
 * Renders the CCDE complete guide page.
 *
 * @returns The CCDE guide component
 */
export default function CcdeGuidePage() {
    return <CcdeGuide />;
}
