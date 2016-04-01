var coms = [];
$('#dropdown').find('li>a').each(function() {
	var val = typeof $(this).attr('data-filter') != 'undefined' ? $(this).attr('data-filter') : $(this).html();
	var disp = $(this).html();
	coms.push({name: disp, value: val});	
})
