// setTimeout -- executes after specified time
setTimeout(name => {
    console.log(`Hello, ${name}`);
}, 1000, "Alex");


// clear the setTimeout
const timerId = setTimeout(() => {
    console.log("This will not execute");
}, 2000);

clearTimeout(timerId);


// Executes a function at regular intervals
let count = 0;

const intervalId = setInterval(() => {
    console.log(++count);

    if (count === 3) {
        // clears the setInterval
        clearInterval(intervalId);
    }
}, 1000);