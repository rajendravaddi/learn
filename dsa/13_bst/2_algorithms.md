# BST - Algorithms

## 1. BST Search

### 1.1 Problem

Given the root of a BST and a target value, determine whether the target exists.

If it exists, return the corresponding node. Otherwise, return None.

### 1.2 Intuition

We use the BST property to decide which direction to move.

At every node:

1. If the target equals the current node's value, we found it.
2. If the target is smaller, search the left subtree.
3. If the target is greater, search the right subtree.
4. If we reach None, the target does not exist.

### 1.3 Algorithm

1. Start at the root.
2. Compare the target with the current node.
3. If equal, return the node.
4. If smaller, move to the left child.
5. If greater, move to the right child.
6. Repeat until the target is found or the current node becomes None.

### 1.4 Recursive Python Implementation

```python
def search_bst(root, target):

    # Base case: empty tree or target found
    if root is None or root.val == target:
        return root

    # Search left subtree
    if target < root.val:
        return search_bst(root.left, target)

    # Search right subtree
    return search_bst(root.right, target)
```

### 1.5 Iterative Python Implementation

```python
def search_bst_iterative(root, target):

    while root:

        if root.val == target:
            return root

        elif target < root.val:
            root = root.left

        else:
            root = root.right

    return None
```

### 1.6 Dry Run

Consider:

```text
             50
           /    \
         30      70
        /  \    /  \
       20  40  60  80
```

Search for 60.

| Step | Current Node | Comparison | Action |
|---|---:|---|---|
| 1 | 50 | 60 > 50 | Move right |
| 2 | 70 | 60 < 70 | Move left |
| 3 | 60 | 60 == 60 | Found |

Result: Node containing 60.

### 1.7 Complexity Analysis

| Case | Time Complexity |
|---|---|
| Best | O(1) |
| Balanced BST | O(log n) |
| Skewed BST | O(n) |

Space complexity:

- Recursive: O(h), due to recursion stack.
- Iterative: O(1).

---

## 2. BST Insertion

### 2.1 Problem

Given the root of a BST and a new value, insert the value into the correct position while maintaining the BST property.

Assumption: Duplicate values are ignored.

### 2.2 Intuition

Insertion follows the same comparison process as searching.

The difference is that instead of stopping when we find the target, we stop when we reach an empty child position.

The new node is inserted at that position.

### 2.3 Algorithm

1. Start at the root.
2. If the tree is empty, create a new node.
3. Compare the new value with the current node.
4. If smaller, move left.
5. If greater, move right.
6. Repeat until an empty position is found.
7. Insert the new node at that position.

### 2.4 Recursive Python Implementation

```python
class TreeNode:

    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None


def insert_bst(root, val):

    # Create a new node when an empty position is found
    if root is None:
        return TreeNode(val)

    if val < root.val:
        root.left = insert_bst(root.left, val)

    elif val > root.val:
        root.right = insert_bst(root.right, val)

    return root
```

### 2.5 Iterative Python Implementation

```python
def insert_bst_iterative(root, val):

    new_node = TreeNode(val)

    if root is None:
        return new_node

    current = root

    while True:

        if val < current.val:

            if current.left is None:
                current.left = new_node
                break

            current = current.left

        elif val > current.val:

            if current.right is None:
                current.right = new_node
                break

            current = current.right

        else:
            # Duplicate value
            break

    return root
```

### 2.6 Dry Run

Insert 65 into:

```text
             50
           /    \
         30      70
                /  \
               60  80
```

| Step | Current Node | Comparison | Action |
|---|---:|---|---|
| 1 | 50 | 65 > 50 | Move right |
| 2 | 70 | 65 < 70 | Move left |
| 3 | 60 | 65 > 60 | Move right |
| 4 | None | Empty position | Insert 65 |

Result:

```text
             50
           /    \
         30      70
                /  \
               60  80
                 \
                  65
```

### 2.7 Important Observation

In recursive insertion, we must assign the returned subtree back to its corresponding child.

```python
root.left = insert_bst(root.left, val)
```

Why?

Because insertion may create a new node at an empty position, and we must connect that node to its parent.

We also return the root so that the original tree remains accessible.

### 2.8 Complexity Analysis

| Case | Time Complexity |
|---|---|
| Best | O(1) |
| Balanced BST | O(log n) |
| Skewed BST | O(n) |

Space complexity:

- Recursive: O(h).
- Iterative: O(1).

---

## 3. BST Minimum and Maximum

### 3.1 Minimum Value

The minimum value in a BST is always present at the **leftmost node**.

Why?

Every left child contains a smaller value than its parent.

Therefore, by repeatedly moving left, we eventually reach the smallest value.

Example:

```text
             50
           /    \
         30      70
        /  \    /  \
       20  40  60  80
```

The leftmost node is 20.

Therefore:

Minimum = 20.

### 3.2 Maximum Value

The maximum value in a BST is always present at the **rightmost node**.

Every right child contains a greater value than its parent.

Therefore, by repeatedly moving right, we eventually reach the largest value.

In the above tree:

Maximum = 80.

### 3.3 Algorithm

**Minimum:**

1. Start at the root.
2. Keep moving left while a left child exists.
3. The last node is the minimum.

**Maximum:**

1. Start at the root.
2. Keep moving right while a right child exists.
3. The last node is the maximum.

### 3.4 Python Implementation

```python
def find_min(root):

    if root is None:
        return None

    while root.left:
        root = root.left

    return root


def find_max(root):

    if root is None:
        return None

    while root.right:
        root = root.right

    return root
```

### 3.5 Dry Run

Find minimum and maximum in:

```text
             50
           /    \
         30      70
        /  \    /  \
       20  40  60  80
```

**Minimum:**

```text
50 → 30 → 20 → None
```

Minimum = 20.

**Maximum:**

```text
50 → 70 → 80 → None
```

Maximum = 80.

### 3.6 Complexity Analysis

| Operation | Time Complexity | Auxiliary Space |
|---|---|---|
| Minimum | O(h) | O(1) |
| Maximum | O(h) | O(1) |

For a balanced BST: O(log n).

For a skewed BST: O(n).

If the tree is empty, minimum and maximum are undefined.

---

## 4. BST Deletion

### 4.1 Problem

Given the root of a BST and a target value, delete the node containing that value while maintaining the BST property.

Deletion is more complicated than searching and insertion because the node being deleted may have children.

### 4.2 Three Cases of Deletion

There are three possible situations.

#### Case 1: Node Has No Children

The node is a leaf node.

Simply remove it by returning None.

Before:

```text
       50
      /  \
     30  70
```

Delete 30.

After:

```text
       50
         \
         70
```

#### Case 2: Node Has One Child

Replace the node with its only child.

Before:

```text
       50
      /
     30
       \
        40
```

Delete 30.

After:

```text
       50
      /
     40
```

#### Case 3: Node Has Two Children

We cannot directly remove the node because it has two subtrees.

Instead, we:

1. Find the inorder successor (smallest value in the right subtree).
2. Copy its value into the node being deleted.
3. Delete the original successor node from the right subtree.

Alternatively, we can use the inorder predecessor (largest value in the left subtree).

Before:

```text
             50
           /    \
         30      70
        /  \    /  \
       20  40  60  80
```

Delete 50.

The inorder successor of 50 is 60.

Replace 50 with 60:

```text
             60
           /    \
         30      70
        /  \    /  \
       20  40  60  80
```

Now delete the original 60:

```text
             60
           /    \
         30      70
        /  \      \
       20  40     80
```

The BST property is maintained.

### 4.3 Algorithm

1. Search for the node to delete.
2. If the node does not exist, return the tree unchanged.
3. If the node has no children, remove it.
4. If the node has one child, replace it with that child.
5. If the node has two children:
   - Find the inorder successor.
   - Replace the node's value with the successor's value.
   - Delete the original successor.
6. Return the updated root.

### 4.4 Recursive Python Implementation

```python
def delete_bst(root, key):

    # Base case: value not found
    if root is None:
        return None

    # Search for the node
    if key < root.val:
        root.left = delete_bst(root.left, key)

    elif key > root.val:
        root.right = delete_bst(root.right, key)

    else:

        # Case 1 and Case 2:
        # No left child or only right child
        if root.left is None:
            return root.right

        # Only left child
        if root.right is None:
            return root.left

        # Case 3: Two children

        # Find inorder successor
        successor = find_min(root.right)

        # Replace current node's value
        root.val = successor.val

        # Delete original successor
        root.right = delete_bst(root.right, successor.val)

    return root
```

### 4.5 Dry Run

Delete 50 from:

```text
             50
           /    \
         30      70
                /  \
               60  80
```

| Step | Operation | Result |
|---|---|---|
| 1 | Find 50 | Target found |
| 2 | Check children | Two children |
| 3 | Find minimum in right subtree | 60 |
| 4 | Replace 50 with 60 | Root becomes 60 |
| 5 | Delete original 60 | Remove leaf node |
| 6 | Return root | Updated BST |

Final tree:

```text
             60
           /    \
         30      70
                   \
                    80
```

### 4.6 Complexity Analysis

| Operation | Time Complexity |
|---|---|
| Finding node | O(h) |
| Finding successor | O(h) |
| Deleting successor | O(h) |
| Overall deletion | O(h) |

Auxiliary space: O(h) due to recursion.

For a balanced BST: O(log n).

For a skewed BST: O(n).

---

## 5. Inorder Traversal

### 5.1 What is Inorder Traversal?

Inorder traversal is a tree traversal technique in which we visit nodes in this order:

1. Left subtree.
2. Root node.
3. Right subtree.

It is commonly represented as:

**Left → Root → Right (LNR)**

An important property:

**Inorder traversal of a BST produces values in sorted ascending order.**

### 5.2 Why Does It Produce Sorted Order?

Consider:

```text
             50
           /    \
         30      70
        /  \    /  \
       20  40  60  80
```

According to the BST property:

- Every value in the left subtree is smaller than 50.
- Every value in the right subtree is greater than 50.
- Both subtrees follow the same ordering rule.

Therefore, visiting left subtree, root, and right subtree produces:

```python
[20, 30, 40, 50, 60, 70, 80]
```

### 5.3 Recursive Algorithm

1. If the current node is None, return.
2. Recursively visit the left subtree.
3. Process the current node.
4. Recursively visit the right subtree.

### 5.4 Recursive Python Implementation

```python
def inorder(root):

    result = []

    def dfs(node):

        if node is None:
            return

        # Left
        dfs(node.left)

        # Root
        result.append(node.val)

        # Right
        dfs(node.right)

    dfs(root)

    return result
```

### 5.5 Dry Run

Consider:

```text
       30
      /  \
     20  40
```

| Step | Action | Result |
|---|---|---|
| 1 | Visit left subtree | |
| 2 | Visit 20 | [20] |
| 3 | Visit 30 | [20, 30] |
| 4 | Visit 40 | [20, 30, 40] |

Final output:

```python
[20, 30, 40]
```

### 5.6 Iterative Algorithm

Recursion internally uses a call stack.

We can implement inorder traversal explicitly using a stack.

1. Initialize an empty stack.
2. Start from the root.
3. Keep pushing nodes while moving left.
4. When no left child exists, pop the top node.
5. Process that node.
6. Move to its right subtree.
7. Repeat until both the current node and stack are empty.

### 5.7 Iterative Python Implementation

```python
def inorder_iterative(root):

    result = []
    stack = []
    current = root

    while current or stack:

        # Go to the leftmost node
        while current:
            stack.append(current)
            current = current.left

        # Process the node
        current = stack.pop()
        result.append(current.val)

        # Move to the right subtree
        current = current.right

    return result
```

### 5.8 Complexity Analysis

| Metric | Complexity |
|---|---|
| Time | O(n) |
| Recursive auxiliary space | O(h) |
| Iterative auxiliary space | O(h) |
| Output space | O(n) |

Every node is visited exactly once.

---

## 6. Validate BST

### 6.1 Problem

Given the root of a binary tree, determine whether it is a valid Binary Search Tree.

A valid BST must satisfy:

- Every value in the left subtree is smaller than the current node.
- Every value in the right subtree is greater than the current node.
- Both subtrees must independently satisfy the same property.

Duplicate values are not allowed.

### 6.2 Common Mistake

A common incorrect approach is checking only immediate children.

Consider:

```text
             10
           /    \
          5      15
                /  \
               6   20
```

At first glance:

- 5 < 10.
- 15 > 10.
- 6 < 15.
- 20 > 15.

All immediate parent-child comparisons look correct.

But the tree is NOT a valid BST.

Why?

The value 6 is in the right subtree of 10, but 6 < 10.

Therefore, it violates the BST property.

**Important:** Every node must satisfy the constraints imposed by all its ancestors, not just its immediate parent.

### 6.3 Approach 1: Range-Based Recursion

#### Intuition

For every node, maintain an allowed range.

- Initially, the root can have any value.
- For the left subtree, the maximum allowed value becomes the current node's value.
- For the right subtree, the minimum allowed value becomes the current node's value.

If any node violates its allowed range, the tree is invalid.

#### Algorithm

1. Start with the range (-∞, +∞).
2. If the node is None, return True.
3. Check whether the current value lies strictly inside the allowed range.
4. Validate the left subtree with the updated upper bound.
5. Validate the right subtree with the updated lower bound.
6. Return True only if both subtrees are valid.

#### Python Implementation

```python
def is_valid_bst(root):

    def validate(node, low, high):

        if node is None:
            return True

        # Check current node's allowed range
        if not (low < node.val < high):
            return False

        # Validate left subtree
        if not validate(node.left, low, node.val):
            return False

        # Validate right subtree
        if not validate(node.right, node.val, high):
            return False

        return True

    return validate(root, float('-inf'), float('inf'))
```

#### Dry Run: Valid BST

```text
             10
           /    \
          5      15
         / \    /  \
        2   7  12  20
```

| Node | Allowed Range | Valid? |
|---|---|---|
| 10 | (-∞, ∞) | Yes |
| 5 | (-∞, 10) | Yes |
| 2 | (-∞, 5) | Yes |
| 7 | (5, 10) | Yes |
| 15 | (10, ∞) | Yes |
| 12 | (10, 15) | Yes |
| 20 | (15, ∞) | Yes |

Result:

```python
True
```

#### Dry Run: Invalid BST

```text
             10
           /    \
          5      15
                /
               6
```

| Node | Allowed Range | Valid? |
|---|---|---|
| 10 | (-∞, ∞) | Yes |
| 5 | (-∞, 10) | Yes |
| 15 | (10, ∞) | Yes |
| 6 | (10, 15) | No |

The value 6 is smaller than the allowed lower bound 10.

Result:

```python
False
```

### 6.4 Approach 2: Inorder Traversal

#### Intuition

Inorder traversal of a valid BST produces values in strictly increasing order.

Therefore, we can validate a BST by checking whether every visited value is greater than the previously visited value.

If the current value is less than or equal to the previous value, the tree is invalid.

#### Python Implementation

```python
def is_valid_bst_inorder(root):

    previous = [float('-inf')]

    def inorder(node):

        if node is None:
            return True

        # Validate left subtree
        if not inorder(node.left):
            return False

        # Check current value
        if node.val <= previous[0]:
            return False

        previous[0] = node.val

        # Validate right subtree
        return inorder(node.right)

    return inorder(root)
```

We use a list to maintain the previous value because it can be modified inside the nested recursive function.

#### Example: Valid BST

Inorder output:

```python
[2, 5, 7, 10, 12, 15, 20]
```

Every value is greater than the previous value.

Result:

```python
True
```

#### Example: Invalid BST

Inorder output:

```python
[5, 10, 6, 15]
```

10 is followed by 6, which is smaller.

Result:

```python
False
```

### 6.5 Comparing Both Approaches

| Feature | Range-Based | Inorder-Based |
|---|---|---|
| Main idea | Maintain valid ranges | Check sorted order |
| Time | O(n) | O(n) |
| Auxiliary space | O(h) | O(h) |
| Early termination | Yes | Yes |
| Directly uses BST property | Yes | Indirectly |

Recommendation: Prefer range-based validation in interviews because it directly verifies the BST property and handles ancestor constraints explicitly.

---

## 7. Inorder Predecessor

### 7.1 What is an Inorder Predecessor?

The inorder predecessor of a node is the node that comes immediately before it in the inorder traversal of the BST.

In simple terms:

**It is the largest value that is smaller than the given node's value.**

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
20 → 30 → 40 → 50 → 60 → 70 → 80
```

Therefore:

| Node | Predecessor |
|---|---|
| 20 | None |
| 30 | 20 |
| 40 | 30 |
| 50 | 40 |
| 60 | 50 |
| 70 | 60 |
| 80 | 70 |

### 7.2 How to Find the Predecessor?

There are two cases.

#### Case 1: Node Has a Left Subtree

The predecessor is the maximum value in its left subtree.

In other words, it is the rightmost node of the left subtree.

Example:

```text
       50
      /
     30
    /  \
   20  40
```

The rightmost node of the left subtree is 40.

Therefore, predecessor = 40.

#### Case 2: Node Does Not Have a Left Subtree

Move upward through the ancestors until finding an ancestor for which the current node lies in its right subtree.

That ancestor is the predecessor.

Example:

```text
         50
        /
      30
        \
         40
```

For node 40:

- It does not have a left subtree.
- 40 is the right child of 30.
- Therefore, its predecessor is 30.

### 7.3 Algorithm for Finding Predecessor by Key

When only the key is given, we can maintain a predecessor candidate while searching.

1. Start at the root.
2. If the key is greater than the current value:
   - Current node is a possible predecessor.
   - Move right.
3. Otherwise, move left.
4. Continue until the search ends.
5. Return the candidate.

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

### 7.4 Dry Run

Find the predecessor of 50.

```text
             50
           /    \
         30      70
        /  \
       20  40
```

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

This key-based implementation returns the largest value strictly smaller than the key.

### 7.5 Complexity Analysis

Time complexity: O(h).

Space complexity: O(1).

The predecessor of the minimum element does not exist.

---

## 8. Inorder Successor

### 8.1 What is an Inorder Successor?

The inorder successor of a node is the node that comes immediately after it in the inorder traversal of the BST.

In simple terms:

**It is the smallest value that is greater than the given node's value.**

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
20 → 30 → 40 → 50 → 60 → 70 → 80
```

Therefore:

| Node | Successor |
|---|---|
| 20 | 30 |
| 30 | 40 |
| 40 | 50 |
| 50 | 60 |
| 60 | 70 |
| 70 | 80 |
| 80 | None |

### 8.2 How to Find the Successor?

There are two cases.

#### Case 1: Node Has a Right Subtree

The successor is the minimum value in its right subtree.

In other words, it is the leftmost node of the right subtree.

Example:

```text
       50
         \
          70
         /  \
        60  80
```

The minimum value in the right subtree is 60.

Therefore, successor = 60.

#### Case 2: Node Does Not Have a Right Subtree

Move upward through the ancestors until finding an ancestor for which the current node lies in its left subtree.

That ancestor is the successor.

Example:

```text
         50
        /
      30
        \
         40
```

For node 40:

- It does not have a right subtree.
- 40 is the right child of 30, so move upward.
- 30 is the left child of 50.

Therefore, successor = 50.

### 8.3 Algorithm for Finding Successor by Key

When only the key is given, we maintain a successor candidate while searching.

1. Start at the root.
2. If the key is smaller than the current value:
   - Current node is a possible successor.
   - Move left.
3. Otherwise, move right.
4. Continue until the search ends.
5. Return the candidate.

#### Python Implementation

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

### 8.4 Dry Run

Find the successor of 50.

```text
             50
           /    \
         30      70
                /  \
               60  80
```

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

This key-based implementation returns the smallest value strictly greater than the key.

### 8.5 Complexity Analysis

Time complexity: O(h).

Space complexity: O(1).

The successor of the maximum element does not exist.

---

## 9. Important Connection: Minimum, Maximum, Successor and Predecessor

These operations are closely related.

| Operation | How to Find |
|---|---|
| Minimum | Leftmost node |
| Maximum | Rightmost node |
| Predecessor with left subtree | Maximum of left subtree |
| Successor with right subtree | Minimum of right subtree |

Remember:

- Predecessor means previous smaller value.
- Successor means next greater value.

These concepts are especially important in BST deletion when the node has two children.