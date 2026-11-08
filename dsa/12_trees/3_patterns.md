# Tree Patterns

## 1. Recursive Tree Processing

### 1.1 Explanation

Recursive tree processing means solving a tree problem by solving smaller versions of the same problem on its child subtrees.

A tree is naturally recursive because every subtree is itself a tree.

Most recursive tree algorithms follow three steps:

1. Base Case – Handle an empty node.
2. Recursive Case – Solve the problem for child nodes.
3. Processing – Combine or use the results.

The position of the processing step determines whether the algorithm follows a top-down or bottom-up approach.

### 1.2 General Recursive Template

```python
def solve(root):

    # Base case
    if root is None:
        return

    # Process current node
    print(root.data)

    # Recursive calls
    solve(root.left)
    solve(root.right)
```

### 1.3 Example – Count Total Nodes

Problem:

Find the total number of nodes in a binary tree.

Example:

```text
          1
         / \
        2   3
       / \
      4   5
```

Expected output:

```text
5
```

### 1.4 Algorithm

1. If the current node is None, return 0.
2. Count nodes in the left subtree.
3. Count nodes in the right subtree.
4. Add 1 for the current node.
5. Return the total.

### 1.5 Python Implementation

```python
def count_nodes(root):

    if root is None:
        return 0

    left_count = count_nodes(root.left)

    right_count = count_nodes(root.right)

    return 1 + left_count + right_count
```

### 1.6 Dry Run

Tree:

```text
          1
         / \
        2   3
       / \
      4   5
```

Evaluation:

```text
count_nodes(1)
    |
    +-- count_nodes(2)
    |       |
    |       +-- count_nodes(4) = 1
    |       +-- count_nodes(5) = 1
    |       |
    |       +-- return 1 + 1 + 1 = 3
    |
    +-- count_nodes(3) = 1
    |
    +-- return 1 + 3 + 1 = 5
```

Final output:

```text
5
```

### 1.7 Complexity

- Time: O(N), because every node is visited once.
- Auxiliary space: O(H), due to the recursion stack.

### 1.8 Other Problems Using Recursive Tree Processing

- Sum of all nodes.
- Maximum value in a tree.
- Minimum value in a tree.
- Count leaf nodes.
- Check whether two trees are identical.
- Invert a binary tree.
- Check whether a tree is symmetric.

---

## 2. Bottom-Up Recursion

### 2.1 Explanation

Bottom-up recursion means processing child nodes first and then using their results to calculate the result for the current parent node.

The recursive calls happen before the current node is processed.

This is also closely related to postorder traversal.

The general flow is:

```text
Left Subtree
      |
      v
Right Subtree
      |
      v
Current Node
```

### 2.2 Example – Find Maximum Depth of a Binary Tree

Problem:

Find the maximum depth of a binary tree.

Maximum depth is the number of nodes along the longest root-to-leaf path.

Consider:

```text
          1
         / \
        2   3
       /
      4
     /
    5
```

Longest path:

```text
1 → 2 → 4 → 5
```

Expected answer:

```text
4
```

### 2.3 Algorithm

1. If the node is None, return 0.
2. Find the maximum depth of the left subtree.
3. Find the maximum depth of the right subtree.
4. Add 1 for the current node.
5. Return the result.

Formula:

```text
depth(node) = 1 + max(left_depth, right_depth)
```

### 2.4 Python Implementation

```python
def max_depth(root):

    if root is None:
        return 0

    left_depth = max_depth(root.left)

    right_depth = max_depth(root.right)

    return 1 + max(left_depth, right_depth)
```

### 2.5 Dry Run

```text
          1
         /
        2
       /
      4
     /
    5
```

The function first reaches node 5.

Then results are returned upward:

| Node | Left Depth | Right Depth | Returned Depth |
|---|---:|---:|---:|
| 5 | 0 | 0 | 1 |
| 4 | 1 | 0 | 2 |
| 2 | 2 | 0 | 3 |
| 1 | 3 | 0 | 4 |

Final output:

```text
4
```

### 2.6 Another Example – Sum of All Nodes

```python
def tree_sum(root):

    if root is None:
        return 0

    left_sum = tree_sum(root.left)

    right_sum = tree_sum(root.right)

    return root.data + left_sum + right_sum
```

For:

```text
          1
         / \
        2   3
       / \
      4   5
```

Calculations:

```text
Node 4 = 4
Node 5 = 5
Node 2 = 2 + 4 + 5 = 11
Node 3 = 3
Node 1 = 1 + 11 + 3 = 15
```

Output:

```text
15
```

### 2.7 Complexity

- Time: O(N).
- Auxiliary space: O(H).

### 2.8 Applications

- Maximum depth.
- Minimum depth.
- Tree diameter.
- Balanced binary tree checking.
- Subtree sums.
- Maximum path sum.
- Tree height calculations.

---

## 3. Top-Down Recursion

### 3.1 Explanation

Top-down recursion means passing information from a parent node to its child nodes.

Instead of waiting for the children to return information, we carry information as function parameters while moving downward.

The general flow is:

```text
          Parent
             |
             v
          Children
             |
             v
        Descendants
```

It is commonly used when the problem requires information about the path from the root to the current node.

### 3.2 Example – Calculate Depth of Every Node

Problem:

Print the depth of every node in a binary tree.

Example:

```text
          1
         / \
        2   3
       / \
      4   5
```

Expected output:

```text
Node 1 -> Depth 0
Node 2 -> Depth 1
Node 3 -> Depth 1
Node 4 -> Depth 2
Node 5 -> Depth 2
```

### 3.3 Algorithm

1. Start at the root with depth 0.
2. Process the current node.
3. Pass depth + 1 to the left child.
4. Pass depth + 1 to the right child.
5. Continue until all nodes are processed.

### 3.4 Python Implementation

```python
def print_depth(root, depth=0):

    if root is None:
        return

    print(root.data, "-> Depth:", depth)

    print_depth(root.left, depth + 1)

    print_depth(root.right, depth + 1)
```

### 3.5 Dry Run

| Node | Depth Passed | Output |
|---|---:|---|
| 1 | 0 | 1 → 0 |
| 2 | 1 | 2 → 1 |
| 4 | 2 | 4 → 2 |
| 5 | 2 | 5 → 2 |
| 3 | 1 | 3 → 1 |

### 3.6 Another Example – Check Root-to-Leaf Path Sum

Problem:

Determine whether a root-to-leaf path has a given target sum.

Tree:

```text
          5
         / \
        4   8
       /   / \
      11  13  4
     / \       \
    7   2       1
```

Target sum:

```text
22
```

One valid path:

```text
5 → 4 → 11 → 2
```

Sum:

```text
5 + 4 + 11 + 2 = 22
```

### 3.7 Algorithm

1. If the current node is None, return False.
2. Add the current node's value to the running sum.
3. If it is a leaf, check whether the running sum equals the target.
4. Recursively check the left subtree.
5. Recursively check the right subtree.
6. Return True if either subtree has a valid path.

### 3.8 Python Implementation

```python
def has_path_sum(root, target, current_sum=0):

    if root is None:
        return False

    current_sum += root.data

    if root.left is None and root.right is None:
        return current_sum == target

    return (
        has_path_sum(root.left, target, current_sum)
        or
        has_path_sum(root.right, target, current_sum)
    )
```

### 3.9 Dry Run

For the path:

```text
5 → 4 → 11 → 2
```

| Node | Running Sum |
|---|---:|
| 5 | 5 |
| 4 | 9 |
| 11 | 20 |
| 2 | 22 |

At node 2:
- It is a leaf.
- Running sum = 22.
- Target = 22.

Therefore:

```text
True
```

### 3.10 Complexity

- Time: O(N) in the worst case.
- Auxiliary space: O(H).

### 3.11 Applications

- Finding root-to-leaf paths.
- Checking path sums.
- Calculating node depths.
- Tracking ancestors.
- Passing constraints down the tree.

---

## 4. Path Tracking

### 4.1 Explanation

Path tracking is a technique used to maintain the path from the root to the current node during tree traversal.

It is commonly implemented using:
- A list.
- Backtracking.
- Recursive DFS.

When entering a node, add its value to the path.

When leaving a node, remove its value from the path.

This removal step is called backtracking.

### 4.2 Example – Find All Root-to-Leaf Paths

Problem:

Return all paths from the root to every leaf node.

Tree:

```text
          1
         / \
        2   3
       / \
      4   5
```

Expected output:

```python
[
    [1, 2, 4],
    [1, 2, 5],
    [1, 3]
]
```

### 4.3 Algorithm

1. Create an empty path list.
2. Start DFS from the root.
3. Add the current node to the path.
4. If the current node is a leaf:
   - Save a copy of the current path.
5. Otherwise:
   - Explore the left subtree.
   - Explore the right subtree.
6. Remove the current node from the path before returning.

### 4.4 Python Implementation

```python
def all_paths(root):

    result = []
    path = []

    def dfs(node):

        if node is None:
            return

        path.append(node.data)

        if node.left is None and node.right is None:

            result.append(path.copy())

        else:
            dfs(node.left)
            dfs(node.right)

        path.pop()

    dfs(root)

    return result
```

### 4.5 Dry Run

Tree:

```text
          1
         / \
        2   3
       / \
      4   5
```

Execution:

**Step 1:** Visit node 1.

```text
path = [1]
```

**Step 2:** Visit node 2.

```text
path = [1, 2]
```

**Step 3:** Visit node 4.

```text
path = [1, 2, 4]
```

Node 4 is a leaf.

Save:

```text
result = [[1, 2, 4]]
```

Backtrack:

```text
path = [1, 2]
```

**Step 4:** Visit node 5.

```text
path = [1, 2, 5]
```

Save:

```text
result = [[1, 2, 4], [1, 2, 5]]
```

Backtrack to node 1.

**Step 5:** Visit node 3.

```text
path = [1, 3]
```

Node 3 is a leaf.

Save:

```text
result = [[1, 2, 4], [1, 2, 5], [1, 3]]
```

Final output:

```python
[[1, 2, 4], [1, 2, 5], [1, 3]]
```

### 4.6 Why Do We Use path.copy()?

This is very important.

Consider:

```python
result.append(path)
```

This stores a reference to the same mutable list.

When backtracking modifies the path, previously stored results can also change.

Instead:

```python
result.append(path.copy())
```

This stores a separate copy of the current path.

### 4.7 Backtracking Visualization

```text
             1
           /   \
          2     3
         / \
        4   5
```

Path changes:

```text
[1]
[1, 2]
[1, 2, 4]
[1, 2]       <- Backtrack
[1, 2, 5]
[1, 2]       <- Backtrack
[1]          <- Backtrack
[1, 3]
```

### 4.8 Complexity

Let N be the number of nodes and P be the total size of all returned paths.

- Traversal time: O(N).
- Path copying and output construction: O(P).
- Auxiliary recursion/path space: O(H).

Total time: O(N + P).

### 4.9 Applications

- All root-to-leaf paths.
- Path sum problems.
- Finding paths between two nodes.
- Lowest Common Ancestor related problems.
- Printing paths to a target node.

---

## 5. Subtree Aggregation

### 5.1 Explanation

Subtree aggregation means calculating information about a node using information collected from its left and right subtrees.

We first solve the smaller subtrees and then combine their results.

This is a bottom-up recursion pattern.

Common aggregation operations include:

- Sum of subtree nodes.
- Number of nodes in a subtree.
- Maximum value in a subtree.
- Minimum value in a subtree.
- Height of a subtree.
- Diameter-related calculations.

### 5.2 Example – Calculate Subtree Sum

Problem:

Calculate the sum of every node's subtree.

Tree:

```text
          1
         / \
        2   3
       / \
      4   5
```

Expected subtree sums:

| Node | Subtree Sum |
|---|---:|
| 4 | 4 |
| 5 | 5 |
| 2 | 11 |
| 3 | 3 |
| 1 | 15 |

### 5.3 Formula

```text
subtree_sum(node) =
    node.data
    + subtree_sum(node.left)
    + subtree_sum(node.right)
```

Base case:

```text
subtree_sum(None) = 0
```

### 5.4 Algorithm

1. If the node is None, return 0.
2. Calculate the left subtree sum.
3. Calculate the right subtree sum.
4. Add the current node's value.
5. Store or return the result.

### 5.5 Python Implementation – Return Total Sum

```python
def subtree_sum(root):

    if root is None:
        return 0

    left_sum = subtree_sum(root.left)

    right_sum = subtree_sum(root.right)

    return root.data + left_sum + right_sum
```

### 5.6 Python Implementation – Calculate Every Node's Subtree Sum

```python
def calculate_subtree_sums(root):

    result = {}

    def dfs(node):

        if node is None:
            return 0

        left_sum = dfs(node.left)

        right_sum = dfs(node.right)

        total = node.data + left_sum + right_sum

        result[node.data] = total

        return total

    dfs(root)

    return result
```

For a tree with unique node values:

```python
{
    4: 4,
    5: 5,
    2: 11,
    3: 3,
    1: 15
}
```

Note: If node values are not unique, use node references or unique node identifiers as dictionary keys instead.

### 5.7 Dry Run

For:

```text
          1
         / \
        2   3
       / \
      4   5
```

Calculations happen bottom-up:

```text
Node 4:
4 + 0 + 0 = 4

Node 5:
5 + 0 + 0 = 5

Node 2:
2 + 4 + 5 = 11

Node 3:
3 + 0 + 0 = 3

Node 1:
1 + 11 + 3 = 15
```

Final root subtree sum:

```text
15
```

### 5.8 Complexity

- Time: O(N).
- Auxiliary space: O(H).
- Result dictionary space: O(N).

### 5.9 Applications

- Subtree sum problems.
- Counting nodes in subtrees.
- Maximum subtree sum.
- Checking whether two subtrees are equal.
- Finding the largest BST subtree.
- Tree diameter and height calculations.

---

## 6. Tree Depth and Height

### 6.1 Explanation

Depth and height are two important concepts used in many tree problems.

**Depth:**

The number of edges from the root to a particular node.

**Height:**

The number of edges in the longest downward path from a node to a leaf.

The height of the tree is the height of its root.

### 6.2 Example

```text
             1
           /   \
          2     3
         /
        4
       /
      5
```

Depth:

| Node | Depth |
|---|---:|
| 1 | 0 |
| 2 | 1 |
| 3 | 1 |
| 4 | 2 |
| 5 | 3 |

Height:

| Node | Height |
|---|---:|
| 5 | 0 |
| 4 | 1 |
| 2 | 2 |
| 3 | 0 |
| 1 | 3 |

Therefore:

```text
Tree Height = 3 edges
```

### 6.3 Find Maximum Depth

Problem:

Find the maximum number of nodes from root to leaf.

Implementation:

```python
def max_depth(root):

    if root is None:
        return 0

    left = max_depth(root.left)

    right = max_depth(root.right)

    return 1 + max(left, right)
```

For the previous tree:

```text
Maximum depth = 4 nodes
Height = 3 edges
```

Remember that the term maximum depth in many coding interview problems counts nodes, not edges.

### 6.4 Find Height in Edges

```python
def height(root):

    if root is None:
        return -1

    left = height(root.left)

    right = height(root.right)

    return 1 + max(left, right)
```

For a leaf:

```text
height(leaf) = 0
```

For an empty tree:

```text
height(None) = -1
```

### 6.5 Calculate Depth of Every Node

This uses top-down recursion.

```python
def calculate_depths(root):

    result = {}

    def dfs(node, depth):

        if node is None:
            return

        result[node.data] = depth

        dfs(node.left, depth + 1)

        dfs(node.right, depth + 1)

    dfs(root, 0)

    return result
```

### 6.6 Dry Run

Tree:

```text
          1
         / \
        2   3
       /
      4
```

| Node | Depth |
|---|---:|
| 1 | 0 |
| 2 | 1 |
| 3 | 1 |
| 4 | 2 |

Result:

```python
{
    1: 0,
    2: 1,
    3: 1,
    4: 2
}
```

### 6.7 Complexity

For finding tree height or maximum depth:

- Time: O(N).
- Auxiliary space: O(H).

For calculating all node depths:

- Time: O(N).
- Auxiliary recursion space: O(H).
- Result storage: O(N).

### 6.8 Applications

- Finding maximum tree depth.
- Finding minimum tree depth.
- Checking tree balance.
- Calculating tree diameter.
- Finding deepest leaves.
- Determining whether two nodes are at the same level.
