<?php

namespace App\Filament\Resources\Orders\Tables;

use App\Models\Order;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\Textarea;
use Filament\Notifications\Notification;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Support\Facades\DB;

class OrdersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->label(__('admin.customer'))
                    ->searchable()
                    ->sortable(),

                TextColumn::make('novel.title_ar')
                    ->label(__('admin.novel'))
                    ->searchable()
                    ->limit(30),

                TextColumn::make('amount_paid')
                    ->label(__('admin.amount_paid'))
                    ->money('DZD')
                    ->sortable(),

                TextColumn::make('status')
                    ->label(__('admin.order_status'))
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'pending'      => __('admin.status_pending'),
                        'under_review' => __('admin.status_under_review'),
                        'approved'     => __('admin.status_approved'),
                        'rejected'     => __('admin.status_rejected'),
                        default        => $state,
                    })
                    ->color(fn (string $state): string => match ($state) {
                        'pending'      => 'warning',
                        'under_review' => 'info',
                        'approved'     => 'success',
                        'rejected'     => 'danger',
                        default        => 'gray',
                    }),

                TextColumn::make('created_at')
                    ->label(__('admin.created_at'))
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                SelectFilter::make('status')
                    ->label(__('admin.order_status'))
                    ->options([
                        'pending'      => __('admin.status_pending'),
                        'under_review' => __('admin.status_under_review'),
                        'approved'     => __('admin.status_approved'),
                        'rejected'     => __('admin.status_rejected'),
                    ]),
            ])
            ->recordActions([
                // ── View Receipt ──────────────────────────────────────
                Action::make('view_receipt')
                    ->label(__('admin.receipt_path'))
                    ->icon(Heroicon::OutlinedDocumentText)
                    ->color('gray')
                    ->visible(fn (Order $record): bool => filled($record->receipt_path))
                    ->modalHeading(__('admin.receipt_path'))
                    ->modalContent(function (Order $record) {
                        $url = route('orders.receipt', $record);
                        return view('filament.modals.receipt-viewer', ['url' => $url]);
                    })
                    ->modalSubmitAction(false)
                    ->modalCancelActionLabel(__('admin.close')),

                // ── Approve ───────────────────────────────────────────
                Action::make('approve')
                    ->label(__('admin.approve'))
                    ->icon(Heroicon::OutlinedCheckCircle)
                    ->color('success')
                    ->requiresConfirmation()
                    ->modalHeading(__('admin.approve_order'))
                    ->modalDescription(__('admin.approve_order_confirm'))
                    ->visible(fn (Order $record): bool => in_array($record->status, [
                        Order::STATUS_PENDING,
                        Order::STATUS_UNDER_REVIEW,
                    ]))
                    ->action(function (Order $record): void {
                        DB::transaction(function () use ($record): void {
                            $record->update(['status' => Order::STATUS_APPROVED]);

                            \App\Models\Entitlement::firstOrCreate(
                                [
                                    'user_id'  => $record->user_id,
                                    'novel_id' => $record->novel_id,
                                ],
                                [
                                    'order_id'   => $record->id,
                                    'granted_at' => now(),
                                ]
                            );
                        });

                        Notification::make()
                            ->title(__('admin.order_approved_notification'))
                            ->success()
                            ->send();
                    }),

                // ── Reject ────────────────────────────────────────────
                Action::make('reject')
                    ->label(__('admin.reject'))
                    ->icon(Heroicon::OutlinedXCircle)
                    ->color('danger')
                    ->form([
                        Textarea::make('rejection_reason')
                            ->label(__('admin.rejection_reason'))
                            ->required()
                            ->rows(3)
                            ->placeholder(__('admin.rejection_reason_placeholder')),
                    ])
                    ->modalHeading(__('admin.reject_order'))
                    ->visible(fn (Order $record): bool => in_array($record->status, [
                        Order::STATUS_PENDING,
                        Order::STATUS_UNDER_REVIEW,
                    ]))
                    ->action(function (Order $record, array $data): void {
                        $record->update([
                            'status'           => Order::STATUS_REJECTED,
                            'rejection_reason' => $data['rejection_reason'],
                        ]);

                        Notification::make()
                            ->title(__('admin.order_rejected_notification'))
                            ->danger()
                            ->send();
                    }),

                ViewAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([]),
            ]);
    }
}
