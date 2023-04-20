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

$sync = $a->SyncFromRegistry($record->domain);

$sync = $a->GetDetails($record->domain);


$controlleroutput['status'] = $sync['result']=='OK'?'success':'error';
$controlleroutput['message'] = $sync['result']=='OK'?'Domain Synced':$sync['error']['Code'].' - '.$sync['error']['Message'].' - '.$sync['error']['Details'];
$controlleroutput['sync'] = $sync;


if($controlleroutput['status']=='success'){

    $_sttus = $module->matchStatusToWHMCS($sync['data']['Status']);

    $_update = [
        'registrar'  => 'domainnameapi',
        'expirydate' => date('Y-m-d', strtotime($sync['data']['Dates']['Expiration'])),
    ];
    if ($_sttus != '') {
        $_update['status'] = $_sttus;
    }

    $controlleroutput['update']=$_update;

    Capsule::table('tbldomains')
           ->where('id', $record->domain_id)
           ->update($_update);

}

