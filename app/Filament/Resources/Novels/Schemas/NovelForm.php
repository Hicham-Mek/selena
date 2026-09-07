<?php

namespace App\Filament\Resources\Novels\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class NovelForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Arabic Content')
                    ->description('Required Arabic title and description')
                    ->schema([
                        TextInput::make('title_ar')
                            ->label('العنوان بالعربية')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function ($state, callable $set, $get) {
                                // Auto-generate slug from English title if available, otherwise Arabic
                                if (empty($get('slug'))) {
                                    $set('slug', Str::slug($get('title_en') ?: $state));
                                }
                            }),
                        Textarea::make('description_ar')
                            ->label('الوصف بالعربية')
                            ->required()
                            ->rows(4),
                    ])
                    ->columns(1),

                Section::make('English Content (Optional)')
                    ->description('Optional English translations')
                    ->schema([
                        TextInput::make('title_en')
                            ->label('English Title')
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function ($state, callable $set) {
                                if ($state) {
                                    $set('slug', Str::slug($state));
                                }
                            }),
                        Textarea::make('description_en')
                            ->label('English Description')
                            ->rows(4),
                    ])
                    ->columns(1)
                    ->collapsed(),

                Section::make('Details')
                    ->schema([
                        TextInput::make('slug')
                            ->label('Slug (URL)')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->helperText('Auto-generated from title. You can customise it.'),
                        TextInput::make('price_dzd')
                            ->label('Price (DZD)')
                            ->numeric()
                            ->required()
                            ->prefix('د.ج')
                            ->minValue(0)
                            ->step(0.01),
                        Select::make('status')
                            ->label('Status')
                            ->options([
                                'draft' => 'Draft',
                                'published' => 'Published',
                            ])
                            ->default('draft')
                            ->required(),
                        FileUpload::make('cover_image_path')
                            ->label('Cover Image')
                            ->image()
                            ->disk('public')
                            ->directory('covers')
                            ->imageResizeMode('cover')
                            ->imageCropAspectRatio('2:3')
                            ->imageResizeTargetWidth('400')
                            ->imageResizeTargetHeight('600')
                            ->maxSize(5120), // 5MB
                    ])
                    ->columns(2),
            ]);
    }
}
