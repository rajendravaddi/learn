const promise = new Promise((resolve, reject) => {
    const success = true;

    setTimeout(() => {
        if (success) {
            resolve("Operation successful");
        } else {
            reject(new Error("Operation failed"));
        }
    }, 1000);
});

promise
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error.message);
    })
    .finally(() => {
        console.log("Operation completed");
    });