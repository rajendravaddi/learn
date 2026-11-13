# Optimizations

The basic implementation works, but it can become slow when the parent structure becomes a long chain.

For example:

```text
1
|
2
|
3
|
4
|
5
```

To find the root of 5, we may need to traverse several parents.

DSU has two important optimizations to solve this problem:

1. Path Compression
2. Union by Rank or Union by Size

## 1. Path Compression

Path compression makes every visited node point directly to the root during a Find operation.

Before:

```text
5 → 4 → 3 → 2 → 1
```

After `find(5)`:

```text
5 ─┐
4 ─┤
3 ─┤
2 ─┤
   ↓
   1
```

### Implementation

```python
def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])

    return parent[x]
```

### Algorithm Steps

1. Check whether `x` is its own parent.
2. If not, recursively find its root.
3. Update `parent[x]` to point directly to the root.
4. Return the root.

**Why is it useful?**

Future Find operations become much faster because nodes are closer to the root.

## 2. Union by Rank

Union by rank tries to keep the DSU tree shallow.

Rank is an estimate of the tree's height.

### Rules

- If both trees have different ranks, attach the smaller-rank tree below the larger-rank tree.
- If ranks are equal, attach either tree below the other.
- Increase the winning root's rank by one when the ranks are equal.

### Implementation

```python
parent = list(range(n))
rank = [0] * n

def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]

def union(a, b):
    root_a = find(a)
    root_b = find(b)

    if root_a == root_b:
        return False

    if rank[root_a] < rank[root_b]:
        parent[root_a] = root_b

    elif rank[root_a] > rank[root_b]:
        parent[root_b] = root_a

    else:
        parent[root_b] = root_a
        rank[root_a] += 1

    return True
```

## 3. Union by Size

Instead of tracking rank, we track the number of vertices in each component.

### Rules

- Attach the smaller component below the larger component.
- Update the size of the new root after merging.

### Implementation

```python
parent = list(range(n))
size = [1] * n

def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]

def union(a, b):
    root_a = find(a)
    root_b = find(b)

    if root_a == root_b:
        return False

    if size[root_a] < size[root_b]:
        root_a, root_b = root_b, root_a

    parent[root_b] = root_a
    size[root_a] += size[root_b]

    return True
```

## 4. Union by Rank vs Union by Size

| Union by Rank | Union by Size |
|---|---|
| Tracks approximate tree height | Tracks component size |
| Attaches lower rank to higher rank | Attaches smaller group to larger group |
| Increments rank when equal | Adds sizes after merging |

Both optimizations are effective.

You generally use either union by rank or union by size alongside path compression.

## 5. DSU Time Complexity

With path compression and union by rank or size:

| Operation | Amortized Complexity |
|---|---|
| Find | O(α(n)) |
| Union | O(α(n)) |
| Connected check | O(α(n)) |

Here, α(n) is the inverse Ackermann function.

It grows so slowly that it is effectively constant for practical input sizes.

