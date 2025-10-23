import { AnimatedCard, AnimatedCTAButton, AnimatedElement, AnimatedIcon, AnimatedText } from '@/components/AnimatedComponents';
import { StatCounter } from '@/components/Counter';
import Icon from '@/components/Icon';
import TestimonialsCarousel from '@/components/TestimonialsCarousel-fixed';
import { Button } from '@/components/ui/button';
import { Award, Heart, Target, TrendingUp, Users2 } from 'lucide-react';
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
      title: "عن سند هوم - مؤسسة الرعاية الصحية المنزلية",
      description: "تعرف على سند هوم، المؤسسة الرائدة في تقديم خدمات الرعاية الصحية المنزلية المتخصصة. مهمتنا، رؤيتنا، وقيمنا في خدمة المرضى وأسرهم.",
      keywords: ["عن سند هوم", "مؤسسة رعاية صحية", "فريق طبي", "رؤية ورسالة", "قيم المؤسسة", "خبرة طبية"],
      openGraph: {
        title: "عن سند هوم - مؤسسة الرعاية الصحية المنزلية",
        description: "تعرف على سند هوم، المؤسسة الرائدة في تقديم خدمات الرعاية الصحية المنزلية المتخصصة",
        url: 'https://sanadhome.com/ar/about',
        images: [{ url: '/images/about-og-ar.jpg', width: 1200, height: 630 }],
      },
    };
  }

  return {
    title: "About SanadHome - Leading Home Healthcare Provider",
    description: "Learn about SanadHome, the leading provider of professional home healthcare services. Our mission, vision, and values in serving patients and their families.",
    keywords: ["about SanadHome", "healthcare institution", "medical team", "vision and mission", "company values", "medical expertise"],
    openGraph: {
      title: "About SanadHome - Leading Home Healthcare Provider",
      description: "Learn about SanadHome, the leading provider of professional home healthcare services",
      url: 'https://sanadhome.com/en/about',
      images: [{ url: '/images/about-og-en.jpg', width: 1200, height: 630 }],
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'about',
  });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="flex justify-around md:flex-row flex-col p-4 items-center text-center space-y-8">
            <AnimatedElement direction="left" className='w-40 md:w-80'>
              <Icon />
            </AnimatedElement>
            <AnimatedElement delay={0.3} direction="right" className="space-y-4">
              <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
              <AnimatedText as="h1" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                {t('title')}
              </AnimatedText>
              <AnimatedText delay={0.2} className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                {t('description')}
              </AnimatedText>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedCard delay={0.2} className="space-y-6">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <AnimatedIcon className="h-8 w-8 text-primary">
                  <Target />
                </AnimatedIcon>
                <AnimatedText as="h2" className="text-2xl font-bold">{t('mission')}</AnimatedText>
              </div>
              <AnimatedText delay={0.1} className="text-muted-foreground text-lg">
                {t('missionText')}
              </AnimatedText>
            </AnimatedCard>

            <AnimatedCard delay={0.4} className="space-y-6">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <AnimatedIcon delay={0.1} className="h-8 w-8 text-primary">
                  <Heart />
                </AnimatedIcon>
                <AnimatedText delay={0.1} as="h2" className="text-2xl font-bold">{t('vision')}</AnimatedText>
              </div>
              <AnimatedText delay={0.2} className="text-muted-foreground text-lg">
                {t('visionText')}
              </AnimatedText>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t('values.title')}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {t('values.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto p-4 rounded-full bg-primary/10 w-fit">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">{t('values.compassion.title')}</h3>
              <p className="text-muted-foreground">
                {t('values.compassion.description')}
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto p-4 rounded-full bg-primary/10 w-fit">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">{t('values.excellence.title')}</h3>
              <p className="text-muted-foreground">
                {t('values.excellence.description')}
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto p-4 rounded-full bg-primary/10 w-fit">
                <Users2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">{t('values.integrity.title')}</h3>
              <p className="text-muted-foreground">
                {t('values.integrity.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <AnimatedElement className="text-center space-y-4 mb-16">
            <AnimatedText as="h2" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t('goals.title')}
            </AnimatedText>
            <AnimatedText delay={0.2} className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {t('goals.subtitle')}
            </AnimatedText>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedCard delay={0.1} className="text-center space-y-4">
              <AnimatedIcon delay={0.2} className="mx-auto p-4 rounded-full bg-primary/10 w-fit">
                <Heart className="h-8 w-8 text-primary" />
              </AnimatedIcon>
              <AnimatedText as="h3" delay={0.3} className="text-xl font-semibold">{t('goals.patientCare.title')}</AnimatedText>
              <AnimatedText delay={0.4} className="text-muted-foreground">
                {t('goals.patientCare.description')}
              </AnimatedText>
            </AnimatedCard>

            <AnimatedCard delay={0.2} className="text-center space-y-4">
              <AnimatedIcon delay={0.3} className="mx-auto p-4 rounded-full bg-primary/10 w-fit">
                <Award className="h-8 w-8 text-primary" />
              </AnimatedIcon>
              <AnimatedText as="h3" delay={0.4} className="text-xl font-semibold">{t('goals.qualityStandards.title')}</AnimatedText>
              <AnimatedText delay={0.5} className="text-muted-foreground">
                {t('goals.qualityStandards.description')}
              </AnimatedText>
            </AnimatedCard>

            <AnimatedCard delay={0.3} className="text-center space-y-4">
              <AnimatedIcon delay={0.4} className="mx-auto p-4 rounded-full bg-primary/10 w-fit">
                <TrendingUp className="h-8 w-8 text-primary" />
              </AnimatedIcon>
              <AnimatedText as="h3" delay={0.5} className="text-xl font-semibold">{t('goals.innovation.title')}</AnimatedText>
              <AnimatedText delay={0.6} className="text-muted-foreground">
                {t('goals.innovation.description')}
              </AnimatedText>
            </AnimatedCard>

            <AnimatedCard delay={0.4} className="text-center space-y-4">
              <AnimatedIcon delay={0.5} className="mx-auto p-4 rounded-full bg-primary/10 w-fit">
                <Users2 className="h-8 w-8 text-primary" />
              </AnimatedIcon>
              <AnimatedText as="h3" delay={0.6} className="text-xl font-semibold">{t('goals.community.title')}</AnimatedText>
              <AnimatedText delay={0.7} className="text-muted-foreground">
                {t('goals.community.description')}
              </AnimatedText>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <AnimatedElement className="text-center space-y-4 mb-16">
            <AnimatedText as="h2" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t('statistics.title')}
            </AnimatedText>
            <AnimatedText delay={0.2} className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {t('statistics.subtitle')}
            </AnimatedText>
          </AnimatedElement>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedCard delay={0.1} className="text-center space-y-3 p-6 rounded-lg bg-primary/5 border">
              <StatCounter
                value={t('statistics.patientsServed.number')}
                delay={0.2}
                className="text-3xl md:text-4xl font-bold text-primary"
              />
              <AnimatedText delay={0.3} className="text-muted-foreground font-medium text-sm">
                {t('statistics.patientsServed.label')}
              </AnimatedText>
            </AnimatedCard>

            <AnimatedCard delay={0.2} className="text-center space-y-3 p-6 rounded-lg bg-primary/5 border">
              <StatCounter
                value={t('statistics.yearsExperience.number')}
                delay={0.3}
                className="text-3xl md:text-4xl font-bold text-primary"
              />
              <AnimatedText delay={0.4} className="text-muted-foreground font-medium text-sm">
                {t('statistics.yearsExperience.label')}
              </AnimatedText>
            </AnimatedCard>

            <AnimatedCard delay={0.3} className="text-center space-y-3 p-6 rounded-lg bg-primary/5 border">
              <StatCounter
                value={t('statistics.satisfactionRate.number')}
                delay={0.4}
                className="text-3xl md:text-4xl font-bold text-primary"
              />
              <AnimatedText delay={0.5} className="text-muted-foreground font-medium text-sm">
                {t('statistics.satisfactionRate.label')}
              </AnimatedText>
            </AnimatedCard>

            <AnimatedCard delay={0.4} className="text-center space-y-3 p-6 rounded-lg bg-primary/5 border">
              <StatCounter
                value={t('statistics.services.number')}
                delay={0.5}
                className="text-3xl md:text-4xl font-bold text-primary"
              />
              <AnimatedText delay={0.6} className="text-muted-foreground font-medium text-sm">
                {t('statistics.services.label')}
              </AnimatedText>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <AnimatedElement className="text-center space-y-4 mb-16">
            <AnimatedText as="h2" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t('testimonials.title')}
            </AnimatedText>
            <AnimatedText delay={0.2} className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {t('testimonials.subtitle')}
            </AnimatedText>
          </AnimatedElement>

          <AnimatedElement delay={0.3}>
            <TestimonialsCarousel />
          </AnimatedElement>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8">
            <AnimatedElement className="space-y-4">
              <AnimatedText as="h2" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {t('cta.title')}
              </AnimatedText>
              <AnimatedText delay={0.2} className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                {t('cta.description')}
              </AnimatedText>
            </AnimatedElement>
            <AnimatedElement delay={0.4}>
              <AnimatedCTAButton>
                <Button size="lg" asChild>
                  <Link href="/contact">{t('cta.button')}</Link>
                </Button>
              </AnimatedCTAButton>
            </AnimatedElement>
          </div>
        </div>
      </section>

    </div>
  );
}
