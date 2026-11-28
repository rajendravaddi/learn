console.log("synchronous 1");

setTimeout(() => {
    console.log("setTimeout 2");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise resolve 3");
});

queueMicrotask(() => {
    console.log("quemicrotask 4");
});

console.log("synchronous 5");