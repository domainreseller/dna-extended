/**
 *
 * Created by Bunyamin on 27.07.2017.
 * Project name kriweb
 * 27.07.2017 16:02
 * Bünyamin AKÇAY <bunyamin@bunyam.in>
 */
let modulename = $('#module-name').val();
let loadinghtml = '<div class="container-loading"> <div class="circle-loading"></div></div>';
let currentmodalid='';
let defaultadminpermissions={};
let defaultadminpermissionstext={};
let templatelanguages={};

let modules = [
    'domains'
];
let dt_var = {
    dom: '<\'row\'<\'col-sm-6 actionbuttons\'><\'col-sm-6 actionbuttons2\'f>><\'row\'<\'col-sm-12\'r><\'col-sm-12\'t>><\'row\'<\'col-sm-4\'l><\'col-sm-4\'i><\'col-sm-4\'p>>',
    language: {
        "url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
    },
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

        $("ul.moduletab li").removeClass("active");
        $(this).parent("li").addClass("active");

        drawlayout(target, {});
    });

    $("#whmcsdevbanner").remove();
});




function modalDrawer(controller,parameters={},togglemodal=true,buttons={}){

    let modalname = 'modal'+Math.floor(Math.random()*1000);
    currentmodalid=modalname;

    let _btntxt='';

    $.each(buttons, function (k, v) {
        _btntxt+='<a href="javascript:void(0)" class="btn '+v.class+'" id="'+v.id+'">'+v.text+'</a>';
    });


    let modalhtml ='<div class="modal fade" id="'+modalname+'" role="dialog">' +
        '    <div class="modal-dialog modal-lg">' +
        '        <div class="modal-content">' +
        '            <div class="modal-header">' +
        '                <button type="button" class="close" data-dismiss="modal">&times;</button>' +
        '                <h4 class="modal-title"><i class="fa fa-log"></i><span id="'+modalname+'title"></span></h4>' +
        '            </div>' +
        '            <div class="modal-body" id="'+modalname+'body">' +
        '            </div>' +
        '            <div class="modal-footer">' + _btntxt+
        '                <button type="button" class="btn btn-default" data-dismiss="modal">Kapat</button>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>';

    $('body').append(modalhtml);
    $("#"+modalname).on('hidden.bs.modal', function () {
        $(this).data('bs.modal', null);
        $("#"+modalname).remove();
    });

    let currentModal = $("#"+modalname);

    if (togglemodal) {
        currentModal.modal('toggle');
    }
    drawlayout(controller, parameters , modalname+'body');
}

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


