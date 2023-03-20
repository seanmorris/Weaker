# Weaker.js

[![CI test status](https://github.com/seanmorris/weaker/actions/workflows/test.yaml/badge.svg)](https://github.com/seanmorris/Weaker/actions)

*WeakerMaps are enumerable Maps with with weak values rather than keys.*

*WeakerSet are like WeakSets, but enumerable, and clearable.*

[WeakerMap](https://github.com/seanmorris/Weaker/tree/master/weakermap)

[WeakerSet](https://github.com/seanmorris/Weaker/tree/master/weakerset)

## Install
```bash
npm install weaker
```

```javascript
const WeakerMap = require('weaker/WeakerMap');
const WeakerSet = require('weaker/WeakerSet');
```

## About
### WeakerMap
This class implements a pattern similar to the 'WeakMap', however its *values* are weakly referenced, rather than the keys. This allows for enumeration, clearing and arbitrarily valued keys, with the limitation that the *values* must be objects. Note that elements may not be garbage collected immediately upon leaving a given scope, however this should not have an impact on memory, since the memory will not be freed until the garbage collector runs, with or without the `WeakerSet`. See [MDN's notes on WeakRefs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef#notes_on_weakrefs) for more info.

### WeakerSet
This class implements a pattern similar to the `WeakSet`, but allows for enumeration and clearing. Ironically, the implementation depends on a `WeakerMap` and a `WeakMap` in tandem, managing a group of `WeakRefs`. Note that elements may not be garbage collected immediately upon leaving a given scope, however this should not have an impact on memory, since the memory will not be freed until the garbage collector runs, with or without the `WeakerSet`. See [MDN's notes on WeakRefs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef#notes_on_weakrefs) for more info.

## Examples
### WeakerMap
A `WeakerMap` will only hold onto its values as long as they aren't garbage collected. Once that happens they will be removed without any furter intervention from the programmer.

*NOTE*: The following example makes use of `global.gc()` to force garbage collection to run regardless of existing heuristics. This requires node to be run with the `--expose-gc` flag. This is not necessary except to demonstrate the behavior in a short script, where the garbage collector would not normally run until the program exits.

```javascript
const WeakerMap = require('weakermap/WeakerMap');

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

### WeakerSet
A `WeakerSet` will only hold onto its values as long as they aren't garbage collected. Once that happens they will be removed without any furter intervention from the programmer.

*NOTE*: The following example makes use of `global.gc()` to force garbage collection to run regardless of existing heuristics. This requires node to be run with the `--expose-gc` flag. This is not necessary except to demonstrate the behavior in a short script, where the garbage collector would not normally run until the program exits.

```javascript
const WeakerSet = require('weakermap/WeakerSet');

const ws = new WeakerSet;
const retain  = [];

{
	let a = {a:1}, b = {b:2}, c = {c:3};

	[ a, b, c ].forEach(e => ws.add(e));

	retain.push(b,c);
};

const printRemaining = () => {
	retain;       // keep refs in-scope
	global.gc();  // force the garbage collector
	console.log(ws.values());
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

## Testing
```bash
npm test
```
