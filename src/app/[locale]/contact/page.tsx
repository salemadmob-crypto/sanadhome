import { AnimatedCard, AnimatedElement, AnimatedText } from '@/components/AnimatedComponents';
import { ContactForm } from '@/components/ContactForm';
import { getAllMarkdownContent } from '@/lib/markdown';
import { Clock, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
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
      title: "تواصل معنا - سند هوم للرعاية المنزلية",
      description: "تواصل مع فريق سند هوم المتخصص في الرعاية الصحية المنزلية. نحن متاحون على مدار الساعة لتقديم الاستشارات وحجز خدمات الرعاية المنزلية.",
      keywords: ["تواصل معنا", "حجز خدمة", "استشارة طبية", "رعاية منزلية", "خدمة عملاء", "رقم هاتف", "عنوان"],
      openGraph: {
        title: "تواصل معنا - سند هوم للرعاية المنزلية",
        description: "تواصل مع فريق سند هوم المتخصص في الرعاية الصحية المنزلية",
        url: 'https://sanadhome.com/ar/contact',
        images: [{ url: '/images/contact-og-ar.jpg', width: 1200, height: 630 }],
      },
    };
  }

  return {
    title: "Contact Us - SanadHome Healthcare",
    description: "Get in touch with SanadHome's professional home healthcare team. We're available 24/7 to provide consultations and book home care services.",
    keywords: ["contact us", "book service", "medical consultation", "home care", "customer service", "phone number", "address"],
    openGraph: {
      title: "Contact Us - SanadHome Healthcare",
      description: "Get in touch with SanadHome's professional home healthcare team",
      url: 'https://sanadhome.com/en/contact',
      images: [{ url: '/images/contact-og-en.jpg', width: 1200, height: 630 }],
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'contact',
  });

  // Get all services for the contact form
  const services = getAllMarkdownContent('services', locale);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8">
            <AnimatedElement className="space-y-4">
              <AnimatedText as="h1" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary-custom">
                {t('title')}
              </AnimatedText>
              <AnimatedText delay={0.2} className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                {t('subtitle')}
              </AnimatedText>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <AnimatedElement delay={0.2} direction="left" className="space-y-8">
              <AnimatedText as="h2" className="text-2xl font-bold">{t('getInTouch')}</AnimatedText>

              <div className="space-y-6">
                <AnimatedCard delay={0.3}>
                  <Link href={'tel:+201221887357'} className="flex items-center space-x-4 rtl:space-x-reverse hover:text-primary transition-colors hover:bg-primary/10 p-4 rounded-lg">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Phone className="h-6 w-6 text-primary-custom" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{t('phoneLabel')}</h3>
                      <p dir='ltr' className="text-muted-foreground">+20 122 1887357</p>
                    </div>
                  </Link>
                </AnimatedCard>

                <AnimatedCard delay={0.4}>
                  <Link href={'mailto:info@sanadhome.com'} className="flex items-center space-x-4 rtl:space-x-reverse hover:text-primary transition-colors hover:bg-primary/10 p-4 rounded-lg">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Mail className="h-6 w-6 text-primary-custom" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{t('email')}</h3>
                      <p className="text-muted-foreground">info@sanadHome.com</p>
                    </div>
                  </Link>
                </AnimatedCard>

                <AnimatedCard delay={0.5}>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse p-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary-custom" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{t('address')}</h3>
                      <p className="text-muted-foreground">التجمع الخامس، القاهرة، مصر</p>
                    </div>
                  </div>
                </AnimatedCard>

                <AnimatedCard delay={0.6}>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse p-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Clock className="h-6 w-6 text-primary-custom" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{t('hours')}</h3>
                      <p className="text-muted-foreground">{t('hoursValue')}</p>
                    </div>
                  </div>
                </AnimatedCard>
              </div>

              {/* Social Media Section */}
              <AnimatedElement delay={0.7} className="space-y-6 pt-8 border-t">
                <AnimatedText as="h3" className="text-xl font-semibold">{t('followUs')}</AnimatedText>
                <div className="flex flex-col space-y-4">
                  <AnimatedCard delay={0.8}>
                    <Link
                      href="https://facebook.com/sanadhomecare"
                      target="_blank"
                      className="flex items-center space-x-4 rtl:space-x-reverse group hover:text-primary transition-colors"
                    >
                      <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Facebook className="h-6 w-6 text-primary-custom" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Facebook</h4>
                        <p className="text-muted-foreground">/sanadhomecare</p>
                      </div>
                    </Link>
                  </AnimatedCard>

                  <AnimatedCard delay={0.9}>
                    <Link
                      href="https://instagram.com/sanadhomecare"
                      target="_blank"
                      className="flex items-center space-x-4 rtl:space-x-reverse group hover:text-primary transition-colors"
                    >
                      <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Instagram className="h-6 w-6 text-primary-custom" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Instagram</h4>
                        <p className="text-muted-foreground">@sanadhomecare</p>
                      </div>
                    </Link>
                  </AnimatedCard>

                  <AnimatedCard delay={1.0}>
                    <Link
                      href="https://wa.me/201221887357"
                      target="_blank"
                      className="flex items-center space-x-4 rtl:space-x-reverse group hover:text-primary transition-colors"
                    >
                      <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <MessageCircle className="h-6 w-6 text-primary-custom" />
                      </div>
                      <div>
                        <h4 className="font-semibold">WhatsApp</h4>
                        <p className="text-muted-foreground">+20 122 1887357</p>
                      </div>
                    </Link>
                  </AnimatedCard>
                </div>
              </AnimatedElement>
            </AnimatedElement>

            {/* Contact Form */}
            <AnimatedElement delay={0.3} direction="right" className="bg-background rounded-lg p-8">
              <ContactForm locale={locale} services={services} />
            </AnimatedElement>
          </div>
        </div>
      </section>
    </div>
  );
}
