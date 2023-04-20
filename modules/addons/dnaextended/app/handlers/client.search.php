<?php
/**
 * Created by PhpStorm.
 * User: bunyaminakcay
 * Project name dna-extended
 * 17.04.2023 02:35
 * Bünyamin AKÇAY <bunyamin@bunyam.in>
 */

use Illuminate\Database\Capsule\Manager as Capsule;

//$results = localAPI('GetUsers', ['search'=>$_REQUEST['q']]);

$results = Capsule::table('tblclients')
                  ->select('id', 'firstname', 'lastname', 'companyname')
                  ->orwhere('firstname', 'like', '%' . $_REQUEST['q'] . '%')
                  ->orWhere('lastname', 'like', '%' . $_REQUEST['q'] . '%')
                  ->orWhere('companyname', 'like', '%' . $_REQUEST['q'] . '%')
                  ->orWhere('id', 'like', '%' . $_REQUEST['q'] . '%')
                  ->get();

foreach ($results as $k => $v) {
    $controlleroutput['results'][] = [
        'id'          => $v->id,
        'text'        => '#' . $v->id . ' ' . $v->firstname . ' ' . $v->lastname,
        'companyname' => $v->companyname,
        'v'           => $v
    ];
}
