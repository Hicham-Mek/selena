<?php

namespace App\Filament\Widgets;

use App\Models\Novel;
use App\Models\Order;
use App\Models\User;
use Filament\Support\Icons\Heroicon;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class DashboardStatsOverview extends StatsOverviewWidget
{
    protected static ?int $sort = -2;

    protected function getStats(): array
    {
        $totalUsers = User::where('is_admin', false)->count();

        $totalNovels = Novel::count();
        $publishedNovels = Novel::where('status', 'published')->count();

        $pendingReviewOrders = Order::whereIn('status', [
            Order::STATUS_PENDING,
            Order::STATUS_UNDER_REVIEW,
        ])->count();

        $approvedOrders = Order::where('status', Order::STATUS_APPROVED)->count();

        return [
            Stat::make(
                __('admin.stat_total_users'),
                $totalUsers,
            )
                ->description(__('admin.stat_registered_customers'))
                ->descriptionIcon(Heroicon::OutlinedUsers)
                ->color('primary'),

            Stat::make(
                __('admin.stat_novels'),
                $totalNovels,
            )
                ->description(__('admin.stat_published_count', ['count' => $publishedNovels]))
                ->descriptionIcon(Heroicon::OutlinedBookOpen)
                ->color('info'),

            Stat::make(
                __('admin.stat_pending_orders'),
                $pendingReviewOrders,
            )
                ->description(__('admin.stat_awaiting_action'))
                ->descriptionIcon(Heroicon::OutlinedClock)
                ->color('warning'),

            Stat::make(
                __('admin.stat_approved_orders'),
                $approvedOrders,
            )
                ->description(__('admin.stat_completed_sales'))
                ->descriptionIcon(Heroicon::OutlinedCheckCircle)
                ->color('success'),
        ];
    }
}
