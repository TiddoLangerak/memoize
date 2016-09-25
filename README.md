Module to memoize function results for any number of arguments.

## Requirements
A modern ES6 environment (may be transpiled)

## Example usage

```javascript
import memoize from '@tiddo/memoize';

const fibonacci = memoize((n) => {
	if (n < 1) {
		return 1;
	}
	return fibonacci(n-1) + fibonacci(n-2);
});
```

## API

```Javascript
import memoize, { forget, forgetAll } from '@tiddo/memoize';
```

### `const f = memoize(func)`
Returns a memoized version of `func`. The function is memoized on all it's arguments (e.g. `f(a) !== f(a,a)`);

### `forget(f, ...args)`
Forgets the memoized result for the given memoized function and arguments.

### `forgetAll(f)`
Clears the entire memoization cache for the given function.


