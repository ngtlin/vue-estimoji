import { __extends } from "tslib";
import anime from "animejs";
import DomElement from "../DomElement";
var CLASS_ITEMS = ".toolbar__item";
var CLASS_SHOW = "item--show";
var ANIMATION_START_DELAY = 100;
var ANIMATION_OFFSET = 50;
/**
 * Toolbar component. Use this component to show and hide the
 * individual toolbar items.
 */
var Toolbar = /** @class */ (function (_super) {
    __extends(Toolbar, _super);
    function Toolbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Makes the toolbar items visible.
     */
    Toolbar.prototype.show = function () {
        var delay = ANIMATION_START_DELAY;
        var items = this.element.querySelectorAll(CLASS_ITEMS);
        var timeline = anime.timeline();
        var _loop_1 = function (index) {
            timeline.add({
                targets: items[index],
                duration: 0,
                offset: delay,
                complete: function () {
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
        var timeline = anime.timeline();
        var _loop_2 = function (index) {
            timeline.add({
                targets: items[index],
                duration: 0,
                offset: delay,
                complete: function () {
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
        }
        else {
            this.hide();
        }
    };
    return Toolbar;
}(DomElement));
export default Toolbar;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vc3JjL3Rvb2xiYXIvVG9vbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxLQUFLLE1BQU0sU0FBUyxDQUFBO0FBQzNCLE9BQU8sVUFBVSxNQUFNLGVBQWUsQ0FBQTtBQUV0QyxJQUFNLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQTtBQUNwQyxJQUFNLFVBQVUsR0FBRyxZQUFZLENBQUE7QUFFL0IsSUFBTSxxQkFBcUIsR0FBRyxHQUFHLENBQUE7QUFDakMsSUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUE7QUFFM0I7OztHQUdHO0FBQ0g7SUFBc0IsMkJBQVU7SUFBaEM7O0lBc0RBLENBQUM7SUFwREM7O09BRUc7SUFDSSxzQkFBSSxHQUFYO1FBQ0UsSUFBSSxLQUFLLEdBQUcscUJBQXFCLENBQUE7UUFDakMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUV0RCxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUE7Z0NBQ3RCLEtBQUs7WUFDWixRQUFRLENBQUMsR0FBRyxDQUFDO2dCQUNYLE9BQU8sRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDO2dCQUNyQixRQUFRLEVBQUUsQ0FBQztnQkFDWCxNQUFNLEVBQUUsS0FBSztnQkFDYixRQUFRLEVBQUU7b0JBQ1IsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUE7Z0JBQ3hDLENBQUM7YUFDRixDQUFDLENBQUE7WUFDRixLQUFLLElBQUksZ0JBQWdCLENBQUE7O1FBVDNCLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtvQkFBeEMsS0FBSztTQVViO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0ksc0JBQUksR0FBWDtRQUNFLElBQUksS0FBSyxHQUFHLHFCQUFxQixDQUFBO1FBQ2pDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUE7UUFFdEQsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFBO2dDQUN0QixLQUFLO1lBQ1osUUFBUSxDQUFDLEdBQUcsQ0FBQztnQkFDWCxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQztnQkFDckIsUUFBUSxFQUFFLENBQUM7Z0JBQ1gsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsUUFBUSxFQUFFO29CQUNSLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO2dCQUMzQyxDQUFDO2FBQ0YsQ0FBQyxDQUFBO1lBQ0YsS0FBSyxJQUFJLGdCQUFnQixDQUFBOztRQVQzQixLQUFLLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFO29CQUE3QyxLQUFLO1NBVWI7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSSx3QkFBTSxHQUFiO1FBQ0UsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE1BQUksVUFBWSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNoRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7U0FDWjthQUFNO1lBQ0wsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1NBQ1o7SUFDSCxDQUFDO0lBQ0gsY0FBQztBQUFELENBdERBLEFBc0RDLENBdERxQixVQUFVLEdBc0QvQjtBQUVELGVBQWUsT0FBTyxDQUFBIiwiZmlsZSI6Im1haW4vc3JjL3Rvb2xiYXIvVG9vbGJhci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhbmltZSBmcm9tIFwiYW5pbWVqc1wiXG5pbXBvcnQgRG9tRWxlbWVudCBmcm9tIFwiLi4vRG9tRWxlbWVudFwiXG5cbmNvbnN0IENMQVNTX0lURU1TID0gXCIudG9vbGJhcl9faXRlbVwiXG5jb25zdCBDTEFTU19TSE9XID0gXCJpdGVtLS1zaG93XCJcblxuY29uc3QgQU5JTUFUSU9OX1NUQVJUX0RFTEFZID0gMTAwXG5jb25zdCBBTklNQVRJT05fT0ZGU0VUID0gNTBcblxuLyoqXG4gKiBUb29sYmFyIGNvbXBvbmVudC4gVXNlIHRoaXMgY29tcG9uZW50IHRvIHNob3cgYW5kIGhpZGUgdGhlXG4gKiBpbmRpdmlkdWFsIHRvb2xiYXIgaXRlbXMuXG4gKi9cbmNsYXNzIFRvb2xiYXIgZXh0ZW5kcyBEb21FbGVtZW50IHtcblxuICAvKipcbiAgICogTWFrZXMgdGhlIHRvb2xiYXIgaXRlbXMgdmlzaWJsZS5cbiAgICovXG4gIHB1YmxpYyBzaG93KCkge1xuICAgIGxldCBkZWxheSA9IEFOSU1BVElPTl9TVEFSVF9ERUxBWVxuICAgIGxldCBpdGVtcyA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKENMQVNTX0lURU1TKVxuXG4gICAgbGV0IHRpbWVsaW5lID0gYW5pbWUudGltZWxpbmUoKVxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBpdGVtcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHRpbWVsaW5lLmFkZCh7XG4gICAgICAgIHRhcmdldHM6IGl0ZW1zW2luZGV4XSxcbiAgICAgICAgZHVyYXRpb246IDAsXG4gICAgICAgIG9mZnNldDogZGVsYXksXG4gICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgaXRlbXNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoQ0xBU1NfU0hPVylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGRlbGF5ICs9IEFOSU1BVElPTl9PRkZTRVRcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGlkZXMgdGhlIHRvb2xiYXIgaXRlbXMuXG4gICAqL1xuICBwdWJsaWMgaGlkZSgpIHtcbiAgICBsZXQgZGVsYXkgPSBBTklNQVRJT05fU1RBUlRfREVMQVlcbiAgICBsZXQgaXRlbXMgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChDTEFTU19JVEVNUylcblxuICAgIGxldCB0aW1lbGluZSA9IGFuaW1lLnRpbWVsaW5lKClcbiAgICBmb3IgKGxldCBpbmRleCA9IGl0ZW1zLmxlbmd0aCAtIDE7IGluZGV4ID49IDA7IGluZGV4LS0pIHtcbiAgICAgIHRpbWVsaW5lLmFkZCh7XG4gICAgICAgIHRhcmdldHM6IGl0ZW1zW2luZGV4XSxcbiAgICAgICAgZHVyYXRpb246IDAsXG4gICAgICAgIG9mZnNldDogZGVsYXksXG4gICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgaXRlbXNbaW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfU0hPVylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGRlbGF5ICs9IEFOSU1BVElPTl9PRkZTRVRcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgdG9vbGJhciBpdGVtcyB2aXNpYmlsaXR5LlxuICAgKi9cbiAgcHVibGljIHRvZ2dsZSgpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke0NMQVNTX1NIT1d9YCkubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLnNob3coKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhpZGUoKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUb29sYmFyXG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uIn0=
