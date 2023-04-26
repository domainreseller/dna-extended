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

$result1=$result2=[];


$result1 = $a->ModifyPrivacyProtectionStatus($record->domain, $_REQUEST['privacy']=='enabled','admin request');


if($_REQUEST['thieft']=='enabled') {
    $result2 = $a->EnableTheftProtectionLock($record->domain);
}else{
    $result2 = $a->DisableTheftProtectionLock($record->domain);
}



$controlleroutput['result']  = ($result1["result"] == "OK" && $result2["result"] == "OK"? 'success' : 'failed');
$controlleroutput['message'] = $result1["error"]['Code'] . '  ' . $result1["error"]['Details'].' '.$result2["error"]['Code'] . '  ' . $result2["error"]['Details'];



