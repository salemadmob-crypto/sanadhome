import Image from 'next/image'

export default function Icon({ className = '' }: { className?: string }) {
    return (
        <div className={`p-1 w-full h-full border-primary   rounded-xl  ${className}`}>
            <Image
                src={'/logo.svg'}
                width={40}
                height={40}
                className='w-full h-full object-contain'
                alt="SanadHome Logo"
            />
        </div>
    )
}
