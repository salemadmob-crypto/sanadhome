"use client"

import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'

export function LanguageSwitcher() {
  const params = useParams()
  const currentLocale = params.locale as string || 'en'
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = () => {
    const newLocale = currentLocale === 'en' ? 'ar' : 'en'
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={switchLanguage}
      className="flex items-center gap-2"
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">
        {currentLocale === 'en' ? 'العربية' : 'English'}
      </span>
    </Button>
  )
}
