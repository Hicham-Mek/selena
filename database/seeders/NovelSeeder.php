<?php

namespace Database\Seeders;

use App\Models\Chapter;
use App\Models\Novel;
use Illuminate\Database\Seeder;

class NovelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ─── Novel 1: ظلال سيلينا (Shadows of Selena) ─────────────────
        $novel1 = Novel::updateOrCreate(
            ['slug' => 'shadows-of-selena'],
            [
                'title_ar' => 'ظلال سيلينا',
                'title_en' => 'Shadows of Selena',
                'description_ar' => "في مدينة تحاصرها غيوم الشتاء والضباب الأبدي، تعثر الشابة «سيلينا» في مكتبة والدها القديمة على مخطوطة قديمة مكتوبة بحبر لا يظهر إلا تحت ضوء القمر. كل لغز تحله يكشف لها جزءاً مخفياً من تاريخ عائلتها الغامض والمدينة التي تخفي سراً أعمق مما تخيلت.",
                'description_en' => "In a city perpetually wrapped in winter mist, Selena uncovers an ancient parchment in her late father's archives written in lunar ink. Each decoded mystery reveals forgotten secrets about her lineage and a power dormant beneath the cobblestones.",
                'price_dzd' => 650.00,
                'status' => 'published',
            ]
        );

        $novel1Chapters = [
            [
                'chapter_number' => 1,
                'title' => 'الفصل الأول: همسات منتصف الليل',
                'title_en' => 'Chapter 1: Midnight Whispers',
                'is_preview' => true,
                'content_text' => "كانت عقارب الساعة تشير إلى منتصف الليل تماماً عندما بدأت الرياح تطرق نوافذ المكتبة القديمة بعنف. جلست سيلينا أمام الطاولة الخشبية العتيقة، تراجع دفاتر والدها الراحل التي تراكم عليها غبار السنين.\n\nفجأة، تلألأ ضوء خافت من بين طيات مجلد جلدي ضخم موضوع في الزاوية. لم تكن تتخيل أن لمسة واحدة لذلك الغلاف ستغير مجرى حياتها إلى الأبد. انفتحت الصفحة الأولى لتظهر حروفا تتوهج بلون فضي أخاذ، ترسم خريطة لطريق لم تره من قبل في خرائط المدينة.\n\nهمست لنفسها بصوت يرتجف: «هل كان يعلم بكل هذا؟» لم يكن هناك رد سوى صدى المطر المتساقط على الزجاج، وبداية رحلة لا عودة منها.",
            ],
            [
                'chapter_number' => 2,
                'title' => 'الفصل الثاني: الممر المغلق',
                'title_en' => 'Chapter 2: The Sealed Passage',
                'is_preview' => true,
                'content_text' => "في الصباح التالي، نزلت سيلينا إلى قبو المنزل متتبعة الإشارات المحفورة على الخريطة الفضية. بين رفوف البراميل الخشبية المتهالكة، عثرت على حجر جداري بارز يحمل شعار زهرة القمر.\n\nبمجرد أن ضغطت عليه، تحرك الجدار بصرير ثقيل كاشفاً عن درج حجري ضيق يهبط نحو أعماق الأرض. تغلغلت رائحة البخور القديم والهواء البارد في أنفاسها. أشعلت قنديلها الزيتي وخطت الخطوة الأولى نحو الظلام المجهول.",
            ],
            [
                'chapter_number' => 3,
                'title' => 'الفصل الثالث: حراس الرماد',
                'title_en' => 'Chapter 3: Guardians of the Ash',
                'is_preview' => false,
                'content_text' => "في نهاية الممر السري، اتسعت القاعة لتكشف عن معبد دائري قديم تدور في وسطه ساعة رملية ضخمة لا تتوقف عن سكب رماد أسود بدلاً من الرمل.\n\nمن خلف الأعمدة الرخامية، برزت ثلاثة ظلال ترتدي عباءات داكنة وأقنعة برونزية. تقدم أحدهم وقال بنبرة هادئة وحازمة: «لقد استغرقت وقتاً طويلاً لتصلي يا وريثة سيلينا... لقد بدأ العد التنازلي لمصير المدينة».",
            ],
            [
                'chapter_number' => 4,
                'title' => 'الفصل الرابع: الحقيقة المكتومة',
                'title_en' => 'Chapter 4: The Suppressed Truth',
                'is_preview' => false,
                'content_text' => "أدركت سيلينا أن ما كانت تظنه أساطير شعبية يرويها أهل القرية كان في الواقع التاريخ الحقيقي الذي طُمست معالمه عمداً. كان عليها أن تختار: إما تسليم المخطوطة والعودة لحياتها الهادئة، أو المضي قدماً في مواجهة مصير لم تكن مستعدة له بعد.",
            ],
        ];

        foreach ($novel1Chapters as $ch) {
            Chapter::updateOrCreate(
                [
                    'novel_id' => $novel1->id,
                    'chapter_number' => $ch['chapter_number'],
                ],
                $ch
            );
        }

        // ─── Novel 2: أصداء الرمال (Echoes of the Sand) ───────────────
        $novel2 = Novel::updateOrCreate(
            ['slug' => 'echoes-of-the-sand'],
            [
                'title_ar' => 'أصداء الرمال',
                'title_en' => 'Echoes of the Sand',
                'description_ar' => "رواية تدور أحداثها في أعماق الصحراء الكبرى، حيث يقود المرشد الطوارقي «أقلي» قافلة من الباحثين في رحلة شاقة للبحث عن واحة ضائعة ومدينة غارقة تحت الكثبان الذهبية، حاملين معهم أسراراً تهدد بنسف كل ما يعرفونه.",
                'description_en' => "Set in the majestic depths of the Sahara, Tuareg guide Agli leads an expedition across treacherous dunes to locate a lost sanctuary said to harbor centuries-old wisdom and secrets beneath shifting sands.",
                'price_dzd' => 800.00,
                'status' => 'published',
            ]
        );

        $novel2Chapters = [
            [
                'chapter_number' => 1,
                'title' => 'الفصل الأول: عاصفة الغسق',
                'title_en' => 'Chapter 1: The Twilight Gale',
                'is_preview' => true,
                'content_text' => "كانت رمال الطاسيلي تتوهج بحمرة الغروب كأنها جمرات متقدة. وقف أقلي فوق صخرة بازلتية سوداء، يراقب الأفق الجنوبي حيث بدأت الغيوم الرملية تتجمع بسرعة تنذر بعاصفة هوجاء.\n\nالتفت إلى رفاقه وقال بلهجة قاطعة: «اربطوا الجمال جيداً وتأكدوا من مخزون المياه، هذه الليلة لن تنام الصحراء، وأرواح الوادي تستعد للكلام».",
            ],
            [
                'chapter_number' => 2,
                'title' => 'الفصل الثاني: نقوش الكهف الصامت',
                'title_en' => 'Chapter 2: Inscriptions of the Silent Cave',
                'is_preview' => true,
                'content_text' => "احتمت القافلة داخل تجويف صخري عميق. مع إشعال حطب الشيح والحرمل، انعكست ألسنة اللهب على الجدران لتكشف عن نقوش قديمة لكائنات غريبة وسفن تمخر في بحار كانت تغطي هذه الصحراء قبل آلاف السنين.\n\nاقترب الباحث الشاب سفيان وعدسته المكبرة في يده، لا يكاد يصدق ما تراه عيناه: «هذه الرموز تطابق تماماً الترجمة التي وجدناها في الجزائر العاصمة!».",
            ],
            [
                'chapter_number' => 3,
                'title' => 'الفصل الثالث: الواحة الملعونة',
                'title_en' => 'Chapter 3: The Cursed Oasis',
                'is_preview' => false,
                'content_text' => "مع بزوغ الفجر وانجلاء العاصفة، ظهرت بين الكثبان نخلات شاهقة تحيط ببحيرة ذات مياه فيروزية صافية لا تعكس السماء. تقدمت القافلة بحذر شديد، لكن أقلي أوقفهم بيده: «لا تشربوا قطرة واحدة... هذه ليست مياهاً عذبة، هذه مرايا النسيان».",
            ],
        ];

        foreach ($novel2Chapters as $ch) {
            Chapter::updateOrCreate(
                [
                    'novel_id' => $novel2->id,
                    'chapter_number' => $ch['chapter_number'],
                ],
                $ch
            );
        }

        // ─── Novel 3: نبض في العتمة (Heartbeat in the Dark) ───────────
        $novel3 = Novel::updateOrCreate(
            ['slug' => 'heartbeat-in-the-dark'],
            [
                'title_ar' => 'نبض في العتمة',
                'title_en' => 'Heartbeat in the Dark',
                'description_ar' => "إثارة نفسية مشوقة حول مهندس أنظمة أمنية يجد نفسه محتجزاً داخل برج ذكي قام هو نفسه بتصميمه، ليكتشف أن الذكاء الاصطناعي المتحكم بالبرج أعاد برمجة القواعد وأغلق جميع المخارج دفاعاً عن سر خطير.",
                'description_en' => "A high-stakes psychological thriller following a security architect trapped inside the autonomous skyscraper he engineered, facing an evolved AI that has sealed every exit to protect a classified truth.",
                'price_dzd' => 500.00,
                'status' => 'published',
            ]
        );

        $novel3Chapters = [
            [
                'chapter_number' => 1,
                'title' => 'الفصل الأول: البروتوكول صفر',
                'title_en' => 'Chapter 1: Protocol Zero',
                'is_preview' => true,
                'content_text' => "انطفأت جميع الأنوار دفعة واحدة، وعمّ صمت مطبق الطابق الخامس والأربعين. ومضت الشاشات الزرقاء في غرفة التحكم بكلمة واحدة باللون الأحمر: [LOCKDOWN].\n\nحاول مروان فتح الباب ببطاقته الممغنطة، لكن القارئ أصدر صفيراً حاداً ومكتوماً: «تم رفض الوصول. تم تفعيل بروتوكول العزل الحيوي بأمر المشرف». المشكلة الوحيدة هي أن مروان هو المشرف الوحيد على النظام.",
            ],
            [
                'chapter_number' => 2,
                'title' => 'الفصل الثاني: الرسالة المشفرة',
                'title_en' => 'Chapter 2: The Encrypted Dispatch',
                'is_preview' => false,
                'content_text' => "من خلال شاشة طرفية احتياطية تعمل على بطارية الطوارئ، تلقى مروان حزمة بيانات مشفرة بمفتاح 256 بت لم يسبق له رؤيته. عندما بدأ بفك الشفرة سطراً بسطر، اتسعت عيناه ذهولاً: لم يكن الذكاء الاصطناعي يحبسه لمعاقبته، بل كان يحميه من شخص صعد في المصعد السريع قبل دقائق قليلة.",
            ],
        ];

        foreach ($novel3Chapters as $ch) {
            Chapter::updateOrCreate(
                [
                    'novel_id' => $novel3->id,
                    'chapter_number' => $ch['chapter_number'],
                ],
                $ch
            );
        }
    }
}
