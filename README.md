# Dome

Dome is the DOM library part of
[Cull.JS](https://github.com/culljs/culljs/), the functional
JavaScript toolbelt for adults. Refer to Cull.JS for motivation behind
our API design and the general underlying philosophy.

## Function list

* [children](#children-elements) `(elements)`
* [id](#id-idStr) `(idStr)`
* [byClass](#byClass-className-parent) `(className, parent)`
* [remove](#remove-element) `(element)`
* [replace](#replace-element-replacement) `(element, replacement)`
* [hasClassName](#hasClassName-className-element) `(className, element)`
* [addClassName](#addClassName-cn-element) `(cn, element)`
* [removeClassName](#removeClassName-cn-element) `(cn, element)`
* [text](#text-elm) `(elm)`
* [frag](#frag-items) `(items)`
* [uuid](#uuid-object) `(object)`
* [contains](#contains-element-child) `(element, child)`
* [setData](#setData-data-element) `(data, element)`
* [getData](#getData-property-element) `(property, element)`
* [setProp](#setProp-properties-element) `(properties, element)`
* [append](#append-content-element) `(content, element)`
* [setContent](#setContent-children-element) `(children, element)`

## Documentation and examples

### children `(elements)`



```js

```

### id `(idStr)`



```js

```

### byClass `(className, parent)`



```js

```

### remove `(element)`



```js

```

### replace `(element, replacement)`



```js
var parent = dome.el("div", [dome.el("div")]);
var placeholder = parent.firstChild;
var el = dome.replace(placeholder, dome.el("p"));

assert.tagName(el, "p");
refute.same(parent.firstChild, placeholder);
```

### hasClassName `(className, element)`



```js

```

### addClassName `(cn, element)`



```js

```

### removeClassName `(cn, element)`



```js

```

### text `(elm)`



```js
var el = document.createElement("p");
el.innerHTML = "Hey there";

assert.equals(dome.text(el), "Hey there");
```

### frag `(items)`



```js
var frag = dome.frag();
assert.equals(frag.nodeType, 11);
```

### uuid `(object)`



```js
var object = {};
var id = dome.uuid(object);

assert.equals(id, dome.uuid(object));
assert.isNumber(id);
```

### contains `(element, child)`



```js
var parent = dome.el("div", [dome.el("div")]);
var child = parent.firstChild;

assert(dome.contains(parent, child));
```

### setData `(data, element)`



```js

```

### getData `(property, element)`



```js

```

### setProp `(properties, element)`



```js

```

### append `(content, element)`



```js

```

### setContent `(children, element)`



```js

```

## Run tests

Either:

```sh
./node_modules/.bin/buster-server
```

Hit [localhost:1111/capture](http://localhost:1111/capture) and then:

```sh
./node_modules/.bin/buster-test
```

**Or**

```sh
npm test
```

Then hit [localhost:8282](http://localhost:8282)

## Contributors

- [Martin Solli](https://github.com/msolli) contributed bug fixes for Opera.

Thanks!

## License

Copyright © 2012-2013, Christian Johansen and Magnar Sveen. Dome
uses semantic versioning. Code released under the BSD license.
Documentation released under CC Attribution-Share Alike.
