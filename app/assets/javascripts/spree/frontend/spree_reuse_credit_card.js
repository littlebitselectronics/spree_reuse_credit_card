//= require jquery.alerts/jquery.alerts
//= require_self

var creditCardDeleteCallback=$.noop();

function displayCreditCardDeleteStatus(notice) {
  notice_div = $('.flash.notice');

  if (notice) {
    if (notice_div.length > 0) {
      notice_div.html(notice);
      notice_div.show();
    } else {
      $("#card_notice").html(notice + '<span class="close">X</span>');
    }
    $("#card_notice").removeClass('hidden')
  }

  creditCardDeleteCallback();
}


function paymentPageResetCreditCardOptions() {
  // if we don't do this, we'll accidentally submit our 'use existing'
  // id and we won't use a new card
  $("#existing_cards input[type=radio]:checked:hidden").removeAttr('checked');

  // if we select a card, we enable the continue button, but if we then
  // delete it, we need to restore the button back to it's disabled state
  // did we just delete the last card?
  if ($('#existing_cards > div:visible').length == 0) {
    $('#card_options').hide();
    // 'new card'is our only option now
    $('#use_existing_card_no').click();
    // restoreContinueButton();
  } else {
    useExistingCardsInit();
  }
}

$(document).on('click', '#use_existing_card_no', function () {
  $('#credit-card-form').show();

  restoreContinueButton();

  // if we don't do this, we'll accidentally submit our 'use existing'
  // id and we won't use a new card
  $("#existing_cards input[type=radio]:checked").removeAttr('checked');

});

$(document).on('click', '#existing_cards input[type=radio]', function () {
  useExistingCardsInit();
  $("#use_existing_card_no").removeAttr('checked');
});

$(document).on('change', 'input[type=radio][name=existing_card]',function () {
  if ($(this).is(':checked')) {
    restoreContinueButton();
  }
});

function restoreContinueButton() {
  $(".form-buttons input[type=submit]").attr('disabled',false);
    $(".form-buttons input[type=submit]").val('Place Order');
}

function useExistingCardsInit() {
  $('#credit-card-form').hide();

  $('#use_existing_card_no').removeAttr('checked');

  disableContinueButton();
}

function disableContinueButton() {
  if ($("#existing_cards input[type=radio]:checked").length == 0) {
    // temporarily rename & disable the save button if no cards are selected
    $(".form-buttons input[type=submit]").attr('disabled',true);
    $(".form-buttons input[type=submit]").val('Please Select a Card to Use');
  }
}

$(document).on('click', 'span.close', function() {
  $(this).parent().addClass('hidden');
});
