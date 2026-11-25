# MySQL learning steps

نفّذ الملفات بالترتيب داخل MySQL Workbench:

1. `01-create-database.sql` ينشئ قاعدة البيانات `kookh_elseroo`.
2. `02-create-about-content-table.sql` ينشئ جدول `about_content`.
3. `03-seed-about-content.sql` يضيف صفًا عربيًا وصفًا إنجليزيًا.

## المصطلحات

- **Database / Schema:** المكان الذي يجمع جداول المشروع. في MySQL Workbench ستجده تحت `SCHEMAS`.
- **Table:** جدول مخصص لنوع واحد من البيانات، مثل محتوى قسم About.
- **Column:** خاصية في الجدول، مثل `title` أو `image`.
- **Row:** سجل كامل، مثل محتوى About باللغة العربية.
- **Primary key:** رقم فريد يعرّف كل صف، وهو `id` هنا.

بعد تنفيذ الملفات، استخدم هذا الأمر للتحقق من البيانات:

```sql
SELECT * FROM about_content;
```

النتيجة الصحيحة تحتوي على صفين: `ar` و`en`.
