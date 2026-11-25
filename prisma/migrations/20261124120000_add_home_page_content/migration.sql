-- CreateTable
CREATE TABLE `home_pages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `locale` VARCHAR(2) NOT NULL,
    `hero_title` VARCHAR(255) NOT NULL,
    `hero_subtitle` VARCHAR(255) NOT NULL,
    `hero_description` TEXT NOT NULL,
    `hero_image` VARCHAR(500) NOT NULL,
    `about_eyebrow` VARCHAR(150) NOT NULL,
    `about_title` VARCHAR(255) NOT NULL,
    `about_description` TEXT NOT NULL,
    `about_video_url` VARCHAR(500) NOT NULL,
    `amenities_eyebrow` VARCHAR(150) NOT NULL,
    `amenities_title` VARCHAR(255) NOT NULL,
    `gallery_eyebrow` VARCHAR(150) NOT NULL,
    `gallery_title` VARCHAR(255) NOT NULL,
    `testimonials_eyebrow` VARCHAR(150) NOT NULL,
    `testimonials_title` VARCHAR(255) NOT NULL,
    `cta_title` VARCHAR(255) NOT NULL,
    `cta_description` TEXT NOT NULL,
    `cta_button_label` VARCHAR(150) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `home_pages_locale_key`(`locale`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `home_amenities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `home_page_id` INTEGER NOT NULL,
    `icon_key` VARCHAR(50) NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    INDEX `home_amenities_home_page_id_sort_order_idx`(`home_page_id`, `sort_order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `home_gallery_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `home_page_id` INTEGER NOT NULL,
    `image_url` VARCHAR(500) NOT NULL,
    `alt` VARCHAR(255) NOT NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    INDEX `home_gallery_images_home_page_id_sort_order_idx`(`home_page_id`, `sort_order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `home_testimonials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `home_page_id` INTEGER NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    `text` TEXT NOT NULL,
    `rating` INTEGER NOT NULL DEFAULT 5,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    INDEX `home_testimonials_home_page_id_sort_order_idx`(`home_page_id`, `sort_order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `home_amenities` ADD CONSTRAINT `home_amenities_home_page_id_fkey` FOREIGN KEY (`home_page_id`) REFERENCES `home_pages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `home_gallery_images` ADD CONSTRAINT `home_gallery_images_home_page_id_fkey` FOREIGN KEY (`home_page_id`) REFERENCES `home_pages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `home_testimonials` ADD CONSTRAINT `home_testimonials_home_page_id_fkey` FOREIGN KEY (`home_page_id`) REFERENCES `home_pages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Seed the current Arabic and English homepage content.
INSERT INTO `home_pages` (`locale`, `hero_title`, `hero_subtitle`, `hero_description`, `hero_image`, `about_eyebrow`, `about_title`, `about_description`, `about_video_url`, `amenities_eyebrow`, `amenities_title`, `gallery_eyebrow`, `gallery_title`, `testimonials_eyebrow`, `testimonials_title`, `cta_title`, `cta_description`, `cta_button_label`, `created_at`, `updated_at`) VALUES
('ar', 'اهرب من صخب المدينة', 'واستمتع بإقامة هادئة في كوخ السرور', 'كوخ مجهز بالكامل بإطلالة خلابة وسط الطبيعة، حيث الهدوء والخصوصية والتصميم العصري يلتقون في مكان واحد.', '/images/bk.png', 'عن كوخ السرور', 'ملاذك الهادئ بين الأشجار', 'يقع كوخ السرور في قلب الطبيعة الخلابة، محاطاً بأشجار السرو العتيقة وإطلالات ساحرة على الجبال. صُمم الكوخ ليوفر تجربة إقامة فاخرة تجمع بين سحر الطبيعة وراحة المنزل العصري.', 'https://www.youtube.com/embed/Glcw-WGzD_g?si=0u0-KnX85yF9mBp6', 'المرافق والخدمات', 'كل ما تحتاجه لإقامة مثالية', 'صور من الكوخ', 'اكتشف جمال المكان', 'آراء الضيوف', 'ماذا يقول ضيوفنا', 'جاهز لتجربة لا تُنسى؟', 'احجز إقامتك الآن واستمتع بأجمل الأوقات وسط الطبيعة', 'ابدأ الحجز الآن', NOW(3), NOW(3)),
('en', 'Escape the noise of the city', 'And enjoy a peaceful stay at Kookh Al Soroor', 'A fully equipped cabin with a breathtaking view surrounded by nature, where tranquility, privacy and modern design meet.', '/images/bk.png', 'About Kookh Al Soroor', 'Your peaceful escape among the trees', 'Kookh Al Soroor is located in the heart of beautiful nature, surrounded by cypress trees and breathtaking mountain views. The cabin offers a luxurious stay that combines the charm of nature with modern comfort.', 'https://www.youtube.com/embed/Glcw-WGzD_g?si=0u0-KnX85yF9mBp6', 'Amenities & services', 'Everything you need for a perfect stay', 'Cabin gallery', 'Discover the beauty of the place', 'Guest reviews', 'What our guests say', 'Ready for an unforgettable stay?', 'Book your stay now and enjoy beautiful moments surrounded by nature.', 'Start booking', NOW(3), NOW(3));

SET @home_ar = (SELECT `id` FROM `home_pages` WHERE `locale` = 'ar');
SET @home_en = (SELECT `id` FROM `home_pages` WHERE `locale` = 'en');

INSERT INTO `home_amenities` (`home_page_id`, `icon_key`, `name`, `description`, `sort_order`) VALUES
(@home_ar, 'wifi', 'واي فاي مجاني', 'اتصال سريع بالإنترنت', 0),
(@home_ar, 'fireplace', 'مدفأة', 'أجواء دافئة في الشتاء', 1),
(@home_ar, 'mountain', 'إطلالة طبيعية', 'مناظر خلابة على الجبال', 2),
(@home_ar, 'kitchen', 'مطبخ مجهز', 'كل ما تحتاجه للطهي', 3),
(@home_ar, 'parking', 'موقف سيارات', 'موقف خاص ومجاني', 4),
(@home_ar, 'airConditioning', 'تكييف', 'تحكم كامل بدرجة الحرارة', 5),
(@home_en, 'wifi', 'Free Wi-Fi', 'Fast internet connection', 0),
(@home_en, 'fireplace', 'Fireplace', 'A warm atmosphere in winter', 1),
(@home_en, 'mountain', 'Scenic view', 'Breathtaking mountain views', 2),
(@home_en, 'kitchen', 'Equipped kitchen', 'Everything you need for cooking', 3),
(@home_en, 'parking', 'Private parking', 'Free private parking', 4),
(@home_en, 'airConditioning', 'Air conditioning', 'Full temperature control', 5);

INSERT INTO `home_gallery_images` (`home_page_id`, `image_url`, `alt`, `sort_order`) VALUES
(@home_ar, '/images/pic-1.png', 'جلسة داخلية في الكوخ', 0),
(@home_ar, '/images/pic-2.png', 'جلسة خارجية وسط الطبيعة', 1),
(@home_ar, '/images/pic-3.png', 'الكوخ بين الجبال', 2),
(@home_ar, '/images/bk.png', 'واجهة الكوخ وقت الغروب', 3),
(@home_ar, '/images/pic-1.png', 'تفاصيل الأثاث داخل الكوخ', 4),
(@home_en, '/images/pic-1.png', 'Indoor seating area in the cabin', 0),
(@home_en, '/images/pic-2.png', 'Outdoor seating surrounded by nature', 1),
(@home_en, '/images/pic-3.png', 'The cabin among the mountains', 2),
(@home_en, '/images/bk.png', 'The cabin exterior at sunset', 3),
(@home_en, '/images/pic-1.png', 'Furniture details inside the cabin', 4);

INSERT INTO `home_testimonials` (`home_page_id`, `name`, `text`, `rating`, `sort_order`) VALUES
(@home_ar, 'أحمد العتيبي', 'تجربة رائعة! المكان نظيف جداً وهادئ والطبيعة المحيطة بالكوخ جميلة بشكل لا يوصف.', 5, 0),
(@home_ar, 'محمد السالم', 'مكان يفوق التوقعات، مناسب للاسترخاء وقضاء وقت مميز بعيداً عن ضوضاء المدينة.', 4, 1),
(@home_en, 'Ahmed Alotaibi', 'A wonderful experience! The place was very clean and peaceful, and the surrounding nature was incredibly beautiful.', 5, 0),
(@home_en, 'Mohammed Alsalem', 'The place exceeded our expectations. It is perfect for relaxing and enjoying quality time away from the noise of the city.', 4, 1);
