const BASE_URL = "https://jsonplaceholder.typicode.com";
/////////////////////////////////////////////////////////

console.log("GET — Retrieve Data");


const response1 = await fetch(`${BASE_URL}/posts`);

if (!response1.ok) {
    throw new Error(`HTTP error: ${response1.status}`);
}

const posts = await response1.json();

console.log(posts);

//////////////////////////////////////////////////

console.log("Get post 1");
const postId = 1;

const response2 = await fetch(
    `${BASE_URL}/posts/${postId}`
);

if (!response2.ok) {
    throw new Error(`HTTP error: ${response2.status}`);
}

const post = await response2.json();

console.log(post);

///////////////////////////////////////////////////////////////////////////

console.log("POST — Create a Resource");

const newPost = {
    title: "Learning JavaScript",
    body: "Understanding the Fetch API",
    userId: 1
};

const response3 = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(newPost)
});

if (!response3.ok) {
    throw new Error(`HTTP error: ${response3.status}`);
}

const createdPost = await response3.json();

console.log(createdPost);

////////////////////////////////////////////////////////////////////

console.log("PUT — Replace a Resource");


const updatedPost = {
    id: 1,
    title: "Updated title",
    body: "Updated content",
    userId: 1
};

const response4 = await fetch(`${BASE_URL}/posts/1`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedPost)
});

if (!response4.ok) {
    throw new Error(`HTTP error: ${response4.status}`);
}

console.log(await response4.json());

////////////////////////////////////////////////////////////////////////

console.log("PATCH — Partially Update a Resource");

const response5 = await fetch(`${BASE_URL}/posts/1`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        title: "New title"
    })
});

if (!response5.ok) {
    throw new Error(`HTTP error: ${response5.status}`);
}

console.log(await response5.json());

///////////////////////////////////////////////////////////////////////////

console.log("DELETE — Remove a Resource");

const response6 = await fetch(`${BASE_URL}/posts/1`, {
    method: "DELETE"
});

if (!response6.ok) {
    throw new Error(`HTTP error: ${response6.status}`);
}

console.log("Post deleted successfully");