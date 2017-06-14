/*
 * This file deals with adding the ripple effect to buttons as specified
 * in the material design specification. The credit for the content in this
 * file goes to Jhey Tompkins who brilliantly layed out the steps in his post:
 *
 * https://medium.com/@_jh3y/how-to-create-the-ripple-effect-from-google-material-design-c6f993e1d39
*/

var WavesEffect = (function(WavesEffect, window, document) {

  "use strict";

  function debounce(func, wait) {
  	var timeout;
  	return function() {
  		var context = this, args = arguments;
  		var later = function() {
  			timeout = null;
  			func.apply(context, args);
  		};
  		clearTimeout(timeout);
  		timeout = setTimeout(later, wait);
  		if (!timeout) func.apply(context, args);
  	};
  };

  function addRipple(e) {
    var ripple = this,
      size     = ripple.offsetWidth,
      pos      = ripple.getBoundingClientRect(),
      rippler  = document.createElement('span'),
      x        = e.pageX - pos.left - (size / 2),
      y        = e.pageY - pos.top  - (size / 2),
      style    = 'top:' + y + 'px; left:' + x + 'px; height: '
                + size + 'px; width: ' + size + 'px;';
    rippler.className += ' ripple-color';
    ripple.rippleContainer.appendChild(rippler);
    rippler.setAttribute('style', style);
  };

  function cleanUp() {
    var container = this.rippleContainer;
    while (this.rippleContainer.firstChild) {
      container.removeChild(container.firstChild);
    }
  };

  WavesEffect.ready = function() {
    var buttons = document.querySelectorAll('.btn:not(.disabled), .btn-lg:not(.disabled), .btn-sm:not(.disabled)');
    var rippleContainer, ripple;
    for (var i = 0; i < buttons.length; i++) {
      ripple                    = buttons[i];
      rippleContainer           = document.createElement('div');
      rippleContainer.className = 'ripple-container';

      ripple.addEventListener('mouseup', addRipple);
      ripple.addEventListener('mouseup'  , debounce(cleanUp, 2000));
      ripple.rippleContainer = rippleContainer;
      ripple.appendChild(rippleContainer);
    }
  }

  return WavesEffect;

})(window.WavesEffect || {}, this, this.document);
