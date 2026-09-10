import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import useTranslate from '@/Hooks/useTranslate';

export default function ForgotPassword({ status }) {
    const { t } = useTranslate();
    const { locale = 'ar' } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title={t('auth.forgotPasswordTitle')} />

            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-900">
                    {t('auth.forgotPasswordTitle')}
                </h1>
            </div>

            <div className="mb-4 text-sm text-gray-600">
                {t('auth.forgotPasswordDescription')}
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value={t('auth.email')} />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder={t('auth.emailPlaceholder')}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="flex items-center justify-between pt-2">
                    <Link
                        href={route('login')}
                        className="text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        {t('auth.backToLogin')}
                    </Link>

                    <PrimaryButton disabled={processing}>
                        {t('auth.emailPasswordResetLink')}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
