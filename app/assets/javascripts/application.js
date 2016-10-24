//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require leaflet-routing-machine
//= require t

(function() {

  'use strict';

  console.info('Welcome to Vizzuality\'s website :)');

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

      if (!this.hash) { return false; }

      var target = document.getElementById(this.hash.substring(1));

      if (target) {
        if (location.hash !== this.hash) {
          window.history.pushState(null, null, this.hash);
        }

        // using the history api to solve issue #1 - back doesn't work
        // most browser don't update :target when the history api is used:
        // THIS IS A BUG FROM THE BROWSERS.
        // change the scrolling duration in this call
        smoothScroll(target, 500, function(el) {
          location.replace('#' + el.id); // this will cause the :target to be activated.
        });
      }
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

  utils.getScroll = function() {
    return window.pageYOffset;
  };

  utils.once = function(fn, context) {
    var result;
    return function() {
      if(fn) {
        result = fn.apply(context || this, arguments);
        fn = null;
      }
      return result;
    };
  };

  utils.Template = window.t;

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

  // Google Analytics event
  function sendGAEvent() {
    if (ga) {
      ga('send', 'event', 'Contact us', 'Begins typing');
    }
  }

  // Contact form
  function contactForm() {
    var form = document.getElementById('contactForm');
    var formContent = document.getElementsByClassName('m-contact')[0];
    if (form) {
      // Wohooo
      var words = [
        'Cheers!', 'Thanks!', 'Un saludo,', 'Yours Sincerely,',
        'Yours in coding!', 'Vielen Dank!',
        'Greetings from Winterfell,',
        'See you at the Party Richter,',
        'I\'ll be back,',
        'May the force be with you,'
      ];
      var len = words.length;
      var counter = 0;
      var regards = document.getElementById('closeString');
      var bodyTextarea = form.querySelector('textarea');

      bodyTextarea.addEventListener('keyup', utils.once(sendGAEvent));

      regards.onclick = function() {
        counter = counter + 1;
        if (counter === len) {
          counter = 0;
        }
        regards.textContent = words[counter];
        // Google Analytics event
        if (ga) {
          ga('send', 'event', 'Contact us', 'Click cheers');
        }
      };

      // On submit form
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
          // Google Analytics event
          if (ga) {
            ga('send', 'event', 'Contact us', 'Form Submitted');
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
    var headerTop = document.querySelector('.l-header-top');

    return function() {
      var pageY = window.pageYOffset;

      header.className = '%1 %2'.format('l-header', 'is-fixed');

      if(pageY < 90) {
        header.className = '%1'.format('l-header');
      } else {

        if (pageY > lastScrollTop || pageY < 150) {
          headerTop.className = '%1 %2'.format('l-header-top', 'hide');
        } else {
          headerTop.className = '%1 %2'.format('l-header-top', 'show');
        }

        lastScrollTop = pageY;
      }
    };
  }

  function geolocationMap() {
    var elem = document.getElementById('map');

    if (!elem) { return false; }

    var MADRID = L.latLng(40.4346730, -3.7005350);
    var CAMBRIDGE = L.latLng(52.200521, 0.138486);
    var mapOptions = {
      center: MADRID,
      zoom: 8,
      scrollWheelZoom: false,
      zoomControl: false
    };
    var customIcons = [
      L.divIcon({ className: 'user-marker' }),
      L.divIcon({ className: 'viz-marker' })
    ];
    var map, currentRoute;

    function generateRoute(pointA, pointB) {
      var bounds = L.latLngBounds(pointB, pointA);

      map.fitBounds(bounds, {
        paddingTopLeft: [0, 100],
        paddingBottomRight: [0, 170]
      });

      setTimeout(function() {
        if (currentRoute) {
          currentRoute.setWaypoints([ pointA, pointB ]);
        } else {
          currentRoute = L.Routing.control({
            waypoints: [ pointA, pointB ],
            useZoomParameter: true,
            show: false,
            summaryTemplate: '',
            lineOptions: {
              styles: [{
                color: 'white',
                opacity: 1,
                weight: 2,
                dashArray: [1, 5]
              }]
            },
            createMarker: function(index, position) {
              return L.marker(position.latLng, { icon: customIcons[index] });
            }
          }).addTo(map);
        }
      }, 500);
    }

    function defaultLocation() {
      var userPos = MADRID;
      setLocation(userPos);
    }

    function onLocationFound(ev) {
      var userPos = ev.latlng;
      setLocation(userPos);
    }

    function setLocation(userPos) {
      var madridOffice = document.getElementById('madridOffice');
      var cambridgeOffice = document.getElementById('cambridgeOffice');

      if (!madridOffice || !cambridgeOffice) {
        return false;
      }

      generateRoute(userPos, MADRID);

      madridOffice.addEventListener('click', function() {
        madridOffice.className = 'm-map-location-item is-highlighted';
        cambridgeOffice.className = 'm-map-location-item';
        generateRoute(userPos, MADRID);
      }, false);

      cambridgeOffice.addEventListener('click', function() {
        madridOffice.className = 'm-map-location-item';
        cambridgeOffice.className = 'm-map-location-item is-highlighted';
        generateRoute(userPos, CAMBRIDGE);
      }, false);
    }

    if (elem) {
      map = L.map(elem, mapOptions);

      L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      defaultLocation();

      map.on('locationfound', onLocationFound);
      map.locate();
    }
  }

  // Show all projects in a window modal
  function allProjectsModal() {
    var allProjectsLink = document.getElementsByClassName('allProjectsLink');
    var projectsModal = document.getElementById('projectsModal');
    var closeModalBtn = document.getElementById('closeModal');
    var contentModal = document.getElementById('contentModal');
    var data = null;
    var currentTop = 0;
    var currentBodyClassName = document.body.className;

    function renderProjects() {
      currentTop = window.pageYOffset;
      projectsModal.className = 'm-modal';
      var templateString = '<h2>{{=title}}</h2>' +
        '<ul>{{@projects}}<li>' +
        '<a href="/projects/{{=_val.slug}}">' +
        '<strong>{{=_val.title}}</strong>, {{=_val.client}}' +
        '</a>' +
        '</li>{{/@projects}}</ul>';
      var template = new utils.Template(templateString);
      var html = template.render({
        title: 'All our projects.',
        projects: data.projects
      });
      contentModal.innerHTML = html;
      document.body.className = currentBodyClassName + ' is-modal-open';
    }

    function closeModal() {
      document.body.className = currentBodyClassName;
      document.body.scrollTop = currentTop;
      projectsModal.className = 'm-modal is-hidden';
    }

    var showProjectList = function(ev) {
      ev.preventDefault();
      if (!data) {
        var http = new XMLHttpRequest();
        http.onreadystatechange = function() {
          if (http.readyState === 4 && http.status === 200) {
            data = JSON.parse(http.responseText);
            renderProjects();
          }
        };
        http.open('GET', '/api/projects', true);
        http.send();
      } else {
        renderProjects();
      }
    };

    if (allProjectsLink && projectsModal) {
      for (var index = 0; index < allProjectsLink.length ; index++) {
        allProjectsLink[index][clickEvent] = showProjectList;
      }
    }

    if (closeModalBtn) {
      closeModalBtn[clickEvent] = closeModal;
    }
  }

  // Parallax effect in project page
  function doParallax() {

    var parallaxContent = document.querySelector('.parallax-bg');

    if(!parallaxContent) {
      return;
    }

    var parallaxModule = document.querySelector('.m-parallax'),
      parallaxBackground = document.getElementsByClassName('parallax-bg')[0].style.backgroundImage,
      cssBackground = 'background-image:' + parallaxBackground,
      parallaxSize = {
        top: parallaxModule.offsetTop,
        bottom: parallaxModule.offsetTop + parallaxModule.offsetHeight
      },
      scrollY = utils.getScroll();

    var parallax = function() {
      var translateY = window.pageYOffset / 8;

      if(!this.style.backgroundImage) {
        this.style.backgroundImage = cssBackground;
      }

      this.style.transform = 'translate3d(0,' + translateY + 'px, 0)';
      this.style['-webkit-transform'] = 'translate3d(0,' + translateY + 'px, 0)';
      this.style['-moz-transform'] = 'translate3d(0,' + translateY + 'px, 0)';
    };

    if (scrollY < parallaxSize.bottom + 100) {
      parallax.apply(parallaxContent);
    }
  }

  // Navigation between projects using arrow keys
  function arrowsNavigation() {

    var page = document.getElementsByClassName('is-project-detail-page');

    if (page.length === 0) {
      return;
    }


    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
      if (http.readyState === 4 && http.status === 200) {
        var data = JSON.parse(http.responseText);

        var currentProject = window.location.href.split('/'),
          slug = currentProject[currentProject.length - 1],
          totalProjects = data.projects.length,
          prev, next, found = false;

        for (var i = 0; i < totalProjects && !found; i++) {
          if (data.projects[i].slug === slug) {
            found = true;

            if (data.projects[i - 1]) {
              prev = data.projects[i - 1].slug;
            }

            if (data.projects[i + 1]) {
              next = data.projects[i + 1].slug;
            }
          }
        }

        window.addEventListener('keydown', function(e){
          var key = e.keyCode;

          // Left arrow
          if (key === 37 && prev) {
            window.location.href = prev;
          }

          // Right arrow
          if (key === 39 && next) {
            window.location.href = next;
          }

        });
      }
    };

    http.open('GET', '/api/projects', true);
    http.send();
  }

  var loadBtn = function() {
    if (!document.querySelector('.is-project-page')) {
      return;
    }

    var btn = document.querySelector('.m-claim .btn-secondary');

    setTimeout(function() {
      btn.classList.add('is-visible');
    }, 2000);
  };

  var decodeEmail = function() {
    if (!document.getElementById('contact')) {
      return;
    }

    var email = document.querySelector('.m-contact-footer a'),
      decodedEmail = atob(email.getAttribute('href').split(':')[1]);

    email.setAttribute('href', 'mailto:' +  decodedEmail);
    email.text = atob(email.text);
  };

  function onReady() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('Trident');

    if (msie > 0) {
      document.body.className = document.body.className + ' ie';
    }

    mobileNavigation();
    anchorButtons();
    contactForm();
    geolocationMap();
    allProjectsModal();
    arrowsNavigation();
    loadBtn();
    decodeEmail();
  }

  window.addEventListener('load', function() {
    var fHeader = utils.throtle(fixHeader(), 100);

    window.addEventListener('scroll', function () {
      fHeader();
      doParallax();
    });
  });

  // Start application
  if (Turbolinks && Turbolinks.supported) {
    document.addEventListener('turbolinks:load', onReady);
  } else {
    document.addEventListener('DOMContentLoaded', onReady);
  }
})();
