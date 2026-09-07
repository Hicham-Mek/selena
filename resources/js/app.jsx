import '../css/app.css';
import './bootstrap';

import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Selena';

function updateDocumentLocale(locale, dir) {
    const activeLocale = locale || 'ar';
    const activeDir = dir || (activeLocale === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.lang = activeLocale;
    document.documentElement.dir = activeDir;
}

// Keep documentElement lang and dir in sync with Inertia page props across navigations
router.on('navigate', (event) => {
    const { locale, dir } = event.detail.page.props;
    updateDocumentLocale(locale, dir);
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        updateDocumentLocale(
            props.initialPage.props.locale,
            props.initialPage.props.dir,
        );

        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
