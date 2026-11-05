# Sorting Algorithms

## 1. Bubble Sort

**Level:** Beginner  
**Type:** Comparison-based sorting

### Concept

Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order.

After every complete pass, the largest unsorted element moves to its correct position at the end.

Example:

Input: `[5, 3, 8, 2, 1]`

First pass:
- Compare 5 and 3 → Swap.
- Compare 5 and 8 → No swap.
- Compare 8 and 2 → Swap.
- Compare 8 and 1 → Swap.

Array becomes: `[3, 5, 2, 1, 8]`

### Python implementation

```python
def bubble_sort(arr):
    n = len(arr)

    for i in range(n):
        swapped = False

        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True

        if not swapped:
            break

    return arr


print(bubble_sort([5, 3, 8, 2, 1]))
# [1, 2, 3, 5, 8]
```

### Complexity

| Case | Time |
|---|---|
| Best | O(n) |
| Average | O(n²) |
| Worst | O(n²) |

- Space: O(1)
- Stable: Yes
- In-place: Yes

**When to use:** Primarily for understanding sorting fundamentals. Rarely used in production.

---

## 2. Selection Sort

**Level:** Beginner

### Concept

Selection Sort repeatedly finds the minimum element from the unsorted portion and places it at the beginning.

The array has two portions:
- Sorted portion (left).
- Unsorted portion (right).

In each iteration, find the minimum element in the unsorted portion and swap it with the first unsorted element.

Example:

`[5, 3, 8, 2, 1]`

Pass 1: Minimum = 1

`[1, 3, 8, 2, 5]`

Pass 2: Minimum = 2

`[1, 2, 8, 3, 5]`

Pass 3: Minimum = 3

`[1, 2, 3, 8, 5]`

Pass 4: Minimum = 5

`[1, 2, 3, 5, 8]`

### Python implementation

```python
def selection_sort(arr):
    n = len(arr)

    for i in range(n):
        min_index = i

        for j in range(i + 1, n):
            if arr[j] < arr[min_index]:
                min_index = j

        arr[i], arr[min_index] = arr[min_index], arr[i]

    return arr


print(selection_sort([5, 3, 8, 2, 1]))
# [1, 2, 3, 5, 8]
```

### Complexity

| Case | Time |
|---|---|
| Best | O(n²) |
| Average | O(n²) |
| Worst | O(n²) |

- Space: O(1)
- Stable: No (standard implementation)
- In-place: Yes

**Important:** Selection Sort performs at most O(n) swaps, even though it performs O(n²) comparisons.

---

## 3. Insertion Sort

**Level:** Beginner  
**Interview relevance:** High

### Concept

Insertion Sort builds a sorted portion of the array one element at a time.

It takes an element from the unsorted portion and inserts it into its correct position in the sorted portion.

Think about arranging playing cards in your hand.

Example:

`[5, 3, 8, 2, 1]`

- Start with 5.
- Insert 3 → `[3, 5, 8, 2, 1]`
- Insert 8 → `[3, 5, 8, 2, 1]`
- Insert 2 → `[2, 3, 5, 8, 1]`
- Insert 1 → `[1, 2, 3, 5, 8]`

### Python implementation

```python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1

        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1

        arr[j + 1] = key

    return arr


print(insertion_sort([5, 3, 8, 2, 1]))
# [1, 2, 3, 5, 8]
```

### Complexity

| Case | Time |
|---|---|
| Best | O(n) |
| Average | O(n²) |
| Worst | O(n²) |

- Space: O(1)
- Stable: Yes
- In-place: Yes

**When to use:**
- Small arrays.
- Nearly sorted arrays.
- Online sorting when elements arrive one at a time.

---

## 4. Merge Sort

**Level:** Intermediate  
**Interview relevance:** Very high

### Concept

Merge Sort uses the Divide and Conquer technique.

It follows three steps:

1. Divide the array into two halves.
2. Recursively sort both halves.
3. Merge the sorted halves.

Example:

`[5, 3, 8, 2, 1, 6, 4, 7]`

Divide:

```text
[5, 3, 8, 2] [1, 6, 4, 7]

[5, 3] [8, 2] [1, 6] [4, 7]

[5] [3] [8] [2] [1] [6] [4] [7]
```

Merge:

```text
[3, 5] [2, 8] [1, 6] [4, 7]

[2, 3, 5, 8] [1, 4, 6, 7]

[1, 2, 3, 4, 5, 6, 7, 8]
```

### Python implementation

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2

    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)


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


print(merge_sort([5, 3, 8, 2, 1]))
# [1, 2, 3, 5, 8]
```

### Complexity

| Case | Time |
|---|---|
| Best | O(n log n) |
| Average | O(n log n) |
| Worst | O(n log n) |

- Space: O(n) auxiliary space, plus recursion stack.
- Stable: Yes.
- In-place: No (standard implementation).

**When to use:**
- Guaranteed O(n log n) sorting.
- Linked list sorting.
- External sorting.
- Stable sorting requirements.

---

## 5. Quick Sort

**Level:** Intermediate  
**Interview relevance:** Very high

### Concept

Quick Sort also uses Divide and Conquer.

It works through partitioning:

1. Select a pivot element.
2. Partition the array so smaller elements are on one side and larger elements are on the other.
3. Recursively sort both partitions.

Example:

Input: `[5, 3, 8, 2, 1]`

Choose pivot = 1.

After partition:

`[1, 3, 8, 2, 5]`

The pivot is now in its correct position.

Then recursively sort the remaining elements.

### Python implementation (Lomuto partition)

```python
def quick_sort(arr, low, high):
    if low < high:
        pivot_index = partition(arr, low, high)

        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)


def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1

    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[high] = arr[high], arr[i + 1]

    return i + 1


arr = [5, 3, 8, 2, 1]

quick_sort(arr, 0, len(arr) - 1)

print(arr)
# [1, 2, 3, 5, 8]
```

### Complexity

| Case | Time |
|---|---|
| Best | O(n log n) |
| Average | O(n log n) |
| Worst | O(n²) |

- Space: O(log n) average recursion stack; O(n) worst case.
- Stable: No.
- In-place: Yes (partitioning implementation).

**Important:** Choosing the last element as pivot can cause O(n²) time for already sorted or reverse-sorted arrays. Randomized pivots help reduce this risk.

**When to use:**
- General-purpose in-memory sorting.
- Understanding partitioning patterns.
- Interview problems involving pivot selection.

---

## 6. Counting Sort

**Level:** Intermediate  
**Type:** Non-comparison sorting

### Concept

Counting Sort sorts elements by counting how many times each value appears.

Unlike Bubble Sort or Merge Sort, it does not compare elements with each other.

It works efficiently when the range of integer values is relatively small.

Example:

Input: `[4, 2, 2, 8, 3, 3, 1]`

Frequency:

```text
Value:      1  2  3  4  8
Frequency:  1  2  2  1  1
```

Reconstruct:

`[1, 2, 2, 3, 3, 4, 8]`

### Python implementation

This version supports negative and positive integers.

```python
def counting_sort(arr):
    if not arr:
        return arr

    minimum = min(arr)
    maximum = max(arr)

    count = [0] * (maximum - minimum + 1)

    for num in arr:
        count[num - minimum] += 1

    result = []

    for i, frequency in enumerate(count):
        result.extend([i + minimum] * frequency)

    return result


print(counting_sort([4, -2, 2, 8, 3, 3, 1]))
# [-2, 1, 2, 3, 3, 4, 8]
```

### Complexity

Let n = number of elements and k = value range.

- Time: O(n + k)
- Space: O(n + k) for this implementation.
- Stable: Not generally stable for records in this frequency-reconstruction version.
- In-place: No.

**When to use:**
- Integer arrays with small value ranges.
- Frequency-based sorting.
- Bounded numeric values.

**Important:** If values range from 0 to 1,000,000,000, Counting Sort may be impractical.

---

## 7. Radix Sort

**Level:** Advanced  
**Type:** Non-comparison sorting

### Concept

Radix Sort sorts numbers digit by digit.

It commonly processes digits from the Least Significant Digit (LSD) to the Most Significant Digit (MSD).

For each digit position, it uses a stable sorting technique, commonly Counting Sort.

Example:

Input:

`[170, 45, 75, 90, 802, 24, 2, 66]`

Sort by units digit:

```text
[170, 90, 802, 2, 24, 45, 75, 66]
```

Sort by tens digit:

```text
[802, 2, 24, 45, 66, 170, 75, 90]
```

Sort by hundreds digit:

```text
[2, 24, 45, 66, 75, 90, 170, 802]
```

### Python implementation

This implementation supports non-negative integers.

```python
def counting_sort_by_digit(arr, exp):
    n = len(arr)

    output = [0] * n
    count = [0] * 10

    for num in arr:
        digit = (num // exp) % 10
        count[digit] += 1

    for i in range(1, 10):
        count[i] += count[i - 1]

    for i in range(n - 1, -1, -1):
        digit = (arr[i] // exp) % 10

        output[count[digit] - 1] = arr[i]
        count[digit] -= 1

    return output


def radix_sort(arr):
    if not arr:
        return arr

    if any(num < 0 for num in arr):
        raise ValueError("Only non-negative integers supported")

    max_num = max(arr)
    exp = 1

    while max_num // exp > 0:
        arr = counting_sort_by_digit(arr, exp)
        exp *= 10

    return arr


print(radix_sort([170, 45, 75, 90, 802, 24, 2, 66]))
# [2, 24, 45, 66, 75, 90, 170, 802]
```

### Complexity

Let:
- n = number of elements.
- d = maximum number of digits.
- b = digit base (10 for decimal).

- Time: O(d × (n + b))
- Space: O(n + b)
- Stable: Yes, when digit sorting is stable.
- In-place: No.

**When to use:**
- Large collections of integers.
- Fixed-width numeric data.
- When comparison sorting is not ideal.

**Important:** Negative numbers require an additional strategy.

---

# 8. Bucket Sort

**Level:** Advanced  
**Type:** Distribution-based sorting

### Concept

Bucket Sort distributes elements into multiple buckets.

Each bucket is sorted individually, and then all buckets are combined.

It is particularly useful when values are approximately uniformly distributed over a known range.

Example:

Input:

`[0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51]`

Distribute:

```text
Bucket 0: 0.23, 0.25
Bucket 1: 0.32
Bucket 2: 0.42, 0.47
Bucket 3: 0.51, 0.52
```

Sort individual buckets and combine:

`[0.23, 0.25, 0.32, 0.42, 0.47, 0.51, 0.52]`

### Python implementation

This implementation assumes values are in the range [0, 1).

```python
def bucket_sort(arr):
    if not arr:
        return arr

    n = len(arr)

    buckets = [[] for _ in range(n)]

    for num in arr:
        index = int(num * n)
        buckets[index].append(num)

    for bucket in buckets:
        bucket.sort()

    result = []

    for bucket in buckets:
        result.extend(bucket)

    return result


print(bucket_sort([0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51]))
# [0.23, 0.25, 0.32, 0.42, 0.47, 0.51, 0.52]
```

### Complexity

Let n = elements and k = buckets.

| Case | Time |
|---|---|
| Best / Expected | O(n + k) |
| Worst | O(n²) |

- Space: O(n + k).
- Stable: Depends on the bucket sorting implementation and distribution.
- In-place: No.

**When to use:**
- Uniformly distributed floating-point numbers.
- Data within a known numeric range.
- Distributing data into groups before sorting.

---

# 9. Python Built-in Sorting

This is extremely important for coding interviews.

Python uses **Timsort**, a hybrid sorting algorithm derived from Merge Sort and Insertion Sort.

It takes advantage of already ordered sequences called runs.

### A. sorted()

Returns a new sorted list without modifying the original.

```python
arr = [5, 3, 8, 2, 1]

result = sorted(arr)

print(result)
# [1, 2, 3, 5, 8]

print(arr)
# [5, 3, 8, 2, 1]
```

### B. list.sort()

Sorts the original list in-place.

```python
arr = [5, 3, 8, 2, 1]

arr.sort()

print(arr)
# [1, 2, 3, 5, 8]
```

### C. Descending order

```python
arr = [5, 3, 8, 2, 1]

arr.sort(reverse=True)

print(arr)
# [8, 5, 3, 2, 1]
```

### D. Custom sorting using key

Sort based on absolute values:

```python
arr = [-5, 3, -2, 8, 1]

arr.sort(key=abs)

print(arr)
# [1, -2, 3, -5, 8]
```

Sort tuples based on the second element:

```python
arr = [(1, 5), (2, 3), (3, 8), (4, 1)]

arr.sort(key=lambda x: x[1])

print(arr)
# [(4, 1), (2, 3), (1, 5), (3, 8)]
```

Sort strings by length:

```python
words = ["python", "is", "awesome", "great"]

words.sort(key=len)

print(words)
# ['is', 'great', 'python', 'awesome']
```

### E. Multiple sorting conditions

Sort students by marks descending and name ascending.

```python
students = [
    ("Raj", 85),
    ("Amit", 90),
    ("John", 85),
    ("Sam", 95)
]

students.sort(key=lambda x: (-x[1], x[0]))

print(students)

# [
#     ('Sam', 95),
#     ('Amit', 90),
#     ('John', 85),
#     ('Raj', 85)
# ]
```

### sorted() vs list.sort()

| Feature | sorted() | .sort() |
|---|---|---|
| Returns a new list | Yes | No (returns None) |
| Modifies original | No | Yes |
| Works on tuples | Yes | No |
| Custom key | Yes | Yes |
| Reverse sorting | Yes | Yes |
| Time | O(n log n) worst case | O(n log n) worst case |

Python's Timsort is stable. Its best-case time can be O(n) on suitably ordered inputs.
