import { ArticleCard } from '@/components/ArticleCard';
import { getAllMarkdownContent } from '@/lib/markdown';
import { getTranslations } from 'next-intl/server';

export default async function ArticlesPage({ params }: { params: any }) {
    const locale = params.locale || 'en';
    const t = await getTranslations({
        locale,
        namespace: 'blog',
    });

    // Get all articles from markdown files
    const articles = getAllMarkdownContent('articles', locale);

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="py-20">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center text-center space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                {t('title')}
                            </h1>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                {t('subtitle')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="py-20 bg-muted/50">
                <div className="container px-4 md:px-6">
                    {articles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {articles.map((article) => (
                                <ArticleCard
                                    key={article.slug}
                                    article={article}
                                    locale={locale}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground text-lg">
                                {t('noArticles') || 'No articles available'}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
