const firstName = "Alex"; // double quotes
const lastName = 'Smith'; // single quotes
const language = `JavaScript`; // backticks

console.log(firstName, ", type : ", typeof firstName);
console.log(lastName, ", type : ", typeof lastName);
console.log(language, ", type : ", typeof language);

console.log("============connectiong multiple strings using + ===============");
// I am `firstName` `lastName` and I am learning `language`
console.log("I am "+firstName+" "+lastName+" and I am learning "+language);

console.log("============connectiong multiple strings using template ===============");

// Template Literatels
console.log(`I am ${firstName} ${lastName} and I am learning ${language}`);

console.log("=================Multiline string ===========");
// Multiline Strings
const message = `Welcome to our website!
Explore our products.
Happy shopping!`;

console.log(message);

console.log("===================String methods=================");

const string = "JavaScript";
console.log(`string : ${string}`);
console.log(`string.length : ${string.length}`);          // 10
console.log(`string[0] : ${string[0]}`);              // J
console.log(`string.at(-1) : ${string.at(-1)}`);          // t
console.log(`string.toUpperCase() : ${string.toUpperCase()}`);   // JAVASCRIPT
console.log(`string.toLowerCase() : ${string.toLowerCase()}`);   // javascript
console.log(`string.includes("Script") : ${string.includes("Script")}`); // true
console.log(`string.startsWith("Java") : ${string.startsWith("Java")}`); // true
console.log(`string.endsWith("Script") : ${string.endsWith("Script")}`); // true
console.log(`string.slice(0, 4) : ${string.slice(0, 4)}`);     // Java


const username = "   Alex   ";
console.log(`userName :${username}`);
console.log(`username.trim() : ${username.trim()}`);