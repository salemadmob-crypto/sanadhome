import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import RelatedServices from '@/components/RelatedServices';
import ShareButtons from '@/components/shareButtons';
import { TableOfContents } from '@/components/TableOfContents';
import { Button } from '@/components/ui/button';
import { getAllSlugs, getMarkdownContent, getRelatedContentByCategory } from '@/lib/markdown';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ServicePageProps {
    params: any
}

// Generate static paths for all services
export async function generateStaticParams({ params: { locale } }: { params: { locale: string } }) {
    const slugs = getAllSlugs('services', locale);
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params: { slug, locale } }: ServicePageProps): Promise<Metadata> {
    const service = getMarkdownContent('services', slug, locale);

    if (!service) {
        return {
            title: 'Service Not Found',
            description: 'The requested service could not be found.',
        };
    }

    const { frontmatter } = service;
    const isArabic = locale === 'ar';
    const siteTitle = isArabic ? 'سند هوم' : 'SanadHome';
    const servicesTitle = isArabic ? 'خدماتنا' : 'Our Services';

    return {
        title: `${frontmatter.title} | ${siteTitle} ${servicesTitle}`,
        description: frontmatter.description,
        keywords: [
            frontmatter.category || '',
            isArabic ? 'التمريض المنزلي' : 'home nursing',
            isArabic ? 'الرعاية الصحية المنزلية' : 'home healthcare',
            isArabic ? 'خدمات طبية منزلية' : 'home medical services',
            isArabic ? 'رعاية منزلية متخصصة' : 'professional home care',
            isArabic ? 'سند هوم' : 'SanadHome',
        ].filter(Boolean),
        authors: [{ name: siteTitle }],
        openGraph: {
            title: frontmatter.title,
            description: frontmatter.description,
            type: 'website',
            url: `/${locale}/services/${slug}`,
            locale: locale,
            siteName: siteTitle,
            ...(frontmatter.image && {
                images: [{
                    url: frontmatter.image,
                    alt: frontmatter.title
                }],
            }),
        },
        twitter: {
            card: 'summary_large_image',
            title: frontmatter.title,
            description: frontmatter.description,
            ...(frontmatter.image && {
                images: [frontmatter.image],
            }),
        },
        alternates: {
            languages: {
                'ar': `/ar/services/${slug}`,
                'en': `/en/services/${slug}`,
            },
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

export default async function ServicePage({ params: { slug, locale } }: ServicePageProps) {
    const service = getMarkdownContent('services', decodeURIComponent(slug), locale);
    const t = await getTranslations({ locale, namespace: 'ServicePage' });

    if (!service) {
        notFound();
    }

    const { frontmatter, content } = service;

    // Get related services
    const relatedServices = getRelatedContentByCategory(
        'services',
        slug,
        frontmatter.category || '',
        locale,
        3
    );

    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
                {/* Main Content */}
                <main className="md:col-span-8">
                    <article>
                        <header className="mb-10">
                            <Button variant="ghost" asChild className="mb-6 -ml-4">
                                <Link href={`/${locale}/services`}>
                                    <ArrowLeft className="h-4 w-4 rtl:rotate-180 ltr:mr-2 rtl:ml-2" />
                                    {t('backToServices')}
                                </Link>
                            </Button>

                            {frontmatter.category && (
                                <span className="bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200 px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                                    {frontmatter.category}
                                </span>
                            )}
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
                                {frontmatter.title}
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground">
                                {frontmatter.description}
                            </p>
                            <div className=' p-2 '>
                                <ShareButtons title={frontmatter.title} />
                            </div>
                        </header>

                        <MarkdownRenderer content={content} />
                    </article>
                </main>

                {/* Sidebar */}
                <aside className="md:col-span-4">
                    <div className="sticky top-24">
                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-4">{t('tocTitle')}</h3>
                            <TableOfContents content={content} />
                        </div>
                        <div className="bg-muted/50 dark:bg-muted/20 p-6 rounded-lg">
                            <h3 className="text-xl font-bold mb-4">{t('cta.title')}</h3>
                            <p className="text-muted-foreground mb-6">
                                {t('cta.description')}
                            </p>
                            <Button size="lg" className="w-full" asChild>
                                <Link href={`/${locale}/contact`}>{t('cta.button')}</Link>
                            </Button>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Related Services Section */}
            <RelatedServices services={relatedServices} locale={locale} />
        </div>
    );
}