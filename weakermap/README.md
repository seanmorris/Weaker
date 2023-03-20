# WeakerMap

*A WeakerMap is an enumerable Map with with weak values rather than keys.*

This class implements a pattern similar to the 'WeakMap', however its *values* are weakly referenced, rather than the keys. This allows for enumeration and clearing and arbitrarily valued keys, and adds the limitation that the *values* must be objects.

## Install
```bash
npm install weakermap
```

```javascript
const WeakerMap = require('weakermap/WeakerMap');
```

## Methods

### WeakerMap.construct(...entries)
Create a new `WeakMap` object, optionally prepopulated by `...entries`.

#### Parameters
* `...entries` - A list of `[key, value]` pairs to add to the map.

#### Returns
A newly constructed `WeakerMap` object.

```javascript
const wm = new WeakerMap(['x', {a:1}], ['y', {b:2}], ['z', {c:3}]);
```

### WeakerMap.clear()
Clear all entries.

#### Parameters
*none*

#### Returns
*none*

```javascript
const wm = new WeakerMap(['x', {a:1}], ['y', {b:2}], ['z', {c:3}]);

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
const wm = new WeakerMap(['x', {a:1}], ['y', {b:2}], ['z', {c:3}]);

wm.delete('y');
```

### WeakerMap.entries()
Traverse all entries.

#### Parameters
*none*

#### Returns
A new Iterator that traverses the `WeakerMap`.

```javascript
const wm = new WeakerMap(['x', {a:1}], ['y', {b:2}], ['z', {c:3}]);

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
const wm = new WeakerMap(['x', {a:1}], ['y', {b:2}], ['z', {c:3}]);

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
const wm = new WeakerMap(['x', {a:1}], ['y', {b:2}], ['z', {c:3}]);

wm.get('x'); // {a:1}
```

### WeakerMap.has(key)
Check for the presence of a key.

#### Parameters
* `key` - The key to look up in the map.

#### Returns
`true` if the object at `key` is present, or `false` if not found.

```javascript
const wm = new WeakerMap(['x', {a:1}], ['y', {b:2}], ['z', {c:3}]);

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
const wm = new WeakerMap(['x', {a:1}], ['y', {b:2}], ['z', {c:3}]);

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
const wm = new WeakerMap();

wm.set('x', {a:1});
```

### WeakerMap.values()
Traverse all values.

#### Parameters
*none*

#### Returns
A new Iterator that traverses the values of the `WeakerMap`.

```javascript
const wm = new WeakerMap(['x', {a:1}], ['y', {b:2}], ['z', {c:3}]);

for(const value of wm.values())
{
    console.log(value);
}
// {a:1}
// {b:2}
// {c:3}
```
