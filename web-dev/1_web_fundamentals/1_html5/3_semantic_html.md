# Semantic HTML

## 1. What is Semantic HTML?

Semantic HTML means using HTML elements that clearly describe the meaning and purpose of the content they contain.

In simple words, semantic elements tell the browser, developers, and assistive technologies what a particular section of a webpage represents.

For example:

- `<header>` represents introductory or header content.
- `<nav>` represents navigation links.
- `<main>` represents the main content of a webpage.
- `<article>` represents independent content.
- `<footer>` represents footer information.

Semantic HTML helps create meaningful, well-structured, and accessible webpages.

## 2. Why Do We Use Semantic HTML?

Semantic HTML is important for several reasons.

1. **Code Readability:** Developers can easily understand the purpose of different sections.
2. **Accessibility:** Screen readers can better understand the structure of webpages.
3. **SEO:** Search engines can better interpret the meaning and organization of content.
4. **Maintainability:** Semantic code is easier to maintain and update.
5. **Consistency:** Provides a meaningful and standardized document structure.

## 3. Semantic vs Non-Semantic HTML

HTML elements can be broadly classified based on whether they communicate the meaning of their content.

### A. Semantic Elements

Semantic elements clearly describe their purpose.

Examples:

```html
<header></header>
<nav></nav>
<main></main>
<section></section>
<article></article>
<aside></aside>
<footer></footer>
```

### B. Non-Semantic Elements

Non-semantic elements do not describe the meaning of their content by themselves.

Examples:

```html
<div></div>
<span></span>
```

These elements are commonly used as generic containers for grouping content and applying CSS or JavaScript.

### Difference Between Semantic and Non-Semantic Elements

| Semantic HTML | Non-Semantic HTML |
|---|---|
| Describes the purpose of content. | Does not describe the content's purpose. |
| Improves document structure. | Provides generic containers. |
| Helps assistive technologies understand page landmarks. | Does not provide equivalent meaning by default. |
| Examples: `<header>`, `<nav>`, `<article>`. | Examples: `<div>`, `<span>`. |

### Example: Non-Semantic HTML

```html
<div class="header">
    <h1>My Website</h1>
</div>

<div class="navigation">
    <a href="/">Home</a>
    <a href="/about">About</a>
</div>

<div class="content">
    <h2>Welcome</h2>
    <p>This is my website.</p>
</div>

<div class="footer">
    Copyright 2026
</div>
```

### Example: Semantic HTML

```html
<header>
    <h1>My Website</h1>
</header>

<nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
</nav>

<main>
    <section>
        <h2>Welcome</h2>
        <p>This is my website.</p>
    </section>
</main>

<footer>
    Copyright 2026
</footer>
```

Both examples can produce similar visual output when styled with CSS. However, the semantic version communicates the purpose of each section more clearly.

## 4. Important Semantic HTML5 Elements

### A. `<header>`

The `<header>` element represents introductory content for a webpage or a section.

It commonly contains:

- Website logo.
- Website title.
- Introductory information.
- Navigation-related content.

Example:

```html
<header>
    <h1>My Portfolio</h1>
    <p>Welcome to my personal website.</p>
</header>
```

Important:
- A page can have a header.
- Individual articles and sections can also have their own headers.
- A header is not necessarily the same as a fixed top navigation bar.

### B. `<nav>`

The `<nav>` element represents a section containing important navigation links.

Example:

```html
<nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/services">Services</a>
    <a href="/contact">Contact</a>
</nav>
```

Common use cases:
- Main website navigation.
- Sidebar navigation.
- Table of contents.
- Navigation between important sections.

Note: Not every group of links needs to be inside `<nav>`. Use it for significant navigation sections.

### C. `<main>`

The `<main>` element represents the primary content of a webpage.

Example:

```html
<main>
    <h1>Welcome to My Website</h1>

    <p>
        This is the main content of the webpage.
    </p>
</main>
```

Important points:
- Normally, use one visible `<main>` element per page.
- It should contain the primary content.
- It should not contain content repeated across multiple pages, such as the main site navigation or footer.

### D. `<section>`

The `<section>` element represents a thematic grouping of related content.

Example:

```html
<section>
    <h2>About Me</h2>

    <p>
        I am a software developer interested
        in frontend development.
    </p>
</section>

<section>
    <h2>My Skills</h2>

    <p>
        HTML, CSS, JavaScript and React.
    </p>
</section>
```

Use `<section>` when:
- Content belongs to a particular topic.
- You want to group related content.
- The section usually has a heading.

### E. `<article>`

The `<article>` element represents independent, self-contained content that can make sense on its own.

Examples:
- Blog posts.
- News articles.
- Forum posts.
- Product reviews.
- Individual user comments.

Example:

```html
<article>
    <h2>Introduction to HTML5</h2>

    <p>
        HTML5 provides modern elements
        for building web applications.
    </p>

    <p>Published on November 4, 2026.</p>
</article>
```

Important:
An article should be meaningful as an independent piece of content, even when separated from the surrounding page.

### F. `<aside>`

The `<aside>` element represents content that is indirectly related to the main content.

Examples:
- Related articles.
- Sidebar information.
- Author information.
- Additional resources.
- Advertisements.

Example:

```html
<aside>
    <h3>Related Articles</h3>

    <ul>
        <li>HTML Basics</li>
        <li>CSS Basics</li>
        <li>JavaScript Basics</li>
    </ul>
</aside>
```

### G. `<footer>`

The `<footer>` element represents footer information for a webpage or a section.

It commonly contains:

- Copyright information.
- Contact details.
- Privacy policy links.
- Social media links.
- Related resources.

Example:

```html
<footer>
    <p>Copyright 2026 My Website</p>

    <a href="/privacy">Privacy Policy</a>
</footer>
```

A page can have a footer, and individual articles or sections can also have their own footers.

### H. `<figure>` and `<figcaption>`

The `<figure>` element represents self-contained content such as an image, illustration, diagram, or code example.

The `<figcaption>` element provides a caption for that content.

Example:

```html
<figure>
    <img
        src="html-logo.png"
        alt="HTML logo"
        width="150">

    <figcaption>
        HTML logo representing web structure.
    </figcaption>
</figure>
```

### I. `<details>` and `<summary>`

These elements create expandable and collapsible content.

Example:

```html
<details>
    <summary>What is HTML?</summary>

    <p>
        HTML stands for HyperText Markup Language.
    </p>
</details>
```

- `<details>` creates an expandable section.
- `<summary>` defines the visible heading of that section.

### J. `<time>`

The `<time>` element represents a date, time, or duration in a machine-readable format.

Example:

```html
<p>
    Published on
    <time datetime="2026-11-04">
        November 4, 2026
    </time>
</p>
```

The `datetime` attribute provides the machine-readable value.

## 5. Difference Between Section, Article, and Div

These three elements are commonly confused in interviews and practical development.

### Section

Used to group related content under a common theme.

```html
<section>
    <h2>Our Services</h2>

    <p>We provide web development services.</p>
</section>
```

### Article

Used for independent, self-contained content.

```html
<article>
    <h2>How to Learn HTML</h2>

    <p>
        HTML is the foundation of frontend development.
    </p>
</article>
```

### Div

Used as a generic container when no more meaningful semantic element is appropriate.

```html
<div class="card">
    <h2>Product Name</h2>
    <p>Product description.</p>
</div>
```

### Comparison

| Element | Purpose |
|---|---|
| `<section>` | Groups related thematic content. |
| `<article>` | Represents independent content. |
| `<div>` | Generic container without inherent semantic meaning. |

## 6. Semantic HTML Page Structure

A typical webpage can be organized using multiple semantic elements.

Example:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Semantic HTML Example</title>
</head>

<body>

    <header>
        <h1>My Website</h1>

        <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
        </nav>
    </header>

    <main>

        <section>
            <h2>About Us</h2>
            <p>Welcome to our website.</p>
        </section>

        <article>
            <h2>Latest Blog Post</h2>
            <p>Learn the basics of HTML5.</p>
        </article>

        <aside>
            <h3>Related Topics</h3>
            <p>Learn CSS and JavaScript.</p>
        </aside>

    </main>

    <footer>
        <p>Copyright 2026 My Website</p>
    </footer>

</body>
</html>
```

## 7. HTML Semantic Structure in Real-World Websites

Consider an e-commerce website.

It may have the following structure:

```html
<body>

    <header>
        <h1>My Store</h1>

        <nav>
            <a href="/">Home</a>
            <a href="/products">Products</a>
            <a href="/cart">Cart</a>
        </nav>
    </header>

    <main>

        <section>
            <h2>Featured Products</h2>

            <article>
                <h3>Laptop</h3>
                <p>High-performance laptop.</p>
            </article>

            <article>
                <h3>Mobile Phone</h3>
                <p>Latest smartphone.</p>
            </article>
        </section>

        <aside>
            <h2>Special Offers</h2>
            <p>Check our latest discounts.</p>
        </aside>

    </main>

    <footer>
        <p>Copyright 2026 My Store</p>
    </footer>

</body>
```

This structure makes the purpose of different website sections clear.

## 8. Semantic HTML and Accessibility

Semantic HTML plays an important role in accessibility.

Screen readers use semantic information to help users understand and navigate webpages.

For example:

**Without semantic HTML:**

```html
<div class="navigation">
    <a href="/">Home</a>
    <a href="/about">About</a>
</div>
```

**With semantic HTML:**

```html
<nav aria-label="Main navigation">
    <a href="/">Home</a>
    <a href="/about">About</a>
</nav>
```

The semantic `<nav>` element exposes a navigation landmark to assistive technologies.

### Important Accessibility Practices

1. Use semantic HTML elements wherever appropriate.
2. Use headings in a logical hierarchy.
3. Provide meaningful alternative text for images.
4. Use labels for form controls.
5. Use native buttons and links.
6. Ensure keyboard accessibility.
7. Use ARIA attributes only when necessary.

## 9. Semantic HTML vs ARIA

ARIA stands for Accessible Rich Internet Applications.

ARIA attributes provide additional accessibility information when native HTML semantics are insufficient.

Example:

```html
<button aria-label="Close dialog">
    X
</button>
```

Here:
- `<button>` already provides native button semantics.
- `aria-label` provides an accessible name for the button.

Important rule:

Prefer native HTML elements over custom elements with ARIA whenever possible.

For example, use:

```html
<button type="button">Submit</button>
```

Instead of:

```html
<div role="button" tabindex="0">
    Submit
</div>
```

The native button already supports keyboard interaction and built-in button behavior.

## 10. Best Practices for Semantic HTML

1. Use `<header>` for introductory content.
2. Use `<nav>` for major navigation sections.
3. Use `<main>` for the primary page content.
4. Use `<section>` to group related thematic content.
5. Use `<article>` for independent content.
6. Use `<aside>` for supplementary content.
7. Use `<footer>` for footer information.
8. Avoid using `<div>` for everything.
9. Use meaningful heading structures.
10. Do not choose semantic elements only because of their default styling.

Remember: Semantic elements communicate meaning, not appearance. CSS controls how those elements look.
