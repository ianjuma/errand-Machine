$(function(){

	var menuTrigger = $('#menuTrigger');
	var ioWrapper = $('#ioWrapper');
	var ioMenu = $('#ioMenu');
	menuTrigger.click(function(e){
		classie.toggle(ioWrapper[0], 'show-menu');
		classie.toggle(ioMenu[0], 'show-menu');
	});

	var interestSelect = $('.cover');
	var interestDone = $('#interestDone');
	interestSelect.click(function(e){
		classie.toggle(e.target.children[1].children[0], 'show');
		classie.toggle(e.target.previousElementSibling, 'show');
		classie.toggle(e.target, 'selected');
	});
	interestDone.click(function(e){
		selectedInterests = [];
		elements = $('.cover.selected');
		$(elements).each(function(i){
			selectedInterests.push(elements[i].dataset.id);
		});
		console.log(selectedInterests.length+" interests selected - "+ selectedInterests);
	});

	var openaccountOptions = $('#openaccountOptions');
	var accountOptions = $('#accountOptions');
	var closeaccountOptions = $('#closeaccountOptions');
	$(openaccountOptions).on('click', function(e){
		classie.toggle(accountOptions[0], 'active');
	});
	$(closeaccountOptions).on('click', function(e){
		classie.remove(accountOptions[0], 'active');
	});
});