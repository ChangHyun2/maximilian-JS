const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");
const posts = document.querySelector(".posts");

const URL = "https://jsonplaceholder.typicode.com/posts";
// const xhr = new XMLHttpRequest();

// xhr.open("GET",URL);

// console.log(xhr);
// // xhr.responseType = "json";
// xhr.onload = function () {
//   console.log(xhr.response);
//   const listOfPosts = JSON.parse(xhr.response);
//   console.log(listOfPosts);
//   for (const post of listOfPosts) {
//     const postEl = document.importNode(postTemplate.content, true);
//     postEl.querySelector("h2").textContent = post.title.toUpperCase();
//     postEl.querySelector("p").textContent = post.body;
//     listElement.append(postEl);
//   }
// };

// xhr.send();

/*
network 탭 headers 확인


send할 수 있는 것 
plain tex, HTML, XML, csv , JSON
*/

function sendHttpRequest(method, url, data) {
  const promise = new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);
    xhr.responseType = "json";

    xhr.onload = function () {
      res(xhr.response);
    };

    xhr.send(JSON.stringify(data));
  });

  return promise;
}

async function fetchPosts() {
  const responseData = await sendHttpRequest("GET", URL);
  posts.innerHTML = "";
  console.log(responseData);
  for (const post of responseData) {
    const postEl = document.importNode(postTemplate.content, true);
    postEl.querySelector("h2").textContent = post.title.toUpperCase();
    postEl.querySelector("p").textContent = post.body;
    postEl.querySelector("li").id = post.id;
    listElement.append(postEl);
  }
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };

  sendHttpRequest("POST", URL, post);
}

fetchButton.addEventListener("click", fetchPosts);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const enteredTitle = e.currentTarget.querySelector("#title");
  const enteredContent = e.currentTarget.querySelector("#content");
  createPost(enteredTitle, enteredContent);
});
posts.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const postId = e.target.closest("li").id;
    sendHttpRequest("DELETE", `${URL}/${postId}`);
    fetchPosts();
  }
});
