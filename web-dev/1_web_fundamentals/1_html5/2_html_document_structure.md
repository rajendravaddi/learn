# HTML Document Structure

## 1. Introduction to HTML Document Structure

HTML document structure refers to the standard arrangement of HTML elements used to create a webpage.

Every HTML document follows a basic structure that helps browsers understand and display webpage content correctly.

A standard HTML5 document contains the following elements:

- `<!DOCTYPE html>`
- `<html>`
- `<head>`
- `<meta>`
- `<title>`
- `<body>`

## 2. Basic HTML5 Document Structure

### Example

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>My First Website</title>
</head>

<body>

    <h1>Welcome to HTML5</h1>

    <p>This is my first webpage.</p>

</body>

</html>
```

### Explanation of Each Element

### A. DOCTYPE Declaration

```html
<!DOCTYPE html>
```

- It tells the browser that the document uses HTML5.
- It helps the browser render the page in standards mode.
- It is written at the beginning of an HTML document.
- It is a declaration, not an HTML element or tag.

### B. HTML Element

```html
<html lang="en">
    ...
</html>
```

- The `<html>` element is the root element of an HTML document.
- All other HTML elements are placed inside it, except the DOCTYPE declaration.
- The `lang` attribute specifies the primary language of the document.
- `lang="en"` indicates that the document is written in English.

### C. HEAD Element

```html
<head>
    ...
</head>
```

The `<head>` element contains metadata and references to resources used by the webpage.

Metadata is information about the webpage that is generally not displayed as the main page content.

Common elements inside `<head>` include:

- `<title>`
- `<meta>`
- `<link>`
- `<style>`
- `<script>`

Example:

```html
<head>
    <title>My Website</title>

    <meta charset="UTF-8">

    <link rel="stylesheet" href="style.css">
</head>
```

### D. META Element

The `<meta>` element provides metadata about an HTML document.

It is a void element and is placed inside the `<head>` section.

**1. Character Encoding**

```html
<meta charset="UTF-8">
```

- Specifies the character encoding used by the document.
- UTF-8 supports a wide range of characters and symbols.
- Helps browsers display text correctly.

**2. Viewport Meta Tag**

```html
<meta name="viewport"
      content="width=device-width, initial-scale=1.0">
```

This tag helps make webpages responsive on mobile devices.

Explanation:

- `width=device-width`: Sets the viewport width to the device's screen width.
- `initial-scale=1.0`: Sets the initial zoom level to 100%.

Without a proper viewport setting, mobile browsers may render a page using a wider virtual layout, making content appear too small.

**3. Description Meta Tag**

```html
<meta name="description"
      content="Learn HTML, CSS and JavaScript.">
```

- Provides a short description of the webpage.
- Search engines may use this description in search results.
- Helps describe the page's content.

**4. Author Meta Tag**

```html
<meta name="author" content="Raj">
```

Specifies the author of the webpage.

### E. TITLE Element

```html
<title>My First Website</title>
```

- Defines the title of the webpage.
- Appears in the browser tab.
- Helps users identify the page.
- Can also be used as the title of a search result.

Important: The `<title>` element belongs inside the `<head>` section, not inside the `<body>` section.

### F. BODY Element

```html
<body>
    <h1>Welcome</h1>
    <p>This is my webpage.</p>
</body>
```

The `<body>` element contains the visible content of the webpage.

Examples of content inside the body:

- Headings
- Paragraphs
- Images
- Links
- Lists
- Tables
- Forms
- Videos
- Navigation menus

Usually, the document has one `<body>` element.

## 3. Other Important Elements Inside HEAD

### A. LINK Element

The `<link>` element connects external resources to the HTML document.

It is commonly used to connect CSS files.

```html
<link rel="stylesheet" href="style.css">
```

Explanation:

- `rel="stylesheet"` specifies the relationship between the current document and the linked file.
- `href="style.css"` specifies the location of the CSS file.

### B. STYLE Element

The `<style>` element is used to write internal CSS.

```html
<head>
    <style>
        h1 {
            color: blue;
        }

        p {
            font-size: 18px;
        }
    </style>
</head>
```

This CSS changes the color of headings and the font size of paragraphs.

### C. SCRIPT Element

The `<script>` element is used to include or write JavaScript.

**Internal JavaScript:**

```html
<script>
    console.log("Hello HTML!");
</script>
```

**External JavaScript:**

```html
<script src="script.js" defer></script>
```

- `src` specifies the external JavaScript file.
- `defer` tells the browser to execute the script after HTML parsing is complete, before the `DOMContentLoaded` event.

## 4. Parent-Child Relationships in HTML

HTML elements can contain other elements.

This creates a parent-child relationship.

Example:

```html
<html>
    <head>
        <title>My Website</title>
    </head>

    <body>
        <div>
            <h1>Welcome</h1>
            <p>Hello World</p>
        </div>
    </body>
</html>
```

Relationships:

- `<html>` is the parent of `<head>` and `<body>`.
- `<head>` is the parent of `<title>`.
- `<body>` is the parent of `<div>`.
- `<div>` is the parent of `<h1>` and `<p>`.

These relationships form the document tree, commonly called the DOM (Document Object Model).

## 5. What is DOM?

DOM stands for Document Object Model.

The DOM is a programming interface that represents an HTML document as a tree of objects.

JavaScript can use the DOM to access, modify, add, and remove webpage elements.

Example HTML:

```html
<body>
    <h1 id="heading">Hello World</h1>
</body>
```

JavaScript:

```javascript
document.getElementById("heading").textContent =
    "Welcome to HTML5";
```

Here:
- `document` represents the current document.
- `getElementById()` selects an element using its ID.
- `textContent` changes the text inside the selected element.

## 6. How Does a Browser Process HTML?

When a browser receives an HTML document, it generally performs these steps:

1. Downloads or receives the HTML document.
2. Parses the HTML markup.
3. Builds the DOM tree.
4. Loads and processes CSS resources.
5. Calculates styles and layout.
6. Paints and displays the webpage.

JavaScript can also interact with the document during this process.

The browser uses the DOM and CSS information to render the webpage.

## 7. HTML Boilerplate

An HTML boilerplate is a basic reusable HTML document structure.

Developers use it as a starting point when creating new webpages.

### Standard HTML5 Boilerplate

```html
<!DOCTYPE html>
<html lang="en">

<head>

    <!-- Character encoding -->
    <meta charset="UTF-8">

    <!-- Responsive viewport -->
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <!-- Page description -->
    <meta name="description"
          content="My first HTML website">

    <!-- Page title -->
    <title>My Website</title>

    <!-- External CSS -->
    <link rel="stylesheet" href="style.css">

    <!-- External JavaScript -->
    <script src="script.js" defer></script>

</head>

<body>

    <header>
        <h1>My Website</h1>
    </header>

    <main>
        <h2>Welcome</h2>
        <p>This is my first webpage.</p>
    </main>

    <footer>
        <p>Copyright 2026</p>
    </footer>

</body>

</html>
```

### Why do we use HTML Boilerplate?

- Provides a consistent document structure.
- Saves development time.
- Includes important metadata.
- Supports responsive design.
- Provides a standard starting point for web development.

## 8. Difference Between HEAD and BODY

| HEAD | BODY |
|---|---|
| Contains metadata and resource references. | Contains webpage content. |
| Generally not visible as page content. | Contains visible page content. |
| Includes title, meta, link, style, etc. | Includes headings, paragraphs, images, forms, etc. |
| Helps describe and configure the document. | Defines the content presented to users. |
