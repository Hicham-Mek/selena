import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { t } from '@/translations';

export default function Dashboard() {
    const { auth, locale = 'ar' } = usePage().props;
    const user = auth.user;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {t('dashboard.title', locale)}
                </h2>
            }
        >
            <Head title={t('dashboard.title', locale)} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">
                                    {t('dashboard.welcomeUser', locale, { name: user.name })}
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {t('dashboard.welcome', locale)}
                                </p>
                            </div>

                            <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                    user.is_admin
                                        ? 'bg-amber-100 text-amber-800'
                                        : 'bg-indigo-100 text-indigo-800'
                                }`}
                            >
                                {user.is_admin
                                    ? t('dashboard.roleAdmin', locale)
                                    : t('dashboard.roleUser', locale)}
                            </span>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <h4 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">
                            {t('dashboard.accountDetails', locale)}
                        </h4>
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">
                                    {t('auth.email', locale)}
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">
                                    {t('dashboard.title', locale)}
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {user.is_admin
                                        ? t('dashboard.roleAdmin', locale)
                                        : t('dashboard.roleUser', locale)}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
