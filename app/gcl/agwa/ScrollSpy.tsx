'use client';

import { useEffect } from 'react';

/**
 * Client component to handle ScrollSpy behavior for the AGWA sidebar.
 * It observes scroll events and toggles the 'active' class on sidebar links based on the current section.
 */
export default function ScrollSpy() {
    useEffect(() => {
        const links = document.querySelectorAll('.sidebar-link[href^="#"]');
        const sections = Array.from(document.querySelectorAll('.section[id]')) as HTMLElement[];

        if (sections.length === 0 || links.length === 0) return;

        function updateActive() {
            const first = sections[0];
            if (!first) return;

            const scrollY = window.scrollY + 80;
            let current = first;
            for (const s of sections) {
                if (s.offsetTop <= scrollY) current = s;
            }
            links.forEach((l) => {
                if (l.getAttribute('href') === '#' + current.id) {
                    l.classList.add('active');
                } else {
                    l.classList.remove('active');
                }
            });
        }

        window.addEventListener('scroll', updateActive, { passive: true });

        // Ensure active section is set correctly on initial mount
        updateActive();

        return () => {
            window.removeEventListener('scroll', updateActive);
        };
    }, []);

    return null;
}
