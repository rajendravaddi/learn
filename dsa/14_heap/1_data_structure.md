# Heap – Data Structure

## 1. Introduction to Heap

### 1.1 What is a Heap?

A **Heap** is a specialized tree-based data structure that satisfies a specific ordering property called the **Heap Property**.

A heap is generally implemented using a **Complete Binary Tree**.

A heap allows us to efficiently access and remove the minimum or maximum element, depending on the type of heap.

There are two main types of heaps:

1. **Min Heap:** The parent node is always smaller than or equal to its children.
2. **Max Heap:** The parent node is always greater than or equal to its children.

Unlike a Binary Search Tree (BST), a heap does not maintain complete ordering between the left and right subtrees.

For example, in a Min Heap, the root contains the smallest element, but the remaining elements are not necessarily sorted.

### 1.2 Why Do We Use a Heap?

Consider an array:

`[40, 10, 30, 20, 50]`

Suppose we frequently need to retrieve and remove the smallest element.

Using a normal array:
- Finding the minimum takes O(n).
- Removing the minimum may require O(n) if we maintain array order.

Using a heap:
- Accessing the minimum takes O(1).
- Inserting an element takes O(log n).
- Removing the minimum takes O(log n).

Heaps are useful when we repeatedly need access to the highest-priority or lowest-priority element.

### 1.3 Real-World Applications

1. **Priority Queues:** Processing tasks based on priority.
2. **CPU Scheduling:** Selecting processes based on scheduling priority.
3. **Dijkstra's Algorithm:** Efficiently selecting the vertex with the smallest distance.
4. **Heap Sort:** Sorting elements efficiently.
5. **Top-K Problems:** Finding the K largest or smallest elements.
6. **Running Median:** Maintaining the median of a continuously changing stream.
7. **Event Scheduling:** Processing the next event based on its scheduled time.

---

## 2. Complete Binary Tree

Before understanding heaps, we need to understand the structure on which a binary heap is built.

### 2.1 What is a Binary Tree?

A Binary Tree is a tree data structure in which each node can have at most two children:

- Left child
- Right child

Example:

```text
        10
       /  \
      20   30
     /  \
    40   50
```

### 2.2 What is a Complete Binary Tree?

A **Complete Binary Tree** is a binary tree in which:

1. Every level is completely filled except possibly the last level.
2. The last level must be filled from left to right without gaps.

Example of a Complete Binary Tree:

```text
          10
        /    \
       20     30
      /  \   /
     40  50 60
```

This is complete because the last level is filled from left to right.

Example of a tree that is NOT complete:

```text
          10
        /    \
       20     30
        \    /
        40  50
```

This is not complete because there is a gap in the last level before another node appears.

### 2.3 Why Does a Heap Use a Complete Binary Tree?

A heap uses a Complete Binary Tree because it provides:

1. **Efficient storage:** It can be stored directly in an array without requiring pointers.
2. **Balanced height:** Its height is O(log n).
3. **Efficient operations:** Insertion and deletion can be performed in O(log n).
4. **No unnecessary gaps:** Array representation remains compact.

---

## 3. Binary Heap

### 3.1 What is a Binary Heap?

A Binary Heap is a Complete Binary Tree that satisfies the Heap Property.

There are two important properties:

**1. Structural Property**

The tree must always be a Complete Binary Tree.

**2. Ordering Property**

The parent must satisfy the heap ordering condition with respect to its children.

Depending on the type of heap, this condition changes.

### 3.2 Array Representation of a Binary Heap

A Binary Heap is generally implemented using an array.

Consider this Min Heap:

```text
             10
           /    \
          20     15
         /  \   /
        30  40 25
```

Its array representation is:

```python
heap = [10, 20, 15, 30, 40, 25]
```

The array stores the nodes level by level, from left to right.

### 3.3 Parent and Child Index Calculation

For a zero-indexed array:

For a node at index `i`:

- Parent: `(i - 1) // 2`
- Left child: `2 * i + 1`
- Right child: `2 * i + 2`

Example:

```python
heap = [10, 20, 15, 30, 40, 25]
```

For the node at index `1`, whose value is `20`:

```text
Parent index = (1 - 1) // 2 = 0
Left child index   = 2 * 1 + 1 = 3
Right child index  = 2 * 1 + 2 = 4
```

Therefore:

```text
             10
           /    \
         [20]    15
         /  \
        30   40
```

The parent is `10`, the left child is `30`, and the right child is `40`.

### 3.4 Python Implementation: Index Navigation

```python
def get_parent(i):
    return (i - 1) // 2 if i > 0 else None

def get_left_child(i):
    return 2 * i + 1

def get_right_child(i):
    return 2 * i + 2


heap = [10, 20, 15, 30, 40, 25]

i = 1

print("Node:", heap[i])
print("Parent:", heap[get_parent(i)])
print("Left Child:", heap[get_left_child(i)])
print("Right Child:", heap[get_right_child(i)])
```

Output:

```text
Node: 20
Parent: 10
Left Child: 30
Right Child: 40
```

---

## 4. Min Heap

### 4.1 What is a Min Heap?

A Min Heap is a Binary Heap in which every parent node is smaller than or equal to its children.

The smallest element is always present at the root.

**Min Heap Property:**

```text
Parent <= Left Child
Parent <= Right Child
```

This property must be maintained throughout the entire tree.

Example:

```text
             5
           /   \
          10    15
         / \   / \
        20 25 30  40
```

Array representation:

```python
heap = [5, 10, 15, 20, 25, 30, 40]
```

Notice:
- 5 is smaller than 10 and 15.
- 10 is smaller than 20 and 25.
- 15 is smaller than 30 and 40.

Therefore, it satisfies the Min Heap Property.

### 4.2 Important Characteristics

1. The root always contains the minimum element.
2. Every parent is smaller than or equal to its children.
3. The left child does not necessarily have to be smaller than the right child.
4. The entire array is not sorted.
5. The tree must be complete.

### 4.3 Example: Min Heap Is Not a Sorted Array

Consider:

```python
heap = [5, 10, 15, 20, 25, 30, 40]
```

The root is the smallest element, but this does not mean every element is globally sorted in every possible heap representation.

For example, this is also a valid Min Heap:

```python
heap = [5, 15, 10, 40, 20, 30, 25]
```

Both arrays satisfy the Min Heap Property.

### 4.4 Where Is a Min Heap Used?

- Finding the smallest element efficiently.
- Implementing a priority queue.
- Dijkstra's shortest path algorithm.
- Finding K smallest elements.
- Scheduling tasks with the smallest execution time or priority value.

---

## 5. Max Heap

### 5.1 What is a Max Heap?

A Max Heap is a Binary Heap in which every parent node is greater than or equal to its children.

The largest element is always present at the root.

**Max Heap Property:**

```text
Parent >= Left Child
Parent >= Right Child
```

Example:

```text
             50
           /    \
          40     30
         / \    / \
        20  25  10 15
```

Array representation:

```python
heap = [50, 40, 30, 20, 25, 10, 15]
```

### 5.2 Important Characteristics

1. The root always contains the maximum element.
2. Every parent is greater than or equal to its children.
3. The left child does not necessarily have to be greater than the right child.
4. The entire array is not sorted.
5. The tree must be complete.

### 5.3 Where Is a Max Heap Used?

- Finding the largest element efficiently.
- Finding K largest elements.
- Implementing a maximum-priority queue.
- Scheduling tasks with the highest priority.
- Heap Sort.

### 5.4 Min Heap vs Max Heap

| Property | Min Heap | Max Heap |
|---|---|---|
| Root | Minimum | Maximum |
| Parent condition | Parent <= Children | Parent >= Children |
| Access root | O(1) | O(1) |
| Insert | O(log n) | O(log n) |
| Extract root | O(log n) | O(log n) |
| Common use | K smallest | K largest |

---

## 6. Heapify

### 6.1 What is Heapify?

Heapify is the process of rearranging elements in a Binary Tree or array to satisfy the Heap Property.

If a node violates the Heap Property, we move it down or up until the property is restored.

There are two commonly used directions:

1. **Sift Up (Bubble Up):** Used when an element is inserted.
2. **Sift Down (Bubble Down):** Used when an element is removed from the root or when building a heap.

The term heapify is often used specifically for the sift-down operation.

### 6.2 Min Heapify (Sift Down)

For a Min Heap, we compare a parent with its children.

If the parent is greater than either child:
1. Find the smallest among the parent and its children.
2. Swap the parent with the smallest child.
3. Continue the process from the child's position.
4. Stop when the Min Heap Property is satisfied.

### 6.3 Example: Min Heapify

Consider the following tree:

```text
             40
           /    \
          10     20
         /  \
        30   50
```

Array:

```python
heap = [40, 10, 20, 30, 50]
```

The root violates the Min Heap Property because `40 > 10` and `40 > 20`.

**Step 1: Compare parent and children**

```text
Parent = 40
Left   = 10
Right  = 20
```

The smallest is `10`.

Swap 40 and 10.

```text
             10
           /    \
          40     20
         /  \
        30   50
```

Array:

```python
[10, 40, 20, 30, 50]
```

**Step 2: Continue from the new position of 40**

```text
Parent = 40
Left   = 30
Right  = 50
```

The smallest is `30`.

Swap 40 and 30.

```text
             10
           /    \
          30     20
         /  \
        40   50
```

Array:

```python
[10, 30, 20, 40, 50]
```

Now the Min Heap Property is satisfied.

### 6.4 Min Heapify Algorithm

```text
MIN_HEAPIFY(heap, n, i):

    smallest = i

    left = 2 * i + 1
    right = 2 * i + 2

    if left < n AND heap[left] < heap[smallest]:
        smallest = left

    if right < n AND heap[right] < heap[smallest]:
        smallest = right

    if smallest != i:
        swap(heap[i], heap[smallest])

        MIN_HEAPIFY(heap, n, smallest)
```

### 6.5 Python Implementation: Min Heapify

```python
def min_heapify(heap, n, i):

    smallest = i

    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and heap[left] < heap[smallest]:
        smallest = left

    if right < n and heap[right] < heap[smallest]:
        smallest = right

    if smallest != i:
        heap[i], heap[smallest] = heap[smallest], heap[i]

        min_heapify(heap, n, smallest)


heap = [40, 10, 20, 30, 50]

min_heapify(heap, len(heap), 0)

print(heap)
```

Output:

```text
[10, 30, 20, 40, 50]
```

**Time Complexity:** O(log n)

**Space Complexity:** O(log n) due to recursive calls in the worst case.

An iterative implementation can achieve O(1) auxiliary space.

### 6.6 Max Heapify

Max Heapify works similarly, except that we select the largest element instead of the smallest.

Algorithm:

```text
MAX_HEAPIFY(heap, n, i):

    largest = i

    left = 2 * i + 1
    right = 2 * i + 2

    if left < n AND heap[left] > heap[largest]:
        largest = left

    if right < n AND heap[right] > heap[largest]:
        largest = right

    if largest != i:
        swap(heap[i], heap[largest])

        MAX_HEAPIFY(heap, n, largest)
```

Python implementation:

```python
def max_heapify(heap, n, i):

    largest = i

    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and heap[left] > heap[largest]:
        largest = left

    if right < n and heap[right] > heap[largest]:
        largest = right

    if largest != i:
        heap[i], heap[largest] = heap[largest], heap[i]

        max_heapify(heap, n, largest)


heap = [10, 50, 30, 20, 40]

max_heapify(heap, len(heap), 0)

print(heap)
```

Output:

```text
[50, 40, 30, 20, 10]
```

**Time Complexity:** O(log n)

**Space Complexity:** O(log n) due to recursion.

---

## 7. Insert Operation

### 7.1 What Is Insertion in a Heap?

Insertion is the process of adding a new element to a heap while maintaining:

1. The Complete Binary Tree Property.
2. The Heap Property.

The new element is always inserted at the end of the array.

After insertion, we perform **Sift Up (Bubble Up)** to restore the Heap Property.

### 7.2 Min Heap Insertion Algorithm

1. Insert the new element at the end of the heap.
2. Calculate its parent index.
3. Compare the new element with its parent.
4. If the new element is smaller, swap them.
5. Repeat until the parent is smaller or the element reaches the root.

### 7.3 Example: Insert 5 into a Min Heap

Initial heap:

```text
             10
           /    \
          20     15
         /  \
        30   40
```

Array:

```python
[10, 20, 15, 30, 40]
```

We want to insert `5`.

**Step 1: Insert at the end**

```python
[10, 20, 15, 30, 40, 5]
```

Tree:

```text
             10
           /    \
          20     15
         /  \   /
        30  40  5
```

**Step 2: Compare 5 with its parent (15)**

Since `5 < 15`, swap them.

```python
[10, 20, 5, 30, 40, 15]
```

**Step 3: Compare 5 with its new parent (10)**

Since `5 < 10`, swap them.

```python
[5, 20, 10, 30, 40, 15]
```

Final heap:

```text
              5
            /   \
           20    10
          / \   /
         30 40 15
```

The Min Heap Property is now satisfied.

### 7.4 Insertion Algorithm

```text
INSERT(heap, value):

    append value to heap

    i = last index

    while i > 0:

        parent = (i - 1) // 2

        if heap[i] < heap[parent]:

            swap(heap[i], heap[parent])

            i = parent

        else:
            break
```

### 7.5 Python Implementation: Min Heap Insert

```python
def insert_min_heap(heap, value):

    heap.append(value)

    i = len(heap) - 1

    while i > 0:

        parent = (i - 1) // 2

        if heap[i] < heap[parent]:

            heap[i], heap[parent] = heap[parent], heap[i]

            i = parent

        else:
            break


heap = [10, 20, 15, 30, 40]

insert_min_heap(heap, 5)

print(heap)
```

Output:

```text
[5, 20, 10, 30, 40, 15]
```

**Time Complexity:** O(log n)

**Space Complexity:** O(1) auxiliary space, excluding the space required to store the new element.

### 7.6 Max Heap Insertion

For a Max Heap, the logic is the same, but we swap whenever the child is greater than its parent.

```python
def insert_max_heap(heap, value):

    heap.append(value)

    i = len(heap) - 1

    while i > 0:

        parent = (i - 1) // 2

        if heap[i] > heap[parent]:

            heap[i], heap[parent] = heap[parent], heap[i]

            i = parent

        else:
            break


heap = [50, 40, 30, 20, 25]

insert_max_heap(heap, 60)

print(heap)
```

Output:

```text
[60, 40, 50, 20, 25, 30]
```

**Time Complexity:** O(log n)

---

## 8. Extract Operation

### 8.1 What Is Extraction?

Extraction means removing the root element from the heap.

- In a Min Heap, extraction removes the minimum element.
- In a Max Heap, extraction removes the maximum element.

Unlike an ordinary array, we cannot simply remove the root and leave the tree unchanged.

We need to maintain both the Complete Binary Tree Property and the Heap Property.

### 8.2 Min Heap Extraction Algorithm

1. Store the root element because it is the minimum.
2. Replace the root with the last element.
3. Remove the last element.
4. Apply Min Heapify from the root.
5. Return the extracted minimum element.

### 8.3 Example: Extract Minimum from a Min Heap

Initial heap:

```text
             5
           /   \
          10    15
         / \   /
        20 25 30
```

Array:

```python
[5, 10, 15, 20, 25, 30]
```

**Step 1: Store the root**

```python
minimum = 5
```

**Step 2: Move the last element to the root**

```python
[30, 10, 15, 20, 25]
```

Tree:

```text
             30
           /    \
          10     15
         /  \
        20   25
```

**Step 3: Apply Min Heapify**

Compare 30 with 10 and 15.

Smallest = 10.

Swap:

```python
[10, 30, 15, 20, 25]
```

Tree:

```text
             10
           /    \
          30     15
         /  \
        20   25
```

**Step 4: Continue heapifying**

Compare 30 with 20 and 25.

Smallest = 20.

Swap:

```python
[10, 20, 15, 30, 25]
```

Final heap:

```text
             10
           /    \
          20     15
         /  \
        30   25
```

Extracted element:

```text
5
```

### 8.4 Extraction Algorithm

```text
EXTRACT_MIN(heap):

    if heap is empty:
        return None

    minimum = heap[0]

    last = remove last element

    if heap is not empty:

        heap[0] = last

        MIN_HEAPIFY(heap, len(heap), 0)

    return minimum
```

### 8.5 Python Implementation: Extract Minimum

```python
def min_heapify(heap, n, i):

    smallest = i

    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and heap[left] < heap[smallest]:
        smallest = left

    if right < n and heap[right] < heap[smallest]:
        smallest = right

    if smallest != i:

        heap[i], heap[smallest] = heap[smallest], heap[i]

        min_heapify(heap, n, smallest)


def extract_min(heap):

    if not heap:
        return None

    minimum = heap[0]

    last = heap.pop()

    if heap:
        heap[0] = last
        min_heapify(heap, len(heap), 0)

    return minimum


heap = [5, 10, 15, 20, 25, 30]

print("Extracted:", extract_min(heap))
print("Updated Heap:", heap)
```

Output:

```text
Extracted: 5
Updated Heap: [10, 20, 15, 30, 25]
```

**Time Complexity:** O(log n)

**Space Complexity:** O(log n) due to recursive heapify.

### 8.6 Extract Maximum from a Max Heap

The extraction process is identical, but we use Max Heapify.

```python
def max_heapify(heap, n, i):

    largest = i

    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and heap[left] > heap[largest]:
        largest = left

    if right < n and heap[right] > heap[largest]:
        largest = right

    if largest != i:

        heap[i], heap[largest] = heap[largest], heap[i]

        max_heapify(heap, n, largest)


def extract_max(heap):

    if not heap:
        return None

    maximum = heap[0]

    last = heap.pop()

    if heap:
        heap[0] = last
        max_heapify(heap, len(heap), 0)

    return maximum


heap = [50, 40, 30, 20, 25, 10]

print("Extracted:", extract_max(heap))
print("Updated Heap:", heap)
```

Output:

```text
Extracted: 50
Updated Heap: [40, 25, 30, 20, 10]
```

**Time Complexity:** O(log n)

---

## 9. Peek Operation

### 9.1 What Is Peek?

Peek is the operation of accessing the root element without removing it.

- In a Min Heap, peek returns the minimum element.
- In a Max Heap, peek returns the maximum element.

Unlike extraction, peek does not modify the heap.

### 9.2 Example

Min Heap:

```python
heap = [5, 10, 15, 20, 25, 30]
```

Peek:

```python
print(heap[0])
```

Output:

```text
5
```

The heap remains unchanged.

### 9.3 Python Implementation

```python
def peek_min(heap):

    if not heap:
        return None

    return heap[0]


def peek_max(heap):

    if not heap:
        return None

    return heap[0]


min_heap = [5, 10, 15, 20, 25]
max_heap = [50, 40, 30, 20, 10]

print("Minimum:", peek_min(min_heap))
print("Maximum:", peek_max(max_heap))
```

Output:

```text
Minimum: 5
Maximum: 50
```

**Time Complexity:** O(1)

**Space Complexity:** O(1)

---

## 10. Python's Built-in Heap Implementation

Python provides a built-in module called `heapq` for implementing heaps.

It implements a Min Heap by default.

### 10.1 Creating a Min Heap

```python
import heapq

heap = [40, 10, 30, 20, 50]

heapq.heapify(heap)

print(heap)
```

Output:

```text
[10, 20, 30, 40, 50]
```

`heapify()` converts an existing list into a Min Heap.

Time Complexity: O(n)

### 10.2 Inserting Elements

```python
import heapq

heap = [10, 20, 30]

heapq.heappush(heap, 5)

print(heap)
```

Output:

```text
[5, 10, 30, 20]
```

Time Complexity: O(log n)

### 10.3 Extracting the Minimum

```python
import heapq

heap = [5, 10, 30, 20]

minimum = heapq.heappop(heap)

print("Extracted:", minimum)
print("Heap:", heap)
```

Output:

```text
Extracted: 5
Heap: [10, 20, 30]
```

Time Complexity: O(log n)

### 10.4 Peeking

```python
import heapq

heap = [5, 10, 30, 20]

print(heap[0])
```

Output:

```text
5
```

Time Complexity: O(1)

### 10.5 Implementing a Max Heap Using heapq

Python's `heapq` is a Min Heap by default.

A common technique for implementing a Max Heap is to insert negative values.

```python
import heapq

heap = []

numbers = [10, 40, 20, 50, 30]

for num in numbers:
    heapq.heappush(heap, -num)

print("Maximum:", -heap[0])

maximum = -heapq.heappop(heap)

print("Extracted:", maximum)

print("Remaining:", [-x for x in heap])
```

Output:

```text
Maximum: 50
Extracted: 50
Remaining: [40, 30, 20, 10]
```

Why do we use negative values?

A Min Heap gives priority to smaller numbers.

By converting positive values into negative values, the largest original number becomes the smallest negative number.

For example:

```text
Original:  [10, 40, 20, 50, 30]
Negative: [-10, -40, -20, -50, -30]
```

The Min Heap selects `-50` first, which represents the original maximum value `50`.
