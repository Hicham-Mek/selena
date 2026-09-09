<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Manual Payment Instructions
    |--------------------------------------------------------------------------
    |
    | These values are displayed to users when they initiate a purchase.
    | Update them via your .env file.
    |
    */

    'ccp' => [
        'account_number' => env('PAYMENT_CCP_ACCOUNT', '0000000000000000'),
        'key' => env('PAYMENT_CCP_KEY', '00'),
    ],

    'baridimob' => [
        'rip' => env('PAYMENT_BARIDIMOB_RIP', '00000000000000000000'),
    ],

    'account_holder' => env('PAYMENT_ACCOUNT_HOLDER', 'اسم صاحب الحساب'),

    'whatsapp_number' => env('PAYMENT_WHATSAPP_NUMBER', '+213 555 000 000'),

    'reference_instructions' => env(
        'PAYMENT_REFERENCE_INSTRUCTIONS',
        'اكتب اسمك الكامل وعنوان الرواية في خانة الملاحظات'
    ),

];
