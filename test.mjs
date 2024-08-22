import { test }  from  'node:test';
import assert  from  'node:assert';

test('Import WeakerMap from index.mjs', async () => {
	const { WeakerMap } = await import("./index.mjs");
	assert.ok(WeakerMap.name === 'WeakerMap');
});

test('Import WeakerMap from specific file', async () => {
	const { WeakerMap } = await import("./WeakerMap.mjs");
	assert.ok(WeakerMap.name === 'WeakerMap');
});

test('Import WeakerSet from index.mjs', async () => {
	const { WeakerSet } = await import("./WeakerSet.mjs");
	assert.ok(WeakerSet.name === 'WeakerSet');
});

test('Import WeakerSet from specific file', async () => {
	const { WeakerSet } = await import("./WeakerSet.mjs");
	assert.ok(WeakerSet.name === 'WeakerSet');
});
