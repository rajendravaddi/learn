# Sorting Concepts

## 1. Stable Sorting

### Concept

A sorting algorithm is called **stable** if it preserves the relative order of elements having equal sorting keys.

In simple words:

If two elements have the same value before sorting, their original order should remain unchanged after sorting.

### Example

Consider students represented as tuples:

```python
students = [
    ("Raj", 85),
    ("Amit", 90),
    ("John", 85),
    ("Sam", 90)
]
```

We want to sort students based on marks in ascending order.

#### Stable sorting result

```python
[
    ("Raj", 85),
    ("John", 85),
    ("Amit", 90),
    ("Sam", 90)
]
```

Notice:
- Raj comes before John because both have 85 marks and Raj appeared first.
- Amit comes before Sam because both have 90 marks and Amit appeared first.

Their relative order is preserved.

#### Python implementation

Python's built-in sorting is stable.

```python
students = [
    ("Raj", 85),
    ("Amit", 90),
    ("John", 85),
    ("Sam", 90)
]

students.sort(key=lambda x: x[1])

print(students)
```

Output:

```python
[
    ("Raj", 85),
    ("John", 85),
    ("Amit", 90),
    ("Sam", 90)
]
```

### Stable vs Unstable Algorithms

| Algorithm | Stable? |
|---|---|
| Bubble Sort | Yes |
| Selection Sort | No |
| Insertion Sort | Yes |
| Merge Sort | Yes |
| Quick Sort | No |
| Heap Sort | No |
| Counting Sort | Depends on implementation |
| Radix Sort | Yes, if digit sorting is stable |
| Bucket Sort | Depends on implementation |
| Python Timsort | Yes |

### When is stability important?

Suppose you have employees:

```python
employees = [
    ("Raj", "Developer", 50000),
    ("John", "Tester", 40000),
    ("Amit", "Developer", 60000),
    ("Sam", "Tester", 45000)
]
```

First, sort by salary.

Then sort by department.

Because Python sorting is stable, employees with the same department retain their salary order from the previous sorting operation.

```python
employees.sort(key=lambda x: x[2])

employees.sort(key=lambda x: x[1])

print(employees)
```

This is called multi-level sorting using stable sorting.

**Interview takeaway:** Stability matters when sorting records using multiple keys or when equal-key elements must retain their original order.

---

## 2. In-place Sorting

### Concept

An algorithm is called **in-place** if it sorts the data by modifying the original collection without requiring an additional array proportional to the input size.

Generally, in-place algorithms use O(1) auxiliary space, although some algorithms use additional recursion stack space.

### Example

Original array:

```python
arr = [5, 3, 8, 2, 1]
```

After in-place sorting:

```python
[1, 2, 3, 5, 8]
```

The original array itself is modified.

### Python example: list.sort()

```python
arr = [5, 3, 8, 2, 1]

result = arr.sort()

print(arr)
# [1, 2, 3, 5, 8]

print(result)
# None
```

The original list is modified, and `.sort()` returns None.

### Python example: sorted()

```python
arr = [5, 3, 8, 2, 1]

result = sorted(arr)

print(arr)
# [5, 3, 8, 2, 1]

print(result)
# [1, 2, 3, 5, 8]
```

`sorted()` creates a new list.

### In-place vs Out-of-place

| Property | In-place | Out-of-place |
|---|---|---|
| Original array | Modified | Preserved |
| Extra array | Usually not required | Usually required |
| Memory usage | Usually lower | Usually higher |
| Example | Heap Sort | Merge Sort |

### Algorithm comparison

| Algorithm | In-place? |
|---|---|
| Bubble Sort | Yes |
| Selection Sort | Yes |
| Insertion Sort | Yes |
| Merge Sort | No (standard implementation) |
| Quick Sort | Yes (partitioning version) |
| Heap Sort | Yes |
| Counting Sort | No |
| Radix Sort | No |
| Bucket Sort | No |

**Important:** Quick Sort is considered in-place because its partitioning modifies the original array. However, recursive calls still require stack space.

**Interview takeaway:** When memory constraints are important, consider in-place algorithms.

---

## 3. Comparison Sorting

### Concept

Comparison sorting algorithms determine the order of elements by comparing pairs of elements.

They use operations such as:

```python
if a < b:
    ...
```

or:

```python
if a > b:
    ...
```

The algorithm decides which element comes first based on these comparisons.

### Examples

The following algorithms are comparison-based:

1. Bubble Sort
2. Selection Sort
3. Insertion Sort
4. Merge Sort
5. Quick Sort
6. Heap Sort

#### Python example

```python
def compare_sort(arr):
    n = len(arr)

    for i in range(n):
        for j in range(i + 1, n):

            if arr[i] > arr[j]:
                arr[i], arr[j] = arr[j], arr[i]

    return arr


print(compare_sort([5, 3, 8, 2, 1]))
# [1, 2, 3, 5, 8]
```

This is a simple comparison-based sorting implementation.

### Non-comparison sorting

Non-comparison sorting algorithms do not rely on comparing pairs of elements to establish their order.

Examples:

- Counting Sort
- Radix Sort
- Bucket Sort

They use other information, such as frequencies, digits, or value distributions.

### Comparison vs Non-comparison

| Feature | Comparison | Non-comparison |
|---|---|---|
| Uses pairwise comparisons | Yes | Not necessarily |
| Works with general comparable objects | Yes | Usually restricted |
| Performance | Generally O(n log n) or worse | Can be linear under assumptions |
| Examples | Merge, Quick, Heap | Counting, Radix, Bucket |

### Important theoretical concept: O(n log n) lower bound

For general comparison-based sorting, the worst-case number of comparisons required is at least:

O(n log n)

This is a theoretical lower bound for comparison sorting.

That is why Merge Sort and Heap Sort achieve optimal asymptotic worst-case comparison complexity.

Non-comparison algorithms can sometimes achieve better complexity because they exploit additional information about the input.

**Interview takeaway:** Understand why Counting Sort can achieve O(n + k), while general comparison sorting has an O(n log n) lower bound.

---

## 4. Divide and Conquer

### Concept

Divide and Conquer is an algorithmic technique that solves a problem by:

1. Divide: Break the problem into smaller subproblems.
2. Conquer: Solve the subproblems recursively.
3. Combine: Combine their results to solve the original problem.

Merge Sort and Quick Sort are classic examples.

### Example: Merge Sort

Input:

```python
arr = [8, 3, 5, 1]
```

#### Step 1: Divide

```text
[8, 3, 5, 1]

[8, 3] [5, 1]

[8] [3] [5] [1]
```

#### Step 2: Conquer

Single-element arrays are already sorted.

#### Step 3: Combine

```text
[3, 8] [1, 5]

[1, 3, 5, 8]
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


print(merge_sort([8, 3, 5, 1]))
# [1, 3, 5, 8]
```

### Divide and Conquer algorithms

| Algorithm | Divide | Conquer | Combine |
|---|---|---|---|
| Merge Sort | Split into halves | Sort both halves | Merge |
| Quick Sort | Partition around pivot | Sort partitions | No separate merge required |

### Complexity of Merge Sort

At every level, the algorithm processes n elements.

The number of levels is approximately log n.

Therefore:

Time Complexity = O(n log n)

**Interview takeaway:** Recognize problems that can be divided into smaller independent subproblems and combined efficiently.

---

## 5. Partitioning

### Concept

Partitioning rearranges an array around a selected pivot element.

After partitioning:

- Elements smaller than or equal to the pivot are placed on one side.
- Elements greater than the pivot are placed on the other side.
- Depending on the partition scheme, the pivot may be placed in its final sorted position.

Partitioning is a fundamental concept in Quick Sort.

### Example

Input:

```python
arr = [5, 3, 8, 2, 1]
```

Choose pivot = 1.

After partition:

```python
[1, 3, 8, 2, 5]
```

The pivot 1 is now in its correct sorted position.

### Python implementation: Lomuto Partition

```python
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

pivot_index = partition(arr, 0, len(arr) - 1)

print(arr)
print(pivot_index)
```

Output:

```python
[1, 3, 8, 2, 5]
0
```

### Types of partitioning

#### A. Lomuto Partition

- Usually chooses the last element as pivot.
- Uses one pointer to track the boundary of smaller elements.
- Easier to understand and implement.

#### B. Hoare Partition

- Often chooses the first or middle element as pivot.
- Uses two pointers moving from opposite directions.
- Swaps misplaced elements.
- Returns a partition boundary rather than necessarily the pivot's final index.

### Hoare Partition implementation

```python
def hoare_partition(arr, low, high):
    pivot = arr[(low + high) // 2]

    i = low - 1
    j = high + 1

    while True:

        i += 1

        while arr[i] < pivot:
            i += 1

        j -= 1

        while arr[j] > pivot:
            j -= 1

        if i >= j:
            return j

        arr[i], arr[j] = arr[j], arr[i]
```

**Important:** Hoare Partition's returned value is a boundary, not necessarily the final position of the pivot. Its Quick Sort recursion must use the corresponding boundary convention.

**Interview takeaway:** Partitioning is important for Quick Sort, Quick Select, Kth Largest, Kth Smallest and related problems.

---

## 6. Custom Comparators

### Concept

A comparator defines how two elements should be ordered relative to each other.

Custom sorting is required when the natural ascending or descending order is not sufficient.

Examples:
- Sort students by marks.
- Sort employees by salary.
- Sort intervals by starting time.
- Sort strings by length.
- Sort numbers by multiple conditions.

In Python, the most common approach is the `key` parameter.

### A. Sorting by absolute value

```python
arr = [-5, 3, -2, 8, 1]

arr.sort(key=abs)

print(arr)
# [1, -2, 3, -5, 8]
```

### B. Sorting tuples by second element

```python
arr = [(1, 5), (2, 3), (3, 8), (4, 1)]

arr.sort(key=lambda x: x[1])

print(arr)

# [(4, 1), (2, 3), (1, 5), (3, 8)]
```

### C. Multiple sorting conditions

Sort by marks descending and name ascending.

```python
students = [
    ("Raj", 85),
    ("Amit", 90),
    ("John", 85),
    ("Sam", 95)
]

students.sort(key=lambda x: (-x[1], x[0]))

print(students)
```

Output:

```python
[
    ("Sam", 95),
    ("Amit", 90),
    ("John", 85),
    ("Raj", 85)
]
```

### D. Sort intervals by starting time

```python
intervals = [
    [5, 8],
    [1, 3],
    [2, 6],
    [8, 10]
]

intervals.sort(key=lambda x: x[0])

print(intervals)

# [[1, 3], [2, 6], [5, 8], [8, 10]]
```

### E. Sort by multiple fields

Sort employees by:
1. Department ascending.
2. Salary descending.
3. Name ascending.

```python
employees = [
    ("Raj", "IT", 50000),
    ("Amit", "HR", 40000),
    ("John", "IT", 60000),
    ("Sam", "HR", 50000)
]

employees.sort(
    key=lambda x: (x[1], -x[2], x[0])
)

print(employees)
```

### F. Using functools.cmp_to_key()

Python also supports comparator-style sorting through `cmp_to_key`.

A comparator function returns:
- Negative value if a should come before b.
- Zero if they are equivalent for ordering.
- Positive value if a should come after b.

```python
from functools import cmp_to_key

def compare(a, b):
    if a > b:
        return -1
    elif a < b:
        return 1
    else:
        return 0


arr = [5, 2, 8, 1, 9]

arr.sort(key=cmp_to_key(compare))

print(arr)
# [9, 8, 5, 2, 1]
```

**Important:** In Python, prefer `key` over `cmp_to_key` whenever possible. It is simpler and generally more efficient.

**Interview takeaway:** Custom sorting is especially important in interval problems, greedy problems, scheduling problems and problems involving multiple sorting conditions.
