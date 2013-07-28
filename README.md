#SimpleSlider

###A really simple, JQuery slider  

SimpleSlider gives some options to best customize its effects to the specific usage.  

**fadeTime** is the amount of time each slide will take to fade away, and fade into being.  The assigned value should be how many milliseconds you wish for it to take.  The default value is 500, or half a second.

**interval** is the amount of time each slide will stay on the screen before the slider will move to the next slider.  This value is represented in milliseconds and the default is 10000, or 10 seconds.

**autoplay** is a Boolean that does as it sounds, sets the slider to autoplay.  Default value is true.

**wantNav** is a Boolean that enables or disables slider navigation.  The default is set to true.  This navigation is formatted as…
<div id=”simpleSLiderNav”>
	<div class=”simpleSliderNavItem”> </div>
</div>
Where a simpleSliderNavItem element is created for every slide.  You can formatted this however you wish in CSS.

**navContainer** is the element that the navigation will be appended to should you choose to use it.  The default is set to null, so ensure you assign a value should you wish to enable the navigation.

**next** is an option to choose an element to give the ability to move to the next slide.  Default is #simpleSliderNext.

**previous** is an option to choose an element to give the ability to move to the previous slide.  Default is #simpleSliderPrevious

**pauseOnHover** is a Boolean option which tells the slider whether or not it should pause the slider if the user hovers over a slide.  Default value is true.

**keyboardNav** is a Boolean option which gives the slider the ability to navigate backwards or forwards with the left and right arrow buttons on the keyboard.  Default value is true.
