#  Stack

## 1. What is a Stack?

A **Stack** is a linear data structure that follows the **LIFO (Last In, First Out)** principle.

This means:
- The element inserted last is the first element to be removed.
- The element inserted first is the last element to be removed.
- Insertion and deletion happen at the same end, called the **Top** of the stack.

**Real-world examples:**
- A stack of plates: The last plate placed on top is removed first.
- Browser history: Recently visited pages can be revisited first when navigating backward.
- Undo operations: The most recent operation is undone first.
- Function calls: The most recently called function completes before its caller resumes.

### Understanding LIFO

Consider inserting the following elements:

`10 → 20 → 30 → 40`

After inserting all elements, the stack looks like:

```text
       TOP
        |
      +----+
      | 40 |  ← Last inserted
      +----+
      | 30 |
      +----+
      | 20 |
      +----+
      | 10 |  ← First inserted
      +----+
```

Now, if we remove an element, `40` will be removed first.

The remaining stack:

```text
       TOP
        |
      +----+
      | 30 |
      +----+
      | 20 |
      +----+
      | 10 |
      +----+
```

This demonstrates the LIFO principle.

---

## 2. Basic Stack Operations

A stack primarily supports the following operations:

### 2.1 Push

**Definition:** Push is the operation used to insert an element into the stack.

- The new element is always inserted at the top.
- The top position is updated to point to the newly inserted element.

Example:

```text
Initial Stack:

      TOP
       |
     +----+
     | 20 |
     +----+
     | 10 |
     +----+

Operation: PUSH(30)

Updated Stack:

      TOP
       |
     +----+
     | 30 |
     +----+
     | 20 |
     +----+
     | 10 |
     +----+
```

### 2.2 Pop

**Definition:** Pop is the operation used to remove the topmost element from the stack.

- Only the top element can be removed.
- After removal, the top position moves to the next element.
- The removed element is generally returned.

Example:

```text
Initial Stack:

      TOP
       |
     +----+
     | 30 |
     +----+
     | 20 |
     +----+
     | 10 |
     +----+

Operation: POP()

Removed Element: 30

Updated Stack:

      TOP
       |
     +----+
     | 20 |
     +----+
     | 10 |
     +----+
```

### 2.3 Peek (Top)

**Definition:** Peek is the operation used to access the topmost element without removing it.

- Returns the current top element.
- Does not modify the stack.
- Useful when we need to inspect the next element that would be removed.

Example:

```text
Stack:

      TOP
       |
     +----+
     | 30 |
     +----+
     | 20 |
     +----+
     | 10 |
     +----+

Operation: PEEK()

Result: 30

Stack remains unchanged.
```

### 2.4 isEmpty

**Definition:** Checks whether the stack contains any elements.

- Returns `True` if the stack is empty.
- Returns `False` otherwise.

Example:

```python
stack = []

print(len(stack) == 0)  # True

stack.append(10)

print(len(stack) == 0)  # False
```

### 2.5 Size

**Definition:** Returns the total number of elements currently present in the stack.

Example:

```python
stack = [10, 20, 30]

print(len(stack))  # 3
```

### 2.6 isFull (Concept)

**Definition:** Checks whether a stack has reached its maximum capacity.

- Mainly relevant to fixed-size stack implementations.
- A dynamically growing stack generally does not have a predefined maximum capacity.
- In Python lists, memory limitations are the practical constraint rather than a user-defined stack capacity.

---

## 3. Stack Implementation

A stack is an abstract data type (ADT).

This means a stack defines **what operations are supported and how they behave**, rather than requiring one particular implementation.

A stack can be implemented using:
1. Arrays
2. Linked Lists
3. Python Lists
4. Python `collections.deque`

---

## 4. Python List as a Stack

Python's built-in `list` can be used to implement a stack.

We use:
- `append()` for Push.
- `pop()` for Pop.
- `stack[-1]` for Peek.
- `len(stack) == 0` for checking whether the stack is empty.
- `len(stack)` for checking the size.

### 4.1 Creating a Stack

```python
stack = []
```

Initially, the stack is empty.

### 4.2 Push Operation

Use `append()` to insert an element at the top.

```python
stack = []

stack.append(10)
stack.append(20)
stack.append(30)

print(stack)

# Output:
# [10, 20, 30]
```

Here, `30` is the topmost element.

Python lists store elements in insertion order, so the rightmost element represents the top of our stack.

### 4.3 Pop Operation

Use `pop()` to remove and return the topmost element.

```python
stack = [10, 20, 30]

removed = stack.pop()

print(removed)  # 30
print(stack)    # [10, 20]
```

**Important:** Calling `pop()` on an empty list raises an `IndexError`.

Therefore, check whether the stack is empty before popping when necessary.

```python
if stack:
    removed = stack.pop()
else:
    print("Stack Underflow")
```

### 4.4 Peek Operation

Use `stack[-1]` to access the topmost element without removing it.

```python
stack = [10, 20, 30]

top = stack[-1]

print(top)    # 30
print(stack)  # [10, 20, 30]
```

**Important:** Accessing `stack[-1]` on an empty list raises an `IndexError`.

Safe implementation:

```python
if stack:
    print(stack[-1])
else:
    print("Stack is empty")
```

### 4.5 Checking Whether Stack Is Empty

```python
stack = []

if not stack:
    print("Stack is empty")
else:
    print("Stack is not empty")
```

Python treats an empty list as `False` and a non-empty list as `True`.

### 4.6 Getting Stack Size

```python
stack = [10, 20, 30, 40]

print(len(stack))  # 4
```

### 4.7 Complete Stack Implementation Using Python List

```python
class Stack:

    def __init__(self):
        self.items = []

    def push(self, value):
        self.items.append(value)

    def pop(self):
        if self.is_empty():
            raise IndexError("Stack Underflow")

        return self.items.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("Stack is empty")

        return self.items[-1]

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)


# Creating a stack
stack = Stack()

# Push operations
stack.push(10)
stack.push(20)
stack.push(30)

print(stack.peek())      # 30
print(stack.pop())       # 30
print(stack.peek())      # 20
print(stack.size())      # 2
print(stack.is_empty())  # False
```

---

## 5. Using collections.deque as a Stack

Python provides `collections.deque`, which stands for **Double-Ended Queue**.

It is a data structure that supports efficient insertion and deletion at both ends.

Although deque supports operations at both ends, we can restrict ourselves to one end and use it as a stack.

### 5.1 Importing deque

```python
from collections import deque

stack = deque()
```

### 5.2 Push Operation

Use `append()` to insert an element at the right end.

```python
stack.append(10)
stack.append(20)
stack.append(30)

print(stack)

# Output:
# deque([10, 20, 30])
```

### 5.3 Pop Operation

Use `pop()` to remove the rightmost element.

```python
removed = stack.pop()

print(removed)  # 30
print(stack)    # deque([10, 20])
```

### 5.4 Peek Operation

Use `stack[-1]` to access the topmost element.

```python
stack = deque([10, 20, 30])

print(stack[-1])  # 30
```

### 5.5 Checking Whether Stack Is Empty

```python
if not stack:
    print("Stack is empty")
else:
    print("Stack is not empty")
```

### 5.6 Complete Stack Implementation Using deque

```python
from collections import deque

class Stack:

    def __init__(self):
        self.items = deque()

    def push(self, value):
        self.items.append(value)

    def pop(self):
        if self.is_empty():
            raise IndexError("Stack Underflow")

        return self.items.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("Stack is empty")

        return self.items[-1]

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)


stack = Stack()

stack.push(10)
stack.push(20)
stack.push(30)

print(stack.peek())      # 30
print(stack.pop())       # 30
print(stack.size())      # 2
print(stack.is_empty())  # False
```

---

## 6. Python List vs collections.deque

Both Python lists and deques can implement stacks efficiently.

However, there are some differences.

| Feature | Python List | collections.deque |
|---|---|---|
| Push | `append()` | `append()` |
| Pop | `pop()` | `pop()` |
| Peek | `stack[-1]` | `stack[-1]` |
| Access at index | O(1) | O(n) |
| Append at right | Amortized O(1) | O(1) |
| Pop from right | O(1) | O(1) |
| Append at left | O(n) | O(1) |
| Pop from left | O(n) | O(1) |
| Memory organization | Dynamic array | Linked blocks |
| Random access | Efficient | Less efficient |

**Which one should we use?**

- **Python List:** A great default choice when implementing a stack because we only need operations at the end.
- **collections.deque:** Useful when we need efficient insertion and deletion at both ends, or when the same structure may also be used as a queue.

For typical stack-based DSA problems, both are valid choices.

---

## 7. Stack Overflow and Stack Underflow

These are two important conditions associated with stack operations.

### 7.1 Stack Overflow

**Definition:** Stack Overflow occurs when we try to insert an element into a stack that has reached its maximum capacity.

Example:

Suppose a stack has a maximum capacity of 3.

```text
      TOP
       |
     +----+
     | 30 |
     +----+
     | 20 |
     +----+
     | 10 |
     +----+
```

Trying to execute `PUSH(40)` results in Stack Overflow.

**Note:** This concept is particularly relevant to fixed-capacity stack implementations. A normal Python list or deque grows dynamically, subject to available memory.

### 7.2 Stack Underflow

**Definition:** Stack Underflow occurs when we try to remove an element from an empty stack.

Example:

```python
stack = []

stack.pop()
```

This raises:

```text
IndexError: pop from empty list
```

To prevent underflow, check whether the stack is empty before performing the pop operation.


## 8. Applications of Stack

Stacks are widely used in computer science and software development.

Some important applications include:

1. **Function Call Management**
   - Function calls are managed using the call stack.
   - Each function call creates a stack frame containing information such as local variables and return addresses.

2. **Recursion**
   - Recursive function calls are managed through the call stack.
   - Each recursive call adds a new stack frame.

3. **Parentheses Matching**
   - Used to check whether brackets are properly balanced.
   - Example: `({[]})`.

4. **Expression Evaluation**
   - Used to evaluate arithmetic expressions.
   - Example: Postfix expression evaluation.

5. **Expression Conversion**
   - Used to convert infix expressions into postfix or prefix expressions.

6. **Undo and Redo Operations**
   - Editors use stacks to track recent operations.

7. **Browser History**
   - Stack-like behavior can be used to implement backward navigation.

8. **Depth-First Search (DFS)**
   - Stack can be used to traverse graphs and trees iteratively.

9. **Backtracking**
   - Used to remember previous states and return to them when necessary.

10. **Syntax Parsing**
    - Compilers and interpreters use stacks when processing nested structures and expressions.