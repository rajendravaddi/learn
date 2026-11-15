# Trie - Data Structure

A **Trie (Prefix Tree)** is a tree-based data structure used to store and retrieve strings efficiently. It is particularly useful when working with prefixes, dictionaries, autocomplete systems, and word searches.

Unlike a hash table, which stores complete keys, a Trie stores strings character by character. Words sharing common prefixes also share the same path in the tree.

### 1. Trie Node

#### Explanation

A Trie Node represents a single character in a Trie.

Each node typically contains:

1. A collection of references to its child nodes.
2. A boolean flag indicating whether a complete word ends at that node.

The root node is usually empty and represents the starting point of the Trie.

For example, inserting the words:

- CAT
- CAR
- CARE

Produces a structure where CAT and CAR share the prefix CA, and CARE extends the existing CAR path.

#### Example

```text
          root
            |
            C
            |
            A
           / \
          T   R
              |
              E

Words: CAT, CAR, CARE
```

The nodes representing T and R/E can be marked as word endings depending on the inserted words.

#### Python Implementation

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False
```

#### Complexity Analysis

| Operation | Complexity |
|---|---|
| Create a node | O(1) |
| Access a child using a dictionary | O(1) average |
| Space per node | O(1) excluding children |

A Trie containing N characters across all inserted words can have at most O(N) nodes.

---

### 2. Children

#### Explanation

The `children` property stores references to the next character nodes.

A dictionary is commonly used in Python:

```python
self.children = {}
```

Each dictionary key represents a character, and its corresponding value represents the child TrieNode.

This allows us to dynamically create branches as new words are inserted.

For example, consider inserting:

- CAT
- CAR

Both words begin with CA, so they share the C and A nodes.

At A, two children exist:

- T
- R

#### Python Implementation

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False


root = TrieNode()

# Create a child node for C
root.children['C'] = TrieNode()

# Create a child node for A
root.children['C'].children['A'] = TrieNode()

# Create two branches: T and R
root.children['C'].children['A'].children['T'] = TrieNode()
root.children['C'].children['A'].children['R'] = TrieNode()
```

#### Example

```text
          root
            |
            C
            |
            A
           / \
          T   R
```

#### Key Points

- Children represent possible next characters.
- Multiple words can share the same child nodes.
- A dictionary provides efficient character lookup.
- A node can have multiple children, depending on the character set.

#### Complexity Analysis

| Operation | Complexity |
|---|---|
| Check whether a child exists | O(1) average |
| Add a child | O(1) average |
| Access a child | O(1) average |

---

### 3. End-of-Word Marker

#### Explanation

An end-of-word marker identifies whether a Trie node represents the end of a complete word.

We use a boolean variable:

```python
self.is_end = False
```

When a complete word is inserted, its final character node is marked:

```python
node.is_end = True
```

This distinction is important because a prefix is not necessarily a complete word.

For example, consider inserting:

- APP
- APPLE

The node representing the second P marks the end of APP, but it also has a child L.

Therefore, the same node can represent both:

- A complete word: APP
- A prefix of another word: APPLE

#### Example

```text
          root
            |
            A
            |
            P
            |
            P* 
            |
            L
            |
            E*

* = End-of-word marker
```

Here:

- APP is a complete word.
- APPLE is a complete word.
- AP is not a complete word.
- APP is also a prefix of APPLE.

#### Python Implementation

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False


root = TrieNode()

# Build APP
node = root

for char in "APP":
    if char not in node.children:
        node.children[char] = TrieNode()

    node = node.children[char]

# Mark APP as a complete word
node.is_end = True

print(node.is_end)  # True
```

#### Key Points

- Every node starts with `is_end = False`.
- Only the final node of an inserted word is marked True.
- A node can simultaneously be an end-of-word and a prefix of another word.
- Never assume that reaching an existing node means the word exists.

---

### 4. Insert

#### Explanation

The Insert operation adds a word to the Trie.

It processes the word character by character, starting from the root.

For every character:

1. Check whether the character exists in the current node's children.
2. If it does not exist, create a new TrieNode.
3. Move to the corresponding child node.
4. Repeat until all characters are processed.
5. Mark the final node as the end of the word.

#### Algorithm

```text
INSERT(root, word):

    node = root

    FOR each character in word:

        IF character does not exist in node.children:
            Create a new TrieNode
            Add it to node.children

        node = node.children[character]

    node.is_end = True
```

#### Python Implementation

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False


class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):

        node = self.root

        for char in word:

            if char not in node.children:
                node.children[char] = TrieNode()

            node = node.children[char]

        node.is_end = True
```

#### Dry Run

Insert the following words:

```python
trie = Trie()

trie.insert("CAT")
trie.insert("CAR")
trie.insert("CARE")
```

**Step 1: Insert CAT**

- C does not exist → create C.
- A does not exist → create A.
- T does not exist → create T.
- Mark T as end-of-word.

```text
root
 |
 C
 |
 A
 |
 T*
```

**Step 2: Insert CAR**

- C already exists → reuse C.
- A already exists → reuse A.
- R does not exist → create R.
- Mark R as end-of-word.

```text
root
 |
 C
 |
 A
 / \
T*  R*
```

**Step 3: Insert CARE**

- C already exists.
- A already exists.
- R already exists.
- E does not exist → create E.
- Mark E as end-of-word.

Final Trie:

```text
          root
            |
            C
            |
            A
           / \
          T*  R*
              |
              E*
```

The Trie stores three words while sharing their common prefixes.

#### Complexity Analysis

Let L be the length of the word being inserted.

| Complexity | Value | Explanation |
|---|---|---|
| Time | O(L) | Visit each character once |
| Auxiliary space | O(1) | Iterative implementation |
| New space | O(L) worst case | A new node for every character |

---

### 5. Search

#### Explanation

The Search operation checks whether a complete word exists in the Trie.

It follows the character path from the root.

For every character:

1. Check whether the character exists in the current node's children.
2. If it does not exist, return False.
3. Otherwise, move to the corresponding child.

After processing all characters, check the `is_end` marker.

If it is True, the complete word exists.

Otherwise, only a prefix exists.

#### Algorithm

```text
SEARCH(root, word):

    node = root

    FOR each character in word:

        IF character does not exist in node.children:
            RETURN False

        node = node.children[character]

    RETURN node.is_end
```

#### Python Implementation

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False


class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):

        node = self.root

        for char in word:

            if char not in node.children:
                node.children[char] = TrieNode()

            node = node.children[char]

        node.is_end = True

    def search(self, word):

        node = self.root

        for char in word:

            if char not in node.children:
                return False

            node = node.children[char]

        return node.is_end


trie = Trie()

trie.insert("CAT")
trie.insert("CAR")
trie.insert("CARE")

print(trie.search("CAT"))   # True
print(trie.search("CAR"))   # True
print(trie.search("CARE"))  # True
print(trie.search("CA"))    # False
print(trie.search("CARS"))  # False
```

#### Dry Run

Suppose the Trie contains:

```text
CAT
CAR
CARE
```

**Case 1: Search CAT**

| Character | Action |
|---|---|
| C | Found |
| A | Found |
| T | Found |
| End | `is_end = True` |

Result: `True`

**Case 2: Search CA**

| Character | Action |
|---|---|
| C | Found |
| A | Found |
| End | `is_end = False` |

Result: `False`

Although CA exists as a prefix, it is not a complete inserted word.

**Case 3: Search CARS**

| Character | Action |
|---|---|
| C | Found |
| A | Found |
| R | Found |
| S | Not found |

Result: `False`

#### Complexity Analysis

Let L be the length of the searched word.

| Complexity | Value |
|---|---|
| Time | O(L) |
| Auxiliary space | O(1) |

---

### 6. Prefix Search

#### Explanation

Prefix Search checks whether at least one word in the Trie starts with a given prefix.

Unlike normal Search, it does not require the final node to have `is_end = True`.

It only checks whether the complete prefix path exists.

For example, suppose the Trie contains:

```text
CAT
CAR
CARE
DOG
```

Then:

| Prefix | Result |
|---|---|
| C | True |
| CA | True |
| CAR | True |
| CARE | True |
| CAB | False |
| DO | True |
| DOGS | False |

Notice that `CAR` is a valid prefix even if we only want to check whether longer words begin with it.

#### Algorithm

```text
STARTS_WITH(root, prefix):

    node = root

    FOR each character in prefix:

        IF character does not exist in node.children:
            RETURN False

        node = node.children[character]

    RETURN True
```

#### Python Implementation

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False


class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):

        node = self.root

        for char in word:

            if char not in node.children:
                node.children[char] = TrieNode()

            node = node.children[char]

        node.is_end = True

    def starts_with(self, prefix):

        node = self.root

        for char in prefix:

            if char not in node.children:
                return False

            node = node.children[char]

        return True


trie = Trie()

trie.insert("CAT")
trie.insert("CAR")
trie.insert("CARE")
trie.insert("DOG")

print(trie.starts_with("CA"))    # True
print(trie.starts_with("CAR"))   # True
print(trie.starts_with("CAB"))   # False
print(trie.starts_with("DO"))    # True
print(trie.starts_with("DOGS"))  # False
```

#### Dry Run

Check whether the prefix `CAR` exists.

| Step | Character | Action |
|---|---|---|
| 1 | C | Found, move to C |
| 2 | A | Found, move to A |
| 3 | R | Found, move to R |
| 4 | End | Prefix path exists |

Result: `True`

Check whether the prefix `CAB` exists.

| Step | Character | Action |
|---|---|---|
| 1 | C | Found |
| 2 | A | Found |
| 3 | B | Not found |

Result: `False`

#### Complexity Analysis

Let L be the length of the prefix.

| Complexity | Value |
|---|---|
| Time | O(L) |
| Auxiliary space | O(1) |

---

## 7. Complete Trie Implementation

The following implementation combines all the fundamental Trie operations into one reusable class.

```python
class TrieNode:

    def __init__(self):
        self.children = {}
        self.is_end = False


class Trie:

    def __init__(self):
        self.root = TrieNode()

    # Insert a word
    def insert(self, word):

        node = self.root

        for char in word:

            if char not in node.children:
                node.children[char] = TrieNode()

            node = node.children[char]

        node.is_end = True

    # Search for a complete word
    def search(self, word):

        node = self.root

        for char in word:

            if char not in node.children:
                return False

            node = node.children[char]

        return node.is_end

    # Check whether a prefix exists
    def starts_with(self, prefix):

        node = self.root

        for char in prefix:

            if char not in node.children:
                return False

            node = node.children[char]

        return True


# Driver code
trie = Trie()

trie.insert("apple")
trie.insert("app")
trie.insert("application")
trie.insert("bat")

print(trie.search("app"))             # True
print(trie.search("apple"))           # True
print(trie.search("appl"))            # False
print(trie.starts_with("appl"))       # True
print(trie.starts_with("bat"))        # True
print(trie.starts_with("cat"))        # False
```

## 8. Complexity Summary

Let:

- L = length of the input word or prefix.
- N = total number of characters inserted across all words.

| Operation | Time Complexity | Explanation |
|---|---|---|
| Create Trie | O(1) | Create root node |
| Insert | O(L) | Process each character |
| Search | O(L) | Traverse each character |
| Prefix Search | O(L) | Traverse prefix characters |
| Space | O(N) | At most N character nodes, excluding the root |

*Note:* These complexities assume average O(1) dictionary operations in Python.