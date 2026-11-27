# Fetch API

The Fetch API provides a modern interface for making HTTP requests and communicating with servers. It is available natively in modern browsers and Node.js.

Fetch is Promise-based and works naturally with `async/await`.

Common use cases include:

- Retrieving data from backend APIs.
- Submitting forms and creating records.
- Updating and deleting resources.
- Uploading and downloading files.
- Communicating with third-party services.

The examples in this chapter use JSONPlaceholder, a public REST API for learning and testing.

**Base URL:** `https://jsonplaceholder.typicode.com`

JSONPlaceholder simulates create, update and delete operations without permanently modifying its data.

## 1. HTTP Fundamentals

### 1.1 HTTP Request and Response

HTTP enables communication between clients and servers.

```text
Client (Browser / Node.js)
          │
          │ HTTP Request
          ▼
        Server
          │
          │ HTTP Response
          ▼
        Client
```

An HTTP request generally contains:

- URL — identifies the resource.
- Method — specifies the operation.
- Headers — provide additional information.
- Body — contains data sent to the server, when applicable.

An HTTP response generally contains:

- Status code — indicates the outcome.
- Headers — provide response metadata.
- Body — contains the returned data, when applicable.

### 1.2 HTTP Methods

| Method | Purpose | Example |
|---|---|---|
| GET | Retrieve resources | Get all users |
| POST | Submit data, often to create a resource | Create a user |
| PUT | Replace a resource | Replace user details |
| PATCH | Partially update a resource | Update a user's email |
| DELETE | Delete a resource | Delete a user |
| HEAD | Retrieve response headers without a body | Check resource metadata |
| OPTIONS | Discover communication options | CORS preflight request |

GET, POST, PUT, PATCH and DELETE are commonly used in REST APIs.

### 1.3 HTTP Status Codes

| Range | Category |
|---|---|
| 1xx | Informational |
| 2xx | Successful |
| 3xx | Redirection |
| 4xx | Client errors |
| 5xx | Server errors |

Common status codes:

| Status | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized — authentication required or invalid |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Unprocessable Content |
| 429 | Too Many Requests |
| 500 | Internal Server Error |
| 502 | Bad Gateway |
| 503 | Service Unavailable |

### 1.4 HTTP Headers

Headers provide additional information about requests and responses.

| Header | Purpose |
|---|---|
| `Content-Type` | Format of the message body |
| `Accept` | Preferred response format |
| `Authorization` | Authentication credentials |
| `Cache-Control` | Caching behavior |
| `Content-Length` | Message body size in bytes |
| `Retry-After` | Suggested waiting period before retrying |

Common content types:

| Content Type | Data Format |
|---|---|
| `application/json` | JSON |
| `text/plain` | Plain text |
| `text/html` | HTML |
| `multipart/form-data` | Multipart form data and files |
| `application/x-www-form-urlencoded` | URL-encoded form data |
| `application/octet-stream` | Binary data |

---

## 2. Fetch Fundamentals

### 2.1 Basic Syntax

```javascript
fetch(url, options);
```

- `url` identifies the requested resource.
- `options` is an optional object containing request configuration.
- `fetch()` returns a Promise that fulfills with a `Response` object when the response becomes available.

### 2.2 Basic GET Request

```javascript
const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/1"
);

if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
}

const user = await response.json();

console.log(user);
```

The first `await` waits for the response. The second reads and parses the response body.

### 2.3 Using Promise Chaining

Fetch can also be used with `.then()` and `.catch()`.

```javascript
fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        return response.json();
    })
    .then(user => console.log(user))
    .catch(console.error);
```

Prefer async/await for multi-step request workflows.

### 2.4 Request Options

```javascript
const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            title: "JavaScript",
            body: "Learning Fetch API",
            userId: 1
        })
    }
);
```

Common request options:

| Option | Purpose |
|---|---|
| `method` | HTTP method; defaults to GET |
| `headers` | Request headers |
| `body` | Data sent to the server |
| `signal` | Request cancellation signal |
| `credentials` | Controls sending credentials |
| `mode` | Controls cross-origin request behavior |
| `cache` | Controls HTTP cache behavior |
| `redirect` | Controls redirect handling |
| `keepalive` | Allows certain requests to continue after page unload |

GET and HEAD requests cannot contain a request body when using Fetch.

### 2.5 Response Object

```javascript
const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
);

console.log(response.status);     // 200
console.log(response.ok);         // true
console.log(response.url);
console.log(response.redirected);
console.log(response.headers.get("Content-Type"));
```

| Property | Description |
|---|---|
| `status` | HTTP status code |
| `statusText` | HTTP status message, if available |
| `ok` | True for status codes 200–299 |
| `headers` | Response headers |
| `url` | Final response URL |
| `redirected` | Whether a redirect occurred |
| `body` | Readable stream or null |
| `bodyUsed` | Whether the body has been consumed |

---

## 3. Performing CRUD Operations

CRUD represents Create, Read, Update and Delete operations.

For the following examples, use this shared base URL:

```javascript
const BASE_URL = "https://jsonplaceholder.typicode.com";
```

### 3.1 GET — Retrieve Data

Retrieve all resources:

```javascript
const response = await fetch(`${BASE_URL}/posts`);

if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
}

const posts = await response.json();

console.log(posts);
```

Retrieve a specific resource:

```javascript
const postId = 1;

const response = await fetch(
    `${BASE_URL}/posts/${postId}`
);

if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
}

const post = await response.json();

console.log(post);
```

### 3.2 POST — Create a Resource

```javascript
const newPost = {
    title: "Learning JavaScript",
    body: "Understanding the Fetch API",
    userId: 1
};

const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(newPost)
});

if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
}

const createdPost = await response.json();

console.log(createdPost);
```

`JSON.stringify()` converts the JavaScript object into a JSON string.

The `Content-Type` header informs the server that the request body contains JSON.

### 3.3 PUT — Replace a Resource

PUT generally replaces the representation of a resource at the specified URL.

```javascript
const updatedPost = {
    id: 1,
    title: "Updated title",
    body: "Updated content",
    userId: 1
};

const response = await fetch(`${BASE_URL}/posts/1`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedPost)
});

if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
}

console.log(await response.json());
```

### 3.4 PATCH — Partially Update a Resource

PATCH modifies selected parts of an existing resource.

```javascript
const response = await fetch(`${BASE_URL}/posts/1`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        title: "New title"
    })
});

if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
}

console.log(await response.json());
```

The expected PATCH body format depends on the backend API.

### 3.5 DELETE — Remove a Resource

```javascript
const response = await fetch(`${BASE_URL}/posts/1`, {
    method: "DELETE"
});

if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
}

console.log("Post deleted successfully");
```

DELETE responses may contain a response body or return `204 No Content`.

Do not assume every successful response contains JSON.

### 3.6 CRUD Quick Reference

| Operation | HTTP Method | Endpoint |
|---|---|---|
| Retrieve all posts | GET | `/posts` |
| Retrieve one post | GET | `/posts/1` |
| Create a post | POST | `/posts` |
| Replace a post | PUT | `/posts/1` |
| Partially update a post | PATCH | `/posts/1` |
| Delete a post | DELETE | `/posts/1` |

The exact behavior of each endpoint is determined by the backend API contract.

---

## 4. Working with URLs, Headers and Request Bodies

### 4.1 Path Parameters

Path parameters identify specific resources.

```javascript
const userId = 5;

const url = `${BASE_URL}/users/${userId}`;

const response = await fetch(url);
```

For dynamic string values, encode individual path segments when necessary.

```javascript
const username = "Alex Smith";

const url = `/users/${encodeURIComponent(username)}`;

// /users/Alex%20Smith
```

### 4.2 Query Parameters

Query parameters are commonly used for filtering, searching, sorting and pagination.

```text
/posts?userId=1&_limit=5
```

Use `URLSearchParams` instead of manually concatenating query strings.

```javascript
const params = new URLSearchParams({
    userId: "1",
    _limit: "5"
});

const response = await fetch(
    `${BASE_URL}/posts?${params}`
);

console.log(await response.json());
```

`URLSearchParams` automatically handles URL encoding.

```javascript
const params = new URLSearchParams();

params.set("search", "JavaScript & React");
params.set("page", "1");
params.set("limit", "10");

console.log(params.toString());

// search=JavaScript+%26+React&page=1&limit=10
```

Common methods:

| Method | Purpose |
|---|---|
| `set()` | Add or replace a parameter |
| `append()` | Add another parameter value |
| `get()` | Retrieve the first matching value |
| `getAll()` | Retrieve all matching values |
| `has()` | Check whether a parameter exists |
| `delete()` | Remove a parameter |
| `toString()` | Generate the encoded query string |

### 4.3 URL Object

The `URL` object provides a structured way to construct and manipulate URLs.

```javascript
const url = new URL(
    "/posts",
    "https://jsonplaceholder.typicode.com"
);

url.searchParams.set("userId", "1");
url.searchParams.set("_limit", "5");

console.log(url.href);

// https://jsonplaceholder.typicode.com/posts?userId=1&_limit=5

const response = await fetch(url);
```

Common properties:

| Property | Example |
|---|---|
| `protocol` | `https:` |
| `hostname` | `example.com` |
| `pathname` | `/posts` |
| `search` | `?page=1` |
| `searchParams` | URLSearchParams object |
| `origin` | `https://example.com` |
| `href` | Complete URL |

### 4.4 Request Headers

Headers can be provided using a regular object.

```javascript
const response = await fetch(`${BASE_URL}/posts`, {
    headers: {
        Accept: "application/json"
    }
});
```

Alternatively, use the `Headers` object.

```javascript
const headers = new Headers();

headers.set("Accept", "application/json");
headers.set("Content-Type", "application/json");

console.log(headers.get("Accept"));

headers.delete("Content-Type");
```

HTTP header names are case-insensitive.

Browsers restrict certain request headers, such as `Cookie` and `Host`, from being manually set by JavaScript.

### 4.5 JSON Request Body

JSON is commonly used when communicating with REST APIs.

```javascript
const data = {
    name: "Alex",
    email: "alex@example.com"
};

const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
};
```

Fetch does not automatically serialize ordinary JavaScript objects into JSON.

### 4.6 FormData and File Uploads

`FormData` represents multipart form data and supports both text fields and files.

Browser example:

```javascript
const formData = new FormData();

formData.append("name", "Alex");

const file = new File(
    ["Hello, JavaScript!"],
    "example.txt",
    { type: "text/plain" }
);

formData.append("file", file);

const response = await fetch("/api/upload", {
    method: "POST",
    body: formData
});
```

The endpoint `/api/upload` represents a backend that accepts multipart uploads.

When using `FormData`, do not manually set the `Content-Type` header. Fetch automatically generates the multipart content type and its required boundary.

For an existing HTML form:

```javascript
const form = document.querySelector("form");

const formData = new FormData(form);
```

### 4.7 URL-encoded Form Data

Some APIs expect `application/x-www-form-urlencoded` instead of JSON.

```javascript
const body = new URLSearchParams({
    username: "alex",
    password: "example-password"
});

const response = await fetch("/api/login", {
    method: "POST",
    body
});
```

Fetch automatically supplies the appropriate URL-encoded content type when a `URLSearchParams` object is used as the body.

Always use HTTPS when transmitting credentials.

---

## 5. Reading Response Data

### 5.1 Response Body Methods

The `Response` object provides several asynchronous methods for consuming its body.

| Method | Returned Data |
|---|---|
| `response.json()` | Parsed JSON value |
| `response.text()` | String |
| `response.blob()` | Blob object |
| `response.arrayBuffer()` | ArrayBuffer |
| `response.formData()` | FormData object |
| `response.bytes()` | Uint8Array in supporting runtimes |

### 5.2 Reading JSON

```javascript
const response = await fetch(`${BASE_URL}/users/1`);

const user = await response.json();

console.log(user.name);
```

`response.json()` reads the response body and parses it as JSON.

It rejects if the body contains invalid JSON or is empty.

### 5.3 Reading Text

```javascript
const response = await fetch(`${BASE_URL}/users/1`);

const text = await response.text();

console.log(typeof text); // string
console.log(text);
```

Useful for plain text, HTML, CSV and manually parsing response bodies.

### 5.4 Reading Binary Data

```javascript
const response = await fetch("/api/files/report.pdf");

if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
}

const blob = await response.blob();

console.log(blob.size);
console.log(blob.type);
```

`Blob` is useful for handling images, PDFs and other downloadable files.

Use `arrayBuffer()` or `bytes()` when direct access to binary data is required.

### 5.5 Response Bodies Can Only Be Consumed Once

```javascript
const response = await fetch(`${BASE_URL}/users/1`);

const data = await response.json();

console.log(response.bodyUsed); // true

// Throws TypeError
// await response.text();
```

Once the body has been consumed, it cannot normally be read again.

Use `response.clone()` before consuming the body when multiple readers are genuinely required.

```javascript
const response = await fetch(`${BASE_URL}/users/1`);

const copy = response.clone();

const data = await response.json();
const text = await copy.text();

console.log(data);
console.log(text);
```

Avoid unnecessary cloning of large responses because it can increase memory usage.

### 5.6 Streaming Responses

Fetch exposes the response body as a `ReadableStream`, allowing data to be processed incrementally.

```javascript
const response = await fetch("/api/stream");

if (!response.ok || !response.body) {
    throw new Error("Stream unavailable");
}

const stream = response.body.pipeThrough(
    new TextDecoderStream()
);

for await (const chunk of stream) {
    console.log(chunk);
}
```

Common use cases:

- AI chatbot response streaming.
- Large file downloads.
- Incremental text processing.
- Server-generated data streams.

Unlike `response.text()` or `response.json()`, streaming does not require waiting for the entire response body before processing data.

A stream chunk is not necessarily a complete message, JSON object or token. Structured streaming protocols such as SSE and NDJSON require additional parsing and buffering.

---

## 6. Error Handling

### 6.1 HTTP Errors vs Network Errors

An important characteristic of Fetch is that HTTP error responses do not automatically reject the Promise.

```javascript
const response = await fetch(
    `${BASE_URL}/posts/999999`
);

console.log(response.status); // 404
console.log(response.ok);     // false
```

The Promise fulfills because the server returned a valid HTTP response.

| Failure | Fetch Behavior |
|---|---|
| HTTP 400 | Fulfills with Response |
| HTTP 404 | Fulfills with Response |
| HTTP 500 | Fulfills with Response |
| Network failure | Rejects |
| Browser CORS failure | Rejects |
| Request cancellation | Rejects if still pending |
| Invalid JSON | `response.json()` rejects |

Always check `response.ok` or the expected status code.

### 6.2 Handling Errors with Async/Await

```javascript
async function getPost(id) {
    try {
        const response = await fetch(
            `${BASE_URL}/posts/${id}`
        );

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to retrieve post:", error.message);

        throw error;
    }
}

try {
    const post = await getPost(1);

    console.log(post);
} catch (error) {
    console.log("Unable to load post");
}
```

This handles both request failures and errors while reading the response body.

### 6.3 Handling Specific HTTP Status Codes

```javascript
const response = await fetch("/api/profile");

switch (response.status) {
    case 401:
        throw new Error("Please log in");

    case 403:
        throw new Error("Access denied");

    case 404:
        throw new Error("Profile not found");

    case 429:
        throw new Error("Too many requests");
}

if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
}

const profile = await response.json();
```

Applications can provide different behavior depending on the server's response.

### 6.4 Handling Server Error Messages

Backend APIs often include additional error information in the response body.

Example error response:

```json
{
    "message": "Email already exists"
}
```

```javascript
const response = await fetch("/api/users", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email: "alex@example.com"
    })
});

if (!response.ok) {
    const errorData = await response.json()
        .catch(() => null);

    throw new Error(
        errorData?.message ??
        `HTTP error: ${response.status}`
    );
}

const user = await response.json();
```

The error response structure depends on the backend. Some APIs return plain text, HTML or an empty body instead of JSON.

### 6.5 Handling Empty Responses

A successful HTTP response does not necessarily contain a body.

```javascript
const response = await fetch("/api/users/1", {
    method: "DELETE"
});

if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
}

if (response.status === 204) {
    console.log("Deleted successfully");
} else {
    const text = await response.text();

    console.log(text);
}
```

Responses to HEAD requests and responses with status codes 204 and 205 do not contain a response body.

---

## 7. Request Cancellation and Timeouts

### 7.1 AbortController

`AbortController` allows an ongoing Fetch operation to be cancelled.

```javascript
const controller = new AbortController();

async function getData() {
    try {
        const response = await fetch(`${BASE_URL}/posts`, {
            signal: controller.signal
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);
    } catch (error) {
        if (error.name === "AbortError") {
            console.log("Request cancelled");
        } else {
            console.error(error);
        }
    }
}

getData();

controller.abort();
```

- `controller.signal` is passed to Fetch.
- `controller.abort()` requests cancellation.
- A pending Fetch operation or response body read can reject when aborted.
- An aborted signal cannot be reset or reused for a new request.

Cancellation does not guarantee that the server stops processing a request it has already received.

### 7.2 Request Timeouts

Fetch does not provide a standard `timeout` request option.

Modern runtimes support `AbortSignal.timeout()`.

```javascript
try {
    const response = await fetch(`${BASE_URL}/posts`, {
        signal: AbortSignal.timeout(5000)
    });

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const posts = await response.json();

    console.log(posts);
} catch (error) {
    if (error.name === "TimeoutError") {
        console.log("Request timed out");
    } else {
        console.error(error);
    }
}
```

This requests cancellation after the specified timeout.

For environments without `AbortSignal.timeout()`, use `AbortController` with `setTimeout()` and clear the timer when the operation completes.

### 7.3 Combining Cancellation and Timeouts

`AbortSignal.any()` combines multiple cancellation signals.

```javascript
const controller = new AbortController();

const signal = AbortSignal.any([
    controller.signal,
    AbortSignal.timeout(5000)
]);

const response = await fetch(`${BASE_URL}/posts`, {
    signal
});

const posts = await response.json();
```

The combined signal aborts when any of its input signals aborts.

This is useful when a request needs both manual cancellation and a timeout.

### 7.4 Cancelling Previous Requests

When implementing search functionality, older requests may finish after newer requests and display outdated results.

```javascript
let activeController;

async function searchPosts(query) {
    activeController?.abort();

    const controller = new AbortController();

    activeController = controller;

    const url = new URL(`${BASE_URL}/posts`);

    url.searchParams.set("q", query);

    try {
        const response = await fetch(url, {
            signal: controller.signal
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const results = await response.json();

        if (activeController === controller) {
            console.log(results);
        }
    } catch (error) {
        if (error.name !== "AbortError") {
            console.error(error);
        }
    } finally {
        if (activeController === controller) {
            activeController = undefined;
        }
    }
}
```

Usage:

```javascript
searchPosts("Java");
searchPosts("JavaScript");
searchPosts("React");
```

Each new request cancels the previous one.

The identity check additionally prevents outdated requests from updating the latest results.

This pattern is commonly combined with debouncing.

---

## 8. Authentication, Credentials and CORS

### 8.1 Bearer Token Authentication

Many APIs require an access token in the `Authorization` header.

```javascript
async function getProfile(accessToken) {
    const response = await fetch("/api/profile", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
}
```

The access token must be obtained through the application's authentication mechanism.

Never hardcode production secrets or private API keys in frontend JavaScript. Client-side code is accessible to users.

### 8.2 Cookie-based Authentication

Browsers can automatically send cookies with Fetch requests.

```javascript
const response = await fetch("/api/profile", {
    credentials: "same-origin"
});
```

Credential options:

| Value | Behavior |
|---|---|
| `omit` | Do not include credentials |
| `same-origin` | Include credentials for same-origin requests; default |
| `include` | Include credentials for cross-origin requests when permitted |

Cross-origin cookie-based request:

```javascript
const response = await fetch(
    "https://api.example.com/profile",
    {
        credentials: "include"
    }
);
```

Cross-origin cookies require appropriate server-side CORS configuration and compatible cookie attributes.

Browser cookie policies may still restrict whether cookies are sent.

Cookie-based authentication also requires appropriate CSRF protection for state-changing operations.

### 8.3 Same-Origin Policy

An origin is defined by the combination of:

- Protocol.
- Hostname.
- Port.

Consider a frontend running at:

```text
http://localhost:5173
```

| Destination | Relationship |
|---|---|
| `http://localhost:5173/api` | Same origin |
| `http://localhost:8000/api` | Cross origin |
| `https://localhost:5173/api` | Cross origin |
| `https://api.example.com` | Cross origin |

Browsers enforce the same-origin policy to restrict access to resources from different origins.

### 8.4 CORS

CORS stands for Cross-Origin Resource Sharing.

It is a browser security mechanism that allows servers to specify which origins are permitted to access their responses.

For example:

```text
React frontend: http://localhost:5173
FastAPI backend: http://localhost:8000
```

The frontend and backend have different origins because their ports differ.

The backend may return a header such as:

```http
Access-Control-Allow-Origin: http://localhost:5173
```

This permits the specified frontend origin to access the response, subject to other applicable CORS requirements.

Common CORS response headers:

| Header | Purpose |
|---|---|
| `Access-Control-Allow-Origin` | Permitted origin |
| `Access-Control-Allow-Methods` | Permitted HTTP methods |
| `Access-Control-Allow-Headers` | Permitted request headers |
| `Access-Control-Allow-Credentials` | Permits credentialed requests |
| `Access-Control-Expose-Headers` | Additional response headers accessible to JavaScript |
| `Access-Control-Max-Age` | Preflight response caching duration |

CORS permissions must generally be configured on the backend.

### 8.5 CORS Preflight Requests

For certain cross-origin requests, the browser automatically sends an OPTIONS request before sending the actual request.

```text
Browser                         Backend
   │                               │
   │──── OPTIONS (preflight) ─────→│
   │                               │
   │←──── CORS permissions ────────│
   │                               │
   │──── Actual POST request ─────→│
   │                               │
   │←──── HTTP response ───────────│
```

Common preflight triggers include:

- PUT, PATCH and DELETE requests.
- Custom request headers.
- Authorization headers.
- JSON request bodies using `Content-Type: application/json`.

Not every cross-origin request requires a preflight.

The browser manages preflight requests automatically.

### 8.6 Fetch Mode

| Mode | Behavior |
|---|---|
| `cors` | Allows cross-origin requests subject to CORS rules |
| `same-origin` | Restricts requests to the same origin |
| `no-cors` | Allows restricted requests with opaque responses |

Avoid using `mode: "no-cors"` as a solution to CORS errors.

```javascript
const response = await fetch(
    "https://api.example.com/data",
    {
        mode: "no-cors"
    }
);

console.log(response.type);   // opaque
console.log(response.status); // 0
```

An opaque response does not expose its actual status, headers or body to JavaScript.

The correct solution is to configure CORS on the server or use an appropriate backend proxy.

### 8.7 Browser vs Node.js Fetch

| Feature | Browser | Node.js |
|---|---|---|
| Fetch API | Supported | Supported |
| Browser CORS enforcement | Yes | No |
| Automatic browser cookie handling | Yes, subject to policies | No built-in browser-style cookie jar |
| Relative URLs | Supported with document base URL | Generally requires absolute URLs |
| DOM integration | Supported | Not available |

A request that succeeds in Node.js may fail in a browser because of CORS or browser credential restrictions.

CORS is not a replacement for server-side authentication and authorization.

---

## 9. Building a Reusable API Client

Instead of repeating Fetch configuration, status checks and response parsing throughout an application, create a reusable API utility.

### 9.1 Custom HTTP Error

**api.js**

```javascript
export class HttpError extends Error {
    constructor(status, message, data = null) {
        super(message);

        this.name = "HttpError";
        this.status = status;
        this.data = data;
    }
}
```

This provides structured information about HTTP failures.

### 9.2 Reusable Request Function

Add the following to `api.js`:

```javascript
const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function request(endpoint, options = {}) {
    const {
        json,
        headers: customHeaders,
        ...fetchOptions
    } = options;

    const headers = new Headers(customHeaders);

    if (!headers.has("Accept")) {
        headers.set("Accept", "application/json");
    }

    if (json !== undefined) {
        if (fetchOptions.body !== undefined) {
            throw new TypeError(
                "Provide either json or body, not both"
            );
        }

        headers.set("Content-Type", "application/json");

        fetchOptions.body = JSON.stringify(json);
    }

    const response = await fetch(
        `${BASE_URL}${endpoint}`,
        {
            ...fetchOptions,
            headers
        }
    );

    const contentType =
        response.headers.get("Content-Type") ?? "";

    const isJson =
        contentType.includes("application/json") ||
        contentType.includes("+json");

    const text = await response.text();

    let data = text || null;

    if (text && isJson) {
        try {
            data = JSON.parse(text);
        } catch (error) {
            if (response.ok) {
                throw new Error("Invalid JSON response", {
                    cause: error
                });
            }
        }
    }

    if (!response.ok) {
        throw new HttpError(
            response.status,
            data?.message ?? `HTTP error: ${response.status}`,
            data
        );
    }

    return data;
}
```

This utility handles:

- Common base URL.
- Request configuration.
- JSON serialization.
- Custom headers.
- JSON and text response parsing.
- Empty response bodies.
- HTTP error handling.
- Cancellation signals and other Fetch options.

It is designed for JSON-oriented REST APIs, not binary downloads or streaming responses.

### 9.3 Resource-specific API Functions

**posts.js**

```javascript
import { request } from "./api.js";

export function getPosts(options = {}) {
    return request("/posts", options);
}

export function getPost(id) {
    return request(`/posts/${id}`);
}

export function createPost(data) {
    return request("/posts", {
        method: "POST",
        json: data
    });
}

export function updatePost(id, data) {
    return request(`/posts/${id}`, {
        method: "PATCH",
        json: data
    });
}

export function deletePost(id) {
    return request(`/posts/${id}`, {
        method: "DELETE"
    });
}
```

Separating resource-specific operations from the general request utility improves maintainability.

### 9.4 Using the API Client

**index.js**

```javascript
import {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
} from "./posts.js";

import { HttpError } from "./api.js";

try {
    const posts = await getPosts();

    console.log(posts);

    const post = await getPost(1);

    console.log(post);

    const created = await createPost({
        title: "Fetch API",
        body: "Learning HTTP requests",
        userId: 1
    });

    console.log(created);

    const updated = await updatePost(1, {
        title: "Updated title"
    });

    console.log(updated);

    await deletePost(1);

    console.log("Deleted successfully");
} catch (error) {
    if (error instanceof HttpError) {
        console.error(error.status, error.message);
    } else {
        console.error(error);
    }
}
```

Project structure:

```text
project/
├── package.json
├── api.js
├── posts.js
└── index.js
```

This pattern can be extended for larger frontend applications.

---

## 10. Practical Patterns and Best Practices

### 10.1 Concurrent API Requests

Use `Promise.all()` for independent requests.

```javascript
import { request } from "./api.js";

const [users, posts, comments] = await Promise.all([
    request("/users"),
    request("/posts"),
    request("/comments")
]);

console.log(users, posts, comments);
```

Use `Promise.allSettled()` when partial success is acceptable.

### 10.2 Loading, Success and Error States

Frontend applications generally maintain three aspects of request state:

- Loading status.
- Retrieved data.
- Error information.

```javascript
let loading = false;
let data = null;
let error = null;

async function loadPosts() {
    loading = true;
    error = null;

    try {
        data = await request("/posts");
    } catch (err) {
        error = err.message;
    } finally {
        loading = false;
    }
}

await loadPosts();

console.log({ loading, data, error });
```

This pattern forms the foundation of API state management in frontend frameworks such as React.

### 10.3 Pagination

APIs often return large collections in smaller pages.

```javascript
async function getPostsPage(page = 1, limit = 10) {
    const params = new URLSearchParams({
        _page: String(page),
        _limit: String(limit)
    });

    return request(`/posts?${params}`);
}

const firstPage = await getPostsPage(1);
const secondPage = await getPostsPage(2);
```

Common pagination approaches:

| Approach | Example |
|---|---|
| Page-based | `?page=2&limit=10` |
| Offset-based | `?offset=10&limit=10` |
| Cursor-based | `?cursor=abc123&limit=10` |

The parameter names and pagination metadata depend on the API.

### 10.4 Retrying Failed Requests

As covered in Asynchronous JavaScript, retries can help recover from temporary failures.

Potentially retryable failures include:

- Temporary network failures.
- HTTP 429 — Too Many Requests.
- HTTP 502 — Bad Gateway.
- HTTP 503 — Service Unavailable.
- HTTP 504 — Gateway Timeout.

Important considerations:

- Use limited retries and exponential backoff.
- Respect the `Retry-After` header when available.
- Do not retry cancelled requests.
- Do not automatically retry permanent validation or authorization failures.
- Retry non-idempotent operations only when duplicate execution is safely handled.

GET, HEAD, PUT and DELETE are defined as idempotent HTTP methods. POST and PATCH are not necessarily idempotent.

Idempotency means repeating the same request has the same intended effect on the server, not necessarily that every response is identical.

### 10.5 Common Mistakes

**Not checking HTTP status**

```javascript
// Incorrect
const data = await fetch(url)
    .then(response => response.json());
```

```javascript
// Correct
const response = await fetch(url);

if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
}

const data = await response.json();
```

**Forgetting to await body parsing**

```javascript
// Returns a Promise
const data = response.json();

// Returns the parsed value
const data = await response.json();
```

**Sending an ordinary object as a JSON body**

```javascript
// Incorrect
body: { name: "Alex" }

// Correct
body: JSON.stringify({ name: "Alex" })
```

**Parsing an empty response as JSON**

```javascript
// May fail for a 204 response
const data = await response.json();
```

Check the response contract or handle empty bodies explicitly.

**Manually setting multipart Content-Type**

```javascript
// Avoid
headers: {
    "Content-Type": "multipart/form-data"
}
```

Let Fetch generate the multipart boundary automatically when using FormData.

### 10.6 Fetch vs Axios

Axios is a third-party HTTP client library.

| Feature | Fetch | Axios |
|---|---|---|
| Installation | Built-in | Requires dependency |
| HTTP error responses | Must check status explicitly | Rejects non-2xx responses by default |
| JSON request serialization | Manual for ordinary objects | Automatic for typical object payloads |
| JSON response parsing | Explicit `.json()` | Automatic for typical JSON responses |
| Timeout | AbortSignal | Built-in timeout option |
| Interceptors | Custom wrapper required | Built-in |
| Cancellation | AbortSignal | AbortSignal |
| Browser response streaming | Native ReadableStream | Adapter-dependent |

Fetch is sufficient for most modern web applications. Axios can be useful when an application benefits from built-in interceptors and centralized HTTP client configuration.

### 10.7 Best Practices

- Prefer async/await for readable request workflows.
- Always handle unsuccessful HTTP status codes.
- Handle network errors and response parsing failures.
- Use `URL` and `URLSearchParams` for constructing URLs.
- Set the appropriate request content type.
- Handle empty response bodies correctly.
- Use AbortController for request cancellation.
- Configure timeouts where appropriate.
- Cancel outdated requests to prevent race conditions.
- Centralize repeated request configuration in reusable utilities.
- Avoid exposing private credentials in frontend code.
- Configure CORS correctly on the backend.
- Use HTTPS for sensitive communication.
- Retry requests selectively.
- Validate important response data before relying on it.

