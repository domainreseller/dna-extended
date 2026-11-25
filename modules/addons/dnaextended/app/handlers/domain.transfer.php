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

// Approve/reject outgoing and cancel incoming transfer were retired by the
// API (no longer in the REST gateway); the buttons are disabled in the UI and
// the library no longer has these methods, so answer without calling it.
$result1 = [
    'result' => 'ERROR',
    'error'  => [
        'Code'    => 'TRANSFER_ACTION_RETIRED',
        'Details' => 'This action is no longer supported by the API',
    ],
];


$controlleroutput['result']  = ($result1["result"] == "OK"? 'success' : 'failed');
$controlleroutput['message'] = $result1["error"]['Code'] . '  ' . $result1["error"]['Details'] ;



