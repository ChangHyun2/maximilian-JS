1. Method shorthand

Person의 prototype에 할당되고 모든 인스턴스들이 이를 공유함. 메모리를 덜 사용함.
하지만, this 문제를 해결하기 위해 bind 또는 apply를 사용해야함.

```js
class Person{
    greet(){
        ...
    }
}
```

2. Property Function

인스턴스마다 메소드가 생성됨.
this 문제도 해결되지 않아.

```js
class Person{
    greet = function(){...}
    constructor(){
        this.greet2 = function(){...}
    }
}
```
3. property arrow function

this가 항상 인스턴스를 가리키기 때문에, this문제를 해결할 수 있음.
따라서, 메모리를 희생해서 사용할만한 가치가 있음.

```js
class Person {
    greet = ()=>{...}
    constructor(){
        this.greet2 = ()=>{...}
    }
}
```