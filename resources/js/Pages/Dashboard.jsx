import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import useTranslate from '@/Hooks/useTranslate';

export default function Dashboard({ library = [], orders = [], profile = {}, discover = [] }) {
    const { auth, locale = 'ar', dir = 'rtl' } = usePage().props;
    const { t } = useTranslate();

    const formatDate = (dateString, currentLocale) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat(currentLocale === 'ar' ? 'ar' : 'en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }).format(date);
        } catch {
            return dateString;
        }
    };

    const getStatusBadge = (status) => {
        const labels = {
            pending: t('order.status_pending'),
            under_review: t('order.status_under_review'),
            approved: t('order.status_approved'),
            rejected: t('order.status_rejected'),
        };
        const label = labels[status] || status;

        switch (status) {
            case 'pending':
                return (
                    <span className="inline-flex items-center rounded-md bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                        {label}
                    </span>
                );
            case 'under_review':
                return (
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        {label}
                    </span>
                );
            case 'approved':
                return (
                    <span className="inline-flex items-center rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                        {label}
                    </span>
                );
            case 'rejected':
                return (
                    <span className="inline-flex items-center rounded-md bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                        {label}
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                        {label}
                    </span>
                );
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-gray-800">
                    {t('dashboard.title')}
                </h2>
            }
        >
            <Head title={t('dashboard.title')} />

            <div className="py-12" dir={dir}>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Section 1: My Library */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-xl ring-1 ring-gray-900/5">
                        <div className="border-b border-gray-200 bg-gray-50/50 px-6 py-5 flex justify-between items-center">
                            <h3 className="text-lg font-bold leading-6 text-gray-900">
                                {t('dashboard.myLibrary')}
                            </h3>
                        </div>
                        <div className="px-6 py-6 sm:p-6">
                            {library.length === 0 ? (
                                <div className="text-center py-10">
                                    <h3 className="mt-2 text-sm font-semibold text-gray-900">
                                        {t('dashboard.noNovelsTitle')}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {t('dashboard.noNovelsSubtitle')}
                                    </p>
                                    <div className="mt-6">
                                        <Link
                                            href={route('novels.index')}
                                            className="inline-flex items-center rounded-xl bg-brand px-4 py-2 text-sm font-bold text-white shadow-sm shadow-brand/20 hover:bg-brand-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand transition-colors"
                                        >
                                            {t('dashboard.browseNovels')}
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                    {library.map((novel) => {
                                        const novelTitle = locale === 'en' && novel.title_en ? novel.title_en : novel.title_ar;
                                        const readLink = novel.first_chapter_id 
                                            ? route('chapters.show', [novel.slug, novel.first_chapter_id])
                                            : route('novels.show', novel.slug);

                                        return (
                                            <div key={novel.id} className="group relative flex flex-col overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                                                <div className="aspect-[3/4] w-full overflow-hidden bg-gray-100">
                                                    {novel.cover_url ? (
                                                        <img
                                                            src={novel.cover_url}
                                                            alt={novelTitle}
                                                            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center text-gray-400">
                                                            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-1 flex-col p-4 bg-white z-10">
                                                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-brand transition-colors line-clamp-2">
                                                        {novelTitle}
                                                    </h3>
                                                    <div className="mt-4 flex-1 flex items-end">
                                                        <Link
                                                            href={readLink}
                                                            className="block w-full rounded-lg bg-brand/10 px-3 py-2 text-center text-sm font-bold text-brand hover:bg-brand hover:text-white transition-colors"
                                                        >
                                                            {t('dashboard.continueReading')}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Section 1.5: Discover */}
                    {discover && discover.length > 0 && (
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-xl ring-1 ring-gray-900/5">
                            <div className="border-b border-gray-200 bg-gray-50/50 px-6 py-5 flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-bold leading-6 text-gray-900">
                                        {t('dashboard.discover')}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {t('dashboard.discoverSubtitle')}
                                    </p>
                                </div>
                                <Link
                                    href={route('novels.index')}
                                    className="text-brand font-bold text-sm hover:underline hidden sm:block"
                                >
                                    {t('dashboard.browseNovels')} &rarr;
                                </Link>
                            </div>
                            <div className="px-6 py-6 sm:p-6">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                    {discover.map((novel) => {
                                        const novelTitle = locale === 'en' && novel.title_en ? novel.title_en : novel.title_ar;
                                        return (
                                            <div key={novel.id} className="group relative flex flex-col overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                                                <div className="aspect-[3/4] w-full overflow-hidden bg-gray-100">
                                                    {novel.cover_url ? (
                                                        <img
                                                            src={novel.cover_url}
                                                            alt={novelTitle}
                                                            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center text-gray-400">
                                                            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-1 flex-col p-4 bg-white z-10">
                                                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-brand transition-colors line-clamp-2 mb-2">
                                                        {novelTitle}
                                                    </h3>
                                                    <div className="mt-auto">
                                                        <div className="flex justify-between items-center mb-4">
                                                            <span className="font-bold text-gray-900">{novel.price_dzd} {t('novel.currency')}</span>
                                                        </div>
                                                        <Link
                                                            href={route('novels.show', novel.slug)}
                                                            className="block w-full rounded-lg bg-gray-50 px-3 py-2 text-center text-sm font-bold text-gray-700 hover:bg-gray-100 transition-colors"
                                                        >
                                                            {t('dashboard.viewDetails')}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Grid for Order History and Account */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Section 2: Order History */}
                        <div className="lg:col-span-2 overflow-hidden bg-white shadow-sm sm:rounded-xl ring-1 ring-gray-900/5 h-fit">
                            <div className="border-b border-gray-200 bg-gray-50/50 px-6 py-5 flex justify-between items-center">
                                <h3 className="text-lg font-bold leading-6 text-gray-900">
                                    {t('dashboard.orderHistory')}
                                </h3>
                            </div>
                            <div className="px-6 py-6 sm:p-0">
                                {orders.length === 0 ? (
                                    <div className="text-center py-10">
                                        <p className="text-sm text-gray-500">
                                            {t('dashboard.noOrders')}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flow-root">
                                        <div className="overflow-x-auto">
                                            <div className="inline-block min-w-full align-middle">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th scope="col" className="py-3.5 pe-4 ps-6 text-start text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                                {t('dashboard.tableNovel')}
                                                            </th>
                                                            <th scope="col" className="px-3 py-3.5 text-start text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                                {t('dashboard.tableDate')}
                                                            </th>
                                                            <th scope="col" className="px-3 py-3.5 text-start text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                                {t('dashboard.tableAmount')}
                                                            </th>
                                                            <th scope="col" className="px-3 py-3.5 text-start text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                                {t('dashboard.tableStatus')}
                                                            </th>
                                                            <th scope="col" className="relative py-3.5 pe-6 ps-3 text-end">
                                                                <span className="sr-only">
                                                                    {t('dashboard.tableActions')}
                                                                </span>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-100 bg-white">
                                                        {orders.map((order) => {
                                                            const novelTitle = locale === 'en' && order.novel_title_en ? order.novel_title_en : (order.novel_title_ar || '-');
                                                            return (
                                                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                                                    <td className="whitespace-nowrap py-4 pe-4 ps-6 text-sm font-medium text-gray-900 text-start">
                                                                        {novelTitle}
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-start">
                                                                        <bdi>{formatDate(order.created_at, locale)}</bdi>
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-start">
                                                                        <span className="font-semibold text-gray-900">{order.amount_paid}</span> {t('novel.currency')}
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-start">
                                                                        {getStatusBadge(order.status)}
                                                                        {order.status === 'rejected' && order.rejection_reason && (
                                                                            <p className="mt-1 text-xs text-red-600 max-w-[220px] truncate" title={order.rejection_reason}>
                                                                                {t('dashboard.rejectionReasonPrefix')} {order.rejection_reason}
                                                                            </p>
                                                                        )}
                                                                    </td>
                                                                    <td className="relative whitespace-nowrap py-4 pe-6 ps-3 text-end text-sm font-medium">
                                                                        {order.status === 'pending' && (
                                                                            <Link
                                                                                href={route('orders.show', order.id)}
                                                                                className="text-amber-600 hover:text-amber-800"
                                                                            >
                                                                                {t('dashboard.attachReceipt')}
                                                                            </Link>
                                                                        )}
                                                                        {order.status === 'rejected' && (
                                                                            <div className="flex items-center justify-end gap-3">
                                                                                {order.novel_slug && (
                                                                                    <Link
                                                                                        href={route('orders.create', order.novel_slug)}
                                                                                        className="text-brand hover:text-brand-hover font-bold text-xs inline-flex items-center gap-1"
                                                                                    >
                                                                                        {t('dashboard.repurchase')}
                                                                                    </Link>
                                                                                )}
                                                                                <Link
                                                                                    href={route('orders.show', order.id)}
                                                                                    className="text-gray-500 hover:text-gray-700 text-xs"
                                                                                >
                                                                                    {t('dashboard.viewDetails')}
                                                                                </Link>
                                                                            </div>
                                                                        )}
                                                                        {order.status === 'approved' && order.novel_slug && (
                                                                            <Link
                                                                                href={route('novels.show', order.novel_slug)}
                                                                                className="text-emerald-600 hover:text-emerald-800 text-xs font-semibold"
                                                                            >
                                                                                {t('dashboard.continueReading')}
                                                                            </Link>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Section 3: My Account (Moved to side/bottom) */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-xl ring-1 ring-gray-900/5 h-fit">
                            <div className="border-b border-gray-200 bg-gray-50/50 px-6 py-5">
                                <h3 className="text-lg font-bold leading-6 text-gray-900">
                                    {t('dashboard.myAccount')}
                                </h3>
                            </div>
                            <div className="px-6 py-6 sm:p-6">
                                <dl className="space-y-6">
                                    <div>
                                        <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            {t('dashboard.name')}
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 font-medium">
                                            {profile.first_name || profile.last_name 
                                                ? `${profile.first_name} ${profile.last_name}`.trim()
                                                : (auth.user?.name || t('dashboard.notAvailable'))}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            {t('dashboard.email')}
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 text-start font-medium" dir="ltr">
                                            {profile.email || auth.user?.email}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            {t('dashboard.phone')}
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 text-start font-medium" dir="ltr">
                                            {profile.phone_number || t('dashboard.notAvailable')}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
