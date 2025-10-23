'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderHomeProps {
    href: string;
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function HeaderHome({
    href,
    children,
    className = "",
    onClick
}: HeaderHomeProps) {
    const path = usePathname();
    const isActive = (href === '/ar' || href === '/en') ? path === href : path.startsWith(href);

    return (
        <Link
            href={href}
            className={`text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md ${isActive ? 'text-primary bg-primary/10 border border-primary/20' : ''
                } ${className}`}
            onClick={onClick}
        >
            {children}
        </Link>
    )
}


