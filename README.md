# Dome

Dome is the DOM library part of
[Cull.JS](https://github.com/culljs/culljs/), the functional
JavaScript toolbelt for adults. Refer to Cull.JS for motivation behind
our API design and the general underlying philosophy.

## Function list

* [children](#children-elements) `(elements)`
* [id](#id-idStr) `(idStr)`
* [get](#get-selectors-parent) `(selectors, parent)`
* [remove](#remove-element) `(element)`
* [hasClassName](#hasClassName-className-element) `(className, element)`
* [addClassName](#addClassName-cn-element) `(cn, element)`
* [removeClassName](#removeClassName-cn-element) `(cn, element)`
* [text](#text-elm) `(elm)`
* [frag](#frag-items) `(items)`
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

### get `(selectors, parent)`



```js

```

### remove `(element)`



```js

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

## License

Copyright © 2012-2013, Christian Johansen and Magnar Sveen. Dome
uses semantic versioning. Code released under the BSD license.
Documentation released under CC Attribution-Share Alike.
