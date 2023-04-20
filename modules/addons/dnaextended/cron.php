<?php
/**
 * Created by PhpStorm.
 * User: bunyaminakcay
 * Project name smsmanager
 * 26.12.2020 18:29
 * Bünyamin AKÇAY <bunyamin@bunyam.in>
 */
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once __DIR__ . '/../../../init.php';
require_once __DIR__ . '/app/lib/dna.php';

use Illuminate\Database\Capsule\Manager as Capsule;
use \DomainNameApi\DomainNameAPI_PHPLibrary as DNA;

#region Preperation

$settings   = [];
$page_limit = 1000;

$registrar = Capsule::table('tblregistrars')
                    ->where('registrar', 'domainnameapi')
                    ->get();


//echo php_sapi_name();

foreach ($registrar as $k => $v) {

    $val = '';

    $result_decrypt = localAPI('DecryptPassword', ['password2' => $v->value]);

    $settings[$v->setting] = $result_decrypt['password'];
}

$_page = 0;

$_page_db = Capsule::table('tblconfiguration')
                   ->where('setting', 'DNADomainSyncLastPage')
                   ->first();
if (!isset($_page_db->value)) {
    Capsule::table('tblconfiguration')
           ->insert([
               'setting' => 'DNADomainSyncLastPage',
               'value'   => 0
           ]);
} else {
    $_page = $_page_db->value;
}
#endregion

$a = new DNA($settings['API_UserName'], $settings['API_Password']);




$list = $a->GetList([
    'OrderColumn'    => 'Id',
    'OrderDirection' => 'ASC',
    'PageNumber'     => $_page,
    'PageSize'       => $page_limit,
]);



if ($list['TotalCount'] > $page_limit) {
    if (count($list['data']['Domains']) != 0 && $list['TotalCount'] > 0) {
        $_page++;
    } elseif (count($list['data']['Domains']) == 0) {
        $_page=0;
    }
}else{
    $_page=0;
}


Capsule::table('tblconfiguration')
       ->where('setting', 'DNADomainSyncLastPage')
       ->update(['value' => $_page]);


foreach ($list['data']['Domains'] as $k => $v) {

    $domain = Capsule::table('tbldomains')
                     ->where('domain', $v['DomainName'])
                     ->first();

    $domain_arr = [
        'reseller'=>$settings['API_UserName'],
        'domain'=>$v['DomainName'],
        'status'=>$v['Status'],
        'expiry_date'=>date('Y-m-d',strtotime($v['Dates']['Expiration'])),
    ];

    $domain_arr['user_id'] = $domain->userid;
    $domain_arr['domain_id'] = $domain->id;
    $domain_arr['updated_at'] = date('Y-m-d H:i:s');

    Capsule::table('mod_dnaextended_domains')
           ->updateOrInsert(['domain'=>$v['DomainName']], $domain_arr);


}


