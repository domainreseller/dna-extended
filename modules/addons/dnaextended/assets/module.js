/**
 *
 * Created by Bunyamin on 27.07.2017.
 * Project name kriweb
 * 27.07.2017 16:02
 * Bünyamin AKÇAY <bunyamin@bunyam.in>
 */
let modulename = $('#module-name').val();
let loadinghtml = '<div style="width: 100%; text-align: center; margin-top: 70px;"><span class="module-loader" style="line-height: 100px;">'+window._lang.loading+'</span></div>';
let currentmodalid='';


let modules = [
    'domains',
    'settings'
];
let dt_var = {
    dom: '<\'row\'<\'col-sm-6 actionbuttons\'><\'col-sm-6 actionbuttons2\'f>><\'row\'<\'col-sm-12\'r><\'col-sm-12\'t>><\'row\'<\'col-sm-4\'l><\'col-sm-4\'i><\'col-sm-4\'p>>',
    //language: {
    //    "url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
    //},
    processing: true,
    serverSide: true,
    searching: true,
    info: true,
    ordering: true,
    lengthMenu: [[10, 20, 50, 100], [10, 20, 50, 100]],
};

$(document).ready(function () {

    if($("#modulebody").find("div").length < 1) {
        drawlayout('dashboard', {});
    }

    $.each(modules, function (k, v) {
        $('body').append('<script src="../modules/addons/'+modulename+'/assets/module.' + v + '.js?v='+vvv+'"></script>');
    });


    $(".moduleurl").click(function() {
        var target = $(this).attr("data-target");

        if(target==''){
            return 0;
        }

        if($(this).parent("li").hasClass("active")){
          return 0;
        }

        $("ul.moduletopbarnav li").removeClass("active");
        $(this).parent("li").addClass("active");

        drawlayout(target, {});
    });

    $("#whmcsdevbanner").remove();
});


function drawlayout(layout, parameters,conainer='modulebody',viewtype='html') {

    $('#'+conainer).html(loadinghtml)

    $.post( generateUrl(layout,viewtype), parameters, function (data) {

        $('#'+conainer).html(data);


        if($('#'+conainer+' .subnav').length>0){

          $('.module-actions').html('<ul class="nav nav-tabs">'+$('#'+conainer+' .subnav').html()+'</li>');
          $('#'+conainer+' .subnav').remove();


        }else{

          $('.module-actions').html('');

        }

        $(document).trigger('event.' + layout);


    });

}

function generateUrl(controller,viewtype='json',extraparams={}){
    let _url= whmcsBaseUrl+adminBaseRoutePath+'/';
    _url +='addonmodules.php?module=' + modulename + '&appcontroller='+controller+'&viewtype='+viewtype;
    $.each(extraparams, function (k, v) {
        _url+='&'+k+'='+v;
    });
    return _url;
}


