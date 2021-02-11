import { __extends, __values } from "tslib";
import { searchAndInitialize } from "../Utils";
import DomElement from "../DomElement";
import * as Dom from "../DomFunctions";
var QUERY_HEADER = "thead th";
var CLASS_SORTED_ASCENDING = "js-ascending";
var CLASS_SORTED_DESCENDING = "js-descending";
var CLASS_ARROW = "arrow-icon";
/**
 * The Table component. Adds additional capabilities to standard HTML 5 tables.
 */
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
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
            for (var _b = __values(this.element.querySelectorAll(QUERY_HEADER)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var header = _c.value;
                if (header.getAttribute("data-type")) {
                    header.addEventListener("click", this._headerClickHandler);
                    var arrowElement = new DomElement("div")
                        .addClass(CLASS_ARROW)
                        .element;
                    header.appendChild(arrowElement);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
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
            for (var _b = __values(this.element.querySelectorAll(QUERY_HEADER)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var header = _c.value;
                if (header !== tableHeader) {
                    Dom.removeClass(header, CLASS_SORTED_ASCENDING);
                    Dom.removeClass(header, CLASS_SORTED_DESCENDING);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (Dom.hasClass(tableHeader, CLASS_SORTED_ASCENDING)) {
            Dom.removeClass(tableHeader, CLASS_SORTED_ASCENDING);
            Dom.addClass(tableHeader, CLASS_SORTED_DESCENDING);
            direction = direction || -1;
        }
        else {
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
            case "number": {
                // parse the string as a number
                return function (a, b) { return parseFloat(a) - parseFloat(b); };
            }
            default: {
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
        if (direction === void 0) { direction = 1; }
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
        if (direction === void 0) { direction = 1; }
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
        }
        else {
            this._body.insertBefore(tmpNode, referenceRow);
        }
    };
    /**
     * Destroys the component and clears all references.
     */
    Table.prototype.destroy = function () {
        var e_3, _a;
        try {
            for (var _b = __values(this.element.querySelectorAll(QUERY_HEADER)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var header = _c.value;
                header.removeEventListener("click", this._headerClickHandler);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        this._headerClickHandler = null;
        this._body = null;
        this._rows = null;
    };
    return Table;
}(DomElement));
export function init() {
    searchAndInitialize("table", function (e) {
        new Table(e);
    });
}
export default Table;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QixDQUFDLENBQUE7YUFDOUQ7Ozs7Ozs7OztRQUVBLElBQVksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDeEMsSUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7SUFDNUIsQ0FBQztJQUNILFlBQUM7QUFBRCxDQXJOQSxBQXFOQyxDQXJObUIsVUFBVSxHQXFON0I7QUFFRCxNQUFNLFVBQVUsSUFBSTtJQUNsQixtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFDO1FBQzdCLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2QsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBRUQsZUFBZSxLQUFLLENBQUEiLCJmaWxlIjoibWFpbi9zcmMvdGFibGUvVGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzZWFyY2hBbmRJbml0aWFsaXplIH0gZnJvbSBcIi4uL1V0aWxzXCJcbmltcG9ydCBEb21FbGVtZW50IGZyb20gXCIuLi9Eb21FbGVtZW50XCJcbmltcG9ydCAqIGFzIERvbSBmcm9tIFwiLi4vRG9tRnVuY3Rpb25zXCJcblxuY29uc3QgUVVFUllfSEVBREVSID0gXCJ0aGVhZCB0aFwiXG5cbmNvbnN0IENMQVNTX1NPUlRFRF9BU0NFTkRJTkcgPSBcImpzLWFzY2VuZGluZ1wiXG5jb25zdCBDTEFTU19TT1JURURfREVTQ0VORElORyA9IFwianMtZGVzY2VuZGluZ1wiXG5jb25zdCBDTEFTU19BUlJPVyA9IFwiYXJyb3ctaWNvblwiXG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcGFyZXI8VCA9IGFueT4ge1xuICAoaXRlbTE6IFQsIGl0ZW0yOiBUKTogbnVtYmVyXG59XG5cbi8qKlxuICogVGhlIFRhYmxlIGNvbXBvbmVudC4gQWRkcyBhZGRpdGlvbmFsIGNhcGFiaWxpdGllcyB0byBzdGFuZGFyZCBIVE1MIDUgdGFibGVzLlxuICovXG5jbGFzcyBUYWJsZSBleHRlbmRzIERvbUVsZW1lbnQge1xuICBwcml2YXRlIF9oZWFkZXJDbGlja0hhbmRsZXI6IChlOiBFdmVudCkgPT4gdm9pZFxuICBwcml2YXRlIF9ib2R5OiBIVE1MVGFibGVTZWN0aW9uRWxlbWVudFxuICBwcml2YXRlIF9yb3dzOiBIVE1MQ29sbGVjdGlvbk9mPEhUTUxUYWJsZVJvd0VsZW1lbnQ+XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHRhYmxlIGNvbXBvbmVudC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEhUTUxUYWJsZUVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KVxuXG4gICAgdGhpcy5faGVhZGVyQ2xpY2tIYW5kbGVyID0gdGhpcy5faGFuZGxlSGVhZGVyQ2xpY2suYmluZCh0aGlzKVxuXG4gICAgdGhpcy5fYm9keSA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwidGJvZHlcIikgYXMgSFRNTFRhYmxlU2VjdGlvbkVsZW1lbnRcbiAgICB0aGlzLl9yb3dzID0gdGhpcy5fYm9keS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRyXCIpXG5cbiAgICB0aGlzLl9pbml0aWFsaXplKClcbiAgfVxuXG4gIHByb3RlY3RlZCBfaW5pdGlhbGl6ZSgpIHtcbiAgICBmb3IgKGxldCBoZWFkZXIgb2YgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoUVVFUllfSEVBREVSKSkge1xuICAgICAgaWYgKGhlYWRlci5nZXRBdHRyaWJ1dGUoXCJkYXRhLXR5cGVcIikpIHtcbiAgICAgICAgaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9oZWFkZXJDbGlja0hhbmRsZXIpXG5cbiAgICAgICAgbGV0IGFycm93RWxlbWVudCA9IG5ldyBEb21FbGVtZW50KFwiZGl2XCIpXG4gICAgICAgICAgLmFkZENsYXNzKENMQVNTX0FSUk9XKVxuICAgICAgICAgIC5lbGVtZW50XG5cbiAgICAgICAgaGVhZGVyLmFwcGVuZENoaWxkKGFycm93RWxlbWVudClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2hhbmRsZUhlYWRlckNsaWNrKGU6IEV2ZW50KSB7XG4gICAgY29uc3QgdGggPSBlLnRhcmdldCBhcyBIVE1MVGFibGVIZWFkZXJDZWxsRWxlbWVudFxuICAgIHRoaXMuc29ydCh0aClcbiAgfVxuXG4gIC8qKlxuICAgKiBTb3J0cyB0aGUgdGFibGUgYWNjb3JkaW5nIHRvIHRoZSBzcGVjaWZpZWQgdGFibGUgaGVhZGVyIGVsZW1lbnQuXG4gICAqIFRoZSBjb2x1bW4gaXMgc29ydGVkIGFzY2VuZGluZyBieSBkZWZhdWx0IGlmIG5vIGRpcmVjdGlvbiBpcyBzcGVjaWZpZWQgYW5kIG5vXG4gICAqIGV4aXN0aW5nIHNvcnQgb3JkZXIgY2xhc3MgaXMgZm91bmQgaW4gdGhlIG1hcmt1cC5cbiAgICpcbiAgICogSWYgdGhlIGRpc3BsYXllZCBkYXRhIGlzIG5vdCBzdWl0YWJsZSBmb3Igc29ydGluZyBgPHRkLz5gIGVsZW1lbnRzIGNhbiBkZWZpbmUgYSBgZGF0YS12YWx1ZWAgYXR0cmlidXRlXG4gICAqIHdoaWNoIGlzIHRoZW4gdXNlZCBmb3IgdGhlIGRhdGEtc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge1RhYmxlSGVhZGVyfSB0YWJsZUhlYWRlciBUaGUgaGVhZGVyIGVsZW1lbnQgb2YgdGhlIHJvdyB0byBzb3J0IGJ5LlxuICAgKiBAcGFyYW0ge051bWJlcn0gZGlyZWN0aW9uIFRoZSBkaXJlY3Rpb24gdG8gc29ydCwgYDFgIGZvciBhc2NlbmRpbmcsIGAtMWAgZm9yIGRlc2NlbmRpbmcgb3JkZXIuIFRoaXMgcGFyYW1ldGVyIGlzIG9wdGlvbmFsLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBlcXVhbGl0eUNvbXBhcmVyIFRoZSBlcXVpYWxpdHkgY29tcGFyZXIgZnVuY3Rpb24gdG8gY29tcGFyZSBpbmRpdmlkdWFsIGNlbGwgdmFsdWVzLlxuICAgKi9cbiAgcHVibGljIHNvcnQoXG4gICAgdGFibGVIZWFkZXI6IEhUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50LFxuICAgIGRpcmVjdGlvbj86IC0xIHwgMSxcbiAgICBlcXVhbGl0eUNvbXBhcmVyPzogQ29tcGFyZXJcbiAgKSB7XG4gICAgaWYgKCF0YWJsZUhlYWRlciB8fCB0YWJsZUhlYWRlci50YWdOYW1lICE9PSBcIlRIXCIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBwYXJhbWV0ZXIgJ3RhYmxlSGVhZGVyJyBtdXN0IGJlIGEgdmFsaWQgY29sdW1uIGhlYWRlciBub2RlXCIpXG4gICAgfVxuXG4gICAgaWYgKGRpcmVjdGlvbiAhPT0gMSAmJiBkaXJlY3Rpb24gIT09IC0xICYmIGRpcmVjdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgb3V0IG9mIHJhbmdlLCBwYXJhbWV0ZXIgJ2RpcmVjdGlvbicgd2l0aCB2YWx1ZSAnJHtkaXJlY3Rpb259JyBtdXN0IGJlIGVpdGhlciAtMSwgMSBvciB1bmRlZmluZWRgKVxuICAgIH1cblxuICAgIGNvbnN0IGNvbHVtbkluZGV4ID0gdGFibGVIZWFkZXIuY2VsbEluZGV4XG5cbiAgICBpZiAoIWVxdWFsaXR5Q29tcGFyZXIpIHtcbiAgICAgIGxldCBkYXRhVHlwZSA9IHRhYmxlSGVhZGVyLmdldEF0dHJpYnV0ZShcImRhdGEtdHlwZVwiKVxuICAgICAgZXF1YWxpdHlDb21wYXJlciA9IHRoaXMuX2dldENvbXBhcmVyKGRhdGFUeXBlISlcbiAgICB9XG5cbiAgICBpZiAoY29sdW1uSW5kZXggPj0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoUVVFUllfSEVBREVSKS5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvbHVtbiBvdXQgb2YgcmFuZ2VcIilcbiAgICB9XG5cbiAgICBmb3IgKGxldCBoZWFkZXIgb2YgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoUVVFUllfSEVBREVSKSkge1xuICAgICAgaWYgKGhlYWRlciAhPT0gdGFibGVIZWFkZXIpIHtcbiAgICAgICAgRG9tLnJlbW92ZUNsYXNzKGhlYWRlciwgQ0xBU1NfU09SVEVEX0FTQ0VORElORylcbiAgICAgICAgRG9tLnJlbW92ZUNsYXNzKGhlYWRlciwgQ0xBU1NfU09SVEVEX0RFU0NFTkRJTkcpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKERvbS5oYXNDbGFzcyh0YWJsZUhlYWRlciwgQ0xBU1NfU09SVEVEX0FTQ0VORElORykpIHtcbiAgICAgIERvbS5yZW1vdmVDbGFzcyh0YWJsZUhlYWRlciwgQ0xBU1NfU09SVEVEX0FTQ0VORElORylcbiAgICAgIERvbS5hZGRDbGFzcyh0YWJsZUhlYWRlciwgQ0xBU1NfU09SVEVEX0RFU0NFTkRJTkcpXG5cbiAgICAgIGRpcmVjdGlvbiA9IGRpcmVjdGlvbiB8fCAtMVxuICAgIH0gZWxzZSB7XG4gICAgICBEb20ucmVtb3ZlQ2xhc3ModGFibGVIZWFkZXIsIENMQVNTX1NPUlRFRF9ERVNDRU5ESU5HKVxuICAgICAgRG9tLmFkZENsYXNzKHRhYmxlSGVhZGVyLCBDTEFTU19TT1JURURfQVNDRU5ESU5HKVxuICAgICAgZGlyZWN0aW9uID0gZGlyZWN0aW9uIHx8IDFcbiAgICB9XG5cbiAgICB0aGlzLl9xdWlja3NvcnQoY29sdW1uSW5kZXgsIDAsIHRoaXMuX3Jvd3MubGVuZ3RoIC0gMSwgZGlyZWN0aW9uLCBlcXVhbGl0eUNvbXBhcmVyKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9nZXRDZWxsKGNvbHVtbjogbnVtYmVyLCByb3c6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLl9yb3dzW3Jvd10uY2VsbHNbY29sdW1uXVxuICB9XG5cbiAgcHJvdGVjdGVkIF9nZXRSb3cocm93OiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5fcm93c1tyb3ddXG4gIH1cblxuICBwcm90ZWN0ZWQgX2dldENvbXBhcmVyKGRhdGFUeXBlOiBzdHJpbmcpOiBDb21wYXJlcjxzdHJpbmc+IHtcbiAgICBzd2l0Y2ggKGRhdGFUeXBlKSB7XG4gICAgICBjYXNlIFwibnVtYmVyXCI6IHtcbiAgICAgICAgLy8gcGFyc2UgdGhlIHN0cmluZyBhcyBhIG51bWJlclxuICAgICAgICByZXR1cm4gKGEsIGIpID0+IHBhcnNlRmxvYXQoYSkgLSBwYXJzZUZsb2F0KGIpXG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIC8vIGNvbXBhcmUgc3RyaW5nc1xuICAgICAgICByZXR1cm4gKGEsIGIpID0+IHtcbiAgICAgICAgICBpZiAoYSA8IGIpIHtcbiAgICAgICAgICAgIHJldHVybiAtMVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYSA+IGIpIHtcbiAgICAgICAgICAgIHJldHVybiAxXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfcXVpY2tzb3J0KFxuICAgIGNvbHVtbjogbnVtYmVyLFxuICAgIGxlZnQ6IG51bWJlcixcbiAgICByaWdodDogbnVtYmVyLFxuICAgIGRpcmVjdGlvbjogLTEgfCAxID0gMSxcbiAgICBlcXVhbGl0eUNvbXBhcmVyOiBDb21wYXJlcjxzdHJpbmc+XG4gICkge1xuICAgIGlmIChyaWdodCAtIGxlZnQgPiAwKSB7XG5cbiAgICAgIGxldCBwYXJ0aXRpb24gPSB0aGlzLl9wYXJ0aXRpb24oY29sdW1uLCBsZWZ0LCByaWdodCwgZGlyZWN0aW9uLCBlcXVhbGl0eUNvbXBhcmVyKVxuXG4gICAgICBpZiAobGVmdCA8IHBhcnRpdGlvbiAtIDEpIHtcbiAgICAgICAgdGhpcy5fcXVpY2tzb3J0KGNvbHVtbiwgbGVmdCwgcGFydGl0aW9uIC0gMSwgZGlyZWN0aW9uLCBlcXVhbGl0eUNvbXBhcmVyKVxuICAgICAgfVxuXG4gICAgICBpZiAocGFydGl0aW9uIDwgcmlnaHQpIHtcbiAgICAgICAgdGhpcy5fcXVpY2tzb3J0KGNvbHVtbiwgcGFydGl0aW9uLCByaWdodCwgZGlyZWN0aW9uLCBlcXVhbGl0eUNvbXBhcmVyKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfcGFydGl0aW9uKFxuICAgIGNvbHVtbjogbnVtYmVyLFxuICAgIGxlZnQ6IG51bWJlcixcbiAgICByaWdodDogbnVtYmVyLFxuICAgIGRpcmVjdGlvbjogLTEgfCAxID0gMSxcbiAgICBlcXVhbGl0eUNvbXBhcmVyOiBDb21wYXJlcjxzdHJpbmc+XG4gICkge1xuICAgIGxldCBwaXZvdCA9IHRoaXMuX2dldENlbGwoY29sdW1uLCBNYXRoLmZsb29yKChyaWdodCArIGxlZnQpIC8gMikpXG4gICAgbGV0IGkgPSBsZWZ0XG4gICAgbGV0IGogPSByaWdodFxuXG4gICAgd2hpbGUgKGkgPD0gaikge1xuICAgICAgd2hpbGUgKHRoaXMuX2VxdWFscyh0aGlzLl9nZXRDZWxsKGNvbHVtbiwgaSksIHBpdm90LCBlcXVhbGl0eUNvbXBhcmVyKSAqIGRpcmVjdGlvbiA8IDApIHtcbiAgICAgICAgaSsrXG4gICAgICB9XG5cbiAgICAgIHdoaWxlICh0aGlzLl9lcXVhbHModGhpcy5fZ2V0Q2VsbChjb2x1bW4sIGopLCBwaXZvdCwgZXF1YWxpdHlDb21wYXJlcikgKiBkaXJlY3Rpb24gPiAwKSB7XG4gICAgICAgIGotLVxuICAgICAgfVxuXG4gICAgICBpZiAoaSA8PSBqKSB7XG4gICAgICAgIHRoaXMuX3N3YXAoaSwgailcbiAgICAgICAgaSsrXG4gICAgICAgIGotLVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpXG4gIH1cblxuICBwcm90ZWN0ZWQgX2VxdWFscyhcbiAgICBhOiBIVE1MRWxlbWVudCxcbiAgICBiOiBIVE1MRWxlbWVudCxcbiAgICBlcXVhbGl0eUNvbXBhcmVyOiBDb21wYXJlcjxzdHJpbmc+XG4gICkge1xuICAgIGxldCBkYXRhQSA9IGEuZ2V0QXR0cmlidXRlKFwiZGF0YS12YWx1ZVwiKVxuICAgIGxldCBkYXRhQiA9IGIuZ2V0QXR0cmlidXRlKFwiZGF0YS12YWx1ZVwiKVxuXG4gICAgZGF0YUEgPSBkYXRhQSB8fCBhLnRleHRDb250ZW50IHx8IGEuaW5uZXJUZXh0XG4gICAgZGF0YUIgPSBkYXRhQiB8fCBiLnRleHRDb250ZW50IHx8IGIuaW5uZXJUZXh0XG5cbiAgICByZXR1cm4gZXF1YWxpdHlDb21wYXJlcihkYXRhQSwgZGF0YUIpXG4gIH1cblxuICBwcm90ZWN0ZWQgX3N3YXAoaTogbnVtYmVyLCBqOiBudW1iZXIpIHtcbiAgICBsZXQgdG1wTm9kZSA9IHRoaXMuX2JvZHkucmVwbGFjZUNoaWxkKHRoaXMuX2dldFJvdyhpKSwgdGhpcy5fZ2V0Um93KGopKVxuICAgIGNvbnN0IHJlZmVyZW5jZVJvdyA9IHRoaXMuX2dldFJvdyhpKVxuXG4gICAgaWYgKCFyZWZlcmVuY2VSb3cpIHtcbiAgICAgIHRoaXMuX2JvZHkuYXBwZW5kQ2hpbGQodG1wTm9kZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYm9keS5pbnNlcnRCZWZvcmUodG1wTm9kZSwgcmVmZXJlbmNlUm93KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgY29tcG9uZW50IGFuZCBjbGVhcnMgYWxsIHJlZmVyZW5jZXMuXG4gICAqL1xuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICBmb3IgKGxldCBoZWFkZXIgb2YgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoUVVFUllfSEVBREVSKSkge1xuICAgICAgaGVhZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9oZWFkZXJDbGlja0hhbmRsZXIpXG4gICAgfVxuXG4gICAgKHRoaXMgYXMgYW55KS5faGVhZGVyQ2xpY2tIYW5kbGVyID0gbnVsbDtcbiAgICAodGhpcyBhcyBhbnkpLl9ib2R5ID0gbnVsbDtcbiAgICAodGhpcyBhcyBhbnkpLl9yb3dzID0gbnVsbFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICBzZWFyY2hBbmRJbml0aWFsaXplKFwidGFibGVcIiwgKGUpID0+IHtcbiAgICBuZXcgVGFibGUoZSlcbiAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFibGVcbiJdLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4ifQ==
