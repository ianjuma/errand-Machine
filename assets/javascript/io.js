$(function(){
	var menuTrigger = $('#menuTrigger');
	var ioWrapper = $('#ioWrapper');
	var ioMenu = $('#ioMenu');

	menuTrigger.click(function(e){
		classie.toggle(ioWrapper[0], 'show-menu');
		classie.toggle(ioMenu[0], 'show-menu')
	});
});