jQuery(document).ready(function($) {
// Mobile Navigation

	//Hide Navigation on Load
	$('#header').hide();
	/*$('#mobile-nav-toggle').show();*/

  // Header fixed
  $(window).scroll(function() {
    if ($(this).scrollTop() > 350) {
			$('#header').show();
			$('#header').addClass('header-fixed');
  	  $('#header').removeClass('header-default');
			$('#nav-menu-container').addClass('nav-menu-fixed');
  	  $('#nav-menu-container').removeClass('nav-menu-default');
			//$('#mobile-nav-toggle').show();
			/*$('#mobile-nav-toggle').show();
      $('#header').addClass('header-fixed');
  	  $('#header').removeClass('header-default');

  	  $('#mobile-nav-toggle').addClass('toggle-fixed');
  	  $('#mobile-nav-toggle').removeClass('toggle-default');
      //nav-menu-container
      $('#nav-menu-container').addClass('nav-menu-fixed');
  	  $('#nav-menu-container').removeClass('nav-menu-default');*/
    } else {
			$('#header').hide();
			$('#header').addClass('header-default');
  	  $('#header').removeClass('header-fixed');
			$('#nav-menu-container').removeClass('nav-menu-default');
  	  $('#nav-menu-container').addClass('nav-menu-fixed');
			/*$('#mobile-nav-toggle').show();
			$('#header').addClass('header-fixed');
			$('#header').removeClass('header-default');;

			$('#mobile-nav-toggle').removeClass('toggle-default');
  	  $('#mobile-nav-toggle').addClass('toggle-fixed');
      //nav-menu-container
      $('#nav-menu-container').removeClass('nav-menu-default');
  	  $('#nav-menu-container').addClass('nav-menu-fixed');*/
    }
  });

  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle" class="toggle-fixed"><i id="toggle" class="fa fa-bars toggle-fixed"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i id="toggle" class="fa fa-chevron-down toggle-fixed"></i>');

    //added
    //added end

    $(document).on('click', '.menu-has-children i', function(e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

});
