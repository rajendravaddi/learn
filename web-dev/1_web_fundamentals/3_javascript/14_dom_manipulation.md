# DOM Manipulation and Event Handling

The Document Object Model (DOM) is a programming interface that represents an HTML document as a tree of objects.

JavaScript uses the DOM to access, modify and interact with HTML elements dynamically.

Common use cases include:

- Updating page content.
- Creating and removing elements.
- Handling user interactions.
- Managing forms and input values.
- Updating styles and CSS classes.
- Displaying data retrieved from APIs.

The DOM is a browser-provided API, not part of the core JavaScript language.

## 1. DOM Fundamentals

### 1.1 DOM Tree

Consider the following HTML document:

```html
<!DOCTYPE html>
<html>
<head>
    <title>DOM Learning</title>
</head>
<body>
    <h1>Hello JavaScript</h1>

    <div id="container">
        <p>Learning DOM manipulation</p>
        <button>Click me</button>
    </div>
</body>
</html>
```

The browser represents this document as a tree.

```text
Document
└── html
    ├── head
    │   └── title
    │       └── Text
    └── body
        ├── h1
        │   └── Text
        └── div
            ├── p
            │   └── Text
            └── button
                └── Text
```

This simplified tree omits whitespace text nodes and the document type node.

Each item in the DOM tree is a node.

### 1.2 Nodes and Elements

| Type | Description |
|---|---|
| Document | Represents the entire document |
| Element | Represents an HTML element |
| Text | Represents text inside an element |
| Comment | Represents an HTML comment |
| DocumentFragment | Lightweight container for DOM nodes |

Every element is a node, but not every node is an element.

### 1.3 Window and Document

The `window` object represents the browser window and provides access to browser APIs.

The `document` object represents the current HTML document.

```javascript
console.log(window.innerWidth);
console.log(window.innerHeight);

console.log(document.title);
console.log(document.head);
console.log(document.body);
console.log(document.documentElement);
```

| Object | Purpose |
|---|---|
| `window` | Browser window and global browser APIs |
| `document` | HTML document and DOM operations |
| `location` | Current page URL and navigation |
| `navigator` | Browser and device capabilities |
| `history` | Browser navigation history |

### 1.4 Setting Up the Learning Environment

Unlike previous topics, DOM examples must run in a browser rather than directly through Node.js.

Create the following files:

```text
dom-learning/
├── index.html
└── index.js
```

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DOM Learning</title>
</head>
<body>
    <h1 id="heading">DOM Learning</h1>

    <div id="container"></div>

    <button id="button">Click me</button>

    <script type="module" src="./index.js"></script>
</body>
</html>
```

**index.js**

```javascript
console.log(document.title);
console.log(document.body);
```

Start a local server:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` and use the browser's Developer Tools console to view the output.

Module scripts are deferred by default, allowing the HTML document to be parsed before the script executes.

---

## 2. Selecting and Traversing Elements

### 2.1 Selecting a Single Element

`querySelector()` returns the first element matching a CSS selector.

```html
<h1 id="heading">Hello</h1>
<p class="description">Learning JavaScript</p>
```

```javascript
const heading = document.querySelector("#heading");
const paragraph = document.querySelector(".description");

console.log(heading);
console.log(paragraph);
```

CSS selector examples:

```javascript
document.querySelector("h1");
document.querySelector("#heading");
document.querySelector(".description");
document.querySelector("div p");
document.querySelector('input[type="email"]');
document.querySelector("[data-id='123']");
```

If no matching element exists, `querySelector()` returns `null`.

```javascript
const element = document.querySelector("#unknown");

if (element) {
    console.log(element.textContent);
}
```

### 2.2 Selecting Multiple Elements

`querySelectorAll()` returns a static NodeList containing all matching elements.

```html
<ul>
    <li class="item">JavaScript</li>
    <li class="item">TypeScript</li>
    <li class="item">React</li>
</ul>
```

```javascript
const items = document.querySelectorAll(".item");

items.forEach(item => {
    console.log(item.textContent);
});
```

A NodeList is not an ordinary array. Convert it when array methods are required.

```javascript
const names = Array.from(items)
    .map(item => item.textContent);

console.log(names);

// ["JavaScript", "TypeScript", "React"]
```

Spread syntax can also be used.

```javascript
const itemsArray = [...items];
```

### 2.3 Other Selection Methods

| Method | Return Value |
|---|---|
| `querySelector(selector)` | First matching element or null |
| `querySelectorAll(selector)` | Static NodeList |
| `getElementById(id)` | Matching element or null |
| `getElementsByClassName(name)` | Live HTMLCollection |
| `getElementsByTagName(tag)` | Live HTMLCollection |

Prefer `querySelector()` and `querySelectorAll()` for their flexible CSS selector syntax.

`getElementById()` is also useful when selecting an element by its unique ID.

### 2.4 Static vs Live Collections

A static collection does not automatically update when matching elements are added or removed.

A live collection automatically reflects relevant DOM changes.

```html
<ul id="list">
    <li>JavaScript</li>
</ul>
```

```javascript
const staticItems = document.querySelectorAll("#list li");

const list = document.querySelector("#list");
const liveItems = list.getElementsByTagName("li");

const item = document.createElement("li");
item.textContent = "React";

list.append(item);

console.log(staticItems.length); // 1
console.log(liveItems.length);   // 2
```

The static collection still contains references to the original matching elements. Changes to those elements themselves remain visible.

### 2.5 DOM Traversal

DOM traversal allows navigation between related elements.

```html
<ul id="list">
    <li>JavaScript</li>
    <li id="current">TypeScript</li>
    <li>React</li>
</ul>
```

```javascript
const current = document.querySelector("#current");

console.log(current.parentElement);
console.log(current.previousElementSibling);
console.log(current.nextElementSibling);

const list = current.parentElement;

console.log(list.children);
console.log(list.firstElementChild);
console.log(list.lastElementChild);
```

| Property | Purpose |
|---|---|
| `parentElement` | Parent element |
| `children` | Child elements |
| `firstElementChild` | First child element |
| `lastElementChild` | Last child element |
| `nextElementSibling` | Next sibling element |
| `previousElementSibling` | Previous sibling element |
| `parentNode` | Parent node |
| `childNodes` | All child nodes, including text and comments |

Prefer element-specific properties when working with HTML elements.

### 2.6 matches(), closest() and contains()

```html
<div class="card">
    <button class="delete-button">Delete</button>
</div>
```

```javascript
const button = document.querySelector("button");
const card = document.querySelector(".card");

console.log(button.matches(".delete-button")); // true

console.log(button.closest(".card")); // div.card

console.log(card.contains(button)); // true
```

- `matches()` checks whether an element matches a CSS selector.
- `closest()` searches the element itself and its ancestors for a matching selector.
- `contains()` checks whether a node is itself or a descendant of another node.

These methods are particularly useful for event delegation.

---

## 3. Modifying DOM Elements

### 3.1 textContent, innerText and innerHTML

```html
<div id="content">
    Hello <strong>JavaScript</strong>
</div>
```

```javascript
const content = document.querySelector("#content");

console.log(content.textContent);
console.log(content.innerText);
console.log(content.innerHTML);
```

| Property | Description |
|---|---|
| `textContent` | Text content, including hidden descendant text |
| `innerText` | Text as rendered, taking layout and visibility into account |
| `innerHTML` | HTML markup inside the element |

Updating text:

```javascript
content.textContent = "Learning React";
```

Updating HTML:

```javascript
content.innerHTML = "<strong>Learning React</strong>";
```

**Security consideration:** Never insert untrusted user input or API data directly using `innerHTML`. It can introduce Cross-Site Scripting (XSS) vulnerabilities.

```javascript
const userInput = '<img src="x" onerror="alert(1)">';

// Unsafe
// content.innerHTML = userInput;

// Safe for displaying plain text
content.textContent = userInput;
```

Prefer `textContent` for plain text and DOM creation methods for dynamic elements.

### 3.2 Attributes

HTML attributes can be accessed and modified using DOM methods.

```html
<a id="link" href="https://example.com">Website</a>
```

```javascript
const link = document.querySelector("#link");

console.log(link.getAttribute("href"));

link.setAttribute("href", "https://developer.mozilla.org");
link.setAttribute("target", "_blank");
link.setAttribute("rel", "noopener noreferrer");

console.log(link.hasAttribute("target")); // true

link.removeAttribute("target");
```

| Method | Purpose |
|---|---|
| `getAttribute(name)` | Read an attribute |
| `setAttribute(name, value)` | Add or update an attribute |
| `hasAttribute(name)` | Check whether an attribute exists |
| `removeAttribute(name)` | Remove an attribute |
| `toggleAttribute(name)` | Toggle attribute presence |

### 3.3 Attributes vs Properties

Attributes represent HTML configuration, while DOM properties represent the corresponding JavaScript object state.

```html
<input id="username" value="Alex">
```

```javascript
const input = document.querySelector("#username");

input.value = "John";

console.log(input.value);                 // John
console.log(input.getAttribute("value")); // Alex
```

The attribute contains the initial value, while the property represents the current input value.

Common DOM properties:

```javascript
input.value = "Alex";
input.disabled = true;
input.required = true;
```

Boolean HTML attributes are determined by their presence, not their string value.

```javascript
input.setAttribute("disabled", "false");

console.log(input.disabled); // true

input.disabled = false;
```

Prefer DOM properties when working with current element state.

### 3.4 Custom Data Attributes

HTML `data-*` attributes store custom information associated with elements.

```html
<button
    data-user-id="101"
    data-action="delete"
>
    Delete
</button>
```

```javascript
const button = document.querySelector("button");

console.log(button.dataset.userId); // "101"
console.log(button.dataset.action); // "delete"

button.dataset.status = "active";

delete button.dataset.action;
```

Data attribute names are converted from kebab-case to camelCase.

```text
data-user-id      → dataset.userId
data-product-name → dataset.productName
```

Dataset values are strings.

```javascript
const userId = Number(button.dataset.userId);
```

Data attributes are useful for associating identifiers and actions with DOM elements.

### 3.5 Working with CSS Classes

Use `classList` to manage CSS classes.

```html
<div id="card" class="card">Product</div>
```

```javascript
const card = document.querySelector("#card");

card.classList.add("active");
card.classList.remove("active");

card.classList.toggle("selected");

console.log(card.classList.contains("selected")); // true

card.classList.replace("selected", "highlighted");
```

Multiple classes can be added or removed together.

```javascript
card.classList.add("active", "visible");
card.classList.remove("active", "visible");
```

Conditional class toggling:

```javascript
const isLoading = true;

card.classList.toggle("loading", isLoading);
```

The second argument determines whether the class should be present.

### 3.6 Working with Styles

Inline styles can be modified using the `style` property.

```javascript
const card = document.querySelector("#card");

card.style.backgroundColor = "lightblue";
card.style.padding = "16px";
card.style.borderRadius = "8px";
```

CSS property names generally use camelCase in JavaScript.

```text
background-color → backgroundColor
font-size        → fontSize
border-radius    → borderRadius
```

CSS custom properties:

```javascript
card.style.setProperty("--accent-color", "blue");

card.style.removeProperty("--accent-color");
```

To read the final computed style:

```javascript
const styles = getComputedStyle(card);

console.log(styles.backgroundColor);
console.log(styles.padding);
```

Prefer CSS classes for reusable styling and inline styles for genuinely dynamic values.

### 3.7 Showing and Hiding Elements

```javascript
const card = document.querySelector("#card");

card.hidden = true;
card.hidden = false;
```

Alternatively, toggle a CSS class.

```css
.hidden {
    display: none;
}
```

```javascript
card.classList.toggle("hidden");
```

---

## 4. Creating, Inserting and Removing Elements

### 4.1 Creating Elements

Use `document.createElement()` to create a new HTML element.

```javascript
const paragraph = document.createElement("p");

paragraph.textContent = "Learning JavaScript";
paragraph.classList.add("description");

const container = document.querySelector("#container");

container.append(paragraph);
```

Creating an element does not automatically insert it into the document.

### 4.2 Inserting Elements

```html
<div id="container">
    <p id="existing">Existing content</p>
</div>
```

```javascript
const container = document.querySelector("#container");
const existing = document.querySelector("#existing");

const heading = document.createElement("h2");
heading.textContent = "Heading";

container.prepend(heading);

const paragraph = document.createElement("p");
paragraph.textContent = "New content";

container.append(paragraph);
```

Other insertion methods:

```javascript
existing.before("Before existing element");
existing.after("After existing element");
```

| Method | Purpose |
|---|---|
| `append()` | Insert at the end of an element |
| `prepend()` | Insert at the beginning of an element |
| `before()` | Insert before an element |
| `after()` | Insert after an element |
| `appendChild()` | Append a single node |
| `insertBefore()` | Insert a node before a reference child |

`append()` and `prepend()` accept multiple nodes and strings.

Inserting an existing DOM node moves it rather than creating a copy.

### 4.3 Removing and Replacing Elements

```javascript
const paragraph = document.querySelector("p");

paragraph.remove();
```

Replacing an element:

```javascript
const oldElement = document.querySelector("#heading");

const newElement = document.createElement("h2");
newElement.textContent = "Updated heading";

oldElement.replaceWith(newElement);
```

Replacing all child elements:

```javascript
const container = document.querySelector("#container");

const paragraph = document.createElement("p");
paragraph.textContent = "New content";

container.replaceChildren(paragraph);
```

Remove all children:

```javascript
container.replaceChildren();
```

### 4.4 Cloning Elements

`cloneNode()` creates a copy of an existing node.

```javascript
const card = document.querySelector(".card");

const shallowCopy = card.cloneNode(false);
const deepCopy = card.cloneNode(true);
```

- `false` copies the node itself without descendants.
- `true` copies the node and its descendants.

Event listeners registered through `addEventListener()` are not copied.

Be careful when cloning elements with IDs because duplicate IDs should be avoided.

### 4.5 DocumentFragment

A DocumentFragment is a lightweight container for assembling multiple nodes before inserting them into the document.

```html
<ul id="list"></ul>
```

```javascript
const technologies = [
    "JavaScript",
    "TypeScript",
    "React"
];

const fragment = document.createDocumentFragment();

for (const technology of technologies) {
    const item = document.createElement("li");

    item.textContent = technology;

    fragment.append(item);
}

document.querySelector("#list").append(fragment);
```

When the fragment is inserted, its children are moved into the document.

DocumentFragment is useful for organizing multiple DOM insertions and avoiding unnecessary intermediate DOM changes.

### 4.6 HTML Template Element

The `<template>` element stores reusable HTML that is not rendered until its content is inserted into the document.

```html
<template id="card-template">
    <article class="card">
        <h2></h2>
        <p></p>
    </article>
</template>

<div id="container"></div>
```

```javascript
const template = document.querySelector("#card-template");

const fragment = template.content.cloneNode(true);

fragment.querySelector("h2").textContent = "JavaScript";
fragment.querySelector("p").textContent = "Programming language";

document.querySelector("#container").append(fragment);
```

Templates are useful for creating repeated UI structures without constructing every element manually.

---

## 5. Event Handling Fundamentals

Events represent actions or occurrences within a browser.

Examples include clicking a button, typing into an input, submitting a form and resizing a window.

### 5.1 addEventListener()

Use `addEventListener()` to register an event handler.

```html
<button id="button">Click me</button>
```

```javascript
const button = document.querySelector("#button");

button.addEventListener("click", () => {
    console.log("Button clicked");
});
```

Syntax:

```javascript
element.addEventListener(eventType, handler, options);
```

Multiple listeners can be registered for the same event.

```javascript
button.addEventListener("click", () => {
    console.log("First handler");
});

button.addEventListener("click", () => {
    console.log("Second handler");
});
```

Prefer `addEventListener()` over inline HTML event handlers such as `onclick="..."`.

### 5.2 Common Browser Events

| Category | Events |
|---|---|
| Mouse | `click`, `dblclick`, `mouseenter`, `mouseleave` |
| Pointer | `pointerdown`, `pointerup`, `pointermove` |
| Keyboard | `keydown`, `keyup` |
| Input | `input`, `change` |
| Form | `submit`, `reset` |
| Focus | `focus`, `blur`, `focusin`, `focusout` |
| Document | `DOMContentLoaded`, `visibilitychange` |
| Window | `load`, `resize`, `scroll` |
| Drag and Drop | `dragstart`, `dragover`, `drop` |

Pointer events provide a unified interface for mouse, touch and pen interactions.

For ordinary buttons, prefer the `click` event because it also supports standard keyboard activation.

### 5.3 Event Object

The browser passes an event object to the event handler.

```javascript
button.addEventListener("click", event => {
    console.log(event.type);
    console.log(event.target);
    console.log(event.currentTarget);
    console.log(event.timeStamp);
});
```

Common event properties:

| Property | Purpose |
|---|---|
| `type` | Event name |
| `target` | Element from which the event originated, subject to retargeting |
| `currentTarget` | Element whose listener is currently executing |
| `timeStamp` | Time associated with the event |
| `defaultPrevented` | Whether the default action was prevented |
| `bubbles` | Whether the event bubbles |
| `cancelable` | Whether the default action can be cancelled |

Different event types provide additional properties.

### 5.4 Mouse and Pointer Events

```javascript
document.addEventListener("pointermove", event => {
    console.log(event.clientX, event.clientY);
});
```

| Property | Purpose |
|---|---|
| `clientX`, `clientY` | Coordinates relative to the viewport |
| `pageX`, `pageY` | Coordinates relative to the document |
| `button` | Mouse or pointer button associated with the event |
| `pointerType` | Mouse, touch or pen |

### 5.5 Keyboard Events

```javascript
document.addEventListener("keydown", event => {
    console.log(event.key);
    console.log(event.code);

    if (event.key === "Escape") {
        console.log("Escape pressed");
    }
});
```

| Property | Purpose |
|---|---|
| `key` | Meaning of the pressed key |
| `code` | Physical key position |
| `ctrlKey` | Whether Ctrl is pressed |
| `shiftKey` | Whether Shift is pressed |
| `altKey` | Whether Alt is pressed |
| `metaKey` | Whether Meta is pressed |
| `repeat` | Whether the key is being held down |

Prefer `event.key` and `event.code` over deprecated properties such as `keyCode`.

### 5.6 Input and Change Events

```html
<input id="search" type="text">
```

```javascript
const input = document.querySelector("#search");

input.addEventListener("input", event => {
    console.log("Current value:", event.target.value);
});

input.addEventListener("change", event => {
    console.log("Committed value:", event.target.value);
});
```

| Event | Behavior |
|---|---|
| `input` | Fires when the user changes the input value |
| `change` | Fires when a value change is committed |

For text inputs, `change` generally fires after the value changes and the input loses focus.

For checkboxes and select elements, it generally fires when the selection changes.

Programmatically assigning `input.value` does not automatically dispatch an `input` or `change` event.

### 5.7 Focus Events

```javascript
input.addEventListener("focus", () => {
    console.log("Input focused");
});

input.addEventListener("blur", () => {
    console.log("Input lost focus");
});
```

Programmatically managing focus:

```javascript
input.focus();
input.blur();
```

`focus` and `blur` do not bubble. Use `focusin` and `focusout` when bubbling behavior is required.

---

## 6. Event Propagation and Delegation

### 6.1 Event Propagation

Events travel through the DOM tree in three phases:

1. Capturing phase — travels from ancestors toward the target.
2. Target phase — reaches the target element.
3. Bubbling phase — travels from the target toward its ancestors, if the event bubbles.

```text
          Document
              │
              ▼ Capturing
             body
              │
              ▼
             div
              │
              ▼
           button  ← Target
              │
              ▲
             div
              │
              ▲ Bubbling
             body
              │
              ▲
          Document
```

### 6.2 Event Bubbling

```html
<div id="parent">
    <button id="child">Click me</button>
</div>
```

```javascript
const parent = document.querySelector("#parent");
const child = document.querySelector("#child");

parent.addEventListener("click", () => {
    console.log("Parent clicked");
});

child.addEventListener("click", () => {
    console.log("Child clicked");
});
```

Clicking the button produces:

```text
Child clicked
Parent clicked
```

By default, event listeners on ancestors execute during the bubbling phase.

### 6.3 Event Capturing

Enable capturing using the `capture` option.

```javascript
parent.addEventListener(
    "click",
    () => {
        console.log("Parent capturing");
    },
    { capture: true }
);

child.addEventListener("click", () => {
    console.log("Child clicked");
});
```

Clicking the button produces:

```text
Parent capturing
Child clicked
```

### 6.4 target vs currentTarget

```html
<button id="button">
    <span>Click me</span>
</button>
```

```javascript
const button = document.querySelector("#button");

button.addEventListener("click", event => {
    console.log(event.target.tagName);
    console.log(event.currentTarget.tagName);
});
```

Clicking the span produces:

```text
SPAN
BUTTON
```

- `target` identifies where the event originated.
- `currentTarget` identifies where the current event listener is registered.

Use `currentTarget` when you need the element associated with the listener itself.

### 6.5 preventDefault()

`preventDefault()` prevents the browser's default action for a cancelable event.

```html
<a id="link" href="https://example.com">Visit website</a>
```

```javascript
const link = document.querySelector("#link");

link.addEventListener("click", event => {
    event.preventDefault();

    console.log("Navigation prevented");
});
```

Common use cases:

- Preventing default form submission.
- Preventing link navigation when implementing custom navigation.
- Handling certain keyboard shortcuts.

`preventDefault()` does not stop event propagation.

### 6.6 stopPropagation()

`stopPropagation()` prevents an event from continuing to other nodes along its propagation path.

```javascript
child.addEventListener("click", event => {
    event.stopPropagation();

    console.log("Child clicked");
});
```

The event will not continue bubbling to the parent.

`stopImmediatePropagation()` also prevents subsequent listeners for the same event on the current element from executing.

| Method | Purpose |
|---|---|
| `preventDefault()` | Prevent default browser action |
| `stopPropagation()` | Stop propagation to other nodes |
| `stopImmediatePropagation()` | Stop propagation and remaining listeners on the current node |

Avoid unnecessarily stopping propagation because other application features may depend on the event.

### 6.7 Event Delegation

Event delegation registers a listener on a parent element instead of registering separate listeners on every child.

```html
<ul id="list">
    <li>
        JavaScript
        <button data-action="delete">Delete</button>
    </li>
    <li>
        React
        <button data-action="delete">Delete</button>
    </li>
</ul>
```

```javascript
const list = document.querySelector("#list");

list.addEventListener("click", event => {
    if (!(event.target instanceof Element)) {
        return;
    }

    const button = event.target.closest(
        'button[data-action="delete"]'
    );

    if (!button || !list.contains(button)) {
        return;
    }

    button.closest("li")?.remove();
});
```

The parent listener handles clicks from its child buttons.

Newly added child elements are also handled automatically without registering additional listeners.

Benefits:

- Fewer event listeners.
- Support for dynamically created elements.
- Centralized event handling.
- Simplified listener cleanup.

Event delegation generally relies on event bubbling.

### 6.8 Handling Multiple Actions with Delegation

```html
<div id="actions">
    <button data-action="save">Save</button>
    <button data-action="edit">Edit</button>
    <button data-action="delete">Delete</button>
</div>
```

```javascript
const actions = {
    save: () => console.log("Saving"),
    edit: () => console.log("Editing"),
    delete: () => console.log("Deleting")
};

const container = document.querySelector("#actions");

container.addEventListener("click", event => {
    if (!(event.target instanceof Element)) {
        return;
    }

    const button = event.target.closest("[data-action]");

    if (!button || !container.contains(button)) {
        return;
    }

    const action = button.dataset.action;

    if (Object.hasOwn(actions, action)) {
        actions[action]();
    }
});
```

This pattern associates DOM elements with predefined application actions.

---

## 7. Event Listener Options and Cleanup

### 7.1 Removing Event Listeners

Use `removeEventListener()` to remove a previously registered listener.

```javascript
const button = document.querySelector("#button");

function handleClick() {
    console.log("Clicked");
}

button.addEventListener("click", handleClick);

button.removeEventListener("click", handleClick);
```

The event type, function reference and capture setting must match the original registration.

The following does not work:

```javascript
button.addEventListener("click", () => {
    console.log("Clicked");
});

button.removeEventListener("click", () => {
    console.log("Clicked");
});
```

Although the functions contain identical code, they are different function objects.

### 7.2 once Option

Automatically removes a listener after its first execution.

```javascript
button.addEventListener(
    "click",
    () => {
        console.log("Executed only once");
    },
    { once: true }
);
```

### 7.3 passive Option

A passive listener indicates that it will not call `preventDefault()`.

```javascript
window.addEventListener(
    "wheel",
    event => {
        console.log(event.deltaY);
    },
    { passive: true }
);
```

Passive listeners can help the browser handle scrolling efficiently for events such as `wheel` and `touchmove`.

Calling `preventDefault()` inside a passive listener does not cancel the default action.

### 7.4 Cleanup with AbortController

An AbortController can remove one or multiple event listeners together.

```javascript
const controller = new AbortController();

button.addEventListener(
    "click",
    () => console.log("Clicked"),
    { signal: controller.signal }
);

window.addEventListener(
    "resize",
    () => console.log("Window resized"),
    { signal: controller.signal }
);

// Remove both listeners
controller.abort();
```

This is useful when a UI component or feature registers multiple event listeners that need to be cleaned up together.

### 7.5 Event Listener Options

| Option | Purpose |
|---|---|
| `capture` | Listen during the capturing phase |
| `once` | Automatically remove after first execution |
| `passive` | Declare that the default action will not be prevented |
| `signal` | Remove the listener when the signal aborts |

### 7.6 Custom Events

JavaScript allows applications to create and dispatch custom events.

```javascript
document.addEventListener("user:login", event => {
    console.log(event.detail);
});

const event = new CustomEvent("user:login", {
    detail: {
        userId: 101,
        name: "Alex"
    }
});

document.dispatchEvent(event);
```

`CustomEvent` supports additional data through its `detail` property.

Custom events do not bubble by default. Enable bubbling when required.

```javascript
const event = new CustomEvent("item:updated", {
    detail: { id: 1 },
    bubbles: true
});
```

`dispatchEvent()` invokes applicable event listeners synchronously.

Custom events can be useful for communication between independent parts of an application.

---

## 8. Form Handling

### 8.1 Accessing Form Values

```html
<form id="register-form">
    <input name="username" type="text">

    <input name="email" type="email">

    <button type="submit">Register</button>
</form>
```

```javascript
const form = document.querySelector("#register-form");

const username = form.elements.namedItem("username");
const email = form.elements.namedItem("email");

console.log(username.value);
console.log(email.value);
```

### 8.2 Handling Form Submission

```javascript
form.addEventListener("submit", event => {
    event.preventDefault();

    const username =
        form.elements.namedItem("username").value;

    const email =
        form.elements.namedItem("email").value;

    console.log({ username, email });
});
```

Listen to the form's `submit` event instead of only listening to the submit button's click event.

This also handles normal keyboard-based form submission.

### 8.3 FormData

FormData provides a convenient way to collect form values.

```javascript
form.addEventListener("submit", event => {
    event.preventDefault();

    const formData = new FormData(form);

    console.log(formData.get("username"));
    console.log(formData.get("email"));

    const data = Object.fromEntries(formData);

    console.log(data);
});
```

Example result:

```javascript
{
    username: "Alex",
    email: "alex@example.com"
}
```

Form controls generally require a `name` attribute to be included in FormData.

Disabled controls and unchecked checkboxes are normally excluded.

For fields with multiple values, use `getAll()`.

```javascript
const selectedSkills = formData.getAll("skills");
```

`Object.fromEntries()` retains only the last value when multiple entries have the same name.

### 8.4 Checkboxes, Radio Buttons and Select Elements

**Checkbox:**

```html
<input id="terms" type="checkbox">
```

```javascript
const checkbox = document.querySelector("#terms");

console.log(checkbox.checked);

checkbox.checked = true;
```

**Radio buttons:**

```html
<input type="radio" name="role" value="developer">
<input type="radio" name="role" value="designer">
```

```javascript
const selectedRole = document.querySelector(
    'input[name="role"]:checked'
)?.value;

console.log(selectedRole);
```

**Select element:**

```html
<select id="language">
    <option value="js">JavaScript</option>
    <option value="ts">TypeScript</option>
</select>
```

```javascript
const select = document.querySelector("#language");

console.log(select.value);

select.value = "ts";
```

For a multiple-selection element:

```javascript
const values = Array.from(
    select.selectedOptions,
    option => option.value
);
```

### 8.5 File Inputs

```html
<input id="files" type="file" multiple>
```

```javascript
const input = document.querySelector("#files");

input.addEventListener("change", () => {
    const files = Array.from(input.files);

    for (const file of files) {
        console.log(file.name);
        console.log(file.size);
        console.log(file.type);
    }
});
```

The `files` property contains a FileList.

Files can be uploaded using FormData and Fetch, as covered in the previous topic.

### 8.6 Native Form Validation

HTML provides built-in validation attributes.

```html
<form id="form">
    <input
        name="username"
        required
        minlength="3"
    >

    <input
        name="email"
        type="email"
        required
    >

    <input
        name="age"
        type="number"
        min="18"
        max="100"
    >

    <button type="submit">Submit</button>
</form>
```

JavaScript validation APIs:

```javascript
const form = document.querySelector("#form");

console.log(form.checkValidity());

form.reportValidity();
```

| Method or Property | Purpose |
|---|---|
| `checkValidity()` | Check whether constraints are satisfied |
| `reportValidity()` | Check validity and display validation feedback |
| `validity` | Detailed validation state of a form control |
| `validationMessage` | Current validation error message |
| `setCustomValidity(message)` | Set a custom validation error |

Custom validation:

```javascript
const username = form.elements.namedItem("username");

username.addEventListener("input", () => {
    if (username.value.includes(" ")) {
        username.setCustomValidity(
            "Username cannot contain spaces"
        );
    } else {
        username.setCustomValidity("");
    }
});
```

An empty custom validity message clears the custom validation error.

Client-side validation improves user experience but does not replace backend validation.

### 8.7 Resetting and Submitting Forms Programmatically

```javascript
form.reset();
```

This resets form controls to their default values.

To initiate normal form submission programmatically:

```javascript
form.requestSubmit();
```

`requestSubmit()` performs constraint validation and dispatches the submit event when appropriate.

Prefer it over `form.submit()`, which bypasses normal validation and submit event handling.

### 8.8 Submitting Form Data with Fetch

```javascript
form.addEventListener("submit", async event => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        console.log("Registration successful");

        form.reset();
    } catch (error) {
        console.error(error.message);
    }
});
```

The `/api/register` endpoint represents a corresponding backend API.

---

## 9. Browser Lifecycle and DOM Measurements

### 9.1 DOMContentLoaded vs load

`DOMContentLoaded` fires after the HTML document has been parsed and deferred and module scripts have executed.

```javascript
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM ready");
});
```

The `load` event fires after the page and its dependent resources, excluding resources such as lazy-loaded images, have finished loading.

```javascript
window.addEventListener("load", () => {
    console.log("Page loaded");
});
```

| Event | Purpose |
|---|---|
| `DOMContentLoaded` | DOM is ready for manipulation |
| `load` | Page and required dependent resources have loaded |

When using a normal module script, a `DOMContentLoaded` wrapper is generally unnecessary.

### 9.2 Script Loading Strategies

```html
<script src="./index.js"></script>

<script defer src="./index.js"></script>

<script async src="./index.js"></script>

<script type="module" src="./index.js"></script>
```

| Strategy | Behavior |
|---|---|
| Regular script | Normally pauses HTML parsing while loading and executing |
| `defer` | Downloads concurrently and executes after HTML parsing |
| `async` | Downloads concurrently and executes when ready |
| `type="module"` | Loads an ES Module and its dependencies; deferred by default |

Prefer module scripts for modern JavaScript applications.

### 9.3 Element Dimensions and Position

Use `getBoundingClientRect()` to retrieve an element's dimensions and position relative to the viewport.

```javascript
const card = document.querySelector(".card");

const rect = card.getBoundingClientRect();

console.log(rect.width);
console.log(rect.height);
console.log(rect.top);
console.log(rect.left);
```

Other measurement properties:

| Property | Description |
|---|---|
| `clientWidth` | Inner width, including padding |
| `clientHeight` | Inner height, including padding |
| `offsetWidth` | Layout width, including padding and borders |
| `offsetHeight` | Layout height, including padding and borders |
| `scrollWidth` | Width of the scrollable content |
| `scrollHeight` | Height of the scrollable content |
| `scrollTop` | Current vertical scroll position |
| `scrollLeft` | Current horizontal scroll position |

### 9.4 Scrolling

Scroll the window:

```javascript
window.scrollTo({
    top: 0,
    behavior: "smooth"
});
```

Scroll an element into view:

```javascript
const section = document.querySelector("#section");

section.scrollIntoView({
    behavior: "smooth",
    block: "start"
});
```

Read the current page scroll position:

```javascript
console.log(window.scrollX);
console.log(window.scrollY);
```

Respect the user's reduced-motion preferences when implementing animated scrolling.

### 9.5 requestAnimationFrame()

`requestAnimationFrame()` schedules a callback before an upcoming browser repaint.

```javascript
const element = document.querySelector("#box");

let position = 0;

function animate() {
    position += 2;

    element.style.transform =
        `translateX(${position}px)`;

    if (position < 200) {
        requestAnimationFrame(animate);
    }
}

requestAnimationFrame(animate);
```

This simplified example moves an element by a fixed amount per frame.

For consistent animation speed across different display refresh rates, use the timestamp provided to the callback.

Prefer CSS transitions and animations for simple visual effects.

---

## 10. Practical DOM Patterns

### 10.1 Rendering Data Dynamically

A common frontend pattern is converting an array of objects into DOM elements.

```html
<ul id="users"></ul>
```

```javascript
const users = [
    { id: 1, name: "Alex" },
    { id: 2, name: "John" },
    { id: 3, name: "Emma" }
];

const list = document.querySelector("#users");

function renderUsers(users) {
    const items = users.map(user => {
        const item = document.createElement("li");

        item.dataset.id = user.id;
        item.textContent = user.name;

        return item;
    });

    list.replaceChildren(...items);
}

renderUsers(users);
```

This separates application data from its visual representation.

### 10.2 State-driven Rendering

Instead of treating the DOM as the primary source of application data, maintain state in JavaScript and update the DOM based on that state.

```html
<button id="decrement">-</button>
<span id="count">0</span>
<button id="increment">+</button>
```

```javascript
let count = 0;

const countElement = document.querySelector("#count");

function render() {
    countElement.textContent = count;
}

document.querySelector("#increment")
    .addEventListener("click", () => {
        count++;
        render();
    });

document.querySelector("#decrement")
    .addEventListener("click", () => {
        count--;
        render();
    });

render();
```

The application follows this flow:

```text
User interaction
       ↓
Event handler
       ↓
Update state
       ↓
Render UI
       ↓
Updated DOM
```

This is a foundational concept behind modern frontend frameworks such as React.

### 10.3 Debouncing Input Events

As covered in Asynchronous JavaScript, debouncing prevents a function from executing excessively during frequent user interactions.

```html
<input id="search" placeholder="Search...">
```

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

const input = document.querySelector("#search");

const search = debounce(query => {
    console.log("Searching:", query);
}, 300);

input.addEventListener("input", event => {
    search(event.target.value);
});
```

The search function executes after the user stops typing for approximately 300 milliseconds.

For actual API searches, combine debouncing with request cancellation or stale-response protection.

### 10.4 Fetching and Rendering API Data

```html
<button id="load-users">Load Users</button>

<p id="status" role="status"></p>

<ul id="users"></ul>
```

```javascript
const button = document.querySelector("#load-users");
const status = document.querySelector("#status");
const list = document.querySelector("#users");

button.addEventListener("click", async () => {
    button.disabled = true;
    status.textContent = "Loading...";
    list.replaceChildren();

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const users = await response.json();

        const items = users.map(user => {
            const item = document.createElement("li");

            item.textContent = user.name;

            return item;
        });

        list.replaceChildren(...items);

        status.textContent = `${users.length} users loaded`;
    } catch (error) {
        status.textContent = "Failed to load users";

        console.error(error);
    } finally {
        button.disabled = false;
    }
});
```

This example combines:

- DOM selection.
- Event handling.
- Fetch API.
- Async/await.
- Error handling.
- Loading, success and error states.
- Dynamic rendering.

---

## 11. DOM Performance, Accessibility and Best Practices

### 11.1 Browser Rendering Process

When displaying a webpage, the browser performs several operations.

| Stage | Description |
|---|---|
| Style calculation | Determines applicable CSS styles |
| Layout | Calculates element sizes and positions |
| Paint | Draws visual content |
| Compositing | Combines rendered layers for display |

DOM and CSS changes may trigger some of these operations.

Frequent unnecessary updates can affect application performance.

### 11.2 Avoiding Layout Thrashing

Reading layout measurements immediately after changing styles can force the browser to perform synchronous layout calculations.

```javascript
// Avoid alternating layout reads and writes unnecessarily
for (const item of items) {
    item.style.width = `${container.offsetWidth}px`;
}
```

Prefer grouping reads and writes when possible.

```javascript
const width = container.offsetWidth;

for (const item of items) {
    item.style.width = `${width}px`;
}
```

Additional performance considerations:

- Avoid unnecessary DOM queries inside loops.
- Group related DOM updates.
- Use event delegation where appropriate.
- Debounce or throttle expensive frequent handlers.
- Avoid unnecessarily rebuilding large DOM trees.
- Use `requestAnimationFrame()` for frame-based visual updates.

### 11.3 Accessibility

Use semantic HTML elements whenever possible.

```html
<!-- Avoid -->
<div class="button">Submit</div>

<!-- Prefer -->
<button type="button">Submit</button>
```

Native buttons provide keyboard interaction, focus behavior and accessibility semantics.

Associate form labels with their inputs.

```html
<label for="email">Email</label>
<input id="email" type="email">
```

Keep accessibility state synchronized with visual state.

```html
<button
    id="toggle"
    aria-expanded="false"
    aria-controls="panel"
>
    Toggle panel
</button>

<div id="panel" hidden>
    Panel content
</div>
```

```javascript
const button = document.querySelector("#toggle");
const panel = document.querySelector("#panel");

button.addEventListener("click", () => {
    panel.hidden = !panel.hidden;

    button.setAttribute(
        "aria-expanded",
        String(!panel.hidden)
    );
});
```

Accessibility considerations:

- Support keyboard navigation.
- Use native interactive elements.
- Provide meaningful labels.
- Maintain visible focus indicators.
- Manage focus appropriately when displaying dialogs.
- Communicate important dynamic status updates.
- Avoid relying exclusively on mouse interactions.

### 11.4 Security Considerations

- Avoid inserting untrusted data using `innerHTML`.
- Prefer `textContent` for displaying user-provided text.
- Validate dynamic URLs before assigning them to navigation-related attributes.
- Use a trusted HTML sanitizer when rendering untrusted HTML is necessary.
- Never treat hidden DOM elements as secure storage.
- Never rely solely on client-side validation or authorization.

### 11.5 Common Mistakes

**Accessing a missing element**

```javascript
// May throw if the element does not exist
document.querySelector("#unknown").textContent = "Hello";
```

```javascript
const element = document.querySelector("#unknown");

if (element) {
    element.textContent = "Hello";
}
```

**Invoking a handler instead of passing it**

```javascript
// Incorrect
button.addEventListener("click", handleClick());

// Correct
button.addEventListener("click", handleClick);
```

**Using target when currentTarget is required**

```javascript
button.addEventListener("click", event => {
    event.currentTarget.disabled = true;
});
```

**Using array methods directly on a NodeList**

```javascript
const elements = document.querySelectorAll(".item");

// Incorrect
// elements.map(element => element.textContent);

// Correct
const values = [...elements]
    .map(element => element.textContent);
```

**Forgetting event listener cleanup**

```javascript
const controller = new AbortController();

window.addEventListener("resize", handleResize, {
    signal: controller.signal
});

// When the feature is no longer needed
controller.abort();
```

**Assuming async event handlers are automatically awaited**

```javascript
button.addEventListener("click", async () => {
    try {
        await performOperation();
    } catch (error) {
        console.error(error);
    }
});
```

The browser does not wait for the Promise returned by an async event listener. Handle its asynchronous errors explicitly.

### 11.6 Best Practices

- Prefer modern DOM selection and manipulation APIs.
- Use `addEventListener()` for event registration.
- Use event delegation for dynamic collections.
- Prefer CSS classes over repeated inline styling.
- Keep application state separate from DOM representation.
- Clean up long-lived event listeners and timers.
- Handle asynchronous errors inside event handlers.
- Use semantic HTML and accessible interaction patterns.
- Avoid unnecessary direct DOM manipulation when using frontend frameworks.

---

## 12. DOM Manipulation in Modern Frontend Frameworks

Libraries such as React provide a declarative approach to building user interfaces.

### 12.1 Imperative vs Declarative UI

**Imperative JavaScript:**

```javascript
let count = 0;

const button = document.querySelector("#button");

button.addEventListener("click", () => {
    count++;

    button.textContent = `Count: ${count}`;
});
```

The developer explicitly describes how to update the DOM.

**Declarative React:**

```jsx
import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(c => c + 1)}>
            Count: {count}
        </button>
    );
}
```

The developer describes what the UI should look like for the current state. React manages the necessary DOM updates.

### 12.2 Why DOM Knowledge Still Matters

Even when using React, DOM knowledge remains important for:

- Understanding browser events.
- Managing focus and accessibility.
- Working with form elements.
- Measuring element dimensions.
- Handling scrolling.
- Integrating third-party libraries.
- Using React refs.
- Understanding rendering performance.
- Debugging browser behavior.

Avoid manually modifying DOM elements managed by React unless there is a specific requirement.
