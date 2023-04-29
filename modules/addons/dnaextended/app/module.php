<?php
/**
 * Created by PhpStorm.
 * User: bunyaminakcay
 * Project name isinuzmani
 * 30.12.2019 23:57
 * Bünyamin AKÇAY <bunyamin@bunyam.in>
 */


namespace DNA_Extended;

use Illuminate\Database\Capsule\Manager as Capsule;
use \DomainNameApi\DomainNameAPI_PHPLibrary as DNA;

require_once 'app.php';

class module {


    public function makeSync(){

        $page_limit = 500;
        $ignore_deleted = false;

        $settings = $this->dnaParameters();
        if ($settings['DNADomainSyncLastPage']>0){
            $_page = $settings['DNADomainSyncLastPage'];
        }else{
            $_page = 0;
        }

        if ($settings['DNArecordcount']>0){
            $page_limit = $settings['DNArecordcount'];
        }
        if ($settings['DNAexcludedeleted']>0){
            $ignore_deleted= true;
        }


        $a = new DNA($settings['API_UserName'], $settings['API_Password']);

        $query = [
            'OrderColumn'    => 'Id',
            'OrderDirection' => 'ASC',
            'PageNumber'     => $_page,
            'PageSize'       => $page_limit,
        ];

        $list = $a->GetList($query);
        $result['query'] = $query;
        $result['domaincount'] = count($list['data']['Domains']);
        $result['apiresp'] = $list['result'];


        if ($list['TotalCount'] > $page_limit) {
            if (count($list['data']['Domains']) != 0 && $list['TotalCount'] > 0) {
                $_page++;
            } else {
                $_page = 0;
            }
        } else {
            $_page = 0;
        }

        $this->setSetting('DNADomainSyncLastPage',$_page);

        foreach ($list['data']['Domains'] as $k => $v) {

            if($ignore_deleted && $v['Status']=='Deleted'){
                continue;
            }

            $domain = Capsule::table('tbldomains')
                             ->where('domain', $v['DomainName'])
                             ->first();

            $domain_arr = [
                'reseller'    => $settings['API_UserName'],
                'domain'      => $v['DomainName'],
                'status'      => $v['Status'],
                'expiry_date' => date('Y-m-d', strtotime($v['Dates']['Expiration'])),
            ];

            $domain_arr['user_id']    = $domain->userid;
            $domain_arr['domain_id']  = $domain->id;
            $domain_arr['updated_at'] = date('Y-m-d H:i:s');


            Capsule::table('mod_dnaextended_domains')
                   ->updateOrInsert(['domain' => $v['DomainName']], $domain_arr);


        }

        return $result;

    }

    #region Util

    public function getSetting($setting) {
        $result = Capsule::table('tblconfiguration')
                         ->where('setting', $setting)
                         ->first();

        return $result->value;
    }

    public function setSetting($setting, $value) {
        Capsule::table('tblconfiguration')
               ->updateOrInsert(
                   ['setting' => $setting],
                   ['value'   => $value,'updated_at' => date('Y-m-d H:i:s')]
               );
    }

    public function dnaParameters() {
        $settings = [];

        $registrar = Capsule::table('tblregistrars')
                            ->where('registrar', 'domainnameapi')
                            ->get();

        foreach ($registrar as $k => $v) {
            $result_decrypt = localAPI('DecryptPassword', ['password2' => $v->value]);
            $settings[$v->setting] = $result_decrypt['password'];
        }

        $dna_settings  = Capsule::table('tblconfiguration')->where('setting', 'LIKE' , 'DNA%')->get();
        foreach ($dna_settings as $k => $v) {
             $settings[$v->setting] = $v->value;
        }


        return $settings;
    }


    public function generateView($params = [], $layout = 'layout', $viewtype = 'admin') {
        $smarty = new \Smarty();
        $params = json_decode(json_encode($params), true);
        foreach ($params as $k => $v) {
            $smarty->assign($k, $v);
        }

        if ($this->extraparameters != null) {
            $smarty->assign('extra', $this->extraparameters);
        }

        $viewdir = MODULE_DIR . "/app/view/{$viewtype}/";


        $_LANG = $this->getLanguage();

        //$lang = language::parseAll();
        $smarty->assign('LANG', $_LANG);

        $smarty->setTemplateDir($viewdir);

        /** @noinspection PhpUndefinedFieldInspection */
        $smarty->caching = false;
        /** @noinspection PhpUndefinedFieldInspection */
        $smarty->compile_dir = $GLOBALS['templates_compiledir'];

        $dir = $viewdir . "{$layout}.tpl";
        return $result = $smarty->fetch($dir);

    }

    public function fetchTplFromString($str, $params) {

        $file = MODULE_DIR . "/app/view/tmp/" . md5($str) . '.tpl';

        file_put_contents($file, $str);

        $resp = self::generateView($params, md5($str), 'tmp');

        unlink($file);

        return $resp;

    }


    /** @noinspection PhpIncludeInspection */
    public function getLanguage() {
        $langfile = MODULE_DIR . "/app/lang/{$this->language}.php";

        $_LANG = [];
        if (!is_file($langfile)) {
            $langfile = MODULE_DIR . "/app/lang/turkish.php";
        }

        include $langfile;

        //$lang = language::parseAll();
        return $_LANG;

    }

    public function matchStatusToWHMCS($status) {

        //WHMCS STATUSES
        //'Pending',
        //'Pending Registration',
        //'Pending Transfer',
        //'Active',
        //'Grace',
        //'Redemption',
        //'Expired',
        //'Cancelled',
        //'Fraud',
        //'Transferred Away'

        //DNA STATUSES
        //Active
        //WaitingForRegistration
        //WaitingForDocument
        //WaitingForIncomingTransfer
        //TransferredOut
        //TransferRejectedFromOpposed
        //TransferCancelledFromClient
        //PendingDelete
        //Deleted
        //ConfirmationEmailSend
        //None
        //PreRegistiration
        //WaitingForOutgoingTransfer
        //PendingHold
        //SynchronizationBlocked
        //TimeOut
        //ModificationPending
        //MigrationPending
        //ModificationFailed
        //PreRegistirationFail


        $w_st = '';

        switch ($status) {
            case 'Active':
                $w_st = 'Active';
                break;
            case 'WaitingForIncomingTransfer':
                $w_st = 'Pending Transfer';
                break;
            case 'PreRegistiration':
            case 'WaitingForRegistration':
                $w_st = 'Pending Registration';
                break;
            case 'PendingDelete':
                $w_st = 'Redemption';
                break;
            case 'Deleted':
                $w_st = 'Cancelled';
                break;
            case 'TransferredOut':
                $w_st = 'Transferred Away';
                break;
            case 'SynchronizationBlocked':
                $w_st = 'Grace';
                break;
            default:
                $w_st = '';
                break;
        }

        return $w_st;
    }


    #endregion

}
