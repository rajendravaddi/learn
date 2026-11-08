# Tree Traversal Algorithms

## 1. Introduction to Tree Traversal

### Explanation

Tree Traversal is the process of visiting every node in a tree exactly once in a particular order.

Unlike arrays and linked lists, trees are non-linear data structures. Therefore, we need specific algorithms to visit their nodes.

There are two major categories of tree traversal:

1. Depth First Search (DFS)
   - Preorder
   - Inorder
   - Postorder

2. Breadth First Search (BFS)
   - Level-order

### Example Tree

We'll use this tree for all the traversal examples:

```text
              1
            /   \
           2     3
          / \   / \
         4   5 6   7
```

The nodes are:

- Root: 1
- Left subtree: 2, 4, 5
- Right subtree: 3, 6, 7

### Important Concepts

DFS explores a branch as deeply as possible before backtracking.

BFS explores nodes level by level, from left to right.

### Python Node Structure

```python
class TreeNode:
    def __init__(self, value):
        self.data = value
        self.left = None
        self.right = None
```

### Build the Example Tree

```python
root = TreeNode(1)

root.left = TreeNode(2)
root.right = TreeNode(3)

root.left.left = TreeNode(4)
root.left.right = TreeNode(5)

root.right.left = TreeNode(6)
root.right.right = TreeNode(7)
```

---

## 2. Preorder Traversal (Root → Left → Right)

### Explanation

Preorder traversal visits nodes in this order:

1. Visit the Root.
2. Traverse the Left subtree.
3. Traverse the Right subtree.

The order is:

**Root → Left → Right**

### Example

```text
              1
            /   \
           2     3
          / \   / \
         4   5 6   7
```

Preorder traversal:

```text
1 → 2 → 4 → 5 → 3 → 6 → 7
```

### Algorithm

1. Check whether the current node is None.
2. If it is None, return.
3. Process the current node.
4. Recursively traverse the left subtree.
5. Recursively traverse the right subtree.

### Dry Run

Starting at root = 1:

| Step | Current Node | Operation | Output |
|---|---|---|---|
| 1 | 1 | Visit root | 1 |
| 2 | 2 | Visit left subtree root | 1, 2 |
| 3 | 4 | Visit left child | 1, 2, 4 |
| 4 | 5 | Visit right child of 2 | 1, 2, 4, 5 |
| 5 | 3 | Visit right subtree root | 1, 2, 4, 5, 3 |
| 6 | 6 | Visit left child | 1, 2, 4, 5, 3, 6 |
| 7 | 7 | Visit right child | 1, 2, 4, 5, 3, 6, 7 |

Final output:

```text
[1, 2, 4, 5, 3, 6, 7]
```

### Recursive Python Implementation

```python
def preorder(root):
    if root is None:
        return

    print(root.data, end=" ")

    preorder(root.left)

    preorder(root.right)


preorder(root)
```

Output:

```text
1 2 4 5 3 6 7
```

### Iterative Python Implementation

Recursive DFS uses the call stack internally.

We can implement the same traversal explicitly using a stack.

**Algorithm:**

1. Create an empty stack.
2. Push the root node.
3. While the stack is not empty:
   - Pop a node.
   - Visit the node.
   - Push its right child if it exists.
   - Push its left child if it exists.

We push the right child first because a stack follows LIFO (Last In, First Out).

```python
def preorder_iterative(root):
    if root is None:
        return

    stack = [root]

    while stack:
        node = stack.pop()

        print(node.data, end=" ")

        if node.right:
            stack.append(node.right)

        if node.left:
            stack.append(node.left)


preorder_iterative(root)
```

Output:

```text
1 2 4 5 3 6 7
```

### Iterative Dry Run

| Operation | Stack (top at right) | Output |
|---|---|---|
| Push root | [1] | |
| Pop 1, push 3, 2 | [3, 2] | 1 |
| Pop 2, push 5, 4 | [3, 5, 4] | 1, 2 |
| Pop 4 | [3, 5] | 1, 2, 4 |
| Pop 5 | [3] | 1, 2, 4, 5 |
| Pop 3, push 7, 6 | [7, 6] | 1, 2, 4, 5, 3 |
| Pop 6 | [7] | 1, 2, 4, 5, 3, 6 |
| Pop 7 | [] | 1, 2, 4, 5, 3, 6, 7 |

### Applications

- Creating a copy of a tree.
- Serializing a tree.
- Prefix expression evaluation.
- Processing hierarchical structures.

---

## 3. Inorder Traversal (Left → Root → Right)

### Explanation

Inorder traversal visits nodes in this order:

1. Traverse the Left subtree.
2. Visit the Root.
3. Traverse the Right subtree.

The order is:

**Left → Root → Right**

### Example

```text
              1
            /   \
           2     3
          / \   / \
         4   5 6   7
```

Inorder traversal:

```text
4 → 2 → 5 → 1 → 6 → 3 → 7
```

### Algorithm

1. Check whether the current node is None.
2. If it is None, return.
3. Recursively traverse the left subtree.
4. Process the current node.
5. Recursively traverse the right subtree.

### Dry Run

Starting at root = 1:

| Step | Current Node | Operation | Output |
|---|---|---|---|
| 1 | 1 | Go left to 2 | |
| 2 | 2 | Go left to 4 | |
| 3 | 4 | No left child; visit 4 | 4 |
| 4 | 2 | Visit 2 | 4, 2 |
| 5 | 5 | Visit 5 | 4, 2, 5 |
| 6 | 1 | Visit 1 | 4, 2, 5, 1 |
| 7 | 6 | Visit 6 | 4, 2, 5, 1, 6 |
| 8 | 3 | Visit 3 | 4, 2, 5, 1, 6, 3 |
| 9 | 7 | Visit 7 | 4, 2, 5, 1, 6, 3, 7 |

Final output:

```text
[4, 2, 5, 1, 6, 3, 7]
```

### Recursive Python Implementation

```python
def inorder(root):
    if root is None:
        return

    inorder(root.left)

    print(root.data, end=" ")

    inorder(root.right)


inorder(root)
```

Output:

```text
4 2 5 1 6 3 7
```

### Iterative Python Implementation

**Algorithm:**

1. Create an empty stack.
2. Set current = root.
3. While current is not None or the stack is not empty:
   - Keep moving left, pushing nodes onto the stack.
   - Pop a node and visit it.
   - Move to its right child.

```python
def inorder_iterative(root):
    stack = []
    current = root

    while current or stack:

        while current:
            stack.append(current)
            current = current.left

        current = stack.pop()

        print(current.data, end=" ")

        current = current.right


inorder_iterative(root)
```

Output:

```text
4 2 5 1 6 3 7
```

### Iterative Dry Run

| Operation | Stack | Output |
|---|---|---|
| Push 1, 2, 4 | [1, 2, 4] | |
| Pop 4 | [1, 2] | 4 |
| Pop 2 | [1] | 4, 2 |
| Push 5 | [1, 5] | 4, 2 |
| Pop 5 | [1] | 4, 2, 5 |
| Pop 1 | [] | 4, 2, 5, 1 |
| Push 3, 6 | [3, 6] | 4, 2, 5, 1 |
| Pop 6 | [3] | 4, 2, 5, 1, 6 |
| Pop 3 | [] | 4, 2, 5, 1, 6, 3 |
| Push 7, pop 7 | [] | 4, 2, 5, 1, 6, 3, 7 |

### Important Interview Point

**Inorder traversal of a Binary Search Tree (BST) produces values in sorted order**, assuming the BST follows the usual ordering property.

Example BST:

```text
          5
         / \
        3   7
       / \ / \
      2  4 6  8
```

Inorder output:

```text
2 3 4 5 6 7 8
```

### Applications

- Retrieving sorted values from a BST.
- Validating BST ordering.
- Expression tree processing.

---

## 4. Postorder Traversal (Left → Right → Root)

### Explanation

Postorder traversal visits nodes in this order:

1. Traverse the Left subtree.
2. Traverse the Right subtree.
3. Visit the Root.

The order is:

**Left → Right → Root**

### Example

```text
              1
            /   \
           2     3
          / \   / \
         4   5 6   7
```

Postorder traversal:

```text
4 → 5 → 2 → 6 → 7 → 3 → 1
```

### Algorithm

1. Check whether the current node is None.
2. If it is None, return.
3. Recursively traverse the left subtree.
4. Recursively traverse the right subtree.
5. Process the current node.

### Dry Run

| Step | Current Node | Operation | Output |
|---|---|---|---|
| 1 | 4 | Visit left leaf | 4 |
| 2 | 5 | Visit right leaf | 4, 5 |
| 3 | 2 | Visit parent | 4, 5, 2 |
| 4 | 6 | Visit left leaf | 4, 5, 2, 6 |
| 5 | 7 | Visit right leaf | 4, 5, 2, 6, 7 |
| 6 | 3 | Visit parent | 4, 5, 2, 6, 7, 3 |
| 7 | 1 | Visit root | 4, 5, 2, 6, 7, 3, 1 |

Final output:

```text
[4, 5, 2, 6, 7, 3, 1]
```

### Recursive Python Implementation

```python
def postorder(root):
    if root is None:
        return

    postorder(root.left)

    postorder(root.right)

    print(root.data, end=" ")


postorder(root)
```

Output:

```text
4 5 2 6 7 3 1
```

### Iterative Python Implementation – Two Stacks

**Algorithm:**

1. Create two empty stacks.
2. Push the root into stack1.
3. While stack1 is not empty:
   - Pop a node from stack1.
   - Push it into stack2.
   - Push its left child into stack1 if present.
   - Push its right child into stack1 if present.
4. Pop and process all nodes from stack2.

```python
def postorder_iterative(root):
    if root is None:
        return

    stack1 = [root]
    stack2 = []

    while stack1:
        node = stack1.pop()

        stack2.append(node)

        if node.left:
            stack1.append(node.left)

        if node.right:
            stack1.append(node.right)

    while stack2:
        print(stack2.pop().data, end=" ")


postorder_iterative(root)
```

Output:

```text
4 5 2 6 7 3 1
```

### Dry Run

| Operation | Stack 1 | Stack 2 |
|---|---|---|
| Initial | [1] | [] |
| Pop 1, push 2 and 3 | [2, 3] | [1] |
| Pop 3, push 6 and 7 | [2, 6, 7] | [1, 3] |
| Pop 7 | [2, 6] | [1, 3, 7] |
| Pop 6 | [2] | [1, 3, 7, 6] |
| Pop 2, push 4 and 5 | [4, 5] | [1, 3, 7, 6, 2] |
| Pop 5 | [4] | [1, 3, 7, 6, 2, 5] |
| Pop 4 | [] | [1, 3, 7, 6, 2, 5, 4] |

Now pop stack2:

```text
4 → 5 → 2 → 6 → 7 → 3 → 1
```

### Applications

- Deleting a tree.
- Evaluating expression trees.
- Calculating directory sizes.
- Processing child nodes before their parents.

---

## 5. Level-order Traversal (BFS)

### Explanation

Level-order traversal visits nodes level by level, from left to right.

Unlike DFS, which explores one branch deeply, BFS processes all nodes at the current level before moving to the next level.

It uses a **Queue** data structure.

### Example

```text
              1             Level 0
            /   \
           2     3          Level 1
          / \   / \
         4   5 6   7        Level 2
```

Level-order traversal:

```text
1 → 2 → 3 → 4 → 5 → 6 → 7
```

### Algorithm

1. If root is None, return.
2. Create an empty queue.
3. Insert the root into the queue.
4. While the queue is not empty:
   - Remove the front node.
   - Visit the node.
   - Insert its left child if it exists.
   - Insert its right child if it exists.

### Dry Run

| Step | Queue | Output |
|---|---|---|
| Initial | [1] | |
| Remove 1, add 2, 3 | [2, 3] | 1 |
| Remove 2, add 4, 5 | [3, 4, 5] | 1, 2 |
| Remove 3, add 6, 7 | [4, 5, 6, 7] | 1, 2, 3 |
| Remove 4 | [5, 6, 7] | 1, 2, 3, 4 |
| Remove 5 | [6, 7] | 1, 2, 3, 4, 5 |
| Remove 6 | [7] | 1, 2, 3, 4, 5, 6 |
| Remove 7 | [] | 1, 2, 3, 4, 5, 6, 7 |

Final output:

```text
[1, 2, 3, 4, 5, 6, 7]
```

### Python Implementation

Use `deque` from Python's `collections` module for efficient queue operations.

```python
from collections import deque


def level_order(root):
    if root is None:
        return

    queue = deque([root])

    while queue:
        node = queue.popleft()

        print(node.data, end=" ")

        if node.left:
            queue.append(node.left)

        if node.right:
            queue.append(node.right)


level_order(root)
```

Output:

```text
1 2 3 4 5 6 7
```

### Level-order Traversal by Individual Levels

Sometimes interview questions require the output grouped by level.

Expected output:

```python
[
    [1],
    [2, 3],
    [4, 5, 6, 7]
]
```

Python implementation:

```python
from collections import deque


def level_order_by_level(root):
    if root is None:
        return []

    result = []
    queue = deque([root])

    while queue:

        level_size = len(queue)
        current_level = []

        for _ in range(level_size):

            node = queue.popleft()

            current_level.append(node.data)

            if node.left:
                queue.append(node.left)

            if node.right:
                queue.append(node.right)

        result.append(current_level)

    return result


print(level_order_by_level(root))
```

Output:

```text
[[1], [2, 3], [4, 5, 6, 7]]
```

### Applications

- Printing a tree level by level.
- Finding the minimum depth of a binary tree.
- Finding the width of a tree.
- Finding the shortest path in an unweighted tree.
- Level-based tree problems.

---

## 6. Recursive vs Iterative Traversal

### Explanation

Tree traversal can be implemented using two approaches:

1. Recursive approach
2. Iterative approach

### Recursive Traversal

Recursion means a function calls itself to solve smaller subproblems.

For tree traversal:
- Process the current node according to the traversal order.
- Call the same function for the left subtree.
- Call the same function for the right subtree.

The Python call stack automatically manages pending function calls.

Example:

```python
def preorder(root):

    if root is None:
        return

    print(root.data)

    preorder(root.left)

    preorder(root.right)
```

### How Recursion Works

Consider:

```text
       1
      /
     2
    /
   3
```

Call sequence:

```text
preorder(1)
    |
    v
preorder(2)
    |
    v
preorder(3)
    |
    v
preorder(None)
```

The function returns when it reaches None.

### Iterative Traversal

Iterative traversal uses loops and explicit data structures such as:
- Stack for DFS.
- Queue for BFS.

Example:

```python
def preorder_iterative(root):

    if root is None:
        return

    stack = [root]

    while stack:

        node = stack.pop()

        print(node.data)

        if node.right:
            stack.append(node.right)

        if node.left:
            stack.append(node.left)
```

### Comparison

| Feature | Recursive | Iterative |
|---|---|---|
| Implementation | Function calls | Loops |
| Data structure | Implicit call stack | Explicit stack/queue |
| Readability | Usually simpler | Sometimes more complex |
| Stack management | Automatic | Manual |
| Stack overflow | Possible | Avoids recursion-depth limits |
| Control | Less explicit | More explicit |

### When to Use Which?

Use recursion when:
- The problem has a natural recursive structure.
- The tree is not excessively deep.
- You want simple and readable code.

Use iteration when:
- The tree may be very deep.
- You want to avoid Python recursion-depth limitations.
- You need explicit control over the traversal process.
