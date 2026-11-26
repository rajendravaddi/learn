//  ### Practical Example: Shopping Cart

const productPrice = 500;
let quantity = 1;

quantity = 3;

const totalPrice = productPrice * quantity;

console.log(totalPrice); // 1500

// Here:

// - `productPrice` uses `const` because it is not reassigned.
// - `quantity` uses `let` because it changes.
// - `totalPrice` uses `const` because it is calculated once.