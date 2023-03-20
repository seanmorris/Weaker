const test = require('node:test');
const assert = require('node:assert/strict');
const WeakerMap = require('./WeakerMap');

test('### WeakerMap.construct(...entries)', () => {
	const wm = new WeakerMap(['x', {a:1}], ['y', {b:2}], ['z', {c:3}]);

	assert.ok(wm instanceof WeakerMap);
});

test('### WeakerMap.clear()', () => {
	const wm = new WeakerMap(['x', {a:1}], ['y', {b:2}], ['z', {c:3}]);

	wm.clear();

	assert.strictEqual(wm.size, 0);
});

test('### WeakerMap.delete(key)', () => {
	const wm = new WeakerMap(['x', {a:1}], ['y', {b:2}], ['z', {c:3}]);

	wm.delete('y');

	assert.strictEqual(wm.size, 2);
});

test('### WeakerMap.entries()', () => {
	const keys = ['x', 'y', 'z'];
	const subs = ['a', 'b', 'c'];
	const vals = [ 1,   2,   3 ];

	const wm = new WeakerMap(['x', {a:1}], ['y', {b:2}], ['z', {c:3}]);

	for(const [key, value] of wm.entries())
	{
		const k = keys.shift();
		const s = subs.shift();
		const v = vals.shift();

		assert.strictEqual(k, key);
		assert.strictEqual(value[s], v);
	}
});

test('### WeakerMap.forEach(callback)', () => {
	const keys = ['x', 'y', 'z'];
	const subs = ['a', 'b', 'c'];
	const vals = [ 1,   2,   3 ];

	const wm = new WeakerMap(['x', {a:1}], ['y', {b:2}], ['z', {c:3}]);

	wm.forEach((value, key, set) => {
		const k = keys.shift();
		const s = subs.shift();
		const v = vals.shift();

		assert.strictEqual(k, key);
		assert.strictEqual(value[s], v);
	});
});

test('### WeakerMap.get(key)', () => {
	const wm = new WeakerMap(['x', {a:1}], ['y', {b:2}], ['z', {c:3}]);

	const x = wm.get('x'); // {a:1}

	assert.strictEqual(x.a, 1);
});

test('### WeakerMap.has(callback)', () => {
	const wm = new WeakerMap(['x', {a:1}], ['y', {b:2}], ['z', {c:3}]);

	assert.ok(wm.has('x'));
	assert.ok(!wm.has('g'));
});

test('### WeakerMap.keys()', () => {
	const keys = ['x', 'y', 'z'];

	const wm = new WeakerMap(['x', {a:1}], ['y', {b:2}], ['z', {c:3}]);

	wm.forEach((value, key, set) => {
		const k = keys.shift();

		assert.strictEqual(k, key);
	});
});

test('### WeakerMap.set()', () => {
	const wm = new WeakerMap();

	wm.set('x', {a:100});

	const x = wm.get('x');

	assert.strictEqual(x.a, 100);
});

test('### WeakerMap.values()', () => {
	const subs = ['a', 'b', 'c'];
	const vals = [ 1,   2,   3 ];

	const wm = new WeakerMap(['x', {a:1}], ['y', {b:2}], ['z', {c:3}]);

	for(const value of wm.values())
	{
		const s = subs.shift();
		const v = vals.shift();

		assert.strictEqual(v, value[s]);
	}
});

{
	const keep = [];
	const wm = new WeakerMap;

	{
		setTimeout(() => {
			let a = {a:1};
			let b = {b:2};
			let c = {c:3};
			let d = {d:4};
			let e = {e:5};

			[ ['a',a], ['b',b], ['c',c], ['d',d], ['e',e] ].forEach(e => wm.set(...e));

			keep.push(b,c,d);
		}, 20);
	};

	const lastTest = (wm) => test(`Ensure memory isn\'t leaking.`, t => {
		global.gc();
		setTimeout(() => assert.strictEqual(wm.size, 3), 0);
	});

	setTimeout(() => lastTest(wm), 500);
}
