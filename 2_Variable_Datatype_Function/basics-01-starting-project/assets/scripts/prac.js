const defaultResult = 0;

let currentResult = defaultResult;
let logEntries = [];

function getUserNumberInput() {
  return parseInt(userInput.value);
  // vandor.js에 있는 useraInput의 value를 가져올 때
  //value를 string으로 가져오니, parseInt 내장 함수를 통해
  // 10진수 값으로 바꿔줌.
}

function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription);
  //vendor.js로부터 함수를 불러옴.
}

function add() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult += enteredNumber;
  //위까지는 연산부
  createAndWriteOutput('+', initialResult, enteredNumber);
  //연산을 표현하는 식
  const logEntry = {
    operation: 'ADD',
    prevResult: initialResult,
    number: enterednumber,
    result: currentResult
  };
  // 기록할 객체 생성
  logEntries.push(logEntry);
  // 기록 배열에 객체 추가
  console.log(logEntry);
  //방금 기록한 객체 로그
  console.log(logEntries);
  //지금까지 기록한 객체 배열 로그
}

function substract() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult -= enteredNumber;
  //위까지는 연산부
  createAndWriteOutput('-', initialResult, enteredNumber);
  //연산을 표현하는 식
}
function multiply() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult *= enteredNumber;
  //위까지는 연산부
  createAndWriteOutput('*', initialResult, enteredNumber);
  //연산을 표현하는 식
}
function divide() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult /= enteredNumber;
  //위까지는 연산부
  createAndWriteOutput('/', initialResult, enteredNumber);
  //연산을 표현하는 식
}

addBtn.addEventListener;
