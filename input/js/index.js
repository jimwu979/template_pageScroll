(function(){
	'use strict';

// global variable
    const global = [];
    global.$fixbox = $('#fixbox');
    global.winW = global.$fixbox.width();
    global.winH = global.$fixbox.height();
    global.$body = $('#body');
    global.page = 0;
    global.scroll_lock = 0;
    global.touch_positionX;
    global.touch_positionY;
    global.touch_distanceY;
    global.new_touch_positionY;
// function
	function init(){
		global.$body.children('section').css('height', global.winH);
	}
	function update_page(direction){
		global.page = global.page + direction;
		if (global.page <= 0)	global.page = 0;
		else if(global.page >= 5) global.page = 5;
	}
	function scroll(){
		var _deltaY;
		var browser = navigator.appVersion.toLowerCase();
		if(browser.indexOf('chrome') == -1 && browser.indexOf('safari') == -1){
			_deltaY = (event.wheelDelta > 0) ? -1 : 1;
		}else{
			_deltaY = Math.sign(event.deltaY);
		}
		if(global.scroll_lock == 0){
			global.scroll_lock = 1;
			click_nextbtn(_deltaY);
			setTimeout(function(){	global.scroll_lock = 0;	}, 1500);
		}
	}
	function touchstart(){
		global.touch_positionX = event.touches[0].clientX;
		global.touch_positionY = event.touches[0].clientY;
	}
	function touchmove(){
		global.new_touch_positionY = event.touches[0].clientY;
		global.touch_distanceY = Math.abs(global.new_touch_positionY - global.touch_positionY);
	}
	function touchend(){
		if(global.touch_distanceY > 90){
			var direction = ((global.new_touch_positionY - global.touch_positionY)<0) ? 1 : -1;
			click_nextbtn(direction);
			if (direction < 0 && global.page == 0) {
				$('header').removeClass('highlight');
			}
		}
	}
	function click_nextbtn(direction){
		var reset_page_check = 1;
		var animation_status = 0;
		var switchPage_delay = 0;
		switch(global.page){
			case 0:
				setTimeout(switchPage_function, 500);
				update_page(direction);
				break;
			case 1:
				if(direction == 1){
					setTimeout(switchPage_function, 500);
					update_page(direction);
				}
				else if(direction == -1){
					update_page(direction);
					setTimeout(switchPage_function, 500);
				}
				break;
			case 2:
				if(direction == 1){
					setTimeout(switchPage_function, 500);
					update_page(direction);
				}
				else if(direction == -1){
					update_page(direction);
					setTimeout(switchPage_function, 500);
				}
				break;
			case 3:
				if (direction == 1){
					switchPage_function();
				}
				else if(direction == -1){
					global.page = global.page - 1;
					switchPage_function();
				}
				break;
		}
	}
	function switchPage_function(scroll_timing){
		global.$body.stop().animate({scrollTop: (global.page * global.winH)}, 500, 'linear');
	}
	function windowResizing(){
		global.winH = global.$fixbox.height();
		global.winW = global.$fixbox.width();
		init();
		switchPage_function(0);
		global.$body.addClass('resizing');
		setTimeout(function(){
			global.$body.removeClass('resizing');
		},500);
	}
// function
	init();
	$(window).resize(windowResizing);
    $('html, body').on('mousewheel', scroll);
    global.$body.on({
        'touchend': touchend,
        'touchmove': touchmove,
        'touchstart': touchstart,
    });
}());