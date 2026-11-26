# JavaScript — Objects and Arrays

## 1. Object Fundamentals

An object is a collection of key-value pairs used to represent structured data. Object properties can contain primitive values, arrays, other objects, and functions.

### 1.1 Creating and Accessing Objects

Object literals are the preferred way to create ordinary objects in modern JavaScript.

```javascript
const user = {
    name: "Alex",
    age: 22,
    isActive: true
};

// Dot notation
console.log(user.name); // Alex

// Bracket notation
console.log(user["age"]); // 22

// Dynamic property access
const key = "name";
console.log(user[key]); // Alex

// Nonexistent property
console.log(user.email); // undefined
```

Use dot notation for known property names and bracket notation for dynamic property names or names containing special characters.

### 1.2 Adding, Updating and Deleting Properties

```javascript
const user = {
    name: "Alex",
    age: 22
};

// Add
user.email = "alex@example.com";

// Update
user.age = 23;

// Delete
delete user.email;

console.log(user);
// { name: 'Alex', age: 23 }
```

Declaring an object with `const` prevents reassignment but allows property mutation.

### 1.3 Property Shorthand and Computed Property Names

When a variable name matches the property name, we can use property shorthand.

Computed property names allow expressions to determine property names dynamically.

```javascript
const name = "Alex";
const age = 22;
const property = "email";

const user = {
    name,
    age,
    [property]: "alex@example.com"
};

console.log(user);
// { name: 'Alex', age: 22, email: 'alex@example.com' }
```

Property shorthand replaces `name: name` with `name`.

### 1.4 Object Methods

A function associated with an object property is called a method.

Modern JavaScript supports method shorthand syntax.

```javascript
const user = {
    name: "Alex",
    age: 22,

    introduce() {
        return `I am ${this.name}, aged ${this.age}`;
    }
};

console.log(user.introduce());
// I am Alex, aged 22
```

Use regular method syntax when accessing the object through `this`. Arrow functions do not have their own `this` binding.

### 1.5 Nested Objects and Safe Property Access

Objects can contain other objects.

```javascript
const user = {
    name: "Alex",
    address: {
        city: "Hyderabad",
        country: "India"
    }
};

console.log(user.address.city); // Hyderabad

console.log(user.contact?.phone); // undefined

const phone = user.contact?.phone ?? "Not provided";

console.log(phone); // Not provided
```

- `?.` safely accesses properties when the preceding value might be `null` or `undefined`.
- `??` provides a default value only when the original value is `null` or `undefined`.

These operators are particularly useful when working with API responses.

### 1.6 Checking Property Existence

Use `Object.hasOwn()` to check whether an object directly contains a property.

The `in` operator checks both own and inherited properties.

```javascript
const user = {
    name: "Alex",
    email: undefined
};

console.log(Object.hasOwn(user, "name"));  // true
console.log(Object.hasOwn(user, "email")); // true
console.log(Object.hasOwn(user, "age"));   // false

console.log("name" in user);     // true
console.log("toString" in user); // true

console.log(Object.hasOwn(user, "toString")); // false
```

A property can exist even when its value is `undefined`.

Prefer `Object.hasOwn()` when checking an object's own properties.

---

## 2. Working with Objects

### 2.1 Iterating and Transforming Objects

JavaScript provides methods to extract an object's own enumerable string-keyed properties.

```javascript
const product = {
    name: "Laptop",
    price: 50000,
    quantity: 2
};

console.log(Object.keys(product));
// ['name', 'price', 'quantity']

console.log(Object.values(product));
// ['Laptop', 50000, 2]

console.log(Object.entries(product));
// [['name', 'Laptop'], ['price', 50000], ['quantity', 2]]
```

Use `Object.entries()` with a `for...of` loop to access keys and values together.

```javascript
for (const [key, value] of Object.entries(product)) {
    console.log(`${key}: ${value}`);
}
```

Output:

```text
name: Laptop
price: 50000
quantity: 2
```

`Object.fromEntries()` performs the reverse operation by converting key-value pairs into an object.

```javascript
const entries = [
    ["name", "Laptop"],
    ["price", 50000]
];

const product = Object.fromEntries(entries);

console.log(product);
// { name: 'Laptop', price: 50000 }
```

| Method | Purpose |
|---|---|
| `Object.keys()` | Returns property names |
| `Object.values()` | Returns property values |
| `Object.entries()` | Returns key-value pairs |
| `Object.fromEntries()` | Creates an object from key-value pairs |

### 2.2 Object References, Mutation and Equality

Assigning an object to another variable copies its reference, not the object itself.

```javascript
const user1 = { name: "Alex" };
const user2 = user1;
const user3 = { name: "Alex" };

console.log(user1 === user2); // true
console.log(user1 === user3); // false

user2.name = "John";

console.log(user1.name); // John
```

Objects are compared by identity, not by their contents.

Mutating an object through one reference affects all references to that object.

### 2.3 Shallow Copying and Deep Copying

**Shallow copy using spread syntax**

A shallow copy creates a new outer object but shares references to nested objects.

```javascript
const user = {
    name: "Alex",
    address: {
        city: "Hyderabad"
    }
};

const copy = { ...user };

copy.name = "John";
copy.address.city = "Bangalore";

console.log(user.name);         // Alex
console.log(user.address.city); // Bangalore

console.log(user === copy); // false
console.log(user.address === copy.address); // true
```

**Deep copy using `structuredClone()`**

A deep copy independently copies supported nested data.

```javascript
const user = {
    name: "Alex",
    address: {
        city: "Hyderabad"
    }
};

const copy = structuredClone(user);

copy.address.city = "Bangalore";

console.log(user.address.city); // Hyderabad
console.log(copy.address.city); // Bangalore
```

`structuredClone()` supports many built-in data types, including nested objects, arrays, dates, maps, sets, and circular references.

However, it cannot clone functions and does not preserve every aspect of custom class instances or property descriptors.

| Operation | New Outer Object | Independent Nested Objects |
|---|---|---|
| Direct assignment | No | No |
| Spread syntax | Yes | No |
| `structuredClone()` | Yes | Yes, for supported values |

Prefer shallow copies for ordinary updates and deep copies only when independent nested data is necessary.

### 2.4 Combining and Updating Objects

Spread syntax allows us to combine objects and update properties without mutating the original object.

```javascript
const user = {
    name: "Alex",
    age: 22
};

const settings = {
    theme: "dark",
    language: "English"
};

const updatedUser = {
    ...user,
    ...settings,
    age: 23
};

console.log(updatedUser);
// {
//     name: 'Alex',
//     age: 23,
//     theme: 'dark',
//     language: 'English'
// }

console.log(user.age); // 22
```

When multiple properties have the same name, the last property wins.

```javascript
const defaults = { theme: "light", volume: 50 };
const preferences = { theme: "dark" };

const settings = { ...defaults, ...preferences };

console.log(settings);
// { theme: 'dark', volume: 50 }
```

This pattern is widely used for application configuration and immutable state updates.

### 2.5 Object.freeze() and Object.seal()

`Object.freeze()` prevents adding, removing, or reassigning an ordinary object's own data properties.

```javascript
const config = Object.freeze({
    apiUrl: "https://api.example.com",
    maxRetries: 3
});

console.log(Object.isFrozen(config)); // true

config.maxRetries = 5; // TypeError in strict mode
```

`Object.seal()` prevents adding or removing properties but allows updating existing writable properties.

```javascript
const user = Object.seal({
    name: "Alex",
    age: 22
});

user.age = 23; // Allowed

console.log(Object.isSealed(user)); // true

user.email = "alex@example.com"; // TypeError
```

| Operation | Normal Object | Sealed Object | Frozen Object |
|---|---|---|---|
| Add properties | Yes | No | No |
| Update ordinary writable properties | Yes | Yes | No |
| Delete properties | Yes | No | No |

Both methods operate shallowly.

```javascript
const config = Object.freeze({
    settings: {
        theme: "light"
    }
});

config.settings.theme = "dark"; // Allowed

console.log(config.settings.theme); // dark
```

Freezing the outer object does not automatically freeze nested objects.

---

## 3. Array Fundamentals

An array is an ordered collection of values. Arrays are specialized objects that provide indexed access and methods for managing collections.

### 3.1 Creating and Accessing Arrays

Array literals are the preferred way to create ordinary arrays.

```javascript
const fruits = ["Apple", "Banana", "Mango"];

console.log(fruits[0]);    // Apple
console.log(fruits[1]);    // Banana
console.log(fruits.length); // 3

console.log(fruits.at(0));  // Apple
console.log(fruits.at(-1)); // Mango
console.log(fruits.at(-2)); // Banana

console.log(fruits[10]); // undefined

console.log(Array.isArray(fruits)); // true
console.log(typeof fruits);        // object
```

Array indexes start at zero.

The modern `at()` method supports negative indexes, making it convenient to access elements from the end.

### 3.2 Adding, Updating and Removing Elements

```javascript
const fruits = ["Apple", "Banana"];

// Add at the end
fruits.push("Mango");

// Update
fruits[0] = "Orange";

// Remove the last element
fruits.pop();

console.log(fruits);
// ['Orange', 'Banana']
```

Avoid using `delete` to remove array elements because it creates empty slots without reducing the array's length.

Use appropriate array methods instead.

### 3.3 Nested Arrays

Arrays can contain other arrays.

```javascript
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log(matrix[0]);    // [1, 2, 3]
console.log(matrix[1][2]); // 6

console.log(matrix.length);    // 3
console.log(matrix[0].length); // 3
```

Nested arrays are useful for grids, tables, grouped data, and matrices.

### 3.4 Iterating Over Arrays

**Using `for...of`**

Prefer this when you only need element values.

```javascript
const fruits = ["Apple", "Banana", "Mango"];

for (const fruit of fruits) {
    console.log(fruit);
}
```

**Using a traditional `for` loop**

Useful when index control or custom iteration is required.

```javascript
for (let i = 0; i < fruits.length; i++) {
    console.log(i, fruits[i]);
}
```

**Using `forEach()`**

Executes a callback for each existing array element.

```javascript
fruits.forEach((fruit, index) => {
    console.log(index, fruit);
});
```

**Using `entries()`**

Provides both the index and value while supporting `break` and `continue`.

```javascript
for (const [index, fruit] of fruits.entries()) {
    console.log(index, fruit);
}
```

| Approach | Access Index | Supports `break` |
|---|---|---|
| `for...of` | With `entries()` | Yes |
| `for` | Yes | Yes |
| `forEach()` | Yes | No |

`forEach()` returns `undefined` and is generally used for side effects rather than creating transformed arrays.

Avoid `for...in` for ordinary array iteration because it iterates over enumerable property names rather than element values.

### 3.5 Array References, Copying and Equality

Arrays follow the same reference behavior as objects.

```javascript
const original = [10, 20, 30];
const reference = original;
const copy = [...original];

reference.push(40);
copy.push(50);

console.log(original);  // [10, 20, 30, 40]
console.log(reference); // [10, 20, 30, 40]
console.log(copy);      // [10, 20, 30, 50]

console.log(original === reference); // true
console.log(original === copy);      // false
console.log([1, 2] === [1, 2]);      // false
```

Spread syntax creates a shallow array copy. Use `structuredClone()` when a supported nested array or object structure needs to be copied deeply.

---

## 4. Essential Array Methods

Array methods allow us to manipulate, search, sort, and process collections efficiently.

Array methods can be categorized as:

- **Mutating methods:** Modify the original array.
- **Non-mutating methods:** Leave the original array unchanged.

### 4.1 Adding and Removing Elements

| Method | Purpose | Return Value |
|---|---|---|
| `push()` | Add elements at the end | New length |
| `pop()` | Remove the last element | Removed element |
| `unshift()` | Add elements at the beginning | New length |
| `shift()` | Remove the first element | Removed element |

```javascript
const numbers = [10, 20, 30];

numbers.push(40);    // [10, 20, 30, 40]
numbers.unshift(5);  // [5, 10, 20, 30, 40]

numbers.pop();       // [5, 10, 20, 30]
numbers.shift();     // [10, 20, 30]

console.log(numbers);
```

All four methods mutate the original array.

### 4.2 Extracting, Removing and Replacing Elements

**slice() — Extract elements without mutation**

```javascript
const numbers = [10, 20, 30, 40, 50];

console.log(numbers.slice(1, 3)); // [20, 30]
console.log(numbers.slice(2));    // [30, 40, 50]
console.log(numbers.slice(-2));   // [40, 50]
console.log(numbers.slice());     // Shallow copy
```

Syntax:

```javascript
array.slice(start, end);
```

The start index is inclusive, and the end index is exclusive.

**splice() — Insert, remove or replace elements with mutation**

```javascript
const numbers = [10, 20, 30, 40];

numbers.splice(1, 2, 99);

console.log(numbers); // [10, 99, 40]
```

Syntax:

```javascript
array.splice(start, deleteCount, ...items);
```

`splice()` returns an array containing the removed elements.

**toSpliced() — Non-mutating alternative to splice()**

```javascript
const numbers = [10, 20, 30, 40];

const updated = numbers.toSpliced(1, 2, 99);

console.log(numbers); // [10, 20, 30, 40]
console.log(updated); // [10, 99, 40]
```

Unlike `splice()`, `toSpliced()` returns the updated array.

**with() — Replace an element without mutation**

```javascript
const numbers = [10, 20, 30];

const updated = numbers.with(1, 99);

console.log(updated); // [10, 99, 30]
console.log(numbers); // [10, 20, 30]

console.log(numbers.with(-1, 100));
// [10, 20, 100]
```

`with()` supports negative indexes and throws a `RangeError` for an out-of-range index.

### 4.3 Searching for Elements

```javascript
const numbers = [10, 20, 30, 20, 40];

console.log(numbers.includes(20)); // true
console.log(numbers.indexOf(20));  // 1
console.log(numbers.indexOf(99));  // -1

console.log(numbers.find(n => n > 20));          // 30
console.log(numbers.findIndex(n => n > 20));     // 2

console.log(numbers.findLast(n => n === 20));      // 20
console.log(numbers.findLastIndex(n => n === 20)); // 3
```

| Method | Purpose | Not Found |
|---|---|---|
| `includes()` | Checks whether a value exists | `false` |
| `indexOf()` | Finds the first index of a value | `-1` |
| `find()` | Finds the first matching element | `undefined` |
| `findIndex()` | Finds the first matching index | `-1` |
| `findLast()` | Finds the last matching element | `undefined` |
| `findLastIndex()` | Finds the last matching index | `-1` |

Use `includes()` for simple existence checks and `find()` when searching using a condition.

None of these methods mutate the original array.

### 4.4 Checking Conditions

`some()` checks whether at least one element satisfies a condition.

`every()` checks whether all elements satisfy a condition.

```javascript
const numbers = [10, 20, 30, 40];

console.log(numbers.some(n => n > 30));  // true
console.log(numbers.some(n => n > 100)); // false

console.log(numbers.every(n => n > 0));  // true
console.log(numbers.every(n => n > 20)); // false
```

Both methods stop iterating as soon as the result is determined.

For empty arrays:

```javascript
console.log([].some(n => n > 0));  // false
console.log([].every(n => n > 0)); // true
```

These methods are useful for validation, permission checks, and product availability checks.

### 4.5 Sorting and Reversing Arrays

**sort() and toSorted()**

By default, JavaScript sorts elements by their string representations in UTF-16 code unit order.

```javascript
const numbers = [100, 20, 3, 50];

console.log(numbers.toSorted());
// [100, 20, 3, 50]
```

For numeric sorting, provide a comparator function.

```javascript
const numbers = [100, 20, 3, 50];

// Ascending
console.log(numbers.toSorted((a, b) => a - b));
// [3, 20, 50, 100]

// Descending
console.log(numbers.toSorted((a, b) => b - a));
// [100, 50, 20, 3]

console.log(numbers);
// [100, 20, 3, 50]
```

A comparator returns:

- Negative value: `a` comes before `b`.
- Positive value: `b` comes before `a`.
- Zero: Their relative order is preserved.

For language-aware string sorting, use `localeCompare()`.

```javascript
const names = ["John", "Alex", "David"];

console.log(names.toSorted((a, b) => a.localeCompare(b)));
// ['Alex', 'David', 'John']
```

`sort()` modifies the original array, while `toSorted()` returns a new sorted array.

**reverse() and toReversed()**

```javascript
const numbers = [10, 20, 30];

console.log(numbers.toReversed()); // [30, 20, 10]
console.log(numbers);              // [10, 20, 30]

numbers.reverse();

console.log(numbers); // [30, 20, 10]
```

Prefer `toSorted()` and `toReversed()` when the original array should remain unchanged.

### 4.6 Combining and Flattening Arrays

**Combining using concat() or spread syntax**

```javascript
const first = [10, 20];
const second = [30, 40];

console.log(first.concat(second));
// [10, 20, 30, 40]

console.log([...first, ...second]);
// [10, 20, 30, 40]
```

Both approaches create new arrays without modifying the originals.

**Flattening using flat()**

```javascript
const numbers = [1, [2, 3], [4, [5, 6]]];

console.log(numbers.flat());
// [1, 2, 3, 4, [5, 6]]

console.log(numbers.flat(2));
// [1, 2, 3, 4, 5, 6]

console.log(numbers.flat(Infinity));
// [1, 2, 3, 4, 5, 6]
```

`flat()` removes nested array levels up to the specified depth. The default depth is `1`.

### 4.7 Creating and Converting Arrays

**join() — Convert an array into a string**

```javascript
const skills = ["JavaScript", "React", "Node.js"];

console.log(skills.join(", "));
// JavaScript, React, Node.js

console.log(skills.join(" - "));
// JavaScript - React - Node.js
```

**Array.from() — Create an array from an iterable or array-like object**

```javascript
console.log(Array.from("Hello"));
// ['H', 'e', 'l', 'l', 'o']

console.log(Array.from(new Set([1, 2, 2, 3])));
// [1, 2, 3]

console.log(Array.from({ length: 5 }, (_, i) => i + 1));
// [1, 2, 3, 4, 5]
```

`Array.from()` is also useful for converting browser collections into ordinary arrays.

**Array.of() — Create an array from supplied arguments**

```javascript
console.log(Array.of(5));       // [5]
console.log(Array.of(1, 2, 3)); // [1, 2, 3]
```

For ordinary known values, array literals are generally simpler.

### 4.8 Mutating vs Non-Mutating Methods

| Operation | Mutating | Non-Mutating |
|---|---|---|
| Add at end | `push()` | Spread, `concat()` |
| Add at beginning | `unshift()` | Spread |
| Remove last element | `pop()` | `slice(0, -1)` |
| Remove first element | `shift()` | `slice(1)` |
| Insert or remove elements | `splice()` | `toSpliced()` |
| Replace an element | Index assignment | `with()` |
| Sort | `sort()` | `toSorted()` |
| Reverse | `reverse()` | `toReversed()` |

Other non-mutating methods include:

```javascript
slice()
includes()
indexOf()
find()
findIndex()
findLast()
findLastIndex()
some()
every()
concat()
flat()
join()
```

Non-mutating methods are particularly useful in frontend state management, where creating new references helps represent state changes.

However, mutation is not inherently bad. Use it when appropriate, especially for locally owned data.

Non-mutating methods generally create shallow copies when returning arrays. Nested objects may still be shared.

---

## 5. Working with Objects and Arrays Together

Real-world applications commonly represent structured data using arrays of objects and objects containing arrays.

### 5.1 Representing and Accessing Structured Data

Consider a product catalog that we will reuse throughout this section.

```javascript
const catalog = {
    storeName: "Tech Store",

    products: [
        {
            id: 1,
            name: "Laptop",
            price: 50000,
            stock: 5
        },
        {
            id: 2,
            name: "Keyboard",
            price: 2000,
            stock: 10
        },
        {
            id: 3,
            name: "Mouse",
            price: 800,
            stock: 0
        }
    ]
};

console.log(catalog.storeName);        // Tech Store
console.log(catalog.products.length);  // 3
console.log(catalog.products[0].name); // Laptop

for (const product of catalog.products) {
    console.log(`${product.name}: ₹${product.price}`);
}
```

Output:

```text
Laptop: ₹50000
Keyboard: ₹2000
Mouse: ₹800
```

For the following examples, use the products array from the catalog.

```javascript
const products = catalog.products;
```

### 5.2 Searching, Checking and Sorting Records

```javascript
// Find a product by ID
const product = products.find(p => p.id === 2);

console.log(product?.name); // Keyboard

// Find its index
const index = products.findIndex(p => p.id === 2);

console.log(index); // 1

// Check whether any product is out of stock
const hasOutOfStock = products.some(p => p.stock === 0);

console.log(hasOutOfStock); // true

// Check whether all products are available
const allAvailable = products.every(p => p.stock > 0);

console.log(allAvailable); // false

// Sort by price
const sortedByPrice = products.toSorted(
    (a, b) => a.price - b.price
);

// Sort by name
const sortedByName = products.toSorted(
    (a, b) => a.name.localeCompare(b.name)
);
```

The original products array remains unchanged.

### 5.3 Adding, Updating and Removing Records

**Adding a product**

```javascript
const newProduct = {
    id: 4,
    name: "Monitor",
    price: 15000,
    stock: 8
};

const updatedProducts = [...products, newProduct];
```

**Updating a product by ID**

```javascript
const index = products.findIndex(p => p.id === 2);

const updatedProducts = index === -1
    ? products
    : products.with(index, {
        ...products[index],
        price: 1800
    });
```

**Removing a product by ID**

```javascript
const index = products.findIndex(p => p.id === 3);

const updatedProducts = index === -1
    ? products
    : products.toSpliced(index, 1);
```

Each example creates a new array when a change is required instead of modifying the original array.

Checking for `-1` is important because a missing product must not accidentally update or remove the last element.

We will learn alternative approaches using `map()` and `filter()` in the Array Methods topic.

### 5.4 Immutable Updates to Nested Data

Consider application settings containing nested objects.

```javascript
const settings = {
    theme: "light",
    notifications: {
        email: true,
        push: false
    }
};

const updatedSettings = {
    ...settings,

    notifications: {
        ...settings.notifications,
        push: true
    }
};

console.log(settings.notifications.push);        // false
console.log(updatedSettings.notifications.push); // true
```

When updating nested data immutably, create new objects or arrays at every level along the path being changed.

Unchanged nested values can retain their original references.

This approach is known as structural sharing and is widely used in modern frontend state management.

### 5.5 JSON Serialization and Deserialization

JSON (JavaScript Object Notation) is a text-based data format commonly used for communication between frontend and backend applications.

**Serialization — JavaScript value to JSON string**

```javascript
const user = {
    name: "Alex",
    age: 22,
    skills: ["JavaScript", "React"]
};

const json = JSON.stringify(user);

console.log(json);
// {"name":"Alex","age":22,"skills":["JavaScript","React"]}

console.log(typeof json); // string
```

For readable, formatted JSON:

```javascript
console.log(JSON.stringify(user, null, 2));
```

**Deserialization — JSON string to JavaScript value**

```javascript
const json = '{"name":"Alex","age":22}';

const user = JSON.parse(json);

console.log(user.name); // Alex
console.log(typeof user); // object
```

| Method | Conversion |
|---|---|
| `JSON.stringify()` | JavaScript value → JSON string |
| `JSON.parse()` | JSON string → JavaScript value |

JSON supports:

- Strings
- Numbers
- Booleans
- Null
- Objects
- Arrays

JSON does not directly support all JavaScript data types.

```javascript
const data = {
    name: "Alex",
    email: undefined,
    greet: () => "Hello",
    score: NaN
};

console.log(JSON.stringify(data));
// {"name":"Alex","score":null}
```

Important limitations:

- Undefined, function, and Symbol values are omitted from object properties and become `null` in arrays.
- `NaN` and `Infinity` become `null`.
- BigInt values throw a `TypeError` by default.
- Dates are generally converted into strings.
- Circular references cause an error.
- Invalid JSON passed to `JSON.parse()` throws a `SyntaxError`.

Do not use `JSON.parse(JSON.stringify(object))` as a general-purpose deep cloning technique. Prefer `structuredClone()` for supported data types.

JSON is primarily intended for data exchange and serialization, not object cloning.

