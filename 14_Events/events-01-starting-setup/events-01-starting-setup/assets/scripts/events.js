const button = document.querySelector("button");

button.onclick = function () {
  console.log("hi");
};

const btnClickHandler = () => {
  alert("button was clicked!");
};
const anotherButtonClickHandler = () => {
  console.log("this was clicked!");
};

// onClick : 중첩이 안 됨.
button.onclick = btnClickHandler;
button.onclick = anotherButtonClickHandler;

// addEventListener 중첩 가능, 삭제 가능
button.addEventListener("click", btnClickHandler);
button.addEventListener("click", anotherButtonClickHandler);
button.removeEventListener("click", anotherButtonClickHandler);

setTimeout(() => {
  button.removeEventListener("click", btnClickHandler);
}, 5000);

// 지워지지 않아 why? >> 서로 다른 함수라서.
button.addEventListener("click", () => {
  console.log("hi");
});
button.removeEventListener("click", () => {
  console.log("hi");
});

// 마찬가지
button.addEventListener("click", btnClickHandler.bind(this));
button.removeEventListener("click", btnClickHandler.bind(this));

// 이건 돼.
const boundFn = btnClickHandler.bind(this);

button.addEventListener("click", boundFn);
button.removeEventListener("click", boundFn);

// event 인자 전달
// addEventListener는 이벤트를 인자로 전달함
// handler에서 e를 받아 핸들링
