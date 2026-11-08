# Trees – Data Structure

## 1. Introduction to Trees

### Explanation

A **Tree** is a non-linear hierarchical data structure consisting of nodes connected through edges.

Unlike arrays, linked lists, and stacks, which organize data sequentially, trees organize data hierarchically.

A tree consists of:
- Nodes: Store data.
- Edges: Connect nodes.
- Root: The topmost node.
- Child nodes: Nodes connected below another node.

> A tree with N nodes always contains N - 1 edges.

### Example

Consider the following tree:

```text
             A
           /   \
          B     C
         / \     \
        D   E     F
```

Here:
- A is the root.
- B and C are children of A.
- D and E are children of B.
- F is a child of C.

### Real-world applications

1. File systems – folders and files.
2. HTML DOM – parent and child elements.
3. Database indexes – B-Trees and B+ Trees.
4. Organization hierarchy – managers and employees.
5. AI – decision trees.
6. Compilers – syntax trees.

### Important properties

- A tree is connected.
- A tree contains no cycles.
- There is exactly one path between any two nodes.
- A tree with N nodes has N - 1 edges.

---

## 2. Tree Terminology

Consider this example throughout the following concepts:

```text
              A
            /   \
           B     C
          / \   / \
         D   E F   G
            /
           H
```

### 2.1 Root

**Explanation:**

The root is the topmost node of a tree.

It is the starting point of the tree and has no parent.

**Example:**
- A is the root.

**Important points:**
- Every non-empty tree has exactly one root.
- The root has no parent.
- Every other node is reachable from the root.

### 2.2 Parent

**Explanation:**

A parent is a node that has one or more directly connected child nodes below it.

**Example:**
- A is the parent of B and C.
- B is the parent of D and E.
- E is the parent of H.

### 2.3 Child

**Explanation:**

A child is a node directly connected below another node.

**Example:**
- B and C are children of A.
- D and E are children of B.
- H is a child of E.

**Important:** A node can have multiple children depending on the type of tree.

### 2.4 Leaf Node

**Explanation:**

A leaf node is a node that does not have any children.

It is also called a terminal node.

**Example:**

In our tree:
- D is a leaf.
- F is a leaf.
- G is a leaf.
- H is a leaf.

**Important:** A single-node tree has one leaf node, which is also its root.

### 2.5 Internal Node

**Explanation:**

An internal node is a node that has at least one child.

**Example:**
- A, B, C and E are internal nodes.

### 2.6 Height

**Explanation:**

The height of a node is the number of edges in the longest downward path from that node to a leaf.

The height of a tree is the height of its root.

**Example:**

```text
              A
            /   \
           B     C
          / \   / \
         D   E F   G
            /
           H
```

- Height(D) = 0
- Height(H) = 0
- Height(E) = 1
- Height(B) = 2
- Height(A) = 3

Therefore:

Height of the tree = 3 edges.

**Formula:**

Height(node) = 1 + max(height of its children)

For a leaf node:

Height(leaf) = 0

For an empty tree, we commonly define height = -1 when measuring in edges.

### 2.7 Depth

**Explanation:**

The depth of a node is the number of edges from the root to that node.

**Example:**

- Depth(A) = 0
- Depth(B) = 1
- Depth(C) = 1
- Depth(D) = 2
- Depth(E) = 2
- Depth(H) = 3

**Formula:**

Depth(root) = 0

Depth(child) = Depth(parent) + 1

**Difference between Height and Depth:**

- Depth measures the distance from the root to a node.
- Height measures the longest distance from a node down to a leaf.

### 2.8 Subtree

**Explanation:**

A subtree is a tree formed by a node and all its descendants.

Every node can be considered the root of its own subtree.

**Example:**

Original tree:

```text
              A
            /   \
           B     C
          / \
         D   E
            /
           H
```

Subtree rooted at B:

```text
          B
         / \
        D   E
           /
          H
```

Subtree rooted at E:

```text
        E
       /
      H
```

---

## 3. Binary Tree

### Explanation

A Binary Tree is a tree data structure in which each node can have at most two children.

These children are called:
- Left child
- Right child

A node may have:
- Zero children
- One child
- Two children

### Example

```text
             10
           /    \
          20     30
         / \       \
        40  50      60
```

Here:
- 10 is the root.
- 20 is the left child of 10.
- 30 is the right child of 10.
- 40 and 50 are children of 20.
- 60 is the right child of 30.

### Binary Tree Node Structure

Each node contains three components:

1. Data
2. Reference to the left child
3. Reference to the right child

### Python Implementation

```python
class TreeNode:
    def __init__(self, value):
        self.data = value
        self.left = None
        self.right = None
```

### Building a Binary Tree

```python
root = TreeNode(10)

root.left = TreeNode(20)
root.right = TreeNode(30)

root.left.left = TreeNode(40)
root.left.right = TreeNode(50)

root.right.right = TreeNode(60)
```

### Dry Run

After execution:

```text
             10
           /    \
          20     30
         / \       \
        40  50      60
```

| Node | Left Child | Right Child |
|---|---|---|
| 10 | 20 | 30 |
| 20 | 40 | 50 |
| 30 | None | 60 |
| 40 | None | None |
| 50 | None | None |
| 60 | None | None |

### Important Binary Tree Properties

For a binary tree:

1. Maximum nodes at level L (root at level 0):

   2^L

2. Maximum nodes in a binary tree of height H (measured in edges):

   2^(H+1) - 1

3. Minimum nodes in a binary tree of height H:

   H + 1

4. Maximum number of leaf nodes for height H:

   2^H

---

## 4. Types of Binary Trees

### 4.1 Full Binary Tree

A Full Binary Tree is a binary tree where every node has either:
- Zero children, or
- Exactly two children.

No node can have exactly one child.

Example:

```text
          10
         /  \
        20   30
       / \
      40  50
```

### 4.2 Complete Binary Tree

A Complete Binary Tree is a binary tree where:
- Every level except possibly the last is completely filled.
- The last level is filled from left to right.

Example:

```text
          10
         /  \
        20   30
       / \   /
      40 50 60
```

### 4.3 Perfect Binary Tree

A Perfect Binary Tree is a binary tree where:
- Every internal node has exactly two children.
- All leaf nodes are at the same level.

Example:

```text
          10
         /  \
        20   30
       / \   / \
      40 50 60 70
```

For a perfect binary tree of height H:

Total nodes = 2^(H+1) - 1

Leaf nodes = 2^H

### 4.4 Balanced Binary Tree

A Balanced Binary Tree is a binary tree where the heights of the left and right subtrees remain sufficiently close according to the balancing rule.

For an AVL-balanced binary tree, the difference in subtree heights at every node must be at most 1.

Example:

```text
          10
         /  \
        20   30
       / \
      40  50
```

Balanced trees help maintain efficient operations.

### 4.5 Degenerate Binary Tree

A Degenerate Binary Tree is a tree where every parent has only one child.

Example:

```text
      10
        \
         20
           \
            30
              \
               40
```

It behaves similarly to a linked list.

---

## 5. N-ary Tree

### Explanation

An N-ary Tree is a tree in which each node can have at most N children.

Unlike a binary tree, which allows at most two children, an N-ary tree can have any specified maximum number of children.

### Example

Consider a 3-ary tree:

```text
              A
          /   |   \
         B    C    D
        / \       /|\
       E   F     G H I
```

Here:
- A has three children.
- B has two children.
- C has zero children.
- D has three children.

This is a 3-ary tree because no node has more than three children.

### N-ary Tree Node Structure

Each node contains:
1. Data
2. A collection of child references

### Python Implementation

```python
class NaryTreeNode:
    def __init__(self, value):
        self.data = value
        self.children = []
```

### Building an N-ary Tree

```python
root = NaryTreeNode("A")

b = NaryTreeNode("B")
c = NaryTreeNode("C")
d = NaryTreeNode("D")

root.children = [b, c, d]

b.children = [
    NaryTreeNode("E"),
    NaryTreeNode("F")
]

d.children = [
    NaryTreeNode("G"),
    NaryTreeNode("H"),
    NaryTreeNode("I")
]
```

### Dry Run

After execution:

```text
              A
          /   |   \
         B    C    D
        / \       /|\
       E   F     G H I
```

| Node | Children |
|---|---|
| A | B, C, D |
| B | E, F |
| C | None |
| D | G, H, I |
| E | None |
| F | None |
| G | None |
| H | None |
| I | None |

### Binary Tree vs N-ary Tree

| Feature | Binary Tree | N-ary Tree |
|---|---|---|
| Maximum children | 2 | N |
| Child references | Left and right | Collection of children |
| Structure | More restrictive | More flexible |
| Applications | BST, heaps | File systems, organizational hierarchies |
