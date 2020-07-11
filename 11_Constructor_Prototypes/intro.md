# Classes & OOP

prototypes & more
class : object를 생성하기 위한 blueprint

아래의 컨셉을 배울 것임.
1. behind the secenes of classes and objects?
2. Constructor functions(without classes)
3. Prototypes & Prototypical Inheritance

위 컨셉들을 토대로 class가 만들어짐.

## Prototypes?

js uses 'Prototypical Inheritance' > the class Syntax is basically just 'syntatic sugar' > constructor Functions & Prototypes power Javascript Objects

Person << function Person(){}
Person << Person.prototype << function Person(){}

1. constructor 함수에 의해 Person 인스턴스 생성.
2. constructor 함수의 default prototype 또는 직접 prototype 정의
3. 정의되어있는 prototype이 instance를 생성할 때에 할당됨.

Prototype Objects == 'Fallback Objects'

프로토타입 체이닝

person : name, greet

person.sayHello()를 실행할 경우, person 구성자의 properties를 먼저 확인
없을 경우, person의 prototype을 확인, person의 prototype도 없을 경우,
person.prototype.prototype을 확인
## constructorFunctions vs classes

공통점
    - blueprint for obejects
    - properties & methods

```js
function Person(){
    this.age = 30;
    this.name = 'jun';
    this.greet(){
        console.log('hello');
    }
    
}

class Person{
    constructor(){
        this.age = 30;
        this.name = 'jun';
        this.greet(){
            console.log('hello');

        }
    }
}

const new Person();
p.greet();
console.log(p.toString()); // 프로토타입 체이닝에 의해 [Object , object]
console.log(p.__proto___); // 
``` 

## Prototypes -summary

prototype은 다른 객체에 대한 link로, fallback object와 같이 동작한다. 
