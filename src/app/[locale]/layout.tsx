import { Analytics } from '@vercel/analytics/next';


import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Cairo } from "next/font/google";
import { notFound } from 'next/navigation';
import "../globals.css";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { locales } from '@/i18n/config';
import FloatingWhatsButton from "@/components/FloatingWhatsButton";

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: "--font-cairo",
});

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === 'ar') {
    return {
      title: "سند هوم - رعاية تمريضية منزلية متخصصة",
      description: "نقدم خدمات رعاية تمريضية منزلية متخصصة ومليئة بالرحمة في راحة منزلكم مع متخصصين في الرعاية الصحية مؤهلين ومكرسين لرفاهيتكم.",
      keywords: ["رعاية منزلية", "تمريض منزلي", "رعاية المسنين", "رعاية طبية", "ممرضة منزلية", "رعاية صحية", "العلاج الطبيعي", "رعاية ما بعد الجراحة"],
      authors: [{ name: "سند هوم" }],
      creator: "سند هوم",
      publisher: "سند هوم",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      openGraph: {
        type: 'website',
        locale: 'ar_SA',
        alternateLocale: 'en_US',
        url: 'https://sanadhome.com/ar',
        siteName: 'سند هوم',
        title: 'سند هوم - رعاية تمريضية منزلية متخصصة',
        description: 'نقدم خدمات رعاية تمريضية منزلية متخصصة ومليئة بالرحمة في راحة منزلكم',
        images: [
          {
            url: '/images/og-image-ar.jpg',
            width: 1200,
            height: 630,
            alt: 'سند هوم - رعاية تمريضية منزلية',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'سند هوم - رعاية تمريضية منزلية متخصصة',
        description: 'نقدم خدمات رعاية تمريضية منزلية متخصصة ومليئة بالرحمة',
        images: ['/images/og-image-ar.jpg'],
        creator: '@sanadhome',
      },
      alternates: {
        canonical: 'https://sanadhome.com/ar',
        languages: {
          'ar-SA': 'https://sanadhome.com/ar',
          'en-US': 'https://sanadhome.com/en',
        },
      },
    };
  }

  return {
    title: "SanadHome - Professional Home Nursing Care",
    description: "Providing compassionate and professional nursing care in the comfort of your home with qualified healthcare professionals dedicated to your wellbeing.",
    keywords: ["home care", "home nursing", "elderly care", "medical care", "home nurse", "healthcare", "physical therapy", "post surgical care"],
    authors: [{ name: "SanadHome" }],
    creator: "SanadHome",
    publisher: "SanadHome",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      alternateLocale: 'ar_SA',
      url: 'https://sanadhome.com/en',
      siteName: 'SanadHome',
      title: 'SanadHome - Professional Home Nursing Care',
      description: 'Providing compassionate and professional nursing care in the comfort of your home',
      images: [
        {
          url: '/images/og-image-en.jpg',
          width: 1200,
          height: 630,
          alt: 'SanadHome - Professional Home Nursing Care',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'SanadHome - Professional Home Nursing Care',
      description: 'Providing compassionate and professional nursing care in the comfort of your home',
      images: ['/images/og-image-en.jpg'],
      creator: '@sanadhome',
    },
    alternates: {
      canonical: 'https://sanadhome.com/en',
      languages: {
        'ar-SA': 'https://sanadhome.com/ar',
        'en-US': 'https://sanadhome.com/en',
      },
    },
  };
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params;
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Provide all messages to the client
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body
        className={`${cairo.variable} ${cairo.className} antialiased font-cairo`}
        
      >
         <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <div className="relative flex min-h-screen flex-col">
              {/* Decorative spot blur circles */}
              <div className="spot-blur spot-blur-top-right" />
              <div className="spot-blur spot-blur-bottom-left" />
              <Toaster />
              <FloatingWhatsButton />

              <Header locale={locale} />
              <main className="flex justify-around  ">{children}</main>
              <Footer locale={locale} />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
