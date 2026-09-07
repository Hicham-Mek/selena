import { router, usePage } from '@inertiajs/react';

export default function LanguageToggle({ className = '' }) {
    const { locale = 'ar' } = usePage().props;
    const isArabic = locale === 'ar';

    const switchLocale = (newLocale) => {
        if (newLocale === locale) return;
        router.post(route('language.switch'), { locale: newLocale }, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <div className={`inline-flex items-center rounded-lg bg-gray-100 p-1 border border-gray-200 shadow-sm text-xs font-semibold ${className}`}>
            <button
                type="button"
                onClick={() => switchLocale('ar')}
                aria-pressed={isArabic}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all duration-150 ${isArabic
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
            >
                <span>🇸🇦</span>
                <span>العربية</span>
            </button>

            <button
                type="button"
                onClick={() => switchLocale('en')}
                aria-pressed={!isArabic}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all duration-150 ${!isArabic
                        ? 'bg-white text-gray-900 shadow-sm font-bold'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
            >
                <span>🇬🇧</span>
                <span>English</span>
            </button>
        </div>
    );
}
