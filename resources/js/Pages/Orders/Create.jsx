import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from '@/translations';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ novel, paymentInfo }) {
    const { t, locale, isRtl } = useTranslation();
    const title = locale === 'en' && novel.title_en ? novel.title_en : novel.title_ar;
    const [dragOver, setDragOver] = useState(false);

    const form = useForm({
        receipt: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.post(route('orders.store', novel.slug), {
            forceFormData: true,
        });
    };

    const handleFileChange = (e) => {
        form.setData('receipt', e.target.files[0] || null);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            form.setData('receipt', file);
        }
    };

    const statusBadgeColor = (status) => {
        const colors = {
            pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
            under_review: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
            approved: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
            rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
        };
        return colors[status] || colors.pending;
    };

    return (
        <>
            <Head title={`${t('order.purchase_novel')} — ${title}`} />
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
                    {/* Novel Summary */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 p-6 mb-8">
                        <div className="flex gap-5 items-start">
                            {novel.cover_image_path && (
                                <img
                                    src={`/storage/${novel.cover_image_path}`}
                                    alt={title}
                                    className="w-20 h-28 object-cover rounded-lg shadow-md shrink-0"
                                />
                            )}
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
                                <div className="mt-2 flex items-center gap-3">
                                    <span className="text-lg font-bold text-[#FF2D20]">
                                        {novel.price_dzd} {t('novel.currency')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Instructions */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 p-6 mb-8">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {t('order.payment_instructions')}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                            {t('order.payment_instructions_subtitle')}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* CCP Card */}
                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl p-5 border border-amber-200 dark:border-amber-800/50">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-amber-900 dark:text-amber-200">{t('order.ccp_title')}</h3>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-amber-700 dark:text-amber-400">{t('order.account_number')}:</span>
                                        <span className="font-mono font-bold text-amber-900 dark:text-amber-200 select-all">{paymentInfo.ccp_account}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-amber-700 dark:text-amber-400">{t('order.ccp_key')}:</span>
                                        <span className="font-mono font-bold text-amber-900 dark:text-amber-200 select-all">{paymentInfo.ccp_key}</span>
                                    </div>
                                </div>
                            </div>

                            {/* BaridiMob Card */}
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl p-5 border border-green-200 dark:border-green-800/50">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-green-900 dark:text-green-200">{t('order.baridimob_title')}</h3>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-green-700 dark:text-green-400">{t('order.rip_number')}:</span>
                                        <span className="font-mono font-bold text-green-900 dark:text-green-200 select-all">{paymentInfo.baridimob_rip}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Account Holder & Reference */}
                        <div className="mt-4 bg-gray-50 dark:bg-zinc-800 rounded-xl p-4 border border-gray-200 dark:border-zinc-700">
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">{t('order.account_holder')}:</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{paymentInfo.account_holder}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">{t('order.payment_reference')}:</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{paymentInfo.reference_instructions}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Receipt Upload Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 p-6 mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                {t('order.upload_receipt')}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                {t('order.receipt_helper')}
                            </p>

                            {/* Drag-and-drop zone */}
                            <div
                                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                                    dragOver
                                        ? 'border-[#FF2D20] bg-red-50 dark:bg-red-950/20'
                                        : form.data.receipt
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
                                {form.data.receipt ? (
                                    <div className="flex flex-col items-center gap-2">
                                        <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">{form.data.receipt.name}</span>
                                        <span className="text-xs text-gray-500">({(form.data.receipt.size / 1024 / 1024).toFixed(2)} MB)</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {t('order.upload_receipt')}
                                        </span>
                                        <span className="text-xs text-gray-400">{t('order.receipt_helper')}</span>
                                    </div>
                                )}
                            </div>

                            {form.errors.receipt && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{form.errors.receipt}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="w-full py-3 px-6 bg-[#FF2D20] hover:bg-[#e0261b] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-500/20"
                        >
                            {form.processing ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                </span>
                            ) : (
                                t('order.submit_order')
                            )}
                        </button>
                    </form>
                </main>
            </div>
        </>
    );
}
