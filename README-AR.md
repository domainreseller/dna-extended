<div align="center">  
  <a href="README.md"   >   TR <img style="padding-top: 8px" src="https://raw.githubusercontent.com/yammadev/flag-icons/master/png/TR.png" alt="TR" height="20" /></a>  
  <a href="README-EN.md"> | EN <img style="padding-top: 8px" src="https://raw.githubusercontent.com/yammadev/flag-icons/master/png/US.png" alt="EN" height="20" /></a>  
  <a href="README-CN.md"> | CN <img style="padding-top: 8px" src="https://raw.githubusercontent.com/yammadev/flag-icons/master/png/CN.png" alt="CN" height="20" /></a>  
  <a href="README-AZ.md"> | AZ <img style="padding-top: 8px" src="https://raw.githubusercontent.com/yammadev/flag-icons/master/png/AZ.png" alt="AZ" height="20" /></a>  
  <a href="README-DE.md"> | DE <img style="padding-top: 8px" src="https://raw.githubusercontent.com/yammadev/flag-icons/master/png/DE.png" alt="DE" height="20" /></a>  
  <a href="README-FR.md"> | FR <img style="padding-top: 8px" src="https://raw.githubusercontent.com/yammadev/flag-icons/master/png/FR.png" alt="FR" height="20" /></a>  
  <a href="README-AR.md"> | SA <img style="padding-top: 8px" src="https://raw.githubusercontent.com/yammadev/flag-icons/master/png/SA.png" alt="AR" height="20" /></a>  
  <a href="README-NL.md"> | NL <img style="padding-top: 8px" src="https://raw.githubusercontent.com/yammadev/flag-icons/master/png/NL.png" alt="NL" height="20" /></a>  
</div>


# وحدة إضافية Domainnameapi.com لـ WHMCS

تسمح لك هذه الوحدة الإضافية بإدارة جميع أسماء النطاقات في WHMCS باستخدام واجهة برمجة التطبيقات "domainnameapi.com". من خلال هذه الوحدة الإضافية، يمكنك الاستفادة من الميزات التالية:

* عرض جميع أسماء النطاقات الخاصة بك
* المزامنة الجماعية
* الاستيراد الجماعي
* تغيير الاتصال بالمجموعة
* تغيير NS الجماعية
* تغيير الخصوصية وقفل النطاق الجماعي
* الموافقة على إلغاء أو تأكيد نقل الوارد والصادر

المتطلبات
----------

* WHMCS 7.0 أو الإصدار الأحدث
* PHP 7.2 أو الإصدار الأحدث (يجب تمكين إضافات Soap و Curl)
* وحدة تسجيل domainnameapi مُفعّلة ومكونة.

التثبيت
-------

1. قم بتحميل الملفات التي تم تنزيلها إلى المجلد الرئيسي لخادم WHMCS الخاص بك (يجب وضعها في المجلد whmcs_directory/modules/Addons/dnaextended).
2. قم بتسجيل الدخول إلى لوحة التحكم الإدارية لـ WHMCS.
3. انتقل إلى "التكوينات" > "وحدات الإضافات" (أو "إعدادات" > "وحدات الإضافات" قبل WHMCS 8.0).
4. سترى وحدة "DNA Extended". قم بتمكينها وحدد المجموعة الإدارية التي ترغب في منحها صلاحيات.

التكوينات
--------

1. في القائمة الجانبية اليسرى، حدد "الإضافات" وانقر على "DNA Extended".
2. انقر على "الإعدادات".
3. لضمان عمل النظام بشكل صحيح، يجب مزامنة جميع أسماء النطاقات الخاصة بك بانتظام. قم بتكوين إعدادات Cron كما هو موضح. (قد تختلف إعدادات Cron وفقًا لمتطلبات النظام. [إعدادات Cron لـ cPanel](https://www.youtube.com/watch?v=t5mjWGegE-g) | [إعدادات Cron لـ Plesk](https://www.youtube.com/watch?v=ur1_ua9TMXs))
4. انقر على "Cron Manual Run" لمزامنة جميع أسماء النطاقات الخاصة بك مرة واحدة.

الاستخدام
------

### عرض وتصفية جميع أسماء النطاقات

- انقر فوق زر "جميع النطاقات" لعرض جميع أسماء النطاقات الخاصة بك.
- يمكنك البحث وتصفية النطاقات بناءً على حالتها.
- انقر على مربع الاختيار في الأعلى لتحديد إجراء، أو انقر على الزر المقابل على اليسار.
- قم بتأكيد الإجراء.

### استيراد أسماء النطاقات بشكل جماعي

- انقر فوق زر "استيراد" للانتقال إلى الصفحة التي يمكنك فيها استيراد أسماء النطاقات الخاصة بك.
- هذه الميزة متاحة فقط لأسماء النطاقات في WHMCS التي لم يتم نقلها إلى أي مستخدم حتى الآن.
- حدد العميل المطابق لكل اسم نطاق.
- قم بتأكيد الإجراء.

### المزامنة بين أسماء النطاقات

- عند النقر فوق الزر "المزامنة"، ستتم مزامنة معلومات النطاق المقابل في لوحة DNA و WHMCS. إذا لم يكن النطاق مطابقًا، فسيتم مزامنته فقط في DNA.
- يتم مزامنة أسماء النطاقات المتطابقة في WHMCS مع معلومات "المسجل، تاريخ الانتهاء والحالة".

### تعديل معلومات الاتصال لأسماء النطاقات بشكل جماعي

- حدد أسماء النطاقات التي ترغب في تعديل معلومات الاتصال الخاصة بها.
- أدخل معلومات الاتصال الجديدة وحدد الكتلة التي يجب أن تكون متطابقة مع صاحب النطاق.
- قم بتأكيد الإجراء.

### تغيير خوادم الأسماء (NS) لأسماء النطاقات بشكل جماعي

- حدد أسماء النطاقات التي ترغب في تغيير خوادم الأسماء (NS) الخاصة بها.
- أدخل خوادم الأسماء الجديدة.
- قم بتأكيد الإجراء.

### تغيير الخصوصية وقفل النطاق بشكل جماعي

- حدد أسماء النطاقات التي ترغب في تغيير خصوصية وقفل النطاق الخاص بها.
- أدخل القيم الجديدة.
- قم بتأكيد الإجراء.

### الموافقة على إلغاء أو تأكيد نقل الوارد والصادر لأسماء النطاقات بشكل جماعي

- حدد أسماء النطاقات التي ترغب في الموافقة على إلغاء أو تأكيد نقلها.
- قم بتأكيد الإجراء.
