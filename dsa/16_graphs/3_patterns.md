
# Graph Problem-Solving Patterns

## 1. Grid as a Graph

### 1.1 What is a Grid Graph?

A grid is a two-dimensional structure containing rows and columns.

Many grid-based problems can be treated as graph problems.

The key idea is:

- Each cell represents a vertex.
- A valid movement from one cell to another represents an edge.
- DFS or BFS can be used to traverse the grid.

Consider this grid:

```text
A B C
D E F
G H I
```

Each cell is a vertex.

With four-directional movement, cell E can reach:

```text
    B
    |
D - E - F
    |
    H
```

Therefore, E has four possible neighbors.

### 1.2 Four-Directional Movement

In many grid problems, movement is allowed in four directions:

- Up
- Down
- Left
- Right

Represent these movements using direction arrays:

```python
directions = [
    (-1, 0),  # Up
    (1, 0),   # Down
    (0, -1),  # Left
    (0, 1)    # Right
]
```

For a cell `(r, c)`, its neighboring coordinates are:

```text
Up:    (r - 1, c)
Down:  (r + 1, c)
Left:  (r, c - 1)
Right: (r, c + 1)
```

Instead of writing four separate conditions, we can iterate through the direction array.

### 1.3 Eight-Directional Movement

Some problems allow diagonal movement as well.

The eight possible directions are:

```python
directions = [
    (-1, 0),   # Up
    (1, 0),    # Down
    (0, -1),   # Left
    (0, 1),    # Right
    (-1, -1),  # Top-left
    (-1, 1),   # Top-right
    (1, -1),   # Bottom-left
    (1, 1)     # Bottom-right
]
```

**Important:** Always check whether the problem allows four-directional or eight-directional movement. The connectivity of the grid changes depending on this rule.

### 1.4 Boundary Checking

Before visiting a neighboring cell, check whether it is inside the grid.

For a grid with `rows` rows and `cols` columns:

```python
0 <= nr < rows and 0 <= nc < cols
```

Where:
- `nr` is the neighboring row.
- `nc` is the neighboring column.

Example:

```text
Grid size = 3 × 3

Valid row indices: 0, 1, 2
Valid column indices: 0, 1, 2
```

The coordinate `(3, 1)` is invalid because row index 3 is outside the grid.

### 1.5 General Grid Traversal Pattern

This is the general structure for traversing a grid using DFS.

It assumes that `grid[r][c]` represents a traversable cell and that `visited` is a set of coordinate tuples.

```python
def dfs(grid, r, c, visited):
    rows = len(grid)
    cols = len(grid[0])

    if not (0 <= r < rows and 0 <= c < cols):
        return

    if grid[r][c] == 0:
        return

    if (r, c) in visited:
        return

    visited.add((r, c))

    directions = [
        (-1, 0),
        (1, 0),
        (0, -1),
        (0, 1)
    ]

    for dr, dc in directions:
        nr = r + dr
        nc = c + dc

        dfs(grid, nr, nc, visited)
```

The same neighbor-generation and validation logic can be used with BFS.

### 1.6 Grid Traversal Using BFS

```python
from collections import deque

def bfs(grid, start_r, start_c):
    rows = len(grid)
    cols = len(grid[0])

    if not (0 <= start_r < rows and 0 <= start_c < cols):
        return

    if grid[start_r][start_c] == 0:
        return

    queue = deque([(start_r, start_c)])
    visited = {(start_r, start_c)}

    directions = [
        (-1, 0),
        (1, 0),
        (0, -1),
        (0, 1)
    ]

    while queue:
        r, c = queue.popleft()

        print(r, c)

        for dr, dc in directions:
            nr = r + dr
            nc = c + dc

            if not (0 <= nr < rows and 0 <= nc < cols):
                continue

            if grid[nr][nc] == 0:
                continue

            if (nr, nc) in visited:
                continue

            visited.add((nr, nc))
            queue.append((nr, nc))
```

### 1.7 Dry Run

Consider:

```text
1 1 0
0 1 0
1 1 1
```

Start BFS at `(0, 0)`.

Assume `1` means traversable and `0` means blocked.

| Step | Current cell | Newly discovered neighbors |
|---|---|---|
| 1 | (0, 0) | (0, 1) |
| 2 | (0, 1) | (1, 1) |
| 3 | (1, 1) | (2, 1) |
| 4 | (2, 1) | (2, 0), (2, 2) |
| 5 | (2, 0) | None |
| 6 | (2, 2) | None |

Traversal order:

```text
(0,0)
(0,1)
(1,1)
(2,1)
(2,0)
(2,2)
```

All reachable cells are visited.

### 1.8 Visited Tracking in Grid Problems

There are two common approaches.

#### Approach A: Separate visited set

```python
visited = set()

visited.add((r, c))
```

Advantages:
- Original grid remains unchanged.
- Useful when the input must be preserved.
- Works with any cell values.

#### Approach B: Modify the grid

```python
grid[r][c] = 0
```

If the grid is mutable and the problem allows modification, we can mark visited cells directly.

Advantages:
- No separate visited set is required.
- Can reduce additional memory usage in some implementations.

Be careful not to overwrite information that the algorithm still needs.

---

## 2. BFS Shortest Path (Unweighted Graphs)

### 2.1 What is the Shortest Path?

A path is a sequence of vertices connected by edges.

The shortest path is the path with the minimum number of edges between a source and a destination in an unweighted graph.

Example:

```text
A --- B --- D
 \         /
  \--- C --
```

Possible paths from A to D:

```text
A → B → D     Distance = 2
A → C → D     Distance = 2
```

The shortest distance is 2 edges.

### 2.2 Why BFS Finds the Shortest Path

BFS explores vertices level by level.

Starting from a source:

```text
Level 0: Source
Level 1: Vertices one edge away
Level 2: Vertices two edges away
Level 3: Vertices three edges away
```

BFS always explores all vertices at distance d before exploring vertices at distance d + 1.

Therefore, the first time BFS discovers a vertex, it has found a shortest path to that vertex in an unweighted graph.

**Important:** This guarantee applies to unweighted graphs or graphs where every edge has equal cost. For arbitrary non-negative weighted graphs, use algorithms such as Dijkstra's algorithm instead.

### 2.3 BFS Shortest Distance

Consider this graph:

```text
0 --- 1 --- 3
|     |
2 --- 4 --- 5
```

Suppose we need the shortest distance from vertex 0 to vertex 5.

Adjacency list:

```python
graph = {
    0: [1, 2],
    1: [0, 3, 4],
    2: [0, 4],
    3: [1],
    4: [1, 2, 5],
    5: [4]
}
```

BFS explores:

```text
Distance 0: 0
Distance 1: 1, 2
Distance 2: 3, 4
Distance 3: 5
```

Shortest distance from 0 to 5 = 3.

### 2.4 BFS Shortest Distance Implementation

```python
from collections import deque

def shortestDistance(graph, source, destination):
    queue = deque([source])

    distance = {source: 0}

    while queue:
        node = queue.popleft()

        if node == destination:
            return distance[node]

        for neighbor in graph[node]:
            if neighbor not in distance:
                distance[neighbor] = distance[node] + 1
                queue.append(neighbor)

    return -1
```

Here, the `distance` dictionary also serves as the visited tracker.

When a vertex is first discovered:
- Record its distance.
- Add it to the queue.
- Never enqueue it again.

Complexity:
- Time: O(V + E)
- Space: O(V)

If the destination cannot be reached, return -1.

### 2.5 Parent Tracking and Path Reconstruction

Sometimes the problem asks for the actual shortest path, not just its distance.

For this, maintain a `parent` dictionary.

The parent of a vertex is the vertex from which it was first discovered.

Example:

```text
0 → 1 → 4 → 5
```

Possible parent information:

```python
parent = {
    0: None,
    1: 0,
    2: 0,
    3: 1,
    4: 1,
    5: 4
}
```

To reconstruct the path from 0 to 5:

```text
5 ← 4 ← 1 ← 0
```

Reverse it:

```text
0 → 1 → 4 → 5
```

### 2.6 Shortest Path with Path Reconstruction

```python
from collections import deque

def shortestPath(graph, source, destination):
    queue = deque([source])

    distance = {source: 0}
    parent = {source: None}

    while queue:
        node = queue.popleft()

        if node == destination:
            break

        for neighbor in graph[node]:
            if neighbor not in distance:
                distance[neighbor] = distance[node] + 1
                parent[neighbor] = node

                queue.append(neighbor)

    if destination not in distance:
        return []

    path = []
    current = destination

    while current is not None:
        path.append(current)
        current = parent[current]

    path.reverse()

    return path
```

### 2.7 Dry Run

Suppose:

```text
0 --- 1 --- 3
|     |
2 --- 4 --- 5
```

Source = 0, Destination = 5.

Initial state:

```text
Queue: [0]
Distance: {0: 0}
Parent: {0: None}
```

| Current node | Newly discovered | Queue after processing |
|---|---|---|
| 0 | 1, 2 | [1, 2] |
| 1 | 3, 4 | [2, 3, 4] |
| 2 | None | [3, 4] |
| 3 | None | [4] |
| 4 | 5 | [5] |
| 5 | Destination | [] |

Parent mapping:

```python
{
    0: None,
    1: 0,
    2: 0,
    3: 1,
    4: 1,
    5: 4
}
```

Reconstruction:

```text
5 ← 4 ← 1 ← 0

0 → 1 → 4 → 5
```

Shortest distance = 3.

### 2.8 BFS Levels

Another way to calculate distances is to process one complete BFS level at a time.

```python
from collections import deque

def bfsLevels(graph, source):
    queue = deque([source])
    visited = {source}

    distance = 0

    while queue:
        size = len(queue)

        for _ in range(size):
            node = queue.popleft()

            print(node, "Distance:", distance)

            for neighbor in graph[node]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)

        distance += 1
```

This technique is useful when:
- Processing nodes at the same distance.
- Finding the minimum number of moves.
- Solving level-based problems.
- Performing BFS on grids.

### 2.9 BFS vs DFS for Shortest Path

| Feature | BFS | DFS |
|---|---|---|
| Exploration | Level by level | Goes deep first |
| Shortest path in unweighted graph | Guaranteed | Not guaranteed |
| Data structure | Queue | Stack / recursion |
| Typical use | Minimum number of edges | Reachability and components |

---

## 3. Multi-source BFS

### 3.1. What is Multi-source BFS?

Normal BFS starts from one source vertex.

Multi-source BFS starts from multiple source vertices simultaneously.

Instead of inserting one source into the queue, insert all sources initially.

The algorithm then explores outward from all sources together.

The main objective is often:

**Find the minimum distance from each vertex to its nearest source.**

### 3.2 Example

Consider this grid:

```text
0 1 1 1
1 1 1 0
1 1 1 1
```

Suppose:
- `0` represents a source.
- `1` represents an empty cell.
- Movement is allowed in four directions.

There are two sources:

```text
S 1 1 1
1 1 1 S
1 1 1 1
```

We want to calculate the minimum distance of each cell from its nearest source.

Result:

```text
0 1 2 1
1 2 1 0
2 3 2 1
```

For example:
- Cell `(0, 2)` is two steps from the nearest source.
- Cell `(2, 1)` is three steps from the nearest source.

### 3.3 Why Not Run BFS Separately from Every Source?

Suppose there are K sources and V vertices.

Running BFS separately from each source can take:

```text
O(K × (V + E))
```

Multi-source BFS processes all sources together:

```text
O(V + E)
```

Each vertex is discovered at most once.

This makes it much more efficient when we need the nearest source for every vertex.

### 3.4 Multi-source BFS Algorithm

Steps:

1. Create an empty queue.
2. Insert every source into the queue.
3. Mark every source as visited.
4. Set the distance of every source to 0.
5. Run normal BFS.
6. For every unvisited neighbor:
   - Mark it visited.
   - Set its distance to the current distance + 1.
   - Add it to the queue.

### 3.5 General Implementation on a Graph

```python
from collections import deque

def multiSourceBFS(graph, sources):
    queue = deque()
    distance = {}

    for source in sources:
        if source not in distance:
            distance[source] = 0
            queue.append(source)

    while queue:
        node = queue.popleft()

        for neighbor in graph[node]:
            if neighbor not in distance:
                distance[neighbor] = distance[node] + 1
                queue.append(neighbor)

    return distance
```

The distance dictionary also acts as the visited tracker.

Vertices that are unreachable from every source are not included.

### 3.6 Multi-source BFS on a Grid

Consider a grid where:
- `0` represents a source.
- `1` represents an empty cell.
- `-1` represents an obstacle.

We calculate the nearest-source distance for every reachable non-obstacle cell.

```python
from collections import deque

def multiSourceGridBFS(grid):
    rows = len(grid)
    cols = len(grid[0])

    queue = deque()
    distance = [[-1] * cols for _ in range(rows)]

    directions = [
        (-1, 0),
        (1, 0),
        (0, -1),
        (0, 1)
    ]

    # Add all sources initially.
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 0:
                queue.append((r, c))
                distance[r][c] = 0

    while queue:
        r, c = queue.popleft()

        for dr, dc in directions:
            nr = r + dr
            nc = c + dc

            if not (0 <= nr < rows and 0 <= nc < cols):
                continue

            if grid[nr][nc] == -1:
                continue

            if distance[nr][nc] != -1:
                continue

            distance[nr][nc] = distance[r][c] + 1
            queue.append((nr, nc))

    return distance
```

### 3.7 Dry Run

Input:

```text
0 1 1
1 1 0
1 1 1
```

Initially, insert both sources:

```text
Queue:
(0,0), (1,2)

Distance:
0 -1 -1
-1 -1  0
-1 -1 -1
```

After processing distance 0:

```text
Queue contains discovered distance-1 cells.
```

After the next level:

```text
0 1 2
1 2 0
2 1 1
```

Every reachable cell receives the minimum distance from its nearest source.


### 3.8 Single-source BFS vs Multi-source BFS

| Feature | Single-source BFS | Multi-source BFS |
|---|---|---|
| Initial queue | One source | Multiple sources |
| Goal | Distance from one source | Distance from nearest source |
| Traversal | Level by level | Level by level |
| Complexity | O(V + E) | O(V + E) |
| Typical use | Shortest path from A | Nearest source for all vertices |

---

## 4. Cycle Detection

### 4.1 What is a Cycle?

A cycle is a path that starts and ends at the same vertex without repeating other vertices.

Example:

```text
A --- B
|     |
D --- C
```

There is a cycle:

```text
A → B → C → D → A
```

Cycle detection is an important graph problem.

However, the implementation is different for:
- Undirected graphs.
- Directed graphs.

This distinction is essential.

### 4.2 Cycle Detection in an Undirected Graph

In an undirected graph, an edge works in both directions.

Consider:

```text
A --- B --- C
```

When DFS moves from A to B, B can see A as an already visited neighbor.

That does not mean a cycle exists.

Why?

Because A is simply the vertex from which DFS arrived at B.

Therefore, we need to track the parent vertex.

#### Parent Tracking Rule

During DFS:
- Visit a vertex.
- Explore its neighbors.
- If a neighbor is unvisited, continue DFS.
- If a neighbor is already visited and is not the current vertex's parent, a cycle exists.

### 4.3 Undirected Graph Cycle Detection Using DFS

```python
def hasCycleUndirected(graph):
    visited = set()

    def dfs(node, parent):
        visited.add(node)

        for neighbor in graph[node]:

            if neighbor not in visited:
                if dfs(neighbor, node):
                    return True

            elif neighbor != parent:
                return True

        return False

    for node in graph:
        if node not in visited:
            if dfs(node, None):
                return True

    return False
```

Why do we loop over every vertex?

Because the graph may be disconnected. A cycle could exist in a component that is not reachable from the first vertex.

### 4.4 Dry Run: Undirected Graph Without a Cycle

```text
A --- B --- C
      |
      D
```

DFS starts at A.

1. A visits B.
2. B sees A, but A is B's parent, so ignore it.
3. B visits C.
4. C sees B, its parent, so ignore it.
5. DFS returns to B.
6. B visits D.
7. D sees B, its parent, so ignore it.

No other visited neighbor is found.

Result:

```text
No cycle
```

### 4.5 Dry Run: Undirected Graph With a Cycle

```text
A --- B
|     |
D --- C
```

DFS starts at A.

1. A visits B.
2. B visits C.
3. C visits D.
4. D sees A.
5. A is already visited.
6. A is not D's parent.

Therefore:

```text
Cycle detected
```

### 4.6 Undirected Graph Cycle Detection Using BFS

The same parent-tracking idea can be used with BFS.

```python
from collections import deque

def hasCycleUndirectedBFS(graph):
    visited = set()

    for start in graph:
        if start in visited:
            continue

        queue = deque([(start, None)])
        visited.add(start)

        while queue:
            node, parent = queue.popleft()

            for neighbor in graph[node]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, node))

                elif neighbor != parent:
                    return True

    return False
```

Complexity:
- Time: O(V + E)
- Space: O(V)

**Note:** These implementations assume a simple undirected graph without parallel edges or self-loops. If a problem allows self-loops or multiple edges between the same pair of vertices, handle those explicitly. In particular, parent-vertex tracking alone is insufficient for parallel edges.

---

### 4.7 Cycle Detection in a Directed Graph

In a directed graph, edges have directions.

Example:

```text
A → B → C
    ↑   |
    └───┘
```

A directed cycle exists if we can follow the direction of edges and return to a vertex already on the current DFS path.

The undirected parent rule does not work here.

We need to distinguish between:
- A vertex that has been visited before.
- A vertex that is currently in the active DFS path.

### 4.8 Three-State Coloring Technique

Use three states for each vertex:

| State | Meaning |
|---|---|
| 0 | Unvisited |
| 1 | Currently being explored |
| 2 | Completely explored |

These states are also called white, gray, and black.

#### Cycle Detection Rule

During DFS:

- If a neighbor has state 0, visit it.
- If a neighbor has state 1, a back edge is found, so a cycle exists.
- If a neighbor has state 2, it has already been fully explored; that edge alone does not indicate a cycle.

### 4.9 Directed Graph Cycle Detection Using DFS

```python
def hasCycleDirected(graph):
    state = {}

    def dfs(node):
        state[node] = 1

        for neighbor in graph[node]:

            if state.get(neighbor, 0) == 0:
                if dfs(neighbor):
                    return True

            elif state[neighbor] == 1:
                return True

        state[node] = 2
        return False

    for node in graph:
        if state.get(node, 0) == 0:
            if dfs(node):
                return True

    return False
```

### 4.10 Dry Run: Directed Graph With a Cycle

Consider:

```text
A → B → C
    ↑   |
    └───┘
```

Suppose the edges are:

```text
A → B
B → C
C → B
```

Execution:

1. DFS visits A. State of A = 1.
2. DFS visits B. State of B = 1.
3. DFS visits C. State of C = 1.
4. C explores B.
5. B has state 1, meaning B is still in the current DFS path.

Therefore, a cycle exists:

```text
B → C → B
```

### 4.11 Why State 2 Does Not Mean a Cycle

Consider:

```text
A → B → D
 \       ↑
  → C ───┘
```

Edges:

```text
A → B
A → C
B → D
C → D
```

There is no directed cycle.

Depending on the DFS order, D may already be fully explored when C examines its edge to D.

D has state 2.

This is not a cycle because D is not in the current DFS path.

This explains why a simple visited set is insufficient for directed cycle detection using DFS.


### 4.12 Undirected vs Directed Cycle Detection

| Feature | Undirected graph | Directed graph |
|---|---|---|
| DFS technique | Parent tracking | Three-state coloring |
| Cycle condition | Visited neighbor other than parent | Neighbor in active DFS path |
| BFS approach | Parent tracking | Kahn's algorithm |
| Common use | Network cycles | Dependency cycles |
| Complexity | O(V + E) | O(V + E) |

---

## 5. State Graph

### 5.1 What is a State Graph?

A state graph is a graph in which each vertex represents a possible state of a problem.

An edge represents a valid operation that transforms one state into another.

Unlike ordinary graph problems, the vertices may not be explicitly given.

We create the graph based on:
- The possible states.
- The operations allowed.
- The transitions between states.

This is also called an implicit graph.

### 5.2 Example: Lock Combination

Imagine a lock with four digits.

Each digit can be from 0 to 9.

Initial state:

```text
0000
```

Target state:

```text
0001
```

Allowed operations:
- Increase one digit by 1.
- Decrease one digit by 1.
- Each digit wraps around from 9 to 0 and from 0 to 9.

A state might be:

```text
1234
```

Some possible next states include:

```text
0234
2234
1134
1334
1224
1244
1233
1235
```

Each state is a vertex.

Each valid operation creates an edge.

The problem becomes a graph-search problem.

### 5.3 Why Use BFS for State Graphs?

Suppose every operation costs one move.

If the question asks for the minimum number of operations to reach a target state, BFS is the correct choice.

Why?

- Every transition has equal cost.
- BFS explores states in increasing number of operations.
- The first time we reach the target, we have found the minimum number of moves.

### 5.4 State Graph Problem-Solving Steps

Use this approach:

1. Define what a state looks like.
2. Identify the starting state.
3. Identify the target state.
4. Identify all valid transitions.
5. Decide how to represent a state in Python.
6. Use a queue for BFS if the objective is minimum operations.
7. Use a visited set to avoid processing a state repeatedly.
8. Stop when the target is reached.

### 5.5 Example: Minimum Moves to Reach a Number

Suppose:
- Start at 2.
- Target is 7.
- Allowed operations are `+1` and `-1`.
- Valid states are between 0 and 10.

We can represent each number as a vertex.

Possible transitions:

```text
2 → 1, 3
3 → 2, 4
4 → 3, 5
...
```

The shortest sequence is:

```text
2 → 3 → 4 → 5 → 6 → 7
```

Minimum operations = 5.

Python solution:

```python
from collections import deque

def minMoves(start, target):
    queue = deque([(start, 0)])
    visited = {start}

    while queue:
        state, steps = queue.popleft()

        if state == target:
            return steps

        for next_state in (state - 1, state + 1):
            if 0 <= next_state <= 10 and next_state not in visited:
                visited.add(next_state)
                queue.append((next_state, steps + 1))

    return -1
```

### 5.6 Dry Run

Start = 2, Target = 7.

| BFS level | States |
|---|---|
| 0 | 2 |
| 1 | 1, 3 |
| 2 | 0, 4 |
| 3 | 5 |
| 4 | 6 |
| 5 | 7 |

The target is reached at level 5.

Answer = 5.

Complexity:
- Let N be the number of dictionary words.
- Let L be the length of each word.
- This straightforward implementation takes O(N × L × 26 × L) time in the worst case, because it generates 26 × L candidate words for each visited word and constructs each candidate in O(L).
- Space: O(N × L) for stored words, queue, and visited states, excluding implementation-dependent string overhead.

### 5.7 State Representation

The most important design decision is how to represent a state.

Examples:

| Problem | State representation |
|---|---|
| Number transformation | Integer |
| Lock combination | String |
| Word transformation | String |
| Grid movement | `(row, column)` |
| Puzzle board | Tuple or string |
| Position with direction | `(row, column, direction)` |
| Position with remaining resources | `(row, column, remaining)` |

A state must contain enough information to determine all valid next transitions and whether the goal has been reached.

### 5.8 State Graph with Additional Dimensions

Sometimes position alone is not enough to identify a state.

Consider a grid problem where:
- You can move up, down, left, or right.
- You are allowed to break one wall.

If we store only:

```python
(row, col)
```

we may incorrectly treat two situations as the same:
- Reaching a cell without using the wall break.
- Reaching the same cell after using the wall break.

These are different states because their future possibilities differ.

We should represent the state as:

```python
(row, col, walls_remaining)
```

This is a powerful idea.

**The visited set must include every variable that affects future possible moves.**

### 5.9 When to Recognize a State Graph

Look for problem statements involving:

- Minimum operations to reach a target.
- Transform one configuration into another.
- A puzzle with valid moves.
- Lock combinations.
- Word transformations.
- Moving through a grid with special constraints.
- Limited resources or remaining moves.
- Different configurations of the same position.

**Key takeaway:** If the problem has a set of possible configurations and rules for moving between them, model each configuration as a graph state. Use BFS when all transitions have equal cost and the goal is minimum operations.
