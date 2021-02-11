import { __values } from "tslib";
import DomElement from "../DomElement";
import { text } from "../DomFunctions";
var QUERY_DATA = ".js-data";
export function tryGetData(element) {
    var e_1, _a;
    var data = [];
    var elements = element.querySelectorAll(QUERY_DATA);
    try {
        for (var elements_1 = __values(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
            var entry = elements_1_1.value;
            var value = parseFloat(entry.getAttribute("data-value"));
            var color = entry.getAttribute("data-color");
            var title = text(entry);
            var item = {
                title: title,
                value: value,
                color: color
            };
            data.push(item);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (elements_1_1 && !elements_1_1.done && (_a = elements_1.return)) _a.call(elements_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return data;
}
export function removeAllChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}
export function createLegendItem(data) {
    var bullet = new DomElement("span")
        .addClass("bullet");
    if (isColor(data.color) === true) {
        bullet.setAttribute("style", "background-color: " + data.color + ";");
    }
    else {
        bullet.addClass(data.color);
    }
    var caption = new DomElement("span")
        .setHtml(data.title);
    return new DomElement("li")
        .appendChild(bullet)
        .appendChild(caption)
        .element;
}
export function isColor(str) {
    var pattern = /^#/i;
    return pattern.test(str);
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4vc3JjL2NoYXJ0cy9DaGFydEZ1bmN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxVQUFVLE1BQU0sZUFBZSxDQUFBO0FBQ3RDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQWF0QyxJQUFNLFVBQVUsR0FBRyxVQUFVLENBQUE7QUFFN0IsTUFBTSxVQUFVLFVBQVUsQ0FBQyxPQUFvQjs7SUFDN0MsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ2IsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFBOztRQUVuRCxLQUFrQixJQUFBLGFBQUEsU0FBQSxRQUFRLENBQUEsa0NBQUEsd0RBQUU7WUFBdkIsSUFBSSxLQUFLLHFCQUFBO1lBQ1osSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFFLENBQUMsQ0FBQTtZQUN6RCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBRSxDQUFBO1lBQzdDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUV2QixJQUFJLElBQUksR0FBRztnQkFDVCxLQUFLLE9BQUE7Z0JBQ0wsS0FBSyxPQUFBO2dCQUNMLEtBQUssT0FBQTthQUNOLENBQUE7WUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQ2hCOzs7Ozs7Ozs7SUFFRCxPQUFPLElBQUksQ0FBQTtBQUNiLENBQUM7QUFFRCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsSUFBVTtJQUMxQyxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUU7UUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7S0FDbEM7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLGdCQUFnQixDQUFDLElBQWdCO0lBQy9DLElBQU0sTUFBTSxHQUFHLElBQUksVUFBVSxDQUFrQixNQUFNLENBQUM7U0FDbkQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBRXJCLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDaEMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsdUJBQXFCLElBQUksQ0FBQyxLQUFLLE1BQUcsQ0FBQyxDQUFBO0tBQ2pFO1NBQU07UUFDTCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtLQUM1QjtJQUVELElBQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUFrQixNQUFNLENBQUM7U0FDcEQsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUV0QixPQUFPLElBQUksVUFBVSxDQUFnQixJQUFJLENBQUM7U0FDdkMsV0FBVyxDQUFDLE1BQU0sQ0FBQztTQUNuQixXQUFXLENBQUMsT0FBTyxDQUFDO1NBQ3BCLE9BQU8sQ0FBQTtBQUNaLENBQUM7QUFFRCxNQUFNLFVBQVUsT0FBTyxDQUFDLEdBQVc7SUFDakMsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFBO0lBQ3JCLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUMxQixDQUFDIiwiZmlsZSI6Im1haW4vc3JjL2NoYXJ0cy9DaGFydEZ1bmN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEb21FbGVtZW50IGZyb20gXCIuLi9Eb21FbGVtZW50XCJcbmltcG9ydCB7IHRleHQgfSBmcm9tIFwiLi4vRG9tRnVuY3Rpb25zXCJcblxuZXhwb3J0IGludGVyZmFjZSBDaGFydExhYmVsIHtcbiAgdGl0bGU6IHN0cmluZ1xuICBjb2xvcjogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2hhcnRBeGlzIGV4dGVuZHMgQ2hhcnRMYWJlbCB7XG4gIHZhbHVlOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgQ2hhcnREYXRhID0gQ2hhcnRBeGlzW11cblxuY29uc3QgUVVFUllfREFUQSA9IFwiLmpzLWRhdGFcIlxuXG5leHBvcnQgZnVuY3Rpb24gdHJ5R2V0RGF0YShlbGVtZW50OiBIVE1MRWxlbWVudCk6IENoYXJ0RGF0YSB7XG4gIGxldCBkYXRhID0gW11cbiAgbGV0IGVsZW1lbnRzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFFVRVJZX0RBVEEpXG5cbiAgZm9yIChsZXQgZW50cnkgb2YgZWxlbWVudHMpIHtcbiAgICBsZXQgdmFsdWUgPSBwYXJzZUZsb2F0KGVudHJ5LmdldEF0dHJpYnV0ZShcImRhdGEtdmFsdWVcIikhKVxuICAgIGxldCBjb2xvciA9IGVudHJ5LmdldEF0dHJpYnV0ZShcImRhdGEtY29sb3JcIikhXG4gICAgbGV0IHRpdGxlID0gdGV4dChlbnRyeSlcblxuICAgIGxldCBpdGVtID0ge1xuICAgICAgdGl0bGUsXG4gICAgICB2YWx1ZSxcbiAgICAgIGNvbG9yXG4gICAgfVxuXG4gICAgZGF0YS5wdXNoKGl0ZW0pXG4gIH1cblxuICByZXR1cm4gZGF0YVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQWxsQ2hpbGRyZW4obm9kZTogTm9kZSkge1xuICB3aGlsZSAobm9kZS5maXJzdENoaWxkKSB7XG4gICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmZpcnN0Q2hpbGQpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxlZ2VuZEl0ZW0oZGF0YTogQ2hhcnRMYWJlbCkge1xuICBjb25zdCBidWxsZXQgPSBuZXcgRG9tRWxlbWVudDxIVE1MU3BhbkVsZW1lbnQ+KFwic3BhblwiKVxuICAgIC5hZGRDbGFzcyhcImJ1bGxldFwiKVxuXG4gIGlmIChpc0NvbG9yKGRhdGEuY29sb3IpID09PSB0cnVlKSB7XG4gICAgYnVsbGV0LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIGBiYWNrZ3JvdW5kLWNvbG9yOiAke2RhdGEuY29sb3J9O2ApXG4gIH0gZWxzZSB7XG4gICAgYnVsbGV0LmFkZENsYXNzKGRhdGEuY29sb3IpXG4gIH1cblxuICBjb25zdCBjYXB0aW9uID0gbmV3IERvbUVsZW1lbnQ8SFRNTFNwYW5FbGVtZW50PihcInNwYW5cIilcbiAgICAuc2V0SHRtbChkYXRhLnRpdGxlKVxuXG4gIHJldHVybiBuZXcgRG9tRWxlbWVudDxIVE1MTElFbGVtZW50PihcImxpXCIpXG4gICAgLmFwcGVuZENoaWxkKGJ1bGxldClcbiAgICAuYXBwZW5kQ2hpbGQoY2FwdGlvbilcbiAgICAuZWxlbWVudFxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDb2xvcihzdHI6IHN0cmluZykge1xuICBjb25zdCBwYXR0ZXJuID0gL14jL2lcbiAgcmV0dXJuIHBhdHRlcm4udGVzdChzdHIpXG59XG4iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uIn0=
