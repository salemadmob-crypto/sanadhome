import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
    content: string;
    className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
    return (
        <div className={cn('prose prose-slate dark:prose-invert max-w-none', className)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ className, ...props }) => (
                        <h1
                            className={cn(
                                'text-4xl font-bold tracking-tight lg:text-5xl mb-8',
                                className
                            )}
                            {...props}
                        />
                    ),
                    h2: ({ className, children, ...props }) => {
                        const text = typeof children === 'string' ? children :
                            Array.isArray(children) ? children.join('') :
                                children?.toString() || '';
                        const id = text
                            .toLowerCase()
                            .replace(/[^\w\s\u0600-\u06FF]/g, '') // Allow Arabic characters
                            .replace(/\s+/g, '-')
                            .trim();
                        return (
                            <h2
                                id={id}
                                className={cn(
                                    'text-3xl font-bold tracking-tight mb-6 mt-10',
                                    className
                                )}
                                {...props}
                            >
                                {children}
                            </h2>
                        );
                    },
                    h3: ({ className, children, ...props }) => {
                        const text = typeof children === 'string' ? children :
                            Array.isArray(children) ? children.join('') :
                                children?.toString() || '';
                        const id = text
                            .toLowerCase()
                            .replace(/[^\w\s\u0600-\u06FF]/g, '') // Allow Arabic characters
                            .replace(/\s+/g, '-')
                            .trim();
                        return (
                            <h3
                                id={id}
                                className={cn(
                                    'text-2xl font-semibold tracking-tight mb-4 mt-8',
                                    className
                                )}
                                {...props}
                            >
                                {children}
                            </h3>
                        );
                    },
                    h4: ({ className, children, ...props }) => {
                        const text = typeof children === 'string' ? children :
                            Array.isArray(children) ? children.join('') :
                                children?.toString() || '';
                        const id = text
                            .toLowerCase()
                            .replace(/[^\w\s\u0600-\u06FF]/g, '') // Allow Arabic characters
                            .replace(/\s+/g, '-')
                            .trim();
                        return (
                            <h4
                                id={id}
                                className={cn(
                                    'text-xl font-semibold tracking-tight mb-3 mt-6',
                                    className
                                )}
                                {...props}
                            >
                                {children}
                            </h4>
                        );
                    },
                    p: ({ className, ...props }) => (
                        <p
                            className={cn('leading-7 mb-6', className)}
                            {...props}
                        />
                    ),
                    ul: ({ className, ...props }) => (
                        <ul
                            className={cn('list-disc list-inside mb-6 space-y-2', className)}
                            {...props}
                        />
                    ),
                    ol: ({ className, ...props }) => (
                        <ol
                            className={cn('list-decimal list-inside mb-6 space-y-2', className)}
                            {...props}
                        />
                    ),
                    li: ({ className, ...props }) => (
                        <li
                            className={cn('leading-7', className)}
                            {...props}
                        />
                    ),
                    blockquote: ({ className, ...props }) => (
                        <blockquote
                            className={cn(
                                'border-l-4 border-primary pl-6 py-2 my-6 italic bg-muted/50 rounded-r-lg',
                                className
                            )}
                            {...props}
                        />
                    ),
                    code: ({ className, ...props }) => (
                        <code
                            className={cn(
                                'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
                                className
                            )}
                            {...props}
                        />
                    ),
                    pre: ({ className, ...props }) => (
                        <pre
                            className={cn(
                                'mb-6 overflow-x-auto rounded-lg bg-muted p-6',
                                className
                            )}
                            {...props}
                        />
                    ),
                    img: ({ className, alt, ...props }) => (
                        <img
                            className={cn('rounded-lg shadow-md my-8', className)}
                            alt={alt}
                            {...props}
                        />
                    ),
                    table: ({ className, ...props }) => (
                        <div className="my-6 w-full overflow-y-auto">
                            <table
                                className={cn('w-full border-collapse border border-border', className)}
                                {...props}
                            />
                        </div>
                    ),
                    th: ({ className, ...props }) => (
                        <th
                            className={cn(
                                'border border-border px-4 py-2 text-left font-bold bg-muted',
                                className
                            )}
                            {...props}
                        />
                    ),
                    td: ({ className, ...props }) => (
                        <td
                            className={cn('border border-border px-4 py-2', className)}
                            {...props}
                        />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
