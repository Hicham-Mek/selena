<div align="center">

# Selena (سيلينا)

**A bilingual (Arabic RTL / English LTR) digital novel & audiobook publishing platform with manual local payment verification and protected HTTP 206 audio streaming.**

[![PHP](https://img.shields.io/badge/PHP-%5E8.2-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net/)
[![Laravel](https://img.shields.io/badge/Laravel-%5E12.0-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com/)
[![Filament](https://img.shields.io/badge/Filament-v5.7-FDAE4B?style=for-the-badge&logo=laravel&logoColor=white)](https://filamentphp.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-v3-9553E9?style=for-the-badge&logo=inertia&logoColor=white)](https://inertiajs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Pest](https://img.shields.io/badge/Pest-v4.7-F28D1A?style=for-the-badge&logo=php&logoColor=white)](https://pestphp.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

---

## Overview

**Selena** (`سيلينا`) is a monolithic full-stack web application built for independent authors and publishers who want to sell, publish, and stream serialized novels and chapter-by-chapter audio narrations online without relying on third-party payment gateways or external cloud object storage.

Designed specifically for the **Algerian market**, it solves the gap between local offline/mobile transfers (**CCP** and **BaridiMob**) and gated digital content delivery:

1. Visitors browse the published catalog and read/listen to designated **free preview chapters** before buying.
2. Authenticated readers initiate a purchase order in **DZD**, receive configurable **CCP / BaridiMob** payment details and direct **WhatsApp** admin support, and upload a payment receipt (`JPEG`, `PNG`, or `PDF`).
3. Administrators inspect receipts privately inside the **Filament v5** admin panel (`/admin`) and atomically approve or reject orders.
4. Approving an order creates a permanent, novel-level **entitlement** that unlocks all current and future chapters of that novel across any device, backed by server-side route authorization and time-limited signed audio streaming.

---

## Key Features

- **Bilingual Arabic-First UI (RTL / LTR)**
  - Defaults to Arabic (`ar`, `dir="rtl"`) with instant switching to English (`en`, `dir="ltr"`) persisted via both Laravel session and an HTTP cookie (`SetLocale` middleware & `LanguageToggle`).
  - Uses `Alexandria` for UI typography and `Amiri` for long-form Arabic literary reading, dynamically syncing `<html>` `lang` and `dir` attributes across Inertia page navigations.
- **Catalog, Novel Details & Free Previews**
  - Featured showcase on `/` and full published catalog on `/novels`, with automatic Arabic/English field fallback (`title_ar`/`title_en`, `description_ar`/`description_en`).
  - Individual chapters can be marked `is_preview`, allowing unauthenticated guests and non-purchasers to evaluate both text and audio before buying.
- **Manual Payment Checkout & Private Receipt Handling**
  - Displays CCP account/key, BaridiMob RIP, account holder name, transfer reference instructions, and a one-click WhatsApp support link configured via `config/payment.php`.
  - Supports drag-and-drop receipt uploads (max `5 MB`; `jpeg`, `jpg`, `png`, `pdf`) either at order creation or later for `pending` orders, stored on the non-public `local` disk (`storage/app/private/receipts`).
  - Prevents duplicate active orders (`pending`, `under_review`, or `approved`) using database transactions and `lockForUpdate()` row-level serialization.
- **Entitlement-Based Authorization Boundary**
  - Access rights are decoupled from orders in an `entitlements` table with a composite unique index on `(user_id, novel_id)`.
  - Paid chapter routes (`ChapterController::show`) and audio streaming routes (`ChapterController::streamAudio`) enforce `is_preview || user->hasEntitlementFor($novelId)` server-side on every request.
- **Protected Reader & HTTP 206 Byte-Range Audio Player**
  - Sanitizes rich-text HTML chapter content client-side with `DOMPurify`, applies `select-none`, and blocks context-menu actions (`onContextMenu`) to deter casual copying.
  - Streams private chapter audio files (`.mp3`, `.m4a`, `.wav`, up to `60 MB`) over **2-hour temporary signed URLs** (`signed` middleware) with full `HTTP 206 Partial Content` (`Accept-Ranges: bytes`, `Content-Range`) support for browser scrubbing and `controlsList="nodownload"`.
  - Automatically refreshes expired audio signatures mid-session via Inertia partial reload (`router.reload({ only: ['audio_url'] })`) on `<audio>` `onError`.
- **Reader Dashboard**
  - Centralized `/dashboard` displaying unlocked novels (**My Library**), unowned catalog recommendations (**Discover**), full **Order History** (with rejection reasons and one-click repurchase), and **Profile** details (`users` + 1:1 `profiles`).
- **Filament v5 Admin Dashboard (`/admin`)**
  - Cleanly isolated from Inertia middleware (`HandleInertiaRequests` exempts `/admin` and `/admin/*`) and restricted to users with `is_admin = true` (`User::canAccessPanel()`).
  - Includes real-time KPIs (`DashboardStatsOverview`), `NovelResource` (2:3 cover cropping to `400x600`, publish guard requiring at least one chapter), `ChapterResource` (rich text editor + private audio upload), `OrderResource` (actionable badge counter, in-modal private receipt viewer, transactional **Approve** & **Reject** actions), and `UserResource` (with `EntitlementsRelationManager` to gift or revoke novel access).

---

## Tech Stack

| Layer | Technology | Version / Details |
| :--- | :--- | :--- |
| **Language (Backend)** | PHP | `^8.2` |
| **Backend Framework** | Laravel | `^12.0` (with Breeze `^2.4`, Sanctum `^4.0`, Ziggy `^2.0`) |
| **Admin Panel** | FilamentPHP | `^5.7` (Livewire-powered panel mounted at `/admin`) |
| **SPA Bridge** | Inertia.js | `inertiajs/inertia-laravel` `3.0` + `@inertiajs/react` `^3.7.0` |
| **Frontend Library** | React | `^19.0.0` (JSX) |
| **Styling & Typography** | Tailwind CSS | `^3.2.1` (`@tailwindcss/forms`, `@tailwindcss/typography`, `Alexandria` & `Amiri` fonts) |
| **UI & Security Utilities** | Headless UI, DOMPurify, Axios | `@headlessui/react` `^2.0.0`, `dompurify` `^3.4.15`, `axios` `^1.7.4` |
| **Build Tooling** | Vite | `^6.0.11` (`laravel-vite-plugin` `^1.2.0`, `@vitejs/plugin-react` `^4.2.0`) |
| **Database** | SQLite / MySQL 8.x / MariaDB | SQLite default for local/testing; MySQL configured with `ATTR_PERSISTENT => false` |
| **Storage** | Laravel Local Filesystem | `public` disk (`storage/app/public/covers`) & `local` private disk (`storage/app/private`) |
| **Testing & Code Style** | PestPHP & Laravel Pint | `pestphp/pest` `^4.7`, `pestphp/pest-plugin-laravel` `^4.1`, `laravel/pint` `^1.13` |

---

## Project Structure

```text
selena-app/
├── app/
│   ├── Filament/
│   │   ├── Resources/
│   │   │   ├── Chapters/          # Chapter CRUD, RichEditor, and private audio FileUpload
│   │   │   ├── Novels/            # Novel CRUD, cover image processing, publish validation
│   │   │   ├── Orders/            # Order queue, receipt modal viewer, Approve/Reject actions
│   │   │   └── Users/             # User management & EntitlementsRelationManager (gift/revoke)
│   │   └── Widgets/               # DashboardStatsOverview (customers, novels, orders KPIs)
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/              # Breeze authentication & custom Profile-linked registration
│   │   │   ├── ChapterController.php   # Novel details, gated chapter reader, signed 206 audio stream
│   │   │   ├── DashboardController.php # Reader library, order history, profile, discovery feed
│   │   │   ├── NovelController.php     # Public published catalog listing
│   │   │   ├── OrderController.php     # Checkout, locked order creation, receipt uploads
│   │   │   ├── ProfileController.php   # User profile & account deletion
│   │   │   └── ReceiptController.php   # Authorized private receipt streaming
│   │   └── Middleware/
│   │       ├── HandleInertiaRequests.php # Shares auth, locale, dir, translations (exempts /admin)
│   │       └── SetLocale.php             # Resolves ar/en locale from session, cookie, or config
│   ├── Models/                    # User, Profile, Novel, Chapter, Order, Entitlement
│   └── Providers/
│       ├── AppServiceProvider.php
│       └── Filament/AdminPanelProvider.php # /admin panel config + AR/EN switcher
├── bootstrap/
│   └── app.php                    # Routing (/up health check), web middleware stack, maintenance exceptions
├── config/
│   ├── app.php                    # App defaults (APP_LOCALE defaults to 'ar')
│   ├── database.php               # SQLite, MySQL, MariaDB, PostgreSQL, Redis connections
│   ├── filesystems.php            # 'local' (private), 'public' (symlinked), 'private', and 's3' disks
│   └── payment.php                # CCP, BaridiMob, WhatsApp, and transfer reference configuration
├── database/
│   ├── migrations/                # users, profiles, novels, chapters, orders, entitlements, cache, jobs
│   └── seeders/
│       ├── DatabaseSeeder.php     # Seeds test customer, admin user, and calls NovelSeeder
│       └── NovelSeeder.php        # Seeds 3 bilingual Arabic/English novels with preview & paid chapters
├── lang/
│   ├── ar.json & en.json          # Shared Inertia frontend translation dictionaries
│   ├── ar/                        # Backend Laravel & Filament Arabic translations (admin, chapter, validation)
│   └── en/                        # Backend English translations
├── public/
│   ├── .user.ini                  # PHP runtime limits (100M upload/post, 256M RAM, 120s timeout)
│   ├── logo.png                   # Platform logo & favicon
│   └── storage -> ../storage/app/public # Symlink created via php artisan storage:link
├── resources/
│   ├── css/app.css                # Tailwind directives & RTL/LTR form input overrides
│   ├── js/
│   │   ├── Components/            # Shared UI components & LanguageToggle
│   │   ├── Hooks/useTranslate.js  # Client-side translation hook reading Inertia props
│   │   ├── Layouts/               # AuthenticatedLayout & GuestLayout
│   │   └── Pages/                 # Welcome, Dashboard, Auth/*, Novels/*, Chapters/Show, Orders/*, Profile/*
│   └── views/
│       ├── app.blade.php          # Root HTML shell with dynamic lang/dir & Google Fonts (Alexandria, Amiri)
│       └── filament/modals/receipt-viewer.blade.php # Image/PDF receipt preview modal
├── routes/
│   ├── auth.php                   # Login, registration, password reset, email verification routes
│   ├── console.php                # Artisan console commands
│   └── web.php                    # Public, authenticated, signed audio, and language switcher routes
├── tests/
│   ├── Feature/                   # ChapterAccessTest, ChapterAudioStreamTest, FilamentAdminAccessTest, LanguageTest, Auth/*
│   └── Unit/
├── composer.json                  # PHP dependencies and `composer dev` script
├── package.json                   # Node dependencies and Vite build scripts
├── phpunit.xml                    # Pest/PHPUnit configuration (in-memory SQLite)
├── tailwind.config.js             # Custom fonts (Alexandria, Amiri), brand color (#FF2D20), plugins
└── vite.config.js                 # Laravel Vite + React plugin configuration
```

---

## Getting Started

### Prerequisites

Ensure your local or server environment includes:

- **PHP** `>= 8.2` (with `pdo_sqlite` / `pdo_mysql`, `mbstring`, `openssl`, `fileinfo`, `gd` or `imagick` for cover resizing)
- **Composer** `2.x`
- **Node.js** `>= 18` and **npm**
- **Database**: SQLite (zero-config local default) or MySQL 8.x / MariaDB

### Installation

1. **Clone the repository and enter the project directory:**

   ```bash
   git clone <your-repository-url> selena-app
   cd selena-app
   ```

2. **Install PHP and JavaScript dependencies:**

   ```bash
   composer install
   npm install
   ```

3. **Create your environment file and generate the application key:**

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Create the public storage symlink** (required so novel covers uploaded to `storage/app/public/covers` resolve at `/storage/...`):

   ```bash
   php artisan storage:link
   ```

5. **Prepare the database and run migrations with sample data:**

   If using SQLite (the default in `config/database.php`), ensure the database file exists:

   ```bash
   touch database/database.sqlite
   php artisan migrate --seed
   ```

   > [!NOTE]
   > Running `php artisan migrate --seed` executes [`DatabaseSeeder`](database/seeders/DatabaseSeeder.php) and [`NovelSeeder`](database/seeders/NovelSeeder.php), creating 3 bilingual published novels (*Shadows of Selena*, *Echoes of the Sand*, *Heartbeat in the Dark*) along with two demo accounts (password: `password`):
   > - **Admin (`/admin`)**: `admin@example.com` (`is_admin = true`)
   > - **Reader**: `test@example.com` (`is_admin = false`)

### Environment Variables

Below are the core environment variables referenced across `config/` and `resources/js/app.jsx`:

| Variable | Default / Example | Required | Description |
| :--- | :--- | :---: | :--- |
| `APP_NAME` | `Laravel` (set to `Selena`) | Yes | Application display name used by Laravel and Blade titles |
| `VITE_APP_NAME` | `Selena` | No | App name injected into the React/Inertia document title (`resources/js/app.jsx`) |
| `APP_ENV` | `local` / `production` | Yes | Runtime environment |
| `APP_KEY` | *(generated)* | Yes | 32-byte encryption key generated by `php artisan key:generate` (used for sessions & signed URLs) |
| `APP_DEBUG` | `true` / `false` | Yes | Enables/disables detailed exception pages |
| `APP_URL` | `http://localhost` | Yes | Base URL used for asset links, storage URLs, and temporary signed routes |
| `APP_LOCALE` | `ar` | No | Default application locale (`ar` or `en`) |
| `APP_FALLBACK_LOCALE` | `en` | No | Fallback translation locale |
| `DB_CONNECTION` | `sqlite` (or `mysql`) | Yes | Database driver (`sqlite`, `mysql`, `mariadb`, `pgsql`, `sqlsrv`) |
| `DB_DATABASE` | `database/database.sqlite` | Yes | SQLite file path or MySQL/MariaDB database name |
| `DB_HOST` / `DB_PORT` | `127.0.0.1` / `3306` | MySQL | Database host and port (when not using SQLite) |
| `DB_USERNAME` / `DB_PASSWORD` | `root` / `""` | MySQL | Database credentials |
| `FILESYSTEM_DISK` | `local` | No | Default filesystem disk (`local` maps to `storage/app/private`) |
| `SESSION_DRIVER` | `database` | No | Session storage driver (`database`, `file`, etc.) |
| `QUEUE_CONNECTION` | `database` | No | Queue backend driver |
| `MAIL_MAILER` | `log` | No | Mail transport (`log`, `smtp`, etc. for password resets & verification) |
| `PAYMENT_CCP_ACCOUNT` | `0000000000000000` | Yes | Algérie Poste CCP account number displayed at checkout (`config/payment.php`) |
| `PAYMENT_CCP_KEY` | `00` | Yes | Two-digit CCP key (`Clé`) displayed at checkout |
| `PAYMENT_BARIDIMOB_RIP` | `00000000000000000000` | Yes | 20-digit BaridiMob RIP displayed at checkout |
| `PAYMENT_ACCOUNT_HOLDER` | `اسم صاحب الحساب` | Yes | Full name of the payment recipient |
| `PAYMENT_WHATSAPP_NUMBER` | `+213 555 000 000` | No | Admin WhatsApp support number linked on checkout & order status pages |
| `PAYMENT_REFERENCE_INSTRUCTIONS` | `اكتب اسمك الكامل...` | No | Transfer note guidance shown to buyers |

> [!IMPORTANT]
> **PHP Upload & Memory Limits:** Chapter audio files can be up to **60 MB** (`maxSize(61440)` in `ChapterForm.php`). Ensure your PHP configuration matches [`public/.user.ini`](public/.user.ini):
> ```ini
> upload_max_filesize = 100M
> post_max_size = 100M
> memory_limit = 256M
> max_execution_time = 120
> ```

### Running Locally

Start the full local development stack (Laravel server, queue worker, Pail log tailer, and Vite HMR) with a single command defined in `composer.json`:

```bash
composer dev
```

Or run the PHP backend and Vite frontend in separate terminals:

```bash
php artisan serve
npm run dev
```

For production asset compilation:

```bash
npm run build
```

---

## Usage

Because Selena uses **Inertia.js**, controllers return Inertia React page responses rather than a public JSON REST API, while media and receipts are streamed directly through protected Laravel endpoints.

### Application Routes Reference

| Method | URI | Middleware | Purpose |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | `web` | Landing page with up to 3 latest published novels |
| `GET` | `/novels` | `web` | Full catalog of published novels |
| `GET` | `/novels/{novel:slug}` | `web` | Novel details, chapter list, and purchase/ownership state |
| `GET` | `/novels/{novel:slug}/chapters/{chapter}` | `web` | Chapter reader (allowed if `is_preview` or user holds an `Entitlement`) |
| `GET` | `/chapters/{chapter}/audio` | `web`, `signed` | Streams chapter audio (`200` or `206 Partial Content`); requires valid 2h signature + entitlement/preview |
| `GET` | `/dashboard` | `auth`, `verified` | Reader library, discovery feed, order history, and account summary |
| `GET` / `POST` | `/novels/{novel:slug}/purchase` | `auth`, `throttle:60,1` | Displays payment instructions / creates order (`pending` or `under_review`) |
| `GET` | `/orders/{order}` | `auth`, `throttle:60,1` | Order status tracker & deferred receipt upload view |
| `POST` | `/orders/{order}/receipt` | `auth`, `throttle:60,1` | Attaches receipt to a `pending` order and moves it to `under_review` |
| `GET` | `/orders/{order}/receipt` | `auth`, `throttle:60,1` | Streams private receipt inline (restricted to order owner or admin) |
| `POST` / `GET` | `/language` / `/language/{locale}` | `web` | Switches active locale (`ar` or `en`) in session & cookie |
| `GET` | `/admin` | Filament auth | Filament v5 admin dashboard (requires `is_admin = true`) |
| `GET` | `/up` | — | Laravel 12 health-check endpoint |

### Signed Audio Streaming & HTTP 206 Scrubbing Example

`ChapterController::show()` generates a temporary signed URL valid for 2 hours:

```php
$audioUrl = URL::temporarySignedRoute(
    'chapters.audio',
    now()->addHours(2),
    ['chapter' => $chapter->id]
);
```

When the browser's `<audio>` element requests byte ranges to seek through a chapter track, `ChapterController::streamAudio()` validates both the URL signature (`signed` middleware) and the user's authorization (`is_preview` or `hasEntitlementFor`), then responds with `206 Partial Content`:

```http
GET /chapters/1/audio?expires=1794400000&signature=... HTTP/1.1
Range: bytes=0-499

HTTP/1.1 206 Partial Content
Content-Type: audio/mpeg
Content-Length: 500
Content-Range: bytes 0-499/4194304
Accept-Ranges: bytes
Cache-Control: private, no-store
```

### Running Tests & Code Formatting

The test suite uses **PestPHP** with an in-memory SQLite database (`phpunit.xml`), covering chapter authorization boundaries, signed HTTP 206 audio streaming, Filament panel access control, bilingual locale persistence, and Breeze authentication:

```bash
# Run the full Pest test suite
php artisan test

# Run a specific feature test file
php artisan test tests/Feature/ChapterAudioStreamTest.php

# Check PHP code style with Laravel Pint
./vendor/bin/pint --test
```

> [!TIP]
> **Shared Hosting / cPanel Deployment:** The repository includes a root [`.htaccess`](.htaccess) that rewrites requests into `public/`, and [`config/database.php`](config/database.php) explicitly disables persistent PDO connections (`PDO::ATTR_PERSISTENT => false`) to avoid connection pool exhaustion on shared MySQL instances. Before deploying, compile assets with `npm run build` and ensure `storage/app/private` is never publicly served.

---

## Contributing & License

### Contributing

Contributions are welcome! To propose a fix or feature:

1. Fork the repository and create a branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. Follow the project's PHP style rules (`./vendor/bin/pint`) and verify React builds cleanly (`npm run build`).
3. Add or update Pest feature tests under `tests/Feature/` and confirm the entire suite passes:
   ```bash
   php artisan test
   ```
4. Open a Pull Request describing the change, affected routes/resources, and test coverage.

### License

This project is open-sourced software licensed under the [MIT License](https://opensource.org/licenses/MIT), as specified in [`composer.json`](composer.json).
