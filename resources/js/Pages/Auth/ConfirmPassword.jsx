import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { t } from '@/translations';

export default function ConfirmPassword() {
    const { locale = 'ar' } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title={t('auth.confirmPasswordTitle', locale)} />

            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-900">
                    {t('auth.confirmPasswordTitle', locale)}
                </h1>
            </div>

            <div className="mb-4 text-sm text-gray-600">
                {t('auth.confirmPasswordDescription', locale)}
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="password" value={t('auth.password', locale)} />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder={t('auth.passwordPlaceholder', locale)}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-end pt-2">
                    <PrimaryButton disabled={processing}>
                        {t('auth.confirmButton', locale)}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
