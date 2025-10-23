import { LanguageSwitcher } from '@/components/language-switcher'
import { ThemeToggle } from '@/components/theme-toggle'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import HeaderHome from './HeaderHome'
import Icon from './Icon'
import { MobileMenu } from './MobileMenu'

export async function Header({ locale }: { locale: string }) {
  const t = await getTranslations({
    namespace: 'nav',
    locale,
  })

  const navLabels = {
    home: t('home'),
    about: t('about'),
    services: t('services'),
    blog: t('blog'),
    contact: t('contact')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Primary color header line */}
      <div className="h-1 bg-primary"></div>

      <div className="container flex h-16 items-center justify-around">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-4">
          <div className="w-12 h-12">
            <Icon className="icon-themed" />
          </div>
          <span className="text-xl font-bold text-primary-custom">
            {t('brandName') || 'SanadHome'}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <HeaderHome href={`/${locale}`}>
            {t('home')}
          </HeaderHome>
          <HeaderHome href={`/${locale}/about`}>
            {t('about')}
          </HeaderHome>
          <HeaderHome href={`/${locale}/services`}>
            {t('services')}
          </HeaderHome>
          <HeaderHome href={`/${locale}/articles`}>
            {t('blog')}
          </HeaderHome>
          <HeaderHome href={`/${locale}/contact`}>
            {t('contact')}
          </HeaderHome>
        </nav>

        <div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu */}
          <MobileMenu locale={locale} navLabels={navLabels} />
        </div>
      </div>
    </header>
  )
}
