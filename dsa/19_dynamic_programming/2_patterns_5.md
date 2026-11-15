# Dynamic Programming - Patterns - 5

## 6. Interval Dynamic Programming

Interval DP is used when the problem involves solving subproblems over contiguous ranges of an array or string.

Instead of defining states by a single index, we define states using two boundaries.

$$
dp[i][j]
$$

This represents the answer for the interval from index `i` to index `j`.

A common technique is to process intervals in increasing order of their length.

### 6.1 Matrix Chain Multiplication

#### Explanation

Given a sequence of matrices, determine the most efficient way to multiply them.

Matrix multiplication is associative, meaning the order of grouping can change without changing the final result.

However, the number of scalar multiplications can vary significantly.

We need to minimize the total multiplication cost.

#### Example

Three matrices:

```text
A = 10 × 30
B = 30 × 5
C = 5 × 60
```

Option 1:

```text
(A × B) × C
```

Cost of A × B:

```text
10 × 30 × 5 = 1500
```

Result dimensions:

```text
10 × 5
```

Cost of multiplying with C:

```text
10 × 5 × 60 = 3000
```

Total:

```text
4500
```

Option 2:

```text
A × (B × C)
```

Cost of B × C:

```text
30 × 5 × 60 = 9000
```

Result dimensions:

```text
30 × 60
```

Cost of A multiplied by the result:

```text
10 × 30 × 60 = 18000
```

Total:

```text
27000
```

The first grouping is more efficient.

#### DP State

Let the dimensions array be:

```text
p = [10, 30, 5, 60]
```

$$
dp[i][j] =
\text{minimum scalar multiplications needed for matrices i through j}
$$

#### Transition

Try every possible split point `k`:

$$
dp[i][j] =
\min_{i\leq k<j}
\left(
dp[i][k]+dp[k+1][j]+
p[i-1]\times p[k]\times p[j]
\right)
$$

#### Base Case

$$
dp[i][i]=0
$$

A single matrix requires no multiplication.

#### Algorithm

1. Create a 2D DP table.
2. Initialize diagonal values to zero.
3. Process intervals by increasing length.
4. Try every possible split point.
5. Calculate left cost, right cost, and multiplication cost.
6. Store the minimum.
7. Return the cost for the full interval.

#### Python Implementation

```python
def matrix_chain_order(p):
    n = len(p) - 1

    dp = [[0] * n for _ in range(n)]

    for length in range(2, n + 1):

        for i in range(n - length + 1):

            j = i + length - 1

            dp[i][j] = float("inf")

            for k in range(i, j):

                cost = (
                    dp[i][k] +
                    dp[k + 1][j] +
                    p[i] * p[k + 1] * p[j + 1]
                )

                dp[i][j] = min(
                    dp[i][j],
                    cost
                )

    return dp[0][n - 1]


print(matrix_chain_order([10, 30, 5, 60]))  # 4500
```

#### Dry Run

Input:

```text
p = [10, 30, 5, 60]
```

Matrices:

```text
A = 10 × 30
B = 30 × 5
C = 5 × 60
```

Length 2 intervals:

```text
dp[0][1] = 10 × 30 × 5
         = 1500

dp[1][2] = 30 × 5 × 60
         = 9000
```

Length 3 interval:

Split after A:

```text
0 + 9000 + (10 × 30 × 60)
= 27000
```

Split after B:

```text
1500 + 0 + (10 × 5 × 60)
= 4500
```

Minimum:

```text
4500
```

Output:

```text
4500
```

#### Complexity Analysis

- Time Complexity: O(n³).
- Space Complexity: O(n²).

---

### 6.2 Burst Balloons

#### Explanation

You are given an array representing balloons.

Each balloon has a number.

When you burst balloon `i`, you gain:

$$
nums[left]\times nums[i]\times nums[right]
$$

Here, `left` and `right` are the nearest balloons that have not yet been burst.

Find the maximum coins obtainable by bursting all balloons.

#### Example

Input:

```text
nums = [3, 1, 5, 8]
```

One optimal bursting order:

```text
1. Burst 1: 3 × 1 × 5 = 15
2. Burst 5: 3 × 5 × 8 = 120
3. Burst 3: 1 × 3 × 8 = 24
4. Burst 8: 1 × 8 × 1 = 8
```

Total:

```text
167
```

#### Important Insight

This problem is difficult if we decide which balloon to burst first.

Instead, consider which balloon is burst last within an interval.

When a balloon is burst last, its left and right boundaries are still present.

This makes the transition easier.

#### Preprocessing

Add boundary balloons with value 1:

```text
[1] + nums + [1]
```

For the example:

```text
[1, 3, 1, 5, 8, 1]
```

#### DP State

$$
dp[left][right] = \text{maximum coins obtained by bursting all balloons between left and right}
$$

The boundaries themselves are not burst in this interval.

#### Transition

Choose balloon `k` as the last balloon to burst.

$$
dp[left][right] =
\max_{left<k<right}
\left(
dp[left][k]+
dp[k][right]+
a[left]\times a[k]\times a[right]
\right)
$$

#### Base Case

If there are no balloons between two boundaries:

$$
dp[left][right]=0
$$

#### Algorithm

1. Add 1 to both ends of the array.
2. Create a 2D DP table initialized to zero.
3. Process intervals from smaller to larger.
4. Try each possible last balloon.
5. Calculate left interval, right interval, and last burst reward.
6. Store the maximum.
7. Return the answer for the full interval.

#### Python Implementation

```python
def max_coins(nums):
    nums = [1] + nums + [1]

    n = len(nums)

    dp = [[0] * n for _ in range(n)]

    for length in range(2, n):

        for left in range(n - length):

            right = left + length

            for k in range(left + 1, right):

                coins = (
                    dp[left][k] +
                    dp[k][right] +
                    nums[left] * nums[k] * nums[right]
                )

                dp[left][right] = max(
                    dp[left][right],
                    coins
                )

    return dp[0][n - 1]


print(max_coins([3, 1, 5, 8]))  # 167
```

#### Dry Run

Input:

```text
[3, 1, 5, 8]
```

Padded array:

```text
[1, 3, 1, 5, 8, 1]
```

Consider bursting all balloons.

One optimal order:

```text
Burst 1:
3 × 1 × 5 = 15

Burst 5:
3 × 5 × 8 = 120

Burst 3:
1 × 3 × 8 = 24

Burst 8:
1 × 8 × 1 = 8
```

Total:

```text
15 + 120 + 24 + 8 = 167
```

The DP considers every possible last balloon in each interval and finds the maximum.

Output:

```text
167
```

#### Complexity Analysis

- Time Complexity: O(n³).
- Space Complexity: O(n²).

#### Interval DP Recognition

Look for problems where:
- The state represents a continuous interval.
- You need to choose a split point.
- You must decide the first or last operation.
- The answer depends on smaller intervals.
