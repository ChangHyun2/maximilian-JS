const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT_USER_CHOICE = 'ROCK';
const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = 'PLAYER_WINS';
const RESULT_COMPUTER_WINS = 'COMPUTER_WINS';
let gameIsRunning = false;

const getPlayerChoice = () => {
  const selection = prompt(
    `${ROCK}, ${PAPER} or ${SCISSORS}?`,
    ''
  ).toUpperCase();
  if (
    selection !== 'ROCK' &&
    selection !== 'PAPER' &&
    selection !== 'SCISSORS'
  ) {
    alert(`Invalid! We chose ${DEFAULT_USER_CHOICE}for you`);
    return;
    //undefined
  }
  return selection;
};

const getComputerChoice = () => {
  const randomValue = Math.random();
  if (randomValue < 0.34) {
    return ROCK;
  } else if (randomValue < 0.67) {
    return PAPER;
  } else {
    return SCISSORS;
  }
};

// ()=>{} arrow function

// #1 arrow function 기본형태
// : (arg1, arg2) => {...}
// : () => {...}
// : arg1 => {...}
// : (a, b) => a+b; ( return statement가 한 줄일 경우 can omit curly braces )
// const getWinner = (cChoice, pChoice) => {
//   return cChoice === pChoice
//     ? RESULT_DRAW
//     : (cChoice === ROCK && pChoice === PAPER) ||
//       (cChoice === PAPER && pChoice === SCISSORS) ||
//       (cChoice === SCISSORS && pChoice === ROCK)
//     ? RESULT_PLAYER_WINS
//     : RESULT_COMPUTER_WINS;
// };

// #2 arrow function 축약형태

// const add = (a, b) => a + b;
const getWinner = (
  cChoice,
  pChoice = cChoice === 'ROCK' ? PAPER : DEFAULT_USER_CHOICE
  // pChoice = DEFAULT_USER_CHOICE
) =>
  // 타 언어와는 달리, default value를 앞에 넣어둘 수도 있음
  // but 꼭 뒤에.
  cChoice === pChoice
    ? RESULT_DRAW
    : (cChoice === ROCK && pChoice === PAPER) ||
      (cChoice === PAPER && pChoice === SCISSORS) ||
      (cChoice === SCISSORS && pChoice === ROCK)
    ? RESULT_PLAYER_WINS
    : RESULT_COMPUTER_WINS;

// #3 function expression 형태

// const getWinner = function(cChoice, pChoice){
// if (cChoice === pChoice) {
//   return RESULT_DRAW;
// } else if (
//   (cChoice === ROCK && pChoice === PAPER) ||
//   (cChoice === PAPER && pChoice === SCISSORS) ||
//   (cChoice === SCISSORS && pChoice === ROCK)
// ) {
//   return RESULT_PLAYER_WINS;
// } else {
//   return RESULT_COMPUTER_WINS;
// }
// };

startGameBtn.addEventListener('click', () => {
  // 위 익명함수는 call back function임. programmer가 어떤 action에 의해 함수가 동작하도록 설계함.
  if (gameIsRunning) {
    return;
  }
  gameIsRunning = true;
  console.log('Game is starting...');
  const playerChoice = getPlayerChoice();
  const computerChoice = getComputerChoice();
  let winner;
  //undefined일 경우를 필터링
  if (playerChoice) {
    winner = getWinner(computerChoice, playerChoice);
  } else {
    winner = getWinner(computerChoice, playerChoice);
    // undefined일 경우 argument를 하나만 받는다면?
    // getWinner는 argument 2개를 받는 함수
    // 타 언어에서는 error가 발생할테지만, javascript는 X
    // 이처럼 argument가 없을 때 default value를 argument로 만들어주는 게 #136의 핵심
    // 삼항 연산자를 써서 truthy일 경우 argument를, falsy일 경우 default value를 전달해줌.
    // argument1 ? argument1 : default_value 이 형태를
    // argument1 || default_value로. (argument1이 true일 경우 argument1를, false일 경우 default_value를.)
    // 위처럼 코딩하면, undefined가 전달된 상태에서 메세지를 전달하게 됨.
    // 만약, getWinner 함수 선언 시 argument에 default value를 넣어둔다면, value가 undefined가 아닌 default value를 갖게 됨.
  }
  let message = `player : ${playerChoice ||
    DEFAULT_USER_CHOICE} computer : ${computerChoice} winner : ${winner}`;
  if (winner === RESULT_DRAW) {
    message = message + 'draw.';
  } else if (winner === RESULT_PLAYER_WINS) {
    message = message + 'won';
  } else {
    message = message + 'lost';
  }
  alert(message);
  gameIsRunning = false;
});

// const person = {
//   //key : value pair value에 함수를. >> method가 됨.
//   greet: function greet() {
//     console.log('Hello there!');
//   }
// };

// person.greet();

// // function도 Object.

// console.log(typeof startGame);
// console.log(startGame);
// console.log(startGame());
// console.dir(startGame);

// // #128 Function expression

// const start = function startGame2() {
//   console.log('game is learning');
// };
// // startGameBtn.addEventListener('click', startGame2); undefined error 발생
// // startGame2를 expression으로 start를 선언했기 때문임. 여기에서는 fuinction이 declare되는 게 아니라,
// // start가 declare되고, 이 start에 function expression이 value로 입력됨.

// const start2 = function() {
//   console.log('game is running');
// };

// // 위처럼 익명함수로 쓸 수도 있음. 왜냐, 굳이 함수명을 지을 필요가 없거든.
// // function expression의 경우, 세미콜론을 붙여야 됨.
// //function declare에서는 세미콜론을 붙이지 않음. statement blcok이라.

// // #129
// // function declaration/statement의 경우, top으로 hoist됨. so, file 어디에든 declare해도 어디서든 사용할 수 있음.
// // function을 file 맨 아래에 넣어둘 경우, 위의 접근이 용이함.
// // function expression의 경우, top으로 hoist되지만, declare만 되고, initialize되지는 않음.
// // 그렇기 때문에 undefined되었다는 error가 발생함. so, 순서에 맞게 함수를 type해야 됨.

// // 예를 들자면,
// // hi(); uninitialized error 발생
// const hi = function() {
//   console.log('hi');
// };
// hi();
// hi2();
// function hi2() {
//   console.log('hi');
// }

// // #130 anonymous function

// startGameBtn.addEventListener('click', function() {
//   console.log('start', name); // error 발생하지 않아. > name은 browser default variable
//   console.log('start', age); // error발생 시 anonymous로 보임 > 함수명을 지으면 debuggigng이 쉬움
// });

// // 다음과 같다면 쉬울 거.
// function start3() {
//   console.log('start', age);
// }
// startGameBtn.addEventListener('click', start3);

// // line 60의 함수에 함수명을 주는 것도 방법.
// startGameBtn.addEventListener('click', function start4() {
//   console.log('start', age); // error발생 시 anonymous로 보임 > 함수명을 지으면 debuggigng이 쉬움
// });

// // addeventlistener마다 function을 만들기 때문에, memory leak가 발생할 수 있지만, 1회 실행할 경우이기 때문에
// // leak의 우려가 없음.

// # 134 Different Arrow Function Syntaxes

// function only returns an object special case at the end of this article!

// #1 default syntax
// const add = (a, b) => {
//   const result = a + b;
//   return result;
// };
// // #2 shorter parameter only one parameter
// const log = message => {
//   console.log(message);
// };
// // #3 no argument
// const greet = () => {
//   console.log('hi there!');
// };
// // #4 shorter function body when one expression is used
// const add = (a, b) => a + b;

// // #5 Function returns an object (#4)
// const loadPerson = pName => ({ name: pName });
// // 이 경우, curly brace를 쓰면 객체의 curly brace와 겹침 >> parentheses를 사용해줌.

// #137 Introducing Rest Parameters ('Rest Operator')

// const sumUp = (a,b,c,d) => {

// };
// sumUp(1,4,2,4,1,2,3,1,2);

// #1
// const sumUp = (numbers) =>{
//   let sum = 0;
//   for(const num of numbers){
//     sum+=num;
//   }
//   return sum;
// }
// sumUp([1,2,3,4,5,1,2,3,21]);

// #2 만약, argument가 여러 개라면 #1는 cannot be solved.
// {
//   /// rest operator ...
//   const sumUp = (resultHandler, ...numbers) => {
//     //아래처럼, function 안에  function을 구현할 수 있음.
//     // function은 객체 > 객체 안에 객체를.
//     // script root level이 아닌, normal scope가 아닌, function 내의 scope이기 때문에
//     // 함수 내에서만 사용 가능
//     const validateNumber = number => {
//       return isNaN(number) ? 0 : number;
//     };

//     let sum = 0;
//     for (const num of numbers) {
//       sum += validateNumber(num);
//     }
//     resultHandler(sum);
//   };
//   // button.addEventListener('click', function(){
//   //   alert('hello');
//   // }) 이 구조와 same. addEventlistener도 function을 인자로 받아서, function을 실행함.
//   // resulthandler를 alert function이라 생각하면 됨.
//   const showResult = (result, messageText) => {
//     alert(messageText + ' ' + result);
//   };
//   sumUp(showResult, 2, 3, 4, 2, 'hello', 2, 32, 'hi');
//   // ...는 function block에 배열의 형태로 인자를 넘김
//   // https://www.geeksforgeeks.org/javascript-rest-operator/
//   // function foo(bar, lar, ...tar){

//   // }
//   // console.log(foo(4, 2, 1,2,4,2,13);

//   const subtractUp = function(...numbers) {
//     let sum = 0;
//     for (const num of numbers) {
//       sum -= num;
//     }
//     return sum;
//   };
//   const subtractUpOld = function(resultHandler) {
//     let sum = 0;
//     for (const num of arguments) {
//       isNaN(num) ? 0 : (sum -= num);
//       // 위 코드를 넣지 않으면 resulthandler도 arguments에 포함되기 때문에 nan이 출력됨.
//       // 이게 arguments의 단점임. 따라서, 위에 언급한 것처럼 rest operator를 사용해 아래처럼 작성.
//     }
//     resultHandler(sum);
//   };
//   subtractUpOld(showResult, 1, 4, 2, 23, 32);

//   const subtractUp2 = function(resultHandler, ...numbers) {
//     let sum = 0;
//     for (const num of numbers) {
//       //  첫 parameter인 resultHandler는 스킵하고, ...numbers만 배열로 받아 for문에서 처리함.
//       sum -= num;
//     }
//     resultHandler(sum);
//   };

//   subtractUp2(showResult, 1, 4, 2, 23, 32);

//   // // ES6 이전 버전에서는, 아래의 형태로 구현.
//   // const subtractUpOld = function() {
//   //   let sum = 0;
//   //   for (const num of arguments) {
//   //     sum -= num;
//   //   }
//   //   return sum;
//   // };
//   console.log(subtractUp(1, 10, 14, 29));
//   // console.log(subtractUpOld(1, 2, 3, 4, 2, 2));
// }
// #140 Working with 'bind()'

// const showResult = (result, message) => {
//   alert(message + ' ' + result);
// };

// const sumUp = (resultHandler, ...numbers) => {
//   const validateNumber = number => {
//     return isNaN(number) ? 0 : number;
//   };

//   let sum = 0;

//   for (const num of numbers) {
//     sum += validateNumber(num);
//   }

//   resultHandler(sum, 'this is sumUp : ');
// };

// const subtractUp = (resultHandler, ...numbers) => {
//   const validateNumber = number => {
//     return isNaN(number) ? 0 : number;
//   };
//   let sum = 0;
//   for (const num of numbers) {
//     sum -= validateNumber(num);
//   }

//   resultHandler(sum, 'thisis subtractUp : ');
// };

// sumUp(showResult, 1, 2, 3, 'hi', 4, 4);
// subtractUp(showResult, 1, 4, 2, 'hi', 'shi', 2, 2);

// const combine = (resultHandler, operation, ...numbers) => {
//   const validateNumber = number => {
//     return isNaN(number) ? 0 : number;
//   };

//   let sum = 0;

//   for (const num of numbers) {
//     operation === 'ADD'
//       ? (sum += validateNumber(num))
//       : (sum -= validateNumber(num));
//   }

//   resultHandler(
//     sum,
//     operation === 'ADD' ? 'this is "add" cmobine' : 'this is "SUBTRACT" combine'
//   );
// };
// combine(showResult, 'ADD', 1, 2, 3, 'hi', 4, 4);
// combine(showResult, 'ADDelse', 1, 4, 2, 'hi', 'shi', 2, 2);

const combine2 = (resultHandler, operation, ...numbers) => {
  const validateNumber = number => {
    return isNaN(number) ? 0 : number;
  };

  let sum = 0;

  for (const num of numbers) {
    operation === 'ADD'
      ? (sum += validateNumber(num))
      : (sum -= validateNumber(num));
  }

  resultHandler(sum);
};
const showResult = (message, result) => {
  alert(message + ' ' + result);
};
// combine2(showResult, 'ADD', 1, 2, 3, 'hi', 4, 4);
// combine2(showResult,  'SUBTRACT',1, 4, 2, 'hi', 'shi', 2, 2);
// showResult만 인자로 받을 때에는, showResult fuction으로 result argument만 전달됨.
// combine2는 첫 argument에서 함수를 받아 처리함. 이 때 함수를 받아서, 함수에 combine2에 의해 생성된 result를 argument로 전달함.
// 이 때 전달하는 argument는 단 하나 뿐.
// 그런데, 전달하려는 handler function은 argument가 두 개임. so, 두 개를 보내려면, combine2를 수정해야되는데, 이를 원하지 않을 경우, bind를 사용.

combine2(showResult.bind(this, 'This is add'), 'ADD', 1, 2, 3);
combine2(showResult.bind(this, 'This is sub'), 'SUBTRACT', 1, 2, 3);
// bind할 경우, this 뒤의 argument는 showResult의 1st argument로 넘어감.
// debugging으로 실행순서 확인해볼 것
// combine2의 resultHandler인 1st argument는 combine2 함수 내의 연산 결과를 인자로 하나 받아 실행되도록 정의되었음.
// 그런데, 불러오려는 resultHandler는 argument를 1개 이상 필요로하는 수가 있음. 이 때, combine2를 건드리지 않고, bind를 사용해서
// argument를 pre-configure함.
// bind를 통해, combine2를 건드리지 않고 show result function에 필요한 argument를 pre-configure할 수 있음.

// #141
// calculator project로 넘어가서 bind를 적용해봄

// # 142
// call and apply
//  bind는 function을 prepare하지만, apply call은 immediately call.
// 좀 뒤에 다루도록함.
