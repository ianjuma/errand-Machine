$(function(){

  var notMen = $('#notMen'),
    menu = $('#menu'),
    notifications = $('#notifications'),
    notMenTrigger = $('.notMenTrigger'),
    notMenClose = $('.notMenClose'),
    unpaidTask = $('.unpaid-button').parent(),
    rateMetre = $('.ratemetre'),
    rateZero = $('.ratezero');

  notMenTrigger.on('click', function(e){
    show = e.target.parentElement.dataset.show;
    switch(show){
      case 'menu':
        notifications.hide();
        menu.show();
        break;
      case 'notifications':
        notifications.show();
        menu.hide();
        break;
      default:
        notifications.hide();
        menu.show();
    }
    $(notMen[0]).addClass('show');
  });

  notMenClose.on('click', function(e){
    $(notMen[0]).removeClass('show');
  });

  var rateValue = 0;

  rateMetre.on('click', function(e){
    rateValue = e.target.dataset.rate;
    //Trigger rate request from here, send the rateValue.
  });

  rateMetre.on('mouseenter', function(e){
    $(e.target).removeClass('fa-star-o').addClass('fa-star live');
    $(e.target).prevAll().removeClass('fa-star-o').addClass('fa-star live');
    $(e.target).nextAll().removeClass('fa-star live').addClass('fa-star-o');
  });

  rateMetre.on('mouseleave', function(){
    if(rateValue == 0){
      rateMetre.removeClass('fa-star live').addClass('fa-star-o');
    }else{
      rateMetre.removeClass('fa-star live').addClass('fa-star-o');
      for(i = 0; i < rateValue; i++){
        $(rateMetre[i]).removeClass('fa-star-o').addClass('fa-star live');
      }
    }
  });

  rateZero.on('mouseenter click', function(e){
    $(e.target).nextAll().removeClass('fa-star live').addClass('fa-star-o');
    rateValue = e.target.dataset.rate;
  });



});