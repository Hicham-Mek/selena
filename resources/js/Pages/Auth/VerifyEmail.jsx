import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import useTranslate from '@/Hooks/useTranslate';

export default function VerifyEmail({ status }) {
    const { t } = useTranslate();
    const { locale = 'ar' } = usePage().props;
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title={t('auth.verifyEmailTitle')} />

            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-900">
                    {t('auth.verifyEmailTitle')}
                </h1>
            </div>

            <div className="mb-4 text-sm text-gray-600">
                {t('auth.verifyEmailDescription')}
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {t('auth.verificationLinkSent')}
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton disabled={processing}>
                        {t('auth.resendVerificationEmail')}
                    </PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        {t('auth.logout')}
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
