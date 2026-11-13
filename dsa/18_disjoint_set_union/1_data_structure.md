# Disjoint Set Union / Union-Find - Data Structure

## Introduction: What is DSU?

**Disjoint Set Union (DSU)**, also called **Union-Find**, is a data structure used to manage a collection of separate, non-overlapping groups called *disjoint sets*.

Yes, DSU is closely related to graphs. It is especially useful for graph problems involving:

- Connected components
- Dynamic connectivity
- Component merging
- Cycle detection in undirected graphs
- Kruskal's Minimum Spanning Tree (MST)

The main question DSU answers is:

**"Are these two vertices part of the same connected component?"**

It can also efficiently merge two components when an edge connects them.

### Example

Suppose we have five vertices:

Initially, every vertex belongs to its own group:

```text
{1}  {2}  {3}  {4}  {5}
```

After performing some merge operations:

```text
{1, 2, 3}  {4, 5}
```

Now there are two groups, or connected components.

DSU helps us:

1. Find which group a vertex belongs to.
2. Merge two groups.
3. Check whether two vertices belong to the same group.
4. Count the number of groups.

---

## 1. Parent Array

DSU uses an array called `parent` to represent relationships between elements.

Initially, every element is its own parent.

```python
n = 5

parent = [0, 1, 2, 3, 4]
```

This represents:

```text
0 → 0
1 → 1
2 → 2
3 → 3
4 → 4
```

Every vertex is initially the root of its own group.

When two groups are merged, one root becomes the parent of the other root.

For example:

```python
parent[2] = 1
```

Now:

```text
2 → 1
```

Vertices 1 and 2 belong to the same group.

## 2. Find Operation

`Find(x)` returns the representative (root) of the group containing `x`.

Example:

```text
Group: {1, 2, 3}

Find(1) = 1
Find(2) = 1
Find(3) = 1
```

Here, vertex 1 is the representative of the group.

### Basic Find Implementation

```python
def find(x):
    if parent[x] == x:
        return x

    return find(parent[x])
```

### Algorithm Steps

1. Check whether `x` is its own parent.
2. If yes, `x` is the root.
3. Otherwise, move to its parent.
4. Continue until reaching the root.
5. Return the root.

## 3. Union Operation

`Union(a, b)` merges the groups containing `a` and `b`.

Example:

Initially:

```text
{1}  {2}  {3}  {4}
```

After `Union(1, 2)`:

```text
{1, 2}  {3}  {4}
```

After `Union(2, 3)`:

```text
{1, 2, 3}  {4}
```

### Basic Union Implementation

```python
def union(a, b):
    root_a = find(a)
    root_b = find(b)

    if root_a == root_b:
        return

    parent[root_b] = root_a
```

### Algorithm Steps

1. Find the root of `a`.
2. Find the root of `b`.
3. If both roots are equal, they are already connected.
4. Otherwise, attach one root to the other root.
5. The two groups are now merged.

## 4. Connected Components

A connected component is a group of vertices where every vertex is reachable from every other vertex.

Consider:

```text
Component 1: {1, 2, 3}
Component 2: {4, 5}
Component 3: {6}
```

There are three connected components.

Using DSU, we can count components by counting the number of distinct roots.

```python
def count_components(n):
    roots = set()

    for i in range(n):
        roots.add(find(i))

    return len(roots)
```
