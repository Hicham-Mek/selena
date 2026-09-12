import ApplicationLogo from '@/Components/ApplicationLogo';
import useTranslate from '@/Hooks/useTranslate';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ novels = [] }) {
    const { auth, locale = 'ar' } = usePage().props;
    const { t } = useTranslate();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100 flex flex-col">
            <Head title={t('catalog.title')} />

            {/* Navigation Header */}
            <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-zinc-900/80 border-b border-gray-200/80 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-3">
                            <Link href="/" className="flex items-center gap-3">
                                <ApplicationLogo className="h-12 w-auto" />
                                <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
                                    {t('appName') || 'Selena'}
                                </span>
                            </Link>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
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
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand to-red-400 sm:text-5xl">
                        {t('catalog.title')}
                    </h1>
                    <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                        {t('catalog.subtitle') || 'Discover and read our latest publications'}
                    </p>
                </div>

                {novels.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {novels.map((novel) => {
                            const title = locale === 'en' && novel.title_en ? novel.title_en : novel.title_ar;
                            const description = locale === 'en' && novel.description_en ? novel.description_en : novel.description_ar;
                            const coverSrc = novel.cover_image_url || (novel.cover_image_path ? (novel.cover_image_path.startsWith('http') ? novel.cover_image_path : `/storage/${novel.cover_image_path}`) : null);

                            return (
                                <Link
                                    key={novel.id}
                                    href={route('novels.show', novel.slug)}
                                    className="group flex flex-col bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
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
                                            <div className="absolute top-3 end-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-900 dark:text-white shadow-sm">
                                                {novel.price_dzd} {t('novel.currency')}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5 flex flex-col flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand transition-colors line-clamp-2">
                                            {title}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-3 flex-1">
                                            {description}
                                        </p>
                                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-zinc-800">
                                            <span className="text-brand font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                                {t('catalog.read_more')} <span aria-hidden="true">&rarr;</span>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 border-dashed">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                        </svg>
                        <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                            {t('catalog.empty_title')}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {t('catalog.empty_subtitle')}
                        </p>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                <p>&copy; {new Date().getFullYear()} {t('appName') || 'Selena'}. All rights reserved.</p>
            </footer>
        </div>
    );
}
