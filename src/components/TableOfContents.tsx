'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface TocItem {
    id: string;
    title: string;
    level: number;
}

interface TableOfContentsProps {
    content: string;
    locale?: string;
}

export function TableOfContents({ content, locale = 'en' }: TableOfContentsProps) {
    const [toc, setToc] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const t = useTranslations('blog');

    // Extract headings from markdown content
    useEffect(() => {
        const headingRegex = /^(#{2,4})\s+(.+)$/gm;
        const headings: TocItem[] = [];
        let match;

        while ((match = headingRegex.exec(content)) !== null) {
            const level = match[1].length;
            const title = match[2].trim();
            const id = title
                .toLowerCase()
                .replace(/[^\w\s\u0600-\u06FF]/g, '') // Allow Arabic characters
                .replace(/\s+/g, '-')
                .trim();

            headings.push({ id, title, level });
        }

        setToc(headings);
    }, [content]);

    // Track scroll position and update active heading
    useEffect(() => {
        const observerOptions = {
            rootMargin: '-80px 0px -80px 0px',
            threshold: 0.1,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all headings in the content
        const headingElements = document.querySelectorAll('h2, h3, h4');
        headingElements.forEach((el) => observer.observe(el));

        return () => {
            headingElements.forEach((el) => observer.unobserve(el));
        };
    }, [toc]);

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -80; // Account for header height
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    if (toc.length === 0) {
        return null;
    }

    return (
        <div className="sticky top-24 h-fit">
            <div className="bg-background border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4 text-primary">
                    {t('tableOfContents') || 'Table of Contents'}
                </h3>
                <nav className="space-y-1">
                    {toc.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToHeading(item.id)}
                            className={cn(
                                'block w-full text-left text-sm transition-colors hover:text-primary',
                                {
                                    'text-primary font-medium': activeId === item.id,
                                    'text-muted-foreground': activeId !== item.id,
                                    'pl-4': item.level === 3,
                                    'pl-8': item.level === 4,
                                }
                            )}
                        >
                            {item.title}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}
