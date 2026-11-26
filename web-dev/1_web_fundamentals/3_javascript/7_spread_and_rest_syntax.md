# JavaScript — Spread and Rest Syntax

JavaScript uses three dots (`...`) for both spread and rest syntax. Their behavior depends on where they are used.

- **Spread:** Expands values into individual elements, properties or arguments.
- **Rest:** Collects multiple values into a single array or object.

## 1. Spread Syntax

### 1.1 Copying, Merging and Updating

As covered in previous topics, spread syntax is commonly used for shallow copying, merging collections and immutable updates.

```javascript
const numbers = [10, 20, 30];

// Copy an array
const copy = [...numbers];

// Combine arrays
const combined = [...numbers, 40, 50];

// Insert elements
const updated = [0, ...numbers, 40];

const user = { name: "Alex", age: 22 };

// Copy an object
const userCopy = { ...user };

// Update properties
const updatedUser = { ...user, age: 25 };

// Merge objects
const profile = { ...user, role: "admin" };
```

When merging objects, later properties override earlier properties with the same key.

```javascript
const defaults = { theme: "light", language: "en" };
const preferences = { theme: "dark" };

const settings = { ...defaults, ...preferences };

console.log(settings);
// { theme: 'dark', language: 'en' }
```

### 1.2 Spread in Function Calls

Spread expands iterable values into individual function arguments.

```javascript
const numbers = [10, 20, 30];

console.log(Math.max(...numbers)); // 30
console.log(Math.min(...numbers)); // 10

function add(a, b, c) {
    return a + b + c;
}

console.log(add(...numbers)); // 60

// Combine individual arguments with spread
console.log(add(5, ...[10, 20])); // 35
```

`add(...numbers)` is equivalent to `add(10, 20, 30)`.

### 1.3 Spreading Different Data Types

Array and function-call spread work with iterable values, such as arrays, strings, sets and maps.

```javascript
// String
console.log([..."Hello"]);
// ['H', 'e', 'l', 'l', 'o']

// Set
const unique = new Set([1, 2, 2, 3]);

console.log([...unique]);
// [1, 2, 3]

// Map
const users = new Map([
    [101, "Alex"],
    [102, "John"]
]);

console.log([...users]);
// [[101, 'Alex'], [102, 'John']]
```

Object spread works differently. It copies own enumerable properties rather than consuming iterable values.

```javascript
console.log({ ...["a", "b"] });
// { '0': 'a', '1': 'b' }

console.log({ ..."Hello" });
// { '0': 'H', '1': 'e', '2': 'l', '3': 'l', '4': 'o' }

console.log({ ...new Set([1, 2]) });
// {}

console.log({ ...new Map([["name", "Alex"]]) });
// {}
```

Map and Set entries are not enumerable object properties. To convert a Map into an ordinary object, use `Object.fromEntries()`.

```javascript
const map = new Map([["name", "Alex"]]);

console.log(Object.fromEntries(map));
// { name: 'Alex' }
```

### 1.4 Conditional Spreading

Conditional spreading adds elements or properties only when a condition is satisfied.

```javascript
const isAdmin = true;

const user = {
    name: "Alex",
    ...(isAdmin ? { role: "admin" } : {})
};

console.log(user);
// { name: 'Alex', role: 'admin' }
```

For arrays:

```javascript
const isLoggedIn = true;

const links = [
    "Home",
    "About",
    ...(isLoggedIn ? ["Dashboard"] : [])
];

console.log(links);
// ['Home', 'About', 'Dashboard']
```

When the condition is false, the empty object or array contributes nothing to the resulting collection.

---

## 2. Rest Syntax

### 2.1 Rest Parameters

Rest parameters collect remaining function arguments into an actual array, allowing functions to accept a variable number of arguments.

```javascript
function sum(...numbers) {
    let total = 0;

    for (const number of numbers) {
        total += number;
    }

    return total;
}

console.log(sum(10, 20));     // 30
console.log(sum(10, 20, 30)); // 60
console.log(sum());           // 0
```

Rest parameters can be combined with regular parameters.

```javascript
function greet(message, ...names) {
    for (const name of names) {
        console.log(`${message}, ${name}`);
    }
}

greet("Hello", "Alex", "John");

// Hello, Alex
// Hello, John
```

Prefer rest parameters over the older `arguments` object because rest parameters provide actual arrays and work with arrow functions.

### 2.2 Rest Destructuring

As covered in Destructuring, rest collects remaining properties or elements into a new collection.

```javascript
// Array rest
const [first, ...remaining] = [10, 20, 30];

console.log(first);     // 10
console.log(remaining); // [20, 30]

// Object rest
const user = {
    name: "Alex",
    age: 22,
    role: "admin"
};

const { name, ...details } = user;

console.log(details);
// { age: 22, role: 'admin' }
```

### 2.3 Combining Spread and Rest

Rest collects individual arguments, while spread expands a collection into individual arguments.

```javascript
function multiply(...numbers) {
    let result = 1;

    for (const number of numbers) {
        result *= number;
    }

    return result;
}

const values = [2, 3, 4];

console.log(multiply(...values)); // 24
```

Here:

- `multiply(...values)` uses spread to expand the array.
- `function multiply(...numbers)` uses rest to collect the arguments.

### 2.4 Forwarding Function Arguments

Spread and rest can be combined to create reusable functions that accept and forward any number of arguments.

```javascript
function execute(callback, ...args) {
    return callback(...args);
}

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

console.log(execute(add, 10, 20));      // 30
console.log(execute(multiply, 10, 20)); // 200
console.log(execute(Math.max, 5, 8, 3)); // 8
```

This pattern is useful when implementing higher-order functions, utility functions and function wrappers.

---

## 3. Rules and Limitations

### 3.1 Iterable Values and Enumerable Properties

Array and function-call spread require iterable values. Ordinary objects are not iterable by default.

Object spread copies own enumerable properties, including enumerable symbol-keyed properties.

```javascript
const user = { name: "Alex" };

// Valid
console.log({ ...user }); // { name: 'Alex' }

// Invalid — TypeError
// console.log([...user]);

// Object spread ignores null and undefined
console.log({ ...null });      // {}
console.log({ ...undefined }); // {}

// Array spread requires an iterable
// console.log([...null]);      // TypeError
// console.log([...undefined]); // TypeError
```

### 3.2 Shallow Copy Limitations

Spread creates shallow copies. Nested objects and arrays remain shared references.

```javascript
const original = {
    name: "Alex",
    address: { city: "Hyderabad" }
};

const copy = { ...original };

copy.address.city = "Bangalore";

console.log(original.address.city); // Bangalore
console.log(original.address === copy.address); // true
```

Use `structuredClone()` for deep copying supported data types, or spread each modified level for immutable nested updates.

Object spread also does not preserve the original object's prototype, non-enumerable properties or property descriptors.

### 3.3 Rest Syntax Restrictions

Rest parameters and rest destructuring must appear last. They cannot have a trailing comma.

```javascript
// Valid
function greet(message, ...names) {}

const [first, ...remaining] = [10, 20, 30];

// Invalid — SyntaxError
// function greet(...names, message) {}
// function greet(...names,) {}
// const [...remaining, last] = [10, 20, 30];
```

Spread, however, can appear multiple times and at different positions.

```javascript
const a = [1, 2];
const b = [4, 5];

const result = [0, ...a, 3, ...b, 6];

console.log(result);
// [0, 1, 2, 3, 4, 5, 6]
```

### 3.4 Large Function Argument Lists

Spreading very large arrays into function calls can exceed the JavaScript runtime's argument limit.

```javascript
const numbers = Array.from(
    { length: 1_000_000 },
    (_, i) => i
);

// May throw RangeError
// Math.max(...numbers);

// Safer approach
let max = -Infinity;

for (const number of numbers) {
    max = Math.max(max, number);
}

console.log(max); // 999999
```

The maximum number of supported function arguments depends on the JavaScript engine.

### 3.5 Quick Comparison

| Feature | Spread | Rest |
|---|---|---|
| Syntax | `...` | `...` |
| Purpose | Expands values | Collects values |
| Arrays | `[...numbers]` | `[first, ...remaining]` |
| Objects | `{ ...user }` | `{ name, ...details }` |
| Functions | `fn(...args)` | `function fn(...args)` |
| Position | Multiple positions allowed | Must appear last |
| Copy behavior | Shallow | Shallow collection |
| Common usage | Copying, merging, passing arguments | Destructuring, variable arguments |

**Remember:** Spread expands, while rest collects. The surrounding syntax determines which behavior applies.
