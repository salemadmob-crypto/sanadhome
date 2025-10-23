import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { Button } from '@/components/ui/button';
import { getAllSlugs, getMarkdownContent } from '@/lib/markdown';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ArticlePageProps {
    params: Promise<{
        slug: string;
        locale: string;
    }>;
}

// Generate static params for all article pages
export async function generateStaticParams() {
    const locales = ['en', 'ar'];
    const params: { locale: string; slug: string }[] = [];

    locales.forEach(locale => {
        const slugs = getAllSlugs('articles', locale);
        slugs.forEach(slug => {
            params.push({ locale, slug });
        });
    });

    return params;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const { slug, locale } = resolvedParams;

    const article = getMarkdownContent('articles', slug, locale);

    if (!article) {
        return {
            title: 'Article Not Found',
            description: 'The requested article could not be found.',
        };
    }

    const { frontmatter } = article;
    const isArabic = locale === 'ar';
    const siteTitle = isArabic ? 'سند هوم' : 'SanadHome';
    const blogTitle = isArabic ? 'مدونة' : 'Blog';

    return {
        title: `${frontmatter.title} | ${siteTitle} ${blogTitle}`,
        description: frontmatter.description,
        keywords: [
            frontmatter.category || '',
            isArabic ? 'التمريض المنزلي' : 'home nursing',
            isArabic ? 'الرعاية الصحية' : 'healthcare',
            isArabic ? 'الرعاية المنزلية' : 'home care',
            isArabic ? 'الطب المنزلي' : 'home medical care',
            isArabic ? 'سند هوم' : 'SanadHome',
        ].filter(Boolean),
        authors: [{ name: siteTitle }],
        openGraph: {
            title: frontmatter.title,
            description: frontmatter.description,
            type: 'article',
            url: `/${locale}/articles/${slug}`,
            locale: locale,
            siteName: siteTitle,
            ...(frontmatter.image && {
                images: [{
                    url: frontmatter.image,
                    alt: frontmatter.title
                }],
            }),
            ...(frontmatter.date && {
                publishedTime: frontmatter.date,
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
                'ar': `/ar/articles/${slug}`,
                'en': `/en/articles/${slug}`,
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

export default async function ArticlePage({ params }: ArticlePageProps) {
    const resolvedParams = await params;
    const { slug, locale } = resolvedParams;

    const t = await getTranslations({
        locale,
        namespace: 'blog',
    });

    // Get the article content from markdown
    const article = getMarkdownContent('articles', slug, locale);

    if (!article) {
        notFound();
    }

    const formatDate = (dateString: string, locale: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    };

    return (
        <div className="flex flex-col">
            {/* Breadcrumb */}
            <nav className="border-b bg-background">
                <div className="container py-4">
                    <Button variant="ghost" asChild className="mb-2">
                        <Link href={`/${locale}/articles`} className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            {t('backToBlog') || 'Back to Articles'}
                        </Link>
                    </Button>
                </div>
            </nav>

            {/* Article Header */}
            <section className="py-12 lg:py-20">
                <div className="container px-4 md:px-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Article Meta */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                            {article.frontmatter.date && (
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formatDate(article.frontmatter.date, locale)}</span>
                                </div>
                            )}
                            {article.frontmatter.category && (
                                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                                    {article.frontmatter.category}
                                </span>
                            )}
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{t('readTime') || '5 min read'}</span>
                            </div>
                        </div>

                        {/* Article Title */}
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-6">
                            {article.frontmatter.title}
                        </h1>

                        {/* Article Description */}
                        <p className="text-xl text-muted-foreground mb-8">
                            {article.frontmatter.description}
                        </p>

                        {/* Featured Image */}
                        {article.frontmatter.image && (
                            <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-12">
                                <Image
                                    src={article.frontmatter.image}
                                    alt={article.frontmatter.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="pb-12 lg:pb-20">
                <div className="container px-4 md:px-6">
                    <div className="max-w-4xl mx-auto">
                        <MarkdownRenderer
                            content={article.content}
                            className="prose-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-12 lg:py-20 bg-muted/50">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center text-center space-y-8 max-w-2xl mx-auto">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                {t('articleCta.title') || 'Need Professional Care?'}
                            </h2>
                            <p className="text-xl text-muted-foreground">
                                {t('articleCta.description') || 'Contact SanadHome today to learn more about our professional home care services.'}
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
                                    {t('viewServices') || 'View Our Services'}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Articles */}
            <section className="py-12 lg:py-20">
                <div className="container px-4 md:px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-8">
                            {t('relatedArticles') || 'Related Articles'}
                        </h2>
                        <div className="flex justify-center">
                            <Button variant="outline" asChild>
                                <Link href={`/${locale}/articles`}>
                                    {t('viewAllArticles') || 'View All Articles'}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
