<?php

namespace App\Filament\Resources\Chapters\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ChapterForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make(__('admin.chapter_details'))
                    ->schema([
                        Select::make('novel_id')
                            ->relationship('novel', 'title_ar')
                            ->searchable()
                            ->preload()
                            ->required()
                            ->label(__('admin.novel_select')),

                        TextInput::make('chapter_number')
                            ->label(__('admin.chapter_number'))
                            ->required()
                            ->numeric()
                            ->minValue(1)
                            ->default(1),

                        TextInput::make('title')
                            ->label(__('admin.chapter_title_ar'))
                            ->placeholder('مثال: الفصل الأول - البداية')
                            ->required()
                            ->maxLength(255),

                        TextInput::make('title_en')
                            ->label(__('admin.chapter_title_en'))
                            ->placeholder('e.g. Chapter 1: The Beginning')
                            ->maxLength(255),

                        Toggle::make('is_preview')
                            ->label(__('admin.is_preview'))
                            ->helperText(__('admin.is_preview_helper'))
                            ->columnSpanFull()
                            ->default(false),
                    ])
                    ->columns(2),

                Section::make(__('admin.chapter_content'))
                    ->schema([
                        RichEditor::make('content_text')
                            ->label(__('admin.content_text'))
                            ->required()
                            ->columnSpanFull()
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'underline',
                                'strike',
                                'h2',
                                'h3',
                                'bulletList',
                                'orderedList',
                                'blockquote',
                                'horizontalRule',
                                'undo',
                                'redo',
                            ]),
                    ]),

                Section::make(__('admin.chapter_audio'))
                    ->description(__('admin.audio_helper'))
                    ->schema([
                        FileUpload::make('audio_path')
                            ->label(__('admin.audio_file'))
                            ->disk('local')
                            ->directory('audio/chapters')
                            ->acceptedFileTypes([
                                'audio/mpeg',
                                'audio/mp4',
                                'audio/x-m4a',
                                'audio/wav',
                                'audio/x-wav',
                            ])
                            ->maxSize(61440) // 60MB in KB
                            ->preserveFilenames()
                            ->helperText(__('admin.audio_helper')),
                    ]),
            ]);
    }
}
