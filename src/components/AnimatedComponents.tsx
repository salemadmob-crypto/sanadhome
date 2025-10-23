'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedElementProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    className?: string;
}

export function AnimatedElement({
    children,
    delay = 0,
    duration = 0.5,
    direction = 'up',
    className = '',
}: AnimatedElementProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-10px' });

    const getDirection = () => {
        switch (direction) {
            case 'up':
                return { y: 20, x: 0 };
            case 'down':
                return { y: -20, x: 0 };
            case 'left':
                return { x: 20, y: 0 };
            case 'right':
                return { x: -20, y: 0 };
            default:
                return { y: 20, x: 0 };
        }
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{
                opacity: 0,
                ...getDirection(),
            }}
            animate={{
                opacity: isInView ? 1 : 0,
                x: isInView ? 0 : getDirection().x,
                y: isInView ? 0 : getDirection().y,
            }}
            transition={{
                duration,
                delay,
                ease: 'easeOut',
            }}
        >
            {children}
        </motion.div>
    );
}

// مكون للنصوص مع تأثير تدريجي
export function AnimatedText({
    children,
    delay = 0,
    className = '',
    as = 'div',
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-10px' });

    const MotionComponent = motion[as];

    return (
        <MotionComponent
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 20,
            }}
            transition={{
                duration: 0.8,
                delay,
                ease: 'easeOut',
            }}
        >
            {children}
        </MotionComponent>
    );
}

// مكون للبطاقات مع تأثير 3D خفيف
export function AnimatedCard({
    children,
    delay = 0,
    className = '',
    hoverEffect = true,
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    hoverEffect?: boolean;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-10px' });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{
                opacity: 0,
                y: 30,
                scale: 0.95,
            }}
            animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 30,
                scale: isInView ? 1 : 0.95,
            }}
            transition={{
                duration: 0.6,
                delay,
                ease: 'easeOut',
            }}
            whileHover={
                hoverEffect
                    ? {
                        scale: 1.02,
                        y: -5,
                        transition: { duration: 0.3 },
                    }
                    : undefined
            }
        >
            {children}
        </motion.div>
    );
}

// مكون للأيقونات مع تأثير دوران خفيف
export function AnimatedIcon({
    children,
    delay = 0,
    className = '',
    rotateOnHover = true,
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    rotateOnHover?: boolean;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-10px' });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{
                opacity: 0,
                scale: 0.5,
                rotate: -10,
            }}
            animate={{
                opacity: isInView ? 1 : 0,
                scale: isInView ? 1 : 0.5,
                rotate: isInView ? 0 : -10,
            }}
            transition={{
                duration: 0.5,
                delay,
                ease: 'easeOut',
            }}
            whileHover={
                rotateOnHover
                    ? {
                        rotate: 10,
                        scale: 1.1,
                        transition: { duration: 0.3 },
                    }
                    : undefined
            }
        >
            {children}
        </motion.div>
    );
}

// مكون CTA Button خاص مع تأثيرات لفت الانتباه
export function AnimatedCTAButton({
    children,
    delay = 0,
    className = '',
    onClick,
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    onClick?: () => void;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-10px' });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{
                opacity: 0,
                x: -30,
                scale: 0.9,
            }}
            animate={{
                opacity: isInView ? 1 : 0,
                x: isInView ? 0 : -30,
                scale: isInView ? 1 : 0.9,
            }}
            transition={{
                duration: 0.8,
                delay,
                ease: 'easeOut',
            }}
            whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
            }}
            whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 },
            }}
            onClick={onClick}
        >
            <motion.div
                animate={{
                    y: [0, -2, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
