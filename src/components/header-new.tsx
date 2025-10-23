'use client'

import { LanguageSwitcher } from '@/components/language-switcher'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'
import HeaderHome from './HeaderHome'
import Icon from './Icon'

interface HeaderProps {
    locale: string
}

export function Header({ locale }: HeaderProps) {
    const t = useTranslations('nav')
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const closeMenu = () => setIsMenuOpen(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {/* Primary color header line */}
            <div className="h-1 bg-primary"></div>

            <div className="container flex h-16 items-center justify-between">
                {/* Logo */}
                <Link href={`/${locale}`} className="flex items-center gap-4">
                    <div className="w-12 h-12">
                        <Icon />
                    </div>
                    <span className="text-xl font-bold text-primary">{
                        t('brandName') || 'SanadHome'
                    }</span>
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
                </nav>

                {/* Desktop Controls */}
                <div className="hidden md:flex items-center gap-2">
                    <ThemeToggle />
                    <LanguageSwitcher />
                </div>

                {/* Mobile Menu Button */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden border-t bg-background/95 backdrop-blur">
                    <nav className="container py-4 flex flex-col space-y-2">
                        <HeaderHome href={`/${locale}`} onClick={closeMenu}>
                            {t('home')}
                        </HeaderHome>
                        <HeaderHome href={`/${locale}/about`} onClick={closeMenu}>
                            {t('about')}
                        </HeaderHome>
                        <HeaderHome href={`/${locale}/services`} onClick={closeMenu}>
                            {t('services')}
                        </HeaderHome>
                        <HeaderHome href={`/${locale}/articles`} onClick={closeMenu}>
                            {t('blog')}
                        </HeaderHome>

                        {/* Mobile Controls */}
                        <div className="flex items-center gap-2 pt-4 border-t">
                            <ThemeToggle />
                            <LanguageSwitcher />
                        </div>
                    </nav>
                </div>
            )}
        </header>
    )
}
