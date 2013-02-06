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

    "delegation": {
        setUp: function () {
            this.el = dome.el("div", [dome.el("a")]);
        },

        "calls delegate with target element": function () {
            var delegator = this.spy();
            dome.delegate("click", delegator, function () {}, this.el);

            click(this.el.firstChild);

            assert.calledOnce(delegator);
            assert.calledWith(delegator, this.el.firstChild, "click");
        },

        "does not call handler if delegator returns falsy": function () {
            var delegator = this.stub().returns(false);
            var handler = this.spy();
            dome.delegate("click", delegator, handler, this.el);

            click(this.el.firstChild);

            refute.called(handler);
        },

        "calls handler if delegator returns truthy": function () {
            var delegator = this.stub().returns(true);
            var handler = this.spy();
            dome.delegate("click", delegator, handler, this.el);

            click(this.el.firstChild);

            assert.calledOnce(handler);
        },

        "calls handler with target as this": function () {
            var delegator = this.stub().returns(true);
            var handler = this.spy();
            dome.delegate("click", delegator, handler, this.el);

            click(this.el.firstChild);

            assert.calledOn(handler, this.el.firstChild);
        }
    }
});
