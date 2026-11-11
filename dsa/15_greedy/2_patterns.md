# 15. Greedy Algorithms

## 15.2 Patterns

Greedy algorithms can be applied through different problem-solving patterns. Each pattern identifies a particular way of making locally optimal decisions to achieve a globally optimal result.

---

### 1. Sort + Greedy

#### What is Sort + Greedy?

Sort + Greedy is a pattern in which we first sort the input according to a specific property and then make greedy decisions by processing elements in that order.

Sorting helps us identify which candidates should be considered first.

The sorting criterion depends on the problem.

Common sorting strategies:

- Sort by ascending cost.
- Sort by descending profit.
- Sort by ascending weight.
- Sort by descending value-to-weight ratio.
- Sort by ascending finishing time.

#### When to Use This Pattern?

Use Sort + Greedy when:

- The order of processing affects the final result.
- A particular property determines which candidate should be considered first.
- Sorting makes it easier to identify the next optimal choice.
- We need to minimize or maximize some quantity.

#### Example: Assign Cookies

**Problem:**

We have children with different greed factors and cookies of different sizes.

Each child can receive at most one cookie.

A child is satisfied if the cookie size is greater than or equal to their greed factor.

Our objective is to maximize the number of satisfied children.

Input:

```python
greed = [1, 2, 3]
cookies = [1, 1]
```

**Greedy Strategy:**

- Sort children by greed factor.
- Sort cookies by size.
- Try to satisfy the least greedy child first using the smallest available cookie that satisfies them.
- Move to the next child and cookie.

#### Dry Run

Sorted inputs:

```text
Children = [1, 2, 3]
Cookies  = [1, 1]
```

| Step | Child Greed | Cookie Size | Decision |
|---|---:|---:|---|
| 1 | 1 | 1 | Satisfied |
| 2 | 2 | 1 | Cannot satisfy; try next child |
| 3 | 3 | 1 | Cannot satisfy |

Final result:

Number of satisfied children = 1.

#### Algorithm

1. Sort the greed array.
2. Sort the cookie array.
3. Initialize two pointers:
   - i for children.
   - j for cookies.
4. If the current cookie can satisfy the current child:
   - Assign the cookie.
   - Move both pointers.
5. Otherwise:
   - Move the cookie pointer to try a larger cookie.
6. Return the number of satisfied children.

#### Python Implementation

```python
def find_content_children(greed, cookies):

    greed.sort()
    cookies.sort()

    i = 0
    j = 0

    while i < len(greed) and j < len(cookies):

        if cookies[j] >= greed[i]:
            i += 1

        j += 1

    return i


greed = [1, 2, 3]
cookies = [1, 1]

print(find_content_children(greed, cookies))
```

Output:

```text
1
```

**Complexity Analysis:**

- Sorting children: O(n log n)
- Sorting cookies: O(m log m)
- Two-pointer traversal: O(n + m)

Overall Time Complexity: O(n log n + m log m).

Auxiliary Space: O(1) excluding sorting implementation overhead.

#### Key Takeaways

- Sorting establishes the order of greedy decisions.
- The smallest suitable resource is often assigned first.
- Two pointers are frequently used with this pattern.
- The sorting criterion must be justified based on the problem.

**Common DSA Problems:**

- Assign Cookies
- Lemonade Change
- Boats to Save People
- Minimum Number of Arrows to Burst Balloons

---

### 2. Interval Greedy

#### What is Interval Greedy?

Interval Greedy is a pattern used when problems involve ranges or intervals represented by start and end points.

The objective may involve:

- Selecting maximum non-overlapping intervals.
- Removing minimum intervals to eliminate overlaps.
- Covering a collection of intervals.
- Finding minimum resources needed for intervals.
- Merging or managing overlapping ranges.

The greedy strategy depends on the specific interval problem.

A common approach is to sort intervals and make decisions based on their start or end points.

#### When to Use This Pattern?

Use Interval Greedy when:

- The input contains start and end times or positions.
- Intervals may overlap.
- We need to select, remove, or cover intervals optimally.
- Sorting intervals helps determine the next decision.

#### Example: Non-overlapping Intervals

**Problem:**

Given a collection of intervals, return the minimum number of intervals that must be removed to make the remaining intervals non-overlapping.

Input:

```python
intervals = [
    [1, 2],
    [2, 3],
    [3, 4],
    [1, 3]
]
```

We need to remove the minimum number of intervals.

**Greedy Strategy:**

To maximize the number of intervals we can keep, prioritize intervals that finish earliest.

This leaves more room for future intervals.

#### Dry Run

Sort intervals by ending time:

```text
[1, 2]
[2, 3]
[1, 3]
[3, 4]
```

Now process them:

| Interval | Previous Finish | Decision |
|---|---:|---|
| [1, 2] | -∞ | Keep |
| [2, 3] | 2 | Keep |
| [1, 3] | 3 | Remove |
| [3, 4] | 3 | Keep |

Kept intervals:

```text
[1, 2], [2, 3], [3, 4]
```

Total intervals = 4.

Kept intervals = 3.

Minimum removals = 4 - 3 = 1.

#### Algorithm

1. Sort intervals by ending time.
2. Initialize the finishing time to negative infinity.
3. Traverse each interval.
4. If the interval starts at or after the previous selected interval's end:
   - Keep it.
   - Update the finishing time.
5. Otherwise, remove it.
6. Return the removal count.

#### Python Implementation

```python
def erase_overlap_intervals(intervals):

    intervals.sort(key=lambda x: x[1])

    last_end = float('-inf')
    removals = 0

    for start, end in intervals:

        if start >= last_end:
            last_end = end
        else:
            removals += 1

    return removals


intervals = [
    [1, 2],
    [2, 3],
    [3, 4],
    [1, 3]
]

print(erase_overlap_intervals(intervals))
```

Output:

```text
1
```

**Complexity Analysis:**

- Sorting: O(n log n)
- Traversal: O(n)

Overall Time Complexity: O(n log n).

Auxiliary Space: O(1) excluding sorting implementation overhead.

#### Key Takeaways

- Interval problems frequently require sorting.
- Sorting by start time and sorting by end time solve different types of interval problems.
- When maximizing non-overlapping intervals, earliest finishing time is a powerful strategy.
- Carefully define whether touching intervals are considered overlapping.

**Common DSA Problems:**

- Non-overlapping Intervals
- Merge Intervals
- Minimum Number of Arrows to Burst Balloons
- Meeting Rooms
- Meeting Rooms II

---

### 3. Earliest Finish Time

#### What is Earliest Finish Time?

Earliest Finish Time is a specific greedy strategy used in interval scheduling and activity selection problems.

The strategy is:

> Always select the compatible activity that finishes earliest.

Why?

Because an activity that finishes earlier leaves more available time for future activities.

This increases the opportunity to select more activities.

#### When to Use This Pattern?

Use Earliest Finish Time when:

- We need to maximize the number of non-overlapping activities.
- Activities have start and finish times.
- Selecting an activity prevents us from selecting overlapping activities.
- The objective is to fit as many activities as possible into a timeline.

#### Example: Maximum Number of Activities

**Problem:**

Given several activities with start and finish times, find the maximum number of activities that can be performed without overlapping.

Input:

```python
activities = [
    (1, 3),
    (2, 4),
    (3, 5),
    (0, 7),
    (5, 9),
    (8, 9)
]
```

#### Greedy Strategy

Sort activities by their finishing time.

Select the first activity, then repeatedly select the next activity whose start time is greater than or equal to the finishing time of the last selected activity.

#### Dry Run

Sorted activities:

```text
(1, 3)
(2, 4)
(3, 5)
(0, 7)
(5, 9)
(8, 9)
```

| Step | Activity | Previous Finish | Decision |
|---|---|---:|---|
| 1 | (1, 3) | -∞ | Select |
| 2 | (2, 4) | 3 | Reject |
| 3 | (3, 5) | 3 | Select |
| 4 | (0, 7) | 5 | Reject |
| 5 | (5, 9) | 5 | Select |
| 6 | (8, 9) | 9 | Reject |

Selected activities:

```text
(1, 3)
(3, 5)
(5, 9)
```

Maximum activities = 3.

#### Algorithm

1. Sort activities by finishing time.
2. Initialize last_finish to negative infinity.
3. Initialize an empty selected list.
4. Traverse the sorted activities.
5. If start is greater than or equal to last_finish:
   - Select the activity.
   - Update last_finish.
6. Return the selected activities.

#### Python Implementation

```python
def max_activities(activities):

    activities.sort(key=lambda x: x[1])

    selected = []
    last_finish = float('-inf')

    for start, finish in activities:

        if start >= last_finish:
            selected.append((start, finish))
            last_finish = finish

    return selected


activities = [
    (1, 3),
    (2, 4),
    (3, 5),
    (0, 7),
    (5, 9),
    (8, 9)
]

result = max_activities(activities)

print(result)
print(len(result))
```

Output:

```text
[(1, 3), (3, 5), (5, 9)]
3
```

**Complexity Analysis:**

- Sorting: O(n log n)
- Traversal: O(n)

Overall Time Complexity: O(n log n).

Auxiliary Space: O(n) for storing selected activities, excluding sorting overhead.

#### Why Does It Work?

Suppose an optimal solution selects an activity that finishes later than the earliest-finishing activity.

We can replace that activity with the earliest-finishing activity.

Since the replacement finishes earlier, it leaves at least as much room for all subsequent activities.

Therefore, the replacement cannot reduce the number of activities selected.

This is an exchange argument.

#### Key Takeaways

- Earliest finish time is a specialized interval greedy strategy.
- It maximizes the number of compatible activities.
- Sorting by start time alone does not guarantee an optimal solution.
- The strategy applies to unweighted activity selection, not every scheduling problem.

**Common DSA Problems:**

- Maximum Number of Events That Can Be Attended
- Non-overlapping Intervals
- Activity Selection
- Minimum Number of Arrows to Burst Balloons

---

### 4. Maximum Reach

#### What is Maximum Reach?

Maximum Reach is a greedy pattern where we maintain the farthest position we can reach and continuously update it as we process the input.

Instead of exploring every possible path, we track the maximum reachable boundary.

At each step, we ask:

> Given the positions we can currently reach, how far can we extend our reach?

This pattern is particularly useful in array traversal and jump-related problems.

#### When to Use This Pattern?

Use Maximum Reach when:

- An element represents how far we can move.
- We need to determine whether the last position is reachable.
- We need to find the minimum number of jumps.
- We need to expand a reachable range.
- Tracking a farthest boundary avoids unnecessary exploration.

#### Example: Jump Game

**Problem:**

You are given an array where each element represents the maximum number of steps you can jump forward from that position.

Determine whether you can reach the last index.

Input:

```python
nums = [2, 3, 1, 1, 4]
```

At index 0, we can jump at most 2 steps.

At index 1, we can jump at most 3 steps.

We need to determine whether the last index is reachable.

#### Greedy Strategy

Maintain a variable:

```text
max_reach
```

It represents the farthest index we can reach so far.

For every reachable index:

```text
max_reach = max(max_reach, i + nums[i])
```

If the current index becomes greater than max_reach, we cannot reach it.

#### Dry Run

Input:

```text
[2, 3, 1, 1, 4]
```

| Index | Value | Current Reach | Updated Max Reach |
|---|---:|---:|---:|
| 0 | 2 | 0 | 2 |
| 1 | 3 | 2 | 4 |
| 2 | 1 | 4 | 4 |
| 3 | 1 | 4 | 4 |
| 4 | 4 | 4 | 8 |

At index 1:

```text
max_reach = max(2, 1 + 3)
          = 4
```

The last index is 4.

Since max_reach is 4, we can reach the last index.

Result = True.

#### Algorithm

1. Initialize max_reach = 0.
2. Traverse the array.
3. If the current index is greater than max_reach, return False.
4. Update max_reach using the current index and jump length.
5. If max_reach reaches or exceeds the last index, return True.
6. Return True for an empty or single-element array as appropriate.

#### Python Implementation

```python
def can_jump(nums):

    max_reach = 0

    for i in range(len(nums)):

        if i > max_reach:
            return False

        max_reach = max(max_reach, i + nums[i])

        if max_reach >= len(nums) - 1:
            return True

    return True


nums = [2, 3, 1, 1, 4]

print(can_jump(nums))
```

Output:

```text
True
```

Another example:

```python
nums = [3, 2, 1, 0, 4]

print(can_jump(nums))
```

Output:

```text
False
```

**Complexity Analysis:**

- Time Complexity: O(n)
- Auxiliary Space: O(1)

#### Important Extension: Minimum Number of Jumps

Maximum Reach can also be extended to solve the problem of finding the minimum number of jumps needed to reach the last index.

The idea is to maintain:

- current_end: The boundary of the current jump.
- farthest: The farthest position reachable from the current range.
- jumps: Number of jumps taken.

We process each reachable range and expand it as we move forward.

This is a related greedy technique often called the greedy range expansion approach.

#### Key Takeaways

- Maintain the farthest reachable position.
- Never process an index that is outside the current reachable range.
- Maximum Reach avoids exploring every possible jump sequence.
- The pattern is useful for reachability and range-expansion problems.

**Common DSA Problems:**

- Jump Game
- Jump Game II
- Gas Station
- Video Stitching
- Minimum Number of Taps to Open to Water a Garden

---

### 5. Local Optimal Choice

#### What is Local Optimal Choice?

Local Optimal Choice is the fundamental decision-making idea behind greedy algorithms.

At every step, we select the candidate that appears to provide the greatest immediate benefit according to a problem-specific rule.

The objective is to construct a globally optimal solution through a sequence of locally optimal decisions.

Unlike Sort + Greedy, this pattern does not necessarily require sorting the entire input.

The candidate can be chosen through:

- A direct comparison.
- A running maximum or minimum.
- A mathematical formula.
- A priority queue.
- A problem-specific rule.

#### When to Use This Pattern?

Use Local Optimal Choice when:

- A clear decision rule exists at each step.
- Choosing the best candidate immediately can be justified.
- Previous choices do not need to be reconsidered.
- The decision can be proven to preserve an optimal solution.

#### Example: Best Time to Buy and Sell Stock II

**Problem:**

You are given an array where prices[i] represents the price of a stock on day i.

You can buy and sell the stock multiple times, but you can hold at most one share at a time.

Find the maximum profit.

Input:

```python
prices = [7, 1, 5, 3, 6, 4]
```

#### Greedy Strategy

Capture every positive price difference between consecutive days.

If tomorrow's price is higher than today's price, we can earn a profit by buying today and selling tomorrow.

Therefore:

```text
If prices[i] > prices[i - 1]:

    profit += prices[i] - prices[i - 1]
```

#### Dry Run

Input:

```text
[7, 1, 5, 3, 6, 4]
```

| Day | Previous Price | Current Price | Profit Added | Total Profit |
|---|---:|---:|---:|---:|
| 1 | 7 | 1 | 0 | 0 |
| 2 | 1 | 5 | 4 | 4 |
| 3 | 5 | 3 | 0 | 4 |
| 4 | 3 | 6 | 3 | 7 |
| 5 | 6 | 4 | 0 | 7 |

Final maximum profit = 7.

Transactions:

- Buy at 1, sell at 5.
- Buy at 3, sell at 6.

Total profit = 4 + 3 = 7.

#### Algorithm

1. Initialize profit = 0.
2. Traverse the price array from index 1.
3. Compare the current price with the previous day's price.
4. If the current price is higher:
   - Add the difference to profit.
5. Return total profit.

#### Python Implementation

```python
def max_profit(prices):

    profit = 0

    for i in range(1, len(prices)):

        if prices[i] > prices[i - 1]:
            profit += prices[i] - prices[i - 1]

    return profit


prices = [7, 1, 5, 3, 6, 4]

print(max_profit(prices))
```

Output:

```text
7
```

**Complexity Analysis:**

- Time Complexity: O(n)
- Auxiliary Space: O(1)

#### Why Does It Work?

Consider a continuously increasing sequence:

```text
1 → 3 → 5 → 7
```

Buying at 1 and selling at 7 gives a profit of 6.

Alternatively, capturing every positive difference gives:

```text
(3 - 1) + (5 - 3) + (7 - 5)

= 2 + 2 + 2

= 6
```

Both approaches produce the same profit.

By capturing every positive difference, we accumulate the maximum possible profit across all increasing segments.

#### Key Takeaways

- Local Optimal Choice is the core idea behind greedy algorithms.
- The best immediate decision depends on the problem.
- Not every locally optimal decision is globally optimal.
- Always verify the decision rule with a correctness argument.

**Common DSA Problems:**

- Best Time to Buy and Sell Stock II
- Maximum Subarray (Kadane's Algorithm, a related greedy-style approach)
- Lemonade Change
- Partition Labels
- Gas Station

---

### 6. Greedy + Heap

#### What is Greedy + Heap?

Greedy + Heap is a pattern that combines greedy decision-making with a heap (priority queue).

A heap helps us efficiently retrieve the minimum or maximum element from a collection.

Instead of sorting the entire collection repeatedly, we maintain a heap and select the best candidate whenever required.

Two common types:

**Min Heap**

- The smallest element is always at the top.
- Useful when we need the minimum cost, earliest finishing time, or smallest value.

**Max Heap**

- The largest element is always at the top.
- Useful when we need maximum profit, maximum value, or the largest available resource.

Python's heapq module provides a min heap by default.

#### When to Use This Pattern?

Use Greedy + Heap when:

- We repeatedly need the minimum or maximum candidate.
- Candidates become available dynamically.
- We need to select or remove elements efficiently.
- Sorting everything in advance is inconvenient.
- We need to make repeated optimal decisions.

#### Example: Minimum Cost to Connect Sticks

**Problem:**

You are given several sticks with different lengths.

You can connect any two sticks at a time.

The cost of connecting two sticks is equal to the sum of their lengths.

Find the minimum total cost required to connect all sticks into one.

Input:

```python
sticks = [2, 4, 3]
```

#### Greedy Strategy

Always connect the two smallest sticks first.

Why?

Combining smaller sticks first helps minimize the accumulated connection cost because every combined stick may participate in further connections.

We use a min heap to efficiently retrieve the two smallest sticks.

#### Dry Run

Initial sticks:

```text
[2, 4, 3]
```

Create a min heap:

```text
[2, 3, 4]
```

**Step 1:**

Remove the two smallest sticks:

```text
2 and 3
```

Connect them:

```text
Cost = 2 + 3 = 5
```

Insert the combined stick:

```text
[4, 5]
```

Total cost = 5.

**Step 2:**

Remove the two smallest sticks:

```text
4 and 5
```

Connect them:

```text
Cost = 4 + 5 = 9
```

Insert the combined stick:

```text
[9]
```

Total cost:

```text
5 + 9 = 14
```

Final minimum cost = 14.

#### Algorithm

1. Create a min heap from all stick lengths.
2. Initialize total_cost = 0.
3. While the heap contains more than one element:
   - Remove the two smallest elements.
   - Add their sum to total_cost.
   - Insert the combined length back into the heap.
4. Return total_cost.

#### Python Implementation

```python
import heapq

def connect_sticks(sticks):

    heapq.heapify(sticks)

    total_cost = 0

    while len(sticks) > 1:

        first = heapq.heappop(sticks)
        second = heapq.heappop(sticks)

        cost = first + second

        total_cost += cost

        heapq.heappush(sticks, cost)

    return total_cost


sticks = [2, 4, 3]

print(connect_sticks(sticks))
```

Output:

```text
14
```

**Complexity Analysis:**

- Heap construction: O(n)
- Each connection requires two removals and one insertion: O(log n)
- Number of connections: n - 1

Overall Time Complexity: O(n log n).

Auxiliary Space: O(n) for the heap.

#### Why Does It Work?

Every time two sticks are connected, their combined length contributes to the cost.

If we combine smaller sticks first, we avoid repeatedly adding unnecessarily large lengths to the total cost.

This is the same greedy principle used in Huffman Coding.

The correctness can be established using an exchange argument: an optimal merge sequence can be rearranged to combine the two smallest elements first without increasing the total cost.

#### Key Takeaways

- Use a heap when the best candidate must be retrieved repeatedly.
- Min heap retrieves the smallest candidate.
- Max heap can be simulated in Python using negative values.
- Heap operations generally take O(log n).
- Greedy + Heap is useful for repeated optimization decisions.

**Common DSA Problems:**

- Minimum Cost to Connect Sticks
- Huffman Coding
- IPO
- Course Schedule III
- Reorganize String
- Task Scheduler
- Meeting Rooms II
