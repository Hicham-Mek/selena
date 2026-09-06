<!DOCTYPE html>
<!-- Add Arabic language and RTL direction natively -->
<html lang="{{ app()->getLocale() }}" dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Alexandria Arabic Variable Font (100 to 900) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@100..900&display=swap" rel="stylesheet">

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    <x-inertia::head>
        <title data-inertia>{{ config('app.name', 'Selena') }}</title>
    </x-inertia::head>
</head>

<body class="font-sans antialiased text-gray-900 bg-gray-50">
    <x-inertia::app />
</body>

</html>