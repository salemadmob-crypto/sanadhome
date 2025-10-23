import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MarkdownContent } from '@/lib/markdown';
import { ArrowRight, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ServiceCardProps {
    service: MarkdownContent;
    locale: string;
    learnMoreText?: string;
}

const serviceIcons: Record<string, React.ComponentType<any>> = {
    'nursing-care': Heart,
    'physical-therapy': Heart,
    'palliative-care': Heart,
    'post-surgical-care': Heart,
    'chronic-disease-management': Heart,
    'elderly-care': Heart,
};

export function ServiceCard({ service, locale, learnMoreText = 'Learn More' }: ServiceCardProps) {
    const Icon = serviceIcons[service.slug] || Heart;

    return (
        <Card className="h-full group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-4">
                {service.frontmatter.image ? (
                    <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                        <Image
                            src={service.frontmatter.image}
                            alt={service.frontmatter.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-center w-full h-48 mb-4 rounded-lg bg-primary/10">
                        <Icon className="h-16 w-16 icon-themed" />
                    </div>
                )}
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {service.frontmatter.title}
                </CardTitle>
            </CardHeader>

            <CardContent className="pb-4">
                <CardDescription className="text-base leading-relaxed">
                    {service.frontmatter.description}
                </CardDescription>

                {service.frontmatter.category && (
                    <div className="mt-4">
                        <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                            {service.frontmatter.category}
                        </span>
                    </div>
                )}
            </CardContent>

            <CardFooter className="pt-0">
                <Button asChild className="w-full group/button">
                    <Link href={`/${locale}/services/${service.slug}`}>
                        {learnMoreText}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
