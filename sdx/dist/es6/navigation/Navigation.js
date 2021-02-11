import { __extends, __values } from "tslib";
import anime from "animejs";
import { searchAndInitialize } from "../Utils";
import DomElement from "../DomElement";
import * as Dom from "../DomFunctions";
import SearchInput from "../search/SearchInput";
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
var Navigation = /** @class */ (function (_super) {
    __extends(Navigation, _super);
    function Navigation(element) {
        var _this = _super.call(this, element) || this;
        _this.animation = anime.timeline();
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
            for (var elements_1 = __values(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
                var el = elements_1_1.value;
                anime.remove(el);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (elements_1_1 && !elements_1_1.done && (_a = elements_1.return)) _a.call(elements_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.animation = anime.timeline();
    };
    Navigation.prototype._isMobile = function () {
        return Dom.isHidden(this._hamburgerElement, true) === false;
    };
    Navigation.prototype._handleLevel0Click = function (event) {
        var isDesktop = !this._isMobile();
        if (isDesktop) {
            var navItems = new NavigationItems(this)
                .fromLevel0(event.target);
            if (!navItems.section) {
                return;
            }
            var previousNavLink = this._navLevel0.querySelector(QUERY_NAV_LINK_ACTIVE);
            var previousNavSection = this._navLevel0.querySelector(QUERY_SECTION_OPEN);
            this._toggleContainer(navItems.link, this._navLevel0Body, navItems.section, undefined, previousNavLink, this._navLevel0Body, previousNavSection, undefined, true);
        }
    };
    Navigation.prototype._handleLevel1Click = function (event) {
        var navItems = new NavigationItems(this)
            .fromLevel1(event.target);
        var prevItems = navItems.previousLevel1();
        this._toggleContainer(navItems.link, navItems.container, navItems.section, navItems.footer, prevItems.link, prevItems.container, prevItems.section, prevItems.footer, false);
        return false;
    };
    Navigation.prototype._toggleContainer = function (navLink, navContainer, navSection, navFooter, previousNavLink, previousNavContainer, previousNavSection, previousNavFooter, animateContainer) {
        if (animateContainer === void 0) { animateContainer = false; }
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
            }
            else if (navLink === this._hamburgerElement) {
                // Close mobile navigation
                this._onNavigationClosed();
                this._closeSection(navContainer, navSection, undefined, false, false);
            }
            else if (!isDesktop) {
                // Close the section
                this._closeSection(navContainer, navSection, navFooter, true, animateContainer);
            }
        }
        else {
            Dom.addClass(navLink, CLASS_ACTIVE);
            if (isDesktop) {
                Dom.addClass(this._navMobile, CLASS_OPEN);
                this._onNavigationOpened();
                if (previousNavContainer && previousNavSection) {
                    this._closeSection(previousNavContainer, previousNavSection, previousNavFooter, true, animateContainer);
                }
                this._openSection(navContainer, navSection, navFooter, true, animateContainer);
            }
            else if (navLink === this._hamburgerElement) {
                // Open mobile navigation
                this._onNavigationOpened();
                this._openSection(navContainer, navSection, undefined, false, false);
            }
            else if (!isDesktop) {
                // Open section
                if (previousNavContainer && previousNavSection) {
                    this._closeSection(previousNavContainer, previousNavSection, previousNavFooter, true, animateContainer);
                    this.animation = anime.timeline();
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
        if (animateColumns === void 0) { animateColumns = true; }
        if (animateContainer === void 0) { animateContainer = false; }
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
            complete: function () {
                Dom.addClass(navSection, CLASS_OPEN);
                new DomElement(navSection).setAttribute("style", "");
            }
        });
        if (navFooter) {
            var navItems = navFooter.querySelectorAll(QUERY_NAV_COLUMN);
            try {
                for (var navItems_1 = __values(navItems), navItems_1_1 = navItems_1.next(); !navItems_1_1.done; navItems_1_1 = navItems_1.next()) {
                    var item = navItems_1_1.value;
                    Dom.addClass(item, CLASS_ACTIVE);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (navItems_1_1 && !navItems_1_1.done && (_a = navItems_1.return)) _a.call(navItems_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            navFooter.style.display = "block";
            this.animation.add({
                targets: navFooter,
                duration: ANIMATION_FOOTER_DURATION,
                easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
                height: navFooter.scrollHeight,
                offset: "-=" + ANIMATION_FOOTER_DURATION,
                complete: function () {
                    Dom.addClass(navFooter, CLASS_OPEN);
                    new DomElement(navFooter).setAttribute("style", "");
                }
            });
        }
        if (animateColumns === true) {
            var delay = ANIMATION_START_DELAY;
            var _loop_1 = function (item) {
                this_1.animation.add({
                    targets: item,
                    duration: 0,
                    offset: delay,
                    complete: function () {
                        Dom.addClass(item, CLASS_ACTIVE);
                    }
                });
                delay += ANIMATION_OFFSET;
            };
            var this_1 = this;
            try {
                for (var activeItems_1 = __values(activeItems), activeItems_1_1 = activeItems_1.next(); !activeItems_1_1.done; activeItems_1_1 = activeItems_1.next()) {
                    var item = activeItems_1_1.value;
                    _loop_1(item);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (activeItems_1_1 && !activeItems_1_1.done && (_b = activeItems_1.return)) _b.call(activeItems_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
    };
    Navigation.prototype._closeSection = function (navContainer, navSection, navFooter, animateColumns, animateContainer) {
        var e_4, _a, e_5, _b;
        if (animateColumns === void 0) { animateColumns = true; }
        if (animateContainer === void 0) { animateContainer = false; }
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
                for (var activeItems_2 = __values(activeItems), activeItems_2_1 = activeItems_2.next(); !activeItems_2_1.done; activeItems_2_1 = activeItems_2.next()) {
                    var active = activeItems_2_1.value;
                    Dom.removeClass(active, CLASS_ACTIVE);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (activeItems_2_1 && !activeItems_2_1.done && (_a = activeItems_2.return)) _a.call(activeItems_2);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        this.animation.add({
            targets: navSection,
            duration: ANIMATION_BODY_DURATION,
            easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
            height: 0,
            offset: 0,
            complete: function () {
                Dom.removeClass(navContainer, CLASS_OPEN);
                Dom.removeClass(navSection, CLASS_OPEN);
                navSection.style.height = "";
            }
        });
        if (navFooter) {
            try {
                for (var _c = __values(navFooter.querySelectorAll(QUERY_NAV_COLUMN_ACTIVE)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var active = _d.value;
                    Dom.removeClass(active, CLASS_ACTIVE);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_5) throw e_5.error; }
            }
            this.animation.add({
                targets: navFooter,
                duration: ANIMATION_FOOTER_DURATION,
                easing: "cubicBezier(0.550, 0.085, 0.320, 1)",
                height: 0,
                offset: 0,
                complete: function () {
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
            for (var _d = __values(this._navLevel0.querySelectorAll(QUERY_NAV_LEVEL0_LINK)), _e = _d.next(); !_e.done; _e = _d.next()) {
                var navLink = _e.value;
                navLink.addEventListener("click", this._level0ClickHandler);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_6) throw e_6.error; }
        }
        try {
            for (var _f = __values(this._navLevel1.querySelectorAll(QUERY_NAV_LEVEL1_LINK)), _g = _f.next(); !_g.done; _g = _f.next()) {
                var navLink = _g.value;
                navLink.addEventListener("click", this._level1ClickHandler);
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
            }
            finally { if (e_7) throw e_7.error; }
        }
        this._hamburgerElement.addEventListener("click", this._level1ClickHandler);
        // Desktop search icon
        var searchIcon = this.element.querySelector(QUERY_SEARCH_ICON);
        if (searchIcon) {
            searchIcon.addEventListener("click", this._searchClickHandler);
        }
        try {
            for (var _h = __values(this.element.querySelectorAll(QUERY_SEARCH_FIELD)), _j = _h.next(); !_j.done; _j = _h.next()) {
                var search = _j.value;
                var searchComponent = new SearchInput(search);
                if (Dom.hasClass(search, CLASS_SEARCH_DESKTOP) || Dom.hasClass(search.parentElement, CLASS_SEARCH_DESKTOP)) {
                    this._searchDesktop = searchComponent;
                }
                this._searchComponents.push(searchComponent);
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
            }
            finally { if (e_8) throw e_8.error; }
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
        }
        else if (level0) {
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
}(DomElement));
var NavigationItems = /** @class */ (function () {
    function NavigationItems(nav) {
        this._navigation = nav;
    }
    Object.defineProperty(NavigationItems.prototype, "link", {
        get: function () {
            return this._link;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NavigationItems.prototype, "container", {
        get: function () {
            return this._container;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NavigationItems.prototype, "section", {
        get: function () {
            return this._section;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NavigationItems.prototype, "footer", {
        get: function () {
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
            if ((navLink === this._navigation._hamburgerElement) || Dom.hasClass(navLink, CLASS_NAV_LINK)) {
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
}());
export function init() {
    searchAndInitialize(".nav", function (e) {
        new Navigation(e);
    });
}
export default Navigation;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vc3JjL25hdmlnYXRpb24vTmF2aWdhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxLQUFnQyxNQUFNLFNBQVMsQ0FBQTtBQUN0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFDOUMsT0FBTyxVQUFVLE1BQU0sZUFBZSxDQUFBO0FBQ3RDLE9BQU8sS0FBSyxHQUFHLE1BQU0saUJBQWlCLENBQUE7QUFDdEMsT0FBTyxXQUFXLE1BQU0sdUJBQXVCLENBQUE7QUFFL0MsSUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFBO0FBQzVCLElBQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQTtBQUVoQyxJQUFNLG1CQUFtQixHQUFHLGdCQUFnQixDQUFBO0FBQzVDLElBQU0saUJBQWlCLEdBQUcsZUFBZSxDQUFBO0FBRXpDLElBQU0sY0FBYyxHQUFHLGtCQUFrQixDQUFBO0FBQ3pDLElBQU0scUJBQXFCLEdBQUcsNkJBQTZCLENBQUE7QUFFM0QsSUFBTSxnQkFBZ0IsR0FBRywwQ0FBMEMsQ0FBQTtBQUNuRSxJQUFNLGdCQUFnQixHQUFHLGNBQWMsQ0FBQTtBQUN2QyxJQUFNLDBCQUEwQixHQUFHLDJCQUEyQixDQUFBO0FBQzlELElBQU0sa0JBQWtCLEdBQUcsc0JBQXNCLENBQUE7QUFFakQsSUFBTSxnQkFBZ0IsR0FBRyw0QkFBNEIsQ0FBQTtBQUVyRCxJQUFNLHFCQUFxQixHQUFHLDRCQUE0QixDQUFBO0FBQzFELElBQU0scUJBQXFCLEdBQUcsbUJBQW1CLENBQUE7QUFFakQsSUFBTSxnQkFBZ0IsR0FBRyxVQUFVLENBQUE7QUFDbkMsSUFBTSx1QkFBdUIsR0FBRyxvQkFBb0IsQ0FBQTtBQUVwRCxJQUFNLGNBQWMsR0FBRyxXQUFXLENBQUE7QUFDbEMsSUFBTSxnQkFBZ0IsR0FBRyxhQUFhLENBQUE7QUFFdEMsSUFBTSxpQkFBaUIsR0FBRyxhQUFhLENBQUE7QUFDdkMsSUFBTSxrQkFBa0IsR0FBRyxnQkFBZ0IsQ0FB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QyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFBO1FBQ3BFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFpQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUE7UUFDM0csSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBaUIsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFBO1FBRTVHLE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUVNLHFDQUFXLEdBQWxCO1FBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUE7SUFDMUQsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0E1RUEsQUE0RUMsSUFBQTtBQUVELE1BQU0sVUFBVSxJQUFJO0lBQ2xCLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxVQUFDLENBQUM7UUFDNUIsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDbkIsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBRUQsZUFBZSxVQUFVLENBQUEiLCJmaWxlIjoibWFpbi9zcmMvbmF2aWdhdGlvbi9OYXZpZ2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFuaW1lLCB7IEFuaW1lVGltZWxpbmVJbnN0YW5jZSB9IGZyb20gXCJhbmltZWpzXCJcbmltcG9ydCB7IHNlYXJjaEFuZEluaXRpYWxpemUgfSBmcm9tIFwiLi4vVXRpbHNcIlxuaW1wb3J0IERvbUVsZW1lbnQgZnJvbSBcIi4uL0RvbUVsZW1lbnRcIlxuaW1wb3J0ICogYXMgRG9tIGZyb20gXCIuLi9Eb21GdW5jdGlvbnNcIlxuaW1wb3J0IFNlYXJjaElucHV0IGZyb20gXCIuLi9zZWFyY2gvU2VhcmNoSW5wdXRcIlxuXG5jb25zdCBDTEFTU19PUEVOID0gXCJpcy1vcGVuXCJcbmNvbnN0IENMQVNTX0FDVElWRSA9IFwiaXMtYWN0aXZlXCJcblxuY29uc3QgUVVFUllfTkFWX0hBTUJVUkdFUiA9IFwiLm5hdi1oYW1idXJnZXJcIlxuY29uc3QgUVVFUllfTkFWX0hCX0JPRFkgPSBcIi5uYXZfX3ByaW1hcnlcIlxuXG5jb25zdCBDTEFTU19OQVZfTElOSyA9IFwibmF2LWxpbmstLWhlYWRlclwiXG5jb25zdCBRVUVSWV9OQVZfTElOS19BQ1RJVkUgPSBcIi5uYXYtbGluay0taGVhZGVyLmlzLWFjdGl2ZVwiXG5cbmNvbnN0IFFVRVJZX05BVl9NT0JJTEUgPSBcIi5uYXZfX2xldmVsMSAubmF2X19tYWlubmF2IC5uYXZfX3ByaW1hcnlcIlxuY29uc3QgUVVFUllfTkFWX0xFVkVMMCA9IFwiLm5hdl9fbGV2ZWwwXCJcbmNvbnN0IFFVRVJZX05BVl9MRVZFTDBfQ09OVEFJTkVSID0gXCIubmF2X19sZXZlbDAgLm5hdl9fc3VibmF2XCJcbmNvbnN0IFFVRVJZX1NFQ1RJT05fT1BFTiA9IFwiLm5hdi1zZWN0aW9uLmlzLW9wZW5cIlxuXG5jb25zdCBRVUVSWV9OQVZfTEVWRUwxID0gXCIubmF2X19sZXZlbDEgLm5hdl9fbWFpbm5hdlwiXG5cbmNvbnN0IFFVRVJZX05BVl9MRVZFTDBfTElOSyA9IFwiLm5hdi1saW5rLm5hdi1saW5rLS1oZWFkZXJcIlxuY29uc3QgUVVFUllfTkFWX0xFVkVMMV9MSU5LID0gXCIubmF2LWxpbmstLWhlYWRlclwiXG5cbmNvbnN0IFFVRVJZX05BVl9DT0xVTU4gPSBcIi5uYXYtY29sXCJcbmNvbnN0IFFVRVJZX05BVl9DT0xVTU5fQUNUSVZFID0gXCIubmF2LWNvbC5pcy1hY3RpdmVcIlxuXG5jb25zdCBRVUVSWV9OQVZfQk9EWSA9IFwiLm5hdi1ib2R5XCJcbmNvbnN0IFFVRVJZX05BVl9GT09URVIgPSBcIi5uYXYtZm9vdGVyXCJcblxuY29uc3QgUVVFUllfU0VBUkNIX0lDT04gPSBcIi5uYXYtc2VhcmNoXCJcbmNvbnN0IFFVRVJZX1NFQVJDSF9GSUVMRCA9IFwiLnNlYXJjaF9faW5wdXRcIlxuY29uc3QgQ0xBU1NfU0VBUkNIX0RFU0tUT1AgPSBcInNlYXJjaC0tZGVza3RvcFwiXG5cbmNvbnN0IEFOSU1BVElPTl9TVEFSVF9ERUxBWSA9IDIwMFxuY29uc3QgQU5JTUFUSU9OX09GRlNFVCA9IDUwXG5cbmNvbnN0IEFOSU1BVElPTl9CT0RZX0RVUkFUSU9OID0gMzAwXG5jb25zdCBBTklNQVRJT05fRk9PVEVSX0RVUkFUSU9OID0gMTAwXG5cbi8qKlxuICogVGhlIG5hdmlnYXRpb24gY29tcG9uZW50IGRlZmluaXRpb24uXG4gKi9cbmNsYXNzIE5hdmlnYXRpb24gZXh0ZW5kcyBEb21FbGVtZW50IHtcbiAgcHVibGljIF9uYXZMZXZlbDA6IEhUTUxFbGVtZW50XG4gIHB1YmxpYyBfbmF2TGV2ZWwwQm9keTogSFRNTEVsZW1lbnRcbiAgcHVibGljIF9uYXZMZXZlbDE6IEhUTUxFbGVtZW50XG5cbiAgcHVibGljIF9oYW1idXJnZXJFbGVtZW50OiBIVE1MRWxlbWVudFxuXG4gIHByaXZhdGUgX25hdk1vYmlsZTogSFRNTEVsZW1lbnRcblxuICBwcml2YXRlIF9zZWFyY2hDb21wb25lbnRzOiBTZWFyY2hJbnB1dFtdXG5cbiAgcHJpdmF0ZSBfbGV2ZWwwQ2xpY2tIYW5kbGVyOiAoZTogRXZlbnQpID0+IHZvaWRcbiAgcHJpdmF0ZSBfbGV2ZWwxQ2xpY2tIYW5kbGVyOiAoZTogRXZlbnQpID0+IHZvaWRcbiAgcHJpdmF0ZSBfd2luZG93Q2xpY2tIYW5kbGVyOiAoZTogRXZlbnQpID0+IHZvaWRcbiAgcHJpdmF0ZSBfc2VhcmNoQ2xpY2tIYW5kbGVyOiAoZTogRXZlbnQpID0+IHZvaWRcblxuICBwcml2YXRlIGFuaW1hdGlvbjogQW5pbWVUaW1lbGluZUluc3RhbmNlID0gYW5pbWUudGltZWxpbmUoKVxuICBwcml2YXRlIF9zZWFyY2hEZXNrdG9wPzogU2VhcmNoSW5wdXRcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudClcblxuICAgIHRoaXMuX25hdkxldmVsMCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFFVRVJZX05BVl9MRVZFTDApIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICB0aGlzLl9uYXZMZXZlbDBCb2R5ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoUVVFUllfTkFWX0xFVkVMMF9DT05UQUlORVIpIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICB0aGlzLl9uYXZMZXZlbDEgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihRVUVSWV9OQVZfTEVWRUwxKSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG5cbiAgICB0aGlzLl9uYXZNb2JpbGUgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihRVUVSWV9OQVZfTU9CSUxFKSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgaWYgKCF0aGlzLl9uYXZNb2JpbGUucGFyZW50RWxlbWVudCkge1xuICAgICAgbGV0IGR1bW15UGFyZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgZHVtbXlQYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5fbmF2TW9iaWxlKVxuICAgIH1cblxuICAgIHRoaXMuX2hhbWJ1cmdlckVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihRVUVSWV9OQVZfSEFNQlVSR0VSKSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgdGhpcy5fc2VhcmNoQ29tcG9uZW50cyA9IFtdXG5cbiAgICB0aGlzLl9sZXZlbDBDbGlja0hhbmRsZXIgPSB0aGlzLl9oYW5kbGVMZXZlbDBDbGljay5iaW5kKHRoaXMpXG4gICAgdGhpcy5fbGV2ZWwxQ2xpY2tIYW5kbGVyID0gdGhpcy5faGFuZGxlTGV2ZWwxQ2xpY2suYmluZCh0aGlzKVxuICAgIHRoaXMuX3dpbmRvd0NsaWNrSGFuZGxlciA9IHRoaXMuX2hhbmRsZVdpbmRvd0NsaWNrLmJpbmQodGhpcylcbiAgICB0aGlzLl9zZWFyY2hDbGlja0hhbmRsZXIgPSB0aGlzLl9oYW5kbGVTZWFyY2hDbGljay5iaW5kKHRoaXMpXG5cbiAgICB0aGlzLl9pbml0aWFsaXplKClcbiAgfVxuXG4gIHByb3RlY3RlZCBfcmVzZXRNYWluVGltZWxpbmUoLi4uZWxlbWVudHM6IEhUTUxFbGVtZW50W10pIHtcbiAgICB0aGlzLmFuaW1hdGlvbi5wYXVzZSgpXG4gICAgZm9yIChsZXQgZWwgb2YgZWxlbWVudHMpIHtcbiAgICAgIGFuaW1lLnJlbW92ZShlbCEpXG4gICAgfVxuICAgIHRoaXMuYW5pbWF0aW9uID0gYW5pbWUudGltZWxpbmUoKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9pc01vYmlsZSgpIHtcbiAgICByZXR1cm4gRG9tLmlzSGlkZGVuKHRoaXMuX2hhbWJ1cmdlckVsZW1lbnQsIHRydWUpID09PSBmYWxzZVxuICB9XG5cbiAgcHJvdGVjdGVkIF9oYW5kbGVMZXZlbDBDbGljayhldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCBpc0Rlc2t0b3AgPSAhdGhpcy5faXNNb2JpbGUoKVxuXG4gICAgaWYgKGlzRGVza3RvcCkge1xuICAgICAgbGV0IG5hdkl0ZW1zID0gbmV3IE5hdmlnYXRpb25JdGVtcyh0aGlzKVxuICAgICAgICAuZnJvbUxldmVsMChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpXG5cbiAgICAgIGlmICghbmF2SXRlbXMuc2VjdGlvbikge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgbGV0IHByZXZpb3VzTmF2TGluayA9IHRoaXMuX25hdkxldmVsMC5xdWVyeVNlbGVjdG9yKFFVRVJZX05BVl9MSU5LX0FDVElWRSkhIGFzIEhUTUxFbGVtZW50XG4gICAgICBsZXQgcHJldmlvdXNOYXZTZWN0aW9uID0gdGhpcy5fbmF2TGV2ZWwwLnF1ZXJ5U2VsZWN0b3IoUVVFUllfU0VDVElPTl9PUEVOKSEgYXMgSFRNTEVsZW1lbnRcblxuICAgICAgdGhpcy5fdG9nZ2xlQ29udGFpbmVyKFxuICAgICAgICBuYXZJdGVtcy5saW5rLFxuICAgICAgICB0aGlzLl9uYXZMZXZlbDBCb2R5LFxuICAgICAgICBuYXZJdGVtcy5zZWN0aW9uLFxuICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgIHByZXZpb3VzTmF2TGluayxcbiAgICAgICAgdGhpcy5fbmF2TGV2ZWwwQm9keSxcbiAgICAgICAgcHJldmlvdXNOYXZTZWN0aW9uLFxuICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgIHRydWVcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2hhbmRsZUxldmVsMUNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgIGxldCBuYXZJdGVtcyA9IG5ldyBOYXZpZ2F0aW9uSXRlbXModGhpcylcbiAgICAgIC5mcm9tTGV2ZWwxKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudClcblxuICAgIGxldCBwcmV2SXRlbXMgPSBuYXZJdGVtcy5wcmV2aW91c0xldmVsMSgpXG5cbiAgICB0aGlzLl90b2dnbGVDb250YWluZXIoXG4gICAgICBuYXZJdGVtcy5saW5rLFxuICAgICAgbmF2SXRlbXMuY29udGFpbmVyLFxuICAgICAgbmF2SXRlbXMuc2VjdGlvbixcbiAgICAgIG5hdkl0ZW1zLmZvb3RlcixcbiAgICAgIHByZXZJdGVtcy5saW5rLFxuICAgICAgcHJldkl0ZW1zLmNvbnRhaW5lcixcbiAgICAgIHByZXZJdGVtcy5zZWN0aW9uLFxuICAgICAgcHJldkl0ZW1zLmZvb3RlcixcbiAgICAgIGZhbHNlXG4gICAgKVxuXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBwcm90ZWN0ZWQgX3RvZ2dsZUNvbnRhaW5lcihcbiAgICBuYXZMaW5rOiBIVE1MRWxlbWVudCxcbiAgICBuYXZDb250YWluZXI/OiBIVE1MRWxlbWVudCxcbiAgICBuYXZTZWN0aW9uPzogSFRNTEVsZW1lbnQsXG4gICAgbmF2Rm9vdGVyPzogSFRNTEVsZW1lbnQsXG4gICAgcHJldmlvdXNOYXZMaW5rPzogSFRNTEVsZW1lbnQsXG4gICAgcHJldmlvdXNOYXZDb250YWluZXI/OiBIVE1MRWxlbWVudCxcbiAgICBwcmV2aW91c05hdlNlY3Rpb24/OiBIVE1MRWxlbWVudCxcbiAgICBwcmV2aW91c05hdkZvb3Rlcj86IEhUTUxFbGVtZW50LFxuICAgIGFuaW1hdGVDb250YWluZXIgPSBmYWxzZVxuICApIHtcbiAgICBjb25zdCBpc0Rlc2t0b3AgPSAhdGhpcy5faXNNb2JpbGUoKVxuXG4gICAgaWYgKHByZXZpb3VzTmF2TGluayAmJiBwcmV2aW91c05hdkxpbmsgIT09IG5hdkxpbmsgJiYgbmF2TGluayAhPT0gdGhpcy5faGFtYnVyZ2VyRWxlbWVudCkge1xuICAgICAgRG9tLnJlbW92ZUNsYXNzKHByZXZpb3VzTmF2TGluaywgQ0xBU1NfQUNUSVZFKVxuICAgIH1cblxuICAgIHRoaXMuX3Jlc2V0TWFpblRpbWVsaW5lKG5hdkNvbnRhaW5lciEsIG5hdlNlY3Rpb24hLCBuYXZGb290ZXIhLCBwcmV2aW91c05hdkNvbnRhaW5lciEsIHByZXZpb3VzTmF2U2VjdGlvbiEsIHByZXZpb3VzTmF2Rm9vdGVyISlcblxuICAgIGlmIChEb20uaGFzQ2xhc3MobmF2TGluaywgQ0xBU1NfQUNUSVZFKSkge1xuICAgICAgRG9tLnJlbW92ZUNsYXNzKG5hdkxpbmssIENMQVNTX0FDVElWRSlcblxuICAgICAgaWYgKGlzRGVza3RvcCkge1xuICAgICAgICB0aGlzLl9vbk5hdmlnYXRpb25DbG9zZWQoKVxuXG4gICAgICAgIHRoaXMuX2Nsb3NlU2VjdGlvbihuYXZDb250YWluZXIsIG5hdlNlY3Rpb24sIG5hdkZvb3RlciwgdHJ1ZSwgYW5pbWF0ZUNvbnRhaW5lcilcbiAgICAgIH0gZWxzZSBpZiAobmF2TGluayA9PT0gdGhpcy5faGFtYnVyZ2VyRWxlbWVudCkge1xuICAgICAgICAvLyBDbG9zZSBtb2JpbGUgbmF2aWdhdGlvblxuICAgICAgICB0aGlzLl9vbk5hdmlnYXRpb25DbG9zZWQoKVxuXG4gICAgICAgIHRoaXMuX2Nsb3NlU2VjdGlvbihuYXZDb250YWluZXIsIG5hdlNlY3Rpb24sIHVuZGVmaW5lZCwgZmFsc2UsIGZhbHNlKVxuICAgICAgfSBlbHNlIGlmICghaXNEZXNrdG9wKSB7XG4gICAgICAgIC8vIENsb3NlIHRoZSBzZWN0aW9uXG4gICAgICAgIHRoaXMuX2Nsb3NlU2VjdGlvbihuYXZDb250YWluZXIsIG5hdlNlY3Rpb24sIG5hdkZvb3RlciwgdHJ1ZSwgYW5pbWF0ZUNvbnRhaW5lcilcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgRG9tLmFkZENsYXNzKG5hdkxpbmssIENMQVNTX0FDVElWRSlcblxuICAgICAgaWYgKGlzRGVza3RvcCkge1xuICAgICAgICBEb20uYWRkQ2xhc3ModGhpcy5fbmF2TW9iaWxlLCBDTEFTU19PUEVOKVxuICAgICAgICB0aGlzLl9vbk5hdmlnYXRpb25PcGVuZWQoKVxuXG4gICAgICAgIGlmIChwcmV2aW91c05hdkNvbnRhaW5lciAmJiBwcmV2aW91c05hdlNlY3Rpb24pIHtcbiAgICAgICAgICB0aGlzLl9jbG9zZVNlY3Rpb24ocHJldmlvdXNOYXZDb250YWluZXIsIHByZXZpb3VzTmF2U2VjdGlvbiwgcHJldmlvdXNOYXZGb290ZXIsIHRydWUsIGFuaW1hdGVDb250YWluZXIpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fb3BlblNlY3Rpb24obmF2Q29udGFpbmVyLCBuYXZTZWN0aW9uLCBuYXZGb290ZXIsIHRydWUsIGFuaW1hdGVDb250YWluZXIpXG4gICAgICB9IGVsc2UgaWYgKG5hdkxpbmsgPT09IHRoaXMuX2hhbWJ1cmdlckVsZW1lbnQpIHtcbiAgICAgICAgLy8gT3BlbiBtb2JpbGUgbmF2aWdhdGlvblxuICAgICAgICB0aGlzLl9vbk5hdmlnYXRpb25PcGVuZWQoKVxuXG4gICAgICAgIHRoaXMuX29wZW5TZWN0aW9uKG5hdkNvbnRhaW5lciwgbmF2U2VjdGlvbiwgdW5kZWZpbmVkLCBmYWxzZSwgZmFsc2UpXG4gICAgICB9IGVsc2UgaWYgKCFpc0Rlc2t0b3ApIHtcbiAgICAgICAgLy8gT3BlbiBzZWN0aW9uXG4gICAgICAgIGlmIChwcmV2aW91c05hdkNvbnRhaW5lciAmJiBwcmV2aW91c05hdlNlY3Rpb24pIHtcbiAgICAgICAgICB0aGlzLl9jbG9zZVNlY3Rpb24ocHJldmlvdXNOYXZDb250YWluZXIsIHByZXZpb3VzTmF2U2VjdGlvbiwgcHJldmlvdXNOYXZGb290ZXIsIHRydWUsIGFuaW1hdGVDb250YWluZXIpXG4gICAgICAgICAgdGhpcy5hbmltYXRpb24gPSBhbmltZS50aW1lbGluZSgpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fb3BlblNlY3Rpb24obmF2Q29udGFpbmVyLCBuYXZTZWN0aW9uLCBuYXZGb290ZXIsIHRydWUsIGFuaW1hdGVDb250YWluZXIpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9vbk5hdmlnYXRpb25PcGVuZWQoKSB7XG4gICAgRG9tLmFkZENsYXNzKHRoaXMuX25hdk1vYmlsZSwgQ0xBU1NfT1BFTilcbiAgICBEb20uYWRkQ2xhc3ModGhpcy5fbmF2TW9iaWxlLnBhcmVudEVsZW1lbnQhLCBDTEFTU19PUEVOKVxuICAgIERvbS5hZGRDbGFzcyh0aGlzLl9oYW1idXJnZXJFbGVtZW50LCBDTEFTU19BQ1RJVkUpXG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX3dpbmRvd0NsaWNrSGFuZGxlcilcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMuX3dpbmRvd0NsaWNrSGFuZGxlcilcbiAgfVxuXG4gIHByb3RlY3RlZCBfb25OYXZpZ2F0aW9uQ2xvc2VkKCkge1xuICAgIERvbS5yZW1vdmVDbGFzcyh0aGlzLl9uYXZNb2JpbGUsIENMQVNTX09QRU4pXG4gICAgRG9tLnJlbW92ZUNsYXNzKHRoaXMuX25hdk1vYmlsZS5wYXJlbnRFbGVtZW50ISwgQ0xBU1NfT1BFTilcbiAgICBEb20ucmVtb3ZlQ2xhc3ModGhpcy5faGFtYnVyZ2VyRWxlbWVudCwgQ0xBU1NfQUNUSVZFKVxuXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl93aW5kb3dDbGlja0hhbmRsZXIpXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLl93aW5kb3dDbGlja0hhbmRsZXIpXG4gIH1cblxuICBwcm90ZWN0ZWQgX2hhbmRsZVdpbmRvd0NsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnRcblxuICAgIHdoaWxlICh0YXJnZXQgIT09IHRoaXMuZWxlbWVudCAmJiB0YXJnZXQucGFyZW50RWxlbWVudCkge1xuICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudEVsZW1lbnRcbiAgICB9XG5cbiAgICBpZiAodGFyZ2V0ICE9PSB0aGlzLmVsZW1lbnQpIHtcbiAgICAgIHRoaXMuY2xvc2UoKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHByb3RlY3RlZCBfb3BlblNlY3Rpb24oXG4gICAgbmF2Q29udGFpbmVyPzogSFRNTEVsZW1lbnQsXG4gICAgbmF2U2VjdGlvbj86IEhUTUxFbGVtZW50LFxuICAgIG5hdkZvb3Rlcj86IEhUTUxFbGVtZW50LFxuICAgIGFuaW1hdGVDb2x1bW5zID0gdHJ1ZSxcbiAgICBhbmltYXRlQ29udGFpbmVyID0gZmFsc2VcbiAgKSB7XG4gICAgaWYgKCFuYXZTZWN0aW9uIHx8ICFuYXZDb250YWluZXIpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBhY3RpdmVJdGVtcyA9IG5hdlNlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChRVUVSWV9OQVZfQ09MVU1OKVxuXG4gICAgaWYgKGFuaW1hdGVDb250YWluZXIgPT09IHRydWUpIHtcbiAgICAgIGxldCBjb250YWluZXIgPSBuYXZDb250YWluZXJcbiAgICAgIG5hdkNvbnRhaW5lciA9IG5hdlNlY3Rpb25cbiAgICAgIG5hdlNlY3Rpb24gPSBjb250YWluZXJcbiAgICB9XG5cbiAgICBEb20uYWRkQ2xhc3MobmF2Q29udGFpbmVyISwgQ0xBU1NfT1BFTilcblxuICAgIG5hdlNlY3Rpb24uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIlxuXG4gICAgdGhpcy5hbmltYXRpb24uYWRkKHtcbiAgICAgIHRhcmdldHM6IG5hdlNlY3Rpb24sXG4gICAgICBkdXJhdGlvbjogQU5JTUFUSU9OX0JPRFlfRFVSQVRJT04sXG4gICAgICBlYXNpbmc6IFwiY3ViaWNCZXppZXIoMC41NTAsIDAuMDg1LCAwLjMyMCwgMSlcIixcbiAgICAgIGhlaWdodDogYW5pbWF0ZUNvbnRhaW5lciA/IG5hdkNvbnRhaW5lci5zY3JvbGxIZWlnaHQgOiBuYXZTZWN0aW9uLnNjcm9sbEhlaWdodCxcbiAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgIERvbS5hZGRDbGFzcyhuYXZTZWN0aW9uISwgQ0xBU1NfT1BFTilcbiAgICAgICAgbmV3IERvbUVsZW1lbnQobmF2U2VjdGlvbiEpLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiXCIpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGlmIChuYXZGb290ZXIpIHtcbiAgICAgIGNvbnN0IG5hdkl0ZW1zID0gbmF2Rm9vdGVyLnF1ZXJ5U2VsZWN0b3JBbGwoUVVFUllfTkFWX0NPTFVNTilcbiAgICAgIGZvciAobGV0IGl0ZW0gb2YgbmF2SXRlbXMpIHtcbiAgICAgICAgRG9tLmFkZENsYXNzKGl0ZW0sIENMQVNTX0FDVElWRSlcbiAgICAgIH1cblxuICAgICAgbmF2Rm9vdGVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCJcblxuICAgICAgdGhpcy5hbmltYXRpb24uYWRkKHtcbiAgICAgICAgdGFyZ2V0czogbmF2Rm9vdGVyLFxuICAgICAgICBkdXJhdGlvbjogQU5JTUFUSU9OX0ZPT1RFUl9EVVJBVElPTixcbiAgICAgICAgZWFzaW5nOiBcImN1YmljQmV6aWVyKDAuNTUwLCAwLjA4NSwgMC4zMjAsIDEpXCIsXG4gICAgICAgIGhlaWdodDogbmF2Rm9vdGVyLnNjcm9sbEhlaWdodCxcbiAgICAgICAgb2Zmc2V0OiBgLT0ke0FOSU1BVElPTl9GT09URVJfRFVSQVRJT059YCxcbiAgICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICBEb20uYWRkQ2xhc3MobmF2Rm9vdGVyISwgQ0xBU1NfT1BFTilcbiAgICAgICAgICBuZXcgRG9tRWxlbWVudChuYXZGb290ZXIhKS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIlwiKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChhbmltYXRlQ29sdW1ucyA9PT0gdHJ1ZSkge1xuICAgICAgbGV0IGRlbGF5ID0gQU5JTUFUSU9OX1NUQVJUX0RFTEFZXG5cbiAgICAgIGZvciAobGV0IGl0ZW0gb2YgYWN0aXZlSXRlbXMpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24uYWRkKHtcbiAgICAgICAgICB0YXJnZXRzOiBpdGVtLFxuICAgICAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgICAgIG9mZnNldDogZGVsYXksXG4gICAgICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgIERvbS5hZGRDbGFzcyhpdGVtLCBDTEFTU19BQ1RJVkUpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBkZWxheSArPSBBTklNQVRJT05fT0ZGU0VUXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9jbG9zZVNlY3Rpb24oXG4gICAgbmF2Q29udGFpbmVyPzogSFRNTEVsZW1lbnQsXG4gICAgbmF2U2VjdGlvbj86IEhUTUxFbGVtZW50LFxuICAgIG5hdkZvb3Rlcj86IEhUTUxFbGVtZW50LFxuICAgIGFuaW1hdGVDb2x1bW5zID0gdHJ1ZSxcbiAgICBhbmltYXRlQ29udGFpbmVyID0gZmFsc2VcbiAgKSB7XG4gICAgaWYgKCFuYXZTZWN0aW9uIHx8ICFuYXZDb250YWluZXIpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBhY3RpdmVJdGVtcyA9IG5hdlNlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChRVUVSWV9OQVZfQ09MVU1OX0FDVElWRSlcblxuICAgIGlmIChhbmltYXRlQ29udGFpbmVyID09PSB0cnVlKSB7XG4gICAgICBsZXQgY29udGFpbmVyID0gbmF2Q29udGFpbmVyXG4gICAgICBuYXZDb250YWluZXIgPSBuYXZTZWN0aW9uXG4gICAgICBuYXZTZWN0aW9uID0gY29udGFpbmVyXG4gICAgfVxuXG4gICAgaWYgKGFuaW1hdGVDb2x1bW5zID09PSB0cnVlKSB7XG4gICAgICBmb3IgKGxldCBhY3RpdmUgb2YgYWN0aXZlSXRlbXMpIHtcbiAgICAgICAgRG9tLnJlbW92ZUNsYXNzKGFjdGl2ZSwgQ0xBU1NfQUNUSVZFKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuYW5pbWF0aW9uLmFkZCh7XG4gICAgICB0YXJnZXRzOiBuYXZTZWN0aW9uLFxuICAgICAgZHVyYXRpb246IEFOSU1BVElPTl9CT0RZX0RVUkFUSU9OLFxuICAgICAgZWFzaW5nOiBcImN1YmljQmV6aWVyKDAuNTUwLCAwLjA4NSwgMC4zMjAsIDEpXCIsXG4gICAgICBoZWlnaHQ6IDAsXG4gICAgICBvZmZzZXQ6IDAsXG4gICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICBEb20ucmVtb3ZlQ2xhc3MobmF2Q29udGFpbmVyISwgQ0xBU1NfT1BFTilcbiAgICAgICAgRG9tLnJlbW92ZUNsYXNzKG5hdlNlY3Rpb24hLCBDTEFTU19PUEVOKVxuICAgICAgICBuYXZTZWN0aW9uIS5zdHlsZS5oZWlnaHQgPSBcIlwiXG4gICAgICB9XG4gICAgfSlcblxuICAgIGlmIChuYXZGb290ZXIpIHtcbiAgICAgIGZvciAobGV0IGFjdGl2ZSBvZiBuYXZGb290ZXIucXVlcnlTZWxlY3RvckFsbChRVUVSWV9OQVZfQ09MVU1OX0FDVElWRSkpIHtcbiAgICAgICAgRG9tLnJlbW92ZUNsYXNzKGFjdGl2ZSwgQ0xBU1NfQUNUSVZFKVxuICAgICAgfVxuXG4gICAgICB0aGlzLmFuaW1hdGlvbi5hZGQoe1xuICAgICAgICB0YXJnZXRzOiBuYXZGb290ZXIsXG4gICAgICAgIGR1cmF0aW9uOiBBTklNQVRJT05fRk9PVEVSX0RVUkFUSU9OLFxuICAgICAgICBlYXNpbmc6IFwiY3ViaWNCZXppZXIoMC41NTAsIDAuMDg1LCAwLjMyMCwgMSlcIixcbiAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgRG9tLnJlbW92ZUNsYXNzKG5hdkZvb3RlciEsIENMQVNTX09QRU4pXG4gICAgICAgICAgbmF2Rm9vdGVyIS5zdHlsZS5oZWlnaHQgPSBcIlwiXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9oYW5kbGVTZWFyY2hDbGljaygpIHtcbiAgICBpZiAodGhpcy5fc2VhcmNoRGVza3RvcCkge1xuICAgICAgdGhpcy5fc2VhcmNoRGVza3RvcC5vcGVuKClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIG5hdmlnYXRpb24gY29tcG9uZW50LlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIF9pbml0aWFsaXplKCkge1xuICAgIGZvciAobGV0IG5hdkxpbmsgb2YgdGhpcy5fbmF2TGV2ZWwwLnF1ZXJ5U2VsZWN0b3JBbGwoUVVFUllfTkFWX0xFVkVMMF9MSU5LKSkge1xuICAgICAgbmF2TGluay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5fbGV2ZWwwQ2xpY2tIYW5kbGVyKVxuICAgIH1cblxuICAgIGZvciAobGV0IG5hdkxpbmsgb2YgdGhpcy5fbmF2TGV2ZWwxLnF1ZXJ5U2VsZWN0b3JBbGwoUVVFUllfTkFWX0xFVkVMMV9MSU5LKSkge1xuICAgICAgbmF2TGluay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5fbGV2ZWwxQ2xpY2tIYW5kbGVyKVxuICAgIH1cblxuICAgIHRoaXMuX2hhbWJ1cmdlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX2xldmVsMUNsaWNrSGFuZGxlcilcblxuICAgIC8vIERlc2t0b3Agc2VhcmNoIGljb25cbiAgICBsZXQgc2VhcmNoSWNvbiA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFFVRVJZX1NFQVJDSF9JQ09OKVxuICAgIGlmIChzZWFyY2hJY29uKSB7XG4gICAgICBzZWFyY2hJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9zZWFyY2hDbGlja0hhbmRsZXIpXG4gICAgfVxuXG4gICAgZm9yIChsZXQgc2VhcmNoIG9mIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFFVRVJZX1NFQVJDSF9GSUVMRCkpIHtcbiAgICAgIGxldCBzZWFyY2hDb21wb25lbnQgPSBuZXcgU2VhcmNoSW5wdXQoc2VhcmNoIGFzIEhUTUxFbGVtZW50KVxuXG4gICAgICBpZiAoRG9tLmhhc0NsYXNzKHNlYXJjaCwgQ0xBU1NfU0VBUkNIX0RFU0tUT1ApIHx8IERvbS5oYXNDbGFzcyhzZWFyY2gucGFyZW50RWxlbWVudCEsIENMQVNTX1NFQVJDSF9ERVNLVE9QKSkge1xuICAgICAgICB0aGlzLl9zZWFyY2hEZXNrdG9wID0gc2VhcmNoQ29tcG9uZW50XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3NlYXJjaENvbXBvbmVudHMucHVzaChzZWFyY2hDb21wb25lbnQpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgbmF2aWdhdGlvbi5cbiAgICovXG4gIHB1YmxpYyBjbG9zZSgpIHtcbiAgICBsZXQgaXNNb2JsZSA9IHRoaXMuX2lzTW9iaWxlKClcblxuICAgIGxldCBsZXZlbDEgPSB0aGlzLl9uYXZMZXZlbDEucXVlcnlTZWxlY3RvcihRVUVSWV9OQVZfTElOS19BQ1RJVkUpIGFzIEhUTUxFbGVtZW50XG4gICAgbGV0IGxldmVsMCA9IHRoaXMuX25hdkxldmVsMC5xdWVyeVNlbGVjdG9yKFFVRVJZX05BVl9MSU5LX0FDVElWRSkgYXMgSFRNTEVsZW1lbnRcblxuICAgIGlmICghbGV2ZWwxICYmIGlzTW9ibGUgJiYgRG9tLmhhc0NsYXNzKHRoaXMuX2hhbWJ1cmdlckVsZW1lbnQsIENMQVNTX0FDVElWRSkpIHtcbiAgICAgIGxldmVsMSA9IHRoaXMuX2hhbWJ1cmdlckVsZW1lbnRcbiAgICB9XG5cbiAgICBsZXQgbmF2SXRlbXNcblxuICAgIGlmIChsZXZlbDEpIHtcbiAgICAgIG5hdkl0ZW1zID0gbmV3IE5hdmlnYXRpb25JdGVtcyh0aGlzKS5mcm9tTGV2ZWwxKGxldmVsMSlcbiAgICB9IGVsc2UgaWYgKGxldmVsMCkge1xuICAgICAgbmF2SXRlbXMgPSBuZXcgTmF2aWdhdGlvbkl0ZW1zKHRoaXMpLmZyb21MZXZlbDAobGV2ZWwwKVxuICAgIH1cblxuICAgIGlmIChuYXZJdGVtcykge1xuICAgICAgdGhpcy5fcmVzZXRNYWluVGltZWxpbmUobmF2SXRlbXMuY29udGFpbmVyISwgbmF2SXRlbXMuc2VjdGlvbiEsIG5hdkl0ZW1zLmZvb3RlciEpXG4gICAgICBEb20ucmVtb3ZlQ2xhc3MobmF2SXRlbXMubGluaywgQ0xBU1NfQUNUSVZFKVxuICAgICAgdGhpcy5fb25OYXZpZ2F0aW9uQ2xvc2VkKClcbiAgICAgIHRoaXMuX2Nsb3NlU2VjdGlvbihuYXZJdGVtcy5jb250YWluZXIhLCBuYXZJdGVtcy5zZWN0aW9uISwgbmF2SXRlbXMuZm9vdGVyLCAhaXNNb2JsZSwgZmFsc2UpXG4gICAgfVxuXG4gIH1cbn1cblxuY2xhc3MgTmF2aWdhdGlvbkl0ZW1zIHtcbiAgcHJpdmF0ZSBfbmF2aWdhdGlvbjogTmF2aWdhdGlvblxuICBwcml2YXRlIF9saW5rITogSFRNTEVsZW1lbnRcbiAgcHJpdmF0ZSBfY29udGFpbmVyPzogSFRNTEVsZW1lbnRcbiAgcHJpdmF0ZSBfc2VjdGlvbj86IEhUTUxFbGVtZW50XG4gIHByaXZhdGUgX2Zvb3Rlcj86IEhUTUxFbGVtZW50XG4gIGNvbnN0cnVjdG9yKG5hdjogTmF2aWdhdGlvbikge1xuICAgIHRoaXMuX25hdmlnYXRpb24gPSBuYXZcbiAgfVxuXG4gIGdldCBsaW5rKCkge1xuICAgIHJldHVybiB0aGlzLl9saW5rXG4gIH1cblxuICBnZXQgY29udGFpbmVyKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250YWluZXJcbiAgfVxuXG4gIGdldCBzZWN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9zZWN0aW9uXG4gIH1cblxuICBnZXQgZm9vdGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9mb290ZXJcbiAgfVxuXG4gIHB1YmxpYyBmcm9tTGV2ZWwwKG5hdkxpbms6IEhUTUxFbGVtZW50KSB7XG4gICAgd2hpbGUgKCFEb20uaGFzQ2xhc3MobmF2TGluaywgQ0xBU1NfTkFWX0xJTkspICYmIG5hdkxpbmsucGFyZW50RWxlbWVudCkge1xuICAgICAgbmF2TGluayA9IG5hdkxpbmsucGFyZW50RWxlbWVudFxuICAgIH1cblxuICAgIHRoaXMuX2xpbmsgPSBuYXZMaW5rXG5cbiAgICBsZXQgdG9nZ2xlSWQgPSBuYXZMaW5rLmdldEF0dHJpYnV0ZShcImRhdGEtdG9nZ2xlXCIpXG4gICAgdGhpcy5fY29udGFpbmVyID0gdGhpcy5fbmF2aWdhdGlvbi5fbmF2TGV2ZWwwQm9keVxuICAgIHRoaXMuX3NlY3Rpb24gPSB0aGlzLl9uYXZpZ2F0aW9uLl9uYXZMZXZlbDAucXVlcnlTZWxlY3RvcihgIyR7dG9nZ2xlSWR9YCkhIGFzIEhUTUxFbGVtZW50XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcHVibGljIGZyb21MZXZlbDEobmF2TGluazogSFRNTEVsZW1lbnQpIHtcbiAgICB3aGlsZSAobmF2TGluay5wYXJlbnRFbGVtZW50KSB7XG4gICAgICBpZiAoKG5hdkxpbmsgPT09IHRoaXMuX25hdmlnYXRpb24uX2hhbWJ1cmdlckVsZW1lbnQpIHx8IERvbS5oYXNDbGFzcyhuYXZMaW5rLCBDTEFTU19OQVZfTElOSykpIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgbmF2TGluayA9IG5hdkxpbmsucGFyZW50RWxlbWVudFxuICAgIH1cblxuICAgIHRoaXMuX2xpbmsgPSBuYXZMaW5rXG4gICAgdGhpcy5fY29udGFpbmVyID0gbmF2TGluay5wYXJlbnRFbGVtZW50ISBhcyBIVE1MRWxlbWVudFxuICAgIHRoaXMuX3NlY3Rpb24gPSB0aGlzLl9jb250YWluZXIhLnF1ZXJ5U2VsZWN0b3IoUVVFUllfTkFWX0JPRFkpISBhcyBIVE1MRWxlbWVudFxuICAgIHRoaXMuX2Zvb3RlciA9IHRoaXMuX2NvbnRhaW5lciEucXVlcnlTZWxlY3RvcihRVUVSWV9OQVZfRk9PVEVSKSEgYXMgSFRNTEVsZW1lbnRcblxuICAgIGlmIChuYXZMaW5rID09PSB0aGlzLl9uYXZpZ2F0aW9uLl9oYW1idXJnZXJFbGVtZW50KSB7XG4gICAgICB0aGlzLl9jb250YWluZXIgPSB0aGlzLl9uYXZpZ2F0aW9uLl9uYXZMZXZlbDFcbiAgICAgIHRoaXMuX3NlY3Rpb24gPSB0aGlzLl9jb250YWluZXIucXVlcnlTZWxlY3RvcihRVUVSWV9OQVZfSEJfQk9EWSkhIGFzIEhUTUxFbGVtZW50XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHB1YmxpYyBwcmV2aW91c0xldmVsMSgpIHtcbiAgICBsZXQgcHJldiA9IG5ldyBOYXZpZ2F0aW9uSXRlbXModGhpcy5fbmF2aWdhdGlvbilcblxuICAgIHByZXYuX2xpbmsgPSB0aGlzLl9uYXZpZ2F0aW9uLl9uYXZMZXZlbDEucXVlcnlTZWxlY3RvcihRVUVSWV9OQVZfTElOS19BQ1RJVkUpISBhcyBIVE1MRWxlbWVudFxuICAgIHByZXYuX2NvbnRhaW5lciA9IHByZXYuX2xpbmsgPyBwcmV2Ll9saW5rLnBhcmVudEVsZW1lbnQhIDogdW5kZWZpbmVkXG4gICAgcHJldi5fc2VjdGlvbiA9IHByZXYuX2NvbnRhaW5lciA/IHByZXYuX2NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFFVRVJZX05BVl9CT0RZKSEgYXMgSFRNTEVsZW1lbnQgOiB1bmRlZmluZWRcbiAgICBwcmV2Ll9mb290ZXIgPSBwcmV2Ll9jb250YWluZXIgPyBwcmV2Ll9jb250YWluZXIucXVlcnlTZWxlY3RvcihRVUVSWV9OQVZfRk9PVEVSKSEgYXMgSFRNTEVsZW1lbnQgOiB1bmRlZmluZWRcblxuICAgIHJldHVybiBwcmV2XG4gIH1cblxuICBwdWJsaWMgaXNIYW1idXJnZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpbmsgPT09IHRoaXMuX25hdmlnYXRpb24uX2hhbWJ1cmdlckVsZW1lbnRcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgc2VhcmNoQW5kSW5pdGlhbGl6ZShcIi5uYXZcIiwgKGUpID0+IHtcbiAgICBuZXcgTmF2aWdhdGlvbihlKVxuICB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCBOYXZpZ2F0aW9uXG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uIn0=
