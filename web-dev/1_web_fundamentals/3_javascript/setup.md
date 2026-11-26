# JavaScript Development Setup

## 1. Introduction

JavaScript can run in two main environments:

- **Browser:** Used for building interactive websites and manipulating web pages.
- **Node.js:** Used for running JavaScript outside the browser, directly in the terminal, and building backend applications.

For learning JavaScript fundamentals, we will use Node.js. When we reach DOM manipulation, we will switch to the browser.

## 2. Install Node.js

Node.js is a JavaScript runtime environment that allows us to execute JavaScript code outside the browser.

Official website: https://nodejs.org/en/download

Install the latest **LTS (Long-Term Support)** version of Node.js.

LTS versions are recommended because they provide stability and long-term support.

### Installation on Linux (Recommended)

Use NVM (Node Version Manager) to install and manage Node.js versions.

NVM official repository: https://github.com/nvm-sh/nvm

Install NVM by following the installation instructions in its official repository.

Restart your terminal after installation.

Verify NVM installation:

```bash
nvm --version
```

Install the latest LTS version of Node.js:

```bash
nvm install --lts
```

Use the LTS version:

```bash
nvm use --lts
```

## 3. Verify Installation

Check the Node.js version:

```bash
node --version
```

Check the npm version:

```bash
npm --version
```

Both commands should display their respective version numbers.

**npm (Node Package Manager)** is used to install and manage JavaScript packages and dependencies. It comes bundled with standard Node.js installations.


## 4. Create a JavaScript Workspace

Open the terminal and execute:

```bash
mkdir javascript-learning
cd javascript-learning
```

## 5. Initialize the Project

Execute:

```bash
npm init -y
```

This creates a `package.json` file containing project metadata and configuration.

Enable modern ES Modules:

```bash
npm pkg set type=module
```

This adds the following property to `package.json`:

```json
"type": "module"
```

It allows us to use modern `import` and `export` syntax in JavaScript files with the `.js` extension.

Initializing an npm project is not mandatory for running basic JavaScript, but it prepares our workspace for modern web development.

## 6. Write Your First JavaScript Program

Create a file named `index.js`.

Folder structure:

```text
javascript-learning/
├── package.json
└── index.js
```

Inside `index.js`, write:

```javascript
console.log("Hello, JavaScript!");
```

The `console.log()` method prints values to the terminal.

## 7. Run JavaScript in the Terminal

Execute:

```bash
node index.js
```

Output:

```text
Hello, JavaScript!
```

Whenever you modify your JavaScript file, save it and execute the command again.

## 8. Automatically Run Code on File Changes

Modern Node.js provides a built-in watch mode.

```bash
node --watch index.js
```

Node.js automatically restarts the program whenever the file changes.

Press `Ctrl + C` to stop execution.

No additional packages such as Nodemon are required for basic watch functionality.

## 9. JavaScript REPL

Node.js also allows us to execute JavaScript directly in the terminal without creating a file.

Execute:

```bash
node
```

Enter JavaScript expressions:

```javascript
2 + 3
```

Output:

```text
5
```

```javascript
console.log("Learning JavaScript");
```

Output:

```text
Learning JavaScript
```

This interactive environment is called REPL (Read-Eval-Print Loop).

To exit:

```text
.exit
```

The REPL is useful for quickly testing JavaScript expressions and experimenting with concepts.

## 10. Practice

Create a file named `practice.js`.

Write the following code:

```javascript
console.log("I am learning JavaScript");
console.log(10 + 20);
console.log(10 * 5);
console.log("Welcome to Web Development");
```

Execute:

```bash
node practice.js
```

Expected output:

```text
I am learning JavaScript
30
50
Welcome to Web Development
```
