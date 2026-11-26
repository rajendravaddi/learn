const users = new Map([
    [101, "Alex"],
    [102, "John"]
]);

console.log(users);

// Add and update entries
users.set(103, "David");
users.set(101, "Alexander");

console.log(users);

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

console.log(users);

console.log(users.get(admin)); // Admin

// Remove entries
users.delete(102);

console.log(users);

users.clear();
console.log(users);

console.log(users.size); // 0