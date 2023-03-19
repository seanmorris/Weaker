# WeakerSet

*A WeakerSet an enumerable WeakSet*

### WeakerSet.construct(...entries)
Create a new `WeakerSet` object, optionally prepopulated by `...entries`.

#### Parameters
* `...entries` - A list of objects to add to the map.

#### Returns
A newly constructed `WeakerSet` object.

```javascript
const ws = new WeakerSet({a:1}, {b:2}, {c:3});
```

### WeakerSet.add(obj)
Add an object.

#### Parameters
* `key` - The key to set in the map.
* `value` - The value to set in the map.

#### Returns
*none*

```javascript
const ws = new WeakerSet();

ws.add({a:1});
```

### WeakerSet.clear()
Clear the `WeakerSet`.

```javascript
const ws = new WeakerSet({a:1}, {b:2}, {c:3});

ws.clear();

console.log( ws.size ); // 0
```

### WeakerSet.delete(obj)
Delete a key.

#### Parameters
* `key` - The key to delete from the map.

#### Returns
*none*

```javascript
const a = {a:1};
const b = {b:2};
const c = {c:3};

const ws = new WeakerSet(a, b, c);

ws.delete(b);
```

### WeakerSet.entries()
Traverse all entries.

#### Parameters
*none*

#### Returns
A new Iterator that traverses the `WeakerSet`.

```javascript
const ws = new WeakerSet({a:1}, {b:2}, {c:3});

for(const [key, value] of ws.entries())
{
    console.log({key, value});
}
```

### WeakerSet.forEach()
Traverse all entries with a callback.

#### Parameters
* `callback` - a function to run on each entry.

#### Returns
*none*

```javascript
const ws = new WeakerSet({a:1}, {b:2}, {c:3});

ws.forEach((value, key, set) => {
    console.log({value, key});
});
```

### WeakerSet.has(obj)
Check for the presence of a key.

#### Parameters
* `key` - The key to look up in the map.

#### Returns
`true` if the object at `key` is present, or `false` if not found.

```javascript
const a = {a:1};
const b = {b:2};
const c = {c:3};

const ws = new WeakerSet(a, b, c);

ws.has(b); // true
ws.has(g); // false
```

### WeakerSet.keys()
Traverse all keys.

#### Parameters
*none*

#### Returns
A new Iterator that traverses the `WeakerSet`.

```javascript
const ws = new WeakerSet({a:1}, {b:2}, {c:3});

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
const ws = new WeakerSet({a:1}, {b:2}, {c:3});

for(const value of ws.values())
{
    console.log(value);
}
// {a:1}
// {b:2}
// {c:3}
```