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


# Domainnameapi.com WHMCS Addon Module

This module allows you to manage all your domain names on WHMCS using the `domainnameapi.com` API. With this module, you can achieve the following features:

* View all your domain names
* Perform bulk synchronization
* Bulk import
* Bulk contact changes
* Bulk NS changes
* Bulk Privacy and Domain lock editing
* Bulk cancellation or approval of incoming and outgoing transfers

Requirements
------------

* WHMCS 7.0 or above
* PHP 7.2 or above (with enabled Soap and Curl extensions)
* Activated and configured `domainnameapi` Registrar module.

Installation
------------

1. Upload the downloaded files to your WHMCS directory on your server (should go to the whmcs_directory/modules/Addons/dnaextended folder).
2. Log in to your WHMCS admin panel.
3. Go to Setup > Addon Modules or, before WHMCS 8.0, Setup > Addon Modules section.
4. You will see the DNA Extended Module, activate it, and choose which admin group to grant permissions to in the configurations.

Setup
-----

1. Select the "Addons" option from the left menu and click on "DNA Extended."
2. Click on "Settings" on the displayed screen.
3. For the system to work, all your domain names need to be synchronized periodically. Configure the Cron settings as shown. (The process of setting up Cron may vary depending on the system requirements. [cPanel Cron Setup](https://www.youtube.com/watch?v=t5mjWGegE-g) | [Plesk Cron Setup](https://www.youtube.com/watch?v=ur1_ua9TMXs))
4. Click the "Cron Manual Run" button to synchronize all your domain names for one time.

Usage
-----

### View and filter all domain names

- Click on the "All domains" tab to see all your domain names.
- You can search and filter them based on their status.
- Click on the checkbox at the top or the relevant button on the left to perform an action.
- Confirm the operation.

### Bulk import of domain names

- Click on the "Import" button to go to the page where you can import your domain names.
- This feature only applies to domain names that have not been transferred to any user on WHMCS.
- On the displayed screen, select the customer that each domain name will be matched with.
- Confirm the operation.

### Synchronize domain names

- When you click the "Synchronize" button, the corresponding domain name will be updated with both the information from the DNA panel and WHMCS. If the domain name doesn't match, it will only be synchronized on DNA.
- Matched domain names will be synchronized on WHMCS with the "Registrar, Expiry Date, and Status" information.

### Bulk change of contact information among domain names

- Select the domain names for which you want to change the contact information.
- Enter the new contact information and select the block you want to be the same as the Registrant.
- Confirm the operation.

### Bulk NS changes among domain names

- Select the domain names for which you want to make NS changes.
- Enter the new NS.
- Confirm the operation.

### Bulk Privacy and Domain Lock changes among domain names

- Select the domain names for which you want to make Privacy and Domain Lock changes.
- Enter the new values.
- Confirm the operation.

### Bulk cancellation or approval of incoming and outgoing transfers

- Select the domain names for which you want to cancel or approve incoming and outgoing transfers.
- Confirm the operation.
