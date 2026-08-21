import { JSDOM } from 'jsdom';
import fs from 'node:fs';
import path from 'node:path';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', { url: 'http://localhost' });
(globalThis as any).window = dom.window;
(globalThis as any).document = dom.window.document;
(globalThis as any).navigator = dom.window.navigator;
(globalThis as any).HTMLElement = dom.window.HTMLElement;
(globalThis as any).SVGElement = dom.window.SVGElement;

import { act, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CcnaNetworkFundamentalsGuide from '@/app/cisco/ccna/automation-network-fundamentals/CcnaNetworkFundamentalsGuide';
import NavBar from '@/app/cisco/ccna/automation-network-fundamentals/NavBar';
import Page, { metadata } from '@/app/cisco/ccna/automation-network-fundamentals/page';
import fidelity from '@/docs/migration-inventory/ccna-automation-network-fundamentals.fidelity.json';
import {
    expectContentCssCoverage,
    expectElementPlacementFidelity,
    expectInlineCodeFidelity,
    expectSupplementalFidelity,
    expectTableFidelity,
    expectTextFidelity,
} from '../archive-fidelity';

const { mermaidRenderMock } = vi.hoisted(() => ({ mermaidRenderMock: vi.fn() }));

/** Replaces Mermaid rendering with an inspectable accessible element. */
vi.mock('@/components/MermaidDiagram', () => ({
    /** Preserves the aria-label contract used by the guide diagrams. */
    MermaidDiagram: ({ ariaLabel }: { ariaLabel: string }) => {
        mermaidRenderMock(ariaLabel);
        return (
            <div data-testid="mermaid-diagram" aria-label={ariaLabel}>
                {ariaLabel}
            </div>
        );
    },
}));

describe('CCNA Automation Network Fundamentals Guide - Automated 100% Text & Structure Verification', () => {
    it('identifies the CCNAAUTO 200-901 Network Fundamentals domain in metadata', () => {
        expect(metadata.title).toBe(
            'CCNAAUTO 200-901 | 6.0 Network Fundamentals 完全対策ガイド',
        );
        expect(metadata.description).toContain('CCNA Automation 200-901');
        expect(metadata.description).not.toContain('CCNA 200-301');
    });

    it('renders the Page component with title and Server Component wrapper', () => {
        const pageElement = Page();
        expect(pageElement).toBeTruthy();
    });

    it('verifies 100% text fidelity against the committed source fixture', () => {
        const { container } = render(<CcnaNetworkFundamentalsGuide />);

        expectTextFidelity(fidelity.texts, container);
    });

    it('renders NavBar with active section highlight capability (ScrollSpy)', () => {
        const { container } = render(<NavBar activeId="step3" />);
        const activeLink = container.querySelector('a.active');
        expect(activeLink).toBeTruthy();
        expect(activeLink?.getAttribute('href')).toBe('#step3');
        expect(activeLink).toHaveAttribute('aria-current', 'location');
        expect(container.querySelectorAll('a[aria-current="location"]')).toHaveLength(1);
    });

    it('does not re-render diagrams when ScrollSpy updates the active section', () => {
        let observerCallback: IntersectionObserverCallback | undefined;
        const observerOptions: IntersectionObserverInit[] = [];
        const disconnect = vi.fn();
        class IntersectionObserverStub {
            constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
                observerCallback = callback;
                observerOptions.push(options ?? {});
            }
            observe() {}
            disconnect = disconnect;
        }
        vi.stubGlobal('IntersectionObserver', IntersectionObserverStub);
        try {
            mermaidRenderMock.mockClear();

            render(<CcnaNetworkFundamentalsGuide />);
            const initialRenderCount = mermaidRenderMock.mock.calls.length;

            expect(observerCallback).toBeTypeOf('function');
            expect(observerOptions).toEqual([
                { rootMargin: '-154px 0px -538px 0px' },
            ]);
            if (!observerCallback) {
                throw new Error('ScrollSpy must register an IntersectionObserver callback');
            }
            const callback = observerCallback;

            act(() => {
                callback(
                    [{ isIntersecting: true, target: { id: 'step3' } } as IntersectionObserverEntry],
                    {} as IntersectionObserver,
                );
            });

            expect(initialRenderCount).toBeGreaterThan(0);
            expect(mermaidRenderMock).toHaveBeenCalledTimes(initialRenderCount);

            act(() => {
                Object.defineProperty(window, 'innerHeight', {
                    configurable: true,
                    value: 1000,
                });
                window.dispatchEvent(new window.Event('resize'));
            });

            expect(disconnect).toHaveBeenCalledTimes(1);
            expect(observerOptions).toEqual([
                { rootMargin: '-154px 0px -538px 0px' },
                { rootMargin: '-200px 0px -700px 0px' },
            ]);
        } finally {
            vi.unstubAllGlobals();
        }
    });

    it('preserves reference link text, count, and href values from the source fixture', () => {
        const { container } = render(<CcnaNetworkFundamentalsGuide />);
        const migratedLinks = Array.from(
            container.querySelectorAll<HTMLAnchorElement>('a.ref-url'),
        );

        expect(migratedLinks).toHaveLength(fidelity.refUrls.length);
        expect(
            migratedLinks.map((link) => ({
                text: link.textContent?.trim(),
                href: link.getAttribute('href'),
            })),
        ).toEqual(fidelity.refUrls.map((url) => ({ text: url, href: url })));
    });

    it('preserves every table cell, supplemental item, inline-code token, CSS class, and element placement', () => {
        const { container } = render(<CcnaNetworkFundamentalsGuide />);
        const css = fs.readFileSync(
            path.resolve(
                process.cwd(),
                'app/cisco/ccna/automation-network-fundamentals/page.css',
            ),
            'utf8',
        );

        expectTableFidelity(fidelity.tables, container);
        expectSupplementalFidelity(
            fidelity.supplemental,
            container,
            '.callout, .meta-card, .diagram-caption',
        );
        expectInlineCodeFidelity(fidelity.inlineCode, container);
        expectContentCssCoverage(fidelity.styledClasses, container, css, {
            prose: 'ccna-network-fundamentals-page',
            'domain-highlight': 'this-domain',
            mermaid: 'diagram-wrapper',
        });
        expectElementPlacementFidelity(
            fidelity.placements,
            container,
            '.table-wrapper > table, .diagram-block, .callout',
        );
    });
});

describe('CcnaNetworkFundamentalsGuide - scroll spy via IntersectionObserver', () => {
    interface CapturedObserver {
        callback: IntersectionObserverCallback;
        observed: Element[];
    }

    /**
     * IntersectionObserver を差し替え、生成されたコールバックと監視対象を取り出す。
     * jsdom は IntersectionObserver を実装しないため、スタブが無いと useEffect が即 return する。
     */
    const installObserverStub = (): CapturedObserver => {
        const captured: CapturedObserver = { callback: () => undefined, observed: [] };

        class StubIntersectionObserver {
            constructor(callback: IntersectionObserverCallback) {
                captured.callback = callback;
            }

            observe(target: Element): void {
                captured.observed.push(target);
            }

            unobserve(): void {}

            disconnect(): void {
                captured.observed.length = 0;
            }

            takeRecords(): IntersectionObserverEntry[] {
                return [];
            }
        }

        vi.stubGlobal('IntersectionObserver', StubIntersectionObserver);
        return captured;
    };

    /** 交差状態の通知だけを持つ最小限のエントリ。コールバックは target.id と isIntersecting しか読まない。 */
    const entryFor = (target: Element, isIntersecting: boolean): IntersectionObserverEntry =>
        ({ target, isIntersecting }) as unknown as IntersectionObserverEntry;

    /** observe された要素から id 一致のセクションを返す。見つからない場合はその場で失敗させる。 */
    const sectionById = (captured: CapturedObserver, id: string): Element => {
        const section = captured.observed.find((element) => element.id === id);
        expect(section, `observed section not found: ${id}`).toBeDefined();
        return section as Element;
    };

    /** 現在アクティブなナビリンクの href を返す。該当リンクが無ければ undefined。 */
    const activeHref = (container: HTMLElement): string | null | undefined =>
        container.querySelector('a[aria-current="location"]')?.getAttribute('href');

    /** スタブした IntersectionObserver のコールバックを act 内で発火させ、scroll spy の再描画を反映する。 */
    const notify = (captured: CapturedObserver, entries: IntersectionObserverEntry[]): void => {
        act(() => {
            captured.callback(entries, {} as IntersectionObserver);
        });
    };

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('observes every guide section so the scroll spy covers the whole document', () => {
        const captured = installObserverStub();
        render(<CcnaNetworkFundamentalsGuide />);

        expect(captured.observed.map((element) => element.id)).toContain('step1');
        expect(captured.observed.map((element) => element.id)).toContain('step3');
    });

    it.each([
        ['document order', ['step1', 'step3']],
        ['reverse order', ['step3', 'step1']],
    ])(
        'picks the last intersecting section in document order regardless of entry %s',
        (_label, order) => {
            const captured = installObserverStub();
            const { container } = render(<CcnaNetworkFundamentalsGuide />);

            notify(
                captured,
                order.map((id) => entryFor(sectionById(captured, id), true)),
            );

            expect(activeHref(container)).toBe('#step3');
        },
    );

    it('keeps the active section stable when an earlier section is reported afterwards', () => {
        const captured = installObserverStub();
        const { container } = render(<CcnaNetworkFundamentalsGuide />);

        notify(captured, [entryFor(sectionById(captured, 'step3'), true)]);
        expect(activeHref(container)).toBe('#step3');

        // 別コールバックで上側のセクションが後から届いても、下側が帯に残っている限り選択は変わらない
        notify(captured, [entryFor(sectionById(captured, 'step1'), true)]);
        expect(activeHref(container)).toBe('#step3');
    });

    it('drops stale ids so the active section falls back when a section leaves the band', () => {
        const captured = installObserverStub();
        const { container } = render(<CcnaNetworkFundamentalsGuide />);

        notify(captured, [
            entryFor(sectionById(captured, 'step1'), true),
            entryFor(sectionById(captured, 'step3'), true),
        ]);
        expect(activeHref(container)).toBe('#step3');

        notify(captured, [entryFor(sectionById(captured, 'step3'), false)]);
        expect(activeHref(container)).toBe('#step1');
    });
});
