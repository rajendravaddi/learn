# Modules

Modules allow JavaScript applications to be divided into separate, reusable files. Each module can define its own variables, functions and classes, and explicitly share them with other modules.

Modern JavaScript uses ECMAScript Modules (ES Modules or ESM), introduced in ES6, through the `import` and `export` keywords.

**Benefits:**

- Better code organization and maintainability.
- Reusable functions, classes and constants.
- Independent module scope.
- Explicit dependencies between files.
- Separation of responsibilities.

## 1. Named and Default Exports

### 1.1 Named Exports and Imports

Named exports allow a module to export multiple values using their names.

**math.js**

```javascript
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}
```

**index.js**

```javascript
import { PI, add, subtract } from "./math.js";

console.log(PI);             // 3.14159
console.log(add(10, 5));      // 15
console.log(subtract(10, 5)); // 5
```

Exports can also be declared together at the end of a module.

```javascript
const PI = 3.14159;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

export { PI, add, subtract };
```

Named imports must match the exported names unless aliases are used.

### 1.2 Default Exports and Imports

A module can have one default export, representing its primary functionality.

**calculator.js**

```javascript
export default function multiply(a, b) {
    return a * b;
}
```

**index.js**

```javascript
import multiply from "./calculator.js";

console.log(multiply(10, 5)); // 50
```

Unlike named imports, default imports can use any valid variable name.

```javascript
import calculate from "./calculator.js";

console.log(calculate(10, 5)); // 50
```

Classes, objects, functions and other values can be exported as default.

```javascript
export default class User {
    constructor(name) {
        this.name = name;
    }
}
```

### 1.3 Combining Named and Default Exports

A module can contain both named exports and a default export.

**config.js**

```javascript
export const API_VERSION = "v1";
export const TIMEOUT = 5000;

const config = {
    baseURL: "https://api.example.com",
    environment: "development"
};

export default config;
```

**index.js**

```javascript
import config, { API_VERSION, TIMEOUT } from "./config.js";

console.log(config.baseURL);
console.log(API_VERSION); // v1
console.log(TIMEOUT);     // 5000
```

### 1.4 Named vs Default Exports

| Feature | Named Export | Default Export |
|---|---|---|
| Exports per module | Multiple | One |
| Export syntax | `export const value = 10` | `export default value` |
| Import syntax | `import { value }` | `import value` |
| Import name | Must match or use alias | Any valid name |
| Common usage | Utilities, constants, multiple functions | Primary class, component or function |

Prefer named exports for collections of reusable utilities and default exports when a module has one clear primary responsibility.

---

## 2. Import and Export Patterns

### 2.1 Import and Export Aliases

The `as` keyword allows exported or imported values to be renamed.

**math.js**

```javascript
function add(a, b) {
    return a + b;
}

export { add as sum };
```

**index.js**

```javascript
import { sum as calculateSum } from "./math.js";

console.log(calculateSum(10, 20)); // 30
```

Aliases are useful for resolving naming conflicts and improving clarity.

### 2.2 Namespace Imports

A namespace import provides access to all exports through a single module namespace object.

```javascript
import * as math from "./math.js";

console.log(math.PI);
console.log(math.add(10, 5));
console.log(math.subtract(10, 5));
```

If the module has a default export, it is accessible through `math.default`.

Namespace imports are useful when several related exports are needed from the same module.

### 2.3 Re-exporting

Re-exporting allows a module to expose exports from other modules without explicitly importing them first.

Consider the following structure:

```text
project/
├── index.js
└── utils/
    ├── math.js
    ├── string.js
    └── index.js
```

**utils/math.js**

```javascript
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;
```

**utils/string.js**

```javascript
export const capitalize = text =>
    text.charAt(0).toUpperCase() + text.slice(1);
```

**utils/index.js**

```javascript
export { add, multiply } from "./math.js";
export { capitalize } from "./string.js";
```

**index.js**

```javascript
import { add, capitalize } from "./utils/index.js";

console.log(add(10, 20));          // 30
console.log(capitalize("hello"));  // Hello
```

Other re-export patterns:

```javascript
// Re-export all named exports
export * from "./math.js";

// Re-export with an alias
export { add as sum } from "./math.js";

// Re-export a default export as a named export
export { default as Calculator } from "./calculator.js";

// Re-export a default export as default
export { default } from "./calculator.js";
```

`export *` does not re-export the default export.

A file that consolidates exports from multiple modules is commonly called a **barrel file**.

### 2.4 Side-effect Imports

A module can be imported without importing any of its exported values.

**setup.js**

```javascript
console.log("Application initialized");
```

**index.js**

```javascript
import "./setup.js";
```

This executes the module's top-level code.

Common use cases include application initialization, polyfills and registering global behavior.

---

## 3. Module Behavior

### 3.1 Module Scope

Variables, functions and classes declared inside a module are scoped to that module unless explicitly exported.

**auth.js**

```javascript
const users = ["Alex", "John"];

function normalize(name) {
    return name.trim().toLowerCase();
}

export function userExists(name) {
    return users.some(
        user => normalize(user) === normalize(name)
    );
}
```

**index.js**

```javascript
import { userExists } from "./auth.js";

console.log(userExists("alex")); // true

// users and normalize are not directly accessible here.
```

This provides encapsulation without requiring classes or closure-based factory functions.

### 3.2 Live Bindings

ES Module imports are live, read-only bindings to exported values.

When an exported variable changes inside its original module, importing modules observe the updated value.

**counter.js**

```javascript
export let count = 0;

export function increment() {
    count++;
}
```

**index.js**

```javascript
import { count, increment } from "./counter.js";

console.log(count); // 0

increment();
increment();

console.log(count); // 2

// Invalid — TypeError
// count = 10;
```

Imported bindings cannot be reassigned by the importing module.

However, if an imported value is an object, its properties may still be mutable unless the object itself is protected.

### 3.3 Module Execution and Shared State

A module is normally evaluated once per module identity within the same module-loading environment.

Multiple modules importing the same module share its exported state.

**store.js**

```javascript
let count = 0;

export function increment() {
    return ++count;
}

export function getCount() {
    return count;
}
```

**feature.js**

```javascript
import { increment } from "./store.js";

export function run() {
    increment();
}
```

**index.js**

```javascript
import { run } from "./feature.js";
import { getCount } from "./store.js";

run();
run();

console.log(getCount()); // 2
```

Both files interact with the same module state.

This behavior is useful for shared configuration, application state and reusable service instances.

### 3.4 Strict Mode and Module Rules

ES Modules automatically execute in strict mode.

Important characteristics:

- Top-level declarations belong to module scope.
- Top-level `this` is `undefined`.
- Static imports and exports must appear at the module's top level.
- Imported bindings cannot be reassigned.
- Modules support top-level `await`.
- Static imports are resolved and linked before module execution.

```javascript
console.log(this); // undefined

// Invalid static import
// if (condition) {
//     import { add } from "./math.js";
// }
```

For conditional imports, use dynamic imports.

---

## 4. Dynamic Imports

### 4.1 Dynamic import()

Static imports declare dependencies before module execution.

Dynamic imports allow modules to be loaded on demand using `import()`.

**math.js**

```javascript
export function add(a, b) {
    return a + b;
}
```

**index.js**

```javascript
const math = await import("./math.js");

console.log(math.add(10, 20)); // 30
```

`import()` returns a Promise that resolves to a module namespace object.

Promises and `async/await` will be covered in the next topic.

### 4.2 Conditional Module Loading

Dynamic imports can be used inside conditions and functions.

```javascript
const enableCalculator = true;

if (enableCalculator) {
    const { add } = await import("./math.js");

    console.log(add(10, 20)); // 30
}
```

Accessing a dynamically imported default export:

```javascript
const { default: Calculator } =
    await import("./calculator.js");
```

Common use cases:

- Lazy loading features.
- Loading optional functionality.
- Loading modules based on application conditions.
- Code splitting with bundlers.
- Reducing initial application bundle size when supported by build tooling.

### 4.3 Static vs Dynamic Imports

| Feature | Static Import | Dynamic Import |
|---|---|---|
| Syntax | `import { add } from "./math.js"` | `import("./math.js")` |
| Loading | Part of the static dependency graph | On demand |
| Placement | Module top level | Inside functions, conditions or module top level |
| Return value | Imported bindings | Promise of a module namespace |
| Module path | String literal | Can be a runtime expression |
| Common usage | Required dependencies | Optional or lazy-loaded dependencies |

Prefer static imports by default and dynamic imports when on-demand loading is required.

---

## 5. Using Modules in Node.js and Browsers

### 5.1 ES Modules in Node.js

Node.js supports ES Modules natively.

For `.js` files, explicitly configure the project as an ES Module project in `package.json`.

```json
{
    "name": "javascript-learning",
    "version": "1.0.0",
    "type": "module"
}
```

This can also be configured using:

```bash
npm pkg set type=module
```

We have already configured this in our JavaScript learning environment.

**math.js**

```javascript
export const add = (a, b) => a + b;
```

**index.js**

```javascript
import { add } from "./math.js";

console.log(add(10, 20)); // 30
```

Run the application:

```bash
node index.js
```

Node.js module file extensions:

| Extension | Module System |
|---|---|
| `.js` | Explicitly controlled by the nearest package.json `type` setting; modern Node.js can also detect module syntax in ambiguous files |
| `.mjs` | ES Module |
| `.cjs` | CommonJS |

Prefer `.js` with `"type": "module"` for modern JavaScript projects.

### 5.2 Importing Local, Built-in and External Modules

```javascript
// Local module
import { add } from "./math.js";

// Node.js built-in module
import { readFile } from "node:fs/promises";

// External npm package
import express from "express";
```

External packages must be installed before they can be imported.

```bash
npm install express
```

Common import paths:

| Path | Meaning |
|---|---|
| `./math.js` | File in the current directory |
| `../utils/math.js` | File relative to the parent directory |
| `node:fs/promises` | Node.js built-in module |
| `express` | Package resolved through Node.js package resolution |

Native Node.js ES Modules require explicit file extensions for relative file imports.

Build tools such as Vite may support additional import conventions.

### 5.3 ES Modules in Browsers

Use `type="module"` in the HTML script element.

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>JavaScript Modules</title>
</head>
<body>
    <script type="module" src="./index.js"></script>
</body>
</html>
```

**math.js**

```javascript
export const add = (a, b) => a + b;
```

**index.js**

```javascript
import { add } from "./math.js";

console.log(add(10, 20)); // 30
```

Serve the files through a local HTTP server rather than opening the HTML file directly using `file://`.

For example, if Python is installed:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` in the browser.

Browser modules:

- Automatically use strict mode.
- Are deferred by default when loaded through a module script without `async`.
- Support static and dynamic imports.
- Follow CORS restrictions for cross-origin module loading.
- Require import maps or build tooling to resolve bare package names such as `react`.

---

## 6. ES Modules vs CommonJS

CommonJS is an older module system widely used in Node.js applications.

It uses `require()` and `module.exports` instead of `import` and `export`.

### 6.1 CommonJS Example

**math.cjs**

```javascript
function add(a, b) {
    return a + b;
}

module.exports = { add };
```

**index.cjs**

```javascript
const { add } = require("./math.cjs");

console.log(add(10, 20)); // 30
```

Equivalent ES Module syntax:

**math.js**

```javascript
export function add(a, b) {
    return a + b;
}
```

**index.js**

```javascript
import { add } from "./math.js";

console.log(add(10, 20)); // 30
```

### 6.2 Comparison

| Feature | ES Modules | CommonJS |
|---|---|---|
| Export syntax | `export` | `module.exports` |
| Import syntax | `import` | `require()` |
| Native environment | Modern browsers and Node.js | Node.js |
| Static dependency analysis | Supported by design | More limited |
| Dynamic loading | `import()` | `require()` or `import()` |
| Top-level await | Supported | Not supported |
| Strict mode | Automatic | Not automatic |
| Tree shaking | Generally easier for build tools | Generally more difficult |

Tree shaking is a build-time optimization that removes unused code from application bundles.

Prefer ES Modules for new projects. CommonJS is mainly important for understanding existing Node.js codebases and package compatibility.

---

## 7. Best Practices and Common Pitfalls

### 7.1 Circular Dependencies

A circular dependency occurs when two or more modules depend on each other.

```text
user.js → auth.js → user.js
```

ES Modules support circular dependencies, but accessing an imported binding before it has been initialized can cause a `ReferenceError`.

A common solution is to move shared functionality into a separate module.

```text
user.js ──→ shared.js
auth.js ──→ shared.js
```

Avoid unnecessary circular dependencies to keep modules predictable and maintainable.

### 7.2 Best Practices

- Keep each module focused on a clear responsibility.
- Export only functionality required by other modules.
- Prefer named exports for reusable utilities.
- Use consistent naming and file organization.
- Prefer static imports unless dynamic loading is necessary.
- Avoid unnecessary side effects during module initialization.
- Avoid excessive barrel files and circular dependencies.
- Use ES Modules for modern JavaScript projects.
- Avoid mixing module systems unnecessarily.

### 7.3 Quick Reference

| Operation | Syntax |
|---|---|
| Named export | `export const value = 10` |
| Multiple exports | `export { add, subtract }` |
| Default export | `export default Calculator` |
| Named import | `import { add } from "./math.js"` |
| Default import | `import Calculator from "./calculator.js"` |
| Combined import | `import config, { TIMEOUT } from "./config.js"` |
| Import alias | `import { add as sum } from "./math.js"` |
| Export alias | `export { add as sum }` |
| Namespace import | `import * as math from "./math.js"` |
| Named re-export | `export { add } from "./math.js"` |
| Re-export all named exports | `export * from "./math.js"` |
| Default re-export as named | `export { default as User } from "./user.js"` |
| Side-effect import | `import "./setup.js"` |
| Dynamic import | `await import("./math.js")` |
| Browser module | `<script type="module" src="./index.js"></script>` |
| Node.js ESM configuration | `"type": "module"` |
| CommonJS import | `const math = require("./math.cjs")` |
| CommonJS export | `module.exports = { add }` |
