// Section 5

// #119 Primitive & reference

// Primitive values를 제외하고는 모두 reference value
// Primitive value : undefined string number, boolean, null, symbol
// Primitive는 stack에, reference는 heap에.
// Primitive는 copy the value, reference value는 copy the pointer/reference
// {
//   var person = { age: 30 };
//   var person2 = person;
//   person2.age = 32;
//   console.log(person);

//   var person3 = { ...person };
//   person3.age = 20;
//   console.log(person);
//   console.log(person3);
// }
// const hobbies = ['Sports'];
// var moreHobbies = [...hobbies];
// hobbies.push('cooking');
// console.log(hobbies);
// console.log(moreHobbies);
// hobbies = ['sports', 'running']; const이기 때문에 수정 불가.
// method를 사용하면, 수정할 수 있음.
// 마찬가지로, object 내에서 property를 통해 const 객체를 수정할 수 있음.
// {
//   const person = {
//     age: 30
//   };
//   const person2 = {
//     age: 30
//   };

//   console.log(person === person2);
// }
// difference memory에 할당 된 상태로, reference값이 다르기 때문에 false

// #120 Garbage collection & Memory management

// V8's garbage collector에 대해서라도 이해해보기
// periodically heap을 check해서 unused objects를 지움. reference는 제외하고,
// {
//   var person = {
//     name: 'max'
//   };
//   // heap에 들어갈 person
//   person = null;
// person이 reference가 없어졌기 때문에 heap에 있던 unused object인 {name: 'max'}를 지워버림.age
// }

// Memory leaks?

// 참고자료 https://v8.dev/blog/free-garbage-collection
//https://hackernoon.com/javascript-v8-engine-explained-3f940148d4ef
//https://academind.com/learn/javascript/reference-vs-primitive-values/
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management

//  Section 6 More on functions

// Functions : Code on demand
// variables and constants belong to functions.
// take params & return a value

// directly call : contain parentheses
// indirectly call : add event listener

// function sayHi(name) { ... }
// name is parameter
// sayHi('jun');
// 'jun' is argument

// #126 to functions01 starting code project

// #section 7 Working with the DOM

// #146 dom?
/*
javascript는 hosted language임.
browser는 javascript를 run할 환경을 만들어주고, javascript engine으로 해석.

Browser는 html을 parse하고, browser에 render함.
한편, Browser는 Web API가 parsing된 html(tree?)와 함께 동작할 수 있도록 
script를 통해 document object model을 만들어냄.
browser에는 html parsing이 내장되어있음. 한 편, server side에서도, 이러한 기능을 위해 plugin이나 
다른 tools를 사용함.

document는 root dom node임. 즉, rendered html에 access하는 topmost entry point임.
그렇기 때문에, 여러 method, functionality를 가짐. 일례로, dom contents를 loaded HTML과  interact시키기 위해
HTML elements를 query하는 기능을 가지고 있음.
window는 global object로 documnet를 property로 가짐. browser 안에서 javascript를 통해 다룰 수 있는 실질적인 topmost global object임. 
window는 active browser window / tab이며, script를 위한 global storage로 동작한다. 또, window-specific property와 method에 대한 접근을 제공함.

#147
  window는 현재 탭만의 정보를 지님.

  #148
  node는 element를 가리킴
  html이 파싱될 때 html이 top에 위치한 indented된 형태의 html tree를 만들어냄.
  브라우저는 indented에 의한 white space를 text로 읽어냄. >> text node가 생기는 이유
  text node는 render에 의해 생기는 게 아니라, DOm tree의 일부임.
  $0을 console에 입력하면, 해당 element가 출력되는데, 이는 chrome dev tool feature임.
  console.dir($0)하면, 해당 element에 대한 내용이 출력됨.
  여러 element 선택 시, last를 선택하게 됨.
  #1
#149
DOM node는 결국 javascript objects임. reference value,
query methods는 DOM node를 가리키는 reference를 return하는 셈. 
text node를 잘 쓰지 않는 이유 > element node의 method를 사용해 text를 건드릴 수 있기 때문. 
https://javascript.info/dom-nodes

#150
document.getElementsByClassName('list-item');
위처럼 node list가 select될 경우, 해당 node list에 for of(array)를 사용할 수 있다
const containers = document.getElementsByClassName('container');
for(const node of containers){
}

document.querySelector('ul li:first-of-type');
https://css-tricks.com/almanac/selectors/f/first-of-type/
first-of-type
section
  div
    h1
    p
    p
    p   구조에서, p:nth-child(1)를 하면, h1에 의해 셀렉이 안 됨 반면, first-of-type은 선택이 됨.

#152 dom properties
const p = getEl('p');
p.id > return id
p.className > return text-default
p.style.color
p.style.backgroundColor

#153 attribute vs properties

html tag 안에 명시되는 속성들을 attribute라고 한다. 
property는 tag에 의해 생성된 dom object에 포함되는 property이다. 
이 property는 html attribute와 position, node, 등등 여러 정보를 담는다.
attribute는 object 생성 시 default로 생성될 property를 전달한다.   

in html,
<input id = 'input-1' class-'input-default' value ='enter text'>
in browser,
const.input
  input.id
  input.className 
  input.value

id > 1:1 mapping , live-synchronization
class > different name but browser map it automatically with a html attribute. and live-sync
value > 1:1 mapping, but it doesn't be synchronized.
html tag 안에 value를 넣어두면, 

#154
querySelector는 snapshot일 뿐
getElementsByTagName는 snapshot이 아니라, live sync

element.children[n] > element의 children elements 배열의 n 번째.

element.parentNode > element의 parent Node를.
element.parentElement > element의 parent element를.

parentNode, parentElement, closest('css selector') << queryselector의 반대 개념으로 생각하면 됨.;
firstChild, firstElementChild, childNodes, children, querySelector(), lastChild, lastElementChild
previoussibling, previouselementsibiling, nextsibiling, nextElementSibling

html file에서 띄어쓰기, 줄바꿈도 모두 textnode로 생성됨 html file에 있는 text기 때문에.
browser에서 위와 같은 method로 element에 접근할 때에, node를 return하는데, 이 때 text node는 제외하고 node를 return함. 

document.documentElement.parentElement > null
document.documentElement.parentNode > #document

queryselector는 static한 nodeList를 fetch하고, 다른 메소드는 live nodelist를 fetch한다. live nodelist를 fetch하는 게 빠르고 효율적이다.
nodelist를 

queryselector는 document에 있는 모든 nodes를 추적해서 select하기 때문에 performance가 떨어짐.
반면, DOm traversal은 performance가 좋음

const ul = documnent.body.firstElementChild.nextElementSibling >> 이런식으로 접근하는 게 traversal

#160
styling DOM elements
Style property : element의 inline style을 직접적으로 style한다.
className property : 직접적으로 css class(class는 string임)를 element에 set한다.
classList property : css class를 element에 add or remove한다. css class string을 바꾸는 것이 아니라, element에 class를 add,remove한다.

section.className = 'red-bg';
button.addEventListener('click', ()=>{
  if(section.className === 'red-bg visible'){
    section.className = 'red-bg invisible';
  }else {
    section.className = 'red-bg visible';
  }
}) >> 이 방법 대신, 
button.addEventListener('click', ()=>{
section.classList.toggle('invisible'); 사용 가능

})

#161 creating elements

HTML string
    innerHTML : add(render) HTML string
    list.innerHTML = list.innerHTML + '<li> Item4</li>'; 이처럼 기존 innerHTML에 code를 더할 수 있음.
    insertAdjacentHTML() : add(render) HTML string in specific position
    innerHTML은 코드 실행 시, browser를 새롭게 render함. so, 신중히 사용할 것. 한 예로, input에 value를 입력받고, innerHTML로 
    input value를 p로 create할 때, browser는 전체 페이지를 새로 렌더하기 때문에, input value가 사라짐. 
    이를 피하기 위해, insertadJacentHTML을 사용함. user experience에 좋음.
    div.insertAdjacentHTML('beforeend', '<p>Something went wrong!</p>');
    https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML를 참조할 것.
    insertAdjacentHTML의 단점은? element를 코드로 추가하기 때문에, 추가하는 요소들을 return해낼 수 없음.
    so, 

createElement

    create후, insert할 때에, insert 인자는 reference object이므로, 복사되는 것이 아니다. 따라서, 값이 복사될 뿐임.
    appendChild() : append new DOM element/node child로 add
    append() : append new DOM element/node child가 아닌, tag안에 add
    prepend() : 
    before() : 
    after() : 
    insertBefore() : 
    replaceChild()
    replaceWith() : 기존의 element를 argument element로 바꿔버림, 기존은 없어짐.
    insertAdjacentElement('afterend', newOne); << browser support가 good
    newLi.cloneNode(true)
*/

// let spans = [];
// for (let i = 0; i < 100; i++) {
//   let para = document.createElement('p');
//   spans.push(para);
// }
// spans.forEach((para, index) => (para.textContent = 'new P' + index));

// list.querySelectorAll('li'); << non-live한 static이기 때문에, js에서 새롭게 추가한 elements가 바영되지 않아. > 일종의 snapshot임.
// list.getElementByTagName('li'); << 반면, get으로 받을 경우, js에서 새롭게 추가한 elements가 반영돼 >> live

// list.remove(); >> list를 지움.
// list.parentElement.removeChild(list); // 호환이 더 좋아. but, remove()도 호환이 어느정도 보장됨.

// old version <> newer
//     appendChild <> append prepend
//     insertAdjacentElement  <> before after
//     replaceChild  <> replaceWith()
//     removeChild  <> remove

// #185 iterable?

// 기술적으로는,
// iterable protocol을 실행하는 object를 말함.
// length를 가지고, index를 사용해서 item에 접근
// 인간에게는,
// for-of loop를 삳용핧 수 있는 object를 말함.

// 모든 iterable이 array는 아님. nodelist, string, map, set과 같은 예가 있음.

// let array1 = new Array(number); >> length가 number인 빈 배열 생성
// let array4 = new Array('hi'); >> length가 1인 배열
// let array2 = new Array(1,2,3,4,5);
// let array3 = [1,23,4,2]
// let array5 = Array.of(1,2,3);
// let array6 = array.from(document.queryselectorAll('li'));
// let array7 = array.from('hello');
// let array8 = Array(10);
// let array9 = Array(1,2,3);

// push/pop 뒤에 속도가 더 빠름.
// unshift/shift 앞에  메모리의 모든 item을 건드리기 때문

// let array8 = [];
// array8[5]=5; >> [5]앞은 empty로 생성됨

// splice는 real array에서 사용할 수 있음.
// so, alike array는 array.from으로 real array를 만들고 splice를 사용할 수 있음.

// https://www.nfriedly.com/techblog/2009/06/advanced-javascript-objects-arrays-and-array-like-objects/
// real array > pop push sort slice splice sets them aprt from array like objects.

// Array.from >> array가 아닌 것들을 array로 만들어줌 (map to array, object to array, 등등)

// splice(startpoint,deleteitemnumber,additems)
// let array9 = [1, 2, 'hi', 2, 4, 'hello'];
// console.log(array9.splice(2, 2, 'hi', 1, 2, 3));
// console.log(array9);
// deleteitems를 return하고, array9는 additems를 포함한 배열이 됨.
// array9.splice(0,1) > same with shift
// array9.splice(-1,1) 맨 뒤에 하나를 지우고 return

// slice는 새로운 array를 만들어냄 new reference, copy values
// const array10 = [1, 2, 3, 44];
// const array11 = array10.slice();
// array10.push(5);
// console.log(array10, array11);
// array10.slice(start point, index which will be to stop);
// array10.slice(2,4); >> 2,3를 반환 low level로 생각해보면 4인 이유가 있음
// array10.slice(-3,-1); >> -3, -2 출력 > 뒤에서 세번째 두번째
// array10.slice(-2,-3); >> -2만(뒤에서 두 번째) 출력
// array10.slice(2) >> 2에서 끊어버리고 뒤를 전부 출력
// array12 = array10.concat([1,2,3,4]) >> 다른 list를 추가해서 새로운 어레이 반환
// array13 = [1,2,3,4,5,2,6];

// array13.indexOf(2) >> 2가 있는 first index를 return
// array13.lastIndexOf() >> 뒤에서부터2가 있는 first index를 return

var personData = [
  { name: "jun", foo: "loo" },
  { name: "chang" },
  { name: "hyun" },
  { name: "jun", foo: "boo" },
];
// personData.indexOf({ name: 'jun' });
// // >> error발생 왜냐? object는 reference를 가지므로,
// // array에 있는 item과 indexof안에 있는 object는 모두 reference value를 가짐 so, value를 비교할 때
// // 서로 다른 값을 가지게 됨.

// var timeTable = [
//   { time: 12, persons: ['chang', 'hyun', 'jun'] },
//   { time: 13, persons: ['hyun', 'jun', 'me'] }
// ];
// var time12 = timeTable.find(item => item.time === 12);
// console.log(time12);
// timeTable
//   .find(item => item.time === 12)
//   .persons.forEach(item => console.log(item));
// const manuel = personData.find((item, idx, persons) => {
//   return item.name === 'jun';
// });
// const manuel2 = personData.find(item => item.name === 'jun');
// // console.log(manuel);
// manuel.name = 'foo';
// console.log(manuel, manuel2, personData);
// manuel2.name = 'boo';
// console.log(manuel, manuel2, personData);
// >> 같은 결과 why? reference값을 manuel이 갖기 때문임.
// const foo = [1, 2, 3, 4, 5];
// console.log(foo.find(item => item > 2));
// 정리하자면, find는 array에서 각 item에 접근해, 조건을 만족하는 첫 번째 item을 return함.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find

// function isPrime(element, index, array) {
//   let start = 2;
//   while (start <= Math.sqrt(element)) {
//     if (element % start++ < 1) {
//       return false;
//     }
//   }
//   return element > 1;
// }

// console.log([4, 6, 8, 12].find(isPrime)); // undefined, not found
// console.log([4, 5, 8, 12].find(isPrime)); // 5

// const maxIndex = personData.findIndex((person, idx, persons) => {
//   return person.name === 'Max';
// });
// console.log(maxIndex);
// // 없으면 -1 있으면 indexed
// const array12 = [1, 2, 3, 4, 5, 6];
// console.log(array12.includes(10));
// console.log(array12.includes(2));
// console.log(array12.indexOf(2) == -1 ? false : true);
// console.log(array12.indexOf(8) == -1 ? false : true);
// console.log(array12.indexOf(2) !== -1);

// //# 194 forEach
// const array13 = [];
// array12.forEach((item, idx, items) => array13.push(item * 10));
// console.log(array13);
// // forEach
// array12.forEach((item, idx, items) => {
//   const object1 = { index: idx, deci: item * 10 };
//   array13.push(object1);
// });
// console.log(array12);
// console.log(array13);

// // map
// var array12 = [1, 2, 3, 4, 5, 6];
// const object2 = { name: '', num: '' };

// let object = array12.map((item, idx, array) => {
//   object2.name = { index: idx, deciItem: item * 10 };
// });
// console.log('undefined', object); // undefined array가 출력됨.
// console.log(object2);

// object = array12.map((item, idx, array) => {
//   return array;
// });
// console.log('returnarray', object);

// const object3 = array12.map((item, idx, array) => {
//   return { index: idx, deciItem: item * 10 };
// });
// console.log(object3);

// //#196 sort()ing reverse()ing
// //https:developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// const arr196 = [1, 4, 3, 2, 5];
// const arrStr196 = ['1', '2', '10', '4', '22', '2'];

// arr196.sort((a, b) => {
//   console.log(`comparing ${a},${b}`);
//   return a > b ? 1 : a === b ? 0 : -1;
// });
// // from SOF

// const arrStrMDN = ['march', 'jan', 'feb', 'Jan', 'FEB', 'dec', 'DEC'];
// console.log(arrStrMDN.sort());
// // // 대문자 먼저. ascii 참조
// var sortArr = arr196.sort();
// console.log(sortArr);
// sortArr[0] = 4;
// console.log(sortArr);
// console.log(arr196);
// var sortArrStr = arrStr196.sort();
// console.log(sortArrStr);

// // string의 경우, first char만 취해서, number로 바꿔 대소비교를 한다.
// var sortArr = arr196.sort((a, b) => {
//   if (a > b) {
//     return -1;
//   } else if (a === b) {
//     return 0;
//   } else {
//     return 1;
//   }
// });
// console.log('origin array is changed', arr196);
// console.log(sortArr);
// // 역방향 정렬
// // javascript에서 내장한 sort 알고리즘에 따라 정렬됨.
// // 이해하기엔 아직.. merge sort와
const arr196 = [1, 4, 3, 2, 5];
var filterArr = arr196.filter((item, indx, array) => {
  return item > 2;
  //true면 capped
  //false면 drop
  // return값이 true냐 false냐에 따라 결정됨
});
console.log("filterarr", filterArr);
var filterArr2 = arr196.filter((item) => item < 2);
console.log(filterArr2);
console.log(arr196);
// //#199 reduce()
// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

// var arrays = [
//   [0, 1],
//   [2, 2],
//   [23, 4, 2]
// ];
// var flatArray = arrays.reduce((base, current, indx, array) =>
//   base.concat(current)
// );
// var flatArray2 = arrays.reduce(
//   (base, current, indx, array) => base.concat(current),
//   ['start']
// );
// console.log(flatArray);
// console.log(flatArray2);
// // MDN ex
// var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

// var countedNames = names.reduce(function(allNames, name) {
//   if (name in allNames) {
//     allNames[name]++;
//   } else {
//     allNames[name] = 1;
//   }
//   return allNames;
// }, {});
// countedNames is:
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
// from MDN
// let people = [
//   { name: 'Alice', age: 21 },
//   { name: 'Max', age: 20 },
//   { name: 'Jane', age: 20 }
// ];

// function groupBy(objectArray, property) {
//   return objectArray.reduce(function(acc, obj) {
//     let key = obj[property];
//     if (!acc[key]) {
//       acc[key] = [];
//     }
//     acc[key].push(obj);
//     return acc;
//   }, {});
// }

// data structure
// https://medium.com/siliconwat/data-structures-in-javascript-1b9aed0ea17c

// //#200 map과 reduce의 combine
// var originalArray = [{ price: 10.99 }, { price: 5.99 }, { price: 29.99 }];
// var transformedArray = originalArray.map(obj => obj.price); // produces [10.99, 5.99, 29.99]
// var sum = transformedArray.reduce((sumVal, curVal) => sumVal + curVal, 0); // => 46.97

// var originalArray = [{ price: 10.99 }, { price: 5.99 }, { price: 29.99 }];
// var sum = originalArray.reduce((sumVal, curVal) => sumVal + curVal.price, 0); // => 46.97

// var originalArray = [{ price: 10.99 }, { price: 5.99 }, { price: 29.99 }];
// var sum = originalArray
//   .map(obj => obj.price)
//   .reduce((sumVal, curVal) => sumVal + curVal, 0); // => 46.97
// //1번 방법을 leverage method chaining으로 구현한 방법

// // #201 split(), join()

// var string = 'heloohellohelloheloooooohellohello';
// console.log(string.split('o'));
// var arr = ['hello', 'hello', 'hello'];
// console.log(arr.join(' '));

// // #202 Spread Operator

// // var name = 'jun','chang','hyun';
// var name = '';

// // #202 spread syntax

// function sum2(x, y, z) {
//   return x + y + z;
// }

// var numbers = [1, 2, 3];

// console.log(sum2(...numbers));
// // expected output: 6
// /// ...args >> args는 list에 담긴 items임. >> function이나, 배열이나 등등 여러 곳에서 쓰일 수 있음.
// // ...args는 args items를 하나 하나 get해줌.
// console.log(sum2.apply(null, numbers));

// var name = ['hi', 'jun', 'hyun1'];
// var spread = [...name];
// console.log(name, spread);

// var nameArray = ['hi', 'jun', 'hyun'];
// var spread = [...nameArray];
// console.log(nameArray, spread);
// var numArray = [1, 2, 3, 4, 5, 1];
// console.log(Math.min(...numArray));
// console.log(Math.min(numArray));
// // Math.min(1,2,3,4,5) 이런 식으로 받음.

// var persons = [
//   { name: 'foo', age: 2 },
//   { name: 'bar', age: 2 }
// ];
// var persons2 = [...persons];
// persons.push({ name: 'loo', age: 2 });
// persons2[0].age = 21;
// console.log(persons, persons2);
// // persons aray의 index에있는 item은 object임.
// // so, persons2는 object를 받아 list를 만드는데, object는 reference이므로,
// // presons2 array의 index에는 object의 reference address가 담겨져있음.
// // persons에 push를 하면, persons, persons2는 서로 다른 배열이기 때문에, persons에만 push가 됨.
// // but, persons 또는 persons2에서 객체의 property를 건드리게 되면, 둘은 서로 같은 객체 주소를 지니므로,
// // 객체의 property는 둘 다 바뀜.

// var persons3 = [
//   ...persons.map(person => ({
//     name: person.name,
//     age: person.age
//   }))
// ];
// console.log(persons3);
// //위 code는 아래로 바뀔 수 있음. [...]가 상쇄됨.
// var persons3 = persons.map(person => ({ name: person.name, age: person.age }));
// console.log(persons3);
// persons3[0].name = 'jun';
// console.log(persons3, persons);
// //위와는 다르게 아예 다른 배열이 되어버림. > 깊은 복사?
// // https://dev.to/samanthaming/how-to-deep-clone-an-array-in-javascript-3cig
// // https://www.freecodecamp.org/news/copying-stuff-in-javascript-how-to-differentiate-between-deep-and-shallow-copies-b6d8c1ef09cd/

// // #203 destructing array
// // https:dev.to/sarah_chima/destructuring-assignment---arrays-16f

// var arr = [1, 2, 3, 4, 5];
// var [a, b] = [1, 2, 3, 4, 5];
// console.log(a);
// console.log(b);
// var [a, b, ...c] = arr;
// console.log(a, b, c);
// var [a = 'defaultA', b = 'defaultB', ...c] = arr;
// console.log(a, b, c);
// var [a = 'defaultA', b = 'defaultB', ...c] = [1];
// console.log(a, b, c);
// var a = 1,
//   b = 2;
// console.log(a, b);
// [a, b] = [b, a];
// console.log(a, b);
// var arr = [1, 2, 3];
// [arr[2], arr[1]] = [arr[1], arr[2]];
// console.log(arr);

// //#204 sets

// // array : store (nested) data of any kind and length, iterable,  special array methods, order is guaranteed, duplicates area loowed, zero-based index
// // sets : order is not guaranteed, duplicates are not allowed, no index-based MediaKeySystemAccess, special set methods
// // maps : store key-value data of any kind and length, any key values are allowed, special map methods, order is guaranteed, duplicate keys are not allowed, key-based MediaKeySystemAccess

// var ids = new Set();
// console.log(ids);
// var ids = new Set([1, 2, 3]);
// console.log(ids);
// console.log(ids[1]);
// console.log(ids.has(1));
// //data storage. whether it has a certain value.
// ids.add(5);
// ids.add(2);
// ids.delete(2); // same with if(ids.has(2){ids.delete(2)})
// ids.delete(8);
// for (const entry of ids.entries()) {
//   console.log(entry);
//   console.log(entry[0]);
// }

// //#205 maps

// var person1 = { name: 'jun' };
// var person2 = { name: 'chagn' };

// var personData = new Map([[person1, { date: 'yesterday', price: 10 }]]);
// console.log(personData);

// var personData = new Map([[person1, [{ date: 'yesterday', price: 10 }]]]);
// console.log(personData);

// var personData = new Map([[person1, [1, 2, 3, 4, 5]]]);
// console.log(personData);
// console.log(personData.get(person1));

// personData.set(person2, [
//   { date: 'two', price: 100 },
//   { date: 'one', price: 200 }
// ]);
// console.log(personData);

// // for (const entry of personData.entries()) {
// //   console.log(entry);
// // }

// for (const [key, value] of personData.entries()) {
//   console.log(key, value);
// }
// for (const entry of personData.entries()) {
//   console.log(entry[0], entry[1]);
// }
// var persons = [
//   { name: 'jun', age: 4, weight: 2 },
//   { name: 'chang', age: 1, weight: 4 }
// ];

// var personData = new Map([
//   [persons[0], 'person1 value'],
//   [persons[1], 'person2 value']
// ]);
// console.log(personData);
// // map은 entry > key, value 체계임. >> key value는 entry[0], entry[1]로 접근 가능. entry[2]는 없음. >> 위의 'possible'은 무시해버림.
// console.log('here');
// for (const entry of personData.entries()) {
//   for (const item of entry) {
//     console.log(item);
//   }
//   console.log(entry);
// }
// // //don't have to do below codes thanks to map.
// // var person1 = { id: 'pl' };
// // var personData = { pl: [1, 2, 3, 4] };
// // console.log(personData[person1.id]);

// for (const key of personData.keys()) {
//   console.log(key);
// }
// for (const value of personData.values()) {
//   console.log(value);
// }

// console.log(personData);
// console.log(personData.size);

// function logMap(value, key, map) {
//   console.log(`key: ${key}, map: ${value}`);
// }
// personData.forEach(logMap);
// console.log('here');
// personData.forEach((value, key, map) =>
//   console.log(`${key}, ${value}, map: ${map}`)
// );
// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach

// // maps <> object
// // can use any values(and type) as keys <> only use SVGStringList, numbers or symbols as keys
// // better performance for large quantities of data <> perfect for small/ medium-sized sets of data
// // better performance when adding + removing data frequently <> easier/quicker to create(typically also with better performance)

// #208
// weakset일 경우 garbage collect를 allow.
// var person = { name: 'jun' };
// var persons = new WeakSet();
// persons.add(person);
// // ... some poerations
// person = null; // allow garbage collect

// console.log(persons);

// // set일 경우 garbage collect가 되지 않음.
// var person = { name: 'jun' };
// var persons = new Set();
// persons.add(person);
// // ... some poerations
// person = null; // allow garbage collect

// console.log(persons);

// //#209
// // weakMap일 경우 garbage collect allow
// person = { name: 'jun' };
// var personData = new WeakMap();
// personData.set(person, 'Extra info!');
// person = null;
// console.log(personData);

// var personData = new Map();
// personData.set(person, 'Extra info!');
// person = null;
// console.log(personData);

// #Section 9
// #213 Object?
// core data structure in javascript
// typically reflect 'real-world' entities ex) button, movie , allow us to apply real-world logic to coding
// made up of properties & methods , store date in properties and action in methods, allow you to group related data together and split your code into logical pieces.

// primitive values : number string boolean null undefined symbol
// reference values : everything else! object, array, dom node, ...
// objects are of course made up of primitive values.

// var complexPerson = {
//   name: 'jun',
//   hobbies: ['Sports', 'Cooking'],
//   address: {
//     street: 'street 5',
//     stateId: 5,
//     country: 'korea',
//     phone: {
//       number: 1232,
//       isMobile: true
//     }
//   }
// };
// console.log(complexPerson);
// //complexPerson는 nested reference value로 되어있지만, object나 array 내부는 primitive values로 이루어짐.
// // So you could say: Primitive values are the core building blocks that hold your data, objects (and arrays) are helpful for organizing and working with that data.
