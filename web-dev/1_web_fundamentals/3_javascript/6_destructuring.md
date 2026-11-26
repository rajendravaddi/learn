# JavaScript — Destructuring

Destructuring is a JavaScript syntax introduced in ES6 that allows us to extract object properties and array elements into individual variables.

It provides a concise alternative to accessing each property or element individually.

## 1. Object Destructuring

Object destructuring extracts values based on property names rather than their positions.

### 1.1 Basic Destructuring and Renaming

```javascript
const user = {
    name: "Alex",
    age: 22,
    role: "admin"
};

// Without destructuring
const username = user.name;
const userAge = user.age;

// With destructuring
const { name, age } = user;

console.log(name, age); // Alex 22

// Renaming variables
const { name: displayName, role: userRole } = user;

console.log(displayName, userRole); // Alex admin
```

The syntax `property: variable` extracts a property into a variable with a different name.

Unlike array destructuring, the order of properties does not matter.

### 1.2 Default Values

Default values are used when a property is missing or contains `undefined`.

```javascript
const user = {
    name: "Alex",
    age: undefined,
    email: null
};

const {
    name,
    age = 18,
    role = "user",
    email = "Not provided"
} = user;

console.log(name);  // Alex
console.log(age);   // 18
console.log(role);  // user
console.log(email); // null
```

Default values do not replace `null`, `false`, `0`, or empty strings.

Renaming and default values can be combined.

```javascript
const { role: userRole = "user" } = user;

console.log(userRole); // user
```

### 1.3 Nested Object Destructuring

Extract properties from nested objects without accessing each level individually.

```javascript
const user = {
    name: "Alex",
    address: {
        city: "Hyderabad",
        country: "India"
    }
};

const {
    name,
    address: { city, country }
} = user;

console.log(name);    // Alex
console.log(city);    // Hyderabad
console.log(country); // India
```

The above destructuring creates `name`, `city`, and `country` variables, but does not create an `address` variable.

### 1.4 Computed Property Names

Use computed property names when the property to extract is determined dynamically.

```javascript
const user = {
    name: "Alex",
    age: 22
};

const key = "name";

const { [key]: value } = user;

console.log(value); // Alex
```

This is equivalent to accessing `user[key]`.

---

## 2. Array Destructuring

Array destructuring extracts values based on their positions. Unlike object destructuring, the variable names are independent of the original data.

### 2.1 Basic Destructuring, Skipping and Default Values

```javascript
const numbers = [10, 20, 30];

// Basic destructuring
const [first, second, third] = numbers;

console.log(first, second, third); // 10 20 30

// Skip elements
const [a, , c] = numbers;

console.log(a, c); // 10 30

// Default values
const [x, y = 50] = [10];

console.log(x, y); // 10 50

// Missing elements without defaults
const [p, q] = [100];

console.log(p, q); // 100 undefined
```

Extra array elements are ignored unless collected using rest syntax.

Array destructuring also works with other iterable values, such as strings and sets.

```javascript
const [first, second] = new Set([10, 20, 30]);

console.log(first, second); // 10 20
```

### 2.2 Nested Array Destructuring

```javascript
const matrix = [
    [1, 2],
    [3, 4]
];

const [[a, b], [c, d]] = matrix;

console.log(a, b, c, d); // 1 2 3 4
```

The destructuring pattern follows the structure of the nested array.

### 2.3 Swapping Variables

Array destructuring allows us to swap variable values without explicitly creating a temporary variable.

```javascript
let a = 10;
let b = 20;

[a, b] = [b, a];

console.log(a, b); // 20 10
```

This is particularly useful in sorting algorithms and other DSA implementations.

---

## 3. Destructuring with Rest Syntax

Rest syntax (`...`) collects the remaining properties or elements that have not been individually extracted.

### 3.1 Object Rest

```javascript
const user = {
    id: 101,
    name: "Alex",
    age: 22,
    role: "admin"
};

const { id, name, ...details } = user;

console.log(id);   // 101
console.log(name); // Alex

console.log(details);
// { age: 22, role: 'admin' }
```

Object rest collects the remaining own enumerable properties into a new object.

A common use case is excluding unwanted properties without mutating the original object.

```javascript
const user = {
    id: 101,
    name: "Alex",
    password: "secret"
};

const { password, ...publicUser } = user;

console.log(publicUser);
// { id: 101, name: 'Alex' }

console.log(user.password); // secret
```

This demonstrates property exclusion. In production applications, sensitive fields should generally be excluded using an explicit allowlist of permitted properties.

### 3.2 Array Rest

```javascript
const numbers = [10, 20, 30, 40, 50];

const [first, second, ...remaining] = numbers;

console.log(first);     // 10
console.log(second);    // 20
console.log(remaining); // [30, 40, 50]
```

Rest collects the remaining elements into a new array.

**Important rules:**

- The rest element or property must appear last.
- A trailing comma after rest is not allowed.
- Rest creates a shallow collection, not a deep copy.

```javascript
// Valid
const [first, ...remaining] = numbers;

// Invalid — SyntaxError
// const [...remaining, last] = numbers;
```

We will explore spread and rest syntax in detail in the next topic.

---

## 4. Practical Patterns and Common Pitfalls

### 4.1 Function Parameters and Return Values

Destructuring function parameters makes it easier to work with objects containing multiple related values.

```javascript
function createProfile({ name, age, role = "user" }) {
    return `${name}, aged ${age}, Role: ${role}`;
}

console.log(
    createProfile({
        name: "Alex",
        age: 22
    })
);

// Alex, aged 22, Role: user
```

Destructuring can also extract multiple values returned by a function.

```javascript
function getCoordinates() {
    return [10, 20];
}

function getUser() {
    return { id: 101, name: "Alex" };
}

const [x, y] = getCoordinates();
const { id, name } = getUser();

console.log(x, y);     // 10 20
console.log(id, name); // 101 Alex
```

Returning objects is useful when values have descriptive names, while arrays are useful when values have a meaningful positional order.

### 4.2 Destructuring in Loops

Destructuring simplifies iteration over key-value pairs and arrays of objects.

```javascript
const user = {
    name: "Alex",
    age: 22
};

for (const [key, value] of Object.entries(user)) {
    console.log(`${key}: ${value}`);
}

// name: Alex
// age: 22
```

For arrays of objects:

```javascript
const products = [
    { name: "Laptop", price: 50000 },
    { name: "Mouse", price: 800 }
];

for (const { name, price } of products) {
    console.log(`${name}: ₹${price}`);
}

// Laptop: ₹50000
// Mouse: ₹800
```

### 4.3 Destructuring into Existing Variables

Destructuring can assign values to previously declared variables.

```javascript
let name, age;

// Object destructuring assignment
({ name, age } = {
    name: "Alex",
    age: 22
});

console.log(name, age); // Alex 22

let x, y;

// Array destructuring assignment
[x, y] = [10, 20];

console.log(x, y); // 10 20
```

Parentheses are required when an object destructuring assignment appears as a standalone statement because JavaScript would otherwise interpret the opening curly brace as a block.

### 4.4 Mixed Object and Array Destructuring

Objects and arrays can be destructured together by matching the structure of the data.

```javascript
const response = {
    status: 200,
    users: [
        { id: 101, name: "Alex" },
        { id: 102, name: "John" }
    ]
};

const {
    status,
    users: [
        { name: firstUser },
        { name: secondUser }
    ]
} = response;

console.log(status);     // 200
console.log(firstUser);  // Alex
console.log(secondUser); // John
```

This pattern is useful when processing structured API responses.

Avoid excessively nested destructuring when simpler property access would make the code more readable.

### 4.5 Safe Destructuring

Destructuring `null` or `undefined` directly causes a `TypeError`.

Use nullish coalescing to provide a fallback object or array.

```javascript
const user = null;
const numbers = undefined;

const { name = "Guest" } = user ?? {};
const [first = 0] = numbers ?? [];

console.log(name);  // Guest
console.log(first); // 0
```

Nested properties may also require fallback values.

```javascript
const user = {
    name: "Alex"
};

const {
    address: { city = "Unknown" } = {}
} = user;

console.log(city); // Unknown
```

The default empty object handles a missing or undefined `address`, but not an explicitly null `address`.

To handle both:

```javascript
const { city = "Unknown" } = user.address ?? {};
```

Function parameters can also have default objects.

```javascript
function greet({ name = "Guest" } = {}) {
    return `Hello, ${name}`;
}

console.log(greet());                // Hello, Guest
console.log(greet({}));              // Hello, Guest
console.log(greet({ name: "Alex" })); // Hello, Alex
```

Calling `greet(null)` still throws a `TypeError` because default parameters only replace `undefined`.

### 4.6 Destructuring and Object References

Destructuring does not create independent copies of nested objects or arrays.

```javascript
const user = {
    name: "Alex",
    address: {
        city: "Hyderabad"
    }
};

const { address } = user;

address.city = "Bangalore";

console.log(user.address.city); // Bangalore

console.log(address === user.address); // true
```

The extracted `address` variable refers to the same object as `user.address`.

Use spread syntax or `structuredClone()` when independent copies are required, depending on whether shallow or deep copying is needed.

### 4.7 Quick Reference

| Operation | Syntax |
|---|---|
| Object destructuring | `const { name, age } = user` |
| Renaming | `const { name: username } = user` |
| Default value | `const { role = "user" } = user` |
| Rename with default | `const { role: userRole = "user" } = user` |
| Nested object | `const { address: { city } } = user` |
| Dynamic property | `const { [key]: value } = user` |
| Array destructuring | `const [a, b] = numbers` |
| Skip elements | `const [a, , c] = numbers` |
| Array default | `const [a = 0] = numbers` |
| Swap variables | `[a, b] = [b, a]` |
| Object rest | `const { name, ...rest } = user` |
| Array rest | `const [first, ...rest] = numbers` |
| Parameter destructuring | `function greet({ name }) {}` |
| Existing variables | `({ name, age } = user)` |
| Safe destructuring | `const { name } = user ?? {}` |

