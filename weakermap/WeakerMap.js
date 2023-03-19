module.exports = class WeakerMap
{
    map = new Map;

    constructor(...entries)
    {
        entries.forEach(([key, value]) => this.set(key, value));
    }

    get size()
    {
        return this.map.size;
    }

    clear()
    {
        this.map.clear();
    }

    delete(key)
    {
        this.map.delete(key);
    }

    [Symbol.iterator]()
    {
        const mapIterator = this.map[Symbol.iterator]();
        
        return {
            next: () => {
                let entry, key, ref, value;
                
                do
                {
                    entry = mapIterator.next();

                    if(entry.done)
                    {
                        return entry;
                    }

                    [key, ref] = entry.value;
    
                    value = ref.deref();

                    if(!value)
                    {
                        this.map.delete(key);
                    }
                    
                } while(!value);

                return {done: false, value: [key, value]};
            }
        };
    }

    entries()
    {
        return this;
    }

    forEach(callback)
    {
        for(const [k,v] of this)
        {
            callback(v, k, this);
        }
    }

    get(key)
    {
        if(!this.has(key))
        {
            return;
        }

        return this.map.get(key).deref();
    }

    has(key)
    {
        if(!this.map.has(key))
        {
            return false;
        }

        const result = this.map.get(key).deref();

        if(!result)
        {
            this.map.delete(key);
        }

        return result;
    }

    keys()
    {
        return this.map.keys();
    }

    set(key, value)
    {
        return this.map.set(key, new WeakRef(value));
    }

    values()
    {
        return [...this.map.values()].map(v => v.deref());
    }
};

Object.defineProperty(module.exports, Symbol.species, module.exports);