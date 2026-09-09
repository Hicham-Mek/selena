<?php

namespace App\Filament\Resources\Users\RelationManagers;

use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\DateTimePicker;

class EntitlementsRelationManager extends RelationManager
{
    protected static string $relationship = 'entitlements';

    protected static ?string $title = 'Purchased Novels (Entitlements)';

    public function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Select::make('novel_id')
                    ->relationship('novel', 'title_ar')
                    ->searchable()
                    ->preload()
                    ->required()
                    ->label(__('admin.novel')),
                    
                DateTimePicker::make('granted_at')
                    ->label(__('admin.created_at'))
                    ->default(now())
                    ->required(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('id')
            ->columns([
                Tables\Columns\TextColumn::make('novel.title_ar')
                    ->label(__('admin.novel'))
                    ->searchable()
                    ->sortable(),
                    
                Tables\Columns\TextColumn::make('order.status')
                    ->label(__('admin.order_status'))
                    ->badge()
                    ->formatStateUsing(fn (?string $state): string => match ($state) {
                        'pending'      => __('admin.status_pending'),
                        'under_review' => __('admin.status_under_review'),
                        'approved'     => __('admin.status_approved'),
                        'rejected'     => __('admin.status_rejected'),
                        null           => 'Gifted / Manual',
                        default        => $state,
                    })
                    ->color(fn (?string $state): string => match ($state) {
                        'pending'      => 'warning',
                        'under_review' => 'info',
                        'approved'     => 'success',
                        'rejected'     => 'danger',
                        null           => 'success',
                        default        => 'gray',
                    }),
                    
                Tables\Columns\TextColumn::make('granted_at')
                    ->label(__('admin.created_at'))
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                \Filament\Actions\CreateAction::make()
                    ->label('Gift Novel')
                    ->modalHeading('Gift Novel Access to User'),
            ])
            ->actions([
                \Filament\Actions\EditAction::make(),
                \Filament\Actions\DeleteAction::make()
                    ->label('Revoke Access')
                    ->modalHeading('Revoke Access'),
            ])
            ->bulkActions([
                \Filament\Actions\BulkActionGroup::make([
                    \Filament\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
