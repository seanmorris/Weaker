# WeakerSet

[![CI test status](https://github.com/seanmorris/weaker/actions/workflows/test.yaml/badge.svg)](https://github.com/seanmorris/Weaker/actions)

*Like WeakSets, but enumerable, and clearable.*

This class implements a pattern similar to the `WeakSet`, but allows for enumeration and clearing. Ironically, the implementation depends on a `WeakerMap` and a `WeakMap` in tandem, managing a group of `WeakRefs`. Note that elements may not be garbage collected immediately upon leaving a given scope, however this should not have an impact on memory, since the memory will not be freed until the garbage collector runs, with or without the `WeakerSet`. See [MDN's notes on WeakRefs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef#notes_on_weakrefs) for more info.

## Install
```bash
npm install weakerset
```

```javascript
import { WeakerSet } from 'weakerset';
```

## Methods

### WeakerSet.construct(entries)
Create a new `WeakerSet` object, optionally prepopulated by `entries`.

#### Parameters
* `entries` - An iterable list of objects to add to the set.

#### Returns
A newly constructed `WeakerSet` object.

```javascript
const ws = new WeakerSet([ {a:1}, {b:2}, {c:3} ]);
```

### \[Symbol.iterator]()
Traverse the entries.

#### Parameters
*none*

#### Returns
A new Iterator that traverses the `WeakerSet`.

```javascript
const ws = new WeakerSet([ {a:1}, {b:2}, {c:3} ]);

for(const entry of ws)
{
    console.log(entry);
}
// { a: 1 }
// { b: 2 }
// { c: 3 }
```

```javascript
const ws = new WeakerSet([ {a:1}, {b:2}, {c:3} ]);
const ar = [...ws];

console.log(ar);
// [
//     { a: 1 },
//     { b: 2 },
//     { c: 3 }
// ]
```

```javascript
const ws = new WeakerSet([ {a:1}, {b:2}, {c:3} ]);

[...ws].map( entry => console.log( entry ));
// { a: 1 }
// { b: 2 }
// { c: 3 }
```

### WeakerSet.add(obj)
Add an object.

#### Parameters
* `obj` - The object to add to the set.

#### Returns
*none*

```javascript
const ws = new WeakerSet;

ws.add({a:1});
```

### WeakerSet.clear()
Clear the `WeakerSet`.

```javascript
const ws = new WeakerSet([ {a:1}, {b:2}, {c:3} ]);

ws.clear();

console.log( ws.size ); // 0
```

### WeakerSet.delete(obj)
Delete an object from the set.

#### Parameters
* `obj` - The object to delete from the set.

#### Returns
*none*

```javascript
const a = {a:1};
const b = {b:2};
const c = {c:3};

const ws = new WeakerSet([ a, b, c ]);

ws.delete(b);
```

### WeakerSet.entries()
Traverse all entries.

#### Parameters
*none*

#### Returns
A new Iterator that traverses the `WeakerSet`. Each entry is a pair `[key, value]` where both `key` and `value` are the same object.

```javascript
const ws = new WeakerSet([ {a:1}, {b:2}, {c:3} ]);

for(const [key, value] of ws.entries())
{
    console.log({key, value});
}
// {key: {a: 1}, value: {a: 1}}
// {key: {b: 1}, value: {b: 1}}
// {key: {c: 1}, value: {c: 1}}
```

### WeakerSet.forEach()
Traverse all entries with a callback.

#### Parameters
* `callback` - a function to run on each entry.

#### Returns
*none*

```javascript
const ws = new WeakerSet([ {a:1}, {b:2}, {c:3} ]);

ws.forEach((value, key, set) => {
    console.log({value, key});
});
```

### WeakerSet.has(obj)
Check for the presence of a key.

#### Parameters
* `obj` - The object to look up in the set.

#### Returns
`true` if the object `obj` is present, or `false` if not found.

```javascript
const a = {a:1};
const b = {b:2};
const c = {c:3};

const ws = new WeakerSet([ a, b, c ]);

console.log( ws.has(b) ); // true
console.log( ws.has(g) ); // false
```

### WeakerSet.keys()
Traverse all values (keys are not explicitly stored, so `keys()` returns the same thing as `values()`).

#### Parameters
*none*

#### Returns
A new Iterator that traverses the `WeakerSet`.

```javascript
const ws = new WeakerSet([ {a:1}, {b:2}, {c:3} ]);

for(const key of ws.keys())
{
    console.log(key);
}
// {a:1}
// {b:2}
// {c:3}

```
### WeakerSet.values()
Traverse all values.

#### Parameters
*none*

#### Returns
A new Iterator that traverses the `WeakerSet`.

```javascript
const ws = new WeakerSet([ {a:1}, {b:2}, {c:3} ]);

for(const value of ws.values())
{
    console.log(value);
}
// {a:1}
// {b:2}
// {c:3}
```

## Example
A `WeakerSet` will only hold onto its values as long as they aren't garbage collected. Once that happens, they will be removed without any further intervention from the programmer.

⚠️ *NOTE* ⚠️: The following example makes use of `global.gc()` to force garbage collection to run regardless of existing heuristics. This requires node to be run with the `--expose-gc` flag. This is not necessary except to demonstrate the behavior in a short script, where the garbage collector would not normally run until the program exits.

```javascript
import { WeakerSet } from 'weakerset';

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
// so we still have all three refs
// [ { a: 1 }, { b: 2 }, { c: 3 } ]

setTimeout(printRemaining, 500);
// Once we swap to a new 'job', it can run
// and we only have two objects now
// [ { b: 2 }, { c: 3 } ]
```

# 🍻 Licensed under the Apache License, Version 2.0

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
