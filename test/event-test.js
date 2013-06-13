/*global dome*/
function click(element) {
    if (document.createEvent) {
        var event = document.createEvent("MouseEvents");
        event.initEvent("click", true, false);
        element.dispatchEvent(event);
    } else if (document.createEventObject) {
        element.fireEvent("onclick");
    } else {
        buster.log("Uh-oh, no way to simulate click");
    }
}

buster.testCase("DOM events", {
    "adds event handler": function () {
        var handler = this.spy();
        var el = dome.el("button", { events: { click: handler } });

        click(el);

        assert.calledOnce(handler);
    },

    "deregisters listener by calling .off": function () {
        var handler = this.spy();
        var el = dome.el("button");
        var subscription = dome.on(el, "click", handler);
        subscription.cancel();

        click(el);

        refute.called(handler);
    },

    "delegation": {
        setUp: function () {
            this.el = dome.el("div", [dome.el("a")]);
        },

        "calls delegate with target element": function () {
            var delegator = this.spy();
            dome.delegate(delegator, this.el, "click", function () {});

            click(this.el.firstChild);

            assert.calledOnce(delegator);
            assert.calledWith(delegator, this.el.firstChild, "click");
        },

        "does not call handler if delegator returns falsy": function () {
            var delegator = this.stub().returns(false);
            var handler = this.spy();
            dome.delegate(delegator, this.el, "click", handler);

            click(this.el.firstChild);

            refute.called(handler);
        },

        "calls handler if delegator returns truthy": function () {
            var delegator = this.stub().returns(true);
            var handler = this.spy();
            dome.delegate(delegator, this.el, "click", handler);

            click(this.el.firstChild);

            assert.calledOnce(handler);
        },

        "calls handler with target as this": function () {
            var delegator = this.stub().returns(true);
            var handler = this.spy();
            dome.delegate(delegator, this.el, "click", handler);

            click(this.el.firstChild);

            assert.calledOn(handler, this.el.firstChild);
        },

        "delegates events based on target class name": function () {
            this.el.appendChild(dome.el("a", { className: "some" }));
            var handler = this.spy();
            dome.delegate.bycn("some", this.el, "click", handler);

            click(this.el.firstChild);
            refute.called(handler);

            click(this.el.lastChild);
            assert.calledOnce(handler);
        }
    },

    "custom events": function () {
        dome.events.weird = sinon.spy();
        var element = dome.el("div");
        var handler = function () {};
        dome.on(element, "weird", handler);

        assert.calledOnceWith(dome.events.weird, element, handler);
    }
});
