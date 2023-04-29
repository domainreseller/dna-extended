<form id="settingsform">
    <input type="hidden" name="settingaction" value="save">
    <div class="portlet light bordered">
        <div class="portlet-body">
            <div class="table-container">
                <!-- generate table -->
                <table class="table table-striped">
                    <thead>
                    <trs>
                        <th colspan="2" class="modheading">Automation settings</th>
                    </trs>
                    </thead>
                    <tbody>

                    <tr>
                        <td>Cron Settings</td>
                        <td>
                            <code>*/10 * * * * {$cronfile}</code>


                        </td>
                    </tr>
                    <tr>
                        <td>Cron Status</td>
                        <td>
                            <a href="javascript:void(0)" id="runmanualcron">Run Manually</a> | Last Run : {$latestcron}
                        </td>
                    </tr>
                    <tr>
                        <td>Processing Record</td>
                        <td>

                            <div class="input-group" style="max-width: 300px;">
                                <input id="DNArecordcount" name="DNArecordcount" class="form-control" placeholder="Sync Record count per check" type="number" min="100" max="1500" value="{$settings.DNArecordcount}">
                                <span class="input-group-addon">records</span>
                            </div>

                        </td>
                    </tr>
                    <tr>
                        <td>Exclude Deleted records</td>
                        <td>
                            <input type="checkbox" id="DNAexcludedeleted" name="DNAexcludedeleted" value="1" {if $settings.DNAexcludedeleted eq '1'}checked{/if}>
                        </td>
                    </tr>

                    </tbody>
                </table>

            </div>
            <div style="text-align: center; margin-bottom: 20px">
                <a href="javascript:void(0)" id="savesettings" class="btn btn-primary">Save</a>
            </div>
        </div>
    </div>
</form>


