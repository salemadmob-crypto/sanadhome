'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface CounterProps {
    value: number;
    duration?: number;
    delay?: number;
    className?: string;
    suffix?: string;
    prefix?: string;
}

export function Counter({
    value,
    duration = 2,
    delay = 0,
    className = '',
    suffix = '',
    prefix = ''
}: CounterProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 60,
        stiffness: 100,
    });

    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => {
                motionValue.set(value);
            }, delay * 1000);

            return () => clearTimeout(timer);
        }
    }, [motionValue, isInView, value, delay]);

    useEffect(() => {
        const unsubscribe = springValue.on('change', (latest) => {
            if (ref.current) {
                ref.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`;
            }
        });

        return unsubscribe;
    }, [springValue, suffix, prefix]);

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: delay }}
        >
            {prefix}0{suffix}
        </motion.div>
    );
}

// Counter component specialized for statistics with different number types
interface StatCounterProps {
    value: string;
    delay?: number;
    className?: string;
}

export function StatCounter({ value, delay = 0, className = '' }: StatCounterProps) {
    // Extract number and suffix from value string
    const extractNumberAndSuffix = (str: string) => {
        // Handle different formats like "1000+", "99%", "10", etc.
        const match = str.match(/^(\d+)(.*)$/);
        if (match) {
            return {
                number: parseInt(match[1]),
                suffix: match[2] || ''
            };
        }
        // If no number found, return original string
        return {
            number: 0,
            suffix: str
        };
    };

    const { number, suffix } = extractNumberAndSuffix(value);

    // If no number was extracted, just return the original value
    if (number === 0 && suffix === value) {
        return (
            <motion.div
                className={className}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay }}
                viewport={{ once: true, margin: "-100px" }}
            >
                {value}
            </motion.div>
        );
    }

    return (
        <Counter
            value={number}
            suffix={suffix}
            delay={delay}
            className={className}
            duration={2.5}
        />
    );
}
