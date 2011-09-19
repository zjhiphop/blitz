/**
* @namespace Contains touch functions for iPad
*/
ET.School.UI.Common.Touch = ET.School.UI.Common.Touch || {};

/**
* Returns the current browser is iPad safari or not
*/
ET.School.UI.Common.Touch.isiPad = function () {
    return navigator.userAgent.match(/iPad/i) !== null;
};

/**
* Redirect touch event to mouse event.
* @param {String} event event name like "touchstart","touchmove","touchend"
*/
ET.School.UI.Common.Touch.touchHandler = function (event) {
    var _touches = event.changedTouches;
    var _first = _touches[0];
    if (event.touches.length > 1) {
        return false;
    }
    var _type = "";
    var _simulatedEvent = document.createEvent("MouseEvent");
    switch (event.type) {
        case "touchstart":
            _type = "mousedown";
            break;

        case "touchmove":
            _type = "mousemove";
            event.preventDefault();
            break;

        case "touchend":
            _type = "mouseup";
            break;

        default:
            return;
    }

    _simulatedEvent.initMouseEvent(_type, true, true, window, 1, _first.screenX, _first.screenY, _first.clientX, _first.clientY, false, false, false, false, 0/*left*/, null);

    _first.target.dispatchEvent(_simulatedEvent);
};

/**
* Redirect all the touch event to mouse event for document
*/
ET.School.UI.Common.Touch.init = function () {
    ET.School.UI.Common.Touch.init(document);
};
/**
* Redirect all the touch event to mouse event for element.
* @param {Object} element Dom element.
*/
ET.School.UI.Common.Touch.init = function (element) {
    if (ET.School.UI.Common.Touch.isiPad()) {
        element.addEventListener("touchstart", ET.School.UI.Common.Touch.touchHandler, false);
        element.addEventListener("touchmove", ET.School.UI.Common.Touch.touchHandler, false);
        element.addEventListener("touchend", ET.School.UI.Common.Touch.touchHandler, false);
        element.addEventListener("touchcancel", ET.School.UI.Common.Touch.touchHandler, false);
    }
};
