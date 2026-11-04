# HTML Forms and Inputs

## 1. What are HTML Forms?

A HTML form is used to collect information from users and submit that information for processing.

Forms allow users to enter data, select options, upload files, and submit information.

### Common Real-World Examples

- Login forms.
- Registration forms.
- Contact forms.
- Search forms.
- Feedback forms.
- Payment and checkout forms.
- Job application forms.

### Example

```html
<form>
    <label for="username">Username:</label>
    <input type="text" id="username" name="username">

    <br><br>

    <label for="email">Email:</label>
    <input type="email" id="email" name="email">

    <br><br>

    <button type="submit">Submit</button>
</form>
```

Here:
- `<form>` creates the form.
- `<label>` describes an input field.
- `<input>` accepts user data.
- `<button>` submits the form.

## 2. HTML Form Element

The `<form>` element is the container for form controls.

### Syntax

```html
<form action="server-url" method="post">

    <!-- Form elements -->

</form>
```

### Important Form Attributes

| Attribute | Description |
|---|---|
| `action` | Specifies where form data is submitted. |
| `method` | Specifies how form data is submitted. |
| `enctype` | Specifies how form data is encoded. |
| `target` | Specifies where to display the response. |
| `autocomplete` | Controls browser autocomplete behavior. |
| `novalidate` | Disables built-in browser form validation. |
| `name` | Identifies the form. |

### Example

```html
<form action="/register" method="post">

    <label for="name">Name:</label>
    <input type="text" id="name" name="name">

    <button type="submit">Register</button>

</form>
```

When the user submits the form, the browser sends the form data to `/register` using the POST method.

Note: A form requires a server-side endpoint or another submission handler to process submitted data.

## 3. GET vs POST Methods

HTML forms support two commonly used HTTP methods: GET and POST.

### A. GET Method

The GET method sends form data as URL parameters.

Example:

```html
<form action="/search" method="get">

    <input type="text" name="keyword">

    <button type="submit">Search</button>

</form>
```

If the user enters `HTML`, the browser may navigate to:

```text
/search?keyword=HTML
```

Characteristics:
- Data is appended to the URL as query parameters.
- Useful for search and filtering functionality.
- URLs can be bookmarked and shared.
- Not suitable for sensitive information.
- Request parameters are subject to URL length limits.

### B. POST Method

The POST method sends form data in the HTTP request body.

Example:

```html
<form action="/register" method="post">

    <input type="text" name="username">

    <input type="password" name="password">

    <button type="submit">Register</button>

</form>
```

Characteristics:
- Data is sent in the request body.
- Commonly used for registration and data submission.
- Data is not normally displayed in the URL.
- Suitable for operations that create or modify server-side data.

Important: POST does not automatically make data secure. Use HTTPS to encrypt data during transmission.

### GET vs POST Comparison

| GET | POST |
|---|---|
| Sends data through URL parameters. | Sends data in the request body. |
| Useful for searching and filtering. | Useful for submitting or modifying data. |
| Parameters can appear in browser history. | Submitted body data is not normally shown in browser history. |
| Can be bookmarked with parameters. | Cannot normally be bookmarked with submitted body data. |
| Should not be used for sensitive information. | Can carry sensitive information over HTTPS. |

## 4. HTML Input Element

The `<input>` element is used to accept different types of user input.

The `type` attribute determines the kind of input control displayed by the browser.

### Common HTML Input Types

| Input Type | Purpose |
|---|---|
| `text` | Accepts plain text. |
| `password` | Accepts password input. |
| `email` | Accepts an email address. |
| `number` | Accepts numerical input. |
| `tel` | Accepts telephone numbers. |
| `url` | Accepts a URL. |
| `date` | Selects a date. |
| `time` | Selects a time. |
| `datetime-local` | Selects a local date and time. |
| `month` | Selects a month and year. |
| `week` | Selects a week. |
| `radio` | Selects one option from a group. |
| `checkbox` | Selects one or more options. |
| `file` | Uploads a file. |
| `color` | Selects a color. |
| `range` | Selects a value from a range. |
| `search` | Accepts search text. |
| `hidden` | Stores a value not displayed as a normal input. |
| `submit` | Submits the form. |
| `reset` | Resets form controls to their initial values. |
| `button` | Creates a button without default form submission behavior. |

### A. Text Input

Used to accept ordinary text.

```html
<label for="name">Name:</label>
<input type="text" id="name" name="name">
```

### B. Password Input

Used to accept password information. The browser typically masks the entered characters.

```html
<label for="password">Password:</label>
<input type="password" id="password" name="password">
```

Note: Password masking does not encrypt the submitted password.

### C. Email Input

Used to accept email addresses and provides basic browser validation.

```html
<label for="email">Email:</label>
<input type="email" id="email" name="email">
```

### D. Number Input

Used to accept numerical values.

```html
<label for="age">Age:</label>
<input type="number" id="age" name="age" min="18" max="60">
```

### E. Date Input

Allows users to select a date.

```html
<label for="dob">Date of Birth:</label>
<input type="date" id="dob" name="dob">
```

### F. Radio Button

Used when users must select only one option from a group.

Example:

```html
<p>Select Gender:</p>

<input type="radio" id="male" name="gender" value="male">
<label for="male">Male</label>

<input type="radio" id="female" name="gender" value="female">
<label for="female">Female</label>

<input type="radio" id="other" name="gender" value="other">
<label for="other">Other</label>
```

Important:
- Radio buttons in the same group should have the same `name`.
- Only one option in the group can be selected.
- The `value` attribute determines the value submitted to the server.

### G. Checkbox

Used when users can select multiple options.

Example:

```html
<p>Select Skills:</p>

<input type="checkbox" id="html" name="skills" value="html">
<label for="html">HTML</label>

<input type="checkbox" id="css" name="skills" value="css">
<label for="css">CSS</label>

<input type="checkbox" id="js" name="skills" value="javascript">
<label for="js">JavaScript</label>
```

Important:
- Multiple checkboxes can be selected.
- Checked checkboxes are included in submitted form data.
- Unchecked checkboxes are not submitted.

### H. File Input

Allows users to select files from their devices.

```html
<label for="resume">Upload Resume:</label>

<input type="file" id="resume" name="resume">
```

To allow multiple files:

```html
<input type="file" name="documents" multiple>
```

To restrict the selectable file types:

```html
<input type="file"
       name="resume"
       accept=".pdf,.doc,.docx">
```

For uploading files using a traditional HTML form, use:

```html
<form method="post" enctype="multipart/form-data">
```

### I. Range Input

Allows users to select a value from a specified range.

```html
<label for="volume">Volume:</label>

<input type="range"
       id="volume"
       name="volume"
       min="0"
       max="100"
       value="50">
```

### J. Hidden Input

Stores a value that is not displayed as a normal form control.

```html
<input type="hidden" name="userId" value="101">
```

Important: Hidden input values are not secure. Users can inspect and modify them using browser developer tools.

## 5. Label Element

The `<label>` element describes a form control.

It improves usability and accessibility because users can click the label to focus or activate its associated control.

### Example

```html
<label for="username">Username:</label>

<input
    type="text"
    id="username"
    name="username">
```

Here:
- `for="username"` connects the label to the input.
- `id="username"` identifies the input.
- Both values must match.

### Two Ways to Associate Labels

**Method 1: Using for and id**

```html
<label for="email">Email:</label>
<input type="email" id="email" name="email">
```

**Method 2: Wrapping the input**

```html
<label>
    Email:
    <input type="email" name="email">
</label>
```

Both methods are valid.

## 6. Important HTML Form Attributes

HTML provides several attributes to control form fields.

### A. Placeholder

Displays a hint inside the input field.

```html
<input
    type="text"
    placeholder="Enter your name">
```

Note: A placeholder should not replace a proper label.

### B. Required

Makes a form control mandatory.

```html
<input type="email" name="email" required>
```

### C. Value

Specifies the initial value of an input.

```html
<input type="text" name="username" value="Raj">
```

### D. Readonly

Prevents users from editing the field, but its value can still be submitted.

```html
<input type="text" name="username" value="Raj" readonly>
```

### E. Disabled

Disables the input field. Its value is not submitted with the form.

```html
<input type="text" name="username" disabled>
```

### F. Min and Max

Specifies minimum and maximum permitted values for applicable input types.

```html
<input type="number" min="18" max="60">
```

### G. Minlength and Maxlength

Specifies minimum and maximum text lengths.

```html
<input
    type="text"
    minlength="3"
    maxlength="20">
```

### H. Pattern

Specifies a regular expression that the input value must match.

```html
<input
    type="text"
    name="username"
    pattern="[A-Za-z]{3,15}"
    title="Enter 3 to 15 letters">
```

### I. Autocomplete

Controls whether the browser may suggest previously entered information.

```html
<input type="email" name="email" autocomplete="email">
```

### J. Autofocus

Automatically focuses a particular input when the page loads.

```html
<input type="text" name="username" autofocus>
```

## 7. HTML Form Validation

Form validation means checking whether user input meets specified requirements before accepting or processing the data.

HTML5 provides built-in client-side validation without requiring JavaScript.

### Common Validation Attributes

| Attribute | Purpose |
|---|---|
| `required` | Makes a field mandatory. |
| `min` | Specifies minimum numerical or date value. |
| `max` | Specifies maximum numerical or date value. |
| `minlength` | Specifies minimum text length. |
| `maxlength` | Specifies maximum text length. |
| `pattern` | Specifies a regular expression constraint. |
| `type="email"` | Checks basic email syntax. |
| `type="url"` | Checks basic URL syntax. |
| `step` | Specifies allowed numerical increments. |

### Example: Registration Form Validation

```html
<form action="/register" method="post">

    <label for="username">Username:</label>

    <input
        type="text"
        id="username"
        name="username"
        minlength="3"
        maxlength="15"
        required>

    <br><br>

    <label for="email">Email:</label>

    <input
        type="email"
        id="email"
        name="email"
        required>

    <br><br>

    <label for="age">Age:</label>

    <input
        type="number"
        id="age"
        name="age"
        min="18"
        max="60"
        required>

    <br><br>

    <button type="submit">Register</button>

</form>
```

The browser checks these constraints before allowing normal form submission.

Important:
Client-side validation can be bypassed. Always validate data again on the server.

## 8. Select and Textarea Elements

Forms also provide elements other than `<input>`.

### A. Select Element

The `<select>` element creates a dropdown list.

The `<option>` element defines individual choices.

Example:

```html
<label for="country">Select Country:</label>

<select id="country" name="country">

    <option value="">Choose Country</option>

    <option value="india">India</option>

    <option value="usa">USA</option>

    <option value="uk">UK</option>

</select>
```

Useful attributes:
- `multiple`: Allows selecting multiple options.
- `required`: Makes selection mandatory.
- `disabled`: Disables the dropdown.
- `selected`: Specifies the initially selected option.

### B. Textarea Element

The `<textarea>` element is used to accept multi-line text.

Example:

```html
<label for="message">Message:</label>

<textarea
    id="message"
    name="message"
    rows="5"
    cols="30"
    placeholder="Enter your message">
</textarea>
```

Common attributes:
- `rows`: Specifies the visible number of text rows.
- `cols`: Specifies the visible width in characters.
- `maxlength`: Limits the maximum number of characters.
- `required`: Makes the field mandatory.

## 9. Button Types in HTML

HTML provides three commonly used button types.

### A. Submit Button

Submits the form.

```html
<button type="submit">Submit</button>
```

### B. Reset Button

Resets form controls to their initial values.

```html
<button type="reset">Reset</button>
```

### C. Normal Button

Does not submit or reset the form by default.

It is commonly used with JavaScript.

```html
<button type="button" onclick="alert('Hello!')">
    Click Me
</button>
```

Important: A `<button>` inside a form defaults to submit behavior if its type is omitted. Specify the type explicitly to avoid accidental submissions.

## 10. Fieldset and Legend

The `<fieldset>` element groups related form controls.

The `<legend>` element provides a caption for that group.

Example:

```html
<form>

    <fieldset>

        <legend>Personal Details</legend>

        <label for="name">Name:</label>
        <input type="text" id="name" name="name">

        <br><br>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email">

    </fieldset>

</form>
```

Advantages:
- Groups related fields.
- Improves form organization.
- Helps users understand form sections.
- Provides useful grouping information to assistive technologies.

## 11. Form Submission and Form Data

When a user submits a form, the browser collects successful form controls and sends their name-value pairs to the specified destination.

Example:

```html
<form action="/login" method="post">

    <input
        type="text"
        name="username"
        value="raj">

    <input
        type="password"
        name="password"
        value="example">

    <button type="submit">Login</button>

</form>
```

The form data contains:

```text
username=raj
password=example
```

Important concepts:

- The `name` attribute identifies the submitted field.
- The `value` attribute provides its submitted value.
- Controls without a `name` are generally not included.
- Disabled controls are not submitted.
- Unchecked radio buttons and checkboxes are not submitted.

## 12. Complete Practical Example: Registration Form

The following example combines the important form concepts.

```html
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Registration Form</title>

</head>

<body>

    <h1>Student Registration</h1>

    <form action="/register"
          method="post">

        <fieldset>

            <legend>Personal Information</legend>

            <label for="name">Full Name:</label>

            <input
                type="text"
                id="name"
                name="name"
                required>

            <br><br>

            <label for="email">Email:</label>

            <input
                type="email"
                id="email"
                name="email"
                required>

            <br><br>

            <label for="password">Password:</label>

            <input
                type="password"
                id="password"
                name="password"
                minlength="8"
                required>

            <br><br>

            <label for="dob">Date of Birth:</label>

            <input
                type="date"
                id="dob"
                name="dob">

            <br><br>

            <p>Gender:</p>

            <input type="radio"
                   id="male"
                   name="gender"
                   value="male">

            <label for="male">Male</label>

            <input type="radio"
                   id="female"
                   name="gender"
                   value="female">

            <label for="female">Female</label>

        </fieldset>

        <br>

        <fieldset>

            <legend>Course Information</legend>

            <label for="course">Select Course:</label>

            <select id="course" name="course" required>

                <option value="">Choose Course</option>

                <option value="html">HTML</option>

                <option value="css">CSS</option>

                <option value="javascript">JavaScript</option>

            </select>

            <br><br>

            <p>Select Skills:</p>

            <input type="checkbox"
                   id="html"
                   name="skills"
                   value="html">

            <label for="html">HTML</label>

            <input type="checkbox"
                   id="css"
                   name="skills"
                   value="css">

            <label for="css">CSS</label>

            <input type="checkbox"
                   id="js"
                   name="skills"
                   value="javascript">

            <label for="js">JavaScript</label>

            <br><br>

            <label for="message">Additional Information:</label>

            <br>

            <textarea
                id="message"
                name="message"
                rows="4"
                cols="30">
            </textarea>

        </fieldset>

        <br>

        <button type="submit">Register</button>

        <button type="reset">Reset</button>

    </form>

</body>
</html>
```

Note: `/register` is an example server endpoint. The form needs a backend implementation to actually register students.
