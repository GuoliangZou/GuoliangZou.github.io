'use client';

interface FooterProps {
  lastUpdated?: string;
  lastUpdatedByLocale?: Record<string, string | undefined>;
  defaultLocale?: string;
}

export default function Footer(props: FooterProps) {
  // Keep the original props interface for compatibility with layout.tsx
  void props;

  return (
    <footer className="border-t border-neutral-200/50 bg-neutral-50/50 dark:bg-neutral-900/50 dark:border-neutral-700/50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-xs text-neutral-500 text-center italic">
          Pursue truth through curiosity and persistence.
        </p>
      </div>
    </footer>
  );
}