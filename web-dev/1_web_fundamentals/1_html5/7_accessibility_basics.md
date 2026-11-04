# HTML Accessibility Basics

## 1. What is Web Accessibility?

Web accessibility means designing and developing websites and web applications so that people with different abilities can access, understand, navigate, and interact with them.

In simple words, accessibility ensures that a website is usable by as many people as possible, including people with disabilities.

### Examples of Users Who Benefit from Accessibility

1. People with visual impairments.
2. People who are blind and use screen readers.
3. People with hearing impairments.
4. People with motor disabilities who cannot easily use a mouse.
5. People with cognitive disabilities.
6. People who have temporary injuries or limitations.

### Real-World Examples

- A blind user uses a screen reader to understand webpage content.
- A user with limited motor abilities navigates a website using only a keyboard.
- A user with hearing difficulties reads video captions.
- A user with low vision increases text size and uses high-contrast colors.

## 2. Why is Accessibility Important?

Accessibility is important for several reasons.

### A. Inclusive User Experience

It allows people with different abilities to use websites.

### B. Better Usability

Accessible websites are generally easier for everyone to navigate and understand.

### C. SEO Benefits

Meaningful HTML structure, descriptive headings, and image alternatives can also help search engines understand webpage content.

Accessibility itself does not guarantee better search rankings.

### D. Legal and Compliance Requirements

Many countries have accessibility requirements for websites and digital services.

For example:
- WCAG provides internationally recognized accessibility guidelines.
- The Americans with Disabilities Act (ADA) is relevant to accessibility in the United States.
- The Rights of Persons with Disabilities Act, 2016, is relevant in India.

### E. Better Website Quality

Accessibility encourages developers to write clean, meaningful, and well-structured HTML.

## 3. Understanding WCAG

WCAG stands for Web Content Accessibility Guidelines.

It is a set of international guidelines developed by the W3C to make web content more accessible.

WCAG is based on four important principles, commonly called POUR.

### A. Perceivable

Information must be presented in ways users can perceive.

Examples:
- Add alternative text to meaningful images.
- Provide captions for videos.
- Use sufficient color contrast.
- Do not communicate information through color alone.

### B. Operable

Users must be able to interact with and navigate the website.

Examples:
- Support keyboard navigation.
- Provide visible focus indicators.
- Avoid keyboard traps.
- Give users enough time to complete tasks.

### C. Understandable

Information and interface behavior should be easy to understand.

Examples:
- Use clear language.
- Provide understandable instructions.
- Use consistent navigation.
- Display useful form validation messages.

### D. Robust

Content should work reliably with different browsers and assistive technologies.

Examples:
- Use valid HTML.
- Prefer native HTML elements.
- Provide correct accessible names and roles.
- Avoid unnecessary or incorrect ARIA attributes.

## 4. What is Assistive Technology?

Assistive technology refers to software or hardware that helps people with disabilities use computers and digital services.

### Common Assistive Technologies

| Technology | Purpose |
|---|---|
| Screen readers | Read webpage content aloud or through Braille output. |
| Screen magnifiers | Enlarge webpage content. |
| Voice recognition software | Allows users to control computers using speech. |
| Alternative keyboards | Help users interact without a standard keyboard. |
| Braille displays | Convert digital text into Braille output. |

### Examples of Screen Readers

- NVDA – Popular screen reader for Windows.
- JAWS – Screen reader for Windows.
- VoiceOver – Built into Apple devices.
- TalkBack – Screen reader for Android devices.

## 5. Semantic HTML and Accessibility

Semantic HTML is one of the foundations of web accessibility.

Semantic elements describe the purpose of webpage content.

Examples:

```html
<header>
    <h1>My Website</h1>
</header>

<nav aria-label="Main navigation">
    <a href="/">Home</a>
    <a href="/about">About</a>
</nav>

<main>
    <h2>Welcome</h2>
    <p>This is the main content.</p>
</main>

<footer>
    <p>Copyright 2026</p>
</footer>
```

Benefits:
- Screen readers can identify important page landmarks.
- Users can navigate between major sections.
- Developers can understand the page structure.
- The document becomes easier to maintain.

### Important Semantic Elements for Accessibility

| Element | Purpose |
|---|---|
| `<header>` | Introductory content or page header. |
| `<nav>` | Navigation section. |
| `<main>` | Primary page content. |
| `<section>` | Thematic content section. |
| `<article>` | Independent content. |
| `<aside>` | Supplementary content. |
| `<footer>` | Footer information. |

## 6. Image Accessibility and ALT Attribute

Images should have appropriate text alternatives when they communicate meaningful information.

The `alt` attribute provides alternative text for images.

### Example

```html
<img
    src="student.jpg"
    alt="Student studying at a desk">
```

The screen reader can announce the alternative text instead of the image itself.

### Different Types of Image Alternatives

**A. Informative Images**

Images that communicate important information should have meaningful alternative text.

```html
<img
    src="company-logo.png"
    alt="ABC Company logo">
```

**B. Decorative Images**

Images used only for decoration should generally have an empty alt attribute.

```html
<img src="decoration.png" alt="">
```

This prevents screen readers from announcing unnecessary decorative information.

**C. Functional Images**

If an image is used as a button or link, its alternative text should describe the action or destination.

```html
<a href="/home">
    <img src="home.png" alt="Home">
</a>
```

**D. Complex Images**

Charts and diagrams may need a longer text explanation in addition to a short alternative text.

### Important Rules for Alt Text

1. Describe the meaningful information in the image.
2. Keep descriptions concise.
3. Avoid unnecessary phrases such as "image of" in ordinary cases.
4. Use empty alt text for purely decorative images.
5. Do not use filenames as alternative text.

## 7. Accessible Forms

Forms should be easy to understand and operate for all users.

### A. Use Labels

Every form control should have an accessible name.

```html
<label for="email">Email Address:</label>

<input
    type="email"
    id="email"
    name="email">
```

The `for` attribute connects the label to the input through its `id`.

### B. Use Required Fields Clearly

```html
<label for="username">
    Username (required):
</label>

<input
    type="text"
    id="username"
    name="username"
    required>
```

The `required` attribute provides native required-field behavior.

### C. Use Fieldset and Legend

Group related form controls using `<fieldset>` and `<legend>`.

```html
<fieldset>

    <legend>Personal Information</legend>

    <label for="name">Name:</label>
    <input type="text" id="name" name="name">

    <label for="email">Email:</label>
    <input type="email" id="email" name="email">

</fieldset>
```

### D. Provide Clear Error Messages

Users should understand what went wrong and how to correct it.

Example:

```html
<label for="password">Password:</label>

<input
    type="password"
    id="password"
    name="password"
    required
    aria-describedby="password-help">

<p id="password-help">
    Password must contain at least 8 characters.
</p>
```

The `aria-describedby` attribute connects the input to its descriptive help text.

For dynamically displayed validation errors, ensure the error is also communicated to assistive technologies.

## 8. Keyboard Accessibility

Keyboard accessibility means users can interact with a website without using a mouse.

This is especially important for people with motor disabilities.

### Common Keyboard Controls

| Key | Function |
|---|---|
| Tab | Moves to the next focusable element. |
| Shift + Tab | Moves to the previous focusable element. |
| Enter | Activates links and buttons. |
| Space | Activates buttons and toggles checkboxes. |
| Arrow keys | Navigate within certain controls. |
| Escape | Often closes dialogs, menus, and popups. |

### Example of Keyboard-Friendly Elements

```html
<a href="/about">About Us</a>

<button type="button">
    Submit
</button>

<input type="text" placeholder="Enter name">
```

Native HTML elements provide built-in keyboard behavior.

### Avoid Non-Accessible Clickable Divs

Incorrect approach:

```html
<div onclick="submitForm()">
    Submit
</div>
```

This is not automatically keyboard accessible and does not have native button semantics.

Better approach:

```html
<button type="button" onclick="submitForm()">
    Submit
</button>
```

The native button supports keyboard interaction and communicates its purpose to assistive technologies.

## 9. Focus Management and Focus Indicators

Focus indicates which element is currently selected during keyboard navigation.

A visible focus indicator helps users understand where they are on a webpage.

### Example

```html
<style>
    button:focus-visible,
    a:focus-visible,
    input:focus-visible {
        outline: 3px solid blue;
        outline-offset: 3px;
    }
</style>
```

Important:
- Never remove focus indicators without providing an accessible alternative.
- Ensure focused elements are visually distinguishable.
- Ensure focus is not hidden behind sticky headers or overlays.
- Manage focus appropriately when opening and closing dialogs.

## 10. Heading Structure and Accessibility

HTML provides six heading levels:

```html
<h1>Main Heading</h1>

<h2>Section Heading</h2>

<h3>Subsection Heading</h3>

<h4>Fourth Level Heading</h4>

<h5>Fifth Level Heading</h5>

<h6>Sixth Level Heading</h6>
```

### Best Practices

1. Use headings in a logical hierarchy.
2. Use `<h1>` for the main page heading in typical page structures.
3. Use `<h2>` for major sections.
4. Use `<h3>` for subsections under an `<h2>`.
5. Avoid skipping heading levels without a good structural reason.
6. Do not use headings only to make text larger.

Example:

```html
<h1>Frontend Development</h1>

<h2>HTML</h2>

<h3>HTML Forms</h3>

<h3>HTML Tables</h3>

<h2>CSS</h2>

<h3>Flexbox</h3>
```

This structure helps screen reader users navigate webpage sections.

## 11. Color Contrast

Color contrast means the difference in brightness between foreground text and its background.

Good contrast makes content easier to read.

WCAG 2.2 provides these commonly used minimum contrast ratios:

| Content | Minimum Contrast Ratio |
|---|---|
| Normal text | 4.5:1 |
| Large text | 3:1 |
| Important user interface components and graphical objects | 3:1 |

Large text generally means at least 18pt regular or 14pt bold.

### Example

Poor contrast:

```html
<p style="color: lightgray; background: white;">
    Difficult to read text.
</p>
```

Better contrast:

```html
<p style="color: #222; background: white;">
    Easy to read text.
</p>
```

Important:
- Do not rely on color alone to communicate information.
- Provide text labels or other visual indicators.
- Test text and interactive controls against their backgrounds.

## 12. What is ARIA?

ARIA stands for Accessible Rich Internet Applications.

ARIA is a set of attributes that provide additional accessibility information about HTML elements.

ARIA is especially useful for custom interactive components and dynamic interfaces.

### Common ARIA Attributes

| Attribute | Purpose |
|---|---|
| `aria-label` | Provides an accessible name. |
| `aria-labelledby` | Identifies an element that provides its accessible name. |
| `aria-describedby` | Identifies elements that provide additional descriptions. |
| `aria-hidden` | Hides content from the accessibility tree. |
| `aria-expanded` | Indicates whether a control's associated content is expanded. |
| `aria-pressed` | Indicates the pressed state of a toggle button. |
| `aria-live` | Identifies content that may be announced when it changes. |
| `aria-required` | Communicates a required state to assistive technologies. |
| `aria-invalid` | Indicates that a form value is invalid. |
| `role` | Specifies an element's accessibility role when needed. |

### A. ARIA-LABEL

Provides an accessible name to an element.

```html
<button aria-label="Close dialog">
    X
</button>
```

A screen reader can announce the button as "Close dialog."

### B. ARIA-LABELLEDBY

Uses another element as the accessible name.

```html
<h2 id="dialog-title">Login</h2>

<div role="dialog"
     aria-labelledby="dialog-title">
    Login form content
</div>
```

### C. ARIA-DESCRIBEDBY

Connects an element to additional descriptive information.

```html
<label for="password">Password:</label>

<input
    type="password"
    id="password"
    aria-describedby="password-help">

<p id="password-help">
    Use at least 8 characters.
</p>
```

### D. ARIA-EXPANDED

Communicates whether expandable content is open or closed.

```html
<button
    aria-expanded="false"
    aria-controls="menu">
    Menu
</button>

<nav id="menu" hidden>
    <a href="/">Home</a>
    <a href="/about">About</a>
</nav>
```

In a working interactive component, JavaScript must update `aria-expanded` and the visibility of the controlled content together.

### E. ARIA-HIDDEN

Hides content from assistive technologies.

```html
<span aria-hidden="true">
    ★
</span>
```

Use it carefully. Do not hide meaningful content from screen reader users.

### Important ARIA Rule

A well-known accessibility principle is:

"Use native HTML elements whenever possible."

For example, prefer:

```html
<button type="button">Save</button>
```

Instead of creating a custom button using:

```html
<div role="button" tabindex="0">
    Save
</div>
```

Native elements already provide appropriate semantics and keyboard behavior.

## 13. Accessible HTML Tables

Tables should have clear headers and meaningful structure.

Example:

```html
<table>

    <caption>Employee Details</caption>

    <thead>
        <tr>
            <th scope="col">Employee ID</th>
            <th scope="col">Name</th>
            <th scope="col">Department</th>
        </tr>
    </thead>

    <tbody>
        <tr>
            <th scope="row">101</th>
            <td>Raj</td>
            <td>IT</td>
        </tr>

        <tr>
            <th scope="row">102</th>
            <td>Rahul</td>
            <td>HR</td>
        </tr>
    </tbody>

</table>
```

Accessibility benefits:

- Caption describes the table.
- Header cells identify columns.
- Row headers identify individual records.
- Screen readers can communicate relationships between headers and data cells.

## 14. Skip Navigation Links

A skip link allows keyboard users to bypass repeated navigation and move directly to the main content.

Example:

```html
<a href="#main-content" class="skip-link">
    Skip to main content
</a>

<header>
    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
    </nav>
</header>

<main id="main-content">
    <h1>Welcome</h1>
    <p>Main page content.</p>
</main>
```

CSS:

```css
.skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: black;
    color: white;
    padding: 10px;
}

.skip-link:focus {
    top: 0;
}
```

The skip link becomes visible when keyboard users focus it.

## 15. Accessible Audio and Video

Multimedia content should provide alternatives for users who cannot access the original media.

### A. Video Captions

The `<track>` element can provide captions for video content.

```html
<video controls width="500">

    <source src="video.mp4" type="video/mp4">

    <track
        src="captions.vtt"
        kind="captions"
        srclang="en"
        label="English"
        default>

</video>
```

### B. Audio Controls

```html
<audio controls>

    <source src="audio.mp3" type="audio/mpeg">

    Your browser does not support audio.

</audio>
```

### Important Practices

- Provide captions for prerecorded videos with audio.
- Provide transcripts for audio content when appropriate.
- Provide audio descriptions when important visual information is not communicated through the audio.
- Make playback controls keyboard accessible.

## 16. Accessible Buttons and Links

Buttons and links serve different purposes.

### Links

Use links to navigate to another page or location.

```html
<a href="/profile">View Profile</a>
```

### Buttons

Use buttons to perform an action.

```html
<button type="button">
    Save Changes
</button>
```

### Best Practices

- Use descriptive link text.
- Use buttons for actions.
- Avoid unclear labels such as "Click here" when possible.
- Ensure interactive elements have accessible names.
- Provide visible keyboard focus.
- Do not make important actions available only on mouse hover.

## 17. How to Test Website Accessibility

Accessibility should be tested during development.

### A. Keyboard Testing

Try navigating your website using only a keyboard.

Check:
- Can you reach all interactive elements?
- Is the focus indicator visible?
- Can you activate buttons and links?
- Can you operate dropdowns and dialogs?
- Can you escape from open dialogs?

### B. Screen Reader Testing

Test your website using screen readers such as:

- NVDA.
- VoiceOver.
- TalkBack.

Check whether:
- Headings are announced correctly.
- Images have appropriate alternatives.
- Form fields have meaningful labels.
- Buttons and links have understandable names.
- Page landmarks are identifiable.

### C. Browser Developer Tools

Browser accessibility panels can help inspect:

- Accessible names.
- Roles.
- States.
- Accessibility tree.
- Color contrast.

### D. Automated Accessibility Tools

Common tools include:

- Lighthouse.
- axe DevTools.
- WAVE.
- Accessibility Insights.

Important: Automated tools cannot identify every accessibility issue. Manual keyboard and screen reader testing are also necessary.

## 18. Complete Practical Example: Accessible Contact Form

```html
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Accessible Contact Form</title>

    <style>

        body {
            font-family: Arial, sans-serif;
            margin: 30px;
        }

        label {
            display: block;
            margin-top: 15px;
        }

        input,
        textarea {
            padding: 10px;
            width: 100%;
            max-width: 400px;
        }

        button {
            margin-top: 15px;
            padding: 10px 20px;
        }

        :focus-visible {
            outline: 3px solid blue;
            outline-offset: 3px;
        }

    </style>

</head>

<body>

    <header>
        <h1>Contact Us</h1>
    </header>

    <main>

        <form action="/contact" method="post">

            <fieldset>

                <legend>Contact Information</legend>

                <label for="name">
                    Full Name:
                </label>

                <input
                    type="text"
                    id="name"
                    name="name"
                    required>

                <label for="email">
                    Email Address:
                </label>

                <input
                    type="email"
                    id="email"
                    name="email"
                    required>

                <label for="message">
                    Message:
                </label>

                <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required>
                </textarea>

                <button type="submit">
                    Send Message
                </button>

            </fieldset>

        </form>

    </main>

    <footer>
        <p>Copyright 2026 My Website</p>
    </footer>

</body>
</html>
```

Accessibility features used:

1. Semantic HTML elements.
2. Proper heading structure.
3. Form labels connected using `for` and `id`.
4. Required form fields.
5. Fieldset and legend for grouping.
6. Keyboard-accessible native controls.
7. Visible focus indicators.

