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

	add(obj)
	{
		if(typeof obj !== 'function' && typeof obj !== 'object')
		{
			throw new Error('WeakerSet values must be objects.');
		}

		if(this.weakMap.has(obj))
		{
			return;
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

	difference(other)
	{
		const [a, b] = [this, other];

		if(a.size <= b.size)
		{
			const result = new this.constructor;
			for(const i of a.keys())
			{
				if(!b.has(i)) result.add(i);
			}

			return result;
		}
		else
		{
			const result = new this.constructor(a);

			for(const i of b.keys())
			{
				result.delete(i);
			}

			return result;
		}
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

	intersection(other)
	{
		const [a, b] = this.size <= other.size ? [this, other] : [other, this];
		const result = new this.constructor;

		for(const i of a.keys())
		{
			if(!b.has(i)) continue;
			result.add(i);
		}

		return result;
	}

	isDisjointFrom(other)
	{
		const [a, b] = this.size <= other.size ? [this, other] : [other, this];

		for(const i of a.keys())
		{
			if(b.has(i)) return false;
		}

		return true;
	}

	isSubsetOf(other)
	{
		const [a, b] = [this, other];

		for(const i of a.keys())
		{
			if(!b.has(i)) return false;
		}

		if(a.size > b.size) return false;

		return true;
	}

	isSupersetOf(other)
	{
		const [a, b] = [this, other];

		for(const i of b.keys())
		{
			if(!a.has(i)) return false;
		}

		if(a.size < b.size) return false;

		return true;
	}

	keys()
	{
		return this.values();
	}

	symmetricDifference(other)
	{
		const [a, b] = [this, other];
		const result = new this.constructor;

		for(const i of a.keys())
		{
			if(b.has(i)) continue;
			result.add(i);
		}

		for(const i of b.keys())
		{
			if(a.has(i)) continue;
			result.add(i);
		}

		return result;
	}

	union(other)
	{
		const [a, b] = [this, other];
		const result = new this.constructor;

		for(const i of a.keys())
		{
			result.add(i);
		}

		for(const i of b.keys())
		{
			result.add(i);
		}

		return result;
	}

	values()
	{
		return this.map.values();
	}

	[Symbol.iterator]()
	{
		const mapIterator = this.map[Symbol.iterator]();

		return {
			[Symbol.iterator]() { return this; },
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

	get size()
	{
		return this.map.size;
	}

	get [Symbol.toStringTag]()
	{
		return 'WeakerSet';
	}
};

Object.defineProperty(WeakerSet, Symbol.species, {value: WeakerSet});
