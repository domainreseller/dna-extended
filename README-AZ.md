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



# Domainnameapi.com WHMCS Addon Modulu

Bu modul, WHMCS platformunda `domainnameapi.com` API'sini istifade edərək bütün domen adlarını idarə etməyə imkan verir. Bu modul vasitəsilə aşağıdakı imkanlara malik olursunuz:

* Bütün domen adlarını görüntüləmək
* Kütləvi sinxronizasiya etmək
* Kütləvi olaraq içəri almaq
* Kütləvi əlaqə dəyişiklikləri etmək
* Kütləvi NS dəyişiklikləri etmək
* Kütləvi Gizlilik və Domen kilidini düzəltmək
* Gələn və gedən transferləri ləğv etmə və ya təsdiqləmək

## 📦 Yükləmə — həmişə Releases istifadə edin!

⬇️ **Ən son test edilmiş versiyanı buradan yükləyin: https://github.com/domainreseller/dna-extended/releases/latest**

> ⚠️ Yaşıl **Code → Download ZIP** düyməsini **istifadə etməyin** — bu düymə emal olunmamış inkişaf qolunu (development branch) yükləyir. Release paketləri versiyalanmış, test edilmiş və istehsalata hazırdır.

Tələblər
---------

* WHMCS 7.0 və ya yüksək versiya
* PHP 7.2 və ya yüksək (Aktiv olunmuş Soap və Curl tətbiqləri olmalıdır)
* Aktivləşdirilmiş və tənzimlənmiş domainnameapi Registrar modulu.

Quraşdırma
----------

1. Yüklədiyiniz faylları serverinizin WHMCS qovluğuna yükləyin (whmcs_qovluğu/modules/Addons/dnaextended qovluğuna düşməlidir).
2. WHMCS idarə panelinə daxil olun.
3. Setup > Addon Modules bölməsinə daxil olun (WHMCS 8.0-dən əvvəl Setup > Addon Modules bölməsi).
4. DNA Extended Modulunu görəcəksiniz, aktivləşdirin və icazələri verəcəyiniz admin qrupunu konfiqurasiyalarında seçin.

## 🔑 API Giriş Məlumatları — İstifadəçi adı/Şifrə, yoxsa Reseller ID/API Key?

Hər ikisi dəstəklənir — məlumatları eyni iki modul sahəsinə daxil edin; modul hansı API-nin istifadə olunacağını avtomatik müəyyən edir:

| Sizdə olan | "İstifadəçi adı" sahəsi | "Şifrə" sahəsi | İstifadə olunan API |
|---|---|---|---|
| **Yeni panel giriş məlumatları** (tövsiyə olunur) | Reseller ID — `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` formatında UUID | API Key | REST |
| **Köhnə (legacy) giriş məlumatları** | API istifadəçi adı | API şifrəsi | SOAP |

> 💡 **Reseller ID** və **API Key** məlumatlarınızı DomainNameAPI panelinizdə **API Parametrləri** bölməsində tapa bilərsiniz.
> ⚠️ Bunlar **API giriş məlumatlarıdır** — panelə daxil olduğunuz e-poçt və şifrə burada **işləməyəcək**.

Əlavə konfiqurasiya tələb olunmur — istifadəçi adı sahəsində UUID varsa, modul müasir REST API-dən, əks halda klassik SOAP-dan istifadə edir.

Tənzimləmələr
------------

1. Sol tərəfdəki menyudan "Addons" seçimini seçin və "DNA Extended" seçimini edin.
2. Görünən ekran üzərində "Settings"ə klikləyin.
3. Sistem işləməsi üçün bütün domen adlarınızın müəyyən bir zaman aralığında sinxronizasiya edilməsi lazımdır. Bunun üçün Cron tənzimləmələrini aşağıdakı kimi qurun. (Cronun necə tənzimləndiyi sistem tələblərinə görə fərqlənə bilər. [cPanel Cron tənzimləməsi](https://www.youtube.com/watch?v=t5mjWGegE-g) | [Plesk Cron tənzimləməsi](https://www.youtube.com/watch?v=ur1_ua9TMXs))
4. Bütün domen adlarını bir dəfə sinxronizasiya etmək üçün "Cron Manual Run" düyməsinə klikləyin.

İstifadə
--------

### Bütün domen adlarını görüntüləmə və filtrləmə

- Bütün domen adlarını görmək üçün "All domains" düyməsinə klikləyin.
- Onları axtara, statuslarına görə filtrləyə bilərsiniz.
- Əməliyyat yerinə yetirmək üçün yuxarıdakı checkboxa vurun və ya soldakı müvafiq düyməyə klikləyin.
- Əməliyyatı təsdiqləyin.

### Domen adlarını kütləvi olaraq içəri alma

- "Import" düyməsinə klikləyin, domen adlarınızı içəri ala biləcəyiniz səhifəyə keçəcəksiniz.
- Bu imkan yalnız WHMCS üzərində hər hansı bir istifadəçiyə köçürülməmiş domen adlarında görsənəcəkdir.
- Görünən ekran üzərində hər bir domen adının uyğunlaşacağı müştəriyi seçin.
- Əməliyyatı təsdiqləyin.

### Domen adları arasında sinxronizasiya etmə

- "Synchronize" düyməsinə kliklədikdə, müvafiq domen adı DNA panelindəki və WHMCS-dəki məlumatlarla yenilənir. Domen adı uyğunlaşmazsa, yalnız DNA-də sinxronizasiya ediləcəkdir.
- Uyğunlaşan domen adları WHMCS üzərində "Registrar, Bitiş Tarixi və Status" məlumatları ilə sinxronizasiya olunacaq.

### Domen adları arasında əlaqə məlumatlarını kütləvi olaraq dəyişmə

- Əlaqə məlumatlarını dəyişmək istədiyiniz domen adlarını seçin.
- Yeni əlaqə məlumatlarını daxil edin və Registrant ilə eyni olmasını istədiyiniz Bloku seçin.
- Əməliyyatı təsdiqləyin.

### Domen adları arasında NS dəyişikliyi etmə

- NS dəyişikliyi etmək istədiyiniz domen adlarını seçin.
- Yeni NS-ləri daxil edin.
- Əməliyyatı təsdiqləyin.

### Domen adları arasında Gizlilik və Domen Kilidi dəyişikliyi etmə

- Gizlilik və Domen Kilidi dəyişikliyi etmək istədiyiniz domen adlarını seçin.
- Yeni dəyərləri daxil edin.
- Əməliyyatı təsdiqləyin.

### Gələn və gedən transferləri ləğv etmə və ya təsdiqləmə

- Gələn və gedən transferləri ləğv etmək və ya təsdiqləmək istədiyiniz domen adlarını seçin.
- Əməliyyatı təsdiqləyin.

