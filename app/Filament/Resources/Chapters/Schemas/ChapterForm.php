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
                Section::make('Chapter Details')
                    ->schema([
                        Select::make('novel_id')
                            ->relationship('novel', 'title_ar')
                            ->searchable()
                            ->preload()
                            ->required()
                            ->label('Novel'),
                        TextInput::make('chapter_number')
                            ->label('Chapter Number')
                            ->required()
                            ->numeric()
                            ->minValue(1)
                            ->default(1),
                        TextInput::make('title')
                            ->label('Chapter Title')
                            ->required()
                            ->maxLength(255),
                        Toggle::make('is_preview')
                            ->label('Free Preview')
                            ->helperText('If enabled, this chapter will be freely accessible without payment.')
                            ->default(false),
                    ])
                    ->columns(2),

                Section::make('Content')
                    ->schema([
                        RichEditor::make('content_text')
                            ->label('Chapter Text')
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

                Section::make('Audio')
                    ->description('Upload an audio narration for this chapter (MP3, M4A, or WAV, max 60MB)')
                    ->schema([
                        FileUpload::make('audio_path')
                            ->label('Audio File')
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
                            ->helperText('Accepted formats: .mp3, .m4a, .wav — Max size: 60MB'),
                    ])
                    ->collapsed(),
            ]);
    }
}
