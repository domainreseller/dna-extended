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



Domainnameapi.com WHMCS Add-on Module
====================================

Deze module stelt u in staat om al uw domeinnamen in WHMCS te beheren met behulp van de `domainnameapi.com` API. Met deze module kunt u de volgende functies gebruiken:

* Weergave van al uw domeinnamen
* Bulk-synchronisatie
* Bulk-importeren
* Bulk-contactwijzigingen
* Bulk-NS-wijzigingen
* Bulk-privacy- en domeinvergrendeling bewerken
* Bulk-annulering of bevestiging van inkomende en uitgaande transfers

Vereisten
---------

* WHMCS 7.0 of hoger
* PHP 7.2 of hoger (met actieve Soap- en Curl-extensies)
* Geactiveerde en geconfigureerde domainnameapi-registrarmodule

Installatie
----------

1. Upload de gedownloade bestanden naar de WHMCS-map van uw server. (Het moet zich bevinden in de map `whmcs_directory/modules/Addons/dnaextended`)
2. Log in op het beheerderspaneel van WHMCS.
3. Ga naar Instellingen > Add-on Modules of voor WHMCS 8.0 en eerder naar Setup > Add-on Modules.
4. U ziet de DNA Extended-module, activeer deze en selecteer welke beheerdersgroep de rechten moet hebben in de configuraties.

Configuratie
------------

1. Selecteer de optie "Addons" in het linkermenu en klik op "DNA Extended".
2. Klik op "Settings" op het volgende scherm.
3. Om het systeem goed te laten werken, moeten al uw domeinnamen regelmatig worden gesynchroniseerd. Stel de Cron-taken in zoals getoond. (Afhankelijk van uw systeem kunnen de instellingen voor Cron variëren. [Cron-instellingen voor cPanel](https://www.youtube.com/watch?v=t5mjWGegE-g) | [Cron-instellingen voor Plesk](https://www.youtube.com/watch?v=ur1_ua9TMXs))
4. Klik op "Cron Manual Run" om al uw domeinnamen eenmalig te synchroniseren.

Gebruik
------

### Weergave en filteren van alle domeinnamen

- Klik op de knop "All domains" om al uw domeinnamen te bekijken.
- U kunt zoeken en filteren op basis van hun status.
- Klik op het selectievakje bovenaan om een actie te selecteren of klik op de bijbehorende knop aan de linkerkant.
- Bevestig de actie.

### Bulk-import van domeinnamen

- Klik op de knop "Import" om naar de pagina te gaan waar u uw domeinnamen kunt importeren.
- Deze functie is alleen beschikbaar voor domeinnamen in WHMCS die nog niet aan een gebruiker zijn toegewezen.
- Selecteer de bijbehorende klant voor elke domeinnaam.
- Bevestig de actie.

### Synchronisatie tussen domeinnamen

- Wanneer u op de knop "Synchronisatie" klikt, worden de bijbehorende domeinnaam en de informatie in zowel het DNA-paneel als WHMCS bijgewerkt. Als de domeinnaam niet overeenkomt, wordt deze alleen gesynchroniseerd in DNA.
- Overeenkomende domeinnamen worden gesynchroniseerd met de informatie "Registrar, Vervaldatum en Status" in WHMCS.

### Bulk-contactwijzigingen voor domeinnamen

- Selecteer de domeinnamen waarvoor u de contactgegevens wilt wijzigen.
- Voer de contactgegevens in en selecteer de optie "Hetzelfde als registrant" indien gewenst.
- Bevestig de actie.

### Bulk-NS-wijzigingen voor domeinnamen

- Selecteer de domeinnamen waarvoor u de nameservers (NS) wilt wijzigen.
- Voer de nieuwe nameservers in.
- Bevestig de actie.

### Bulk-privacy- en domeinvergrendelingsbewerkingen

- Selecteer de domeinnamen waarvoor u wijzigingen wilt aanbrengen in privacy en domeinvergrendeling.
- Voer de nieuwe waarden in.
- Bevestig de actie.

### Bevestiging of annulering van inkomende en uitgaande transfers voor domeinnamen

- Selecteer de domeinnamen waarvoor u inkomende en uitgaande transfers wilt bevestigen of annuleren.
- Bevestig de actie.
