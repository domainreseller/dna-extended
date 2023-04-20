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

require_once 'app.php';

class module {

    #region Util

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
