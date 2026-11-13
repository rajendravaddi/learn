# Queue

## 1. Definitions
### 1.1 Queue

A **Queue** is a linear data structure that follows the **FIFO (First In, First Out)** principle.

The element inserted first is the first element to be removed.

**Real-world example:**

Imagine people standing in a line at a ticket counter. The person who arrives first gets served first, while new people join at the end of the line.

**Example:**

Queue: `[10, 20, 30, 40]`

- `10` is the first element to be removed.
- `50` is inserted at the end.
- The queue becomes `[10, 20, 30, 40, 50]`.

**Basic representation:**

`FRONT → [10, 20, 30, 40] ← REAR`

### 1.2 FIFO (First In, First Out)

FIFO means the first element inserted into the queue is the first element removed.

Example:

1. Enqueue 10
2. Enqueue 20
3. Enqueue 30
4. Dequeue

Result: `[20, 30]`

The element `10` is removed because it entered first.

### 1.3 Front and Rear

A queue maintains two important positions:

- **Front:** Points to the first element, which will be removed next.
- **Rear:** Points to the last element, where a new element is inserted.

Example:

`FRONT → [10, 20, 30] ← REAR`

After removing 10:

`FRONT → [20, 30] ← REAR`

### 1.4 Enqueue

Enqueue is the operation of inserting an element at the rear of a queue.

Example:

Before: `[10, 20, 30]`

Enqueue(40)

After: `[10, 20, 30, 40]`

### 1.5 Dequeue

Dequeue is the operation of removing the element from the front of a queue.

Example:

Before: `[10, 20, 30, 40]`

Dequeue()

After: `[20, 30, 40]`

The removed element is `10`.

### 1.6 Peek / Front

Returns the front element without removing it.

Example:

Queue: `[10, 20, 30]`

Peek() → `10`

The queue remains unchanged.

### 1.7 IsEmpty and IsFull

- **IsEmpty:** Checks whether the queue contains zero elements.
- **IsFull:** Checks whether the queue has reached its maximum capacity.

These operations are particularly relevant to fixed-size array-based queues.

### 1.8 Queue Overflow and Underflow

- **Queue Overflow:** Attempting to insert an element into a full queue.
- **Queue Underflow:** Attempting to remove an element from an empty queue.

---
## 2. Types of Queues
### 2.1 Linear Queue

A **Linear Queue** is the simplest implementation of a queue using a fixed-size array.

It follows FIFO, where insertion happens at the `rear` and deletion happens at the `front`.

The array positions are used in a straight, linear manner. Once the `rear` reaches the final array index, no further insertion is possible, even if earlier positions have become empty.

#### Representation

Consider a queue with a capacity of 5:

`[10, 20, 30, 40, 50]`

Initially:

- Front = 0
- Rear = 4

Now perform a dequeue operation.

The element `10` is removed.

`[_, 20, 30, 40, 50]`

Front = 1, Rear = 4.

Although index 0 is now empty, the rear has already reached the last array index. A traditional linear queue cannot reuse that empty position.

This situation is called **false overflow**.

#### Operations

**Enqueue:**
- Check whether the rear has reached the last index.
- If full, report overflow.
- Otherwise, increment rear and insert the element.

**Dequeue:**
- Check whether the queue is empty.
- Remove the element at front.
- Increment front.

**Peek:**
- Return the element at the front without removing it.

#### Python Implementation

```python
class LinearQueue:
    def __init__(self, capacity):
        self.capacity = capacity
        self.queue = [None] * capacity
        self.front = 0
        self.rear = -1

    def is_empty(self):
        return self.rear < self.front

    def is_full(self):
        return self.rear == self.capacity - 1

    def enqueue(self, value):
        if self.is_full():
            raise OverflowError("Queue is full")

        self.rear += 1
        self.queue[self.rear] = value

    def dequeue(self):
        if self.is_empty():
            raise IndexError("Queue is empty")

        value = self.queue[self.front]
        self.front += 1
        return value

    def peek(self):
        if self.is_empty():
            raise IndexError("Queue is empty")

        return self.queue[self.front]

q = LinearQueue(5)

q.enqueue(10)
q.enqueue(20)
q.enqueue(30)

print(q.dequeue())  # 10
print(q.peek())     # 20
```

**Limitation of Linear Queue:**

The major limitation is the wastage of previously freed array positions. This problem motivates the circular queue.

---

### 2.2 Circular Queue

A **Circular Queue** is a queue in which the last position is logically connected to the first position.

It follows FIFO but allows previously freed positions to be reused.

Instead of moving only forward, the front and rear positions wrap around to the beginning when they reach the end of the array.

#### Why do we need a Circular Queue?

Consider an array of capacity 5:

`[10, 20, 30, 40, 50]`

After two dequeue operations:

`[_, _, 30, 40, 50]`

In a linear queue, insertion is no longer possible because rear has reached the last index.

However, a circular queue can reuse the first two empty positions.

After enqueueing 60 and 70:

`[60, 70, 30, 40, 50]`

The logical queue is:

`FRONT → 30 → 40 → 50 → 60 → 70`

The elements wrap around the array boundary.

#### How does wrapping work?

The circular queue uses the modulo operator (`%`) to calculate the next position.

`next_index = (current_index + 1) % capacity`

For capacity 5:

- After index 0 → index 1
- After index 1 → index 2
- After index 2 → index 3
- After index 3 → index 4
- After index 4 → index 0

This makes the array behave like a circular structure.

#### Circular Queue Conditions

For an implementation that maintains a `size` variable:

- Empty: `size == 0`
- Full: `size == capacity`
- Next rear position: `(rear + 1) % capacity`
- Next front position: `(front + 1) % capacity`

#### Python Implementation

```python
class CircularQueue:
    def __init__(self, capacity):
        self.capacity = capacity
        self.queue = [None] * capacity
        self.front = 0
        self.rear = -1
        self.size = 0

    def is_empty(self):
        return self.size == 0

    def is_full(self):
        return self.size == self.capacity

    def enqueue(self, value):
        if self.is_full():
            raise OverflowError("Queue is full")

        self.rear = (self.rear + 1) % self.capacity
        self.queue[self.rear] = value
        self.size += 1

    def dequeue(self):
        if self.is_empty():
            raise IndexError("Queue is empty")

        value = self.queue[self.front]
        self.queue[self.front] = None
        self.front = (self.front + 1) % self.capacity
        self.size -= 1

        return value

    def peek(self):
        if self.is_empty():
            raise IndexError("Queue is empty")

        return self.queue[self.front]

q = CircularQueue(5)

q.enqueue(10)
q.enqueue(20)
q.enqueue(30)
q.enqueue(40)
q.enqueue(50)

print(q.dequeue())  # 10
print(q.dequeue())  # 20

q.enqueue(60)
q.enqueue(70)

print(q.queue)
# [60, 70, 30, 40, 50]

print(q.peek())  # 30
```
---

### 2.3 Deque (Double-Ended Queue)

A **Deque** is a linear data structure that allows insertion and deletion at both ends.

Unlike a normal queue, where insertion happens at the rear and deletion happens at the front, a deque provides more flexibility.

#### Basic Operations

A deque supports four primary operations:

| Operation | Description |
|---|---|
| Insert Front | Insert an element at the front |
| Insert Rear | Insert an element at the rear |
| Delete Front | Remove an element from the front |
| Delete Rear | Remove an element from the rear |

#### Example

Initial deque:

`[20, 30, 40]`

Insert Front(10):

`[10, 20, 30, 40]`

Insert Rear(50):

`[10, 20, 30, 40, 50]`

Delete Front():

`[20, 30, 40, 50]`

Delete Rear():

`[20, 30, 40]`

#### Types of Deque

##### 1. Input-Restricted Deque

An Input-Restricted Deque allows insertion at only one end, but deletion at both ends.

- Insertion: Rear only
- Deletion: Front or Rear

Example:

`[10, 20, 30, 40]`

You can insert 50 at the rear, but cannot insert 5 at the front.

You can delete either 10 or 40.

##### 2. Output-Restricted Deque

An Output-Restricted Deque allows deletion at only one end, but insertion at both ends.

- Insertion: Front or Rear
- Deletion: Front only

Example:

`[10, 20, 30, 40]`

You can insert 5 at the front or 50 at the rear, but can only delete 10 from the front.

##### Python Implementation Using deque

Python provides `collections.deque`, which supports efficient operations at both ends.

```python
from collections import deque

dq = deque()

dq.append(10)       # Insert at rear
dq.append(20)

dq.appendleft(5)    # Insert at front

print(dq)
# deque([5, 10, 20])

dq.pop()            # Delete from rear
dq.popleft()        # Delete from front

print(dq)
# deque([10])
```

**Applications of Deque:**

- Sliding Window Maximum
- Palindrome checking
- Undo and redo operations
- Maintaining elements at both ends
- Monotonic deque problems

---

### 2.4 Priority Queue (Introduction)

A **Priority Queue** is an abstract data structure in which elements are processed according to their priority rather than their insertion order.

Unlike a normal FIFO queue, the element with the highest or lowest priority is removed first, depending on the priority convention.

If two elements have the same priority, their relative processing order depends on the implementation.

#### Example

Suppose we have three tasks:

| Task | Priority |
|---|---:|
| A | 3 |
| B | 1 |
| C | 2 |

In a normal queue, insertion order determines removal:

A → B → C

In a priority queue using lower numbers as higher priority:

B → C → A

#### Types of Priority Queue

##### 1. Min Priority Queue

The element with the smallest value or priority is removed first.

Example:

Inserted: `30, 10, 20`

Removal order:

`10 → 20 → 30`

##### 2. Max Priority Queue

The element with the largest value or priority is removed first.

Example:

Inserted: `30, 10, 20`

Removal order:

`30 → 20 → 10`

##### Python Introduction

Python provides the `heapq` module, which implements a min-heap and can be used to build a priority queue.

```python
import heapq

pq = []

heapq.heappush(pq, 30)
heapq.heappush(pq, 10)
heapq.heappush(pq, 20)

print(heapq.heappop(pq))  # 10
print(heapq.heappop(pq))  # 20
print(heapq.heappop(pq))  # 30
```

**Important:** A priority queue is an abstract data structure, while a heap is a common implementation of it. We will study heaps in detail in a dedicated chapter.

---

## 3. Queue Implementation

Queues can be implemented using different underlying data structures. The choice affects performance, memory usage, and implementation complexity.

### 3.1 Python List as Queue

Python lists can be used to implement a basic queue.

- `append()` inserts at the rear.
- `pop(0)` removes from the front.

Example:

```python
queue = []

queue.append(10)
queue.append(20)
queue.append(30)

print(queue.pop(0))  # 10

print(queue)
# [20, 30]
```

**Important performance consideration:**

`append()` takes amortized O(1) time, but `pop(0)` takes O(n) time because the remaining elements must shift left.

Therefore, Python lists are not recommended for queues requiring frequent front deletions.

### 3.2 collections.deque

Python's `collections.deque` is designed for efficient insertion and deletion at both ends.

Example:

```python
from collections import deque

queue = deque()

queue.append(10)
queue.append(20)
queue.append(30)

print(queue.popleft())  # 10

print(queue)
# deque([20, 30])
```

**Advantages:**

- Efficient insertion at both ends.
- Efficient deletion at both ends.
- No shifting of all remaining elements.
- Suitable for general-purpose queue operations.

The primary queue operations `append()` and `popleft()` have approximately O(1) time complexity.

### 3.3 Queue Using Linked List

A queue can also be implemented using a linked list.

Each node stores:
- Data
- A reference to the next node

The queue maintains two references:

- Front: Points to the first node.
- Rear: Points to the last node.

#### Representation

`Front → [10] → [20] → [30] ← Rear`

**Enqueue:**

Create a new node and connect it after the current rear. Update rear to the new node.

`Front → [10] → [20] → [30] → [40] ← Rear`

**Dequeue:**

Remove the front node and update front to the next node.

`Front → [20] → [30] → [40] ← Rear`

If the last node is removed, both front and rear must become `None`.

#### Python Implementation

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedListQueue:
    def __init__(self):
        self.front = None
        self.rear = None

    def is_empty(self):
        return self.front is None

    def enqueue(self, value):
        new_node = Node(value)

        if self.is_empty():
            self.front = self.rear = new_node
            return

        self.rear.next = new_node
        self.rear = new_node

    def dequeue(self):
        if self.is_empty():
            raise IndexError("Queue is empty")

        value = self.front.data
        self.front = self.front.next

        if self.front is None:
            self.rear = None

        return value

    def peek(self):
        if self.is_empty():
            raise IndexError("Queue is empty")

        return self.front.data
```

**Advantages:**

- Dynamic size.
- No fixed array capacity.
- O(1) enqueue and dequeue when front and rear references are maintained.

**Disadvantages:**

- Additional memory required for node references.
- More pointer manipulation.
- Dynamic memory allocation overhead.

### 3.4 Circular Queue Implementation

Circular Queue is an array-based implementation that reuses freed positions through wrap-around indexing.

Its implementation is covered in Section 2.2.

Important concepts:

- Fixed-size array
- Front and rear indices
- Modulo arithmetic
- Size tracking
- Wrap-around
- Full and empty conditions

### 3.5 Python queue.Queue (Introduction)

Python provides the `queue` module for thread-safe queue implementations.

It is particularly useful in multithreaded programs where multiple threads may insert and remove elements simultaneously.

Example:

```python
from queue import Queue

q = Queue()

q.put(10)
q.put(20)
q.put(30)

print(q.get())  # 10
print(q.get())  # 20

print(q.qsize())  # 1
```

Important methods:

| Method | Purpose |
|---|---|
| `put()` | Insert an element |
| `get()` | Remove and return an element |
| `empty()` | Check whether queue is empty |
| `full()` | Check whether bounded queue is full |
| `qsize()` | Return approximate queue size |

**Important distinction:**

- `collections.deque`: General-purpose, efficient double-ended operations.
- `queue.Queue`: Thread-safe queue designed for communication between threads.

---

## 4. Queue Operations and Complexity

The time complexity of queue operations depends on the underlying implementation.

### Complexity Comparison

| Operation | Python List | deque | Linked List | Circular Array |
|---|---:|---:|---:|---:|
| Enqueue | O(1)* | O(1) | O(1) | O(1) |
| Dequeue | O(n) | O(1) | O(1) | O(1) |
| Peek | O(1) | O(1) | O(1) | O(1) |
| IsEmpty | O(1) | O(1) | O(1) | O(1) |
| IsFull | N/A | N/A** | N/A | O(1) |

*Python list append is amortized O(1).

**A bounded deque can have a maximum length, but its full behavior differs from a conventional fixed-capacity circular queue.

### Space Complexity

- Array-based queue: O(n)
- Circular queue: O(n)
- Linked-list queue: O(n)
- Python deque: O(n)

Here, n represents the number of elements stored, or the allocated capacity for fixed-size array implementations.

---

## 5. Applications of Queue

Queues are widely used in computer science and real-world systems.

### 5.1 CPU Scheduling

Operating systems use scheduling algorithms to manage processes waiting for CPU execution.

A queue can maintain processes waiting to receive CPU time.

### 5.2 Task Scheduling

Tasks can be stored in a queue and processed in the order they arrive.

Example: Background jobs waiting to execute.

### 5.3 Print Queue

When multiple documents are sent to a printer, they are generally placed in a queue and processed one after another.

### 5.4 Request Handling

Servers may use queues to manage incoming requests and distribute work to processing components.

### 5.5 Buffering

Queues temporarily store data while it moves between components operating at different speeds.

Examples:
- Keyboard input buffering
- Network packet buffering
- Audio and video streaming

### 5.6 Producer-Consumer Concept

The Producer-Consumer problem involves two types of entities:

- **Producer:** Generates data and inserts it into a shared buffer.
- **Consumer:** Retrieves and processes data from that buffer.

A queue is commonly used as the shared buffer.

Example:

A producer generates tasks:

`Task 1 → Task 2 → Task 3`

The consumer retrieves and processes them in order.

### 5.7 Message Queues

Message queues allow different components or services to communicate asynchronously.

A sender places messages into a queue, and a receiver processes them when ready.

Examples include background job processing and distributed application communication.
