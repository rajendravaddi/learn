# Recursion Concepts

## 1. Base Case

### 1.1 Explanation

A **base case** is the condition that tells a recursive function when to stop calling itself.

Every recursive function must have a base case. Without it, the function continues calling itself indefinitely until Python raises a `RecursionError` due to the recursion depth limit.

Think of recursion as solving a problem by reducing it into smaller versions of itself.

Eventually, we must reach a problem that can be solved directly without further recursion. That stopping condition is called the base case.

**Example: Factorial**

The factorial of a number n is:

- 5! = 5 × 4 × 3 × 2 × 1
- 4! = 4 × 3 × 2 × 1
- 3! = 3 × 2 × 1
- 2! = 2 × 1
- 1! = 1
- 0! = 1

Mathematically:

- n! = n × (n - 1)!
- 0! = 1

Here, `n == 0` is the base case because we know the answer directly.

### 1.2 Algorithm

1. Start with an integer n.
2. Check whether n is equal to 0.
3. If true, return 1.
4. Otherwise, continue with the recursive calculation.

**Pseudocode:**

```text
FUNCTION factorial(n):

    IF n == 0:
        RETURN 1

    RETURN n * factorial(n - 1)
```

### 1.3 Dry Run

Input: `n = 3`

| Function call | Condition | Action |
|---|---|---|
| factorial(3) | 3 == 0? No | Continue |
| factorial(2) | 2 == 0? No | Continue |
| factorial(1) | 1 == 0? No | Continue |
| factorial(0) | 0 == 0? Yes | Return 1 |

The recursive calls stop when `factorial(0)` is reached.

### 1.4 Python Implementation

```python
def factorial(n):
    if n == 0:
        return 1

    return n * factorial(n - 1)


print(factorial(3))
```

**Output:**

```text
6
```

### 1.5 Important Observations

- A base case prevents infinite recursion.
- Every recursive problem needs at least one reachable base case.
- The base case should return the simplest possible answer.
- A recursive function must eventually reach its base case.

**Time Complexity:** O(n)

**Auxiliary Space Complexity:** O(n), due to recursive calls.

---

## 2. Recursive Case

### 2.1 Explanation

The **recursive case** is the part of a recursive function where the function calls itself to solve a smaller version of the original problem.

A recursive case should:

1. Break the original problem into a smaller problem.
2. Call the same function with the smaller input.
3. Use the returned result to construct the final answer.

Consider factorial:

5! = 5 × 4!

4! = 4 × 3!

3! = 3 × 2!

2! = 2 × 1!

1! = 1 × 0!

Therefore:

n! = n × (n - 1)!

Here:

- `n` is the current problem.
- `n - 1` is the smaller problem.
- `factorial(n - 1)` is the recursive call.
- Multiplying the result by n is the operation that constructs the answer.

### 2.2 Algorithm

1. Receive an integer n.
2. If n is 0, return 1.
3. Otherwise:
   - Reduce n by 1.
   - Call factorial recursively.
   - Multiply the returned result by n.
4. Return the final result.

**Pseudocode:**

```text
FUNCTION factorial(n):

    IF n == 0:
        RETURN 1

    smaller_result = factorial(n - 1)

    RETURN n * smaller_result
```

### 2.3 Dry Run

Input: `n = 4`

The recursive calls:

```text
factorial(4)
    factorial(3)
        factorial(2)
            factorial(1)
                factorial(0)
```

Once the base case returns, the calculations happen in reverse order:

```text
factorial(0) = 1

factorial(1) = 1 * 1 = 1

factorial(2) = 2 * 1 = 2

factorial(3) = 3 * 2 = 6

factorial(4) = 4 * 6 = 24
```

Final answer: `24`

### 2.4 Python Implementation

```python
def factorial(n):

    # Base case
    if n == 0:
        return 1

    # Recursive case
    smaller_result = factorial(n - 1)

    return n * smaller_result


print(factorial(4))
```

**Output:**

```text
24
```

### 2.5 Important Observations

A recursive function generally consists of two important parts:

```python
def recursive_function(n):

    # Base case
    if stopping_condition:
        return answer

    # Recursive case
    return recursive_function(smaller_input)
```

The recursive input must move toward the base case.

For example:

- `n - 1` reduces the input.
- `n // 2` reduces the input approximately by half.
- `index + 1` moves forward through an array.

**Time Complexity:** O(n) for factorial.

**Auxiliary Space Complexity:** O(n).

---

## 3. Call Stack

### 3.1 Explanation

The **call stack** is the memory structure used by a program to keep track of active function calls.

Whenever a function is called, Python creates a stack frame containing information such as:

- Function arguments.
- Local variables.
- Where execution should resume after the function returns.

When a function calls itself recursively, a new stack frame is created.

These frames are stored in a Last In, First Out (LIFO) structure.

LIFO means:

**Last In, First Out.**

The most recently called function finishes first.

There are two important phases in recursion:

1. **Calling phase:** Recursive calls keep getting added to the call stack.
2. **Returning phase:** Once the base case is reached, calls start completing in reverse order.

### 3.2 Algorithm

Consider calculating the factorial of n.

1. Call factorial(n).
2. Push the function call onto the stack.
3. If the base case is not reached, call factorial(n - 1).
4. Continue until factorial(0) is reached.
5. Return 1 from the base case.
6. Pop the previous function frame and complete its pending calculation.
7. Continue until the original function returns.

### 3.3 Dry Run

Input:

```python
factorial(4)
```

**Phase 1: Stack building**

```text
factorial(4)
    factorial(3)
        factorial(2)
            factorial(1)
                factorial(0)
```

Conceptual stack (top shown first):

```text
TOP
factorial(0)
factorial(1)
factorial(2)
factorial(3)
factorial(4)
BOTTOM
```

At this point, the base case is reached.

**Phase 2: Stack unwinding**

Now the function calls start returning.

```text
factorial(0) returns 1

factorial(1) returns 1 * 1 = 1

factorial(2) returns 2 * 1 = 2

factorial(3) returns 3 * 2 = 6

factorial(4) returns 4 * 6 = 24
```

The stack becomes empty after the original function completes.

### 3.4 Python Implementation

```python
def factorial(n):

    print("Entering:", n)

    if n == 0:
        print("Base case reached")
        return 1

    result = n * factorial(n - 1)

    print("Returning:", n)

    return result


print("Answer:", factorial(3))
```

**Output:**

```text
Entering: 3
Entering: 2
Entering: 1
Entering: 0
Base case reached
Returning: 1
Returning: 2
Returning: 3
Answer: 6
```

Notice:

- `Entering` messages appear in increasing call depth.
- `Returning` messages appear in reverse order.
- This demonstrates stack building and stack unwinding.

### 3.5 Important Observations

- Recursive calls consume stack memory.
- Each recursive call creates a new stack frame.
- Function calls follow LIFO order.
- The maximum number of simultaneously active calls determines recursion depth.

**Time Complexity:** O(n).

**Auxiliary Space Complexity:** O(n), because n + 1 function calls may be active.

**Important Python Note:**

Python has a recursion depth limit. Deep recursion may cause:

```text
RecursionError: maximum recursion depth exceeded
```

Unlike some programming languages, Python does not automatically optimize tail recursion.

---

## 4. Recurrence

### 4.1 Explanation

A **recurrence relation** is a mathematical equation that describes the running time of a recursive algorithm in terms of the running time of smaller inputs.

It helps us analyze the time complexity of recursive algorithms.

For example:

```python
def factorial(n):

    if n == 0:
        return 1

    return n * factorial(n - 1)
```

For an input of size n:

- We perform one recursive call with n - 1.
- We perform a constant amount of additional work.

Therefore:

T(n) = T(n - 1) + O(1)

This is the recurrence relation for factorial.

### 4.2 Common Recurrence Patterns

**Pattern 1: Linear recursion**

```text
T(n) = T(n - 1) + O(1)
```

Example: Factorial.

Time Complexity: O(n).

**Pattern 2: Halving recursion**

```text
T(n) = T(n / 2) + O(1)
```

Example: Binary Search.

Time Complexity: O(log n).

**Pattern 3: Two recursive calls**

```text
T(n) = 2T(n - 1) + O(1)
```

Example: A recursive algorithm that makes two calls, each with input size n - 1.

Time Complexity: O(2^n).

**Pattern 4: Divide and conquer**

```text
T(n) = 2T(n / 2) + O(n)
```

Example: Merge Sort.

Time Complexity: O(n log n).

### 4.3 Algorithm: Solving a Recurrence Using Expansion

Consider:

```text
T(n) = T(n - 1) + 1
T(0) = 1
```

Expand the recurrence:

```text
T(n) = T(n - 1) + 1

T(n - 1) = T(n - 2) + 1

T(n) = T(n - 2) + 2

T(n) = T(n - 3) + 3

...

T(n) = T(0) + n
```

Since T(0) = 1:

```text
T(n) = 1 + n
```

Therefore:

```text
T(n) = O(n)
```

### 4.4 Dry Run

Let n = 4.

```text
T(4) = T(3) + 1
     = T(2) + 1 + 1
     = T(1) + 1 + 1 + 1
     = T(0) + 1 + 1 + 1 + 1
```

Since T(0) = 1:

```text
T(4) = 5
```

We have four recursive steps plus the base-case cost.

### 4.5 Python Implementation

We can observe the recursive calls that correspond to the recurrence.

```python
def count_steps(n):

    if n == 0:
        return 1

    return 1 + count_steps(n - 1)


print(count_steps(4))
```

**Output:**

```text
5
```

### 4.6 Important Observations

- A recurrence describes the time complexity of recursive algorithms.
- The base case gives the stopping value.
- The recursive case describes how the problem reduces.
- Recurrence relations can be solved using expansion, recursion trees, or the Master Theorem.

Remember:

**Recurrence is a mathematical representation of recursive running time, not the recursive function itself.**

---

## 5. Recursion Tree

### 5.1 Explanation

A **recursion tree** is a visual representation of the recursive calls made by an algorithm.

It helps us understand:

- How many recursive calls are generated.
- How the input size changes at each level.
- How much work is performed at each level.
- The overall time complexity.

Consider the recurrence:

```text
T(n) = 2T(n / 2) + O(n)
```

This means:

- Every function call creates two recursive calls.
- Each recursive call receives half the input.
- The current function performs O(n) additional work.

This is the pattern used by Merge Sort.

### 5.2 Algorithm

For an input of size n:

1. Start with one root function call.
2. Divide the problem into two subproblems of size n / 2.
3. Repeat the division for each subproblem.
4. Continue until the subproblem size becomes 1.
5. Calculate the work performed at every level.
6. Add the work across all levels.

### 5.3 Dry Run

Consider:

```text
T(n) = 2T(n / 2) + n
```

Let n = 8.

**Recursion tree:**

```text
                  T(8)                  Cost = 8
                 /    \
              T(4)    T(4)             Cost = 4 + 4 = 8
             /  \      /  \
           T(2) T(2) T(2) T(2)         Cost = 2+2+2+2 = 8
           / \   / \   / \   / \
         T(1) ...                 Cost = 8
```

**Level-wise analysis:**

| Level | Number of calls | Input per call | Total work |
|---|---:|---:|---:|
| 0 | 1 | 8 | 8 |
| 1 | 2 | 4 | 8 |
| 2 | 4 | 2 | 8 |
| 3 | 8 | 1 | 8 |

At each level, the total work is 8.

Number of levels:

```text
log₂(8) + 1 = 4
```

Total work:

```text
8 + 8 + 8 + 8 = 32
```

Generalizing:

- Work per level = O(n).
- Number of levels = O(log n).

Therefore:

```text
T(n) = O(n log n)
```

### 5.4 Python Implementation

Here is a simple recursive implementation that demonstrates the branching structure.

```python
def recursion_tree(n):

    if n <= 1:
        return 1

    left = recursion_tree(n // 2)
    right = recursion_tree(n // 2)

    return left + right + n


print(recursion_tree(8))
```

**Output:**

```text
32
```

This implementation counts the work represented by the recurrence, rather than implementing Merge Sort itself.

### 5.5 Important Observations

- A recursion tree helps visualize recursive branching.
- Each level represents a depth of recursion.
- The total time complexity is obtained by adding the work at all levels.
- It is particularly useful for divide-and-conquer algorithms.

**Common example:** Merge Sort has O(n log n) time complexity.

---

## 6. Tail Recursion Concept

### 6.1 Explanation

**Tail recursion** is a special type of recursion in which the recursive function call is the last operation performed by the function.

In simple terms, nothing remains to be calculated after the recursive call returns.

Consider two implementations of factorial.

**Normal recursion:**

```python
def factorial(n):

    if n == 0:
        return 1

    return n * factorial(n - 1)
```

Here, multiplication must happen after the recursive call returns.

For example:

```text
return 4 * factorial(3)
```

The multiplication is still pending.

Therefore, this is not tail recursion.

**Tail-recursive version:**

```python
def factorial_tail(n, accumulator=1):

    if n == 0:
        return accumulator

    return factorial_tail(n - 1, accumulator * n)
```

Here, the recursive call is the final operation.

The multiplication happens before the recursive call, and the updated result is passed as an argument.

Therefore, this is tail recursion.

### 6.2 Algorithm

1. Accept n and an accumulator.
2. Initialize the accumulator to 1.
3. If n equals 0, return the accumulator.
4. Otherwise:
   - Multiply the accumulator by n.
   - Decrease n by 1.
   - Pass both updated values into the recursive call.
5. Repeat until the base case is reached.

### 6.3 Dry Run

Input:

```text
factorial_tail(4, 1)
```

| Function call | n | Accumulator |
|---|---:|---:|
| factorial_tail(4, 1) | 4 | 1 |
| factorial_tail(3, 4) | 3 | 4 |
| factorial_tail(2, 12) | 2 | 12 |
| factorial_tail(1, 24) | 1 | 24 |
| factorial_tail(0, 24) | 0 | 24 |

At n = 0, return the accumulator.

Final answer:

```text
24
```

### 6.4 Python Implementation

```python
def factorial_tail(n, accumulator=1):

    if n == 0:
        return accumulator

    return factorial_tail(n - 1, accumulator * n)


print(factorial_tail(4))
```

**Output:**

```text
24
```

### 6.5 Important Observations

- In tail recursion, the recursive call is the final operation.
- An accumulator is commonly used to maintain intermediate results.
- Tail recursion can be optimized into iteration by compilers in languages that support Tail Call Optimization (TCO).
- Python does NOT perform automatic Tail Call Optimization.

Therefore, even tail-recursive Python functions still consume O(n) auxiliary stack space in this example.

**Time Complexity:** O(n).

**Auxiliary Space Complexity in Python:** O(n).

**Important:** Tail recursion describes the structure of a recursive function. It does not automatically make the algorithm faster or reduce memory usage in Python.

---

## 7. Backtracking Introduction

### 7.1 Explanation

**Backtracking** is an algorithmic technique in which we build a solution step by step.

Whenever we make a choice:

1. We explore the consequences of that choice.
2. If the choice leads to a solution, we continue.
3. If we need to explore another possibility, we undo the previous choice.
4. We try the next available choice.

The fundamental idea is:

**Choose → Explore → Unchoose**

Backtracking is commonly implemented using recursion.

It is useful for problems involving multiple possible choices.

Examples:

- Generating all subsets.
- Generating permutations.
- N-Queens problem.
- Sudoku solver.
- Maze solving.
- Combination Sum.

### 7.2 Understanding with an Example

Suppose we have an array:

```text
[1, 2]
```

We want to generate all possible subsets.

Possible subsets:

```text
[]
[1]
[2]
[1, 2]
```

For every element, we have two choices:

- Include the element.
- Exclude the element.

This creates a branching decision tree.

### 7.3 Algorithm

For every element:

1. Check whether all elements have been processed.
2. If yes, store the current subset and return.
3. Include the current element in the subset.
4. Recursively explore the next element.
5. Remove the current element from the subset.
6. Recursively explore the next element without including it.

The removal operation is called **backtracking** or unchoosing.

### 7.4 Dry Run

Input:

```text
nums = [1, 2]
```

We start with an empty subset.

```text
                     []
                   /    \
              Choose 1   Skip 1
                [1]        []
               /  \       /  \
          Choose 2 Skip 2 Choose 2 Skip 2
             [1,2] [1]     [2]     []
```

The resulting subsets are:

```text
[1, 2]
[1]
[2]
[]
```

Notice how we:

- Choose 1.
- Explore both possibilities for 2.
- Unchoose 1.
- Explore both possibilities without 1.

This is the essence of backtracking.

### 7.5 Python Implementation

```python
def subsets(nums):

    result = []
    current = []

    def backtrack(index):

        # Base case
        if index == len(nums):
            result.append(current.copy())
            return

        # Choose: include current element
        current.append(nums[index])

        # Explore
        backtrack(index + 1)

        # Unchoose: remove current element
        current.pop()

        # Explore without current element
        backtrack(index + 1)

    backtrack(0)

    return result


print(subsets([1, 2]))
```

**Output:**

```text
[[1, 2], [1], [2], []]
```

### 7.6 Important Observations

- Backtracking explores multiple possible solutions.
- Recursion is frequently used to implement backtracking.
- The same decision point can lead to multiple branches.
- The current state must be restored before exploring another branch.
- `current.copy()` is important because we must save a snapshot of the current subset rather than a reference to the mutable list.

**Time Complexity:** O(n × 2ⁿ), considering that there are 2ⁿ subsets and copying each subset takes up to O(n).

**Auxiliary Space Complexity:** O(n) for the recursion stack and current subset, excluding the output storage.
