<?php
/**
 * Created by PhpStorm.
 * User: bunyaminakcay
 * Project name dna-extended
 * 17.04.2023 09:32
 * Bünyamin AKÇAY <bunyamin@bunyam.in>
 */

use Illuminate\Database\Capsule\Manager as Capsule;
use \DomainNameApi\DomainNameAPI_PHPLibrary as DNA;


$a = new DNA($dnasettings['API_UserName'], $dnasettings['API_Password']);


$id = $_REQUEST['domainid'];

$record = Capsule::table('mod_dnaextended_domains')
                 ->where('id', $id)
                 ->first();

if ($_REQUEST['action'] == 'addcontact') {

    $selected_domains = explode(',', $_REQUEST['selected_domains']);
    $controlleroutput = [
        "success" => 0,
        'failed'  => 0
    ];


    $contact_segments = [
        'Registrant',
        'Administrative',
        'Billing',
        'Technical',
    ];

    $contact_details = [];

    foreach ($contact_segments as $k => $v) {

        $segment = $v;

        if (in_array($v, $_REQUEST['makesame'])) {
            $segment = 'registrant';
        }

        $contact_details[$v] = [
            "FirstName"        => mb_convert_encoding($_REQUEST[strtolower($segment)]['firstname'], "UTF-8", "auto"),
            "LastName"         => mb_convert_encoding($_REQUEST[strtolower($segment)]['lastname'], "UTF-8", "auto"),
            "Company"          => mb_convert_encoding($_REQUEST[strtolower($segment)]['compantname'], "UTF-8", "auto"),
            "EMail"            => mb_convert_encoding($_REQUEST[strtolower($segment)]['email'], "UTF-8", "auto"),
            "AddressLine1"     => mb_convert_encoding($_REQUEST[strtolower($segment)]['address1'], "UTF-8", "auto"),
            "AddressLine2"     => mb_convert_encoding($_REQUEST[strtolower($segment)]['address2'], "UTF-8", "auto"),
            "State"            => mb_convert_encoding($_REQUEST[strtolower($segment)]['state'], "UTF-8", "auto"),
            "City"             => mb_convert_encoding($_REQUEST[strtolower($segment)]['city'], "UTF-8", "auto"),
            "Country"          => mb_convert_encoding($_REQUEST[strtolower($segment)]['country'], "UTF-8", "auto"),
            "Fax"              => mb_convert_encoding($_REQUEST[strtolower($segment)]['fax'], "UTF-8", "auto"),
            "FaxCountryCode"   => mb_convert_encoding($_REQUEST[strtolower($segment)]['faxcountrycode'], "UTF-8", "auto"),
            "Phone"            => mb_convert_encoding($_REQUEST[strtolower($segment)]['phone'], "UTF-8", "auto"),
            "PhoneCountryCode" => mb_convert_encoding($_REQUEST[strtolower($segment)]['phonecountrycode'], "UTF-8", "auto"),
            "ZipCode"          => mb_convert_encoding($_REQUEST[strtolower($segment)]['zipcode'], "UTF-8", "auto"),
            "Status"           => mb_convert_encoding("", "UTF-8", "auto"),
            "Type"             => "Contact",
        ];

    }


    $result = $a->SaveContacts($record->domain, $contact_details);


    $controlleroutput['result']  = ($result["result"] == "OK" ? 'success' : 'failed');
    $controlleroutput['message'] = $result["error"]['Code'] . ' - ' . $result["error"]['Details'];


} else {

    $contact                     = $a->GetContacts($record->domain);
    $controlleroutput['contact'] = $contact;

}



