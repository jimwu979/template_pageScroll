(function(){
	'use strict';

// global variable
	var win = $(window);
	var _body = $('#body');
	var _header = $('header');
	var _fixbox = $('#fixbox');
	var _section_1 = $('#section_1');
	var _section_2 = $('#section_2');
	var _section_3 = $('#section_3');
	var _section_4 = $('#section_4');
	var winW = _fixbox.width();
	var winH = _fixbox.height();

	var page = 0;
	var scroll_lock = 0;
	var touch_positionX;
	var touch_positionY;
	var touch_distanceY;
	var prev_scrollTop = 0;
	var new_touch_positionY;
// function
	function init(){
		_body.children('section').css('height', winH);
	}
	function update_page(direction){
		page = page + direction;
		if (page <= 0)	page = 0;
		else if(page >= 5) page = 5;
	}
	function scroll(){
		var _deltaY;
		var browser = navigator.appVersion.toLowerCase();
		if(browser.indexOf('chrome') == -1 && browser.indexOf('safari') == -1){
			_deltaY = (event.wheelDelta > 0) ? -1 : 1;
		}else{
			_deltaY = Math.sign(event.deltaY);
		}
		if(scroll_lock == 0){
			scroll_lock = 1;
			click_nextbtn(_deltaY);
			setTimeout(function(){	scroll_lock = 0;	}, 1500);
		}
	}
	function touchstart(){
		touch_positionX = event.touches[0].clientX;
		touch_positionY = event.touches[0].clientY;
	}
	function touchmove(){
		new_touch_positionY = event.touches[0].clientY;
		touch_distanceY = Math.abs(new_touch_positionY - touch_positionY);
	}
	function touchend(){
		if(touch_distanceY > 90){
			var direction = ((new_touch_positionY - touch_positionY)<0) ? 1 : -1;
			click_nextbtn(direction);
			if (direction < 0 && page == 0) {
				_header.removeClass('highlight');
			}
		}
	}
	function click_nextbtn(direction){
		var reset_page_check = 1;
		var animation_status = 0;
		var switchPage_delay = 0;
		switch(page){
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
					page = page - 1;
					switchPage_function();
				}
				break;
		}
	}
	function switchPage_function(scroll_timing){
		console.log(page);
		console.log(winH);
		_body.stop().animate({scrollTop: (page * winH)}, 500, 'linear');
	}
	function windowResizing(){
		winH = _fixbox.height();
		winW = _fixbox.width();
		init();
		switchPage_function(0);
		_body.addClass('resizing');
		setTimeout(function(){
			_body.removeClass('resizing');
		},500);
	}
// function
	init();
	$(window).resize(windowResizing);
	$('html, body').on('mousewheel', scroll);
	_body.on('touchend', touchend);
	_body.on('touchmove', touchmove);
	_body.on('touchstart', touchstart);
}());