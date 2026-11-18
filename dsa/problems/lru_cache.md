# LeetCode 146 – LRU Cache (Python)

The LRU Cache problem is a classic problem that tests your understanding of **Hash Maps + Doubly Linked Lists**.

## 1. Problem Understanding

LRU stands for **Least Recently Used**.

We need to design a cache with a fixed capacity.

The rules are:

- Whenever `get(key)` is called, that key becomes the most recently used.
- Whenever `put(key, value)` is called, that key becomes the most recently used.
- If the cache exceeds its capacity, remove the least recently used key.

Both `get()` and `put()` must execute in **O(1) average time complexity**.

## 2. Which Data Structures Should We Use?

We need two data structures:

1. **Dictionary (HashMap):** To find a key in O(1) average time.
2. **Doubly Linked List:** To maintain usage order and remove or move nodes in O(1) time.

### Doubly Linked List Structure

We maintain the cache in this order:

`LRU → Key 1 → Key 2 → Key 3 → MRU`

- The leftmost node is the least recently used.
- The rightmost node is the most recently used.

We also use two dummy nodes:

- `head`: Represents the LRU side.
- `tail`: Represents the MRU side.

The actual cache nodes are always between these two dummy nodes.

This makes insertion and deletion easier because we don't need special handling for the first and last actual nodes.

## 3. Complete Python Implementation (HashMap + Doubly Linked List)

```python
class Node:
    def __init__(self, key=0, value=0):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None


class LRUCache:

    def __init__(self, capacity: int):
        self.capacity = capacity

        # HashMap: key -> Node
        self.cache = {}

        # Dummy head and tail
        self.head = Node()
        self.tail = Node()

        self.head.next = self.tail
        self.tail.prev = self.head

    # Remove a node from the linked list
    def remove(self, node):
        prev_node = node.prev
        next_node = node.next

        prev_node.next = next_node
        next_node.prev = prev_node

    # Insert node at the MRU position
    def insert(self, node):
        prev_node = self.tail.prev

        prev_node.next = node
        node.prev = prev_node

        node.next = self.tail
        self.tail.prev = node

    # Get a value from the cache
    def get(self, key: int) -> int:

        if key not in self.cache:
            return -1

        node = self.cache[key]

        # Mark as most recently used
        self.remove(node)
        self.insert(node)

        return node.value

    # Add or update a key-value pair
    def put(self, key: int, value: int) -> None:

        if key in self.cache:
            # Remove existing node
            self.remove(self.cache[key])

        node = Node(key, value)

        # Add/update dictionary
        self.cache[key] = node

        # Move to MRU position
        self.insert(node)

        # Evict LRU if capacity is exceeded
        if len(self.cache) > self.capacity:
            lru_node = self.head.next

            self.remove(lru_node)
            del self.cache[lru_node.key]
```

## 4. Understanding the Important Operations

### A. remove(node)

Removes a node from the doubly linked list.

Suppose we have:

`Previous ↔ Node ↔ Next`

To remove the node, we simply connect its previous and next nodes:

```python
prev_node.next = next_node
next_node.prev = prev_node
```

This takes O(1) time because we already have a reference to the node.

### B. insert(node)

Always inserts a node just before the `tail`.

This means the newly inserted node is always the most recently used.

```python
prev_node = self.tail.prev

prev_node.next = node
node.prev = prev_node

node.next = self.tail
self.tail.prev = node
```

### C. get(key)

Steps:

1. Check whether the key exists in the dictionary.
2. If it doesn't exist, return `-1`.
3. If it exists, retrieve its node.
4. Remove that node from its current position.
5. Insert it at the MRU position.
6. Return its value.

Why do we move the node?

Because accessing a key means it has just been used, so it should become the most recently used.

### D. put(key, value)

Steps:

1. If the key already exists, remove its old node.
2. Create a new node with the updated value.
3. Insert the node into the dictionary.
4. Insert it at the MRU position.
5. If capacity is exceeded, remove `head.next` (the LRU node).

**Important:** We store both key and value inside the linked-list node because, during eviction, we need the key to delete the corresponding entry from the dictionary.

## 5. Dry Run with the Given Example

Capacity = 2

| Operation | Cache (LRU → MRU) | Result |
|---|---|---|
| put(1, 1) | 1 | None |
| put(2, 2) | 1 → 2 | None |
| get(1) | 2 → 1 | 1 |
| put(3, 3) | 1 → 3 | None |
| get(2) | 1 → 3 | -1 |
| put(4, 4) | 3 → 4 | None |
| get(1) | 3 → 4 | -1 |
| get(3) | 4 → 3 | 3 |
| get(4) | 3 → 4 | 4 |

### Step-by-step explanation

**Step 1:** `put(1, 1)`

Cache: `1`

**Step 2:** `put(2, 2)`

Cache: `1 → 2`

**Step 3:** `get(1)`

Key 1 is accessed, so it becomes the most recently used.

Cache: `2 → 1`

Returns: `1`

**Step 4:** `put(3, 3)`

Capacity is 2, so we must evict the LRU key (2).

Cache: `1 → 3`

**Step 5:** `get(2)`

Key 2 was evicted.

Returns: `-1`

**Step 6:** `put(4, 4)`

Key 1 is currently the LRU, so it gets evicted.

Cache: `3 → 4`

**Step 7:** `get(1)`

Returns: `-1`

**Step 8:** `get(3)`

Key 3 becomes the MRU.

Cache: `4 → 3`

Returns: `3`

**Step 9:** `get(4)`

Key 4 becomes the MRU.

Cache: `3 → 4`

Returns: `4`

### Final Output

```python
[None, None, None, 1, None, -1, None, -1, 3, 4]
```

## 6. Time and Space Complexity

| Operation | Complexity | Reason |
|---|---|---|
| get() | O(1) average | Dictionary lookup + pointer updates |
| put() | O(1) average | Dictionary operations + pointer updates |
| remove() | O(1) | Two pointer updates |
| insert() | O(1) | Four pointer updates |

- **Time Complexity:** O(1) average for both `get()` and `put()`.
- **Space Complexity:** O(capacity), because we store at most `capacity` cache entries.

## 7. Python Shortcut – Using OrderedDict

Python provides a built-in data structure called `OrderedDict` that maintains insertion order.

We can solve the same problem with much less code.

```python
from collections import OrderedDict

class LRUCache:

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1

        # Move key to the most recently used position
        self.cache.move_to_end(key)

        return self.cache[key]

    def put(self, key: int, value: int) -> None:

        if key in self.cache:
            self.cache.move_to_end(key)

        self.cache[key] = value

        # Remove least recently used item
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)
```

Both approaches achieve O(1) average time complexity.
