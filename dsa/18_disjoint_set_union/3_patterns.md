
# Patterns

This is where DSU becomes particularly useful in graph problems.

## 1. Dynamic Connectivity

Dynamic connectivity means maintaining information about which vertices are connected as edges are added.

### Example

Initially:

```text
{1} {2} {3} {4}
```

Add edge `(1, 2)`:

```text
{1, 2} {3} {4}
```

Add edge `(2, 3)`:

```text
{1, 2, 3} {4}
```

Add edge `(3, 4)`:

```text
{1, 2, 3, 4}
```

We can check connectivity at any point:

```python
if find(1) == find(4):
    print("Connected")
else:
    print("Not connected")
```

### Common Problems

- Number of connected components
- Are two vertices connected?
- Number of provinces
- Network connectivity

**Important:** Standard DSU efficiently handles edge additions and connectivity queries. It does not directly support arbitrary edge deletions.

## 2. Component Merging

This pattern appears when a problem asks us to combine groups.

### Example

There are six people. Some friendships are formed:

```python
friendships = [
    (0, 1),
    (1, 2),
    (3, 4)
]
```

### Implementation

```python
n = 6

parent = list(range(n))
size = [1] * n

def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]

def union(a, b):
    ra = find(a)
    rb = find(b)

    if ra == rb:
        return

    if size[ra] < size[rb]:
        ra, rb = rb, ra

    parent[rb] = ra
    size[ra] += size[rb]

for a, b in friendships:
    union(a, b)
```

Resulting groups:

```text
{0, 1, 2}
{3, 4}
{5}
```

Number of components = 3.

## 3. Cycle Detection in Undirected Graphs

This is one of the most important graph applications of DSU.

When processing an undirected edge `(u, v)`:

- If `u` and `v` belong to different components, merge them.
- If they already belong to the same component, adding this edge creates a cycle.

### Example

Consider these edges:

```python
edges = [
    (1, 2),
    (2, 3),
    (1, 3)
]
```

### Dry Run

| Edge | Find Result | Action |
|---|---|---|
| (1, 2) | Different roots | Merge |
| (2, 3) | Different roots | Merge |
| (1, 3) | Same root | Cycle found |

### Python Implementation

```python
def has_cycle(n, edges):
    parent = list(range(n))

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(a, b):
        ra = find(a)
        rb = find(b)

        if ra == rb:
            return False

        parent[rb] = ra
        return True

    for u, v in edges:
        if not union(u, v):
            return True

    return False
```

This implementation uses path compression. You can add union by size or rank for the optimized version.

**Important:** This DSU cycle-detection technique applies to undirected graphs. Directed graph cycle detection generally requires DFS or topological sorting.

## 4. Kruskal's Minimum Spanning Tree (MST)

This is another major application of DSU.

A Minimum Spanning Tree is a subset of edges that:

1. Connects all vertices.
2. Contains no cycles.
3. Has the minimum possible total edge weight.

### Example

Consider a weighted graph:

```text
A -- B : 1
B -- C : 2
A -- C : 3
C -- D : 4
B -- D : 5
```

### Kruskal's Algorithm

1. Sort all edges by increasing weight.
2. Process edges from smallest to largest.
3. If an edge connects two different components, include it.
4. Merge those components using Union.
5. If it connects vertices already in the same component, skip it because it creates a cycle.
6. Stop after selecting V - 1 edges, if the graph is connected.

### Python Implementation

```python
def kruskal(n, edges):
    parent = list(range(n))
    size = [1] * n

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(a, b):
        ra = find(a)
        rb = find(b)

        if ra == rb:
            return False

        if size[ra] < size[rb]:
            ra, rb = rb, ra

        parent[rb] = ra
        size[ra] += size[rb]

        return True

    edges.sort(key=lambda edge: edge[2])

    mst_weight = 0
    mst_edges = []

    for u, v, weight in edges:
        if union(u, v):
            mst_weight += weight
            mst_edges.append((u, v, weight))

            if len(mst_edges) == n - 1:
                break

    return mst_weight, mst_edges
```

### Dry Run

```python
n = 4

edges = [
    (0, 1, 1),
    (1, 2, 2),
    (0, 2, 3),
    (2, 3, 4),
    (1, 3, 5)
]

print(kruskal(n, edges))
```

Output:

```text
(7, [(0, 1, 1), (1, 2, 2), (2, 3, 4)])
```

The minimum spanning tree weight is `7`.

### Complexity

- Sorting edges: O(E log E)
- DSU operations: O(E α(V))
- Overall: O(E log E)

---

# 5. DSU vs Other Graph Algorithms

| Graph Concept | Common Algorithm / Data Structure |
|---|---|
| Graph traversal | DFS / BFS |
| Shortest path | BFS / Dijkstra / Bellman-Ford |
| Topological ordering | Kahn's algorithm / DFS |
| Connected components | DFS / BFS / DSU |
| Dynamic connectivity (edge additions) | DSU |
| Undirected cycle detection | DFS / DSU |
| Minimum spanning tree | Kruskal + DSU |

### DSU vs DFS/BFS for Connected Components

- DFS/BFS explores the graph and discovers its components.
- DSU maintains components while edges are added.
- DSU is particularly useful when you process edges one by one and repeatedly need to merge or query components.

---

# How to Recognize DSU Problems

Look for these phrases in coding problems:

| Problem Statement Mentions | Think About |
|---|---|
| Merge two groups | Union |
| Are these vertices connected? | Find |
| Number of connected components | DSU |
| Redundant connection | Cycle detection |
| Detect cycle in undirected graph | DSU |
| Minimum spanning tree | Kruskal + DSU |
| Merge accounts / friend groups | Component merging |
| Network connections | Dynamic connectivity |

---

# Reusable DSU Template

This is the implementation worth memorizing.

It uses both path compression and union by size.

```python
class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.size = [1] * n
        self.components = n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])

        return self.parent[x]

    def union(self, a, b):
        ra = self.find(a)
        rb = self.find(b)

        if ra == rb:
            return False

        if self.size[ra] < self.size[rb]:
            ra, rb = rb, ra

        self.parent[rb] = ra
        self.size[ra] += self.size[rb]
        self.components -= 1

        return True

    def connected(self, a, b):
        return self.find(a) == self.find(b)
```

### Usage

```python
dsu = DSU(5)

dsu.union(0, 1)
dsu.union(1, 2)
dsu.union(3, 4)

print(dsu.connected(0, 2))  # True
print(dsu.connected(0, 4))  # False
print(dsu.components)       # 2
```

### Understanding the Template

| Method / Variable | Purpose |
|---|---|
| `parent` | Stores the parent of each node |
| `size` | Stores the size of each component |
| `components` | Tracks the number of components |
| `find(x)` | Finds the root of a component |
| `union(a, b)` | Merges two components |
| `connected(a, b)` | Checks whether two vertices are connected |
