<?php
/**
 * Created by PhpStorm.
 * User: bunyaminakcay
 * Project name dna-extended
 * 28.04.2023 03:30
 * Bünyamin AKÇAY <bunyamin@bunyam.in>
 */


$lastcronrun = Illuminate\Database\Capsule\Manager::table('tblconfiguration')
                                                  ->where('setting', 'DNADomainSyncLastPage')
                                                  ->first();


$controlleroutput['cronfile']=realpath(dirname(__DIR__.'/../../../')).'/cron.php';
$controlleroutput['latestcron']=$lastcronrun->updated_at;
$controlleroutput['settings']=$dnasettings;

if(isset($_REQUEST['settingaction'])) {
    unset($controlleroutput['settings']);
}


if($_REQUEST['settingaction']=='sync'){
    $result =  $module->makeSync();
    $controlleroutput['result'] = $result;
}

if($_REQUEST['settingaction']=='save'){
    $module->setSetting('DNArecordcount',$_REQUEST['DNArecordcount']*1);
    $module->setSetting('DNAexcludedeleted',$_REQUEST['DNAexcludedeleted']==1?1:0);
}
