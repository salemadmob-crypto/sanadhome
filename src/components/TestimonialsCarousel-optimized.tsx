'use client';

import { Quote, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface TestimonialItem {
    name: string;
    role: string;
    content: string;
}

export default function TestimonialsCarousel() {
    const t = useTranslations('about.testimonials');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isClient, setIsClient] = useState(false);

    // Wait for client-side hydration
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Get all testimonials - memoized to prevent recreating on every render
    const testimonials: TestimonialItem[] = useMemo(() => [
        {
            name: t('client1.name'),
            role: t('client1.role'),
            content: t('client1.content'),
        },
        {
            name: t('client2.name'),
            role: t('client2.role'),
            content: t('client2.content'),
        },
        {
            name: t('client3.name'),
            role: t('client3.role'),
            content: t('client3.content'),
        },
        {
            name: t('client4.name'),
            role: t('client4.role'),
            content: t('client4.content'),
        },
        {
            name: t('client5.name'),
            role: t('client5.role'),
            content: t('client5.content'),
        },
        {
            name: t('client6.name'),
            role: t('client6.role'),
            content: t('client6.content'),
        },
        {
            name: t('client7.name'),
            role: t('client7.role'),
            content: t('client7.content'),
        },
        {
            name: t('client8.name'),
            role: t('client8.role'),
            content: t('client8.content'),
        },
        {
            name: t('client9.name'),
            role: t('client9.role'),
            content: t('client9.content'),
        },
        {
            name: t('client10.name'),
            role: t('client10.role'),
            content: t('client10.content'),
        },
    ], [t]);

    // Auto-play carousel - only after client hydration
    useEffect(() => {
        if (!isClient) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 5000); // Slower interval for better performance

        return () => clearInterval(interval);
    }, [testimonials.length, isClient]);

    // Navigation functions
    const nextTestimonial = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, [testimonials.length]);

    const prevTestimonial = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    }, [testimonials.length]);

    const goToTestimonial = useCallback((index: number) => {
        setCurrentIndex(index);
    }, []);

    // Get visible testimonials - simplified approach
    const getVisibleTestimonials = useCallback(() => {
        // Always show 3 testimonials, but make it responsive with CSS
        const visible = [];
        for (let i = 0; i < 3; i++) {
            const index = (currentIndex + i) % testimonials.length;
            visible.push({ ...testimonials[index], originalIndex: index });
        }
        return visible;
    }, [currentIndex, testimonials]);

    const visibleTestimonials = getVisibleTestimonials();

    // Don't render until client-side hydration is complete
    if (!isClient) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-background p-8 rounded-lg shadow-lg border space-y-6 animate-pulse">
                        <div className="w-12 h-12 rounded-full bg-muted mx-auto" />
                        <div className="space-y-2">
                            <div className="h-4 bg-muted rounded w-full" />
                            <div className="h-4 bg-muted rounded w-3/4" />
                            <div className="h-4 bg-muted rounded w-1/2" />
                        </div>
                        <div className="space-y-1 text-center">
                            <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
                            <div className="h-3 bg-muted rounded w-1/3 mx-auto" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {visibleTestimonials.map((testimonial, idx) => (
                        <div
                            key={`${testimonial.originalIndex}-${currentIndex}`}
                            className="bg-background p-6 rounded-lg shadow-lg border space-y-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto">
                                <Quote className="h-6 w-6 text-primary" />
                            </div>
                            <p className="text-muted-foreground italic leading-relaxed text-sm min-h-[100px] flex items-center justify-center text-center">
                                "{testimonial.content}"
                            </p>
                            <div className="text-center space-y-1">
                                <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                            </div>
                            <div className="flex justify-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background shadow-lg border rounded-full p-2 hover:bg-primary hover:text-primary-foreground transition-colors duration-200 z-10"
                aria-label="Previous testimonial"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background shadow-lg border rounded-full p-2 hover:bg-primary hover:text-primary-foreground transition-colors duration-200 z-10"
                aria-label="Next testimonial"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-6">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToTestimonial(index)}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${index === currentIndex
                                ? 'bg-primary'
                                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                            }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
