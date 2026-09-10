import { usePage } from '@inertiajs/react';

/**
 * Helper to fetch a nested translation string with optional parameter replacement
 * from the translations passed via Inertia.
 */
export function t(path, translations = {}, params = {}) {
    const keys = path.split('.');
    let result = translations;

    for (const key of keys) {
        if (result && result[key] !== undefined) {
            result = result[key];
        } else {
            result = undefined;
            break;
        }
    }

    if (result === undefined) {
        return path; // Fallback to key
    }

    if (typeof result === 'string') {
        Object.keys(params).forEach((paramKey) => {
            result = result.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), params[paramKey]);
        });
    }

    return result;
}

export default function useTranslate() {
    const { translations = {}, locale = 'ar', dir = 'rtl' } = usePage().props;

    const translate = (path, params = {}) => t(path, translations, params);

    return {
        t: translate,
        locale,
        dir,
        isRtl: dir === 'rtl',
    };
}
