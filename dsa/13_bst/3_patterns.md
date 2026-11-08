# Binary Search Tree – Patterns

## 1. Inorder Traversal = Sorted Order

### 1.1 Core Idea

One of the most important properties of a Binary Search Tree is:

**Inorder traversal of a BST produces elements in sorted ascending order.**

Inorder traversal follows:

Left → Root → Right

Why does this work?

According to the BST property:

- Every value in the left subtree is smaller than the root.
- The root is smaller than every value in the right subtree.
- Both subtrees independently follow the same property.

Therefore, visiting the left subtree, root, and right subtree naturally produces sorted values.

### 1.2 Example

Consider:

```text
             50
           /    \
         30      70
        /  \    /  \
       20  40  60  80
```

Inorder traversal:

```text
[20, 30, 40, 50, 60, 70, 80]
```

The result is sorted in ascending order.

### 1.3 Pattern 1: Convert BST into Sorted Array

#### Problem

Given a BST, return all its values in sorted order.

#### Python Implementation

```python
def bst_to_sorted_array(root):

    result = []

    def inorder(node):

        if node is None:
            return

        inorder(node.left)

        result.append(node.val)

        inorder(node.right)

    inorder(root)

    return result
```

#### Dry Run

Input:

```text
       30
      /  \
     20  40
```

Execution:

| Step | Action | Result |
|---|---|---|
| 1 | Visit left subtree | |
| 2 | Visit 20 | [20] |
| 3 | Visit 30 | [20, 30] |
| 4 | Visit 40 | [20, 30, 40] |

Output:

```python
[20, 30, 40]
```

Time Complexity: O(n)

Auxiliary Space: O(h), excluding the output array.

### 1.4 Pattern 2: Find Kth Smallest Element

#### Problem

Given a BST and an integer k, find the kth smallest element.

#### Intuition

Since inorder traversal produces sorted values, the kth visited node is the kth smallest element.

We do not need to store the entire sorted array. We can maintain a counter and stop as soon as we visit the kth node.

#### Python Implementation

```python
def kth_smallest(root, k):

    count = 0
    answer = None

    def inorder(node):
        nonlocal count, answer

        if node is None or answer is not None:
            return

        inorder(node.left)

        count += 1

        if count == k:
            answer = node.val
            return

        inorder(node.right)

    inorder(root)

    return answer
```

#### Dry Run

BST:

```text
             50
           /    \
         30      70
        /  \
       20  40
```

Find the 3rd smallest element.

Inorder traversal:

```text
20 → 30 → 40 → 50 → 70
```

| Visited Node | Count |
|---|---:|
| 20 | 1 |
| 30 | 2 |
| 40 | 3 |

We stop at 40.

Output:

```python
40
```

Time Complexity: O(h + k) in the general case, with early termination.

Auxiliary Space: O(h).

### 1.5 Pattern 3: Find Kth Largest Element

The kth largest element can be found by reversing inorder traversal.

Normal inorder:

Left → Root → Right

Reverse inorder:

Right → Root → Left

This produces values in descending order.

#### Python Implementation

```python
def kth_largest(root, k):

    count = 0
    answer = None

    def reverse_inorder(node):
        nonlocal count, answer

        if node is None or answer is not None:
            return

        reverse_inorder(node.right)

        count += 1

        if count == k:
            answer = node.val
            return

        reverse_inorder(node.left)

    reverse_inorder(root)

    return answer
```

#### Example

Inorder:

```text
[20, 30, 40, 50, 60, 70, 80]
```

Reverse inorder:

```text
[80, 70, 60, 50, 40, 30, 20]
```

For k = 2:

Output = 70.

### 1.6 Pattern 4: Validate BST Using Sorted Order

A valid BST must produce a strictly increasing sequence during inorder traversal.

If any value is less than or equal to the previous value, the tree is invalid.

```python
def is_valid_bst(root):

    previous = [float('-inf')]

    def inorder(node):

        if node is None:
            return True

        if not inorder(node.left):
            return False

        if node.val <= previous[0]:
            return False

        previous[0] = node.val

        return inorder(node.right)

    return inorder(root)
```

#### When to Recognize This Pattern

Use the inorder-sorted property when a problem asks for:

- Kth smallest or kth largest element.
- Sorted values from a BST.
- Minimum difference between BST elements.
- Checking whether a BST is valid.
- Finding consecutive values in sorted order.
- Comparing two BSTs based on their sorted elements.

---

## 2. Search-Space Reduction

### 2.1 Core Idea

A BST allows us to eliminate an entire subtree based on a comparison.

At any node:

- If target < current node, ignore the right subtree.
- If target > current node, ignore the left subtree.
- If target == current node, the target is found.

This is similar to binary search, where we repeatedly eliminate half of a sorted search space.

However, a normal BST does not guarantee that its height is logarithmic.

### 2.2 Example: Searching in a BST

```text
             50
           /    \
         30      70
        /  \    /  \
       20  40  60  80
```

Search for 60.

```text
Step 1: 60 > 50
        Eliminate left subtree.

Step 2: 60 < 70
        Eliminate right subtree.

Step 3: 60 == 60
        Found.
```

We visit only three nodes.

### 2.3 Pattern 1: Search for a Value

```python
def search_bst(root, target):

    while root:

        if root.val == target:
            return root

        elif target < root.val:
            root = root.left

        else:
            root = root.right

    return None
```

Time Complexity: O(h).

For a balanced BST: O(log n).

For a skewed BST: O(n).

### 2.4 Pattern 2: Find Closest Value in BST

#### Problem

Given a BST and a target value, find the node whose value is closest to the target.

#### Intuition

We do not need to visit every node.

At each node:

1. Calculate the difference between the current value and target.
2. Update the closest value if the current node is better.
3. Move left or right depending on the target comparison.
4. Continue until reaching an empty position.

#### Python Implementation

```python
def closest_value(root, target):

    closest = root.val

    while root:

        if abs(root.val - target) < abs(closest - target):
            closest = root.val

        if target < root.val:
            root = root.left

        elif target > root.val:
            root = root.right

        else:
            return root.val

    return closest
```

#### Dry Run

BST:

```text
             10
           /    \
          5      15
         / \    /  \
        2   7  12  20
```

Target = 13.

| Current Node | Difference | Closest |
|---|---:|---:|
| 10 | 3 | 10 |
| 15 | 2 | 15 |
| 12 | 1 | 12 |

At 12, move right, but the position is empty.

Output:

```python
12
```

Time Complexity: O(h).

Space Complexity: O(1).

### 2.5 Pattern 3: Find Lowest Common Ancestor (LCA)

#### Problem

Given two nodes p and q in a BST, find their lowest common ancestor.

The lowest common ancestor is the deepest node that is an ancestor of both nodes.

#### Intuition

We can use the BST property to find the point where the two nodes separate.

At the current node:

- If both values are smaller, move left.
- If both values are greater, move right.
- Otherwise, the current node is the split point and therefore the LCA.

#### Python Implementation

```python
def lowest_common_ancestor(root, p, q):

    while root:

        if p < root.val and q < root.val:
            root = root.left

        elif p > root.val and q > root.val:
            root = root.right

        else:
            return root

    return None
```

#### Dry Run

BST:

```text
             50
           /    \
         30      70
        /  \
       20  40
```

Find LCA of 20 and 40.

| Current Node | Comparison | Action |
|---|---|---|
| 50 | Both values < 50 | Move left |
| 30 | 20 < 30 and 40 > 30 | Found LCA |

Output:

```python
30
```

Time Complexity: O(h).

Space Complexity: O(1).

Note: This implementation assumes both target values exist in the BST.

### 2.6 When to Recognize Search-Space Reduction

Use this pattern when a problem asks for:

- Searching for a value.
- Finding the closest value.
- Finding the lowest common ancestor in a BST.
- Finding a value satisfying a comparison condition.
- Navigating toward a particular value without traversing the whole tree.

**Important:** Search-space reduction is effective because of BST ordering, but the actual complexity depends on tree height.

---

## 3. Recursive BST Processing

### 3.1 Core Idea

A BST is recursively structured.

Every node has:

- A left subtree, which is itself a BST.
- A right subtree, which is itself a BST.

Therefore, many BST problems can be solved by applying the same logic to smaller subtrees.

The general recursive structure is:

1. Handle the base case.
2. Process the current node.
3. Recursively process the left subtree.
4. Recursively process the right subtree.
5. Combine or return the results.

Not every problem follows exactly this order. The position of processing depends on the problem.

### 3.2 Common Recursive Traversal Orders

| Traversal | Order | Common Use |
|---|---|---|
| Preorder | Root → Left → Right | Copying or serializing trees |
| Inorder | Left → Root → Right | Sorted BST values |
| Postorder | Left → Right → Root | Deleting or processing children first |

### 3.3 Pattern 1: Recursive Search

```python
def search_bst(root, target):

    if root is None:
        return None

    if root.val == target:
        return root

    if target < root.val:
        return search_bst(root.left, target)

    return search_bst(root.right, target)
```

The same search logic is applied to a smaller subtree at every recursive call.

### 3.4 Pattern 2: Recursive Insertion

```python
def insert_bst(root, val):

    if root is None:
        return TreeNode(val)

    if val < root.val:
        root.left = insert_bst(root.left, val)

    elif val > root.val:
        root.right = insert_bst(root.right, val)

    return root
```

Notice how the recursive function returns the updated subtree.

This is important because a recursive operation may create or replace a subtree root.

### 3.5 Pattern 3: Recursive Deletion

```python
def delete_bst(root, key):

    if root is None:
        return None

    if key < root.val:
        root.left = delete_bst(root.left, key)

    elif key > root.val:
        root.right = delete_bst(root.right, key)

    else:

        if root.left is None:
            return root.right

        if root.right is None:
            return root.left

        successor = root.right

        while successor.left:
            successor = successor.left

        root.val = successor.val

        root.right = delete_bst(root.right, successor.val)

    return root
```

Deletion demonstrates how recursive processing can modify a subtree and return the updated root to its parent.

### 3.6 Pattern 4: Find Height of a BST

#### Problem

Find the maximum depth or height of a binary tree.

#### Intuition

The height of a node is:

1 + maximum height of its left and right subtrees.

#### Python Implementation

```python
def max_depth(root):

    if root is None:
        return 0

    left_height = max_depth(root.left)
    right_height = max_depth(root.right)

    return 1 + max(left_height, right_height)
```

#### Dry Run

```text
       10
      /  \
     5   15
    /
   2
```

| Node | Left Height | Right Height | Result |
|---|---:|---:|---:|
| 2 | 0 | 0 | 1 |
| 5 | 1 | 0 | 2 |
| 15 | 0 | 0 | 1 |
| 10 | 2 | 1 | 3 |

Output:

```python
3
```

Here, height is measured as the number of nodes along the longest root-to-leaf path.

Time Complexity: O(n).

Space Complexity: O(h).

### 3.7 Pattern 5: Recursive Range Validation

The BST validation problem also demonstrates recursive processing.

Each recursive call receives updated constraints from its parent.

```python
def validate_bst(root):

    def helper(node, low, high):

        if node is None:
            return True

        if not low < node.val < high:
            return False

        return (
            helper(node.left, low, node.val)
            and
            helper(node.right, node.val, high)
        )

    return helper(root, float('-inf'), float('inf'))
```

This is an example of passing information from parent to child during recursion.

### 3.8 When to Recognize Recursive BST Processing

Use recursive processing when:

- The problem involves working with subtrees.
- The same operation can be applied to smaller trees.
- You need to calculate a property from child subtrees.
- You need to modify a subtree and return its updated root.
- You need to pass constraints from ancestors to descendants.

**Important interview tip:** Always identify the base case first. Then determine what information the recursive function should receive and what it should return.

---

## 4. Range Queries

### 4.1 Core Idea

A range query in a BST means finding elements that satisfy a given range condition.

For example:

Find all values between L and R.

```text
L <= value <= R
```

A normal binary tree may require visiting every node.

A BST allows us to skip entire subtrees that cannot contain valid values.

This is another application of search-space reduction.

### 4.2 Example

Consider:

```text
             50
           /    \
         30      70
        /  \    /  \
       20  40  60  80
```

Find all elements in the range [30, 70].

Expected output:

```python
[30, 40, 50, 60, 70]
```

We do not need to visit 20 because it is smaller than the lower bound.

Similarly, 80 is greater than the upper bound.

### 4.3 Pattern 1: Find All Values Within a Range

#### Python Implementation

```python
def range_query(root, low, high):

    result = []

    def dfs(node):

        if node is None:
            return

        # Explore left only if it may contain valid values
        if node.val > low:
            dfs(node.left)

        # Include current node if within range
        if low <= node.val <= high:
            result.append(node.val)

        # Explore right only if it may contain valid values
        if node.val < high:
            dfs(node.right)

    dfs(root)

    return result
```

#### Dry Run

Input:

```text
             50
           /    \
         30      70
        /  \    /  \
       20  40  60  80
```

Range:

```python
low = 30
high = 70
```

Execution:

| Node | Action |
|---|---|
| 50 | Include; explore both sides |
| 30 | Include; skip left subtree because 30 is not greater than low |
| 40 | Include |
| 70 | Include; skip right subtree because 70 is not smaller than high |
| 60 | Include |

Output:

```python
[30, 40, 50, 60, 70]
```

Because the traversal is inorder, the output is sorted.

### 4.4 Why Do We Skip Subtrees?

Consider a node with value 30.

If the lower bound is also 30, then every value in its left subtree must be smaller than 30.

Therefore, no value in that subtree can satisfy:

```python
value >= 30
```

So we safely skip the entire left subtree.

Similarly, if the current node is 70 and the upper bound is 70, every value in its right subtree must be greater than 70.

Therefore, we skip the right subtree.

This pruning is the key idea behind efficient BST range queries.

### 4.5 Pattern 2: Find the Smallest Value Greater Than or Equal to a Target

This is useful for finding a ceiling value.

#### Definition

The ceiling of x in a BST is the smallest value that is greater than or equal to x.

#### Python Implementation

```python
def find_ceiling(root, x):

    answer = None

    while root:

        if root.val == x:
            return root.val

        elif root.val > x:
            answer = root.val
            root = root.left

        else:
            root = root.right

    return answer
```

#### Dry Run

BST values:

```python
[20, 30, 40, 50, 60, 70, 80]
```

Find ceiling of 45.

| Current Node | Comparison | Action |
|---|---|---|
| 50 | 50 > 45 | Candidate = 50; move left |
| 30 | 30 < 45 | Move right |
| 40 | 40 < 45 | Move right |
| None | Empty | Return candidate |

Output:

```python
50
```

Time Complexity: O(h).

Space Complexity: O(1).

### 4.6 Pattern 3: Find the Largest Value Less Than or Equal to a Target

This is useful for finding a floor value.

#### Definition

The floor of x in a BST is the largest value that is smaller than or equal to x.

#### Python Implementation

```python
def find_floor(root, x):

    answer = None

    while root:

        if root.val == x:
            return root.val

        elif root.val < x:
            answer = root.val
            root = root.right

        else:
            root = root.left

    return answer
```

#### Dry Run

BST values:

```python
[20, 30, 40, 50, 60, 70, 80]
```

Find floor of 45.

| Current Node | Comparison | Action |
|---|---|---|
| 50 | 50 > 45 | Move left |
| 30 | 30 < 45 | Candidate = 30; move right |
| 40 | 40 < 45 | Candidate = 40; move right |
| None | Empty | Return candidate |

Output:

```python
40
```

### 4.7 Complexity Analysis

| Operation | Time Complexity |
|---|---|
| Range query | O(n) worst case |
| Ceiling | O(h) |
| Floor | O(h) |

Range query can be faster than O(n) when pruning eliminates large portions of the tree.

For a balanced BST, a range query that returns k elements can be bounded by O(log n + k) in the usual analysis.

For a skewed tree, it can degrade to O(n).

### 4.8 When to Recognize This Pattern

Use range-query patterns when problems ask for:

- All values between two limits.
- Values greater than or equal to a target.
- Values smaller than or equal to a target.
- Ceiling or floor of a value.
- Counting values in a given range.
- Finding the nearest valid value in an ordered collection.

---

## 5. Successor and Predecessor

### 5.1 Core Idea

Successor and predecessor are based on the sorted order of BST elements.

- Inorder successor: The smallest value greater than the given value.
- Inorder predecessor: The largest value smaller than the given value.

They are useful when a problem asks for the next or previous element in an ordered collection.

### 5.2 Example

Consider:

```text
             50
           /    \
         30      70
        /  \    /  \
       20  40  60  80
```

Inorder:

```text
20 → 30 → 40 → 50 → 60 → 70 → 80
```

For node 50:

- Predecessor = 40
- Successor = 60

### 5.3 Pattern 1: Find Inorder Successor

There are two cases.

#### Case 1: Right Subtree Exists

The successor is the minimum value in the right subtree.

```text
       50
         \
          70
         /
        60
```

Successor of 50 = 60.

#### Case 2: Right Subtree Does Not Exist

Move upward until we find an ancestor for which the current node is in its left subtree.

That ancestor is the successor.

#### Python Implementation (Without Parent Pointer)

We can find the successor of a given key directly using the BST ordering property.

```python
def inorder_successor(root, key):

    successor = None

    while root:

        if key < root.val:
            successor = root
            root = root.left

        else:
            root = root.right

    return successor
```

#### Dry Run

BST:

```text
             50
           /    \
         30      70
                /  \
               60  80
```

Find successor of 50.

| Current Node | Comparison | Candidate |
|---|---|---|
| 50 | Equal | None |
| 70 | 50 < 70 | 70 |
| 60 | 50 < 60 | 60 |
| None | Empty | Return 60 |

Output:

```python
60
```

This implementation finds the smallest value strictly greater than the key.

### 5.4 Pattern 2: Find Inorder Predecessor

#### Case 1: Left Subtree Exists

The predecessor is the maximum value in the left subtree.

#### Case 2: Left Subtree Does Not Exist

Move upward until we find an ancestor for which the current node lies in its right subtree.

#### Python Implementation

```python
def inorder_predecessor(root, key):

    predecessor = None

    while root:

        if key > root.val:
            predecessor = root
            root = root.right

        else:
            root = root.left

    return predecessor
```

#### Dry Run

BST:

```text
             50
           /    \
         30      70
        /  \
       20  40
```

Find predecessor of 50.

| Current Node | Comparison | Candidate |
|---|---|---|
| 50 | Equal | None |
| 30 | 50 > 30 | 30 |
| 40 | 50 > 40 | 40 |
| None | Empty | Return 40 |

Output:

```python
40
```

### 5.5 Important Difference: Key-Based vs Node-Based

There are two common versions of successor and predecessor problems.

**Version 1: Given a key**

Find the smallest value greater than the key or the largest value smaller than the key.

The iterative implementations above solve this version.

**Version 2: Given a node with parent pointers**

If each node has a reference to its parent, we can use the node's children and ancestors directly.

For successor:

- If a right child exists, find the leftmost node in the right subtree.
- Otherwise, move upward until reaching an ancestor where the current node is in its left subtree.

For predecessor:

- If a left child exists, find the rightmost node in the left subtree.
- Otherwise, move upward until reaching an ancestor where the current node is in its right subtree.

### 5.6 Complexity Analysis

| Operation | Time | Space |
|---|---|---|
| Successor | O(h) | O(1) |
| Predecessor | O(h) | O(1) |

### 5.7 When to Recognize This Pattern

Use successor/predecessor patterns when problems ask for:

- Next greater element in a BST.
- Previous smaller element in a BST.
- Next or previous value in sorted order.
- Finding neighboring values without generating the entire sorted array.
- Replacing a node during BST deletion.
- Navigating an ordered data structure.
