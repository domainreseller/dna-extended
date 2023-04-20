<?php
/**
 * Created by PhpStorm.
 * User: bunyaminakcay
 * Project name dna-extended
 * 16.04.2023 00:35
 * Bünyamin AKÇAY <bunyamin@bunyam.in>
 */

use Illuminate\Database\Capsule\Manager as Capsule;

$statuses = Capsule::table('mod_dnaextended_domains')
                   ->where('reseller', $dnasettings['API_UserName'])
                   ->selectRaw('COUNT(*) AS count, status')
                   ->groupBy('status')
                   ->get();

$_domains = Capsule::table('mod_dnaextended_domains')
                   ->where('reseller', $dnasettings['API_UserName'])
                   ->orderBy('id', 'desc');

$controlleroutput['recordsFiltered']=$controlleroutput['recordsTotal']=$_domains->count();

if(strlen($_REQUEST['search']['value'])>0){
    $_domains->where('domain', 'like', '%'.$_REQUEST['search']['value'].'%');
}

if(isset($_REQUEST['parameters']) && is_array($_REQUEST['parameters'])) {
    $_domains->whereIn('status',$_REQUEST['parameters']);
}


$_domains->skip($_REQUEST['start'])
         ->take($_REQUEST['length']);

$domains= $_domains->get();

foreach ($domains as $k => $v) {

    $_statuses=[
        'assigned_to_user' => true,
        'assigned_to_domainnameapi' => true,
        'assigned_to_domain' => true,
        'equal_expirydate' => true,
    ];

    if($v->user_id>0) {
        $user = Capsule::table('tblclients')
                       ->select('firstname', 'lastname','companyname','id')
                       ->where('id', $v->user_id)
                       ->first();
        $domains[$k]->user_info = $user;
    }else{
        $domains[$k]->user_info = [];
        $_statuses['assigned_to_user'] = false;
    }

    if($v->domain_id>0) {
        $domain = Capsule::table('tbldomains')
                         ->select('id','domain','registrar','expirydate')
                         ->where('id', $v->domain_id)
                         ->first();
        $domains[$k]->domain_info = $domain;

        if($domain->registrar != 'domainnameapi'){
            $_statuses['assigned_to_domainnameapi'] = false;
        }
        if(date('Y-m-d',strtotime($domain->expirydate)) != date('Y-m-d',strtotime($v->expiry_date))){
            $_statuses['equal_expirydate'] = false;
        }

    }else{
        $domains[$k]->domain_info = [];
        $_statuses['assigned_to_domain'] = false;
    }

    $domains[$k]->statuses = $_statuses;

}


$controlleroutput['draw']=$_REQUEST['draw'];
$controlleroutput['data']        = $domains;
$controlleroutput['searchPanes'] = ['options' => []];

foreach ($statuses as $k => $v) {
    $controlleroutput['searchPanes']['options']['status'][] = [
        'label' => $v->status,
        'value' => $v->status,
        'count' => $v->count,
        'total' => $v->count,
    ];
}

