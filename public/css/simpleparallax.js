/*
Plugin: simpleParallax
Version 1.0
Author: François Barrailla
Twitter: @fransbar
Author URL: http://francoisbarrailla.com
Plugin URL: http://francoisbarrailla.com/resources/simpleparallax

license: http://www.wtfpl.net
*/

(function( $ ){

	var $window = $(window),
		windowHeight = $window.height(),
		scrollTop = $window.scrollTop();

	$window.on('resize', function(){
		windowHeight = $window.height();
		scrollTop = $window.scrollTop(); // usefull for responsive design
	});

	$window.on('scroll', function(){
		scrollTop = $window.scrollTop();
	});

	function bgSize(url, cb){
		$('<img />')
			.on('load', function(){ cb(this.width, this.height); })
			.attr('src', url)
			.error(function(){ throw "$.simpleParallax : fail to load the image " + url; });
	}

	function isElVisible($el){
		var above = $el.offset().top - scrollTop + $el.height() < 0;
		var below = $el.offset().top > windowHeight + scrollTop;
		return !above && !below;
	}

	function doParallax($el, dimensions, direction){
		if (isElVisible($el)) {			
			var bgHeight, elWidth = $el.width(), elHeight = $el.height();

			if ($el.css('background-size') === 'cover') {
				var ratio = elWidth / dimensions.width;
				bgHeight = dimensions.height * ratio;
			} else {
				bgHeight = dimensions.height;
			}

			var position = elHeight + $el.offset().top - scrollTop,
				progression = (windowHeight + elHeight - position) / (windowHeight + elHeight),
				sp = bgHeight - elHeight,
				offset = (direction === 'down') ? (sp * progression + elHeight) - bgHeight : -(sp * progression);

			$el.css('background-position', '50% ' + offset + 'px');
		}
	}

	$.fn.simpleParallax = function(opts) {

		var opts = $.extend($.fn.simpleParallax.defaults, opts);

		return this.each(function(){		

			try {	
			
				var $this = $(this),				
					options = $.extend({}, opts, $this.data()), // override with data attributes options
					imgUrl;

				// options control
				if (options.dir !== 'up' && options.dir !== 'down') {
					throw "wrong direction (dir) option setted (must be \"up\" or \"down\")";
				}

				// retrieve background image
				// from css or attribute [data-bgi]
				if ($this.data('bgi')){
					imgUrl = $this.data('bgi');
					$this.css('backgroundImage', 'url('+$this.data('bgi')+')');
				} else {
					var extr = $this.css('background-image').match(/^url\("?(.+?)"?\)$/);
					if (!extr || extr.length < 1) {
						throw "impossible to extract background-image of element "+this.toString();
					}
					imgUrl = extr[1];
				}

				bgSize(imgUrl, function(w, h){
					$window.on('scroll', function(){
						doParallax($this, {width:w, height:h}, options.dir);
					});
					doParallax($this, {width:w, height:h}, options.dir);
				});

			} catch (m) {
				console.error("$.simpleParallax : " + m);
			}
		});
		
	};

	$.fn.simpleParallax.defaults = {
		dir : "down"
	};
})(jQuery);