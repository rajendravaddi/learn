# Bit Manipulation - Fundamentals

## 1. Binary Representation

### 1.1 What is Binary Representation?

Binary representation is a way of representing numbers using only two digits:

- `0`
- `1`

Our normal number system is Decimal (Base 10), which uses digits from 0 to 9.

Computers internally represent and process data using binary digits called bits.

A bit is the smallest unit of digital information.

### 1.2 Decimal vs Binary

| Decimal | Binary |
|---:|---:|
| 0 | 0 |
| 1 | 1 |
| 2 | 10 |
| 3 | 11 |
| 4 | 100 |
| 5 | 101 |
| 6 | 110 |
| 7 | 111 |
| 8 | 1000 |
| 9 | 1001 |
| 10 | 1010 |
| 11 | 1011 |
| 12 | 1100 |
| 13 | 1101 |
| 14 | 1110 |
| 15 | 1111 |
| 16 | 10000 |

### 1.3 How Binary Numbers Work

Binary uses powers of 2.

For example:

```text
Binary:  1  0  1  1  0

Position: 4  3  2  1  0

Values:  16  8  4  2  1
```

To convert binary `10110` into decimal:

```text
10110
```

Calculate:

```text
= (1 × 2⁴)
+ (0 × 2³)
+ (1 × 2²)
+ (1 × 2¹)
+ (0 × 2⁰)

= 16 + 0 + 4 + 2 + 0

= 22
```

Therefore:

```text
Binary 10110 = Decimal 22
```

### 1.4 Decimal to Binary Conversion

To convert a decimal number into binary:

1. Divide the number by 2.
2. Record the remainder.
3. Divide the quotient by 2.
4. Repeat until the quotient becomes 0.
5. Read the remainders from bottom to top.

Example: Convert 13 to binary.

| Division | Quotient | Remainder |
|---|---:|---:|
| 13 ÷ 2 | 6 | 1 |
| 6 ÷ 2 | 3 | 0 |
| 3 ÷ 2 | 1 | 1 |
| 1 ÷ 2 | 0 | 1 |

Read the remainders from bottom to top:

```text
1101
```

Therefore:

```text
13 = 1101 (Binary)
```

### 1.5 Python Implementation

Decimal to binary:

```python
n = 13

binary = bin(n)[2:]

print(binary)
```

Output:

```text
1101
```

Binary to decimal:

```python
binary = "1101"

decimal = int(binary, 2)

print(decimal)
```

Output:

```text
13
```

### 1.6 Important Binary Concepts

**Bit Position**

Bit positions are counted from right to left, starting at 0.

Example:

```text
Binary:       1  0  1  1  0  1
Position:     5  4  3  2  1  0
```

**Least Significant Bit (LSB)**

The rightmost bit is called the Least Significant Bit.

**Most Significant Bit (MSB)**

The leftmost bit in a fixed-width representation is called the Most Significant Bit.

**Set Bit**

A bit containing `1` is called a set bit.

**Unset Bit**

A bit containing `0` is called an unset or clear bit.

---

## 2. Bitwise AND (&)

### 2.1 What is Bitwise AND?

Bitwise AND compares corresponding bits of two numbers.

The result is `1` only when both corresponding bits are `1`.

Otherwise, the result is `0`.

### 2.2 Truth Table

| A | B | A AND B |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

### 2.3 Example

Calculate:

```text
A = 12
B = 10
```

Binary representations:

```text
12 = 1100
10 = 1010
```

Apply AND:

```text
   1100
&  1010
--------
   1000
```

Result:

```text
1000 = 8
```

Therefore:

```python
12 & 10 = 8
```

### 2.4 Python Implementation

```python
a = 12
b = 10

result = a & b

print(result)
```

Output:

```text
8
```

### 2.5 Important Properties of AND

**Property 1: AND with zero**

```python
n & 0 == 0
```

Example:

```text
1010
&
0000
----
0000
```

**Property 2: AND with itself**

```python
n & n == n
```

**Property 3: AND with all ones**

For an n-bit mask:

```python
n & ((1 << n_bits) - 1)
```

preserves the lowest `n_bits` of the value.

### 2.6 Common Applications

1. Check whether a particular bit is set.
2. Clear selected bits using a mask.
3. Extract specific bits.
4. Check odd or even numbers.
5. Apply bit masks.

Example: Check whether a number is odd.

```python
n = 7

if n & 1:
    print("Odd")
else:
    print("Even")
```

Output:

```text
Odd
```

Why?

The last binary bit is `1` for odd numbers and `0` for even numbers.

---

## 3. Bitwise OR (|)

### 3.1 What is Bitwise OR?

Bitwise OR compares corresponding bits of two numbers.

The result is `1` if at least one corresponding bit is `1`.

The result is `0` only when both bits are `0`.

### 3.2 Truth Table

| A | B | A OR B |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

### 3.3 Example

Calculate:

```text
A = 12
B = 10
```

Binary:

```text
12 = 1100
10 = 1010
```

Apply OR:

```text
   1100
|  1010
--------
   1110
```

Result:

```text
1110 = 14
```

Therefore:

```python
12 | 10 = 14
```

### 3.4 Python Implementation

```python
a = 12
b = 10

result = a | b

print(result)
```

Output:

```text
14
```

### 3.5 Important Properties of OR

**Property 1: OR with zero**

```python
n | 0 == n
```

**Property 2: OR with itself**

```python
n | n == n
```

**Property 3: OR with all ones**

For a fixed-width n-bit value:

```python
n | ((1 << n_bits) - 1)
```

sets all of its lowest `n_bits` to `1`.

### 3.6 Common Applications

- Set particular bits.
- Combine bit flags.
- Combine permissions.
- Construct bit masks.
- Enable specific options.

Example:

```python
permissions = 0b0100

# Enable the second bit from the right
permissions = permissions | 0b0010

print(bin(permissions))
```

Output:

```text
0b110
```

---

## 4. Bitwise XOR (^)

### 4.1 What is Bitwise XOR?

XOR stands for Exclusive OR.

It compares corresponding bits of two numbers.

The result is `1` when the bits are different.

The result is `0` when the bits are the same.

### 4.2 Truth Table

| A | B | A XOR B |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

### 4.3 Example

Calculate:

```text
A = 12
B = 10
```

Binary:

```text
12 = 1100
10 = 1010
```

Apply XOR:

```text
   1100
^  1010
--------
   0110
```

Result:

```text
0110 = 6
```

Therefore:

```python
12 ^ 10 = 6
```

### 4.4 Python Implementation

```python
a = 12
b = 10

result = a ^ b

print(result)
```

Output:

```text
6
```

### 4.5 Important XOR Properties

These properties are extremely important in DSA interviews.

**Property 1: XOR with zero**

```python
n ^ 0 == n
```

**Property 2: XOR with itself**

```python
n ^ n == 0
```

**Property 3: XOR is commutative**

```python
a ^ b == b ^ a
```

**Property 4: XOR is associative**

```python
(a ^ b) ^ c == a ^ (b ^ c)
```

**Property 5: XOR cancellation**

```python
a ^ b ^ a == b
```

Because:

```text
a ^ a = 0

0 ^ b = b
```

### 4.6 Common Applications

- Find the unique number in an array.
- Find a missing number.
- Identify numbers appearing an odd number of times.
- Swap values using XOR (usually not recommended in normal Python code).
- Compare bit differences.
- XOR-based encoding and decoding.

Example:

```python
arr = [2, 3, 2, 4, 3]

result = 0

for num in arr:
    result ^= num

print(result)
```

Output:

```text
4
```

Why?

```text
2 ^ 3 ^ 2 ^ 4 ^ 3

= (2 ^ 2) ^ (3 ^ 3) ^ 4

= 0 ^ 0 ^ 4

= 4
```

This works when exactly one value occurs an odd number of times and all other values occur an even number of times.

---

## 5. Bitwise NOT (~)

### 5.1 What is Bitwise NOT?

Bitwise NOT reverses every bit:

- `0` becomes `1`.
- `1` becomes `0`.

It is also called the complement operator.

### 5.2 Truth Table

| A | NOT A |
|---|---|
| 0 | 1 |
| 1 | 0 |

### 5.3 Example

Consider an 8-bit representation of 5:

```text
5 = 00000101
```

Flip every bit:

```text
    00000101
NOT --------
    11111010
```

Interpreting this result as an 8-bit signed two's-complement integer gives `-6`.

Therefore, in Python:

```python
~5 = -6
```

### 5.4 Python Implementation

```python
n = 5

result = ~n

print(result)
```

Output:

```text
-6
```

### 5.5 Why Does ~5 Return -6?

Python integers behave as though they have an unlimited number of sign-extension bits.

The identity is:

```text
~n = -(n + 1)
```

Therefore:

```text
~5 = -(5 + 1)
   = -6
```

Similarly:

```text
~0 = -1
~1 = -2
~2 = -3
```

### 5.6 Fixed-Width NOT

Sometimes we want to flip only a fixed number of bits.

For an 8-bit value:

```python
n = 5

result = (~n) & 0xFF

print(bin(result))
```

Output:

```text
0b11111010
```

Here:

```python
0xFF
```

is the 8-bit mask:

```text
11111111
```

AND restricts the result to the lowest eight bits.

### 5.7 Common Applications

- Invert bits.
- Create masks.
- Clear selected bits.
- Work with fixed-width binary representations.
- Perform bitwise complement operations.

Important: In Python, `~n` does not behave like flipping only the visible bits of `bin(n)`. Use a mask when fixed-width behavior is required.

---

## 6. Left Shift (<<)

### 6.1 What is Left Shift?

The left shift operator moves all bits toward the left by a specified number of positions.

Syntax:

```python
number << positions
```

For non-negative integers, shifting left by `k` positions is equivalent to multiplying by `2**k`.

### 6.2 Example

Consider:

```text
5 = 00000101
```

Shift left by one position:

```text
00000101 << 1

00001010
```

Result:

```text
10
```

Shift left by two positions:

```text
00000101 << 2

00010100
```

Result:

```text
20
```

### 6.3 Python Implementation

```python
n = 5

print(n << 1)
print(n << 2)
print(n << 3)
```

Output:

```text
10
20
40
```

### 6.4 Mathematical Relationship

```text
n << 1 = n × 2

n << 2 = n × 4

n << 3 = n × 8

n << k = n × 2^k
```

For non-negative integers, this relationship holds exactly.

### 6.5 Important Application: Create a Bit Mask

Suppose we want a binary number containing only the bit at position 3.

Use:

```python
mask = 1 << 3

print(bin(mask))
```

Output:

```text
0b1000
```

Explanation:

```text
1       = 0001
1 << 1  = 0010
1 << 2  = 0100
1 << 3  = 1000
```

This operation is heavily used in bit manipulation problems.

### 6.6 Common Applications

- Multiply a number by powers of two.
- Create bit masks.
- Set specific bits.
- Generate combinations using bit positions.
- Represent flags and states.

---

## 7. Right Shift (>>)

### 7.1 What is Right Shift?

The right shift operator moves bits toward the right by a specified number of positions.

Syntax:

```python
number >> positions
```

For non-negative integers, shifting right by `k` positions is equivalent to integer division by `2**k`.

### 7.2 Example

Consider:

```text
20 = 00010100
```

Shift right by one:

```text
00010100 >> 1

00001010
```

Result:

```text
10
```

Shift right by two:

```text
00010100 >> 2

00000101
```

Result:

```text
5
```

### 7.3 Python Implementation

```python
n = 20

print(n >> 1)
print(n >> 2)
print(n >> 3)
```

Output:

```text
10
5
2
```

### 7.4 Mathematical Relationship

For non-negative integers:

```text
n >> 1 = n // 2

n >> 2 = n // 4

n >> 3 = n // 8

n >> k = n // 2^k
```

### 7.5 Important Application: Access a Particular Bit

Suppose we want to check bit position 2 of a number.

Number:

```text
n = 13

Binary = 1101
```

Shift right by 2:

```text
1101 >> 2

0011
```

Now AND with 1:

```text
0011
&
0001
----
0001
```

Result:

```text
1
```

Python:

```python
n = 13
position = 2

bit = (n >> position) & 1

print(bit)
```

Output:

```text
1
```

### 7.6 Common Applications

- Divide non-negative integers by powers of two.
- Extract particular bits.
- Iterate through binary digits.
- Check bit positions.
- Implement bit-counting algorithms.

---

## 8. Signed Integers

### 8.1 What are Signed Integers?

Signed integers are integers that can represent both:

- Positive numbers
- Negative numbers
- Zero

An unsigned integer represents only zero and positive values.

For an n-bit integer:

Unsigned range:

```text
0 to 2^n - 1
```

Signed two's-complement range:

```text
-2^(n-1) to 2^(n-1) - 1
```

Example for 8-bit integers:

| Type | Minimum | Maximum |
|---|---:|---:|
| Unsigned 8-bit | 0 | 255 |
| Signed 8-bit | -128 | 127 |

### 8.2 How Negative Numbers Are Represented

Modern computers commonly use two's complement to represent signed integers.

To obtain the two's-complement representation of a negative number:

1. Write the positive number in binary using the chosen bit width.
2. Invert all bits.
3. Add 1.

Example: Represent `-5` using 8 bits.

Step 1: Positive 5:

```text
00000101
```

Step 2: Invert bits:

```text
11111010
```

Step 3: Add 1:

```text
11111011
```

Therefore:

```text
-5 = 11111011 (8-bit two's complement)
```

### 8.3 Understanding the Sign Bit

In an 8-bit signed two's-complement representation:

- The most significant bit `0` indicates a non-negative value.
- The most significant bit `1` indicates a negative value.

Examples:

```text
00000101 = 5

11111011 = -5
```

### 8.4 Why Does Two's Complement Work?

For an n-bit two's-complement number, the MSB has a negative weight.

For 8 bits:

```text
Position:  7   6  5  4  3  2  1  0

Weight:   -128 64 32 16  8  4  2  1
```

For:

```text
11111011
```

Calculate:

```text
= -128 + 64 + 32 + 16 + 8 + 0 + 2 + 1

= -5
```

### 8.5 Python Signed Integer Behavior

Python integers have arbitrary precision and do not have a fixed 8-bit or 32-bit signed integer width.

Example:

```python
print(-5)
print(bin(-5))
```

Output:

```text
-5
-0b101
```

Python displays a negative binary representation with a minus sign rather than displaying a fixed-width two's-complement bit pattern.

To view the 8-bit two's-complement representation:

```python
n = -5

result = format(n & 0xFF, "08b")

print(result)
```

Output:

```text
11111011
```

### 8.6 Signed Right Shift

Python uses arithmetic right shift for signed integers.

This means the sign bit is effectively extended on the left.

Example:

```python
n = -8

print(n >> 1)
print(n >> 2)
```

Output:

```text
-4
-2
```

This is equivalent to floor division by powers of two:

```python
-8 // 2  # -4
-8 // 4  # -2
```

### 8.7 Important Difference Between Python and Fixed-Width Languages

Languages such as C, C++, and Java commonly use fixed-width integer types.

Python integers support arbitrary precision.

For example:

```python
n = 1 << 100

print(n)
```

Python can represent this large integer without overflowing a standard 32-bit or 64-bit integer.

When solving DSA problems in Python, remember:

- Negative integers use Python's signed bitwise semantics.
- Bitwise NOT follows `~n = -(n + 1)`.
- Right shifting negative integers is arithmetic.
- Use masks when you need fixed-width behavior.

---

## 9. Operator Precedence in Python

When combining multiple bitwise operations, remember their relative precedence.

From higher to lower:

1. `~` — Bitwise NOT
2. `<<`, `>>` — Shifts
3. `&` — AND
4. `^` — XOR
5. `|` — OR

Example:

```python
result = 5 & 3 | 2
```

This is evaluated as:

```python
result = (5 & 3) | 2
```

Output:

```text
3
```

Interview recommendation: Use parentheses whenever combining multiple bitwise operators. This makes the intended operation clear and prevents precedence mistakes.
