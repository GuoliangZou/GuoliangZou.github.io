'use client';

import { motion } from 'framer-motion';
import { useMessages } from '@/lib/i18n/useMessages';

export interface NewsItem {
    date: string;
    content: string;
    bold?: string[];
    green?: string[];
}

interface NewsProps {
    items: NewsItem[];
    title?: string;
}

function renderFormattedContent(item: NewsItem) {
    const boldTexts = item.bold || [];
    const greenTexts = item.green || [];

    const targets = [...boldTexts, ...greenTexts]
        .filter(Boolean)
        .sort((a, b) => b.length - a.length);

    if (targets.length === 0) {
        return item.content;
    }

    const escapedTargets = targets.map((text) =>
        text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    );

    const regex = new RegExp(`(${escapedTargets.join('|')})`, 'g');
    const parts = item.content.split(regex);

    return parts.map((part, index) => {
        if (boldTexts.includes(part)) {
            return (
                <strong key={index} className="font-bold">
                    {part}
                </strong>
            );
        }

        if (greenTexts.includes(part)) {
            return (
                <span
                    key={index}
                    className="font-medium"
                    style={{ color: '#008000' }}
                >
                    {part}
                </span>
            );
        }

        return <span key={index}>{part}</span>;
    });
}

export default function News({ items, title }: NewsProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.news;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
        >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">{resolvedTitle}</h2>
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                        <span className="text-xs text-neutral-500 mt-1 w-16 flex-shrink-0">{item.date}</span>
                        <p className="text-sm text-neutral-700">{renderFormattedContent(item)}</p>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
