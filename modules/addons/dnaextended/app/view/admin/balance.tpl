{if $result !='OK' and 1==2}
    <div class="alert alert-warning" role="alert">
        Ooops! Something went wrong. Error : {$error.Message} {$error.Details}
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
                                    <th colspan="2">Reseller Info</th>
                                </tr>
                                </thead>
                                <tbody>

                                <tr>
                                    <td>ID</td>
                                    <td>{$id}</td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td>{$name}</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
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
                                    <th colspan="2">Balance Status</th>
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
                                <th colspan="2">Balance Activity</th>
                            </tr>
                            </thead>
                            <tbody>

                            <tr>
                                <td colspan="2">Balance activity coming soon</td>
                            </tr>


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>

    </div>
{/if}
