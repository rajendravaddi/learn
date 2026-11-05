# Algorithms

## 1. Linear Search

### Definition

Linear Search is a searching algorithm that checks each element in a collection sequentially until the target element is found or all elements have been checked.

It does not require the collection to be sorted.

### Algorithm

1. Start from the first element.
2. Compare the current element with the target.
3. If both match, return the current index.
4. Otherwise, move to the next element.
5. If all elements are checked without a match, return -1.

### Pseudocode

```text
linearSearch(array, target):
    for i = 0 to n - 1:
        if array[i] == target:
            return i

    return -1
```

### Dry Run

**Input:**

```text
array = [12, 25, 8, 40, 16]
target = 40
```

**Execution:**

| Iteration | Index (i) | array[i] | Comparison | Result |
|---|---:|---:|---|---|
| 1 | 0 | 12 | 12 == 40 | Not found |
| 2 | 1 | 25 | 25 == 40 | Not found |
| 3 | 2 | 8 | 8 == 40 | Not found |
| 4 | 3 | 40 | 40 == 40 | Found |

**Final Result:**

```text
Target found at index 3
```

The algorithm stops immediately after finding the target.

### Time Complexity

- Best Case: O(1) — Target is at the first position.
- Average Case: O(n)
- Worst Case: O(n) — Target is at the last position or absent.

### Space Complexity

O(1)

### Key Point

Linear Search examines elements one by one and works on both sorted and unsorted collections.

## 2. Binary Search

### Definition

Binary Search is an efficient searching algorithm that repeatedly divides the search space into two halves to find a target element.

It requires the collection to be sorted.

### Algorithm

1. Initialize two pointers:
   - `low = 0`
   - `high = n - 1`
2. Calculate the middle index:
   - `mid = low + (high - low) / 2`
3. Compare the middle element with the target:
   - If equal, return the middle index.
   - If the target is smaller, search the left half.
   - If the target is larger, search the right half.
4. Repeat until the target is found or `low > high`.
5. If the target is not found, return -1.

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
target = 60
```

**Initial Values:**

```text
low = 0
high = 6
```

**Execution:**

| Iteration | low | high | mid | array[mid] | Decision |
|---|---:|---:|---:|---:|---|
| 1 | 0 | 6 | 3 | 40 | 60 > 40, search right |
| 2 | 4 | 6 | 5 | 60 | Target found |

**Explanation:**

- Iteration 1: Middle element is 40. Since 60 is greater than 40, eliminate the left half.
- Iteration 2: Middle element is 60. The target is found.

**Final Result:**

```text
Target found at index 5
```

### Time Complexity

- Best Case: O(1)
- Average Case: O(log n)
- Worst Case: O(log n)

### Space Complexity

O(1) for the iterative approach.

### Key Point

Binary Search eliminates half of the remaining search space in every iteration. It requires sorted data.

## 3. Recursive Binary Search

### Definition

Recursive Binary Search is a variation of Binary Search that uses recursion to repeatedly divide the search space into two halves until the target is found or the search space becomes empty.

It requires the collection to be sorted.

### Algorithm

1. Pass the array, target, low index, and high index to the function.
2. If `low > high`, return -1 because the target does not exist.
3. Calculate the middle index.
4. Compare the middle element with the target:
   - If equal, return the middle index.
   - If the target is smaller, recursively search the left half.
   - If the target is larger, recursively search the right half.
5. Continue until the target is found or the base condition is reached.

### Pseudocode

```text
recursiveBinarySearch(array, target, low, high):
    if low > high:
        return -1

    mid = low + (high - low) / 2

    if array[mid] == target:
        return mid

    else if target < array[mid]:
        return recursiveBinarySearch(
            array, target, low, mid - 1
        )

    else:
        return recursiveBinarySearch(
            array, target, mid + 1, high
        )
```

### Dry Run

**Input:**

```text
array = [10, 20, 30, 40, 50, 60, 70]
target = 60
```

**Initial Function Call:**

```text
recursiveBinarySearch(array, 60, 0, 6)
```

**Execution:**

| Recursive Call | low | high | mid | array[mid] | Decision |
|---|---:|---:|---:|---:|---|
| 1 | 0 | 6 | 3 | 40 | 60 > 40, search right |
| 2 | 4 | 6 | 5 | 60 | Target found |

**Recursive Call Flow:**

```text
Call 1: low = 0, high = 6
        mid = 3
        array[3] = 40

        60 > 40

        Call 2: low = 4, high = 6
                mid = 5
                array[5] = 60

                Target found
                Return 5

Return 5
```

**Final Result:**

```text
Target found at index 5
```

### Time Complexity

- Best Case: O(1)
- Average Case: O(log n)
- Worst Case: O(log n)

### Space Complexity

O(log n) due to the recursive call stack.

### Key Point

Recursive Binary Search uses function calls to reduce the search space instead of using a loop.

## 4. Lower Bound

### Definition

Lower Bound is a searching technique that finds the first position in a sorted collection where the element is greater than or equal to the target.

It returns the index of the first element satisfying:

```text
array[index] >= target
```

If no such element exists, it returns `n`.

### Algorithm

1. Initialize `low = 0` and `high = n`.
2. Execute a loop while `low < high`.
3. Calculate the middle index.
4. If `array[mid] >= target`, move towards the left half by updating `high = mid`.
5. Otherwise, move towards the right half by updating `low = mid + 1`.
6. When the loop terminates, return `low`.

### Pseudocode

```text
lowerBound(array, target):
    low = 0
    high = n

    while low < high:
        mid = low + (high - low) / 2

        if array[mid] >= target:
            high = mid
        else:
            low = mid + 1

    return low
```

### Dry Run

**Input:**

```text
array = [10, 20, 20, 20, 30, 40, 50]
target = 20
```

**Initial Values:**

```text
low = 0
high = 7
```

**Execution:**

| Iteration | low | high | mid | array[mid] | Decision |
|---|---:|---:|---:|---:|---|
| 1 | 0 | 7 | 3 | 20 | 20 >= 20, move left |
| 2 | 0 | 3 | 1 | 20 | 20 >= 20, move left |
| 3 | 0 | 1 | 0 | 10 | 10 < 20, move right |

**Explanation:**

- Iteration 1: Element at index 3 is 20. It satisfies the condition, so update `high = 3`.
- Iteration 2: Element at index 1 is 20. It also satisfies the condition, so update `high = 1`.
- Iteration 3: Element at index 0 is 10. It does not satisfy the condition, so update `low = 1`.
- Now `low == high`, so the loop terminates.

**Final Result:**

```text
Lower Bound = 1
```

Index 1 is the first position where the element is greater than or equal to 20.

### Time Complexity

O(log n)

### Space Complexity

O(1)

### Key Point

Lower Bound finds the first element greater than or equal to the target, not necessarily an exact match.

## 5. Upper Bound

### Definition

Upper Bound is a searching technique that finds the first position in a sorted collection where the element is strictly greater than the target.

It returns the index of the first element satisfying:

```text
array[index] > target
```

If no such element exists, it returns `n`.

### Algorithm

1. Initialize `low = 0` and `high = n`.
2. Execute a loop while `low < high`.
3. Calculate the middle index.
4. If `array[mid] > target`, move towards the left half by updating `high = mid`.
5. Otherwise, move towards the right half by updating `low = mid + 1`.
6. When the loop terminates, return `low`.

### Pseudocode

```text
upperBound(array, target):
    low = 0
    high = n

    while low < high:
        mid = low + (high - low) / 2

        if array[mid] > target:
            high = mid
        else:
            low = mid + 1

    return low
```

### Dry Run

**Input:**

```text
array = [10, 20, 20, 20, 30, 40, 50]
target = 20
```

**Initial Values:**

```text
low = 0
high = 7
```

**Execution:**

| Iteration | low | high | mid | array[mid] | Decision |
|---|---:|---:|---:|---:|---|
| 1 | 0 | 7 | 3 | 20 | 20 is not > 20, move right |
| 2 | 4 | 7 | 5 | 40 | 40 > 20, move left |
| 3 | 4 | 5 | 4 | 30 | 30 > 20, move left |

**Explanation:**

- Iteration 1: Element at index 3 is 20. Since it is not strictly greater than the target, update `low = 4`.
- Iteration 2: Element at index 5 is 40. It satisfies the condition, so update `high = 5`.
- Iteration 3: Element at index 4 is 30. It also satisfies the condition, so update `high = 4`.
- Now `low == high`, so the loop terminates.

**Final Result:**

```text
Upper Bound = 4
```

Index 4 is the first position where the element is strictly greater than 20.

### Time Complexity

O(log n)

### Space Complexity

O(1)

### Key Point

Upper Bound finds the first element strictly greater than the target.

## 6. First Occurrence

### Definition

First Occurrence is a searching technique that finds the smallest index at which the target element appears in a sorted collection.

When duplicate elements exist, it returns the index of the first matching element.

### Algorithm

1. Initialize `low = 0`, `high = n - 1`, and `answer = -1`.
2. Execute a loop while `low <= high`.
3. Calculate the middle index.
4. Compare the middle element with the target:
   - If equal, store `mid` in `answer` and continue searching the left half.
   - If the target is smaller, search the left half.
   - If the target is larger, search the right half.
5. Return `answer`.

### Pseudocode

```text
firstOccurrence(array, target):
    low = 0
    high = n - 1
    answer = -1

    while low <= high:
        mid = low + (high - low) / 2

        if array[mid] == target:
            answer = mid
            high = mid - 1

        else if target < array[mid]:
            high = mid - 1

        else:
            low = mid + 1

    return answer
```

### Dry Run

**Input:**

```text
array = [10, 20, 20, 20, 20, 30, 40]
target = 20
```

**Initial Values:**

```text
low = 0
high = 6
answer = -1
```

**Execution:**

| Iteration | low | high | mid | array[mid] | Decision |
|---|---:|---:|---:|---:|---|
| 1 | 0 | 6 | 3 | 20 | Match, answer = 3, search left |
| 2 | 0 | 2 | 1 | 20 | Match, answer = 1, search left |
| 3 | 0 | 0 | 0 | 10 | 10 < 20, search right |

**Explanation:**

- Iteration 1: Target found at index 3. Store `answer = 3` and continue searching left by updating `high = 2`.
- Iteration 2: Target found again at index 1. Update `answer = 1` and continue searching left by updating `high = 0`.
- Iteration 3: Element at index 0 is 10. Since the target is greater, update `low = 1`.
- Now `low > high`, so the loop terminates.

**Final Result:**

```text
First Occurrence = 1
```

The first matching element is at index 1.

### Time Complexity

- Best Case: O(1)
- Worst Case: O(log n)

### Space Complexity

O(1)

### Key Point

When a match is found, continue searching the left half to find an earlier occurrence.

## 7. Last Occurrence

### Definition

Last Occurrence is a searching technique that finds the largest index at which the target element appears in a sorted collection.

When duplicate elements exist, it returns the index of the last matching element.

### Algorithm

1. Initialize `low = 0`, `high = n - 1`, and `answer = -1`.
2. Execute a loop while `low <= high`.
3. Calculate the middle index.
4. Compare the middle element with the target:
   - If equal, store `mid` in `answer` and continue searching the right half.
   - If the target is smaller, search the left half.
   - If the target is larger, search the right half.
5. Return `answer`.

### Pseudocode

```text
lastOccurrence(array, target):
    low = 0
    high = n - 1
    answer = -1

    while low <= high:
        mid = low + (high - low) / 2

        if array[mid] == target:
            answer = mid
            low = mid + 1

        else if target < array[mid]:
            high = mid - 1

        else:
            low = mid + 1

    return answer
```

### Dry Run

**Input:**

```text
array = [10, 20, 20, 20, 20, 30, 40]
target = 20
```

**Initial Values:**

```text
low = 0
high = 6
answer = -1
```

**Execution:**

| Iteration | low | high | mid | array[mid] | Decision |
|---|---:|---:|---:|---:|---|
| 1 | 0 | 6 | 3 | 20 | Match, answer = 3, search right |
| 2 | 4 | 6 | 5 | 30 | 20 < 30, search left |
| 3 | 4 | 4 | 4 | 20 | Match, answer = 4, search right |

**Explanation:**

- Iteration 1: Target found at index 3. Store `answer = 3` and continue searching right by updating `low = 4`.
- Iteration 2: Element at index 5 is 30. Since the target is smaller, update `high = 4`.
- Iteration 3: Target found again at index 4. Update `answer = 4` and continue searching right by updating `low = 5`.
- Now `low > high`, so the loop terminates.

**Final Result:**

```text
Last Occurrence = 4
```

The last matching element is at index 4.

### Time Complexity

- Best Case: O(1)
- Worst Case: O(log n)

### Space Complexity

O(1)

### Key Point

When a match is found, continue searching the right half to find a later occurrence.