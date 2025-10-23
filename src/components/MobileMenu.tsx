'use client'

import { useState } from 'react'
import HeaderHome from './HeaderHome'
import { LanguageSwitcher } from './language-switcher'
import { ThemeToggle } from './theme-toggle'

interface MobileMenuProps {
    locale: string
    navLabels: {
        home: string
        about: string
        services: string
        blog: string
        contact: string
    }
}

export function MobileMenu({ locale, navLabels }: MobileMenuProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
    const closeMobileMenu = () => setIsMobileMenuOpen(false)

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-foreground hover:bg-accent"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {isMobileMenuOpen ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    )}
                </svg>
            </button>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className={"fixed inset-0 z-50 flex flex-col md:hidden pt-16 "}>
                    {/* Blurred overlay */}
                    <div
                        className="absolute inset-0 transition-all"
                        onClick={closeMobileMenu}
                        aria-label="Close menu overlay"
                    />
                    {/* Menu content */}
                    <nav className={"relative border-primary shadow-primary z-10 mx-auto mt-4 w-[90vw] max-w-sm rounded-xl border  p-6  text-center shadow-sm backdrop-blur bg-background   "}>
                        <HeaderHome
                            href={`/${locale}`}
                            className="block w-full "
                            onClick={closeMobileMenu}
                        >
                            {navLabels.home}
                        </HeaderHome>
                        <HeaderHome
                            href={`/${locale}/about`}
                            className="block w-full "
                            onClick={closeMobileMenu}
                        >
                            {navLabels.about}
                        </HeaderHome>
                        <HeaderHome
                            href={`/${locale}/services`}
                            className="block w-full "
                            onClick={closeMobileMenu}
                        >
                            {navLabels.services}
                        </HeaderHome>
                        <HeaderHome
                            href={`/${locale}/articles`}
                            className="block w-full "
                            onClick={closeMobileMenu}
                        >
                            {navLabels.blog}
                        </HeaderHome>
                        <HeaderHome
                            href={`/${locale}/contact`}
                            className="block w-full "
                            onClick={closeMobileMenu}
                        >
                            {navLabels.contact}
                        </HeaderHome>
                        <div className="flex items-center justify-center gap-4 pt-4 border-t">
                            <ThemeToggle />
                            <LanguageSwitcher />
                        </div>
                    </nav>
                </div>
            )}
        </>
    )
}
