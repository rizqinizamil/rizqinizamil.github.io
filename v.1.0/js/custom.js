$ = jQuery.noConflict();

$(window).load(function() {
	//$("#loading").fadeOut();
	$('.inner .ninjashead__eye__left, .inner .ninjashead__eye__right, .ninjashead__eye__left, .ninjashead__eye__right').removeClass('think');
	$("#skrollr-body").css({
		"height": $(window).outerHeight(),
		"overflow": "hidden"
	});
	if($("#loading").fadeOut()){
	 $("#skrollr-body").addClass("auto");
	}
});

// set min-height
var $wheight = $(window).outerHeight();
$('.inner').css('height', $wheight);
$('.letsplay').css('height', $wheight);

$(window).resize(function() {
	var $wheight = $(window).outerHeight();
	var $skrlrHeight = $('#skrollr-body').height();
    $('.letsplay').css('height', $wheight);
    $('.inner').css('height', $wheight);
    //$('.portfolio-details').css('height', $skrlrHeight);
    //alert($wheight);
});

jQuery(document).ready(function () {
	$nav = $('#hey, .anchor-link');
	$nav.onePageNav({
		easing: 'easeInOutQuart',
		begin: function() {
        	$nav.removeClass('current');
        	//Hack so you can click other menu items after the initial click
	        $('body').append('<div id="device-dummy" style="height: 1px;"></div>');
		    },
	    end: function() {
	        $nav.removeClass('current');
	        $('#device-dummy').remove();
	    },
	    scrollChange: function($currentListItem) {
	        $nav.removeClass('current');
	    }
	});

	// Grayscale Loop
	var $random = $(".home .random, .portfolio .random");
	(function toggleMouth(){
	    $random.toggleClass("grayscale-jq");
	    setTimeout(function(){
	        toggleMouth();
	    },12000)
	})()

	//$( "#portfolio" ).append( "<div class='portfoliobg'></div>");

	// random bg image
    var bgImages = "http://rizqi.im/v.1.0/images/bg-1.jpg http://rizqi.im/v.1.0/images/bg-4.jpg".split(' ');
    var image = bgImages[Math.floor(Math.random() * bgImages.length)];
    $('.image, .portfoliobg, footer, .blurbg').css('background-image', 'url("' + image + '")');

    /*
	if (Modernizr.mq('only screen and (min-width: 1031px)')==true) { 
		
		skrollr.init({
			forceHeight: false
		});


		var $skrlrHeight = $('#skrollr-body').height();
		//$('.portfolio-details').css('height', $skrlrHeight);
	}

	if (Modernizr.mq('only screen and (max-width: 1030px)')==true) { 
		var $skrlrHeight = $('#skrollr-body').height();
		//$('.portfolio-details').css('height', $skrlrHeight);
	}

	if (Modernizr.mq('only screen and (max-width: 1024px)')==true) {
		$('.macbook').bind('touchstart', function(e) {
		//$('.macbook').click(function(e) {
	        e.preventDefault();
	        $(this).toggleClass('hover');
	    });
	}
	*/

	//Notes hole's height
	var viewportHeight = $(window).height();
	$('.notes .hole').css('height', viewportHeight);

	// Notes image set height 27n
	$('.post p img').each(function() {
		var h = $(this).outerHeight();
		var f = Math.floor(h/32);
		var nh = f * 32;
		$(this).css('height', nh);
		//alert(nh);
	});

	// Pre set height 27n - 2 
	$('.post pre').each(function() {
		var h = $(this).outerHeight();
		var f = Math.floor(h/32);
		var nh = (f * 32);
		$(this).css('height', nh);
		//alert(nh);
	});

	// Heading manipulation
	$( '.notes h1, .notes h2, .notes h3, .notes h4, .notes h5' ).wrapInner( "<span></span>" );

	// Fixed latest post
	/*$(window).scroll( function() {
	    var value = $(this).scrollTop();
	    if ( value > viewportHeight ){
	        $(".fixed-recentBlog").fadeIn('fast');
	    }else{
	        $(".fixed-recentBlog").fadeOut('fast');
	    }
	});*/

	$(function() {
    $.fn.scrollBottom = function() {
        return $(document).height() - this.scrollTop() - this.height();
    };

    var $el = $('.fixed-recentBlog, .fixed-upto');
    var $window = $(window);

    $window.bind("scroll resize", function() {
        var gap = $window.height() - $el.height() - 10;
        var footerHeight = $('footer').outerHeight() + 50;
        var visibleFoot = footerHeight - $window.scrollBottom();
        var scrollTop = $window.scrollTop();

        
	    if ( scrollTop > viewportHeight ){
	        $el.fadeIn('fast');
	    }else{
	        $el.fadeOut('fast');
	    }
        
        if(scrollTop < footerHeight + 10){
            $el.css({
                top: (footerHeight - scrollTop) + "px",
                bottom: "auto"
            });
        }else if (visibleFoot > gap) {
            $el.css({
                top: "auto",
                bottom: visibleFoot + "px"
            });
        } else {
            $el.css({
                top: 0,
                bottom: "auto"
            });
        }
    });
});
	
});