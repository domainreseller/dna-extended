
<div class="row">
    <div class="col-md-6">
        <div class="panel panel-success">
            <div class="panel-heading">
                <i class="fa fa-wrench"></i>
                {$_lang.dash_lastsync}
            </div>
            <div class="panel-body">

                <ul class="list-group">

                    {foreach from=$domains key=k item=v name=ind}
                        <li class="list-group-item">
                            {$v.domain}
                            <span class="badge badge-info">{$v.updated_at}</span>
                        </li>
                        {foreachelse}
                        <li class="list-group-item">No Record</li>
                    {/foreach}


                </ul>

            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="panel panel-success">
            <div class="panel-heading">
                <i class="fa fa-server"></i>
                {$_lang.dash_incoming} ({$incoming_count})
            </div>
            <div class="panel-body">

                <ul class="list-group">
                    {foreach from=$incoming key=k item=v name=ind}
                        <li class="list-group-item">
                            {$v.domain}
                        </li>
                        {foreachelse}
                        <li class="list-group-item">No Record</li>
                    {/foreach}
                </ul>

            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-6">
        <div class="panel panel-warning">
            <div class="panel-heading">
                <i class="fa fa-users"></i>
                {$_lang.dash_outgoing} ({$outgoing_count})
            </div>
            <div class="panel-body">

                <ul class="list-group">
                    {foreach from=$outgoing key=k item=v name=ind}
                        <li class="list-group-item">

                            {$v.domain}
                            <span class="badge badge-info">{$v.updated_at}</span>
                        </li>
                        {foreachelse}
                        <li class="list-group-item">No Record</li>
                    {/foreach}
                </ul>

            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="panel panel-success">
            <div class="panel-heading">
                <i class="fa fa-database"></i>
                {$_lang.dash_syscheck}
            </div>
            <div class="panel-body">

                <ul class="list-group">

                        <li class="list-group-item">

                            {$latestcron}

                        </li>

                </ul>

            </div>
        </div>
    </div>
</div>

