# Bit Manipulation - Techniques

## 1. Check Odd / Even

### 1.1 Concept

We can determine whether a number is odd or even by checking its least significant bit (LSB), which is the rightmost bit.

Binary representation:

```text
Even numbers end with 0.
Odd numbers end with 1.
```

Examples:

| Number | Binary | Odd / Even |
|---:|---|---|
| 7 | 111 | Odd |
| 8 | 1000 | Even |

### 1.2 Technique

Use bitwise AND with `1`.

```python
n & 1
```

If the result is:

- `0` → Even
- `1` → Odd

Why?

The binary representation of `1` is:

```text
0001
```

AND with 1 extracts the last bit.

### 1.3 Algorithm

```text
CHECK_ODD_EVEN(n):

    IF (n & 1) == 1:
        RETURN "Odd"

    ELSE:
        RETURN "Even"
```

### 1.4 Python Implementation

```python
def check_odd_even(n):

    if n & 1:
        return "Odd"

    return "Even"


print(check_odd_even(7))
print(check_odd_even(8))
```

Output:

```text
Odd
Even
```

### 1.5 Complexity

- Time: O(1)
- Space: O(1)

---

## 2. Set a Bit

### 2.1 Concept

Setting a bit means changing a particular bit from `0` to `1`.

If the bit is already `1`, it remains unchanged.

Example:

```text
Original:  1010
Set bit 2: 1110
```

Bit positions are counted from right to left, starting at zero.

```text
Binary:    1 0 1 0
Position:  3 2 1 0
```

### 2.2 Technique

Use bitwise OR with a mask.

```python
n | (1 << position)
```

Why?

First create a mask:

```python
1 << position
```

Then OR with the original number.

OR guarantees that the selected bit becomes `1`.

### 2.3 Algorithm

```text
SET_BIT(n, position):

    mask = 1 << position

    result = n | mask

    RETURN result
```

### 2.4 Python Implementation

```python
def set_bit(n, position):

    return n | (1 << position)


print(set_bit(10, 2))
```

Output:

```text
14
```

### 2.5 Complexity

- Time: O(1)
- Space: O(1)

---

## 3. Clear a Bit

### 3.1 Concept

Clearing a bit means changing a particular bit from `1` to `0`.

If the bit is already `0`, it remains unchanged.

Example:

```text
Original:    1110
Clear bit 2: 1010
```

### 3.2 Technique

Use bitwise AND with the inverted mask.

```python
n & ~(1 << position)
```

Steps:

1. Create a mask using left shift.
2. Invert the mask using NOT.
3. Apply AND with the original number.

### 3.3 Algorithm

```text
CLEAR_BIT(n, position):

    mask = 1 << position

    result = n & ~mask

    RETURN result
```

### 3.4 Python Implementation

```python
def clear_bit(n, position):

    return n & ~(1 << position)


print(clear_bit(14, 2))
```

Output:

```text
10
```

### 3.5 Complexity

- Time: O(1)
- Space: O(1)

---

## 4. Toggle a Bit

### 4.1 Concept

Toggling means reversing the value of a particular bit.

- If the bit is `0`, change it to `1`.
- If the bit is `1`, change it to `0`.

Example:

```text
Original:     1010
Toggle bit 1: 1000
```

### 4.2 Technique

Use XOR with a mask.

```python
n ^ (1 << position)
```

Why?

XOR follows these rules:

```text
0 ^ 1 = 1
1 ^ 1 = 0
```

Therefore, XOR with 1 reverses the selected bit.

### 4.3 Algorithm

```text
TOGGLE_BIT(n, position):

    mask = 1 << position

    result = n ^ mask

    RETURN result
```

### 4.4 Python Implementation

```python
def toggle_bit(n, position):

    return n ^ (1 << position)


print(toggle_bit(10, 1))
```

Output:

```text
8
```

### 4.5 Complexity

- Time: O(1)
- Space: O(1)

---

## 5. Check a Particular Bit

### 5.1 Concept

Checking a bit means determining whether a particular position contains `0` or `1`.

Example:

```text
Number = 13

Binary = 1101
```

Positions:

```text
Binary:   1 1 0 1
Position: 3 2 1 0
```

Therefore:

- Bit 0 = 1
- Bit 1 = 0
- Bit 2 = 1
- Bit 3 = 1

### 5.2 Technique

There are two common approaches.

**Approach 1: Right Shift + AND**

```python
(n >> position) & 1
```

**Approach 2: AND with a Mask**

```python
n & (1 << position)
```

The first approach returns either `0` or `1`.

The second returns either `0` or a power of two.

### 5.3 Algorithm

```text
CHECK_BIT(n, position):

    result = (n >> position) & 1

    RETURN result
```

### 5.4 Python Implementation

```python
def check_bit(n, position):

    return (n >> position) & 1


print(check_bit(13, 0))
print(check_bit(13, 1))
print(check_bit(13, 2))
print(check_bit(13, 3))
```

Output:

```text
1
0
1
1
```

### 5.5 Complexity

- Time: O(1)
- Space: O(1)

---

## 6. Count Set Bits

### 6.1 Concept

A set bit is a bit whose value is `1`.

Counting set bits means counting the number of `1`s in a binary representation.

It is also called:

- Population Count
- Hamming Weight

Example:

```text
Number = 13

Binary = 1101
```

Number of set bits:

```text
1101 = 3 set bits
```

### 6.2 Approach 1: Convert to Binary

The simplest method is to convert the number into a binary string and count the ones.

Python:

```python
def count_set_bits(n):

    return bin(n).count("1")


print(count_set_bits(13))
```

Output:

```text
3
```

Time complexity: O(B), where B is the binary representation length.

Space complexity: O(B) for the binary string.

### 6.3 Approach 2: Check Every Bit

We can repeatedly check the least significant bit using AND with 1.

Algorithm:

```text
COUNT_SET_BITS(n):

    count = 0

    WHILE n > 0:

        count += n & 1

        n = n >> 1

    RETURN count
```

Python:

```python
def count_set_bits(n):

    count = 0

    while n > 0:

        count += n & 1

        n >>= 1

    return count


print(count_set_bits(13))
```

Output:

```text
3
```


### 6.4 Approach 3: Brian Kernighan's Algorithm

This is an important interview technique.

Observation:

```python
n & (n - 1)
```

removes the rightmost set bit of a positive integer.

Example:

```text
n     = 1100
n - 1 = 1011

AND   = 1000
```

One set bit is removed.

Instead of checking every bit, we repeatedly remove the rightmost set bit until the number becomes zero.

#### Algorithm

```text
COUNT_SET_BITS(n):

    count = 0

    WHILE n > 0:

        n = n & (n - 1)

        count += 1

    RETURN count
```

#### Python Implementation

```python
def count_set_bits(n):

    count = 0

    while n > 0:

        n = n & (n - 1)

        count += 1

    return count


print(count_set_bits(13))
```

Output:

```text
3
```

#### Dry Run

Input:

```text
n = 13 = 1101
```

| Iteration | n | n - 1 | n & (n - 1) |
|---|---|---|---|
| 1 | 1101 | 1100 | 1100 |
| 2 | 1100 | 1011 | 1000 |
| 3 | 1000 | 0111 | 0000 |

Number of iterations:

```text
3
```

Therefore:

```text
Count of set bits = 3
```

#### Complexity

Let K be the number of set bits and B be the number of binary digits.

| Approach | Time | Auxiliary Space |
|---|---|---|
| Binary conversion | O(B) | O(B) |
| Check every bit | O(B) | O(1) |
| Brian Kernighan | O(K) | O(1) |
| Python `int.bit_count()` | O(B) | O(1) auxiliary space conceptually |

Python also provides:

```python
n = 13

print(n.bit_count())
```

Output:

```text
3
```

Note: `int.bit_count()` counts the ones in the absolute value of an integer. For example, `(-13).bit_count()` is also `3`.

---

## 7. Check Whether a Number Is a Power of Two

### 7.1 Concept

A power of two is a number that can be represented as:

```text
2^0, 2^1, 2^2, 2^3, ...
```

Examples:

```text
1, 2, 4, 8, 16, 32, 64, 128
```

Binary representations:

| Number | Binary |
|---:|---|
| 1 | 0001 |
| 2 | 0010 |
| 4 | 0100 |
| 8 | 1000 |
| 16 | 10000 |
| 32 | 100000 |

Observation:

Every positive power of two contains exactly one set bit.

### 7.2 Technique

Use:

```python
n > 0 and (n & (n - 1)) == 0
```

Why?

For a power of two:

- There is exactly one set bit.
- Subtracting 1 turns that set bit into 0 and makes all lower bits 1.
- AND produces zero.

### 7.3 Example

For 8:

```text
8     = 1000
8 - 1 = 0111

AND   = 0000
```

For 10:

```text
10     = 1010
10 - 1 = 1001

AND    = 1000
```

The result is not zero, so 10 is not a power of two.

### 7.4 Algorithm

```text
IS_POWER_OF_TWO(n):

    IF n <= 0:
        RETURN False

    RETURN (n & (n - 1)) == 0
```

### 7.5 Python Implementation

```python
def is_power_of_two(n):

    return n > 0 and (n & (n - 1)) == 0


print(is_power_of_two(16))
print(is_power_of_two(18))
print(is_power_of_two(1))
print(is_power_of_two(0))
```

Output:

```text
True
False
True
False
```

### 7.6 Complexity

- Time: O(1)
- Space: O(1)

---

## 8. XOR Tricks

XOR is one of the most important operators in bit manipulation.

Its cancellation properties help solve several array problems without using extra data structures.

### 8.1 Trick 1: Find the Unique Element

#### Problem:

Given an array where every element appears twice except one element, find the unique element.

#### Example:

```python
arr = [4, 1, 2, 1, 2]
```

#### Output:

```text
4
```

#### Approach:

XOR all elements.

Since:

```text
a ^ a = 0
a ^ 0 = a
```

All duplicate elements cancel each other.

#### Algorithm:

```text
SINGLE_NUMBER(arr):

    result = 0

    FOR each num in arr:

        result = result XOR num

    RETURN result
```

#### Python Implementation:

```python
def single_number(arr):

    result = 0

    for num in arr:

        result ^= num

    return result


arr = [4, 1, 2, 1, 2]

print(single_number(arr))
```

#### Output:

```text
4
```

#### Complexity:

- Time: O(N)
- Space: O(1)

**Assumption**: Exactly one element occurs once, and all other elements occur exactly twice.

### 8.2 Trick 2: Find a Missing Number

#### Problem:

An array contains distinct numbers from `0` to `N`, with one number missing.

Find the missing number.

#### Example:

```python
arr = [3, 0, 1]
```

Expected range:

```text
0, 1, 2, 3
```

Missing number:

```text
2
```

#### Approach:

XOR all numbers in the expected range and XOR all array elements.

Matching values cancel, leaving the missing number.

#### Python:

```python
def missing_number(arr):

    n = len(arr)

    result = 0

    for i in range(n + 1):
        result ^= i

    for num in arr:
        result ^= num

    return result


arr = [3, 0, 1]

print(missing_number(arr))
```

Output:

```text
2
```

#### Complexity:

- Time: O(N)
- Space: O(1)

**Assumption**: The array contains distinct values from `0` through `N`, with exactly one value missing.

### 8.3 Trick 3: Find Two Numbers Appearing Once

#### Problem:

Every element in an array appears twice except two elements. Find those two unique elements.

Example:

```python
arr = [2, 4, 7, 9, 2, 4]
```

Expected output:

```text
[7, 9]
```

#### Approach:

Step 1: XOR every number.

```text
2 ^ 4 ^ 7 ^ 9 ^ 2 ^ 4

= 7 ^ 9
```

Step 2: The XOR result contains set bits where the two unique numbers differ.

Step 3: Extract the rightmost set bit.

```python
mask = xor_result & -xor_result
```

Step 4: Divide all numbers into two groups according to that bit.

Step 5: XOR each group separately.

#### Python Implementation

```python
def two_unique_numbers(arr):

    xor_result = 0

    for num in arr:
        xor_result ^= num

    # Extract rightmost set bit
    mask = xor_result & -xor_result

    first = 0
    second = 0

    for num in arr:

        if num & mask:
            first ^= num

        else:
            second ^= num

    return [first, second]


arr = [2, 4, 7, 9, 2, 4]

print(two_unique_numbers(arr))
```

Output:

```text
[7, 9]
```

#### Complexity:

- Time: O(N)
- Space: O(1)

Assumption: Exactly two values occur once and all remaining values occur twice.

### 8.4 Trick 4: Swap Two Numbers Using XOR

XOR can technically swap two integer variables without a temporary variable.

```python
a = 5
b = 10

a ^= b
b ^= a
a ^= b

print(a, b)
```

Output:

```text
10 5
```

Explanation:

After the first operation:

```text
a = original_a ^ original_b
```

After the second:

```text
b = original_a
```

After the third:

```text
a = original_b
```

Note: In Python, normal tuple swapping is clearer and preferred:

```python
a, b = b, a
```

XOR swapping is mainly useful for understanding XOR cancellation, not as a recommended coding practice.

---

## 9. Bit Masks

### 9.1 What is a Bit Mask?

A bit mask is a binary number used to select, check, set, clear, or modify particular bits in another number.

It is commonly used to represent a collection of Boolean states using a single integer.

Example:

```text
Mask = 1010
```

This mask selects bit positions 1 and 3.

Bit masks are widely used in:

- Subset generation
- Dynamic programming
- Permission systems
- Feature flags
- State compression
- Combinatorial problems

### 9.2 Create a Mask

To create a mask containing only bit position `k`:

```python
mask = 1 << k
```

Example:

```python
mask = 1 << 3

print(bin(mask))
```

Output:

```text
0b1000
```

### 9.3 Check a Bit Using a Mask

```python
n = 13
position = 2

mask = 1 << position

if n & mask:
    print("Bit is set")
else:
    print("Bit is not set")
```

Output:

```text
Bit is set
```

### 9.4 Set a Bit Using a Mask

```python
n = 10
position = 2

n = n | (1 << position)

print(n)
```

Output:

```text
14
```

### 9.5 Clear a Bit Using a Mask

```python
n = 14
position = 2

n = n & ~(1 << position)

print(n)
```

Output:

```text
10
```

### 9.6 Toggle a Bit Using a Mask

```python
n = 10
position = 1

n = n ^ (1 << position)

print(n)
```

Output:

```text
8
```

### 9.7 Represent Multiple States Using a Bit Mask

Suppose we have four permissions:

| Permission | Bit Position |
|---|---:|
| Read | 0 |
| Write | 1 |
| Execute | 2 |
| Delete | 3 |

We can represent all permissions using one integer.

Example:

```python
READ = 1 << 0
WRITE = 1 << 1
EXECUTE = 1 << 2
DELETE = 1 << 3

permissions = READ | WRITE | EXECUTE
```

Binary representation:

```text
111
```

Check whether WRITE permission exists:

```python
if permissions & WRITE:
    print("Write allowed")
```

Output:

```text
Write allowed
```

Disable WRITE permission:

```python
permissions &= ~WRITE
```

Enable DELETE permission:

```python
permissions |= DELETE
```

### 9.8 Bit Masks for Subset Representation

One of the most important DSA applications of bit masks is representing subsets.

Suppose we have:

```python
arr = [10, 20, 30]
```

There are:

```text
2^3 = 8 subsets
```

Each bit represents whether an element is selected.

| Mask | Binary | Selected Elements |
|---:|---|---|
| 0 | 000 | [] |
| 1 | 001 | [10] |
| 2 | 010 | [20] |
| 3 | 011 | [10, 20] |
| 4 | 100 | [30] |
| 5 | 101 | [10, 30] |
| 6 | 110 | [20, 30] |
| 7 | 111 | [10, 20, 30] |

#### Algorithm to Generate All Subsets

```text
GENERATE_SUBSETS(arr):

    n = length(arr)

    FOR mask FROM 0 TO (2^n) - 1:

        subset = []

        FOR i FROM 0 TO n - 1:

            IF mask & (1 << i):

                ADD arr[i] TO subset

        PRINT subset
```

#### Python Implementation

```python
def generate_subsets(arr):

    n = len(arr)

    result = []

    for mask in range(1 << n):

        subset = []

        for i in range(n):

            if mask & (1 << i):

                subset.append(arr[i])

        result.append(subset)

    return result


arr = [10, 20, 30]

print(generate_subsets(arr))
```

Output:

```text
[
    [],
    [10],
    [20],
    [10, 20],
    [30],
    [10, 30],
    [20, 30],
    [10, 20, 30]
]
```

#### Complexity Analysis

Let N be the number of elements.

Number of subsets:

```text
2^N
```

Each subset requires up to N bit checks.

- Time: O(N × 2^N)
- Output space: O(N × 2^N)

This is an exponential algorithm because the number of subsets itself is exponential.
