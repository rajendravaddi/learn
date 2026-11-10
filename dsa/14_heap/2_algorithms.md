# Heap Algorithms

## 1. Build Heap

### 1.1 What is Build Heap?

Build Heap is the process of converting an ordinary array into a valid Min Heap or Max Heap.

Unlike inserting elements one by one, Build Heap uses a more efficient bottom-up heapification approach.

For an array of n elements:

- Inserting elements individually takes O(n log n).
- Building a heap using bottom-up heapification takes O(n).

This is an important optimization.

### 1.2 Why Do We Use Build Heap?

Suppose we have:

```python
arr = [40, 10, 30, 20, 50, 5]
```

If we want to use this array as a priority queue, we first need to organize it into a heap.

Build Heap helps us convert the array efficiently.

It is used in:

1. Heap Sort.
2. Priority Queue initialization.
3. Kth Largest and Smallest problems.
4. Top-K problems.
5. Algorithms that process multiple elements using a heap.

### 1.3 Important Observation

In a Complete Binary Tree:

- Leaf nodes already satisfy the Heap Property because they have no children.
- Only non-leaf nodes need to be heapified.

For an array of size n, the last non-leaf node is:

```python
last_non_leaf = n // 2 - 1
```

Therefore, we start heapification from this index and move backward toward the root.

### 1.4 Build Min Heap Algorithm

1. Find the last non-leaf node.
2. Start from the last non-leaf node.
3. Apply Min Heapify.
4. Move to the previous node.
5. Continue until reaching the root.

### 1.5 Example: Build Min Heap

Given:

```python
arr = [40, 10, 30, 20, 50, 5]
```

Initial tree:

```text
             40
           /    \
          10     30
         /  \   /
        20  50  5
```

Array length = 6.

Last non-leaf index:

```python
6 // 2 - 1 = 2
```

We start at index 2.

**Step 1: Heapify index 2**

Node = 30

Its left child = 5.

Since 5 is smaller than 30, swap them.

```text
[40, 10, 5, 20, 50, 30]
```

**Step 2: Heapify index 1**

Node = 10

Children = 20 and 50.

10 is already smaller than both.

No swap is required.

**Step 3: Heapify index 0**

Node = 40

Children = 10 and 5.

Smallest = 5.

Swap 40 and 5.

```text
[5, 10, 40, 20, 50, 30]
```

Continue heapifying the new position of 40.

Children = 30.

Swap 40 and 30.

```text
[5, 10, 30, 20, 50, 40]
```

Final Min Heap:

```text
             5
           /   \
          10    30
         / \   /
        20 50 40
```

Array representation:

```python
[5, 10, 30, 20, 50, 40]
```

### 1.6 Build Min Heap Algorithm

```text
BUILD_MIN_HEAP(arr):

    n = length(arr)

    for i from n // 2 - 1 down to 0:

        MIN_HEAPIFY(arr, n, i)

    return arr
```

### 1.7 Python Implementation: Build Min Heap

```python
def min_heapify(arr, n, i):

    smallest = i

    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[left] < arr[smallest]:
        smallest = left

    if right < n and arr[right] < arr[smallest]:
        smallest = right

    if smallest != i:

        arr[i], arr[smallest] = arr[smallest], arr[i]

        min_heapify(arr, n, smallest)


def build_min_heap(arr):

    n = len(arr)

    for i in range(n // 2 - 1, -1, -1):

        min_heapify(arr, n, i)

    return arr


arr = [40, 10, 30, 20, 50, 5]

print(build_min_heap(arr))
```

Output:

```text
[5, 10, 30, 20, 50, 40]
```

### 1.8 Build Max Heap

The logic is exactly the same, but we use Max Heapify.

```python
def max_heapify(arr, n, i):

    largest = i

    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[left] > arr[largest]:
        largest = left

    if right < n and arr[right] > arr[largest]:
        largest = right

    if largest != i:

        arr[i], arr[largest] = arr[largest], arr[i]

        max_heapify(arr, n, largest)


def build_max_heap(arr):

    n = len(arr)

    for i in range(n // 2 - 1, -1, -1):

        max_heapify(arr, n, i)

    return arr


arr = [40, 10, 30, 20, 50, 5]

print(build_max_heap(arr))
```

Output:

```text
[50, 40, 30, 20, 10, 5]
```

### 1.9 Why Is Build Heap O(n) Instead of O(n log n)?

This is an important DSA interview question.

A common assumption is:

- There are n nodes.
- Heapify takes O(log n).
- Therefore, Build Heap must take O(n log n).

But this is not correct.

Most nodes in a Complete Binary Tree are near the bottom, where heapify requires very little work.

Only a small number of nodes are near the root, where heapify can take more work.

The total work is:

$$
T(n) = O\left(\sum_{h=0}^{\log n}
\frac{n}{2^{h+1}} \cdot h\right)
$$

The series converges to O(n).

Therefore:

**Build Heap = O(n)**

### 1.10 Complexity Analysis

| Operation | Time Complexity |
|---|---|
| Heapify one node | O(log n) |
| Build Min Heap | O(n) |
| Build Max Heap | O(n) |
| Repeated insertion | O(n log n) |

Space Complexity:

- O(1) auxiliary space for iterative heapify.
- O(log n) recursive stack space for recursive heapify.

---
## 2. Heap Sort

### 2.1 What is Heap Sort?

Heap Sort is a comparison-based sorting algorithm that uses a Binary Heap to sort elements.

It uses the Heap Property to repeatedly extract the largest or smallest element and place it in its correct position.

Heap Sort generally uses a **Max Heap to sort an array in ascending order**.

### 2.2 Why Do We Use Heap Sort?

Heap Sort is useful because:

1. It provides guaranteed O(n log n) time complexity.
2. It sorts elements in-place.
3. It does not require an additional array.
4. Its worst-case performance is better than Quick Sort's worst case.
5. It works well when predictable sorting performance is important.

### 2.3 How Does Heap Sort Work?

Heap Sort follows two major steps:

**Step 1: Build a Max Heap**

Convert the given array into a Max Heap so that the largest element is at the root.

**Step 2: Extract the Maximum Repeatedly**

1. Swap the root (maximum element) with the last element in the heap.
2. Reduce the heap size by one.
3. Apply Max Heapify to restore the Max Heap Property.
4. Repeat until the heap size becomes one.

The largest elements gradually move to the end of the array.

### 2.4 Example

Given array:

```python
arr = [4, 10, 3, 5, 1]
```

Our goal is to sort it in ascending order.

### 2.5 Dry Run

**Step 1: Build a Max Heap**

Initial array:

```text
[4, 10, 3, 5, 1]
```

After building the Max Heap:

```text
             10
           /    \
          5      3
         / \
        4   1
```

Array representation:

```text
[10, 5, 3, 4, 1]
```

The maximum element, 10, is at the root.

**Step 2: Extract the Maximum**

Swap the root with the last element.

```text
[1, 5, 3, 4, 10]
```

The element 10 is now in its correct sorted position.

Heapify the remaining elements:

```text
             5
           /   \
          4     3
         /
        1
```

Array:

```text
[5, 4, 3, 1, 10]
```

**Step 3: Extract the Next Maximum**

Swap 5 with the last element of the active heap.

```text
[1, 4, 3, 5, 10]
```

Heapify the remaining elements:

```text
             4
           /   \
          1     3
```

Array:

```text
[4, 1, 3, 5, 10]
```

**Step 4: Extract the Next Maximum**

Swap 4 with 3.

```text
[3, 1, 4, 5, 10]
```

The remaining active heap is already valid.

**Step 5: Final Extraction**

Swap 3 with 1.

```text
[1, 3, 4, 5, 10]
```

Final sorted array:

```text
[1, 3, 4, 5, 10]
```

### 2.6 Heap Sort Algorithm

```text
HEAP_SORT(arr):

    n = length(arr)

    BUILD_MAX_HEAP(arr)

    for i from n - 1 down to 1:

        swap(arr[0], arr[i])

        heap_size = i

        MAX_HEAPIFY(arr, heap_size, 0)

    return arr
```

### 2.7 Python Implementation

```python
def max_heapify(arr, n, i):

    largest = i

    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[left] > arr[largest]:
        largest = left

    if right < n and arr[right] > arr[largest]:
        largest = right

    if largest != i:

        arr[i], arr[largest] = arr[largest], arr[i]

        max_heapify(arr, n, largest)


def build_max_heap(arr):

    n = len(arr)

    for i in range(n // 2 - 1, -1, -1):
        max_heapify(arr, n, i)


def heap_sort(arr):

    n = len(arr)

    build_max_heap(arr)

    for i in range(n - 1, 0, -1):

        arr[0], arr[i] = arr[i], arr[0]

        max_heapify(arr, i, 0)

    return arr


arr = [4, 10, 3, 5, 1]

print(heap_sort(arr))
```

Output:

```text
[1, 3, 4, 5, 10]
```

### 2.8 Complexity Analysis

| Case | Time Complexity |
|---|---|
| Best Case | O(n log n) |
| Average Case | O(n log n) |
| Worst Case | O(n log n) |

Space Complexity:

- O(1) auxiliary space for iterative heapify.
- O(log n) recursion stack space for the recursive implementation above.

**Important Properties:**

- In-place sorting: Yes.
- Stable sorting: No.
- Comparison-based sorting: Yes.

---


## 3. Kth Largest / Kth Smallest Element

### 3.1 What Is the Kth Largest or Smallest Problem?

Given an array and an integer K, find:

- Kth largest element.
- Kth smallest element.

Example:

```python
arr = [3, 2, 1, 5, 6, 4]
k = 2
```

Sorted array:

```text
[1, 2, 3, 4, 5, 6]
```

Therefore:

- 2nd smallest = 2.
- 2nd largest = 5.

The challenge is to solve these problems efficiently without necessarily sorting the entire array.

### 3.2 Approach 1: Sorting

The simplest approach is to sort the array.

For Kth smallest:

```python
arr.sort()

answer = arr[k - 1]
```

For Kth largest:

```python
arr.sort()

answer = arr[len(arr) - k]
```

Time Complexity: O(n log n).

Space Complexity: Depends on the sorting implementation.

This approach is simple, but we can do better using heaps when K is much smaller than n.

### 3.3 Approach 2: Kth Smallest Using Min Heap

**Intuition:**

A Min Heap always provides the smallest element at the root.

If we extract the minimum K times, the Kth extracted element will be the Kth smallest element.

Example:

```python
arr = [7, 10, 4, 3, 20, 15]
k = 3
```

Build a Min Heap:

```text
[3, 7, 4, 10, 20, 15]
```

**Dry Run:**

Extraction 1:

```text
Extracted = 3
Remaining Heap = [4, 7, 15, 10, 20]
```

Extraction 2:

```text
Extracted = 4
Remaining Heap = [7, 10, 15, 20]
```

Extraction 3:

```text
Extracted = 7
```

Therefore:

```text
3rd Smallest = 7
```

### 3.4 Python Implementation: Kth Smallest

```python
import heapq

def kth_smallest(arr, k):

    heap = arr.copy()

    heapq.heapify(heap)

    result = None

    for _ in range(k):

        result = heapq.heappop(heap)

    return result


arr = [7, 10, 4, 3, 20, 15]

print(kth_smallest(arr, 3))
```

Output:

```text
7
```

Complexity:

- Build Heap: O(n).
- Extract K elements: O(k log n).
- Total: O(n + k log n).

### 3.5 Approach 3: Kth Largest Using Min Heap of Size K

This is a particularly important heap pattern.

**Intuition:**

To find the Kth largest element, maintain a Min Heap containing only the K largest elements encountered so far.

Why a Min Heap?

Because the smallest among those K largest elements is exactly the Kth largest element.

Algorithm:

1. Create an empty Min Heap.
2. Insert the first K elements.
3. For every remaining element:
   - Compare it with the heap root.
   - If it is greater than the root, remove the root and insert the new element.
   - Otherwise, ignore it.
4. The root is the Kth largest element.

### 3.6 Example: Find the 3rd Largest Element

Given:

```python
arr = [7, 10, 4, 3, 20, 15]
k = 3
```

**Step 1: Insert the first three elements**

```text
Elements: 7, 10, 4

Min Heap:
       4
      / \
     10  7
```

Array:

```text
[4, 10, 7]
```

**Step 2: Process 3**

Compare 3 with heap root 4.

Since 3 is smaller, ignore it.

Heap:

```text
[4, 10, 7]
```

**Step 3: Process 20**

Compare 20 with root 4.

Since 20 is greater, remove 4 and insert 20.

Heap:

```text
[7, 10, 20]
```

**Step 4: Process 15**

Compare 15 with root 7.

Since 15 is greater, remove 7 and insert 15.

Heap:

```text
[10, 20, 15]
```

The heap contains the three largest elements:

```text
[10, 15, 20]
```

The root is 10.

Therefore:

```text
3rd Largest = 10
```

### 3.7 Python Implementation: Kth Largest

```python
import heapq

def kth_largest(arr, k):

    if k < 1 or k > len(arr):
        raise ValueError("Invalid value of k")

    heap = []

    for num in arr:

        heapq.heappush(heap, num)

        if len(heap) > k:
            heapq.heappop(heap)

    return heap[0]


arr = [7, 10, 4, 3, 20, 15]

print(kth_largest(arr, 3))
```

Output:

```text
10
```

Time Complexity:

$$
O(n \log k)
$$

Space Complexity:

$$
O(k)
$$

### 3.8 Kth Smallest Using Max Heap of Size K

We can use the opposite strategy for Kth smallest.

Maintain a Max Heap containing only the K smallest elements.

The root contains the largest among those K smallest elements, which is the Kth smallest element.

In Python, we can simulate a Max Heap using negative numbers.

```python
import heapq

def kth_smallest_max_heap(arr, k):

    if k < 1 or k > len(arr):
        raise ValueError("Invalid value of k")

    heap = []

    for num in arr:

        heapq.heappush(heap, -num)

        if len(heap) > k:
            heapq.heappop(heap)

    return -heap[0]


arr = [7, 10, 4, 3, 20, 15]

print(kth_smallest_max_heap(arr, 3))
```

Output:

```text
7
```

### 3.9 Complexity Comparison

| Approach | Time Complexity | Space Complexity |
|---|---|---|
| Sorting | O(n log n) | Depends on sorting |
| Min Heap, Kth Smallest | O(n + k log n) | O(n) |
| Min Heap of Size K, Kth Largest | O(n log k) | O(k) |
| Max Heap of Size K, Kth Smallest | O(n log k) | O(k) |

**Interview Tip:**

Remember these two patterns:

- Kth Largest → Min Heap of size K.
- Kth Smallest → Max Heap of size K.

---

## 4. Top-K Elements

### 4.1 What Is the Top-K Problem?

The Top-K problem asks us to find the K largest or K smallest elements from a collection.

Unlike the Kth Largest problem, which returns one element, Top-K returns K elements.

Example:

```python
arr = [3, 2, 1, 5, 6, 4]
k = 3
```

Top 3 largest elements:

```text
[4, 5, 6]
```

Top 3 smallest elements:

```text
[1, 2, 3]
```

### 4.2 Why Do We Use Heaps for Top-K?

Suppose an array contains one million elements, but we only need the 10 largest.

Sorting all one million elements is unnecessary.

Instead, we can maintain a Min Heap of size 10.

For every incoming element:

- If the heap has fewer than 10 elements, insert it.
- Otherwise, compare it with the smallest element in the heap.
- If it is larger, replace the root.

This allows us to process elements efficiently.

### 4.3 Top-K Largest Elements Using Min Heap

Algorithm:

1. Create an empty Min Heap.
2. Iterate through the array.
3. Insert elements until the heap size reaches K.
4. For each remaining element:
   - If the element is greater than the root, replace the root.
   - Otherwise, ignore it.
5. Return the elements in the heap.

### 4.4 Example: Find Top 3 Largest

```python
arr = [3, 2, 1, 5, 6, 4]
k = 3
```

Dry run:

| Current Element | Heap | Action |
|---|---|---|
| 3 | [3] | Insert |
| 2 | [2, 3] | Insert |
| 1 | [1, 3, 2] | Insert |
| 5 | [2, 3, 5] | Replace 1 |
| 6 | [3, 5, 6] | Replace 2 |
| 4 | [4, 6, 5] | Replace 3 |

Final heap:

```text
[4, 6, 5]
```

Top 3 largest elements:

```text
[4, 5, 6]
```

Note that a heap does not guarantee sorted output.

If sorted output is required, sort the resulting K elements.

### 4.5 Python Implementation: Top-K Largest

```python
import heapq

def top_k_largest(arr, k):

    if k < 0 or k > len(arr):
        raise ValueError("Invalid value of k")

    if k == 0:
        return []

    heap = []

    for num in arr:

        if len(heap) < k:

            heapq.heappush(heap, num)

        elif num > heap[0]:

            heapq.heapreplace(heap, num)

    return sorted(heap, reverse=True)


arr = [3, 2, 1, 5, 6, 4]

print(top_k_largest(arr, 3))
```

Output:

```text
[6, 5, 4]
```

Complexity:

- Heap processing: O(n log k).
- Sorting the K results: O(k log k).
- Total: O(n log k + k log k).
- Space: O(k).

### 4.6 Top-K Smallest Elements Using Max Heap

For Top-K smallest, maintain a Max Heap of size K.

The root represents the largest among the K smallest elements.

```python
import heapq

def top_k_smallest(arr, k):

    if k < 0 or k > len(arr):
        raise ValueError("Invalid value of k")

    if k == 0:
        return []

    heap = []

    for num in arr:

        heapq.heappush(heap, -num)

        if len(heap) > k:
            heapq.heappop(heap)

    result = [-x for x in heap]

    return sorted(result)


arr = [3, 2, 1, 5, 6, 4]

print(top_k_smallest(arr, 3))
```

Output:

```text
[1, 2, 3]
```

### 4.7 Top-K Frequent Elements

A very common variation is finding the K most frequent elements.

Example:

```python
arr = [1, 1, 1, 2, 2, 3]
k = 2
```

Frequency:

```text
1 -> 3 times
2 -> 2 times
3 -> 1 time
```

Top 2 frequent elements:

```text
[1, 2]
```

Python implementation:

```python
import heapq
from collections import Counter

def top_k_frequent(nums, k):

    if k < 0 or k > len(set(nums)):
        raise ValueError("Invalid value of k")

    frequency = Counter(nums)

    return heapq.nlargest(
        k,
        frequency.keys(),
        key=frequency.get
    )


nums = [1, 1, 1, 2, 2, 3]

print(top_k_frequent(nums, 2))
```

Output:

```text
[1, 2]
```

Time Complexity:

- Frequency calculation: O(n).
- Heap-based selection: O(m log k), where m is the number of distinct elements.
- Total: O(n + m log k).

Space Complexity: O(m + k).

### 4.8 Important Top-K Variations

| Problem | Heap Strategy |
|---|---|
| K Largest Elements | Min Heap of size K |
| K Smallest Elements | Max Heap of size K |
| Kth Largest | Min Heap of size K |
| Kth Smallest | Max Heap of size K |
| K Most Frequent | Frequency + Heap |
| K Closest Points | Max Heap of size K |
| K Closest Numbers | Max Heap of size K |

**Important Pattern:**

When maintaining K best elements, keep the worst element among those K at the root so that it can be removed efficiently when a better candidate arrives.

---

## 5. Merge K Sorted Structures

### 5.1 What Is K-Way Merge?

K-Way Merge is the process of combining K individually sorted structures into one sorted structure.

The structures can be:

- Sorted arrays.
- Sorted linked lists.
- Sorted streams.
- Sorted files.

Instead of merging all elements without considering their ordering, we use a Min Heap to efficiently select the smallest currently available element.

### 5.2 Why Do We Use a Heap?

Consider three sorted arrays:

```python
arr1 = [1, 4, 7]
arr2 = [2, 5, 8]
arr3 = [3, 6, 9]
```

We want to merge them into:

```text
[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

A straightforward approach would concatenate everything and sort.

That would take O(N log N), where N is the total number of elements.

But because each array is already sorted, we can use a Min Heap.

The heap stores only the smallest unprocessed element from each array.

Whenever we extract an element, we insert the next element from the same array.

This ensures that the next globally smallest element is always available at the root.

### 5.3 K-Way Merge Algorithm

1. Create an empty Min Heap.
2. Insert the first element of every non-empty sorted array.
3. Store three values for each heap entry:
   - Element value.
   - Array index.
   - Element index within that array.
4. Extract the minimum element.
5. Add it to the result.
6. Insert the next element from the same array, if one exists.
7. Repeat until the heap becomes empty.

### 5.4 Example: Merge 3 Sorted Arrays

Input:

```python
arr1 = [1, 4, 7]
arr2 = [2, 5, 8]
arr3 = [3, 6, 9]
```

**Step 1: Insert the first element of each array**

```text
Heap = [1, 2, 3]
```

Each heap entry also tracks its source array and position.

Conceptually:

```text
(1, array 0, index 0)
(2, array 1, index 0)
(3, array 2, index 0)
```

**Step 2: Extract 1**

Result:

```text
[1]
```

Insert the next element from array 0, which is 4.

Heap contains:

```text
[2, 3, 4]
```

**Step 3: Extract 2**

Result:

```text
[1, 2]
```

Insert 5 from array 1.

Heap contains:

```text
[3, 4, 5]
```

**Step 4: Extract 3**

Result:

```text
[1, 2, 3]
```

Insert 6 from array 2.

Heap:

```text
[4, 5, 6]
```

**Step 5: Extract 4**

Result:

```text
[1, 2, 3, 4]
```

Insert 7 from array 0.

Heap:

```text
[5, 6, 7]
```

**Step 6: Extract 5**

Result:

```text
[1, 2, 3, 4, 5]
```

Insert 8 from array 1.

Heap:

```text
[6, 7, 8]
```

**Step 7: Extract 6**

Result:

```text
[1, 2, 3, 4, 5, 6]
```

Insert 9 from array 2.

Heap:

```text
[7, 8, 9]
```

**Step 8: Extract Remaining Elements**

Extract 7, then 8, then 9.

Final result:

```text
[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### 5.5 Python Implementation: Merge K Sorted Arrays

```python
import heapq

def merge_k_sorted(arrays):

    heap = []

    result = []

    # Insert the first element from each array
    for i, arr in enumerate(arrays):

        if arr:

            heapq.heappush(
                heap,
                (arr[0], i, 0)
            )

    # Process elements
    while heap:

        value, array_index, element_index = heapq.heappop(heap)

        result.append(value)

        next_index = element_index + 1

        if next_index < len(arrays[array_index]):

            next_value = arrays[array_index][next_index]

            heapq.heappush(
                heap,
                (next_value, array_index, next_index)
            )

    return result


arrays = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
]

print(merge_k_sorted(arrays))
```

Output:

```text
[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### 5.6 Why Do We Store Array Index and Element Index?

A heap entry looks like:

```python
(value, array_index, element_index)
```

For example:

```python
(4, 0, 1)
```

It means:

- Value = 4.
- Source array = 0.
- Position within that array = 1.

We need this information because after extracting an element, we must know which array to get the next element from.

Python's heapq compares tuples lexicographically, so the extra indices also provide deterministic tie-breaking when values are equal.

### 5.7 Complexity Analysis

Let:

- K = Number of sorted arrays.
- N = Total number of elements across all arrays.

At any point, the heap contains at most K elements.

Each of the N elements is inserted and extracted once.

Each heap operation takes O(log K).

Therefore:

$$
\text{Time Complexity} = O(N \log K)
$$

Space Complexity:

- Heap: O(K).
- Result array: O(N).

Total auxiliary space excluding the returned result: O(K).

### 5.8 Merge K Sorted Linked Lists

The same K-Way Merge pattern can be applied to sorted linked lists.

Instead of storing array indices, we store linked-list nodes in the heap.

Python implementation:

```python
import heapq

class ListNode:

    def __init__(self, val=0, next=None):

        self.val = val
        self.next = next

    def __lt__(self, other):

        return self.val < other.val


def merge_k_lists(lists):

    heap = []

    for node in lists:

        if node:
            heapq.heappush(heap, node)

    dummy = ListNode()
    current = dummy

    while heap:

        node = heapq.heappop(heap)

        current.next = node
        current = current.next

        if node.next:
            heapq.heappush(heap, node.next)

    return dummy.next
```

**Complexity:**

- Time: O(N log K).
- Auxiliary Heap Space: O(K).
