import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export interface Frontmatter {
    title: string;
    description: string;
    image?: string;
    date?: string;
    category?: string;
    featured?: boolean;
}

export interface MarkdownContent {
    slug: string;
    frontmatter: Frontmatter;
    content: string;
}

const contentDirectory = path.join(process.cwd(), 'content');

export function getMarkdownContent(
    type: 'services' | 'articles',
    slug: string,
    locale: string = 'en'
): MarkdownContent | null {
    try {
        const filePath = path.join(contentDirectory, type, locale, `${slug}.md`);

        if (!fs.existsSync(filePath)) {
            return null;
        }

        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        // Ensure essential frontmatter fields exist to prevent errors
        if (!data.title || !data.description) {
            // This will skip files with missing title or description
            return null;
        }

        return {
            slug,
            frontmatter: data as Frontmatter,
            content,
        };
    } catch (error) {
        console.error(`Error reading markdown file: ${type}/${locale}/${slug}.md`, error);
        return null;
    }
}

export function getAllMarkdownContent(
    type: 'services' | 'articles',
    locale: string = 'en'
): MarkdownContent[] {
    try {
        const contentPath = path.join(contentDirectory, type, locale);

        if (!fs.existsSync(contentPath)) {
            return [];
        }

        const files = fs.readdirSync(contentPath);
        const markdownFiles = files.filter(file => file.endsWith('.md'));

        return markdownFiles
            .map(file => {
                const slug = file.replace(/\.md$/, '');
                return getMarkdownContent(type, slug, locale);
            })
            .filter((content): content is MarkdownContent => content !== null)
            .sort((a, b) => {
                // Sort by date if available, otherwise by title
                if (a.frontmatter.date && b.frontmatter.date) {
                    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
                }
                // Safely compare titles to avoid errors with missing values
                const titleA = a.frontmatter.title || '';
                const titleB = b.frontmatter.title || '';
                return titleA.localeCompare(titleB);
            });
    } catch (error) {
        console.error(`Error reading markdown directory: ${type}/${locale}`, error);
        return [];
    }
}

export function getAllSlugs(
    type: 'services' | 'articles',
    locale: string = 'en'
): string[] {
    try {
        const contentPath = path.join(contentDirectory, type, locale);

        if (!fs.existsSync(contentPath)) {
            return [];
        }

        const files = fs.readdirSync(contentPath);
        return files
            .filter(file => file.endsWith('.md'))
            .map(file => file.replace(/\.md$/, ''));
    } catch (error) {
        console.error(`Error reading slugs: ${type}/${locale}`, error);
        return [];
    }
}

export function generateStaticParams(
    type: 'services' | 'articles',
    locales: string[] = ['en', 'ar']
): { locale: string; slug: string }[] {
    const params: { locale: string; slug: string }[] = [];

    locales.forEach(locale => {
        const slugs = getAllSlugs(type, locale);
        slugs.forEach(slug => {
            params.push({ locale, slug });
        });
    });

    return params;
}

export function getRelatedContent(
    type: 'services' | 'articles',
    currentSlug: string,
    locale: string = 'en',
    limit: number = 3
): MarkdownContent[] {
    try {
        const allContent = getAllMarkdownContent(type, locale);

        // Filter out the current content
        const otherContent = allContent.filter(content => content.slug !== currentSlug);

        // Shuffle the array to get random selection
        const shuffled = [...otherContent].sort(() => 0.5 - Math.random());

        // Return limited number of items
        return shuffled.slice(0, limit);
    } catch (error) {
        console.error(`Error getting related content: ${type}/${locale}`, error);
        return [];
    }
}

export function getRelatedContentByCategory(
    type: 'services' | 'articles',
    currentSlug: string,
    category: string,
    locale: string = 'en',
    limit: number = 3
): MarkdownContent[] {
    try {
        const allContent = getAllMarkdownContent(type, locale);

        // Filter by category and exclude current content
        const relatedContent = allContent.filter(content =>
            content.slug !== currentSlug &&
            content.frontmatter.category === category
        );

        // If we don't have enough related content in the same category,
        // fill with other content
        if (relatedContent.length < limit) {
            const otherContent = allContent.filter(content =>
                content.slug !== currentSlug &&
                content.frontmatter.category !== category
            );

            // Shuffle and add to fill the limit
            const shuffledOther = [...otherContent].sort(() => 0.5 - Math.random());
            relatedContent.push(...shuffledOther.slice(0, limit - relatedContent.length));
        }

        return relatedContent.slice(0, limit);
    } catch (error) {
        console.error(`Error getting related content by category: ${type}/${locale}`, error);
        return [];
    }
}
