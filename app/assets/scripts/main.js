(function() {

  'use strict';

  // Choising click event
  var clickEvent = window.ontouchstart ? 'ontouchstart' : 'onclick';

  /**
   * Extending String.prototype
   * How to use: '%1 beer'.format(2)
   * Returns '2 beers'
   */
  if (!String.prototype.format) {
    String.prototype.format = function() {
      var args = [].slice.call(arguments),
        result = this.slice(),
        regexp;
      for (var i = args.length; i--;) {
        regexp = new RegExp('%' + (i + 1), 'g');
        result = result.replace(regexp, args[i]);
      }
      return result;
    };
  }

  // Utils functions
  var utils = {};

  utils.smoothScroll = (function() {
    // We do not want this script to be applied in browsers that do not support those
    // That means no smoothscroll on IE9 and below.
    if (document.querySelectorAll === void 0 || window.pageYOffset === void 0 || history.pushState === void 0) {
      return;
    }

    // Get the top position of an element in the document
    var getTop = function(element) {
      // return value of html.getBoundingClientRect().top ... IE : 0, other browsers : -pageYOffset
      if (element.nodeName === 'HTML') {
        return -window.pageYOffset;
      }
      return element.getBoundingClientRect().top + window.pageYOffset;
    };

    // ease functions thanks to:
    // http://blog.greweb.fr/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/
    var easings = {
      linear: function(t) {
        return t;
      },
      easeInQuad: function(t) {
        return t * t;
      },
      easeOutQuad: function(t) {
        return t * (2 - t);
      },
      easeInOutQuad: function(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      },
      easeInCubic: function(t) {
        return t * t * t;
      },
      easeOutCubic: function(t) {
        return (--t) * t * t + 1;
      },
      easeInOutCubic: function(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      },
      easeInQuart: function(t) {
        return t * t * t * t;
      },
      easeOutQuart: function(t) {
        return 1 - (--t) * t * t * t;
      },
      easeInOutQuart: function(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
      },
      easeInQuint: function(t) {
        return t * t * t * t * t;
      },
      easeOutQuint: function(t) {
        return 1 + (--t) * t * t * t * t;
      },
      easeInOutQuint: function(t) {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
      }
    };

    // calculate the scroll position we should be in
    // given the start and end point of the scroll
    // the time elapsed from the beginning of the scroll
    // and the total duration of the scroll (default 500ms)
    var position = function(start, end, elapsed, duration) {
      if (elapsed > duration) { return end; }
      return start + (end - start) * easings.easeInOutQuint(elapsed / duration);
    };

    // we use requestAnimationFrame to be called by the browser before every repaint
    // if the first argument is an element then scroll to the top of this element
    // if the first argument is numeric then scroll to this location
    // if the callback exist, it is called when the scrolling is finished
    var smoothScroll = function(el, duration, callback) {
      duration = duration || 500;
      var start = window.pageYOffset, end;

      if (typeof el === 'number') {
        end = parseInt(el);
      } else {
        end = getTop(el);
      }

      var clock = Date.now();
      var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
        function(fn) { window.setTimeout(fn, 15); };

      var step = function() {
        var elapsed = Date.now() - clock;
        window.scroll(0, position(start, end, elapsed, duration));
        if (elapsed > duration) {
          if (typeof callback === 'function') {
            callback(el);
          }
        } else {
          requestAnimationFrame(step);
        }
      };

      step();
    };

    var linkHandler = function(ev) {
      ev.preventDefault();

      if (location.hash !== this.hash) {
        window.history.pushState(null, null, this.hash);
      }

      // using the history api to solve issue #1 - back doesn't work
      // most browser don't update :target when the history api is used:
      // THIS IS A BUG FROM THE BROWSERS.
      // change the scrolling duration in this call
      smoothScroll(document.getElementById(this.hash.substring(1)), 500, function(el) {
        location.replace('#' + el.id); // this will cause the :target to be activated.
      });
    };

    // We look for all the internal links in the documents and attach the smoothscroll function
    document.addEventListener('DOMContentLoaded', function() {
      var internal = document.querySelectorAll('a[href^="#"]');
      for (var i = internal.length; i--;) {
        internal[i].addEventListener('click', linkHandler, false);
      }
    });

    // return smoothscroll API
    return smoothScroll;

  })();

  // XHR native
  utils.ajaxPost = function(url, data, callback) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
      if (http.readyState === 4 && http.status === 200) {
        callback(undefined, http.responseText);
      } else if (http.readyState === 4 && http.status === 400) {
        callback(http.responseText);
      }
    };
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.send(data);
  };

  // Throtle
  utils.throtle = function(fn, threshhold, scope) {
    threshhold = threshhold || 250;
    var last, deferTimer;
    return function() {
      var context = scope || this;
      var now = new Date(), args = arguments;
      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function() {
          last = now;
          fn.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  };

  // Function to search target and go to scroll using Smooth Scroll
  function goToAnchor(e) {
    e.preventDefault();
    var target = e.currentTarget.href.split('#')[1];
    var el = document.getElementById(target);
    return utils.smoothScroll(el);
  }

  // Search anchor links and set scroll smooth
  function anchorButtons() {
    var anchorBtns = document.getElementsByClassName('is-anchor');

    if (anchorBtns.length) {
      for (var b = anchorBtns.length; b--;) {
        anchorBtns[b][clickEvent] = goToAnchor;
      }
    }
  }

  // Contact form
  function contactForm() {
    var form = document.getElementById('contactForm');
    var formContent = document.getElementsByClassName('m-contact')[0];
    if (form) {
      form.onsubmit = function(e) {
        e.preventDefault();
        var formParams = [], queryString = '';
        for (var i = form.elements.length; i--;) {
           var el = form.elements[i];
           var name = encodeURIComponent(el.name);
           var value = encodeURIComponent(el.value);
           var param = '%1=%2'.format(name, value);
           if (name !== '' && value !== '') {
            formParams.push(param);
           }
        }
        queryString = formParams.join('&');
        utils.ajaxPost('/contact', queryString, function(error, response) {
          if (error) {
            var errorElement = document.getElementsByClassName('is-error')[0];
            if (errorElement) {
              errorElement.innerHTML = JSON.parse(error).message;
            } else {
              errorElement = document.createElement('p');
              errorElement.className = 'is-error';
              errorElement.innerHTML = JSON.parse(error).message;
              formContent.appendChild(errorElement);
            }
          } else {
            var message = JSON.parse(response).message;
            formContent.innerHTML = '<h1>%1</h1>'.format(message);
          }
        });
      };
    }
  }

  // Menu appear when user click on mobile menu
  function mobileNavigation() {
    var burgerLink = document.getElementById('burgerLink');
    var mobileNavClose = document.getElementById('mobileNavClose');
    var mobileNav = document.getElementById('mobileNav');

    if (burgerLink) {
      burgerLink[clickEvent] = function(e) {
        e.preventDefault();
        return mobileNav.classList.remove('is-sm-hidden');
      };
    }
    if (mobileNavClose) {
      mobileNavClose[clickEvent] = function(e) {
        e.preventDefault();
        return mobileNav.classList.add('is-sm-hidden');
      };
    }
  }

  // Header fixed
  function fixHeader() {
    var lastScrollTop = 0;
    var header = document.getElementById('header');
    return function() {
      var pageY = window.pageYOffset;
      if (pageY > lastScrollTop && pageY > 90) {
        header.className = 'l-header';
      } else {
        header.className = '%1 %2'.format('l-header', 'is-fixed');
      }
      lastScrollTop = pageY;
    };
  }

  // Start application
  document.addEventListener('DOMContentLoaded', function() {
    mobileNavigation();
    anchorButtons();
    contactForm();

    window.onscroll = utils.throtle(fixHeader(), 100);
  });

})();
