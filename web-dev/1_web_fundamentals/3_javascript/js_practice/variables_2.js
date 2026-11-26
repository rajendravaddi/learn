const message = "Outer message";

{
    const message = "Inner message";

    console.log(message);
}

console.log(message);

// const message = "Hello"; //SyntaxError: Identifier 'message' has already been declared

let greeting = "Hello";

{
    let name = "User";
    console.log("greeting from inner block :" + greeting + " " + name);
}

// console.log("greeting from outer block" + greeting + " " + name); // ReferenceError: name is not defined
