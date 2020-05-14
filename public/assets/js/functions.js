( function( $ ) {

	"use strict";

// *** On ready *** //
	$( document ).on( "ready" , function() {
		responsiveClasses();
		dataCustomOptions();
		fullscreenSection();
		imageBG();
		fitVideos();
		BGVideoYTPlayer();
		lightboxImage();
		lightboxGallery();
		lightboxIframe();
		scrollProgress();
		bannerParallaxImageBG();
		bannerSlider();
		sliderTestimonials();
		sliderImageBG();
		optimizeSliderImageBG();
		scrollTopIcon();
	});

// *** On load *** //
	$( window ).on( "load" , function() {
		parallaxStellar();
	});

// *** On resize *** //
	$( window ).on( "resize" , function() {
		optimizeSliderImageBG();
		responsiveClasses();
		fullscreenSection();
		parallaxStellar();
	});

// *** On scroll *** //
	$( window ).on( "scroll" , function() {
		scrollTopIcon();
		scrollProgress();
	});

// *** On Scroll In On load *** //
	$( window ).on( "load" , function() {
		$( window ).on( "scroll" , function() {

		});
	});


// *** jQuery noConflict *** //
	var $ = jQuery.noConflict();


// *** General Variables *** //
	var $window = $( window ),
		$this = $( this ),
		$body = $( "body" );

// *** Data Custom Options *** //
	function dataCustomOptions(){$("*[data-pattern-overlay-darkness-opacity]").each(function(){var a=$(this).data("pattern-overlay-darkness-opacity");$(this).css("background-color",convertHex("#000000",a))}),$("*[data-pattern-overlay-background-image]").each(function(){"none"==$(this).data("pattern-overlay-background-image")?$(this).css("background-image","none"):"yes"==$(this).data("pattern-overlay-background-image")&&$(this).css("background-image")}),$("*[data-remove-pattern-overlay]").each(function(){"yes"==$(this).data("remove-pattern-overlay")&&$(this).css("background","none")}),$("*[data-bg-color]").each(function(){var a=$(this).data("bg-color");$(this).css("background-color",a)}),$("*[data-bg-color-opacity]").each(function(){var a=$(this).data("bg-color-opacity"),t=$(this).css("background-color").replace("rgb","rgba").replace(")",", "+a+")");$(this).css("background-color",t)}),$("*[data-bg-img]").each(function(){var a=$(this).data("bg-img");$(this).css("background-image","url('"+a+"')")}),$("*[data-parallax-bg-img]").each(function(){var a=$(this).data("parallax-bg-img");$(this).css("background-image","url('./"+a+"')")})}

// Custom banner height
	$( ".banner-parallax" ).each(function() {
		var customBannerHeight = $( this ).data( "banner-height" ),
			boxContent = $( this ).find( ".row > [class*='col-']" );
		$( this ).css( "min-height" , customBannerHeight );
		$( boxContent ).css( "min-height" , customBannerHeight );
	});

	function isURL(url) {
		var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
		return (url.match(p)) ? RegExp.$1 : false;
	}

// Button Download Vídeo
	$(".btn-download").click(function () {

		let url_youtube = $("[name='video']").val();

		if(url_youtube == "" || isURL(url_youtube) == false){
			swal('Ops!', 'Por favor, digite uma URL do Youtube.', 'error');
			return false;
		}





		$('body').loading({
			message: 'Fazendo o Download ...'
		});



		$.ajax({
			url: 'public/assets/php/download.php',
			type: 'GET',
			data: {'url_video': url_youtube},
			success:function(){
				$('body').loading('stop');
				swal('Muito bom!', 'Download realizado com sucesso.', 'success');
				window.location = '/public/assets/php/download.php?url_video='+url_youtube;
			}
		});


	});



// *** Responsive Classes *** //
	function responsiveClasses() {
		var jRes = jRespond([
			{
				label: "smallest",
				enter: 0,
				exit: 479
			},{
				label: "handheld",
				enter: 480,
				exit: 767
			},{
				label: "tablet",
				enter: 768,
				exit: 991
			},{
				label: "laptop",
				enter: 992,
				exit: 1199
			},{
				label: "desktop",
				enter: 1200,
				exit: 10000
			}
		]);
		jRes.addFunc([
			{
				breakpoint: "desktop",
				enter: function() { $body.addClass( "device-lg" ); },
				exit: function() { $body.removeClass( "device-lg" ); }
			},{
				breakpoint: "laptop",
				enter: function() { $body.addClass( "device-md" ); },
				exit: function() { $body.removeClass( "device-md" ); }
			},{
				breakpoint: "tablet",
				enter: function() { $body.addClass( "device-sm" ); },
				exit: function() { $body.removeClass( "device-sm" ); }
			},{
				breakpoint: "handheld",
				enter: function() { $body.addClass( "device-xs" ); },
				exit: function() { $body.removeClass( "device-xs" ); }
			},{
				breakpoint: "smallest",
				enter: function() { $body.addClass( "device-xxs" ); },
				exit: function() { $body.removeClass( "device-xxs" ); }
			}
		]);
	}





// *** Fullscreen Section *** //
	function fullscreenSection() {
		$( ".fullscreen, #home-header, #home-banner" ).css( "height", $( window ).height() );
		$( "#banner.fullscreen" ).css( "height", $( window ).height() );
	}


// *** RTL Case *** //
	var HTMLDir = $( "html" ).css( "direction" ),
		owlRtl;

// If page is RTL
	if ( HTMLDir == "rtl" ) {
		// Owl Carousel
		owlRtl = true
	} else {
		owlRtl = false
	}


// *** Image Background *** //
	function imageBG() {
		$( ".img-bg" ).each(function() {
			var $this = $( this ),
				imgSrc = $this.find( "img" ).attr( "src" );

			if ( $this.parent( ".section-image" ).length ) {
				$this.css( "background-image", "url('" + imgSrc + "')"  );
			} else {
				$this.prepend( "<div class='bg-element'></div>" );
				var bgElement = $this.find( ".bg-element" );
				bgElement.css( "background-image", "url('" + imgSrc + "')"  );
			}
			$this.find( "img" ).css({ "opacity" : 0 , "visibility" : "hidden" });
		});
	}


// *** Stellar Parallax *** //
	function parallaxStellar() {
		$(function() {
			if ( $body.hasClass( "device-lg" ) || $body.hasClass( "device-md" ) || $body.hasClass( "device-sm" ) ) {
				$.stellar({
					horizontalScrolling: false, // don't change this option
					// verticalScrolling: false,
					verticalOffset: 0,
					responsive: true, // false
				});
			}
		});
	}


// *** Fit Videos *** //
	function fitVideos() {
		$( "#full-container" ).fitVids();
	}


// *** Background Videos *** //
	function BGVideoYTPlayer() {
		$(".video-background").each( function() {
			$( this ).YTPlayer({
				mute: false,
				autoPlay: true,
				opacity: 1,
				containment: ".video-background",
				showControls: false,
				startAt: 0,
				addRaster: true,
				showYTLogo: false,
				stopMovieOnBlur: false
			});
		});
	}


// *** Lightbox Iframe *** //
	function lightboxIframe() {
		$( ".lightbox-iframe" ).magnificPopup({
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
	}


// *** Lightbox Image *** //
	function lightboxImage() {
		$( ".lightbox-img" ).magnificPopup({
			type: 'image',
			gallery:{
				enabled: false
			},
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
	}


// *** Lightbox Gallery *** //
	function lightboxGallery() {
		$( ".lightbox-gallery" ).magnificPopup({
			type: 'image',
			gallery:{
				enabled: true
			},
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
	}


// *** Scroll Top Icon *** //
	function scrollTopIcon() {
		var windowScroll = $( window ).scrollTop();
		if ( $( window ).scrollTop() > 800 ) {
			$( ".scroll-top-icon" ).addClass( "show" );
		} else {
			$( ".scroll-top-icon" ).removeClass( "show" );
		}
	}

	$( ".scroll-top" ).on( "click" , function(e) {
		e.preventDefault();
		$( "html, body" ).animate({
			scrollTop: 0
		}, 1200, "easeInOutExpo" ); //1200 easeInOutExpo
	});


// *** Scroll Progress *** //
	function scrollProgress() {
		var docheight = $(document).height();
		var winheight = $(window).height();
		var height = docheight - winheight;
		var scroll = $(document).scrollTop();
		var scrollperc = scroll/(height/100);
		$("#scroll-progress .scroll-progress").width(scrollperc+'%');
		$(".scroll-percent").text(scrollperc.toFixed(0)+'%');
	}


// *** Banner Parallax Image BG *** //
	function bannerParallaxImageBG() {
		var bannerParallax = $( ".banner-parallax" ),
			imgSrc = bannerParallax.children( "img:first-child" ).attr( "src" );

		bannerParallax.prepend( "<div class='bg-element'></div>" );
		var bgElement = bannerParallax.find( "> .bg-element" );
		bgElement.css( "background-image", "url('" + imgSrc + "')"  ).attr( "data-stellar-background-ratio" , 0.2 );
	}


// *** Banner Slider *** //
	function bannerSlider() {
		var bannerSlider = $( ".banner-slider > .owl-carousel" );
		bannerSlider.owlCarousel({
			items: 1,
			rtl: owlRtl,
			autoplay: false,
			autoplaySpeed: 800, // Sliding autoplay speed
			autoplayTimeout: 4000, // Autoplay interval timeout.
			dragEndSpeed: 600, // Sliding speed by mouse drag
			autoplayHoverPause: true, // Stop autoplay on mouse hover
			loop: true,
			slideBy: 1, // Number of item are slided for each one transition
			margin: 10, // space between each item. Very useful!
			stagePadding: 0, // This used to see part of left an right items as preview style
			nav: true, // show prev and next buttons
			dots: true, // Show dots navigation
			navText: ["<i class=\"fa fa-angle-left\"></i>","<i class=\"fa fa-angle-right\"></i>"], // prev and next buttons content
			responsive : {
				0 : {
					// items : 1
				},
				480 : {
					// items : 2
				},
				768 : {
					// items : 3
				}
			},
			autoHeight: true,
			autoWidth: false,
			animateOut: 'owl-fadeUp-out',
			animateIn: 'owl-fadeUp-in',
			navRewind: true,
			center: false, // It's used to make the carousel start from the centered item
			dotsEach: 1, // Number of items per dot
			dotData: false,
			lazyLoad: false, // img tag needs class="owl-lazy" and data-src="url-to-img" or/and data-src-retina="url-to-highres-img"
			smartSpeed: 600, // Sliding speed when hover next or prev nav
			fluidSpeed: 5000,
			navSpeed: 600,
			// fallbackEasing: "ease-in-out",
			dotsSpeed: 600 // Sliding speed by using dots
		});
	}


// *** Slider Image BG *** //
	function sliderImageBG() {
		$( ".slider-img-bg .owl-item > li" ).each( function() {
			var $this = $( this ),
				imgSrc = $this.find( ".slide" ).children( "img" ).attr( "src" );
			$this.prepend( "<div class='bg-element'></div>" );
			var bgElement = $this.find( "> .bg-element" );
			bgElement.css( "background-image", "url('" + imgSrc + "')"  );
		});
	}


// *** Optimize Slider Image BG *** //
	function optimizeSliderImageBG() {
		$( ".slider-img-bg" ).each( function() {
			var imgHeight = $( this ).closest( "div" ).height();

			if ( $( ".banner-parallax" ).children( ".banner-slider" ).length > 0 ) {
				// $( ".banner-parallax, .banner-parallax .row > [class*='col-']" ).height( $( ".banner-slider" ).height() );
			}

			$( this ).find( ".owl-item > li .slide" ).children( "img" ).css({
				"display" : "none",
				"height"  : imgHeight,
				"opacity" : 0
			});
		});
	}


// *** Slider Testimonials *** //
	function sliderTestimonials() {
		var sliderTestimonials = $( ".slider-testimonials > .owl-carousel" );
		sliderTestimonials.owlCarousel({
			// items: 3,
			rtl: owlRtl,
			autoplay: 3000,
			autoplaySpeed: 500, // Sliding autoplay speed
			autoplayTimeout: 5000, // Autoplay interval timeout.
			dragEndSpeed: 400, // Sliding speed by mouse drag
			autoplayHoverPause: true, // Stop autoplay on mouse hover
			loop: true,
			slideBy: 1, // Number of item are slided for each one transition
			margin: 30, // space between each item. Very useful!
			stagePadding: 0, // This used to see part of left an right items as preview style
			nav: false, // show prev and next buttons
			dots: false, // Show dots navigation
			navText: ["<i class=\"fa fa-angle-left\"></i>","<i class=\"fa fa-angle-right\"></i>"], // prev and next buttons content
			responsive : {
				0 : {
					items : 1
				},
				480 : {
					items : 1
				},
				768 : {
					items : 1
				},
				1200 : {
					items : 1
				}
			},
			autoHeight: false,
			autoWidth: false,
			// animateOut: 'goDownOut',
			// animateIn: 'goDownIn',
			navRewind: true,
			center: false, // It's used to make the carousel start from the centered item
			dotsEach: 1, // Number of items per dot
			dotData: false,
			lazyLoad: false, // img tag needs class="owl-lazy" and data-src="url-to-img" or/and data-src-retina="url-to-highres-img"
			smartSpeed: 600, // Sliding speed when hover next or prev nav
			fluidSpeed: 5000,
			navSpeed: 400,
			// fallbackEasing: "ease-in-out",
			dotsSpeed: 400 // Sliding speed by using dots
		});
	}


// *** Popup Preview *** //
	$( ".popup-btn, .popup-bg, .popup-close" ).on( "click" , function( e ) {
		e.preventDefault();
		$( ".popup-preview" ).toggleClass( "viewed" );
		$( "body" ).toggleClass( "scroll-lock" );
	} );


// *** Scroll To *** //
	$(  ".scroll-to" ).on(  "click", function( e ) {
		e.preventDefault();
		var $anchor = $(this);

		// scroll to specific anchor
		$(  "html, body" ).stop().animate({
			scrollTop: $( $anchor.attr( "href" ) ).offset().top
		} , 1200 , "easeInOutExpo" );
	});


} )( jQuery );


function convertHex( hex , opacity ){
	// "use strict";
	// var r, g, b, result;
	hex = hex.replace( '#' , '' );
	r = parseInt( hex.substring( 0 , 2 ) , 16 );
	g = parseInt( hex.substring( 2 , 4 ) , 16 );
	b = parseInt( hex.substring( 4 , 6 ) , 16 );

	result = 'rgba('+r+', '+g+', '+b+', '+opacity+')';
	return result;
}
