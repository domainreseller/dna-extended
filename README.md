[EN](README-EN.md) | [TR](README.md)

Domainnameapi.com WHMCS Addon Modülü
====================================

Bu modül, `domainnameapi.com` API'sini kullanarak WHMCS üzerindeki tüm alan adlarını yönetmenize olanak tanır. Bu modül
ile aşağıdaki özellikleri elde edebilirsiniz:

* Tüm alan adlarınızı görüntüleme
* Toplu senkronizasyon yapma
* Toplu olarak içe aktarma
* Toplu iletişim değişiklikleri yapma
* Toplu NS değişiklikleri yapma
* Toplu Gizlilik ve Domain kilidi düzenleme
* Toplu Olarak Gelen ve giden transferleri iptal yada onaylama

Gereksinimler
-------------

* WHMCS 7.0 veya üzeri
* PHP 7.2 veya üzeri (Soap ve Curl eklentileri etkin olmalıdır)
* Aktifleştirilmiş ve konfigure edilmiş domainnameapi Registrar modülü.

Kurulum
-------

1. İndirdiğiniz dosyaları sunucunuzun WHMCS dizinine yükleyin. (whmcs_dizini/modules/Addons/dnaextended klasörüne
   gelmeli )
2. WHMCS yönetici paneline giriş yapın.
3. Sistem Ayarları > Eklenti Modülleri veya WHMCS 8.0'den önce Setup > Eklenti Modülleri bölümüne gelin.
4. DNA Extended Modülünü göreceksiniz , aktif edin ve Konfigurasyonlarında hangi admin grubuna yetkileri vereceğinizi
   seçin.

Tanımlamalar
------------

1. Sol taraftaki menüden "Addons" seçeneğini seçin ve "DNA Extended" seçeneğine tıklayın.
2. Gelen Ekranda settings e tıklayın.
3. Sistem Çalışması için tüm alan adlarınızın belirli sürede bir senkron edilmesi gerekir bunun için Cron ayarlarını
   göründüğü gibi ayarlayın. (Sistem özelliklerine göre cron un nasıl ayarlandığı farklılık
   gösterebilir. [cPanel Cron ayarlama](https://www.youtube.com/watch?v=t5mjWGegE-g) | [Plesk Cron ayarlama](https://www.youtube.com/watch?v=ur1_ua9TMXs) )
4. Bir sefere mahsus tüm alan adlarınızı senkron etmek için "Cron Manual Run" butonuna tıklayın.

Kullanım
--------

### Tüm alan adlarını görüntüleme , ve filtreleme

- All domains sekmesine basın , tüm alan adlarınızı göreceksiniz.
- Arama yapabilir , statülerine göre filtreleyebilirsiniz.
- Bir işlem yapmak için en baştaki checkbox a tıklayın veya soldaki ilgili butona tıklayın.
- İşlemi onaylayın.

### Alan adları toplu olarak içe aktarma

- Import Butonuna basın , alan adlarınızı içe aktarabileceğiniz sayfaya gideceksiniz.
- Bu özellik sadece whmcs üzerinde alan adının herhangi bir kullanıcıya aktarılmadığı alan adlarında çıkacak.
- Gelen ekranda her bir alan adının eşleşeceği müşteriyi seçin.
- İşlemi onaylayın.

### Alan adları arasında senkronizasyon yapma

- Senronizasyon butonuna tıkladığınızda ilgili alan adı hem DNA panelindeki hemde WHMCS deki bilgileri ile güncellenir.
  Eğer alan adı Eşleşmediyse sadece DNA üzerinde senkron olur.
- Eşleşen alan adları WHMCS üzerinde "Registrar, Bitiş Tarihi ve Durum " bilgileri ile senkronlanır.

### Alan adları arasında iletişim bilgilerini toplu olarak değiştirme

- İletişim bilgilerini değiştirmek istediğiniz alan adlarını seçin.
- İletişim bilgilerini girin , Registrant ile aynı olmasını istediğiniz Bloğu seçin.
- İşlemi onaylayın.

### Alan adları arasında NS değişikliği yapma

- NS değişikliği yapmak istediğiniz alan adlarını seçin.
- Yeni NS leri girin
- İşlemi onaylayın.

### Alan adları arasında Gizlilik ve Domain Kilidi değişikliği yapma

- Gizlilik ve Domain Kilidi değişikliği yapmak istediğiniz alan adlarını seçin.
- Yeni değerleri girin
- İşlemi onaylayın.

### Alan adları arasında Gelen ve Giden transferleri iptal yada onaylama

- Gelen ve Giden transferleri iptal yada onaylamak istediğiniz alan adlarını seçin.
- İşlemi onaylayın.

