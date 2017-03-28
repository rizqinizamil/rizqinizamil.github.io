'use strict';

$(document).ready(function () {

	$('.mobile-nav').click(function () {
		$(this).toggleClass('clicked');
		$('.off-canvas').toggleClass('show');
	});

	$('.search-btn').click(function () {
		$('.search-box').addClass('show');
	});

	$(window).click(function () {
		$('.search-box').removeClass('show');
	});

	$('.search-btn').click(function (event) {
		event.stopPropagation();
	});
});

$(window).on('load', function () {
	if (!Modernizr.objectfit) {
		alert('aaa');
		$('.featured-img').each(function () {
			var $container = $(this),
			    imgUrl = $container.find('img').prop('src'),
			    $containerHeight = $container.outerHeight();
			if (imgUrl) {
				$container.css('backgroundImage', 'url(' + imgUrl + ')').addClass('compat-object-fit');
			}
			console.log($containerHeight);
			$container.css('height', $containerHeight);
		});
	}
});