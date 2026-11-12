# Graph Traversal Algorithms

## 1. What is Graph Traversal?

Graph Traversal is the process of visiting or exploring vertices (nodes) of a graph systematically.

Unlike arrays and linked lists, graphs can contain:
- Multiple paths between vertices.
- Cycles.
- Disconnected components.
- Vertices with multiple neighbors.

Therefore, while traversing a graph, we need to keep track of visited vertices to avoid visiting the same vertex repeatedly.

### Example

Consider this undirected graph:

```text
       0
      / \
     1   2
     |   |
     3---4
```

Starting from vertex 0, we need to visit all reachable vertices.

Two commonly used graph traversal algorithms are:

1. DFS (Depth First Search)
2. BFS (Breadth First Search)

### Why do we need a Visited Set?

Consider a graph containing a cycle:

```text
    0
   / \
  1---2
```

Connections:
- 0 — 1
- 0 — 2
- 1 — 2

Without tracking visited vertices, traversal can repeatedly move between 0, 1 and 2.

A visited set prevents this.

```python
visited = set()
```

Whenever we visit a vertex, we add it to the set.

Before visiting a neighbor, we check whether it has already been visited.

---

## 2. DFS (Depth First Search)

**Depth First Search (DFS)** is a graph traversal algorithm that explores as far as possible along one path before backtracking and exploring other paths.

In simple words:

Go deep first, then come back.

DFS uses the following concepts:
- Visited set to avoid revisiting vertices.
- Stack to remember which vertices to explore next.
- Recursion can also be used to implement the stack behavior.

### Example

Consider this graph:

```text
       0
      / \
     1   2
    / \
   3   4
```

Starting from vertex 0, one possible DFS traversal is:

```text
0 → 1 → 3 → 4 → 2
```

Traversal order depends on the order in which neighbors are processed.

### How DFS works

1. Start from a vertex.
2. Mark the vertex as visited.
3. Visit one unvisited neighbor.
4. Continue exploring deeper.
5. If no unvisited neighbor exists, backtrack.
6. Continue until all reachable vertices are visited.

### DFS applications

- Finding connected components.
- Cycle detection.
- Path finding.
- Maze solving.
- Topological sorting.
- Detecting reachability.

---

## 3. Recursive DFS

### 3.1 What is Recursive DFS?

Recursive DFS implements Depth First Search using a recursive function.

Whenever we find an unvisited neighbor, we call the same DFS function for that neighbor.

The function calls are managed internally using the **recursion call stack**.

#### Example Graph

```text
       0
      / \
     1   2
    / \
   3   4
```

Adjacency List:

```python
graph = {
    0: [1, 2],
    1: [0, 3, 4],
    2: [0],
    3: [1],
    4: [1]
}
```

#### Python Implementation

```python
def dfs(graph, node, visited):
    # Mark current node as visited
    visited.add(node)

    print(node, end=" ")

    # Explore all neighbors
    for neighbor in graph[node]:

        if neighbor not in visited:
            dfs(graph, neighbor, visited)


graph = {
    0: [1, 2],
    1: [0, 3, 4],
    2: [0],
    3: [1],
    4: [1]
}

visited = set()

dfs(graph, 0, visited)
```

Output:

```text
0 1 3 4 2
```

#### Dry Run

Starting vertex = 0

Initial state:

```python
visited = set()
```

**Step 1: Visit 0**

```python
visited = {0}
```

Print 0.

Neighbors of 0 are [1, 2].

First unvisited neighbor = 1.

Call `dfs(graph, 1, visited)`.

**Step 2: Visit 1**

```python
visited = {0, 1}
```

Print 1.

Neighbors of 1 are [0, 3, 4].

- 0 is already visited.
- 3 is unvisited.

Call DFS for 3.

**Step 3: Visit 3**

```python
visited = {0, 1, 3}
```

Print 3.

Neighbor of 3 is 1, which is already visited.

No more unvisited neighbors.

Backtrack to 1.

**Step 4: Visit 4**

The next unvisited neighbor of 1 is 4.

```python
visited = {0, 1, 3, 4}
```

Print 4.

Its only neighbor is 1, which is already visited.

Backtrack to 1, then to 0.

**Step 5: Visit 2**

The next unvisited neighbor of 0 is 2.

```python
visited = {0, 1, 2, 3, 4}
```

Print 2.

Its only neighbor is 0, which is already visited.

Traversal completes.

#### Final Traversal

```text
0 → 1 → 3 → 4 → 2
```

Final visited set:

```python
{0, 1, 2, 3, 4}
```

### 3.2 Understanding the Recursion Call Stack

During traversal, recursive calls are pushed onto the call stack.

Conceptually:

```text
dfs(0)
  |
  └── dfs(1)
        |
        └── dfs(3)
              |
              └── Return
        |
        └── dfs(4)
              |
              └── Return
  |
  └── dfs(2)
        |
        └── Return
```

This is why DFS goes deep before exploring the next neighbor.

### 3.4 Complexity Analysis

Let:
- V = Number of vertices.
- E = Number of edges.

**Time Complexity: O(V + E)**

Why?
- Every vertex is visited at most once.
- Every adjacency-list entry is examined once.

For an undirected graph, each edge appears in two adjacency lists, but this is still O(V + E).

**Space Complexity: O(V)**

- Visited set: O(V).
- Recursion call stack: O(V) in the worst case.

Note: Recursive DFS can hit Python's recursion-depth limit on very deep graphs. For large graphs, iterative DFS is often safer.

---

## 4. Iterative DFS

### 4.1 What is Iterative DFS?

Iterative DFS implements Depth First Search using an explicit stack instead of recursion.

A stack follows:

**LIFO = Last In, First Out**

The last element inserted is the first element removed.

#### Example

Consider the same graph:

```text
       0
      / \
     1   2
    / \
   3   4
```

Adjacency List:

```python
graph = {
    0: [1, 2],
    1: [0, 3, 4],
    2: [0],
    3: [1],
    4: [1]
}
```

#### Python Implementation

```python
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]

    while stack:

        node = stack.pop()

        if node in visited:
            continue

        visited.add(node)
        print(node, end=" ")

        # Add neighbors to stack
        for neighbor in reversed(graph[node]):

            if neighbor not in visited:
                stack.append(neighbor)


graph = {
    0: [1, 2],
    1: [0, 3, 4],
    2: [0],
    3: [1],
    4: [1]
}

dfs_iterative(graph, 0)
```

Output:

```text
0 1 3 4 2
```

We use `reversed()` here so that the iterative version follows the same neighbor-processing order as the recursive version for this example.

#### Dry Run

Initial state:

```python
stack = [0]
visited = set()
```

**Step 1**

Pop 0.

```text
stack = []
visited = {0}
```

Push neighbors in reverse order: 2, then 1.

```text
stack = [2, 1]
```

**Step 2**

Pop 1.

```text
stack = [2]
visited = {0, 1}
```

Neighbors of 1 are [0, 3, 4].

- 0 is visited.
- Push 4.
- Push 3.

```text
stack = [2, 4, 3]
```

**Step 3**

Pop 3.

```text
stack = [2, 4]
visited = {0, 1, 3}
```

Its neighbor 1 is already visited.

**Step 4**

Pop 4.

```text
stack = [2]
visited = {0, 1, 3, 4}
```

Its neighbor 1 is already visited.

**Step 5**

Pop 2.

```text
stack = []
visited = {0, 1, 2, 3, 4}
```

Its neighbor 0 is already visited.

Traversal completes.

#### Final Traversal

```text
0 → 1 → 3 → 4 → 2
```

### 4.2 Complexity Analysis

**Time Complexity: O(V + E)**

Every vertex is processed at most once, and its adjacency list is examined when processed.

**Space Complexity: O(V)**

- Visited set: O(V).
- Explicit stack: O(V) in the worst case.

### 4.3 Recursive DFS vs Iterative DFS

| Feature | Recursive DFS | Iterative DFS |
|---|---|---|
| Data structure | Call stack | Explicit stack |
| Implementation | Recursive function | While loop |
| Backtracking | Automatic | Managed using stack |
| Readability | Usually simpler | More control |
| Stack overflow | Possible due to recursion limit | Avoids recursion limit |
| Time | O(V + E) | O(V + E) |
| Space | O(V) | O(V) |

**Important:** Both approaches implement DFS. Their exact traversal orders may differ depending on neighbor insertion and processing order.

---

## 5. BFS (Breadth First Search)

### 5.1 What is BFS?

**Breadth First Search (BFS)** is a graph traversal algorithm that explores vertices level by level.

In simple words:

Visit all nearby vertices first, then move to the next level.

Unlike DFS, which explores deeply, BFS explores horizontally.

BFS uses a **Queue**.

A queue follows:

**FIFO = First In, First Out**

The first element inserted is the first element removed.

#### Example Graph

```text
         0
       /   \
      1     2
     / \     \
    3   4     5
```

Starting from vertex 0:

Level 0: 0

Level 1: 1, 2

Level 2: 3, 4, 5

BFS traversal:

```text
0 → 1 → 2 → 3 → 4 → 5
```

### 5.2 How BFS Works

1. Create an empty visited set.
2. Create a queue.
3. Insert the starting vertex into the queue.
4. Mark it as visited.
5. Remove the front vertex from the queue.
6. Visit all its unvisited neighbors.
7. Mark those neighbors visited and add them to the queue.
8. Repeat until the queue becomes empty.

### 5.3 Python Implementation

Use `deque` from Python's `collections` module for an efficient queue.

```python
from collections import deque


def bfs(graph, start):

    visited = set()

    queue = deque([start])

    visited.add(start)

    while queue:

        node = queue.popleft()

        print(node, end=" ")

        for neighbor in graph[node]:

            if neighbor not in visited:

                visited.add(neighbor)

                queue.append(neighbor)


graph = {
    0: [1, 2],
    1: [0, 3, 4],
    2: [0, 5],
    3: [1],
    4: [1],
    5: [2]
}

bfs(graph, 0)
```

Output:

```text
0 1 2 3 4 5
```

### 5.4 Dry Run

Starting vertex = 0

Initial state:

```python
queue = deque([0])
visited = {0}
```

**Step 1: Process 0**

Remove 0 from the queue.

Neighbors = [1, 2].

Both are unvisited.

Add them to the queue and mark them visited.

```text
queue = [1, 2]
visited = {0, 1, 2}
```

Print 0.

**Step 2: Process 1**

Remove 1.

Neighbors = [0, 3, 4].

- 0 is already visited.
- 3 is unvisited.
- 4 is unvisited.

Add 3 and 4.

```text
queue = [2, 3, 4]
visited = {0, 1, 2, 3, 4}
```

Print 1.

**Step 3: Process 2**

Remove 2.

Neighbors = [0, 5].

- 0 is visited.
- 5 is unvisited.

Add 5.

```text
queue = [3, 4, 5]
visited = {0, 1, 2, 3, 4, 5}
```

Print 2.

**Step 4: Process 3**

Remove 3.

Its neighbor 1 is already visited.

```text
queue = [4, 5]
```

Print 3.

**Step 5: Process 4**

Remove 4.

Its neighbor 1 is already visited.

```text
queue = [5]
```

Print 4.

**Step 6: Process 5**

Remove 5.

Its neighbor 2 is already visited.

```text
queue = []
```

Print 5.

Traversal completes.

### Final Traversal

```text
0 → 1 → 2 → 3 → 4 → 5
```

### 5.5 BFS Complexity Analysis

**Time Complexity: O(V + E)**

- Every vertex is added to the queue at most once.
- Every adjacency-list entry is examined once.

**Space Complexity: O(V)**

- Visited set: O(V).
- Queue: O(V) in the worst case.

### 5.6 Important BFS Property

BFS finds the shortest path in terms of the **number of edges** from a starting vertex to all reachable vertices in an unweighted graph.

Example:

```text
0 ---- 1 ---- 3
 \          /
  \        /
    2 ----
```

Possible paths from 0 to 3:

- 0 → 1 → 3 (2 edges)
- 0 → 2 → 3 (2 edges)

BFS finds a path with the minimum number of edges.

If the graph is weighted, ordinary BFS does not necessarily find the minimum-weight path. Algorithms such as Dijkstra's are used for non-negative weighted edges.

---

## 6. DFS vs BFS

Both DFS and BFS are graph traversal algorithms, but they explore graphs differently.

| Feature | DFS | BFS |
|---|---|---|
| Full form | Depth First Search | Breadth First Search |
| Exploration | Deep first | Level by level |
| Data structure | Stack | Queue |
| Implementation | Recursion or stack | Queue |
| Shortest path | Not guaranteed | Yes, for unweighted graphs |
| Time complexity | O(V + E) | O(V + E) |
| Space complexity | O(V) | O(V) |
| Common applications | Cycle detection, components | Shortest paths, level traversal |

### Visual Comparison

DFS:

```text
Explore one path deeply
        |
        v
    Backtrack
        |
        v
 Explore next path
```

BFS:

```text
Level 0
   |
   v
Level 1
   |
   v
Level 2
   |
   v
Level 3
```

### When should you use DFS?

Use DFS when:
- You need to explore all possible paths or branches.
- You need to identify connected components.
- You need to detect cycles.
- You need to perform backtracking.

### When should you use BFS?

Use BFS when:
- You need the shortest path in an unweighted graph.
- You need level-by-level traversal.
- You need to find the minimum number of steps.
- You need multi-source exploration.

---

## 7. Connected Components

### 7.1 What is a Connected Component?

A **Connected Component** is a maximal group of vertices in an undirected graph where every vertex is reachable from every other vertex in that group.

In simple words:

A connected component is a group of connected vertices that are isolated from other groups.

#### Example

Consider this graph:

```text
    0 ----- 1
    |       |
    2 ----- 3


    4 ----- 5


    6
```

There are three connected components:

Component 1:

```text
0, 1, 2, 3
```

Component 2:

```text
4, 5
```

Component 3:

```text
6
```

Therefore:

```text
Number of connected components = 3
```

Notice that a single isolated vertex is also a connected component.

### 7.2 Why Do We Need Connected Components?

Suppose we have:
- A social network with multiple disconnected friend groups.
- A computer network with separate networks.
- A collection of cities connected by roads.

We may need to determine how many independent groups exist.

Connected component algorithms help solve these problems.

### 7.3 Finding Connected Components Using DFS

#### Approach

1. Create an empty visited set.
2. Initialize component count to 0.
3. Iterate through every vertex.
4. If a vertex is not visited:
   - Increment the component count.
   - Start DFS from that vertex.
   - DFS visits every vertex belonging to that component.
5. Continue until all vertices have been checked.
6. Return the component count.

#### Python Implementation

```python
def dfs(graph, node, visited):

    visited.add(node)

    for neighbor in graph[node]:

        if neighbor not in visited:

            dfs(graph, neighbor, visited)


def count_components(graph):

    visited = set()

    components = 0

    for node in graph:

        if node not in visited:

            components += 1

            dfs(graph, node, visited)

    return components


graph = {
    0: [1, 2],
    1: [0, 3],
    2: [0, 3],
    3: [1, 2],
    4: [5],
    5: [4],
    6: []
}

print(count_components(graph))
```

Output:

```text
3
```

### 7.4 Dry Run

Graph:

```text
    0 ----- 1
    |       |
    2 ----- 3


    4 ----- 5


    6
```

Initially:

```python
visited = set()
components = 0
```

**Step 1: Check vertex 0**

0 is not visited.

Increment component count:

```python
components = 1
```

Start DFS from 0.

DFS visits:

```text
0 → 1 → 3 → 2
```

Visited:

```python
{0, 1, 2, 3}
```

**Step 2: Check vertex 1**

Already visited.

Skip.

**Step 3: Check vertex 2**

Already visited.

Skip.

**Step 4: Check vertex 3**

Already visited.

Skip.

**Step 5: Check vertex 4**

4 is not visited.

Increment component count:

```python
components = 2
```

Start DFS from 4.

DFS visits:

```text
4 → 5
```

Visited:

```python
{0, 1, 2, 3, 4, 5}
```

**Step 6: Check vertex 5**

Already visited.

Skip.

**Step 7: Check vertex 6**

6 is not visited.

Increment component count:

```python
components = 3
```

Start DFS from 6.

Since it has no neighbors, only vertex 6 is visited.

Final visited set:

```python
{0, 1, 2, 3, 4, 5, 6}
```

Final result:

```text
Number of connected components = 3
```

### 7.5 Complexity Analysis

**Time Complexity: O(V + E)**

Why?

- The outer loop checks every vertex: O(V).
- DFS visits each vertex at most once.
- Each adjacency-list entry is examined once.

**Space Complexity: O(V)**

- Visited set: O(V).
- Recursive DFS stack: O(V) worst case.

### 7.6 Connected Components Using BFS

We can also find connected components using BFS.

The only difference is that we use a queue instead of recursive DFS.

#### Python Implementation

```python
from collections import deque


def bfs(graph, start, visited):

    queue = deque([start])

    visited.add(start)

    while queue:

        node = queue.popleft()

        for neighbor in graph[node]:

            if neighbor not in visited:

                visited.add(neighbor)

                queue.append(neighbor)


def count_components(graph):

    visited = set()

    components = 0

    for node in graph:

        if node not in visited:

            components += 1

            bfs(graph, node, visited)

    return components


graph = {
    0: [1, 2],
    1: [0, 3],
    2: [0, 3],
    3: [1, 2],
    4: [5],
    5: [4],
    6: []
}

print(count_components(graph))
```

Output:

```text
3
```

### DFS vs BFS for Connected Components

Both approaches have:

- Time Complexity: O(V + E)
- Space Complexity: O(V)

Both correctly identify connected components in an undirected graph.
