<?php
/**
 * Created by PhpStorm.
 * User: Bunyamin
 * Project name kriweb
 * 10.04.2017 20:28
 * Bünyamin AKÇAY <bunyamin@bunyam.in>
 */
if (!defined("WHMCS"))
    die("You shall not pass!");

/** @noinspection PhpUndefinedNamespaceInspection */

use Illuminate\Database\Capsule\Manager as Capsule;
use WHMCS\Module\Addon\AddonModule\Admin\AdminDispatcher;
use WHMCS\Module\Addon\AddonModule\Client\ClientDispatcher;

function dnaextended_config() {
    $configarray = array(
        "name"        => "DNA Extended",
        "description" => "DomainNameApi Extended module   <br>More information : <a href=\"https://bunyam.in/whmcs/\">https://bunyam.in/whmcs/</a>",
        "version"     => "1.43",
        "author"      => "Bünyamin AKÇAY",
        "language"    => "english",
        "fields"      => array()
    );
    return $configarray;
}

function dnaextended_activate() {

    try {

        Capsule::schema()
               ->create('mod_dnaextended_domains', function ($table) {
                   $table->increments('id');
                   $table->string('reseller', 255);
                   $table->string('domain', 255);
                   $table->string('status', 64)->nullable();
                   $table->integer('user_id')->nullable();
                   $table->integer('domain_id')->nullable();
                   $table->date('expiry_date')->nullable();
                   $table->timestamps();
               });

        return [
            'status'      => 'success',
            'description' => 'Activated, required tables created',
        ];

    } catch (\Exception $e) {
        return [
            // Supported values here include: success, error or info
            'status'      => "error",
            'description' => 'Unable to create mod_addonexample: ' . $e->getMessage(),
        ];
    }


}

function dnaextended_deactivate() {

    # Remove Custom DB Table
    //$query = "DROP TABLE `mod_client_changes`";
    //$result = full_query($query);

    try {
        Capsule::schema()
               ->dropIfExists('mod_dnaextended_domains');

        return [
            // Supported values here include: success, error or info
            'status'      => 'success',
            'description' => 'Deactivated , required tables dropped',
        ];
    } catch (\Exception $e) {
        return [
            // Supported values here include: success, error or info
            "status"      => "error",
            "description" => "Unable to drop mod_addonexample: {$e->getMessage()}",
        ];
    }


}

function dnaextended_upgrade($vars) {

}

function dnaextended_output($vars) {

    $parameters = $vars;


    require_once __DIR__ . '/app/module.php';
    $module = new \DNA_Extended\module();

    $controller = trim(strtolower($_GET['appcontroller']));

    if (strlen($controller) > 3) {
        $pageresponse    = '';
        $controllerinput = $controlleroutput = [];
        $dnasettings = $module->dnaParameters();

        $_handle_load = __DIR__."/app/handlers/{$controller}.php";

        if(is_file($_handle_load)){
            /** @noinspection PhpIncludeInspection */
            include_once $_handle_load;
        }


        if ($_GET['viewtype'] == 'html') {
            $controlleroutput['version']=$vars['version'];
            $pageresponse = $module->generateView($controlleroutput, $_GET['appcontroller']);
        }

        if ($_GET['viewtype'] == 'json') {
            $pageresponse = json_encode($controlleroutput);
        }


        die($pageresponse);

    }


    echo $module->generateView($parameters);


}

function dnaextended_sidebar($vars) {

    require_once __DIR__ . '/app/module.php';
    $module = new \DNA_Extended\module();

    $menu         = [
        [
            'text'   => 'Özet',
            'action' => 'dashboard',
            'icon'   => 'flaticon-browser-21'
        ],
        [
            'text'   => 'Raporlar',
            'action' => null,
            'icon'   => 'flaticon-browser-21',
            'child'  => [
                [
                    'text'   => 'Gönderilen SMSler',
                    'action' => 'sendreports',
                    'icon'   => 'flaticon-browser-21'
                ],
                [
                    'text'   => 'Gönderilecek SMSler',
                    'action' => 'upcomingreport',
                    'icon'   => 'flaticon-browser-21'
                ]
            ]
        ],
        [
            'text'   => 'Göndericiler',
            'action' => 'providers',
            'icon'   => 'flaticon-browser-21'
        ],
        [
            'text'   => 'Gönderim',
            'action' => null,
            'icon'   => 'flaticon-browser-21',
            'child'  => [
                [
                    'text'   => 'Özel mesaj',
                    'action' => 'sending.single',
                    'icon'   => 'flaticon-browser-21'
                ],
                [
                    'text'   => 'Toplu mesaj',
                    'action' => 'sending.bulk',
                    'icon'   => 'flaticon-browser-21'
                ]
            ]
        ],
        [
            'text'   => 'Ayarlar',
            'action' => 'settings.general',
            'icon'   => 'flaticon-browser-21'
        ],[
            'text'   => 'SMS Şablonları',
            'action' => 'smstemplates',
            'icon'   => 'flaticon-browser-21'
        ],
        [
            'text'   => 'İşlem Kayıtları',
            'action' => 'logs',
            'icon'   => 'flaticon-browser-21'
        ],
    ];
    $vars['menu'] = $menu;

    return $pageresponse = $module->generateView($vars, 'sidebar');
}



