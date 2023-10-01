/**
 * Created by PhpStorm.
 * User: bunyaminakcay
 * Project name dna-extended
 * 28.04.2023 21:19
 * Bünyamin AKÇAY <bunyamin@bunyam.in>
 */

const $saveSettingsBtn = $('#savesettings');
const $settingsForm = $('#settingsform');
const $generalModal = $('#generalmodal');
const $cronResult = $('<div class="cronresult" style="min-height: 200px;width: 100%;overflow-x: scroll;background-color: lightgray; margin-left: 1px;"> </div>');

$(document).on("click",'#savesettings', function(){
    $saveSettingsBtn.button('loading');

  $.ajax({
    url     : generateUrl('settings','json',{settingaction:'save'}),
    type    : 'POST',
        data: $settingsForm.serialize(),
    dataType: 'json',
        success: function() {
            $saveSettingsBtn.button('reset');
    }
  });

});


$(document).on("click",'#runmanualcron', function(){
    showGeneralModal();
    $cronResult.append(`<li style="color: green;">${window._lang.cron_started}</li>`);
    $cronResult.append('<i class="fa fa-cog fa-spin fa-fw"></i>');
    makeSyncRequest();
});

function showGeneralModal() {
    $generalModal.modal('show');
    $generalModal.find('.modal-title').html(window._lang.manually_run_cron);
    $generalModal.find('.modal-footer .extrabuttons').empty();
    $generalModal.find('.modal-body').html($cronResult);
}

function makeSyncRequest(){


  $.ajax({
    url     : generateUrl('settings','json',{settingaction:'sync'}),
    type    : 'POST',
    dataType: 'json',
    success : function(data) {
            if (data.result.apiresp === 'OK') {
                $cronResult.append(`<li style="color: green;">Page num: ${data.result.query.PageNumber} of request. ${data.result.domaincount} records processed.</li>`);

        if(data.result.domaincount<data.result.query.PageSize) {
                    $cronResult.append('<li style="color: green;">Manual Run Cron finished <i class="fa fa-check"></i></li>');
                    $cronResult.find('.fa-cog').remove();
        }else{
          makeSyncRequest();
        }

      }else{
                $cronResult.append('<li style="color: red;">Manual Run Cron failed due to api response</li>');
      }
        }
  });

}

