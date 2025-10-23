import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import RelatedArticles from '@/components/RelatedArticles';
import ShareButtons from '@/components/shareButtons';
import { TableOfContents } from '@/components/TableOfContents';
import { Button } from '@/components/ui/button';
import { getAllSlugs, getMarkdownContent, getRelatedContentByCategory } from '@/lib/markdown';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ArticlePageProps {
  params: any
}

// Generate static paths for all services
export async function generateStaticParams({ params: { locale } }: { params: { locale: string } }) {
  const slugs = getAllSlugs('articles', locale);
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params: { slug, locale } }: ArticlePageProps): Promise<Metadata> {
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

export default async function ArticlePage({ params: { slug, locale } }: ArticlePageProps) {
  const t = await getTranslations({ locale, namespace: 'blog' });
  const article = getMarkdownContent('articles', decodeURIComponent(slug), locale);

  if (!article) {
    notFound();
  }

  const { frontmatter, content } = article;

  // Get related articles
  const relatedArticles = getRelatedContentByCategory(
    'articles',
    slug,
    frontmatter.category || '',
    locale,
    3
  );

  const formatDate = (dateString: string, currentLocale: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(currentLocale === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
        {/* Main Content */}
        <main className="md:col-span-8">
          <article>
            <header className="mb-10">
              <Button variant="ghost" asChild className="mb-6 -ml-4">
                <Link href={`/${locale}/articles`}>
                  <ArrowLeft className="h-4 w-4 rtl:rotate-180 ltr:mr-2 rtl:ml-2" />
                  {t('backToBlog')}
                </Link>
              </Button>

              {frontmatter.image && (
                <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={frontmatter.image}
                    alt={frontmatter.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
                {frontmatter.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground mb-6">
                {frontmatter.date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>{formatDate(frontmatter.date, locale)}</span>
                  </div>
                )}
                {frontmatter.category && (
                  <div className="flex items-center gap-2">
                    <span className="bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200 px-3 py-1 rounded-full text-sm font-medium">
                      {frontmatter.category}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{t('readTime')}</span>
                </div>
                <div>
                  <ShareButtons title={frontmatter.title} />
                </div>
              </div>

              <p className="text-lg md:text-xl text-muted-foreground">
                {frontmatter.description}
              </p>
            </header>

            <MarkdownRenderer content={content} />
          </article>
        </main>

        {/* Sidebar */}
        <aside className="md:col-span-4">
          <div className="sticky top-24">
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">{t('tableOfContents')}</h3>
              <TableOfContents content={content} />
            </div>
            <div className="bg-muted/50 dark:bg-muted/20 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">{t('articleCta.title')}</h3>
              <p className="text-muted-foreground mb-6">
                {t('articleCta.description')}
              </p>
              <Button size="lg" className="w-full" asChild>
                <Link href={`/${locale}/contact`}>{t('cta.button')}</Link>
              </Button>
            </div>
          </div>
        </aside>
      </div>

      {/* Related Articles Section */}
      <RelatedArticles articles={relatedArticles} locale={locale} />
    </div>
  );
}
