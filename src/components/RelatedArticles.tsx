import { MarkdownContent } from '@/lib/markdown';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

interface RelatedArticlesProps {
    articles: MarkdownContent[];
    locale: string;
}

export default async function RelatedArticles({ articles, locale }: RelatedArticlesProps) {
    const t = await getTranslations({
        namespace: 'blog',
        locale, // You can set this dynamically based on user preference
    });

    if (articles.length === 0) {
        return null;
    }

    const formatDate = (dateString: string, currentLocale: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat(currentLocale === 'ar' ? 'ar-EG' : 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }).format(date);
    };

    return (
        <section className="border-t pt-12 mt-12">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                    {t('relatedArticles.title')}
                </h2>
                <p className="text-muted-foreground">
                    {t('relatedArticles.description')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <Link
                        key={article.slug}
                        href={`/${locale}/articles/${article.slug}`}
                        className="group block bg-card hover:bg-muted/50 rounded-lg border overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-105"
                    >
                     

                        <div className="p-6">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                {article.frontmatter.date && (
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        <span>{formatDate(article.frontmatter.date, locale)}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{t('readTime')}</span>
                                </div>
                            </div>

                            {article.frontmatter.category && (
                                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mb-3">
                                    {article.frontmatter.category}
                                </span>
                            )}

                            <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                {article.frontmatter.title}
                            </h3>

                            <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                                {article.frontmatter.description}
                            </p>

                            <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                                {t('relatedArticles.readMore')}
                                <ArrowRight className="h-4 w-4 ml-1 rtl:mr-1 rtl:ml-0 rtl:rotate-180" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
