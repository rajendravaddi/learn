# Asynchronous JavaScript and Error Handling

JavaScript supports asynchronous programming, allowing operations such as network requests, timers and file operations to take place without blocking the execution of other JavaScript code while waiting for their results.

Understanding asynchronous execution and error handling is essential for modern frontend and backend development.

## 1. Error Handling

### 1.1 Types of Errors

JavaScript provides several built-in error types.

| Error | Description |
|---|---|
| `Error` | General-purpose error |
| `SyntaxError` | Invalid JavaScript syntax |
| `ReferenceError` | Accessing an unavailable variable or binding |
| `TypeError` | Performing an operation on an incompatible value |
| `RangeError` | Providing a value outside its permitted range |
| `AggregateError` | Represents multiple errors together |

```javascript
// ReferenceError
console.log(unknownVariable);

// TypeError
null.toString();

// RangeError
new Array(-1);

// SyntaxError
JSON.parse("invalid JSON");
```

Run these statements independently because each throws an error.

### 1.2 try, catch and finally

The `try...catch` statement handles exceptions without abruptly terminating the current execution flow.

```javascript
try {
    const data = JSON.parse("invalid JSON");

    console.log(data);
} catch (error) {
    console.log("Failed to parse JSON");
    console.log(error.message);
} finally {
    console.log("Operation completed");
}
```

- `try` contains code that might throw an error.
- `catch` handles errors thrown within the `try` block.
- `finally` executes when control leaves the `try...catch` statement, whether an error occurred or not.

The `finally` block is commonly used for resource cleanup and resetting application state.

The catch parameter is optional when the error object is not needed.

```javascript
try {
    JSON.parse("invalid");
} catch {
    console.log("Invalid JSON");
}
```

Syntax errors that prevent the containing script from being parsed cannot be caught by a `try...catch` within that same script.

### 1.3 Error Objects

Error objects provide information about an exception.

```javascript
try {
    throw new Error("Something went wrong");
} catch (error) {
    console.log(error.name);    // Error
    console.log(error.message); // Something went wrong
    console.log(error.stack);   // Stack trace
}
```

| Property | Description |
|---|---|
| `name` | Error type |
| `message` | Description of the error |
| `stack` | Stack trace in supported runtimes |
| `cause` | Optional underlying cause |

### 1.4 Throwing Errors

The `throw` statement manually raises an exception.

```javascript
function divide(a, b) {
    if (b === 0) {
        throw new RangeError("Cannot divide by zero");
    }

    return a / b;
}

try {
    console.log(divide(10, 0));
} catch (error) {
    console.log(error.message);
}

// Cannot divide by zero
```

Although JavaScript allows throwing any value, prefer throwing `Error` objects.

```javascript
throw new Error("Invalid operation");
```

### 1.5 Error Propagation and Rethrowing

An unhandled exception propagates through the call stack until a suitable error handler is found.

```javascript
function validateAge(age) {
    if (age < 18) {
        throw new RangeError("Age must be at least 18");
    }
}

function register(age) {
    validateAge(age);
}

try {
    register(15);
} catch (error) {
    console.log(error.message);
}
```

A catch block can handle specific errors and rethrow unexpected ones.

```javascript
try {
    JSON.parse("invalid");
} catch (error) {
    if (error instanceof SyntaxError) {
        console.log("Invalid JSON");
    } else {
        throw error;
    }
}
```

Errors can also be wrapped while preserving their original cause.

```javascript
try {
    JSON.parse("invalid");
} catch (error) {
    throw new Error("Failed to process data", {
        cause: error
    });
}
```

### 1.6 Custom Errors

Custom error classes represent application-specific failures.

```javascript
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

function validateEmail(email) {
    if (!email.includes("@")) {
        throw new ValidationError("Invalid email");
    }
}

try {
    validateEmail("invalid-email");
} catch (error) {
    if (error instanceof ValidationError) {
        console.log(error.message);
    }
}
```

Custom errors are useful when different application failures require different handling.

---

## 2. Asynchronous JavaScript Fundamentals

### 2.1 Synchronous Execution

Synchronous code executes sequentially. Each operation must finish before the next operation begins on the same execution thread.

```javascript
console.log("First");
console.log("Second");
console.log("Third");

// First
// Second
// Third
```

A long-running synchronous operation blocks subsequent JavaScript execution.

```javascript
console.log("Start");

const end = Date.now() + 2000;

while (Date.now() < end) {
    // Blocks execution for approximately two seconds
}

console.log("End");
```

In a browser, blocking the main thread can make the user interface unresponsive.

### 2.2 Asynchronous Execution

Asynchronous operations allow JavaScript to continue executing other code while waiting for an operation to complete.

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timer completed");
}, 2000);

console.log("End");

// Start
// End
// Timer completed
```

Common asynchronous operations include:

- Network requests.
- Timers.
- File operations.
- Database operations.
- Waiting for user interactions.

### 2.3 Blocking vs Non-blocking

| Synchronous Blocking | Asynchronous Non-blocking |
|---|---|
| Waits for the operation to finish | Allows other code to execute while waiting |
| Can block the execution thread | Avoids blocking during supported waiting operations |
| Suitable for short computations | Suitable for network and I/O operations |

Asynchronous programming does not automatically make CPU-intensive computations non-blocking.

```javascript
async function calculate() {
    // A heavy synchronous computation here
    // can still block the execution thread.
}
```

CPU-intensive work can be moved to Web Workers in browsers or Worker Threads in Node.js when necessary.

### 2.4 Callbacks

A callback is a function passed to another function to be executed at an appropriate time.

```javascript
function getData(callback) {
    setTimeout(() => {
        callback({ id: 1, name: "Alex" });
    }, 1000);
}

getData(data => {
    console.log(data);
});
```

Callbacks can be synchronous or asynchronous.

```javascript
// Synchronous callback
[1, 2, 3].map(number => number * 2);

// Asynchronous callback
setTimeout(() => console.log("Done"), 1000);
```

Passing a callback does not automatically make an operation asynchronous.

### 2.5 Callback Hell

Nested asynchronous callbacks can make code difficult to read and maintain.

```javascript
getUser(user => {
    getOrders(user.id, orders => {
        getPayment(orders[0].id, payment => {
            console.log(payment);
        });
    });
});
```

This illustrative pattern is commonly called callback hell.

Promises and `async/await` provide more structured ways to handle dependent asynchronous operations.

---

## 3. Event Loop and Execution Model

JavaScript normally executes code on a single thread within a given execution agent. The runtime environment, such as a browser or Node.js, provides additional mechanisms for handling asynchronous operations.

### 3.1 Call Stack

The call stack tracks currently executing functions.

It follows the Last In, First Out (LIFO) principle.

```javascript
function first() {
    second();
}

function second() {
    third();
}

function third() {
    console.log("Hello");
}

first();
```

When `third()` executes, the call stack looks like:

```text
┌──────────────────┐
│ third()          │
├──────────────────┤
│ second()         │
├──────────────────┤
│ first()          │
├──────────────────┤
│ Module execution │
└──────────────────┘
```

Functions are removed from the stack as their execution completes.

Excessive recursive calls can cause a stack overflow.

### 3.2 Runtime APIs

Browsers and Node.js provide APIs that handle operations outside ordinary JavaScript execution.

Browser examples:

- `setTimeout()`
- `fetch()`
- DOM events

Node.js examples:

- Timers.
- Asynchronous file operations.
- Network operations.

The runtime manages these operations and schedules JavaScript callbacks or Promise reactions when appropriate.

### 3.3 Task Queue and Microtask Queue

Asynchronous work is scheduled through different queues and runtime mechanisms.

**Task queue (commonly called the macrotask queue):**

- Timer callbacks.
- Browser event callbacks.
- Other runtime-scheduled tasks.

**Microtask queue:**

- Promise `.then()`, `.catch()` and `.finally()` reactions.
- Continuations after `await`.
- `queueMicrotask()` callbacks.

```javascript
setTimeout(() => {
    console.log("Task");
}, 0);

queueMicrotask(() => {
    console.log("Microtask");
});

console.log("Synchronous");

// Synchronous
// Microtask
// Task
```

### 3.4 Event Loop

The event loop coordinates the execution of synchronous code and scheduled asynchronous work.

Simplified browser execution model:

```text
         JavaScript Code
                │
                ▼
           Call Stack
                │
                ├──────────────→ Runtime APIs
                │                     │
                │                     ▼
                │                 Task Queue
                │                     │
                │                     │
                │              Microtask Queue
                │                     │
                ▼                     ▼
              Event Loop / Scheduling
```

The general execution sequence is:

1. Execute the current synchronous code.
2. When the current task finishes and the call stack is empty, process pending microtasks.
3. Continue processing microtasks until the microtask queue is empty.
4. The browser may update rendering.
5. Execute the next eligible task.
6. Repeat the process.

Node.js follows related principles but has additional event loop phases and scheduling mechanisms.

### 3.5 Execution Order Example

```javascript
console.log("1");

setTimeout(() => {
    console.log("2");
}, 0);

Promise.resolve().then(() => {
    console.log("3");
});

queueMicrotask(() => {
    console.log("4");
});

console.log("5");

// 1
// 5
// 3
// 4
// 2
```

| Step | Operation | Output |
|---|---|---|
| 1 | Synchronous code | 1 |
| 2 | Schedule timer callback | — |
| 3 | Schedule Promise microtask | — |
| 4 | Schedule another microtask | — |
| 5 | Synchronous code | 5 |
| 6 | Execute Promise microtask | 3 |
| 7 | Execute queued microtask | 4 |
| 8 | Execute timer callback | 2 |

Microtasks are processed before the next task. Microtasks added while processing the microtask queue are also processed before moving to the next task.

### 3.6 Run-to-completion

Ordinary synchronous JavaScript execution follows a run-to-completion model.

A scheduled asynchronous callback cannot interrupt the currently executing synchronous code.

```javascript
setTimeout(() => {
    console.log("Timer");
}, 0);

for (let i = 0; i < 3; i++) {
    console.log(i);
}

// 0
// 1
// 2
// Timer
```

A delay of zero milliseconds does not mean immediate execution.

---

## 4. Timers

### 4.1 setTimeout()

`setTimeout()` schedules a callback to execute once after a specified minimum delay.

```javascript
setTimeout(() => {
    console.log("Executed after approximately 2 seconds");
}, 2000);
```

Syntax:

```javascript
setTimeout(callback, delay, ...arguments);
```

Additional arguments can be passed to the callback.

```javascript
setTimeout(name => {
    console.log(`Hello, ${name}`);
}, 1000, "Alex");
```

### 4.2 clearTimeout()

`clearTimeout()` cancels a scheduled timeout that has not yet executed.

```javascript
const timerId = setTimeout(() => {
    console.log("This will not execute");
}, 2000);

clearTimeout(timerId);
```

### 4.3 setInterval()

`setInterval()` repeatedly schedules a callback at a specified interval.

```javascript
let count = 0;

const intervalId = setInterval(() => {
    console.log(++count);

    if (count === 3) {
        clearInterval(intervalId);
    }
}, 1000);

// 1
// 2
// 3
```

### 4.4 Timer Accuracy

Timer delays are not guaranteed execution times.

```javascript
setTimeout(() => {
    console.log("Timer executed");
}, 1000);
```

The callback may execute later than requested because of:

- A busy call stack.
- Pending microtasks.
- Runtime scheduling.
- Browser timer throttling.

Also, `setInterval()` does not wait for asynchronous operations started by its callback to finish. This can result in overlapping operations.

### 4.5 Timer Methods

| Method | Purpose |
|---|---|
| `setTimeout()` | Schedule a one-time callback |
| `clearTimeout()` | Cancel a timeout |
| `setInterval()` | Schedule repeated callbacks |
| `clearInterval()` | Cancel an interval |
| `queueMicrotask()` | Schedule a microtask |

These are runtime-provided APIs rather than core ECMAScript language features.

---

## 5. Promises

### 5.1 Understanding Promises

A Promise is an object representing the eventual result or failure of an operation.

A Promise has three possible states:

| State | Description |
|---|---|
| Pending | Operation has not settled |
| Fulfilled | Operation completed successfully |
| Rejected | Operation failed |

```text
                 Pending
                 /     \
                /       \
               ▼         ▼
          Fulfilled    Rejected
               \         /
                \       /
                 Settled
```

Once a Promise is fulfilled or rejected, its state cannot change.

A resolved Promise is not necessarily already fulfilled. It may adopt the eventual state of another pending Promise.

### 5.2 Creating a Promise

The `Promise` constructor accepts an executor function with two parameters: `resolve` and `reject`.

```javascript
const promise = new Promise((resolve, reject) => {
    const success = true;

    setTimeout(() => {
        if (success) {
            resolve("Operation successful");
        } else {
            reject(new Error("Operation failed"));
        }
    }, 1000);
});
```

- `resolve(value)` resolves the Promise with a value or adopts another Promise's outcome.
- `reject(reason)` rejects the Promise with a reason.

Prefer `Error` objects as rejection reasons.

The Promise executor executes synchronously when the Promise is created.

```javascript
console.log("Start");

new Promise(resolve => {
    console.log("Executor");
    resolve();
});

console.log("End");

// Start
// Executor
// End
```

Promise reaction handlers, however, execute asynchronously as microtasks.

### 5.3 Consuming Promises

Use `.then()`, `.catch()` and `.finally()` to handle Promise outcomes.

```javascript
const promise = new Promise(resolve => {
    setTimeout(() => {
        resolve("Data received");
    }, 1000);
});

promise
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error.message);
    })
    .finally(() => {
        console.log("Operation completed");
    });
```

| Method | Purpose |
|---|---|
| `.then()` | Handle fulfillment or rejection |
| `.catch()` | Handle rejection |
| `.finally()` | Execute cleanup after settlement |

The `.finally()` callback receives neither the fulfillment value nor the rejection reason.

It normally preserves the original outcome unless the callback throws or returns a rejected Promise.

### 5.4 Promise Chaining

Each call to `.then()`, `.catch()` or `.finally()` returns a new Promise.

```javascript
Promise.resolve(10)
    .then(number => number * 2)
    .then(number => number + 5)
    .then(result => {
        console.log(result);
    });

// 25
```

Returning a Promise from a handler makes the next handler wait for that Promise's outcome.

```javascript
function doubleAsync(number) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(number * 2);
        }, 1000);
    });
}

Promise.resolve(5)
    .then(number => doubleAsync(number))
    .then(number => doubleAsync(number))
    .then(console.log);

// 20
```

This allows dependent asynchronous operations to be chained without deeply nested callbacks.

### 5.5 Error Handling in Promise Chains

Errors thrown inside Promise handlers become rejections of the Promise returned by that handler.

```javascript
Promise.resolve(10)
    .then(number => {
        if (number < 20) {
            throw new Error("Number is too small");
        }

        return number;
    })
    .then(console.log)
    .catch(error => {
        console.log(error.message);
    });

// Number is too small
```

A catch handler can recover from an error by returning a fallback value.

```javascript
Promise.reject(new Error("Failed"))
    .catch(() => {
        return "Fallback value";
    })
    .then(console.log);

// Fallback value
```

To preserve the failure, rethrow the error.

```javascript
Promise.reject(new Error("Failed"))
    .catch(error => {
        console.error(error.message);
        throw error;
    })
    .catch(error => {
        console.log("Handled:", error.message);
    });
```

### 5.6 Promise.resolve() and Promise.reject()

These static methods create or resolve Promises without manually using the Promise constructor.

```javascript
Promise.resolve("Success")
    .then(console.log);

// Success

Promise.reject(new Error("Failed"))
    .catch(error => console.log(error.message));

// Failed
```

`Promise.resolve()` can also adopt the outcome of an existing Promise or thenable object.

### 5.7 Converting Callback-based APIs to Promises

Existing callback-based APIs can be wrapped inside a Promise.

```javascript
function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

delay(1000).then(() => {
    console.log("One second completed");
});
```

Node.js commonly uses error-first callbacks in older APIs.

```javascript
import { readFile } from "node:fs";

function readTextFile(path) {
    return new Promise((resolve, reject) => {
        readFile(path, "utf8", (error, data) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(data);
        });
    });
}
```

For modern Node.js development, prefer built-in Promise-based APIs when available.

```javascript
import { readFile } from "node:fs/promises";

const content = await readFile("./example.txt", "utf8");

console.log(content);
```

Create `example.txt` before running this example.

---

## 6. Promise Combinators

Promise combinators coordinate multiple asynchronous operations.

Consider the following reusable helper:

```javascript
function task(value, ms, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`${value} failed`));
            } else {
                resolve(value);
            }
        }, ms);
    });
}
```

Use this helper for the examples in this section.

### 6.1 Promise.all()

Waits for all input Promises to fulfill.

Rejects as soon as any input Promise rejects.

```javascript
Promise.all([
    task("User", 1000),
    task("Orders", 500),
    task("Products", 1500)
])
    .then(console.log)
    .catch(console.error);

// ["User", "Orders", "Products"]
```

Results are returned in input order, not completion order.

Failure example:

```javascript
Promise.all([
    task("User", 1000),
    task("Orders", 500, true)
])
    .catch(error => {
        console.log(error.message);
    });

// Orders failed
```

Use `Promise.all()` when all results are required.

### 6.2 Promise.allSettled()

Waits for every input Promise to settle, regardless of success or failure.

```javascript
Promise.allSettled([
    task("User", 1000),
    task("Orders", 500, true)
]).then(results => {
    for (const result of results) {
        if (result.status === "fulfilled") {
            console.log(result.value);
        } else {
            console.log(result.reason.message);
        }
    }
});

// User
// Orders failed
```

Each result contains one of the following structures:

```javascript
{
    status: "fulfilled",
    value: "User"
}
```

```javascript
{
    status: "rejected",
    reason: new Error("Orders failed")
}
```

Use `Promise.allSettled()` when partial success is acceptable or when every outcome must be inspected.

### 6.3 Promise.race()

Settles with the outcome of the first input Promise to settle, whether fulfilled or rejected.

```javascript
Promise.race([
    task("First", 1000),
    task("Second", 500)
])
    .then(console.log)
    .catch(console.error);

// Second
```

Common use cases include racing an operation against a timeout.

### 6.4 Promise.any()

Fulfills with the value of the first input Promise to fulfill.

```javascript
Promise.any([
    task("Server A", 500, true),
    task("Server B", 1000),
    task("Server C", 1500)
])
    .then(console.log)
    .catch(console.error);

// Server B
```

If every input Promise rejects, `Promise.any()` rejects with an `AggregateError`.

```javascript
Promise.any([
    task("Server A", 500, true),
    task("Server B", 1000, true)
]).catch(error => {
    console.log(error.name); // AggregateError
    console.log(error.errors);
});
```

Use `Promise.any()` when only one successful result is required.

### 6.5 Promise Combinators Comparison

| Method | Fulfillment Condition | Rejection Condition |
|---|---|---|
| `Promise.all()` | All fulfill | Any rejects |
| `Promise.allSettled()` | All settle | Input rejections do not reject the combined Promise |
| `Promise.race()` | First settlement is fulfillment | First settlement is rejection |
| `Promise.any()` | Any fulfills | All reject |

Behavior with an empty iterable:

| Method | Result |
|---|---|
| `Promise.all([])` | Fulfills with `[]` |
| `Promise.allSettled([])` | Fulfills with `[]` |
| `Promise.race([])` | Remains pending |
| `Promise.any([])` | Rejects with `AggregateError` |

Promise combinators do not automatically cancel unfinished operations.

For example, if `Promise.all()` rejects because one request fails, the other requests may continue running.

---

## 7. Async/Await

`async/await` provides a cleaner syntax for working with Promises, making asynchronous code easier to read and maintain.

### 7.1 Async Functions

The `async` keyword declares an asynchronous function.

An async function always returns a Promise.

```javascript
async function greet() {
    return "Hello";
}

greet().then(console.log);

// Hello
```

Returning a regular value fulfills the returned Promise with that value.

Throwing an error rejects the returned Promise.

```javascript
async function fail() {
    throw new Error("Operation failed");
}

fail().catch(error => {
    console.log(error.message);
});
```

Async functions can be defined using different function syntaxes.

```javascript
// Function declaration
async function getData() {
    return "Data";
}

// Function expression
const getUser = async function () {
    return "User";
};

// Arrow function
const getOrders = async () => {
    return "Orders";
};

// Object method
const service = {
    async getProducts() {
        return "Products";
    }
};
```

### 7.2 Await

The `await` keyword pauses the continuation of the surrounding async function until the awaited value is available.

```javascript
function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

async function run() {
    console.log("Start");

    await delay(1000);

    console.log("Completed");
}

run();
```

If the awaited Promise fulfills, `await` produces its fulfillment value.

```javascript
async function getUser() {
    const user = await Promise.resolve({
        id: 1,
        name: "Alex"
    });

    console.log(user.name);
}

getUser();

// Alex
```

If the awaited Promise rejects, `await` throws its rejection reason.

`await` can also accept non-Promise values.

```javascript
async function run() {
    const value = await 10;

    console.log(value);
}

run();

// 10
```

Even when awaiting an ordinary value or an already fulfilled Promise, the function's continuation is scheduled asynchronously.

### 7.3 Await Does Not Block the Entire Program

```javascript
async function run() {
    console.log("2");

    await Promise.resolve();

    console.log("4");
}

console.log("1");

run();

console.log("3");

// 1
// 2
// 3
// 4
```

The async function executes synchronously until its first `await`. Its continuation is scheduled as a microtask when the awaited value is ready.

Other JavaScript code can continue executing while the async function is suspended.

### 7.4 Error Handling with Async/Await

Use `try...catch` to handle rejected Promises.

```javascript
async function getData() {
    throw new Error("Failed to load data");
}

async function run() {
    try {
        const data = await getData();

        console.log(data);
    } catch (error) {
        console.log(error.message);
    } finally {
        console.log("Operation completed");
    }
}

run();

// Failed to load data
// Operation completed
```

An error can be handled inside the async function or propagated to its caller.

```javascript
async function getData() {
    throw new Error("Failed");
}

getData().catch(error => {
    console.log(error.message);
});
```

### 7.5 Returning vs Awaiting a Promise

Both approaches allow an async function to adopt another Promise's outcome.

```javascript
async function getData() {
    return Promise.resolve("Data");
}

async function getDataWithAwait() {
    return await Promise.resolve("Data");
}
```

However, `return await` is useful when a local `try...catch` must handle the rejection.

```javascript
async function getData() {
    try {
        return await Promise.reject(
            new Error("Failed")
        );
    } catch (error) {
        return "Fallback data";
    }
}

console.log(await getData());

// Fallback data
```

Without `await` in the return statement, the rejected Promise would escape this local catch block.

### 7.6 Top-level Await

ES Modules support `await` outside async functions.

```javascript
const data = await Promise.resolve("Hello");

console.log(data);

// Hello
```

This works in our Node.js learning environment because `package.json` contains:

```json
{
    "type": "module"
}
```

Top-level `await` is also supported in browser ES Modules.

Use it carefully because dependent modules may need to wait for the asynchronous initialization to complete.

### 7.7 Promises vs Async/Await

Promise chaining:

```javascript
function getNumber() {
    return Promise.resolve(10);
}

getNumber()
    .then(number => number * 2)
    .then(console.log)
    .catch(console.error);
```

Async/await:

```javascript
function getNumber() {
    return Promise.resolve(10);
}

try {
    const number = await getNumber();

    console.log(number * 2);
} catch (error) {
    console.error(error);
}
```

| Promise Chaining | Async/Await |
|---|---|
| Uses `.then()` and `.catch()` | Uses `await` and `try...catch` |
| Functional chaining style | Sequential-looking syntax |
| Useful for direct Promise transformations | Useful for multi-step asynchronous workflows |
| Works without an async function | Requires an async function or module-level context |

Async/await does not replace Promises. It is built on top of them.

---

## 8. Asynchronous Execution Patterns

### 8.1 Sequential Execution

Operations execute one after another when each operation is awaited before starting the next.

```javascript
function task(name, ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve(name), ms);
    });
}

console.time("Sequential");

const first = await task("First", 1000);
const second = await task("Second", 1000);
const third = await task("Third", 1000);

console.log(first, second, third);

console.timeEnd("Sequential");

// Approximately 3 seconds
```

Sequential execution is necessary when an operation depends on the result of a previous operation.

```javascript
const user = await getUser();
const orders = await getOrders(user.id);
const payment = await getPayment(orders[0].id);
```

The functions above represent application-specific asynchronous APIs.

### 8.2 Concurrent Execution

Independent asynchronous operations can be started together.

```javascript
function task(name, ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve(name), ms);
    });
}

console.time("Concurrent");

const results = await Promise.all([
    task("First", 1000),
    task("Second", 1000),
    task("Third", 1000)
]);

console.log(results);

console.timeEnd("Concurrent");

// Approximately 1 second
```

The operations overlap while waiting for their results.

Concurrency does not necessarily mean that JavaScript computations execute in parallel on multiple CPU cores.

### 8.3 Sequential vs Concurrent Execution

```text
Sequential execution

Task A  ██████████
Task B            ██████████
Task C                      ██████████
        0s        1s        2s        3s


Concurrent execution

Task A  ██████████
Task B  ██████████
Task C  ██████████
        0s        1s
```

Prefer concurrent execution for independent operations when resource limits and application requirements permit it.

### 8.4 Combining Sequential and Concurrent Operations

Some workflows contain both dependent and independent operations.

```javascript
const user = await getUser();

const [orders, notifications] = await Promise.all([
    getOrders(user.id),
    getNotifications(user.id)
]);

console.log(user, orders, notifications);
```

Here:

- `getUser()` must complete first.
- Orders and notifications can be loaded concurrently because they do not depend on each other.

### 8.5 Asynchronous Loops

Consider the following helper:

```javascript
function processItem(item) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(item * 2);
        }, 500);
    });
}
```

**Sequential processing using `for...of`:**

```javascript
const items = [1, 2, 3];

for (const item of items) {
    const result = await processItem(item);

    console.log(result);
}

// 2
// 4
// 6
```

Each iteration waits for the previous operation.

**Concurrent processing using `map()` and `Promise.all()`:**

```javascript
const items = [1, 2, 3];

const results = await Promise.all(
    items.map(item => processItem(item))
);

console.log(results);

// [2, 4, 6]
```

Avoid using `forEach()` when the surrounding code must wait for asynchronous callbacks.

```javascript
// Incorrect when completion must be awaited
await items.forEach(async item => {
    await processItem(item);
});

console.log("Completed");
```

`forEach()` does not wait for the Promises returned by its callbacks.

### 8.6 Limiting Concurrency

Starting thousands of asynchronous operations simultaneously can overwhelm servers, databases or available resources.

A simple approach is processing operations in batches.

```javascript
async function processInBatches(items, batchSize) {
    if (!Number.isInteger(batchSize) || batchSize <= 0) {
        throw new RangeError("Invalid batch size");
    }

    const results = [];

    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);

        const batchResults = await Promise.all(
            batch.map(processItem)
        );

        results.push(...batchResults);
    }

    return results;
}

const results = await processInBatches(
    [1, 2, 3, 4, 5, 6],
    2
);

console.log(results);

// [2, 4, 6, 8, 10, 12]
```

Only two operations are started per batch in this example.

More advanced concurrency pools can start the next operation as soon as an existing operation finishes, rather than waiting for an entire batch.

---

## 9. Practical Asynchronous Patterns

### 9.1 Delay Utility

A reusable Promise-based delay function is useful for simulations, retries and asynchronous workflows.

```javascript
const delay = ms =>
    new Promise(resolve => setTimeout(resolve, ms));

console.log("Start");

await delay(1000);

console.log("End");
```

Unlike a synchronous busy-wait loop, this does not block the execution thread while waiting.

### 9.2 Debouncing

Debouncing delays function execution until a specified period has passed without another invocation.

Common use cases:

- Search input.
- Form validation.
- Window resizing.
- Autosaving.

```javascript
function debounce(fn, delay) {
    let timerId;

    return function (...args) {
        clearTimeout(timerId);

        timerId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

const search = debounce(query => {
    console.log("Searching:", query);
}, 500);

search("j");
search("ja");
search("jav");
search("javascript");

// Searching: javascript
```

Every new invocation resets the timer.

```text
Calls:       A    B    C    D
             │    │    │    │
             └────┴────┴────┴── wait ── Execute D
```

This implementation uses closures to preserve the timer ID and executes on the trailing edge.

### 9.3 Throttling

Throttling limits how frequently a function can execute.

Common use cases:

- Scroll events.
- Mouse movement.
- Frequent resize events.
- Limiting repeated actions.

```javascript
function throttle(fn, interval) {
    let lastExecution = -Infinity;

    return function (...args) {
        const now = performance.now();

        if (now - lastExecution >= interval) {
            lastExecution = now;

            return fn.apply(this, args);
        }
    };
}

const handleScroll = throttle(() => {
    console.log("Scroll handled");
}, 1000);

handleScroll();
handleScroll();
handleScroll();

// Scroll handled
```

This implementation executes immediately and ignores subsequent calls until the interval has passed. It does not schedule a trailing invocation.

### 9.4 Debouncing vs Throttling

| Debouncing | Throttling |
|---|---|
| Waits until calls stop | Limits execution frequency |
| Resets the waiting period on every call | Enforces a minimum interval between executions |
| Suitable for search inputs | Suitable for continuous scroll events |
| May not execute during continuous calls | Can execute periodically during continuous calls |

### 9.5 Retry Mechanism

A retry mechanism repeats a failed operation when appropriate.

```javascript
const delay = ms =>
    new Promise(resolve => setTimeout(resolve, ms));

async function retry(fn, maxAttempts = 3, baseDelay = 500) {
    if (!Number.isInteger(maxAttempts) || maxAttempts < 1) {
        throw new RangeError("Invalid attempt count");
    }

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt === maxAttempts) {
                throw error;
            }

            await delay(baseDelay * 2 ** (attempt - 1));
        }
    }
}
```

Usage:

```javascript
let attempts = 0;

async function operation() {
    attempts++;

    if (attempts < 3) {
        throw new Error("Temporary failure");
    }

    return "Success";
}

const result = await retry(operation);

console.log(result); // Success
```

The delay increases after each failure. This technique is called exponential backoff.

In real applications:

- Retry only appropriate temporary failures.
- Limit the number of attempts.
- Consider adding random jitter to retry delays.
- Avoid retrying non-idempotent operations unless duplicate execution is safely handled.

### 9.6 Timeout Pattern

`Promise.race()` can limit how long a caller waits for an operation.

```javascript
async function withTimeout(promise, ms) {
    let timerId;

    const timeout = new Promise((_, reject) => {
        timerId = setTimeout(() => {
            reject(new Error("Operation timed out"));
        }, ms);
    });

    try {
        return await Promise.race([
            promise,
            timeout
        ]);
    } finally {
        clearTimeout(timerId);
    }
}
```

Usage:

```javascript
const operation = new Promise(resolve => {
    setTimeout(() => resolve("Success"), 3000);
});

try {
    const result = await withTimeout(operation, 1000);

    console.log(result);
} catch (error) {
    console.log(error.message);
}

// Operation timed out
```

This limits the waiting time but does not cancel the underlying operation.

Actual cancellation requires cooperation from the underlying API, such as using `AbortController` with Fetch.

### 9.7 Async Iteration

The `for await...of` statement consumes asynchronous iterables.

```javascript
const delay = ms =>
    new Promise(resolve => setTimeout(resolve, ms));

async function* generateNumbers() {
    for (let i = 1; i <= 3; i++) {
        await delay(500);

        yield i;
    }
}

for await (const number of generateNumbers()) {
    console.log(number);
}

// 1
// 2
// 3
```

An async generator uses `async function*` and produces values through `yield`.

Async iteration is useful for consuming streams, paginated data and asynchronously generated sequences.

---

## 10. Common Pitfalls and Best Practices

### 10.1 Forgetting to Await a Promise

```javascript
async function getUser() {
    return { name: "Alex" };
}

// Incorrect
const user = getUser();

console.log(user.name); // undefined
```

`user` contains a Promise rather than the resolved object.

```javascript
// Correct
const user = await getUser();

console.log(user.name); // Alex
```

### 10.2 Forgetting to Return a Promise in a Chain

```javascript
// Incorrect
Promise.resolve(10)
    .then(number => {
        Promise.resolve(number * 2);
    })
    .then(console.log);

// undefined
```

```javascript
// Correct
Promise.resolve(10)
    .then(number => {
        return Promise.resolve(number * 2);
    })
    .then(console.log);

// 20
```

### 10.3 Using try...catch Without Await

A synchronous `try...catch` cannot catch a rejection that occurs asynchronously unless the Promise is awaited within the block.

```javascript
async function fail() {
    throw new Error("Failed");
}

// Incorrect
try {
    fail();
} catch (error) {
    console.log(error.message);
}
```

This can result in an unhandled Promise rejection.

```javascript
// Correct
try {
    await fail();
} catch (error) {
    console.log(error.message);
}
```

Alternatively:

```javascript
fail().catch(console.error);
```

### 10.4 Catching Errors Inside Timer Callbacks

An outer `try...catch` cannot catch an error thrown by a later timer callback.

```javascript
// Incorrect
try {
    setTimeout(() => {
        throw new Error("Failed");
    }, 1000);
} catch (error) {
    console.log(error.message);
}
```

Handle the error inside the callback.

```javascript
setTimeout(() => {
    try {
        throw new Error("Failed");
    } catch (error) {
        console.log(error.message);
    }
}, 1000);
```

Alternatively, convert the operation into a Promise and handle its rejection.

### 10.5 Using an Async Promise Executor

Avoid using an async function as the Promise constructor's executor.

```javascript
// Avoid
const promise = new Promise(async resolve => {
    const data = await getData();

    resolve(data);
});
```

The Promise constructor ignores the executor's return value. A rejection from the async executor may therefore leave the outer Promise pending and create an unhandled rejection.

If an operation already returns a Promise, use it directly.

```javascript
// Preferred
const promise = getData();
```

Or use an ordinary async function when additional processing is needed.

```javascript
async function processData() {
    const data = await getData();

    return data;
}
```

### 10.6 Unnecessary Sequential Execution

```javascript
// Slower when operations are independent
const users = await getUsers();
const products = await getProducts();
```

```javascript
// Preferred for independent operations
const [users, products] = await Promise.all([
    getUsers(),
    getProducts()
]);
```

Do not use concurrent execution when operations depend on each other or require strict ordering.

### 10.7 Swallowing Errors

```javascript
// Avoid
try {
    await performOperation();
} catch {
    // Error silently ignored
}
```

Handle the error meaningfully or propagate it.

```javascript
try {
    await performOperation();
} catch (error) {
    console.error("Operation failed:", error);

    throw error;
}
```

Avoid logging the same error repeatedly at every layer of an application.

### 10.8 Unhandled Promise Rejections

Every Promise rejection should have an appropriate handling strategy.

```javascript
async function run() {
    throw new Error("Failed");
}

// Unhandled rejection
run();
```

Handle the rejection:

```javascript
run().catch(console.error);
```

For intentionally unawaited background operations:

```javascript
void run().catch(console.error);
```

The `void` operator indicates that the returned value is intentionally discarded. It does not handle errors by itself.

### 10.9 Race Conditions

A race condition occurs when the correctness of a program depends on the unpredictable completion order of operations.

For example, an older search request may complete after a newer request and overwrite the latest search results.

```javascript
let latestRequestId = 0;

async function search(query) {
    const requestId = ++latestRequestId;

    const results = await getSearchResults(query);

    if (requestId !== latestRequestId) {
        return;
    }

    console.log(results);
}
```

Only the latest request is allowed to update the result.

Other solutions include cancellation, synchronization and controlled execution ordering.

### 10.10 Best Practices

- Prefer async/await for readable asynchronous workflows.
- Use Promise combinators to coordinate independent operations.
- Handle Promise rejections appropriately.
- Throw meaningful `Error` objects.
- Avoid unnecessary Promise wrappers.
- Avoid async Promise executors.
- Use `for...of` for sequential asynchronous iteration.
- Use `map()` with `Promise.all()` for concurrent iteration.
- Limit concurrency when processing large workloads.
- Clear unused timers.
- Avoid blocking the execution thread with expensive synchronous operations.
- Use retries and timeouts where appropriate.
- Remember that Promise rejection does not automatically cancel underlying operations.
- Handle race conditions when multiple operations update shared state.