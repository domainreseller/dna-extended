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
    dom       : dt_var.dom,
    language  : dt_var.language,
    processing: dt_var.processing,
    serverSide: dt_var.serverSide,
    searching : dt_var.searching,
    info      : dt_var.info,
    ordering  : dt_var.ordering,
    lengthMenu: dt_var.lengthMenu,
    ajax      : {
      url : generateUrl('domain.list'),
      type: 'POST',
      data: function(d) {
        d.parameters = post_parameters;
      },
    },
    'order'   : [[0, 'desc']],
    columns   : [
      {'data': 'id', 'orderable': false, 'width': '20px'},
      {'data': 'domain'},
      {'data': 'status', 'orderable': false},
      {'data': 'id', 'orderable': false},
      {'data': 'id', 'orderable': false},
    ],

    createdRow    : function(row, data, index) {


      let _check = '<input type="checkbox" class="checkboxes cb-quick-action" name="domainids[]" value="' + data.id + '" data-domain="'+data.domain+'" data-status="'+data.status+'" data-dna="'+data.statuses.assigned_to_domainnameapi+'" data-expiry="'+data.statuses.equal_expirydate+'" data-user="'+data.statuses.assigned_to_user+'" data-assigned="'+data.statuses.assigned_to_domain+'"/>';
      $('td', row).eq(0).html(_check);

      let _statuscode = '';
      switch (data.status) {
        case 'Active':
          _statuscode = 'success';
          break;
        case 'WaitingForIncomingTransfer':
          _statuscode = 'warning';
          break;
        case 'WaitingForOutgoingTransfer':
          _statuscode = 'danger';
          break;
        case 'PendingDelete':
          _statuscode = 'info';
          break;
        case 'Deleted':
          _statuscode = 'danger';
          break;
        default :
          _statuscode = 'default';
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
      selection_buttons += '<a class="btn btn-sm btn-outline-info btn-quickaction btn-action-inport"><i class="fa fa-download"></i> Import <span class="selectedcount"></span></a> ';
      selection_buttons += '<a class="btn btn-sm btn-outline-info btn-quickaction btn-action-sync"><i class="fa fa-recycle"></i> Sync <span class="selectedcount"></span></a> ';
      selection_buttons += '<a class="btn btn-sm btn-outline-info btn-quickaction btn-action-contact"><i class="fa fa-calendar"></i> Set Contact <span class="selectedcount"></span></a> ';
      selection_buttons += '<a class="btn btn-sm btn-outline-info btn-quickaction btn-action-setns"><i class="fa fa-bars"></i> Set NS <span class="selectedcount"></span></a> ';
      selection_buttons += '<a class="btn btn-sm btn-outline-info btn-quickaction btn-action-setlock"><i class="fa fa-lock"></i> Set Lock <span class="selectedcount"></span></a> ';
      selection_buttons += '<a class="btn btn-sm btn-outline-info btn-quickaction btn-action-approveout"><i class="fa fa-mail-forward"></i> Approve Out. Tr. <span class="selectedcount"></span></a> ';
      selection_buttons += '<a class="btn btn-sm btn-outline-info btn-quickaction btn-action-rejectout"><i class="fa fa-arrow-circle-right"></i> Reject Out. Tr. <span class="selectedcount"></span></a> ';
      selection_buttons += '<a class="btn btn-sm btn-outline-info btn-quickaction btn-action-cancelin"><i class="fa fa-ban"></i> Cancel Inc. Tr. <span class="selectedcount"></span></a> ';

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

//Checkboxes checked events
$(document).on("change",".cb-quick-action" ,function() {

  let _count = $('.cb-quick-action:checked').length;

  let _importable_count   = $('.cb-quick-action:checked[data-user="false"]').length;
  let _syncable_count     = $('.cb-quick-action:checked[data-user="true"]').length;
  let _actived_count    = $('.cb-quick-action:checked').length;
  let _outable_count  = $('.cb-quick-action:checked[data-status="WaitingForOutgoingTransfer"]').length;
  let _incoming_count  = $('.cb-quick-action:checked[data-status="WaitingForIncomingTransfer"]').length;

  $('.btn-action-inport span.selectedcount').html('('+_importable_count+')');
  $('.btn-action-sync span.selectedcount').html('('+_syncable_count+')');
  $('.btn-action-contact span.selectedcount').html('('+_actived_count+')');
  $('.btn-action-setns span.selectedcount').html('('+_actived_count+')');
  $('.btn-action-setlock span.selectedcount').html('('+_actived_count+')');
  $('.btn-action-approveout span.selectedcount').html('('+_outable_count+')');
  $('.btn-action-rejectout span.selectedcount').html('('+_outable_count+')');
  $('.btn-action-cancelin span.selectedcount').html('('+_incoming_count+')');

  if (_count > 0) {
    $('.btn-quickaction').show();
  } else {
    $('.btn-quickaction').hide();
  }

  if (_importable_count == 0) {
    $('.btn-action-inport').hide();
  } else {
    $('.btn-action-inport').show();
  }

  if (_syncable_count == 0) {
    $('.btn-action-sync').hide();
  } else {
    $('.btn-action-sync').show();
  }

  if (_actived_count == 0) {
    $('.btn-action-setns').hide();
    $('.btn-action-setlock').hide();
    $('.btn-action-contact').hide();
  } else {
    $('.btn-action-setns').show();
    $('.btn-action-setlock').show();
    $('.btn-action-contact').show();
  }

  if (_outable_count == 0) {
    $('.btn-action-approveout').hide();
    $('.btn-action-rejectout').hide();
  } else {
    $('.btn-action-approveout').show();
    $('.btn-action-rejectout').show();
  }

  if (_incoming_count == 0) {
    $('.btn-action-cancelin').hide();
  } else {
    $('.btn-action-cancelin').show();
  }



});

//Import Modal
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

//Sync Modal
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

//Set Nameserver Modal
$(document).on("click",'.btn-action-setns', function(){

  processing_domains= [];

  $.each($('.cb-quick-action:checked'), function(k, v) {
     //if($(v).attr('data-user')=='true') {
       let _obj = {domain: $(v).attr('data-domain'), domainid: $(v).val()};
       processing_domains.push(_obj);
     //}
  });

  if(processing_domains.length>0){

    setns_modal_display();

  }

});

//Set Lock Modal
$(document).on("click",'.btn-action-setlock', function(){

  processing_domains= [];

  $.each($('.cb-quick-action:checked'), function(k, v) {
     //if($(v).attr('data-user')=='true') {
       let _obj = {domain: $(v).attr('data-domain'), domainid: $(v).val()};
       processing_domains.push(_obj);
     //}
  });

  if(processing_domains.length>0){

    setlock_modal_display();

  }

});

//Set Contact Modal
$(document).on("click",'.btn-action-contact', function(){

  processing_domains= [];

  $.each($('.cb-quick-action:checked'), function(k, v) {
     if($(v).attr('data-user')=='true') {
       let _obj = {domain: $(v).attr('data-domain'), domainid: $(v).val()};
       processing_domains.push(_obj);
     }
  });



  let contactform = draw_contact_form();

  if(processing_domains.length>0){

    let _pr = processing_domains[0];

    $.ajax({
    url     : generateUrl('domain.contact'),
    type    : 'POST',
    data    : _pr,
    dataType: 'json',
    success : function(data) {

      if(data.contact){
        if(data.contact.result=='OK'){

          let tab_fields = [
            'Administrative',
            'Registrant',
            'Billing',
            'Technical',
          ];

          $.each(tab_fields, function(k, v) {

            let tab_id = v.toLowerCase();

            $('#contacts-'+tab_id+'-'+'firstname').val(data.contact.data.contacts[v]['FirstName']);
            $('#contacts-'+tab_id+'-'+'lastname').val(data.contact.data.contacts[v]['LastName']);
            $('#contacts-'+tab_id+'-'+'companyname').val(data.contact.data.contacts[v]['Company']);
            $('#contacts-'+tab_id+'-'+'phonecountrycode').val(data.contact.data.contacts[v]['Phone']['Phone']['CountryCode']);
            $('#contacts-'+tab_id+'-'+'phone').val(data.contact.data.contacts[v]['Phone']['Phone']['Number']);
            $('#contacts-'+tab_id+'-'+'faxcountrycode').val(data.contact.data.contacts[v]['Phone']['Fax']['CountryCode']);
            $('#contacts-'+tab_id+'-'+'fax').val(data.contact.data.contacts[v]['Phone']['Fax']['Number']);
            $('#contacts-'+tab_id+'-'+'address1').val(data.contact.data.contacts[v]['Address']['Line1']);
            $('#contacts-'+tab_id+'-'+'address2').val(data.contact.data.contacts[v]['Address']['Line2']);
            $('#contacts-'+tab_id+'-'+'address3').val(data.contact.data.contacts[v]['Address']['Line3']);
            $('#contacts-'+tab_id+'-'+'state').val(data.contact.data.contacts[v]['Address']['State']);
            $('#contacts-'+tab_id+'-'+'city').val(data.contact.data.contacts[v]['Address']['City']);
            $('#contacts-'+tab_id+'-'+'country').val(data.contact.data.contacts[v]['Address']['Country']);
            $('#contacts-'+tab_id+'-'+'zipcode').val(data.contact.data.contacts[v]['Address']['ZipCode']);



          });

        }
      }

      $('#modalloadingspinner').remove();

    }
  });

  }


  $('#generalmodal .modal-title').html('Contacts');
  $('#generalmodal .modal-footer .extrabuttons').html('<button type="button" class="btn btn-primary" id="setcontact">Set Contact</button>');
  $('#generalmodal .modal-body').html(contactform);

  $('#generalmodal').modal('show');


   $.each(processing_domains, function(k, v) {
    console.log(v.domain);
    $('#setcontactdomaintable tbody').append('<tr><td>' + v.domain + '</td><td  class="setcontactresult setcontactresult-'+v.domainid+'"></td></tr>');
  });

});


//Modal Button Import
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

//Modal Button Sync
$(document).on("click",'#syncdomains', function(){
  $('#syncdomains').button('loading');
  $('.syncing').html('<fa class="fa fa-spinner fa-spin fa-fw syncloading"></fa> Loading...');
  if (processing_domains.length > 0) {
    asyncSyncXHR(0);
  }

});

//Modal Button Set Contact
$(document).on("click",'#setcontact', function(){

  $('#setcontact').button('loading');
  if ($("#contactform")[0].checkValidity() ){

      $('.setcontactresult').html('<fa class="fa fa-spinner fa-spin fa-fw"></fa>');

      asyncContactXHR(0);

  }else{
      $("#contactform")[0].reportValidity();
      $('#contactform').prepend('<div class="alert alert-danger">Required fields must be filled</div>');
      $('#setcontact').button('reset');
  }



});

//Modal Button Set Nameservers
$(document).on('click', '#setnameservers', function() {

  $('#setnameservers').button('loading');

  $('.setnsresult').html('<fa class="fa fa-spinner fa-spin fa-fw"></fa>');

  asyncLockXHR(0);

});

//Modal Button Set Lock Status
$(document).on('click', '#setlockstatus', function() {

  $('#setlockstatus').button('loading');

  $('.setlockresult').html('<fa class="fa fa-spinner fa-spin fa-fw"></fa>');

  asyncLockXHR(0);

});

//Modal Button Contact Modal Set same with registrar
$(document).on('change', '.makesame', function() {

  $.each($('.makesame'), function(k, v) {

    let tabid = $(v).attr('data-tabid');

    if ($(v).is(':checked')) {
      $('.tabset-' + tabid).addClass('disabled');
      $('.tabset-' + tabid).find('a').attr('data-toggle', 'ssss');
      //$('.form-contact-tab-' + tabid).attr('required', false);
    } else {
      $('.tabset-' + tabid).removeClass('disabled');
      $('.tabset-' + tabid).find('a').attr('data-toggle', 'tab');
      //$('.form-contact-tab-' + tabid).attr('required', 'required');
    }

    $('.tabset-registrant').find('a').click();

  });

});


//Modal Draw Contact Form
function draw_contact_form() {


  let tab_fields = [
    'Registrant',
    'Administrative',
    'Billing',
    'Technical',
  ];

  let tab_inputs = [
     'First Name',
     'Last Name',
     'Company Name',
     'Phone Country Code',
     'Phone',
     'Fax Country Code',
     'Fax',
     'Address 1',
     'Address 2',
     'Address 3',
     'State',
     'City',
     'Country',
     'ZIP Code',
  ];


  let formHtml = '<div id="modalloadingspinner"> <i class="fa fa-spinner fa-spin fa-3x" ></i> </div>';
  formHtml += '<form id="contactform">'
  formHtml += '<input type="hidden" name="action" value="addcontact">';
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
      field_id = field_id.replaceAll(' ', '');

      formHtml += `<label class="col-md-3 control-label" style="padding: 5px;" for="textinput">${input}</label> <div class="col-md-9" style="padding: 5px;"><input type="text" name="contacts[${tab_id}][${field_id}]" id="contacts-${tab_id}-${field_id}" class="form-control form-contact-tab-${tab_id}" ></div> <div class="clearfix"></div>`;
    });
    formHtml += '</div></div>';
  });
  formHtml += '</div> ';

formHtml += '<div class="col-md-4"> ';
formHtml += '<div class="table-container setcstblcontainer"> <table class="table table-striped table-bordered table-hover" id="setcontactdomaintable"> <thead> <tr> <th>Domain(s)</th><th></th> </tr> </thead> <tbody></tbody> </table> </div>';




  tab_fields.forEach((tab, index) => {
    let tab_id = tab.toLowerCase();
    let samewith = index === 0
        ? ''
        : `<br><label class="checkbox-inline" for="checkboxes-${index}"  >  <input type="checkbox" id="checkboxes-${index}" class="makesame" name="makesame[]" value="${tab_id}" data-tabid="${tab_id}">Make ${tab} values same with "Registrant" </label><br>`;
    formHtml += `${samewith} `;
  });

  formHtml += '</div></div>';

  formHtml += '<div class="clearfix"></form>';

  return formHtml;

}

//Modal Draw Import Form
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

//Modal Draw Sync Form
function sync_modal_display(){


  $('#generalmodal').modal('show');
  $('#generalmodal .modal-title').html('Sync');
  $('#generalmodal .modal-footer .extrabuttons').html('<button type="button" class="btn btn-primary" id="syncdomains">Sync</button>');
  $('#generalmodal .modal-body').html('<div class="row"><form id="syncform" class="col-md-12"><div class="alert alert-info">'+window._lang.syncinfo+'</div><div class="portlet light bordered"><div class="portlet-body"><div class="table-container"><table class="table table-striped table-bordered table-hover" id="importtable"><thead><tr><th>Domain</th><th>Sync</th></tr></thead><tbody></tbody></table></div></div><br></div></form></div>');

  $.each(processing_domains, function(k, v) {
    $('#importtable tbody').append('<tr><td>'+v.domain+'</td><td class="syncing syncid-'+v.domainid+'"> </td></tr>')
  });


}

//Modal Draw Set Nameserver Form
function setns_modal_display(){


  $('#generalmodal').modal('show');
  $('#generalmodal .modal-title').html('Set Nameserver');
  $('#generalmodal .modal-footer .extrabuttons').html('<button type="button" class="btn btn-primary" id="setnameservers">Set Nameservers</button>');
  $('#generalmodal .modal-body').html('<div class="row"> <form id="setnsform" class="col-md-12"> <div class="portlet light bordered"> <div class="portlet-body"> <div class="col-md-8"> <div class="table-container"> <table class="table table-striped table-bordered table-hover" id="setnstable"> <thead> <tr> <th></th> <th>NS</th> </tr> </thead> <tbody></tbody> </table> </div> </div>  <div class="col-md-4"> <div class="table-container"> <table class="table table-striped table-bordered table-hover" id="setnsdomaintable"> <thead> <tr> <th>Domain(s)</th><th></th> </tr> </thead> <tbody></tbody> </table> </div> </div> <div class="clearfix"></div> </div> </div> </form></div>');

  $.each([1,2,3,4,5], function(k, v) {
    $('#setnstable tbody').append('<tr><td>NS'+v+'</td><td><input name="ns['+v+']" class="form-control"></td></tr>')
  });

  $.each(processing_domains, function(k, v) {
    $('#setnsdomaintable tbody').append('<tr><td>'+v.domain+'</td><td  class="setnsresult setnsresult-'+v.domainid+'"></td></tr>')
  });


}

//Modal Draw Set Nameserver Form
function setlock_modal_display(){


  $('#generalmodal').modal('show');
  $('#generalmodal .modal-title').html('Set Locks');
  $('#generalmodal .modal-footer .extrabuttons').html('<button type="button" class="btn btn-primary" id="setlockstatus">Set Lock Status</button>');
  $('#generalmodal .modal-body').html('<div class="row"> <form id="setlockform" class="col-md-12"> <div class="portlet light bordered"> <div class="portlet-body"> <div class="col-md-8"> <div class="table-container"> <table class="table table-striped table-bordered table-hover" id="setlocktable"> <thead> <tr><th>Type</th> <th>Lock Status</th> </tr> </thead> <tbody></tbody> </table> </div> </div>  <div class="col-md-4"> <div class="table-container"> <table class="table table-striped table-bordered table-hover" id="setlockdomaintable"> <thead> <tr> <th>Domain(s)</th><th></th> </tr> </thead> <tbody></tbody> </table> </div> </div> <div class="clearfix"></div> </div> </div> </form></div>');


    $('#setlocktable tbody').append('<tr><td>Privacy Protection</td><td><select name="privacy" class="form-control"><option value="enabled">Enabled</option><option value="disabled">Disabled</option></select></td></tr>')

    $('#setlocktable tbody').append('<tr><td>Thieft Protection</td><td><select name="thieft" class="form-control"><option value="enabled">Enabled</option><option value="disabled">Disabled</option></select></td></tr>')


  $.each(processing_domains, function(k, v) {
    $('#setlockdomaintable tbody').append('<tr><td>'+v.domain+'</td><td  class="setlockresult setlockresult-'+v.domainid+'"></td></tr>')
  });


}

//Async Request Sync
function asyncSyncXHR(index) {

  if (index >= processing_domains.length) {
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

      if (data.result == 'success') {
        $('.syncid-' + domain.domainid).html('<fa class="fa fa-check text-success"></fa>');
      } else {
        $('.syncid-' + domain.domainid).html('<fa class="fa fa-times text-danger"></fa> ' + data.message);
      }
      asyncSyncXHR(index + 1);
    },
  });

}

//Async function to set contact
function asyncContactXHR(index) {

  if (index >= processing_domains.length) {
    $('#setcontact').button('reset');
    return;
  }

  const domain = processing_domains[index];
  $.ajax({
    url     : generateUrl('domain.contact','json',{domainid: domain.domainid}),
    type    : 'POST',
    data    : $('#contactform').serializeArray(),
    dataType: 'json',
    success : function(data) {

      if (data.result == 'success') {
        $('.setcontactresult-' + domain.domainid).html('<fa class="fa fa-check text-success"></fa>');
      } else {
        $('.setcontactresult-' + domain.domainid).html('<fa class="fa fa-times text-danger"></fa> ' + data.message);
      }
      asyncContactXHR(index + 1);
    },
  });

}

//Async function to set nameservers
function asyncNSXHR(index) {

  if (index >= processing_domains.length) {
    $('#setnameservers').button('reset');
    return;
  }

  const domain = processing_domains[index];
  $.ajax({
    url     : generateUrl('domain.nameserver','json',{domainid: domain.domainid}),
    type    : 'POST',
    data    : $('#setnsform').serializeArray(),
    dataType: 'json',
    success : function(data) {

      if (data.result == 'success') {
        $('.setnsresult-' + domain.domainid).html('<fa class="fa fa-check text-success"></fa>');
      } else {
        $('.setnsresult-' + domain.domainid).html('<fa class="fa fa-times text-danger"></fa> ' + data.message);
      }
      asyncNSXHR(index + 1);
    },
  });

}

//Async function to set lock status
function asyncLockXHR(index) {

  if (index >= processing_domains.length) {
    $('#setlockstatus').button('reset');
    return;
  }

  const domain = processing_domains[index];
  $.ajax({
    url     : generateUrl('domain.lock','json',{domainid: domain.domainid}),
    type    : 'POST',
    data    : $('#setlockform').serializeArray(),
    dataType: 'json',
    success : function(data) {

      if (data.result == 'success') {
        $('.setlockresult-' + domain.domainid).html('<fa class="fa fa-check text-success"></fa>');
      } else {
        $('.setlockresult-' + domain.domainid).html('<fa class="fa fa-times text-danger"></fa> ' + data.message);
      }
      asyncLockXHR(index + 1);
    },
  });

}

//Display main status message
function message_display(_message, _type) {

  let _alert_id = 'alert-' + Math.floor(Math.random() * 1000000);
  $('#modulebody').prepend('<div id="' + _alert_id + '" class="alert alert-' + _type + '">' + _message + '</div>');

  setTimeout(function() {
    $('#' + _alert_id).fadeOut(500);
  }, 10000);

}






