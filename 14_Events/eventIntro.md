
# Event?

event에 따라 code를 실행.

## implementation

브라우저 : DOMNode.addEventListener()
nodeJS : Object.on()

## do what?

addEventListener('..', event=>...);
addEventListener('..', event=>...);

data를 전달.

## Browser event Objects

event
  - MouseEvent
    - coordinates
    - event target
  - DragEvent
    - extra data
    - event target
  - KeyEvent
  - ...
    - event target (common)

## onclick vs addEventListener

addEventListener
- 중첩 가능
- remove 가능

## removeEventListener issue

```js
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
```

## event 객체 인자로 전달하기

```js
const btn = document.querySelector('button');
btn.addEventListener('click', (e)=>console.log(e));
```

event 객체에는 여러 metadata를 property로 저장하고 있음.
MDN 참고할 것.
