import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function FAQPage({ params }: { params: any }) {
  const t = await getTranslations({
    locale: params.locale || 'en',
    namespace: 'faq',
  });

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

      {/* FAQ Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="bg-background rounded-lg border">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold">{t(`questions.${index}.question`)}</h3>
                    <Plus className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-45" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground">{t(`questions.${index}.answer`)}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
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
              <Link href="/contact">{t('cta.button')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
