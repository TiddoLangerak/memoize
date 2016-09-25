const _result = Symbol();
const caches = new WeakMap();

/**
 * Returns a memoized version of the function.
 */
export default function memoize(func) {
	const cache = new Map();
	const memoized = function memoized (...args) {
		const resultMap = args.reduce((map, arg) => {
			if (!map.has(arg)) {
				map.set(arg, new Map());
			}
			return map.get(arg);
		}, cache);

		if (!resultMap.has(_result)) {
			resultMap.set(_result, func(...args));
		}
		return resultMap.get(_result);
	}
	caches.set(memoized, cache);
	return memoized;
}

/**
 * Forgets the memoized value for the given function and arguments
 */
export function forget(func, ...args) {
	const cache = caches.get(func);
	if (!cache) {
		return;
	}
	const entry = args.reduce((cache, arg) => {
		if (!cache) {
			return cache;
		} else {
			return cache.get(arg);
		}
	}, cache);

	if (entry) {
		entry.delete(_result);
	}
}

/**
 * Clears the entire memoization cache of the given function
 */
export function forgetAll(func) {
	const cache = caches.get(func);
	if (!cache) {
		return;
	}
	cache.clear();
}
