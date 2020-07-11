## history & location

```js

// in browser
location; //location object

const url = 'myUrl';

location.href = url;
location.replace(url); // browser history에서 현재 페이지를 replace하는 개념으로 기존 페이지로 뒤로가기가 불가능함. 
location.assign(url); // href와 일치, 메소드를 사용하느냐, property를 사용하느냐의 차이
location.host; // 현재 페이지를 running하는 host를 알려줌. local server의 경우, host가 없기 떄문에 host가 뜨지 않아.
location.origin; // 프로토콜을 포함하는 full domain URL
location.pathname; // 도메인 다음에 오는 path를 알려줌.
// 현재 페이지가 어디에 위치하는지 알 수 있음.
// path를 content로 사용해 렌더하거나 js로 navigate할 경우 사용할 수 있어.



// in browser,
history; //history object
history.back(); // browserHistory에서 prev사이트로 이동.
// 링크 없이도 페이지 이동이 가능해짐.
history.length; // 현재 탭에서 몇 개의 페이지를 이동했는지 알려줌.
history.go(5); // 5번째 history로 이동.
```


## navigator

```js
//in browser,
navigator; //navigator object
navigator.userAgent; // 이건 브라우저 역사와 좀 관련이 있음.
// 과거에 브라우저 벤더들이 호환이 안 되는 상황에서 다른 브라우저로 속이기 위해 모든 벤더를 때려박음
// so, 유용하지 않아. 다른 방법을 사용해야됨.
navigator.clipboard; // 클립보드를 추가하거나, 클립보드를 copy할 수 있음.
navigator.geolocation.getCurrentPosition((data)=>{console.log(data)}; // user에게 alert로 위치 동의를 구하고, position 데이터를 가져올 수 있음.

이 외에도 많은 API가 있으니 MDN에서 찾아볼 것.

```

## date
```js
//in browser,
const date = new Date();
date.getDate();
date.getDay(); // 등등 많아.
date.getTime(); // js가 만들어진 날짜부터의 밀리세컨드 timestamp 제공.

const date2 = new Date('07/11/19');
date2;
date-date2; // 밀리세컨드를 가져옴.

(date-date2)/1000/60/60/24

```

## Error 객체 

```js

throw {};
throw 'an error';
throw new Error('Something went wrong!!'); // 에러 객체를 생성해서 throw할 경우,
// 어디에서 에러가 발생했는지 보여주는 stack trace까지 로그됨.
// 파일에서 error를 throw할 경우, filename과 file numbers를 보여줌. 

const customError = new Error('Something went wrong!!');
customError.code = 404;
console.dir(customError); // message, stack, and code 프로퍼티를 가지게 됨.

```

## reference
DOM getBoundingClientRect(): https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
More on location Object: https://developer.mozilla.org/en-US/docs/Web/API/Locations
More on window Object: https://developer.mozilla.org/en-US/docs/Web/API/Windows
More on navigator Object: https://developer.mozilla.org/en-US/docs/Web/API/Navigator