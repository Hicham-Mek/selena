import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from '@/translations';
import { useState } from 'react';

export default function Show({ order, novel }) {
    const { t, locale, isRtl } = useTranslation();
    const title = locale === 'en' && novel.title_en ? novel.title_en : novel.title_ar;
    const [dragOver, setDragOver] = useState(false);

    const receiptForm = useForm({
        receipt: null,
    });

    const handleReceiptSubmit = (e) => {
        e.preventDefault();
        receiptForm.post(route('orders.upload-receipt', order.id), {
            forceFormData: true,
        });
    };

    const handleFileChange = (e) => {
        receiptForm.setData('receipt', e.target.files[0] || null);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            receiptForm.setData('receipt', file);
        }
    };

    const statusConfig = {
        pending: {
            color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        under_review: {
            color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            ),
        },
        approved: {
            color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        rejected: {
            color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
    };

    const currentStatus = statusConfig[order.status] || statusConfig.pending;

    return (
        <>
            <Head title={t('order.order_confirmation')} />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950" dir={isRtl ? 'rtl' : 'ltr'}>
                {/* Header */}
                <header className="bg-white dark:bg-zinc-900 shadow-sm border-b border-gray-100 dark:border-zinc-800">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                        <Link
                            href={route('novels.show', novel.slug)}
                            className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1"
                        >
                            <svg className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            {t('order.back_to_novel')}
                        </Link>
                    </div>
                </header>

                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Success banner */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 p-6 mb-8 text-center">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4 ${currentStatus.color}`}>
                            {currentStatus.icon}
                            {t(`order.status_${order.status}`)}
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {t('order.order_confirmation')}
                        </h1>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">
                            {t('order.order_submitted')}
                        </p>
                    </div>

                    {/* Order Details */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 p-6 mb-8">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                            {t('order.order_details')}
                        </h2>

                        <div className="flex gap-5 items-start mb-6">
                            {novel.cover_image_path && (
                                <img
                                    src={`/storage/${novel.cover_image_path}`}
                                    alt={title}
                                    className="w-16 h-24 object-cover rounded-lg shadow-md shrink-0"
                                />
                            )}
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {t('order.order_amount')}: <span className="font-bold text-[#FF2D20]">{order.amount_paid} {t('novel.currency')}</span>
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="bg-gray-50 dark:bg-zinc-800 rounded-xl p-4">
                                <span className="text-gray-500 dark:text-gray-400">{t('order.order_status')}</span>
                                <div className={`mt-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${currentStatus.color}`}>
                                    {currentStatus.icon}
                                    {t(`order.status_${order.status}`)}
                                </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-zinc-800 rounded-xl p-4">
                                <span className="text-gray-500 dark:text-gray-400">{t('order.order_date')}</span>
                                <p className="mt-1 font-medium text-gray-900 dark:text-white">{order.created_at}</p>
                            </div>
                        </div>

                        {/* Receipt Status */}
                        <div className="mt-4 bg-gray-50 dark:bg-zinc-800 rounded-xl p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-gray-500 dark:text-gray-400 text-sm">{t('order.upload_receipt')}</span>
                                    <p className={`mt-1 text-sm font-medium ${order.has_receipt ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                        {order.has_receipt ? t('order.receipt_uploaded') : t('order.no_receipt')}
                                    </p>
                                </div>
                                {order.has_receipt && (
                                    <a
                                        href={route('orders.receipt', order.id)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium text-[#FF2D20] hover:text-[#e0261b]"
                                    >
                                        {t('order.view_receipt')}
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Rejection Reason */}
                        {order.status === 'rejected' && order.rejection_reason && (
                            <div className="mt-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/50 rounded-xl p-4">
                                <h4 className="text-sm font-bold text-red-800 dark:text-red-300">{t('order.rejection_reason')}</h4>
                                <p className="mt-1 text-sm text-red-700 dark:text-red-400">{order.rejection_reason}</p>
                            </div>
                        )}
                    </div>

                    {/* Upload Receipt Form (only for pending orders without receipt) */}
                    {order.status === 'pending' && !order.has_receipt && (
                        <form onSubmit={handleReceiptSubmit}>
                            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 p-6 mb-6">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                    {t('order.upload_receipt')}
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                    {t('order.receipt_helper')}
                                </p>

                                <div
                                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                                        dragOver
                                            ? 'border-[#FF2D20] bg-red-50 dark:bg-red-950/20'
                                            : receiptForm.data.receipt
                                                ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/20'
                                                : 'border-gray-300 dark:border-zinc-700 hover:border-gray-400 dark:hover:border-zinc-600'
                                    }`}
                                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                    onDragLeave={() => setDragOver(false)}
                                    onDrop={handleDrop}
                                >
                                    <input
                                        type="file"
                                        id="receipt"
                                        accept=".jpeg,.jpg,.png,.pdf"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    {receiptForm.data.receipt ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">{receiptForm.data.receipt.name}</span>
                                            <span className="text-xs text-gray-500">({(receiptForm.data.receipt.size / 1024 / 1024).toFixed(2)} MB)</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2">
                                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {t('order.upload_receipt')}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {receiptForm.errors.receipt && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{receiptForm.errors.receipt}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={receiptForm.processing || !receiptForm.data.receipt}
                                className="w-full py-3 px-6 bg-[#FF2D20] hover:bg-[#e0261b] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-500/20"
                            >
                                {receiptForm.processing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                    </span>
                                ) : (
                                    t('order.submit_receipt')
                                )}
                            </button>
                        </form>
                    )}
                </main>
            </div>
        </>
    );
}
