'use client';

import { Quote, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TestimonialItem {
    name: string;
    role: string;
    content: string;
}

export default function TestimonialsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Fixed testimonials in Arabic - always display in Arabic regardless of interface language
    const testimonials: TestimonialItem[] = [
        {
            name: "أم محمد",
            role: "أم مريضة",
            content: "والله العظيم الخدمة دي كانت هايلة! الممرضات جم البيت وعاملوا ماما معاملة كويسة أوي، كانوا بيشوفوها كل يوم ويطمنوا عليها. ماما دلوقتي أحسن بكتير وبقت مبسوطة في البيت."
        },
        {
            name: "أحمد فتحي",
            role: "مريض ضغط وسكر",
            content: "صراحة كنت متردد في الأول عشان مكنتش مجرب الحكايات دي قبل كده، بس لما جربت الخدمة اتفاجئت! الدكاترة والممرضات هايلين ومتفهمين ومحترمين. دلوقتي الضغط والسكر منتظمين خالص والحمد لله."
        },
        {
            name: "منى حسن",
            role: "زوجة مريض",
            content: "بعد عملية جوزي كنت خايفة أوي وقلقانة عليه، بس فريق سند هوم خلاني مطمنة خالص. كانوا معانا 24 ساعة مش بس كده، كمان كانوا بيعاملوه بحنية ويصبروا عليه. جوزي خف كتير والحمد لله رجع لطبيعته."
        },
        {
            name: "عم حسين أبو العز",
            role: "مريض كلى",
            content: "أنا مريض كلى من سنين وكنت محتاج رعاية خاصة ومتابعة دايمة، الحمد لله لقيت ده كله في سند هوم. الناس دول ربنا يكرمهم، أهل ثقة ومتخصصين، وخلوني أعيش حياتي طبيعي في بيتي وسط أهلي."
        },
        {
            name: "دكتورة سارة محمود",
            role: "بنت مريضة",
            content: "كوني دكتورة، كنت دقيقة جداً في اختيار مين يتولى رعاية بابا بعد الجلطة. سند هوم فاقوا توقعاتي بمراحل والمستوى المهني عندهم راقي جداً. بابا اتحسن كتير والحمد لله وبقى يتحرك تاني."
        },
        {
            name: "أبو كريم النجار",
            role: "مريض قلب",
            content: "بعد الذبحة اللي جاتلي كنت محتاج رعاية مستمرة ومتابعة كل ساعة، والحمد لله الفريق ده كان معايا خطوة بخطوة. دلوقتي صحتي أحسن بكتير وأنا مطمن على نفسي وعارف إني في إيديهم الأمينة."
        },
        {
            name: "الحاجة أم عبدالله",
            role: "أم مريض مزمن",
            content: "ابني مريض مزمن ومحتاج رعاية خاصة ومتابعة باستمرار، فريق سند هوم بقوا زي العيلة بالنسبالنا. بيتعاملوا معاه بحب وصبر كأنه ولدهم، وده خلاه يتحسن نفسياً وجسدياً. ربنا يوفقهم."
        },
        {
            name: "عم رجب الحلاق",
            role: "مريض جلطة",
            content: "بعد الجلطة اللي أقعدتني مكنتش قادر أعمل حاجة لوحدي خالص، كنت زعلان وقلقان على مستقبلي. بس الممرضين في سند هوم ساعدوني أرجع أعيش حياتي تاني بكرامة. صبورين وشاطرين والله العظيم."
        },
        {
            name: "أم أحمد الطيبة",
            role: "جدة مريضة",
            content: "أنا عجوزة وعندي مشاكل كتير في صحتي، كنت قاعدة في البيت وحيدة ومحدش يشوفني. لما جه فريق سند هوم حسيت إني لقيت أولادي اللي كبروا. بيجوا كل يوم ويشوفوني ويطمنوا عليا، ربنا يخليهم لأهلهم."
        },
        {
            name: "عم فتحي البواب",
            role: "مريض سكر",
            content: "أنا بواب عمارة وعندي سكر من زمان، مكنتش عارف أتعامل معاه إزاي. فريق سند هوم علموني كل حاجة وخلوني أفهم مرضي أكتر. دلوقتي بقيت أعرف آكل إيه ومآكلش إيه، وصحتي أحسن بكتير."
        },
    ];

    // Auto-play - slower and only when mounted
    useEffect(() => {
        if (!mounted) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000); // 6 seconds for better UX

        return () => clearInterval(interval);
    }, [mounted, testimonials.length]);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => prev === 0 ? testimonials.length - 1 : prev - 1);
    };

    // Get current 3 testimonials
    const getVisibleTestimonials = () => {
        const visible = [];
        for (let i = 0; i < 3; i++) {
            const index = (currentIndex + i) % testimonials.length;
            visible.push(testimonials[index]);
        }
        return visible;
    };

    if (!mounted) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-background p-6 rounded-lg shadow border space-y-4 animate-pulse min-h-[300px]">
                        <div className="w-10 h-10 rounded-full bg-muted mx-auto" />
                        <div className="space-y-2">
                            <div className="h-3 bg-muted rounded w-full" />
                            <div className="h-3 bg-muted rounded w-3/4" />
                            <div className="h-3 bg-muted rounded w-1/2" />
                        </div>
                        <div className="space-y-1 text-center">
                            <div className="h-3 bg-muted rounded w-1/2 mx-auto" />
                            <div className="h-2 bg-muted rounded w-1/3 mx-auto" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    const visibleTestimonials = getVisibleTestimonials();

    return (
        <div className="relative max-w-7xl mx-auto">
            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {visibleTestimonials.map((testimonial, idx) => (
                    <div
                        key={`${currentIndex}-${idx}`}
                        className="bg-background p-6 rounded-lg shadow border space-y-4 transition-transform duration-300 hover:scale-105 min-h-[300px] flex flex-col justify-between"
                        dir="auto"
                    >
                        <div className="flex-grow space-y-4">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mx-auto">
                                <Quote className="h-5 w-5 text-primary" />
                            </div>
                            <p className="text-muted-foreground italic text-sm leading-relaxed text-center px-2" dir="rtl">
                                "{testimonial.content}"
                            </p>
                        </div>

                        <div className="space-y-3">
                            <div className="text-center space-y-1" dir="rtl">
                                <h4 className="font-semibold text-sm text-foreground">{testimonial.name}</h4>
                                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                            </div>
                            <div className="flex justify-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation */}
            <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 bg-background shadow border rounded-full p-2 hover:bg-primary hover:text-primary-foreground transition-colors z-10"
                aria-label="Previous"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 bg-background shadow border rounded-full p-2 hover:bg-primary hover:text-primary-foreground transition-colors z-10"
                aria-label="Next"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dots */}
            <div className="flex justify-center space-x-2 mt-6">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                            }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
