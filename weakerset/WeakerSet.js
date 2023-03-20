const WeakerMap = require('weakermap/WeakerMap');

module.exports = class WeakerSet
{
	registry = new FinalizationRegistry(held => this.delete(this.map.get(held)));
	weakMap = new WeakMap;
	map = new WeakerMap;

	constructor(...entries)
	{
		entries.forEach((obj) => this.add(obj));
	}

	get size()
	{
		return this.map.size;
	}

	add(obj)
	{
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

					return {done: false, value: [value,value]};

				} while(true);
			}
		};
	}

	entries()
	{
		return this;
	}

	forEach(callback)
	{
		for(const [obj,] of this)
		{
			callback(obj, obj, this);
		}
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
		return [...this].map(v => v[1]);
	}
};

Object.defineProperty(module.exports, Symbol.species, module.exports);
