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


# Module complémentaire Domainnameapi.com pour WHMCS

Ce module vous permet de gérer tous les noms de domaine dans WHMCS en utilisant l'API `domainnameapi.com`. Avec ce module, vous pouvez bénéficier des fonctionnalités suivantes :

* Affichage de tous vos noms de domaine
* Synchronisation en masse
* Importation en masse
* Modification en masse des informations de contact
* Modification en masse des serveurs de noms (NS)
* Modification en masse de la confidentialité et du verrouillage de domaine
* Approbation ou refus en masse des transferts entrants et sortants

## 📦 Téléchargement — utilisez toujours les Releases !

⬇️ **Téléchargez ici la dernière version testée : https://github.com/domainreseller/dna-extended/releases/latest**

> ⚠️ N'utilisez **pas** le bouton vert **Code → Download ZIP** — il télécharge la branche de développement brute. Les paquets de release sont versionnés, testés et prêts pour la production.

Exigences
---------

* WHMCS 7.0 ou supérieur
* PHP 7.2 ou supérieur (Extensions Soap et Curl activées)
* Module d'enregistrement domainnameapi activé et configuré

Installation
-----------

1. Téléchargez les fichiers téléchargés dans le répertoire principal de votre serveur WHMCS (ils doivent être placés dans le dossier whmcs_directory/modules/Addons/dnaextended).
2. Connectez-vous à l'administration de WHMCS.
3. Accédez à Configuration > Modules complémentaires (ou Configuration > Eklenti Modülleri avant WHMCS 8.0).
4. Vous verrez le module DNA Extended. Activez-le et sélectionnez le groupe d'administrateurs auxquels vous souhaitez accorder des autorisations.

## 🔑 Identifiants API — Nom d'utilisateur/Mot de passe ou Reseller ID/API Key ?

Les deux sont pris en charge — saisissez-les dans les deux mêmes champs du module ; le module détecte automatiquement l'API à utiliser :

| Vous disposez de | Champ « Nom d'utilisateur » | Champ « Mot de passe » | API utilisée |
|---|---|---|---|
| **Nouveaux identifiants du panneau** (recommandé) | Reseller ID — UUID au format `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` | API Key | REST |
| **Anciens identifiants (legacy)** | Nom d'utilisateur API | Mot de passe API | SOAP |

> 💡 Vous trouverez votre **Reseller ID** et votre **API Key** dans votre panneau DomainNameAPI, section **Paramètres API**.
> ⚠️ Ce sont des **identifiants API** — l'e-mail et le mot de passe de connexion à votre panneau ne fonctionneront **pas** ici.

Aucune configuration supplémentaire n'est nécessaire — si le champ nom d'utilisateur contient un UUID, le module utilise l'API REST moderne, sinon le SOAP classique.

Configurations
--------------

1. Dans la barre de menu de gauche, sélectionnez "Addons" et cliquez sur "DNA Extended".
2. Cliquez sur "Paramètres".
3. Pour assurer le bon fonctionnement du système, tous vos noms de domaine doivent être synchronisés régulièrement. Configurez les paramètres Cron comme indiqué. (La configuration du Cron peut varier en fonction des exigences du système. [Configuration du Cron cPanel](https://www.youtube.com/watch?v=t5mjWGegE-g) | [Configuration du Cron Plesk](https://www.youtube.com/watch?v=ur1_ua9TMXs))
4. Cliquez sur "Cron Manual Run" pour synchroniser tous vos noms de domaine une fois.

Utilisation
----------

### Affichage et filtrage de tous les noms de domaine

- Cliquez sur le bouton "Tous les domaines" pour afficher tous vos noms de domaine.
- Vous pouvez effectuer une recherche et filtrer en fonction de leur statut.
- Cliquez sur la case à cocher en haut pour sélectionner une action, ou cliquez sur le bouton correspondant à gauche.
- Confirmez l'action.

### Importation en masse de noms de domaine

- Cliquez sur le bouton "Importer" pour accéder à la page d'importation de vos noms de domaine.
- Cette fonctionnalité n'est disponible que pour les noms de domaine dans WHMCS qui n'ont pas encore été transférés à un utilisateur.
- Sur la page affichée, sélectionnez le client correspondant à chaque nom de domaine.
- Confirmez l'action.

### Synchronisation entre les noms de domaine

- Lorsque vous cliquez sur le bouton "Synchroniser", les informations du nom de domaine correspondant sont mises à jour à la fois dans le panneau DNA et dans WHMCS. Si le nom de domaine ne correspond pas, seule la synchronisation dans DNA est effectuée.
- Les noms de domaine correspondants sont synchronisés dans WHMCS avec les informations "Registrar, Date d'expiration et Statut".

### Modification en masse des informations de contact des noms de domaine

- Sélectionnez les noms de domaine pour lesquels vous souhaitez modifier les informations de contact.
- Entrez les nouvelles informations de contact et sélectionnez le bloc qui doit correspondre au titulaire.
- Confirmez l'action.

### Modification en masse des serveurs de noms (NS) des noms de domaine

- Sélectionnez les noms de domaine pour lesquels vous souhaitez effectuer des modifications des serveurs de noms (NS).
- Entrez les nouveaux serveurs de noms.
- Confirmez l'action.

### Modification en masse de la confidentialité et du verrouillage de domaine

- Sélectionnez les noms de domaine pour lesquels vous souhaitez effectuer des modifications de confidentialité et de verrouillage de domaine.
- Entrez les nouvelles valeurs.
- Confirmez l'action.

### Approbation ou refus en masse des transferts entrants et sortants des noms de domaine

- Sélectionnez les noms de domaine pour lesquels vous souhaitez approuver ou refuser les transferts entrants et sortants.
- Confirmez l'action.
