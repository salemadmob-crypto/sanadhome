import { AnimatedCard, AnimatedCTAButton, AnimatedElement, AnimatedIcon, AnimatedText } from '@/components/AnimatedComponents';
import { ArticleCard } from '@/components/ArticleCard';
import { ServiceCard } from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { getAllMarkdownContent } from '@/lib/markdown';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { ArrowDown, ArrowLeft, ArrowRight, CheckCircle, Clock, Heart, Phone, Shield, Users } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function HomePage({ params }: { params: any }) {
  const locale = params.locale || 'en';
  const t = await getTranslations({
    locale,
    namespace: 'home',
  });

  // Get featured articles (latest 2)
  const articles = getAllMarkdownContent('articles', locale).slice(0, 2);

  // Get featured services (latest 3)
  const services = getAllMarkdownContent('services', locale).slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8">
            <AnimatedElement className="space-y-4">
              <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
              <AnimatedText as="h1" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary">
                {t('title')}
              </AnimatedText>
              <AnimatedText delay={0.3} className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                {t('subtitle')}
              </AnimatedText>
            </AnimatedElement>
            <AnimatedElement delay={0.6} className="flex gap-6">
              <Button asChild size="lg">
                <Link href="/contact">{t('cta')}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">{t('learnMore')}</Link>
              </Button>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <AnimatedElement className="text-center space-y-4 mb-16">
            <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
            <AnimatedText as="h2" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
              {t('features.title')}
            </AnimatedText>
            <AnimatedText delay={0.2} className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {t('description')}
            </AnimatedText>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedCard delay={0.1} className="flex flex-col items-center text-center space-y-4">
              <AnimatedIcon className="p-4 rounded-full bg-primary/10">
                <Heart className="h-8 w-8 text-primary" />
              </AnimatedIcon>
              <h3 className="text-xl font-semibold">{t('features.compassionate.title')}</h3>
              <p className="text-muted-foreground">
                {t('features.compassionate.description')}
              </p>
            </AnimatedCard>

            <AnimatedCard delay={0.2} className="flex flex-col items-center text-center space-y-4">
              <AnimatedIcon className="p-4 rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </AnimatedIcon>
              <h3 className="text-xl font-semibold">{t('features.licensed.title')}</h3>
              <p className="text-muted-foreground">
                {t('features.licensed.description')}
              </p>
            </AnimatedCard>

            <AnimatedCard delay={0.3} className="flex flex-col items-center text-center space-y-4">
              <AnimatedIcon className="p-4 rounded-full bg-primary/10">
                <Clock className="h-8 w-8 text-primary" />
              </AnimatedIcon>
              <h3 className="text-xl font-semibold">{t('features.available.title')}</h3>
              <p className="text-muted-foreground">
                {t('features.available.description')}
              </p>
            </AnimatedCard>

            <AnimatedCard delay={0.4} className="flex flex-col items-center text-center space-y-4">
              <AnimatedIcon className="p-4 rounded-full bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </AnimatedIcon>
              <h3 className="text-xl font-semibold">{t('features.family.title')}</h3>
              <p className="text-muted-foreground">
                {t('features.family.description')}
              </p>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
              {t('howItWorks.title')}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {t('howItWorks.subtitle')}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-4 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-4 flex-1">
              <div className="relative">
                <div className="p-6 rounded-full bg-primary/10 border-2 border-primary/20">
                  <QuestionMarkCircledIcon className="h-8 w-8 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold">{t('howItWorks.step1.title')}</h3>
              <p className="text-muted-foreground">
                {t('howItWorks.step1.description')}
              </p>
            </div>

            {/* Arrow 1 */}
            <div className="flex-none self-center pt-10 transform md:rotate-0 ">
              <ArrowDown className=" md:hidden h-8 w-8 text-primary/60" />
              <ArrowRight className=" hidden md:block rtl:hidden h-8 w-8 text-primary/60" />
              <ArrowLeft className=" hidden md:block ltr:hidden h-8 w-8 text-primary/60" />
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-4 flex-1">
              <div className="relative">
                <div className="p-6 rounded-full bg-primary/10 border-2 border-primary/20">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold">{t('howItWorks.step2.title')}</h3>
              <p className="text-muted-foreground">
                {t('howItWorks.step2.description')}
              </p>
            </div>

            {/* Arrow 2 */}
            <div className="flex-none self-center pt-10 transform md:rotate-0 ">
              <ArrowDown className=" md:hidden h-8 w-8 text-primary/60" />
              <ArrowRight className=" hidden md:block rtl:hidden h-8 w-8 text-primary/60" />
              <ArrowLeft className=" hidden md:block ltr:hidden h-8 w-8 text-primary/60" />
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-4 flex-1">
              <div className="relative">
                <div className="p-6 rounded-full bg-primary/10 border-2 border-primary/20">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold">{t('howItWorks.step3.title')}</h3>
              <p className="text-muted-foreground">
                {t('howItWorks.step3.description')}
              </p>
            </div>

            {/* Arrow 3 */}
            <div className="flex-none self-center pt-10 transform md:rotate-0 ">
              <ArrowDown className=" md:hidden h-8 w-8 text-primary/60" />
              <ArrowRight className="hidden md:block rtl:hidden h-8 w-8 text-primary/60" />
              <ArrowLeft className="hidden md:block ltr:hidden h-8 w-8 text-primary/60" />
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center space-y-4 flex-1">
              <div className="relative">
                <div className="p-6 rounded-full bg-primary/10 border-2 border-primary/20">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  4
                </div>
              </div>
              <h3 className="text-xl font-semibold">{t('howItWorks.step4.title')}</h3>
              <p className="text-muted-foreground">
                {t('howItWorks.step4.description')}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <AnimatedElement className="text-center space-y-4 mb-16">
            <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
            <AnimatedText as="h2" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
              {t('services.title')}
            </AnimatedText>
            <AnimatedText delay={0.2} className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {t('services.subtitle')}
            </AnimatedText>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedCard key={service.slug} delay={0.1 * index}>
                <ServiceCard service={service} locale={locale} />
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <AnimatedElement className="text-center space-y-4 mb-16">
            <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
            <AnimatedText as="h2" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
              {t('featuredServices.title')}
            </AnimatedText>
            <AnimatedText delay={0.2} className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {t('featuredServices.subtitle')}
            </AnimatedText>
          </AnimatedElement>

          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {services.map((service, index) => (
                <AnimatedCard key={service.slug} delay={0.1 * index}>
                  <ServiceCard
                    service={service}
                    locale={locale}
                    learnMoreText={t('learnMore')}
                  />
                </AnimatedCard>
              ))}
            </div>
          ) : null}

          <AnimatedElement delay={0.4} className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href={`/${locale}/services`}>{t('viewAllServices')}</Link>
            </Button>
          </AnimatedElement>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <AnimatedElement className="text-center space-y-4 mb-16">
            <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
            <AnimatedText as="h2" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
              {t('featuredArticles.title')}
            </AnimatedText>
            <AnimatedText delay={0.2} className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {t('featuredArticles.subtitle')}
            </AnimatedText>
          </AnimatedElement>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {articles.map((article, index) => (
                <AnimatedCard key={article.slug} delay={0.1 * index}>
                  <ArticleCard
                    article={article}
                    locale={locale}
                    readMoreText={t('readMore')}
                  />
                </AnimatedCard>
              ))}
            </div>
          ) : null}

          <AnimatedElement delay={0.3} className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href={`/${locale}/articles`}>{t('viewAllArticles')}</Link>
            </Button>
          </AnimatedElement>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8">
            <AnimatedElement className="space-y-4">
              <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
              <AnimatedText as="h2" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                {t('ctaSection.title')}
              </AnimatedText>
              <AnimatedText delay={0.2} className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                {t('ctaSection.description')}
              </AnimatedText>
            </AnimatedElement>
            <AnimatedElement delay={0.4} direction="right">
              <AnimatedCTAButton>
                <Button size="lg" asChild>
                  <Link href="/contact">{t('cta')}</Link>
                </Button>
              </AnimatedCTAButton>
            </AnimatedElement>
          </div>
        </div>
      </section>
    </div>
  );
}
