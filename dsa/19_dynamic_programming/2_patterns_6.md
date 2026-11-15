# Dynamic Programming - Patterns - 6

## 7. State-Machine Dynamic Programming

State-machine DP is used when a problem involves multiple states and transitions between them.

It is particularly useful when decisions depend on the current status of an entity.

Examples:
- Buying and selling stocks.
- Holding or not holding a stock.
- Transaction limits.
- Cooldown periods.
- Switching between different states.

Instead of representing only an index, the DP state includes additional information such as whether we currently hold a stock.

### 7.1 Stock Problems

#### Explanation

Stock DP problems involve buying and selling stocks to maximize profit under different restrictions.

Common restrictions include:
- Unlimited transactions.
- At most one transaction.
- At most K transactions.
- Cooldown after selling.
- Transaction fees.

The core idea is to track the best possible profit for each state.

#### Problem 1: Best Time to Buy and Sell Stock

You are given stock prices for different days.

You can complete at most one transaction:
- Buy once.
- Sell once.

You must buy before selling.

Find the maximum profit.

##### Example

Input:

```text
prices = [7, 1, 5, 3, 6, 4]
```

Optimal transaction:

```text
Buy at 1
Sell at 6
```

Profit:

```text
6 - 1 = 5
```

##### State

We can track:

- Minimum price seen so far.
- Maximum profit obtained so far.

##### Algorithm

1. Initialize minimum price with the first day's price.
2. Initialize maximum profit to zero.
3. Iterate through prices.
4. Calculate the profit if selling today.
5. Update the maximum profit.
6. Update the minimum price.
7. Return the maximum profit.

##### Python Implementation

```python
def max_profit(prices):
    min_price = float("inf")
    max_profit = 0

    for price in prices:

        min_price = min(min_price, price)

        profit = price - min_price

        max_profit = max(
            max_profit,
            profit
        )

    return max_profit


print(max_profit([7, 1, 5, 3, 6, 4]))  # 5
```

##### Dry Run

Input:

```text
[7, 1, 5, 3, 6, 4]
```

| Price | Minimum Price | Profit Today | Maximum Profit |
|---|---:|---:|---:|
| 7 | 7 | 0 | 0 |
| 1 | 1 | 0 | 0 |
| 5 | 1 | 4 | 4 |
| 3 | 1 | 2 | 4 |
| 6 | 1 | 5 | 5 |
| 4 | 1 | 3 | 5 |

Output:

```text
5
```

##### Complexity Analysis

- Time Complexity: O(n).
- Space Complexity: O(1).

---

### 7.2 Buy/Sell States

#### Explanation

In more complex stock problems, we track whether we currently hold a stock or do not hold a stock.

These are two different DP states.

#### State Definitions

Let:

$$
buy[i] = \text{maximum profit after day i while holding a stock}
$$

$$
sell[i] = \text{maximum profit after day i while not holding a stock}
$$

#### Transitions

**Holding a stock:**

We can either:
- Continue holding the stock.
- Buy today's stock.

$$
buy[i]=\max(buy[i-1],sell[i-1]-price[i])
$$

**Not holding a stock:**

We can either:
- Continue not holding the stock.
- Sell today's stock.

$$
sell[i]=\max(sell[i-1],buy[i-1]+price[i])
$$

#### Problem: Unlimited Transactions

You can buy and sell multiple times, but you can hold at most one stock at a time.

Find the maximum profit.

##### Python Implementation

```python
def max_profit(prices):
    hold = float("-inf")
    cash = 0

    for price in prices:

        prev_hold = hold
        prev_cash = cash

        hold = max(
            prev_hold,
            prev_cash - price
        )

        cash = max(
            prev_cash,
            prev_hold + price
        )

    return cash


print(max_profit([7, 1, 5, 3, 6, 4]))  # 7
```

##### Dry Run

Input:

```text
[7, 1, 5, 3, 6, 4]
```

Here:
- `hold` = maximum profit while holding a stock.
- `cash` = maximum profit while not holding a stock.

| Price | hold | cash |
|---|---:|---:|
| 7 | -7 | 0 |
| 1 | -1 | 0 |
| 5 | -1 | 4 |
| 3 | 1 | 4 |
| 6 | 1 | 7 |
| 4 | 3 | 7 |

Output:

```text
7
```

Transactions:

```text
Buy at 1 → Sell at 5 = 4
Buy at 3 → Sell at 6 = 3
```

Total profit:

```text
7
```

#### Complexity Analysis

- Time Complexity: O(n).
- Space Complexity: O(1).

---

### 7.3 Cooldown and Transaction Constraints

Stock problems become more interesting when additional rules are introduced.

#### Problem 1: Stock with Cooldown

You are given stock prices.

After selling a stock, you cannot buy on the next day.

You can perform unlimited transactions.

Find the maximum profit.

##### Example

Input:

```text
prices = [1, 2, 3, 0, 2]
```

Optimal transactions:

```text
Buy at 1
Sell at 2

Cooldown

Buy at 0
Sell at 2
```

Maximum profit:

```text
3
```

##### DP States

We maintain three states:

**1. Hold**

Maximum profit while holding a stock.

**2. Sold**

Maximum profit after selling a stock today.

**3. Rest**

Maximum profit while not holding a stock and not selling today.

##### Transitions

$$
hold[i]=\max(hold[i-1],rest[i-1]-price[i])
$$

$$
sold[i]=hold[i-1]+price[i]
$$

$$
rest[i]=\max(rest[i-1],sold[i-1])
$$

##### Python Implementation

```python
def max_profit(prices):
    if not prices:
        return 0

    hold = float("-inf")
    sold = float("-inf")
    rest = 0

    for price in prices:

        prev_hold = hold
        prev_sold = sold
        prev_rest = rest

        hold = max(
            prev_hold,
            prev_rest - price
        )

        sold = prev_hold + price

        rest = max(
            prev_rest,
            prev_sold
        )

    return max(sold, rest)


print(max_profit([1, 2, 3, 0, 2]))  # 3
```

##### Dry Run

Input:

```text
[1, 2, 3, 0, 2]
```

| Day Price | Hold | Sold | Rest |
|---|---:|---:|---:|
| 1 | -1 | -∞ | 0 |
| 2 | -1 | 1 | 0 |
| 3 | -1 | 2 | 1 |
| 0 | 1 | -1 | 2 |
| 2 | 1 | 3 | 2 |

Final answer:

```text
max(3, 2) = 3
```

##### Complexity Analysis

- Time Complexity: O(n).
- Space Complexity: O(1).

---

#### Problem 2: At Most K Transactions

You can perform at most K complete stock transactions.

A transaction consists of:
- One buy.
- One sell.

Find the maximum possible profit.

##### DP State

$$
dp[t][i] =
\text{maximum profit using at most t transactions up to day i}
$$

##### Transition

For each transaction count `t`:

$$
dp[t][i]=
\max(
dp[t][i-1],
prices[i]+maxDiff
)
$$

Where:

$$
maxDiff=\max(maxDiff,dp[t-1][i-1]-prices[i])
$$

The `maxDiff` variable represents the best previous profit adjusted for a possible purchase price.

##### Python Implementation

```python
def max_profit(k, prices):
    n = len(prices)

    if n < 2 or k == 0:
        return 0

    # Unlimited transaction optimization
    if k >= n // 2:
        profit = 0

        for i in range(1, n):
            profit += max(
                0,
                prices[i] - prices[i - 1]
            )

        return profit

    dp = [[0] * n for _ in range(k + 1)]

    for t in range(1, k + 1):

        max_diff = -prices[0]

        for i in range(1, n):

            dp[t][i] = max(
                dp[t][i - 1],
                prices[i] + max_diff
            )

            max_diff = max(
                max_diff,
                dp[t - 1][i] - prices[i]
            )

    return dp[k][n - 1]


print(max_profit(2, [3, 2, 6, 5, 0, 3]))  # 7
```

##### Dry Run

Input:

```text
k = 2
prices = [3, 2, 6, 5, 0, 3]
```

Optimal transactions:

```text
Buy at 2 → Sell at 6 = 4
Buy at 0 → Sell at 3 = 3
```

Total:

```text
4 + 3 = 7
```

Output:

```text
7
```

##### Complexity Analysis

- Time Complexity: O(k × n).
- Space Complexity: O(k × n).
