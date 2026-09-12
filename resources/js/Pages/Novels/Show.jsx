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

    const firstChapterId = novel.chapters?.[0]?.id;

    // Determine what purchase button to show
    const renderPurchaseAction = (isMobileSticky = false) => {
        const baseClass = `inline-flex items-center justify-center gap-2 px-6 py-3.5 font-bold rounded-xl transition-all ${isMobileSticky ? 'w-full text-lg shadow-md' : 'shadow-lg shadow-brand/20 hover:-translate-y-0.5'}`;
        
        if (!auth?.user) {
            return (
                <Link
                    href={route('login')}
                    className={`${baseClass} bg-brand hover:bg-brand-hover text-white`}
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
                <Link
                    href={firstChapterId ? route('chapters.show', [novel.slug, firstChapterId]) : '#'}
                    className={`${baseClass} bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {t('dashboard.continueReading')}
                </Link>
            );
        }

        if (purchaseStatus === 'pending') {
            return (
                <span className={`${baseClass} bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 cursor-not-allowed`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t('order.order_pending')}
                </span>
            );
        }

        if (purchaseStatus === 'under_review') {
            return (
                <span className={`${baseClass} bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 cursor-not-allowed`}>
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
                className={`${baseClass} bg-brand hover:bg-brand-hover text-white`}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                <span>{t('order.purchase_novel')} — {novel.price_dzd} {t('novel.currency')}</span>
            </Link>
        );
    };

    const content = (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 pb-24 sm:pb-8 relative">
                
                {/* Background decorative element */}
                <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-brand/5 to-transparent dark:from-brand/10 dark:to-transparent z-0"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
                    
                    {/* Back Link */}
                    <div className="mb-6">
                        <Link
                            href={route('novels.index')}
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand transition-colors"
                        >
                            <svg className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            {t('catalog.browse_novels')}
                        </Link>
                    </div>

                    {/* Novel Header Component */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 p-6 sm:p-8 mb-10 overflow-hidden">
                        <div className="flex flex-col sm:flex-row gap-8">
                            {novel.cover_image_path ? (
                                <div className="shrink-0 mx-auto sm:mx-0 w-48 sm:w-56 group perspective-1000">
                                    <div className="relative shadow-2xl rounded-xl overflow-hidden transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-3xl ring-1 ring-black/5">
                                        <img
                                            src={`/storage/${novel.cover_image_path}`}
                                            alt={title}
                                            className="w-full h-auto object-cover aspect-[2/3]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="shrink-0 mx-auto sm:mx-0 w-48 sm:w-56 aspect-[2/3] bg-gray-100 dark:bg-zinc-800 rounded-xl shadow-inner border border-gray-200 dark:border-zinc-700 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-gray-300 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}
                            
                            <div className="flex-1 flex flex-col pt-2">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                        novel.status === 'published'
                                            ? 'bg-emerald-100/80 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
                                            : 'bg-amber-100/80 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'
                                    }`}>
                                        {novel.status === 'published'
                                            ? t('novel.published')
                                            : t('novel.draft')}
                                    </span>
                                </div>
                                
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4 font-serif">
                                    {title}
                                </h1>
                                
                                <div className="mb-6 flex items-center gap-2">
                                    <span className="text-2xl sm:text-3xl font-bold text-brand">
                                        {novel.price_dzd} 
                                    </span>
                                    <span className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                                        {t('novel.currency')}
                                    </span>
                                </div>
                                
                                <div className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-8 flex-1 font-serif">
                                    {description}
                                </div>

                                {/* Desktop Purchase Action */}
                                <div className="hidden sm:block">
                                    {renderPurchaseAction()}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chapters List */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden mb-10">
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                {t('novel.chapters')}
                            </h2>
                            <span className="inline-flex items-center justify-center bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-full h-6 w-6">
                                {novel.chapters.length}
                            </span>
                        </div>
                        <ul className="divide-y divide-gray-100 dark:divide-zinc-800">
                            {novel.chapters.map((chapter) => {
                                const isOwned = purchaseStatus === 'owned';
                                const canAccess = chapter.is_preview || isOwned;

                                return (
                                    <li key={chapter.id} className="group">
                                        {canAccess ? (
                                            <Link
                                                href={route('chapters.show', {
                                                    novel: novel.slug,
                                                    chapter: chapter.id,
                                                })}
                                                className="flex items-center justify-between px-6 py-4 hover:bg-brand/5 transition-colors block w-full"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand/10 text-brand font-bold shadow-sm shadow-brand/10">
                                                        {chapter.chapter_number}
                                                    </span>
                                                    <div>
                                                        <span className="block text-gray-900 dark:text-white font-bold group-hover:text-brand transition-colors text-start">
                                                            {locale === 'en' && chapter.title_en ? chapter.title_en : chapter.title}
                                                        </span>
                                                        {chapter.is_preview && !isOwned && (
                                                            <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                                                                {t('novel.freePreview')}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-400 group-hover:text-brand transition-colors">
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
                                            <div className="flex items-center justify-between px-6 py-4 bg-gray-50/50 dark:bg-zinc-950/30">
                                                <div className="flex items-center gap-4 opacity-50">
                                                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-zinc-700 text-gray-500 dark:text-gray-400 font-bold">
                                                        {chapter.chapter_number}
                                                    </span>
                                                    <span className="block text-gray-700 dark:text-gray-300 font-medium">
                                                        {locale === 'en' && chapter.title_en ? chapter.title_en : chapter.title}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-300 dark:text-zinc-600">
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

                {/* Mobile Sticky Action Bar - Glassmorphism */}
                <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-t border-gray-200 dark:border-zinc-800 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <span className="font-bold text-gray-900 dark:text-white line-clamp-1 flex-1 text-sm">{title}</span>
                        <span className="font-bold text-brand ml-4 whitespace-nowrap">{novel.price_dzd} {t('novel.currency')}</span>
                    </div>
                    {renderPurchaseAction(true)}
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
