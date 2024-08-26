# Weaker

[![CI test status](https://github.com/seanmorris/weaker/actions/workflows/test.yaml/badge.svg)](https://github.com/seanmorris/Weaker/actions)

*WeakerMaps are enumerable Maps with with weak values rather than keys.*

*WeakerSets are like WeakSets but are enumerable and clearable.*

## Install
### Both
```bash
npm install weaker
```

```javascript
import { WeakerMap, WeakerSet } from 'weaker';
```

### One or the other
```bash
npm install weakermap
npm install weakerset
```

```javascript
import { WeakerMap } from 'weakermap';
import { WeakerSet } from 'weakerset';
```

## About

### Docs

[WeakerMap](https://github.com/seanmorris/Weaker/tree/master/weakermap)

[WeakerSet](https://github.com/seanmorris/Weaker/tree/master/weakerset)

### WeakerMap
This class implements a pattern similar to the 'WeakMap', however its *values* are weakly referenced, rather than the keys. This allows for enumeration, clearing and arbitrarily valued keys, with the limitation that the *values* must be objects. Note that elements may not be garbage collected immediately upon leaving a given scope, however this should not have an impact on memory, since the memory will not be freed until the garbage collector runs, with or without the `WeakerMap`. See [MDN's notes on WeakRefs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef#notes_on_weakrefs) for more info.

### WeakerSet
This class implements a pattern similar to the `WeakSet`, but allows for enumeration and clearing. Ironically, the implementation depends on a `WeakerMap` and a `WeakMap` in tandem, managing a group of `WeakRefs`. Note that elements may not be garbage collected immediately upon leaving a given scope, however this should not have an impact on memory, since the memory will not be freed until the garbage collector runs, with or without the `WeakerSet`. See [MDN's notes on WeakRefs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef#notes_on_weakrefs) for more info.

## Examples
### WeakerMap
A `WeakerMap` will only hold onto its values as long as they aren't garbage collected. Once that happens, they will be removed without any further intervention from the programmer.

#### Cache Example

A `WeakerMap` can be used to cache `fetch()` requests by URL:

```javascript
import { WeakerMap } from 'weakermap';

const cache = new WeakerMap();

async function fetchWithCache(url) {
    // Check if the response is already in the cache
    if (cache.has(url)) {
        console.log('Cache hit for:', url);
        return cache.get(url);
    }

    console.log('Cache miss for:', url);

    // Fetch the data and store it in the cache
    const response = await fetch(url);
    const data = await response.json();

    // Store the fetched data in the cache
    cache.set(url, data);

    return data;
}

// Example usage
(async () => {
    try {
        const url1 = 'https://jsonplaceholder.typicode.com/todos/1';
        const url2 = 'https://jsonplaceholder.typicode.com/todos/2';

        // Fetch data with caching
        console.time('Request 1');
        const data1 = await fetchWithCache(url1);
        console.log('Data from url1:', data1);
        console.timeEnd('Request 1');

        console.time('Request 2');
        const data2 = await fetchWithCache(url2);
        console.log('Data from url2:', data2);
        console.timeEnd('Request 2');

        // Fetch again to demonstrate cache hit
        console.time('Request 3');
        const data1Again = await fetchWithCache(url1);
        console.log('Data from url1 again:', data1Again);
        console.timeEnd('Request 3');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
```

#### Memory Usage:

⚠️ *NOTE* ⚠️: The following example makes use of `global.gc()` to force garbage collection to run regardless of existing heuristics. This requires node to be run with the `--expose-gc` flag. This is not necessary except to demonstrate the behavior in a short script, where the garbage collector would not normally run until the program exits.

```javascript
import { WeakerMap } from 'weaker/WeakerMap';

const wm = new WeakerMap;
const retain  = [];

{
    let a = {a:1}, b = {b:2}, c = {c:3};

    [ ['a', a], ['b', b], ['c', c] ].forEach(e => wm.set(...e));

    retain.push(b,c);
};

const printRemaining = () => {
    retain;       // keep refs in-scope
    global.gc();  // force the garbage collector
    console.log(wm.values());
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

### WeakerSet
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

## Testing
```bash
npm test
```

# 🍻 Licensed under the Apache License, Version 2.0

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

