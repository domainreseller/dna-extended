[EN](README-EN.md) | [TR](README.md)

Domainnameapi.com WHMCS Addon Module
====================================

This module allows you to manage all domain names in WHMCS using the `domainnameapi.com` API. With this module, you can
achieve the following features:

* View all your domain names
* Perform bulk synchronization
* Import in bulk
* Make bulk communication changes
* Make bulk NS changes
* Edit bulk Privacy and Domain Lock
* Bulk Approve and Cancel Incoming and Outgoing Transfers

Requirements
------------

* WHMCS 7.6 or higher
* PHP 7.2 or higher (with enabled Soap and Curl extensions)
* Activated and configured domainnameapi Registrar module

Installation
------------

* Upload the downloaded files to your WHMCS server directory (should be placed in
  whmcs_directory/modules/Addons/dnaextended folder).
* Log in to WHMCS admin panel.
* Go to Setup > Addon Modules (or Addon Modules in WHMCS 8.0 and earlier) in System Settings.
* You will see the DNA Extended Module, activate it and select which admin group will have the permissions in its
  configurations.

Configuration
-------------

* Select the "Addons" option from the left menu and click on "DNA Extended".
* Click on "Settings" on the displayed screen.
* For the system to work, all your domain names need to be synchronized at certain intervals, set up the Cron settings
  as shown. (Cron setup may vary depending on the system specifications. cPanel Cron setup | Plesk Cron setup)
* Click on the "Cron Manual Run" button to synchronize all your domain names once.

Usage
-----

Viewing and Filtering All Domain Names
--------------------------------------

* Click on the "All domains" tab to see all your domain names.
* You can search and filter them by status.
* Click on the checkbox at the beginning or the relevant button on the left to perform an action.
* Confirm the action.

Bulk Import of Domain Names
---------------------------

* Click on the "Import" button to go to the page where you can import your domain names.
* This feature only appears for domain names that have not been transferred to any user in WHMCS.
* On the displayed screen, select the customer to whom each domain name will be matched.
* Confirm the action.

Bulk Synchronization Between Domain Names
-----------------------------------------

* When you click the Synchronization button, the relevant domain name is updated both in the DNA panel and in WHMCS. If
* the domain name does not match, it is only synchronized in DNA.
* Matched domain names are synchronized in WHMCS with the "Registrar, Expiry Date, and Status" information.

Bulk Change of Communication Information between Domain Names
-------------------------------------------------------------

* Select the domain names for which you want to change the communication information.
* Enter the communication information and select the block that should be the same as the Registrant's.
* Confirm the action.

Bulk NS Changes between Domain Names
------------------------------------

* Select the domain names for which you want to make NS changes.
* Enter the new NS.
* Confirm the action.

Bulk Privacy and Domain Lock Changes between Domain Names
---------------------------------------------------------

* Select the domain names for which you want to make Privacy and Domain Lock changes.
* Enter the new values.
* Confirm the action.

Bulk Cancel or Approve Incoming and Outgoing Transfers between Domain Names
---------------------------------------------------------------------------

* Select the domain names for which you want to cancel or approve incoming and outgoing transfers.
* Confirm the action.
