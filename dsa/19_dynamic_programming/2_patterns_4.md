# Dynamic Programming - Patterns - 4

## 5. Sequence Dynamic Programming

Sequence DP is used when we need to find an optimal subsequence, subarray, or sequence-related property.

Common objectives include:
- Longest increasing subsequence.
- Maximum sum subsequence.
- Maximum subarray sum.
- Longest decreasing subsequence.

### 5.1 Longest Increasing Subsequence (LIS)

#### Explanation

Given an array of integers, find the length of the longest strictly increasing subsequence.

A subsequence preserves the original order but does not need to be contiguous.

#### Example

Input:

```text
nums = [10, 9, 2, 5, 3, 7, 101, 18]
```

One longest increasing subsequence:

```text
2, 3, 7, 18
```

Output:

```text
4
```

#### DP State

$$
dp[i]=
\text{length of the LIS ending at index i}
$$

#### Transition

For every previous index `j`:

If:

$$
nums[j]<nums[i]
$$

Then:

$$
dp[i]=\max(dp[i],dp[j]+1)
$$

#### Base Case

$$
dp[i]=1
$$

Every element forms an increasing subsequence of length one.

#### Algorithm

1. Initialize every DP state to 1.
2. Iterate through each element.
3. Compare it with all previous elements.
4. If a previous element is smaller, extend its subsequence.
5. Store the maximum length.
6. Return the maximum value in the DP array.

#### Python Implementation – O(n²)

```python
def lis(nums):
    n = len(nums)

    if n == 0:
        return 0

    dp = [1] * n

    for i in range(n):
        for j in range(i):

            if nums[j] < nums[i]:
                dp[i] = max(
                    dp[i],
                    dp[j] + 1
                )

    return max(dp)


print(lis([10, 9, 2, 5, 3, 7, 101, 18]))  # 4
```

#### Dry Run

Input:

```text
nums = [3, 1, 2, 5, 4]
```

| Index | Number | LIS Ending Here |
|---|---:|---:|
| 0 | 3 | 1 |
| 1 | 1 | 1 |
| 2 | 2 | 2 |
| 3 | 5 | 3 |
| 4 | 4 | 3 |

Final DP array:

```text
[1, 1, 2, 3, 3]
```

One LIS:

```text
1 → 2 → 5
```

Output:

```text
3
```

#### Optimized Approach – Binary Search

We can optimize LIS to O(n log n) using binary search.

Maintain an array called `tails`.

`tails[i]` represents the smallest possible ending value of an increasing subsequence of length `i + 1`.

For each number:
- If it is greater than all values in `tails`, append it.
- Otherwise, replace the first value greater than or equal to it.

#### Python Implementation

```python
from bisect import bisect_left

def lis(nums):
    tails = []

    for num in nums:
        index = bisect_left(tails, num)

        if index == len(tails):
            tails.append(num)
        else:
            tails[index] = num

    return len(tails)


print(lis([10, 9, 2, 5, 3, 7, 101, 18]))  # 4
```

#### Dry Run

Input:

```text
[3, 1, 2, 5, 4]
```

| Number | tails |
|---|---|
| 3 | [3] |
| 1 | [1] |
| 2 | [1, 2] |
| 5 | [1, 2, 5] |
| 4 | [1, 2, 4] |

Output:

```text
3
```

Important: `tails` does not necessarily represent an actual subsequence. Its length represents the LIS length.

#### Complexity Analysis

| Approach | Time | Space |
|---|---|---|
| Basic DP | O(n²) | O(n) |
| Binary Search | O(n log n) | O(n) |

---

### 5.2 Maximum Subarray Variants

#### Explanation

Maximum Subarray problems involve finding a contiguous subarray that maximizes a particular property.

The classic problem asks for the maximum possible sum of a non-empty contiguous subarray.

This is closely related to Kadane's Algorithm, which is a space-optimized DP technique.

#### Example

Input:

```text
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
```

Maximum subarray:

```text
[4, -1, 2, 1]
```

Sum:

```text
6
```

#### DP State

$$
dp[i] = \text{maximum subarray sum ending at index i}
$$

#### Transition

At each index, we have two choices:

1. Extend the previous subarray.
2. Start a new subarray from the current element.

$$
dp[i]=\max(nums[i],dp[i-1]+nums[i])
$$

Final answer:

$$
\max(dp)
$$

#### Python Implementation – Tabulation

```python
def max_subarray(nums):
    n = len(nums)

    dp = [0] * n
    dp[0] = nums[0]

    for i in range(1, n):
        dp[i] = max(
            nums[i],
            dp[i - 1] + nums[i]
        )

    return max(dp)


print(
    max_subarray(
        [-2, 1, -3, 4, -1, 2, 1, -5, 4]
    )
)  # 6
```

#### Dry Run

Input:

```text
[-2, 1, -3, 4, -1, 2, 1, -5, 4]
```

| Number | Calculation | dp[i] |
|---|---|---:|
| -2 | Base case | -2 |
| 1 | max(1, -2 + 1) | 1 |
| -3 | max(-3, 1 - 3) | -2 |
| 4 | max(4, -2 + 4) | 4 |
| -1 | max(-1, 4 - 1) | 3 |
| 2 | max(2, 3 + 2) | 5 |
| 1 | max(1, 5 + 1) | 6 |
| -5 | max(-5, 6 - 5) | 1 |
| 4 | max(4, 1 + 4) | 5 |

DP array:

```text
[-2, 1, -2, 4, 3, 5, 6, 1, 5]
```

Maximum:

```text
6
```

#### Space-Optimized Implementation – Kadane's Algorithm

```python
def max_subarray(nums):
    current_sum = nums[0]
    max_sum = nums[0]

    for num in nums[1:]:

        current_sum = max(
            num,
            current_sum + num
        )

        max_sum = max(
            max_sum,
            current_sum
        )

    return max_sum


print(
    max_subarray(
        [-2, 1, -3, 4, -1, 2, 1, -5, 4]
    )
)  # 6
```

#### Complexity Analysis

- Time Complexity: O(n).
- Tabulation Space: O(n).
- Optimized Space: O(1).

#### Important Variations

**1. Maximum Circular Subarray Sum**

The subarray may wrap around the end of the array.

**2. Maximum Product Subarray**

Find the contiguous subarray with the largest product.

Because negative values can turn a minimum product into a maximum product, maintain both:

- Maximum product ending here.
- Minimum product ending here.

**3. Maximum Sum Increasing Subsequence**

Find the increasing subsequence with the maximum sum rather than maximum length.

**4. Maximum Sum of Non-Adjacent Elements**

Choose elements with maximum sum while avoiding adjacent selections. This is the House Robber pattern.
