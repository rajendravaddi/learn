// Basic GET Request
console.log("Basic GET Request");
const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/1"
);

if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
}

const user = await response.json();

console.log(user);

// Using Promise Chaining
console.log("Using Promise Chaining");

fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        return response.json();
    })
    .then(user => console.log(user))
    .catch(console.error);

