const defaultResult = 0;

let currentResult = defaultResult;
let logEntries = [];

function getUserNumberInput() {
  return parseInt(userInput.value);
}

function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription);
}

function log(operationIdentifier, prevResult, operationNumber, newResult) {
  const logEntry = {
    operation: operationIdentifier,
    prevResult: prevResult,
    number: operationNumber,
    result: newResult
  };
  logEntries.push(logEntry);
  console.log(logEntries);
}
let mathOperator;
function calculateResult(calculationType) {
  const enteredNumber = getUserNumberInput();
  if (
    (calculationType !== 'ADD' &&
      calculationType !== 'SUBTRACT' &&
      calculationType !== 'MULTIPLY' &&
      calculationType !== 'DIVIDE') ||
    !enteredNumber //enteredNumber === 0
  ) {
    return;
  }

  const beforeResult = currentResult;
  if (calculationType === 'ADD') {
    currentResult += enteredNumber;
    mathOperator = '+';
  } else if (calculationType === 'SUBTRACT') {
    currentResult -= enteredNumber;
    mathOperator = '-';
  } else if (calculationType === 'MULTIPLY') {
    currentResult *= enteredNumber;
    mathOperator = '*';
  } else if (calculationType === 'DIVIDE') {
    currentResult /= enteredNumber;
    mathOperator = '/';
  }
  createAndWriteOutput(mathOperator, beforeResult, enteredNumber);
  log(calculationType, beforeResult, enteredNumber, currentResult);
}
function add() {
  calculateResult('ADD');
}
function subtract() {
  calculateResult('SUBTRACT');
}
function multiply() {
  calculateResult('MULTIPLY');
}
function divide() {
  calculateResult('DIVIDE');
}
// addBtn.addEventListener('click', add);
// subtractBtn.addEventListener('click', subtract);
// multiplyBtn.addEventListener('click', multiply);
// divideBtn.addEventListener('click', divide);

// 위 코드도, bind로 바꾼다면.
addBtn.addEventListener('click', calculateResult.bind(this, 'ADD'));
subtractBtn.addEventListener('click', calculateResult.bind(this, 'SUBTRACT'));
multiplyBtn.addEventListener('click', calculateResult.bind(this, 'MULTIPLY'));
divideBtn.addEventListener('click', calculateResult.bind(this, 'DIVIDE'));

// ***** below is from the bind lecture ******

function bindCalc(operation) {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  let operator;
  if (operation === 'ADD') {
    currentResult += enteredNumber;
    operator = '+';
  } else if (operation === 'SUBTRACT') {
    currentResult -= enteredNumber;
    operator = '-';
  } else if (operation === 'MULTIPLY') {
    currentResult *= enteredNumber;
    operator = '*';
  } else if (operation === 'DIVIDE') {
    currentResult /= enteredNumber;
    operator = '/';
  }
  createAndWriteOutput(operator, initialResult, enteredNumber);
  writeToLog(operation, initialResult, enteredNumber, currentResult);
}
// addBtn.addEventListener('click', bindCalc.bind(this, 'ADD'));
// subtractBtn.addEventListener('click', bindCalc.bind(this, 'SUBTRACT'));
// multiplyBtn.addEventListener('click', bindCalc.bind(this, 'MULTIPLY'));
// divideBtn.addEventListener('click', bindCalc.bind(this, 'DIVIDE'));

// generator만들면서 고민했던 case네..? bindCalc에 인자를 전달할 수가 없음.
// bindCalc가 즉시 실행함수가 되기 때문임. 따라서, bindCalc내의 함수엔 NaN, undefined 인자가 전달될 것임.
// writeToLog에서 에러가 발생해버림.
// addBtn.addEventListener('click', bindCalc('ADD'));
// subtractBtn.addEventListener('click', bindCalc('SUBTRACT'));
// multiplyBtn.addEventListener('click', bindCalc('MULTIPLY'));
// divideBtn.addEventListener('click', bindCalc('DIVIDE'));

/*

typeof operator
- typeof undefined
- typeof null
- typeof NaN

performance tap

    record > reload하면, web browser loading record함.
    
#2.50 : script, HTML parsing, defer, async

#3.57 : using shortcut
#3.58 : autocomplete
    trigger parameter
#3.59 : extension
    필수적인 것만 깔아
    느려짐
#3.60 : vscode 설정
#3.61 : VScode View
    search 코드 검색 기능
    SCM view : source control
    Debug
#3.63 : ECMAscript document
#3.64~ : debugging
    clg는 유용해
    
#3.~72 : dubug
    vscode에서, chrome debugger이용시, vscode에 있는 json파일에
    debugging할 주소를 입력해두어야 한다. 그리고나서, vscode에서 F5입력 시, debugging이 됨.
    
#3.74 : conditional code
    function doSomething()
    JavaScript compares strings based on standard lexicographical ordering, using Unicode values.
    'ab' > 'aa' // true
'a' > 'B' // true
'a' > 'b' // false


#3.77

    function calculateResult(){
    }에서,
    eventlistener에, calculateResult('ADD');를 시도했음. 당연히 안 됨.
    so, let calculateResult = function calculateResult(){}로 시도해봤으나.
    여전히 안 됨..?


#3.78

    Object
    const person1 = {name: 'max'};
    const person2 = {name: 'max'};에서,
     person1===person2 > 다영ㄴ히 false
     person1==person2 > 얘도 false네..?
    const person3 = person1;
    person1==person3 > 트루
    person1===person3 > 트루

    Array
    const hobbies = [1, 2, 3];
    const morehobbies = [1,2,3];
    hobbies === morehobbies > false
    person1.name ==== person2.name > true




*/
