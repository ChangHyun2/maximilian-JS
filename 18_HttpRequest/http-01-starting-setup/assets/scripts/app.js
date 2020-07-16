const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");
const posts = document.querySelector(".posts");

const URL = "https://jsonplaceholder.typicode.com/pos";
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
  //   const promise = new Promise((res, rej) => {
  // const xhr = new XMLHttpRequest();
  //   xhr.setRequestHeader("Content-Type", "application/json"); //여러 개 추가 가능
  // xhr.open(method, url);
  // xhr.responseType = "json";
  // xhr.onload = function () {
  //   if (xhr.status >= 200 && xhr.status < 300) {
  //     res(xhr.response);
  //   } else {
  // xhr.response // 여기에서 접근 가능. 근데 fetch는 접근이 어려워.
  //     rej(new Error("something went wrong"));
  //   }
  // };
  // xhr.send(JSON.stringify(data));
  // xhr.onerror = function () {
  //   rej(new Error("Failed to send request!"));
  //   // 네트워크 에러를 의미
  //   // url이 잘못된 경우에도 네트워크 처리는 됨.
  //   // url 주소 입력에 대한 에러 처리는 serverside에서 onload로 satuscode를 통해 처리
  //   console.log(xhr.response);
  //   console.log(xhr.status);
  // };
  // });
  // return promise;

  return fetch(url, {
    method: method,
    // body: JSON.stringify(data),
    body: data,
    // headers: {
    //   "Content-Type": "application/json",
    // },
  })
    .then((response) => {
      // response에 대한 에러 처리 response을 json으로 바꾸는 과정을 2번 거칠 수 밖에 없어
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        return response.json().then((errData) => {
          console.log(errData);
          throw new Error("something went wrong - server-side");
        });
        // response.json().then((errData) => {
        //   console.log(errData);
        // });
        // throw new Error("something went wrong - server-side");
        // 이렇게 밖에서 스로잉할 경우, errData에 접근이 불가능해짐.
      }
    })
    .catch((e) => {
      // 네트워크에 대한 에러 처리
      console.log(e);
      throw new Error("something went wrong");
    });
  // json.blob() , json.text()
}

async function fetchPosts() {
  try {
    const responseData = await sendHttpRequest("GET", URL);
    console.log(responseData);

    posts.innerHTML = "";
    for (const post of responseData) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector("h2").textContent = post.title.toUpperCase();
      postEl.querySelector("p").textContent = post.body;
      postEl.querySelector("li").id = post.id;
      listElement.append(postEl);
    }
  } catch (e) {
    // try문을 전부 실행하지 않고 error가 발생하는 순간 catch문으로.
    alert(e.message);
  }
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };

  // form element를 인자로 전달하고
  // default 항목은  tag에 name attribute(title, body)를 정해줌.
  const fd = new FormData(form);
  // fd.append("title", title);
  // fd.append("body", content);
  fd.append("userId", userId);

  sendHttpRequest("POST", URL, fd);
  // form 데이터를 사용할 경우 heade를 설정하고 json을 stringify할 필요가 없음.
  // sendHttpRequest("POST", URL, post);
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
