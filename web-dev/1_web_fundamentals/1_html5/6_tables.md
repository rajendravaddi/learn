# HTML Tables

## 1. What are HTML Tables?

HTML tables are used to organize and display data in rows and columns.

They help present structured information in an easy-to-read format.

### Common Real-World Examples

- Student marks lists.
- Employee details.
- Product information.
- Monthly sales reports.
- Attendance records.
- Bank transaction histories.
- Pricing comparisons.

HTML provides specific elements to create and organize tables.

## 2. Basic HTML Table Structure

The `<table>` element is used to create an HTML table.

### Important Table Elements

| Tag | Purpose |
|---|---|
| `<table>` | Defines a table. |
| `<tr>` | Defines a table row. |
| `<th>` | Defines a header cell. |
| `<td>` | Defines a data cell. |
| `<thead>` | Groups header rows. |
| `<tbody>` | Groups the main body rows. |
| `<tfoot>` | Groups footer rows. |
| `<caption>` | Defines a table caption. |
| `<colgroup>` | Groups columns for formatting. |
| `<col>` | Specifies properties for one or more columns. |

### Basic Syntax

```html
<table>
    <tr>
        <th>Column 1</th>
        <th>Column 2</th>
    </tr>

    <tr>
        <td>Data 1</td>
        <td>Data 2</td>
    </tr>
</table>
```

Explanation:

- `<table>` creates the table.
- `<tr>` creates a row.
- `<th>` creates a header cell.
- `<td>` creates a normal data cell.

## 3. Creating a Basic HTML Table

### Example: Student Details

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Student Details</title>
</head>

<body>

    <h2>Student Details</h2>

    <table border="1">

        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Course</th>
        </tr>

        <tr>
            <td>101</td>
            <td>Raj</td>
            <td>22</td>
            <td>HTML</td>
        </tr>

        <tr>
            <td>102</td>
            <td>Rahul</td>
            <td>23</td>
            <td>CSS</td>
        </tr>

        <tr>
            <td>103</td>
            <td>Priya</td>
            <td>21</td>
            <td>JavaScript</td>
        </tr>

    </table>

</body>
</html>
```

### Output

| ID | Name | Age | Course |
|---:|---|---:|---|
| 101 | Raj | 22 | HTML |
| 102 | Rahul | 23 | CSS |
| 103 | Priya | 21 | JavaScript |

Note: The `border` attribute is obsolete in modern HTML. Use CSS to style table borders in actual projects.

## 4. Understanding Table Rows and Columns

Consider this example:

```html
<table>
    <tr>
        <th>Name</th>
        <th>Age</th>
    </tr>

    <tr>
        <td>Raj</td>
        <td>22</td>
    </tr>
</table>
```

In this example:

- There are 2 rows.
- There are 2 columns.
- The first row contains header cells.
- The second row contains data cells.

Important:
A table row is created using `<tr>`, and individual cells are created using `<th>` or `<td>`.

## 5. Difference Between TH and TD

### TH – Table Header

The `<th>` element represents a header cell.

Example:

```html
<th>Name</th>
```

Characteristics:

- Defines a header for a row or column.
- Usually displayed in bold and centered by default.
- Provides semantic information about table data.
- Can use the `scope` attribute to identify whether it is a row or column header.

### TD – Table Data

The `<td>` element represents a normal data cell.

Example:

```html
<td>Raj</td>
```

Characteristics:

- Contains regular table data.
- Does not represent a header by default.
- Usually displayed in normal font weight.

### Comparison

| TH | TD |
|---|---|
| Represents a header cell. | Represents a data cell. |
| Provides header semantics. | Contains ordinary data. |
| Can use `scope` to identify its relationship. | Does not normally use `scope`. |
| Example: `<th>Name</th>` | Example: `<td>Raj</td>` |

## 6. THEAD, TBODY, and TFOOT

HTML provides three elements to group different parts of a table.

### A. THEAD

The `<thead>` element groups the header rows of a table.

```html
<thead>
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Salary</th>
    </tr>
</thead>
```

### B. TBODY

The `<tbody>` element groups the main data rows.

```html
<tbody>
    <tr>
        <td>101</td>
        <td>Raj</td>
        <td>30000</td>
    </tr>

    <tr>
        <td>102</td>
        <td>Rahul</td>
        <td>35000</td>
    </tr>
</tbody>
```

### C. TFOOT

The `<tfoot>` element groups footer rows, commonly used for totals or summaries.

```html
<tfoot>
    <tr>
        <td colspan="2">Total Salary</td>
        <td>65000</td>
    </tr>
</tfoot>
```

### Complete Example

```html
<table border="1">

    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Salary</th>
        </tr>
    </thead>

    <tbody>
        <tr>
            <td>101</td>
            <td>Raj</td>
            <td>30000</td>
        </tr>

        <tr>
            <td>102</td>
            <td>Rahul</td>
            <td>35000</td>
        </tr>
    </tbody>

    <tfoot>
        <tr>
            <td colspan="2">Total Salary</td>
            <td>65000</td>
        </tr>
    </tfoot>

</table>
```

Advantages:

- Organizes table content.
- Improves readability.
- Helps browsers and assistive technologies understand table structure.
- Makes styling different table sections easier.

## 7. COLSPAN Attribute

The `colspan` attribute is used to make a cell span across multiple columns.

In simple words, it merges cells horizontally.

### Example

```html
<table border="1">

    <tr>
        <th colspan="2">Student Details</th>
    </tr>

    <tr>
        <td>101</td>
        <td>Raj</td>
    </tr>

</table>
```

Here:

- `colspan="2"` means the header cell spans two columns.
- The header occupies the width of both columns.

### Real-World Example

```html
<table border="1">

    <tr>
        <th colspan="3">Employee Information</th>
    </tr>

    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Department</th>
    </tr>

    <tr>
        <td>101</td>
        <td>Raj</td>
        <td>IT</td>
    </tr>

</table>
```

## 8. ROWSPAN Attribute

The `rowspan` attribute is used to make a cell span across multiple rows.

In simple words, it merges cells vertically.

### Example

```html
<table border="1">

    <tr>
        <th rowspan="2">HTML</th>
        <td>Student 1</td>
    </tr>

    <tr>
        <td>Student 2</td>
    </tr>

</table>
```

Here:

- `rowspan="2"` means the HTML cell occupies two rows.
- The cell extends vertically across both rows.

### Real-World Example

```html
<table border="1">

    <tr>
        <th rowspan="2">IT Department</th>
        <td>Raj</td>
    </tr>

    <tr>
        <td>Rahul</td>
    </tr>

    <tr>
        <th rowspan="2">HR Department</th>
        <td>Priya</td>
    </tr>

    <tr>
        <td>Neha</td>
    </tr>

</table>
```

## 9. Difference Between COLSPAN and ROWSPAN

| COLSPAN | ROWSPAN |
|---|---|
| Merges cells horizontally. | Merges cells vertically. |
| Spans multiple columns. | Spans multiple rows. |
| Uses `colspan` attribute. | Uses `rowspan` attribute. |
| Example: `colspan="2"` | Example: `rowspan="2"` |

Remember:

- COLSPAN = Columns = Horizontal.
- ROWSPAN = Rows = Vertical.

## 10. CAPTION Element

The `<caption>` element provides a title or description for a table.

It should be placed immediately after the opening `<table>` tag.

Example:

```html
<table border="1">

    <caption>Employee Details</caption>

    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Salary</th>
    </tr>

    <tr>
        <td>101</td>
        <td>Raj</td>
        <td>30000</td>
    </tr>

</table>
```

Advantages:

- Provides a meaningful table title.
- Helps users understand the table's purpose.
- Improves accessibility.

## 11. SCOPE Attribute

The `scope` attribute specifies whether a table header applies to a row, column, row group, or column group.

Common values:

| Value | Purpose |
|---|---|
| `col` | Header applies to a column. |
| `row` | Header applies to a row. |
| `colgroup` | Header applies to a group of columns. |
| `rowgroup` | Header applies to a group of rows. |

### Example

```html
<table border="1">

    <tr>
        <th scope="col">Name</th>
        <th scope="col">Age</th>
        <th scope="col">Course</th>
    </tr>

    <tr>
        <th scope="row">Raj</th>
        <td>22</td>
        <td>HTML</td>
    </tr>

</table>
```

Here:

- Column headers identify the meaning of each column.
- The row header identifies the student represented by that row.

The `scope` attribute helps assistive technologies associate header cells with their corresponding data.

## 12. COLGROUP and COL Elements

The `<colgroup>` element groups columns in a table.

The `<col>` element specifies properties for one or more columns.

They are commonly used to apply CSS to particular columns.

Example:

```html
<table border="1">

    <colgroup>
        <col style="background-color: lightblue;">
        <col style="background-color: lightyellow;">
        <col>
    </colgroup>

    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Age</th>
    </tr>

    <tr>
        <td>101</td>
        <td>Raj</td>
        <td>22</td>
    </tr>

</table>
```

Important:
- `<colgroup>` groups column definitions.
- `<col>` represents one or more columns.
- These elements appear before the table row groups.

## 13. Styling HTML Tables Using CSS

In modern web development, CSS is used to style tables instead of obsolete HTML presentation attributes.

### Example

```html
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <title>Styled Table</title>

    <style>

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            border: 1px solid black;
            padding: 10px;
            text-align: left;
        }

        th {
            background-color: lightblue;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }

    </style>

</head>

<body>

    <h2>Employee Details</h2>

    <table>

        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>101</td>
                <td>Raj</td>
                <td>IT</td>
            </tr>

            <tr>
                <td>102</td>
                <td>Rahul</td>
                <td>HR</td>
            </tr>

            <tr>
                <td>103</td>
                <td>Priya</td>
                <td>Finance</td>
            </tr>
        </tbody>

    </table>

</body>
</html>
```

### Important CSS Properties for Tables

| Property | Purpose |
|---|---|
| `width` | Controls table width. |
| `border` | Adds borders. |
| `border-collapse` | Controls whether adjacent borders are merged. |
| `padding` | Adds space inside cells. |
| `text-align` | Aligns text horizontally. |
| `vertical-align` | Aligns content vertically. |
| `background-color` | Sets background color. |
| `border-spacing` | Controls spacing between cell borders when borders are separate. |
| `table-layout` | Controls table column layout algorithm. |
| `caption-side` | Controls caption placement. |

## 14. Responsive HTML Tables

Responsive tables are designed to work on different screen sizes, including mobile devices.

A wide table may overflow on smaller screens.

One simple solution is to place the table inside a container with horizontal scrolling.

Example:

```html
<style>
    .table-container {
        width: 100%;
        overflow-x: auto;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        border: 1px solid black;
        padding: 10px;
    }
</style>

<div class="table-container">

    <table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
        </tr>

        <tr>
            <td>101</td>
            <td>Raj</td>
            <td>raj@example.com</td>
            <td>IT</td>
        </tr>
    </table>

</div>
```

The `overflow-x: auto` property allows horizontal scrolling when the table is wider than its container.

## 15. Table Accessibility Best Practices

Accessibility is important when creating tables.

Follow these practices:

1. Use `<caption>` to describe the purpose of the table.
2. Use `<th>` for header cells.
3. Use `scope="col"` for column headers.
4. Use `scope="row"` for row headers.
5. Use `<thead>`, `<tbody>`, and `<tfoot>` appropriately.
6. Keep table structures logical and understandable.
7. Avoid using tables for webpage layout.
8. Provide clear column headings.

### Accessible Table Example

```html
<table>

    <caption>Student Examination Results</caption>

    <thead>
        <tr>
            <th scope="col">Student ID</th>
            <th scope="col">Student Name</th>
            <th scope="col">Marks</th>
        </tr>
    </thead>

    <tbody>
        <tr>
            <th scope="row">101</th>
            <td>Raj</td>
            <td>85</td>
        </tr>

        <tr>
            <th scope="row">102</th>
            <td>Rahul</td>
            <td>90</td>
        </tr>
    </tbody>

</table>
```

## 16. HTML Tables vs CSS Layout

HTML tables should be used for displaying tabular data, not for creating the entire webpage layout.

| HTML Tables | CSS Layout |
|---|---|
| Used for structured data. | Used for page layout and positioning. |
| Organizes information into rows and columns. | Organizes webpage components. |
| Uses `<table>`, `<tr>`, `<td>`, etc. | Uses Flexbox, Grid, and other CSS layout techniques. |
| Suitable for reports and data grids. | Suitable for headers, navigation, cards, and page sections. |

Example:

- Student marks → HTML table.
- Website navigation → CSS Flexbox or Grid.
- Product cards → CSS Grid.
- Dashboard statistics → CSS Grid or Flexbox.
