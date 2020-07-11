// let name = 'Max';

// if (name === 'Max') {
//   let hobbies = ['Sports', 'Cooking'];
//   console.log(hobbies);
// }
// console.log(name, )
// //let은 블락 스코프임.

// function greet() {
//   let age = 30;
//   let name = 'Manuel';
//   console.log(name, age, hobbies);
// }

// console.log(name, hobbies);

// greet();

// // var >> function scope, redeclare 가능. 기존에 사용하던 variable을 cover하게 될 경우, error가 발생하지 않아 debugging 어려움이 있음.
// // let, const >> block scope, 같은 블락 내에서 redeclare 불가능.

// // var, let, const 모두 scope 밖에서 불러올 수 없음.
// let name = 'Max';
// function greet(){
//   let age = 30;
//   console.log(name, age);
// }
// console.log(name, age); // 에러 발생 > age가 local이기 때문에, global에서 불러올 수 없음.

// let/var name = 'Max';
// function greet(){
//   let/var name = 'manuel'; // let or var 생략 가능.
//   console.log(name);
// }
// console.log(name); // scope밖에서 선언한 변수는 안에서 재 정의할 수 있음. 재정의된 변수는 local변수로, scope 내에서만 재정의된 값을 지님.

// let name = 'jun';
// function greet(){
//   let age = 30;
//   console.log(name, age); // work.
//   console.log(name); // work.
// }
// console.log(name, age); //error >> age가 local variable

// ----------------------------------------------------------
// let name = 'jun';
// let name = 'hyun'; // error >> redeclare 불가능.
// name = 'chang'; // work >> declared variable은 사용 가능.
// var name = 'jun';
// var name = 'jun'; // work. >> var는 redeclare 가능.
// function greet(){
//   let age = 30;
//   let name = 'chang'; // work. 내부 scope에서 재정의했으므로, function block scope 내에서만 name='chang'이 됨.
//   console.log(name, age); // work.
//   console.log(name); // work.
// }
// console.log(name, age); //error >> age가 local variable

// ---------------------------------------------------------
// var name = 'jun';

// if (name === 'jun'){
// var hobbies = ['guitar', 'sing']; //global 변수임. why? var는 함수 scope라서.
// //문제가 뭐냐.. let과는 달리, if를 쓸 떄에는변수를 local하게 사용할 수 없음.
// console.log(hobbies);
// };

// function greet(){
//   var age = 30;
//   var name = 'chang';
//   console.log(name, age);//local variable name, age
// }
// console.log(name, age, hobbies);//global variable name, hobbies 사용
// //age는 local이기 때문에 에러 발생.

// greet();
// // greet()호출 시, lcoal age, name값 출력

// //위 코드에서, var를 let으로 바꿀 경우에는,
// //if 안에 선언된 hobbies를 외부에서 사용할 수 없게 됨.
// ------------------------------------------------

// let name = 'jun';
// let hobbies = ['guitar', 'sing'];

// if (name === 'jun'){
// let hobbies = ['movie', 'climbing'];
// console.log(hobbies);
// };

// function greet(){
//   let age = 30;
//   let name = 'chang';
//   console.log(name, age);
// }
// console.log(name,hobbies);
// greet();

// -------------------------------------------------

// {
//   let age = 29;
//   console.log(age); // 이렇게도 사용할 수 있음.
// }
// console.log(age);

// console.log(userName);
// var userName = 'jun'; // 호이스팅 발생. var는 browser가 declare할 때 value가 uninitialized일 경우, undefined를 할당함. >> console.log에서 undefined를 출력함.
// //javascript는 변수의 declare과 value의 initialize가 분리되어 처리되기 때문임.
// //var를 읽어올 때 file의 앞부분으로 가져옴.
// let userName = 'jun';
// //let은 browser가 declare할 때 initialized되지 않았을 경우, initialize하지 않은 상태로 declare만 수행.
// -----------------
// userName = 'Max';
// error발생  안 해
// variable name으로 undefined사용 ? > eeror 발생 안 해
// javascript는 forgiving  language임. so, 규칙에 맞지 않아도 많이 봐줌
// 이런 forgiving 없이 strict하게 작성을 원할 경우
// 'use strict';를 script파일 안에 선언해주면 됨.

//
