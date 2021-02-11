(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict"; // Math.sign (used in ProgressFull)

if (!("sign" in Math)) {
  Math.sign = function (x) {
    return x > 0 ? 1 : x < 0 ? -1 : +x;
  };
}

},{}],2:[function(require,module,exports){
"use strict";

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}

},{}],3:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _tslib = require("tslib");

require("./polyfills/Math.sign");

require("./polyfills/startsWith");

var sdxExports = _interopRequireWildcard(require("./src/sdx"));

/* Polyfills */
var sdx = (0, _tslib.__assign)((0, _tslib.__assign)((0, _tslib.__assign)({}, sdxExports), window.sdx || {}), {
  VERSION: "2.11.2"
});
window.sdx = sdx;
sdxExports.utils.onDocumentReady(function () {
  sdxExports.initInputField();
  sdxExports.initTextarea();
  sdxExports.initSelect();
  sdxExports.initLoaderBar();
  sdxExports.initAutocomplete();
  sdxExports.initProgressLight();
  sdxExports.initProgressFull();
  sdxExports.initRange();
  sdxExports.initModal();
  sdxExports.initAccordion();
  sdxExports.initCollapse();
  sdxExports.initMenuFlyout();
  sdxExports.initNavigation();
  sdxExports.initNavigationSide();
  sdxExports.initSearchInput();
  sdxExports.initEmptyState();
  sdxExports.initCarousel();
  sdxExports.initTable();
  sdxExports.initPieChart();
  sdxExports.initBarChartHorizontal();
  sdxExports.initBarChartVertical();
});

},{"./polyfills/Math.sign":1,"./polyfills/startsWith":2,"./src/sdx":29,"@babel/runtime/helpers/interopRequireWildcard":34,"tslib":43}],4:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var Dom = _interopRequireWildcard(require("./DomFunctions"));

var htmlEvents;
/**
 * A wrapper class for DOM Elements.
 */

var DomElement =
/** @class */
function () {
  /**
   * Creates a new instance.
   * @param {Element} - The element to wrap.
   * @param {String} - The DOM element to create.
   */
  function DomElement(element) {
    if (typeof element === "string") {
      this.element = document.createElement(element);
    } else {
      this.element = element;
    }
  }
  /**
   * Adds the specified CSS class to the element.
   * @param {String} - The class name to add.
   * @return {DomElement} Returns the current instance for fluent chaining of calls.
   */


  DomElement.prototype.addClass = function (name) {
    Dom.addClass(this.element, name);
    return this;
  };
  /**
   * Removes the specified CSS class from the element.
   * @param {String} - The class name to remove.
   * @return {DomElement} Returns the current instance for fluent chaining of calls.
   */


  DomElement.prototype.removeClass = function (name) {
    Dom.removeClass(this.element, name);
    return this;
  };

  DomElement.prototype.hasClass = function (name) {
    return Dom.hasClass(this.element, name);
  };

  DomElement.prototype.toggleClass = function (name) {
    Dom.toggleClass(this.element, name);
    return this;
  };

  Object.defineProperty(DomElement.prototype, "classes", {
    get: function get() {
      return this.element.classList;
    },
    enumerable: false,
    configurable: true
  });

  DomElement.prototype.setId = function (id) {
    this.element.setAttribute("id", id);
    return this;
  };

  Object.defineProperty(DomElement.prototype, "innerText", {
    get: function get() {
      return Dom.text(this.element);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DomElement.prototype, "innerHtml", {
    get: function get() {
      return this.element.innerHTML;
    },
    enumerable: false,
    configurable: true
  });

  DomElement.prototype.setHtml = function (value) {
    if (typeof value !== "string") {
      throw new Error("Expected HTML string");
    }

    this.element.innerHTML = value;
    return this;
  };

  DomElement.prototype.getAttribute = function (name) {
    return this.element.getAttribute(name);
  };

  DomElement.prototype.setAttribute = function (name, value) {
    this.element.setAttribute(name, value);
    return this;
  };
  /**
   * Registers an event listener.
   */


  DomElement.prototype.addEventListener = function (type, listener) {
    this.element.addEventListener(type, listener);
  };
  /**
   * Unregisters an event listener on the component.
   */


  DomElement.prototype.removeEventListener = function (type, listener) {
    this.element.removeEventListener(type, listener);
  };

  DomElement.prototype.appendChild = function (newChild) {
    if (!(newChild instanceof DomElement)) {
      throw new Error("Only other DomElements can be added as children");
    }

    this.element.appendChild(newChild.element);
    return this;
  };

  DomElement.prototype.prependChild = function (newChild) {
    if (!(newChild instanceof DomElement)) {
      throw new Error("Only other DomElements can be added as children");
    }

    this.element.insertBefore(newChild.element, this.element.firstChild);
    return this;
  };

  DomElement.prototype.insertBefore = function (newChild) {
    if (!(newChild instanceof DomElement)) {
      throw new Error("Only other DomElements can be added as children");
    }

    if (!this.element.parentNode) {
      throw new Error("Element is not attached");
    }

    this.element.parentNode.insertBefore(newChild.element, this.element);
    return this;
  };

  DomElement.prototype.insertAfter = function (newChild) {
    if (!(newChild instanceof DomElement)) {
      throw new Error("Only other DomElements can be added as children");
    }

    if (!this.element.parentNode) {
      throw new Error("Element is not attached");
    }

    this.element.parentNode.insertBefore(newChild.element, this.element.nextSibling);
    return this;
  };

  DomElement.prototype.removeChild = function (oldChild) {
    if (!(oldChild instanceof DomElement)) {
      throw new Error("Only a DomElements child can be removed");
    }

    this.element.removeChild(oldChild.element);
  };

  DomElement.prototype.find = function (selectors) {
    var e = this.element.querySelector(selectors);

    if (e) {
      return new DomElement(e);
    }

    return undefined;
  };

  DomElement.prototype.wrapWithElement = function (wrapperElement) {
    if (!this.element.parentNode) {
      throw new Error("Element is not attached");
    }

    this.element.parentNode.replaceChild(wrapperElement.element, this.element);
    wrapperElement.element.appendChild(this.element);
    return this;
  };

  DomElement.prototype.dispatchEvent = function (eventName) {
    var event;
    var el = this.element;

    if (document.createEvent) {
      event = document.createEvent("HTMLEvents");
      event.initEvent(eventName, true, true);
    } else if (document.createEventObject) {
      // IE < 9
      event = document.createEventObject();
      event.eventType = eventName;
    }

    event.eventName = eventName;

    if (el.dispatchEvent) {
      el.dispatchEvent(event);
    } else if (el.fireEvent && htmlEvents["on" + eventName]) {
      // IE < 9
      el.fireEvent("on" + event.eventType, event); // can trigger only real event (e.g. 'click')
    } else if (el[eventName]) {
      el[eventName]();
    } else if (el["on" + eventName]) {
      el["on" + eventName]();
    }
  };

  DomElement.prototype.css = function (property) {
    return Dom.css(this.element, property);
  };
  /**
   * Removes all child nodes of the current DomElement.
   */


  DomElement.prototype.empty = function () {
    Dom.empty(this.element);
  };

  return DomElement;
}();

var _default = DomElement;
exports["default"] = _default;

},{"./DomFunctions":5,"@babel/runtime/helpers/interopRequireWildcard":34}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.hasClass = hasClass;
exports.toggleClass = toggleClass;
exports.isHidden = isHidden;
exports.text = text;
exports.parentWithClass = parentWithClass;
exports.textWidth = textWidth;
exports.css = css;
exports.getAttributeReference = getAttributeReference;
exports.getRootElement = getRootElement;
exports.empty = empty;

function addClass(element, name) {
  if (typeof name !== "string") {
    throw new Error("Expected string class name");
  }

  element.classList.add(name);
}

function removeClass(element, name) {
  if (typeof name !== "string") {
    throw new Error("Expected string class name");
  }

  element.classList.remove(name);
}

function hasClass(element, name) {
  if (typeof name !== "string") {
    throw new Error("Expected string class name");
  }

  return element.classList.contains(name);
}

function toggleClass(element, name) {
  if (typeof name !== "string") {
    throw new Error("Expected string class name");
  }

  element.classList.toggle(name);
}
/**
 * Determines if the given element is hidden from view.
 * @param {Element} Element The dom element to check.
 * @param {boolean} includeParents If set to `true` searches up the DOM and checks parent visibility as well. Defaults to `false`.
 */


function isHidden(element, includeParents) {
  if (includeParents === void 0) {
    includeParents = false;
  }

  if (includeParents === false) {
    var style = window.getComputedStyle(element);
    return style.display === "none" || element.offsetLeft < 0;
  }

  var result; // tslint:disable-next-line:no-conditional-assignment

  while ((result = isHidden(element, false)) === false && element.parentElement) {
    element = element.parentElement;
  }

  return result;
}
/**
 * Gets the text of an element an makes sure this works on all browsers.
 */


function text(element) {
  return element.textContent || element.innerText;
}

function parentWithClass(element, className) {
  var current = element;

  while (!hasClass(current, className) && current.parentElement) {
    current = current.parentElement;
  }

  if (hasClass(current, className)) {
    return current;
  }

  return undefined;
}

function textWidth(text, font) {
  // NOTE: this width measuring algorithm is a lot faster
  // but does unfortunately not work on IE 10...
  // let canvas = document.createElement("canvas")
  // let context = canvas.getContext("2d")
  // context.font = font
  // let metrics = context.measureText(text)
  // return Math.round(metrics.width)
  var div = document.createElement("div");
  div.innerHTML = text;
  div.style.font = font;
  div.style.position = "absolute";
  div.style.visibility = "hidden";
  document.body.appendChild(div);
  var result = div.offsetWidth;
  document.body.removeChild(div);
  return result;
}

function css(element, property) {
  return window.getComputedStyle(element).getPropertyValue(property);
}
/**
 * Gets the single element referenced in an items data-* attribute.
 * @param {DomElement} element - The element containing the reference attribute.
 * @param {string} attribute - The name of the reference attribute.
 * @returns {DomElement} The referenced element; or `undefined` if the reference is invalid
 * or the attribute could not be found.
 */


function getAttributeReference(element, attribute) {
  var attrValue = element.getAttribute(attribute);

  if (!attrValue || attrValue === "") {
    return undefined;
  }

  return document.querySelector(attrValue);
}
/**
 * Gets the document root element (normally the body element)
 * If the document uses a sdx-container wrapper this is returned instead.
 * @returns {Element} The root dom element.
 */


function getRootElement() {
  var element = document.querySelector(".sdx-container");

  if (!element) {
    element = document.body;
  }

  return element;
}
/**
 * Removes all child nodes from the provided element.
 * @param {Element} element The Dom element
 */


function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getKeyValue = exports.containsKey = exports.KEY_NR_9 = exports.KEY_NR_1 = exports.KEY_NR_0 = exports.KEY_PAGE_DOWN = exports.KEY_PAGE_UP = exports.KEY_ARROW_RIGHT = exports.KEY_ARROW_LEFT = exports.KEY_ARROW_DOWN = exports.KEY_ARROW_UP = exports.KEY_ESCAPE = exports.KEY_ENTER = exports.KEY_TAB = void 0;

/* Keyboard input keycode definitions */
var KEY_TAB = 9;
exports.KEY_TAB = KEY_TAB;
var KEY_ENTER = 13;
exports.KEY_ENTER = KEY_ENTER;
var KEY_ESCAPE = 27; // Arrow keys

exports.KEY_ESCAPE = KEY_ESCAPE;
var KEY_ARROW_UP = 38;
exports.KEY_ARROW_UP = KEY_ARROW_UP;
var KEY_ARROW_DOWN = 40;
exports.KEY_ARROW_DOWN = KEY_ARROW_DOWN;
var KEY_ARROW_LEFT = 37;
exports.KEY_ARROW_LEFT = KEY_ARROW_LEFT;
var KEY_ARROW_RIGHT = 39; // Page keys

exports.KEY_ARROW_RIGHT = KEY_ARROW_RIGHT;
var KEY_PAGE_UP = 33;
exports.KEY_PAGE_UP = KEY_PAGE_UP;
var KEY_PAGE_DOWN = 34; // Numbers

exports.KEY_PAGE_DOWN = KEY_PAGE_DOWN;
var KEY_NR_0 = 48;
exports.KEY_NR_0 = KEY_NR_0;
var KEY_NR_1 = 49;
exports.KEY_NR_1 = KEY_NR_1;
var KEY_NR_9 = 57; // helper functions

exports.KEY_NR_9 = KEY_NR_9;

var containsKey = function containsKey(keycode, inputsKeys) {
  var hasKey = false;

  if (inputsKeys && inputsKeys.length > 0) {
    [].forEach.call(inputsKeys, function (inputsKey) {
      if (keycode === inputsKey) {
        hasKey = true;
      }
    });
  }

  return hasKey;
};

exports.containsKey = containsKey;

var getKeyValue = function getKeyValue(keycode) {
  if (keycode < 48 || keycode > 105) {
    return "";
  }

  return String.fromCharCode(96 <= keycode && keycode <= 105 ? keycode - 48 : keycode).toLowerCase();
};

exports.getKeyValue = getKeyValue;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onDocumentReady = onDocumentReady;
exports.searchAndInitialize = searchAndInitialize;
exports.clamp = clamp;
exports.preventDefault = preventDefault;
exports.remove = remove;
exports.find = find;
exports.internetExplorerOrEdgeVersion = internetExplorerOrEdgeVersion;
exports.scrollIntoView = scrollIntoView;

var _tslib = require("tslib");

/**
 * Calls the callback function when the document has been completely parsed.
 * @param {callback} value The callback function to execute.
 */
function onDocumentReady(callback) {
  function completed() {
    document.removeEventListener("DOMContentLoaded", completed, false);
    window.removeEventListener("load", completed, false);
    callback();
  }

  if (document.readyState === "complete") {
    setTimeout(callback);
  } else {
    document.addEventListener("DOMContentLoaded", completed, false); // A fallback to window.onload, that will always work

    window.addEventListener("load", completed, false);
  }
}

function searchAndInitialize(selector, callback, initSelector) {
  var e_1, _a;

  if (!callback) {
    throw new Error("The callback cannot be undefined");
  }

  var elements = document.querySelectorAll(selector);

  try {
    for (var elements_1 = (0, _tslib.__values)(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
      var e = elements_1_1.value;
      var initElement = e;

      if (initSelector) {
        initElement = initSelector(e);
      }

      if (initElement.getAttribute("data-init") === "auto") {
        callback(e);
      }
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (elements_1_1 && !elements_1_1.done && (_a = elements_1["return"])) _a.call(elements_1);
    } finally {
      if (e_1) throw e_1.error;
    }
  }
}
/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * Utils.clamp(number, 0, 255)
 *
 * @param {Number} value The number to clamp
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */


function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
/**
 * A polyfill for Event.preventDefault().
 * @param {Event} event - The event to prevent the default action.
 */


function preventDefault(event) {
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
}
/**
 * A polyfill for Node.remove().
 * @param {Node} node - The node to remove.
 */


function remove(node) {
  if (!node || !node.parentNode) {
    return;
  }

  node.parentNode.removeChild(node);
}
/**
 * A simple polyfill for the Array.find() method.
 * @param {Array} array - The array to search in.
 * @param {function} expression - The expression to evaluate. Must return true if the element matches.
 */


function find(array, expression) {
  for (var i = 0; i < array.length; i++) {
    var item = array[i];

    if (expression(item) === true) {
      return item;
    }
  }

  return undefined;
}
/**
 * Checks the useragent and returns the Microsoft Internet Explorer / Edge version.
 * If another browser is detected 0 is returned.
 */


function internetExplorerOrEdgeVersion(userAgent) {
  if (userAgent === void 0) {
    userAgent = navigator.userAgent;
  } // handle IE and Edge


  var ieOrEdge = userAgent.search(/MSIE |Edge[/]/);

  if (ieOrEdge > 0) {
    return parseInt(userAgent.substring(ieOrEdge + 5, userAgent.indexOf(".", ieOrEdge)), 10);
  } // handle IE11


  if (userAgent.indexOf("Trident/") > 0) {
    var rv = userAgent.indexOf("rv:");
    return parseInt(userAgent.substring(rv + 3, userAgent.indexOf(".", rv)), 10);
  }

  return 0;
}
/**
 * Tries to move a child element to the top by scrolling the parent element, if it is not already fully visible.
 */


function scrollIntoView(child) {
  var parent = child.parentNode;
  var parentRect = parent.getBoundingClientRect();
  var childRect = child.getBoundingClientRect();
  var isFullyVisible = childRect.top >= parentRect.top && childRect.bottom <= parentRect.top + parent.clientHeight;

  if (!isFullyVisible) {
    parent.scrollTop = childRect.top + parent.scrollTop - parentRect.top;
  }
}

},{"tslib":43}],8:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports["default"] = void 0;

var _tslib = require("tslib");

var _Utils = require("../Utils");

var _animejs = _interopRequireDefault(require("animejs"));

var _DomElement = _interopRequireDefault(require("../DomElement"));

var Dom = _interopRequireWildcard(require("../DomFunctions"));

var QUERY_TOGGLE = ".accordion__toggle";
var QUERY_OPEN_SECTION = ".accordion__item.is-open";
var QUERY_COLLAPSE = ".accordion__collapse";
var CLASS_ITEM = "accordion__item";
var CLASS_OPEN = "is-open";
var CLASS_KEEP_OPEN = "accordion__keep-open";
var REGEX_HIDDEN = /accordion--hidden-.*/;
var ANIMATION_OPEN = 300;
/**
 * The Accordion component
 */

var Accordion =
/** @class */
function (_super) {
  (0, _tslib.__extends)(Accordion, _super);
  /**
   * Creates and initializes the Accordion component.
   * @param {DomElement} - The root element of the Accordion component.
   */

  function Accordion(element) {
    var _this = _super.call(this, element) || this;

    _this._sectionClickHandler = _this._handleSectionClick.bind(_this);

    _this._initialize();

    return _this;
  }
  /**
   * Initializes the Accordion component.
   * @private
   */


  Accordion.prototype._initialize = function () {
    var e_1, _a;

    if (this.element.className.split(" ").some(function (c) {
      return REGEX_HIDDEN.test(c);
    })) {
      var indicator = new _DomElement["default"]("input").setAttribute("type", "hidden").addClass("js-hidden");
      this.appendChild(indicator);
      this._hiddenIndicator = indicator.element;
    }

    try {
      for (var _b = (0, _tslib.__values)(this.element.querySelectorAll(QUERY_TOGGLE)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var toggle = _c.value;
        toggle.addEventListener("click", this._sectionClickHandler);
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  };

  Accordion.prototype._handleSectionClick = function (event) {
    if (this._hiddenIndicator) {
      var style = window.getComputedStyle(this._hiddenIndicator);

      if (style.visibility !== "visible") {
        return;
      }
    }

    var navSection = event.target.parentElement;

    while (!Dom.hasClass(navSection, CLASS_ITEM) && navSection.parentElement) {
      navSection = navSection.parentElement;
    }

    var prevSection = this.element.querySelector(QUERY_OPEN_SECTION);

    if (prevSection && prevSection !== navSection) {
      if (!Dom.hasClass(this.element, CLASS_KEEP_OPEN)) {
        this._toggleSection(prevSection);
      }
    }

    this._toggleSection(navSection);
  };

  Accordion.prototype._toggleSection = function (accSection) {
    var collapseElement = accSection.querySelector(QUERY_COLLAPSE);

    if (Dom.hasClass(accSection, CLASS_OPEN)) {
      Dom.removeClass(accSection, CLASS_OPEN);

      this._closeCollapseSection(collapseElement);
    } else {
      Dom.addClass(accSection, CLASS_OPEN);

      if (collapseElement) {
        // to ignore the case when there is no collapsible element (see sdx doku navigation, "all the basics") in a list of accordion
        this._openCollapseSection(collapseElement);
      }
    }
  };

  Accordion.prototype._openCollapseSection = function (el) {
    el.style.display = "block";
    (0, _animejs["default"])({
      targets: el,
      duration: ANIMATION_OPEN,
      height: el.scrollHeight,
      opacity: 1,
      easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
      complete: function complete() {
        el.setAttribute("aria-expanded", "true");
        el.classList.add(CLASS_OPEN);
        el.style.height = "auto"; // allow to grow or shrink with content
      }
    });
  };

  Accordion.prototype._closeCollapseSection = function (el) {
    // Can't animate "auto", therefore update to current height
    el.style.height = el.scrollHeight + "px";
    (0, _animejs["default"])({
      targets: el,
      duration: ANIMATION_OPEN,
      height: 0,
      opacity: 0,
      easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
      complete: function complete() {
        el.setAttribute("aria-expanded", "false");
        el.style.removeProperty("display"); // removes extra padding in Footer after opening and closing

        el.style.removeProperty("height"); // SDX-691 Missing items in Footer after resizing

        el.style.removeProperty("opacity"); // SDX-691 Missing items in Footer after resizing

        el.classList.remove(CLASS_OPEN);
      }
    });
  };
  /**
   * Removes all event handlers and clears references.
   */


  Accordion.prototype.destroy = function () {
    var e_2, _a;

    try {
      for (var _b = (0, _tslib.__values)(this.element.querySelectorAll(QUERY_TOGGLE)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var toggle = _c.value;
        toggle.removeEventListener("click", this._sectionClickHandler);
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
      } finally {
        if (e_2) throw e_2.error;
      }
    }

    this._sectionClickHandler = null;
    this.element = null;
  };

  return Accordion;
}(_DomElement["default"]);

function init() {
  (0, _Utils.searchAndInitialize)(".accordion", function (e) {
    new Accordion(e);
  });
}

var _default = Accordion;
exports["default"] = _default;

},{"../DomElement":4,"../DomFunctions":5,"../Utils":7,"@babel/runtime/helpers/interopRequireDefault":33,"@babel/runtime/helpers/interopRequireWildcard":34,"animejs":36,"tslib":43}],9:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports["default"] = void 0;

var _tslib = require("tslib");

var _Utils = require("../Utils");

var _DomElement = _interopRequireDefault(require("../DomElement"));

var Inputs = _interopRequireWildcard(require("../Inputs"));

var Dom = _interopRequireWildcard(require("../DomFunctions"));

var QUERY_SLIDER = ".carousel__container";
var QUERY_SLIDE_AREA = ".carousel__slider";
var QUERY_WRAPPER = ".carousel__slider-wrapper";
var QUERY_PAGINATION = ".carousel__pagination";
var CLASS_ACTIVE = "slide--active";
var CLASS_PREV = "slide--prev";
var CLASS_NEXT = "slide--next";
var CLASS_BULLET = "pagination-bullet";
var CLASS_BULLET_ACTIVE = "pagination-bullet--active";
var QUERY_BTN_PREV = ".carousel__button-prev";
var QUERY_BTN_NEXT = ".carousel__button-next";
var QUERY_BTN_WRAPPER = ".carousel__button-wrapper";
var ATTRIBUTE_INDEX = "js-index";
var ANIMATION_DURATION = 350;
var ANIMATION_EASING = "ease-in-out";
var TOUCH_DURATION = 300;
var TOUCH_DELTA_MIN = 25;
/**
 * The carousel component definition.
 */

var Carousel =
/** @class */
function (_super) {
  (0, _tslib.__extends)(Carousel, _super);
  /**
   * Creates and initializes the carousel component.
   * @param {DomElement} element - The root element of the Carousel component.
   * @param {Number} index - The initial index.
   */

  function Carousel(element, index) {
    if (index === void 0) {
      index = 0;
    }

    var _this = _super.call(this, element) || this;

    _this._slider = _this.element.querySelector(QUERY_SLIDER);
    _this._wrapper = _this._slider.querySelector(QUERY_WRAPPER);
    _this._pagination = _this._slider.querySelector(QUERY_PAGINATION);
    _this._slideArea = _this._slider.querySelector(QUERY_SLIDE_AREA);
    _this._btnWrapper = _this.element.querySelector(QUERY_BTN_WRAPPER);
    _this._prevCtrl = _this.element.querySelector(QUERY_BTN_PREV);
    _this._nextCtrl = _this.element.querySelector(QUERY_BTN_NEXT);
    _this._slides = [];
    _this._index = index || 0;
    _this._slidesPerGroup = 1;
    _this._sliderWrapper = new SliderWrapper(_this._wrapper, _this._slideArea, _this.element);
    _this._sliderWrapper.index = _this._index;
    _this._additionalSlideMargin = 0;
    _this._resizeHandler = _this._onresize.bind(_this);
    _this._prevHandler = _this.prev.bind(_this);
    _this._nextHandler = _this.next.bind(_this);
    _this._paginationClickHandler = _this._handlePaginationClick.bind(_this);
    _this._keydownHandler = _this._handleKeydown.bind(_this);
    _this._handleTouchstart = _this._onTouchstart.bind(_this);
    _this._handleTouchmove = _this._onTouchmove.bind(_this);
    _this._handleTouchend = _this._onTouchend.bind(_this);

    _this._initialize();

    _this.slide(_this._index, 0, false);

    _this._updateCtrlOffsets();

    return _this;
  }
  /**
   * Initializes the carousel component.
   * @private
   */


  Carousel.prototype._initialize = function () {
    // responsive helpers
    this._breakpointPhone = new _DomElement["default"]("div").addClass("js-phone").element;
    this._breakpointTablet = new _DomElement["default"]("div").addClass("js-tablet").element;
    this._breakpointDesktop = new _DomElement["default"]("div").addClass("js-desktop").element;
    this.element.appendChild(this._breakpointPhone);
    this.element.appendChild(this._breakpointTablet);
    this.element.appendChild(this._breakpointDesktop);

    if (this._prevCtrl && this._nextCtrl) {
      this._prevCtrl.addEventListener("click", this._prevHandler);

      this._nextCtrl.addEventListener("click", this._nextHandler);
    }

    if (this._pagination) {
      this._pagination.addEventListener("click", this._paginationClickHandler);
    }

    this._slides = Array.from(this._wrapper.children);

    if (this._slides.length === 0) {
      throw Error("Provide at least one slide to the slider");
    }

    for (var i = 0; i < this._slides.length; i++) {
      var slide = this._slides[i];
      slide.setAttribute(ATTRIBUTE_INDEX, String(i));
    }

    this._updateResponsiveOptions();

    this._sliderWrapper.initialize();

    this.reset();
    this.element.addEventListener("keydown", this._keydownHandler);

    this._slideArea.addEventListener("mousedown", this._handleTouchstart);

    this._slideArea.addEventListener("touchstart", this._handleTouchstart);

    window.addEventListener("resize", this._resizeHandler);
    window.addEventListener("orientationchange", this._resizeHandler);
  };

  Carousel.prototype._isBreakpointActive = function (breakpoint) {
    var style = window.getComputedStyle(breakpoint);
    return style.visibility === "visible";
  };

  Carousel.prototype._onresize = function () {
    this.reset();

    this._updateCtrlOffsets();
  };
  /**
   * Makes sure the index is always in the range of available slide
   * In case it's to high or to low it is wrapped around
   * @param {Number} index - The index to adjust and sanitize
   * @returns {Number} index - The adjusted index
   * @private
   */


  Carousel.prototype._adjustIndex = function (index) {
    if (typeof index !== "number") {
      index = 0;
    }

    if (index < 0) {
      index = this._wrapround(index, 0, this._slides.length);
    } else if (index >= this._slides.length) {
      index %= this._slides.length;
    }

    return Math.floor(index / this._slidesPerGroup) * this._slidesPerGroup;
  };

  Carousel.prototype._wrapround = function (n, min, max) {
    if (n >= max) {
      return min;
    }

    if (n < min) {
      return max - 1;
    }

    return n;
  };

  Carousel.prototype._wraproundCount = function (a, b, min, max, direction) {
    if (direction === 0) {
      return 0;
    }

    if (a < min || a >= max) {
      throw new Error("Argument 'a' is out of range, Value: " + a + " Min: " + min + ", Max: " + max);
    }

    if (b < min || b >= max) {
      throw new Error("Argument 'b' is out of range, Value: " + b + " Min: " + min + ", Max: " + max);
    }

    var i = 0;

    while (a !== b) {
      i++;
      a = this._wrapround(a + direction, min, max);
    }

    return i;
  };

  Carousel.prototype._updateCtrlOffsets = function () {
    if (!this._nextCtrl || !this._prevCtrl || !this._btnWrapper) {
      return;
    }

    var prevCtrlMargin = 0;
    var nextCtrlMargin = 0;

    if (this._slidesPerGroup > 1) {
      var wrapperRect = this._btnWrapper.getBoundingClientRect();

      var prevSlideCount = Math.floor(0.5 * this._slidesPerGroup);
      var rightIndex = this._sliderWrapper.index + prevSlideCount + 1;
      var leftIndex = this._sliderWrapper.index - 1;

      if (this._slidesPerGroup % 2 !== 0) {
        leftIndex -= prevSlideCount;
      }

      if (leftIndex >= 0 && leftIndex < this._wrapper.children.length && rightIndex >= 0 && rightIndex < this._wrapper.children.length) {
        var leftSlide = this._sliderWrapper.getSlideProperties(leftIndex);

        var rightSlide = this._sliderWrapper.getSlideProperties(rightIndex);

        var btnWidth = this._prevCtrl.offsetWidth;

        if (btnWidth <= 0) {
          btnWidth = 60;
        }

        prevCtrlMargin = leftSlide.right - wrapperRect.left - btnWidth;
        nextCtrlMargin = wrapperRect.right - rightSlide.left - btnWidth;
      }
    }

    var left = prevCtrlMargin !== 0 ? prevCtrlMargin + "px" : "";
    this._prevCtrl.style.left = left;
    var right = nextCtrlMargin !== 0 ? nextCtrlMargin + "px" : "";
    this._nextCtrl.style.right = right;
  };

  Carousel.prototype._updateActiveSlides = function (nextIndex) {
    var prevSlideCount = Math.floor(0.5 * (this._slidesPerGroup - 1));
    var evenGroup = this._slidesPerGroup % 2 === 0;

    for (var i = 0; i < this._wrapper.children.length; i++) {
      var slide = this._wrapper.children[i];

      if (i === nextIndex || evenGroup && i === nextIndex + 1) {
        Dom.addClass(slide, CLASS_ACTIVE);
      } else {
        Dom.removeClass(slide, CLASS_ACTIVE);
      }

      if (i < nextIndex && i >= nextIndex - prevSlideCount) {
        Dom.addClass(slide, CLASS_PREV);
      } else {
        Dom.removeClass(slide, CLASS_PREV);
      }

      if (i > nextIndex && (i <= nextIndex + prevSlideCount || evenGroup && i <= nextIndex + 1 + prevSlideCount)) {
        Dom.addClass(slide, CLASS_NEXT);
      } else {
        Dom.removeClass(slide, CLASS_NEXT);
      }
    }
  };
  /**
   * Updates and creates the pagination bullets.
   * @private
   */


  Carousel.prototype._updatePagination = function () {
    if (!this._pagination) {
      return;
    }

    var to = this._index;
    var bullets = this._pagination.children;
    var totalItems = Math.max(this._slides.length, bullets.length);
    var slideCount = Math.ceil(this._slides.length / this._slidesPerGroup);
    var activeSlideIndex = Math.floor(to / this._slidesPerGroup);

    for (var i = 0; i < totalItems; i++) {
      var bullet = void 0;

      if (bullets.length > i) {
        if (bullets.length <= slideCount) {
          bullet = bullets[i];
        } else {
          (0, _Utils.remove)(bullets[i]);
        }
      } else if (i < slideCount) {
        bullet = new _DomElement["default"]("div").addClass(CLASS_BULLET).element;

        this._pagination.appendChild(bullet);
      }

      if (bullet && i < slideCount) {
        if (i === activeSlideIndex) {
          Dom.addClass(bullet, CLASS_BULLET_ACTIVE);
        } else {
          Dom.removeClass(bullet, CLASS_BULLET_ACTIVE);
        }
      }
    }
  };

  Carousel.prototype._handlePaginationClick = function (e) {
    if (!Dom.hasClass(e.target, CLASS_BULLET)) {
      return;
    }

    var index = Array.from(this._pagination.children).indexOf(e.target);
    var slideNumber = index * this._slidesPerGroup;
    this.slideTo(slideNumber);
  };

  Carousel.prototype._handleKeydown = function (event) {
    var keycode = event.which || event.keyCode;

    switch (keycode) {
      case Inputs.KEY_ARROW_LEFT:
        this.prev();
        break;

      case Inputs.KEY_ARROW_RIGHT:
        this.next();
        break;

      case Inputs.KEY_ESCAPE:
        this.element.blur();
        break;

      default:
    }
  };

  Carousel.prototype._onTouchstart = function (event) {
    var touch = event.touches ? event.touches[0] : event;

    this._slideArea.removeEventListener("mousedown", this._handleTouchstart);

    this._slideArea.removeEventListener("touchstart", this._handleTouchstart);

    this._sliderWrapper.beginDrag();

    var pageX = touch.pageX;
    this._touchOffset = {
      x: pageX,
      time: Date.now()
    };
    this._delta = {
      x: 0,
      lastMove: pageX
    };
    document.addEventListener("mousemove", this._handleTouchmove);
    document.addEventListener("touchmove", this._handleTouchmove);
    document.addEventListener("mouseup", this._handleTouchend);
    document.addEventListener("mouseleave", this._handleTouchend);
    document.addEventListener("touchend", this._handleTouchend);
  };

  Carousel.prototype._onTouchmove = function (event) {
    var touch = event.touches ? event.touches[0] : event;
    var pageX = touch.pageX;
    var deltaMove = pageX - this._delta.lastMove;
    this._delta = {
      x: pageX - this._touchOffset.x,
      lastMove: pageX
    };

    if (this._touchOffset) {
      (0, _Utils.preventDefault)(event);

      this._sliderWrapper.move(deltaMove);

      this._cloneSlidesToFitWrapper(false, deltaMove);
    }
  };

  Carousel.prototype._onTouchend = function () {
    var duration = this._touchOffset ? Date.now() - this._touchOffset.time : undefined;
    var isValid = Number(duration) < TOUCH_DURATION && Math.abs(this._delta.x) > TOUCH_DELTA_MIN || Math.abs(this._delta.x) > this._frameWidth / 3;

    if (isValid) {
      var direction = (0, _Utils.clamp)(this._delta.x, -1, 1) * -1;
      this.slide(false, direction, true);

      this._sliderWrapper.endDrag();
    } else {
      // Slide back to the starting point of the drag operation
      this._sliderWrapper.cancelDrag();
    }

    this._touchOffset = undefined;

    this._slideArea.addEventListener("mousedown", this._handleTouchstart);

    this._slideArea.addEventListener("touchstart", this._handleTouchstart);

    document.removeEventListener("mousemove", this._handleTouchmove);
    document.removeEventListener("mouseup", this._handleTouchend);
    document.removeEventListener("mouseleave", this._handleTouchend);
    document.removeEventListener("touchmove", this._handleTouchmove);
    document.removeEventListener("touchend", this._handleTouchend);
  };
  /**
   * Updated parameters in regard to the currently active responsive
   * breakpoint.
   * @private
   */


  Carousel.prototype._updateResponsiveOptions = function () {
    if (this._isBreakpointActive(this._breakpointPhone)) {
      this._slidesPerGroup = 1;
    }

    if (this._isBreakpointActive(this._breakpointTablet)) {
      this._slidesPerGroup = 2;
    }

    if (this._isBreakpointActive(this._breakpointDesktop)) {
      this._slidesPerGroup = 3;
    }

    this._sliderWrapper.slidesPerGroup = this._slidesPerGroup;
  };
  /**
   * Clones the requested slide and adds it to the slider.
   * @param {Number} index - The original slide index of the template slide
   * @param {Number} direction - The direction in which to add the slides, -1 for left, 1 for right
   * @private
   */


  Carousel.prototype._cloneSlide = function (index, direction) {
    var clone = this._slides[index].cloneNode(true);

    Dom.removeClass(clone, CLASS_ACTIVE);
    Dom.removeClass(clone, CLASS_PREV);
    Dom.removeClass(clone, CLASS_NEXT);

    this._sliderWrapper.addSlide(clone, direction);

    var slideMargin = this._additionalSlideMargin > 0 ? this._additionalSlideMargin + "px" : "";
    clone.style.marginLeft = slideMargin;
    clone.style.marginRight = slideMargin;
    return clone.offsetWidth;
  };
  /**
   * Clones and adds the requested ammount of slides.
   * @param {Number} slideCount - The number of slides to add
   * @param {Number} direction - The direction in which to add the slides, -1 for left, 1 for right
   * @private
   */


  Carousel.prototype._cloneSlidesByCount = function (slideCount, direction) {
    var originalIndex = direction < 0 ? 0 : this._wrapper.children.length - 1;
    var index = parseInt(this._wrapper.children[originalIndex].getAttribute(ATTRIBUTE_INDEX), 10);

    while (slideCount > 0) {
      index = this._wrapround(index + direction, 0, this._slides.length);

      this._cloneSlide(index, direction);

      slideCount--;
    }
  };
  /**
   * Calculates the scroll clount and inserts the required ammount of slides
   * in the apropriate direction.
   * @param {Number} nextIndex - The slide to scroll to
   * @param {Number} direction - The direction of the scroll
   * @private
   */


  Carousel.prototype._cloneSlidesByScrollCount = function (nextIndex, direction) {
    var scrollCount = this._wraproundCount(this._index, nextIndex, 0, this._slides.length, direction);

    var outerSlideProps = this._sliderWrapper.getSlideProperties(direction > 0 ? this._wrapper.children.length - 1 : 0);

    var indexToOuterSlideCount = this._wraproundCount(this._index, outerSlideProps.index, 0, this._slides.length, direction);

    var slidesToInsert = scrollCount - indexToOuterSlideCount;

    if (slidesToInsert > 0) {
      this._cloneSlidesByCount(slidesToInsert, direction);
    }
  };

  Carousel.prototype._cloneSlidesByToFill = function (spaceToFill, direction) {
    var originalIndex = direction < 0 ? 0 : this._wrapper.children.length - 1;
    var index = parseInt(this._wrapper.children[originalIndex].getAttribute(ATTRIBUTE_INDEX), 10);

    while (spaceToFill > 0) {
      index = this._wrapround(index + direction, 0, this._slides.length);
      spaceToFill -= this._cloneSlide(index, direction);
    }
  };

  Carousel.prototype._cloneSlidesToFitWrapper = function (cleanup, slideDelta) {
    if (cleanup === void 0) {
      cleanup = true;
    }

    if (slideDelta === void 0) {
      slideDelta = 0;
    }

    var realIndex = this._sliderWrapper.index;
    var first;
    var last;

    if (cleanup === false) {
      first = this._sliderWrapper.getSlideProperties(0);
      last = this._sliderWrapper.getSlideProperties(this._wrapper.children.length - 1);
    } else {
      var result = this._sliderWrapper.getRemovableSlides(slideDelta);

      first = result.first;
      last = result.last; // Remove the slides from view

      for (var i = result.slides.length - 1; i >= 0; i--) {
        if (result.slides[i] === true) {
          this._sliderWrapper.removeSlide(i);
        }
      }
    }

    var spaceToFill = this._sliderWrapper.getEmptySpace(first.left, last.right); // Check if additional slides are required on the left


    if (first.visible === true && spaceToFill.left > 0) {
      this._cloneSlidesByToFill(spaceToFill.left, -1);
    } // Check if additional slides are required on the right


    if (last.visible === true && spaceToFill.right > 0) {
      this._cloneSlidesByToFill(spaceToFill.right, 1);
    }

    return realIndex - this._sliderWrapper.index;
  };
  /**
   * Gets the real (wrapper) index for the slide with the given original index
   * @param {Number} index - The index to search for
   * @param {Number} direction - The direction in which to search
   * @returns {Number} The wrapper index
   * @private
   */


  Carousel.prototype._getRealIndexFor = function (index, direction) {
    var i = this._sliderWrapper.index;

    while (i >= 0 && i < this._wrapper.children.length) {
      var slideIndex = parseInt(this._wrapper.children[i].getAttribute(ATTRIBUTE_INDEX), 10);

      if (slideIndex === index) {
        return i;
      }

      i += direction;
    }

    throw new Error("Cloud not find real index for slide " + index + " in direction " + direction);
  };

  Object.defineProperty(Carousel.prototype, "index", {
    /**
     * Gets the index of the current active slide. If the slides are grouped evenly
     * the active slide is always the first in the group.
     * @returns {Number} The index of the active slide.
     */
    get: function get() {
      return this._index;
    },
    enumerable: false,
    configurable: true
  });

  Carousel.prototype.reset = function () {
    this._frameWidth = this._slider.getBoundingClientRect().width || this._slider.offsetWidth;

    this._updateResponsiveOptions();

    if (this._nextCtrl) {
      this._nextCtrl.disabled = false;
    }

    if (this._prevCtrl) {
      this._prevCtrl.disabled = false;
    }

    if (this._slidesPerGroup === 1) {
      var style = window.getComputedStyle(this._slider.parentElement);
      var parentWidth = this._slider.parentElement.clientWidth + (parseFloat(style.marginLeft) || 0) + (parseFloat(style.marginRight) || 0);
      var outerMargin = Math.ceil(parentWidth - this._frameWidth);
      this._additionalSlideMargin = Math.ceil(outerMargin * 0.5) + 1;
    } else {
      this._additionalSlideMargin = 0;
    }

    var slideMargin = this._additionalSlideMargin > 0 ? this._additionalSlideMargin + "px" : "";

    for (var i = 0; i < this._wrapper.children.length; i++) {
      var slide = this._wrapper.children[i];
      slide.style.marginLeft = slideMargin;
      slide.style.marginRight = slideMargin;
    }

    this._sliderWrapper.onresize();

    this._cloneSlidesToFitWrapper(false);

    this._sliderWrapper.moveTo(this._sliderWrapper.index);

    this._updatePagination();

    this._updateActiveSlides(this._sliderWrapper.index);
  };
  /**
   * Moves the slider to the next item.
   */


  Carousel.prototype.prev = function () {
    this.slide(false, -1);
  };
  /**
   * Moves the slider to the previous item.
   */


  Carousel.prototype.next = function () {
    this.slide(false, 1);
  };

  Carousel.prototype.slide = function (nextIndex, direction, animate) {
    if (animate === void 0) {
      animate = true;
    }

    if (typeof nextIndex !== "number") {
      if (direction > 0) {
        nextIndex = this._index + this._slidesPerGroup;
        direction = 1;
      } else {
        nextIndex = this._index - this._slidesPerGroup;
        direction = -1;
      }
    }

    nextIndex = this._adjustIndex(nextIndex);

    if (!direction) {
      direction = (0, _Utils.clamp)(nextIndex - this._index, -1, 1);
    } // Make sure there are enought slides on screen


    this._cloneSlidesToFitWrapper(false); // Make sure there are enough slides for the scroll operation


    this._cloneSlidesByScrollCount(nextIndex, direction);

    var realIndex = this._getRealIndexFor(nextIndex, direction);

    var slideDelta = this._sliderWrapper.getSlideDelta(realIndex);

    realIndex = Math.max(realIndex - this._cloneSlidesToFitWrapper(true, slideDelta), 0);

    this._sliderWrapper.moveTo(realIndex, undefined, animate); // Update the active index


    this._index = nextIndex; // Mark slides as active

    this._updatePagination();

    this._updateActiveSlides(realIndex); // console.log(`Performed slide to ${this._index}, realIndex: ${this._sliderWrapper.index}`)

  };
  /**
   * Moves the slider to the selected slide.
   * @param {Number} index - The index of the slide to slide to.
   * @param {Boolean} animate - `True` if the slide should be animated; otherwise `false`. Defaults to `true`.
   */


  Carousel.prototype.slideTo = function (index, animate) {
    if (animate === void 0) {
      animate = true;
    }

    this.slide(index, undefined, animate);
  };
  /**
   * Destroys the components and frees all references.
   */


  Carousel.prototype.destroy = function () {
    window.removeEventListener("resize", this._resizeHandler);
    window.removeEventListener("orientationchange", this._resizeHandler);
    this.element.removeEventListener("keydown", this._keydownHandler);

    this._slideArea.removeEventListener("mousedown", this._handleTouchstart);

    this._slideArea.removeEventListener("touchstart", this._handleTouchstart);

    this._breakpointPhone.remove();

    this._breakpointTablet.remove();

    this._breakpointDesktop.remove();

    if (this._prevCtrl && this._nextCtrl) {
      this._prevCtrl.removeEventListener("click", this._prevHandler);

      this._nextCtrl.removeEventListener("click", this._nextHandler);
    }

    this._prevCtrl = undefined;
    this._nextCtrl = undefined;

    if (this._pagination) {
      this._pagination.removeEventListener("click", this._paginationClickHandler);

      this._pagination = undefined;
    }

    this._sliderWrapper.destroy();

    this._sliderWrapper = undefined;
  };

  return Carousel;
}(_DomElement["default"]);

var TRANSFORM = "transform";
var DURATION = "transitionDuration";
var TIMING = "transitionTimingFunction";

var SliderWrapper =
/** @class */
function () {
  function SliderWrapper(wrapperElement, slideAreaElement, carouselElement) {
    this._wrapperElement = wrapperElement;
    this._slideAreaElement = slideAreaElement;
    this._carouselElement = carouselElement;
    this._position = 0;
    this._index = 0;
    this._isdragging = false;
  }

  SliderWrapper.prototype._getSlide = function (index) {
    if (index < 0 || index >= this._wrapperElement.children.length) {
      throw new Error("Argument 'index' is out of range, Value: " + index + " Min: 0, Max: " + (this._wrapperElement.children.length - 1));
    }

    return this._wrapperElement.children[index];
  };

  SliderWrapper.prototype._setTransform = function (targetPosition, animated, duration, ease) {
    if (animated === void 0) {
      animated = false;
    }

    if (duration === void 0) {
      duration = ANIMATION_DURATION;
    }

    if (ease === void 0) {
      ease = ANIMATION_EASING;
    }

    if (animated === false) {
      duration = 0;
    }

    var style = this._wrapperElement.style;

    if (style) {
      style[DURATION] = duration + "ms";
      style[TIMING] = ease; // No sub pixel transitions.

      targetPosition = Math.floor(targetPosition);
      style[TRANSFORM] = "translate(" + targetPosition + "px, 0)";
      this._position = targetPosition;
    }
  };

  SliderWrapper.prototype._getWrapperSlidePosition = function (index) {
    var wrapperCenter = 0.5 * this._wrapperElement.offsetWidth;

    var slide = this._getSlide(index);

    var result = 0; // Calculate the position of the slide (centered)

    if (this._slidesPerGroup % 2 === 0) {
      var slideStyle = window.getComputedStyle(slide);
      var slideMargin = slideStyle ? parseInt(slideStyle.marginRight, 10) : 0; // Centered to the space between the two center slides of the group

      result = -slide.offsetLeft - slide.clientWidth + wrapperCenter - slideMargin;
    } else {
      result = -slide.offsetLeft - 0.5 * slide.clientWidth + wrapperCenter;
    }

    return result;
  };

  Object.defineProperty(SliderWrapper.prototype, "position", {
    get: function get() {
      return this._position;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SliderWrapper.prototype, "index", {
    get: function get() {
      return this._index;
    },
    set: function set(index) {
      this._index = index;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SliderWrapper.prototype, "slidesPerGroup", {
    set: function set(value) {
      this._slidesPerGroup = value;
    },
    enumerable: false,
    configurable: true
  });

  SliderWrapper.prototype.initialize = function () {
    this.onresize();
  };

  SliderWrapper.prototype.onresize = function () {
    // update the area offset for slide position calculation
    this._areaOffset = this._slideAreaElement.getBoundingClientRect().left; // Get the container dimensions

    var containerRect = this._carouselElement.getBoundingClientRect();

    this._containerMin = containerRect.left;
    this._containerMax = containerRect.right;
  };

  SliderWrapper.prototype.beginDrag = function () {
    this._isdragging = true;
    this._dragStartPosition = this._position;
  };

  SliderWrapper.prototype.cancelDrag = function () {
    this._isdragging = false;

    this._setTransform(this._dragStartPosition, true, ANIMATION_DURATION, ANIMATION_EASING);

    this._dragStartPosition = undefined;
  };

  SliderWrapper.prototype.endDrag = function () {
    this._isdragging = false;
    this._dragStartPosition = undefined;
  };

  SliderWrapper.prototype.move = function (delta, animated, duration, ease) {
    if (animated === void 0) {
      animated = false;
    }

    if (duration === void 0) {
      duration = ANIMATION_DURATION;
    }

    if (ease === void 0) {
      ease = ANIMATION_EASING;
    }

    delta = Math.trunc(delta);

    if (Math.abs(delta) <= 0) {
      return;
    }

    var targetPosition = this._position += delta;

    this._setTransform(targetPosition, animated, duration, ease);
  };

  SliderWrapper.prototype.moveTo = function (index, delta, animated) {
    if (animated === void 0) {
      animated = false;
    }

    var newPosition = 0;

    if (!delta) {
      newPosition = this._getWrapperSlidePosition(index);
    } else {
      newPosition = this._position += delta;
    }

    this._index = index;

    this._setTransform(newPosition, animated);
  };

  SliderWrapper.prototype.addSlide = function (slide, position) {
    if (!slide) {
      throw new Error("Cannot add an undefined slide");
    }

    if (position !== -1 && position !== 1) {
      throw new Error("Argument out of range, 'position' must be either 1 or -1. Value " + position);
    }

    if (position > 0) {
      this._wrapperElement.appendChild(slide);
    } else {
      this._wrapperElement.insertBefore(slide, this._wrapperElement.children[0]);

      this._index++;
    }

    if (position < 0) {
      var width = slide.offsetWidth;
      var style = window.getComputedStyle(slide);
      var marginLeft = style ? parseInt(style.marginLeft, 10) : 0;
      var marginRight = style ? parseInt(style.marginRight, 10) : 0;
      this.move(-(width + marginLeft + marginRight));
    }
  };

  SliderWrapper.prototype.removeSlide = function (index) {
    var slide = this._getSlide(index);

    var width = slide.offsetWidth;

    if (index <= this._index) {
      width *= -1;
      this._index--;
    }

    (0, _Utils.remove)(slide);

    if (width < 0) {
      this.move(-width);
    }
  };

  SliderWrapper.prototype.getSlideDelta = function (index) {
    var currentPosition = this._position;

    if (this._isdragging === true) {
      currentPosition = this._dragStartPosition - this._position;
    }

    var newPosition = this._getWrapperSlidePosition(index);

    return newPosition - currentPosition;
  };

  SliderWrapper.prototype.getSlideProperties = function (index, delta) {
    if (delta === void 0) {
      delta = 0;
    }

    var currentOffset = this._areaOffset + this._position + delta;
    var currentLeft = currentOffset;
    var currentRight = currentOffset;

    var _a = (0, _tslib.__read)([0, 0], 2),
        currentMarginLeft = _a[0],
        currentMarginRight = _a[1];

    var slide = this._getSlide(index);

    var slideIndex = parseInt(slide.getAttribute(ATTRIBUTE_INDEX), 10);

    for (var i = 0; i <= index; i++) {
      slide = this._getSlide(i);
      var slideStyle = window.getComputedStyle(slide);
      currentMarginLeft = parseInt(slideStyle.marginLeft, 10);
      currentMarginRight = parseInt(slideStyle.marginRight, 10);
      currentOffset += currentMarginLeft;
      currentLeft = currentOffset;
      currentRight = currentLeft + slide.offsetWidth;

      if (i < index) {
        currentOffset = currentRight + currentMarginRight;
      }
    }

    var visible = false;

    if (currentLeft > this._containerMin && currentLeft < this._containerMax || currentRight > this._containerMin && currentRight < this._containerMax) {
      visible = true;
    }

    return {
      visible: visible,
      index: slideIndex,
      left: currentLeft,
      right: currentRight,
      width: currentRight - currentLeft,
      marginLeft: currentMarginLeft,
      marginRight: currentMarginRight
    };
  };

  SliderWrapper.prototype.getRemovableSlides = function (delta) {
    var slides = [];
    var first;
    var last;
    var index = this._wrapperElement.children.length;

    while (index > 0) {
      index--;
      var propsNow = this.getSlideProperties(index);
      var propsNew = this.getSlideProperties(index, delta);

      if (index === this._wrapperElement.children.length - 1) {
        last = propsNew;
      }

      if (index === 0) {
        first = propsNew;
      }

      if (propsNow.visible === false && propsNew.visible === false && index !== this._index && this._isdragging === false) {
        slides.push(true);
      } else {
        slides.push(false);
      }
    }

    slides.reverse();
    var firstToKeep = slides.indexOf(false);
    var lastToKeep = slides.lastIndexOf(false);

    for (var i = firstToKeep; i < lastToKeep; i++) {
      slides[i] = false;
    }

    return {
      slides: slides,
      first: first,
      last: last
    };
  };

  SliderWrapper.prototype.getEmptySpace = function (left, right) {
    return {
      left: Math.max(Math.ceil(left - this._containerMin), 0),
      right: Math.max(Math.ceil(this._containerMax - right), 0)
    };
  };

  SliderWrapper.prototype.destroy = function () {
    this._wrapperElement = null;
    this._slideAreaElement = null;
    this._carouselElement = null;
  };
  /**
   * @deprecated use destroy() instead.
   * @todo remove in version 2.0.0
   */


  SliderWrapper.prototype.destory = function () {
    this.destroy();
  };

  return SliderWrapper;
}();

function init() {
  (0, _Utils.searchAndInitialize)(".carousel", function (e) {
    new Carousel(e);
  });
}

var _default = Carousel;
exports["default"] = _default;

},{"../DomElement":4,"../DomFunctions":5,"../Inputs":6,"../Utils":7,"@babel/runtime/helpers/interopRequireDefault":33,"@babel/runtime/helpers/interopRequireWildcard":34,"tslib":43}],10:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports["default"] = void 0;

var _tslib = require("tslib");

var _DomElement = _interopRequireDefault(require("../DomElement"));

var _Utils = require("../Utils");

var _DomFunctions = require("../DomFunctions");

var _ChartFunctions = require("./ChartFunctions");

var _animejs = _interopRequireDefault(require("animejs"));

var QUERY_DETAIL_RIGHT = ".detail-right";
var QUERY_DETAIL_BOTTOM = ".detail-bottom";
var QUERY_PROGRESS = ".bar-chart__progress";
var CLASS_UNLIMITED = "bar-chart-horizontal--unlimited";
var CLASS_LIMITED = "bar-chart-horizontal--limited";
var CLASS_DETAIL_VALUE = "value";
var CLASS_DETAIL_UNIT = "unit";
var CLASS_INDICATOR = "indicator";
var CLASS_INDICATOR_WRAPPER = "indicator-wrapper";
var CLASS_TOOLTIP = "tooltip";
var CLASS_TOOLTIP_MULTILINE = "tooltip--multiline";
var ANIMATION_DURATION = 500;
/**
 * Bar Chart Horizontal Component.
 */

var BarChartHorizontal =
/** @class */
function (_super) {
  (0, _tslib.__extends)(BarChartHorizontal, _super);
  /**
   * Creates and initializes the bar chart horizontal component.
   * @param {DomElement} - root element of the chart.
   */

  function BarChartHorizontal(element, data) {
    var _this = _super.call(this, element) || this;

    if (data) {
      _this._data = data;
    }

    _this._legendItems = [];

    _this._initialize();

    return _this;
  }

  BarChartHorizontal.prototype._initialize = function () {
    this._unit = this.getAttribute("data-unit") || "";
    this._maxValue = parseFloat(this.getAttribute("data-max"));
    this._precision = parseInt(this.getAttribute("data-precision"), 10) || 0;
    this._isUnlimited = this.hasClass(CLASS_UNLIMITED);
    this._isLimited = this.hasClass(CLASS_LIMITED);
    this._progessWrapper = this.element.querySelector(QUERY_PROGRESS);

    if (this._isLimited === true) {
      this._detailRight = this.element.querySelector(QUERY_DETAIL_BOTTOM);
    } else {
      this._detailRight = this.element.querySelector(QUERY_DETAIL_RIGHT);
    }

    if (this._isUnlimited === false && this._isLimited === false) {
      this._legend = (0, _DomFunctions.getAttributeReference)(this.element, "data-legend");
    }

    if (!this._data) {
      this._data = (0, _ChartFunctions.tryGetData)(this.element);
    }

    this._render();
  };

  BarChartHorizontal.prototype._render = function () {
    var e_1, _a;

    var dataOne = this._data[0];
    var dataTwo = this._data[1];
    var tooltip = this._isLimited === false ? this._getTooltipContent(this._data) : undefined;
    var animatedValueElement; // Cleanup

    (0, _ChartFunctions.removeAllChildren)(this._detailRight);
    (0, _ChartFunctions.removeAllChildren)(this._progessWrapper);

    try {
      // Clear only own legend items
      for (var _b = (0, _tslib.__values)(this._legendItems), _c = _b.next(); !_c.done; _c = _b.next()) {
        var item = _c.value;
        (0, _Utils.remove)(item);
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }

    this._legendItems = [];

    if (dataOne) {
      if (this._isUnlimited === false || this._isUnlimited === true && !dataTwo) {
        var valElement = animatedValueElement = this._createValueElement(dataOne);

        this._detailRight.appendChild(valElement);

        if (this._isLimited === false) {
          var separatorElement = new _DomElement["default"]("div").addClass(CLASS_DETAIL_UNIT).element;
          separatorElement.innerText = " " + this._unit;

          this._detailRight.appendChild(separatorElement);
        }
      } // Add the indicator


      var indicator = this._addIndicator(dataOne, tooltip);

      this._animateIndicator(indicator, 0); // Animate the value if required


      if (animatedValueElement && this._isLimited === true) {
        this._animateValueElement(animatedValueElement, dataOne.value);
      } // Add the legend


      if (this._legend) {
        var legendItem = (0, _ChartFunctions.createLegendItem)(dataOne);

        this._legend.appendChild(legendItem);

        this._legendItems.push(legendItem);

        this._animateLegend(legendItem, 0);
      }
    }

    if (dataTwo) {
      var valElement = this._createValueElement(dataTwo);

      var unitElement = new _DomElement["default"]("div").addClass(CLASS_DETAIL_UNIT).element;
      unitElement.innerText = " " + this._unit;

      this._detailRight.appendChild(valElement);

      this._detailRight.appendChild(unitElement); // Add the indicator


      var indicator = this._addIndicator(dataTwo, tooltip);

      this._animateIndicator(indicator, ANIMATION_DURATION); // Add the legend


      if (this._legend) {
        var legendItem = (0, _ChartFunctions.createLegendItem)(dataTwo);

        this._legend.appendChild(legendItem);

        this._legendItems.push(legendItem);

        this._animateLegend(legendItem, ANIMATION_DURATION);
      }
    }

    if (this._isLimited === true) {
      var valElement = this._createValueElement({
        value: this._maxValue
      });

      var unitElement = new _DomElement["default"]("div").addClass(CLASS_DETAIL_UNIT).element;
      unitElement.innerText = " " + this._unit;

      this._detailRight.appendChild(valElement);

      this._detailRight.appendChild(unitElement);
    }
  };

  BarChartHorizontal.prototype._animateValueElement = function (animatedValueElement, toValue) {
    var counter = {
      "var": 0
    };
    (0, _animejs["default"])({
      targets: counter,
      "var": toValue,
      duration: ANIMATION_DURATION,
      easing: "easeOutQuint",
      round: 1,
      update: function update() {
        animatedValueElement.innerText = "" + counter["var"];
      }
    });
  };

  BarChartHorizontal.prototype._animateIndicator = function (indicatorWrapper, animationOffset) {
    var indicator = indicatorWrapper.getElementsByClassName("indicator")[0];
    var indicatorWidth = indicator.scrollWidth;
    indicator.style.width = "0px";
    (0, _animejs["default"])({
      targets: indicator,
      duration: ANIMATION_DURATION,
      width: indicatorWidth + "px",
      easing: "easeInOutQuint",
      delay: animationOffset,
      complete: function complete() {
        indicator.style.width = "";
      }
    });
  };

  BarChartHorizontal.prototype._animateLegend = function (legendItem, animationOffset) {
    legendItem.style.opacity = "0";
    (0, _animejs["default"])({
      targets: legendItem,
      duration: ANIMATION_DURATION,
      opacity: 1,
      easing: "easeInOutQuint",
      delay: animationOffset,
      complete: function complete() {
        legendItem.style.removeProperty("opacity");
      }
    });
  };

  BarChartHorizontal.prototype._createValueElement = function (data) {
    var unlimitedPrefix = "";

    if (this._isUnlimited === true) {
      unlimitedPrefix = "+";
    }

    var value = parseFloat(data.value);

    if (value <= 0) {
      if (this._precision === 0) {
        value = "0";
      } else {
        value = ".";

        for (var i = 0; i < this._precision; i++) {
          value += "0";
        }
      }
    } else {
      value = value.toFixed(this._precision);
    }

    var valueElement = new _DomElement["default"]("div").addClass(CLASS_DETAIL_VALUE).element;
    valueElement.innerText = "" + unlimitedPrefix + value;
    return valueElement;
  };

  BarChartHorizontal.prototype._addIndicator = function (data, tooltip) {
    var width = 100.0 / this._maxValue * data.value;
    var indicator = new _DomElement["default"]("div").addClass(CLASS_INDICATOR);

    if ((0, _ChartFunctions.isColor)(data.color) === true) {
      indicator.setAttribute("style", "background-color: " + data.color + ";");
    } else {
      indicator.addClass(data.color);
    }

    var indicatorWrapper = new _DomElement["default"]("div").addClass(CLASS_INDICATOR_WRAPPER).setAttribute("style", "width: " + width + "%").appendChild(indicator).setAttribute("onclick", "void(0)");

    if (tooltip && tooltip !== "") {
      indicatorWrapper.addClass(CLASS_TOOLTIP).addClass(CLASS_TOOLTIP_MULTILINE).setAttribute("aria-label", tooltip);
    }

    this._progessWrapper.appendChild(indicatorWrapper.element);

    return indicatorWrapper.element;
  };

  BarChartHorizontal.prototype._getTooltipContent = function (dataList) {
    var e_2, _a;

    var tooltip = "";

    try {
      for (var dataList_1 = (0, _tslib.__values)(dataList), dataList_1_1 = dataList_1.next(); !dataList_1_1.done; dataList_1_1 = dataList_1.next()) {
        var data = dataList_1_1.value;
        tooltip += data.title + ": " + data.value + " " + this._unit + "\n";
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (dataList_1_1 && !dataList_1_1.done && (_a = dataList_1["return"])) _a.call(dataList_1);
      } finally {
        if (e_2) throw e_2.error;
      }
    }

    return tooltip.trim();
  };
  /**
   * Updates the bar chart with the specified data definitions.
   * @param {Array} - bar chart data definitions.
   */


  BarChartHorizontal.prototype.update = function (data) {
    if (data) {
      this._data = data;
    }

    this._render();
  };
  /**
   * Removes all event handlers and clears references.
   */


  BarChartHorizontal.prototype.destroy = function () {
    var e_3, _a;

    this._data = undefined;
    (0, _ChartFunctions.removeAllChildren)(this._detailRight);
    (0, _ChartFunctions.removeAllChildren)(this._progessWrapper);
    this._detailRight = undefined;
    this._progessWrapper = undefined;

    try {
      for (var _b = (0, _tslib.__values)(this._legendItems), _c = _b.next(); !_c.done; _c = _b.next()) {
        var item = _c.value;
        (0, _Utils.remove)(item);
      }
    } catch (e_3_1) {
      e_3 = {
        error: e_3_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
      } finally {
        if (e_3) throw e_3.error;
      }
    }

    this._legendItems = undefined;
    this._legend = undefined;
  };
  /**
   * @deprecated use destroy() instead.
   * @todo remove in version 2.0.0
   */


  BarChartHorizontal.prototype.destory = function () {
    this.destroy();
  };

  return BarChartHorizontal;
}(_DomElement["default"]);

function init() {
  (0, _Utils.searchAndInitialize)(".bar-chart-horizontal", function (e) {
    new BarChartHorizontal(e);
  });
}

var _default = BarChartHorizontal;
exports["default"] = _default;

},{"../DomElement":4,"../DomFunctions":5,"../Utils":7,"./ChartFunctions":12,"@babel/runtime/helpers/interopRequireDefault":33,"animejs":36,"tslib":43}],11:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports["default"] = void 0;

var _tslib = require("tslib");

var _DomElement = _interopRequireDefault(require("../DomElement"));

var _Utils = require("../Utils");

var _DomFunctions = require("../DomFunctions");

var _ChartFunctions = require("./ChartFunctions");

var _animejs = _interopRequireDefault(require("animejs"));

var QUERY_DATA_CATEGORIES = ".js-data-list .js-category";
var QUERY_DATA_ITEMS = ".js-data-list .js-data";
var QUERY_CHART = ".js-chart";
var QUERY_LEGEND = ".bar-chart__legend";
var CLASS_INDICATOR = "indicator";
var CLASS_LABEL_X = "axis-x-label";
var CLASS_INDICATOR_WRAPPER = "indicator-wrapper";
var CLASS_INDICATOR_INNER_WRAPPER = "indicator-wrapper-inner";
var CLASS_INDICATOR_EMPTY = "empty";
var CLASS_TOOLTIP = "tooltip";
var CLASS_TOOLTIP_LEFT = "tooltip--left";
var CLASS_TOOLTIP_RIGHT = "tooltip--right";
var CLASS_TOOLTIP_MULTILINE = "tooltip--multiline";
var ANIMATION_DURATION = 500;
/**
 * Bar Chart Horizontal Component.
 */

var BarChartVertical =
/** @class */
function (_super) {
  (0, _tslib.__extends)(BarChartVertical, _super);
  /**
   * Creates and initializes the bar chart horizontal component.
   * @param element - root element of the chart.
   * @param data - data for the chart.
   */

  function BarChartVertical(element, data) {
    var _this = _super.call(this, element) || this;

    if (data) {
      _this._data = data;
    }

    _this._initialize();

    return _this;
  }

  BarChartVertical.prototype._initialize = function () {
    this._unit = this.getAttribute("data-unit") || "";
    this._maxValue = parseFloat(this.getAttribute("data-max")) || 100;
    this._chart = this.element.querySelector(QUERY_CHART);
    this._legend = this.element.querySelector(QUERY_LEGEND);

    if (!this._data) {
      this._data = this._tryGetData(this.element);
    }

    this._render();
  };

  BarChartVertical.prototype._tryGetData = function (element) {
    var e_1, _a, e_2, _b, e_3, _c;

    var data = {
      categories: [],
      items: []
    };
    var categories = element.querySelectorAll(QUERY_DATA_CATEGORIES);
    var items = element.querySelectorAll(QUERY_DATA_ITEMS);

    try {
      for (var categories_1 = (0, _tslib.__values)(categories), categories_1_1 = categories_1.next(); !categories_1_1.done; categories_1_1 = categories_1.next()) {
        var category = categories_1_1.value;
        data.categories.push({
          title: (0, _DomFunctions.text)(category),
          color: category.getAttribute("data-color")
        });
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (categories_1_1 && !categories_1_1.done && (_a = categories_1["return"])) _a.call(categories_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }

    try {
      for (var items_1 = (0, _tslib.__values)(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
        var item = items_1_1.value;
        var dataEnty = {
          title: (0, _DomFunctions.text)(item),
          "class": item.getAttribute("data-class"),
          values: []
        };
        var vals = item.getAttribute("data-value");

        if (vals) {
          try {
            for (var _d = (e_3 = void 0, (0, _tslib.__values)(vals.split(","))), _e = _d.next(); !_e.done; _e = _d.next()) {
              var val = _e.value;
              dataEnty.values.push(parseFloat(val));
            }
          } catch (e_3_1) {
            e_3 = {
              error: e_3_1
            };
          } finally {
            try {
              if (_e && !_e.done && (_c = _d["return"])) _c.call(_d);
            } finally {
              if (e_3) throw e_3.error;
            }
          }
        }

        data.items.push(dataEnty);
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (items_1_1 && !items_1_1.done && (_b = items_1["return"])) _b.call(items_1);
      } finally {
        if (e_2) throw e_2.error;
      }
    }

    return data;
  };

  BarChartVertical.prototype._getTooltipContent = function (entry, categories) {
    var tooltip = "";

    for (var i = 0; i < entry.values.length; i++) {
      tooltip += categories[i].title + ": " + entry.values[i] + " " + this._unit + "\n";
    }

    return tooltip.trim();
  };

  BarChartVertical.prototype._render = function () {
    var e_4, _a, e_5, _b;

    if (this._legend) {
      (0, _ChartFunctions.removeAllChildren)(this._legend);

      try {
        for (var _c = (0, _tslib.__values)(this._data.categories), _d = _c.next(); !_d.done; _d = _c.next()) {
          var category = _d.value;
          var legendItem = (0, _ChartFunctions.createLegendItem)(category);

          this._legend.appendChild(legendItem);
        }
      } catch (e_4_1) {
        e_4 = {
          error: e_4_1
        };
      } finally {
        try {
          if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
        } finally {
          if (e_4) throw e_4.error;
        }
      }
    }

    (0, _ChartFunctions.removeAllChildren)(this._chart);
    var animationStages = [];
    var leftSideItems = Math.floor(this._data.items.length / 2);

    try {
      for (var _e = (0, _tslib.__values)(this._data.items), _f = _e.next(); !_f.done; _f = _e.next()) {
        var item = _f.value;
        var element = new _DomElement["default"]("li");

        if (item["class"]) {
          element.addClass(item["class"]);
        }

        var listElement = new _DomElement["default"]("ul").addClass(CLASS_INDICATOR_WRAPPER);
        var wrapper = new _DomElement["default"]("div").addClass(CLASS_INDICATOR_INNER_WRAPPER);
        listElement.appendChild(wrapper);
        element.appendChild(listElement);

        var tooltip = this._getTooltipContent(item, this._data.categories);

        if (tooltip) {
          wrapper.addClass(CLASS_TOOLTIP).addClass(leftSideItems <= 0 ? CLASS_TOOLTIP_LEFT : CLASS_TOOLTIP_RIGHT).setAttribute("aria-label", tooltip);

          if (item.values.length > 1) {
            wrapper.addClass(CLASS_TOOLTIP_MULTILINE);
          }
        }

        for (var i = 0; i < item.values.length; i++) {
          var height = this._chart.offsetHeight / this._maxValue * item.values[i];
          var indicator = new _DomElement["default"]("li").addClass(CLASS_INDICATOR).setAttribute("style", "height: " + height + "px;");

          if (height > 0) {
            var color = this._data.categories[i].color;

            if ((0, _ChartFunctions.isColor)(color)) {
              indicator.setAttribute("style", "background-color: " + color + ";");
            } else {
              indicator.addClass(color);
            }

            if (animationStages.length <= i) {
              animationStages.push([]);
            }

            animationStages[i].push(indicator.element);
          } else {
            indicator.addClass(CLASS_INDICATOR_EMPTY);
          }

          wrapper.appendChild(indicator);
        }

        var titleDomElement = new _DomElement["default"]("div").addClass(CLASS_LABEL_X);
        var titleElement = titleDomElement.element;
        titleElement.innerText = item.title;
        element.appendChild(titleDomElement);

        this._chart.appendChild(element.element);

        leftSideItems -= 1;
      }
    } catch (e_5_1) {
      e_5 = {
        error: e_5_1
      };
    } finally {
      try {
        if (_f && !_f.done && (_b = _e["return"])) _b.call(_e);
      } finally {
        if (e_5) throw e_5.error;
      }
    }

    for (var i = 0; i < animationStages.length; i++) {
      var offset = ANIMATION_DURATION * i;

      this._animateBars(animationStages[i], offset);

      if (this._legend) {
        this._animateLegend(this._legend.children[i], offset);
      }
    }
  };

  BarChartVertical.prototype._animateBars = function (bars, animationOffset) {
    for (var i = 0; i < bars.length; i++) {
      var bar = bars[i];
      var barHeight = bar.style.height;
      bar.style.height = "0";
      (0, _animejs["default"])({
        targets: bars[i],
        height: barHeight,
        easing: "easeInOutQuint",
        duration: ANIMATION_DURATION,
        delay: animationOffset
      });
    }
  };

  BarChartVertical.prototype._animateLegend = function (legend, animationOffset) {
    legend.style.opacity = "0";
    (0, _animejs["default"])({
      targets: legend,
      opacity: 1,
      easing: "easeInOutQuint",
      duration: ANIMATION_DURATION,
      delay: animationOffset
    });
  };
  /**
   * Updates the bar chart with the specified data definitions.
   * @param {Array} - bar chart data definitions.
   */


  BarChartVertical.prototype.update = function (data) {
    if (data) {
      this._data = data;
    }

    this._render();
  };
  /**
   * Removes all event handlers and clears references.
   */


  BarChartVertical.prototype.destroy = function () {
    this._data = undefined;

    if (this._legend) {
      (0, _ChartFunctions.removeAllChildren)(this._legend);
      this._legend = undefined;
    }
  };
  /**
   * @deprecated use destroy() instead.
   * @todo remove in version 2.0.0
   */


  BarChartVertical.prototype.destory = function () {
    this.destroy();
  };

  return BarChartVertical;
}(_DomElement["default"]);

function init() {
  (0, _Utils.searchAndInitialize)(".bar-chart-vertical", function (e) {
    new BarChartVertical(e);
  });
}

var _default = BarChartVertical;
exports["default"] = _default;

},{"../DomElement":4,"../DomFunctions":5,"../Utils":7,"./ChartFunctions":12,"@babel/runtime/helpers/interopRequireDefault":33,"animejs":36,"tslib":43}],12:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tryGetData = tryGetData;
exports.removeAllChildren = removeAllChildren;
exports.createLegendItem = createLegendItem;
exports.isColor = isColor;

var _tslib = require("tslib");

var _DomElement = _interopRequireDefault(require("../DomElement"));

var _DomFunctions = require("../DomFunctions");

var QUERY_DATA = ".js-data";

function tryGetData(element) {
  var e_1, _a;

  var data = [];
  var elements = element.querySelectorAll(QUERY_DATA);

  try {
    for (var elements_1 = (0, _tslib.__values)(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
      var entry = elements_1_1.value;
      var value = parseFloat(entry.getAttribute("data-value"));
      var color = entry.getAttribute("data-color");
      var title = (0, _DomFunctions.text)(entry);
      var item = {
        title: title,
        value: value,
        color: color
      };
      data.push(item);
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (elements_1_1 && !elements_1_1.done && (_a = elements_1["return"])) _a.call(elements_1);
    } finally {
      if (e_1) throw e_1.error;
    }
  }

  return data;
}

function removeAllChildren(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function createLegendItem(data) {
  var bullet = new _DomElement["default"]("span").addClass("bullet");

  if (isColor(data.color) === true) {
    bullet.setAttribute("style", "background-color: " + data.color + ";");
  } else {
    bullet.addClass(data.color);
  }

  var caption = new _DomElement["default"]("span").setHtml(data.title);
  return new _DomElement["default"]("li").appendChild(bullet).appendChild(caption).element;
}

function isColor(str) {
  var pattern = /^#/i;
  return pattern.test(str);
}

},{"../DomElement":4,"../DomFunctions":5,"@babel/runtime/helpers/interopRequireDefault":33,"tslib":43}],13:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports["default"] = void 0;

var _tslib = require("tslib");

var _DomElement = _interopRequireDefault(require("../DomElement"));

var _Utils = require("../Utils");

var _ChartFunctions = require("./ChartFunctions");

var _animejs = _interopRequireDefault(require("animejs"));

var QUERY_CHART = ".js-chart";
var QUERY_LEGEND = ".js-legend";
var DASH_SEPARATOR_WIDTH = 3;
var ANIMATION_DURATION = 1500;
var ANIMATION_DURATION_LEGEND = 500;
var QUERY_META_TITLE = ".meta .title";
var QUERY_META_SUBTITLE = ".meta .subtitle";
/**
 * Pie Chart Component.
 */

var PieChart =
/** @class */
function (_super) {
  (0, _tslib.__extends)(PieChart, _super);
  /**
   * Creates and initializes the Pie Chart component.
   * @param {DomElement} - root element of the chart.
   * @param {Array} - pie chart data definitions.
   */

  function PieChart(element, data) {
    var _this = _super.call(this, element) || this;

    if (data) {
      _this._data = data;
    }

    _this._initialize();

    return _this;
  }

  PieChart.prototype._initialize = function () {
    this._chart = this.element.querySelector(QUERY_CHART);
    this._legend = this.element.querySelector(QUERY_LEGEND);
    this._title = this.element.querySelector(QUERY_META_TITLE);
    this._subtitle = this.element.querySelector(QUERY_META_SUBTITLE);
    this._unit = this.getAttribute("data-unit") || "";
    this._alwaysShowLegend = this.element.hasAttribute("data-always-show-legend");

    if (!this._data) {
      this._data = (0, _ChartFunctions.tryGetData)(this.element);
    }

    this._render();
  };

  PieChart.prototype._render = function () {
    var total = this._data.reduce(function (a, b) {
      return a + b.value;
    }, 0);

    var r = 16;
    var dashTotal = 2 * r * Math.PI;
    var currentRotate = 9; // Cleanup

    (0, _ChartFunctions.removeAllChildren)(this._chart);

    if (this._legend) {
      (0, _ChartFunctions.removeAllChildren)(this._legend);
    }

    var percentageAdjustTotal = 0;
    var percentageAdjust = 0;
    var separatorPercentage = DASH_SEPARATOR_WIDTH / 100;

    for (var i = 0; i < this._data.length; i++) {
      var entry = this._data[i];
      var percentage = entry.value / total;

      if (percentage < separatorPercentage) {
        percentageAdjustTotal += separatorPercentage - percentage;
        percentageAdjust++;
      }
    }

    if (percentageAdjust > 0) {
      percentageAdjust = percentageAdjustTotal / (this._data.length - percentageAdjust);
    }

    var animations = _animejs["default"].timeline();

    var animationOffset = 0;

    var _loop_1 = function _loop_1(i) {
      var entry = this_1._data[i];
      var displayPercentage = entry.value / total;
      var percentage = Math.max(separatorPercentage, displayPercentage - percentageAdjust);
      var dashWidth = percentage * dashTotal - DASH_SEPARATOR_WIDTH;
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 34 34");
      svg.setAttribute("role", "img");
      svg.setAttribute("aria-labelledby", "title desc");
      var title = document.createElementNS("http://www.w3.org/2000/svg", "title");
      title.setAttribute("id", "title");
      title.innerHTML = "Pie chart segment " + Math.floor(displayPercentage * 100) + "%";
      var description = document.createElementNS("http://www.w3.org/2000/svg", "desc");
      description.setAttribute("id", "desc");
      description.innerHTML = entry.title + ": " + entry.value;
      var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", "17");
      circle.setAttribute("cy", "17");
      circle.setAttribute("r", String(r));

      if ((0, _ChartFunctions.isColor)(entry.color) === true) {
        circle.setAttribute("stroke", "" + entry.color);
      } else {
        circle.setAttribute("class", entry.color);
      }

      circle.setAttribute("role", "presentation");
      svg.setAttribute("style", "transform: rotate(" + currentRotate + "deg);");
      svg.appendChild(title);
      svg.appendChild(description);
      svg.appendChild(circle);

      this_1._chart.appendChild(svg);

      var animationDuration = ANIMATION_DURATION * percentage;
      circle.style.display = "none";
      var counter = {
        "var": 0.5
      };
      animations.add({
        targets: counter,
        "var": dashWidth,
        begin: function begin() {
          circle.style.display = "";
        },
        update: function update() {
          circle.setAttribute("stroke-dasharray", counter["var"] + " " + dashTotal);
        },
        duration: animationDuration,
        easing: "easeInQuint"
      }); // Legend

      if (this_1._legend && this_1._data.length > 1 || this_1._alwaysShowLegend) {
        var bullet = new _DomElement["default"]("span").addClass("bullet");

        if ((0, _ChartFunctions.isColor)(entry.color) === true) {
          bullet.setAttribute("style", "background-color: " + entry.color);
        } else {
          bullet.addClass(entry.color);
        }

        var caption = new _DomElement["default"]("span");
        var captionElement = caption.element;
        captionElement.innerText = entry.title;
        var legendItem = new _DomElement["default"]("li").appendChild(bullet).appendChild(caption);

        this_1._legend.appendChild(legendItem.element);

        this_1._animateLegend(legendItem.element, animationOffset);
      }

      animationOffset += animationDuration;
      currentRotate += 360 * percentage;

      if (i === this_1._data.length - 1) {
        this_1._title.innerHTML = entry.value + " " + this_1._unit;
        this_1._subtitle.innerHTML = entry.title;
      }
    };

    var this_1 = this;

    for (var i = 0; i < this._data.length; i++) {
      _loop_1(i);
    }
  };

  PieChart.prototype._animateLegend = function (legendItem, animationOffset) {
    legendItem.style.opacity = "0";
    (0, _animejs["default"])({
      targets: legendItem,
      duration: ANIMATION_DURATION_LEGEND,
      opacity: 1,
      easing: "easeInOutQuint",
      delay: animationOffset,
      complete: function complete() {
        legendItem.style.removeProperty("opacity");
      }
    });
  };
  /**
   * Updates the pie chart with the specified data definitions.
   * @param {Array} - pie chart data definitions.
   */


  PieChart.prototype.update = function (data) {
    if (data) {
      this._data = data;
    }

    this._render();
  };
  /**
   * Removes all event handlers and clears references.
   */


  PieChart.prototype.destroy = function () {
    this._data = undefined;
    this._title = undefined;
    this._subtitle = undefined;
    this._unit = undefined;
    (0, _ChartFunctions.removeAllChildren)(this._chart);
    this._chart = undefined;

    if (this._legend) {
      (0, _ChartFunctions.removeAllChildren)(this._legend);
      this._legend = undefined;
    }
  };
  /**
   * @deprecated use destroy() instead.
   * @todo remove in version 2.0.0
   */


  PieChart.prototype.destory = function () {
    this.destroy();
  };

  return PieChart;
}(_DomElement["default"]);

function init() {
  (0, _Utils.searchAndInitialize)(".pie-chart", function (e) {
    new PieChart(e);
  });
}

var _default = PieChart;
exports["default"] = _default;

},{"../DomElement":4,"../Utils":7,"./ChartFunctions":12,"@babel/runtime/helpers/interopRequireDefault":33,"animejs":36,"tslib":43}],14:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports["default"] = void 0;

var _tslib = require("tslib");

var _Utils = require("../Utils");

var _animejs = _interopRequireDefault(require("animejs"));

var _DomElement = _interopRequireDefault(require("../DomElement"));

var _DomFunctions = require("../DomFunctions");

var CLASS_OPEN = "is-open";
var ANIMATION_OPEN = 300;
/**
 * The Collapse component.
 */

var Collapse =
/** @class */
function (_super) {
  (0, _tslib.__extends)(Collapse, _super);
  /**
   * Creates and initializes the Collapse component.
   * @param {DomElement} - The root element of the Collapse component.
   */

  function Collapse(element) {
    var _this = _super.call(this, element) || this;

    _this._clickHandler = _this._handleClick.bind(_this);

    _this._initialize();

    return _this;
  }
  /**
   * Initializes the Collapse component.
   * @private
   */


  Collapse.prototype._initialize = function () {
    var dataTarget = this.element.getAttribute("data-target");

    if (dataTarget === null || dataTarget === "") {
      /* tslint:disable:no-console */
      console.error("A collapsible element requires a 'data-target' that specifies the element to collapse");
      console.info(this.element);
      /* tslint:enable:no-console */

      return;
    }

    var hiddenTarget = this.element.getAttribute("data-hidden");

    if (hiddenTarget !== null && hiddenTarget !== "") {
      this._hiddenIndicator = document.querySelector(hiddenTarget);
    }

    this._collapsibleElements = document.querySelectorAll(dataTarget);
    this.element.addEventListener("click", this._clickHandler);
  };

  Collapse.prototype._handleClick = function (event) {
    (0, _Utils.preventDefault)(event);
    this.toggle();
  };
  /**
   * Toggles the collapseible.
   */


  Collapse.prototype.toggle = function () {
    var e_1, _a, e_2, _b;

    if (this._hiddenIndicator && (0, _DomFunctions.isHidden)(this._hiddenIndicator, false) === true) {
      return;
    }

    if ((0, _DomFunctions.hasClass)(this.element, CLASS_OPEN) === false) {
      (0, _DomFunctions.addClass)(this.element, CLASS_OPEN);

      try {
        for (var _c = (0, _tslib.__values)(this._collapsibleElements), _d = _c.next(); !_d.done; _d = _c.next()) {
          var s = _d.value;

          this._openCollapse(s);
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    } else {
      (0, _DomFunctions.removeClass)(this.element, CLASS_OPEN);

      try {
        for (var _e = (0, _tslib.__values)(this._collapsibleElements), _f = _e.next(); !_f.done; _f = _e.next()) {
          var s = _f.value;

          this._closeCollapse(s);
        }
      } catch (e_2_1) {
        e_2 = {
          error: e_2_1
        };
      } finally {
        try {
          if (_f && !_f.done && (_b = _e["return"])) _b.call(_e);
        } finally {
          if (e_2) throw e_2.error;
        }
      }
    }
  };

  Collapse.prototype._openCollapse = function (el) {
    _animejs["default"].remove(el);

    el.style.display = "block";
    (0, _animejs["default"])({
      targets: el,
      duration: ANIMATION_OPEN,
      height: el.scrollHeight + "px",
      easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
      complete: function complete() {
        var domEl = new _DomElement["default"](el);
        domEl.addClass(CLASS_OPEN);
        domEl.setAttribute("style", "");
      }
    }); // set aria expanded

    el.setAttribute("aria-expanded", "true");
  };

  Collapse.prototype._closeCollapse = function (el) {
    _animejs["default"].remove(el);

    (0, _animejs["default"])({
      targets: el,
      duration: ANIMATION_OPEN,
      height: 0,
      easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
      complete: function complete() {
        var domEl = new _DomElement["default"](el);
        domEl.removeClass(CLASS_OPEN);
        domEl.setAttribute("style", "");
      }
    }); // set aria expanded

    el.setAttribute("aria-expanded", "false");
  };
  /**
   * Removes all event handlers and clears references.
   */


  Collapse.prototype.destroy = function () {
    this._collapsibleElements = null;

    if (this._clickHandler) {
      this.element.removeEventListener("click", this._clickHandler);
    }

    this.element = null;
  };

  return Collapse;
}(_DomElement["default"]);

function init() {
  var e_3, _a;

  var elements = document.querySelectorAll("[data-toggle='collapse']");

  try {
    for (var elements_1 = (0, _tslib.__values)(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
      var e = elements_1_1.value;

      if (e.getAttribute("data-init") === "auto") {
        new Collapse(e);
      }
    }
  } catch (e_3_1) {
    e_3 = {
      error: e_3_1
    };
  } finally {
    try {
      if (elements_1_1 && !elements_1_1.done && (_a = elements_1["return"])) _a.call(elements_1);
    } finally {
      if (e_3) throw e_3.error;
    }
  }
}

var _default = Collapse;
exports["default"] = _default;

},{"../DomElement":4,"../DomFunctions":5,"../Utils":7,"@babel/runtime/helpers/interopRequireDefault":33,"animejs":36,"tslib":43}],15:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports["default"] = void 0;

var _tslib = require("tslib");

var _Utils = require("../Utils");

var _DomElement = _interopRequireDefault(require("../DomElement"));

var _DomFunctions = require("../DomFunctions");

var CLASS_BORDER = "empty-state__border";
var CLASS_BORDER_MODAL = "empty-state__border--modal";
var CLASS_ACTIVE = "is-active";
var CLASS_HASFILES = "has-files";
var CLASS_MODAL = "empty-state--modal";
var CLASS_MODAL_CONTENT = "modal__content";
var QUERY_MODAL_BODY = ".modal__body";
var QUERY_FILE = "input[type='file']";
/**
 * Empty state pattern
 */

var EmptyState =
/** @class */
function (_super) {
  (0, _tslib.__extends)(EmptyState, _super);
  /**
   * Creates and initializes the Empty-State pattern component.
   * @param {DomElement} - root element of the empty-state pattern.
   */

  function EmptyState(element) {
    var _this = _super.call(this, element) || this;

    _this._fileInput = _this.element.querySelector(QUERY_FILE);
    _this._button = _this.element.querySelector("label");
    _this._fileChangedHandler = _this._handleFileChanged.bind(_this);
    _this._preventEventsHandler = _this._preventDragEvents.bind(_this);
    _this._dragEnterHandler = _this._handleDragEnter.bind(_this);
    _this._dragLeaveHandler = _this._handleDragLeave.bind(_this);
    _this._dropHandler = _this._handleDrop.bind(_this);
    _this._isDragging = false;

    _this._initialize();

    return _this;
  }

  EmptyState.prototype._initialize = function () {
    var e_1, _a;

    if (this.hasClass(CLASS_MODAL)) {
      // handle modal dialogs
      this._dragArea = (0, _DomFunctions.parentWithClass)(this.element, CLASS_MODAL_CONTENT);

      var borderArea = this._dragArea.querySelector(QUERY_MODAL_BODY);

      borderArea.setAttribute("style", "pointer-events: none;");
      this._border = new _DomElement["default"]("div").addClass(CLASS_BORDER).addClass(CLASS_BORDER_MODAL);
      borderArea.appendChild(this._border.element);
    } else {
      // normal modal dialog
      this._dragArea = this.element;
      var borderArea = (0, _DomFunctions.getRootElement)();
      this._border = new _DomElement["default"]("div").addClass(CLASS_BORDER);

      if (!borderArea.querySelector("." + CLASS_BORDER)) {
        borderArea.appendChild(this._border.element);
      }
    }

    var form = this.element.querySelector("form");

    try {
      for (var _b = (0, _tslib.__values)(["drag", "dragstart", "dragend", "dragover", "dragenter", "dragleave", "drop"]), _c = _b.next(); !_c.done; _c = _b.next()) {
        var event_1 = _c.value;
        this.element.addEventListener(event_1, this._preventEventsHandler);
        form.addEventListener(event_1, this._preventEventsHandler);

        this._dragArea.addEventListener(event_1, this._preventEventsHandler);
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }

    this._dragArea.addEventListener("dragover", this._dragEnterHandler);

    this._dragArea.addEventListener("dragenter", this._dragEnterHandler);

    this._dragArea.addEventListener("dragleave", this._dragLeaveHandler);

    this._dragArea.addEventListener("dragend", this._dragLeaveHandler);

    this._dragArea.addEventListener("drop", this._dragLeaveHandler);

    this._dragArea.addEventListener("drop", this._dropHandler);

    this._fileInput.addEventListener("change", this._fileChangedHandler);
  };

  EmptyState.prototype._preventDragEvents = function (e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  EmptyState.prototype._handleDragEnter = function () {
    if (this._isDragging === true) {
      return;
    }

    this._isDragging = true;

    this._button.setAttribute("style", "pointer-events: none;");

    this.addClass(CLASS_ACTIVE);

    this._border.addClass(CLASS_ACTIVE);
  };

  EmptyState.prototype._handleDragLeave = function () {
    if (this._isDragging === false) {
      return;
    }

    this._isDragging = false;

    this._button.setAttribute("style", "");

    this.removeClass(CLASS_ACTIVE);

    this._border.removeClass(CLASS_ACTIVE);
  };

  EmptyState.prototype._handleDrop = function (e) {
    var dragEvent = e;
    this._fileInput.files = dragEvent.dataTransfer.files;
  };

  EmptyState.prototype._handleFileChanged = function () {
    var files = this._fileInput.files;

    if (files && files.length > 0) {
      this.addClass(CLASS_HASFILES);
    } else {
      this.removeClass(CLASS_HASFILES);
    }
  };

  Object.defineProperty(EmptyState.prototype, "files", {
    /**
     * Gets the currently selected files.
     */
    get: function get() {
      return this._fileInput.files;
    },
    enumerable: false,
    configurable: true
  });
  return EmptyState;
}(_DomElement["default"]);

function init() {
  (0, _Utils.searchAndInitialize)(".empty-state", function (e) {
    new EmptyState(e);
  });
}

var _default = EmptyState;
exports["default"] = _default;

},{"../DomElement":4,"../DomFunctions":5,"../Utils":7,"@babel/runtime/helpers/interopRequireDefault":33,"tslib":43}],16:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports["default"] = void 0;

var _tslib = require("tslib");

var _Utils = require("../Utils");

var _DomFunctions = require("../DomFunctions");

var _DomElement = _interopRequireDefault(require("../DomElement"));

var Inputs = _interopRequireWildcard(require("../Inputs"));

var QUERY_DROPDOWN = ".js-autocomplete";
var CLASS_RESULT = "autocomplete__result";
var CLASS_OPEN = "is-open";
var CLASS_HOVER = "js-hover";
var ATTRIBUTE_VALUE = "data-value";
var TIMEOUT_BLUR = 400;
/**
 * Autocomplete component
 * @fires Autocomplete#change
 */

var Autocomplete =
/** @class */
function (_super) {
  (0, _tslib.__extends)(Autocomplete, _super);

  function Autocomplete(element, configuration) {
    var _this = _super.call(this, element) || this;

    _this._input = _this.element.querySelector("input");
    _this._dropdown = _this.element.querySelector(QUERY_DROPDOWN); // Setup event context

    _this._clickHandler = _this._handleClick.bind(_this);
    _this._windowClickHandler = _this._handleWindowClick.bind(_this);
    _this._keyUpHandler = _this._handleKeyUp.bind(_this);
    _this._keyDownHandler = _this._handleKeyDown.bind(_this);
    _this._blurHandler = _this._handleBlur.bind(_this);

    if (configuration) {
      _this._minChars = configuration.minChars;
      _this._source = configuration.source;
    }

    if (!_this._minChars || _this._minChars < 0) {
      _this._minChars = 2;
    }

    _this._initialize();

    return _this;
  }
  /**
   * Initializes the Autocomplete component.
   * @private
   */


  Autocomplete.prototype._initialize = function () {
    this._clearSuggestions();

    if (this._input.getAttribute("disabled")) {
      this.disable();
    } else {
      this.enable();
    } // Disable browser autofill


    this._input.setAttribute("autocomplete", "off");
  };
  /**
   * The Autocomplete component configuration object
   * @callback Autocomplete~Suggest
   * @property {String} term - The current search term.
   * @property {String[]} matches - The list of matching strings.
   */

  /**
   * The Autocomplete component configuration object
   * @callback Autocomplete~Source
   * @property {String} term - The current search term.
   * @property {Autocomplete~Suggest} suggest - The autocomplete callback function to report the results.
   */

  /**
   * The Autocomplete component configuration object
   * @typedef {Object} Autocomplete~Config
   * @property {Number} minChars - The minimal required characters to start querying for autocomplete matches.
   * @property {Autocomplete~Source} source - The autocomplete source function.
   */

  /**
   * Updates the autocomplete component configuration for the current instance
   * @param {Autocomplete~Config} configuration The configuration object
   */


  Autocomplete.prototype.configure = function (configuration) {
    if (!configuration) {
      return;
    }

    if (configuration.minChars) {
      this._minChars = Math.min(configuration.minChars, 1);
    }

    if (configuration.source) {
      this._source = configuration.source;
    }

    this._clearSuggestions();
  };
  /**
   * Sets the select control to the enabled state.
   */


  Autocomplete.prototype.enable = function () {
    if (!this._input) {
      return;
    }

    this._input.removeAttribute("disabled");

    this._input.addEventListener("keyup", this._keyUpHandler);

    this._input.addEventListener("keydown", this._keyDownHandler);

    this._input.addEventListener("blur", this._blurHandler);
  };
  /**
   * Sets the select control to the disabled state.
   */


  Autocomplete.prototype.disable = function () {
    if (!this._input) {
      return;
    }

    this._input.setAttribute("disabled", "true");

    this._input.removeEventListener("keyup", this._keyUpHandler);

    this._input.removeEventListener("keydown", this._keyDownHandler);

    this._input.removeEventListener("blur", this._blurHandler);

    this.close();
  };
  /**
   * Destroys the component and frees all references.
   */


  Autocomplete.prototype.destroy = function () {
    this.disable();
    this._keyUpHandler = undefined;
    this._keyDownHandler = undefined;
    this._windowClickHandler = undefined;
    this._blurHandler = undefined;
    this._input = undefined;
  };
  /**
   * Closes the suggestions dropdown.
   */


  Autocomplete.prototype.open = function () {
    this._dropdown.addEventListener("click", this._clickHandler);

    window.addEventListener("click", this._windowClickHandler);
    this.addClass(CLASS_OPEN);
  };
  /**
   * Opens the suggestions dropdown.
   */


  Autocomplete.prototype.close = function () {
    this._dropdown.removeEventListener("click", this._clickHandler);

    window.removeEventListener("click", this._windowClickHandler);
    this.removeClass(CLASS_OPEN);
  };

  Object.defineProperty(Autocomplete.prototype, "value", {
    /**
     * Gets the value of the input field.
     * @returns {String} The value of the input field.
     */
    get: function get() {
      return this._input.value;
    },
    enumerable: false,
    configurable: true
  });

  Autocomplete.prototype._handleClick = function (event) {
    if (!this._isDropdownTarget(event.target)) {
      return;
    }

    var current = event.target;

    while (current.nodeName !== "LI" && current.parentNode) {
      current = current.parentNode;
    }

    if (current.nodeName === "LI") {
      (0, _Utils.preventDefault)(event);

      this._selectItem(current);
    }
  };

  Autocomplete.prototype._handleBlur = function () {
    var _this = this;

    setTimeout(function () {
      _this.close();
    }, TIMEOUT_BLUR);
  };

  Autocomplete.prototype._handleKeyUp = function (evt) {
    var keycode = evt.which || evt.keyCode;

    if (Inputs.containsKey(keycode, [Inputs.KEY_ARROW_UP, Inputs.KEY_ARROW_DOWN, Inputs.KEY_ENTER, Inputs.KEY_TAB])) {
      // Do not handle these events on keyup
      (0, _Utils.preventDefault)(evt);
      return;
    }

    var target = evt.currentTarget;

    if (evt.currentTarget && target.value && target.value.length >= this._minChars) {
      this._getSuggestion(target.value);
    } else {
      this.close();
    }
  };

  Autocomplete.prototype._handleKeyDown = function (evt) {
    var keycode = evt.which || evt.keyCode;
    var isOpen = (0, _DomFunctions.hasClass)(this.element, CLASS_OPEN);

    if (keycode === Inputs.KEY_ESCAPE && isOpen === true) {
      // handle Escape key (ESC)
      this.close();
      (0, _Utils.preventDefault)(evt);
      return;
    }

    if (isOpen === true && Inputs.containsKey(keycode, [Inputs.KEY_ENTER, Inputs.KEY_TAB])) {
      var focusedElement = this._suggestionList.querySelector("." + CLASS_HOVER);

      (0, _Utils.preventDefault)(evt);

      this._selectItem(focusedElement);

      return;
    }

    if (isOpen === true && Inputs.containsKey(keycode, [Inputs.KEY_ARROW_UP, Inputs.KEY_ARROW_DOWN])) {
      // Up and down arrows
      var focusedElement = this._suggestionList.querySelector("." + CLASS_HOVER);

      if (focusedElement) {
        (0, _DomFunctions.removeClass)(focusedElement, CLASS_HOVER);
        var children = Array.prototype.slice.call(this._suggestionList.childNodes);
        var totalNodes = children.length - 1;
        var direction = keycode === Inputs.KEY_ARROW_UP ? -1 : 1;
        var index = children.indexOf(focusedElement);
        index = Math.max(Math.min(index + direction, totalNodes), 0);
        focusedElement = this._suggestionList.childNodes[index];
      } else {
        focusedElement = this._suggestionList.querySelector("li");
      }

      (0, _DomFunctions.addClass)(focusedElement, CLASS_HOVER);
      (0, _Utils.preventDefault)(evt);
      return;
    }
  };

  Autocomplete.prototype._handleWindowClick = function (event) {
    if (this._isDropdownTarget(event.target)) {
      return;
    }

    this.close();
  };

  Autocomplete.prototype._selectItem = function (item) {
    if (!item) {
      return;
    }

    var text = item.getAttribute(ATTRIBUTE_VALUE);

    if (text) {
      this._input.value = text; // Dispatch the changed event

      this.dispatchEvent("change");
    }

    this.close();
  };

  Autocomplete.prototype._isDropdownTarget = function (target) {
    var current = target;

    while (current !== this._dropdown && current.parentNode) {
      current = current.parentNode;
    }

    return current === this._dropdown;
  };

  Autocomplete.prototype._clearSuggestions = function () {
    // Clear the dropdown item
    (0, _DomFunctions.empty)(this._dropdown);
    this._suggestionList = document.createElement("ul");

    this._dropdown.appendChild(this._suggestionList);
  };

  Autocomplete.prototype._addSuggestion = function (text, term) {
    var sanitizedTerm = term.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
    var html = text.replace(new RegExp("(" + sanitizedTerm + ")", "gi"), "<strong>$1</strong>");
    var textElement = new _DomElement["default"]("span").setHtml(html);
    var innerElement = new _DomElement["default"]("div").addClass(CLASS_RESULT).appendChild(textElement);
    var liElement = new _DomElement["default"]("li").setAttribute(ATTRIBUTE_VALUE, text).appendChild(innerElement);

    this._suggestionList.appendChild(liElement.element);
  };

  Autocomplete.prototype._getSuggestion = function (term) {
    var _this = this;

    if (!this._source) {
      throw new Error("The source function is undefined, cannot load suggestions");
    }

    this._source(term, function (matches, termused) {
      _this._onMatchesReceived(matches, termused);
    });
  };

  Autocomplete.prototype._onMatchesReceived = function (matches, term) {
    var e_1, _a;

    this._clearSuggestions();

    if (!matches || matches.length === 0) {
      this.close();
    } else {
      // Clear the dropdown item
      (0, _DomFunctions.empty)(this._suggestionList);

      try {
        for (var matches_1 = (0, _tslib.__values)(matches), matches_1_1 = matches_1.next(); !matches_1_1.done; matches_1_1 = matches_1.next()) {
          var match = matches_1_1.value;

          this._addSuggestion(match, term);
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (matches_1_1 && !matches_1_1.done && (_a = matches_1["return"])) _a.call(matches_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }

      this.open();
    }
  };

  return Autocomplete;
}(_DomElement["default"]);
/**
 * Change event
 *
 * @event Autocomplete#change
 * @type {object}
 */


function init() {
  (0, _Utils.searchAndInitialize)(".input-field--autocomplete", function (e) {
    new Autocomplete(e);
  });
}

var _default = Autocomplete;
exports["default"] = _default;

},{"../DomElement":4,"../DomFunctions":5,"../Inputs":6,"../Utils":7,"@babel/runtime/helpers/interopRequireDefault":33,"@babel/runtime/helpers/interopRequireWildcard":34,"tslib":43}],17:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports["default"] = void 0;

var _tslib = require("tslib");

var _Utils = require("../Utils");

var _DomElement = _interopRequireDefault(require("../DomElement"));

var _flatpickr = _interopRequireDefault(require("flatpickr"));

var _it = require("flatpickr/dist/l10n/it.js");

var _fr = require("flatpickr/dist/l10n/fr.js");

var _de = require("flatpickr/dist/l10n/de.js");

_flatpickr["default"].localize(_it.Italian);

_flatpickr["default"].localize(_fr.French);

_flatpickr["default"].localize(_de.German);

var DEFAULTS_FLATPICKR = {
  wrap: true,
  allowInput: true,
  locale: "de",
  dateFormat: "d.m.Y",
  time_24hr: true
};
var CLASS_HAS_VALUE = "is-fixed";
var CLASS_MESSAGE = ".message";
/**
 * Input field component
 */

var InputField =
/** @class */
function (_super) {
  (0, _tslib.__extends)(InputField, _super);

  function InputField(element, datePickerOptions) {
    var _this = _super.call(this, element) || this;

    _this._changedHandler = _this.onValueChanged.bind(_this);
    _this._animationStartHandler = _this._onAnimationStart.bind(_this);
    _this._datePickerOptions = datePickerOptions;

    _this._initialize();

    return _this;
  }
  /**
   * Initializes the input field component.
   * @private
   */


  InputField.prototype._initialize = function () {
    this.element.addEventListener("input", this._changedHandler);

    if (this.element.getAttribute("type") === "password") {
      this.element.addEventListener("animationstart", this._animationStartHandler);
    }

    this._initializeDatePicker();

    this.onValueChanged();
  };

  InputField.prototype._initializeDatePicker = function () {
    var picker = this.element.parentElement;

    if (!picker || !picker.classList.contains("flatpickr")) {
      return;
    }

    if (!this._datePickerOptions) {
      try {
        this._datePickerOptions = JSON.parse(picker.dataset.options || "{}");
      } catch (e) {
        this._datePickerOptions = {}; // tslint:disable-next-line:no-console

        console.warn("_initializeDatePicker JSON.parse failed", picker.dataset.options, e);
      }
    }

    this._flatpickrInstance = (0, _flatpickr["default"])(picker, Object.assign({}, DEFAULTS_FLATPICKR, this._datePickerOptions));
  };

  InputField.prototype._destroyDatePicker = function () {
    if (this._flatpickrInstance) {
      this._flatpickrInstance.destroy();
    }
  };

  InputField.prototype._onAnimationStart = function (e) {
    if (e.animationName === "onAutoFillStart") {
      this.onValueChanged(true);
    }
  };
  /**
   * Notifies the input field component that it's value has been changed.
   */


  InputField.prototype.onValueChanged = function (force) {
    if (force === void 0) {
      force = false;
    }

    if (this.element.value && this.element.value !== "" || force === true) {
      this.addClass(CLASS_HAS_VALUE);
    } else {
      this.removeClass(CLASS_HAS_VALUE);
      this.element.value = "";
    }
  };
  /**
   * Destroys the component and frees all references.
   */


  InputField.prototype.destroy = function () {
    this.element.removeEventListener("input", this._changedHandler);

    if (this.element.getAttribute("type") === "password") {
      this.element.removeEventListener("animationstart", this._animationStartHandler);
    }

    this._changedHandler = undefined;
    this._animationStartHandler = undefined;

    this._destroyDatePicker();
  };
  /**
   * Displays the specified error text underneath the input field.
   * @param {text} text The error text/html to display; or undefined to hide the message.
   */


  InputField.prototype.showError = function (text) {
    var message;

    if (this.element.parentElement) {
      var msg_1 = this.element.parentElement.querySelector(CLASS_MESSAGE);

      if (msg_1) {
        message = new _DomElement["default"](msg_1);
      }
    }

    if (!text || text === "") {
      if (message) {
        (0, _Utils.remove)(message.element);
      }

      this.removeClass("invalid");
      return;
    }

    this.addClass("invalid");

    if (!message) {
      message = new _DomElement["default"]("div").addClass("message");
      this.element.parentElement.appendChild(message.element);
    } else {
      message.empty();
    }

    var icon = new _DomElement["default"]("i").addClass("icon").addClass("icon-026-exclamation-mark-circle").setAttribute("aria-hidden", "true");
    var msg = new _DomElement["default"]("span").setHtml(text);
    message.appendChild(icon);
    message.appendChild(msg);
  };

  return InputField;
}(_DomElement["default"]);

function init() {
  (0, _Utils.searchAndInitialize)(".input-field input", function (e) {
    new InputField(e);
  }, function (e) {
    return e.parentElement;
  });
}

var _default = InputField;
exports["default"] = _default;

},{"../DomElement":4,"../Utils":7,"@babel/runtime/helpers/interopRequireDefault":33,"flatpickr":38,"flatpickr/dist/l10n/de.js":39,"flatpickr/dist/l10n/fr.js":40,"flatpickr/dist/l10n/it.js":41,"tslib":43}],18:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports["default"] = void 0;

var _tslib = require("tslib");

var _animejs = _interopRequireDefault(require("animejs"));

var _Utils = require("../Utils");

var Inputs = _interopRequireWildcard(require("../Inputs"));

var _DomElement = _interopRequireDefault(require("../DomElement"));

var MARGIN_TICK = 32;
var CLASS_HTML5 = "html5";
var RANGE_LIGHT = "range--light";
var CLASS_CONTAINER = "range-container";
var CLASS_SLIDER = "range-slider";
var CLASS_ACTIVE = "range--active";
var CLASS_TRACK = "range-track";
var CLASS_TRACK_PROGRESS = "range-track__progress";
var CLASS_TICK = "range-tick";
var CLASS_TICK_LABEL = "range-tick__label";
var CLASS_TICK_ACTIVE = "range-tick--active";
var CLASS_THUMB = "range-thumb";
var CLASS_THUMB_VALUE = "range-thumb__value";
var CLASS_DISABLED = "range--disabled";
var CLASS_DRAGGING = "range--dragging";
/**
 * The range slider component definition.
 */

var Range =
/** @class */
function (_super) {
  (0, _tslib.__extends)(Range, _super);

  function Range(element) {
    var _this = _super.call(this, element) || this; // Setup event context


    _this._downHandler = _this._handleDown.bind(_this);
    _this._moveHandler = _this._handleMove.bind(_this);
    _this._endHandler = _this._handleEnd.bind(_this);
    _this._keydownHandler = _this._handleKeydown.bind(_this);
    _this._focusHandler = _this._handleFocus.bind(_this);
    _this._blurHandler = _this._handleBlur.bind(_this);
    _this._resizeHandler = _this.layout.bind(_this);

    _this._initialize();

    if (_this.element.disabled) {
      _this.disable();
    } else {
      _this.enable();
    }

    return _this;
  }
  /**
   * Initializes the range slider component.
   *
   * This method inspects the select definition and its options and
   * generates new stylable DOM elements around the original range input-element
   * definitions.
   * @private
   */


  Range.prototype._initialize = function () {
    if (this.hasClass(CLASS_HTML5)) {
      // This element uses HTML5 styling, do not touch it...
      return;
    }

    this._wrapperElement = new _DomElement["default"](this.element.parentElement);
    this._rangeContainer = new _DomElement["default"]("div").addClass(CLASS_CONTAINER);
    this._rangeTrack = new _DomElement["default"]("div").addClass(CLASS_TRACK); // check if range--light slider then add progress

    if (this._wrapperElement.hasClass(RANGE_LIGHT)) {
      this._rangeProgress = new _DomElement["default"]("div").addClass(CLASS_TRACK_PROGRESS);

      this._rangeTrack.appendChild(this._rangeProgress);
    }

    this._rangeThumb = new _DomElement["default"]("div").addClass(CLASS_THUMB);
    this._ticksWrapper = new _DomElement["default"]("div").addClass(CLASS_SLIDER);

    this._rangeContainer.appendChild(this._rangeTrack);

    this._rangeContainer.appendChild(this._ticksWrapper);

    this._rangeContainer.appendChild(this._rangeThumb); // add container to wrapper


    this._wrapperElement.appendChild(this._rangeContainer); // get min & max definitions


    this._minValue = parseFloat(this.element.min) || 0;
    this._maxValue = parseFloat(this.element.max) || 1; // get the label/output format string

    this._formatter = window[this.getAttribute("formatter")]; // get the output label and move it below the container

    if (this.element.id) {
      this._outputLabel = this._wrapperElement.find("output[for='" + this.element.id + "']");

      if (this._outputLabel) {
        this._wrapperElement.appendChild(this._outputLabel);
      }
    }

    if (!this.element.step) {
      // fix issues with float sliders if the step is undefined
      this.element.step = "any";
    }

    var options = this._getOptionsList();

    if (options && options.length) {
      this._addTicks(options);
    }

    if (this._rangeContainer.element.querySelectorAll("." + CLASS_TICK_LABEL).length <= 1) {
      this._thumbValue = new _DomElement["default"]("div").addClass(CLASS_THUMB_VALUE);

      this._rangeThumb.appendChild(this._thumbValue);
    }

    this._trackValueTotal = this._maxValue - this._minValue;
    this.layout();

    this._updateTickState(); // Apply the tab index


    var tabIndex = this.element.getAttribute("tabindex");

    if (tabIndex) {
      this._rangeContainer.setAttribute("tabindex", tabIndex);
    }

    window.addEventListener("resize", this._resizeHandler);
    window.addEventListener("orientationchange", this._resizeHandler);
  };

  Range.prototype._getOptionsList = function () {
    var e_1, _a;

    var options = [];
    var listId = this.getAttribute("list");

    if (listId) {
      var dataList = document.querySelector("#" + listId);

      if (dataList) {
        try {
          for (var _b = (0, _tslib.__values)(dataList.querySelectorAll("option")), _c = _b.next(); !_c.done; _c = _b.next()) {
            var entry = _c.value;
            var value = parseFloat(entry.innerText);
            var label = entry.getAttribute("label") || parseFloat(value.toFixed(2));
            options.push({
              value: value,
              label: label
            });
          }
        } catch (e_1_1) {
          e_1 = {
            error: e_1_1
          };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
      }
    } // Sort the list to enable snapping


    options = options.sort(function (a, b) {
      return a.value - b.value;
    });

    if (options.length > 1) {
      this._minValue = Number.MAX_VALUE;
      this._maxValue = Number.MIN_VALUE;

      for (var i = 0; i < options.length; i++) {
        this._minValue = Math.min(this._minValue, options[i].value);
        this._maxValue = Math.max(this._maxValue, options[i].value);
      }
    }

    return options;
  };

  Range.prototype._addTicks = function (dataItems) {
    var e_2, _a;

    try {
      for (var dataItems_1 = (0, _tslib.__values)(dataItems), dataItems_1_1 = dataItems_1.next(); !dataItems_1_1.done; dataItems_1_1 = dataItems_1.next()) {
        var entry = dataItems_1_1.value;
        var tickElement = new _DomElement["default"]("div").setAttribute("data-value", String(entry.value)).addClass(CLASS_TICK);
        var tickLabel = new _DomElement["default"]("span").addClass(CLASS_TICK_LABEL).setHtml(String(entry.label));
        tickElement.appendChild(tickLabel);

        this._ticksWrapper.appendChild(tickElement);
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (dataItems_1_1 && !dataItems_1_1.done && (_a = dataItems_1["return"])) _a.call(dataItems_1);
      } finally {
        if (e_2) throw e_2.error;
      }
    }
  };

  Range.prototype._isEventOnLabel = function (event) {
    var el = event.target;
    return !!(el === null || el === void 0 ? void 0 : el.classList.contains(CLASS_TICK_LABEL));
  };

  Range.prototype._handleDown = function (event) {
    this._wrapperElement.addClass(CLASS_DRAGGING);

    this._rangeContainer.element.addEventListener("mouseup", this._endHandler);

    document.addEventListener("mousemove", this._moveHandler);
    document.addEventListener("mouseup", this._endHandler);

    this._rangeContainer.element.addEventListener("touchmove", this._moveHandler);

    document.addEventListener("touchend", this._endHandler); // Ignore clicks directly on the thumb

    if (event.target !== this._rangeThumb.element && !this._isEventOnLabel(event)) {
      var pos = this._getRelativePosition(event);

      this._setPosition(pos, true, false, false);
    }
  };

  Range.prototype._handleMove = function (event) {
    (0, _Utils.preventDefault)(event);

    this._unfocus();

    if (!this._isEventOnLabel(event)) {
      var pos = this._getRelativePosition(event);

      this._setPosition(pos, true, false, false);
    }
  };

  Range.prototype._handleEnd = function (event) {
    this._wrapperElement.removeClass(CLASS_DRAGGING);

    this._rangeContainer.element.removeEventListener("mouseup", this._endHandler);

    document.removeEventListener("mouseup", this._endHandler);
    document.removeEventListener("mousemove", this._moveHandler);

    this._rangeContainer.element.removeEventListener("touchmove", this._moveHandler);

    document.removeEventListener("touchend", this._endHandler);

    var pos = this._getRelativePosition(event);

    this._setPosition(pos, true, true, true);

    this._handleBlur();
  };

  Range.prototype._handleKeydown = function (event) {
    var keycode = event.which || event.keyCode;

    if (keycode === Inputs.KEY_ESCAPE) {
      // handle Escape key (ESC)
      this._rangeContainer.element.blur();

      return;
    }

    var isUp = keycode === Inputs.KEY_ARROW_UP || keycode === Inputs.KEY_ARROW_RIGHT || keycode === Inputs.KEY_PAGE_UP;
    var isDown = keycode === Inputs.KEY_ARROW_DOWN || keycode === Inputs.KEY_ARROW_LEFT || keycode === Inputs.KEY_PAGE_DOWN;

    if (isUp || isDown) {
      event.preventDefault();
      var direction = isDown ? -1 : 1; // make a larger step if its the vertical arrow or page keys

      if (keycode === Inputs.KEY_ARROW_UP || keycode === Inputs.KEY_ARROW_DOWN || keycode === Inputs.KEY_PAGE_UP || keycode === Inputs.KEY_PAGE_DOWN) {
        direction *= 10;
      }

      var val = this.value;

      if (this._ticksWrapper.element.childNodes.length > 1) {
        val = this._getNextValue(val, direction);
      } else {
        var step = this.element.step;

        if (!step || step === "any") {
          step = "0.1";
        }

        var newVal = val + parseFloat(step) * direction;
        val = newVal;
      }

      this._setValue(val, true, true);

      return;
    }
  };

  Range.prototype._handleFocus = function () {
    this._rangeContainer.addClass(CLASS_ACTIVE);
  };

  Range.prototype._handleBlur = function () {
    this._rangeContainer.removeClass(CLASS_ACTIVE);
  };

  Range.prototype._unfocus = function () {
    if (document.selection) {
      document.selection.empty();
    } else {
      window.getSelection().removeAllRanges();
    }
  };

  Range.prototype._getRelativePosition = function (event) {
    var pageX;

    if ("pageX" in event) {
      pageX = event.pageX;
    } else {
      pageX = (event.touches[0] || event.changedTouches[0]).pageX;
    }

    return pageX - this._trackLeftPosition + this._grabPosition;
  };
  /**
   * Validates and updates the position and sets the corresponding value on the slider.
   * @param {position} the new position to set.
   * @param {updateValue} true if the value should be updated as well; otherwise false.
   * @param {snap} true if snapping should be used; otherwise false.
   * @param {animate} true if the UI update should be animated; otherwise false.
   * @private
   */


  Range.prototype._setPosition = function (position, updateValue, snap, animate) {
    if (updateValue === void 0) {
      updateValue = true;
    }

    if (snap === void 0) {
      snap = false;
    }

    if (animate === void 0) {
      animate = true;
    }

    if (position === undefined || position === null || Number.isNaN(position)) {
      throw new Error("Position is not a number");
    } // Clamp to min and max range


    var newPos = (0, _Utils.clamp)(position, this._trackPositionMin, this._trackPositionMax);

    if (updateValue) {
      var value = this._trackValueTotal / this._trackWidth * newPos + this._minValue;

      if (this._ticksWrapper.element.childNodes.length > 1 && snap) {
        var snapPos = this._getSnapPosition(newPos);

        newPos = snapPos.position;
        value = snapPos.value;
      } else if (this.element.step && this.element.step !== "any") {
        var step = parseFloat(this.element.step);
        value = Math.round(value / step) * step;
      }

      this._setValue(value, false, false);
    }

    if (animate && updateValue) {
      this._updateTickState();
    }

    if (animate) {
      (0, _animejs["default"])({
        targets: this._rangeThumb.element,
        duration: 200,
        left: newPos,
        easing: "easeInOutQuint"
      });

      if (this._rangeProgress) {
        (0, _animejs["default"])({
          targets: this._rangeProgress.element,
          duration: 200,
          width: newPos,
          easing: "easeInOutQuint"
        });
      }
    } else {
      this._rangeThumb.element.style.left = newPos + "px";

      if (this._rangeProgress) {
        this._rangeProgress.element.style.width = newPos + "px";
      }
    }
  };
  /**
   * Gets the snap value corresponding to the given value.
   * @param {value} the target value.
   * @returns an object containing the snap position and the corresponding value.
   * @private
   */


  Range.prototype._getSnapValue = function (value) {
    var ticks = this._ticksWrapper.element.children;
    var currentPosition = 0;

    for (var i = 0; i < ticks.length; i++) {
      var currentElement = new _DomElement["default"](ticks[i]);
      var currentValue = parseFloat(currentElement.getAttribute("data-value"));
      var currentWidth = currentElement.element.clientWidth;
      var nextElement = void 0;
      var nextValue = Number.MAX_VALUE;

      if (i < ticks.length - 1) {
        nextElement = new _DomElement["default"](ticks[i + 1]);
        nextValue = parseFloat(nextElement.getAttribute("data-value"));
      } // left most element


      if (i === 0 && value <= currentValue) {
        return {
          value: currentValue,
          position: MARGIN_TICK - this._grabPosition
        };
      } // right most element


      if (!nextElement && value >= currentValue) {
        return {
          value: currentValue,
          position: currentPosition + (currentWidth - MARGIN_TICK) - this._grabPosition - 1
        };
      }

      if (value >= currentValue && value < nextValue) {
        return {
          value: currentValue,
          position: currentPosition + 0.5 * currentWidth - this._grabPosition
        };
      }

      currentPosition += currentWidth;
    }

    throw new Error("Could not determine snap value");
  };
  /**
   * Gets the snap position corresponding to the given position.
   * @param {position} the target position.
   * @returns an object containing the snap position and the corresponding value.
   * @private
   */


  Range.prototype._getSnapPosition = function (position) {
    if (position === undefined || position === null || Number.isNaN(position)) {
      throw new Error("position is not a number");
    }

    var ticks = this._ticksWrapper.element.children;
    var currentPosition = 0;

    for (var i = 0; i < ticks.length; i++) {
      var currentElement = new _DomElement["default"](ticks[i]);
      var currentValue = parseFloat(currentElement.getAttribute("data-value"));
      var currentWidth = currentElement.element.clientWidth;
      var nextElement = void 0;

      if (i < ticks.length - 1) {
        nextElement = new _DomElement["default"](ticks[i + 1]);
      } // left most element


      if (i === 0 && position <= currentPosition + currentWidth) {
        return {
          value: currentValue,
          position: MARGIN_TICK - this._grabPosition
        };
      } // right most element


      if (!nextElement && position >= currentPosition) {
        return {
          value: currentValue,
          position: currentPosition + (currentWidth - MARGIN_TICK) - this._grabPosition - 1
        };
      }

      if (position >= currentPosition && position < currentPosition + currentWidth) {
        return {
          value: currentValue,
          position: currentPosition + 0.5 * currentWidth - this._grabPosition
        };
      }

      currentPosition += currentWidth;
    } // No ticks found (e.g. for "Free Slider")


    return {
      value: 0,
      position: 0
    };
  };
  /**
   * Gets the next value in the given direction with regards to snapping.
   * @param {value} The current value.
   * @param {direction} The direction (positive or negative integer).
   * @returns The next value.
   * @private
   */


  Range.prototype._getNextValue = function (value, direction) {
    var ticks = this._ticksWrapper.element.children;

    for (var i = 0; i < ticks.length; i++) {
      var currentElement = new _DomElement["default"](ticks[i]);
      var currentVal = parseFloat(currentElement.getAttribute("data-value"));

      if (value === currentVal) {
        var index = (0, _Utils.clamp)(i + direction, 0, ticks.length - 1);
        value = parseFloat(ticks[index].getAttribute("data-value"));
      }
    }

    return value;
  };

  Range.prototype._updateTickState = function () {
    if (this._ticksWrapper.element.childNodes.length > 1) {
      var activeTick = this._ticksWrapper.find("." + CLASS_TICK_ACTIVE);

      if (activeTick) {
        activeTick.removeClass(CLASS_TICK_ACTIVE);
      }

      var newActiveTick = this._ticksWrapper.find("." + CLASS_TICK + "[data-value='" + this.value + "']");

      if (newActiveTick) {
        newActiveTick.addClass(CLASS_TICK_ACTIVE);
      }
    }
  };

  Range.prototype._adjustTickLabelPosition = function (tickItem, left) {
    var label = new _DomElement["default"](tickItem.querySelector("." + CLASS_TICK_LABEL));
    var dummyElement = new _DomElement["default"]("span").addClass(CLASS_TICK_LABEL).setAttribute("style", "visibility: hidden; display: inline-block;").setHtml(label.innerText);

    this._rangeContainer.appendChild(dummyElement);

    var width = dummyElement.element.clientWidth / 2;

    this._rangeContainer.removeChild(dummyElement);

    var floatPosition = left ? "left" : "right";

    if (width < MARGIN_TICK) {
      // center small items on the tick
      label.setAttribute("style", floatPosition + ": " + (MARGIN_TICK - Math.floor(width)) + "px; text-align: " + floatPosition + ";");
    }
  };

  Range.prototype._formatOutput = function (value, _short) {
    if (this._formatter) {
      return this._formatter(value, _short);
    }

    var str = parseFloat(value.toFixed(2));
    return str.toString();
  };
  /**
   * Validates and updates the range value.
   * @param {value} the new value to set.
   * @param {update} true if the UI should be updated; otherwise false.
   * @param {animate} true if the UI update should be animated; otherwise false.
   * @private
   */


  Range.prototype._setValue = function (value, update, animate) {
    if (update === void 0) {
      update = true;
    }

    if (animate === void 0) {
      animate = false;
    }

    var val = (0, _Utils.clamp)(value, this._minValue, this._maxValue);
    var position;

    if (this._ticksWrapper.element.childNodes.length > 1) {
      // at least 2 ticks present
      var snapValue = this._getSnapValue(val);

      position = snapValue.position;
      val = snapValue.value;
    } else if (this._ticksWrapper.element.childNodes.length === 1) {
      // only 1 tick present
      // This shouldn't happen (but it does, e.g. when generating Sliders based on incomplete data).
      // Fall back to the first tick position and disable the component.
      position = this._getSnapPosition(val).position;
      this.disable();
    } else {
      // no ticks present, e.g. "Free Slider"
      position = this._trackWidth / this._trackValueTotal * (value - this._minValue);
    }

    this.element.value = String(val);

    if (this._thumbValue) {
      this._thumbValue.setHtml(this._formatOutput(val, true));
    }

    if (this._outputLabel) {
      this._outputLabel.setHtml(this._formatOutput(val, false));
    }

    if (update) {
      this._setPosition(position, false, false, animate);

      this._updateTickState();
    }

    this.dispatchEvent("input");
  };

  Object.defineProperty(Range.prototype, "value", {
    /**
     * Gets the current value.
     */
    get: function get() {
      return parseFloat(this.element.value);
    },

    /**
     * Sets the value of the range slider.
     */
    set: function set(value) {
      this._setValue(value, true, true);
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Force the component to re-layout itself.
   */

  Range.prototype.layout = function () {
    this._grabPosition = Math.round(this._rangeThumb.element.offsetWidth / 2);

    var tickItems = this._rangeContainer.element.querySelectorAll("." + CLASS_TICK);

    var ticksOffset = tickItems && tickItems.length > 0 ? 2 * MARGIN_TICK : MARGIN_TICK;
    this._trackWidth = this._rangeTrack.element.offsetWidth - ticksOffset;
    this._trackPositionMin = 0;
    this._trackPositionMax = this._rangeTrack.element.clientWidth - this._rangeThumb.element.offsetWidth + 1;
    this._trackLeftPosition = this._rangeTrack.element.getBoundingClientRect().left + MARGIN_TICK;
    var itemCount = tickItems.length - 1;
    this._itemWidth = this._trackWidth / itemCount;
    var outerItemsWidth = this._itemWidth * 0.5 + MARGIN_TICK;

    for (var i = 0; i <= itemCount; i++) {
      var width = this._itemWidth;

      if (i === 0 || i === itemCount) {
        width = outerItemsWidth;
      }

      var item = new _DomElement["default"](tickItems[i]);
      item.setAttribute("style", "width: " + Math.floor(width) + "px;");
    } // adjust first and last label positions


    if (tickItems.length > 1) {
      this._adjustTickLabelPosition(tickItems[0], true);

      this._adjustTickLabelPosition(tickItems[tickItems.length - 1], false);
    } // update the value


    this._setValue(parseFloat(this.element.value), true, false);
  };
  /**
   * Destroys the components and frees all references.
   */


  Range.prototype.destroy = function () {
    window.removeEventListener("resize", this._resizeHandler);
    window.removeEventListener("orientationchange", this._resizeHandler);
    this._downHandler = null;
    this._moveHandler = null;
    this._endHandler = null;
    this._focusHandler = null;
    this._blurHandler = null;
    this.element = null;
    this._rangeContainer = null;
    this._wrapperElement = null;
  };
  /**
   * @deprecated use destroy() instead.
   * @todo remove in version 2.0.0
   */


  Range.prototype.destoy = function () {
    this.destroy();
  };
  /**
   * Sets the component to the enabled state.
   */


  Range.prototype.enable = function () {
    this.element.removeAttribute("disabled");

    this._wrapperElement.removeClass(CLASS_DISABLED);

    this._rangeContainer.element.addEventListener("mousedown", this._downHandler);

    this._rangeContainer.element.addEventListener("touchstart", this._downHandler);

    this._rangeContainer.element.addEventListener("keydown", this._keydownHandler);

    this._rangeContainer.element.addEventListener("focus", this._focusHandler);

    this._rangeContainer.element.addEventListener("blur", this._blurHandler);
  };
  /**
   * Sets the component to the disabled state.
   */


  Range.prototype.disable = function () {
    this.element.setAttribute("disabled", "");

    this._wrapperElement.addClass(CLASS_DISABLED);

    this._rangeContainer.element.removeEventListener("mousedown", this._downHandler);

    this._rangeContainer.element.removeEventListener("mouseup", this._endHandler);

    this._rangeContainer.element.removeEventListener("mousemove", this._moveHandler);

    this._rangeContainer.element.removeEventListener("touchstart", this._downHandler);

    this._rangeContainer.element.removeEventListener("focus", this._focusHandler);

    this._rangeContainer.element.removeEventListener("blur", this._blurHandler);
  };

  return Range;
}(_DomElement["default"]);

function init() {
  (0, _Utils.searchAndInitialize)("input[type='range']", function (e) {
    new Range(e);
  });
}

var _default = Range;
exports["default"] = _default;

},{"../DomElement":4,"../Inputs":6,"../Utils":7,"@babel/runtime/helpers/interopRequireDefault":33,"@babel/runtime/helpers/interopRequireWildcard":34,"animejs":36,"tslib":43}],19:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports["default"] = void 0;

var _tslib = require("tslib");

var _Utils = require("../Utils");

var _DomElement = _interopRequireDefault(require("../DomElement"));

var Inputs = _interopRequireWildcard(require("../Inputs"));

var Dom = _interopRequireWildcard(require("../DomFunctions"));

var CLASS_PLACEHOLDER = "select__placeholder";
var CLASS_THUMB = "select__thumb";
var CLASS_BUTTON = "select__button";
var CLASS_DROPDOWN = "select__dropdown";
var CLASS_OPEN = "select--open";
var CLASS_CLOSED = "select--closed";
var CLASS_DISABLED = "select--disabled";
var CLASS_FILTERABLE = "select--filterable";
var CLASS_ITEM = "dropdown-item";
var CLASS_ITEM_SELECTED = "dropdown-item--selected";
var CLASS_ITEM_FOCUSED = "dropdown-item--focused";
var CLASS_ITEM_DISABLED = "dropdown-item--disabled";
var CLASS_GROUP_ITEM = "dropdown-group";
var CLASS_GROUP_HEADER = "dropdown-group__item";
var QUERY_MESSAGE = ".message";
var TIMEOUT_CLOSE = 150;
var TIMEOUT_BLUR = 400;
/**
 * The select component API.
 */

var Select =
/** @class */
function (_super) {
  (0, _tslib.__extends)(Select, _super);

  function Select(element) {
    var _this = _super.call(this, element) || this; // Minimum filter length


    _this._minFilterLength = 2; // The options the Select was initially created upon
    // These will be used as a basis for filtering

    _this._initialOptions = Array.prototype.slice.call(_this.element.children);
    _this._openByFocus = false; // Check for multi-selection

    _this._multiselection = _this.element.hasAttribute("multiple") === true; // Setup event context

    _this._clickHandler = _this._handleClick.bind(_this);
    _this._handleDropdownClick = _this._handleClick.bind(_this);
    _this._keydownHandler = _this._handleKeydown.bind(_this);
    _this._focusHandler = _this._handleFocus.bind(_this);
    _this._blurHandler = _this._handleBlur.bind(_this);
    _this._windowClickHandler = _this._handleWindowClick.bind(_this);
    _this._filterKeydownHandler = _this._handleFilterKeydown.bind(_this);
    _this._filterKeyupHandler = _this._handleFilterKeyup.bind(_this);
    _this._filterFocusHandler = _this._handleFilterFocus.bind(_this);

    _this._initialize();

    return _this;
  }
  /**
   * Initializes the select component.
   *
   * This method inspects the select definition and its options and
   * generates new stylable DOM elements around the original select-element
   * definitions.
   * @private
   */


  Select.prototype._initialize = function () {
    var e_1, _a;

    var selectedOption = this.element.querySelector("option[selected]");
    var firstOption = this.element.querySelector("option"); // Per default, set the last selected option to either the option with a "selected" attribute,
    // or, if not found, to the first available option

    this._lastSelectedOption = selectedOption || firstOption;
    this._wrapperElement = new _DomElement["default"](this.element.parentElement).addClass(CLASS_CLOSED);

    try {
      for (var _b = (0, _tslib.__values)(this.classes), _c = _b.next(); !_c.done; _c = _b.next()) {
        var cls = _c.value;

        this._wrapperElement.addClass(cls);
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }

    this._dropdownElement = new _DomElement["default"]("div").addClass(CLASS_DROPDOWN);

    if ((0, _Utils.internetExplorerOrEdgeVersion)() > 0 && (0, _Utils.internetExplorerOrEdgeVersion)() < 12) {
      // This is a workaround for IE browsers 11 and earlier where focusing
      // a scrollable dropdown list will close the dropdown prematurely.
      this._dropdownElement.element.addEventListener("mousedown", function (event) {
        return event.preventDefault();
      });
    }

    this._setupTarget();

    this._setupPlaceholder();

    this._wrapperElement.appendChild(this._dropdownElement);

    this._createOptions(this.element);

    this._updateSize();

    this._updateMessage();

    if (this.element.disabled) {
      this.disable();
    } else {
      this.enable();
    }
  };

  Select.prototype._setupTarget = function () {
    // move the id from the select element to the wrapper
    var id = this.element.getAttribute("id");

    if (id) {
      this.element.removeAttribute("id");

      this._wrapperElement.setAttribute("id", id);
    } // Apply the tab index


    var tabIndex = this.element.getAttribute("tabindex");

    if (tabIndex) {
      this._wrapperElement.setAttribute("tabIndex", tabIndex);
    }
  };

  Select.prototype._setupPlaceholder = function () {
    var _this = this;

    if (!this._selectButtonElement) {
      this._selectButtonElement = new _DomElement["default"]("div").addClass(CLASS_BUTTON);

      this._wrapperElement.appendChild(this._selectButtonElement);
    }

    if (!this._thumbElement) {
      this._thumbElement = new _DomElement["default"]("div").addClass(CLASS_THUMB);
      var thumbIcon = new _DomElement["default"]("div").addClass("thumb-icon");
      var loader = new _DomElement["default"]("div").addClass("loader-spinner").addClass("loader-spinner--small");

      this._thumbElement.appendChild(loader);

      this._thumbElement.appendChild(thumbIcon);

      this._selectButtonElement.appendChild(this._thumbElement);
    }

    var placeholderText = "";
    this._placeholderOption = this.element.querySelector("option[selected][disabled]") || undefined;

    if (this._placeholderOption) {
      placeholderText = Dom.text(this._placeholderOption);

      if (this._multiselection === true) {
        this._placeholderOption.selected = false;
      }
    }

    var selectedOption = this.element.querySelector("option[selected]:not([disabled])");

    if (selectedOption) {
      placeholderText = Dom.text(selectedOption);
    }

    if (!this._placeholderElement) {
      // When the Select is filterable, create an "input" as the placeholder element, otherwise a "span"
      if (this._isFilterable()) {
        this._placeholderElement = new _DomElement["default"]("input");

        this._placeholderElement.addEventListener("keyup", function (e) {
          return _this._handleFilterKeyup(e);
        });

        this._placeholderElement.addEventListener("keydown", function (e) {
          return _this._handleFilterKeydown(e);
        });

        this._placeholderElement.addEventListener("focus", function (e) {
          return _this._handleFilterFocus(e);
        });
      } else {
        this._placeholderElement = new _DomElement["default"]("span");
      }

      this._placeholderElement.addClass(CLASS_PLACEHOLDER);

      this._selectButtonElement.appendChild(this._placeholderElement);
    }

    this._setPlaceholder(placeholderText);

    this._placeholderText = placeholderText;

    if (selectedOption && selectedOption !== this._placeholderOption) {
      this._updatePlaceholder(true);
    }
  };

  Select.prototype._updateMessage = function () {
    var messageNode = this._wrapperElement.element.querySelector(QUERY_MESSAGE);

    if (messageNode !== null) {
      this._wrapperElement.appendChild(new _DomElement["default"](messageNode));
    }
  };

  Select.prototype._isOptGroup = function (element) {
    return element.tagName.toUpperCase() === "OPTGROUP";
  };

  Select.prototype._isOption = function (element) {
    return element.tagName.toUpperCase() === "OPTION";
  };

  Select.prototype._createOptions = function (element) {
    for (var i = 0; i < element.children.length; i++) {
      var child = element.children[i];

      if (this._isOptGroup(child)) {
        this._appendGroup(child);
      }

      if (this._isOption(child)) {
        var option = this._createOption(child);

        if (option) {
          this._dropdownElement.appendChild(option);
        }
      }
    }
  };

  Select.prototype._createOption = function (option) {
    var html = option.innerHTML;

    if (this._activeFilter) {
      var sanitizedActiveFilter = this._activeFilter.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");

      html = html.replace(new RegExp("(" + sanitizedActiveFilter + ")", "gi"), "<strong>$1</strong>");
    }

    var opt = new _DomElement["default"]("div").addClass(CLASS_ITEM).setHtml(html);

    if (option.selected) {
      opt.addClass(CLASS_ITEM_SELECTED);
    }

    if (option.disabled) {
      opt.addClass(CLASS_ITEM_DISABLED);
    }

    if (!this._isPlaceholder(option)) {
      opt.setAttribute("data-value", option.value);
      return opt;
    }

    return undefined;
  };

  Select.prototype._appendGroup = function (optgroup) {
    var e_2, _a;

    var label = optgroup.getAttribute("label");
    var group = new _DomElement["default"]("div").addClass(CLASS_GROUP_ITEM);
    var groupHeader = new _DomElement["default"]("div").addClass(CLASS_GROUP_HEADER).setHtml(label);
    group.appendChild(groupHeader);
    var options = optgroup.querySelectorAll("option");

    try {
      for (var options_1 = (0, _tslib.__values)(options), options_1_1 = options_1.next(); !options_1_1.done; options_1_1 = options_1.next()) {
        var entry = options_1_1.value;

        var option = this._createOption(entry);

        if (option) {
          group.appendChild(option);
        }
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (options_1_1 && !options_1_1.done && (_a = options_1["return"])) _a.call(options_1);
      } finally {
        if (e_2) throw e_2.error;
      }
    }

    this._dropdownElement.appendChild(group);

    return group;
  };

  Select.prototype._updateSize = function () {
    var e_3, _a; // Note: Mirroring the DOM and measuring the items using their clientWidth was very
    // unreliable, therefore measuring was switched to the new HTML5 measureText method
    // margins and paddings arround the text are copied from the original placeholder items
    // dimension


    var placeholderStyle = window.getComputedStyle(this._placeholderElement.element);
    var paddingRight = parseFloat(placeholderStyle.paddingRight);
    var paddingLeft = parseFloat(placeholderStyle.paddingLeft);

    var font = this._placeholderElement.css("font");

    var textWidth = Dom.textWidth(this._placeholderText, font);
    var maxWidth = paddingLeft + paddingRight + textWidth;

    var options = this._wrapperElement.element.querySelectorAll("." + CLASS_ITEM);

    try {
      for (var options_2 = (0, _tslib.__values)(options), options_2_1 = options_2.next(); !options_2_1.done; options_2_1 = options_2.next()) {
        var entry = options_2_1.value;
        var width = Dom.textWidth(Dom.text(entry), font) + paddingLeft + paddingRight;

        if (width > maxWidth) {
          maxWidth = width;
        }
      }
    } catch (e_3_1) {
      e_3 = {
        error: e_3_1
      };
    } finally {
      try {
        if (options_2_1 && !options_2_1.done && (_a = options_2["return"])) _a.call(options_2);
      } finally {
        if (e_3) throw e_3.error;
      }
    }
  };

  Select.prototype._isButtonTarget = function (target) {
    return target === this._wrapperElement.element || target === this._placeholderElement.element || target === this._selectButtonElement.element || target === this._thumbElement.element;
  };

  Select.prototype._isDropdownTarget = function (target) {
    var current = target;

    while (current !== this._dropdownElement.element && current.parentElement) {
      current = current.parentElement;
    }

    return current === this._dropdownElement.element;
  };
  /**
   * Updates the UI if the selection has changed and makes sure the
   * select control and the generated markup are synchronized.
   * @private
   */


  Select.prototype._selectedItemChanged = function (newItem, autoClose, multiselect) {
    var _this = this;

    if (autoClose === void 0) {
      autoClose = true;
    }

    if (multiselect === void 0) {
      multiselect = false;
    }

    var oldItems = this._dropdownElement.element.querySelectorAll("." + CLASS_ITEM_SELECTED);

    if (!newItem) {
      setTimeout(function () {
        return _this.close();
      }, TIMEOUT_CLOSE);
      return;
    }

    if (Dom.hasClass(newItem, CLASS_ITEM_DISABLED)) {
      return;
    }

    if (oldItems.length === 0 && !newItem) {
      throw new Error("Can not select undefined elements");
    }

    var oldItem = oldItems[0];

    if (multiselect === true) {
      oldItem = (0, _Utils.find)(oldItems, function (x) {
        return x.getAttribute("data-value") === newItem.getAttribute("data-value");
      });
    }

    var isDeselect = false;

    if (newItem && oldItem && oldItem === newItem) {
      // Click on a previously selected element -> deselect
      isDeselect = true;

      if (!this._placeholderOption && !multiselect) {
        // If there is no placeholder option, non multiselect options cannot be deselected
        return;
      }

      delete this._lastSelectedOption;
    }

    if (oldItem) {
      // Remove selection on the element
      var oldValue_1 = oldItem.getAttribute("data-value");
      var optElement = (0, _Utils.find)(this.element.options, function (x) {
        return !x.disabled && x.value === oldValue_1;
      });

      if (!optElement) {
        throw new Error("The option with value " + oldValue_1 + " does not exist");
      } // Unset Select value


      optElement.selected = false;
      Dom.removeClass(oldItem, CLASS_ITEM_SELECTED);
    }

    if (!isDeselect) {
      // Select an option
      // Select a new item
      var newValue_1 = newItem.getAttribute("data-value");
      var optElement = (0, _Utils.find)(this.element.options, function (x) {
        return !x.disabled && x.value === newValue_1;
      });

      if (!optElement) {
        throw new Error("The option with value " + newValue_1 + " does not exist");
      } // Set Select value


      optElement.selected = true;
      Dom.addClass(newItem, CLASS_ITEM_SELECTED); // Preserve selection

      this._lastSelectedOption = optElement;
    } else {
      // Deselect an option
      // Keep track of falling back to the placeholder (if any)
      if (this._placeholderOption) {
        this._lastSelectedOption = this._placeholderOption;
      }
    }

    var hasSelectedItems = true;

    if (this._multiselection === false && isDeselect) {
      // Handle no selection for non-multiselect states
      this._placeholderOption.selected = true;
      hasSelectedItems = false;
    }

    if (this._multiselection === true && this._getSelectedOptions().length === 0) {
      hasSelectedItems = false;
    } // Reset the filter if filterable


    if (this._activeFilter) {
      this._clearFilter();
    }

    this._updatePlaceholder(hasSelectedItems); // Dispatch the changed event


    this.dispatchEvent("change");

    if (autoClose && !multiselect) {
      setTimeout(function () {
        _this.close();
      }, TIMEOUT_CLOSE);
    }
  };

  Select.prototype._updatePlaceholder = function (hasSelectedItems) {
    var e_4, _a;

    var text = this._placeholderOption ? Dom.text(this._placeholderOption) : " ";

    if (hasSelectedItems === true) {
      var selectedItems = this._getSelectedOptions();

      if (selectedItems.length > 0) {
        text = "";

        try {
          for (var selectedItems_1 = (0, _tslib.__values)(selectedItems), selectedItems_1_1 = selectedItems_1.next(); !selectedItems_1_1.done; selectedItems_1_1 = selectedItems_1.next()) {
            var item = selectedItems_1_1.value;
            text += Dom.text(item) + ", ";
          }
        } catch (e_4_1) {
          e_4 = {
            error: e_4_1
          };
        } finally {
          try {
            if (selectedItems_1_1 && !selectedItems_1_1.done && (_a = selectedItems_1["return"])) _a.call(selectedItems_1);
          } finally {
            if (e_4) throw e_4.error;
          }
        }

        text = text.substring(0, text.length - 2);
      }
    }

    this._setPlaceholder(text);
  };

  Select.prototype._getSelectedOptions = function () {
    var selectedOptions = [];

    if (this.element.options) {
      [].forEach.call(this.element.options, function (option) {
        if (option.selected && !option.disabled) {
          selectedOptions.push(option);
        }
      });
    }

    return selectedOptions;
  };
  /**
   * Clone all of the initially set options (and optgroups) and returns them in a new array.
   * This serves as the basis for filtering. If a filter is present, it will be respected.
   */


  Select.prototype.getInitialOptions = function () {
    var filter = this._activeFilter || "";
    var filtered = [];
    var initialOptions = this._initialOptions;

    for (var i = 0; i < initialOptions.length; i++) {
      var child = initialOptions[i];

      if (this._isOptGroup(child)) {
        // handle <optgroup>
        var optGroupClone = child.cloneNode(false);
        var found = false;

        for (var j = 0; j < child.children.length; j++) {
          var optionClone = child.children[j].cloneNode(true); // Append on match

          if (this._containsWord(optionClone.innerHTML, filter)) {
            optGroupClone.appendChild(optionClone);
            found = true;
          }
        } // Push if any matches found


        if (found) {
          filtered.push(optGroupClone);
        }
      } else if (this._isOption(child)) {
        // handle <option>
        var optionClone = child.cloneNode(true); // Push on match

        if (this._containsWord(optionClone.innerHTML, filter)) {
          filtered.push(optionClone);
        }
      }
    }

    return filtered;
  };
  /**
   * Returns true if a text contains a given keyword, e.g. in "ca" in "Car"
   */


  Select.prototype._containsWord = function (text, keyword) {
    return text.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
  };

  Select.prototype._handleFocus = function () {
    var _this = this;

    this.open();
    this._openByFocus = true;
    setTimeout(function () {
      _this._openByFocus = false;
    }, TIMEOUT_BLUR);
  };

  Select.prototype._handleBlur = function () {
    this.close();
  };

  Select.prototype._handleClick = function (event) {
    var handled = false;

    if (this._lastHandledEvent === event) {
      this._lastHandledEvent = undefined;
      return;
    }

    if (this._isButtonTarget(event.target) && this._openByFocus === false) {
      // handle header item clicks and toggle dropdown
      this.toggle();
      handled = true;
    }

    var newItem = event.target;

    if (!handled && Dom.hasClass(newItem, CLASS_ITEM)) {
      // handle clicks on dropdown items
      this._selectedItemChanged(newItem, true, this._multiselection);

      handled = true;
    }

    if (handled) {
      this._lastHandledEvent = event;
      (0, _Utils.preventDefault)(event);
    }
  };

  Select.prototype._handleWindowClick = function (event) {
    if (this._isDropdownTarget(event.target) || this._isButtonTarget(event.target)) {
      return;
    }

    this.close();
  };

  Select.prototype._focusOptionStartingWith = function (keycode, startIndex, options) {
    for (var index = startIndex; index < options.length; index++) {
      var item = new _DomElement["default"](options[index]);
      var value = item.innerText.toLowerCase();

      if (index > options.length) {
        index = 0;
      }

      if (value.startsWith(Inputs.getKeyValue(keycode))) {
        var newOption = new _DomElement["default"](options[index]);

        if (!newOption.hasClass(CLASS_ITEM_DISABLED)) {
          (0, _Utils.scrollIntoView)(options[index]);
          newOption.addClass(CLASS_ITEM_FOCUSED);
          return newOption;
        }
      }
    }

    return undefined;
  };

  Select.prototype._handleKeydown = function (event) {
    var keyboardEvent = event;
    var evt = keyboardEvent || window.event;
    var keycode = keyboardEvent.which || keyboardEvent.keyCode;

    if (keycode === Inputs.KEY_ESCAPE) {
      // handle Escape key (ESC)
      if (this.isOpen()) {
        this.close();
      }

      evt.preventDefault();
      return;
    }

    if (keycode === Inputs.KEY_ARROW_UP || keycode === Inputs.KEY_ARROW_DOWN) {
      // Up and down arrows
      var options = this._wrapperElement.element.querySelectorAll("." + CLASS_ITEM);

      if (options.length > 0) {
        var newIndex = 0;
        var oldOption = void 0;

        var focusedElement = this._wrapperElement.find("." + CLASS_ITEM_FOCUSED);

        var searchFor = focusedElement ? CLASS_ITEM_FOCUSED : CLASS_ITEM_SELECTED;
        var newElement = void 0;

        for (var index = 0; index < options.length; index++) {
          var direction = keycode === Inputs.KEY_ARROW_DOWN ? 1 : -1;
          var item = new _DomElement["default"](options[index]); // search for selected or focusedElement elements

          if (item.hasClass(searchFor)) {
            oldOption = item;
            newIndex = index; // get the next not disabled element in the appropriate direction

            for (var count = 0; count < options.length; count++) {
              newIndex += direction;
              newIndex %= options.length;

              if (newIndex < 0) {
                newIndex = options.length - 1;
              }

              newElement = new _DomElement["default"](options[newIndex]);

              if (!newElement.hasClass(CLASS_ITEM_DISABLED)) {
                break;
              }
            }
          }
        } // set the new element focused


        (0, _Utils.scrollIntoView)(options[newIndex]);
        var newOption = new _DomElement["default"](options[newIndex]);
        newOption.addClass(CLASS_ITEM_FOCUSED);

        if (oldOption) {
          oldOption.removeClass(CLASS_ITEM_FOCUSED);
        }
      }

      evt.preventDefault();
      return;
    }

    if (Inputs.getKeyValue(keycode) && !this._isFilterable()) {
      // Keyboard keys
      var options = this._wrapperElement.element.querySelectorAll("." + CLASS_ITEM);

      if (options.length > 0) {
        var oldFocusIndex = 0;
        var hasFocusedOption = false;

        for (var index = 0; index < options.length; index++) {
          var item = new _DomElement["default"](options[index]);

          if (item.hasClass(CLASS_ITEM_FOCUSED)) {
            item.removeClass(CLASS_ITEM_FOCUSED);
            var value = item.innerText.toLowerCase();

            if (value.startsWith(Inputs.getKeyValue(keycode))) {
              hasFocusedOption = true;
              oldFocusIndex = index;
            }
          }
        }

        var newOption = this._focusOptionStartingWith(keycode, hasFocusedOption ? oldFocusIndex + 1 : 0, options);

        if (newOption === undefined) {
          this._focusOptionStartingWith(keycode, 0, options);
        }
      }

      evt.preventDefault();
      return;
    }

    if (keycode === Inputs.KEY_ENTER || keycode === Inputs.KEY_TAB) {
      // Handle enter and tab key by selecting the currently focused element
      var newItem = this._dropdownElement.element.querySelector("." + CLASS_ITEM_FOCUSED);

      this._selectedItemChanged(newItem, true, this._multiselection);
    }
  };
  /**
   * Fired when the user presses a key in the filter field
   */


  Select.prototype._handleFilterKeydown = function (e) {
    var keyboardEvent = e;
    var keycode = keyboardEvent.which || keyboardEvent.keyCode; // If the user hits the enter key while filtering and there's a single match, select it

    if (keycode === Inputs.KEY_ENTER) {
      var dropdownElements = this._dropdownElement.element.querySelectorAll("." + CLASS_ITEM);

      if (dropdownElements.length === 1) {
        this._selectedItemChanged(dropdownElements[0], true, this._multiselection);

        e.stopPropagation();
      }
    }
  };
  /**
   * Fired when the user releases a key in the filter field
   */


  Select.prototype._handleFilterKeyup = function (e) {
    var target = e.target; // Filter has changed

    if (target.value !== this._activeFilter && target.value !== this._placeholderText && target.value !== this._lastSelectedOption.innerHTML) {
      this._setFilter(target.value);
    }
  };
  /**
   * Fired when the user focusses the filter input field
   */


  Select.prototype._handleFilterFocus = function (e) {
    var target = e.target;
    setTimeout(function () {
      target.select();
    });
  };
  /**
   * Filters the Select by a given filter keyword
   * @param filter Keyword to filter by
   */


  Select.prototype._setFilter = function (filter) {
    if (filter === void 0) {
      filter = "";
    }

    this._activeFilter = filter.length >= this._minFilterLength ? filter : "";
    this.setOptions(this.getInitialOptions());
  };
  /**
   * Resets the filter
   */


  Select.prototype._clearFilter = function () {
    delete this._activeFilter;
    this.setOptions(this.getInitialOptions());
  };
  /**
   * Set new content and reload the Select
   * @param elements Array of new option (or optgroup) elements to display
   */


  Select.prototype.setOptions = function (options) {
    var _this = this;

    this._emptyNode(this.element);

    options.forEach(function (option) {
      _this.element.appendChild(option);
    }); // Preserve selected value if the selected

    this.element.value = this._lastSelectedOption.value;
    this.reload();
  };
  /**
   * Clear all children of a given node
   * @param node Node
   */


  Select.prototype._emptyNode = function (node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  };
  /**
   * Returns whether an option is a placeholder option
   */


  Select.prototype._isPlaceholder = function (option) {
    return option.hasAttribute("disabled") && option.hasAttribute("selected");
  };
  /**
   * Update placeholder value
   * @param text Content of the placeholder
   */


  Select.prototype._setPlaceholder = function (text) {
    if (this._placeholderElement && text) {
      if (this._isFilterable()) {
        this._placeholderElement.element.value = text;
      } else {
        this._placeholderElement.setHtml(text);
      }
    }
  };

  Object.defineProperty(Select.prototype, "value", {
    /**
     * Gets the value of the currently selected option.
     * If multiple selection is enabled this property returns an array of values.
     */
    get: function get() {
      if (this._multiselection) {
        return this._getSelectedOptions().map(function (x) {
          return x.value;
        });
      }

      if (this.element.value === "") {
        return null;
      }

      return this.element.value;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Select.prototype, "disabled", {
    /**
     * Enables or disables the select component depending on the
     * 'value' parameter.
     * @param {value} If true disables the control; false enables it.
     */
    set: function set(value) {
      if (value) {
        this.disable();
      } else {
        this.enable();
      }
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Reloads the dropdown's option data definitions from the DOM and updates
   * the generated dropdown display items.
   */

  Select.prototype.reload = function () {
    // Remove all existing child elements
    this._emptyNode(this._dropdownElement.element);

    if (this._activeFilter === undefined) {
      // If the user is filtering, let the placeholder "input" alive
      this._setupPlaceholder();
    }

    this._createOptions(this.element);

    this._updateSize();

    this._updateMessage();

    if (!this._isFilterable()) {
      this._updatePlaceholder(!!this.value);
    }
  };
  /**
   * Sets the select control to the enabled state.
   */


  Select.prototype.enable = function () {
    this.element.removeAttribute("disabled");

    this._wrapperElement.removeClass(CLASS_DISABLED);

    window.addEventListener("click", this._windowClickHandler);

    this._wrapperElement.element.addEventListener("click", this._clickHandler);

    this._wrapperElement.element.addEventListener("keydown", this._keydownHandler);

    this._wrapperElement.element.addEventListener("focus", this._focusHandler);

    this._wrapperElement.element.addEventListener("blur", this._blurHandler);
  };
  /**
   * Sets the select control to the disabled state.
   */


  Select.prototype.disable = function () {
    this.element.setAttribute("disabled", "");

    this._wrapperElement.addClass(CLASS_DISABLED);

    window.removeEventListener("click", this._windowClickHandler);

    this._wrapperElement.element.removeEventListener("click", this._clickHandler);

    this._wrapperElement.element.removeEventListener("keydown", this._keydownHandler);

    this._wrapperElement.element.removeEventListener("focus", this._focusHandler);

    this._wrapperElement.element.removeEventListener("blur", this._blurHandler);

    this.close();
  };
  /**
   * Toggles the open/closed state of the select dropdown.
   */


  Select.prototype.toggle = function () {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  };
  /**
   * Gets if the select dropdown is open or closed.
   * @return {boolean} True if open; otherwise false.
   */


  Select.prototype.isOpen = function () {
    return this._wrapperElement.hasClass(CLASS_OPEN);
  };
  /**
   * Opens the select dropdown.
   */


  Select.prototype.open = function () {
    if (!this.isOpen()) {
      this._openByFocus = false;

      this._wrapperElement.removeClass(CLASS_CLOSED);

      this._wrapperElement.addClass(CLASS_OPEN);

      this._dropdownElement.element.addEventListener("click", this._handleDropdownClick);

      this._dropdownElement.element.addEventListener("tap", this._handleDropdownClick);
    }
  };
  /**
   * Closes the select dropdown.
   */


  Select.prototype.close = function () {
    if (this.isOpen()) {
      this._openByFocus = false;

      this._wrapperElement.removeClass(CLASS_OPEN);

      this._wrapperElement.addClass(CLASS_CLOSED); // If the Select is filterable and therefore has an input field,
      // reset the value of it to the chosen option


      if (this._isFilterable()) {
        // Unfocus input field
        this._placeholderElement.element.blur();

        if (!this._activeFilter || this._activeFilter === this._lastSelectedOption.innerHTML) {
          this._setPlaceholder(this._lastSelectedOption.innerHTML);
        }
      }

      this._dropdownElement.element.removeEventListener("click", this._handleDropdownClick);

      this._dropdownElement.element.removeEventListener("tap", this._handleDropdownClick);

      var focusedItem = this._wrapperElement.find("." + CLASS_ITEM_FOCUSED);

      if (focusedItem) {
        focusedItem.removeClass(CLASS_ITEM_FOCUSED);
      }
    }
  };
  /**
   * Returns true when the element has the filter modifier class
   */


  Select.prototype._isFilterable = function () {
    return this._wrapperElement.hasClass(CLASS_FILTERABLE);
  };
  /**
   * Destroys the component and clears all references.
   */


  Select.prototype.destroy = function () {
    window.removeEventListener("click", this._windowClickHandler);

    if (this._dropdownElement) {
      this._dropdownElement.element.removeEventListener("click", this._handleDropdownClick);

      this._dropdownElement.element.removeEventListener("tap", this._handleDropdownClick);

      (0, _Utils.remove)(this._dropdownElement.element);
      this._dropdownElement = undefined;
    }

    if (this._placeholderElement) {
      this._placeholderElement.removeEventListener("keydown", this._filterKeydownHandler);

      this._placeholderElement.removeEventListener("keyup", this._filterKeyupHandler);

      this._placeholderElement.removeEventListener("focus", this._filterFocusHandler);
    }

    if (this._wrapperElement) {
      this._wrapperElement.element.removeEventListener("click", this._clickHandler);

      this._wrapperElement.element.removeEventListener("keydown", this._keydownHandler);

      this._wrapperElement.element.removeEventListener("focus", this._focusHandler);

      this._wrapperElement.element.removeEventListener("blur", this._blurHandler);

      this._wrapperElement = undefined;
    }

    if (this._selectButtonElement) {
      (0, _Utils.remove)(this._selectButtonElement.element);
      this._selectButtonElement = undefined;
    }

    this.removeClass(CLASS_CLOSED);
  };

  return Select;
}(_DomElement["default"]);

function init() {
  (0, _Utils.searchAndInitialize)("select", function (e) {
    new Select(e);
  });
}

var _default = Select;
exports["default"] = _default;

},{"../DomElement":4,"../DomFunctions":5,"../Inputs":6,"../Utils":7,"@babel/runtime/helpers/interopRequireDefault":33,"@babel/runtime/helpers/interopRequireWildcard":34,"tslib":43}],20:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports["default"] = void 0;

var _tslib = require("tslib");

var _Utils = require("../Utils");

var _DomElement = _interopRequireDefault(require("../DomElement"));

var Dom = _interopRequireWildcard(require("../DomFunctions"));

var QUERY_TEXTAREA = "textarea";
var CLASS_HAS_VALUE = "is-fixed";
/**
 * Textarea component
 */

var Textarea =
/** @class */
function (_super) {
  (0, _tslib.__extends)(Textarea, _super);

  function Textarea(element) {
    var _this = _super.call(this, element) || this;

    _this._area = _this.element.querySelector(QUERY_TEXTAREA);
    _this._focusChangedHandler = _this._focusChanged.bind(_this);
    _this._valueChangedHandler = _this._onValueChanged.bind(_this);
    _this._resizeHandler = _this._updateHeight.bind(_this);

    _this._initialize();

    return _this;
  }
  /**
   * Initializes the textarea component.
   * @private
   */


  Textarea.prototype._initialize = function () {
    this._minRows = parseInt(this._area.getAttribute("data-min-rows") || "3", 10);
    this._maxRows = parseInt(this._area.getAttribute("data-max-rows"), 10) || Number.MAX_SAFE_INTEGER; // Make sure min an max are property specified

    this._minRows = Math.min(this._minRows, this._maxRows);
    this._maxRows = Math.max(this._minRows, this._maxRows);
    this._lineHeight = parseInt(Dom.css(this._area, "line-height"), 10);
    this._updateBaseHeight = Dom.isHidden(this._area, true);

    this._calculateBaseHeight(); // add event listeners


    this._area.addEventListener("focus", this._focusChangedHandler);

    this._area.addEventListener("blur", this._focusChangedHandler);

    this._area.addEventListener("input", this._valueChangedHandler);

    window.addEventListener("resize", this._resizeHandler);
    window.addEventListener("orientationchange", this._resizeHandler);

    this._onValueChanged();
  };

  Textarea.prototype._calculateBaseHeight = function () {
    // temporary clear the content to take measurements
    var value = this._area.value;
    this._area.value = "";
    this._baseHeight = this._area.offsetHeight - this._lineHeight;
    this._baseScrollHeight = this._area.scrollHeight - this._lineHeight; // restore initial content

    this._area.value = value;
  };

  Textarea.prototype._focusChanged = function () {
    this._updateHeight();
  };

  Textarea.prototype._updateHeight = function () {
    var hasFocus = this._area === document.activeElement;
    var maxRows,
        rows = 0;

    if (this._updateBaseHeight === true && Dom.isHidden(this._area, true) === false) {
      this._calculateBaseHeight();

      this._updateBaseHeight = false;
    } // Calculate the apropriate size for the control


    if (!this._hasValue()) {
      // Handle empty states
      rows = hasFocus === true ? this._minRows : 1;
      maxRows = rows;
    } else {
      // Reset the height for calculation of the row count
      this._area.style.height = "auto"; // Get the new height

      rows = Math.ceil((this._area.scrollHeight - this._baseScrollHeight) / this._lineHeight) + 1;
      maxRows = Math.max(Math.min(this._maxRows, rows), this._minRows);
    }

    if (rows > this._maxRows) {
      this._area.style.overflow = "auto";
    } else {
      this._area.style.overflow = "hidden";
    }

    var height = (maxRows - 1) * this._lineHeight + this._baseHeight;
    this._area.style.height = height + "px";
  };

  Textarea.prototype._hasValue = function () {
    return this._area.value && this._area.value.length > 0;
  };

  Textarea.prototype._onValueChanged = function () {
    if (this._hasValue()) {
      Dom.addClass(this._area, CLASS_HAS_VALUE);
    } else {
      Dom.removeClass(this._area, CLASS_HAS_VALUE);
      this._area.value = "";
    }

    this._updateHeight();
  };
  /**
   * Destroys the component and clears all references.
   */


  Textarea.prototype.destroy = function () {
    window.removeEventListener("resize", this._resizeHandler);
    window.removeEventListener("orientationchange", this._resizeHandler);

    this._area.removeEventListener("focus", this._focusChangedHandler);

    this._area.removeEventListener("blur", this._focusChangedHandler);

    this._area.removeEventListener("input", this._valueChangedHandler);

    this._focusChangedHandler = null;
    this._valueChangedHander = null;
    this._area = null;
    this._minRows = null;
    this._maxRows = null;
    this._lineHeight = null;
    this._baseHeight = null;
    this._baseScrollHeight = null;
    this.element = null;
  };

  return Textarea;
}(_DomElement["default"]);

function init() {
  (0, _Utils.searchAndInitialize)(".input-multiline, .input-field--multiline", function (e) {
    new Textarea(e);
  });
}

var _default = Textarea;
exports["default"] = _default;

},{"../DomElement":4,"../DomFunctions":5,"../Utils":7,"@babel/runtime/helpers/interopRequireDefault":33,"@babel/runtime/helpers/interopRequireWildcard":34,"tslib":43}],21:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports["default"] = void 0;

var _tslib = require("tslib");

var _Utils = require("../Utils");

var _DomElement = _interopRequireDefault(require("../DomElement"));

/**
 * Loader bar component
 */
var LoaderBar =
/** @class */
function (_super) {
  (0, _tslib.__extends)(LoaderBar, _super);
  /**
   * Creates and initializes the LoaderBar component.
   * @param {Element} - The root element of the LoaderBar component.
   */

  function LoaderBar(element) {
    var _this = _super.call(this, element) || this;

    _this._initialize();

    return _this;
  }
  /**
   * Initializes the loader bar component.
   * @private
   */


  LoaderBar.prototype._initialize = function () {
    this.progressElement = this.find(".indicator") || this;
    this.fileNameElement = this.find(".detail > .name");
    this.progressLabelElement = this.find(".progress");
    this.totalProgressElement = this.find(".progress > .file-size");
  };

  Object.defineProperty(LoaderBar.prototype, "progress", {
    /**
     * Gets the current progress value in the range of 0..1.
     */
    get: function get() {
      return this.value;
    },

    /**
     * Sets the current progress.
     * @param {number} - The progress in the range of 0..1.
     */
    set: function set(val) {
      // val = clamp(val, 0, 1)
      var percentage = (val * 100).toFixed(0);
      this.value = val;
      this.element.value = String(val);
      this.progressElement.setAttribute("style", "width: " + val * 100 + "%");

      if (this.progressLabelElement) {
        this.progressLabelElement.element.textContent = percentage + "%";
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(LoaderBar.prototype, "filename", {
    /**
     * Gets the filename.
     * @returns {string} - The filename.
     */
    get: function get() {
      if (!this.fileNameElement) {
        return undefined;
      }

      return this.fileNameElement.element.innerHTML;
    },

    /**
     * Sets the filename.
     */
    set: function set(val) {
      if (!this.fileNameElement) {
        throw new Error("Cannot set the filename, missing detail element");
      }

      this.fileNameElement.setHtml(val || "");
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(LoaderBar.prototype, "fileSize", {
    /**
     * Sets the file size label.
     */
    set: function set(val) {
      if (!this.totalProgressElement) {
        throw new Error("Cannot set the fileSize, missing detail element");
      }

      this.totalProgressElement.setHtml(val);
    },
    enumerable: false,
    configurable: true
  });
  return LoaderBar;
}(_DomElement["default"]);

function init() {
  (0, _Utils.searchAndInitialize)(".loader-bar", function (e) {
    new LoaderBar(e);
  });
}

var _default = LoaderBar;
exports["default"] = _default;

},{"../DomElement":4,"../Utils":7,"@babel/runtime/helpers/interopRequireDefault":33,"tslib":43}],22:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports["default"] = void 0;

var _tslib = require("tslib");

var _animejs = _interopRequireDefault(require("animejs"));

var _popper = _interopRequireDefault(require("popper.js"));

var _DomElement = _interopRequireDefault(require("../DomElement"));

var _DomFunctions = require("../DomFunctions");

var CLASS_OPEN = "is-open";
var CLASS_MENU = "js-flyout";
var CLASS_TABS = "tabs";
var ANIMATION_OPEN = 300;
/**
 * A component for the flyout menu.
 */

var MenuFlyout =
/** @class */
function (_super) {
  (0, _tslib.__extends)(MenuFlyout, _super);
  /**
   * Creates and initializes the flyout component.
   * @param element - The root element of the flyout menu component.
   */

  function MenuFlyout(element) {
    var _this = _super.call(this, element) || this;

    _this._animationDuration = ANIMATION_OPEN;
    _this._dynamicPlacement = false;
    _this._clickHandler = _this._handleClick.bind(_this);
    _this._windowClickHandler = _this._handleWindowClick.bind(_this);

    _this._initialize();

    return _this;
  }
  /**
   * Initializes the flyout component.
   * @private
   */


  MenuFlyout.prototype._initialize = function () {
    var dataTarget = this.element.getAttribute("data-target");

    if (dataTarget === null || dataTarget === "") {
      /* tslint:disable:no-console */
      console.error("A flyout menu element requires a 'data-target' that specifies the element to collapse");
      console.info(this.element);
      /* tslint:enable:no-console */

      return;
    }

    if (this._useDynamicPlacement()) {
      this._dynamicPlacement = true;
    }

    var hiddenTarget = this.element.getAttribute("data-hidden");

    if (hiddenTarget !== null && hiddenTarget !== "") {
      this._hiddenIndicator = document.querySelector(hiddenTarget) || undefined;
    }

    this._initFlyoutElement(dataTarget);

    this.element.addEventListener("click", this._clickHandler);
  };

  MenuFlyout.prototype._initFlyoutElement = function (dataTarget) {
    this._flyoutElement = document.querySelector(dataTarget);
    this._flyoutElement.style.opacity = "0";
    this._flyoutElement.style.transform = "translateY(-20px)";
  };

  MenuFlyout.prototype._handleClick = function () {
    this.toggle();
  };

  MenuFlyout.prototype._handleWindowClick = function (event) {
    var target = event.target;

    if ((0, _DomFunctions.parentWithClass)(target, CLASS_MENU) === this._flyoutElement) {
      return false;
    }

    while (target !== this.element && target.parentElement) {
      target = target.parentElement;
    }

    if (target !== this.element) {
      this.close();
      return false;
    }

    return true;
  };

  MenuFlyout.prototype._useDynamicPlacement = function () {
    return (0, _DomFunctions.parentWithClass)(this.element, CLASS_TABS);
  };

  MenuFlyout.prototype._openMenu = function (el) {
    _animejs["default"].remove(el);

    if (this._dynamicPlacement === true) {
      var popperOptions = {
        placement: "bottom",
        modifiers: {
          flip: {
            enabled: false
          }
        },
        eventsEnabled: false
      };
      this._popperInstance = new _popper["default"](this.element, this._flyoutElement, popperOptions);
    }

    (0, _animejs["default"])({
      targets: el,
      duration: this._animationDuration,
      easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
      opacity: 1,
      translateY: "0px",
      begin: function begin() {
        el.style.display = "block";
      },
      complete: function complete() {
        (0, _DomFunctions.addClass)(el, CLASS_OPEN);
      }
    }); // set aria expanded

    el.setAttribute("aria-expanded", "true");
    this.dispatchEvent("opened");
  };

  MenuFlyout.prototype._closeMenu = function (el) {
    _animejs["default"].remove(el);

    if (this._popperInstance) {
      this._popperInstance.destroy();

      this._popperInstance = undefined;
    }

    (0, _animejs["default"])({
      targets: el,
      duration: this._animationDuration,
      easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
      opacity: 0,
      translateY: "-20px",
      complete: function complete() {
        el.style.display = "none";
        (0, _DomFunctions.removeClass)(el, CLASS_OPEN);
      }
    }); // set aria expanded

    el.setAttribute("aria-expanded", "false");
    this.dispatchEvent("closed");
  };

  Object.defineProperty(MenuFlyout.prototype, "animationDuration", {
    /**
     * Sets the opening animation duration.
     * @param {durationInSeconds} - The animation duration in seconds.
     */
    set: function set(durationInSeconds) {
      this._animationDuration = durationInSeconds;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Opens the flyout menu.
   * @fires Modal#opened
   */

  MenuFlyout.prototype.open = function () {
    var _this = this;

    if (this._hiddenIndicator && (0, _DomFunctions.isHidden)(this._hiddenIndicator, false) === true) {
      return;
    }

    if ((0, _DomFunctions.hasClass)(this.element, CLASS_OPEN) === true) {
      return;
    }

    (0, _DomFunctions.addClass)(this.element, CLASS_OPEN);

    this._openMenu(this._flyoutElement);

    setTimeout(function () {
      window.addEventListener("click", _this._windowClickHandler);
      window.addEventListener("touchend", _this._windowClickHandler);
    }, 50);
  };
  /**
   * Closes the flyout menu.
   * @fires Modal#closed
   */


  MenuFlyout.prototype.close = function () {
    if (this._hiddenIndicator && (0, _DomFunctions.isHidden)(this._hiddenIndicator, false) === true) {
      return;
    }

    if ((0, _DomFunctions.hasClass)(this.element, CLASS_OPEN) === false) {
      return;
    }

    (0, _DomFunctions.removeClass)(this.element, CLASS_OPEN);
    window.removeEventListener("click", this._windowClickHandler);
    window.removeEventListener("touchend", this._windowClickHandler);

    this._closeMenu(this._flyoutElement);
  };
  /**
   * Toggles the flyout menu.
   * @fires Modal#opened
   * @fires Modal#closed
   */


  MenuFlyout.prototype.toggle = function () {
    if ((0, _DomFunctions.hasClass)(this.element, CLASS_OPEN) === false) {
      this.open();
    } else {
      this.close();
    }
  };
  /**
   * Removes all event handlers and clears references.
   */


  MenuFlyout.prototype.destroy = function () {
    this._flyoutElement = null;
    window.removeEventListener("click", this._windowClickHandler);
    window.removeEventListener("touchend", this._windowClickHandler);

    if (this._clickHandler) {
      this.element.removeEventListener("click", this._clickHandler);
    }

    if (this._popperInstance) {
      this._popperInstance.destroy();

      this._popperInstance = undefined;
    }

    this._clickHandler = null;
    this._windowClickHandler = null;
    this.element = null;
  };

  return MenuFlyout;
}(_DomElement["default"]);

function init() {
  var e_1, _a;

  var elements = document.querySelectorAll("[data-toggle='flyout']");

  try {
    for (var elements_1 = (0, _tslib.__values)(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
      var e = elements_1_1.value;

      if (e.getAttribute("data-init") === "auto") {
        new MenuFlyout(e);
      }
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (elements_1_1 && !elements_1_1.done && (_a = elements_1["return"])) _a.call(elements_1);
    } finally {
      if (e_1) throw e_1.error;
    }
  }
}

var _default = MenuFlyout;
exports["default"] = _default;

},{"../DomElement":4,"../DomFunctions":5,"@babel/runtime/helpers/interopRequireDefault":33,"animejs":36,"popper.js":42,"tslib":43}],23:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports["default"] = void 0;

var _tslib = require("tslib");

var _bodyScrollLock = require("body-scroll-lock");

var _Utils = require("../Utils");

var Inputs = _interopRequireWildcard(require("../Inputs"));

var _DomElement = _interopRequireDefault(require("../DomElement"));

var _DomFunctions = require("../DomFunctions");

var CLASS_BACKDROP = "backdrop";
var CLASS_BACKDROP_OPEN = "backdrop--open";
var CLASS_OPEN = "modal--open";
var CLASS_TRIGGER = "modal-trigger";
var CLASS_BODY = "modal__body";
var CLASS_BUTTONS_OKAY = ".modal-close";
var CLASS_BUTTONS_CLOSE = ".modal-cancel";
/**
 * A component to open and close modal dialogs. It also handles cancellation and makes
 * sure that the modal background is present in the DOM.
 */

var Modal =
/** @class */
function (_super) {
  (0, _tslib.__extends)(Modal, _super);

  function Modal(element) {
    var _this = _super.call(this, element) || this;

    _this._okayHandler = _this.close.bind(_this);
    _this._cancelHandler = _this._handleClick.bind(_this);
    _this._keydownHandler = _this._handleKeydown.bind(_this);

    _this._initialize();

    return _this;
  }
  /**
   * Initializes the range modal component.
   * @private
   */


  Modal.prototype._initialize = function () {
    // Create the backdrop
    this._backdrop = new _DomElement["default"]("div").addClass(CLASS_BACKDROP);
    this._backdropParent = (0, _DomFunctions.getRootElement)();

    this._subscribeToTrigger();
  };

  Modal.prototype._subscribeToTrigger = function () {
    var e_1, _a;

    var triggerId = this.element.id;

    if (!triggerId) {
      return;
    }

    this._triggerClickHandler = this.open.bind(this);
    var triggerElements = document.querySelectorAll("." + CLASS_TRIGGER + "[href=" + triggerId + "]");

    try {
      for (var triggerElements_1 = (0, _tslib.__values)(triggerElements), triggerElements_1_1 = triggerElements_1.next(); !triggerElements_1_1.done; triggerElements_1_1 = triggerElements_1.next()) {
        var triggerElement = triggerElements_1_1.value;
        triggerElement.addEventListener("click", this._triggerClickHandler);
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (triggerElements_1_1 && !triggerElements_1_1.done && (_a = triggerElements_1["return"])) _a.call(triggerElements_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  };

  Modal.prototype._unsubscribeFromTrigger = function () {
    var e_2, _a;

    var triggerId = this.element.id;

    if (!triggerId) {
      return;
    }

    var triggerElements = document.querySelectorAll("." + CLASS_TRIGGER + "[href=" + triggerId + "]");

    try {
      for (var triggerElements_2 = (0, _tslib.__values)(triggerElements), triggerElements_2_1 = triggerElements_2.next(); !triggerElements_2_1.done; triggerElements_2_1 = triggerElements_2.next()) {
        var triggerElement = triggerElements_2_1.value;
        triggerElement.removeEventListener("click", this._windowClickHandler);
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (triggerElements_2_1 && !triggerElements_2_1.done && (_a = triggerElements_2["return"])) _a.call(triggerElements_2);
      } finally {
        if (e_2) throw e_2.error;
      }
    }

    this._triggerClickHandler = undefined;
  };

  Modal.prototype._handleKeydown = function (event) {
    var keyboardEvent = event;
    var keycode = keyboardEvent.which || keyboardEvent.keyCode;

    if (keycode === Inputs.KEY_ESCAPE) {
      // handle Escape key (ESC)
      this.cancel();
      return;
    }
  };

  Modal.prototype._handleClick = function (event) {
    (0, _Utils.preventDefault)(event);
    this.cancel();
  };

  Modal.prototype._close = function () {
    var e_3, _a, e_4, _b;

    var _this = this;

    (0, _bodyScrollLock.enableBodyScroll)(this.element);
    document.removeEventListener("keydown", this._keydownHandler);

    this._backdrop.element.removeEventListener("click", this._cancelHandler);

    this._backdrop.removeClass(CLASS_BACKDROP_OPEN);

    this.removeClass(CLASS_OPEN);

    try {
      for (var _c = (0, _tslib.__values)(this.element.querySelectorAll(CLASS_BUTTONS_CLOSE)), _d = _c.next(); !_d.done; _d = _c.next()) {
        var closeButton = _d.value;
        closeButton.removeEventListener("click", this._cancelHandler);
      }
    } catch (e_3_1) {
      e_3 = {
        error: e_3_1
      };
    } finally {
      try {
        if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
      } finally {
        if (e_3) throw e_3.error;
      }
    }

    try {
      for (var _e = (0, _tslib.__values)(this.element.querySelectorAll(CLASS_BUTTONS_OKAY)), _f = _e.next(); !_f.done; _f = _e.next()) {
        var okayButton = _f.value;
        okayButton.removeEventListener("click", this._okayHandler);
      }
    } catch (e_4_1) {
      e_4 = {
        error: e_4_1
      };
    } finally {
      try {
        if (_f && !_f.done && (_b = _e["return"])) _b.call(_e);
      } finally {
        if (e_4) throw e_4.error;
      }
    }

    setTimeout(function () {
      // remove the backdrop from the body
      _this._backdropParent.removeChild(_this._backdrop.element);
    }, 300);
  };
  /**
   * Opens the modal dialog.
   * @fires Modal#opened
   */


  Modal.prototype.open = function () {
    var _this = this;

    (0, _bodyScrollLock.disableBodyScroll)(this.element, {
      allowTouchMove: function allowTouchMove(el) {
        var currentEl = el;

        while (currentEl && currentEl !== document.body) {
          // Check if the user is scrolling the modal body
          if (currentEl.classList.contains(CLASS_BODY)) {
            // Check if the element overflows
            if (currentEl.scrollHeight > currentEl.clientHeight) {
              return true;
            }
          }

          currentEl = currentEl.parentNode;
        }

        return false;
      }
    }); // add the backdrop to the body

    this._backdropParent.appendChild(this._backdrop.element); // set the element to flex as it is initially hidden


    this.element.style.display = "flex"; // remove the style after the animation completes

    setTimeout(function () {
      _this.element.style.display = "";
    }, 800); // wait a bit to allow the browser to catch up and show the animation

    setTimeout(function () {
      var e_5, _a, e_6, _b;

      _this.addClass(CLASS_OPEN);

      _this._backdrop.addClass(CLASS_BACKDROP_OPEN);

      document.addEventListener("keydown", _this._keydownHandler);

      _this._backdrop.element.addEventListener("click", _this._cancelHandler);

      try {
        for (var _c = (0, _tslib.__values)(_this.element.querySelectorAll(CLASS_BUTTONS_CLOSE)), _d = _c.next(); !_d.done; _d = _c.next()) {
          var closeButton = _d.value;
          closeButton.addEventListener("click", _this._cancelHandler);
        }
      } catch (e_5_1) {
        e_5 = {
          error: e_5_1
        };
      } finally {
        try {
          if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
        } finally {
          if (e_5) throw e_5.error;
        }
      }

      try {
        for (var _e = (0, _tslib.__values)(_this.element.querySelectorAll(CLASS_BUTTONS_OKAY)), _f = _e.next(); !_f.done; _f = _e.next()) {
          var okayButton = _f.value;
          okayButton.addEventListener("click", _this._okayHandler);
        }
      } catch (e_6_1) {
        e_6 = {
          error: e_6_1
        };
      } finally {
        try {
          if (_f && !_f.done && (_b = _e["return"])) _b.call(_e);
        } finally {
          if (e_6) throw e_6.error;
        }
      }

      _this.element.addEventListener("click", function (e) {
        return e.stopPropagation();
      });

      _this.dispatchEvent("opened");
    }, 50);
  };
  /**
   * Cancels (and closes) the modal dialog.
   * @fires Modal#cancelled
   * @fires Modal#closed
   */


  Modal.prototype.cancel = function () {
    this.dispatchEvent("cancelled");

    this._close();
  };
  /**
   * Closes the modal dialog.
   * @fires Modal#closed
   */


  Modal.prototype.close = function () {
    this._close();

    this.dispatchEvent("closed");
  };
  /**
   * Destroys the component and frees all references.
   */


  Modal.prototype.destroy = function () {
    this.cancel();

    this._unsubscribeFromTrigger();
  };

  return Modal;
}(_DomElement["default"]);

function init() {
  (0, _Utils.searchAndInitialize)(".modal", function (e) {
    new Modal(e);
  });
}

var _default = Modal;
exports["default"] = _default;

},{"../DomElement":4,"../DomFunctions":5,"../Inputs":6,"../Utils":7,"@babel/runtime/helpers/interopRequireDefault":33,"@babel/runtime/helpers/interopRequireWildcard":34,"body-scroll-lock":37,"tslib":43}],24:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports["default"] = void 0;

var _tslib = require("tslib");

var _animejs = _interopRequireDefault(require("animejs"));

var _Utils = require("../Utils");

var _DomElement = _interopRequireDefault(require("../DomElement"));

var Dom = _interopRequireWildcard(require("../DomFunctions"));

var _SearchInput = _interopRequireDefault(require("../search/SearchInput"));

var CLASS_OPEN = "is-open";
var CLASS_ACTIVE = "is-active";
var QUERY_NAV_HAMBURGER = ".nav-hamburger";
var QUERY_NAV_HB_BODY = ".nav__primary";
var CLASS_NAV_LINK = "nav-link--header";
var QUERY_NAV_LINK_ACTIVE = ".nav-link--header.is-active";
var QUERY_NAV_MOBILE = ".nav__level1 .nav__mainnav .nav__primary";
var QUERY_NAV_LEVEL0 = ".nav__level0";
var QUERY_NAV_LEVEL0_CONTAINER = ".nav__level0 .nav__subnav";
var QUERY_SECTION_OPEN = ".nav-section.is-open";
var QUERY_NAV_LEVEL1 = ".nav__level1 .nav__mainnav";
var QUERY_NAV_LEVEL0_LINK = ".nav-link.nav-link--header";
var QUERY_NAV_LEVEL1_LINK = ".nav-link--header";
var QUERY_NAV_COLUMN = ".nav-col";
var QUERY_NAV_COLUMN_ACTIVE = ".nav-col.is-active";
var QUERY_NAV_BODY = ".nav-body";
var QUERY_NAV_FOOTER = ".nav-footer";
var QUERY_SEARCH_ICON = ".nav-search";
var QUERY_SEARCH_FIELD = ".search__input";
var CLASS_SEARCH_DESKTOP = "search--desktop";
var ANIMATION_START_DELAY = 200;
var ANIMATION_OFFSET = 50;
var ANIMATION_BODY_DURATION = 300;
var ANIMATION_FOOTER_DURATION = 100;
/**
 * The navigation component definition.
 */

var Navigation =
/** @class */
function (_super) {
  (0, _tslib.__extends)(Navigation, _super);

  function Navigation(element) {
    var _this = _super.call(this, element) || this;

    _this.animation = _animejs["default"].timeline();
    _this._navLevel0 = _this.element.querySelector(QUERY_NAV_LEVEL0) || document.createElement("div");
    _this._navLevel0Body = _this.element.querySelector(QUERY_NAV_LEVEL0_CONTAINER) || document.createElement("div");
    _this._navLevel1 = _this.element.querySelector(QUERY_NAV_LEVEL1) || document.createElement("div");
    _this._navMobile = _this.element.querySelector(QUERY_NAV_MOBILE) || document.createElement("div");

    if (!_this._navMobile.parentElement) {
      var dummyParent = document.createElement("div");
      dummyParent.appendChild(_this._navMobile);
    }

    _this._hamburgerElement = _this.element.querySelector(QUERY_NAV_HAMBURGER) || document.createElement("div");
    _this._searchComponents = [];
    _this._level0ClickHandler = _this._handleLevel0Click.bind(_this);
    _this._level1ClickHandler = _this._handleLevel1Click.bind(_this);
    _this._windowClickHandler = _this._handleWindowClick.bind(_this);
    _this._searchClickHandler = _this._handleSearchClick.bind(_this);

    _this._initialize();

    return _this;
  }

  Navigation.prototype._resetMainTimeline = function () {
    var e_1, _a;

    var elements = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      elements[_i] = arguments[_i];
    }

    this.animation.pause();

    try {
      for (var elements_1 = (0, _tslib.__values)(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
        var el = elements_1_1.value;

        _animejs["default"].remove(el);
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (elements_1_1 && !elements_1_1.done && (_a = elements_1["return"])) _a.call(elements_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }

    this.animation = _animejs["default"].timeline();
  };

  Navigation.prototype._isMobile = function () {
    return Dom.isHidden(this._hamburgerElement, true) === false;
  };

  Navigation.prototype._handleLevel0Click = function (event) {
    var isDesktop = !this._isMobile();

    if (isDesktop) {
      var navItems = new NavigationItems(this).fromLevel0(event.target);

      if (!navItems.section) {
        return;
      }

      var previousNavLink = this._navLevel0.querySelector(QUERY_NAV_LINK_ACTIVE);

      var previousNavSection = this._navLevel0.querySelector(QUERY_SECTION_OPEN);

      this._toggleContainer(navItems.link, this._navLevel0Body, navItems.section, undefined, previousNavLink, this._navLevel0Body, previousNavSection, undefined, true);
    }
  };

  Navigation.prototype._handleLevel1Click = function (event) {
    var navItems = new NavigationItems(this).fromLevel1(event.target);
    var prevItems = navItems.previousLevel1();

    this._toggleContainer(navItems.link, navItems.container, navItems.section, navItems.footer, prevItems.link, prevItems.container, prevItems.section, prevItems.footer, false);

    return false;
  };

  Navigation.prototype._toggleContainer = function (navLink, navContainer, navSection, navFooter, previousNavLink, previousNavContainer, previousNavSection, previousNavFooter, animateContainer) {
    if (animateContainer === void 0) {
      animateContainer = false;
    }

    var isDesktop = !this._isMobile();

    if (previousNavLink && previousNavLink !== navLink && navLink !== this._hamburgerElement) {
      Dom.removeClass(previousNavLink, CLASS_ACTIVE);
    }

    this._resetMainTimeline(navContainer, navSection, navFooter, previousNavContainer, previousNavSection, previousNavFooter);

    if (Dom.hasClass(navLink, CLASS_ACTIVE)) {
      Dom.removeClass(navLink, CLASS_ACTIVE);

      if (isDesktop) {
        this._onNavigationClosed();

        this._closeSection(navContainer, navSection, navFooter, true, animateContainer);
      } else if (navLink === this._hamburgerElement) {
        // Close mobile navigation
        this._onNavigationClosed();

        this._closeSection(navContainer, navSection, undefined, false, false);
      } else if (!isDesktop) {
        // Close the section
        this._closeSection(navContainer, navSection, navFooter, true, animateContainer);
      }
    } else {
      Dom.addClass(navLink, CLASS_ACTIVE);

      if (isDesktop) {
        Dom.addClass(this._navMobile, CLASS_OPEN);

        this._onNavigationOpened();

        if (previousNavContainer && previousNavSection) {
          this._closeSection(previousNavContainer, previousNavSection, previousNavFooter, true, animateContainer);
        }

        this._openSection(navContainer, navSection, navFooter, true, animateContainer);
      } else if (navLink === this._hamburgerElement) {
        // Open mobile navigation
        this._onNavigationOpened();

        this._openSection(navContainer, navSection, undefined, false, false);
      } else if (!isDesktop) {
        // Open section
        if (previousNavContainer && previousNavSection) {
          this._closeSection(previousNavContainer, previousNavSection, previousNavFooter, true, animateContainer);

          this.animation = _animejs["default"].timeline();
        }

        this._openSection(navContainer, navSection, navFooter, true, animateContainer);
      }
    }
  };

  Navigation.prototype._onNavigationOpened = function () {
    Dom.addClass(this._navMobile, CLASS_OPEN);
    Dom.addClass(this._navMobile.parentElement, CLASS_OPEN);
    Dom.addClass(this._hamburgerElement, CLASS_ACTIVE);
    window.addEventListener("click", this._windowClickHandler);
    window.addEventListener("touchend", this._windowClickHandler);
  };

  Navigation.prototype._onNavigationClosed = function () {
    Dom.removeClass(this._navMobile, CLASS_OPEN);
    Dom.removeClass(this._navMobile.parentElement, CLASS_OPEN);
    Dom.removeClass(this._hamburgerElement, CLASS_ACTIVE);
    window.removeEventListener("click", this._windowClickHandler);
    window.removeEventListener("touchend", this._windowClickHandler);
  };

  Navigation.prototype._handleWindowClick = function (event) {
    var target = event.target;

    while (target !== this.element && target.parentElement) {
      target = target.parentElement;
    }

    if (target !== this.element) {
      this.close();
      return false;
    }

    return true;
  };

  Navigation.prototype._openSection = function (navContainer, navSection, navFooter, animateColumns, animateContainer) {
    var e_2, _a, e_3, _b;

    if (animateColumns === void 0) {
      animateColumns = true;
    }

    if (animateContainer === void 0) {
      animateContainer = false;
    }

    if (!navSection || !navContainer) {
      return;
    }

    var activeItems = navSection.querySelectorAll(QUERY_NAV_COLUMN);

    if (animateContainer === true) {
      var container = navContainer;
      navContainer = navSection;
      navSection = container;
    }

    Dom.addClass(navContainer, CLASS_OPEN);
    navSection.style.display = "block";
    this.animation.add({
      targets: navSection,
      duration: ANIMATION_BODY_DURATION,
      easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
      height: animateContainer ? navContainer.scrollHeight : navSection.scrollHeight,
      complete: function complete() {
        Dom.addClass(navSection, CLASS_OPEN);
        new _DomElement["default"](navSection).setAttribute("style", "");
      }
    });

    if (navFooter) {
      var navItems = navFooter.querySelectorAll(QUERY_NAV_COLUMN);

      try {
        for (var navItems_1 = (0, _tslib.__values)(navItems), navItems_1_1 = navItems_1.next(); !navItems_1_1.done; navItems_1_1 = navItems_1.next()) {
          var item = navItems_1_1.value;
          Dom.addClass(item, CLASS_ACTIVE);
        }
      } catch (e_2_1) {
        e_2 = {
          error: e_2_1
        };
      } finally {
        try {
          if (navItems_1_1 && !navItems_1_1.done && (_a = navItems_1["return"])) _a.call(navItems_1);
        } finally {
          if (e_2) throw e_2.error;
        }
      }

      navFooter.style.display = "block";
      this.animation.add({
        targets: navFooter,
        duration: ANIMATION_FOOTER_DURATION,
        easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
        height: navFooter.scrollHeight,
        offset: "-=" + ANIMATION_FOOTER_DURATION,
        complete: function complete() {
          Dom.addClass(navFooter, CLASS_OPEN);
          new _DomElement["default"](navFooter).setAttribute("style", "");
        }
      });
    }

    if (animateColumns === true) {
      var delay = ANIMATION_START_DELAY;

      var _loop_1 = function _loop_1(item) {
        this_1.animation.add({
          targets: item,
          duration: 0,
          offset: delay,
          complete: function complete() {
            Dom.addClass(item, CLASS_ACTIVE);
          }
        });
        delay += ANIMATION_OFFSET;
      };

      var this_1 = this;

      try {
        for (var activeItems_1 = (0, _tslib.__values)(activeItems), activeItems_1_1 = activeItems_1.next(); !activeItems_1_1.done; activeItems_1_1 = activeItems_1.next()) {
          var item = activeItems_1_1.value;

          _loop_1(item);
        }
      } catch (e_3_1) {
        e_3 = {
          error: e_3_1
        };
      } finally {
        try {
          if (activeItems_1_1 && !activeItems_1_1.done && (_b = activeItems_1["return"])) _b.call(activeItems_1);
        } finally {
          if (e_3) throw e_3.error;
        }
      }
    }
  };

  Navigation.prototype._closeSection = function (navContainer, navSection, navFooter, animateColumns, animateContainer) {
    var e_4, _a, e_5, _b;

    if (animateColumns === void 0) {
      animateColumns = true;
    }

    if (animateContainer === void 0) {
      animateContainer = false;
    }

    if (!navSection || !navContainer) {
      return;
    }

    var activeItems = navSection.querySelectorAll(QUERY_NAV_COLUMN_ACTIVE);

    if (animateContainer === true) {
      var container = navContainer;
      navContainer = navSection;
      navSection = container;
    }

    if (animateColumns === true) {
      try {
        for (var activeItems_2 = (0, _tslib.__values)(activeItems), activeItems_2_1 = activeItems_2.next(); !activeItems_2_1.done; activeItems_2_1 = activeItems_2.next()) {
          var active = activeItems_2_1.value;
          Dom.removeClass(active, CLASS_ACTIVE);
        }
      } catch (e_4_1) {
        e_4 = {
          error: e_4_1
        };
      } finally {
        try {
          if (activeItems_2_1 && !activeItems_2_1.done && (_a = activeItems_2["return"])) _a.call(activeItems_2);
        } finally {
          if (e_4) throw e_4.error;
        }
      }
    }

    this.animation.add({
      targets: navSection,
      duration: ANIMATION_BODY_DURATION,
      easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
      height: 0,
      offset: 0,
      complete: function complete() {
        Dom.removeClass(navContainer, CLASS_OPEN);
        Dom.removeClass(navSection, CLASS_OPEN);
        navSection.style.height = "";
      }
    });

    if (navFooter) {
      try {
        for (var _c = (0, _tslib.__values)(navFooter.querySelectorAll(QUERY_NAV_COLUMN_ACTIVE)), _d = _c.next(); !_d.done; _d = _c.next()) {
          var active = _d.value;
          Dom.removeClass(active, CLASS_ACTIVE);
        }
      } catch (e_5_1) {
        e_5 = {
          error: e_5_1
        };
      } finally {
        try {
          if (_d && !_d.done && (_b = _c["return"])) _b.call(_c);
        } finally {
          if (e_5) throw e_5.error;
        }
      }

      this.animation.add({
        targets: navFooter,
        duration: ANIMATION_FOOTER_DURATION,
        easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
        height: 0,
        offset: 0,
        complete: function complete() {
          Dom.removeClass(navFooter, CLASS_OPEN);
          navFooter.style.height = "";
        }
      });
    }
  };

  Navigation.prototype._handleSearchClick = function () {
    if (this._searchDesktop) {
      this._searchDesktop.open();
    }
  };
  /**
   * Initializes the navigation component.
   * @private
   */


  Navigation.prototype._initialize = function () {
    var e_6, _a, e_7, _b, e_8, _c;

    try {
      for (var _d = (0, _tslib.__values)(this._navLevel0.querySelectorAll(QUERY_NAV_LEVEL0_LINK)), _e = _d.next(); !_e.done; _e = _d.next()) {
        var navLink = _e.value;
        navLink.addEventListener("click", this._level0ClickHandler);
      }
    } catch (e_6_1) {
      e_6 = {
        error: e_6_1
      };
    } finally {
      try {
        if (_e && !_e.done && (_a = _d["return"])) _a.call(_d);
      } finally {
        if (e_6) throw e_6.error;
      }
    }

    try {
      for (var _f = (0, _tslib.__values)(this._navLevel1.querySelectorAll(QUERY_NAV_LEVEL1_LINK)), _g = _f.next(); !_g.done; _g = _f.next()) {
        var navLink = _g.value;
        navLink.addEventListener("click", this._level1ClickHandler);
      }
    } catch (e_7_1) {
      e_7 = {
        error: e_7_1
      };
    } finally {
      try {
        if (_g && !_g.done && (_b = _f["return"])) _b.call(_f);
      } finally {
        if (e_7) throw e_7.error;
      }
    }

    this._hamburgerElement.addEventListener("click", this._level1ClickHandler); // Desktop search icon


    var searchIcon = this.element.querySelector(QUERY_SEARCH_ICON);

    if (searchIcon) {
      searchIcon.addEventListener("click", this._searchClickHandler);
    }

    try {
      for (var _h = (0, _tslib.__values)(this.element.querySelectorAll(QUERY_SEARCH_FIELD)), _j = _h.next(); !_j.done; _j = _h.next()) {
        var search = _j.value;
        var searchComponent = new _SearchInput["default"](search);

        if (Dom.hasClass(search, CLASS_SEARCH_DESKTOP) || Dom.hasClass(search.parentElement, CLASS_SEARCH_DESKTOP)) {
          this._searchDesktop = searchComponent;
        }

        this._searchComponents.push(searchComponent);
      }
    } catch (e_8_1) {
      e_8 = {
        error: e_8_1
      };
    } finally {
      try {
        if (_j && !_j.done && (_c = _h["return"])) _c.call(_h);
      } finally {
        if (e_8) throw e_8.error;
      }
    }
  };
  /**
   * Closes the navigation.
   */


  Navigation.prototype.close = function () {
    var isMoble = this._isMobile();

    var level1 = this._navLevel1.querySelector(QUERY_NAV_LINK_ACTIVE);

    var level0 = this._navLevel0.querySelector(QUERY_NAV_LINK_ACTIVE);

    if (!level1 && isMoble && Dom.hasClass(this._hamburgerElement, CLASS_ACTIVE)) {
      level1 = this._hamburgerElement;
    }

    var navItems;

    if (level1) {
      navItems = new NavigationItems(this).fromLevel1(level1);
    } else if (level0) {
      navItems = new NavigationItems(this).fromLevel0(level0);
    }

    if (navItems) {
      this._resetMainTimeline(navItems.container, navItems.section, navItems.footer);

      Dom.removeClass(navItems.link, CLASS_ACTIVE);

      this._onNavigationClosed();

      this._closeSection(navItems.container, navItems.section, navItems.footer, !isMoble, false);
    }
  };

  return Navigation;
}(_DomElement["default"]);

var NavigationItems =
/** @class */
function () {
  function NavigationItems(nav) {
    this._navigation = nav;
  }

  Object.defineProperty(NavigationItems.prototype, "link", {
    get: function get() {
      return this._link;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(NavigationItems.prototype, "container", {
    get: function get() {
      return this._container;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(NavigationItems.prototype, "section", {
    get: function get() {
      return this._section;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(NavigationItems.prototype, "footer", {
    get: function get() {
      return this._footer;
    },
    enumerable: false,
    configurable: true
  });

  NavigationItems.prototype.fromLevel0 = function (navLink) {
    while (!Dom.hasClass(navLink, CLASS_NAV_LINK) && navLink.parentElement) {
      navLink = navLink.parentElement;
    }

    this._link = navLink;
    var toggleId = navLink.getAttribute("data-toggle");
    this._container = this._navigation._navLevel0Body;
    this._section = this._navigation._navLevel0.querySelector("#" + toggleId);
    return this;
  };

  NavigationItems.prototype.fromLevel1 = function (navLink) {
    while (navLink.parentElement) {
      if (navLink === this._navigation._hamburgerElement || Dom.hasClass(navLink, CLASS_NAV_LINK)) {
        break;
      }

      navLink = navLink.parentElement;
    }

    this._link = navLink;
    this._container = navLink.parentElement;
    this._section = this._container.querySelector(QUERY_NAV_BODY);
    this._footer = this._container.querySelector(QUERY_NAV_FOOTER);

    if (navLink === this._navigation._hamburgerElement) {
      this._container = this._navigation._navLevel1;
      this._section = this._container.querySelector(QUERY_NAV_HB_BODY);
    }

    return this;
  };

  NavigationItems.prototype.previousLevel1 = function () {
    var prev = new NavigationItems(this._navigation);
    prev._link = this._navigation._navLevel1.querySelector(QUERY_NAV_LINK_ACTIVE);
    prev._container = prev._link ? prev._link.parentElement : undefined;
    prev._section = prev._container ? prev._container.querySelector(QUERY_NAV_BODY) : undefined;
    prev._footer = prev._container ? prev._container.querySelector(QUERY_NAV_FOOTER) : undefined;
    return prev;
  };

  NavigationItems.prototype.isHamburger = function () {
    return this._link === this._navigation._hamburgerElement;
  };

  return NavigationItems;
}();

function init() {
  (0, _Utils.searchAndInitialize)(".nav", function (e) {
    new Navigation(e);
  });
}

var _default = Navigation;
exports["default"] = _default;

},{"../DomElement":4,"../DomFunctions":5,"../Utils":7,"../search/SearchInput":30,"@babel/runtime/helpers/interopRequireDefault":33,"@babel/runtime/helpers/interopRequireWildcard":34,"animejs":36,"tslib":43}],25:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports["default"] = void 0;

var _tslib = require("tslib");

var _Utils = require("../Utils");

var _animejs = _interopRequireDefault(require("animejs"));

var _DomFunctions = require("../DomFunctions");

var _DomElement = _interopRequireDefault(require("../DomElement"));

var CLASS_OPEN = "is-open";
var CLASS_ACTIVE = "is-active";
var QUERY_SITE_WRAPPER = ".js-site-wrapper";
var QUERY_NAV_HAMBURGER = ".js-site-wrapper .js-hamburger";
var QUERY_NAV_ITEM = ".js-nav-item";
var NAV_LINK_INITIAL_SCALE = 0.9;
var ANIMATION_DURATION_LINKS = 100;
var ANIMATION_DURATION_NAV = 300;
var ANIMATION_STAGGER_DELAY = 50;
/**
 * The navigation side component definition.
 */

var NavigationSide =
/** @class */
function (_super) {
  (0, _tslib.__extends)(NavigationSide, _super);

  function NavigationSide(element) {
    var _this = _super.call(this, element) || this;

    _this._clickHandler = _this._handleClick.bind(_this);
    _this._windowClickHandler = _this._handleWindowClick.bind(_this);
    _this._siteWrapper = document.querySelector(QUERY_SITE_WRAPPER);
    _this._hamburgerElement = document.querySelector(QUERY_NAV_HAMBURGER) || document.createElement("div");
    _this._navItems = _this.element.querySelectorAll(QUERY_NAV_ITEM);

    _this._initialize();

    return _this;
  }

  NavigationSide.prototype._initialize = function () {
    this._hamburgerElement.addEventListener("click", this._clickHandler);

    this._hamburgerElement.addEventListener("touchend", this._clickHandler);
  };

  NavigationSide.prototype._handleClick = function (event) {
    (0, _Utils.preventDefault)(event);
    this.toggle();
  };

  NavigationSide.prototype._handleWindowClick = function (event) {
    var target = event.target;

    while (target !== this.element && target.parentElement) {
      target = target.parentElement;
    }

    if (target !== this.element) {
      this.close();
      return false;
    }

    return true;
  };
  /**
   * Toggles the side navigation.
   */


  NavigationSide.prototype.toggle = function () {
    if ((0, _DomFunctions.hasClass)(this.element, CLASS_OPEN) === false) {
      this.open();
    } else {
      this.close();
    }
  };
  /**
   * Opens the slide navigation.
   */


  NavigationSide.prototype.open = function () {
    var _this = this;

    setTimeout(function () {
      window.addEventListener("click", _this._windowClickHandler);
      window.addEventListener("touchend", _this._windowClickHandler);
    }, 50);
    (0, _DomFunctions.addClass)(this._hamburgerElement, CLASS_ACTIVE);
    (0, _DomFunctions.addClass)(this.element, CLASS_OPEN);
    (0, _DomFunctions.addClass)(this._siteWrapper, CLASS_OPEN);

    var x = _animejs["default"].timeline();

    var off = ANIMATION_DURATION_NAV;

    this._navItems.forEach(function (element) {
      var el = element;
      el.style.opacity = "0";
      el.style.transform = "scale(" + NAV_LINK_INITIAL_SCALE + ")";
      x.add({
        targets: el,
        duration: ANIMATION_DURATION_LINKS,
        opacity: 1,
        scale: 1,
        easing: "linear",
        offset: off
      });
      off += ANIMATION_STAGGER_DELAY;
    });
  };
  /**
   * Closes the side navigation.
   */


  NavigationSide.prototype.close = function () {
    window.removeEventListener("click", this._windowClickHandler);
    window.removeEventListener("touchend", this._windowClickHandler);
    (0, _DomFunctions.removeClass)(this._hamburgerElement, CLASS_ACTIVE);
    (0, _DomFunctions.removeClass)(this.element, CLASS_OPEN);
    (0, _DomFunctions.removeClass)(this._siteWrapper, CLASS_OPEN);
  };
  /**
   * Destroys the component and removes all event
   * subscriptions and references.
   */


  NavigationSide.prototype.destroy = function () {
    window.removeEventListener("click", this._windowClickHandler);
    window.removeEventListener("touchend", this._windowClickHandler);
    this._windowClickHandler = null;
    this._clickHandler = null;
    this._siteWrapper = null;
    this._hamburgerElement = null;
    this._navItems = null;
  };

  return NavigationSide;
}(_DomElement["default"]);

function init() {
  (0, _Utils.searchAndInitialize)(".nav-side", function (e) {
    new NavigationSide(e);
  });
}

var _default = NavigationSide;
exports["default"] = _default;

},{"../DomElement":4,"../DomFunctions":5,"../Utils":7,"@babel/runtime/helpers/interopRequireDefault":33,"animejs":36,"tslib":43}],26:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showOnHeader = showOnHeader;
exports.NotificationHeader = void 0;

var _tslib = require("tslib");

var _Utils = require("../Utils");

var _DomElement = _interopRequireDefault(require("../DomElement"));

var CLASS_NOTIFICATION = "notification-header";
var CLASS_OPEN = "notification--open";
var CLASS_BUTTON_CLOSE = "notification__close";
/**
 * Creates and shows a notification with the specified message.
 * @memberof Notification
 * @param {String} containerId - The id of the container on where to show the notification.
 * @param {String} message - The message to show.
 * @param {Notification~Click} messageClickCallback - The callback that gets called when the user clicks on the notification message text.
 * @param {Notification~Cancel} cancelCallback - The callback that gets called when the user cancels the notification by closing it.
 * @param {String} modifierClass - The css modifier class for the notification; this is an optional parameter
 * @returns {NotificationHeader} The notification header item instance.
 */

function showOnHeader(containerId, message, messageClickCallback, cancelCallback, modifierClass) {
  var containerE = document.querySelector("#" + containerId);

  if (!containerE) {
    throw new Error("Could not find the container with id " + containerId);
  }

  var containerElement = new _DomElement["default"](containerE);
  var notificationElement = new NotificationHeader();

  if (modifierClass) {
    notificationElement.addClass(modifierClass);
  }

  notificationElement.message = message;
  notificationElement.messageClickCallback = messageClickCallback;
  notificationElement.cancelCallback = cancelCallback;
  containerElement.appendChild(notificationElement);

  notificationElement._open();

  return notificationElement;
}
/**
 * A component for displaying notifications on the page-header.
 * @inner
 * @memberof Notification
 */


var NotificationHeader =
/** @class */
function (_super) {
  (0, _tslib.__extends)(NotificationHeader, _super);

  function NotificationHeader() {
    var _this = _super.call(this, "div") || this;

    _this._closeHandler = _this._handleClose.bind(_this);
    _this._clickHandler = _this._handleClick.bind(_this);

    _this._initialize();

    return _this;
  }
  /**
   * Initializes the range modal component.
   * @private
   */


  NotificationHeader.prototype._initialize = function () {
    this.addClass(CLASS_NOTIFICATION);
    this.addClass(CLASS_OPEN);
    var notificationContent = new _DomElement["default"]("div").addClass("notification__content");
    this.appendChild(notificationContent);
    this._notificationBody = new _DomElement["default"]("div").addClass("notification__body");
    notificationContent.appendChild(this._notificationBody);
    this._closeButton = new _DomElement["default"]("button").addClass(CLASS_BUTTON_CLOSE).addClass("notification-cancel").setAttribute("aria-label", "Close");
    var closeIcon = new _DomElement["default"]("i").addClass("icon").addClass("icon-022-close").setAttribute("aria-hidden", "true");

    this._closeButton.appendChild(closeIcon);

    notificationContent.appendChild(this._closeButton);
    this.element.addEventListener("click", this._clickHandler);
  };

  NotificationHeader.prototype._handleClick = function (event) {
    (0, _Utils.preventDefault)(event);
    var closeNotification = true;

    if (this._callback) {
      if (this._callback(this) === false) {
        closeNotification = false;
      }
    }

    if (closeNotification === true) {
      this.close();
    }
  };

  NotificationHeader.prototype._handleClose = function (event) {
    (0, _Utils.preventDefault)(event);
    event.stopPropagation();

    if (this._cancelCallback) {
      this._cancelCallback(this);
    }

    this.close();
  };

  NotificationHeader.prototype._close = function () {
    this.removeClass(CLASS_OPEN);

    this._closeButton.element.removeEventListener("click", this._closeHandler);

    var el = this.element;
    setTimeout(function () {
      // remove the element from the dom
      if (el && el.parentElement) {
        el.parentElement.removeChild(el);
      }
    }, 300);
  }; // called by showOnHeader


  NotificationHeader.prototype._open = function () {
    this.addClass(CLASS_OPEN);

    this._closeButton.element.addEventListener("click", this._closeHandler);

    this.dispatchEvent("opened");
  };

  Object.defineProperty(NotificationHeader.prototype, "messageClickCallback", {
    set: function set(callback) {
      this._callback = callback;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(NotificationHeader.prototype, "cancelCallback", {
    /**
     * Sets the cancel callback function.
     * @param {function} - The callback function to call.
     */
    set: function set(callback) {
      this._cancelCallback = callback;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(NotificationHeader.prototype, "message", {
    /**
     * Sets the notification message.
     * @param {String} - The message to set.
     */
    set: function set(value) {
      this._notificationBody.setHtml(value);
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Closes the notification.
   */

  NotificationHeader.prototype.close = function () {
    this._close();

    this.dispatchEvent("closed");
  };

  return NotificationHeader;
}(_DomElement["default"]);

exports.NotificationHeader = NotificationHeader;

},{"../DomElement":4,"../Utils":7,"@babel/runtime/helpers/interopRequireDefault":33,"tslib":43}],27:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports["default"] = void 0;

var _tslib = require("tslib");

var _animejs = _interopRequireDefault(require("animejs"));

var _Utils = require("../Utils");

var Inputs = _interopRequireWildcard(require("../Inputs"));

var _DomElement = _interopRequireDefault(require("../DomElement"));

var CLASS_HEADER = ".progress-full__bar";
var CLASS_SECTIONS = ".progress-full__sections > span";
var CLASS_SECTION_ACTIVE = "section--active";
var CLASS_INDICATOR = "indicator";
var CLASS_INDICATOR_CURRENT = "indicator--current";
var CLASS_INDICATOR_COMPLETED = "indicator--completed";
/**
 * Full progress bar component
 */

var ProgressFull =
/** @class */
function (_super) {
  (0, _tslib.__extends)(ProgressFull, _super);
  /**
   * Creates and initializes the ProgressFull component.
   * @param {DomElement} - The root element of the ProgressFull component.
   */

  function ProgressFull(element) {
    var _this = _super.call(this, element) || this;

    _this._initialize();

    return _this;
  }
  /**
   * Initializes the loader bar component.
   * @private
   */


  ProgressFull.prototype._initialize = function () {
    this._buttonClickHandler = this._handleButtonClick.bind(this);
    this._keydownHandler = this._handleKeydown.bind(this);
    this._headerElement = this.find(CLASS_HEADER);
    this._pages = this.element.querySelectorAll(CLASS_SECTIONS);
    this._minValue = 1;
    this._value = 1;
    this._total = this._pages.length;

    for (var index = 0; index < this._pages.length; index++) {
      if (this._pages[index].classList.contains(CLASS_SECTION_ACTIVE)) {
        this._value = index + 1;
      }
    }

    this._addIncicators();

    this._update(-1, this._value, false); // Apply the tab index


    var tabIndex = this.getAttribute("tabindex");

    if (tabIndex) {
      this.setAttribute("tabindex", "");

      this._headerElement.setAttribute("tabindex", tabIndex);
    }

    this._headerElement.element.addEventListener("click", this._buttonClickHandler);

    this._headerElement.element.addEventListener("keydown", this._keydownHandler);
  };

  ProgressFull.prototype._addIncicators = function () {
    for (var i = this._pages.length - 1; i >= 0; i--) {
      var indicatorElement = new _DomElement["default"]("button").addClass(CLASS_INDICATOR).setAttribute("data-value", "" + (i + 1)).setHtml((i + 1).toString());

      this._headerElement.prependChild(indicatorElement);
    }
  };

  ProgressFull.prototype._update = function (oldValue, newValue, animate) {
    if (animate === void 0) {
      animate = true;
    }

    var indicators = this._headerElement.element.childNodes;

    for (var index = 0; index < indicators.length; index++) {
      var indicatorElement = new _DomElement["default"](indicators[index]);

      if (index + 1 < this._value) {
        indicatorElement.removeClass(CLASS_INDICATOR_CURRENT).addClass(CLASS_INDICATOR_COMPLETED);
      }

      if (index + 1 === this._value) {
        indicatorElement.removeClass(CLASS_INDICATOR_COMPLETED).addClass(CLASS_INDICATOR_CURRENT);
      }

      if (index + 1 > this._value) {
        indicatorElement.removeClass(CLASS_INDICATOR_COMPLETED).removeClass(CLASS_INDICATOR_CURRENT);
      }
    }

    if (oldValue !== newValue) {
      var direction = Math.sign(oldValue - newValue);

      if (oldValue > 0 && oldValue !== newValue) {
        var oldSection_1 = new _DomElement["default"](this._pages[oldValue - 1]);

        if (animate) {
          (0, _animejs["default"])({
            targets: oldSection_1.element,
            duration: 300,
            left: 100 * direction,
            opacity: 0,
            easing: "easeInOutQuint",
            complete: function complete() {
              oldSection_1.removeClass(CLASS_SECTION_ACTIVE);
              oldSection_1.setAttribute("style", "");
            }
          });
        } else {
          oldSection_1.removeClass(CLASS_SECTION_ACTIVE);
          oldSection_1.setAttribute("style", "");
        }
      }

      var newSection_1 = new _DomElement["default"](this._pages[newValue - 1]);

      if (animate) {
        var el = newSection_1.element;
        el.style.left = -100 * direction + "px";
        el.style.opacity = "0";
        newSection_1.addClass(CLASS_SECTION_ACTIVE);
        (0, _animejs["default"])({
          targets: newSection_1.element,
          duration: 300,
          left: 0,
          opacity: 1,
          easing: "easeInOutQuint",
          complete: function complete() {
            newSection_1.setAttribute("style", "");
          }
        });
      } else {
        newSection_1.addClass(CLASS_SECTION_ACTIVE);
        newSection_1.setAttribute("style", "");
      }
    }
  };

  ProgressFull.prototype._handleButtonClick = function (event) {
    var element = new _DomElement["default"](event.target);

    if (!element.hasClass(CLASS_INDICATOR)) {
      return;
    }

    var value = element.getAttribute("data-value");
    this.value = parseFloat(value);
  };

  ProgressFull.prototype._handleKeydown = function (event) {
    var keyboardEvent = event;
    var keycode = keyboardEvent.which || keyboardEvent.keyCode;

    if (keycode === Inputs.KEY_ARROW_RIGHT) {
      this.value++;
      (0, _Utils.preventDefault)(keyboardEvent);
      return;
    }

    if (keycode === Inputs.KEY_ARROW_LEFT) {
      this.value--;
      (0, _Utils.preventDefault)(keyboardEvent);
      return;
    }

    if (keycode >= Inputs.KEY_NR_0 && keycode <= Inputs.KEY_NR_9) {
      this.value = keycode - Inputs.KEY_NR_0;
      (0, _Utils.preventDefault)(keyboardEvent);
      return;
    }
  };

  Object.defineProperty(ProgressFull.prototype, "value", {
    /**
     * Gets the current progress value in the range of 1..total.
     */
    get: function get() {
      return this._value;
    },

    /**
     * Sets the current progress.
     * @param {number} - The progress in the range of 1..total.
     */
    set: function set(val) {
      var oldValue = this._value;
      this._value = (0, _Utils.clamp)(val, this._minValue, this._total);

      this._update(oldValue, this._value, true);

      this.dispatchEvent("changed");
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(ProgressFull.prototype, "total", {
    /**
     * Gets the total progress value.
     */
    get: function get() {
      return this._total;
    },
    enumerable: false,
    configurable: true
  });
  return ProgressFull;
}(_DomElement["default"]);

function init() {
  (0, _Utils.searchAndInitialize)(".progress-full", function (e) {
    new ProgressFull(e);
  });
}

var _default = ProgressFull;
exports["default"] = _default;

},{"../DomElement":4,"../Inputs":6,"../Utils":7,"@babel/runtime/helpers/interopRequireDefault":33,"@babel/runtime/helpers/interopRequireWildcard":34,"animejs":36,"tslib":43}],28:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports["default"] = void 0;

var _tslib = require("tslib");

var _animejs = _interopRequireDefault(require("animejs"));

var _Utils = require("../Utils");

var _DomElement = _interopRequireDefault(require("../DomElement"));

var CLASS_BAR = ".progress-light__bar";
var CLASS_PROGRESS = ".bar__progress";
var CLASS_PROGRESS_COMPLETED = "bar__progress--complete";
var CLASS_TICK = "bar__tick";
var CLASS_PAGE_CURRENT = ".detail__currentpage";
var CLASS_PAGE_TOTAL = ".detail__totalpage";
var CLASS_DISABLED = "arrow--disabled";
var CLASS_BUTTON_LEFT = ".arrow--left";
var CLASS_BUTTON_RIGHT = ".arrow--right";
/**
 * Light progress bar component
 */

var ProgressLight =
/** @class */
function (_super) {
  (0, _tslib.__extends)(ProgressLight, _super);
  /**
   * Creates and initializes the ProgressLight component.
   * @param {DomElement} - The root element of the ProgressLight component.
   */

  function ProgressLight(element) {
    var _this = _super.call(this, element) || this;

    _this._initialize();

    return _this;
  }
  /**
   * Initializes the loader bar component.
   * @private
   */


  ProgressLight.prototype._initialize = function () {
    this._buttonClickHandler = this._handleButtonClick.bind(this);
    this._animationCompletedHandler = this._handleAnimationCompleted.bind(this);
    this._barElement = this.find(CLASS_BAR);
    this._progressElement = this.find(CLASS_PROGRESS);
    this._pageCurrentElement = this.find(CLASS_PAGE_CURRENT);
    this._pageTotalElement = this.find(CLASS_PAGE_TOTAL);
    this._buttonLeft = this.find(CLASS_BUTTON_LEFT);
    this._buttonRight = this.find(CLASS_BUTTON_RIGHT);
    this._minValue = 1;
    this._total = Math.max(parseInt(this.getAttribute("total") || "100", 10), this._minValue);
    this._value = (0, _Utils.clamp)(parseInt(this.getAttribute("value") || "1", 10), this._minValue, this._total);

    this._layout();

    this._addTicks();

    this._update(false);

    this.enable();
  };

  ProgressLight.prototype._addTicks = function () {
    for (var i = 1; i < this._total; i++) {
      var position = this._itemWidth * i;
      var tickElement = new _DomElement["default"]("div").addClass(CLASS_TICK).setAttribute("style", "left: " + position + "%");

      this._barElement.prependChild(tickElement);
    }
  };

  ProgressLight.prototype._update = function (animate) {
    var _this = this;

    if (animate === void 0) {
      animate = true;
    }

    this._pageCurrentElement.setHtml(this._value.toString());

    this._pageTotalElement.setHtml(this._total.toString());

    var position = this._value * this._itemWidth; // Add additional width to the last element to make sure
    // the rounded border on the left is filled as well

    if (this._value === this._total) {
      position += 5;
    }

    if (this._value >= this._total) {
      this._buttonRight.addClass(CLASS_DISABLED);
    } else {
      this._buttonRight.removeClass(CLASS_DISABLED);
    }

    if (this._value <= this._minValue) {
      this._buttonLeft.addClass(CLASS_DISABLED);
    } else {
      this._buttonLeft.removeClass(CLASS_DISABLED);
    }

    var el = this._progressElement.element;

    if (animate) {
      (0, _animejs["default"])({
        targets: this._progressElement.element,
        duration: 200,
        easing: "easeInOutQuint",
        width: this._barElement.element.clientWidth * position / 100,
        complete: function complete() {
          el.style.width = position + "%";

          _this._animationCompletedHandler({});
        }
      });
    } else {
      el.style.width = position + "%";

      this._animationCompletedHandler({});
    }
  };

  ProgressLight.prototype._layout = function () {
    this._itemWidth = Math.floor(100 / this._total);
  };

  ProgressLight.prototype._handleButtonClick = function (event) {
    if (event.target === this._buttonLeft.element) {
      this.value = this._value - 1;
    } else if (event.target === this._buttonRight.element) {
      this.value = this._value + 1;
    }
  };

  ProgressLight.prototype._handleAnimationCompleted = function () {
    if (this._value === this._total) {
      this._progressElement.addClass(CLASS_PROGRESS_COMPLETED);
    } else {
      this._progressElement.removeClass(CLASS_PROGRESS_COMPLETED);
    }
  };

  Object.defineProperty(ProgressLight.prototype, "value", {
    /**
     * Gets the current progress value in the range of 1..total.
     */
    get: function get() {
      return this._value;
    },

    /**
     * Sets the current progress.
     * @param {number} - The progress in the range of 1..total.
     */
    set: function set(val) {
      this._value = (0, _Utils.clamp)(val, this._minValue, this._total);

      this._update(true);

      this.dispatchEvent("changed");
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(ProgressLight.prototype, "total", {
    /**
     * Gets the total progress value.
     */
    get: function get() {
      return this._total;
    },

    /**
     * Sets the total progress value and updates the UI accordingly.
     * @param {number} - The total progress positive integer value.
     */
    set: function set(value) {
      var e_1, _a;

      if (this._total === value) {
        return;
      }

      this._total = Math.max(value, this._minValue);
      this._value = (0, _Utils.clamp)(this._value, this._minValue, this._total);

      try {
        // Clear the ticks
        for (var _b = (0, _tslib.__values)(this.element.querySelectorAll("." + CLASS_TICK)), _c = _b.next(); !_c.done; _c = _b.next()) {
          var tick = _c.value;

          this._barElement.element.removeChild(tick);
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        } finally {
          if (e_1) throw e_1.error;
        }
      }

      this._layout();

      this._addTicks();

      this._update(false);

      this.dispatchEvent("totalchanged");
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Enables the component.
   */

  ProgressLight.prototype.enable = function () {
    this._buttonLeft.element.addEventListener("click", this._buttonClickHandler);

    this._buttonRight.element.addEventListener("click", this._buttonClickHandler);
  };
  /**
   * Disables the component.
   */


  ProgressLight.prototype.disable = function () {
    this._buttonLeft.element.removeEventListener("click", this._buttonClickHandler);

    this._buttonRight.element.removeEventListener("click", this._buttonClickHandler);
  };

  return ProgressLight;
}(_DomElement["default"]);

function init() {
  (0, _Utils.searchAndInitialize)(".progress-light", function (e) {
    new ProgressLight(e);
  });
}

var _default = ProgressLight;
exports["default"] = _default;

},{"../DomElement":4,"../Utils":7,"@babel/runtime/helpers/interopRequireDefault":33,"animejs":36,"tslib":43}],29:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "LoaderBar", {
  enumerable: true,
  get: function get() {
    return _LoaderBar["default"];
  }
});
Object.defineProperty(exports, "initLoaderBar", {
  enumerable: true,
  get: function get() {
    return _LoaderBar.init;
  }
});
Object.defineProperty(exports, "InputField", {
  enumerable: true,
  get: function get() {
    return _InputField["default"];
  }
});
Object.defineProperty(exports, "initInputField", {
  enumerable: true,
  get: function get() {
    return _InputField.init;
  }
});
Object.defineProperty(exports, "Textarea", {
  enumerable: true,
  get: function get() {
    return _Textarea["default"];
  }
});
Object.defineProperty(exports, "initTextarea", {
  enumerable: true,
  get: function get() {
    return _Textarea.init;
  }
});
Object.defineProperty(exports, "Select", {
  enumerable: true,
  get: function get() {
    return _Select["default"];
  }
});
Object.defineProperty(exports, "initSelect", {
  enumerable: true,
  get: function get() {
    return _Select.init;
  }
});
Object.defineProperty(exports, "Range", {
  enumerable: true,
  get: function get() {
    return _Range["default"];
  }
});
Object.defineProperty(exports, "initRange", {
  enumerable: true,
  get: function get() {
    return _Range.init;
  }
});
Object.defineProperty(exports, "Autocomplete", {
  enumerable: true,
  get: function get() {
    return _Autocomplete["default"];
  }
});
Object.defineProperty(exports, "initAutocomplete", {
  enumerable: true,
  get: function get() {
    return _Autocomplete.init;
  }
});
Object.defineProperty(exports, "ProgressLight", {
  enumerable: true,
  get: function get() {
    return _ProgressLight["default"];
  }
});
Object.defineProperty(exports, "initProgressLight", {
  enumerable: true,
  get: function get() {
    return _ProgressLight.init;
  }
});
Object.defineProperty(exports, "ProgressFull", {
  enumerable: true,
  get: function get() {
    return _ProgressFull["default"];
  }
});
Object.defineProperty(exports, "initProgressFull", {
  enumerable: true,
  get: function get() {
    return _ProgressFull.init;
  }
});
Object.defineProperty(exports, "Modal", {
  enumerable: true,
  get: function get() {
    return _Modal["default"];
  }
});
Object.defineProperty(exports, "initModal", {
  enumerable: true,
  get: function get() {
    return _Modal.init;
  }
});
Object.defineProperty(exports, "Toolbar", {
  enumerable: true,
  get: function get() {
    return _Toolbar["default"];
  }
});
Object.defineProperty(exports, "Collapse", {
  enumerable: true,
  get: function get() {
    return _Collapse["default"];
  }
});
Object.defineProperty(exports, "initCollapse", {
  enumerable: true,
  get: function get() {
    return _Collapse.init;
  }
});
Object.defineProperty(exports, "Accordion", {
  enumerable: true,
  get: function get() {
    return _Accordion["default"];
  }
});
Object.defineProperty(exports, "initAccordion", {
  enumerable: true,
  get: function get() {
    return _Accordion.init;
  }
});
Object.defineProperty(exports, "MenuFlyout", {
  enumerable: true,
  get: function get() {
    return _MenuFlyout["default"];
  }
});
Object.defineProperty(exports, "initMenuFlyout", {
  enumerable: true,
  get: function get() {
    return _MenuFlyout.init;
  }
});
Object.defineProperty(exports, "Navigation", {
  enumerable: true,
  get: function get() {
    return _Navigation["default"];
  }
});
Object.defineProperty(exports, "initNavigation", {
  enumerable: true,
  get: function get() {
    return _Navigation.init;
  }
});
Object.defineProperty(exports, "NavigationSide", {
  enumerable: true,
  get: function get() {
    return _NavigationSide["default"];
  }
});
Object.defineProperty(exports, "initNavigationSide", {
  enumerable: true,
  get: function get() {
    return _NavigationSide.init;
  }
});
Object.defineProperty(exports, "SearchInput", {
  enumerable: true,
  get: function get() {
    return _SearchInput["default"];
  }
});
Object.defineProperty(exports, "initSearchInput", {
  enumerable: true,
  get: function get() {
    return _SearchInput.init;
  }
});
Object.defineProperty(exports, "EmptyState", {
  enumerable: true,
  get: function get() {
    return _EmptyState["default"];
  }
});
Object.defineProperty(exports, "initEmptyState", {
  enumerable: true,
  get: function get() {
    return _EmptyState.init;
  }
});
Object.defineProperty(exports, "Carousel", {
  enumerable: true,
  get: function get() {
    return _Carousel["default"];
  }
});
Object.defineProperty(exports, "initCarousel", {
  enumerable: true,
  get: function get() {
    return _Carousel.init;
  }
});
Object.defineProperty(exports, "Table", {
  enumerable: true,
  get: function get() {
    return _Table["default"];
  }
});
Object.defineProperty(exports, "initTable", {
  enumerable: true,
  get: function get() {
    return _Table.init;
  }
});
Object.defineProperty(exports, "PieChart", {
  enumerable: true,
  get: function get() {
    return _PieChart["default"];
  }
});
Object.defineProperty(exports, "initPieChart", {
  enumerable: true,
  get: function get() {
    return _PieChart.init;
  }
});
Object.defineProperty(exports, "BarChartHorizontal", {
  enumerable: true,
  get: function get() {
    return _BarChartHorizontal["default"];
  }
});
Object.defineProperty(exports, "initBarChartHorizontal", {
  enumerable: true,
  get: function get() {
    return _BarChartHorizontal.init;
  }
});
Object.defineProperty(exports, "BarChartVertical", {
  enumerable: true,
  get: function get() {
    return _BarChartVertical["default"];
  }
});
Object.defineProperty(exports, "initBarChartVertical", {
  enumerable: true,
  get: function get() {
    return _BarChartVertical.init;
  }
});
exports.Notification = exports.utils = void 0;

var utils = _interopRequireWildcard(require("./Utils"));

exports.utils = utils;

var _LoaderBar = _interopRequireWildcard(require("./loader/LoaderBar"));

var _InputField = _interopRequireWildcard(require("./form/InputField"));

var _Textarea = _interopRequireWildcard(require("./form/Textarea"));

var _Select = _interopRequireWildcard(require("./form/Select"));

var _Range = _interopRequireWildcard(require("./form/Range"));

var _Autocomplete = _interopRequireWildcard(require("./form/Autocomplete"));

var _ProgressLight = _interopRequireWildcard(require("./progress/ProgressLight"));

var _ProgressFull = _interopRequireWildcard(require("./progress/ProgressFull"));

var _Modal = _interopRequireWildcard(require("./modal/Modal"));

var _Toolbar = _interopRequireDefault(require("./toolbar/Toolbar"));

var Notification = _interopRequireWildcard(require("./notification/Notification"));

exports.Notification = Notification;

var _Collapse = _interopRequireWildcard(require("./collapse/Collapse"));

var _Accordion = _interopRequireWildcard(require("./accordion/Accordion"));

var _MenuFlyout = _interopRequireWildcard(require("./menu/MenuFlyout"));

var _Navigation = _interopRequireWildcard(require("./navigation/Navigation"));

var _NavigationSide = _interopRequireWildcard(require("./navigation/NavigationSide"));

var _SearchInput = _interopRequireWildcard(require("./search/SearchInput"));

var _EmptyState = _interopRequireWildcard(require("./empty-states/EmptyState"));

var _Carousel = _interopRequireWildcard(require("./carousel/Carousel"));

var _Table = _interopRequireWildcard(require("./table/Table"));

var _PieChart = _interopRequireWildcard(require("./charts/PieChart"));

var _BarChartHorizontal = _interopRequireWildcard(require("./charts/BarChartHorizontal"));

var _BarChartVertical = _interopRequireWildcard(require("./charts/BarChartVertical"));

},{"./Utils":7,"./accordion/Accordion":8,"./carousel/Carousel":9,"./charts/BarChartHorizontal":10,"./charts/BarChartVertical":11,"./charts/PieChart":13,"./collapse/Collapse":14,"./empty-states/EmptyState":15,"./form/Autocomplete":16,"./form/InputField":17,"./form/Range":18,"./form/Select":19,"./form/Textarea":20,"./loader/LoaderBar":21,"./menu/MenuFlyout":22,"./modal/Modal":23,"./navigation/Navigation":24,"./navigation/NavigationSide":25,"./notification/Notification":26,"./progress/ProgressFull":27,"./progress/ProgressLight":28,"./search/SearchInput":30,"./table/Table":31,"./toolbar/Toolbar":32,"@babel/runtime/helpers/interopRequireDefault":33,"@babel/runtime/helpers/interopRequireWildcard":34}],30:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports["default"] = void 0;

var _tslib = require("tslib");

var _animejs = _interopRequireDefault(require("animejs"));

var _DomElement = _interopRequireDefault(require("../DomElement"));

var Inputs = _interopRequireWildcard(require("../Inputs"));

var _Utils = require("../Utils");

var _DomFunctions = require("../DomFunctions");

var QUERY_SEARCH_INPUT = "input.search__field";
var QUERY_BTN_CLOSE = ".search__icon-close";
var QUERY_LIVE_SUGESTIONS = ".js-suggestions";
var QUERY_LIVE_FOOTER = ".js-footer";
var CLASS_ACTIVE = "is-active";
var CLASS_OPEN = "is-open";
var CLASS_SEARCH = "search";
var ANIMATION_SUGGESTIONS_DURATION = 300;
var ANIMATION_FOOTER_DURATION = 100;
var ANIMATION_FOOTER_DELAY = ANIMATION_SUGGESTIONS_DURATION - ANIMATION_FOOTER_DURATION;
/**
 * The search input component definition.
 */

var SearchInput =
/** @class */
function (_super) {
  (0, _tslib.__extends)(SearchInput, _super);

  function SearchInput(element) {
    var _this = _super.call(this, element) || this;

    _this._isOpen = false;
    _this._input = _this.element.querySelector(QUERY_SEARCH_INPUT);
    _this._form = _this.element.querySelector("form");
    _this._btnClose = _this.element.querySelector(QUERY_BTN_CLOSE);
    var liveSearch = (0, _DomFunctions.getAttributeReference)(_this.element, "data-live");

    if (liveSearch) {
      _this._liveSuggestions = liveSearch.querySelector(QUERY_LIVE_SUGESTIONS) || undefined;
      _this._liveFooter = liveSearch.querySelector(QUERY_LIVE_FOOTER) || undefined;

      if (_this._liveSuggestions) {
        _this._liveContainer = _this._liveSuggestions.parentNode || undefined;
      }
    }

    _this._focusHandler = _this._handleInputFocus.bind(_this);
    _this._blurHandler = _this._handleInputBlur.bind(_this);
    _this._closeHandler = _this.close.bind(_this);
    _this._windowClickHandler = _this._handleWindowClick.bind(_this);
    _this._keydownHandler = _this._handleKeydown.bind(_this);
    _this._resizeHandler = _this._handleResize.bind(_this);

    _this._initialize();

    return _this;
  }

  SearchInput.prototype._initialize = function () {
    this._input.addEventListener("focus", this._focusHandler);

    this._input.addEventListener("blur", this._blurHandler);

    if ((0, _Utils.internetExplorerOrEdgeVersion)() > 0) {
      // This is a workaround for IE browsers where a focused
      // input's cursor bleeds trough even if hidden
      window.addEventListener("resize", this._resizeHandler);
      window.addEventListener("orientationchange", this._resizeHandler);
    }

    if (this._btnClose) {
      this._btnClose.addEventListener("click", this._closeHandler);
    }
  };

  SearchInput.prototype._handleInputFocus = function () {
    this.addClass(CLASS_ACTIVE);
  };

  SearchInput.prototype._handleInputBlur = function () {
    this.removeClass(CLASS_ACTIVE);
  };

  SearchInput.prototype._handleWindowClick = function (event) {
    var target = event.target;

    if (!(0, _DomFunctions.parentWithClass)(target, CLASS_SEARCH)) {
      this.close();
      return false;
    }

    return true;
  };

  SearchInput.prototype._handleKeydown = function (event) {
    var keycode = event.which || event.keyCode;

    if (keycode === Inputs.KEY_ESCAPE) {
      this.close();
      (0, _Utils.preventDefault)(event);
    }
  };

  SearchInput.prototype._handleResize = function () {
    var style = window.getComputedStyle(this.element);

    if (style.display === "none") {
      this._input.blur();
    }
  };

  SearchInput.prototype._resetMainTimeline = function () {
    if (this.animation) {
      this.animation.pause();
    }

    _animejs["default"].remove(this._liveSuggestions);

    _animejs["default"].remove(this._liveFooter);

    this.animation = _animejs["default"].timeline();
  };

  Object.defineProperty(SearchInput.prototype, "value", {
    /**
     * Gets the search input text content.
     * @returns {String} The input text.
     */
    get: function get() {
      return this._input.value;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Opens/activates the search input.
   */

  SearchInput.prototype.open = function () {
    var _this = this;

    this.addClass(CLASS_OPEN);

    this._input.focus();

    setTimeout(function () {
      window.addEventListener("click", _this._windowClickHandler);
      window.addEventListener("touchend", _this._windowClickHandler);
      window.addEventListener("keydown", _this._keydownHandler);
    }, 50);
  };
  /**
   * Closes/deactivates the search input.
   */


  SearchInput.prototype.close = function () {
    this._form.reset();

    this.removeClass(CLASS_OPEN);
    this.closeLiveSearch();
    window.removeEventListener("click", this._windowClickHandler);
    window.removeEventListener("touchend", this._windowClickHandler);
    window.removeEventListener("keydown", this._keydownHandler);
  };
  /**
   * Opens the live search suggestions.
   */


  SearchInput.prototype.openLiveSearch = function () {
    var _this = this;

    if (!this._liveSuggestions || this._isOpen) {
      return;
    }

    this._isOpen = true;
    (0, _DomFunctions.addClass)(this._liveContainer, CLASS_OPEN);

    this._resetMainTimeline();

    this._liveSuggestions.style.display = "block";
    this.animation.add({
      targets: this._liveSuggestions,
      duration: ANIMATION_SUGGESTIONS_DURATION,
      height: this._liveSuggestions.scrollHeight + "px",
      easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
      complete: function complete() {
        var domEl = new _DomElement["default"](_this._liveSuggestions);
        domEl.addClass(CLASS_OPEN);
        domEl.setAttribute("style", "");
      }
    });

    if (this._liveFooter) {
      this._liveFooter.style.display = "block";
      this.animation.add({
        targets: this._liveFooter,
        duration: ANIMATION_FOOTER_DURATION,
        height: this._liveFooter.scrollHeight + "px",
        easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
        offset: ANIMATION_FOOTER_DELAY,
        complete: function complete() {
          var domEl = new _DomElement["default"](_this._liveFooter);
          domEl.addClass(CLASS_OPEN);
          domEl.setAttribute("style", "");
        }
      });
    }
  };
  /**
   * Closes the live search suggestions.
   */


  SearchInput.prototype.closeLiveSearch = function () {
    var _this = this;

    if (!this._liveSuggestions || !this.isOpen) {
      return;
    }

    this._isOpen = false;

    this._resetMainTimeline();

    this._liveSuggestions.style.display = "block";
    this.animation.add({
      targets: this._liveSuggestions,
      duration: ANIMATION_SUGGESTIONS_DURATION,
      height: 0,
      easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
      complete: function complete() {
        var domEl = new _DomElement["default"](_this._liveSuggestions);
        domEl.removeClass(CLASS_OPEN);
        domEl.setAttribute("style", "");
        (0, _DomFunctions.removeClass)(_this._liveContainer, CLASS_OPEN);
      }
    });

    if (this._liveFooter) {
      this._liveFooter.style.display = "block";
      this.animation.add({
        targets: this._liveFooter,
        duration: ANIMATION_FOOTER_DURATION,
        height: 0,
        easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
        offset: 0,
        complete: function complete() {
          var domEl = new _DomElement["default"](_this._liveFooter);
          domEl.removeClass(CLASS_OPEN);
          domEl.setAttribute("style", "");
        }
      });
    }
  };
  /**
   * Destroys the component and clears all references.
   */


  SearchInput.prototype.destroy = function () {
    window.removeEventListener("click", this._windowClickHandler);
    window.removeEventListener("touchend", this._windowClickHandler);
    window.removeEventListener("keydown", this._keydownHandler);

    this._input.removeEventListener("focus", this._focusHandler);

    this._input.removeEventListener("blur", this._blurHandler);

    window.removeEventListener("resize", this._resizeHandler);
    window.removeEventListener("orientationchange", this._resizeHandler);

    if (this._btnClose) {
      this._btnClose.removeEventListener("click", this._closeHandler);
    }

    this._input = null;
    this._form = null;
    this._btnClose = null;
    this._focusHandler = null;
    this._blurHandler = null;
    this._closeHandler = null;
    this._windowClickHandler = null;
    this._keydownHandler = null;
    this._liveSuggestions = null;
    this._liveFooter = null;
  };
  /**
   * Determines if the SearchInput is open/visible.
   * @return {Boolean} - True if open; otherwise false.
   */


  SearchInput.prototype.isOpen = function () {
    return this.hasClass(CLASS_OPEN);
  };

  return SearchInput;
}(_DomElement["default"]);

function init() {
  (0, _Utils.searchAndInitialize)(".search.search__input", function (e) {
    new SearchInput(e);
  });
}

var _default = SearchInput;
exports["default"] = _default;

},{"../DomElement":4,"../DomFunctions":5,"../Inputs":6,"../Utils":7,"@babel/runtime/helpers/interopRequireDefault":33,"@babel/runtime/helpers/interopRequireWildcard":34,"animejs":36,"tslib":43}],31:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports["default"] = void 0;

var _tslib = require("tslib");

var _Utils = require("../Utils");

var _DomElement = _interopRequireDefault(require("../DomElement"));

var Dom = _interopRequireWildcard(require("../DomFunctions"));

var QUERY_HEADER = "thead th";
var CLASS_SORTED_ASCENDING = "js-ascending";
var CLASS_SORTED_DESCENDING = "js-descending";
var CLASS_ARROW = "arrow-icon";
/**
 * The Table component. Adds additional capabilities to standard HTML 5 tables.
 */

var Table =
/** @class */
function (_super) {
  (0, _tslib.__extends)(Table, _super);
  /**
   * Creates a new instance of the table component.
   */

  function Table(element) {
    var _this = _super.call(this, element) || this;

    _this._headerClickHandler = _this._handleHeaderClick.bind(_this);
    _this._body = _this.element.querySelector("tbody");
    _this._rows = _this._body.getElementsByTagName("tr");

    _this._initialize();

    return _this;
  }

  Table.prototype._initialize = function () {
    var e_1, _a;

    try {
      for (var _b = (0, _tslib.__values)(this.element.querySelectorAll(QUERY_HEADER)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var header = _c.value;

        if (header.getAttribute("data-type")) {
          header.addEventListener("click", this._headerClickHandler);
          var arrowElement = new _DomElement["default"]("div").addClass(CLASS_ARROW).element;
          header.appendChild(arrowElement);
        }
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  };

  Table.prototype._handleHeaderClick = function (e) {
    var th = e.target;
    this.sort(th);
  };
  /**
   * Sorts the table according to the specified table header element.
   * The column is sorted ascending by default if no direction is specified and no
   * existing sort order class is found in the markup.
   *
   * If the displayed data is not suitable for sorting `<td/>` elements can define a `data-value` attribute
   * which is then used for the data-source.
   *
   * @param {TableHeader} tableHeader The header element of the row to sort by.
   * @param {Number} direction The direction to sort, `1` for ascending, `-1` for descending order. This parameter is optional.
   * @param {function} equalityComparer The equiality comparer function to compare individual cell values.
   */


  Table.prototype.sort = function (tableHeader, direction, equalityComparer) {
    var e_2, _a;

    if (!tableHeader || tableHeader.tagName !== "TH") {
      throw new Error("The parameter 'tableHeader' must be a valid column header node");
    }

    if (direction !== 1 && direction !== -1 && direction) {
      throw new Error("Parameter out of range, parameter 'direction' with value '" + direction + "' must be either -1, 1 or undefined");
    }

    var columnIndex = tableHeader.cellIndex;

    if (!equalityComparer) {
      var dataType = tableHeader.getAttribute("data-type");
      equalityComparer = this._getComparer(dataType);
    }

    if (columnIndex >= this.element.querySelectorAll(QUERY_HEADER).length) {
      throw new Error("Column out of range");
    }

    try {
      for (var _b = (0, _tslib.__values)(this.element.querySelectorAll(QUERY_HEADER)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var header = _c.value;

        if (header !== tableHeader) {
          Dom.removeClass(header, CLASS_SORTED_ASCENDING);
          Dom.removeClass(header, CLASS_SORTED_DESCENDING);
        }
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
      } finally {
        if (e_2) throw e_2.error;
      }
    }

    if (Dom.hasClass(tableHeader, CLASS_SORTED_ASCENDING)) {
      Dom.removeClass(tableHeader, CLASS_SORTED_ASCENDING);
      Dom.addClass(tableHeader, CLASS_SORTED_DESCENDING);
      direction = direction || -1;
    } else {
      Dom.removeClass(tableHeader, CLASS_SORTED_DESCENDING);
      Dom.addClass(tableHeader, CLASS_SORTED_ASCENDING);
      direction = direction || 1;
    }

    this._quicksort(columnIndex, 0, this._rows.length - 1, direction, equalityComparer);
  };

  Table.prototype._getCell = function (column, row) {
    return this._rows[row].cells[column];
  };

  Table.prototype._getRow = function (row) {
    return this._rows[row];
  };

  Table.prototype._getComparer = function (dataType) {
    switch (dataType) {
      case "number":
        {
          // parse the string as a number
          return function (a, b) {
            return parseFloat(a) - parseFloat(b);
          };
        }

      default:
        {
          // compare strings
          return function (a, b) {
            if (a < b) {
              return -1;
            }

            if (a > b) {
              return 1;
            }

            return 0;
          };
        }
    }
  };

  Table.prototype._quicksort = function (column, left, right, direction, equalityComparer) {
    if (direction === void 0) {
      direction = 1;
    }

    if (right - left > 0) {
      var partition = this._partition(column, left, right, direction, equalityComparer);

      if (left < partition - 1) {
        this._quicksort(column, left, partition - 1, direction, equalityComparer);
      }

      if (partition < right) {
        this._quicksort(column, partition, right, direction, equalityComparer);
      }
    }
  };

  Table.prototype._partition = function (column, left, right, direction, equalityComparer) {
    if (direction === void 0) {
      direction = 1;
    }

    var pivot = this._getCell(column, Math.floor((right + left) / 2));

    var i = left;
    var j = right;

    while (i <= j) {
      while (this._equals(this._getCell(column, i), pivot, equalityComparer) * direction < 0) {
        i++;
      }

      while (this._equals(this._getCell(column, j), pivot, equalityComparer) * direction > 0) {
        j--;
      }

      if (i <= j) {
        this._swap(i, j);

        i++;
        j--;
      }
    }

    return i;
  };

  Table.prototype._equals = function (a, b, equalityComparer) {
    var dataA = a.getAttribute("data-value");
    var dataB = b.getAttribute("data-value");
    dataA = dataA || a.textContent || a.innerText;
    dataB = dataB || b.textContent || b.innerText;
    return equalityComparer(dataA, dataB);
  };

  Table.prototype._swap = function (i, j) {
    var tmpNode = this._body.replaceChild(this._getRow(i), this._getRow(j));

    var referenceRow = this._getRow(i);

    if (!referenceRow) {
      this._body.appendChild(tmpNode);
    } else {
      this._body.insertBefore(tmpNode, referenceRow);
    }
  };
  /**
   * Destroys the component and clears all references.
   */


  Table.prototype.destroy = function () {
    var e_3, _a;

    try {
      for (var _b = (0, _tslib.__values)(this.element.querySelectorAll(QUERY_HEADER)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var header = _c.value;
        header.removeEventListener("click", this._headerClickHandler);
      }
    } catch (e_3_1) {
      e_3 = {
        error: e_3_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
      } finally {
        if (e_3) throw e_3.error;
      }
    }

    this._headerClickHandler = null;
    this._body = null;
    this._rows = null;
  };

  return Table;
}(_DomElement["default"]);

function init() {
  (0, _Utils.searchAndInitialize)("table", function (e) {
    new Table(e);
  });
}

var _default = Table;
exports["default"] = _default;

},{"../DomElement":4,"../DomFunctions":5,"../Utils":7,"@babel/runtime/helpers/interopRequireDefault":33,"@babel/runtime/helpers/interopRequireWildcard":34,"tslib":43}],32:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _tslib = require("tslib");

var _animejs = _interopRequireDefault(require("animejs"));

var _DomElement = _interopRequireDefault(require("../DomElement"));

var CLASS_ITEMS = ".toolbar__item";
var CLASS_SHOW = "item--show";
var ANIMATION_START_DELAY = 100;
var ANIMATION_OFFSET = 50;
/**
 * Toolbar component. Use this component to show and hide the
 * individual toolbar items.
 */

var Toolbar =
/** @class */
function (_super) {
  (0, _tslib.__extends)(Toolbar, _super);

  function Toolbar() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Makes the toolbar items visible.
   */


  Toolbar.prototype.show = function () {
    var delay = ANIMATION_START_DELAY;
    var items = this.element.querySelectorAll(CLASS_ITEMS);

    var timeline = _animejs["default"].timeline();

    var _loop_1 = function _loop_1(index) {
      timeline.add({
        targets: items[index],
        duration: 0,
        offset: delay,
        complete: function complete() {
          items[index].classList.add(CLASS_SHOW);
        }
      });
      delay += ANIMATION_OFFSET;
    };

    for (var index = 0; index < items.length; index++) {
      _loop_1(index);
    }
  };
  /**
   * Hides the toolbar items.
   */


  Toolbar.prototype.hide = function () {
    var delay = ANIMATION_START_DELAY;
    var items = this.element.querySelectorAll(CLASS_ITEMS);

    var timeline = _animejs["default"].timeline();

    var _loop_2 = function _loop_2(index) {
      timeline.add({
        targets: items[index],
        duration: 0,
        offset: delay,
        complete: function complete() {
          items[index].classList.remove(CLASS_SHOW);
        }
      });
      delay += ANIMATION_OFFSET;
    };

    for (var index = items.length - 1; index >= 0; index--) {
      _loop_2(index);
    }
  };
  /**
   * Toggles the toolbar items visibility.
   */


  Toolbar.prototype.toggle = function () {
    if (this.element.querySelectorAll("." + CLASS_SHOW).length === 0) {
      this.show();
    } else {
      this.hide();
    }
  };

  return Toolbar;
}(_DomElement["default"]);

var _default = Toolbar;
exports["default"] = _default;

},{"../DomElement":4,"@babel/runtime/helpers/interopRequireDefault":33,"animejs":36,"tslib":43}],33:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
},{}],34:[function(require,module,exports){
var _typeof = require("../helpers/typeof");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;
},{"../helpers/typeof":35}],35:[function(require,module,exports){
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
},{}],36:[function(require,module,exports){
/*
 * anime.js v3.1.0
 * (c) 2019 Julian Garnier
 * Released under the MIT license
 * animejs.com
 */

'use strict';

// Defaults

var defaultInstanceSettings = {
  update: null,
  begin: null,
  loopBegin: null,
  changeBegin: null,
  change: null,
  changeComplete: null,
  loopComplete: null,
  complete: null,
  loop: 1,
  direction: 'normal',
  autoplay: true,
  timelineOffset: 0
};

var defaultTweenSettings = {
  duration: 1000,
  delay: 0,
  endDelay: 0,
  easing: 'easeOutElastic(1, .5)',
  round: 0
};

var validTransforms = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'perspective'];

// Caching

var cache = {
  CSS: {},
  springs: {}
};

// Utils

function minMax(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

function stringContains(str, text) {
  return str.indexOf(text) > -1;
}

function applyArguments(func, args) {
  return func.apply(null, args);
}

var is = {
  arr: function (a) { return Array.isArray(a); },
  obj: function (a) { return stringContains(Object.prototype.toString.call(a), 'Object'); },
  pth: function (a) { return is.obj(a) && a.hasOwnProperty('totalLength'); },
  svg: function (a) { return a instanceof SVGElement; },
  inp: function (a) { return a instanceof HTMLInputElement; },
  dom: function (a) { return a.nodeType || is.svg(a); },
  str: function (a) { return typeof a === 'string'; },
  fnc: function (a) { return typeof a === 'function'; },
  und: function (a) { return typeof a === 'undefined'; },
  hex: function (a) { return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a); },
  rgb: function (a) { return /^rgb/.test(a); },
  hsl: function (a) { return /^hsl/.test(a); },
  col: function (a) { return (is.hex(a) || is.rgb(a) || is.hsl(a)); },
  key: function (a) { return !defaultInstanceSettings.hasOwnProperty(a) && !defaultTweenSettings.hasOwnProperty(a) && a !== 'targets' && a !== 'keyframes'; }
};

// Easings

function parseEasingParameters(string) {
  var match = /\(([^)]+)\)/.exec(string);
  return match ? match[1].split(',').map(function (p) { return parseFloat(p); }) : [];
}

// Spring solver inspired by Webkit Copyright © 2016 Apple Inc. All rights reserved. https://webkit.org/demos/spring/spring.js

function spring(string, duration) {

  var params = parseEasingParameters(string);
  var mass = minMax(is.und(params[0]) ? 1 : params[0], .1, 100);
  var stiffness = minMax(is.und(params[1]) ? 100 : params[1], .1, 100);
  var damping = minMax(is.und(params[2]) ? 10 : params[2], .1, 100);
  var velocity =  minMax(is.und(params[3]) ? 0 : params[3], .1, 100);
  var w0 = Math.sqrt(stiffness / mass);
  var zeta = damping / (2 * Math.sqrt(stiffness * mass));
  var wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
  var a = 1;
  var b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;

  function solver(t) {
    var progress = duration ? (duration * t) / 1000 : t;
    if (zeta < 1) {
      progress = Math.exp(-progress * zeta * w0) * (a * Math.cos(wd * progress) + b * Math.sin(wd * progress));
    } else {
      progress = (a + b * progress) * Math.exp(-progress * w0);
    }
    if (t === 0 || t === 1) { return t; }
    return 1 - progress;
  }

  function getDuration() {
    var cached = cache.springs[string];
    if (cached) { return cached; }
    var frame = 1/6;
    var elapsed = 0;
    var rest = 0;
    while(true) {
      elapsed += frame;
      if (solver(elapsed) === 1) {
        rest++;
        if (rest >= 16) { break; }
      } else {
        rest = 0;
      }
    }
    var duration = elapsed * frame * 1000;
    cache.springs[string] = duration;
    return duration;
  }

  return duration ? solver : getDuration;

}

// Basic steps easing implementation https://developer.mozilla.org/fr/docs/Web/CSS/transition-timing-function

function steps(steps) {
  if ( steps === void 0 ) steps = 10;

  return function (t) { return Math.round(t * steps) * (1 / steps); };
}

// BezierEasing https://github.com/gre/bezier-easing

var bezier = (function () {

  var kSplineTableSize = 11;
  var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

  function A(aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1 }
  function B(aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1 }
  function C(aA1)      { return 3.0 * aA1 }

  function calcBezier(aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT }
  function getSlope(aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1) }

  function binarySubdivide(aX, aA, aB, mX1, mX2) {
    var currentX, currentT, i = 0;
    do {
      currentT = aA + (aB - aA) / 2.0;
      currentX = calcBezier(currentT, mX1, mX2) - aX;
      if (currentX > 0.0) { aB = currentT; } else { aA = currentT; }
    } while (Math.abs(currentX) > 0.0000001 && ++i < 10);
    return currentT;
  }

  function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for (var i = 0; i < 4; ++i) {
      var currentSlope = getSlope(aGuessT, mX1, mX2);
      if (currentSlope === 0.0) { return aGuessT; }
      var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  }

  function bezier(mX1, mY1, mX2, mY2) {

    if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) { return; }
    var sampleValues = new Float32Array(kSplineTableSize);

    if (mX1 !== mY1 || mX2 !== mY2) {
      for (var i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
      }
    }

    function getTForX(aX) {

      var intervalStart = 0;
      var currentSample = 1;
      var lastSample = kSplineTableSize - 1;

      for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
        intervalStart += kSampleStepSize;
      }

      --currentSample;

      var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
      var guessForT = intervalStart + dist * kSampleStepSize;
      var initialSlope = getSlope(guessForT, mX1, mX2);

      if (initialSlope >= 0.001) {
        return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
      } else if (initialSlope === 0.0) {
        return guessForT;
      } else {
        return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
      }

    }

    return function (x) {
      if (mX1 === mY1 && mX2 === mY2) { return x; }
      if (x === 0 || x === 1) { return x; }
      return calcBezier(getTForX(x), mY1, mY2);
    }

  }

  return bezier;

})();

var penner = (function () {

  // Based on jQuery UI's implemenation of easing equations from Robert Penner (http://www.robertpenner.com/easing)

  var eases = { linear: function () { return function (t) { return t; }; } };

  var functionEasings = {
    Sine: function () { return function (t) { return 1 - Math.cos(t * Math.PI / 2); }; },
    Circ: function () { return function (t) { return 1 - Math.sqrt(1 - t * t); }; },
    Back: function () { return function (t) { return t * t * (3 * t - 2); }; },
    Bounce: function () { return function (t) {
      var pow2, b = 4;
      while (t < (( pow2 = Math.pow(2, --b)) - 1) / 11) {}
      return 1 / Math.pow(4, 3 - b) - 7.5625 * Math.pow(( pow2 * 3 - 2 ) / 22 - t, 2)
    }; },
    Elastic: function (amplitude, period) {
      if ( amplitude === void 0 ) amplitude = 1;
      if ( period === void 0 ) period = .5;

      var a = minMax(amplitude, 1, 10);
      var p = minMax(period, .1, 2);
      return function (t) {
        return (t === 0 || t === 1) ? t : 
          -a * Math.pow(2, 10 * (t - 1)) * Math.sin((((t - 1) - (p / (Math.PI * 2) * Math.asin(1 / a))) * (Math.PI * 2)) / p);
      }
    }
  };

  var baseEasings = ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'];

  baseEasings.forEach(function (name, i) {
    functionEasings[name] = function () { return function (t) { return Math.pow(t, i + 2); }; };
  });

  Object.keys(functionEasings).forEach(function (name) {
    var easeIn = functionEasings[name];
    eases['easeIn' + name] = easeIn;
    eases['easeOut' + name] = function (a, b) { return function (t) { return 1 - easeIn(a, b)(1 - t); }; };
    eases['easeInOut' + name] = function (a, b) { return function (t) { return t < 0.5 ? easeIn(a, b)(t * 2) / 2 : 
      1 - easeIn(a, b)(t * -2 + 2) / 2; }; };
  });

  return eases;

})();

function parseEasings(easing, duration) {
  if (is.fnc(easing)) { return easing; }
  var name = easing.split('(')[0];
  var ease = penner[name];
  var args = parseEasingParameters(easing);
  switch (name) {
    case 'spring' : return spring(easing, duration);
    case 'cubicBezier' : return applyArguments(bezier, args);
    case 'steps' : return applyArguments(steps, args);
    default : return applyArguments(ease, args);
  }
}

// Strings

function selectString(str) {
  try {
    var nodes = document.querySelectorAll(str);
    return nodes;
  } catch(e) {
    return;
  }
}

// Arrays

function filterArray(arr, callback) {
  var len = arr.length;
  var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
  var result = [];
  for (var i = 0; i < len; i++) {
    if (i in arr) {
      var val = arr[i];
      if (callback.call(thisArg, val, i, arr)) {
        result.push(val);
      }
    }
  }
  return result;
}

function flattenArray(arr) {
  return arr.reduce(function (a, b) { return a.concat(is.arr(b) ? flattenArray(b) : b); }, []);
}

function toArray(o) {
  if (is.arr(o)) { return o; }
  if (is.str(o)) { o = selectString(o) || o; }
  if (o instanceof NodeList || o instanceof HTMLCollection) { return [].slice.call(o); }
  return [o];
}

function arrayContains(arr, val) {
  return arr.some(function (a) { return a === val; });
}

// Objects

function cloneObject(o) {
  var clone = {};
  for (var p in o) { clone[p] = o[p]; }
  return clone;
}

function replaceObjectProps(o1, o2) {
  var o = cloneObject(o1);
  for (var p in o1) { o[p] = o2.hasOwnProperty(p) ? o2[p] : o1[p]; }
  return o;
}

function mergeObjects(o1, o2) {
  var o = cloneObject(o1);
  for (var p in o2) { o[p] = is.und(o1[p]) ? o2[p] : o1[p]; }
  return o;
}

// Colors

function rgbToRgba(rgbValue) {
  var rgb = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(rgbValue);
  return rgb ? ("rgba(" + (rgb[1]) + ",1)") : rgbValue;
}

function hexToRgba(hexValue) {
  var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var hex = hexValue.replace(rgx, function (m, r, g, b) { return r + r + g + g + b + b; } );
  var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(rgb[1], 16);
  var g = parseInt(rgb[2], 16);
  var b = parseInt(rgb[3], 16);
  return ("rgba(" + r + "," + g + "," + b + ",1)");
}

function hslToRgba(hslValue) {
  var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue);
  var h = parseInt(hsl[1], 10) / 360;
  var s = parseInt(hsl[2], 10) / 100;
  var l = parseInt(hsl[3], 10) / 100;
  var a = hsl[4] || 1;
  function hue2rgb(p, q, t) {
    if (t < 0) { t += 1; }
    if (t > 1) { t -= 1; }
    if (t < 1/6) { return p + (q - p) * 6 * t; }
    if (t < 1/2) { return q; }
    if (t < 2/3) { return p + (q - p) * (2/3 - t) * 6; }
    return p;
  }
  var r, g, b;
  if (s == 0) {
    r = g = b = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return ("rgba(" + (r * 255) + "," + (g * 255) + "," + (b * 255) + "," + a + ")");
}

function colorToRgb(val) {
  if (is.rgb(val)) { return rgbToRgba(val); }
  if (is.hex(val)) { return hexToRgba(val); }
  if (is.hsl(val)) { return hslToRgba(val); }
}

// Units

function getUnit(val) {
  var split = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);
  if (split) { return split[1]; }
}

function getTransformUnit(propName) {
  if (stringContains(propName, 'translate') || propName === 'perspective') { return 'px'; }
  if (stringContains(propName, 'rotate') || stringContains(propName, 'skew')) { return 'deg'; }
}

// Values

function getFunctionValue(val, animatable) {
  if (!is.fnc(val)) { return val; }
  return val(animatable.target, animatable.id, animatable.total);
}

function getAttribute(el, prop) {
  return el.getAttribute(prop);
}

function convertPxToUnit(el, value, unit) {
  var valueUnit = getUnit(value);
  if (arrayContains([unit, 'deg', 'rad', 'turn'], valueUnit)) { return value; }
  var cached = cache.CSS[value + unit];
  if (!is.und(cached)) { return cached; }
  var baseline = 100;
  var tempEl = document.createElement(el.tagName);
  var parentEl = (el.parentNode && (el.parentNode !== document)) ? el.parentNode : document.body;
  parentEl.appendChild(tempEl);
  tempEl.style.position = 'absolute';
  tempEl.style.width = baseline + unit;
  var factor = baseline / tempEl.offsetWidth;
  parentEl.removeChild(tempEl);
  var convertedUnit = factor * parseFloat(value);
  cache.CSS[value + unit] = convertedUnit;
  return convertedUnit;
}

function getCSSValue(el, prop, unit) {
  if (prop in el.style) {
    var uppercasePropName = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    var value = el.style[prop] || getComputedStyle(el).getPropertyValue(uppercasePropName) || '0';
    return unit ? convertPxToUnit(el, value, unit) : value;
  }
}

function getAnimationType(el, prop) {
  if (is.dom(el) && !is.inp(el) && (getAttribute(el, prop) || (is.svg(el) && el[prop]))) { return 'attribute'; }
  if (is.dom(el) && arrayContains(validTransforms, prop)) { return 'transform'; }
  if (is.dom(el) && (prop !== 'transform' && getCSSValue(el, prop))) { return 'css'; }
  if (el[prop] != null) { return 'object'; }
}

function getElementTransforms(el) {
  if (!is.dom(el)) { return; }
  var str = el.style.transform || '';
  var reg  = /(\w+)\(([^)]*)\)/g;
  var transforms = new Map();
  var m; while (m = reg.exec(str)) { transforms.set(m[1], m[2]); }
  return transforms;
}

function getTransformValue(el, propName, animatable, unit) {
  var defaultVal = stringContains(propName, 'scale') ? 1 : 0 + getTransformUnit(propName);
  var value = getElementTransforms(el).get(propName) || defaultVal;
  if (animatable) {
    animatable.transforms.list.set(propName, value);
    animatable.transforms['last'] = propName;
  }
  return unit ? convertPxToUnit(el, value, unit) : value;
}

function getOriginalTargetValue(target, propName, unit, animatable) {
  switch (getAnimationType(target, propName)) {
    case 'transform': return getTransformValue(target, propName, animatable, unit);
    case 'css': return getCSSValue(target, propName, unit);
    case 'attribute': return getAttribute(target, propName);
    default: return target[propName] || 0;
  }
}

function getRelativeValue(to, from) {
  var operator = /^(\*=|\+=|-=)/.exec(to);
  if (!operator) { return to; }
  var u = getUnit(to) || 0;
  var x = parseFloat(from);
  var y = parseFloat(to.replace(operator[0], ''));
  switch (operator[0][0]) {
    case '+': return x + y + u;
    case '-': return x - y + u;
    case '*': return x * y + u;
  }
}

function validateValue(val, unit) {
  if (is.col(val)) { return colorToRgb(val); }
  if (/\s/g.test(val)) { return val; }
  var originalUnit = getUnit(val);
  var unitLess = originalUnit ? val.substr(0, val.length - originalUnit.length) : val;
  if (unit) { return unitLess + unit; }
  return unitLess;
}

// getTotalLength() equivalent for circle, rect, polyline, polygon and line shapes
// adapted from https://gist.github.com/SebLambla/3e0550c496c236709744

function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function getCircleLength(el) {
  return Math.PI * 2 * getAttribute(el, 'r');
}

function getRectLength(el) {
  return (getAttribute(el, 'width') * 2) + (getAttribute(el, 'height') * 2);
}

function getLineLength(el) {
  return getDistance(
    {x: getAttribute(el, 'x1'), y: getAttribute(el, 'y1')}, 
    {x: getAttribute(el, 'x2'), y: getAttribute(el, 'y2')}
  );
}

function getPolylineLength(el) {
  var points = el.points;
  var totalLength = 0;
  var previousPos;
  for (var i = 0 ; i < points.numberOfItems; i++) {
    var currentPos = points.getItem(i);
    if (i > 0) { totalLength += getDistance(previousPos, currentPos); }
    previousPos = currentPos;
  }
  return totalLength;
}

function getPolygonLength(el) {
  var points = el.points;
  return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
}

// Path animation

function getTotalLength(el) {
  if (el.getTotalLength) { return el.getTotalLength(); }
  switch(el.tagName.toLowerCase()) {
    case 'circle': return getCircleLength(el);
    case 'rect': return getRectLength(el);
    case 'line': return getLineLength(el);
    case 'polyline': return getPolylineLength(el);
    case 'polygon': return getPolygonLength(el);
  }
}

function setDashoffset(el) {
  var pathLength = getTotalLength(el);
  el.setAttribute('stroke-dasharray', pathLength);
  return pathLength;
}

// Motion path

function getParentSvgEl(el) {
  var parentEl = el.parentNode;
  while (is.svg(parentEl)) {
    if (!is.svg(parentEl.parentNode)) { break; }
    parentEl = parentEl.parentNode;
  }
  return parentEl;
}

function getParentSvg(pathEl, svgData) {
  var svg = svgData || {};
  var parentSvgEl = svg.el || getParentSvgEl(pathEl);
  var rect = parentSvgEl.getBoundingClientRect();
  var viewBoxAttr = getAttribute(parentSvgEl, 'viewBox');
  var width = rect.width;
  var height = rect.height;
  var viewBox = svg.viewBox || (viewBoxAttr ? viewBoxAttr.split(' ') : [0, 0, width, height]);
  return {
    el: parentSvgEl,
    viewBox: viewBox,
    x: viewBox[0] / 1,
    y: viewBox[1] / 1,
    w: width / viewBox[2],
    h: height / viewBox[3]
  }
}

function getPath(path, percent) {
  var pathEl = is.str(path) ? selectString(path)[0] : path;
  var p = percent || 100;
  return function(property) {
    return {
      property: property,
      el: pathEl,
      svg: getParentSvg(pathEl),
      totalLength: getTotalLength(pathEl) * (p / 100)
    }
  }
}

function getPathProgress(path, progress) {
  function point(offset) {
    if ( offset === void 0 ) offset = 0;

    var l = progress + offset >= 1 ? progress + offset : 0;
    return path.el.getPointAtLength(l);
  }
  var svg = getParentSvg(path.el, path.svg);
  var p = point();
  var p0 = point(-1);
  var p1 = point(+1);
  switch (path.property) {
    case 'x': return (p.x - svg.x) * svg.w;
    case 'y': return (p.y - svg.y) * svg.h;
    case 'angle': return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
  }
}

// Decompose value

function decomposeValue(val, unit) {
  // const rgx = /-?\d*\.?\d+/g; // handles basic numbers
  // const rgx = /[+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g; // handles exponents notation
  var rgx = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g; // handles exponents notation
  var value = validateValue((is.pth(val) ? val.totalLength : val), unit) + '';
  return {
    original: value,
    numbers: value.match(rgx) ? value.match(rgx).map(Number) : [0],
    strings: (is.str(val) || unit) ? value.split(rgx) : []
  }
}

// Animatables

function parseTargets(targets) {
  var targetsArray = targets ? (flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets))) : [];
  return filterArray(targetsArray, function (item, pos, self) { return self.indexOf(item) === pos; });
}

function getAnimatables(targets) {
  var parsed = parseTargets(targets);
  return parsed.map(function (t, i) {
    return {target: t, id: i, total: parsed.length, transforms: { list: getElementTransforms(t) } };
  });
}

// Properties

function normalizePropertyTweens(prop, tweenSettings) {
  var settings = cloneObject(tweenSettings);
  // Override duration if easing is a spring
  if (/^spring/.test(settings.easing)) { settings.duration = spring(settings.easing); }
  if (is.arr(prop)) {
    var l = prop.length;
    var isFromTo = (l === 2 && !is.obj(prop[0]));
    if (!isFromTo) {
      // Duration divided by the number of tweens
      if (!is.fnc(tweenSettings.duration)) { settings.duration = tweenSettings.duration / l; }
    } else {
      // Transform [from, to] values shorthand to a valid tween value
      prop = {value: prop};
    }
  }
  var propArray = is.arr(prop) ? prop : [prop];
  return propArray.map(function (v, i) {
    var obj = (is.obj(v) && !is.pth(v)) ? v : {value: v};
    // Default delay value should only be applied to the first tween
    if (is.und(obj.delay)) { obj.delay = !i ? tweenSettings.delay : 0; }
    // Default endDelay value should only be applied to the last tween
    if (is.und(obj.endDelay)) { obj.endDelay = i === propArray.length - 1 ? tweenSettings.endDelay : 0; }
    return obj;
  }).map(function (k) { return mergeObjects(k, settings); });
}


function flattenKeyframes(keyframes) {
  var propertyNames = filterArray(flattenArray(keyframes.map(function (key) { return Object.keys(key); })), function (p) { return is.key(p); })
  .reduce(function (a,b) { if (a.indexOf(b) < 0) { a.push(b); } return a; }, []);
  var properties = {};
  var loop = function ( i ) {
    var propName = propertyNames[i];
    properties[propName] = keyframes.map(function (key) {
      var newKey = {};
      for (var p in key) {
        if (is.key(p)) {
          if (p == propName) { newKey.value = key[p]; }
        } else {
          newKey[p] = key[p];
        }
      }
      return newKey;
    });
  };

  for (var i = 0; i < propertyNames.length; i++) loop( i );
  return properties;
}

function getProperties(tweenSettings, params) {
  var properties = [];
  var keyframes = params.keyframes;
  if (keyframes) { params = mergeObjects(flattenKeyframes(keyframes), params); }
  for (var p in params) {
    if (is.key(p)) {
      properties.push({
        name: p,
        tweens: normalizePropertyTweens(params[p], tweenSettings)
      });
    }
  }
  return properties;
}

// Tweens

function normalizeTweenValues(tween, animatable) {
  var t = {};
  for (var p in tween) {
    var value = getFunctionValue(tween[p], animatable);
    if (is.arr(value)) {
      value = value.map(function (v) { return getFunctionValue(v, animatable); });
      if (value.length === 1) { value = value[0]; }
    }
    t[p] = value;
  }
  t.duration = parseFloat(t.duration);
  t.delay = parseFloat(t.delay);
  return t;
}

function normalizeTweens(prop, animatable) {
  var previousTween;
  return prop.tweens.map(function (t) {
    var tween = normalizeTweenValues(t, animatable);
    var tweenValue = tween.value;
    var to = is.arr(tweenValue) ? tweenValue[1] : tweenValue;
    var toUnit = getUnit(to);
    var originalValue = getOriginalTargetValue(animatable.target, prop.name, toUnit, animatable);
    var previousValue = previousTween ? previousTween.to.original : originalValue;
    var from = is.arr(tweenValue) ? tweenValue[0] : previousValue;
    var fromUnit = getUnit(from) || getUnit(originalValue);
    var unit = toUnit || fromUnit;
    if (is.und(to)) { to = previousValue; }
    tween.from = decomposeValue(from, unit);
    tween.to = decomposeValue(getRelativeValue(to, from), unit);
    tween.start = previousTween ? previousTween.end : 0;
    tween.end = tween.start + tween.delay + tween.duration + tween.endDelay;
    tween.easing = parseEasings(tween.easing, tween.duration);
    tween.isPath = is.pth(tweenValue);
    tween.isColor = is.col(tween.from.original);
    if (tween.isColor) { tween.round = 1; }
    previousTween = tween;
    return tween;
  });
}

// Tween progress

var setProgressValue = {
  css: function (t, p, v) { return t.style[p] = v; },
  attribute: function (t, p, v) { return t.setAttribute(p, v); },
  object: function (t, p, v) { return t[p] = v; },
  transform: function (t, p, v, transforms, manual) {
    transforms.list.set(p, v);
    if (p === transforms.last || manual) {
      var str = '';
      transforms.list.forEach(function (value, prop) { str += prop + "(" + value + ") "; });
      t.style.transform = str;
    }
  }
};

// Set Value helper

function setTargetsValue(targets, properties) {
  var animatables = getAnimatables(targets);
  animatables.forEach(function (animatable) {
    for (var property in properties) {
      var value = getFunctionValue(properties[property], animatable);
      var target = animatable.target;
      var valueUnit = getUnit(value);
      var originalValue = getOriginalTargetValue(target, property, valueUnit, animatable);
      var unit = valueUnit || getUnit(originalValue);
      var to = getRelativeValue(validateValue(value, unit), originalValue);
      var animType = getAnimationType(target, property);
      setProgressValue[animType](target, property, to, animatable.transforms, true);
    }
  });
}

// Animations

function createAnimation(animatable, prop) {
  var animType = getAnimationType(animatable.target, prop.name);
  if (animType) {
    var tweens = normalizeTweens(prop, animatable);
    var lastTween = tweens[tweens.length - 1];
    return {
      type: animType,
      property: prop.name,
      animatable: animatable,
      tweens: tweens,
      duration: lastTween.end,
      delay: tweens[0].delay,
      endDelay: lastTween.endDelay
    }
  }
}

function getAnimations(animatables, properties) {
  return filterArray(flattenArray(animatables.map(function (animatable) {
    return properties.map(function (prop) {
      return createAnimation(animatable, prop);
    });
  })), function (a) { return !is.und(a); });
}

// Create Instance

function getInstanceTimings(animations, tweenSettings) {
  var animLength = animations.length;
  var getTlOffset = function (anim) { return anim.timelineOffset ? anim.timelineOffset : 0; };
  var timings = {};
  timings.duration = animLength ? Math.max.apply(Math, animations.map(function (anim) { return getTlOffset(anim) + anim.duration; })) : tweenSettings.duration;
  timings.delay = animLength ? Math.min.apply(Math, animations.map(function (anim) { return getTlOffset(anim) + anim.delay; })) : tweenSettings.delay;
  timings.endDelay = animLength ? timings.duration - Math.max.apply(Math, animations.map(function (anim) { return getTlOffset(anim) + anim.duration - anim.endDelay; })) : tweenSettings.endDelay;
  return timings;
}

var instanceID = 0;

function createNewInstance(params) {
  var instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
  var tweenSettings = replaceObjectProps(defaultTweenSettings, params);
  var properties = getProperties(tweenSettings, params);
  var animatables = getAnimatables(params.targets);
  var animations = getAnimations(animatables, properties);
  var timings = getInstanceTimings(animations, tweenSettings);
  var id = instanceID;
  instanceID++;
  return mergeObjects(instanceSettings, {
    id: id,
    children: [],
    animatables: animatables,
    animations: animations,
    duration: timings.duration,
    delay: timings.delay,
    endDelay: timings.endDelay
  });
}

// Core

var activeInstances = [];
var pausedInstances = [];
var raf;

var engine = (function () {
  function play() { 
    raf = requestAnimationFrame(step);
  }
  function step(t) {
    var activeInstancesLength = activeInstances.length;
    if (activeInstancesLength) {
      var i = 0;
      while (i < activeInstancesLength) {
        var activeInstance = activeInstances[i];
        if (!activeInstance.paused) {
          activeInstance.tick(t);
        } else {
          var instanceIndex = activeInstances.indexOf(activeInstance);
          if (instanceIndex > -1) {
            activeInstances.splice(instanceIndex, 1);
            activeInstancesLength = activeInstances.length;
          }
        }
        i++;
      }
      play();
    } else {
      raf = cancelAnimationFrame(raf);
    }
  }
  return play;
})();

function handleVisibilityChange() {
  if (document.hidden) {
    activeInstances.forEach(function (ins) { return ins.pause(); });
    pausedInstances = activeInstances.slice(0);
    anime.running = activeInstances = [];
  } else {
    pausedInstances.forEach(function (ins) { return ins.play(); });
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', handleVisibilityChange);
}

// Public Instance

function anime(params) {
  if ( params === void 0 ) params = {};


  var startTime = 0, lastTime = 0, now = 0;
  var children, childrenLength = 0;
  var resolve = null;

  function makePromise(instance) {
    var promise = window.Promise && new Promise(function (_resolve) { return resolve = _resolve; });
    instance.finished = promise;
    return promise;
  }

  var instance = createNewInstance(params);
  var promise = makePromise(instance);

  function toggleInstanceDirection() {
    var direction = instance.direction;
    if (direction !== 'alternate') {
      instance.direction = direction !== 'normal' ? 'normal' : 'reverse';
    }
    instance.reversed = !instance.reversed;
    children.forEach(function (child) { return child.reversed = instance.reversed; });
  }

  function adjustTime(time) {
    return instance.reversed ? instance.duration - time : time;
  }

  function resetTime() {
    startTime = 0;
    lastTime = adjustTime(instance.currentTime) * (1 / anime.speed);
  }

  function seekChild(time, child) {
    if (child) { child.seek(time - child.timelineOffset); }
  }

  function syncInstanceChildren(time) {
    if (!instance.reversePlayback) {
      for (var i = 0; i < childrenLength; i++) { seekChild(time, children[i]); }
    } else {
      for (var i$1 = childrenLength; i$1--;) { seekChild(time, children[i$1]); }
    }
  }

  function setAnimationsProgress(insTime) {
    var i = 0;
    var animations = instance.animations;
    var animationsLength = animations.length;
    while (i < animationsLength) {
      var anim = animations[i];
      var animatable = anim.animatable;
      var tweens = anim.tweens;
      var tweenLength = tweens.length - 1;
      var tween = tweens[tweenLength];
      // Only check for keyframes if there is more than one tween
      if (tweenLength) { tween = filterArray(tweens, function (t) { return (insTime < t.end); })[0] || tween; }
      var elapsed = minMax(insTime - tween.start - tween.delay, 0, tween.duration) / tween.duration;
      var eased = isNaN(elapsed) ? 1 : tween.easing(elapsed);
      var strings = tween.to.strings;
      var round = tween.round;
      var numbers = [];
      var toNumbersLength = tween.to.numbers.length;
      var progress = (void 0);
      for (var n = 0; n < toNumbersLength; n++) {
        var value = (void 0);
        var toNumber = tween.to.numbers[n];
        var fromNumber = tween.from.numbers[n] || 0;
        if (!tween.isPath) {
          value = fromNumber + (eased * (toNumber - fromNumber));
        } else {
          value = getPathProgress(tween.value, eased * toNumber);
        }
        if (round) {
          if (!(tween.isColor && n > 2)) {
            value = Math.round(value * round) / round;
          }
        }
        numbers.push(value);
      }
      // Manual Array.reduce for better performances
      var stringsLength = strings.length;
      if (!stringsLength) {
        progress = numbers[0];
      } else {
        progress = strings[0];
        for (var s = 0; s < stringsLength; s++) {
          var a = strings[s];
          var b = strings[s + 1];
          var n$1 = numbers[s];
          if (!isNaN(n$1)) {
            if (!b) {
              progress += n$1 + ' ';
            } else {
              progress += n$1 + b;
            }
          }
        }
      }
      setProgressValue[anim.type](animatable.target, anim.property, progress, animatable.transforms);
      anim.currentValue = progress;
      i++;
    }
  }

  function setCallback(cb) {
    if (instance[cb] && !instance.passThrough) { instance[cb](instance); }
  }

  function countIteration() {
    if (instance.remaining && instance.remaining !== true) {
      instance.remaining--;
    }
  }

  function setInstanceProgress(engineTime) {
    var insDuration = instance.duration;
    var insDelay = instance.delay;
    var insEndDelay = insDuration - instance.endDelay;
    var insTime = adjustTime(engineTime);
    instance.progress = minMax((insTime / insDuration) * 100, 0, 100);
    instance.reversePlayback = insTime < instance.currentTime;
    if (children) { syncInstanceChildren(insTime); }
    if (!instance.began && instance.currentTime > 0) {
      instance.began = true;
      setCallback('begin');
    }
    if (!instance.loopBegan && instance.currentTime > 0) {
      instance.loopBegan = true;
      setCallback('loopBegin');
    }
    if (insTime <= insDelay && instance.currentTime !== 0) {
      setAnimationsProgress(0);
    }
    if ((insTime >= insEndDelay && instance.currentTime !== insDuration) || !insDuration) {
      setAnimationsProgress(insDuration);
    }
    if (insTime > insDelay && insTime < insEndDelay) {
      if (!instance.changeBegan) {
        instance.changeBegan = true;
        instance.changeCompleted = false;
        setCallback('changeBegin');
      }
      setCallback('change');
      setAnimationsProgress(insTime);
    } else {
      if (instance.changeBegan) {
        instance.changeCompleted = true;
        instance.changeBegan = false;
        setCallback('changeComplete');
      }
    }
    instance.currentTime = minMax(insTime, 0, insDuration);
    if (instance.began) { setCallback('update'); }
    if (engineTime >= insDuration) {
      lastTime = 0;
      countIteration();
      if (!instance.remaining) {
        instance.paused = true;
        if (!instance.completed) {
          instance.completed = true;
          setCallback('loopComplete');
          setCallback('complete');
          if (!instance.passThrough && 'Promise' in window) {
            resolve();
            promise = makePromise(instance);
          }
        }
      } else {
        startTime = now;
        setCallback('loopComplete');
        instance.loopBegan = false;
        if (instance.direction === 'alternate') {
          toggleInstanceDirection();
        }
      }
    }
  }

  instance.reset = function() {
    var direction = instance.direction;
    instance.passThrough = false;
    instance.currentTime = 0;
    instance.progress = 0;
    instance.paused = true;
    instance.began = false;
    instance.loopBegan = false;
    instance.changeBegan = false;
    instance.completed = false;
    instance.changeCompleted = false;
    instance.reversePlayback = false;
    instance.reversed = direction === 'reverse';
    instance.remaining = instance.loop;
    children = instance.children;
    childrenLength = children.length;
    for (var i = childrenLength; i--;) { instance.children[i].reset(); }
    if (instance.reversed && instance.loop !== true || (direction === 'alternate' && instance.loop === 1)) { instance.remaining++; }
    setAnimationsProgress(instance.reversed ? instance.duration : 0);
  };

  // Set Value helper

  instance.set = function(targets, properties) {
    setTargetsValue(targets, properties);
    return instance;
  };

  instance.tick = function(t) {
    now = t;
    if (!startTime) { startTime = now; }
    setInstanceProgress((now + (lastTime - startTime)) * anime.speed);
  };

  instance.seek = function(time) {
    setInstanceProgress(adjustTime(time));
  };

  instance.pause = function() {
    instance.paused = true;
    resetTime();
  };

  instance.play = function() {
    if (!instance.paused) { return; }
    if (instance.completed) { instance.reset(); }
    instance.paused = false;
    activeInstances.push(instance);
    resetTime();
    if (!raf) { engine(); }
  };

  instance.reverse = function() {
    toggleInstanceDirection();
    resetTime();
  };

  instance.restart = function() {
    instance.reset();
    instance.play();
  };

  instance.reset();

  if (instance.autoplay) { instance.play(); }

  return instance;

}

// Remove targets from animation

function removeTargetsFromAnimations(targetsArray, animations) {
  for (var a = animations.length; a--;) {
    if (arrayContains(targetsArray, animations[a].animatable.target)) {
      animations.splice(a, 1);
    }
  }
}

function removeTargets(targets) {
  var targetsArray = parseTargets(targets);
  for (var i = activeInstances.length; i--;) {
    var instance = activeInstances[i];
    var animations = instance.animations;
    var children = instance.children;
    removeTargetsFromAnimations(targetsArray, animations);
    for (var c = children.length; c--;) {
      var child = children[c];
      var childAnimations = child.animations;
      removeTargetsFromAnimations(targetsArray, childAnimations);
      if (!childAnimations.length && !child.children.length) { children.splice(c, 1); }
    }
    if (!animations.length && !children.length) { instance.pause(); }
  }
}

// Stagger helpers

function stagger(val, params) {
  if ( params === void 0 ) params = {};

  var direction = params.direction || 'normal';
  var easing = params.easing ? parseEasings(params.easing) : null;
  var grid = params.grid;
  var axis = params.axis;
  var fromIndex = params.from || 0;
  var fromFirst = fromIndex === 'first';
  var fromCenter = fromIndex === 'center';
  var fromLast = fromIndex === 'last';
  var isRange = is.arr(val);
  var val1 = isRange ? parseFloat(val[0]) : parseFloat(val);
  var val2 = isRange ? parseFloat(val[1]) : 0;
  var unit = getUnit(isRange ? val[1] : val) || 0;
  var start = params.start || 0 + (isRange ? val1 : 0);
  var values = [];
  var maxValue = 0;
  return function (el, i, t) {
    if (fromFirst) { fromIndex = 0; }
    if (fromCenter) { fromIndex = (t - 1) / 2; }
    if (fromLast) { fromIndex = t - 1; }
    if (!values.length) {
      for (var index = 0; index < t; index++) {
        if (!grid) {
          values.push(Math.abs(fromIndex - index));
        } else {
          var fromX = !fromCenter ? fromIndex%grid[0] : (grid[0]-1)/2;
          var fromY = !fromCenter ? Math.floor(fromIndex/grid[0]) : (grid[1]-1)/2;
          var toX = index%grid[0];
          var toY = Math.floor(index/grid[0]);
          var distanceX = fromX - toX;
          var distanceY = fromY - toY;
          var value = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          if (axis === 'x') { value = -distanceX; }
          if (axis === 'y') { value = -distanceY; }
          values.push(value);
        }
        maxValue = Math.max.apply(Math, values);
      }
      if (easing) { values = values.map(function (val) { return easing(val / maxValue) * maxValue; }); }
      if (direction === 'reverse') { values = values.map(function (val) { return axis ? (val < 0) ? val * -1 : -val : Math.abs(maxValue - val); }); }
    }
    var spacing = isRange ? (val2 - val1) / maxValue : val1;
    return start + (spacing * (Math.round(values[i] * 100) / 100)) + unit;
  }
}

// Timeline

function timeline(params) {
  if ( params === void 0 ) params = {};

  var tl = anime(params);
  tl.duration = 0;
  tl.add = function(instanceParams, timelineOffset) {
    var tlIndex = activeInstances.indexOf(tl);
    var children = tl.children;
    if (tlIndex > -1) { activeInstances.splice(tlIndex, 1); }
    function passThrough(ins) { ins.passThrough = true; }
    for (var i = 0; i < children.length; i++) { passThrough(children[i]); }
    var insParams = mergeObjects(instanceParams, replaceObjectProps(defaultTweenSettings, params));
    insParams.targets = insParams.targets || params.targets;
    var tlDuration = tl.duration;
    insParams.autoplay = false;
    insParams.direction = tl.direction;
    insParams.timelineOffset = is.und(timelineOffset) ? tlDuration : getRelativeValue(timelineOffset, tlDuration);
    passThrough(tl);
    tl.seek(insParams.timelineOffset);
    var ins = anime(insParams);
    passThrough(ins);
    children.push(ins);
    var timings = getInstanceTimings(children, params);
    tl.delay = timings.delay;
    tl.endDelay = timings.endDelay;
    tl.duration = timings.duration;
    tl.seek(0);
    tl.reset();
    if (tl.autoplay) { tl.play(); }
    return tl;
  };
  return tl;
}

anime.version = '3.1.0';
anime.speed = 1;
anime.running = activeInstances;
anime.remove = removeTargets;
anime.get = getOriginalTargetValue;
anime.set = setTargetsValue;
anime.convertPx = convertPxToUnit;
anime.path = getPath;
anime.setDashoffset = setDashoffset;
anime.stagger = stagger;
anime.timeline = timeline;
anime.easing = parseEasings;
anime.penner = penner;
anime.random = function (min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; };

module.exports = anime;

},{}],37:[function(require,module,exports){
!function(e,t){if("function"==typeof define&&define.amd)define(["exports"],t);else if("undefined"!=typeof exports)t(exports);else{var o={};t(o),e.bodyScrollLock=o}}(this,function(exports){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return Array.from(e)}Object.defineProperty(exports,"__esModule",{value:!0});var l=!1;if("undefined"!=typeof window){var e={get passive(){l=!0}};window.addEventListener("testPassive",null,e),window.removeEventListener("testPassive",null,e)}var d="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&/iP(ad|hone|od)/.test(window.navigator.platform),c=[],u=!1,a=-1,s=void 0,v=void 0,f=function(t){return c.some(function(e){return!(!e.options.allowTouchMove||!e.options.allowTouchMove(t))})},m=function(e){var t=e||window.event;return!!f(t.target)||(1<t.touches.length||(t.preventDefault&&t.preventDefault(),!1))},o=function(){setTimeout(function(){void 0!==v&&(document.body.style.paddingRight=v,v=void 0),void 0!==s&&(document.body.style.overflow=s,s=void 0)})};exports.disableBodyScroll=function(i,e){if(d){if(!i)return void console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");if(i&&!c.some(function(e){return e.targetElement===i})){var t={targetElement:i,options:e||{}};c=[].concat(r(c),[t]),i.ontouchstart=function(e){1===e.targetTouches.length&&(a=e.targetTouches[0].clientY)},i.ontouchmove=function(e){var t,o,n,r;1===e.targetTouches.length&&(o=i,r=(t=e).targetTouches[0].clientY-a,!f(t.target)&&(o&&0===o.scrollTop&&0<r?m(t):(n=o)&&n.scrollHeight-n.scrollTop<=n.clientHeight&&r<0?m(t):t.stopPropagation()))},u||(document.addEventListener("touchmove",m,l?{passive:!1}:void 0),u=!0)}}else{n=e,setTimeout(function(){if(void 0===v){var e=!!n&&!0===n.reserveScrollBarGap,t=window.innerWidth-document.documentElement.clientWidth;e&&0<t&&(v=document.body.style.paddingRight,document.body.style.paddingRight=t+"px")}void 0===s&&(s=document.body.style.overflow,document.body.style.overflow="hidden")});var o={targetElement:i,options:e||{}};c=[].concat(r(c),[o])}var n},exports.clearAllBodyScrollLocks=function(){d?(c.forEach(function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null}),u&&(document.removeEventListener("touchmove",m,l?{passive:!1}:void 0),u=!1),c=[],a=-1):(o(),c=[])},exports.enableBodyScroll=function(t){if(d){if(!t)return void console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");t.ontouchstart=null,t.ontouchmove=null,c=c.filter(function(e){return e.targetElement!==t}),u&&0===c.length&&(document.removeEventListener("touchmove",m,l?{passive:!1}:void 0),u=!1)}else(c=c.filter(function(e){return e.targetElement!==t})).length||o()}});

},{}],38:[function(require,module,exports){
/* flatpickr v4.5.7, @license MIT */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.flatpickr = factory());
}(this, function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var HOOKS = [
        "onChange",
        "onClose",
        "onDayCreate",
        "onDestroy",
        "onKeyDown",
        "onMonthChange",
        "onOpen",
        "onParseConfig",
        "onReady",
        "onValueUpdate",
        "onYearChange",
        "onPreCalendarPosition",
    ];
    var defaults = {
        _disable: [],
        _enable: [],
        allowInput: false,
        altFormat: "F j, Y",
        altInput: false,
        altInputClass: "form-control input",
        animate: typeof window === "object" &&
            window.navigator.userAgent.indexOf("MSIE") === -1,
        ariaDateFormat: "F j, Y",
        clickOpens: true,
        closeOnSelect: true,
        conjunction: ", ",
        dateFormat: "Y-m-d",
        defaultHour: 12,
        defaultMinute: 0,
        defaultSeconds: 0,
        disable: [],
        disableMobile: false,
        enable: [],
        enableSeconds: false,
        enableTime: false,
        errorHandler: function (err) {
            return typeof console !== "undefined" && console.warn(err);
        },
        getWeek: function (givenDate) {
            var date = new Date(givenDate.getTime());
            date.setHours(0, 0, 0, 0);
            // Thursday in current week decides the year.
            date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
            // January 4 is always in week 1.
            var week1 = new Date(date.getFullYear(), 0, 4);
            // Adjust to Thursday in week 1 and count number of weeks from date to week1.
            return (1 +
                Math.round(((date.getTime() - week1.getTime()) / 86400000 -
                    3 +
                    ((week1.getDay() + 6) % 7)) /
                    7));
        },
        hourIncrement: 1,
        ignoredFocusElements: [],
        inline: false,
        locale: "default",
        minuteIncrement: 5,
        mode: "single",
        nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
        noCalendar: false,
        now: new Date(),
        onChange: [],
        onClose: [],
        onDayCreate: [],
        onDestroy: [],
        onKeyDown: [],
        onMonthChange: [],
        onOpen: [],
        onParseConfig: [],
        onReady: [],
        onValueUpdate: [],
        onYearChange: [],
        onPreCalendarPosition: [],
        plugins: [],
        position: "auto",
        positionElement: undefined,
        prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
        shorthandCurrentMonth: false,
        showMonths: 1,
        static: false,
        time_24hr: false,
        weekNumbers: false,
        wrap: false
    };

    var english = {
        weekdays: {
            shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            longhand: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ]
        },
        months: {
            shorthand: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
            longhand: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ]
        },
        daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        firstDayOfWeek: 0,
        ordinal: function (nth) {
            var s = nth % 100;
            if (s > 3 && s < 21)
                return "th";
            switch (s % 10) {
                case 1:
                    return "st";
                case 2:
                    return "nd";
                case 3:
                    return "rd";
                default:
                    return "th";
            }
        },
        rangeSeparator: " to ",
        weekAbbreviation: "Wk",
        scrollTitle: "Scroll to increment",
        toggleTitle: "Click to toggle",
        amPM: ["AM", "PM"],
        yearAriaLabel: "Year"
    };

    var pad = function (number) { return ("0" + number).slice(-2); };
    var int = function (bool) { return (bool === true ? 1 : 0); };
    /* istanbul ignore next */
    function debounce(func, wait, immediate) {
        if (immediate === void 0) { immediate = false; }
        var timeout;
        return function () {
            var context = this, args = arguments;
            timeout !== null && clearTimeout(timeout);
            timeout = window.setTimeout(function () {
                timeout = null;
                if (!immediate)
                    func.apply(context, args);
            }, wait);
            if (immediate && !timeout)
                func.apply(context, args);
        };
    }
    var arrayify = function (obj) {
        return obj instanceof Array ? obj : [obj];
    };

    function toggleClass(elem, className, bool) {
        if (bool === true)
            return elem.classList.add(className);
        elem.classList.remove(className);
    }
    function createElement(tag, className, content) {
        var e = window.document.createElement(tag);
        className = className || "";
        content = content || "";
        e.className = className;
        if (content !== undefined)
            e.textContent = content;
        return e;
    }
    function clearNode(node) {
        while (node.firstChild)
            node.removeChild(node.firstChild);
    }
    function findParent(node, condition) {
        if (condition(node))
            return node;
        else if (node.parentNode)
            return findParent(node.parentNode, condition);
        return undefined; // nothing found
    }
    function createNumberInput(inputClassName, opts) {
        var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
        if (navigator.userAgent.indexOf("MSIE 9.0") === -1) {
            numInput.type = "number";
        }
        else {
            numInput.type = "text";
            numInput.pattern = "\\d*";
        }
        if (opts !== undefined)
            for (var key in opts)
                numInput.setAttribute(key, opts[key]);
        wrapper.appendChild(numInput);
        wrapper.appendChild(arrowUp);
        wrapper.appendChild(arrowDown);
        return wrapper;
    }
    function getEventTarget(event) {
        if (typeof event.composedPath === "function") {
            var path = event.composedPath();
            return path[0];
        }
        return event.target;
    }

    var do_nothing = function () { return undefined; };
    var monthToStr = function (monthNumber, shorthand, locale) { return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber]; };
    var revFormat = {
        D: do_nothing,
        F: function (dateObj, monthName, locale) {
            dateObj.setMonth(locale.months.longhand.indexOf(monthName));
        },
        G: function (dateObj, hour) {
            dateObj.setHours(parseFloat(hour));
        },
        H: function (dateObj, hour) {
            dateObj.setHours(parseFloat(hour));
        },
        J: function (dateObj, day) {
            dateObj.setDate(parseFloat(day));
        },
        K: function (dateObj, amPM, locale) {
            dateObj.setHours((dateObj.getHours() % 12) +
                12 * int(new RegExp(locale.amPM[1], "i").test(amPM)));
        },
        M: function (dateObj, shortMonth, locale) {
            dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
        },
        S: function (dateObj, seconds) {
            dateObj.setSeconds(parseFloat(seconds));
        },
        U: function (_, unixSeconds) { return new Date(parseFloat(unixSeconds) * 1000); },
        W: function (dateObj, weekNum) {
            var weekNumber = parseInt(weekNum);
            return new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
        },
        Y: function (dateObj, year) {
            dateObj.setFullYear(parseFloat(year));
        },
        Z: function (_, ISODate) { return new Date(ISODate); },
        d: function (dateObj, day) {
            dateObj.setDate(parseFloat(day));
        },
        h: function (dateObj, hour) {
            dateObj.setHours(parseFloat(hour));
        },
        i: function (dateObj, minutes) {
            dateObj.setMinutes(parseFloat(minutes));
        },
        j: function (dateObj, day) {
            dateObj.setDate(parseFloat(day));
        },
        l: do_nothing,
        m: function (dateObj, month) {
            dateObj.setMonth(parseFloat(month) - 1);
        },
        n: function (dateObj, month) {
            dateObj.setMonth(parseFloat(month) - 1);
        },
        s: function (dateObj, seconds) {
            dateObj.setSeconds(parseFloat(seconds));
        },
        u: function (_, unixMillSeconds) {
            return new Date(parseFloat(unixMillSeconds));
        },
        w: do_nothing,
        y: function (dateObj, year) {
            dateObj.setFullYear(2000 + parseFloat(year));
        }
    };
    var tokenRegex = {
        D: "(\\w+)",
        F: "(\\w+)",
        G: "(\\d\\d|\\d)",
        H: "(\\d\\d|\\d)",
        J: "(\\d\\d|\\d)\\w+",
        K: "",
        M: "(\\w+)",
        S: "(\\d\\d|\\d)",
        U: "(.+)",
        W: "(\\d\\d|\\d)",
        Y: "(\\d{4})",
        Z: "(.+)",
        d: "(\\d\\d|\\d)",
        h: "(\\d\\d|\\d)",
        i: "(\\d\\d|\\d)",
        j: "(\\d\\d|\\d)",
        l: "(\\w+)",
        m: "(\\d\\d|\\d)",
        n: "(\\d\\d|\\d)",
        s: "(\\d\\d|\\d)",
        u: "(.+)",
        w: "(\\d\\d|\\d)",
        y: "(\\d{2})"
    };
    var formats = {
        // get the date in UTC
        Z: function (date) { return date.toISOString(); },
        // weekday name, short, e.g. Thu
        D: function (date, locale, options) {
            return locale.weekdays.shorthand[formats.w(date, locale, options)];
        },
        // full month name e.g. January
        F: function (date, locale, options) {
            return monthToStr(formats.n(date, locale, options) - 1, false, locale);
        },
        // padded hour 1-12
        G: function (date, locale, options) {
            return pad(formats.h(date, locale, options));
        },
        // hours with leading zero e.g. 03
        H: function (date) { return pad(date.getHours()); },
        // day (1-30) with ordinal suffix e.g. 1st, 2nd
        J: function (date, locale) {
            return locale.ordinal !== undefined
                ? date.getDate() + locale.ordinal(date.getDate())
                : date.getDate();
        },
        // AM/PM
        K: function (date, locale) { return locale.amPM[int(date.getHours() > 11)]; },
        // shorthand month e.g. Jan, Sep, Oct, etc
        M: function (date, locale) {
            return monthToStr(date.getMonth(), true, locale);
        },
        // seconds 00-59
        S: function (date) { return pad(date.getSeconds()); },
        // unix timestamp
        U: function (date) { return date.getTime() / 1000; },
        W: function (date, _, options) {
            return options.getWeek(date);
        },
        // full year e.g. 2016
        Y: function (date) { return date.getFullYear(); },
        // day in month, padded (01-30)
        d: function (date) { return pad(date.getDate()); },
        // hour from 1-12 (am/pm)
        h: function (date) { return (date.getHours() % 12 ? date.getHours() % 12 : 12); },
        // minutes, padded with leading zero e.g. 09
        i: function (date) { return pad(date.getMinutes()); },
        // day in month (1-30)
        j: function (date) { return date.getDate(); },
        // weekday name, full, e.g. Thursday
        l: function (date, locale) {
            return locale.weekdays.longhand[date.getDay()];
        },
        // padded month number (01-12)
        m: function (date) { return pad(date.getMonth() + 1); },
        // the month number (1-12)
        n: function (date) { return date.getMonth() + 1; },
        // seconds 0-59
        s: function (date) { return date.getSeconds(); },
        // Unix Milliseconds
        u: function (date) { return date.getTime(); },
        // number of the day of the week
        w: function (date) { return date.getDay(); },
        // last two digits of year e.g. 16 for 2016
        y: function (date) { return String(date.getFullYear()).substring(2); }
    };

    var createDateFormatter = function (_a) {
        var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
        return function (dateObj, frmt, overrideLocale) {
            var locale = overrideLocale || l10n;
            if (config.formatDate !== undefined) {
                return config.formatDate(dateObj, frmt, locale);
            }
            return frmt
                .split("")
                .map(function (c, i, arr) {
                return formats[c] && arr[i - 1] !== "\\"
                    ? formats[c](dateObj, locale, config)
                    : c !== "\\"
                        ? c
                        : "";
            })
                .join("");
        };
    };
    var createDateParser = function (_a) {
        var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
        return function (date, givenFormat, timeless, customLocale) {
            if (date !== 0 && !date)
                return undefined;
            var locale = customLocale || l10n;
            var parsedDate;
            var date_orig = date;
            if (date instanceof Date)
                parsedDate = new Date(date.getTime());
            else if (typeof date !== "string" &&
                date.toFixed !== undefined // timestamp
            )
                // create a copy
                parsedDate = new Date(date);
            else if (typeof date === "string") {
                // date string
                var format = givenFormat || (config || defaults).dateFormat;
                var datestr = String(date).trim();
                if (datestr === "today") {
                    parsedDate = new Date();
                    timeless = true;
                }
                else if (/Z$/.test(datestr) ||
                    /GMT$/.test(datestr) // datestrings w/ timezone
                )
                    parsedDate = new Date(date);
                else if (config && config.parseDate)
                    parsedDate = config.parseDate(date, format);
                else {
                    parsedDate =
                        !config || !config.noCalendar
                            ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
                            : new Date(new Date().setHours(0, 0, 0, 0));
                    var matched = void 0, ops = [];
                    for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                        var token_1 = format[i];
                        var isBackSlash = token_1 === "\\";
                        var escaped = format[i - 1] === "\\" || isBackSlash;
                        if (tokenRegex[token_1] && !escaped) {
                            regexStr += tokenRegex[token_1];
                            var match = new RegExp(regexStr).exec(date);
                            if (match && (matched = true)) {
                                ops[token_1 !== "Y" ? "push" : "unshift"]({
                                    fn: revFormat[token_1],
                                    val: match[++matchIndex]
                                });
                            }
                        }
                        else if (!isBackSlash)
                            regexStr += "."; // don't really care
                        ops.forEach(function (_a) {
                            var fn = _a.fn, val = _a.val;
                            return (parsedDate = fn(parsedDate, val, locale) || parsedDate);
                        });
                    }
                    parsedDate = matched ? parsedDate : undefined;
                }
            }
            /* istanbul ignore next */
            if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
                config.errorHandler(new Error("Invalid date provided: " + date_orig));
                return undefined;
            }
            if (timeless === true)
                parsedDate.setHours(0, 0, 0, 0);
            return parsedDate;
        };
    };
    /**
     * Compute the difference in dates, measured in ms
     */
    function compareDates(date1, date2, timeless) {
        if (timeless === void 0) { timeless = true; }
        if (timeless !== false) {
            return (new Date(date1.getTime()).setHours(0, 0, 0, 0) -
                new Date(date2.getTime()).setHours(0, 0, 0, 0));
        }
        return date1.getTime() - date2.getTime();
    }
    var isBetween = function (ts, ts1, ts2) {
        return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
    };
    var duration = {
        DAY: 86400000
    };

    if (typeof Object.assign !== "function") {
        Object.assign = function (target) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (!target) {
                throw TypeError("Cannot convert undefined or null to object");
            }
            var _loop_1 = function (source) {
                if (source) {
                    Object.keys(source).forEach(function (key) { return (target[key] = source[key]); });
                }
            };
            for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                var source = args_1[_a];
                _loop_1(source);
            }
            return target;
        };
    }

    var DEBOUNCED_CHANGE_MS = 300;
    function FlatpickrInstance(element, instanceConfig) {
        var self = {
            config: __assign({}, flatpickr.defaultConfig),
            l10n: english
        };
        self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
        self._handlers = [];
        self._bind = bind;
        self._setHoursFromDate = setHoursFromDate;
        self._positionCalendar = positionCalendar;
        self.changeMonth = changeMonth;
        self.changeYear = changeYear;
        self.clear = clear;
        self.close = close;
        self._createElement = createElement;
        self.destroy = destroy;
        self.isEnabled = isEnabled;
        self.jumpToDate = jumpToDate;
        self.open = open;
        self.redraw = redraw;
        self.set = set;
        self.setDate = setDate;
        self.toggle = toggle;
        function setupHelperFunctions() {
            self.utils = {
                getDaysInMonth: function (month, yr) {
                    if (month === void 0) { month = self.currentMonth; }
                    if (yr === void 0) { yr = self.currentYear; }
                    if (month === 1 && ((yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0))
                        return 29;
                    return self.l10n.daysInMonth[month];
                }
            };
        }
        function init() {
            self.element = self.input = element;
            self.isOpen = false;
            parseConfig();
            setupLocale();
            setupInputs();
            setupDates();
            setupHelperFunctions();
            if (!self.isMobile)
                build();
            bindEvents();
            if (self.selectedDates.length || self.config.noCalendar) {
                if (self.config.enableTime) {
                    setHoursFromDate(self.config.noCalendar
                        ? self.latestSelectedDateObj || self.config.minDate
                        : undefined);
                }
                updateValue(false);
            }
            setCalendarWidth();
            self.showTimeInput =
                self.selectedDates.length > 0 || self.config.noCalendar;
            var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            /* TODO: investigate this further
        
              Currently, there is weird positioning behavior in safari causing pages
              to scroll up. https://github.com/chmln/flatpickr/issues/563
        
              However, most browsers are not Safari and positioning is expensive when used
              in scale. https://github.com/chmln/flatpickr/issues/1096
            */
            if (!self.isMobile && isSafari) {
                positionCalendar();
            }
            triggerEvent("onReady");
        }
        function bindToInstance(fn) {
            return fn.bind(self);
        }
        function setCalendarWidth() {
            var config = self.config;
            if (config.weekNumbers === false && config.showMonths === 1)
                return;
            else if (config.noCalendar !== true) {
                window.requestAnimationFrame(function () {
                    if (self.calendarContainer !== undefined) {
                        self.calendarContainer.style.visibility = "hidden";
                        self.calendarContainer.style.display = "block";
                    }
                    if (self.daysContainer !== undefined) {
                        var daysWidth = (self.days.offsetWidth + 1) * config.showMonths;
                        self.daysContainer.style.width = daysWidth + "px";
                        self.calendarContainer.style.width =
                            daysWidth +
                                (self.weekWrapper !== undefined
                                    ? self.weekWrapper.offsetWidth
                                    : 0) +
                                "px";
                        self.calendarContainer.style.removeProperty("visibility");
                        self.calendarContainer.style.removeProperty("display");
                    }
                });
            }
        }
        /**
         * The handler for all events targeting the time inputs
         */
        function updateTime(e) {
            if (self.selectedDates.length === 0) {
                setDefaultTime();
            }
            if (e !== undefined && e.type !== "blur") {
                timeWrapper(e);
            }
            var prevValue = self._input.value;
            setHoursFromInputs();
            updateValue();
            if (self._input.value !== prevValue) {
                self._debouncedChange();
            }
        }
        function ampm2military(hour, amPM) {
            return (hour % 12) + 12 * int(amPM === self.l10n.amPM[1]);
        }
        function military2ampm(hour) {
            switch (hour % 24) {
                case 0:
                case 12:
                    return 12;
                default:
                    return hour % 12;
            }
        }
        /**
         * Syncs the selected date object time with user's time input
         */
        function setHoursFromInputs() {
            if (self.hourElement === undefined || self.minuteElement === undefined)
                return;
            var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== undefined
                ? (parseInt(self.secondElement.value, 10) || 0) % 60
                : 0;
            if (self.amPM !== undefined) {
                hours = ampm2military(hours, self.amPM.textContent);
            }
            var limitMinHours = self.config.minTime !== undefined ||
                (self.config.minDate &&
                    self.minDateHasTime &&
                    self.latestSelectedDateObj &&
                    compareDates(self.latestSelectedDateObj, self.config.minDate, true) ===
                        0);
            var limitMaxHours = self.config.maxTime !== undefined ||
                (self.config.maxDate &&
                    self.maxDateHasTime &&
                    self.latestSelectedDateObj &&
                    compareDates(self.latestSelectedDateObj, self.config.maxDate, true) ===
                        0);
            if (limitMaxHours) {
                var maxTime = self.config.maxTime !== undefined
                    ? self.config.maxTime
                    : self.config.maxDate;
                hours = Math.min(hours, maxTime.getHours());
                if (hours === maxTime.getHours())
                    minutes = Math.min(minutes, maxTime.getMinutes());
                if (minutes === maxTime.getMinutes())
                    seconds = Math.min(seconds, maxTime.getSeconds());
            }
            if (limitMinHours) {
                var minTime = self.config.minTime !== undefined
                    ? self.config.minTime
                    : self.config.minDate;
                hours = Math.max(hours, minTime.getHours());
                if (hours === minTime.getHours())
                    minutes = Math.max(minutes, minTime.getMinutes());
                if (minutes === minTime.getMinutes())
                    seconds = Math.max(seconds, minTime.getSeconds());
            }
            setHours(hours, minutes, seconds);
        }
        /**
         * Syncs time input values with a date
         */
        function setHoursFromDate(dateObj) {
            var date = dateObj || self.latestSelectedDateObj;
            if (date)
                setHours(date.getHours(), date.getMinutes(), date.getSeconds());
        }
        function setDefaultHours() {
            var hours = self.config.defaultHour;
            var minutes = self.config.defaultMinute;
            var seconds = self.config.defaultSeconds;
            if (self.config.minDate !== undefined) {
                var min_hr = self.config.minDate.getHours();
                var min_minutes = self.config.minDate.getMinutes();
                hours = Math.max(hours, min_hr);
                if (hours === min_hr)
                    minutes = Math.max(min_minutes, minutes);
                if (hours === min_hr && minutes === min_minutes)
                    seconds = self.config.minDate.getSeconds();
            }
            if (self.config.maxDate !== undefined) {
                var max_hr = self.config.maxDate.getHours();
                var max_minutes = self.config.maxDate.getMinutes();
                hours = Math.min(hours, max_hr);
                if (hours === max_hr)
                    minutes = Math.min(max_minutes, minutes);
                if (hours === max_hr && minutes === max_minutes)
                    seconds = self.config.maxDate.getSeconds();
            }
            setHours(hours, minutes, seconds);
        }
        /**
         * Sets the hours, minutes, and optionally seconds
         * of the latest selected date object and the
         * corresponding time inputs
         * @param {Number} hours the hour. whether its military
         *                 or am-pm gets inferred from config
         * @param {Number} minutes the minutes
         * @param {Number} seconds the seconds (optional)
         */
        function setHours(hours, minutes, seconds) {
            if (self.latestSelectedDateObj !== undefined) {
                self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
            }
            if (!self.hourElement || !self.minuteElement || self.isMobile)
                return;
            self.hourElement.value = pad(!self.config.time_24hr
                ? ((12 + hours) % 12) + 12 * int(hours % 12 === 0)
                : hours);
            self.minuteElement.value = pad(minutes);
            if (self.amPM !== undefined)
                self.amPM.textContent = self.l10n.amPM[int(hours >= 12)];
            if (self.secondElement !== undefined)
                self.secondElement.value = pad(seconds);
        }
        /**
         * Handles the year input and incrementing events
         * @param {Event} event the keyup or increment event
         */
        function onYearInput(event) {
            var year = parseInt(event.target.value) + (event.delta || 0);
            if (year / 1000 > 1 ||
                (event.key === "Enter" && !/[^\d]/.test(year.toString()))) {
                changeYear(year);
            }
        }
        /**
         * Essentially addEventListener + tracking
         * @param {Element} element the element to addEventListener to
         * @param {String} event the event name
         * @param {Function} handler the event handler
         */
        function bind(element, event, handler, options) {
            if (event instanceof Array)
                return event.forEach(function (ev) { return bind(element, ev, handler, options); });
            if (element instanceof Array)
                return element.forEach(function (el) { return bind(el, event, handler, options); });
            element.addEventListener(event, handler, options);
            self._handlers.push({
                element: element,
                event: event,
                handler: handler,
                options: options
            });
        }
        /**
         * A mousedown handler which mimics click.
         * Minimizes latency, since we don't need to wait for mouseup in most cases.
         * Also, avoids handling right clicks.
         *
         * @param {Function} handler the event handler
         */
        function onClick(handler) {
            return function (evt) {
                evt.which === 1 && handler(evt);
            };
        }
        function triggerChange() {
            triggerEvent("onChange");
        }
        /**
         * Adds all the necessary event listeners
         */
        function bindEvents() {
            if (self.config.wrap) {
                ["open", "close", "toggle", "clear"].forEach(function (evt) {
                    Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function (el) {
                        return bind(el, "click", self[evt]);
                    });
                });
            }
            if (self.isMobile) {
                setupMobile();
                return;
            }
            var debouncedResize = debounce(onResize, 50);
            self._debouncedChange = debounce(triggerChange, DEBOUNCED_CHANGE_MS);
            if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent))
                bind(self.daysContainer, "mouseover", function (e) {
                    if (self.config.mode === "range")
                        onMouseOver(e.target);
                });
            bind(window.document.body, "keydown", onKeyDown);
            if (!self.config.static)
                bind(self._input, "keydown", onKeyDown);
            if (!self.config.inline && !self.config.static)
                bind(window, "resize", debouncedResize);
            if (window.ontouchstart !== undefined)
                bind(window.document, "click", documentClick);
            else
                bind(window.document, "mousedown", onClick(documentClick));
            bind(window.document, "focus", documentClick, { capture: true });
            if (self.config.clickOpens === true) {
                bind(self._input, "focus", self.open);
                bind(self._input, "mousedown", onClick(self.open));
            }
            if (self.daysContainer !== undefined) {
                bind(self.monthNav, "mousedown", onClick(onMonthNavClick));
                bind(self.monthNav, ["keyup", "increment"], onYearInput);
                bind(self.daysContainer, "mousedown", onClick(selectDate));
            }
            if (self.timeContainer !== undefined &&
                self.minuteElement !== undefined &&
                self.hourElement !== undefined) {
                var selText = function (e) {
                    return e.target.select();
                };
                bind(self.timeContainer, ["increment"], updateTime);
                bind(self.timeContainer, "blur", updateTime, { capture: true });
                bind(self.timeContainer, "mousedown", onClick(timeIncrement));
                bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
                if (self.secondElement !== undefined)
                    bind(self.secondElement, "focus", function () { return self.secondElement && self.secondElement.select(); });
                if (self.amPM !== undefined) {
                    bind(self.amPM, "mousedown", onClick(function (e) {
                        updateTime(e);
                        triggerChange();
                    }));
                }
            }
        }
        /**
         * Set the calendar view to a particular date.
         * @param {Date} jumpDate the date to set the view to
         */
        function jumpToDate(jumpDate) {
            var jumpTo = jumpDate !== undefined
                ? self.parseDate(jumpDate)
                : self.latestSelectedDateObj ||
                    (self.config.minDate && self.config.minDate > self.now
                        ? self.config.minDate
                        : self.config.maxDate && self.config.maxDate < self.now
                            ? self.config.maxDate
                            : self.now);
            try {
                if (jumpTo !== undefined) {
                    self.currentYear = jumpTo.getFullYear();
                    self.currentMonth = jumpTo.getMonth();
                }
            }
            catch (e) {
                /* istanbul ignore next */
                e.message = "Invalid date supplied: " + jumpTo;
                self.config.errorHandler(e);
            }
            self.redraw();
        }
        /**
         * The up/down arrow handler for time inputs
         * @param {Event} e the click event
         */
        function timeIncrement(e) {
            if (~e.target.className.indexOf("arrow"))
                incrementNumInput(e, e.target.classList.contains("arrowUp") ? 1 : -1);
        }
        /**
         * Increments/decrements the value of input associ-
         * ated with the up/down arrow by dispatching an
         * "increment" event on the input.
         *
         * @param {Event} e the click event
         * @param {Number} delta the diff (usually 1 or -1)
         * @param {Element} inputElem the input element
         */
        function incrementNumInput(e, delta, inputElem) {
            var target = e && e.target;
            var input = inputElem ||
                (target && target.parentNode && target.parentNode.firstChild);
            var event = createEvent("increment");
            event.delta = delta;
            input && input.dispatchEvent(event);
        }
        function build() {
            var fragment = window.document.createDocumentFragment();
            self.calendarContainer = createElement("div", "flatpickr-calendar");
            self.calendarContainer.tabIndex = -1;
            if (!self.config.noCalendar) {
                fragment.appendChild(buildMonthNav());
                self.innerContainer = createElement("div", "flatpickr-innerContainer");
                if (self.config.weekNumbers) {
                    var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
                    self.innerContainer.appendChild(weekWrapper);
                    self.weekNumbers = weekNumbers;
                    self.weekWrapper = weekWrapper;
                }
                self.rContainer = createElement("div", "flatpickr-rContainer");
                self.rContainer.appendChild(buildWeekdays());
                if (!self.daysContainer) {
                    self.daysContainer = createElement("div", "flatpickr-days");
                    self.daysContainer.tabIndex = -1;
                }
                buildDays();
                self.rContainer.appendChild(self.daysContainer);
                self.innerContainer.appendChild(self.rContainer);
                fragment.appendChild(self.innerContainer);
            }
            if (self.config.enableTime) {
                fragment.appendChild(buildTime());
            }
            toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
            toggleClass(self.calendarContainer, "animate", self.config.animate === true);
            toggleClass(self.calendarContainer, "multiMonth", self.config.showMonths > 1);
            self.calendarContainer.appendChild(fragment);
            var customAppend = self.config.appendTo !== undefined &&
                self.config.appendTo.nodeType !== undefined;
            if (self.config.inline || self.config.static) {
                self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
                if (self.config.inline) {
                    if (!customAppend && self.element.parentNode)
                        self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
                    else if (self.config.appendTo !== undefined)
                        self.config.appendTo.appendChild(self.calendarContainer);
                }
                if (self.config.static) {
                    var wrapper = createElement("div", "flatpickr-wrapper");
                    if (self.element.parentNode)
                        self.element.parentNode.insertBefore(wrapper, self.element);
                    wrapper.appendChild(self.element);
                    if (self.altInput)
                        wrapper.appendChild(self.altInput);
                    wrapper.appendChild(self.calendarContainer);
                }
            }
            if (!self.config.static && !self.config.inline)
                (self.config.appendTo !== undefined
                    ? self.config.appendTo
                    : window.document.body).appendChild(self.calendarContainer);
        }
        function createDay(className, date, dayNumber, i) {
            var dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", "flatpickr-day " + className, date.getDate().toString());
            dayElement.dateObj = date;
            dayElement.$i = i;
            dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
            if (className.indexOf("hidden") === -1 &&
                compareDates(date, self.now) === 0) {
                self.todayDateElem = dayElement;
                dayElement.classList.add("today");
                dayElement.setAttribute("aria-current", "date");
            }
            if (dateIsEnabled) {
                dayElement.tabIndex = -1;
                if (isDateSelected(date)) {
                    dayElement.classList.add("selected");
                    self.selectedDateElem = dayElement;
                    if (self.config.mode === "range") {
                        toggleClass(dayElement, "startRange", self.selectedDates[0] &&
                            compareDates(date, self.selectedDates[0], true) === 0);
                        toggleClass(dayElement, "endRange", self.selectedDates[1] &&
                            compareDates(date, self.selectedDates[1], true) === 0);
                        if (className === "nextMonthDay")
                            dayElement.classList.add("inRange");
                    }
                }
            }
            else {
                dayElement.classList.add("disabled");
            }
            if (self.config.mode === "range") {
                if (isDateInRange(date) && !isDateSelected(date))
                    dayElement.classList.add("inRange");
            }
            if (self.weekNumbers &&
                self.config.showMonths === 1 &&
                className !== "prevMonthDay" &&
                dayNumber % 7 === 1) {
                self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
            }
            triggerEvent("onDayCreate", dayElement);
            return dayElement;
        }
        function focusOnDayElem(targetNode) {
            targetNode.focus();
            if (self.config.mode === "range")
                onMouseOver(targetNode);
        }
        function getFirstAvailableDay(delta) {
            var startMonth = delta > 0 ? 0 : self.config.showMonths - 1;
            var endMonth = delta > 0 ? self.config.showMonths : -1;
            for (var m = startMonth; m != endMonth; m += delta) {
                var month = self.daysContainer.children[m];
                var startIndex = delta > 0 ? 0 : month.children.length - 1;
                var endIndex = delta > 0 ? month.children.length : -1;
                for (var i = startIndex; i != endIndex; i += delta) {
                    var c = month.children[i];
                    if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj))
                        return c;
                }
            }
            return undefined;
        }
        function getNextAvailableDay(current, delta) {
            var givenMonth = current.className.indexOf("Month") === -1
                ? current.dateObj.getMonth()
                : self.currentMonth;
            var endMonth = delta > 0 ? self.config.showMonths : -1;
            var loopDelta = delta > 0 ? 1 : -1;
            for (var m = givenMonth - self.currentMonth; m != endMonth; m += loopDelta) {
                var month = self.daysContainer.children[m];
                var startIndex = givenMonth - self.currentMonth === m
                    ? current.$i + delta
                    : delta < 0
                        ? month.children.length - 1
                        : 0;
                var numMonthDays = month.children.length;
                for (var i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
                    var c = month.children[i];
                    if (c.className.indexOf("hidden") === -1 &&
                        isEnabled(c.dateObj) &&
                        Math.abs(current.$i - i) >= Math.abs(delta))
                        return focusOnDayElem(c);
                }
            }
            self.changeMonth(loopDelta);
            focusOnDay(getFirstAvailableDay(loopDelta), 0);
            return undefined;
        }
        function focusOnDay(current, offset) {
            var dayFocused = isInView(document.activeElement || document.body);
            var startElem = current !== undefined
                ? current
                : dayFocused
                    ? document.activeElement
                    : self.selectedDateElem !== undefined && isInView(self.selectedDateElem)
                        ? self.selectedDateElem
                        : self.todayDateElem !== undefined && isInView(self.todayDateElem)
                            ? self.todayDateElem
                            : getFirstAvailableDay(offset > 0 ? 1 : -1);
            if (startElem === undefined)
                return self._input.focus();
            if (!dayFocused)
                return focusOnDayElem(startElem);
            getNextAvailableDay(startElem, offset);
        }
        function buildMonthDays(year, month) {
            var firstOfMonth = (new Date(year, month, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7;
            var prevMonthDays = self.utils.getDaysInMonth((month - 1 + 12) % 12);
            var daysInMonth = self.utils.getDaysInMonth(month), days = window.document.createDocumentFragment(), isMultiMonth = self.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
            var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
            // prepend days from the ending of previous month
            for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
                days.appendChild(createDay(prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
            }
            // Start at 1 since there is no 0th day
            for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
                days.appendChild(createDay("", new Date(year, month, dayNumber), dayNumber, dayIndex));
            }
            // append days from the next month
            for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth &&
                (self.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++) {
                days.appendChild(createDay(nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
            }
            //updateNavigationCurrentMonth();
            var dayContainer = createElement("div", "dayContainer");
            dayContainer.appendChild(days);
            return dayContainer;
        }
        function buildDays() {
            if (self.daysContainer === undefined) {
                return;
            }
            clearNode(self.daysContainer);
            // TODO: week numbers for each month
            if (self.weekNumbers)
                clearNode(self.weekNumbers);
            var frag = document.createDocumentFragment();
            for (var i = 0; i < self.config.showMonths; i++) {
                var d = new Date(self.currentYear, self.currentMonth, 1);
                d.setMonth(self.currentMonth + i);
                frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
            }
            self.daysContainer.appendChild(frag);
            self.days = self.daysContainer.firstChild;
            if (self.config.mode === "range" && self.selectedDates.length === 1) {
                onMouseOver();
            }
        }
        function buildMonth() {
            var container = createElement("div", "flatpickr-month");
            var monthNavFragment = window.document.createDocumentFragment();
            var monthElement = createElement("span", "cur-month");
            var yearInput = createNumberInput("cur-year", { tabindex: "-1" });
            var yearElement = yearInput.getElementsByTagName("input")[0];
            yearElement.setAttribute("aria-label", self.l10n.yearAriaLabel);
            if (self.config.minDate) {
                yearElement.setAttribute("min", self.config.minDate.getFullYear().toString());
            }
            if (self.config.maxDate) {
                yearElement.setAttribute("max", self.config.maxDate.getFullYear().toString());
                yearElement.disabled =
                    !!self.config.minDate &&
                        self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
            }
            var currentMonth = createElement("div", "flatpickr-current-month");
            currentMonth.appendChild(monthElement);
            currentMonth.appendChild(yearInput);
            monthNavFragment.appendChild(currentMonth);
            container.appendChild(monthNavFragment);
            return {
                container: container,
                yearElement: yearElement,
                monthElement: monthElement
            };
        }
        function buildMonths() {
            clearNode(self.monthNav);
            self.monthNav.appendChild(self.prevMonthNav);
            if (self.config.showMonths) {
                self.yearElements = [];
                self.monthElements = [];
            }
            for (var m = self.config.showMonths; m--;) {
                var month = buildMonth();
                self.yearElements.push(month.yearElement);
                self.monthElements.push(month.monthElement);
                self.monthNav.appendChild(month.container);
            }
            self.monthNav.appendChild(self.nextMonthNav);
        }
        function buildMonthNav() {
            self.monthNav = createElement("div", "flatpickr-months");
            self.yearElements = [];
            self.monthElements = [];
            self.prevMonthNav = createElement("span", "flatpickr-prev-month");
            self.prevMonthNav.innerHTML = self.config.prevArrow;
            self.nextMonthNav = createElement("span", "flatpickr-next-month");
            self.nextMonthNav.innerHTML = self.config.nextArrow;
            buildMonths();
            Object.defineProperty(self, "_hidePrevMonthArrow", {
                get: function () { return self.__hidePrevMonthArrow; },
                set: function (bool) {
                    if (self.__hidePrevMonthArrow !== bool) {
                        toggleClass(self.prevMonthNav, "disabled", bool);
                        self.__hidePrevMonthArrow = bool;
                    }
                }
            });
            Object.defineProperty(self, "_hideNextMonthArrow", {
                get: function () { return self.__hideNextMonthArrow; },
                set: function (bool) {
                    if (self.__hideNextMonthArrow !== bool) {
                        toggleClass(self.nextMonthNav, "disabled", bool);
                        self.__hideNextMonthArrow = bool;
                    }
                }
            });
            self.currentYearElement = self.yearElements[0];
            updateNavigationCurrentMonth();
            return self.monthNav;
        }
        function buildTime() {
            self.calendarContainer.classList.add("hasTime");
            if (self.config.noCalendar)
                self.calendarContainer.classList.add("noCalendar");
            self.timeContainer = createElement("div", "flatpickr-time");
            self.timeContainer.tabIndex = -1;
            var separator = createElement("span", "flatpickr-time-separator", ":");
            var hourInput = createNumberInput("flatpickr-hour");
            self.hourElement = hourInput.getElementsByTagName("input")[0];
            var minuteInput = createNumberInput("flatpickr-minute");
            self.minuteElement = minuteInput.getElementsByTagName("input")[0];
            self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
            self.hourElement.value = pad(self.latestSelectedDateObj
                ? self.latestSelectedDateObj.getHours()
                : self.config.time_24hr
                    ? self.config.defaultHour
                    : military2ampm(self.config.defaultHour));
            self.minuteElement.value = pad(self.latestSelectedDateObj
                ? self.latestSelectedDateObj.getMinutes()
                : self.config.defaultMinute);
            self.hourElement.setAttribute("step", self.config.hourIncrement.toString());
            self.minuteElement.setAttribute("step", self.config.minuteIncrement.toString());
            self.hourElement.setAttribute("min", self.config.time_24hr ? "0" : "1");
            self.hourElement.setAttribute("max", self.config.time_24hr ? "23" : "12");
            self.minuteElement.setAttribute("min", "0");
            self.minuteElement.setAttribute("max", "59");
            self.timeContainer.appendChild(hourInput);
            self.timeContainer.appendChild(separator);
            self.timeContainer.appendChild(minuteInput);
            if (self.config.time_24hr)
                self.timeContainer.classList.add("time24hr");
            if (self.config.enableSeconds) {
                self.timeContainer.classList.add("hasSeconds");
                var secondInput = createNumberInput("flatpickr-second");
                self.secondElement = secondInput.getElementsByTagName("input")[0];
                self.secondElement.value = pad(self.latestSelectedDateObj
                    ? self.latestSelectedDateObj.getSeconds()
                    : self.config.defaultSeconds);
                self.secondElement.setAttribute("step", self.minuteElement.getAttribute("step"));
                self.secondElement.setAttribute("min", "0");
                self.secondElement.setAttribute("max", "59");
                self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
                self.timeContainer.appendChild(secondInput);
            }
            if (!self.config.time_24hr) {
                // add self.amPM if appropriate
                self.amPM = createElement("span", "flatpickr-am-pm", self.l10n.amPM[int((self.latestSelectedDateObj
                    ? self.hourElement.value
                    : self.config.defaultHour) > 11)]);
                self.amPM.title = self.l10n.toggleTitle;
                self.amPM.tabIndex = -1;
                self.timeContainer.appendChild(self.amPM);
            }
            return self.timeContainer;
        }
        function buildWeekdays() {
            if (!self.weekdayContainer)
                self.weekdayContainer = createElement("div", "flatpickr-weekdays");
            else
                clearNode(self.weekdayContainer);
            for (var i = self.config.showMonths; i--;) {
                var container = createElement("div", "flatpickr-weekdaycontainer");
                self.weekdayContainer.appendChild(container);
            }
            updateWeekdays();
            return self.weekdayContainer;
        }
        function updateWeekdays() {
            var firstDayOfWeek = self.l10n.firstDayOfWeek;
            var weekdays = self.l10n.weekdays.shorthand.slice();
            if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
                weekdays = weekdays.splice(firstDayOfWeek, weekdays.length).concat(weekdays.splice(0, firstDayOfWeek));
            }
            for (var i = self.config.showMonths; i--;) {
                self.weekdayContainer.children[i].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + weekdays.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      ";
            }
        }
        /* istanbul ignore next */
        function buildWeeks() {
            self.calendarContainer.classList.add("hasWeeks");
            var weekWrapper = createElement("div", "flatpickr-weekwrapper");
            weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
            var weekNumbers = createElement("div", "flatpickr-weeks");
            weekWrapper.appendChild(weekNumbers);
            return {
                weekWrapper: weekWrapper,
                weekNumbers: weekNumbers
            };
        }
        function changeMonth(value, is_offset) {
            if (is_offset === void 0) { is_offset = true; }
            var delta = is_offset ? value : value - self.currentMonth;
            if ((delta < 0 && self._hidePrevMonthArrow === true) ||
                (delta > 0 && self._hideNextMonthArrow === true))
                return;
            self.currentMonth += delta;
            if (self.currentMonth < 0 || self.currentMonth > 11) {
                self.currentYear += self.currentMonth > 11 ? 1 : -1;
                self.currentMonth = (self.currentMonth + 12) % 12;
                triggerEvent("onYearChange");
            }
            buildDays();
            triggerEvent("onMonthChange");
            updateNavigationCurrentMonth();
        }
        function clear(triggerChangeEvent, toInitial) {
            if (triggerChangeEvent === void 0) { triggerChangeEvent = true; }
            if (toInitial === void 0) { toInitial = true; }
            self.input.value = "";
            if (self.altInput !== undefined)
                self.altInput.value = "";
            if (self.mobileInput !== undefined)
                self.mobileInput.value = "";
            self.selectedDates = [];
            self.latestSelectedDateObj = undefined;
            if (toInitial === true) {
                self.currentYear = self._initialDate.getFullYear();
                self.currentMonth = self._initialDate.getMonth();
            }
            self.showTimeInput = false;
            if (self.config.enableTime === true) {
                setDefaultHours();
            }
            self.redraw();
            if (triggerChangeEvent)
                // triggerChangeEvent is true (default) or an Event
                triggerEvent("onChange");
        }
        function close() {
            self.isOpen = false;
            if (!self.isMobile) {
                if (self.calendarContainer !== undefined) {
                    self.calendarContainer.classList.remove("open");
                }
                if (self._input !== undefined) {
                    self._input.classList.remove("active");
                }
            }
            triggerEvent("onClose");
        }
        function destroy() {
            if (self.config !== undefined)
                triggerEvent("onDestroy");
            for (var i = self._handlers.length; i--;) {
                var h = self._handlers[i];
                h.element.removeEventListener(h.event, h.handler, h.options);
            }
            self._handlers = [];
            if (self.mobileInput) {
                if (self.mobileInput.parentNode)
                    self.mobileInput.parentNode.removeChild(self.mobileInput);
                self.mobileInput = undefined;
            }
            else if (self.calendarContainer && self.calendarContainer.parentNode) {
                if (self.config.static && self.calendarContainer.parentNode) {
                    var wrapper = self.calendarContainer.parentNode;
                    wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
                    if (wrapper.parentNode) {
                        while (wrapper.firstChild)
                            wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
                        wrapper.parentNode.removeChild(wrapper);
                    }
                }
                else
                    self.calendarContainer.parentNode.removeChild(self.calendarContainer);
            }
            if (self.altInput) {
                self.input.type = "text";
                if (self.altInput.parentNode)
                    self.altInput.parentNode.removeChild(self.altInput);
                delete self.altInput;
            }
            if (self.input) {
                self.input.type = self.input._type;
                self.input.classList.remove("flatpickr-input");
                self.input.removeAttribute("readonly");
                self.input.value = "";
            }
            [
                "_showTimeInput",
                "latestSelectedDateObj",
                "_hideNextMonthArrow",
                "_hidePrevMonthArrow",
                "__hideNextMonthArrow",
                "__hidePrevMonthArrow",
                "isMobile",
                "isOpen",
                "selectedDateElem",
                "minDateHasTime",
                "maxDateHasTime",
                "days",
                "daysContainer",
                "_input",
                "_positionElement",
                "innerContainer",
                "rContainer",
                "monthNav",
                "todayDateElem",
                "calendarContainer",
                "weekdayContainer",
                "prevMonthNav",
                "nextMonthNav",
                "currentMonthElement",
                "currentYearElement",
                "navigationCurrentMonth",
                "selectedDateElem",
                "config",
            ].forEach(function (k) {
                try {
                    delete self[k];
                }
                catch (_) { }
            });
        }
        function isCalendarElem(elem) {
            if (self.config.appendTo && self.config.appendTo.contains(elem))
                return true;
            return self.calendarContainer.contains(elem);
        }
        function documentClick(e) {
            if (self.isOpen && !self.config.inline) {
                var eventTarget_1 = getEventTarget(e);
                var isCalendarElement = isCalendarElem(eventTarget_1);
                var isInput = eventTarget_1 === self.input ||
                    eventTarget_1 === self.altInput ||
                    self.element.contains(eventTarget_1) ||
                    // web components
                    // e.path is not present in all browsers. circumventing typechecks
                    (e.path &&
                        e.path.indexOf &&
                        (~e.path.indexOf(self.input) ||
                            ~e.path.indexOf(self.altInput)));
                var lostFocus = e.type === "blur"
                    ? isInput &&
                        e.relatedTarget &&
                        !isCalendarElem(e.relatedTarget)
                    : !isInput &&
                        !isCalendarElement &&
                        !isCalendarElem(e.relatedTarget);
                var isIgnored = !self.config.ignoredFocusElements.some(function (elem) {
                    return elem.contains(eventTarget_1);
                });
                if (lostFocus && isIgnored) {
                    self.close();
                    if (self.config.mode === "range" && self.selectedDates.length === 1) {
                        self.clear(false);
                        self.redraw();
                    }
                }
            }
        }
        function changeYear(newYear) {
            if (!newYear ||
                (self.config.minDate && newYear < self.config.minDate.getFullYear()) ||
                (self.config.maxDate && newYear > self.config.maxDate.getFullYear()))
                return;
            var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
            self.currentYear = newYearNum || self.currentYear;
            if (self.config.maxDate &&
                self.currentYear === self.config.maxDate.getFullYear()) {
                self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
            }
            else if (self.config.minDate &&
                self.currentYear === self.config.minDate.getFullYear()) {
                self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
            }
            if (isNewYear) {
                self.redraw();
                triggerEvent("onYearChange");
            }
        }
        function isEnabled(date, timeless) {
            if (timeless === void 0) { timeless = true; }
            var dateToCheck = self.parseDate(date, undefined, timeless); // timeless
            if ((self.config.minDate &&
                dateToCheck &&
                compareDates(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0) ||
                (self.config.maxDate &&
                    dateToCheck &&
                    compareDates(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0))
                return false;
            if (self.config.enable.length === 0 && self.config.disable.length === 0)
                return true;
            if (dateToCheck === undefined)
                return false;
            var bool = self.config.enable.length > 0, array = bool ? self.config.enable : self.config.disable;
            for (var i = 0, d = void 0; i < array.length; i++) {
                d = array[i];
                if (typeof d === "function" &&
                    d(dateToCheck) // disabled by function
                )
                    return bool;
                else if (d instanceof Date &&
                    dateToCheck !== undefined &&
                    d.getTime() === dateToCheck.getTime())
                    // disabled by date
                    return bool;
                else if (typeof d === "string" && dateToCheck !== undefined) {
                    // disabled by date string
                    var parsed = self.parseDate(d, undefined, true);
                    return parsed && parsed.getTime() === dateToCheck.getTime()
                        ? bool
                        : !bool;
                }
                else if (
                // disabled by range
                typeof d === "object" &&
                    dateToCheck !== undefined &&
                    d.from &&
                    d.to &&
                    dateToCheck.getTime() >= d.from.getTime() &&
                    dateToCheck.getTime() <= d.to.getTime())
                    return bool;
            }
            return !bool;
        }
        function isInView(elem) {
            if (self.daysContainer !== undefined)
                return (elem.className.indexOf("hidden") === -1 &&
                    self.daysContainer.contains(elem));
            return false;
        }
        function onKeyDown(e) {
            // e.key                      e.keyCode
            // "Backspace"                        8
            // "Tab"                              9
            // "Enter"                           13
            // "Escape"     (IE "Esc")           27
            // "ArrowLeft"  (IE "Left")          37
            // "ArrowUp"    (IE "Up")            38
            // "ArrowRight" (IE "Right")         39
            // "ArrowDown"  (IE "Down")          40
            // "Delete"     (IE "Del")           46
            var isInput = e.target === self._input;
            var allowInput = self.config.allowInput;
            var allowKeydown = self.isOpen && (!allowInput || !isInput);
            var allowInlineKeydown = self.config.inline && isInput && !allowInput;
            if (e.keyCode === 13 && isInput) {
                if (allowInput) {
                    self.setDate(self._input.value, true, e.target === self.altInput
                        ? self.config.altFormat
                        : self.config.dateFormat);
                    return e.target.blur();
                }
                else
                    self.open();
            }
            else if (isCalendarElem(e.target) ||
                allowKeydown ||
                allowInlineKeydown) {
                var isTimeObj = !!self.timeContainer &&
                    self.timeContainer.contains(e.target);
                switch (e.keyCode) {
                    case 13:
                        if (isTimeObj) {
                            updateTime();
                            focusAndClose();
                        }
                        else
                            selectDate(e);
                        break;
                    case 27: // escape
                        e.preventDefault();
                        focusAndClose();
                        break;
                    case 8:
                    case 46:
                        if (isInput && !self.config.allowInput) {
                            e.preventDefault();
                            self.clear();
                        }
                        break;
                    case 37:
                    case 39:
                        if (!isTimeObj) {
                            e.preventDefault();
                            if (self.daysContainer !== undefined &&
                                (allowInput === false ||
                                    (document.activeElement && isInView(document.activeElement)))) {
                                var delta_1 = e.keyCode === 39 ? 1 : -1;
                                if (!e.ctrlKey)
                                    focusOnDay(undefined, delta_1);
                                else {
                                    e.stopPropagation();
                                    changeMonth(delta_1);
                                    focusOnDay(getFirstAvailableDay(1), 0);
                                }
                            }
                        }
                        else if (self.hourElement)
                            self.hourElement.focus();
                        break;
                    case 38:
                    case 40:
                        e.preventDefault();
                        var delta = e.keyCode === 40 ? 1 : -1;
                        if ((self.daysContainer && e.target.$i !== undefined) ||
                            e.target === self.input) {
                            if (e.ctrlKey) {
                                e.stopPropagation();
                                changeYear(self.currentYear - delta);
                                focusOnDay(getFirstAvailableDay(1), 0);
                            }
                            else if (!isTimeObj)
                                focusOnDay(undefined, delta * 7);
                        }
                        else if (self.config.enableTime) {
                            if (!isTimeObj && self.hourElement)
                                self.hourElement.focus();
                            updateTime(e);
                            self._debouncedChange();
                        }
                        break;
                    case 9:
                        if (isTimeObj) {
                            var elems = [
                                self.hourElement,
                                self.minuteElement,
                                self.secondElement,
                                self.amPM,
                            ].filter(function (x) { return x; });
                            var i = elems.indexOf(e.target);
                            if (i !== -1) {
                                var target = elems[i + (e.shiftKey ? -1 : 1)];
                                if (target !== undefined) {
                                    e.preventDefault();
                                    target.focus();
                                }
                                else if (e.shiftKey) {
                                    e.preventDefault();
                                    self._input.focus();
                                }
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
            if (self.amPM !== undefined && e.target === self.amPM) {
                switch (e.key) {
                    case self.l10n.amPM[0].charAt(0):
                    case self.l10n.amPM[0].charAt(0).toLowerCase():
                        self.amPM.textContent = self.l10n.amPM[0];
                        setHoursFromInputs();
                        updateValue();
                        break;
                    case self.l10n.amPM[1].charAt(0):
                    case self.l10n.amPM[1].charAt(0).toLowerCase():
                        self.amPM.textContent = self.l10n.amPM[1];
                        setHoursFromInputs();
                        updateValue();
                        break;
                }
            }
            triggerEvent("onKeyDown", e);
        }
        function onMouseOver(elem) {
            if (self.selectedDates.length !== 1 ||
                (elem &&
                    (!elem.classList.contains("flatpickr-day") ||
                        elem.classList.contains("disabled"))))
                return;
            var hoverDate = elem
                ? elem.dateObj.getTime()
                : self.days.firstElementChild.dateObj.getTime(), initialDate = self.parseDate(self.selectedDates[0], undefined, true).getTime(), rangeStartDate = Math.min(hoverDate, self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self.selectedDates[0].getTime()), lastDate = self.daysContainer.lastChild
                .lastChild.dateObj.getTime();
            var containsDisabled = false;
            var minRange = 0, maxRange = 0;
            for (var t = rangeStartDate; t < lastDate; t += duration.DAY) {
                if (!isEnabled(new Date(t), true)) {
                    containsDisabled =
                        containsDisabled || (t > rangeStartDate && t < rangeEndDate);
                    if (t < initialDate && (!minRange || t > minRange))
                        minRange = t;
                    else if (t > initialDate && (!maxRange || t < maxRange))
                        maxRange = t;
                }
            }
            for (var m = 0; m < self.config.showMonths; m++) {
                var month = self.daysContainer.children[m];
                var prevMonth = self.daysContainer.children[m - 1];
                var _loop_1 = function (i, l) {
                    var dayElem = month.children[i], date = dayElem.dateObj;
                    var timestamp = date.getTime();
                    var outOfRange = (minRange > 0 && timestamp < minRange) ||
                        (maxRange > 0 && timestamp > maxRange);
                    if (outOfRange) {
                        dayElem.classList.add("notAllowed");
                        ["inRange", "startRange", "endRange"].forEach(function (c) {
                            dayElem.classList.remove(c);
                        });
                        return "continue";
                    }
                    else if (containsDisabled && !outOfRange)
                        return "continue";
                    ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
                        dayElem.classList.remove(c);
                    });
                    if (elem !== undefined) {
                        elem.classList.add(hoverDate < self.selectedDates[0].getTime()
                            ? "startRange"
                            : "endRange");
                        if (month.contains(elem) ||
                            !(m > 0 &&
                                prevMonth &&
                                prevMonth.lastChild.dateObj.getTime() >= timestamp)) {
                            if (initialDate < hoverDate && timestamp === initialDate)
                                dayElem.classList.add("startRange");
                            else if (initialDate > hoverDate && timestamp === initialDate)
                                dayElem.classList.add("endRange");
                            if (timestamp >= minRange &&
                                (maxRange === 0 || timestamp <= maxRange) &&
                                isBetween(timestamp, initialDate, hoverDate))
                                dayElem.classList.add("inRange");
                        }
                    }
                };
                for (var i = 0, l = month.children.length; i < l; i++) {
                    _loop_1(i, l);
                }
            }
        }
        function onResize() {
            if (self.isOpen && !self.config.static && !self.config.inline)
                positionCalendar();
        }
        function setDefaultTime() {
            self.setDate(self.config.minDate !== undefined
                ? new Date(self.config.minDate.getTime())
                : new Date(), false);
            setDefaultHours();
            updateValue();
        }
        function open(e, positionElement) {
            if (positionElement === void 0) { positionElement = self._positionElement; }
            if (self.isMobile === true) {
                if (e) {
                    e.preventDefault();
                    e.target && e.target.blur();
                }
                if (self.mobileInput !== undefined) {
                    self.mobileInput.focus();
                    self.mobileInput.click();
                }
                triggerEvent("onOpen");
                return;
            }
            if (self._input.disabled || self.config.inline)
                return;
            var wasOpen = self.isOpen;
            self.isOpen = true;
            if (!wasOpen) {
                self.calendarContainer.classList.add("open");
                self._input.classList.add("active");
                triggerEvent("onOpen");
                positionCalendar(positionElement);
            }
            if (self.config.enableTime === true && self.config.noCalendar === true) {
                if (self.selectedDates.length === 0) {
                    setDefaultTime();
                }
                if (self.config.allowInput === false &&
                    (e === undefined ||
                        !self.timeContainer.contains(e.relatedTarget))) {
                    setTimeout(function () { return self.hourElement.select(); }, 50);
                }
            }
        }
        function minMaxDateSetter(type) {
            return function (date) {
                var dateObj = (self.config["_" + type + "Date"] = self.parseDate(date, self.config.dateFormat));
                var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
                if (dateObj !== undefined) {
                    self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] =
                        dateObj.getHours() > 0 ||
                            dateObj.getMinutes() > 0 ||
                            dateObj.getSeconds() > 0;
                }
                if (self.selectedDates) {
                    self.selectedDates = self.selectedDates.filter(function (d) { return isEnabled(d); });
                    if (!self.selectedDates.length && type === "min")
                        setHoursFromDate(dateObj);
                    updateValue();
                }
                if (self.daysContainer) {
                    redraw();
                    if (dateObj !== undefined)
                        self.currentYearElement[type] = dateObj.getFullYear().toString();
                    else
                        self.currentYearElement.removeAttribute(type);
                    self.currentYearElement.disabled =
                        !!inverseDateObj &&
                            dateObj !== undefined &&
                            inverseDateObj.getFullYear() === dateObj.getFullYear();
                }
            };
        }
        function parseConfig() {
            var boolOpts = [
                "wrap",
                "weekNumbers",
                "allowInput",
                "clickOpens",
                "time_24hr",
                "enableTime",
                "noCalendar",
                "altInput",
                "shorthandCurrentMonth",
                "inline",
                "static",
                "enableSeconds",
                "disableMobile",
            ];
            var userConfig = __assign({}, instanceConfig, JSON.parse(JSON.stringify(element.dataset || {})));
            var formats = {};
            self.config.parseDate = userConfig.parseDate;
            self.config.formatDate = userConfig.formatDate;
            Object.defineProperty(self.config, "enable", {
                get: function () { return self.config._enable; },
                set: function (dates) {
                    self.config._enable = parseDateRules(dates);
                }
            });
            Object.defineProperty(self.config, "disable", {
                get: function () { return self.config._disable; },
                set: function (dates) {
                    self.config._disable = parseDateRules(dates);
                }
            });
            var timeMode = userConfig.mode === "time";
            if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
                formats.dateFormat =
                    userConfig.noCalendar || timeMode
                        ? "H:i" + (userConfig.enableSeconds ? ":S" : "")
                        : flatpickr.defaultConfig.dateFormat +
                            " H:i" +
                            (userConfig.enableSeconds ? ":S" : "");
            }
            if (userConfig.altInput &&
                (userConfig.enableTime || timeMode) &&
                !userConfig.altFormat) {
                formats.altFormat =
                    userConfig.noCalendar || timeMode
                        ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K")
                        : flatpickr.defaultConfig.altFormat +
                            (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
            }
            Object.defineProperty(self.config, "minDate", {
                get: function () { return self.config._minDate; },
                set: minMaxDateSetter("min")
            });
            Object.defineProperty(self.config, "maxDate", {
                get: function () { return self.config._maxDate; },
                set: minMaxDateSetter("max")
            });
            var minMaxTimeSetter = function (type) { return function (val) {
                self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i");
            }; };
            Object.defineProperty(self.config, "minTime", {
                get: function () { return self.config._minTime; },
                set: minMaxTimeSetter("min")
            });
            Object.defineProperty(self.config, "maxTime", {
                get: function () { return self.config._maxTime; },
                set: minMaxTimeSetter("max")
            });
            if (userConfig.mode === "time") {
                self.config.noCalendar = true;
                self.config.enableTime = true;
            }
            Object.assign(self.config, formats, userConfig);
            for (var i = 0; i < boolOpts.length; i++)
                self.config[boolOpts[i]] =
                    self.config[boolOpts[i]] === true ||
                        self.config[boolOpts[i]] === "true";
            HOOKS.filter(function (hook) { return self.config[hook] !== undefined; }).forEach(function (hook) {
                self.config[hook] = arrayify(self.config[hook] || []).map(bindToInstance);
            });
            self.isMobile =
                !self.config.disableMobile &&
                    !self.config.inline &&
                    self.config.mode === "single" &&
                    !self.config.disable.length &&
                    !self.config.enable.length &&
                    !self.config.weekNumbers &&
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            for (var i = 0; i < self.config.plugins.length; i++) {
                var pluginConf = self.config.plugins[i](self) || {};
                for (var key in pluginConf) {
                    if (HOOKS.indexOf(key) > -1) {
                        self.config[key] = arrayify(pluginConf[key])
                            .map(bindToInstance)
                            .concat(self.config[key]);
                    }
                    else if (typeof userConfig[key] === "undefined")
                        self.config[key] = pluginConf[key];
                }
            }
            triggerEvent("onParseConfig");
        }
        function setupLocale() {
            if (typeof self.config.locale !== "object" &&
                typeof flatpickr.l10ns[self.config.locale] === "undefined")
                self.config.errorHandler(new Error("flatpickr: invalid locale " + self.config.locale));
            self.l10n = __assign({}, flatpickr.l10ns["default"], (typeof self.config.locale === "object"
                ? self.config.locale
                : self.config.locale !== "default"
                    ? flatpickr.l10ns[self.config.locale]
                    : undefined));
            tokenRegex.K = "(" + self.l10n.amPM[0] + "|" + self.l10n.amPM[1] + "|" + self.l10n.amPM[0].toLowerCase() + "|" + self.l10n.amPM[1].toLowerCase() + ")";
            self.formatDate = createDateFormatter(self);
            self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
        }
        function positionCalendar(customPositionElement) {
            if (self.calendarContainer === undefined)
                return;
            triggerEvent("onPreCalendarPosition");
            var positionElement = customPositionElement || self._positionElement;
            var calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, (function (acc, child) { return acc + child.offsetHeight; }), 0), calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" ||
                (configPosVertical !== "below" &&
                    distanceFromBottom < calendarHeight &&
                    inputBounds.top > calendarHeight);
            var top = window.pageYOffset +
                inputBounds.top +
                (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
            toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
            toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
            if (self.config.inline)
                return;
            var left = window.pageXOffset +
                inputBounds.left -
                (configPosHorizontal != null && configPosHorizontal === "center"
                    ? (calendarWidth - inputBounds.width) / 2
                    : 0);
            var right = window.document.body.offsetWidth - inputBounds.right;
            var rightMost = left + calendarWidth > window.document.body.offsetWidth;
            var centerMost = right + calendarWidth > window.document.body.offsetWidth;
            toggleClass(self.calendarContainer, "rightMost", rightMost);
            if (self.config.static)
                return;
            self.calendarContainer.style.top = top + "px";
            if (!rightMost) {
                self.calendarContainer.style.left = left + "px";
                self.calendarContainer.style.right = "auto";
            }
            else if (!centerMost) {
                self.calendarContainer.style.left = "auto";
                self.calendarContainer.style.right = right + "px";
            }
            else {
                var doc = document.styleSheets[0];
                // some testing environments don't have css support
                if (doc === undefined)
                    return;
                var bodyWidth = window.document.body.offsetWidth;
                var centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
                var centerBefore = ".flatpickr-calendar.centerMost:before";
                var centerAfter = ".flatpickr-calendar.centerMost:after";
                var centerIndex = doc.cssRules.length;
                var centerStyle = "{left:" + inputBounds.left + "px;right:auto;}";
                toggleClass(self.calendarContainer, "rightMost", false);
                toggleClass(self.calendarContainer, "centerMost", true);
                doc.insertRule(centerBefore + "," + centerAfter + centerStyle, centerIndex);
                self.calendarContainer.style.left = centerLeft + "px";
                self.calendarContainer.style.right = "auto";
            }
        }
        function redraw() {
            if (self.config.noCalendar || self.isMobile)
                return;
            updateNavigationCurrentMonth();
            buildDays();
        }
        function focusAndClose() {
            self._input.focus();
            if (window.navigator.userAgent.indexOf("MSIE") !== -1 ||
                navigator.msMaxTouchPoints !== undefined) {
                // hack - bugs in the way IE handles focus keeps the calendar open
                setTimeout(self.close, 0);
            }
            else {
                self.close();
            }
        }
        function selectDate(e) {
            e.preventDefault();
            e.stopPropagation();
            var isSelectable = function (day) {
                return day.classList &&
                    day.classList.contains("flatpickr-day") &&
                    !day.classList.contains("disabled") &&
                    !day.classList.contains("notAllowed");
            };
            var t = findParent(e.target, isSelectable);
            if (t === undefined)
                return;
            var target = t;
            var selectedDate = (self.latestSelectedDateObj = new Date(target.dateObj.getTime()));
            var shouldChangeMonth = (selectedDate.getMonth() < self.currentMonth ||
                selectedDate.getMonth() >
                    self.currentMonth + self.config.showMonths - 1) &&
                self.config.mode !== "range";
            self.selectedDateElem = target;
            if (self.config.mode === "single")
                self.selectedDates = [selectedDate];
            else if (self.config.mode === "multiple") {
                var selectedIndex = isDateSelected(selectedDate);
                if (selectedIndex)
                    self.selectedDates.splice(parseInt(selectedIndex), 1);
                else
                    self.selectedDates.push(selectedDate);
            }
            else if (self.config.mode === "range") {
                if (self.selectedDates.length === 2) {
                    self.clear(false, false);
                }
                self.latestSelectedDateObj = selectedDate;
                self.selectedDates.push(selectedDate);
                // unless selecting same date twice, sort ascendingly
                if (compareDates(selectedDate, self.selectedDates[0], true) !== 0)
                    self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
            }
            setHoursFromInputs();
            if (shouldChangeMonth) {
                var isNewYear = self.currentYear !== selectedDate.getFullYear();
                self.currentYear = selectedDate.getFullYear();
                self.currentMonth = selectedDate.getMonth();
                if (isNewYear)
                    triggerEvent("onYearChange");
                triggerEvent("onMonthChange");
            }
            updateNavigationCurrentMonth();
            buildDays();
            updateValue();
            if (self.config.enableTime)
                setTimeout(function () { return (self.showTimeInput = true); }, 50);
            // maintain focus
            if (!shouldChangeMonth &&
                self.config.mode !== "range" &&
                self.config.showMonths === 1)
                focusOnDayElem(target);
            else if (self.selectedDateElem !== undefined &&
                self.hourElement === undefined) {
                self.selectedDateElem && self.selectedDateElem.focus();
            }
            if (self.hourElement !== undefined)
                self.hourElement !== undefined && self.hourElement.focus();
            if (self.config.closeOnSelect) {
                var single = self.config.mode === "single" && !self.config.enableTime;
                var range = self.config.mode === "range" &&
                    self.selectedDates.length === 2 &&
                    !self.config.enableTime;
                if (single || range) {
                    focusAndClose();
                }
            }
            triggerChange();
        }
        var CALLBACKS = {
            locale: [setupLocale, updateWeekdays],
            showMonths: [buildMonths, setCalendarWidth, buildWeekdays]
        };
        function set(option, value) {
            if (option !== null && typeof option === "object")
                Object.assign(self.config, option);
            else {
                self.config[option] = value;
                if (CALLBACKS[option] !== undefined)
                    CALLBACKS[option].forEach(function (x) { return x(); });
                else if (HOOKS.indexOf(option) > -1)
                    self.config[option] = arrayify(value);
            }
            self.redraw();
            updateValue(false);
        }
        function setSelectedDate(inputDate, format) {
            var dates = [];
            if (inputDate instanceof Array)
                dates = inputDate.map(function (d) { return self.parseDate(d, format); });
            else if (inputDate instanceof Date || typeof inputDate === "number")
                dates = [self.parseDate(inputDate, format)];
            else if (typeof inputDate === "string") {
                switch (self.config.mode) {
                    case "single":
                    case "time":
                        dates = [self.parseDate(inputDate, format)];
                        break;
                    case "multiple":
                        dates = inputDate
                            .split(self.config.conjunction)
                            .map(function (date) { return self.parseDate(date, format); });
                        break;
                    case "range":
                        dates = inputDate
                            .split(self.l10n.rangeSeparator)
                            .map(function (date) { return self.parseDate(date, format); });
                        break;
                    default:
                        break;
                }
            }
            else
                self.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(inputDate)));
            self.selectedDates = dates.filter(function (d) { return d instanceof Date && isEnabled(d, false); });
            if (self.config.mode === "range")
                self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
        }
        function setDate(date, triggerChange, format) {
            if (triggerChange === void 0) { triggerChange = false; }
            if (format === void 0) { format = self.config.dateFormat; }
            if ((date !== 0 && !date) || (date instanceof Array && date.length === 0))
                return self.clear(triggerChange);
            setSelectedDate(date, format);
            self.showTimeInput = self.selectedDates.length > 0;
            self.latestSelectedDateObj = self.selectedDates[0];
            self.redraw();
            jumpToDate();
            setHoursFromDate();
            updateValue(triggerChange);
            if (triggerChange)
                triggerEvent("onChange");
        }
        function parseDateRules(arr) {
            return arr
                .slice()
                .map(function (rule) {
                if (typeof rule === "string" ||
                    typeof rule === "number" ||
                    rule instanceof Date) {
                    return self.parseDate(rule, undefined, true);
                }
                else if (rule &&
                    typeof rule === "object" &&
                    rule.from &&
                    rule.to)
                    return {
                        from: self.parseDate(rule.from, undefined),
                        to: self.parseDate(rule.to, undefined)
                    };
                return rule;
            })
                .filter(function (x) { return x; }); // remove falsy values
        }
        function setupDates() {
            self.selectedDates = [];
            self.now = self.parseDate(self.config.now) || new Date();
            // Workaround IE11 setting placeholder as the input's value
            var preloadedDate = self.config.defaultDate ||
                ((self.input.nodeName === "INPUT" ||
                    self.input.nodeName === "TEXTAREA") &&
                    self.input.placeholder &&
                    self.input.value === self.input.placeholder
                    ? null
                    : self.input.value);
            if (preloadedDate)
                setSelectedDate(preloadedDate, self.config.dateFormat);
            self._initialDate =
                self.selectedDates.length > 0
                    ? self.selectedDates[0]
                    : self.config.minDate &&
                        self.config.minDate.getTime() > self.now.getTime()
                        ? self.config.minDate
                        : self.config.maxDate &&
                            self.config.maxDate.getTime() < self.now.getTime()
                            ? self.config.maxDate
                            : self.now;
            self.currentYear = self._initialDate.getFullYear();
            self.currentMonth = self._initialDate.getMonth();
            if (self.selectedDates.length > 0)
                self.latestSelectedDateObj = self.selectedDates[0];
            if (self.config.minTime !== undefined)
                self.config.minTime = self.parseDate(self.config.minTime, "H:i");
            if (self.config.maxTime !== undefined)
                self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
            self.minDateHasTime =
                !!self.config.minDate &&
                    (self.config.minDate.getHours() > 0 ||
                        self.config.minDate.getMinutes() > 0 ||
                        self.config.minDate.getSeconds() > 0);
            self.maxDateHasTime =
                !!self.config.maxDate &&
                    (self.config.maxDate.getHours() > 0 ||
                        self.config.maxDate.getMinutes() > 0 ||
                        self.config.maxDate.getSeconds() > 0);
            Object.defineProperty(self, "showTimeInput", {
                get: function () { return self._showTimeInput; },
                set: function (bool) {
                    self._showTimeInput = bool;
                    if (self.calendarContainer)
                        toggleClass(self.calendarContainer, "showTimeInput", bool);
                    self.isOpen && positionCalendar();
                }
            });
        }
        function setupInputs() {
            self.input = self.config.wrap
                ? element.querySelector("[data-input]")
                : element;
            /* istanbul ignore next */
            if (!self.input) {
                self.config.errorHandler(new Error("Invalid input element specified"));
                return;
            }
            // hack: store previous type to restore it after destroy()
            self.input._type = self.input.type;
            self.input.type = "text";
            self.input.classList.add("flatpickr-input");
            self._input = self.input;
            if (self.config.altInput) {
                // replicate self.element
                self.altInput = createElement(self.input.nodeName, self.input.className + " " + self.config.altInputClass);
                self._input = self.altInput;
                self.altInput.placeholder = self.input.placeholder;
                self.altInput.disabled = self.input.disabled;
                self.altInput.required = self.input.required;
                self.altInput.tabIndex = self.input.tabIndex;
                self.altInput.type = "text";
                self.input.setAttribute("type", "hidden");
                if (!self.config.static && self.input.parentNode)
                    self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
            }
            if (!self.config.allowInput)
                self._input.setAttribute("readonly", "readonly");
            self._positionElement = self.config.positionElement || self._input;
        }
        function setupMobile() {
            var inputType = self.config.enableTime
                ? self.config.noCalendar
                    ? "time"
                    : "datetime-local"
                : "date";
            self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
            self.mobileInput.step = self.input.getAttribute("step") || "any";
            self.mobileInput.tabIndex = 1;
            self.mobileInput.type = inputType;
            self.mobileInput.disabled = self.input.disabled;
            self.mobileInput.required = self.input.required;
            self.mobileInput.placeholder = self.input.placeholder;
            self.mobileFormatStr =
                inputType === "datetime-local"
                    ? "Y-m-d\\TH:i:S"
                    : inputType === "date"
                        ? "Y-m-d"
                        : "H:i:S";
            if (self.selectedDates.length > 0) {
                self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
            }
            if (self.config.minDate)
                self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
            if (self.config.maxDate)
                self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
            self.input.type = "hidden";
            if (self.altInput !== undefined)
                self.altInput.type = "hidden";
            try {
                if (self.input.parentNode)
                    self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
            }
            catch (_a) { }
            bind(self.mobileInput, "change", function (e) {
                self.setDate(e.target.value, false, self.mobileFormatStr);
                triggerEvent("onChange");
                triggerEvent("onClose");
            });
        }
        function toggle(e) {
            if (self.isOpen === true)
                return self.close();
            self.open(e);
        }
        function triggerEvent(event, data) {
            // If the instance has been destroyed already, all hooks have been removed
            if (self.config === undefined)
                return;
            var hooks = self.config[event];
            if (hooks !== undefined && hooks.length > 0) {
                for (var i = 0; hooks[i] && i < hooks.length; i++)
                    hooks[i](self.selectedDates, self.input.value, self, data);
            }
            if (event === "onChange") {
                self.input.dispatchEvent(createEvent("change"));
                // many front-end frameworks bind to the input event
                self.input.dispatchEvent(createEvent("input"));
            }
        }
        function createEvent(name) {
            var e = document.createEvent("Event");
            e.initEvent(name, true, true);
            return e;
        }
        function isDateSelected(date) {
            for (var i = 0; i < self.selectedDates.length; i++) {
                if (compareDates(self.selectedDates[i], date) === 0)
                    return "" + i;
            }
            return false;
        }
        function isDateInRange(date) {
            if (self.config.mode !== "range" || self.selectedDates.length < 2)
                return false;
            return (compareDates(date, self.selectedDates[0]) >= 0 &&
                compareDates(date, self.selectedDates[1]) <= 0);
        }
        function updateNavigationCurrentMonth() {
            if (self.config.noCalendar || self.isMobile || !self.monthNav)
                return;
            self.yearElements.forEach(function (yearElement, i) {
                var d = new Date(self.currentYear, self.currentMonth, 1);
                d.setMonth(self.currentMonth + i);
                self.monthElements[i].textContent =
                    monthToStr(d.getMonth(), self.config.shorthandCurrentMonth, self.l10n) +
                        " ";
                yearElement.value = d.getFullYear().toString();
            });
            self._hidePrevMonthArrow =
                self.config.minDate !== undefined &&
                    (self.currentYear === self.config.minDate.getFullYear()
                        ? self.currentMonth <= self.config.minDate.getMonth()
                        : self.currentYear < self.config.minDate.getFullYear());
            self._hideNextMonthArrow =
                self.config.maxDate !== undefined &&
                    (self.currentYear === self.config.maxDate.getFullYear()
                        ? self.currentMonth + 1 > self.config.maxDate.getMonth()
                        : self.currentYear > self.config.maxDate.getFullYear());
        }
        function getDateStr(format) {
            return self.selectedDates
                .map(function (dObj) { return self.formatDate(dObj, format); })
                .filter(function (d, i, arr) {
                return self.config.mode !== "range" ||
                    self.config.enableTime ||
                    arr.indexOf(d) === i;
            })
                .join(self.config.mode !== "range"
                ? self.config.conjunction
                : self.l10n.rangeSeparator);
        }
        /**
         * Updates the values of inputs associated with the calendar
         */
        function updateValue(triggerChange) {
            if (triggerChange === void 0) { triggerChange = true; }
            if (self.selectedDates.length === 0)
                return self.clear(triggerChange);
            if (self.mobileInput !== undefined && self.mobileFormatStr) {
                self.mobileInput.value =
                    self.latestSelectedDateObj !== undefined
                        ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr)
                        : "";
            }
            self.input.value = getDateStr(self.config.dateFormat);
            if (self.altInput !== undefined) {
                self.altInput.value = getDateStr(self.config.altFormat);
            }
            if (triggerChange !== false)
                triggerEvent("onValueUpdate");
        }
        function onMonthNavClick(e) {
            e.preventDefault();
            var isPrevMonth = self.prevMonthNav.contains(e.target);
            var isNextMonth = self.nextMonthNav.contains(e.target);
            if (isPrevMonth || isNextMonth) {
                changeMonth(isPrevMonth ? -1 : 1);
            }
            else if (self.yearElements.indexOf(e.target) >= 0) {
                e.target.select();
            }
            else if (e.target.classList.contains("arrowUp")) {
                self.changeYear(self.currentYear + 1);
            }
            else if (e.target.classList.contains("arrowDown")) {
                self.changeYear(self.currentYear - 1);
            }
        }
        function timeWrapper(e) {
            e.preventDefault();
            var isKeyDown = e.type === "keydown", input = e.target;
            if (self.amPM !== undefined && e.target === self.amPM) {
                self.amPM.textContent =
                    self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
            }
            var min = parseFloat(input.getAttribute("min")), max = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e.delta ||
                (isKeyDown ? (e.which === 38 ? 1 : -1) : 0);
            var newValue = curValue + step * delta;
            if (typeof input.value !== "undefined" && input.value.length === 2) {
                var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
                if (newValue < min) {
                    newValue =
                        max +
                            newValue +
                            int(!isHourElem) +
                            (int(isHourElem) && int(!self.amPM));
                    if (isMinuteElem)
                        incrementNumInput(undefined, -1, self.hourElement);
                }
                else if (newValue > max) {
                    newValue =
                        input === self.hourElement ? newValue - max - int(!self.amPM) : min;
                    if (isMinuteElem)
                        incrementNumInput(undefined, 1, self.hourElement);
                }
                if (self.amPM &&
                    isHourElem &&
                    (step === 1
                        ? newValue + curValue === 23
                        : Math.abs(newValue - curValue) > step)) {
                    self.amPM.textContent =
                        self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
                }
                input.value = pad(newValue);
            }
        }
        init();
        return self;
    }
    /* istanbul ignore next */
    function _flatpickr(nodeList, config) {
        // static list
        var nodes = Array.prototype.slice
            .call(nodeList)
            .filter(function (x) { return x instanceof HTMLElement; });
        var instances = [];
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            try {
                if (node.getAttribute("data-fp-omit") !== null)
                    continue;
                if (node._flatpickr !== undefined) {
                    node._flatpickr.destroy();
                    node._flatpickr = undefined;
                }
                node._flatpickr = FlatpickrInstance(node, config || {});
                instances.push(node._flatpickr);
            }
            catch (e) {
                console.error(e);
            }
        }
        return instances.length === 1 ? instances[0] : instances;
    }
    /* istanbul ignore next */
    if (typeof HTMLElement !== "undefined") {
        // browser env
        HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
            return _flatpickr(this, config);
        };
        HTMLElement.prototype.flatpickr = function (config) {
            return _flatpickr([this], config);
        };
    }
    /* istanbul ignore next */
    var flatpickr = function (selector, config) {
        if (typeof selector === "string") {
            return _flatpickr(window.document.querySelectorAll(selector), config);
        }
        else if (selector instanceof Node) {
            return _flatpickr([selector], config);
        }
        else {
            return _flatpickr(selector, config);
        }
    };
    /* istanbul ignore next */
    flatpickr.defaultConfig = defaults;
    flatpickr.l10ns = {
        en: __assign({}, english),
        "default": __assign({}, english)
    };
    flatpickr.localize = function (l10n) {
        flatpickr.l10ns["default"] = __assign({}, flatpickr.l10ns["default"], l10n);
    };
    flatpickr.setDefaults = function (config) {
        flatpickr.defaultConfig = __assign({}, flatpickr.defaultConfig, config);
    };
    flatpickr.parseDate = createDateParser({});
    flatpickr.formatDate = createDateFormatter({});
    flatpickr.compareDates = compareDates;
    /* istanbul ignore next */
    if (typeof jQuery !== "undefined") {
        jQuery.fn.flatpickr = function (config) {
            return _flatpickr(this, config);
        };
    }
    Date.prototype.fp_incr = function (days) {
        return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
    };
    if (typeof window !== "undefined") {
        window.flatpickr = flatpickr;
    }

    return flatpickr;

}));

},{}],39:[function(require,module,exports){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.de = {}));
}(this, function (exports) { 'use strict';

  var fp = typeof window !== "undefined" && window.flatpickr !== undefined
      ? window.flatpickr
      : {
          l10ns: {}
      };
  var German = {
      weekdays: {
          shorthand: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
          longhand: [
              "Sonntag",
              "Montag",
              "Dienstag",
              "Mittwoch",
              "Donnerstag",
              "Freitag",
              "Samstag",
          ]
      },
      months: {
          shorthand: [
              "Jan",
              "Feb",
              "Mär",
              "Apr",
              "Mai",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Okt",
              "Nov",
              "Dez",
          ],
          longhand: [
              "Januar",
              "Februar",
              "März",
              "April",
              "Mai",
              "Juni",
              "Juli",
              "August",
              "September",
              "Oktober",
              "November",
              "Dezember",
          ]
      },
      firstDayOfWeek: 1,
      weekAbbreviation: "KW",
      rangeSeparator: " bis ",
      scrollTitle: "Zum Ändern scrollen",
      toggleTitle: "Zum Umschalten klicken"
  };
  fp.l10ns.de = German;
  var de = fp.l10ns;

  exports.German = German;
  exports.default = de;

  Object.defineProperty(exports, '__esModule', { value: true });

}));

},{}],40:[function(require,module,exports){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.fr = {}));
}(this, function (exports) { 'use strict';

  var fp = typeof window !== "undefined" && window.flatpickr !== undefined
      ? window.flatpickr
      : {
          l10ns: {}
      };
  var French = {
      firstDayOfWeek: 1,
      weekdays: {
          shorthand: ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"],
          longhand: [
              "dimanche",
              "lundi",
              "mardi",
              "mercredi",
              "jeudi",
              "vendredi",
              "samedi",
          ]
      },
      months: {
          shorthand: [
              "janv",
              "févr",
              "mars",
              "avr",
              "mai",
              "juin",
              "juil",
              "août",
              "sept",
              "oct",
              "nov",
              "déc",
          ],
          longhand: [
              "janvier",
              "février",
              "mars",
              "avril",
              "mai",
              "juin",
              "juillet",
              "août",
              "septembre",
              "octobre",
              "novembre",
              "décembre",
          ]
      },
      ordinal: function (nth) {
          if (nth > 1)
              return "";
          return "er";
      },
      rangeSeparator: " au ",
      weekAbbreviation: "Sem",
      scrollTitle: "Défiler pour augmenter la valeur",
      toggleTitle: "Cliquer pour basculer"
  };
  fp.l10ns.fr = French;
  var fr = fp.l10ns;

  exports.French = French;
  exports.default = fr;

  Object.defineProperty(exports, '__esModule', { value: true });

}));

},{}],41:[function(require,module,exports){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.it = {}));
}(this, function (exports) { 'use strict';

  var fp = typeof window !== "undefined" && window.flatpickr !== undefined
      ? window.flatpickr
      : {
          l10ns: {}
      };
  var Italian = {
      weekdays: {
          shorthand: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
          longhand: [
              "Domenica",
              "Lunedì",
              "Martedì",
              "Mercoledì",
              "Giovedì",
              "Venerdì",
              "Sabato",
          ]
      },
      months: {
          shorthand: [
              "Gen",
              "Feb",
              "Mar",
              "Apr",
              "Mag",
              "Giu",
              "Lug",
              "Ago",
              "Set",
              "Ott",
              "Nov",
              "Dic",
          ],
          longhand: [
              "Gennaio",
              "Febbraio",
              "Marzo",
              "Aprile",
              "Maggio",
              "Giugno",
              "Luglio",
              "Agosto",
              "Settembre",
              "Ottobre",
              "Novembre",
              "Dicembre",
          ]
      },
      firstDayOfWeek: 1,
      ordinal: function () { return "°"; },
      rangeSeparator: " al ",
      weekAbbreviation: "Se",
      scrollTitle: "Scrolla per aumentare",
      toggleTitle: "Clicca per cambiare"
  };
  fp.l10ns.it = Italian;
  var it = fp.l10ns;

  exports.Italian = Italian;
  exports.default = it;

  Object.defineProperty(exports, '__esModule', { value: true });

}));

},{}],42:[function(require,module,exports){
(function (global){
/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.16.1
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
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Popper = factory());
}(this, (function () { 'use strict';

var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

var timeoutDuration = function () {
  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      return 1;
    }
  }
  return 0;
}();

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
  }
  // NOTE: 1 DOM access here
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
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

/**
 * Returns the reference node of the reference object, or the reference object itself.
 * @method
 * @memberof Popper.Utils
 * @param {Element|Object} reference - the reference element (the popper will be relative to this)
 * @returns {Element} parent
 */
function getReferenceNode(reference) {
  return reference && reference.referenceNode ? reference.referenceNode : reference;
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

  var noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  var offsetParent = element.offsetParent || null;
  // Skip hidden elements which don't have an offsetParent
  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  }

  // .offsetParent will return the closest TH, TD or TABLE in case
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
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
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

  return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
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

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
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
};

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
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
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
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.width;
  var height = sizes.height || element.clientHeight || result.height;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
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
  var borderTopWidth = parseFloat(styles.borderTopWidth);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth);

  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
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
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop);
    var marginLeft = parseFloat(styles.marginLeft);

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
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
  var parentNode = getParentNode(element);
  if (!parentNode) {
    return false;
  }
  return isFixed(parentNode);
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

  var boundaries = { top: 0, left: 0 };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
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

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

    // In case of HTML, we need a different computation
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
  }

  // Add paddings
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

  return computedPlacement + (variation ? '-' + variation : '');
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

  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
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
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
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
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
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
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
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
  }

  // use `filter` to obtain the same behavior of `find`
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
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
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
function update() {
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
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  data.positionFixed = this.options.positionFixed;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
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
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
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

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
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
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
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

  this.disableEventListeners();

  // remove the popper if user explicitly asked for the deletion on destroy
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
  target.addEventListener(event, callback, { passive: true });

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
  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
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
function enableEventListeners() {
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
  getWindow(reference).removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
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
function disableEventListeners() {
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
    var unit = '';
    // add unit if the value is numeric and is one of the following
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
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
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
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Boolean} shouldRound - If the offsets should be rounded at all
 * @returns {Object} The popper's position offsets rounded
 *
 * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
 * good as it can be within reason.
 * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
 *
 * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
 * as well on High DPI screens).
 *
 * Firefox prefers no rounding for positioning and does not have blurriness on
 * high DPI screens.
 *
 * Only horizontal placement and left/right values need to be considered.
 */
function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var round = Math.round,
      floor = Math.floor;

  var noRound = function noRound(v) {
    return v;
  };

  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);

  var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf('-') !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;

  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}

var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

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
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
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
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
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
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
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

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
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
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

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
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
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
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

    // flips variation if reference element overflows boundaries
    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    // flips variation if popper content overflows boundaries
    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

    var flippedVariation = flippedVariationByRef || flippedVariationByContent;

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
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
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

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
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
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
    var size = void 0;
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
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
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
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
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
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
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
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  // NOTE: DOM access here
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

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

  // NOTE: DOM access here
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
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
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
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
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
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

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
    boundariesElement: 'viewport',
    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: false,
    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: false
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
var Popper = function () {
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param {Element|referenceObject} reference - The reference element used to position the popper
   * @param {Element} popper - The HTML / XML element used as the popper
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
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

return Popper;

})));


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],43:[function(require,module,exports){
(function (global){
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global global, define, System, Reflect, Promise */
var __extends;
var __assign;
var __rest;
var __decorate;
var __param;
var __metadata;
var __awaiter;
var __generator;
var __exportStar;
var __values;
var __read;
var __spread;
var __spreadArrays;
var __await;
var __asyncGenerator;
var __asyncDelegator;
var __asyncValues;
var __makeTemplateObject;
var __importStar;
var __importDefault;
var __classPrivateFieldGet;
var __classPrivateFieldSet;
(function (factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function (exports) { factory(createExporter(root, createExporter(exports))); });
    }
    else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
    }
    else {
        factory(createExporter(root));
    }
    function createExporter(exports, previous) {
        if (exports !== root) {
            if (typeof Object.create === "function") {
                Object.defineProperty(exports, "__esModule", { value: true });
            }
            else {
                exports.__esModule = true;
            }
        }
        return function (id, v) { return exports[id] = previous ? previous(id, v) : v; };
    }
})
(function (exporter) {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    __extends = function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

    __rest = function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };

    __decorate = function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    __param = function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };

    __metadata = function (metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    };

    __awaiter = function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    __generator = function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };

    __exportStar = function (m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    };

    __values = function (o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };

    __read = function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };

    __spread = function () {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    };

    __spreadArrays = function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    __await = function (v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    };

    __asyncGenerator = function (thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    };

    __asyncDelegator = function (o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    };

    __asyncValues = function (o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    };

    __makeTemplateObject = function (cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    __importStar = function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
    };

    __importDefault = function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };

    __classPrivateFieldGet = function (receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    };

    __classPrivateFieldSet = function (receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    exporter("__extends", __extends);
    exporter("__assign", __assign);
    exporter("__rest", __rest);
    exporter("__decorate", __decorate);
    exporter("__param", __param);
    exporter("__metadata", __metadata);
    exporter("__awaiter", __awaiter);
    exporter("__generator", __generator);
    exporter("__exportStar", __exportStar);
    exporter("__values", __values);
    exporter("__read", __read);
    exporter("__spread", __spread);
    exporter("__spreadArrays", __spreadArrays);
    exporter("__await", __await);
    exporter("__asyncGenerator", __asyncGenerator);
    exporter("__asyncDelegator", __asyncDelegator);
    exporter("__asyncValues", __asyncValues);
    exporter("__makeTemplateObject", __makeTemplateObject);
    exporter("__importStar", __importStar);
    exporter("__importDefault", __importDefault);
    exporter("__classPrivateFieldGet", __classPrivateFieldGet);
    exporter("__classPrivateFieldSet", __classPrivateFieldSet);
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[3])
;