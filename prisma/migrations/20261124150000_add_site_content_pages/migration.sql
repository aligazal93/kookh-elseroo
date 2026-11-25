CREATE TABLE `about_page_contents` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `locale` VARCHAR(2) NOT NULL,
  `hero_title` VARCHAR(255) NOT NULL,
  `hero_image` VARCHAR(500) NOT NULL,
  `story_eyebrow` VARCHAR(150) NOT NULL,
  `story_title` VARCHAR(255) NOT NULL,
  `story_first` TEXT NOT NULL,
  `story_second` TEXT NOT NULL,
  `story_image` VARCHAR(500) NOT NULL,
  `story_image_alt` VARCHAR(255) NOT NULL,
  `values_title` VARCHAR(255) NOT NULL,
  `values` JSON NOT NULL,
  `facilities_title` VARCHAR(255) NOT NULL,
  `facilities` JSON NOT NULL,
  `policies_title` VARCHAR(255) NOT NULL,
  `policies` JSON NOT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,
  UNIQUE INDEX `about_page_contents_locale_key`(`locale`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `faq_page_contents` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `locale` VARCHAR(2) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `hero_image` VARCHAR(500) NOT NULL,
  `groups` JSON NOT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,
  UNIQUE INDEX `faq_page_contents_locale_key`(`locale`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `contact_page_contents` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `locale` VARCHAR(2) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `hero_image` VARCHAR(500) NOT NULL,
  `form_title` VARCHAR(255) NOT NULL,
  `form_labels` JSON NOT NULL,
  `contact_section_title` VARCHAR(255) NOT NULL,
  `map_title` VARCHAR(255) NOT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,
  UNIQUE INDEX `contact_page_contents_locale_key`(`locale`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `site_settings` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `locale` VARCHAR(2) NOT NULL,
  `site_name` VARCHAR(150) NOT NULL,
  `header_logo` VARCHAR(500) NOT NULL,
  `footer_logo` VARCHAR(500) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `fax` VARCHAR(50) NOT NULL,
  `address` VARCHAR(500) NOT NULL,
  `map_embed_url` TEXT NOT NULL,
  `instagram_url` VARCHAR(500) NOT NULL,
  `facebook_url` VARCHAR(500) NOT NULL,
  `x_url` VARCHAR(500) NOT NULL,
  `whatsapp_url` VARCHAR(500) NOT NULL,
  `footer_credit` VARCHAR(255) NOT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,
  UNIQUE INDEX `site_settings_locale_key`(`locale`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO `about_page_contents` (`locale`,`hero_title`,`hero_image`,`story_eyebrow`,`story_title`,`story_first`,`story_second`,`story_image`,`story_image_alt`,`values_title`,`values`,`facilities_title`,`facilities`,`policies_title`,`policies`,`created_at`,`updated_at`) VALUES
('ar','عن كوخ السرور','/images/road.png','عن كوخ السرور','ملاذك الهادئ بين الأشجار','بدأت فكرة كوخ السرور من حلم بسيط: توفير ملاذ هادئ وسط الطبيعة يجمع بين الفخامة والبساطة. في عام 2023، بدأنا ببناء هذا الكوخ في قلب وادي السرور، حيث تحتضنه الأشجار العتيقة والجبال الشامخة.','صممنا كل تفصيلة بعناية لنمنح ضيوفنا تجربة استثنائية، من الأثاث الخشبي المصنوع يدوياً إلى النوافذ الكبيرة التي تطل على أجمل المناظر الطبيعية.','/images/pic-4.png','كوخ السرور وسط الطبيعة','رؤيتنا وقيمنا',
 JSON_ARRAY(JSON_OBJECT('iconKey','nature','title','صديق للبيئة','description','نلتزم بالاستدامة في كل تفاصيل الكوخ من مواد البناء إلى مصادر الطاقة.'),JSON_OBJECT('iconKey','experience','title','تجربة فريدة','description','كل ضيف يحظى بتجربة شخصية لا تُنسى وسط أجمل المناظر الطبيعية.'),JSON_OBJECT('iconKey','location','title','قلب الطبيعة','description','موقع مثالي بعيد عن صخب المدينة ومحاط بأشجار السرو والجبال.')),
 'المرافق والخدمات',JSON_ARRAY(JSON_OBJECT('iconKey','wifi','title','واي فاي مجاني','description','اتصال سريع بالإنترنت'),JSON_OBJECT('iconKey','fireplace','title','مدفأة','description','أجواء دافئة في الشتاء'),JSON_OBJECT('iconKey','view','title','إطلالة طبيعية','description','مناظر خلابة على الجبال'),JSON_OBJECT('iconKey','kitchen','title','مطبخ مجهز','description','كل ما تحتاجه للطهي'),JSON_OBJECT('iconKey','parking','title','موقف سيارات','description','موقف خاص ومجاني'),JSON_OBJECT('iconKey','ac','title','تكييف','description','تحكم كامل بالحرارة')),
 'سياسات الإقامة',JSON_ARRAY(JSON_OBJECT('title','سياسة الإلغاء','description','يمكنك إلغاء الحجز مجاناً قبل 48 ساعة من موعد الوصول. بعد ذلك يتم خصم ليلة واحدة.'),JSON_OBJECT('title','أوقات الوصول والمغادرة','description','الوصول من الساعة 3:00 مساءً والمغادرة قبل 12:00 ظهراً.'),JSON_OBJECT('title','الحيوانات الأليفة','description','غير مسموح بالحيوانات الأليفة داخل الكوخ.'),JSON_OBJECT('title','التدخين','description','التدخين ممنوع داخل الكوخ. يمكن التدخين في التراس الخارجي فقط.'),JSON_OBJECT('title','الأطفال','description','الأطفال مرحب بهم. يتوفر سرير إضافي عند الطلب.')),NOW(3),NOW(3)),
('en','About Kookh Al Soroor','/images/road.png','About Kookh Al Soroor','Your peaceful escape among the trees','Kookh Al Soroor began with a simple dream: to create a peaceful retreat in nature that brings luxury and simplicity together. In 2023, we began building the cabin in the heart of Wadi Al Soroor.','Every detail was thoughtfully designed to give our guests an exceptional experience, from handcrafted wooden furniture to large windows overlooking beautiful natural scenery.','/images/pic-4.png','Kookh Al Soroor surrounded by nature','Our vision and values',
 JSON_ARRAY(JSON_OBJECT('iconKey','nature','title','Eco-friendly','description','We are committed to sustainability in every detail, from building materials to energy sources.'),JSON_OBJECT('iconKey','experience','title','A unique experience','description','Every guest enjoys a personal and unforgettable stay surrounded by beautiful scenery.'),JSON_OBJECT('iconKey','location','title','In the heart of nature','description','A perfect location away from the city, surrounded by cypress trees and mountains.')),
 'Amenities and services',JSON_ARRAY(JSON_OBJECT('iconKey','wifi','title','Free Wi-Fi','description','Fast internet connection'),JSON_OBJECT('iconKey','fireplace','title','Fireplace','description','A warm winter atmosphere'),JSON_OBJECT('iconKey','view','title','Scenic view','description','Breathtaking mountain views'),JSON_OBJECT('iconKey','kitchen','title','Equipped kitchen','description','Everything you need for cooking'),JSON_OBJECT('iconKey','parking','title','Private parking','description','Free private parking'),JSON_OBJECT('iconKey','ac','title','Air conditioning','description','Full temperature control')),
 'Stay policies',JSON_ARRAY(JSON_OBJECT('title','Cancellation policy','description','Cancel free of charge up to 48 hours before arrival. After that, one night will be charged.'),JSON_OBJECT('title','Check-in and check-out','description','Check-in starts at 3:00 PM and check-out is before 12:00 PM.'),JSON_OBJECT('title','Pets','description','Pets are not allowed inside the cabin.'),JSON_OBJECT('title','Smoking','description','Smoking is not allowed inside the cabin. It is permitted only on the outdoor terrace.'),JSON_OBJECT('title','Children','description','Children are welcome. An extra bed is available upon request.')),NOW(3),NOW(3));

INSERT INTO `faq_page_contents` (`locale`,`title`,`hero_image`,`groups`,`created_at`,`updated_at`) VALUES
('ar','الأسئلة الشائعة','/images/road.png',JSON_ARRAY(
 JSON_OBJECT('title','الحجز','items',JSON_ARRAY(JSON_OBJECT('question','ما هي سياسة الإلغاء؟','answer','يمكنك إلغاء الحجز مجاناً قبل 48 ساعة من موعد الوصول. بعد ذلك يتم خصم ليلة واحدة.'),JSON_OBJECT('question','ما هي أوقات الوصول والمغادرة؟','answer','الوصول من الساعة 3:00 مساءً والمغادرة قبل 12:00 ظهراً.'),JSON_OBJECT('question','هل الحيوانات الأليفة مسموحة؟','answer','غير مسموح بالحيوانات الأليفة داخل الكوخ.'),JSON_OBJECT('question','هل التدخين مسموح؟','answer','التدخين ممنوع داخل الكوخ، ويمكن التدخين في التراس الخارجي فقط.'),JSON_OBJECT('question','هل المكان مناسب للأطفال؟','answer','الأطفال مرحب بهم، ويتوفر سرير إضافي عند الطلب.'))),
 JSON_OBJECT('title','الدفع','items',JSON_ARRAY(JSON_OBJECT('question','ما هي طرق الدفع المتاحة؟','answer','نقبل البطاقات الائتمانية وApple Pay وSTC Pay، بالإضافة إلى الدفع عند الوصول.'),JSON_OBJECT('question','هل الدفع آمن؟','answer','نعم، تتم جميع عمليات الدفع من خلال بوابات دفع آمنة ومشفرة.'),JSON_OBJECT('question','ما هي سياسة استرداد المبلغ؟','answer','يتم رد المبلغ وفقاً لسياسة الإلغاء وطريقة الدفع المستخدمة.'),JSON_OBJECT('question','متى يتم خصم مبلغ الحجز؟','answer','يتم توضيح موعد الخصم وقيمة الدفعة قبل تأكيد الحجز.')))),NOW(3),NOW(3)),
('en','Frequently asked questions','/images/road.png',JSON_ARRAY(
 JSON_OBJECT('title','Booking','items',JSON_ARRAY(JSON_OBJECT('question','What is the cancellation policy?','answer','Cancel free of charge up to 48 hours before arrival. After that, one night will be charged.'),JSON_OBJECT('question','What are the check-in and check-out times?','answer','Check-in starts at 3:00 PM and check-out is before 12:00 PM.'),JSON_OBJECT('question','Are pets allowed?','answer','Pets are not allowed inside the cabin.'),JSON_OBJECT('question','Is smoking allowed?','answer','Smoking is not allowed inside the cabin. It is permitted only on the outdoor terrace.'),JSON_OBJECT('question','Is the cabin suitable for children?','answer','Children are welcome, and an extra bed is available upon request.'))),
 JSON_OBJECT('title','Payment','items',JSON_ARRAY(JSON_OBJECT('question','Which payment methods are available?','answer','We accept credit cards, Apple Pay and STC Pay, in addition to payment upon arrival.'),JSON_OBJECT('question','Is payment secure?','answer','All payments are processed through secure and encrypted payment gateways.'),JSON_OBJECT('question','What is the refund policy?','answer','Refunds are issued according to the cancellation policy and the payment method used.'),JSON_OBJECT('question','When will I be charged?','answer','The payment date and amount are shown clearly before you confirm the booking.')))),NOW(3),NOW(3));

INSERT INTO `contact_page_contents` (`locale`,`title`,`hero_image`,`form_title`,`form_labels`,`contact_section_title`,`map_title`,`created_at`,`updated_at`) VALUES
('ar','تواصل معنا','/images/road.png','نسعد بتواصلك معنا والإجابة على استفساراتك',JSON_OBJECT('firstName','الاسم الأول','lastName','الاسم الأخير','phone','رقم الجوال','email','البريد الإلكتروني','message','كيف يمكننا المساعدة؟','firstNamePlaceholder','أدخل الاسم الأول','lastNamePlaceholder','أدخل الاسم الأخير','emailPlaceholder','أدخل البريد الإلكتروني','messagePlaceholder','اكتب رسالتك هنا','submit','إرسال'),'تواصل معنا من خلال','موقع كوخ السرور على الخريطة',NOW(3),NOW(3)),
('en','Contact us','/images/road.png','We are happy to answer your questions',JSON_OBJECT('firstName','First name','lastName','Last name','phone','Phone number','email','Email address','message','How can we help?','firstNamePlaceholder','Enter your first name','lastNamePlaceholder','Enter your last name','emailPlaceholder','Enter your email address','messagePlaceholder','Write your message here','submit','Send'),'Get in touch','Kookh Al Soroor location on the map',NOW(3),NOW(3));

INSERT INTO `site_settings` (`locale`,`site_name`,`header_logo`,`footer_logo`,`phone`,`email`,`fax`,`address`,`map_embed_url`,`instagram_url`,`facebook_url`,`x_url`,`whatsapp_url`,`footer_credit`,`created_at`,`updated_at`) VALUES
('ar','كوخ السرور','/images/logo.png','/images/logo-footer.png','+966 50 123 4567','info@cypress-cabin.com','+966 50 123 4567','وادي السرور، المنطقة الجبلية','https://www.google.com/maps?q=Abha%20Saudi%20Arabia&output=embed','#','#','#','#','BY Ali Ghazal © 2026',NOW(3),NOW(3)),
('en','Kookh Al Soroor','/images/logo.png','/images/logo-footer.png','+966 50 123 4567','info@cypress-cabin.com','+966 50 123 4567','Wadi Al Soroor, Mountain Region','https://www.google.com/maps?q=Abha%20Saudi%20Arabia&output=embed','#','#','#','#','BY Ali Ghazal © 2026',NOW(3),NOW(3));
