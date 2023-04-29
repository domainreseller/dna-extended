{if $result !='OK' and 1==2}
    <div class="alert alert-warning" role="alert">
        {$_lang.something_went_wrong} Error : {$error.Message} {$error.Details}
    </div>
{else}
    <div class="row">
        <div class="col-md-6">
            <div class="col-md-8">

                <div class="portlet light bordered">
                    <div class="portlet-body">
                        <div class="table-container">
                            <!-- generate table -->
                            <table class="table table-striped">
                                <thead>
                                <tr>
                                    <th colspan="2">{$_lang.balance_info}</th>
                                </tr>
                                </thead>
                                <tbody>

                                <tr>
                                    <td>{$_lang.balance_info_id}</td>
                                    <td>{$id}</td>
                                </tr>
                                <tr>
                                    <td>{$_lang.balance_info_name}</td>
                                    <td>{$name}</td>
                                </tr>
                                <tr>
                                    <td>{$_lang.balance_info_status}</td>
                                    <td>{$active}</td>
                                </tr>

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>

            </div>
            <div class="col-md-4">

                <div class="portlet light bordered">
                    <div class="portlet-body">
                        <div class="table-container">

                            <table class="table table-striped">
                                <thead>
                                <tr>
                                    <th colspan="2">{$_lang.balance_status}</th>
                                </tr>
                                </thead>
                                <tbody>

                                {foreach from=$balances key=k item=v name=ind}
                                    <tr>
                                        <td>{$v.currency}</td>
                                        <td class="text-right">{$v.balance}{$v.symbol}</td>
                                    </tr>
                                {/foreach}



                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        <div class="col-md-6">

            <div class="portlet light bordered">
                <div class="portlet-body">
                    <div class="table-container">

                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th colspan="2">{$_lang.balance_activity}</th>
                            </tr>
                            </thead>
                            <tbody>

                            <tr>
                                <td colspan="2">{$_lang.balance_activity_soon}</td>
                            </tr>


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>

    </div>
{/if}
