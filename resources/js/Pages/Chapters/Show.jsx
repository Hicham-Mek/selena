import { Head, Link } from '@inertiajs/react';
import { useTranslation } from '@/translations';
import { usePage } from '@inertiajs/react';

export default function ChapterShow({ chapter, novel, prevChapter, nextChapter }) {
    const { t, locale, isRtl } = useTranslation();
    const { auth } = usePage().props;

    const novelTitle = locale === 'en' && novel.title_en ? novel.title_en : novel.title_ar;

    return (
        <>
            <Head title={`${chapter.title} — ${novelTitle}`} />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
                            {chapter.is_preview && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    {t('chapter.previewBadge')}
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                            {chapter.title}
                        </h1>
                    </header>

                    {/* Audio Player */}
                    {chapter.has_audio && (
                        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0 0l-4-4m4 4l4-4M18.364 5.636a9 9 0 010 12.728" />
                                </svg>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t('chapter.listen')}
                                </span>
                            </div>
                            <audio
                                controls
                                preload="metadata"
                                className="w-full"
                                src={route('chapters.audio', { chapter: chapter.id })}
                            >
                                {t('chapter.audioNotSupported')}
                            </audio>
                        </div>
                    )}

                    {/* Chapter Text (Rich HTML) */}
                    <div
                        className="prose prose-lg dark:prose-invert max-w-none
                            prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                            prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                            prose-blockquote:border-indigo-500 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
                            prose-strong:text-gray-900 dark:prose-strong:text-white
                            prose-a:text-indigo-600 dark:prose-a:text-indigo-400"
                        dangerouslySetInnerHTML={{ __html: chapter.content_text }}
                    />

                    {/* Chapter Navigation */}
                    <nav className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                            {/* Previous Chapter or Back to Novel */}
                            {prevChapter ? (
                                prevChapter.is_preview ? (
                                    <Link
                                        href={route('chapters.show', {
                                            novel: novel.slug,
                                            chapter: prevChapter.id,
                                        })}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-gray-700/50 transition-all group flex-1 shadow-sm"
                                    >
                                        <svg className={`w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex-shrink-0 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        <div className={isRtl ? 'text-right' : 'text-left'}>
                                            <span className="block text-xs text-gray-500 dark:text-gray-400">{t('chapter.previousChapter')}</span>
                                            <span className="block text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{prevChapter.title}</span>
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 opacity-70 flex-1">
                                        <svg className={`w-5 h-5 text-gray-400 flex-shrink-0 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        <div className={isRtl ? 'text-right' : 'text-left'}>
                                            <div className="flex items-center gap-1.5 mb-0.5">
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{t('chapter.previousChapter')}</span>
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300">
                                                    🔒 {t('chapter.lockedBadge')}
                                                </span>
                                            </div>
                                            <span className="block text-sm font-medium text-gray-600 dark:text-gray-400">{prevChapter.title}</span>
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

                            {/* Next Chapter or Back to Novel */}
                            {nextChapter ? (
                                nextChapter.is_preview ? (
                                    <Link
                                        href={route('chapters.show', {
                                            novel: novel.slug,
                                            chapter: nextChapter.id,
                                        })}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-gray-700/50 transition-all group flex-1 shadow-sm ${isRtl ? 'flex-row-reverse text-left' : 'flex-row text-right'}`}
                                    >
                                        <div className={`flex-1 ${isRtl ? 'text-left' : 'text-right'}`}>
                                            <span className="block text-xs text-gray-500 dark:text-gray-400">{t('chapter.nextChapter')}</span>
                                            <span className="block text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{nextChapter.title}</span>
                                        </div>
                                        <svg className={`w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex-shrink-0 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                ) : (
                                    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 opacity-70 flex-1 ${isRtl ? 'flex-row-reverse text-left' : 'flex-row text-right'}`}>
                                        <div className={`flex-1 ${isRtl ? 'text-left' : 'text-right'}`}>
                                            <div className={`flex items-center gap-1.5 mb-0.5 ${isRtl ? 'justify-start' : 'justify-end'}`}>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{t('chapter.nextChapter')}</span>
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300">
                                                    🔒 {t('chapter.lockedBadge')}
                                                </span>
                                            </div>
                                            <span className="block text-sm font-medium text-gray-600 dark:text-gray-400">{nextChapter.title}</span>
                                        </div>
                                        <svg className={`w-5 h-5 text-gray-400 flex-shrink-0 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                )
                            ) : (
                                <Link
                                    href={route('novels.show', { novel: novel.slug })}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all group flex-1 shadow-sm ${isRtl ? 'flex-row-reverse text-left' : 'flex-row text-right'}`}
                                >
                                    <div className={`flex-1 ${isRtl ? 'text-left' : 'text-right'}`}>
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
