"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
  * Bootstrap v4.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) : typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) : factory(global.bootstrap = {}, global.jQuery, global.Popper);
})(void 0, function (exports, $, Popper) {
  'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */


  var Util = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */
    var TRANSITION_END = 'transitionend';
    var MAX_UID = 1000000;
    var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

    function toType(obj) {
      return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
    }

    function getSpecialTransitionEndEvent() {
      return {
        bindType: TRANSITION_END,
        delegateType: TRANSITION_END,
        handle: function handle(event) {
          if ($$$1(event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
          }

          return undefined; // eslint-disable-line no-undefined
        }
      };
    }

    function transitionEndEmulator(duration) {
      var _this = this;

      var called = false;
      $$$1(this).one(Util.TRANSITION_END, function () {
        called = true;
      });
      setTimeout(function () {
        if (!called) {
          Util.triggerTransitionEnd(_this);
        }
      }, duration);
      return this;
    }

    function setTransitionEndSupport() {
      $$$1.fn.emulateTransitionEnd = transitionEndEmulator;
      $$$1.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */


    var Util = {
      TRANSITION_END: 'bsTransitionEnd',
      getUID: function getUID(prefix) {
        do {
          // eslint-disable-next-line no-bitwise
          prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
        } while (document.getElementById(prefix));

        return prefix;
      },
      getSelectorFromElement: function getSelectorFromElement(element) {
        var selector = element.getAttribute('data-target');

        if (!selector || selector === '#') {
          selector = element.getAttribute('href') || '';
        }

        try {
          return document.querySelector(selector) ? selector : null;
        } catch (err) {
          return null;
        }
      },
      getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
        if (!element) {
          return 0;
        } // Get transition-duration of the element


        var transitionDuration = $$$1(element).css('transition-duration');
        var floatTransitionDuration = parseFloat(transitionDuration); // Return 0 if element or transition duration is not found

        if (!floatTransitionDuration) {
          return 0;
        } // If multiple durations are defined, take the first


        transitionDuration = transitionDuration.split(',')[0];
        return parseFloat(transitionDuration) * MILLISECONDS_MULTIPLIER;
      },
      reflow: function reflow(element) {
        return element.offsetHeight;
      },
      triggerTransitionEnd: function triggerTransitionEnd(element) {
        $$$1(element).trigger(TRANSITION_END);
      },
      // TODO: Remove in v5
      supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(TRANSITION_END);
      },
      isElement: function isElement(obj) {
        return (obj[0] || obj).nodeType;
      },
      typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
        for (var property in configTypes) {
          if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
            var expectedTypes = configTypes[property];
            var value = config[property];
            var valueType = value && Util.isElement(value) ? 'element' : toType(value);

            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
            }
          }
        }
      }
    };
    setTransitionEndSupport();
    return Util;
  }($);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */


  var Alert = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'alert';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.alert';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Selector = {
      DISMISS: '[data-dismiss="alert"]'
    };
    var Event = {
      CLOSE: "close" + EVENT_KEY,
      CLOSED: "closed" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      ALERT: 'alert',
      FADE: 'fade',
      SHOW: 'show'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Alert =
    /*#__PURE__*/
    function () {
      function Alert(element) {
        this._element = element;
      } // Getters


      var _proto = Alert.prototype; // Public

      _proto.close = function close(element) {
        var rootElement = this._element;

        if (element) {
          rootElement = this._getRootElement(element);
        }

        var customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent.isDefaultPrevented()) {
          return;
        }

        this._removeElement(rootElement);
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Private


      _proto._getRootElement = function _getRootElement(element) {
        var selector = Util.getSelectorFromElement(element);
        var parent = false;

        if (selector) {
          parent = document.querySelector(selector);
        }

        if (!parent) {
          parent = $$$1(element).closest("." + ClassName.ALERT)[0];
        }

        return parent;
      };

      _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
        var closeEvent = $$$1.Event(Event.CLOSE);
        $$$1(element).trigger(closeEvent);
        return closeEvent;
      };

      _proto._removeElement = function _removeElement(element) {
        var _this = this;

        $$$1(element).removeClass(ClassName.SHOW);

        if (!$$$1(element).hasClass(ClassName.FADE)) {
          this._destroyElement(element);

          return;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(element);
        $$$1(element).one(Util.TRANSITION_END, function (event) {
          return _this._destroyElement(element, event);
        }).emulateTransitionEnd(transitionDuration);
      };

      _proto._destroyElement = function _destroyElement(element) {
        $$$1(element).detach().trigger(Event.CLOSED).remove();
      }; // Static


      Alert._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $$$1(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Alert(this);
            $element.data(DATA_KEY, data);
          }

          if (config === 'close') {
            data[config](this);
          }
        });
      };

      Alert._handleDismiss = function _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }

          alertInstance.close(this);
        };
      };

      _createClass(Alert, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Alert;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Alert._jQueryInterface;
    $$$1.fn[NAME].Constructor = Alert;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Alert._jQueryInterface;
    };

    return Alert;
  }($);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */


  var Button = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'button';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.button';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ClassName = {
      ACTIVE: 'active',
      BUTTON: 'btn',
      FOCUS: 'focus'
    };
    var Selector = {
      DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
      DATA_TOGGLE: '[data-toggle="buttons"]',
      INPUT: 'input',
      ACTIVE: '.active',
      BUTTON: '.btn'
    };
    var Event = {
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY + DATA_API_KEY + " " + ("blur" + EVENT_KEY + DATA_API_KEY)
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Button =
    /*#__PURE__*/
    function () {
      function Button(element) {
        this._element = element;
      } // Getters


      var _proto = Button.prototype; // Public

      _proto.toggle = function toggle() {
        var triggerChangeEvent = true;
        var addAriaPressed = true;
        var rootElement = $$$1(this._element).closest(Selector.DATA_TOGGLE)[0];

        if (rootElement) {
          var input = this._element.querySelector(Selector.INPUT);

          if (input) {
            if (input.type === 'radio') {
              if (input.checked && this._element.classList.contains(ClassName.ACTIVE)) {
                triggerChangeEvent = false;
              } else {
                var activeElement = rootElement.querySelector(Selector.ACTIVE);

                if (activeElement) {
                  $$$1(activeElement).removeClass(ClassName.ACTIVE);
                }
              }
            }

            if (triggerChangeEvent) {
              if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
                return;
              }

              input.checked = !this._element.classList.contains(ClassName.ACTIVE);
              $$$1(input).trigger('change');
            }

            input.focus();
            addAriaPressed = false;
          }
        }

        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName.ACTIVE));
        }

        if (triggerChangeEvent) {
          $$$1(this._element).toggleClass(ClassName.ACTIVE);
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Static


      Button._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          if (!data) {
            data = new Button(this);
            $$$1(this).data(DATA_KEY, data);
          }

          if (config === 'toggle') {
            data[config]();
          }
        });
      };

      _createClass(Button, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Button;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      event.preventDefault();
      var button = event.target;

      if (!$$$1(button).hasClass(ClassName.BUTTON)) {
        button = $$$1(button).closest(Selector.BUTTON);
      }

      Button._jQueryInterface.call($$$1(button), 'toggle');
    }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      var button = $$$1(event.target).closest(Selector.BUTTON)[0];
      $$$1(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Button._jQueryInterface;
    $$$1.fn[NAME].Constructor = Button;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Button._jQueryInterface;
    };

    return Button;
  }($);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */


  var Carousel = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'carousel';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.carousel';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

    var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

    var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

    var Default = {
      interval: 5000,
      keyboard: true,
      slide: false,
      pause: 'hover',
      wrap: true
    };
    var DefaultType = {
      interval: '(number|boolean)',
      keyboard: 'boolean',
      slide: '(boolean|string)',
      pause: '(string|boolean)',
      wrap: 'boolean'
    };
    var Direction = {
      NEXT: 'next',
      PREV: 'prev',
      LEFT: 'left',
      RIGHT: 'right'
    };
    var Event = {
      SLIDE: "slide" + EVENT_KEY,
      SLID: "slid" + EVENT_KEY,
      KEYDOWN: "keydown" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY,
      TOUCHEND: "touchend" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      CAROUSEL: 'carousel',
      ACTIVE: 'active',
      SLIDE: 'slide',
      RIGHT: 'carousel-item-right',
      LEFT: 'carousel-item-left',
      NEXT: 'carousel-item-next',
      PREV: 'carousel-item-prev',
      ITEM: 'carousel-item'
    };
    var Selector = {
      ACTIVE: '.active',
      ACTIVE_ITEM: '.active.carousel-item',
      ITEM: '.carousel-item',
      NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
      INDICATORS: '.carousel-indicators',
      DATA_SLIDE: '[data-slide], [data-slide-to]',
      DATA_RIDE: '[data-ride="carousel"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Carousel =
    /*#__PURE__*/
    function () {
      function Carousel(element, config) {
        this._items = null;
        this._interval = null;
        this._activeElement = null;
        this._isPaused = false;
        this._isSliding = false;
        this.touchTimeout = null;
        this._config = this._getConfig(config);
        this._element = $$$1(element)[0];
        this._indicatorsElement = this._element.querySelector(Selector.INDICATORS);

        this._addEventListeners();
      } // Getters


      var _proto = Carousel.prototype; // Public

      _proto.next = function next() {
        if (!this._isSliding) {
          this._slide(Direction.NEXT);
        }
      };

      _proto.nextWhenVisible = function nextWhenVisible() {
        // Don't call next when the page isn't visible
        // or the carousel or its parent isn't visible
        if (!document.hidden && $$$1(this._element).is(':visible') && $$$1(this._element).css('visibility') !== 'hidden') {
          this.next();
        }
      };

      _proto.prev = function prev() {
        if (!this._isSliding) {
          this._slide(Direction.PREV);
        }
      };

      _proto.pause = function pause(event) {
        if (!event) {
          this._isPaused = true;
        }

        if (this._element.querySelector(Selector.NEXT_PREV)) {
          Util.triggerTransitionEnd(this._element);
          this.cycle(true);
        }

        clearInterval(this._interval);
        this._interval = null;
      };

      _proto.cycle = function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }

        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }

        if (this._config.interval && !this._isPaused) {
          this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
        }
      };

      _proto.to = function to(index) {
        var _this = this;

        this._activeElement = this._element.querySelector(Selector.ACTIVE_ITEM);

        var activeIndex = this._getItemIndex(this._activeElement);

        if (index > this._items.length - 1 || index < 0) {
          return;
        }

        if (this._isSliding) {
          $$$1(this._element).one(Event.SLID, function () {
            return _this.to(index);
          });
          return;
        }

        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }

        var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

        this._slide(direction, this._items[index]);
      };

      _proto.dispose = function dispose() {
        $$$1(this._element).off(EVENT_KEY);
        $$$1.removeData(this._element, DATA_KEY);
        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._isPaused = null;
        this._isSliding = null;
        this._activeElement = null;
        this._indicatorsElement = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._addEventListeners = function _addEventListeners() {
        var _this2 = this;

        if (this._config.keyboard) {
          $$$1(this._element).on(Event.KEYDOWN, function (event) {
            return _this2._keydown(event);
          });
        }

        if (this._config.pause === 'hover') {
          $$$1(this._element).on(Event.MOUSEENTER, function (event) {
            return _this2.pause(event);
          }).on(Event.MOUSELEAVE, function (event) {
            return _this2.cycle(event);
          });

          if ('ontouchstart' in document.documentElement) {
            // If it's a touch-enabled device, mouseenter/leave are fired as
            // part of the mouse compatibility events on first tap - the carousel
            // would stop cycling until user tapped out of it;
            // here, we listen for touchend, explicitly pause the carousel
            // (as if it's the second time we tap on it, mouseenter compat event
            // is NOT fired) and after a timeout (to allow for mouse compatibility
            // events to fire) we explicitly restart cycling
            $$$1(this._element).on(Event.TOUCHEND, function () {
              _this2.pause();

              if (_this2.touchTimeout) {
                clearTimeout(_this2.touchTimeout);
              }

              _this2.touchTimeout = setTimeout(function (event) {
                return _this2.cycle(event);
              }, TOUCHEVENT_COMPAT_WAIT + _this2._config.interval);
            });
          }
        }
      };

      _proto._keydown = function _keydown(event) {
        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }

        switch (event.which) {
          case ARROW_LEFT_KEYCODE:
            event.preventDefault();
            this.prev();
            break;

          case ARROW_RIGHT_KEYCODE:
            event.preventDefault();
            this.next();
            break;

          default:
        }
      };

      _proto._getItemIndex = function _getItemIndex(element) {
        this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector.ITEM)) : [];
        return this._items.indexOf(element);
      };

      _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
        var isNextDirection = direction === Direction.NEXT;
        var isPrevDirection = direction === Direction.PREV;

        var activeIndex = this._getItemIndex(activeElement);

        var lastItemIndex = this._items.length - 1;
        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

        if (isGoingToWrap && !this._config.wrap) {
          return activeElement;
        }

        var delta = direction === Direction.PREV ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this._items.length;
        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
      };

      _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
        var targetIndex = this._getItemIndex(relatedTarget);

        var fromIndex = this._getItemIndex(this._element.querySelector(Selector.ACTIVE_ITEM));

        var slideEvent = $$$1.Event(Event.SLIDE, {
          relatedTarget: relatedTarget,
          direction: eventDirectionName,
          from: fromIndex,
          to: targetIndex
        });
        $$$1(this._element).trigger(slideEvent);
        return slideEvent;
      };

      _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
        if (this._indicatorsElement) {
          var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector.ACTIVE));
          $$$1(indicators).removeClass(ClassName.ACTIVE);

          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

          if (nextIndicator) {
            $$$1(nextIndicator).addClass(ClassName.ACTIVE);
          }
        }
      };

      _proto._slide = function _slide(direction, element) {
        var _this3 = this;

        var activeElement = this._element.querySelector(Selector.ACTIVE_ITEM);

        var activeElementIndex = this._getItemIndex(activeElement);

        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

        var nextElementIndex = this._getItemIndex(nextElement);

        var isCycling = Boolean(this._interval);
        var directionalClassName;
        var orderClassName;
        var eventDirectionName;

        if (direction === Direction.NEXT) {
          directionalClassName = ClassName.LEFT;
          orderClassName = ClassName.NEXT;
          eventDirectionName = Direction.LEFT;
        } else {
          directionalClassName = ClassName.RIGHT;
          orderClassName = ClassName.PREV;
          eventDirectionName = Direction.RIGHT;
        }

        if (nextElement && $$$1(nextElement).hasClass(ClassName.ACTIVE)) {
          this._isSliding = false;
          return;
        }

        var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

        if (slideEvent.isDefaultPrevented()) {
          return;
        }

        if (!activeElement || !nextElement) {
          // Some weirdness is happening, so we bail
          return;
        }

        this._isSliding = true;

        if (isCycling) {
          this.pause();
        }

        this._setActiveIndicatorElement(nextElement);

        var slidEvent = $$$1.Event(Event.SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });

        if ($$$1(this._element).hasClass(ClassName.SLIDE)) {
          $$$1(nextElement).addClass(orderClassName);
          Util.reflow(nextElement);
          $$$1(activeElement).addClass(directionalClassName);
          $$$1(nextElement).addClass(directionalClassName);
          var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
          $$$1(activeElement).one(Util.TRANSITION_END, function () {
            $$$1(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName.ACTIVE);
            $$$1(activeElement).removeClass(ClassName.ACTIVE + " " + orderClassName + " " + directionalClassName);
            _this3._isSliding = false;
            setTimeout(function () {
              return $$$1(_this3._element).trigger(slidEvent);
            }, 0);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          $$$1(activeElement).removeClass(ClassName.ACTIVE);
          $$$1(nextElement).addClass(ClassName.ACTIVE);
          this._isSliding = false;
          $$$1(this._element).trigger(slidEvent);
        }

        if (isCycling) {
          this.cycle();
        }
      }; // Static


      Carousel._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = _objectSpread({}, Default, $$$1(this).data());

          if (_typeof(config) === 'object') {
            _config = _objectSpread({}, _config, config);
          }

          var action = typeof config === 'string' ? config : _config.slide;

          if (!data) {
            data = new Carousel(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'number') {
            data.to(config);
          } else if (typeof action === 'string') {
            if (typeof data[action] === 'undefined') {
              throw new TypeError("No method named \"" + action + "\"");
            }

            data[action]();
          } else if (_config.interval) {
            data.pause();
            data.cycle();
          }
        });
      };

      Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
        var selector = Util.getSelectorFromElement(this);

        if (!selector) {
          return;
        }

        var target = $$$1(selector)[0];

        if (!target || !$$$1(target).hasClass(ClassName.CAROUSEL)) {
          return;
        }

        var config = _objectSpread({}, $$$1(target).data(), $$$1(this).data());

        var slideIndex = this.getAttribute('data-slide-to');

        if (slideIndex) {
          config.interval = false;
        }

        Carousel._jQueryInterface.call($$$1(target), config);

        if (slideIndex) {
          $$$1(target).data(DATA_KEY).to(slideIndex);
        }

        event.preventDefault();
      };

      _createClass(Carousel, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Carousel;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);
    $$$1(window).on(Event.LOAD_DATA_API, function () {
      var carousels = [].slice.call(document.querySelectorAll(Selector.DATA_RIDE));

      for (var i = 0, len = carousels.length; i < len; i++) {
        var $carousel = $$$1(carousels[i]);

        Carousel._jQueryInterface.call($carousel, $carousel.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Carousel._jQueryInterface;
    $$$1.fn[NAME].Constructor = Carousel;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Carousel._jQueryInterface;
    };

    return Carousel;
  }($);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */


  var Collapse = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'collapse';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.collapse';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Default = {
      toggle: true,
      parent: ''
    };
    var DefaultType = {
      toggle: 'boolean',
      parent: '(string|element)'
    };
    var Event = {
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      SHOW: 'show',
      COLLAPSE: 'collapse',
      COLLAPSING: 'collapsing',
      COLLAPSED: 'collapsed'
    };
    var Dimension = {
      WIDTH: 'width',
      HEIGHT: 'height'
    };
    var Selector = {
      ACTIVES: '.show, .collapsing',
      DATA_TOGGLE: '[data-toggle="collapse"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Collapse =
    /*#__PURE__*/
    function () {
      function Collapse(element, config) {
        this._isTransitioning = false;
        this._element = element;
        this._config = this._getConfig(config);
        this._triggerArray = $$$1.makeArray(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
        var toggleList = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));

        for (var i = 0, len = toggleList.length; i < len; i++) {
          var elem = toggleList[i];
          var selector = Util.getSelectorFromElement(elem);
          var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
            return foundElem === element;
          });

          if (selector !== null && filterElement.length > 0) {
            this._selector = selector;

            this._triggerArray.push(elem);
          }
        }

        this._parent = this._config.parent ? this._getParent() : null;

        if (!this._config.parent) {
          this._addAriaAndCollapsedClass(this._element, this._triggerArray);
        }

        if (this._config.toggle) {
          this.toggle();
        }
      } // Getters


      var _proto = Collapse.prototype; // Public

      _proto.toggle = function toggle() {
        if ($$$1(this._element).hasClass(ClassName.SHOW)) {
          this.hide();
        } else {
          this.show();
        }
      };

      _proto.show = function show() {
        var _this = this;

        if (this._isTransitioning || $$$1(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var actives;
        var activesData;

        if (this._parent) {
          actives = [].slice.call(this._parent.querySelectorAll(Selector.ACTIVES)).filter(function (elem) {
            return elem.getAttribute('data-parent') === _this._config.parent;
          });

          if (actives.length === 0) {
            actives = null;
          }
        }

        if (actives) {
          activesData = $$$1(actives).not(this._selector).data(DATA_KEY);

          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        var startEvent = $$$1.Event(Event.SHOW);
        $$$1(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        if (actives) {
          Collapse._jQueryInterface.call($$$1(actives).not(this._selector), 'hide');

          if (!activesData) {
            $$$1(actives).data(DATA_KEY, null);
          }
        }

        var dimension = this._getDimension();

        $$$1(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
        this._element.style[dimension] = 0;

        if (this._triggerArray.length) {
          $$$1(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          $$$1(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);
          _this._element.style[dimension] = '';

          _this.setTransitioning(false);

          $$$1(_this._element).trigger(Event.SHOWN);
        };

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = "scroll" + capitalizedDimension;
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        this._element.style[dimension] = this._element[scrollSize] + "px";
      };

      _proto.hide = function hide() {
        var _this2 = this;

        if (this._isTransitioning || !$$$1(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var startEvent = $$$1.Event(Event.HIDE);
        $$$1(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        var dimension = this._getDimension();

        this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
        Util.reflow(this._element);
        $$$1(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);
        var triggerArrayLength = this._triggerArray.length;

        if (triggerArrayLength > 0) {
          for (var i = 0; i < triggerArrayLength; i++) {
            var trigger = this._triggerArray[i];
            var selector = Util.getSelectorFromElement(trigger);

            if (selector !== null) {
              var $elem = $$$1([].slice.call(document.querySelectorAll(selector)));

              if (!$elem.hasClass(ClassName.SHOW)) {
                $$$1(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
              }
            }
          }
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this2.setTransitioning(false);

          $$$1(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
        };

        this._element.style[dimension] = '';
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      };

      _proto.setTransitioning = function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerArray = null;
        this._isTransitioning = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        config.toggle = Boolean(config.toggle); // Coerce string values

        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._getDimension = function _getDimension() {
        var hasWidth = $$$1(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
      };

      _proto._getParent = function _getParent() {
        var _this3 = this;

        var parent = null;

        if (Util.isElement(this._config.parent)) {
          parent = this._config.parent; // It's a jQuery object

          if (typeof this._config.parent.jquery !== 'undefined') {
            parent = this._config.parent[0];
          }
        } else {
          parent = document.querySelector(this._config.parent);
        }

        var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
        var children = [].slice.call(parent.querySelectorAll(selector));
        $$$1(children).each(function (i, element) {
          _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
        });
        return parent;
      };

      _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
        if (element) {
          var isOpen = $$$1(element).hasClass(ClassName.SHOW);

          if (triggerArray.length) {
            $$$1(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
          }
        }
      }; // Static


      Collapse._getTargetFromElement = function _getTargetFromElement(element) {
        var selector = Util.getSelectorFromElement(element);
        return selector ? document.querySelector(selector) : null;
      };

      Collapse._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $$$1(this);
          var data = $this.data(DATA_KEY);

          var _config = _objectSpread({}, Default, $this.data(), _typeof(config) === 'object' && config ? config : {});

          if (!data && _config.toggle && /show|hide/.test(config)) {
            _config.toggle = false;
          }

          if (!data) {
            data = new Collapse(this, _config);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Collapse, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Collapse;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
      if (event.currentTarget.tagName === 'A') {
        event.preventDefault();
      }

      var $trigger = $$$1(this);
      var selector = Util.getSelectorFromElement(this);
      var selectors = [].slice.call(document.querySelectorAll(selector));
      $$$1(selectors).each(function () {
        var $target = $$$1(this);
        var data = $target.data(DATA_KEY);
        var config = data ? 'toggle' : $trigger.data();

        Collapse._jQueryInterface.call($target, config);
      });
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Collapse._jQueryInterface;
    $$$1.fn[NAME].Constructor = Collapse;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Collapse._jQueryInterface;
    };

    return Collapse;
  }($);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */


  var Dropdown = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'dropdown';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.dropdown';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

    var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

    var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

    var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

    var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

    var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
      KEYUP_DATA_API: "keyup" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DISABLED: 'disabled',
      SHOW: 'show',
      DROPUP: 'dropup',
      DROPRIGHT: 'dropright',
      DROPLEFT: 'dropleft',
      MENURIGHT: 'dropdown-menu-right',
      MENULEFT: 'dropdown-menu-left',
      POSITION_STATIC: 'position-static'
    };
    var Selector = {
      DATA_TOGGLE: '[data-toggle="dropdown"]',
      FORM_CHILD: '.dropdown form',
      MENU: '.dropdown-menu',
      NAVBAR_NAV: '.navbar-nav',
      VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
    };
    var AttachmentMap = {
      TOP: 'top-start',
      TOPEND: 'top-end',
      BOTTOM: 'bottom-start',
      BOTTOMEND: 'bottom-end',
      RIGHT: 'right-start',
      RIGHTEND: 'right-end',
      LEFT: 'left-start',
      LEFTEND: 'left-end'
    };
    var Default = {
      offset: 0,
      flip: true,
      boundary: 'scrollParent',
      reference: 'toggle',
      display: 'dynamic'
    };
    var DefaultType = {
      offset: '(number|string|function)',
      flip: 'boolean',
      boundary: '(string|element)',
      reference: '(string|element)',
      display: 'string'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Dropdown =
    /*#__PURE__*/
    function () {
      function Dropdown(element, config) {
        this._element = element;
        this._popper = null;
        this._config = this._getConfig(config);
        this._menu = this._getMenuElement();
        this._inNavbar = this._detectNavbar();

        this._addEventListeners();
      } // Getters


      var _proto = Dropdown.prototype; // Public

      _proto.toggle = function toggle() {
        if (this._element.disabled || $$$1(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this._element);

        var isActive = $$$1(this._menu).hasClass(ClassName.SHOW);

        Dropdown._clearMenus();

        if (isActive) {
          return;
        }

        var relatedTarget = {
          relatedTarget: this._element
        };
        var showEvent = $$$1.Event(Event.SHOW, relatedTarget);
        $$$1(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return;
        } // Disable totally Popper.js for Dropdown in Navbar


        if (!this._inNavbar) {
          /**
           * Check for Popper dependency
           * Popper - https://popper.js.org
           */
          if (typeof Popper === 'undefined') {
            throw new TypeError('Bootstrap dropdown require Popper.js (https://popper.js.org)');
          }

          var referenceElement = this._element;

          if (this._config.reference === 'parent') {
            referenceElement = parent;
          } else if (Util.isElement(this._config.reference)) {
            referenceElement = this._config.reference; // Check if it's jQuery element

            if (typeof this._config.reference.jquery !== 'undefined') {
              referenceElement = this._config.reference[0];
            }
          } // If boundary is not `scrollParent`, then set position to `static`
          // to allow the menu to "escape" the scroll parent's boundaries
          // https://github.com/twbs/bootstrap/issues/24251


          if (this._config.boundary !== 'scrollParent') {
            $$$1(parent).addClass(ClassName.POSITION_STATIC);
          }

          this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
        } // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


        if ('ontouchstart' in document.documentElement && $$$1(parent).closest(Selector.NAVBAR_NAV).length === 0) {
          $$$1(document.body).children().on('mouseover', null, $$$1.noop);
        }

        this._element.focus();

        this._element.setAttribute('aria-expanded', true);

        $$$1(this._menu).toggleClass(ClassName.SHOW);
        $$$1(parent).toggleClass(ClassName.SHOW).trigger($$$1.Event(Event.SHOWN, relatedTarget));
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(this._element).off(EVENT_KEY);
        this._element = null;
        this._menu = null;

        if (this._popper !== null) {
          this._popper.destroy();

          this._popper = null;
        }
      };

      _proto.update = function update() {
        this._inNavbar = this._detectNavbar();

        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      }; // Private


      _proto._addEventListeners = function _addEventListeners() {
        var _this = this;

        $$$1(this._element).on(Event.CLICK, function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this.toggle();
        });
      };

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, $$$1(this._element).data(), config);
        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
      };

      _proto._getMenuElement = function _getMenuElement() {
        if (!this._menu) {
          var parent = Dropdown._getParentFromElement(this._element);

          if (parent) {
            this._menu = parent.querySelector(Selector.MENU);
          }
        }

        return this._menu;
      };

      _proto._getPlacement = function _getPlacement() {
        var $parentDropdown = $$$1(this._element.parentNode);
        var placement = AttachmentMap.BOTTOM; // Handle dropup

        if ($parentDropdown.hasClass(ClassName.DROPUP)) {
          placement = AttachmentMap.TOP;

          if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
            placement = AttachmentMap.TOPEND;
          }
        } else if ($parentDropdown.hasClass(ClassName.DROPRIGHT)) {
          placement = AttachmentMap.RIGHT;
        } else if ($parentDropdown.hasClass(ClassName.DROPLEFT)) {
          placement = AttachmentMap.LEFT;
        } else if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
          placement = AttachmentMap.BOTTOMEND;
        }

        return placement;
      };

      _proto._detectNavbar = function _detectNavbar() {
        return $$$1(this._element).closest('.navbar').length > 0;
      };

      _proto._getPopperConfig = function _getPopperConfig() {
        var _this2 = this;

        var offsetConf = {};

        if (typeof this._config.offset === 'function') {
          offsetConf.fn = function (data) {
            data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets) || {});
            return data;
          };
        } else {
          offsetConf.offset = this._config.offset;
        }

        var popperConfig = {
          placement: this._getPlacement(),
          modifiers: {
            offset: offsetConf,
            flip: {
              enabled: this._config.flip
            },
            preventOverflow: {
              boundariesElement: this._config.boundary
            } // Disable Popper.js if we have a static display

          }
        };

        if (this._config.display === 'static') {
          popperConfig.modifiers.applyStyle = {
            enabled: false
          };
        }

        return popperConfig;
      }; // Static


      Dropdown._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = _typeof(config) === 'object' ? config : null;

          if (!data) {
            data = new Dropdown(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      Dropdown._clearMenus = function _clearMenus(event) {
        if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
          return;
        }

        var toggles = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));

        for (var i = 0, len = toggles.length; i < len; i++) {
          var parent = Dropdown._getParentFromElement(toggles[i]);

          var context = $$$1(toggles[i]).data(DATA_KEY);
          var relatedTarget = {
            relatedTarget: toggles[i]
          };

          if (event && event.type === 'click') {
            relatedTarget.clickEvent = event;
          }

          if (!context) {
            continue;
          }

          var dropdownMenu = context._menu;

          if (!$$$1(parent).hasClass(ClassName.SHOW)) {
            continue;
          }

          if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $$$1.contains(parent, event.target)) {
            continue;
          }

          var hideEvent = $$$1.Event(Event.HIDE, relatedTarget);
          $$$1(parent).trigger(hideEvent);

          if (hideEvent.isDefaultPrevented()) {
            continue;
          } // If this is a touch-enabled device we remove the extra
          // empty mouseover listeners we added for iOS support


          if ('ontouchstart' in document.documentElement) {
            $$$1(document.body).children().off('mouseover', null, $$$1.noop);
          }

          toggles[i].setAttribute('aria-expanded', 'false');
          $$$1(dropdownMenu).removeClass(ClassName.SHOW);
          $$$1(parent).removeClass(ClassName.SHOW).trigger($$$1.Event(Event.HIDDEN, relatedTarget));
        }
      };

      Dropdown._getParentFromElement = function _getParentFromElement(element) {
        var parent;
        var selector = Util.getSelectorFromElement(element);

        if (selector) {
          parent = document.querySelector(selector);
        }

        return parent || element.parentNode;
      }; // eslint-disable-next-line complexity


      Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
        // If not input/textarea:
        //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
        // If input/textarea:
        //  - If space key => not a dropdown command
        //  - If key is other than escape
        //    - If key is not up or down => not a dropdown command
        //    - If trigger inside the menu => not a dropdown command
        if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $$$1(event.target).closest(Selector.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || $$$1(this).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this);

        var isActive = $$$1(parent).hasClass(ClassName.SHOW);

        if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
          if (event.which === ESCAPE_KEYCODE) {
            var toggle = parent.querySelector(Selector.DATA_TOGGLE);
            $$$1(toggle).trigger('focus');
          }

          $$$1(this).trigger('click');
          return;
        }

        var items = [].slice.call(parent.querySelectorAll(Selector.VISIBLE_ITEMS));

        if (items.length === 0) {
          return;
        }

        var index = items.indexOf(event.target);

        if (event.which === ARROW_UP_KEYCODE && index > 0) {
          // Up
          index--;
        }

        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
          // Down
          index++;
        }

        if (index < 0) {
          index = 0;
        }

        items[index].focus();
      };

      _createClass(Dropdown, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Dropdown;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();
      event.stopPropagation();

      Dropdown._jQueryInterface.call($$$1(this), 'toggle');
    }).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
      e.stopPropagation();
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Dropdown._jQueryInterface;
    $$$1.fn[NAME].Constructor = Dropdown;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Dropdown._jQueryInterface;
    };

    return Dropdown;
  }($, Popper);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */


  var Modal = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'modal';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.modal';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var Default = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true
    };
    var DefaultType = {
      backdrop: '(boolean|string)',
      keyboard: 'boolean',
      focus: 'boolean',
      show: 'boolean'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      RESIZE: "resize" + EVENT_KEY,
      CLICK_DISMISS: "click.dismiss" + EVENT_KEY,
      KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY,
      MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY,
      MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
      BACKDROP: 'modal-backdrop',
      OPEN: 'modal-open',
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      DIALOG: '.modal-dialog',
      DATA_TOGGLE: '[data-toggle="modal"]',
      DATA_DISMISS: '[data-dismiss="modal"]',
      FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
      STICKY_CONTENT: '.sticky-top'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Modal =
    /*#__PURE__*/
    function () {
      function Modal(element, config) {
        this._config = this._getConfig(config);
        this._element = element;
        this._dialog = element.querySelector(Selector.DIALOG);
        this._backdrop = null;
        this._isShown = false;
        this._isBodyOverflowing = false;
        this._ignoreBackdropClick = false;
        this._scrollbarWidth = 0;
      } // Getters


      var _proto = Modal.prototype; // Public

      _proto.toggle = function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      };

      _proto.show = function show(relatedTarget) {
        var _this = this;

        if (this._isTransitioning || this._isShown) {
          return;
        }

        if ($$$1(this._element).hasClass(ClassName.FADE)) {
          this._isTransitioning = true;
        }

        var showEvent = $$$1.Event(Event.SHOW, {
          relatedTarget: relatedTarget
        });
        $$$1(this._element).trigger(showEvent);

        if (this._isShown || showEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = true;

        this._checkScrollbar();

        this._setScrollbar();

        this._adjustDialog();

        $$$1(document.body).addClass(ClassName.OPEN);

        this._setEscapeEvent();

        this._setResizeEvent();

        $$$1(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
          return _this.hide(event);
        });
        $$$1(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
          $$$1(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
            if ($$$1(event.target).is(_this._element)) {
              _this._ignoreBackdropClick = true;
            }
          });
        });

        this._showBackdrop(function () {
          return _this._showElement(relatedTarget);
        });
      };

      _proto.hide = function hide(event) {
        var _this2 = this;

        if (event) {
          event.preventDefault();
        }

        if (this._isTransitioning || !this._isShown) {
          return;
        }

        var hideEvent = $$$1.Event(Event.HIDE);
        $$$1(this._element).trigger(hideEvent);

        if (!this._isShown || hideEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = false;
        var transition = $$$1(this._element).hasClass(ClassName.FADE);

        if (transition) {
          this._isTransitioning = true;
        }

        this._setEscapeEvent();

        this._setResizeEvent();

        $$$1(document).off(Event.FOCUSIN);
        $$$1(this._element).removeClass(ClassName.SHOW);
        $$$1(this._element).off(Event.CLICK_DISMISS);
        $$$1(this._dialog).off(Event.MOUSEDOWN_DISMISS);

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $$$1(this._element).one(Util.TRANSITION_END, function (event) {
            return _this2._hideModal(event);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          this._hideModal();
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(window, document, this._element, this._backdrop).off(EVENT_KEY);
        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isShown = null;
        this._isBodyOverflowing = null;
        this._ignoreBackdropClick = null;
        this._scrollbarWidth = null;
      };

      _proto.handleUpdate = function handleUpdate() {
        this._adjustDialog();
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._showElement = function _showElement(relatedTarget) {
        var _this3 = this;

        var transition = $$$1(this._element).hasClass(ClassName.FADE);

        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
          // Don't move modal's DOM position
          document.body.appendChild(this._element);
        }

        this._element.style.display = 'block';

        this._element.removeAttribute('aria-hidden');

        this._element.scrollTop = 0;

        if (transition) {
          Util.reflow(this._element);
        }

        $$$1(this._element).addClass(ClassName.SHOW);

        if (this._config.focus) {
          this._enforceFocus();
        }

        var shownEvent = $$$1.Event(Event.SHOWN, {
          relatedTarget: relatedTarget
        });

        var transitionComplete = function transitionComplete() {
          if (_this3._config.focus) {
            _this3._element.focus();
          }

          _this3._isTransitioning = false;
          $$$1(_this3._element).trigger(shownEvent);
        };

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $$$1(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
        } else {
          transitionComplete();
        }
      };

      _proto._enforceFocus = function _enforceFocus() {
        var _this4 = this;

        $$$1(document).off(Event.FOCUSIN) // Guard against infinite focus loop
        .on(Event.FOCUSIN, function (event) {
          if (document !== event.target && _this4._element !== event.target && $$$1(_this4._element).has(event.target).length === 0) {
            _this4._element.focus();
          }
        });
      };

      _proto._setEscapeEvent = function _setEscapeEvent() {
        var _this5 = this;

        if (this._isShown && this._config.keyboard) {
          $$$1(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
            if (event.which === ESCAPE_KEYCODE) {
              event.preventDefault();

              _this5.hide();
            }
          });
        } else if (!this._isShown) {
          $$$1(this._element).off(Event.KEYDOWN_DISMISS);
        }
      };

      _proto._setResizeEvent = function _setResizeEvent() {
        var _this6 = this;

        if (this._isShown) {
          $$$1(window).on(Event.RESIZE, function (event) {
            return _this6.handleUpdate(event);
          });
        } else {
          $$$1(window).off(Event.RESIZE);
        }
      };

      _proto._hideModal = function _hideModal() {
        var _this7 = this;

        this._element.style.display = 'none';

        this._element.setAttribute('aria-hidden', true);

        this._isTransitioning = false;

        this._showBackdrop(function () {
          $$$1(document.body).removeClass(ClassName.OPEN);

          _this7._resetAdjustments();

          _this7._resetScrollbar();

          $$$1(_this7._element).trigger(Event.HIDDEN);
        });
      };

      _proto._removeBackdrop = function _removeBackdrop() {
        if (this._backdrop) {
          $$$1(this._backdrop).remove();
          this._backdrop = null;
        }
      };

      _proto._showBackdrop = function _showBackdrop(callback) {
        var _this8 = this;

        var animate = $$$1(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

        if (this._isShown && this._config.backdrop) {
          this._backdrop = document.createElement('div');
          this._backdrop.className = ClassName.BACKDROP;

          if (animate) {
            this._backdrop.classList.add(animate);
          }

          $$$1(this._backdrop).appendTo(document.body);
          $$$1(this._element).on(Event.CLICK_DISMISS, function (event) {
            if (_this8._ignoreBackdropClick) {
              _this8._ignoreBackdropClick = false;
              return;
            }

            if (event.target !== event.currentTarget) {
              return;
            }

            if (_this8._config.backdrop === 'static') {
              _this8._element.focus();
            } else {
              _this8.hide();
            }
          });

          if (animate) {
            Util.reflow(this._backdrop);
          }

          $$$1(this._backdrop).addClass(ClassName.SHOW);

          if (!callback) {
            return;
          }

          if (!animate) {
            callback();
            return;
          }

          var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
          $$$1(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
        } else if (!this._isShown && this._backdrop) {
          $$$1(this._backdrop).removeClass(ClassName.SHOW);

          var callbackRemove = function callbackRemove() {
            _this8._removeBackdrop();

            if (callback) {
              callback();
            }
          };

          if ($$$1(this._element).hasClass(ClassName.FADE)) {
            var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

            $$$1(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
          } else {
            callbackRemove();
          }
        } else if (callback) {
          callback();
        }
      }; // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // todo (fat): these should probably be refactored out of modal.js
      // ----------------------------------------------------------------------


      _proto._adjustDialog = function _adjustDialog() {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!this._isBodyOverflowing && isModalOverflowing) {
          this._element.style.paddingLeft = this._scrollbarWidth + "px";
        }

        if (this._isBodyOverflowing && !isModalOverflowing) {
          this._element.style.paddingRight = this._scrollbarWidth + "px";
        }
      };

      _proto._resetAdjustments = function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      };

      _proto._checkScrollbar = function _checkScrollbar() {
        var rect = document.body.getBoundingClientRect();
        this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
      };

      _proto._setScrollbar = function _setScrollbar() {
        var _this9 = this;

        if (this._isBodyOverflowing) {
          // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
          //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
          var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
          var stickyContent = [].slice.call(document.querySelectorAll(Selector.STICKY_CONTENT)); // Adjust fixed content padding

          $$$1(fixedContent).each(function (index, element) {
            var actualPadding = element.style.paddingRight;
            var calculatedPadding = $$$1(element).css('padding-right');
            $$$1(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
          }); // Adjust sticky content margin

          $$$1(stickyContent).each(function (index, element) {
            var actualMargin = element.style.marginRight;
            var calculatedMargin = $$$1(element).css('margin-right');
            $$$1(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
          }); // Adjust body padding

          var actualPadding = document.body.style.paddingRight;
          var calculatedPadding = $$$1(document.body).css('padding-right');
          $$$1(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
        }
      };

      _proto._resetScrollbar = function _resetScrollbar() {
        // Restore fixed content padding
        var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
        $$$1(fixedContent).each(function (index, element) {
          var padding = $$$1(element).data('padding-right');
          $$$1(element).removeData('padding-right');
          element.style.paddingRight = padding ? padding : '';
        }); // Restore sticky content

        var elements = [].slice.call(document.querySelectorAll("" + Selector.STICKY_CONTENT));
        $$$1(elements).each(function (index, element) {
          var margin = $$$1(element).data('margin-right');

          if (typeof margin !== 'undefined') {
            $$$1(element).css('margin-right', margin).removeData('margin-right');
          }
        }); // Restore body padding

        var padding = $$$1(document.body).data('padding-right');
        $$$1(document.body).removeData('padding-right');
        document.body.style.paddingRight = padding ? padding : '';
      };

      _proto._getScrollbarWidth = function _getScrollbarWidth() {
        // thx d.walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      }; // Static


      Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = _objectSpread({}, Default, $$$1(this).data(), _typeof(config) === 'object' && config ? config : {});

          if (!data) {
            data = new Modal(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config](relatedTarget);
          } else if (_config.show) {
            data.show(relatedTarget);
          }
        });
      };

      _createClass(Modal, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Modal;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      var _this10 = this;

      var target;
      var selector = Util.getSelectorFromElement(this);

      if (selector) {
        target = document.querySelector(selector);
      }

      var config = $$$1(target).data(DATA_KEY) ? 'toggle' : _objectSpread({}, $$$1(target).data(), $$$1(this).data());

      if (this.tagName === 'A' || this.tagName === 'AREA') {
        event.preventDefault();
      }

      var $target = $$$1(target).one(Event.SHOW, function (showEvent) {
        if (showEvent.isDefaultPrevented()) {
          // Only register focus restorer if modal will actually get shown
          return;
        }

        $target.one(Event.HIDDEN, function () {
          if ($$$1(_this10).is(':visible')) {
            _this10.focus();
          }
        });
      });

      Modal._jQueryInterface.call($$$1(target), config, this);
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Modal._jQueryInterface;
    $$$1.fn[NAME].Constructor = Modal;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Modal._jQueryInterface;
    };

    return Modal;
  }($);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */


  var Tooltip = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'tooltip';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.tooltip';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var CLASS_PREFIX = 'bs-tooltip';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
    var DefaultType = {
      animation: 'boolean',
      template: 'string',
      title: '(string|element|function)',
      trigger: 'string',
      delay: '(number|object)',
      html: 'boolean',
      selector: '(string|boolean)',
      placement: '(string|function)',
      offset: '(number|string)',
      container: '(string|element|boolean)',
      fallbackPlacement: '(string|array)',
      boundary: '(string|element)'
    };
    var AttachmentMap = {
      AUTO: 'auto',
      TOP: 'top',
      RIGHT: 'right',
      BOTTOM: 'bottom',
      LEFT: 'left'
    };
    var Default = {
      animation: true,
      template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
      trigger: 'hover focus',
      title: '',
      delay: 0,
      html: false,
      selector: false,
      placement: 'top',
      offset: 0,
      container: false,
      fallbackPlacement: 'flip',
      boundary: 'scrollParent'
    };
    var HoverState = {
      SHOW: 'show',
      OUT: 'out'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      INSERTED: "inserted" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      FOCUSOUT: "focusout" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY
    };
    var ClassName = {
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      TOOLTIP: '.tooltip',
      TOOLTIP_INNER: '.tooltip-inner',
      ARROW: '.arrow'
    };
    var Trigger = {
      HOVER: 'hover',
      FOCUS: 'focus',
      CLICK: 'click',
      MANUAL: 'manual'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Tooltip =
    /*#__PURE__*/
    function () {
      function Tooltip(element, config) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap tooltips require Popper.js (https://popper.js.org)');
        } // private


        this._isEnabled = true;
        this._timeout = 0;
        this._hoverState = '';
        this._activeTrigger = {};
        this._popper = null; // Protected

        this.element = element;
        this.config = this._getConfig(config);
        this.tip = null;

        this._setListeners();
      } // Getters


      var _proto = Tooltip.prototype; // Public

      _proto.enable = function enable() {
        this._isEnabled = true;
      };

      _proto.disable = function disable() {
        this._isEnabled = false;
      };

      _proto.toggleEnabled = function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      };

      _proto.toggle = function toggle(event) {
        if (!this._isEnabled) {
          return;
        }

        if (event) {
          var dataKey = this.constructor.DATA_KEY;
          var context = $$$1(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $$$1(event.currentTarget).data(dataKey, context);
          }

          context._activeTrigger.click = !context._activeTrigger.click;

          if (context._isWithActiveTrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {
          if ($$$1(this.getTipElement()).hasClass(ClassName.SHOW)) {
            this._leave(null, this);

            return;
          }

          this._enter(null, this);
        }
      };

      _proto.dispose = function dispose() {
        clearTimeout(this._timeout);
        $$$1.removeData(this.element, this.constructor.DATA_KEY);
        $$$1(this.element).off(this.constructor.EVENT_KEY);
        $$$1(this.element).closest('.modal').off('hide.bs.modal');

        if (this.tip) {
          $$$1(this.tip).remove();
        }

        this._isEnabled = null;
        this._timeout = null;
        this._hoverState = null;
        this._activeTrigger = null;

        if (this._popper !== null) {
          this._popper.destroy();
        }

        this._popper = null;
        this.element = null;
        this.config = null;
        this.tip = null;
      };

      _proto.show = function show() {
        var _this = this;

        if ($$$1(this.element).css('display') === 'none') {
          throw new Error('Please use show on visible elements');
        }

        var showEvent = $$$1.Event(this.constructor.Event.SHOW);

        if (this.isWithContent() && this._isEnabled) {
          $$$1(this.element).trigger(showEvent);
          var isInTheDom = $$$1.contains(this.element.ownerDocument.documentElement, this.element);

          if (showEvent.isDefaultPrevented() || !isInTheDom) {
            return;
          }

          var tip = this.getTipElement();
          var tipId = Util.getUID(this.constructor.NAME);
          tip.setAttribute('id', tipId);
          this.element.setAttribute('aria-describedby', tipId);
          this.setContent();

          if (this.config.animation) {
            $$$1(tip).addClass(ClassName.FADE);
          }

          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

          var attachment = this._getAttachment(placement);

          this.addAttachmentClass(attachment);
          var container = this.config.container === false ? document.body : $$$1(document).find(this.config.container);
          $$$1(tip).data(this.constructor.DATA_KEY, this);

          if (!$$$1.contains(this.element.ownerDocument.documentElement, this.tip)) {
            $$$1(tip).appendTo(container);
          }

          $$$1(this.element).trigger(this.constructor.Event.INSERTED);
          this._popper = new Popper(this.element, tip, {
            placement: attachment,
            modifiers: {
              offset: {
                offset: this.config.offset
              },
              flip: {
                behavior: this.config.fallbackPlacement
              },
              arrow: {
                element: Selector.ARROW
              },
              preventOverflow: {
                boundariesElement: this.config.boundary
              }
            },
            onCreate: function onCreate(data) {
              if (data.originalPlacement !== data.placement) {
                _this._handlePopperPlacementChange(data);
              }
            },
            onUpdate: function onUpdate(data) {
              _this._handlePopperPlacementChange(data);
            }
          });
          $$$1(tip).addClass(ClassName.SHOW); // If this is a touch-enabled device we add extra
          // empty mouseover listeners to the body's immediate children;
          // only needed because of broken event delegation on iOS
          // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

          if ('ontouchstart' in document.documentElement) {
            $$$1(document.body).children().on('mouseover', null, $$$1.noop);
          }

          var complete = function complete() {
            if (_this.config.animation) {
              _this._fixTransition();
            }

            var prevHoverState = _this._hoverState;
            _this._hoverState = null;
            $$$1(_this.element).trigger(_this.constructor.Event.SHOWN);

            if (prevHoverState === HoverState.OUT) {
              _this._leave(null, _this);
            }
          };

          if ($$$1(this.tip).hasClass(ClassName.FADE)) {
            var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
            $$$1(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
          } else {
            complete();
          }
        }
      };

      _proto.hide = function hide(callback) {
        var _this2 = this;

        var tip = this.getTipElement();
        var hideEvent = $$$1.Event(this.constructor.Event.HIDE);

        var complete = function complete() {
          if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
            tip.parentNode.removeChild(tip);
          }

          _this2._cleanTipClass();

          _this2.element.removeAttribute('aria-describedby');

          $$$1(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

          if (_this2._popper !== null) {
            _this2._popper.destroy();
          }

          if (callback) {
            callback();
          }
        };

        $$$1(this.element).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          return;
        }

        $$$1(tip).removeClass(ClassName.SHOW); // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support

        if ('ontouchstart' in document.documentElement) {
          $$$1(document.body).children().off('mouseover', null, $$$1.noop);
        }

        this._activeTrigger[Trigger.CLICK] = false;
        this._activeTrigger[Trigger.FOCUS] = false;
        this._activeTrigger[Trigger.HOVER] = false;

        if ($$$1(this.tip).hasClass(ClassName.FADE)) {
          var transitionDuration = Util.getTransitionDurationFromElement(tip);
          $$$1(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }

        this._hoverState = '';
      };

      _proto.update = function update() {
        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      }; // Protected


      _proto.isWithContent = function isWithContent() {
        return Boolean(this.getTitle());
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $$$1(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var tip = this.getTipElement();
        this.setElementContent($$$1(tip.querySelectorAll(Selector.TOOLTIP_INNER)), this.getTitle());
        $$$1(tip).removeClass(ClassName.FADE + " " + ClassName.SHOW);
      };

      _proto.setElementContent = function setElementContent($element, content) {
        var html = this.config.html;

        if (_typeof(content) === 'object' && (content.nodeType || content.jquery)) {
          // Content is a DOM node or a jQuery
          if (html) {
            if (!$$$1(content).parent().is($element)) {
              $element.empty().append(content);
            }
          } else {
            $element.text($$$1(content).text());
          }
        } else {
          $element[html ? 'html' : 'text'](content);
        }
      };

      _proto.getTitle = function getTitle() {
        var title = this.element.getAttribute('data-original-title');

        if (!title) {
          title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
        }

        return title;
      }; // Private


      _proto._getAttachment = function _getAttachment(placement) {
        return AttachmentMap[placement.toUpperCase()];
      };

      _proto._setListeners = function _setListeners() {
        var _this3 = this;

        var triggers = this.config.trigger.split(' ');
        triggers.forEach(function (trigger) {
          if (trigger === 'click') {
            $$$1(_this3.element).on(_this3.constructor.Event.CLICK, _this3.config.selector, function (event) {
              return _this3.toggle(event);
            });
          } else if (trigger !== Trigger.MANUAL) {
            var eventIn = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
            var eventOut = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;
            $$$1(_this3.element).on(eventIn, _this3.config.selector, function (event) {
              return _this3._enter(event);
            }).on(eventOut, _this3.config.selector, function (event) {
              return _this3._leave(event);
            });
          }

          $$$1(_this3.element).closest('.modal').on('hide.bs.modal', function () {
            return _this3.hide();
          });
        });

        if (this.config.selector) {
          this.config = _objectSpread({}, this.config, {
            trigger: 'manual',
            selector: ''
          });
        } else {
          this._fixTitle();
        }
      };

      _proto._fixTitle = function _fixTitle() {
        var titleType = _typeof(this.element.getAttribute('data-original-title'));

        if (this.element.getAttribute('title') || titleType !== 'string') {
          this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
          this.element.setAttribute('title', '');
        }
      };

      _proto._enter = function _enter(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || $$$1(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $$$1(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
        }

        if ($$$1(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
          context._hoverState = HoverState.SHOW;
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.SHOW;

        if (!context.config.delay || !context.config.delay.show) {
          context.show();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.SHOW) {
            context.show();
          }
        }, context.config.delay.show);
      };

      _proto._leave = function _leave(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || $$$1(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $$$1(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
        }

        if (context._isWithActiveTrigger()) {
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.OUT;

        if (!context.config.delay || !context.config.delay.hide) {
          context.hide();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.OUT) {
            context.hide();
          }
        }, context.config.delay.hide);
      };

      _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
        for (var trigger in this._activeTrigger) {
          if (this._activeTrigger[trigger]) {
            return true;
          }
        }

        return false;
      };

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, $$$1(this.element).data(), _typeof(config) === 'object' && config ? config : {});

        if (typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }

        if (typeof config.title === 'number') {
          config.title = config.title.toString();
        }

        if (typeof config.content === 'number') {
          config.content = config.content.toString();
        }

        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
      };

      _proto._getDelegateConfig = function _getDelegateConfig() {
        var config = {};

        if (this.config) {
          for (var key in this.config) {
            if (this.constructor.Default[key] !== this.config[key]) {
              config[key] = this.config[key];
            }
          }
        }

        return config;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $$$1(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length) {
          $tip.removeClass(tabClass.join(''));
        }
      };

      _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
        var popperInstance = popperData.instance;
        this.tip = popperInstance.popper;

        this._cleanTipClass();

        this.addAttachmentClass(this._getAttachment(popperData.placement));
      };

      _proto._fixTransition = function _fixTransition() {
        var tip = this.getTipElement();
        var initConfigAnimation = this.config.animation;

        if (tip.getAttribute('x-placement') !== null) {
          return;
        }

        $$$1(tip).removeClass(ClassName.FADE);
        this.config.animation = false;
        this.hide();
        this.show();
        this.config.animation = initConfigAnimation;
      }; // Static


      Tooltip._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = _typeof(config) === 'object' && config;

          if (!data && /dispose|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Tooltip(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tooltip, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Tooltip;
    }();
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[NAME] = Tooltip._jQueryInterface;
    $$$1.fn[NAME].Constructor = Tooltip;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tooltip._jQueryInterface;
    };

    return Tooltip;
  }($, Popper);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */


  var Popover = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'popover';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.popover';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var CLASS_PREFIX = 'bs-popover';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');

    var Default = _objectSpread({}, Tooltip.Default, {
      placement: 'right',
      trigger: 'click',
      content: '',
      template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
    });

    var DefaultType = _objectSpread({}, Tooltip.DefaultType, {
      content: '(string|element|function)'
    });

    var ClassName = {
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      TITLE: '.popover-header',
      CONTENT: '.popover-body'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      INSERTED: "inserted" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      FOCUSOUT: "focusout" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Popover =
    /*#__PURE__*/
    function (_Tooltip) {
      _inheritsLoose(Popover, _Tooltip);

      function Popover() {
        return _Tooltip.apply(this, arguments) || this;
      }

      var _proto = Popover.prototype; // Overrides

      _proto.isWithContent = function isWithContent() {
        return this.getTitle() || this._getContent();
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $$$1(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var $tip = $$$1(this.getTipElement()); // We use append for html objects to maintain js events

        this.setElementContent($tip.find(Selector.TITLE), this.getTitle());

        var content = this._getContent();

        if (typeof content === 'function') {
          content = content.call(this.element);
        }

        this.setElementContent($tip.find(Selector.CONTENT), content);
        $tip.removeClass(ClassName.FADE + " " + ClassName.SHOW);
      }; // Private


      _proto._getContent = function _getContent() {
        return this.element.getAttribute('data-content') || this.config.content;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $$$1(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length > 0) {
          $tip.removeClass(tabClass.join(''));
        }
      }; // Static


      Popover._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = _typeof(config) === 'object' ? config : null;

          if (!data && /destroy|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Popover(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Popover, null, [{
        key: "VERSION",
        // Getters
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Popover;
    }(Tooltip);
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[NAME] = Popover._jQueryInterface;
    $$$1.fn[NAME].Constructor = Popover;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Popover._jQueryInterface;
    };

    return Popover;
  }($);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */


  var ScrollSpy = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'scrollspy';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.scrollspy';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Default = {
      offset: 10,
      method: 'auto',
      target: ''
    };
    var DefaultType = {
      offset: 'number',
      method: 'string',
      target: '(string|element)'
    };
    var Event = {
      ACTIVATE: "activate" + EVENT_KEY,
      SCROLL: "scroll" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DROPDOWN_ITEM: 'dropdown-item',
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active'
    };
    var Selector = {
      DATA_SPY: '[data-spy="scroll"]',
      ACTIVE: '.active',
      NAV_LIST_GROUP: '.nav, .list-group',
      NAV_LINKS: '.nav-link',
      NAV_ITEMS: '.nav-item',
      LIST_ITEMS: '.list-group-item',
      DROPDOWN: '.dropdown',
      DROPDOWN_ITEMS: '.dropdown-item',
      DROPDOWN_TOGGLE: '.dropdown-toggle'
    };
    var OffsetMethod = {
      OFFSET: 'offset',
      POSITION: 'position'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var ScrollSpy =
    /*#__PURE__*/
    function () {
      function ScrollSpy(element, config) {
        var _this = this;

        this._element = element;
        this._scrollElement = element.tagName === 'BODY' ? window : element;
        this._config = this._getConfig(config);
        this._selector = this._config.target + " " + Selector.NAV_LINKS + "," + (this._config.target + " " + Selector.LIST_ITEMS + ",") + (this._config.target + " " + Selector.DROPDOWN_ITEMS);
        this._offsets = [];
        this._targets = [];
        this._activeTarget = null;
        this._scrollHeight = 0;
        $$$1(this._scrollElement).on(Event.SCROLL, function (event) {
          return _this._process(event);
        });
        this.refresh();

        this._process();
      } // Getters


      var _proto = ScrollSpy.prototype; // Public

      _proto.refresh = function refresh() {
        var _this2 = this;

        var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
        var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
        this._offsets = [];
        this._targets = [];
        this._scrollHeight = this._getScrollHeight();
        var targets = [].slice.call(document.querySelectorAll(this._selector));
        targets.map(function (element) {
          var target;
          var targetSelector = Util.getSelectorFromElement(element);

          if (targetSelector) {
            target = document.querySelector(targetSelector);
          }

          if (target) {
            var targetBCR = target.getBoundingClientRect();

            if (targetBCR.width || targetBCR.height) {
              // TODO (fat): remove sketch reliance on jQuery position/offset
              return [$$$1(target)[offsetMethod]().top + offsetBase, targetSelector];
            }
          }

          return null;
        }).filter(function (item) {
          return item;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).forEach(function (item) {
          _this2._offsets.push(item[0]);

          _this2._targets.push(item[1]);
        });
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(this._scrollElement).off(EVENT_KEY);
        this._element = null;
        this._scrollElement = null;
        this._config = null;
        this._selector = null;
        this._offsets = null;
        this._targets = null;
        this._activeTarget = null;
        this._scrollHeight = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, _typeof(config) === 'object' && config ? config : {});

        if (typeof config.target !== 'string') {
          var id = $$$1(config.target).attr('id');

          if (!id) {
            id = Util.getUID(NAME);
            $$$1(config.target).attr('id', id);
          }

          config.target = "#" + id;
        }

        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._getScrollTop = function _getScrollTop() {
        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
      };

      _proto._getScrollHeight = function _getScrollHeight() {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      };

      _proto._getOffsetHeight = function _getOffsetHeight() {
        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
      };

      _proto._process = function _process() {
        var scrollTop = this._getScrollTop() + this._config.offset;

        var scrollHeight = this._getScrollHeight();

        var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

        if (this._scrollHeight !== scrollHeight) {
          this.refresh();
        }

        if (scrollTop >= maxScroll) {
          var target = this._targets[this._targets.length - 1];

          if (this._activeTarget !== target) {
            this._activate(target);
          }

          return;
        }

        if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
          this._activeTarget = null;

          this._clear();

          return;
        }

        var offsetLength = this._offsets.length;

        for (var i = offsetLength; i--;) {
          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

          if (isActiveTarget) {
            this._activate(this._targets[i]);
          }
        }
      };

      _proto._activate = function _activate(target) {
        this._activeTarget = target;

        this._clear();

        var queries = this._selector.split(','); // eslint-disable-next-line arrow-body-style


        queries = queries.map(function (selector) {
          return selector + "[data-target=\"" + target + "\"]," + (selector + "[href=\"" + target + "\"]");
        });
        var $link = $$$1([].slice.call(document.querySelectorAll(queries.join(','))));

        if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
          $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          $link.addClass(ClassName.ACTIVE);
        } else {
          // Set triggered link as active
          $link.addClass(ClassName.ACTIVE); // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

          $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_LINKS + ", " + Selector.LIST_ITEMS).addClass(ClassName.ACTIVE); // Handle special case when .nav-link is inside .nav-item

          $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_ITEMS).children(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
        }

        $$$1(this._scrollElement).trigger(Event.ACTIVATE, {
          relatedTarget: target
        });
      };

      _proto._clear = function _clear() {
        var nodes = [].slice.call(document.querySelectorAll(this._selector));
        $$$1(nodes).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
      }; // Static


      ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = _typeof(config) === 'object' && config;

          if (!data) {
            data = new ScrollSpy(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(ScrollSpy, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return ScrollSpy;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(window).on(Event.LOAD_DATA_API, function () {
      var scrollSpys = [].slice.call(document.querySelectorAll(Selector.DATA_SPY));
      var scrollSpysLength = scrollSpys.length;

      for (var i = scrollSpysLength; i--;) {
        var $spy = $$$1(scrollSpys[i]);

        ScrollSpy._jQueryInterface.call($spy, $spy.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = ScrollSpy._jQueryInterface;
    $$$1.fn[NAME].Constructor = ScrollSpy;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return ScrollSpy._jQueryInterface;
    };

    return ScrollSpy;
  }($);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */


  var Tab = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'tab';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.tab';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active',
      DISABLED: 'disabled',
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      DROPDOWN: '.dropdown',
      NAV_LIST_GROUP: '.nav, .list-group',
      ACTIVE: '.active',
      ACTIVE_UL: '> li > .active',
      DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
      DROPDOWN_TOGGLE: '.dropdown-toggle',
      DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Tab =
    /*#__PURE__*/
    function () {
      function Tab(element) {
        this._element = element;
      } // Getters


      var _proto = Tab.prototype; // Public

      _proto.show = function show() {
        var _this = this;

        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $$$1(this._element).hasClass(ClassName.ACTIVE) || $$$1(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var target;
        var previous;
        var listElement = $$$1(this._element).closest(Selector.NAV_LIST_GROUP)[0];
        var selector = Util.getSelectorFromElement(this._element);

        if (listElement) {
          var itemSelector = listElement.nodeName === 'UL' ? Selector.ACTIVE_UL : Selector.ACTIVE;
          previous = $$$1.makeArray($$$1(listElement).find(itemSelector));
          previous = previous[previous.length - 1];
        }

        var hideEvent = $$$1.Event(Event.HIDE, {
          relatedTarget: this._element
        });
        var showEvent = $$$1.Event(Event.SHOW, {
          relatedTarget: previous
        });

        if (previous) {
          $$$1(previous).trigger(hideEvent);
        }

        $$$1(this._element).trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
          return;
        }

        if (selector) {
          target = document.querySelector(selector);
        }

        this._activate(this._element, listElement);

        var complete = function complete() {
          var hiddenEvent = $$$1.Event(Event.HIDDEN, {
            relatedTarget: _this._element
          });
          var shownEvent = $$$1.Event(Event.SHOWN, {
            relatedTarget: previous
          });
          $$$1(previous).trigger(hiddenEvent);
          $$$1(_this._element).trigger(shownEvent);
        };

        if (target) {
          this._activate(target, target.parentNode, complete);
        } else {
          complete();
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Private


      _proto._activate = function _activate(element, container, callback) {
        var _this2 = this;

        var activeElements;

        if (container.nodeName === 'UL') {
          activeElements = $$$1(container).find(Selector.ACTIVE_UL);
        } else {
          activeElements = $$$1(container).children(Selector.ACTIVE);
        }

        var active = activeElements[0];
        var isTransitioning = callback && active && $$$1(active).hasClass(ClassName.FADE);

        var complete = function complete() {
          return _this2._transitionComplete(element, active, callback);
        };

        if (active && isTransitioning) {
          var transitionDuration = Util.getTransitionDurationFromElement(active);
          $$$1(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      };

      _proto._transitionComplete = function _transitionComplete(element, active, callback) {
        if (active) {
          $$$1(active).removeClass(ClassName.SHOW + " " + ClassName.ACTIVE);
          var dropdownChild = $$$1(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

          if (dropdownChild) {
            $$$1(dropdownChild).removeClass(ClassName.ACTIVE);
          }

          if (active.getAttribute('role') === 'tab') {
            active.setAttribute('aria-selected', false);
          }
        }

        $$$1(element).addClass(ClassName.ACTIVE);

        if (element.getAttribute('role') === 'tab') {
          element.setAttribute('aria-selected', true);
        }

        Util.reflow(element);
        $$$1(element).addClass(ClassName.SHOW);

        if (element.parentNode && $$$1(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {
          var dropdownElement = $$$1(element).closest(Selector.DROPDOWN)[0];

          if (dropdownElement) {
            var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector.DROPDOWN_TOGGLE));
            $$$1(dropdownToggleList).addClass(ClassName.ACTIVE);
          }

          element.setAttribute('aria-expanded', true);
        }

        if (callback) {
          callback();
        }
      }; // Static


      Tab._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $$$1(this);
          var data = $this.data(DATA_KEY);

          if (!data) {
            data = new Tab(this);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tab, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Tab;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();

      Tab._jQueryInterface.call($$$1(this), 'show');
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Tab._jQueryInterface;
    $$$1.fn[NAME].Constructor = Tab;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tab._jQueryInterface;
    };

    return Tab;
  }($);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */


  (function ($$$1) {
    if (typeof $$$1 === 'undefined') {
      throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
    }

    var version = $$$1.fn.jquery.split(' ')[0].split('.');
    var minMajor = 1;
    var ltMajor = 2;
    var minMinor = 9;
    var minPatch = 1;
    var maxMajor = 4;

    if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
      throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
    }
  })($);

  exports.Util = Util;
  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Tooltip = Tooltip;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
"use strict";

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

(function webpackUniversalModuleDefinition(root, factory) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof2(exports)) === 'object' && (typeof module === "undefined" ? "undefined" : _typeof2(module)) === 'object') module.exports = factory(require("jquery"));else if (typeof define === 'function' && define.amd) define(["jquery"], factory);else {
    var a = (typeof exports === "undefined" ? "undefined" : _typeof2(exports)) === 'object' ? factory(require("jquery")) : factory(root["jQuery"]);

    for (var i in a) {
      ((typeof exports === "undefined" ? "undefined" : _typeof2(exports)) === 'object' ? exports : root)[i] = a[i];
    }
  }
})(window, function (__WEBPACK_EXTERNAL_MODULE_jquery__) {
  return (
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = {};
      /******/

      /******/
      // The require function

      /******/

      function __webpack_require__(moduleId) {
        /******/

        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId]) {
          /******/
          return installedModules[moduleId].exports;
          /******/
        }
        /******/
        // Create a new module (and put it into the cache)

        /******/


        var module = installedModules[moduleId] = {
          /******/
          i: moduleId,

          /******/
          l: false,

          /******/
          exports: {}
          /******/

        };
        /******/

        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/

        /******/
        // Flag the module as loaded

        /******/

        module.l = true;
        /******/

        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/

      /******/

      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __webpack_require__.m = modules;
      /******/

      /******/
      // expose the module cache

      /******/

      __webpack_require__.c = installedModules;
      /******/

      /******/
      // define getter function for harmony exports

      /******/

      __webpack_require__.d = function (exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
          /******/
          Object.defineProperty(exports, name, {
            enumerable: true,
            get: getter
          });
          /******/
        }
        /******/

      };
      /******/

      /******/
      // define __esModule on exports

      /******/


      __webpack_require__.r = function (exports) {
        /******/
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          /******/
          Object.defineProperty(exports, Symbol.toStringTag, {
            value: 'Module'
          });
          /******/
        }
        /******/


        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        /******/
      };
      /******/

      /******/
      // create a fake namespace object

      /******/
      // mode & 1: value is a module id, require it

      /******/
      // mode & 2: merge all properties of value into the ns

      /******/
      // mode & 4: return value when already ns object

      /******/
      // mode & 8|1: behave like require

      /******/


      __webpack_require__.t = function (value, mode) {
        /******/
        if (mode & 1) value = __webpack_require__(value);
        /******/

        if (mode & 8) return value;
        /******/

        if (mode & 4 && _typeof2(value) === 'object' && value && value.__esModule) return value;
        /******/

        var ns = Object.create(null);
        /******/

        __webpack_require__.r(ns);
        /******/


        Object.defineProperty(ns, 'default', {
          enumerable: true,
          value: value
        });
        /******/

        if (mode & 2 && typeof value != 'string') for (var key in value) {
          __webpack_require__.d(ns, key, function (key) {
            return value[key];
          }.bind(null, key));
        }
        /******/

        return ns;
        /******/
      };
      /******/

      /******/
      // getDefaultExport function for compatibility with non-harmony modules

      /******/


      __webpack_require__.n = function (module) {
        /******/
        var getter = module && module.__esModule ?
        /******/
        function getDefault() {
          return module['default'];
        } :
        /******/
        function getModuleExports() {
          return module;
        };
        /******/

        __webpack_require__.d(getter, 'a', getter);
        /******/


        return getter;
        /******/
      };
      /******/

      /******/
      // Object.prototype.hasOwnProperty.call

      /******/


      __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/

      /******/
      // __webpack_public_path__

      /******/


      __webpack_require__.p = "";
      /******/

      /******/

      /******/
      // Load entry module and return exports

      /******/

      return __webpack_require__(__webpack_require__.s = 0);
      /******/
    }(
    /************************************************************************/

    /******/
    {
      /***/
      "./js/entries/foundation.js":
      /*!**********************************!*\
        !*** ./js/entries/foundation.js ***!
        \**********************************/

      /*! exports provided: Foundation, CoreUtils, Box, onImagesLoaded, Keyboard, MediaQuery, Motion, Nest, Timer, Touch, Triggers, Abide, Accordion, AccordionMenu, Drilldown, Dropdown, DropdownMenu, Equalizer, Interchange, Magellan, OffCanvas, Orbit, ResponsiveMenu, ResponsiveToggle, Reveal, Slider, SmoothScroll, Sticky, Tabs, Toggler, Tooltip, ResponsiveAccordionTabs, default */

      /***/
      function jsEntriesFoundationJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ../foundation.core */
        "./js/foundation.core.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "Foundation", function () {
          return _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"];
        });
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ../foundation.core.utils */
        "./js/foundation.core.utils.js");
        /* harmony reexport (module object) */


        __webpack_require__.d(__webpack_exports__, "CoreUtils", function () {
          return _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__;
        });
        /* harmony import */


        var _foundation_util_box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ../foundation.util.box */
        "./js/foundation.util.box.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "Box", function () {
          return _foundation_util_box__WEBPACK_IMPORTED_MODULE_3__["Box"];
        });
        /* harmony import */


        var _foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
        /*! ../foundation.util.imageLoader */
        "./js/foundation.util.imageLoader.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "onImagesLoaded", function () {
          return _foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_4__["onImagesLoaded"];
        });
        /* harmony import */


        var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
        /*! ../foundation.util.keyboard */
        "./js/foundation.util.keyboard.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "Keyboard", function () {
          return _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_5__["Keyboard"];
        });
        /* harmony import */


        var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
        /*! ../foundation.util.mediaQuery */
        "./js/foundation.util.mediaQuery.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "MediaQuery", function () {
          return _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_6__["MediaQuery"];
        });
        /* harmony import */


        var _foundation_util_motion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
        /*! ../foundation.util.motion */
        "./js/foundation.util.motion.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "Motion", function () {
          return _foundation_util_motion__WEBPACK_IMPORTED_MODULE_7__["Motion"];
        });
        /* harmony import */


        var _foundation_util_nest__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
        /*! ../foundation.util.nest */
        "./js/foundation.util.nest.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "Nest", function () {
          return _foundation_util_nest__WEBPACK_IMPORTED_MODULE_8__["Nest"];
        });
        /* harmony import */


        var _foundation_util_timer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
        /*! ../foundation.util.timer */
        "./js/foundation.util.timer.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "Timer", function () {
          return _foundation_util_timer__WEBPACK_IMPORTED_MODULE_9__["Timer"];
        });
        /* harmony import */


        var _foundation_util_touch__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
        /*! ../foundation.util.touch */
        "./js/foundation.util.touch.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "Touch", function () {
          return _foundation_util_touch__WEBPACK_IMPORTED_MODULE_10__["Touch"];
        });
        /* harmony import */


        var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
        /*! ../foundation.util.triggers */
        "./js/foundation.util.triggers.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "Triggers", function () {
          return _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_11__["Triggers"];
        });
        /* harmony import */


        var _foundation_abide__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
        /*! ../foundation.abide */
        "./js/foundation.abide.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "Abide", function () {
          return _foundation_abide__WEBPACK_IMPORTED_MODULE_12__["Abide"];
        });
        /* harmony import */


        var _foundation_accordion__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
        /*! ../foundation.accordion */
        "./js/foundation.accordion.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "Accordion", function () {
          return _foundation_accordion__WEBPACK_IMPORTED_MODULE_13__["Accordion"];
        });
        /* harmony import */


        var _foundation_accordionMenu__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
        /*! ../foundation.accordionMenu */
        "./js/foundation.accordionMenu.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "AccordionMenu", function () {
          return _foundation_accordionMenu__WEBPACK_IMPORTED_MODULE_14__["AccordionMenu"];
        });
        /* harmony import */


        var _foundation_drilldown__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
        /*! ../foundation.drilldown */
        "./js/foundation.drilldown.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "Drilldown", function () {
          return _foundation_drilldown__WEBPACK_IMPORTED_MODULE_15__["Drilldown"];
        });
        /* harmony import */


        var _foundation_dropdown__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
        /*! ../foundation.dropdown */
        "./js/foundation.dropdown.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "Dropdown", function () {
          return _foundation_dropdown__WEBPACK_IMPORTED_MODULE_16__["Dropdown"];
        });
        /* harmony import */


        var _foundation_dropdownMenu__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
        /*! ../foundation.dropdownMenu */
        "./js/foundation.dropdownMenu.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "DropdownMenu", function () {
          return _foundation_dropdownMenu__WEBPACK_IMPORTED_MODULE_17__["DropdownMenu"];
        });
        /* harmony import */


        var _foundation_equalizer__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
        /*! ../foundation.equalizer */
        "./js/foundation.equalizer.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "Equalizer", function () {
          return _foundation_equalizer__WEBPACK_IMPORTED_MODULE_18__["Equalizer"];
        });
        /* harmony import */


        var _foundation_interchange__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
        /*! ../foundation.interchange */
        "./js/foundation.interchange.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "Interchange", function () {
          return _foundation_interchange__WEBPACK_IMPORTED_MODULE_19__["Interchange"];
        });
        /* harmony import */


        var _foundation_magellan__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
        /*! ../foundation.magellan */
        "./js/foundation.magellan.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "Magellan", function () {
          return _foundation_magellan__WEBPACK_IMPORTED_MODULE_20__["Magellan"];
        });
        /* harmony import */


        var _foundation_offcanvas__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
        /*! ../foundation.offcanvas */
        "./js/foundation.offcanvas.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "OffCanvas", function () {
          return _foundation_offcanvas__WEBPACK_IMPORTED_MODULE_21__["OffCanvas"];
        });
        /* harmony import */


        var _foundation_orbit__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
        /*! ../foundation.orbit */
        "./js/foundation.orbit.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "Orbit", function () {
          return _foundation_orbit__WEBPACK_IMPORTED_MODULE_22__["Orbit"];
        });
        /* harmony import */


        var _foundation_responsiveMenu__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(
        /*! ../foundation.responsiveMenu */
        "./js/foundation.responsiveMenu.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "ResponsiveMenu", function () {
          return _foundation_responsiveMenu__WEBPACK_IMPORTED_MODULE_23__["ResponsiveMenu"];
        });
        /* harmony import */


        var _foundation_responsiveToggle__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(
        /*! ../foundation.responsiveToggle */
        "./js/foundation.responsiveToggle.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "ResponsiveToggle", function () {
          return _foundation_responsiveToggle__WEBPACK_IMPORTED_MODULE_24__["ResponsiveToggle"];
        });
        /* harmony import */


        var _foundation_reveal__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(
        /*! ../foundation.reveal */
        "./js/foundation.reveal.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "Reveal", function () {
          return _foundation_reveal__WEBPACK_IMPORTED_MODULE_25__["Reveal"];
        });
        /* harmony import */


        var _foundation_slider__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(
        /*! ../foundation.slider */
        "./js/foundation.slider.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "Slider", function () {
          return _foundation_slider__WEBPACK_IMPORTED_MODULE_26__["Slider"];
        });
        /* harmony import */


        var _foundation_smoothScroll__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(
        /*! ../foundation.smoothScroll */
        "./js/foundation.smoothScroll.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "SmoothScroll", function () {
          return _foundation_smoothScroll__WEBPACK_IMPORTED_MODULE_27__["SmoothScroll"];
        });
        /* harmony import */


        var _foundation_sticky__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(
        /*! ../foundation.sticky */
        "./js/foundation.sticky.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "Sticky", function () {
          return _foundation_sticky__WEBPACK_IMPORTED_MODULE_28__["Sticky"];
        });
        /* harmony import */


        var _foundation_tabs__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(
        /*! ../foundation.tabs */
        "./js/foundation.tabs.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "Tabs", function () {
          return _foundation_tabs__WEBPACK_IMPORTED_MODULE_29__["Tabs"];
        });
        /* harmony import */


        var _foundation_toggler__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(
        /*! ../foundation.toggler */
        "./js/foundation.toggler.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "Toggler", function () {
          return _foundation_toggler__WEBPACK_IMPORTED_MODULE_30__["Toggler"];
        });
        /* harmony import */


        var _foundation_tooltip__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(
        /*! ../foundation.tooltip */
        "./js/foundation.tooltip.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "Tooltip", function () {
          return _foundation_tooltip__WEBPACK_IMPORTED_MODULE_31__["Tooltip"];
        });
        /* harmony import */


        var _foundation_responsiveAccordionTabs__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(
        /*! ../foundation.responsiveAccordionTabs */
        "./js/foundation.responsiveAccordionTabs.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "ResponsiveAccordionTabs", function () {
          return _foundation_responsiveAccordionTabs__WEBPACK_IMPORTED_MODULE_32__["ResponsiveAccordionTabs"];
        });

        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].addToJquery(jquery__WEBPACK_IMPORTED_MODULE_0___default.a); // Add Foundation Utils to Foundation global namespace for backwards
        // compatibility.


        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].rtl = _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["rtl"];
        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].GetYoDigits = _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["GetYoDigits"];
        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].transitionend = _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["transitionend"];
        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].RegExpEscape = _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["RegExpEscape"];
        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].onLoad = _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["onLoad"];
        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].Box = _foundation_util_box__WEBPACK_IMPORTED_MODULE_3__["Box"];
        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].onImagesLoaded = _foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_4__["onImagesLoaded"];
        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].Keyboard = _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_5__["Keyboard"];
        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].MediaQuery = _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_6__["MediaQuery"];
        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].Motion = _foundation_util_motion__WEBPACK_IMPORTED_MODULE_7__["Motion"];
        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].Move = _foundation_util_motion__WEBPACK_IMPORTED_MODULE_7__["Move"];
        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].Nest = _foundation_util_nest__WEBPACK_IMPORTED_MODULE_8__["Nest"];
        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].Timer = _foundation_util_timer__WEBPACK_IMPORTED_MODULE_9__["Timer"]; // Touch and Triggers previously were almost purely sede effect driven,
        // so no need to add it to Foundation, just init them.

        _foundation_util_touch__WEBPACK_IMPORTED_MODULE_10__["Touch"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);

        _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_11__["Triggers"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a, _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"]);

        _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_6__["MediaQuery"]._init();

        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(_foundation_abide__WEBPACK_IMPORTED_MODULE_12__["Abide"], 'Abide');

        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(_foundation_accordion__WEBPACK_IMPORTED_MODULE_13__["Accordion"], 'Accordion');

        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(_foundation_accordionMenu__WEBPACK_IMPORTED_MODULE_14__["AccordionMenu"], 'AccordionMenu');

        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(_foundation_drilldown__WEBPACK_IMPORTED_MODULE_15__["Drilldown"], 'Drilldown');

        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(_foundation_dropdown__WEBPACK_IMPORTED_MODULE_16__["Dropdown"], 'Dropdown');

        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(_foundation_dropdownMenu__WEBPACK_IMPORTED_MODULE_17__["DropdownMenu"], 'DropdownMenu');

        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(_foundation_equalizer__WEBPACK_IMPORTED_MODULE_18__["Equalizer"], 'Equalizer');

        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(_foundation_interchange__WEBPACK_IMPORTED_MODULE_19__["Interchange"], 'Interchange');

        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(_foundation_magellan__WEBPACK_IMPORTED_MODULE_20__["Magellan"], 'Magellan');

        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(_foundation_offcanvas__WEBPACK_IMPORTED_MODULE_21__["OffCanvas"], 'OffCanvas');

        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(_foundation_orbit__WEBPACK_IMPORTED_MODULE_22__["Orbit"], 'Orbit');

        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(_foundation_responsiveMenu__WEBPACK_IMPORTED_MODULE_23__["ResponsiveMenu"], 'ResponsiveMenu');

        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(_foundation_responsiveToggle__WEBPACK_IMPORTED_MODULE_24__["ResponsiveToggle"], 'ResponsiveToggle');

        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(_foundation_reveal__WEBPACK_IMPORTED_MODULE_25__["Reveal"], 'Reveal');

        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(_foundation_slider__WEBPACK_IMPORTED_MODULE_26__["Slider"], 'Slider');

        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(_foundation_smoothScroll__WEBPACK_IMPORTED_MODULE_27__["SmoothScroll"], 'SmoothScroll');

        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(_foundation_sticky__WEBPACK_IMPORTED_MODULE_28__["Sticky"], 'Sticky');

        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(_foundation_tabs__WEBPACK_IMPORTED_MODULE_29__["Tabs"], 'Tabs');

        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(_foundation_toggler__WEBPACK_IMPORTED_MODULE_30__["Toggler"], 'Toggler');

        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(_foundation_tooltip__WEBPACK_IMPORTED_MODULE_31__["Tooltip"], 'Tooltip');

        _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"].plugin(_foundation_responsiveAccordionTabs__WEBPACK_IMPORTED_MODULE_32__["ResponsiveAccordionTabs"], 'ResponsiveAccordionTabs');
        /* harmony default export */


        __webpack_exports__["default"] = _foundation_core__WEBPACK_IMPORTED_MODULE_1__["Foundation"];
        /***/
      },

      /***/
      "./js/foundation.abide.js":
      /*!********************************!*\
        !*** ./js/foundation.abide.js ***!
        \********************************/

      /*! exports provided: Abide */

      /***/
      function jsFoundationAbideJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Abide", function () {
          return Abide;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.core.plugin */
        "./js/foundation.core.plugin.js");
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        }
        /**
         * Abide module.
         * @module foundation.abide
         */


        var Abide =
        /*#__PURE__*/
        function (_Plugin) {
          _inherits(Abide, _Plugin);

          function Abide() {
            _classCallCheck(this, Abide);

            return _possibleConstructorReturn(this, _getPrototypeOf(Abide).apply(this, arguments));
          }

          _createClass(Abide, [{
            key: "_setup",

            /**
             * Creates a new instance of Abide.
             * @class
             * @name Abide
             * @fires Abide#init
             * @param {Object} element - jQuery object to add the trigger to.
             * @param {Object} options - Overrides to the default plugin settings.
             */
            value: function _setup(element) {
              var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
              this.$element = element;
              this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, {}, Abide.defaults, this.$element.data(), options);
              this.className = 'Abide'; // ie9 back compat

              this._init();
            }
            /**
             * Initializes the Abide plugin and calls functions to get Abide functioning on load.
             * @private
             */

          }, {
            key: "_init",
            value: function _init() {
              var _this2 = this;

              this.$inputs = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.merge( // Consider as input to validate:
              this.$element.find('input').not('[type=submit]'), // * all input fields expect submit
              this.$element.find('textarea, select') // * all textareas and select fields
              );
              var $globalErrors = this.$element.find('[data-abide-error]'); // Add a11y attributes to all fields

              if (this.options.a11yAttributes) {
                this.$inputs.each(function (i, input) {
                  return _this2.addA11yAttributes(jquery__WEBPACK_IMPORTED_MODULE_0___default()(input));
                });
                $globalErrors.each(function (i, error) {
                  return _this2.addGlobalErrorA11yAttributes(jquery__WEBPACK_IMPORTED_MODULE_0___default()(error));
                });
              }

              this._events();
            }
            /**
             * Initializes events for Abide.
             * @private
             */

          }, {
            key: "_events",
            value: function _events() {
              var _this3 = this;

              this.$element.off('.abide').on('reset.zf.abide', function () {
                _this3.resetForm();
              }).on('submit.zf.abide', function () {
                return _this3.validateForm();
              });

              if (this.options.validateOn === 'fieldChange') {
                this.$inputs.off('change.zf.abide').on('change.zf.abide', function (e) {
                  _this3.validateInput(jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target));
                });
              }

              if (this.options.liveValidate) {
                this.$inputs.off('input.zf.abide').on('input.zf.abide', function (e) {
                  _this3.validateInput(jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target));
                });
              }

              if (this.options.validateOnBlur) {
                this.$inputs.off('blur.zf.abide').on('blur.zf.abide', function (e) {
                  _this3.validateInput(jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target));
                });
              }
            }
            /**
             * Calls necessary functions to update Abide upon DOM change
             * @private
             */

          }, {
            key: "_reflow",
            value: function _reflow() {
              this._init();
            }
            /**
             * Checks whether or not a form element has the required attribute and if it's checked or not
             * @param {Object} element - jQuery object to check for required attribute
             * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
             */

          }, {
            key: "requiredCheck",
            value: function requiredCheck($el) {
              if (!$el.attr('required')) return true;
              var isGood = true;

              switch ($el[0].type) {
                case 'checkbox':
                  isGood = $el[0].checked;
                  break;

                case 'select':
                case 'select-one':
                case 'select-multiple':
                  var opt = $el.find('option:selected');
                  if (!opt.length || !opt.val()) isGood = false;
                  break;

                default:
                  if (!$el.val() || !$el.val().length) isGood = false;
              }

              return isGood;
            }
            /**
             * Get:
             * - Based on $el, the first element(s) corresponding to `formErrorSelector` in this order:
             *   1. The element's direct sibling('s).
             *   2. The element's parent's children.
             * - Element(s) with the attribute `[data-form-error-for]` set with the element's id.
             *
             * This allows for multiple form errors per input, though if none are found, no form errors will be shown.
             *
             * @param {Object} $el - jQuery object to use as reference to find the form error selector.
             * @returns {Object} jQuery object with the selector.
             */

          }, {
            key: "findFormError",
            value: function findFormError($el) {
              var id = $el[0].id;
              var $error = $el.siblings(this.options.formErrorSelector);

              if (!$error.length) {
                $error = $el.parent().find(this.options.formErrorSelector);
              }

              if (id) {
                $error = $error.add(this.$element.find("[data-form-error-for=\"".concat(id, "\"]")));
              }

              return $error;
            }
            /**
             * Get the first element in this order:
             * 2. The <label> with the attribute `[for="someInputId"]`
             * 3. The `.closest()` <label>
             *
             * @param {Object} $el - jQuery object to check for required attribute
             * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
             */

          }, {
            key: "findLabel",
            value: function findLabel($el) {
              var id = $el[0].id;
              var $label = this.$element.find("label[for=\"".concat(id, "\"]"));

              if (!$label.length) {
                return $el.closest('label');
              }

              return $label;
            }
            /**
             * Get the set of labels associated with a set of radio els in this order
             * 2. The <label> with the attribute `[for="someInputId"]`
             * 3. The `.closest()` <label>
             *
             * @param {Object} $el - jQuery object to check for required attribute
             * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
             */

          }, {
            key: "findRadioLabels",
            value: function findRadioLabels($els) {
              var _this4 = this;

              var labels = $els.map(function (i, el) {
                var id = el.id;

                var $label = _this4.$element.find("label[for=\"".concat(id, "\"]"));

                if (!$label.length) {
                  $label = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).closest('label');
                }

                return $label[0];
              });
              return jquery__WEBPACK_IMPORTED_MODULE_0___default()(labels);
            }
            /**
             * Adds the CSS error class as specified by the Abide settings to the label, input, and the form
             * @param {Object} $el - jQuery object to add the class to
             */

          }, {
            key: "addErrorClasses",
            value: function addErrorClasses($el) {
              var $label = this.findLabel($el);
              var $formError = this.findFormError($el);

              if ($label.length) {
                $label.addClass(this.options.labelErrorClass);
              }

              if ($formError.length) {
                $formError.addClass(this.options.formErrorClass);
              }

              $el.addClass(this.options.inputErrorClass).attr({
                'data-invalid': '',
                'aria-invalid': true
              });
            }
            /**
             * Adds [for] and [role=alert] attributes to all form error targetting $el,
             * and [aria-describedby] attribute to $el toward the first form error.
             * @param {Object} $el - jQuery object
             */

          }, {
            key: "addA11yAttributes",
            value: function addA11yAttributes($el) {
              var $errors = this.findFormError($el);
              var $labels = $errors.filter('label');
              var $error = $errors.first();
              if (!$errors.length) return; // Set [aria-describedby] on the input toward the first form error if it is not set

              if (typeof $el.attr('aria-describedby') === 'undefined') {
                // Get the first error ID or create one
                var errorId = $error.attr('id');

                if (typeof errorId === 'undefined') {
                  errorId = Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["GetYoDigits"])(6, 'abide-error');
                  $error.attr('id', errorId);
                }

                ;
                $el.attr('aria-describedby', errorId);
              }

              if ($labels.filter('[for]').length < $labels.length) {
                // Get the input ID or create one
                var elemId = $el.attr('id');

                if (typeof elemId === 'undefined') {
                  elemId = Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["GetYoDigits"])(6, 'abide-input');
                  $el.attr('id', elemId);
                }

                ; // For each label targeting $el, set [for] if it is not set.

                $labels.each(function (i, label) {
                  var $label = jquery__WEBPACK_IMPORTED_MODULE_0___default()(label);
                  if (typeof $label.attr('for') === 'undefined') $label.attr('for', elemId);
                });
              } // For each error targeting $el, set [role=alert] if it is not set.


              $errors.each(function (i, label) {
                var $label = jquery__WEBPACK_IMPORTED_MODULE_0___default()(label);
                if (typeof $label.attr('role') === 'undefined') $label.attr('role', 'alert');
              }).end();
            }
            /**
             * Adds [aria-live] attribute to the given global form error $el.
             * @param {Object} $el - jQuery object to add the attribute to
             */

          }, {
            key: "addGlobalErrorA11yAttributes",
            value: function addGlobalErrorA11yAttributes($el) {
              if (typeof $el.attr('aria-live') === 'undefined') $el.attr('aria-live', this.options.a11yErrorLevel);
            }
            /**
             * Remove CSS error classes etc from an entire radio button group
             * @param {String} groupName - A string that specifies the name of a radio button group
             *
             */

          }, {
            key: "removeRadioErrorClasses",
            value: function removeRadioErrorClasses(groupName) {
              var $els = this.$element.find(":radio[name=\"".concat(groupName, "\"]"));
              var $labels = this.findRadioLabels($els);
              var $formErrors = this.findFormError($els);

              if ($labels.length) {
                $labels.removeClass(this.options.labelErrorClass);
              }

              if ($formErrors.length) {
                $formErrors.removeClass(this.options.formErrorClass);
              }

              $els.removeClass(this.options.inputErrorClass).attr({
                'data-invalid': null,
                'aria-invalid': null
              });
            }
            /**
             * Removes CSS error class as specified by the Abide settings from the label, input, and the form
             * @param {Object} $el - jQuery object to remove the class from
             */

          }, {
            key: "removeErrorClasses",
            value: function removeErrorClasses($el) {
              // radios need to clear all of the els
              if ($el[0].type == 'radio') {
                return this.removeRadioErrorClasses($el.attr('name'));
              }

              var $label = this.findLabel($el);
              var $formError = this.findFormError($el);

              if ($label.length) {
                $label.removeClass(this.options.labelErrorClass);
              }

              if ($formError.length) {
                $formError.removeClass(this.options.formErrorClass);
              }

              $el.removeClass(this.options.inputErrorClass).attr({
                'data-invalid': null,
                'aria-invalid': null
              });
            }
            /**
             * Goes through a form to find inputs and proceeds to validate them in ways specific to their type.
             * Ignores inputs with data-abide-ignore, type="hidden" or disabled attributes set
             * @fires Abide#invalid
             * @fires Abide#valid
             * @param {Object} element - jQuery object to validate, should be an HTML input
             * @returns {Boolean} goodToGo - If the input is valid or not.
             */

          }, {
            key: "validateInput",
            value: function validateInput($el) {
              var clearRequire = this.requiredCheck($el),
                  validated = false,
                  customValidator = true,
                  validator = $el.attr('data-validator'),
                  equalTo = true; // don't validate ignored inputs or hidden inputs or disabled inputs

              if ($el.is('[data-abide-ignore]') || $el.is('[type="hidden"]') || $el.is('[disabled]')) {
                return true;
              }

              switch ($el[0].type) {
                case 'radio':
                  validated = this.validateRadio($el.attr('name'));
                  break;

                case 'checkbox':
                  validated = clearRequire;
                  break;

                case 'select':
                case 'select-one':
                case 'select-multiple':
                  validated = clearRequire;
                  break;

                default:
                  validated = this.validateText($el);
              }

              if (validator) {
                customValidator = this.matchValidation($el, validator, $el.attr('required'));
              }

              if ($el.attr('data-equalto')) {
                equalTo = this.options.validators.equalTo($el);
              }

              var goodToGo = [clearRequire, validated, customValidator, equalTo].indexOf(false) === -1;
              var message = (goodToGo ? 'valid' : 'invalid') + '.zf.abide';

              if (goodToGo) {
                // Re-validate inputs that depend on this one with equalto
                var dependentElements = this.$element.find("[data-equalto=\"".concat($el.attr('id'), "\"]"));

                if (dependentElements.length) {
                  var _this = this;

                  dependentElements.each(function () {
                    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val()) {
                      _this.validateInput(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
                    }
                  });
                }
              }

              this[goodToGo ? 'removeErrorClasses' : 'addErrorClasses']($el);
              /**
               * Fires when the input is done checking for validation. Event trigger is either `valid.zf.abide` or `invalid.zf.abide`
               * Trigger includes the DOM element of the input.
               * @event Abide#valid
               * @event Abide#invalid
               */

              $el.trigger(message, [$el]);
              return goodToGo;
            }
            /**
             * Goes through a form and if there are any invalid inputs, it will display the form error element
             * @returns {Boolean} noError - true if no errors were detected...
             * @fires Abide#formvalid
             * @fires Abide#forminvalid
             */

          }, {
            key: "validateForm",
            value: function validateForm() {
              var _this5 = this;

              var acc = [];

              var _this = this;

              this.$inputs.each(function () {
                acc.push(_this.validateInput(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this)));
              });
              var noError = acc.indexOf(false) === -1;
              this.$element.find('[data-abide-error]').each(function (i, elem) {
                var $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(elem); // Ensure a11y attributes are set

                if (_this5.options.a11yAttributes) _this5.addGlobalErrorA11yAttributes($elem); // Show or hide the error

                $elem.css('display', noError ? 'none' : 'block');
              });
              /**
               * Fires when the form is finished validating. Event trigger is either `formvalid.zf.abide` or `forminvalid.zf.abide`.
               * Trigger includes the element of the form.
               * @event Abide#formvalid
               * @event Abide#forminvalid
               */

              this.$element.trigger((noError ? 'formvalid' : 'forminvalid') + '.zf.abide', [this.$element]);
              return noError;
            }
            /**
             * Determines whether or a not a text input is valid based on the pattern specified in the attribute. If no matching pattern is found, returns true.
             * @param {Object} $el - jQuery object to validate, should be a text input HTML element
             * @param {String} pattern - string value of one of the RegEx patterns in Abide.options.patterns
             * @returns {Boolean} Boolean value depends on whether or not the input value matches the pattern specified
             */

          }, {
            key: "validateText",
            value: function validateText($el, pattern) {
              // A pattern can be passed to this function, or it will be infered from the input's "pattern" attribute, or it's "type" attribute
              pattern = pattern || $el.attr('pattern') || $el.attr('type');
              var inputText = $el.val();
              var valid = false;

              if (inputText.length) {
                // If the pattern attribute on the element is in Abide's list of patterns, then test that regexp
                if (this.options.patterns.hasOwnProperty(pattern)) {
                  valid = this.options.patterns[pattern].test(inputText);
                } // If the pattern name isn't also the type attribute of the field, then test it as a regexp
                else if (pattern !== $el.attr('type')) {
                    valid = new RegExp(pattern).test(inputText);
                  } else {
                    valid = true;
                  }
              } // An empty field is valid if it's not required
              else if (!$el.prop('required')) {
                  valid = true;
                }

              return valid;
            }
            /**
             * Determines whether or a not a radio input is valid based on whether or not it is required and selected. Although the function targets a single `<input>`, it validates by checking the `required` and `checked` properties of all radio buttons in its group.
             * @param {String} groupName - A string that specifies the name of a radio button group
             * @returns {Boolean} Boolean value depends on whether or not at least one radio input has been selected (if it's required)
             */

          }, {
            key: "validateRadio",
            value: function validateRadio(groupName) {
              // If at least one radio in the group has the `required` attribute, the group is considered required
              // Per W3C spec, all radio buttons in a group should have `required`, but we're being nice
              var $group = this.$element.find(":radio[name=\"".concat(groupName, "\"]"));
              var valid = false,
                  required = false; // For the group to be required, at least one radio needs to be required

              $group.each(function (i, e) {
                if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(e).attr('required')) {
                  required = true;
                }
              });
              if (!required) valid = true;

              if (!valid) {
                // For the group to be valid, at least one radio needs to be checked
                $group.each(function (i, e) {
                  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(e).prop('checked')) {
                    valid = true;
                  }
                });
              }

              ;
              return valid;
            }
            /**
             * Determines if a selected input passes a custom validation function. Multiple validations can be used, if passed to the element with `data-validator="foo bar baz"` in a space separated listed.
             * @param {Object} $el - jQuery input element.
             * @param {String} validators - a string of function names matching functions in the Abide.options.validators object.
             * @param {Boolean} required - self explanatory?
             * @returns {Boolean} - true if validations passed.
             */

          }, {
            key: "matchValidation",
            value: function matchValidation($el, validators, required) {
              var _this6 = this;

              required = required ? true : false;
              var clear = validators.split(' ').map(function (v) {
                return _this6.options.validators[v]($el, required, $el.parent());
              });
              return clear.indexOf(false) === -1;
            }
            /**
             * Resets form inputs and styles
             * @fires Abide#formreset
             */

          }, {
            key: "resetForm",
            value: function resetForm() {
              var $form = this.$element,
                  opts = this.options;
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(".".concat(opts.labelErrorClass), $form).not('small').removeClass(opts.labelErrorClass);
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(".".concat(opts.inputErrorClass), $form).not('small').removeClass(opts.inputErrorClass);
              jquery__WEBPACK_IMPORTED_MODULE_0___default()("".concat(opts.formErrorSelector, ".").concat(opts.formErrorClass)).removeClass(opts.formErrorClass);
              $form.find('[data-abide-error]').css('display', 'none');
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(':input', $form).not(':button, :submit, :reset, :hidden, :radio, :checkbox, [data-abide-ignore]').val('').attr({
                'data-invalid': null,
                'aria-invalid': null
              });
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(':input:radio', $form).not('[data-abide-ignore]').prop('checked', false).attr({
                'data-invalid': null,
                'aria-invalid': null
              });
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(':input:checkbox', $form).not('[data-abide-ignore]').prop('checked', false).attr({
                'data-invalid': null,
                'aria-invalid': null
              });
              /**
               * Fires when the form has been reset.
               * @event Abide#formreset
               */

              $form.trigger('formreset.zf.abide', [$form]);
            }
            /**
             * Destroys an instance of Abide.
             * Removes error styles and classes from elements, without resetting their values.
             */

          }, {
            key: "_destroy",
            value: function _destroy() {
              var _this = this;

              this.$element.off('.abide').find('[data-abide-error]').css('display', 'none');
              this.$inputs.off('.abide').each(function () {
                _this.removeErrorClasses(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
              });
            }
          }]);

          return Abide;
        }(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__["Plugin"]);
        /**
         * Default settings for plugin
         */


        Abide.defaults = {
          /**
           * The default event to validate inputs. Checkboxes and radios validate immediately.
           * Remove or change this value for manual validation.
           * @option
           * @type {?string}
           * @default 'fieldChange'
           */
          validateOn: 'fieldChange',

          /**
           * Class to be applied to input labels on failed validation.
           * @option
           * @type {string}
           * @default 'is-invalid-label'
           */
          labelErrorClass: 'is-invalid-label',

          /**
           * Class to be applied to inputs on failed validation.
           * @option
           * @type {string}
           * @default 'is-invalid-input'
           */
          inputErrorClass: 'is-invalid-input',

          /**
           * Class selector to use to target Form Errors for show/hide.
           * @option
           * @type {string}
           * @default '.form-error'
           */
          formErrorSelector: '.form-error',

          /**
           * Class added to Form Errors on failed validation.
           * @option
           * @type {string}
           * @default 'is-visible'
           */
          formErrorClass: 'is-visible',

          /**
           * If true, automatically insert when possible:
           * - `[aria-describedby]` on fields
           * - `[role=alert]` on form errors and `[for]` on form error labels
           * - `[aria-live]` on global errors `[data-abide-error]` (see option `a11yErrorLevel`).
           * @option
           * @type {boolean}
           * @default true
           */
          a11yAttributes: true,

          /**
           * [aria-live] attribute value to be applied on global errors `[data-abide-error]`.
           * Options are: 'assertive', 'polite' and 'off'/null
           * @option
           * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
           * @type {string}
           * @default 'assertive'
           */
          a11yErrorLevel: 'assertive',

          /**
           * Set to true to validate text inputs on any value change.
           * @option
           * @type {boolean}
           * @default false
           */
          liveValidate: false,

          /**
           * Set to true to validate inputs on blur.
           * @option
           * @type {boolean}
           * @default false
           */
          validateOnBlur: false,
          patterns: {
            alpha: /^[a-zA-Z]+$/,
            alpha_numeric: /^[a-zA-Z0-9]+$/,
            integer: /^[-+]?\d+$/,
            number: /^[-+]?\d*(?:[\.\,]\d+)?$/,
            // amex, visa, diners
            card: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(?:222[1-9]|2[3-6][0-9]{2}|27[0-1][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
            cvv: /^([0-9]){3,4}$/,
            // http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
            email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
            // From CommonRegexJS (@talyssonoc)
            // https://github.com/talyssonoc/CommonRegexJS/blob/e2901b9f57222bc14069dc8f0598d5f412555411/lib/commonregex.js#L76
            // For more restrictive URL Regexs, see https://mathiasbynens.be/demo/url-regex.
            url: /^((?:(https?|ftps?|file|ssh|sftp):\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\))+(?:\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:\'".,<>?\xab\xbb\u201c\u201d\u2018\u2019]))$/,
            // abc.de
            domain: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,
            datetime: /^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,
            // YYYY-MM-DD
            date: /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,
            // HH:MM:SS
            time: /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,
            dateISO: /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
            // MM/DD/YYYY
            month_day_year: /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,
            // DD/MM/YYYY
            day_month_year: /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,
            // #FFF or #FFFFFF
            color: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
            // Domain || URL
            website: {
              test: function test(text) {
                return Abide.defaults.patterns['domain'].test(text) || Abide.defaults.patterns['url'].test(text);
              }
            }
          },

          /**
           * Optional validation functions to be used. `equalTo` being the only default included function.
           * Functions should return only a boolean if the input is valid or not. Functions are given the following arguments:
           * el : The jQuery element to validate.
           * required : Boolean value of the required attribute be present or not.
           * parent : The direct parent of the input.
           * @option
           */
          validators: {
            equalTo: function equalTo(el, required, parent) {
              return jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(el.attr('data-equalto'))).val() === el.val();
            }
          }
        };
        /***/
      },

      /***/
      "./js/foundation.accordion.js":
      /*!************************************!*\
        !*** ./js/foundation.accordion.js ***!
        \************************************/

      /*! exports provided: Accordion */

      /***/
      function jsFoundationAccordionJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Accordion", function () {
          return Accordion;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");
        /* harmony import */


        var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./foundation.util.keyboard */
        "./js/foundation.util.keyboard.js");
        /* harmony import */


        var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ./foundation.core.plugin */
        "./js/foundation.core.plugin.js");

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        }
        /**
         * Accordion module.
         * @module foundation.accordion
         * @requires foundation.util.keyboard
         */


        var Accordion =
        /*#__PURE__*/
        function (_Plugin) {
          _inherits(Accordion, _Plugin);

          function Accordion() {
            _classCallCheck(this, Accordion);

            return _possibleConstructorReturn(this, _getPrototypeOf(Accordion).apply(this, arguments));
          }

          _createClass(Accordion, [{
            key: "_setup",

            /**
             * Creates a new instance of an accordion.
             * @class
             * @name Accordion
             * @fires Accordion#init
             * @param {jQuery} element - jQuery object to make into an accordion.
             * @param {Object} options - a plain object with settings to override the default options.
             */
            value: function _setup(element, options) {
              this.$element = element;
              this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, Accordion.defaults, this.$element.data(), options);
              this.className = 'Accordion'; // ie9 back compat

              this._init();

              _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_2__["Keyboard"].register('Accordion', {
                'ENTER': 'toggle',
                'SPACE': 'toggle',
                'ARROW_DOWN': 'next',
                'ARROW_UP': 'previous'
              });
            }
            /**
             * Initializes the accordion by animating the preset active pane(s).
             * @private
             */

          }, {
            key: "_init",
            value: function _init() {
              var _this2 = this;

              this._isInitializing = true;
              this.$element.attr('role', 'tablist');
              this.$tabs = this.$element.children('[data-accordion-item]');
              this.$tabs.each(function (idx, el) {
                var $el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el),
                    $content = $el.children('[data-tab-content]'),
                    id = $content[0].id || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__["GetYoDigits"])(6, 'accordion'),
                    linkId = el.id ? "".concat(el.id, "-label") : "".concat(id, "-label");
                $el.find('a:first').attr({
                  'aria-controls': id,
                  'role': 'tab',
                  'id': linkId,
                  'aria-expanded': false,
                  'aria-selected': false
                });
                $content.attr({
                  'role': 'tabpanel',
                  'aria-labelledby': linkId,
                  'aria-hidden': true,
                  'id': id
                });
              });
              var $initActive = this.$element.find('.is-active').children('[data-tab-content]');

              if ($initActive.length) {
                // Save up the initial hash to return to it later when going back in history
                this._initialAnchor = $initActive.prev('a').attr('href');

                this._openSingleTab($initActive);
              }

              this._checkDeepLink = function () {
                var anchor = window.location.hash;

                if (!anchor.length) {
                  // If we are still initializing and there is no anchor, then there is nothing to do
                  if (_this2._isInitializing) return; // Otherwise, move to the initial anchor

                  if (_this2._initialAnchor) anchor = _this2._initialAnchor;
                }

                var $anchor = anchor && jquery__WEBPACK_IMPORTED_MODULE_0___default()(anchor);

                var $link = anchor && _this2.$element.find("[href$=\"".concat(anchor, "\"]")); // Whether the anchor element that has been found is part of this element


                var isOwnAnchor = !!($anchor.length && $link.length); // If there is an anchor for the hash, open it (if not already active)

                if ($anchor && $link && $link.length) {
                  if (!$link.parent('[data-accordion-item]').hasClass('is-active')) {
                    _this2._openSingleTab($anchor);
                  }

                  ;
                } // Otherwise, close everything
                else {
                    _this2._closeAllTabs();
                  }

                if (isOwnAnchor) {
                  // Roll up a little to show the titles
                  if (_this2.options.deepLinkSmudge) {
                    Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__["onLoad"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window), function () {
                      var offset = _this2.$element.offset();

                      jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').animate({
                        scrollTop: offset.top
                      }, _this2.options.deepLinkSmudgeDelay);
                    });
                  }
                  /**
                   * Fires when the plugin has deeplinked at pageload
                   * @event Accordion#deeplink
                   */


                  _this2.$element.trigger('deeplink.zf.accordion', [$link, $anchor]);
                }
              }; //use browser to open a tab, if it exists in this tabset


              if (this.options.deepLink) {
                this._checkDeepLink();
              }

              this._events();

              this._isInitializing = false;
            }
            /**
             * Adds event handlers for items within the accordion.
             * @private
             */

          }, {
            key: "_events",
            value: function _events() {
              var _this = this;

              this.$tabs.each(function () {
                var $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
                var $tabContent = $elem.children('[data-tab-content]');

                if ($tabContent.length) {
                  $elem.children('a').off('click.zf.accordion keydown.zf.accordion').on('click.zf.accordion', function (e) {
                    e.preventDefault();

                    _this.toggle($tabContent);
                  }).on('keydown.zf.accordion', function (e) {
                    _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_2__["Keyboard"].handleKey(e, 'Accordion', {
                      toggle: function toggle() {
                        _this.toggle($tabContent);
                      },
                      next: function next() {
                        var $a = $elem.next().find('a').focus();

                        if (!_this.options.multiExpand) {
                          $a.trigger('click.zf.accordion');
                        }
                      },
                      previous: function previous() {
                        var $a = $elem.prev().find('a').focus();

                        if (!_this.options.multiExpand) {
                          $a.trigger('click.zf.accordion');
                        }
                      },
                      handled: function handled() {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    });
                  });
                }
              });

              if (this.options.deepLink) {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('hashchange', this._checkDeepLink);
              }
            }
            /**
             * Toggles the selected content pane's open/close state.
             * @param {jQuery} $target - jQuery object of the pane to toggle (`.accordion-content`).
             * @function
             */

          }, {
            key: "toggle",
            value: function toggle($target) {
              if ($target.closest('[data-accordion]').is('[disabled]')) {
                console.info('Cannot toggle an accordion that is disabled.');
                return;
              }

              if ($target.parent().hasClass('is-active')) {
                this.up($target);
              } else {
                this.down($target);
              } //either replace or update browser history


              if (this.options.deepLink) {
                var anchor = $target.prev('a').attr('href');

                if (this.options.updateHistory) {
                  history.pushState({}, '', anchor);
                } else {
                  history.replaceState({}, '', anchor);
                }
              }
            }
            /**
             * Opens the accordion tab defined by `$target`.
             * @param {jQuery} $target - Accordion pane to open (`.accordion-content`).
             * @fires Accordion#down
             * @function
             */

          }, {
            key: "down",
            value: function down($target) {
              if ($target.closest('[data-accordion]').is('[disabled]')) {
                console.info('Cannot call down on an accordion that is disabled.');
                return;
              }

              if (this.options.multiExpand) this._openTab($target);else this._openSingleTab($target);
            }
            /**
             * Closes the tab defined by `$target`.
             * It may be ignored if the Accordion options don't allow it.
             *
             * @param {jQuery} $target - Accordion tab to close (`.accordion-content`).
             * @fires Accordion#up
             * @function
             */

          }, {
            key: "up",
            value: function up($target) {
              if (this.$element.is('[disabled]')) {
                console.info('Cannot call up on an accordion that is disabled.');
                return;
              } // Don't close the item if it is already closed


              var $targetItem = $target.parent();
              if (!$targetItem.hasClass('is-active')) return; // Don't close the item if there is no other active item (unless with `allowAllClosed`)

              var $othersItems = $targetItem.siblings();
              if (!this.options.allowAllClosed && !$othersItems.hasClass('is-active')) return;

              this._closeTab($target);
            }
            /**
             * Make the tab defined by `$target` the only opened tab, closing all others tabs.
             * @param {jQuery} $target - Accordion tab to open (`.accordion-content`).
             * @function
             * @private
             */

          }, {
            key: "_openSingleTab",
            value: function _openSingleTab($target) {
              // Close all the others active tabs.
              var $activeContents = this.$element.children('.is-active').children('[data-tab-content]');

              if ($activeContents.length) {
                this._closeTab($activeContents.not($target));
              } // Then open the target.


              this._openTab($target);
            }
            /**
             * Opens the tab defined by `$target`.
             * @param {jQuery} $target - Accordion tab to open (`.accordion-content`).
             * @fires Accordion#down
             * @function
             * @private
             */

          }, {
            key: "_openTab",
            value: function _openTab($target) {
              var _this3 = this;

              var $targetItem = $target.parent();
              var targetContentId = $target.attr('aria-labelledby');
              $target.attr('aria-hidden', false);
              $targetItem.addClass('is-active');
              jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(targetContentId)).attr({
                'aria-expanded': true,
                'aria-selected': true
              });
              $target.slideDown(this.options.slideSpeed, function () {
                /**
                 * Fires when the tab is done opening.
                 * @event Accordion#down
                 */
                _this3.$element.trigger('down.zf.accordion', [$target]);
              });
            }
            /**
             * Closes the tab defined by `$target`.
             * @param {jQuery} $target - Accordion tab to close (`.accordion-content`).
             * @fires Accordion#up
             * @function
             * @private
             */

          }, {
            key: "_closeTab",
            value: function _closeTab($target) {
              var _this4 = this;

              var $targetItem = $target.parent();
              var targetContentId = $target.attr('aria-labelledby');
              $target.attr('aria-hidden', true);
              $targetItem.removeClass('is-active');
              jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(targetContentId)).attr({
                'aria-expanded': false,
                'aria-selected': false
              });
              $target.slideUp(this.options.slideSpeed, function () {
                /**
                 * Fires when the tab is done collapsing up.
                 * @event Accordion#up
                 */
                _this4.$element.trigger('up.zf.accordion', [$target]);
              });
            }
            /**
             * Closes all active tabs
             * @fires Accordion#up
             * @function
             * @private
             */

          }, {
            key: "_closeAllTabs",
            value: function _closeAllTabs() {
              var $activeTabs = this.$element.children('.is-active').children('[data-tab-content]');

              if ($activeTabs.length) {
                this._closeTab($activeTabs);
              }
            }
            /**
             * Destroys an instance of an accordion.
             * @fires Accordion#destroyed
             * @function
             */

          }, {
            key: "_destroy",
            value: function _destroy() {
              this.$element.find('[data-tab-content]').stop(true).slideUp(0).css('display', '');
              this.$element.find('a').off('.zf.accordion');

              if (this.options.deepLink) {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('hashchange', this._checkDeepLink);
              }
            }
          }]);

          return Accordion;
        }(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_3__["Plugin"]);

        Accordion.defaults = {
          /**
           * Amount of time to animate the opening of an accordion pane.
           * @option
           * @type {number}
           * @default 250
           */
          slideSpeed: 250,

          /**
           * Allow the accordion to have multiple open panes.
           * @option
           * @type {boolean}
           * @default false
           */
          multiExpand: false,

          /**
           * Allow the accordion to close all panes.
           * @option
           * @type {boolean}
           * @default false
           */
          allowAllClosed: false,

          /**
           * Link the location hash to the open pane.
           * Set the location hash when the opened pane changes, and open and scroll to the corresponding pane when the location changes.
           * @option
           * @type {boolean}
           * @default false
           */
          deepLink: false,

          /**
           * If `deepLink` is enabled, adjust the deep link scroll to make sure the top of the accordion panel is visible
           * @option
           * @type {boolean}
           * @default false
           */
          deepLinkSmudge: false,

          /**
           * If `deepLinkSmudge` is enabled, animation time (ms) for the deep link adjustment
           * @option
           * @type {number}
           * @default 300
           */
          deepLinkSmudgeDelay: 300,

          /**
           * If `deepLink` is enabled, update the browser history with the open accordion
           * @option
           * @type {boolean}
           * @default false
           */
          updateHistory: false
        };
        /***/
      },

      /***/
      "./js/foundation.accordionMenu.js":
      /*!****************************************!*\
        !*** ./js/foundation.accordionMenu.js ***!
        \****************************************/

      /*! exports provided: AccordionMenu */

      /***/
      function jsFoundationAccordionMenuJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "AccordionMenu", function () {
          return AccordionMenu;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.util.keyboard */
        "./js/foundation.util.keyboard.js");
        /* harmony import */


        var _foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./foundation.util.nest */
        "./js/foundation.util.nest.js");
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");
        /* harmony import */


        var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
        /*! ./foundation.core.plugin */
        "./js/foundation.core.plugin.js");

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        }
        /**
         * AccordionMenu module.
         * @module foundation.accordionMenu
         * @requires foundation.util.keyboard
         * @requires foundation.util.nest
         */


        var AccordionMenu =
        /*#__PURE__*/
        function (_Plugin) {
          _inherits(AccordionMenu, _Plugin);

          function AccordionMenu() {
            _classCallCheck(this, AccordionMenu);

            return _possibleConstructorReturn(this, _getPrototypeOf(AccordionMenu).apply(this, arguments));
          }

          _createClass(AccordionMenu, [{
            key: "_setup",

            /**
             * Creates a new instance of an accordion menu.
             * @class
             * @name AccordionMenu
             * @fires AccordionMenu#init
             * @param {jQuery} element - jQuery object to make into an accordion menu.
             * @param {Object} options - Overrides to the default plugin settings.
             */
            value: function _setup(element, options) {
              this.$element = element;
              this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, AccordionMenu.defaults, this.$element.data(), options);
              this.className = 'AccordionMenu'; // ie9 back compat

              this._init();

              _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__["Keyboard"].register('AccordionMenu', {
                'ENTER': 'toggle',
                'SPACE': 'toggle',
                'ARROW_RIGHT': 'open',
                'ARROW_UP': 'up',
                'ARROW_DOWN': 'down',
                'ARROW_LEFT': 'close',
                'ESCAPE': 'closeAll'
              });
            }
            /**
             * Initializes the accordion menu by hiding all nested menus.
             * @private
             */

          }, {
            key: "_init",
            value: function _init() {
              _foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__["Nest"].Feather(this.$element, 'accordion');

              var _this = this;

              this.$element.find('[data-submenu]').not('.is-active').slideUp(0); //.find('a').css('padding-left', '1rem');

              this.$element.attr({
                'role': 'tree',
                'aria-multiselectable': this.options.multiOpen
              });
              this.$menuLinks = this.$element.find('.is-accordion-submenu-parent');
              this.$menuLinks.each(function () {
                var linkId = this.id || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["GetYoDigits"])(6, 'acc-menu-link'),
                    $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
                    $sub = $elem.children('[data-submenu]'),
                    subId = $sub[0].id || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["GetYoDigits"])(6, 'acc-menu'),
                    isActive = $sub.hasClass('is-active');

                if (_this.options.parentLink) {
                  var $anchor = $elem.children('a');
                  $anchor.clone().prependTo($sub).wrap('<li data-is-parent-link class="is-submenu-parent-item is-submenu-item is-accordion-submenu-item"></li>');
                }

                if (_this.options.submenuToggle) {
                  $elem.addClass('has-submenu-toggle');
                  $elem.children('a').after('<button id="' + linkId + '" class="submenu-toggle" aria-controls="' + subId + '" aria-expanded="' + isActive + '" title="' + _this.options.submenuToggleText + '"><span class="submenu-toggle-text">' + _this.options.submenuToggleText + '</span></button>');
                } else {
                  $elem.attr({
                    'aria-controls': subId,
                    'aria-expanded': isActive,
                    'id': linkId
                  });
                }

                $sub.attr({
                  'aria-labelledby': linkId,
                  'aria-hidden': !isActive,
                  'role': 'group',
                  'id': subId
                });
              });
              this.$element.find('li').attr({
                'role': 'treeitem'
              });
              var initPanes = this.$element.find('.is-active');

              if (initPanes.length) {
                var _this = this;

                initPanes.each(function () {
                  _this.down(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
                });
              }

              this._events();
            }
            /**
             * Adds event handlers for items within the menu.
             * @private
             */

          }, {
            key: "_events",
            value: function _events() {
              var _this = this;

              this.$element.find('li').each(function () {
                var $submenu = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children('[data-submenu]');

                if ($submenu.length) {
                  if (_this.options.submenuToggle) {
                    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children('.submenu-toggle').off('click.zf.accordionMenu').on('click.zf.accordionMenu', function (e) {
                      _this.toggle($submenu);
                    });
                  } else {
                    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children('a').off('click.zf.accordionMenu').on('click.zf.accordionMenu', function (e) {
                      e.preventDefault();

                      _this.toggle($submenu);
                    });
                  }
                }
              }).on('keydown.zf.accordionmenu', function (e) {
                var $element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
                    $elements = $element.parent('ul').children('li'),
                    $prevElement,
                    $nextElement,
                    $target = $element.children('[data-submenu]');
                $elements.each(function (i) {
                  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is($element)) {
                    $prevElement = $elements.eq(Math.max(0, i - 1)).find('a').first();
                    $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1)).find('a').first();

                    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children('[data-submenu]:visible').length) {
                      // has open sub menu
                      $nextElement = $element.find('li:first-child').find('a').first();
                    }

                    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(':first-child')) {
                      // is first element of sub menu
                      $prevElement = $element.parents('li').first().find('a').first();
                    } else if ($prevElement.parents('li').first().children('[data-submenu]:visible').length) {
                      // if previous element has open sub menu
                      $prevElement = $prevElement.parents('li').find('li:last-child').find('a').first();
                    }

                    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(':last-child')) {
                      // is last element of sub menu
                      $nextElement = $element.parents('li').first().next('li').find('a').first();
                    }

                    return;
                  }
                });

                _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__["Keyboard"].handleKey(e, 'AccordionMenu', {
                  open: function open() {
                    if ($target.is(':hidden')) {
                      _this.down($target);

                      $target.find('li').first().find('a').first().focus();
                    }
                  },
                  close: function close() {
                    if ($target.length && !$target.is(':hidden')) {
                      // close active sub of this item
                      _this.up($target);
                    } else if ($element.parent('[data-submenu]').length) {
                      // close currently open sub
                      _this.up($element.parent('[data-submenu]'));

                      $element.parents('li').first().find('a').first().focus();
                    }
                  },
                  up: function up() {
                    $prevElement.focus();
                    return true;
                  },
                  down: function down() {
                    $nextElement.focus();
                    return true;
                  },
                  toggle: function toggle() {
                    if (_this.options.submenuToggle) {
                      return false;
                    }

                    if ($element.children('[data-submenu]').length) {
                      _this.toggle($element.children('[data-submenu]'));

                      return true;
                    }
                  },
                  closeAll: function closeAll() {
                    _this.hideAll();
                  },
                  handled: function handled(preventDefault) {
                    if (preventDefault) {
                      e.preventDefault();
                    }

                    e.stopImmediatePropagation();
                  }
                });
              }); //.attr('tabindex', 0);
            }
            /**
             * Closes all panes of the menu.
             * @function
             */

          }, {
            key: "hideAll",
            value: function hideAll() {
              this.up(this.$element.find('[data-submenu]'));
            }
            /**
             * Opens all panes of the menu.
             * @function
             */

          }, {
            key: "showAll",
            value: function showAll() {
              this.down(this.$element.find('[data-submenu]'));
            }
            /**
             * Toggles the open/close state of a submenu.
             * @function
             * @param {jQuery} $target - the submenu to toggle
             */

          }, {
            key: "toggle",
            value: function toggle($target) {
              if (!$target.is(':animated')) {
                if (!$target.is(':hidden')) {
                  this.up($target);
                } else {
                  this.down($target);
                }
              }
            }
            /**
             * Opens the sub-menu defined by `$target`.
             * @param {jQuery} $target - Sub-menu to open.
             * @fires AccordionMenu#down
             */

          }, {
            key: "down",
            value: function down($target) {
              var _this = this;

              if (!this.options.multiOpen) {
                this.up(this.$element.find('.is-active').not($target.parentsUntil(this.$element).add($target)));
              }

              $target.addClass('is-active').attr({
                'aria-hidden': false
              });

              if (this.options.submenuToggle) {
                $target.prev('.submenu-toggle').attr({
                  'aria-expanded': true
                });
              } else {
                $target.parent('.is-accordion-submenu-parent').attr({
                  'aria-expanded': true
                });
              }

              $target.slideDown(_this.options.slideSpeed, function () {
                /**
                 * Fires when the menu is done opening.
                 * @event AccordionMenu#down
                 */
                _this.$element.trigger('down.zf.accordionMenu', [$target]);
              });
            }
            /**
             * Closes the sub-menu defined by `$target`. All sub-menus inside the target will be closed as well.
             * @param {jQuery} $target - Sub-menu to close.
             * @fires AccordionMenu#up
             */

          }, {
            key: "up",
            value: function up($target) {
              var _this = this;

              $target.slideUp(_this.options.slideSpeed, function () {
                /**
                 * Fires when the menu is done collapsing up.
                 * @event AccordionMenu#up
                 */
                _this.$element.trigger('up.zf.accordionMenu', [$target]);
              });
              var $menus = $target.find('[data-submenu]').slideUp(0).addBack().attr('aria-hidden', true);

              if (this.options.submenuToggle) {
                $menus.prev('.submenu-toggle').attr('aria-expanded', false);
              } else {
                $menus.parent('.is-accordion-submenu-parent').attr('aria-expanded', false);
              }
            }
            /**
             * Destroys an instance of accordion menu.
             * @fires AccordionMenu#destroyed
             */

          }, {
            key: "_destroy",
            value: function _destroy() {
              this.$element.find('[data-submenu]').slideDown(0).css('display', '');
              this.$element.find('a').off('click.zf.accordionMenu');
              this.$element.find('[data-is-parent-link]').detach();

              if (this.options.submenuToggle) {
                this.$element.find('.has-submenu-toggle').removeClass('has-submenu-toggle');
                this.$element.find('.submenu-toggle').remove();
              }

              _foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__["Nest"].Burn(this.$element, 'accordion');
            }
          }]);

          return AccordionMenu;
        }(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_4__["Plugin"]);

        AccordionMenu.defaults = {
          /**
           * Adds the parent link to the submenu.
           * @option
           * @type {boolean}
           * @default false
           */
          parentLink: false,

          /**
           * Amount of time to animate the opening of a submenu in ms.
           * @option
           * @type {number}
           * @default 250
           */
          slideSpeed: 250,

          /**
           * Adds a separate submenu toggle button. This allows the parent item to have a link.
           * @option
           * @example true
           */
          submenuToggle: false,

          /**
           * The text used for the submenu toggle if enabled. This is used for screen readers only.
           * @option
           * @example true
           */
          submenuToggleText: 'Toggle menu',

          /**
           * Allow the menu to have multiple open panes.
           * @option
           * @type {boolean}
           * @default true
           */
          multiOpen: true
        };
        /***/
      },

      /***/
      "./js/foundation.core.js":
      /*!*******************************!*\
        !*** ./js/foundation.core.js ***!
        \*******************************/

      /*! exports provided: Foundation */

      /***/
      function jsFoundationCoreJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Foundation", function () {
          return Foundation;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");
        /* harmony import */


        var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./foundation.util.mediaQuery */
        "./js/foundation.util.mediaQuery.js");

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        var FOUNDATION_VERSION = '6.5.0'; // Global Foundation object
        // This is attached to the window, or used as a module for AMD/Browserify

        var Foundation = {
          version: FOUNDATION_VERSION,

          /**
           * Stores initialized plugins.
           */
          _plugins: {},

          /**
           * Stores generated unique ids for plugin instances
           */
          _uuids: [],

          /**
           * Defines a Foundation plugin, adding it to the `Foundation` namespace and the list of plugins to initialize when reflowing.
           * @param {Object} plugin - The constructor of the plugin.
           */
          plugin: function plugin(_plugin, name) {
            // Object key to use when adding to global Foundation object
            // Examples: Foundation.Reveal, Foundation.OffCanvas
            var className = name || functionName(_plugin); // Object key to use when storing the plugin, also used to create the identifying data attribute for the plugin
            // Examples: data-reveal, data-off-canvas

            var attrName = hyphenate(className); // Add to the Foundation object and the plugins list (for reflowing)

            this._plugins[attrName] = this[className] = _plugin;
          },

          /**
           * @function
           * Populates the _uuids array with pointers to each individual plugin instance.
           * Adds the `zfPlugin` data-attribute to programmatically created plugins to allow use of $(selector).foundation(method) calls.
           * Also fires the initialization event for each plugin, consolidating repetitive code.
           * @param {Object} plugin - an instance of a plugin, usually `this` in context.
           * @param {String} name - the name of the plugin, passed as a camelCased string.
           * @fires Plugin#init
           */
          registerPlugin: function registerPlugin(plugin, name) {
            var pluginName = name ? hyphenate(name) : functionName(plugin.constructor).toLowerCase();
            plugin.uuid = Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__["GetYoDigits"])(6, pluginName);

            if (!plugin.$element.attr("data-".concat(pluginName))) {
              plugin.$element.attr("data-".concat(pluginName), plugin.uuid);
            }

            if (!plugin.$element.data('zfPlugin')) {
              plugin.$element.data('zfPlugin', plugin);
            }
            /**
             * Fires when the plugin has initialized.
             * @event Plugin#init
             */


            plugin.$element.trigger("init.zf.".concat(pluginName));

            this._uuids.push(plugin.uuid);

            return;
          },

          /**
           * @function
           * Removes the plugins uuid from the _uuids array.
           * Removes the zfPlugin data attribute, as well as the data-plugin-name attribute.
           * Also fires the destroyed event for the plugin, consolidating repetitive code.
           * @param {Object} plugin - an instance of a plugin, usually `this` in context.
           * @fires Plugin#destroyed
           */
          unregisterPlugin: function unregisterPlugin(plugin) {
            var pluginName = hyphenate(functionName(plugin.$element.data('zfPlugin').constructor));

            this._uuids.splice(this._uuids.indexOf(plugin.uuid), 1);

            plugin.$element.removeAttr("data-".concat(pluginName)).removeData('zfPlugin')
            /**
             * Fires when the plugin has been destroyed.
             * @event Plugin#destroyed
             */
            .trigger("destroyed.zf.".concat(pluginName));

            for (var prop in plugin) {
              plugin[prop] = null; //clean up script to prep for garbage collection.
            }

            return;
          },

          /**
           * @function
           * Causes one or more active plugins to re-initialize, resetting event listeners, recalculating positions, etc.
           * @param {String} plugins - optional string of an individual plugin key, attained by calling `$(element).data('pluginName')`, or string of a plugin class i.e. `'dropdown'`
           * @default If no argument is passed, reflow all currently active plugins.
           */
          reInit: function reInit(plugins) {
            var isJQ = plugins instanceof jquery__WEBPACK_IMPORTED_MODULE_0___default.a;

            try {
              if (isJQ) {
                plugins.each(function () {
                  jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('zfPlugin')._init();
                });
              } else {
                var type = _typeof(plugins),
                    _this = this,
                    fns = {
                  'object': function object(plgs) {
                    plgs.forEach(function (p) {
                      p = hyphenate(p);
                      jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-' + p + ']').foundation('_init');
                    });
                  },
                  'string': function string() {
                    plugins = hyphenate(plugins);
                    jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-' + plugins + ']').foundation('_init');
                  },
                  'undefined': function undefined() {
                    this['object'](Object.keys(_this._plugins));
                  }
                };

                fns[type](plugins);
              }
            } catch (err) {
              console.error(err);
            } finally {
              return plugins;
            }
          },

          /**
           * Initialize plugins on any elements within `elem` (and `elem` itself) that aren't already initialized.
           * @param {Object} elem - jQuery object containing the element to check inside. Also checks the element itself, unless it's the `document` object.
           * @param {String|Array} plugins - A list of plugins to initialize. Leave this out to initialize everything.
           */
          reflow: function reflow(elem, plugins) {
            // If plugins is undefined, just grab everything
            if (typeof plugins === 'undefined') {
              plugins = Object.keys(this._plugins);
            } // If plugins is a string, convert it to an array with one item
            else if (typeof plugins === 'string') {
                plugins = [plugins];
              }

            var _this = this; // Iterate through each plugin


            jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(plugins, function (i, name) {
              // Get the current plugin
              var plugin = _this._plugins[name]; // Localize the search to all elements inside elem, as well as elem itself, unless elem === document

              var $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(elem).find('[data-' + name + ']').addBack('[data-' + name + ']'); // For each plugin found, initialize it

              $elem.each(function () {
                var $el = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
                    opts = {}; // Don't double-dip on plugins

                if ($el.data('zfPlugin')) {
                  console.warn("Tried to initialize " + name + " on an element that already has a Foundation plugin.");
                  return;
                }

                if ($el.attr('data-options')) {
                  var thing = $el.attr('data-options').split(';').forEach(function (e, i) {
                    var opt = e.split(':').map(function (el) {
                      return el.trim();
                    });
                    if (opt[0]) opts[opt[0]] = parseValue(opt[1]);
                  });
                }

                try {
                  $el.data('zfPlugin', new plugin(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), opts));
                } catch (er) {
                  console.error(er);
                } finally {
                  return;
                }
              });
            });
          },
          getFnName: functionName,
          addToJquery: function addToJquery($) {
            // TODO: consider not making this a jQuery function
            // TODO: need way to reflow vs. re-initialize

            /**
             * The Foundation jQuery method.
             * @param {String|Array} method - An action to perform on the current jQuery object.
             */
            var foundation = function foundation(method) {
              var type = _typeof(method),
                  $noJS = $('.no-js');

              if ($noJS.length) {
                $noJS.removeClass('no-js');
              }

              if (type === 'undefined') {
                //needs to initialize the Foundation object, or an individual plugin.
                _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_2__["MediaQuery"]._init();

                Foundation.reflow(this);
              } else if (type === 'string') {
                //an individual method to invoke on a plugin or group of plugins
                var args = Array.prototype.slice.call(arguments, 1); //collect all the arguments, if necessary

                var plugClass = this.data('zfPlugin'); //determine the class of plugin

                if (typeof plugClass !== 'undefined' && typeof plugClass[method] !== 'undefined') {
                  //make sure both the class and method exist
                  if (this.length === 1) {
                    //if there's only one, call it directly.
                    plugClass[method].apply(plugClass, args);
                  } else {
                    this.each(function (i, el) {
                      //otherwise loop through the jQuery collection and invoke the method on each
                      plugClass[method].apply($(el).data('zfPlugin'), args);
                    });
                  }
                } else {
                  //error for no class or no method
                  throw new ReferenceError("We're sorry, '" + method + "' is not an available method for " + (plugClass ? functionName(plugClass) : 'this element') + '.');
                }
              } else {
                //error for invalid argument type
                throw new TypeError("We're sorry, ".concat(type, " is not a valid parameter. You must use a string representing the method you wish to invoke."));
              }

              return this;
            };

            $.fn.foundation = foundation;
            return $;
          }
        };
        Foundation.util = {
          /**
           * Function for applying a debounce effect to a function call.
           * @function
           * @param {Function} func - Function to be called at end of timeout.
           * @param {Number} delay - Time in ms to delay the call of `func`.
           * @returns function
           */
          throttle: function throttle(func, delay) {
            var timer = null;
            return function () {
              var context = this,
                  args = arguments;

              if (timer === null) {
                timer = setTimeout(function () {
                  func.apply(context, args);
                  timer = null;
                }, delay);
              }
            };
          }
        };
        window.Foundation = Foundation; // Polyfill for requestAnimationFrame

        (function () {
          if (!Date.now || !window.Date.now) window.Date.now = Date.now = function () {
            return new Date().getTime();
          };
          var vendors = ['webkit', 'moz'];

          for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
            var vp = vendors[i];
            window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame'];
          }

          if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
            var lastTime = 0;

            window.requestAnimationFrame = function (callback) {
              var now = Date.now();
              var nextTime = Math.max(lastTime + 16, now);
              return setTimeout(function () {
                callback(lastTime = nextTime);
              }, nextTime - now);
            };

            window.cancelAnimationFrame = clearTimeout;
          }
          /**
           * Polyfill for performance.now, required by rAF
           */


          if (!window.performance || !window.performance.now) {
            window.performance = {
              start: Date.now(),
              now: function now() {
                return Date.now() - this.start;
              }
            };
          }
        })();

        if (!Function.prototype.bind) {
          Function.prototype.bind = function (oThis) {
            if (typeof this !== 'function') {
              // closest thing possible to the ECMAScript 5
              // internal IsCallable function
              throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
            }

            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function fNOP() {},
                fBound = function fBound() {
              return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
            };

            if (this.prototype) {
              // native functions don't have a prototype
              fNOP.prototype = this.prototype;
            }

            fBound.prototype = new fNOP();
            return fBound;
          };
        } // Polyfill to get the name of a function in IE9


        function functionName(fn) {
          if (typeof Function.prototype.name === 'undefined') {
            var funcNameRegex = /function\s([^(]{1,})\(/;
            var results = funcNameRegex.exec(fn.toString());
            return results && results.length > 1 ? results[1].trim() : "";
          } else if (typeof fn.prototype === 'undefined') {
            return fn.constructor.name;
          } else {
            return fn.prototype.constructor.name;
          }
        }

        function parseValue(str) {
          if ('true' === str) return true;else if ('false' === str) return false;else if (!isNaN(str * 1)) return parseFloat(str);
          return str;
        } // Convert PascalCase to kebab-case
        // Thank you: http://stackoverflow.com/a/8955580


        function hyphenate(str) {
          return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        }
        /***/

      },

      /***/
      "./js/foundation.core.plugin.js":
      /*!**************************************!*\
        !*** ./js/foundation.core.plugin.js ***!
        \**************************************/

      /*! exports provided: Plugin */

      /***/
      function jsFoundationCorePluginJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Plugin", function () {
          return Plugin;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        } // Abstract class for providing lifecycle hooks. Expect plugins to define AT LEAST
        // {function} _setup (replaces previous constructor),
        // {function} _destroy (replaces previous destroy)


        var Plugin =
        /*#__PURE__*/
        function () {
          function Plugin(element, options) {
            _classCallCheck(this, Plugin);

            this._setup(element, options);

            var pluginName = getPluginName(this);
            this.uuid = Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__["GetYoDigits"])(6, pluginName);

            if (!this.$element.attr("data-".concat(pluginName))) {
              this.$element.attr("data-".concat(pluginName), this.uuid);
            }

            if (!this.$element.data('zfPlugin')) {
              this.$element.data('zfPlugin', this);
            }
            /**
             * Fires when the plugin has initialized.
             * @event Plugin#init
             */


            this.$element.trigger("init.zf.".concat(pluginName));
          }

          _createClass(Plugin, [{
            key: "destroy",
            value: function destroy() {
              this._destroy();

              var pluginName = getPluginName(this);
              this.$element.removeAttr("data-".concat(pluginName)).removeData('zfPlugin')
              /**
               * Fires when the plugin has been destroyed.
               * @event Plugin#destroyed
               */
              .trigger("destroyed.zf.".concat(pluginName));

              for (var prop in this) {
                this[prop] = null; //clean up script to prep for garbage collection.
              }
            }
          }]);

          return Plugin;
        }(); // Convert PascalCase to kebab-case
        // Thank you: http://stackoverflow.com/a/8955580


        function hyphenate(str) {
          return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        }

        function getPluginName(obj) {
          if (typeof obj.constructor.name !== 'undefined') {
            return hyphenate(obj.constructor.name);
          } else {
            return hyphenate(obj.className);
          }
        }
        /***/

      },

      /***/
      "./js/foundation.core.utils.js":
      /*!*************************************!*\
        !*** ./js/foundation.core.utils.js ***!
        \*************************************/

      /*! exports provided: rtl, GetYoDigits, RegExpEscape, transitionend, onLoad, onLeaveElement */

      /***/
      function jsFoundationCoreUtilsJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "rtl", function () {
          return rtl;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "GetYoDigits", function () {
          return GetYoDigits;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "RegExpEscape", function () {
          return RegExpEscape;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "transitionend", function () {
          return transitionend;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "onLoad", function () {
          return onLoad;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "onLeaveElement", function () {
          return onLeaveElement;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__); // Core Foundation Utilities, utilized in a number of places.

        /**
         * Returns a boolean for RTL support
         */


        function rtl() {
          return jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').attr('dir') === 'rtl';
        }
        /**
         * returns a random base-36 uid with namespacing
         * @function
         * @param {Number} length - number of random base-36 digits desired. Increase for more random strings.
         * @param {String} namespace - name of plugin to be incorporated in uid, optional.
         * @default {String} '' - if no plugin name is provided, nothing is appended to the uid.
         * @returns {String} - unique id
         */


        function GetYoDigits(length, namespace) {
          length = length || 6;
          return Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)).toString(36).slice(1) + (namespace ? "-".concat(namespace) : '');
        }
        /**
         * Escape a string so it can be used as a regexp pattern
         * @function
         * @see https://stackoverflow.com/a/9310752/4317384
         *
         * @param {String} str - string to escape.
         * @returns {String} - escaped string
         */


        function RegExpEscape(str) {
          return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        }

        function transitionend($elem) {
          var transitions = {
            'transition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'otransitionend'
          };
          var elem = document.createElement('div'),
              end;

          for (var t in transitions) {
            if (typeof elem.style[t] !== 'undefined') {
              end = transitions[t];
            }
          }

          if (end) {
            return end;
          } else {
            end = setTimeout(function () {
              $elem.triggerHandler('transitionend', [$elem]);
            }, 1);
            return 'transitionend';
          }
        }
        /**
         * Return an event type to listen for window load.
         *
         * If `$elem` is passed, an event will be triggered on `$elem`. If window is already loaded, the event will still be triggered.
         * If `handler` is passed, attach it to the event on `$elem`.
         * Calling `onLoad` without handler allows you to get the event type that will be triggered before attaching the handler by yourself.
         * @function
         *
         * @param {Object} [] $elem - jQuery element on which the event will be triggered if passed.
         * @param {Function} [] handler - function to attach to the event.
         * @returns {String} - event type that should or will be triggered.
         */


        function onLoad($elem, handler) {
          var didLoad = document.readyState === 'complete';
          var eventType = (didLoad ? '_didLoad' : 'load') + '.zf.util.onLoad';

          var cb = function cb() {
            return $elem.triggerHandler(eventType);
          };

          if ($elem) {
            if (handler) $elem.one(eventType, handler);
            if (didLoad) setTimeout(cb);else jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).one('load', cb);
          }

          return eventType;
        }

        function onLeaveElement($elem, handler) {
          var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
              _ref$leaveWindow = _ref.leaveWindow,
              leaveWindow = _ref$leaveWindow === void 0 ? true : _ref$leaveWindow;

          var eventType = 'mouseleave.zf.util.onLeaveElement';

          if ($elem && handler) {
            $elem.on(eventType, function leaveHandler(e) {
              for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                rest[_key - 1] = arguments[_key];
              }

              var _this = this;

              setTimeout(function leaveEventDebouncer() {
                if (e.relatedTarget === null && leaveWindow && document.hasFocus && document.hasFocus()) {
                  jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).one('mouseenter', function reenterHandler(reeenterE) {
                    if ($elem.has(reeenterE.target).length) {
                      return false;
                    }

                    ;
                    e.relatedTarget = reeenterE.target;
                    handler.call.apply(handler, [_this, e].concat(rest));
                  });
                  return false;
                }

                handler.call.apply(handler, [_this, e].concat(rest));
              });
            });
          }

          return eventType;
        }
        /***/

      },

      /***/
      "./js/foundation.drilldown.js":
      /*!************************************!*\
        !*** ./js/foundation.drilldown.js ***!
        \************************************/

      /*! exports provided: Drilldown */

      /***/
      function jsFoundationDrilldownJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Drilldown", function () {
          return Drilldown;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.util.keyboard */
        "./js/foundation.util.keyboard.js");
        /* harmony import */


        var _foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./foundation.util.nest */
        "./js/foundation.util.nest.js");
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");
        /* harmony import */


        var _foundation_util_box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
        /*! ./foundation.util.box */
        "./js/foundation.util.box.js");
        /* harmony import */


        var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
        /*! ./foundation.core.plugin */
        "./js/foundation.core.plugin.js");

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        }
        /**
         * Drilldown module.
         * @module foundation.drilldown
         * @requires foundation.util.keyboard
         * @requires foundation.util.nest
         * @requires foundation.util.box
         */


        var Drilldown =
        /*#__PURE__*/
        function (_Plugin) {
          _inherits(Drilldown, _Plugin);

          function Drilldown() {
            _classCallCheck(this, Drilldown);

            return _possibleConstructorReturn(this, _getPrototypeOf(Drilldown).apply(this, arguments));
          }

          _createClass(Drilldown, [{
            key: "_setup",

            /**
             * Creates a new instance of a drilldown menu.
             * @class
             * @name Drilldown
             * @param {jQuery} element - jQuery object to make into an accordion menu.
             * @param {Object} options - Overrides to the default plugin settings.
             */
            value: function _setup(element, options) {
              this.$element = element;
              this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, Drilldown.defaults, this.$element.data(), options);
              this.className = 'Drilldown'; // ie9 back compat

              this._init();

              _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__["Keyboard"].register('Drilldown', {
                'ENTER': 'open',
                'SPACE': 'open',
                'ARROW_RIGHT': 'next',
                'ARROW_UP': 'up',
                'ARROW_DOWN': 'down',
                'ARROW_LEFT': 'previous',
                'ESCAPE': 'close',
                'TAB': 'down',
                'SHIFT_TAB': 'up'
              });
            }
            /**
             * Initializes the drilldown by creating jQuery collections of elements
             * @private
             */

          }, {
            key: "_init",
            value: function _init() {
              _foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__["Nest"].Feather(this.$element, 'drilldown');

              if (this.options.autoApplyClass) {
                this.$element.addClass('drilldown');
              }

              this.$element.attr({
                'role': 'tree',
                'aria-multiselectable': false
              });
              this.$submenuAnchors = this.$element.find('li.is-drilldown-submenu-parent').children('a');
              this.$submenus = this.$submenuAnchors.parent('li').children('[data-submenu]').attr('role', 'group');
              this.$menuItems = this.$element.find('li').not('.js-drilldown-back').attr('role', 'treeitem').find('a'); // Set the main menu as current by default (unless a submenu is selected)
              // Used to set the wrapper height when the drilldown is closed/reopened from any (sub)menu

              this.$currentMenu = this.$element;
              this.$element.attr('data-mutate', this.$element.attr('data-drilldown') || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["GetYoDigits"])(6, 'drilldown'));

              this._prepareMenu();

              this._registerEvents();

              this._keyboardEvents();
            }
            /**
             * prepares drilldown menu by setting attributes to links and elements
             * sets a min height to prevent content jumping
             * wraps the element if not already wrapped
             * @private
             * @function
             */

          }, {
            key: "_prepareMenu",
            value: function _prepareMenu() {
              var _this = this; // if(!this.options.holdOpen){
              //   this._menuLinkEvents();
              // }


              this.$submenuAnchors.each(function () {
                var $link = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
                var $sub = $link.parent();

                if (_this.options.parentLink) {
                  $link.clone().prependTo($sub.children('[data-submenu]')).wrap('<li data-is-parent-link class="is-submenu-parent-item is-submenu-item is-drilldown-submenu-item" role="menuitem"></li>');
                }

                $link.data('savedHref', $link.attr('href')).removeAttr('href').attr('tabindex', 0);
                $link.children('[data-submenu]').attr({
                  'aria-hidden': true,
                  'tabindex': 0,
                  'role': 'group'
                });

                _this._events($link);
              });
              this.$submenus.each(function () {
                var $menu = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
                    $back = $menu.find('.js-drilldown-back');

                if (!$back.length) {
                  switch (_this.options.backButtonPosition) {
                    case "bottom":
                      $menu.append(_this.options.backButton);
                      break;

                    case "top":
                      $menu.prepend(_this.options.backButton);
                      break;

                    default:
                      console.error("Unsupported backButtonPosition value '" + _this.options.backButtonPosition + "'");
                  }
                }

                _this._back($menu);
              });
              this.$submenus.addClass('invisible');

              if (!this.options.autoHeight) {
                this.$submenus.addClass('drilldown-submenu-cover-previous');
              } // create a wrapper on element if it doesn't exist.


              if (!this.$element.parent().hasClass('is-drilldown')) {
                this.$wrapper = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.options.wrapper).addClass('is-drilldown');
                if (this.options.animateHeight) this.$wrapper.addClass('animate-height');
                this.$element.wrap(this.$wrapper);
              } // set wrapper


              this.$wrapper = this.$element.parent();
              this.$wrapper.css(this._getMaxDims());
            }
          }, {
            key: "_resize",
            value: function _resize() {
              this.$wrapper.css({
                'max-width': 'none',
                'min-height': 'none'
              }); // _getMaxDims has side effects (boo) but calling it should update all other necessary heights & widths

              this.$wrapper.css(this._getMaxDims());
            }
            /**
             * Adds event handlers to elements in the menu.
             * @function
             * @private
             * @param {jQuery} $elem - the current menu item to add handlers to.
             */

          }, {
            key: "_events",
            value: function _events($elem) {
              var _this = this;

              $elem.off('click.zf.drilldown').on('click.zf.drilldown', function (e) {
                if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parentsUntil('ul', 'li').hasClass('is-drilldown-submenu-parent')) {
                  e.stopImmediatePropagation();
                  e.preventDefault();
                } // if(e.target !== e.currentTarget.firstElementChild){
                //   return false;
                // }


                _this._show($elem.parent('li'));

                if (_this.options.closeOnClick) {
                  var $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body');
                  $body.off('.zf.drilldown').on('click.zf.drilldown', function (e) {
                    if (e.target === _this.$element[0] || jquery__WEBPACK_IMPORTED_MODULE_0___default.a.contains(_this.$element[0], e.target)) {
                      return;
                    }

                    e.preventDefault();

                    _this._hideAll();

                    $body.off('.zf.drilldown');
                  });
                }
              });
            }
            /**
             * Adds event handlers to the menu element.
             * @function
             * @private
             */

          }, {
            key: "_registerEvents",
            value: function _registerEvents() {
              if (this.options.scrollTop) {
                this._bindHandler = this._scrollTop.bind(this);
                this.$element.on('open.zf.drilldown hide.zf.drilldown closed.zf.drilldown', this._bindHandler);
              }

              this.$element.on('mutateme.zf.trigger', this._resize.bind(this));
            }
            /**
             * Scroll to Top of Element or data-scroll-top-element
             * @function
             * @fires Drilldown#scrollme
             */

          }, {
            key: "_scrollTop",
            value: function _scrollTop() {
              var _this = this;

              var $scrollTopElement = _this.options.scrollTopElement != '' ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(_this.options.scrollTopElement) : _this.$element,
                  scrollPos = parseInt($scrollTopElement.offset().top + _this.options.scrollTopOffset, 10);
              jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').stop(true).animate({
                scrollTop: scrollPos
              }, _this.options.animationDuration, _this.options.animationEasing, function () {
                /**
                  * Fires after the menu has scrolled
                  * @event Drilldown#scrollme
                  */
                if (this === jquery__WEBPACK_IMPORTED_MODULE_0___default()('html')[0]) _this.$element.trigger('scrollme.zf.drilldown');
              });
            }
            /**
             * Adds keydown event listener to `li`'s in the menu.
             * @private
             */

          }, {
            key: "_keyboardEvents",
            value: function _keyboardEvents() {
              var _this = this;

              this.$menuItems.add(this.$element.find('.js-drilldown-back > a, .is-submenu-parent-item > a')).on('keydown.zf.drilldown', function (e) {
                var $element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
                    $elements = $element.parent('li').parent('ul').children('li').children('a'),
                    $prevElement,
                    $nextElement;
                $elements.each(function (i) {
                  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is($element)) {
                    $prevElement = $elements.eq(Math.max(0, i - 1));
                    $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1));
                    return;
                  }
                });

                _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__["Keyboard"].handleKey(e, 'Drilldown', {
                  next: function next() {
                    if ($element.is(_this.$submenuAnchors)) {
                      _this._show($element.parent('li'));

                      $element.parent('li').one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["transitionend"])($element), function () {
                        $element.parent('li').find('ul li a').not('.js-drilldown-back a').first().focus();
                      });
                      return true;
                    }
                  },
                  previous: function previous() {
                    _this._hide($element.parent('li').parent('ul'));

                    $element.parent('li').parent('ul').one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["transitionend"])($element), function () {
                      setTimeout(function () {
                        $element.parent('li').parent('ul').parent('li').children('a').first().focus();
                      }, 1);
                    });
                    return true;
                  },
                  up: function up() {
                    $prevElement.focus(); // Don't tap focus on first element in root ul

                    return !$element.is(_this.$element.find('> li:first-child > a'));
                  },
                  down: function down() {
                    $nextElement.focus(); // Don't tap focus on last element in root ul

                    return !$element.is(_this.$element.find('> li:last-child > a'));
                  },
                  close: function close() {
                    // Don't close on element in root ul
                    if (!$element.is(_this.$element.find('> li > a'))) {
                      _this._hide($element.parent().parent());

                      $element.parent().parent().siblings('a').focus();
                    }
                  },
                  open: function open() {
                    if (_this.options.parentLink && $element.attr('href')) {
                      // Link with href
                      return false;
                    } else if (!$element.is(_this.$menuItems)) {
                      // not menu item means back button
                      _this._hide($element.parent('li').parent('ul'));

                      $element.parent('li').parent('ul').one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["transitionend"])($element), function () {
                        setTimeout(function () {
                          $element.parent('li').parent('ul').parent('li').children('a').first().focus();
                        }, 1);
                      });
                      return true;
                    } else if ($element.is(_this.$submenuAnchors)) {
                      // Sub menu item
                      _this._show($element.parent('li'));

                      $element.parent('li').one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["transitionend"])($element), function () {
                        $element.parent('li').find('ul li a').not('.js-drilldown-back a').first().focus();
                      });
                      return true;
                    }
                  },
                  handled: function handled(preventDefault) {
                    if (preventDefault) {
                      e.preventDefault();
                    }

                    e.stopImmediatePropagation();
                  }
                });
              }); // end keyboardAccess
            }
            /**
             * Closes all open elements, and returns to root menu.
             * @function
             * @fires Drilldown#closed
             */

          }, {
            key: "_hideAll",
            value: function _hideAll() {
              var $elem = this.$element.find('.is-drilldown-submenu.is-active').addClass('is-closing');
              if (this.options.autoHeight) this.$wrapper.css({
                height: $elem.parent().closest('ul').data('calcHeight')
              });
              $elem.one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["transitionend"])($elem), function (e) {
                $elem.removeClass('is-active is-closing');
              });
              /**
               * Fires when the menu is fully closed.
               * @event Drilldown#closed
               */

              this.$element.trigger('closed.zf.drilldown');
            }
            /**
             * Adds event listener for each `back` button, and closes open menus.
             * @function
             * @fires Drilldown#back
             * @param {jQuery} $elem - the current sub-menu to add `back` event.
             */

          }, {
            key: "_back",
            value: function _back($elem) {
              var _this = this;

              $elem.off('click.zf.drilldown');
              $elem.children('.js-drilldown-back').on('click.zf.drilldown', function (e) {
                e.stopImmediatePropagation(); // console.log('mouseup on back');

                _this._hide($elem); // If there is a parent submenu, call show


                var parentSubMenu = $elem.parent('li').parent('ul').parent('li');

                if (parentSubMenu.length) {
                  _this._show(parentSubMenu);
                }
              });
            }
            /**
             * Adds event listener to menu items w/o submenus to close open menus on click.
             * @function
             * @private
             */

          }, {
            key: "_menuLinkEvents",
            value: function _menuLinkEvents() {
              var _this = this;

              this.$menuItems.not('.is-drilldown-submenu-parent').off('click.zf.drilldown').on('click.zf.drilldown', function (e) {
                // e.stopImmediatePropagation();
                setTimeout(function () {
                  _this._hideAll();
                }, 0);
              });
            }
            /**
             * Sets the CSS classes for submenu to show it.
             * @function
             * @private
             * @param {jQuery} $elem - the target submenu (`ul` tag)
             * @param {boolean} trigger - trigger drilldown event
             */

          }, {
            key: "_setShowSubMenuClasses",
            value: function _setShowSubMenuClasses($elem, trigger) {
              $elem.addClass('is-active').removeClass('invisible').attr('aria-hidden', false);
              $elem.parent('li').attr('aria-expanded', true);

              if (trigger === true) {
                this.$element.trigger('open.zf.drilldown', [$elem]);
              }
            }
            /**
             * Sets the CSS classes for submenu to hide it.
             * @function
             * @private
             * @param {jQuery} $elem - the target submenu (`ul` tag)
             * @param {boolean} trigger - trigger drilldown event
             */

          }, {
            key: "_setHideSubMenuClasses",
            value: function _setHideSubMenuClasses($elem, trigger) {
              $elem.removeClass('is-active').addClass('invisible').attr('aria-hidden', true);
              $elem.parent('li').attr('aria-expanded', false);

              if (trigger === true) {
                $elem.trigger('hide.zf.drilldown', [$elem]);
              }
            }
            /**
             * Opens a specific drilldown (sub)menu no matter which (sub)menu in it is currently visible.
             * Compared to _show() this lets you jump into any submenu without clicking through every submenu on the way to it.
             * @function
             * @fires Drilldown#open
             * @param {jQuery} $elem - the target (sub)menu (`ul` tag)
             * @param {boolean} autoFocus - if true the first link in the target (sub)menu gets auto focused
             */

          }, {
            key: "_showMenu",
            value: function _showMenu($elem, autoFocus) {
              var _this = this; // Reset drilldown


              var $expandedSubmenus = this.$element.find('li[aria-expanded="true"] > ul[data-submenu]');
              $expandedSubmenus.each(function (index) {
                _this._setHideSubMenuClasses(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
              }); // Save the menu as the currently displayed one.

              this.$currentMenu = $elem; // If target menu is root, focus first link & exit

              if ($elem.is('[data-drilldown]')) {
                if (autoFocus === true) $elem.find('li[role="treeitem"] > a').first().focus();
                if (this.options.autoHeight) this.$wrapper.css('height', $elem.data('calcHeight'));
                return;
              } // Find all submenus on way to root incl. the element itself


              var $submenus = $elem.children().first().parentsUntil('[data-drilldown]', '[data-submenu]'); // Open target menu and all submenus on its way to root

              $submenus.each(function (index) {
                // Update height of first child (target menu) if autoHeight option true
                if (index === 0 && _this.options.autoHeight) {
                  _this.$wrapper.css('height', jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('calcHeight'));
                }

                var isLastChild = index == $submenus.length - 1; // Add transitionsend listener to last child (root due to reverse order) to open target menu's first link
                // Last child makes sure the event gets always triggered even if going through several menus

                if (isLastChild === true) {
                  jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["transitionend"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this)), function () {
                    if (autoFocus === true) {
                      $elem.find('li[role="treeitem"] > a').first().focus();
                    }
                  });
                }

                _this._setShowSubMenuClasses(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), isLastChild);
              });
            }
            /**
             * Opens a submenu.
             * @function
             * @fires Drilldown#open
             * @param {jQuery} $elem - the current element with a submenu to open, i.e. the `li` tag.
             */

          }, {
            key: "_show",
            value: function _show($elem) {
              var $submenu = $elem.children('[data-submenu]');
              $elem.attr('aria-expanded', true);
              this.$currentMenu = $submenu;
              $submenu.addClass('is-active').removeClass('invisible').attr('aria-hidden', false);

              if (this.options.autoHeight) {
                this.$wrapper.css({
                  height: $submenu.data('calcHeight')
                });
              }
              /**
               * Fires when the submenu has opened.
               * @event Drilldown#open
               */


              this.$element.trigger('open.zf.drilldown', [$elem]);
            }
            /**
             * Hides a submenu
             * @function
             * @fires Drilldown#hide
             * @param {jQuery} $elem - the current sub-menu to hide, i.e. the `ul` tag.
             */

          }, {
            key: "_hide",
            value: function _hide($elem) {
              if (this.options.autoHeight) this.$wrapper.css({
                height: $elem.parent().closest('ul').data('calcHeight')
              });

              var _this = this;

              $elem.parent('li').attr('aria-expanded', false);
              $elem.attr('aria-hidden', true);
              $elem.addClass('is-closing').one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["transitionend"])($elem), function () {
                $elem.removeClass('is-active is-closing');
                $elem.blur().addClass('invisible');
              });
              /**
               * Fires when the submenu has closed.
               * @event Drilldown#hide
               */

              $elem.trigger('hide.zf.drilldown', [$elem]);
            }
            /**
             * Iterates through the nested menus to calculate the min-height, and max-width for the menu.
             * Prevents content jumping.
             * @function
             * @private
             */

          }, {
            key: "_getMaxDims",
            value: function _getMaxDims() {
              var maxHeight = 0,
                  result = {},
                  _this = this; // Recalculate menu heights and total max height


              this.$submenus.add(this.$element).each(function () {
                var numOfElems = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children('li').length;

                var height = _foundation_util_box__WEBPACK_IMPORTED_MODULE_4__["Box"].GetDimensions(this).height;

                maxHeight = height > maxHeight ? height : maxHeight;

                if (_this.options.autoHeight) {
                  jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('calcHeight', height);
                }
              });
              if (this.options.autoHeight) result['height'] = this.$currentMenu.data('calcHeight');else result['min-height'] = "".concat(maxHeight, "px");
              result['max-width'] = "".concat(this.$element[0].getBoundingClientRect().width, "px");
              return result;
            }
            /**
             * Destroys the Drilldown Menu
             * @function
             */

          }, {
            key: "_destroy",
            value: function _destroy() {
              if (this.options.scrollTop) this.$element.off('.zf.drilldown', this._bindHandler);

              this._hideAll();

              this.$element.off('mutateme.zf.trigger');

              _foundation_util_nest__WEBPACK_IMPORTED_MODULE_2__["Nest"].Burn(this.$element, 'drilldown');

              this.$element.unwrap().find('.js-drilldown-back, .is-submenu-parent-item').remove().end().find('.is-active, .is-closing, .is-drilldown-submenu').removeClass('is-active is-closing is-drilldown-submenu').end().find('[data-submenu]').removeAttr('aria-hidden tabindex role');
              this.$submenuAnchors.each(function () {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).off('.zf.drilldown');
              });
              this.$element.find('[data-is-parent-link]').detach();
              this.$submenus.removeClass('drilldown-submenu-cover-previous invisible');
              this.$element.find('a').each(function () {
                var $link = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
                $link.removeAttr('tabindex');

                if ($link.data('savedHref')) {
                  $link.attr('href', $link.data('savedHref')).removeData('savedHref');
                } else {
                  return;
                }
              });
            }
          }]);

          return Drilldown;
        }(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_5__["Plugin"]);

        Drilldown.defaults = {
          /**
           * Drilldowns depend on styles in order to function properly; in the default build of Foundation these are
           * on the `drilldown` class. This option auto-applies this class to the drilldown upon initialization.
           * @option
           * @type {boolian}
           * @default true
           */
          autoApplyClass: true,

          /**
           * Markup used for JS generated back button. Prepended  or appended (see backButtonPosition) to submenu lists and deleted on `destroy` method, 'js-drilldown-back' class required. Remove the backslash (`\`) if copy and pasting.
           * @option
           * @type {string}
           * @default '<li class="js-drilldown-back"><a tabindex="0">Back</a></li>'
           */
          backButton: '<li class="js-drilldown-back"><a tabindex="0">Back</a></li>',

          /**
           * Position the back button either at the top or bottom of drilldown submenus. Can be `'left'` or `'bottom'`.
           * @option
           * @type {string}
           * @default top
           */
          backButtonPosition: 'top',

          /**
           * Markup used to wrap drilldown menu. Use a class name for independent styling; the JS applied class: `is-drilldown` is required. Remove the backslash (`\`) if copy and pasting.
           * @option
           * @type {string}
           * @default '<div></div>'
           */
          wrapper: '<div></div>',

          /**
           * Adds the parent link to the submenu.
           * @option
           * @type {boolean}
           * @default false
           */
          parentLink: false,

          /**
           * Allow the menu to return to root list on body click.
           * @option
           * @type {boolean}
           * @default false
           */
          closeOnClick: false,

          /**
           * Allow the menu to auto adjust height.
           * @option
           * @type {boolean}
           * @default false
           */
          autoHeight: false,

          /**
           * Animate the auto adjust height.
           * @option
           * @type {boolean}
           * @default false
           */
          animateHeight: false,

          /**
           * Scroll to the top of the menu after opening a submenu or navigating back using the menu back button
           * @option
           * @type {boolean}
           * @default false
           */
          scrollTop: false,

          /**
           * String jquery selector (for example 'body') of element to take offset().top from, if empty string the drilldown menu offset().top is taken
           * @option
           * @type {string}
           * @default ''
           */
          scrollTopElement: '',

          /**
           * ScrollTop offset
           * @option
           * @type {number}
           * @default 0
           */
          scrollTopOffset: 0,

          /**
           * Scroll animation duration
           * @option
           * @type {number}
           * @default 500
           */
          animationDuration: 500,

          /**
           * Scroll animation easing. Can be `'swing'` or `'linear'`.
           * @option
           * @type {string}
           * @see {@link https://api.jquery.com/animate|JQuery animate}
           * @default 'swing'
           */
          animationEasing: 'swing' // holdOpen: false

        };
        /***/
      },

      /***/
      "./js/foundation.dropdown.js":
      /*!***********************************!*\
        !*** ./js/foundation.dropdown.js ***!
        \***********************************/

      /*! exports provided: Dropdown */

      /***/
      function jsFoundationDropdownJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Dropdown", function () {
          return Dropdown;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.util.keyboard */
        "./js/foundation.util.keyboard.js");
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");
        /* harmony import */


        var _foundation_positionable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ./foundation.positionable */
        "./js/foundation.positionable.js");
        /* harmony import */


        var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
        /*! ./foundation.util.triggers */
        "./js/foundation.util.triggers.js");

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _get(target, property, receiver) {
          if (typeof Reflect !== "undefined" && Reflect.get) {
            _get = Reflect.get;
          } else {
            _get = function _get(target, property, receiver) {
              var base = _superPropBase(target, property);

              if (!base) return;
              var desc = Object.getOwnPropertyDescriptor(base, property);

              if (desc.get) {
                return desc.get.call(receiver);
              }

              return desc.value;
            };
          }

          return _get(target, property, receiver || target);
        }

        function _superPropBase(object, property) {
          while (!Object.prototype.hasOwnProperty.call(object, property)) {
            object = _getPrototypeOf(object);
            if (object === null) break;
          }

          return object;
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        }
        /**
         * Dropdown module.
         * @module foundation.dropdown
         * @requires foundation.util.keyboard
         * @requires foundation.util.box
         * @requires foundation.util.triggers
         */


        var Dropdown =
        /*#__PURE__*/
        function (_Positionable) {
          _inherits(Dropdown, _Positionable);

          function Dropdown() {
            _classCallCheck(this, Dropdown);

            return _possibleConstructorReturn(this, _getPrototypeOf(Dropdown).apply(this, arguments));
          }

          _createClass(Dropdown, [{
            key: "_setup",

            /**
             * Creates a new instance of a dropdown.
             * @class
             * @name Dropdown
             * @param {jQuery} element - jQuery object to make into a dropdown.
             *        Object should be of the dropdown panel, rather than its anchor.
             * @param {Object} options - Overrides to the default plugin settings.
             */
            value: function _setup(element, options) {
              this.$element = element;
              this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, Dropdown.defaults, this.$element.data(), options);
              this.className = 'Dropdown'; // ie9 back compat
              // Triggers init is idempotent, just need to make sure it is initialized

              _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__["Triggers"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);

              this._init();

              _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__["Keyboard"].register('Dropdown', {
                'ENTER': 'toggle',
                'SPACE': 'toggle',
                'ESCAPE': 'close'
              });
            }
            /**
             * Initializes the plugin by setting/checking options and attributes, adding helper variables, and saving the anchor.
             * @function
             * @private
             */

          }, {
            key: "_init",
            value: function _init() {
              var $id = this.$element.attr('id');
              this.$anchors = jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-toggle=\"".concat($id, "\"]")).length ? jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-toggle=\"".concat($id, "\"]")) : jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-open=\"".concat($id, "\"]"));
              this.$anchors.attr({
                'aria-controls': $id,
                'data-is-focus': false,
                'data-yeti-box': $id,
                'aria-haspopup': true,
                'aria-expanded': false
              });

              this._setCurrentAnchor(this.$anchors.first());

              if (this.options.parentClass) {
                this.$parent = this.$element.parents('.' + this.options.parentClass);
              } else {
                this.$parent = null;
              } // Do not change the `labelledby` if it is defined


              var labelledby = this.$element.attr('aria-labelledby') || this.$currentAnchor.attr('id') || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["GetYoDigits"])(6, 'dd-anchor');
              this.$element.attr({
                'aria-hidden': 'true',
                'data-yeti-box': $id,
                'data-resize': $id,
                'aria-labelledby': labelledby
              });

              _get(_getPrototypeOf(Dropdown.prototype), "_init", this).call(this);

              this._events();
            }
          }, {
            key: "_getDefaultPosition",
            value: function _getDefaultPosition() {
              // handle legacy classnames
              var position = this.$element[0].className.match(/(top|left|right|bottom)/g);

              if (position) {
                return position[0];
              } else {
                return 'bottom';
              }
            }
          }, {
            key: "_getDefaultAlignment",
            value: function _getDefaultAlignment() {
              // handle legacy float approach
              var horizontalPosition = /float-(\S+)/.exec(this.$currentAnchor.attr('class'));

              if (horizontalPosition) {
                return horizontalPosition[1];
              }

              return _get(_getPrototypeOf(Dropdown.prototype), "_getDefaultAlignment", this).call(this);
            }
            /**
             * Sets the position and orientation of the dropdown pane, checks for collisions if allow-overlap is not true.
             * Recursively calls itself if a collision is detected, with a new position class.
             * @function
             * @private
             */

          }, {
            key: "_setPosition",
            value: function _setPosition() {
              this.$element.removeClass("has-position-".concat(this.position, " has-alignment-").concat(this.alignment));

              _get(_getPrototypeOf(Dropdown.prototype), "_setPosition", this).call(this, this.$currentAnchor, this.$element, this.$parent);

              this.$element.addClass("has-position-".concat(this.position, " has-alignment-").concat(this.alignment));
            }
            /**
             * Make it a current anchor.
             * Current anchor as the reference for the position of Dropdown panes.
             * @param {HTML} el - DOM element of the anchor.
             * @function
             * @private
             */

          }, {
            key: "_setCurrentAnchor",
            value: function _setCurrentAnchor(el) {
              this.$currentAnchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el);
            }
            /**
             * Adds event listeners to the element utilizing the triggers utility library.
             * @function
             * @private
             */

          }, {
            key: "_events",
            value: function _events() {
              var _this = this;

              this.$element.on({
                'open.zf.trigger': this.open.bind(this),
                'close.zf.trigger': this.close.bind(this),
                'toggle.zf.trigger': this.toggle.bind(this),
                'resizeme.zf.trigger': this._setPosition.bind(this)
              });
              this.$anchors.off('click.zf.trigger').on('click.zf.trigger', function () {
                _this._setCurrentAnchor(this);
              });

              if (this.options.hover) {
                this.$anchors.off('mouseenter.zf.dropdown mouseleave.zf.dropdown').on('mouseenter.zf.dropdown', function () {
                  _this._setCurrentAnchor(this);

                  var bodyData = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').data();

                  if (typeof bodyData.whatinput === 'undefined' || bodyData.whatinput === 'mouse') {
                    clearTimeout(_this.timeout);
                    _this.timeout = setTimeout(function () {
                      _this.open();

                      _this.$anchors.data('hover', true);
                    }, _this.options.hoverDelay);
                  }
                }).on('mouseleave.zf.dropdown', function () {
                  clearTimeout(_this.timeout);
                  _this.timeout = setTimeout(function () {
                    _this.close();

                    _this.$anchors.data('hover', false);
                  }, _this.options.hoverDelay);
                });

                if (this.options.hoverPane) {
                  this.$element.off('mouseenter.zf.dropdown mouseleave.zf.dropdown').on('mouseenter.zf.dropdown', function () {
                    clearTimeout(_this.timeout);
                  }).on('mouseleave.zf.dropdown', function () {
                    clearTimeout(_this.timeout);
                    _this.timeout = setTimeout(function () {
                      _this.close();

                      _this.$anchors.data('hover', false);
                    }, _this.options.hoverDelay);
                  });
                }
              }

              this.$anchors.add(this.$element).on('keydown.zf.dropdown', function (e) {
                var $target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
                    visibleFocusableElements = _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__["Keyboard"].findFocusable(_this.$element);

                _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__["Keyboard"].handleKey(e, 'Dropdown', {
                  open: function open() {
                    if ($target.is(_this.$anchors) && !$target.is('input, textarea')) {
                      _this.open();

                      _this.$element.attr('tabindex', -1).focus();

                      e.preventDefault();
                    }
                  },
                  close: function close() {
                    _this.close();

                    _this.$anchors.focus();
                  }
                });
              });
            }
            /**
             * Adds an event handler to the body to close any dropdowns on a click.
             * @function
             * @private
             */

          }, {
            key: "_addBodyHandler",
            value: function _addBodyHandler() {
              var $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).not(this.$element),
                  _this = this;

              $body.off('click.zf.dropdown').on('click.zf.dropdown', function (e) {
                if (_this.$anchors.is(e.target) || _this.$anchors.find(e.target).length) {
                  return;
                }

                if (_this.$element.is(e.target) || _this.$element.find(e.target).length) {
                  return;
                }

                _this.close();

                $body.off('click.zf.dropdown');
              });
            }
            /**
             * Opens the dropdown pane, and fires a bubbling event to close other dropdowns.
             * @function
             * @fires Dropdown#closeme
             * @fires Dropdown#show
             */

          }, {
            key: "open",
            value: function open() {
              // var _this = this;

              /**
               * Fires to close other open dropdowns, typically when dropdown is opening
               * @event Dropdown#closeme
               */
              this.$element.trigger('closeme.zf.dropdown', this.$element.attr('id'));
              this.$anchors.addClass('hover').attr({
                'aria-expanded': true
              }); // this.$element/*.show()*/;

              this.$element.addClass('is-opening');

              this._setPosition();

              this.$element.removeClass('is-opening').addClass('is-open').attr({
                'aria-hidden': false
              });

              if (this.options.autoFocus) {
                var $focusable = _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__["Keyboard"].findFocusable(this.$element);

                if ($focusable.length) {
                  $focusable.eq(0).focus();
                }
              }

              if (this.options.closeOnClick) {
                this._addBodyHandler();
              }

              if (this.options.trapFocus) {
                _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__["Keyboard"].trapFocus(this.$element);
              }
              /**
               * Fires once the dropdown is visible.
               * @event Dropdown#show
               */


              this.$element.trigger('show.zf.dropdown', [this.$element]);
            }
            /**
             * Closes the open dropdown pane.
             * @function
             * @fires Dropdown#hide
             */

          }, {
            key: "close",
            value: function close() {
              if (!this.$element.hasClass('is-open')) {
                return false;
              }

              this.$element.removeClass('is-open').attr({
                'aria-hidden': true
              });
              this.$anchors.removeClass('hover').attr('aria-expanded', false);
              /**
               * Fires once the dropdown is no longer visible.
               * @event Dropdown#hide
               */

              this.$element.trigger('hide.zf.dropdown', [this.$element]);

              if (this.options.trapFocus) {
                _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__["Keyboard"].releaseFocus(this.$element);
              }
            }
            /**
             * Toggles the dropdown pane's visibility.
             * @function
             */

          }, {
            key: "toggle",
            value: function toggle() {
              if (this.$element.hasClass('is-open')) {
                if (this.$anchors.data('hover')) return;
                this.close();
              } else {
                this.open();
              }
            }
            /**
             * Destroys the dropdown.
             * @function
             */

          }, {
            key: "_destroy",
            value: function _destroy() {
              this.$element.off('.zf.trigger').hide();
              this.$anchors.off('.zf.dropdown');
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).off('click.zf.dropdown');
            }
          }]);

          return Dropdown;
        }(_foundation_positionable__WEBPACK_IMPORTED_MODULE_3__["Positionable"]);

        Dropdown.defaults = {
          /**
           * Class that designates bounding container of Dropdown (default: window)
           * @option
           * @type {?string}
           * @default null
           */
          parentClass: null,

          /**
           * Amount of time to delay opening a submenu on hover event.
           * @option
           * @type {number}
           * @default 250
           */
          hoverDelay: 250,

          /**
           * Allow submenus to open on hover events
           * @option
           * @type {boolean}
           * @default false
           */
          hover: false,

          /**
           * Don't close dropdown when hovering over dropdown pane
           * @option
           * @type {boolean}
           * @default false
           */
          hoverPane: false,

          /**
           * Number of pixels between the dropdown pane and the triggering element on open.
           * @option
           * @type {number}
           * @default 0
           */
          vOffset: 0,

          /**
           * Number of pixels between the dropdown pane and the triggering element on open.
           * @option
           * @type {number}
           * @default 0
           */
          hOffset: 0,

          /**
           * Position of dropdown. Can be left, right, bottom, top, or auto.
           * @option
           * @type {string}
           * @default 'auto'
           */
          position: 'auto',

          /**
           * Alignment of dropdown relative to anchor. Can be left, right, bottom, top, center, or auto.
           * @option
           * @type {string}
           * @default 'auto'
           */
          alignment: 'auto',

          /**
           * Allow overlap of container/window. If false, dropdown will first try to position as defined by data-position and data-alignment, but reposition if it would cause an overflow.
           * @option
           * @type {boolean}
           * @default false
           */
          allowOverlap: false,

          /**
           * Allow overlap of only the bottom of the container. This is the most common
           * behavior for dropdowns, allowing the dropdown to extend the bottom of the
           * screen but not otherwise influence or break out of the container.
           * @option
           * @type {boolean}
           * @default true
           */
          allowBottomOverlap: true,

          /**
           * Allow the plugin to trap focus to the dropdown pane if opened with keyboard commands.
           * @option
           * @type {boolean}
           * @default false
           */
          trapFocus: false,

          /**
           * Allow the plugin to set focus to the first focusable element within the pane, regardless of method of opening.
           * @option
           * @type {boolean}
           * @default false
           */
          autoFocus: false,

          /**
           * Allows a click on the body to close the dropdown.
           * @option
           * @type {boolean}
           * @default false
           */
          closeOnClick: false
        };
        /***/
      },

      /***/
      "./js/foundation.dropdownMenu.js":
      /*!***************************************!*\
        !*** ./js/foundation.dropdownMenu.js ***!
        \***************************************/

      /*! exports provided: DropdownMenu */

      /***/
      function jsFoundationDropdownMenuJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "DropdownMenu", function () {
          return DropdownMenu;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.core.plugin */
        "./js/foundation.core.plugin.js");
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");
        /* harmony import */


        var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ./foundation.util.keyboard */
        "./js/foundation.util.keyboard.js");
        /* harmony import */


        var _foundation_util_nest__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
        /*! ./foundation.util.nest */
        "./js/foundation.util.nest.js");
        /* harmony import */


        var _foundation_util_box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
        /*! ./foundation.util.box */
        "./js/foundation.util.box.js");

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        }
        /**
         * DropdownMenu module.
         * @module foundation.dropdown-menu
         * @requires foundation.util.keyboard
         * @requires foundation.util.box
         * @requires foundation.util.nest
         */


        var DropdownMenu =
        /*#__PURE__*/
        function (_Plugin) {
          _inherits(DropdownMenu, _Plugin);

          function DropdownMenu() {
            _classCallCheck(this, DropdownMenu);

            return _possibleConstructorReturn(this, _getPrototypeOf(DropdownMenu).apply(this, arguments));
          }

          _createClass(DropdownMenu, [{
            key: "_setup",

            /**
             * Creates a new instance of DropdownMenu.
             * @class
             * @name DropdownMenu
             * @fires DropdownMenu#init
             * @param {jQuery} element - jQuery object to make into a dropdown menu.
             * @param {Object} options - Overrides to the default plugin settings.
             */
            value: function _setup(element, options) {
              this.$element = element;
              this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, DropdownMenu.defaults, this.$element.data(), options);
              this.className = 'DropdownMenu'; // ie9 back compat

              this._init();

              _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__["Keyboard"].register('DropdownMenu', {
                'ENTER': 'open',
                'SPACE': 'open',
                'ARROW_RIGHT': 'next',
                'ARROW_UP': 'up',
                'ARROW_DOWN': 'down',
                'ARROW_LEFT': 'previous',
                'ESCAPE': 'close'
              });
            }
            /**
             * Initializes the plugin, and calls _prepareMenu
             * @private
             * @function
             */

          }, {
            key: "_init",
            value: function _init() {
              _foundation_util_nest__WEBPACK_IMPORTED_MODULE_4__["Nest"].Feather(this.$element, 'dropdown');

              var subs = this.$element.find('li.is-dropdown-submenu-parent');
              this.$element.children('.is-dropdown-submenu-parent').children('.is-dropdown-submenu').addClass('first-sub');
              this.$menuItems = this.$element.find('[role="menuitem"]');
              this.$tabs = this.$element.children('[role="menuitem"]');
              this.$tabs.find('ul.is-dropdown-submenu').addClass(this.options.verticalClass);

              if (this.options.alignment === 'auto') {
                if (this.$element.hasClass(this.options.rightClass) || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["rtl"])() || this.$element.parents('.top-bar-right').is('*')) {
                  this.options.alignment = 'right';
                  subs.addClass('opens-left');
                } else {
                  this.options.alignment = 'left';
                  subs.addClass('opens-right');
                }
              } else {
                if (this.options.alignment === 'right') {
                  subs.addClass('opens-left');
                } else {
                  subs.addClass('opens-right');
                }
              }

              this.changed = false;

              this._events();
            }
          }, {
            key: "_isVertical",
            value: function _isVertical() {
              return this.$tabs.css('display') === 'block' || this.$element.css('flex-direction') === 'column';
            }
          }, {
            key: "_isRtl",
            value: function _isRtl() {
              return this.$element.hasClass('align-right') || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["rtl"])() && !this.$element.hasClass('align-left');
            }
            /**
             * Adds event listeners to elements within the menu
             * @private
             * @function
             */

          }, {
            key: "_events",
            value: function _events() {
              var _this = this,
                  hasTouch = 'ontouchstart' in window || typeof window.ontouchstart !== 'undefined',
                  parClass = 'is-dropdown-submenu-parent'; // used for onClick and in the keyboard handlers


              var handleClickFn = function handleClickFn(e) {
                var $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parentsUntil('ul', ".".concat(parClass)),
                    hasSub = $elem.hasClass(parClass),
                    hasClicked = $elem.attr('data-is-click') === 'true',
                    $sub = $elem.children('.is-dropdown-submenu');

                if (hasSub) {
                  if (hasClicked) {
                    if (!_this.options.closeOnClick || !_this.options.clickOpen && !hasTouch || _this.options.forceFollow && hasTouch) {
                      return;
                    } else {
                      e.stopImmediatePropagation();
                      e.preventDefault();

                      _this._hide($elem);
                    }
                  } else {
                    e.preventDefault();
                    e.stopImmediatePropagation();

                    _this._show($sub);

                    $elem.add($elem.parentsUntil(_this.$element, ".".concat(parClass))).attr('data-is-click', true);
                  }
                }
              };

              if (this.options.clickOpen || hasTouch) {
                this.$menuItems.on('click.zf.dropdownmenu touchstart.zf.dropdownmenu', handleClickFn);
              } // Handle Leaf element Clicks


              if (_this.options.closeOnClickInside) {
                this.$menuItems.on('click.zf.dropdownmenu', function (e) {
                  var $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
                      hasSub = $elem.hasClass(parClass);

                  if (!hasSub) {
                    _this._hide();
                  }
                });
              }

              if (!this.options.disableHover) {
                this.$menuItems.on('mouseenter.zf.dropdownmenu', function (e) {
                  var $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
                      hasSub = $elem.hasClass(parClass);

                  if (hasSub) {
                    clearTimeout($elem.data('_delay'));
                    $elem.data('_delay', setTimeout(function () {
                      _this._show($elem.children('.is-dropdown-submenu'));
                    }, _this.options.hoverDelay));
                  }
                });
                Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["onLeaveElement"])(this.$menuItems, function (e) {
                  var $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
                      hasSub = $elem.hasClass(parClass);

                  if (hasSub && _this.options.autoclose) {
                    if ($elem.attr('data-is-click') === 'true' && _this.options.clickOpen) {
                      return false;
                    }

                    clearTimeout($elem.data('_delay'));
                    $elem.data('_delay', setTimeout(function () {
                      _this._hide($elem);
                    }, _this.options.closingTime));
                  }
                });
              }

              this.$menuItems.on('keydown.zf.dropdownmenu', function (e) {
                var $element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).parentsUntil('ul', '[role="menuitem"]'),
                    isTab = _this.$tabs.index($element) > -1,
                    $elements = isTab ? _this.$tabs : $element.siblings('li').add($element),
                    $prevElement,
                    $nextElement;
                $elements.each(function (i) {
                  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is($element)) {
                    $prevElement = $elements.eq(i - 1);
                    $nextElement = $elements.eq(i + 1);
                    return;
                  }
                });

                var nextSibling = function nextSibling() {
                  $nextElement.children('a:first').focus();
                  e.preventDefault();
                },
                    prevSibling = function prevSibling() {
                  $prevElement.children('a:first').focus();
                  e.preventDefault();
                },
                    openSub = function openSub() {
                  var $sub = $element.children('ul.is-dropdown-submenu');

                  if ($sub.length) {
                    _this._show($sub);

                    $element.find('li > a:first').focus();
                    e.preventDefault();
                  } else {
                    return;
                  }
                },
                    closeSub = function closeSub() {
                  //if ($element.is(':first-child')) {
                  var close = $element.parent('ul').parent('li');
                  close.children('a:first').focus();

                  _this._hide(close);

                  e.preventDefault(); //}
                };

                var functions = {
                  open: openSub,
                  close: function close() {
                    _this._hide(_this.$element);

                    _this.$menuItems.eq(0).children('a').focus(); // focus to first element


                    e.preventDefault();
                  },
                  handled: function handled() {
                    e.stopImmediatePropagation();
                  }
                };

                if (isTab) {
                  if (_this._isVertical()) {
                    // vertical menu
                    if (_this._isRtl()) {
                      // right aligned
                      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(functions, {
                        down: nextSibling,
                        up: prevSibling,
                        next: closeSub,
                        previous: openSub
                      });
                    } else {
                      // left aligned
                      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(functions, {
                        down: nextSibling,
                        up: prevSibling,
                        next: openSub,
                        previous: closeSub
                      });
                    }
                  } else {
                    // horizontal menu
                    if (_this._isRtl()) {
                      // right aligned
                      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(functions, {
                        next: prevSibling,
                        previous: nextSibling,
                        down: openSub,
                        up: closeSub
                      });
                    } else {
                      // left aligned
                      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(functions, {
                        next: nextSibling,
                        previous: prevSibling,
                        down: openSub,
                        up: closeSub
                      });
                    }
                  }
                } else {
                  // not tabs -> one sub
                  if (_this._isRtl()) {
                    // right aligned
                    jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(functions, {
                      next: closeSub,
                      previous: openSub,
                      down: nextSibling,
                      up: prevSibling
                    });
                  } else {
                    // left aligned
                    jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(functions, {
                      next: openSub,
                      previous: closeSub,
                      down: nextSibling,
                      up: prevSibling
                    });
                  }
                }

                _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_3__["Keyboard"].handleKey(e, 'DropdownMenu', functions);
              });
            }
            /**
             * Adds an event handler to the body to close any dropdowns on a click.
             * @function
             * @private
             */

          }, {
            key: "_addBodyHandler",
            value: function _addBodyHandler() {
              var $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body),
                  _this = this;

              $body.off('mouseup.zf.dropdownmenu touchend.zf.dropdownmenu').on('mouseup.zf.dropdownmenu touchend.zf.dropdownmenu', function (e) {
                var $link = _this.$element.find(e.target);

                if ($link.length) {
                  return;
                }

                _this._hide();

                $body.off('mouseup.zf.dropdownmenu touchend.zf.dropdownmenu');
              });
            }
            /**
             * Opens a dropdown pane, and checks for collisions first.
             * @param {jQuery} $sub - ul element that is a submenu to show
             * @function
             * @private
             * @fires Dropdownmenu#show
             */

          }, {
            key: "_show",
            value: function _show($sub) {
              var idx = this.$tabs.index(this.$tabs.filter(function (i, el) {
                return jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).find($sub).length > 0;
              }));
              var $sibs = $sub.parent('li.is-dropdown-submenu-parent').siblings('li.is-dropdown-submenu-parent');

              this._hide($sibs, idx);

              $sub.css('visibility', 'hidden').addClass('js-dropdown-active').parent('li.is-dropdown-submenu-parent').addClass('is-active');

              var clear = _foundation_util_box__WEBPACK_IMPORTED_MODULE_5__["Box"].ImNotTouchingYou($sub, null, true);

              if (!clear) {
                var oldClass = this.options.alignment === 'left' ? '-right' : '-left',
                    $parentLi = $sub.parent('.is-dropdown-submenu-parent');
                $parentLi.removeClass("opens".concat(oldClass)).addClass("opens-".concat(this.options.alignment));
                clear = _foundation_util_box__WEBPACK_IMPORTED_MODULE_5__["Box"].ImNotTouchingYou($sub, null, true);

                if (!clear) {
                  $parentLi.removeClass("opens-".concat(this.options.alignment)).addClass('opens-inner');
                }

                this.changed = true;
              }

              $sub.css('visibility', '');

              if (this.options.closeOnClick) {
                this._addBodyHandler();
              }
              /**
               * Fires when the new dropdown pane is visible.
               * @event Dropdownmenu#show
               */


              this.$element.trigger('show.zf.dropdownmenu', [$sub]);
            }
            /**
             * Hides a single, currently open dropdown pane, if passed a parameter, otherwise, hides everything.
             * @function
             * @param {jQuery} $elem - element with a submenu to hide
             * @param {Number} idx - index of the $tabs collection to hide
             * @private
             */

          }, {
            key: "_hide",
            value: function _hide($elem, idx) {
              var $toClose;

              if ($elem && $elem.length) {
                $toClose = $elem;
              } else if (typeof idx !== 'undefined') {
                $toClose = this.$tabs.not(function (i, el) {
                  return i === idx;
                });
              } else {
                $toClose = this.$element;
              }

              var somethingToClose = $toClose.hasClass('is-active') || $toClose.find('.is-active').length > 0;

              if (somethingToClose) {
                $toClose.find('li.is-active').add($toClose).attr({
                  'data-is-click': false
                }).removeClass('is-active');
                $toClose.find('ul.js-dropdown-active').removeClass('js-dropdown-active');

                if (this.changed || $toClose.find('opens-inner').length) {
                  var oldClass = this.options.alignment === 'left' ? 'right' : 'left';
                  $toClose.find('li.is-dropdown-submenu-parent').add($toClose).removeClass("opens-inner opens-".concat(this.options.alignment)).addClass("opens-".concat(oldClass));
                  this.changed = false;
                }
                /**
                 * Fires when the open menus are closed.
                 * @event Dropdownmenu#hide
                 */


                this.$element.trigger('hide.zf.dropdownmenu', [$toClose]);
              }
            }
            /**
             * Destroys the plugin.
             * @function
             */

          }, {
            key: "_destroy",
            value: function _destroy() {
              this.$menuItems.off('.zf.dropdownmenu').removeAttr('data-is-click').removeClass('is-right-arrow is-left-arrow is-down-arrow opens-right opens-left opens-inner');
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).off('.zf.dropdownmenu');

              _foundation_util_nest__WEBPACK_IMPORTED_MODULE_4__["Nest"].Burn(this.$element, 'dropdown');
            }
          }]);

          return DropdownMenu;
        }(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__["Plugin"]);
        /**
         * Default settings for plugin
         */


        DropdownMenu.defaults = {
          /**
           * Disallows hover events from opening submenus
           * @option
           * @type {boolean}
           * @default false
           */
          disableHover: false,

          /**
           * Allow a submenu to automatically close on a mouseleave event, if not clicked open.
           * @option
           * @type {boolean}
           * @default true
           */
          autoclose: true,

          /**
           * Amount of time to delay opening a submenu on hover event.
           * @option
           * @type {number}
           * @default 50
           */
          hoverDelay: 50,

          /**
           * Allow a submenu to open/remain open on parent click event. Allows cursor to move away from menu.
           * @option
           * @type {boolean}
           * @default false
           */
          clickOpen: false,

          /**
           * Amount of time to delay closing a submenu on a mouseleave event.
           * @option
           * @type {number}
           * @default 500
           */
          closingTime: 500,

          /**
           * Position of the menu relative to what direction the submenus should open. Handled by JS. Can be `'auto'`, `'left'` or `'right'`.
           * @option
           * @type {string}
           * @default 'auto'
           */
          alignment: 'auto',

          /**
           * Allow clicks on the body to close any open submenus.
           * @option
           * @type {boolean}
           * @default true
           */
          closeOnClick: true,

          /**
           * Allow clicks on leaf anchor links to close any open submenus.
           * @option
           * @type {boolean}
           * @default true
           */
          closeOnClickInside: true,

          /**
           * Class applied to vertical oriented menus, Foundation default is `vertical`. Update this if using your own class.
           * @option
           * @type {string}
           * @default 'vertical'
           */
          verticalClass: 'vertical',

          /**
           * Class applied to right-side oriented menus, Foundation default is `align-right`. Update this if using your own class.
           * @option
           * @type {string}
           * @default 'align-right'
           */
          rightClass: 'align-right',

          /**
           * Boolean to force overide the clicking of links to perform default action, on second touch event for mobile.
           * @option
           * @type {boolean}
           * @default true
           */
          forceFollow: true
        };
        /***/
      },

      /***/
      "./js/foundation.equalizer.js":
      /*!************************************!*\
        !*** ./js/foundation.equalizer.js ***!
        \************************************/

      /*! exports provided: Equalizer */

      /***/
      function jsFoundationEqualizerJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Equalizer", function () {
          return Equalizer;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.util.mediaQuery */
        "./js/foundation.util.mediaQuery.js");
        /* harmony import */


        var _foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./foundation.util.imageLoader */
        "./js/foundation.util.imageLoader.js");
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");
        /* harmony import */


        var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
        /*! ./foundation.core.plugin */
        "./js/foundation.core.plugin.js");

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        }
        /**
         * Equalizer module.
         * @module foundation.equalizer
         * @requires foundation.util.mediaQuery
         * @requires foundation.util.imageLoader if equalizer contains images
         */


        var Equalizer =
        /*#__PURE__*/
        function (_Plugin) {
          _inherits(Equalizer, _Plugin);

          function Equalizer() {
            _classCallCheck(this, Equalizer);

            return _possibleConstructorReturn(this, _getPrototypeOf(Equalizer).apply(this, arguments));
          }

          _createClass(Equalizer, [{
            key: "_setup",

            /**
             * Creates a new instance of Equalizer.
             * @class
             * @name Equalizer
             * @fires Equalizer#init
             * @param {Object} element - jQuery object to add the trigger to.
             * @param {Object} options - Overrides to the default plugin settings.
             */
            value: function _setup(element, options) {
              this.$element = element;
              this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, Equalizer.defaults, this.$element.data(), options);
              this.className = 'Equalizer'; // ie9 back compat

              this._init();
            }
            /**
             * Initializes the Equalizer plugin and calls functions to get equalizer functioning on load.
             * @private
             */

          }, {
            key: "_init",
            value: function _init() {
              var eqId = this.$element.attr('data-equalizer') || '';
              var $watched = this.$element.find("[data-equalizer-watch=\"".concat(eqId, "\"]"));

              _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__["MediaQuery"]._init();

              this.$watched = $watched.length ? $watched : this.$element.find('[data-equalizer-watch]');
              this.$element.attr('data-resize', eqId || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["GetYoDigits"])(6, 'eq'));
              this.$element.attr('data-mutate', eqId || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["GetYoDigits"])(6, 'eq'));
              this.hasNested = this.$element.find('[data-equalizer]').length > 0;
              this.isNested = this.$element.parentsUntil(document.body, '[data-equalizer]').length > 0;
              this.isOn = false;
              this._bindHandler = {
                onResizeMeBound: this._onResizeMe.bind(this),
                onPostEqualizedBound: this._onPostEqualized.bind(this)
              };
              var imgs = this.$element.find('img');
              var tooSmall;

              if (this.options.equalizeOn) {
                tooSmall = this._checkMQ();
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('changed.zf.mediaquery', this._checkMQ.bind(this));
              } else {
                this._events();
              }

              if (typeof tooSmall !== 'undefined' && tooSmall === false || typeof tooSmall === 'undefined') {
                if (imgs.length) {
                  Object(_foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_2__["onImagesLoaded"])(imgs, this._reflow.bind(this));
                } else {
                  this._reflow();
                }
              }
            }
            /**
             * Removes event listeners if the breakpoint is too small.
             * @private
             */

          }, {
            key: "_pauseEvents",
            value: function _pauseEvents() {
              this.isOn = false;
              this.$element.off({
                '.zf.equalizer': this._bindHandler.onPostEqualizedBound,
                'resizeme.zf.trigger': this._bindHandler.onResizeMeBound,
                'mutateme.zf.trigger': this._bindHandler.onResizeMeBound
              });
            }
            /**
             * function to handle $elements resizeme.zf.trigger, with bound this on _bindHandler.onResizeMeBound
             * @private
             */

          }, {
            key: "_onResizeMe",
            value: function _onResizeMe(e) {
              this._reflow();
            }
            /**
             * function to handle $elements postequalized.zf.equalizer, with bound this on _bindHandler.onPostEqualizedBound
             * @private
             */

          }, {
            key: "_onPostEqualized",
            value: function _onPostEqualized(e) {
              if (e.target !== this.$element[0]) {
                this._reflow();
              }
            }
            /**
             * Initializes events for Equalizer.
             * @private
             */

          }, {
            key: "_events",
            value: function _events() {
              var _this = this;

              this._pauseEvents();

              if (this.hasNested) {
                this.$element.on('postequalized.zf.equalizer', this._bindHandler.onPostEqualizedBound);
              } else {
                this.$element.on('resizeme.zf.trigger', this._bindHandler.onResizeMeBound);
                this.$element.on('mutateme.zf.trigger', this._bindHandler.onResizeMeBound);
              }

              this.isOn = true;
            }
            /**
             * Checks the current breakpoint to the minimum required size.
             * @private
             */

          }, {
            key: "_checkMQ",
            value: function _checkMQ() {
              var tooSmall = !_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__["MediaQuery"].is(this.options.equalizeOn);

              if (tooSmall) {
                if (this.isOn) {
                  this._pauseEvents();

                  this.$watched.css('height', 'auto');
                }
              } else {
                if (!this.isOn) {
                  this._events();
                }
              }

              return tooSmall;
            }
            /**
             * A noop version for the plugin
             * @private
             */

          }, {
            key: "_killswitch",
            value: function _killswitch() {
              return;
            }
            /**
             * Calls necessary functions to update Equalizer upon DOM change
             * @private
             */

          }, {
            key: "_reflow",
            value: function _reflow() {
              if (!this.options.equalizeOnStack) {
                if (this._isStacked()) {
                  this.$watched.css('height', 'auto');
                  return false;
                }
              }

              if (this.options.equalizeByRow) {
                this.getHeightsByRow(this.applyHeightByRow.bind(this));
              } else {
                this.getHeights(this.applyHeight.bind(this));
              }
            }
            /**
             * Manually determines if the first 2 elements are *NOT* stacked.
             * @private
             */

          }, {
            key: "_isStacked",
            value: function _isStacked() {
              if (!this.$watched[0] || !this.$watched[1]) {
                return true;
              }

              return this.$watched[0].getBoundingClientRect().top !== this.$watched[1].getBoundingClientRect().top;
            }
            /**
             * Finds the outer heights of children contained within an Equalizer parent and returns them in an array
             * @param {Function} cb - A non-optional callback to return the heights array to.
             * @returns {Array} heights - An array of heights of children within Equalizer container
             */

          }, {
            key: "getHeights",
            value: function getHeights(cb) {
              var heights = [];

              for (var i = 0, len = this.$watched.length; i < len; i++) {
                this.$watched[i].style.height = 'auto';
                heights.push(this.$watched[i].offsetHeight);
              }

              cb(heights);
            }
            /**
             * Finds the outer heights of children contained within an Equalizer parent and returns them in an array
             * @param {Function} cb - A non-optional callback to return the heights array to.
             * @returns {Array} groups - An array of heights of children within Equalizer container grouped by row with element,height and max as last child
             */

          }, {
            key: "getHeightsByRow",
            value: function getHeightsByRow(cb) {
              var lastElTopOffset = this.$watched.length ? this.$watched.first().offset().top : 0,
                  groups = [],
                  group = 0; //group by Row

              groups[group] = [];

              for (var i = 0, len = this.$watched.length; i < len; i++) {
                this.$watched[i].style.height = 'auto'; //maybe could use this.$watched[i].offsetTop

                var elOffsetTop = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$watched[i]).offset().top;

                if (elOffsetTop != lastElTopOffset) {
                  group++;
                  groups[group] = [];
                  lastElTopOffset = elOffsetTop;
                }

                groups[group].push([this.$watched[i], this.$watched[i].offsetHeight]);
              }

              for (var j = 0, ln = groups.length; j < ln; j++) {
                var heights = jquery__WEBPACK_IMPORTED_MODULE_0___default()(groups[j]).map(function () {
                  return this[1];
                }).get();
                var max = Math.max.apply(null, heights);
                groups[j].push(max);
              }

              cb(groups);
            }
            /**
             * Changes the CSS height property of each child in an Equalizer parent to match the tallest
             * @param {array} heights - An array of heights of children within Equalizer container
             * @fires Equalizer#preequalized
             * @fires Equalizer#postequalized
             */

          }, {
            key: "applyHeight",
            value: function applyHeight(heights) {
              var max = Math.max.apply(null, heights);
              /**
               * Fires before the heights are applied
               * @event Equalizer#preequalized
               */

              this.$element.trigger('preequalized.zf.equalizer');
              this.$watched.css('height', max);
              /**
               * Fires when the heights have been applied
               * @event Equalizer#postequalized
               */

              this.$element.trigger('postequalized.zf.equalizer');
            }
            /**
             * Changes the CSS height property of each child in an Equalizer parent to match the tallest by row
             * @param {array} groups - An array of heights of children within Equalizer container grouped by row with element,height and max as last child
             * @fires Equalizer#preequalized
             * @fires Equalizer#preequalizedrow
             * @fires Equalizer#postequalizedrow
             * @fires Equalizer#postequalized
             */

          }, {
            key: "applyHeightByRow",
            value: function applyHeightByRow(groups) {
              /**
               * Fires before the heights are applied
               */
              this.$element.trigger('preequalized.zf.equalizer');

              for (var i = 0, len = groups.length; i < len; i++) {
                var groupsILength = groups[i].length,
                    max = groups[i][groupsILength - 1];

                if (groupsILength <= 2) {
                  jquery__WEBPACK_IMPORTED_MODULE_0___default()(groups[i][0][0]).css({
                    'height': 'auto'
                  });
                  continue;
                }
                /**
                  * Fires before the heights per row are applied
                  * @event Equalizer#preequalizedrow
                  */


                this.$element.trigger('preequalizedrow.zf.equalizer');

                for (var j = 0, lenJ = groupsILength - 1; j < lenJ; j++) {
                  jquery__WEBPACK_IMPORTED_MODULE_0___default()(groups[i][j][0]).css({
                    'height': max
                  });
                }
                /**
                  * Fires when the heights per row have been applied
                  * @event Equalizer#postequalizedrow
                  */


                this.$element.trigger('postequalizedrow.zf.equalizer');
              }
              /**
               * Fires when the heights have been applied
               */


              this.$element.trigger('postequalized.zf.equalizer');
            }
            /**
             * Destroys an instance of Equalizer.
             * @function
             */

          }, {
            key: "_destroy",
            value: function _destroy() {
              this._pauseEvents();

              this.$watched.css('height', 'auto');
            }
          }]);

          return Equalizer;
        }(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_4__["Plugin"]);
        /**
         * Default settings for plugin
         */


        Equalizer.defaults = {
          /**
           * Enable height equalization when stacked on smaller screens.
           * @option
           * @type {boolean}
           * @default false
           */
          equalizeOnStack: false,

          /**
           * Enable height equalization row by row.
           * @option
           * @type {boolean}
           * @default false
           */
          equalizeByRow: false,

          /**
           * String representing the minimum breakpoint size the plugin should equalize heights on.
           * @option
           * @type {string}
           * @default ''
           */
          equalizeOn: ''
        };
        /***/
      },

      /***/
      "./js/foundation.interchange.js":
      /*!**************************************!*\
        !*** ./js/foundation.interchange.js ***!
        \**************************************/

      /*! exports provided: Interchange */

      /***/
      function jsFoundationInterchangeJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Interchange", function () {
          return Interchange;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.util.mediaQuery */
        "./js/foundation.util.mediaQuery.js");
        /* harmony import */


        var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./foundation.core.plugin */
        "./js/foundation.core.plugin.js");
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        }
        /**
         * Interchange module.
         * @module foundation.interchange
         * @requires foundation.util.mediaQuery
         */


        var Interchange =
        /*#__PURE__*/
        function (_Plugin) {
          _inherits(Interchange, _Plugin);

          function Interchange() {
            _classCallCheck(this, Interchange);

            return _possibleConstructorReturn(this, _getPrototypeOf(Interchange).apply(this, arguments));
          }

          _createClass(Interchange, [{
            key: "_setup",

            /**
             * Creates a new instance of Interchange.
             * @class
             * @name Interchange
             * @fires Interchange#init
             * @param {Object} element - jQuery object to add the trigger to.
             * @param {Object} options - Overrides to the default plugin settings.
             */
            value: function _setup(element, options) {
              this.$element = element;
              this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, Interchange.defaults, options);
              this.rules = [];
              this.currentPath = '';
              this.className = 'Interchange'; // ie9 back compat

              this._init();

              this._events();
            }
            /**
             * Initializes the Interchange plugin and calls functions to get interchange functioning on load.
             * @function
             * @private
             */

          }, {
            key: "_init",
            value: function _init() {
              _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__["MediaQuery"]._init();

              var id = this.$element[0].id || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["GetYoDigits"])(6, 'interchange');
              this.$element.attr({
                'data-resize': id,
                'id': id
              });

              this._addBreakpoints();

              this._generateRules();

              this._reflow();
            }
            /**
             * Initializes events for Interchange.
             * @function
             * @private
             */

          }, {
            key: "_events",
            value: function _events() {
              var _this2 = this;

              this.$element.off('resizeme.zf.trigger').on('resizeme.zf.trigger', function () {
                return _this2._reflow();
              });
            }
            /**
             * Calls necessary functions to update Interchange upon DOM change
             * @function
             * @private
             */

          }, {
            key: "_reflow",
            value: function _reflow() {
              var match; // Iterate through each rule, but only save the last match

              for (var i in this.rules) {
                if (this.rules.hasOwnProperty(i)) {
                  var rule = this.rules[i];

                  if (window.matchMedia(rule.query).matches) {
                    match = rule;
                  }
                }
              }

              if (match) {
                this.replace(match.path);
              }
            }
            /**
             * Gets the Foundation breakpoints and adds them to the Interchange.SPECIAL_QUERIES object.
             * @function
             * @private
             */

          }, {
            key: "_addBreakpoints",
            value: function _addBreakpoints() {
              for (var i in _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__["MediaQuery"].queries) {
                if (_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__["MediaQuery"].queries.hasOwnProperty(i)) {
                  var query = _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__["MediaQuery"].queries[i];
                  Interchange.SPECIAL_QUERIES[query.name] = query.value;
                }
              }
            }
            /**
             * Checks the Interchange element for the provided media query + content pairings
             * @function
             * @private
             * @param {Object} element - jQuery object that is an Interchange instance
             * @returns {Array} scenarios - Array of objects that have 'mq' and 'path' keys with corresponding keys
             */

          }, {
            key: "_generateRules",
            value: function _generateRules(element) {
              var rulesList = [];
              var rules;

              if (this.options.rules) {
                rules = this.options.rules;
              } else {
                rules = this.$element.data('interchange');
              }

              rules = typeof rules === 'string' ? rules.match(/\[.*?, .*?\]/g) : rules;

              for (var i in rules) {
                if (rules.hasOwnProperty(i)) {
                  var rule = rules[i].slice(1, -1).split(', ');
                  var path = rule.slice(0, -1).join('');
                  var query = rule[rule.length - 1];

                  if (Interchange.SPECIAL_QUERIES[query]) {
                    query = Interchange.SPECIAL_QUERIES[query];
                  }

                  rulesList.push({
                    path: path,
                    query: query
                  });
                }
              }

              this.rules = rulesList;
            }
            /**
             * Update the `src` property of an image, or change the HTML of a container, to the specified path.
             * @function
             * @param {String} path - Path to the image or HTML partial.
             * @fires Interchange#replaced
             */

          }, {
            key: "replace",
            value: function replace(path) {
              if (this.currentPath === path) return;

              var _this = this,
                  trigger = 'replaced.zf.interchange'; // Replacing images


              if (this.$element[0].nodeName === 'IMG') {
                this.$element.attr('src', path).on('load', function () {
                  _this.currentPath = path;
                }).trigger(trigger);
              } // Replacing background images
              else if (path.match(/\.(gif|jpg|jpeg|png|svg|tiff)([?#].*)?/i)) {
                  path = path.replace(/\(/g, '%28').replace(/\)/g, '%29');
                  this.$element.css({
                    'background-image': 'url(' + path + ')'
                  }).trigger(trigger);
                } // Replacing HTML
                else {
                    jquery__WEBPACK_IMPORTED_MODULE_0___default.a.get(path, function (response) {
                      _this.$element.html(response).trigger(trigger);

                      jquery__WEBPACK_IMPORTED_MODULE_0___default()(response).foundation();
                      _this.currentPath = path;
                    });
                  }
              /**
               * Fires when content in an Interchange element is done being loaded.
               * @event Interchange#replaced
               */
              // this.$element.trigger('replaced.zf.interchange');

            }
            /**
             * Destroys an instance of interchange.
             * @function
             */

          }, {
            key: "_destroy",
            value: function _destroy() {
              this.$element.off('resizeme.zf.trigger');
            }
          }]);

          return Interchange;
        }(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_2__["Plugin"]);
        /**
         * Default settings for plugin
         */


        Interchange.defaults = {
          /**
           * Rules to be applied to Interchange elements. Set with the `data-interchange` array notation.
           * @option
           * @type {?array}
           * @default null
           */
          rules: null
        };
        Interchange.SPECIAL_QUERIES = {
          'landscape': 'screen and (orientation: landscape)',
          'portrait': 'screen and (orientation: portrait)',
          'retina': 'only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)'
        };
        /***/
      },

      /***/
      "./js/foundation.magellan.js":
      /*!***********************************!*\
        !*** ./js/foundation.magellan.js ***!
        \***********************************/

      /*! exports provided: Magellan */

      /***/
      function jsFoundationMagellanJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Magellan", function () {
          return Magellan;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");
        /* harmony import */


        var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./foundation.core.plugin */
        "./js/foundation.core.plugin.js");
        /* harmony import */


        var _foundation_smoothScroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ./foundation.smoothScroll */
        "./js/foundation.smoothScroll.js");

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        }
        /**
         * Magellan module.
         * @module foundation.magellan
         * @requires foundation.smoothScroll
         */


        var Magellan =
        /*#__PURE__*/
        function (_Plugin) {
          _inherits(Magellan, _Plugin);

          function Magellan() {
            _classCallCheck(this, Magellan);

            return _possibleConstructorReturn(this, _getPrototypeOf(Magellan).apply(this, arguments));
          }

          _createClass(Magellan, [{
            key: "_setup",

            /**
             * Creates a new instance of Magellan.
             * @class
             * @name Magellan
             * @fires Magellan#init
             * @param {Object} element - jQuery object to add the trigger to.
             * @param {Object} options - Overrides to the default plugin settings.
             */
            value: function _setup(element, options) {
              this.$element = element;
              this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, Magellan.defaults, this.$element.data(), options);
              this.className = 'Magellan'; // ie9 back compat

              this._init();

              this.calcPoints();
            }
            /**
             * Initializes the Magellan plugin and calls functions to get equalizer functioning on load.
             * @private
             */

          }, {
            key: "_init",
            value: function _init() {
              var id = this.$element[0].id || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__["GetYoDigits"])(6, 'magellan');

              var _this = this;

              this.$targets = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-magellan-target]');
              this.$links = this.$element.find('a');
              this.$element.attr({
                'data-resize': id,
                'data-scroll': id,
                'id': id
              });
              this.$active = jquery__WEBPACK_IMPORTED_MODULE_0___default()();
              this.scrollPos = parseInt(window.pageYOffset, 10);

              this._events();
            }
            /**
             * Calculates an array of pixel values that are the demarcation lines between locations on the page.
             * Can be invoked if new elements are added or the size of a location changes.
             * @function
             */

          }, {
            key: "calcPoints",
            value: function calcPoints() {
              var _this = this,
                  body = document.body,
                  html = document.documentElement;

              this.points = [];
              this.winHeight = Math.round(Math.max(window.innerHeight, html.clientHeight));
              this.docHeight = Math.round(Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight));
              this.$targets.each(function () {
                var $tar = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
                    pt = Math.round($tar.offset().top - _this.options.threshold);
                $tar.targetPoint = pt;

                _this.points.push(pt);
              });
            }
            /**
             * Initializes events for Magellan.
             * @private
             */

          }, {
            key: "_events",
            value: function _events() {
              var _this = this,
                  $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body'),
                  opts = {
                duration: _this.options.animationDuration,
                easing: _this.options.animationEasing
              };

              jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).one('load', function () {
                if (_this.options.deepLinking) {
                  if (location.hash) {
                    _this.scrollToLoc(location.hash);
                  }
                }

                _this.calcPoints();

                _this._updateActive();
              });
              _this.onLoadListener = Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__["onLoad"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window), function () {
                _this.$element.on({
                  'resizeme.zf.trigger': _this.reflow.bind(_this),
                  'scrollme.zf.trigger': _this._updateActive.bind(_this)
                }).on('click.zf.magellan', 'a[href^="#"]', function (e) {
                  e.preventDefault();
                  var arrival = this.getAttribute('href');

                  _this.scrollToLoc(arrival);
                });
              });

              this._deepLinkScroll = function (e) {
                if (_this.options.deepLinking) {
                  _this.scrollToLoc(window.location.hash);
                }
              };

              jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('hashchange', this._deepLinkScroll);
            }
            /**
             * Function to scroll to a given location on the page.
             * @param {String} loc - a properly formatted jQuery id selector. Example: '#foo'
             * @function
             */

          }, {
            key: "scrollToLoc",
            value: function scrollToLoc(loc) {
              this._inTransition = true;

              var _this = this;

              var options = {
                animationEasing: this.options.animationEasing,
                animationDuration: this.options.animationDuration,
                threshold: this.options.threshold,
                offset: this.options.offset
              };

              _foundation_smoothScroll__WEBPACK_IMPORTED_MODULE_3__["SmoothScroll"].scrollToLoc(loc, options, function () {
                _this._inTransition = false;
              });
            }
            /**
             * Calls necessary functions to update Magellan upon DOM change
             * @function
             */

          }, {
            key: "reflow",
            value: function reflow() {
              this.calcPoints();

              this._updateActive();
            }
            /**
             * Updates the visibility of an active location link, and updates the url hash for the page, if deepLinking enabled.
             * @private
             * @function
             * @fires Magellan#update
             */

          }, {
            key: "_updateActive",
            value: function _updateActive()
            /*evt, elem, scrollPos*/
            {
              var _this2 = this;

              if (this._inTransition) return;
              var newScrollPos = parseInt(window.pageYOffset, 10);
              var isScrollingUp = this.scrollPos > newScrollPos;
              this.scrollPos = newScrollPos;
              var activeIdx; // Before the first point: no link

              if (newScrollPos < this.points[0]) {}
              /* do nothing */
              // At the bottom of the page: last link
              else if (newScrollPos + this.winHeight === this.docHeight) {
                  activeIdx = this.points.length - 1;
                } // Otherwhise, use the last visible link
                else {
                    var visibleLinks = this.points.filter(function (p, i) {
                      return p - _this2.options.offset - (isScrollingUp ? _this2.options.threshold : 0) <= newScrollPos;
                    });
                    activeIdx = visibleLinks.length ? visibleLinks.length - 1 : 0;
                  } // Get the new active link


              var $oldActive = this.$active;
              var activeHash = '';

              if (typeof activeIdx !== 'undefined') {
                this.$active = this.$links.filter('[href="#' + this.$targets.eq(activeIdx).data('magellan-target') + '"]');
                if (this.$active.length) activeHash = this.$active[0].getAttribute('href');
              } else {
                this.$active = jquery__WEBPACK_IMPORTED_MODULE_0___default()();
              }

              var isNewActive = !(!this.$active.length && !$oldActive.length) && !this.$active.is($oldActive);
              var isNewHash = activeHash !== window.location.hash; // Update the active link element

              if (isNewActive) {
                $oldActive.removeClass(this.options.activeClass);
                this.$active.addClass(this.options.activeClass);
              } // Update the hash (it may have changed with the same active link)


              if (this.options.deepLinking && isNewHash) {
                if (window.history.pushState) {
                  // Set or remove the hash (see: https://stackoverflow.com/a/5298684/4317384
                  var url = activeHash ? activeHash : window.location.pathname + window.location.search;
                  window.history.pushState(null, null, url);
                } else {
                  window.location.hash = activeHash;
                }
              }

              if (isNewActive) {
                /**
                 * Fires when magellan is finished updating to the new active element.
                 * @event Magellan#update
                 */
                this.$element.trigger('update.zf.magellan', [this.$active]);
              }
            }
            /**
             * Destroys an instance of Magellan and resets the url of the window.
             * @function
             */

          }, {
            key: "_destroy",
            value: function _destroy() {
              this.$element.off('.zf.trigger .zf.magellan').find(".".concat(this.options.activeClass)).removeClass(this.options.activeClass);

              if (this.options.deepLinking) {
                var hash = this.$active[0].getAttribute('href');
                window.location.hash.replace(hash, '');
              }

              jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('hashchange', this._deepLinkScroll);
              if (this.onLoadListener) jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(this.onLoadListener);
            }
          }]);

          return Magellan;
        }(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_2__["Plugin"]);
        /**
         * Default settings for plugin
         */


        Magellan.defaults = {
          /**
           * Amount of time, in ms, the animated scrolling should take between locations.
           * @option
           * @type {number}
           * @default 500
           */
          animationDuration: 500,

          /**
           * Animation style to use when scrolling between locations. Can be `'swing'` or `'linear'`.
           * @option
           * @type {string}
           * @default 'linear'
           * @see {@link https://api.jquery.com/animate|Jquery animate}
           */
          animationEasing: 'linear',

          /**
           * Number of pixels to use as a marker for location changes.
           * @option
           * @type {number}
           * @default 50
           */
          threshold: 50,

          /**
           * Class applied to the active locations link on the magellan container.
           * @option
           * @type {string}
           * @default 'is-active'
           */
          activeClass: 'is-active',

          /**
           * Allows the script to manipulate the url of the current page, and if supported, alter the history.
           * @option
           * @type {boolean}
           * @default false
           */
          deepLinking: false,

          /**
           * Number of pixels to offset the scroll of the page on item click if using a sticky nav bar.
           * @option
           * @type {number}
           * @default 0
           */
          offset: 0
        };
        /***/
      },

      /***/
      "./js/foundation.offcanvas.js":
      /*!************************************!*\
        !*** ./js/foundation.offcanvas.js ***!
        \************************************/

      /*! exports provided: OffCanvas */

      /***/
      function jsFoundationOffcanvasJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "OffCanvas", function () {
          return OffCanvas;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");
        /* harmony import */


        var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./foundation.util.keyboard */
        "./js/foundation.util.keyboard.js");
        /* harmony import */


        var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ./foundation.util.mediaQuery */
        "./js/foundation.util.mediaQuery.js");
        /* harmony import */


        var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
        /*! ./foundation.core.plugin */
        "./js/foundation.core.plugin.js");
        /* harmony import */


        var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
        /*! ./foundation.util.triggers */
        "./js/foundation.util.triggers.js");

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        }
        /**
         * OffCanvas module.
         * @module foundation.offcanvas
         * @requires foundation.util.keyboard
         * @requires foundation.util.mediaQuery
         * @requires foundation.util.triggers
         */


        var OffCanvas =
        /*#__PURE__*/
        function (_Plugin) {
          _inherits(OffCanvas, _Plugin);

          function OffCanvas() {
            _classCallCheck(this, OffCanvas);

            return _possibleConstructorReturn(this, _getPrototypeOf(OffCanvas).apply(this, arguments));
          }

          _createClass(OffCanvas, [{
            key: "_setup",

            /**
             * Creates a new instance of an off-canvas wrapper.
             * @class
             * @name OffCanvas
             * @fires OffCanvas#init
             * @param {Object} element - jQuery object to initialize.
             * @param {Object} options - Overrides to the default plugin settings.
             */
            value: function _setup(element, options) {
              var _this2 = this;

              this.className = 'OffCanvas'; // ie9 back compat

              this.$element = element;
              this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, OffCanvas.defaults, this.$element.data(), options);
              this.contentClasses = {
                base: [],
                reveal: []
              };
              this.$lastTrigger = jquery__WEBPACK_IMPORTED_MODULE_0___default()();
              this.$triggers = jquery__WEBPACK_IMPORTED_MODULE_0___default()();
              this.position = 'left';
              this.$content = jquery__WEBPACK_IMPORTED_MODULE_0___default()();
              this.nested = !!this.options.nested; // Defines the CSS transition/position classes of the off-canvas content container.

              jquery__WEBPACK_IMPORTED_MODULE_0___default()(['push', 'overlap']).each(function (index, val) {
                _this2.contentClasses.base.push('has-transition-' + val);
              });
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(['left', 'right', 'top', 'bottom']).each(function (index, val) {
                _this2.contentClasses.base.push('has-position-' + val);

                _this2.contentClasses.reveal.push('has-reveal-' + val);
              }); // Triggers init is idempotent, just need to make sure it is initialized

              _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_5__["Triggers"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);

              _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_3__["MediaQuery"]._init();

              this._init();

              this._events();

              _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_2__["Keyboard"].register('OffCanvas', {
                'ESCAPE': 'close'
              });
            }
            /**
             * Initializes the off-canvas wrapper by adding the exit overlay (if needed).
             * @function
             * @private
             */

          }, {
            key: "_init",
            value: function _init() {
              var id = this.$element.attr('id');
              this.$element.attr('aria-hidden', 'true'); // Find off-canvas content, either by ID (if specified), by siblings or by closest selector (fallback)

              if (this.options.contentId) {
                this.$content = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + this.options.contentId);
              } else if (this.$element.siblings('[data-off-canvas-content]').length) {
                this.$content = this.$element.siblings('[data-off-canvas-content]').first();
              } else {
                this.$content = this.$element.closest('[data-off-canvas-content]').first();
              }

              if (!this.options.contentId) {
                // Assume that the off-canvas element is nested if it isn't a sibling of the content
                this.nested = this.$element.siblings('[data-off-canvas-content]').length === 0;
              } else if (this.options.contentId && this.options.nested === null) {
                // Warning if using content ID without setting the nested option
                // Once the element is nested it is required to work properly in this case
                console.warn('Remember to use the nested option if using the content ID option!');
              }

              if (this.nested === true) {
                // Force transition overlap if nested
                this.options.transition = 'overlap'; // Remove appropriate classes if already assigned in markup

                this.$element.removeClass('is-transition-push');
              }

              this.$element.addClass("is-transition-".concat(this.options.transition, " is-closed")); // Find triggers that affect this element and add aria-expanded to them

              this.$triggers = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).find('[data-open="' + id + '"], [data-close="' + id + '"], [data-toggle="' + id + '"]').attr('aria-expanded', 'false').attr('aria-controls', id); // Get position by checking for related CSS class

              this.position = this.$element.is('.position-left, .position-top, .position-right, .position-bottom') ? this.$element.attr('class').match(/position\-(left|top|right|bottom)/)[1] : this.position; // Add an overlay over the content if necessary

              if (this.options.contentOverlay === true) {
                var overlay = document.createElement('div');
                var overlayPosition = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$element).css("position") === 'fixed' ? 'is-overlay-fixed' : 'is-overlay-absolute';
                overlay.setAttribute('class', 'js-off-canvas-overlay ' + overlayPosition);
                this.$overlay = jquery__WEBPACK_IMPORTED_MODULE_0___default()(overlay);

                if (overlayPosition === 'is-overlay-fixed') {
                  jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.$overlay).insertAfter(this.$element);
                } else {
                  this.$content.append(this.$overlay);
                }
              } // Get the revealOn option from the class.


              var revealOnRegExp = new RegExp(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__["RegExpEscape"])(this.options.revealClass) + '([^\\s]+)', 'g');
              var revealOnClass = revealOnRegExp.exec(this.$element[0].className);

              if (revealOnClass) {
                this.options.isRevealed = true;
                this.options.revealOn = this.options.revealOn || revealOnClass[1];
              } // Ensure the `reveal-on-*` class is set.


              if (this.options.isRevealed === true && this.options.revealOn) {
                this.$element.first().addClass("".concat(this.options.revealClass).concat(this.options.revealOn));

                this._setMQChecker();
              }

              if (this.options.transitionTime) {
                this.$element.css('transition-duration', this.options.transitionTime);
              } // Initally remove all transition/position CSS classes from off-canvas content container.


              this._removeContentClasses();
            }
            /**
             * Adds event handlers to the off-canvas wrapper and the exit overlay.
             * @function
             * @private
             */

          }, {
            key: "_events",
            value: function _events() {
              this.$element.off('.zf.trigger .zf.offcanvas').on({
                'open.zf.trigger': this.open.bind(this),
                'close.zf.trigger': this.close.bind(this),
                'toggle.zf.trigger': this.toggle.bind(this),
                'keydown.zf.offcanvas': this._handleKeyboard.bind(this)
              });

              if (this.options.closeOnClick === true) {
                var $target = this.options.contentOverlay ? this.$overlay : this.$content;
                $target.on({
                  'click.zf.offcanvas': this.close.bind(this)
                });
              }
            }
            /**
             * Applies event listener for elements that will reveal at certain breakpoints.
             * @private
             */

          }, {
            key: "_setMQChecker",
            value: function _setMQChecker() {
              var _this = this;

              this.onLoadListener = Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__["onLoad"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window), function () {
                if (_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_3__["MediaQuery"].atLeast(_this.options.revealOn)) {
                  _this.reveal(true);
                }
              });
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('changed.zf.mediaquery', function () {
                if (_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_3__["MediaQuery"].atLeast(_this.options.revealOn)) {
                  _this.reveal(true);
                } else {
                  _this.reveal(false);
                }
              });
            }
            /**
             * Removes the CSS transition/position classes of the off-canvas content container.
             * Removing the classes is important when another off-canvas gets opened that uses the same content container.
             * @param {Boolean} hasReveal - true if related off-canvas element is revealed.
             * @private
             */

          }, {
            key: "_removeContentClasses",
            value: function _removeContentClasses(hasReveal) {
              if (typeof hasReveal !== 'boolean') {
                this.$content.removeClass(this.contentClasses.base.join(' '));
              } else if (hasReveal === false) {
                this.$content.removeClass("has-reveal-".concat(this.position));
              }
            }
            /**
             * Adds the CSS transition/position classes of the off-canvas content container, based on the opening off-canvas element.
             * Beforehand any transition/position class gets removed.
             * @param {Boolean} hasReveal - true if related off-canvas element is revealed.
             * @private
             */

          }, {
            key: "_addContentClasses",
            value: function _addContentClasses(hasReveal) {
              this._removeContentClasses(hasReveal);

              if (typeof hasReveal !== 'boolean') {
                this.$content.addClass("has-transition-".concat(this.options.transition, " has-position-").concat(this.position));
              } else if (hasReveal === true) {
                this.$content.addClass("has-reveal-".concat(this.position));
              }
            }
            /**
             * Handles the revealing/hiding the off-canvas at breakpoints, not the same as open.
             * @param {Boolean} isRevealed - true if element should be revealed.
             * @function
             */

          }, {
            key: "reveal",
            value: function reveal(isRevealed) {
              if (isRevealed) {
                this.close();
                this.isRevealed = true;
                this.$element.attr('aria-hidden', 'false');
                this.$element.off('open.zf.trigger toggle.zf.trigger');
                this.$element.removeClass('is-closed');
              } else {
                this.isRevealed = false;
                this.$element.attr('aria-hidden', 'true');
                this.$element.off('open.zf.trigger toggle.zf.trigger').on({
                  'open.zf.trigger': this.open.bind(this),
                  'toggle.zf.trigger': this.toggle.bind(this)
                });
                this.$element.addClass('is-closed');
              }

              this._addContentClasses(isRevealed);
            }
            /**
             * Stops scrolling of the body when offcanvas is open on mobile Safari and other troublesome browsers.
             * @private
             */

          }, {
            key: "_stopScrolling",
            value: function _stopScrolling(event) {
              return false;
            } // Taken and adapted from http://stackoverflow.com/questions/16889447/prevent-full-page-scrolling-ios
            // Only really works for y, not sure how to extend to x or if we need to.

          }, {
            key: "_recordScrollable",
            value: function _recordScrollable(event) {
              var elem = this; // called from event handler context with this as elem
              // If the element is scrollable (content overflows), then...

              if (elem.scrollHeight !== elem.clientHeight) {
                // If we're at the top, scroll down one pixel to allow scrolling up
                if (elem.scrollTop === 0) {
                  elem.scrollTop = 1;
                } // If we're at the bottom, scroll up one pixel to allow scrolling down


                if (elem.scrollTop === elem.scrollHeight - elem.clientHeight) {
                  elem.scrollTop = elem.scrollHeight - elem.clientHeight - 1;
                }
              }

              elem.allowUp = elem.scrollTop > 0;
              elem.allowDown = elem.scrollTop < elem.scrollHeight - elem.clientHeight;
              elem.lastY = event.originalEvent.pageY;
            }
          }, {
            key: "_stopScrollPropagation",
            value: function _stopScrollPropagation(event) {
              var elem = this; // called from event handler context with this as elem

              var up = event.pageY < elem.lastY;
              var down = !up;
              elem.lastY = event.pageY;

              if (up && elem.allowUp || down && elem.allowDown) {
                event.stopPropagation();
              } else {
                event.preventDefault();
              }
            }
            /**
             * Opens the off-canvas menu.
             * @function
             * @param {Object} event - Event object passed from listener.
             * @param {jQuery} trigger - element that triggered the off-canvas to open.
             * @fires Offcanvas#opened
             * @todo also trigger 'open' event?
             */

          }, {
            key: "open",
            value: function open(event, trigger) {
              if (this.$element.hasClass('is-open') || this.isRevealed) {
                return;
              }

              var _this = this;

              if (trigger) {
                this.$lastTrigger = trigger;
              }

              if (this.options.forceTo === 'top') {
                window.scrollTo(0, 0);
              } else if (this.options.forceTo === 'bottom') {
                window.scrollTo(0, document.body.scrollHeight);
              }

              if (this.options.transitionTime && this.options.transition !== 'overlap') {
                this.$element.siblings('[data-off-canvas-content]').css('transition-duration', this.options.transitionTime);
              } else {
                this.$element.siblings('[data-off-canvas-content]').css('transition-duration', '');
              }

              this.$element.addClass('is-open').removeClass('is-closed');
              this.$triggers.attr('aria-expanded', 'true');
              this.$element.attr('aria-hidden', 'false');
              this.$content.addClass('is-open-' + this.position); // If `contentScroll` is set to false, add class and disable scrolling on touch devices.

              if (this.options.contentScroll === false) {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').addClass('is-off-canvas-open').on('touchmove', this._stopScrolling);
                this.$element.on('touchstart', this._recordScrollable);
                this.$element.on('touchmove', this._stopScrollPropagation);
              }

              if (this.options.contentOverlay === true) {
                this.$overlay.addClass('is-visible');
              }

              if (this.options.closeOnClick === true && this.options.contentOverlay === true) {
                this.$overlay.addClass('is-closable');
              }

              if (this.options.autoFocus === true) {
                this.$element.one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__["transitionend"])(this.$element), function () {
                  if (!_this.$element.hasClass('is-open')) {
                    return; // exit if prematurely closed
                  }

                  var canvasFocus = _this.$element.find('[data-autofocus]');

                  if (canvasFocus.length) {
                    canvasFocus.eq(0).focus();
                  } else {
                    _this.$element.find('a, button').eq(0).focus();
                  }
                });
              }

              if (this.options.trapFocus === true) {
                this.$content.attr('tabindex', '-1');

                _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_2__["Keyboard"].trapFocus(this.$element);
              }

              this._addContentClasses();
              /**
               * Fires when the off-canvas menu opens.
               * @event Offcanvas#opened
               */


              this.$element.trigger('opened.zf.offcanvas');
            }
            /**
             * Closes the off-canvas menu.
             * @function
             * @param {Function} cb - optional cb to fire after closure.
             * @fires Offcanvas#closed
             */

          }, {
            key: "close",
            value: function close(cb) {
              if (!this.$element.hasClass('is-open') || this.isRevealed) {
                return;
              }

              var _this = this;

              this.$element.removeClass('is-open');
              this.$element.attr('aria-hidden', 'true')
              /**
               * Fires when the off-canvas menu opens.
               * @event Offcanvas#closed
               */
              .trigger('closed.zf.offcanvas');
              this.$content.removeClass('is-open-left is-open-top is-open-right is-open-bottom'); // If `contentScroll` is set to false, remove class and re-enable scrolling on touch devices.

              if (this.options.contentScroll === false) {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').removeClass('is-off-canvas-open').off('touchmove', this._stopScrolling);
                this.$element.off('touchstart', this._recordScrollable);
                this.$element.off('touchmove', this._stopScrollPropagation);
              }

              if (this.options.contentOverlay === true) {
                this.$overlay.removeClass('is-visible');
              }

              if (this.options.closeOnClick === true && this.options.contentOverlay === true) {
                this.$overlay.removeClass('is-closable');
              }

              this.$triggers.attr('aria-expanded', 'false');

              if (this.options.trapFocus === true) {
                this.$content.removeAttr('tabindex');

                _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_2__["Keyboard"].releaseFocus(this.$element);
              } // Listen to transitionEnd and add class when done.


              this.$element.one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__["transitionend"])(this.$element), function (e) {
                _this.$element.addClass('is-closed');

                _this._removeContentClasses();
              });
            }
            /**
             * Toggles the off-canvas menu open or closed.
             * @function
             * @param {Object} event - Event object passed from listener.
             * @param {jQuery} trigger - element that triggered the off-canvas to open.
             */

          }, {
            key: "toggle",
            value: function toggle(event, trigger) {
              if (this.$element.hasClass('is-open')) {
                this.close(event, trigger);
              } else {
                this.open(event, trigger);
              }
            }
            /**
             * Handles keyboard input when detected. When the escape key is pressed, the off-canvas menu closes, and focus is restored to the element that opened the menu.
             * @function
             * @private
             */

          }, {
            key: "_handleKeyboard",
            value: function _handleKeyboard(e) {
              var _this3 = this;

              _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_2__["Keyboard"].handleKey(e, 'OffCanvas', {
                close: function close() {
                  _this3.close();

                  _this3.$lastTrigger.focus();

                  return true;
                },
                handled: function handled() {
                  e.stopPropagation();
                  e.preventDefault();
                }
              });
            }
            /**
             * Destroys the offcanvas plugin.
             * @function
             */

          }, {
            key: "_destroy",
            value: function _destroy() {
              this.close();
              this.$element.off('.zf.trigger .zf.offcanvas');
              this.$overlay.off('.zf.offcanvas');
              if (this.onLoadListener) jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(this.onLoadListener);
            }
          }]);

          return OffCanvas;
        }(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_4__["Plugin"]);

        OffCanvas.defaults = {
          /**
           * Allow the user to click outside of the menu to close it.
           * @option
           * @type {boolean}
           * @default true
           */
          closeOnClick: true,

          /**
           * Adds an overlay on top of `[data-off-canvas-content]`.
           * @option
           * @type {boolean}
           * @default true
           */
          contentOverlay: true,

          /**
           * Target an off-canvas content container by ID that may be placed anywhere. If null the closest content container will be taken.
           * @option
           * @type {?string}
           * @default null
           */
          contentId: null,

          /**
           * Define the off-canvas element is nested in an off-canvas content. This is required when using the contentId option for a nested element.
           * @option
           * @type {boolean}
           * @default null
           */
          nested: null,

          /**
           * Enable/disable scrolling of the main content when an off canvas panel is open.
           * @option
           * @type {boolean}
           * @default true
           */
          contentScroll: true,

          /**
           * Amount of time in ms the open and close transition requires. If none selected, pulls from body style.
           * @option
           * @type {number}
           * @default null
           */
          transitionTime: null,

          /**
           * Type of transition for the offcanvas menu. Options are 'push', 'detached' or 'slide'.
           * @option
           * @type {string}
           * @default push
           */
          transition: 'push',

          /**
           * Force the page to scroll to top or bottom on open.
           * @option
           * @type {?string}
           * @default null
           */
          forceTo: null,

          /**
           * Allow the offcanvas to remain open for certain breakpoints.
           * @option
           * @type {boolean}
           * @default false
           */
          isRevealed: false,

          /**
           * Breakpoint at which to reveal. JS will use a RegExp to target standard classes, if changing classnames, pass your class with the `revealClass` option.
           * @option
           * @type {?string}
           * @default null
           */
          revealOn: null,

          /**
           * Force focus to the offcanvas on open. If true, will focus the opening trigger on close.
           * @option
           * @type {boolean}
           * @default true
           */
          autoFocus: true,

          /**
           * Class used to force an offcanvas to remain open. Foundation defaults for this are `reveal-for-large` & `reveal-for-medium`.
           * @option
           * @type {string}
           * @default reveal-for-
           * @todo improve the regex testing for this.
           */
          revealClass: 'reveal-for-',

          /**
           * Triggers optional focus trapping when opening an offcanvas. Sets tabindex of [data-off-canvas-content] to -1 for accessibility purposes.
           * @option
           * @type {boolean}
           * @default false
           */
          trapFocus: false
        };
        /***/
      },

      /***/
      "./js/foundation.orbit.js":
      /*!********************************!*\
        !*** ./js/foundation.orbit.js ***!
        \********************************/

      /*! exports provided: Orbit */

      /***/
      function jsFoundationOrbitJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Orbit", function () {
          return Orbit;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.util.keyboard */
        "./js/foundation.util.keyboard.js");
        /* harmony import */


        var _foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./foundation.util.motion */
        "./js/foundation.util.motion.js");
        /* harmony import */


        var _foundation_util_timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ./foundation.util.timer */
        "./js/foundation.util.timer.js");
        /* harmony import */


        var _foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
        /*! ./foundation.util.imageLoader */
        "./js/foundation.util.imageLoader.js");
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");
        /* harmony import */


        var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
        /*! ./foundation.core.plugin */
        "./js/foundation.core.plugin.js");
        /* harmony import */


        var _foundation_util_touch__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
        /*! ./foundation.util.touch */
        "./js/foundation.util.touch.js");

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        }
        /**
         * Orbit module.
         * @module foundation.orbit
         * @requires foundation.util.keyboard
         * @requires foundation.util.motion
         * @requires foundation.util.timer
         * @requires foundation.util.imageLoader
         * @requires foundation.util.touch
         */


        var Orbit =
        /*#__PURE__*/
        function (_Plugin) {
          _inherits(Orbit, _Plugin);

          function Orbit() {
            _classCallCheck(this, Orbit);

            return _possibleConstructorReturn(this, _getPrototypeOf(Orbit).apply(this, arguments));
          }

          _createClass(Orbit, [{
            key: "_setup",

            /**
            * Creates a new instance of an orbit carousel.
            * @class
            * @name Orbit
            * @param {jQuery} element - jQuery object to make into an Orbit Carousel.
            * @param {Object} options - Overrides to the default plugin settings.
            */
            value: function _setup(element, options) {
              this.$element = element;
              this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, Orbit.defaults, this.$element.data(), options);
              this.className = 'Orbit'; // ie9 back compat

              _foundation_util_touch__WEBPACK_IMPORTED_MODULE_7__["Touch"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a); // Touch init is idempotent, we just need to make sure it's initialied.


              this._init();

              _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__["Keyboard"].register('Orbit', {
                'ltr': {
                  'ARROW_RIGHT': 'next',
                  'ARROW_LEFT': 'previous'
                },
                'rtl': {
                  'ARROW_LEFT': 'next',
                  'ARROW_RIGHT': 'previous'
                }
              });
            }
            /**
            * Initializes the plugin by creating jQuery collections, setting attributes, and starting the animation.
            * @function
            * @private
            */

          }, {
            key: "_init",
            value: function _init() {
              // @TODO: consider discussion on PR #9278 about DOM pollution by changeSlide
              this._reset();

              this.$wrapper = this.$element.find(".".concat(this.options.containerClass));
              this.$slides = this.$element.find(".".concat(this.options.slideClass));
              var $images = this.$element.find('img'),
                  initActive = this.$slides.filter('.is-active'),
                  id = this.$element[0].id || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_5__["GetYoDigits"])(6, 'orbit');
              this.$element.attr({
                'data-resize': id,
                'id': id
              });

              if (!initActive.length) {
                this.$slides.eq(0).addClass('is-active');
              }

              if (!this.options.useMUI) {
                this.$slides.addClass('no-motionui');
              }

              if ($images.length) {
                Object(_foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_4__["onImagesLoaded"])($images, this._prepareForOrbit.bind(this));
              } else {
                this._prepareForOrbit(); //hehe

              }

              if (this.options.bullets) {
                this._loadBullets();
              }

              this._events();

              if (this.options.autoPlay && this.$slides.length > 1) {
                this.geoSync();
              }

              if (this.options.accessible) {
                // allow wrapper to be focusable to enable arrow navigation
                this.$wrapper.attr('tabindex', 0);
              }
            }
            /**
            * Creates a jQuery collection of bullets, if they are being used.
            * @function
            * @private
            */

          }, {
            key: "_loadBullets",
            value: function _loadBullets() {
              this.$bullets = this.$element.find(".".concat(this.options.boxOfBullets)).find('button');
            }
            /**
            * Sets a `timer` object on the orbit, and starts the counter for the next slide.
            * @function
            */

          }, {
            key: "geoSync",
            value: function geoSync() {
              var _this = this;

              this.timer = new _foundation_util_timer__WEBPACK_IMPORTED_MODULE_3__["Timer"](this.$element, {
                duration: this.options.timerDelay,
                infinite: false
              }, function () {
                _this.changeSlide(true);
              });
              this.timer.start();
            }
            /**
            * Sets wrapper and slide heights for the orbit.
            * @function
            * @private
            */

          }, {
            key: "_prepareForOrbit",
            value: function _prepareForOrbit() {
              var _this = this;

              this._setWrapperHeight();
            }
            /**
            * Calulates the height of each slide in the collection, and uses the tallest one for the wrapper height.
            * @function
            * @private
            * @param {Function} cb - a callback function to fire when complete.
            */

          }, {
            key: "_setWrapperHeight",
            value: function _setWrapperHeight(cb) {
              //rewrite this to `for` loop
              var max = 0,
                  temp,
                  counter = 0,
                  _this = this;

              this.$slides.each(function () {
                temp = this.getBoundingClientRect().height;
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('data-slide', counter); // hide all slides but the active one

                if (!/mui/g.test(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this)[0].className) && _this.$slides.filter('.is-active')[0] !== _this.$slides.eq(counter)[0]) {
                  jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).css({
                    'display': 'none'
                  });
                }

                max = temp > max ? temp : max;
                counter++;
              });

              if (counter === this.$slides.length) {
                this.$wrapper.css({
                  'height': max
                }); //only change the wrapper height property once.

                if (cb) {
                  cb(max);
                } //fire callback with max height dimension.

              }
            }
            /**
            * Sets the max-height of each slide.
            * @function
            * @private
            */

          }, {
            key: "_setSlideHeight",
            value: function _setSlideHeight(height) {
              this.$slides.each(function () {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).css('max-height', height);
              });
            }
            /**
            * Adds event listeners to basically everything within the element.
            * @function
            * @private
            */

          }, {
            key: "_events",
            value: function _events() {
              var _this = this; //***************************************
              //**Now using custom event - thanks to:**
              //**      Yohai Ararat of Toronto      **
              //***************************************
              //


              this.$element.off('.resizeme.zf.trigger').on({
                'resizeme.zf.trigger': this._prepareForOrbit.bind(this)
              });

              if (this.$slides.length > 1) {
                if (this.options.swipe) {
                  this.$slides.off('swipeleft.zf.orbit swiperight.zf.orbit').on('swipeleft.zf.orbit', function (e) {
                    e.preventDefault();

                    _this.changeSlide(true);
                  }).on('swiperight.zf.orbit', function (e) {
                    e.preventDefault();

                    _this.changeSlide(false);
                  });
                } //***************************************


                if (this.options.autoPlay) {
                  this.$slides.on('click.zf.orbit', function () {
                    _this.$element.data('clickedOn', _this.$element.data('clickedOn') ? false : true);

                    _this.timer[_this.$element.data('clickedOn') ? 'pause' : 'start']();
                  });

                  if (this.options.pauseOnHover) {
                    this.$element.on('mouseenter.zf.orbit', function () {
                      _this.timer.pause();
                    }).on('mouseleave.zf.orbit', function () {
                      if (!_this.$element.data('clickedOn')) {
                        _this.timer.start();
                      }
                    });
                  }
                }

                if (this.options.navButtons) {
                  var $controls = this.$element.find(".".concat(this.options.nextClass, ", .").concat(this.options.prevClass));
                  $controls.attr('tabindex', 0) //also need to handle enter/return and spacebar key presses
                  .on('click.zf.orbit touchend.zf.orbit', function (e) {
                    e.preventDefault();

                    _this.changeSlide(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).hasClass(_this.options.nextClass));
                  });
                }

                if (this.options.bullets) {
                  this.$bullets.on('click.zf.orbit touchend.zf.orbit', function () {
                    if (/is-active/g.test(this.className)) {
                      return false;
                    } //if this is active, kick out of function.


                    var idx = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('slide'),
                        ltr = idx > _this.$slides.filter('.is-active').data('slide'),
                        $slide = _this.$slides.eq(idx);

                    _this.changeSlide(ltr, $slide, idx);
                  });
                }

                if (this.options.accessible) {
                  this.$wrapper.add(this.$bullets).on('keydown.zf.orbit', function (e) {
                    // handle keyboard event with keyboard util
                    _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__["Keyboard"].handleKey(e, 'Orbit', {
                      next: function next() {
                        _this.changeSlide(true);
                      },
                      previous: function previous() {
                        _this.changeSlide(false);
                      },
                      handled: function handled() {
                        // if bullet is focused, make sure focus moves
                        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).is(_this.$bullets)) {
                          _this.$bullets.filter('.is-active').focus();
                        }
                      }
                    });
                  });
                }
              }
            }
            /**
             * Resets Orbit so it can be reinitialized
             */

          }, {
            key: "_reset",
            value: function _reset() {
              // Don't do anything if there are no slides (first run)
              if (typeof this.$slides == 'undefined') {
                return;
              }

              if (this.$slides.length > 1) {
                // Remove old events
                this.$element.off('.zf.orbit').find('*').off('.zf.orbit'); // Restart timer if autoPlay is enabled

                if (this.options.autoPlay) {
                  this.timer.restart();
                } // Reset all sliddes


                this.$slides.each(function (el) {
                  jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).removeClass('is-active is-active is-in').removeAttr('aria-live').hide();
                }); // Show the first slide

                this.$slides.first().addClass('is-active').show(); // Triggers when the slide has finished animating

                this.$element.trigger('slidechange.zf.orbit', [this.$slides.first()]); // Select first bullet if bullets are present

                if (this.options.bullets) {
                  this._updateBullets(0);
                }
              }
            }
            /**
            * Changes the current slide to a new one.
            * @function
            * @param {Boolean} isLTR - if true the slide moves from right to left, if false the slide moves from left to right.
            * @param {jQuery} chosenSlide - the jQuery element of the slide to show next, if one is selected.
            * @param {Number} idx - the index of the new slide in its collection, if one chosen.
            * @fires Orbit#slidechange
            */

          }, {
            key: "changeSlide",
            value: function changeSlide(isLTR, chosenSlide, idx) {
              if (!this.$slides) {
                return;
              } // Don't freak out if we're in the middle of cleanup


              var $curSlide = this.$slides.filter('.is-active').eq(0);

              if (/mui/g.test($curSlide[0].className)) {
                return false;
              } //if the slide is currently animating, kick out of the function


              var $firstSlide = this.$slides.first(),
                  $lastSlide = this.$slides.last(),
                  dirIn = isLTR ? 'Right' : 'Left',
                  dirOut = isLTR ? 'Left' : 'Right',
                  _this = this,
                  $newSlide;

              if (!chosenSlide) {
                //most of the time, this will be auto played or clicked from the navButtons.
                $newSlide = isLTR ? //if wrapping enabled, check to see if there is a `next` or `prev` sibling, if not, select the first or last slide to fill in. if wrapping not enabled, attempt to select `next` or `prev`, if there's nothing there, the function will kick out on next step. CRAZY NESTED TERNARIES!!!!!
                this.options.infiniteWrap ? $curSlide.next(".".concat(this.options.slideClass)).length ? $curSlide.next(".".concat(this.options.slideClass)) : $firstSlide : $curSlide.next(".".concat(this.options.slideClass)) : //pick next slide if moving left to right
                this.options.infiniteWrap ? $curSlide.prev(".".concat(this.options.slideClass)).length ? $curSlide.prev(".".concat(this.options.slideClass)) : $lastSlide : $curSlide.prev(".".concat(this.options.slideClass)); //pick prev slide if moving right to left
              } else {
                $newSlide = chosenSlide;
              }

              if ($newSlide.length) {
                /**
                * Triggers before the next slide starts animating in and only if a next slide has been found.
                * @event Orbit#beforeslidechange
                */
                this.$element.trigger('beforeslidechange.zf.orbit', [$curSlide, $newSlide]);

                if (this.options.bullets) {
                  idx = idx || this.$slides.index($newSlide); //grab index to update bullets

                  this._updateBullets(idx);
                }

                if (this.options.useMUI && !this.$element.is(':hidden')) {
                  _foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__["Motion"].animateIn($newSlide.addClass('is-active'), this.options["animInFrom".concat(dirIn)], function () {
                    $newSlide.css({
                      'display': 'block'
                    }).attr('aria-live', 'polite');
                  });

                  _foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__["Motion"].animateOut($curSlide.removeClass('is-active'), this.options["animOutTo".concat(dirOut)], function () {
                    $curSlide.removeAttr('aria-live');

                    if (_this.options.autoPlay && !_this.timer.isPaused) {
                      _this.timer.restart();
                    } //do stuff?

                  });
                } else {
                  $curSlide.removeClass('is-active is-in').removeAttr('aria-live').hide();
                  $newSlide.addClass('is-active is-in').attr('aria-live', 'polite').show();

                  if (this.options.autoPlay && !this.timer.isPaused) {
                    this.timer.restart();
                  }
                }
                /**
                * Triggers when the slide has finished animating in.
                * @event Orbit#slidechange
                */


                this.$element.trigger('slidechange.zf.orbit', [$newSlide]);
              }
            }
            /**
            * Updates the active state of the bullets, if displayed.
            * @function
            * @private
            * @param {Number} idx - the index of the current slide.
            */

          }, {
            key: "_updateBullets",
            value: function _updateBullets(idx) {
              var $oldBullet = this.$element.find(".".concat(this.options.boxOfBullets)).find('.is-active').removeClass('is-active').blur(),
                  span = $oldBullet.find('span:last').detach(),
                  $newBullet = this.$bullets.eq(idx).addClass('is-active').append(span);
            }
            /**
            * Destroys the carousel and hides the element.
            * @function
            */

          }, {
            key: "_destroy",
            value: function _destroy() {
              this.$element.off('.zf.orbit').find('*').off('.zf.orbit').end().hide();
            }
          }]);

          return Orbit;
        }(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_6__["Plugin"]);

        Orbit.defaults = {
          /**
          * Tells the JS to look for and loadBullets.
          * @option
           * @type {boolean}
          * @default true
          */
          bullets: true,

          /**
          * Tells the JS to apply event listeners to nav buttons
          * @option
           * @type {boolean}
          * @default true
          */
          navButtons: true,

          /**
          * motion-ui animation class to apply
          * @option
           * @type {string}
          * @default 'slide-in-right'
          */
          animInFromRight: 'slide-in-right',

          /**
          * motion-ui animation class to apply
          * @option
           * @type {string}
          * @default 'slide-out-right'
          */
          animOutToRight: 'slide-out-right',

          /**
          * motion-ui animation class to apply
          * @option
           * @type {string}
          * @default 'slide-in-left'
          *
          */
          animInFromLeft: 'slide-in-left',

          /**
          * motion-ui animation class to apply
          * @option
           * @type {string}
          * @default 'slide-out-left'
          */
          animOutToLeft: 'slide-out-left',

          /**
          * Allows Orbit to automatically animate on page load.
          * @option
           * @type {boolean}
          * @default true
          */
          autoPlay: true,

          /**
          * Amount of time, in ms, between slide transitions
          * @option
           * @type {number}
          * @default 5000
          */
          timerDelay: 5000,

          /**
          * Allows Orbit to infinitely loop through the slides
          * @option
           * @type {boolean}
          * @default true
          */
          infiniteWrap: true,

          /**
          * Allows the Orbit slides to bind to swipe events for mobile, requires an additional util library
          * @option
           * @type {boolean}
          * @default true
          */
          swipe: true,

          /**
          * Allows the timing function to pause animation on hover.
          * @option
           * @type {boolean}
          * @default true
          */
          pauseOnHover: true,

          /**
          * Allows Orbit to bind keyboard events to the slider, to animate frames with arrow keys
          * @option
           * @type {boolean}
          * @default true
          */
          accessible: true,

          /**
          * Class applied to the container of Orbit
          * @option
           * @type {string}
          * @default 'orbit-container'
          */
          containerClass: 'orbit-container',

          /**
          * Class applied to individual slides.
          * @option
           * @type {string}
          * @default 'orbit-slide'
          */
          slideClass: 'orbit-slide',

          /**
          * Class applied to the bullet container. You're welcome.
          * @option
           * @type {string}
          * @default 'orbit-bullets'
          */
          boxOfBullets: 'orbit-bullets',

          /**
          * Class applied to the `next` navigation button.
          * @option
           * @type {string}
          * @default 'orbit-next'
          */
          nextClass: 'orbit-next',

          /**
          * Class applied to the `previous` navigation button.
          * @option
           * @type {string}
          * @default 'orbit-previous'
          */
          prevClass: 'orbit-previous',

          /**
          * Boolean to flag the js to use motion ui classes or not. Default to true for backwards compatibility.
          * @option
           * @type {boolean}
          * @default true
          */
          useMUI: true
        };
        /***/
      },

      /***/
      "./js/foundation.positionable.js":
      /*!***************************************!*\
        !*** ./js/foundation.positionable.js ***!
        \***************************************/

      /*! exports provided: Positionable */

      /***/
      function jsFoundationPositionableJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Positionable", function () {
          return Positionable;
        });
        /* harmony import */


        var _foundation_util_box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! ./foundation.util.box */
        "./js/foundation.util.box.js");
        /* harmony import */


        var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.core.plugin */
        "./js/foundation.core.plugin.js");
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        }

        var POSITIONS = ['left', 'right', 'top', 'bottom'];
        var VERTICAL_ALIGNMENTS = ['top', 'bottom', 'center'];
        var HORIZONTAL_ALIGNMENTS = ['left', 'right', 'center'];
        var ALIGNMENTS = {
          'left': VERTICAL_ALIGNMENTS,
          'right': VERTICAL_ALIGNMENTS,
          'top': HORIZONTAL_ALIGNMENTS,
          'bottom': HORIZONTAL_ALIGNMENTS
        };

        function nextItem(item, array) {
          var currentIdx = array.indexOf(item);

          if (currentIdx === array.length - 1) {
            return array[0];
          } else {
            return array[currentIdx + 1];
          }
        }

        var Positionable =
        /*#__PURE__*/
        function (_Plugin) {
          _inherits(Positionable, _Plugin);

          function Positionable() {
            _classCallCheck(this, Positionable);

            return _possibleConstructorReturn(this, _getPrototypeOf(Positionable).apply(this, arguments));
          }

          _createClass(Positionable, [{
            key: "_init",

            /**
             * Abstract class encapsulating the tether-like explicit positioning logic
             * including repositioning based on overlap.
             * Expects classes to define defaults for vOffset, hOffset, position,
             * alignment, allowOverlap, and allowBottomOverlap. They can do this by
             * extending the defaults, or (for now recommended due to the way docs are
             * generated) by explicitly declaring them.
             *
             **/
            value: function _init() {
              this.triedPositions = {};
              this.position = this.options.position === 'auto' ? this._getDefaultPosition() : this.options.position;
              this.alignment = this.options.alignment === 'auto' ? this._getDefaultAlignment() : this.options.alignment;
              this.originalPosition = this.position;
              this.originalAlignment = this.alignment;
            }
          }, {
            key: "_getDefaultPosition",
            value: function _getDefaultPosition() {
              return 'bottom';
            }
          }, {
            key: "_getDefaultAlignment",
            value: function _getDefaultAlignment() {
              switch (this.position) {
                case 'bottom':
                case 'top':
                  return Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["rtl"])() ? 'right' : 'left';

                case 'left':
                case 'right':
                  return 'bottom';
              }
            }
            /**
             * Adjusts the positionable possible positions by iterating through alignments
             * and positions.
             * @function
             * @private
             */

          }, {
            key: "_reposition",
            value: function _reposition() {
              if (this._alignmentsExhausted(this.position)) {
                this.position = nextItem(this.position, POSITIONS);
                this.alignment = ALIGNMENTS[this.position][0];
              } else {
                this._realign();
              }
            }
            /**
             * Adjusts the dropdown pane possible positions by iterating through alignments
             * on the current position.
             * @function
             * @private
             */

          }, {
            key: "_realign",
            value: function _realign() {
              this._addTriedPosition(this.position, this.alignment);

              this.alignment = nextItem(this.alignment, ALIGNMENTS[this.position]);
            }
          }, {
            key: "_addTriedPosition",
            value: function _addTriedPosition(position, alignment) {
              this.triedPositions[position] = this.triedPositions[position] || [];
              this.triedPositions[position].push(alignment);
            }
          }, {
            key: "_positionsExhausted",
            value: function _positionsExhausted() {
              var isExhausted = true;

              for (var i = 0; i < POSITIONS.length; i++) {
                isExhausted = isExhausted && this._alignmentsExhausted(POSITIONS[i]);
              }

              return isExhausted;
            }
          }, {
            key: "_alignmentsExhausted",
            value: function _alignmentsExhausted(position) {
              return this.triedPositions[position] && this.triedPositions[position].length == ALIGNMENTS[position].length;
            } // When we're trying to center, we don't want to apply offset that's going to
            // take us just off center, so wrap around to return 0 for the appropriate
            // offset in those alignments.  TODO: Figure out if we want to make this
            // configurable behavior... it feels more intuitive, especially for tooltips, but
            // it's possible someone might actually want to start from center and then nudge
            // slightly off.

          }, {
            key: "_getVOffset",
            value: function _getVOffset() {
              return this.options.vOffset;
            }
          }, {
            key: "_getHOffset",
            value: function _getHOffset() {
              return this.options.hOffset;
            }
          }, {
            key: "_setPosition",
            value: function _setPosition($anchor, $element, $parent) {
              if ($anchor.attr('aria-expanded') === 'false') {
                return false;
              }

              var $eleDims = _foundation_util_box__WEBPACK_IMPORTED_MODULE_0__["Box"].GetDimensions($element),
                  $anchorDims = _foundation_util_box__WEBPACK_IMPORTED_MODULE_0__["Box"].GetDimensions($anchor);

              if (!this.options.allowOverlap) {
                // restore original position & alignment before checking overlap
                this.position = this.originalPosition;
                this.alignment = this.originalAlignment;
              }

              $element.offset(_foundation_util_box__WEBPACK_IMPORTED_MODULE_0__["Box"].GetExplicitOffsets($element, $anchor, this.position, this.alignment, this._getVOffset(), this._getHOffset()));

              if (!this.options.allowOverlap) {
                var overlaps = {};
                var minOverlap = 100000000; // default coordinates to how we start, in case we can't figure out better

                var minCoordinates = {
                  position: this.position,
                  alignment: this.alignment
                };

                while (!this._positionsExhausted()) {
                  var overlap = _foundation_util_box__WEBPACK_IMPORTED_MODULE_0__["Box"].OverlapArea($element, $parent, false, false, this.options.allowBottomOverlap);

                  if (overlap === 0) {
                    return;
                  }

                  if (overlap < minOverlap) {
                    minOverlap = overlap;
                    minCoordinates = {
                      position: this.position,
                      alignment: this.alignment
                    };
                  }

                  this._reposition();

                  $element.offset(_foundation_util_box__WEBPACK_IMPORTED_MODULE_0__["Box"].GetExplicitOffsets($element, $anchor, this.position, this.alignment, this._getVOffset(), this._getHOffset()));
                } // If we get through the entire loop, there was no non-overlapping
                // position available. Pick the version with least overlap.


                this.position = minCoordinates.position;
                this.alignment = minCoordinates.alignment;
                $element.offset(_foundation_util_box__WEBPACK_IMPORTED_MODULE_0__["Box"].GetExplicitOffsets($element, $anchor, this.position, this.alignment, this._getVOffset(), this._getHOffset()));
              }
            }
          }]);

          return Positionable;
        }(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__["Plugin"]);

        Positionable.defaults = {
          /**
           * Position of positionable relative to anchor. Can be left, right, bottom, top, or auto.
           * @option
           * @type {string}
           * @default 'auto'
           */
          position: 'auto',

          /**
           * Alignment of positionable relative to anchor. Can be left, right, bottom, top, center, or auto.
           * @option
           * @type {string}
           * @default 'auto'
           */
          alignment: 'auto',

          /**
           * Allow overlap of container/window. If false, dropdown positionable first
           * try to position as defined by data-position and data-alignment, but
           * reposition if it would cause an overflow.
           * @option
           * @type {boolean}
           * @default false
           */
          allowOverlap: false,

          /**
           * Allow overlap of only the bottom of the container. This is the most common
           * behavior for dropdowns, allowing the dropdown to extend the bottom of the
           * screen but not otherwise influence or break out of the container.
           * @option
           * @type {boolean}
           * @default true
           */
          allowBottomOverlap: true,

          /**
           * Number of pixels the positionable should be separated vertically from anchor
           * @option
           * @type {number}
           * @default 0
           */
          vOffset: 0,

          /**
           * Number of pixels the positionable should be separated horizontally from anchor
           * @option
           * @type {number}
           * @default 0
           */
          hOffset: 0
        };
        /***/
      },

      /***/
      "./js/foundation.responsiveAccordionTabs.js":
      /*!**************************************************!*\
        !*** ./js/foundation.responsiveAccordionTabs.js ***!
        \**************************************************/

      /*! exports provided: ResponsiveAccordionTabs */

      /***/
      function jsFoundationResponsiveAccordionTabsJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "ResponsiveAccordionTabs", function () {
          return ResponsiveAccordionTabs;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.util.mediaQuery */
        "./js/foundation.util.mediaQuery.js");
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");
        /* harmony import */


        var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ./foundation.core.plugin */
        "./js/foundation.core.plugin.js");
        /* harmony import */


        var _foundation_accordion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
        /*! ./foundation.accordion */
        "./js/foundation.accordion.js");
        /* harmony import */


        var _foundation_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
        /*! ./foundation.tabs */
        "./js/foundation.tabs.js");

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        } // The plugin matches the plugin classes with these plugin instances.


        var MenuPlugins = {
          tabs: {
            cssClass: 'tabs',
            plugin: _foundation_tabs__WEBPACK_IMPORTED_MODULE_5__["Tabs"]
          },
          accordion: {
            cssClass: 'accordion',
            plugin: _foundation_accordion__WEBPACK_IMPORTED_MODULE_4__["Accordion"]
          }
        };
        /**
         * ResponsiveAccordionTabs module.
         * @module foundation.responsiveAccordionTabs
         * @requires foundation.util.motion
         * @requires foundation.accordion
         * @requires foundation.tabs
         */

        var ResponsiveAccordionTabs =
        /*#__PURE__*/
        function (_Plugin) {
          _inherits(ResponsiveAccordionTabs, _Plugin);

          function ResponsiveAccordionTabs() {
            _classCallCheck(this, ResponsiveAccordionTabs);

            return _possibleConstructorReturn(this, _getPrototypeOf(ResponsiveAccordionTabs).apply(this, arguments));
          }

          _createClass(ResponsiveAccordionTabs, [{
            key: "_setup",

            /**
             * Creates a new instance of a responsive accordion tabs.
             * @class
             * @name ResponsiveAccordionTabs
             * @fires ResponsiveAccordionTabs#init
             * @param {jQuery} element - jQuery object to make into Responsive Accordion Tabs.
             * @param {Object} options - Overrides to the default plugin settings.
             */
            value: function _setup(element, options) {
              this.$element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element);
              this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, this.$element.data(), options);
              this.rules = this.$element.data('responsive-accordion-tabs');
              this.currentMq = null;
              this.currentPlugin = null;
              this.className = 'ResponsiveAccordionTabs'; // ie9 back compat

              if (!this.$element.attr('id')) {
                this.$element.attr('id', Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["GetYoDigits"])(6, 'responsiveaccordiontabs'));
              }

              ;

              this._init();

              this._events();
            }
            /**
             * Initializes the Menu by parsing the classes from the 'data-responsive-accordion-tabs' attribute on the element.
             * @function
             * @private
             */

          }, {
            key: "_init",
            value: function _init() {
              _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__["MediaQuery"]._init(); // The first time an Interchange plugin is initialized, this.rules is converted from a string of "classes" to an object of rules


              if (typeof this.rules === 'string') {
                var rulesTree = {}; // Parse rules from "classes" pulled from data attribute

                var rules = this.rules.split(' '); // Iterate through every rule found

                for (var i = 0; i < rules.length; i++) {
                  var rule = rules[i].split('-');
                  var ruleSize = rule.length > 1 ? rule[0] : 'small';
                  var rulePlugin = rule.length > 1 ? rule[1] : rule[0];

                  if (MenuPlugins[rulePlugin] !== null) {
                    rulesTree[ruleSize] = MenuPlugins[rulePlugin];
                  }
                }

                this.rules = rulesTree;
              }

              this._getAllOptions();

              if (!jquery__WEBPACK_IMPORTED_MODULE_0___default.a.isEmptyObject(this.rules)) {
                this._checkMediaQueries();
              }
            }
          }, {
            key: "_getAllOptions",
            value: function _getAllOptions() {
              //get all defaults and options
              var _this = this;

              _this.allOptions = {};

              for (var key in MenuPlugins) {
                if (MenuPlugins.hasOwnProperty(key)) {
                  var obj = MenuPlugins[key];

                  try {
                    var dummyPlugin = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<ul></ul>');
                    var tmpPlugin = new obj.plugin(dummyPlugin, _this.options);

                    for (var keyKey in tmpPlugin.options) {
                      if (tmpPlugin.options.hasOwnProperty(keyKey) && keyKey !== 'zfPlugin') {
                        var objObj = tmpPlugin.options[keyKey];
                        _this.allOptions[keyKey] = objObj;
                      }
                    }

                    tmpPlugin.destroy();
                  } catch (e) {}
                }
              }
            }
            /**
             * Initializes events for the Menu.
             * @function
             * @private
             */

          }, {
            key: "_events",
            value: function _events() {
              this._changedZfMediaQueryHandler = this._checkMediaQueries.bind(this);
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('changed.zf.mediaquery', this._changedZfMediaQueryHandler);
            }
            /**
             * Checks the current screen width against available media queries. If the media query has changed, and the plugin needed has changed, the plugins will swap out.
             * @function
             * @private
             */

          }, {
            key: "_checkMediaQueries",
            value: function _checkMediaQueries() {
              var matchedMq,
                  _this = this; // Iterate through each rule and find the last matching rule


              jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(this.rules, function (key) {
                if (_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__["MediaQuery"].atLeast(key)) {
                  matchedMq = key;
                }
              }); // No match? No dice

              if (!matchedMq) return; // Plugin already initialized? We good

              if (this.currentPlugin instanceof this.rules[matchedMq].plugin) return; // Remove existing plugin-specific CSS classes

              jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(MenuPlugins, function (key, value) {
                _this.$element.removeClass(value.cssClass);
              }); // Add the CSS class for the new plugin

              this.$element.addClass(this.rules[matchedMq].cssClass); // Create an instance of the new plugin

              if (this.currentPlugin) {
                //don't know why but on nested elements data zfPlugin get's lost
                if (!this.currentPlugin.$element.data('zfPlugin') && this.storezfData) this.currentPlugin.$element.data('zfPlugin', this.storezfData);
                this.currentPlugin.destroy();
              }

              this._handleMarkup(this.rules[matchedMq].cssClass);

              this.currentPlugin = new this.rules[matchedMq].plugin(this.$element, {});
              this.storezfData = this.currentPlugin.$element.data('zfPlugin');
            }
          }, {
            key: "_handleMarkup",
            value: function _handleMarkup(toSet) {
              var _this = this,
                  fromString = 'accordion';

              var $panels = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-tabs-content=' + this.$element.attr('id') + ']');
              if ($panels.length) fromString = 'tabs';

              if (fromString === toSet) {
                return;
              }

              ;
              var tabsTitle = _this.allOptions.linkClass ? _this.allOptions.linkClass : 'tabs-title';
              var tabsPanel = _this.allOptions.panelClass ? _this.allOptions.panelClass : 'tabs-panel';
              this.$element.removeAttr('role');
              var $liHeads = this.$element.children('.' + tabsTitle + ',[data-accordion-item]').removeClass(tabsTitle).removeClass('accordion-item').removeAttr('data-accordion-item');
              var $liHeadsA = $liHeads.children('a').removeClass('accordion-title');

              if (fromString === 'tabs') {
                $panels = $panels.children('.' + tabsPanel).removeClass(tabsPanel).removeAttr('role').removeAttr('aria-hidden').removeAttr('aria-labelledby');
                $panels.children('a').removeAttr('role').removeAttr('aria-controls').removeAttr('aria-selected');
              } else {
                $panels = $liHeads.children('[data-tab-content]').removeClass('accordion-content');
              }

              ;
              $panels.css({
                display: '',
                visibility: ''
              });
              $liHeads.css({
                display: '',
                visibility: ''
              });

              if (toSet === 'accordion') {
                $panels.each(function (key, value) {
                  jquery__WEBPACK_IMPORTED_MODULE_0___default()(value).appendTo($liHeads.get(key)).addClass('accordion-content').attr('data-tab-content', '').removeClass('is-active').css({
                    height: ''
                  });
                  jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-tabs-content=' + _this.$element.attr('id') + ']').after('<div id="tabs-placeholder-' + _this.$element.attr('id') + '"></div>').detach();
                  $liHeads.addClass('accordion-item').attr('data-accordion-item', '');
                  $liHeadsA.addClass('accordion-title');
                });
              } else if (toSet === 'tabs') {
                var $tabsContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-tabs-content=' + _this.$element.attr('id') + ']');
                var $placeholder = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tabs-placeholder-' + _this.$element.attr('id'));

                if ($placeholder.length) {
                  $tabsContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="tabs-content"></div>').insertAfter($placeholder).attr('data-tabs-content', _this.$element.attr('id'));
                  $placeholder.remove();
                } else {
                  $tabsContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="tabs-content"></div>').insertAfter(_this.$element).attr('data-tabs-content', _this.$element.attr('id'));
                }

                ;
                $panels.each(function (key, value) {
                  var tempValue = jquery__WEBPACK_IMPORTED_MODULE_0___default()(value).appendTo($tabsContent).addClass(tabsPanel);
                  var hash = $liHeadsA.get(key).hash.slice(1);
                  var id = jquery__WEBPACK_IMPORTED_MODULE_0___default()(value).attr('id') || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["GetYoDigits"])(6, 'accordion');

                  if (hash !== id) {
                    if (hash !== '') {
                      jquery__WEBPACK_IMPORTED_MODULE_0___default()(value).attr('id', hash);
                    } else {
                      hash = id;
                      jquery__WEBPACK_IMPORTED_MODULE_0___default()(value).attr('id', hash);
                      jquery__WEBPACK_IMPORTED_MODULE_0___default()($liHeadsA.get(key)).attr('href', jquery__WEBPACK_IMPORTED_MODULE_0___default()($liHeadsA.get(key)).attr('href').replace('#', '') + '#' + hash);
                    }

                    ;
                  }

                  ;
                  var isActive = jquery__WEBPACK_IMPORTED_MODULE_0___default()($liHeads.get(key)).hasClass('is-active');

                  if (isActive) {
                    tempValue.addClass('is-active');
                  }

                  ;
                });
                $liHeads.addClass(tabsTitle);
              }

              ;
            }
            /**
             * Destroys the instance of the current plugin on this element, as well as the window resize handler that switches the plugins out.
             * @function
             */

          }, {
            key: "_destroy",
            value: function _destroy() {
              if (this.currentPlugin) this.currentPlugin.destroy();
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('changed.zf.mediaquery', this._changedZfMediaQueryHandler);
            }
          }]);

          return ResponsiveAccordionTabs;
        }(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_3__["Plugin"]);

        ResponsiveAccordionTabs.defaults = {};
        /***/
      },

      /***/
      "./js/foundation.responsiveMenu.js":
      /*!*****************************************!*\
        !*** ./js/foundation.responsiveMenu.js ***!
        \*****************************************/

      /*! exports provided: ResponsiveMenu */

      /***/
      function jsFoundationResponsiveMenuJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "ResponsiveMenu", function () {
          return ResponsiveMenu;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.util.mediaQuery */
        "./js/foundation.util.mediaQuery.js");
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");
        /* harmony import */


        var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ./foundation.core.plugin */
        "./js/foundation.core.plugin.js");
        /* harmony import */


        var _foundation_dropdownMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
        /*! ./foundation.dropdownMenu */
        "./js/foundation.dropdownMenu.js");
        /* harmony import */


        var _foundation_drilldown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
        /*! ./foundation.drilldown */
        "./js/foundation.drilldown.js");
        /* harmony import */


        var _foundation_accordionMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
        /*! ./foundation.accordionMenu */
        "./js/foundation.accordionMenu.js");

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        }

        var MenuPlugins = {
          dropdown: {
            cssClass: 'dropdown',
            plugin: _foundation_dropdownMenu__WEBPACK_IMPORTED_MODULE_4__["DropdownMenu"]
          },
          drilldown: {
            cssClass: 'drilldown',
            plugin: _foundation_drilldown__WEBPACK_IMPORTED_MODULE_5__["Drilldown"]
          },
          accordion: {
            cssClass: 'accordion-menu',
            plugin: _foundation_accordionMenu__WEBPACK_IMPORTED_MODULE_6__["AccordionMenu"]
          }
        }; // import "foundation.util.triggers.js";

        /**
         * ResponsiveMenu module.
         * @module foundation.responsiveMenu
         * @requires foundation.util.triggers
         * @requires foundation.util.mediaQuery
         */

        var ResponsiveMenu =
        /*#__PURE__*/
        function (_Plugin) {
          _inherits(ResponsiveMenu, _Plugin);

          function ResponsiveMenu() {
            _classCallCheck(this, ResponsiveMenu);

            return _possibleConstructorReturn(this, _getPrototypeOf(ResponsiveMenu).apply(this, arguments));
          }

          _createClass(ResponsiveMenu, [{
            key: "_setup",

            /**
             * Creates a new instance of a responsive menu.
             * @class
             * @name ResponsiveMenu
             * @fires ResponsiveMenu#init
             * @param {jQuery} element - jQuery object to make into a dropdown menu.
             * @param {Object} options - Overrides to the default plugin settings.
             */
            value: function _setup(element, options) {
              this.$element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element);
              this.rules = this.$element.data('responsive-menu');
              this.currentMq = null;
              this.currentPlugin = null;
              this.className = 'ResponsiveMenu'; // ie9 back compat

              this._init();

              this._events();
            }
            /**
             * Initializes the Menu by parsing the classes from the 'data-ResponsiveMenu' attribute on the element.
             * @function
             * @private
             */

          }, {
            key: "_init",
            value: function _init() {
              _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__["MediaQuery"]._init(); // The first time an Interchange plugin is initialized, this.rules is converted from a string of "classes" to an object of rules


              if (typeof this.rules === 'string') {
                var rulesTree = {}; // Parse rules from "classes" pulled from data attribute

                var rules = this.rules.split(' '); // Iterate through every rule found

                for (var i = 0; i < rules.length; i++) {
                  var rule = rules[i].split('-');
                  var ruleSize = rule.length > 1 ? rule[0] : 'small';
                  var rulePlugin = rule.length > 1 ? rule[1] : rule[0];

                  if (MenuPlugins[rulePlugin] !== null) {
                    rulesTree[ruleSize] = MenuPlugins[rulePlugin];
                  }
                }

                this.rules = rulesTree;
              }

              if (!jquery__WEBPACK_IMPORTED_MODULE_0___default.a.isEmptyObject(this.rules)) {
                this._checkMediaQueries();
              } // Add data-mutate since children may need it.


              this.$element.attr('data-mutate', this.$element.attr('data-mutate') || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_2__["GetYoDigits"])(6, 'responsive-menu'));
            }
            /**
             * Initializes events for the Menu.
             * @function
             * @private
             */

          }, {
            key: "_events",
            value: function _events() {
              var _this = this;

              jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('changed.zf.mediaquery', function () {
                _this._checkMediaQueries();
              }); // $(window).on('resize.zf.ResponsiveMenu', function() {
              //   _this._checkMediaQueries();
              // });
            }
            /**
             * Checks the current screen width against available media queries. If the media query has changed, and the plugin needed has changed, the plugins will swap out.
             * @function
             * @private
             */

          }, {
            key: "_checkMediaQueries",
            value: function _checkMediaQueries() {
              var matchedMq,
                  _this = this; // Iterate through each rule and find the last matching rule


              jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(this.rules, function (key) {
                if (_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__["MediaQuery"].atLeast(key)) {
                  matchedMq = key;
                }
              }); // No match? No dice

              if (!matchedMq) return; // Plugin already initialized? We good

              if (this.currentPlugin instanceof this.rules[matchedMq].plugin) return; // Remove existing plugin-specific CSS classes

              jquery__WEBPACK_IMPORTED_MODULE_0___default.a.each(MenuPlugins, function (key, value) {
                _this.$element.removeClass(value.cssClass);
              }); // Add the CSS class for the new plugin

              this.$element.addClass(this.rules[matchedMq].cssClass); // Create an instance of the new plugin

              if (this.currentPlugin) this.currentPlugin.destroy();
              this.currentPlugin = new this.rules[matchedMq].plugin(this.$element, {});
            }
            /**
             * Destroys the instance of the current plugin on this element, as well as the window resize handler that switches the plugins out.
             * @function
             */

          }, {
            key: "_destroy",
            value: function _destroy() {
              this.currentPlugin.destroy();
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('.zf.ResponsiveMenu');
            }
          }]);

          return ResponsiveMenu;
        }(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_3__["Plugin"]);

        ResponsiveMenu.defaults = {};
        /***/
      },

      /***/
      "./js/foundation.responsiveToggle.js":
      /*!*******************************************!*\
        !*** ./js/foundation.responsiveToggle.js ***!
        \*******************************************/

      /*! exports provided: ResponsiveToggle */

      /***/
      function jsFoundationResponsiveToggleJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "ResponsiveToggle", function () {
          return ResponsiveToggle;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.util.mediaQuery */
        "./js/foundation.util.mediaQuery.js");
        /* harmony import */


        var _foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./foundation.util.motion */
        "./js/foundation.util.motion.js");
        /* harmony import */


        var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ./foundation.core.plugin */
        "./js/foundation.core.plugin.js");

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        }
        /**
         * ResponsiveToggle module.
         * @module foundation.responsiveToggle
         * @requires foundation.util.mediaQuery
         * @requires foundation.util.motion
         */


        var ResponsiveToggle =
        /*#__PURE__*/
        function (_Plugin) {
          _inherits(ResponsiveToggle, _Plugin);

          function ResponsiveToggle() {
            _classCallCheck(this, ResponsiveToggle);

            return _possibleConstructorReturn(this, _getPrototypeOf(ResponsiveToggle).apply(this, arguments));
          }

          _createClass(ResponsiveToggle, [{
            key: "_setup",

            /**
             * Creates a new instance of Tab Bar.
             * @class
             * @name ResponsiveToggle
             * @fires ResponsiveToggle#init
             * @param {jQuery} element - jQuery object to attach tab bar functionality to.
             * @param {Object} options - Overrides to the default plugin settings.
             */
            value: function _setup(element, options) {
              this.$element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element);
              this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, ResponsiveToggle.defaults, this.$element.data(), options);
              this.className = 'ResponsiveToggle'; // ie9 back compat

              this._init();

              this._events();
            }
            /**
             * Initializes the tab bar by finding the target element, toggling element, and running update().
             * @function
             * @private
             */

          }, {
            key: "_init",
            value: function _init() {
              _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__["MediaQuery"]._init();

              var targetID = this.$element.data('responsive-toggle');

              if (!targetID) {
                console.error('Your tab bar needs an ID of a Menu as the value of data-tab-bar.');
              }

              this.$targetMenu = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(targetID));
              this.$toggler = this.$element.find('[data-toggle]').filter(function () {
                var target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('toggle');
                return target === targetID || target === "";
              });
              this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, this.options, this.$targetMenu.data()); // If they were set, parse the animation classes

              if (this.options.animate) {
                var input = this.options.animate.split(' ');
                this.animationIn = input[0];
                this.animationOut = input[1] || null;
              }

              this._update();
            }
            /**
             * Adds necessary event handlers for the tab bar to work.
             * @function
             * @private
             */

          }, {
            key: "_events",
            value: function _events() {
              var _this = this;

              this._updateMqHandler = this._update.bind(this);
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('changed.zf.mediaquery', this._updateMqHandler);
              this.$toggler.on('click.zf.responsiveToggle', this.toggleMenu.bind(this));
            }
            /**
             * Checks the current media query to determine if the tab bar should be visible or hidden.
             * @function
             * @private
             */

          }, {
            key: "_update",
            value: function _update() {
              // Mobile
              if (!_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__["MediaQuery"].atLeast(this.options.hideFor)) {
                this.$element.show();
                this.$targetMenu.hide();
              } // Desktop
              else {
                  this.$element.hide();
                  this.$targetMenu.show();
                }
            }
            /**
             * Toggles the element attached to the tab bar. The toggle only happens if the screen is small enough to allow it.
             * @function
             * @fires ResponsiveToggle#toggled
             */

          }, {
            key: "toggleMenu",
            value: function toggleMenu() {
              var _this2 = this;

              if (!_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_1__["MediaQuery"].atLeast(this.options.hideFor)) {
                /**
                 * Fires when the element attached to the tab bar toggles.
                 * @event ResponsiveToggle#toggled
                 */
                if (this.options.animate) {
                  if (this.$targetMenu.is(':hidden')) {
                    _foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__["Motion"].animateIn(this.$targetMenu, this.animationIn, function () {
                      _this2.$element.trigger('toggled.zf.responsiveToggle');

                      _this2.$targetMenu.find('[data-mutate]').triggerHandler('mutateme.zf.trigger');
                    });
                  } else {
                    _foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__["Motion"].animateOut(this.$targetMenu, this.animationOut, function () {
                      _this2.$element.trigger('toggled.zf.responsiveToggle');
                    });
                  }
                } else {
                  this.$targetMenu.toggle(0);
                  this.$targetMenu.find('[data-mutate]').trigger('mutateme.zf.trigger');
                  this.$element.trigger('toggled.zf.responsiveToggle');
                }
              }
            }
          }, {
            key: "_destroy",
            value: function _destroy() {
              this.$element.off('.zf.responsiveToggle');
              this.$toggler.off('.zf.responsiveToggle');
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('changed.zf.mediaquery', this._updateMqHandler);
            }
          }]);

          return ResponsiveToggle;
        }(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_3__["Plugin"]);

        ResponsiveToggle.defaults = {
          /**
           * The breakpoint after which the menu is always shown, and the tab bar is hidden.
           * @option
           * @type {string}
           * @default 'medium'
           */
          hideFor: 'medium',

          /**
           * To decide if the toggle should be animated or not.
           * @option
           * @type {boolean}
           * @default false
           */
          animate: false
        };
        /***/
      },

      /***/
      "./js/foundation.reveal.js":
      /*!*********************************!*\
        !*** ./js/foundation.reveal.js ***!
        \*********************************/

      /*! exports provided: Reveal */

      /***/
      function jsFoundationRevealJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Reveal", function () {
          return Reveal;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");
        /* harmony import */


        var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./foundation.util.keyboard */
        "./js/foundation.util.keyboard.js");
        /* harmony import */


        var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ./foundation.util.mediaQuery */
        "./js/foundation.util.mediaQuery.js");
        /* harmony import */


        var _foundation_util_motion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
        /*! ./foundation.util.motion */
        "./js/foundation.util.motion.js");
        /* harmony import */


        var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
        /*! ./foundation.core.plugin */
        "./js/foundation.core.plugin.js");
        /* harmony import */


        var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
        /*! ./foundation.util.triggers */
        "./js/foundation.util.triggers.js");

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        }
        /**
         * Reveal module.
         * @module foundation.reveal
         * @requires foundation.util.keyboard
         * @requires foundation.util.triggers
         * @requires foundation.util.mediaQuery
         * @requires foundation.util.motion if using animations
         */


        var Reveal =
        /*#__PURE__*/
        function (_Plugin) {
          _inherits(Reveal, _Plugin);

          function Reveal() {
            _classCallCheck(this, Reveal);

            return _possibleConstructorReturn(this, _getPrototypeOf(Reveal).apply(this, arguments));
          }

          _createClass(Reveal, [{
            key: "_setup",

            /**
             * Creates a new instance of Reveal.
             * @class
             * @name Reveal
             * @param {jQuery} element - jQuery object to use for the modal.
             * @param {Object} options - optional parameters.
             */
            value: function _setup(element, options) {
              this.$element = element;
              this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, Reveal.defaults, this.$element.data(), options);
              this.className = 'Reveal'; // ie9 back compat

              this._init(); // Triggers init is idempotent, just need to make sure it is initialized


              _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_6__["Triggers"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);

              _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_2__["Keyboard"].register('Reveal', {
                'ESCAPE': 'close'
              });
            }
            /**
             * Initializes the modal by adding the overlay and close buttons, (if selected).
             * @private
             */

          }, {
            key: "_init",
            value: function _init() {
              var _this2 = this;

              _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_3__["MediaQuery"]._init();

              this.id = this.$element.attr('id');
              this.isActive = false;
              this.cached = {
                mq: _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_3__["MediaQuery"].current
              };
              this.$anchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-open=\"".concat(this.id, "\"]")).length ? jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-open=\"".concat(this.id, "\"]")) : jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-toggle=\"".concat(this.id, "\"]"));
              this.$anchor.attr({
                'aria-controls': this.id,
                'aria-haspopup': true,
                'tabindex': 0
              });

              if (this.options.fullScreen || this.$element.hasClass('full')) {
                this.options.fullScreen = true;
                this.options.overlay = false;
              }

              if (this.options.overlay && !this.$overlay) {
                this.$overlay = this._makeOverlay(this.id);
              }

              this.$element.attr({
                'role': 'dialog',
                'aria-hidden': true,
                'data-yeti-box': this.id,
                'data-resize': this.id
              });

              if (this.$overlay) {
                this.$element.detach().appendTo(this.$overlay);
              } else {
                this.$element.detach().appendTo(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.options.appendTo));
                this.$element.addClass('without-overlay');
              }

              this._events();

              if (this.options.deepLink && window.location.hash === "#".concat(this.id)) {
                this.onLoadListener = Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__["onLoad"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window), function () {
                  return _this2.open();
                });
              }
            }
            /**
             * Creates an overlay div to display behind the modal.
             * @private
             */

          }, {
            key: "_makeOverlay",
            value: function _makeOverlay() {
              var additionalOverlayClasses = '';

              if (this.options.additionalOverlayClasses) {
                additionalOverlayClasses = ' ' + this.options.additionalOverlayClasses;
              }

              return jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div></div>').addClass('reveal-overlay' + additionalOverlayClasses).appendTo(this.options.appendTo);
            }
            /**
             * Updates position of modal
             * TODO:  Figure out if we actually need to cache these values or if it doesn't matter
             * @private
             */

          }, {
            key: "_updatePosition",
            value: function _updatePosition() {
              var width = this.$element.outerWidth();
              var outerWidth = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).width();
              var height = this.$element.outerHeight();
              var outerHeight = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height();
              var left,
                  top = null;

              if (this.options.hOffset === 'auto') {
                left = parseInt((outerWidth - width) / 2, 10);
              } else {
                left = parseInt(this.options.hOffset, 10);
              }

              if (this.options.vOffset === 'auto') {
                if (height > outerHeight) {
                  top = parseInt(Math.min(100, outerHeight / 10), 10);
                } else {
                  top = parseInt((outerHeight - height) / 4, 10);
                }
              } else if (this.options.vOffset !== null) {
                top = parseInt(this.options.vOffset, 10);
              }

              if (top !== null) {
                this.$element.css({
                  top: top + 'px'
                });
              } // only worry about left if we don't have an overlay or we have a horizontal offset,
              // otherwise we're perfectly in the middle


              if (!this.$overlay || this.options.hOffset !== 'auto') {
                this.$element.css({
                  left: left + 'px'
                });
                this.$element.css({
                  margin: '0px'
                });
              }
            }
            /**
             * Adds event handlers for the modal.
             * @private
             */

          }, {
            key: "_events",
            value: function _events() {
              var _this3 = this;

              var _this = this;

              this.$element.on({
                'open.zf.trigger': this.open.bind(this),
                'close.zf.trigger': function closeZfTrigger(event, $element) {
                  if (event.target === _this.$element[0] || jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target).parents('[data-closable]')[0] === $element) {
                    // only close reveal when it's explicitly called
                    return _this3.close.apply(_this3);
                  }
                },
                'toggle.zf.trigger': this.toggle.bind(this),
                'resizeme.zf.trigger': function resizemeZfTrigger() {
                  _this._updatePosition();
                }
              });

              if (this.options.closeOnClick && this.options.overlay) {
                this.$overlay.off('.zf.reveal').on('click.zf.reveal', function (e) {
                  if (e.target === _this.$element[0] || jquery__WEBPACK_IMPORTED_MODULE_0___default.a.contains(_this.$element[0], e.target) || !jquery__WEBPACK_IMPORTED_MODULE_0___default.a.contains(document, e.target)) {
                    return;
                  }

                  _this.close();
                });
              }

              if (this.options.deepLink) {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on("hashchange.zf.reveal:".concat(this.id), this._handleState.bind(this));
              }
            }
            /**
             * Handles modal methods on back/forward button clicks or any other event that triggers hashchange.
             * @private
             */

          }, {
            key: "_handleState",
            value: function _handleState(e) {
              if (window.location.hash === '#' + this.id && !this.isActive) {
                this.open();
              } else {
                this.close();
              }
            }
            /**
            * Disables the scroll when Reveal is shown to prevent the background from shifting
            * @param {number} scrollTop - Scroll to visually apply, window current scroll by default
            */

          }, {
            key: "_disableScroll",
            value: function _disableScroll(scrollTop) {
              scrollTop = scrollTop || jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scrollTop();

              if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).height() > jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height()) {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()("html").css("top", -scrollTop);
              }
            }
            /**
            * Reenables the scroll when Reveal closes
            * @param {number} scrollTop - Scroll to restore, html "top" property by default (as set by `_disableScroll`)
            */

          }, {
            key: "_enableScroll",
            value: function _enableScroll(scrollTop) {
              scrollTop = scrollTop || parseInt(jquery__WEBPACK_IMPORTED_MODULE_0___default()("html").css("top"));

              if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).height() > jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height()) {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()("html").css("top", "");
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scrollTop(-scrollTop);
              }
            }
            /**
             * Opens the modal controlled by `this.$anchor`, and closes all others by default.
             * @function
             * @fires Reveal#closeme
             * @fires Reveal#open
             */

          }, {
            key: "open",
            value: function open() {
              var _this4 = this; // either update or replace browser history


              var hash = "#".concat(this.id);

              if (this.options.deepLink && window.location.hash !== hash) {
                if (window.history.pushState) {
                  if (this.options.updateHistory) {
                    window.history.pushState({}, '', hash);
                  } else {
                    window.history.replaceState({}, '', hash);
                  }
                } else {
                  window.location.hash = hash;
                }
              } // Remember anchor that opened it to set focus back later, have general anchors as fallback


              this.$activeAnchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.activeElement).is(this.$anchor) ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.activeElement) : this.$anchor;
              this.isActive = true; // Make elements invisible, but remove display: none so we can get size and positioning

              this.$element.css({
                'visibility': 'hidden'
              }).show().scrollTop(0);

              if (this.options.overlay) {
                this.$overlay.css({
                  'visibility': 'hidden'
                }).show();
              }

              this._updatePosition();

              this.$element.hide().css({
                'visibility': ''
              });

              if (this.$overlay) {
                this.$overlay.css({
                  'visibility': ''
                }).hide();

                if (this.$element.hasClass('fast')) {
                  this.$overlay.addClass('fast');
                } else if (this.$element.hasClass('slow')) {
                  this.$overlay.addClass('slow');
                }
              }

              if (!this.options.multipleOpened) {
                /**
                 * Fires immediately before the modal opens.
                 * Closes any other modals that are currently open
                 * @event Reveal#closeme
                 */
                this.$element.trigger('closeme.zf.reveal', this.id);
              }

              this._disableScroll();

              var _this = this; // Motion UI method of reveal


              if (this.options.animationIn) {
                var afterAnimation = function afterAnimation() {
                  _this.$element.attr({
                    'aria-hidden': false,
                    'tabindex': -1
                  }).focus();

                  _this._addGlobalClasses();

                  _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_2__["Keyboard"].trapFocus(_this.$element);
                };

                if (this.options.overlay) {
                  _foundation_util_motion__WEBPACK_IMPORTED_MODULE_4__["Motion"].animateIn(this.$overlay, 'fade-in');
                }

                _foundation_util_motion__WEBPACK_IMPORTED_MODULE_4__["Motion"].animateIn(this.$element, this.options.animationIn, function () {
                  if (_this4.$element) {
                    // protect against object having been removed
                    _this4.focusableElements = _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_2__["Keyboard"].findFocusable(_this4.$element);
                    afterAnimation();
                  }
                });
              } // jQuery method of reveal
              else {
                  if (this.options.overlay) {
                    this.$overlay.show(0);
                  }

                  this.$element.show(this.options.showDelay);
                } // handle accessibility


              this.$element.attr({
                'aria-hidden': false,
                'tabindex': -1
              }).focus();

              _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_2__["Keyboard"].trapFocus(this.$element);

              this._addGlobalClasses();

              this._addGlobalListeners();
              /**
               * Fires when the modal has successfully opened.
               * @event Reveal#open
               */


              this.$element.trigger('open.zf.reveal');
            }
            /**
             * Adds classes and listeners on document required by open modals.
             *
             * The following classes are added and updated:
             * - `.is-reveal-open` - Prevents the scroll on document
             * - `.zf-has-scroll`  - Displays a disabled scrollbar on document if required like if the
             *                       scroll was not disabled. This prevent a "shift" of the page content due
             *                       the scrollbar disappearing when the modal opens.
             *
             * @private
             */

          }, {
            key: "_addGlobalClasses",
            value: function _addGlobalClasses() {
              var updateScrollbarClass = function updateScrollbarClass() {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').toggleClass('zf-has-scroll', !!(jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).height() > jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).height()));
              };

              this.$element.on('resizeme.zf.trigger.revealScrollbarListener', function () {
                return updateScrollbarClass();
              });
              updateScrollbarClass();
              jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').addClass('is-reveal-open');
            }
            /**
             * Removes classes and listeners on document that were required by open modals.
             * @private
             */

          }, {
            key: "_removeGlobalClasses",
            value: function _removeGlobalClasses() {
              this.$element.off('resizeme.zf.trigger.revealScrollbarListener');
              jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').removeClass('is-reveal-open');
              jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').removeClass('zf-has-scroll');
            }
            /**
             * Adds extra event handlers for the body and window if necessary.
             * @private
             */

          }, {
            key: "_addGlobalListeners",
            value: function _addGlobalListeners() {
              var _this = this;

              if (!this.$element) {
                return;
              } // If we're in the middle of cleanup, don't freak out


              this.focusableElements = _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_2__["Keyboard"].findFocusable(this.$element);

              if (!this.options.overlay && this.options.closeOnClick && !this.options.fullScreen) {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').on('click.zf.reveal', function (e) {
                  if (e.target === _this.$element[0] || jquery__WEBPACK_IMPORTED_MODULE_0___default.a.contains(_this.$element[0], e.target) || !jquery__WEBPACK_IMPORTED_MODULE_0___default.a.contains(document, e.target)) {
                    return;
                  }

                  _this.close();
                });
              }

              if (this.options.closeOnEsc) {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('keydown.zf.reveal', function (e) {
                  _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_2__["Keyboard"].handleKey(e, 'Reveal', {
                    close: function close() {
                      if (_this.options.closeOnEsc) {
                        _this.close();
                      }
                    }
                  });
                });
              }
            }
            /**
             * Closes the modal.
             * @function
             * @fires Reveal#closed
             */

          }, {
            key: "close",
            value: function close() {
              if (!this.isActive || !this.$element.is(':visible')) {
                return false;
              }

              var _this = this; // Motion UI method of hiding


              if (this.options.animationOut) {
                if (this.options.overlay) {
                  _foundation_util_motion__WEBPACK_IMPORTED_MODULE_4__["Motion"].animateOut(this.$overlay, 'fade-out');
                }

                _foundation_util_motion__WEBPACK_IMPORTED_MODULE_4__["Motion"].animateOut(this.$element, this.options.animationOut, finishUp);
              } // jQuery method of hiding
              else {
                  this.$element.hide(this.options.hideDelay);

                  if (this.options.overlay) {
                    this.$overlay.hide(0, finishUp);
                  } else {
                    finishUp();
                  }
                } // Conditionals to remove extra event listeners added on open


              if (this.options.closeOnEsc) {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('keydown.zf.reveal');
              }

              if (!this.options.overlay && this.options.closeOnClick) {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').off('click.zf.reveal');
              }

              this.$element.off('keydown.zf.reveal');

              function finishUp() {
                // Get the current top before the modal is closed and restore the scroll after.
                // TODO: use component properties instead of HTML properties
                // See https://github.com/zurb/foundation-sites/pull/10786
                var scrollTop = parseInt(jquery__WEBPACK_IMPORTED_MODULE_0___default()("html").css("top"));

                if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.reveal:visible').length === 0) {
                  _this._removeGlobalClasses(); // also remove .is-reveal-open from the html element when there is no opened reveal

                }

                _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_2__["Keyboard"].releaseFocus(_this.$element);

                _this.$element.attr('aria-hidden', true);

                _this._enableScroll(scrollTop);
                /**
                * Fires when the modal is done closing.
                * @event Reveal#closed
                */


                _this.$element.trigger('closed.zf.reveal');
              }
              /**
              * Resets the modal content
              * This prevents a running video to keep going in the background
              */


              if (this.options.resetOnClose) {
                this.$element.html(this.$element.html());
              }

              this.isActive = false; // If deepLink and we did not switched to an other modal...

              if (_this.options.deepLink && window.location.hash === "#".concat(this.id)) {
                // Remove the history hash
                if (window.history.replaceState) {
                  var urlWithoutHash = window.location.pathname + window.location.search;

                  if (this.options.updateHistory) {
                    window.history.pushState({}, '', urlWithoutHash); // remove the hash
                  } else {
                    window.history.replaceState('', document.title, urlWithoutHash);
                  }
                } else {
                  window.location.hash = '';
                }
              }

              this.$activeAnchor.focus();
            }
            /**
             * Toggles the open/closed state of a modal.
             * @function
             */

          }, {
            key: "toggle",
            value: function toggle() {
              if (this.isActive) {
                this.close();
              } else {
                this.open();
              }
            }
          }, {
            key: "_destroy",

            /**
             * Destroys an instance of a modal.
             * @function
             */
            value: function _destroy() {
              if (this.options.overlay) {
                this.$element.appendTo(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.options.appendTo)); // move $element outside of $overlay to prevent error unregisterPlugin()

                this.$overlay.hide().off().remove();
              }

              this.$element.hide().off();
              this.$anchor.off('.zf');
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(".zf.reveal:".concat(this.id));
              if (this.onLoadListener) jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(this.onLoadListener);

              if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.reveal:visible').length === 0) {
                this._removeGlobalClasses(); // also remove .is-reveal-open from the html element when there is no opened reveal

              }
            }
          }]);

          return Reveal;
        }(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_5__["Plugin"]);

        Reveal.defaults = {
          /**
           * Motion-UI class to use for animated elements. If none used, defaults to simple show/hide.
           * @option
           * @type {string}
           * @default ''
           */
          animationIn: '',

          /**
           * Motion-UI class to use for animated elements. If none used, defaults to simple show/hide.
           * @option
           * @type {string}
           * @default ''
           */
          animationOut: '',

          /**
           * Time, in ms, to delay the opening of a modal after a click if no animation used.
           * @option
           * @type {number}
           * @default 0
           */
          showDelay: 0,

          /**
           * Time, in ms, to delay the closing of a modal after a click if no animation used.
           * @option
           * @type {number}
           * @default 0
           */
          hideDelay: 0,

          /**
           * Allows a click on the body/overlay to close the modal.
           * @option
           * @type {boolean}
           * @default true
           */
          closeOnClick: true,

          /**
           * Allows the modal to close if the user presses the `ESCAPE` key.
           * @option
           * @type {boolean}
           * @default true
           */
          closeOnEsc: true,

          /**
           * If true, allows multiple modals to be displayed at once.
           * @option
           * @type {boolean}
           * @default false
           */
          multipleOpened: false,

          /**
           * Distance, in pixels, the modal should push down from the top of the screen.
           * @option
           * @type {number|string}
           * @default auto
           */
          vOffset: 'auto',

          /**
           * Distance, in pixels, the modal should push in from the side of the screen.
           * @option
           * @type {number|string}
           * @default auto
           */
          hOffset: 'auto',

          /**
           * Allows the modal to be fullscreen, completely blocking out the rest of the view. JS checks for this as well.
           * @option
           * @type {boolean}
           * @default false
           */
          fullScreen: false,

          /**
           * Allows the modal to generate an overlay div, which will cover the view when modal opens.
           * @option
           * @type {boolean}
           * @default true
           */
          overlay: true,

          /**
           * Allows the modal to remove and reinject markup on close. Should be true if using video elements w/o using provider's api, otherwise, videos will continue to play in the background.
           * @option
           * @type {boolean}
           * @default false
           */
          resetOnClose: false,

          /**
           * Link the location hash to the modal.
           * Set the location hash when the modal is opened/closed, and open/close the modal when the location changes.
           * @option
           * @type {boolean}
           * @default false
           */
          deepLink: false,

          /**
           * If `deepLink` is enabled, update the browser history with the open modal
           * @option
           * @default false
           */
          updateHistory: false,

          /**
          * Allows the modal to append to custom div.
          * @option
          * @type {string}
          * @default "body"
          */
          appendTo: "body",

          /**
           * Allows adding additional class names to the reveal overlay.
           * @option
           * @type {string}
           * @default ''
           */
          additionalOverlayClasses: ''
        };
        /***/
      },

      /***/
      "./js/foundation.slider.js":
      /*!*********************************!*\
        !*** ./js/foundation.slider.js ***!
        \*********************************/

      /*! exports provided: Slider */

      /***/
      function jsFoundationSliderJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Slider", function () {
          return Slider;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.util.keyboard */
        "./js/foundation.util.keyboard.js");
        /* harmony import */


        var _foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./foundation.util.motion */
        "./js/foundation.util.motion.js");
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");
        /* harmony import */


        var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
        /*! ./foundation.core.plugin */
        "./js/foundation.core.plugin.js");
        /* harmony import */


        var _foundation_util_touch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
        /*! ./foundation.util.touch */
        "./js/foundation.util.touch.js");
        /* harmony import */


        var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
        /*! ./foundation.util.triggers */
        "./js/foundation.util.triggers.js");

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        }
        /**
         * Slider module.
         * @module foundation.slider
         * @requires foundation.util.motion
         * @requires foundation.util.triggers
         * @requires foundation.util.keyboard
         * @requires foundation.util.touch
         */


        var Slider =
        /*#__PURE__*/
        function (_Plugin) {
          _inherits(Slider, _Plugin);

          function Slider() {
            _classCallCheck(this, Slider);

            return _possibleConstructorReturn(this, _getPrototypeOf(Slider).apply(this, arguments));
          }

          _createClass(Slider, [{
            key: "_setup",

            /**
             * Creates a new instance of a slider control.
             * @class
             * @name Slider
             * @param {jQuery} element - jQuery object to make into a slider control.
             * @param {Object} options - Overrides to the default plugin settings.
             */
            value: function _setup(element, options) {
              this.$element = element;
              this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, Slider.defaults, this.$element.data(), options);
              this.className = 'Slider'; // ie9 back compat
              // Touch and Triggers inits are idempotent, we just need to make sure it's initialied.

              _foundation_util_touch__WEBPACK_IMPORTED_MODULE_5__["Touch"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);

              _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_6__["Triggers"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);

              this._init();

              _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__["Keyboard"].register('Slider', {
                'ltr': {
                  'ARROW_RIGHT': 'increase',
                  'ARROW_UP': 'increase',
                  'ARROW_DOWN': 'decrease',
                  'ARROW_LEFT': 'decrease',
                  'SHIFT_ARROW_RIGHT': 'increase_fast',
                  'SHIFT_ARROW_UP': 'increase_fast',
                  'SHIFT_ARROW_DOWN': 'decrease_fast',
                  'SHIFT_ARROW_LEFT': 'decrease_fast',
                  'HOME': 'min',
                  'END': 'max'
                },
                'rtl': {
                  'ARROW_LEFT': 'increase',
                  'ARROW_RIGHT': 'decrease',
                  'SHIFT_ARROW_LEFT': 'increase_fast',
                  'SHIFT_ARROW_RIGHT': 'decrease_fast'
                }
              });
            }
            /**
             * Initilizes the plugin by reading/setting attributes, creating collections and setting the initial position of the handle(s).
             * @function
             * @private
             */

          }, {
            key: "_init",
            value: function _init() {
              this.inputs = this.$element.find('input');
              this.handles = this.$element.find('[data-slider-handle]');
              this.$handle = this.handles.eq(0);
              this.$input = this.inputs.length ? this.inputs.eq(0) : jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(this.$handle.attr('aria-controls')));
              this.$fill = this.$element.find('[data-slider-fill]').css(this.options.vertical ? 'height' : 'width', 0);

              var isDbl = false,
                  _this = this;

              if (this.options.disabled || this.$element.hasClass(this.options.disabledClass)) {
                this.options.disabled = true;
                this.$element.addClass(this.options.disabledClass);
              }

              if (!this.inputs.length) {
                this.inputs = jquery__WEBPACK_IMPORTED_MODULE_0___default()().add(this.$input);
                this.options.binding = true;
              }

              this._setInitAttr(0);

              if (this.handles[1]) {
                this.options.doubleSided = true;
                this.$handle2 = this.handles.eq(1);
                this.$input2 = this.inputs.length > 1 ? this.inputs.eq(1) : jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(this.$handle2.attr('aria-controls')));

                if (!this.inputs[1]) {
                  this.inputs = this.inputs.add(this.$input2);
                }

                isDbl = true; // this.$handle.triggerHandler('click.zf.slider');

                this._setInitAttr(1);
              } // Set handle positions


              this.setHandles();

              this._events();
            }
          }, {
            key: "setHandles",
            value: function setHandles() {
              var _this2 = this;

              if (this.handles[1]) {
                this._setHandlePos(this.$handle, this.inputs.eq(0).val(), true, function () {
                  _this2._setHandlePos(_this2.$handle2, _this2.inputs.eq(1).val(), true);
                });
              } else {
                this._setHandlePos(this.$handle, this.inputs.eq(0).val(), true);
              }
            }
          }, {
            key: "_reflow",
            value: function _reflow() {
              this.setHandles();
            }
            /**
            * @function
            * @private
            * @param {Number} value - floating point (the value) to be transformed using to a relative position on the slider (the inverse of _value)
            */

          }, {
            key: "_pctOfBar",
            value: function _pctOfBar(value) {
              var pctOfBar = percent(value - this.options.start, this.options.end - this.options.start);

              switch (this.options.positionValueFunction) {
                case "pow":
                  pctOfBar = this._logTransform(pctOfBar);
                  break;

                case "log":
                  pctOfBar = this._powTransform(pctOfBar);
                  break;
              }

              return pctOfBar.toFixed(2);
            }
            /**
            * @function
            * @private
            * @param {Number} pctOfBar - floating point, the relative position of the slider (typically between 0-1) to be transformed to a value
            */

          }, {
            key: "_value",
            value: function _value(pctOfBar) {
              switch (this.options.positionValueFunction) {
                case "pow":
                  pctOfBar = this._powTransform(pctOfBar);
                  break;

                case "log":
                  pctOfBar = this._logTransform(pctOfBar);
                  break;
              }

              var value = (this.options.end - this.options.start) * pctOfBar + parseFloat(this.options.start);
              return value;
            }
            /**
            * @function
            * @private
            * @param {Number} value - floating point (typically between 0-1) to be transformed using the log function
            */

          }, {
            key: "_logTransform",
            value: function _logTransform(value) {
              return baseLog(this.options.nonLinearBase, value * (this.options.nonLinearBase - 1) + 1);
            }
            /**
            * @function
            * @private
            * @param {Number} value - floating point (typically between 0-1) to be transformed using the power function
            */

          }, {
            key: "_powTransform",
            value: function _powTransform(value) {
              return (Math.pow(this.options.nonLinearBase, value) - 1) / (this.options.nonLinearBase - 1);
            }
            /**
             * Sets the position of the selected handle and fill bar.
             * @function
             * @private
             * @param {jQuery} $hndl - the selected handle to move.
             * @param {Number} location - floating point between the start and end values of the slider bar.
             * @param {Function} cb - callback function to fire on completion.
             * @fires Slider#moved
             * @fires Slider#changed
             */

          }, {
            key: "_setHandlePos",
            value: function _setHandlePos($hndl, location, noInvert, cb) {
              // don't move if the slider has been disabled since its initialization
              if (this.$element.hasClass(this.options.disabledClass)) {
                return;
              } //might need to alter that slightly for bars that will have odd number selections.


              location = parseFloat(location); //on input change events, convert string to number...grumble.
              // prevent slider from running out of bounds, if value exceeds the limits set through options, override the value to min/max

              if (location < this.options.start) {
                location = this.options.start;
              } else if (location > this.options.end) {
                location = this.options.end;
              }

              var isDbl = this.options.doubleSided; //this is for single-handled vertical sliders, it adjusts the value to account for the slider being "upside-down"
              //for click and drag events, it's weird due to the scale(-1, 1) css property

              if (this.options.vertical && !noInvert) {
                location = this.options.end - location;
              }

              if (isDbl) {
                //this block is to prevent 2 handles from crossing eachother. Could/should be improved.
                if (this.handles.index($hndl) === 0) {
                  var h2Val = parseFloat(this.$handle2.attr('aria-valuenow'));
                  location = location >= h2Val ? h2Val - this.options.step : location;
                } else {
                  var h1Val = parseFloat(this.$handle.attr('aria-valuenow'));
                  location = location <= h1Val ? h1Val + this.options.step : location;
                }
              }

              var _this = this,
                  vert = this.options.vertical,
                  hOrW = vert ? 'height' : 'width',
                  lOrT = vert ? 'top' : 'left',
                  handleDim = $hndl[0].getBoundingClientRect()[hOrW],
                  elemDim = this.$element[0].getBoundingClientRect()[hOrW],
                  //percentage of bar min/max value based on click or drag point
              pctOfBar = this._pctOfBar(location),
                  //number of actual pixels to shift the handle, based on the percentage obtained above
              pxToMove = (elemDim - handleDim) * pctOfBar,
                  //percentage of bar to shift the handle
              movement = (percent(pxToMove, elemDim) * 100).toFixed(this.options.decimal); //fixing the decimal value for the location number, is passed to other methods as a fixed floating-point value


              location = parseFloat(location.toFixed(this.options.decimal)); // declare empty object for css adjustments, only used with 2 handled-sliders

              var css = {};

              this._setValues($hndl, location); // TODO update to calculate based on values set to respective inputs??


              if (isDbl) {
                var isLeftHndl = this.handles.index($hndl) === 0,
                    //empty variable, will be used for min-height/width for fill bar
                dim,
                    //percentage w/h of the handle compared to the slider bar
                handlePct = ~~(percent(handleDim, elemDim) * 100); //if left handle, the math is slightly different than if it's the right handle, and the left/top property needs to be changed for the fill bar

                if (isLeftHndl) {
                  //left or top percentage value to apply to the fill bar.
                  css[lOrT] = "".concat(movement, "%"); //calculate the new min-height/width for the fill bar.

                  dim = parseFloat(this.$handle2[0].style[lOrT]) - movement + handlePct; //this callback is necessary to prevent errors and allow the proper placement and initialization of a 2-handled slider
                  //plus, it means we don't care if 'dim' isNaN on init, it won't be in the future.

                  if (cb && typeof cb === 'function') {
                    cb();
                  } //this is only needed for the initialization of 2 handled sliders

                } else {
                  //just caching the value of the left/bottom handle's left/top property
                  var handlePos = parseFloat(this.$handle[0].style[lOrT]); //calculate the new min-height/width for the fill bar. Use isNaN to prevent false positives for numbers <= 0
                  //based on the percentage of movement of the handle being manipulated, less the opposing handle's left/top position, plus the percentage w/h of the handle itself

                  dim = movement - (isNaN(handlePos) ? (this.options.initialStart - this.options.start) / ((this.options.end - this.options.start) / 100) : handlePos) + handlePct;
                } // assign the min-height/width to our css object


                css["min-".concat(hOrW)] = "".concat(dim, "%");
              }

              this.$element.one('finished.zf.animate', function () {
                /**
                 * Fires when the handle is done moving.
                 * @event Slider#moved
                 */
                _this.$element.trigger('moved.zf.slider', [$hndl]);
              }); //because we don't know exactly how the handle will be moved, check the amount of time it should take to move.

              var moveTime = this.$element.data('dragging') ? 1000 / 60 : this.options.moveTime;
              Object(_foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__["Move"])(moveTime, $hndl, function () {
                // adjusting the left/top property of the handle, based on the percentage calculated above
                // if movement isNaN, that is because the slider is hidden and we cannot determine handle width,
                // fall back to next best guess.
                if (isNaN(movement)) {
                  $hndl.css(lOrT, "".concat(pctOfBar * 100, "%"));
                } else {
                  $hndl.css(lOrT, "".concat(movement, "%"));
                }

                if (!_this.options.doubleSided) {
                  //if single-handled, a simple method to expand the fill bar
                  _this.$fill.css(hOrW, "".concat(pctOfBar * 100, "%"));
                } else {
                  //otherwise, use the css object we created above
                  _this.$fill.css(css);
                }
              });
              /**
               * Fires when the value has not been change for a given time.
               * @event Slider#changed
               */

              clearTimeout(_this.timeout);
              _this.timeout = setTimeout(function () {
                _this.$element.trigger('changed.zf.slider', [$hndl]);
              }, _this.options.changedDelay);
            }
            /**
             * Sets the initial attribute for the slider element.
             * @function
             * @private
             * @param {Number} idx - index of the current handle/input to use.
             */

          }, {
            key: "_setInitAttr",
            value: function _setInitAttr(idx) {
              var initVal = idx === 0 ? this.options.initialStart : this.options.initialEnd;
              var id = this.inputs.eq(idx).attr('id') || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["GetYoDigits"])(6, 'slider');
              this.inputs.eq(idx).attr({
                'id': id,
                'max': this.options.end,
                'min': this.options.start,
                'step': this.options.step
              });
              this.inputs.eq(idx).val(initVal);
              this.handles.eq(idx).attr({
                'role': 'slider',
                'aria-controls': id,
                'aria-valuemax': this.options.end,
                'aria-valuemin': this.options.start,
                'aria-valuenow': initVal,
                'aria-orientation': this.options.vertical ? 'vertical' : 'horizontal',
                'tabindex': 0
              });
            }
            /**
             * Sets the input and `aria-valuenow` values for the slider element.
             * @function
             * @private
             * @param {jQuery} $handle - the currently selected handle.
             * @param {Number} val - floating point of the new value.
             */

          }, {
            key: "_setValues",
            value: function _setValues($handle, val) {
              var idx = this.options.doubleSided ? this.handles.index($handle) : 0;
              this.inputs.eq(idx).val(val);
              $handle.attr('aria-valuenow', val);
            }
            /**
             * Handles events on the slider element.
             * Calculates the new location of the current handle.
             * If there are two handles and the bar was clicked, it determines which handle to move.
             * @function
             * @private
             * @param {Object} e - the `event` object passed from the listener.
             * @param {jQuery} $handle - the current handle to calculate for, if selected.
             * @param {Number} val - floating point number for the new value of the slider.
             * TODO clean this up, there's a lot of repeated code between this and the _setHandlePos fn.
             */

          }, {
            key: "_handleEvent",
            value: function _handleEvent(e, $handle, val) {
              var value, hasVal;

              if (!val) {
                //click or drag events
                e.preventDefault();

                var _this = this,
                    vertical = this.options.vertical,
                    param = vertical ? 'height' : 'width',
                    direction = vertical ? 'top' : 'left',
                    eventOffset = vertical ? e.pageY : e.pageX,
                    halfOfHandle = this.$handle[0].getBoundingClientRect()[param] / 2,
                    barDim = this.$element[0].getBoundingClientRect()[param],
                    windowScroll = vertical ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scrollTop() : jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scrollLeft();

                var elemOffset = this.$element.offset()[direction]; // touch events emulated by the touch util give position relative to screen, add window.scroll to event coordinates...
                // best way to guess this is simulated is if clientY == pageY

                if (e.clientY === e.pageY) {
                  eventOffset = eventOffset + windowScroll;
                }

                var eventFromBar = eventOffset - elemOffset;
                var barXY;

                if (eventFromBar < 0) {
                  barXY = 0;
                } else if (eventFromBar > barDim) {
                  barXY = barDim;
                } else {
                  barXY = eventFromBar;
                }

                var offsetPct = percent(barXY, barDim);
                value = this._value(offsetPct); // turn everything around for RTL, yay math!

                if (Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["rtl"])() && !this.options.vertical) {
                  value = this.options.end - value;
                }

                value = _this._adjustValue(null, value); //boolean flag for the setHandlePos fn, specifically for vertical sliders

                hasVal = false;

                if (!$handle) {
                  //figure out which handle it is, pass it to the next function.
                  var firstHndlPos = absPosition(this.$handle, direction, barXY, param),
                      secndHndlPos = absPosition(this.$handle2, direction, barXY, param);
                  $handle = firstHndlPos <= secndHndlPos ? this.$handle : this.$handle2;
                }
              } else {
                //change event on input
                value = this._adjustValue(null, val);
                hasVal = true;
              }

              this._setHandlePos($handle, value, hasVal);
            }
            /**
             * Adjustes value for handle in regard to step value. returns adjusted value
             * @function
             * @private
             * @param {jQuery} $handle - the selected handle.
             * @param {Number} value - value to adjust. used if $handle is falsy
             */

          }, {
            key: "_adjustValue",
            value: function _adjustValue($handle, value) {
              var val,
                  step = this.options.step,
                  div = parseFloat(step / 2),
                  left,
                  prev_val,
                  next_val;

              if (!!$handle) {
                val = parseFloat($handle.attr('aria-valuenow'));
              } else {
                val = value;
              }

              if (val >= 0) {
                left = val % step;
              } else {
                left = step + val % step;
              }

              prev_val = val - left;
              next_val = prev_val + step;

              if (left === 0) {
                return val;
              }

              val = val >= prev_val + div ? next_val : prev_val;
              return val;
            }
            /**
             * Adds event listeners to the slider elements.
             * @function
             * @private
             */

          }, {
            key: "_events",
            value: function _events() {
              this._eventsForHandle(this.$handle);

              if (this.handles[1]) {
                this._eventsForHandle(this.$handle2);
              }
            }
            /**
             * Adds event listeners a particular handle
             * @function
             * @private
             * @param {jQuery} $handle - the current handle to apply listeners to.
             */

          }, {
            key: "_eventsForHandle",
            value: function _eventsForHandle($handle) {
              var _this = this,
                  curHandle,
                  timer;

              var handleChangeEvent = function handleChangeEvent(e) {
                var idx = _this.inputs.index(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));

                _this._handleEvent(e, _this.handles.eq(idx), jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val());
              }; // IE only triggers the change event when the input loses focus which strictly follows the HTML specification
              // listen for the enter key and trigger a change
              // @see https://html.spec.whatwg.org/multipage/input.html#common-input-element-events


              this.inputs.off('keyup.zf.slider').on('keyup.zf.slider', function (e) {
                if (e.keyCode == 13) handleChangeEvent.call(this, e);
              });
              this.inputs.off('change.zf.slider').on('change.zf.slider', handleChangeEvent);

              if (this.options.clickSelect) {
                this.$element.off('click.zf.slider').on('click.zf.slider', function (e) {
                  if (_this.$element.data('dragging')) {
                    return false;
                  }

                  if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target).is('[data-slider-handle]')) {
                    if (_this.options.doubleSided) {
                      _this._handleEvent(e);
                    } else {
                      _this._handleEvent(e, _this.$handle);
                    }
                  }
                });
              }

              if (this.options.draggable) {
                this.handles.addTouch();
                var $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body');
                $handle.off('mousedown.zf.slider').on('mousedown.zf.slider', function (e) {
                  $handle.addClass('is-dragging');

                  _this.$fill.addClass('is-dragging'); //


                  _this.$element.data('dragging', true);

                  curHandle = jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.currentTarget);
                  $body.on('mousemove.zf.slider', function (e) {
                    e.preventDefault();

                    _this._handleEvent(e, curHandle);
                  }).on('mouseup.zf.slider', function (e) {
                    _this._handleEvent(e, curHandle);

                    $handle.removeClass('is-dragging');

                    _this.$fill.removeClass('is-dragging');

                    _this.$element.data('dragging', false);

                    $body.off('mousemove.zf.slider mouseup.zf.slider');
                  });
                }) // prevent events triggered by touch
                .on('selectstart.zf.slider touchmove.zf.slider', function (e) {
                  e.preventDefault();
                });
              }

              $handle.off('keydown.zf.slider').on('keydown.zf.slider', function (e) {
                var _$handle = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
                    idx = _this.options.doubleSided ? _this.handles.index(_$handle) : 0,
                    oldValue = parseFloat(_this.inputs.eq(idx).val()),
                    newValue; // handle keyboard event with keyboard util


                _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_1__["Keyboard"].handleKey(e, 'Slider', {
                  decrease: function decrease() {
                    newValue = oldValue - _this.options.step;
                  },
                  increase: function increase() {
                    newValue = oldValue + _this.options.step;
                  },
                  decrease_fast: function decrease_fast() {
                    newValue = oldValue - _this.options.step * 10;
                  },
                  increase_fast: function increase_fast() {
                    newValue = oldValue + _this.options.step * 10;
                  },
                  min: function min() {
                    newValue = _this.options.start;
                  },
                  max: function max() {
                    newValue = _this.options.end;
                  },
                  handled: function handled() {
                    // only set handle pos when event was handled specially
                    e.preventDefault();

                    _this._setHandlePos(_$handle, newValue, true);
                  }
                });
                /*if (newValue) { // if pressed key has special function, update value
                  e.preventDefault();
                  _this._setHandlePos(_$handle, newValue);
                }*/

              });
            }
            /**
             * Destroys the slider plugin.
             */

          }, {
            key: "_destroy",
            value: function _destroy() {
              this.handles.off('.zf.slider');
              this.inputs.off('.zf.slider');
              this.$element.off('.zf.slider');
              clearTimeout(this.timeout);
            }
          }]);

          return Slider;
        }(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_4__["Plugin"]);

        Slider.defaults = {
          /**
           * Minimum value for the slider scale.
           * @option
           * @type {number}
           * @default 0
           */
          start: 0,

          /**
           * Maximum value for the slider scale.
           * @option
           * @type {number}
           * @default 100
           */
          end: 100,

          /**
           * Minimum value change per change event.
           * @option
           * @type {number}
           * @default 1
           */
          step: 1,

          /**
           * Value at which the handle/input *(left handle/first input)* should be set to on initialization.
           * @option
           * @type {number}
           * @default 0
           */
          initialStart: 0,

          /**
           * Value at which the right handle/second input should be set to on initialization.
           * @option
           * @type {number}
           * @default 100
           */
          initialEnd: 100,

          /**
           * Allows the input to be located outside the container and visible. Set to by the JS
           * @option
           * @type {boolean}
           * @default false
           */
          binding: false,

          /**
           * Allows the user to click/tap on the slider bar to select a value.
           * @option
           * @type {boolean}
           * @default true
           */
          clickSelect: true,

          /**
           * Set to true and use the `vertical` class to change alignment to vertical.
           * @option
           * @type {boolean}
           * @default false
           */
          vertical: false,

          /**
           * Allows the user to drag the slider handle(s) to select a value.
           * @option
           * @type {boolean}
           * @default true
           */
          draggable: true,

          /**
           * Disables the slider and prevents event listeners from being applied. Double checked by JS with `disabledClass`.
           * @option
           * @type {boolean}
           * @default false
           */
          disabled: false,

          /**
           * Allows the use of two handles. Double checked by the JS. Changes some logic handling.
           * @option
           * @type {boolean}
           * @default false
           */
          doubleSided: false,

          /**
           * Potential future feature.
           */
          // steps: 100,

          /**
           * Number of decimal places the plugin should go to for floating point precision.
           * @option
           * @type {number}
           * @default 2
           */
          decimal: 2,

          /**
           * Time delay for dragged elements.
           */
          // dragDelay: 0,

          /**
           * Time, in ms, to animate the movement of a slider handle if user clicks/taps on the bar. Needs to be manually set if updating the transition time in the Sass settings.
           * @option
           * @type {number}
           * @default 200
           */
          moveTime: 200,
          //update this if changing the transition time in the sass

          /**
           * Class applied to disabled sliders.
           * @option
           * @type {string}
           * @default 'disabled'
           */
          disabledClass: 'disabled',

          /**
           * Will invert the default layout for a vertical<span data-tooltip title="who would do this???"> </span>slider.
           * @option
           * @type {boolean}
           * @default false
           */
          invertVertical: false,

          /**
           * Milliseconds before the `changed.zf-slider` event is triggered after value change.
           * @option
           * @type {number}
           * @default 500
           */
          changedDelay: 500,

          /**
          * Basevalue for non-linear sliders
          * @option
          * @type {number}
          * @default 5
          */
          nonLinearBase: 5,

          /**
          * Basevalue for non-linear sliders, possible values are: `'linear'`, `'pow'` & `'log'`. Pow and Log use the nonLinearBase setting.
          * @option
          * @type {string}
          * @default 'linear'
          */
          positionValueFunction: 'linear'
        };

        function percent(frac, num) {
          return frac / num;
        }

        function absPosition($handle, dir, clickPos, param) {
          return Math.abs($handle.position()[dir] + $handle[param]() / 2 - clickPos);
        }

        function baseLog(base, value) {
          return Math.log(value) / Math.log(base);
        }
        /***/

      },

      /***/
      "./js/foundation.smoothScroll.js":
      /*!***************************************!*\
        !*** ./js/foundation.smoothScroll.js ***!
        \***************************************/

      /*! exports provided: SmoothScroll */

      /***/
      function jsFoundationSmoothScrollJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "SmoothScroll", function () {
          return SmoothScroll;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");
        /* harmony import */


        var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./foundation.core.plugin */
        "./js/foundation.core.plugin.js");

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        }
        /**
         * SmoothScroll module.
         * @module foundation.smooth-scroll
         */


        var SmoothScroll =
        /*#__PURE__*/
        function (_Plugin) {
          _inherits(SmoothScroll, _Plugin);

          function SmoothScroll() {
            _classCallCheck(this, SmoothScroll);

            return _possibleConstructorReturn(this, _getPrototypeOf(SmoothScroll).apply(this, arguments));
          }

          _createClass(SmoothScroll, [{
            key: "_setup",

            /**
             * Creates a new instance of SmoothScroll.
             * @class
             * @name SmoothScroll
             * @fires SmoothScroll#init
             * @param {Object} element - jQuery object to add the trigger to.
             * @param {Object} options - Overrides to the default plugin settings.
             */
            value: function _setup(element, options) {
              this.$element = element;
              this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, SmoothScroll.defaults, this.$element.data(), options);
              this.className = 'SmoothScroll'; // ie9 back compat

              this._init();
            }
            /**
             * Initialize the SmoothScroll plugin
             * @private
             */

          }, {
            key: "_init",
            value: function _init() {
              var id = this.$element[0].id || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__["GetYoDigits"])(6, 'smooth-scroll');
              this.$element.attr({
                id: id
              });

              this._events();
            }
            /**
             * Initializes events for SmoothScroll.
             * @private
             */

          }, {
            key: "_events",
            value: function _events() {
              this.$element.on('click.zf.smoothScroll', this._handleLinkClick);
              this.$element.on('click.zf.smoothScroll', 'a[href^="#"]', this._handleLinkClick);
            }
            /**
             * Handle the given event to smoothly scroll to the anchor pointed by the event target.
             * @param {*} e - event
             * @function
             * @private
             */

          }, {
            key: "_handleLinkClick",
            value: function _handleLinkClick(e) {
              var _this = this; // Follow the link if it does not point to an anchor.


              if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.currentTarget).is('a[href^="#"]')) return;
              var arrival = e.currentTarget.getAttribute('href');
              this._inTransition = true;
              SmoothScroll.scrollToLoc(arrival, this.options, function () {
                _this._inTransition = false;
              });
              e.preventDefault();
            }
          }, {
            key: "_destroy",

            /**
             * Destroys the SmoothScroll instance.
             * @function
             */
            value: function _destroy() {
              this.$element.off('click.zf.smoothScroll', this._handleLinkClick);
              this.$element.off('click.zf.smoothScroll', 'a[href^="#"]', this._handleLinkClick);
            }
          }], [{
            key: "scrollToLoc",

            /**
             * Function to scroll to a given location on the page.
             * @param {String} loc - A properly formatted jQuery id selector. Example: '#foo'
             * @param {Object} options - The options to use.
             * @param {Function} callback - The callback function.
             * @static
             * @function
             */
            value: function scrollToLoc(loc) {
              var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SmoothScroll.defaults;
              var callback = arguments.length > 2 ? arguments[2] : undefined;
              var $loc = jquery__WEBPACK_IMPORTED_MODULE_0___default()(loc); // Do nothing if target does not exist to prevent errors

              if (!$loc.length) return false;
              var scrollPos = Math.round($loc.offset().top - options.threshold / 2 - options.offset);
              jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').stop(true).animate({
                scrollTop: scrollPos
              }, options.animationDuration, options.animationEasing, function () {
                if (typeof callback === 'function') {
                  callback();
                }
              });
            }
          }]);

          return SmoothScroll;
        }(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_2__["Plugin"]);
        /**
         * Default settings for plugin.
         */


        SmoothScroll.defaults = {
          /**
           * Amount of time, in ms, the animated scrolling should take between locations.
           * @option
           * @type {number}
           * @default 500
           */
          animationDuration: 500,

          /**
           * Animation style to use when scrolling between locations. Can be `'swing'` or `'linear'`.
           * @option
           * @type {string}
           * @default 'linear'
           * @see {@link https://api.jquery.com/animate|Jquery animate}
           */
          animationEasing: 'linear',

          /**
           * Number of pixels to use as a marker for location changes.
           * @option
           * @type {number}
           * @default 50
           */
          threshold: 50,

          /**
           * Number of pixels to offset the scroll of the page on item click if using a sticky nav bar.
           * @option
           * @type {number}
           * @default 0
           */
          offset: 0
        };
        /***/
      },

      /***/
      "./js/foundation.sticky.js":
      /*!*********************************!*\
        !*** ./js/foundation.sticky.js ***!
        \*********************************/

      /*! exports provided: Sticky */

      /***/
      function jsFoundationStickyJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Sticky", function () {
          return Sticky;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");
        /* harmony import */


        var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./foundation.util.mediaQuery */
        "./js/foundation.util.mediaQuery.js");
        /* harmony import */


        var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ./foundation.core.plugin */
        "./js/foundation.core.plugin.js");
        /* harmony import */


        var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
        /*! ./foundation.util.triggers */
        "./js/foundation.util.triggers.js");

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        }
        /**
         * Sticky module.
         * @module foundation.sticky
         * @requires foundation.util.triggers
         * @requires foundation.util.mediaQuery
         */


        var Sticky =
        /*#__PURE__*/
        function (_Plugin) {
          _inherits(Sticky, _Plugin);

          function Sticky() {
            _classCallCheck(this, Sticky);

            return _possibleConstructorReturn(this, _getPrototypeOf(Sticky).apply(this, arguments));
          }

          _createClass(Sticky, [{
            key: "_setup",

            /**
             * Creates a new instance of a sticky thing.
             * @class
             * @name Sticky
             * @param {jQuery} element - jQuery object to make sticky.
             * @param {Object} options - options object passed when creating the element programmatically.
             */
            value: function _setup(element, options) {
              this.$element = element;
              this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, Sticky.defaults, this.$element.data(), options);
              this.className = 'Sticky'; // ie9 back compat
              // Triggers init is idempotent, just need to make sure it is initialized

              _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__["Triggers"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);

              this._init();
            }
            /**
             * Initializes the sticky element by adding classes, getting/setting dimensions, breakpoints and attributes
             * @function
             * @private
             */

          }, {
            key: "_init",
            value: function _init() {
              _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_2__["MediaQuery"]._init();

              var $parent = this.$element.parent('[data-sticky-container]'),
                  id = this.$element[0].id || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__["GetYoDigits"])(6, 'sticky'),
                  _this = this;

              if ($parent.length) {
                this.$container = $parent;
              } else {
                this.wasWrapped = true;
                this.$element.wrap(this.options.container);
                this.$container = this.$element.parent();
              }

              this.$container.addClass(this.options.containerClass);
              this.$element.addClass(this.options.stickyClass).attr({
                'data-resize': id,
                'data-mutate': id
              });

              if (this.options.anchor !== '') {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + _this.options.anchor).attr({
                  'data-mutate': id
                });
              }

              this.scrollCount = this.options.checkEvery;
              this.isStuck = false;
              this.onLoadListener = Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__["onLoad"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window), function () {
                //We calculate the container height to have correct values for anchor points offset calculation.
                _this.containerHeight = _this.$element.css("display") == "none" ? 0 : _this.$element[0].getBoundingClientRect().height;

                _this.$container.css('height', _this.containerHeight);

                _this.elemHeight = _this.containerHeight;

                if (_this.options.anchor !== '') {
                  _this.$anchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#' + _this.options.anchor);
                } else {
                  _this._parsePoints();
                }

                _this._setSizes(function () {
                  var scroll = window.pageYOffset;

                  _this._calc(false, scroll); //Unstick the element will ensure that proper classes are set.


                  if (!_this.isStuck) {
                    _this._removeSticky(scroll >= _this.topPoint ? false : true);
                  }
                });

                _this._events(id.split('-').reverse().join('-'));
              });
            }
            /**
             * If using multiple elements as anchors, calculates the top and bottom pixel values the sticky thing should stick and unstick on.
             * @function
             * @private
             */

          }, {
            key: "_parsePoints",
            value: function _parsePoints() {
              var top = this.options.topAnchor == "" ? 1 : this.options.topAnchor,
                  btm = this.options.btmAnchor == "" ? document.documentElement.scrollHeight : this.options.btmAnchor,
                  pts = [top, btm],
                  breaks = {};

              for (var i = 0, len = pts.length; i < len && pts[i]; i++) {
                var pt;

                if (typeof pts[i] === 'number') {
                  pt = pts[i];
                } else {
                  var place = pts[i].split(':'),
                      anchor = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(place[0]));
                  pt = anchor.offset().top;

                  if (place[1] && place[1].toLowerCase() === 'bottom') {
                    pt += anchor[0].getBoundingClientRect().height;
                  }
                }

                breaks[i] = pt;
              }

              this.points = breaks;
              return;
            }
            /**
             * Adds event handlers for the scrolling element.
             * @private
             * @param {String} id - pseudo-random id for unique scroll event listener.
             */

          }, {
            key: "_events",
            value: function _events(id) {
              var _this = this,
                  scrollListener = this.scrollListener = "scroll.zf.".concat(id);

              if (this.isOn) {
                return;
              }

              if (this.canStick) {
                this.isOn = true;
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(scrollListener).on(scrollListener, function (e) {
                  if (_this.scrollCount === 0) {
                    _this.scrollCount = _this.options.checkEvery;

                    _this._setSizes(function () {
                      _this._calc(false, window.pageYOffset);
                    });
                  } else {
                    _this.scrollCount--;

                    _this._calc(false, window.pageYOffset);
                  }
                });
              }

              this.$element.off('resizeme.zf.trigger').on('resizeme.zf.trigger', function (e, el) {
                _this._eventsHandler(id);
              });
              this.$element.on('mutateme.zf.trigger', function (e, el) {
                _this._eventsHandler(id);
              });

              if (this.$anchor) {
                this.$anchor.on('mutateme.zf.trigger', function (e, el) {
                  _this._eventsHandler(id);
                });
              }
            }
            /**
             * Handler for events.
             * @private
             * @param {String} id - pseudo-random id for unique scroll event listener.
             */

          }, {
            key: "_eventsHandler",
            value: function _eventsHandler(id) {
              var _this = this,
                  scrollListener = this.scrollListener = "scroll.zf.".concat(id);

              _this._setSizes(function () {
                _this._calc(false);

                if (_this.canStick) {
                  if (!_this.isOn) {
                    _this._events(id);
                  }
                } else if (_this.isOn) {
                  _this._pauseListeners(scrollListener);
                }
              });
            }
            /**
             * Removes event handlers for scroll and change events on anchor.
             * @fires Sticky#pause
             * @param {String} scrollListener - unique, namespaced scroll listener attached to `window`
             */

          }, {
            key: "_pauseListeners",
            value: function _pauseListeners(scrollListener) {
              this.isOn = false;
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(scrollListener);
              /**
               * Fires when the plugin is paused due to resize event shrinking the view.
               * @event Sticky#pause
               * @private
               */

              this.$element.trigger('pause.zf.sticky');
            }
            /**
             * Called on every `scroll` event and on `_init`
             * fires functions based on booleans and cached values
             * @param {Boolean} checkSizes - true if plugin should recalculate sizes and breakpoints.
             * @param {Number} scroll - current scroll position passed from scroll event cb function. If not passed, defaults to `window.pageYOffset`.
             */

          }, {
            key: "_calc",
            value: function _calc(checkSizes, scroll) {
              if (checkSizes) {
                this._setSizes();
              }

              if (!this.canStick) {
                if (this.isStuck) {
                  this._removeSticky(true);
                }

                return false;
              }

              if (!scroll) {
                scroll = window.pageYOffset;
              }

              if (scroll >= this.topPoint) {
                if (scroll <= this.bottomPoint) {
                  if (!this.isStuck) {
                    this._setSticky();
                  }
                } else {
                  if (this.isStuck) {
                    this._removeSticky(false);
                  }
                }
              } else {
                if (this.isStuck) {
                  this._removeSticky(true);
                }
              }
            }
            /**
             * Causes the $element to become stuck.
             * Adds `position: fixed;`, and helper classes.
             * @fires Sticky#stuckto
             * @function
             * @private
             */

          }, {
            key: "_setSticky",
            value: function _setSticky() {
              var _this = this,
                  stickTo = this.options.stickTo,
                  mrgn = stickTo === 'top' ? 'marginTop' : 'marginBottom',
                  notStuckTo = stickTo === 'top' ? 'bottom' : 'top',
                  css = {};

              css[mrgn] = "".concat(this.options[mrgn], "em");
              css[stickTo] = 0;
              css[notStuckTo] = 'auto';
              this.isStuck = true;
              this.$element.removeClass("is-anchored is-at-".concat(notStuckTo)).addClass("is-stuck is-at-".concat(stickTo)).css(css)
              /**
               * Fires when the $element has become `position: fixed;`
               * Namespaced to `top` or `bottom`, e.g. `sticky.zf.stuckto:top`
               * @event Sticky#stuckto
               */
              .trigger("sticky.zf.stuckto:".concat(stickTo));
              this.$element.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function () {
                _this._setSizes();
              });
            }
            /**
             * Causes the $element to become unstuck.
             * Removes `position: fixed;`, and helper classes.
             * Adds other helper classes.
             * @param {Boolean} isTop - tells the function if the $element should anchor to the top or bottom of its $anchor element.
             * @fires Sticky#unstuckfrom
             * @private
             */

          }, {
            key: "_removeSticky",
            value: function _removeSticky(isTop) {
              var stickTo = this.options.stickTo,
                  stickToTop = stickTo === 'top',
                  css = {},
                  anchorPt = (this.points ? this.points[1] - this.points[0] : this.anchorHeight) - this.elemHeight,
                  mrgn = stickToTop ? 'marginTop' : 'marginBottom',
                  notStuckTo = stickToTop ? 'bottom' : 'top',
                  topOrBottom = isTop ? 'top' : 'bottom';
              css[mrgn] = 0;
              css['bottom'] = 'auto';

              if (isTop) {
                css['top'] = 0;
              } else {
                css['top'] = anchorPt;
              }

              this.isStuck = false;
              this.$element.removeClass("is-stuck is-at-".concat(stickTo)).addClass("is-anchored is-at-".concat(topOrBottom)).css(css)
              /**
               * Fires when the $element has become anchored.
               * Namespaced to `top` or `bottom`, e.g. `sticky.zf.unstuckfrom:bottom`
               * @event Sticky#unstuckfrom
               */
              .trigger("sticky.zf.unstuckfrom:".concat(topOrBottom));
            }
            /**
             * Sets the $element and $container sizes for plugin.
             * Calls `_setBreakPoints`.
             * @param {Function} cb - optional callback function to fire on completion of `_setBreakPoints`.
             * @private
             */

          }, {
            key: "_setSizes",
            value: function _setSizes(cb) {
              this.canStick = _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_2__["MediaQuery"].is(this.options.stickyOn);

              if (!this.canStick) {
                if (cb && typeof cb === 'function') {
                  cb();
                }
              }

              var _this = this,
                  newElemWidth = this.$container[0].getBoundingClientRect().width,
                  comp = window.getComputedStyle(this.$container[0]),
                  pdngl = parseInt(comp['padding-left'], 10),
                  pdngr = parseInt(comp['padding-right'], 10);

              if (this.$anchor && this.$anchor.length) {
                this.anchorHeight = this.$anchor[0].getBoundingClientRect().height;
              } else {
                this._parsePoints();
              }

              this.$element.css({
                'max-width': "".concat(newElemWidth - pdngl - pdngr, "px")
              });
              var newContainerHeight = this.$element[0].getBoundingClientRect().height || this.containerHeight;

              if (this.$element.css("display") == "none") {
                newContainerHeight = 0;
              }

              this.containerHeight = newContainerHeight;
              this.$container.css({
                height: newContainerHeight
              });
              this.elemHeight = newContainerHeight;

              if (!this.isStuck) {
                if (this.$element.hasClass('is-at-bottom')) {
                  var anchorPt = (this.points ? this.points[1] - this.$container.offset().top : this.anchorHeight) - this.elemHeight;
                  this.$element.css('top', anchorPt);
                }
              }

              this._setBreakPoints(newContainerHeight, function () {
                if (cb && typeof cb === 'function') {
                  cb();
                }
              });
            }
            /**
             * Sets the upper and lower breakpoints for the element to become sticky/unsticky.
             * @param {Number} elemHeight - px value for sticky.$element height, calculated by `_setSizes`.
             * @param {Function} cb - optional callback function to be called on completion.
             * @private
             */

          }, {
            key: "_setBreakPoints",
            value: function _setBreakPoints(elemHeight, cb) {
              if (!this.canStick) {
                if (cb && typeof cb === 'function') {
                  cb();
                } else {
                  return false;
                }
              }

              var mTop = emCalc(this.options.marginTop),
                  mBtm = emCalc(this.options.marginBottom),
                  topPoint = this.points ? this.points[0] : this.$anchor.offset().top,
                  bottomPoint = this.points ? this.points[1] : topPoint + this.anchorHeight,
                  // topPoint = this.$anchor.offset().top || this.points[0],
              // bottomPoint = topPoint + this.anchorHeight || this.points[1],
              winHeight = window.innerHeight;

              if (this.options.stickTo === 'top') {
                topPoint -= mTop;
                bottomPoint -= elemHeight + mTop;
              } else if (this.options.stickTo === 'bottom') {
                topPoint -= winHeight - (elemHeight + mBtm);
                bottomPoint -= winHeight - mBtm;
              } else {//this would be the stickTo: both option... tricky
              }

              this.topPoint = topPoint;
              this.bottomPoint = bottomPoint;

              if (cb && typeof cb === 'function') {
                cb();
              }
            }
            /**
             * Destroys the current sticky element.
             * Resets the element to the top position first.
             * Removes event listeners, JS-added css properties and classes, and unwraps the $element if the JS added the $container.
             * @function
             */

          }, {
            key: "_destroy",
            value: function _destroy() {
              this._removeSticky(true);

              this.$element.removeClass("".concat(this.options.stickyClass, " is-anchored is-at-top")).css({
                height: '',
                top: '',
                bottom: '',
                'max-width': ''
              }).off('resizeme.zf.trigger').off('mutateme.zf.trigger');

              if (this.$anchor && this.$anchor.length) {
                this.$anchor.off('change.zf.sticky');
              }

              if (this.scrollListener) jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(this.scrollListener);
              if (this.onLoadListener) jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(this.onLoadListener);

              if (this.wasWrapped) {
                this.$element.unwrap();
              } else {
                this.$container.removeClass(this.options.containerClass).css({
                  height: ''
                });
              }
            }
          }]);

          return Sticky;
        }(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_3__["Plugin"]);

        Sticky.defaults = {
          /**
           * Customizable container template. Add your own classes for styling and sizing.
           * @option
           * @type {string}
           * @default '&lt;div data-sticky-container&gt;&lt;/div&gt;'
           */
          container: '<div data-sticky-container></div>',

          /**
           * Location in the view the element sticks to. Can be `'top'` or `'bottom'`.
           * @option
           * @type {string}
           * @default 'top'
           */
          stickTo: 'top',

          /**
           * If anchored to a single element, the id of that element.
           * @option
           * @type {string}
           * @default ''
           */
          anchor: '',

          /**
           * If using more than one element as anchor points, the id of the top anchor.
           * @option
           * @type {string}
           * @default ''
           */
          topAnchor: '',

          /**
           * If using more than one element as anchor points, the id of the bottom anchor.
           * @option
           * @type {string}
           * @default ''
           */
          btmAnchor: '',

          /**
           * Margin, in `em`'s to apply to the top of the element when it becomes sticky.
           * @option
           * @type {number}
           * @default 1
           */
          marginTop: 1,

          /**
           * Margin, in `em`'s to apply to the bottom of the element when it becomes sticky.
           * @option
           * @type {number}
           * @default 1
           */
          marginBottom: 1,

          /**
           * Breakpoint string that is the minimum screen size an element should become sticky.
           * @option
           * @type {string}
           * @default 'medium'
           */
          stickyOn: 'medium',

          /**
           * Class applied to sticky element, and removed on destruction. Foundation defaults to `sticky`.
           * @option
           * @type {string}
           * @default 'sticky'
           */
          stickyClass: 'sticky',

          /**
           * Class applied to sticky container. Foundation defaults to `sticky-container`.
           * @option
           * @type {string}
           * @default 'sticky-container'
           */
          containerClass: 'sticky-container',

          /**
           * Number of scroll events between the plugin's recalculating sticky points. Setting it to `0` will cause it to recalc every scroll event, setting it to `-1` will prevent recalc on scroll.
           * @option
           * @type {number}
           * @default -1
           */
          checkEvery: -1
        };
        /**
         * Helper function to calculate em values
         * @param Number {em} - number of em's to calculate into pixels
         */

        function emCalc(em) {
          return parseInt(window.getComputedStyle(document.body, null).fontSize, 10) * em;
        }
        /***/

      },

      /***/
      "./js/foundation.tabs.js":
      /*!*******************************!*\
        !*** ./js/foundation.tabs.js ***!
        \*******************************/

      /*! exports provided: Tabs */

      /***/
      function jsFoundationTabsJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Tabs", function () {
          return Tabs;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");
        /* harmony import */


        var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./foundation.util.keyboard */
        "./js/foundation.util.keyboard.js");
        /* harmony import */


        var _foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ./foundation.util.imageLoader */
        "./js/foundation.util.imageLoader.js");
        /* harmony import */


        var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
        /*! ./foundation.core.plugin */
        "./js/foundation.core.plugin.js");

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        }
        /**
         * Tabs module.
         * @module foundation.tabs
         * @requires foundation.util.keyboard
         * @requires foundation.util.imageLoader if tabs contain images
         */


        var Tabs =
        /*#__PURE__*/
        function (_Plugin) {
          _inherits(Tabs, _Plugin);

          function Tabs() {
            _classCallCheck(this, Tabs);

            return _possibleConstructorReturn(this, _getPrototypeOf(Tabs).apply(this, arguments));
          }

          _createClass(Tabs, [{
            key: "_setup",

            /**
             * Creates a new instance of tabs.
             * @class
             * @name Tabs
             * @fires Tabs#init
             * @param {jQuery} element - jQuery object to make into tabs.
             * @param {Object} options - Overrides to the default plugin settings.
             */
            value: function _setup(element, options) {
              this.$element = element;
              this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, Tabs.defaults, this.$element.data(), options);
              this.className = 'Tabs'; // ie9 back compat

              this._init();

              _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_2__["Keyboard"].register('Tabs', {
                'ENTER': 'open',
                'SPACE': 'open',
                'ARROW_RIGHT': 'next',
                'ARROW_UP': 'previous',
                'ARROW_DOWN': 'next',
                'ARROW_LEFT': 'previous' // 'TAB': 'next',
                // 'SHIFT_TAB': 'previous'

              });
            }
            /**
             * Initializes the tabs by showing and focusing (if autoFocus=true) the preset active tab.
             * @private
             */

          }, {
            key: "_init",
            value: function _init() {
              var _this2 = this;

              var _this = this;

              this._isInitializing = true;
              this.$element.attr({
                'role': 'tablist'
              });
              this.$tabTitles = this.$element.find(".".concat(this.options.linkClass));
              this.$tabContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-tabs-content=\"".concat(this.$element[0].id, "\"]"));
              this.$tabTitles.each(function () {
                var $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
                    $link = $elem.find('a'),
                    isActive = $elem.hasClass("".concat(_this.options.linkActiveClass)),
                    hash = $link.attr('data-tabs-target') || $link[0].hash.slice(1),
                    linkId = $link[0].id ? $link[0].id : "".concat(hash, "-label"),
                    $tabContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(hash));
                $elem.attr({
                  'role': 'presentation'
                });
                $link.attr({
                  'role': 'tab',
                  'aria-controls': hash,
                  'aria-selected': isActive,
                  'id': linkId,
                  'tabindex': isActive ? '0' : '-1'
                });
                $tabContent.attr({
                  'role': 'tabpanel',
                  'aria-labelledby': linkId
                }); // Save up the initial hash to return to it later when going back in history

                if (isActive) {
                  _this._initialAnchor = "#".concat(hash);
                }

                if (!isActive) {
                  $tabContent.attr('aria-hidden', 'true');
                }

                if (isActive && _this.options.autoFocus) {
                  _this.onLoadListener = Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__["onLoad"])(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window), function () {
                    jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').animate({
                      scrollTop: $elem.offset().top
                    }, _this.options.deepLinkSmudgeDelay, function () {
                      $link.focus();
                    });
                  });
                }
              });

              if (this.options.matchHeight) {
                var $images = this.$tabContent.find('img');

                if ($images.length) {
                  Object(_foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_3__["onImagesLoaded"])($images, this._setHeight.bind(this));
                } else {
                  this._setHeight();
                }
              } // Current context-bound function to open tabs on page load or history hashchange


              this._checkDeepLink = function () {
                var anchor = window.location.hash;

                if (!anchor.length) {
                  // If we are still initializing and there is no anchor, then there is nothing to do
                  if (_this2._isInitializing) return; // Otherwise, move to the initial anchor

                  if (_this2._initialAnchor) anchor = _this2._initialAnchor;
                }

                var $anchor = anchor && jquery__WEBPACK_IMPORTED_MODULE_0___default()(anchor);

                var $link = anchor && _this2.$element.find('[href$="' + anchor + '"]'); // Whether the anchor element that has been found is part of this element


                var isOwnAnchor = !!($anchor.length && $link.length); // If there is an anchor for the hash, select it

                if ($anchor && $anchor.length && $link && $link.length) {
                  _this2.selectTab($anchor, true);
                } // Otherwise, collapse everything
                else {
                    _this2._collapse();
                  }

                if (isOwnAnchor) {
                  // Roll up a little to show the titles
                  if (_this2.options.deepLinkSmudge) {
                    var offset = _this2.$element.offset();

                    jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').animate({
                      scrollTop: offset.top
                    }, _this2.options.deepLinkSmudgeDelay);
                  }
                  /**
                   * Fires when the plugin has deeplinked at pageload
                   * @event Tabs#deeplink
                   */


                  _this2.$element.trigger('deeplink.zf.tabs', [$link, $anchor]);
                }
              }; //use browser to open a tab, if it exists in this tabset


              if (this.options.deepLink) {
                this._checkDeepLink();
              }

              this._events();

              this._isInitializing = false;
            }
            /**
             * Adds event handlers for items within the tabs.
             * @private
             */

          }, {
            key: "_events",
            value: function _events() {
              this._addKeyHandler();

              this._addClickHandler();

              this._setHeightMqHandler = null;

              if (this.options.matchHeight) {
                this._setHeightMqHandler = this._setHeight.bind(this);
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('changed.zf.mediaquery', this._setHeightMqHandler);
              }

              if (this.options.deepLink) {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('hashchange', this._checkDeepLink);
              }
            }
            /**
             * Adds click handlers for items within the tabs.
             * @private
             */

          }, {
            key: "_addClickHandler",
            value: function _addClickHandler() {
              var _this = this;

              this.$element.off('click.zf.tabs').on('click.zf.tabs', ".".concat(this.options.linkClass), function (e) {
                e.preventDefault();
                e.stopPropagation();

                _this._handleTabChange(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
              });
            }
            /**
             * Adds keyboard event handlers for items within the tabs.
             * @private
             */

          }, {
            key: "_addKeyHandler",
            value: function _addKeyHandler() {
              var _this = this;

              this.$tabTitles.off('keydown.zf.tabs').on('keydown.zf.tabs', function (e) {
                if (e.which === 9) return;
                var $element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
                    $elements = $element.parent('ul').children('li'),
                    $prevElement,
                    $nextElement;
                $elements.each(function (i) {
                  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is($element)) {
                    if (_this.options.wrapOnKeys) {
                      $prevElement = i === 0 ? $elements.last() : $elements.eq(i - 1);
                      $nextElement = i === $elements.length - 1 ? $elements.first() : $elements.eq(i + 1);
                    } else {
                      $prevElement = $elements.eq(Math.max(0, i - 1));
                      $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1));
                    }

                    return;
                  }
                }); // handle keyboard event with keyboard util

                _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_2__["Keyboard"].handleKey(e, 'Tabs', {
                  open: function open() {
                    $element.find('[role="tab"]').focus();

                    _this._handleTabChange($element);
                  },
                  previous: function previous() {
                    $prevElement.find('[role="tab"]').focus();

                    _this._handleTabChange($prevElement);
                  },
                  next: function next() {
                    $nextElement.find('[role="tab"]').focus();

                    _this._handleTabChange($nextElement);
                  },
                  handled: function handled() {
                    e.stopPropagation();
                    e.preventDefault();
                  }
                });
              });
            }
            /**
             * Opens the tab `$targetContent` defined by `$target`. Collapses active tab.
             * @param {jQuery} $target - Tab to open.
             * @param {boolean} historyHandled - browser has already handled a history update
             * @fires Tabs#change
             * @function
             */

          }, {
            key: "_handleTabChange",
            value: function _handleTabChange($target, historyHandled) {
              // With `activeCollapse`, if the target is the active Tab, collapse it.
              if ($target.hasClass("".concat(this.options.linkActiveClass))) {
                if (this.options.activeCollapse) {
                  this._collapse();
                }

                return;
              }

              var $oldTab = this.$element.find(".".concat(this.options.linkClass, ".").concat(this.options.linkActiveClass)),
                  $tabLink = $target.find('[role="tab"]'),
                  target = $tabLink.attr('data-tabs-target'),
                  anchor = target && target.length ? "#".concat(target) : $tabLink[0].hash,
                  $targetContent = this.$tabContent.find(anchor); //close old tab

              this._collapseTab($oldTab); //open new tab


              this._openTab($target); //either replace or update browser history


              if (this.options.deepLink && !historyHandled) {
                if (this.options.updateHistory) {
                  history.pushState({}, '', anchor);
                } else {
                  history.replaceState({}, '', anchor);
                }
              }
              /**
               * Fires when the plugin has successfully changed tabs.
               * @event Tabs#change
               */


              this.$element.trigger('change.zf.tabs', [$target, $targetContent]); //fire to children a mutation event

              $targetContent.find("[data-mutate]").trigger("mutateme.zf.trigger");
            }
            /**
             * Opens the tab `$targetContent` defined by `$target`.
             * @param {jQuery} $target - Tab to open.
             * @function
             */

          }, {
            key: "_openTab",
            value: function _openTab($target) {
              var $tabLink = $target.find('[role="tab"]'),
                  hash = $tabLink.attr('data-tabs-target') || $tabLink[0].hash.slice(1),
                  $targetContent = this.$tabContent.find("#".concat(hash));
              $target.addClass("".concat(this.options.linkActiveClass));
              $tabLink.attr({
                'aria-selected': 'true',
                'tabindex': '0'
              });
              $targetContent.addClass("".concat(this.options.panelActiveClass)).removeAttr('aria-hidden');
            }
            /**
             * Collapses `$targetContent` defined by `$target`.
             * @param {jQuery} $target - Tab to collapse.
             * @function
             */

          }, {
            key: "_collapseTab",
            value: function _collapseTab($target) {
              var $target_anchor = $target.removeClass("".concat(this.options.linkActiveClass)).find('[role="tab"]').attr({
                'aria-selected': 'false',
                'tabindex': -1
              });
              jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat($target_anchor.attr('aria-controls'))).removeClass("".concat(this.options.panelActiveClass)).attr({
                'aria-hidden': 'true'
              });
            }
            /**
             * Collapses the active Tab.
             * @fires Tabs#collapse
             * @function
             */

          }, {
            key: "_collapse",
            value: function _collapse() {
              var $activeTab = this.$element.find(".".concat(this.options.linkClass, ".").concat(this.options.linkActiveClass));

              if ($activeTab.length) {
                this._collapseTab($activeTab);
                /**
                * Fires when the plugin has successfully collapsed tabs.
                * @event Tabs#collapse
                */


                this.$element.trigger('collapse.zf.tabs', [$activeTab]);
              }
            }
            /**
             * Public method for selecting a content pane to display.
             * @param {jQuery | String} elem - jQuery object or string of the id of the pane to display.
             * @param {boolean} historyHandled - browser has already handled a history update
             * @function
             */

          }, {
            key: "selectTab",
            value: function selectTab(elem, historyHandled) {
              var idStr;

              if (_typeof(elem) === 'object') {
                idStr = elem[0].id;
              } else {
                idStr = elem;
              }

              if (idStr.indexOf('#') < 0) {
                idStr = "#".concat(idStr);
              }

              var $target = this.$tabTitles.has("[href$=\"".concat(idStr, "\"]"));

              this._handleTabChange($target, historyHandled);
            }
          }, {
            key: "_setHeight",

            /**
             * Sets the height of each panel to the height of the tallest panel.
             * If enabled in options, gets called on media query change.
             * If loading content via external source, can be called directly or with _reflow.
             * If enabled with `data-match-height="true"`, tabs sets to equal height
             * @function
             * @private
             */
            value: function _setHeight() {
              var max = 0,
                  _this = this; // Lock down the `this` value for the root tabs object


              this.$tabContent.find(".".concat(this.options.panelClass)).css('height', '').each(function () {
                var panel = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
                    isActive = panel.hasClass("".concat(_this.options.panelActiveClass)); // get the options from the parent instead of trying to get them from the child

                if (!isActive) {
                  panel.css({
                    'visibility': 'hidden',
                    'display': 'block'
                  });
                }

                var temp = this.getBoundingClientRect().height;

                if (!isActive) {
                  panel.css({
                    'visibility': '',
                    'display': ''
                  });
                }

                max = temp > max ? temp : max;
              }).css('height', "".concat(max, "px"));
            }
            /**
             * Destroys an instance of tabs.
             * @fires Tabs#destroyed
             */

          }, {
            key: "_destroy",
            value: function _destroy() {
              this.$element.find(".".concat(this.options.linkClass)).off('.zf.tabs').hide().end().find(".".concat(this.options.panelClass)).hide();

              if (this.options.matchHeight) {
                if (this._setHeightMqHandler != null) {
                  jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('changed.zf.mediaquery', this._setHeightMqHandler);
                }
              }

              if (this.options.deepLink) {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('hashchange', this._checkDeepLink);
              }

              if (this.onLoadListener) {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(this.onLoadListener);
              }
            }
          }]);

          return Tabs;
        }(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_4__["Plugin"]);

        Tabs.defaults = {
          /**
           * Link the location hash to the active pane.
           * Set the location hash when the active pane changes, and open the corresponding pane when the location changes.
           * @option
           * @type {boolean}
           * @default false
           */
          deepLink: false,

          /**
           * If `deepLink` is enabled, adjust the deep link scroll to make sure the top of the tab panel is visible
           * @option
           * @type {boolean}
           * @default false
           */
          deepLinkSmudge: false,

          /**
           * If `deepLinkSmudge` is enabled, animation time (ms) for the deep link adjustment
           * @option
           * @type {number}
           * @default 300
           */
          deepLinkSmudgeDelay: 300,

          /**
           * If `deepLink` is enabled, update the browser history with the open tab
           * @option
           * @type {boolean}
           * @default false
           */
          updateHistory: false,

          /**
           * Allows the window to scroll to content of active pane on load.
           * Not recommended if more than one tab panel per page.
           * @option
           * @type {boolean}
           * @default false
           */
          autoFocus: false,

          /**
           * Allows keyboard input to 'wrap' around the tab links.
           * @option
           * @type {boolean}
           * @default true
           */
          wrapOnKeys: true,

          /**
           * Allows the tab content panes to match heights if set to true.
           * @option
           * @type {boolean}
           * @default false
           */
          matchHeight: false,

          /**
           * Allows active tabs to collapse when clicked.
           * @option
           * @type {boolean}
           * @default false
           */
          activeCollapse: false,

          /**
           * Class applied to `li`'s in tab link list.
           * @option
           * @type {string}
           * @default 'tabs-title'
           */
          linkClass: 'tabs-title',

          /**
           * Class applied to the active `li` in tab link list.
           * @option
           * @type {string}
           * @default 'is-active'
           */
          linkActiveClass: 'is-active',

          /**
           * Class applied to the content containers.
           * @option
           * @type {string}
           * @default 'tabs-panel'
           */
          panelClass: 'tabs-panel',

          /**
           * Class applied to the active content container.
           * @option
           * @type {string}
           * @default 'is-active'
           */
          panelActiveClass: 'is-active'
        };
        /***/
      },

      /***/
      "./js/foundation.toggler.js":
      /*!**********************************!*\
        !*** ./js/foundation.toggler.js ***!
        \**********************************/

      /*! exports provided: Toggler */

      /***/
      function jsFoundationTogglerJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Toggler", function () {
          return Toggler;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_util_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.util.motion */
        "./js/foundation.util.motion.js");
        /* harmony import */


        var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./foundation.core.plugin */
        "./js/foundation.core.plugin.js");
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");
        /* harmony import */


        var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
        /*! ./foundation.util.triggers */
        "./js/foundation.util.triggers.js");

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        }
        /**
         * Toggler module.
         * @module foundation.toggler
         * @requires foundation.util.motion
         * @requires foundation.util.triggers
         */


        var Toggler =
        /*#__PURE__*/
        function (_Plugin) {
          _inherits(Toggler, _Plugin);

          function Toggler() {
            _classCallCheck(this, Toggler);

            return _possibleConstructorReturn(this, _getPrototypeOf(Toggler).apply(this, arguments));
          }

          _createClass(Toggler, [{
            key: "_setup",

            /**
             * Creates a new instance of Toggler.
             * @class
             * @name Toggler
             * @fires Toggler#init
             * @param {Object} element - jQuery object to add the trigger to.
             * @param {Object} options - Overrides to the default plugin settings.
             */
            value: function _setup(element, options) {
              this.$element = element;
              this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, Toggler.defaults, element.data(), options);
              this.className = '';
              this.className = 'Toggler'; // ie9 back compat
              // Triggers init is idempotent, just need to make sure it is initialized

              _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_4__["Triggers"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);

              this._init();

              this._events();
            }
            /**
             * Initializes the Toggler plugin by parsing the toggle class from data-toggler, or animation classes from data-animate.
             * @function
             * @private
             */

          }, {
            key: "_init",
            value: function _init() {
              var input; // Parse animation classes if they were set

              if (this.options.animate) {
                input = this.options.animate.split(' ');
                this.animationIn = input[0];
                this.animationOut = input[1] || null;
              } // Otherwise, parse toggle class
              else {
                  input = this.$element.data('toggler'); // Allow for a . at the beginning of the string

                  this.className = input[0] === '.' ? input.slice(1) : input;
                } // Add ARIA attributes to triggers:


              var id = this.$element[0].id,
                  $triggers = jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-open~=\"".concat(id, "\"], [data-close~=\"").concat(id, "\"], [data-toggle~=\"").concat(id, "\"]")); // - aria-expanded: according to the element visibility.

              $triggers.attr('aria-expanded', !this.$element.is(':hidden')); // - aria-controls: adding the element id to it if not already in it.

              $triggers.each(function (index, trigger) {
                var $trigger = jquery__WEBPACK_IMPORTED_MODULE_0___default()(trigger);
                var controls = $trigger.attr('aria-controls') || '';
                var containsId = new RegExp("\\b".concat(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_3__["RegExpEscape"])(id), "\\b")).test(controls);
                if (!containsId) $trigger.attr('aria-controls', controls ? "".concat(controls, " ").concat(id) : id);
              });
            }
            /**
             * Initializes events for the toggle trigger.
             * @function
             * @private
             */

          }, {
            key: "_events",
            value: function _events() {
              this.$element.off('toggle.zf.trigger').on('toggle.zf.trigger', this.toggle.bind(this));
            }
            /**
             * Toggles the target class on the target element. An event is fired from the original trigger depending on if the resultant state was "on" or "off".
             * @function
             * @fires Toggler#on
             * @fires Toggler#off
             */

          }, {
            key: "toggle",
            value: function toggle() {
              this[this.options.animate ? '_toggleAnimate' : '_toggleClass']();
            }
          }, {
            key: "_toggleClass",
            value: function _toggleClass() {
              this.$element.toggleClass(this.className);
              var isOn = this.$element.hasClass(this.className);

              if (isOn) {
                /**
                 * Fires if the target element has the class after a toggle.
                 * @event Toggler#on
                 */
                this.$element.trigger('on.zf.toggler');
              } else {
                /**
                 * Fires if the target element does not have the class after a toggle.
                 * @event Toggler#off
                 */
                this.$element.trigger('off.zf.toggler');
              }

              this._updateARIA(isOn);

              this.$element.find('[data-mutate]').trigger('mutateme.zf.trigger');
            }
          }, {
            key: "_toggleAnimate",
            value: function _toggleAnimate() {
              var _this = this;

              if (this.$element.is(':hidden')) {
                _foundation_util_motion__WEBPACK_IMPORTED_MODULE_1__["Motion"].animateIn(this.$element, this.animationIn, function () {
                  _this._updateARIA(true);

                  this.trigger('on.zf.toggler');
                  this.find('[data-mutate]').trigger('mutateme.zf.trigger');
                });
              } else {
                _foundation_util_motion__WEBPACK_IMPORTED_MODULE_1__["Motion"].animateOut(this.$element, this.animationOut, function () {
                  _this._updateARIA(false);

                  this.trigger('off.zf.toggler');
                  this.find('[data-mutate]').trigger('mutateme.zf.trigger');
                });
              }
            }
          }, {
            key: "_updateARIA",
            value: function _updateARIA(isOn) {
              var id = this.$element[0].id;
              jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-open=\"".concat(id, "\"], [data-close=\"").concat(id, "\"], [data-toggle=\"").concat(id, "\"]")).attr({
                'aria-expanded': isOn ? true : false
              });
            }
            /**
             * Destroys the instance of Toggler on the element.
             * @function
             */

          }, {
            key: "_destroy",
            value: function _destroy() {
              this.$element.off('.zf.toggler');
            }
          }]);

          return Toggler;
        }(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_2__["Plugin"]);

        Toggler.defaults = {
          /**
           * Tells the plugin if the element should animated when toggled.
           * @option
           * @type {boolean}
           * @default false
           */
          animate: false
        };
        /***/
      },

      /***/
      "./js/foundation.tooltip.js":
      /*!**********************************!*\
        !*** ./js/foundation.tooltip.js ***!
        \**********************************/

      /*! exports provided: Tooltip */

      /***/
      function jsFoundationTooltipJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Tooltip", function () {
          return Tooltip;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");
        /* harmony import */


        var _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./foundation.util.mediaQuery */
        "./js/foundation.util.mediaQuery.js");
        /* harmony import */


        var _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ./foundation.util.triggers */
        "./js/foundation.util.triggers.js");
        /* harmony import */


        var _foundation_positionable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
        /*! ./foundation.positionable */
        "./js/foundation.positionable.js");

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _get(target, property, receiver) {
          if (typeof Reflect !== "undefined" && Reflect.get) {
            _get = Reflect.get;
          } else {
            _get = function _get(target, property, receiver) {
              var base = _superPropBase(target, property);

              if (!base) return;
              var desc = Object.getOwnPropertyDescriptor(base, property);

              if (desc.get) {
                return desc.get.call(receiver);
              }

              return desc.value;
            };
          }

          return _get(target, property, receiver || target);
        }

        function _superPropBase(object, property) {
          while (!Object.prototype.hasOwnProperty.call(object, property)) {
            object = _getPrototypeOf(object);
            if (object === null) break;
          }

          return object;
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        }
        /**
         * Tooltip module.
         * @module foundation.tooltip
         * @requires foundation.util.box
         * @requires foundation.util.mediaQuery
         * @requires foundation.util.triggers
         */


        var Tooltip =
        /*#__PURE__*/
        function (_Positionable) {
          _inherits(Tooltip, _Positionable);

          function Tooltip() {
            _classCallCheck(this, Tooltip);

            return _possibleConstructorReturn(this, _getPrototypeOf(Tooltip).apply(this, arguments));
          }

          _createClass(Tooltip, [{
            key: "_setup",

            /**
             * Creates a new instance of a Tooltip.
             * @class
             * @name Tooltip
             * @fires Tooltip#init
             * @param {jQuery} element - jQuery object to attach a tooltip to.
             * @param {Object} options - object to extend the default configuration.
             */
            value: function _setup(element, options) {
              this.$element = element;
              this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, Tooltip.defaults, this.$element.data(), options);
              this.className = 'Tooltip'; // ie9 back compat

              this.isActive = false;
              this.isClick = false; // Triggers init is idempotent, just need to make sure it is initialized

              _foundation_util_triggers__WEBPACK_IMPORTED_MODULE_3__["Triggers"].init(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);

              this._init();
            }
            /**
             * Initializes the tooltip by setting the creating the tip element, adding it's text, setting private variables and setting attributes on the anchor.
             * @private
             */

          }, {
            key: "_init",
            value: function _init() {
              _foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_2__["MediaQuery"]._init();

              var elemId = this.$element.attr('aria-describedby') || Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__["GetYoDigits"])(6, 'tooltip');
              this.options.tipText = this.options.tipText || this.$element.attr('title');
              this.template = this.options.template ? jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.options.template) : this._buildTemplate(elemId);

              if (this.options.allowHtml) {
                this.template.appendTo(document.body).html(this.options.tipText).hide();
              } else {
                this.template.appendTo(document.body).text(this.options.tipText).hide();
              }

              this.$element.attr({
                'title': '',
                'aria-describedby': elemId,
                'data-yeti-box': elemId,
                'data-toggle': elemId,
                'data-resize': elemId
              }).addClass(this.options.triggerClass);

              _get(_getPrototypeOf(Tooltip.prototype), "_init", this).call(this);

              this._events();
            }
          }, {
            key: "_getDefaultPosition",
            value: function _getDefaultPosition() {
              // handle legacy classnames
              var position = this.$element[0].className.match(/\b(top|left|right|bottom)\b/g);
              return position ? position[0] : 'top';
            }
          }, {
            key: "_getDefaultAlignment",
            value: function _getDefaultAlignment() {
              return 'center';
            }
          }, {
            key: "_getHOffset",
            value: function _getHOffset() {
              if (this.position === 'left' || this.position === 'right') {
                return this.options.hOffset + this.options.tooltipWidth;
              } else {
                return this.options.hOffset;
              }
            }
          }, {
            key: "_getVOffset",
            value: function _getVOffset() {
              if (this.position === 'top' || this.position === 'bottom') {
                return this.options.vOffset + this.options.tooltipHeight;
              } else {
                return this.options.vOffset;
              }
            }
            /**
             * builds the tooltip element, adds attributes, and returns the template.
             * @private
             */

          }, {
            key: "_buildTemplate",
            value: function _buildTemplate(id) {
              var templateClasses = "".concat(this.options.tooltipClass, " ").concat(this.options.templateClasses).trim();
              var $template = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div></div>').addClass(templateClasses).attr({
                'role': 'tooltip',
                'aria-hidden': true,
                'data-is-active': false,
                'data-is-focus': false,
                'id': id
              });
              return $template;
            }
            /**
             * sets the position class of an element and recursively calls itself until there are no more possible positions to attempt, or the tooltip element is no longer colliding.
             * if the tooltip is larger than the screen width, default to full width - any user selected margin
             * @private
             */

          }, {
            key: "_setPosition",
            value: function _setPosition() {
              _get(_getPrototypeOf(Tooltip.prototype), "_setPosition", this).call(this, this.$element, this.template);
            }
            /**
             * reveals the tooltip, and fires an event to close any other open tooltips on the page
             * @fires Tooltip#closeme
             * @fires Tooltip#show
             * @function
             */

          }, {
            key: "show",
            value: function show() {
              if (this.options.showOn !== 'all' && !_foundation_util_mediaQuery__WEBPACK_IMPORTED_MODULE_2__["MediaQuery"].is(this.options.showOn)) {
                // console.error('The screen is too small to display this tooltip');
                return false;
              }

              var _this = this;

              this.template.css('visibility', 'hidden').show();

              this._setPosition();

              this.template.removeClass('top bottom left right').addClass(this.position);
              this.template.removeClass('align-top align-bottom align-left align-right align-center').addClass('align-' + this.alignment);
              /**
               * Fires to close all other open tooltips on the page
               * @event Closeme#tooltip
               */

              this.$element.trigger('closeme.zf.tooltip', this.template.attr('id'));
              this.template.attr({
                'data-is-active': true,
                'aria-hidden': false
              });
              _this.isActive = true; // console.log(this.template);

              this.template.stop().hide().css('visibility', '').fadeIn(this.options.fadeInDuration, function () {//maybe do stuff?
              });
              /**
               * Fires when the tooltip is shown
               * @event Tooltip#show
               */

              this.$element.trigger('show.zf.tooltip');
            }
            /**
             * Hides the current tooltip, and resets the positioning class if it was changed due to collision
             * @fires Tooltip#hide
             * @function
             */

          }, {
            key: "hide",
            value: function hide() {
              // console.log('hiding', this.$element.data('yeti-box'));
              var _this = this;

              this.template.stop().attr({
                'aria-hidden': true,
                'data-is-active': false
              }).fadeOut(this.options.fadeOutDuration, function () {
                _this.isActive = false;
                _this.isClick = false;
              });
              /**
               * fires when the tooltip is hidden
               * @event Tooltip#hide
               */

              this.$element.trigger('hide.zf.tooltip');
            }
            /**
             * adds event listeners for the tooltip and its anchor
             * TODO combine some of the listeners like focus and mouseenter, etc.
             * @private
             */

          }, {
            key: "_events",
            value: function _events() {
              var _this = this;

              var $template = this.template;
              var isFocus = false;

              if (!this.options.disableHover) {
                this.$element.on('mouseenter.zf.tooltip', function (e) {
                  if (!_this.isActive) {
                    _this.timeout = setTimeout(function () {
                      _this.show();
                    }, _this.options.hoverDelay);
                  }
                }).on('mouseleave.zf.tooltip', function (e) {
                  clearTimeout(_this.timeout);

                  if (!isFocus || _this.isClick && !_this.options.clickOpen) {
                    _this.hide();
                  }
                });
              }

              if (this.options.clickOpen) {
                this.$element.on('mousedown.zf.tooltip', function (e) {
                  e.stopImmediatePropagation();

                  if (_this.isClick) {//_this.hide();
                    // _this.isClick = false;
                  } else {
                    _this.isClick = true;

                    if ((_this.options.disableHover || !_this.$element.attr('tabindex')) && !_this.isActive) {
                      _this.show();
                    }
                  }
                });
              } else {
                this.$element.on('mousedown.zf.tooltip', function (e) {
                  e.stopImmediatePropagation();
                  _this.isClick = true;
                });
              }

              if (!this.options.disableForTouch) {
                this.$element.on('tap.zf.tooltip touchend.zf.tooltip', function (e) {
                  _this.isActive ? _this.hide() : _this.show();
                });
              }

              this.$element.on({
                // 'toggle.zf.trigger': this.toggle.bind(this),
                // 'close.zf.trigger': this.hide.bind(this)
                'close.zf.trigger': this.hide.bind(this)
              });
              this.$element.on('focus.zf.tooltip', function (e) {
                isFocus = true;

                if (_this.isClick) {
                  // If we're not showing open on clicks, we need to pretend a click-launched focus isn't
                  // a real focus, otherwise on hover and come back we get bad behavior
                  if (!_this.options.clickOpen) {
                    isFocus = false;
                  }

                  return false;
                } else {
                  _this.show();
                }
              }).on('focusout.zf.tooltip', function (e) {
                isFocus = false;
                _this.isClick = false;

                _this.hide();
              }).on('resizeme.zf.trigger', function () {
                if (_this.isActive) {
                  _this._setPosition();
                }
              });
            }
            /**
             * adds a toggle method, in addition to the static show() & hide() functions
             * @function
             */

          }, {
            key: "toggle",
            value: function toggle() {
              if (this.isActive) {
                this.hide();
              } else {
                this.show();
              }
            }
            /**
             * Destroys an instance of tooltip, removes template element from the view.
             * @function
             */

          }, {
            key: "_destroy",
            value: function _destroy() {
              this.$element.attr('title', this.template.text()).off('.zf.trigger .zf.tooltip').removeClass(this.options.triggerClass).removeClass('top right left bottom').removeAttr('aria-describedby data-disable-hover data-resize data-toggle data-tooltip data-yeti-box');
              this.template.remove();
            }
          }]);

          return Tooltip;
        }(_foundation_positionable__WEBPACK_IMPORTED_MODULE_4__["Positionable"]);

        Tooltip.defaults = {
          disableForTouch: false,

          /**
           * Time, in ms, before a tooltip should open on hover.
           * @option
           * @type {number}
           * @default 200
           */
          hoverDelay: 200,

          /**
           * Time, in ms, a tooltip should take to fade into view.
           * @option
           * @type {number}
           * @default 150
           */
          fadeInDuration: 150,

          /**
           * Time, in ms, a tooltip should take to fade out of view.
           * @option
           * @type {number}
           * @default 150
           */
          fadeOutDuration: 150,

          /**
           * Disables hover events from opening the tooltip if set to true
           * @option
           * @type {boolean}
           * @default false
           */
          disableHover: false,

          /**
           * Optional addtional classes to apply to the tooltip template on init.
           * @option
           * @type {string}
           * @default ''
           */
          templateClasses: '',

          /**
           * Non-optional class added to tooltip templates. Foundation default is 'tooltip'.
           * @option
           * @type {string}
           * @default 'tooltip'
           */
          tooltipClass: 'tooltip',

          /**
           * Class applied to the tooltip anchor element.
           * @option
           * @type {string}
           * @default 'has-tip'
           */
          triggerClass: 'has-tip',

          /**
           * Minimum breakpoint size at which to open the tooltip.
           * @option
           * @type {string}
           * @default 'small'
           */
          showOn: 'small',

          /**
           * Custom template to be used to generate markup for tooltip.
           * @option
           * @type {string}
           * @default ''
           */
          template: '',

          /**
           * Text displayed in the tooltip template on open.
           * @option
           * @type {string}
           * @default ''
           */
          tipText: '',
          touchCloseText: 'Tap to close.',

          /**
           * Allows the tooltip to remain open if triggered with a click or touch event.
           * @option
           * @type {boolean}
           * @default true
           */
          clickOpen: true,

          /**
           * Position of tooltip. Can be left, right, bottom, top, or auto.
           * @option
           * @type {string}
           * @default 'auto'
           */
          position: 'auto',

          /**
           * Alignment of tooltip relative to anchor. Can be left, right, bottom, top, center, or auto.
           * @option
           * @type {string}
           * @default 'auto'
           */
          alignment: 'auto',

          /**
           * Allow overlap of container/window. If false, tooltip will first try to
           * position as defined by data-position and data-alignment, but reposition if
           * it would cause an overflow.  @option
           * @type {boolean}
           * @default false
           */
          allowOverlap: false,

          /**
           * Allow overlap of only the bottom of the container. This is the most common
           * behavior for dropdowns, allowing the dropdown to extend the bottom of the
           * screen but not otherwise influence or break out of the container.
           * Less common for tooltips.
           * @option
           * @type {boolean}
           * @default false
           */
          allowBottomOverlap: false,

          /**
           * Distance, in pixels, the template should push away from the anchor on the Y axis.
           * @option
           * @type {number}
           * @default 0
           */
          vOffset: 0,

          /**
           * Distance, in pixels, the template should push away from the anchor on the X axis
           * @option
           * @type {number}
           * @default 0
           */
          hOffset: 0,

          /**
           * Distance, in pixels, the template spacing auto-adjust for a vertical tooltip
           * @option
           * @type {number}
           * @default 14
           */
          tooltipHeight: 14,

          /**
           * Distance, in pixels, the template spacing auto-adjust for a horizontal tooltip
           * @option
           * @type {number}
           * @default 12
           */
          tooltipWidth: 12,

          /**
          * Allow HTML in tooltip. Warning: If you are loading user-generated content into tooltips,
          * allowing HTML may open yourself up to XSS attacks.
          * @option
          * @type {boolean}
          * @default false
          */
          allowHtml: false
        };
        /**
         * TODO utilize resize event trigger
         */

        /***/
      },

      /***/
      "./js/foundation.util.box.js":
      /*!***********************************!*\
        !*** ./js/foundation.util.box.js ***!
        \***********************************/

      /*! exports provided: Box */

      /***/
      function jsFoundationUtilBoxJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Box", function () {
          return Box;
        });
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");

        var Box = {
          ImNotTouchingYou: ImNotTouchingYou,
          OverlapArea: OverlapArea,
          GetDimensions: GetDimensions,
          GetOffsets: GetOffsets,
          GetExplicitOffsets: GetExplicitOffsets
          /**
           * Compares the dimensions of an element to a container and determines collision events with container.
           * @function
           * @param {jQuery} element - jQuery object to test for collisions.
           * @param {jQuery} parent - jQuery object to use as bounding container.
           * @param {Boolean} lrOnly - set to true to check left and right values only.
           * @param {Boolean} tbOnly - set to true to check top and bottom values only.
           * @default if no parent object passed, detects collisions with `window`.
           * @returns {Boolean} - true if collision free, false if a collision in any direction.
           */

        };

        function ImNotTouchingYou(element, parent, lrOnly, tbOnly, ignoreBottom) {
          return OverlapArea(element, parent, lrOnly, tbOnly, ignoreBottom) === 0;
        }

        ;

        function OverlapArea(element, parent, lrOnly, tbOnly, ignoreBottom) {
          var eleDims = GetDimensions(element),
              topOver,
              bottomOver,
              leftOver,
              rightOver;

          if (parent) {
            var parDims = GetDimensions(parent);
            bottomOver = parDims.height + parDims.offset.top - (eleDims.offset.top + eleDims.height);
            topOver = eleDims.offset.top - parDims.offset.top;
            leftOver = eleDims.offset.left - parDims.offset.left;
            rightOver = parDims.width + parDims.offset.left - (eleDims.offset.left + eleDims.width);
          } else {
            bottomOver = eleDims.windowDims.height + eleDims.windowDims.offset.top - (eleDims.offset.top + eleDims.height);
            topOver = eleDims.offset.top - eleDims.windowDims.offset.top;
            leftOver = eleDims.offset.left - eleDims.windowDims.offset.left;
            rightOver = eleDims.windowDims.width - (eleDims.offset.left + eleDims.width);
          }

          bottomOver = ignoreBottom ? 0 : Math.min(bottomOver, 0);
          topOver = Math.min(topOver, 0);
          leftOver = Math.min(leftOver, 0);
          rightOver = Math.min(rightOver, 0);

          if (lrOnly) {
            return leftOver + rightOver;
          }

          if (tbOnly) {
            return topOver + bottomOver;
          } // use sum of squares b/c we care about overlap area.


          return Math.sqrt(topOver * topOver + bottomOver * bottomOver + leftOver * leftOver + rightOver * rightOver);
        }
        /**
         * Uses native methods to return an object of dimension values.
         * @function
         * @param {jQuery || HTML} element - jQuery object or DOM element for which to get the dimensions. Can be any element other that document or window.
         * @returns {Object} - nested object of integer pixel values
         * TODO - if element is window, return only those values.
         */


        function GetDimensions(elem) {
          elem = elem.length ? elem[0] : elem;

          if (elem === window || elem === document) {
            throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");
          }

          var rect = elem.getBoundingClientRect(),
              parRect = elem.parentNode.getBoundingClientRect(),
              winRect = document.body.getBoundingClientRect(),
              winY = window.pageYOffset,
              winX = window.pageXOffset;
          return {
            width: rect.width,
            height: rect.height,
            offset: {
              top: rect.top + winY,
              left: rect.left + winX
            },
            parentDims: {
              width: parRect.width,
              height: parRect.height,
              offset: {
                top: parRect.top + winY,
                left: parRect.left + winX
              }
            },
            windowDims: {
              width: winRect.width,
              height: winRect.height,
              offset: {
                top: winY,
                left: winX
              }
            }
          };
        }
        /**
         * Returns an object of top and left integer pixel values for dynamically rendered elements,
         * such as: Tooltip, Reveal, and Dropdown. Maintained for backwards compatibility, and where
         * you don't know alignment, but generally from
         * 6.4 forward you should use GetExplicitOffsets, as GetOffsets conflates position and alignment.
         * @function
         * @param {jQuery} element - jQuery object for the element being positioned.
         * @param {jQuery} anchor - jQuery object for the element's anchor point.
         * @param {String} position - a string relating to the desired position of the element, relative to it's anchor
         * @param {Number} vOffset - integer pixel value of desired vertical separation between anchor and element.
         * @param {Number} hOffset - integer pixel value of desired horizontal separation between anchor and element.
         * @param {Boolean} isOverflow - if a collision event is detected, sets to true to default the element to full width - any desired offset.
         * TODO alter/rewrite to work with `em` values as well/instead of pixels
         */


        function GetOffsets(element, anchor, position, vOffset, hOffset, isOverflow) {
          console.log("NOTE: GetOffsets is deprecated in favor of GetExplicitOffsets and will be removed in 6.5");

          switch (position) {
            case 'top':
              return Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_0__["rtl"])() ? GetExplicitOffsets(element, anchor, 'top', 'left', vOffset, hOffset, isOverflow) : GetExplicitOffsets(element, anchor, 'top', 'right', vOffset, hOffset, isOverflow);

            case 'bottom':
              return Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_0__["rtl"])() ? GetExplicitOffsets(element, anchor, 'bottom', 'left', vOffset, hOffset, isOverflow) : GetExplicitOffsets(element, anchor, 'bottom', 'right', vOffset, hOffset, isOverflow);

            case 'center top':
              return GetExplicitOffsets(element, anchor, 'top', 'center', vOffset, hOffset, isOverflow);

            case 'center bottom':
              return GetExplicitOffsets(element, anchor, 'bottom', 'center', vOffset, hOffset, isOverflow);

            case 'center left':
              return GetExplicitOffsets(element, anchor, 'left', 'center', vOffset, hOffset, isOverflow);

            case 'center right':
              return GetExplicitOffsets(element, anchor, 'right', 'center', vOffset, hOffset, isOverflow);

            case 'left bottom':
              return GetExplicitOffsets(element, anchor, 'bottom', 'left', vOffset, hOffset, isOverflow);

            case 'right bottom':
              return GetExplicitOffsets(element, anchor, 'bottom', 'right', vOffset, hOffset, isOverflow);
            // Backwards compatibility... this along with the reveal and reveal full
            // classes are the only ones that didn't reference anchor

            case 'center':
              return {
                left: $eleDims.windowDims.offset.left + $eleDims.windowDims.width / 2 - $eleDims.width / 2 + hOffset,
                top: $eleDims.windowDims.offset.top + $eleDims.windowDims.height / 2 - ($eleDims.height / 2 + vOffset)
              };

            case 'reveal':
              return {
                left: ($eleDims.windowDims.width - $eleDims.width) / 2 + hOffset,
                top: $eleDims.windowDims.offset.top + vOffset
              };

            case 'reveal full':
              return {
                left: $eleDims.windowDims.offset.left,
                top: $eleDims.windowDims.offset.top
              };
              break;

            default:
              return {
                left: Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_0__["rtl"])() ? $anchorDims.offset.left - $eleDims.width + $anchorDims.width - hOffset : $anchorDims.offset.left + hOffset,
                top: $anchorDims.offset.top + $anchorDims.height + vOffset
              };
          }
        }

        function GetExplicitOffsets(element, anchor, position, alignment, vOffset, hOffset, isOverflow) {
          var $eleDims = GetDimensions(element),
              $anchorDims = anchor ? GetDimensions(anchor) : null;
          var topVal, leftVal; // set position related attribute

          switch (position) {
            case 'top':
              topVal = $anchorDims.offset.top - ($eleDims.height + vOffset);
              break;

            case 'bottom':
              topVal = $anchorDims.offset.top + $anchorDims.height + vOffset;
              break;

            case 'left':
              leftVal = $anchorDims.offset.left - ($eleDims.width + hOffset);
              break;

            case 'right':
              leftVal = $anchorDims.offset.left + $anchorDims.width + hOffset;
              break;
          } // set alignment related attribute


          switch (position) {
            case 'top':
            case 'bottom':
              switch (alignment) {
                case 'left':
                  leftVal = $anchorDims.offset.left + hOffset;
                  break;

                case 'right':
                  leftVal = $anchorDims.offset.left - $eleDims.width + $anchorDims.width - hOffset;
                  break;

                case 'center':
                  leftVal = isOverflow ? hOffset : $anchorDims.offset.left + $anchorDims.width / 2 - $eleDims.width / 2 + hOffset;
                  break;
              }

              break;

            case 'right':
            case 'left':
              switch (alignment) {
                case 'bottom':
                  topVal = $anchorDims.offset.top - vOffset + $anchorDims.height - $eleDims.height;
                  break;

                case 'top':
                  topVal = $anchorDims.offset.top + vOffset;
                  break;

                case 'center':
                  topVal = $anchorDims.offset.top + vOffset + $anchorDims.height / 2 - $eleDims.height / 2;
                  break;
              }

              break;
          }

          return {
            top: topVal,
            left: leftVal
          };
        }
        /***/

      },

      /***/
      "./js/foundation.util.imageLoader.js":
      /*!*******************************************!*\
        !*** ./js/foundation.util.imageLoader.js ***!
        \*******************************************/

      /*! exports provided: onImagesLoaded */

      /***/
      function jsFoundationUtilImageLoaderJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "onImagesLoaded", function () {
          return onImagesLoaded;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /**
         * Runs a callback function when images are fully loaded.
         * @param {Object} images - Image(s) to check if loaded.
         * @param {Func} callback - Function to execute when image is fully loaded.
         */


        function onImagesLoaded(images, callback) {
          var self = this,
              unloaded = images.length;

          if (unloaded === 0) {
            callback();
          }

          images.each(function () {
            // Check if image is loaded
            if (this.complete && typeof this.naturalWidth !== 'undefined') {
              singleImageLoaded();
            } else {
              // If the above check failed, simulate loading on detached element.
              var image = new Image(); // Still count image as loaded if it finalizes with an error.

              var events = "load.zf.images error.zf.images";
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(image).one(events, function me(event) {
                // Unbind the event listeners. We're using 'one' but only one of the two events will have fired.
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).off(events, me);
                singleImageLoaded();
              });
              image.src = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('src');
            }
          });

          function singleImageLoaded() {
            unloaded--;

            if (unloaded === 0) {
              callback();
            }
          }
        }
        /***/

      },

      /***/
      "./js/foundation.util.keyboard.js":
      /*!****************************************!*\
        !*** ./js/foundation.util.keyboard.js ***!
        \****************************************/

      /*! exports provided: Keyboard */

      /***/
      function jsFoundationUtilKeyboardJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Keyboard", function () {
          return Keyboard;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");
        /*******************************************
         *                                         *
         * This util was created by Marius Olbertz *
         * Please thank Marius on GitHub /owlbertz *
         * or the web http://www.mariusolbertz.de/ *
         *                                         *
         ******************************************/


        var keyCodes = {
          9: 'TAB',
          13: 'ENTER',
          27: 'ESCAPE',
          32: 'SPACE',
          35: 'END',
          36: 'HOME',
          37: 'ARROW_LEFT',
          38: 'ARROW_UP',
          39: 'ARROW_RIGHT',
          40: 'ARROW_DOWN'
        };
        var commands = {}; // Functions pulled out to be referenceable from internals

        function findFocusable($element) {
          if (!$element) {
            return false;
          }

          return $element.find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]').filter(function () {
            if (!jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(':visible') || jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('tabindex') < 0) {
              return false;
            } //only have visible elements and those that have a tabindex greater or equal 0


            return true;
          });
        }

        function parseKey(event) {
          var key = keyCodes[event.which || event.keyCode] || String.fromCharCode(event.which).toUpperCase(); // Remove un-printable characters, e.g. for `fromCharCode` calls for CTRL only events

          key = key.replace(/\W+/, '');
          if (event.shiftKey) key = "SHIFT_".concat(key);
          if (event.ctrlKey) key = "CTRL_".concat(key);
          if (event.altKey) key = "ALT_".concat(key); // Remove trailing underscore, in case only modifiers were used (e.g. only `CTRL_ALT`)

          key = key.replace(/_$/, '');
          return key;
        }

        var Keyboard = {
          keys: getKeyCodes(keyCodes),

          /**
           * Parses the (keyboard) event and returns a String that represents its key
           * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
           * @param {Event} event - the event generated by the event handler
           * @return String key - String that represents the key pressed
           */
          parseKey: parseKey,

          /**
           * Handles the given (keyboard) event
           * @param {Event} event - the event generated by the event handler
           * @param {String} component - Foundation component's name, e.g. Slider or Reveal
           * @param {Objects} functions - collection of functions that are to be executed
           */
          handleKey: function handleKey(event, component, functions) {
            var commandList = commands[component],
                keyCode = this.parseKey(event),
                cmds,
                command,
                fn;
            if (!commandList) return console.warn('Component not defined!');

            if (typeof commandList.ltr === 'undefined') {
              // this component does not differentiate between ltr and rtl
              cmds = commandList; // use plain list
            } else {
              // merge ltr and rtl: if document is rtl, rtl overwrites ltr and vice versa
              if (Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__["rtl"])()) cmds = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, commandList.ltr, commandList.rtl);else cmds = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, commandList.rtl, commandList.ltr);
            }

            command = cmds[keyCode];
            fn = functions[command];

            if (fn && typeof fn === 'function') {
              // execute function  if exists
              var returnValue = fn.apply();

              if (functions.handled || typeof functions.handled === 'function') {
                // execute function when event was handled
                functions.handled(returnValue);
              }
            } else {
              if (functions.unhandled || typeof functions.unhandled === 'function') {
                // execute function when event was not handled
                functions.unhandled();
              }
            }
          },

          /**
           * Finds all focusable elements within the given `$element`
           * @param {jQuery} $element - jQuery object to search within
           * @return {jQuery} $focusable - all focusable elements within `$element`
           */
          findFocusable: findFocusable,

          /**
           * Returns the component name name
           * @param {Object} component - Foundation component, e.g. Slider or Reveal
           * @return String componentName
           */
          register: function register(componentName, cmds) {
            commands[componentName] = cmds;
          },
          // TODO9438: These references to Keyboard need to not require global. Will 'this' work in this context?
          //

          /**
           * Traps the focus in the given element.
           * @param  {jQuery} $element  jQuery object to trap the foucs into.
           */
          trapFocus: function trapFocus($element) {
            var $focusable = findFocusable($element),
                $firstFocusable = $focusable.eq(0),
                $lastFocusable = $focusable.eq(-1);
            $element.on('keydown.zf.trapfocus', function (event) {
              if (event.target === $lastFocusable[0] && parseKey(event) === 'TAB') {
                event.preventDefault();
                $firstFocusable.focus();
              } else if (event.target === $firstFocusable[0] && parseKey(event) === 'SHIFT_TAB') {
                event.preventDefault();
                $lastFocusable.focus();
              }
            });
          },

          /**
           * Releases the trapped focus from the given element.
           * @param  {jQuery} $element  jQuery object to release the focus for.
           */
          releaseFocus: function releaseFocus($element) {
            $element.off('keydown.zf.trapfocus');
          }
        };
        /*
         * Constants for easier comparing.
         * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
         */

        function getKeyCodes(kcs) {
          var k = {};

          for (var kc in kcs) {
            k[kcs[kc]] = kcs[kc];
          }

          return k;
        }
        /***/

      },

      /***/
      "./js/foundation.util.mediaQuery.js":
      /*!******************************************!*\
        !*** ./js/foundation.util.mediaQuery.js ***!
        \******************************************/

      /*! exports provided: MediaQuery */

      /***/
      function jsFoundationUtilMediaQueryJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "MediaQuery", function () {
          return MediaQuery;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        } // Default set of media queries


        var defaultQueries = {
          'default': 'only screen',
          landscape: 'only screen and (orientation: landscape)',
          portrait: 'only screen and (orientation: portrait)',
          retina: 'only screen and (-webkit-min-device-pixel-ratio: 2),' + 'only screen and (min--moz-device-pixel-ratio: 2),' + 'only screen and (-o-min-device-pixel-ratio: 2/1),' + 'only screen and (min-device-pixel-ratio: 2),' + 'only screen and (min-resolution: 192dpi),' + 'only screen and (min-resolution: 2dppx)'
        }; // matchMedia() polyfill - Test a CSS media type/query in JS.
        // Authors & copyright(c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. MIT license

        /* eslint-disable */

        window.matchMedia || (window.matchMedia = function () {
          "use strict"; // For browsers that support matchMedium api such as IE 9 and webkit

          var styleMedia = window.styleMedia || window.media; // For those that don't support matchMedium

          if (!styleMedia) {
            var style = document.createElement('style'),
                script = document.getElementsByTagName('script')[0],
                info = null;
            style.type = 'text/css';
            style.id = 'matchmediajs-test';

            if (!script) {
              document.head.appendChild(style);
            } else {
              script.parentNode.insertBefore(style, script);
            } // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers


            info = 'getComputedStyle' in window && window.getComputedStyle(style, null) || style.currentStyle;
            styleMedia = {
              matchMedium: function matchMedium(media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }'; // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers

                if (style.styleSheet) {
                  style.styleSheet.cssText = text;
                } else {
                  style.textContent = text;
                } // Test if media query is true or false


                return info.width === '1px';
              }
            };
          }

          return function (media) {
            return {
              matches: styleMedia.matchMedium(media || 'all'),
              media: media || 'all'
            };
          };
        }());
        /* eslint-enable */

        var MediaQuery = {
          queries: [],
          current: '',

          /**
           * Initializes the media query helper, by extracting the breakpoint list from the CSS and activating the breakpoint watcher.
           * @function
           * @private
           */
          _init: function _init() {
            var self = this;
            var $meta = jquery__WEBPACK_IMPORTED_MODULE_0___default()('meta.foundation-mq');

            if (!$meta.length) {
              jquery__WEBPACK_IMPORTED_MODULE_0___default()('<meta class="foundation-mq">').appendTo(document.head);
            }

            var extractedStyles = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.foundation-mq').css('font-family');
            var namedQueries;
            namedQueries = parseStyleToObject(extractedStyles);

            for (var key in namedQueries) {
              if (namedQueries.hasOwnProperty(key)) {
                self.queries.push({
                  name: key,
                  value: "only screen and (min-width: ".concat(namedQueries[key], ")")
                });
              }
            }

            this.current = this._getCurrentSize();

            this._watcher();
          },

          /**
           * Checks if the screen is at least as wide as a breakpoint.
           * @function
           * @param {String} size - Name of the breakpoint to check.
           * @returns {Boolean} `true` if the breakpoint matches, `false` if it's smaller.
           */
          atLeast: function atLeast(size) {
            var query = this.get(size);

            if (query) {
              return window.matchMedia(query).matches;
            }

            return false;
          },

          /**
           * Checks if the screen matches to a breakpoint.
           * @function
           * @param {String} size - Name of the breakpoint to check, either 'small only' or 'small'. Omitting 'only' falls back to using atLeast() method.
           * @returns {Boolean} `true` if the breakpoint matches, `false` if it does not.
           */
          is: function is(size) {
            size = size.trim().split(' ');

            if (size.length > 1 && size[1] === 'only') {
              if (size[0] === this._getCurrentSize()) return true;
            } else {
              return this.atLeast(size[0]);
            }

            return false;
          },

          /**
           * Gets the media query of a breakpoint.
           * @function
           * @param {String} size - Name of the breakpoint to get.
           * @returns {String|null} - The media query of the breakpoint, or `null` if the breakpoint doesn't exist.
           */
          get: function get(size) {
            for (var i in this.queries) {
              if (this.queries.hasOwnProperty(i)) {
                var query = this.queries[i];
                if (size === query.name) return query.value;
              }
            }

            return null;
          },

          /**
           * Gets the current breakpoint name by testing every breakpoint and returning the last one to match (the biggest one).
           * @function
           * @private
           * @returns {String} Name of the current breakpoint.
           */
          _getCurrentSize: function _getCurrentSize() {
            var matched;

            for (var i = 0; i < this.queries.length; i++) {
              var query = this.queries[i];

              if (window.matchMedia(query.value).matches) {
                matched = query;
              }
            }

            if (_typeof(matched) === 'object') {
              return matched.name;
            } else {
              return matched;
            }
          },

          /**
           * Activates the breakpoint watcher, which fires an event on the window whenever the breakpoint changes.
           * @function
           * @private
           */
          _watcher: function _watcher() {
            var _this = this;

            jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('resize.zf.mediaquery').on('resize.zf.mediaquery', function () {
              var newSize = _this._getCurrentSize(),
                  currentSize = _this.current;

              if (newSize !== currentSize) {
                // Change the current media query
                _this.current = newSize; // Broadcast the media query change on the window

                jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).trigger('changed.zf.mediaquery', [newSize, currentSize]);
              }
            });
          }
        }; // Thank you: https://github.com/sindresorhus/query-string

        function parseStyleToObject(str) {
          var styleObject = {};

          if (typeof str !== 'string') {
            return styleObject;
          }

          str = str.trim().slice(1, -1); // browsers re-quote string style values

          if (!str) {
            return styleObject;
          }

          styleObject = str.split('&').reduce(function (ret, param) {
            var parts = param.replace(/\+/g, ' ').split('=');
            var key = parts[0];
            var val = parts[1];
            key = decodeURIComponent(key); // missing `=` should be `null`:
            // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters

            val = typeof val === 'undefined' ? null : decodeURIComponent(val);

            if (!ret.hasOwnProperty(key)) {
              ret[key] = val;
            } else if (Array.isArray(ret[key])) {
              ret[key].push(val);
            } else {
              ret[key] = [ret[key], val];
            }

            return ret;
          }, {});
          return styleObject;
        }
        /***/

      },

      /***/
      "./js/foundation.util.motion.js":
      /*!**************************************!*\
        !*** ./js/foundation.util.motion.js ***!
        \**************************************/

      /*! exports provided: Move, Motion */

      /***/
      function jsFoundationUtilMotionJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Move", function () {
          return Move;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Motion", function () {
          return Motion;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");
        /**
         * Motion module.
         * @module foundation.motion
         */


        var initClasses = ['mui-enter', 'mui-leave'];
        var activeClasses = ['mui-enter-active', 'mui-leave-active'];
        var Motion = {
          animateIn: function animateIn(element, animation, cb) {
            animate(true, element, animation, cb);
          },
          animateOut: function animateOut(element, animation, cb) {
            animate(false, element, animation, cb);
          }
        };

        function Move(duration, elem, fn) {
          var anim,
              prog,
              start = null; // console.log('called');

          if (duration === 0) {
            fn.apply(elem);
            elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);
            return;
          }

          function move(ts) {
            if (!start) start = ts; // console.log(start, ts);

            prog = ts - start;
            fn.apply(elem);

            if (prog < duration) {
              anim = window.requestAnimationFrame(move, elem);
            } else {
              window.cancelAnimationFrame(anim);
              elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);
            }
          }

          anim = window.requestAnimationFrame(move);
        }
        /**
         * Animates an element in or out using a CSS transition class.
         * @function
         * @private
         * @param {Boolean} isIn - Defines if the animation is in or out.
         * @param {Object} element - jQuery or HTML object to animate.
         * @param {String} animation - CSS class to use.
         * @param {Function} cb - Callback to run when animation is finished.
         */


        function animate(isIn, element, animation, cb) {
          element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).eq(0);
          if (!element.length) return;
          var initClass = isIn ? initClasses[0] : initClasses[1];
          var activeClass = isIn ? activeClasses[0] : activeClasses[1]; // Set up the animation

          reset();
          element.addClass(animation).css('transition', 'none');
          requestAnimationFrame(function () {
            element.addClass(initClass);
            if (isIn) element.show();
          }); // Start the animation

          requestAnimationFrame(function () {
            element[0].offsetWidth;
            element.css('transition', '').addClass(activeClass);
          }); // Clean up the animation when it finishes

          element.one(Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__["transitionend"])(element), finish); // Hides the element (for out animations), resets the element, and runs a callback

          function finish() {
            if (!isIn) element.hide();
            reset();
            if (cb) cb.apply(element);
          } // Resets transitions and removes motion-specific classes


          function reset() {
            element[0].style.transitionDuration = 0;
            element.removeClass("".concat(initClass, " ").concat(activeClass, " ").concat(animation));
          }
        }
        /***/

      },

      /***/
      "./js/foundation.util.nest.js":
      /*!************************************!*\
        !*** ./js/foundation.util.nest.js ***!
        \************************************/

      /*! exports provided: Nest */

      /***/
      function jsFoundationUtilNestJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Nest", function () {
          return Nest;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

        var Nest = {
          Feather: function Feather(menu) {
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'zf';
            menu.attr('role', 'menubar');
            var items = menu.find('li').attr({
              'role': 'menuitem'
            }),
                subMenuClass = "is-".concat(type, "-submenu"),
                subItemClass = "".concat(subMenuClass, "-item"),
                hasSubClass = "is-".concat(type, "-submenu-parent"),
                applyAria = type !== 'accordion'; // Accordions handle their own ARIA attriutes.

            items.each(function () {
              var $item = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
                  $sub = $item.children('ul');

              if ($sub.length) {
                $item.addClass(hasSubClass);
                $sub.addClass("submenu ".concat(subMenuClass)).attr({
                  'data-submenu': ''
                });

                if (applyAria) {
                  $item.attr({
                    'aria-haspopup': true,
                    'aria-label': $item.children('a:first').text()
                  }); // Note:  Drilldowns behave differently in how they hide, and so need
                  // additional attributes.  We should look if this possibly over-generalized
                  // utility (Nest) is appropriate when we rework menus in 6.4

                  if (type === 'drilldown') {
                    $item.attr({
                      'aria-expanded': false
                    });
                  }
                }

                $sub.addClass("submenu ".concat(subMenuClass)).attr({
                  'data-submenu': '',
                  'role': 'menubar'
                });

                if (type === 'drilldown') {
                  $sub.attr({
                    'aria-hidden': true
                  });
                }
              }

              if ($item.parent('[data-submenu]').length) {
                $item.addClass("is-submenu-item ".concat(subItemClass));
              }
            });
            return;
          },
          Burn: function Burn(menu, type) {
            var //items = menu.find('li'),
            subMenuClass = "is-".concat(type, "-submenu"),
                subItemClass = "".concat(subMenuClass, "-item"),
                hasSubClass = "is-".concat(type, "-submenu-parent");
            menu.find('>li, > li > ul, .menu, .menu > li, [data-submenu] > li').removeClass("".concat(subMenuClass, " ").concat(subItemClass, " ").concat(hasSubClass, " is-submenu-item submenu is-active")).removeAttr('data-submenu').css('display', '');
          }
        };
        /***/
      },

      /***/
      "./js/foundation.util.timer.js":
      /*!*************************************!*\
        !*** ./js/foundation.util.timer.js ***!
        \*************************************/

      /*! exports provided: Timer */

      /***/
      function jsFoundationUtilTimerJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Timer", function () {
          return Timer;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

        function Timer(elem, options, cb) {
          var _this = this,
              duration = options.duration,
              //options is an object for easily adding features later.
          nameSpace = Object.keys(elem.data())[0] || 'timer',
              remain = -1,
              start,
              timer;

          this.isPaused = false;

          this.restart = function () {
            remain = -1;
            clearTimeout(timer);
            this.start();
          };

          this.start = function () {
            this.isPaused = false; // if(!elem.data('paused')){ return false; }//maybe implement this sanity check if used for other things.

            clearTimeout(timer);
            remain = remain <= 0 ? duration : remain;
            elem.data('paused', false);
            start = Date.now();
            timer = setTimeout(function () {
              if (options.infinite) {
                _this.restart(); //rerun the timer.

              }

              if (cb && typeof cb === 'function') {
                cb();
              }
            }, remain);
            elem.trigger("timerstart.zf.".concat(nameSpace));
          };

          this.pause = function () {
            this.isPaused = true; //if(elem.data('paused')){ return false; }//maybe implement this sanity check if used for other things.

            clearTimeout(timer);
            elem.data('paused', true);
            var end = Date.now();
            remain = remain - (end - start);
            elem.trigger("timerpaused.zf.".concat(nameSpace));
          };
        }
        /***/

      },

      /***/
      "./js/foundation.util.touch.js":
      /*!*************************************!*\
        !*** ./js/foundation.util.touch.js ***!
        \*************************************/

      /*! exports provided: Touch */

      /***/
      function jsFoundationUtilTouchJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Touch", function () {
          return Touch;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        } //**************************************************
        //**Work inspired by multiple jquery swipe plugins**
        //**Done by Yohai Ararat ***************************
        //**************************************************


        var Touch = {};
        var startPosX,
            startPosY,
            startTime,
            elapsedTime,
            startEvent,
            isMoving = false,
            didMoved = false;

        function onTouchEnd(e) {
          this.removeEventListener('touchmove', onTouchMove);
          this.removeEventListener('touchend', onTouchEnd); // If the touch did not move, consider it as a "tap"

          if (!didMoved) {
            var tapEvent = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.Event('tap', startEvent || e);
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger(tapEvent);
          }

          startEvent = null;
          isMoving = false;
          didMoved = false;
        }

        function onTouchMove(e) {
          if (jquery__WEBPACK_IMPORTED_MODULE_0___default.a.spotSwipe.preventDefault) {
            e.preventDefault();
          }

          if (isMoving) {
            var x = e.touches[0].pageX;
            var y = e.touches[0].pageY;
            var dx = startPosX - x;
            var dy = startPosY - y;
            var dir;
            didMoved = true;
            elapsedTime = new Date().getTime() - startTime;

            if (Math.abs(dx) >= jquery__WEBPACK_IMPORTED_MODULE_0___default.a.spotSwipe.moveThreshold && elapsedTime <= jquery__WEBPACK_IMPORTED_MODULE_0___default.a.spotSwipe.timeThreshold) {
              dir = dx > 0 ? 'left' : 'right';
            } // else if(Math.abs(dy) >= $.spotSwipe.moveThreshold && elapsedTime <= $.spotSwipe.timeThreshold) {
            //   dir = dy > 0 ? 'down' : 'up';
            // }


            if (dir) {
              e.preventDefault();
              onTouchEnd.apply(this, arguments);
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default.a.Event('swipe', e), dir).trigger(jquery__WEBPACK_IMPORTED_MODULE_0___default.a.Event("swipe".concat(dir), e));
            }
          }
        }

        function onTouchStart(e) {
          if (e.touches.length == 1) {
            startPosX = e.touches[0].pageX;
            startPosY = e.touches[0].pageY;
            startEvent = e;
            isMoving = true;
            didMoved = false;
            startTime = new Date().getTime();
            this.addEventListener('touchmove', onTouchMove, false);
            this.addEventListener('touchend', onTouchEnd, false);
          }
        }

        function init() {
          this.addEventListener && this.addEventListener('touchstart', onTouchStart, false);
        }

        function teardown() {
          this.removeEventListener('touchstart', onTouchStart);
        }

        var SpotSwipe =
        /*#__PURE__*/
        function () {
          function SpotSwipe($) {
            _classCallCheck(this, SpotSwipe);

            this.version = '1.0.0';
            this.enabled = 'ontouchstart' in document.documentElement;
            this.preventDefault = false;
            this.moveThreshold = 75;
            this.timeThreshold = 200;
            this.$ = $;

            this._init();
          }

          _createClass(SpotSwipe, [{
            key: "_init",
            value: function _init() {
              var $ = this.$;
              $.event.special.swipe = {
                setup: init
              };
              $.event.special.tap = {
                setup: init
              };
              $.each(['left', 'up', 'down', 'right'], function () {
                $.event.special["swipe".concat(this)] = {
                  setup: function setup() {
                    $(this).on('swipe', $.noop);
                  }
                };
              });
            }
          }]);

          return SpotSwipe;
        }();
        /****************************************************
         * As far as I can tell, both setupSpotSwipe and    *
         * setupTouchHandler should be idempotent,          *
         * because they directly replace functions &        *
         * values, and do not add event handlers directly.  *
         ****************************************************/


        Touch.setupSpotSwipe = function ($) {
          $.spotSwipe = new SpotSwipe($);
        };
        /****************************************************
         * Method for adding pseudo drag events to elements *
         ***************************************************/


        Touch.setupTouchHandler = function ($) {
          $.fn.addTouch = function () {
            this.each(function (i, el) {
              $(el).bind('touchstart touchmove touchend touchcancel', function (event) {
                //we pass the original event object because the jQuery event
                //object is normalized to w3c specs and does not provide the TouchList
                handleTouch(event);
              });
            });

            var handleTouch = function handleTouch(event) {
              var touches = event.changedTouches,
                  first = touches[0],
                  eventTypes = {
                touchstart: 'mousedown',
                touchmove: 'mousemove',
                touchend: 'mouseup'
              },
                  type = eventTypes[event.type],
                  simulatedEvent;

              if ('MouseEvent' in window && typeof window.MouseEvent === 'function') {
                simulatedEvent = new window.MouseEvent(type, {
                  'bubbles': true,
                  'cancelable': true,
                  'screenX': first.screenX,
                  'screenY': first.screenY,
                  'clientX': first.clientX,
                  'clientY': first.clientY
                });
              } else {
                simulatedEvent = document.createEvent('MouseEvent');
                simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0
                /*left*/
                , null);
              }

              first.target.dispatchEvent(simulatedEvent);
            };
          };
        };

        Touch.init = function ($) {
          if (typeof $.spotSwipe === 'undefined') {
            Touch.setupSpotSwipe($);
            Touch.setupTouchHandler($);
          }
        };
        /***/

      },

      /***/
      "./js/foundation.util.triggers.js":
      /*!****************************************!*\
        !*** ./js/foundation.util.triggers.js ***!
        \****************************************/

      /*! exports provided: Triggers */

      /***/
      function jsFoundationUtilTriggersJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Triggers", function () {
          return Triggers;
        });
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! jquery */
        "jquery");
        /* harmony import */


        var jquery__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./foundation.core.utils */
        "./js/foundation.core.utils.js");
        /* harmony import */


        var _foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./foundation.util.motion */
        "./js/foundation.util.motion.js");

        function _typeof(obj) {
          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        var MutationObserver = function () {
          var prefixes = ['WebKit', 'Moz', 'O', 'Ms', ''];

          for (var i = 0; i < prefixes.length; i++) {
            if ("".concat(prefixes[i], "MutationObserver") in window) {
              return window["".concat(prefixes[i], "MutationObserver")];
            }
          }

          return false;
        }();

        var triggers = function triggers(el, type) {
          el.data(type).split(' ').forEach(function (id) {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(id))[type === 'close' ? 'trigger' : 'triggerHandler']("".concat(type, ".zf.trigger"), [el]);
          });
        };

        var Triggers = {
          Listeners: {
            Basic: {},
            Global: {}
          },
          Initializers: {}
        };
        Triggers.Listeners.Basic = {
          openListener: function openListener() {
            triggers(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'open');
          },
          closeListener: function closeListener() {
            var id = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('close');

            if (id) {
              triggers(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'close');
            } else {
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger('close.zf.trigger');
            }
          },
          toggleListener: function toggleListener() {
            var id = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('toggle');

            if (id) {
              triggers(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), 'toggle');
            } else {
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger('toggle.zf.trigger');
            }
          },
          closeableListener: function closeableListener(e) {
            e.stopPropagation();
            var animation = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('closable');

            if (animation !== '') {
              _foundation_util_motion__WEBPACK_IMPORTED_MODULE_2__["Motion"].animateOut(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this), animation, function () {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).trigger('closed.zf');
              });
            } else {
              jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).fadeOut().trigger('closed.zf');
            }
          },
          toggleFocusListener: function toggleFocusListener() {
            var id = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data('toggle-focus');
            jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(id)).triggerHandler('toggle.zf.trigger', [jquery__WEBPACK_IMPORTED_MODULE_0___default()(this)]);
          }
        }; // Elements with [data-open] will reveal a plugin that supports it when clicked.

        Triggers.Initializers.addOpenListener = function ($elem) {
          $elem.off('click.zf.trigger', Triggers.Listeners.Basic.openListener);
          $elem.on('click.zf.trigger', '[data-open]', Triggers.Listeners.Basic.openListener);
        }; // Elements with [data-close] will close a plugin that supports it when clicked.
        // If used without a value on [data-close], the event will bubble, allowing it to close a parent component.


        Triggers.Initializers.addCloseListener = function ($elem) {
          $elem.off('click.zf.trigger', Triggers.Listeners.Basic.closeListener);
          $elem.on('click.zf.trigger', '[data-close]', Triggers.Listeners.Basic.closeListener);
        }; // Elements with [data-toggle] will toggle a plugin that supports it when clicked.


        Triggers.Initializers.addToggleListener = function ($elem) {
          $elem.off('click.zf.trigger', Triggers.Listeners.Basic.toggleListener);
          $elem.on('click.zf.trigger', '[data-toggle]', Triggers.Listeners.Basic.toggleListener);
        }; // Elements with [data-closable] will respond to close.zf.trigger events.


        Triggers.Initializers.addCloseableListener = function ($elem) {
          $elem.off('close.zf.trigger', Triggers.Listeners.Basic.closeableListener);
          $elem.on('close.zf.trigger', '[data-closeable], [data-closable]', Triggers.Listeners.Basic.closeableListener);
        }; // Elements with [data-toggle-focus] will respond to coming in and out of focus


        Triggers.Initializers.addToggleFocusListener = function ($elem) {
          $elem.off('focus.zf.trigger blur.zf.trigger', Triggers.Listeners.Basic.toggleFocusListener);
          $elem.on('focus.zf.trigger blur.zf.trigger', '[data-toggle-focus]', Triggers.Listeners.Basic.toggleFocusListener);
        }; // More Global/complex listeners and triggers


        Triggers.Listeners.Global = {
          resizeListener: function resizeListener($nodes) {
            if (!MutationObserver) {
              //fallback for IE 9
              $nodes.each(function () {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).triggerHandler('resizeme.zf.trigger');
              });
            } //trigger all listening elements and signal a resize event


            $nodes.attr('data-events', "resize");
          },
          scrollListener: function scrollListener($nodes) {
            if (!MutationObserver) {
              //fallback for IE 9
              $nodes.each(function () {
                jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).triggerHandler('scrollme.zf.trigger');
              });
            } //trigger all listening elements and signal a scroll event


            $nodes.attr('data-events', "scroll");
          },
          closeMeListener: function closeMeListener(e, pluginId) {
            var plugin = e.namespace.split('.')[0];
            var plugins = jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-".concat(plugin, "]")).not("[data-yeti-box=\"".concat(pluginId, "\"]"));
            plugins.each(function () {
              var _this = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);

              _this.triggerHandler('close.zf.trigger', [_this]);
            });
          } // Global, parses whole document.

        };

        Triggers.Initializers.addClosemeListener = function (pluginName) {
          var yetiBoxes = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-yeti-box]'),
              plugNames = ['dropdown', 'tooltip', 'reveal'];

          if (pluginName) {
            if (typeof pluginName === 'string') {
              plugNames.push(pluginName);
            } else if (_typeof(pluginName) === 'object' && typeof pluginName[0] === 'string') {
              plugNames.concat(pluginName);
            } else {
              console.error('Plugin names must be strings');
            }
          }

          if (yetiBoxes.length) {
            var listeners = plugNames.map(function (name) {
              return "closeme.zf.".concat(name);
            }).join(' ');
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(listeners).on(listeners, Triggers.Listeners.Global.closeMeListener);
          }
        };

        function debounceGlobalListener(debounce, trigger, listener) {
          var timer,
              args = Array.prototype.slice.call(arguments, 3);
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(trigger).on(trigger, function (e) {
            if (timer) {
              clearTimeout(timer);
            }

            timer = setTimeout(function () {
              listener.apply(null, args);
            }, debounce || 10); //default time to emit scroll event
          });
        }

        Triggers.Initializers.addResizeListener = function (debounce) {
          var $nodes = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-resize]');

          if ($nodes.length) {
            debounceGlobalListener(debounce, 'resize.zf.trigger', Triggers.Listeners.Global.resizeListener, $nodes);
          }
        };

        Triggers.Initializers.addScrollListener = function (debounce) {
          var $nodes = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[data-scroll]');

          if ($nodes.length) {
            debounceGlobalListener(debounce, 'scroll.zf.trigger', Triggers.Listeners.Global.scrollListener, $nodes);
          }
        };

        Triggers.Initializers.addMutationEventsListener = function ($elem) {
          if (!MutationObserver) {
            return false;
          }

          var $nodes = $elem.find('[data-resize], [data-scroll], [data-mutate]'); //element callback

          var listeningElementsMutation = function listeningElementsMutation(mutationRecordsList) {
            var $target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(mutationRecordsList[0].target); //trigger the event handler for the element depending on type

            switch (mutationRecordsList[0].type) {
              case "attributes":
                if ($target.attr("data-events") === "scroll" && mutationRecordsList[0].attributeName === "data-events") {
                  $target.triggerHandler('scrollme.zf.trigger', [$target, window.pageYOffset]);
                }

                if ($target.attr("data-events") === "resize" && mutationRecordsList[0].attributeName === "data-events") {
                  $target.triggerHandler('resizeme.zf.trigger', [$target]);
                }

                if (mutationRecordsList[0].attributeName === "style") {
                  $target.closest("[data-mutate]").attr("data-events", "mutate");
                  $target.closest("[data-mutate]").triggerHandler('mutateme.zf.trigger', [$target.closest("[data-mutate]")]);
                }

                break;

              case "childList":
                $target.closest("[data-mutate]").attr("data-events", "mutate");
                $target.closest("[data-mutate]").triggerHandler('mutateme.zf.trigger', [$target.closest("[data-mutate]")]);
                break;

              default:
                return false;
              //nothing
            }
          };

          if ($nodes.length) {
            //for each element that needs to listen for resizing, scrolling, or mutation add a single observer
            for (var i = 0; i <= $nodes.length - 1; i++) {
              var elementObserver = new MutationObserver(listeningElementsMutation);
              elementObserver.observe($nodes[i], {
                attributes: true,
                childList: true,
                characterData: false,
                subtree: true,
                attributeFilter: ["data-events", "style"]
              });
            }
          }
        };

        Triggers.Initializers.addSimpleListeners = function () {
          var $document = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document);
          Triggers.Initializers.addOpenListener($document);
          Triggers.Initializers.addCloseListener($document);
          Triggers.Initializers.addToggleListener($document);
          Triggers.Initializers.addCloseableListener($document);
          Triggers.Initializers.addToggleFocusListener($document);
        };

        Triggers.Initializers.addGlobalListeners = function () {
          var $document = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document);
          Triggers.Initializers.addMutationEventsListener($document);
          Triggers.Initializers.addResizeListener();
          Triggers.Initializers.addScrollListener();
          Triggers.Initializers.addClosemeListener();
        };

        Triggers.init = function ($, Foundation) {
          Object(_foundation_core_utils__WEBPACK_IMPORTED_MODULE_1__["onLoad"])($(window), function () {
            if ($.triggersInitialized !== true) {
              Triggers.Initializers.addSimpleListeners();
              Triggers.Initializers.addGlobalListeners();
              $.triggersInitialized = true;
            }
          });

          if (Foundation) {
            Foundation.Triggers = Triggers; // Legacy included to be backwards compatible for now.

            Foundation.IHearYou = Triggers.Initializers.addGlobalListeners;
          }
        };
        /***/

      },

      /***/
      0:
      /*!****************************************!*\
        !*** multi ./js/entries/foundation.js ***!
        \****************************************/

      /*! no static exports found */

      /***/
      function _(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(
        /*! /Users/ncoden/Documents/Documents/Projects/Programmation/Web/2016/Foundation/foundation-sites/js/entries/foundation.js */
        "./js/entries/foundation.js");
        /***/
      },

      /***/
      "jquery":
      /*!********************************************************************************************!*\
        !*** external {"root":["jQuery"],"amd":"jquery","commonjs":"jquery","commonjs2":"jquery"} ***!
        \********************************************************************************************/

      /*! no static exports found */

      /***/
      function jquery(module, exports) {
        module.exports = __WEBPACK_EXTERNAL_MODULE_jquery__;
        /***/
      }
      /******/

    })
  );
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.14.5
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
var timeoutDuration = 0;

for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
    timeoutDuration = 1;
    break;
  }
}

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }

    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;
/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/

var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;
/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */

function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */


function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  } // NOTE: 1 DOM access here


  var window = element.ownerDocument.defaultView;
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}
/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */


function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }

  return element.parentNode || element.host;
}
/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */


function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;

    case '#document':
      return element.body;
  } // Firefox want us to check `-x` and `-y` variations as well


  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);
/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */

function isIE(version) {
  if (version === 11) {
    return isIE11;
  }

  if (version === 10) {
    return isIE10;
  }

  return isIE11 || isIE10;
}
/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */


function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null; // NOTE: 1 DOM access here

  var offsetParent = element.offsetParent || null; // Skip hidden elements which don't have an offsetParent

  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  } // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...


  if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }

  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}
/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */


function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}
/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */


function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  } // Here we make sure to give as "start" the element that comes first in the DOM


  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1; // Get common ancestor container

  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer; // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  } // one of the nodes is inside shadowDOM, find which one


  var element1root = getRoot(element1);

  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}
/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */


function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}
/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */


function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}
/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */


function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';
  return parseFloat(styles["border".concat(sideA, "Width")], 10) + parseFloat(styles["border".concat(sideB, "Width")], 10);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body["offset".concat(axis)], body["scroll".concat(axis)], html["client".concat(axis)], html["offset".concat(axis)], html["scroll".concat(axis)], isIE(10) ? parseInt(html["offset".concat(axis)]) + parseInt(computedStyle["margin".concat(axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle["margin".concat(axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
}

function getWindowSizes(document) {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);
  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */


function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}
/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */


function getBoundingClientRect(element) {
  var rect = {}; // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11

  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  }; // subtract scrollbar size from sizes

  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.right - result.left;
  var height = sizes.height || element.clientHeight || result.bottom - result.top;
  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height; // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons

  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');
    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);
  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10); // In cases where the parent is fixed, we must ignore negative scroll in offset calc

  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }

  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0; // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.

  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop, 10);
    var marginLeft = parseFloat(styles.marginLeft, 10);
    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft; // Attach marginTop and marginLeft because in some circumstances we may need them

    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);
  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;
  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };
  return getClientRect(offset);
}
/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */


function isFixed(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }

  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }

  return isFixed(getParentNode(element));
}
/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */


function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }

  var el = element.parentElement;

  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }

  return el || document.documentElement;
}
/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */


function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  // NOTE: 1 DOM access here
  var boundaries = {
    top: 0,
    left: 0
  };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference); // Handle viewport case

  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode;

    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));

      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition); // In case of HTML, we need a different computation

    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  } // Add paddings


  padding = padding || 0;
  var isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;
  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;
  return width * height;
}
/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);
  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };
  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });
  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });
  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;
  var variation = placement.split('-')[1];
  return computedPlacement + (variation ? "-".concat(variation) : '');
}
/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */


function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}
/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */


function getOuterSizes(element) {
  var window = element.ownerDocument.defaultView;
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
  var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}
/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */


function getOppositePlacement(placement) {
  var hash = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}
/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */


function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0]; // Get popper node sizes

  var popperRect = getOuterSizes(popper); // Add position, width and height to our offsets object

  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  }; // depending by the popper placement we have to compute its offsets slightly differently

  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';
  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;

  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}
/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */


function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  } // use `filter` to obtain the same behavior of `find`


  return arr.filter(check)[0];
}
/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */


function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  } // use `find` + `indexOf` if `findIndex` isn't supported


  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}
/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */


function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));
  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }

    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation

    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);
      data = fn(data, modifier);
    }
  });
  return data;
}
/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */


function _update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  }; // compute reference element offsets

  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed); // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value

  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding); // store the computed placement inside `originalPlacement`

  data.originalPlacement = data.placement;
  data.positionFixed = this.options.positionFixed; // compute the popper offsets

  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute'; // run the modifiers

  data = runModifiers(this.modifiers, data); // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback

  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}
/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */


function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref3) {
    var name = _ref3.name,
        enabled = _ref3.enabled;
    return enabled && name === modifierName;
  });
}
/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */


function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var _i = 0; _i < prefixes.length; _i++) {
    var prefix = prefixes[_i];
    var toCheck = prefix ? "".concat(prefix).concat(upperProp) : property;

    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }

  return null;
}
/**
 * Destroys the popper.
 * @method
 * @memberof Popper
 */


function _destroy() {
  this.state.isDestroyed = true; // touch DOM only if `applyStyle` modifier is enabled

  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners(); // remove the popper if user explicity asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it

  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }

  return this;
}
/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */


function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, {
    passive: true
  });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }

  scrollParents.push(target);
}
/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */


function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, {
    passive: true
  }); // Scroll event listener on scroll parents

  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;
  return state;
}
/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */


function _enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}
/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */


function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound); // Remove scroll event listener on scroll parents

  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  }); // Reset state

  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}
/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */


function _disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}
/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */


function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}
/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */


function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = ''; // add unit if the value is numeric and is one of the following

    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }

    element.style[prop] = styles[prop] + unit;
  });
}
/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */


function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];

    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */


function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles); // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element

  setAttributes(data.instance.popper, data.attributes); // if arrowElement is defined and arrowStyles has some properties

  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}
/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */


function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed); // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value

  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);
  popper.setAttribute('x-placement', placement); // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations

  setStyles(popper, {
    position: options.positionFixed ? 'fixed' : 'absolute'
  });
  return options;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper; // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;

  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }

  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;
  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent); // Styles

  var styles = {
    position: popper.position
  }; // Avoid blurry text by using full pixel integers.
  // For pixel-perfect positioning, top/bottom prefers rounded
  // values, while left/right prefers floored values.

  var offsets = {
    left: Math.floor(popper.left),
    top: Math.round(popper.top),
    bottom: Math.round(popper.bottom),
    right: Math.floor(popper.right)
  };
  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right'; // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed

  var prefixedProperty = getSupportedPropertyName('transform'); // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.

  var left, top;

  if (sideA === 'bottom') {
    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
    // and not the bottom of the html element
    if (offsetParent.nodeName === 'HTML') {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }

  if (sideB === 'right') {
    if (offsetParent.nodeName === 'HTML') {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }

  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = "translate3d(".concat(left, "px, ").concat(top, "px, 0)");
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = "".concat(sideA, ", ").concat(sideB);
  } // Attributes


  var attributes = {
    'x-placement': data.placement
  }; // Update `data` attributes, styles and arrowStyles

  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);
  return data;
}
/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */


function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref4) {
    var name = _ref4.name;
    return name === requestingName;
  });
  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = "`".concat(requestingName, "`");

    var requested = "`".concat(requestedName, "`");
    console.warn("".concat(requested, " modifier is required by ").concat(_requesting, " modifier in order to work, be sure to include it before ").concat(_requesting, "!"));
  }

  return isRequired;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function arrow(data, options) {
  var _data$offsets$arrow;

  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element; // if arrowElement is a string, suppose it's a CSS selector

  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement); // if arrowElement is not found, don't run the modifier

    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var isVertical = ['left', 'right'].indexOf(placement) !== -1;
  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len]; //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //
  // top/left side

  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  } // bottom/right side


  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }

  data.offsets.popper = getClientRect(data.offsets.popper); // compute center of the popper

  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2; // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available

  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css["margin".concat(sideCapitalized)], 10);
  var popperBorderSide = parseFloat(css["border".concat(sideCapitalized, "Width")], 10);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide; // prevent arrowElement from being placed not contiguously to its popper

  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);
  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, _defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), _defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);
  return data;
}
/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */


function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }

  return variation;
}
/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-end` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */


var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start']; // Get rid of `auto` `auto-start` and `auto-end`

var validPlacements = placements.slice(3);
/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */

function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */

function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);
  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';
  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;

    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;

    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;

    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);
    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference; // using floor because the reference offsets may contain decimals we are not going to consider here

    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);
    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);
    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom; // flip the variation if required

    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : ''); // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future

      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));
      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function keepTogether(data) {
  var _data$offsets2 = data.offsets,
      popper = _data$offsets2.popper,
      reference = _data$offsets2.reference;
  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }

  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}
/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */


function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2]; // If it's not a number it's an operator, I guess

  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element;

    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;

      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size;

    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }

    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}
/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */


function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0]; // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one

  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1; // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)

  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  }); // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space

  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  } // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.


  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments]; // Convert the values with units to absolute pixels to allow our computations

  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, []) // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  }); // Loop trough the offsets arrays and execute the operations

  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */


function offset(data, _ref5) {
  var offset = _ref5.offset;
  var placement = data.placement,
      _data$offsets3 = data.offsets,
      popper = _data$offsets3.popper,
      reference = _data$offsets3.reference;
  var basePlacement = placement.split('-')[0];
  var offsets;

  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper); // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken

  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  } // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself


  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification

  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];
  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';
  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed); // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed

  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;
  options.boundaries = boundaries;
  var order = options.priority;
  var popper = data.offsets.popper;
  var check = {
    primary: function primary(placement) {
      var value = popper[placement];

      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }

      return _defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];

      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }

      return _defineProperty({}, mainSide, value);
    }
  };
  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });
  data.offsets.popper = popper;
  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1]; // if shift shiftvariation is specified, run the modifier

  if (shiftvariation) {
    var _data$offsets4 = data.offsets,
        reference = _data$offsets4.reference,
        popper = _data$offsets4.popper;
    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';
    var shiftOffsets = {
      start: _defineProperty({}, side, reference[side]),
      end: _defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };
    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets5 = data.offsets,
      popper = _data$offsets5.popper,
      reference = _data$offsets5.reference;
  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;
  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;
  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);
  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);
  return data;
}
/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */


var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: offset,

    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: preventOverflow,

    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],

    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,

    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: arrow,

    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: flip,

    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: 'flip',

    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,

    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: 'viewport'
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,

    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,

    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: computeStyle,

    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,

    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',

    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: applyStyle,

    /** @prop {Function} */
    onLoad: applyStyleOnLoad,

    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: undefined
  }
};
/**
 * The `dataObject` is an object containing all the information used by Popper.js.
 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overridden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass an object with the same
 * structure of the `options` object, as the 3rd argument. For example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */

var Defaults = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: modifiers
};
/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */
// Utils
// Methods

var Popper =
/*#__PURE__*/
function () {
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as the popper
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    }; // make update() debounced, so that it only runs at most once-per-tick


    this.update = debounce(this.update.bind(this)); // with {} we create a new object with the options inside it

    this.options = _extends({}, Popper.Defaults, options); // init state

    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    }; // get reference and popper elements (allow jQuery wrappers)

    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper; // Deep merge modifiers options

    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    }); // Refactoring modifiers' list (Object => Array)

    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    }) // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    }); // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!

    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    }); // fire the first update to position the popper in the right place

    this.update();
    var eventsEnabled = this.options.eventsEnabled;

    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  } // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  _createClass(Popper, [{
    key: "update",
    value: function update() {
      return _update.call(this);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      return _destroy.call(this);
    }
  }, {
    key: "enableEventListeners",
    value: function enableEventListeners() {
      return _enableEventListeners.call(this);
    }
  }, {
    key: "disableEventListeners",
    value: function disableEventListeners() {
      return _disableEventListeners.call(this);
    }
    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */

    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);

  return Popper;
}();
/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10.
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;
var _default = Popper;
exports.default = _default;
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.1
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */

/* global window, document, define, jQuery, setInterval, clearInterval */
;

(function (factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
})(function ($) {
  'use strict';

  var Slick = window.Slick || {};

  Slick = function () {
    var instanceUid = 0;

    function Slick(element, settings) {
      var _ = this,
          dataSettings;

      _.defaults = {
        accessibility: true,
        adaptiveHeight: false,
        appendArrows: $(element),
        appendDots: $(element),
        arrows: true,
        asNavFor: null,
        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: false,
        autoplaySpeed: 3000,
        centerMode: false,
        centerPadding: '50px',
        cssEase: 'ease',
        customPaging: function customPaging(slider, i) {
          return $('<button type="button" />').text(i + 1);
        },
        dots: false,
        dotsClass: 'slick-dots',
        draggable: true,
        easing: 'linear',
        edgeFriction: 0.35,
        fade: false,
        focusOnSelect: false,
        focusOnChange: false,
        infinite: true,
        initialSlide: 0,
        lazyLoad: 'ondemand',
        mobileFirst: false,
        pauseOnHover: true,
        pauseOnFocus: true,
        pauseOnDotsHover: false,
        respondTo: 'window',
        responsive: null,
        rows: 1,
        rtl: false,
        slide: '',
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: true,
        swipeToSlide: false,
        touchMove: true,
        touchThreshold: 5,
        useCSS: true,
        useTransform: true,
        variableWidth: false,
        vertical: false,
        verticalSwiping: false,
        waitForAnimate: true,
        zIndex: 1000
      };
      _.initials = {
        animating: false,
        dragging: false,
        autoPlayTimer: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        $dots: null,
        listWidth: null,
        listHeight: null,
        loadIndex: 0,
        $nextArrow: null,
        $prevArrow: null,
        scrolling: false,
        slideCount: null,
        slideWidth: null,
        $slideTrack: null,
        $slides: null,
        sliding: false,
        slideOffset: 0,
        swipeLeft: null,
        swiping: false,
        $list: null,
        touchObject: {},
        transformsEnabled: false,
        unslicked: false
      };
      $.extend(_, _.initials);
      _.activeBreakpoint = null;
      _.animType = null;
      _.animProp = null;
      _.breakpoints = [];
      _.breakpointSettings = [];
      _.cssTransitions = false;
      _.focussed = false;
      _.interrupted = false;
      _.hidden = 'hidden';
      _.paused = true;
      _.positionProp = null;
      _.respondTo = null;
      _.rowCount = 1;
      _.shouldClick = true;
      _.$slider = $(element);
      _.$slidesCache = null;
      _.transformType = null;
      _.transitionType = null;
      _.visibilityChange = 'visibilitychange';
      _.windowWidth = 0;
      _.windowTimer = null;
      dataSettings = $(element).data('slick') || {};
      _.options = $.extend({}, _.defaults, settings, dataSettings);
      _.currentSlide = _.options.initialSlide;
      _.originalSettings = _.options;

      if (typeof document.mozHidden !== 'undefined') {
        _.hidden = 'mozHidden';
        _.visibilityChange = 'mozvisibilitychange';
      } else if (typeof document.webkitHidden !== 'undefined') {
        _.hidden = 'webkitHidden';
        _.visibilityChange = 'webkitvisibilitychange';
      }

      _.autoPlay = $.proxy(_.autoPlay, _);
      _.autoPlayClear = $.proxy(_.autoPlayClear, _);
      _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
      _.changeSlide = $.proxy(_.changeSlide, _);
      _.clickHandler = $.proxy(_.clickHandler, _);
      _.selectHandler = $.proxy(_.selectHandler, _);
      _.setPosition = $.proxy(_.setPosition, _);
      _.swipeHandler = $.proxy(_.swipeHandler, _);
      _.dragHandler = $.proxy(_.dragHandler, _);
      _.keyHandler = $.proxy(_.keyHandler, _);
      _.instanceUid = instanceUid++; // A simple way to check for HTML strings
      // Strict HTML recognition (must start with <)
      // Extracted from jQuery v1.11 source

      _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;

      _.registerBreakpoints();

      _.init(true);
    }

    return Slick;
  }();

  Slick.prototype.activateADA = function () {
    var _ = this;

    _.$slideTrack.find('.slick-active').attr({
      'aria-hidden': 'false'
    }).find('a, input, button, select').attr({
      'tabindex': '0'
    });
  };

  Slick.prototype.addSlide = Slick.prototype.slickAdd = function (markup, index, addBefore) {
    var _ = this;

    if (typeof index === 'boolean') {
      addBefore = index;
      index = null;
    } else if (index < 0 || index >= _.slideCount) {
      return false;
    }

    _.unload();

    if (typeof index === 'number') {
      if (index === 0 && _.$slides.length === 0) {
        $(markup).appendTo(_.$slideTrack);
      } else if (addBefore) {
        $(markup).insertBefore(_.$slides.eq(index));
      } else {
        $(markup).insertAfter(_.$slides.eq(index));
      }
    } else {
      if (addBefore === true) {
        $(markup).prependTo(_.$slideTrack);
      } else {
        $(markup).appendTo(_.$slideTrack);
      }
    }

    _.$slides = _.$slideTrack.children(this.options.slide);

    _.$slideTrack.children(this.options.slide).detach();

    _.$slideTrack.append(_.$slides);

    _.$slides.each(function (index, element) {
      $(element).attr('data-slick-index', index);
    });

    _.$slidesCache = _.$slides;

    _.reinit();
  };

  Slick.prototype.animateHeight = function () {
    var _ = this;

    if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
      var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);

      _.$list.animate({
        height: targetHeight
      }, _.options.speed);
    }
  };

  Slick.prototype.animateSlide = function (targetLeft, callback) {
    var animProps = {},
        _ = this;

    _.animateHeight();

    if (_.options.rtl === true && _.options.vertical === false) {
      targetLeft = -targetLeft;
    }

    if (_.transformsEnabled === false) {
      if (_.options.vertical === false) {
        _.$slideTrack.animate({
          left: targetLeft
        }, _.options.speed, _.options.easing, callback);
      } else {
        _.$slideTrack.animate({
          top: targetLeft
        }, _.options.speed, _.options.easing, callback);
      }
    } else {
      if (_.cssTransitions === false) {
        if (_.options.rtl === true) {
          _.currentLeft = -_.currentLeft;
        }

        $({
          animStart: _.currentLeft
        }).animate({
          animStart: targetLeft
        }, {
          duration: _.options.speed,
          easing: _.options.easing,
          step: function step(now) {
            now = Math.ceil(now);

            if (_.options.vertical === false) {
              animProps[_.animType] = 'translate(' + now + 'px, 0px)';

              _.$slideTrack.css(animProps);
            } else {
              animProps[_.animType] = 'translate(0px,' + now + 'px)';

              _.$slideTrack.css(animProps);
            }
          },
          complete: function complete() {
            if (callback) {
              callback.call();
            }
          }
        });
      } else {
        _.applyTransition();

        targetLeft = Math.ceil(targetLeft);

        if (_.options.vertical === false) {
          animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
        } else {
          animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
        }

        _.$slideTrack.css(animProps);

        if (callback) {
          setTimeout(function () {
            _.disableTransition();

            callback.call();
          }, _.options.speed);
        }
      }
    }
  };

  Slick.prototype.getNavTarget = function () {
    var _ = this,
        asNavFor = _.options.asNavFor;

    if (asNavFor && asNavFor !== null) {
      asNavFor = $(asNavFor).not(_.$slider);
    }

    return asNavFor;
  };

  Slick.prototype.asNavFor = function (index) {
    var _ = this,
        asNavFor = _.getNavTarget();

    if (asNavFor !== null && _typeof(asNavFor) === 'object') {
      asNavFor.each(function () {
        var target = $(this).slick('getSlick');

        if (!target.unslicked) {
          target.slideHandler(index, true);
        }
      });
    }
  };

  Slick.prototype.applyTransition = function (slide) {
    var _ = this,
        transition = {};

    if (_.options.fade === false) {
      transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
    } else {
      transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
    }

    if (_.options.fade === false) {
      _.$slideTrack.css(transition);
    } else {
      _.$slides.eq(slide).css(transition);
    }
  };

  Slick.prototype.autoPlay = function () {
    var _ = this;

    _.autoPlayClear();

    if (_.slideCount > _.options.slidesToShow) {
      _.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed);
    }
  };

  Slick.prototype.autoPlayClear = function () {
    var _ = this;

    if (_.autoPlayTimer) {
      clearInterval(_.autoPlayTimer);
    }
  };

  Slick.prototype.autoPlayIterator = function () {
    var _ = this,
        slideTo = _.currentSlide + _.options.slidesToScroll;

    if (!_.paused && !_.interrupted && !_.focussed) {
      if (_.options.infinite === false) {
        if (_.direction === 1 && _.currentSlide + 1 === _.slideCount - 1) {
          _.direction = 0;
        } else if (_.direction === 0) {
          slideTo = _.currentSlide - _.options.slidesToScroll;

          if (_.currentSlide - 1 === 0) {
            _.direction = 1;
          }
        }
      }

      _.slideHandler(slideTo);
    }
  };

  Slick.prototype.buildArrows = function () {
    var _ = this;

    if (_.options.arrows === true) {
      _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
      _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

      if (_.slideCount > _.options.slidesToShow) {
        _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

        _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

        if (_.htmlExpr.test(_.options.prevArrow)) {
          _.$prevArrow.prependTo(_.options.appendArrows);
        }

        if (_.htmlExpr.test(_.options.nextArrow)) {
          _.$nextArrow.appendTo(_.options.appendArrows);
        }

        if (_.options.infinite !== true) {
          _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
        }
      } else {
        _.$prevArrow.add(_.$nextArrow).addClass('slick-hidden').attr({
          'aria-disabled': 'true',
          'tabindex': '-1'
        });
      }
    }
  };

  Slick.prototype.buildDots = function () {
    var _ = this,
        i,
        dot;

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      _.$slider.addClass('slick-dotted');

      dot = $('<ul />').addClass(_.options.dotsClass);

      for (i = 0; i <= _.getDotCount(); i += 1) {
        dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
      }

      _.$dots = dot.appendTo(_.options.appendDots);

      _.$dots.find('li').first().addClass('slick-active');
    }
  };

  Slick.prototype.buildOut = function () {
    var _ = this;

    _.$slides = _.$slider.children(_.options.slide + ':not(.slick-cloned)').addClass('slick-slide');
    _.slideCount = _.$slides.length;

    _.$slides.each(function (index, element) {
      $(element).attr('data-slick-index', index).data('originalStyling', $(element).attr('style') || '');
    });

    _.$slider.addClass('slick-slider');

    _.$slideTrack = _.slideCount === 0 ? $('<div class="slick-track"/>').appendTo(_.$slider) : _.$slides.wrapAll('<div class="slick-track"/>').parent();
    _.$list = _.$slideTrack.wrap('<div class="slick-list"/>').parent();

    _.$slideTrack.css('opacity', 0);

    if (_.options.centerMode === true || _.options.swipeToSlide === true) {
      _.options.slidesToScroll = 1;
    }

    $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

    _.setupInfinite();

    _.buildArrows();

    _.buildDots();

    _.updateDots();

    _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

    if (_.options.draggable === true) {
      _.$list.addClass('draggable');
    }
  };

  Slick.prototype.buildRows = function () {
    var _ = this,
        a,
        b,
        c,
        newSlides,
        numOfSlides,
        originalSlides,
        slidesPerSection;

    newSlides = document.createDocumentFragment();
    originalSlides = _.$slider.children();

    if (_.options.rows > 0) {
      slidesPerSection = _.options.slidesPerRow * _.options.rows;
      numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);

      for (a = 0; a < numOfSlides; a++) {
        var slide = document.createElement('div');

        for (b = 0; b < _.options.rows; b++) {
          var row = document.createElement('div');

          for (c = 0; c < _.options.slidesPerRow; c++) {
            var target = a * slidesPerSection + (b * _.options.slidesPerRow + c);

            if (originalSlides.get(target)) {
              row.appendChild(originalSlides.get(target));
            }
          }

          slide.appendChild(row);
        }

        newSlides.appendChild(slide);
      }

      _.$slider.empty().append(newSlides);

      _.$slider.children().children().children().css({
        'width': 100 / _.options.slidesPerRow + '%',
        'display': 'inline-block'
      });
    }
  };

  Slick.prototype.checkResponsive = function (initial, forceUpdate) {
    var _ = this,
        breakpoint,
        targetBreakpoint,
        respondToWidth,
        triggerBreakpoint = false;

    var sliderWidth = _.$slider.width();

    var windowWidth = window.innerWidth || $(window).width();

    if (_.respondTo === 'window') {
      respondToWidth = windowWidth;
    } else if (_.respondTo === 'slider') {
      respondToWidth = sliderWidth;
    } else if (_.respondTo === 'min') {
      respondToWidth = Math.min(windowWidth, sliderWidth);
    }

    if (_.options.responsive && _.options.responsive.length && _.options.responsive !== null) {
      targetBreakpoint = null;

      for (breakpoint in _.breakpoints) {
        if (_.breakpoints.hasOwnProperty(breakpoint)) {
          if (_.originalSettings.mobileFirst === false) {
            if (respondToWidth < _.breakpoints[breakpoint]) {
              targetBreakpoint = _.breakpoints[breakpoint];
            }
          } else {
            if (respondToWidth > _.breakpoints[breakpoint]) {
              targetBreakpoint = _.breakpoints[breakpoint];
            }
          }
        }
      }

      if (targetBreakpoint !== null) {
        if (_.activeBreakpoint !== null) {
          if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
            _.activeBreakpoint = targetBreakpoint;

            if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
              _.unslick(targetBreakpoint);
            } else {
              _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);

              if (initial === true) {
                _.currentSlide = _.options.initialSlide;
              }

              _.refresh(initial);
            }

            triggerBreakpoint = targetBreakpoint;
          }
        } else {
          _.activeBreakpoint = targetBreakpoint;

          if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
            _.unslick(targetBreakpoint);
          } else {
            _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);

            if (initial === true) {
              _.currentSlide = _.options.initialSlide;
            }

            _.refresh(initial);
          }

          triggerBreakpoint = targetBreakpoint;
        }
      } else {
        if (_.activeBreakpoint !== null) {
          _.activeBreakpoint = null;
          _.options = _.originalSettings;

          if (initial === true) {
            _.currentSlide = _.options.initialSlide;
          }

          _.refresh(initial);

          triggerBreakpoint = targetBreakpoint;
        }
      } // only trigger breakpoints during an actual break. not on initialize.


      if (!initial && triggerBreakpoint !== false) {
        _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
      }
    }
  };

  Slick.prototype.changeSlide = function (event, dontAnimate) {
    var _ = this,
        $target = $(event.currentTarget),
        indexOffset,
        slideOffset,
        unevenOffset; // If target is a link, prevent default action.


    if ($target.is('a')) {
      event.preventDefault();
    } // If target is not the <li> element (ie: a child), find the <li>.


    if (!$target.is('li')) {
      $target = $target.closest('li');
    }

    unevenOffset = _.slideCount % _.options.slidesToScroll !== 0;
    indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

    switch (event.data.message) {
      case 'previous':
        slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;

        if (_.slideCount > _.options.slidesToShow) {
          _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
        }

        break;

      case 'next':
        slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;

        if (_.slideCount > _.options.slidesToShow) {
          _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
        }

        break;

      case 'index':
        var index = event.data.index === 0 ? 0 : event.data.index || $target.index() * _.options.slidesToScroll;

        _.slideHandler(_.checkNavigable(index), false, dontAnimate);

        $target.children().trigger('focus');
        break;

      default:
        return;
    }
  };

  Slick.prototype.checkNavigable = function (index) {
    var _ = this,
        navigables,
        prevNavigable;

    navigables = _.getNavigableIndexes();
    prevNavigable = 0;

    if (index > navigables[navigables.length - 1]) {
      index = navigables[navigables.length - 1];
    } else {
      for (var n in navigables) {
        if (index < navigables[n]) {
          index = prevNavigable;
          break;
        }

        prevNavigable = navigables[n];
      }
    }

    return index;
  };

  Slick.prototype.cleanUpEvents = function () {
    var _ = this;

    if (_.options.dots && _.$dots !== null) {
      $('li', _.$dots).off('click.slick', _.changeSlide).off('mouseenter.slick', $.proxy(_.interrupt, _, true)).off('mouseleave.slick', $.proxy(_.interrupt, _, false));

      if (_.options.accessibility === true) {
        _.$dots.off('keydown.slick', _.keyHandler);
      }
    }

    _.$slider.off('focus.slick blur.slick');

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
      _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

      if (_.options.accessibility === true) {
        _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
        _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
      }
    }

    _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);

    _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);

    _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);

    _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

    _.$list.off('click.slick', _.clickHandler);

    $(document).off(_.visibilityChange, _.visibility);

    _.cleanUpSlideEvents();

    if (_.options.accessibility === true) {
      _.$list.off('keydown.slick', _.keyHandler);
    }

    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().off('click.slick', _.selectHandler);
    }

    $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);
    $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);
    $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);
    $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
  };

  Slick.prototype.cleanUpSlideEvents = function () {
    var _ = this;

    _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));

    _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));
  };

  Slick.prototype.cleanUpRows = function () {
    var _ = this,
        originalSlides;

    if (_.options.rows > 0) {
      originalSlides = _.$slides.children().children();
      originalSlides.removeAttr('style');

      _.$slider.empty().append(originalSlides);
    }
  };

  Slick.prototype.clickHandler = function (event) {
    var _ = this;

    if (_.shouldClick === false) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();
    }
  };

  Slick.prototype.destroy = function (refresh) {
    var _ = this;

    _.autoPlayClear();

    _.touchObject = {};

    _.cleanUpEvents();

    $('.slick-cloned', _.$slider).detach();

    if (_.$dots) {
      _.$dots.remove();
    }

    if (_.$prevArrow && _.$prevArrow.length) {
      _.$prevArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');

      if (_.htmlExpr.test(_.options.prevArrow)) {
        _.$prevArrow.remove();
      }
    }

    if (_.$nextArrow && _.$nextArrow.length) {
      _.$nextArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');

      if (_.htmlExpr.test(_.options.nextArrow)) {
        _.$nextArrow.remove();
      }
    }

    if (_.$slides) {
      _.$slides.removeClass('slick-slide slick-active slick-center slick-visible slick-current').removeAttr('aria-hidden').removeAttr('data-slick-index').each(function () {
        $(this).attr('style', $(this).data('originalStyling'));
      });

      _.$slideTrack.children(this.options.slide).detach();

      _.$slideTrack.detach();

      _.$list.detach();

      _.$slider.append(_.$slides);
    }

    _.cleanUpRows();

    _.$slider.removeClass('slick-slider');

    _.$slider.removeClass('slick-initialized');

    _.$slider.removeClass('slick-dotted');

    _.unslicked = true;

    if (!refresh) {
      _.$slider.trigger('destroy', [_]);
    }
  };

  Slick.prototype.disableTransition = function (slide) {
    var _ = this,
        transition = {};

    transition[_.transitionType] = '';

    if (_.options.fade === false) {
      _.$slideTrack.css(transition);
    } else {
      _.$slides.eq(slide).css(transition);
    }
  };

  Slick.prototype.fadeSlide = function (slideIndex, callback) {
    var _ = this;

    if (_.cssTransitions === false) {
      _.$slides.eq(slideIndex).css({
        zIndex: _.options.zIndex
      });

      _.$slides.eq(slideIndex).animate({
        opacity: 1
      }, _.options.speed, _.options.easing, callback);
    } else {
      _.applyTransition(slideIndex);

      _.$slides.eq(slideIndex).css({
        opacity: 1,
        zIndex: _.options.zIndex
      });

      if (callback) {
        setTimeout(function () {
          _.disableTransition(slideIndex);

          callback.call();
        }, _.options.speed);
      }
    }
  };

  Slick.prototype.fadeSlideOut = function (slideIndex) {
    var _ = this;

    if (_.cssTransitions === false) {
      _.$slides.eq(slideIndex).animate({
        opacity: 0,
        zIndex: _.options.zIndex - 2
      }, _.options.speed, _.options.easing);
    } else {
      _.applyTransition(slideIndex);

      _.$slides.eq(slideIndex).css({
        opacity: 0,
        zIndex: _.options.zIndex - 2
      });
    }
  };

  Slick.prototype.filterSlides = Slick.prototype.slickFilter = function (filter) {
    var _ = this;

    if (filter !== null) {
      _.$slidesCache = _.$slides;

      _.unload();

      _.$slideTrack.children(this.options.slide).detach();

      _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

      _.reinit();
    }
  };

  Slick.prototype.focusHandler = function () {
    var _ = this;

    _.$slider.off('focus.slick blur.slick').on('focus.slick blur.slick', '*', function (event) {
      event.stopImmediatePropagation();
      var $sf = $(this);
      setTimeout(function () {
        if (_.options.pauseOnFocus) {
          _.focussed = $sf.is(':focus');

          _.autoPlay();
        }
      }, 0);
    });
  };

  Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function () {
    var _ = this;

    return _.currentSlide;
  };

  Slick.prototype.getDotCount = function () {
    var _ = this;

    var breakPoint = 0;
    var counter = 0;
    var pagerQty = 0;

    if (_.options.infinite === true) {
      if (_.slideCount <= _.options.slidesToShow) {
        ++pagerQty;
      } else {
        while (breakPoint < _.slideCount) {
          ++pagerQty;
          breakPoint = counter + _.options.slidesToScroll;
          counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }
      }
    } else if (_.options.centerMode === true) {
      pagerQty = _.slideCount;
    } else if (!_.options.asNavFor) {
      pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
    } else {
      while (breakPoint < _.slideCount) {
        ++pagerQty;
        breakPoint = counter + _.options.slidesToScroll;
        counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
      }
    }

    return pagerQty - 1;
  };

  Slick.prototype.getLeft = function (slideIndex) {
    var _ = this,
        targetLeft,
        verticalHeight,
        verticalOffset = 0,
        targetSlide,
        coef;

    _.slideOffset = 0;
    verticalHeight = _.$slides.first().outerHeight(true);

    if (_.options.infinite === true) {
      if (_.slideCount > _.options.slidesToShow) {
        _.slideOffset = _.slideWidth * _.options.slidesToShow * -1;
        coef = -1;

        if (_.options.vertical === true && _.options.centerMode === true) {
          if (_.options.slidesToShow === 2) {
            coef = -1.5;
          } else if (_.options.slidesToShow === 1) {
            coef = -2;
          }
        }

        verticalOffset = verticalHeight * _.options.slidesToShow * coef;
      }

      if (_.slideCount % _.options.slidesToScroll !== 0) {
        if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
          if (slideIndex > _.slideCount) {
            _.slideOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth * -1;
            verticalOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight * -1;
          } else {
            _.slideOffset = _.slideCount % _.options.slidesToScroll * _.slideWidth * -1;
            verticalOffset = _.slideCount % _.options.slidesToScroll * verticalHeight * -1;
          }
        }
      }
    } else {
      if (slideIndex + _.options.slidesToShow > _.slideCount) {
        _.slideOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * _.slideWidth;
        verticalOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * verticalHeight;
      }
    }

    if (_.slideCount <= _.options.slidesToShow) {
      _.slideOffset = 0;
      verticalOffset = 0;
    }

    if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
      _.slideOffset = _.slideWidth * Math.floor(_.options.slidesToShow) / 2 - _.slideWidth * _.slideCount / 2;
    } else if (_.options.centerMode === true && _.options.infinite === true) {
      _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
    } else if (_.options.centerMode === true) {
      _.slideOffset = 0;
      _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
    }

    if (_.options.vertical === false) {
      targetLeft = slideIndex * _.slideWidth * -1 + _.slideOffset;
    } else {
      targetLeft = slideIndex * verticalHeight * -1 + verticalOffset;
    }

    if (_.options.variableWidth === true) {
      if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
        targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
      } else {
        targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
      }

      if (_.options.rtl === true) {
        if (targetSlide[0]) {
          targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
        } else {
          targetLeft = 0;
        }
      } else {
        targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
      }

      if (_.options.centerMode === true) {
        if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
          targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
        } else {
          targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
        }

        if (_.options.rtl === true) {
          if (targetSlide[0]) {
            targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
          } else {
            targetLeft = 0;
          }
        } else {
          targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
        }

        targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
      }
    }

    return targetLeft;
  };

  Slick.prototype.getOption = Slick.prototype.slickGetOption = function (option) {
    var _ = this;

    return _.options[option];
  };

  Slick.prototype.getNavigableIndexes = function () {
    var _ = this,
        breakPoint = 0,
        counter = 0,
        indexes = [],
        max;

    if (_.options.infinite === false) {
      max = _.slideCount;
    } else {
      breakPoint = _.options.slidesToScroll * -1;
      counter = _.options.slidesToScroll * -1;
      max = _.slideCount * 2;
    }

    while (breakPoint < max) {
      indexes.push(breakPoint);
      breakPoint = counter + _.options.slidesToScroll;
      counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
    }

    return indexes;
  };

  Slick.prototype.getSlick = function () {
    return this;
  };

  Slick.prototype.getSlideCount = function () {
    var _ = this,
        slidesTraversed,
        swipedSlide,
        centerOffset;

    centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

    if (_.options.swipeToSlide === true) {
      _.$slideTrack.find('.slick-slide').each(function (index, slide) {
        if (slide.offsetLeft - centerOffset + $(slide).outerWidth() / 2 > _.swipeLeft * -1) {
          swipedSlide = slide;
          return false;
        }
      });

      slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;
      return slidesTraversed;
    } else {
      return _.options.slidesToScroll;
    }
  };

  Slick.prototype.goTo = Slick.prototype.slickGoTo = function (slide, dontAnimate) {
    var _ = this;

    _.changeSlide({
      data: {
        message: 'index',
        index: parseInt(slide)
      }
    }, dontAnimate);
  };

  Slick.prototype.init = function (creation) {
    var _ = this;

    if (!$(_.$slider).hasClass('slick-initialized')) {
      $(_.$slider).addClass('slick-initialized');

      _.buildRows();

      _.buildOut();

      _.setProps();

      _.startLoad();

      _.loadSlider();

      _.initializeEvents();

      _.updateArrows();

      _.updateDots();

      _.checkResponsive(true);

      _.focusHandler();
    }

    if (creation) {
      _.$slider.trigger('init', [_]);
    }

    if (_.options.accessibility === true) {
      _.initADA();
    }

    if (_.options.autoplay) {
      _.paused = false;

      _.autoPlay();
    }
  };

  Slick.prototype.initADA = function () {
    var _ = this,
        numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
        tabControlIndexes = _.getNavigableIndexes().filter(function (val) {
      return val >= 0 && val < _.slideCount;
    });

    _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
      'aria-hidden': 'true',
      'tabindex': '-1'
    }).find('a, input, button, select').attr({
      'tabindex': '-1'
    });

    if (_.$dots !== null) {
      _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function (i) {
        var slideControlIndex = tabControlIndexes.indexOf(i);
        $(this).attr({
          'role': 'tabpanel',
          'id': 'slick-slide' + _.instanceUid + i,
          'tabindex': -1
        });

        if (slideControlIndex !== -1) {
          var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex;

          if ($('#' + ariaButtonControl).length) {
            $(this).attr({
              'aria-describedby': ariaButtonControl
            });
          }
        }
      });

      _.$dots.attr('role', 'tablist').find('li').each(function (i) {
        var mappedSlideIndex = tabControlIndexes[i];
        $(this).attr({
          'role': 'presentation'
        });
        $(this).find('button').first().attr({
          'role': 'tab',
          'id': 'slick-slide-control' + _.instanceUid + i,
          'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
          'aria-label': i + 1 + ' of ' + numDotGroups,
          'aria-selected': null,
          'tabindex': '-1'
        });
      }).eq(_.currentSlide).find('button').attr({
        'aria-selected': 'true',
        'tabindex': '0'
      }).end();
    }

    for (var i = _.currentSlide, max = i + _.options.slidesToShow; i < max; i++) {
      if (_.options.focusOnChange) {
        _.$slides.eq(i).attr({
          'tabindex': '0'
        });
      } else {
        _.$slides.eq(i).removeAttr('tabindex');
      }
    }

    _.activateADA();
  };

  Slick.prototype.initArrowEvents = function () {
    var _ = this;

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.off('click.slick').on('click.slick', {
        message: 'previous'
      }, _.changeSlide);

      _.$nextArrow.off('click.slick').on('click.slick', {
        message: 'next'
      }, _.changeSlide);

      if (_.options.accessibility === true) {
        _.$prevArrow.on('keydown.slick', _.keyHandler);

        _.$nextArrow.on('keydown.slick', _.keyHandler);
      }
    }
  };

  Slick.prototype.initDotEvents = function () {
    var _ = this;

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      $('li', _.$dots).on('click.slick', {
        message: 'index'
      }, _.changeSlide);

      if (_.options.accessibility === true) {
        _.$dots.on('keydown.slick', _.keyHandler);
      }
    }

    if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {
      $('li', _.$dots).on('mouseenter.slick', $.proxy(_.interrupt, _, true)).on('mouseleave.slick', $.proxy(_.interrupt, _, false));
    }
  };

  Slick.prototype.initSlideEvents = function () {
    var _ = this;

    if (_.options.pauseOnHover) {
      _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));

      _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));
    }
  };

  Slick.prototype.initializeEvents = function () {
    var _ = this;

    _.initArrowEvents();

    _.initDotEvents();

    _.initSlideEvents();

    _.$list.on('touchstart.slick mousedown.slick', {
      action: 'start'
    }, _.swipeHandler);

    _.$list.on('touchmove.slick mousemove.slick', {
      action: 'move'
    }, _.swipeHandler);

    _.$list.on('touchend.slick mouseup.slick', {
      action: 'end'
    }, _.swipeHandler);

    _.$list.on('touchcancel.slick mouseleave.slick', {
      action: 'end'
    }, _.swipeHandler);

    _.$list.on('click.slick', _.clickHandler);

    $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

    if (_.options.accessibility === true) {
      _.$list.on('keydown.slick', _.keyHandler);
    }

    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().on('click.slick', _.selectHandler);
    }

    $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));
    $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));
    $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);
    $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
    $(_.setPosition);
  };

  Slick.prototype.initUI = function () {
    var _ = this;

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.show();

      _.$nextArrow.show();
    }

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      _.$dots.show();
    }
  };

  Slick.prototype.keyHandler = function (event) {
    var _ = this; //Dont slide if the cursor is inside the form fields and arrow keys are pressed


    if (!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
      if (event.keyCode === 37 && _.options.accessibility === true) {
        _.changeSlide({
          data: {
            message: _.options.rtl === true ? 'next' : 'previous'
          }
        });
      } else if (event.keyCode === 39 && _.options.accessibility === true) {
        _.changeSlide({
          data: {
            message: _.options.rtl === true ? 'previous' : 'next'
          }
        });
      }
    }
  };

  Slick.prototype.lazyLoad = function () {
    var _ = this,
        loadRange,
        cloneRange,
        rangeStart,
        rangeEnd;

    function loadImages(imagesScope) {
      $('img[data-lazy]', imagesScope).each(function () {
        var image = $(this),
            imageSource = $(this).attr('data-lazy'),
            imageSrcSet = $(this).attr('data-srcset'),
            imageSizes = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
            imageToLoad = document.createElement('img');

        imageToLoad.onload = function () {
          image.animate({
            opacity: 0
          }, 100, function () {
            if (imageSrcSet) {
              image.attr('srcset', imageSrcSet);

              if (imageSizes) {
                image.attr('sizes', imageSizes);
              }
            }

            image.attr('src', imageSource).animate({
              opacity: 1
            }, 200, function () {
              image.removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');
            });

            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
          });
        };

        imageToLoad.onerror = function () {
          image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

          _.$slider.trigger('lazyLoadError', [_, image, imageSource]);
        };

        imageToLoad.src = imageSource;
      });
    }

    if (_.options.centerMode === true) {
      if (_.options.infinite === true) {
        rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
        rangeEnd = rangeStart + _.options.slidesToShow + 2;
      } else {
        rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
        rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
      }
    } else {
      rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
      rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);

      if (_.options.fade === true) {
        if (rangeStart > 0) rangeStart--;
        if (rangeEnd <= _.slideCount) rangeEnd++;
      }
    }

    loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

    if (_.options.lazyLoad === 'anticipated') {
      var prevSlide = rangeStart - 1,
          nextSlide = rangeEnd,
          $slides = _.$slider.find('.slick-slide');

      for (var i = 0; i < _.options.slidesToScroll; i++) {
        if (prevSlide < 0) prevSlide = _.slideCount - 1;
        loadRange = loadRange.add($slides.eq(prevSlide));
        loadRange = loadRange.add($slides.eq(nextSlide));
        prevSlide--;
        nextSlide++;
      }
    }

    loadImages(loadRange);

    if (_.slideCount <= _.options.slidesToShow) {
      cloneRange = _.$slider.find('.slick-slide');
      loadImages(cloneRange);
    } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
      cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
      loadImages(cloneRange);
    } else if (_.currentSlide === 0) {
      cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
      loadImages(cloneRange);
    }
  };

  Slick.prototype.loadSlider = function () {
    var _ = this;

    _.setPosition();

    _.$slideTrack.css({
      opacity: 1
    });

    _.$slider.removeClass('slick-loading');

    _.initUI();

    if (_.options.lazyLoad === 'progressive') {
      _.progressiveLazyLoad();
    }
  };

  Slick.prototype.next = Slick.prototype.slickNext = function () {
    var _ = this;

    _.changeSlide({
      data: {
        message: 'next'
      }
    });
  };

  Slick.prototype.orientationChange = function () {
    var _ = this;

    _.checkResponsive();

    _.setPosition();
  };

  Slick.prototype.pause = Slick.prototype.slickPause = function () {
    var _ = this;

    _.autoPlayClear();

    _.paused = true;
  };

  Slick.prototype.play = Slick.prototype.slickPlay = function () {
    var _ = this;

    _.autoPlay();

    _.options.autoplay = true;
    _.paused = false;
    _.focussed = false;
    _.interrupted = false;
  };

  Slick.prototype.postSlide = function (index) {
    var _ = this;

    if (!_.unslicked) {
      _.$slider.trigger('afterChange', [_, index]);

      _.animating = false;

      if (_.slideCount > _.options.slidesToShow) {
        _.setPosition();
      }

      _.swipeLeft = null;

      if (_.options.autoplay) {
        _.autoPlay();
      }

      if (_.options.accessibility === true) {
        _.initADA();

        if (_.options.focusOnChange) {
          var $currentSlide = $(_.$slides.get(_.currentSlide));
          $currentSlide.attr('tabindex', 0).focus();
        }
      }
    }
  };

  Slick.prototype.prev = Slick.prototype.slickPrev = function () {
    var _ = this;

    _.changeSlide({
      data: {
        message: 'previous'
      }
    });
  };

  Slick.prototype.preventDefault = function (event) {
    event.preventDefault();
  };

  Slick.prototype.progressiveLazyLoad = function (tryCount) {
    tryCount = tryCount || 1;

    var _ = this,
        $imgsToLoad = $('img[data-lazy]', _.$slider),
        image,
        imageSource,
        imageSrcSet,
        imageSizes,
        imageToLoad;

    if ($imgsToLoad.length) {
      image = $imgsToLoad.first();
      imageSource = image.attr('data-lazy');
      imageSrcSet = image.attr('data-srcset');
      imageSizes = image.attr('data-sizes') || _.$slider.attr('data-sizes');
      imageToLoad = document.createElement('img');

      imageToLoad.onload = function () {
        if (imageSrcSet) {
          image.attr('srcset', imageSrcSet);

          if (imageSizes) {
            image.attr('sizes', imageSizes);
          }
        }

        image.attr('src', imageSource).removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');

        if (_.options.adaptiveHeight === true) {
          _.setPosition();
        }

        _.$slider.trigger('lazyLoaded', [_, image, imageSource]);

        _.progressiveLazyLoad();
      };

      imageToLoad.onerror = function () {
        if (tryCount < 3) {
          /**
           * try to load the image 3 times,
           * leave a slight delay so we don't get
           * servers blocking the request.
           */
          setTimeout(function () {
            _.progressiveLazyLoad(tryCount + 1);
          }, 500);
        } else {
          image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

          _.$slider.trigger('lazyLoadError', [_, image, imageSource]);

          _.progressiveLazyLoad();
        }
      };

      imageToLoad.src = imageSource;
    } else {
      _.$slider.trigger('allImagesLoaded', [_]);
    }
  };

  Slick.prototype.refresh = function (initializing) {
    var _ = this,
        currentSlide,
        lastVisibleIndex;

    lastVisibleIndex = _.slideCount - _.options.slidesToShow; // in non-infinite sliders, we don't want to go past the
    // last visible index.

    if (!_.options.infinite && _.currentSlide > lastVisibleIndex) {
      _.currentSlide = lastVisibleIndex;
    } // if less slides than to show, go to start.


    if (_.slideCount <= _.options.slidesToShow) {
      _.currentSlide = 0;
    }

    currentSlide = _.currentSlide;

    _.destroy(true);

    $.extend(_, _.initials, {
      currentSlide: currentSlide
    });

    _.init();

    if (!initializing) {
      _.changeSlide({
        data: {
          message: 'index',
          index: currentSlide
        }
      }, false);
    }
  };

  Slick.prototype.registerBreakpoints = function () {
    var _ = this,
        breakpoint,
        currentBreakpoint,
        l,
        responsiveSettings = _.options.responsive || null;

    if ($.type(responsiveSettings) === 'array' && responsiveSettings.length) {
      _.respondTo = _.options.respondTo || 'window';

      for (breakpoint in responsiveSettings) {
        l = _.breakpoints.length - 1;

        if (responsiveSettings.hasOwnProperty(breakpoint)) {
          currentBreakpoint = responsiveSettings[breakpoint].breakpoint; // loop through the breakpoints and cut out any existing
          // ones with the same breakpoint number, we don't want dupes.

          while (l >= 0) {
            if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
              _.breakpoints.splice(l, 1);
            }

            l--;
          }

          _.breakpoints.push(currentBreakpoint);

          _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
        }
      }

      _.breakpoints.sort(function (a, b) {
        return _.options.mobileFirst ? a - b : b - a;
      });
    }
  };

  Slick.prototype.reinit = function () {
    var _ = this;

    _.$slides = _.$slideTrack.children(_.options.slide).addClass('slick-slide');
    _.slideCount = _.$slides.length;

    if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
      _.currentSlide = _.currentSlide - _.options.slidesToScroll;
    }

    if (_.slideCount <= _.options.slidesToShow) {
      _.currentSlide = 0;
    }

    _.registerBreakpoints();

    _.setProps();

    _.setupInfinite();

    _.buildArrows();

    _.updateArrows();

    _.initArrowEvents();

    _.buildDots();

    _.updateDots();

    _.initDotEvents();

    _.cleanUpSlideEvents();

    _.initSlideEvents();

    _.checkResponsive(false, true);

    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().on('click.slick', _.selectHandler);
    }

    _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

    _.setPosition();

    _.focusHandler();

    _.paused = !_.options.autoplay;

    _.autoPlay();

    _.$slider.trigger('reInit', [_]);
  };

  Slick.prototype.resize = function () {
    var _ = this;

    if ($(window).width() !== _.windowWidth) {
      clearTimeout(_.windowDelay);
      _.windowDelay = window.setTimeout(function () {
        _.windowWidth = $(window).width();

        _.checkResponsive();

        if (!_.unslicked) {
          _.setPosition();
        }
      }, 50);
    }
  };

  Slick.prototype.removeSlide = Slick.prototype.slickRemove = function (index, removeBefore, removeAll) {
    var _ = this;

    if (typeof index === 'boolean') {
      removeBefore = index;
      index = removeBefore === true ? 0 : _.slideCount - 1;
    } else {
      index = removeBefore === true ? --index : index;
    }

    if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
      return false;
    }

    _.unload();

    if (removeAll === true) {
      _.$slideTrack.children().remove();
    } else {
      _.$slideTrack.children(this.options.slide).eq(index).remove();
    }

    _.$slides = _.$slideTrack.children(this.options.slide);

    _.$slideTrack.children(this.options.slide).detach();

    _.$slideTrack.append(_.$slides);

    _.$slidesCache = _.$slides;

    _.reinit();
  };

  Slick.prototype.setCSS = function (position) {
    var _ = this,
        positionProps = {},
        x,
        y;

    if (_.options.rtl === true) {
      position = -position;
    }

    x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
    y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';
    positionProps[_.positionProp] = position;

    if (_.transformsEnabled === false) {
      _.$slideTrack.css(positionProps);
    } else {
      positionProps = {};

      if (_.cssTransitions === false) {
        positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';

        _.$slideTrack.css(positionProps);
      } else {
        positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';

        _.$slideTrack.css(positionProps);
      }
    }
  };

  Slick.prototype.setDimensions = function () {
    var _ = this;

    if (_.options.vertical === false) {
      if (_.options.centerMode === true) {
        _.$list.css({
          padding: '0px ' + _.options.centerPadding
        });
      }
    } else {
      _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);

      if (_.options.centerMode === true) {
        _.$list.css({
          padding: _.options.centerPadding + ' 0px'
        });
      }
    }

    _.listWidth = _.$list.width();
    _.listHeight = _.$list.height();

    if (_.options.vertical === false && _.options.variableWidth === false) {
      _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);

      _.$slideTrack.width(Math.ceil(_.slideWidth * _.$slideTrack.children('.slick-slide').length));
    } else if (_.options.variableWidth === true) {
      _.$slideTrack.width(5000 * _.slideCount);
    } else {
      _.slideWidth = Math.ceil(_.listWidth);

      _.$slideTrack.height(Math.ceil(_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length));
    }

    var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();

    if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);
  };

  Slick.prototype.setFade = function () {
    var _ = this,
        targetLeft;

    _.$slides.each(function (index, element) {
      targetLeft = _.slideWidth * index * -1;

      if (_.options.rtl === true) {
        $(element).css({
          position: 'relative',
          right: targetLeft,
          top: 0,
          zIndex: _.options.zIndex - 2,
          opacity: 0
        });
      } else {
        $(element).css({
          position: 'relative',
          left: targetLeft,
          top: 0,
          zIndex: _.options.zIndex - 2,
          opacity: 0
        });
      }
    });

    _.$slides.eq(_.currentSlide).css({
      zIndex: _.options.zIndex - 1,
      opacity: 1
    });
  };

  Slick.prototype.setHeight = function () {
    var _ = this;

    if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
      var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);

      _.$list.css('height', targetHeight);
    }
  };

  Slick.prototype.setOption = Slick.prototype.slickSetOption = function () {
    /**
     * accepts arguments in format of:
     *
     *  - for changing a single option's value:
     *     .slick("setOption", option, value, refresh )
     *
     *  - for changing a set of responsive options:
     *     .slick("setOption", 'responsive', [{}, ...], refresh )
     *
     *  - for updating multiple values at once (not responsive)
     *     .slick("setOption", { 'option': value, ... }, refresh )
     */
    var _ = this,
        l,
        item,
        option,
        value,
        refresh = false,
        type;

    if ($.type(arguments[0]) === 'object') {
      option = arguments[0];
      refresh = arguments[1];
      type = 'multiple';
    } else if ($.type(arguments[0]) === 'string') {
      option = arguments[0];
      value = arguments[1];
      refresh = arguments[2];

      if (arguments[0] === 'responsive' && $.type(arguments[1]) === 'array') {
        type = 'responsive';
      } else if (typeof arguments[1] !== 'undefined') {
        type = 'single';
      }
    }

    if (type === 'single') {
      _.options[option] = value;
    } else if (type === 'multiple') {
      $.each(option, function (opt, val) {
        _.options[opt] = val;
      });
    } else if (type === 'responsive') {
      for (item in value) {
        if ($.type(_.options.responsive) !== 'array') {
          _.options.responsive = [value[item]];
        } else {
          l = _.options.responsive.length - 1; // loop through the responsive object and splice out duplicates.

          while (l >= 0) {
            if (_.options.responsive[l].breakpoint === value[item].breakpoint) {
              _.options.responsive.splice(l, 1);
            }

            l--;
          }

          _.options.responsive.push(value[item]);
        }
      }
    }

    if (refresh) {
      _.unload();

      _.reinit();
    }
  };

  Slick.prototype.setPosition = function () {
    var _ = this;

    _.setDimensions();

    _.setHeight();

    if (_.options.fade === false) {
      _.setCSS(_.getLeft(_.currentSlide));
    } else {
      _.setFade();
    }

    _.$slider.trigger('setPosition', [_]);
  };

  Slick.prototype.setProps = function () {
    var _ = this,
        bodyStyle = document.body.style;

    _.positionProp = _.options.vertical === true ? 'top' : 'left';

    if (_.positionProp === 'top') {
      _.$slider.addClass('slick-vertical');
    } else {
      _.$slider.removeClass('slick-vertical');
    }

    if (bodyStyle.WebkitTransition !== undefined || bodyStyle.MozTransition !== undefined || bodyStyle.msTransition !== undefined) {
      if (_.options.useCSS === true) {
        _.cssTransitions = true;
      }
    }

    if (_.options.fade) {
      if (typeof _.options.zIndex === 'number') {
        if (_.options.zIndex < 3) {
          _.options.zIndex = 3;
        }
      } else {
        _.options.zIndex = _.defaults.zIndex;
      }
    }

    if (bodyStyle.OTransform !== undefined) {
      _.animType = 'OTransform';
      _.transformType = '-o-transform';
      _.transitionType = 'OTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
    }

    if (bodyStyle.MozTransform !== undefined) {
      _.animType = 'MozTransform';
      _.transformType = '-moz-transform';
      _.transitionType = 'MozTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
    }

    if (bodyStyle.webkitTransform !== undefined) {
      _.animType = 'webkitTransform';
      _.transformType = '-webkit-transform';
      _.transitionType = 'webkitTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
    }

    if (bodyStyle.msTransform !== undefined) {
      _.animType = 'msTransform';
      _.transformType = '-ms-transform';
      _.transitionType = 'msTransition';
      if (bodyStyle.msTransform === undefined) _.animType = false;
    }

    if (bodyStyle.transform !== undefined && _.animType !== false) {
      _.animType = 'transform';
      _.transformType = 'transform';
      _.transitionType = 'transition';
    }

    _.transformsEnabled = _.options.useTransform && _.animType !== null && _.animType !== false;
  };

  Slick.prototype.setSlideClasses = function (index) {
    var _ = this,
        centerOffset,
        allSlides,
        indexOffset,
        remainder;

    allSlides = _.$slider.find('.slick-slide').removeClass('slick-active slick-center slick-current').attr('aria-hidden', 'true');

    _.$slides.eq(index).addClass('slick-current');

    if (_.options.centerMode === true) {
      var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;
      centerOffset = Math.floor(_.options.slidesToShow / 2);

      if (_.options.infinite === true) {
        if (index >= centerOffset && index <= _.slideCount - 1 - centerOffset) {
          _.$slides.slice(index - centerOffset + evenCoef, index + centerOffset + 1).addClass('slick-active').attr('aria-hidden', 'false');
        } else {
          indexOffset = _.options.slidesToShow + index;
          allSlides.slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2).addClass('slick-active').attr('aria-hidden', 'false');
        }

        if (index === 0) {
          allSlides.eq(allSlides.length - 1 - _.options.slidesToShow).addClass('slick-center');
        } else if (index === _.slideCount - 1) {
          allSlides.eq(_.options.slidesToShow).addClass('slick-center');
        }
      }

      _.$slides.eq(index).addClass('slick-center');
    } else {
      if (index >= 0 && index <= _.slideCount - _.options.slidesToShow) {
        _.$slides.slice(index, index + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
      } else if (allSlides.length <= _.options.slidesToShow) {
        allSlides.addClass('slick-active').attr('aria-hidden', 'false');
      } else {
        remainder = _.slideCount % _.options.slidesToShow;
        indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

        if (_.options.slidesToShow == _.options.slidesToScroll && _.slideCount - index < _.options.slidesToShow) {
          allSlides.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder).addClass('slick-active').attr('aria-hidden', 'false');
        } else {
          allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
        }
      }
    }

    if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
      _.lazyLoad();
    }
  };

  Slick.prototype.setupInfinite = function () {
    var _ = this,
        i,
        slideIndex,
        infiniteCount;

    if (_.options.fade === true) {
      _.options.centerMode = false;
    }

    if (_.options.infinite === true && _.options.fade === false) {
      slideIndex = null;

      if (_.slideCount > _.options.slidesToShow) {
        if (_.options.centerMode === true) {
          infiniteCount = _.options.slidesToShow + 1;
        } else {
          infiniteCount = _.options.slidesToShow;
        }

        for (i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) {
          slideIndex = i - 1;
          $(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex - _.slideCount).prependTo(_.$slideTrack).addClass('slick-cloned');
        }

        for (i = 0; i < infiniteCount + _.slideCount; i += 1) {
          slideIndex = i;
          $(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex + _.slideCount).appendTo(_.$slideTrack).addClass('slick-cloned');
        }

        _.$slideTrack.find('.slick-cloned').find('[id]').each(function () {
          $(this).attr('id', '');
        });
      }
    }
  };

  Slick.prototype.interrupt = function (toggle) {
    var _ = this;

    if (!toggle) {
      _.autoPlay();
    }

    _.interrupted = toggle;
  };

  Slick.prototype.selectHandler = function (event) {
    var _ = this;

    var targetElement = $(event.target).is('.slick-slide') ? $(event.target) : $(event.target).parents('.slick-slide');
    var index = parseInt(targetElement.attr('data-slick-index'));
    if (!index) index = 0;

    if (_.slideCount <= _.options.slidesToShow) {
      _.slideHandler(index, false, true);

      return;
    }

    _.slideHandler(index);
  };

  Slick.prototype.slideHandler = function (index, sync, dontAnimate) {
    var targetSlide,
        animSlide,
        oldSlide,
        slideLeft,
        targetLeft = null,
        _ = this,
        navTarget;

    sync = sync || false;

    if (_.animating === true && _.options.waitForAnimate === true) {
      return;
    }

    if (_.options.fade === true && _.currentSlide === index) {
      return;
    }

    if (sync === false) {
      _.asNavFor(index);
    }

    targetSlide = index;
    targetLeft = _.getLeft(targetSlide);
    slideLeft = _.getLeft(_.currentSlide);
    _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

    if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
      if (_.options.fade === false) {
        targetSlide = _.currentSlide;

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
          _.animateSlide(slideLeft, function () {
            _.postSlide(targetSlide);
          });
        } else {
          _.postSlide(targetSlide);
        }
      }

      return;
    } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > _.slideCount - _.options.slidesToScroll)) {
      if (_.options.fade === false) {
        targetSlide = _.currentSlide;

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
          _.animateSlide(slideLeft, function () {
            _.postSlide(targetSlide);
          });
        } else {
          _.postSlide(targetSlide);
        }
      }

      return;
    }

    if (_.options.autoplay) {
      clearInterval(_.autoPlayTimer);
    }

    if (targetSlide < 0) {
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        animSlide = _.slideCount - _.slideCount % _.options.slidesToScroll;
      } else {
        animSlide = _.slideCount + targetSlide;
      }
    } else if (targetSlide >= _.slideCount) {
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        animSlide = 0;
      } else {
        animSlide = targetSlide - _.slideCount;
      }
    } else {
      animSlide = targetSlide;
    }

    _.animating = true;

    _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

    oldSlide = _.currentSlide;
    _.currentSlide = animSlide;

    _.setSlideClasses(_.currentSlide);

    if (_.options.asNavFor) {
      navTarget = _.getNavTarget();
      navTarget = navTarget.slick('getSlick');

      if (navTarget.slideCount <= navTarget.options.slidesToShow) {
        navTarget.setSlideClasses(_.currentSlide);
      }
    }

    _.updateDots();

    _.updateArrows();

    if (_.options.fade === true) {
      if (dontAnimate !== true) {
        _.fadeSlideOut(oldSlide);

        _.fadeSlide(animSlide, function () {
          _.postSlide(animSlide);
        });
      } else {
        _.postSlide(animSlide);
      }

      _.animateHeight();

      return;
    }

    if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
      _.animateSlide(targetLeft, function () {
        _.postSlide(animSlide);
      });
    } else {
      _.postSlide(animSlide);
    }
  };

  Slick.prototype.startLoad = function () {
    var _ = this;

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.hide();

      _.$nextArrow.hide();
    }

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      _.$dots.hide();
    }

    _.$slider.addClass('slick-loading');
  };

  Slick.prototype.swipeDirection = function () {
    var xDist,
        yDist,
        r,
        swipeAngle,
        _ = this;

    xDist = _.touchObject.startX - _.touchObject.curX;
    yDist = _.touchObject.startY - _.touchObject.curY;
    r = Math.atan2(yDist, xDist);
    swipeAngle = Math.round(r * 180 / Math.PI);

    if (swipeAngle < 0) {
      swipeAngle = 360 - Math.abs(swipeAngle);
    }

    if (swipeAngle <= 45 && swipeAngle >= 0) {
      return _.options.rtl === false ? 'left' : 'right';
    }

    if (swipeAngle <= 360 && swipeAngle >= 315) {
      return _.options.rtl === false ? 'left' : 'right';
    }

    if (swipeAngle >= 135 && swipeAngle <= 225) {
      return _.options.rtl === false ? 'right' : 'left';
    }

    if (_.options.verticalSwiping === true) {
      if (swipeAngle >= 35 && swipeAngle <= 135) {
        return 'down';
      } else {
        return 'up';
      }
    }

    return 'vertical';
  };

  Slick.prototype.swipeEnd = function (event) {
    var _ = this,
        slideCount,
        direction;

    _.dragging = false;
    _.swiping = false;

    if (_.scrolling) {
      _.scrolling = false;
      return false;
    }

    _.interrupted = false;
    _.shouldClick = _.touchObject.swipeLength > 10 ? false : true;

    if (_.touchObject.curX === undefined) {
      return false;
    }

    if (_.touchObject.edgeHit === true) {
      _.$slider.trigger('edge', [_, _.swipeDirection()]);
    }

    if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {
      direction = _.swipeDirection();

      switch (direction) {
        case 'left':
        case 'down':
          slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount();
          _.currentDirection = 0;
          break;

        case 'right':
        case 'up':
          slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount();
          _.currentDirection = 1;
          break;

        default:
      }

      if (direction != 'vertical') {
        _.slideHandler(slideCount);

        _.touchObject = {};

        _.$slider.trigger('swipe', [_, direction]);
      }
    } else {
      if (_.touchObject.startX !== _.touchObject.curX) {
        _.slideHandler(_.currentSlide);

        _.touchObject = {};
      }
    }
  };

  Slick.prototype.swipeHandler = function (event) {
    var _ = this;

    if (_.options.swipe === false || 'ontouchend' in document && _.options.swipe === false) {
      return;
    } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
      return;
    }

    _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ? event.originalEvent.touches.length : 1;
    _.touchObject.minSwipe = _.listWidth / _.options.touchThreshold;

    if (_.options.verticalSwiping === true) {
      _.touchObject.minSwipe = _.listHeight / _.options.touchThreshold;
    }

    switch (event.data.action) {
      case 'start':
        _.swipeStart(event);

        break;

      case 'move':
        _.swipeMove(event);

        break;

      case 'end':
        _.swipeEnd(event);

        break;
    }
  };

  Slick.prototype.swipeMove = function (event) {
    var _ = this,
        edgeWasHit = false,
        curLeft,
        swipeDirection,
        swipeLength,
        positionOffset,
        touches,
        verticalSwipeLength;

    touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

    if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
      return false;
    }

    curLeft = _.getLeft(_.currentSlide);
    _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
    _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;
    _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));
    verticalSwipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

    if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
      _.scrolling = true;
      return false;
    }

    if (_.options.verticalSwiping === true) {
      _.touchObject.swipeLength = verticalSwipeLength;
    }

    swipeDirection = _.swipeDirection();

    if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
      _.swiping = true;
      event.preventDefault();
    }

    positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);

    if (_.options.verticalSwiping === true) {
      positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
    }

    swipeLength = _.touchObject.swipeLength;
    _.touchObject.edgeHit = false;

    if (_.options.infinite === false) {
      if (_.currentSlide === 0 && swipeDirection === 'right' || _.currentSlide >= _.getDotCount() && swipeDirection === 'left') {
        swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
        _.touchObject.edgeHit = true;
      }
    }

    if (_.options.vertical === false) {
      _.swipeLeft = curLeft + swipeLength * positionOffset;
    } else {
      _.swipeLeft = curLeft + swipeLength * (_.$list.height() / _.listWidth) * positionOffset;
    }

    if (_.options.verticalSwiping === true) {
      _.swipeLeft = curLeft + swipeLength * positionOffset;
    }

    if (_.options.fade === true || _.options.touchMove === false) {
      return false;
    }

    if (_.animating === true) {
      _.swipeLeft = null;
      return false;
    }

    _.setCSS(_.swipeLeft);
  };

  Slick.prototype.swipeStart = function (event) {
    var _ = this,
        touches;

    _.interrupted = true;

    if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
      _.touchObject = {};
      return false;
    }

    if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
      touches = event.originalEvent.touches[0];
    }

    _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
    _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;
    _.dragging = true;
  };

  Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function () {
    var _ = this;

    if (_.$slidesCache !== null) {
      _.unload();

      _.$slideTrack.children(this.options.slide).detach();

      _.$slidesCache.appendTo(_.$slideTrack);

      _.reinit();
    }
  };

  Slick.prototype.unload = function () {
    var _ = this;

    $('.slick-cloned', _.$slider).remove();

    if (_.$dots) {
      _.$dots.remove();
    }

    if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
      _.$prevArrow.remove();
    }

    if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
      _.$nextArrow.remove();
    }

    _.$slides.removeClass('slick-slide slick-active slick-visible slick-current').attr('aria-hidden', 'true').css('width', '');
  };

  Slick.prototype.unslick = function (fromBreakpoint) {
    var _ = this;

    _.$slider.trigger('unslick', [_, fromBreakpoint]);

    _.destroy();
  };

  Slick.prototype.updateArrows = function () {
    var _ = this,
        centerOffset;

    centerOffset = Math.floor(_.options.slidesToShow / 2);

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow && !_.options.infinite) {
      _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

      _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

      if (_.currentSlide === 0) {
        _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');

        _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
      } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {
        _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');

        _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
      } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {
        _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');

        _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
      }
    }
  };

  Slick.prototype.updateDots = function () {
    var _ = this;

    if (_.$dots !== null) {
      _.$dots.find('li').removeClass('slick-active').end();

      _.$dots.find('li').eq(Math.floor(_.currentSlide / _.options.slidesToScroll)).addClass('slick-active');
    }
  };

  Slick.prototype.visibility = function () {
    var _ = this;

    if (_.options.autoplay) {
      if (document[_.hidden]) {
        _.interrupted = true;
      } else {
        _.interrupted = false;
      }
    }
  };

  $.fn.slick = function () {
    var _ = this,
        opt = arguments[0],
        args = Array.prototype.slice.call(arguments, 1),
        l = _.length,
        i,
        ret;

    for (i = 0; i < l; i++) {
      if (_typeof(opt) == 'object' || typeof opt == 'undefined') _[i].slick = new Slick(_[i], opt);else ret = _[i].slick[opt].apply(_[i].slick, args);
      if (typeof ret != 'undefined') return ret;
    }

    return _;
  };
});
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * what-input - A global utility for tracking the current input method (mouse, keyboard or touch).
 * @version v5.1.2
 * @link https://github.com/ten1seven/what-input
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && (typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object') module.exports = factory();else if (typeof define === 'function' && define.amd) define("whatInput", [], factory);else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') exports["whatInput"] = factory();else root["whatInput"] = factory();
})(void 0, function () {
  return (
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = {};
      /******/
      // The require function

      /******/

      function __webpack_require__(moduleId) {
        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId])
          /******/
          return installedModules[moduleId].exports;
        /******/
        // Create a new module (and put it into the cache)

        /******/

        var module = installedModules[moduleId] = {
          /******/
          exports: {},

          /******/
          id: moduleId,

          /******/
          loaded: false
          /******/

        };
        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        // Flag the module as loaded

        /******/

        module.loaded = true;
        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __webpack_require__.m = modules;
      /******/
      // expose the module cache

      /******/

      __webpack_require__.c = installedModules;
      /******/
      // __webpack_public_path__

      /******/

      __webpack_require__.p = "";
      /******/
      // Load entry module and return exports

      /******/

      return __webpack_require__(0);
      /******/
    }(
    /************************************************************************/

    /******/
    [
    /* 0 */

    /***/
    function (module, exports) {
      'use strict';

      module.exports = function () {
        /*
         * bail out if there is no document or window
         * (i.e. in a node/non-DOM environment)
         *
         * Return a stubbed API instead
         */
        if (typeof document === 'undefined' || typeof window === 'undefined') {
          return {
            // always return "initial" because no interaction will ever be detected
            ask: function ask() {
              return 'initial';
            },
            // always return null
            element: function element() {
              return null;
            },
            // no-op
            ignoreKeys: function ignoreKeys() {},
            // no-op
            specificKeys: function specificKeys() {},
            // no-op
            registerOnChange: function registerOnChange() {},
            // no-op
            unRegisterOnChange: function unRegisterOnChange() {}
          };
        }
        /*
         * variables
         */
        // cache document.documentElement


        var docElem = document.documentElement; // currently focused dom element

        var currentElement = null; // last used input type

        var currentInput = 'initial'; // last used input intent

        var currentIntent = currentInput; // check for sessionStorage support
        // then check for session variables and use if available

        try {
          if (window.sessionStorage.getItem('what-input')) {
            currentInput = window.sessionStorage.getItem('what-input');
          }

          if (window.sessionStorage.getItem('what-intent')) {
            currentIntent = window.sessionStorage.getItem('what-intent');
          }
        } catch (e) {} // event buffer timer


        var eventTimer = null; // form input types

        var formInputs = ['input', 'select', 'textarea']; // empty array for holding callback functions

        var functionList = []; // list of modifier keys commonly used with the mouse and
        // can be safely ignored to prevent false keyboard detection

        var ignoreMap = [16, // shift
        17, // control
        18, // alt
        91, // Windows key / left Apple cmd
        93 // Windows menu / right Apple cmd
        ];
        var specificMap = []; // mapping of events to input types

        var inputMap = {
          keydown: 'keyboard',
          keyup: 'keyboard',
          mousedown: 'mouse',
          mousemove: 'mouse',
          MSPointerDown: 'pointer',
          MSPointerMove: 'pointer',
          pointerdown: 'pointer',
          pointermove: 'pointer',
          touchstart: 'touch' // boolean: true if touch buffer is active

        };
        var isBuffering = false; // boolean: true if the page is being scrolled

        var isScrolling = false; // store current mouse position

        var mousePos = {
          x: null,
          y: null // map of IE 10 pointer events

        };
        var pointerMap = {
          2: 'touch',
          3: 'touch',
          // treat pen like touch
          4: 'mouse' // check support for passive event listeners

        };
        var supportsPassive = false;

        try {
          var opts = Object.defineProperty({}, 'passive', {
            get: function get() {
              supportsPassive = true;
            }
          });
          window.addEventListener('test', null, opts);
        } catch (e) {}
        /*
         * set up
         */


        var setUp = function setUp() {
          // add correct mouse wheel event mapping to `inputMap`
          inputMap[detectWheel()] = 'mouse';
          addListeners();
          doUpdate('input');
          doUpdate('intent');
        };
        /*
         * events
         */


        var addListeners = function addListeners() {
          // `pointermove`, `MSPointerMove`, `mousemove` and mouse wheel event binding
          // can only demonstrate potential, but not actual, interaction
          // and are treated separately
          var options = supportsPassive ? {
            passive: true
          } : false; // pointer events (mouse, pen, touch)

          if (window.PointerEvent) {
            window.addEventListener('pointerdown', setInput);
            window.addEventListener('pointermove', setIntent);
          } else if (window.MSPointerEvent) {
            window.addEventListener('MSPointerDown', setInput);
            window.addEventListener('MSPointerMove', setIntent);
          } else {
            // mouse events
            window.addEventListener('mousedown', setInput);
            window.addEventListener('mousemove', setIntent); // touch events

            if ('ontouchstart' in window) {
              window.addEventListener('touchstart', eventBuffer, options);
              window.addEventListener('touchend', setInput);
            }
          } // mouse wheel


          window.addEventListener(detectWheel(), setIntent, options); // keyboard events

          window.addEventListener('keydown', eventBuffer);
          window.addEventListener('keyup', eventBuffer); // focus events

          window.addEventListener('focusin', setElement);
          window.addEventListener('focusout', clearElement);
        }; // checks conditions before updating new input


        var setInput = function setInput(event) {
          // only execute if the event buffer timer isn't running
          if (!isBuffering) {
            var eventKey = event.which;
            var value = inputMap[event.type];

            if (value === 'pointer') {
              value = pointerType(event);
            }

            var ignoreMatch = !specificMap.length && ignoreMap.indexOf(eventKey) === -1;
            var specificMatch = specificMap.length && specificMap.indexOf(eventKey) !== -1;
            var shouldUpdate = value === 'keyboard' && eventKey && (ignoreMatch || specificMatch) || value === 'mouse' || value === 'touch';

            if (currentInput !== value && shouldUpdate) {
              currentInput = value;

              try {
                window.sessionStorage.setItem('what-input', currentInput);
              } catch (e) {}

              doUpdate('input');
            }

            if (currentIntent !== value && shouldUpdate) {
              // preserve intent for keyboard typing in form fields
              var activeElem = document.activeElement;
              var notFormInput = activeElem && activeElem.nodeName && formInputs.indexOf(activeElem.nodeName.toLowerCase()) === -1;

              if (notFormInput) {
                currentIntent = value;

                try {
                  window.sessionStorage.setItem('what-intent', currentIntent);
                } catch (e) {}

                doUpdate('intent');
              }
            }
          }
        }; // updates the doc and `inputTypes` array with new input


        var doUpdate = function doUpdate(which) {
          docElem.setAttribute('data-what' + which, which === 'input' ? currentInput : currentIntent);
          fireFunctions(which);
        }; // updates input intent for `mousemove` and `pointermove`


        var setIntent = function setIntent(event) {
          // test to see if `mousemove` happened relative to the screen to detect scrolling versus mousemove
          detectScrolling(event); // only execute if the event buffer timer isn't running
          // or scrolling isn't happening

          if (!isBuffering && !isScrolling) {
            var value = inputMap[event.type];

            if (value === 'pointer') {
              value = pointerType(event);
            }

            if (currentIntent !== value) {
              currentIntent = value;

              try {
                window.sessionStorage.setItem('what-intent', currentIntent);
              } catch (e) {}

              doUpdate('intent');
            }
          }
        };

        var setElement = function setElement(event) {
          if (!event.target.nodeName) {
            // If nodeName is undefined, clear the element
            // This can happen if click inside an <svg> element.
            clearElement();
            return;
          }

          currentElement = event.target.nodeName.toLowerCase();
          docElem.setAttribute('data-whatelement', currentElement);

          if (event.target.classList && event.target.classList.length) {
            docElem.setAttribute('data-whatclasses', event.target.classList.toString().replace(' ', ','));
          }
        };

        var clearElement = function clearElement() {
          currentElement = null;
          docElem.removeAttribute('data-whatelement');
          docElem.removeAttribute('data-whatclasses');
        }; // buffers events that frequently also fire mouse events


        var eventBuffer = function eventBuffer(event) {
          // set the current input
          setInput(event); // clear the timer if it happens to be running

          window.clearTimeout(eventTimer); // set the isBuffering to `true`

          isBuffering = true; // run the timer

          eventTimer = window.setTimeout(function () {
            // if the timer runs out, set isBuffering back to `false`
            isBuffering = false;
          }, 100);
        };
        /*
         * utilities
         */


        var pointerType = function pointerType(event) {
          if (typeof event.pointerType === 'number') {
            return pointerMap[event.pointerType];
          } else {
            // treat pen like touch
            return event.pointerType === 'pen' ? 'touch' : event.pointerType;
          }
        }; // detect version of mouse wheel event to use
        // via https://developer.mozilla.org/en-US/docs/Web/Events/wheel


        var detectWheel = function detectWheel() {
          var wheelType = void 0; // Modern browsers support "wheel"

          if ('onwheel' in document.createElement('div')) {
            wheelType = 'wheel';
          } else {
            // Webkit and IE support at least "mousewheel"
            // or assume that remaining browsers are older Firefox
            wheelType = document.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll';
          }

          return wheelType;
        }; // runs callback functions


        var fireFunctions = function fireFunctions(type) {
          for (var i = 0, len = functionList.length; i < len; i++) {
            if (functionList[i].type === type) {
              functionList[i].fn.call(undefined, type === 'input' ? currentInput : currentIntent);
            }
          }
        }; // finds matching element in an object


        var objPos = function objPos(match) {
          for (var i = 0, len = functionList.length; i < len; i++) {
            if (functionList[i].fn === match) {
              return i;
            }
          }
        };

        var detectScrolling = function detectScrolling(event) {
          if (mousePos['x'] !== event.screenX || mousePos['y'] !== event.screenY) {
            isScrolling = false;
            mousePos['x'] = event.screenX;
            mousePos['y'] = event.screenY;
          } else {
            isScrolling = true;
          }
        };
        /*
         * init
         */
        // don't start script unless browser cuts the mustard
        // (also passes if polyfills are used)


        if ('addEventListener' in window && Array.prototype.indexOf) {
          setUp();
        }
        /*
         * api
         */


        return {
          // returns string: the current input type
          // opt: 'intent'|'input'
          // 'input' (default): returns the same value as the `data-whatinput` attribute
          // 'intent': includes `data-whatintent` value if it's different than `data-whatinput`
          ask: function ask(opt) {
            return opt === 'intent' ? currentIntent : currentInput;
          },
          // returns string: the currently focused element or null
          element: function element() {
            return currentElement;
          },
          // overwrites ignored keys with provided array
          ignoreKeys: function ignoreKeys(arr) {
            ignoreMap = arr;
          },
          // overwrites specific char keys to update on
          specificKeys: function specificKeys(arr) {
            specificMap = arr;
          },
          // attach functions to input and intent "events"
          // funct: function to fire on change
          // eventType: 'input'|'intent'
          registerOnChange: function registerOnChange(fn, eventType) {
            functionList.push({
              fn: fn,
              type: eventType || 'input'
            });
          },
          unRegisterOnChange: function unRegisterOnChange(fn) {
            var position = objPos(fn);

            if (position || position === 0) {
              functionList.splice(position, 1);
            }
          }
        };
      }();
      /***/

    }])
  );
});

;