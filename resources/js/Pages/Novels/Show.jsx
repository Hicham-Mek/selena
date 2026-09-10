import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import useTranslate from '@/Hooks/useTranslate';
import { usePage } from '@inertiajs/react';

export default function NovelShow({ novel, purchaseStatus }) {
    const { t, locale, isRtl } = useTranslate();
    const { auth } = usePage().props;

    const title = locale === 'en' && novel.title_en ? novel.title_en : novel.title_ar;
    const description = locale === 'en' && novel.description_en ? novel.description_en : novel.description_ar;

    // Determine what purchase button to show
    const renderPurchaseAction = () => {
        if (!auth?.user) {
            return (
                <Link
                    href={route('login')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF2D20] hover:bg-[#e0261b] text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-500/20"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    {t('order.login_to_purchase')}
                </Link>
            );
        }

        if (purchaseStatus === 'owned') {
            return (
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 font-bold rounded-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t('order.purchased')}
                </span>
            );
        }

        if (purchaseStatus === 'pending') {
            return (
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 font-bold rounded-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t('order.order_pending')}
                </span>
            );
        }

        if (purchaseStatus === 'under_review') {
            return (
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 font-bold rounded-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {t('order.already_ordered')}
                </span>
            );
        }

        // No active order — show purchase button
        return (
            <Link
                href={route('orders.create', novel.slug)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF2D20] hover:bg-[#e0261b] text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-500/20"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                {t('order.purchase_novel')} — {novel.price_dzd} {t('novel.currency')}
            </Link>
        );
    };

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
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                {description}
                            </p>

                            {/* Purchase Action */}
                            {renderPurchaseAction()}
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
                            {novel.chapters.map((chapter) => {
                                const isOwned = purchaseStatus === 'owned';
                                const canAccess = chapter.is_preview || isOwned;

                                return (
                                    <li key={chapter.id}>
                                        {canAccess ? (
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
                                                        {locale === 'en' && chapter.title_en ? chapter.title_en : chapter.title}
                                                    </span>
                                                    {chapter.is_preview ? (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                            {t('novel.freePreview')}
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            {t('chapter.purchasedBadge')}
                                                        </span>
                                                    )}
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
                                                        {locale === 'en' && chapter.title_en ? chapter.title_en : chapter.title}
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
                                );
                            })}
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
