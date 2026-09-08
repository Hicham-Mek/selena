<?php

namespace App\Filament\Resources\Orders\Schemas;

use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class OrderForm
{
    /**
     * This form is used only for the View page.
     * Orders cannot be manually created or edited by admins.
     */
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Placeholder::make('user_name')
                    ->label(__('admin.customer'))
                    ->content(fn ($record) => $record?->user?->name ?? '—'),

                Placeholder::make('novel_title')
                    ->label(__('admin.novel'))
                    ->content(fn ($record) => $record?->novel?->title_ar ?? '—'),

                Placeholder::make('amount_paid')
                    ->label(__('admin.amount_paid'))
                    ->content(fn ($record) => $record ? number_format($record->amount_paid, 2) . ' DZD' : '—'),

                Placeholder::make('status')
                    ->label(__('admin.order_status'))
                    ->content(fn ($record) => $record ? match ($record->status) {
                        'pending'      => __('admin.status_pending'),
                        'under_review' => __('admin.status_under_review'),
                        'approved'     => __('admin.status_approved'),
                        'rejected'     => __('admin.status_rejected'),
                        default        => $record->status,
                    } : '—'),

                Placeholder::make('rejection_reason')
                    ->label(__('admin.rejection_reason'))
                    ->content(fn ($record) => $record?->rejection_reason ?? '—')
                    ->visible(fn ($record): bool => filled($record?->rejection_reason)),

                Placeholder::make('created_at')
                    ->label(__('admin.created_at'))
                    ->content(fn ($record) => $record?->created_at?->format('d/m/Y H:i') ?? '—'),
            ]);
    }
}
