# HTML Introduction and HTML Tags

## 1. What is HTML?

HTML stands for **HyperText Markup Language**.

HTML is the standard markup language used to create and structure web pages. It tells the browser how to organize and display content such as headings, paragraphs, images, links, tables, and forms.

HTML is not a programming language because it does not contain programming logic like loops, conditions, or functions. Instead, it uses predefined elements and tags to structure content.

### Why do we use HTML?

- To create the structure of web pages.
- To display text, images, videos, and links.
- To create forms and tables.
- To organize webpage content.
- To provide a foundation for CSS and JavaScript.

### Technologies used in frontend development

| Technology | Purpose |
|---|---|
| HTML | Defines the structure of a webpage. |
| CSS | Controls the styling and layout. |
| JavaScript | Adds interactivity and dynamic behavior. |

## 2. What is HTML5?

HTML5 is the fifth major version of HTML and introduced modern features for building web applications.

### Important HTML5 features

1. Semantic elements such as `<header>`, `<footer>`, `<nav>`, and `<article>`.
2. Audio and video support using `<audio>` and `<video>`.
3. New form input types such as email, date, number, and range.
4. Built-in form validation.
5. Graphics support using Canvas and SVG.
6. Improved support for modern web applications.

## 3. What are HTML Tags?

HTML tags are predefined keywords enclosed within angle brackets that tell the browser how to structure or interpret content.

Example:

```html
<h1>Hello World</h1>
```

Here:
- `<h1>` is the opening tag.
- `Hello World` is the content.
- `</h1>` is the closing tag.

Together, the opening tag, content, and closing tag form an HTML element.

### Basic HTML Element Structure

```html
<tagname>Content</tagname>
```

## 4. Types of HTML Tags

HTML elements can be broadly classified into two categories.

### A. Paired Tags (Container Elements)

Paired tags have both opening and closing tags. They wrap around content.

Examples:

```html
<h1>Welcome</h1>

<p>This is a paragraph.</p>

<div>This is a container.</div>

<strong>Important text</strong>
```

### B. Void Elements (Empty Elements)

Void elements do not have closing tags and cannot contain child content.

Examples:

```html
<br>
<hr>
<img src="photo.jpg" alt="A photograph">
<input type="text">
<meta charset="UTF-8">
```

Note: In HTML5, void elements should not have separate closing tags.

## 5. Commonly Used HTML Tags

### A. Heading Tags

HTML provides six heading levels, from `<h1>` to `<h6>`.

```html
<h1>Main Heading</h1>
<h2>Sub Heading</h2>
<h3>Third Level Heading</h3>
<h4>Fourth Level Heading</h4>
<h5>Fifth Level Heading</h5>
<h6>Sixth Level Heading</h6>
```

- `<h1>` represents the highest-level heading.
- `<h6>` represents the lowest-level heading.
- Headings help organize webpage content.

### B. Paragraph Tag

The `<p>` tag is used to display paragraphs.

```html
<p>HTML is used to create web pages.</p>
```

### C. Line Break Tag

The `<br>` tag moves content to the next line.

```html
<p>Hello<br>Welcome to HTML.</p>
```

### D. Horizontal Rule Tag

The `<hr>` tag represents a thematic break, usually displayed as a horizontal line.

```html
<p>Introduction</p>
<hr>
<p>HTML Basics</p>
```

### E. Link Tag

The `<a>` tag creates hyperlinks.

```html
<a href="https://www.google.com">Visit Google</a>
```

The `href` attribute specifies the destination URL.

### F. Image Tag

The `<img>` tag displays images.

```html
<img src="photo.jpg" alt="Sample photograph">
```

- `src` specifies the image location.
- `alt` provides alternative text.

### G. List Tags

HTML supports ordered and unordered lists.

**Ordered List:**

```html
<ol>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ol>
```

**Unordered List:**

```html
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ul>
```

- `<ol>` creates a numbered list.
- `<ul>` creates a bulleted list.
- `<li>` represents an individual list item.

### H. Text Formatting Tags

| Tag | Purpose |
|---|---|
| `<b>` | Makes text visually bold. |
| `<strong>` | Indicates important text. |
| `<i>` | Displays text in italic style. |
| `<em>` | Emphasizes text. |
| `<u>` | Underlines text. |
| `<mark>` | Highlights text. |
| `<small>` | Displays smaller text. |
| `<del>` | Represents deleted text. |
| `<ins>` | Represents inserted text. |
| `<sub>` | Displays subscript text. |
| `<sup>` | Displays superscript text. |

Example:

```html
<p><strong>Important:</strong> Learn HTML basics.</p>

<p><em>HTML is interesting.</em></p>

<p>Water formula: H<sub>2</sub>O</p>

<p>Square: 5<sup>2</sup></p>

<p><mark>Highlighted text</mark></p>
```

## 6. HTML Attributes

HTML attributes provide additional information about HTML elements.

Attributes are generally specified in the opening tag.

### Syntax

```html
<tagname attribute="value">Content</tagname>
```

Example:

```html
<a href="https://www.google.com" target="_blank">
    Open Google
</a>
```

Here:
- `href` specifies the URL.
- `target="_blank"` opens the link in a new browsing context.

### Common HTML Attributes

| Attribute | Purpose |
|---|---|
| `id` | Provides a unique identifier for an element. |
| `class` | Groups elements for CSS and JavaScript. |
| `style` | Applies inline CSS styles. |
| `title` | Provides additional advisory information. |
| `href` | Specifies a link destination. |
| `src` | Specifies a resource location. |
| `alt` | Provides alternative text for images. |
| `width` | Specifies width. |
| `height` | Specifies height. |
| `target` | Specifies where to open a linked resource. |
| `disabled` | Disables a form control. |
| `required` | Makes a form control mandatory. |

## 7. Block-Level and Inline Elements

HTML elements are commonly described by their default display behavior.

### Block-Level Elements

Block elements generally start on a new line and occupy the available width of their containing block.

Examples:
- `<div>`
- `<p>`
- `<h1>` to `<h6>`
- `<section>`
- `<article>`

### Inline Elements

Inline elements generally flow within the surrounding text and occupy only the space they need.

Examples:
- `<span>`
- `<a>`
- `<strong>`
- `<em>`
- `<img>`

### Example

```html
<div>
    This is a block element.
</div>

<p>This is another block element.</p>

<p>
    This is <strong>bold text</strong>
    inside a paragraph.
</p>
```

Note: CSS can change the default display behavior of elements.

## 8. Nested HTML Elements

An HTML element placed inside another HTML element is called a nested element.

Example:

```html
<div>
    <h1>Welcome</h1>

    <p>
        Learn <strong>HTML</strong> step by step.
    </p>
</div>
```

Important rules:
- Properly close non-void elements.
- Nest elements correctly.
- Avoid overlapping or improperly nested tags.

Correct:

```html
<p>This is <strong>important</strong> text.</p>
```

Incorrect:

```html
<p>This is <strong>important</p></strong>
```

## 9. Comments in HTML

Comments are used to add notes inside HTML code. Browsers do not display comments as webpage content.

Syntax:

```html
<!-- This is an HTML comment -->

<h1>Welcome</h1>
```

Comments are useful for:
- Explaining code.
- Organizing sections.
- Temporarily documenting code.

## 10. Complete HTML Example

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>My First HTML Page</title>
</head>

<body>

    <h1>Welcome to HTML</h1>

    <p>
        HTML is used to structure web pages.
    </p>

    <h2>Frontend Technologies</h2>

    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>

    <a href="https://www.google.com">
        Visit Google
    </a>

    <br><br>

    <img src="photo.jpg"
         alt="Sample photograph"
         width="200">

</body>
</html>
```