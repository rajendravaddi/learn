# Patterns — Trie

## 1. Prefix-Based Search

### 1.1 What is Prefix-Based Search?

Prefix-based search is a technique where we search for words or strings that begin with a particular sequence of characters.

Instead of comparing every word individually, we use a Trie to navigate directly to the node representing the given prefix.

Example:

```python
words = [
    "apple",
    "application",
    "apply",
    "apt",
    "banana",
    "ball"
]

prefix = "app"
```

Expected matching words:

```python
["apple", "application", "apply"]
```

### 1.2 When Should We Use This Pattern?

Use prefix-based search when:

- We need to find words starting with a specific prefix.
- Multiple strings share common prefixes.
- We need efficient autocomplete.
- We need to filter a dictionary by a prefix.
- We need to find the longest common prefix.
- We need to check whether a string is a prefix of another string.

Common applications:

- Search suggestions
- Contact search
- Dictionary applications
- File and directory search
- Product search

### 1.3 Algorithm

The algorithm has two stages:

1. Traverse the Trie using the given prefix.
2. If the prefix exists, collect all words from that node's subtree.

```text
PREFIX_SEARCH(root, prefix):

    current = root

    FOR each character ch in prefix:

        IF ch is not in current.children:
            RETURN []

        current = current.children[ch]

    results = []

    DFS(current, prefix, results)

    RETURN results
```

### 1.4 Python Implementation

```python

def prefix_search(root, prefix):

    current = root

    for ch in prefix:

        if ch not in current.children:
            return []

        current = current.children[ch]

    results = []

    def dfs(node, word):

        if node.is_end_of_word:
            results.append(word)

        for ch in sorted(node.children):
            dfs(node.children[ch], word + ch)

    dfs(current, prefix)

    return results
```

### 1.5 Dry Run

Input:

```python
words = ["apple", "application", "apply", "apt", "banana"]

prefix = "app"
```

First, traverse:

```text
root → a → p → p
```

Then perform DFS from the `app` node.

| Word | Is it a complete word? | Action |
|---|---|---|
| app | Yes | Add to result |
| apple | Yes | Add to result |
| application | Yes | Add to result |
| apply | Yes | Add to result |

Output:

```python
["app", "apple", "application", "apply"]
```

### 1.6 Complexity Analysis

Let:

- `P` = length of the prefix.
- `K` = number of Trie nodes explored in the matching subtree.
- `S` = total number of characters in the returned words.

Time complexity:

- Prefix traversal: O(P)
- Subtree traversal: O(K)
- Building returned strings: O(S) total, excluding additional copying overhead.

Overall: O(P + K + S), with possible extra cost from Python string concatenation.

Auxiliary space: O(H) recursion stack, where H is the maximum subtree depth.

---

## 2. Trie + DFS

### 2.1 What is Trie + DFS?

DFS stands for Depth-First Search.

DFS explores one path as deeply as possible before moving to another path.

When combined with a Trie, DFS helps us explore all possible words or prefixes stored below a particular Trie node.

A typical workflow is:

1. Traverse the Trie to reach a starting node.
2. Apply DFS to explore its descendants.
3. Check `is_end_of_word` to identify valid words.
4. Collect the results.

### 2.2 Example

Consider:

```python
words = [
    "cat",
    "car",
    "care",
    "dog",
    "door"
]
```

Trie structure:

```text
                 root
                /    \
               c      d
               |      |
               a      o
              / \     |
             t   r    g
                 |    |
                 e    ...
```

Starting DFS from the root explores all branches and identifies complete words.

### 2.3 When Should We Use Trie + DFS?

Use this pattern when:

- We need to collect all words matching a prefix.
- We need to enumerate words stored in a Trie.
- We need to find the longest word satisfying a condition.
- We need to explore all possible word extensions.
- We need to solve word-search problems involving a dictionary.

### 2.4 Algorithm

```text
TRIE_DFS(node, current_word, results):

    IF node.is_end_of_word:
        ADD current_word TO results

    FOR each character ch in node.children:

        TRIE_DFS(
            node.children[ch],
            current_word + ch,
            results
        )
```

### 2.5 Python Implementation

```python
def collect_words(node, current_word, results):

    if node.is_end_of_word:
        results.append(current_word)

    for ch, child in node.children.items():

        collect_words(
            child,
            current_word + ch,
            results
        )
```

Usage:

```python
results = []

collect_words(trie.root, "", results)

print(results)
```

### 2.6 Dry Run

Input dictionary:

```python
["cat", "car", "dog"]
```

DFS traversal:

```text
root
 |
 c
 |
 a
 / \
t   r
    |
    (end)

root
 |
 d
 |
 o
 |
 g
 |
(end)
```

Traversal:

| Step | Current word | End marker | Action |
|---|---|---|---|
| 1 | c | No | Continue |
| 2 | ca | No | Continue |
| 3 | cat | Yes | Store cat |
| 4 | car | Yes | Store car |
| 5 | d | No | Continue |
| 6 | do | No | Continue |
| 7 | dog | Yes | Store dog |

Output:

```python
["cat", "car", "dog"]
```

### 2.7 Important Interview Problem: Longest Word in Dictionary

Problem:

Given a list of words, find the longest word that can be built one character at a time, where every prefix of the word must also exist in the dictionary.

Example:

```python
words = [
    "w",
    "wo",
    "wor",
    "worl",
    "world",
    "banana"
]
```

Output:

```text
world
```

Why?

All prefixes of `"world"` exist:

```text
w
wo
wor
worl
world
```

#### Python Solution Using Trie + DFS

```python
class TrieNode:

    def __init__(self):
        self.children = {}
        self.is_end_of_word = False


class Trie:

    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):

        current = self.root

        for ch in word:

            if ch not in current.children:
                current.children[ch] = TrieNode()

            current = current.children[ch]

        current.is_end_of_word = True

    def longest_word(self):

        answer = ""

        def dfs(node, current_word):

            nonlocal answer

            if len(current_word) > len(answer):
                answer = current_word

            for ch in sorted(node.children):

                child = node.children[ch]

                if child.is_end_of_word:

                    dfs(child, current_word + ch)

        dfs(self.root, "")

        return answer


words = ["w", "wo", "wor", "worl", "world", "banana"]

trie = Trie()

for word in words:
    trie.insert(word)

print(trie.longest_word())
```

Output:

```text
world
```

Complexity:

- Building Trie: O(C), where C is the total number of characters inserted.
- DFS: O(V) traversal, plus string construction costs, where V is the number of visited Trie nodes.
- Auxiliary recursion space: O(H), where H is the maximum Trie depth.

Important: DFS only explores children whose nodes mark complete words. This guarantees that every prefix of the current word exists.

---

## 3. Trie + Backtracking

### 3.1 What is Backtracking?

Backtracking is an algorithmic technique that explores possible choices and reverses a choice when it cannot lead to a valid solution or when exploration of that choice is complete.

It generally follows three steps:

1. Choose.
2. Explore.
3. Undo the choice.

Backtracking is frequently used in:

- Maze solving
- Sudoku
- N-Queens
- Word Search
- Permutations
- Combinations

When combined with Trie, backtracking becomes especially useful for searching multiple dictionary words in a grid.

### 3.2 Why Combine Trie with Backtracking?

Consider a character board:

```text
board = [
    ["o", "a", "a", "n"],
    ["e", "t", "a", "e"],
    ["i", "h", "k", "r"],
    ["i", "f", "l", "v"]
]
```

Dictionary:

```python
words = ["oath", "pea", "eat", "rain"]
```

We need to find all dictionary words that can be formed by moving horizontally or vertically through adjacent cells.

A brute-force approach searches for every word independently.

Problem:

- The same board paths may be explored repeatedly.
- Many partial paths cannot produce any dictionary word.
- Searching a large dictionary becomes expensive.

Trie solves this by sharing common prefixes.

Backtracking explores board paths, while Trie tells us whether the current character sequence can still become a dictionary word.

### 3.3 Pattern: Trie + Backtracking for Word Search II

This is a classic coding interview problem.

Problem:

Given a 2D character board and a list of words, return all words that can be formed by connecting adjacent cells.

Rules:

- Movement is allowed up, down, left, and right.
- A cell cannot be used more than once in one word.
- The word must exist in the dictionary.

Example:

```python
board = [
    ["o", "a", "a", "n"],
    ["e", "t", "a", "e"],
    ["i", "h", "k", "r"],
    ["i", "f", "l", "v"]
]

words = ["oath", "pea", "eat", "rain"]
```

Expected output:

```python
["oath", "eat"]
```

### 3.4 How the Algorithm Works

Step 1: Insert all dictionary words into a Trie.

Step 2: Start DFS from every board cell.

Step 3: Check whether the current character exists in the current Trie node.

Step 4: If it does not exist, stop exploring that path.

Step 5: If the current Trie node marks a complete word, add it to the answer.

Step 6: Temporarily mark the current board cell as visited.

Step 7: Explore four neighboring cells.

Step 8: Restore the board cell after exploration.

This restoration step is called backtracking.

### 3.5 Algorithm

```text
WORD_SEARCH(board, words):

    Build Trie using all words

    results = []

    FOR every cell (row, col) in board:

        BACKTRACK(row, col, root)

    RETURN results
```

Backtracking:

```text
BACKTRACK(row, col, node):

    ch = board[row][col]

    IF ch is not in node.children:
        RETURN

    next_node = node.children[ch]

    IF next_node represents a complete word:
        ADD word to results

    MARK board[row][col] as visited

    FOR each of four neighboring cells:

        IF neighbor is inside the board
           AND neighbor is not visited:

            BACKTRACK(neighbor, next_node)

    RESTORE board[row][col]
```

### 3.6 Python Implementation

```python
class TrieNode:

    def __init__(self):
        self.children = {}
        self.word = None


class Solution:

    def findWords(self, board, words):

        root = TrieNode()

        # Build Trie
        for word in words:

            current = root

            for ch in word:

                if ch not in current.children:
                    current.children[ch] = TrieNode()

                current = current.children[ch]

            current.word = word

        rows = len(board)
        cols = len(board[0])

        results = []

        def backtrack(row, col, node):

            ch = board[row][col]

            if ch not in node.children:
                return

            next_node = node.children[ch]

            # Found a complete dictionary word
            if next_node.word is not None:

                results.append(next_node.word)

                # Prevent duplicate results
                next_node.word = None

            # Mark cell as visited
            board[row][col] = "#"

            # Explore four directions
            directions = [
                (0, 1),
                (0, -1),
                (1, 0),
                (-1, 0)
            ]

            for dr, dc in directions:

                nr = row + dr
                nc = col + dc

                if (
                    0 <= nr < rows
                    and 0 <= nc < cols
                    and board[nr][nc] != "#"
                ):

                    backtrack(nr, nc, next_node)

            # Restore original character
            board[row][col] = ch

        # Start DFS from every cell
        for row in range(rows):

            for col in range(cols):

                backtrack(row, col, root)

        return results
```

Usage:

```python
board = [
    ["o", "a", "a", "n"],
    ["e", "t", "a", "e"],
    ["i", "h", "k", "r"],
    ["i", "f", "l", "v"]
]

words = ["oath", "pea", "eat", "rain"]

solution = Solution()

print(solution.findWords(board, words))
```

Output:

```python
["oath", "eat"]
```

### 3.7 Understanding Backtracking Through a Dry Run

Consider the word `"oath"`.

Starting board position:

```text
o a a n
e t a e
i h k r
i f l v
```

One valid path is:

```text
o → a → t → h
```

Coordinates:

```text
(0,0) → (0,1) → (1,1) → (2,1)
```

Step-by-step:

| Step | Character | Trie path | Action |
|---|---|---|---|
| 1 | o | o | Continue |
| 2 | a | oa | Continue |
| 3 | t | oat | Continue |
| 4 | h | oath | Word found |

Then the algorithm backtracks:

1. Restore `h`.
2. Return to `t`.
3. Restore `t`.
4. Return to `a`.
5. Restore `a`.
6. Return to `o`.
7. Restore `o`.

The same process continues for other possible paths.

### 3.8 Complexity Analysis

Let:

- `R` = number of rows.
- `C` = number of columns.
- `L` = maximum dictionary word length.
- `W` = number of dictionary words.
- `S` = total number of characters across all dictionary words.

Trie construction:

- Time: O(S)
- Space: O(S) worst case.

Board search:

A simple upper bound for exploring paths from each starting cell is O(R × C × 4 × 3^(L-1)), because:

- There are R × C possible starting cells.
- The first move has at most four directions.
- Subsequent moves have at most three choices because the previous cell cannot be revisited.
- Search depth is limited by L.

The Trie prunes paths that cannot match any dictionary prefix, often substantially reducing practical work.

Additional search space:

- Recursion stack: O(L).
- The board is modified temporarily in place and restored.

Important: This is a worst-case upper bound, not a guarantee of actual runtime. The amount of Trie prefix sharing and the characters on the board strongly influence performance.

---

## 4. Trie + String Problems

### 4.1 What is This Pattern?

Many string problems involve:

- Prefix comparison
- Common prefixes
- Dictionary lookup
- Word segmentation
- String replacement
- Matching multiple strings
- Finding words with shared prefixes

A Trie can reduce repeated string comparisons by storing common prefixes only once.

Combining Trie with string-processing techniques creates powerful solutions for many interview problems.

### 4.2 Common Problems

| Problem | Main Trie Technique |
|---|---|
| Longest Common Prefix | Shared Trie path |
| Replace Words | Shortest prefix lookup |
| Word Search II | Trie + DFS + Backtracking |
| Longest Word in Dictionary | Trie + DFS |
| Search Suggestions System | Prefix traversal |
| Word Break | Trie + Dynamic Programming |
| Implement Magic Dictionary | Trie + controlled mismatch |
| Stream of Characters | Reverse Trie |

Let's understand some important examples.

### 4.3 Problem 1: Longest Common Prefix

Problem:

Given an array of strings, find the longest common prefix among all strings.

Example:

```python
words = ["flower", "flow", "flight"]
```

Output:

```text
fl
```

#### Approach Using Trie

1. Insert all words into a Trie.
2. Start at the root.
3. Continue traversing while:
   - The current node has exactly one child.
   - The current node is not the end of a word.
4. Stop when either condition fails.

#### Python Implementation

```python
class TrieNode:

    def __init__(self):
        self.children = {}
        self.is_end_of_word = False


def longest_common_prefix(words):

    if not words:
        return ""

    root = TrieNode()

    # Build Trie
    for word in words:

        current = root

        for ch in word:

            if ch not in current.children:
                current.children[ch] = TrieNode()

            current = current.children[ch]

        current.is_end_of_word = True

    # Find common prefix
    current = root
    prefix = ""

    while (
        len(current.children) == 1
        and not current.is_end_of_word
    ):

        ch = next(iter(current.children))

        prefix += ch

        current = current.children[ch]

    return prefix


words = ["flower", "flow", "flight"]

print(longest_common_prefix(words))
```

Output:

```text
fl
```

Complexity:

- Trie construction: O(S), where S is the total number of characters.
- Prefix traversal: O(P), where P is the length of the common prefix.
- Trie storage: O(S) worst case.

Note: For a one-time longest common prefix calculation, a direct string-based approach may be simpler and use less memory. Trie becomes more attractive when many prefix queries or dictionary operations are also required.

### 4.4 Problem 2: Replace Words

Problem:

Given a dictionary of root words and a sentence, replace each word with the shortest root that is its prefix.

Example:

```python
dictionary = ["cat", "bat", "rat"]

sentence = "the cattle was rattled by the battery"
```

Output:

```text
the cat was rat by the bat
```

Explanation:

- cattle → cat
- rattled → rat
- battery → bat

#### Approach Using Trie

1. Insert all root words into a Trie.
2. For every sentence word, start at the Trie root.
3. Traverse characters from left to right.
4. When an end-of-word node is reached, return the prefix immediately.
5. If no root matches, return the original word.

This ensures that the shortest matching root is selected.

#### Python Implementation

```python
class TrieNode:

    def __init__(self):
        self.children = {}
        self.is_end_of_word = False


class Solution:

    def replaceWords(self, dictionary, sentence):

        root = TrieNode()

        # Build Trie
        for word in dictionary:

            current = root

            for ch in word:

                if ch not in current.children:
                    current.children[ch] = TrieNode()

                current = current.children[ch]

            current.is_end_of_word = True

        def find_root(word):

            current = root
            prefix = ""

            for ch in word:

                if ch not in current.children:
                    return word

                current = current.children[ch]
                prefix += ch

                if current.is_end_of_word:
                    return prefix

            return word

        words = sentence.split()

        result = []

        for word in words:
            result.append(find_root(word))

        return " ".join(result)


dictionary = ["cat", "bat", "rat"]

sentence = "the cattle was rattled by the battery"

solution = Solution()

print(solution.replaceWords(dictionary, sentence))
```

Output:

```text
the cat was rat by the bat
```

Complexity:

Let:

- `D` = total characters in dictionary roots.
- `N` = total characters in sentence words.

Time: O(D + N), assuming average O(1) Trie child lookup.

Space: O(D) for the Trie, excluding the output.

### 4.5 Problem 3: Word Break — Trie + Dynamic Programming

Problem:

Given a string and a dictionary, determine whether the string can be segmented into valid dictionary words.

Example:

```python
s = "leetcode"

wordDict = ["leet", "code"]
```

Output:

```text
True
```

Explanation:

```text
leetcode = leet + code
```

Both `"leet"` and `"code"` exist in the dictionary.

#### Why Combine Trie with DP?

Dynamic Programming answers whether a prefix of the string can be segmented into dictionary words.

Trie helps identify valid dictionary words starting at a given position without checking every dictionary word separately.

#### DP Definition

Let:

```python
dp[i] = True
```

mean the substring `s[0:i]` can be segmented into dictionary words.

Base case:

```python
dp[0] = True
```

An empty prefix is considered valid.

Transition:

For every reachable position `i`:

1. Start at the Trie root.
2. Move through characters beginning at index `i`.
3. Whenever a complete dictionary word is found at position `j`, set `dp[j + 1] = True`.

#### Python Implementation

```python
class TrieNode:

    def __init__(self):
        self.children = {}
        self.is_end_of_word = False


def word_break(s, wordDict):

    root = TrieNode()

    # Build Trie
    for word in wordDict:

        current = root

        for ch in word:

            if ch not in current.children:
                current.children[ch] = TrieNode()

            current = current.children[ch]

        current.is_end_of_word = True

    n = len(s)

    dp = [False] * (n + 1)

    dp[0] = True

    for i in range(n):

        if not dp[i]:
            continue

        current = root

        for j in range(i, n):

            ch = s[j]

            if ch not in current.children:
                break

            current = current.children[ch]

            if current.is_end_of_word:
                dp[j + 1] = True

    return dp[n]


s = "leetcode"

wordDict = ["leet", "code"]

print(word_break(s, wordDict))
```

Output:

```text
True
```

#### Dry Run

Input:

```python
s = "leetcode"

wordDict = ["leet", "code"]
```

Initially:

```text
dp = [True, False, False, False, False, False, False, False, False]
```

Find `"leet"`:

```text
dp[4] = True
```

Find `"code"` starting at index 4:

```text
dp[8] = True
```

Final:

```text
dp = [True, False, False, False, True, False, False, False, True]
```

Therefore:

```text
True
```

#### Complexity Analysis

Let:

- `N` = length of the input string.
- `D` = total number of characters in the dictionary.
- `L` = maximum dictionary word length.

Trie construction: O(D).

DP and Trie traversal: O(N × L) worst case.

Total: O(D + N × L).

Space: O(D + N), for the Trie and DP array.
