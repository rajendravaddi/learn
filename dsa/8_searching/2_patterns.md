# Patterns

## 1. Binary Search on Sorted Data

### Definition

Binary Search on Sorted Data is a searching pattern used to find a target element in a sorted collection by repeatedly dividing the search space into two halves.

The sorted property allows us to eliminate half of the search space based on the comparison between the middle element and the target.

It can be applied to ascending or descending sorted collections, provided the comparison logic is adjusted accordingly.

### Algorithm

1. Initialize `low = 0` and `high = n - 1`.
2. Calculate the middle index.
3. Compare the middle element with the target.
   - If equal, return the index.
   - If the target is smaller, search the left half.
   - If the target is greater, search the right half.
4. Repeat until the target is found or the search space becomes empty.
5. Return -1 if the target does not exist.

### Pseudocode

```text
binarySearch(array, target):
    low = 0
    high = n - 1

    while low <= high:
        mid = low + (high - low) / 2

        if array[mid] == target:
            return mid

        else if target < array[mid]:
            high = mid - 1

        else:
            low = mid + 1

    return -1
```

### Dry Run

**Input:**

```text
array = [10, 20, 30, 40, 50, 60, 70]
target = 50
```

**Initial Values:**

```text
low = 0
high = 6
```

**Execution:**

| Iteration | low | high | mid | array[mid] | Decision |
|---|---:|---:|---:|---:|---|
| 1 | 0 | 6 | 3 | 40 | 50 > 40, search right |
| 2 | 4 | 6 | 5 | 60 | 50 < 60, search left |
| 3 | 4 | 4 | 4 | 50 | Target found |

**Final Result:**

```text
Target found at index 4
```

### Time Complexity

- Best Case: O(1)
- Average Case: O(log n)
- Worst Case: O(log n)

### Space Complexity

O(1) for the iterative approach.

### Key Points

- The collection must be sorted.
- Each iteration eliminates approximately half of the remaining search space.
- Binary Search is suitable for efficiently searching large sorted collections.

---

## 2. Binary Search on Answer

### Definition

Binary Search on Answer is a searching pattern used to find an optimal answer within a range of possible values instead of searching for an element in a collection.

It is applicable when a problem has a monotonic feasibility condition.

A feasibility function determines whether a particular candidate answer satisfies the given problem constraints.

The condition must change in only one direction across the search space.

For example:

- If a value is feasible, larger values may also be feasible.
- If a value is not feasible, smaller values may also be infeasible.

Depending on the problem, we search for the minimum feasible or maximum feasible answer.

### Algorithm

1. Identify the possible range of answers.
2. Initialize `low` and `high` to represent the answer range.
3. Calculate the middle candidate answer.
4. Check whether the candidate answer is feasible.
5. Based on the feasibility result:
   - Move towards smaller answers if searching for the minimum feasible value.
   - Move towards larger answers if searching for the maximum feasible value.
6. Repeat until the search space is exhausted.
7. Return the optimal answer.

### General Pseudocode

```text
binarySearchOnAnswer(low, high):
    while low < high:
        mid = low + (high - low) / 2

        if isFeasible(mid):
            high = mid
        else:
            low = mid + 1

    return low
```

This version finds the minimum feasible value when feasibility is monotonic from false to true.

For maximum feasible value, the search direction and midpoint calculation must be adjusted.

### Dry Run

**Problem:**

Find the minimum capacity required to process all workloads within the allowed limit.

Suppose the feasibility condition is:

```text
isFeasible(capacity):
    return capacity >= 6
```

The possible capacity range is from 1 to 10.

**Initial Values:**

```text
low = 1
high = 10
```

**Execution:**

| Iteration | low | high | mid | Feasible? | Decision |
|---|---:|---:|---:|---|---|
| 1 | 1 | 10 | 5 | No | Search right |
| 2 | 6 | 10 | 8 | Yes | Search left |
| 3 | 6 | 8 | 7 | Yes | Search left |
| 4 | 6 | 7 | 6 | Yes | Search left |

Now `low = high = 6`.

**Final Result:**

```text
Minimum feasible answer = 6
```

### Time Complexity

O(log R × F)

Where:

- R = Size of the answer search range.
- F = Time required to evaluate the feasibility function.

### Space Complexity

Depends on the space required by the feasibility function. The binary search itself uses O(1) auxiliary space.

### Key Points

- Search is performed over possible answers rather than array indices.
- A monotonic feasibility condition is required.
- A feasibility function validates whether a candidate answer satisfies the constraints.
- Commonly used in optimization problems.

---

## 3. Search Space Reduction

### Definition

Search Space Reduction is a pattern in which the possible search range is progressively reduced based on certain conditions.

At every step, a portion of the search space is eliminated because it cannot contain the required answer.

Binary Search is one of the most common techniques that uses search space reduction.

However, search space reduction is a broader concept and can be applied to problems where the search range can be reduced using logical conditions.

### Algorithm

1. Identify the initial search space.
2. Evaluate the current candidate or middle element.
3. Determine which portion of the search space can be eliminated.
4. Update the search boundaries.
5. Repeat until the required answer is found or the search space becomes empty.

### General Pseudocode

```text
search(array, target):
    low = 0
    high = n - 1

    while low <= high:
        mid = low + (high - low) / 2

        if condition(mid):
            return mid

        else if eliminateLeftHalf(mid):
            low = mid + 1

        else:
            high = mid - 1

    return -1
```

The actual conditions depend on the problem and must guarantee that the eliminated region cannot contain the answer.

### Dry Run

**Input:**

```text
array = [2, 4, 6, 8, 10, 12, 14]
target = 12
```

**Initial Search Space:**

```text
low = 0
high = 6
```

**Execution:**

| Iteration | Search Space | mid | array[mid] | Decision |
|---|---|---:|---:|---|
| 1 | [0, 6] | 3 | 8 | Eliminate left half |
| 2 | [4, 6] | 5 | 12 | Target found |

**Explanation:**

- Iteration 1: The middle element is 8. Since the target is greater, indices 0 through 3 can be eliminated.
- Iteration 2: The middle element is 12. The target is found.

**Final Result:**

```text
Target found at index 5
```

### Time Complexity

Depends on how much of the search space is eliminated in each iteration.

- If half is eliminated every time: O(log n).
- If only one element is eliminated every time: O(n).

### Space Complexity

O(1) for an iterative implementation.

### Key Points

- The main idea is to eliminate impossible candidates.
- The search space must be reduced without discarding the valid answer.
- Binary Search is a specific application of this broader pattern.
- The reduction condition depends on the structure of the problem.

---

## 4. Minimum Feasible Value

### Definition

Minimum Feasible Value is a Binary Search on Answer pattern used to find the smallest value that satisfies a given condition.

It is applicable when feasibility follows a monotonic false-to-true pattern.

For example:

```text
Value:      1  2  3  4  5  6  7  8
Feasible:   F  F  F  T  T  T  T  T
```

The objective is to find the first `True` position.

### Algorithm

1. Identify the minimum and maximum possible answers.
2. Initialize `low` and `high`.
3. Calculate the middle value.
4. Check whether the middle value is feasible.
5. If feasible:
   - Store or retain the current candidate.
   - Search the left half for a smaller feasible value.
6. If not feasible:
   - Search the right half.
7. Continue until `low == high`.
8. Return the minimum feasible value.

### Pseudocode

```text
minimumFeasible(low, high):
    while low < high:
        mid = low + (high - low) / 2

        if isFeasible(mid):
            high = mid
        else:
            low = mid + 1

    return low
```

### Dry Run

**Problem:**

Find the minimum value that satisfies a given feasibility condition.

```text
Value:      1  2  3  4  5  6  7  8  9  10
Feasible:   F  F  F  F  T  T  T  T  T  T
```

**Initial Values:**

```text
low = 1
high = 10
```

**Execution:**

| Iteration | low | high | mid | Feasible? | Decision |
|---|---:|---:|---:|---|---|
| 1 | 1 | 10 | 5 | Yes | Search left |
| 2 | 1 | 5 | 3 | No | Search right |
| 3 | 4 | 5 | 4 | No | Search right |

Now `low = high = 5`.

**Final Result:**

```text
Minimum Feasible Value = 5
```

### Time Complexity

O(log R × F)

Where:

- R = Search range.
- F = Feasibility checking time.

### Space Complexity

O(1) auxiliary space, excluding the feasibility function's additional space requirements.

### Key Points

- Finds the first feasible value.
- Requires a monotonic false-to-true feasibility condition.
- Whenever a feasible value is found, continue searching left.
- Commonly used in minimum-capacity, minimum-time, and minimum-limit problems.

---

## 5. Maximum Feasible Value

### Definition

Maximum Feasible Value is a Binary Search on Answer pattern used to find the largest value that satisfies a given condition.

It is applicable when feasibility follows a monotonic true-to-false pattern.

For example:

```text
Value:      1  2  3  4  5  6  7  8
Feasible:   T  T  T  T  F  F  F  F
```

The objective is to find the last `True` position.

### Algorithm

1. Identify the minimum and maximum possible answers.
2. Initialize `low` and `high`.
3. Calculate the upper middle value.
4. Check whether the middle value is feasible.
5. If feasible:
   - Store or retain the current candidate.
   - Search the right half for a larger feasible value.
6. If not feasible:
   - Search the left half.
7. Continue until `low == high`.
8. Return the maximum feasible value.

For integer search spaces, use an upper midpoint to avoid an infinite loop.

### Pseudocode

```text
maximumFeasible(low, high):
    while low < high:
        mid = low + (high - low + 1) / 2

        if isFeasible(mid):
            low = mid
        else:
            high = mid - 1

    return low
```

### Dry Run

**Problem:**

Find the maximum value that satisfies a given feasibility condition.

```text
Value:      1  2  3  4  5  6  7  8  9  10
Feasible:   T  T  T  T  T  T  F  F  F  F
```

**Initial Values:**

```text
low = 1
high = 10
```

**Execution:**

| Iteration | low | high | mid | Feasible? | Decision |
|---|---:|---:|---:|---|---|
| 1 | 1 | 10 | 6 | Yes | Search right |
| 2 | 6 | 10 | 8 | No | Search left |
| 3 | 6 | 7 | 7 | No | Search left |

Now `low = high = 6`.

**Final Result:**

```text
Maximum Feasible Value = 6
```

### Time Complexity

O(log R × F)

Where:

- R = Search range.
- F = Feasibility checking time.

### Space Complexity

O(1) auxiliary space, excluding the feasibility function's additional space requirements.

### Key Points

- Finds the last feasible value.
- Requires a monotonic true-to-false feasibility condition.
- Whenever a feasible value is found, continue searching right.
- Use an upper midpoint to ensure progress in integer search spaces.

---

## 6. Peak Finding

### Definition

Peak Finding is a searching pattern used to find an element that is greater than or equal to its neighboring elements.

An element is considered a peak if it satisfies:

```text
array[i] >= array[i - 1]
AND
array[i] >= array[i + 1]
```

For boundary elements, only the existing neighbor is considered.

A peak does not necessarily have to be the maximum element in the entire collection.

Binary Search can be used to find a peak by comparing the middle element with its right neighbor.

### Algorithm

1. Initialize `low = 0` and `high = n - 1`.
2. Execute a loop while `low < high`.
3. Calculate the middle index.
4. Compare `array[mid]` with `array[mid + 1]`.
   - If `array[mid] < array[mid + 1]`, a peak exists in the right half.
   - Otherwise, a peak exists at the middle position or in the left half.
5. Update the search boundaries accordingly.
6. When `low == high`, return that index.

This approach assumes the array has at least one peak, which is guaranteed for a non-empty finite array under the usual boundary definition.

### Pseudocode

```text
findPeak(array):
    low = 0
    high = n - 1

    while low < high:
        mid = low + (high - low) / 2

        if array[mid] < array[mid + 1]:
            low = mid + 1
        else:
            high = mid

    return low
```

### Dry Run

**Input:**

```text
array = [1, 3, 7, 12, 9, 5, 2]
```

**Initial Values:**

```text
low = 0
high = 6
```

**Execution:**

| Iteration | low | high | mid | array[mid] | array[mid+1] | Decision |
|---|---:|---:|---:|---:|---:|---|
| 1 | 0 | 6 | 3 | 12 | 9 | Search left |
| 2 | 0 | 3 | 1 | 3 | 7 | Search right |
| 3 | 2 | 3 | 2 | 7 | 12 | Search right |

Now `low = high = 3`.

**Explanation:**

- Iteration 1: Since 12 is greater than 9, a peak exists at index 3 or somewhere to its left. Update `high = 3`.
- Iteration 2: Since 3 is smaller than 7, a peak exists to the right. Update `low = 2`.
- Iteration 3: Since 7 is smaller than 12, continue searching right. Update `low = 3`.
- Now both pointers are equal.

**Final Result:**

```text
Peak Element = 12
Peak Index = 3
```

### Time Complexity

O(log n)

### Space Complexity

O(1)

### Key Points

- A peak element is greater than or equal to its existing neighbors.
- The peak does not have to be the global maximum.
- Binary Search can locate a peak in logarithmic time.
- Comparing the middle element with its right neighbor helps determine the search direction.

---

## 7. Rotated Sorted Array

### Definition

A Rotated Sorted Array is an originally sorted collection that has been rotated around a particular position.

For example:

```text
Original Array:
[10, 20, 30, 40, 50, 60, 70]

Rotated Array:
[40, 50, 60, 70, 10, 20, 30]
```

Although the entire collection is no longer sorted, at least one half of the search space is sorted when all elements are distinct.

Binary Search can be modified to identify the sorted half and determine whether the target belongs to that half.

### Algorithm

1. Initialize `low = 0` and `high = n - 1`.
2. Execute a loop while `low <= high`.
3. Calculate the middle index.
4. If the middle element matches the target, return its index.
5. Determine which half is sorted:
   - If `array[low] <= array[mid]`, the left half is sorted.
   - Otherwise, the right half is sorted.
6. Check whether the target belongs to the sorted half.
7. If it belongs, search that half.
8. Otherwise, search the other half.
9. Repeat until the target is found or the search space becomes empty.

### Pseudocode

```text
searchRotatedArray(array, target):
    low = 0
    high = n - 1

    while low <= high:
        mid = low + (high - low) / 2

        if array[mid] == target:
            return mid

        if array[low] <= array[mid]:

            if array[low] <= target
               AND target < array[mid]:
                high = mid - 1
            else:
                low = mid + 1

        else:

            if array[mid] < target
               AND target <= array[high]:
                low = mid + 1
            else:
                high = mid - 1

    return -1
```

### Dry Run

**Input:**

```text
array = [40, 50, 60, 70, 10, 20, 30]
target = 20
```

**Initial Values:**

```text
low = 0
high = 6
```

**Execution:**

| Iteration | low | high | mid | array[mid] | Sorted Half | Decision |
|---|---:|---:|---:|---:|---|---|
| 1 | 0 | 6 | 3 | 70 | Left: [40, 50, 60, 70] | 20 is not in left half; search right |
| 2 | 4 | 6 | 5 | 20 | Right: [10, 20, 30] | Target found |

**Explanation:**

- Iteration 1: The middle element is 70. The left half `[40, 50, 60, 70]` is sorted. Since 20 does not belong to this range, eliminate the left half and update `low = 4`.
- Iteration 2: The middle element is 20. The target is found.

**Final Result:**

```text
Target found at index 5
```

### Time Complexity

- Best Case: O(1)
- Average Case: O(log n)
- Worst Case: O(log n) when elements are distinct.

With duplicates, identifying the sorted half can become ambiguous. The worst-case time complexity may degrade to O(n).

### Space Complexity

O(1)

### Key Points

- The original sorted array is rotated around a pivot.
- With distinct elements, at least one half is sorted.
- Identify the sorted half before deciding which direction to search.
- Eliminate the half that cannot contain the target.
- With duplicates, additional boundary handling may be required.