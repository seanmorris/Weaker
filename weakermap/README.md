# WeakerMap

[![CI test status](https://github.com/seanmorris/weaker/actions/workflows/test.yaml/badge.svg)](https://github.com/seanmorris/Weaker/actions)

*A WeakerMap is an enumerable Map with with weak values rather than keys.*

This class implements a pattern similar to the 'WeakMap', however its *values* are weakly referenced, rather than the keys. This allows for enumeration, clearing and arbitrarily valued keys, with the limitation that the *values* must be objects. Note that elements may not be garbage collected immediately upon leaving a given scope, however this should not have an impact on memory, since the memory will not be freed until the garbage collector runs, with or without the `WeakerMap`. See [MDN's notes on WeakRefs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef#notes_on_weakrefs) for more info.

## Install
```bash
npm install weakermap
```

```javascript
const WeakerMap = require('weakermap');
```

## Methods

### WeakerMap.construct(entries)
Create a new `WeakerMap` object, optionally prepopulated by `entries`.

#### Parameters
* `entries` - An iterable list of `[key, value]` pairs to add to the map.

#### Returns
A newly constructed `WeakerMap` object.

```javascript
const wm = new WeakerMap([ ['x', {a:1}], ['y', {b:2}], ['z', {c:3}] ]);
```
### \[Symbol.iterator]()
Traverse the entries.

#### Parameters
*none*

#### Returns
A new Iterator that traverses the `WeakerSet`.

```javascript
const wm = new WeakerMap([ ['a', {a:1}], ['b', {b:2}], ['c', {c:3}] ]);

for(const [key, value] of wm)
{
	console.log({key, value});
}
// { key: 'a', value: { a: 1 } }
// { key: 'b', value: { b: 2 } }
// { key: 'c', value: { c: 3 } }
```

```javascript
const wm = new Map([['a', {a:1}], ['b', {b:2}], ['c', {c:3}]]);
const ar = [...wm];
console.log(ar);
// [ [ 'a', { a: 1 } ], [ 'b', { b: 2 } ], [ 'c', { c: 3 } ] ]
```

```javascript
const wm = new Map([['a', {a:1}], ['b', {b:2}], ['c', {c:3}]]);

[...wm].map( ( [key, value] ) => console.log( {key, value} ));

// { key: 'a', value: { a: 1 } }
// { key: 'b', value: { b: 2 } }
// { key: 'c', value: { c: 3 } }
```

### WeakerMap.clear()
Clear all entries.

#### Parameters
*none*

#### Returns
*none*

```javascript
const wm = new WeakerMap([ ['x', {a:1}], ['y', {b:2}], ['z', {c:3}] ]);

wm.clear();

console.log(wm.size) // 0
```

### WeakerMap.delete(key)
Delete a key.

#### Parameters
* `key` - The key to delete from the map.

#### Returns
*none*

```javascript
const wm = new WeakerMap([ ['x', {a:1}], ['y', {b:2}], ['z', {c:3}] ]);

wm.delete('y');
```

### WeakerMap.entries()
Traverse all entries.

#### Parameters
*none*

#### Returns
A new Iterator that traverses the `WeakerMap`.

```javascript
const wm = new WeakerMap([ ['x', {a:1}], ['y', {b:2}], ['z', {c:3}] ]);

for(const [key, value] of wm.entries())
{
    console.log({key, value});
}
```

### WeakerMap.forEach(callback)
Traverse all entries with a callback.

#### Parameters
* `callback` - a function to run on each entry.

#### Returns
*none*

```javascript
const wm = new WeakerMap([ ['x', {a:1}], ['y', {b:2}], ['z', {c:3}] ]);

wm.forEach((value, key, set) => {
    console.log({value, key});
});
```

### WeakerMap.get(key)
Get the value for a key.

#### Parameters
* `key` - The key to look up in the map.

#### Returns
The object found at `key`, or `undefined` if not found.

```javascript
const wm = new WeakerMap([ ['x', {a:1}], ['y', {b:2}], ['z', {c:3}] ]);

wm.get('x'); // {a:1}
```

### WeakerMap.has(key)
Check for the presence of a key.

#### Parameters
* `key` - The key to look up in the map.

#### Returns
`true` if the object at `key` is present, or `false` if not found.

```javascript
const wm = new WeakerMap([ ['x', {a:1}], ['y', {b:2}], ['z', {c:3}] ]);

wm.has('x'); // true
wm.has('g'); // false
```

### WeakerMap.keys()
Traverse all keys.

#### Parameters
*none*

#### Returns
A new Iterator that traverses the keys of the `WeakerMap`.

```javascript
const wm = new WeakerMap([ ['x', {a:1}], ['y', {b:2}], ['z', {c:3}] ]);

for(const key of wm.keys())
{
    console.log(key);
}
// x
// y
// z
```

### WeakerMap.set(key, value)
Set a key.

#### Parameters
* `key` - The key to set in the map.
* `value` - The value to set in the map.

#### Returns
*none*

```javascript
const wm = new WeakerMap;

wm.set('x', {a:1});
```

### WeakerMap.values()
Traverse all values.

#### Parameters
*none*

#### Returns
A new Iterator that traverses the values of the `WeakerMap`.

```javascript
const wm = new WeakerMap([ ['x', {a:1}], ['y', {b:2}], ['z', {c:3}] ]);

for(const value of wm.values())
{
    console.log(value);
}
// {a:1}
// {b:2}
// {c:3}
```

## Example
A `WeakerMap` will only hold onto its values as long as they aren't garbage collected. Once that happens they will be removed without any furter intervention from the programmer.

*NOTE*: The following example makes use of `global.gc()` to force garbage collection to run regardless of existing heuristics. This requires node to be run with the `--expose-gc` flag. This is not necessary except to demonstrate the behavior in a short script, where the garbage collector would not normally run until the program exits.

```javascript
const WeakerMap = require('weakermap');

const wm = new WeakerMap;
const retain  = [];

{
	let a = {a:1}, b = {b:2}, c = {c:3};

	[ ['a',a], ['b',b], ['c',c] ].forEach(e => wm.set(...e));

	retain.push(b,c);
};

const printRemaining = () => {
	retain;       // keep refs in-scope
	global.gc();  // force the garbage collector
	console.log(wm.values());
};

printRemaining();
// The garbage collector hasn't run yet,
// So we still have all three refs
// [ { a: 1 }, { b: 2 }, { c: 3 } ]

setTimeout(printRemaining, 500);
// Once we swap to a new 'job', it can run
// and we only have two objects now:
// [ { b: 2 }, { c: 3 } ]
```
