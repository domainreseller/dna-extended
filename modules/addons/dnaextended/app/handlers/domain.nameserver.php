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
$_ns = [];
$_i=1;
foreach ($_REQUEST['ns'] as $k => $v) {
    if(strlen($v)>0){
        $_ns['ns'.$_i] = $v;
        $_i++;
    }
}


$result = $a->ModifyNameServer($record->domain, $_ns);


$controlleroutput['result']  = ($result["result"] == "OK" ? 'success' : 'failed');
$controlleroutput['message'] = $result["error"]['Code'] . ' - ' . $result["error"]['Details'];
$controlleroutput['nsarr'] = $_ns;


