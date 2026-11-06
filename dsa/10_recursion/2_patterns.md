# Recursion Patterns

## 1. Divide and Conquer

### 1.1 Explanation

**Divide and Conquer** is a problem-solving technique in which we divide a large problem into smaller independent subproblems, solve those subproblems recursively, and combine their results to get the final answer.

It generally follows three steps:

1. **Divide:** Break the original problem into smaller subproblems.
2. **Conquer:** Solve each subproblem recursively.
3. **Combine:** Combine the results of the subproblems.

The three steps can be represented as:

```text
Divide → Conquer → Combine
```

This pattern is commonly used in:

- Merge Sort
- Quick Sort
- Binary Search
- Maximum Subarray
- Closest Pair of Points

### 1.2 Example: Merge Sort

Given an array:

```text
[8, 3, 5, 4]
```

We need to sort the array using Divide and Conquer.

**Step 1: Divide**

Divide the array into two halves.

```text
             [8, 3, 5, 4]
               /      \
           [8, 3]    [5, 4]
```

Continue dividing:

```text
           [8, 3]       [5, 4]
           /   \        /   \
         [8]   [3]    [5]   [4]
```

**Step 2: Conquer**

Single-element arrays are already sorted.

**Step 3: Combine**

Merge the sorted subarrays:

```text
         [8]   [3]    [5]   [4]
           \   /        \   /
           [3, 8]      [4, 5]
               \        /
             [3, 4, 5, 8]
```

Final sorted array:

```text
[3, 4, 5, 8]
```

### 1.3 Algorithm

```text
FUNCTION merge_sort(arr):

    IF length(arr) <= 1:
        RETURN arr

    mid = length(arr) // 2

    left = merge_sort(arr[0:mid])
    right = merge_sort(arr[mid:])

    RETURN merge(left, right)
```

The merge function combines two already-sorted arrays into one sorted array.

### 1.4 Dry Run

Input:

```text
arr = [6, 2, 8, 4]
```

**Division phase:**

```text
                 [6, 2, 8, 4]
                  /        \
              [6, 2]      [8, 4]
              /   \       /   \
            [6]   [2]   [8]   [4]
```

**Combining phase:**

```text
[6] + [2] = [2, 6]

[8] + [4] = [4, 8]

[2, 6] + [4, 8] = [2, 4, 6, 8]
```

Final result:

```text
[2, 4, 6, 8]
```

### 1.5 Python Implementation

```python
def merge(left, right):

    result = []
    i = j = 0

    while i < len(left) and j < len(right):

        if left[i] <= right[j]:
            result.append(left[i])
            i += 1

        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])

    return result


def merge_sort(arr):

    # Base case
    if len(arr) <= 1:
        return arr

    # Divide
    mid = len(arr) // 2

    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    # Combine
    return merge(left, right)


arr = [6, 2, 8, 4]

print(merge_sort(arr))
```

**Output:**

```text
[2, 4, 6, 8]
```

### 1.6 Complexity Analysis

| Complexity | Value | Reason |
|---|---|---|
| Time | O(n log n) | log n levels, O(n) work per level |
| Auxiliary space | O(n) | Temporary arrays used during merging |

### 1.7 Important Observations

- Divide and Conquer breaks a problem into smaller subproblems.
- The subproblems are usually independent.
- The results are combined to form the final answer.
- Recursion is commonly used to implement this pattern.

**Recognition clue:** If a problem can be divided into smaller independent problems and their answers can be combined, consider Divide and Conquer.

---

## 2. Recursive Traversal

### 2.1 Explanation

**Recursive Traversal** means visiting elements of a data structure by recursively moving from one element to another.

Instead of using loops to visit every element, we use recursive function calls.

This pattern is especially useful for:

- Arrays
- Strings
- Linked Lists
- Binary Trees
- Graphs
- Nested data structures

The general idea is:

1. Process the current element.
2. Move to the next element or connected element recursively.
3. Stop when there are no more elements to visit.

### 2.2 Example: Traversing an Array

Given:

```text
arr = [10, 20, 30, 40]
```

We want to print every element using recursion.

We maintain an index that indicates the current position.

Initially:

```text
index = 0
```

At every recursive call:

```text
index = index + 1
```

Stop when:

```text
index == len(arr)
```

### 2.3 Algorithm

```text
FUNCTION traverse(arr, index):

    IF index == length(arr):
        RETURN

    PRINT arr[index]

    traverse(arr, index + 1)
```

### 2.4 Dry Run

Input:

```text
arr = [10, 20, 30]
```

Recursive calls:

```text
traverse(arr, 0)
    PRINT 10

    traverse(arr, 1)
        PRINT 20

        traverse(arr, 2)
            PRINT 30

            traverse(arr, 3)
                RETURN
```

Output:

```text
10
20
30
```

### 2.5 Python Implementation

```python
def traverse(arr, index):

    # Base case
    if index == len(arr):
        return

    # Process current element
    print(arr[index])

    # Recursive traversal
    traverse(arr, index + 1)


arr = [10, 20, 30]

traverse(arr, 0)
```

**Output:**

```text
10
20
30
```

### 2.6 Example: Recursive Traversal of a Linked List

Consider a linked list:

```text
10 → 20 → 30 → None
```

Each node points to the next node.

We recursively visit the current node and then move to the next node.

**Algorithm:**

```text
FUNCTION traverse(node):

    IF node == NULL:
        RETURN

    PRINT node.value

    traverse(node.next)
```

**Python Implementation:**

```python
class Node:

    def __init__(self, value):
        self.value = value
        self.next = None


def traverse(node):

    if node is None:
        return

    print(node.value)

    traverse(node.next)


head = Node(10)
head.next = Node(20)
head.next.next = Node(30)

traverse(head)
```

**Output:**

```text
10
20
30
```

### 2.7 Complexity Analysis

For array traversal:

| Complexity | Value |
|---|---|
| Time | O(n) |
| Auxiliary space | O(n) |

For linked list traversal, the complexities are also O(n) time and O(n) auxiliary space.

### 2.8 Important Observations

- Recursive traversal processes one element at a time.
- The recursive parameter represents the current position or node.
- A base case identifies when traversal should stop.
- The order of processing and recursive calls determines the traversal order.

**Recognition clue:** If a problem asks you to visit or process every element of a structure, recursive traversal may be useful.

---

## 3. Choose → Explore → Unchoose

### 3.1 Explanation

This is one of the most important recursion patterns, especially for **Backtracking** problems.

The pattern consists of three operations:

1. **Choose:** Make a decision and update the current state.
2. **Explore:** Recursively explore the consequences of that decision.
3. **Unchoose:** Undo the decision to restore the previous state.

The general structure is:

```text
Choose
   ↓
Explore
   ↓
Unchoose
```

Why do we need unchoose?

Because after exploring one possibility, we need to restore the original state before exploring another possibility.

Without undoing the previous choice, the next branch may contain incorrect state.

This pattern is commonly used in:

- Subsets
- Permutations
- Combinations
- N-Queens
- Sudoku
- Maze solving
- Combination Sum

### 3.2 Example: Generate All Subsets

Given:

```text
nums = [1, 2]
```

Generate all possible subsets.

Expected result:

```text
[]
[1]
[2]
[1, 2]
```

For every element, we have two choices:

- Include the element.
- Exclude the element.

### 3.3 Algorithm

For each element:

1. If all elements have been processed, save the current subset.
2. Choose the current element by adding it to the subset.
3. Explore the next index recursively.
4. Unchoose the current element by removing it.
5. Explore the next index without including the element.

### 3.4 Dry Run

Input:

```text
nums = [1, 2]
```

Start with:

```text
current = []
```

**First decision: Element 1**

Choose 1:

```text
current = [1]
```

Explore element 2.

Choose 2:

```text
current = [1, 2]
```

Save:

```text
[1, 2]
```

Unchoose 2:

```text
current = [1]
```

Explore without 2.

Save:

```text
[1]
```

Now return to the previous decision.

Unchoose 1:

```text
current = []
```

Explore without 1.

Choose 2:

```text
current = [2]
```

Save:

```text
[2]
```

Unchoose 2:

```text
current = []
```

Save:

```text
[]
```

Final subsets:

```text
[[1, 2], [1], [2], []]
```

### 3.5 Python Implementation

```python
def subsets(nums):

    result = []
    current = []

    def backtrack(index):

        # Base case
        if index == len(nums):
            result.append(current.copy())
            return

        # Choose
        current.append(nums[index])

        # Explore
        backtrack(index + 1)

        # Unchoose
        current.pop()

        # Explore without choosing
        backtrack(index + 1)

    backtrack(0)

    return result


print(subsets([1, 2]))
```

**Output:**

```text
[[1, 2], [1], [2], []]
```

### 3.6 Complexity Analysis

For n elements:

Each element has two choices:

- Include.
- Exclude.

Therefore, the total number of subsets is:

```text
2ⁿ
```

| Complexity | Value |
|---|---|
| Time | O(n × 2ⁿ) |
| Auxiliary space | O(n), excluding output |

The time complexity includes copying each generated subset.

### 3.7 Important Observations

- Choose updates the current state.
- Explore recursively investigates the chosen possibility.
- Unchoose restores the state.
- `append()` and `pop()` are common operations for this pattern.
- Always copy mutable state when storing a completed result.

**Recognition clue:** If a problem asks for all possible combinations, arrangements, or valid configurations, look for Choose → Explore → Unchoose.

---

## 4. State Tracking

### 4.1 Explanation

**State Tracking** means maintaining the information required to solve a recursive problem and passing that information from one recursive call to another.

A recursive function does not always need to operate on just one input.

Sometimes it needs additional information such as:

- Current index.
- Current sum.
- Current path.
- Remaining target.
- Current position.
- Visited elements.
- Number of elements selected.
- Current maximum or minimum.

This information is called the **state** of the recursive problem.

We can maintain state using:

1. Function parameters.
2. Local variables.
3. Mutable data structures.
4. Shared variables, when appropriate.

The important idea is to understand what information must be maintained at every recursive step.

### 4.2 Example: Find the Sum of Array Elements

Given:

```text
arr = [2, 4, 6, 8]
```

Find the sum using recursion.

We can track:

- `index`: Current array position.
- `current_sum`: Sum calculated so far.

Initially:

```text
index = 0
current_sum = 0
```

At every recursive call:

- Add the current element to the running sum.
- Move to the next index.

### 4.3 Algorithm

```text
FUNCTION array_sum(arr, index, current_sum):

    IF index == length(arr):
        RETURN current_sum

    current_sum = current_sum + arr[index]

    RETURN array_sum(
        arr,
        index + 1,
        current_sum
    )
```

### 4.4 Dry Run

Input:

```text
arr = [2, 4, 6]
```

| Recursive call | Index | Current sum |
|---|---:|---:|
| array_sum(arr, 0, 0) | 0 | 0 |
| array_sum(arr, 1, 2) | 1 | 2 |
| array_sum(arr, 2, 6) | 2 | 6 |
| array_sum(arr, 3, 12) | 3 | 12 |

At index 3:

```text
index == len(arr)
```

Return 12.

Final answer:

```text
12
```

### 4.5 Python Implementation

```python
def array_sum(arr, index=0, current_sum=0):

    # Base case
    if index == len(arr):
        return current_sum

    # Update state
    current_sum += arr[index]

    # Move to next element
    return array_sum(
        arr,
        index + 1,
        current_sum
    )


arr = [2, 4, 6]

print(array_sum(arr))
```

**Output:**

```text
12
```

### 4.6 Another Example: Track the Current Path

Consider an array:

```text
nums = [1, 2, 3]
```

Suppose we want to find all paths formed by choosing elements in order.

We can maintain:

- `index`: Current position.
- `path`: Elements selected so far.

**Python Implementation:**

```python
def generate_paths(nums, index, path, result):

    if index == len(nums):
        result.append(path.copy())
        return

    # Choose current element
    path.append(nums[index])

    generate_paths(nums, index + 1, path, result)

    # Unchoose
    path.pop()

    # Explore without current element
    generate_paths(nums, index + 1, path, result)


nums = [1, 2, 3]

result = []

generate_paths(nums, 0, [], result)

print(result)
```

**Output:**

```text
[
    [1, 2, 3],
    [1, 2],
    [1, 3],
    [1],
    [2, 3],
    [2],
    [3],
    []
]
```

This example combines state tracking with Choose → Explore → Unchoose.

### 4.7 Complexity Analysis

For the array sum implementation:

| Complexity | Value |
|---|---|
| Time | O(n) |
| Auxiliary space | O(n), due to recursion stack |

For the path-generation example:

| Complexity | Value |
|---|---|
| Time | O(n × 2ⁿ) |
| Auxiliary space | O(n), excluding output |

### 4.8 Important Observations

- State represents the information required at a particular recursive step.
- Parameters are a common way to pass state.
- Every recursive call should receive the correct updated state.
- Mutable state may need to be restored after exploring a branch.
- State tracking is especially important in backtracking, tree traversal, and graph problems.

**Recognition clue:** If a recursive problem requires remembering what has happened so far, identify the state and decide how to maintain it.

---

## 5. Branching Recursion

### 5.1 Explanation

**Branching Recursion** occurs when a recursive function makes more than one recursive call during a single function execution.

Instead of following one recursive path, the function creates multiple branches.

Each branch solves a different possibility or subproblem.

Examples include:

- Fibonacci numbers.
- Subsets generation.
- Permutations.
- Binary decision problems.
- Recursive tree traversal.

The general structure is:

```text
FUNCTION solve(n):

    IF base_condition:
        RETURN answer

    result1 = solve(smaller_problem_1)

    result2 = solve(smaller_problem_2)

    RETURN combine(result1, result2)
```

The number of recursive branches determines how the recursion tree grows.

### 5.2 Example: Fibonacci Numbers

The Fibonacci sequence is:

```text
0, 1, 1, 2, 3, 5, 8, 13, 21 ...
```

Mathematical definition:

```text
fib(0) = 0

fib(1) = 1

fib(n) = fib(n - 1) + fib(n - 2)
```

For every n greater than 1, the function makes two recursive calls.

This is branching recursion.

### 5.3 Algorithm

1. Receive n.
2. If n is 0, return 0.
3. If n is 1, return 1.
4. Calculate fib(n - 1).
5. Calculate fib(n - 2).
6. Add both results and return the answer.

### 5.4 Dry Run

Input:

```text
fib(4)
```

Recursion tree:

```text
                  fib(4)
                 /      \
             fib(3)     fib(2)
             /   \       /   \
         fib(2) fib(1) fib(1) fib(0)
          /  \
       fib(1) fib(0)
```

Calculate from the leaves:

```text
fib(0) = 0

fib(1) = 1

fib(2) = 1 + 0 = 1

fib(3) = 1 + 1 = 2

fib(4) = 2 + 1 = 3
```

Final answer:

```text
3
```

### 5.5 Python Implementation

```python
def fibonacci(n):

    # Base cases
    if n == 0:
        return 0

    if n == 1:
        return 1

    # Two recursive branches
    left = fibonacci(n - 1)
    right = fibonacci(n - 2)

    return left + right


print(fibonacci(4))
```

**Output:**

```text
3
```

### 5.6 Complexity Analysis

For the naive recursive Fibonacci implementation:

| Complexity | Value |
|---|---|
| Time | O(2ⁿ) |
| Auxiliary space | O(n) |

Why is the time complexity exponential?

Because many recursive calls are repeated.

For example:

```text
fib(4)
```

Calculates `fib(2)` more than once.

As n increases, repeated calculations grow significantly.

We can improve this using:

- Memoization.
- Dynamic Programming.
- Iterative approaches.

### 5.7 Important Observations

- Branching recursion creates multiple recursive calls.
- Each call explores a different subproblem or possibility.
- A recursion tree helps understand how the calls expand.
- Some branching algorithms have overlapping subproblems.
- Memoization can avoid repeated calculations.

**Recognition clue:** If one function call leads to two or more recursive calls, identify it as branching recursion.
