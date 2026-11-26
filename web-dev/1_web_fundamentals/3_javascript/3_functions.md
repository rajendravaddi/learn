# JavaScript — Functions

## 1. Function Fundamentals

A function is a reusable block of code designed to perform a specific task. Functions help us organize code, avoid repetition, separate responsibilities, and build maintainable applications.

In modern JavaScript, there are three commonly used ways to define functions.

### 1.1 Function Declarations, Function Expressions and Arrow Functions

**Function Declaration**

A function declaration defines a named function using the `function` keyword.

```javascript
function add(a, b) {
    return a + b;
}

console.log(add(10, 20)); // 30
```

**Function Expression**

A function expression creates a function and assigns it to a variable.

```javascript
const add = function (a, b) {
    return a + b;
};

console.log(add(10, 20)); // 30
```

**Arrow Function**

Arrow functions provide a concise syntax for defining functions and are widely used in modern JavaScript.

```javascript
const add = (a, b) => {
    return a + b;
};

console.log(add(10, 20)); // 30
```

When the function body contains only a single expression, we can omit the curly braces and the `return` keyword.

```javascript
const add = (a, b) => a + b;

console.log(add(10, 20)); // 30
```

All three implementations perform the same calculation. However, they differ in hoisting, syntax, and how they handle `this`.

| Feature | Function Declaration | Function Expression | Arrow Function |
|---|---|---|---|
| Syntax | `function add() {}` | `const add = function () {}` | `const add = () => {}` |
| Callable before definition | Yes | No, with `const` or `let` | No, with `const` or `let` |
| Implicit return | No | No | Yes |
| Own `this` binding | Yes | Yes | No |
| Common usage | Named reusable functions | Functions assigned as values | Callbacks and utilities |

**When to use which?**

- Use function declarations for named, reusable functions.
- Use arrow functions for concise utilities, callbacks, and functions that do not require their own `this`.
- Use regular function expressions when you need a function value with regular function behavior.

Both function declarations and arrow functions are modern and widely used. Arrow functions are not a complete replacement for regular functions.

### 1.2 Parameters, Arguments and Return Values

Parameters are variables defined in a function's definition.

Arguments are the actual values supplied when calling the function.

```javascript
function calculateTotal(price, quantity) {
    return price * quantity;
}

const total = calculateTotal(500, 3);

console.log(total); // 1500
```

Here:

- `price` and `quantity` are parameters.
- `500` and `3` are arguments.
- `1500` is the return value.

The `return` statement ends function execution and sends a value back to the caller.

```javascript
function getDiscount(price) {
    return price * 0.1;

    console.log("This will never execute");
}

console.log(getDiscount(1000)); // 100
```

Any statement after an unconditional `return` is unreachable.

**Functions without a return value**

If a function does not explicitly return a value, JavaScript returns `undefined`.

```javascript
function greet(username) {
    console.log(`Hello, ${username}!`);
}

const result = greet("Alex");

console.log(result);
```

Output:

```text
Hello, Alex!
undefined
```

Returning values makes functions easier to reuse, combine, and test.

### 1.3 Arrow Function Syntax and Return Types

Arrow functions support several syntax variations.

**No parameters:**

```javascript
const greet = () => "Hello, JavaScript!";

console.log(greet());
```

**Single parameter:**

```javascript
const square = number => number * number;

console.log(square(5)); // 25
```

Parentheses around a single simple parameter are optional.

```javascript
const square = (number) => number * number;
```

**Multiple parameters:**

```javascript
const multiply = (a, b) => a * b;

console.log(multiply(5, 4)); // 20
```

**Implicit return:**

When the function body is a single expression, its result is returned automatically.

```javascript
const double = number => number * 2;

console.log(double(10)); // 20
```

**Explicit return:**

When using curly braces for the function body, we must explicitly return a value.

```javascript
const calculateTotal = (price, quantity) => {
    const subtotal = price * quantity;
    const deliveryCharge = 50;

    return subtotal + deliveryCharge;
};

console.log(calculateTotal(500, 2)); // 1050
```

A common mistake is forgetting the `return` keyword.

```javascript
const square = number => {
    number * number;
};

console.log(square(5)); // undefined
```

**Returning objects from arrow functions**

Wrap an object literal in parentheses when returning it implicitly.

```javascript
const createUser = (name, age) => ({
    name: name,
    age: age,
    isActive: true
});

console.log(createUser("Alex", 22));
```

Output:

```text
{ name: 'Alex', age: 22, isActive: true }
```

Without parentheses, JavaScript interprets the curly braces as a function body rather than an object literal.

### 1.4 Default Parameters, Missing and Extra Arguments

JavaScript allows functions to be called with fewer or more arguments than their declared parameters.

**Missing arguments**

Missing arguments receive the value `undefined`.

```javascript
function greet(username) {
    return `Hello, ${username}!`;
}

console.log(greet()); // Hello, undefined!
```

**Default parameters**

Default parameters provide fallback values when an argument is omitted or explicitly passed as `undefined`.

```javascript
function greet(username = "Guest") {
    return `Hello, ${username}!`;
}

console.log(greet("Alex"));    // Hello, Alex!
console.log(greet());          // Hello, Guest!
console.log(greet(undefined)); // Hello, Guest!
console.log(greet(null));      // Hello, null!
```

Default parameters do not replace `null`, `false`, `0`, or empty strings.

Multiple parameters can have default values.

```javascript
const calculateTotal = (
    price,
    quantity = 1,
    deliveryCharge = 0
) => price * quantity + deliveryCharge;

console.log(calculateTotal(500));         // 500
console.log(calculateTotal(500, 3));      // 1500
console.log(calculateTotal(500, 3, 50));  // 1550
```

A default parameter can also reference an earlier parameter.

```javascript
const createProfile = (username, displayName = username) => ({
    username,
    displayName
});

console.log(createProfile("alex"));
```

Output:

```text
{ username: 'alex', displayName: 'alex' }
```

**Extra arguments**

Extra arguments do not cause an error. They are simply not assigned to the declared parameters.

```javascript
const add = (a, b) => a + b;

console.log(add(10, 20, 30, 40)); // 30
```

**Rest parameters**

Rest parameters collect remaining arguments into an array.

```javascript
function sum(...numbers) {
    let total = 0;

    for (const number of numbers) {
        total += number;
    }

    return total;
}

console.log(sum(10, 20));         // 30
console.log(sum(10, 20, 30, 40)); // 100
console.log(sum());               // 0
```

A rest parameter must be the last parameter in a function definition.

```javascript
function displayUser(name, ...skills) {
    console.log(`Name: ${name}`);
    console.log(skills);
}

displayUser("Alex", "JavaScript", "React", "Node.js");
```

Output:

```text
Name: Alex
[ 'JavaScript', 'React', 'Node.js' ]
```

We will explore rest parameters in detail in the Spread and Rest Operators topic.

### 1.5 Parameter Destructuring

Parameter destructuring allows us to extract properties from objects or elements from arrays directly in a function's parameter list.

Consider a function that accepts multiple related arguments.

```javascript
function createUser(name, email, age, isAdmin) {
    return {
        name,
        email,
        age,
        isAdmin
    };
}

const user = createUser(
    "Alex",
    "alex@example.com",
    22,
    false
);
```

When functions have many parameters, remembering their correct order becomes difficult.

A modern alternative is to accept an options object.

```javascript
function createUser({ name, email, age, isAdmin = false }) {
    return {
        name,
        email,
        age,
        isAdmin
    };
}

const user = createUser({
    name: "Alex",
    email: "alex@example.com",
    age: 22
});

console.log(user);
```

Output:

```text
{
    name: 'Alex',
    email: 'alex@example.com',
    age: 22,
    isAdmin: false
}
```

Benefits:

- Arguments are self-descriptive.
- Object properties can be supplied in any order.
- Optional properties can have default values.
- Adding new options is easier.

We will cover destructuring in depth in its dedicated topic.

### 1.6 Passing Primitive Values, Objects and Arrays

JavaScript always passes arguments by value.

For primitive values, the function receives a copy of the primitive value. For objects and arrays, the function receives a copy of the reference to the original object.

**Passing primitive values**

```javascript
function updateScore(score) {
    score = 100;

    console.log(`Inside function: ${score}`);
}

let score = 50;

updateScore(score);

console.log(`Outside function: ${score}`);
```

Output:

```text
Inside function: 100
Outside function: 50
```

Reassigning the parameter does not change the original variable.

**Passing objects**

```javascript
function updateUser(user) {
    user.age = 25;
}

const user = {
    name: "Alex",
    age: 22
};

updateUser(user);

console.log(user);
```

Output:

```text
{ name: 'Alex', age: 25 }
```

Both the parameter and the original variable refer to the same object. Mutating that object affects the original object.

However, reassigning the parameter does not replace the original object.

```javascript
function replaceUser(user) {
    user = {
        name: "John",
        age: 30
    };
}

const user = {
    name: "Alex",
    age: 22
};

replaceUser(user);

console.log(user);
```

Output:

```text
{ name: 'Alex', age: 22 }
```

**Passing arrays**

Arrays behave the same way because they are objects.

```javascript
function addProduct(cart, product) {
    cart.push(product);
}

const cart = ["Laptop", "Keyboard"];

addProduct(cart, "Mouse");

console.log(cart);
```

Output:

```text
[ 'Laptop', 'Keyboard', 'Mouse' ]
```

In modern application development, we often prefer returning updated objects or arrays instead of unexpectedly mutating the original ones.

```javascript
function updateAge(user, age) {
    return {
        ...user,
        age
    };
}

const user = {
    name: "Alex",
    age: 22
};

const updatedUser = updateAge(user, 25);

console.log(user);
console.log(updatedUser);
```

Output:

```text
{ name: 'Alex', age: 22 }
{ name: 'Alex', age: 25 }
```

The spread operator creates a shallow copy of the object. We will explore it in a later topic.

---

## 2. Function Scope and Hoisting

### 2.1 Function Scope and Lexical Scope

Scope determines where variables and functions can be accessed.

JavaScript has several kinds of scope:

| Scope | Description |
|---|---|
| Global scope | Accessible throughout the environment, subject to its rules |
| Module scope | Accessible within the current ES module |
| Function scope | Accessible within the function where declared |
| Block scope | Accessible within the block where declared |

Since our learning workspace uses ES modules, variables declared at the top level of a JavaScript file belong to module scope rather than global scope.

```javascript
const applicationName = "Shopping App";

function calculateTotal(price, quantity) {
    const total = price * quantity;

    console.log(applicationName);

    return total;
}

console.log(calculateTotal(500, 3));
```

Output:

```text
Shopping App
1500
```

The function can access:

- Its own parameters.
- Variables declared inside its body.
- Variables declared in its surrounding scope.

However, code outside the function cannot access its local variables.

```javascript
console.log(total); // ReferenceError
```

**Lexical scope and nested functions**

Lexical scope means that a function's accessible variables are determined by where the function is defined in the source code, not where it is called.

```javascript
const appName = "Shopping App";

function processOrder() {
    const orderId = 101;

    function printOrder() {
        const status = "Completed";

        console.log(appName);
        console.log(orderId);
        console.log(status);
    }

    printOrder();
}

processOrder();
```

Output:

```text
Shopping App
101
Completed
```

The inner function can access variables from its surrounding scopes.

However, the outer function cannot access variables declared inside the inner function.

```javascript
function outer() {
    function inner() {
        const message = "Hello";
    }

    inner();

    console.log(message); // ReferenceError
}

outer();
```

Consider another example demonstrating that scope depends on where a function is defined.

```javascript
const message = "Module message";

function printMessage() {
    console.log(message);
}

function execute() {
    const message = "Local message";

    printMessage();
}

execute();
```

Output:

```text
Module message
```

Although `printMessage()` is called inside `execute()`, it accesses the scope where it was originally defined.

Lexical scope is the foundation for understanding closures, which we will learn separately.

### 2.2 Function Hoisting

Hoisting describes how JavaScript establishes declarations and bindings before executing code within a scope.

It does not physically move source code.

**Function declarations**

Function declarations are initialized before the surrounding code executes. Therefore, they can be called before their definition.

```javascript
console.log(add(10, 20)); // 30

function add(a, b) {
    return a + b;
}
```

**Function expressions and arrow functions**

Functions assigned to `const` or `let` cannot be accessed before their variable initialization.

```javascript
console.log(add(10, 20)); // ReferenceError

const add = function (a, b) {
    return a + b;
};
```

The same applies to arrow functions.

```javascript
console.log(add(10, 20)); // ReferenceError

const add = (a, b) => a + b;
```

This happens because `const` and `let` bindings remain in the Temporal Dead Zone until they are initialized.

| Function Type | Callable Before Definition |
|---|---|
| Function declaration | Yes |
| Function expression with `const` | No |
| Arrow function with `const` | No |

Although function declarations support calling functions before their definition, organizing code logically and consistently is generally more important than relying on hoisting.

---

## 3. First-Class Functions, Callbacks and Higher-Order Functions

JavaScript treats functions as first-class values.

This means functions can be:

- Assigned to variables.
- Passed as arguments to other functions.
- Returned from other functions.
- Stored inside objects and arrays.

This capability is fundamental to modern JavaScript, frontend frameworks, event handling, asynchronous programming, and functional programming.

### 3.1 Functions as Values

A function can be assigned to another variable.

```javascript
function greet(username) {
    return `Hello, ${username}!`;
}

const welcome = greet;

console.log(welcome("Alex")); // Hello, Alex!
console.log(greet === welcome); // true
```

Both variables refer to the same function object.

**Function reference vs function invocation**

```javascript
const greet = () => "Hello!";

const reference = greet;
const result = greet();

console.log(typeof reference); // function
console.log(typeof result);    // string
```

- `greet` refers to the function itself.
- `greet()` executes the function and produces its return value.

This distinction is particularly important when working with callbacks and event handlers.

Functions can also be stored in objects.

```javascript
const calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b
};

console.log(calculator.add(10, 20));      // 30
console.log(calculator.subtract(20, 5));  // 15
console.log(calculator.multiply(5, 4));   // 20
```

### 3.2 Callback Functions and Higher-Order Functions

A callback is a function passed to another function so that the receiving function can invoke it.

A higher-order function is a function that accepts another function as an argument, returns a function, or both.

These concepts are closely related.

```javascript
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;

function calculate(a, b, operation) {
    return operation(a, b);
}

console.log(calculate(10, 5, add));      // 15
console.log(calculate(10, 5, subtract)); // 5
console.log(calculate(10, 5, multiply)); // 50
```

Here:

- `add`, `subtract`, and `multiply` are callback functions when passed to `calculate()`.
- `calculate()` is a higher-order function.
- `operation(a, b)` invokes the supplied callback.

The higher-order function does not need to know how the operation is implemented. It only needs to know how to invoke it.

This makes the function flexible and reusable.

**Named and anonymous callbacks**

We can pass an existing named function.

```javascript
const divide = (a, b) => a / b;

console.log(calculate(20, 5, divide)); // 4
```

Alternatively, we can define an anonymous function directly as an argument.

```javascript
console.log(
    calculate(10, 3, function (a, b) {
        return a % b;
    })
);

// 1
```

Modern JavaScript commonly uses inline arrow functions for short callbacks.

```javascript
console.log(
    calculate(2, 3, (a, b) => a ** b)
);

// 8
```

Use named callbacks when the logic is reusable or complex. Use inline arrow callbacks when the logic is short and specific to that operation.

**Practical example: Flexible price calculator**

```javascript
function calculatePrice(price, quantity, discountStrategy) {
    const subtotal = price * quantity;

    return discountStrategy(subtotal);
}

const regularDiscount = total => total * 0.95;
const premiumDiscount = total => total * 0.8;
const noDiscount = total => total;

console.log(calculatePrice(1000, 2, regularDiscount));
// 1900

console.log(calculatePrice(1000, 2, premiumDiscount));
// 1600

console.log(calculatePrice(1000, 2, noDiscount));
// 2000
```

Instead of hardcoding every discount rule inside `calculatePrice()`, we pass the required behavior as a function.

This approach separates calculation logic from discount logic.

### 3.3 Synchronous and Asynchronous Callbacks

A synchronous callback executes during the execution of the function receiving it.

```javascript
function processTask(callback) {
    console.log("Starting task");

    callback();

    console.log("Task completed");
}

processTask(() => {
    console.log("Processing task");
});
```

Output:

```text
Starting task
Processing task
Task completed
```

An asynchronous callback executes later, after an asynchronous operation or scheduled event.

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Task executed");
}, 1000);

console.log("End");
```

Output:

```text
Start
End
Task executed
```

`setTimeout()` schedules the callback to execute after at least approximately 1000 milliseconds, subject to the runtime's scheduling.

The remaining synchronous code continues executing without waiting for the callback.

Callbacks themselves are not inherently asynchronous. Their execution behavior depends on the function or API receiving them.

In web development, callbacks are commonly used with:

- Array methods.
- Button click events.
- Form submission events.
- Timers.
- Promise handlers.

We will explore asynchronous programming in detail when learning Promises and Async/await.

### 3.4 Returning Functions from Functions

A higher-order function can also return another function.

```javascript
function createMultiplier(multiplier) {
    return number => number * multiplier;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(10)); // 20
console.log(triple(10)); // 30
```

Here:

- `createMultiplier()` returns a new function.
- `double` and `triple` store the returned functions.
- Each returned function remembers its corresponding `multiplier`.

This is an example of a closure.


### 3.5 Function Composition

Function composition combines smaller functions to perform a larger operation.

Consider these reusable string utilities.

```javascript
const trimText = text => text.trim();
const lowercaseText = text => text.toLowerCase();
const replaceSpaces = text => text.replaceAll(" ", "-");
```

We can combine them to generate a simple URL slug.

```javascript
function createSlug(text) {
    const trimmed = trimText(text);
    const lowercase = lowercaseText(trimmed);

    return replaceSpaces(lowercase);
}

console.log(createSlug("  Modern JavaScript Functions  "));
```

Output:

```text
modern-javascript-functions
```

We can also compose the functions directly.

```javascript
const createSlug = text =>
    replaceSpaces(lowercaseText(trimText(text)));

console.log(createSlug("  Learn JavaScript  "));
// learn-javascript
```

The output of one function becomes the input of another.

This is a fundamental idea in functional programming.

Each function has a small responsibility, making it independently reusable and testable.

For production URL slugs, additional handling of punctuation, repeated whitespace, and special characters may be necessary.

---

## 4. Functions and the `this` Keyword

The `this` keyword is used to access a function's execution context.

In regular functions, the value of `this` generally depends on how the function is called.

Arrow functions behave differently: they inherit `this` from their surrounding lexical context.

### 4.1 `this` in Regular Functions and Object Methods

Consider an object representing a user.

```javascript
const user = {
    name: "Alex",
    age: 22,

    greet() {
        return `Hello, my name is ${this.name}`;
    }
};

console.log(user.greet());
```

Output:

```text
Hello, my name is Alex
```

When `greet()` is invoked as `user.greet()`, `this` refers to `user`.

The method shorthand syntax is a modern way to define object methods.

```javascript
const user = {
    name: "Alex",

    greet() {
        return `Hello, ${this.name}`;
    }
};
```

It is generally preferable to the longer syntax when defining ordinary object methods.

```javascript
const user = {
    name: "Alex",

    greet: function () {
        return `Hello, ${this.name}`;
    }
};
```

The value of `this` is determined by the invocation, not necessarily by the object where the function was originally defined.

```javascript
function introduce() {
    return `I am ${this.name}`;
}

const user1 = {
    name: "Alex",
    introduce
};

const user2 = {
    name: "John",
    introduce
};

console.log(user1.introduce()); // I am Alex
console.log(user2.introduce()); // I am John
```

The same function produces different results depending on the object through which it is called.

**Standalone regular function calls**

Our workspace uses ES modules, which automatically execute in strict mode.

```javascript
function showContext() {
    console.log(this);
}

showContext(); // undefined
```

When a regular function is called without an object receiver in strict mode, `this` is `undefined`.

### 4.2 Lexical `this` in Arrow Functions

Arrow functions do not create their own `this` binding.

They inherit `this` from their surrounding lexical scope.

Consider the following incorrect implementation.

```javascript
const user = {
    name: "Alex",

    greet: () => {
        return `Hello, ${this.name}`;
    }
};

console.log(user.greet());
```

In our Node.js ES module environment, this produces a TypeError because top-level `this` is `undefined`.

An object literal does not create a new `this` binding for an arrow function.

Use a regular method instead.

```javascript
const user = {
    name: "Alex",

    greet() {
        return `Hello, ${this.name}`;
    }
};

console.log(user.greet()); // Hello, Alex
```

**When arrow functions are useful with `this`**

Arrow functions are particularly useful inside regular methods when a nested callback needs to access the surrounding method's `this`.

```javascript
const user = {
    name: "Alex",

    greetLater() {
        setTimeout(() => {
            console.log(`Hello, ${this.name}`);
        }, 1000);
    }
};

user.greetLater();
```

Output after approximately one second:

```text
Hello, Alex
```

The arrow callback inherits `this` from `greetLater()`, which refers to `user`.

This is a common pattern in modern JavaScript.


### 4.3 Losing Function Context

A regular function can lose its original object context when extracted from an object.

```javascript
const user = {
    name: "Alex",

    greet() {
        return `Hello, ${this.name}`;
    }
};

const greet = user.greet;

console.log(greet()); // TypeError
```

Calling `greet()` is different from calling `user.greet()`.

The extracted function does not automatically remember the object it came from.

This commonly occurs when passing object methods as callbacks.

JavaScript provides three methods for explicitly controlling a regular function's `this`:

- `call()`
- `apply()`
- `bind()`

### 4.4 `call()`, `apply()` and `bind()`

Consider the following reusable function.

```javascript
function introduce(greeting, punctuation) {
    return `${greeting}, I am ${this.name}${punctuation}`;
}

const user = {
    name: "Alex"
};
```

**call()**

Invokes the function immediately with a specified `this` value and individual arguments.

```javascript
console.log(
    introduce.call(user, "Hello", "!")
);
```

Output:

```text
Hello, I am Alex!
```

**apply()**

Invokes the function immediately with a specified `this` value and arguments supplied as an array or array-like object.

```javascript
console.log(
    introduce.apply(user, ["Welcome", "."])
);
```

Output:

```text
Welcome, I am Alex.
```

In modern JavaScript, `call()` combined with spread syntax can often replace `apply()`.

```javascript
const args = ["Welcome", "."];

console.log(introduce.call(user, ...args));
```

**bind()**

Creates a new function with a permanently bound `this` value for ordinary function calls.

Unlike `call()` and `apply()`, `bind()` does not execute the function immediately.

```javascript
const boundIntroduce = introduce.bind(user);

console.log(boundIntroduce("Hello", "!"));
console.log(boundIntroduce("Welcome", "."));
```

Output:

```text
Hello, I am Alex!
Welcome, I am Alex.
```

`bind()` can also preconfigure arguments.

```javascript
const greetUser = introduce.bind(user, "Hello");

console.log(greetUser("!"));
```

Output:

```text
Hello, I am Alex!
```

**Fixing a lost function context**

```javascript
const user = {
    name: "Alex",

    greet() {
        return `Hello, ${this.name}`;
    }
};

const greet = user.greet.bind(user);

console.log(greet()); // Hello, Alex
```

A modern alternative is to wrap the method call in an arrow function.

```javascript
const greet = () => user.greet();

console.log(greet()); // Hello, Alex
```

Both approaches preserve the intended object context, although the arrow wrapper looks up the method when called, while `bind()` captures the original function.

| Method | Executes Immediately | Arguments |
|---|---|---|
| `call()` | Yes | Individual arguments |
| `apply()` | Yes | Array or array-like object |
| `bind()` | No | Optional predefined arguments |

These methods cannot change the lexical `this` of an arrow function.

### Choosing Between Regular Functions and Arrow Functions

| Situation | Recommended Approach |
|---|---|
| Named reusable function | Function declaration or arrow function |
| Short utility function | Arrow function |
| Array callback | Arrow function |
| Object method requiring `this` | Regular method |
| Nested callback accessing surrounding `this` | Arrow function |
| Function requiring dynamic `this` | Regular function |
| Passing an object method as a callback | Arrow wrapper or `bind()` |

---

## 5. Writing Clean and Reusable Functions

### 5.1 Pure Functions, Impure Functions and Side Effects

A pure function satisfies two conditions:

1. The same inputs always produce the same output.
2. It does not cause observable side effects outside the function.

```javascript
function calculateTotal(price, quantity) {
    return price * quantity;
}

console.log(calculateTotal(500, 2)); // 1000
console.log(calculateTotal(500, 2)); // 1000
```

The function depends only on its inputs and does not modify external state.

An impure function may depend on external changing state or produce side effects.

```javascript
let discountPercentage = 10;

function calculateDiscount(price) {
    return price * discountPercentage / 100;
}

console.log(calculateDiscount(1000)); // 100

discountPercentage = 20;

console.log(calculateDiscount(1000)); // 200
```

The same input produces different outputs because the function depends on external state.

We can make it pure by passing the discount percentage as an argument.

```javascript
function calculateDiscount(price, discountPercentage) {
    return price * discountPercentage / 100;
}

console.log(calculateDiscount(1000, 10)); // 100
console.log(calculateDiscount(1000, 20)); // 200
```

**Side effects**

A side effect is an observable interaction beyond returning a value.

Common side effects include:

- Modifying external variables.
- Mutating input objects or arrays.
- Printing to the console.
- Updating the DOM.
- Writing to files or browser storage.
- Sending network requests.

Consider an impure function that modifies an input object.

```javascript
function updateUserAge(user, age) {
    user.age = age;

    return user;
}

const user = {
    name: "Alex",
    age: 22
};

const updatedUser = updateUserAge(user, 25);

console.log(user.age); // 25
console.log(user === updatedUser); // true
```

A non-mutating alternative:

```javascript
function updateUserAge(user, age) {
    return {
        ...user,
        age
    };
}

const user = {
    name: "Alex",
    age: 22
};

const updatedUser = updateUserAge(user, 25);

console.log(user.age);        // 22
console.log(updatedUser.age); // 25
console.log(user === updatedUser); // false
```

Pure functions are particularly useful for:

- Data transformation.
- Form validation.
- Business logic.
- State management.
- Unit testing.

Impure functions are not inherently bad. Real applications need side effects to communicate with servers, update interfaces, and store information.

The goal is to keep side effects intentional and separate them from pure business logic where practical.

### 5.2 Early Returns and Guard Clauses

Guard clauses handle invalid inputs or special cases at the beginning of a function.

They help reduce unnecessary nesting and make the main logic easier to understand.

Consider a function with nested conditions.

```javascript
function canAccessDashboard(user) {
    if (user !== null && user !== undefined) {
        if (user.isLoggedIn) {
            if (!user.isBlocked) {
                if (user.isEmailVerified) {
                    return true;
                }
            }
        }
    }

    return false;
}
```

We can simplify it using guard clauses.

```javascript
function canAccessDashboard(user) {
    if (!user) return false;
    if (!user.isLoggedIn) return false;
    if (user.isBlocked) return false;
    if (!user.isEmailVerified) return false;

    return true;
}
```

Usage:

```javascript
const user = {
    isLoggedIn: true,
    isBlocked: false,
    isEmailVerified: true
};

console.log(canAccessDashboard(user)); // true
console.log(canAccessDashboard(null)); // false
```

Guard clauses are particularly useful when different invalid conditions require different actions.

**Practical example: Form validation**

```javascript
function validateUsername(username) {
    if (typeof username !== "string") {
        return {
            isValid: false,
            message: "Username must be a string"
        };
    }

    const trimmedUsername = username.trim();

    if (trimmedUsername.length === 0) {
        return {
            isValid: false,
            message: "Username is required"
        };
    }

    if (trimmedUsername.length < 3) {
        return {
            isValid: false,
            message: "Username must contain at least 3 characters"
        };
    }

    return {
        isValid: true,
        message: "Username is valid"
    };
}

console.log(validateUsername(""));
console.log(validateUsername("Al"));
console.log(validateUsername("Alex"));
```

Output:

```text
{ isValid: false, message: 'Username is required' }

{
    isValid: false,
    message: 'Username must contain at least 3 characters'
}

{ isValid: true, message: 'Username is valid' }
```

Notice that every execution path returns an object with the same structure.

Consistent return types make functions easier to consume.

### 5.3 Recursive Functions

Recursion occurs when a function calls itself to solve a smaller version of the same problem.

A recursive function generally contains:

- A base case that stops recursion.
- A recursive case that moves toward the base case.

```javascript
function factorial(number) {
    if (number === 0 || number === 1) {
        return 1;
    }

    return number * factorial(number - 1);
}

console.log(factorial(5)); // 120
```

This example assumes a small non-negative integer input.

Execution:

```text
factorial(5)
    5 * factorial(4)
        4 * factorial(3)
            3 * factorial(2)
                2 * factorial(1)
                    1

Result: 120
```

Without a valid base case, recursive calls can continue until the runtime throws a stack overflow error.

### 5.4 Function Naming, Single Responsibility and Reusability

A function should have a descriptive name and a clearly defined responsibility.

Common naming patterns:

| Prefix | Purpose | Example |
|---|---|---|
| `get` | Retrieve a value | `getUsername()` |
| `calculate` | Perform a calculation | `calculateTotal()` |
| `is` | Check a condition | `isValidEmail()` |
| `has` | Check existence or possession | `hasPermission()` |
| `can` | Check capability | `canAccessDashboard()` |
| `create` | Create a value or resource | `createUser()` |
| `format` | Format a value | `formatPrice()` |
| `validate` | Validate input | `validatePassword()` |
| `handle` | Handle an event or action | `handleSubmit()` |

Avoid combining unrelated responsibilities in one function.

```javascript
function processOrder(price, quantity, discountPercentage) {
    const subtotal = price * quantity;
    const discount = subtotal * discountPercentage / 100;
    const total = subtotal - discount;

    console.log(`Subtotal: ₹${subtotal}`);
    console.log(`Discount: ₹${discount}`);
    console.log(`Total: ₹${total}`);
}
```

This function combines calculation and presentation.

We can separate the responsibilities.

```javascript
const calculateSubtotal = (price, quantity) =>
    price * quantity;

const calculateDiscount = (subtotal, percentage) =>
    subtotal * percentage / 100;

const formatPrice = price =>
    `₹${price.toFixed(2)}`;

function calculateOrder(price, quantity, discountPercentage) {
    const subtotal = calculateSubtotal(price, quantity);
    const discount = calculateDiscount(subtotal, discountPercentage);

    return {
        subtotal,
        discount,
        total: subtotal - discount
    };
}

function printOrder(order) {
    console.log(`Subtotal: ${formatPrice(order.subtotal)}`);
    console.log(`Discount: ${formatPrice(order.discount)}`);
    console.log(`Total: ${formatPrice(order.total)}`);
}

const order = calculateOrder(1000, 2, 10);

printOrder(order);
```

Output:

```text
Subtotal: ₹2000.00
Discount: ₹200.00
Total: ₹1800.00
```

Benefits:

- Calculation functions can be reused independently.
- Business logic can be tested without printing anything.
- Presentation logic can change without affecting calculations.
- Each function has a clear responsibility.
- The order data can later be displayed in a web page instead of the terminal.

This example uses ordinary floating-point arithmetic for learning purposes. Production financial applications should use appropriate monetary precision and rounding strategies.

**Modern function best practices**

- Use descriptive names that communicate a function's purpose.
- Prefer small, cohesive functions without splitting trivial logic unnecessarily.
- Use arrow functions for short utilities and callbacks.
- Use regular methods when dynamic `this` is required.
- Use default parameters for optional configuration.
- Use options objects when functions accept many related parameters.
- Prefer returning values over printing them inside business logic.
- Avoid unexpected mutations of input objects.
- Keep return types consistent.
- Use guard clauses to reduce unnecessary nesting.
- Separate calculations and data transformations from side effects.
- Avoid premature abstractions when a straightforward implementation is sufficient.
