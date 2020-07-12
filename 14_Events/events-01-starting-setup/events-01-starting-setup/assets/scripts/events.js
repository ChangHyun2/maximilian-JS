const buttons = document.querySelectorAll("button");

const btnClickHandler = (e) => {
  e.target.disabled = true; // html attribute에도 추가됨.
  //꽤 오래 걸리네..?

  setTimeout(() => {
    e.target.removeAttribute("disabled"); // DOM el 에서 제거
  }, 1000);
  console.log(e);
};
const anotherButtonClickHandler = () => {
  console.log("this was clicked!");
};

// buttons.forEach((btn) => btn.addEventListener("click", btnClickHandler));
buttons.forEach((btn) =>
  btn.addEventListener("mouseenter", (e) => console.log(e))
);
// relatedTarget : 'mouseenter' 이벤트가 어디에서 trigger되었는지 알려줌.
// button의 부모 요소인 div가 relatedTarget임.
// 아주 빠르게 html요소로부터 마우스커서를 btn으로 움직일 경우, relatedTarget이 html이 됨.
// why? 브라우저가 마우스 커서 위치를 밀리세컨 단위에서 여러번 체크하지는 않기 때문임.

window.addEventListener("scroll", (e) => {
  console.log(document.body.getBoundingClientRect());
  console.log(document.body.getBoundingClientRect().bottom);
});
// scroll event와 window.scrollY를 활용하면, user가 bottom에서 얼마나 떨어져있는지 확인하고,
// 아래에 위치할 경우 content를 추가 렌더링해서, infinite scroll을 만들 수 있음.

let countEl = 0;

// 무한 스크롤
// function scrollHandler() {
//   const distanceToBottom = document.body.getBoundingClientRect().bottom;
//   console.log(distanceToBottom);
//   console.log(document.documentElement.clientHeight);
//   if (distanceToBottom < document.documentElement.clientHeight + 150) {
//     const newEl = document.createElement("div");
//     countEl++;
//     newEl.innerHTML = `<p>Element ${countEl}`;
//     document.body.append(newEl);
//   }
// }
// window.addEventListener("scroll", scrollHandler);

// form tag submit
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  console.log(e);
  // default로는, event를 곧바로 처리해 서버로 data를 전달하고 link해주는데
  // 이를 prevent할 경우, e를 직접 처리할 수 있음.
  e.preventDefault();
  console.log(e);
}); // form만 submit event를 가질 수 있어

// 상단에 위치한 아래의 코드로 인해 작동되지 않아 코멘트 처리함.
// 이벤트 버블링과 관련된 내용일 듯
// buttons.forEach((btn) => btn.addEventListener("click", btnClickHandler));
