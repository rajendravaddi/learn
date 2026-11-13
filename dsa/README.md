# DSA Learning Roadmap

# 1. DSA Foundations

## 1.1 Big-O and Complexity

### Learn

- Time complexity
- Space complexity
- Auxiliary space
- Input size and growth rate
- Best-case complexity
- Average-case complexity
- Worst-case complexity
- Amortized complexity

### Complexity Classes

- O(1)
- O(log n)
- O(n)
- O(n log n)
- O(n²)
- O(n³)
- O(2ⁿ)
- O(n!)

## 1.2 Essential Mathematical Foundations

- Modular arithmetic
- GCD and LCM
- Prime numbers
- Factors
- Sieve of Eratosthenes
- Powers and logarithms
- Bit representation
- Basic combinatorics
- Permutations and combinations

## 1.3 Problem-Solving Fundamentals

- Understand constraints
- Brute-force approach
- Optimization
- Time/space trade-offs
- Edge cases
- Invariants
- Dry runs
- Choosing the right data structure
- Proving correctness at a basic level

---

# 2. Arrays

## 2.1 Data Structure

- Static arrays
- Dynamic arrays
- Python lists
- Indexing
- Traversal
- Insertion
- Deletion
- Updating
- Searching
- Memory layout

## 2.2 Algorithms

- Linear search
- Binary search
- Basic sorting
- Kadane's algorithm
- Dutch National Flag algorithm

## 2.3 Patterns

- Two Pointers
- Sliding Window
- Prefix Sum
- Difference Array
- Rotation
- Fast and Slow Pointers
- Sorting + Scanning
- In-Place Manipulation

# 3. Strings

## 3.1 String Foundations

- ASCII / Unicode
- Indexing
- Slicing
- Immutability
- Traversal
- Comparison
- Construction
- Python String Methods

## 3.2 Algorithms

- Basic String Algorithms
  - String Traversal
  - Palindrome Checking
  - Character Counting
  - Frequency Counting
  - String searching
  - Basic String Transformations
- Pattern Matching algorithms
  - Naive Pattern Matching basics
  - KMP
  - Z algorithm
  - Rabin-Karp
- String Hashing

# 4. Hashing

## 4.1 Hashing Fundamentals

- Core Concepts
  - What is hashing?
  - Why hashing is needed
  - Hash function
  - Key → hash value → bucket/index
  - Hash table
  - Hash map
  - Hash set
- Hash Function Construction Methods
  - Division / Modulo method
  - Multiplication method
  - Mid-Square method
  - Folding method
  - Digit extraction / digit analysis
  - Basic properties of a good hash function
    - Deterministic
    - Fast to compute
    - Good distribution
    - Minimize collisions
- Collision
  - What is a collision?
  - Why collisions are unavoidable
  - Effect of collisions on performance
- Collision Resolution
  - Chaining
  - Open addressing
    - Linear probing
    - Quadratic probing
    - Double hashing
- Hash Table Performance
  - Load factor
  - Resizing
  - Rehashing
  - Average-case complexity
  - Worst-case complexity
  - Amortized cost of resizing

## 4.2 Python Hash-Based Data Structures
- Python dict
  - What is dict?
  - Key-value mapping
  - Creating dictionaries
  - Accessing values
  - Inserting
  - Updating
  - Deleting
  - Membership testing
  - Iterating over dictionaries
  - keys(), values(), items()
  - get()
  - pop()
- Python set
  - What is set?
  - Uniqueness
  - Creating sets
  - Adding
  - Removing
  - Membership testing
  - Set operations
    - Union
    - Intersection
    - Difference
    - Symmetric difference
- Hashability
  - What is a hashable object?
  - Hashable vs unhashable objects
  - Immutable keys
  - Why lists cannot be dictionary keys
  - Why lists cannot be set elements
  - Tuples as dictionary keys
  - Nested hashability
  - Mutable objects and hashing
- Custom Objects
  - `__hash__`
  - `__eq__`
  - Relationship between equality and hashing
  - Equal objects → same hash
  - Hash collision ≠ equality
  - Hashing custom objects safely
  - Problems with mutating hash-relevant state

---

# 5. Linked Lists

## 5.1 Data Structure

- Singly linked list
- Doubly linked list
- Circular linked list
- Node
- Head
- Tail
- Pointer/reference manipulation

## 5.2 Algorithms

- Reversal
- Merge two lists
- Find middle
- Detect cycle
- Remove cycle
- Find intersection

---

# 6. Stack

## 6.1 Data Structure

- Stack
- LIFO
- Push
- Pop
- Peek
- Python list as stack
- `collections.deque`
- Stack Overflow and Stack Underflow
- Applications of Stack

## 6.2 Algorithms / Techniques

- Parentheses matching
- Expression evaluation
- Expression conversion
- Undo-style processing
- Recursive simulation

## 6.3 Patterns

- Monotonic stack
- Matching pairs
- Previous greater element
- Previous smaller element
- Next greater element
- Next smaller element
- Stack for nested structures
- Stack + greedy

---

# 7. Queue

## 7.1 Data Structures

- Definitions
  - Queue
  - FIFO
  - Front and Rear
  - Enqueue
  - Dequeue
  - Peek / Front
  - IsEmpty and IsFull
  - Queue Overflow and Underflow
- Types of Queues
  - Linear Queue
  - Circular queue
  - Deque
  - Priority queue introduction
- Queue Implementations
  - Python List
  - collections.deque
  - Linked List
  - queue.Queue
- Queue Operations and complexity
- Applications of Queue

## 7.2 Algorithms

- Queue Traversal
- Queue Reversal
- Reverse First K Elements of a Queue
- Interleaving First and Second Halves of a Queue
- Generate Binary Numbers Using Queue
- Queue Simulation
- Basic Task Scheduling
- Producer-Consumer Concept
- Buffering and Message Queue Basics

---

# 8. Searching

## 8.1 Algorithms

- Linear search
- Binary search
- Recursive binary search
- Iterative binary search
- Lower bound
- Upper bound
- First occurrence
- Last occurrence

## 8.2 Patterns

- Binary search on sorted data
- Binary search on answer
- Search space reduction
- Minimum feasible value
- Maximum feasible value
- Peak finding
- Rotated sorted array


---

# 9. Sorting

## 9.1 Algorithms

- Bubble sort
- Selection sort
- Insertion sort
- Merge sort
- Quick sort
- Heap sort
- Counting sort
- Radix sort
- Bucket sort

## 9.2 Concepts

- Stable sorting
- In-place sorting
- Comparison sorting
- Divide and conquer
- Partitioning
- Custom comparators

---

# 10. Recursion

## 10.1 Concepts

- Base case
- Recursive case
- Call stack
- Recurrence
- Recursion tree
- Tail recursion concept
- Backtracking introduction

## 10.2 Patterns

- Divide and conquer
- Recursive traversal
- Choose → explore → unchoose
- State tracking
- Branching recursion


---

# 11. Backtracking

## 11.1 Concepts

- State
- Choices
- Constraints
- Decision tree
- Backtracking
- Pruning

## 11.2 Patterns

- Choose/skip
- Constraint satisfaction
- Grid backtracking


---

# 12. Trees

## 12.1 Data Structure

- Tree terminology
- Root
- Parent
- Child
- Leaf
- Height
- Depth
- Subtree
- Binary tree
- N-ary tree

## 12.2 Traversal Algorithms

- Introduction to Tree Traversal
- Preorder
- Inorder
- Postorder
- Level-order
- Recursive vs Iterative Traversal


## 12.3 Patterns

- Recursive tree processing
- Bottom-up recursion
- Top-down recursion
- Path tracking
- Subtree aggregation
- Tree depth/height


---

# 13. Binary Search Trees

## 13.1 Data Structure

- Binary Search Tree
- BST Structure
- Important BST Rules
- BST vs Binary Tree
- Why Do We Need BST
- BST Height and Complexity

## 13.2 Algorithms

- BST search
- BST insertion
- BST Minimum and Maximum
- BST deletion
- Inorder traversal
- Validate BST
- Inorder Predecessor
- Inorder Successor

## 13.3 Patterns

- Inorder = sorted order
- Search-space reduction
- Recursive BST processing
- Range queries
- Successor/predecessor


---

# 14. Heap

## 14.1 Data Structure

- Introduction to Heap
- Complete Binary Tree
- Binary heap
- Min heap
- Max heap
- Heapify
- Insert
- Extract
- Peek
- Python's Built-in Heap Implementation

## 14.2 Algorithms

- Heap sort
- Build heap
- Kth largest/smallest
- Top-K elements
- Merge K sorted structures

---

# 15. Greedy Algorithms

## 15.1 Concepts

- Greedy choice
- Local vs global optimum
- Exchange argument
- Sorting for greedy
- Feasibility
- Optimization


## 15.2 Patterns

- Sort + greedy
- Interval greedy
- Earliest finish time
- Maximum reach
- Local optimal choice
- Greedy + heap

---

# 16. Graphs

## 16.1 Data Structure

- What is a Graph?
- Vertex and Edge
- Directed and Undirected Graphs
- Weighted and Unweighted Graphs
- Graph Representation
  - Adjacency matrix
  - Adjacency list
  - Edge list
- Comparing Graph Representations
- Degree, In-degree and Out-degree

## 16.2 Traversal Algorithms

- What is Graph Traversal?
- DFS
- Recursive DFS
- Iterative DFS
- BFS
- DFS vs BFS
- Connected components

## 16.3 Patterns

- Grid as graph
- BFS shortest path
- Multi-source BFS
- Cycle detection
- State graph

---

# 17. Advanced Graph Algorithms

## 17.1 Algorithms

- DAG Fundamentals
  - Directed Acyclic Graph
  - Properties and applications of DAGs
- Topological Sorting
  - Topological sort
  - Kahn's algorithm
  - DFS-based topological sort
- Shortest Path Algorithms
  - Weighted graphs
  - Edge relaxation
  - Dijkstra's algorithm
  - Bellman-Ford algorithm
  - Floyd-Warshall algorithm
  - 0-1 BFS
- Minimum Spanning Tree
  - Spanning tree
  - Minimum spanning tree
  - Kruskal's algorithm
  - Prim's algorithm

## 17.2 Patterns

- Dependency Ordering
- DAG + DP
- Shortest Path Problem-Solving
- Graph + Heap
- Multi-source Shortest Path
- Weighted Graph Traversal (0-1 BFS applications)

---

# 18. Disjoint Set Union / Union-Find

## 18.1 Data Structure

- Parent array
- Find
- Union
- Connected components

## 18.2 Optimizations

- Path compression
- Union by rank
- Union by size

## 18.3 Patterns

- Dynamic connectivity
- Component merging
- Cycle detection
- Kruskal's MST


---

# 19. Dynamic Programming

## 19.1 Foundations

- Overlapping subproblems
- Optimal substructure
- State
- Transition
- Base cases
- Memoization
- Tabulation
- Space optimization

## 19.2 Patterns

### 1D DP

- Fibonacci-style DP
- Climbing stairs
- House robber

### 2D DP

- Grid DP
- Unique paths
- Minimum path sum

### Knapsack

- 0/1 knapsack
- Unbounded knapsack
- Subset sum
- Partition problems

### String DP

- Longest common subsequence
- Edit distance
- Longest palindromic subsequence

### Sequence DP

- Longest increasing subsequence
- Maximum subarray variants

### Interval DP

- Matrix chain multiplication
- Burst balloons

### State-machine DP

- Stock problems
- Buy/sell states
- Cooldown/transaction constraints


---

# 20. Trie

## 20.1 Data Structure

- Trie node
- Children
- End-of-word marker
- Insert
- Search
- Prefix search

## 20.2 Algorithms / Techniques

- Prefix matching
- Autocomplete
- Word lookup
- Dictionary matching

## 20.3 Patterns

- Prefix-based search
- Trie + DFS
- Trie + backtracking
- Trie + string problems


---

# 21. Bit Manipulation

## 21.1 Fundamentals

- Binary representation
- AND
- OR
- XOR
- NOT
- Left shift
- Right shift
- Signed integers

## 21.2 Techniques

- Check odd/even
- Set bit
- Clear bit
- Toggle bit
- Check bit
- Count set bits
- Power of two
- XOR tricks
- Bit masks

## 21.3 Patterns

- XOR cancellation
- Bitmask subsets
- State compression
- Power-of-two checks
- Unique element problems
