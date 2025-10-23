import { ServiceCard } from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { getAllMarkdownContent } from '@/lib/markdown';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function ServicesPage({ params }: { params: any }) {
    const locale = params.locale || 'en';
    const t = await getTranslations({
        locale,
        namespace: 'services',
    });

    // Get all services from markdown files
    const services = getAllMarkdownContent('services', locale);

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

            {/* Services Grid */}
            <section className="py-20 bg-muted/50">
                <div className="container px-4 md:px-6">
                    {services.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service) => (
                                <ServiceCard
                                    key={service.slug}
                                    service={service}
                                    locale={locale}
                                    learnMoreText={t('learnMore')}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground text-lg">
                                {t('noServices') || 'No services available'}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center text-center space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
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
