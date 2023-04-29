/**
 * Created by PhpStorm.
 * User: bunyaminakcay
 * Project name dna-extended
 * 28.04.2023 21:19
 * Bünyamin AKÇAY <bunyamin@bunyam.in>
 */


$(document).on("click",'#savesettings', function(){

  $('#savesettings').button('loading');

  $.ajax({
    url     : generateUrl('settings','json',{settingaction:'save'}),
    type    : 'POST',
    data    : $('#settingsform').serialize(),
    dataType: 'json',
    success : function(data) {
        $('#savesettings').button('reset');
    }
  });

});


$(document).on("click",'#runmanualcron', function(){

  $('#generalmodal').modal('show');
  $('#generalmodal .modal-title').html('Cron Manual');
  $('#generalmodal .modal-footer .extrabuttons').html('');
  $('#generalmodal .modal-body').html('<div class=" cronresult" style="min-height: 200px;width: 100%;overflow-x: scroll;background-color: lightgray; margin-left: 1px;">  </div>');

  $('.cronresult').append('<li style="color: green;">Manual Run Cron started</li>');
  $('.cronresult').append('<i class="fa fa-cog fa-spin fa-fw"></i>');

  makeSyncRequest()


});

function makeSyncRequest(){


  $.ajax({
    url     : generateUrl('settings','json',{settingaction:'sync'}),
    type    : 'POST',
    data    : [],
    dataType: 'json',
    success : function(data) {

      if(data.result.apiresp=='OK'){

        $('.cronresult').append('<li style="color: green;">Page num:' + data.result.query.PageNumber + ' of request. '+data.result.domaincount+' records processed.</li>');

        if(data.result.domaincount<data.result.query.PageSize) {
          $('.cronresult').append('<li style="color: green;">Manual Run Cron finished <i class="fa fa-check"></i></li>');
          $('.fa-cog').remove();
        }else{
          makeSyncRequest();
        }

      }else{
        $('.cronresult').append('<li style="color: red;">Manual Run Cron failed due to api response</li>')
      }
    },
  });

}

