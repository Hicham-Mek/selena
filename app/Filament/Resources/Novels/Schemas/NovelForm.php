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
                Section::make(__('admin.novels'))
                    ->schema([
                        TextInput::make('title_ar')
                            ->label(__('admin.title_ar'))
                            ->placeholder('مثال: البؤساء')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function ($state, callable $set, $get) {
                                if (empty($get('slug'))) {
                                    $set('slug', Str::slug($get('title_en') ?: $state));
                                }
                            }),

                        TextInput::make('title_en')
                            ->label(__('admin.title_en'))
                            ->placeholder('e.g. Les Misérables')
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function ($state, callable $set) {
                                if ($state) {
                                    $set('slug', Str::slug($state));
                                }
                            }),

                        TextInput::make('slug')
                            ->label(__('admin.slug'))
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->helperText(__('admin.slug_helper'))
                            ->columnSpanFull(),

                        Textarea::make('description_ar')
                            ->label(__('admin.description_ar'))
                            ->required()
                            ->rows(4),

                        Textarea::make('description_en')
                            ->label(__('admin.description_en'))
                            ->rows(4),
                    ])
                    ->columns(2),

                Section::make(__('admin.pricing_and_publishing'))
                    ->schema([
                        TextInput::make('price_dzd')
                            ->label(__('admin.price_dzd'))
                            ->numeric()
                            ->required()
                            ->prefix('د.ج')
                            ->minValue(0)
                            ->step(0.01),

                        Select::make('status')
                            ->label(__('admin.status'))
                            ->options([
                                'draft' => __('admin.status_draft'),
                                'published' => __('admin.status_published'),
                            ])
                            ->default('draft')
                            ->required()
                            ->rules([
                                fn ($get, $record) => function (string $attribute, $value, \Closure $fail) use ($record) {
                                    if ($value === 'published') {
                                        if (! $record) {
                                            $fail(__('admin.publish_requires_chapters_new'));
                                        } elseif ($record->chapters()->count() === 0) {
                                            $fail(__('admin.publish_requires_chapters'));
                                        }
                                    }
                                },
                            ]),

                        FileUpload::make('cover_image_path')
                            ->label(__('admin.cover_image'))
                            ->helperText(__('admin.cover_image_helper'))
                            ->image()
                            ->disk('public')
                            ->directory('covers')
                            ->imageResizeMode('cover')
                            ->imageCropAspectRatio('2:3')
                            ->imageResizeTargetWidth('400')
                            ->imageResizeTargetHeight('600')
                            ->maxSize(5120) // 5MB
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
            ]);
    }
}
