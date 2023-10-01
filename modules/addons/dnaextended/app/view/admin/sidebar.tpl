{*
<div id="isinuzmani-links">
    <div class="head">
        <div class="logo">
            <a href="https://www.isinuzmani.com/" title="İşin Uzmanı" target="_blank"><span>Bunyam.in</span></a>
        </div>
        <div class="modulename">
            SMS Modülü
        </div>
    </div>
    <div class="body">
        <ul class="moduletab">
            {foreach from=$menu key=k item=v name=ind}
                <li>
                    <a href="javascript:void(0);" data-target="{$v.action}">
                        <i class="{$v.icon}"></i>
                        {$v.text}

                        {if $v.child|count eq 0}
                            <i class="fas fa-angle-right"></i>
                        {else}
                            <i class="fas fa-angle-down"></i>
                        {/if}


                    </a>
                </li>
                {foreach from=$v.child key=k1 item=v1 name=ind1}
                    <li>
                        <a href="javascript:void(0);" data-target="{$v1.action}" style="padding: 12px 10px 12px 46px;">
                            <i class="{$v1.icon}"></i>
                            {$v1.text}
                            <i class="fas fa-angle-right"></i>
                        </a>
                    </li>
                {/foreach}


            {/foreach}

        </ul>
    </div>
    <div class="footer">
        Version {$version}
    </div>
</div>
*}
