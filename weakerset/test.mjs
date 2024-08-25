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

	ws.add(a);
	assert.strictEqual(ws.has(a), true);
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
