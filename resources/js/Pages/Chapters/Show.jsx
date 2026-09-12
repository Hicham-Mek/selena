import { Head, Link, router } from '@inertiajs/react';
import useTranslate from '@/Hooks/useTranslate';
import { usePage } from '@inertiajs/react';
import DOMPurify from 'dompurify';

export default function ChapterShow({ chapter, novel, prevChapter, nextChapter, audio_url, isOwned = false }) {
    const { t, locale, isRtl } = useTranslate();
    const { auth } = usePage().props;

    const novelTitle   = locale === 'en' && novel.title_en   ? novel.title_en   : novel.title_ar;
    const chapterTitle = locale === 'en' && chapter.title_en ? chapter.title_en : chapter.title;

    /**
     * If the 2-hour signed audio URL expires while the user has the tab open,
     * the <audio> element fires an error. We silently request a fresh signed URL
     * from the server using Inertia's partial reload (only re-fetches audio_url).
     */
    const handleAudioError = () => {
        router.reload({ only: ['audio_url'] });
    };

    return (
        <>
            <Head title={`${chapterTitle} — ${novelTitle}`} />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900" onContextMenu={(e) => e.preventDefault()}>
                {/* Top Navigation Bar */}
                <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-14">
                            <Link
                                href={route('novels.show', { novel: novel.slug })}
                                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                <svg className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                <span className="text-sm font-medium">{t('chapter.backToNovel')}</span>
                            </Link>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {novelTitle}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Chapter Content */}
                <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Chapter Header */}
                    <header className="mb-8 text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                                {t('chapter.chapterNumber', { number: chapter.chapter_number })}
                            </span>
                            {/* Content Type Badge — Free Preview or Purchased */}
                            {chapter.is_preview ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    {t('chapter.previewBadge')}
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
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                            {chapterTitle}
                        </h1>
                    </header>

                    {/* Audio Player — uses server-generated 2-hour signed URL */}
                    {chapter.has_audio && audio_url && (
                        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0 0l-4-4m4 4l4-4M18.364 5.636a9 9 0 010 12.728" />
                                </svg>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t('chapter.listen')}
                                </span>
                            </div>
                            {/*
                              * key={audio_url} forces React to unmount and remount the <audio>
                              * element whenever a fresh signed URL is loaded via Inertia partial
                              * reload, ensuring the browser picks up the new src immediately.
                              */}
                            <audio
                                key={audio_url}
                                controls
                                controlsList="nodownload"
                                preload="metadata"
                                className="w-full"
                                src={audio_url}
                                onError={handleAudioError}
                            >
                                {t('chapter.audioNotSupported')}
                            </audio>
                        </div>
                    )}

                    {/* Chapter Text (Rich HTML) */}
                    <div
                        className="select-none text-right prose prose-lg dark:prose-invert max-w-none font-serif text-xl sm:text-2xl leading-loose
                            prose-headings:font-sans prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                            prose-p:text-gray-800 dark:prose-p:text-gray-200 prose-p:leading-[2.2]
                            prose-blockquote:border-indigo-500 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
                            prose-strong:text-gray-900 dark:prose-strong:text-white
                            prose-a:text-indigo-600 dark:prose-a:text-indigo-400"
                        dir="rtl"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(chapter.content_text) }}
                    />

                    {/* Chapter Navigation */}
                    <nav className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                            {/* Previous Chapter */}
                            {prevChapter ? (
                                (prevChapter.is_preview || isOwned) ? (
                                    <Link
                                        href={route('chapters.show', { novel: novel.slug, chapter: prevChapter.id })}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-gray-700/50 transition-all group flex-1 shadow-sm"
                                    >
                                        <svg className={`w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex-shrink-0 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        <div className="text-start">
                                            <span className="block text-xs text-gray-500 dark:text-gray-400">{t('chapter.previousChapter')}</span>
                                            <span className="block text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                {locale === 'en' && prevChapter.title_en ? prevChapter.title_en : prevChapter.title}
                                            </span>
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 opacity-70 flex-1">
                                        <svg className={`w-5 h-5 text-gray-400 flex-shrink-0 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        <div className="text-start">
                                            <div className="flex items-center gap-1.5 mb-0.5">
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{t('chapter.previousChapter')}</span>
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300">
                                                    🔒 {t('chapter.lockedBadge')}
                                                </span>
                                            </div>
                                            <span className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                                                {locale === 'en' && prevChapter.title_en ? prevChapter.title_en : prevChapter.title}
                                            </span>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <Link
                                    href={route('novels.show', { novel: novel.slug })}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all group flex-1 shadow-sm"
                                >
                                    <svg className={`w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex-shrink-0 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <div className={isRtl ? 'text-right' : 'text-left'}>
                                        <span className="block text-xs text-gray-500 dark:text-gray-400">{novelTitle}</span>
                                        <span className="block text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{t('chapter.backToNovel')}</span>
                                    </div>
                                </Link>
                            )}

                            {/* Next Chapter */}
                            {nextChapter ? (
                                (nextChapter.is_preview || isOwned) ? (
                                    <Link
                                        href={route('chapters.show', { novel: novel.slug, chapter: nextChapter.id })}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all group flex-1 shadow-sm text-end"
                                    >
                                    <div className="flex-1 text-end">
                                            <span className="block text-xs text-gray-500 dark:text-gray-400">{t('chapter.nextChapter')}</span>
                                            <span className="block text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                {locale === 'en' && nextChapter.title_en ? nextChapter.title_en : nextChapter.title}
                                            </span>
                                        </div>
                                        <svg className={`w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex-shrink-0 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                ) : (
                                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 opacity-70 flex-1 text-end">
                                    <div className="flex-1 text-end">
                                            <div className="flex items-center gap-1.5 mb-0.5 justify-end">
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{t('chapter.nextChapter')}</span>
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300">
                                                    🔒 {t('chapter.lockedBadge')}
                                                </span>
                                            </div>
                                            <span className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                                                {locale === 'en' && nextChapter.title_en ? nextChapter.title_en : nextChapter.title}
                                            </span>
                                        </div>
                                        <svg className={`w-5 h-5 text-gray-400 flex-shrink-0 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                )
                            ) : (
                                <Link
                                    href={route('novels.show', { novel: novel.slug })}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all group flex-1 shadow-sm text-end"
                                >
                                    <div className="flex-1 text-end">
                                        <span className="block text-xs text-gray-500 dark:text-gray-400">{novelTitle}</span>
                                        <span className="block text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{t('chapter.backToNovel')}</span>
                                    </div>
                                    <svg className={`w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex-shrink-0 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            )}
                        </div>
                    </nav>
                </article>
            </div>
        </>
    );
}
