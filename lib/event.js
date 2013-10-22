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
            return {
                cancel: function () { off(element, eventName, handler); }
            };
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

            return { cancel: function () { off(element, eName, handler); } };
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

    delegate.bycn = function (className, element, event, handler) {
        delegate(C.partial(D.cn.has, className), element, event, handler);
    };

    dome.events = {
        mouseenter: function (element, handler) {
            var current = null;

            var min = on(element, "mouseover", function (event) {
                if (current !== element) {
                    handler.call(element, event);
                    current = element;
                }
            });

            var mout = on(element, "mouseout", function (e) {
                var target = e.relatedTarget || e.toElement;

                try {
                    if (target && !target.nodeName) {
                        target = target.parentNode;
                    }
                } catch (err) {
                    return;
                }

                if (element !== target && !dome.contains(element, target)) {
                    current = null;
                }
            });

            return {
                cancel: function () {
                    min.cancel();
                    mout.cancel();
                }
            };
        },

        mouseleave: function (element, handler) {
            return on(element, "mouseout", function (event) {
                if (!dome.contains(element, event.relatedTarget) &&
                        element !== event.relatedTarget) {
                    handler.call(element, event);
                }
            });
        }
    };

    dome.on = function (element, event, handler) {
        if (dome.events[event]) {
            return dome.events[event](element, handler);
        }
        return on(element, event, handler);
    };

    dome.off = off;
    dome.delegate = delegate;

    dome.propmap.events = function (el, events) {
        C.doall(function (prop) {
            on(el, prop, events[prop]);
        }, C.keys(events));
    };
}(cull, dome));
