'use client'

import { Button } from '@/components/ui/button'
import { MarkdownContent } from '@/lib/markdown'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

interface ContactFormProps {
    locale: string
    services?: MarkdownContent[]
}

export function ContactForm({ locale, services = [] }: ContactFormProps) {
    const t = useTranslations('contact')
    const [formData, setFormData] = useState({
        name: '',
        addrss: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus('idle')

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    locale
                }),
            })

            if (response.ok) {
                setSubmitStatus('success')
                setFormData({
                    name: '',
                    addrss: '',
                    email: '',
                    phone: '',
                    service: '',
                    message: ''
                })
            } else {
                setSubmitStatus('error')
            }
        } catch (error) {
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary">{t('sendMessage')}</h2>

            {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-green-800">{t('successMessage')}</p>
                </div>
            )}

            {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-800">{t('errorMessage')}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                            {t('name')} *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder={t('namePlaceholder')}
                        />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
  <label htmlFor="addrss" className="block text-sm font-medium mb-2">
    {t('addrss')} *
  </label>
  <input
    type="text"
    id="addrss"
    name="addrss"
    value={formData.addrss}
    onChange={handleChange}
    required
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
    placeholder={t('addrssPlaceholder')}
  />
          </div>      
                         </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                            {t('email')} *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder={t('emailPlaceholder')}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                            {t('phone')}
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder={t('phonePlaceholder')}
                        />
                    </div>

                    <div>
                        <label htmlFor="service" className="block text-sm font-medium mb-2">
                            {t('serviceNeeded')}
                        </label>
                        <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="">{t('selectService')}</option>
                            {services.length > 0 ? (
                                services.map((service) => (
                                    <option key={service.slug} value={service.slug}>
                                        {service.frontmatter.title}
                                    </option>
                                ))
                            ) : (
                                <>
                                    <option value="nursing-care">{t('services.nursingCare')}</option>
                                    <option value="chronic-disease">{t('services.chronicDisease')}</option>
                                    <option value="palliative-care">{t('services.palliativeCare')}</option>
                                    <option value="physical-therapy">{t('services.physicalTherapy')}</option>
                                    <option value="post-surgical">{t('services.postSurgical')}</option>
                                </>
                            )}
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                        {t('message')} *
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                        placeholder={t('messagePlaceholder')}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full md:w-auto"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? t('sending') : t('sendMessage')}
                </Button>
            </form>
        </div>
    )
}


