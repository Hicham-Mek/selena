<?php

namespace App\Filament\Resources\Chapters\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class ChaptersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('novel.title_ar')
                    ->label(__('admin.novel'))
                    ->sortable()
                    ->searchable()
                    ->limit(30),

                TextColumn::make('chapter_number')
                    ->label(__('admin.chapter_number'))
                    ->sortable()
                    ->alignCenter(),

                TextColumn::make('title')
                    ->label(__('admin.chapter_title_ar'))
                    ->searchable()
                    ->limit(30),

                TextColumn::make('title_en')
                    ->label(__('admin.chapter_title_en'))
                    ->searchable()
                    ->limit(30)
                    ->placeholder('—'),

                IconColumn::make('is_preview')
                    ->label(__('admin.is_preview'))
                    ->boolean()
                    ->alignCenter(),

                IconColumn::make('audio_path')
                    ->label(__('admin.has_audio'))
                    ->boolean()
                    ->getStateUsing(fn ($record) => filled($record->audio_path))
                    ->alignCenter(),

                TextColumn::make('created_at')
                    ->label(__('admin.created_at'))
                    ->dateTime('d/m/Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('novel_id')
            ->filters([
                SelectFilter::make('novel_id')
                    ->label(__('admin.novel'))
                    ->relationship('novel', 'title_ar'),

                TernaryFilter::make('is_preview')
                    ->label(__('admin.preview_only_filter')),
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
