# JavaScript Data Types

A data type describes the kind of value being stored or processed.

JavaScript data types are divided into two categories:

**Primitive data types:**

1. String
2. Number
3. Boolean
4. Undefined
5. Null
6. BigInt
7. Symbol

**Non-primitive data type:**

- Object (including arrays, functions, dates, maps, sets, etc.)

## 1. Dynamic Typing

JavaScript is a dynamically typed language.

We do not need to explicitly specify the data type when declaring a variable. The type is determined by its current value.

```javascript
let value = 100;

console.log(typeof value); // number

value = "Hello";

console.log(typeof value); // string

value = true;

console.log(typeof value); // boolean
```

JavaScript allows a variable to hold values of different types over time.

However, unnecessarily changing a variable's type can make code harder to understand and maintain.


## 2. Primitive Data Types

### 2.1 String

A string represents textual data.

Strings can be created using:

- Double quotes
- Single quotes
- Backticks (template literals)

```javascript
const firstName = "Alex";
const lastName = 'Smith';
const language = `JavaScript`;
```

Single and double quotes have the same basic functionality. Choose a consistent style throughout your project.

#### Template Literals

Template literals use backticks and support embedding expressions directly inside strings.

```javascript
const username = "Alex";
const age = 22;

const message = `My name is ${username} and I am ${age} years old.`;

console.log(message);
```

Output:

```text
My name is Alex and I am 22 years old.
```

#### Multiline Strings

Template literals support multiline strings.

```javascript
const message = `Welcome to our website!
Explore our products.
Happy shopping!`;

console.log(message);
```

#### String Properties and Methods

```javascript
const language = "JavaScript";

console.log(language.length);          // 10
console.log(language[0]);              // J
console.log(language.at(-1));          // t
console.log(language.toUpperCase());   // JAVASCRIPT
console.log(language.toLowerCase());   // javascript
console.log(language.includes("Script")); // true
console.log(language.startsWith("Java")); // true
console.log(language.endsWith("Script")); // true
console.log(language.slice(0, 4));     // Java
```

Removing unnecessary whitespace:

```javascript
const username = "   Alex   ";

console.log(username.trim()); // Alex
```

Replacing text:

```javascript
const message = "Hello World World";

console.log(message.replace("World", "JavaScript"));
// Hello JavaScript World

console.log(message.replaceAll("World", "JavaScript"));
// Hello JavaScript JavaScript
```

#### String Immutability

Strings are immutable. Their existing contents cannot be modified directly.

String methods return new values instead of modifying the original string.

```javascript
const username = "alex";

const upperUsername = username.toUpperCase();

console.log(username);      // alex
console.log(upperUsername); // ALEX
```

### 2.2 Number

JavaScript uses the `number` type for both integers and floating-point numbers.

```javascript
const age = 22;
const price = 499.99;
const temperature = -10;
const percentage = 95.5;

console.log(typeof age);   // number
console.log(typeof price); // number
```

Unlike languages such as Java and C++, JavaScript does not have separate primitive types for ordinary integers, floats, and doubles.

#### Arithmetic Operators

```javascript
const a = 10;
const b = 3;

console.log(a + b);  // 13
console.log(a - b);  // 7
console.log(a * b);  // 30
console.log(a / b);  // 3.3333333333333335
console.log(a % b);  // 1
console.log(a ** b); // 1000
```

| Operator | Description |
|---|---|
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `%` | Remainder |
| `**` | Exponentiation |

#### Assignment Operators

```javascript
let score = 10;

score += 5;
console.log(score); // 15

score -= 3;
console.log(score); // 12

score *= 2;
console.log(score); // 24

score /= 4;
console.log(score); // 6
```

Increment and decrement:

```javascript
let count = 0;

count++;
console.log(count); // 1

count--;
console.log(count); // 0
```

#### Numeric Separators

Modern JavaScript supports underscores to improve the readability of large numbers.

```javascript
const population = 1_000_000;
const salary = 12_00_000;

console.log(population); // 1000000
console.log(salary);     // 1200000
```

Underscores do not affect the actual numeric value.

#### Useful Number and Math Methods

```javascript
console.log(Math.round(4.6)); // 5
console.log(Math.floor(4.9)); // 4
console.log(Math.ceil(4.1));  // 5
console.log(Math.trunc(4.9)); // 4
console.log(Math.abs(-10));   // 10
console.log(Math.max(10, 20, 30)); // 30
console.log(Math.min(10, 20, 30)); // 10
console.log(Math.sqrt(25));   // 5
```

Checking whether a number is an integer:

```javascript
console.log(Number.isInteger(10));   // true
console.log(Number.isInteger(10.5)); // false
```

Formatting decimal places:

```javascript
const price = 99.4567;

console.log(price.toFixed(2)); // "99.46"
```

Note that `toFixed()` returns a string, not a number.

#### Floating-Point Precision

JavaScript numbers use the IEEE 754 double-precision floating-point representation.

Some decimal numbers cannot be represented exactly in binary.

```javascript
console.log(0.1 + 0.2);

// 0.30000000000000004
```

For display purposes, we can format the result.

```javascript
const result = 0.1 + 0.2;

console.log(result.toFixed(2)); // "0.30"
```

For financial calculations, prefer storing monetary values as integers in the smallest currency unit when appropriate.

```javascript
const productPriceInPaise = 19999;
const deliveryChargeInPaise = 4000;

const totalInPaise =
    productPriceInPaise + deliveryChargeInPaise;

console.log(`₹${(totalInPaise / 100).toFixed(2)}`);
```

Output:

```text
₹239.99
```

#### NaN (Not a Number)

`NaN` represents an invalid numeric result.

```javascript
const result = Number("hello");

console.log(result);        // NaN
console.log(typeof result); // number
```

Despite its name, `NaN` belongs to the number data type.

Use `Number.isNaN()` to check whether a value is `NaN`.

```javascript
console.log(Number.isNaN(NaN));     // true
console.log(Number.isNaN(100));     // false
console.log(Number.isNaN("hello")); // false
```

#### Infinity

JavaScript supports positive and negative infinity.

```javascript
console.log(10 / 0);  // Infinity
console.log(-10 / 0); // -Infinity
console.log(0 / 0);   // NaN
```

Use `Number.isFinite()` to check whether a value is a finite number.

```javascript
console.log(Number.isFinite(100));      // true
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite(NaN));      // false
```

### 2.3 Boolean

A boolean represents one of two logical values:

- `true`
- `false`

```javascript
const isLoggedIn = true;
const isAdmin = false;
const isProductAvailable = true;

console.log(typeof isLoggedIn); // boolean
```

Booleans are commonly used in conditions, authentication, form validation, and application state.

#### Comparison Operators

```javascript
console.log(10 > 5);    // true
console.log(10 < 5);    // false
console.log(10 >= 10);  // true
console.log(10 <= 5);   // false
console.log(10 === 10); // true
console.log(10 !== 5);  // true
```

#### Logical Operators

```javascript
const isLoggedIn = true;
const isAdmin = false;

console.log(isLoggedIn && isAdmin); // false
console.log(isLoggedIn || isAdmin); // true
console.log(!isLoggedIn);           // false
```

| Operator | Description |
|---|---|
| `&&` | Logical AND |
| `\|\|` | Logical OR |
| `!` | Logical NOT |

When operating on non-boolean values, `&&` and `||` can return one of their operands rather than a boolean.



### 2.4 Undefined

`undefined` generally represents a value that has not been assigned or is missing.

```javascript
let username;

console.log(username);        // undefined
console.log(typeof username); // undefined
```

Accessing a nonexistent object property also returns `undefined`.

```javascript
const user = {
    name: "Alex"
};

console.log(user.email); // undefined
```

In most situations, allow JavaScript to produce `undefined` naturally instead of assigning it explicitly.

### 2.5 Null

`null` represents the intentional absence of a value.

```javascript
const selectedProduct = null;
const currentUser = null;
```

#### Practical Example: Authentication State

```javascript
let currentUser = null;

console.log(currentUser); // null

currentUser = "Alex";

console.log(currentUser); // Alex

currentUser = null;

console.log(currentUser); // null
```

Here, `null` indicates that no user is currently logged in.

#### Undefined vs Null

| Undefined | Null |
|---|---|
| Usually indicates a missing or unassigned value | Usually indicates intentional absence |
| Often produced automatically | Usually assigned explicitly |
| `typeof` returns `"undefined"` | `typeof` returns `"object"` |

```javascript
let username;
const selectedProduct = null;

console.log(username);        // undefined
console.log(selectedProduct); // null
```

An important JavaScript historical quirk:

```javascript
console.log(typeof null); // object
```

Despite this result, `null` is a primitive value, not an object.

To check for `null`, use strict equality.

```javascript
const user = null;

console.log(user === null); // true
```

### 2.6 BigInt

The ordinary `number` type cannot represent every integer accurately beyond its safe integer range.

```javascript
console.log(Number.MAX_SAFE_INTEGER);

// 9007199254740991
```

`BigInt` allows us to represent integers beyond this range.

Create a BigInt by adding `n` to an integer literal.

```javascript
const largeNumber = 900719925474099123456789n;

console.log(largeNumber);
console.log(typeof largeNumber); // bigint
```

BigInt arithmetic:

```javascript
const a = 100n;
const b = 50n;

console.log(a + b); // 150n
console.log(a - b); // 50n
console.log(a * b); // 5000n
console.log(a / b); // 2n
```

BigInt does not support fractional values.

```javascript
console.log(10n / 3n); // 3n
```

BigInt and Number cannot be directly mixed in arithmetic operations.

```javascript
console.log(10n + 5); // TypeError
```

Explicit conversion is required.

```javascript
console.log(10n + BigInt(5)); // 15n
```

BigInt is useful for:

- Large integer calculations
- Cryptographic computations
- Processing large integer identifiers when numeric operations are necessary

For ordinary web development calculations, the `number` type is generally sufficient.

### 2.7 Symbol

A Symbol represents a unique primitive value.

```javascript
const id1 = Symbol("id");
const id2 = Symbol("id");

console.log(id1 === id2); // false
console.log(typeof id1);  // symbol
```

Even though both symbols have the same description, they are distinct values.

Symbols can be used as unique object property keys.

```javascript
const userId = Symbol("userId");

const user = {
    name: "Alex",
    [userId]: 101
};

console.log(user.name);    // Alex
console.log(user[userId]); // 101
```

Symbols are mainly used in advanced JavaScript, libraries, and framework internals.

They are less common in everyday application code, so understanding their basic purpose is sufficient for now.

---

## 3. Non-Primitive Data Types

### 3.1 Object

Objects represent collections of related data using key-value pairs.

```javascript
const user = {
    name: "Alex",
    age: 22,
    email: "alex@example.com",
    isLoggedIn: true
};

console.log(user.name);  // Alex
console.log(user.age);   // 22
console.log(user.email); // alex@example.com
```

Objects can contain values of different data types.

```javascript
console.log(typeof user); // object
```

### 3.2 Array

Arrays represent ordered collections of values.

```javascript
const languages = ["JavaScript", "Python", "Java"];

console.log(languages[0]); // JavaScript
console.log(languages[1]); // Python
console.log(languages.length); // 3
```

Arrays can contain different data types.

```javascript
const values = [100, "Hello", true, null];
```

However, arrays containing related values of consistent types are generally easier to work with.

```javascript
console.log(typeof languages); // object
```

Arrays are a specialized kind of object.

To check whether a value is an array, use `Array.isArray()`.

```javascript
console.log(Array.isArray(languages)); // true
console.log(Array.isArray(user));      // false
```

We will explore objects and arrays in detail in a separate topic.


## 4. Primitive Values vs Object References

Understanding this difference is extremely important in JavaScript.

### 4.1 Copying Primitive Values

When a primitive value is assigned to another variable, its value is copied.

```javascript
let a = 10;
let b = a;

b = 20;

console.log(a); // 10
console.log(b); // 20
```

Changing `b` does not affect `a`.

The same applies to strings, booleans, and other primitive types.

```javascript
let firstName = "Alex";
let secondName = firstName;

secondName = "John";

console.log(firstName);  // Alex
console.log(secondName); // John
```

### 4.2 Copying Object References

When an object is assigned to another variable, its reference value is copied.

Both variables refer to the same object.

```javascript
const user1 = {
    name: "Alex"
};

const user2 = user1;

user2.name = "John";

console.log(user1.name); // John
console.log(user2.name); // John
```

The same behavior applies to arrays.

```javascript
const numbers1 = [10, 20, 30];
const numbers2 = numbers1;

numbers2.push(40);

console.log(numbers1); // [10, 20, 30, 40]
console.log(numbers2); // [10, 20, 30, 40]
```

JavaScript always copies values during assignment. For objects, the copied value is a reference to the object.

We will learn how to create independent object and array copies when studying spread operators.

### 4.3 Const Does Not Mean Immutable

A common misunderstanding is that objects and arrays declared using `const` cannot be modified.

`const` prevents variable reassignment. It does not prevent object mutation.

```javascript
const user = {
    name: "Alex",
    age: 22
};

user.age = 23;

console.log(user);

// { name: "Alex", age: 23 }
```

However, reassigning the entire variable is not allowed.

```javascript
const user = {
    name: "Alex"
};

user = {
    name: "John"
}; // TypeError
```

The same applies to arrays.

```javascript
const fruits = ["Apple", "Banana"];

fruits.push("Mango");

console.log(fruits);

// ["Apple", "Banana", "Mango"]
```

Reassignment is not allowed.

```javascript
fruits = ["Orange"]; // TypeError
```

**Remember:** `const` creates a constant binding, not necessarily an immutable value.

---

## 5. Checking Data Types

The `typeof` operator returns a string describing the type of a value.

```javascript
console.log(typeof "Hello");     // string
console.log(typeof 100);         // number
console.log(typeof true);        // boolean
console.log(typeof undefined);   // undefined
console.log(typeof null);        // object
console.log(typeof 100n);        // bigint
console.log(typeof Symbol("id")); // symbol
console.log(typeof {});          // object
console.log(typeof []);          // object
console.log(typeof (() => {}));  // function
```

Functions are callable objects, but `typeof` returns `"function"` for them.

### Recommended Type Checks

```javascript
const value = "JavaScript";

console.log(typeof value === "string"); // true
```

```javascript
const numbers = [1, 2, 3];

console.log(Array.isArray(numbers)); // true
```

```javascript
const user = null;

console.log(user === null); // true
```

```javascript
const price = 499.99;

console.log(Number.isFinite(price)); // true
```


## 6. Type Conversion

Type conversion means converting a value from one data type to another.

JavaScript supports two kinds of conversion:

- Explicit type conversion
- Implicit type conversion (type coercion)

### 6.1 Explicit Type Conversion

Explicit conversion happens when the developer intentionally converts a value.

#### Converting to Number

Use `Number()`.

```javascript
console.log(Number("100"));   // 100
console.log(Number("10.5"));  // 10.5
console.log(Number(true));    // 1
console.log(Number(false));   // 0
console.log(Number(null));    // 0
console.log(Number(undefined)); // NaN
console.log(Number("hello")); // NaN
console.log(Number(""));      // 0
console.log(Number("   "));   // 0
```

#### Parsing Numbers

Use `Number.parseInt()` to parse an integer from the beginning of a string.

```javascript
console.log(Number.parseInt("100", 10));   // 100
console.log(Number.parseInt("10.5", 10));  // 10
console.log(Number.parseInt("100px", 10)); // 100
```

The second argument specifies the radix (number base). Here, `10` represents decimal.

Use `Number.parseFloat()` to parse a floating-point number.

```javascript
console.log(Number.parseFloat("10.5"));    // 10.5
console.log(Number.parseFloat("99.99kg")); // 99.99
```

#### Number vs parseInt vs parseFloat

```javascript
console.log(Number("100px"));              // NaN
console.log(Number.parseInt("100px", 10)); // 100
console.log(Number.parseFloat("10.5px"));  // 10.5
```

Use `Number()` when the entire nonempty input should represent a number. Validate empty strings separately because they convert to zero.

Use parsing methods when extracting a numeric prefix is intentional.

#### Converting to String

Use `String()`.

```javascript
console.log(String(100));       // "100"
console.log(String(true));      // "true"
console.log(String(null));      // "null"
console.log(String(undefined)); // "undefined"
```

Template literals are also useful for formatting values as strings.

```javascript
const price = 500;

const message = `Price: ₹${price}`;

console.log(message); // Price: ₹500
```

#### Converting to Boolean

Use `Boolean()`.

```javascript
console.log(Boolean(1));       // true
console.log(Boolean(0));       // false
console.log(Boolean("Hello")); // true
console.log(Boolean(""));      // false
console.log(Boolean(null));    // false
```

### 6.2 Implicit Type Conversion (Type Coercion)

Type coercion occurs when JavaScript automatically converts values during an operation.

```javascript
console.log("5" + 2); // "52"
console.log("5" - 2); // 3
console.log("5" * 2); // 10
console.log("5" / 2); // 2.5
```

The `+` operator performs string concatenation when one of these operands is a string.

Other arithmetic operators generally attempt numeric conversion.

```javascript
console.log(true + 1);  // 2
console.log(false + 1); // 1
```

Implicit conversion can produce unexpected results.

```javascript
const price = "500";
const deliveryCharge = 50;

console.log(price + deliveryCharge); // "50050"
```

Prefer explicit conversion when working with numeric input.

```javascript
const price = "500";
const deliveryCharge = 50;

const total = Number(price) + deliveryCharge;

console.log(total); // 550
```

---

## 7. Truthy and Falsy Values

JavaScript can interpret non-boolean values as booleans in conditions.

A value that converts to `true` is called truthy.

A value that converts to `false` is called falsy.

### 7.1 Falsy Values

The standard falsy values are:

```javascript
false
0
-0
0n
""
null
undefined
NaN
```

```javascript
console.log(Boolean(false));     // false
console.log(Boolean(0));         // false
console.log(Boolean(""));        // false
console.log(Boolean(null));      // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));       // false
```

There is also a rare legacy browser-specific exception, `document.all`, which we do not need for modern development.

### 7.2 Truthy Values

All other ordinary values are truthy.

```javascript
console.log(Boolean(1));       // true
console.log(Boolean(-1));      // true
console.log(Boolean("Hello")); // true
console.log(Boolean("false")); // true
console.log(Boolean("0"));     // true
console.log(Boolean(" "));     // true
console.log(Boolean([]));      // true
console.log(Boolean({}));      // true
```

Important observations:

- An empty array is truthy.
- An empty object is truthy.
- The string `"false"` is truthy.
- The string `"0"` is truthy.
- A string containing whitespace is truthy.

#### Checking User Input

```javascript
const username = "   ";

const hasUsername = Boolean(username.trim());

console.log(hasUsername); // false
```

#### Checking an Empty Array

```javascript
const cart = [];

console.log(Boolean(cart)); // true

const isCartEmpty = cart.length === 0;

console.log(isCartEmpty); // true
```

Do not use truthiness alone to check whether an array is empty.


## 8. Equality Operators

JavaScript provides two kinds of equality comparisons.

### 8.1 Loose Equality

The `==` operator can perform type coercion before comparison.

```javascript
console.log(5 == "5");        // true
console.log(0 == false);      // true
console.log(null == undefined); // true
```

Loose equality can produce unexpected behavior.

### 8.2 Strict Equality

The `===` operator compares values without performing type coercion.

```javascript
console.log(5 === "5");          // false
console.log(5 === 5);            // true
console.log(0 === false);        // false
console.log(null === undefined); // false
```

Strict inequality:

```javascript
console.log(5 !== "5"); // true
console.log(5 !== 5);   // false
```

**Best practice:** Prefer `===` and `!==` in modern JavaScript.

### 8.3 Object Equality

Objects and arrays are compared by identity, not by their contents.

```javascript
const user1 = { name: "Alex" };
const user2 = { name: "Alex" };

console.log(user1 === user2); // false
```

Even though their contents are identical, they are different objects.

```javascript
const user1 = { name: "Alex" };
const user2 = user1;

console.log(user1 === user2); // true
```

Both variables now refer to the same object.

### 8.4 Special Case: NaN

```javascript
console.log(NaN === NaN); // false
```

Use `Number.isNaN()` instead.

```javascript
console.log(Number.isNaN(NaN)); // true
```


## 9. Modern Operators for Handling Missing Values

### 9.1 Logical OR Operator (`||`)

The logical OR operator can provide a fallback value when the original value is falsy.

```javascript
const username = "";

const displayName = username || "Guest";

console.log(displayName); // Guest
```

However, this can incorrectly replace valid falsy values.

```javascript
const quantity = 0;

const finalQuantity = quantity || 1;

console.log(finalQuantity); // 1
```

Here, zero may be a valid quantity, but it gets replaced.

### 9.2 Nullish Coalescing Operator (`??`)

The nullish coalescing operator provides a fallback only when the original value is `null` or `undefined`.

```javascript
const quantity = 0;

const finalQuantity = quantity ?? 1;

console.log(finalQuantity); // 0
```

More examples:

```javascript
console.log(null ?? "Default");      // Default
console.log(undefined ?? "Default"); // Default
console.log(0 ?? 100);               // 0
console.log(false ?? true);          // false
console.log("" ?? "Guest");          // ""
```

Use `??` when only missing values should trigger a fallback.

Use `||` when all falsy values should trigger a fallback.

### 9.3 Optional Chaining (`?.`)

Optional chaining safely accesses properties when an object might be `null` or `undefined`.

```javascript
const user = null;

console.log(user?.name); // undefined
```

Without optional chaining, accessing `user.name` would throw a TypeError.

Optional chaining can also be combined with nullish coalescing.

```javascript
const user = null;

const displayName = user?.name ?? "Guest";

console.log(displayName); // Guest
```

These operators are widely used when working with API responses, user profiles, and application settings.

We will explore optional chaining further when learning objects.
