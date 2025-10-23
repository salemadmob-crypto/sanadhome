import { Mail, MapPin, Phone } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import Icon from './Icon'

export async function Footer({ locale }: { locale: string }) {
    const t = await getTranslations(
        {
            namespace: 'footer',
            locale, // You can set this dynamically based on user preference
        }
    )
    const navT = await getTranslations(
        {
            namespace: 'nav',
            locale,
        }
    )
    const contactT = await getTranslations(
        {
            namespace: 'contact',
            locale,
        }
    )

    return (
        <footer className="border-t  flex justify-around p-4 bg-accent ">
            <div className="container py-12 px-2">
                <div className="grid grid-cols-1 place-items-center md:grid-cols-4 gap-8 text-xl ">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center flex-col">
                            <div className=' w-40 md:w-80 ' >
                                <Icon />
                            </div>
                            <span className="text-xl font-bold">{navT('brandName')}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {t('description')}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold">{t('quickLinks')}</h3>
                        <div className="space-y-2">
                            <Link
                                href="/"
                                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                {navT('home')}
                            </Link>
                            <Link
                                href="/about"
                                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                {navT('about')}
                            </Link>
                            <Link
                                href="/contact"
                                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                {navT('contact')}
                            </Link>
                            <Link
                                href="/faq"
                                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                {navT('faq')}
                            </Link>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold">{t('ImportantLinks')}</h3>
                        <div className="space-y-2">
                            <Link
                                href="/services"
                                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                {navT('services')}
                            </Link>
                            <Link
                                href="/articles"
                                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                {navT('blog')}
                            </Link>
                            <Link
                                href="/privacy-policy"
                                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                {navT('privacyPolicy')}
                            </Link>
                            <Link
                                href="/terms"
                                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                {navT('terms')}
                            </Link>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold">{contactT('title')}</h3>
                        <div className="space-y-2">
                            <Link href={'tel:+201221887357'} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                <Phone className="h-5 w-5 icon-themed" />
                                <span dir='ltr'>+20 122 1887357</span>
                            </Link>
                            <Link href={'mailto:info@sanadhome.com'} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors ">
                                <Mail className="h-5 w-5 icon-themed" />
                                <span>info@sanadHome.com</span>
                            </Link>
                            <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-5 w-5 icon-themed" />
                                <span className="break-words">
                                    {locale === 'ar' ? 'التجمع الخامس، القاهرة، مصر' : 'Fifth Settlement, Cairo, Egypt'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Bottom Bar */}
                <div className="border-t border-foreground mt-8 p-6 text-center    ">
                    <p className="text-sm text-muted-foreground">
                        © 2025 {navT('brandName')}. {t('rights')}
                    </p>
                </div>
            </div>
        </footer>
    )
}
