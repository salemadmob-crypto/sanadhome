'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BsWhatsapp } from 'react-icons/bs';

export default function FloatingWhatsButton() {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showCallToAction, setShowCallToAction] = useState(false);

    useEffect(() => {
        // Check if device is mobile
        const checkMobile = () => {
            const isMobileDevice = window.innerWidth <= 768 ||
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            setIsMobile(isMobileDevice);
        };

        // Check scroll position
        const handleScroll = () => {
            const scrolled = window.scrollY > 200; // Show after 200px scroll
            setIsVisible(scrolled && isMobile);
        };

        // Initial checks
        checkMobile();
        handleScroll();

        // Add event listeners
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', checkMobile, { passive: true });

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', checkMobile);
        };
    }, [isMobile]);

    // Call to action animation effect
    useEffect(() => {
        if (isVisible) {
            let showTimer: NodeJS.Timeout;
            let hideTimer: NodeJS.Timeout;
            let repeatTimer: NodeJS.Timeout;

            const showCallToActionCycle = () => {
                // Show call to action after 3 seconds
                showTimer = setTimeout(() => {
                    setShowCallToAction(true);
                }, 3000);

                // Hide call to action after 8 seconds (5 seconds display time)
                hideTimer = setTimeout(() => {
                    setShowCallToAction(false);
                }, 8000);

                // Repeat the cycle every 20 seconds
                repeatTimer = setTimeout(() => {
                    showCallToActionCycle();
                }, 20000);
            };

            showCallToActionCycle();

            return () => {
                clearTimeout(showTimer);
                clearTimeout(hideTimer);
                clearTimeout(repeatTimer);
            };
        } else {
            setShowCallToAction(false);
        }
    }, [isVisible]);

    const whatsappNumber = "+201221887357";
    const message = "مرحباً، أرغب في الاستفسار عن خدمات سند هوم للرعاية المنزلية";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    const handleWhatsAppClick = () => {
        setShowCallToAction(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ scale: 0, opacity: 0, y: 100 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0, opacity: 0, y: 100 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        duration: 0.5
                    }}
                    className="fixed bottom-6 right-6 z-50"
                >
                    {/* Call to Action Message */}
                    <AnimatePresence>
                        {showCallToAction && (
                            <motion.div
                                initial={{ opacity: 0, x: 50, scale: 0.8 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 50, scale: 0.8 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 25
                                }}
                                className="absolute right-full  transform translate-y-1/2 mr-4"
                            >
                                <motion.div
                                    animate={{
                                        scale: [1, 1.05, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: 2,
                                        ease: "easeInOut",
                                    }}
                                    className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg shadow-lg relative overflow-hidden"
                                    style={{ direction: 'rtl' }}
                                >
                                    <div className="flex items-center gap-2">
                                        <motion.div
                                            animate={{
                                                rotate: [0, 10, -10, 0],
                                            }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        >
                                            📱
                                        </motion.div>
                                        <span className="font-semibold text-sm whitespace-nowrap">
                                            اطلب واتساب الآن!
                                        </span>
                                    </div>

                                    {/* Arrow pointing to button */}
                                    <div className="absolute top-1/2 left-full transform -translate-y-1/2 border-8 border-transparent border-l-green-500"></div>

                                    {/* Shine effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 rounded-lg overflow-hidden"
                                        animate={{
                                            x: ['-100%', '100%'],
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: 2,
                                            ease: "easeInOut",
                                            delay: 0.5,
                                        }}
                                    />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="تواصل معنا عبر واتساب"
                        onClick={handleWhatsAppClick}
                        className="group relative flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* <MessageCircle className="w-7 h-7 relative z-10" /> */}
                        <BsWhatsapp className=' w-7 h-7 relative z-10 ' />
                        {/* Ripple effect */}
                        <motion.div
                            className="absolute inset-0 bg-green-400 rounded-full"
                            animate={{
                                scale: [1, 1.4, 1],
                                opacity: [0.6, 0, 0.6],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        {/* Secondary ripple */}
                        <motion.div
                            className="absolute inset-0 bg-green-300 rounded-full"
                            animate={{
                                scale: [1, 1.6, 1],
                                opacity: [0.4, 0, 0.4],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5,
                            }}
                        />

                        {/* Tooltip */}
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.8 }}
                            whileHover={{ opacity: 1, x: 0, scale: 1 }}
                            className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 bg-gray-900 text-white text-sm py-2 px-3 rounded-lg whitespace-nowrap shadow-lg pointer-events-none"
                            style={{ direction: 'rtl' }}
                        >
                            تواصل معنا عبر واتساب
                            <div className="absolute top-1/2 left-full transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
                        </motion.div>
                    </motion.a>


                </motion.div>
            )}
        </AnimatePresence>
    );
}
