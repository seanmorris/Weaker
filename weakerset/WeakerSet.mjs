import { WeakerMap } from 'weakermap/WeakerMap.mjs';

export class WeakerSet
{
	registry = new FinalizationRegistry(held => this.delete(this.map.get(held)));
	weakMap = new WeakMap;
	map = new WeakerMap;

	constructor(entries)
	{
		entries && entries.forEach((obj) => this.add(obj));
	}

	get size()
	{
		return this.map.size;
	}

	add(obj)
	{
		if(typeof obj !== 'function' && typeof obj !== 'object')
		{
			throw new Error('WeakerSet values must be objects.');
		}

		const keyObj = Object.create(null);

		this.registry.register(obj, keyObj);
		this.weakMap.set(obj, keyObj);
		this.map.set(keyObj, obj);
	}

	clear()
	{
		this.weakMap = new WeakMap;
		this.map.clear();
	}

	delete(obj)
	{
		if(!this.weakMap.has(obj))
		{
			return;
		}

		const keyObj = this.weakMap.get(obj);

		this.weakMap.delete(obj);
		this.map.delete(keyObj);
	}

	[Symbol.iterator]()
	{
		const mapIterator = this.map[Symbol.iterator]();

		return {
			next: () => {
				do
				{
					const entry = mapIterator.next();

					if(entry.done)
					{
						return {done:true};
					}

					const [key, value] = entry.value;

					if(!value)
					{
						this.map.delete(key);
						continue;
					}

					return {done: false, value};

				} while(true);
			}
		};
	}

	entries()
	{
		// return {[Symbol.iterator]: () => this[Symbol.iterator]()};

		const setIterator = this[Symbol.iterator]();

		return { [Symbol.iterator]() { return {
			next: () => {
				do
				{
					const entry = setIterator.next();

					if(entry.done)
					{
						return {done:true};
					}

					const value = entry.value;

					return {done: false, value: [value, value]};

				} while(true);
			}
		}}};
	}

	forEach(callback)
	{
		this.map.forEach((value, key, set) => callback(value, value, set));
	}

	has(obj)
	{
		if(!this.weakMap.has(obj))
		{
			return false;
		}

		const keyObj = this.weakMap.get(obj);

		return this.map.has(keyObj);
	}

	keys()
	{
		return this.values();
	}

	values()
	{
		return [...this];
	}
};

Object.defineProperty(WeakerMap, Symbol.species, WeakerMap);
