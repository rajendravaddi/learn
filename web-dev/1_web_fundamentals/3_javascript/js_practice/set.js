const skills = new Set([
    "JavaScript",
    "React",
    "JavaScript"
]);

console.log(`skills : ${[...skills]}`);

// Add values
skills.add("Node.js");
skills.add("React"); // Duplicate ignored
console.log(`skills : ${[...skills]}`);


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
console.log(`required : ${[...required]}`);

console.log("union");
console.log([...skills.union(required)]);
// ['JavaScript', 'React', 'Node.js', 'TypeScript']
console.log("intersection");

console.log([...skills.intersection(required)]);
// ['JavaScript']
console.log("difference");

console.log([...skills.difference(required)]);
// ['React', 'Node.js']
console.log("symmetric difference");

console.log([...skills.symmetricDifference(required)]);
// ['React', 'Node.js', 'TypeScript']

console.log(skills.isSubsetOf(required));   // false
console.log(skills.isSupersetOf(required)); // false
console.log(skills.isDisjointFrom(required)); // false

// Remove values
skills.delete("React");
skills.clear();
console.log(skills.size); // 0
