import { Button } from '@/components/ui/button';
import { MarkdownContent } from '@/lib/markdown';
import { Filter, Search } from 'lucide-react';
import { Input } from './ui/input';

interface ArticleFilterProps {
    articles: MarkdownContent[];
    searchTerm: string;
    selectedCategory: string;
    onSearchChange: (term: string) => void;
    onCategoryChange: (category: string) => void;
    locale: string;
}

export function ArticleFilter({
    articles,
    searchTerm,
    selectedCategory,
    onSearchChange,
    onCategoryChange,
    locale
}: ArticleFilterProps) {
    // Get unique categories from articles
    const categories = Array.from(new Set(
        articles
            .map(article => article.frontmatter.category)
            .filter(Boolean)
    ));

    const placeholderText = locale === 'ar' ? 'البحث في المقالات...' : 'Search articles...';
    const allCategoriesText = locale === 'ar' ? 'جميع التصنيفات' : 'All Categories';
    const filterText = locale === 'ar' ? 'فلتر' : 'Filter';

    return (
        <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        type="text"
                        placeholder={placeholderText}
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Category Filter */}
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <select
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className="px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                        <option value="">{allCategoriesText}</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Clear Filters */}
                {(searchTerm || selectedCategory) && (
                    <Button
                        variant="outline"
                        onClick={() => {
                            onSearchChange('');
                            onCategoryChange('');
                        }}
                        className="shrink-0"
                    >
                        {locale === 'ar' ? 'مسح الفلاتر' : 'Clear Filters'}
                    </Button>
                )}
            </div>

            {/* Results Summary */}
            <div className="text-sm text-muted-foreground">
                {locale === 'ar'
                    ? `عرض ${articles.length} مقال${articles.length !== 1 ? 'ة' : ''}`
                    : `Showing ${articles.length} article${articles.length !== 1 ? 's' : ''}`
                }
            </div>
        </div>
    );
}
