# Stack – Patterns

## 1. Monotonic Stack

### 1.1 Introduction

A Monotonic Stack is a stack in which elements are maintained in a specific sorted order.

Unlike a normal stack, where elements can be pushed and popped without maintaining any ordering, a monotonic stack follows one of two ordering rules:

1. Monotonically Increasing Stack
2. Monotonically Decreasing Stack

Monotonic stacks are especially useful for solving problems involving:

- Next Greater Element
- Previous Greater Element
- Next Smaller Element
- Previous Smaller Element
- Largest Rectangle in Histogram
- Stock Span
- Daily Temperatures
- Trapping Rain Water

### 1.2 Monotonically Increasing Stack

A Monotonically Increasing Stack maintains elements in increasing order from bottom to top.

Example:

```text
Bottom → [2, 4, 6, 8] ← Top
```

Each element is greater than or equal to the element below it.

When inserting a new element, we remove elements from the top that violate the required order.

Example:

Current stack:

```text
[2, 4, 6]
```

Insert `5`.

Since `6 > 5`, remove `6`.

Updated stack:

```text
[2, 4, 5]
```

### 1.3 Monotonically Decreasing Stack

A Monotonically Decreasing Stack maintains elements in decreasing order from bottom to top.

Example:

```text
Bottom → [9, 7, 5, 3] ← Top
```

Each element is smaller than or equal to the element below it.

Example:

Current stack:

```text
[9, 7, 5]
```

Insert `6`.

Since `5 < 6`, remove `5`.

Updated stack:

```text
[9, 7, 6]
```

### 1.4 Python Implementation

Monotonic increasing stack:

```python
def increasing_stack(arr):

    stack = []

    for num in arr:

        while stack and stack[-1] > num:
            stack.pop()

        stack.append(num)

    return stack


print(increasing_stack([2, 4, 6, 5, 8]))

# Output:
# [2, 4, 5, 8]
```

Monotonic decreasing stack:

```python
def decreasing_stack(arr):

    stack = []

    for num in arr:

        while stack and stack[-1] < num:
            stack.pop()

        stack.append(num)

    return stack


print(decreasing_stack([9, 7, 5, 6, 3]))

# Output:
# [9, 7, 6, 3]
```

**Important:** These examples maintain the ordering of values, not indices. In most interview problems, storing indices instead of values is more useful because indices help us access elements, calculate distances, and handle duplicate values.

### 1.5 Complexity Analysis

For an array of n elements:

- Time Complexity: O(n).
- Space Complexity: O(n).

Although there is a nested `while` loop, every element is pushed once and popped at most once.

Therefore, the total number of stack operations is O(n).

This is an example of amortized analysis.

---

## 2. Matching Pairs

### 2.1 Introduction

Matching Pairs is a pattern where we use a stack to identify relationships between elements.

It is commonly used when elements must be matched in a particular order.

Examples:

- Opening and closing parentheses.
- Opening and closing HTML tags.
- Nested brackets.
- Matching delimiters.
- Nested structures.

### 2.2 Basic Idea

Whenever we encounter an opening element:

- Push it onto the stack.

Whenever we encounter a corresponding closing element:

- Check the top of the stack.
- If it matches, pop it.
- Otherwise, the structure is invalid.

Example:

```text
Expression: {[()]}
```

Processing:

| Character | Operation | Stack |
|---|---|---|
| `{` | Push | `{` |
| `[` | Push | `{ [` |
| `(` | Push | `{ [ (` |
| `)` | Match and pop | `{ [` |
| `]` | Match and pop | `{` |
| `}` | Match and pop | Empty |

Result: Balanced.

### 2.3 Matching HTML Tags

The same idea can be extended to nested structures.

Example:

```html
<div>
    <p>
        <span>Hello</span>
    </p>
</div>
```

We can use a stack to track opening tags and ensure that closing tags match the most recently opened tag.

**Note:** Real HTML parsing has additional rules for void elements, optional closing tags, and malformed markup. A complete HTML parser should be used for production HTML.

### 2.4 Complexity Analysis

For n elements:

- Time Complexity: O(n), assuming constant-time matching.
- Space Complexity: O(n) in the worst case.

---

## 3. Previous Greater Element (PGE)

### 3.1 Introduction

Given an array, find the nearest element to the left of each element that is greater than the current element.

If no such element exists, return `-1`.

Example:

```text
Array:
[10, 4, 2, 20, 40, 12, 30]
```

Result:

```text
Previous Greater:
[-1, 10, 4, -1, -1, 40, 40]
```

Explanation:

| Element | Previous Greater |
|---|---|
| 10 | -1 |
| 4 | 10 |
| 2 | 4 |
| 20 | -1 |
| 40 | -1 |
| 12 | 40 |
| 30 | 40 |

### 3.2 Why Use a Stack?

A brute-force approach checks all previous elements for every element.

Time Complexity: O(n²).

A monotonic stack can solve this in O(n).

We use a decreasing stack of indices.

### 3.3 Algorithm

1. Initialize an empty stack.
2. Traverse the array from left to right.
3. For the current element:
   - Remove elements from the stack while the top element is smaller than or equal to the current element.
4. If the stack is empty, the previous greater element does not exist.
5. Otherwise, the top element represents the previous greater element.
6. Push the current index onto the stack.

### 3.4 Python Implementation

```python
def previous_greater(arr):

    stack = []
    result = []

    for num in arr:

        while stack and stack[-1] <= num:
            stack.pop()

        if stack:
            result.append(stack[-1])
        else:
            result.append(-1)

        stack.append(num)

    return result


arr = [10, 4, 2, 20, 40, 12, 30]

print(previous_greater(arr))

# [-1, 10, 4, -1, -1, 40, 40]
```

### 3.5 Complexity Analysis

- Time Complexity: O(n).
- Space Complexity: O(n).

---

## 4. Previous Smaller Element (PSE)

### 4.1 Introduction

Given an array, find the nearest element to the left of each element that is smaller than the current element.

If no such element exists, return `-1`.

Example:

```text
Array:
[4, 5, 2, 10, 8]
```

Result:

```text
Previous Smaller:
[-1, 4, -1, 2, 2]
```

### 4.2 Algorithm

1. Initialize an empty stack.
2. Traverse the array from left to right.
3. For each element:
   - Remove elements from the stack while the top element is greater than or equal to the current element.
4. If the stack is empty, return `-1`.
5. Otherwise, the top element is the previous smaller element.
6. Push the current element.

### 4.3 Python Implementation

```python
def previous_smaller(arr):

    stack = []
    result = []

    for num in arr:

        while stack and stack[-1] >= num:
            stack.pop()

        if stack:
            result.append(stack[-1])
        else:
            result.append(-1)

        stack.append(num)

    return result


arr = [4, 5, 2, 10, 8]

print(previous_smaller(arr))

# [-1, 4, -1, 2, 2]
```

### 4.4 Complexity Analysis

- Time Complexity: O(n).
- Space Complexity: O(n).

---

## 5. Next Greater Element (NGE)

### 5.1 Introduction

Given an array, find the nearest element to the right of each element that is greater than the current element.

If no such element exists, return `-1`.

Example:

```text
Array:
[4, 5, 2, 10, 8]
```

Result:

```text
Next Greater:
[5, 10, 10, -1, -1]
```

Explanation:

| Element | Next Greater |
|---|---|
| 4 | 5 |
| 5 | 10 |
| 2 | 10 |
| 10 | -1 |
| 8 | -1 |

### 5.2 Why Traverse From Right to Left?

We need to find the next greater element on the right.

Therefore, we process the array from right to left.

We maintain a decreasing stack of candidate values.

### 5.3 Algorithm

1. Initialize an empty stack.
2. Initialize a result array with `-1`.
3. Traverse the input array from right to left.
4. For each element:
   - Remove elements from the stack while the top element is less than or equal to the current element.
5. If the stack is not empty, its top element is the next greater element.
6. Push the current element onto the stack.

### 5.4 Python Implementation

```python
def next_greater(arr):

    n = len(arr)

    stack = []
    result = [-1] * n

    for i in range(n - 1, -1, -1):

        while stack and stack[-1] <= arr[i]:
            stack.pop()

        if stack:
            result[i] = stack[-1]

        stack.append(arr[i])

    return result


arr = [4, 5, 2, 10, 8]

print(next_greater(arr))

# [5, 10, 10, -1, -1]
```

### 5.5 Complexity Analysis

- Time Complexity: O(n).
- Space Complexity: O(n).

---

## 6. Next Smaller Element (NSE)

### 6.1 Introduction

Given an array, find the nearest element to the right of each element that is smaller than the current element.

If no such element exists, return `-1`.

Example:

```text
Array:
[4, 8, 2, 10, 6]
```

Result:

```text
Next Smaller:
[2, 2, -1, 6, -1]
```

### 6.2 Algorithm

1. Initialize an empty stack.
2. Initialize a result array with `-1`.
3. Traverse the array from right to left.
4. For each element:
   - Remove elements from the stack while the top element is greater than or equal to the current element.
5. If the stack is not empty, its top element is the next smaller element.
6. Push the current element onto the stack.

### 6.3 Python Implementation

```python
def next_smaller(arr):

    n = len(arr)

    stack = []
    result = [-1] * n

    for i in range(n - 1, -1, -1):

        while stack and stack[-1] >= arr[i]:
            stack.pop()

        if stack:
            result[i] = stack[-1]

        stack.append(arr[i])

    return result


arr = [4, 8, 2, 10, 6]

print(next_smaller(arr))

# [2, 2, -1, 6, -1]
```

### 6.4 Complexity Analysis

- Time Complexity: O(n).
- Space Complexity: O(n).

---

## 7. Important Comparison: Previous and Next Elements

This is one of the most important tables to remember.

| Pattern | Direction | Stack Ordering | Pop Condition |
|---|---|---|---|
| Previous Greater | Left to Right | Decreasing | Top <= Current |
| Previous Smaller | Left to Right | Increasing | Top >= Current |
| Next Greater | Right to Left | Decreasing | Top <= Current |
| Next Smaller | Right to Left | Increasing | Top >= Current |

**Remember:**

- Previous → Traverse Left to Right.
- Next → Traverse Right to Left.
- Greater → Remove smaller or equal candidates.
- Smaller → Remove greater or equal candidates.

The equality condition matters when duplicates exist. The four implementations above find strictly greater or strictly smaller elements.

---

## 8. Stack for Nested Structures

### 8.1 Introduction

Nested structures occur when one structure is placed inside another.

Examples:

- Nested parentheses.
- Nested arrays.
- Nested JSON objects.
- Nested function calls.
- Nested expressions.
- HTML/XML tags.

Stacks are ideal for managing nested structures because the most recently opened structure must be completed first.

### 8.2 Example: Nested List Flattening

Consider:

```python
arr = [1, [2, [3, 4], 5], 6]
```

Expected result:

```python
[1, 2, 3, 4, 5, 6]
```

We can use an explicit stack to flatten the nested list.

### 8.3 Python Implementation

```python
def flatten(arr):

    stack = [arr]
    result = []

    while stack:

        current = stack.pop()

        if isinstance(current, list):

            for item in reversed(current):
                stack.append(item)

        else:
            result.append(current)

    return result


arr = [1, [2, [3, 4], 5], 6]

print(flatten(arr))

# [1, 2, 3, 4, 5, 6]
```

### 8.4 Why Do We Use reversed()?

A stack follows LIFO.

If we push elements in their original order, they will be processed in reverse order.

By pushing elements in reverse order, we preserve the original left-to-right traversal.

### 8.5 Complexity Analysis

Let n be the total number of elements, including nested lists.

- Time Complexity: O(n).
- Auxiliary Space Complexity: O(n) in the worst case.

---

## 9. Stack + Greedy

### 9.1 Introduction

Greedy algorithms make locally optimal decisions at each step.

Sometimes, a stack helps us make these decisions while maintaining the possibility of producing an optimal final result.

This combination is called Stack + Greedy.

Common applications:

- Remove K Digits.
- Remove Duplicate Letters.
- Smallest Subsequence of Distinct Characters.
- Lexicographically Smallest String.
- Construct the Smallest Number.

### 9.2 Example: Remove K Digits

Problem:

Given a number represented as a string and an integer k, remove exactly k digits to produce the smallest possible number.

Example:

```text
num = "1432219"
k = 3
```

Expected result:

```text
"1219"
```

### 9.3 Greedy Strategy

We want smaller digits to appear earlier.

While processing digits from left to right:

1. Maintain a monotonic increasing stack.
2. If the current digit is smaller than the stack's top digit, remove the top digit.
3. Continue removing larger digits while we still have removals available.
4. Push the current digit.
5. If removals remain after processing all digits, remove digits from the end.
6. Remove leading zeros.
7. If the result is empty, return `"0"`.

### 9.4 Python Implementation

```python
def remove_k_digits(num, k):

    stack = []

    for digit in num:

        while stack and k > 0 and stack[-1] > digit:
            stack.pop()
            k -= 1

        stack.append(digit)

    # Remove remaining digits from the end
    while k > 0:
        stack.pop()
        k -= 1

    # Remove leading zeros
    result = ''.join(stack).lstrip('0')

    return result if result else "0"


print(remove_k_digits("1432219", 3))
# "1219"

print(remove_k_digits("10200", 1))
# "200"

print(remove_k_digits("10", 2))
# "0"
```

### 9.5 Complexity Analysis

For n digits:

- Time Complexity: O(n).
- Space Complexity: O(n).

Each digit is pushed once and popped at most once.
