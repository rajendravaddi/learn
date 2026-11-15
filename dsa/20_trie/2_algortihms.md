# Trie Algorithms / Techniques

## 1. Autocomplete

### 1.1 What is Autocomplete?

Autocomplete is a technique that suggests complete words based on a partially typed prefix.

Examples:

```text
Dictionary:
["apple", "application", "apply", "apt", "banana"]

User types:
"app"

Suggestions:
["app", "apple", "application", "apply"]
```

Autocomplete is commonly used in:

- Search engines
- IDE code suggestions
- Mobile keyboard suggestions
- Contact search
- Product search
- Command-line tools

### 1.2 How Autocomplete Works Using Trie

Autocomplete has two main stages:

1. Find the Trie node corresponding to the entered prefix.
2. Perform DFS (Depth-First Search) from that node to collect complete words.

For example:

```text
Words:
["app", "apple", "apply"]

Prefix:
"app"
```

After locating the `"app"` node, DFS explores its descendants and collects words whose nodes have `is_end_of_word = True`.

### 1.3 Algorithm

```text
AUTOCOMPLETE(root, prefix):

    current = root

    FOR each character ch in prefix:

        IF ch is not present in current.children:
            RETURN []

        current = current.children[ch]

    suggestions = []

    DFS(current, prefix, suggestions)

    RETURN suggestions
```

DFS:

```text
DFS(node, current_word, suggestions):

    IF node.is_end_of_word:
        ADD current_word to suggestions

    FOR each character ch in node.children:

        DFS(
            node.children[ch],
            current_word + ch,
            suggestions
        )
```

### 1.4 Python Implementation

```python
def autocomplete(self, prefix):

    current = self.root

    # Find the node corresponding to the prefix
    for ch in prefix:

        if ch not in current.children:
            return []

        current = current.children[ch]

    suggestions = []

    def dfs(node, current_word):

        if node.is_end_of_word:
            suggestions.append(current_word)

        for ch, child_node in node.children.items():

            dfs(child_node, current_word + ch)

    dfs(current, prefix)

    return suggestions
```

### 1.5 Dry Run

Input:

```python
words = ["app", "apple", "apply", "apt", "banana"]
prefix = "app"
```

Step 1: Locate the `"app"` Trie node.

Step 2: Start DFS from that node.

Step 3: Collect complete words.

| DFS discovery | Is end of word? | Action |
|---|---|---|
| app | Yes | Add `app` |
| appl | No | Continue |
| apple | Yes | Add `apple` |
| apply | Yes | Add `apply` |

Output:

```python
["app", "apple", "apply"]
```

Note: Suggestion order depends on the order of child traversal. If alphabetical order is required, iterate through sorted child characters.

### 1.6 Complexity Analysis

Let:

- `L` = length of the prefix
- `K` = number of characters explored in the matching Trie subtree
- `S` = total number of characters in the returned suggestions

Complexities:

- **Prefix traversal:** O(L)
- **DFS traversal:** O(K)
- **Building returned strings:** O(S) in total, with ordinary Python string concatenation potentially adding extra copying cost.
- **Auxiliary recursion space:** O(H), where H is the maximum depth below the prefix node.

Overall, a useful bound is O(L + K + S), excluding additional string-copying overhead.

Autocomplete is efficient because it explores only the subtree belonging to the given prefix, rather than scanning the entire dictionary.

---

## 2. Dictionary Matching

### 2.1 What is Dictionary Matching?

Dictionary matching is the process of checking whether words from a dictionary occur in a given text.

A Trie can efficiently match dictionary words against text by starting at different positions and following matching character paths.

Example:

```python
dictionary = ["cat", "car", "dog"]

text = "the cat and dog are here"
```

Matching words:

```text
cat
dog
```

Dictionary matching is useful in:

- Spell checking
- Word detection
- Text scanning
- Keyword detection
- Search and filtering systems
- Natural language processing

### 2.2 Basic Approach

Suppose we have:

```python
dictionary = ["cat", "car", "dog"]
text = "the cat and dog"
```

The algorithm:

1. Start at the first character of the text.
2. Start from the Trie root.
3. Follow Trie edges while characters match.
4. Whenever an end-of-word node is reached, record the matched word.
5. Repeat from the next text position.

### 2.3 Algorithm

```text
DICTIONARY_MATCHING(root, text):

    matches = []

    FOR start FROM 0 TO length(text) - 1:

        current = root

        FOR end FROM start TO length(text) - 1:

            ch = text[end]

            IF ch is not present in current.children:
                BREAK

            current = current.children[ch]

            IF current.is_end_of_word:
                ADD text[start : end + 1] TO matches

    RETURN matches
```

This basic algorithm assumes that matching can start at any character position. It may find words inside larger words.

For example, searching for `"cat"` in `"concatenate"` can match the substring `"cat"`.

If only whole-word matches are required, word-boundary checks must be added.

### 2.4 Python Implementation — Substring Matching

```python
def dictionary_matching(self, text):

    matches = []

    for start in range(len(text)):

        current = self.root

        for end in range(start, len(text)):

            ch = text[end]

            if ch not in current.children:
                break

            current = current.children[ch]

            if current.is_end_of_word:
                matches.append(text[start:end + 1])

    return matches
```

### 2.5 Dry Run

Input:

```python
dictionary = ["cat", "car", "dog"]
text = "the cat and dog"
```

The algorithm starts from different text positions.

| Starting position | Matching attempt | Result |
|---|---|---|
| 0 | the | No dictionary match |
| 1 | he | No dictionary match |
| 2 | e | No dictionary match |
| 4 | cat | Match |
| 8 | and | No dictionary match |
| 12 | dog | Match |

Output:

```python
["cat", "dog"]
```

### 2.6 Whole-Word Dictionary Matching

If we want to match only complete words, we can split the text into tokens and search each token in the Trie.

```python
def whole_word_matching(self, text):

    matches = []

    for word in text.split():

        if self.search(word):
            matches.append(word)

    return matches
```

Example:

```python
dictionary = ["cat", "car", "dog"]

text = "the cat and dog are here"

print(whole_word_matching(text))
```

Output:

```python
["cat", "dog"]
```

This simple version treats whitespace-separated tokens as words. For punctuation, normalization or tokenization is needed. For example, `"cat,"` will not match `"cat"` unless punctuation is removed.

### 2.7 Complexity Analysis

Let:

- `N` = length of the input text
- `L` = maximum length of a dictionary word

For the substring matching algorithm:

- **Time Complexity:** O(N × L) in the worst case.
- **Auxiliary Space Complexity:** O(1), excluding the output and Trie storage.
- **Output Space Complexity:** Depends on the number and total length of matches.

For whole-word matching:

- Let `W` be the total number of characters across the whitespace-separated tokens.
- **Time Complexity:** O(W), assuming average O(1) child lookup in the Trie.
- **Auxiliary Space Complexity:** O(1), excluding tokenization and output storage.
