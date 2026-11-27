# Classes and Prototypes

JavaScript is a prototype-based language that supports object-oriented programming (OOP). Objects can inherit properties and methods from other objects through prototypes.

Classes, introduced in ES6, provide a cleaner and more structured syntax for creating objects and implementing inheritance while using JavaScript's underlying prototype mechanism.

## 1. Prototypes and Prototypal Inheritance

### 1.1 Understanding Prototypes

Every JavaScript object has an internal prototype reference, which points to another object or `null`.

When a property or method is not found on an object, JavaScript searches its prototype.

```javascript
const user = {
    name: "Alex"
};

console.log(user.name);       // Alex
console.log(user.toString()); // [object Object]

console.log(Object.getPrototypeOf(user) === Object.prototype);
// true
```

Although `user` does not define `toString()`, it inherits the method from `Object.prototype`.

### 1.2 Prototype Chain

The prototype chain is the sequence of objects JavaScript searches when accessing a property or method.

```javascript
const numbers = [10, 20, 30];

console.log(Object.getPrototypeOf(numbers) === Array.prototype);
// true

console.log(
    Object.getPrototypeOf(Array.prototype) === Object.prototype
);
// true

console.log(Object.getPrototypeOf(Object.prototype));
// null
```

The prototype chain of an array:

```text
numbers
    ↓
Array.prototype
    ↓
Object.prototype
    ↓
null
```

This explains why arrays can access methods such as `map()`, `filter()` and `toString()` without defining them individually.

If a property is not found anywhere in the prototype chain, accessing it returns `undefined`.

### 1.3 Prototypal Inheritance

`Object.create()` creates an object with a specified prototype.

```javascript
const animal = {
    eat() {
        console.log(`${this.name} is eating`);
    }
};

const dog = Object.create(animal);

dog.name = "Bruno";

dog.eat(); // Bruno is eating

console.log(Object.hasOwn(dog, "name")); // true
console.log(Object.hasOwn(dog, "eat"));  // false

console.log("eat" in dog); // true
```

The `dog` object inherits the `eat()` method from `animal`.

- `Object.hasOwn()` checks only the object's own properties.
- The `in` operator checks both own and inherited properties.
- `Object.getPrototypeOf()` returns the object's prototype.

Prefer these modern APIs over the legacy `__proto__` accessor.

### 1.4 Constructor Functions and prototype

Before ES6 classes, constructor functions were commonly used to create objects with shared methods.

```javascript
function User(name) {
    this.name = name;
}

User.prototype.greet = function () {
    return `Hello, ${this.name}`;
};

const user1 = new User("Alex");
const user2 = new User("John");

console.log(user1.greet()); // Hello, Alex
console.log(user2.greet()); // Hello, John

console.log(user1.greet === user2.greet); // true

console.log(Object.getPrototypeOf(user1) === User.prototype);
// true
```

Both instances share the same `greet()` method through `User.prototype`.

The `new` keyword generally performs the following operations:

1. Creates a new object.
2. Links the object's prototype to the constructor's `prototype`.
3. Executes the constructor with `this` referring to the new object.
4. Returns the new object unless the constructor explicitly returns another object.

**Important distinction:**

- `User.prototype` is the object used as the prototype of instances created with `new User()`.
- `Object.getPrototypeOf(user1)` retrieves the actual prototype of `user1`.

Prefer modern class syntax when implementing class-based object-oriented programming.

---

## 2. Classes and Objects

### 2.1 Class Declaration, Constructor and Methods

A class defines the structure and behavior of objects created from it.

```javascript
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        return `Hello, ${this.name}`;
    }

    updateAge(age) {
        this.age = age;
    }
}

const user1 = new User("Alex", 22);
const user2 = new User("John", 25);

console.log(user1.greet()); // Hello, Alex

user1.updateAge(23);

console.log(user1.age); // 23
console.log(user2.age); // 25

console.log(user1 instanceof User); // true
```

- `class` defines a class.
- `constructor()` initializes an instance.
- `new` creates an instance.
- `this` refers to the current instance when a method is called on it.
- `instanceof` checks whether a constructor's prototype exists in an object's prototype chain under normal behavior.

A class can have only one constructor. If omitted, JavaScript provides a default constructor.

### 2.2 Public Instance Fields

Modern JavaScript supports declaring instance fields directly inside a class.

```javascript
class User {
    role = "user";
    active = true;

    constructor(name) {
        this.name = name;
    }

    deactivate() {
        this.active = false;
    }
}

const user = new User("Alex");

console.log(user.role);   // user
console.log(user.active); // true

user.deactivate();

console.log(user.active); // false
```

Instance fields belong to individual objects. Each instance has its own field values.

### 2.3 Classes and Prototypes

Class methods are stored on the class's prototype and shared across instances.

```javascript
class User {
    constructor(name) {
        this.name = name;
    }

    greet() {
        return `Hello, ${this.name}`;
    }
}

const user1 = new User("Alex");
const user2 = new User("John");

console.log(Object.hasOwn(user1, "name"));  // true
console.log(Object.hasOwn(user1, "greet")); // false

console.log(user1.greet === user2.greet); // true

console.log(Object.getPrototypeOf(user1) === User.prototype);
// true

console.log(User.prototype.greet === user1.greet);
// true
```

Class instance structure:

```text
user1 { name: "Alex" } ──┐
                        ├──→ User.prototype
user2 { name: "John" } ──┘         │
                                  │ greet()
                                  ↓
                           Object.prototype
                                  ↓
                                 null
```

Classes use prototypes internally rather than introducing a separate inheritance mechanism.

### 2.4 Class Expressions

Similar to functions, classes can also be defined using expressions.

```javascript
const Product = class {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
};

const product = new Product("Laptop", 50000);

console.log(product.name); // Laptop
```

Class declarations and expressions cannot be accessed before their initialization.

Classes must be instantiated using `new`.

---

## 3. Inheritance and Polymorphism

### 3.1 Inheritance with extends and super

The `extends` keyword allows one class to inherit from another class.

The `super()` call invokes the parent class constructor.

```javascript
class Employee {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }

    getDetails() {
        return `${this.name}: ₹${this.salary}`;
    }
}

class Developer extends Employee {
    constructor(name, salary, language) {
        super(name, salary);
        this.language = language;
    }

    writeCode() {
        return `${this.name} writes ${this.language}`;
    }
}

const developer = new Developer("Alex", 50000, "JavaScript");

console.log(developer.getDetails());
// Alex: ₹50000

console.log(developer.writeCode());
// Alex writes JavaScript

console.log(developer instanceof Developer); // true
console.log(developer instanceof Employee);  // true
```

In a derived constructor, `super()` must be called before accessing `this`.

The prototype chain:

```text
developer
    ↓
Developer.prototype
    ↓
Employee.prototype
    ↓
Object.prototype
    ↓
null
```

### 3.2 Method Overriding and Polymorphism

A child class can provide its own implementation of an inherited method.

```javascript
class Animal {
    speak() {
        return "Animal makes a sound";
    }
}

class Dog extends Animal {
    speak() {
        return "Woof";
    }
}

class Cat extends Animal {
    speak() {
        return "Meow";
    }
}

const animals = [
    new Animal(),
    new Dog(),
    new Cat()
];

for (const animal of animals) {
    console.log(animal.speak());
}

// Animal makes a sound
// Woof
// Meow
```

The same method call produces different behavior depending on the object. This is an example of polymorphism.

### 3.3 Accessing Parent Methods

`super.method()` calls a method defined in the parent class.

```javascript
class Employee {
    constructor(name) {
        this.name = name;
    }

    getDetails() {
        return `Name: ${this.name}`;
    }
}

class Developer extends Employee {
    constructor(name, language) {
        super(name);
        this.language = language;
    }

    getDetails() {
        return `${super.getDetails()}, Language: ${this.language}`;
    }
}

const developer = new Developer("Alex", "JavaScript");

console.log(developer.getDetails());
// Name: Alex, Language: JavaScript
```

This allows child classes to extend existing behavior instead of completely replacing it.

---

## 4. Class Features

### 4.1 Static Properties and Methods

Static members belong to the class itself rather than its instances.

```javascript
class User {
    static count = 0;

    constructor(name) {
        this.name = name;
        User.count++;
    }

    static getCount() {
        return User.count;
    }

    static createGuest() {
        return new User("Guest");
    }
}

const user1 = new User("Alex");
const user2 = User.createGuest();

console.log(User.count);      // 2
console.log(User.getCount()); // 2
console.log(user2.name);      // Guest

console.log(user1.getCount); // undefined
```

Static members are useful for:

- Utility functions.
- Factory methods.
- Class-level configuration.
- Shared counters and state.

### 4.2 Private Fields and Methods

Private class members are declared using the `#` prefix. They can only be accessed within the class that declares them.

```javascript
class BankAccount {
    #balance = 0;

    constructor(owner) {
        this.owner = owner;
    }

    #isValidAmount(amount) {
        return Number.isFinite(amount) && amount > 0;
    }

    deposit(amount) {
        if (!this.#isValidAmount(amount)) {
            return false;
        }

        this.#balance += amount;
        return true;
    }

    withdraw(amount) {
        if (!this.#isValidAmount(amount) ||
            amount > this.#balance) {
            return false;
        }

        this.#balance -= amount;
        return true;
    }

    getBalance() {
        return this.#balance;
    }
}

const account = new BankAccount("Alex");

account.deposit(1000);
account.withdraw(300);

console.log(account.getBalance()); // 700

// Invalid — SyntaxError
// console.log(account.#balance);
// account.#isValidAmount(100);
```

Private members provide encapsulation by restricting direct access to internal implementation details.

Unlike naming conventions such as `_balance`, private fields are enforced by JavaScript itself.

Private members cannot be directly accessed by child classes either.

### 4.3 Getters and Setters

Getters and setters allow methods to be accessed using property syntax.

```javascript
class Product {
    #price;

    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    get price() {
        return this.#price;
    }

    set price(value) {
        if (!Number.isFinite(value) || value < 0) {
            throw new RangeError("Invalid price");
        }

        this.#price = value;
    }

    get formattedPrice() {
        return `₹${this.#price}`;
    }
}

const product = new Product("Laptop", 50000);

console.log(product.price);          // 50000
console.log(product.formattedPrice); // ₹50000

product.price = 45000;

console.log(product.price); // 45000

// Throws RangeError
// product.price = -100;
```

- A getter retrieves or computes a value.
- A setter intercepts property assignment and can validate the assigned value.
- Getters and setters are accessed without parentheses.
- A getter accepts no parameters, while a setter accepts exactly one.

Use a separate backing field, such as `#price`, to avoid recursive getter or setter calls.

### 4.4 Instance Methods vs Arrow Function Fields

Regular class methods are shared through the prototype. Arrow function fields are created separately for each instance and capture the instance's `this`.

```javascript
class Counter {
    count = 0;

    increment() {
        return ++this.count;
    }

    incrementArrow = () => {
        return ++this.count;
    };
}

const counter1 = new Counter();
const counter2 = new Counter();

console.log(counter1.increment === counter2.increment);
// true

console.log(counter1.incrementArrow === counter2.incrementArrow);
// false

const increment = counter1.incrementArrow;

console.log(increment()); // 1

const regularIncrement = counter1.increment;

// Throws TypeError because this is undefined
// regularIncrement();
```

A regular method can lose its `this` context when passed as a standalone callback.

This can also be resolved using `bind()`.

```javascript
const boundIncrement = counter1.increment.bind(counter1);

console.log(boundIncrement()); // 2
```

Prefer regular prototype methods by default. Use arrow function fields or bound methods when callbacks need to retain the instance's `this`.

---

## 5. Practical Patterns and Best Practices

### 5.1 Composition over Inheritance

Composition builds objects by combining independent components rather than creating deep inheritance hierarchies.

```javascript
class Engine {
    start() {
        return "Engine started";
    }
}

class Car {
    constructor(engine) {
        this.engine = engine;
    }

    start() {
        return this.engine.start();
    }
}

const car = new Car(new Engine());

console.log(car.start()); // Engine started
```

Here, `Car` uses an `Engine` rather than inheriting from it.

| Inheritance | Composition |
|---|---|
| Represents an "is-a" relationship | Represents a "has-a" or "uses-a" relationship |
| Uses `extends` | Combines objects or functions |
| Child inherits parent behavior | Behavior is delegated to components |
| Can create tight coupling | Often provides greater flexibility |

Prefer composition when objects need reusable behavior without a natural parent-child relationship.

### 5.2 Classes vs Factory Functions

As covered in Closures, factory functions can also create objects with private state.

```javascript
// Class
class Counter {
    #count = 0;

    increment() {
        return ++this.#count;
    }
}

// Factory function
function createCounter() {
    let count = 0;

    return {
        increment: () => ++count
    };
}

const counter1 = new Counter();
const counter2 = createCounter();

console.log(counter1.increment()); // 1
console.log(counter2.increment()); // 1
```

| Classes | Factory Functions |
|---|---|
| Instantiated using `new` | Called as ordinary functions |
| Prototype-based method sharing | Methods typically created per invocation |
| Private state using `#` fields | Private state using closures |
| Built-in inheritance syntax | Flexible composition |
| Uses instance-based `this` | Can avoid `this` entirely |

Both approaches are valid in modern JavaScript. Choose based on the structure and requirements of the application.

### 5.3 Object-Oriented Programming Concepts

| Concept | Description | JavaScript Implementation |
|---|---|---|
| Encapsulation | Restricting access to internal state | Private fields, private methods, closures |
| Abstraction | Exposing essential behavior while hiding implementation details | Public methods, composition |
| Inheritance | Reusing behavior from another object or class | Prototypes, `extends` |
| Polymorphism | Providing different implementations of the same operation | Method overriding, duck typing |

JavaScript does not provide native abstract classes, interfaces or traditional method overloading based on parameter types. TypeScript provides additional compile-time features for these patterns.

### 5.4 Best Practices

- Prefer modern class syntax over traditional constructor functions.
- Use classes when objects need shared behavior and individual state.
- Use private fields when internal state requires restricted access.
- Prefer prototype methods unless lexical `this` is required.
- Use static methods for operations that belong to the class rather than an instance.
- Prefer composition over unnecessarily deep inheritance hierarchies.
- Avoid modifying built-in prototypes such as `Array.prototype`.
- Avoid changing an object's prototype after creation.
- Use ordinary objects and functions when classes add unnecessary complexity.

### 5.5 Quick Reference

| Feature | Syntax |
|---|---|
| Class declaration | `class User {}` |
| Constructor | `constructor(name) {}` |
| Create instance | `new User("Alex")` |
| Public field | `active = true` |
| Instance method | `greet() {}` |
| Static field | `static count = 0` |
| Static method | `static create() {}` |
| Private field | `#balance = 0` |
| Private method | `#validate() {}` |
| Getter | `get balance() {}` |
| Setter | `set balance(value) {}` |
| Inheritance | `class Admin extends User {}` |
| Parent constructor | `super(name)` |
| Parent method | `super.greet()` |
| Instance checking | `user instanceof User` |
| Get prototype | `Object.getPrototypeOf(user)` |
| Create with prototype | `Object.create(prototype)` |
| Check own property | `Object.hasOwn(user, "name")` |
| Check own or inherited property | `"name" in user` |
