import { getTranslations } from 'next-intl/server';

export default async function PrivacyPolicyPage({ params }: { params: any }) {
  const t = await getTranslations({
    locale: params.locale || 'en',
    namespace: 'privacyPolicy',
  });

  return (
    <div className="flex flex-col">
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t('title')}
                </h1>
                <p className="text-muted-foreground">{t('lastUpdated')}</p>
              </div>

              <div className="space-y-8 text-sm leading-relaxed">
                {Array.from({ length: 6 }, (_, index) => (
                  <section key={index}>
                    <h2 className="text-xl font-semibold mb-4">{t(`sections.${index}.title`)}</h2>
                    <p className="mb-4">
                      {t(`sections.${index}.content`)}
                    </p>
                    {index < 3 && (
                      <ul className="list-disc pl-6 space-y-2">
                        {Array.from({ length: index === 0 ? 4 : index === 1 ? 5 : 4 }, (_, itemIndex) => (
                          <li key={itemIndex}>{t(`sections.${index}.items.${itemIndex}`)}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
