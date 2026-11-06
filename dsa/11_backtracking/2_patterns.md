# Backtracking Patterns

## 1. Choose / Skip

### 1.1 Explanation

**Choose / Skip** is a backtracking pattern in which every element has two possible decisions:

1. Choose the current element.
2. Skip the current element.

It is one of the simplest ways to generate subsets and solve selection problems.

At every index, we decide whether the current element should be part of our solution.

The pattern follows:

```text
Choose current element
          OR
Skip current element
```

This creates a binary decision tree.

Common applications:

- Subsets.
- Subset Sum.
- Count subsets with a given sum.
- Target Sum.
- Partition problems.
- Include/Exclude optimization problems.

### 1.2 Example: Subset Sum

Given:

```text
nums = [2, 3, 5]
target = 5
```

Determine whether any subset has a sum equal to 5.

Possible subsets include:

```text
[]
[2]
[3]
[5]
[2, 3]
[2, 5]
[3, 5]
[2, 3, 5]
```

Valid subsets:

```text
[5]
[2, 3]
```

### 1.3 Algorithm

1. Start at index 0 with current sum 0.
2. If the current sum equals the target, return True.
3. If all elements are processed, return False.
4. Choose the current element and recursively explore.
5. If a solution is found, return True.
6. Otherwise, skip the current element and explore.
7. Return whether either branch finds a solution.

### 1.4 Dry Run

Input:

```text
nums = [2, 3, 5]
target = 5
```

Initial state:

```text
index = 0
current_sum = 0
```

Choose 2:

```text
current_sum = 2
```

Choose 3:

```text
current_sum = 5
```

Target reached.

Return True.

The solution subset is:

```text
[2, 3]
```

There is also another valid subset:

```text
[5]
```

This is found by skipping 2, skipping 3, and choosing 5.

### 1.5 Python Implementation

```python
def subset_sum_exists(nums, target):

    def backtrack(index, current_sum):

        # Solution found
        if current_sum == target:
            return True

        # No elements remaining
        if index == len(nums):
            return False

        # Choose current element
        if backtrack(
            index + 1,
            current_sum + nums[index]
        ):
            return True

        # Skip current element
        if backtrack(index + 1, current_sum):
            return True

        return False

    return backtrack(0, 0)


print(subset_sum_exists([2, 3, 5], 5))
```

**Output:**

```text
True
```

### 1.6 Complexity Analysis

| Complexity | Value |
|---|---|
| Time | O(2ⁿ) |
| Auxiliary space | O(n) |

There are at most two branches for each element.

This implementation stops as soon as it finds a valid subset, but its worst-case time complexity remains exponential.

### 1.7 Important Observations

- Every element has two possible decisions.
- It creates a binary recursion tree.
- It is closely related to subset generation.
- It can solve decision problems such as whether a valid subset exists.
- Additional pruning is possible when the input values satisfy suitable assumptions.

**Recognition clue:** If every element can either be selected or rejected, think about Choose / Skip.

---

## 2. Constraint Satisfaction

### 2.1 Explanation

**Constraint Satisfaction** is a backtracking pattern in which we build a solution while ensuring that every decision follows a set of predefined rules.

A constraint satisfaction problem generally contains:

1. Variables – The items or positions that need values.
2. Domains – The possible values each variable can take.
3. Constraints – The rules that restrict valid assignments.

Backtracking assigns values one at a time.

If an assignment violates a constraint, we reject it and try another value.

Common applications:

- N-Queens.
- Sudoku.
- Graph Coloring.
- Crossword puzzles.
- Scheduling problems.

### 2.2 Example: N-Queens

The N-Queens problem asks us to place N queens on an N × N chessboard such that no two queens attack each other.

Rules:

- No two queens can be in the same row.
- No two queens can be in the same column.
- No two queens can share a diagonal.

Let's consider N = 4.

One valid arrangement is:

```text
. Q . .
. . . Q
Q . . .
. . Q .
```

Here:

- Each row has exactly one queen.
- No two queens share a column.
- No two queens share a diagonal.

### 2.3 Algorithm

We place one queen per row.

1. Start from row 0.
2. Try every column in the current row.
3. Check whether placing a queen in that column is safe.
4. If safe:
   - Place the queen.
   - Move to the next row recursively.
5. If all rows are completed, save the board.
6. Remove the queen when backtracking.
7. Try the next column.

### 2.4 Dry Run

For N = 4:

Start with an empty 4 × 4 board.

Try placing the first queen at row 0, column 0.

```text
Q . . .
. . . .
. . . .
. . . .
```

Move to row 1.

Try valid columns.

- Column 0: Same column, invalid.
- Column 1: Diagonal conflict, invalid.
- Column 2: Valid.
- Column 3: Valid.

Choose column 2:

```text
Q . . .
. . Q .
. . . .
. . . .
```

Continue exploring the remaining rows.

If a later row has no valid position, undo the previous queen placement and try another column.

Eventually, a valid arrangement is found:

```text
. Q . .
. . . Q
Q . . .
. . Q .
```

The important idea is that we never continue exploring a placement that violates the queen constraints.

### 2.5 Python Implementation

```python
def solve_n_queens(n):

    result = []

    board = [["."] * n for _ in range(n)]

    cols = set()
    diagonals = set()
    anti_diagonals = set()

    def backtrack(row):

        # All queens placed
        if row == n:

            result.append([
                "".join(r) for r in board
            ])

            return

        for col in range(n):

            diagonal = row - col
            anti_diagonal = row + col

            # Check constraints
            if col in cols:
                continue

            if diagonal in diagonals:
                continue

            if anti_diagonal in anti_diagonals:
                continue

            # Choose
            board[row][col] = "Q"

            cols.add(col)
            diagonals.add(diagonal)
            anti_diagonals.add(anti_diagonal)

            # Explore
            backtrack(row + 1)

            # Unchoose
            board[row][col] = "."

            cols.remove(col)
            diagonals.remove(diagonal)
            anti_diagonals.remove(anti_diagonal)

    backtrack(0)

    return result


solutions = solve_n_queens(4)

for solution in solutions:
    for row in solution:
        print(row)
    print()
```

**Output:**

```text
.Q..
...Q
Q...
..Q.

..Q.
Q...
...Q
.Q..
```

There are two solutions for N = 4.

### 2.6 Complexity Analysis

For the N-Queens implementation:

- We place one queen per row.
- Each row can have up to n possible columns.
- Column and diagonal checks use average O(1) set operations.

A useful worst-case upper bound is O(n!).

| Complexity | Value |
|---|---|
| Time | O(n!) upper bound |
| Auxiliary space | O(n²) for the board, plus O(n) recursion and tracking structures |
| Output space | Depends on the number of solutions |

The actual number of explored nodes is reduced by the constraint checks.

### 2.7 Important Observations

- Each row represents a variable.
- Each column represents a possible value.
- Column and diagonal restrictions are constraints.
- Invalid assignments are rejected immediately.
- Backtracking restores the board and tracking structures.

**Recognition clue:** If a problem asks you to assign values while satisfying multiple rules, think about Constraint Satisfaction.

---

## 3. Grid Backtracking

### 3.1 Explanation

**Grid Backtracking** is a pattern used to explore paths in a two-dimensional grid while following certain movement and validity rules.

We start from a cell and recursively explore neighboring cells.

At every cell, we may move:

- Up.
- Down.
- Left.
- Right.

Depending on the problem, diagonal movement may also be allowed.

We maintain the current path and track visited cells to avoid revisiting cells when the problem requires simple paths.

If a movement leads to an invalid cell or an already visited cell, we reject that movement.

If we reach the destination, we have found a valid path.

Common applications:

- Rat in a Maze.
- Word Search.
- Finding paths in a grid.
- Maze solving.
- Unique Paths with obstacles.
- Path existence problems.

### 3.2 Example: Rat in a Maze

Given a grid:

```text
1 0 0 0
1 1 0 1
0 1 0 0
1 1 1 1
```

Rules:

- `1` represents an open cell.
- `0` represents a blocked cell.
- Start at the top-left cell `(0, 0)`.
- Reach the bottom-right cell `(3, 3)`.
- Move only Up, Down, Left, or Right.
- Do not visit a cell more than once in the current path.

One valid path is:

```text
S 0 0 0
P P 0 1
0 P 0 0
1 P P E
```

Where:

- S = Start.
- E = End.
- P = Path.

### 3.3 Algorithm

1. Start from cell `(0, 0)`.
2. Check whether the current cell is valid.
3. If the cell is blocked or already visited, return.
4. Mark the current cell as visited.
5. Add the current cell to the path.
6. If the destination is reached, save the path.
7. Otherwise, explore all four directions.
8. Remove the current cell from the path.
9. Unmark the current cell so another path can use it.
10. Return to the previous cell.

### 3.4 Dry Run

Input grid:

```text
1 0 0 0
1 1 0 1
0 1 0 0
1 1 1 1
```

Start:

```text
(0, 0)
```

Move Down:

```text
(1, 0)
```

Move Right:

```text
(1, 1)
```

Move Down:

```text
(2, 1)
```

Move Down:

```text
(3, 1)
```

Move Right:

```text
(3, 2)
```

Move Right:

```text
(3, 3)
```

Destination reached.

Path:

```text
(0,0)
(1,0)
(1,1)
(2,1)
(3,1)
(3,2)
(3,3)
```

If a different direction leads to a blocked or visited cell, that branch is rejected.

### 3.5 Python Implementation

```python
def rat_in_maze(grid):

    n = len(grid)

    result = []
    path = []

    visited = [
        [False] * n for _ in range(n)
    ]

    directions = [
        (1, 0),   # Down
        (0, 1),   # Right
        (-1, 0),  # Up
        (0, -1)   # Left
    ]

    def backtrack(row, col):

        # Check boundaries
        if row < 0 or col < 0 or row >= n or col >= n:
            return

        # Check blocked or visited cells
        if grid[row][col] == 0 or visited[row][col]:
            return

        # Choose
        visited[row][col] = True
        path.append((row, col))

        # Destination reached
        if row == n - 1 and col == n - 1:
            result.append(path.copy())

        else:

            # Explore all four directions
            for dr, dc in directions:

                new_row = row + dr
                new_col = col + dc

                backtrack(new_row, new_col)

        # Unchoose
        path.pop()
        visited[row][col] = False

    backtrack(0, 0)

    return result


grid = [
    [1, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 1, 0, 0],
    [1, 1, 1, 1]
]

paths = rat_in_maze(grid)

for path in paths:
    print(path)
```

**Output:**

```text
[(0, 0), (1, 0), (1, 1), (2, 1),
 (3, 1), (3, 2), (3, 3)]
```

### 3.6 Complexity Analysis

For an N × N grid:

- There are N² cells.
- Each cell has at most four possible directions.
- The number of possible simple paths can be exponential.

A loose upper bound on the search time is O(4^(N²)), excluding output copying.

| Complexity | Value |
|---|---|
| Time | Exponential in the grid size in the worst case |
| Auxiliary space | O(N²), for visited cells, path and recursion |
| Output space | Depends on the number and lengths of valid paths |

### 3.7 Important Observations

- Grid coordinates represent the current state.
- Movement directions represent possible choices.
- Boundaries, obstacles, and visited cells are constraints.
- The visited matrix prevents cycles.
- Backtracking restores the visited state.
- Grid problems can have many possible paths, so pruning is important.

**Recognition clue:** If a problem involves finding paths or exploring neighboring cells in a matrix, consider Grid Backtracking.

---

# Master Backtracking Templates

## Template 1: Subsets

```python
def backtrack(index):

    if index == len(nums):
        result.append(current.copy())
        return

    current.append(nums[index])
    backtrack(index + 1)
    current.pop()

    backtrack(index + 1)
```

## Template 2: Permutations

```python
def backtrack():

    if len(current) == len(nums):
        result.append(current.copy())
        return

    for i in range(len(nums)):

        if used[i]:
            continue

        current.append(nums[i])
        used[i] = True

        backtrack()

        current.pop()
        used[i] = False
```

## Template 3: Combinations

```python
def backtrack(start):

    if len(current) == k:
        result.append(current.copy())
        return

    for i in range(start, len(nums)):

        current.append(nums[i])

        backtrack(i + 1)

        current.pop()
```

## Template 4: Choose / Skip

```python
def backtrack(index, state):

    if index == len(nums):
        return

    # Choose
    backtrack(index + 1, updated_state)

    # Skip
    backtrack(index + 1, state)
```

## Template 5: Constraint Satisfaction

```python
def backtrack(state):

    if is_complete(state):
        result.append(state.copy())
        return

    for choice in get_choices(state):

        if not is_valid(choice, state):
            continue

        make_choice(choice, state)

        backtrack(state)

        undo_choice(choice, state)
```

## Template 6: Grid Backtracking

```python
def backtrack(row, col):

    if not is_valid(row, col):
        return

    visited[row][col] = True
    path.append((row, col))

    if is_destination(row, col):
        result.append(path.copy())

    else:
        for dr, dc in directions:
            backtrack(row + dr, col + dc)

    path.pop()
    visited[row][col] = False
```