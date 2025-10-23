import { ArticlesClient } from '@/components/ArticlesClient';
import { Button } from '@/components/ui/button';
import { getAllMarkdownContent } from '@/lib/markdown';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === 'ar') {
    return {
      title: "مقالات الرعاية الصحية - سند هوم",
      description: "اكتشف أحدث المقالات والنصائح من خبرائنا في مجال الرعاية الصحية المنزلية. مقالات تثقيفية حول رعاية المرضى، إدارة الأدوية، والوقاية من المضاعفات.",
      keywords: ["مقالات طبية", "رعاية المرضى", "نصائح صحية", "تثقيف صحي", "رعاية منزلية", "إدارة الأدوية", "الوقاية من السقوط"],
      openGraph: {
        title: "مقالات الرعاية الصحية - سند هوم",
        description: "اكتشف أحدث المقالات والنصائح من خبرائنا في مجال الرعاية الصحية المنزلية",
        url: 'https://sanadhome.com/ar/articles',
        images: [{ url: '/images/articles-og-ar.jpg', width: 1200, height: 630 }],
      },
    };
  }

  return {
    title: "Healthcare Articles - SanadHome",
    description: "Discover the latest articles and expert advice on home healthcare. Educational content about patient care, medication management, and preventing complications.",
    keywords: ["medical articles", "patient care", "health tips", "health education", "home care", "medication management", "fall prevention"],
    openGraph: {
      title: "Healthcare Articles - SanadHome",
      description: "Discover the latest articles and expert advice on home healthcare",
      url: 'https://sanadhome.com/en/articles',
      images: [{ url: '/images/articles-og-en.jpg', width: 1200, height: 630 }],
    },
  };
}

export default async function ArticlesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
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
              <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary">
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
        <ArticlesClient
          articles={articles}
          locale={locale}
          readMoreText={t('readMore')}
          noArticlesText={t('noArticles') || 'No articles available'}
        />
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-4">
              <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                {t('cta.title')}
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                {t('cta.description')}
              </p>
            </div>
            <Button size="lg" asChild>
              <Link href={`/${locale}/contact`}>{t('cta.button')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
