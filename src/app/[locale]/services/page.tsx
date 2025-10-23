import { ServiceCard } from '@/components/ServiceCard';
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
            title: "خدمات الرعاية الصحية المنزلية - سند هوم",
            description: "اكتشف مجموعة شاملة من خدمات الرعاية الصحية المنزلية المتخصصة. من التمريض المنزلي والعلاج الطبيعي إلى رعاية ما بعد الجراحة وإدارة الأمراض المزمنة.",
            keywords: ["خدمات رعاية منزلية", "تمريض منزلي", "علاج طبيعي منزلي", "رعاية المسنين", "رعاية ما بعد الجراحة", "إدارة الأمراض المزمنة", "رعاية تلطيفية"],
            openGraph: {
                title: "خدمات الرعاية الصحية المنزلية - سند هوم",
                description: "اكتشف مجموعة شاملة من خدمات الرعاية الصحية المنزلية المتخصصة",
                url: 'https://sanadhome.com/ar/services',
                images: [{ url: '/images/services-og-ar.jpg', width: 1200, height: 630 }],
            },
        };
    }

    return {
        title: "Home Healthcare Services - SanadHome",
        description: "Discover our comprehensive range of professional home healthcare services. From home nursing and physical therapy to post-surgical care and chronic disease management.",
        keywords: ["home healthcare services", "home nursing", "home physical therapy", "elderly care", "post-surgical care", "chronic disease management", "palliative care"],
        openGraph: {
            title: "Home Healthcare Services - SanadHome",
            description: "Discover our comprehensive range of professional home healthcare services",
            url: 'https://sanadhome.com/en/services',
            images: [{ url: '/images/services-og-en.jpg', width: 1200, height: 630 }],
        },
    };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
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