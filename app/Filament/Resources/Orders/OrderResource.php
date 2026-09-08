<?php

namespace App\Filament\Resources\Orders;

use App\Filament\Resources\Orders\Pages\ListOrders;
use App\Filament\Resources\Orders\Pages\ViewOrder;
use App\Filament\Resources\Orders\Schemas\OrderForm;
use App\Filament\Resources\Orders\Tables\OrdersTable;
use App\Models\Order;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedClipboardDocumentList;

    protected static ?string $recordTitleAttribute = 'id';

    // ── Navigation Badge: shows count of orders needing action ──

    public static function getNavigationBadge(): ?string
    {
        $count = Order::whereIn('status', [
            Order::STATUS_PENDING,
            Order::STATUS_UNDER_REVIEW,
        ])->count();

        return $count > 0 ? (string) $count : null;
    }

    public static function getNavigationBadgeColor(): string
    {
        return 'warning';
    }

    // ── Labels ─────────────────────────────────────────────────

    public static function getModelLabel(): string
    {
        return __('admin.order');
    }

    public static function getPluralModelLabel(): string
    {
        return __('admin.orders');
    }

    public static function getNavigationLabel(): string
    {
        return __('admin.orders');
    }

    // ── Schema & Table ─────────────────────────────────────────

    public static function form(Schema $schema): Schema
    {
        return OrderForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return OrdersTable::configure($table);
    }

    // ── Relations ──────────────────────────────────────────────

    public static function getRelations(): array
    {
        return [];
    }

    // ── Pages ──────────────────────────────────────────────────

    public static function getPages(): array
    {
        return [
            'index' => ListOrders::route('/'),
            'view'  => ViewOrder::route('/{record}'),
            // No 'create' or 'edit' — orders are customer-initiated only
        ];
    }
}
