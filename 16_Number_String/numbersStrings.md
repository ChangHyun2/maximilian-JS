js에서 모든 Number는 Float임.

5와 -3과 같은 정수도 사실상 5.0, -3.0으로 저장됨.

Numbers는 64 bit의 floating points로 저장됨. 
so, 64 bit로 표현 가능한 숫자만을 저장할 수 있음.

맨 앞 비트는 부호,
다른 비트는 digits를 나타냄.

64비트로만 숫자를 표현하기 때문에 limit가 존재함.

```js
// 가장 큰 정수.
Number.MAX_SAFE_INTEGER;
Math.pow(2,53)-1;

// 가장 큰 정수보다 큰 값이 출력됨. 
Math.pow(2,53);
Math.pow(2,54);

Math.pow(2,53) +1;
// 계산이 불가능

Number.MIN_SAFE_INTEGER
Number.MAX_VALUE
1.7976931348623157e+308

```

## Floating Point Precision

```js
0.2 + 0.4 === 0.6; // false

// in decimal system,
2/5 //0.4

// in binary system,
1/3 //0.333333333333

(1).toString(2);
(5).toString(2);
(1/5).toString(2);
0.2.toString(2);

0.2 + 0.4 // 0.6000000001

0.333333 + 0.333333 + 0.333333 //0.999999 binary system
1/3 + 1/3 + 1/3 //1 decimal system


js는 오차를 수정해 올바른 실수값으로 바꿔줌.
0.2.toFixed(20); //0.2000000000001110
0.2.toString(2);

(0.2+0.4).toFixed(2);
20.2.toFixed(2);


```

## bigInteger type

```js

Number.MAX_SAFE_INTEGER보다 큰 값을 처리하기 위해 사용

9007199244747128931298n // string으로 처리함.
-9007199244747128931298n 
-9007199244747128931298.5555n // error 실수는 표현 불가
10n - 4n // 6n 작은 숫자도 처리 가능
10n - 4 // error type이 같아야해.
parseInt(10n) // -4
10n - BigInt(4) // 6n
10n * 3n // 30n
10n/2n //5n
5n/2n // 2n 실수를 잘라버림.
2.5n // error

Number.POSITIVE_INFINITY
Infinity
-Infinity
1/0 //Inifinity
Number.isFinite(10);
Number.isFinite(Inifinity);
Number.isNaN(NaN);
Math.E
Math.Pi
Math.sqrt
Math.sin
Math.pow
Math.abs
Math.random()


function randomIntBetween(min, max){
    return Math.floor(Math.random() * (max-min+1) + min);
}
 
```
## Tagged Templates

```js

function productDescription(strings, producName, productPrice){
    console.log(strings, productName, productPrice);
    let priceCategory = 'cheap';
    if(productPrice > 30){
        priceCategory = 'fair';
    }
    return `${strings[0]}${productName}${strings[1]}${priceCategory}${strings[2]}`;
}

const prodName = 'js course';
cons prodPrice = 29.99;
const productOutput = productDescription`This product (${prodName}) is ${prodPrice}.`;

string과 변수를 입력으로 보내서 함수내에서 string을 처리한 결과를 return할 수 있음.

console.log(productOutput);

```

## regular expression
```js
const userInput = 'test@test.com';
userInput.includes('@');

var regex = /^\S+@\S+\.\S+$/ 
regex.test(userInput); //false
regex.test('test@test.com'); //true

var regex = /hello/
regex.test('hello');
regex.test('hi, hello');
regex.test('hi, hello ...');
regex.test('Hello'); // upper, lower 구분

var regex = /(h|H)ello/
regex.test('hello');
regex.test('Hello');
regex.test('hi Hello');
regex.test('hi Hello ...');

var regex = /.ello/ // 앞에 뭔가가 있고 ello 끝나는 표현
regex.test('hello'); // true 
regex.test('ello'); // false
regex.test('Jello'); // true
regex.test('   Jello'); // true
regex.exec('jello'); // 어떤 index에서 매칭되는지 알려줌
regex.exec('hi! jello');

var regex = /^\S+@\S+\./

```

More on Numbers in JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number

Tagged templates (MDN): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates