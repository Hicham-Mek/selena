<?php

return [
    'novels' => 'Novels',
    'novel' => 'Novel',
    'chapters' => 'Chapters',
    'chapter' => 'Chapter',

    // Novel Form & Table
    'title_ar' => 'Title (Arabic)',
    'title_en' => 'Title (English - Optional)',
    'slug' => 'Slug (URL)',
    'slug_helper' => 'Auto-generated from title. You can customize it manually.',
    'description_ar' => 'Description (Arabic)',
    'description_en' => 'Description (English - Optional)',
    'price_dzd' => 'Price (DZD)',
    'status' => 'Status',
    'cover_image' => 'Cover Image',
    'cover_image_helper' => 'Recommended aspect ratio 2:3 (e.g. 400x600)',
    'status_draft' => 'Draft',
    'status_published' => 'Published',
    'chapters_count' => 'Chapters',
    'created_at' => 'Created At',

    // Sections
    'arabic_content' => 'Arabic Content (Required)',
    'english_content' => 'English Content (Optional)',
    'pricing_and_publishing' => 'Pricing & Publishing',
    'chapter_details' => 'Chapter Details',
    'chapter_content' => 'Chapter Content',
    'chapter_audio' => 'Audio Narration',

    // Chapter Form & Table
    'novel_select' => 'Parent Novel',
    'chapter_number' => 'Chapter #',
    'chapter_title' => 'Chapter Title',
    'chapter_title_ar' => 'Chapter Title (Arabic)',
    'chapter_title_en' => 'Chapter Title (English - Optional)',
    'is_preview' => 'Free Preview',
    'is_preview_helper' => 'When enabled, this chapter will be freely accessible for reading & listening without payment.',
    'content_text' => 'Chapter Content (Text/HTML)',
    'audio_file' => 'Audio File',
    'audio_helper' => 'Accepted formats: .mp3, .m4a, .wav — Max size: 60MB',
    'has_audio' => 'Audio',
    'preview_only_filter' => 'Free Preview Only',

    // Orders
    'orders' => 'Orders',
    'order' => 'Order',
    'order_status' => 'Order Status',
    'amount_paid' => 'Amount Paid',
    'receipt_path' => 'Payment Receipt',
    'rejection_reason' => 'Rejection Reason',
    'status_pending' => 'Pending',
    'status_under_review' => 'Under Review',
    'status_approved' => 'Approved',
    'status_rejected' => 'Rejected',
    'customer' => 'Customer',

    // Order Actions (M5)
    'approve' => 'Approve',
    'reject' => 'Reject',
    'close' => 'Close',
    'approve_order' => 'Approve Order',
    'approve_order_confirm' => 'Are you sure you want to approve this order and grant access to the novel?',
    'reject_order' => 'Reject Order',
    'rejection_reason_placeholder' => 'e.g. Blurry receipt, wrong amount...',
    'order_approved_notification' => 'Order approved and access granted.',
    'order_rejected_notification' => 'Order rejected.',
    'download_receipt' => 'Download Receipt',
    'receipt_link_expires' => 'This link expires in 10 minutes.',

    // Users (M8)
    'users' => 'Users',
    'user' => 'User',
    'user_info' => 'User Information',
    'user_name' => 'Name',
    'user_email' => 'Email',
    'user_password' => 'Password',
    'user_password_helper' => 'Leave blank to keep the current password.',
    'user_is_admin' => 'Admin Access',
    'user_is_admin_helper' => 'Grants access to this Filament admin panel.',
    'user_purchased_novels' => 'Purchased Novels',

    // Dashboard Stats (M8)
    'stat_total_users' => 'Total Users',
    'stat_registered_customers' => 'Registered Customers',
    'stat_novels' => 'Novels',
    'stat_published_count' => ':count Published',
    'stat_pending_orders' => 'Pending Orders',
    'stat_awaiting_action' => 'Awaiting Action',
    'stat_approved_orders' => 'Approved Orders',
    'stat_completed_sales' => 'Completed Sales',

    // Validation (M8)
    'publish_requires_chapters' => 'Cannot publish a novel that has no chapters.',
    'publish_requires_chapters_new' => 'Please save the novel first and add chapters before publishing.',
];
