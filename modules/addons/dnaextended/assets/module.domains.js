/**
 * Created by PhpStorm.
 * User: bunyaminakcay
 * Project name dna-extended
 * 15.04.2023 23:53
 * Bünyamin AKÇAY <bunyamin@bunyam.in>
 */
let domainstable;
let post_parameters=[];
let processing_domains  = [];

$(document).on('event.domains', function() {

  //region ZoneDatatableINIT
  let zoneslist;

  domainstable = $('#domainstable').DataTable({
    dom           : dt_var.dom,
    language      : dt_var.language,
        processing: dt_var.processing,
        serverSide: dt_var.serverSide,
    searching     : dt_var.searching,
        info: dt_var.info,
        ordering: dt_var.ordering,
        lengthMenu: dt_var.lengthMenu,
    ajax          : {
      url : generateUrl('domain.list'),
      type: 'POST',
      data: function(d) {
        d.parameters = post_parameters;
      }
    },
    'order'       : [[0, 'desc']],
    columns       : [
      {'data': 'id', 'orderable': false,"width": "20px"},
      {'data': 'domain'},
      {'data': 'status', 'orderable': false},
      {'data': 'id', 'orderable': false},
      {'data': 'id', 'orderable': false},
    ],

    createdRow    : function(row, data, index) {


      let _check = '<input type="checkbox" class="checkboxes cb-quick-action" name="domainids[]" value="' + data.id + '" data-domain="'+data.domain+'" data-dna="'+data.statuses.assigned_to_domainnameapi+'" data-expiry="'+data.statuses.equal_expirydate+'" data-user="'+data.statuses.assigned_to_user+'" data-assigned="'+data.statuses.assigned_to_domain+'"/>';
      $('td', row).eq(0).html(_check);

      let _statuscode = '';
      switch (data.status) {
        case 'Active':
          _statuscode='success';
          break;
        case 'WaitingForIncomingTransfer':
          _statuscode='warning';
          break;
        case 'WaitingForOutgoingTransfer':
          _statuscode='danger';
          break;
        case 'PendingDelete':
          _statuscode='info';
          break;
        case 'Deleted':
          _statuscode='danger';
          break;
      }

      let _status = '<span class="label label-'+_statuscode+'">'+data.status+'</span>';
      $('td', row).eq(2).html(_status);

      let _userinfo ='';
      if(data.user_info.id){
        _userinfo = '<a href="clientssummary.php?userid='+data.user_info.id+'" target="_blank">#'+data.user_info.id+' '+data.user_info.firstname+' '+data.user_info.lastname+'</a>';
      }

      if(data.domain_info.id){
        _userinfo += '<br><a href="clientsdomains.php?id='+data.domain_info.id+'" target="_blank">'+data.domain_info.domain+'</a>';
      }

      if(data.statuses.assigned_to_domain==false){
        _userinfo += '<span class="label label-danger">'+window._lang.warning_assigned_to_domain+'</span>';
      }else if(data.statuses.assigned_to_domainnameapi==false){
        _userinfo += '<br><span class="label label-danger">'+window._lang.warning_assigned_to_domainnameapi+'</span>';
      }else if(data.statuses.equal_expirydate==false){
        _userinfo += '<br><span class="label label-info">'+window._lang.warning_equal_expirydate+'</span>';
      }

      $('td', row).eq(3).html(_userinfo);

      //region Status
      //
      //let _status = '<span class="label label-success">';
      //if (data.default != 1) {
        //  _status = '<span class="label label-warning">';
        //  _status += 'Hayır';
        //}
      //else {
        //  _status += 'Evet';
        //}
      //
      //_status += '</label>';
      //$('td', row).eq(4).html(_status);

      //endregion

      //region Buttons

      let _buttons =
              [
                {
                  id         : 'makedefault',
                  text       : 'Varsayılan yap',
                  icon       : 'fa-check',
                  classes    : 'green btn-outline',
                  onlydefault: true,
                },
                {
                  id         : 'editprovider',
                  text       : 'Detaylar',
                  icon       : 'fa-pencil',
                  classes    : 'blue-madison btn-outline',
                  onlydefault: false,
                },
                {
                  id         : 'deleteprovider',
                  text       : 'Sil',
                  icon       : 'fa-trash',
                  classes    : 'red btn-outline',
                  onlydefault: false,
                },
              ];
      let _buttontext = '';

      //@todo Buradaki conditionu ypaamadım...

      $.each(_buttons, function(k, v) {

        if (data.default == 1 && v.id == 'makedefault') {
          return;
        }

        _buttontext += '<a href="javascript:void(0)" id="' + v.id + '-' +
            data.id + '" data-id="' + data.id + '" data-provier="' +
            data.submodule + '" class="btn btn-sm ' + v.classes + ' ' + v.id +
            '" title="' + v.text + '"><i class="fa ' + v.icon + '"></i></a> ';

      });

      $('td', row).eq(4).html(_buttontext);

      //endregion

    },
    fnRowCallback : function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

    },
    fnInitComplete: function(oSettings, json) {

      let selection_buttons = '';
      selection_buttons += '<a class="btn btn-sm btn-warning btn-quickaction btn-action-inport">Import <span class="selectedcount"></span></a> ';
      selection_buttons += '<a class="btn btn-sm btn-warning btn-quickaction btn-action-sync">Sync <span class="selectedcount"></span></a> ';
      selection_buttons += '<a class="btn btn-sm btn-warning btn-quickaction btn-action-contact">Set Contact <span class="selectedcount"></span></a> ';
      selection_buttons += '<a class="btn btn-sm btn-warning btn-quickaction btn-action-client">Change Client <span class="selectedcount"></span></a> ';


      $('.actionbuttons').html(selection_buttons);


      let option_filter = '';
      option_filter += ' <div id="filterbystatus">Filter By Status : <select class="selectpicker searching-statuses show-tick" multiple data-selected-text-format="count > 3" multiple data-actions-box="true">';

      $.each(json.searchPanes.options.status, function(k, v) {
        option_filter += '<option value="' + v.label + '" selected>' + v.label +' ('+ v.count +') </option>';
      });
      option_filter += '</select></div> ';

      $('.actionbuttons2').prepend(option_filter);


      $('.selectpicker').selectpicker();

      $('.searching-statuses').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        let selected = $(this).selectpicker('val') ;
        if(Array.isArray(selected)){
          post_parameters = selected;
          domainstable.ajax.reload();
        }

      });



    },
    fnDrawCallback: function(oSettings) {
    },
    //"order": [[4, 'asc']]
  });

  //endregion

});



$(document).on("change",".cb-quick-action" ,function() {

  let _count = $('.cb-quick-action:checked').length;
  $('.selectedcount').html('('+_count+')');

  if(_count>0) {
    $('.btn-quickaction').show();
  }else{
    $('.btn-quickaction').hide();
  }

});


$(document).on("click",'.btn-action-inport', function(){

  processing_domains= [];


  $.each($('.cb-quick-action:checked'), function(k, v) {

    if($(v).attr('data-user')=='false'){

      let _obj = { domain: $(v).attr('data-domain'), domainid: $(v).val() };
      processing_domains.push(_obj);

    }

  });

  if(processing_domains.length>0){

    import_modal_display(processing_domains);

  }

});

$(document).on("click",'.btn-action-sync', function(){

  processing_domains= [];

  $.each($('.cb-quick-action:checked'), function(k, v) {
     if($(v).attr('data-user')=='true') {
       let _obj = {domain: $(v).attr('data-domain'), domainid: $(v).val()};
       processing_domains.push(_obj);
     }
  });

  if(processing_domains.length>0){

    sync_modal_display(processing_domains);

  }

});
$(document).on("click",'.btn-action-contact', function(){

  processing_domains= [];

  $.each($('.cb-quick-action:checked'), function(k, v) {
     if($(v).attr('data-user')=='true') {
       let _obj = {domain: $(v).attr('data-domain'), domainid: $(v).val()};
       processing_domains.push(_obj);
     }
  });

  if(processing_domains.length>0){


  }

  draw_contact_form();

});

$(document).on("click",'#importdomains', function(){

  let _formdata = $('#importform').serializeArray();

  $('#generalmodal').modal('hide');

  $('#modulebody').prepend('<div id="alert-loading" class="alert alert-info"><fa class="fa fa-spinner fa-spin fa-3x fa-fw"></fa> Loading...</div>');

  $.ajax({
    url     : generateUrl('domain.import'),
    type    : 'POST',
    data    : _formdata,
    dataType: 'json',
    success : function(data) {

      $('#alert-loading').remove();

      if (data.status == 'success') {
        message_display(data.message, 'success');
        domainstable.ajax.reload();
      }
      else {
        message_display(data.message, 'danger');
      }
    }
  });

});

$(document).on("click",'#syncdomains', function(){

  $('#syncdomains').button('loading');


  $('.syncing').html('<fa class="fa fa-spinner fa-spin fa-fw syncloading"></fa> Loading...');


  //make request with ajax in array async

  if (processing_domains.length > 0) {


    // İlk isteği gönder
    sendAjaxRequests(0);
  }

});

function message_display(_message, _type) {

  let _alert_id = 'alert-' + Math.floor(Math.random() * 1000000);
  $('#modulebody').prepend('<div id="' + _alert_id + '" class="alert alert-' + _type + '">' + _message + '</div>');

  setTimeout(function() {
    $('#' + _alert_id).fadeOut(500);
  }, 10000);

}

function import_modal_display(){


  $('#generalmodal').modal('show');
  $('#generalmodal .modal-title').html('Import');
  $('#generalmodal .modal-footer .extrabuttons').html('<button type="button" class="btn btn-primary" id="importdomains">Import</button>');
  $('#generalmodal .modal-body').html('<div class="row"><form id="importform" class="col-md-12"><div class="portlet light bordered"><div class="portlet-body"><div class="table-container"><table class="table table-striped table-bordered table-hover" id="importtable"><thead><tr><th>Domain</th><th>Client</th></tr></thead><tbody></tbody></table></div></div></div></form></div>');

  $.each(processing_domains, function(k, v) {
    $('#importtable tbody').append('<tr><td>'+v.domain+'</td><td><select id="ajax-select'+v.domainid+'" name="importuser['+v.domainid+']" class="selectpicker2 with-ajax" data-live-search="true"></select></td></tr>')
  });

  $(".selectpicker2").selectpicker().filter(".with-ajax").ajaxSelectPicker({
        ajax: {
            url: generateUrl('client.search'),
            data: function () {
                var params = {
                    q: '{{{q}}}'
                };
                return params;
            }
        },
        locale: {
            emptyTitle: window._lang.text_search_client
        },
        preprocessData: function(data){
            var contacts = [];
            if(data.hasOwnProperty('results')){
                var len = data.results.length;
                for(var i = 0; i < len; i++){
                    var curr = data.results[i];
                    contacts.push(
                        {
                            'value': curr.id,
                            'text': curr.text,
                            'data': {
                                'icon': 'icon-person',
                                'subtext': curr.companyname
                            },
                            'disabled': false
                        }
                    );
                }
            }
            return contacts;
        },
        preserveSelected: false
    });

}

function sync_modal_display(){


  $('#generalmodal').modal('show');
  $('#generalmodal .modal-title').html('Sync');
  $('#generalmodal .modal-footer .extrabuttons').html('<button type="button" class="btn btn-primary" id="syncdomains">Sync</button>');
  $('#generalmodal .modal-body').html('<div class="row"><form id="syncform" class="col-md-12"><div class="alert alert-info">'+window._lang.syncinfo+'</div><div class="portlet light bordered"><div class="portlet-body"><div class="table-container"><table class="table table-striped table-bordered table-hover" id="importtable"><thead><tr><th>Domain</th><th>Sync</th></tr></thead><tbody></tbody></table></div></div><br></div></form></div>');

  $.each(processing_domains, function(k, v) {
    $('#importtable tbody').append('<tr><td>'+v.domain+'</td><td class="syncing syncid-'+v.domainid+'"> </td></tr>')
  });




}

// processing_domains dizisindeki her bir öğe için bir Ajax isteği at
function sendAjaxRequests(index) {

  if (index >= processing_domains.length) {
    // Tüm istekler tamamlandı
    console.log('Tüm istekler tamamlandı');
    $('#syncdomains').button('reset');
    return;
  }

  const domain = processing_domains[index];
  $.ajax({
    url     : generateUrl('domain.sync'),
    type    : 'POST',
    data    : {domainid: domain.domainid},
    dataType: 'json',
    success : function(data) {

      if (data.status == 'success') {
        $('.syncid-' + domain.domainid).html('<fa class="fa fa-check text-success"></fa>');
      } else {
        $('.syncid-' + domain.domainid).html('<fa class="fa fa-times text-danger"></fa> ' + data.message);
      }
      sendAjaxRequests(index + 1);
    },
  });

}

$(document).on("change",".makesame" ,function() {

  $.each($('.makesame'), function(k, v) {

    let tabid=$(v).attr('data-tabid');

    if($(v).is(':checked')) {

      $('.tabset-'+tabid).addClass('disabled');
      $('.tabset-'+tabid).find('a').attr('data-toggle', 'ssss');

    } else {
      $('.tabset-'+tabid).removeClass('disabled');
      $('.tabset-'+tabid).find('a').attr('data-toggle', 'tab');
    }
     $('.tabset-registrant').find('a').click()


    console.log(tabid);

  });

});

function draw_contact_form() {


  let tab_fields = [
    'Registrant',
    'Administrative',
    'Billing',
    'Technical',

  ];

  let tab_inputs = [
     'First Name	',
     'Last Name	',
     'Company Name	',
     'Phone Country Code	',
     'Phone	',
     'Fax Country Code',
     'Fax	',
     'Address 1	',
     'Address 2	',
     'Address 3	',
     'State	',
     'City	',
     'Country	',
     'ZIP Code	',
  ];

// Form HTML generation
  let formHtml = '<form>';
  formHtml += '<ul class="nav nav-tabs">';
  tab_fields.forEach((tab, index) => {
    let activeClass = index === 0 ? 'active' : '';
    let tab_id = tab.toLowerCase();
    activeClass += ` tabset-${tab_id}`;
    formHtml += `<li class="${activeClass}"><a data-toggle="tab" href="#${tab_id}">${tab}</a> </li>`;
  });
  formHtml += '</ul>';
  formHtml += '<div class="tab-content col-md-8"> ';
  tab_fields.forEach((tab, index) => {
    let activeClass = index === 0 ? 'active' : '';
    let tab_id = tab.toLowerCase();
    formHtml += `<div id="${tab_id}" class="tab-pane fade in ${activeClass}"><br>`;
    formHtml += '<div class="form-group">';
    tab_inputs.forEach(input => {

      let field_id = input;
      field_id = field_id.toLowerCase();
      field_id = field_id.replace(' ', '');

      formHtml += `<label class="col-md-3 control-label" style="padding: 5px;" for="textinput">${input}</label> <div class="col-md-9" style="padding: 5px;"><input type="text" name="contacts[${tab_id}][${field_id}]" class="form-control"></div> <div class="clearfix"></div>`;
    });
    formHtml += '</div></div>';
  });
  formHtml += '</div> ';

formHtml += '<div class="col-md-4"> ';
  tab_fields.forEach((tab, index) => {
    let tab_id = tab.toLowerCase();
    let samewith = index === 0
        ? ''
        : `<br><label class="checkbox-inline" for="checkboxes-${index}"  >  <input type="checkbox" name="checkboxes" id="checkboxes-${index}" class="makesame" name="same[]" value="${tab_id}" data-tabid="${tab_id}">Make ${tab} values same with "Registrant" </label><br>`;
    formHtml += `${samewith} `;
  });
  formHtml += '</div></div>';

  formHtml += '<div class="clearfix"></form>';

  $('#generalmodal .modal-body').html(formHtml);

  $('#generalmodal').modal('show');

}

















$(document).on('click', '.editprovider', function() {
  let providerid = $(this).attr('data-id');
  let provider = $(this).attr('data-provier');

  let _buttons = [
    {
      id   : 'testprovider',
      text : 'Test Et',
      class: 'yellow',
    }, {
      id   : 'applyprovider',
      text : 'Kaydet',
      class: 'btn-success apply',
    },
  ];

  modalDrawer('provider.detail', {providerid: providerid, submodule: provider},
      true, _buttons);
});

$(document).on('change', '#submodule', function() {

  let submodule = $('#submodule option:selected').val();
  let providerid = $('#providerid').val();

  $.post(generateUrl('provider.detail.partial', 'html'),
      {submodule: submodule, providerid: providerid}, function(data) {

        $('#modulepreferences').html(data);

      });

});

$(document).on('click', '#applyprovider', function() {

  let parameters = $('#getproviderdetails').serializeArray();

  $.post(generateUrl('provider.save'), parameters, function(data) {

    $('#providerstable').DataTable().ajax.reload();

    $('#' + currentmodalid).modal('toggle');

  }, 'json');

});
$(document).on('click', '#testprovider', function() {

  let parameters = $('#getproviderdetails').serializeArray();

  $.post(generateUrl('provider.test'), parameters, function(data) {

    if (data.result == 'success') {
      alert('Ayarlar doğru');
    }
    else if (data.result == 'orginatorisnotdefined') {
      let orgs = data.orginators;
      alert(
          'Kullanıcı adı şifreniz doğru fakat başlık bilgisi yanlış. Şu başlıkları kullanabilirsiniz: ' +
          orgs.join(' , '));
    }
    else {
      alert('Ayarlar Yanlış');
    }

  }, 'json');

});
$(document).on('click', '.deleteprovider', function() {

  let providerid = $(this).attr('data-id');

  let r = confirm('Silinsin mi ?');
  if (r == true) {
    $.post(generateUrl('provider.delete'), {providerid: providerid},
        function(data) {

          $('#providerstable').DataTable().ajax.reload();

        }, 'json');
  }
  else {

  }

});
$(document).on('click', '.makedefault', function() {

  let providerid = $(this).attr('data-id');

  let r = confirm('Varsayılan yapılsın mı ?');
  if (r == true) {
    $.post(generateUrl('provider.makedefault'), {providerid: providerid},
        function(data) {

          $('#providerstable').DataTable().ajax.reload();

        }, 'json');
  }
  else {

  }

});
