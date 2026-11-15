# Dynamic Programming - Patterns - 2

## 3. Knapsack Dynamic Programming

Knapsack DP is used when we have a collection of items and need to select items while satisfying a capacity or target constraint.

Common objectives include:
- Maximizing total value.
- Minimizing cost.
- Determining whether a target sum is possible.
- Counting combinations or selections.

The most important distinction is whether an item can be selected once or multiple times.

### 3.1 0/1 Knapsack

#### Explanation

You are given:
- N items.
- A weight for each item.
- A value for each item.
- A knapsack with maximum capacity W.

Each item can be selected either:
- Once.
- Not at all.

Find the maximum total value without exceeding the capacity.

#### Example

```text
weights = [1, 3, 4]
values  = [15, 20, 30]

capacity = 4
```

Possible selections:

| Selected Items | Weight | Value |
|---|---:|---:|
| Item 0 | 1 | 15 |
| Item 1 | 3 | 20 |
| Item 2 | 4 | 30 |
| Items 0 and 1 | 4 | 35 |

Maximum value:

```text
35
```

#### DP State

$$
dp[i][w] = \text{maximum value using first i items with capacity w}
$$

#### Choices

**1. Exclude the current item**

$$
dp[i-1][w]
$$

**2. Include the current item**

If its weight does not exceed capacity:

$$
value[i-1]+dp[i-1][w-weight[i-1]]
$$

#### Transition

$$
dp[i][w] =
\begin{cases}
dp[i-1][w] & weight_i>w\\
\max(dp[i-1][w],value_i+dp[i-1][w-weight_i]) & otherwise
\end{cases}
$$

#### Base Cases

$$
dp[0][w]=0
$$

$$
dp[i][0]=0
$$

#### Algorithm

1. Create a DP table of `(n+1) × (W+1)`.
2. Initialize the first row and first column to zero.
3. Iterate through every item.
4. Iterate through every capacity.
5. Compare including and excluding the current item.
6. Store the maximum value.
7. Return `dp[n][W]`.

#### Python Implementation

```python
def knapsack(weights, values, capacity):
    n = len(weights)

    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        weight = weights[i - 1]
        value = values[i - 1]

        for w in range(capacity + 1):

            # Exclude current item
            dp[i][w] = dp[i - 1][w]

            # Include current item if possible
            if weight <= w:
                dp[i][w] = max(
                    dp[i][w],
                    value + dp[i - 1][w - weight]
                )

    return dp[n][capacity]


weights = [1, 3, 4]
values = [15, 20, 30]

print(knapsack(weights, values, 4))  # 35
```

#### Dry Run

Input:

```text
weights = [1, 3, 4]
values  = [15, 20, 30]
capacity = 4
```

DP table:

```text
       Capacity
       0  1  2  3  4

Items 0  0  0  0  0
  1   0 15 15 15 15
  2   0 15 15 20 35
  3   0 15 15 20 35
```

For the final capacity:

```text
dp[3][4] = max(
    dp[2][4],
    30 + dp[2][0]
)

= max(35, 30)
= 35
```

Output:

```text
35
```

#### Complexity Analysis

- Time Complexity: O(n × W).
- Space Complexity: O(n × W).

#### Important Space Optimization

For 0/1 Knapsack, we can use a one-dimensional array.

The capacity loop must run backward.

```python
def knapsack(weights, values, capacity):
    dp = [0] * (capacity + 1)

    for i in range(len(weights)):
        for w in range(capacity, weights[i] - 1, -1):

            dp[w] = max(
                dp[w],
                values[i] + dp[w - weights[i]]
            )

    return dp[capacity]


print(knapsack([1, 3, 4], [15, 20, 30], 4))  # 35
```

Why iterate backward?

Because each item can be used only once. Backward iteration ensures that the current item cannot reuse a value calculated earlier in the same iteration.

- Time: O(n × W).
- Space: O(W).

---

### 3.2 Unbounded Knapsack

#### Explanation

Unbounded Knapsack is similar to 0/1 Knapsack.

The difference is that each item can be selected unlimited times.

We need to maximize the total value without exceeding the capacity.

#### Example

```text
weights = [2, 3, 4]
values  = [10, 20, 30]

capacity = 6
```

Possible selection:

```text
Item 1: Weight 3, Value 20
Item 1: Weight 3, Value 20
```

Total:

```text
Weight = 6
Value = 40
```

#### DP State

$$
dp[w] = \text{maximum value achievable with capacity w}
$$

#### Transition

For every item:

$$
dp[w] =
\max(dp[w],value_i+dp[w-weight_i])
$$

The important difference is that `dp[w - weight[i]]` can already include the current item.

#### Python Implementation

```python
def unbounded_knapsack(weights, values, capacity):
    dp = [0] * (capacity + 1)

    for i in range(len(weights)):
        for w in range(weights[i], capacity + 1):

            dp[w] = max(
                dp[w],
                values[i] + dp[w - weights[i]]
            )

    return dp[capacity]


print(
    unbounded_knapsack(
        [2, 3, 4],
        [10, 20, 30],
        6
    )
)  # 40
```

#### Algorithm

1. Create a DP array of size `capacity + 1`.
2. Initialize all states to zero.
3. Iterate through each item.
4. Iterate capacity in ascending order, starting from the item's weight.
5. Compare excluding and including the current item.
6. Return the answer at the target capacity.

#### Dry Run

Input:

```text
weights = [2, 3, 4]
values  = [10, 20, 30]
capacity = 6
```

After processing item 1:

```text
[0, 0, 10, 10, 20, 20, 30]
```

After processing item 2:

```text
[0, 0, 10, 20, 20, 30, 40]
```

After processing item 3:

```text
[0, 0, 10, 20, 30, 30, 40]
```

Output:

```text
40
```

#### Complexity Analysis

- Time Complexity: O(n × W).
- Space Complexity: O(W).

#### 0/1 vs Unbounded Knapsack

| Feature | 0/1 Knapsack | Unbounded Knapsack |
|---|---|---|
| Item usage | Once | Unlimited |
| DP iteration | Backward | Forward |
| Previous state | Previous item row | Current item row |
| Space | O(W) optimized | O(W) optimized |

**Remember:**

- 0/1 Knapsack → Iterate capacity backward.
- Unbounded Knapsack → Iterate capacity forward.

---

### 3.3 Subset Sum

#### Explanation

Given an array of positive integers and a target sum, determine whether any subset of the array adds up to the target.

Each element can be selected at most once.

#### Example

Input:

```text
nums = [3, 4, 5, 2]
target = 9
```

A valid subset is:

```text
4 + 5 = 9
```

Output:

```text
True
```

#### DP State

$$
dp[i][s] = \text{whether sum s can be formed using first i elements}
$$

#### Transition

For every element, we have two choices.

**Exclude the element:**

$$
dp[i-1][s]
$$

**Include the element:**

$$
dp[i-1][s-nums[i-1]]
$$

Therefore:

$$
dp[i][s]=dp[i-1][s]\ OR\ dp[i-1][s-nums[i-1]]
$$

The inclusion option is valid only when `nums[i-1] <= s`.

#### Base Cases

$$
dp[i][0]=True
$$

A sum of zero can always be formed using an empty subset.

$$
dp[0][s]=False \quad (s>0)
$$

No positive sum can be formed using zero elements.

#### Python Implementation

```python
def subset_sum(nums, target):
    n = len(nums)

    dp = [[False] * (target + 1) for _ in range(n + 1)]

    for i in range(n + 1):
        dp[i][0] = True

    for i in range(1, n + 1):
        for s in range(1, target + 1):

            dp[i][s] = dp[i - 1][s]

            if nums[i - 1] <= s:
                dp[i][s] = (
                    dp[i][s] or
                    dp[i - 1][s - nums[i - 1]]
                )

    return dp[n][target]


print(subset_sum([3, 4, 5, 2], 9))  # True
```

#### Dry Run

Input:

```text
nums = [3, 4, 5]
target = 9
```

DP table:

```text
        0 1 2 3 4 5 6 7 8 9

No item T F F F F F F F F F
3      T F F T F F F F F F
4      T F F T T F F T F F
5      T F F T T T F T T T
```

The final state is:

```text
dp[3][9] = True
```

Because:

```text
4 + 5 = 9
```

Output:

```text
True
```

#### Space-Optimized Implementation

```python
def subset_sum(nums, target):
    dp = [False] * (target + 1)
    dp[0] = True

    for num in nums:
        for s in range(target, num - 1, -1):
            dp[s] = dp[s] or dp[s - num]

    return dp[target]


print(subset_sum([3, 4, 5, 2], 9))  # True
```

#### Complexity Analysis

- Time Complexity: O(n × target).
- 2D Space: O(n × target).
- Optimized Space: O(target).
