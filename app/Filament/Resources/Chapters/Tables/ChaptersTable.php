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
                    ->label('Novel')
                    ->sortable()
                    ->searchable()
                    ->limit(30),
                TextColumn::make('chapter_number')
                    ->label('#')
                    ->sortable()
                    ->alignCenter(),
                TextColumn::make('title')
                    ->label('Title')
                    ->searchable()
                    ->limit(40),
                IconColumn::make('is_preview')
                    ->label('Preview')
                    ->boolean()
                    ->alignCenter(),
                IconColumn::make('audio_path')
                    ->label('Audio')
                    ->boolean()
                    ->getStateUsing(fn ($record) => filled($record->audio_path))
                    ->alignCenter(),
                TextColumn::make('created_at')
                    ->label('Created')
                    ->dateTime('M d, Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('novel_id')
            ->filters([
                SelectFilter::make('novel_id')
                    ->label('Novel')
                    ->relationship('novel', 'title_ar'),
                TernaryFilter::make('is_preview')
                    ->label('Preview Only'),
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
