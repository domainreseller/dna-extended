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




# Domainnameapi.com WHMCS Addon Modul

Dieses Modul ermöglicht die Verwaltung aller Domainnamen in WHMCS unter Verwendung der `domainnameapi.com` API. Mit diesem Modul können Sie folgende Funktionen nutzen:

* Anzeige aller Ihrer Domainnamen
* Massensynchronisation
* Massenimport
* Massenänderungen der Kontaktinformationen durchführen
* Massen-NS-Änderungen durchführen
* Massenbearbeitung von Privatsphäre und Domain-Sperre
* Massenweise Genehmigung oder Ablehnung eingehender und ausgehender Transfers

Anforderungen
-------------

* WHMCS 7.0 oder höher
* PHP 7.2 oder höher (Aktivierte Soap- und Curl-Erweiterungen erforderlich)
* Aktiviertes und konfiguriertes domainnameapi Registrar-Modul.

Installation
------------

1. Laden Sie die heruntergeladenen Dateien in das Stammverzeichnis Ihres WHMCS-Servers hoch. (Sie sollten in den Ordner whmcs_verzeichnis/modules/Addons/dnaextended gelangen.)
2. Melden Sie sich beim WHMCS-Administrationsbereich an.
3. Navigieren Sie zu Setup > Addon Modules (oder Setup > Eklenti Modülleri vor WHMCS 8.0).
4. Sie sehen das DNA Extended-Modul. Aktivieren Sie es und wählen Sie die Administratorgruppe aus, der Sie Berechtigungen erteilen möchten.

Konfigurationen
---------------

1. Wählen Sie in der linken Menüleiste die Option "Addons" und klicken Sie auf "DNA Extended".
2. Klicken Sie auf "Einstellungen".
3. Für den reibungslosen Betrieb des Systems müssen alle Ihre Domainnamen regelmäßig synchronisiert werden. Konfigurieren Sie dazu die Cron-Einstellungen wie angezeigt. (Die Konfiguration des Cron-Jobs kann je nach Systemanforderungen variieren. [cPanel Cron-Einstellungen](https://www.youtube.com/watch?v=t5mjWGegE-g) | [Plesk Cron-Einstellungen](https://www.youtube.com/watch?v=ur1_ua9TMXs))
4. Klicken Sie auf "Cron Manual Run", um alle Ihre Domainnamen einmalig zu synchronisieren.

Verwendung
----------

### Anzeige und Filterung aller Domainnamen

- Klicken Sie auf die Schaltfläche "Alle Domains", um alle Ihre Domainnamen anzuzeigen.
- Sie können nach ihnen suchen und nach Status filtern.
- Klicken Sie auf das Kontrollkästchen oben, um eine Aktion auszuwählen, oder klicken Sie auf den entsprechenden Button links.
- Bestätigen Sie die Aktion.

### Massenimport von Domainnamen

- Klicken Sie auf die Schaltfläche "Import", um zur Seite zu gelangen, auf der Sie Ihre Domainnamen importieren können.
- Diese Funktion wird nur für Domainnamen in WHMCS angezeigt, die noch nicht an einen Benutzer übertragen wurden.
- Wählen Sie auf der angezeigten Seite den entsprechenden Kunden aus, dem jeder Domainname zugeordnet werden soll.
- Bestätigen Sie die Aktion.

### Synchronisierung zwischen Domainnamen

- Wenn Sie auf die Schaltfläche "Synchronisieren" klicken, werden die Informationen des entsprechenden Domainnamens sowohl in der DNA-Panel als auch in WHMCS aktualisiert. Wenn der Domainname nicht übereinstimmt, wird nur die Synchronisierung in DNA durchgeführt.
- Übereinstimmende Domainnamen werden mit den Informationen "Registrar, Ablaufdatum und Status" in WHMCS synchronisiert.

### Massenänderung der Kontaktinformationen von Domainnamen

- Wählen Sie die Domainnamen aus, für die Sie die Kontaktinformationen ändern möchten.
- Geben Sie die neuen Kontaktinformationen ein und wählen Sie den Block aus, der mit dem Registranten übereinstimmen soll.
- Bestätigen Sie die Aktion.

### Massen-NS-Änderungen von Domainnamen

- Wählen Sie die Domainnamen aus, für die Sie die NS-Änderungen vornehmen möchten.
- Geben Sie die neuen NS-Server ein.
- Bestätigen Sie die Aktion.

### Massenbearbeitung von Privatsphäre und Domain-Sperre

- Wählen Sie die Domainnamen aus, für die Sie Änderungen an der Privatsphäre und Domain-Sperre vornehmen möchten.
- Geben Sie die neuen Werte ein.
- Bestätigen Sie die Aktion.

### Genehmigung oder Ablehnung von eingehenden und ausgehenden Transfers von Domainnamen

- Wählen Sie die Domainnamen aus, für die Sie eingehende und ausgehende Transfers genehmigen oder ablehnen möchten.
- Bestätigen Sie die Aktion.
