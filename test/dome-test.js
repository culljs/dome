/*global document, dome*/

buster.testCase("Dome", {
    "add class": {
        "sets initial class name": function () {
            var div = { className: "" };
            dome.cn.add("something", div);
            assert.className(div, "something");
        },

        "adds additional class name": function () {
            var div = { className: "hey" };
            dome.cn.add("something", div);
            assert.className(div, "hey something");
        },

        "does not add duplicate class name": function () {
            var div = { className: "hey" };
            dome.cn.add("hey", div);
            assert.equals(div.className, "hey");
        },

        "adds class name to all elements": function () {
            var divs = [
                { className: "hey" },
                { className: "" },
                { className: "meh heh" }
            ];
            dome.cn.add("hola", divs);
            assert.equals(divs[0].className, "hey hola");
            assert.equals(divs[1].className, "hola");
            assert.equals(divs[2].className, "meh heh hola");
        },

        "does not duplicate class name for element in list": function () {
            var divs = [
                { className: "hey" },
                { className: "" },
                { className: "meh heh" }
            ];
            dome.cn.add("hey", divs);
            assert.equals(divs[0].className, "hey");
            assert.equals(divs[1].className, "hey");
            assert.equals(divs[2].className, "meh heh hey");
        }
    },

    "remove class": {
        "does nothing when element has no classes": function () {
            var div = { className: "" };
            dome.cn.rm("something", div);
            assert.equals(div.className, "");
        },

        "removes only matching class": function () {
            var div = { className: "something" };
            dome.cn.rm("something", div);
            assert.equals(div.className, "");
        },

        "removes matching class": function () {
            var div = { className: "hey something there" };
            dome.cn.rm("something", div);
            assert.equals(div.className, "hey  there");
        },

        "removes all matching classes": function () {
            var div = { className: "hey hey something there hey" };
            dome.cn.rm("hey", div);
            assert.equals(div.className, "something there");
        },

        "removes matching class when last": function () {
            var div = { className: "something there" };
            dome.cn.rm("there", div);
            assert.equals(div.className, "something");
        },

        "removes matching class from all elements": function () {
            var divs = [
                { className: "meh" },
                { className: "some thing eh" },
                { className: "heh meh" }
            ];
            dome.cn.rm("meh", divs);
            assert.equals(divs[0].className, "");
            assert.equals(divs[1].className, "some thing eh");
            assert.equals(divs[2].className, "heh");
        }
    },

    "frag": {
        requiresSupportFor: {
            "document": typeof document !== "undefined"
        },

        "returns document fragment": function () {
            var frag = dome.frag();
            assert.equals(frag.nodeType, 11);
        }
    },

    "text": {
        "returns inner text": function () {
            var el = document.createElement("p");
            el.innerHTML = "Hey there";

            assert.equals(dome.text(el), "Hey there");
        },

        "returns inner text stripped of markup": function () {
            var el = document.createElement("p");
            el.innerHTML = "Hey <strong>there</strong>";

            assert.equals(dome.text(el), "Hey there");
        },

        "ignores comments": function () {
            var el = document.createElement("p");
            el.innerHTML = "Hey <!-- OK --><strong>there</strong>";

            assert.equals(dome.text(el), "Hey there");
        },

        "preserves line-breaks": function () {
            var el = document.createElement("p");
            el.innerHTML = "Hey\nThere";

            assert.equals(dome.text(el), "Hey\nThere");
        }
    },

    "uuid": {
        "sets and returns id": function () {
            var object = {};
            var id = dome.uuid(object);

            assert.equals(id, dome.uuid(object));
            assert.isNumber(id);
        },

        "uses unique ids": function () {
            var object = {};
            var object2 = {};
            var id = dome.uuid(object);
            var id2 = dome.uuid(object2);

            refute.equals(id, id2);
        }
    },

    "contains": {
        "returns true for parent/child": function () {
            var parent = dome.el("div", [dome.el("div")]);
            var child = parent.firstChild;

            assert(dome.contains(parent, child));
        },

        "returns true for grand parent/child": function () {
            var gp = dome.el("div", [dome.el("div", [dome.el("div")])]);
            var child = gp.firstChild.firstChild;

            assert(dome.contains(gp, child));
        },

        "returns false for grand siblings": function () {
            var parent = dome.el("div", [dome.el("div"), dome.el("div")]);

            refute(dome.contains(parent.firstChild, parent.lastChild));
        }
    }
});
