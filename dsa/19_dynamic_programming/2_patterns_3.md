# Dynamic Programming - Patterns - 3

## 4. String Dynamic Programming

String DP is used when problems involve comparing, transforming, or finding relationships between strings.

Common operations include:
- Matching characters.
- Inserting characters.
- Deleting characters.
- Replacing characters.
- Finding common subsequences.
- Finding palindromic subsequences.

These problems commonly use a two-dimensional DP table.

### 4.1 Longest Common Subsequence (LCS)

#### Explanation

Given two strings, find the length of their longest common subsequence.

A subsequence is formed by deleting zero or more characters without changing the relative order of the remaining characters.

The selected characters do not need to be contiguous.

#### Example

```text
str1 = "abcde"
str2 = "ace"
```

Common subsequence:

```text
ace
```

Output:

```text
3
```

#### DP State

$$
dp[i][j] = \text{LCS length of first i characters of str1 and first j characters of str2}
$$

#### Transition

If the current characters match:

$$
dp[i][j]=1+dp[i-1][j-1]
$$

Otherwise:

$$
dp[i][j]=\max(dp[i-1][j],dp[i][j-1])
$$

#### Base Cases

$$
dp[0][j]=0
$$

$$
dp[i][0]=0
$$

An empty string has no common subsequence with another string.

#### Algorithm

1. Create a DP table of `(m+1) × (n+1)`.
2. Initialize the first row and column to zero.
3. Compare characters from both strings.
4. If they match, extend the previous diagonal result.
5. Otherwise, take the maximum of the top and left states.
6. Return the bottom-right value.

#### Python Implementation

```python
def lcs(text1, text2):
    m = len(text1)
    n = len(text2)

    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):

            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]

            else:
                dp[i][j] = max(
                    dp[i - 1][j],
                    dp[i][j - 1]
                )

    return dp[m][n]


print(lcs("abcde", "ace"))  # 3
```

#### Dry Run

Input:

```text
text1 = "abc"
text2 = "ac"
```

DP table:

```text
      ""  a  c
""     0  0  0
 a     0  1  1
 b     0  1  1
 c     0  1  2
```

Matching characters:

```text
a → Match
c → Match
```

LCS:

```text
"ac"
```

Output:

```text
2
```

#### Complexity Analysis

- Time Complexity: O(m × n).
- Space Complexity: O(m × n).

---

### 4.2 Edit Distance

#### Explanation

Edit Distance measures the minimum number of operations required to convert one string into another.

Allowed operations:

1. Insert a character.
2. Delete a character.
3. Replace a character.

This problem is also called Levenshtein Distance.

#### Example

Convert:

```text
word1 = "horse"
word2 = "ros"
```

One optimal transformation:

```text
horse → rorse   (Replace h with r)
rorse → rose    (Delete r)
rose  → ros     (Delete e)
```

Total operations:

```text
3
```

#### DP State

$$
dp[i][j] = \text{minimum operations to convert first i characters into first j characters}
$$

#### Transition

If characters match:

$$
dp[i][j]=dp[i-1][j-1]
$$

If they differ, consider three operations.

**Insert:**

$$
dp[i][j-1]
$$

**Delete:**

$$
dp[i-1][j]
$$

**Replace:**

$$
dp[i-1][j-1]
$$

Therefore:

$$
dp[i][j]=1+\min(
dp[i][j-1],
dp[i-1][j],
dp[i-1][j-1]
)
$$

#### Base Cases

$$
dp[i][0]=i
$$

Deleting all characters requires `i` operations.

$$
dp[0][j]=j
$$

Inserting all characters requires `j` operations.

#### Python Implementation

```python
def edit_distance(word1, word2):
    m = len(word1)
    n = len(word2)

    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(m + 1):
        dp[i][0] = i

    for j in range(n + 1):
        dp[0][j] = j

    for i in range(1, m + 1):
        for j in range(1, n + 1):

            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]

            else:
                dp[i][j] = 1 + min(
                    dp[i - 1][j],      # Delete
                    dp[i][j - 1],      # Insert
                    dp[i - 1][j - 1]   # Replace
                )

    return dp[m][n]


print(edit_distance("horse", "ros"))  # 3
```

#### Dry Run

Input:

```text
word1 = "ab"
word2 = "ac"
```

Initial table:

```text
    ""  a  c
""   0  1  2
 a   1  0  0
 b   2  0  0
```

Calculations:

```text
dp[1][1] = 0
```

Both characters are `a`.

```text
dp[1][2] = 1 + min(1, 1, 2)
         = 2
```

The characters `a` and `c` differ.

```text
dp[2][1] = 1 + min(1, 2, 1)
         = 2
```

The characters `b` and `a` differ.

```text
dp[2][2] = 1 + min(2, 2, 0)
         = 1
```

Replace `b` with `c`.

Final table:

```text
    ""  a  c
""   0  1  2
 a   1  0  1
 b   2  1  1
```

Output:

```text
1
```

#### Complexity Analysis

- Time Complexity: O(m × n).
- Space Complexity: O(m × n).

---

### 4.3 Longest Palindromic Subsequence (LPS)

#### Explanation

A palindrome reads the same forward and backward.

Given a string, find the length of its longest palindromic subsequence.

Remember:
- Subsequence does not need to be contiguous.
- Character order must be preserved.

#### Example

Input:

```text
s = "bbbab"
```

One longest palindromic subsequence:

```text
"bbbb"
```

Output:

```text
4
```

#### Approach 1: LCS-Based Solution

A string's longest palindromic subsequence is equal in length to the LCS of:

- Original string.
- Reversed string.

$$
LPS(s)=LCS(s,reverse(s))
$$

##### Python Implementation

```python
def longest_palindromic_subsequence(s):
    reversed_s = s[::-1]

    m = len(s)
    n = len(reversed_s)

    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):

            if s[i - 1] == reversed_s[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]

            else:
                dp[i][j] = max(
                    dp[i - 1][j],
                    dp[i][j - 1]
                )

    return dp[m][n]


print(longest_palindromic_subsequence("bbbab"))  # 4
```

#### Approach 2: Interval DP

Define:

$$
dp[i][j] =
\text{LPS length in substring s[i...j]}
$$

If both ends match:

$$
dp[i][j]=2+dp[i+1][j-1]
$$

Otherwise:

$$
dp[i][j]=\max(dp[i+1][j],dp[i][j-1])
$$

Base case:

$$
dp[i][i]=1
$$

##### Python Implementation

```python
def lps(s):
    n = len(s)

    if n == 0:
        return 0

    dp = [[0] * n for _ in range(n)]

    for i in range(n):
        dp[i][i] = 1

    for length in range(2, n + 1):
        for i in range(n - length + 1):

            j = i + length - 1

            if s[i] == s[j]:

                dp[i][j] = (
                    2 + dp[i + 1][j - 1]
                    if length > 2 else 2
                )

            else:
                dp[i][j] = max(
                    dp[i + 1][j],
                    dp[i][j - 1]
                )

    return dp[0][n - 1]


print(lps("bbbab"))  # 4
```

##### Dry Run

Input:

```text
s = "bbbab"
```

A longest palindromic subsequence is:

```text
b b b b
```

Its length is:

```text
4
```

#### Complexity Analysis

Both approaches:

- Time Complexity: O(n²).
- Space Complexity: O(n²).
