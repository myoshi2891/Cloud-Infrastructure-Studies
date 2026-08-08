import NavBar from './NavBar';
import TitleBlockSection from '@/components/sections/ccde/TitleBlockSection';
import HeroSection from '@/components/sections/ccde/HeroSection';
import TocSection from '@/components/sections/ccde/TocSection';
import WhatIsCcdeSection from '@/components/sections/ccde/WhatIsCcdeSection';
import OverallFlowSection from '@/components/sections/ccde/OverallFlowSection';
import PrerequisitesSection from '@/components/sections/ccde/PrerequisitesSection';
import Step1WrittenSection from '@/components/sections/ccde/Step1WrittenSection';
import Step2PracticalSection from '@/components/sections/ccde/Step2PracticalSection';
import CertificationsEarnedSection from '@/components/sections/ccde/CertificationsEarnedSection';
import CostsSection from '@/components/sections/ccde/CostsSection';
import RecertificationSection from '@/components/sections/ccde/RecertificationSection';
import RoadmapSection from '@/components/sections/ccde/RoadmapSection';
import GlossarySection from '@/components/sections/ccde/GlossarySection';
import FaqSection from '@/components/sections/ccde/FaqSection';
import SourcesSection from '@/components/sections/ccde/SourcesSection';
import ClosingFooter from '@/components/sections/ccde/ClosingFooter';

/**
 * Renders the complete Cisco CCDE certification guide page.
 *
 * @returns The CCDE guide page with navigation and all guide sections
 */
export default function CcdeGuide() {
    return (
        <>
            <NavBar />
            <div className="ccde-guide-page">
                <TitleBlockSection />
                <HeroSection />
                <TocSection />
                <WhatIsCcdeSection />
                <OverallFlowSection />
                <PrerequisitesSection />
                <Step1WrittenSection />
                <Step2PracticalSection />
                <CertificationsEarnedSection />
                <CostsSection />
                <RecertificationSection />
                <RoadmapSection />
                <GlossarySection />
                <FaqSection />
                <SourcesSection />
                <ClosingFooter />
            </div>
        </>
    );
}
