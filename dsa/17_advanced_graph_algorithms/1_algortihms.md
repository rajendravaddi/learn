# 17. Advanced Graph Algorithms

## 1. DAG Fundamentals

### 1.1 What is a DAG?

A **DAG (Directed Acyclic Graph)** is a directed graph that does not contain any directed cycle.

Let's break down the term:

- **Directed:** Every edge has a specific direction.
- **Acyclic:** It is impossible to start at a vertex and follow directed edges back to the same vertex.

For example, consider the following graph:

```text
A → B → D
↓   ↓
C → E
```

One possible edge representation is:

```python
graph = {
    "A": ["B", "C"],
    "B": ["D", "E"],
    "C": ["E"],
    "D": [],
    "E": []
}
```

This graph is a DAG because there is no directed path that returns to its starting vertex.

Consider another graph:

```text
A → B → C
↑       |
└───────┘
```

This graph contains a directed cycle:

```text
A → B → C → A
```

Therefore, it is not a DAG.

#### Important observation

Every DAG is a directed graph, but not every directed graph is a DAG.

A DAG must satisfy both conditions:

1. All edges have a direction.
2. There are no directed cycles.

### 1.2 Properties of DAGs

#### Property 1: Every DAG has at least one source vertex

A source vertex is a vertex with an in-degree of zero.

In other words, no other vertex has an edge pointing toward it.

Example:

```text
A → C → D
B → C
```

Here:

- A has in-degree 0.
- B has in-degree 0.
- C has in-degree 2.
- D has in-degree 1.

Therefore, A and B are source vertices.

Every non-empty DAG has at least one source vertex.

#### Property 2: Every DAG has at least one sink vertex

A sink vertex is a vertex with an out-degree of zero.

No outgoing edge exists from that vertex.

In the previous example, D is a sink vertex.

Every non-empty DAG has at least one sink vertex.

#### Property 3: Every DAG has a topological ordering

A topological ordering is a linear arrangement of vertices such that for every directed edge:

```text
u → v
```

Vertex `u` appears before vertex `v`.

For example:

```text
A → C → D
B → C
```

Valid topological orderings include:

```text
A, B, C, D
B, A, C, D
```

However, this is invalid:

```text
C, A, B, D
```

Because C appears before A and B, violating the edge directions.

#### Property 4: A DAG cannot contain a directed cycle

If a directed cycle exists, no valid topological ordering is possible.

Why?

Suppose:

```text
A → B → C → A
```

The topological ordering would require:

```text
A before B
B before C
C before A
```

These conditions cannot all be satisfied.

#### Property 5: A DAG can have multiple topological orderings

A topological ordering is not necessarily unique.

For example:

```text
A → C
B → C
```

Both are valid:

```text
A, B, C
B, A, C
```

The relative order of A and B does not matter because there is no dependency between them.

### 1.3 Applications of DAGs

DAGs are useful whenever relationships involve dependencies or prerequisites.

#### Application 1: Course scheduling

Suppose a student must complete certain courses before taking others.

```text
Programming → Data Structures → Algorithms
Programming → Databases
```

The graph represents course prerequisites.

A topological ordering gives a valid sequence for completing courses.

#### Application 2: Build systems

Suppose a software project has dependencies:

```text
Library A → Application
Library B → Application
Library C → Library B
```

A build system must compile dependencies before compiling the application.

A DAG represents these dependencies.

#### Application 3: Task scheduling

Consider a project with tasks:

```text
Design → Development → Testing → Deployment
```

Some tasks cannot start until their dependencies are completed.

A DAG helps determine a valid execution order.

#### Application 4: Data processing pipelines

In a data pipeline:

```text
Extract → Transform → Load
```

Each operation depends on the previous operation.

DAGs help orchestrate the execution of these operations.

#### Application 5: Dynamic programming

Many dynamic programming problems can be represented as DAGs.

Each state is a vertex, and transitions between states are directed edges.

Since dependencies move from one state to another without forming cycles, we can process the states in topological order.

This is especially useful for:

- Longest path in a DAG.
- Shortest path in a DAG.
- Counting paths in a DAG.
- Scheduling problems.

---

## 2. Topological Sorting

### 2.1 What is Topological Sorting?

Topological sorting is the process of arranging the vertices of a directed acyclic graph in a linear order such that every vertex appears before all its dependent vertices.

For every directed edge:

```text
u → v
```

`u` must appear before `v`.

Topological sorting is possible only for DAGs.

#### Example

Consider:

```text
A → C
B → C
C → D
```

Some valid topological orderings are:

```text
A, B, C, D
B, A, C, D
```

Topological sorting does not produce a single mandatory ordering.

It produces one valid ordering among potentially many.

### 2.2 Why do we need Topological Sorting?

Consider a project with the following dependencies:

```text
A → C
B → C
C → D
```

Here:

- Task C depends on A and B.
- Task D depends on C.

We cannot execute C before A and B.

Similarly, we cannot execute D before C.

Topological sorting helps determine a valid execution sequence.

### 2.3 Algorithms for Topological Sorting

There are two commonly used approaches:

1. Kahn's Algorithm (BFS-based).
2. DFS-based Topological Sorting.

#### 2.3.1 Kahn's Algorithm

##### Concept

Kahn's algorithm uses BFS and in-degree values to generate a topological ordering.

The central idea is:

**Always process a vertex whose in-degree is zero.**

A vertex with an in-degree of zero has no remaining prerequisites.

Once we process that vertex, we remove its outgoing edges and update the in-degree of its neighbors.

Whenever a neighbor's in-degree becomes zero, it becomes eligible for processing.

##### Algorithm

1. Calculate the in-degree of every vertex.
2. Insert all vertices with in-degree zero into a queue.
3. While the queue is not empty:
   - Remove a vertex from the queue.
   - Add it to the topological ordering.
   - Visit all its outgoing neighbors.
   - Decrease each neighbor's in-degree by one.
   - If a neighbor's in-degree becomes zero, add it to the queue.
4. After processing all possible vertices:
   - If the number of processed vertices equals the total number of vertices, the graph is a DAG.
   - Otherwise, the graph contains a directed cycle.

##### Example

Consider:

```text
A → C
B → C
C → D
B → E
```

Initial in-degrees:

| Vertex | In-degree |
|---|---:|
| A | 0 |
| B | 0 |
| C | 2 |
| D | 1 |
| E | 1 |

Initially:

```text
Queue = [A, B]
```

##### Dry Run

**Step 1: Process A**

Remove A from the queue.

```text
Result = [A]
```

A has one outgoing edge:

```text
A → C
```

Decrease C's in-degree:

```text
C: 2 → 1
```

C is not yet eligible.

```text
Queue = [B]
```

**Step 2: Process B**

Remove B.

```text
Result = [A, B]
```

B has two outgoing edges:

```text
B → C
B → E
```

Update in-degrees:

```text
C: 1 → 0
E: 1 → 0
```

Both vertices become eligible.

```text
Queue = [C, E]
```

**Step 3: Process C**

```text
Result = [A, B, C]
```

C has one outgoing edge:

```text
C → D
```

Update:

```text
D: 1 → 0
```

Queue:

```text
[E, D]
```

**Step 4: Process E**

```text
Result = [A, B, C, E]
```

E has no outgoing edges.

Queue:

```text
[D]
```

**Step 5: Process D**

```text
Result = [A, B, C, E, D]
```

The queue is empty.

Final topological ordering:

```text
A, B, C, E, D
```

##### Python Implementation

```python
from collections import deque

def topological_sort(graph):
    n = len(graph)

    indegree = [0] * n

    # Calculate in-degree
    for u in range(n):
        for v in graph[u]:
            indegree[v] += 1

    # Add all vertices with in-degree 0
    queue = deque()

    for vertex in range(n):
        if indegree[vertex] == 0:
            queue.append(vertex)

    result = []

    while queue:
        u = queue.popleft()
        result.append(u)

        for v in graph[u]:
            indegree[v] -= 1

            if indegree[v] == 0:
                queue.append(v)

    # Cycle detection
    if len(result) != n:
        return None

    return result


graph = [
    [2],       # 0 → 2
    [2, 4],     # 1 → 2, 1 → 4
    [3],       # 2 → 3
    [],        # 3
    []         # 4
]

print(topological_sort(graph))
```

Output:

```text
[0, 1, 2, 4, 3]
```

##### Complexity Analysis

Let:

- V = number of vertices.
- E = number of edges.

| Operation | Complexity |
|---|---|
| Calculate in-degree | O(V + E) |
| Initialize queue | O(V) |
| Process vertices | O(V) |
| Process edges | O(E) |

**Time Complexity: O(V + E)**

**Space Complexity: O(V)**

The adjacency list itself requires O(V + E) space and is considered input storage.

##### Important Interview Points

- Kahn's algorithm uses BFS.
- It requires in-degree calculation.
- It detects cycles in directed graphs.
- If fewer than V vertices are processed, a cycle exists.
- Multiple valid topological orderings may exist.

---

#### 2.3.2 DFS-Based Topological Sorting

##### Concept

DFS-based topological sorting uses the DFS traversal technique.

The main idea is:

**Add a vertex to the result only after all its outgoing neighbors have been completely processed.**

This means we append a vertex after returning from all recursive DFS calls.

This is called finishing-time ordering or postorder traversal.

Because dependencies must appear before their dependents, we reverse the finishing order to obtain a topological ordering.

##### Algorithm

1. Create a visited array.
2. Create an empty stack.
3. For every unvisited vertex:
   - Start DFS.
   - Mark the vertex as visited.
   - Recursively visit all unvisited neighbors.
   - After processing all neighbors, push the current vertex into the stack.
4. Reverse the stack to obtain the topological ordering.

For a complete implementation, we must also detect directed cycles.

We can do this using three states:

- 0: Unvisited.
- 1: Currently visiting (in the recursion stack).
- 2: Completely processed.

If DFS encounters a vertex with state 1, a directed cycle exists.

##### Example

Consider:

```text
0 → 2
1 → 2
2 → 3
```

##### Dry Run

Start DFS from vertex 0.

```text
DFS(0)
  DFS(2)
    DFS(3)
```

Vertex 3 has no outgoing edges.

Push 3:

```text
Stack = [3]
```

Return to 2.

All neighbors of 2 are processed.

Push 2:

```text
Stack = [3, 2]
```

Return to 0.

Push 0:

```text
Stack = [3, 2, 0]
```

Now start DFS from vertex 1.

Vertex 2 is already processed.

Push 1:

```text
Stack = [3, 2, 0, 1]
```

Reverse the stack:

```text
[1, 0, 2, 3]
```

This is a valid topological ordering.

##### Python Implementation

```python
def topological_sort_dfs(graph):
    n = len(graph)

    state = [0] * n
    stack = []

    def dfs(u):
        state[u] = 1

        for v in graph[u]:

            if state[v] == 1:
                return False

            if state[v] == 0:
                if not dfs(v):
                    return False

        state[u] = 2
        stack.append(u)

        return True

    for vertex in range(n):
        if state[vertex] == 0:
            if not dfs(vertex):
                return None

    return stack[::-1]


graph = [
    [2],
    [2],
    [3],
    []
]

print(topological_sort_dfs(graph))
```

Output:

```text
[1, 0, 2, 3]
```

##### Complexity Analysis

**Time Complexity: O(V + E)**

Every vertex is visited once, and every directed edge is explored once.

**Space Complexity: O(V)**

Additional space is required for:

- Visited states.
- Recursion stack.
- Result stack.

#### Kahn's Algorithm vs DFS-Based Topological Sorting

| Feature | Kahn's Algorithm | DFS-Based |
|---|---|---|
| Technique | BFS | DFS |
| Main concept | In-degree | Finishing time |
| Data structure | Queue | Stack / recursion |
| Cycle detection | Processed count | Recursion state |
| Complexity | O(V + E) | O(V + E) |
| Implementation | Iterative | Usually recursive |

#### When to Use Which?

Use Kahn's algorithm when:

- You need to process vertices with zero prerequisites.
- You want to count the number of processed vertices.
- You want to identify whether a graph contains a cycle.
- You are solving scheduling or dependency problems.

Use DFS-based topological sorting when:

- You are already using DFS.
- You need finishing-time ordering.
- You want a recursive implementation.

---

## 3. Shortest Path Algorithms

### 3.1 What is a Shortest Path?

A shortest path is a path between two vertices whose total edge weight is minimum.

In an unweighted graph, every edge has equal cost.

Therefore, BFS can find the shortest path in terms of the number of edges.

However, in a weighted graph, different edges may have different costs.

Example:

```text
A --4--> B
A --1--> C
C --2--> B
```

Possible paths from A to B:

Direct path:

```text
A → B = 4
```

Alternative path:

```text
A → C → B = 1 + 2 = 3
```

Therefore, the shortest path is:

```text
A → C → B
```

with total cost 3.

We need specialized algorithms to solve shortest path problems in weighted graphs.

The main algorithms are:

1. Dijkstra's Algorithm.
2. Bellman-Ford Algorithm.
3. Floyd-Warshall Algorithm.
4. 0-1 BFS.

Before studying them, we need to understand weighted graphs and edge relaxation.

---

### 3.2 Weighted Graphs

A weighted graph is a graph in which every edge has an associated numerical value called its weight.

The weight can represent:

- Distance between locations.
- Travel time.
- Transportation cost.
- Network latency.
- Financial cost.

Example:

```text
0 --4-- 1
|       |
1       2
|       |
2 --3-- 3
```

An adjacency list representation:

```python
graph = {
    0: [(1, 4), (2, 1)],
    1: [(0, 4), (3, 2)],
    2: [(0, 1), (3, 3)],
    3: [(1, 2), (2, 3)]
}
```

Each entry contains:

```python
(neighbor, weight)
```

For example:

```python
0: [(1, 4), (2, 1)]
```

means:

- Edge from 0 to 1 has weight 4.
- Edge from 0 to 2 has weight 1.

For an undirected graph, we store both directions.

For a directed graph, we store only the specified direction.

### Important distinction

BFS is suitable for shortest paths in unweighted graphs because every edge contributes the same cost.

For weighted graphs, we generally need algorithms that account for edge weights.

---

### 3.3 Edge Relaxation

#### Concept

Edge relaxation is the fundamental operation used in many shortest path algorithms.

It means checking whether we can find a shorter path to a vertex through another vertex.

Suppose:

- `dist[u]` represents the currently known shortest distance from the source to u.
- `dist[v]` represents the currently known shortest distance from the source to v.
- `weight(u, v)` represents the weight of the edge from u to v.

We check:

```python
if dist[u] + weight < dist[v]:
    dist[v] = dist[u] + weight
```

If the new path is shorter, we update the distance.

Mathematically:

$$
dist[v] = \min(dist[v], dist[u] + w(u,v))
$$

#### Example

Consider:

```text
A --4--> B
A --1--> C
C --2--> B
```

We want shortest distances from A.

Initially:

```text
dist[A] = 0
dist[B] = ∞
dist[C] = ∞
```

Relax edge A → B:

```text
dist[B] = min(∞, 0 + 4)
        = 4
```

Relax edge A → C:

```text
dist[C] = min(∞, 0 + 1)
        = 1
```

Now relax edge C → B:

```text
dist[B] = min(4, 1 + 2)
        = 3
```

Final distances:

```text
A = 0
B = 3
C = 1
```

The shortest path from A to B is A → C → B.

#### Why is relaxation important?

Different shortest path algorithms use relaxation differently.

| Algorithm | Relaxation strategy |
|---|---|
| Dijkstra | Selects the closest unsettled vertex |
| Bellman-Ford | Repeatedly relaxes all edges |
| Floyd-Warshall | Considers intermediate vertices |
| DAG shortest path | Relaxes edges in topological order |

Understanding relaxation makes these algorithms much easier to learn.

---

## 4. Dijkstra's Algorithm

### Concept

Dijkstra's algorithm finds the shortest distances from a single source vertex to all other vertices in a weighted graph with non-negative edge weights.

It uses a greedy approach.

The central idea is:

**Always process the unprocessed vertex with the smallest currently known distance.**

Once we select the closest vertex, its shortest distance is finalized.

We commonly implement Dijkstra using a min-heap (priority queue).

#### Important restriction

Dijkstra's algorithm does not work correctly with negative edge weights in general.

Why?

Dijkstra assumes that once a vertex is selected as the closest unprocessed vertex, no future path can make it cheaper.

Negative edges can violate this assumption.

Use Bellman-Ford when negative edge weights are possible.

### Algorithm

1. Initialize the distance of every vertex to infinity.
2. Set the source distance to zero.
3. Create a min-heap containing `(0, source)`.
4. While the heap is not empty:
   - Extract the vertex with the smallest distance.
   - If the extracted distance is greater than the current recorded distance, skip it.
   - Visit all outgoing neighbors.
   - Calculate the new distance using edge relaxation.
   - If a shorter path is found:
     - Update the neighbor's distance.
     - Push the updated distance into the heap.
5. Return the distance array.

### Example

Consider the following directed weighted graph:

```text
        4
   0 --------> 1
   |            |
  1|           1|
   ↓            ↓
   2 --------> 3
        5

   1 → 3 has weight 1
```

Edges:

```python
edges = [
    (0, 1, 4),
    (0, 2, 1),
    (2, 1, 2),
    (1, 3, 1),
    (2, 3, 5)
]
```

We want shortest distances from vertex 0.

### Dry Run

Initial distances:

```text
dist = [0, ∞, ∞, ∞]
```

Initial heap:

```text
[(0, 0)]
```

**Step 1: Process vertex 0**

Extract:

```text
(0, 0)
```

Neighbors:

```text
0 → 1 (weight 4)
0 → 2 (weight 1)
```

Relax:

```text
dist[1] = 0 + 4 = 4
dist[2] = 0 + 1 = 1
```

Heap:

```text
[(1, 2), (4, 1)]
```

**Step 2: Process vertex 2**

Extract:

```text
(1, 2)
```

Neighbors:

```text
2 → 1 (weight 2)
2 → 3 (weight 5)
```

Relax:

```text
dist[1] = min(4, 1 + 2) = 3
dist[3] = min(∞, 1 + 5) = 6
```

Heap:

```text
[(3, 1), (4, 1), (6, 3)]
```

**Step 3: Process vertex 1**

Extract:

```text
(3, 1)
```

Neighbor:

```text
1 → 3 (weight 1)
```

Relax:

```text
dist[3] = min(6, 3 + 1) = 4
```

Heap:

```text
[(4, 1), (4, 3), (6, 3)]
```

**Step 4: Process vertex 1 again**

Extract:

```text
(4, 1)
```

But:

```text
4 > dist[1]
```

Therefore, skip this outdated heap entry.

**Step 5: Process vertex 3**

Extract:

```text
(4, 3)
```

Vertex 3 has no outgoing edges.

Processing is complete.

Final distances:

```text
Vertex 0 → 0
Vertex 1 → 3
Vertex 2 → 1
Vertex 3 → 4
```

### Python Implementation

```python
import heapq

def dijkstra(graph, source):
    n = len(graph)

    dist = [float("inf")] * n
    dist[source] = 0

    min_heap = [(0, source)]

    while min_heap:
        current_dist, u = heapq.heappop(min_heap)

        # Ignore outdated heap entries
        if current_dist > dist[u]:
            continue

        for v, weight in graph[u]:

            new_dist = current_dist + weight

            if new_dist < dist[v]:
                dist[v] = new_dist

                heapq.heappush(
                    min_heap,
                    (new_dist, v)
                )

    return dist


graph = [
    [(1, 4), (2, 1)],
    [(3, 1)],
    [(1, 2), (3, 5)],
    []
]

print(dijkstra(graph, 0))
```

Output:

```text
[0, 3, 1, 4]
```

### Complexity Analysis

Using an adjacency list and binary min-heap:

**Time Complexity: O((V + E) log V)**

More commonly expressed as:

**O(E log V)** for connected or suitably dense-edge cases.

**Space Complexity: O(V + E)** including graph storage, or O(V) auxiliary space for the distance array and heap in the usual analysis.

### Applications

- GPS navigation.
- Network routing.
- Shortest travel time.
- Minimum-cost paths.
- Game pathfinding.

---

## 5. Bellman-Ford Algorithm

### Concept

Bellman-Ford is a single-source shortest path algorithm that works with both positive and negative edge weights.

Unlike Dijkstra, it does not require all edge weights to be non-negative.

It also detects negative-weight cycles that are reachable from the source.

The central idea is:

**Relax every edge repeatedly, up to V - 1 times.**

Why V - 1?

A simple shortest path in a graph with V vertices can contain at most V - 1 edges.

If a shortest path contains V or more edges, some vertex must repeat, which means the path contains a cycle.

For a graph without a reachable negative cycle, a shortest simple path can therefore be found using at most V - 1 edges.

### Algorithm

1. Initialize all distances to infinity.
2. Set the source distance to zero.
3. Repeat V - 1 times:
   - Iterate through every edge `(u, v, weight)`.
   - If `dist[u] + weight < dist[v]`, update `dist[v]`.
4. Perform one additional iteration over all edges.
5. If any distance can still be reduced, a reachable negative-weight cycle exists.
6. Otherwise, return the shortest distances.

An optimization is to stop early if an entire iteration produces no updates.

### Example

Consider:

```text
0 --4--> 1
0 --5--> 2
1 --(-2)--> 2
2 --3--> 3
```

Edges:

```python
edges = [
    (0, 1, 4),
    (0, 2, 5),
    (1, 2, -2),
    (2, 3, 3)
]
```

Find shortest distances from vertex 0.

### Dry Run

Initial distances:

```text
dist = [0, ∞, ∞, ∞]
```

There are 4 vertices.

Therefore:

```text
V - 1 = 3 iterations
```

**Iteration 1**

Relax:

```text
0 → 1 (4)
```

```text
dist[1] = 4
```

Relax:

```text
0 → 2 (5)
```

```text
dist[2] = 5
```

Relax:

```text
1 → 2 (-2)
```

```text
dist[2] = min(5, 4 - 2)
        = 2
```

Relax:

```text
2 → 3 (3)
```

```text
dist[3] = 2 + 3 = 5
```

Distances:

```text
[0, 4, 2, 5]
```

**Iteration 2**

Relaxing every edge again produces no improvement.

Distances remain:

```text
[0, 4, 2, 5]
```

**Iteration 3**

Again, no improvements.

Final distances:

```text
[0, 4, 2, 5]
```

**Negative Cycle Detection**

Perform one additional relaxation pass.

No edge can improve any distance.

Therefore, no negative-weight cycle reachable from vertex 0 exists.

### Python Implementation

```python
def bellman_ford(n, edges, source):
    dist = [float("inf")] * n
    dist[source] = 0

    # Relax all edges V - 1 times
    for _ in range(n - 1):

        updated = False

        for u, v, weight in edges:

            if dist[u] != float("inf"):

                new_dist = dist[u] + weight

                if new_dist < dist[v]:
                    dist[v] = new_dist
                    updated = True

        if not updated:
            break

    # Detect reachable negative cycle
    for u, v, weight in edges:

        if dist[u] != float("inf"):

            if dist[u] + weight < dist[v]:
                return None

    return dist


edges = [
    (0, 1, 4),
    (0, 2, 5),
    (1, 2, -2),
    (2, 3, 3)
]

print(bellman_ford(4, edges, 0))
```

Output:

```text
[0, 4, 2, 5]
```

Here, `None` indicates that a negative-weight cycle reachable from the source was detected.

#### Important Note

Bellman-Ford detects negative cycles reachable from the specified source.

A negative cycle in a disconnected component will not be detected by this single-source implementation.

### Complexity Analysis

**Time Complexity: O(V × E)**

We perform at most V - 1 full edge-relaxation passes and one additional cycle-detection pass.

**Space Complexity: O(V)** auxiliary space, excluding the input edge list.

### Dijkstra vs Bellman-Ford

| Feature | Dijkstra | Bellman-Ford |
|---|---|---|
| Negative weights | Not supported in general | Supported |
| Negative cycle detection | No | Yes |
| Approach | Greedy | Repeated relaxation |
| Data structure | Min-heap | Edge list |
| Time | O((V + E) log V) | O(V × E) |
| Shortest path | Single source | Single source |

### When to Use Bellman-Ford?

Use Bellman-Ford when:

- Negative edge weights exist.
- You need negative-cycle detection.
- The graph is relatively small.
- Dijkstra's non-negative-weight restriction is not satisfied.

---

## 6. Floyd-Warshall Algorithm

### Concept

Floyd-Warshall is an all-pairs shortest path algorithm.

It calculates the shortest distance between every pair of vertices.

Unlike Dijkstra and Bellman-Ford, which start from one source, Floyd-Warshall considers all vertices as potential sources and destinations.

It uses dynamic programming.

The central idea is:

**Check whether allowing a vertex as an intermediate point produces a shorter path between two vertices.**

For every pair of vertices `(i, j)`, consider whether going through an intermediate vertex `k` is better than the current known path.

The recurrence relation is:

$$
dist[i][j] = \min(dist[i][j], dist[i][k] + dist[k][j])
$$

### Algorithm

1. Create a distance matrix.
2. Set:
   - Distance from a vertex to itself to 0.
   - Distance of a direct edge to its weight.
   - Distance of an unreachable pair to infinity.
3. Consider each vertex `k` as an intermediate vertex.
4. For every pair `(i, j)`:
   - Check whether the path `i → k → j` is shorter.
   - Update the distance if necessary.
5. After all iterations, the matrix contains shortest distances between all pairs.

### Example

Consider:

```text
0 --3--> 1
0 --10-> 2
1 --2--> 2
2 --1--> 0
```

Initial distance matrix:

```text
      0    1    2

0     0    3   10
1     ∞    0    2
2     1    ∞    0
```

We will find the shortest distances between every pair.

### Dry Run

#### Initial Matrix

```text
      0    1    2

0     0    3   10
1     ∞    0    2
2     1    ∞    0
```

#### Intermediate Vertex k = 0

Check whether going through vertex 0 improves any path.

For example:

```text
2 → 0 → 1
```

Current distance:

```text
dist[2][1] = ∞
```

New distance:

```text
dist[2][0] + dist[0][1]
= 1 + 3
= 4
```

Update:

```text
dist[2][1] = 4
```

Matrix:

```text
      0    1    2

0     0    3   10
1     ∞    0    2
2     1    4    0
```

#### Intermediate Vertex k = 1

Consider:

```text
0 → 1 → 2
```

Current distance:

```text
dist[0][2] = 10
```

New distance:

```text
3 + 2 = 5
```

Update:

```text
dist[0][2] = 5
```

Matrix:

```text
      0    1    2

0     0    3    5
1     ∞    0    2
2     1    4    0
```

#### Intermediate Vertex k = 2

Consider:

```text
1 → 2 → 0
```

Current distance:

```text
dist[1][0] = ∞
```

New distance:

```text
2 + 1 = 3
```

Update:

```text
dist[1][0] = 3
```

Final matrix:

```text
      0    1    2

0     0    3    5
1     3    0    2
2     1    4    0
```

For example:

- Shortest distance from 0 to 2 is 5.
- Shortest distance from 1 to 0 is 3.
- Shortest distance from 2 to 1 is 4.

### Python Implementation

```python
def floyd_warshall(graph):
    n = len(graph)

    dist = [row[:] for row in graph]

    for k in range(n):

        for i in range(n):

            for j in range(n):

                if (
                    dist[i][k] != float("inf")
                    and dist[k][j] != float("inf")
                ):

                    dist[i][j] = min(
                        dist[i][j],
                        dist[i][k] + dist[k][j]
                    )

    return dist


INF = float("inf")

graph = [
    [0, 3, 10],
    [INF, 0, 2],
    [1, INF, 0]
]

result = floyd_warshall(graph)

for row in result:
    print(row)
```

Output:

```text
[0, 3, 5]
[3, 0, 2]
[1, 4, 0]
```

### Negative Cycle Detection

Floyd-Warshall can also detect negative-weight cycles.

After the algorithm finishes, check the diagonal of the distance matrix.

Normally:

```text
dist[i][i] = 0
```

If any diagonal value becomes negative:

```text
dist[i][i] < 0
```

A negative-weight cycle exists.

For example:

```python
def has_negative_cycle(dist):
    return any(
        dist[i][i] < 0
        for i in range(len(dist))
    )
```

A negative cycle makes shortest paths undefined for affected vertex pairs because repeatedly traversing that cycle can reduce the path cost without bound.

### Complexity Analysis

There are three nested loops, each running V times.

**Time Complexity: O(V³)**

The distance matrix requires V × V storage.

**Space Complexity: O(V²)**

### Applications

- All-pairs shortest path calculations.
- Network routing analysis.
- Finding shortest distances between cities.
- Transitive closure variations.
- Small, dense graphs.

---

## 7. 0-1 BFS

### Concept

0-1 BFS is a shortest path algorithm designed for graphs in which every edge weight is either:

```text
0 or 1
```

It is more efficient than Dijkstra for this special type of weighted graph.

It uses a double-ended queue (deque).

The central idea is:

- If an edge has weight 0, add its neighbor to the front of the deque.
- If an edge has weight 1, add its neighbor to the back of the deque.

Why?

A zero-weight edge does not increase the current distance.

A weight-one edge increases the distance by one.

This ordering helps process vertices in non-decreasing distance order.

### Algorithm

1. Initialize all distances to infinity.
2. Set the source distance to zero.
3. Add the source to a deque.
4. While the deque is not empty:
   - Remove a vertex from the front.
   - Visit all its neighbors.
   - Calculate the new distance.
   - If the new distance is smaller:
     - Update the distance.
     - If edge weight is zero, append the neighbor to the front.
     - If edge weight is one, append the neighbor to the back.
5. Return the distance array.

### Example

Consider:

```text
0 --0--> 1
0 --1--> 2
1 --1--> 2
1 --0--> 3
2 --1--> 3
```

We need shortest distances from vertex 0.

Adjacency list:

```python
graph = [
    [(1, 0), (2, 1)],
    [(2, 1), (3, 0)],
    [(3, 1)],
    []
]
```

### Dry Run

Initial:

```text
dist = [0, ∞, ∞, ∞]
deque = [0]
```

**Step 1: Process vertex 0**

Neighbors:

```text
0 → 1 (weight 0)
0 → 2 (weight 1)
```

Update:

```text
dist[1] = 0
dist[2] = 1
```

Since the edge to 1 has weight 0, add it to the front.

Since the edge to 2 has weight 1, add it to the back.

Deque:

```text
[1, 2]
```

**Step 2: Process vertex 1**

Neighbors:

```text
1 → 2 (weight 1)
1 → 3 (weight 0)
```

For vertex 2:

```text
New distance = 0 + 1 = 1
```

Current distance is already 1.

No update.

For vertex 3:

```text
New distance = 0 + 0 = 0
```

Update:

```text
dist[3] = 0
```

Add 3 to the front.

Deque:

```text
[3, 2]
```

**Step 3: Process vertex 3**

No outgoing edges.

Deque:

```text
[2]
```

**Step 4: Process vertex 2**

Edge:

```text
2 → 3 (weight 1)
```

New distance:

```text
1 + 1 = 2
```

Current distance to 3 is 0.

No update.

Final distances:

```text
[0, 0, 1, 0]
```

### Python Implementation

```python
from collections import deque

def zero_one_bfs(graph, source):
    n = len(graph)

    dist = [float("inf")] * n
    dist[source] = 0

    dq = deque([source])

    while dq:

        u = dq.popleft()

        for v, weight in graph[u]:

            new_dist = dist[u] + weight

            if new_dist < dist[v]:

                dist[v] = new_dist

                if weight == 0:
                    dq.appendleft(v)
                else:
                    dq.append(v)

    return dist


graph = [
    [(1, 0), (2, 1)],
    [(2, 1), (3, 0)],
    [(3, 1)],
    []
]

print(zero_one_bfs(graph, 0))
```

Output:

```text
[0, 0, 1, 0]
```

#### Implementation Note

This implementation uses the standard deque ordering and distance relaxation. For production or more complex variants, a stale-entry check or explicit queued-distance entries can be used to avoid processing outdated work.

### Complexity Analysis

Each edge is relaxed a bounded number of times in the standard 0-1 BFS approach.

**Time Complexity: O(V + E)**

**Space Complexity: O(V)** auxiliary space, excluding the graph.

### 0-1 BFS vs Dijkstra

| Feature | 0-1 BFS | Dijkstra |
|---|---|---|
| Edge weights | Only 0 and 1 | Non-negative |
| Data structure | Deque | Min-heap |
| Time | O(V + E) | O((V + E) log V) |
| Approach | Deque ordering | Greedy priority queue |
| General weighted graph | No | Yes |

#### Applications

- Minimum number of expensive transitions.
- Grid problems where moving in a preferred direction costs 0 and other directions cost 1.
- Binary-weighted graphs.
- Minimum-cost state transitions.

---

## 8. Minimum Spanning Tree (MST)

### What is a Spanning Tree?

A spanning tree is a subgraph of a connected, undirected graph that:

1. Includes every vertex.
2. Is connected.
3. Contains no cycles.

For a graph containing V vertices, every spanning tree contains exactly:

$$
V - 1
$$

edges.

#### Example

Consider:

```text
A ----- B
| \     |
|  \    |
C ----- D
```

A spanning tree must connect all four vertices without creating a cycle.

One possible spanning tree:

```text
A ----- B
|
C ----- D
```

It contains:

- All four vertices.
- Three edges.
- No cycle.

There can be multiple spanning trees for the same graph.

#### Properties of Spanning Trees

##### Property 1: Exactly V - 1 edges

A spanning tree with V vertices always contains V - 1 edges.

##### Property 2: It is connected

Every pair of vertices has a path connecting them.

##### Property 3: It is acyclic

There are no cycles.

##### Property 4: Removing any edge disconnects the tree

Every edge in a tree is necessary for maintaining connectivity.

##### Property 5: Adding any extra edge creates a cycle

A tree already contains exactly one path between every pair of vertices.

Adding another edge between connected vertices creates a cycle.

### What is a Minimum Spanning Tree?

A Minimum Spanning Tree (MST) is a spanning tree of a connected, weighted, undirected graph whose total edge weight is minimum among all possible spanning trees.

The objective is:

**Connect all vertices while minimizing the total edge weight.**

#### Example

Consider:

```text
A --1-- B
|      /|
4    2  5
|  /    |
C --3-- D
```

Suppose the edges are:

| Edge | Weight |
|---|---:|
| A-B | 1 |
| A-C | 4 |
| B-C | 2 |
| B-D | 5 |
| C-D | 3 |

We need to connect all vertices using exactly three edges with minimum total weight.

One MST is:

```text
A --1-- B
        /
       2
      /
     C --3-- D
```

Selected edges:

```text
A-B = 1
B-C = 2
C-D = 3
```

Total cost:

```text
1 + 2 + 3 = 6
```

Therefore, the MST cost is 6.

### Applications of MST

- Designing computer networks.
- Connecting cities with minimum road construction cost.
- Electrical network design.
- Telecommunications infrastructure.
- Clustering algorithms.
- Pipeline and cable network optimization.

---

## 9. Kruskal's Algorithm

### Concept

Kruskal's algorithm finds a Minimum Spanning Tree using a greedy approach.

The central idea is:

**Always select the smallest-weight edge that does not create a cycle.**

We sort all edges by weight and process them in ascending order.

To efficiently detect cycles, we use a Disjoint Set Union (DSU), also known as Union-Find.

DSU is a data structure that supports:

- Find: Determine which connected component a vertex belongs to.
- Union: Merge two connected components.

#### Why do we need DSU?

Suppose we want to add edge:

```text
u -- v
```

If u and v already belong to the same component, adding this edge creates a cycle.

Otherwise, we can safely add the edge and merge their components.

### Algorithm

1. Sort all edges by increasing weight.
2. Initialize DSU with every vertex in its own component.
3. Initialize:
   - MST edge list.
   - Total MST weight.
4. Process edges in sorted order:
   - Find the components of both endpoints.
   - If both endpoints belong to different components:
     - Include the edge in the MST.
     - Merge the components.
     - Add its weight to the total.
5. Stop after selecting V - 1 edges.
6. If fewer than V - 1 edges were selected, the graph is disconnected and has no spanning tree.

### Example

Consider:

| Edge | Weight |
|---|---:|
| A-B | 1 |
| B-C | 2 |
| C-D | 3 |
| A-C | 4 |
| B-D | 5 |

Sort the edges:

```text
A-B (1)
B-C (2)
C-D (3)
A-C (4)
B-D (5)
```

### Dry Run

Initially:

```text
Components:

{A} {B} {C} {D}
```

**Step 1: Consider A-B (weight 1)**

A and B belong to different components.

Select the edge.

```text
MST = [A-B]
Cost = 1
```

Components:

```text
{A, B} {C} {D}
```

**Step 2: Consider B-C (weight 2)**

B and C belong to different components.

Select the edge.

```text
MST = [A-B, B-C]
Cost = 3
```

Components:

```text
{A, B, C} {D}
```

**Step 3: Consider C-D (weight 3)**

C and D belong to different components.

Select the edge.

```text
MST = [A-B, B-C, C-D]
Cost = 6
```

Components:

```text
{A, B, C, D}
```

We have selected:

```text
V - 1 = 3 edges
```

Stop.

Final MST cost:

```text
6
```

### DSU Implementation

Before implementing Kruskal, let's understand DSU.

#### Find Operation

The find operation returns the representative (root) of a vertex's component.

We use path compression to make future find operations faster.

```python
def find(parent, x):
    if parent[x] != x:
        parent[x] = find(parent, parent[x])

    return parent[x]
```

#### Union Operation

Union merges two different components.

We use union by rank to keep the resulting trees shallow.

```python
def union(parent, rank, x, y):
    root_x = find(parent, x)
    root_y = find(parent, y)

    if root_x == root_y:
        return False

    if rank[root_x] < rank[root_y]:
        parent[root_x] = root_y

    elif rank[root_x] > rank[root_y]:
        parent[root_y] = root_x

    else:
        parent[root_y] = root_x
        rank[root_x] += 1

    return True
```

### Complete Python Implementation

```python
def find(parent, x):
    if parent[x] != x:
        parent[x] = find(parent, parent[x])

    return parent[x]


def union(parent, rank, x, y):
    root_x = find(parent, x)
    root_y = find(parent, y)

    if root_x == root_y:
        return False

    if rank[root_x] < rank[root_y]:
        parent[root_x] = root_y

    elif rank[root_x] > rank[root_y]:
        parent[root_y] = root_x

    else:
        parent[root_y] = root_x
        rank[root_x] += 1

    return True


def kruskal(n, edges):
    edges.sort(key=lambda edge: edge[2])

    parent = list(range(n))
    rank = [0] * n

    mst = []
    total_weight = 0

    for u, v, weight in edges:

        if union(parent, rank, u, v):

            mst.append((u, v, weight))
            total_weight += weight

            if len(mst) == n - 1:
                break

    if len(mst) != n - 1:
        return None

    return mst, total_weight


edges = [
    (0, 1, 1),
    (1, 2, 2),
    (2, 3, 3),
    (0, 2, 4),
    (1, 3, 5)
]

print(kruskal(4, edges))
```

Output:

```text
(
    [(0, 1, 1), (1, 2, 2), (2, 3, 3)],
    6
)
```

### Complexity Analysis

Sorting all edges:

$$
O(E \log E)
$$

DSU operations are nearly constant amortized time:

$$
O(\alpha(V))
$$

where α is the inverse Ackermann function.

Overall:

**Time Complexity: O(E log E)**

**Space Complexity: O(V)** auxiliary space, excluding the input edge list and sorting storage.

### Important Interview Points

- Kruskal uses a greedy strategy.
- It sorts edges by weight.
- It uses DSU to detect cycles.
- It selects exactly V - 1 edges for a connected graph.
- It works with negative edge weights too.
- If the graph is disconnected, it can produce a minimum spanning forest, but not a spanning tree.

---

## 10. Prim's Algorithm

### Concept

Prim's algorithm finds a Minimum Spanning Tree using a greedy approach.

Unlike Kruskal, which selects the smallest edge globally, Prim grows a single tree from a starting vertex.

The central idea is:

**At every step, select the minimum-weight edge connecting the current MST to a vertex outside the MST.**

We commonly implement Prim's algorithm using a min-heap.

### Algorithm

1. Choose a starting vertex.
2. Initialize a visited array.
3. Insert the starting vertex into a min-heap.
4. While the heap is not empty:
   - Extract the minimum-weight candidate edge.
   - If its destination is already visited, skip it.
   - Otherwise:
     - Mark the destination as visited.
     - Add the edge to the MST.
     - Add its weight to the total.
   - Insert all outgoing edges leading to unvisited vertices.
5. Stop when all vertices are included.
6. If not all vertices are reached, the graph is disconnected.

### Example

Consider:

```text
A --1-- B
B --2-- C
C --3-- D
A --4-- C
B --5-- D
```

Start from vertex A.

### Dry Run

Initially:

```text
Visited = {}
MST = []
Cost = 0
Heap = [(0, A, None)]
```

**Step 1: Process A**

Extract:

```text
(0, A)
```

Mark A as visited.

Add its edges:

```text
A-B (1)
A-C (4)
```

Heap:

```text
[(1, B), (4, C)]
```

**Step 2: Process B**

Extract:

```text
(1, B)
```

B is not visited.

Add edge A-B to MST.

```text
MST = [A-B]
Cost = 1
```

Mark B as visited.

Add its edges:

```text
B-C (2)
B-D (5)
```

Heap:

```text
[(2, C), (4, C), (5, D)]
```

**Step 3: Process C**

Extract:

```text
(2, C)
```

C is not visited.

Add edge B-C.

```text
MST = [A-B, B-C]
Cost = 3
```

Mark C as visited.

Add:

```text
C-D (3)
```

Heap:

```text
[(3, D), (4, C), (5, D)]
```

**Step 4: Process D**

Extract:

```text
(3, D)
```

D is not visited.

Add edge C-D.

```text
MST = [A-B, B-C, C-D]
Cost = 6
```

All four vertices are visited.

Final MST cost:

```text
6
```

### Python Implementation

```python
import heapq

def prim(graph, start=0):
    n = len(graph)

    visited = [False] * n

    min_heap = [(0, start, -1)]

    mst = []
    total_weight = 0

    while min_heap:

        weight, u, parent = heapq.heappop(min_heap)

        if visited[u]:
            continue

        visited[u] = True

        if parent != -1:
            mst.append((parent, u, weight))
            total_weight += weight

        for v, edge_weight in graph[u]:

            if not visited[v]:

                heapq.heappush(
                    min_heap,
                    (edge_weight, v, u)
                )

    if len(mst) != n - 1:
        return None

    return mst, total_weight


graph = [
    [(1, 1), (2, 4)],
    [(0, 1), (2, 2), (3, 5)],
    [(0, 4), (1, 2), (3, 3)],
    [(1, 5), (2, 3)]
]

print(prim(graph))
```

Output:

```text
(
    [(0, 1, 1), (1, 2, 2), (2, 3, 3)],
    6
)
```

### Important Note

Prim's algorithm requires an undirected graph for the standard MST problem.

The adjacency list should contain both directions of every undirected edge.

### Complexity Analysis

Using an adjacency list and binary min-heap:

**Time Complexity: O(E log V)**

**Space Complexity: O(V + E)** including the graph, or O(V + E) in the worst case for heap and auxiliary structures.
