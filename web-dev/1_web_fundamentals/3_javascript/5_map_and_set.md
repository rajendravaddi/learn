# Map, Set, WeakMap and WeakSet

## 1. Map

A `Map` is a collection of key-value pairs, similar to an object. However, unlike ordinary objects, which use strings or symbols as property keys, a `Map` allows values of any data type as keys, including objects and functions.

**Key characteristics:**

- Keys are unique; setting an existing key updates its value.
- Keys and values can be of any data type.
- Maintains insertion order.
- Provides a `size` property.
- Directly iterable using `for...of`.

### Methods and Properties

| Method / Property | Description |
|---|---|
| `new Map(entries)` | Creates a Map |
| `set(key, value)` | Adds or updates an entry; returns the Map |
| `get(key)` | Returns the value or `undefined` |
| `has(key)` | Checks whether a key exists |
| `delete(key)` | Removes an entry; returns a boolean |
| `clear()` | Removes all entries |
| `size` | Returns the number of entries |
| `keys()` | Returns an iterator of keys |
| `values()` | Returns an iterator of values |
| `entries()` | Returns an iterator of key-value pairs |
| `forEach(callback)` | Iterates over entries using `(value, key, map)` |

### Example

```javascript
const users = new Map([
    [101, "Alex"],
    [102, "John"]
]);

// Add and update entries
users.set(103, "David");
users.set(101, "Alexander");

// Access and check entries
console.log(users.get(101)); // Alexander
console.log(users.has(102)); // true
console.log(users.size);     // 3

// Extract keys, values and entries
console.log([...users.keys()]);
// [101, 102, 103]

console.log([...users.values()]);
// ['Alexander', 'John', 'David']

console.log([...users.entries()]);
// [[101, 'Alexander'], [102, 'John'], [103, 'David']]

// Iterate
for (const [id, name] of users) {
    console.log(id, name);
}

// Use an object as a key
const admin = { id: 104 };

users.set(admin, "Admin");

console.log(users.get(admin)); // Admin

// Remove entries
users.delete(102);
users.clear();

console.log(users.size); // 0
```

Object keys are compared by reference, not by their contents.

### Usage

- Frequency counting.
- Caching computed results.
- Dynamic key-value collections.
- Mapping objects to associated data.
- Looking up records by unique identifiers.

Prefer ordinary objects for structured records with known properties and `Map` for dynamic key-value collections.

---

## 2. Set

A `Set` is a collection of unique values. It automatically prevents duplicate values from being stored.

**Key characteristics:**

- Stores unique values of any data type.
- Maintains insertion order.
- Does not support indexed access.
- Provides a `size` property.
- Directly iterable using `for...of`.
- Objects are considered unique based on their references.

### Methods and Properties

| Method / Property | Description |
|---|---|
| `new Set(iterable)` | Creates a Set |
| `add(value)` | Adds a value; returns the Set |
| `has(value)` | Checks whether a value exists |
| `delete(value)` | Removes a value; returns a boolean |
| `clear()` | Removes all values |
| `size` | Returns the number of values |
| `values()` | Returns an iterator of values |
| `keys()` | Same as `values()` |
| `entries()` | Returns `[value, value]` pairs |
| `forEach(callback)` | Iterates over values |

Modern JavaScript also provides mathematical set operations.

| Method | Description |
|---|---|
| `union(other)` | Values present in either set |
| `intersection(other)` | Values present in both sets |
| `difference(other)` | Values present only in the current set |
| `symmetricDifference(other)` | Values present in exactly one set |
| `isSubsetOf(other)` | Checks whether the current set is a subset |
| `isSupersetOf(other)` | Checks whether the current set is a superset |
| `isDisjointFrom(other)` | Checks whether the sets have no common values |

The set combination methods return new sets without modifying the original sets.

### Example

```javascript
const skills = new Set([
    "JavaScript",
    "React",
    "JavaScript"
]);

// Add values
skills.add("Node.js");
skills.add("React"); // Duplicate ignored

console.log(skills.size);       // 3
console.log(skills.has("React")); // true

// Iterate
for (const skill of skills) {
    console.log(skill);
}

// Convert to an array
console.log([...skills]);
// ['JavaScript', 'React', 'Node.js']

// Set operations
const required = new Set(["JavaScript", "TypeScript"]);

console.log([...skills.union(required)]);
// ['JavaScript', 'React', 'Node.js', 'TypeScript']

console.log([...skills.intersection(required)]);
// ['JavaScript']

console.log([...skills.difference(required)]);
// ['React', 'Node.js']

console.log([...skills.symmetricDifference(required)]);
// ['React', 'Node.js', 'TypeScript']

console.log(skills.isSubsetOf(required));   // false
console.log(skills.isSupersetOf(required)); // false
console.log(skills.isDisjointFrom(required)); // false

// Remove values
skills.delete("React");
skills.clear();

console.log(skills.size); // 0

// Remove duplicates from an array
const numbers = [1, 2, 2, 3, 3, 4];

console.log([...new Set(numbers)]);
// [1, 2, 3, 4]
```

### Usage

- Removing duplicate values from arrays.
- Tracking visited elements.
- Managing unique identifiers.
- Checking membership and permissions.
- Comparing collections.
- Graph traversal and other DSA problems.

Prefer `Set` when uniqueness and membership checking are more important than indexed access.

---

## 3. WeakMap

A `WeakMap` is a key-value collection that holds weak references to its keys.

Unlike `Map`, a `WeakMap` accepts only objects and non-registered symbols as keys. Its values can be of any data type.

When a key is no longer strongly reachable elsewhere in the application, it becomes eligible for garbage collection. The associated WeakMap entry can also be reclaimed.

**Key characteristics:**

- Keys must be objects or non-registered symbols.
- Values can be of any data type.
- Does not prevent its keys from being garbage collected.
- Not iterable.
- Does not provide a `size` property.
- Does not provide a `clear()` method.

### Methods

| Method | Description |
|---|---|
| `new WeakMap(entries)` | Creates a WeakMap |
| `set(key, value)` | Adds or updates an entry; returns the WeakMap |
| `get(key)` | Returns the value or `undefined` |
| `has(key)` | Checks whether a key exists |
| `delete(key)` | Removes an entry; returns a boolean |

### Example

```javascript
const userMetadata = new WeakMap();

let user = {
    id: 101,
    name: "Alex"
};

// Associate metadata with the object
userMetadata.set(user, {
    lastLogin: "2026-11-26",
    loginCount: 5
});

// Access metadata
console.log(userMetadata.get(user));
// { lastLogin: '2026-11-26', loginCount: 5 }

console.log(userMetadata.has(user)); // true

// Update metadata
userMetadata.set(user, {
    lastLogin: "2026-11-26",
    loginCount: 6
});

console.log(userMetadata.get(user).loginCount); // 6

// Remove an entry explicitly
userMetadata.delete(user);

console.log(userMetadata.has(user)); // false

// Associate data again
userMetadata.set(user, { loginCount: 6 });

// Remove the strong reference
user = null;

// The original user object and its WeakMap entry
// are now eligible for garbage collection.
```

Garbage collection is managed by the JavaScript runtime. Its exact timing is not guaranteed or directly observable through WeakMap.

### Usage

- Associating metadata with objects.
- Object-based caching.
- Storing auxiliary information without modifying objects.
- Associating data with DOM elements.
- Avoiding unnecessary retention of temporary objects.

Prefer `WeakMap` when associated data should not keep its key objects alive.

---

## 4. WeakSet

A `WeakSet` is a collection of unique objects and non-registered symbols that are held weakly.

Unlike a regular `Set`, a `WeakSet` does not prevent its stored objects from being garbage collected when they are no longer strongly reachable elsewhere.

**Key characteristics:**

- Stores only objects and non-registered symbols.
- Prevents duplicate entries based on identity.
- Holds weak references to its values.
- Not iterable.
- Does not provide a `size` property.
- Does not provide a `clear()` method or mathematical set operations.

### Methods

| Method | Description |
|---|---|
| `new WeakSet(iterable)` | Creates a WeakSet |
| `add(value)` | Adds a value; returns the WeakSet |
| `has(value)` | Checks whether a value exists |
| `delete(value)` | Removes a value; returns a boolean |

### Example

```javascript
const processedUsers = new WeakSet();

let user1 = { id: 101, name: "Alex" };
const user2 = { id: 102, name: "John" };

function processUser(user) {
    if (processedUsers.has(user)) {
        console.log(`${user.name} is already processed`);
        return;
    }

    console.log(`Processing ${user.name}`);

    processedUsers.add(user);
}

processUser(user1); // Processing Alex
processUser(user2); // Processing John
processUser(user1); // Alex is already processed

console.log(processedUsers.has(user1)); // true

// Remove an entry explicitly
processedUsers.delete(user2);

console.log(processedUsers.has(user2)); // false

// Remove the strong reference
user1 = null;

// The original user1 object is now eligible
// for garbage collection.
```

### Usage

- Tracking processed objects.
- Tracking visited objects without retaining them.
- Tracking initialized DOM elements.
- Marking objects without adding properties to them.
- Managing temporary object membership.

Prefer `WeakSet` when you only need to track whether an object belongs to a collection without keeping that object alive.
