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

$result1=[];


if($_REQUEST['transferaction']=='cancel') {
    $result1 = $a->CancelTransfer($record->domain);
}

if($_REQUEST['transferaction']=='approve') {
    $result1 = $a->ApproveTransfer($record->domain);
}

if($_REQUEST['transferaction']=='reject') {
    $result1 = $a->RejectTransfer($record->domain);
}


$controlleroutput['result']  = ($result1["result"] == "OK"? 'success' : 'failed');
$controlleroutput['message'] = $result1["error"]['Code'] . '  ' . $result1["error"]['Details'] ;



