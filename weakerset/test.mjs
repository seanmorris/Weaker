import { test }  from  'node:test';
import assert  from  'node:assert';
import { WeakerSet }  from  './WeakerSet.mjs';

test('### WeakerSet.construct(...entries)', () => {
	const ws = new WeakerSet([ {a:1}, {b:2}, {c:3} ]);

	assert.strictEqual(ws instanceof WeakerSet, true);
});

test('### WeakerSet.add(obj)', () => {
	const ws = new WeakerSet;

	const a = {a:1};
	const b = {a:2};

	ws.add(a);
	ws.add(a);
	ws.add(a);

	assert.strictEqual(ws.has(a), true);
	assert.strictEqual(ws.has(b), false);
	assert.strictEqual(ws.size, 1);

	ws.add(b);
	ws.add(b);
	ws.add(b);

	assert.strictEqual(ws.has(a), true);
	assert.strictEqual(ws.has(b), true);
	assert.strictEqual(ws.size, 2);
});

test('### WeakerSet.clear()', () => {
	const ws = new WeakerSet([ {a:1}, {b:2}, {c:3} ]);

	ws.clear();

	assert.strictEqual(ws.size, 0);
});

test('### WeakerSet.delete()', () => {
	const a = {a:1};
	const b = {b:2};
	const c = {c:3};

	const ws = new WeakerSet([ a, b, c ]);

	ws.delete(b);

	assert.strictEqual(ws.size, 2);
});

test('### WeakerSet.entries()', () => {
	const subs = ['a', 'b', 'c'];
	const vals = [ 1,   2,   3 ];

	const ws = new WeakerSet([ {a:1}, {b:2}, {c:3} ]);

	for(const [key, value] of ws.entries())
	{
		const s = subs.shift();
		const v = vals.shift();

		assert.strictEqual(value[s], v);
		assert.strictEqual(key[s], v);
	}
});

test('### WeakerSet.forEach()', () => {
	const subs = ['a', 'b', 'c'];
	const vals = [ 1,   2,   3 ];

	const ws = new WeakerSet([ {a:1}, {b:2}, {c:3} ]);

	ws.forEach((value, key, set) => {
		const s = subs.shift();
		const v = vals.shift();

		assert.strictEqual(value[s], v);
		assert.strictEqual(key[s], v);
	});
});

test('### WeakerSet.has()', () => {
	const a = {a:1};
	const b = {b:2};
	const c = {c:3};
	const g = {g:7};

	const ws = new WeakerSet([ a, b, c ]);

	assert.strictEqual(ws.has(b), true); // true
	assert.strictEqual(ws.has(g), false); // false
});

test('### WeakerSet.keys()', () => {
	const subs = ['a', 'b', 'c'];
	const vals = [ 1,   2,   3 ];

	const ws = new WeakerSet([ {a:1}, {b:2}, {c:3} ]);

	for(const key of ws.keys())
	{
		const s = subs.shift();
		const v = vals.shift();

		assert.strictEqual(key[s], v);
	}
});

test('### WeakerSet.values()', () => {
	const subs = ['a', 'b', 'c'];
	const vals = [ 1,   2,   3 ];

	const ws = new WeakerSet([ {a:1}, {b:2}, {c:3} ]);

	for(const value of ws.values())
	{
		const s = subs.shift();
		const v = vals.shift();

		assert.strictEqual(value[s], v);
	}
});

test('### WeakerSet can be copied into a Set', () => {
	const subs = ['a', 'b', 'c'];
	const vals = [ 1,   2,   3 ];

	const ws = new WeakerSet([ {a:1}, {b:2}, {c:3} ]);
	const s = new Set(ws);

	for(const value of s.values())
	{
		const s = subs.shift();
		const v = vals.shift();

		assert.strictEqual(value[s], v);
	}
});

test('### WeakerSet can be difference\'d with a Set', () => {
	const subs = ['a', 'b', 'c'];
	const vals = [ 1,   2,   3 ];
	const objs = [ {a:1}, {b:2}, {c:3}, {d:4} ];
	const objsB = [ objs[3] ];

	const ws = new WeakerSet(objs);
	const s = new Set(objsB);

	const wss = ws.difference(s);

	assert.strictEqual(wss.size, 3);

	for(const value of wss.values())
	{
		const s = subs.shift();
		const v = vals.shift();

		assert.strictEqual(value[s], v);
	}

	assert.strictEqual(vals.length, 0);
	assert.strictEqual(subs.length, 0);
});

test('### WeakerSet can be intersection\'d with a Set', () => {
	const subs = ['a', 'b', 'c', 'd'];
	const vals = [ 1,   2,   3,   4 ];
	const objs = [ {a:1}, {b:2} ];
	const objsB = [ {c:3}, {d:4} ];

	const ws = new WeakerSet(objs);
	const s = new Set(objsB);

	const wss = ws.intersection(s);

	for(const value of wss.values())
	{
		const s = subs.shift();
		const v = vals.shift();

		assert.strictEqual(value[s], v);
	}
});

test('### WeakerSet can be disjoint from a Set', () => {
	const objs = [ {a:1}, {b:2} ];
	const objsB = [ {c:3}, {d:4} ];

	const ws = new WeakerSet(objs);
	const s = new Set(objsB);

	assert.strictEqual(ws.isDisjointFrom(s), true);
	assert.strictEqual(s.isDisjointFrom(ws), true);

	ws.add(objsB[0]);

	assert.strictEqual(ws.isDisjointFrom(s), false);
	assert.strictEqual(s.isDisjointFrom(ws), false);
});

test('### WeakerSet can be a subset of a Set', () => {
	const objs = [ {a:1}, {b:2}, {c:3} ];
	const objsB = [ ...objs, {d:4} ];

	const ws = new WeakerSet(objs);
	const s = new Set(objsB);

	assert.strictEqual(ws.isSubsetOf(s), true);
	assert.strictEqual(s.isSubsetOf(ws), false);

	const s2 = new Set(objs);
	const ws2 = new WeakerSet(objsB);

	assert.strictEqual(s2.isSubsetOf(ws2), true);
	assert.strictEqual(ws2.isSubsetOf(s2), false);
});

test('### WeakerSet can be a superset of a Set', () => {
	const objs = [ {a:1}, {b:2}, {c:3} ];
	const objsB = [ ...objs, {d:4} ];

	const s = new Set(objs);
	const ws = new WeakerSet(objsB);

	assert.strictEqual(ws.isSupersetOf(s), true);
	assert.strictEqual(s.isSupersetOf(ws), false);

	const s2 = new Set(objs);
	const ws2 = new WeakerSet(objsB);

	assert.strictEqual(s2.isSupersetOf(ws2), false);
	assert.strictEqual(ws2.isSupersetOf(s2), true);
});

test('### WeakerSet can be symmetricDifference\'d with a Set', () => {
	const subs = ['a', 'b', 'd'];
	const vals = [ 1,   2,   4 ];
	const objs = [ {a:1}, {b:2}, {c:3} ];
	const objsB = [ objs[2], {d:4} ];

	const ws = new WeakerSet(objs);
	const s = new Set(objsB);

	const wss = ws.symmetricDifference(s);

	assert.strictEqual(wss.size, 3);

	for(const value of wss.values())
	{
		const s = subs.shift();
		const v = vals.shift();

		assert.strictEqual(value[s], v);
	}

	assert.strictEqual(vals.length, 0);
	assert.strictEqual(subs.length, 0);
});

test('### WeakerSet can be unioned with a Set', () => {
	const objs = [ {a:1}, {b:2} ];
	const objsB = [ {c:3}, {d:4} ];

	const ws = new WeakerSet(objs);
	const s = new Set(objsB);

	const wss = ws.union(s);
	const ss = s.union(ws);

	assert.strictEqual(wss.size, 4);

	for(const item of [...objs, ...objsB])
	{
		assert.strictEqual(wss.has(item), true);
	}

	assert.strictEqual(ss.size, 4);

	for(const item of [...objs, ...objsB])
	{
		assert.strictEqual(ss.has(item), true);
	}
});

{
	const keep = [];
	const wm = new WeakerSet;

	{
		setTimeout(() => {
			let a = {a:1};
			let b = {b:2};
			let c = {c:3};
			let d = {d:4};
			let e = {e:5};

			[a, b, c, d, e].forEach(e => wm.add(e));

			keep.push(b,c,d);
		}, 20);
	};

	const lastTest = (wm) => test(`Ensure memory isn\'t leaking.`, t => {
		global.gc();
		setTimeout(() => assert.strictEqual(wm.size, 3), 100);
	});

	setTimeout(() => lastTest(wm), 500);
}
