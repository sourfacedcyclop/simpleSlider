/*
Author : Thomas Scheuneman
Name : simpleSLider
Version : 1.01
Author Site : http://tswebvisions.com
*/
(function( $ ){
"use strict";
    $.fn.simpleSlider = function(options) {
	//Our defalut options
    var defaults = {
		fadeTime: 500,
		autoplay: true,
		container: this,
		navContainer: null,
		wantNav: false,
		next: "#simpleSliderNext",
		previous: "#simpleSliderPrevious",
		interval: 10000,
		pauseOnHover: false,
		keyboardNav: false
	};
	var settings = $.extend(defaults, options); 
	return this.each(function() {
		//Set our variables for slides, our timeout, amount, and our counter
        var slides, amount, counter;
		
		/*
		Function for running our animation forward, this is engaed on the next slide button, 
		and on the natural continuation of all other slider actions
		*/
        function fadeForward() {
			//Clear any timeout(s)
			timeOut.end()
			//fadeout current slide
            $(slides[counter]).stop(false, true).fadeOut(settings.fadeTime);
			//add to counter
            counter++;
			//if counter has reached end, start over
            if (counter >= amount) {
				counter = 0;
			}
			//fadein new slide
            $(slides[counter]).stop(false, true).fadeIn(settings.fadeTime);
			//update progess bar and continue loop
			//If we have gone fullcircle, make the right element is removed if the user wants to use the nav
			if(settings.wantNav) {
				if(counter == 0) {
					$(sliderNavButtons[amount - 1]).removeClass("active");		
				}
				$(sliderNavButtons[counter - 1]).removeClass("active");
				$(sliderNavButtons[counter]).addClass("active");
			}
			timeOut.next();
        }
		//Function for previous button click.
        function fadeBack() {
			timeOut.end();
			//fadeout current slide
            $(slides[counter]).stop(false, true).fadeOut(settings.fadeTime);
			//subtract from counter
            counter--;
			//if counter has reached end, start over
            if (counter <= -1){
				counter = amount - 1;
			}
			//update progess bar and continue loop
            $(slides[counter]).stop(false, true).fadeIn(settings.fadeTime);
            //update progess bar and continue loop
			timeOut.next();
			//If we have gone fullcircle, make sure the right element is removed if the user wants to use the nav
			if(settings.wantNav) {
				if(counter == amount - 1) {
					$(sliderNavButtons[0]).removeClass("active");		
				}
				$(sliderNavButtons[counter + 1]).removeClass("active");
				$(sliderNavButtons[counter]).addClass("active");
			}
        }
		//Function for a timer
		function Timer(callback, delay) {
			//Create variables
			var timer, start, remainingTime = delay;
			//Create pause function
			this.pause = function() {
				window.clearTimeout(timer);
				remainingTime -= new Date() - start;
			};
			//Create resume function
			this.resume = function() {
			if(settings.autoplay) {
					start = new Date();
					timer = window.setTimeout(callback, remainingTime);
				}
			};
			//Clear timer function
			this.end = function() {
				window.clearTimeout(timer)
			};
			//Next slide function
			this.next = function() {
				if(settings.autoplay) {
					timer = window.setTimeout(callback, delay);
					remainingTime = delay;
					start = new Date();
				}
			};
			this.resume();
		}
		//If the user wants sliders to pause on their hover
		if(settings.pauseOnHover) {
			jQuery(settings.container).children().on(
			{
				//On mouseenter object, pause
				mouseenter: function() {
					timeOut.pause();
				},
				//On mouseleave object resume.
				mouseleave: function() {
					timeOut.resume();
				}
			});
		}
		//For Keyinput
		if(settings.keyboardNav) {
			jQuery(document.documentElement).keydown(function(event) {
				//If back arrow, fadeBack
				if(event.keyCode == 37) {
					fadeBack();
				}
				//If forward arrow, fade forward.
				if(event.keyCode == 39) {
					fadeForward();
				}
			});
		}
		//On next button click, go forward
		jQuery(settings.next).click(function() {
			fadeForward();
		});

		//On previouys button click, for backeards
		jQuery(settings.previous).click(function() {
			fadeBack();
		});
		//On the nav button click
		jQuery(document).on('click', '.simpleSliderNavItem', function() {
		//Find which button has been clicked
			var id = $(this).index();
			//Reset timer
			timeOut.end();
			//Remove previous slide highlight and add for current slide if the user wants to use the nav
			if(settings.wantNav) {
				$(sliderNavButtons[counter]).removeClass("active");
				$(sliderNavButtons[id]).addClass("active");
			}
			//fadeout current slide
            $(slides[counter]).stop(false, true).fadeOut(settings.fadeTime);
			//the counter now equals the current slide
            counter = id;
			//if counter has reached end, start over
            if (counter <= -1){
				counter = amount - 1;
			}
			//update progess bar and continue loop
            $(slides[id]).stop(false, true).fadeIn(settings.fadeTime);

            //update progess bar and continue loop
			timeOut.next();
						//If we have gone fullcircle, make the right element is removed if the user wants to use the nav
			if(settings.wantNav) {
				if(counter == amount - 1) {
					$(sliderNavButtons[0]).removeClass("active");		
				}
			}
		});
		//Function to create our navigation
		function circularNav() {
			var itemNav = '';
			var nav = '';
			for (var x = 0; x < amount; x++) {
				itemNav += '<div class="simpleSliderNavItem"></div> ';
			}
			jQuery(settings.navContainer).append('<div id="simpleSliderNav">' + itemNav + '</div>');
		}
		//Get slides
        slides = $(settings.container).children();
		//Get the number of slides and the counter counter
        amount = slides.length;
        counter=0;
		//If the user wants to add the navigation
		if(settings.wantNav) {
			//Create the naviagtion
			circularNav();
			//Get the navigation info
			var sliderNavButtons = $('#simpleSliderNav').children();
			//Add active class to current slide
			$(sliderNavButtons[counter]).addClass("active");
		}
        // Set our timeout to move along the content

			var timeOut = new Timer(fadeForward, settings.interval);
		});
    };
})(jQuery);
// <x\\>