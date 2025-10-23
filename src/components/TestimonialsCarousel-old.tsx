'use client';

import { Quote, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface TestimonialItem {
    name: string;
    role: string;
    content: string;
}

export default function TestimonialsCarousel() {
    const t = useTranslations('about.testimonials');
    const [currentIndex, setCurrentIndex] = useState(0);

    // Get all testimonials
    const testimonials: TestimonialItem[] = [
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
    ];

    // Auto-play carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 4000); // Change every 4 seconds

        return () => clearInterval(interval);
    }, [testimonials.length]);

    // Get visible testimonials (show 3 at a time on desktop, 1 on mobile)
    const getVisibleTestimonials = () => {
        const visibleCount = window.innerWidth >= 768 ? 3 : 1;
        const visible = [];

        for (let i = 0; i < visibleCount; i++) {
            const index = (currentIndex + i) % testimonials.length;
            visible.push({ ...testimonials[index], index });
        }

        return visible;
    };

    const [visibleTestimonials, setVisibleTestimonials] = useState<Array<TestimonialItem & { index: number }>>([]);

    useEffect(() => {
        const updateVisibleTestimonials = () => {
            setVisibleTestimonials(getVisibleTestimonials());
        };

        updateVisibleTestimonials();
        window.addEventListener('resize', updateVisibleTestimonials);

        return () => window.removeEventListener('resize', updateVisibleTestimonials);
    }, [currentIndex, testimonials]);

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-500 ease-in-out">
                    {visibleTestimonials.map((testimonial, idx) => (
                        <div
                            key={`${testimonial.index}-${idx}`}
                            className="bg-background p-8 rounded-lg shadow-lg border space-y-6 transform transition-all duration-500 hover:scale-105"
                        >
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto">
                                <Quote className="h-6 w-6 text-primary" />
                            </div>
                            <p className="text-muted-foreground italic leading-relaxed min-h-[120px] flex items-center">
                                "{testimonial.content}"
                            </p>
                            <div className="text-center space-y-1">
                                <h4 className="font-semibold">{testimonial.name}</h4>
                                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </div>
                            <div className="flex justify-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background shadow-lg border rounded-full p-3 hover:bg-primary hover:text-primary-foreground transition-colors duration-200 z-10"
                aria-label="Previous testimonial"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background shadow-lg border rounded-full p-3 hover:bg-primary hover:text-primary-foreground transition-colors duration-200 z-10"
                aria-label="Next testimonial"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-8">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-200 ${index === currentIndex
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
