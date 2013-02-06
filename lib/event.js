/*global cull, dome, window*/

// This is a modified version of code by Juriy Zaytsev originally published at
// http://msdn.microsoft.com/en-us/magazine/ff728624.aspx
(function (C, D) {
    function isHostMethod(object, method) {
        return (/^(?:function|object|unknown)$/).test(typeof object[method]);
    }

    var getUniqueId = (function () {
        if (typeof document.documentElement.uniqueID !== "undefined") {
            return function (element) {
                return element.uniqueID;
            };
        }
        var uid = 0;
        return function (element) {
            if (!element.__uniqueID) {
                element.__uniqueID = "uniqueID__" + uid;
                uid += 1;
            }
            return element.__uniqueID;
        };
    }());

    var elements = {}, on, off, d = document.documentElement;

    function createWrappedHandler(uid, handler) {
        return function (e) {
            handler.call(elements[uid], e || window.event);
        };
    }

    function createListener(uid, handler) {
        return {
            handler: handler,
            wrappedHandler: createWrappedHandler(uid, handler)
        };
    }

    if (isHostMethod(d, "addEventListener") &&
            isHostMethod(d, "removeEventListener") &&
            isHostMethod(window, "addEventListener") &&
            isHostMethod(window, "removeEventListener")) {
        on = function (element, eventName, handler) {
            element.addEventListener(eventName, handler, false);
        };

        off = function (element, eventName, handler) {
            element.removeEventListener(eventName, handler, false);
        };
    } else if (isHostMethod(d, "attachEvent") &&
                   isHostMethod(d, "detachEvent") &&
                   isHostMethod(window, "attachEvent") &&
                   isHostMethod("detachEvent")) {
        var listeners = {};

        on = function (element, eName, handler) {
            var uid = getUniqueId(element);
            elements[uid] = element;
            if (!listeners[uid]) { listeners[uid] = {}; }
            if (!listeners[uid][eName]) { listeners[uid][eName] = []; }
            var listener = createListener(uid, handler);
            listeners[uid][eName].push(listener);
            element.attachEvent("on" + eName, listener.wrappedHandler);
        };

        off = function (element, eName, handler) {
            var uid = getUniqueId(element);
            if (!listeners[uid] || !listeners[uid][eName]) { return; }
            listeners[uid][eName] = C.select(function (listener) {
                if (listener.handler !== handler) { return true; }
                element.detachEvent("on" + eName, listener.wrappedHandler);
            }, listeners[uid][eName]);
        };
    }

    function delegate(delegator, element, event, handler) {
        on(element, event, function (e) {
            if (delegator(e.target, event, e)) {
                handler.call(e.target, e);
            }
        });
    }

    dome.on = on;
    dome.off = off;
    dome.delegate = delegate;

    dome.propmap.events = function (el, events) {
        C.doall(function (prop) {
            on(el, prop, events[prop]);
        }, C.keys(events));
    };
}(cull, dome));
