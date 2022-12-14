function on() {
    document.getElementById("overlay").style.display = "block";
  }
  
  function off() {
    document.getElementById("overlay").style.display = "none";
  }

//text rolling effect//
$(document).ready(function() {
    new Marquee('example', {
      // once or continuous
      continuous: true,
      // 'rtl' or 'ltr'
      direction: 'rtl',
      // pause between loops
      delayAfter: 1000,
      // when to start
      delayBefore: 0,
      // scroll speed
      speed: 0.5,
      // loops
      loops: -1
    });
  });
  
  ////////////////////////////// LIBRARY BELOW ///////
  
  // See: http://www.cssscript.com/marquee-like-horizontal-scroller-with-pure-javascript-marquee-js/
  /*
      Vanilla Javascript Marquee
      Version: 0.1.0
      Author: Robert Bossaert <https://github.com/robertbossaert>
      Example call:
      
      new Marquee('element');
      new Marquee('element', {
          direction: 'rtl',
      });
  */
  var Marquee = function(element, defaults) {
    "use strict";
  
    var elem = document.getElementById(element),
      options = (defaults === undefined) ? {} : defaults,
      continuous = options.continuous || true, // once or continuous
      delayAfter = options.delayAfter || 1000, // pause between loops
      delayBefore = options.delayBefore || 0, // when to start
      direction = options.direction || 'ltr', // ltr or rtl
      loops = options.loops || -1,
      speed = options.speed || 0.5,
      timer = null,
      milestone = 0,
      marqueeElem = null,
      elemWidth = null,
      self = this,
      ltrCond = 0,
      loopCnt = 0,
      start = 0,
      process = null,
      constructor = function(elem) {
  
        // Build html
        var elemHTML = elem.innerHTML,
          elemNode = elem.childNodes[1] || elem;
  
        elemWidth = elemNode.offsetWidth;
  
        marqueeElem = '<div>' + elemHTML + '</div>';
        elem.innerHTML = marqueeElem;
        marqueeElem = elem.getElementsByTagName('div')[0];
        elem.style.overflow = 'hidden';
        marqueeElem.style.whiteSpace = 'nowrap';
        marqueeElem.style.position = 'relative';
  
        if (continuous === true) {
          marqueeElem.innerHTML += elemHTML;
          marqueeElem.style.width = '200%';
  
          if (direction === 'ltr') {
            start = -elemWidth;
          }
        } else {
          ltrCond = elem.offsetWidth;
  
          if (direction === 'rtl') {
            milestone = ltrCond;
          }
        }
  
        if (direction === 'ltr') {
          milestone = -elemWidth;
        } else if (direction === 'rtl') {
          speed = -speed;
        }
  
        self.start();
  
        return marqueeElem;
      }
  
    this.start = function() {
      process = window.setInterval(function() {
        self.play();
      });
    };
  
    this.play = function() {
      // beginning
      marqueeElem.style.left = start + 'px';
      start = start + speed;
  
      if (start > ltrCond || start < -elemWidth) {
        start = milestone;
        loopCnt++;
  
        if (loops !== -1 && loopCnt >= loops) {
          marqueeElem.style.left = 0;
        }
      }
    }
  
    this.end = function() {
      window.clearInterval(process);
    }
  
    // Init plugin
    marqueeElem = constructor(elem);
  }