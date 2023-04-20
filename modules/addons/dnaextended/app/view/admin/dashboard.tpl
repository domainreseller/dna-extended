
<div class="row">
    <div class="col-md-6">
        <div class="panel panel-success">
            <div class="panel-heading">
                <i class="fa fa-wrench"></i>
                Latest Synced Domains
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
                Latest Incoming Transfers ({$incoming_count})
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
                Latest Outgoing Transfers ({$outgoing_count})
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
                Latest System Check
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

