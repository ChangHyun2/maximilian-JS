
## pure function?

`input(arguments) > function > output

동일한 입력이 항상 같은 결과값을 출력하는 function을 pure function이라고 함.
`

## pure function의 단점

function의 외부에 있는 값을 변화시킬 수 있음.
즉, 입력의 불변성이 보장되지 않아.

```js

// pure function
function add(n1, n2){
    return n1+n2;
}

// impure function : side effect 발생
function addRandom(n1){
    return n1+Math.random();
}

// impure function 
let previousResult = 0;
function addMoreNumbers(num1, num2){
    const sum = num1+num2;
    previousResult = sum; // side effect
    return sum;
}

const hobbies = ['sports', 'cooking'];
function printHobbies(h){
    h.push('New hobbies');
    console.log(h);
}
printHobbies(hobbies);
// h 인자는 array의 reference값을 전달받기 때문에 외부에 위치한 array에 대한 수정이 발생
// impure function

```

## factory function

```js
function createMultiply(multiplier){
    function multiply(number){
        return multiplier*number;
    }
    return multiply;
}

const multiplyTwo = createMultiply(2);
const multiplyThree = createMultiply(3);
console.log(multiplyTwo(4));
console.log(multiplyThree(4));
```

## closure

js의 모든 함수는 closure이다.

lexical environment : function(){}의 블락에 의해 구분됨.
각각의 함수는 lexical environment를(놓여있는 곳이 어디인가?) 지니고 있음. 
global environment 또한 이에 속함.

```js
let multiplier = 1.1;

function createTaxCalculator(tax){
    function calculateTax(amount){
        console.log(multiplier);
        return amount * tax * mulitplier;
    }
    return calculateTax;
}
const calculateVatAmount = createTaxCalculator(0.19);
const calculateIncomeTaxAmount = createTaxCalculator(0.24);
multiplier = 1.4;

// 두 번 모두 1.4가 출력됨
```
calculateTax 함수는 createTaxCalculator함수가 실행되는 순간 calculateTax의 lexical environment에 있는 변수들을 이용해 함수를 생성함.

closure? 함수는 함수가 실행될 때 자신을 둘러싸는 환경에 있는 변수들의 그 순간의 값을 이용해 closure를 생성한다.
변수에 할당된 value를 사용해 closure를 생성하기 떄문에 closure가 생성된 이후 lexical 환경의 변수가 바뀌더라도 바뀐 값을 반영하지 않는다.


```js
let userName = 'jun';

function greetUser(){
    console.log('hi' + username);
}

greetUser(); // hi jun
userName = 'chang';
greetUser(); // hi chang 함수를 실행하는 순간 snapshot을 찍기 때문

```

```js

let userName = 'jun';

function greetUser(){
    let name = userName;
    console.log('hi' + name);
}

userName = 'chang';
greetUser(); // hi chang 

마찬가지로 greetUser를 실행하는 순간, closure를 생성하며 userName의 value인 'jun'을 
지역변수 name에 할당하고 지역변수 name을 출력하기 때문.


function greet(){
    let message = 'hello';
    console.log(message);
}
let message = 'hi';

let은 스코프가 분리되기 떄문에 같은 변수를 선언할 경우 지역변수로 새로운 message변수가 할당됨. inner 변수가 우선순위에 있기 때문에 hello를 출력. 이러한 현상을 shadowing이라 함.

스코프란 = 렉시컬 환경 {} 블락.

```

## 함수 실행 시 클로저로 인한 메모리 이슈?

매번 클로저를 생성할 떄마다 메모리 문제가 발생하지 않을까?
함수가 더 이상 외부의 값을 사용하지 않을 경우 garbage collect를 하기 때문에 걱정x

```js
const name = 'jun';
function greet(){
    console.log('hi', name);
}
greet();

함수 실행 시 global environment의 name값 'jun'을 사용해 클로저를 형성
클로저가 실행되면 hi jun을 출력.
이 처럼 함수가 실행될 떄마다 렉시컬 환경의 변수들을 이용해 클로저를 형성한다면, 
함수 실행이 끝나면 더 이상 name변수를 내부 함수에서 사용하지 않으므로 클로저에서 사용하는 값들은 가비지 콜렉팅됨.
즉, 더 이상 참조되지 않는 변수는 garbage collect하게 됨.

```

## IIFE

```js

// var age = 28;
// console.log(age);

IIFE(immediately invoked function expression)를 사용할 경우
글로벌 환경을 더럽히지 않고 변수를 해결할 수 있음.
아래 코드에서는 가비지 콜렉팅이 되는 것 또한 장점.
(function(){
    var age = 28;
    console.log(age);
})(); 

```

## recursion

```js
const powerOf = (x,n)=> n===1 ? x : x * powerOf(x, n-1);

const mySelf = {
    name: 'jun',
    friends: [
        {
            name: 'hong',
            friends: [
                {
                    name: 'bbak'
                }
            ]
        },
        {
            name: 'cha'
        }
    ]
};

function getFriendNames(person){
    const collect = [];

    if(!person.friends){ 
        return [];
    }

    for(const friend of person.friends){
        collect.push(friend.name);
        collect.push(...getFriendNames(friend));
    }

    return collect;
}

```

More on Closures (MDN): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

Recursion (MDN): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#Recursion