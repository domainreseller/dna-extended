<!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.9/dist/css/bootstrap-select.min.css">-->


<input type="hidden" id="module-name" value="{$smarty.get.module}">
<!-- content -->
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <img src="../modules/addons/{$smarty.get.module}/logo.png" height="50px" alt="Domain Name Api">
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">

            </ul>

            <ul class="nav navbar-nav navbar-right moduletopbarnav">
                <li class="active">
                    <a href="#"class="moduleurl" data-target="dashboard" >{$_lang.nav_dashboard}</a>
                </li>
                <li>
                    <a href="#" class="moduleurl" data-target="balance">{$_lang.nav_balance}</a>
                </li>
                <li>
                    <a href="#" class="moduleurl" data-target="domains">{$_lang.nav_domains}</a>
                </li>
                <li>
                    <a href="#" class="moduleurl" data-target="settings">{$_lang.nav_settings}</a>
                </li>
            </ul>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>


<!-- ajax content -->
<div id="modulebody"></div>
<!-- //ajax content -->


<!-- //content -->

<div class="modal fade" id="generalmodal" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">
                    <i class="fa fa-log"></i>
                    <span id="generaltitle"></span>
                </h4>
            </div>
            <div class="modal-body" id="generalbody">

            </div>
            <div class="modal-footer">
                <div class="col-md-6"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div>
                <div class="col-md-6 extrabuttons"></div>

            </div>
        </div>
    </div>
</div>

<script>
  var vvv = '{$version}';
  window._lang = {
    warning_assigned_to_domain : '{$_lang.warning_assigned_to_domain}',
    warning_assigned_to_domainnameapi : '{$_lang.warning_assigned_to_domainnameapi}',
    warning_equal_expirydate : '{$_lang.warning_equal_expirydate}',
    text_search_client : '{$_lang.text_search_client}',
    syncinfo : '{$_lang.syncinfo}',
    loading : '{$_lang.loading}',
    btn_sync : '{$_lang.btn_sync}',
    btn_contact : '{$_lang.btn_contact}',
    btn_ns : '{$_lang.btn_ns}',
    btn_lock : '{$_lang.btn_lock}',
    btn_approve : '{$_lang.btn_approve}',
    btn_reject : '{$_lang.btn_reject}',
    btn_cancel : '{$_lang.btn_cancel}',
    btn_filter_by_status : '{$_lang.btn_filter_by_status}',
    domains : '{$_lang.domains}',
    domain : '{$_lang.domain}',
    values_with : '{$_lang.values_with}',
    client : '{$_lang.client}',
    sync : '{$_lang.sync}',
    nstxt : '{$_lang.nstxt}',
    type : '{$_lang.type}',
    locktype : '{$_lang.locktype}',
    privacy_protection : '{$_lang.privacy_protection}',
    thieft_protection : '{$_lang.thieft_protection}',
    enabled : '{$_lang.enabled}',
    disabled : '{$_lang.disabled}',
    cancel_warning : '{$_lang.cancel_warning}',
    reject_warning : '{$_lang.reject_warning}',
    approve_warning : '{$_lang.approve_warning}',
    manually_run_cron : '{$_lang.manually_run_cron}',
    cron_started : '{$_lang.cron_started}',
  };
</script>


<!-- MODULE -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js"></script>
<script src="../modules/addons/{$smarty.get.module}/assets/ajax-bootstrap-select.min.js"></script>
<script src="../modules/addons/{$smarty.get.module}/assets/jquery.validate.min.js"></script>


<link href="../modules/addons/{$smarty.get.module}/assets/bootstrap.theme.css?v={$version}" rel="stylesheet">
<link href="../modules/addons/{$smarty.get.module}/assets/module.css?v={$version}" rel="stylesheet">
<script src="../modules/addons/{$smarty.get.module}/assets/module.js?v={$version}"></script>

