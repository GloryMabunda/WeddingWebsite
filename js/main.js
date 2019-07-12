;(function () {

	'use strict';

	// iPad and iPod detection
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) ||
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// animate-box
	var contentWayPoint = function() {

		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this).hasClass('animated') ) {

				$(this.element).addClass('fadeInUp animated');

			}

		} , { offset: '75%' } );

	};


	// Page Nav
	/*
	var clickMenu = function() {

		$('a:not([class="external"])').click(function(event){
			var top_space = 0;

			if ($('#header').length) {
			  top_space = $('#header').outerHeight();

			  if( ! $('#header').hasClass('header-fixed') ) {
				top_space = top_space - 20;
			  }
			}

			var section = $(this).data('nav-section'),
				navbar = $('#navbar');
		    $('html, body').animate({
		        scrollTop: $('[data-section="' + section + '"]').offset().top + 1
		    }, 500);

		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-nav-toggle').removeClass('active');
		    }

		    event.preventDefault();
		    return false;
		});

	};
*/
	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};
	var navigationSection = function() {

		var $section = $('div[data-section]');
		//console.log("Navigate to:	" + $section);

		$section.waypoint(function(direction) {
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));

		  	}
		}, {
		  	offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};


	// Window Scroll
	var windowScroll = function() {
		var lastScrollTop = 0;

		$(window).scroll(function(event){

		   	var header = $('#header'),
				scrlTop = $(this).scrollTop();

			if ( scrlTop > 100 && scrlTop <= 2000 ) {
				header.addClass('header-fixed animated slideInDown');
			} else if ( scrlTop <= 500) {
				if ( header.hasClass('header-fixed') ) {
					header.addClass('header-fixed animated slideOutUp');
					setTimeout(function(){
						header.removeClass('header-fixed animated slideInDown slideOutUp');
					}, 100 );
				}
			}

		});
	};

	// Animations
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});

				}, 50);

			}

		} , { offset: '85%' } );
	};

	// SmoothScroll
	var smoothScroll = function() {
		// Add scrollspy to <body>
		$('body').scrollspy({target: ".navbar", offset: 50});

		// Add smooth scrolling on all links inside the navbar
		$("#nav-menu-container a").on('click', function(event) {
			// Make sure this.hash has a value before overriding default behavior
			if (this.hash !== "") {
				// Prevent default anchor click behavior
				event.preventDefault();

				// Store hash
				var hash = this.hash;

				// Using jQuery's animate() method to add smooth page scroll
				// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
				$('html, body').animate({
					scrollTop: $(hash).offset().top
				}, 800, function(){

					// Add hash (#) to URL when done scrolling (default click behavior)
					window.location.hash = hash;
				});
			}  // End if
		});
	};

	//Countdown
	var countdown = function(){
		// Set the date we're counting down to
			var countDownDate = new Date("Nov 30, 2019 09:00:00").getTime();

			// Update the count down every 1 second
			var x = setInterval(function() {

			// Get todays date and time
			var now = new Date().getTime();

			// Find the distance between now an the count down date
			var distance = countDownDate - now;

			//Get Number of Months
			var mon;
			var d1 = new Date();
			var d2 = new Date("Nov 30, 2019");

			function monthDiff(d1, d2) {

				mon = (d2.getFullYear() - d1.getFullYear()) * 12;
				mon -= d1.getMonth() + 1;
				mon += d2.getMonth();
				return mon <= 0 ? 0 : mon;
			}

			// Time calculations for days, hours, minutes and seconds
			var months = monthDiff(new Date(), new Date(2019, 11, 30));
			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);

			// Display the result in an element with id="demo"
			// document.getElementById("demo").innerHTML = days + "Days " + hours + "Hours "
			// + minutes + "Minutes " + seconds + "Seconds ";

			// Display the result in an element with id="demo"
			document.getElementById("months").innerHTML = months +" <small>months</small>";
			document.getElementById("days").innerHTML = days +" <small>days</small>";
			document.getElementById("hours").innerHTML = hours + " <small>hours</small> ";
			document.getElementById("minutes").innerHTML = minutes + " <small>minutes</small> ";
			document.getElementById("seconds").innerHTML = seconds + " <small>seconds</small> ";

			// If the count down is finished, write some text
			if (distance < 0) {
			 clearInterval(x);
			 document.getElementById("demo").innerHTML = "The Wedding Ceremony is Over";
			}
			}, 1000);
	};

	//Sparkle
	/*var sparkle = function(){
		const app = document.getElementById('apply')

		const myRand = () => {
		let r = 50
		while (40 < r && r < 60) {
		  r = Math.random() * 100
		}
		return r
		}

		for (let i = 0; i < 50; i++) {
		const delay = Math.random() + 's';
		const el = document.createElement('img')
		el.src            = 'https://clipart.info/images/minicovers/1516938335sparkle-png-yellow.png'
		el.className      = 'glitter-star'
		el.style.top      = myRand() + '%'
		el.style.left     = myRand() + '%'
		el.style.animationDelay       = delay
		el.style.msAnimationDelay     = delay
		el.style.webkitAnimationDelay = delay
		el.style.monAnimationDelay    = delay
		app.appendChild(el)
		}
	};*/



	// Document on load.
	$(function(){
		windowScroll();
		navigationSection();
		contentWayPoint();
		smoothScroll();
		countdown();
		isiPhone();
		isiPad();
		//sparkle();
		//clickMenu();
		//navActive();
	});


}());
