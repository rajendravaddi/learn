# JavaScript Variables

## 1.1 Variables

A variable is a named reference to a value. Variables allow us to store, access, update, and reuse data throughout a program.

JavaScript provides three keywords for declaring variables:

- `const`
- `let`
- `var`

In modern JavaScript, we primarily use `const` and `let`. The `var` keyword is mostly encountered in legacy code, so we will avoid using it.

## 1.2 Declaring Variables Using `const`

The `const` keyword declares a variable that cannot be reassigned.

```javascript
const username = "Alex";
const age = 22;
const country = "India";

console.log(username);
console.log(age);
console.log(country);
```

Output:

```text
Alex
22
India
```

Reassigning a `const` variable results in an error.

```javascript
const age = 22;

age = 23; // TypeError
```

A `const` variable must be initialized during declaration.

```javascript
const age; // SyntaxError
```

**Best practice:** Use `const` by default whenever a variable does not need to be reassigned.

## 1.3 Declaring Variables Using `let`

The `let` keyword declares a variable that can be reassigned.

```javascript
let score = 0;

score = 10;
score = 20;

console.log(score);
```

Output:

```text
20
```

Unlike `const`, a `let` variable can be declared without an initial value.

```javascript
let username;

console.log(username); // undefined

username = "Alex";

console.log(username); // Alex
```


## 1.4 Declaration, Initialization and Reassignment

**Declaration:** Creating a variable.

```javascript
let score;
```

**Initialization:** Providing its initial value.

```javascript
let points = 100;
```

**Assignment:** Assigning a value to a variable.

```javascript
score = 50;
```

**Reassignment:** Replacing an existing value.

```javascript
points = 200;
```

**Redeclaration:** Declaring a variable again with the same name in the same scope.

```javascript
let age = 22;
let age = 25; // SyntaxError
```

Both `let` and `const` prevent redeclaration within the same scope.

## 1.5 Variable Naming Rules

Variable names:

- Can contain letters, digits, underscores (`_`), and dollar signs (`$`).
- Cannot begin with a digit.
- Cannot contain spaces or hyphens.
- Cannot be reserved JavaScript keywords.
- Are case-sensitive.

Valid variable names:

```javascript
const username = "Alex";
const userAge = 22;
const _id = 101;
const $price = 500;
const product2 = "Laptop";
```

Invalid variable names:

```javascript
const 2product = "Laptop";
const user-name = "Alex";
const user age = 22;
const class = "JavaScript";
```

JavaScript is case-sensitive.

```javascript
const username = "Alex";
const userName = "John";

console.log(username); // Alex
console.log(userName); // John
```

### Modern Naming Conventions

Use `camelCase` for ordinary variables.

```javascript
const firstName = "Alex";
const totalPrice = 1500;
const isLoggedIn = true;
const numberOfProducts = 5;
```

Use descriptive names instead of unclear abbreviations.

```javascript
// Avoid
const p = 500;
const q = 3;

// Prefer
const productPrice = 500;
const quantity = 3;
```

Uppercase snake case is commonly used for fixed configuration constants.

```javascript
const MAX_LOGIN_ATTEMPTS = 5;
const API_BASE_URL = "https://api.example.com";
```

Not every `const` variable needs an uppercase name.

## 1.6 Variable Scope

Scope determines where a variable can be accessed within a program.

Both `let` and `const` are block-scoped.

A block is a section of code enclosed within curly braces.

```javascript
{
    const username = "Alex";
    let age = 22;

    console.log(username); // Alex
    console.log(age);      // 22
}

console.log(username); // ReferenceError
```

Variables declared inside a block cannot be accessed outside that block.

However, variables declared outside a block can be accessed inside it.

```javascript
const username = "Alex";

{
    console.log(username); // Alex
}
```

### Variable Shadowing

An inner scope can declare a variable with the same name as a variable in an outer scope.

```javascript
const message = "Outer message";

{
    const message = "Inner message";

    console.log(message);
}

console.log(message);
```

Output:

```text
Inner message
Outer message
```

The inner variable does not modify the outer variable.

### Temporal Dead Zone (TDZ)

Variables declared using `let` and `const` cannot be accessed before their declaration has been initialized.

```javascript
console.log(username); // ReferenceError

const username = "Alex";
```

The period between entering a scope and initializing its variable is called the Temporal Dead Zone.

**Best practice:** Always declare variables before using them.
