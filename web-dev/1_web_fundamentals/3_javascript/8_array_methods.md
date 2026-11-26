# Array Methods: map, filter, reduce and flatMap

JavaScript provides higher-order array methods that simplify data transformation, selection and aggregation.

These methods accept callback functions and do not directly mutate the original array. However, their callbacks can still mutate the original array or its elements.

## 1. map() — Transforming Elements

The `map()` method creates a new array by applying a transformation function to each element of the original array.

### 1.1 Syntax

```javascript
array.map((element, index, array) => {
    return transformedValue;
});
```

| Parameter | Description |
|---|---|
| `element` | Current element |
| `index` | Index of the current element |
| `array` | Original array |

**Return value:** A new array with the same length as the original array.

### 1.2 Transforming Values and Extracting Properties

```javascript
const numbers = [1, 2, 3, 4];

// Transform values
const doubled = numbers.map(n => n * 2);

console.log(doubled); // [2, 4, 6, 8]

// Using index
const indexed = numbers.map((n, i) => `${i}: ${n}`);

console.log(indexed);
// ['0: 1', '1: 2', '2: 3', '3: 4']

// Extract object properties
const users = [
    { id: 1, name: "Alex" },
    { id: 2, name: "John" }
];

const names = users.map(user => user.name);

console.log(names); // ['Alex', 'John']
```

### 1.3 Updating Objects Immutably

Use `map()` with object spread to update specific objects without modifying the original collection.

```javascript
const users = [
    { id: 1, name: "Alex", active: false },
    { id: 2, name: "John", active: false }
];

const updatedUsers = users.map(user =>
    user.id === 1
        ? { ...user, active: true }
        : user
);

console.log(updatedUsers);
// [
//     { id: 1, name: 'Alex', active: true },
//     { id: 2, name: 'John', active: false }
// ]
```

Only the modified object is recreated. Unchanged objects retain their original references.

### 1.4 Common Mistakes

When using a block-bodied arrow function, an explicit `return` is required.

```javascript
const numbers = [1, 2, 3];

// Incorrect
console.log(numbers.map(n => { n * 2 }));
// [undefined, undefined, undefined]

// Correct
console.log(numbers.map(n => { return n * 2 }));
// [2, 4, 6]

// Preferred for simple expressions
console.log(numbers.map(n => n * 2));
// [2, 4, 6]

// Returning object literals
console.log(numbers.map(n => ({ value: n })));
// [{ value: 1 }, { value: 2 }, { value: 3 }]
```

**Usage:** Data transformation, extracting properties, formatting values, rendering lists and immutable updates.

---

## 2. filter() — Selecting Elements

The `filter()` method creates a new array containing only elements for which the callback returns a truthy value.

### 2.1 Syntax

```javascript
array.filter((element, index, array) => {
    return condition;
});
```

The callback parameters are the same as `map()`.

**Return value:** A new array containing zero or more matching elements.

### 2.2 Filtering Values and Objects

```javascript
const numbers = [1, 2, 3, 4, 5];

// Select even numbers
const even = numbers.filter(n => n % 2 === 0);

console.log(even); // [2, 4]

// Remove a specific value
const remaining = numbers.filter(n => n !== 3);

console.log(remaining); // [1, 2, 4, 5]

const products = [
    { name: "Laptop", price: 50000, inStock: true },
    { name: "Mouse", price: 800, inStock: false },
    { name: "Keyboard", price: 2000, inStock: true }
];

// Multiple conditions
const available = products.filter(
    product => product.inStock && product.price < 10000
);

console.log(available);
// [{ name: 'Keyboard', price: 2000, inStock: true }]
```

### 2.3 Removing Falsy Values

```javascript
const values = [0, 1, null, "Hello", false, undefined, ""];

console.log(values.filter(Boolean));
// [1, 'Hello']
```

`filter(Boolean)` removes all falsy values, including valid values such as `0` and `false`.

To remove only `null` and `undefined`:

```javascript
const result = values.filter(
    value => value !== null && value !== undefined
);
```

### 2.4 filter() vs find()

```javascript
const numbers = [10, 20, 30, 40];

console.log(numbers.filter(n => n > 15));
// [20, 30, 40]

console.log(numbers.find(n => n > 15));
// 20

console.log(numbers.filter(n => n > 100));
// []

console.log(numbers.find(n => n > 100));
// undefined
```

| Feature | filter() | find() |
|---|---|---|
| Returns | All matching elements | First matching element |
| Return type | Array | Element or undefined |
| Stops at first match | No | Yes |
| No match | `[]` | `undefined` |

**Usage:** Searching collections, filtering API responses, applying search criteria and removing elements immutably.

---

## 3. reduce() — Accumulating Values

The `reduce()` method processes array elements sequentially to produce a single accumulated result.

The result can be a number, string, array, object, Map or any other value.

### 3.1 Syntax

```javascript
array.reduce((accumulator, currentValue, index, array) => {
    return updatedAccumulator;
}, initialValue);
```

| Parameter | Description |
|---|---|
| `accumulator` | Result returned by the previous iteration |
| `currentValue` | Current element |
| `index` | Index of the current element |
| `array` | Original array |
| `initialValue` | Starting value of the accumulator, defaults to 0 for Number, "" for String |

**Return value:** The final accumulated result.

### 3.2 Understanding Execution

```javascript
const numbers = [10, 20, 30];

const total = numbers.reduce((acc, num) => {
    return acc + num;
}, 0);

console.log(total); // 60
```

Execution:

| Iteration | Accumulator | Current Value | Returned Value |
|---|---:|---:|---:|
| 1 | 0 | 10 | 10 |
| 2 | 10 | 20 | 30 |
| 3 | 30 | 30 | 60 |

The returned value becomes the accumulator for the next iteration.

### 3.3 Initial Value and Empty Arrays

When an initial value is provided, iteration starts from the first element.

Without an initial value, the first existing element becomes the accumulator, and iteration starts from the next existing element.

```javascript
const numbers = [10, 20, 30];

console.log(numbers.reduce((acc, n) => acc + n, 0));
// 60

console.log(numbers.reduce((acc, n) => acc + n));
// 60

// Empty array with initial value
console.log([].reduce((acc, n) => acc + n, 0));
// 0

// Empty array without initial value
// [].reduce((acc, n) => acc + n);
// TypeError
```

Prefer providing an explicit initial value to ensure predictable behavior and handle empty arrays safely.

Common initial values:

| Operation | Initial Value |
|---|---|
| Sum | `0` |
| Product | `1` |
| Maximum | `-Infinity` |
| Minimum | `Infinity` |
| String concatenation | `""` |
| Array accumulation | `[]` |
| Object accumulation | `{}` |
| Map accumulation | `new Map()` |

### 3.4 Calculating Totals and Aggregations

```javascript
const products = [
    { name: "Laptop", price: 50000, quantity: 1 },
    { name: "Mouse", price: 800, quantity: 2 },
    { name: "Keyboard", price: 2000, quantity: 1 }
];

const total = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
);

console.log(total); // 53600

const numbers = [10, 50, 20, 40];

const max = numbers.reduce(
    (acc, n) => Math.max(acc, n),
    -Infinity
);

console.log(max); // 50
```

### 3.5 Frequency Counting

Use an object or Map as the accumulator to count occurrences.

```javascript
const fruits = ["apple", "banana", "apple", "orange", "banana"];

const counts = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] ?? 0) + 1;
    return acc;
}, Object.create(null));

console.log(counts);
// { apple: 2, banana: 2, orange: 1 }
```

`Object.create(null)` creates an object without inherited properties, avoiding collisions with inherited property names.

Using a Map:

```javascript
const counts = fruits.reduce((acc, fruit) => {
    acc.set(fruit, (acc.get(fruit) ?? 0) + 1);
    return acc;
}, new Map());
```

### 3.6 Grouping Elements

```javascript
const products = [
    { name: "Laptop", category: "electronics" },
    { name: "Shirt", category: "clothing" },
    { name: "Mouse", category: "electronics" }
];

const grouped = products.reduce((acc, product) => {
    const category = product.category;

    acc[category] ??= [];
    acc[category].push(product);

    return acc;
}, Object.create(null));

console.log(grouped);
// {
//     electronics: [
//         { name: 'Laptop', category: 'electronics' },
//         { name: 'Mouse', category: 'electronics' }
//     ],
//     clothing: [
//         { name: 'Shirt', category: 'clothing' }
//     ]
// }
```

Modern JavaScript also provides dedicated grouping methods.

```javascript
// Group into an object
const groupedObject = Object.groupBy(
    products,
    product => product.category
);

// Group into a Map
const groupedMap = Map.groupBy(
    products,
    product => product.category
);
```

Prefer these dedicated methods when grouping is the only requirement.

### 3.7 Converting Arrays into Objects

```javascript
const users = [
    { id: 101, name: "Alex" },
    { id: 102, name: "John" }
];

const usersById = users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
}, {});

console.log(usersById);
// {
//     '101': { id: 101, name: 'Alex' },
//     '102': { id: 102, name: 'John' }
// }

console.log(usersById[101].name); // Alex
```

Alternatively, use `Object.fromEntries()` with `map()`.

```javascript
const usersById = Object.fromEntries(
    users.map(user => [user.id, user])
);
```

### 3.8 reduceRight()

`reduceRight()` works like `reduce()` but processes elements from right to left.

```javascript
const letters = ["A", "B", "C"];

console.log(letters.reduce((acc, ch) => acc + ch, ""));
// ABC

console.log(letters.reduceRight((acc, ch) => acc + ch, ""));
// CBA
```

It is useful when the order of accumulation matters.

### 3.9 Common Mistakes

Always return the accumulator from the callback.

```javascript
const numbers = [1, 2, 3];

// Incorrect
const result = numbers.reduce((acc, n) => {
    acc += n;
}, 0);

console.log(result); // undefined

// Correct
const total = numbers.reduce((acc, n) => {
    acc += n;
    return acc;
}, 0);

console.log(total); // 6
```

Avoid repeatedly copying a growing accumulator using spread syntax, as it can introduce unnecessary time and memory overhead.

```javascript
// Unnecessary repeated copying
const result = numbers.reduce(
    (acc, n) => [...acc, n * 2],
    []
);

// Simpler and more appropriate
const doubled = numbers.map(n => n * 2);
```

**Usage:** Calculating totals, aggregating data, frequency counting, grouping, building lookup tables and producing custom results.

---

## 4. flatMap() — Transforming and Flattening

The `flatMap()` method transforms each element and flattens returned arrays by one level.

It is conceptually equivalent to calling `map()` followed by `flat(1)`.

### 4.1 Syntax

```javascript
array.flatMap((element, index, array) => {
    return transformedValue;
});
```

**Return value:** A new array containing the transformed and flattened elements.

### 4.2 map() vs flatMap()

```javascript
const sentences = [
    "Hello World",
    "Learn JavaScript"
];

console.log(sentences.map(s => s.split(" ")));
// [
//     ['Hello', 'World'],
//     ['Learn', 'JavaScript']
// ]

console.log(sentences.flatMap(s => s.split(" ")));
// ['Hello', 'World', 'Learn', 'JavaScript']
```

### 4.3 Returning Zero, One or Multiple Elements

Unlike `map()`, `flatMap()` allows each input element to contribute a different number of output elements.

```javascript
const numbers = [-1, 0, 1, 2];

const result = numbers.flatMap(n => {
    if (n < 0) return [];       // Zero elements
    if (n === 0) return [n];    // One element

    return [n, n * 10];         // Multiple elements
});

console.log(result);
// [0, 1, 10, 2, 20]
```

### 4.4 Combining Filtering and Transformation

```javascript
const numbers = [1, 2, 3, 4, 5];

const result = numbers.flatMap(n =>
    n % 2 === 0 ? [n * 10] : []
);

console.log(result); // [20, 40]

// Equivalent using filter and map
const equivalent = numbers
    .filter(n => n % 2 === 0)
    .map(n => n * 10);
```

Choose whichever approach makes the intended operation clearer.

### 4.5 Flattening Nested Collections

```javascript
const departments = [
    { name: "Engineering", employees: ["Alex", "John"] },
    { name: "Design", employees: ["David"] }
];

const employees = departments.flatMap(
    department => department.employees
);

console.log(employees);
// ['Alex', 'John', 'David']
```

### 4.6 One-Level Flattening

`flatMap()` only flattens returned arrays by one level.

```javascript
const numbers = [1, 2];

const result = numbers.flatMap(n => [[n, n * 2]]);

console.log(result);
// [[1, 2], [2, 4]]
```

For deeper flattening, use `flat(depth)` separately.

Only actual arrays returned by the callback are flattened. Other values, including Sets and ordinary objects, are added as individual elements.

**Usage:** Extracting nested collections, splitting strings, expanding records and combining selection with transformation.

---

## 5. Method Chaining and Best Practices

### 5.1 Method Chaining

Array methods can be chained because methods such as `map()`, `filter()` and `flatMap()` return arrays.

```javascript
const products = [
    { name: "Laptop", price: 50000, inStock: true },
    { name: "Mouse", price: 800, inStock: false },
    { name: "Keyboard", price: 2000, inStock: true }
];

const total = products
    .filter(product => product.inStock)
    .map(product => product.price)
    .reduce((sum, price) => sum + price, 0);

console.log(total); // 52000
```

Execution:

```text
Original products
    ↓ filter()
Available products
    ↓ map()
[50000, 2000]
    ↓ reduce()
52000
```

Since `reduce()` can return any type, further array methods can only be chained when its result supports them.

### 5.2 Mutation and Shared References

These methods do not directly modify the original array. However, objects inside the resulting array may still reference the original objects.

```javascript
const users = [
    { name: "Alex", active: true },
    { name: "John", active: false }
];

const activeUsers = users.filter(user => user.active);

activeUsers[0].name = "Alexander";

console.log(users[0].name); // Alexander
```

To create independent shallow copies of the selected objects:

```javascript
const activeUsers = users
    .filter(user => user.active)
    .map(user => ({ ...user }));
```

Nested objects would still share references.

Avoid mutating original elements inside callbacks unless mutation is explicitly intended.

### 5.3 map() vs forEach()

```javascript
const numbers = [1, 2, 3];

// Transformation
const doubled = numbers.map(n => n * 2);

console.log(doubled); // [2, 4, 6]

// Side effects
numbers.forEach(n => console.log(n));
```

| Feature | map() | forEach() |
|---|---|---|
| Purpose | Transformation | Performing side effects |
| Return value | New array | `undefined` |
| Supports array method chaining | Yes | No |

Use `map()` when you need transformed values and `forEach()` when you only need to perform an action for each element.

### 5.4 Performance Considerations

Chaining methods can create intermediate arrays and require multiple passes over the data.

```javascript
const numbers = [1, 2, 3, 4, 5];

// Multiple passes and intermediate arrays
const total = numbers
    .filter(n => n % 2 === 0)
    .map(n => n * 10)
    .reduce((sum, n) => sum + n, 0);

// Single pass
const optimized = numbers.reduce(
    (sum, n) => n % 2 === 0 ? sum + n * 10 : sum,
    0
);

console.log(total);     // 60
console.log(optimized); // 60
```

| Method | Typical Time Complexity* | Output Space |
|---|---|---|
| `map()` | O(n) | O(n) |
| `filter()` | O(n) | O(k) |
| `reduce()` | O(n) | Depends on accumulator |
| `flatMap()` | O(n + k) | O(k) |

Here, `n` is the input length and `k` is the output length.

*Assuming constant-time callback work, excluding the work of producing and flattening variable-length outputs for `flatMap()`.

Prefer readability for ordinary applications. Optimize when processing large collections or performance-critical code.

### 5.5 Choosing the Right Method

| Requirement | Method |
|---|---|
| Transform every element | `map()` |
| Select matching elements | `filter()` |
| Find the first matching element | `find()` |
| Produce an accumulated result | `reduce()` |
| Transform and flatten | `flatMap()` |
| Flatten nested arrays | `flat()` |
| Perform side effects | `forEach()` |
| Check if any element matches | `some()` |
| Check if all elements match | `every()` |
| Group elements by a key | `Object.groupBy()` / `Map.groupBy()` |
| Stop iteration early | `for...of`, `find()`, `some()` or `every()` |

### 5.6 Quick Reference

Consider the input array `[1, 2, 3, 4]`.

| Method | Example | Result |
|---|---|---|
| `map()` | `arr.map(n => n * 2)` | `[2, 4, 6, 8]` |
| `filter()` | `arr.filter(n => n % 2 === 0)` | `[2, 4]` |
| `reduce()` | `arr.reduce((a, n) => a + n, 0)` | `10` |
| `flatMap()` | `arr.flatMap(n => [n, n])` | `[1, 1, 2, 2, 3, 3, 4, 4]` |

**Key takeaway:**

- `map()` — Transform.
- `filter()` — Select.
- `reduce()` — Accumulate.
- `flatMap()` — Transform and flatten.

Always choose the method that most clearly expresses the intended operation rather than using `reduce()` for everything.
