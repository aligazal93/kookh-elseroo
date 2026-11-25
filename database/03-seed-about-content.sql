USE kookh_elseroo;

INSERT INTO about_content (locale, text, title, description, image)
VALUES
  (
    'ar',
    'عن كوخ السرور',
    'ملاذك الهادئ بين الأشجار',
    'بدأت فكرة كوخ السرور من حلم بسيط: توفير ملاذ هادئ وسط الطبيعة يجمع بين الفخامة والبساطة. في عام 2023، بدأنا ببناء هذا الكوخ في قلب وادي السرور، حيث تحتضنه الأشجار العتيقة والجبال الشامخة. صممنا كل تفصيلة بعناية لنمنح ضيوفنا تجربة استثنائية، من الأثاث الخشبي المصنوع يدوياً إلى النوافذ الكبيرة التي تطل على أجمل المناظر الطبيعية.',
    '/images/pic-4.png'
  ),
  (
    'en',
    'About Kookh Al Soroor',
    'Your peaceful escape among the trees',
    'Kookh Al Soroor began with a simple dream: to create a peaceful retreat in nature that brings luxury and simplicity together. In 2023, we began building the cabin in the heart of Wadi Al Soroor, surrounded by old trees and towering mountains. Every detail was thoughtfully designed to give our guests an exceptional experience, from handcrafted wooden furniture to large windows overlooking beautiful natural scenery.',
    '/images/pic-4.png'
  );

SELECT * FROM about_content;
