import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { useTranslation } from '@/translations';
import { usePage } from '@inertiajs/react';

export default function NovelShow({ novel }) {
    const { t, locale, isRtl } = useTranslation();
    const { auth } = usePage().props;

    const title = locale === 'en' && novel.title_en ? novel.title_en : novel.title_ar;
    const description = locale === 'en' && novel.description_en ? novel.description_en : novel.description_ar;

    const content = (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Novel Header */}
                    <div className="flex flex-col sm:flex-row gap-6 mb-8">
                        {novel.cover_image_path && (
                            <div className="shrink-0">
                                <img
                                    src={`/storage/${novel.cover_image_path}`}
                                    alt={title}
                                    className="w-40 h-60 object-cover rounded-lg shadow-lg"
                                />
                            </div>
                        )}
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                {title}
                            </h1>
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                    novel.status === 'published'
                                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                                }`}>
                                    {novel.status === 'published'
                                        ? t('novel.published')
                                        : t('novel.draft')}
                                </span>
                                <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                                    {novel.price_dzd} {t('novel.currency')}
                                </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {description}
                            </p>
                        </div>
                    </div>

                    {/* Chapters List */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {t('novel.chapters')} ({novel.chapters.length})
                            </h2>
                        </div>
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {novel.chapters.map((chapter) => (
                                <li key={chapter.id}>
                                    {chapter.is_preview ? (
                                        <Link
                                            href={route('chapters.show', {
                                                novel: novel.slug,
                                                chapter: chapter.id,
                                            })}
                                            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-sm font-bold">
                                                    {chapter.chapter_number}
                                                </span>
                                                <span className="text-gray-900 dark:text-white font-medium">
                                                    {chapter.title}
                                                </span>
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                    {t('novel.freePreview')}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-400">
                                                {chapter.has_audio && (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0 0l-4-4m4 4l4-4M18.364 5.636a9 9 0 010 12.728" />
                                                    </svg>
                                                )}
                                                <svg className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </Link>
                                    ) : (
                                        <div className="flex items-center justify-between px-6 py-4 opacity-60">
                                            <div className="flex items-center gap-3">
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm font-bold">
                                                    {chapter.chapter_number}
                                                </span>
                                                <span className="text-gray-700 dark:text-gray-300 font-medium">
                                                    {chapter.title}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-400">
                                                {chapter.has_audio && (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0 0l-4-4m4 4l4-4M18.364 5.636a9 9 0 010 12.728" />
                                                    </svg>
                                                )}
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );

    // Use authenticated layout if logged in, guest layout otherwise
    if (auth?.user) {
        return <AuthenticatedLayout>{content}</AuthenticatedLayout>;
    }

    return content;
}
