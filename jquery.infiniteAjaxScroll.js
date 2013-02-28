/*!
 * jQuery 'best options' plugin boilerplate
 * Author: @cowboy
 * Further changes: @addyosmani
 * Licensed under the MIT license
 */
 
 
// console.log(event);
//
// Если (координата верхней границы кнопки - K * высоту вьюпорта)* коэфициент А
// Где коэфициент A всегда равен 1, а если ширина < высоты, то А=1.6
// Выше (значит координаты меньше) чем текущая координата верхней границы пользовательского вьюпорта,
// то подгружаем контент.
// Профит
//
 
 
function ajaxLoad ($elem, o) {
  console.log('ajaxLoad');
	$elem.data('loadinprogress', true);
	var linkText = $elem.text();
	// replace button text with ‘loading’
	$elem.text('Loading');
 
 
	// load materals
	// from o.page url
	$.ajax({
		url: o.url+'&'+'page='+o.page
	})
	.done(function(data) {
 
		// console.log(data);
		// append response to wrap
		$(o.wrap).append(data);
		
		// replace text to first
		
		o.page++;
 
		$elem.data('infiniteajaxscroll', o);
		console.log($elem.data('infiniteajaxscroll'));
		$elem.text(linkText);
		
		$elem.data('loadinprogress', false);
	});
}
 
 
;(function ( $, window, document, undefined ) {
 
	$.fn.infiniteAjaxScroll = function ( custom_options ) {
 
		options = $.extend( {}, $.fn.infiniteAjaxScroll.options, custom_options );
 
		return this.each(
			function () {
 
				var $elem = $(this);
 
				console.log('$elem', $elem);
				console.log('data', $elem.data('infiniteajaxscroll'));
				console.log('options', options);
				
 
				var o = $.extend( {}, options, $elem.data('infiniteajaxscroll') );
 
				console.log(o);
 
				$elem.data('loadinprogress', false);
				
				$(window).on('scroll resize', function (event) {
 
					var viewport = {
							height : $(window).height(),
							width  : $(window).width()
						},
						buttonTop = $elem.offset().top,
						userTop   = $(document).scrollTop(),
						// for long tablets or iphones
						A = (viewport.width < viewport.height) ? 1.5 : 1,
						K = o.k;
					
					if ( (buttonTop - K*viewport.height)*A < userTop ) {
						console.log('ajax');
						$(window).trigger('needAjaxLoad');
					} else {
						console.log('no');
					}
					
				});
 
 
				$(window).on('needAjaxLoad', function (event) {
 
					if (!$elem.data('loadinprogress'))  {
						ajaxLoad($elem, o);
					}
					
 
					if (event.type === 'click') {
						event.preventDefault();
					}
				});
 
	
			}
		);
	};
 
	// defaults
	$.fn.infiniteAjaxScroll.options = {
		"wrap": ".js_album_reports_wrap",
		"url" : "main_albums.html?sort=top&amp;type=album",
		"k"   : 2,
		"page": 2
	};
	
 
	(function () {
		var a = $('.js_infiniteAjaxScroll');
		if (!a[0]) return -1;
		a.infiniteAjaxScroll();
	})();
 
})( jQuery, window, document );
