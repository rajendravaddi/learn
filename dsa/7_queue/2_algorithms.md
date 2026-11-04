# Queue — Algorithms

## 1. Queue Traversal

Queue traversal means visiting or accessing every element in a queue, usually from front to rear.

Since a queue follows FIFO, elements are processed in the order they were inserted.

### Example

Queue:

`[10, 20, 30, 40, 50]`

Traversal order:

`10 → 20 → 30 → 40 → 50`

### Python Implementation

Using `collections.deque`:

```python
from collections import deque

queue = deque([10, 20, 30, 40, 50])

for element in queue:
    print(element)
```

Output:

```text
10
20
30
40
50
```

### Traversal Using Dequeue

We can also traverse a queue by repeatedly removing elements from the front.

However, this modifies the original queue.

```python
from collections import deque

queue = deque([10, 20, 30, 40])

while queue:
    print(queue.popleft())
```

If we want to preserve the original queue, traverse a copy:

```python
temp = deque(queue)

while temp:
    print(temp.popleft())
```

**Complexity:**

- Time: O(n)
- Auxiliary space: O(1) for direct iteration, O(n) when creating a copy.

---

## 2. Queue Reversal

Queue reversal means changing the order of elements so that the last element becomes the first and the first element becomes the last.

A stack is commonly used because it follows LIFO, which naturally reverses the order of elements.

### Example

Original Queue:

`FRONT → [10, 20, 30, 40, 50]`

Reversed Queue:

`FRONT → [50, 40, 30, 20, 10]`

### Approach: Using a Stack

**Intuition:**

1. Remove elements from the front of the queue.
2. Push each removed element into a stack.
3. Pop elements from the stack.
4. Insert them back into the queue.

Since a stack reverses the order of elements, the queue becomes reversed.

### Step-by-Step Example

Initial Queue:

`[10, 20, 30]`

Step 1: Move elements into the stack.

```text
Queue: []
Stack: [10, 20, 30]
```

Step 2: Pop elements from the stack and insert them into the queue.

```text
Queue: [30]
Queue: [30, 20]
Queue: [30, 20, 10]
```

Final Queue:

`[30, 20, 10]`

### Python Implementation

```python
from collections import deque

def reverse_queue(queue):
    stack = []

    while queue:
        stack.append(queue.popleft())

    while stack:
        queue.append(stack.pop())

    return queue


q = deque([10, 20, 30, 40, 50])

reverse_queue(q)

print(q)
# deque([50, 40, 30, 20, 10])
```

**Complexity:**

- Time: O(n)
- Auxiliary space: O(n)

---

## 3. Reverse First K Elements of a Queue

This problem requires reversing only the first K elements of a queue while keeping the remaining elements in their original relative order.

A stack is used to reverse the first K elements.

### Example

Given:

Queue = `[10, 20, 30, 40, 50, 60]`

K = 3

Expected output:

`[30, 20, 10, 40, 50, 60]`

Only the first three elements are reversed.

### Approach: Using a Stack

**Intuition:**

1. Remove the first K elements from the queue.
2. Push them into a stack.
3. Pop the stack elements and insert them back into the queue.
4. Move the remaining n-K elements from the front to the rear.

The final rotation restores the remaining elements after the reversed section.

### Step-by-Step Example

Initial Queue:

`[10, 20, 30, 40, 50, 60]`

K = 3

Step 1: Remove the first three elements and push them into the stack.

```text
Queue: [40, 50, 60]
Stack: [10, 20, 30]
```

Step 2: Pop from the stack and insert into the queue.

```text
Queue: [40, 50, 60, 30, 20, 10]
```

Step 3: Rotate the remaining three original elements to the rear.

```text
Queue: [30, 20, 10, 40, 50, 60]
```

Final result:

`[30, 20, 10, 40, 50, 60]`

### Python Implementation

```python
from collections import deque

def reverse_first_k(queue, k):
    n = len(queue)

    if k < 0 or k > n:
        raise ValueError("Invalid value of k")

    if k == 0 or k == 1:
        return queue

    stack = []

    # Remove first k elements
    for _ in range(k):
        stack.append(queue.popleft())

    # Insert them in reversed order
    while stack:
        queue.append(stack.pop())

    # Move the remaining original elements to the rear
    for _ in range(n - k):
        queue.append(queue.popleft())

    return queue


q = deque([10, 20, 30, 40, 50, 60])

reverse_first_k(q, 3)

print(q)
# deque([30, 20, 10, 40, 50, 60])
```

**Complexity:**

- Time: O(n)
- Auxiliary space: O(k)

---

## 4. Interleaving First and Second Halves of a Queue

Interleaving means alternating elements from the first half and second half of a queue.

This problem generally assumes that the queue contains an even number of elements.

### Example

Given:

Queue = `[1, 2, 3, 4, 5, 6]`

First half:

`[1, 2, 3]`

Second half:

`[4, 5, 6]`

Interleaved result:

`[1, 4, 2, 5, 3, 6]`

### Approach: Using an Auxiliary Queue

**Intuition:**

1. Divide the original queue into two equal halves.
2. Move the first half into an auxiliary queue.
3. Remove one element from the auxiliary queue.
4. Remove one element from the original queue.
5. Insert both into the result in alternating order.

### Step-by-Step Example

Original Queue:

`[1, 2, 3, 4, 5, 6]`

Move the first half into a temporary queue:

```text
Temporary: [1, 2, 3]
Original:  [4, 5, 6]
```

Now alternate elements:

```text
Take 1 → Take 4
Take 2 → Take 5
Take 3 → Take 6
```

Result:

`[1, 4, 2, 5, 3, 6]`

### Python Implementation

```python
from collections import deque

def interleave_queue(queue):
    n = len(queue)

    if n % 2 != 0:
        raise ValueError("Queue must have an even number of elements")

    first_half = deque()

    # Store first half
    for _ in range(n // 2):
        first_half.append(queue.popleft())

    # Interleave both halves
    while first_half:
        queue.append(first_half.popleft())
        queue.append(queue.popleft())

    return queue


q = deque([1, 2, 3, 4, 5, 6])

interleave_queue(q)

print(q)
# deque([1, 4, 2, 5, 3, 6])
```

**Complexity:**

- Time: O(n)
- Auxiliary space: O(n)

---

## 5. Generate Binary Numbers Using Queue

This algorithm generates binary representations of consecutive positive integers using a queue.

It demonstrates how a queue can help generate values in a systematic order.

### Example

For N = 5, generate the first five binary numbers:

```text
1
10
11
100
101
```

### Approach: Using a Queue

**Intuition:**

1. Insert `"1"` into the queue.
2. Remove the front element and add it to the result.
3. Append `"0"` and `"1"` to that removed element.
4. Insert both generated values into the queue.
5. Repeat until N numbers have been generated.

Each binary number generates two possible next numbers by appending 0 or 1.

### Step-by-Step Example

Initially:

```text
Queue: ["1"]
```

Remove `"1"`:

```text
Output: 1
Queue: ["10", "11"]
```

Remove `"10"`:

```text
Output: 1, 10
Queue: ["11", "100", "101"]
```

Remove `"11"`:

```text
Output: 1, 10, 11
Queue: ["100", "101", "110", "111"]
```

Continue until N numbers are generated.

### Python Implementation

```python
from collections import deque

def generate_binary(n):
    if n <= 0:
        return []

    queue = deque(["1"])
    result = []

    for _ in range(n):
        current = queue.popleft()
        result.append(current)

        queue.append(current + "0")
        queue.append(current + "1")

    return result


print(generate_binary(5))
# ['1', '10', '11', '100', '101']
```

**Complexity:**

- Time: O(N log N) character processing, approximately, because generated strings have O(log N) characters.
- Auxiliary space: O(N log N) including stored string characters.

---

## 6. Queue Simulation

Queue simulation means using a queue to model a real-world process where entities arrive, wait, and get processed in a particular order.

It is commonly used in scheduling, service systems, and waiting-line problems.

### Example: Ticket Counter

People arrive at a ticket counter:

```text
A → B → C → D
```

The counter serves one person at a time.

Processing order:

```text
Serve A
Serve B
Serve C
Serve D
```

### Python Implementation

```python
from collections import deque

customers = deque(["A", "B", "C", "D"])

while customers:
    customer = customers.popleft()
    print("Serving:", customer)
```

Output:

```text
Serving: A
Serving: B
Serving: C
Serving: D
```

### Example: Round-Robin Simulation

In round-robin scheduling, each process gets a fixed time slice.

If a process is not finished, it goes to the rear of the queue.

Example:

Processes:

```text
P1 = 5 units
P2 = 3 units
P3 = 1 unit
```

Time quantum = 2 units.

Execution:

```text
P1: 2 units remaining = 3
P2: 2 units remaining = 1
P3: 1 unit remaining = 0
P1: 2 units remaining = 1
P2: 1 unit remaining = 0
P1: 1 unit remaining = 0
```

The queue maintains the order of processes waiting for their next turn.

### Python Implementation

```python
from collections import deque

def round_robin(processes, quantum):
    queue = deque(processes)

    while queue:
        name, remaining = queue.popleft()

        executed = min(quantum, remaining)
        remaining -= executed

        print(f"{name} executed for {executed}")

        if remaining > 0:
            queue.append((name, remaining))


processes = [
    ("P1", 5),
    ("P2", 3),
    ("P3", 1)
]

round_robin(processes, 2)
```

**Complexity:**

For n processes and a total of r execution rounds:

- Time: O(r), assuming constant-time queue operations.
- Auxiliary space: O(n).

---

## 7. Basic Task Scheduling

Task scheduling involves maintaining a collection of tasks and processing them according to a scheduling policy.

A simple FIFO task scheduler processes tasks in the order they arrive.

### Example

Tasks:

```text
Task A
Task B
Task C
Task D
```

Execution order:

```text
A → B → C → D
```

### Python Implementation

```python
from collections import deque

class TaskScheduler:
    def __init__(self):
        self.tasks = deque()

    def add_task(self, task):
        self.tasks.append(task)

    def execute_next(self):
        if not self.tasks:
            return None

        task = self.tasks.popleft()
        print("Executing:", task)

        return task


scheduler = TaskScheduler()

scheduler.add_task("Send Email")
scheduler.add_task("Generate Report")
scheduler.add_task("Backup Data")

scheduler.execute_next()
scheduler.execute_next()
scheduler.execute_next()
```

Output:

```text
Executing: Send Email
Executing: Generate Report
Executing: Backup Data
```

### Important Scheduling Concepts

- **FCFS (First Come, First Served):** Tasks are processed in arrival order.
- **Round Robin:** Each task receives a fixed execution time.
- **Priority Scheduling:** Tasks are selected according to priority.

A simple FIFO queue is sufficient for FCFS. Round Robin can use a regular queue, while priority scheduling generally requires a priority queue.

---

## 8. Producer-Consumer Concept

The Producer-Consumer problem is a synchronization problem in which producers generate data and consumers process that data through a shared buffer.

A queue is commonly used as the shared buffer.

### Main Components

**Producer:**
- Generates data.
- Inserts data into the queue.
- Waits if the bounded buffer is full.

**Consumer:**
- Retrieves data from the queue.
- Processes the data.
- Waits if the queue is empty.

### Example

Suppose a producer generates three tasks:

```text
Task 1
Task 2
Task 3
```

The queue stores them:

```text
Front → [Task 1, Task 2, Task 3] ← Rear
```

The consumer retrieves:

```text
Task 1 → Task 2 → Task 3
```

### Python Implementation

Python's `queue.Queue` provides thread-safe operations and can be used to implement this pattern.

```python
from queue import Queue
from threading import Thread

buffer = Queue(maxsize=3)

def producer():
    for item in range(1, 4):
        buffer.put(item)
        print("Produced:", item)

def consumer():
    for _ in range(3):
        item = buffer.get()
        print("Consumed:", item)
        buffer.task_done()

p = Thread(target=producer)
c = Thread(target=consumer)

p.start()
c.start()

p.join()
c.join()
```

### Important Concepts

- **Bounded Buffer:** A buffer with a fixed maximum capacity.
- **Synchronization:** Coordinating producers and consumers.
- **Blocking:** Waiting when a queue is full or empty.
- **Thread Safety:** Ensuring concurrent operations do not corrupt shared data.

`queue.Queue` handles the required locking and blocking behavior internally.

**Note:** The printed order of production and consumption can vary because both threads execute concurrently.

---

## 9. Buffering and Message Queue Basics

### 9.1 Buffering

Buffering is the temporary storage of data while it is transferred between two components.

It is useful when the producer and consumer operate at different speeds.

A queue is frequently used as a buffer.

### Example: Video Streaming

Imagine a video streaming application.

- The producer downloads video chunks.
- The consumer plays video chunks.
- A buffer temporarily stores downloaded chunks.

```text
Download → [Chunk 1, Chunk 2, Chunk 3] → Playback
```

If downloading is faster than playback, the buffer fills up.

If playback is faster than downloading, the buffer may become empty, causing buffering interruptions.

### Common Applications

- Video and audio streaming
- Network communication
- Keyboard input
- File processing
- Data transfer between components

### 9.2 Message Queues

A Message Queue is a communication mechanism that allows different applications or services to exchange messages asynchronously.

Instead of directly communicating with each other, a sender places a message into a queue, and a receiver retrieves it later.

### Main Components

**Producer:**
Creates and sends messages.

**Message Queue:**
Stores messages until they are retrieved.

**Consumer:**
Retrieves and processes messages.

### Example: Online Shopping Application

Suppose a customer places an order.

The application may need to:

1. Save the order.
2. Send a confirmation email.
3. Update inventory.
4. Notify the shipping service.

Instead of performing every operation synchronously, the application can publish messages to a message queue.

```text
             Order Placed
                  |
                  v
             Message Queue
              /    |    \
             /     |     \
            v      v      v
         Email  Inventory Shipping
         Service Service  Service
```

Each consumer processes its respective message independently.

### Advantages of Message Queues

- Asynchronous communication.
- Reduced dependency between services.
- Better handling of temporary workload spikes.
- Improved scalability.
- Ability to retry failed processing, depending on the messaging system.

### Popular Message Queue Technologies

- RabbitMQ
- Apache Kafka
- Amazon SQS
- Redis Streams

**Important distinction:**

A basic queue is a data structure, whereas a message queue is a messaging system built around concepts such as message storage, delivery, acknowledgements, and asynchronous communication.

Also, not every message broker guarantees strict FIFO processing across all configurations.

---