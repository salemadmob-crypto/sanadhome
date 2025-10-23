import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { Button } from '@/components/ui/button';
import { getAllSlugs, getMarkdownContent } from '@/lib/markdown';
import { ArrowLeft, Shield } from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ServicePageProps {
    params: Promise<{
        slug: string;
        locale: string;
    }>;
}

// Generate static params for all service pages
export async function generateStaticParams() {
    const locales = ['en', 'ar'];
    const params: { locale: string; slug: string }[] = [];

    locales.forEach(locale => {
        const slugs = getAllSlugs('services', locale);
        slugs.forEach(slug => {
            params.push({ locale, slug });
        });
    });

    return params;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const { slug, locale } = resolvedParams;

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

export default async function ServicePage({ params }: ServicePageProps) {
    const resolvedParams = await params;
    const { slug, locale } = resolvedParams;

    const t = await getTranslations({
        locale,
        namespace: 'services',
    });

    // Get the service content from markdown
    const service = getMarkdownContent('services', slug, locale);

    if (!service) {
        notFound();
    }

    return (
        <div className="flex flex-col">
            {/* Breadcrumb */}
            <nav className="border-b bg-background">
                <div className="container py-4">
                    <Button variant="ghost" asChild className="mb-2">
                        <Link href={`/${locale}/services`} className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            {t('backToServices') || 'Back to Services'}
                        </Link>
                    </Button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="py-12 lg:py-20">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                        <div className="space-y-6">
                            {service.frontmatter.category && (
                                <div className="flex items-center gap-2">
                                    <Shield className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium text-primary">
                                        {service.frontmatter.category}
                                    </span>
                                </div>
                            )}

                            <div className="space-y-4">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    {service.frontmatter.title}
                                </h1>
                                <p className="text-xl text-muted-foreground">
                                    {service.frontmatter.description}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" asChild>
                                    <Link href={`/${locale}/contact`}>
                                        {t('contactUs') || 'Contact Us'}
                                    </Link>
                                </Button>
                                <Button variant="outline" size="lg" asChild>
                                    <Link href={`/${locale}/services`}>
                                        {t('viewAllServices') || 'View All Services'}
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {service.frontmatter.image && (
                            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                                <Image
                                    src={service.frontmatter.image}
                                    alt={service.frontmatter.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-12 lg:py-20 bg-muted/50">
                <div className="container px-4 md:px-6">
                    <div className="max-w-4xl mx-auto">
                        <MarkdownRenderer
                            content={service.content}
                            className="prose-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-12 lg:py-20">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center text-center space-y-8 max-w-2xl mx-auto">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                {t('servicesCta.title') || 'Ready to Get Started?'}
                            </h2>
                            <p className="text-xl text-muted-foreground">
                                {t('servicesCta.description') || 'Contact us today to learn more about our services and how we can help you.'}
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" asChild>
                                <Link href={`/${locale}/contact`}>
                                    {t('contactUs') || 'Contact Us'}
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <Link href={`/${locale}/services`}>
                                    {t('browseServices') || 'Browse All Services'}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
