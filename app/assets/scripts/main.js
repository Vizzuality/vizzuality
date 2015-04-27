(function() {

  'use strict';

  var smoothScroll = function(elementID) {
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
    speed = Math.round(distance / 100);
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

  var App = function() {
    var self = this;

    this.setListeners = function() {
      var ourWorkBtn = document.getElementById('ourWorkBtn');
      var burgerLink = document.getElementById('burgerLink');
      var mobileNav = document.getElementById('mobileNav');
      var mobileNavClose = document.getElementById('mobileNavClose');
      var ourWorkBtnAction = function(e) {
        e.preventDefault();
        return smoothScroll('ourWork');
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
        if (ourWorkBtn) {
          ourWorkBtn.ontouchstart = ourWorkBtnAction;
        }
        if (burgerLink) {
          burgerLink.ontouchstart = burgerLinkAction;
        }
        if (mobileNavClose) {
          mobileNavClose.ontouchstart = mobileNavCloseAction;
        }
      } else {
        if (ourWorkBtn) {
          ourWorkBtn.onclick = ourWorkBtnAction;
        }
        if (burgerLink) {
          burgerLink.onclick = burgerLinkAction;
        }
        if (mobileNavClose) {
          mobileNavClose.onclick = mobileNavCloseAction;
        }
      }
    };

    this.start = function() {
      self.setListeners();
    };

    return this;
  };

  var app = new App();

  document.addEventListener('DOMContentLoaded', app.start);

})();
