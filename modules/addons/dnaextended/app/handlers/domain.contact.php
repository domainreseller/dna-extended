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


if ($_REQUEST['action'] == 'addcontact') {

    $selected_domains = explode(',',$_REQUEST['selected_domains']);
    $controlleroutput = ["success" => 0,'failed'=>0];

    foreach ($selected_domains as $k_d => $v_d) {


        $contact_segments = [
            'Registrant',
            'Administrative',
            'Billing',
            'Technical',
        ];

        $contact_details = [];

        foreach ($contact_segments as $k => $v) {

            $segment = $v;

            if(in_array($v,$_REQUEST['makesame'])){
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

        $record = Capsule::table('mod_dnaextended_domains')
                         ->where('id', $v_d)
                         ->first();

        $result = $a->SaveContacts($record->domain, $contact_details);

        if ($result["result"] == "OK") {
            $controlleroutput['success']++;
            $controlleroutput['success_results'][]=[
                'domain'=>$record->domain,
                'result'=>$result
            ];
        } else {
            $controlleroutput['failed']++;
            $controlleroutput['failed_results'][]=[
                'domain'=>$record->domain,
                'result'=>$result
            ];
        }



    }


} else {

    $id = $_REQUEST['domainid'];

    $record = Capsule::table('mod_dnaextended_domains')
                     ->where('id', $id)
                     ->first();

    $contact                     = $a->GetContacts($record->domain);
    $controlleroutput['contact'] = $contact;
}


function parse_clientinfo($params) {


    $firstname   = $params["First Name"] ?? $params["firstname"];
    $lastname    = $params["Last Name"] ?? $params["lastname"];
    $compantname = $params["Company Name"] ?? $params["companyname"];
    $email       = $params["Email"] ?? $params["email"];
    $address1    = $params["Address 1"] ?? $params["address1"];
    $address2    = $params["Address 2"] ?? $params["address2"];
    $city        = $params["City"] ?? $params["city"];
    $country     = $params["Country"] ?? $params["countrycode"];
    $fax         = $params["Fax"] ?? $params["phonenumber"];
    $faxcc       = $params["Fax Country Code"] ?? $params["phonecc"];
    $phonecc     = $params["Phone Country Code"] ?? $params["phonecc"];
    $phone       = $params["Phone"] ?? $params["phonenumber"];
    $postcode    = $params["ZIP Code"] ?? $params["postcode"];
    $state       = $params["State"] ?? $params["state"];



    $arr_client= [
        "FirstName"        => mb_convert_encoding($firstname, "UTF-8", "auto"),
        "LastName"         => mb_convert_encoding($lastname, "UTF-8", "auto"),
        "Company"          => mb_convert_encoding($compantname, "UTF-8", "auto"),
        "EMail"            => mb_convert_encoding($email, "UTF-8", "auto"),
        "AddressLine1"     => mb_convert_encoding($address1, "UTF-8", "auto"),
        "AddressLine2"     => mb_convert_encoding($address2, "UTF-8", "auto"),
        "State"            => mb_convert_encoding($state, "UTF-8", "auto"),
        "City"             => mb_convert_encoding($city, "UTF-8", "auto"),
        "Country"          => mb_convert_encoding($country, "UTF-8", "auto"),
        "Fax"              => mb_convert_encoding($fax, "UTF-8", "auto"),
        "FaxCountryCode"   => mb_convert_encoding($faxcc, "UTF-8", "auto"),
        "Phone"            => mb_convert_encoding($phone, "UTF-8", "auto"),
        "PhoneCountryCode" => mb_convert_encoding($phonecc, "UTF-8", "auto"),
        "Type"             => mb_convert_encoding("Contact", "UTF-8", "auto"),
        "ZipCode"          => mb_convert_encoding($postcode, "UTF-8", "auto"),
        "Status"           => mb_convert_encoding("", "UTF-8", "auto")
    ];

    if(isset($params['FirstName'])){
        unset($arr_client['status']);
    }

    return $arr_client;
}




