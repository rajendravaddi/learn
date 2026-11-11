# 15. Greedy Algorithms

## 15.1 Concepts

### 1. Greedy Choice

#### What is a Greedy Choice?

A **Greedy Algorithm** makes the best possible choice at the current step, hoping that these locally optimal choices will eventually produce a globally optimal solution.

Instead of exploring every possible combination, it makes a decision and moves forward without reconsidering previous decisions.

The key idea is:

> Choose what looks best right now, and continue building the solution one step at a time.

However, making the best immediate choice does not always guarantee the best overall solution. Greedy algorithms work only when the problem has the right mathematical properties.

#### Example: Selecting Activities

Suppose we have activities with start and finish times:

| Activity | Start | Finish |
|---|---:|---:|
| A | 1 | 3 |
| B | 2 | 5 |
| C | 4 | 6 |
| D | 6 | 8 |

We want to select the maximum number of non-overlapping activities.

A greedy strategy could be to select an activity that finishes earliest.

- Select A (1–3).
- Select C (4–6), because it starts after A finishes.
- Select D (6–8), because it starts when C finishes.

Selected activities: A, C, D.

Total activities selected = 3.

The greedy choice at each step is to select the earliest-finishing compatible activity.

#### Why is this useful?

The greedy choice reduces the number of possibilities we need to explore.

Instead of trying every possible combination of activities, we make one carefully chosen decision at each step.

**Important:** A greedy choice must be proven correct for the given problem. We cannot assume that choosing the locally best option always works.

---

### 2. Local Optimum vs Global Optimum

These two terms are fundamental to understanding greedy algorithms.

#### Local Optimum

A local optimum is the best choice within the current situation or among the currently available options.

It focuses on what is best at a particular step.

#### Global Optimum

A global optimum is the best possible solution among all valid solutions to the entire problem.

It considers the complete problem, not just an individual step.

#### Example: Coin Change

Suppose we have these coin denominations:

Coins = [1, 3, 4]

Target amount = 6.

We want to minimize the number of coins.

**Greedy approach: Always select the largest coin that does not exceed the remaining amount.**

Dry run:

| Step | Remaining Amount | Selected Coin |
|---|---:|---:|
| 1 | 6 | 4 |
| 2 | 2 | 1 |
| 3 | 1 | 1 |
| 4 | 0 | Stop |

Result:

4 + 1 + 1 = 6

Number of coins = 3.

But there is a better solution:

3 + 3 = 6

Number of coins = 2.

Therefore:

- Greedy solution: 3 coins.
- Optimal solution: 2 coins.

The greedy algorithm found a locally optimal choice (coin 4), but it failed to find the globally optimal solution.

#### Key Difference

| Local Optimum | Global Optimum |
|---|---|
| Best choice at the current step | Best solution for the entire problem |
| Focuses on immediate benefit | Focuses on overall result |
| May lead to a suboptimal solution | Represents the best valid solution |

**Important takeaway:**

A locally optimal choice does not necessarily produce a globally optimal solution.

This is one of the most important things to remember when solving greedy problems.

---

### 3. Exchange Argument

#### What is an Exchange Argument?

An exchange argument is a mathematical technique used to prove that a greedy algorithm produces an optimal solution.

The basic idea is:

1. Assume an optimal solution exists.
2. Compare it with the solution produced by the greedy algorithm.
3. If the optimal solution makes a different choice, show that we can replace its choice with the greedy choice.
4. Prove that this replacement does not make the solution worse.
5. Repeat this reasoning until the optimal solution agrees with the greedy choices.

If we can do this, we establish that a greedy solution can be optimal.

In simple words:

> Show that making the greedy choice instead of another choice never makes an optimal solution worse.

#### Example: Activity Selection

Consider these activities:

| Activity | Start | Finish |
|---|---:|---:|
| A | 1 | 4 |
| B | 2 | 3 |
| C | 3 | 5 |
| D | 5 | 7 |

We want to select the maximum number of non-overlapping activities.

The greedy strategy selects the activity that finishes earliest.

So, the greedy algorithm selects B (2–3) first.

But suppose an optimal solution selects A (1–4) first.

Can we replace A with B?

Yes!

- A finishes at 4.
- B finishes at 3.
- B finishes earlier than A.
- Every activity that can follow A can also follow B.

Therefore, replacing A with B cannot reduce the number of activities we can select.

The same reasoning can be applied to subsequent choices.

This is an exchange argument.

#### Why does it matter?

It provides a formal way to prove greedy correctness instead of relying on intuition.

In interviews, exchange arguments are especially useful for problems involving:

- Activity selection.
- Interval scheduling.
- Job sequencing.
- Minimum spanning trees.
- Other problems where a greedy decision can replace a different decision in an optimal solution.

**Remember:** An exchange argument proves correctness. It is not an algorithm by itself.

---

### 4. Sorting for Greedy

#### Why is Sorting Important in Greedy Algorithms?

Many greedy problems become easier when we sort the input according to a particular property.

Sorting helps us arrange candidates so that the best greedy choice can be considered first.

Common sorting criteria include:

- Ascending order of finish time.
- Ascending order of cost.
- Descending order of profit.
- Ascending order of weight.
- Descending order of value-to-weight ratio.

The correct sorting criterion depends on the problem.

#### Example: Activity Selection

Consider the following activities:

| Activity | Start | Finish |
|---|---:|---:|
| A | 1 | 4 |
| B | 2 | 3 |
| C | 3 | 5 |
| D | 5 | 7 |
| E | 6 | 9 |

Our greedy strategy is to select the activity that finishes earliest.

First, sort activities by finish time.

Sorted activities:

| Activity | Start | Finish |
|---|---:|---:|
| B | 2 | 3 |
| A | 1 | 4 |
| C | 3 | 5 |
| D | 5 | 7 |
| E | 6 | 9 |

Now process the sorted activities:

- Select B (2–3).
- Skip A (1–4), because it overlaps with B.
- Select C (3–5).
- Select D (5–7).
- Skip E (6–9), because it overlaps with D.

Final selection: B, C, D.

Total activities = 3.

#### Algorithm

1. Sort all activities by their finishing time.
2. Select the first activity.
3. Store its finishing time.
4. Iterate through the remaining activities.
5. If the current activity starts at or after the last selected activity finishes, select it.
6. Update the last selected finishing time.
7. Return the selected activities.

#### Python Implementation

```python
def activity_selection(activities):
    # Sort activities by finish time
    activities.sort(key=lambda x: x[1])

    selected = []
    last_finish = float('-inf')

    for start, finish in activities:
        if start >= last_finish:
            selected.append((start, finish))
            last_finish = finish

    return selected


activities = [
    (1, 4),
    (2, 3),
    (3, 5),
    (5, 7),
    (6, 9)
]

print(activity_selection(activities))
```

Output:

```python
[(2, 3), (3, 5), (5, 7)]
```

**Time Complexity:**

- Sorting: O(n log n)
- Iteration: O(n)
- Overall: O(n log n)

**Space Complexity:** O(n) for the selected activities, excluding sorting overhead.

**Important:** Sorting alone does not make an algorithm greedy. The sorting criterion must support a correct greedy strategy, and its correctness must be established.

---

### 5. Feasibility

#### What is Feasibility in Greedy Algorithms?

Feasibility means checking whether a particular choice satisfies all the constraints of the problem.

A greedy algorithm should never make a choice that violates the problem's rules.

In simple words:

> Before accepting a choice, check whether it is valid.

A greedy algorithm generally performs two operations:

1. Identify a promising candidate.
2. Check whether selecting that candidate keeps the solution valid.

If the choice is valid, accept it. Otherwise, reject it.

#### Example: Activity Selection

Suppose we have already selected an activity:

Selected activity = (1, 4)

Now consider these activities:

- A = (2, 5)
- B = (4, 6)
- C = (5, 7)

Our constraint is that activities must not overlap.

Check each activity:

**Activity A (2–5)**

- Starts at 2.
- Previous activity finishes at 4.
- 2 is less than 4.
- Reject because it overlaps.

**Activity B (4–6)**

- Starts at 4.
- Previous activity finishes at 4.
- 4 is equal to 4.
- Accept because the activities are compatible under the usual half-open interval convention.

**Activity C (5–7)**

If B has been selected:

- B finishes at 6.
- C starts at 5.
- 5 is less than 6.
- Reject because it overlaps with B.

#### General Feasibility Check

The feasibility condition depends on the problem.

| Problem | Feasibility Condition |
|---|---|
| Activity Selection | No overlapping activities |
| Fractional Knapsack | Total weight does not exceed capacity |
| Job Sequencing | Job is assigned to an available valid time slot |
| Minimum Spanning Tree | Adding an edge does not create a cycle |
| Graph Problems | Selected edges or vertices satisfy graph constraints |

#### General Greedy Structure

```python
for candidate in candidates:

    if is_feasible(candidate):
        select(candidate)
```

This is a general conceptual structure, not a complete solution for every greedy problem.

**Important:** Feasibility ensures that the solution is valid. It does not automatically guarantee that the solution is optimal.

---

### 6. Optimization

#### What is Optimization?

Optimization means finding the best possible solution while satisfying all the constraints of a problem.

An optimization problem usually has:

1. A set of possible solutions.
2. Constraints that determine which solutions are valid.
3. An objective function that determines which valid solution is best.

The objective could be:

- Maximize profit.
- Maximize the number of selected activities.
- Minimize total cost.
- Minimize the number of resources.
- Minimize completion time.

Greedy algorithms solve optimization problems by repeatedly making locally optimal choices.

However, they only guarantee an optimal result when the greedy strategy is correct for the given problem.

#### Example: Fractional Knapsack

Suppose we have a knapsack with a capacity of 50 kg.

Available items:

| Item | Weight | Value | Value / Weight |
|---|---:|---:|---:|
| A | 10 | 60 | 6 |
| B | 20 | 100 | 5 |
| C | 30 | 120 | 4 |

We can take fractions of items.

Our objective is to maximize the total value without exceeding 50 kg.

**Greedy strategy:**

Select items in descending order of value-to-weight ratio.

#### Dry Run

Step 1: Select item A.

- Weight = 10 kg
- Value = 60
- Remaining capacity = 40 kg

Step 2: Select item B.

- Weight = 20 kg
- Value = 100
- Remaining capacity = 20 kg

Step 3: Select 20 kg out of item C.

- Original weight = 30 kg
- Selected weight = 20 kg
- Fraction selected = 20/30
- Value obtained = 120 × (20/30) = 80

Final result:

| Selected Item | Weight | Value |
|---|---:|---:|
| A | 10 | 60 |
| B | 20 | 100 |
| C (2/3 fraction) | 20 | 80 |
| **Total** | **50** | **240** |

Maximum value = 240.

#### Python Implementation

```python
def fractional_knapsack(items, capacity):

    # Sort by value-to-weight ratio in descending order
    items.sort(
        key=lambda item: item[1] / item[0],
        reverse=True
    )

    total_value = 0

    for weight, value in items:

        if capacity == 0:
            break

        if weight <= capacity:
            total_value += value
            capacity -= weight

        else:
            fraction = capacity / weight
            total_value += value * fraction
            capacity = 0

    return total_value


items = [
    (10, 60),
    (20, 100),
    (30, 120)
]

capacity = 50

print(fractional_knapsack(items, capacity))
```

Output:

```python
240.0
```

**Time Complexity:** O(n log n), due to sorting.

**Space Complexity:** O(1) auxiliary space if sorting is performed in place, excluding implementation-dependent sorting overhead.

#### Important Observation

Fractional Knapsack works with a greedy strategy because we can take fractions of items.

But the same greedy strategy does not necessarily work for 0/1 Knapsack, where an item must either be selected completely or not selected at all.

This distinction is important because two problems can look almost identical but require different algorithms.
