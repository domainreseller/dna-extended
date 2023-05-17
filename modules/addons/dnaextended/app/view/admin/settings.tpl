<form id="settingsform">
    <input type="hidden" name="settingaction" value="save">
    <div class="portlet light bordered">
        <div class="portlet-body">
            <div class="table-container">
                <!-- generate table -->
                <table class="table table-striped">
                    <thead>
                    <trs>
                        <th colspan="2" class="modheading">{$_lang.automation_settings}</th>
                    </trs>
                    </thead>
                    <tbody>

                    <tr>
                        <td>{$_lang.cron_settings}</td>
                        <td>
                            <code>*/10 * * * * {$cronbinary} -q {$cronfile}</code>


                        </td>
                    </tr>
                    <tr>
                        <td>{$_lang.cron_status}</td>
                        <td>
                            <a href="javascript:void(0)" id="runmanualcron">{$_lang.manually_run_cron}</a> | {$_lang.cron_last_run} : {$latestcron}
                        </td>
                    </tr>
                    <tr>
                        <td>{$_lang.processing_record}</td>
                        <td>

                            <div class="input-group" style="max-width: 300px;">
                                <input id="DNArecordcount" name="DNArecordcount" class="form-control" placeholder="Sync Record count per check" type="number" min="100" max="1500" value="{$settings.DNArecordcount}">
                                <span class="input-group-addon">{$_lang.records}</span>
                            </div>

                        </td>
                    </tr>
                    <tr>
                        <td>{$_lang.exclude_deleted}</td>
                        <td>
                            <input type="checkbox" id="DNAexcludedeleted" name="DNAexcludedeleted" value="1" {if $settings.DNAexcludedeleted eq '1'}checked{/if}>
                        </td>
                    </tr>

                    </tbody>
                </table>

            </div>
            <div style="text-align: center; margin-bottom: 20px">
                <a href="javascript:void(0)" id="savesettings" class="btn btn-primary">{$_lang.save}</a>
            </div>
        </div>
    </div>
</form>


