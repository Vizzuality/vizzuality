(function() {

  'use strict';

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

  var smoothScroll = function(elementID) {
    if (!elementID) {
      return;
    }
    var distance, el, elmYPosition, i, leapY, speed, startY, step, stopY, timer;
    elmYPosition = function(elm) {
      var node, y;
      y = elm.offsetTop;
      node = elm;
      while (node.offsetParent && node.offsetParent !== document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
      }
      return y;
    };
    el = document.getElementById(elementID);
    startY = window.pageYOffset;
    stopY = elmYPosition(el);
    distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
      return scrollTo(0, stopY);
    }
    speed = Math.round(distance / 70);
    if (speed >= 20) {
      speed = 20;
    }
    step = Math.round(distance / 25);
    leapY = stopY > startY ? startY + step : startY - step;
    timer = 0;
    if (stopY > startY) {
      i = startY;
      while (i < stopY) {
        setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
        leapY += step;
        if (leapY > stopY) {
          leapY = stopY;
        }
        timer++;
        i += step;
      }
      return;
    }
    i = startY;
    while (i > stopY) {
      setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
      leapY -= step;
      if (leapY < stopY) {
        leapY = stopY;
      }
      timer++;
      i -= step;
    }
  };

  function ajaxPost(url, data, callback) {
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
  }

  var App = function() {
    var self = this;

    this.setListeners = function() {
      var anchorBtns = document.getElementsByClassName('is-anchor');
      var burgerLink = document.getElementById('burgerLink');
      var mobileNav = document.getElementById('mobileNav');
      var mobileNavClose = document.getElementById('mobileNavClose');
      var goToAnchor = function(e) {
        e.preventDefault();
        var target = e.currentTarget.href.split('#')[1];
        return smoothScroll(target);
      };
      var burgerLinkAction = function(e) {
        e.preventDefault();
        return mobileNav.classList.remove('is-sm-hidden');
      };
      var mobileNavCloseAction = function(e) {
        e.preventDefault();
        return mobileNav.classList.add('is-sm-hidden');
      };
      if (window.ontouchstart) {
        if (anchorBtns.length) {
          for (var b = anchorBtns.length; b--;) {
            anchorBtns[b].ontouchstart = goToAnchor;
          }
        }
        if (burgerLink) {
          burgerLink.ontouchstart = burgerLinkAction;
        }
        if (mobileNavClose) {
          mobileNavClose.ontouchstart = mobileNavCloseAction;
        }
      } else {
        if (anchorBtns.length) {
          for (var i = anchorBtns.length; i--;) {
            anchorBtns[i].onclick = goToAnchor;
          }
        }
        if (burgerLink) {
          burgerLink.onclick = burgerLinkAction;
        }
        if (mobileNavClose) {
          mobileNavClose.onclick = mobileNavCloseAction;
        }
      }
    };

    this.contactForm = function() {
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
          ajaxPost('/contact', queryString, function(error, response) {
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
    };

    this.start = function() {
      self.contactForm();
      self.setListeners();

      var header = document.getElementById('headerTop');

      window.onscroll = function(e) {
        if (window.pageYOffset > 90) {
          header.className = '%1 %2'.format('l-header-top', 'is-fixed');
        } else {
          header.className = 'l-header-top';
        }
      };
    };

    return this;
  };

  var app = new App();

  document.addEventListener('DOMContentLoaded', app.start);

})();
