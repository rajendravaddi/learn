# CSS3

## 1. CSS Fundamentals

CSS (Cascading Style Sheets) controls the presentation and layout of HTML elements.

### Ways to apply CSS

```html
<!-- Inline CSS -->
<h1 style="color: blue;">Hello World</h1>

<!-- Internal CSS -->
<style>
  h1 {
    color: blue;
  }
</style>

<!-- External CSS (recommended) -->
<link rel="stylesheet" href="style.css">
```

### CSS Syntax

```css
selector {
  property: value;
}
```

Example:

```css
h1 {
  color: blue;
  font-size: 32px;
}
```

### Essential Selectors

| Selector | Example | Purpose |
|---|---|---|
| Element | `p` | Selects all paragraphs |
| Class | `.container` | Selects elements by class |
| ID | `#header` | Selects an element by ID |
| Universal | `*` | Selects all elements |
| Grouping | `h1, p` | Selects multiple elements |
| Descendant | `.box p` | Selects paragraphs inside box |
| Child | `.box > p` | Selects direct child paragraphs |
| Attribute | `input[type="text"]` | Selects by attribute |

### Pseudo-classes and Pseudo-elements

```css
button:hover {
  background-color: blue;
}

input:focus {
  outline: 2px solid blue;
}

p::first-letter {
  font-size: 24px;
}
```

- Pseudo-class (`:hover`) selects an element in a particular state.
- Pseudo-element (`::before`, `::after`) styles a specific part or creates generated content.

### Specificity and Inheritance

When multiple CSS rules target the same element, specificity helps determine which rule wins.

General priority:

1. Inline styles
2. ID selectors
3. Class, attribute, and pseudo-class selectors
4. Element and pseudo-element selectors

`!important` can override normal declarations but should be avoided unless necessary.

Inheritance means some properties, such as `color` and `font-family`, can pass from parent to child elements.

---

## 2. Colors, Units and Typography

### CSS Colors

```css
.box {
  color: red;
  background-color: #f0f0f0;
  border-color: rgb(0, 0, 255);
}
```

Common color formats:

- Named: `red`, `blue`, `black`
- HEX: `#ffffff`
- RGB: `rgb(255, 0, 0)`
- RGBA: `rgba(0, 0, 0, 0.5)`
- HSL: `hsl(200, 80%, 50%)`

### CSS Units

| Unit | Meaning |
|---|---|
| `px` | Fixed CSS pixel unit |
| `%` | Relative to a containing value |
| `em` | Relative to the element's font size (context-dependent) |
| `rem` | Relative to the root font size |
| `vw` | Viewport width |
| `vh` | Viewport height |

Prefer `rem` for scalable typography and spacing, `%` for fluid sizing, and viewport units when sizing relative to the screen.

### Typography

```css
body {
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: #333;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
}

p {
  text-decoration: none;
  letter-spacing: 0.5px;
}
```

Important properties:

- `font-family`
- `font-size`
- `font-weight`
- `line-height`
- `text-align`
- `text-decoration`
- `letter-spacing`

---

## 3. CSS Box Model

Every HTML element is represented as a rectangular box.

The box model consists of:

1. Content — actual text or element content.
2. Padding — space inside the border.
3. Border — boundary around the padding and content.
4. Margin — space outside the border.

### Example

```css
.box {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
  box-sizing: border-box;
}
```

### Box Sizing

```css
* {
  box-sizing: border-box;
}
```

- `content-box`: width applies to content only.
- `border-box`: width includes content, padding, and border.

**Important:** `border-box` makes layout sizing easier and is a common global default.

Also understand:

- `min-width`, `max-width`
- `min-height`, `max-height`
- `overflow: hidden`, `auto`, `scroll`

---

## 4. Display and Positioning

### Display Properties

| Value | Purpose |
|---|---|
| `block` | Starts on a new line and generally takes available width |
| `inline` | Flows within text; width and height don't work like block elements |
| `inline-block` | Flows inline but supports width and height |
| `none` | Removes the element from layout |

### Positioning

```css
.box {
  position: relative;
  top: 10px;
  left: 20px;
}
```

| Position | Purpose |
|---|---|
| `static` | Default document flow |
| `relative` | Positioned relative to its normal position |
| `absolute` | Positioned relative to its nearest positioned ancestor |
| `fixed` | Positioned relative to the viewport |
| `sticky` | Switches between normal and stuck positioning |

### Z-index

Controls stacking order of positioned elements and certain other stacking contexts.

```css
.modal {
  position: fixed;
  z-index: 1000;
}
```

Remember: `z-index` is affected by stacking contexts, so a larger number does not always mean an element appears above everything.

---

## 5. Flexbox

Flexbox is a one-dimensional layout system used to arrange items in a row or column.

### Example

```css
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.item {
  flex: 1;
}
```

### Important Properties

**Flex container properties:**

| Property | Purpose |
|---|---|
| `display: flex` | Enables Flexbox |
| `flex-direction` | Row or column direction |
| `justify-content` | Alignment along main axis |
| `align-items` | Alignment along cross axis |
| `flex-wrap` | Allows items to wrap |
| `gap` | Space between items |

**Flex item properties:**

- `flex-grow`: Controls how items grow.
- `flex-shrink`: Controls how items shrink.
- `flex-basis`: Sets the initial main size.
- `align-self`: Overrides individual item alignment.

### Common Use Cases

- Navigation bars
- Centering content
- Cards in a row
- Header layouts
- Buttons and form controls

**Remember:** `justify-content` works along the main axis; `align-items` works along the cross axis.

---

## 6. CSS Grid

CSS Grid is a two-dimensional layout system that manages rows and columns together.

### Example

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

This creates three equal-width columns.

### Important Properties

| Property | Purpose |
|---|---|
| `display: grid` | Enables Grid |
| `grid-template-columns` | Defines columns |
| `grid-template-rows` | Defines rows |
| `gap` | Space between cells |
| `grid-column` | Controls column placement |
| `grid-row` | Controls row placement |
| `grid-template-areas` | Names layout areas |

### Useful Functions

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
```

- `fr`: Fraction of available space.
- `repeat()`: Repeats a track definition.
- `minmax()`: Defines minimum and maximum track sizes.
- `auto-fit` and `auto-fill`: Help create flexible grid layouts.

### Common Use Cases

- Dashboards
- Product galleries
- Page layouts
- Image grids
- Card collections

**Remember:** Flexbox is generally best for one-dimensional layouts; Grid is useful for two-dimensional layouts. They can also be combined.

---

## 7. Responsive Design

Responsive design makes websites adapt to different screen sizes and devices.

### Mobile-First Approach

Start with the mobile layout and progressively enhance it for larger screens.

```css
.container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .container {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Essential Practices

- Use flexible layouts with Flexbox and Grid.
- Prefer relative units where appropriate.
- Avoid unnecessary fixed widths.
- Make images responsive.
- Test layouts at different viewport sizes.
- Choose breakpoints based on when the content needs them.

### Responsive Images

```css
img {
  max-width: 100%;
  height: auto;
}
```

---

## 8. CSS Media Queries

Media queries apply CSS rules based on device or viewport characteristics.

### Syntax

```css
@media (max-width: 600px) {
  .container {
    padding: 10px;
  }
}
```

### Common Conditions

```css
/* Mobile */
@media (max-width: 600px) {
  /* CSS rules */
}

/* Tablet and larger */
@media (min-width: 768px) {
  /* CSS rules */
}

/* Landscape orientation */
@media (orientation: landscape) {
  /* CSS rules */
}
```

Important concepts:

- `min-width`
- `max-width`
- `orientation`
- Combining conditions with `and`, `or`, and `not`

Media queries are commonly used for responsive layouts, navigation changes, typography adjustments, and device preferences.

---

## 9. Visual Styling

### Backgrounds

```css
.box {
  background-color: lightblue;
  background-image: url("image.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
```

### Borders and Shadows

```css
.card {
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
```

### Gradients

```css
.box {
  background: linear-gradient(to right, blue, purple);
}
```

Important properties:

- `background-color`
- `background-image`
- `background-size`
- `background-position`
- `border`
- `border-radius`
- `box-shadow`
- `text-shadow`
- `linear-gradient()`

---

## 10. Transitions and Animations

### Transitions

Transitions smoothly change a property when its value changes.

```css
button {
  background-color: blue;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: darkblue;
}
```

### Transforms

```css
.card:hover {
  transform: scale(1.05);
}
```

Common transform functions:

- `translate()`: Moves an element.
- `rotate()`: Rotates an element.
- `scale()`: Changes its size.
- `skew()`: Skews its shape.

### Animations

Animations allow elements to change styles through multiple keyframes.

```css
@keyframes move {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(100px);
  }
}

.box {
  animation: move 2s ease-in-out infinite alternate;
}
```

Important properties:

- `animation-name`
- `animation-duration`
- `animation-delay`
- `animation-iteration-count`
- `animation-direction`
- `animation-timing-function`
- `animation-fill-mode`

**Accessibility note:** Respect `prefers-reduced-motion` for users who prefer less animation.

---

## 11. Modern CSS Essentials

### CSS Variables

Variables allow reusable values throughout a stylesheet.

```css
:root {
  --primary-color: #2563eb;
  --spacing: 16px;
}

button {
  background-color: var(--primary-color);
  padding: var(--spacing);
}
```

### CSS Functions

```css
.container {
  width: calc(100% - 40px);
  max-width: 1200px;
  padding: clamp(16px, 3vw, 40px);
}
```

Understand these functions:

- `var()`: Uses CSS variables.
- `calc()`: Performs calculations.
- `min()`: Chooses the smallest value.
- `max()`: Chooses the largest value.
- `clamp()`: Sets a flexible value within minimum and maximum limits.

### Object Fit

Controls how an image or video fits inside its container.

```css
img {
  width: 300px;
  height: 200px;
  object-fit: cover;
}
```

Common values:

- `cover`: Fills the container, potentially cropping content.
- `contain`: Shows the entire image, potentially leaving empty space.
