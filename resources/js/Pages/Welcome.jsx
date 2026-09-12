import ApplicationLogo from '@/Components/ApplicationLogo';
import useTranslate from '@/Hooks/useTranslate';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome({ auth, featuredNovels = [] }) {
    const { t } = useTranslate();
    const { locale = 'ar' } = usePage().props;

    return (
        <>
            <Head title={t('welcome.title')} />
            <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-zinc-950 dark:text-gray-100 flex flex-col selection:bg-brand selection:text-white">
                {/* Navigation Bar */}
                <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-zinc-900/80 border-b border-gray-200/80 dark:border-zinc-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        {/* Brand Logo & Name */}
                        <Link href="/" className="flex items-center gap-3">
                            <ApplicationLogo className="h-12 w-auto text-brand" />
                            <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
                                {t('appName') || 'Selena'}
                            </span>
                        </Link>

                        {/* Navigation Links */}
                        <nav className="flex items-center gap-4 sm:gap-6">
                            <Link
                                href={route('novels.index')}
                                className="text-sm font-semibold text-gray-700 hover:text-brand dark:text-gray-300 dark:hover:text-brand transition-colors"
                            >
                                {t('catalog.browse_novels')}
                            </Link>

                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand/90 transition-colors"
                                >
                                    {t('nav.dashboard')}
                                </Link>
                            ) : (
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <Link
                                        href={route('login')}
                                        className="rounded-xl px-3 sm:px-4 py-2 text-sm font-semibold text-gray-700 hover:text-gray-950 dark:text-gray-300 dark:hover:text-white transition-colors"
                                    >
                                        {t('nav.login')}
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand/90 transition-colors"
                                    >
                                        {t('nav.register')}
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="flex-1">
                    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-28 text-center flex flex-col items-center justify-center px-4 sm:px-6">
                        {/* Glow Background Accent */}
                        <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-30 dark:opacity-20 pointer-events-none">
                            <div className="h-80 w-80 rounded-full bg-brand/30 blur-3xl filter" />
                        </div>

                        {/* Centered Large Application Logo */}
                        <div className="flex justify-center mb-8">
                            <ApplicationLogo className="h-40 w-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300" />
                        </div>

                        <h1 className="max-w-4xl text-4xl sm:text-6xl font-black tracking-tight text-gray-900 dark:text-white">
                            {t('welcome.title')}
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            {t('welcome.subtitle')}
                        </p>

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                            <Link
                                href={route('novels.index')}
                                className="rounded-xl bg-brand px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-brand/25 hover:bg-brand/90 hover:shadow-xl transition-all"
                            >
                                {t('catalog.browse_novels')}
                            </Link>

                            {!auth?.user && (
                                <Link
                                    href={route('register')}
                                    className="rounded-xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 px-7 py-3.5 text-base font-bold text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all"
                                >
                                    {t('welcome.register')}
                                </Link>
                            )}
                        </div>
                    </section>

                    {/* Featured Novels Section */}
                    {featuredNovels && featuredNovels.length > 0 && (
                        <section className="py-16 bg-white dark:bg-zinc-900/50 border-t border-gray-200/80 dark:border-zinc-800">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                                            {t('dashboard.discover')}
                                        </h2>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            {t('dashboard.discoverSubtitle')}
                                        </p>
                                    </div>
                                    <Link
                                        href={route('novels.index')}
                                        className="text-sm font-semibold text-brand hover:text-brand/80 transition-colors inline-flex items-center gap-1"
                                    >
                                        {t('catalog.browse_novels')} &rarr;
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {featuredNovels.map((novel) => {
                                        const title =
                                            locale === 'en' && novel.title_en
                                                ? novel.title_en
                                                : novel.title_ar;
                                        const description =
                                            locale === 'en' && novel.description_en
                                                ? novel.description_en
                                                : novel.description_ar;
                                        const coverSrc =
                                            novel.cover_image_url ||
                                            (novel.cover_image_path
                                                ? novel.cover_image_path.startsWith('http')
                                                    ? novel.cover_image_path
                                                    : `/storage/${novel.cover_image_path}`
                                                : null);

                                        return (
                                            <Link
                                                key={novel.id}
                                                href={route('novels.show', novel.slug)}
                                                className="group flex flex-col bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                            >
                                                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
                                                    {coverSrc ? (
                                                        <img
                                                            src={coverSrc}
                                                            alt={title}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center text-gray-400">
                                                            <svg
                                                                className="w-16 h-16"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={1}
                                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                />
                                                            </svg>
                                                        </div>
                                                    )}
                                                    {novel.price_dzd !== undefined && (
                                                        <div className="absolute top-3 end-3 bg-white/95 dark:bg-zinc-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 dark:text-white shadow-sm">
                                                            {novel.price_dzd} {t('novel.currency')}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-5 flex flex-col flex-1">
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand transition-colors line-clamp-1">
                                                        {title}
                                                    </h3>
                                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2 flex-1">
                                                        {description}
                                                    </p>
                                                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                                                        <span className="text-brand font-semibold text-xs flex items-center gap-1 group-hover:gap-1.5 transition-all">
                                                            {t('catalog.read_more')}{' '}
                                                            <span aria-hidden="true">&rarr;</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    )}
                </main>

                {/* Footer */}
                <footer className="border-t border-gray-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>&copy; {new Date().getFullYear()} {t('appName') || 'Selena'}. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
}
