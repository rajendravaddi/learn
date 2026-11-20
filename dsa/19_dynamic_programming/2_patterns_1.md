# Dynamic Programming - Patterns - 1

## 1. 1D Dynamic Programming

### 1.1 House Robber

#### Explanation

You are a robber planning to rob houses along a street.

Each house contains a certain amount of money.

However, you cannot rob two adjacent houses because doing so triggers an alarm.

Find the maximum amount of money you can rob.

#### Example

Input:

```text
nums = [2, 7, 9, 3, 1]
```

Possible optimal selection:

```text
House 0 = 2
House 2 = 9
House 4 = 1
```

Total:

```text
2 + 9 + 1 = 12
```

#### DP State

$$
dp[i] = \text{maximum money obtainable from houses } 0 \text{ to } i
$$

#### Choices

At every house, we have two choices.

**Choice 1: Rob the current house**

We must skip the previous house.

$$
nums[i] + dp[i-2]
$$

**Choice 2: Skip the current house**

We retain the best answer from previous houses.

$$
dp[i-1]
$$

#### Transition

$$
dp[i] = \max(dp[i-1], nums[i]+dp[i-2])
$$

#### Base Cases

$$
dp[0] = nums[0]
$$

$$
dp[1] = \max(nums[0],nums[1])
$$

#### Algorithm

1. Handle empty and single-element arrays.
2. Initialize the first two DP states.
3. Iterate through the remaining houses.
4. Compare robbing and skipping the current house.
5. Store the maximum.
6. Return the final state.

#### Python Implementation – Tabulation

```python
def rob(nums):
    n = len(nums)

    if n == 0:
        return 0

    if n == 1:
        return nums[0]

    dp = [0] * n

    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])

    for i in range(2, n):
        rob_current = nums[i] + dp[i - 2]
        skip_current = dp[i - 1]

        dp[i] = max(rob_current, skip_current)

    return dp[n - 1]


print(rob([2, 7, 9, 3, 1]))  # 12
```

#### Dry Run

Input:

```text
nums = [2, 7, 9, 3, 1]
```

| i | House | Rob Current (dp[i-2] + nums[i]) | Skip Current (dp[i-1]) | dp[i] |
|---|---:|---:|---:|---:|
| 0 | 2 | - | - | 2 |
| 1 | 7 | - | - | 7 |
| 2 | 9 | 2 + 9 = 11 | 7 | 11 |
| 3 | 3 | 7 + 3 = 10 | 11 | 11 |
| 4 | 1 | 11 + 1 = 12 | 11 | 12 |

Final DP array:

```text
[2, 7, 11, 11, 12]
```

Output:

```text
12
```

#### Space-Optimized Implementation

```python
def rob(nums):
    prev2 = 0
    prev1 = 0

    for money in nums:
        current = max(
            prev1,
            money + prev2
        )

        prev2 = prev1
        prev1 = current

    return prev1


print(rob([2, 7, 9, 3, 1]))  # 12
```

#### Complexity Analysis

- Time Complexity: O(n).
- Tabulation Space: O(n).
- Optimized Space: O(1).

#### Important Variations

- House Robber II: Houses are arranged in a circle.
- House Robber III: Houses form a binary tree.
- Maximum sum of non-adjacent elements.

**Pattern Recognition:** Whenever you must choose or skip an element and cannot choose adjacent elements, consider the House Robber DP pattern.

---

## 2. 2D Dynamic Programming

### 2.1 Grid DP

#### Explanation

Grid DP is used when a problem involves navigating through a two-dimensional grid.

The current cell's answer depends on answers from neighboring cells.

Common movement directions include:
- Right.
- Down.
- Diagonal.
- Other problem-specific directions.

A 2D DP table stores the result for each cell.

#### Example

Consider a grid:

```text
1  2  3
4  5  6
7  8  9
```

Suppose we can move only right or down.

We want to calculate the number of ways to reach each cell from the top-left corner.

#### DP State

$$
dp[i][j] = \text{number of ways to reach cell } (i,j)
$$

#### Transition

The current cell can be reached from:
- The cell above.
- The cell on the left.

Therefore:

$$
dp[i][j] = dp[i-1][j]+dp[i][j-1]
$$

#### Base Cases

Starting cell:

$$
dp[0][0]=1
$$

First row and first column have only one possible path.

#### Algorithm

1. Create a 2D DP table.
2. Initialize the starting cell.
3. Initialize the first row and first column.
4. Iterate through the remaining cells.
5. Calculate each cell using its top and left neighbors.
6. Return the destination cell.

#### Python Implementation

```python
def grid_paths(rows, cols):
    dp = [[0] * cols for _ in range(rows)]

    dp[0][0] = 1

    for i in range(rows):
        for j in range(cols):

            if i == 0 and j == 0:
                continue

            top = dp[i - 1][j] if i > 0 else 0
            left = dp[i][j - 1] if j > 0 else 0

            dp[i][j] = top + left

    return dp[rows - 1][cols - 1]


print(grid_paths(3, 3))  # 6
```

#### Dry Run

For a 3 × 3 grid:

```text
1  1  1
1  2  3
1  3  6
```

Explanation:

```text
dp[0][0] = 1

dp[1][1] = dp[0][1] + dp[1][0]
         = 1 + 1
         = 2

dp[2][2] = dp[1][2] + dp[2][1]
         = 3 + 3
         = 6
```

Output:

```text
6
```

#### Complexity Analysis

- Time Complexity: O(rows × cols).
- Space Complexity: O(rows × cols).

#### Space Optimization

Since each cell only needs the previous row's result and the current row's left result, we can use a single array.

```python
def grid_paths(rows, cols):
    dp = [1] * cols

    for i in range(1, rows):
        for j in range(1, cols):
            dp[j] += dp[j - 1]

    return dp[-1]


print(grid_paths(3, 3))  # 6
```

- Time Complexity: O(rows × cols).
- Space Complexity: O(cols).
