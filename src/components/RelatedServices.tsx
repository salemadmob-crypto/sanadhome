import { MarkdownContent } from '@/lib/markdown';
import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

interface RelatedServicesProps {
    services: MarkdownContent[];
    locale: string;
}

export default async function RelatedServices({ services, locale }: RelatedServicesProps) {
    const t = await getTranslations({
        namespace: 'ServicePage',
        locale, // You can set this dynamically based on user preference
    });

    if (services.length === 0) {
        return null;
    }

    return (
        <section className="border-t pt-12 mt-12">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                    {t('relatedServices.title')}
                </h2>
                <p className="text-muted-foreground">
                    {t('relatedServices.description')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <Link
                        key={service.slug}
                        href={`/${locale}/services/${service.slug}`}
                        className="group block bg-card hover:bg-muted/50 rounded-lg border p-6 transition-all duration-200 hover:shadow-lg hover:scale-105"
                    >


                        {service.frontmatter.category && (
                            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mb-3">
                                {service.frontmatter.category}
                            </span>
                        )}

                        <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                            {service.frontmatter.title}
                        </h3>

                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                            {service.frontmatter.description}
                        </p>

                        <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                            {t('relatedServices.readMore')}
                            <ArrowRight className="h-4 w-4 ml-1 rtl:mr-1 rtl:ml-0 rtl:rotate-180" />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
