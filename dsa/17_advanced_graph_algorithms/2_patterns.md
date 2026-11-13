# 17.2 Graph Problem-Solving Patterns

# 1. Dependency Ordering

## 1.1 Understanding the Pattern

Dependency ordering problems involve tasks, events, courses, or operations that must be completed in a particular order.

Some tasks cannot begin until other tasks are completed.

For example:

```text
Learn Programming
       |
       v
Data Structures
       |
       v
Algorithms
       |
       v
Competitive Programming
```

We cannot learn Data Structures effectively without basic programming knowledge.

Similarly, we should understand Data Structures before moving to advanced Algorithms.

This is a dependency relationship.

We can represent these relationships using a directed graph.

```text
Programming → Data Structures
Data Structures → Algorithms
Algorithms → Competitive Programming
```

Each vertex represents a task.

Each directed edge represents a dependency.

If:

```text
A → B
```

It means:

**A must be completed before B.**

When these dependencies form a DAG, we can find a valid execution order using topological sorting.

## 1.2 How to Recognize This Pattern

Look for problem statements containing phrases such as:

- Complete task A before task B.
- Course A is a prerequisite for course B.
- Find a valid execution order.
- Determine the order of operations.
- Build dependencies.
- Schedule tasks with prerequisites.
- Find whether all tasks can be completed.

These are strong indicators of dependency ordering.

## 1.3 General Problem-Solving Approach

Whenever you encounter a dependency ordering problem:

**Step 1: Identify the entities**

Determine what represents a vertex.

Examples:

- Courses.
- Tasks.
- Software modules.
- Events.
- Operations.

**Step 2: Identify dependencies**

Determine which task must happen before another.

If A must happen before B, create:

```python
graph[A].append(B)
```

**Step 3: Build the directed graph**

Use an adjacency list.

**Step 4: Check whether a valid ordering exists**

A valid topological ordering exists only if the directed graph is acyclic.

**Step 5: Apply topological sorting**

Use either:

- Kahn's algorithm.
- DFS-based topological sorting.

**Step 6: Validate the result**

If the number of processed vertices is smaller than the total number of vertices, a cycle exists.

No valid dependency ordering is possible.

---

## 1.4 Example 1: Course Schedule

### Problem

There are `n` courses numbered from `0` to `n - 1`.

You are given prerequisites where:

```text
[a, b]
```

means course `b` must be completed before course `a`.

Determine whether it is possible to complete all courses.

### Example

```python
n = 4

prerequisites = [
    [1, 0],
    [2, 1],
    [3, 2]
]
```

Dependencies:

```text
0 → 1 → 2 → 3
```

A valid ordering is:

```text
0, 1, 2, 3
```

Therefore, all courses can be completed.

### Dry Run

Initially:

```text
In-degree = [0, 1, 1, 1]
Queue = [0]
```

Process course 0:

```text
Result = [0]
In-degree = [0, 0, 1, 1]
Queue = [1]
```

Process course 1:

```text
Result = [0, 1]
In-degree = [0, 0, 0, 1]
Queue = [2]
```

Process course 2:

```text
Result = [0, 1, 2]
In-degree = [0, 0, 0, 0]
Queue = [3]
```

Process course 3:

```text
Result = [0, 1, 2, 3]
```

All four courses are processed.

Therefore, the answer is `True`.

### Python Implementation

```python
from collections import deque

def can_finish(num_courses, prerequisites):

    graph = [[] for _ in range(num_courses)]
    indegree = [0] * num_courses

    # Build dependency graph
    for course, prerequisite in prerequisites:
        graph[prerequisite].append(course)
        indegree[course] += 1

    queue = deque()

    # Find courses without prerequisites
    for course in range(num_courses):
        if indegree[course] == 0:
            queue.append(course)

    completed = 0

    while queue:

        u = queue.popleft()
        completed += 1

        for v in graph[u]:

            indegree[v] -= 1

            if indegree[v] == 0:
                queue.append(v)

    return completed == num_courses


n = 4

prerequisites = [
    [1, 0],
    [2, 1],
    [3, 2]
]

print(can_finish(n, prerequisites))
```

Output:

```text
True
```

### Complexity Analysis

Let V be the number of courses and E be the number of prerequisites.

- Time Complexity: O(V + E)
- Space Complexity: O(V + E)

---

## 1.5 Example 2: Find a Valid Course Ordering

### Problem

Given the number of courses and their prerequisites, return a valid ordering in which all courses can be completed.

If no valid ordering exists, return an empty list.

### Example

```python
n = 4

prerequisites = [
    [1, 0],
    [2, 0],
    [3, 1],
    [3, 2]
]
```

Graph:

```text
       0
      / \
     v   v
     1   2
      \ /
       v
       3
```

Possible orderings:

```text
0, 1, 2, 3
```

or:

```text
0, 2, 1, 3
```

### Dry Run

Initial in-degrees:

```text
[0, 1, 1, 2]
```

Initially:

```text
Queue = [0]
```

Process 0:

```text
Result = [0]
In-degree = [0, 0, 0, 2]
Queue = [1, 2]
```

Process 1:

```text
Result = [0, 1]
In-degree = [0, 0, 0, 1]
```

Process 2:

```text
Result = [0, 1, 2]
In-degree = [0, 0, 0, 0]
Queue = [3]
```

Process 3:

```text
Result = [0, 1, 2, 3]
```

### Python Implementation

```python
from collections import deque

def find_course_order(n, prerequisites):

    graph = [[] for _ in range(n)]
    indegree = [0] * n

    for course, prerequisite in prerequisites:
        graph[prerequisite].append(course)
        indegree[course] += 1

    queue = deque(
        i for i in range(n)
        if indegree[i] == 0
    )

    order = []

    while queue:

        u = queue.popleft()
        order.append(u)

        for v in graph[u]:

            indegree[v] -= 1

            if indegree[v] == 0:
                queue.append(v)

    if len(order) != n:
        return []

    return order


print(find_course_order(
    4,
    [[1, 0], [2, 0], [3, 1], [3, 2]]
))
```

One possible output:

```text
[0, 1, 2, 3]
```

---

## 1.6 Example 3: Parallel Task Scheduling

### Problem

Given tasks and their dependencies, determine the minimum number of execution rounds needed if:

- Every task takes exactly one unit of time.
- Independent tasks can execute simultaneously.
- A task can start only after all its prerequisites are completed.

### Example

Dependencies:

```text
A → C
B → C
C → D
C → E
```

Graph:

```text
A       B
 \     /
  \   /
    C
   / \
  D   E
```

Execution rounds:

```text
Round 1: A, B
Round 2: C
Round 3: D, E
```

Minimum execution time:

```text
3 rounds
```

This is a level-based topological traversal.

### Dry Run

Initial queue:

```text
[A, B]
```

Round 1:

Process A and B.

Both dependencies of C are completed.

```text
Next queue = [C]
```

Round 2:

Process C.

Both D and E become available.

```text
Next queue = [D, E]
```

Round 3:

Process D and E.

All tasks are completed.

### Python Implementation

```python
from collections import deque

def minimum_execution_rounds(n, edges):

    graph = [[] for _ in range(n)]
    indegree = [0] * n

    for u, v in edges:
        graph[u].append(v)
        indegree[v] += 1

    queue = deque(
        i for i in range(n)
        if indegree[i] == 0
    )

    completed = 0
    rounds = 0

    while queue:

        size = len(queue)
        rounds += 1

        # Process one complete level
        for _ in range(size):

            u = queue.popleft()
            completed += 1

            for v in graph[u]:

                indegree[v] -= 1

                if indegree[v] == 0:
                    queue.append(v)

    if completed != n:
        return -1

    return rounds


edges = [
    (0, 2),
    (1, 2),
    (2, 3),
    (2, 4)
]

print(minimum_execution_rounds(5, edges))
```

Output:

```text
3
```

### Complexity

- Time: O(V + E)
- Space: O(V + E)

### Important Insight

This level-based technique is useful when all tasks take equal time.

If tasks have different durations, simply counting topological levels is not sufficient.

We need DAG dynamic programming to calculate the critical path, which we will study next.

---

# 2. DAG + Dynamic Programming

## 2.1 Understanding the Pattern

Dynamic programming is useful when a problem contains:

- Overlapping subproblems.
- Reusable intermediate results.
- Dependencies between smaller and larger states.

A DAG naturally represents these dependencies.

Each vertex represents a state.

Each directed edge represents a transition from one state to another.

For example:

```text
A → B → D
 \      /
  → C →
```

We can calculate a result for A, then use it to calculate B and C, and finally calculate D.

Because the graph contains no directed cycles, we can process the vertices in topological order.

This gives us a powerful combination:

**Topological Sorting + Dynamic Programming = DAG DP**

## 2.2 General DAG DP Approach

Whenever you encounter a DAG DP problem:

1. Identify what each vertex represents.
2. Identify transitions between states.
3. Determine the DP meaning.
4. Build the directed graph.
5. Find a topological ordering.
6. Initialize DP values.
7. Process vertices in topological order.
8. Relax or update the DP values using outgoing edges.

A general recurrence may look like:

$$
dp[v] = \max(dp[v], dp[u] + w(u,v))
$$

Or:

$$
dp[v] = \min(dp[v], dp[u] + w(u,v))
$$

The exact recurrence depends on the problem.

---

## 2.3 Pattern 1: Shortest Path in a DAG

### Problem

Given a weighted DAG and a source vertex, find the shortest distance from the source to every other vertex.

Unlike Dijkstra, this approach can handle negative edge weights because the graph is acyclic.

### Example

Consider:

```text
0 --2--> 1
0 --4--> 2
1 --(-1)--> 2
1 --3--> 3
2 --2--> 3
```

Edges:

```python
edges = [
    (0, 1, 2),
    (0, 2, 4),
    (1, 2, -1),
    (1, 3, 3),
    (2, 3, 2)
]
```

Find shortest distances from vertex 0.

### Step 1: Topological Ordering

One valid ordering is:

```text
[0, 1, 2, 3]
```

### Step 2: Initialize DP

```text
dist = [0, ∞, ∞, ∞]
```

### Step 3: Process Vertices

Process vertex 0:

```text
0 → 1 (2)
0 → 2 (4)
```

Update:

```text
dist = [0, 2, 4, ∞]
```

Process vertex 1:

```text
1 → 2 (-1)
1 → 3 (3)
```

Update:

```text
dist[2] = min(4, 2 - 1) = 1
dist[3] = min(∞, 2 + 3) = 5
```

Now:

```text
dist = [0, 2, 1, 5]
```

Process vertex 2:

```text
2 → 3 (2)
```

Update:

```text
dist[3] = min(5, 1 + 2) = 3
```

Final distances:

```text
[0, 2, 1, 3]
```

### Python Implementation

```python
from collections import deque

def dag_shortest_path(n, edges, source):

    graph = [[] for _ in range(n)]
    indegree = [0] * n

    for u, v, weight in edges:
        graph[u].append((v, weight))
        indegree[v] += 1

    # Topological sorting using Kahn's algorithm
    queue = deque(
        i for i in range(n)
        if indegree[i] == 0
    )

    topo = []

    while queue:

        u = queue.popleft()
        topo.append(u)

        for v, weight in graph[u]:

            indegree[v] -= 1

            if indegree[v] == 0:
                queue.append(v)

    if len(topo) != n:
        raise ValueError("Graph is not a DAG")

    # Shortest path DP
    dist = [float("inf")] * n
    dist[source] = 0

    for u in topo:

        if dist[u] == float("inf"):
            continue

        for v, weight in graph[u]:

            dist[v] = min(
                dist[v],
                dist[u] + weight
            )

    return dist


edges = [
    (0, 1, 2),
    (0, 2, 4),
    (1, 2, -1),
    (1, 3, 3),
    (2, 3, 2)
]

print(dag_shortest_path(4, edges, 0))
```

Output:

```text
[0, 2, 1, 3]
```

### Complexity

- Time: O(V + E)
- Space: O(V + E)

### Important Insight

Dijkstra needs non-negative weights.

Bellman-Ford supports negative weights.

But if the graph is a DAG, topological ordering gives us an even more efficient shortest path solution:

```text
O(V + E)
```

---

## 2.4 Pattern 2: Longest Path in a DAG

### Problem

Given a weighted DAG, find the maximum-weight path from a source vertex to all other vertices.

This is a classic DAG DP problem.

For general directed graphs, finding a longest simple path is computationally difficult.

However, in a DAG, we can solve it efficiently using topological ordering.

### Recurrence

$$
dp[v] = \max(dp[v], dp[u] + w(u,v))
$$

### Example

Consider:

```text
0 --3--> 1
0 --2--> 2
1 --4--> 3
2 --5--> 3
```

Find the longest path from vertex 0.

Possible paths:

```text
0 → 1 → 3 = 3 + 4 = 7

0 → 2 → 3 = 2 + 5 = 7
```

Longest path weight:

```text
7
```

### Dry Run

Topological ordering:

```text
[0, 1, 2, 3]
```

Initialize:

```text
dp = [0, -∞, -∞, -∞]
```

Process vertex 0:

```text
dp[1] = max(-∞, 0 + 3) = 3
dp[2] = max(-∞, 0 + 2) = 2
```

Current:

```text
dp = [0, 3, 2, -∞]
```

Process vertex 1:

```text
dp[3] = max(-∞, 3 + 4) = 7
```

Process vertex 2:

```text
dp[3] = max(7, 2 + 5) = 7
```

Final:

```text
dp = [0, 3, 2, 7]
```

### Python Implementation

```python
from collections import deque

def dag_longest_path(n, edges, source):

    graph = [[] for _ in range(n)]
    indegree = [0] * n

    for u, v, weight in edges:
        graph[u].append((v, weight))
        indegree[v] += 1

    queue = deque(
        i for i in range(n)
        if indegree[i] == 0
    )

    topo = []

    while queue:

        u = queue.popleft()
        topo.append(u)

        for v, weight in graph[u]:

            indegree[v] -= 1

            if indegree[v] == 0:
                queue.append(v)

    if len(topo) != n:
        raise ValueError("Graph is not a DAG")

    dp = [float("-inf")] * n
    dp[source] = 0

    for u in topo:

        if dp[u] == float("-inf"):
            continue

        for v, weight in graph[u]:

            dp[v] = max(
                dp[v],
                dp[u] + weight
            )

    return dp


edges = [
    (0, 1, 3),
    (0, 2, 2),
    (1, 3, 4),
    (2, 3, 5)
]

print(dag_longest_path(4, edges, 0))
```

Output:

```text
[0, 3, 2, 7]
```

---

## 2.5 Pattern 3: Count the Number of Paths in a DAG

### Problem

Given a DAG and two vertices, count the number of distinct directed paths from the source to the destination.

### Example

Consider:

```text
0 → 1 → 3
 \       ^
  → 2 ───┘
```

Edges:

```python
edges = [
    (0, 1),
    (0, 2),
    (1, 3),
    (2, 3)
]
```

Paths from 0 to 3:

```text
0 → 1 → 3

0 → 2 → 3
```

Answer:

```text
2
```

### DP Definition

Let:

```text
dp[v] = number of paths from source to v
```

Initially:

```text
dp[source] = 1
```

For every edge:

```text
u → v
```

Update:

$$
dp[v] = dp[v] + dp[u]
$$

### Dry Run

Topological ordering:

```text
[0, 1, 2, 3]
```

Initialize:

```text
dp = [1, 0, 0, 0]
```

Process 0:

```text
dp[1] += dp[0] = 1
dp[2] += dp[0] = 1
```

Now:

```text
dp = [1, 1, 1, 0]
```

Process 1:

```text
dp[3] += dp[1] = 1
```

Process 2:

```text
dp[3] += dp[2] = 2
```

Final:

```text
dp = [1, 1, 1, 2]
```

Answer:

```text
2
```

### Python Implementation

```python
from collections import deque

def count_paths(n, edges, source, destination):

    graph = [[] for _ in range(n)]
    indegree = [0] * n

    for u, v in edges:
        graph[u].append(v)
        indegree[v] += 1

    queue = deque(
        i for i in range(n)
        if indegree[i] == 0
    )

    topo = []

    while queue:

        u = queue.popleft()
        topo.append(u)

        for v in graph[u]:

            indegree[v] -= 1

            if indegree[v] == 0:
                queue.append(v)

    if len(topo) != n:
        raise ValueError("Graph is not a DAG")

    dp = [0] * n
    dp[source] = 1

    for u in topo:

        for v in graph[u]:
            dp[v] += dp[u]

    return dp[destination]


edges = [
    (0, 1),
    (0, 2),
    (1, 3),
    (2, 3)
]

print(count_paths(4, edges, 0, 3))
```

Output:

```text
2
```

For problems requiring large path counts, use modulo arithmetic as specified in the problem.

---

## 2.6 Pattern 4: Critical Path / Minimum Project Completion Time

### Problem

Given tasks with different execution durations and dependencies, determine the minimum time required to complete the entire project.

Assumptions:

- Tasks can execute in parallel if their dependencies are satisfied.
- Each task has a fixed duration.
- A task starts only after all its prerequisites are complete.

The answer is determined by the longest dependency chain, also called the critical path.

### Example

Tasks:

| Task | Duration |
|---|---:|
| A | 3 |
| B | 2 |
| C | 4 |
| D | 2 |
| E | 5 |

Dependencies:

```text
A → C
B → C
C → D
C → E
```

Graph:

```text
A(3)     B(2)
  \       /
   \     /
     C(4)
     / \
    /   \
  D(2)  E(5)
```

Possible execution:

```text
Time 0-3: A
Time 0-2: B

Time 3-7: C

Time 7-9: D
Time 7-12: E
```

Minimum project completion time:

```text
12
```

### DP Definition

Let:

```text
finish[v] = earliest completion time of task v
```

For every task:

\[
finish[v] = duration[v] + \max(finish[u])
\]

where u represents all prerequisites of v.

If a task has no prerequisites:

```text
finish[v] = duration[v]
```

### Python Implementation

```python
from collections import deque

def critical_path(n, durations, edges):

    graph = [[] for _ in range(n)]
    indegree = [0] * n

    for u, v in edges:
        graph[u].append(v)
        indegree[v] += 1

    queue = deque(
        i for i in range(n)
        if indegree[i] == 0
    )

    finish = durations[:]

    processed = 0

    while queue:

        u = queue.popleft()
        processed += 1

        for v in graph[u]:

            finish[v] = max(
                finish[v],
                finish[u] + durations[v]
            )

            indegree[v] -= 1

            if indegree[v] == 0:
                queue.append(v)

    if processed != n:
        return -1

    return max(finish, default=0)


durations = [3, 2, 4, 2, 5]

edges = [
    (0, 2),
    (1, 2),
    (2, 3),
    (2, 4)
]

print(critical_path(5, durations, edges))
```

Output:

```text
12
```

### Complexity

- Time: O(V + E)
- Space: O(V + E)

### DAG + DP Pattern Summary

| Problem | DP Transition | Objective |
|---|---|---|
| Shortest path | min(dp[u] + w) | Minimum |
| Longest path | max(dp[u] + w) | Maximum |
| Count paths | dp[v] += dp[u] | Sum |
| Critical path | max(finish[u] + duration[v]) | Maximum completion time |

The most important insight is that the topological order ensures every predecessor is processed before its dependent vertex.

---

# 3. Shortest Path Problem-Solving

## 3.1 Understanding the Pattern

Shortest path problems ask us to find the minimum cost required to move from one state or vertex to another.

The cost may represent:

- Number of edges.
- Distance.
- Time.
- Money.
- Number of operations.
- Penalties.
- A combination of different costs.

The challenge is recognizing what the problem considers a vertex, an edge, and an edge weight.

## 3.2 How to Recognize This Pattern

Look for statements containing:

- Find the minimum distance.
- Find the cheapest route.
- Minimum time to reach a destination.
- Minimum number of moves.
- Find the shortest route.
- Minimum cost to transform one state into another.
- Reach a destination with minimum expense.

## 3.3 Step-by-Step Decision Process

Before choosing an algorithm, answer these questions.

**Question 1: Is the graph weighted?**

If every transition has equal cost, BFS is usually sufficient.

If different transitions have different costs, consider a weighted shortest path algorithm.

**Question 2: Are all weights non-negative?**

If yes, Dijkstra is a suitable option.

If negative weights exist, consider Bellman-Ford.

**Question 3: Are weights only 0 and 1?**

Use 0-1 BFS.

**Question 4: Is the graph a DAG?**

Consider topological sorting + DP.

**Question 5: Do we need distances between every pair of vertices?**

Consider Floyd-Warshall.

## 3.4 Algorithm Selection Table

| Graph Condition | Algorithm |
|---|---|
| Unweighted graph | BFS |
| Non-negative weights | Dijkstra |
| Negative weights | Bellman-Ford |
| DAG with arbitrary weights | Topological DP |
| All-pairs shortest paths | Floyd-Warshall |
| Weights are 0 or 1 | 0-1 BFS |

## 3.5 Example: Cheapest Route with Non-Negative Costs

### Problem

There are several cities connected by flights.

Each flight has a price.

Find the minimum cost to travel from source city to destination city.

### Example

```text
0 --100--> 1
0 --500--> 2
1 --100--> 2
1 --200--> 3
2 --100--> 3
```

Find the cheapest route from 0 to 3.

Possible routes:

```text
0 → 1 → 3 = 100 + 200 = 300

0 → 2 → 3 = 500 + 100 = 600

0 → 1 → 2 → 3 = 100 + 100 + 100 = 300
```

Minimum cost:

```text
300
```

We can use Dijkstra because all edge weights are non-negative.

### Python Implementation

```python
import heapq

def cheapest_route(n, flights, source, destination):

    graph = [[] for _ in range(n)]

    for u, v, cost in flights:
        graph[u].append((v, cost))

    dist = [float("inf")] * n
    dist[source] = 0

    heap = [(0, source)]

    while heap:

        cost, u = heapq.heappop(heap)

        if cost != dist[u]:
            continue

        if u == destination:
            return cost

        for v, weight in graph[u]:

            new_cost = cost + weight

            if new_cost < dist[v]:

                dist[v] = new_cost

                heapq.heappush(
                    heap,
                    (new_cost, v)
                )

    return -1


flights = [
    (0, 1, 100),
    (0, 2, 500),
    (1, 2, 100),
    (1, 3, 200),
    (2, 3, 100)
]

print(cheapest_route(4, flights, 0, 3))
```

Output:

```text
300
```

---

## 3.6 Shortest Path with Constraints

Some shortest path problems introduce additional conditions.

For example:

- Find the cheapest flight using at most K stops.
- Reach the destination within a time limit.
- Use at most a certain number of expensive transitions.
- Reach a destination with limited resources.

In these problems, the current vertex alone may not be enough to describe the state.

We may need to include additional information.

This leads to the state graph pattern.

### Example: Cheapest Flight Within K Stops

Suppose:

```text
0 → 1 : 100
1 → 2 : 100
0 → 2 : 500
2 → 3 : 100
```

Find the cheapest cost from 0 to 3 using at most 1 stop.

A stop is an intermediate city, so at most one stop means at most two flights.

Possible routes:

```text
0 → 2 → 3 = 600
```

The route:

```text
0 → 1 → 2 → 3 = 300
```

uses two intermediate cities and is invalid.

Answer:

```text
600
```

### Key Insight

Ordinary Dijkstra stores:

```text
dist[vertex]
```

But here, the cost also depends on how many edges or stops we have used.

We need:

```text
dist[vertex][edges_used]
```

One useful implementation is a bounded Bellman-Ford approach.

### Python Implementation

```python
def cheapest_flight(n, flights, source, destination, k):

    INF = float("inf")

    dist = [INF] * n
    dist[source] = 0

    # At most k stops means at most k + 1 edges
    for _ in range(k + 1):

        next_dist = dist[:]

        for u, v, price in flights:

            if dist[u] != INF:

                next_dist[v] = min(
                    next_dist[v],
                    dist[u] + price
                )

        dist = next_dist

    if dist[destination] == INF:
        return -1

    return dist[destination]


flights = [
    (0, 1, 100),
    (1, 2, 100),
    (0, 2, 500),
    (2, 3, 100)
]

print(cheapest_flight(
    4,
    flights,
    0,
    3,
    1
))
```

Output:

```text
600
```

### Complexity

- Time: O((K + 1) × E)
- Space: O(V)

### Important Insight

When a problem introduces an additional constraint, ask:

**Does the state need more information than just the current vertex?**

This is one of the most important ideas in advanced graph problem-solving.

---

# 4. Graph + Heap

## 4.1 Understanding the Pattern

Graph + Heap is a common combination used in optimization problems.

A graph describes possible transitions.

A heap helps efficiently select the next most promising state.

For example, Dijkstra uses:

```text
Graph + Min Heap
```

The graph stores neighbors and edge weights.

The min-heap selects the vertex with the smallest known distance.

This combination is especially useful when we repeatedly need to process the smallest-cost candidate.

## 4.2 How to Recognize This Pattern

Look for problems that require:

- Minimum cost among many possible transitions.
- Repeatedly selecting the closest vertex.
- Processing states in increasing cost order.
- Finding the cheapest route.
- Optimizing paths in a weighted graph.
- Maintaining the best candidate dynamically.

## 4.3 General Graph + Heap Template

```python
import heapq

def graph_with_heap(graph, source):

    dist = [float("inf")] * len(graph)
    dist[source] = 0

    heap = [(0, source)]

    while heap:

        cost, u = heapq.heappop(heap)

        if cost > dist[u]:
            continue

        for v, weight in graph[u]:

            new_cost = cost + weight

            if new_cost < dist[v]:

                dist[v] = new_cost

                heapq.heappush(
                    heap,
                    (new_cost, v)
                )

    return dist
```

This is the standard Dijkstra pattern.

However, graph + heap can solve more than ordinary shortest path problems.

---

## 4.4 Example 1: Minimum Effort Path

### Problem

Given a grid of heights, find a path from the top-left cell to the bottom-right cell.

The effort of a path is defined as the maximum absolute height difference between two adjacent cells along that path.

Minimize the effort.

### Example

```python
heights = [
    [1, 2, 2],
    [3, 8, 2],
    [5, 3, 5]
]
```

We can move up, down, left, and right.

Consider the path:

```text
1 → 2 → 2 → 2 → 5
```

Absolute differences:

```text
1, 0, 0, 3
```

Maximum effort:

```text
3
```

The objective is to minimize the maximum edge difference, not the sum of differences.

### Key Observation

This is a shortest path variant.

The cost of extending a path is:

$$
newEffort = \max(currentEffort, edgeDifference)
$$

The relaxation becomes:

$$
dist[v] = \min(dist[v], \max(dist[u], w(u,v)))
$$

We can use Dijkstra with a modified relaxation operation.

### Dry Run

Start at cell (0, 0).

Initial effort:

```text
0
```

Move to (0, 1):

```text
Difference = |1 - 2| = 1
Effort = max(0, 1) = 1
```

Move to (0, 2):

```text
Difference = |2 - 2| = 0
Effort = max(1, 0) = 1
```

Move to (1, 2):

```text
Difference = |2 - 2| = 0
Effort = max(1, 0) = 1
```

Move to (2, 2):

```text
Difference = |2 - 5| = 3
Effort = max(1, 3) = 3
```

A path with effort 3 is found.

### Python Implementation

```python
import heapq

def minimum_effort_path(heights):

    rows = len(heights)
    cols = len(heights[0])

    dist = [
        [float("inf")] * cols
        for _ in range(rows)
    ]

    dist[0][0] = 0

    heap = [(0, 0, 0)]

    directions = [
        (0, 1),
        (0, -1),
        (1, 0),
        (-1, 0)
    ]

    while heap:

        effort, r, c = heapq.heappop(heap)

        if effort > dist[r][c]:
            continue

        if r == rows - 1 and c == cols - 1:
            return effort

        for dr, dc in directions:

            nr = r + dr
            nc = c + dc

            if 0 <= nr < rows and 0 <= nc < cols:

                difference = abs(
                    heights[r][c] - heights[nr][nc]
                )

                new_effort = max(
                    effort,
                    difference
                )

                if new_effort < dist[nr][nc]:

                    dist[nr][nc] = new_effort

                    heapq.heappush(
                        heap,
                        (new_effort, nr, nc)
                    )

    return -1


heights = [
    [1, 2, 2],
    [3, 8, 2],
    [5, 3, 5]
]

print(minimum_effort_path(heights))
```

Output:

```text
2
```

The minimum-effort path has effort 2, for example:

```text
1 → 3 → 5 → 3 → 5
```

The absolute differences are:

```text
2, 2, 2, 2
```

Therefore, the maximum difference is 2.

### Complexity

Let R and C be the grid dimensions.

- Time: O(R × C × log(R × C))
- Space: O(R × C)

---

## 4.5 Example 2: Network Delay Time

### Problem

A network contains directed edges.

Each edge represents the time required to transmit a signal from one node to another.

Given a starting node, determine how long it takes for all reachable nodes to receive the signal.

If some node cannot receive the signal, return -1.

### Example

```text
1 → 2 : 1
1 → 3 : 4
2 → 3 : 2
2 → 4 : 5
3 → 4 : 1
```

Start from node 1.

Shortest distances:

```text
1 = 0
2 = 1
3 = 3
4 = 4
```

The last node receives the signal after 4 units.

Answer:

```text
4
```

### Python Implementation

```python
import heapq

def network_delay_time(times, n, source):

    graph = [[] for _ in range(n + 1)]

    for u, v, weight in times:
        graph[u].append((v, weight))

    dist = [float("inf")] * (n + 1)
    dist[source] = 0

    heap = [(0, source)]

    while heap:

        cost, u = heapq.heappop(heap)

        if cost > dist[u]:
            continue

        for v, weight in graph[u]:

            new_cost = cost + weight

            if new_cost < dist[v]:

                dist[v] = new_cost

                heapq.heappush(
                    heap,
                    (new_cost, v)
                )

    answer = max(dist[1:])

    if answer == float("inf"):
        return -1

    return answer


times = [
    (1, 2, 1),
    (1, 3, 4),
    (2, 3, 2),
    (2, 4, 5),
    (3, 4, 1)
]

print(network_delay_time(times, 4, 1))
```

Output:

```text
4
```

### Complexity

- Time: O((V + E) log V)
- Space: O(V + E)

---

## 4.6 Important Insight: Modified Dijkstra

Not every Graph + Heap problem minimizes the sum of edge weights.

The heap can be used with other path-cost definitions.

Examples:

| Problem | Path Extension |
|---|---|
| Normal shortest path | `cost + weight` |
| Minimum effort path | `max(cost, weight)` |
| Maximum reliability path | `cost * probability` |
| Minimum bottleneck path | `max(cost, edge_weight)` |

The key requirement is that the priority ordering and relaxation logic must be mathematically appropriate for the problem.

Do not blindly apply Dijkstra to every problem involving a heap.

---

# 5. Multi-source Shortest Path

## 5.1 Understanding the Pattern

In ordinary single-source shortest path problems, we begin from one source vertex.

But some problems have multiple starting points.

For example:

- Find the nearest hospital for every location.
- Find the distance of every cell from the nearest zero.
- Find how long it takes for fire to spread from multiple locations.
- Find the nearest infected person or contaminated location.
- Calculate the minimum distance to any of several destinations.

Instead of running BFS or Dijkstra separately from every source, we can often initialize all sources together.

This is called multi-source shortest path.

### Core Idea

**Insert every source into the queue or priority queue with initial distance zero.**

Then run the appropriate traversal algorithm.

The result gives the shortest distance from each vertex to its nearest source.

## 5.2 How to Recognize This Pattern

Look for phrases such as:

- Nearest source.
- Distance from the nearest zero.
- Spread from multiple locations.
- Multiple starting points.
- Minimum distance to any source.
- Nearest facility.
- Simultaneous infection or propagation.

---

## 5.3 Example 1: Multi-source BFS

### Problem

Given a grid containing zeros and ones, calculate the distance of every cell from its nearest zero.

We can move in four directions.

Assume every cell has equal movement cost.

### Example

```python
grid = [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1]
]
```

Expected output:

```text
[
    [0, 0, 0],
    [0, 1, 0],
    [1, 2, 1]
]
```

### Why Multi-source BFS?

We have multiple starting points:

```text
0 0 0
0 1 0
1 1 1
```

Instead of starting BFS separately from each zero, we insert every zero into the queue initially.

All sources begin at distance zero.

BFS expands outward level by level.

### Dry Run

Initial sources:

```text
(0,0), (0,1), (0,2), (1,0), (1,2)
```

All are assigned distance 0.

Now process these cells.

The cell (1,1) is adjacent to multiple zero cells.

Its minimum distance becomes:

```text
1
```

The bottom-left and bottom-right cells are also at distance 1 from a zero.

The bottom-middle cell is at distance 2.

Final result:

```text
0 0 0
0 1 0
1 2 1
```

### Python Implementation

```python
from collections import deque

def distance_to_nearest_zero(grid):

    rows = len(grid)
    cols = len(grid[0])

    dist = [
        [-1] * cols
        for _ in range(rows)
    ]

    queue = deque()

    # Insert all sources
    for r in range(rows):
        for c in range(cols):

            if grid[r][c] == 0:
                dist[r][c] = 0
                queue.append((r, c))

    directions = [
        (0, 1),
        (0, -1),
        (1, 0),
        (-1, 0)
    ]

    while queue:

        r, c = queue.popleft()

        for dr, dc in directions:

            nr = r + dr
            nc = c + dc

            if 0 <= nr < rows and 0 <= nc < cols:

                if dist[nr][nc] == -1:

                    dist[nr][nc] = dist[r][c] + 1

                    queue.append((nr, nc))

    return dist


grid = [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1]
]

for row in distance_to_nearest_zero(grid):
    print(row)
```

Output:

```text
[0, 0, 0]
[0, 1, 0]
[1, 2, 1]
```

### Complexity

For a grid with R rows and C columns:

- Time: O(R × C)
- Space: O(R × C)

---

## 5.4 Example 2: Rotting Oranges

### Problem

A grid contains:

- 0: Empty cell.
- 1: Fresh orange.
- 2: Rotten orange.

Every minute, a rotten orange makes adjacent fresh oranges rotten.

Determine the minimum number of minutes required to rot all oranges.

If some fresh orange can never become rotten, return -1.

### Example

```python
grid = [
    [2, 1, 1],
    [1, 1, 0],
    [0, 1, 1]
]
```

Expected output:

```text
4
```

### Why Multi-source BFS?

There may be multiple rotten oranges initially.

All rotten oranges begin spreading simultaneously.

Therefore, we insert every rotten orange into the queue at the beginning.

Each BFS level represents one minute.

### Dry Run

Initial grid:

```text
2 1 1
1 1 0
0 1 1
```

Initial queue:

```text
[(0,0)]
```

Minute 1:

```text
2 2 1
2 1 0
0 1 1
```

Minute 2:

```text
2 2 2
2 2 0
0 1 1
```

Minute 3:

```text
2 2 2
2 2 0
0 2 1
```

Minute 4:

```text
2 2 2
2 2 0
0 2 2
```

All oranges are rotten.

Answer:

```text
4
```

### Python Implementation

```python
from collections import deque

def oranges_rotting(grid):

    rows = len(grid)
    cols = len(grid[0])

    queue = deque()
    fresh = 0

    # Find all rotten oranges
    for r in range(rows):
        for c in range(cols):

            if grid[r][c] == 2:
                queue.append((r, c))

            elif grid[r][c] == 1:
                fresh += 1

    if fresh == 0:
        return 0

    minutes = 0

    directions = [
        (0, 1),
        (0, -1),
        (1, 0),
        (-1, 0)
    ]

    while queue and fresh > 0:

        size = len(queue)
        minutes += 1

        for _ in range(size):

            r, c = queue.popleft()

            for dr, dc in directions:

                nr = r + dr
                nc = c + dc

                if 0 <= nr < rows and 0 <= nc < cols:

                    if grid[nr][nc] == 1:

                        grid[nr][nc] = 2
                        fresh -= 1

                        queue.append((nr, nc))

    if fresh > 0:
        return -1

    return minutes


grid = [
    [2, 1, 1],
    [1, 1, 0],
    [0, 1, 1]
]

print(oranges_rotting(grid))
```

Output:

```text
4
```

Note: This implementation modifies the input grid.

### Complexity

- Time: O(R × C)
- Space: O(R × C)

---

## 5.5 Example 3: Multi-source Dijkstra

Multi-source shortest path also applies to weighted graphs.

Suppose several hospitals are available, and we want the minimum travel cost from every location to its nearest hospital.

If road costs are non-negative, we can use multi-source Dijkstra.

### Core Idea

Instead of initializing one source:

```python
dist[source] = 0
heap = [(0, source)]
```

Initialize every source:

```python
for source in sources:
    dist[source] = 0
    heapq.heappush(heap, (0, source))
```

Then execute normal Dijkstra.

### Python Implementation

```python
import heapq

def multi_source_dijkstra(graph, sources):

    n = len(graph)

    dist = [float("inf")] * n
    heap = []

    # Initialize all sources
    for source in sources:

        if dist[source] != 0:
            dist[source] = 0
            heapq.heappush(heap, (0, source))

    while heap:

        cost, u = heapq.heappop(heap)

        if cost > dist[u]:
            continue

        for v, weight in graph[u]:

            new_cost = cost + weight

            if new_cost < dist[v]:

                dist[v] = new_cost

                heapq.heappush(
                    heap,
                    (new_cost, v)
                )

    return dist


graph = [
    [(1, 4), (2, 1)],
    [(3, 2)],
    [(3, 5)],
    []
]

print(multi_source_dijkstra(graph, [0, 1]))
```

Output:

```text
[0, 0, 1, 2]
```

The distance of each vertex is its minimum distance from either source 0 or source 1.

### Complexity

- Time: O((V + E) log V)
- Space: O(V + E)

### Important Insight

Multi-source shortest path is not a completely different shortest path algorithm.

It is a modification of the initialization step.

| Graph Type | Single Source | Multiple Sources |
|---|---|---|
| Unweighted | BFS | Multi-source BFS |
| Non-negative weighted | Dijkstra | Multi-source Dijkstra |
| 0-1 weighted | 0-1 BFS | Multi-source 0-1 BFS |

---

# 6. Weighted Graph Traversal (0-1 BFS Applications)

## 6.1 Understanding the Pattern

In ordinary BFS, every transition has the same cost.

In weighted graphs, transitions can have different costs.

But sometimes edge weights are restricted to:

```text
0 and 1
```

In this special case, using a regular BFS queue is not sufficient.

We need to prioritize vertices according to their current distance.

However, using a priority queue is unnecessary.

We can use a deque:

- Weight 0: Push to the front.
- Weight 1: Push to the back.

This is the foundation of 0-1 BFS.

## 6.2 How to Recognize This Pattern

Look for problems involving:

- Free and costly transitions.
- Preferred and non-preferred directions.
- Minimum number of changes.
- Minimum number of obstacles to remove.
- Minimum number of special operations.
- Edge costs restricted to 0 or 1.

A common modeling technique is:

```text
Cost = 0 if transition is free
Cost = 1 if transition requires a change
```

---

## 6.3 Example 1: Minimum Obstacles to Remove

### Problem

Given a grid:

- 0 represents an empty cell.
- 1 represents an obstacle.

You can move in four directions.

Determine the minimum number of obstacles that must be removed to reach the bottom-right cell from the top-left cell.

Assume the starting cell is not counted as an obstacle to remove.

### Example

```python
grid = [
    [0, 1, 1],
    [0, 1, 0],
    [0, 0, 0]
]
```

One possible path:

```text
(0,0)
  |
(1,0)
  |
(2,0)
  |
(2,1)
  |
(2,2)
```

Every cell on this path is empty.

Number of obstacles removed:

```text
0
```

Answer:

```text
0
```

### Modeling the Problem

Every move has a cost:

```text
Entering an empty cell = 0
Entering an obstacle = 1
```

Therefore, every edge weight is either zero or one.

We can apply 0-1 BFS.

### Python Implementation

```python
from collections import deque

def minimum_obstacles(grid):

    rows = len(grid)
    cols = len(grid[0])

    dist = [
        [float("inf")] * cols
        for _ in range(rows)
    ]

    dist[0][0] = 0

    dq = deque([(0, 0)])

    directions = [
        (0, 1),
        (0, -1),
        (1, 0),
        (-1, 0)
    ]

    while dq:

        r, c = dq.popleft()

        for dr, dc in directions:

            nr = r + dr
            nc = c + dc

            if 0 <= nr < rows and 0 <= nc < cols:

                weight = grid[nr][nc]

                new_cost = dist[r][c] + weight

                if new_cost < dist[nr][nc]:

                    dist[nr][nc] = new_cost

                    if weight == 0:
                        dq.appendleft((nr, nc))
                    else:
                        dq.append((nr, nc))

    return dist[rows - 1][cols - 1]


grid = [
    [0, 1, 1],
    [0, 1, 0],
    [0, 0, 0]
]

print(minimum_obstacles(grid))
```

Output:

```text
0
```

### Complexity

- Time: O(R × C)
- Space: O(R × C)

---

## 6.4 Example 2: Minimum Direction Changes

### Problem

You are given a grid where each cell contains a preferred direction.

The directions are represented as:

```text
1 = Right
2 = Left
3 = Down
4 = Up
```

You can move in any of the four directions.

Moving in the preferred direction of the current cell costs 0.

Moving in another direction requires changing the direction and costs 1.

Find the minimum number of direction changes required to reach the bottom-right cell.

### Example

```python
grid = [
    [1, 1, 3],
    [3, 2, 2],
    [1, 1, 1]
]
```

### Modeling

For every cell:

- Following its indicated direction costs 0.
- Moving in another direction costs 1.

Thus, the graph has only zero-weight and one-weight edges.

We can use 0-1 BFS.

### Python Implementation

```python
from collections import deque

def minimum_direction_changes(grid):

    rows = len(grid)
    cols = len(grid[0])

    directions = [
        (0, 1),    # Right
        (0, -1),   # Left
        (1, 0),    # Down
        (-1, 0)    # Up
    ]

    dist = [
        [float("inf")] * cols
        for _ in range(rows)
    ]

    dist[0][0] = 0

    dq = deque([(0, 0)])

    while dq:

        r, c = dq.popleft()

        for direction, (dr, dc) in enumerate(directions, 1):

            nr = r + dr
            nc = c + dc

            if 0 <= nr < rows and 0 <= nc < cols:

                # Following the cell's preferred direction costs 0
                if grid[r][c] == direction:
                    weight = 0
                else:
                    weight = 1

                new_cost = dist[r][c] + weight

                if new_cost < dist[nr][nc]:

                    dist[nr][nc] = new_cost

                    if weight == 0:
                        dq.appendleft((nr, nc))
                    else:
                        dq.append((nr, nc))

    return dist[rows - 1][cols - 1]


grid = [
    [1, 1, 3],
    [3, 2, 2],
    [1, 1, 1]
]

print(minimum_direction_changes(grid))
```

Output:

```text
1
```

### Important Modeling Detail

The direction cost is determined by the current cell's preferred direction, not the destination cell.

This distinction is important when converting grid problems into weighted graph problems.

---

## 6.5 Example 3: Minimum Cost to Make a Valid Path

Consider a variation where every cell points toward a preferred neighboring cell.

You can change a cell's direction at a cost of one.

The objective is to find the minimum number of cells whose directions must be changed to create a valid path from the top-left to the bottom-right.

This is another application of 0-1 BFS.

The transformation is:

```text
Follow the current arrow = 0 cost
Change the arrow = 1 cost
```

Then apply the same deque-based shortest path technique.

### Reusable 0-1 BFS Template

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
```

Each adjacency list entry is:

```python
(neighbor, weight)
```

### 0-1 BFS vs BFS vs Dijkstra

| Feature | BFS | 0-1 BFS | Dijkstra |
|---|---|---|---|
| Edge weights | Equal | 0 or 1 | Non-negative |
| Data structure | Queue | Deque | Min-heap |
| Relaxation | First visit is shortest | Distance relaxation | Distance relaxation |
| Time | O(V + E) | O(V + E) | O((V + E) log V) |
| Use case | Unweighted graphs | Binary-weighted graphs | General non-negative weighted graphs |

### Important Insight

Do not use ordinary BFS just because the problem involves a grid.

The movement cost determines the algorithm.

```text
All moves have equal cost
        |
        v
       BFS

Weights are only 0 and 1
        |
        v
      0-1 BFS

Arbitrary non-negative weights
        |
        v
      Dijkstra
```
