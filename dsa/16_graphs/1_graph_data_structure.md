# Graph Fundamentals

## 1. What is a Graph?

A **Graph** is a non-linear data structure consisting of a collection of vertices (nodes) and edges (connections between vertices).

Graphs are used to represent relationships and connections between objects.

### Real-world examples

- Social networks: People are vertices, friendships are edges.
- Google Maps: Locations are vertices, roads are edges.
- Computer networks: Computers are vertices, network connections are edges.
- Web pages: Pages are vertices, hyperlinks are edges.

### Example

Consider a graph with four vertices: A, B, C and D.

Edges:
- A — B
- A — C
- B — D
- C — D

Representation:

```text
    A
   / \
  B   C
   \ /
    D
```

Here:
- Vertices = {A, B, C, D}
- Edges = {(A, B), (A, C), (B, D), (C, D)}
- Number of vertices (V) = 4
- Number of edges (E) = 4

### Python representation

```python
vertices = ["A", "B", "C", "D"]

edges = [
    ("A", "B"),
    ("A", "C"),
    ("B", "D"),
    ("C", "D")
]

print("Vertices:", vertices)
print("Edges:", edges)
```

Output:

```text
Vertices: ['A', 'B', 'C', 'D']
Edges: [('A', 'B'), ('A', 'C'), ('B', 'D'), ('C', 'D')]
```

---

## 2. Vertex and Edge

### 2.1 Vertex (Node)

A **Vertex** is an individual entity or point in a graph.

It represents an object, location, person or any other entity.

Example:

```text
A ---- B ---- C
```

Here:
- A is a vertex.
- B is a vertex.
- C is a vertex.

Total vertices = 3.


### 2.2 Edge

An **Edge** represents a connection or relationship between two vertices.

Example:

```text
A ----- B
```

The edge connects vertex A with vertex B.

### Important points

- A graph can contain multiple vertices.
- A graph can contain zero or more edges.
- An edge connects two vertices.
- In an undirected graph, an edge has no direction.
- In a directed graph, an edge has a direction.

---

## 3. Directed and Undirected Graphs

### 3.1 Undirected Graph

An **Undirected Graph** is a graph in which edges do not have a direction.

If vertex A is connected to vertex B, then B is also connected to A.

Example:

```text
A -------- B
```

The connection works in both directions:

- A → B
- B → A

Real-world example:

Facebook friendship: If A and B are friends, the friendship is mutual.


### 3.2 Directed Graph (Digraph)

A **Directed Graph** is a graph in which every edge has a specific direction.

An edge from A to B does not automatically mean there is an edge from B to A.

Example:

```text
A ------> B
```

Here:
- A can reach B.
- B cannot necessarily reach A.

Real-world example:

Instagram following: A can follow B without B following A.


### Comparison

| Feature | Undirected | Directed |
|---|---|---|
| Edge direction | No direction | Has direction |
| Connection | Bidirectional | Directional |
| Edge notation | A — B | A → B |
| Example | Friendship | Following |

---

## 4. Weighted and Unweighted Graphs

### 4.1 Unweighted Graph

An **Unweighted Graph** is a graph in which edges do not have any associated weight or cost.

Every edge is treated equally.

Example:

```text
A ----- B
|
|
C ----- D
```

Here, all connections are treated equally.

Real-world example:

A simple friendship network where we only care whether two people are connected.


### 4.2 Weighted Graph

A **Weighted Graph** is a graph in which every edge has an associated weight or cost.

The weight can represent:
- Distance
- Time
- Cost
- Network latency

Example:

```text
      10
  A ------- B
  |
  | 5
  |
  C ------- D
      8
```

Here:
- A to B has weight 10.
- A to C has weight 5.
- C to D has weight 8.

Real-world example:

Google Maps uses road distances or travel times to calculate routes.


### Comparison

| Feature | Unweighted | Weighted |
|---|---|---|
| Edge weight | Not specified | Present |
| Edge information | Connection only | Connection + weight |
| Example | Friendship | Road distance |

Note: A weighted graph can be either directed or undirected.

---

## 5. Graph Representation

A graph can be represented in multiple ways in programming.

The three commonly used representations are:

1. Adjacency Matrix
2. Adjacency List
3. Edge List

Consider this graph for all three representations:

```text
    0
   / \
  1   2
   \ /
    3
```

Vertices = {0, 1, 2, 3}

Edges = {(0,1), (0,2), (1,3), (2,3)}

### 5.1 Adjacency Matrix

An **Adjacency Matrix** is a 2D array used to represent connections between vertices.

- Rows represent source vertices.
- Columns represent destination vertices.
- If an edge exists, store 1.
- Otherwise, store 0.

For an unweighted undirected graph:

```text
      0  1  2  3
    +------------
  0 | 0  1  1  0
  1 | 1  0  0  1
  2 | 1  0  0  1
  3 | 0  1  1  0
```

#### Python implementation

```python
n = 4

edges = [
    (0, 1),
    (0, 2),
    (1, 3),
    (2, 3)
]

matrix = [[0] * n for _ in range(n)]

for u, v in edges:
    matrix[u][v] = 1
    matrix[v][u] = 1  # Undirected graph

for row in matrix:
    print(row)
```

Output:

```text
[0, 1, 1, 0]
[1, 0, 0, 1]
[1, 0, 0, 1]
[0, 1, 1, 0]
```


#### Checking whether an edge exists

```python
def has_edge(matrix, u, v):
    return matrix[u][v] == 1

print(has_edge(matrix, 0, 1))
print(has_edge(matrix, 0, 3))
```

Output:

```text
True
False
```

#### Complexity

- Space Complexity: O(V²)
- Checking an edge: O(1)
- Adding an edge: O(1)
- Finding all neighbors of a vertex: O(V)

**When to use:** When the graph is dense (many edges) or frequent edge-existence checks are required.

---

### 5.2 Adjacency List

An **Adjacency List** represents a graph using a collection of lists.

Each vertex stores a list of all its neighboring vertices.

Example:

```text
    0
   / \
  1   2
   \ /
    3
```

Adjacency List:

```text
0 → [1, 2]
1 → [0, 3]
2 → [0, 3]
3 → [1, 2]
```

#### Python implementation

```python
n = 4

edges = [
    (0, 1),
    (0, 2),
    (1, 3),
    (2, 3)
]

graph = [[] for _ in range(n)]

for u, v in edges:
    graph[u].append(v)
    graph[v].append(u)  # Undirected graph

print(graph)
```

Output:

```text
[[1, 2], [0, 3], [0, 3], [1, 2]]
```

#### Checking whether an edge exists

```python
def has_edge(graph, u, v):
    return v in graph[u]

print(has_edge(graph, 0, 1))
print(has_edge(graph, 0, 3))
```

Output:

```text
True
False
```

Note: Checking an edge using a normal adjacency list takes O(degree(u)), not O(1).

#### Complexity

- Space Complexity: O(V + E)
- Adding an edge: O(1) amortized
- Checking an edge: O(degree(u))
- Finding all neighbors: O(degree(u))

**When to use:** For sparse graphs and most DFS/BFS problems.

This is the most commonly used graph representation in DSA coding problems.

---

### 5.3 Edge List

An **Edge List** represents a graph as a list of all its edges.

Each element stores the two vertices connected by an edge.

Example:

```text
    0
   / \
  1   2
   \ /
    3
```

Edge List:

```python
[
    (0, 1),
    (0, 2),
    (1, 3),
    (2, 3)
]
```

#### Python implementation

```python
edges = [
    (0, 1),
    (0, 2),
    (1, 3),
    (2, 3)
]

for u, v in edges:
    print(u, "is connected to", v)
```

Output:

```text
0 is connected to 1
0 is connected to 2
1 is connected to 3
2 is connected to 3
```

### Weighted Edge List

For weighted graphs, store three values:

```python
edges = [
    (0, 1, 10),
    (0, 2, 5),
    (1, 3, 7),
    (2, 3, 8)
]
```

Each tuple contains:

```text
(source, destination, weight)
```

### Complexity

- Space Complexity: O(E)
- Adding an edge: O(1) amortized
- Checking whether an edge exists: O(E)
- Finding all neighbors: O(E)

**When to use:**
- Algorithms that process edges directly.
- Kruskal's Minimum Spanning Tree algorithm.
- Sorting edges by weight.

---

## 6. Comparing Graph Representations

| Operation | Adjacency Matrix | Adjacency List | Edge List |
|---|---|---|---|
| Space | O(V²) | O(V + E) | O(E) |
| Check edge | O(1) | O(degree) | O(E) |
| Add edge | O(1) | O(1)* | O(1)* |
| Find neighbors | O(V) | O(degree) | O(E) |

*Assuming dynamic arrays/lists and amortized constant-time append.*

### Which representation should you use?

- Adjacency Matrix: Dense graphs.
- Adjacency List: Most graph traversal problems.
- Edge List: Edge-oriented algorithms.

For our upcoming DFS, BFS, connected components and cycle detection topics, we'll primarily use the **Adjacency List**.

---

## 7. Degree, In-degree and Out-degree

These concepts describe how many edges are connected to a vertex.

### 7.1 Degree (Undirected Graph)

The **Degree** of a vertex is the number of edges connected to that vertex.

Example:

```text
      B
      |
A ----C---- D
      |
      E
```

Here:

- Degree(A) = 1
- Degree(B) = 1
- Degree(C) = 4
- Degree(D) = 1
- Degree(E) = 1

Vertex C has four connections, so its degree is 4.

### Python implementation

```python
graph = {
    "A": ["C"],
    "B": ["C"],
    "C": ["A", "B", "D", "E"],
    "D": ["C"],
    "E": ["C"]
}

for vertex in graph:
    degree = len(graph[vertex])
    print(vertex, ":", degree)
```

Output:

```text
A : 1
B : 1
C : 4
D : 1
E : 1
```

**Important formula:**

For an undirected graph:

Sum of all vertex degrees = 2 × Number of edges

Why?

Every undirected edge connects two vertices, so it contributes 1 to the degree of each endpoint.

---

### 7.2 In-degree (Directed Graph)

The **In-degree** of a vertex is the number of incoming edges pointing towards that vertex.

Example:

```text
A ---->
       \
        > B
       /
C ---->
```

Here:
- A → B
- C → B

Therefore:

- In-degree(A) = 0
- In-degree(B) = 2
- In-degree(C) = 0

### Python implementation

```python
graph = {
    "A": ["B"],
    "B": [],
    "C": ["B"]
}

indegree = {vertex: 0 for vertex in graph}

for vertex in graph:
    for neighbor in graph[vertex]:
        indegree[neighbor] += 1

print(indegree)
```

Output:

```text
{'A': 0, 'B': 2, 'C': 0}
```

---

### 7.3 Out-degree (Directed Graph)

The **Out-degree** of a vertex is the number of outgoing edges from that vertex.

Using the same graph:

```text
A ---->
       \
        > B
       /
C ---->
```

Here:

- Out-degree(A) = 1
- Out-degree(B) = 0
- Out-degree(C) = 1

### Python implementation

```python
graph = {
    "A": ["B"],
    "B": [],
    "C": ["B"]
}

for vertex in graph:
    outdegree = len(graph[vertex])
    print(vertex, ":", outdegree)
```

Output:

```text
A : 1
B : 0
C : 1
```

### Important formulas

For a directed graph:

- Sum of all in-degrees = Number of edges.
- Sum of all out-degrees = Number of edges.

For every vertex:

```text
Degree = In-degree + Out-degree
```

This last formula applies when counting both incoming and outgoing directed edges together.

---

## 8. Important Graph Terminology — Quick Revision

| Term | Meaning |
|---|---|
| Vertex | Individual node in a graph |
| Edge | Connection between two vertices |
| Directed Graph | Graph with directional edges |
| Undirected Graph | Graph without directional edges |
| Weighted Graph | Graph with edge weights |
| Unweighted Graph | Graph without edge weights |
| Adjacent Vertices | Two vertices connected by an edge |
| Path | Sequence of vertices connected by edges |
| Cycle | Path that starts and ends at the same vertex |
| Degree | Number of edges connected to a vertex in an undirected graph |
| In-degree | Number of incoming edges |
| Out-degree | Number of outgoing edges |
| Connected Graph | Undirected graph in which every pair of vertices has a path between them |
| Disconnected Graph | Graph containing at least two components with no path between them |
| Self-loop | Edge connecting a vertex to itself |

---

## 9. Complexity Cheat Sheet

Let:
- V = Number of vertices
- E = Number of edges

| Representation | Space Complexity |
|---|---|
| Adjacency Matrix | O(V²) |
| Adjacency List | O(V + E) |
| Edge List | O(E) |

### Key things to remember

1. Adjacency Matrix uses a 2D array.
2. Adjacency List stores neighbors of every vertex.
3. Edge List stores all edges directly.
4. Adjacency List is generally preferred for DFS and BFS.
5. An undirected edge is stored twice in an adjacency list.
6. A directed edge is stored only in its source vertex's list.
7. Weighted adjacency lists store `(neighbor, weight)` pairs.
8. Sum of degrees in an undirected graph is 2E.
9. Sum of in-degrees and sum of out-degrees in a directed graph are both E.
