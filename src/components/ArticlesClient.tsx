'use client';

import { ArticleCard } from '@/components/ArticleCard';
import { ArticleFilter } from '@/components/ArticleFilter';
import { MarkdownContent } from '@/lib/markdown';
import { useMemo, useState } from 'react';

interface ArticlesClientProps {
    articles: MarkdownContent[];
    locale: string;
    readMoreText: string;
    noArticlesText: string;
}

export function ArticlesClient({ articles, locale, readMoreText, noArticlesText }: ArticlesClientProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // Filter articles based on search term and category
    const filteredArticles = useMemo(() => {
        return articles.filter((article) => {
            const matchesSearch = !searchTerm ||
                article.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.frontmatter.description.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = !selectedCategory ||
                article.frontmatter.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [articles, searchTerm, selectedCategory]);

    return (
        <div className="container px-4 md:px-6 w-full">
            <ArticleFilter
                articles={filteredArticles}
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                onSearchChange={setSearchTerm}
                onCategoryChange={setSelectedCategory}
                locale={locale}
            />

            {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredArticles.map((article) => (
                        <ArticleCard
                            key={article.slug}
                            article={article}
                            locale={locale}
                            readMoreText={readMoreText}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 w-[80vw]">
                    <p className="text-muted-foreground text-lg">
                        {searchTerm || selectedCategory
                            ? (locale === 'ar' ? 'لم يتم العثور على مقالات تطابق البحث' : 'No articles found matching your search')
                            : noArticlesText
                        }
                    </p>
                </div>
            )}
        </div>
    );
}
