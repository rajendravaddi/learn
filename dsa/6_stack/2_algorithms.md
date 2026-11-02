# Algorithms / Techniques

## 1. Parentheses Matching (Balanced Parentheses)

### 1.1 Introduction

Parentheses Matching is one of the most fundamental applications of a stack.

The objective is to determine whether brackets in a given expression are properly balanced and correctly nested.

There are three common types of brackets:

- `()` – Parentheses
- `{}` – Curly braces
- `[]` – Square brackets

### 1.2 What Does Balanced Mean?

An expression is balanced if:

1. Every opening bracket has a corresponding closing bracket.
2. Every opening bracket is closed by the correct type of bracket.
3. Brackets are closed in the correct order.
4. No unmatched opening or closing brackets remain.

**Examples:**

| Expression | Result | Reason |
|---|---|---|
| `()` | Balanced | Correct pair |
| `[]` | Balanced | Correct pair |
| `{}` | Balanced | Correct pair |
| `({[]})` | Balanced | Correct nesting |
| `([{}])` | Balanced | Correct nesting |
| `((` | Not balanced | Missing closing brackets |
| `())` | Not balanced | Extra closing bracket |
| `([)]` | Not balanced | Incorrect nesting |
| `{[}` | Not balanced | Incorrect matching |

### 1.3 Why Do We Need a Stack?

Consider this expression:

```text
{ [ ( ) ] }
```

When we encounter an opening bracket, we need to remember it until its corresponding closing bracket appears.

However, the most recently opened bracket must be closed first.

This is exactly the LIFO behavior of a stack.

Therefore:
- Opening bracket → Push into stack.
- Closing bracket → Check the top element and pop if it matches.
- At the end → Stack must be empty.

### 1.4 Algorithm

1. Initialize an empty stack.
2. Traverse the expression character by character.
3. If the current character is an opening bracket, push it onto the stack.
4. If it is a closing bracket:
   - If the stack is empty, return `False`.
   - Check whether the top element is its corresponding opening bracket.
   - If it does not match, return `False`.
   - Otherwise, pop the top element.
5. After processing all characters:
   - If the stack is empty, return `True`.
   - Otherwise, return `False`.

### 1.5 Python Implementation

```python
def is_balanced(expression):

    stack = []

    pairs = {
        ')': '(',
        '}': '{',
        ']': '['
    }

    for char in expression:

        if char in "({[":
            stack.append(char)

        elif char in ")}]":

            if not stack:
                return False

            if stack[-1] != pairs[char]:
                return False

            stack.pop()

    return len(stack) == 0


print(is_balanced("({[]})"))  # True
print(is_balanced("([)]"))    # False
print(is_balanced("((()))"))  # True
print(is_balanced("(()"))     # False
```

**Note:** This implementation ignores non-bracket characters. It checks bracket balance rather than validating the syntax of an entire programming expression.

### 1.6 Dry Run

Expression:

```text
{ [ ( ) ] }
```

| Character | Operation | Stack |
|---|---|---|
| `{` | Push | `{` |
| `[` | Push | `{ [` |
| `(` | Push | `{ [ (` |
| `)` | Match and pop | `{ [` |
| `]` | Match and pop | `{` |
| `}` | Match and pop | Empty |

Final stack is empty.

Result: `True`

### 1.7 Complexity Analysis

- Time Complexity: O(n), where n is the expression length.
- Space Complexity: O(n) in the worst case, when all characters are opening brackets.

---

## 2. Expression Evaluation

### 2.1 Introduction

Expression evaluation means calculating the result of an arithmetic expression.

For example:

```text
5 + 3 * 2
```

Result:

```text
11
```

Stacks are commonly used to evaluate arithmetic expressions, particularly postfix and prefix expressions.

There are three major expression notations:

1. Infix
2. Prefix
3. Postfix

### 2.2 Infix Expression

In infix notation, the operator appears between the operands.

Examples:

```text
A + B
A * B
A + B * C
```

This is the notation we commonly use in mathematics.

### 2.3 Prefix Expression

In prefix notation, the operator appears before the operands.

Examples:

```text
+ A B
* A B
+ A * B C
```

Example:

```text
Infix:  A + B
Prefix: + A B
```

### 2.4 Postfix Expression

In postfix notation, the operator appears after the operands.

Examples:

```text
A B +
A B *
A B C * +
```

Example:

```text
Infix:   A + B
Postfix: A B +
```

Postfix expressions are also called Reverse Polish Notation (RPN).

### 2.5 Why Use Stacks for Expression Evaluation?

In arithmetic expressions, operators may have different precedence levels and parentheses may change the evaluation order.

Stacks help us manage operands and operators in a controlled manner.

For postfix evaluation, we can directly process operands and operators using a single stack.

### 2.6 Evaluating a Postfix Expression

**Algorithm:**

1. Initialize an empty stack.
2. Traverse the postfix expression from left to right.
3. If the current token is an operand, push it onto the stack.
4. If the current token is an operator:
   - Pop the second operand.
   - Pop the first operand.
   - Perform the operation.
   - Push the result back onto the stack.
5. After processing all tokens, the stack should contain exactly one element.
6. That element is the final result.

**Important:** Operand order matters for subtraction and division.

For example:

```text
Postfix: 8 2 -
```

Pop `2` first, then `8`.

Calculate:

```text
8 - 2 = 6
```

Not `2 - 8`.

### 2.7 Python Implementation – Postfix Evaluation

```python
def evaluate_postfix(expression):

    stack = []

    for token in expression.split():

        if token.lstrip('-').isdigit():
            stack.append(int(token))

        else:

            b = stack.pop()
            a = stack.pop()

            if token == '+':
                result = a + b

            elif token == '-':
                result = a - b

            elif token == '*':
                result = a * b

            elif token == '/':
                result = int(a / b)

            else:
                raise ValueError("Invalid operator")

            stack.append(result)

    if len(stack) != 1:
        raise ValueError("Invalid postfix expression")

    return stack.pop()


print(evaluate_postfix("5 3 2 * +"))  # 11
print(evaluate_postfix("8 2 -"))      # 6
print(evaluate_postfix("10 2 /"))     # 5
```

This implementation uses integer operands and truncates division toward zero.

For production-quality expression parsing, additional validation and support for decimals, exponentiation, and other operators would be needed.

### 2.8 Dry Run

Expression:

```text
5 3 2 * +
```

| Token | Operation | Stack |
|---|---|---|
| 5 | Push 5 | `[5]` |
| 3 | Push 3 | `[5, 3]` |
| 2 | Push 2 | `[5, 3, 2]` |
| * | 3 * 2 = 6 | `[5, 6]` |
| + | 5 + 6 = 11 | `[11]` |

Final Result: `11`

### 2.9 Complexity Analysis

For an expression containing n tokens:

- Time Complexity: O(n).
- Space Complexity: O(n) in the worst case.

---

## 3. Expression Conversion

### 3.1 Introduction

Expression conversion means converting an arithmetic expression from one notation to another.

The three main notations are:

- Infix
- Prefix
- Postfix

Examples:

| Infix | Prefix | Postfix |
|---|---|---|
| `A + B` | `+ A B` | `A B +` |
| `A - B` | `- A B` | `A B -` |
| `A * B` | `* A B` | `A B *` |
| `A + B * C` | `+ A * B C` | `A B C * +` |
| `(A + B) * C` | `* + A B C` | `A B + C *` |

### 3.2 Operator Precedence

When converting expressions, we need to understand operator precedence.

| Operator | Precedence |
|---|---|
| `^` | Highest |
| `*`, `/`, `%` | Medium |
| `+`, `-` | Lowest |

For example:

```text
A + B * C
```

Multiplication has higher precedence than addition.

Therefore:

```text
A + (B * C)
```

Postfix:

```text
A B C * +
```

### 3.3 Operator Associativity

Associativity determines the order of evaluation when operators have the same precedence.

**Left Associativity:**

Operators are evaluated from left to right.

Examples:

```text
A - B - C
(A - B) - C
```

**Right Associativity:**

Operators are evaluated from right to left.

Example:

```text
A ^ B ^ C
A ^ (B ^ C)
```

This distinction is important when converting expressions.

### 3.4 Infix to Postfix Conversion

This conversion uses a stack to temporarily store operators.

**Algorithm:**

1. Initialize an empty operator stack and an output list.
2. Traverse the infix expression from left to right.
3. If the token is an operand, add it to the output.
4. If the token is an opening parenthesis, push it onto the stack.
5. If the token is a closing parenthesis:
   - Pop operators into the output until an opening parenthesis is found.
   - Remove the opening parenthesis.
6. If the token is an operator:
   - Pop higher-precedence operators from the stack.
   - Also pop equal-precedence operators when the current operator is left-associative.
   - Push the current operator.
7. After traversal, pop all remaining operators into the output.

### 3.5 Python Implementation – Infix to Postfix

The following implementation supports single-character operands, parentheses, and the operators `+`, `-`, `*`, `/`, `%`, and `^`.

```python
def infix_to_postfix(expression):

    stack = []
    output = []

    precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '%': 2,
        '^': 3
    }

    right_associative = {'^'}

    for char in expression:

        if char.isspace():
            continue

        if char.isalnum():
            output.append(char)

        elif char == '(':
            stack.append(char)

        elif char == ')':

            while stack and stack[-1] != '(':
                output.append(stack.pop())

            if not stack:
                raise ValueError("Mismatched parentheses")

            stack.pop()

        elif char in precedence:

            while stack and stack[-1] != '(':

                top = stack[-1]

                higher_precedence = (
                    precedence[top] > precedence[char]
                )

                equal_left_associative = (
                    precedence[top] == precedence[char]
                    and char not in right_associative
                )

                if higher_precedence or equal_left_associative:
                    output.append(stack.pop())
                else:
                    break

            stack.append(char)

        else:
            raise ValueError("Invalid character")

    if '(' in stack:
        raise ValueError("Mismatched parentheses")

    while stack:
        output.append(stack.pop())

    return ''.join(output)


print(infix_to_postfix("A+B*C"))    # ABC*+
print(infix_to_postfix("(A+B)*C"))  # AB+C*
print(infix_to_postfix("A^B^C"))    # ABC^^
```

**Important limitation:** This is a basic single-character-token implementation. Multi-digit numbers and identifiers containing multiple characters require tokenization before conversion.

### 3.6 Complexity Analysis

For an expression containing n tokens:

- Time Complexity: O(n).
- Space Complexity: O(n).

Each token is processed a constant number of times.

### 3.7 Other Expression Conversions

Other common conversions include:

- Infix to Prefix
- Postfix to Infix
- Prefix to Infix
- Postfix to Prefix
- Prefix to Postfix

These conversions also use stacks and are useful for understanding expression parsing.

---

## 4. Undo-Style Processing

### 4.1 Introduction

Undo-style processing is an application of stacks where we need to reverse the most recent operation.

Examples:

- Undo in a text editor.
- Undo in drawing applications.
- Undo changes in an IDE.
- Revert recent actions in an application.

The principle is simple:

**The most recently performed operation should be undone first.**

This follows LIFO.

### 4.2 Basic Approach

Maintain a stack called `undo_stack`.

Whenever an operation is performed:

1. Save the operation or previous state.
2. Push it onto the undo stack.

When the user performs Undo:

1. Check whether the undo stack is empty.
2. Pop the most recent operation.
3. Reverse or restore its effect.

### 4.3 Example

Suppose a user enters these characters:

```text
A → B → C
```

The user then performs Undo.

The most recent character `C` is removed.

Current text:

```text
AB
```

Another Undo:

```text
A
```

### 4.4 Python Implementation – Simple Text Editor

```python
class TextEditor:

    def __init__(self):
        self.text = []
        self.undo_stack = []

    def type_character(self, char):

        self.text.append(char)
        self.undo_stack.append(char)

    def undo(self):

        if not self.undo_stack:
            print("Nothing to undo")
            return

        self.undo_stack.pop()
        self.text.pop()

    def display(self):

        print(''.join(self.text))


editor = TextEditor()

editor.type_character('A')
editor.type_character('B')
editor.type_character('C')

editor.display()  # ABC

editor.undo()

editor.display()  # AB

editor.undo()

editor.display()  # A
```

**Note:** This is a simplified example for append-only typing. A real editor needs to store richer operation information, including insertion positions, deleted text, formatting changes, and previous values.

### 4.5 Undo and Redo Using Two Stacks

Many applications support both Undo and Redo.

For this, we maintain two stacks:

- Undo Stack
- Redo Stack

**Undo operation:**

1. Pop the most recent action from the undo stack.
2. Reverse that action.
3. Push the action onto the redo stack.

**Redo operation:**

1. Pop the most recently undone action from the redo stack.
2. Apply the action again.
3. Push it back onto the undo stack.

When a new operation is performed, the redo stack is generally cleared because the previous redo history is no longer valid.

### 4.6 Complexity Analysis

Assuming each operation and reversal takes O(1):

- Perform operation: O(1).
- Undo: O(1).
- Redo: O(1).
- Space Complexity: O(n) for n stored operations.

Actual complexity depends on the size and cost of the operations being recorded.

---

## 5. Recursive Simulation Using Stack

### 5.1 Introduction

Recursion is a technique where a function calls itself to solve a smaller version of the same problem.

Python manages recursive function calls using the **call stack**.

Every recursive call creates a stack frame containing information such as:

- Function parameters.
- Local variables.
- Return address.
- Execution state.

When a recursive function completes, its stack frame is removed.

### 5.2 Understanding the Call Stack

Consider:

```python
def factorial(n):

    if n == 1:
        return 1

    return n * factorial(n - 1)


print(factorial(4))
```

The recursive calls happen in this order:

```text
factorial(4)
    factorial(3)
        factorial(2)
            factorial(1)
```

Each call waits for the next call to complete.

### 5.3 Call Stack Visualization

During recursive execution:

```text
       TOP
        |
   factorial(1)
   factorial(2)
   factorial(3)
   factorial(4)
```

Once `factorial(1)` returns, execution moves backward.

This is called **stack unwinding**.

### 5.4 Stack Unwinding

The return process:

```text
factorial(1) = 1

factorial(2) = 2 * 1 = 2

factorial(3) = 3 * 2 = 6

factorial(4) = 4 * 6 = 24
```

Final Result:

```text
24
```

### 5.5 Simulating Recursion Using an Explicit Stack

We can manually simulate recursive behavior using a stack.

Let's implement factorial iteratively using an explicit stack.

```python
def factorial_using_stack(n):

    stack = []

    while n > 1:
        stack.append(n)
        n -= 1

    result = 1

    while stack:
        result *= stack.pop()

    return result


print(factorial_using_stack(4))  # 24
print(factorial_using_stack(5))  # 120
```

### 5.6 How Does It Work?

For `factorial_using_stack(4)`:

First phase – Push values:

| Operation | Stack |
|---|---|
| Push 4 | `[4]` |
| Push 3 | `[4, 3]` |
| Push 2 | `[4, 3, 2]` |

Second phase – Pop and multiply:

| Operation | Result | Stack |
|---|---|---|
| Pop 2 | 2 | `[4, 3]` |
| Pop 3 | 6 | `[4]` |
| Pop 4 | 24 | `[]` |

Final Result: `24`

### 5.7 Where Is Explicit Stack Simulation Useful?

Explicit stacks are useful when:

1. Recursive depth may exceed the language's recursion limit.
2. We want more control over execution.
3. We need to convert recursive algorithms into iterative algorithms.
4. We are implementing iterative DFS.
5. We need to simulate nested function execution.
6. We are implementing backtracking algorithms.

### 5.8 Complexity Analysis

For factorial:

- Time Complexity: O(n).
- Auxiliary Space Complexity: O(n), because the explicit stack stores n values.
