import { usePage } from '@inertiajs/react';

export const translations = {
    ar: {
        appName: 'سيلينا',
        switchLanguage: 'تغيير اللغة',
        languageName: 'العربية',
        nav: {
            dashboard: 'لوحة التحكم',
            profile: 'الملف الشخصي',
            logout: 'تسجيل الخروج',
            login: 'تسجيل الدخول',
            register: 'إنشاء حساب',
        },
        auth: {
            registerTitle: 'إنشاء حساب جديد',
            firstName: 'الاسم الأول',
            firstNamePlaceholder: 'مثال: أحمد',
            lastName: 'اسم العائلة',
            lastNamePlaceholder: 'مثال: المنصور',
            email: 'البريد الإلكتروني',
            emailPlaceholder: 'name@example.com',
            password: 'كلمة المرور',
            passwordPlaceholder: '••••••••',
            confirmPassword: 'تأكيد كلمة المرور',
            confirmPasswordPlaceholder: '••••••••',
            alreadyRegistered: 'لديك حساب بالفعل؟ تسجيل الدخول',
            registerButton: 'إنشاء الحساب',
            loginTitle: 'تسجيل الدخول',
            rememberMe: 'تذكرني',
            forgotPassword: 'نسيت كلمة المرور؟',
            loginButton: 'تسجيل الدخول',
            dontHaveAccount: 'ليس لديك حساب؟ سجل الآن',
            forgotPasswordTitle: 'استعادة كلمة المرور',
            forgotPasswordDescription:
                'نسيت كلمة المرور؟ لا توجد مشكلة. فقط أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور لاختيار كلمة مرور جديدة.',
            emailPasswordResetLink: 'إرسال رابط إعادة التعيين',
            backToLogin: 'العودة لتسجيل الدخول',
            resetPasswordTitle: 'إعادة تعيين كلمة المرور',
            resetPasswordButton: 'تحديث كلمة المرور',
            confirmPasswordTitle: 'تأكيد كلمة المرور',
            confirmPasswordDescription:
                'هذه منطقة آمنة من التطبيق. يرجى تأكيد كلمة المرور الخاصة بك قبل المتابعة.',
            confirmButton: 'تأكيد',
            verifyEmailTitle: 'تأكيد البريد الإلكتروني',
            verifyEmailDescription:
                'شكراً لانضمامك إلينا! قبل البدء، يرجى تأكيد بريدك الإلكتروني عبر الرابط المرسل إليك. إذا لم يصلك البريد، يمكننا إرسال رابط جديد.',
            verificationLinkSent:
                'تم إرسال رابط تأكيد جديد إلى عنوان البريد الإلكتروني الذي قدمته أثناء التسجيل.',
            resendVerificationEmail: 'إعادة إرسال بريد التأكيد',
            logout: 'تسجيل الخروج',
        },
        dashboard: {
            title: 'لوحة التحكم',
            welcome: 'تم تسجيل دخولك بنجاح!',
            welcomeUser: 'أهلاً بك، {name}!',
            roleAdmin: 'مشرف النظام',
            roleUser: 'مستخدم',
            accountDetails: 'معلومات الحساب',
        },
        novel: {
            published: 'منشور',
            draft: 'مسودة',
            currency: 'د.ج',
            chapters: 'الفصول',
            freePreview: 'معاينة مجانية',
        },
        chapter: {
            chapterNumber: 'الفصل {number}',
            previewBadge: 'معاينة مجانية',
            purchasedBadge: 'محتوى مدفوع',
            listen: 'استمع إلى هذا الفصل',
            audioNotSupported: 'المتصفح لا يدعم تشغيل الصوت.',
            audioExpired: 'انتهت صلاحية رابط الصوت. جارٍ التجديد...',
            previousChapter: 'الفصل السابق',
            nextChapter: 'الفصل التالي',
            backToNovel: 'العودة للرواية',
            lockedBadge: 'مدفوع (يتطلب الشراء)',
            purchase_required: 'يتطلب الوصول إلى هذا الفصل الشراء أولاً.',
        },
        order: {
            purchase_novel: 'شراء الرواية',
            login_to_purchase: 'سجل الدخول للشراء',
            purchased: 'تم الشراء ✓',
            already_ordered: 'طلب قيد المراجعة',
            order_pending: 'في انتظار إرفاق الإيصال',
            payment_instructions: 'معلومات الدفع',
            payment_instructions_subtitle: 'يرجى تحويل المبلغ باستخدام إحدى الطرق التالية',
            ccp_title: 'حساب بريدي CCP',
            baridimob_title: 'بريدي موب BaridiMob',
            account_number: 'رقم الحساب',
            ccp_key: 'المفتاح',
            rip_number: 'رقم RIP',
            account_holder: 'صاحب الحساب',
            payment_reference: 'تعليمات المرجع',
            upload_receipt: 'إرفاق إيصال الدفع',
            receipt_helper: 'صيغ مقبولة: JPEG, PNG, PDF — الحجم الأقصى: 5 ميغابايت',
            submit_order: 'تأكيد الطلب',
            submit_receipt: 'إرسال الإيصال',
            order_confirmation: 'تأكيد الطلب',
            order_submitted: 'تم إرسال طلبك بنجاح',
            order_details: 'تفاصيل الطلب',
            order_status: 'حالة الطلب',
            order_amount: 'المبلغ',
            order_date: 'تاريخ الطلب',
            receipt_uploaded: 'تم إرفاق الإيصال',
            no_receipt: 'لم يتم إرفاق إيصال بعد',
            view_receipt: 'عرض الإيصال',
            back_to_novel: 'العودة للرواية',
            status_pending: 'في الانتظار',
            status_under_review: 'قيد المراجعة',
            status_approved: 'مقبول',
            status_rejected: 'مرفوض',
            rejection_reason: 'سبب الرفض',
            price_label: 'السعر',
        },
        catalog: {
            title: 'تصفح الروايات',
            subtitle: 'اكتشف واقرأ أحدث إصداراتنا',
            read_more: 'اقرأ المزيد',
            browse_novels: 'تصفح الروايات',
        },
        welcome: {
            title: 'مرحباً بك في سيلينا',
            subtitle: 'منصتك الموثوقة والمثالية',
            login: 'تسجيل الدخول',
            register: 'إنشاء حساب جديد',
            dashboard: 'الذهاب إلى لوحة التحكم',
        },
    },
    en: {
        appName: 'Selena',
        switchLanguage: 'Switch Language',
        languageName: 'English',
        nav: {
            dashboard: 'Dashboard',
            profile: 'Profile',
            logout: 'Log Out',
            login: 'Log In',
            register: 'Register',
        },
        auth: {
            registerTitle: 'Create an account',
            firstName: 'First Name',
            firstNamePlaceholder: 'e.g. John',
            lastName: 'Last Name',
            lastNamePlaceholder: 'e.g. Doe',
            email: 'Email',
            emailPlaceholder: 'name@example.com',
            password: 'Password',
            passwordPlaceholder: '••••••••',
            confirmPassword: 'Confirm Password',
            confirmPasswordPlaceholder: '••••••••',
            alreadyRegistered: 'Already registered? Log in',
            registerButton: 'Register',
            loginTitle: 'Log in',
            rememberMe: 'Remember me',
            forgotPassword: 'Forgot your password?',
            loginButton: 'Log in',
            dontHaveAccount: "Don't have an account? Sign up",
            forgotPasswordTitle: 'Forgot Password',
            forgotPasswordDescription:
                'Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.',
            emailPasswordResetLink: 'Email Password Reset Link',
            backToLogin: 'Back to log in',
            resetPasswordTitle: 'Reset Password',
            resetPasswordButton: 'Reset Password',
            confirmPasswordTitle: 'Confirm Password',
            confirmPasswordDescription:
                'This is a secure area of the application. Please confirm your password before continuing.',
            confirmButton: 'Confirm',
            verifyEmailTitle: 'Email Verification',
            verifyEmailDescription:
                'Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you did not receive the email, we will gladly send you another.',
            verificationLinkSent:
                'A new verification link has been sent to the email address you provided during registration.',
            resendVerificationEmail: 'Resend Verification Email',
            logout: 'Log Out',
        },
        dashboard: {
            title: 'Dashboard',
            welcome: "You're logged in!",
            welcomeUser: 'Welcome back, {name}!',
            roleAdmin: 'Administrator',
            roleUser: 'User',
            accountDetails: 'Account Information',
        },
        novel: {
            published: 'Published',
            draft: 'Draft',
            currency: 'DZD',
            chapters: 'Chapters',
            freePreview: 'Free Preview',
        },
        chapter: {
            chapterNumber: 'Chapter {number}',
            previewBadge: 'Free Preview',
            purchasedBadge: 'Purchased Content',
            listen: 'Listen to this chapter',
            audioNotSupported: 'Your browser does not support audio playback.',
            audioExpired: 'Audio link expired. Refreshing...',
            previousChapter: 'Previous Chapter',
            nextChapter: 'Next Chapter',
            backToNovel: 'Back to Novel',
            lockedBadge: 'Locked (Requires Purchase)',
            purchase_required: 'Purchase required to unlock this content.',
        },
        order: {
            purchase_novel: 'Purchase Novel',
            login_to_purchase: 'Log in to Purchase',
            purchased: 'Purchased ✓',
            already_ordered: 'Order Under Review',
            order_pending: 'Awaiting Receipt Upload',
            payment_instructions: 'Payment Information',
            payment_instructions_subtitle: 'Please transfer the amount using one of the following methods',
            ccp_title: 'CCP Postal Account',
            baridimob_title: 'BaridiMob',
            account_number: 'Account Number',
            ccp_key: 'Key',
            rip_number: 'RIP Number',
            account_holder: 'Account Holder',
            payment_reference: 'Reference Instructions',
            upload_receipt: 'Upload Payment Receipt',
            receipt_helper: 'Accepted formats: JPEG, PNG, PDF — Max size: 5MB',
            submit_order: 'Submit Order',
            submit_receipt: 'Submit Receipt',
            order_confirmation: 'Order Confirmation',
            order_submitted: 'Your order has been submitted successfully',
            order_details: 'Order Details',
            order_status: 'Order Status',
            order_amount: 'Amount',
            order_date: 'Order Date',
            receipt_uploaded: 'Receipt Uploaded',
            no_receipt: 'No receipt uploaded yet',
            view_receipt: 'View Receipt',
            back_to_novel: 'Back to Novel',
            status_pending: 'Pending',
            status_under_review: 'Under Review',
            status_approved: 'Approved',
            status_rejected: 'Rejected',
            rejection_reason: 'Rejection Reason',
            price_label: 'Price',
        },
        catalog: {
            title: 'Browse Novels',
            subtitle: 'Discover and read our latest publications',
            read_more: 'Read more',
            browse_novels: 'Browse Novels',
        },
        welcome: {
            title: 'Welcome to Selena',
            subtitle: 'Your trusted and reliable platform',
            login: 'Log in',
            register: 'Register',
            dashboard: 'Go to Dashboard',
        },
    },
};

/**
 * Helper to fetch a nested translation string with optional parameter replacement.
 * e.g., t('auth.firstName', locale)
 */
export function t(path, locale = 'ar', params = {}) {
    const activeLocale = locale === 'en' ? 'en' : 'ar';
    const keys = path.split('.');
    let result = translations[activeLocale];

    for (const key of keys) {
        if (result && result[key] !== undefined) {
            result = result[key];
        } else {
            // Fallback to en if missing in ar, or path itself
            let fallback = translations.en;
            for (const fKey of keys) {
                fallback = fallback ? fallback[fKey] : undefined;
            }
            result = fallback !== undefined ? fallback : path;
            break;
        }
    }

    if (typeof result === 'string') {
        Object.keys(params).forEach((paramKey) => {
            result = result.replace(new RegExp(`{${paramKey}}`, 'g'), params[paramKey]);
        });
    }

    return result;
}

/**
 * React hook to access current locale and translation function.
 */
export function useTranslation() {
    const { locale = 'ar', dir = 'rtl' } = usePage().props;
    const translate = (path, params = {}) => t(path, locale, params);
    return {
        t: translate,
        locale,
        dir,
        isRtl: dir === 'rtl',
    };
}
