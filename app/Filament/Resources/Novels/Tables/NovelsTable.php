<?php

namespace App\Filament\Resources\Novels\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class NovelsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('cover_image_path')
                    ->label(__('admin.cover_image'))
                    ->disk('public')
                    ->width(50)
                    ->height(75),

                TextColumn::make('title_ar')
                    ->label(__('admin.title_ar'))
                    ->searchable()
                    ->sortable()
                    ->limit(35),

                TextColumn::make('title_en')
                    ->label(__('admin.title_en'))
                    ->searchable()
                    ->sortable()
                    ->limit(35)
                    ->placeholder('—'),

                TextColumn::make('price_dzd')
                    ->label(__('admin.price_dzd'))
                    ->money('DZD')
                    ->sortable(),

                TextColumn::make('status')
                    ->label(__('admin.status'))
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'published' => __('admin.status_published'),
                        'draft' => __('admin.status_draft'),
                        default => $state,
                    })
                    ->color(fn (string $state): string => match ($state) {
                        'published' => 'success',
                        'draft' => 'warning',
                        default => 'gray',
                    }),

                TextColumn::make('chapters_count')
                    ->label(__('admin.chapters_count'))
                    ->counts('chapters')
                    ->sortable(),

                TextColumn::make('created_at')
                    ->label(__('admin.created_at'))
                    ->dateTime('d/m/Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                SelectFilter::make('status')
                    ->label(__('admin.status'))
                    ->options([
                        'draft' => __('admin.status_draft'),
                        'published' => __('admin.status_published'),
                    ]),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
