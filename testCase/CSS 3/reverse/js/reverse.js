$(document).ready(function() {
	$.util$.loadTemplate($('#container'),'./tpl/reverse.tpl')
    var content = $('.content');
    $('#trigger').live('click', function() {
        $(this).toggle(function() {
            $(this).text('hide follow!');
            content.removeClass('reverse').addClass('running');
        }, function() {
             $(this).text('follow me!');
            content.removeClass('running').addClass('reverse');
        }).trigger('click');
    });
    
});