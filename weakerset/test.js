const test = require('node:test');
const assert = require('node:assert/strict');
const WeakerSet = require('./WeakerSet');

test('Check the code from the README', () => {
    test('### WeakerSet.construct(...entries)', () => {
        const ws = new WeakerSet({a:1}, {b:2}, {c:3});

        assert.ok(ws instanceof WeakerSet);
    });

    test('### WeakerSet.add(obj)', () => {
        const ws = new WeakerSet();

        const a = {a:1};

        ws.add(a);
        assert.ok(ws.has(a));
    });

    test('### WeakerSet.clear()', () => {
        const ws = new WeakerSet({a:1}, {b:2}, {c:3});

        ws.clear();

        assert.strictEqual(ws.size, 0);
    });

    test('### WeakerSet.delete()', () => {
        const a = {a:1};
        const b = {b:2};
        const c = {c:3};

        const ws = new WeakerSet(a, b, c);

        ws.delete(b);

        assert.strictEqual(ws.size, 2);
    });

    test('### WeakerSet.entries()', () => {
        const subs = ['a', 'b', 'c'];
		const vals = [ 1,   2,   3 ];
        
        const ws = new WeakerSet({a:1}, {b:2}, {c:3});

        for(const [key, value] of ws.entries())
        {
            const s = subs.shift();
			const v = vals.shift();

			assert.strictEqual(value[s], v);
        }
    });

    test('### WeakerSet.forEach()', () => {
        const subs = ['a', 'b', 'c'];
		const vals = [ 1,   2,   3 ];

        const ws = new WeakerSet({a:1}, {b:2}, {c:3});

        ws.forEach((value, key, set) => {
            const s = subs.shift();
			const v = vals.shift();

            assert.ok(value[s], v);
        });
    });

    test('### WeakerSet.has()', () => {
        const a = {a:1};
        const b = {b:2};
        const c = {c:3};
        const g = {g:7};

        const ws = new WeakerSet(a, b, c);

        assert.ok(ws.has(b)); // true
        assert.ok(!ws.has(g)); // false
    });

    test('### WeakerSet.keys()', () => {
        const subs = ['a', 'b', 'c'];
		const vals = [ 1,   2,   3 ];

        const ws = new WeakerSet({a:1}, {b:2}, {c:3});

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

        const ws = new WeakerSet({a:1}, {b:2}, {c:3});

        for(const value of ws.values())
        {
            const s = subs.shift();
			const v = vals.shift();

			assert.strictEqual(value[s], v);
        }        
    });    
});