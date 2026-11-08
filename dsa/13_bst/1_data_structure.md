# Binary Search Trees (BST)

## 1. Binary Search Tree

A **Binary Search Tree (BST)** is a special type of binary tree in which every node follows a specific ordering property.

For every node:

1. All values in its left subtree must be smaller than the node's value.
2. All values in its right subtree must be greater than the node's value.
3. Both left and right subtrees must independently satisfy the BST property.

We will assume that all values are unique unless explicitly stated otherwise.

## 2. BST Structure

Consider the following BST:

```text
             50
           /    \
         30      70
        /  \    /  \
       20  40  60  80
```

Let's understand the property:

**For node 50:**
- Left subtree contains 30, 20, 40. All are smaller than 50.
- Right subtree contains 70, 60, 80. All are greater than 50.

**For node 30:**
- Left child 20 is smaller than 30.
- Right child 40 is greater than 30.

**For node 70:**
- Left child 60 is smaller than 70.
- Right child 80 is greater than 70.

Important: The BST property applies to the entire left and right subtrees, not just immediate children.

## 3. Important BST Rules

1. Every node has at most two children.
2. Every node in the left subtree must be smaller than the current node.
3. Every node in the right subtree must be greater than the current node.
4. Both subtrees must independently satisfy the BST property.
5. An empty tree is considered a valid BST.
6. Duplicate values require a consistent handling policy.

## 4. BST vs Binary Tree

| Feature | Binary Tree | Binary Search Tree |
|---|---|---|
| Children | At most two | At most two |
| Ordering | No specific ordering | Follows BST property |
| Searching | O(n) generally | O(h) |
| Inorder traversal | No guaranteed order | Sorted ascending |
| Insertion | Depends on implementation | Follows BST ordering |

## 5. Why Do We Need BST?

Suppose we have the following values:

```python
[50, 30, 70, 20, 40, 60, 80]
```

In an ordinary binary tree, searching for an element may require checking every node.

In a BST, we can eliminate an entire subtree based on comparisons.

For example, search for 60:

```text
Start at 50.

60 > 50
    Move right.

Reach 70.

60 < 70
    Move left.

Reach 60.
    Found!
```

We visited only three nodes instead of checking all seven.

This is the fundamental advantage of a BST:

**Ordering helps reduce the search space.**

## 6. BST Height and Complexity

Let:
- n = Number of nodes.
- h = Height of the BST.

The performance of BST operations depends on its height.

### Balanced BST

```text
          50
        /    \
      30      70
     /  \    /  \
    20  40  60  80
```

Height is approximately O(log n).

Search, insertion, and deletion take O(log n).

### Skewed BST

```text
    10
      \
       20
         \
          30
            \
             40
               \
                50
```

Height is O(n).

Search, insertion, and deletion take O(n).

Important: A normal BST does not automatically remain balanced. Its performance depends on its shape.

