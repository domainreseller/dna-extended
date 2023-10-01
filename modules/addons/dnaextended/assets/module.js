/**
 * Created by Bunyamin on 27.07.2017.
 * Project name kriweb
 * 27.07.2017 16:02
 * Bünyamin AKÇAY <bunyamin@bunyam.in>
 */
const modulename = $('#module-name').val();
const loadinghtml = `<div style="width: 100%; text-align: center; margin-top: 70px;">
    <span class="module-loader" style="line-height: 100px;">${window._lang.loading}</span>
</div>`;
const modules = ['domains', 'settings'];
const dt_var = {
    dom: '<\'row\'<\'col-sm-6 actionbuttons\'><\'col-sm-6 actionbuttons2\'f>><\'row\'<\'col-sm-12\'r><\'col-sm-12\'t>><\'row\'<\'col-sm-4\'l><\'col-sm-4\'i><\'col-sm-4\'p>>',
    processing: true,
    serverSide: true,
    searching: true,
    info: true,
    ordering: true,
    lengthMenu: [[10, 20, 50, 100], [10, 20, 50, 100]],
};

$(document).ready(() => {
    if($("#modulebody").find("div").length < 1) {
        drawlayout('dashboard', {});
    }

    modules.forEach(module => {
        $('body').append(`<script src="../modules/addons/${modulename}/assets/module.${module}.js?v=${vvv}1"></script>`);
    });


    $(".moduleurl").click(function() {
        const target = $(this).attr("data-target");
        if (target && !$(this).parent("li").hasClass("active")) {
        $("ul.moduletopbarnav li").removeClass("active");
        $(this).parent("li").addClass("active");

        drawlayout(target, {});
        }
    });

    $("#whmcsdevbanner").remove();
});


function drawlayout(layout, parameters,conainer='modulebody',viewtype='html') {
    const containerSelector = `#${conainer}`;
    $(containerSelector).html(loadinghtml);

    $.post(generateUrl(layout, viewtype), parameters, data => {
        $(containerSelector).html(data);

        if ($(containerSelector + ' .subnav').length > 0) {
            $('.module-actions').html(`<ul class="nav nav-tabs">${$(containerSelector + ' .subnav').html()}</li>`);
            $(containerSelector + ' .subnav').remove();
        }else{
            $('.module-actions').empty();
        }

        $(document).trigger(`event.${layout}`);
    });

}

function generateUrl(controller,viewtype='json',extraparams={}){
    let _url = `${whmcsBaseUrl}${adminBaseRoutePath}/addonmodules.php?module=${modulename}&appcontroller=${controller}&viewtype=${viewtype}`;
    $.each(extraparams, (k, v) => {
        _url += `&${k}=${v}`;
    });
    return _url;
}


