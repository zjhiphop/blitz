/*
 * jDropDown
 * http://do-web.com/jdropdown/overview
 *
 * Copyright 2011, Miriam Zusin
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://do-web.com/jdropdown/license
 */
(function($){
   $.fn.jDropDown = function(options){
	   
	var options = $.extend({
		selected: 0,
		callback: ""
	},options);

	return this.each(function() {            
		var hndl = this;
		
		$(this).addClass("jDropDown");
		this.ul = $(this).find("ul");
		this.li_list = this.ul.find("li");
		this.div = $(this).find("div");
		this.par = $(this).find("p");
		
		//init
		this.par.text(this.ul.find("li:eq(" + options.selected + ")").text());
		
		this.close = function(){
			hndl.ul.hide();
		};
				
		//click
		this.div.click(function(e){
			e.stopPropagation();
			if(hndl.ul.is(":visible")){
				hndl.close();
			}
			else{
				hndl.ul.show();				
			}
		});
		
		this.li_list.click(function(){
		
			var index = $(this).index();
			var val = $(this).text();
			
			hndl.par.text(val);
			hndl.close();
			
			if($.isFunction(options.callback)){				
				options.callback(index, val);
			}	
		});
		
		$(document).click(function(){
			hndl.close();
		});
		
	});    
   };
})(jQuery);