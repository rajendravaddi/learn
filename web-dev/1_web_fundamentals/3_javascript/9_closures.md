# JavaScript — Closures

A closure is the combination of a function and its surrounding lexical environment. It allows a function to access variables from its outer scope, even after the outer function has finished executing.

Closures are created whenever functions are created in JavaScript.

## 1. Closure Fundamentals

### 1.1 Lexical Environment and Variable Retention

A lexical environment contains variable bindings and a reference to its surrounding lexical environment.

A function can access variables from the scope in which it was defined, regardless of where it is called.

```javascript
function outer() {
    const message = "Hello";

    function inner() {
        console.log(message);
    }

    return inner;
}

const greet = outer();

greet(); // Hello
```

Execution:

1. `outer()` creates the `message` variable and the `inner` function.
2. `outer()` returns the `inner` function.
3. The execution of `outer()` finishes.
4. `greet()` still has access to `message` through its closure.

The outer function does not need to remain executing for its variables to remain accessible.

### 1.2 Closures Capture Variable Bindings

Closures retain access to variable bindings rather than storing snapshots of their values.

```javascript
let count = 10;

const getCount = () => count;

console.log(getCount()); // 10

count = 20;

console.log(getCount()); // 20
```

When the captured variable changes, the function accesses its updated value.

A function does not need to be returned from another function to form a closure.

---

## 2. State and Encapsulation

### 2.1 Maintaining State Between Function Calls

Closures allow functions to preserve state across multiple invocations without using global variables.

```javascript
function createCounter() {
    let count = 0;

    return () => ++count;
}

const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

The `count` variable is not recreated when `counter()` is called. It belongs to the lexical environment created by `createCounter()`.

### 2.2 Private Variables and Shared State

Multiple functions can share the same lexical environment, providing controlled access to private state.

```javascript
function createCounter() {
    let count = 0;

    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count,
        reset: () => {
            count = 0;
        }
    };
}

const counter = createCounter();

counter.increment();
counter.increment();
counter.decrement();

console.log(counter.getCount()); // 1
console.log(counter.count);      // undefined

counter.reset();

console.log(counter.getCount()); // 0
```

The `count` variable cannot be accessed directly from outside `createCounter()`. It can only be accessed or modified through the returned functions.

This is a form of data encapsulation.

### 2.3 Independent Closure Instances

Each invocation of an outer function creates a separate lexical environment.

```javascript
function createCounter() {
    let count = 0;

    return () => ++count;
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2

console.log(counter2()); // 1

console.log(counter1()); // 3
```

Both counters use the same function definition but maintain independent state.

---

## 3. Practical Applications

### 3.1 Function Factories

A function factory creates and returns functions with customized behavior.

```javascript
function createMultiplier(factor) {
    return number => number * factor;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

Each returned function retains access to its own `factor` variable.

### 3.2 Partial Application

Partial application creates a new function by fixing some arguments of an existing function in advance.

```javascript
function partial(fn, ...fixedArgs) {
    return (...remainingArgs) =>
        fn(...fixedArgs, ...remainingArgs);
}

function multiply(a, b) {
    return a * b;
}

const double = partial(multiply, 2);

console.log(double(5));  // 10
console.log(double(10)); // 20
```

The returned function retains access to `fn` and `fixedArgs` through its closure.

### 3.3 Currying

Currying transforms a function that accepts multiple arguments into a sequence of functions that each accept one argument.

```javascript
// Regular function
const add = (a, b, c) => a + b + c;

console.log(add(10, 20, 30)); // 60

// Curried function
const curriedAdd = a => b => c => a + b + c;

console.log(curriedAdd(10)(20)(30)); // 60

const addTen = curriedAdd(10);

console.log(addTen(20)(30)); // 60
console.log(addTen(5)(5));   // 20
```

Each returned function retains access to arguments from its surrounding functions.

| Partial Application | Currying |
|---|---|
| Fixes some arguments in advance | Converts a multi-argument function into single-argument functions |
| `partial(add, 10)` | `curriedAdd(10)(20)(30)` |
| Remaining arguments can be passed together | Arguments are passed through successive function calls |

### 3.4 Memoization and Caching

Memoization is an optimization technique that stores previously computed results and reuses them when the same inputs are provided.

Closures allow the cache to remain accessible across function calls without exposing it globally.

```javascript
function memoize(fn) {
    const cache = new Map();

    return function (value) {
        if (cache.has(value)) {
            console.log("Cache hit");
            return cache.get(value);
        }

        const result = fn(value);

        cache.set(value, result);

        return result;
    };
}

const square = memoize(n => n * n);

console.log(square(5)); // 25
console.log(square(6)); // 36

console.log(square(5));
// Cache hit
// 25
```

The returned function retains access to both `cache` and `fn`.

This simplified implementation supports single-argument functions. Memoization is most suitable for deterministic functions whose results depend only on their inputs.

### 3.5 Other Use Cases

| Use Case | Role of Closures |
|---|---|
| Event handlers | Retain access to surrounding variables |
| Function wrappers | Retain the original function and configuration |
| Debouncing | Retain timer state between calls |
| Throttling | Retain timing information between calls |
| Asynchronous callbacks | Access variables after the surrounding function finishes |
| React Hooks | Capture state and props from a particular render |

These applications will be explored in their respective topics.

---

## 4. Common Pitfalls

### 4.1 Closures Inside Loops

The behavior of closures inside loops depends on how the loop variable is declared.

Using `var`:

```javascript
const functions = [];

for (var i = 0; i < 3; i++) {
    functions.push(() => i);
}

console.log(functions.map(fn => fn()));
// [3, 3, 3]
```

All functions share the same `i` binding. By the time they are called, the loop has finished and `i` is `3`.

Using `let`:

```javascript
const functions = [];

for (let i = 0; i < 3; i++) {
    functions.push(() => i);
}

console.log(functions.map(fn => fn()));
// [0, 1, 2]
```

`let` creates a separate binding for each iteration of this loop, allowing each closure to access its corresponding value.

### 4.2 Capturing Bindings vs Capturing Values

A closure may observe a different value from the one that existed when the function was created.

```javascript
let price = 100;

const getPrice = () => price;

price = 200;

console.log(getPrice()); // 200
```

To retain the original primitive value, create a separate binding.

```javascript
let price = 100;

const initialPrice = price;
const getPrice = () => initialPrice;

price = 200;

console.log(getPrice()); // 100
```

For objects and arrays, copying a reference into a separate variable does not prevent changes to the referenced object.

### 4.3 Memory Retention

Closures can keep referenced variables and objects reachable in memory for as long as the closure itself remains reachable.

```javascript
function createProcessor() {
    const data = new Array(1_000_000).fill(0);

    return index => data[index];
}

let processor = createProcessor();

console.log(processor(0)); // 0

// Release the reference to the closure
processor = null;
```

Once the closure and its associated data are no longer reachable, they become eligible for garbage collection.

Closures do not inherently cause memory leaks. However, unnecessary references can retain memory longer than intended.

Common precautions:

- Remove unused event listeners.
- Clear unnecessary timers.
- Avoid capturing large objects unnecessarily.
- Limit or clear long-lived caches.
- Release references to closures when they are no longer needed.
