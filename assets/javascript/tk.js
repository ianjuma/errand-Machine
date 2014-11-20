$(function(){

	var notMen = $('#notMen'),
		menu = $('#menu'),
		notifications = $('#notifications'),
		notMenTrigger = $('.notMenTrigger'),
		notMenClose = $('.notMenClose'),
		unpaidTask = $('.unpaid-button').parent(),
		cTaskInput = $('.ctask-input'),
		cTaskUrgent = $('.ctask-urgent'),
		rateMetre = $('.ratemetre'),
		rateZero = $('.ratezero'),
		updateSettings = $('.update-settings'),
		cancelSettings = $('.cancel-settings');

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

	unpaidTask.on('mouseenter', function(e){
		$(e.target.children[0].firstChild).removeClass('fa-times-circle').addClass('fa-check-circle');
		e.target.children[0].childNodes[1].nodeValue = 'Pay now - ';
	});

	unpaidTask.on('mouseleave', function(e){
		$(e.target.children[0].firstChild).removeClass('fa-check-circle').addClass('fa-times-circle');
		e.target.children[0].childNodes[1].nodeValue = 'Unpaid - ';
	});

	cTaskInput.on('focus blur',function(e){
		$(e.target.parentElement.parentElement.children[1]).toggleClass('live');
	});

	cTaskUrgent.on('change', function(e){
		$(e.target.parentElement.previousElementSibling).toggleClass('live');
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

	updateSettings.on('click', function(e){
		update = e.target.dataset.update;
		switch(update){
			case 'email':
				$(e.target).nextAll().addClass('live');
				$(e.target).siblings('.email-form').children('.ifirst').focus();
				$(e.target).addClass('off');
			break;
			case 'password':
				$(e.target).parent().addClass('live');
				$(e.target).nextAll().addClass('live');
				$(e.target).siblings('.input').children('.ifirst').focus();
				$(e.target).text('Save');
			break;
			default:
				$(e.target).nextAll().addClass('live');
				$(e.target).siblings('.ifirst').focus();
				$(e.target).text('Save');
		}
	});

	cancelSettings.on('click', function(e){
		cancel = e.target.dataset.cancel;
		switch(cancel){
			case 'email':
				$(e.target).siblings('.email-form').children('.ifirst').blur();
				$(e.target).siblings('.email-form').removeClass('live');
				$(e.target).siblings('.update').removeClass('off');
				$(e.target).removeClass('live');
			break;
			case 'password':
				$(e.target).parent().removeClass('live');
				$(e.target).siblings('.update').text('Update');
				$(e.target).removeClass('live');
				$(e.target).siblings('.input').children('.ifirst').blur();
				$(e.target).siblings('.input').children().val('');
			break;
			default:
				$(e.target).siblings('.ifirst').blur().removeClass('live');
				$(e.target).siblings('.update').text('Update');
				$(e.target).removeClass('live');
		}
	});

    

});