<?php

namespace App\Filament\Resources\Orders\Pages;

use App\Filament\Resources\Orders\OrderResource;
use App\Models\Order;
use Filament\Actions\Action;
use Filament\Forms\Components\Textarea;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\ViewRecord;
use Filament\Support\Icons\Heroicon;
use Illuminate\Support\Facades\DB;

class ViewOrder extends ViewRecord
{
    protected static string $resource = OrderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            // ── View Receipt ──────────────────────────────────────
            Action::make('view_receipt')
                ->label(__('admin.receipt_path'))
                ->icon(Heroicon::OutlinedDocumentText)
                ->color('gray')
                ->visible(fn (): bool => filled($this->record->receipt_path))
                ->modalHeading(__('admin.receipt_path'))
                ->modalContent(function () {
                    $url = route('orders.receipt', $this->record);
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
                ->visible(fn (): bool => in_array($this->record->status, [
                    Order::STATUS_PENDING,
                    Order::STATUS_UNDER_REVIEW,
                ]))
                ->action(function (): void {
                    DB::transaction(function (): void {
                        $this->record->update(['status' => Order::STATUS_APPROVED]);

                        \App\Models\Entitlement::firstOrCreate(
                            [
                                'user_id'  => $this->record->user_id,
                                'novel_id' => $this->record->novel_id,
                            ],
                            [
                                'order_id'   => $this->record->id,
                                'granted_at' => now(),
                            ]
                        );
                    });

                    $this->refreshFormData(['status']);

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
                ->visible(fn (): bool => in_array($this->record->status, [
                    Order::STATUS_PENDING,
                    Order::STATUS_UNDER_REVIEW,
                ]))
                ->action(function (array $data): void {
                    $this->record->update([
                        'status'           => Order::STATUS_REJECTED,
                        'rejection_reason' => $data['rejection_reason'],
                    ]);

                    $this->refreshFormData(['status', 'rejection_reason']);

                    Notification::make()
                        ->title(__('admin.order_rejected_notification'))
                        ->danger()
                        ->send();
                }),
        ];
    }
}
