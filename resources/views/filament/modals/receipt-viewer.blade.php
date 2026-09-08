{{-- Blade view rendered inside a Filament modal to securely display a private receipt --}}
<div class="flex flex-col items-center gap-4 p-2">
    @php
        $ext = strtolower(pathinfo($url, PATHINFO_EXTENSION));
    @endphp

    @if (in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'gif']))
        <img
            src="{{ $url }}"
            alt="{{ __('admin.receipt_path') }}"
            class="max-w-full rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
            style="max-height: 70vh; object-fit: contain;"
        />
    @elseif ($ext === 'pdf')
        <iframe
            src="{{ $url }}"
            class="w-full rounded-lg border border-gray-200 dark:border-gray-700"
            style="height: 70vh;"
        ></iframe>
    @else
        <div class="text-gray-500 dark:text-gray-400 text-sm">
            {{ __('admin.receipt_path') }}:
            <a
                href="{{ $url }}"
                target="_blank"
                class="text-primary-600 hover:underline"
            >
                {{ __('admin.download_receipt') }}
            </a>
        </div>
    @endif

</div>
