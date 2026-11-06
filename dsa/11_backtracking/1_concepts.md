# Backtracking Concepts

## 1. State

### 1.1 Explanation

A **State** represents the current situation or configuration of a problem at a particular point during the backtracking process.

In backtracking, we build a solution step by step. At every step, we need to remember what decisions have already been made.

That information is called the state.

A state may contain:

- Elements selected so far.
- Current position or index.
- Current path.
- Remaining target.
- Visited elements.
- Current board configuration.
- Number of choices already made.

**Example: Generate subsets**

Given:

```text
nums = [1, 2, 3]
```

Suppose we are generating subsets.

Initially:

```text
current = []
```

After choosing 1:

```text
current = [1]
```

After choosing 2:

```text
current = [1, 2]
```

Here, `current` represents the state of our solution.

As we make decisions, the state changes.

### 1.2 Algorithm

1. Initialize an empty state.
2. Make a decision.
3. Update the state based on that decision.
4. Pass the updated state to the recursive function.
5. Restore the state when necessary to explore another possibility.

### 1.3 Dry Run

Input:

```text
nums = [1, 2]
```

We want to generate subsets.

| Step | Operation | Current state |
|---|---|---|
| 1 | Start | [] |
| 2 | Choose 1 | [1] |
| 3 | Choose 2 | [1, 2] |
| 4 | Unchoose 2 | [1] |
| 5 | Unchoose 1 | [] |
| 6 | Choose 2 | [2] |
| 7 | Unchoose 2 | [] |

The state changes according to the decisions made.

### 1.4 Python Implementation

```python
def subsets(nums):

    result = []
    current = []

    def backtrack(index):

        # Base case
        if index == len(nums):
            result.append(current.copy())
            return

        # Choose current element
        current.append(nums[index])

        backtrack(index + 1)

        # Restore previous state
        current.pop()

        # Skip current element
        backtrack(index + 1)

    backtrack(0)

    return result


print(subsets([1, 2]))
```

**Output:**

```text
[[1, 2], [1], [2], []]
```

### 1.5 Important Observations

- State represents the current progress of a solution.
- State changes whenever we make a decision.
- It is usually maintained using function parameters or mutable data structures.
- State must be restored before exploring another branch when mutable data is shared.
- Always use `copy()` when storing a mutable state in the result.

**Recognition clue:** Ask yourself, "What information do I need to remember at this particular step?"

That information forms your state.

---

## 2. Choices

### 2.1 Explanation

**Choices** are the possible decisions we can make at every step of a backtracking problem.

Backtracking explores different possibilities by selecting one choice at a time.

For example, when generating subsets, every element gives us two choices:

1. Include the element.
2. Exclude the element.

For permutations, we can choose any unused element.

For a maze, we can choose among valid movement directions.

For N-Queens, we can choose a column in which to place a queen.

The available choices depend on the current state.

### 2.2 Example: Generate All Subsets

Given:

```text
nums = [1, 2]
```

For element 1:

- Choose 1.
- Skip 1.

For element 2:

- Choose 2.
- Skip 2.

This creates different possible subsets.

### 2.3 Algorithm

1. Identify the current decision point.
2. Find all available choices.
3. Select one choice.
4. Update the state.
5. Explore recursively.
6. Undo the choice.
7. Try the next available choice.

### 2.4 Dry Run

Input:

```text
nums = [1, 2]
```

At the first position:

```text
Choices = {Include 1, Exclude 1}
```

If we include 1:

```text
current = [1]
```

Now we reach the second position:

```text
Choices = {Include 2, Exclude 2}
```

Possible outcomes:

```text
[1, 2]
[1]
```

If we exclude 1:

```text
current = []
```

At the second position, we again have two choices:

```text
[2]
[]
```

Final subsets:

```text
[[1, 2], [1], [2], []]
```

### 2.5 Python Implementation

```python
def subsets(nums):

    result = []
    current = []

    def backtrack(index):

        if index == len(nums):
            result.append(current.copy())
            return

        # Choice 1: Include the element
        current.append(nums[index])
        backtrack(index + 1)

        # Undo choice 1
        current.pop()

        # Choice 2: Exclude the element
        backtrack(index + 1)

    backtrack(0)

    return result


print(subsets([1, 2, 3]))
```

**Output:**

```text
[[1, 2, 3], [1, 2], [1, 3], [1],
 [2, 3], [2], [3], []]
```

### 2.6 Important Observations

- Every backtracking problem has a set of possible choices.
- Choices depend on the current state.
- Not every theoretical choice is necessarily valid.
- Exploring choices recursively creates different possible solutions.

**Recognition clue:** Ask yourself, "What are all the possible decisions I can make at this step?"

---

## 3. Constraints

### 3.1 Explanation

**Constraints** are the rules or conditions that determine whether a particular choice is allowed.

A backtracking problem may have many possible choices, but not every choice produces a valid solution.

Constraints help us identify invalid choices before exploring them further.

Examples:

**N-Queens:**
- No two queens can share the same row.
- No two queens can share the same column.
- No two queens can share the same diagonal.

**Sudoku:**
- Each row must contain digits 1–9 without repetition.
- Each column must contain digits 1–9 without repetition.
- Each 3 × 3 box must contain digits 1–9 without repetition.

**Combination Sum:**
- The selected elements must satisfy the target sum.
- Depending on the problem, elements may or may not be reused.

### 3.2 Example: Combination Sum

Given:

```text
candidates = [2, 3, 5]
target = 8
```

Find combinations whose sum equals 8.

Some possible combinations:

```text
[2, 2, 2, 2]
[2, 3, 3]
[3, 5]
```

A choice is valid only if it does not violate the target condition.

For example:

```text
current_sum = 5
next choice = 5
```

The new sum becomes:

```text
5 + 5 = 10
```

Since 10 exceeds the target 8, we reject this choice.

### 3.3 Algorithm

1. Start with an empty combination.
2. Track the remaining target.
3. At every step, select a candidate.
4. Check whether the candidate violates any constraints.
5. If valid, add it to the current combination.
6. Explore recursively.
7. Remove the candidate before trying another possibility.
8. Stop when the target is reached or no valid choices remain.

### 3.4 Dry Run

Input:

```text
candidates = [2, 3, 5]
target = 8
```

Start:

```text
current = []
remaining = 8
```

Choose 2:

```text
current = [2]
remaining = 6
```

Choose 2 again:

```text
current = [2, 2]
remaining = 4
```

Choose 2 again:

```text
current = [2, 2, 2]
remaining = 2
```

Choose 2:

```text
current = [2, 2, 2, 2]
remaining = 0
```

Constraint satisfied. Save the combination.

Another possibility:

```text
[2, 3, 3]
```

Another possibility:

```text
[3, 5]
```

Invalid branch example:

```text
current = [5]
remaining = 3
```

Trying 5 again:

```text
remaining = 3 - 5 = -2
```

The remaining target becomes negative, so this branch cannot produce a valid solution with positive candidates.

### 3.5 Python Implementation

```python
def combination_sum(candidates, target):

    result = []
    current = []

    def backtrack(start, remaining):

        # Valid solution found
        if remaining == 0:
            result.append(current.copy())
            return

        # No valid solution possible
        if remaining < 0:
            return

        for i in range(start, len(candidates)):

            # Choose
            current.append(candidates[i])

            # Explore
            # i allows the same element to be reused
            backtrack(i, remaining - candidates[i])

            # Unchoose
            current.pop()

    backtrack(0, target)

    return result


print(combination_sum([2, 3, 5], 8))
```

**Output:**

```text
[[2, 2, 2, 2], [2, 3, 3], [3, 5]]
```

### 3.6 Important Observations

- Constraints define valid and invalid solutions.
- A constraint check should happen before exploring an invalid branch.
- Constraints depend on the problem.
- Early constraint checking can significantly reduce unnecessary recursion.

**Recognition clue:** If a problem contains rules that a valid solution must satisfy, identify those rules as constraints.

---

## 4. Decision Tree

### 4.1 Explanation

A **Decision Tree** is a tree-like representation of all possible decisions in a backtracking problem.

Each node represents a particular state.

Each edge represents a choice.

Each path from the root to a leaf represents a sequence of decisions.

Some leaves represent valid solutions, while others represent invalid or incomplete possibilities.

A decision tree helps us visualize:

- All possible choices.
- How choices create branches.
- Which branches lead to valid solutions.
- Where backtracking happens.
- Where pruning can eliminate unnecessary branches.

### 4.2 Example: Generate Subsets

Given:

```text
nums = [1, 2]
```

At each level, we decide whether to include or exclude an element.

Decision tree:

```text
                    []
                  /    \
              Include 1  Skip 1
                [1]        []
               /  \       /  \
          Include 2 Skip 2 Include 2 Skip 2
             [1,2]  [1]     [2]      []
```

The tree contains four leaves.

Therefore, the total number of subsets is:

```text
2² = 4
```

### 4.3 Algorithm

1. Create the initial state as the root.
2. Identify all possible choices.
3. Create a child node for every choice.
4. Continue recursively until a stopping condition is reached.
5. Identify valid solutions among the leaf nodes.

### 4.4 Dry Run

Input:

```text
nums = [1, 2, 3]
```

At level 0, decide whether to include 1.

At level 1, decide whether to include 2.

At level 2, decide whether to include 3.

The decision tree has:

| Level | Decisions completed | Number of nodes |
|---|---|---:|
| 0 | 0 | 1 |
| 1 | 1 | 2 |
| 2 | 2 | 4 |
| 3 | 3 | 8 |

Total leaves:

```text
2³ = 8
```

Total subsets:

```text
8
```

### 4.5 Python Implementation

```python
def decision_tree_subsets(nums):

    result = []
    current = []

    def build_tree(index):

        if index == len(nums):
            result.append(current.copy())
            return

        # Left branch: Include
        current.append(nums[index])
        build_tree(index + 1)

        # Restore state
        current.pop()

        # Right branch: Exclude
        build_tree(index + 1)

    build_tree(0)

    return result


print(decision_tree_subsets([1, 2, 3]))
```

**Output:**

```text
[[1, 2, 3], [1, 2], [1, 3], [1],
 [2, 3], [2], [3], []]
```

### 4.6 Complexity Analysis

For n elements, each element produces two branches.

| Complexity | Value |
|---|---|
| Number of leaves | 2ⁿ |
| Total decision-tree nodes | 2ⁿ⁺¹ - 1 |
| Time | O(n × 2ⁿ), including output copying |
| Auxiliary space | O(n), excluding output |

### 4.7 Important Observations

- Every node represents a state.
- Every edge represents a decision.
- A root-to-leaf path represents one complete sequence of decisions.
- A decision tree can be used to visualize branching recursion.
- Pruning removes branches that cannot produce valid solutions.

**Recognition clue:** If a problem requires exploring different combinations of decisions, drawing its decision tree can help you understand the solution.

---

## 5. Backtracking

### 5.1 Explanation

**Backtracking** is an algorithmic technique that explores possible solutions step by step and reverses previous decisions whenever necessary.

It follows three fundamental operations:

```text
Choose → Explore → Unchoose
```

The process is:

1. Make a choice.
2. Check whether the choice is valid.
3. Explore further using recursion.
4. Undo the choice.
5. Try another possibility.

Backtracking is essentially a systematic way of exploring a decision tree.

It is used when we need to find:

- One valid solution.
- All valid solutions.
- The best solution among multiple possibilities.

Common examples:

- Subsets.
- Permutations.
- Combinations.
- N-Queens.
- Sudoku.
- Maze solving.

### 5.2 Example: Generate All Permutations

Given:

```text
nums = [1, 2, 3]
```

Generate every possible arrangement.

Expected permutations:

```text
[1, 2, 3]
[1, 3, 2]
[2, 1, 3]
[2, 3, 1]
[3, 1, 2]
[3, 2, 1]
```

Unlike subsets, permutations require every element to appear exactly once in each arrangement.

Therefore, we need to track which elements have already been used.

### 5.3 Algorithm

1. Initialize an empty current permutation.
2. Track the elements already used.
3. If the current permutation contains all elements, save it.
4. Otherwise, iterate over the available elements.
5. Choose an unused element.
6. Mark it as used.
7. Explore recursively.
8. Undo the choice.
9. Mark the element as unused.
10. Try the next available element.

### 5.4 Dry Run

Input:

```text
nums = [1, 2]
```

Start:

```text
current = []
used = [False, False]
```

Choose 1:

```text
current = [1]
used = [True, False]
```

Choose 2:

```text
current = [1, 2]
used = [True, True]
```

A complete permutation is found.

Save:

```text
[1, 2]
```

Backtrack:

```text
current = [1]
used = [True, False]
```

Undo 1:

```text
current = []
used = [False, False]
```

Now choose 2:

```text
current = [2]
used = [False, True]
```

Choose 1:

```text
current = [2, 1]
used = [True, True]
```

Save:

```text
[2, 1]
```

Final result:

```text
[[1, 2], [2, 1]]
```

### 5.5 Python Implementation

```python
def permutations(nums):

    result = []
    current = []

    used = [False] * len(nums)

    def backtrack():

        # Base case
        if len(current) == len(nums):
            result.append(current.copy())
            return

        for i in range(len(nums)):

            # Skip already-used elements
            if used[i]:
                continue

            # Choose
            current.append(nums[i])
            used[i] = True

            # Explore
            backtrack()

            # Unchoose
            current.pop()
            used[i] = False

    backtrack()

    return result


print(permutations([1, 2, 3]))
```

**Output:**

```text
[
    [1, 2, 3],
    [1, 3, 2],
    [2, 1, 3],
    [2, 3, 1],
    [3, 1, 2],
    [3, 2, 1]
]
```

### 5.6 Complexity Analysis

For n distinct elements:

- Number of permutations = n!
- Each permutation requires O(n) time to copy.

| Complexity | Value |
|---|---|
| Time | O(n × n!) |
| Auxiliary space | O(n), excluding output |

### 5.7 Important Observations

- Backtracking explores possible solutions systematically.
- It uses recursion to move through a decision tree.
- Every choice must be undone before exploring another branch when state is shared.
- Constraints help identify invalid choices.
- Pruning can reduce the number of branches explored.

**Recognition clue:** If a problem asks you to explore possible solutions and undo decisions to try alternatives, think of backtracking.

---

## 6. Pruning

### 6.1 Explanation

**Pruning** is the process of eliminating branches of a decision tree that cannot produce a valid solution or cannot improve the current best solution.

Instead of exploring every possible path, we stop exploring a branch as soon as we know it is not useful.

This makes backtracking more efficient.

Without pruning:

- More branches are explored.
- More recursive calls are executed.
- Unnecessary calculations are performed.

With pruning:

- Invalid branches are rejected early.
- Unnecessary recursive calls are avoided.
- The search space can become significantly smaller.

Pruning is commonly used in:

- Combination Sum.
- N-Queens.
- Sudoku.
- Maze solving.
- Branch and Bound.
- Optimization problems.

### 6.2 Example: Combination Sum

Given:

```text
candidates = [2, 3, 5]
target = 8
```

We need combinations whose sum equals 8.

Suppose our current combination is:

```text
current = [5]
```

Current sum:

```text
5
```

Remaining target:

```text
8 - 5 = 3
```

Now consider choosing 5 again.

New sum:

```text
5 + 5 = 10
```

Since the sum exceeds 8, this branch cannot produce a valid combination when all candidates are positive.

We can immediately stop exploring it.

This is pruning.

### 6.3 Algorithm

1. Start with the initial state.
2. Generate a possible choice.
3. Check whether it violates a constraint.
4. If invalid, reject the choice and skip that branch.
5. If valid, explore recursively.
6. Continue until all possible useful branches have been explored.

### 6.4 Dry Run

Input:

```text
candidates = [2, 3, 5]
target = 8
```

Consider the following branches:

**Branch 1:**

```text
[2, 2, 2, 2]
```

Sum = 8.

Valid solution.

**Branch 2:**

```text
[2, 3, 3]
```

Sum = 8.

Valid solution.

**Branch 3:**

```text
[5, 5]
```

Sum = 10.

Invalid.

Prune this branch immediately.

**Branch 4:**

```text
[3, 5]
```

Sum = 8.

Valid solution.

The invalid branch is eliminated without further exploration.

### 6.5 Python Implementation

```python
def combination_sum(candidates, target):

    candidates.sort()

    result = []
    current = []

    def backtrack(start, remaining):

        if remaining == 0:
            result.append(current.copy())
            return

        for i in range(start, len(candidates)):

            value = candidates[i]

            # Pruning
            # Candidates are sorted and positive.
            if value > remaining:
                break

            # Choose
            current.append(value)

            # Explore
            backtrack(i, remaining - value)

            # Unchoose
            current.pop()

    backtrack(0, target)

    return result


print(combination_sum([2, 3, 5], 8))
```

**Output:**

```text
[[2, 2, 2, 2], [2, 3, 3], [3, 5]]
```

### 6.6 Understanding the Pruning Condition

```python
if value > remaining:
    break
```

Why do we use `break` instead of `continue`?

Because the candidates are sorted in ascending order.

If the current candidate is greater than the remaining target, every candidate after it will also be greater.

Therefore, there is no reason to check the remaining candidates.

**Important:** This pruning is valid because all candidates are positive and sorted. It should not be applied blindly to problems that allow negative numbers.

### 6.7 Complexity Analysis

For the Combination Sum example:

- Worst-case time complexity remains exponential in the target and candidate values.
- Pruning reduces unnecessary exploration but does not necessarily improve the worst-case asymptotic complexity.
- Auxiliary recursion depth depends on the maximum number of selected candidates.

### 6.8 Important Observations

- Pruning eliminates unpromising branches.
- Constraints are often used to implement pruning.
- Pruning can greatly improve practical performance.
- Correct pruning must never eliminate a branch that could produce a valid solution.
- Sorting can make certain pruning conditions possible.

**Recognition clue:** If you can determine that a partial solution cannot possibly lead to a valid answer, stop exploring that branch.

---

# How All Six Concepts Work Together

Consider a backtracking problem such as generating valid combinations.

1. **State:** Maintain the current combination.
2. **Choices:** Decide which element to select next.
3. **Constraints:** Ensure the selection follows the problem's rules.
4. **Decision Tree:** Represent all possible selections as branches.
5. **Backtracking:** Select, explore, and undo decisions.
6. **Pruning:** Stop exploring branches that cannot produce valid solutions.
