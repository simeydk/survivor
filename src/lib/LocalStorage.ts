import { useState } from "react"

export class LSMap<K, V> extends Map {
    prefix: string
    ttlSecs: number
    separator: string = '--'
    constructor(prefix = 'cache', ttlSecs: number = 3600, ...rest) {
        // @ts-ignore
        super(...rest)
        this.prefix = prefix
        this.ttlSecs = ttlSecs
        setInterval(() => this.purge(), 5 * 60 * 1000)
    }

    private key(k: K) {
        return `${this.prefix}--${k}`
    }

    purge() {
        const now = Date.now()
        for (const key of Object.keys(window.localStorage)) {
            if (key.startsWith(this.prefix + this.separator)) {
                const {expiry} = JSON.parse(window.localStorage.getItem(key))
                if (now > expiry) {
                    window.localStorage.removeItem(key)
                }
            }
        }
    }

    clearAll() {
        for (const key of Object.keys(window.localStorage)) {
            if (key.startsWith(this.prefix + this.separator)) {
                window.localStorage.removeItem(key)
            }
        }
    }

    set(key: K, value: V) {
        const cacheValue = (value !== undefined) ? value : null
        const expiry = Date.now() + this.ttlSecs * 1000
        window.localStorage.setItem(this.key(key), JSON.stringify({value: cacheValue, expiry}))
        return super.set(key, value)
    }

    get(key: K) {
        const value = super.get(key)
        if (value) return value
        const cacheKey = this.key(key)
        const storeValueRaw = window.localStorage.getItem(cacheKey)
        if (storeValueRaw) {
            const {value: storeValue, expiry} = JSON.parse(storeValueRaw)
            if (Date.now() > expiry) {
                window.localStorage.removeItem(cacheKey)
                return null
            }
            return storeValue
        } else {
            return null
        }
    }

    delete(key: K) {
        const cacheKey = this.key(key)
        window.localStorage.removeItem(cacheKey)
        return super.delete(key)
    }

    assign(pairs: [K, V][]) {
        pairs.forEach(([key, value]) => this.set(key, value))
    }
}

// Hook
export function useLocalStorage<T>(key: string, initialValue: T) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState<T>(() => {
      if (typeof window === "undefined") {
        return initialValue;
      }
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };
    return [storedValue, setValue] as const;
  }