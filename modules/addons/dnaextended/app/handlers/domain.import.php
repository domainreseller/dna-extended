<?php
/**
 * Created by PhpStorm.
 * User: bunyaminakcay
 * Project name dna-extended
 * 17.04.2023 03:50
 * Bünyamin AKÇAY <bunyamin@bunyam.in>
 */



use Illuminate\Database\Capsule\Manager as Capsule;


$imports = $_REQUEST['importuser'];

foreach ($imports as $k => $v) {
    if($v>0){

        $domain = Capsule::table('mod_dnaextended_domains')
                         ->where('id', $k)
                         ->first();

        $_domain_arr = [
            'userid'           => $v,
            'orderid'          => 0,
            'type'             => 'Register',
            'registrationdate' => date('Y-m-d'),
            'domain'           => $domain->domain,
            'registrar'        => 'domainnameapi',
            'recurringamount'  => 0,
            'status'           => 'Active',
            'promoid'          => 0,
            'nextduedate'      => date('Y-m-d', strtotime($domain->expiry_date)),
            'nextinvoicedate'  => date('Y-m-d', strtotime($domain->expiry_date)),
            'expirydate'       => date('Y-m-d', strtotime($domain->expiry_date)),
            'dnsmanagement'    => 0,
            'emailforwarding'  => 0,
            'idprotection'     => 0,
            'donotrenew'       => 0,
            'synced'           => 0,
        ];

        $domain_id = Capsule::table('tbldomains')->insertGetId($_domain_arr);

        if($domain_id>0){
           $result_recalcs = localAPI('UpdateClientDomain', ['domainid'=>$domain_id,'autorecalc'=>true]);

           Capsule::table('mod_dnaextended_domains')
                  ->where('id', $k)
                  ->update(['user_id'=>$v,'domain_id'=>$domain_id]);

           $controlleroutput['imports'][] = $domain;
        }else{
            $controlleroutput['errors'][] = Capsule::connection()->getPdo()->errorInfo();
        }


    }
}

$controlleroutput['status'] = count($controlleroutput['imports'])>0 ? 'success' : 'error';
$controlleroutput['message'] = count($controlleroutput['imports']).' domain(s) imported successfully.';
