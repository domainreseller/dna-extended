<?php
/**
 * Created by PhpStorm.
 * User: bunyaminakcay
 * Project name smsmanager
 * 26.12.2020 18:29
 * Bünyamin AKÇAY <bunyamin@bunyam.in>
 */
if(php_sapi_name() !== 'cli'){
    die('Can only be executed via CLI');
}

require_once __DIR__ . '/../../../init.php';
require_once __DIR__ . '/app/module.php';

$module = new \DNA_Extended\module();

$result =  $module->makeSync();

echo json_encode($result);

