import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MarkdownContent } from '@/lib/markdown';
import { ArrowRight, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ArticleCardProps {
    article: MarkdownContent;
    locale: string;
    readMoreText?: string;
}

export function ArticleCard({ article, locale, readMoreText = 'Read More' }: ArticleCardProps) {
    const formatDate = (dateString: string, locale: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    };

    return (
        <Card className="h-full group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-4">
                {article.frontmatter.image ? (
                    <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                        <Image
                            src={article.frontmatter.image}
                            alt={article.frontmatter.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-center w-full h-48 mb-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
                        <div className="text-primary/20 text-6xl font-bold">
                            {article.frontmatter.title.charAt(0)}
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    {article.frontmatter.date && (
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 icon-themed" />
                            <span>{formatDate(article.frontmatter.date, locale)}</span>
                        </div>
                    )}
                    {article.frontmatter.category && (
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                            {article.frontmatter.category}
                        </span>
                    )}
                </div>

                <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                    {article.frontmatter.title}
                </CardTitle>
            </CardHeader>

            <CardContent className="pb-4">
                <CardDescription className="text-base leading-relaxed line-clamp-3">
                    {article.frontmatter.description}
                </CardDescription>
            </CardContent>

            <CardFooter className="pt-0">
                <Button asChild variant="outline" className="w-full group/button">
                    <Link href={`/${locale}/articles/${article.slug}`}>
                        {readMoreText}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
