# Dynamic Programming - Foundations

Dynamic Programming (DP) is an algorithmic technique used to solve complex problems by breaking them into smaller, overlapping subproblems and storing their results to avoid repeated calculations.

Instead of solving the same subproblem multiple times, DP solves it once and reuses the result.

DP is particularly useful in optimization, counting, and decision-making problems.

## 1. Overlapping Subproblems

### Explanation

Overlapping subproblems is a property in which the same smaller problems are solved repeatedly while solving a larger problem.

Consider calculating the Fibonacci number:

$$
F(n) = F(n-1) + F(n-2)
$$

With the recursive approach:

$$
F(5) = F(4) + F(3)
$$

But calculating `F(4)` also requires calculating `F(3)`.

Therefore, `F(3)` is calculated multiple times.

This repeated computation is called overlapping subproblems.

### Example: Fibonacci

For `F(5)`:

```text
                  F(5)
                 /    \
              F(4)    F(3)
             /   \    /   \
          F(3)  F(2) F(2) F(1)
          / \
       F(2) F(1)
```

Notice that `F(3)` and `F(2)` are calculated repeatedly.

### Python Implementation: Recursive Approach

```python
def fibonacci(n):
    if n <= 1:
        return n

    return fibonacci(n - 1) + fibonacci(n - 2)


print(fibonacci(5))  # 5
```

### Complexity Analysis

- Time Complexity: O(2^n) approximately.
- Space Complexity: O(n) due to recursion stack.

### How DP Helps

Instead of recalculating previously solved subproblems, DP stores their results.

For example:

```text
F(0) = 0
F(1) = 1
F(2) = 1
F(3) = 2
F(4) = 3
F(5) = 5
```

Once `F(3)` is calculated, we reuse it whenever required.

**Key Takeaway:** If a problem repeatedly solves the same smaller problems, it may benefit from Dynamic Programming.

---

## 2. Optimal Substructure

### Explanation

Optimal substructure is a property where the optimal solution to a larger problem can be constructed using optimal solutions to its smaller subproblems.

In simple terms:

If we can solve smaller parts optimally and combine their solutions to obtain the optimal answer for the original problem, the problem has optimal substructure.

### Example: Minimum Cost to Reach a Destination

Suppose we have three positions:

```text
A -------- B -------- C

A to B = 10
B to C = 20
```

The minimum cost to travel from A to C is:

$$
Cost(A,C) = Cost(A,B) + Cost(B,C) = 10 + 20 = 30
$$


The optimal solution from A to C uses the optimal solution from A to B.

#### Python Implementation

```python
def min_cost(cost, start, end):
    if start == end:
        return 0

    return cost[start][end]


cost = [
    [0, 10, 30],
    [10, 0, 20],
    [30, 20, 0]
]

print(min_cost(cost, 0, 2))  # 30
```

This simple example illustrates a cost calculation. A complete DP solution would use a recurrence to compare alternative routes.

### A More Practical DP Example: Minimum Path Cost

Suppose we can move only right or down in a grid.

To reach cell `(i, j)`, we must come from either:

- The cell above `(i-1, j)`.
- The cell on the left `(i, j-1)`.

Therefore:

$$
dp[i][j] = grid[i][j] + \min(dp[i-1][j], dp[i][j-1])
$$

We combine optimal solutions of smaller subproblems to obtain the optimal solution for the current cell.

#### Python Implementation

```python
def min_path_sum(grid):
    rows = len(grid)
    cols = len(grid[0])

    dp = [[0] * cols for _ in range(rows)]

    dp[0][0] = grid[0][0]

    for i in range(1, rows):
        dp[i][0] = dp[i - 1][0] + grid[i][0]

    for j in range(1, cols):
        dp[0][j] = dp[0][j - 1] + grid[0][j]

    for i in range(1, rows):
        for j in range(1, cols):
            dp[i][j] = grid[i][j] + min(
                dp[i - 1][j],
                dp[i][j - 1]
            )

    return dp[rows - 1][cols - 1]


grid = [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1]
]

print(min_path_sum(grid))  # 7
```

#### Dry Run

Input:

```text
1  3  1
1  5  1
4  2  1
```

DP table:

```text
1  4  5
2  7  6
6  8  7
```

Minimum path:

```text
1 → 3 → 1 → 1 → 1

Total = 7
```

#### Complexity Analysis

- Time Complexity: O(rows × cols).
- Space Complexity: O(rows × cols).

**Key Takeaway:** Optimal substructure means a larger optimal solution can be constructed from smaller optimal solutions. It is one of the fundamental properties used to formulate DP solutions.

---

## 3. State

### Explanation

A state represents a subproblem in Dynamic Programming.

It describes what information is needed to uniquely identify a smaller problem.

The DP state is usually stored in:

- A variable for 1D DP.
- A 2D array for 2D DP.
- A multidimensional array for more complex problems.
- A dictionary or cache for memoization.

Choosing the correct state is one of the most important steps in solving DP problems.

### Example: Fibonacci

We define:

$$
dp[i] = F(i)
$$

Here:

`dp[i]` represents the Fibonacci number at position `i`.

For example:

```text
dp[0] = 0
dp[1] = 1
dp[2] = 1
dp[3] = 2
dp[4] = 3
dp[5] = 5
```

The state is simply the index `i`.

### Python Implementation

```python
def fibonacci(n):
    dp = [0] * (n + 1)

    if n >= 1:
        dp[1] = 1

    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]


print(fibonacci(5))  # 5
```

### Algorithm

1. Create a DP array of size `n + 1`.
2. Define `dp[i]` as the Fibonacci number at index `i`.
3. Initialize the base states.
4. Calculate each subsequent state using previously computed states.
5. Return `dp[n]`.

### Dry Run

Input:

```text
n = 5
```

| i | dp[i-2] | dp[i-1] | dp[i] |
|---|---:|---:|---:|
| 0 | - | - | 0 |
| 1 | - | - | 1 |
| 2 | 0 | 1 | 1 |
| 3 | 1 | 1 | 2 |
| 4 | 1 | 2 | 3 |
| 5 | 2 | 3 | 5 |

Output:

```text
5
```

### How to Identify a DP State

Ask yourself:

1. What does the current subproblem represent?
2. Which variables uniquely identify that subproblem?
3. What information do I need to calculate its answer?

Examples:

| Problem | Possible DP State |
|---|---|
| Fibonacci | dp[i] |
| Climbing stairs | dp[i] |
| Grid paths | dp[i][j] |
| Knapsack | dp[i][capacity] |
| LCS | dp[i][j] |

**Key Takeaway:** Before writing a DP solution, clearly define what each DP state represents.

---

## 4. Transition

### Explanation

A transition describes how to calculate the current DP state using previously computed states.

It is also called the recurrence relation.

Once we define the state, we need to determine how that state depends on smaller states.

#### Example: Fibonacci

State:

$$
dp[i] = F(i)
$$

Transition:

$$
dp[i] = dp[i-1] + dp[i-2]
$$

This means the current Fibonacci number is the sum of the previous two Fibonacci numbers.


### Common Transition Patterns

| Problem Type | Transition Example |
|---|---|
| Fibonacci | dp[i-1] + dp[i-2] |
| Minimum cost | cost + min(previous states) |
| Maximum profit | max(previous choices) |
| Counting paths | sum(valid previous states) |
| Knapsack | max(include, exclude) |

**Key Takeaway:** The transition is the mathematical relationship that connects smaller DP states to larger DP states.

---

## 5. Base Cases

### Explanation

Base cases are the smallest subproblems whose answers are already known.

They provide the starting point for calculating larger DP states.

Without correct base cases, a DP solution may produce incorrect results or access invalid array positions.

#### Example: Fibonacci

Fibonacci recurrence:

$$
F(n) = F(n-1) + F(n-2)
$$

We cannot directly apply this recurrence to `F(0)` and `F(1)` without defining their values.

Therefore, we define:

$$
F(0) = 0
$$

$$
F(1) = 1
$$

These are the base cases.

#### Python Implementation

```python
def fibonacci(n):
    if n == 0:
        return 0

    if n == 1:
        return 1

    dp = [0] * (n + 1)

    dp[0] = 0
    dp[1] = 1

    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]


print(fibonacci(5))  # 5
```

### Common Base Case Examples

| Problem | Base Case |
|---|---|
| Fibonacci | F(0) = 0, F(1) = 1 |
| Climbing stairs | Ways(0) = 1 |
| Grid paths | Starting cell has 1 path |
| Knapsack | Capacity 0 gives value 0 |
| LCS | Empty string gives LCS length 0 |

**Key Takeaway:** Base cases establish the foundation from which all other DP states are calculated. Always verify them carefully.

---

## 6. Memoization (Top-Down DP)

### Explanation

Memoization is a Dynamic Programming technique that combines recursion with caching.

Instead of calculating the same subproblem repeatedly, we store its result and reuse it whenever the same subproblem occurs again.

It follows a top-down approach:

1. Start with the original problem.
2. Recursively break it into smaller problems.
3. Store calculated results.
4. Reuse stored results when needed.

### Example: Fibonacci

Normal recursive implementation:

```python
def fibonacci(n):
    if n <= 1:
        return n

    return fibonacci(n - 1) + fibonacci(n - 2)
```

This recalculates the same values repeatedly.

Memoized implementation:

```python
def fibonacci(n, memo=None):
    if memo is None:
        memo = {}

    if n <= 1:
        return n

    if n in memo:
        return memo[n]

    memo[n] = (
        fibonacci(n - 1, memo) +
        fibonacci(n - 2, memo)
    )

    return memo[n]


print(fibonacci(5))  # 5
```

### Algorithm

1. Create an empty dictionary to store calculated results.
2. Check whether the current input is a base case.
3. If the answer is already cached, return it.
4. Otherwise, recursively calculate smaller subproblems.
5. Store the calculated answer in the dictionary.
6. Return the stored answer.

### Dry Run

Input:

```text
fibonacci(5)
```

Execution:

```text
fibonacci(5)
    fibonacci(4)
        fibonacci(3)
            fibonacci(2)
                fibonacci(1) = 1
                fibonacci(0) = 0
            memo[2] = 1

            fibonacci(1) = 1
        memo[3] = 2

        fibonacci(2) → Found in memo = 1
    memo[4] = 3

    fibonacci(3) → Found in memo = 2

memo[5] = 5
```

Final cache:

```python
{
    2: 1,
    3: 2,
    4: 3,
    5: 5
}
```

Output:

```text
5
```

### Complexity Analysis

- Time Complexity: O(n).
- Space Complexity: O(n) for the cache and recursion stack.

### Python Alternative: functools.cache

Python also provides a built-in caching decorator.

```python
from functools import cache

@cache
def fibonacci(n):
    if n <= 1:
        return n

    return fibonacci(n - 1) + fibonacci(n - 2)


print(fibonacci(5))  # 5
```

**Key Takeaway:** Memoization solves problems recursively and stores previously calculated results to eliminate repeated work.

---

## 7. Tabulation (Bottom-Up DP)

### Explanation

Tabulation is a Dynamic Programming technique that solves smaller subproblems first and uses their results to calculate larger subproblems.

It follows a bottom-up approach.

Unlike memoization, tabulation generally uses iteration instead of recursion.

### Example: Fibonacci

State:

$$
dp[i] = F(i)
$$

Transition:

$$
dp[i] = dp[i-1] + dp[i-2]
$$

Base cases:

$$
dp[0] = 0,\quad dp[1] = 1
$$

### Python Implementation

```python
def fibonacci(n):
    dp = [0] * (n + 1)

    if n >= 1:
        dp[1] = 1

    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]


print(fibonacci(5))  # 5
```

### Algorithm

1. Create a DP array of size `n + 1`.
2. Initialize the base cases.
3. Iterate from the smallest unsolved state to the target state.
4. Apply the transition formula at each position.
5. Return the final DP state.

### Dry Run

Input:

```text
n = 5
```

Initially:

```text
dp = [0, 1, 0, 0, 0, 0]
```

Iteration:

| i | Calculation | dp |
|---|---|---|
| 2 | 0 + 1 = 1 | [0, 1, 1, 0, 0, 0] |
| 3 | 1 + 1 = 2 | [0, 1, 1, 2, 0, 0] |
| 4 | 2 + 1 = 3 | [0, 1, 1, 2, 3, 0] |
| 5 | 3 + 2 = 5 | [0, 1, 1, 2, 3, 5] |

Output:

```text
5
```

### Complexity Analysis

- Time Complexity: O(n).
- Space Complexity: O(n).

### Memoization vs Tabulation

| Feature | Memoization | Tabulation |
|---|---|---|
| Approach | Top-down | Bottom-up |
| Technique | Recursion | Iteration |
| Calculation | On demand | Usually all required states |
| Storage | Cache/dictionary | DP array/table |
| Recursion stack | Required | Not required |
| Risk of recursion limit | Yes | No |
| Implementation | Often intuitive | Often more iterative |

**Key Takeaway:** Memoization starts with the original problem and moves downward. Tabulation starts with the smallest subproblems and builds upward.

---

## 8. Space Optimization

### Explanation

Space optimization is the process of reducing the extra memory used by a Dynamic Programming solution.

Sometimes, calculating the current state requires only a few previous states rather than the entire DP array.

In such cases, we can store only the necessary previous values.

This reduces space complexity without changing the result.

### Example: Fibonacci

Normal tabulation:

```python
def fibonacci(n):
    dp = [0] * (n + 1)

    if n >= 1:
        dp[1] = 1

    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]
```

Space Complexity: $O(n)$

But notice the transition:

$$
dp[i] = dp[i-1] + dp[i-2]
$$

We only need the previous two values.

Therefore, storing the entire array is unnecessary.

### Space-Optimized Python Implementation

```python
def fibonacci(n):
    if n <= 1:
        return n

    prev2 = 0
    prev1 = 1

    for i in range(2, n + 1):
        current = prev1 + prev2

        prev2 = prev1
        prev1 = current

    return prev1


print(fibonacci(5))  # 5
```

### Algorithm

1. Initialize the first two Fibonacci values.
2. Calculate the current value using the previous two values.
3. Move the previous values forward.
4. Repeat until reaching `n`.
5. Return the latest calculated value.

### Dry Run

Input:

```text
n = 5
```

Initial values:

```text
prev2 = 0
prev1 = 1
```

| i | prev2 | prev1 | current |
|---|---:|---:|---:|
| 2 | 0 | 1 | 1 |
| 3 | 1 | 1 | 2 |
| 4 | 1 | 2 | 3 |
| 5 | 2 | 3 | 5 |

Final answer:

```text
5
```

### Complexity Analysis

- Time Complexity: O(n).
- Space Complexity: O(1).

### When Can We Optimize Space?

Space optimization is possible when the current state depends only on a limited number of previous states.

Examples:

| Problem | Original Space | Optimized Space |
|---|---|---|
| Fibonacci | O(n) | O(1) |
| Climbing stairs | O(n) | O(1) |
| Grid DP | O(rows × cols) | O(cols) |
| LCS | O(m × n) | O(min(m, n)) |

Note: Space optimization is problem-dependent. Some DP problems require retaining more historical states or reconstructing the actual solution, which may need additional storage.

**Key Takeaway:** Always examine the DP transition to determine whether the entire DP table is necessary.
